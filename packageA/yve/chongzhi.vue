<template>
	<view>
		<swiper
			:autoplay="false"
			:duration="400"
			@change="swiperChangeFn"
			:circular="!true"
			:current="currentNum"
			previous-margin="106rpx"
			next-margin="106rpx"
		>
			<swiper-item v-for="(item, index) in stored" :key="index">
				<view class="swiper-item">
					<bank-card
						:bg-type="index + 1"
						:card-name="donateName"
						:rmb="item.price"
						:description="item.send_price"
						:endtime="item.su_title"
					></bank-card>
				</view>
			</swiper-item>
		</swiper>

		<view class="price-block">
			<view
				v-for="(item, index) in stored"
				:key="index"
				@click="selectCardFn(index)"
				:class="['item', currentNum == index ? 'act' : '']"
				:style="{ color: currentNum == index ? configInfo.web_site_color : '' }"
			>
				<view class="after" :style="{ background: configInfo.web_site_color }"></view>
				{{ item.price }}元
			</view>
		</view>

		<view class="title-tip">
			<view class="h5">
				买储值卡充值
				<block v-if="donateIsShow">/赠送</block>
			</view>
			<view class="h6" v-if="donateIsShow">可以买卡赠送给亲朋友好友了</view>
		</view>

		<view class="line-block-list">
			<view class="line-block" @click="toMeFn">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/per2.png')" mode=""></image></view>
						<text>我的账户</text>
					</view>
					<view>
						<uni-icons
							v-if="toWhom == 0"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>
			<view class="line-block" @click="isShowSettelModal = true" v-if="donateIsShow">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block">
							<image :src="calcImageSrc('/my/icon-more.png')" mode=""></image>
						</view>
						<text>其他账户{{ inpTelConfirmBtn ? '(' + tel + ')' : '' }}</text>
					</view>
					<view>
						<uni-icons
							v-if="toWhom == 1"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<view class="h3">*说明: 购买成功后额外赠送的奖励将直接绑定至购买者的账户。</view>
		<view class="title-tip">
			<view class="h5">支付方式</view>
			<view class="h6">充值说明</view>
		</view>

		<view class="line-block-list">
			<!-- #ifdef MP-WEIXIN -->
			<view class="line-block" @click="payType = 0" v-if="calcWeixinPayMiniprogram">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image></view>
						<text>微信</text>
					</view>
					<view>
						<uni-icons
							v-if="payType == 0"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>
			<!-- #endif -->

			<!-- #ifdef H5 -->
			<view class="line-block" @click="payType = 0" v-if="globalBrowserIsWx && calcWeixinofficialaccount">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image></view>
						<text>微信</text>
					</view>
					<view>
						<uni-icons
							v-if="payType == 0"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>

			<view class="line-block" @click="payType = 0" v-if="!globalBrowserIsWx && calcWeixinPayH5">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image></view>
						<text>微信</text>
					</view>
					<view>
						<uni-icons
							v-if="payType == 0"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>

			<!-- #endif -->

			<!-- #ifdef H5 -->
			<!-- 
			普通浏览器(非微信客户端浏览器) 暂时取消支付宝支付
			<view class="line-block" @click="payType = 1" v-if="!globalBrowserIsWx">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-zfb.png')" mode=""></image></view>
						<text>支付宝</text>
					</view>
					<view>
						<uni-icons
							v-if="payType == 1"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view> 
			 -->
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->

			<view class="line-block" @click="payType = 0" v-if="calcWeixinPayAndroidApp">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image></view>
						<text>微信</text>
					</view>
					<view>
						<uni-icons
							v-if="payType == 0"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>

			<view class="line-block" @click="payType = 1" v-if="calcZhifubaoPayAndroidApp">
				<view class="content-wrap">
					<view class="left-block">
						<view class="image-block"><image :src="calcImageSrc('/my/icon-zfb.png')" mode=""></image></view>
						<text>支付宝</text>
					</view>
					<view>
						<uni-icons
							v-if="payType == 1"
							size="25"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
						<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
					</view>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
		<view style="height: 100rpx;"></view>
		<view class="settel-modal-block" v-if="isShowSettelModal">
			<view class="settel-modal border-radius20">
				<view class="title-tip">输入充值账户手机号码</view>
				<input class="inp" @input="inpTelChangeFn" type="text" placeholder="请输入充值账户手机号码" />
				<view class="btn-block">
					<button type="default" class="btn-block-default btn-cancel border-radius20" @click="cancelFn">取消</button>
					<button
						@click="confirmFn"
						type="default"
						class="btn-block-default border-radius20"
						:class="[inpTelConfirmBtn ? 'btn-confirm' : '']"
						:style="{ background: inpTelConfirmBtn ? configInfo.web_site_color : '#e8e9ea' }"
					>
						确认
					</button>
				</view>
			</view>
		</view>

		<view class="bottom-btn-block">
			<button
				class="pay-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="$onceClick(payFn)"
				:style="{ background: configInfo.web_site_color, opacity: payBtnFlag ? 1 : 0.8 }"
			>
				需支付{{ stored[currentNum].price }}元
			</button>
		</view>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="getStoredInfoFn" @close="closeGlobalLoginFn" hide-page to-back></login-fn>


		
	</view>
