<template>
	<view class="page box-sizing">
		<view class="after-dom" :style="{ background: configInfo.web_site_color }"></view>

		<view class="title zIndex10">
			<view class="after" :style="{ background: configInfo.web_site_color }"></view>
			<view class="text">登录</view>
		</view>
		<view class="input-group-block zIndex10">
			<view class="input-item">
				<input class="input-dom" type="text" v-model="telStr" placeholder="请输入手机号" />
			</view>
			<view class="input-item">
				<input class="input-dom" type="text" v-model="coedStr" placeholder="请输入验证码" />
				<view class="text" :class="[sendIng ? 'sendIng' : '']" @click="sendSmFn">{{ calcTextStr }}</view>
			</view>
		</view>

		<!-- #ifdef MP-WEIXIN -->
		<!-- 小程序手机号按钮登录 -->
		<button
			open-type="getUserInfo"
			class="btn-dom flex-center border-radius clear-btn-style zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			:style="{ background: configInfo.web_site_color }"
			@click="telLoginFn"
		>
			登录
		</button>
		<!-- #endif -->

		<!-- app手机号按钮登录 -->
		<!-- #ifdef APP-PLUS -->
		<button
			class="btn-dom flex-center border-radius clear-btn-style zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			:style="{ background: configInfo.web_site_color }"
			@click="telLoginFn"
		>
			登录
		</button>
		<!-- #endif -->

		<!-- h5 or 公众号 手机号按钮登录 -->
		<!-- #ifdef H5 -->
		<button
			class="btn-dom flex-center border-radius clear-btn-style zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			:style="{ background: configInfo.web_site_color }"
			@click="telLoginFn"
		>
			登录
		</button>
		<!-- #endif -->

		<view class="button-block" style="display: flex; justify-content: center;">
			<!-- 小程序微信icon图标按钮登录 -->
			<!-- #ifdef MP-WEIXIN -->
			<!-- open-type="getUserInfo" -->
			<button class="login-third zIndex10 clear-btn-style" @click="$onceClick(loginFn, $event)">
				<view class="weixin-login-btn">
					<view class="icon-blcok flex-center">
						<!-- <image :src="calcImageSrc('/global-image/icon-wx-1.png')"></image> -->
						<uni-icons type="weixin" color="#ffffff" size="26"></uni-icons>
					</view>
					<view class="text">微信登录</view>
				</view>
			</button>
			<!-- #endif -->

			<!-- app微信icon图标按钮登录 -->
			<!-- #ifdef APP-PLUS -->
			<view class="login-third zIndex10 clear-btn-style" @click="androidWxLoginFn">
				<view class="weixin-login-btn">
					<view class="icon-blcok flex-center">
						<!-- <image :src="calcImageSrc('/global-image/icon-wx-1.png')"></image> -->
						<uni-icons type="weixin" color="#ffffff" size="26"></uni-icons>
					</view>
					<view class="text">微信登录</view>
				</view>
			</view>
			<!-- #endif -->

			<!-- 微信公众号h5 微信icon图标按钮登录 -->
			<!-- #ifdef H5 -->
			<view class="login-third zIndex10 clear-btn-style" @click="gzhH5WxLoginFn" v-if="globalBrowserIsWx">
				<view class="weixin-login-btn">
					<view class="icon-blcok flex-center">
						<!-- <image :src="calcImageSrc('/global-image/icon-wx-1.png')"></image> -->
						<uni-icons type="weixin" color="#ffffff" size="26"></uni-icons>
					</view>
					<view class="text">微信登录</view>
				</view>
			</view>
			<!-- #endif -->
		</view>
		<view class="reg-block" @click="toRegPageFn">
			<view class="description-text">
				还没账号？
				<view class="text" :style="{ color: configInfo.web_site_color }">马上注册</view>
			</view>
		</view>
	</view>
