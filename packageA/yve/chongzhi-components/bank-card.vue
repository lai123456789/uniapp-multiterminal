<template>
	<view class="bank-block">
		<image v-if="(bgType%3)+1==1" class="bg-image" :src="calcImageSrc('/my/icon-bank-3.png')" mode=""></image>
		<image v-else-if="(bgType%3)+1==2" class="bg-image" :src="calcImageSrc('/my/icon-bank-2.png')" mode=""></image>
		<image v-else-if="(bgType%3)+1==3" class="bg-image" :src="calcImageSrc('/my/icon-bank-1.png')" mode=""></image>
		<view class="text-block">
			<view class="card-name">
				{{ cardName }}
			</view>
			<view class="card-rmb">
				<text>{{ rmb }}</text>元
			</view>
			<view class="card-description">
				{{ description }}
			</view>
			<view class="card-time">
				{{ endtime }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bgType: {
				default: 1,
			},
			cardName: {
				type: String,
			},
			rmb: {
				default: 0,
			},
			description: {
				type: String,
			},
			endtime: {
				default: '',
			}
		}
	}
</script>

<style lang="scss" scoped>
	@mixin size {
		width: 514rpx;
		height: 310rpx;
	}

	.bank-block {
		position: relative;
		@include size;

		.bg-image {
			position: absolute;
			z-index: 10;
			top: 0;
			left: 0;
			@include size;
		}

		.text-block {
			position: absolute;
			z-index: 15;
			top: 15rpx;
			left: 40rpx;
			width: 434rpx;
			height: 266rpx;

			.card-name {
				color: #FFFFFF;
				font-weight: 600;
				font-size: 26rpx;
				line-height: 78rpx;
				width: 15em;
				@include text-ellipsis;
			}

			.card-rmb {
				color: $grey1-color;
				font-size: 25rpx;
				line-height: 60rpx;

				text {
					font-weight: 600;
					font-size: 50rpx;
				}
			}

			.card-description {
				color: $grey1-color;
				font-size: 20rpx;
				line-height: 36rpx;
				@include text-ellipsis-rows;
			}

			.card-time {
				position: absolute;
				right: 0;
				bottom: .25em;
				color: #825e47;
				font-size: 20rpx;
			}


		}
	}
</style>
