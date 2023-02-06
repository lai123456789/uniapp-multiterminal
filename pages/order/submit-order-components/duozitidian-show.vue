<!--
	展示 多自提点
-->
<template>
	<view class="zitidian-show-wrap" v-if="isShow">
		<view v-if="isNull" class="tips"><view class="text-msg">!自提点列表为空</view></view>

		<view class="zitidian-show" v-else>
			<!-- 
				+ zitidianList 长度为0 显示 自提点 列表 为空
				+ zitidianIsAllNotRange 为 true  显示 一个默认的 并且 显示不在范围
				+ 接下来才是 展示出 选中的这个
			-->
			<view class="left-seller-image">
				<view class="image-wrap">
					<img-bg-css :src="currentDuozitidianInfo.zitidianImage"></img-bg-css>
					<view
						v-if="!currentDuozitidianInfo.isRange"
						class="flex-center not-range"
						style="flex-direction: column;"
					>
						<view class="text">超出配</view>
						<view class="text">送范围</view>
					</view>
				</view>
			</view>
			<view class="right-seller-info">
				<view class="seller-name text-ellipsis">{{ currentDuozitidianInfo.zitidianName }}</view>
				<view class="seller-open-time text-ellipsis" v-if="currentDuozitidianInfo.zitidianDist">
					距收货地: {{ currentDuozitidianInfo.zitidianDist }}
				</view>
				<view class="seller-open-time text-ellipsis">营业时间: {{ currentDuozitidianInfo.zitidianTime }}</view>
				<view class="seller-address text-ellipsis-rows">
					取货地址: {{ currentDuozitidianInfo.zitidianAddressText }}
				</view>
			</view>
			<view
				class="right-btn flex-center border-radius"
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
	props: ['currentDuozitidianInfo', 'duozitidianIsAllNotRange', 'page', 'isShow'],
	methods: {
		// 打开 自提点 列表 模态框
		openListModalFn() {
			this.$emit('openListModalFn');
		}
	},
	computed: {
		// 当前显示的自提点 是否 为空
		isNull() {
			return Object.keys(assertObject(this.currentDuozitidianInfo)).length ? false : true;
		},
		// 是否隐藏 更多 按钮
		isHideMoreBtn() {
			let enumObject = {
				'pages/order-state/dingdan-state': true
			};
			return !!enumObject[this.page];
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
		padding: 20rpx 0;
		width: 706rpx;
		height: 228rpx;
		background: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		// box-shadow: 0 0 10rpx #cccccc;

		.left-seller-image {
			position: relative;
			padding: 0 20rpx;
			.image-wrap {
				width: 188rpx;
				height: 188rpx;
				
				border-radius: 10rpx;
				overflow: hidden;
			}
			.not-range {
				position: absolute;
				z-index: 10;
				top: 0;
				left: 20rpx;
				width: 188rpx;
				height: 188rpx;
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
			width: 478rpx;
			padding-right: 20rpx;
			.seller-name {
				width: 382rpx;
				height: 40rpx;
				font-size: 30rpx;
				color: #414141;
				font-weight: bold;
			}

			.seller-open-time {
				width: 458rpx;
				height: 40rpx;
				font-size: 26rpx;
				color: #555555;
			}
			.seller-address {
				width: 458rpx;
				height: 68rpx;
				font-size: 26rpx;
				color: #555555;
			}
		}

		.right-btn {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			width: 76rpx;
			height: 46rpx;
			font-size: 26rpx;
			color: #ffffff;
		}
	}
}
</style>
