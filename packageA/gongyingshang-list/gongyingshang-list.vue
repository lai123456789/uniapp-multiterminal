<template>
	<view class="page">
		<view class="gongyingshang-item-wrap content-wrap" v-for="(ii,nn) in 20" :key="nn">
			<view class="gongyingshang-item-info">
				<view class="gongyingshang-info-btn-block">
					<view class="gongyingshang-info-block">
						<view class="gongyingshang-info-image-wrap">
							<img-bg-css
								src="https://dev.sjwxsc.com/uploads/images/20210402/68dadaefd4effc1eba3937dcc50cd56d.jpg"
							></img-bg-css>
						</view>
						<view class="gongyingshang-info-content">
							<view class="gongyingshang-name text-ellipsis">贝贝小零食</view>
							<view class="sale-num_range-block">
								<view class="sale-num">已售100</view>
								<view class="range-null">1026.11km</view>
							</view>
						</view>
					</view>
					<view class="gongyingshang-btn-block">
						<view
							class="to-gongyingshang-btn border-radius"
							:style="{ background: configInfo.web_site_color }"
						>
							进店查看
						</view>
					</view>
				</view>
			</view>
			<view class="goods-list-wrap" v-if="nn%2==0">
				<view class="scroll-view-wrap">
					<scroll-view :scroll-x="true" class="scroll-view-dom">
						<view class="goods-item" v-for="(item, index) in 10" :key="index">
							<view class="goods-image-wrap">
								<img-bg-css
									src="https://dev.sjwxsc.com/uploads/images/20210707/162562820860e51e30216d6.png"
								></img-bg-css>
							</view>
							<view class="goods-name text-ellipsis">松鼠炭烧腰果</view>
							<view class="goods-price">
								<view class="sale-price red-price">¥110</view>
								<view class="line-price">¥120</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
};
</script>
<style lang="scss" scoped>
.page {
	background: $bg-grey-color;
	min-height: 100vh;
	padding: 20rpx 0;

	.gongyingshang-item-wrap {
		margin-top: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		background: #ffffff;
		&:first-child {
			margin-top: 0;
		}

		.gongyingshang-item-info {
			height: 120rpx;
			.gongyingshang-info-btn-block {
				display: flex;
				align-items: center;
				height: 100%;
				.gongyingshang-info-block {
					flex: 1;
					display: flex;
					align-items: center;
					height: 100%;
					.gongyingshang-info-image-wrap {
						width: 120rpx;
						height: 100%;
						border-radius: 8px;
						overflow: hidden;
					}
					.gongyingshang-info-content {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding-left: 20rpx;
						height: 80rpx;
						.gongyingshang-name {
							max-width: 10em;

							font-size: 28rpx;
							font-weight: bold;
							color: #121212;
						}
						.sale-num_range-block {
							color: #505050;
							font-size: 24rpx;
							.sale-num {
								display: inline-block;
								padding-right: 0.3em;
								margin-right: 0.3em;
								border-right: 1px solid #ededed;
							}
							.range-null {
								display: inline-block;
							}
						}
					}
				}
				.gongyingshang-btn-block {
					width: 150rpx;
					.to-gongyingshang-btn {
						text-align: center;
						line-height: 64rpx;
						color: #ffffff;
						font-size: 26rpx;
					}
				}
			}
		}

		.goods-list-wrap {
			margin-top: 20rpx;
			white-space: nowrap;
			.scroll-view-wrap {
				height: 324rpx;
				overflow: hidden;

				.scroll-view-dom {
					height: 344rpx;

					.goods-item {
						display: inline-block;
						margin-left: 18rpx;
						width: 224rpx;
						&:first-child {
							margin-left: 0;
						}
						.goods-image-wrap {
							border-radius: 8px;
							overflow: hidden;
							width: 100%;
							height: 224rpx;
						}

						.line-price,
						.sale-price,
						.goods-name {
							height: 42rpx;
							line-height: 42rpx;
						}

						.goods-name {
							margin-top: 16rpx;
							width: 224rpx;
							font-size: 26rpx;
						}
						.goods-price {
							height: 50rpx;
							.sale-price {
								display: inline-block;
								margin-right: 0.4em;
								font-size: 26rpx;
								font-weight: bold;
							}
							.line-price {
								display: inline-block;
								font-size: 24rpx;
								color: #9a9a9a;
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
	}
}
</style>
