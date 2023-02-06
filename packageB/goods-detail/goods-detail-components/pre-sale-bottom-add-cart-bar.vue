<!-- 预售商品的详情里 底部 添加 购物车 的 导航栏 -->
<template>
	<view class="pre-sale-bottom-add-cart-bar-wrap">
		<view class="content-wrap">
			<view class="icon-list">
				<view class="icon-item" @click="navigateToFn({ url: '/pages/index/index', isTab: true })">
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_home-icon.png')"></image>
					<view class="item-text">首页</view>
				</view>

				<!-- #ifdef MP-WEIXIN -->


				
				<button open-type="contact" class="clear-btn-style icon-item" :send-message-title="goodsName" :send-message-img="goodsImage" :send-message-path="pagePath" bindcontact='contact' show-message-card>
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_new-icon.png')"></image>
					<view class="item-text">客服</view>
				</button>
				<!-- #endif -->

				<!-- #ifdef APP-PLUS -->
				<button
					class="clear-btn-style icon-item"
					@click="appToMiniprogramFn()"
				>
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_new-icon.png')"></image>
					<view class="item-text">客服</view>
				</button>
				<!-- #endif -->

				<view class="icon-item" @click="navigateToFn({ url: '/pages/cart/cart', isTab: true })">
					<view class="uni-badge-icon">
						<uni-badge :text="cardNumber" size="small" type="error"></uni-badge>
					</view>
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_cart-icon.png')"></image>
					<view class="item-text">购物车</view>
				</view>
			</view>
			<view
				v-if="calcIsStart.result"
				class="btn-block"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="$onceClick(addFn)"
				:style="{ background: configInfo.web_site_color }"
			>
				<view class="left-time-info">
					<view class="end-time">{{ calcIsStart.time }}{{ calcIsStart.text }}</view>
					<view class="end-time-text" :data-send-time-text="sendTimeText">{{ sendTimeText }}</view>
				</view>
				<view class="right-price-info">
					<view class="title">立即支付定金</view>
					<view class="price">¥{{ preSaleDingJin | filterTransNum }}</view>
				</view>
			</view>

			<view
				v-else
				class="btn-block default"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				:style="{ background: configInfo.web_site_color }"
			>
				<view class="left-time-info">
					<view class="end-time">{{ calcIsStart.time }}{{ calcIsStart.text }}</view>
					<view class="end-time-text" :data-send-time-text="sendTimeText">{{ sendTimeText }}</view>
				</view>
				<view class="right-price-info">
					<view class="title">立即支付定金</view>
					<view class="price">¥{{ preSaleDingJin | filterTransNum }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { num2zeroStr, timeStr2timeObj } from '@/tools/tools';

export default {
	props: {
		// 预售定金
		preSaleDingJin: {
			type: Number,
			default: 0
		},
		// 预售结束时间 (年月日时分秒字符串)
		preSaleEndTime: {
			type: String,
			default: ''
		},
		// 开始付定金时间
		preSaleDingjinStart: {
			type: String,
			default: ''
		},
		// 发货时间说明
		sendTimeText: {
			type: String,
			default: ''
		},


		// 小程序客服对话框预览图
		goodsImage: {
			type: String,
			default: ''
		},
		// 小程序客服对话框预览图点击的路径
		pagePath: {
			type: String,
			default: ''
		},
		// 小程序客服对话框预览图的商品名字
		goodsName: {
			type: String,
			default: ''
		},
		cardNumber:{
			type: Number,
			default: 0
		}
		

	},
	methods: {
		// 加入到购物车
		async addFn() {
			this.$emit('addFn');
		}
	},
	computed: {
		// 年月日时分秒 转换 月日时分 格式字符 结束时间
		calcPreSaleEndTime() {
			let that = this;
			let { month, day, hours, minutes } = timeStr2timeObj(that.preSaleEndTime);
			return `${month}.${day} ${hours}:${minutes}`;
		},
		// 开始付定金的时间
		calcStartDingjinTime() {
			let that = this;
			let { month, day, hours, minutes } = timeStr2timeObj(that.preSaleDingjinStart);
			return `${month}.${day} ${hours}:${minutes}`;
		},
		/* 
		@description
			
		@return <Boolean>
		*/
		calcIsStart() {
			let that = this;
			
			let startTime = new Date(that.preSaleDingjinStart).getTime();
			let endTime = new Date(that.preSaleEndTime).getTime();
			let newDate = new Date().getTime();

			let result = {};
			// 在活动期内 ( 绿色按钮可以点击 显示结束时间)
			if (startTime < newDate && endTime > newDate) {
				result.result = true;
				result.time = that.calcPreSaleEndTime;
				result.text = '结束';
			}

			// 未开始 (灰色按钮不能点击 显示开始时间)
			if (startTime > newDate) {
				result.result = false;
				result.time = that.calcStartDingjinTime;
				result.text = '开始';
			}
			// 已结束 (灰色按钮不能点击 显示结束时间)
			if (endTime < newDate) {
				result.result = false;
				result.time = that.calcPreSaleEndTime;
				result.text = '结束';
			}
			return result;
		}
	}
};
</script>

<style lang="scss" scoped>
.pre-sale-bottom-add-cart-bar-wrap {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 300;
	padding: 4rpx 0;
	width: 750rpx;
	height: 96rpx;
	background-color: #ffffff;

	.content-wrap {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icon-list {
			flex: 2;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.icon-item {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;

				.item-img {
					width: 36rpx;
					height: 36rpx;
				}

				.item-text {
					color: #6b6b6b;
					font-size: 20rpx;
					line-height: 1.8em;
				}

				.uni-badge-icon {
					position: absolute;
					z-index: 5;
					right: 0;
					top: 0;
					transform: translateX(30%) translateY(-30%) scale(0.9);
				}
			}
		}
		.btn-block {
			flex: 3;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			width: 528rpx;
			height: 100%;
			color: #ffffff;
			font-size: 30rpx;
			white-space: nowrap;
			&.default {
				background: #cecece !important;
			}
			.left-time-info {
				.end-time {
					font-size: 24rpx;
					letter-spacing: 3rpx;
				}
				.end-time-text {
					font-size: 20rpx;
				}
			}
			.right-price-info {
				text-align: center;
				.title {
					font-size: 24rpx;
					font-weight: 600;
				}
				.price {
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>
