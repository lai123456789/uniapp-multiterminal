<!--
	秒杀商品详情页面
		轮播图下展示的
			商品价格
			库存销量信息
			秒杀结束的时间倒计时组件
 -->
<template>
	<view class="timer-show" :style="{ background: configInfo.web_site_color }">
		<view class="content-wrap">
			<view class="goods-info-block">
				<view class="info-goods">
					<view class="price-block">
						<view class="price">
							¥
							<text>{{ goodsInfo.price }}</text>
						</view>
						<view class="unit">/{{ goodsInfo.unit }}</view>
					</view>
					<view class="sales-volume">
						<text v-show="goodsInfo.monthNum >= 1">
							月销售量{{ goodsInfo.monthNum }}{{ goodsInfo.unit }} ,
						</text>
						<text v-show="goodsInfo.count >= 1">库存{{ goodsInfo.count }}{{ goodsInfo.unit }}</text>
					</view>
				</view>
				<view class="timer-block">
					<view class="text">{{ calcTipTitle }}:</view>

					<view class="tim-group-block" v-if="endTime.hours && endTime.minutes && endTime.second">
						<view :style="{ color: configInfo.web_site_color }" class="tim-block hour">
							{{ endTime.hours }}
						</view>
						<view class="span-1">:</view>
						<view :style="{ color: configInfo.web_site_color }" class="tim-block min">
							{{ endTime.minutes }}
						</view>
						<view class="span-1">:</view>
						<view :style="{ color: configInfo.web_site_color }" class="tim-block second">
							{{ endTime.second }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		tipTitle: {
			type: String
		},
		// 倒计时的 时分秒
		endTime: {
			type: Object
		},
		// 商品的信息  单价 单位 库存 销量
		goodsInfo: {
			type: Object
		}
	},
	computed:{
		calcTipTitle(){
			if(this.tipTitle == '距离开始'){
				return '距离开始还剩'
			}
			return '距离结束还剩'
		}
	}
};
</script>

<style lang="scss" scoped>
.timer-show {
	height: 120rpx;
	display: flex;
	align-items: center;
	// margin-bottom: 20rpx;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.goods-info-block {
		margin-bottom: 6rpx;
		width: 100%;
		height: 66rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 25rpx;
		color: $grey2-color;
		color: #ffffff;

		.price-block {
			display: flex;
			align-items: center;

			.price {
				text {
					font-weight: 600;
					font-size: 40rpx;
				}
			}
		}

		.timer-block {
			display: flex;
			flex-direction: column;
			align-items: center;

			.text {
				line-height: 40rpx;
			}

			.tim-group-block {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 150rpx;

				.tim-block {
					display: inline-flex;
					margin: 0 5rpx;
					align-items: center;
					padding: 0rpx 5rpx;
					border-radius: 8rpx;
					height: 32rpx;
					background: #ffffff;
					font-size: 18rpx;
					text-align: center;
				}

				.millisecond {
					width: 2em;
					text-align: center;
				}
			}
		}
	}
}
</style>
