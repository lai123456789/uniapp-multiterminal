<!--
	底部商品列表组件
-->
<template>
	<view class="">
		<loading-goods height="80vh" width="100vw" :is-show="goodsLoading"></loading-goods>
		<block v-if="!goodsLoading">
			<view class="bottom-shop-list" v-if="goodsList.length > 0">
				<view class="content-wrap">
					<view
						class="list-goods-item-div"
						v-for="(item, index) in goodsList"
						:key="index"
						:data-ke="item.goodsId"
					>
						<list-goods-item
							:goods-id="item.goodsId"
							:goods-image="item.goodsImage"
							:is-hot="item.isHot"
							:is-new="item.isNew"
							:goods-name="item.goodsName"
							:goods-description="item.goodsDescription"
							:goods-tag="item.goodsTag"
							:is-vip-price="item.isVipPrice"
							:goods-price="item.goodsPrice"
							:vip-price="item.vipPrice"
							:line-price="item.linePrice"
							:selected-num="item.selectedNum"
							:is-spec="item.isSpec"
							:tag-img="item.tagImg"
							:gysMdId="item.gysMdId"
							:gysMdName="item.gysMdName"
							page="home-bottom-goods-list"
						></list-goods-item>
					</view>
				</view>
			</view>
			<null-block v-else></null-block>

			<view class="uni-load-more">
				<uni-load-more v-if="goodsList.length" :status="loadMoreStatus"></uni-load-more>
			</view>
		</block>
	</view>
</template>

<script>
import loadingGoods from '@/df-components/loading-image/loading-goods.vue'; // 商品列表加载时的 loading图

export default {
	props: {
		// 底部商品图加载 状态 true正在加载, false不在加载
		goodsLoading: {
			type: Boolean,
			default: false
		},
		// 底部商品列表 下拉状态
		loadMoreStatus: {
			type: String,
			default: ''
		},
		goodsList: {
			type: Array,
			default: []
		}
	},
	components: {
		loadingGoods
	},
};
</script>

<style scoped lang="scss">
.bottom-shop-list {
	background: $bg-grey-color;
	padding-top: 20rpx;

	.content-wrap {
		font-size: 0;
		margin-bottom: -20rpx;

		.list-goods-item-div {
			display: inline-block;
			margin-right: 19rpx;
			margin-bottom: 20rpx;

			&:nth-child(2n) {
				margin-right: 0;
			}
		}
	}
}

.uni-load-more {
	background: $bg-grey-color;
}
</style>
