<!-- 
	配送方式组件
		显示本组件条件
		系统是多门店状态下 && 用户结算的商品是只有自营
 -->
<template>
	<view class="pei-type-wrap">
		<view class="content-wrap">
			<view class="pei-type-list-wrap">
				<view
					class="pei-type-item"
					v-for="(item, index) in dispatchTypeList"
					:key="item.id"
					@click="setDispatchTypeFn(index)"
				>
					<view
						v-show="dispatchTypeActive == index"
						class="after"
						:style="{ background: configInfo.web_site_color }"
					></view>

					<view
						class="type-text"
						:style="{ color: dispatchTypeActive == index ? configInfo.web_site_color : '#374050' }"
					>
						{{ item.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 配送方式数据
		dispatchTypeList: {
			type: Array,
			default() {
				return [];
			}
		},
		// 当前选中的索引
		dispatchTypeActive: {
			type: Number,
			default: 0
		}
	},
	methods: {
		setDispatchTypeFn(index) {
			this.$emit('setDispatchTypeFn', index);
		}
	}
};
</script>

<style lang="scss" scoped>
.pei-type-wrap {
	padding: 10rpx 0 10rpx;
	overflow: hidden;
	.content-wrap {
		margin: 0 24rpx;
		padding: 0 16rpx;
		background: #ffffff;
		font-size: 0;
		border-radius: 20rpx;
		overflow: hidden;

		.pei-type-list-wrap {
			display: inline-flex;
			align-items: center;
			justify-content: space-around;
			width: 100%;
			height: 100rpx;
			.pei-type-item {
				display: inline-flex;
				align-items: center;
				position: relative;
				text-align: center;
				height: 70%;
				.after {
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 100%;
					height: 6rpx;
					border-radius: 1000rpx;
				}
				.type-text {
					width: 100%;
					color: $grey1-color;
					font-size: 26rpx;
					white-space: nowrap;
				}
			}
		}
	}
}
</style>
