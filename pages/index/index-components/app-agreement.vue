<!--
	app平台的用户协议
-->
<template>
	<view class="app-agreement-wrap flex-center" v-if="isShow" @touchmove.stop="catchTouchMove">
		<view class="content-box border-radius20">
			<view class="title">用户隐私保护提示</view>
			<view class="text-content">
				<view class="agreement-text">{{ configInfo.warn_content }}</view>
				<view class="agreement-link">
					请您在使用前务必仔细阅读
					<view class="link-view" :style="{ color: configInfo.web_site_color }" @click="toDetailFn('fwxy')">
						《服务协议》
					</view>
					、
					<view class="link-view" :style="{ color: configInfo.web_site_color }" @click="toDetailFn('yszc')">
						《隐私政策》
					</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn-cancel flex-center border-radius20" @click="exitAppFn">不同意并退出</view>
				<view
					class="btn-confirm flex-center border-radius20"
					:style="{ background: configInfo.web_site_color }"
					@click="confirmBtnClickFn"
				>
					同意
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { ENVANDROID, ENVIOS } from '@/tools/const.js';

import { transNumFn } from '@/tools/tools.js';

export default {
	props: ['isShow'],
	data() {
		return {};
	},
	methods: {
		confirmBtnClickFn() {
			this.$emit('confirmBtnClickFn')
		},
		// 跳转到详情
		toDetailFn(type) {
			let that = this;
			let mapping = {
				fwxy: {
					title: '服务协议',
					content: that.configInfo.agreement
				},
				yszc: {
					title: '隐私政策',
					content: that.configInfo.policy
				}
			};
			uni.setStorageSync('helpQuestionItem', mapping[type]);
			that.navigateToFn({
				url: '/packageA/kefu/help-detail'
			});
		},
		exitAppFn() {
			let that = this;
			uni.setStorageSync('openAppCountStorage', 0);
			if (that.appenv == ENVANDROID) {
				plus.runtime.quit();
			} else if (that.appenv == ENVIOS) {
				plus.ios
					.import('UIApplication')
					.sharedApplication()
					.performSelector('exit');
			}
		}
	}
};
</script>

<style scoped lang="scss">
.app-agreement-wrap {
	position: fixed;
	z-index: 300;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.content-box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0 88rpx;
		width: 100%;
		height: 678rpx;
		background: #ffffff;
		.title {
			text-align: center;
			line-height: 100rpx;
			font-size: 28rpx;
			font-weight: bold;
			color: #374050;
		}
		.text-content {
			height: 458rpx;
			overflow-x: hidden;

			.agreement-text {
				line-height: 1.5;
				text-indent: 1.8em;
				padding: 0 40rpx;
				font-size: 24rpx;
				color: #374050;
			}
			.agreement-link {
				margin: 40rpx 0;
				padding: 0 40rpx;
				font-size: 24rpx;
				color: #374050;
				.link-view {
					text-decoration: underline;
					display: inline-block;
				}
			}
		}
		.btn-group {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28rpx;
			height: 120rpx;
			.btn-cancel {
				width: 248rpx;
				height: 66rpx;
				font-size: 28rpx;
				color: #ffffff;
				background: #c6c6c6;
			}
			.btn-confirm {
				width: 248rpx;
				height: 66rpx;
				font-size: 28rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
