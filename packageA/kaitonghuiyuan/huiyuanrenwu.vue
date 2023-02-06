<template>
	<view class="page">
		<view class="user-info-block">
			<view class="content-wrap">
				<view class="image-block"><image :src="userInfo.avatar" mode=""></image></view>
				<view class="user-name">{{ userInfo.nickname }}</view>
				<view class="user-flag" v-if="userInfo.vip_name">
					<view class="tag-block">{{ userInfo.vip_name }}</view>
				</view>
			</view>
		</view>
		<view class="content-wrap">
			<view class="now-progress border-radius20">
				<view class="h4">
					<!-- {{ (new Date()).getMonth()+1 }}-份专属任务进度 -->
					{{ dataObj.isPresent.month_text }}
				</view>
				<view class="h3">{{ dataObj.isPresent.title }}</view>
				<view class="h5">{{ dataObj.isPresent.sub_title }}</view>
				<view class="progress-block">
					<scroll-view :scroll-x="true" class="scroll-view-block">
						<view
							class="scroll-view-wrap"
							:style="{ 'min-width': dataObj.isPresent.list.length * 145 + 'rpx' }"
						>
							<view class="ended-block">
								<view class="cont">{{ dataObj.isPresent.order_num }}单</view>
								<view class="tag-block">已完成</view>
							</view>

							<view class="red-pack-item" v-for="(item, index) in dataObj.isPresent.list" :key="index">
								<view class="image-block">
									<image :src="calcImageSrc('/my/red-pack.png')" mode=""></image>
									<text>{{ item.order }}单</text>
								</view>
								<view class="tag-block">{{ item.money }}元</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<navigator url="./index" class="navigator-btn border-radius">{{ dataObj.isPresent.button }}</navigator>
			</view>
		</view>

		<view class="title-line">
			<view class="line-block"></view>
			{{ dataObj.yearText }}
			<view class="line-block"></view>
		</view>
		<view class="history-wrap">
			<view class="content-wrap">
				<view class="history-block border-radius20" v-for="(item, index) in dataObj.noPresent" :key="index">
					<view class="line-block" @click="showContFn(index)">
						<view class="left-block">
							<view class="h4">{{ item.month }}</view>
							<view class="tag-block" v-if="item.order_num <= 0">未参加</view>
							<view class="tag-block" v-else>{{ item.order_num }}单</view>
						</view>
						<view class="right-block" :class="item.show ? 'deg90' : ''">
							<uni-icons type="arrowright" color="#000000" size="20"></uni-icons>
						</view>
					</view>
					<view class="content-block" v-show="item.show">
						<scroll-view :scroll-x="true" class="scroll-view-block">
							<view class="scroll-view-wrap" :style="{ 'min-width': item.list.length * 150 + 'rpx' }">
								<view class="ended-block" v-for="(val, key) in item.list" :key="key">
									<view class="cont">{{ val.order }}单</view>
									<view class="tag-block" v-if="item.order_num > val.order">已完成</view>
									<view class="tag-block defaultStyle" v-else>未完成</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>

		<view class="distraction-block">
			<view class="content-wrap">
				<view class="distraction-content border-radius20">
					<view class="title">{{ dataObj.explain.title }}</view>

					<view class="list-text">
						{{ dataObj.explain.account }}
						<!-- 
						<view class="p">1、订单实付金额，以拆分后订单金额为准;</view>
						<view class="p">2、任务周期为自然月，即每个月1日到每个月最后一天;</view>
						<view class="p">3、仅限优享会员用户参加(体验卡用户除外);</view>
						<view class="p">4、任务完成后(订单签收)，相应任务奖励将自动发放至账户，任务奖励所发放红包限非优鲜超市商品使用;</view>
						<view class="p">5、当用户发生账户合并时，系统默认选取完成层级较高的账户作为当前任务完成状态。</view>
						 -->
					</view>
				</view>
			</view>
		</view>

		<loading-css :is-show="isShowLoading" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			isShowLoading: true,
			userInfo: {},
			dataObj: {
				explain: {},
				isPresent: {},
				noPresent: []
			}
		};
	},
	onLoad() {
		this.getVipRedPacketsFn();
	},
	methods: {
		showContFn(index) {
			this.dataObj.noPresent[index].show = !this.dataObj.noPresent[index].show;
		},
		async getVipRedPacketsFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/User/VipRedPackets'
			});

			let dataObj = {};

			this.userInfo = result.data.data.userinfo;

			dataObj.explain = result.data.data.explain;
			dataObj.yearText = result.data.data.year_text;

			dataObj.noPresent = [];

			result.data.data.list.forEach((item, index) => {
				item.show = false;

				if (item.is_present == 1) {
					dataObj.isPresent = item;
				} else {
					dataObj.noPresent.push(item);
				}
			});

			this.dataObj = dataObj;

			console.log(result, this.dataObj, '结果16', this.dataObj, this.userInfo);

			that.isShowLoading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */
	background-image: linear-gradient(-225deg, #fff0ca, #ffe49f);
}

