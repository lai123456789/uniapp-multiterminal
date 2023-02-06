<!-- 优惠券组件 -->
<template>
	<view class="coupon-item-wrap border-radius20" @click="selectCouponFn">
		<view v-show="isActive" class="right-top-active">
			<view class="checkmarkempty-block">
				<uni-icons type="checkmarkempty" color="#ffffff" size="15"></uni-icons>
			</view>
			<view class="icon-sanjiao"></view>
		</view>

		<view class="coupon-left" :class="[coupon.couponIsUse ? '' : 'filterGray']">
			<image :src="calcImageSrc('/my/used.png')"></image>
			<view class="text-block">
				<view class="lijian">
					¥
					<text>{{ coupon.couponMoney | filterTransNum }}</text>
				</view>
				<view class="chaoguo toBottom">{{ coupon.couponLeftTitle }}</view>
			</view>
		</view>

		<view class="card-description" :class="[coupon.couponIsUse ? '' : 'filterGray']">
			<view class="card-name">【 {{ coupon.couponName }} 】{{ coupon.couponRightTitle }}</view>
			<view class="card-use-type">
				<block v-if="!coupon.couponIsUse">{{ coupon.couponUserUseType }}</block>
			</view>
			<view class="card-use-type">
				<block v-if="!coupon.couponIsUse">{{ coupon.couponGoodsUseTitle }}</block>
			</view>
			<view class="card-time">{{ coupon.couponUseTime }}</view>
		</view>

		<view class="notUse" v-if="coupon.couponNotUse">
			<uni-icons type="info" size="14" color="#ff7016"></uni-icons>
			<text style="color: #ff7016">不可用原因:</text>
			<text
				v-for="(item, index) in coupon.couponNotUseObj"
				:class="[item.redColor ? 'red-price' : '']"
				:key="index"
			>
				{{ item.text }}
			</text>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		coupon: {
			type: Object,
			default: {}
		},
		couponActive: {
			type: Number,
			default: -1
		}
	},
	methods: {
		selectCouponFn() {
			let that = this;
			if (!that.coupon.couponIsUse) {
				return false;
			}
			that.$emit('selectCouponFn', {
				index: that.coupon.index
			});
		}
	},
	computed:{
		isActive(){
			let that = this;
			return that.couponActive == that.coupon.index
		},
	}
};
</script>

<style lang="scss" scoped>
.coupon-item-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	margin-top: 20rpx;
	width: 682rpx;
	height: 261rpx;
	background: #ffffff;
	overflow: hidden;
	box-shadow: 0 3rpx 3rpx #f0f1f3;
	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		width: 40rpx;
		height: 40rpx;
		background: $bg-grey-color;
		border-radius: 50%;
	}
	&::before {
		left: 0;
		transform: translate3d(-50%, -50%, 0);
	}
	&::after {
		right: 0;
		transform: translate3d(50%, -50%, 0);
	}
	.right-top-active {
		position: absolute;
		top: 0;
		right: 0;
		width: 54rpx;
		height: 54rpx;
		border-radius: 0 10rpx 0 0;
		overflow: hidden;

		.icon-sanjiao {
			border-top: 28rpx solid #fb4e44;
			border-right: 28rpx solid #fb4e44;
			border-bottom: 28rpx solid transparent;
			border-left: 28rpx solid transparent;
		}

		.checkmarkempty-block {
			font-size: 0;
			position: absolute;
			top: 10%;
			right: 0;
		}
	}

	.coupon-left {
		position: relative;
		z-index: 10;
		width: 138rpx;
		height: 168rpx;
		margin: 0 40rpx;
		overflow: hidden;

		image {
			position: absolute;
			z-index: 15;
			width: 100%;
			height: 100%;
		}

		.text-block {
			position: absolute;
			z-index: 20;
			bottom: 0;
			width: 138rpx;
			height: 138rpx;

			.lijian {
				position: absolute;
				top: 0;
				width: 100%;
				text-align: center;
				font-size: 18rpx;
				color: $red-color;
				font-weight: 600;

				text {
					font-size: 40rpx;
				}

				&.greyStyle {
					color: #374050;
				}
			}

			.chaoguo {
				position: absolute;
				bottom: 36rpx;
				width: 100%;
				line-height: 40rpx;
				text-align: center;
				font-size: 24rpx;
				color: #ffffff;

				&.toBottom {
					bottom: 14rpx;
				}
			}

			.is-get {
				position: absolute;
				bottom: 0;
				width: 100%;
				line-height: 26rpx;
				text-align: center;
				font-size: 18rpx;
				color: $grey1-color;
			}
		}
	}

	.card-description {
		flex: 1;
		line-height: 32rpx;
		font-size: 20rpx;
		color: $grey2-color;

		.card-name {
			padding-right: 2em;
			line-height: 56rpx;
			font-weight: 600;
			font-size: 26rpx;
			color: $grey1-color;
			line-height: 1.4em;
			@include text-ellipsis-rows;
		}

		.card-time,
		.card-use-type {
			max-width: 14em;
			@include text-ellipsis;
			height: 36rpx;
			line-height: 36rpx;
		}

		.card-time {
			max-width: 22em;
		}
	}

	
	.notUse {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 40rpx;
		height: 38rpx;
		line-height: 38rpx;
		@include text-ellipsis;
		font-size: 25rpx;
		color: $grey2-color;
		background: #f8f8f8;
	}
}
</style>
