<template>
	<view class="page">
		<view style="height: 86rpx;"></view>
		<view class="class-list">
			<view class="content-wrap">
				<view
					@click="setTypeFn('all')"
					:class="type == 'all' ? 'act' : ''"
					:style="{ color: type == 'all' ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					全部
				</view>
				<view
					@click="setTypeFn('ing')"
					:class="type == 'ing' ? 'act' : ''"
					:style="{ color: type == 'ing' ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					拼团中
				</view>
				<view
					@click="setTypeFn('success')"
					:class="type == 'success' ? 'act' : ''"
					:style="{ color: type == 'success' ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					拼团成功
				</view>
				<view
					@click="setTypeFn('fail')"
					:class="type == 'fail' ? 'act' : ''"
					:style="{ color: type == 'fail' ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					拼团失败
				</view>
			</view>
		</view>
		<view class="list-block" v-if="list.length > 0">
			<view class="content-wrap">
				<block v-for="(item, index) in list" :key="index">
					<view class="item border-radius20" @click="navigateToFn({ url: `./me?id=${item.id}` })">
						<view class="title-tip">
							<view class="time-tip" v-if="item.gb_status == 0">{{ item.end_time | showTime }}</view>
							<view class="time-tip" v-else></view>
							<view class="share-num-tip">{{ item.status }}</view>
						</view>
						<view class="content-block">
							<view class="left-image-block">
								<image
									v-if="item.role == '团长'"
									class="id-image"
									:src="calcImageSrc('/my/tz-id.png')"
									mode=""
								></image>
								<image v-else class="id-image" :src="calcImageSrc('/my/yz-id.png')" mode=""></image>
								<view class="goods-image-block">
									<image class="goods-image" :src="item.original_img" mode=""></image>
								</view>
							</view>
							<view class="right-description-block">
								<view class="goods-name">{{ item.goods_name }}</view>
								<view class="goods-description"></view>
								<view class="tag-wrap">
									<view class="tag-block">{{ item.num }}人团</view>
								</view>
								<view class="price-wrap">
									<view class="shop-price-block-lr">
										<view class="origin-price">
											￥
											<text>{{ item.price }}</text>
										</view>
										<view class="line-price">￥{{ item.market_price }}</view>
									</view>
								</view>
							</view>
							<!-- #ifdef MP-WEIXIN -->

							<button
								v-if="item.gb_status == 0"
								@click.stop="catchTouchMove"
								:data-info="item"
								open-type="share"
								style="white-space: nowrap"
								class="share-btn border-radius"
								:style="{ background: configInfo.web_site_color }"
							>
								邀请好友
							</button>
							<!-- #endif -->

							<!-- #ifdef APP-PLUS -->

							<button
								v-if="item.gb_status == 0"
								@click.stop="onShareAppMessageFn(item)"
								:data-info="item"
								style="white-space: nowrap"
								class="share-btn border-radius"
								:style="{ background: configInfo.web_site_color }"
							>
								邀请好友
							</button>
							<!-- #endif -->

							<button
								v-if="item.gb_status == -1"
								@click.stop="$onceClick(toPayPageFn,item)"
								:data-info="item"
								style="white-space: nowrap"
								class="share-btn border-radius"
								:style="{ background: configInfo.web_site_color }"
							>
								去支付
							</button>

							<button
								v-if="item.gb_status == 2"
								@click.stop="useFn(item)"
								style="white-space: nowrap"
								class="share-btn border-radius"
								:style="{ background: configInfo.web_site_color }"
							>
								去使用
							</button>
						</view>
					</view>
				</block>
			</view>
		</view>
		<null-block
			v-else
			min-height="100vh"
			is-show-to-page-btn
			to-page-text="拼团首页"
			:to-page-url="{ type: 'redirectTo', url: '/packageA/pintuan/home' }"
		></null-block>

		<view class="bottom-tab-bar">
			<navigator open-type="redirect" url="./home" class="bar-btn" hover-class="none">
				<image :src="getBottomImg('ghs', 'mi')" mode=""></image>
				<!-- <image :src="calcImageSrc('/my/icon-home.png')" mode=""></image> -->
				<text>拼团首页</text>
			</navigator>

			<view class="bar-btn act">
				<!-- <image :src="calcImageSrc('/my/icon-p-o.png')" mode=""></image> -->
				<image :src="getBottomImg('mys', 'xi')" mode=""></image>
				<text :style="{ color: configInfo.web_site_color }">我的拼团</text>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="loadFn" @close="closeGlobalLoginFn" to-back></login-fn>


		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';

