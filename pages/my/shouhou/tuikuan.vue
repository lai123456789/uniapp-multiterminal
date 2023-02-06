<template>
	<view class="page">
		<view class="cancel-block">
			<view class="content-wrap">
				<view class="cancel-content border-radius20">
					<view class="before" :style="{ background: configInfo.web_site_color }"></view>
					<view class="h3-block">
						<view class="h3-1">{{ progressInfo.refund.refund_status }}</view>
						<view class="h3-2">{{ progressInfo.refund.refund_ms }}</view>
					</view>
					<view class="h4">
						<view class="text">退款金额</view>
						<view class="money">¥{{ progressInfo.refund.money }}</view>
					</view>
					<view class="h4">
						<view class="text">退款账户</view>
						<view class="text">{{ progressInfo.refund.tui_bh }}</view>
					</view>

					<view class="steps-block">
						<view class="h2">退款流程</view>
						<stepss
							:active-color="configInfo.web_site_color"
							:options="historyArr"
							direction="column"
							:active="historyActive"
						></stepss>
					</view>

					<view class="info-block">
						<view class="h2">退款信息</view>
						<view class="goods-list-block">
							<block v-for="(item, index) in progressInfo.goods" :key="index">
								<view class="item">
									<view class="image-block"><image :src="item.original_img" mode=""></image></view>
									<view class="goods-description-block">
										<view class="goods-name">
											<view class="name-block">{{ item.goods_name }}</view>
											<view class="price-block">¥ {{ item.sale_sum_money }}</view>
										</view>
										<view class="goods-description-box">
											<view class="goods-description">{{ item.goods_remark }}</view>
											<view class="num">× {{ item.buy_num }}</view>
										</view>

										<view class="tag-list">
											<view class="tag-block" v-if="item.tag_name && trimFn(item.tag_name)">
												{{ item.tag_name }}
											</view>
										</view>
									</view>
								</view>
							</block>
						</view>
						<view class="line">
							<view>退款原因</view>
							<view class="text text-ellipsis">
								{{ progressInfo.refund.apply_reason }}
								<!---{{ progressInfo.refund.tkms }}-->
							</view>
						</view>
						<view class="line">
							<view>订单编号</view>
							<view class="text">{{ progressInfo.refund.ord_bh }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<loading-css :is-show="isShowLoading" />

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" is-show-exit></login-fn>


		
	</view>
</template>

<script>
import stepss from '@/components/uni-stepss/uni-steps.vue';
export default {
	components: {
		stepss
	},
	data() {
		return {
			isShowLoading: true,
			id: null,
			progressInfo: {
				refund: {
					refund_status: ''
				},
				refund_history: [],
				goods: []
			},
			historyArr: [
				{
					title: '',
					desc: ''
				}
			],
			historyActive: 1,
			loginBoxFlag:false, // 登录框显示隐藏状态

		};
	},
	onShow(){
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
	},
	onLoad(options) {
		let that = this;
		that.id = options.id;
		if (!that.isLogin) {
			that.closeGlobalLoginFn(true);
		} else {
			that.getProgress();
		}
	},
	methods: {
		refreshFn() {
			this.getProgress();
		},
		async getProgress() {
			let that = this;
			let result = await that.$request({
				url: '/api/order/show_tk_progress',
				data: {
					tui_bh: that.id
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.isShowLoading = false;

					// 所有数据
					that.progressInfo = result.data.data;

					// 退款流程 数据
					that.historyArr = that.progressInfo.refund_history
						.map(item => {
							return {
								title: item.add_time,
								desc: item.message
							};
						})
						.reverse();
					// 当前进行到的 步数
					that.historyActive = that.progressInfo.refund_history.length - 1;
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
.page,
page {
	overflow: hidden;
	min-height: 100vh;
	background: $bg-grey-color;
}

@mixin border {
	border-bottom: 1px solid #f8f8f8;
}

.cancel-content {
	position: relative;
	margin-top: 20rpx;
	padding: 0 20rpx;
	margin-bottom: 46rpx;
	overflow: hidden;
	background: #ffffff;

	.before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 24rpx;
	}

	.h3-block {
		margin-top: 50rpx;
		@include border;

		.h3-1 {
			font-size: 34rpx;
			font-weight: 600;
			color: $grey1-color;
		}

		.h3-2 {
			font-size: 28rpx;
			color: $grey2-color;
			line-height: 70rpx;
		}
	}

	.h4 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 88rpx;
		font-size: 28rpx;
		color: $grey1-color;
		@include border;
	}
}

.h2 {
	font-size: 34rpx;
	color: $grey1-color;
	font-weight: 600;
	line-height: 88rpx;
}

.item {
	display: flex;
	padding: 20rpx 0;
	height: 200rpx;
	@include border;

	&:first-child {
		border-top: 1px solid #f8f8f8;
	}

	.image-block {
		margin-right: 40rpx;
		width: 160rpx;
		height: 160rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-description-block {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.goods-name {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.name-block,
			.price-block {
				font-size: 30rpx;
				color: $grey1-color;
			}

			.name-block {
				width: 10em;
				@include text-ellipsis;
			}
		}

		.goods-description-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 60rpx;

			.num,
			.goods-description {
				font-size: 22rpx;
				color: $grey2-color;
			}

			.goods-description {
				width: 16em;
				@include text-ellipsis;
			}
		}

		.tag-list {
			font-size: 0;
		}
	}
}

.line {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90rpx;
	font-size: 25rpx;
	color: $grey2-color;
	@include border;

	&:last-child {
		border: none;
	}

	.text {
		color: $grey1-color;
	}
}

.text-ellipsis {
	@include text-ellipsis;
	max-width: 15em;
}
</style>
