<!--
	购物车页面的底部优惠明细模态框组件
-->
<template>
	<view
		v-if="discountsModalFlag"
		class="discounts-modal"
		:class="[isiPhoneX ? 'iPhoneXStyle' : '']"
		@click="setDiscountsModalFlagFn(false)"
	>
		<view class="discounts-info-block" :class="[isiPhoneX ? 'iPhoneXStyle' : '']" @click.stop="catchTouchMove">
			<view class="discounts-info-box">
				<view class="discounts-info-title flex-center">
					<view class="discounts-title-text">优惠明细</view>
					<view class="close-btn" @click="setDiscountsModalFlagFn(false)"></view>
				</view>
				<view v-if="discountsModalTitle" class="discounts-info-tips content-wrap">
					<view class="discounts-tips-icon">
						<view class="iconfont icon-icon_gantanhaozhong" style="color: #91939c"></view>
					</view>
					<view class="discounts-tips-text">{{ discountsModalTitle }}</view>
				</view>
				<view class="discounts-info-list-wrap">
					<view
						class="discounts-info-item content-wrap"
						v-for="(discountsItem, discountsIndex) in discountsModalList"
						:key="discountsIndex"
					>
						<view class="discounts-info-name">{{ discountsItem.name }}</view>
						<view class="discounts-info-price">-¥{{ discountsItem.price | filterTransNum }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 模态框的显示隐藏状态
		discountsModalFlag:{
			type:Boolean,
			default:false
		},
		// 模态框里提示标题文字
		discountsModalTitle:{
			type:String,
			default:''
		},
		// 模态框里优惠信息列表数据
		discountsModalList:{
			type:Array,
			default(){
				return []
			}
		},
	},
	methods:{
		setDiscountsModalFlagFn(flag){
			this.$emit('setDiscountsModalFlagFn',flag)
		},
	}
};
</script>
<style scoped lang="scss">
.discounts-modal {
	padding-bottom: 208rpx;
	&.iPhoneXStyle {
		padding-bottom: 238rpx;
	}
	position: fixed;
	z-index: 100;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	.discounts-info-block {
		bottom: 208rpx;
		&.iPhoneXStyle {
			bottom: 238rpx;
		}

		position: absolute;
		width: 750rpx;
		.discounts-info-box {
			padding: 20rpx 0 0;
			background: #ffffff;
			border-radius: 20rpx 20rpx 0 0;
			.discounts-info-title {
				position: relative;
				height: 88rpx;
				.discounts-title-text {
					font-size: 30rpx;
					font-weight: 600;
					color: #374050;
				}
				.close-btn {
					position: absolute;
					right: 24rpx;
					top: 40%;
					width: 50rpx;
					height: 50rpx;
					transform: translateY(-50%);
					&::before,
					&::after {
						content: '';
						position: absolute;
						top: 50%;
						left: 50%;
						display: block;
						width: 36rpx;
						height: 6rpx;
						border-radius: 1000px;
						background: #91939c;
					}

					&::before {
						transform: translateX(-50%) translateY(-50%) rotate(45deg);
					}
					&::after {
						transform: translateX(-50%) translateY(-50%) rotate(-45deg);
					}
				}
			}
			.discounts-info-tips {
				display: flex;
				align-items: center;
				height: 54rpx;
				.discounts-tips-icon {
					font-size: 0;
					height: 30rpx;
				}
				.discounts-tips-text {
					height: 30rpx;
					line-height: 30rpx;
					font-size: 22rpx;
					color: #91939c;
				}
			}
			.discounts-info-list-wrap {
				.discounts-info-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 76rpx;
					&:last-child {
						height: 100rpx;
						font-weight: 600;
						font-size: 30rpx;
						color: #374050;
						.discounts-info-name {
						}
						.discounts-info-price {
							color: $red-color;
						}
					}
					font-size: 26rpx;
					color: #374050;
					.discounts-info-name {
					}
					.discounts-info-price {
					}
				}
			}
		}
	}
}
</style>
