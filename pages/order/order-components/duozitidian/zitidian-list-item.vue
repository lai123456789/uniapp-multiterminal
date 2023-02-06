<!--
	模态框 列表 里的 自提点
-->
<template>
	<view class="zitidian-show">
		<view class="left-seller-image">
			<view class="image-wrap">
				<img-bg-css :src="zitidianInfo.zitidianImage"></img-bg-css>
				<view v-if="!zitidianInfo.isRange" class="flex-center not-range" style="flex-direction: column;">
					<view class="text">超出配</view>
					<view class="text">送范围</view>
				</view>
			</view>
		</view>
		<view class="right-seller-info">
			<view class="seller-name">{{ zitidianInfo.zitidianName }}</view>
			<view class="seller-open-time">距收货地: {{ zitidianInfo.zitidianDist }}</view>
			<view class="seller-open-time">营业时间: {{ zitidianInfo.zitidianTime }}</view>
			<view class="seller-address-box">
				<view class="seller-address">{{ zitidianInfo.zitidianAddressText }}</view>
			</view>
		</view>
		<view
			class="flex-center right-btn"
			:style="{ background: zitidianInfo.isRange ? configInfo.web_site_color : '#bfbfbf' }"
			@click="selectZitiFn"
		>
			选择
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';
export default {
	props: ['zitidianInfo', 'listIndex'],
	methods: {
		// 当前自提点被选择
		selectZitiFn() {
			if (!this.zitidianInfo.isRange) {
				return false;
			}
			this.$emit('selectZitiFn', this.listIndex);
		}
	},
};
</script>

<style lang="scss" scoped>
.zitidian-show {
	display: flex;
	justify-content: space-between;
	position: relative;
	margin: 0 22rpx;
	width: 706rpx;
	height: 240rpx;
	background: #ffffff;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 0 0 10rpx #cccccc;

	.left-seller-image {
		position: relative;
		width: 210rpx;
		height: 210rpx;
		padding: 20rpx;
		.image-wrap {
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
			overflow: hidden;
		}
		.not-range {
			position: absolute;
			z-index: 10;
			top: 20rpx;
			left: 20rpx;
			width: 170rpx;
			height: 170rpx;
			background: rgba(0, 0, 0, 0.3);
			color: #ffffff;
			font-size: 30rpx;
			font-weight: 600;
			border-radius: 10rpx;
			letter-spacing: 4rpx;
			overflow: hidden;
		}
	}

	.right-seller-info {
		width: 496rpx;
		padding: 20rpx 20rpx 20rpx 0;
		.seller-name {
			width: 440rpx;

			font-size: 30rpx;
			color: #414141;
			font-weight: 600;

			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.seller-address-box {
			text-overflow: ellipsis; /*设置溢出显示类型为...*/
			-webkit-line-clamp: 2; /*设置显示的行数*/
			overflow: hidden; /*隐藏多于行*/
			display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
			-webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/

			width: 476rpx;
			font-size: 26rpx;
			color: #555555;
			.seller-address {
				line-height: 1.2;
			}
		}
		.seller-open-time {
			width: 476rpx;
			font-size: 26rpx;
			color: #555555;
			line-height: 1.8;
		}
	}

	.right-btn {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		padding: 0 20rpx;
		height: 50rpx;
		font-size: 26rpx;
		border-radius: 1000rpx;
		color: #ffffff;
	}
}
</style>
