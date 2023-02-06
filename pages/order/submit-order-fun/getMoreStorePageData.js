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

import { getCouponNotUseMsg } from '@/pages/order/submit-order-fun/order.js'; // 订单相关方法
/*
	@description 获取多店提交订单页面展示基本数据
	@param
		客户端设备的经度信息
		longitude <Number> 纬度
		latitude <Number>  经度

		StoreType <String> 'all' 所有门店一块算
		StoreType <Number>  单个门店id
	@return Promise
*/

function getMoreStorePageData(that, longitude, latitude, StoreType) {
	return new Promise(async resFn => {
		let result = await that.$request({
			method: 'post',
			url: '/api/Orderbranch/orderPre',
			data: {
				lon: longitude,
				lat: latitude,
				supp_id: StoreType
			}
		});
		// console.log('多门店 /api/Orderbranch/orderPre 接口数据', result);

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

				let isHasZiying = false; // 是否有自营


				// ↓↓↓ 多门店页面顶部的地址
				let addressResult = assertObject(resultObject.address);
				let addressResObj = assertObject(addressResult.data);

				let addressIsSet = false;
				let addressId = null;
				let addressUserName = '';
				let addressUserTel = '';
				let addressTagName = '';
				let addressText = '';
				let addressCoordinate = '';

				if (Object.keys(addressResObj).length) {
					addressIsSet = true;
					addressId = addressResObj.id;
					addressUserName = addressResObj.name;
					addressUserTel = addressResObj.mobile;
					addressTagName = addressResObj.tag_name;
					addressText = addressResObj.address;
					addressCoordinate = addressResObj.coordinate;
				} else {
					addressIsSet = false;
					addressId = null;
					addressUserName = '';
					addressUserTel = '';
					addressTagName = '';
					addressText = '';
					addressCoordinate = '';
				}



				// ↓↓↓ 商品券 优惠券相关数据
				let couponOptions = {};

				let moreStoreDispFee = 0; // 多门店的自营店配送费

				// 所有门店列表
				let moreStoreList = assertArray(resultObject.data).map(i => {
					let item = assertObject(i);

					// 门店信息
					let itemInfoObject = assertObject(item.info);

					// data[0].info.store_info
					let itemInfoStoreInfo = assertObject(itemInfoObject.store_info);


					
					
					let storeIsZiying = itemInfoStoreInfo.id == 0; // 是否自营

					if (storeIsZiying) {
						isHasZiying = true; // 有自营商店
					}
					// data[0].info.prinf
					let infoPrinf = assertObject(itemInfoObject.prinf);
					
					let shifuGoodsPrice = infoPrinf.total_price; // 商品实付商品金额
					


					// ↓↓↓ 配送方式
					let dispatchTypeList = assertArray(item.dm).map(i => {
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

					let addressInfo = assertObject(item.dmio); // 四种方式对应的地址信息
					let addressResObj = assertObject(addressInfo.data); // data数据
					let addressTypeText = addressEnum[transNumFn(addressInfo.type)]; // 类型数字对应的枚举字符串
					let currentAddr = addressObject[addressTypeText]; // 当前地址信息

					addressObject.addressTypeText = addressTypeText;

					let handleAddrFn = {
						[userAdrs]() {
							if (checkTypeFn(addressResObj) == 'Object' && Object.keys(
									addressResObj).length) {
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
					let yvyueResult = assertObject(item.pt);
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
					// 预约立即送出字符串
					// 预约数据
					let yvyueText, yvyueRangeDataArr;
					if (yvyueType == dspcnow) {
						yvyueText = yvyueData;
					} else {
						yvyueRangeDataArr = yvyueData;
					}

					// 商品的优惠金额 商品金额数据
					let orderInfo = assertObject(item.order_info);

					// ↓↓↓ 配送费相关
					let dispFeeResult = assertObject(item.freight);
					let dispFeeType = dispFeeTypeEnum[dispFeeResult.type];
					let dispFeePriceNum =
						dispFeeType == dispFeeShow ? transNumFn(toDoubleNumFn(dispFeeResult
							.price)) : 0;

					if (storeIsZiying && dispFeeType == dispFeeShow && dispFeePriceNum > 0) {
						moreStoreDispFee = dispFeePriceNum;
					}

					if (storeIsZiying) {
						// ↓↓↓ 优惠券
						let discountCouponResult = assertObject(item.coupon);
						let discountCouponCode = transNumFn(discountCouponResult.code);
						let discountCouponUserId = assertObject(discountCouponResult.info)
							.coupon_user_id;
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
								useCouponPrice
								
								
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

						// 优惠券
						couponOptions.discountCouponList = discountCouponList;
						couponOptions.discountCouponIndex = discountCouponIndex;

						// ↓↓↓ 商品券相关
						couponOptions.goodsCouponList = assertArray(item.gc).map(i => {
							return {
								goodsCouponId: i.id,
								goodsCouponGoodsId: i.goods_id,
								goodsCouponGoodsName: i.name,
								goodsCouponPrice: transNumFn(i.money),
								goodsCouponImage: i.original_img
							};
						});
					}

					return {
						storeId: itemInfoStoreInfo.id,
						storeIsZiying,
						storeName: itemInfoStoreInfo.name,
						storeImage: itemInfoStoreInfo.img,




						isRange: itemInfoObject.is_da == 1, // 是否在配送范围内

						dispatchTypeList,
						...addressObject,

						yvyueType,
						yvyueData,
						yvyueText,
						yvyueRangeDataArr,

						yvyueDayKey: 0, // 预约天索引
						yvyueTimeKey: 0, // 预约小时索引
						yvyueDayBeifenKey: 0, // 预约天备份索引
						yvyueTimeBeifenKey: 0, // 预约小时备份索引

						// 商品列表
						goodsList: assertArray(item.goods_list).map(item => {
							return {
								goodsId: item.goods_id,
								goodsImg: item.original_img,
								goodsName: item.goods_name,
								specName: item.spec_name,
								cartNum: item.cart_num,
								goodsPrice: item.shop_price
							};
						}),
						// 是否显示失效商品列表
						invalidGoodsListIsShow: false,
						// 失效商品列表
						loseGoodsList: assertArray(item.lose_goods).map(item => {
							return {
								goodsImg: item.original_img,
								goodsName: item.goods_name,
								specName: item.spec_name,
								loseMsg: item.reason,
								goodsPrice: item.shop_price
							};
						}),

						...couponOptions,

						
						shifuGoodsPrice, // 商品实付商品金额

						// 商品优惠金额
						goodsDiscountsPrice: toDoubleNumFn(transNumFn(orderInfo
							.goods_discounts_price)),
						// 商品金额
						goodsPrice: toDoubleNumFn(transNumFn(orderInfo.goods_price)),

						dispFeeType,
						dispFeeTip: dispFeeResult.text,
						dispFeePriceText: dispFeeResult.price_text,
						dispFeePriceNum,

						// 自提数据
						usernameText: '', // 名字
						usertelText: '', // 电话

						beizhuInputOpacity: false, // 备注框
						beizhuText: '' // 备注文字
					};
				});

				// 处理实付金额
				let priceOptions = {};
				let totalOrderInfo = assertObject(resultObject.total_order_info);
				let allDiscountsPrice = totalOrderInfo.discounts_price; // 优惠金额
				let shifu = totalOrderInfo.pay_price; // 支付金额
				if (isHasZiying) {
					if (couponOptions.discountCouponIndex >= 0) {
						let useCouponPrice =
							couponOptions.discountCouponList[couponOptions.discountCouponIndex]
							.useCouponPrice; // 优惠券钱数
						// 
						shifu = transNumFn(toDoubleNumFn(bigPlus(shifu, useCouponPrice)));
						allDiscountsPrice = transNumFn(
							toDoubleNumFn(bigMinus(allDiscountsPrice, useCouponPrice))
						);
					}
					if (moreStoreDispFee > 0) {
						shifu = transNumFn(toDoubleNumFn(bigMinus(shifu, moreStoreDispFee)));
					}
				}
				priceOptions.allDiscountsPrice = allDiscountsPrice;
				priceOptions.shifu = shifu;

				resFn({
					type: 'success',
					msg: result.data.msg,
					result: {
						isHasZiying,

						addressIsSet,
						addressId,
						addressUserName,
						addressUserTel,
						addressTagName,
						addressText,
						addressCoordinate,

						yve: transNumFn(assertObject(resultObject.user_info).money),
						moreStoreList,
						...couponOptions,
						...priceOptions
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
	getMoreStorePageData,
}
