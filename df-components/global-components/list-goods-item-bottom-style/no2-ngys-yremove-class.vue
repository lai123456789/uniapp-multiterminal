<!-- 
	无供应商
	有减购物车按钮
-->
<template>
	 <!-- :class="[`bottom-style-${page}`]" -->
	<view>
		<view class="bottom-price-block">
			<view class="price-block shuanganniushuzi">
				<view class="price-icon">¥</view>
				<view class="price-text">{{ goodsPrice | filterTransNum }}</view>
			</view>
		</view>
		<view class="bottom-price-block">
			<view class="price-right-block">
				<vip-price v-if="isVipPrice">{{ vipPrice | filterTransNum }}</vip-price>
				<view class="price-line" v-else>¥{{ linePrice | filterTransNum }}</view>
			</view>
		</view>

		<view
			class="right-bottom-add-cart-block shuanganniushuzi"
			:class="[selectedNum <= 0 ? 'selectedNum0' : '']"
			@click.stop="catchTouchMove"
			@touchend.stop="catchTouchMove"
		>
			<!-- 商品数小于1时展示的icon图标 -->
			<block v-if="selectedNum <= 0">
				<view
					@click="emitAddGoodstoCartFn"
					class="add-btn-icon-style flex-center"
					:style="{
						backgroundImage: `linear-gradient(160deg, ${hexToRgba(configInfo.web_site_color, 0.5)}, ${
							configInfo.web_site_color
						})`
					}"
				>
					<view class="iconfont icon-ziyuan" style="color: #ffffff;font-size: 30rpx;"></view>
				</view>
			</block>
			<!-- 商品数大于0时的两个按钮 input框 -->
			<block v-else>
				<uni-icons
					:color="configInfo.web_site_color"
					size="25"
					type="minus"
					@click.native="emitMinusGoodstoCartFn"
				></uni-icons>
				<input class="input-dom" disabled type="number" :value="selectedNum" />
				<uni-icons
					:color="configInfo.web_site_color"
					size="25"
					type="plus-filled"
					@click.native="emitAddGoodstoCartFn"
				></uni-icons>
			</block>
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
		emitAddGoodstoCartFn() {
			this.$emit('addGoodstoCartFn');
		},
		emitMinusGoodstoCartFn() {
			this.$emit('minusGoodstoCartFn');
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
	&.selectedNum0 {
		justify-content: flex-end;
	}
	position: absolute;
	right: 10rpx;
	height: 60rpx;
	&.shuanganniushuzi {
		width: 160rpx;
	}
	.input-dom {
		display: flex;
		margin: 0 10rpx;
		text-align: center;
		font-size: 26rpx;
		color: $grey1-color;
	}
}
</style>
