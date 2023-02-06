<!--
	搜索框组件
-->
<template>
	<view
		class="search"
		:style="{
			background: homeSwiperBgColor
		}"
	>
		<view class="content-wrap">
			<view class="input-box border-radius flex-center" @click="navigateToFn({ url: `/packageA/search/index` })">
				<uni-icons class="icon-search" size="20" color="#91939c" type="search"></uni-icons>
				<view class="text">{{ configInfo.search_default_text }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 当前轮播图的背景颜色
		homeSwiperBgColor: {
			type: String
		}
	},
};
</script>

<style scoped lang="scss">
.search {
	transition: 0.1s;
	height: 44px;
	box-sizing: content-box;
	&.searchFixed {
		display: block;
		position: fixed;
		z-index: 20;
		width: 100vw;
		background: #fefefe;
	}

	.content-wrap {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.input-box {
		width: 100%;
		height: 60rpx;
		letter-spacing: 2rpx;
		color: #b3b4ba;
		font-size: 26rpx;
		background-color: #f7f7f7;

		.text {
			max-width: 80%;
			display: inline-block;
			@include text-ellipsis;
		}
	}
}
</style>
