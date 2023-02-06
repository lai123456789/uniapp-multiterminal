<template>
	<view class="page">
		<view class="search-block" v-if="false">
			<view class="content-wrap">
				<uni-icons class="icon-search" size="20" color="#91939c" type="search"></uni-icons>
				<input class="inp border-radius" type="text" placeholder="微信昵称手机号" v-model="inpVal" />
				<text @click="searchFn">搜索</text>
			</view>
		</view>

		<view class="title-block">
			<view class="content-wrap">
				<text>粉丝</text>
				<text>关注时间</text>
			</view>
		</view>

		<view class="fensi-list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="content-wrap">
					<view class="user-info-block">
						<view class="user-image"><image class="border-radius" :src="item.headimgurl" mode=""></image></view>
						<view class="user-text">
							<view class="name">{{ item.nickname }}</view>
							<view class="text">{{ item.level }}</view>
						</view>
					</view>
					<view class="time">{{ item.add_time }}</view>
				</view>
			</view>

			<view class="load-more-blcok" v-if="calcIsShowLoadMore">
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</view>
		</view>

		<null-block v-if="list.length <= 0" min-height="100vh" is-show-to-page-btn></null-block>

		<loading-css :is-show="isShowLoading" />
	</view>
</template>

<script>
// 工具库 相关
import { checkTypeFn } from '@/tools/tools';

export default {
	data() {
		return {
			isShowLoading: true,
			inpVal: '',
			page: 1,
			list: [],
			showBottomLoadingNum: 12,
			loadMoreStatus: 'more'
		};
	},
	onLoad() {
		let that = this;
		that.getFansFn(() => {
			that.isShowLoading = false;
		});
	},
	computed: {
		calcIsShowLoadMore() {
			let that = this;
			if (checkTypeFn(that.list) == 'Array' && that.list.length > that.showBottomLoadingNum) {
				return true;
			}
			return false;
		}
	},
	methods: {
		async getFansFn(fn, isHideLoading) {
			let that = this;
			let result = await that.$request({
				loading: !isHideLoading,
				url: '/api/Share/myFans',
				data: {
					page: that.page
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn(result.data.data);
					if (checkTypeFn(result.data.data) == 'Array' && result.data.data.length > 0) {
						that.list = that.list.concat(result.data.data);
					} else {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
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
		}
	},
	onReachBottom() {
		let that = this;
		that.page++;
		that.loadMoreStatus = 'loading';
		that.getFansFn(data => {
			if (checkTypeFn(data) == 'Array') {
				if (data.length > 0) {
					that.loadMoreStatus = 'more';
				} else {
					that.loadMoreStatus = 'noMore';
				}
			} else {
				that.loadMoreStatus = 'noMore';
			}
		}, true);
	},
	onPullDownRefresh() {
		let that = this;
		that.page = 1;
		that.getFansFn(() => {
			that.list = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		}, true);
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: $bg-grey-color;
}

.search-block {
	position: sticky;
	z-index: 20;
	top: 0;
	left: 0;
	width: 100%;
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		height: 88rpx;

		.icon-search {
			position: absolute;
			left: 42rpx;
		}

		.inp {
			box-sizing: border-box;
			padding: 0 1em 0 3em;
			width: 628rpx;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 23rpx;
			color: $grey2-color;
			background: #f7f7f7;
		}

		text {
			font-size: 26rpx;
			color: $grey1-color;
		}
	}
}

.title-block {
	height: 84rpx;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;

		text {
			color: #303030;
			font-size: 28rpx;
		}
	}
}

.fensi-list {
	@mixin bottom-border {
		border-bottom: 1px solid $bg-grey-color;
	}

	background: #ffffff;

	.item {
		height: 120rpx;
		@include bottom-border;

		.content-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100%;

			.user-info-block {
				display: flex;

				.user-image {
					width: 74rpx;
					height: 74rpx;
					margin-right: 0.4em;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.user-text {
					display: flex;
					flex-direction: column;

					.name {
						color: #303030;
						font-size: 28rpx;
					}

					.text {
						font-size: 28rpx;
						color: #a2a2a2;
					}
				}
			}

			.time {
				color: #303030;
				font-size: 28rpx;
			}
		}
	}
}
</style>
