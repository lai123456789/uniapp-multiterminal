<template>
	<view
		class="card-item-block border-radius20"
		@click="
			navigateToFn({
				url: '/pages/order-state/dingdan-state?backPage=dingdanList&type=' + type + '&id=' + orderInfo.id
			})
		"
	>
		<view class="top-bar">
			<view class="time-block">{{ orderInfo.add_time }}</view>
			<view class="state">{{ orderInfo.status }}</view>
		</view>
		<view class="goods-block">
			<view class="goods-list-block">
				<view class="image-block" v-for="(item, index) in orderInfo.original_img" :key="index">
					<image :src="item"></image>
				</view>
			</view>
			<view class="price-info">
				共{{ orderInfo.buy_num }}件 实付:
				<text v-if="orderInfo.prom_type == 'integral'">{{ orderInfo.pay_price }}积分</text>
				<text v-else>¥{{ orderInfo.pay_price }}</text>
			</view>
		</view>
		<view class="btn-block" v-if="checkShow">
			<!-- 0：待付款   -->
			<block v-if="orderInfo.oStatus == 0">
				<view
					@click.stop="toPayPageFn(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greenStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
					:style="{ background: configInfo.web_site_color }"
				>
					去付款
				</view>
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
				<view
					@click.stop="cancelFn(orderInfo.id, 'oStatus0')"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					取消订单
				</view>
			</block>

			<!-- 1：待配送 -->
			<block v-if="orderInfo.oStatus == 1">
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
				<view
					@click.stop="cancelFn(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					取消订单
				</view>
			</block>

			<!-- 2：配送中/待自提 -->
			<block v-if="orderInfo.oStatus == 2">
				<!-- post_type == 2 快递配送需要自己收获 -->
				<view
					v-if="orderInfo.post_type == 2"
					@click.stop="querenshouhuo(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greenStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
					:style="{ background: configInfo.web_site_color }"
				>
					确认收货
				</view>
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 3：待评价 -->
			<block v-if="orderInfo.oStatus == 3">
				<view
					@click.stop="
						navigateToFn({
							url: `/pages/my/dingdan/pingjia?id=${orderInfo.id}&postType=${orderInfo.post_type}`
						})
					"
					:class="[
						'btn-block-box',
						'greenStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
					:style="{ background: configInfo.web_site_color }"
				>
					评价
				</view>
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 4：用户评价后订单完成 -->
			<block v-if="orderInfo.oStatus == 4">
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 5：成功送达后 售后审核通过 -->
			<block v-if="orderInfo.oStatus == 5">
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 6：未付款超时的   -->
			<block v-if="orderInfo.oStatus == 6">
				<view
					@click.stop="cancelFn(orderInfo.id, 'oStatus6')"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					取消订单
				</view>

				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 7:成功生成订单后,待支付订单 用户在客户端手动取消 -->
			<block v-if="orderInfo.oStatus == 7">
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 8：后台整个订单退款 -->
			<block v-if="orderInfo.oStatus == 8">
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>

			<!-- 9：客户端取消订单 -->
			<block v-if="orderInfo.oStatus == 9">
				<view
					v-if="orderInfo.prom_type == 'pre_sale' ? false : true"
					@click.stop="zailaiyidan(orderInfo.id)"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					再来一单
				</view>
			</block>
			<!-- 10：定金已付 -->
			<block v-if="orderInfo.oStatus == 10">
				<view
					@click.stop="toPayWeikuanFn"
					:class="[
						'btn-block-box',
						yvshouStyle.type ? 'greenStyle' : 'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
					:style="{ background: yvshouStyle.type ? configInfo.web_site_color : '#ffffff' }"
				>
					付尾款
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { transNumFn, timeStr2timeObj, assertArray, assertObject } from '@/tools/tools.js';
export default {
	props: {
		orderInfo: {
			type: Object,
			default() {
				return {};
			}
		},
		type: {
			type: [String, Number]
		}
	},
	methods: {
		// 去付款页面
		toPayPageFn(id) {
			let that = this;
			that.navigateToFn({
				url: `/pages/order-state/dingdan-state?id=${id}&backPage=dingdanList&pay=1`
			});
		},

		// 根据订单id获取 该订单的违约金 和 违约金描述
		getWeiYueJin(id) {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/order/order_cancel_reduce',
					data: {
						id
					}
				});

				//数据返回后 处理方式  处理数据
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						resFn({
							type: 'success',
							msg: result.data.msg,
							result: result.data.data
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result: result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result: result
					});
				}
			});
		},
		// 取消订单
		async cancelFn(id, oStatus) {
			let that = this;
			// 如果是未支付的订单 取消不用写理由 直接弹框确认
			if (oStatus == 'oStatus0' || oStatus == 'oStatus6') {
				console.log(id, '', '\n', that.orderInfo, '', '\n');
				uni.showModal({
					title: '取消订单',
					async success(e) {
						if (e.confirm) {
							let result = await that.$request({
								loading: true,
								url: '/api/order/qx_order',
								data: {
									id
								}
							});

							if (result.statusCode == 200) {
								if (result.data.code == 200) {
									that.$emit('refreshFn');
								} else {
									uni.showToast({
										icon: 'none',
										title: result.data.msg
									});
								}
							} else {
								uni.showToast({
									icon: 'none',
									title: that.$errorMsg
								});
							}
						}
					}
				});
				return;
			}

			let weiYueJinResult = await that.getWeiYueJin(id);
			if (weiYueJinResult.type == 'error') {
				uni.showToast({
					icon: 'none',
					title: weiYueJinResult.msg
				});
				return false;
			}
			let {
				deduct_fee, // 违约金  如果不是0 就 弹框以下文字提醒
				desc // 文字提醒
			} = weiYueJinResult.result;

			let title = deduct_fee <= 0 ? '取消订单' : desc;

			uni.showModal({
				title,
				async success(e) {
					if (e.confirm) {
						that.navigateToFn({
							// backPage=dingdanList 返回的页面是订单列表页面
							url: `/pages/my/dingdan/qvxiao?backPage=dingdanList&id=${id}`
						});
					}
				}
			});
		},
		querenshouhuo(ord_id) {
			let that = this;
			uni.showModal({
				title: '确认收货',
				async success(e) {
					if (e.confirm) {
						let result = await that.$request({
							url: '/api/order/confirm',
							data: {
								ord_id
							}
						});

						console.log('确认 26--', result);

						if (result.statusCode == 200) {
							if (result.data.code == 200) {
								that.$emit('refreshFn');
							} else {
								uni.showToast({
									icon: 'none',
									title: result.data.msg
								});
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: that.$errorMsg
							});
						}
					}
				}
			});
		},
		// 再来一单
		async zailaiyidan(ord_id) {
			let that = this;
			let result = await that.$request({
				url: '/api/order/again',
				data: {
					ord_id
				}
			});

			if (result.data.code == 200) {
				that.navigateToFn({
					url: '/pages/cart/cart',
					isTab: true
				});
			} else {
				uni.showToast({
					title: result.data.msg,
					icon: 'none'
				});
			}
			console.log(result, '再来一单 结果');
		},
		// 跳转到付尾款页面
		async toPayWeikuanFn() {
			let that = this;
			// #ifdef MP-WEIXIN

			let userLocationInfo = await that.settingInfoFn('scope.userLocation'); // 用户授权位置信息
			console.log('用户授权位置信息 userLocationInfo', userLocationInfo);

			if (userLocationInfo.type == 'success') {
				if (userLocationInfo.isFirst) {
					let locationInfo = await that.getLocationInfoFn();
					console.log('locationInfo 获取位置', locationInfo);
					return false;
				} else {
					if (userLocationInfo.isOk) {
						let locationInfo = await that.getLocationInfoFn();
						console.log('locationInfo 获取位置', locationInfo);

						if (locationInfo.type == 'success') {
							uni.setStorageSync('cartAddress', {
								latitude: locationInfo.result.latitude,
								longitude: locationInfo.result.longitude
							});
						} else {
							that.navigateToFn({
								url: `/packageA/set-address-page/index`
							});
							return false;
						}
					} else {
						that.navigateToFn({
							url: `/packageA/set-address-page/index`
						});
						return false;
					}
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: userLocationInfo.msg
				});
				return false;
			}
			// #endif

			// #ifdef APP-PLUS

			let locationInfo = await that.getLocationInfoFn();
			console.log('locationInfo 获取位置', locationInfo);
			if (locationInfo.type == 'success') {
				uni.setStorageSync('cartAddress', {
					latitude: locationInfo.result.latitude,
					longitude: locationInfo.result.longitude
				});
			} else {
				that.navigateToFn({
					url: `/packageA/set-address-page/index`
				});
				return false;
			}

			uni.setStorageSync('cartAddress', {
				latitude: locationInfo.result.latitude,
				longitude: locationInfo.result.longitude
			});

			// #endif

			// #ifdef H5

			let locationInfo = await that.getLocationInfoFn();

			if (locationInfo.type == 'success') {
				uni.setStorageSync('cartAddress', {
					latitude: locationInfo.result.latitude,
					longitude: locationInfo.result.longitude
				});
			} else {
				that.navigateToFn({
					url: `/packageA/set-address-page/index`
				});
				return false;
			}

			// #endif

			let ordId = that.orderInfo.id,
				goodsImage = assertArray(that.orderInfo.original_img)[0],
				goodsId = that.orderInfo.goods_id,
				buyNum = that.orderInfo.buy_num,
				specId = that.orderInfo.spec_id;

			if (that.yvshouStyle.type) {
				uni.setStorageSync('orderInfo', that.orderInfo);
				that.navigateToFn({
					url: `/packageB/order/pre-sale-order-weikuan?ordId=${ordId}&goodsId=${goodsId}&specId=${specId}&buyNum=${buyNum}&goodsImage=${goodsImage}`
				});
			} else {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: that.yvshouStyle.msg,
					success(e) {}
				});
			}
		}
	}, // <------  methods 结束
	computed: {
		// 根据订单类型prom_type 和 订单状态oStatus 返回是否显示 订单卡片底部的功能按钮
		checkShow() {
			let that = this;
			let orderInfo = assertObject(that.orderInfo);

			// 11: 预售订单,定金已退 什么都不显示
			if (orderInfo.oStatus == 11) {
				return false;
			}
			// 预售订单
			if (orderInfo.prom_type == 'pre_sale') {
				
				
				// 4: 用户评价后订单完成
				if (orderInfo.oStatus == 4) {
					return false;
				}
				// 5: 成功送达后 售后审核通过
				if (orderInfo.oStatus == 5) {
					return false;
				}
				
				// 取消订单
				if (orderInfo.oStatus == 6) {
					return false;
				}
				
				// 7: 用户在客户端手动取消
				if (orderInfo.oStatus == 7) {
					return false;
				}
				// 8: 后台 "整个订单退款" 按钮
				if (orderInfo.oStatus == 8) {
					return false;
				}
				// 9: 客户端取消订单
				if (orderInfo.oStatus == 9) {
					return false;
				}
			}
			return true;
		},
		/*
			@description
				预售商品按钮的样式
			@return <Object>
	    */
		yvshouStyle() {
			let that = this;

			let newTime = new Date().getTime(); // 现在的时间戳

			let payoffTimeStart = transNumFn(that.orderInfo.payoff_time_start) * 1000; // 预售商品开始付款的时间戳
			let payoffTimeEnd = transNumFn(that.orderInfo.payoff_time_end) * 1000; // 预售商品结束付款的时间戳

			if (payoffTimeStart < newTime && newTime < payoffTimeEnd) {
				return {
					type: true
				};
			}

			let payoffTimeStartTimeObj = timeStr2timeObj(payoffTimeStart); // 预售商品开始付款的时间 对象
			let payoffTimeEndTimeObj = timeStr2timeObj(payoffTimeEnd); // 预售商品结束付款的时间 对象

			let msg = `付款时间在 ${payoffTimeStartTimeObj.month}.${payoffTimeStartTimeObj.day} ${
				payoffTimeStartTimeObj.hours
			}:${payoffTimeStartTimeObj.minutes}-${payoffTimeEndTimeObj.month}.${payoffTimeEndTimeObj.day} ${
				payoffTimeEndTimeObj.hours
			}:${payoffTimeEndTimeObj.minutes}`;

			if (payoffTimeStart > newTime) {
				return {
					type: false,
					msg
				};
			}

			if (newTime > payoffTimeEnd) {
				return {
					type: false,
					msg
				};
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.card-item-block {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 20rpx;
	margin-bottom: 20rpx;
	// height: 460rpx;
	background: #ffffff;

	.goods-block {
		height: 248rpx;
		border-top: 1px solid #f8f8f8;
		border-bottom: 1px solid #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.goods-list-block {
			font-size: 0;
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			overflow-x: auto;
			@include hide-scrollbar;

			.image-block {
				display: inline-block;
				margin-right: 20rpx;
				width: 165rpx;
				height: 165rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.price-info {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: $grey1-color;
			font-size: 26rpx;

			text {
				font-weight: 600;
			}
		}
	}

	.top-bar,
	.btn-block {
		height: 86rpx;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.time-block {
			font-size: 20rpx;
			color: $grey2-color;
		}

		.state {
			font-size: 26rpx;
			color: #ff6128;
		}
	}

	.btn-block {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.btn-block-box {
			@include flex-center;
			width: 160rpx;
			height: 64rpx;
			margin-left: 0.5em;
			border-radius: 10rpx;
			font-size: 26rpx;
			color: #ffffff;
			border: 1px solid transparent;

			&.greyStyle {
				color: $grey1-color;
				border: 1px solid #efefef;
			}
		}
	}
}
</style>
