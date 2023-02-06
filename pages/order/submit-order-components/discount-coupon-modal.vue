<!--
	优惠券模态框
-->
<template>
	<view class="discount-coupon-wrap" v-if="isShow" @click.stop="closeFn">
		<view class="coupon-block" @click.stop="catchTouchMove">
			<view class="coupon-modal-title-block">
				<view class="coupon-title-text">选择优惠券</view>
				<view class="close-btn border-radius" @click="noUseDiscountCouponFn">
					<view class="btn-text">不使用优惠券</view>
					<view class="btn-icon-block">
						<view class="iconfont icon-chahao" style="font-weight:600;color: #bbbdc0;"></view>
					</view>
				</view>
			</view>
			<view class="coupon-list-content">
				<view class="discount-coupon-list">
					<view
						class="discount-coupon-item-wrap"
						v-for="(discountCouponItem, discountCouponKey) in discountCouponList"
						:key="discountCouponKey"
						@click="discountCouponItemClickFn(discountCouponItem, discountCouponKey)"
					>
						<view
							class="discount-coupon-item"
							:class="[discountCouponItem.discountCouponIsUse ? '' : 'caniuse']"
						>
							<view class="active-icon-block" v-if="discountCouponKey == discountCouponIndex">
								<view class="bg-block"></view>
								<view class="icon-block">
									<uni-icons type="checkmarkempty" color="#ffffff" size="15"></uni-icons>
								</view>
							</view>
							<view
								class="discount-coupon-image-block"
								:class="[discountCouponItem.discountCouponIsUse ? '' : 'not-use-state']"
							>
								<view class="image-wrap">
									<image class="image-size" :src="calcImageSrc('/my/used.png')"></image>
								</view>
								<view class="discount-coupon-text-block">
									<view class="price-text">
										<view class="price-icon">¥</view>
										<view class="price-number">{{ discountCouponItem.discountCouponMoney }}</view>
									</view>
									<view class="discount-fun-text">
										{{ discountCouponItem.discountCouponLeftTitle }}
									</view>
								</view>
							</view>
							<view class="discount-coupon-info-block">
								<view class="discount-coupon-name text-ellipsis-rows">
									{{ discountCouponItem.discountCouponName
									}}{{ discountCouponItem.discountCouponRightTitle }}
								</view>
								<view class="discount-coupon-detail-text text-ellipsis">
									{{ discountCouponItem.discountCouponUseType }}
								</view>
								<view class="discount-coupon-detail-text text-ellipsis">
									{{ discountCouponItem.discountCouponUseRange }}
								</view>
								<view class="discount-coupon-detail-text text-ellipsis">
									{{ discountCouponItem.discountCouponUseTime }}
								</view>
							</view>
							<view class="not-use-msg text-ellipsis" v-if="!discountCouponItem.discountCouponIsUse">
								不可用原因:{{ discountCouponItem.discountCouponNotUseMsg }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-commit-block">
				<view class="current-info">
					<view class="discount-title">优惠:</view>
					<view class="discount-price red-price">¥{{ calcPrice | filterTransNum }}</view>
				</view>
				<view
					class="commit-btn flex-center"
					:style="{ background: configInfo.web_site_color }"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					@click="closeFn"
				>
					确定
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 模态框显示隐藏状态
		isShow: {
			type: Boolean,
			default: false
		},
		// 优惠券列表
		discountCouponList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 优惠券索引
		discountCouponIndex: {
			type: Number,
			required: true
		}
	},
	methods: {
		// 不使用优惠券
		noUseDiscountCouponFn(){
			let that = this;
			that.$emit('discountCouponItemClickFn', -1);
			that.closeFn();
		},
		// 选优惠券
		discountCouponItemClickFn(discountCouponItem, discountCouponKey) {
			let that = this;
			if (discountCouponItem.discountCouponIsUse && discountCouponKey != that.discountCouponIndex) {
				that.$emit('discountCouponItemClickFn', discountCouponKey);
			}
		},
		// 关闭当前模态框
		closeFn() {
			this.$emit('close');
		}
	},
	computed: {
		// 当前可用优惠券的数量
		useDiscountCouponNum() {
			return this.discountCouponList.filter(i => i.discountCouponIsUse).length;
		},
		calcPrice() {
			let that = this;
			if (that.useDiscountCouponNum && that.discountCouponIndex >= 0) {
				return that.discountCouponList[that.discountCouponIndex].discountCouponMoney;
			}
			return 0;
		}
	}
};
</script>

