<!-- 优惠券模态框组件 -->
<template>
	<view class="coupon-modal-box-wrap" v-if="isShowCouponModal">
		<view class="top-box" @click="closeCouponModalFn"></view>
		<view class="bottom-box">
			<view class="icon-block" @click="notUseCouponFn">
				<view class="not-use-btn-text">不使用优惠券</view>
				<uni-icons color="#bbbdc0" size="20" type="closeempty"></uni-icons>
			</view>
			<view class="title-text">选择优惠券</view>

			<view class="content">
				<view class="card-wrap">
					<view class="card-block">
						<view class="title-text">优惠券</view>
						<block v-for="(item, indexs) in couponList" :key="item.id">
							<coupon-item
								:coupon="item"
								:coupon-active="couponActive"
								@selectCouponFn="selectCouponFn"
							></coupon-item>
						</block>
					</view>
				</view>
			</view>
			<view class="nav-bar-block">
				<view class="bar-text">已选择{{ couponCount }}张</view>
				<view
					class="bar-btn"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					@click="commitCouponFn"
					:style="{ background: configInfo.web_site_color }"
				>
					确定
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import couponItem from '@/packageB/order/order-components/coupon-item.vue'; // 单张优惠券组件

import { assertObject } from '@/tools/tools.js';

export default {
	components: {
		couponItem
	},
	props: {
		// 是否显示优惠券
		isShowCouponModal: {
			type: Boolean,
			default: false
		},
		// 优惠券列表数据
		couponList: {
			type: Array,
			default: [{}]
		},
		couponActive: {
			type: Number,
			default: -1
		}
	},
	methods: {
		// 关闭优惠券模态框 (单纯得关闭 不做任何动作)
		closeCouponModalFn() {
			this.$emit('closeCouponModalFn');
		},
		// 不使用优惠券 并且 关闭掉优惠券模态框
		notUseCouponFn() {
			this.$emit('notUseCouponFn');
		},
		// 选择优惠券
		selectCouponFn(arg) {
			this.$emit('selectCouponFn', { ...arg });
		},
		// 确定使用选中的优惠券
		commitCouponFn() {
			if (!this.couponCount) {
				return false;
			}
			this.$emit('commitCouponFn');
		}
	},
	computed: {
		// 返回已选择的优惠券数量
		couponCount() {
			let that = this;
			return assertObject(that.couponList[that.couponActive]).couponId ? 1 : 0;
		}
	}
};
</script>

<style lang="scss" scoped>
.coupon-modal-box-wrap {
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 900;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	.top-box {
		flex: 1;
	}
	.bottom-box {
		height: 1100rpx;
		background: #f5f5f5;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;

		.icon-block {
			display: inline-flex;
			align-items: center;
			position: absolute;
			right: 1em;
			top: 1em;
			font-size: 26rpx;
			color: #bbbdc0;
			border: 1px solid #bbbdc0;
			border-radius: 100rpx;
			padding-left: 0.5em;
			padding-right: 0.5em;
		}

		.title-text {
			text-align: left;
			padding-left: 24rpx;
			color: $grey1-color;
			line-height: 110rpx;
			font-size: 30rpx;
		}

		.content {
			padding: 0 34rpx;
			.title-text {
				color: $grey2-color;
				line-height: 55rpx;
				font-size: 30rpx;
			}

			.card-wrap {
				height: 880rpx;
				.card-block {
					height: 100%;
					overflow-x: hidden;
					@include hide-scrollbar;
					padding-bottom: 10rpx;
				}
			}
		}
		.nav-bar-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 24rpx;
			height: 110rpx;
			background: #ffffff;

			.bar-text {
				font-size: 30rpx;
				color: $grey1-color;
			}
			.bar-btn {
				width: 200rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				color: #ffffff;
				font-size: 35rpx;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
