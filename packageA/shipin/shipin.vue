<template>
	<view class="page box-sizing">
		<null-block v-if="list.length < 1" min-height="100vh"></null-block>

		<view class="goods-block" @click="clickGoodsFn" v-if="list.length >= 1">
			<view class="goods-img-wrap"><image :src="currentItem.original_img" mode=""></image></view>
			<view class="descripttion">
				<view class="txt">{{ currentItem.goods_name }}</view>
				<view class="price">
					<view class="money">￥{{ currentItem.shop_price }}</view>
					<view class="car"><uni-icons type="cart-filled" size="20" color="#ea3a37"></uni-icons></view>
				</view>
			</view>
		</view>

		<block v-if="isLogin">
			<button class="right-btn share clear-btn-style" open-type="share" v-if="list.length > 0">
				<view class="btn-block">
					<image :src="calcImageSrc('/global-image/ship-share-icon.png')" mode=""></image>
				</view>
				<view class="text">转发</view>
			</button>
		</block>
		<block v-else>
			<button class="right-btn share clear-btn-style" @click="closeGlobalLoginFn(true)">
				<view class="btn-block">
					<image :src="calcImageSrc('/global-image/ship-share-icon.png')" mode=""></image>
				</view>
				<view class="text">转发</view>
			</button>
		</block>

		<view class="right-btn home" @click="toBackFn">
			<view class="btn-block"><image :src="calcImageSrc('/global-image/ship-home-icon.png')"></image></view>
			<view class="text">返回</view>
		</view>

		<loading-css :is-show="isShowLoading"></loading-css>


		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @close="closeGlobalLoginFn"></login-fn>



		<swiper
			:autoplay="false"
			:duration="160"
			:vertical="true"
			class="swiper-wrap"
			@animationfinish="animationfinishFn"
			v-if="list.length > 0"
		>
			<swiper-item class="swiper-item-box" v-for="(item, index) in list" :key="index">
				<view class="swiper-item">
					<view class="video">
						<video
							class="video-dom"
							:id="'video-id-' + index"
							:controls="false"
							loop
							:src="item.video"
						></video>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import { checkTypeFn, assertArray } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true,
			list: [],
			videoContextList: [],
			page: 1,
			isOver: false,
			currentIndex: 0,
			isLoadNextFlag: true,
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onLoad(options) {
		let that = this;
		that.getVideoListFn((dataList, ajaxList) => {
			if (ajaxList.length > 0) {
				setTimeout(() => {
					let videoContext = uni.createVideoContext(`video-id-0`);
					that.videoContextList.push(videoContext);
					videoContext.play();
				}, 100);
			}
		});
	},
	onShow(){
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
	},
	onShareAppMessage() {
		let that = this;
		let { goods_id, goods_name, original_img, shop_price, video } = that.list[that.currentIndex];

		console.log(goods_id, goods_name, original_img, 'goods_id,goods_name,original_img', '\n');

		return that.shareFn({
			path: '/packageB/goods-detail/goods-detail',
			query: {
				goods_id
			},
			options: {
				title: goods_name,
				imageUrl: original_img
			}
		});
	},
	methods: {
		// 上拉下拉 动画完毕执行
		animationfinishFn(e) {
			let that = this;
			let index = e.detail.current;

			console.log('动画执行完成 animationfinishFn 运行', index);

			if (that.currentIndex === index) {
				return false;
			}

			that.currentIndex = index;

			let last = that.videoContextList[that.videoContextList.length - 1];

			let videoContext = uni.createVideoContext(`video-id-${index}`);

			last.stop();
			last.seek(0);

			that.videoContextList.push(videoContext);

			videoContext.play();

			console.log(that.list.length, 'that.list.length', '\n', index, 'index', '\n');

			if (!that.isLoadNextFlag && that.list.length - 1 == index) {
				uni.showToast({
					title: '这是最后一个',
					icon: 'none'
				});
				return false;
			}

			if (that.list.length - 1 - index == 2 && that.isLoadNextFlag) {
				that.page++;
				that.getVideoListFn();
				return false;
			}
		},
		// 获取视频列表
		async getVideoListFn(fn) {
			let that = this;
			let result = await that.$request({
				url: '/api/Goods/video_goods',
				data: {
					page: that.page
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let list = assertArray(result.data.data).map(item => {
						item.video = that.addimgPathHostFn(item.video);
						return item;
					});
					if (list.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}

					that.list = that.list.concat(list);
					if (list.length == 6) {
						that.isLoadNextFlag = true;
					} else {
						that.isLoadNextFlag = false;
					}
					fn && fn(that.list, list);
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
		// 生成 视频 dom 元素 上下文
		createVideoDomListFn() {
			let that = this;
			if (that.list.length > 0) {
				/* 
					that.videoDomList = JSON.parse(JSON.stringify(that.list));

					that.videoDomList.forEach((item, index) => {
						item.videoContext = uni.createVideoContext(`video-id-${index}`);
					});
					 */

				if (that.page == 1 && that.currentIndex == 0) {
					console.log(that.videoDomList[0], 'that.videoDomList[0]', '\n');
					that.videoDomList[0].videoContext.play();
				}
			}
		},
		// 到商品详情页
		clickGoodsFn() {
			let that = this;
			let goodsId = that.currentItem.goods_id;
			that.navigateToFn({
				url: `/packageB/goods-detail/goods-detail?goods_id=${goodsId}`
			});
		}
	},
	computed: {
		// 当前在看的商品信息
		currentItem() {
			return this.list[this.currentIndex];
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	width: 100vw;
	height: 100vh;
	background: $bg-grey-color;
	overflow: hidden;
	.swiper-wrap,
	.swiper-item-box,
	.swiper-item,
	.video-dom,
	.video {
		width: 100vw;
		height: 100vh;
	}
}

@mixin size {
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
}

.goods-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	z-index: 125;
	left: 20rpx;
	bottom: 160rpx;
	padding: 14rpx 10rpx;
	width: 400rpx;
	height: 150rpx;
	background: #ffffff;
	border-radius: 10rpx;

	.goods-img-wrap {
		width: 130rpx;
		height: 130rpx;

		image {
			width: 130rpx;
			height: 130rpx;
		}
	}

	.descripttion {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10rpx;

		.txt {
			@include text-ellipsis-rows;
			font-size: 28rpx;
			color: #464646;
		}

		.price {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.money {
				font-size: 26rpx;
				color: #ea3a37;
			}
		}
	}
}

.right-btn {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	z-index: 25;
	right: 26rpx;
	bottom: 250rpx;
	width: 78rpx;
	height: 134rpx;

	.btn-block {
		@include flex-center;
		width: 78rpx;
		height: 78rpx;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 50%;

		image {
			width: 54rpx;
			height: 54rpx;
		}
	}

	.text {
		color: #ffffff;
		line-height: 2em;
		font-size: 26rpx;
	}

	&.share {
		bottom: 404rpx;
	}
}
</style>
