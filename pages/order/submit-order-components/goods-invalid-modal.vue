<!--
	下单时提示有失效的商品模态框组件
		询问用户是 继续下单还是取消掉
-->
<template>
	<view class="invalid-modal-wrap flex-center" v-if="isShow">
		<view class="content-box">
			<view class="title-text">{{ title }}</view>

			<view class="invalid-msg">
				<view class="invalid-msg-text">以下商品因</view>
				<view class="invalid-msg-text" :style="{ color: configInfo.web_site_color }">{{ msg }}</view>
				<view class="invalid-msg-text">等原因已失效</view>
			</view>

			<view class="goods-list-wrap">
				<view class="goods-list">
					<view class="goods-item" v-for="(item, index) in goodsInvalidInfo.goodsList">
						<img-bg-css :src="item.goodsImage"></img-bg-css>
					</view>
				</view>
			</view>

			<view class="invalid-msg">失效商品{{ goodsInvalidInfo.goodsList.length }}件</view>
			<view class="btn-block">
				<!-- <view class="btn-commit flex-center border-radius">继续下单</view> -->
				<view
					class="btn-toback flex-center border-radius"
					:style="{ background: configInfo.web_site_color }"
					@click="toBackFn"
				>
					返回上一页
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 工具库 相关
import { assertArray,assertObject } from '@/tools/tools';

export default {
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		goodsInvalidInfo: {
			type: Object,
			default() {
				return {
					goodsList: [],
					title: ''
				};
			}
		}
	},
	computed: {
		title() {
			let { title } = this.goodsInvalidInfo;
			return title ? title : '商品失效提醒';
		},
		msg() {
			return assertObject(assertArray(this.goodsInvalidInfo.goodsList)[0]).msg;
		}
	}
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
			height: 76rpx;
			line-height: 76rpx;
			text-align: center;
			font-size: 26rpx;
			color: #474246;

			.invalid-msg-text {
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
