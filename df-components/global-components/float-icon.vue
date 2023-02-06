<!-- 
	悬浮在页面的
		客服图标
		返回首页图标
	组件
 -->
<template>
	<view class="float-icon-wrap" :class="[scrollIsStop ? '' : 'transformXClass']">
		<view :class="['iconfont', iconClass]" :style="{ fontSize: `${iconSize}px` }"></view>
		<view class="title-text">{{ titleText }}</view>
	</view>
</template>

<script>
export default {
	props: {
		// 全局控制的 当前页面是否停止状态
		scrollIsStop: {
			type: Boolean,
			default: true
		},
		// icon的类名
		iconClass: {
			type: String,
			default: ''
		},
		iconSize: {
			type: Number,
			default: 18
		},
		// 提示标题
		titleText: {
			type: String,
			default: ''
		}
	},
};
</script>

<style lang="scss" scoped>
.float-icon-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	z-index: 800;
	left: 20rpx;
	bottom: 200rpx;
	width: 88rpx;
	height: 88rpx;
	background: #ffffff;
	border-radius: 50%;
	transition: 0.8s;
	box-shadow: 0 0 6px #eaeaea;
	color: $grey2-color;
	&.transformXClass {
		transform: translateX(-200%);
	}
	.icon-fangzi {
		transform: scale(1.6);
	}
	.title-text {
		line-height: 30rpx;
		font-size: 24rpx;
	}
}
</style>