import { assertArray, assertObject } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			page: 1, // 页码
			type: 'all', // 类型
			list: [], // 列表
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onLoad(option) {
		let that = this;
		// #ifdef MP-WEIXIN
		uni.hideShareMenu({});
		// #endif
		if (option.shareFn) {
			that.setSharerStrFn_btn(option);
		}
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		that.loadFn();
	},
	methods: {
		loadFn() {
			let that = this;
			that.getMyGroupFn(() => {
				that.list = [];
			});
		},

		// #ifdef H5
		// 公众号 h5支付
		h5GzhPayFn(payType, result) {
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
						/* 
									let redirectUrl = encodeURIComponent(
										`${location.origin}${location.pathname}#/pages/order-state/zhifu?ord_id=1663`
									); 
									 */
						// let url = `${h5wxPayOptions.mweb_url}&redirect_url=${redirectUrl}`;
						let url = `${h5wxPayOptions.mweb_url}`;
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

			console.log('payType,result', payType, result);
		},

		// #endif

		// 商品加入购物车 并跳转
		async useFn(item) {
			let that = this;
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			uni.showLoading({});

			// 商品加入购物车 并跳转
			let goodsId = item.goods_id;
			let specId = item.spec_id;
			let result = await that.addShoppingCartFn(goodsId, 1, specId);

			uni.hideLoading();

			if (result.type == 'success') {
				that.navigateToFn({
					isTab: true,
					url: `/pages/cart/cart`
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
				return false;
			}
		},
		// 展示 不同订单类型
		setTypeFn(type) {
			let that = this;
			that.type = type;
			that.page = 1;
			that.getMyGroupFn(() => {
				that.list = [];
			}, true);
		},
		/*
				未支付的订单按钮
				跳转到去支付 页面
			*/
		async toPayPageFn(detail) {
			let that = this;
			console.log('去支付的detail--', detail);
			that.hideAllFn();
			uni.showLoading({})
			

			let result = await that.$request({
				method: 'post',
				url: '/api/pay/pay',
				data: {
					ord_id: detail.ord_id,
					Platform: detail.Platform,
					type: detail.pay_type
				}
			});

			console.log('/api/pay/pay 支付接口返回的数据', result);

			if (detail.pay_type == 'alipay') {
				// 支付宝支付

				let payOptions = {
					provider: 'alipay',
					orderInfo: result.data
				};

				let payMentOptions = {
					...payOptions,
					success(e) {
						that.hideAllFn();
						uni.showModal({
							showCancel: false, //不显示取消按钮
							title: '支付成功',
							success(e) {}
						});
					},
					fail(e) {}
				};
				console.log('payMentOptions 数据', payMentOptions);

				uni.requestPayment(payMentOptions);
			} else {
				// 其他支付方式
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						// 跳详情
						if (detail.pay_type == 'balance') {
							that.navigateToFn({
								type: 'redirectTo',
								url: `/packageA/pintuan/me?id=${detail.id}`
							});
							return false;
						}

						// #ifdef H5
						that.h5GzhPayFn(detail.pay_type, result);
						return false;
						// #endif

						// 支付
						let payOptions;
						// #ifdef MP-WEIXIN
						payOptions = JSON.parse(result.data.data);
						// #endif

						// #ifdef APP-PLUS
						payOptions = {
							provider: 'wxpay',
							orderInfo: result.data.data
						};
						// #endif

						let payMentOptions = {
							...payOptions,
							success(e) {
								that.hideAllFn();
								// 跳详情
								that.navigateToFn({
									// type: 'redirectTo',
									url: `/packageA/pintuan/me?id=${detail.id}`
								});
							},
							fail(e) {
								that.hideAllFn();
								that.getMyGroupFn(() => {
									that.list = [];
								});
								uni.showToast({
									icon: 'none',
									title: '支付失败'
								});
								return false;
							},
							complete(e) {
								console.log('调uni-app微信支付接口返回的东西', e);
							}
						};
						console.log('payMentOptions 数据', payMentOptions);
						uni.requestPayment(payMentOptions);
					} else {
						that.hideAllFn();
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						});
					}
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: that.$errorMsg
					});
				}
			}
		},
		// 获取我的拼团列表
		async getMyGroupFn(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/ordergroup/my_group',
				data: {
					page: that.page,
					type: that.type
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultArr = assertArray(result.data.data);

					if (resultArr.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					fn && fn(resultArr);

					that.list = that.list.concat(resultArr);
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
		// 获取底部图片
		getBottomImg(type, isAct) {
			for (let i = 0; i < this.configInfo.dodecorate.length; i++) {
				if (this.configInfo.dodecorate[i].field == 'ggs') {
					return this.addimgPathHostFn(this.configInfo.dodecorate[i].data[type][isAct]);
				}
			}
		},
		// #ifdef APP-PLUS
		// 安卓邀请好友
		onShareAppMessageFn(item) {
			let that = this;
			let shareOptions = {
				path: '/packageA/pintuan/me',
				query: {
					scene: true,
					id: item.gb_id
				},
				options: {
					title: `还差${item.buy_num}人! 快来团购${item.goods_name}`,
					imageUrl: item.original_img
				}
			};
			console.log('传过来的商品详情-安卓环境下', item);
			console.log('分享的参数-安卓环境下', shareOptions);
			that.shareAppFn(shareOptions);
		}
		// #endif
	},
	filters: {
		showTime(time) {
			if (time * 1000 < new Date().getTime()) {
				return '已失效';
			}
			let stamp = time * 1000 - new Date().getTime();
			let miao = Math.floor(stamp / 1000);
			return `${Math.floor(miao / 3600)}时${Math.floor(miao / 60) % 60}分${miao % 60}秒后失效`;
		}
	},
	// 上拉加载
	onReachBottom() {
		let that = this;
		that.page++;
		that.getMyGroupFn(() => {}, true);
	},
	// 下拉刷新
	onPullDownRefresh() {
		let that = this;
		that.getMyGroupFn(() => {
			that.list = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	onShareAppMessage(e) {
		let that = this;
		console.log('分享函数参数里分享的内容', e);
		let detail = e.target.dataset.info;

		return that.shareFn({
			path: '/packageA/pintuan/me',
			query: {
				scene: true,
				id: detail.gb_id
			},
			options: {
				title: `还差${detail.buy_num}人! 快来团购${detail.goods_name}`,
				imageUrl: detail.original_img
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	background: $bg-grey-color;
	min-height: 100vh;
}

.class-list {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	width: 100%;
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;
	}

	view {
		height: 86rpx;
		font-size: 26rpx;
		color: $grey1-color;
		font-weight: 600;
		display: flex;
		align-items: center;
		position: relative;

		.after {
			display: none;
		}

		&.act {

			.after {
				content: '';
				display: block;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 40rpx;
				height: 5rpx;
				border-radius: 10000rpx;
			}
		}
	}
}

.list-block {
	padding: 20rpx 0;

	.item {
		margin-bottom: 22rpx;
		height: 308rpx;
		background: #ffffff;

		.title-tip {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 20rpx;
			margin-right: 20rpx;
			height: 88rpx;
			border-bottom: 1px solid #f4f4f4;

			.time-tip {
				font-size: 25rpx;
				color: $grey2-color;
			}

			.share-num-tip {
				font-size: 28rpx;
				color: #ff6128;
			}
		}

		.content-block {
			height: 220rpx;
			display: flex;
			padding-left: 12rpx;
			position: relative;

			.left-image-block {
				width: 186rpx;
				height: 100%;
				position: relative;

				.id-image {
					width: 72rpx;
					height: 38rpx;
					position: absolute;
					z-index: 10;
					top: 40rpx;
				}

				.goods-image-block {
					width: 186rpx;
					height: 140rpx;
					position: absolute;
					z-index: 5;
					top: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.goods-image {
						width: 140rpx;
						height: 140rpx;
					}
				}
			}

			.right-description-block {
				padding-left: 22rpx;

				.goods-name {
					font-weight: 600;
					line-height: 66rpx;
					font-size: 26rpx;
					color: $grey1-color;
					width: 420rpx;
					@include text-ellipsis;
				}

				.goods-description {
					line-height: 28rpx;
					height: 28rpx;
					font-size: 23rpx;
					color: $grey2-color;
					width: 420rpx;
					@include text-ellipsis;
				}

				.tag-wrap {
					height: 66rpx;
					display: flex;
					align-items: center;
				}

				.price-wrap {
					@include shop-price-block-lr;
				}
			}

			.share-btn {
				position: absolute;
				right: 22rpx;
				bottom: 20rpx;
				width: 140rpx;
				height: 56rpx;
				@include flex-center;
				font-size: 23rpx;
				color: #ffffff;
			}
		}
	}
}

.bottom-tab-bar {
	height: 100rpx;
	background: #ffffff;
	display: flex;
	z-index: 100;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	width: 100%;

	image {
		width: 46rpx;
		height: 39rpx;
	}

	.bar-btn {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;

		text {
			text-indent: 0.5em;
		}

		color: $grey2-color;

		&.act {
			
		}
	}
}
</style>
