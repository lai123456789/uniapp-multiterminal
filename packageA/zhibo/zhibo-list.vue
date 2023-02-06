<template>
	<view class="page box-sizing">
		<loading-css :is-show="isShowLoading" />

		<view class="list" v-if="list.length > 0">
			<view class="item" v-for="(item, index) in list" :key="index" @click="toLiveFn(item.roomid, item)">
				<view class="img-wrap">
					<view class="look-video-btn" v-if="item.live_status == 103">回放</view>
					<view class="look-video-btn" v-else>{{ item.live_status | liveCode2Txt }}</view>

					<view class="isEndFlag border-radius">{{ item.live_status | liveCode2Txt }}</view>

					<image class="img" :src="item.share_img" mode=""></image>
				</view>

				<view class="description-block">
					<view class="left-text-blcok">
						<view class="live-name">{{ item.name }}</view>
						<view class="show-time">
							<image
								class="live-icon-img"
								:src="calcImageSrc('/global-image/live-icon-img.png')"
								mode=""
							></image>
							{{ item.start_time | startTime2Txt }}
						</view>
					</view>
					<!-- <view class="right-btn-group"><view class="start-btn" @click.stop="catchTouchMove">开播提醒</view></view> -->
					<!-- <view class="right-btn-group"><view v-if="item.live_status == 102" class="start-btn" @click.stop="startWarnFn(item.roomid)">开播提醒</view></view> -->
					<!-- <view class="right-btn-group"><view class="start-btn" @click.stop="lookLiveStatusFn(1)">查看状态</view></view> -->

					<view class="right-btn-group" @click.stop="catchTouchMove">
						<subscribe
							@click.stop="catchTouchMove"
							:room-id="item.roomid"
							:width="subscribeWidth"
							:height="subscribeHeight"
							:font-size="18"
							color="#ffffff"
							background-color="#6467f0"
							@subscribe="onSubscribe"
						></subscribe>
					</view>
				</view>
			</view>
		</view>
		<view v-else><null-block min-height="100vh"></null-block></view>

		
		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @close="closeGlobalLoginFn" to-back></login-fn>

	</view>
</template>
<script>
let subscribeWidth = 250,
	subscribeHeight = 86,
	livePlayer = requirePlugin('live-player-plugin');

