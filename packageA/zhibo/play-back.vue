<template>
	<view class="page box-sizing">
		<view class="btn-group" v-if="!isShowGoodsListFlag">
			<!-- 分享按钮 -->
			<button open-type="share" class="clear-btn-style share-btn">
				<uni-icons style="transform: scaleX(1);" type="undo-filled" color="#ffffff" size="24"></uni-icons>
			</button>
			<!-- 商品列表按钮 -->
			<view class="shoping-btn" @click="setGoodsListFlagFn(true)">
				<!-- <image style="transform: translate(1px, -1px);" src="/static/global-image/icon-shoping.png" mode=""></image> -->
				<image
					style="transform: translate(1px, -1px);"
					:src="calcImageSrc('/global-image/icon-shoping.png')"
					mode=""
				></image>
			</view>
		</view>

		<view v-if="isShowGoodsListFlag" class="goods-list-wrap-bg" @click="setGoodsListFlagFn(false)"></view>

		<view class="goods-list-wrap" v-if="isShowGoodsListFlag">
			<view class="title">直播商品</view>
			<view class="list-wrap" v-if="goodsListArr.length > 0">
				<view class="list">
					<view class="item" v-for="(item, index) in goodsListArr" :key="index">
						<view class="store-list__item">
							<view class="store-list__item__inner" @click="toGoodsDetailFn(item)">
								<view class="store-list__item__header">
									<image
										class="store-list__item__avatar"
										mode="aspectFill"
										:src="item.cover_img"
									></image>
									<view class="store-list__item__index">{{ index + 1 }}</view>
								</view>
								<view class="store-list__item__body">
									<view class="store-list__item__title">{{ item.name }}</view>
									<view class="store-list__item__price__container">
										<view class="store-list__item__price">￥ {{ item.price }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="noMore" v-else>暂无商品</view>
		</view>

		<video class="video" autoplay :src="src" controls @ended="endedFn"></video>
	</view>
</template>
<script>
export default {
	data() {
		return {
			room_id: '', //直播间id
			videoSrcArr: [], //视频回放数组
			act: 0, //当前播放的视频下标
			src: '', //最终的视频链接

			isShowGoodsListFlag: false, //是否显示商品列表

			goodsListArr: [], //直播间商品数组
			share_img: '', //分享出去的预览图
			liveName: '' //直播间名字
		};
	},
	onLoad(options) {
		let that = this;
		let { room_id } = options;

		that.room_id = room_id;

		const playBackObjStr = uni.getStorageSync('playBackObj');
		if (playBackObjStr) {
			//是从直播列表里跳转过来的带 着商品信息

			const playBackObj = JSON.parse(playBackObjStr);

			console.log(playBackObj, 'playBackObj', '\n');

			that.liveName = playBackObj.name;
			that.goodsListArr = playBackObj.goods;
			that.share_img = playBackObj.share_img;
			uni.setStorageSync('playBackObj', '');
		}

		if (room_id) {
			that.getPlayBackFn();
		} else {
			uni.showToast({
				title: '缺少参数room_id',
				icon: 'none'
			});
		}
	},
	onShareAppMessage() {
		let that = this;
		let shareObj = {};

		if (that.liveName) {
			shareObj.title = that.liveName;
		}

		if (that.share_img) {
			shareObj.imageUrl = that.share_img;
		}
		return {
			...shareObj,
			path: `/packageA/zhibo/play-back?room_id=${that.room_id}`
		};
	},
	methods: {
		// 跳转到商品详情函数
		toGoodsDetailFn(item) {
			let url = `/${item.url}`;
			this.navigateToFn({
				url
			});
		},
		// 播放完进行下一个
		endedFn() {
			let that = this;
			that.act = that.act + 1 > that.videoSrcArr.length ? 0 : that.act + 1;
			that.src = that.videoSrcArr[that.act];
		},
		// 获取回放视频 片段
		async getPlayBackFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Live/get_live_playback',
				data: {
					room_id: that.room_id
				}
			});

			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					console.log(result.data.data.live_replay, '', '\n');
					let temArr = result.data.data.live_replay.map(item => item.media_url);

					console.log(that.videoSrcArr, 'that.videoSrcArr', '\n');

					that.videoSrcArr = temArr;
					that.src = that.videoSrcArr[that.act];
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
		// 设置 是否显示 商品列表 状态
		setGoodsListFlagFn(flag) {
			this.isShowGoodsListFlag = flag;
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: $bg-grey-color;
	display: inline-block;
	width: 100%;
}

.video {
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10;
	width: 100vw;
	height: 100vh;
}

.btn-group {
	@mixin btn-style {
		position: fixed;
		z-index: 30;
		right: 34rpx;
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.4);
	}

	.share-btn {
		@include btn-style;
		@include flex-center;
		transform: scaleX(-1);
		bottom: 222rpx;
	}

	.shoping-btn {
		@include btn-style;
		bottom: 100rpx;
		@include flex-center;

		background: #8385f3;
		overflow: hidden;

		image {
			width: 60rpx;
			height: 60rpx;
		}
	}
}

.goods-list-wrap-bg {
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: 20;
	left: 0;
	top: 0;
}

.goods-list-wrap {
	position: fixed;
	left: 50%;
	top: 50%;
	z-index: 21;
	transform: translate3d(-50%, -20%, 0);
	width: 686rpx;
	height: 572rpx;
	background: rgba(0, 0, 0, 0.25);
	border-radius: 20rpx;

	.title {
		padding: 0 30rpx;
		color: #ffffff;
		font-size: 30rpx;
		line-height: 100rpx;
	}

	.list-wrap {
		padding: 0 20rpx;
		height: 472rpx;
		overflow-x: hidden;

		.list {
			width: 100%;
			min-height: 472rpx;

			.item {
				margin-bottom: 20rpx;
			}
		}
	}

	.noMore {
		line-height: 250rpx;
		text-align: center;
		font-size: 30rpx;
		color: #ffffff;
	}
}

.store-list__item {
	margin-bottom: 12px;
	background: #ffffff;
	border-radius: 8px;
}

.store-list__item:last-child {
	margin-bottom: 0;
}

.store-list__item__inner {
	display: flex;
	justify-content: flex-start;
	align-items: stretch;
	padding: 8px;
}

.store-list__item__header {
	position: relative;
	margin-right: 9px;
	font-size: 0;
}

.store-list__item__avatar {
	width: 64px;
	height: 64px;
	border-radius: 2px;
	box-sizing: border-box;
}

.store-list__item__index {
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	border-radius: 2px 0px 8px 0px;
	text-align: center;
	padding: 0 2px;
	min-width: 14px;
	line-height: 12px;
	font-size: 10px;
	color: #ffffff;
	text-align: center;
}

.store-list__item__page {
	height: initial;
}

.store-list__item__title {
	font-size: 15px;
	color: rgba(0, 0, 0, 0.7);
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
	line-height: 19.6px;
	margin-bottom: 5px;
}

.store-list__item__price {
	opacity: 0.9;
	font-size: 14px;
	color: #fa9d3b;
}

.store-list__item__price-before {
	color: #b2b2b2;
	text-decoration: line-through;
}
</style>
