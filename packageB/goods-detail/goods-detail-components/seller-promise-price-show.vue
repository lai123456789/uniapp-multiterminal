<!-- 商品详情页面 商家承诺 和 价格说明组件  -->
<template>
	<view class="seller-promise-price-show-wrap">
		<!-- 商家承诺↓↓↓ -->
		<view class="promise-block"><rich-text :nodes="sellerPromise"></rich-text></view>
		<!-- 价格说明↓↓↓ -->
		<view class="jiageshuoming"><rich-text :nodes="priceShow"></rich-text></view>
	</view>
</template>

<script>
export default {
	props: {
		// 商家承诺富文本字符串
		sellerPromise: {
			type: String,
			default: ''
		},
		// 价格说明富文本字符串
		priceShow: {
			type: String,
			default: ''
		}
	},
};
</script>

<style lang="scss" scoped>
.seller-promise-price-show-wrap {
	background: #ffffff;
	border-top: 10rpx solid $bg-grey-color;
}
</style>
