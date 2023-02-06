<!-- 商品详情页面 推荐吃什么 菜单 滑动 组件 -->
<template>
	<view class="recommend-eat-wrap" v-if="recommendEatList.length > 0">
		<view class="content-wrap">
			<view class="recommend-eat-title">{{ recommendEatName }}</view>
			<view class="scroll-view-wrap">
				<scroll-view :scroll-x="true" class="scroll-view">
					<view
						class="item"
						v-for="(item, index) in recommendEatList"
						:key="index"
						@click="navigateToFn({ url: `/packageA/eat/food-detail/food-detail?id=${item.id}` })"
					>
						<view class="image-wrap"><img-bg-css :src="item.cover_image"></img-bg-css></view>

						<view class="item-text">
							<view class="text">{{ item.title }}</view>
						</view>
						<view class="tag-wrap">
							<view class="tag-block" v-if="item.c_name && trimFn(item.c_name)">{{ item.c_name }}</view>
						</view>

						<view class="icon-btn border-radius" :style="{ background: configInfo.web_site_color }">
							<uni-icons type="forward" color="#ffffff" size="20"></uni-icons>
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
		// 推荐的菜谱列表数据
		recommendEatList: {
			type: Array,
			default: []
		},
		// 标题文字
		recommendEatName: {
			type: String,
			default: ''
		}
	},
};
</script>

<style lang="scss" scoped>
.recommend-eat-wrap {
	width: 750rpx;
	overflow: hidden;
	background: $bg-grey-color;
	.content-wrap {
		margin: 10rpx 0;
		background: #ffffff;

		.recommend-eat-title {
			font-size: 36rpx;
			color: $grey1-color;
			font-weight: 600;
			line-height: 88rpx;
		}

		.scroll-view-wrap {
			height: 310rpx;
			overflow: hidden;
			white-space: nowrap;
			.scroll-view {
				height: 320rpx;
				.item {
					margin-left: 24rpx;
					display: inline-block;
					position: relative;
					width: 200rpx;
					height: 310rpx;
					font-size: 0;
					vertical-align: top;

					&:nth-child(1) {
						margin-left: 0;
					}
					.image-wrap {
						width: 200rpx;
						height: 176rpx;
						border-radius: 20rpx;
						overflow: hidden;
					}

					.item-text {
						height: 72rpx;

						.text {
							margin-top: 6rpx;
							font-weight: 600;
							line-height: 34rpx;
							font-size: 24rpx;
							color: $grey1-color;
							max-width: 8em;
							white-space: initial;
							@include text-ellipsis-rows;
						}
					}

					.tag-wrap {
						display: inline-block;
						height: 32rpx;
						position: absolute;
						bottom: 20rpx;
					}
					.icon-btn {
						display: block;
						position: absolute;
						right: 0;
						bottom: 20rpx;
						width: 40rpx;
						height: 40rpx;
						@include flex-center;
					}
				}
			}
		}
	}
}
</style>
