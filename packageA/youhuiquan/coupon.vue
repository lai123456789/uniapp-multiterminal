<!-- 
	优惠券列表左侧的红包优惠券组件
-->
<template>
	<view class="coupon-wrap">
		<image class="coupon-image" :src="couponImageSrc"></image>
		<view class="coupon-info-block">
			<view class="coupon-value flex-center" :class="[couponStatus]">
				<view class="icon">¥</view>
				<view class="number">{{ couponValue }}</view>
			</view>
			<view class="coupon-desc flex-center" :class="[couponStatus]">{{ couponDesc }}</view>
			<view class="coupon-bottom-status flex-center" v-if="weiling == couponStatus">待领取</view>
		</view>
	</view>
</template>
<script>
import { weiling, yiling, yiyong, guoqi, couponStatusEnum } from './coupon-const.js';
export default {
	props: {
		// 优惠券状态 <couponStatusEnum>
		couponStatus: {
			type: String,
			default: ''
		},
		// 优惠券抵扣的钱数
		couponValue: {
			type: Number,
			default: 0
		},
		// 优惠券肚子上的描述文字
		couponDesc: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			weiling
		};
	},
	computed: {
		// 根据不同优惠券类型返回对应的优惠券底图
		couponImageSrc() {
			let that = this;
			const imageSrcMap = {
				[weiling]: '/my/not-used.png',
				[yiling]: '/my/used.png',
				[yiyong]: '/my/useded.png',
				[guoqi]: '/my/yiguoqi.png'
			};
			return that.calcImageSrc(imageSrcMap[that.couponStatus]);
		}
	}
};
</script>

<style lang="scss" scoped>
.coupon-wrap {
	position: relative;
	width: 138rpx;
	height: 168rpx;
	.coupon-image {
		position: absolute;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.coupon-info-block {
		position: absolute;
		z-index: 15;
		left: 0;
		bottom: 0;
		width: 138rpx;
		height: 138rpx;

		.coupon-value {
			position: absolute;
			top: 0;
			width: 100%;
			height: 52rpx;
			text-align: center;
			font-weight: bold;
			.icon {
				margin-right: 4rpx;
				line-height: 52rpx;
				height: 52rpx;
				font-size: 18rpx;
			}
			.number {
				height: 52rpx;
				font-size: 40rpx;
			}
			&.weiling {
				color: #ea3a37;
			}
			&.yiling {
				color: #ea3a37;
			}
			&.yiyong {
				color: #374050;
			}
			&.guoqi {
				color: #374050;
			}
		}
		.coupon-desc {
			position: absolute;
			left: 0;
			&.weiling {
				bottom: 36rpx;
			}
			&.yiling {
				bottom: 14rpx;
			}
			&.yiyong {
				display: none;
			}
			&.guoqi {
				display: none;
			}
			width: 100%;
			height: 40rpx;
			font-size: 24rpx;
			color: #ffffff;
		}
		.coupon-bottom-status {
			position: absolute;
			left: 0;
			bottom: 1rpx;
			width: 100%;
			height: 26rpx;
			font-size: 18rpx;
			color: #374050;
		}
	}
}
</style>
