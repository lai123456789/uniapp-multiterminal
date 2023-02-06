<!-- 商品详情页面 展示 评论组件 -->
<template>
	<view class="comment-wrap" v-if="commentList.length > 0 && hasComment">
		<view class="content-wrap">
			<view class="title-block">
				<view class="num">{{ commentName }}( {{ commentSum }} )</view>
				<view class="haopinglv">
					<text>{{ commentScale ? commentScale : '0%' }}</text>
					好评率
				</view>
			</view>
			<view class="list-block">
				<view class="item" v-for="(item, index) in commentList" :key="index">
					<view class="rate-block">
						<view class="user-info">
							<view class="image-block">
								<image :class="item.status ? 'filterStyle' : ''" :src="item.headimgurl"></image>
							</view>
							<view class="user-name">{{ item.status ? '匿名' : item.nickname }}</view>
						</view>
						<uni-rate max="5" :value="item.star" size="18" disabled></uni-rate>
					</view>
					<view class="say">{{ item.content }}</view>
					<view class="time">{{ item.add_time }}</view>
				</view>
			</view>
			<view class="load-more" @click="loadMoreCommentFn">查看更多评论</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		goodsId: {
			type: [String, Number],
			default: null
		},
		// 评论数 前 的文字 展示
		commentName: {
			type: String,
			default: ''
		},
		// 评价条数
		commentSum: {
			type: [String, Number],
			default: 0
		},
		// 好评率
		commentScale: {
			type: [String, Number],
			default: '0%'
		},
		// 评价数据
		commentList: {
			type: Array,
			default: []
		}
	},
	methods: {
		// 加载更多评论
		loadMoreCommentFn() {
			this.navigateToFn({
				url: `/packageB/goods-detail/goods-detail-page/goods-comment?goodsId=${this.goodsId}`
			});
		}
	},
	computed: {
		hasComment() {
			let that = this;
			if (that.commentList.length && Object.keys(that.commentList[0]).length) {
				return true;
			}
			return false;
		}
	}
};
</script>

<style lang="scss" scoped>
.comment-wrap {
	width: 750rpx;
	overflow: hidden;
	background: $bg-grey-color;
	.content-wrap {
		margin: 10rpx 0;
		background: #ffffff;
		.title-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88rpx;
			font-size: 30rpx;
			color: $grey2-color;

			text {
				color: $red-color;
			}
		}

		.item {
			margin-bottom: 10rpx;

			.rate-block {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user-info {
					display: flex;
					align-items: center;
					height: 88rpx;

					.image-block,
					image {
						width: 46rpx;
						height: 46rpx;
						border-radius: 50%;
						overflow: hidden;
					}

					.user-name {
						font-size: 24rpx;
						color: $grey2-color;
						text-indent: 0.3em;
					}
				}
			}

			.say {
				font-size: 26rpx;
				color: $grey1-color;
				letter-spacing: 0.1em;
			}
			.time {
				margin-top: 10rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				color: #c1c1c1;
			}
		}

		.load-more {
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24rpx;
			color: $grey2-color;
			border-top: 1px solid #f1f1f1;
		}
	}
}
</style>
