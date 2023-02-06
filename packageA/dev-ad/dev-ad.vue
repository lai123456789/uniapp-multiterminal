<!-- 
	北京世间万象网络科技有限公司 介绍页面
 -->
<template>
	<view class="dev-ad-page-root">
		<image class="image-dom" :src="calcImageSrc('/dev-da/dev-ad-1.png')" mode="widthFix"></image>
		<view class="image-wrap">
			<image class="image-dom" :src="calcImageSrc('/dev-da/dev-ad-2.png')" mode="widthFix"></image>
			<view class="top-tel-btn-box" @click="telFn(tel)">
				<view class="flex-center border-radius top-tel-btn">电话咨询</view>
			</view>
		</view>
		<view class="image-wrap">
			<image class="image-dom" :src="calcImageSrc('/dev-da/dev-ad-3.png')" mode="widthFix"></image>
			<view class="msg-show-wrap">
				<swiper :interval="1800" :duration="600" circular autoplay vertical>
					<swiper-item>
						<view class="msg-item">
							<view class="user-name">赵**</view>
							<view class="user-tel">159*****7156</view>
							<view class="time">17分钟前</view>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="msg-item">
							<view class="user-name">刘**</view>
							<view class="user-tel">176*****2975</view>
							<view class="time">30分钟前</view>
						</view>
					</swiper-item>

					<swiper-item>
						<view class="msg-item">
							<view class="user-name">王**</view>
							<view class="user-tel">139*****3062</view>
							<view class="time">50分钟前</view>
						</view>
					</swiper-item>

					<swiper-item>
						<view class="msg-item">
							<view class="user-name">李**</view>
							<view class="user-tel">183*****4818</view>
							<view class="time">43分钟前</view>
						</view>
					</swiper-item>

					<swiper-item>
						<view class="msg-item">
							<view class="user-name">张**</view>
							<view class="user-tel">186*****0624</view>
							<view class="time">26分钟前</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<image class="image-dom" :src="calcImageSrc('/dev-da/dev-ad-4.png')" mode="widthFix"></image>
		<view class="image-wrap">
			<image class="image-dom" :src="calcImageSrc('/dev-da/dev-ad-5.png')" mode="widthFix"></image>
			<view class="bottom-swiper-wrap">
				<view class="swiper-box">
					<swiper :interval="1800" :duration="600" circular autoplay>
						<swiper-item>
							<image class="swier-item-img" :src="calcImageSrc('/dev-da/dev-ad-swiper-1.png')"></image>
						</swiper-item>
						<swiper-item>
							<image class="swier-item-img" :src="calcImageSrc('/dev-da/dev-ad-swiper-2.png')"></image>
						</swiper-item>

						<swiper-item>
							<image class="swier-item-img" :src="calcImageSrc('/dev-da/dev-ad-swiper-3.png')"></image>
						</swiper-item>
					</swiper>
				</view>

				<view class="flex-center tel-btn" @click="telFn(tel)">拨打电话咨询</view>
			</view>
		</view>

		<view class="fixed-right-bottom-btn" @click="setWeixinFlagFn(true)">
			<image class="zixun-btn-tip" :src="calcImageSrc('/dev-da/flex-btn-msg.png')"></image>
			<image class="zixun-btn-bg" :src="calcImageSrc('/dev-da/flex-btn-bg.png')"></image>
			<view class="zixun-btn-text">咨询</view>
		</view>

		<view class="flex-center weixin-modal" v-if="weixinModalFlag">
			<view class="weixin-modal-box">
				<view class="title-block">
					<view class="title-text">联系微信</view>
					<view class="close-btn" @click="setWeixinFlagFn(false)"></view>
				</view>
				<view class="weixin-image">
					<image class="image-size" :src="calcImageSrc('/dev-da/weixin-img.png')" mode="widthFix"></image>
				</view>
				<view class="flex-center copy-btn" @click="copyFn(weixinNum)">复制微信号</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			weixinModalFlag: false
		};
	},
	methods: {
		setWeixinFlagFn(flag) {
			this.weixinModalFlag = flag;
		}
	},
	computed: {
		tel() {
			return this.configInfo.corporation_tel;
		},
		weixinNum() {
			return this.configInfo.corporation_wechat;
		}
	}
};
</script>

<style lang="scss" scoped>
@keyframes ani-btn {
	0% {
		transform: scale(1);
	}

	14% {
		transform: scale(0.95);
	}

	42% {
		transform: scale(1.05);
	}

	66% {
		transform: scale(1);
	}

	100% {
		transform: scale(1);
	}
}

