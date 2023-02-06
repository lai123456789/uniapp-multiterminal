<!-- 
	苹果商店审核时 展示的登录页面
-->
<template>
	<view class="page box-sizing">
		<view class="after-dom" :style="{ background: configInfo.web_site_color }"></view>
		<view class="title zIndex10">
			<view class="after" :style="{ background: configInfo.web_site_color }"></view>
			<view class="text">登录</view>
		</view>
		<view class="input-group-block zIndex10">
			<view class="input-item">
				<input class="input-dom" type="text" v-model="accountNumber" placeholder="请输入账号" />
			</view>
			<view class="input-item">
				<input class="input-dom" type="text" password v-model="passWord" placeholder="请输入密码" />
			</view>
		</view>
		<button
			class="btn-dom flex-center border-radius clear-btn-style zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			:style="{ background: configInfo.web_site_color }"
			@click="loginFn"
		>
			登录
		</button>
		<view class="reg-block" @click="navigateToFn({ url: `/packageA/tel-login/reg` })">
			<view class="description-text">
				还没账号？
				<view class="text" :style="{ color: configInfo.web_site_color }">马上注册</view>
			</view>
		</view>
	</view>
</template>
<script>
import { assertObject, assertString } from '@/tools/tools.js';
export default {
	data() {
		return {
			accountNumber: '', // 账号
			passWord: '' // 密码
		};
	},
	methods: {
		// 登录
		async loginFn() {
			let that = this;
			let obj = {
				'': true
			};
			if (obj[that.accountNumber] || obj[that.passWord]) {
				uni.showToast({
					icon: 'none',
					title: '请输入账号及密码进行登录'
				});
				return false;
			}
			// console.log('处理后续登录 codeing ....');
			// 处理后续登录
			let result = await that.$request({
				loading: true,
				method: 'post',
				url: `/api/User/shLogin`,
				data: {
					username: that.accountNumber,
					password: that.passWord
				}
			});

			console.log('手机验证码登录的返回结果', result);

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.logOutFn(); // 先退出登录一下
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
							that.toBackFn(); // 正常返回上一页 如果没有上一页 就回首页
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
		}
	}
	// ↑↑↑↑↑ methods 结束
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
