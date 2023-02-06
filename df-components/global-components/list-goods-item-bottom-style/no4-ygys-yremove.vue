<!-- 
	有供应商
	有减购物车按钮
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

		<!-- 进入供应商门店按钮 -->
		<view class="bottom-seller-btn" @click.stop="toSellerFn">
			<view class="seller-name">
				<block v-if="gysMdId > 0">
					<view class="text-ellipsis btn-text">{{ gysName }}</view>
					<view
						class="iconfont icon-arrow-right-copy-copy"
						style="display: inline-block; color: #797979; font-size: 12px; transform: translateY(1px);"
					></view>
				</block>
				<view class="btn-text" v-else>自营</view>
			</view>
		</view>

		<view
			class="right-bottom-add-cart-block"
			:class="[selectedNum <= 0 ? 'selectedNum0' : '', shuanganniushuzi]"
			@click.stop="catchTouchMove"
		>
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
		},
		// 供应商门店名字
		gysName: {
			type: String
		},
		/*
			供应商id 
			0 自营
			!0 供应商
		*/
		gysMdId: {
			type: [Number]
		}
	},
	methods: {
		// 跳转到供应商门店
		toSellerFn() {
			this.$emit('toSellerFn');
		},
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
.bottom-price-block {
	display: flex;
	align-items: center;
	padding: 0 20rpx;
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

.bottom-seller-btn {
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	height: 42rpx;
	.seller-name {
		display: inline-flex;
		align-items: center;
		font-size: 22rpx;
		color: #797979;
		.btn-text {
			max-width: 6em;
			display: inline-block;
		}
	}
}

.right-bottom-add-cart-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	right: 10rpx;
	bottom: 10rpx;
	height: 60rpx;
	&.selectedNum0 {
		justify-content: flex-end;
	}
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
	.add-btn-icon-style{
		width: 56rpx;
		height: 56rpx;
		border-radius: 50%;
	}
}
</style>
