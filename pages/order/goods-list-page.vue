<!-- 
	提交订单页面查看单个供应商门店下商品页面
-->
<template>
	<view class="goods-list-page-root">
		<view class="top-seller-name-wrap">
			<view class="text-ellipsis seller-name">万象优鲜通州万达店</view>
			<view class="num-tips">共5类商品</view>

			<view class="border-radius after" :style="{ background: configInfo.web_site_color }"></view>
		</view>

		<view class="goods-item">
			<view class="left-goods-info">
				<view class="goods-image">
					<image
						class="image-size"
						src="https://dev.sjwxsc.com/uploads/images/15979045135f3e16819924b.jpg"
					></image>
				</view>
				<view class="goods-description">
					<view class="text-ellipsis goods-name">芹菜</view>
		
					<view class="goods-price">¥4.62/袋(2斤)×1</view>
				</view>
			</view>
			<view class="right-price-info">
				<view class="icon-block">
					<view
						class="icon-text"
						:style="{
							color: configInfo.web_site_color,
							background: hexToRgba(configInfo.web_site_color, 0.3),
							border: `1px solid ${configInfo.web_site_color}`
						}"
					>
						订
					</view>
					<view class="price-text">2斤/¥4.88</view>
				</view>
			</view>
		</view>
		
		
		<view class="goods-item">
			<view class="left-goods-info">
				<view class="goods-image">
					<image
						class="image-size"
						src="https://dev.sjwxsc.com/uploads/images/15979045135f3e16819924b.jpg"
					></image>
				</view>
				<view class="goods-description">
					<view class="text-ellipsis goods-name">芹菜</view>
		
					<view class="goods-price">¥4.62/袋(2斤)×1</view>
				</view>
			</view>
			<view class="right-price-info">
				<view class="icon-block">
					<view
						class="icon-text"
						:style="{
							color: configInfo.web_site_color,
							background: hexToRgba(configInfo.web_site_color, 0.3),
							border: `1px solid ${configInfo.web_site_color}`
						}"
					>
						订
					</view>
					<view class="price-text">2斤/¥4.88</view>
				</view>
			</view>
		</view>
		
		
		<view class="goods-item">
			<view class="left-goods-info">
				<view class="goods-image">
					<image
						class="image-size"
						src="https://dev.sjwxsc.com/uploads/images/15979045135f3e16819924b.jpg"
					></image>
				</view>
				<view class="goods-description">
					<view class="text-ellipsis goods-name">芹菜</view>
		
					<view class="goods-price">¥4.62/袋(2斤)×1</view>
				</view>
			</view>
			<view class="right-price-info">
				<view class="icon-block">
					<view
						class="icon-text"
						:style="{
							color: configInfo.web_site_color,
							background: hexToRgba(configInfo.web_site_color, 0.3),
							border: `1px solid ${configInfo.web_site_color}`
						}"
					>
						订
					</view>
					<view class="price-text">2斤/¥4.88</view>
				</view>
			</view>
		</view>
		
		<view class="goods-item">
			<view class="left-goods-info">
				<view class="goods-image">
					<image
						class="image-size"
						src="https://dev.sjwxsc.com/uploads/images/15979045135f3e16819924b.jpg"
					></image>
				</view>
				<view class="goods-description">
					<view class="text-ellipsis goods-name">芹菜</view>
		
					<view class="goods-price">¥4.62/袋(2斤)×1</view>
				</view>
			</view>
			<view class="right-price-info">
				<view class="icon-block">
					<view
						class="icon-text"
						:style="{
							color: configInfo.web_site_color,
							background: hexToRgba(configInfo.web_site_color, 0.3),
							border: `1px solid ${configInfo.web_site_color}`
						}"
					>
						订
					</view>
					<view class="price-text">2斤/¥4.88</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	
};
</script>

<style lang="scss" scoped>
.goods-list-page-root {
	padding-top: 14rpx;
	width: 100vw;
	min-height: 100vh;
	background: $bg-grey-color;
	.top-seller-name-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		padding: 0 20rpx;
		background: #ffffff;
		.seller-name {
			width: 540rpx;
			height: 86rpx;
			line-height: 86rpx;
			color: #1a1a1a;
			font-size: 30rpx;
			font-weight: bold;
		}
		.num-tips {
			font-size: 24rpx;
			color: #787878;
		}
		.after {
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 8rpx;
			height: 30rpx;
		}
	}

	.goods-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 170rpx;
		background: #ffffff;
		border-bottom: 1px solid $bg-grey-color;
		&:last-child {
			border-bottom: none;
		}
		.left-goods-info {
			display: flex;
			width: 540rpx;
			.goods-image {
				margin: 0 16rpx;
				width: 100rpx;
				height: 100rpx;
			}
			.goods-description {
				.goods-name,
				.goods-price {
					line-height: 50rpx;
				}
				.goods-name {
					width: 408rpx;
					font-size: 26rpx;
					font-weight: bold;
					color: #0b0b0b;
				}
				.goods-price {
					font-size: 26rpx;
					color: #909090;
				}
			}
		}
		.right-price-info {
			padding-right: 20rpx;
			width: 210rpx;
			height: 100rpx;
			text-align: right;
			.icon-block {
				.icon-text,
				.price-text {
					display: inline-block;
				}

				.icon-text {
					margin: 6rpx;
					padding: 0 6rpx;
					font-size: 24rpx;
					border-radius: 8rpx;
				}
				.price-text {
					font-size: 24rpx;
					color: #909090;
				}
			}
		}
	}
}
</style>
