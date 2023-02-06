// 订单相关方法
import {
	assertObject,
	assertArray,
} from '@/tools/tools.js';

import {


	clientPlatformEnum,
	xcx_wx,
	xcx_tt,
	browser_third,
	browser_wx,
	app_android,
	app_ios,


	paymentTypeEnum,
	payment_zfb,
	payment_wx,


} from '@/tools/const.js';


import {
	oneModel,
	moreModel,
	storeType,
} from '@/pages/order/submit-order-enum.js';


/*
	@description 生成订单接口 返回对应的订单编号/订单id
	@param model { storeType }
		'oneModel' 单门店模式
		'moreModel' 多门店模式

	@param data { Object } 对应当前门店模式的订单参数
	@return Promise
*/
function createOrderFn(that, model, data) {
	return new Promise(async resFn => {
		let result = await that.$request({
			method: 'post',
			url: '/api/Orderbranch/orderSub',
			data: JSON.stringify(data)
		});
		console.log('生成订单接口 /api/Orderbranch/orderSub result.data', result.data);
		console.log('生成订单接口 JSON.stringify(result.data)', JSON.stringify(result.data));

		if (result.statusCode == 200) {
			let successCode = {
				[200]: true,
				[353209]: true,
				[30302]: true
			};
			if (successCode[result.data.code]) {
				let handleResFn = {
					// 正常
					[200]() {
						let resultData = assertObject(result.data.data);

						let orderId;
						let handleSuccessFn = {
							[oneModel]() {
								orderId = resultData.order_id;
							},
							[moreModel]() {
								orderId = resultData.order_number;
							}
						};
						handleSuccessFn[model]();
						resFn({
							code: 200,
							type: 'success',
							msg: '获取订单编号/订单id成功',
							result: orderId
						});
					},
					// 有失效商品
					[353209]() {
						resFn({
							code: 353209,
							type: 'success',
							msg: result.data.msg,
							result: assertArray(result.data.data).map(i => {
								return {
									goodsImage: i.original_img,
									msg: i.reason
								};
							})
						});
					},
					// 预约时间过时
					[30302]() {
						resFn({
							code: 30302,
							type: 'success',
							msg: result.data.msg
						});
					}
				};

				handleResFn[result.data.code]();
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

/*
	@description 支付接口
	@param 
		model { storeType }
			'oneModel' 单门店模式
			'moreModel' 多门店模式
		orderId 对应模式的订单编号/订单id
		platform 当前平台字符串
		payType 支付方式字符串
		isUseYve 是否使用余额
	@return Promise
*/

function getPayDataFn(that, model, orderId, platform, payType, isUseYve) {
	console.log('arguments', arguments);
	return new Promise(async resFn => {
		// 后台对应的平台参数
		let platformEnum = {
			[xcx_wx]: 'wxMiniProgram',
			[browser_third]: 'H5',
			[browser_wx]: 'wxOfficialAccount',
			[app_android]: 'App',
			[app_ios]: 'App'
		};

		// 后台对应的支付方式参数
		let payTypeEnum = {
			[payment_wx]: 'wechat',
			[payment_zfb]: 'alipay'
		};

		let data = {
			platform: platformEnum[platform],
			type: payTypeEnum[payType],
			is_money: isUseYve ? 1 : 0
		};


		if (model == storeType.oneModel) {
			data.order_id = orderId
		} else if (model == storeType.moreModel) {
			data.order_number = orderId
		}
		console.log('支付接口参数', {
			method: 'post',
			url: '/api/Payment/orderPay',
			data
		});
		let result = await that.$request({
			method: 'post',
			url: '/api/Payment/orderPay',
			data
		});
		console.log('支付接口参数', data);
		console.log('支付接口返回数据 /api/Payment/orderPay', result.data);
		console.log('支付接口返回数据 JSON.stringify(result.data)', JSON.stringify(result.data));

		if (result.statusCode == 200) {

			let successCode = {
				[2099]: true,
				[200]: true
			}

			if (successCode[result.data.code]) {
				let resultObject = {};

				let handleFn = {
					[2099]() {
						resultObject = {};
					},
					[200]() {
						// #ifdef MP-WEIXIN
						resultObject = JSON.parse(result.data.data.pay);
						// #endif
						
						// #ifdef APP-PLUS
						if(payType == payment_wx){
							resultObject = JSON.parse(result.data.data.pay);
						}else if(payType == payment_zfb){
							resultObject = result.data.data.pay
						}
						// #endif
						
						
						// #ifdef H5
						if(that.globalBrowserIsWx){
							resultObject = JSON.parse(result.data.data.pay);
						}else{
							resultObject = result.data.data.pay
						}
						// #endif
						
						
					},
				}
				handleFn[result.data.code]();
				resFn({
					code: result.data.code,
					type: 'success',
					msg: result.data.msg,
					result: resultObject
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


/*
	@description 把不能使用优惠原因字符串转成正常可展示的
		'商品金额差**元可用__101' -> '商品金额差101元可用'
		'' -> ''
*/
function getCouponNotUseMsg(notUseMsg) {
	if (notUseMsg.includes('**') && notUseMsg.includes('__')) {
		let [msg, money] = notUseMsg.split('__');
		let [msgStart, msgEnd] = msg.split('**');
		return `${msgStart}${money}${msgEnd}`;
	}
	return notUseMsg;
}
export {
	createOrderFn,
	getPayDataFn,
	getCouponNotUseMsg
}
