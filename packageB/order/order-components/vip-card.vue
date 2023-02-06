<!-- 是否开通vip会员卡 选项 -->
<template>
	<view class="is-open-vip" v-if="vipOptionCardIsOpen" @click="$onceClick(selectVipOptionCardFn)">
		<view class="content-wrap">
			<view class="vip-tag-block" :style="{ background: vipOptionCardTagBgColor }">
				<view class="icon-img">
					<image style="width: 100%; height: 100%;" :src="vipOptionCardTagIconImg"></image>
				</view>
				<view class="vip-tag-text" :style="{ color: vipOptionCardTagTextColor }">
					{{ vipOptionCardTagText }}
				</view>
			</view>

			<view class="vip-info-block">
				<view class="left-vip-name-block">
					<view class="vip-name">{{ vipOptionCardName }}</view>
				</view>
				<view class="right-vip-btn-block">
					<view class="price-block">
						<view class="vip-price">¥{{ vipOptionCardPrice | filterTransNum }}</view>
						<view class="vip-time">/{{ vipOptionCardTime }}</view>
					</view>

					<view class="select-icon-block">
						<view
							v-show="vipOptionCardIsSelect"
							class="iconfont icon-circle"
							:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
						></view>
						<view
							v-show="!vipOptionCardIsSelect"
							class="iconfont icon-circle1"
							:style="{ 'font-size': '20px', color: '#c7c7c7' }"
						></view>
					</view>

					<view
						class="tip-block"
						:style="{ color: vipOptionCardTipTextColor, background: vipOptionCardTipBgColor }"
					>
						{{ vipOptionCardTipText }}
						<view class="after" :style="{ borderColor: vipOptionCardTipBgColor }"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	// ↓↓ 开通会员的选项卡片 数据
	props: {
		// 用户 是否同意开启 vip
		vipOptionCardIsSelect: {
			type: Boolean,
			default: false
		},
		// 是否显示 勾选vip 确认 开通会员 卡片
		vipOptionCardIsOpen: {
			type: Boolean
		},
		// 展示的会员卡id
		vipOptionCardId: {
			type: Number
		},
		// 会员卡名字
		vipOptionCardName: {
			type: String
		},
		// 会员卡左上标签的背景色
		vipOptionCardTagBgColor: {
			type: String
		},
		// 会员卡左上标签的 图标 图片地址
		vipOptionCardTagIconImg: {
			type: String
		},
		// 会员卡左上标签的 文字内容
		vipOptionCardTagText: {
			type: String
		},
		// 会员卡左上标签的 文字 颜色
		vipOptionCardTagTextColor: {
			type: String
		},
		// 会员卡右上的提示气泡背景颜色
		vipOptionCardTipBgColor: {
			type: String
		},
		// 会员卡右上的提示气泡展示文字
		vipOptionCardTipText: {
			type: String
		},
		// 会员卡右上的提示气泡展示文字颜色
		vipOptionCardTipTextColor: {
			type: String
		},
		// 会员卡的有效时间
		vipOptionCardTime: {
			type: String
		},
		// 购买会员卡的价格
		vipOptionCardPrice: {
			type: Number
		}
	},
	methods: {
		selectVipOptionCardFn() {
			let that = this;
			that.$emit('selectVipOptionCardFn', !that.vipOptionCardIsSelect);
		}
	},
};
</script>

<style lang="scss" scoped>
/* 开通vip的卡片 */
.is-open-vip {
	padding: 12rpx 0;
	height: 184rpx;
	font-size: 0;
	.content-wrap {
		position: relative;
		padding: 0;
		margin: 0 20rpx;
		height: 100%;
		border-radius: 20rpx;
		background: #ffffff;
		overflow: hidden;
		.vip-tag-block {
			display: inline-flex;
			align-items: center;
			height: 40rpx;
			border-radius: 0 1000px 1000px 0;
			.icon-img {
				display: inline-block;
				margin: 0 10rpx 0 30rpx;
				width: 24rpx;
				height: 24rpx;
			}
			.vip-tag-text {
				display: inline-block;
				margin-right: 30rpx;
				font-size: 22rpx;
			}
		}
		.vip-info-block {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 0 20rpx;
			height: 120rpx;
			.left-vip-name-block {
				.vip-name {
					font-weight: bold;
					font-size: 30rpx;
					color: #1d1d1d;
				}
			}
			.right-vip-btn-block {
				display: flex;
				align-items: center;
				.price-block {
					font-weight: bold;
					margin-right: 12rpx;
					color: #1e1e1e;
					.vip-price {
						display: inline-block;
						font-size: 26rpx;
					}
					.vip-time {
						display: inline-block;
						font-size: 24rpx;
					}
				}
				.tip-block {
					position: absolute;
					top: -30rpx;
					right: 10rpx;
					padding: 8rpx 16rpx;
					font-size: 24rpx;
					border-radius: 1000px;

					.after {
						position: absolute;
						border: 16rpx solid;
						border-left: 16rpx solid rgba(0, 0, 0, 0) !important;
						border-right: 16rpx solid rgba(0, 0, 0, 0) !important;
						border-bottom: 16rpx solid rgba(0, 0, 0, 0) !important;
						right: 20rpx;
						bottom: 0;
						width: 0;
						height: 0;
						transform: translateY(100%);
					}
				}
			}
		}
	}
}
</style>
