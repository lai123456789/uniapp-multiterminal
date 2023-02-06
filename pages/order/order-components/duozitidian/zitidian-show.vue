<!--
	展示在页面上的自提点 多点自提类型
-->
<template>
	<view class="zitidian-show-wrap">
		<view v-if="isNull" class="tips"><view class="text-msg">!自提点列表为空</view></view>

		<view class="zitidian-show" v-else>
			<!-- 
			+ zitidianList 长度为0 显示 自提点 列表 为空
			+ zitidianIsAllNotRange 为 true  显示 一个默认的 并且 显示不在范围
			+ 接下来才是 展示出 选中的这个
		-->

			<view class="left-seller-image">
				<view class="image-wrap">
					<img-bg-css :src="zitidianInfo.zitidianImage"></img-bg-css>
					<view v-if="!zitidianInfo.isRange" class="flex-center not-range" style="flex-direction: column;">
						<view class="text">超出配</view>
						<view class="text">送范围</view>
					</view>
				</view>
			</view>
			<view class="right-seller-info">
				<view class="seller-name">{{ zitidianInfo.zitidianName }}</view>
				<view class="seller-open-time" v-if="zitidianInfo.zitidianDist">
					距收货地: {{ zitidianInfo.zitidianDist }}
				</view>
				<view class="seller-open-time">营业时间: {{ zitidianInfo.zitidianTime }}</view>
				<view class="seller-address-box">
					<view class="seller-address">{{ zitidianInfo.zitidianAddressText }}</view>
				</view>
			</view>
			<view
				class="flex-center right-btn"
				v-if="!isHideMoreBtn"
				:style="{ background: configInfo.web_site_color }"
				@click="openListModalFn"
			>
				更多
			</view>
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';
export default {
	props: ['zitidianInfo', 'zitidianIsAllNotRange', 'page'],
	methods: {
		// 打开 自提点 列表 模态框
		openListModalFn() {
			this.$emit('openListModalFn');
		}
	},
	computed: {
		// 当前显示的自提点 是否 为空
		isNull() {
			return Object.keys(assertObject(this.zitidianInfo)).length ? false : true;
		},
		// 是否隐藏 更多 按钮
		isHideMoreBtn() {
			let enumObject = {
				'pages/order-state/dingdan-state': true
			};
			return enumObject[this.page];
		}
	}
};
</script>

<style lang="scss" scoped>
.zitidian-show-wrap {
	padding: 10rpx 0;
	overflow: hidden;

	.tips {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 22rpx;
		padding: 0 20rpx;
		width: 706rpx;
		height: 80rpx;
		border-radius: 20rpx;
		font-size: 34rpx;
		color: #f48080;
		background: #fde1e1;
	}

	.zitidian-show {
		display: flex;
		justify-content: space-between;
		position: relative;
		margin: 0 22rpx;
		width: 706rpx;
		height: 220rpx;
		background: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		// box-shadow: 0 0 10rpx #cccccc;

		.left-seller-image {
			position: relative;
			width: 210rpx;
			height: 210rpx;
			padding: 20rpx;
			.image-wrap {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
				overflow: hidden;
			}
			.not-range {
				position: absolute;
				z-index: 10;
				top: 20rpx;
				left: 20rpx;
				width: 170rpx;
				height: 170rpx;
				background: rgba(0, 0, 0, 0.3);
				color: #ffffff;
				font-size: 30rpx;
				font-weight: 600;
				border-radius: 10rpx;
				letter-spacing: 4rpx;
				overflow: hidden;
			}
		}

		.right-seller-info {
			width: 496rpx;
			padding: 20rpx 20rpx 20rpx 0;
			.seller-name {
				width: 440rpx;

				font-size: 30rpx;
				color: #414141;
				font-weight: 600;

				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}

			.seller-address-box {
				text-overflow: ellipsis; /*设置溢出显示类型为...*/
				-webkit-line-clamp: 2; /*设置显示的行数*/
				overflow: hidden; /*隐藏多于行*/
				display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
				-webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/

				width: 476rpx;
				font-size: 26rpx;
				color: #555555;
				.seller-address {
					line-height: 1.2;
				}
			}
			.seller-open-time {
				width: 476rpx;
				font-size: 26rpx;
				color: #555555;
				line-height: 1.8;
			}
		}

		.right-btn {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			padding: 0 20rpx;
			height: 50rpx;
			font-size: 26rpx;
			border-radius: 1000rpx;
			color: #ffffff;
		}
	}
}
</style>
