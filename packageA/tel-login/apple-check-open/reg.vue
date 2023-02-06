<!-- 
	苹果商店审核时 展示的注册页面
-->
<template>
	<view class="page box-sizing">
		<view class="after-dom" :style="{ background: configInfo.web_site_color }"></view>

		<view class="title zIndex10">
			<view class="after" :style="{ background: configInfo.web_site_color }"></view>
			<view class="text">注册</view>
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
			class="clear-btn-style btn-dom flex-center border-radius zIndex10"
			:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			@click="regFn"
			:style="{ background: configInfo.web_site_color }"
		>
			注册
		</button>

		<view class="xieyi">
			<view class="radio-block">
				<checkbox :color="configInfo.web_site_color" :checked="checkboxFlag"></checkbox>
			</view>
			<view class="text-block">
				<view @click="checkboxFlag = !checkboxFlag">我已认真阅读、理解并同意</view>
				<view
					:style="{ color: configInfo.web_site_color, 'text-decoration': 'underline' }"
					@click="toDetailFn('fwxy')"
				>
					《服务协议》
				</view>
				及
				<view
					:style="{ color: configInfo.web_site_color, 'text-decoration': 'underline' }"
					@click="toDetailFn('yszc')"
				>
					《隐私政策》
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { assertObject, Object2QueryString, goodsDetailWidthFn } from '@/tools/tools.js';
import { host } from '@/tools/siteinfo.js';
let timer;
export default {
	data() {
		return {
			checkboxFlag: false,
			accountNumber: '',
			passWord: ''
		};
	},
	methods: {
		// 注册
		async regFn() {
			let that = this;
			let obj = {
				'': true
			};
			if (obj[that.accountNumber] || obj[that.passWord]) {
				uni.showToast({
					icon: 'none',
					title: '请输入账号及密码进行注册'
				});
				return false;
			}

			if (!that.checkboxFlag) {
				uni.showToast({
					icon: 'none',
					title: '请阅读并勾选《服务协议》及《隐私政策》'
				});
				return false;
			}
			console.log('处理后续注册 codeing ....');
		},
		// 跳转到详情
		toDetailFn(type) {
			let that = this;
			let mapping = {
				ptzz: {
					title: '平台资质',
					content: goodsDetailWidthFn(that.configInfo.certification)
				},
				fwxy: {
					title: '服务协议',
					content: that.configInfo.agreement
				},
				yszc: {
					title: '隐私政策',
					content: that.configInfo.policy
				},
				hysy: {
					title: '欢迎使用',
					content: that.configInfo.warn_content
				}
			};
			uni.setStorageSync('helpQuestionItem', mapping[type]);
			that.navigateToFn({
				url: '/packageA/kefu/help-detail'
			});
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
}
.xieyi {
	text-align: center;
	.radio-block {
		display: inline-block;
		transform: scale(0.6) translateX(20rpx);
	}
	.text-block view {
		display: inline-block;
	}
	.text-block {
		display: inline-block;
		font-size: 22rpx;
	}
}
/* 
<view class="">
			<radio :color="configInfo.web_site_color"></radio>
			<view class="text-block">
				我已认真阅读、理解并同意
				<view :style="{color: configInfo.web_site_color,'text-decoration': 'underline'}">
					《服务协议》
				</view>
				及
				<view :style="{color: configInfo.web_site_color,'text-decoration': 'underline'}">
					《隐私政策》
				</view>
			</view>
		</view>
 */
</style>
