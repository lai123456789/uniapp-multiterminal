<!-- 
	优惠券列表项
-->
<template>
	<view class="coupon-item-block">
		<view class="coupon-content border-radius20">
			<view class="coupon-left-block">
				<coupon :couponStatus="couponStatus" :couponValue="couponValue" :couponDesc="couponDesc"></coupon>
			</view>
			<view class="coupon-right-block">
				<view class="coupon-name text-ellipsis">{{ couponName }}</view>
				<view class="user-use-type text-ellipsis">{{ userUseType }}</view>
				<view class="goods-use-type text-ellipsis">{{ goodsUseType }}</view>
				<view class="time text-ellipsis">{{ time }}</view>
			</view>
		</view>

		<view
			class="right-btn flex-center"
			v-if="isShowBtn"
			@click="btnClickFn"
			:style="{ background: configInfo.web_site_color }"
		>
			{{ couponStatus == weiling ? '立即领取' : '去使用' }}
		</view>
	</view>
</template>

<script>
import coupon from './coupon.vue';
import { weiling, yiling, yiyong, guoqi, couponStatusEnum } from './coupon-const.js';
export default {
	components: {
		coupon
	},
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
		},
		// 优惠券名字
		couponName: {
			type: String,
			default: ''
		},
		// 可使用的会员类型
		userUseType: {
			type: String,
			default: ''
		},
		// 可使用的商品类型
		goodsUseType: {
			type: String,
			default: ''
		},
		// 使用时间
		time: {
			type: String,
			default: ''
		},
		// 是否显示右边的按钮
		isShowBtn: {
			type: Boolean,
			default: false
		},
		// 当前组件索引
		indexs: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			weiling
		};
	},
	methods: {
		btnClickFn() {
			this.$emit('btnClickFn', this.indexs);
		}
	}
};
</script>

<style lang="scss" scoped>
.coupon-item-block {
	position: relative;
	padding: 10rpx 24rpx;
	.coupon-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		padding: 0 40rpx;
		height: 260rpx;
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

		.coupon-left-block {
			padding-right: 40rpx;
		}
		.coupon-right-block {
			flex: 1;
			.coupon-name {
				height: 56rpx;
				line-height: 56rpx;
				font-weight: bold;
				font-size: 26rpx;
				color: #374050;
			}
			.user-use-type,
			.goods-use-type,
			.time {
				height: 32rpx;
				line-height: 32rpx;
				font-size: 22rpx;
				color: #91939c;
			}
			.coupon-name,
			.time {
				width: 444rpx;
			}
			.user-use-type,
			.goods-use-type {
				width: 324rpx;
			}
		}
	}
	.right-btn {
		position: absolute;
		right: 64rpx;
		bottom: 94rpx;
		width: 110rpx;
		height: 46rpx;
		font-size: 22rpx;
		color: #ffffff;
		border-radius: 10rpx;
	}
}
</style>