.user-info-block {
	.content-wrap {
		display: flex;
		align-items: center;
		height: 100rpx;

		.image-block {
			width: 60rpx;
			height: 60rpx;

			image {
				width: 100%;
				height: 100%;
				border: 1px solid #ffffff;
				border-radius: 50%;
			}
		}

		.user-name {
			color: #474245;
			font-size: 30rpx;
			margin: 0 0.5em;
		}

		.user-flag {
			.tag-block {
				border-radius: 10000rpx;
				border: 1px solid #f4cb79;
				color: #f4cb79;
			}
		}
	}
}

.now-progress {
	background: #ffffff;
	padding-bottom: 48rpx;

	.h4 {
		@include flex-center;
		margin: 0 auto;
		width: 250rpx;
		height: 46rpx;
		font-size: 22rpx;
		color: #ffd9b7;
		background-image: linear-gradient(90deg, #6b3d15, #9c6022);
		border-radius: 0 0 20rpx 20rpx;
	}

	.h3 {
		margin-top: 20rpx;
		font-weight: 600;
		font-size: 34rpx;
		color: $grey1-color;
		line-height: 50rpx;
	}

	.h3,
	.h5 {
		text-align: center;
	}

	.h5 {
		font-size: 22rpx;
		color: $grey2-color;
		line-height: 32rpx;
	}

	.progress-block {
		margin: 35rpx;
		padding: 50rpx 35rpx 45rpx;
		border: 1px dashed #e6e6e6;
		border-radius: 30rpx;
	}
}


.scroll-view-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;

	&::after {
		content: '';
		display: block;
		position: absolute;
		z-index: 2;
		width: 100%;
		height: 4px;
		background: #fee0a9;
	}
}

.ended-block {
	font-size: 0;
	display: inline-flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	z-index: 10;

	.cont {
		@include flex-center;
		margin-bottom: -16rpx;
		width: 62rpx;
		height: 62rpx;
		border: 2px solid #ffba00;
		color: #4a2d14;
		font-size: 22rpx;
		border-radius: 50%;
		background: #fff6e2;
	}

	.tag-block {
		background-image: linear-gradient(90deg, #f8d795, #febc49);
		color: #ffffff;
		font-size: 16rpx;
		border: none;

		&.defaultStyle {
			background-image: linear-gradient(90deg, #a9a9a9, #c7c7c7);
		}
	}
}

.red-pack-item {
	width: 72rpx;
	height: 120rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.image-block {
		width: 62rpx;
		height: 74rpx;
		position: relative;
		font-size: 0;

		image {
			position: absolute;
			z-index: 10;
			width: 100%;
			height: 100%;
		}

		text {
			position: absolute;
			z-index: 15;
			color: #ffffff;
			font-size: 24rpx;
			bottom: 0.1em;
			text-align: center;
			width: 100%;
		}
	}

	.tag-block {
		position: relative;
		z-index: 10;
		margin-top: 18rpx;
		background: #ffe2e2;
		border: none;

		&::after {
			content: '';
			display: block;
			position: absolute;
			z-index: -1;
			top: 0;
			left: 50%;
			transform: translateX(-50%) translateY(-60%) rotate(45deg);
			width: 16rpx;
			height: 16rpx;
			background: #ffe2e2;
		}
	}
}

.navigator-btn {
	@include flex-center;
	margin: 0 auto;
	width: 480rpx;
	height: 80rpx;
	background-image: linear-gradient(90deg, #ff9600, #f4bd4f);
	font-size: 30rpx;
	font-weight: 600;
}

.title-line {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100rpx;
	color: #f7b310;
	font-size: 26rpx;

	.line-block {
		width: 140rpx;
		height: 2px;
		background: #f7b310;
	}
}

.history-wrap {
	padding-bottom: 20rpx;
}

.history-block {
	margin-top: 20rpx;
	background: #ffffff;

	&:first-child {
		margin-top: 0;
	}

	.line-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 20rpx;
		height: 100rpx;
		border-bottom: 1px solid #ececec;

		.left-block {
			display: flex;
			align-items: center;

			.h4 {
				margin-right: 0.5em;
				font-size: 30rpx;
				color: $grey1-color;
				font-weight: 600;
			}

			.tag-block {
				background: #e4e4e4;
				border: none;
				color: $grey2-color;
			}
		}
	}

	.content-block {
		padding: 66rpx;
	}
}

.deg90 {
	transform: rotate(90deg);
}

.distraction-block {
	padding-bottom: 20rpx;

	.distraction-content {
		background: #f8cb59;
		color: #ffffff;
		padding-bottom: 20rpx;

		.title {
			font-size: 30rpx;
			line-height: 90rpx;
			text-align: center;
		}

		.list-text {
			padding-left: 0.5em;
			padding: 0 0.5em;
			font-size: 22rpx;
			line-height: 40rpx;
		}
	}
}
</style>
