<!--
	支付时弹出的选择支付方式模态框
-->
<template>
	<view class="payment-type-modal" v-if="isShow" @click.stop="setPaymentTypeModalIsShow">
		<view class="payment-type-content" @click.stop="catchTouchMove">
			<view class="title">
				<view>支付方式</view>
				<view>¥{{ calcPayPrice | filterTransNum }}</view>
			</view>
			<view class="payment-type-list">
				<!-- 余额 -->
				<view class="pay-item">
					<view class="icon-block flex-center">
						<view class="image-block"><yve-icon></yve-icon></view>
					</view>
					<view class="pay-type-text">
						储值余额
						<block v-if="yve > 0">({{ yve | filterTransNum }})</block>
					</view>
					<view class="control-block">
						<view v-if="yve <= 0" class="yve-number">0.00</view>
						<view v-else class="switch-wrap">
							<switch
								style="transform: translateX(20rpx) scale(0.7)"
								:checked="isUseYve"
								:color="configInfo.web_site_color"
								@change="toggleUseYveFn"
							></switch>
						</view>
					</view>
				</view>

				<view class="pay-item" v-if="showPaymentType.wx" @click="setPaymentType(payment_wx)">
					<view class="icon-block flex-center">
						<view class="iconfont icon-weixin" style="color: #6ccc4e; font-size: 60rpx;"></view>
					</view>
					<view class="pay-type-text">微信支付</view>
					<view class="control-block">
						<view
							class="iconfont icon-circle"
							:style="{ color: configInfo.web_site_color }"
							v-if="payment_wx == currentPaymentType"
						></view>
						<view class="iconfont icon-circle1" style="color: #c7c7c7" v-else></view>
					</view>
				</view>

				<!-- 支付宝 -->
				<view class="pay-item" v-if="showPaymentType.zfb" @click="setPaymentType(payment_zfb)">
					<view class="icon-block flex-center">
						<view class="iconfont icon-zhifubao" style="color: #5a9ef7; font-size: 60rpx;"></view>
					</view>
					<view class="pay-type-text">支付宝</view>
					<view class="control-block">
						<view
							class="iconfont icon-circle"
							:style="{ color: configInfo.web_site_color }"
							v-if="payment_zfb == currentPaymentType"
						></view>
						<view class="iconfont icon-circle1" style="color: #c7c7c7" v-else></view>
					</view>
				</view>
			</view>
			<view class="bottom-btn-block flex-center">
				<button
					class="btn-green"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color }"
					@click="$onceClick(confirmPaymentBtnClickFn)"
				>
					支付
				</button>
			</view>
		</view>
	</view>
</template>
<script>
import { paymentTypeEnum, payment_zfb, payment_wx } from '@/tools/const.js';
import { bigMinus } from '@/tools/tools.js';
export default {
	props: ['isShow', 'currentPaymentType', 'showPaymentType', 'yve', 'isUseYve','orderInfoOrdPayPrice'],
	data() {
		return {
			// ↓↓↓ 支付相关 ========================================================================================
			paymentTypeEnum,
			payment_zfb,
			payment_wx
		};
	},

	onLoad() {},
	computed: {},
	methods: {
		// 设置支付方式模态框显示隐藏状态
		setPaymentTypeModalIsShow() {
			this.$emit('setPaymentTypeModalIsShow');
			return false;
		},
		// 切换抵扣余额
		toggleUseYveFn(e) {
			this.$emit('toggleUseYveFn', e.detail.value);
		},
		// 设置支付方式
		setPaymentType(type) {
			this.$emit('setPaymentType', type);
		},
		// 调起客户端支付
		confirmPaymentBtnClickFn() {
			this.$emit('confirmPaymentBtnClickFn');
		}
	},
	computed: {
		// 展示在页面上的支付金额
		calcPayPrice(){
			let that = this;
			if(that.isUseYve){
				if(that.yve >= that.orderInfoOrdPayPrice){
					return 0;
				}else{
					return bigMinus(that.orderInfoOrdPayPrice,that.yve)
					
				}
			}else{
				return that.orderInfoOrdPayPrice
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.payment-type-modal {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: fixed;
	z-index: 300;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);

	.payment-type-content {
		background: #ffffff;
		border-radius: 20rpx 20rpx 0 0;
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 24rpx;
			height: 116rpx;
		}
		.payment-type-list {
			padding: 0 24rpx;
			.pay-item {
				display: flex;
				align-items: center;
				height: 116rpx;
				border-top: 1px solid #f8f8f8;
				&:first-child {
					border-top: none;
				}
				.icon-block {
					margin-right: 14rpx;
				}
				.pay-type-text {
					flex: 1;
					font-size: 26rpx;
					color: #374050;
				}
				.control-block {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					width: 80rpx;
				}
			}
		}
		.bottom-btn-block {
			width: 100%;
			height: 100rpx;
			background: #ffffff;
		}
	}
}
</style>
