<template>
	<view class="item border-radius20" @click="selectCouponFn">
		<view v-show="coupon.isSelect" class="isSelectBlock">
			<view class="checkmarkempty"><uni-icons type="checkmarkempty" color="#ffffff" size="15"></uni-icons></view>
			<view class="gb-sanjiao"></view>
		</view>
		<view :class="['card-image-block', coupon.is_use != 1 ? 'filterGray' : '']">
			<image :src="calcImageSrc('/my/used.png')" mode=""></image>
			<view class="text-block">
				<view :class="['lijian']">
					¥
					<text>{{ coupon.money }}</text>
				</view>
				<view :class="['chaoguo', 'toBottom']">{{ coupon.title }}</view>
			</view>
		</view>
		<view :class="['card-description', coupon.is_use != 1 ? 'filterGray' : '']">
			<view class="card-name">【 {{ coupon.coupon_name }} 】{{ coupon.coupon_title }}</view>
			<view class="card-use-type">
				<block v-if="coupon.is_use != 1">{{ coupon.user_coupon_use_type }}</block>
			</view>
			<view class="card-use-type">
				<block v-if="coupon.is_use != 1">{{ coupon.goods_range_title }}</block>
			</view>
			<view class="card-time">{{ coupon.indate }}</view>
		</view>
		<view class="notUse" v-if="toastObj.length > 0">
			<uni-icons type="info" size="14" color="#ff7016"></uni-icons>
			<text style="color: #ff7016">不可用原因:</text>
			<text v-for="(item, index) in toastObj" :class="[item.redColor ? 'red-price' : '']" :key="index">
				{{ item.text }}
			</text>
		</view>
	</view>
</template>

<script>
import { toDoubleNumFn } from '@/tools/tools.js';
export default {
	props: {
		coupon: {
			type: Object
		},
		indexs: {
			type: Number
		}
	},
	mounted() {
		this.toast2Obj();
	},
	data() {
		return {
			toastObj: []
		};
	},
	methods: {
		selectCouponFn() {
			let that = this;
			if (that.coupon.is_use == 1) {
				that.$emit('selectCouponFn', {
					coupon: that.coupon,
					index: that.indexs
				});
			} else {
				let not_reason = that.coupon.not_reason;
				let arr = not_reason.split('__');
				let msg = arr[0].replace('**', arr[1]);
			}
		},
		// 处理不能使用原因的字符串
		toast2Obj() {
			let that = this;
			if (that.coupon.not_reason) {
				let not_reason = that.coupon.not_reason;
				let arr = not_reason.split('__');
				if (arr.length == 1) {
					that.$set(that.toastObj, 0, {
						text: arr[0]
					});
					// console.log(that.toastObj, '赋值完的结果');
					return false;
				} else {
					// let msg = arr[0].replace('**', arr[1]);
					let defaultTxt = arr[0].split('**');

					that.$set(that.toastObj, 0, {
						text: defaultTxt[0]
					});
					that.$set(that.toastObj, 1, {
						text: toDoubleNumFn(arr[1]),
						redColor: true
					});
					that.$set(that.toastObj, 2, {
						text: defaultTxt[1]
					});
					// console.log(that.toastObj, '赋值完的结果');
					return false;
				}
			}
			that.toastObj = [];
			// console.log(that.toastObj, '赋值完的结果');
			return;
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
	position: relative;
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

	.isSelectBlock {
		position: absolute;
		top: 0;
		right: 0;
		width: 54rpx;
		height: 54rpx;
		border-radius: 0 10rpx 0 0;
		overflow: hidden;

		.gb-sanjiao {
			border-top: 28rpx solid #fb4e44;
			border-right: 28rpx solid #fb4e44;
			border-bottom: 28rpx solid transparent;
			border-left: 28rpx solid transparent;
		}

		.checkmarkempty {
			font-size: 0;
			position: absolute;
			top: 10%;
			right: 0;
		}
	}

	.card-image-block {
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
