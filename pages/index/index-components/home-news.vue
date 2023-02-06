<!--
	首页的 系统消息 轮播 组件 
-->
<template>
	<!-- 新闻公告栏↓↓ -->
	<view class="news-block" v-if="homeMsgTextList.length > 0">
		<image class="image-dom" :class="[page=='gongyingshang-seller'?'gongyingshang-seller':'']" :src="homeMsgTextOptions.image"></image>
		<view class="content-wrap" :class="[page=='gongyingshang-seller'?'gongyingshang-seller':'']">
			<!-- :autoplay="true" -->

			<swiper
				:vertical="true"
				:touchable="!true"
				:circular="true"
				:autoplay="autoplay"
				:interval="4000"
				:duration="450"
				:style="{ background: homeMsgTextOptions.background_color }"
			>
				<swiper-item v-for="(item, index) in homeMsgTextList" :key="index" @touchmove.stop="catchTouchMove">
					<view class="text" :style="{ color: homeMsgTextOptions.font_color }">{{ item.content }}</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 样式设置
		homeMsgTextOptions: {
			type: Object,
			default: {}
		},
		// 系统消息内容
		homeMsgTextList: {
			type: Array,
			default: []
		},
		autoplay: {
			type: Boolean,
			default: false
		},
		/*
			引用组件的页面 
				gongyingshang-seller  供应商门店页面
		*/
		page:{
			type:String,
			default:'default',
		}
	},
};
</script>

<style scoped lang="scss">
.news-block {
	position: relative;
	padding: 10rpx 0;
	.content-wrap.gongyingshang-seller{
		padding: 0;
	}
	.image-dom {
		position: absolute;
		top: 50%;
		left: 42rpx;
		transform: translateY(-50%);
		width: 36rpx;
		height: 32rpx;
		&.gongyingshang-seller{
			left: 32rpx;
		}
	}

	swiper {
		border-radius: 20rpx;
		// height: 68rpx;
		height: 60rpx;
		background-image: linear-gradient(90deg, #fff1f5, #fff5ec);
		// font-size: 22rpx;
		font-size: 24rpx;
		.text {
			width: 95%;
			padding-left: 75rpx;
			line-height: 60rpx;
			color: $grey1-color;
			letter-spacing: 0.09em;
			font-weight: 600;
			@include text-ellipsis;
		}
	}
}
</style>
