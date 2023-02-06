<!--
	首页顶部轮播图
-->
<template>
	<view class="swiper-banner" v-if="homeSwiperList.length">
		<view class="content-wrap">
			<view class="bg-U-block">
				<view
					class="after"
					:style="{
						background: homeSwiperBgColor
					}"
				></view>
			</view>
			
			<swiper
				class="swiper-block"
				@change="swiperChangeFn"
				:circular="true"
				:autoplay="autoplay"
				:interval="3000"
				:duration="450"
			>
				<swiper-item v-for="(item, index) in homeSwiperList" :key="index" @click="swiperClickFn(item)">
					<image :src="item.image"></image>
				</swiper-item>
			</swiper>
			<view class="indicator-dots">
				<view
					v-for="(item, index) in homeSwiperList"
					:key="index"
					:class="[homeSwiperItemActive == index ? 'act' : '']"
				></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		autoplay: {
			type: Boolean,
			default: false
		},
		homeSwiperList: {
			type: Array,
			default: []
		},
		homeSwiperItemActive: {
			type: Number,
			default: 0
		},
		homeSwiperBgColor: {
			type: String,
			default: ''
		}
	},
	methods: {
		swiperChangeFn(e) {
			let { current } = e.detail;
			this.$emit('swiperChangeFn', { current });
		}
	},
};
</script>

<style scoped lang="scss">
.swiper-banner {
	position: relative;
	height: 145px;
	// margin-bottom: 28rpx;

	.content-wrap {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.bg-U-block {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.after {
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate3d(-50%, -94%, 0);
			width: 300vw;
			height: 300vw;
			border-radius: 10000px;
			transition: 0.1s;
		}
	}

	.swiper-block {
		width: 702rpx;
		height: 280rpx;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
		z-index: 10;
	}

	image {
		width: 702rpx;
		height: 280rpx;
		border-radius: 20rpx;
		position: relative;
		z-index: 10;
	}

	.indicator-dots {
		display: flex;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 25rpx;
		z-index: 10;

		view {
			transition: 0.2s;
			margin: 0 5rpx;
			border-radius: 10000rpx;
			width: 12rpx;
			height: 12rpx;
			background: #ffffff;
		}

		.act {
			width: 24rpx;
		}
	}
}
</style>
