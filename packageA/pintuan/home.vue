<template>
	<view>
		<loading-css :is-show="isShowLoading"></loading-css>
		<view class="pictures">
			<image
				v-if="group_list_top_image"
				style="width: 750rpx"
				mode="widthFix"
				:src="group_list_top_image"
			></image>
			<view class="layout">
				<view
					class="square"
					v-for="(item, index) in goodsList"
					:key="index"
					@click="navigateToFn({ url: `/packageB/goods-detail/pintuan-detail?id=${item.goods_id}` })"
				>
					<view class="topsquare">
						<view class="background"><image :src="item.original_img"></image></view>
						<view class="label" :style="{ background: configInfo.web_site_color }">热卖</view>
						<view class="tuan" v-if="item.sales_sum">{{ item.sales_sum }}人已团</view>
						<view
							class="labelground"
							:style="{
								background: calcConfigWebSiteColor
							}"
						>
							<text class="flaotleft">官方团</text>
							<text class="flaotright">{{ item.pin_time | filterHandleTime }}</text>
						</view>
					</view>
					<view class="squares">
						<view class="squarebtm">
							<text class="btmground">{{ item.pin_count }}人团</text>
							{{ item.goods_name }}
						</view>
						<view class="stylesize">{{ item.goods_remark }}</view>
						<view class="end">
							<view>
								<text class="money">￥</text>
								<text class="amount">{{ item.pinprice }}</text>
							</view>
							<view>
								<text
									:style="{ background: configInfo.web_site_color }"
									class="flex-center push-button"
								>
									去开团
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<null-block
			v-if="goodsList.length < 1"
			is-show-to-page-btn
			to-page-text="逛逛首页"
			:to-page-url="{ isTab: true, url: '/pages/index/index' }"
			min-height="100vh"
		></null-block>

		<view class="load-more-dom">
			<uni-load-more v-if="goodsList.length >= 6" :status="loadMoreStatus"></uni-load-more>
		</view>

		<view class="bottom-tab-bar">
			<view class="bar-btn act">
				<!-- <image :src="calcImageSrc('/my/icon-home-o.png')" mode=""></image> -->
				<image :src="getBottomImg('ghs', 'xi')" mode=""></image>
				<text :style="{ color: configInfo.web_site_color }">拼团首页</text>
			</view>
			<navigator open-type="redirect" url="./pintuan" class="bar-btn" hover-class="none">
				<!-- <image :src="calcImageSrc('/my/icon-p.png')" mode=""></image> -->
				<image :src="getBottomImg('mys', 'mi')" mode=""></image>
				<text>我的拼团</text>
			</navigator>
		</view>
		<view style="height: 100rpx;"></view>

		<float-icon
			:scroll-is-stop="mixinScrollIsStop"
			icon-class="icon-fangzi"
			title-text="首页"
			@click.native="navigateToFn({ isTab: true, url: '/pages/index/index' })"
		></float-icon>
	</view>
</template>

