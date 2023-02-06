<template>
	<view class="yve-wrap flex-center">
		<view class="iconfont icon-solid-star" style="color: #ffd670;font-size: 34rpx;"></view>
	</view>
</template>

<script>
	export default {
	};
</script>

<style lang="scss" scoped>
	.yve-wrap {
		display: inline-block;
		font-size: 0;
		width: 60rpx;
		height: 60rpx;
		position: relative;
		background: #ffb654;
		border: 6rpx solid #ffce54;
		border-radius: 50%;
		.iconfont{
		    color: #ffd670;
		    font-size: 18px;
		    position: absolute;
		    left: 50%;
		    top: 50%;
		    transform: translate(-50%, -50%);
		}
	}
</style>
