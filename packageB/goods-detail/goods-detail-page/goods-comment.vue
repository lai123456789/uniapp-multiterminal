<!--
	商品详情页点进来的 商品评论页面
-->
<template>
	<view>
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 评论↓↓↓ -->
		<view class="pingjia" v-if="commentList.length">
			<view class="content-wrap">
				<view class="title-block">
					<view class="num">评论( {{ goodsCommentSum ? goodsCommentSum : 0 }} )</view>
					<view class="haopinglv">
						<text>{{ goodsCommentScale ? goodsCommentScale : '0%' }}</text>
						好评率
					</view>
				</view>
			</view>
		</view>
		<view class="comment-wrap" v-if="commentList.length > 0">
			<view class="content-wrap">
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
			</view>
		</view>
		<null-block v-else></null-block>

		<view class="uni-load-more" v-if="commentList.length > 10">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
import { assertObject, assertArray } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			goodsId: null,
			commentPage: 1, // 当前页面评论索引
			commentList: [{}], // 评论数据
			loadMoreStatus: 'more', // 底部商品列表 下拉状态

			goodsCommentSum: 0, //商品的总和
			goodsCommentScale: '' //百分比
		};
	},
	onLoad(options) {
		let that = this;
		that.goodsId = options.goodsId;
		that.commentList = [];
		that.loadMoreCommentFn();
	},
	methods: {
		// 加载更多评论
		async loadMoreCommentFn(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: isShowLoading,
				url: '/api/Goods/more_goods_comment',
				data: {
					id: that.goodsId,
					page: that.commentPage
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);

					that.goodsCommentScale = resultObj.scale;
					that.goodsCommentSum = resultObj.sum;

					let goodsCommentList = assertArray(resultObj.value);

					if (goodsCommentList.length < 1) {
						that.commentPage--;
						if (that.commentPage <= 1) {
							that.commentPage = 1;
						}
					}
					fn && fn(goodsCommentList);
					that.commentList = that.commentList.concat(goodsCommentList);
				} else {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
			that.isShowLoading = false;
		}
	},
	// 下拉刷新触发的函数
	onPullDownRefresh() {
		let that = this;
		that.commentPage = 1;
		that.loadMoreCommentFn(() => {
			that.commentList = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	onReachBottom() {
		let that = this;
		that.commentPage++;
		that.loadMoreStatus = 'loading';
		that.loadMoreCommentFn(list => {
			if (list.length > 0) {
				that.loadMoreStatus = 'more';
			} else {
				that.loadMoreStatus = 'noMore';
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.pingjia {
	position: sticky;
	top: 0;
	z-index: 400;
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
.comment-wrap {
	width: 750rpx;
	overflow: hidden;
	.content-wrap {
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
			border-top: 1px solid $bg-grey-color;
			&:nth-child(1) {
				border-top: none;
			}

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
