<!-- 魔方图片 样式1 -->
<template>
	<view class="banner-wrap">
		<view class="content-wrap">
			<view class="border-radius12 banner1-block" @click="swiperClickFn(list[0])" :list-image="list[0].image">
				<img-bg-css :src="list[0].image"></img-bg-css>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		styleId: {
			type: Number,
			default: 1
		},
		list: {
			type: Array,
			default: []
		}
	}
};
</script>

<style lang="scss" scoped>
@import './style.scss';
.banner1-block {
	width: 702rpx;
	height: 336rpx;
}
</style>
