<template>
	<view class="page">
		<view class="top-banner-block">
			<view class="rule" @click="isShowRuleModal = true">规则</view>

			<image
				class="share-banner-bg-head"
				:src="calcImageSrc('/global-image/share-banner-bg-head.png')"
				mode=""
			></image>

			<image
				class="share-banner-btn"
				:src="calcImageSrc('/global-image/share-banner-btn.png')"
				mode=""
				@click="navigateToFn({ url: '/packageA/tuijianyouli/canvas' })"
			></image>
		</view>

		<view class="title-bar">
			<image :src="calcImageSrc('/my/icon-3line.png')" mode=""></image>
			<text>简单三步立享权益</text>
			<image :src="calcImageSrc('/my/icon-3line.png')" mode=""></image>
		</view>

		<view class="icon-wrap">
			<view class="content-wrap">
				<view class="icon-block border-radius20">
					<view class="icon-box">
						<view class="icon-item">
							<view class="image-block">
								<image :src="calcImageSrc('/my/show-icon1.png')" mode=""></image>
							</view>
							<view class="text-block">
								<text>分享活动</text>
								<text>给您好友</text>
							</view>
						</view>
						<view class="icon-item">
							<view class="image-block">
								<image :src="calcImageSrc('/my/show-icon2.png')" mode=""></image>
							</view>
							<view class="text-block">
								<text>好友接受</text>
								<text>您的邀请</text>
							</view>
						</view>
						<view class="icon-item">
							<view class="image-block">
								<image :src="calcImageSrc('/my/show-icon3.png')" mode=""></image>
							</view>
							<view class="text-block">
								<text>好友登录</text>
								<text>完成认证</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="title-bar">
			<image :src="calcImageSrc('/my/icon-3line.png')" mode=""></image>
			<text>我的邀请战绩</text>
			<image :src="calcImageSrc('/my/icon-3line.png')" mode=""></image>
		</view>
		<view class="share-info-block">
			<view class="content-wrap">
				<view class="share-info border-radius20">
					<view
						class="share-info-item"
						@click="navigateToFn({ url: '/packageA/tuijianyouli/list?type=haoyou' })"
					>
						<view class="num">{{ sum }}</view>
						<view class="text">共邀请好友</view>
					</view>
					<view
						class="share-info-item"
						@click="navigateToFn({ url: '/packageA/tuijianyouli/list?type=paiming' })"
					>
						<view class="num">{{ paiming }}</view>
						<view class="text">战绩排名</view>
					</view>
					<view
						class="share-info-item"
						@click="navigateToFn({ url: '/packageA/tuijianyouli/list?type=jiangli' })"
					>
						<view class="num">{{ money }}</view>
						<view class="text">获得奖励</view>
					</view>
				</view>
			</view>
		</view>

		<modal-box :show="isShowRuleModal" @closeFn="isShowRuleModal = false">
			<template slot="title">
				规则
			</template>
			<template slot="content">
				<view><rich-text :nodes="nodes"></rich-text></view>
			</template>
		</modal-box>
	</view>
</template>

<script>
import modalBox from '@/df-components/modal-box';
import { assertObject, assertArray } from '@/tools/tools.js';

export default {
	components: {
		modalBox
	},
	data() {
		return {
			isShowRuleModal: false,
			nodes: ``,
			sum: 0,
			paiming: 0,
			money: 0
		};
	},
	onLoad() {
		this.getInviteInfoFn();
	},
	methods: {
		/*
				获取
					邀请总数
					战绩排名
					佣金
			*/
		async getInviteInfoFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Share/invite_info'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);

					let { sum, paiming, money, invite_rule } = resultObj;
					that.sum = sum ? sum : 0;
					that.paiming = paiming ? paiming : 0;
					that.money = money ? money : 0;
					that.nodes = invite_rule;
				} else {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@keyframes btnAnimation {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}

.page,
page {
	background: #ffeec8;
}

.top-banner-block {
	position: relative;

	.share-banner-bg-head {
		width: 750rpx;
		height: 890rpx;
	}

	.share-banner-btn {
		position: absolute;
		left: 50%;
		margin-left: -195rpx;
		bottom: 24rpx;
		width: 390rpx;
		height: 80rpx;
		animation: btnAnimation 2s infinite;
	}

	.rule {
		position: absolute;
		top: 40rpx;
		right: 0;
		width: 104rpx;
		height: 48rpx;
		border-radius: 1000rpx 0 0 1000rpx;
		background: #ff7a2c;
		font-size: 26rpx;
		color: #ffffff;
		@include flex-center;
	}
}

.btn-block {
	position: relative;
	top: -90rpx;
	margin-bottom: -90rpx;

	.btn-image-block {
		@mixin size {
			width: 600rpx;
			height: 150rpx;
		}

		@include size;
		width: 100%;
		@include flex-center;

		image {
			@include size;
			border-radius: 10000rpx;
			box-shadow: 1rpx 1rpx 10rpx blue;
		}
	}
}

.title-bar {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100rpx;
	font-size: 36rpx;
	color: #ffffff;
	font-weight: 600;

	image {
		width: 80rpx;
		height: 50rpx;
	}

	text {
		padding: 0 0.2em;
		color: #de343e;
	}
}

.icon-wrap {
	.icon-block {
		@include flex-center;
		height: 280rpx;
		background: rgba(255, 255, 255, 0.85);

		.icon-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 520rpx;
			height: 200rpx;

			.icon-item {
				display: flex;
				height: 200rpx;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				.image-block {
					width: 120rpx;
					height: 120rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.text-block {
					font-size: 23rpx;
					color: #a976ce;

					text {
						font-weight: 600;
						display: block;
					}
				}
			}
		}
	}
}

.share-info-block {
	padding-bottom: 90rpx;

	.share-info {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 280rpx;
		background: rgba(0, 0, 0, 0.2);

		.share-info-item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			height: 90rpx;

			.num {
				color: #ffffff;
				font-size: 50rpx;
				font-weight: 600;
			}

			.text {
				color: #ffffff;
				font-size: 20rpx;
			}
		}
	}
}
</style>