export default {
	data() {
		return {
			isShowLoading: true,
			subscribeWidth: 250,
			subscribeHeight: 86,
			list: [],
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onLoad() {
		let that = this;
		that.setSubscribeSizeFn();
		that.getLiveListFn();
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		let flag = that.isLogin ? false : true;
		that.closeGlobalLoginFn(flag);
	},
	methods: {
		// 设置 Subscribe 组件 宽高
		setSubscribeSizeFn() {
			let that = this;
			const winH = that.windowWidth;
			that.subscribeWidth = (winH * subscribeWidth) / 750;
			that.subscribeHeight = (that.subscribeWidth * subscribeHeight) / subscribeWidth;
		},
		onSubscribe(e) {
			console.log(e);
			return false;
			console.log('房间号：', e.detail.room_id);
			console.log('订阅用户openid', e.detail.openid);
			console.log('是否订阅', e.detail.is_subscribe);
		},
		async getLiveListFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Live/get_live_list'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					if (result.data.data.errmsg == 'ok') {
						that.list = result.data.data.room_info;
					} else {
						uni.showToast({
							icon: 'none',
							title: result.data.data.errmsg
						});
					}
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
			// isShowLoading:true,
			that.isShowLoading = false;
			// 在这隐藏css -loading
		},
		// 跳转到直播间 传入直播间roomId
		toLiveFn(roomId, item) {
			let that = this;
			console.log('toLiveFn__', '\n', item, JSON.parse(JSON.stringify(item)));

			// let roomId = 1; // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取

			let customParams = encodeURIComponent(JSON.stringify({})); // 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）

			let url;
			if (item.live_status == 103) {
				uni.setStorageSync('playBackObj', JSON.stringify(item));

				url = `/packageA/zhibo/play-back?room_id=${roomId}`;
			} else {
				url = `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`;
			}

			that.navigateToFn({
				url
			});
		},
		async lookLiveStatusFn(roomId) {
			let that = this;
			let res = await that.getLiveCodeStatusFn(roomId);
			console.log(res, '返回直播间的状态', '\n');
		},
		// 获取直播间状态码
		getLiveCodeStatusFn(roomid) {
			return new Promise((resFn, rejFn) => {
				livePlayer
					.getLiveStatus({
						room_id: roomid
					})
					.then(res => {
						/*
								101: 直播中,
								102: 未开始,
								103: 已结束,
								104: 禁播,
								105: 暂停中,
								106: 异常， (主播退出直播小程序)
								107:：已过期
							*/
						const liveStatus = res.liveStatus;
						console.log('get live status', liveStatus);
						resFn({
							type: 'success',
							result: liveStatus,
							msg: `获取直播间${roomid}状态码成功`
						});
					})
					.catch(err => {
						resFn({
							type: 'error',
							result: err,
							msg: `获取直播间${roomid}状态码失败`
						});

						console.log('get live status', err);
					});
			});
		},
		// 开播提醒
		startWarnFn(roomid) {
			livePlayer
				.getSubscribeStatus({
					room_id: roomid
				})
				.then(res => {
					console.log('房间号：', res.room_id);
					console.log('订阅用户openid', res.openid);
					console.log('是否订阅', res.is_subscribe);
				})
				.catch(err => {
					console.log('get subscribe status', err);
				});
		}
	},
	// Math.floor(+new Date()/1000);
	filters: {
		// 开播时间转文字
		startTime2Txt(stamp = 0) {
			let time = new Date(stamp * 1000);

			let getFullYear = time.getFullYear(),
				getMonth = `0${time.getMonth() + 1}`.slice(-2),
				getDate = `0${time.getDate()}`.slice(-2),
				getHours = `0${time.getHours()}`.slice(-2),
				getMinutes = `0${time.getMinutes()}`.slice(-2);

			return `${getFullYear}-${getMonth}-${getDate}  ${getHours}:${getMinutes} 开播`;
		},
		// 直播状态码转文字
		liveCode2Txt(liveCode) {
			const codeStatusObj = {
				'101': '直播中',
				'102': '未开始',
				'103': '已结束',
				'104': '禁播',
				'105': '暂停',
				'106': '异常',
				'107': '已过期'
			};
			let txt = codeStatusObj[liveCode] || '未知状态';
			return txt;
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: $bg-grey-color;
	display: inline-block;
	width: 100%;
}

.list {
	padding: 0 20rpx 20rpx;

	.item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-top: 20rpx;
		height: 522rpx;
		border-radius: 10rpx;
		background: #ffffff;
		overflow: hidden;

		.img-wrap {
			flex: 1;
			position: relative;
			height: 392rpx;

			.look-video-btn,
			.isEndFlag {
				position: absolute;
				z-index: 10;
			}

			.isEndFlag {
				@include flex-center;
				left: 20rpx;
				bottom: 20rpx;
				// width: 80rpx;
				padding: 0 0.5em;
				height: 32rpx;
				font-size: 20rpx;
				color: #ffffff;
				background-image: linear-gradient(-15deg, #ffa03c, #fb5e7d);
			}

			.look-video-btn {
				right: 24rpx;
				top: 24rpx;

				line-height: 36rpx;
				padding: 0 0.3em;
				border-radius: 4px;
				background: #666666;
				color: #ffffff;
				font-size: 22rpx;
			}

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.description-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			height: 130rpx;

			.left-text-blcok {
				display: flex;
				flex-direction: column;
				justify-content: center;

				height: 100%;

				.live-name {
					width: 14em;
					@include text-ellipsis;
					font-size: 24rpx;
					color: #333333;
					font-weight: 600;
					line-height: 44rpx;
				}

				.show-time {
					display: flex;
					align-items: center;
					height: 44rpx;
					font-size: 22rpx;
					color: #ff5041;

					.live-icon-img {
						margin-right: 0.3em;
						width: 32rpx;
						height: 28rpx;
					}
				}
			}

			.right-btn-group {
				.start-btn {
					@include flex-center;
					width: 250rpx;
					height: 86rpx;
					background: #6467f0;
					font-size: 36rpx;
					font-weight: 600;
					color: #ffffff;
					border-radius: 10rpx;
				}
			}
		}
	}
}

.subscribe--live-player-subscribe__btn {
	background: red !important;
}
</style>