</template>

<script>
import {
    mapState
} from 'vuex'
import { bindMobileTips } from '@/tools/const.js';
import { assertObject, assertArray } from '@/tools/tools.js';
import bankCard from './chongzhi-components/bank-card';
export default {
	components: {
		bankCard
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			currentNum: 0, // 当前索引
			inpTelConfirmBtn: false,
			isShowSettelModal: false,
			payType: 0, // 支付方式 微信0 支付宝1
			toWhom: 0, // 给xx充值0   自己 1其他人
			tel: '', // 手机号

			payBtnFlag: true, // 支付按钮被点击状态 true可以点击, false不能点击

			donateName: '', // 储值卡名称
			donateIsShow: false, // 买储值卡充值/赠送开关  0：隐藏  1：显示
			stored: [{}] // 轮播的数据
		};
	},
	onLoad() {
		let that = this;
		// #ifdef APP-PLUS
		if (that.calcWeixinPayAndroidApp) {
			that.payType = 0;
		} else if (that.calcZhifubaoPayAndroidApp) {
			that.payType = 1;
		} else {
			that.payType = -1;
		}

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
		
		that.isShowLoading = true; // 开屏动画
		that.getStoredInfoFn();
	},
	methods: {
		// 轮播图切换
		swiperChangeFn(e) {
			this.currentNum = e.detail.current;
		},
		inpTelChangeFn(e) {
			let that = this;
			let val = e.detail.value;
			that.inpTelConfirmBtn = that.regTel(val);
			that.tel = val;
		},
		// 取消
		cancelFn() {
			let that = this;
			that.isShowSettelModal = false;
			that.toWhom = 0;
			that.inpTelConfirmBtn = false;
			that.tel = '';
		},
		// 确定
		confirmFn() {
			let that = this;
			console.log('that.inpTelConfirmBtn', that.inpTelConfirmBtn);
			if (that.inpTelConfirmBtn) {
				if (that.userInfoMobile == that.tel) {
					that.toWhom = 0;
					that.isShowSettelModal = false;
					that.inpTelConfirmBtn = false;
					that.tel = '';
				} else {
					that.isShowSettelModal = false;
					that.toWhom = 1;
				}
			}
		},
		toMeFn() {
			let that = this;
			that.toWhom = 0;
			that.inpTelConfirmBtn = false;
			that.tel = '';
		},
		selectCardFn(index) {
			this.currentNum = index;
		},
		// 获取充值页面 的展示信息
		async getStoredInfoFn() {
			let that = this;
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

			let result = await that.$request({
				method: 'post',
				url: '/api/User/StoredDetails',
				data: {
					platform
				}
			});
			console.log('api/User/StoredDetails 接口返回的数据', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					that.donateName = resultObj.donate_name; // 储值卡名称
					that.donateIsShow = resultObj.donate_is_show == 1; // 买储值卡充值/赠送开关  0：隐藏  1：显示
					that.stored = assertArray(resultObj.stored); // 轮播的数据
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
			let obj = {};
			if (that.toWhom == 1) {
				obj.mobile = that.tel;
			} else {
				obj = {};
			}

			let Platform;

			// #ifdef MP-WEIXIN
			Platform = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			Platform = 'App';
			// #endif

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				Platform = 'wxOfficialAccount';
			} else {
				Platform = 'H5';
			}
			// #endif

			let data = {
				proType: 'stored',
				Platform,
				recordId: that.stored[that.currentNum].id,
				...obj
			};

			let type;
			if (that.payType == 0) {
				type = 'wechat';
			} else if (that.payType == 1) {
				type = 'alipay';
			}
			data.type = type;
			let result = await that.$request({
				method: 'post',
				url: '/api/Payment/Pay',
				data
			});
			console.log('/api/Payment/Pay 接口发送的data数据', data);
			console.log('/api/Payment/Pay 接口返回数据', result);

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					// #ifdef H5
					that.h5GzhPayFn(result.data.data);
					return false;
					// #endif

					let payOptions;
					// #ifdef MP-WEIXIN
					payOptions = JSON.parse(result.data.data.pay);
					// #endif

					// #ifdef APP-PLUS
					payOptions = {};
					if (that.payType == 0) {
						payOptions.provider = 'wxpay';
						payOptions.orderInfo = JSON.parse(result.data.data.pay);
					} else if (that.payType == 1) {
						payOptions.provider = 'alipay';
						payOptions.orderInfo = result.data.data.pay;
					}
					// #endif

					let payMentOptions = {
						...payOptions,
						success(e) {
							that.hideAllFn();
							uni.showModal({
								showCancel: false, //不显示取消按钮
								title: '支付成功',
								success(e) {
									that.payBtnFlag = true;
								}
							});
						},
						fail(e) {
							that.hideAllFn();
							that.payBtnFlag = true;

							uni.showToast({
								icon: 'none',
								title: '取消支付'
							});
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
					that.payBtnFlag = true;
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
				that.payBtnFlag = true;
			}
		},

		// #ifdef H5
		h5GzhPayFn(options) {
			let that = this;

			if (that.globalBrowserIsWx) {
				console.log('公众号支付返回的东西', options);

				let gzhWxPayOptions = JSON.parse(assertObject(options).pay); // 公众号支付需要的数据

				console.log('gzhWxPayOptions 参数', gzhWxPayOptions);

				// 公众号支付
				WeixinJSBridge.invoke('getBrandWCPayRequest', gzhWxPayOptions, function(res) {
					console.log('jweixinModule.invoke 结果', res);

					if (res.err_msg == 'get_brand_wcpay_request:ok') {
						that.getOrderDetailFn(() => {
							that.hideAllFn();
							uni.showModal({
								showCancel: false, //不显示取消按钮
								title: '支付成功',
								success(e) {
									//确认后的回调
									// that.toBackFn()
									// that.getOrderDetailFn()
									that.payBtnFlag = true;
								}
							});
						});
					} else {
						that.hideAllFn();
						uni.showModal({
							showCancel: false, //不显示取消按钮
							title: '支付失败',
							success(e) {
								that.payBtnFlag = true;
								//确认后的回调
								// that.toBackFn()
							}
						});
						return false;
					}
				});
			} else {
				// 普通浏览器支付

				that.hideAllFn();
				that.payBtnFlag = true;

				let h5wxPayOptions = options.pay;
				let redirectUrl = encodeURIComponent(`${location.origin}${location.pathname}#/packageA/yve/yve`);

				let url = `${h5wxPayOptions}&redirect_url=${redirectUrl}`;
				console.log(url);

				location.href = url;
			}
		}
		// #endif
	},
	computed: {
		...mapState({
			userInfoMobile: store => store.userInfo.userInfoMobile, // 手机号
		})
	}
};
</script>