</template>
<script>
import { assertObject, assertString } from '@/tools/tools.js';
import { host } from '@/tools/siteinfo.js';
let timer;
export default {
	data() {
		return {
			// 是否在发送中的状态
			sendIng: false,
			// 用户发送验证码的次数
			sendSmCont: 0,
			// 双向绑定 手机号
			telStr: '',
			// 双向绑定 验证码
			coedStr: '',
			// 间隔一分钟 后可以再次发送
			intervalTime: 60,
			// 显示在页面上的倒计时
			showIntervalStr: 0
		};
	},
	onLoad(options) {
		let that = this;
		// #ifdef H5
		that.gzhH5WxloginEndFn(options);
		// #endif
	},
	onUnload() {
		clearInterval(timer);
	},
	methods: {
		// 跳转到注册页面
		toRegPageFn() {
			/* 跳转规则
				可以正常跳手机好注册页面的平台
					小程序
					app
					公众号
				不可以正常跳手机好注册页面的平台
					外部浏览器
						没配置跳转小程序的url 提示 须使用app或小程序进行账号注册
						配置跳转小程序的url 直接跳小程序
			*/
			let that = this;
			// #ifdef H5
			if (!that.globalBrowserIsWx) {
				let xcxUrl = assertObject(that.configInfo).h5_applet_url;
				if (assertString(xcxUrl)) {
					let tagA = document.createElement('a');
					tagA.href = xcxUrl;
					tagA.click();
					return false;
				}
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '为了同步您的账号数据请在小程序或app平台注册',
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}
			// #endif
			that.navigateToFn({ url: `/packageA/tel-login/reg` });
		},
		// 开启倒计时
		startIntervalFn() {
			let that = this;
			that.showIntervalStr = that.intervalTime;
			clearInterval(timer);
			timer = setInterval(() => {
				that.showIntervalStr--;
				if (that.showIntervalStr <= 0) {
					that.sendIng = false;
				}
			}, 1000);
		},
		// 发送验证码
		async sendSmFn() {
			let that = this;
			if (that.sendIng) {
				return false;
			}
			if (!that.regTel(that.telStr)) {
				uni.showToast({
					icon: 'none',
					title: '手机号码格式错误'
				});
				return false;
			}
			that.sendSmCont++;
			that.sendIng = true;

			that.startIntervalFn();
			let result = await that.$request({
				method: 'post',
				url: `/api/Sms/sendCaptcha`,
				data: {
					mobile: that.telStr,
					event: 'mobilelogin'
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
				} else {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
					that.sendIng = false;
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
				that.sendIng = false;
			}
		},
		// 开始登录
		async telLoginFn() {
			let that = this;
			if (that.telStr.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '手机号码不能为空'
				});
				return false;
			}

			if (that.coedStr.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '验证码不能为空'
				});
				return false;
			}

			let loginData = {};
			// #ifdef MP-WEIXIN
			loginData = await that.getLoginData();
			if (loginData.type != 'success') {
				return false;
			}
			console.log('手机号登录时 的微信', loginData.result, '\n');
			// #endif

			let platformObj = {};

			// #ifdef H5
			platformObj.platform = 'officialAccount';
			// #endif

			// #ifdef APP-PLUS
			platformObj.platform = 'App';
			// #endif

			// #ifdef MP-WEIXIN
			platformObj.platform = 'wechat_applet';
			// #endif

			let data = {
				// #ifdef MP-WEIXIN
				...loginData.result,
				// #endif
				mobile: that.telStr,
				captcha: that.coedStr,
				...platformObj
			};
			console.log('手机验证码登录 参数', data);

			let result = await that.$request({
				loading: true,
				method: 'post',
				url: `/api/User/mobileLogin`,
				data
			});

			console.log('手机验证码登录的返回结果', result);

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					// 先退出登录一下
					that.logOutFn();
					let token = assertObject(result.data.data).token;
					that.$store.commit('setToken', token);
					uni.setStorageSync('token', token);
					uni.hideLoading();
					uni.showLoading({});
					that.hasTokenGetUserInfo(() => {
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							title: '登录成功'
						});
						setTimeout(() => {
							that.toBackFn();
						}, 500);
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
		},
		// #ifdef H5
		// 公众号 微信浏览器h5 微信登录
		gzhH5WxLoginFn() {
			let that = this;
			let h5path = encodeURIComponent(`${host}/h5/#/packageA/tel-login/tel-login`); // 获取完token再跳回到 h5 的路径
			let href = `${host}/api/User/third?platform=officialAccount&path=${h5path}`;

			// 登录时 把分享者的字符串带上
			let sharerStr = uni.getStorageSync('sharer'); // 带上分享上级的加密字符串
			if (sharerStr) {
				href += `&sharer=${sharerStr}`;
			}
			console.log(href);
			// return false;
			location.href = href;
		},
		// 授权完后获取token信息
		gzhH5WxloginEndFn(options) {
			let that = this;
			let { token } = assertObject(options);
			if (token) {
				// 登录前先退出一下
				that.logOutFn();
				that.$store.commit('setToken', token);
				uni.setStorageSync('token', token);
				that.hideAllFn();
				uni.showLoading({});
				that.hasTokenGetUserInfo(() => {
					uni.hideLoading();
					uni.showToast({
						icon: 'success',
						title: '登录成功'
					});
					setTimeout(() => {
						that.navigateToFn({
							isTab: true,
							url: '/pages/my/my'
						});
					}, 500);
				});
			}
		}
		// #endif
	},
	// ↑↑↑↑↑ methods 结束
	computed: {
		// 发送验证码 按钮的文字
		calcTextStr() {
			let that = this;
			// 第一次发送验证码 - 获取验证码
			// 第多次发送验证码 - 重新获取验证码
			let str = ``;
			if (that.sendSmCont <= 0) {
				if (that.sendIng) {
					str = `重新获取(${that.showIntervalStr})`;
				} else {
					str = `获取验证码`;
				}
			} else {
				if (that.sendIng) {
					str = `重新获取(${that.showIntervalStr})`;
				} else {
					str = `获取验证码`;
				}
			}
			return str;
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	display: block;
	position: relative;
	width: 100%;
	height: 100vh;
	background: #ffffff;
	overflow: hidden;
	.after-dom {
		content: '';
		display: block;
		position: absolute;
		z-index: 5;
		bottom: -520rpx;
		left: 146rpx;
		width: 1200rpx;
		height: 1200rpx;
		border-radius: 100000rpx;
		opacity: 0.2;
	}
	.title {
		position: relative;
		margin-top: 84rpx;
		.text {
			position: relative;
			z-index: 10;
			padding-left: 112rpx;
			font-size: 60rpx;
			font-weight: bold;
			color: #000000;
			line-height: 66rpx;
		}
		.after {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 246rpx;
			height: 16rpx;
		}
	}
	.input-group-block {
		margin-top: 126rpx;
		padding: 0 110rpx;
		.input-item {
			display: flex;
			padding-top: 46rpx;
			padding-left: 0.2em;
			border-bottom: 1px solid #c2c2c2;
			.input-dom {
				flex: 1;
				font-size: 28rpx;
				height: 70rpx;
				padding-left: 0.2em;
				padding-right: 1em;
			}
			.text {
				font-size: 30rpx;
				color: #2c2c2c;
			}
		}
	}
	.btn-dom {
		margin: 66rpx 56rpx;
		text-align: center !important;
		height: 113rpx;
		line-height: 113rpx !important;
		color: #ffffff;
		border-radius: 1000px !important;
	}
	.zIndex10 {
		position: relative;
		z-index: 10;
	}
	.login-third {
		display: flex;
		align-items: center;
		justify-content: center;
		.weixin-login-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon-blcok {
				width: 80rpx;
				height: 80rpx;
				background: #28c445;
				border-radius: 1000rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.text {
				font-size: 24rpx;
				color: #848484;
				line-height: 2;
			}
		}
	}
	.reg-block {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 10;
		bottom: 100rpx;
		width: 100vw;
		.description-text {
			font-size: 26rpx;
			color: #686a68;
			.text {
				display: inline-block;
				text-decoration: underline;
			}
		}
	}
}
</style>
