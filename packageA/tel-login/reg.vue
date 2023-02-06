<template>
	<view class="page box-sizing">
		<view class="after-dom" :style="{ background: configInfo.web_site_color }"></view>

		<view class="title zIndex10">
			<view class="after" :style="{ background: configInfo.web_site_color }"></view>
			<view class="text">注册</view>
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

		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<button
			open-type="getUserInfo"
			class="clear-btn-style btn-dom flex-center border-radius zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			@click="regFn"
			:style="{ background: configInfo.web_site_color }"
		>
			注册
		</button>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<button
			class="clear-btn-style btn-dom flex-center border-radius zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			@click="regFn"
			:style="{ background: configInfo.web_site_color }"
		>
			注册
		</button>
		<!-- #endif -->
	</view>
</template>
<script>
import { assertObject, Object2QueryString } from '@/tools/tools.js';
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
		// #ifdef H5
		this.gzhH5TelRegEndFn(options);
		// #endif
	},
	onUnload() {
		clearInterval(timer);
	},
	methods: {
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
		// 发送验证码函数
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
					event: 'register'
				}
			});
			console.log('发送验证码接口返回的数据', result);

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
		// 开始注册
		async regFn() {
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
			// #endif
			let platformObj = {};

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				platformObj.platform = 'officialAccount';
				that.gzhH5TelregFn();
				return false;
			} else {
				platformObj.platform = 'H5';
			}

			// #endif
			
			let appTelRegparam = {}; // app 手机号注册时传的参数 
			// #ifdef APP-PLUS
			platformObj.platform = 'App';
			let getLoginDataResult = await that.getLoginDataFn();
			if (getLoginDataResult.type == 'success') {
				let {
					app_openid,
					app_unionid
				} = getLoginDataResult.result
				appTelRegparam = {
					openid: app_openid,
					unionid: app_unionid
				}
			}else{
				uni.showToast({
					icon: 'none',
					title: getLoginDataResult.msg
				})
				return false;
			}
			// #endif

			// #ifdef MP-WEIXIN
			platformObj.platform = 'wechat_applet';
			// #endif
			let opt = {
				method: 'post',
				url: `/api/User/mobileRegister`,
				data: {
					mobile: that.telStr,
					captcha: that.coedStr,
					// #ifdef MP-WEIXIN
					...loginData.result,
					// #endif
					// #ifdef APP-PLUS
								
					...appTelRegparam,
					// #endif
								
					...platformObj
				}
			}
			console.log('手机号注册接口参数 /api/User/mobileRegister',opt);
			let result = await that.$request(opt);

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
							// 回个人中心
							that.navigateToFn({
								isTab: true,
								url: '/pages/my/my'
							});
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

		gzhH5TelregFn() {
			let that = this;

			let h5path = encodeURIComponent(`${host}/h5/#/packageA/tel-login/reg`); // 获取完token再跳回到 h5 的路径
			let queryObj = {
				mobile: that.telStr,
				captcha: that.coedStr,
				platform: 'officialAccount',
				path: h5path
			};

			// 登录时 把分享者的字符串带上
			let sharerStr = uni.getStorageSync('sharer'); // 带上分享上级的加密字符串
			if (sharerStr) {
				queryObj.sharer = sharerStr;
			}

			let href = `${host}/api/User/mobileRegister?${Object2QueryString(queryObj)}`;

			// console.log(href);
			// return false;
			location.href = href;
		},
		gzhH5TelRegEndFn(options) {
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
				&.sendIng {
					color: #848484;
				}
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
		position: absolute;
		z-index: 10;
		bottom: 260rpx;
		width: 100vw;
		.weixin-login-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon-blcok {
				width: 80rpx;
				height: 80rpx;
				background: #ffffff;
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
		bottom: 50rpx;
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
