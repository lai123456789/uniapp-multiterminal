<!-- 商品详情页面 商品详情富文本 和 购买记录组件  -->
<template>
	<view class="detail-shopping-records-wrap">
		<view class="content-wrap">
			<view class="title-block">
				<view
					@click="changeTabFn(currentDetail)"
					:class="['title-btn', current == currentDetail ? 'act' : '']"
					:style="{ color: current == currentDetail ? configInfo.web_site_color : '#374050' }"
				>
					<view
						class="after"
						v-show="current == currentDetail"
						:style="{ background: configInfo.web_site_color }"
					></view>
					商品详情
				</view>
				<view
					v-if="calcIsShowPayHistory"
					@click="changeTabFn(currentShoppingRecores)"
					:class="[
						'title-btn',
						current == currentShoppingRecores ? 'act' : '',
					]"
					:style="{ color: current == currentShoppingRecores ? configInfo.web_site_color : '#374050' }"
				>
					<view
						class="after"
						v-show="current == currentShoppingRecores"
						:style="{ background: configInfo.web_site_color }"
					></view>
					购买记录
				</view>
			</view>

			<view class="detail-content" v-show="current == currentDetail">
				<rich-text :nodes="goodsDetailContent"></rich-text>
			</view>

			<view class="shopping-records-content" v-show="current == currentShoppingRecores">
				<view class="list">
					<view class="item" v-for="(item, index) in payHistoryList" :key="index">
						<view class="user-image"><image :src="item.headimgurl" mode=""></image></view>
						<view class="description">{{ item.num }}</view>
						<view class="time">{{ item.time }}</view>
					</view>
				</view>
				<view class="load-more" @click="loadMoreShoppingRecordsFn">查看更多购买记录</view>
			</view>
		</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';
const currentDetail = 'currentDetail',
	currentShoppingRecores = 'currentShoppingRecores';

export default {
	props: {
		// 商品详情的富文本字符串
		goodsDetailContent: {
			type: String,
			default: ''
		},
		// 购买记录数据
		payHistoryList: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			currentDetail,
			currentShoppingRecores,
			current: currentDetail
		};
	},
	methods: {
		// 切换选项卡  设置 详情 和 购买记录  显示或隐藏
		changeTabFn(flag) {
			this.current = flag;
		},
		// 加载更多购买记录
		loadMoreShoppingRecordsFn() {
			this.$emit('loadMoreShoppingRecordsFn');
		}
	},
	computed: {
		// 是否显示购买记录
		calcIsShowPayHistory() {
			return assertObject(this.configInfo).goods_pay_history - 0;
		}
	}
};
</script>

<style lang="scss" scoped>
.detail-shopping-records-wrap {
	width: 750rpx;
	overflow: hidden;
	background: $bg-grey-color;
	.content-wrap {
		margin: 10rpx 0;
		background: #ffffff;
	}
}
.title-block {
	display: flex;
	height: 88rpx;
	.title-btn {
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 88rpx;
		font-size: 26rpx;
		font-weight: 600;
		color: $grey1-color;

		&.act {
			.after {
				content: '';
				display: block;
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 40rpx;
				height: 4rpx;
				border-radius: 10000rpx;
				transform: translateX(-50%);
			}
		}
		
	}
}
.shopping-records-content {
	.item {
		border-bottom: 1px solid $bg-grey-color;
		height: 86rpx;
		display: flex;
		align-items: center;

		.user-image {
			font-size: 0;

			image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		}

		.description {
			text-indent: 0.5em;
			font-size: 26rpx;
			color: $grey1-color;

		}

		.time {
			text-indent: 1.5em;
			font-size: 20rpx;
			color: $grey2-color;
		}
	}

	.load-more {
		height: 88rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: $grey2-color;
	}
}
</style>
