<template>
	<view class="loading-image" v-show="isShowGif"><image :src="calcImageSrc('/global-image/loading-image.gif')" mode=""></image></view>
</template>

<script>
export default {
	props: {
		isShowGif: {
			type: Boolean,
			required: true,
			default: false
		}
	},
};
</script>

<style lang="scss">
.loading-image {
	position: fixed;
	z-index: 880;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: #fefefe;

	image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
		width: 100%;
	}
}
</style>
