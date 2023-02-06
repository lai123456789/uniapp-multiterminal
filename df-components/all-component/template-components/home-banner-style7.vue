
<!-- 魔方图片 样式7 -->
<template>
	<view class="banner-wrap">
		<view class="content-wrap">
			<view class="border-radius12 banner-block" @click="swiperClickFn(list[0])">
				<img-bg-css :src="list[0].image"></img-bg-css>
			</view>
			<view class="border-radius12 banner-block" @click="swiperClickFn(list[1])">
				<img-bg-css :src="list[1].image"></img-bg-css>
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
	},
};
</script>

<style lang="scss" scoped>
@import './style.scss';
.content-wrap {
	display: flex;
	justify-content: space-between;
	.banner-block {
		width: 349rpx;
		height: 224rpx;
	}
}
</style>
