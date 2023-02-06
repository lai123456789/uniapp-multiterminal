<!--
	首页的广告图弹框
-->
<template>
	<view class="flex-center home-ad-modal" @touchmove.stop="catchTouchMove">
		<view class="ad-box">
			<view class="ad-image-wrap" v-if="calcAdOptions">
				<image :src="calcAdOptions.image" style="width: 600rpx" mode="widthFix" @click="adImageClickFn"></image>
				<view class="close-btn" @click.stop="closeFn"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';

export default {
	props: ['adOptions'],
	methods: {
		closeFn() {
			this.$emit('close');
		},
		adImageClickFn() {
			this.closeFn();
			this.swiperClickFn(this.calcAdOptions);
		}
	},
	mounted() {
		let that = this;
		/* 
		setInterval(() => {
			console.log('that.calcAdOptions', that.calcAdOptions);
		}, 1000); 
		 */
	},
	computed: {
		calcAdOptions() {
			return assertObject(this.adOptions);
		}
	}
};
</script>

<style scoped lang="scss">
.home-ad-modal {
	position: fixed;
	z-index: 900;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.ad-box {
		/* 
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		 */

		.ad-image-wrap {
			/* 
			width: 600rpx;
			height: 880rpx;
			 */
			position: relative;

			.close-btn {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%) translateY(200%);
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				border: 2px solid #ffffff;
				&::after,
				&::before {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					width: 28rpx;
					height: 2px;
					background: #ffffff;
					border-radius: 10000px;
				}

				&::after {
					transform: translateX(-50%) translateY(-50%) rotate(45deg);
				}
				&::before {
					transform: translateX(-50%) translateY(-50%) rotate(-45deg);
				}
			}
		}
	}
}
</style>
