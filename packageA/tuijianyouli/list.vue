<template>
	<view class="page">
		<view class="title-block">
			<view class=" content-wrap">
				<text>用户</text>
				<text>时间</text>
			</view>
		</view>
		<block v-if="type == 'haoyou'">
			<view class="fensi-list" v-if="haoyouList.length > 0">
				<view class="item" v-for="(item, index) in haoyouList" :key="index">
					<view class="content-wrap">
						<view class="user-info-block">
							<view class="user-image"><image :src="item.headimgurl" mode=""></image></view>
							<view class="user-text">
								<view class="name">{{ item.nickname }}</view>
							</view>
						</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
			</view>

			<null-block v-else min-height="100vh" is-show-to-page-btn></null-block>
		</block>

		<block v-if="type == 'paiming'">
			<view class="fensi-list" v-if="paimingList.length > 0">
				<view class="item" v-for="(item, index) in paimingList" :key="index">
					<view class="content-wrap">
						<view class="user-info-block">
							<view class="user-image"><image :src="item.headimgurl" mode=""></image></view>
							<view class="user-text">
								<view class="name">{{ item.nickname }}</view>
								<view class="text">排名: {{ item.rownum }}</view>
								<!-- <view class="text">2级粉丝</view> -->
							</view>
						</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
			</view>
			<null-block v-else min-height="100vh" is-show-to-page-btn></null-block>
		</block>

		<block v-if="type == 'jiangli'">
			<view class="fensi-list" v-if="jiangliList.length > 0">
				<view class="item" v-for="(item, index) in jiangliList" :key="index">
					<view class="content-wrap">
						<view class="user-info-block">
							<view class="user-image"><image :src="item.headimgurl" mode=""></image></view>
							<view class="user-text">
								<view class="name">{{ item.nickname }}</view>
								<view class="text">金额: {{ item.money }}</view>
							</view>
						</view>
						<view class="time">{{ item.add_time }}</view>
					</view>
				</view>
			</view>
			<null-block v-else min-height="100vh" is-show-to-page-btn></null-block>
		</block>

		<view class="load-more-blcok" v-if="calcIsShowLoadMore">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>

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
			type: '',
			haoyouList: [],
			paimingList: [],
			jiangliList: [],
			titleStr: {
				haoyou: '邀请好友列表',
				paiming: '战绩排名',
				jiangli: '奖励'
			},
			page: 1,

			// 超过12个 会超过屏幕  显示底部加载loading
			showBottomLoadingNum: 12,

			loadMoreStatus: 'more'
		};
	},
	/* 
		 
		 options
			type 根据上邪传的类型展示对应内容
				haoyou    共邀请好友
				paiming   战绩排名
				jiangli   获得奖励
		 */
	onLoad(options) {
		let that = this;
		that.type = options.type;
		that.setTitleFn();
		that[`${that.type}Fn`](() => {
			that.isShowLoading = false;
		});
	},
	methods: {
		// 设置标题
		setTitleFn() {
			let that = this;
			let title = that.titleStr[that.type];
			uni.setNavigationBarTitle({
				title
			});
		},

		// 共邀请好友
		async haoyouFn(fn, isHideLoading) {
			let that = this;
			let result = await that.$request({
				loading: !isHideLoading,
				url: '/api/Share/invite_user_list',
				data: {
					page: that.page
				}
			});

			console.log(result, '打印 邀请好友返回结果_', '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn(result.data.data);
					if (checkTypeFn(result.data.data) == 'Array' && result.data.data.length > 0) {
						that.haoyouList = that.haoyouList.concat(result.data.data);
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
		},
		// 战绩排名
		async paimingFn(fn, isHideLoading) {
			let that = this;
			let result = await that.$request({
				loading: !isHideLoading,
				url: '/api/Share/invite_paiming_list'
			});

			console.log(result, '打印 邀请好友返回结果_', '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn(result.data.data);
					if (checkTypeFn(result.data.data) == 'Array' && result.data.data.length > 0) {
						that.paimingList = that.paimingList.concat(result.data.data);

						console.log(that.paimingList, 'concat后', '\n');
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
		},
		// 获得奖励
		async jiangliFn(fn, isHideLoading) {
			let that = this;
			let result = await that.$request({
				loading: !isHideLoading,
				url: '/api/Share/invite_money_list',
				data: {
					page: that.page
				}
			});
			console.log(result, '打印 邀请好友返回结果_', '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn(result.data.data);
					if (checkTypeFn(result.data.data) == 'Array' && result.data.data.length > 0) {
						that.jiangliList = that.jiangliList.concat(result.data.data);
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
	computed: {
		// 是否显示 底部 loading 组件
		calcIsShowLoadMore() {
			let that = this;
			let attr = that.type;

			if (
				checkTypeFn(that[`${attr}List`]) == 'Array' &&
				that[`${attr}List`].length > that.showBottomLoadingNum &&
				'paiming' != attr
			) {
				return true;
			}
			return false;
		}
	},
	onReachBottom() {
		let that = this;
		that.page++;
		let attr = that.type;
		if (attr == 'paiming') {
			return;
		}

		that.loadMoreStatus = 'loading';
		that[`${that.type}Fn`](data => {
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
		let attr = that.type;
		that.page = 1;
		that[`${attr}Fn`](() => {
			that[`${attr}List`] = [];
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
						border-radius: 10000rpx;
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
