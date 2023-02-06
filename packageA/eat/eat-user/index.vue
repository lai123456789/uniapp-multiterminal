<template>
	<view class="page">
		<loading-css :is-show="isShowLoading"></loading-css>
		<view class="text-wrap">
			<view class="content-wrap">
				<view @click="navigateToFn({url:`/packageA/eat/fabuzuopin/index`})" class="right-text-block">{{ isOpenEatPage ? '发布作品' : '更多' }}</view>
			</view>
		</view>
		<view class="user-info-block">
			<view class="image-block">
				<image :src="userInfoAvatar"></image>
			</view>
			<view class="nick-name">{{ userInfoNickName }}</view>
		</view>
		<view class="like-num-block" v-if="isOpenEatPage">
			<view>
				{{ collect }}
				<text>获赞</text>
			</view>
			<view>
				
				{{ zan }}
				<text>获收藏</text>
			</view>
		</view>
		<view class="top-tab-bar">
			<view class="tab-bar-content">
				<view :class="['item', act == 0 ? 'act' : '']" @click="selectMenuFn(0)" :style="{ color: act == 0 ? configInfo.web_site_color : '#374050' }">
					<view class="after border-radius" :style="{ background: configInfo.web_site_color }"></view>
					点赞
				</view>
				<view :class="['item', act == 1 ? 'act' : '']" @click="selectMenuFn(1)" :style="{ color: act == 1 ? configInfo.web_site_color : '#374050' }">
					<view class="after border-radius" :style="{ background: configInfo.web_site_color }"></view>
					收藏
				</view>
				<view :class="['item', act == 2 ? 'act' : '']" @click="selectMenuFn(2)" :style="{ color: act == 2 ? configInfo.web_site_color : '#374050' }"
				 v-if="isOpenEatPage">
					<view class="after border-radius" :style="{ background: configInfo.web_site_color }"></view>
					作品
				</view>
			</view>
		</view>
		<!-- 吃什么 列表↓↓ -->
		<view class="eat-list" v-if="deliciousList.length > 0">
			<view class="content-wrap">
				<view class="item border-radius20" v-for="(item, index) in deliciousList" :key="index" @click="toFoodDetailFn(item)" @longtap="longtapFn(item, index)"
				 @touchstart="touchstart" @touchend="touchend">
					<view class="image-wrap">
						<image class="goods-image" :src="item.cover_image"></image>
						<block v-if="type == 2">
							<view class="status-block" v-if="item.statusID != 3">
								<!-- 
								 "statusID": 2  //根据这个字段判断是否显示状态   值为：
								 1-待审核   
								 2-未通过审核   
								 3-通过审核  
								 4-内容违规  
								 5-标题违规  
								 6-图片违规      
								  -->
								<view class="status-text border-radius">{{ item.status }}</view>
							</view>
						</block>
					</view>
					<view class="text-wrap">
						<view class="txt-description">{{ item.title }}</view>
					</view>
					<view class="info-block">
						<view class="user-info-block">
							<image v-if="type == 2" :src="userInfoAvatar"></image>
							<image v-else :src="item.headimg"></image>
							<text v-if="type == 2">{{ userInfoNickName }}</text>
							<text v-else>{{ item.nickname }}</text>
						</view>
						<view class="good-num">
							<uni-icons color="#dc3c3a" type="heart-filled"></uni-icons>
							<!-- <uni-icons color='#d4d7da' type="heart"></uni-icons> -->
							<text>{{ item.zan }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<null-block v-if="deliciousList.length <= 0" min-height="75vh" is-show-to-page-btn to-page-text="发布作品" :to-page-url="{ url: '/packageA/eat/fabuzuopin/index' }"></null-block>
		<view class="uni-load-more" v-if="deliciousList.length > 2">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'

	// 工具库 相关
	import {
		checkTypeFn,
		assertObject
	} from '@/tools/tools';

	export default {
		data() {
			return {
				isShowLoading: true, // 开屏动画
				loadMoreStatus: 'more',

				collect: 0, // 获赞数
				zan: 0, // 收藏数

				userEatInfo: {},
				act: 0,
				type: 0,
				page: 1,
				deliciousList: [{}],
				enumList: ['点赞', '收藏', '作品'],
				touchT: ''
			};
		},
		onLoad() {
			let that = this;
			that.act = 0;
			that.type = 0;
			that.page = 1;
			uni.setNavigationBarTitle({
				title: that.configInfo.shoname,
			})
		},
		onShow() {
			let that = this;
			that.getWorksInfo(() => {
				that.deliciousList = [];
			}, true);
		},
		// 下拉刷新
		onPullDownRefresh() {
			let that = this;
			that.page = 1;
			that.getWorksInfo(() => {
				that.deliciousList = [];
				uni.stopPullDownRefresh();
			}, true);
		},
		// 上拉到底加载更多
		onReachBottom() {
			let that = this;
			that.loadMoreStatus = 'loading';
			that.page++;
			that.getWorksInfo(list => {
				let loadMoreStatus;
				if (list.length > 0) {
					loadMoreStatus = 'more';
				} else {
					loadMoreStatus = 'noMore';
				}
				that.loadMoreStatus = loadMoreStatus;
			}, true);
		},

		methods: {
			touchstart() {
				let that = this;
				that.touchT = new Date().getTime();
			},
			touchend() {
				let that = this;
				that.touchE = new Date().getTime();
			},
			// 长按删除
			longtapFn(item, index) {
				let that = this;
				if (that.type != 2) {
					return false;
				}

				uni.showModal({
					title: '确认删除作品',
					async success(e) {
						if (e.confirm) {
							let result = await that.$request({
								loading: true,
								url: '/api/Delicious/delDelicious',
								data: {
									id: item.id
								}
							});

							if (result.statusCode == 200) {
								if (result.data.code == 200) {
									that.deliciousList.splice(index, 1);
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
					}
				});
			},
			// 获取作品列表
			async getWorksInfo(fn, isHideLoading) {
				let that = this;
				let {
					type,
					page
				} = that;
				let result = await that.$request({
					loading: !isHideLoading,
					url: '/api/Delicious/works',
					data: {
						type,
						page
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObj = assertObject(result.data.data);
						let numObj = assertObject(resultObj.num);
						that.collect = numObj.collect;
						that.zan = numObj.zan;

						let list = assertObject(resultObj.works)[that.enumList[that.act]];

						let contentList;
						if (checkTypeFn(list) == 'Array' && list.length > 0) {
							contentList = list;
						} else {
							contentList = [];
							that.page--;
							if (that.page <= 1) {
								that.page = 1;
							}
						}
						fn && fn(contentList);
						that.deliciousList = that.deliciousList.concat(contentList);
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
			},
			// 点击按钮显示对应的菜单
			selectMenuFn(n) {
				let that = this;
				that.act = n;
				that.type = n;
				that.page = 1;
				that.getWorksInfo(() => {
					that.deliciousList = [];
				});
			},
			// 进入详情
			toFoodDetailFn(item) {
				let that = this;
				if (that.touchE - that.touchT > 350) {
					return;
				}
				that.navigateToFn({
					url: `/packageA/eat/food-detail/food-detail?id=${item.id}`,
				});
			}
		},
		computed: {
			...mapState({
				userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
				userInfoNickName: store => store.userInfo.userInfoNickName, // 网名
			})
		}


	};
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: $bg-grey-color;
	}

	.user-info-block {
		background: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 18rpx 0;
		height: 226rpx;

		.image-block {
			width: 132rpx;
			height: 132rpx;
			border-radius: 50%;

			image {
				border-radius: 50%;
				width: 100%;
				height: 100%;
			}
		}

		.nick-name {
			display: flex;
			justify-content: center;
			color: $grey1-color;
			font-size: 34rpx;
		}
	}

	.like-num-block {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 84rpx;
		background: #ffffff;
		font-size: 26rpx;
		color: $grey1-color;

		text {
			color: $grey2-color;
		}

		view {
			margin: 0 40rpx;
		}
	}

	.top-tab-bar {
		display: flex;
		justify-content: center;
		background: #ffffff;

		.tab-bar-content {
			display: flex;
			justify-content: space-between;
			width: 360rpx;

			.item {
				display: flex;
				align-items: center;
				height: 88rpx;
				position: relative;
				color: $grey1-color;
				font-size: 26rpx;

				.after {
					content: '';
					display: none;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 40rpx;
					height: 2px;
				}

				&.act {
					font-weight: 600;

					.after {
						display: block;
					}
				}
			}
		}
	}

	.eat-list {
		// background-color: #fafafa;
		padding: 40rpx 0 0 0;

		.content-wrap {
			overflow: hidden;
		}

		.item {
			float: left;
			// display: inline-block;
			margin-right: 18rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			background-color: #ffffff;
			position: relative;
			width: 342rpx;
			height: 526rpx;

			&:nth-child(2n) {
				margin-right: 0;
			}


			.image-wrap {
				border-radius: 20rpx;
				width: 342rpx;
				height: 320rpx;
				overflow: hidden;
				position: relative;

				.goods-image {
					width: 100%;
					height: 100%;
				}

				.status-block {
					position: absolute;
					top: 0;
					z-index: 10;
					width: 100%;
					height: 100%;
					background: rgba(255, 255, 255, 0.6);
					@include flex-center;

					.status-text {
						@include flex-center;
						// width: 180rpx;
						padding: 0 20rpx;
						height: 74rpx;
						background: rgba(0, 0, 0, 0.4);
						color: #ffffff;
						font-size: 30rpx;
					}
				}
			}

			.text-wrap {
				margin-top: 14rpx;
				height: 88rpx;
				padding-left: 20rpx;
				padding-right: 10rpx;
				overflow: hidden;

				.txt-description {
					text-align: left;
					font-size: 30rpx;
					font-weight: 600;
					color: $grey1-color;
					@include text-ellipsis-rows;
					// line-height: 1.5em;
				}
			}

			.good-num,
			.user-info-block {
				display: flex;
				align-items: center;
			}

			.user-info-block {
				height: auto;
				flex-direction: row;
			}

			.user-info-block image {
				display: inline-block;
				width: 52rpx;
				height: 52rpx;
				border-radius: 10000rpx;
			}

			.good-num text,
			.user-info-block text {
				display: inline-block;
				font-size: 24rpx;
				color: $grey2-color;
				text-indent: 0.5em;
			}

			.info-block {
				width: 100%;
				position: absolute;
				bottom: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
			}
		}
	}
</style>
