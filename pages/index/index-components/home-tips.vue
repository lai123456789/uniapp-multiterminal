<!--
	用户第一次打开 首页提示 添加到我的小程序 组件
-->
<template>
	<view class="home-tips" v-if="isShow" :style="{ top: `${calcHomeTipsPosition.top}px` }">
		<view class="after"></view>
		<view class="text-content">
			<text>点击右上角</text>
			<view class="dots">
				<view class="dots-item dots-item1"></view>
				<view class="dots-item dots-item2"></view>
				<view class="dots-item dots-item3"></view>
			</view>
			<text>添加到我的小程序</text>
		</view>
		<view class="clone-btn" @click="cloneFn"></view>
	</view>
</template>

<script>
let menuButtonRectInfo = uni.getMenuButtonBoundingClientRect();
export default {
	data() {
		return {
			isShow: false
		};
	},
	methods: {
		cloneFn() {
			this.isShow = false;
			uni.setStorageSync('homeTipsIsShow', 1);
		}
	},
	mounted() {
		let homeTipsIsShow = uni.getStorageSync('homeTipsIsShow');
		if (homeTipsIsShow) {
			this.isShow = false;
		} else {
			this.isShow = true;
			uni.setStorageSync('homeTipsIsShow', 1);
		}
	},
	computed: {
		// 计算位置
		calcHomeTipsPosition() {
			let top = parseInt(menuButtonRectInfo.height + menuButtonRectInfo.top + 7);
			return {
				top
			};
		}
	}
};
</script>

<style scoped lang="scss">
.home-tips {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	z-index: 300;
	right: 40rpx;
	padding: 0 20rpx;
	width: 476rpx;
	height: 60rpx;
	border-radius: 1000rpx;
	background: #fdfad9;
	color: #ffffff;
	background: rgba(0, 0, 0, 0.8);
	font-size: 0;
	.after {
		display: block;
		position: absolute;
		top: 0;
		right: 90rpx;
		transform: translateY(-100%) translateX(-100%);
		border: 10rpx solid rgba(0, 0, 0, 0.8);
		border-top-color: rgba(0, 0, 0, 0);
		border-left-color: rgba(0, 0, 0, 0);
		border-right-color: rgba(0, 0, 0, 0);
	}
	.clone-btn {
		position: relative;
		width: 30rpx;
		height: 30rpx;
		&::before,
		&::after {
			content: '';
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			width: 26rpx;
			height: 3rpx;
			background: #ffffff;
			border-radius: 100px;
		}
		&::before {
			transform: translateX(-50%) rotate(45deg);
		}
		&::after {
			transform: translateX(-50%) rotate(-45deg);
		}
	}
	.text-content {
		width: 300rpx;
		font-size: 28rpx;
		white-space: nowrap;
		.dots {
			display: inline-flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 2px;
			width: 36rpx;
			height: 12rpx;
			vertical-align: middle;
			.dots-item {
				// background: #b09561;
				background: #ffffff;
				border-radius: 50%;
				width: 8rpx;
				height: 8rpx;
				&.dots-item2 {
					width: 12rpx;
					height: 12rpx;
				}
			}
		}
	}
}
</style>