@keyframes ani-zixun-tip {
	0% {
		transform: rotate(0) scale(1);
	}
	4% {
		transform: rotate(20deg) scale(1.2);
	}
	8% {
		transform: rotate(0) scale(1);
	}
	13% {
		transform: rotate(20deg) scale(1.2);
	}
	17% {
		transform: rotate(0) scale(1);
	}
	33% {
		transform: rotate(0) scale(1);
	}
	38% {
		transform: rotate(20deg) scale(1.2);
	}
	42% {
		transform: rotate(0) scale(1);
	}
	46% {
		transform: rotate(20deg) scale(1.2);
	}
	50% {
		transform: rotate(0) scale(1);
	}
	100% {
		transform: rotate(0) scale(1);
	}
}

.dev-ad-page-root {
	font-size: 0;

	.image-wrap {
		position: relative;
	}

	.image-dom {
		width: 750rpx;
	}

	.msg-show-wrap {
		position: absolute;
		z-index: 5;
		left: 174rpx;
		top: 56rpx;

		@mixin msgSize {
			width: 462rpx;
			height: 46rpx;
		}

		@include msgSize;

		swiper,
		swiper-item {
			@include msgSize;
		}

		.msg-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			@include msgSize;
			font-size: 26rpx;
			color: #fa733b;
		}
	}

	.top-tel-btn-box {
		position: absolute;
		z-index: 5;
		left: 0;
		bottom: 0;
		padding: 0 30rpx;
		width: 100%;
		height: 88rpx;

		.top-tel-btn {
			width: 100%;
			height: 100%;
			color: #ffffff;
			font-weight: 600;
			font-size: 48rpx;
			background-image: linear-gradient(90deg, #ff6731, #ff2022);
			animation: ani-btn 3s infinite;
		}
	}

	.bottom-swiper-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		z-index: 5;
		top: 0;
		left: 0;
		width: 100%;
		height: 390rpx;

		.swiper-box {
			@mixin swiperImgSize {
				width: 596rpx;
				height: 320rpx;
			}

			@include swiperImgSize;

			.swier-item-img {
				@include swiperImgSize;
			}
		}

		.tel-btn {
			width: 596rpx;
			height: 60rpx;
			background: #f8825e;
			color: #ffffff;
			font-size: 38rpx;
		}
	}

	.weixin-modal {
		position: fixed;
		z-index: 20;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);

		.weixin-modal-box {
			width: 80%;
			background: #ffffff;
			border-radius: 20rpx;

			.title-block {
				position: relative;

				.title-text {
					display: flex;
					align-items: center;
					padding: 0 22rpx;
					height: 80rpx;
					font-size: 28rpx;
					color: #888888;
				}

				.close-btn {
					position: absolute;
					right: 20rpx;
					top: 20rpx;
					width: 40rpx;
					height: 40rpx;

					&::before,
					&::after {
						content: '';
						display: inline-block;
						position: absolute;
						left: 50%;
						top: 50%;
						width: 100%;
						height: 6rpx;
						background: #888888;
						border-radius: 1000px;
					}

					&::before {
						transform: translateX(-50%) translateY(-50%) rotate(45deg);
					}

					&::after {
						transform: translateX(-50%) translateY(-50%) rotate(-45deg);
					}
				}
			}

			.weixin-image {
				border-top: 1px solid #eeeeee;
				border-bottom: 1px solid #eeeeee;
				padding: 24rpx 50rpx;
			}

			.copy-btn {
				color: #333333;
				line-height: 80rpx;
				font-size: 30rpx;
			}
		}
	}

	.fixed-right-bottom-btn {
		position: fixed;
		right: 40rpx;
		bottom: 350rpx;
		z-index: 10;

		@mixin zixunBgSize {
			width: 108rpx;
			height: 105rpx;
		}

		@include zixunBgSize;

		.zixun-btn-bg {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			@include zixunBgSize;
		}

		.zixun-btn-tip {
			position: absolute;
			z-index: 2;
			top: 8rpx;
			left: 8rpx;
			width: 58rpx;
			height: 58rpx;
			animation: ani-zixun-tip 4s linear infinite;
		}

		.zixun-btn-text {
			position: absolute;
			z-index: 3;
			left: 50%;
			bottom: 6rpx;
			transform: translateX(-40%);
			font-weight: 600;
			color: #ffffff;
			font-size: 24rpx;
		}
	}
}
</style>
