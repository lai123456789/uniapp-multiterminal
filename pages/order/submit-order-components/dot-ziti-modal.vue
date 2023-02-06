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
				<view class="zitidian-list-item-wrap" v-for="(item, index) in dotZitiList" :key="index">
					<view class="zitidian-show">
						<view class="left-seller-image">
							<view class="image-wrap">
								<img-bg-css
									:src="item.zitidianImage"
								></img-bg-css>
								<view class="flex-center not-range" style="flex-direction: column;" v-if="!item.isRange">
									<view class="text">超出配</view>
									<view class="text">送范围</view>
								</view>
							</view>
						</view>
						<view class="right-seller-info">
							<view class="dot-store-name text-ellipsis">{{ item.zitidianName }}</view>
							<view class="dot-store-tel text-ellipsis">距收货地: {{ item.zitidianDist }}</view>
							<view class="dot-store-open-time text-ellipsis">营业时间: {{ item.zitidianTime }}</view>
							<view class="dot-store-address-text text-ellipsis-rows">
								取货地址: {{ item.zitidianAddressText }}
							</view>
						</view>

						<view
							:style="{background: item.isRange ? configInfo.web_site_color : '#bfbfbf' }"
							class="select-dot-ziti-btn flex-center border-radius"
							@click="selectDotZitiFn(item,index)"
						>
							选择
						</view>
					</view>
				</view>
			</view>
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
		dotZitiList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	methods: {
		// 关闭模态框
		closeFn() {
			this.$emit('closeFn');
		},
		// 选择自提点
		selectDotZitiFn(item, index) {
			if(item.isRange){
				this.$emit('selectDotZitiFn', index);
			}
		}
	}
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

.zitidian-show {
	display: flex;
	justify-content: space-between;
	position: relative;
	margin: 0 22rpx;
	width: 706rpx;
	height: 228rpx;
	background: #ffffff;
	border-radius: 10rpx;
	overflow: hidden;
	box-shadow: 0 0 10rpx #cccccc;

	.left-seller-image {
		position: relative;
		width: 228rpx;
		height: 228rpx;
		padding: 20rpx;
		.image-wrap {
			width: 188rpx;
			height: 188rpx;
			border-radius: 10rpx;
			overflow: hidden;
		}
		.not-range {
			position: absolute;
			z-index: 10;
			top: 20rpx;
			left: 20rpx;
			width: 180rpx;
			height: 180rpx;
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
		width: 498rpx;
		padding: 20rpx 20rpx 20rpx 0;
		.dot-store-name {
			width: 380rpx;
			height: 40rpx;
			font-size: 30rpx;
			color: #414141;
			font-weight: 600;
		}
		.dot-store-tel,
		.dot-store-open-time,
		.dot-store-address-text {
			width: 458rpx;
			height: 40rpx;
			font-size: 26rpx;
			color: #555555;
		}

		.dot-store-address-text {
			height: 68rpx;
		}
	}
	.select-dot-ziti-btn {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		width: 76rpx;
		height: 46rpx;
		font-size: 26rpx;
		color: #ffffff;
	}
}
</style>
