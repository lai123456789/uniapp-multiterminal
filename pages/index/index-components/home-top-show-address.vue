<!--
	头部展示 当前地址组件
-->
<template>
	<view class="home-top-show-address" :style="{ background: homeSwiperBgColor }">
		<view class="content-wrap">
			<view class="user-address" @click="navigateToFn({ url: `/packageA/address/home-select` })">
				<image class="address-icon" :src="calcImageSrc('/index-images/icon-address.png')"></image>
				<view class="address-text">{{ calcAddressText }}</view>
				<uni-icons type="arrowdown" color="#ffffff" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	// 外部传过来的当前地址文字
	props: ['addressText', 'homeSwiperBgColor'],
	computed: {
		calcAddressText() {
			if (this.addressText) {
				return this.addressText;
			}
			return '未获取位置信息';
		}
	}
};
</script>

<style scoped lang="scss">
.home-top-show-address {
	transition: 0.1s;
	.content-wrap {
		overflow: hidden;
	}

	.user-address {
		display: flex;
		align-items: center;
		height: 30px;
		.address-icon {
			margin-left: 5rpx;
			margin-right: 12rpx;
			width: 30rpx;
			height: 36rpx;
		}

		.address-text {
			display: inline-block;
			max-width: 60vw;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #ffffff;
			font-size: 30rpx;
			font-weight: 600;
		}
	}
}
</style>
