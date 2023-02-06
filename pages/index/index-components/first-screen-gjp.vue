<!-- 
	首页的骨架屏组件
-->

<template>
	<view
		class="first-screen-gjp-wrap"
		v-show="firstScreenGjpFlag"
		:style="{ width: `${windowWidth}px`, height: `${windowHeight + 56}px` }"
		@touchmove.stop="catchTouchMove"
	>
		<image class="image-dom" src="/static/global-image/first-screen-gjp.png"></image>
	</view>
</template>

<script>
let windowWidth = uni.getSystemInfoSync().windowWidth,
	windowHeight = uni.getSystemInfoSync().windowHeight;

export default {
	props: {
		// 是否显示骨架屏组件
		firstScreenGjpFlag: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			windowWidth,
			windowHeight
		};
	}
};
</script>

<style lang="scss" scoped>
@keyframes gjpWhiteBlock {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.8;
	}
	100% {
		opacity: 0;
	}
}

// 阴影从上到下的动画
@keyframes an1 {
	0% {
		transform: translate3d(0, -100%, 0);
	}

	50% {
		transform: translate3d(0, 100%, 0);
	}

	100% {
		transform: translate3d(0, 100%, 0);
	}
}

.first-screen-gjp-wrap {
	position: fixed;
	z-index: 980;
	top: 0;
	left: 0;
	overflow: hidden;
	&::after {
		content: '';
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			0deg,
			rgba(255, 255, 255, 0) 0,
			rgba(255, 255, 255, 0.8) 50%,
			rgba(255, 255, 255, 0) 100%
		);
		animation: an1 1.4s linear infinite -1s;
		/* 
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #ffffff;
		// opacity: .6;
		animation: gjpWhiteBlock 5s infinite;
		*/
	}
	.image-dom {
		display: block;
		width: 750rpx;
		height: 1700rpx;
	}
}
</style>
