<template>
	<view class="tuijian">
		<view class="content-wrap">
			<view class="h3">{{ recDeliciousName }}</view>
			<view class="menu-block">
				<scroll-view :scroll-x="true" class="scroll-view">
					<view class="item" v-for="(item, index) in recDeliciousArr" :key="index" @click="navigateToFn({ url: `/packageA/eat/food-detail/food-detail?id=${item.id}` })">
						<image class="menu-image" :src="item.cover_image" mode=""></image>
						<view class="text-wrap_">
							<view class="menu-name">{{ item.title }}</view>
						</view>
						<view class="tag-wrap">
							<view class="tag-block" v-if="item.c_name && trimFn(item.c_name)">{{ item.c_name }}</view>
						</view>
						<view class="icon-btn border-radius" :style="{ background: configInfo.web_site_color }"><uni-icons type="forward" color="#ffffff" size="20"></uni-icons></view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		recDeliciousArr: {
			//菜谱的列表数据
			type: Array
		},
		recDeliciousName: {
			//菜谱的标题文字
			type: String,
		}
	}
};
</script>

<style lang="scss" scoped>
.tuijian {
	.h3 {
		font-size: 36rpx;
		color: $grey1-color;
		font-weight: 600;
		line-height: 88rpx;
	}

	.scroll-view {
		height: 320rpx;
	}

	.menu-block {
		height: 310rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.item {
		margin-left: 24rpx;
		display: inline-block;
		position: relative;
		width: 200rpx;
		height: 310rpx;
		font-size: 0;
		vertical-align: top;

		&:nth-child(1) {
			margin-left: 0;
		}

		image {
			width: 200rpx;
			height: 176rpx;
			border-radius: 20rpx;
		}

		.menu-name {
			margin-top: 6rpx;
			font-weight: 600;
			line-height: 34rpx;
			font-size: 24rpx;
			color: $grey1-color;
			max-width: 8em;
			white-space: initial;
			@include text-ellipsis-rows;
		}

		.icon-btn {
			display: block;
			position: absolute;
			right: 0;
			bottom: 20rpx;
			width: 40rpx;
			height: 40rpx;
			@include flex-center;
		}
	}
}

.text-wrap_ {
	height: 72rpx;
}

.tag-wrap {
	display: inline-block;
	height: 32rpx;
	position: absolute;
	bottom: 20rpx;
}
</style>