<style lang="scss" scoped>
.discount-coupon-wrap {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: fixed;
	z-index: 400;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	.coupon-block {
		height: 1100rpx;
		background: #f5f5f5;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;
		overflow: hidden;
		.coupon-modal-title-block {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			height: 100rpx;

			.coupon-title-text {
				color: #374050;
				font-size: 30rpx;
			}
			.close-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 46rpx;
				width: 210rpx;
				border: 1px solid #bbbdc0;
				.btn-text {
					font-size: 26rpx;
					color: #bbbdc0;
				}
				.btn-icon-block {
				}
			}
		}
		.coupon-list-content {
			height: 890rpx;
			overflow-x: hidden;
		}
		.bottom-commit-block {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			height: 110rpx;
			background: #ffffff;
			.current-info {
				display: flex;
				align-items: baseline;
				.discount-title {
					font-size: 26rpx;
					color: #374050;
				}
				.discount-price {
					font-weight: 600;
					font-size: 26rpx;
				}
			}
			.commit-btn {
				width: 200rpx;
				height: 80rpx;
				color: #ffffff;
				font-size: 35rpx;
			}
		}
	}
}

.coupon-list-content {
	.discount-coupon-list {
		padding: 10rpx 0;
		.discount-coupon-item-wrap {
			padding: 0 24rpx;
			overflow: hidden;
			.discount-coupon-item {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				position: relative;
				margin: 10rpx 0;
				padding: 20rpx 30rpx;
				height: 208rpx;
				border-radius: 20rpx;
				background: #ffffff;

				&.caniuse {
					height: 238rpx;
				}

				&::before,
				&::after {
					content: '';
					display: block;
					position: absolute;
					z-index: 10;
					top: 50%;
					width: 34rpx;
					height: 34rpx;
					background: #f5f5f5;
					border-radius: 50%;
				}
				&::before {
					left: 0;
					transform: translateX(-50%) translateY(-50%);
				}
				&::after {
					right: 0;
					transform: translateX(50%) translateY(-50%);
				}
				.active-icon-block {
					position: absolute;
					top: 0;
					right: 0;
					width: 54rpx;
					height: 54rpx;
					border-radius: 0 20rpx 0 0;
					overflow: hidden;
					.bg-block {
						border-top: 27rpx solid #fb4e44;
						border-bottom: 27rpx solid rgba(0, 0, 0, 0);
						border-left: 27rpx solid rgba(0, 0, 0, 0);
						border-right: 27rpx solid #fb4e44;
					}
					.icon-block {
						position: absolute;
						top: 4rpx;
						right: 2rpx;
						font-size: 0;
					}
				}
				.discount-coupon-image-block {
					position: relative;
					&.not-use-state {
						filter: grayscale(100%);
					}
					.image-wrap {
						width: 138rpx;
						height: 168rpx;
					}
					.discount-coupon-text-block {
						position: absolute;
						z-index: 20;
						bottom: 0;
						width: 138rpx;
						height: 138rpx;
						.price-text {
							display: flex;
							align-items: baseline;
							justify-content: center;
							position: absolute;
							top: 0;
							width: 100%;
							color: #ea3a37;
							font-weight: bold;
							.price-icon {
								font-size: 18rpx;
							}
							.price-number {
								font-size: 40rpx;
							}
						}
						.discount-fun-text {
							position: absolute;
							bottom: 36rpx;
							width: 100%;
							text-align: center;
							font-size: 24rpx;
							color: #ffffff;
							bottom: 14rpx;
						}
					}
				}
				.discount-coupon-info-block {
					width: 504rpx;
					padding-left: 20rpx;
					.discount-coupon-name {
						height: 68rpx;
						font-weight: 600;
						font-size: 26rpx;
						color: #374050;
					}
					.discount-coupon-detail-text {
						height: 33rpx;
						font-size: 22rpx;
						color: #91939c;
					}
				}
				.not-use-msg {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					padding: 0 40rpx;
					font-size: 26rpx;
					color: #91939c;
					background: #f8f8f8;
					border-radius: 0 0 20rpx 20rpx;
				}
			}
		}
	}
}
</style>
