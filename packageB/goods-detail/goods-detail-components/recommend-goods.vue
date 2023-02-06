<!-- 商品详情页面 推荐商品列表 滑动 组件 -->
<template>
	<view class="recommend-goods-wrap" v-if="recommendGoodsList.length > 0">
		<view class="content-wrap">
			<view class="recommend-goods-title">{{ recommendGoodsName }}</view>

			<view class="scroll-view-wrap">
				<scroll-view :scroll-x="true" class="scroll-view-dom">
					<view class="bottom-scroll-goods-wrap">
						<view v-for="(goodsItem, indx) in recommendGoodsList" :key="indx" class="scroll-view-div">
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
								page="goodsdetail"
							></scroll-goods-item>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 推荐的商品列表数据
		recommendGoodsList: {
			type: Array,
			default: []
		},
		// 标题文字
		recommendGoodsName: {
			type: String
		}
	},
};
</script>

<style lang="scss" scoped>
.recommend-goods-wrap {
	width: 750rpx;
	overflow: hidden;
	background: $bg-grey-color;
	.content-wrap {
		margin: 10rpx 0;
		background: #ffffff;
		.recommend-goods-title {
			font-size: 36rpx;
			font-weight: 600;
			color: $grey1-color;
			line-height: 90rpx;
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
