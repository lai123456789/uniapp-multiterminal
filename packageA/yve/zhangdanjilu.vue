<template>
	<view class="page">
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="description-block">
					<view class="info-blcok">{{ item.brief }}</view>
					<view class="time-blcok">{{ item.time }}</view>
				</view>

				<view class="yve-block">{{ item.money }}</view>

			</view>
		</view>

		<null-block v-if="list.length<=0" min-height="100vh" is-show-to-page-btn ></null-block>
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" is-show-exit></login-fn>

	</view>
</template>

<script>
import { assertObject, assertArray } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			page: 1, // 分页数
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
		
		that.isShowLoading = true;
		if (that.isLogin) {
			that.getBillRecordFn(() => {
				that.list = [];
			});
		} else {
			that.closeGlobalLoginFn(true);
			that.isShowLoading = false;
		}
	},
	methods: {
		// 登录后刷新页面
		refreshFn() {
			let that = this;
			that.getBillRecordFn(() => {
				that.list = [];
			});
		},
		// 获取账单记录
		async getBillRecordFn(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: !!isShowLoading,
				method: 'post',
				url: '/api/User/BillRecord',
				data: {
					page: that.page
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);

					let list = assertArray(resultObj.list);

					if (list.length <= 0) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					fn && fn();
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
		that.getBillRecordFn(() => {
			that.list = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	onReachBottom() {
		let that = this;
		that.page++;
		that.getBillRecordFn(() => {}, true);
	}
};
</script>

<style lang="scss" scoped>
.page {
	display: inline-block;
	width: 100%;
	min-height: 100vh;
	background: $bg-grey-color;
}

.list {
	background: #ffffff;

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 126rpx;
		border-top: 1px solid $bg-grey-color;
		padding: 0 44rpx;
		&:first-child {
			border-top: none;
		}
		.description-block {
			display: flex;
			flex-direction: column;
			.info-blcok {
				color: #323232;
				font-size: 30rpx;
				height: 1.6em;
			}
			.time-blcok {
				color: #afafaf;
				font-size: 24rpx;
			}
		}
		.yve-block {
			color: #262626;
			font-weight: 600;
			font-size: 28rpx;
		}
	}
}
</style>
