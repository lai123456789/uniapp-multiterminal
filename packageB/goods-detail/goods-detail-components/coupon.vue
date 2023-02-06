<!-- 详情页 优惠券组件 -->
<template>
	<view class="coupon" :class="[styleIsDefault ? 'default' : '']">
		<view class="coupon-name">{{ couponName }}</view>
	</view>
</template>

<script>
export default {
	props: {
		// 优惠券名字
		couponName: {
			type: String,
			default: ''
		},
		// 优惠券是否用默认灰色样式 true 用灰色  false是彩色
		styleIsDefault: {
			type: Boolean,
			default: true
		}
	},
};
</script>

<style lang="scss" scoped>
.coupon {
	margin: 3rpx 10rpx;
	font-size: 0;
	display: inline-block;
	position: relative;
	overflow: hidden;

	.coupon-name {
		display: inline-flex;
		align-items: center;
		padding: 0 0.6em;
		height: 32rpx;
		border: 1px solid #ff6027;
		background-color: #ffe4db;
		color: #ff6027;
		font-size: 20rpx;
	}

	&::before,
	&::after {
		content: '';
		position: absolute;
		top: 50%;
		width: 14rpx;
		height: 14rpx;
		background-color: #ffffff;
		border-radius: 50%;
		border: 1px solid #ff6027;
	}

	&::before {
		left: 0;
		transform: translate(-50%, -50%);
	}

	&::after {
		right: 0;
		transform: translate(50%, -50%);
	}

	&.default {
		.coupon-name {
			border: 1px solid #939393;
			background-color: #ededed;
			color: #adadad;
		}

		&::before,
		&::after {
			border: 1px solid #939393;
		}
	}
}
</style>
