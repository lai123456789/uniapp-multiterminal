<!--
	当首页的地址不在配送范围内 就弹框提示一下用户。 (不做强硬限制 不在范围内 不让看 不让用 不让买) 只是单纯地提示一下
-->
<template>
	<view class="flex-center address-out-of-range-wrap" @touchmove.stop="catchTouchMove">
		<view class="address-out-of-range-box">
			<view class="image-wrap">
				<image class="image-dom image-size" :src="calcImageSrc('/index-images/setAddress.png')"></image>
			</view>

			<view class="tips-text">该地址不在配送范围, 请选择其他地址。</view>

			<view class="btn-group">
				<view class="flex-center btn cancel" @click="cloneFn">不用了</view>
				<view
					class="flex-center btn confirm"
					@click="toChangeAddressFn"
					:style="{ color: configInfo.web_site_color }"
				>
					去切换
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		// 关闭弹框
		cloneFn() {
			this.$emit('clone');
		},
		// 去切换地址
		toChangeAddressFn() {
			this.cloneFn();
			this.navigateToFn({
				url: `/packageA/address/home-select`
			});
		}
	}
};
</script>

<style scoped lang="scss">
.address-out-of-range-wrap {
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.address-out-of-range-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 496rpx;
		height: 416rpx;
		background: #ffffff;
		border-radius: 30rpx;
		overflow: hidden;
		.image-wrap {
			margin: 30rpx 0 0;
			width: 214rpx;
			height: 180rpx;
		}
		.tips-text {
			width: 70%;
			text-align: center;
			line-height: 1.8;
			font-size: 26rpx;
			color: #3f3f3f;
		}
		.btn-group {
			display: flex;
			justify-content: space-between;
			position: relative;
			width: 100%;
			height: 102rpx;
			&::after {
				content: '';
				display: block;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 1px;
				height: 100%;
				background: $bg-grey-color;
			}
			.btn {
				flex: 1;
				height: 100%;
				font-size: 30rpx;
			}
			.cancel {
				color: #252525;
			}
			.confirm {
				color: #252525;
			}
		}
	}
}
</style>
