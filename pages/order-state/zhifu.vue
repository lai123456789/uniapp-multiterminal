<template>
	<view class="page">
		<view class="cancel-block">
			<view class="content-wrap">
				<view class="cancel-content border-radius20">
					<view class="before" :style="{ background: configInfo.web_site_color }"></view>
					<view class="h3-block">
						<view class="h3-1">{{ orderDetail.status }}</view>
						<view class="h3-2" v-if="orderDetail.status == '待支付'">剩余支付时间 {{ showTime }}</view>
					</view>
					<view class="h4">
						<view class="btn-buy border-radius20" @click="cancelFn" v-if="orderDetail.status == '待支付'">取消订单</view>
						<view class="btn-buy border-radius20" @click="$onceClick(payFn)" v-if="orderDetail.status == '待支付'">
							确认支付
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-list-block">
			<view class="content-wrap">
				<view class="goods-content border-radius20">
					<view class="title">
						<view class="h3">购物清单</view>
						<!-- 
						<view class="h4">
							预计送达时间 {{ orderDetail.peisong_time }}
						</view>
						 -->
					</view>
					<view class="goods-list">
						<block v-for="(item, index) in goods" :key="index">
							<view class="item">
								<view class="image-block"><image :src="item.original_img" mode=""></image></view>
								<view class="goods-description-block">
									<view class="goods-name">
										<view class="name-block">{{ item.goods_name }}</view>
										<view class="price-block">¥ {{ item.single_price }}</view>
									</view>
									<view class="goods-description-box">
										<view class="goods-description">
											{{ (item.spec_name ? item.spec_name : item.goods_remark) | filterSpecName }}
										</view>
										<view class="num">× {{ item.buy_num }}</view>
									</view>

									<view class="tag-list" v-if="item.tag_name && trimFn(item.tag_name)">
										<view class="tag-block">{{ item.tag_name }}</view>
									</view>
								</view>
							</view>
						</block>
					</view>

					<view class="xiaofei">
						<view class="good-price">
							<view class="text">商品金额</view>
							<view class="cont">¥{{ orderDetail.ord_price }}</view>
						</view>
						<view class="peisong">
							<view class="text">配送费</view>
							<view class="cont">¥{{ orderDetail.peisong_price }}</view>
						</view>

						<view class="peisong" v-if="orderDetail.balance_price - 0">
							<view class="text">余额抵扣</view>
							<view class="cont">¥{{ orderDetail.balance_price }}</view>
						</view>
					</view>
				</view>
				<view class="zongjia border-radius20">
					实付金额:
					<text>¥{{ orderDetail.pay_price }}</text>
				</view>

				<view class="order-info border-radius20">
					<view class="line">
						<text>订单编号: {{ orderDetail.ord_bh }}</text>
						<text
							class="copy-btn"
							@click="copyFn(orderDetail.ord_bh)"
							:style="{ color: configInfo.web_site_color }"
						>
							复制
						</text>
					</view>
					<view class="line">
						<text>下单时间: {{ orderDetail.add_time }}</text>
					</view>
					<view class="line">
						<text>支付方式: {{ orderDetail.pay_type }}</text>
					</view>
					<view class="line">
						<text>配送方式: {{ orderDetail.post_type_text }}</text>
					</view>
					<!-- <view class="line">
						<text>付款时间: 2020-05-01 11:40:23</text>
					</view> -->
					<view class="line" v-if="orderDetail.quehuo">
						<text>如遇缺货: {{ orderDetail.quehuo }}</text>
					</view>
				</view>
			</view>
		</view>

		<loading-css :is-show="isShowLoading" />
	</view>
</template>

