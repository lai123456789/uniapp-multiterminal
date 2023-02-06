<!-- 
	展示一个地址组件
-->
<template>
	<view :class="['bottom-location-item', indexNum == 0 ? 'first-child-class' : '']" @click="locationItemClickFn">
		<view class="left-icon">
			<view v-if="iconType == 'bottom'" class="iconfont icon-dizhitianchong-" style="color: #dadada;"></view>
			<view v-else class="iconfont icon-dizhipipei" style="color: #dadada;"></view>
		</view>
		<view class="right-location-info">
			<view class="title text-ellipsis">{{ title }}</view>
			<view class="address text-ellipsis-rows">{{ address }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		indexNum: {
			type: Number
		},
		iconType: {
			type: String
		},
		title: {
			type: String
		},
		address: {
			type: String
		}
	},
	methods: {
		locationItemClickFn() {
			this.$emit('locationItemClickFn', {
				type:this.iconType,
				index:this.indexNum,
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.bottom-location-item {
	display: flex;
	padding: 30rpx 0;
	border-top: 1px solid #f2f2f2;
	&.first-child-class {
		border-top: none;
	}
	.left-icon {
		width: 36rpx;
	}
	.right-location-info {
		flex: 1;
		.title {
			width: 666rpx;
			margin-bottom: 14rpx;
			font-size: 28rpx;
			color: #000000;
		}
		.address {
			font-size: 26rpx;
			color: #909090;
			-webkit-line-clamp: 3; /*设置显示的行数*/
		}
	}
}
</style>