<script>
import { assertArray, assertObject, assertString, timeStamp2timeText } from '@/tools/tools';
export default {
	data() {
		return {
			group_list_top_image: '', // 顶部banner海报图
			isShowLoading: true, // 开屏动画
			loadMoreStatus: 'more', // 底部状态
			page: 1, // 分页索引
			goodsList: [] // 拼团商品数据
		};
	},
	onLoad() {
		this.getGoodsFn();
	},
	methods: {
		// 获取商品数据
		async getGoodsFn(fn) {
			let that = this;
			let result = await that.$request({
				url: '/api/ordergroup/group_indx',
				data: {
					page: that.page
				}
			});
			console.log('拼团首页商品数据', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObject = assertObject(result.data.data);

					that.group_list_top_image = resultObject.group_list_top_image;

					let goodsList = assertArray(resultObject.list);

					fn && fn(goodsList);
					if (goodsList.length) {
						that.goodsList = that.goodsList.concat(goodsList);
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

			that.isShowLoading = false;
		},
		// 获取底部图片
		getBottomImg(type, isAct) {
			for (let i = 0; i < this.configInfo.dodecorate.length; i++) {
				if (this.configInfo.dodecorate[i].field == 'ggs') {
					return this.addimgPathHostFn(this.configInfo.dodecorate[i].data[type][isAct]);
				}
			}
		}
	},
	computed: {
		calcConfigWebSiteColor() {
			let color = assertString(assertObject(this.configInfo).web_site_color);
			let configWebSiteColor = this.hexToRgba(color, 0.7);
			return `linear-gradient(to right, ${this.configInfo.web_site_color}, ${configWebSiteColor})`;
		}
	},
	filters: {
		// 过滤器 处理时间字符串
		filterHandleTime(arg) {
			let timeStr = assertString(arg);

			let timeArr = timeStr.split(' ~ ').map(i => i.replace(/\-/g, '/'));

			let newDate = new Date(); // 当前时间

			// 未开始
			if (newDate.getTime() < new Date(timeArr[0]).getTime()) {
				return '活动未开始';

				// 已结束
			} else if (newDate.getTime() > new Date(timeArr[1]).getTime()) {
				return '活动已结束';
			} else {
				// 活动时间内
				let s = new Date(timeArr[1]).getTime() - newDate.getTime();
				return `距结束仅剩
				${timeStamp2timeText(s)}`;
			}
		}
	},
	// 下拉刷新触发的函数
	onPullDownRefresh() {
		let that = this;
		that.page = 1;
		that.getGoodsFn(() => {
			that.goodsList = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},

	// 触底事件
	onReachBottom() {
		let that = this;
		that.loadMoreStatus = 'loading';
		that.page++;
		that.getGoodsFn(goodsList => {
			if (goodsList.length < 1) {
				that.loadMoreStatus = 'noMore';
			} else {
				that.loadMoreStatus = 'more';
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.pictures {
	width: 750rpx;
	background: $bg-grey-color;

	.layout {
		width: 750rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		.square {
			width: 359rpx;
			height: 560rpx;
			margin: 8rpx;
			border-radius: 18rpx;
			background-color: #ffffff;
			.topsquare {
				width: 100%;
				position: relative;

				.background {
					width: 100%;
					height: 357rpx;
					image {
						width: 100%;
						height: 355rpx;
						border-radius: 18rpx;
					}
				}

				.label {
					position: absolute;
					left: 0rpx;
					top: 20rpx;
					padding: 0 14rpx;
					height: 40rpx;
					line-height: 40rpx;
					font-size: 25rpx;
					border-bottom-right-radius: 2em;
					border-top-right-radius: 2em;
					color: #ffffff;
					background-color: #ff4444;
				}

				.tuan {
					position: absolute;
					left: 10rpx;
					top: 255rpx;
					padding: 0 0.4em;
					height: 36rpx;
					font-size: 25rpx;
					background: rgba(0, 0, 0, 0.6);
					color: #ffffff;
					border-radius: 9rpx;
				}
				.labelground {
					display: flex;
					justify-content: space-between;
					align-items: center;
					position: absolute;
					left: 0rpx;
					top: 297rpx;
					padding: 0 10rpx;
					width: 100%;
					height: 59rpx;
					background: linear-gradient(to right, rgba(242, 71, 63, 1), rgba(255, 97, 65, 0.5));
					.flaotleft {
						display: inline-block;
						font-size: 30rpx;
						color: #f7fffc;
					}
					.flaotright {
						display: inline-block;
						/* width: 150rpx;
						height: 59rpx; */
						font-size: 20rpx;
						color: #ffffff;
					}
				}
			}

			.squares {
				margin-top: 10rpx;
				width: 100%;

				.squarebtm {
					width: 100%;
					height: 83rpx;
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					padding: 10rpx;
					.btmground {
						display: inline-block;
						padding: 0 0.4em;
						vertical-align: text-bottom;
						height: 34rpx;
						line-height: 34rpx;
						font-size: 22rpx;
						color: #ff5858;
						margin-right: 12rpx;
						border-radius: 10rpx;
						background-color: #ffdfdf;
					}
				}

				.stylesize {
					width: 100%;
					height: 44rpx;
					line-height: 44rpx;
					color: #a7a7a7;
					font-size: 24rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					padding: 10rpx;
				}

				.end {
					width: 100%;
					height: 60rpx;
					line-height: 50rpx;
					padding: 10rpx;
					display: flex;
					justify-content: space-between;
					/* background-color: #2C405A; */
					.money {
						font-size: 20rpx;
						font-weight: 600;
						color: #ff3737;
					}
					.amount {
						font-size: 35rpx;
						font-weight: 600;
						color: #ff3737;
					}
					.seckill {
						color: #a7a7a7;
						font-size: 20rpx;
						text-decoration: line-through;
					}
					.push-button {
						margin-right: 15rpx;
						width: 100rpx;
						height: 50rpx;
						line-height: 40rpx;
						font-size: 26rpx;
						padding: 8rpx;
						color: #fff9f9;
						background-color: #fe4543;
						border-radius: 1000px;
					}
				}
			}
		}
	}
}

.load-more-dom {
	background: $bg-grey-color;
}
.bottom-tab-bar {
	height: 100rpx;
	background: #ffffff;
	display: flex;
	z-index: 100;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	width: 100%;

	image {
		width: 46rpx;
		height: 39rpx;
	}

	.bar-btn {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;

		text {
			text-indent: 0.5em;
		}

		color: $grey2-color;

		&.act {
		}
	}
}
</style>
