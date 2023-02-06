<!--
	进入页面时 因为地址超出范围 而导致失效的模态框
		询问用户  继续下单 / 重新选地址
-->
<template>
	<view class="invalid-modal-wrap flex-center" v-if="isShow">
		<view class="content-box">
			<view class="title-text">商品失效提醒</view>

			<view class="invalid-msg">
				<view class="invalid-msg-text">
					以下商品因
				</view>
				<view class="invalid-msg-text" :style="{color: configInfo.web_site_color}">
					定位地区不配送
				</view>
				<view class="invalid-msg-text">
					等原因已失效
				</view>
			</view>
			<view class="goods-list-wrap">
				<view class="goods-list">
					<view class="goods-item" v-for="i in 6">
						<img-bg-css
							src="https://dev.sjwxsc.com/uploads/images/16039580525f9a752407514.jpg"
						></img-bg-css>
					</view>
				</view>
			</view>

			<view class="invalid-msg">失效1件(共10件)</view>
			<view class="btn-block">
				<view class="btn-commit flex-center border-radius">重选地址</view>
				<view class="btn-toback flex-center border-radius" :style="{ background: configInfo.web_site_color }">
					返回上一页
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShow:{
			type:Boolean,
			default:false
		}
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.invalid-modal-wrap {
	position: fixed;
	z-index: 450;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	.content-box {
		margin: 0 108rpx;
		padding: 22rpx 40rpx;
		background: #ffffff;
		border-radius: 20rpx;
		.title-text {
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			font-size: 26rpx;
			color: #474246;
			font-weight: bold;
		}
		.invalid-msg {
			width: 454rpx;
			height: 76rpx;
			white-space: nowrap;
			line-height: 76rpx;
			text-align: center;
			font-size: 26rpx;
			color: #474246;
			
			.invalid-msg-text{
				display: inline-block;
			}
		}
		.goods-list-wrap {
			overflow: hidden;
			height: 134rpx;
			.goods-list {
				width: 454rpx;
				overflow-y: hidden;
				font-size: 0;
				white-space: nowrap;
				height: 154rpx;
				.goods-item {
					display: inline-block;
					margin-left: 20rpx;
					width: 134rpx;
					height: 134rpx;
					border-radius: 10rpx;
					overflow: hidden;
					&:first-child {
						margin-left: 0;
					}
				}
			}
		}
		.btn-block {
			display: flex;
			justify-content: center;
			font-size: 22rpx;
			.btn-commit {
				margin: 0 14rpx;
				width: 190rpx;
				height: 70rpx;
				color: #474246;
				border: 1px solid #ebebeb;
			}
			.btn-toback {
				margin: 0 14rpx;
				width: 190rpx;
				height: 70rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
