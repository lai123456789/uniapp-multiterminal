<template>
	<view class="page">

		<view class="title-text" v-if="list.length>0">
			<view class="item time">申请时间</view>
			<view class="item state">状态</view>
			<view class="item money">金额(手续费)</view>
		</view>

		<view class="list" v-if="list.length>0">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="time">{{ item.add_time }}</view>
				<view class="state">{{ item.status }}</view>
				<view class="money">{{ item.money }} ({{ item.sx_money }})</view>
			</view>
		</view>
		<null-block min-height="100vh" v-else></null-block>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				list: [],
			};
		},
		onLoad() {
			this.getTXLogFn();
		},
		methods: {
			async getTXLogFn(fn) {
				let that = this;
				let result = await that.$request({
					url: '/api/Share/tx_log',
					data: {
						page: that.page,
					},
					
				})
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						fn && fn();
						that.list = that.list.concat(result.data.data);
					} else {
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						})

					}
				} else {
					uni.showToast({
						icon: 'none',
						title: that.$errorMsg
					})
				}

			}
		},
		onReachBottom() {
			let that = this;
			that.page++;
			that.getTXLogFn(() => {})
		},
		// 下拉刷新触发的函数
		onPullDownRefresh() {
			let that = this;
			that.page = 1;
			that.getTXLogFn(() => {
				that.list = [];
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			})
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background: $bg-grey-color;
	}

	.title-text {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 88rpx;
		font-size: 32rpx;
		color: #000000;
		font-weight: 600;
		border-bottom: 1px solid #bbbbbb;
		background: #ffffff;
	}

	.list {
		background: #ffffff;

		.item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 70rpx;
			border: 1px solid #efefef;
			font-size: 30rpx;
			color: #414959;
		}
	}
</style>
