<!--
	展示自营店家的自提点
-->
<template>
	<view class="zitidian-show-wrap" v-if="isShow">
		<view class="zitidian-show">
			<view class="left-seller-image">
				<view class="image-wrap"><img-bg-css :src="sellerImage"></img-bg-css></view>
			</view>
			<view class="right-seller-info">
				<view class="seller-name text-ellipsis">{{ sellerName }}</view>
				<view class="seller-open-time text-ellipsis">店长信息: {{ sellerTel }}</view>
				<view class="seller-open-time text-ellipsis">营业时间: {{ sellerOpenTime }}</view>
				<view class="seller-address text-ellipsis-rows">地址: {{ sellerAddress }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';
export default {
	props: {
		// 是否显示当前组件
		isShow: {
			type: Boolean,
			default: false
		},
		// 门店图片
		sellerImage: {
			type: String,
			default: ''
		},
		// 门店名称
		sellerName: {
			type: String,
			default: ''
		},
		// 联系电话
		sellerTel: {
			type: String,
			default: ''
		},
		// 营业时间
		sellerOpenTime: {
			type: String,
			default: ''
		},
		// 门店地址
		sellerAddress: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="scss" scoped>
.zitidian-show-wrap {
	padding: 10rpx 0;
	overflow: hidden;

	.tips {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 22rpx;
		padding: 0 20rpx;
		width: 706rpx;
		height: 80rpx;
		border-radius: 20rpx;
		font-size: 34rpx;
		color: #f48080;
		background: #fde1e1;
	}

	.zitidian-show {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin: 0 22rpx;
		width: 706rpx;
		height: 228rpx;
		background: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		padding: 20rpx 0;
		// box-shadow: 0 0 10rpx #cccccc;

		.left-seller-image {
			position: relative;
			padding: 0 20rpx;
			.image-wrap {
				width: 188rpx;
				height: 188rpx;
				border-radius: 10rpx;
				overflow: hidden;
			}
		}

		.right-seller-info {
			width: 478rpx;
			padding-right: 20rpx;
			.seller-name {
				width: 458rpx;
				height: 40rpx;
				font-size: 30rpx;
				color: #414141;
				font-weight: bold;
			}
			.seller-open-time {
				width: 458rpx;
				height: 40rpx;
				font-size: 26rpx;
				color: #555555;
			}

			.seller-open-time {
				width: 458rpx;
				height: 40rpx;
				font-size: 26rpx;
				color: #555555;
			}
			.seller-address {
				width: 458rpx;
				height: 68rpx;
				font-size: 26rpx;
				color: #555555;
			}
		}
	}
}
</style>
