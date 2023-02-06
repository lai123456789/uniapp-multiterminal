<template>
	<view v-if="isShow" class="setting-module" @click="cloneFn">
		<view class="box">
			<view class="title" @click.stop="catchTouchMove">{{ title }}</view>
			<button class="open-btn clear-btn-style" open-type="openSetting">确定</button>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '打开权限设置'
		}
	},
	methods: {
		cloneFn() {
			this.$emit('cloneFn');
		}
	}
};
</script>

<style lang="scss" scoped>
.setting-module {
	@include flex-center;
	position: fixed;
	z-index: 880;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.box {
		display: flex;
		flex-direction: column;
		width: 80vw;
		height: 320rpx;
		background: #ffffff;
		font-size: 36rpx;
		border-radius: 20rpx;
		overflow: hidden;
		font-weight: 600;
		.title {
			flex: 1;
			@include flex-center;
			padding: 40rpx 60rpx;
			color: #181818;
		}
		.open-btn {
			@include flex-center;
			border-top: 1px solid #f7f7f7;
			height: 110rpx;
			color: #526692;
		}
	}
}
</style>
