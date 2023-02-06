<!-- 悬浮在各个商品列表页面的购物车按钮 -->
<template>
	<view
		class="fixed-cart-icon-wrap flex-center"
		:class="[scrollIsStop ? '' : 'transformXClass']"
		@click="navigateToFn({ url: `/pages/cart/cart`, isTab: true })"
	>
		<view class="cart-icon-block"><uni-icons type="cart-filled" color="#ffffff" size="26"></uni-icons></view>
		<view class="badge-block"><uni-badge :text="cardNumber" type="error" size="small"></uni-badge></view>
	</view>
</template>

<script>
export default {
	props: {
		// 全局控制的 当前页面是否停止状态
		scrollIsStop: {
			type: Boolean,
			default: true
		},
		// 购物车数量
		cardNumber: {
			type: Number,
			default: 0
		}
	}
};
</script>

<style lang="scss" scoped>
$size: 86rpx;
.fixed-cart-icon-wrap {
	position: fixed;
	z-index: 800;
	left: 26rpx;
	bottom: 50rpx;
	width: $size;
	height: $size;
	background: rgba(0, 0, 0, 0.45);
	border-radius: 50%;
	transition: 0.8s;
	&.transformXClass {
		transform: translateX(-200%);
	}

	.cart-icon-block {
	}
	.badge-block {
		position: absolute;
		top: 0;
		right: 0;
	}
}
</style>
