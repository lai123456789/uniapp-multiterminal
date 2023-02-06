<!--
	自提点列表的模态框组件  放的是 自提列表
-->
<template>
	<view class="duoziti-modal-wrap" v-if="isShow">
		<view class="top-block" @click="closeFn"></view>
		<view class="bottom-list-block">
			<view class="flex-center title-bar">
				<view class="title-text">请选择自提点</view>
				<view class="close-btn" @click="closeFn">
					<view
						class="iconfont icon-jia"
						style=" display: inline-block; transform: rotate(45deg); color: #151515; "
					></view>
				</view>
			</view>

			<view class="list-block">
				<view class="zitidian-list-item-wrap" v-for="(item, index) in zitidianList" :key="index">
					<zitidian-list-item
						:zitidian-info="item"
						:list-index="index"
						@selectZitiFn="selectZitiFn"
					></zitidian-list-item>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import zitidianListItem from '@/pages/order/order-components/duozitidian/zitidian-list-item.vue';

export default {
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		zitidianList: {
			type: Array,
			default: []
		}
	},
	components: { zitidianListItem },
	methods: {
		// 关闭模态框
		closeFn() {
			this.$emit('closeFn');
		},
		selectZitiFn(index) {
			this.$emit('selectZitiFn', index);
		}
	},
};
</script>

<style lang="scss" scoped>
.duoziti-modal-wrap {
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 400;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	.top-block {
		flex: 1;
		width: 100%;
	}
	.bottom-list-block {
		width: 100%;
		height: 910rpx;
		background: #ffffff;

		.title-bar {
			position: relative;
			height: 96rpx;
			border-bottom: 1px solid #f6f6f6;
			.title-text {
				font-size: 30rpx;
				color: #151515;
				font-weight: 600;
			}
			.close-btn {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 24rpx;
			}
		}

		.list-block {
			height: 814rpx;
			overflow-x: hidden;
			padding: 10rpx 0;
			.zitidian-list-item-wrap {
				padding: 10rpx 0;
			}
		}
	}
}
</style>
