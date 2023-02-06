<template>
	<view class="pintuan-scroll-wrap">
		<scroll-view :scroll-x="true" class="shop-slider">
			<view
				class="shop-slider-item"
				v-for="(item, index) in scrollViewShopList"
				:key="index"
				@click="navigateToFn({ url: `/packageB/goods-detail/pintuan-detail?id=${item.goods_id}` })"
			>
				<view class="shop-img-box">
					<image class="shop-img" mode="widthFix" :src="item.original_img"></image>
					<view class="icon-img-box">
						<icon-hot-wrap :text="'已抢' + (item.sales_sum ? item.sales_sum : 0) + '件'"></icon-hot-wrap>
					</view>
				</view>
				<view class="shop-name">{{ item.goods_name }}</view>
				<view class="money-value">
					<text>¥</text>
					{{ item.pinprice }}
				</view>
				<view
					class="btn-buy"
					:style="{
						background: configInfo.web_site_color,
						boxShadow: `0 3rpx 15rpx ${configInfo.web_site_color}`
					}"
				>
					拼
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import iconHotWrap from '@/df-components/icon-hot-wrap/index.vue';

export default {
	components: { iconHotWrap },
	props: {
		scrollViewShopList: {
			type: Array
		}
	}
};
</script>

<style lang="scss" scoped>
.pintuan-scroll-wrap {
	width: 100%;
	height: 372rpx;
	overflow: hidden;
	.shop-slider {
		width: 100%;
		height: 392rpx;
		white-space: nowrap;

		.shop-slider-item {
			font-size: 0;
			position: relative;
			display: inline-block;
			width: 200rpx;
			border-radius: 20rpx;
		}

		.shop-img-box {
			height: 196rpx;
			position: relative;
		}

		.shop-img {
			width: 200rpx;
			height: 196rpx;
		}

		.icon-img-box {
			width: 146rpx;
			height: 32rpx;
			position: absolute;
			left: 20rpx;
			bottom: 0;
			transform: translateY(5rpx);
		}

		.shop-name {
			margin-left: 20rpx;
			font-size: 24rpx;
			height: 60rpx;
			line-height: 60rpx;
			width: 7em;
			font-weight: 600;
			@include text-ellipsis;
		}

		.money-value {
			margin-left: 20rpx;
			height: 48rpx;
			line-height: 48rpx;
			font-size: 24rpx;
			color: #eb3c39;
			font-weight: 600;
		}

		.money-value text {
			font-size: 18rpx;
		}

		.money-value-after {
			margin-left: 20rpx;
			font-size: 18rpx;
			color: #91939c;
			text-decoration: line-through;
			line-height: 10rpx;
		}
	}

	.btn-buy {
		position: absolute;
		right: 10rpx;
		bottom: 2rpx;
		@include flex-center;
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
		color: #ffffff;
		font-size: 28rpx;
		box-shadow: 0 3rpx 15rpx #6ccc4f;
	}
}
</style>
