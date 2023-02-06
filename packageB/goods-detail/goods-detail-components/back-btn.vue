<!-- 详情页 的左上角 返回按钮 -->
<template>
	<view class="to-back" @click="toBackFn" :style="{ position: 'fixed', top: `${backIconTop}px`, left: '12px' }">
		<image class="image-size" :src="calcImageSrc('/detail/toback.png')"></image>
	</view>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.to-back {
	position: absolute;
	z-index: 900;
	top: 12rpx;
	left: 0;
	width: 68rpx;
	height: 68rpx;
	font-size: 0;
}
</style>
