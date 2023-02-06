<!--
	菜谱作品 组件
-->
<template>
	<view class="menu-works-wrap border-radius20" @click="menuWorksClickFn">
		<view class="image-wrap"><image class="goods-image" :src="menuWorksImage"></image></view>
		<view class="text-wrap">
			<view class="txt-description text-ellipsis-rows">{{ menuWorksTitle }}</view>
		</view>
		<view class="info-block">
			<view class="user-info-block">
				<image class="border-radius" :src="menuWorksUserAvatar"></image>
				<text>{{ menuWorksUserName }}</text>
			</view>
			<view class="good-num">
				<uni-icons :color="menuWorksUserIsZan ? '#dc3c3a' : '#d4d7da'" type="heart-filled"></uni-icons>
				<text>{{ menuWorksZanNum }}</text>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		ind:{
			type: [String,Number]
		},
		// 图片
		menuWorksImage: {
			type: String
		},
		// 标题
		menuWorksTitle: {
			type: String
		},
		// 用户头像
		menuWorksUserAvatar: {
			type: String
		},
		// 用户名字
		menuWorksUserName: {
			type: String
		},
		// 是否点赞菜谱作品
		menuWorksUserIsZan: {
			type: Boolean
		},
		// 点赞数
		menuWorksZanNum: {
			type: [String,Number]
		}
	},
	data() {
		return {};
	},
	methods: {
		menuWorksClickFn(){
			this.$emit('menuWorksClickFn',this.ind);
		}
	}
};
</script>

<style lang="scss" scoped>
.menu-works-wrap {
	overflow: hidden;
	background-color: #ffffff;
	position: relative;
	width: 342rpx;
	height: 516rpx;

	.image-wrap {
		border-radius: 20rpx;
		width: 342rpx;
		height: 320rpx;
		overflow: hidden;

		.goods-image {
			width: 100%;
			height: 100%;
		}
	}

	.text-wrap {
		margin-top: 14rpx;
		height: 88rpx;
		padding-left: 20rpx;
		padding-right: 10rpx;

		.txt-description {
			text-align: left;
			font-size: 30rpx;
			font-weight: 600;
			color: $grey1-color;
			line-height: 1.5em;
		}
	}

	.good-num,
	.user-info-block {
		display: flex;
		align-items: center;
	}

	.user-info-block image {
		display: inline-block;
		width: 52rpx;
		height: 52rpx;
	}

	.good-num text,
	.user-info-block text {
		display: inline-block;
		font-size: 24rpx;
		color: $grey2-color;
		text-indent: 0.5em;
	}

	.info-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		position: absolute;
		bottom: 20rpx;
		width: 100%;
	}
}
</style>
