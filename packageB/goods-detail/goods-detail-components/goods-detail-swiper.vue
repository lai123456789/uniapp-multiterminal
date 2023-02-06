<!-- 详情页的 头部轮播图组件 + 视频播放 -->
<template>
	<view class="goods-detail-swiper-wrap">
		<swiper
			class="swiper-tab-dom"
			@change="swiperChangeFn"
			:circular="true"
			:autoplay="goodsDetailPageSwiperAutoplay"
			:interval="3000"
			:duration="450"
		>
			<swiper-item class="swiper-item-tab-dom" v-for="(item, index) in swiperImgArr" :key="index">
				<view class="swiper-item-content-wrap">
					<image class="image-size" :src="item" @click="lookBigImgFn(swiperImgArr, index)"></image>

					<view class="video-group-wrap" v-if="index == 0">
						<view class="flex-center icon-video" @click="startPlayVideoFn" v-if="isHasVideo">
							<view class="iconfont icon-icon_play" style="color: #ffffff; font-size: 56rpx;"></view>
						</view>

						<view
							class="video-wrap"
							v-show="isHasVideo"
							:style="{ transform: `translateY(${videoPlayIng ? 0 : '-1000%'})` }"
						>
							<video
								:id="`goods-detail-video${index}`"
								class="video-dom"
								:src="calcGoodsVideoSrc"
								@ended="videoEndedFn"
								controls
								:enable-progress-gesture="false"
							></video>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>

		<view
			v-if="calcIsShowEverydayBuyBtn"
			class="flex-center border-radius everyday-buy-btn"
			@click="setEveryDayBuyStatus"
		>
			<view
				v-if="isEveryDayBuyGoods"
				class="iconfont icon-yishoucang"
				:style="{ color: '#ffd627', fontWeight: 500, fontSize: '28rpx' }"
			></view>
			<view
				v-else
				class="iconfont icon-jiarushoucang"
				:style="{ color: '#332e32', fontWeight: 600, fontSize: '38rpx' }"
			></view>
			<view class="text-content">{{ isEveryDayBuyGoods ? '已加常购' : '加入常购' }}</view>
		</view>

		<!-- <view class="dot-index" v-if="!videoPlayIng">{{ dotIndex }}/{{ swiperImgArr.length }}</view> -->
	</view>
</template>

<script>
export default {
	props: {
		// 商品的视频播放地址
		goodsVideoSrc: {
			type: String,
			default: ''
		},
		// 商品的轮播图片 数组
		swiperImgArr: {
			type: Array
		},
		/* 
			引用组件的页面类型
				秒杀 miaosha
				普通商品 default
				积分 jifen
				拼团 pintuan
				预售 yvshou
		 */
		pageType: {
			type: String
		},
		// 是否常购商品
		isEveryDayBuyGoods: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			goodsDetailPageSwiperAutoplay: true, // 轮播图是否自动轮播
			dotIndex: 1, //当前的轮播图索引
			videoPlayIng: false, // 视频是否在播放中
			videoContext: null
		};
	},
	mounted() {
		let that = this;
		that.videoContext = uni.createVideoContext('goods-detail-video0', that);
	},
	methods: {
		// 轮播图切换 改变下面索引数字
		swiperChangeFn(e) {
			let that = this;
			that.dotIndex = e.target.current + 1;
			if (that.videoPlayIng) {
				if (e.target.current == 0) {
					that.videoContext.play();
					console.log(e.target.current, '播放');
				} else {
					that.videoContext.pause();
					console.log(e.target.current, '暂停');
				}
			}
		},
		// 开始播放视频 函数
		startPlayVideoFn() {
			let that = this;
			that.videoPlayIng = true;
			that.goodsDetailPageSwiperAutoplay = false;
			that.videoContext.play();
		},
		// 视频播放结束
		videoEndedFn() {
			let that = this;
			that.videoPlayIng = false;
			that.goodsDetailPageSwiperAutoplay = true;
			that.videoContext.stop();
			that.videoContext.seek(0);
		},
		// 切换常购商品状态
		setEveryDayBuyStatus() {
			this.$emit('setEveryDayBuyStatus');
		}
	},
	computed: {
		// 是否显示加入常购按钮
		calcIsShowEverydayBuyBtn() {
			let that = this;
			if(!that.getConfigIsShow('yhcg')){
				return false;
			}
			let menuObject = {
				miaosha: true,
				['default']: true
			};
			if (menuObject[that.pageType]) {
				if (that.videoPlayIng && that.dotIndex == 1) {
					return false;
				}
				return true;
			}
			return false;
		},
		// 轮播图上是否显示视频
		isHasVideo() {
			let that = this;
			if (that.goodsVideoSrc) {
				return true;
			}
			return false;
		},
		calcGoodsVideoSrc() {
			let that = this;
			if (that.isHasVideo) {
				return that.addimgPathHostFn(that.goodsVideoSrc);
			}
			return '';
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-detail-swiper-wrap {
	display: block;
	position: relative;
	width: 750rpx;
	height: 750rpx;
	overflow: hidden;
	font-size: 0;

	.swiper-tab-dom {
		width: 750rpx;
		height: 750rpx;
		.swiper-item-tab-dom {
			width: 750rpx;
			height: 750rpx;
			.swiper-item-content-wrap {
				width: 750rpx;
				height: 750rpx;
				position: relative;
				font-size: 0;

				.icon-video {
					position: absolute;
					left: 32rpx;
					bottom: 32rpx;
					width: 98rpx;
					height: 98rpx;
					border: 1px solid #ffffff;
					background: rgba(0, 0, 0, 0.3);
					border-radius: 50%;
					overflow: hidden;
				}
				.video-wrap {
					position: absolute;
					top: 0;
					left: 0;
					z-index: 200;
					width: 750rpx;
					height: 750rpx;
					background: #000000;

					.video-dom {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	/* 
	.dot-index {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		z-index: 10;
		right: 1em;
		bottom: 20rpx;
		width: 88rpx;
		height: 48rpx;
		background: rgba(178, 178, 178, 0.78);
		color: #ffffff;
		font-size: 25rpx;
		border-radius: 10000rpx;
	}
	 */

	.everyday-buy-btn {
		position: absolute;
		z-index: 180;
		top: 650rpx;
		right: 22rpx;
		// width: 164rpx;
		padding: 0 0.6em;
		height: 62rpx;
		background: rgba(255, 255, 255, 0.8);
		font-size: 22rpx;
		color: #332e32;
		border: 1px solid #dcdcdc;
		.text-content {
			padding: 0 0.2em;
			font-weight: 600;
		}
	}
}
</style>
