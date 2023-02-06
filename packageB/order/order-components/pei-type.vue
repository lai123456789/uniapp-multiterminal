<!-- 
	配送方式组件
 -->
<template>
	<view class="pei-type-wrap">
		<view class="content-wrap">
			<view class="title-text">配送方式</view>
			<view class="pei-type-list-wrap">
				<view
					class="pei-type-item"
					v-for="(item, index) in peiTypeArr"
					:key="index"
					@click="setPeiTypeIndexFn(index)"
				>
					<uni-icons
						v-show="peiTypeActive == index"
						size="20"
						type="circle-filled"
						:color="configInfo.web_site_color"
					></uni-icons>
					<uni-icons v-show="peiTypeActive != index" size="20" type="circle" color="#c7c7c7"></uni-icons>
					<view class="type-text">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 配送方式数据
		peiTypeArr: {
			type: Array,
			default: [{}]
		},
		// 当前选中的索引
		peiTypeActive: {
			type: Number,
			default: 0
		},
	},
	methods: {
		setPeiTypeIndexFn(index) {
			this.$emit('setPeiTypeIndexFn', { index });
		}
	},
};
</script>

<style lang="scss" scoped>
.pei-type-wrap {
	padding: 24rpx 0 12rpx;
	overflow: hidden;
	.content-wrap {
		margin: 0 24rpx;
		padding: 0 16rpx;
		background: #ffffff;
		font-size: 0;
		border-radius: 20rpx;
		overflow: hidden;
		.title-text {
			display: inline-block;
			line-height: 88rpx;
			font-size: 36rpx;
			color: $grey1-color;
			font-weight: 600;
		}
		.pei-type-list-wrap {
			display: inline-block;
			.pei-type-item {
				display: inline-flex;
				align-items: center;
				width: 160rpx;
				.type-text {
					color: $grey1-color;
					font-size: 26rpx;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