<script>
import { assertObject, assertArray, assertString, transNumFn } from '@/tools/tools.js';
import {
	promTypeEnumObj,
	promTypeCommon,
	promTypeRob,
	promTypeGroup,
	promTypeIntegral,
	promTypePreSale
} from '@/tools/const.js';
let timer;
export default {
	data() {
		return {
			isShowLoading: true,
			ord_id: null,
			orderDetail: {},
			goods: [],
			cancel_order_countdown: null,
			showTime: ''
		};
	},
	onLoad(options) {
		let that = this;
		that.ord_id = options.ord_id;
	},
	onShow() {
		let that = this;
		that.getOrderDetailFn(() => {
			let orderZhifuLoadCont = transNumFn(uni.getStorageSync('orderZhifuLoadCont'));
			if (orderZhifuLoadCont) {
				// orderZhifuLoadCont 进入支付页面的次数
				uni.setStorageSync('orderZhifuLoadCont', orderZhifuLoadCont + 1);
			} else {
				uni.setStorageSync('orderZhifuLoadCont', 1);
			}

			if (assertObject(that.orderDetail).prom_type == promTypeEnumObj[promTypePreSale]) {
				let _orderZhifuLoadCont = transNumFn(uni.getStorageSync('orderZhifuLoadCont'));
				if (_orderZhifuLoadCont <= 1) {
					that.payFn();
				} else {
					if (!uni.getStorageSync('orderZhifuReloadFlag')) {
						uni.setStorageSync('orderZhifuReloadFlag', 1); // orderZhifuReloadFlag  是否重载过支付页面
						// #ifdef H5
						location.reload();
						// #endif
					}
				}
				return false;
			} else {
				if (assertObject(that.orderDetail).status == '待支付') {
					let _orderZhifuLoadCont = transNumFn(uni.getStorageSync('orderZhifuLoadCont'));
					if (_orderZhifuLoadCont <= 1) {
						that.payFn();
					} else {
						if (!uni.getStorageSync('orderZhifuReloadFlag')) {
							uni.setStorageSync('orderZhifuReloadFlag', 1);
							// #ifdef H5
							location.reload();
							// #endif
						}
					}
				}
			}
		});
	},
	methods: {
		// 获取剩余支付时间
		getCancelOrderCountdown() {
			let that = this;
			that.cancel_order_countdown = that.$store.state.configInfo.cancel_order_countdown;
			that.setTime(that.orderDetail.add_time, that.cancel_order_countdown);
		},
		// 页面关闭时 清除定时器
		onUnload() {
			clearInterval(timer);
		},
		// 给变量不停地设置 当前距离结束的秒数
		setTime(str, num) {
			let that = this;
			clearInterval(timer);
			timer = setInterval(() => {
				str = str + '';
				str = str.replace(/-/g, '/'); // 日期格式处理

				let createTime = new Date(str).getTime();
				let newTime = new Date().getTime();

				if (createTime + num * 60 * 1000 <= newTime) {
					that.showTime = `0:0`;
					return;
				}

				let showTime = Math.floor((createTime + num * 60 * 1000 - newTime) / 1000);
				that.showTime = `${Math.floor(showTime / 60)}:${Math.floor(showTime % 60)}`;
			}, 800);
		},

		// 获取当前订单信息
		async getOrderDetailFn(fn) {
			let that = this;
			let result = await that.$request({
				url: '/api/order/order_detail',
				data: {
					id: that.ord_id
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let orderDetail = assertObject(result.data.data);
					let goods = assertArray(orderDetail.goods);
					that.orderDetail = orderDetail;
					that.goods = goods;
					console.log(
						'0.获取订单详情 /api/order/order_detail 接口 数据',
						result,
						'\n',
						'1.商品列表',
						goods,
						'\n',
						'2.订单详情',
						orderDetail,
						'\n',
						'3.支付方式',
						orderDetail.pay_type,
						'\n'
					);
					that.getCancelOrderCountdown();
					fn && fn();
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
			that.isShowLoading = false;
		},
		// 支付函数
		async payFn() {
			let that = this;
			let type, Platform;

			// 判断是否需要调取微信支付
			if (that.orderDetail.pay_type == '余额支付') {
				type = 'balance';
				// #ifdef MP-WEIXIN
				Platform = 'wxMiniProgram';
				// #endif

				// #ifdef APP-PLUS
				Platform = 'App';
				// #endif

				// #ifdef H5
				if (that.globalBrowserIsWx) {
					// 公众号微信浏览器
					Platform = 'wxOfficialAccount';
				} else {
					// 非微信浏览器 普通浏览器
					Platform = 'H5';
				}
				// #endif
			}
			if (that.orderDetail.pay_type == '微信支付' && that.orderDetail.balance_price - 0 >= 0) {
				// #ifdef MP-WEIXIN
				type = 'wechat';
				Platform = 'wxMiniProgram';
				// #endif

				// #ifdef APP-PLUS
				type = 'wechatApp';
				Platform = 'App';
				// #endif

				// #ifdef H5
				if (that.globalBrowserIsWx) {
					// 公众号微信浏览器
					type = 'wechatOfficialAccount';
					Platform = 'wxOfficialAccount';
				} else {
					// 非微信浏览器 普通浏览器
					type = 'wechatH5';
					Platform = 'H5';
				}
				// #endif
			}

			if (that.orderDetail.pay_type == '支付宝支付' && that.orderDetail.balance_price - 0 >= 0) {
				// #ifdef APP-PLUS
				type = 'alipay';
				Platform = 'App';
				// #endif

				// #ifdef H5
				if (!that.globalBrowserIsWx) {
					// 非微信浏览器 普通浏览器
					type = 'alipayH5';
					Platform = 'H5';
				}
				// #endif
			}

			let opt = {
				loading: true,
				method: 'post',
				url: '/api/pay/pay',
				data: {
					type,
					Platform,
					ord_id: that.ord_id
				}
			};
			console.log('/api/pay/pay 接口参数', opt);

			// 去后台拿签名
			let result = await that.$request(opt);
			console.log('/api/pay/pay 接口返回数据', result);

			if (result.statusCode == 200) {
				if (that.orderDetail.pay_type == '支付宝支付') {
					let zfbStr = assertString(result.data);

					let payMentOptions = {
						provider: 'alipay',
						orderInfo: zfbStr,
						success(e) {
							console.log('成功', e);
							that.getOrderDetailFn(() => {
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付成功',
									success(e) {
										//确认后的回调
										// that.toBackFn()
										// that.getOrderDetailFn()
									}
								});
							});
						},
						fail(e) {
							return;
							console.log('失败！！！！', e);
							uni.showModal({
								showCancel: false, //不显示取消按钮
								title: '支付失败',
								success(e) {
									//确认后的回调
									// that.toBackFn()
								}
							});
						}
					};
					console.log('payMentOptions 对象', payMentOptions);
					uni.requestPayment(payMentOptions);
				} else {
					if (result.data.code == 200) {
						// 余额支付
						if (that.orderDetail.pay_type == '余额支付' || that.orderDetail.pay_price - 0 == 0) {
							// 直接提示支付成功
							that.getOrderDetailFn(() => {
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付成功',
									success(e) {
										//确认后的回调
										// that.getOrderDetailFn()
										// that.toBackFn()
									}
								});
							});
						} else {
							// #ifdef H5
							that.h5GzhPayFn(result);
							return false;
							// #endif

							// 前端调 微信支付 付款
							let payOptions;

							// #ifdef MP-WEIXIN
							payOptions = JSON.parse(result.data.data);
							// #endif

							// #ifdef APP-PLUS
							payOptions = result.data.data;
							let providerObj = {};
							if (that.orderDetail.pay_type == '微信支付') {
								providerObj.provider = 'wxpay';
							}
							// #endif

							let payMentOptions = {
								// #ifdef MP-WEIXIN
								...payOptions,
								// #endif

								// #ifdef APP-PLUS
								...providerObj,
								orderInfo: payOptions,
								// #endif

								success(e) {
									console.log('成功', e);
									that.getOrderDetailFn(() => {
										uni.showModal({
											showCancel: false, //不显示取消按钮
											title: '支付成功',
											success(e) {
												//确认后的回调
												// that.toBackFn()
												// that.getOrderDetailFn()
											}
										});
									});
								},
								fail(e) {
									return;
									console.log('失败！！！！', e);
									uni.showModal({
										showCancel: false, //不显示取消按钮
										title: '支付失败',
										success(e) {
											//确认后的回调
											// that.toBackFn()
										}
									});
								}
							};
							console.log('payMentOptions 对象', payMentOptions);
							uni.requestPayment(payMentOptions);
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						});
					}
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},
		// 取消订单
		cancelFn() {
			let that = this;
			// 未付款不用提交原因信息
			// console.log(that.orderDetail, that.ord_id, 'that.orderDetail');

			uni.showModal({
				title: '取消订单',
				async success(e) {
					if (e.confirm) {
						let result = await that.$request({
							loading: true,
							url: '/api/order/qx_order',
							data: {
								id: that.ord_id
							}
						});

						if (result.statusCode == 200) {
							if (result.data.code == 200) {
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: result.data.msg,
									success(e) {
										//确认后的回调
										that.toBackFn();
									}
								});
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
		// #ifdef H5
		// h5公众号支付
		h5GzhPayFn(result) {
			let that = this;
			console.log('公众号支付返回的东西', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let gzhWxPayOptions = assertObject(result.data.data); // 公众号支付需要的数据

					if (that.globalBrowserIsWx) {
						gzhWxPayOptions.timeStamp = `${gzhWxPayOptions.timeStamp}`;
						console.log('gzhWxPayOptions 参数', gzhWxPayOptions);
						// 公众号支付
						WeixinJSBridge.invoke('getBrandWCPayRequest', gzhWxPayOptions, function(res) {
							console.log('jweixinModule.invoke 结果', res);

							if (res.err_msg == 'get_brand_wcpay_request:ok') {
								that.getOrderDetailFn(() => {
									uni.showModal({
										showCancel: false, //不显示取消按钮
										title: '支付成功',
										success(e) {
											//确认后的回调
											// that.toBackFn()
											// that.getOrderDetailFn()
										}
									});
								});
							} else {
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付失败',
									success(e) {
										//确认后的回调
										// that.toBackFn()
									}
								});
								return false;
							}
						});
					} else {
						// 普通浏览器支付
						let h5wxPayOptions = assertObject(result.data.data); // 公众号支付需要的数据
						let redirectUrl = encodeURIComponent(`${location.href}`);

						let url = `${h5wxPayOptions.mweb_url}&redirect_url=${redirectUrl}`;
						console.log(url);
						location.href = url;
					}
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
		// #endif
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	min-height: 100vh;
	overflow: hidden;
	padding-top: 10rpx;
	padding-bottom: 10rpx;
	background: $bg-grey-color;
}

@mixin border {
	border-bottom: 1px solid #f8f8f8;
}

.cancel-content {
	position: relative;
	margin-top: 20rpx;
	padding: 0 20rpx;
	margin-bottom: 20rpx;
	overflow: hidden;
	background: #ffffff;

	.before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 24rpx;
	}

	.h3-block {
		margin-top: 36rpx;
		@include border;

		.h3-1 {
			font-size: 34rpx;
			font-weight: 600;
			color: $grey1-color;
			line-height: 2em;
		}

		.h3-2 {
			font-size: 28rpx;
			color: $grey2-color;
			line-height: 70rpx;
		}
	}

	.h4 {
		display: flex;
		justify-content: flex-end;

		.btn-buy {
			@include flex-center;
			margin: 12rpx 0;
			margin-left: 12rpx;
			width: 160rpx;
			height: 64rpx;
			border: 1px solid #efefef;
			color: $grey1-color;
			font-size: 25rpx;
		}
	}
}

.goods-list-block {
	.goods-content {
		background: #ffffff;
		padding: 0 20rpx;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 86rpx;

			.h3 {
				font-size: 34rpx;
				font-weight: 600;
				color: $grey1-color;
			}

			.h4 {
				font-size: 22rpx;
				color: $grey2-color;
			}
		}

		.goods-list {
			.item {
				display: flex;
				padding: 20rpx 0;
				height: 200rpx;
				@include border;

				&:first-child {
					border-top: 1px solid #f8f8f8;
				}

				.image-block {
					margin-right: 40rpx;
					width: 160rpx;
					height: 160rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.goods-description-block {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;

					.goods-name {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.name-block,
						.price-block {
							font-size: 30rpx;
							color: $grey1-color;
						}

						.name-block {
							max-width: 9em;
							@include text-ellipsis;
						}
					}

					.goods-description-box {
						display: flex;
						justify-content: space-between;
						align-items: center;
						height: 60rpx;

						.num,
						.goods-description {
							font-size: 22rpx;
							color: $grey2-color;
							max-width: 16em;
							@include text-ellipsis;
						}
					}

					.tag-list {
						font-size: 0;
					}
				}
			}
		}

		.xiaofei {
			.peisong,
			.good-price {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 85rpx;
				color: $grey1-color;
				font-size: 26rpx;
				font-weight: 600;
			}
		}
	}

	.zongjia {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 20rpx 0;
		padding: 0 20rpx;
		height: 88rpx;
		background: #ffffff;
		font-size: 28rpx;
		color: $grey2-color;

		text {
			text-indent: 0.5em;
			font-weight: 600;
			color: $grey1-color;
		}
	}

	.order-info {
		padding: 0 20rpx;
		background: #ffffff;
		margin-bottom: 20rpx;

		.line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88rpx;
			font-size: 23rpx;
			color: $grey1-color;
		}

		.copy-btn {
		}
	}
}
</style>
