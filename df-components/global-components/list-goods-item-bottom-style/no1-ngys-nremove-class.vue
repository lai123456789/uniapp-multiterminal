<!-- 
	无供应商
	无减购物车按钮
-->
<template>
	 <!-- :class="[`bottom-style-${page}`]" -->
	<view>
		<view class="bottom-price-block">
			<view class="price-block">
				<view class="price-icon">¥</view>
				<view class="price-text">{{ goodsPrice | filterTransNum }}</view>
			</view>
			<view class="price-right-block">
				<vip-price v-if="isVipPrice">{{ vipPrice | filterTransNum }}</vip-price>
				<view class="price-line" v-else>¥{{ linePrice | filterTransNum }}</view>
			</view>
		</view>
		<view class="right-bottom-add-cart-block anniushuzi" @click.stop="addGoodstoCartFn">
			<view v-if="selectedNum >= 1" class="goods-selected-num">
				<uni-badge border size="small" :text="selectedNum" type="error"></uni-badge>
			</view>
			<uni-icons :color="configInfo.web_site_color" size="25" type="plus-filled"></uni-icons>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		// 商品价格
		goodsPrice: {
			type: [String, Number],
			default: 0
		},
		// 是否会员专享
		isVipPrice: {
			type: Boolean,
			default: false
		},
		// vip专享价
		vipPrice: {
			type: [String, Number],
			default: 0
		},
		// 划线价
		linePrice: {
			type: [String, Number],
			default: 0
		},
		// 已经添加到购物车的数量
		selectedNum: {
			type: [String, Number]
		}
	},
	methods: {
		addGoodstoCartFn() {
			this.$emit('addGoodstoCartFn');
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/df-components/global-components/list-goods-item-bottom-style/bottom-style.scss';
.bottom-price-block {
	display: flex;
	align-items: center;
	height: 42rpx;
	.price-block {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-end;
		margin-right: 8rpx;
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
		.price-line {
			font-size: 24rpx;
			color: #91939c;
			text-decoration: line-through;
		}
	}
}

.right-bottom-add-cart-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	right: 10rpx;
	height: 60rpx;
	&.anniushuzi {
		width: 60rpx;
	}
	.goods-selected-num {
		display: inline-block;
		position: absolute;
		top: 0;
		left: 0;
		transform: scale(0.7) translateX(22rpx) translateY(-12rpx);

		/* #ifdef H5 || APP-PLUS */
		transform: scale(0.7) translateX(20rpx) translateY(-2rpx);
		/* #endif */
	}
}
</style>
