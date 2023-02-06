<!-- 
	首页优惠券弹框
-->
<template>
	<view class="home-coupon-modal" @click="closeFn"  @touchmove.stop="catchTouchMove">
		<!-- <view v-show="isUseCouponBgImg" class="bgImg" @click.stop="catchTouchMove"> -->
		<view class="bgImg" @click.stop="catchTouchMove">
			<view class="coupon-title" :style="{ color: setOptions.coupon_popout_text_color }">
				<view class="before" :style="{ background: setOptions.coupon_popout_text_color }"></view>
				<view class="after" :style="{ background: setOptions.coupon_popout_text_color }"></view>
				{{ couponTitle }}
			</view>
			<view class="couponList-blcok">
				<view class="coupon-item" v-for="(item, index) in list" :key="index">
					<view class="coupon-item-text">
						<view
							class="left-price-block flex-center"
							:style="{ color: setOptions.coupon_popout_money_text_color }"
						>
							<view class="icon-rmb">¥</view>
							<view class="price-text">{{ item.money }}</view>
						</view>
						<view class="right-coupon-description flex-center">
							<view
								class="coupon-description-text flex-center"
								:style="{ color: setOptions.coupon_popout_title_text_color }"
							>
								{{ item.title }}
							</view>
						</view>
					</view>
					<image
						class="coupon-item-bg"
						v-if="configInfo.coupon_qb_back_img"
						:src="addimgPathHostFn(configInfo.coupon_qb_back_img)"
					></image>
				</view>
			</view>
			<view class="btn-group">
				<view
					class="left-btn flex-center"
					:style="{
						color: setOptions.coupon_popout_but_text_color,
						background: setOptions.coupon_popout_but_color
					}"
					@click.stop="lingqv"
				>
					立即领取
				</view>
				<view
					class="right-btn flex-center"
					:style="{
						color: setOptions.coupon_popout_but_text_color,
						background: setOptions.coupon_popout_but_color
					}"
					@click.stop="closeFn"
				>
					下次再说
				</view>
			</view>
			<view class="bgImg-wrap" v-if="couponBgImg"><image class="bgImg-dom" :src="couponBgImg"></image></view>
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';
import couponItem from '@/pages/index/index-components/home-coupon-modal-components/coupon-item.vue';
let timer;

export default {
	props: {
		isShow: {
			type: Boolean
		},
		list: {
			type: Array
		},
		setOptions: {
			type: Object
		}
	},
	components: {
		couponItem
	},
	methods: {
		lingqv() {
			this.$emit('lingqv');
		},
		closeFn() {
			this.$emit('close');
		}
	},
	computed: {
		// 返回优惠券的 背景图片地址
		couponBgImg() {
			if (this.configInfo.coupon_back_img) {
				return this.addimgPathHostFn(this.configInfo.coupon_back_img);
			}
			return '';
		},
		couponTitle(){
			return assertObject(this.setOptions).title || '';
		}
	}
};
</script>

<style lang="scss" scoped>
.home-coupon-modal {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 501;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);

	.box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%, -50%, 0);
		width: 630rpx;
		max-height: 910rpx;
		background: #ffecee;
		border-radius: 20rpx;

		.icon-close {
			position: absolute;
			top: 0;
			right: 0;
			transform: translate3d(50%, -120%, 0);
		}

		.title-h2 {
			font-size: 45rpx;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			color: $grey1-color;
			font-weight: 600;
			margin-bottom: 20rpx;
			border-radius: 20rpx 20rpx 0 0;
		}

		.list {
			max-height: 560rpx;

			&::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				white-space: nowrap;
			}
		}

		.btn-get {
			margin: 30rpx auto;
			border-radius: 10000rpx;
			color: #ffffff;
			width: 330rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			box-shadow: inset 0 40rpx 40rpx rgba(255, 255, 255, 0.3);
			background: #fa686b;
			font-size: 35rpx;
		}

	}

	.bgImg {
		$styleColor: #f64c2f;

		@mixin size {
			width: 644rpx;
			height: 794rpx;
		}

		position: absolute;
		left: 50%;
		top: 50%;
		@include size;
		transform: translate(-50%, -50%);

		.coupon-title {
			display: inline-block;
			position: absolute;
			left: 50%;
			top: 136rpx;
			z-index: 10;
			font-weight: bold;
			color: $styleColor;
			font-size: 32rpx;
			letter-spacing: 0.3em;
			text-indent: 0.3em;
			transform: translateX(-50%);

			.before,
			.after {
				content: '';
				display: block;
				position: absolute;
				top: 60%;
				width: 50rpx;
				height: 2rpx;
				background: $styleColor;
			}

			.before {
				left: 0;
				transform: translate(-100%, -50%);
			}

			.after {
				right: 0;
				transform: translate(100%, -50%);
			}
		}

		.couponList-blcok {
			position: absolute;
			top: 210rpx;
			left: 50%;
			transform: translateX(-50%);
			max-height: 294rpx;
			z-index: 5;
			overflow-x: hidden;

			&::-webkit-scrollbar {
				display: none;
			}

			.coupon-item {
				position: relative;
				width: 414rpx;
				height: 104rpx;
				margin-bottom: 14rpx;

				.coupon-item-text {
					display: flex;
					position: absolute;
					z-index: 10;
					width: 100%;
					height: 100%;

					.left-price-block {
						width: 146rpx;
						color: #ffffff;

						.icon-rmb {
							font-size: 26rpx;
							transform: translateY(2px);
						}

						.price-text {
							font-size: 42rpx;
							font-weight: bold;
						}
					}

					.right-coupon-description {
						flex: 1;
						height: 100%;

						.coupon-description-text {
							width: 80%;
							height: 80%;
							font-size: 26rpx;
							color: $styleColor;
							@include text-ellipsis-rows;
						}
					}
				}

				.coupon-item-bg {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}
			}
		}

		.btn-group {
			display: flex;
			justify-content: space-between;
			position: absolute;
			z-index: 10;
			left: 50%;
			transform: translateX(-50%);
			bottom: 72rpx;
			width: 440rpx;
			height: 74rpx;

			.left-btn,
			.right-btn {
				width: 200rpx;
				height: 74rpx;
				border-radius: 1000rpx;
				background: #ffffff;
				color: $styleColor;
				font-size: 28rpx;
			}

			.right-btn {
				opacity: 0.8;
			}
		}

		.bgImg-wrap {
			position: absolute;
			z-index: 1;
			left: 0;
			top: 0;
			@include size;

			.bgImg-dom {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
