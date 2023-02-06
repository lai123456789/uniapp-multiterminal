<template>
	<view class="page" v-if="show" @click="$emit('closeFn')">
		<view class="wrap border-radius20" @click.stop="catchTouchMove">
			<uni-icons @click="$emit('closeFn')" class="icons" type="close" color="#ffffff" size="30"></uni-icons>
			<view class="title">
				<slot name="title"></slot>
			</view>
			<view class="content">
				<slot name="content"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		position: fixed;
		z-index: 800;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, .6);

		.wrap {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			padding: 40rpx;
			width: 580rpx;
			height: 820rpx;
			background: #FFFFFF;

			.icons {
				position: absolute;
				right: 10rpx;
				margin-top: -130rpx;
			}

			.content {
				margin-top: 40rpx;
				height: 650rpx;
				overflow-y: auto;
			}

			.title {
				font-size: 36rpx;
				color: $grey1-color;
				text-align: center;
				font-weight: 600;
			}
		}
	}
</style>
