<!--
	展示在页面上的自提点 商家自提类型
-->
<template>
	<view class="zitidian-show-wrap">
		<view class="zitidian-show">
			<view class="left-seller-image">
				<view class="image-wrap"><img-bg-css :src="sellerImage"></img-bg-css></view>
			</view>
			<view class="right-seller-info">
				<view class="seller-name">{{ sellerName }}</view>
				<view class="seller-open-time">店长信息: {{ sellerTel }}</view>
				<view class="seller-open-time">营业时间: {{ sellerOpenTime }}</view>
				<view class="seller-address-box">
					<view class="seller-address">{{ sellerAddress }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';
export default {
	props: {
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
		},
	},
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
		height: 220rpx;
		background: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		// box-shadow: 0 0 10rpx #cccccc;

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
	}
}
</style>
