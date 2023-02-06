<!-- vip图标组件 -->
<template>
	<view class="vip-wrap">
		<view class="iconfont icon-VIP1" style="font-size: 20rpx;color: #f5d8ae;"></view>
		<view class="vip-text">
			<view class="money-icon">￥</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
	}
</script>

<style lang="scss" scoped>
	.vip-wrap {
		display: inline-flex;
		justify-content: space-between;
		font-size: 0;
		height: 26rpx;
		background: #f5d8b0;

		.iconfont {
			display: inline-flex;
			align-items: center;
			height: 100%;
			background: #1b1a1f;
			padding-left: 2rpx;
			padding-right: 2rpx;
		}

		.vip-text {
			display: flex;
			align-items: center;
			justify-content: center;

			color: #191b1f;
			background: #f5d8ae;
			padding-left: 0.4em;
			padding-right: 0.4em;
			font-weight: 600;
			font-size: 20rpx;
			.money-icon{
				font-size: 16rpx;
			}
		}
	}
</style>
