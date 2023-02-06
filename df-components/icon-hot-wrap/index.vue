<template>
	<view class="icon-hot-wrap border-radius">
		<image :src="calcImageSrc('/index-images/icon-hot.png')" mode=""></image>
		<text :style="calsStyle_text">{{ text }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String
			},
			maxWidth: {
				type: String,
			}
		},
		computed: {
			calsStyle_text() {
				let that = this;
				if (that.maxWidth) {
					let obj = {};
					obj['max-width'] = that.maxWidth;
					return that.obj2styleStr(obj)
				}
				return ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-hot-wrap {
		display: inline-block;
		position: relative;
		height: 32rpx;
		font-size: 20rpx;
		color: #FFFFFF;
		background-image: linear-gradient(90deg, #ff6420, #ff1e1e);

		image {
			position: absolute;
			left: 0;
			width: 32rpx;
			height: 32rpx;
		}

		text {
			display: inline-block;
			margin-left: 40rpx;
			margin-right: 25rpx;
			max-width: 6em;
			line-height: 32rpx;
			@include text-ellipsis;
		}

	}
</style>