<style lang="scss" scoped>
@mixin size {
	width: 534rpx;
	height: 310rpx;
}

swiper {
	height: 310rpx;
}

.swiper-item {
	padding: 0 10rpx;
	@include size;
}

.price-block {
	display: flex;
	margin-bottom: 22rpx;
	height: 88rpx;
	justify-content: space-evenly;
	align-items: center;
	font-size: 26rpx;
	color: $grey2-color;
	font-weight: 600;

	.item {
		display: flex;
		align-items: center;
		height: 100%;
		position: relative;

		.after {
			display: none;
			content: '';
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 0;
			width: 40rpx;
			height: 3px;
			border-radius: 10000rpx;
		}

		&.act {
			

			.after {
				display: block;
			}
		}
	}
}

.title-tip {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24rpx;
	height: 86rpx;

	.h5 {
		font-size: 36rpx;
		color: $grey1-color;
		font-weight: 600;
	}

	.h6 {
		font-size: 25rpx;
		color: $grey2-color;
	}
}

.line-block-list {
	.line-block:first-child {
		border-top: none;
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

.h3 {
	font-size: 23rpx;
	color: $grey2-color;
	line-height: 68rpx;
	text-indent: 1em;
}

.bottom-btn-block {
	@include flex-center;
	position: fixed;
	z-index: 500;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;

	.pay-btn {
		@include btn-green;
	}
}

.settel-modal-block {
	@include flex-center;
	position: fixed;
	z-index: 800;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);

	.settel-modal {
		padding: 0 40rpx;
		width: 576rpx;
		height: 388rpx;
		background: #ffffff;

		.title-tip {
			@include flex-center;
			height: 145rpx;
			font-size: 30rpx;
			color: $grey1-color;
		}

		.inp {
			font-size: 28rpx;
			height: 80rpx;
			border-bottom: 1px solid #d8d8d8;
		}

		.btn-block {
			display: flex;
			justify-content: space-between;
			margin-top: 45rpx;

			.btn-block-default {
				@include flex-center;
				width: 230rpx;
				height: 80rpx;
				background: #e8e9ea;
				color: $grey1-color;
				font-size: 26rpx;

				&.btn-confirm {
					color: #ffffff;
				}
			}
		}
	}
}
</style>
