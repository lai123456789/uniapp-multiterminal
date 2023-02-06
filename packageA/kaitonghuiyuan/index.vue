<template>
	<view class="page">
		<view class="top-block">
			<view class="content-wrap">
				<view class="image-block">
					<image class="user-image" :src="userInfo.avatar" mode=""></image>
					<!-- <image class="user-title" :src="calcImageSrc('/my/hat.png')" mode=""></image> -->
				</view>
				<view class="user-description-block">
					<view class="user-description">
						<view class="user-name">{{ userInfo.nickname }}</view>
						<view class="tag-block border-radius">{{ userInfo.vip_name }}</view>
					</view>
					<!-- <view class="timer-block">2020.06.12 会员到期</view> -->
				</view>

				<view class="vip-jihuoma" @click="setJiHuoMaModalFlagFn(true)">激活码兑换</view>
			</view>
		</view>
		<view class="select-block">
			<view class="content-wrap">
				<view class="h3">选择会员套餐</view>
				<view class="scroll-view-wrap">
					<scroll-view :scroll-x="true" class="scroll-view-block">
						<view
							v-for="(item, index) in list"
							:key="index"
							class="item border-radius20"
							:class="index == actPrice ? 'act' : ''"
							@click="selectFn(index)"
						>
							<uni-icons
								v-if="index == actPrice"
								size="20"
								color="#d2a749"
								class="icon-btn"
								type="checkbox"
							></uni-icons>
							<uni-icons v-else size="20" color="#d8d8d8" class="icon-btn" type="circle"></uni-icons>
							<view class="time-block">{{ item.vip_days }}</view>
							<view class="price-block">
								<view class="price">¥{{ item.vip_or_price }}</view>
								<view class="market-price" v-if="item.vip_price - 0 > 0">¥{{ item.vip_price }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>

		<view class="total-price">
			<view class="content-wrap">
				<view class="h4">需支付: {{ list[actPrice].vip_or_price }}元</view>
			</view>
		</view>

		<view class="line-block-list">
			<!-- #ifdef MP-WEIXIN -->
			<view class="line-block" v-if="calcWeixinPayMiniprogram" @click="payTypeAct = 0">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image></view>
						<text>微信</text>
					</view>
					<view>
						<view v-if="payTypeAct == 0">
							<uni-icons size="25" type="circle-filled" :color="configInfo.web_site_color"></uni-icons>
						</view>
						<view v-if="payTypeAct != 0">
							<uni-icons size="25" type="circle" color="#c7c7c7"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="line-block" v-if="calcWeixinPayH5" @click="payTypeAct = 0">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')"></image></view>
						<text>微信</text>
					</view>
					<view>
						<view v-if="payTypeAct == 0">
							<uni-icons size="25" type="circle-filled" :color="configInfo.web_site_color"></uni-icons>
						</view>
						<view v-if="payTypeAct != 0">
							<uni-icons size="25" type="circle" color="#c7c7c7"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<!-- #endif -->

			<!-- 手机app -->
			<!-- #ifdef APP-PLUS -->
			<view class="line-block" v-if="calcWeixinPayAndroidApp" @click="payTypeAct = 0">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image></view>
						<text>微信</text>
					</view>
					<view>
						<view v-if="payTypeAct == 0">
							<uni-icons size="25" type="circle-filled" :color="configInfo.web_site_color"></uni-icons>
						</view>
						<view v-if="payTypeAct != 0">
							<uni-icons size="25" type="circle" color="#c7c7c7"></uni-icons>
						</view>
					</view>
				</view>
			</view>

			<view class="line-block" v-if="calcZhifubaoPayAndroidApp" @click="payTypeAct = 1">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-zfb.png')" mode=""></image></view>
						<text>支付宝</text>
					</view>
					<view>
						<view v-if="payTypeAct == 1">
							<uni-icons size="25" type="circle-filled" :color="configInfo.web_site_color"></uni-icons>
						</view>
						<view v-if="payTypeAct != 1">
							<uni-icons size="25" type="circle" color="#c7c7c7"></uni-icons>
						</view>
					</view>
				</view>
			</view>

			<!-- #endif -->

			<!-- 网页 -->
		</view>

		<view style="height: 100rpx;"></view>
		<view class="bottom-btn-block">
			<button
				class="pay-btn"
				:class="['order-btn', isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="$onceClick(payFn)"
				:style="{ background: configInfo.web_site_color, opacity: payBtnFlag ? 1 : 0.8 }"
			>
				立即支付
			</button>
		</view>

		<view class="flex-center modal-class" v-if="jiHuoMaModalFlag">
			<view class="modal-box">
				<view class="title">激活码</view>

				<view class="input-group">
					<view class="input-item border-radius">
						<input class="input-dom" type="text" placeholder="请输入激活码" v-model="jiHuoMaStr" />
					</view>
				</view>
				<view class="btn-group">
					<button
						class="clear-btn-style wx-bind-btn border-radius flex-center "
						style="display: flex;border-radius: 1000px;"
						:style="{ background: configInfo.web_site_color }"
						@click="commitJiHuoMaFn"
					>
						<view class="text">确认兑换</view>
					</button>
				</view>

				<view class="clone-btn" @click="setJiHuoMaModalFlagFn(false)">
					<uni-icons type="close" size="30" color="#ffffff"></uni-icons>
				</view>
			</view>
		</view>

		<loading-css :is-show="isShowLoading"></loading-css>
		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="getOpenVipFn" @close="closeGlobalLoginFn" hide-page to-back></login-fn>

		
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';

import { assertArray, assertObject, assertString } from '@/tools/tools.js';
import { host } from '@/tools/siteinfo.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			payTypeAct: 0, // 支付方式 0微信  1支付宝

			payBtnFlag: true, // 支付按钮被点击状态 true可以点击, false不能点击

			actPrice: 0,
			list: [{}],
			userInfo: {},
			jiHuoMaModalFlag: false, // 激活码模态框显示隐藏 状态
			jiHuoMaStr: '', // 输入的激活码字符串
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onLoad() {
		let that = this;
		// #ifdef APP-PLUS
		if (that.calcWeixinPayAndroidApp) {
			that.payTypeAct = 0;
		} else if (that.calcZhifubaoPayAndroidApp) {
			that.payTypeAct = 1;
		} else {
			that.payTypeAct = -1;
		}
		// #endif

		// #ifdef APP-PLUS
		if (!that.calcWeixinPayAndroidApp && !that.calcZhifubaoPayAndroidApp) {
			uni.showModal({
				showCancel: false, //不显示取消按钮
				title: '平台未开通APP微信支付和APP支付宝支付',
				success(e) {
					//确认后的回调
					console.log(e);
					that.toBackFn();
				}
			});
			return false;
		}
		// #endif

		// #ifdef MP-WEIXIN
		if (!that.calcWeixinPayMiniprogram) {
			uni.showModal({
				showCancel: false, //不显示取消按钮
				title: '平台未开通小程序微信支付',
				success(e) {
					//确认后的回调
					console.log(e);
					that.toBackFn();
				}
			});
			return false;
		}
		// #endif
		// #ifdef H5
		if (that.globalBrowserIsWx) {
			if (!that.calcWeixinofficialaccount) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '平台未开通公众号微信支付',
					success(e) {
						//确认后的回调
						console.log(e);
						that.toBackFn();
					}
				});
				return false;
			}
		} else {
			if (!that.calcWeixinPayH5) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '平台未开通h5微信支付',
					success(e) {
						//确认后的回调
						console.log(e);
						that.toBackFn();
					}
				});
				return false;
			}
		}
		// #endif
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		that.getOpenVipFn();
	},
	methods: {
		// 设置激活码模态框的 显示 隐藏 状态
		setJiHuoMaModalFlagFn(flag) {
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
			that.jiHuoMaModalFlag = flag;
		},
		// 提价兑换 激活码
		async commitJiHuoMaFn() {
			let that = this;
			let jiHuoMaStr = assertString(that.jiHuoMaStr);
			if (jiHuoMaStr.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '请输入激活码'
				});
				return false;
			}
			let result = await that.$request({
				loading: true,
				method: 'post',
				url: `/api/User/vipCdkey`,
				data: {
					cdkey: jiHuoMaStr
				}
			});

			if (result.statusCode == 200) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: result.data.msg,
					success(e) {
						that.jiHuoMaStr = '';
						that.setJiHuoMaModalFlagFn(false);
						that.toBackFn();
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},
		// 选择套餐
		selectFn(index) {
			this.actPrice = index;
		},
		// 获取开通会员页面的数据
		async getOpenVipFn() {
			let that = this;
			let platformObject = {};
			// #ifdef MP-WEIXIN
			platformObject.platform = 'wxMiniProgram';
			// #endif
			// #ifdef APP-PLUS
			platformObject.platform = 'App';
			// #endif
			// #ifdef H5
			platformObject.platform = 'wxOfficialAccount';
			// #endif
			console.log('给后台的 platformObject 数据', platformObject);
			let result = await that.$request({
				url: '/api/User/OpenVip',
				data: {
					...platformObject
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					that.list = assertArray(resultObj.list);
					that.userInfo = assertObject(resultObj.userinfo);
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
		// 支付
		async payFn() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (!that.calcWeixinPayMiniprogram) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '平台未开通小程序微信支付',
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}
			// #endif

			// #ifdef APP-PLUS
			if (!that.calcWeixinPayAndroidApp && !that.calcZhifubaoPayAndroidApp) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '平台未开通APP微信支付和APP支付宝支付',
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}
			// #endif

			// #ifdef H5
			// 公众号浏览器
			if (that.globalBrowserIsWx) {
				if (!that.calcWeixinofficialaccount) {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '平台未开通公众号微信支付',
						success(e) {
							//确认后的回调
							console.log(e);
						}
					});
					return false;
				}
			} else {
				if (!that.calcWeixinPayH5) {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '平台未开通h5微信支付',
						success(e) {
							//确认后的回调
							console.log(e);
						}
					});
					return false;
				}
			}
			// #endif
			
			
			
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
			

			if (!that.payBtnFlag) {
				return false;
			}
			that.payBtnFlag = false;

			that.hideAllFn();
			uni.showLoading({});

			let platform;
			// #ifdef MP-WEIXIN
			platform = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			platform = 'App';
			// #endif

			// #ifdef H5

			if (that.globalBrowserIsWx) {
				platform = 'wxOfficialAccount';
			} else {
				platform = 'H5';
			}

			// #endif

			let data = {
				proType: 'vip',
				recordId: that.list[that.actPrice].id,
				Platform: platform
			};

			// 支付方式 0微信  1支付宝
			if (that.payTypeAct == 0) {
				data.type = 'wechat';
			} else if (that.payTypeAct == 1) {
				data.type = 'alipay';
			}

			let result = await that.$request({
				method: 'POST',
				url: '/api/Payment/Pay',
				data
			});
			console.log('/api/Payment/Pay 接口的参数', data);
			console.log('/api/Payment/Pay 接口返回的数据', result);
			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObject = assertObject(result.data.data);

					let payOptions;
					// #ifdef MP-WEIXIN
					payOptions = JSON.parse(resultObject.pay);
					// #endif

					// #ifdef APP-PLUS
					payOptions = {};
					if (that.payTypeAct == 0) {
						payOptions.provider = 'wxpay';
						payOptions.orderInfo = JSON.parse(resultObject.pay);
					} else if (that.payTypeAct == 1) {
						payOptions.provider = 'alipay';
						payOptions.orderInfo = resultObject.pay;
					}
					// #endif
					// #ifdef APP-PLUS || MP-WEIXIN
					let payMentOptions = {
						...payOptions,
						success(e) {
							that.hideAllFn();
							that.payBtnFlag = true;
							console.log('成功', e);
							uni.showToast({
								icon: 'success',
								title: '支付成功'
							});
						},
						fail(e) {
							that.hideAllFn();
							that.payBtnFlag = true;
							console.log('失败', e);
							uni.showToast({
								icon: 'none',
								title: '充值失败'
							});
						}
					};
					console.log('payMentOptions 数据', payMentOptions);
					// return false;
					uni.requestPayment(payMentOptions);
					// #endif

					// #ifdef H5
					if (that.globalBrowserIsWx) {
						// 公众号支付
						let gzhWxPayOptions = JSON.parse(resultObject.pay);
						console.log('gzhWxPayOptions----->', gzhWxPayOptions);
						WeixinJSBridge.invoke('getBrandWCPayRequest', gzhWxPayOptions, function(res) {
							console.log('jweixinModule.invoke 结果', res);
							if (res.err_msg == 'get_brand_wcpay_request:ok') {
								that.hideAllFn();
								that.payBtnFlag = true;
								uni.showToast({
									icon: 'success',
									title: '支付成功'
								});
							} else {
								that.hideAllFn();
								that.payBtnFlag = true;
								uni.showToast({
									icon: 'none',
									title: '已取消支付'
								});
								return false;
							}
						});
					} else {
						// 普通浏览器支付

						let h5wxPayOptions = resultObject.pay;
						that.hideAllFn();
						that.payBtnFlag = true;

						let redirectUrl = encodeURIComponent(
							`https://${host}/h5/#/packageA/kaitonghuiyuan/huiyuanjieshao`
						);

						let url = `${h5wxPayOptions}&redirect_url=${redirectUrl}`;
						console.log(url);

						location.href = url;
					}
					// #endif
				} else {
					that.hideAllFn();
					that.payBtnFlag = true;
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				that.hideAllFn();
				that.payBtnFlag = true;
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
image {
	width: 100rpx;
	height: 100rpx;
}

.top-block {
	position: relative;

	.content-wrap {
		overflow: hidden;
		height: 175rpx;
		display: flex;
		align-items: center;
		background: #352c2c;
	}

	.image-block {
		position: relative;
		margin-right: 10rpx;
		width: 80rpx;
		height: 80rpx;

		.user-image {
			position: absolute;
			z-index: 15;
			width: 100%;
			height: 100%;
			border-radius: 50%;
			border: 1px solid #201818;
		}

		.user-title {
			position: absolute;
			z-index: 10;
			top: 0;
			right: 0;
			width: 62rpx;
			height: 52rpx;
			transform: translateY(-50%) translateX(30%) scaleX(-1) scale(0.8);
		}
	}

	.vip-jihuoma {
		position: absolute;
		font-size: 24rpx;
		z-index: 10;
		color: #ffd787;
		right: 30rpx;
		top: 24rpx;
	}

	.user-description-block {
		display: flex;
		flex-direction: column;

		.user-description {
			display: flex;
			align-items: center;
			font-size: 0;

			.user-name {
				font-size: 30rpx;
				display: flex;
				align-items: center;
				color: #ffffff;
			}

			.tag-block {
				margin-left: 20rpx;
				border: 1px solid #b99d66;
				color: #b99d66;
			}
		}

		.timer-block {
			color: #ffffff;
			font-size: 16rpx;
		}
	}
}

.select-block {
	.h3 {
		display: flex;
		height: 88rpx;
		align-items: center;
		font-size: 34rpx;
		color: $grey1-color;
	}

	.scroll-view-wrap {
		overflow: hidden;
		height: 215rpx;
	}

	.scroll-view-block {
		white-space: nowrap;
		height: 235rpx;
		@include hide-scrollbar;
	}

	.item {
		@include flex-center;
		display: inline-flex;
		position: relative;
		flex-direction: column;
		margin-left: 10rpx;
		width: 215rpx;
		height: 215rpx;
		background: #f5f5f5;

		.time-block {
			color: #423d40;
			font-size: 30rpx;
			line-height: 54rpx;
		}

		&.act {
			background-image: linear-gradient(#fcf7ea, #faecce);
		}

		&:first-child {
			margin-left: 0;
		}

		.icon-btn {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}

		.price-block {
			display: flex;
			align-items: flex-end;

			.price {
				color: #3c363a;
				font-size: 30rpx;
			}

			.market-price {
				margin-left: 10rpx;
				font-size: 25rpx;
				text-decoration: line-through;
				color: #8d8d8d;
			}
		}
	}
}

.total-price {
	.h4 {
		line-height: 100rpx;
		border-bottom: 1px solid #e6e6e6;
		font-size: 30rpx;
		font-weight: 600;
	}
}

.line-block {
	border-top: 1px solid #f8f8f8;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;

		.left-block {
			display: flex;
			align-items: center;

			.image-block {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				color: $grey1-color;
				text-indent: 0.5em;
				font-size: 26rpx;
			}
		}
	}
}

.bottom-btn-block {
	@include flex-center;
	position: fixed;
	z-index: 200;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	.pay-btn {
		@include btn-green;
	}
}

.modal-class {
	position: fixed;
	z-index: 500;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(148, 148, 148, 0.87);

	.modal-box {
		position: relative;
		margin: 0 38rpx;
		padding: 0 40rpx 20rpx;
		width: 100%;
		border-radius: 20rpx;
		background: #ffffff;

		.title {
			line-height: 134rpx;
			font-size: 32rpx;
			color: #000000;
		}

		.input-group {
			.input-item {
				display: flex;
				margin-bottom: 30rpx;
				padding: 0 30rpx;
				height: 90rpx;
				background: #eeeeee;

				.input-dom {
					flex: 1;
					height: 100%;
				}

				.get-code-btn {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					position: relative;
					width: 190rpx;
					font-size: 26rpx;

					&::after {
						content: '';
						display: block;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 1px;
						height: 40rpx;
						background: #afafaf;
					}
				}
			}
		}

		.btn-group {
			padding: 0 6rpx;

			.sm-bind-btn,
			.wx-bind-btn {
				height: 88rpx;
				color: #ffffff;
				font-size: 28rpx;
				margin-bottom: 30rpx;
			}

			.sm-bind-btn {
				background: #dfdfdf;
			}

			.wx-bind-btn {
				background: #89d151;
			}
		}

		.clone-btn {
			position: absolute;
			bottom: -130rpx;
			left: 50%;
			transform: translateX(-50%);
			padding: 20rpx;
			width: 100rpx;
			height: 100rpx;
		}
	}
}
</style>
