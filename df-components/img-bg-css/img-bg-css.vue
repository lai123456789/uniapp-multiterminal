<template>
	<view :class="['img-bg-css', showBgCss ? '' : 'hideBgCss', isLoaded ? 'loaded' : '']">
		<image class="img-bg-css-image" @load="loadedFn" :src="src"></image>
	</view>
</template>

<script>
	/*
		组件说明
			用来写显示 图片的组件 当图片没加载过来时 会有背景 css动画占位
		<view class="img-wrap"><img-bg-css :src="src" :show-bg-css="!false"></img-bg-css></view>
	*/
	export default {
		props: {
			// 是否显示背景css光影动画 默认显示 可选项
			showBgCss: {
				type: Boolean,
				default: true
			},
			// img的路径 必选项
			src: {
				type: String,
				default:''
			}
		},
		data() {
			return {
				isLoaded: false
			};
		},
		methods: {
			// 图片加载完
			loadedFn() {
				this.isLoaded = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	@mixin size100 {
		width: 100%;
		height: 100%;
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

	.img-bg-css {
		@include size100;
		background: #eee;
		position: relative;
		overflow: hidden;

		&::after {
			content: '';
			position: absolute;
			z-index: 2;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
			animation: an1 2s linear infinite -1s;
		}

		&.hideBgCss {
			&::after {
				display: none;
			}
		}

		&.loaded {
			background: initial;
		}

		&.loaded::after {
			animation: none;
		}

		.img-bg-css-image {
			@include size100;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 10;
		}
	}
</style>
