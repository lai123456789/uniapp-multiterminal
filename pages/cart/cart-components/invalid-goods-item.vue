<!--
	购物车页面底部的失效商品组件的失效商品组件
-->
<template>
	<view class="invalid-goods-item" :class="[isLast ? 'last-child' : '']">
		<view class="goods-state flex-center">
			<view class="goods-state-text text-ellipsis border-radius">{{ loseGoodsText }}</view>
		</view>
		<view class="goods-image-wrap-block">
			<view class="tag-img-wrap" v-if="topLeftTagImage">
				<image class="image-size" :src="topLeftTagImage"></image>
			</view>
			<img-bg-css :src="goodsImage"></img-bg-css>
		</view>
		<view class="goods-info-block">
			<view class="goods-name text-ellipsis">{{ goodsName }}</view>
			<view class="goods-description_spec-key-block">
				<view class="goods-description-text text-ellipsis">{{ loseReasonText }}</view>
				<!-- <view class="goods-description-text text-ellipsis" v-if="true">{{ loseReasonText }}</view> -->
				<!-- <view class="goods-spec-key-name-text text-ellipsis" v-else>已选: 20斤 本地</view> -->
			</view>
			<view class="goods-tag-block"><!-- <view class="goods-tag text-ellipsis">热销爆款</view> --></view>
			<view class="bottom-price-block">
				
				<view
					v-if="vipStylePrice"
					class="vip-price-wrap"
					style="height: 26rpx; font-size: 0;"
				>
					<vip-price>{{ goodsPrice | filterTransNum }}</vip-price>
				</view>
				<view v-else class="price-block">
					<view class="price-icon">¥</view>
					<view class="price-text">
						{{ goodsPrice | filterTransNum }}
					</view>
				</view>
				
				<!--
				<view class="price-block">
					<view class="price-icon">¥</view>
					<view class="price-text">33.90</view>
				</view>
				<view class="price-right-block"><view class="price-line">¥40.00</view></view>
				-->
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isLast: {
			type: Boolean
		},
		goodsImage: {
			type: String
		},
		goodsName: {
			type: String
		},
		loseReasonText: {
			type: String
		},
		loseGoodsText: {
			type: String
		},
		topLeftTagImage: {
			type: String
		},
		goodsPrice:{
			type: [Number,String]
		},
		vipStylePrice:{
			type: Boolean
		},
	}
};
</script>

<style scoped lang="scss">
.invalid-goods-item {
	display: flex;
	position: relative;
	padding: 20rpx 0;
	height: 220rpx;
	&::after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 20rpx;
		right: 20rpx;
		height: 1px;
		background: #f1f1f1;
	}
	&.last-child::after {
		display: none;
	}

	.goods-state {
		width: 76rpx;
		height: 180rpx;
		.goods-state-text {
			padding: 0 10rpx;
			background: #929398;
			font-size: 20rpx;
			color: #ffffff;
			line-height: 36rpx;
			text-align: center;
		}
	}
	.goods-image-wrap-block,
	.goods-info-block {
		filter: grayscale(30%);
	}

	.goods-image-wrap-block {
		position: relative;
		width: 180rpx;
		height: 180rpx;
		.tag-img-wrap {
			position: absolute;
			z-index: 15;
			top: 10rpx;
			left: 10rpx;
			width: 54rpx;
			height: 54rpx;
		}
	}
	.goods-info-block {
		position: relative;
		padding: 0 24rpx 0 20rpx;
		width: 446rpx;
		height: 180rpx;

		.goods-name {
			width: 402rpx;
			height: 46rpx;
			line-height: 46rpx;
			font-size: 30rpx;
			color: #374050;
			font-weight: bold;
		}
		.goods-description_spec-key-block {
			display: flex;
			align-items: center;
			width: 402rpx;
			height: 36rpx;
			.goods-description-text,
			.goods-spec-key-name-text {
				width: 402rpx;
				font-size: 26rpx;
				color: #91939c;
			}
		}
		.goods-tag-block {
			display: flex;
			align-items: center;
			width: 402rpx;
			height: 52rpx;
			overflow: hidden;
			.goods-tag {
				display: inline-block;
				padding: 0rpx 10rpx;
				color: #ff6128;
				line-height: 32rpx;
				font-size: 18rpx;
				border-radius: 8rpx;
				border: 1px solid #ff6128;
			}
		}
		.bottom-price-block {
			display: flex;
			align-items: center;
			height: 42rpx;
			.price-block {
				display: flex;
				flex-wrap: nowrap;
				align-items: baseline;
				padding: 0 10rpx 0 0;
				height: 40rpx;
				color: #eb3c39;
				font-weight: bold;

				.price-icon {
					display: inline-block;
					margin-right: 2rpx;
					line-height: 40rpx;
					font-size: 18rpx;
				}

				.price-text {
					flex: 1;
					display: inline-block;
					line-height: 40rpx;
					font-size: 28rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}

			.price-right-block {
				padding-left: 4rpx;
				.price-line {
					font-size: 24rpx;
					color: #91939c;
					text-decoration: line-through;
				}
			}
		}

		.control-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: absolute;
			right: 24rpx;
			bottom: 0;
			width: 160rpx;
			height: 54rpx;

			.input-dom {
				display: flex;
				margin: 0 10rpx;
				text-align: center;
				font-size: 26rpx;
				color: $grey1-color;
			}

			.control-btn-block {
				width: 54rpx;
			}
		}
	}
}
</style>
