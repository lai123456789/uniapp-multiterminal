<!--
	首页显示的平台图标
-->
<template>
	<view class="icon-show-block">
		<view class="content-wrap" v-if="platformIconList.length">
			<view class="icon-item" v-for="(item, index) in platformIconList" :key="index">
				<image :src="item.image"></image>
				<text :style="{ color: platformIconOptions.font_color }">{{ item.content }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 平台图标列表
		platformIconList: {
			type: Array,
			default: []
		},
		// 平台图标列表相关配置
		platformIconOptions: {
			type: Object,
			default: {}
		}
	},
};
</script>

<style scoped lang="scss">
.icon-show-block {
	padding: 10rpx 0;

	.content-wrap {
		font-size: 0;
		padding: 0 5rpx;
	}

	.icon-item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 45rpx;
		font-size: 0;
		width: 33.333333333333%;
	}

	image {
		width: 30rpx;
		height: 30rpx;
	}

	text {
		white-space: nowrap;
		text-indent: 0.3em;
		font-size: 22rpx;
		color: $grey2-color;
		display: inline-block;
		// max-width: 9em;
		// @include text-ellipsis;
	}
}
</style>
