<template>
	<view class="page">
		<view class="content-wrap">
			<view class="list border-radius20">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="order-type-block">
						<view class="order-name">{{ item.brief }}</view>
						<view class="order-val">{{ item.add_integral }}</view>
					</view>
					<view class="time-block">
						<view class="time">{{ item.time }}</view>
						<view class="jifen">{{ item.surplus }}</view>
					</view>
				</view>
			</view>
			<view class="uni-load-more" v-if="list.length > 12">
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</view>
		</view>
		<null-block
			v-if="list.length < 1"
			min-height="100vh"
			is-show-to-page-btn
			to-page-text="积分商品"
			:to-page-url="{ type: 'navigateBack' }"
		></null-block>
		<loading-css :is-show="isShowLoading"></loading-css>


		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" :is-show-exit="true"></login-fn>


	</view>
</template>

<script>
import { assertObject, assertArray } from '@/tools/tools.js';
export default {
	data() {
		return {
			loadMoreStatus: 'more',
			isShowLoading: true,
			page: 1,
			list: [],
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});


		if (!that.isLogin) {
			that.closeGlobalLoginFn(true);
			that.isShowLoading = false;
		} else {
			that.page = 1;
			that.getIntegralDetailFn(() => {
				that.list = [];
			});
		}
	},
	methods: {
		refreshFn() {
			let that = this;
			that.page = 1;
			that.getIntegralDetailFn(() => {
				that.list = [];
			});
		},
		// 获取积分明细
		async getIntegralDetailFn(fn) {
			let that = this;
			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/User/GetIntegralDetail',
				data: {
					page: that.page
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let list = assertArray(resultObj.list);
					fn && fn(list);
					if (list.length <= 0) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					that.list = that.list.concat(list);
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
			that.isShowLoading = false;
		}
	},
	onPullDownRefresh() {
		let that = this;
		that.page = 1;
		that.getIntegralDetailFn(() => {
			that.list = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	onReachBottom() {
		let that = this;
		that.loadMoreStatus = 'loading';
		that.page++;
		that.getIntegralDetailFn(list => {
			if (list.length < 1) {
				that.loadMoreStatus = 'noMore';
			} else {
				that.loadMoreStatus = 'more';
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	min-height: 100vh;
	background: $bg-grey-color;
}

.content-wrap {
	overflow: hidden;
}

.list {
	margin: 20rpx 0 0;
	background: #ffffff;

	.item {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 10rpx 20rpx;
		border-top: 1px solid $bg-grey-color;

		&:first-child {
			border-top: none;
		}

		.order-type-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 70rpx;

			.order-name {
				font-size: 28rpx;
				color: $grey1-color;
			}

			.order-val {
				font-size: 28rpx;
				color: $red-color;
			}
		}

		.order-num {
			font-size: 20rpx;
			color: $grey1-color;
		}

		.time-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;
			font-size: 20rpx;
			color: $grey2-color;
		}
	}
}
</style>
