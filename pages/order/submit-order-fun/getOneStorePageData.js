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

import {
	getCouponNotUseMsg
} from '@/pages/order/submit-order-fun/order.js'; // 订单相关方法


/*
	@description 获取单店提交订单页面展示基本数据
	@param
		客户端设备的经度信息
		longitude <Number> 纬度
		latitude <Number>  经度
	@return Promise
*/

function getOneStorePageData(that, longitude, latitude) {
	return new Promise(async resFn => {
		let result = await that.$request({
			method: 'post',
			url: '/api/Orderbranch/orderPre',
			data: {
				lon: longitude,
				lat: latitude
			}
		});
		console.log('/api/Orderbranch/orderPre 接口返回数据', result);
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

				// 商品实付金额
				let infoResult = assertObject(resultObject.info);
				let infoPrinfResult = assertObject(infoResult.prinf);
				let shifuGoodsPrice = transNumFn(toDoubleNumFn(infoPrinfResult.total_price));
				
				

				// ↓↓↓ 配送方式数组
				let dispatchTypeList = assertArray(resultObject.dm).map(i => {
					let dispatchTypeItem = assertObject(i);
					return {
						id: dispatchTypeItem.id,
						name: dispatchTypeItem.name
					};
				});

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

				// ↓↓↓ 商品价格 优惠价格 待支付 总优惠
				let orderInfoResult = assertObject(resultObject.order_info);

				// ↓↓↓ 配送费相关
				let dispFeeResult = assertObject(resultObject.freight);
				let dispFeeType = dispFeeTypeEnum[dispFeeResult.type];
				let dispFeePriceNum =
					dispFeeType == dispFeeShow ? transNumFn(toDoubleNumFn(dispFeeResult.price)) : 0;

				// ↓↓↓ 优惠券相关
				let discountCouponResult = assertObject(resultObject.coupon);
				let discountCouponCode = transNumFn(discountCouponResult.code);
				let discountCouponUserId = assertObject(discountCouponResult.info).coupon_user_id;
				let discountCouponList = assertArray(discountCouponResult.list).map(i => {
					
					let discountCouponMoney = transNumFn(toDoubleNumFn(i.money)); // 优惠券面值多少钱
					
					let discountCouponIsUse = i.is_use == 1; // 是否可用
					let useCouponPrice; // 当前优惠券可优惠并抵扣的金额
					if(discountCouponIsUse){
						if(shifuGoodsPrice >= discountCouponMoney){
							useCouponPrice = discountCouponMoney;
						}else{
							useCouponPrice = shifuGoodsPrice;
						}
					}else{
						useCouponPrice = 0;
					}
					return {
						discountCouponUserId: i.coupon_user_id, // 关联id
						discountCouponName: i.coupon_name, // 【名字】
						discountCouponRightTitle: i.coupon_title, // 名字后标题
						discountCouponUseType: i.user_coupon_use_type, // 类型
						discountCouponUseRange: i.goods_range_title, // 范围
						discountCouponUseTime: i.indate, // 时间
						discountCouponMoney,
						discountCouponLeftTitle: i.title, // 红包上标题
						discountCouponNotUseMsg: getCouponNotUseMsg(i.not_reason), // 不可以原因
						discountCouponIsUse,
						useCouponPrice,
					};
				});

				let discountCouponIndex;

				let handleDiscountCouponFn = {
					[0]() {
						discountCouponIndex = -1;
					},
					[1]() {
						discountCouponIndex = discountCouponList.findIndex(
							i => i.discountCouponUserId == discountCouponUserId
						);
					}
				};
				handleDiscountCouponFn[discountCouponCode]();

				// 处理实付金额
				let shifu = transNumFn(orderInfoResult.pay_price);
				let allDiscountsPrice = transNumFn(orderInfoResult.total_discounts_price);
				if (discountCouponIndex >= 0) {
					let useCouponPrice = discountCouponList[discountCouponIndex].useCouponPrice;
					shifu = transNumFn(toDoubleNumFn(bigPlus(shifu, useCouponPrice)));
					allDiscountsPrice = transNumFn(
						toDoubleNumFn(bigMinus(allDiscountsPrice, useCouponPrice))
					);
				}

				// 有配送费时
				if (dispFeeType == dispFeeShow) {
					shifu = transNumFn(toDoubleNumFn(bigMinus(shifu, dispFeePriceNum)));
				}
				
				
				// 商品列表
				let goodsList = assertArray(resultObject.goods_list).map(item => {
					return {
						goodsId: item.goods_id,
						goodsImg: item.original_img,
						goodsName: item.goods_name,
						specName: item.spec_name,
						cartNum: item.cart_num,
						goodsPrice: item.shop_price
					};
				})
				

				resFn({
					type: 'success',
					msg: result.data.msg,
					result: {
						dispatchTypeList,
						...addressObject,
						// 商品列表
						goodsList,
						// 失效商品列表
						loseGoodsList: assertArray(resultObject.lose_goods).map(item => {
							return {
								goodsImg: item.original_img,
								goodsName: item.goods_name,
								specName: item.spec_name,
								loseMsg: item.reason,
								goodsPrice: item.shop_price
							};
						}),
						yve: transNumFn(assertObject(resultObject.user_info).money),

						yvyueType,
						yvyueData,

						ziyingGoodsAllPrice: transNumFn(orderInfoResult.goods_price),
						ziyingGoodsDiscountsPrice: transNumFn(orderInfoResult
							.goods_discounts_price),
						shifu,
						allDiscountsPrice,

						dispFeeType,
						dispFeeTip: dispFeeResult.text,
						dispFeePriceText: dispFeeResult.price_text,
						dispFeePriceNum,

						// 优惠券
						discountCouponList,
						discountCouponIndex,
						// ↓↓↓ 商品券相关
						goodsCouponList: assertArray(resultObject.gc).map(i => {
							
							// 过滤出可用商品券的商品
							let useGoodsCoupon = goodsList.filter(goods=>goods.goodsId == i.goods_id);
							
							// 商品券可抵扣的钱数
							let goodsCouponPrice = useGoodsCoupon.length ? useGoodsCoupon[0].goodsPrice : transNumFn(i.money);
							
							return {
								goodsCouponId: i.id,
								goodsCouponGoodsId: i.goods_id,
								goodsCouponGoodsName: i.name,
								goodsCouponPrice,
								goodsCouponImage: i.original_img
							};
						}),
						shifuGoodsPrice,
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
	getOneStorePageData,
}
