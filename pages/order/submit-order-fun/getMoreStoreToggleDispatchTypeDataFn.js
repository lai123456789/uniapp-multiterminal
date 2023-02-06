import {
	assertObject,
	assertArray,
	checkTypeFn,
	transNumFn,
	toDoubleNumFn,
	bigMinus,
	bigPlus
} from '@/tools/tools.js';
import {
	userAdrs,
	sellerAdrs,
	zitiAdrs,

	dspcnow,
	dspcyvyue,
	yvyueTypeEnum,


	dispFeeHide,
	dispFeeShow0,
	dispFeeShow,
	dispFeeTypeEnum
} from '@/pages/order/submit-order-enum.js';

/*
	@description 多门店获取切换配送方式接口数据
	@param
		dispatchTypeId <Number> 配送方式id
		longitude <Number> 纬度
		latitude <Number> 经度
		shifuGoodsPrice <Number> 实付商品金额
	@return Promise
*/
function getMoreStoreToggleDispatchTypeDataFn(that, dispatchTypeId, longitude, latitude, shifuGoodsPrice) {
	return new Promise(async resFn => {
		let result = await that.$request({
			method: 'post',
			url: '/api/Orderbranch/orderDm',
			data: {
				id: dispatchTypeId,
				lon: longitude,
				lat: latitude,
				total_price: shifuGoodsPrice
			}
		});
		// console.log('获取切换配送方式接口数据 getMoreStoreToggleDispatchTypeDataFn', result);

		//数据返回后 处理方式  处理数据
		const successState = 'successState', // 成功状态
			notRangeState = 'notRangeState', // 不在范围
			errorState = 'errorState'; // 失败
		let codeEnum = {
			[50001]: notRangeState,
			[200]: successState
		};

		if (result.statusCode == 200) {
			if (codeEnum[result.data.code] == successState || codeEnum[result.data.code] == notRangeState) {
				let resultObject = assertObject(result.data.data);

				// 是否在配送范围内
				let isRange = codeEnum[result.data.code] == notRangeState ? false : true;
				
				

				// ↓↓↓ 收货地址 | 自提地址 | 自提点
				const addressEnum = {
					'1': userAdrs,
					'2': userAdrs,
					'3': sellerAdrs,
					'4': zitiAdrs
				};
				let addressObject = {
					[userAdrs]: {
						addressIsSet: false,
						addressUserName: '', // 收货人名字
						addressUserTel: '', // 收货人电话
						addressText: '', // 收货人地址描述
						addressTagName: '', // 地址标签
						addressId: null, // 收货地址id
						addressCoordinate: '' // 收货地址经纬度
					},
					[sellerAdrs]: {
						sellerImage: '',
						sellerName: '',
						sellerTel: '',
						sellerOpenTime: '',
						sellerAddress: ''
					},
					[zitiAdrs]: []
				};

				let addressInfo = assertObject(resultObject.dmio); // 四种方式对应的地址信息
				let addressResObj = assertObject(addressInfo.data); // data数据
				let addressTypeText = addressEnum[transNumFn(addressInfo.type)]; // 类型数字对应的枚举字符串
				let currentAddr = addressObject[addressTypeText]; // 当前地址信息

				addressObject.addressTypeText = addressTypeText;

				let handleAddrFn = {
					[userAdrs]() {
						if (checkTypeFn(addressResObj) == 'Object' && Object.keys(addressResObj)
							.length) {
							currentAddr.addressIsSet = true;
							currentAddr.addressId = addressResObj.id;
							currentAddr.addressUserName = addressResObj.name;
							currentAddr.addressUserTel = addressResObj.mobile;
							currentAddr.addressTagName = addressResObj.tag_name;
							currentAddr.addressText = addressResObj.address;
							currentAddr.addressCoordinate = addressResObj.coordinate;
						} else {
							currentAddr.addressIsSet = false;
						}
					},
					[sellerAdrs]() {
						currentAddr.sellerImage = addressResObj.shop_image;
						currentAddr.sellerName = addressResObj.shop_name;
						currentAddr.sellerTel = addressResObj.mobile;
						currentAddr.sellerOpenTime = addressResObj.shop_bh;
						currentAddr.sellerAddress = addressResObj.shop_detail_address;
					},
					[zitiAdrs]() {
						let zitiList = assertArray(addressResObj.list).map((i, k) => {
							return {
								id: i.id,
								zitidianImage: i.img,
								isRange: i.is_range == 1,
								zitidianName: i.name,
								zitidianDist: i.dist,
								zitidianTime: i.bh,
								zitidianAddressText: i.address
							};
						});
						currentAddr.push(...zitiList);
					}
				};

				handleAddrFn[addressTypeText]();

				// ↓↓↓ 预约配送数据
				let yvyueResult = assertObject(resultObject.pt);
				let yvyueType = yvyueTypeEnum[yvyueResult.code];
				let yvyueData;
				if (yvyueType == dspcnow) {
					yvyueData = yvyueResult.data;
				} else {
					yvyueData = assertArray(yvyueResult.data).map(i => {
						let item = assertObject(i);
						let timeList = assertArray(item.list).map(tim => {
							let time = assertObject(tim);
							return {
								text: time.text,
								timeId: time.value
							};
						});
						return {
							text: item.title,
							timeList
						};
					});
				}

				// ↓↓↓ 配送费相关
				let dispFeeResult = assertObject(resultObject.freight);
				let dispFeeType = dispFeeTypeEnum[dispFeeResult.type];
				let dispFeePriceNum =
					dispFeeType == dispFeeShow ? transNumFn(toDoubleNumFn(dispFeeResult.price)) : 0;

				resFn({
					type: 'success',
					msg: isRange ? '获取订单页面数据成功' : result.data.msg,
					result: {
						...addressObject,

						yvyueType,
						yvyueData,

						dispFeeType,
						dispFeeTip: dispFeeResult.text,
						dispFeePriceText: dispFeeResult.price_text,
						dispFeePriceNum,

						isRange
					}
				});
			} else {
				resFn({
					type: 'error',
					msg: result.data.msg,
					result
				});
			}
		} else {
			resFn({
				type: 'error',
				msg: that.$errorMsg,
				result
			});
		}
	});
}
export {
	getMoreStoreToggleDispatchTypeDataFn,
}
