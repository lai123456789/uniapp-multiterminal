<template>
	<view
		class="to-top-btn border-radius"
		:class="[ flag ? '' : 'at_right' ]"
		@click="toTopFn"
	>
		<view class="iconfont icon-fanhuidingbu" style="font-size: 30rpx; color: #374050;"></view>
		<text>顶部</text>
	</view>
</template>

<script>
	export default {
		props: {
			flag: {
				type: Boolean,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.to-top-btn {
		position: fixed;
		z-index: 100;
		right: 40rpx;
		bottom: 266rpx;
		width: 88rpx;
		height: 88rpx;
		box-shadow: 0 5rpx 10rpx #eaeaea;
		background: #FFFFFF;
		@include flex-center;
		flex-direction: column;
		transition: .3s;

		&.at_right {
			transform: translateX(300%) rotate(180deg);
		}

		image {
			width: 20rpx;
			height: 28rpx;
			display: block;
		}

		text {
			font-size: 20rpx;
			color: $grey2-color;
		}
	}
</style>
