<!--
	商品券模态框
-->
<template>
	<view class="goods-coupon-wrap" v-if="isShow" @click.stop="closeFn">
		<view class="coupon-block" @click.stop="catchTouchMove">
			<view class="coupon-modal-title-block">
				<view class="coupon-title-text">选择商品券</view>
				<view class="close-btn border-radius" @click="noUseGoodsCouponFn">
					<view class="btn-text">不使用商品券</view>
					<view class="btn-icon-block">
						<view class="iconfont icon-chahao" style="font-weight:600;color: #bbbdc0;"></view>
					</view>
				</view>
			</view>
			<view class="coupon-list-content">
				<view class="goods-coupon-list">
					<view
						class="goods-coupon-item-wrap"
						v-for="(goodsCouponItem, goodsCouponKey) in goodsCouponList"
						:key="goodsCouponKey"
						@click="goodsCouponItemClickFn(goodsCouponItem, goodsCouponKey)"
					>
						<view class="goods-coupon-item">
							<view class="active-icon-block" v-if="goodsCouponKey == goodsCouponIndex">
								<view class="bg-block"></view>
								<view class="icon-block">
									<uni-icons type="checkmarkempty" color="#ffffff" size="15"></uni-icons>
								</view>
							</view>

							<view class="top-image-info">
								<view class="coupon-image-wrap">
									<img-bg-css :src="goodsCouponItem.goodsCouponImage"></img-bg-css>
								</view>
								<view class="coupon-info">
									<view class="coupon-name text-ellipsis-rows">
										{{ goodsCouponItem.goodsCouponGoodsName }}
									</view>
									<view class="coupon-price red-price">
										¥{{ goodsCouponItem.goodsCouponPrice | filterTransNum }}
									</view>
								</view>
							</view>
							<view class="bottom-coupon-detail">{{ goodsCouponItem.goodsCouponGoodsName }}</view>
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
import { assertObject } from '@/tools/tools.js';

export default {
	props: {
		// 模态框显示隐藏状态
		isShow: {
			type: Boolean,
			default: false
		},
		// 商品券列表
		goodsCouponList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 商品券索引
		goodsCouponIndex: {
			type: Number,
			required: true
		}
	},
	methods: {
		// 不使用商品券
		noUseGoodsCouponFn() {
			let that = this;
			that.$emit('goodsCouponItemClickFn', -1);
			that.closeFn();
		},
		// 选商品券
		goodsCouponItemClickFn(goodsCouponItem, goodsCouponKey) {
			let that = this;
			if (that.goodsCouponIndex != goodsCouponKey) {
				that.$emit('goodsCouponItemClickFn', goodsCouponKey);
			}
		},
		// 关闭当前模态框
		closeFn() {
			this.$emit('close');
		}
	},
	computed: {
		calcPrice() {
			let that = this;
			if (that.goodsCouponIndex >= 0) {
				return assertObject(that.goodsCouponList[that.goodsCouponIndex]).goodsCouponPrice;
			}
			return 0;
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-coupon-wrap {
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
	.goods-coupon-list {
		padding: 10rpx 0;
		.goods-coupon-item-wrap {
			padding: 0 24rpx;
			overflow: hidden;
			.goods-coupon-item {
				position: relative;
				margin: 10rpx 0;
				padding: 20rpx;
				border-radius: 20rpx;
				background: #ffffff;
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
				.top-image-info {
					display: flex;
					align-items: center;
					justify-content: space-between;
					position: relative;
					&::before,
					&::after {
						content: '';
						display: block;
						position: absolute;
						z-index: 10;
						bottom: 0;
						width: 34rpx;
						height: 34rpx;
						background: #f5f5f5;
						border-radius: 50%;
					}
					&::before {
						left: 0;
						transform: translateX(-100%);
					}
					&::after {
						right: 0;
						transform: translateX(100%);
					}
					.coupon-image-wrap {
						margin-left: 10rpx;
						width: 140rpx;
						height: 140rpx;
						border-radius: 10rpx;
						overflow: hidden;
					}
					.coupon-info {
						margin-left: 10rpx;
						flex: 1;
						height: 140rpx;
						border-bottom: 1px dashed #efefef;
						.coupon-name {
							height: 68rpx;
							font-size: 26rpx;
							font-weight: 600;
							color: #374050;
						}
						.coupon-price {
							height: 40rpx;
							font-size: 28rpx;
							font-weight: 600;
						}
					}
				}
				.bottom-coupon-detail {
					margin-top: 10rpx;
					min-height: 56rpx;
					font-size: 20rpx;
					color: #91939c;
				}
			}
		}
	}
}
</style>
