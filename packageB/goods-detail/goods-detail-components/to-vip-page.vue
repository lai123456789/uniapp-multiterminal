<!-- 商品详情里使用到的组件 跳转到开通vip页面 -->
<template>
	<view class="open-vipPage-tips-wrap content-wrap" v-if="toVipPageStyleIsOpen">
		<view class="open-vipPage-tips" @click="openVipPageFn" :style="{ background: toVipPageStyleBgColor }">
			<view class="left-title-content-block">
				<view class="icon-block"><image class="image-dom" :src="toVipPageStyleIconImg" mode=""></image></view>
				<view class="title-content" :style="{ color: toVipPageLeftTextColor }">{{ toVipPageLeftText }}</view>
			</view>
			<view class="right-icon-block">
				<view class="text" :style="{ color: toVipPageRightTextColor }">{{ toVipPageRightText }}</view>
				<view class="icon-more">
					<uni-icons size="16" :color="toVipPageRightTextColor" type="arrowright"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: [
		'toVipPageStyleIsOpen',
		'toVipPageStyleIconImg',
		'toVipPageStyleBgColor',
		'toVipPageLeftText',
		'toVipPageLeftTextColor',
		'toVipPageRightText',
		'toVipPageRightTextColor'
	],
	methods: {
		openVipPageFn() {
			let that = this;
			if (that.isLogin) {
				that.navigateToFn({ url: `/packageA/kaitonghuiyuan/index` });
				return false;
			}
			that.closeGlobalLoginFn(true);
		}
	}
};
</script>

<style lang="scss" scoped>
.open-vipPage-tips-wrap {
	padding-top: 12rpx;
	padding-bottom: 12rpx;
	.open-vipPage-tips {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		padding: 0 18rpx;
		height: 74rpx;
		background: #e4c38e;
		border-radius: 14rpx;
		.left-title-content-block {
			flex: 1;
			display: flex;
			align-items: center;
			.icon-block {
				width: 32rpx;
				height: 25rpx;
				font-size: 0;
				.image-dom {
					width: 100%;
					height: 100%;
				}
			}
			.title-content {
				text-indent: 1em;
				font-size: 24rpx;
				color: #714a1f;
				
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
		.right-icon-block {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #714a1f;
			.text{
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}
}
</style>
