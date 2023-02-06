<!--
	首页的 热销排行 商品滑动 组件 
-->
<template>
	<view class="home-hot-scroll-goods-wrap" v-if="homePageScrollGoods.length">
		<block v-for="(item, index) in homePageScrollGoods" :key="index">
			<view class="hot-scroll-goods-box" v-if="item && item.goodsList && item.goodsList.length">
				<view class="content-wrap">
					<view class="top-bar" :style="{ background: item.bgType == 'color' ? item.bgContent : '' }">
						<image class="bg-image" v-if="item.bgType == 'image'" :src="item.bgContent"></image>
						<view class="title-text-box">
							<view class="text">
								<image class="title-icon" v-if="item.titleIcon" :src="item.titleIcon"></image>
								<text class="title-text" :style="{ color: item.titleColor }" v-if="item.titleText">
									{{ item.titleText }}
								</text>
								<text
									class="shu_style"
									v-if="item.titleText && item.subTitleText"
									:style="{ color: item.titleColor }"
								>
									丨
								</text>
								<text
									class="sub-title-text"
									:style="{ color: item.titleColor }"
									v-if="item.subTitleText"
								>
									{{ item.subTitleText }}
								</text>
							</view>
							<view
								class="load-more-btn"
								v-if="item.isShowMoreBtn"
								@click="navigateToFn({ url: `/pages/list-page/index-hot?type_id=${item.id}` })"
								:style="{ color: configInfo.web_site_color }"
							>
								查看更多
							</view>
						</view>
					</view>

					<view class="scroll-view-wrap">
						<scroll-view :scroll-x="true" class="scroll-view-dom">
							<view class="bottom-scroll-goods-wrap">
								<view v-for="(goodsItem, indx) in item.goodsList" :key="indx" class="scroll-view-div">
									<scroll-goods-item
										:goods-id="goodsItem.goodsId"
										:goods-image="goodsItem.goodsImage"
										:is-hot="goodsItem.isHot"
										:is-new="goodsItem.isNew"
										:goods-name="goodsItem.goodsName"
										:goods-tag="goodsItem.goodsTag"
										:is-vip-price="goodsItem.isVipPrice"
										:goods-price="goodsItem.goodsPrice"
										:vip-price="goodsItem.vipPrice"
										:line-price="goodsItem.linePrice"
										:selected-num="goodsItem.selectedNum"
										:is-spec="goodsItem.isSpec"
										:tag-img="goodsItem.tagImg"
										page="home-scroll"
									></scroll-goods-item>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: ['homePageScrollGoods'],
};
</script>
<style scoped lang="scss">
.home-hot-scroll-goods-wrap {
	.hot-scroll-goods-box {
		padding: 10rpx 0;
		background: $bg-grey-color;
		.top-bar {
			overflow: hidden;
			position: relative;
			padding: 0 20rpx;
			height: 88rpx;
			background-image: linear-gradient(90deg, #6ccc4f, #60c669);
			border-radius: 20rpx 20rpx 0 0;
			.bg-image {
				position: absolute;
				z-index: 0;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.title-text-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				z-index: 3;
				height: 88rpx;
				.text {
					display: flex;
					align-items: center;

					.title-icon {
						width: 52rpx;
						height: 52rpx;
						vertical-align: middle;
						margin-right: 20rpx;
					}
					.title-text {
						color: #ffffff;
						font-weight: 700;
						font-size: 36rpx;
					}

					.shu_style {
						display: inline-block;
						transform: scaleX(0.3);
					}

					.sub-title-text {
						color: #ffffff;
						font-size: 26rpx;
					}
				}

				.load-more-btn {
					width: 120rpx;
					height: 43rpx;
					line-height: 43rpx;
					border-radius: 1000rpx;
					text-align: center;
					background-color: #ffffff;
					color: #6ccc4e;
					font-size: 24rpx;
					font-weight: 600;
				}
			}
		}

		.scroll-view-wrap {
			background: #ffffff;
			padding-bottom: 20rpx;
			border-radius: 0 0 10px 10px;
			height: 396rpx;
			overflow: hidden;

			.scroll-view-dom {
				height: 416rpx;

				.bottom-scroll-goods-wrap {
					font-size: 0;
					white-space: nowrap;

					.scroll-view-div {
						display: inline-block;
						height: 396rpx;
					}
				}
			}
		}
	}
}
</style>
