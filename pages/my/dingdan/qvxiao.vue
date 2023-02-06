<template>
	<view>
		<view class="cancel-block">
			<view class="content-wrap">
				<view class="cancel-content border-radius20">
					<view class="before" :style="{ background: configInfo.web_site_color }"></view>
					<view class="h3-block">
						<!-- 
						<view class="h3-1">
							未付款
						</view>
						 -->
						<view class="h3-2">若您使用了优惠券，将返回到账户</view>
					</view>
					<view class="h4"><!-- 请选择取消原因,方便我们日后改进 --></view>
					<view class="cancel-list">
						<view class="item" v-for="(item, index) in questionList" :key="index" @click="selectFn(index)">
							<text>{{ item.name }}</text>
							<view class="icon-block">
								<uni-icons
									v-if="item.isSelect"
									type="checkbox-filled"
									size="20"
									:color="configInfo.web_site_color"
								></uni-icons>
								<uni-icons v-else type="circle" size="20" color="#91939c"></uni-icons>
							</view>
						</view>
						<textarea
							maxlength="1200"
							v-model="textareaContent"
							class="textarea"
							placeholder="备注"
						></textarea>
					</view>
				</view>

				<!-- 
				<navigator url="./qvxiaoxiangqing" class="bottom-btn-block" hover-class="none">
					<button class="pay-btn">
						提交
					</button>
				</navigator>
				 -->
				<!-- 	<view class="bottom-btn-block" @click="commitFn">
					<button class="pay-btn">
						提交
					</button>
				</view> -->

				<view class="bottom-btn-block" @click="commitFn">
					<button
						class="pay-btn"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						:style="{ background: configInfo.web_site_color }"
					>
						提交
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { checkTypeFn } from '@/tools/tools';
export default {
	data() {
		return {
			id: null,
			reason: [
				//申请退款原因
				{
					id: '',
					name: ''
				}
			],
			questionList: [],
			textareaContent: '',
			backPage: '',
			commentFlag: false,
			templateId: []
		};
	},
	onLoad(options) {
		let that = this;
		that = this;
		that.id = options.id;
		that.backPage = options.backPage;
		that.getApplySaleDataFn();
	},
	onUnload() {
		let that = this;
		let commentFlag = !that.commentFlag;
		if (that.backPage == 'dingdanList' && commentFlag) {
			uni.setStorageSync('refreshBack', 1);
		} else {
			uni.setStorageSync('refreshBack', '');
		}
	},
	methods: {
		// 获取发送模板消息权限 (弹框形式给用户)
		getTemplateId() {
			let that = this;
			return new Promise((resFn, rejFn) => {
				uni.requestSubscribeMessage({
					tmplIds: that.templateId,
					success(res) {
						resFn(res);
					},
					fail(e) {
						rejFn(e);
					}
				});
			});
		},

		selectFn(index) {
			let that = this;
			that.questionList.forEach((item, ind) => {
				if (index == ind) {
					item.isSelect = true;
				} else {
					item.isSelect = false;
				}
			});
		},
		// 获取 退款 原因 列表
		async getApplySaleDataFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/order/apply_sale_data'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					// 售后原因列表
					let reasonArr = [];
					if (checkTypeFn(result.data.data.reason) == 'Array' && result.data.data.reason.length > 0) {
						reasonArr = result.data.data.reason;
					} else {
						reasonArr = [];
					}

					reasonArr.forEach((item, index) => {
						//设置选择状态
						if (index == 0) {
							item.isSelect = true;
						} else {
							item.isSelect = false;
						}
					});
					that.questionList = reasonArr;

					// 处理 模板消息
					let templateId = [];
					if (checkTypeFn(result.data.data.templateId) == 'Array' && result.data.data.templateId.length > 0) {
						templateId = result.data.data.templateId;
					} else {
						templateId = [];
					}

					that.templateId = templateId
						.filter(item => {
							return item.mini_status == 1;
						})
						.map(item => {
							return item.mini_template_id;
						});
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
		},
		// 提交
		async commitFn() {
			let that = this;

			// #ifdef MP-WEIXIN
			if (that.templateId.length) {
				let templateResult = await that.getTemplateId();
			}

			// #endif

			let id = that.questionList.filter(item => {
				return item.isSelect == true;
			})[0].id;

			that.hideAllFn();
			uni.showLoading({});
			
			let oopt = {
				url: '/api/order/qx_pay_order',
				data: {
					ord_id: that.id,
					reasonID: id,
					tkms: that.textareaContent || '备注信息'
				}
			}
			
			console.log(oopt);
			console.log(JSON.stringify(oopt));
			// return false;
			let result = await that.$request(oopt);

			if (result.data.code != 200) {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: result.data.msg
				});
				return false;
			}
			that.hideAllFn();
			uni.showModal({
				showCancel: false, //不显示取消按钮
				title: result.data.msg,
				success(e) {
					//确认后的回调
					that.commentFlag = true;
					console.log(that.commentFlag, '离开打印commentFlag');
					that.toBackFn();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
page {
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
		font-size: 28rpx;
		color: $grey1-color;
		line-height: 120rpx;
	}

	.cancel-list {
		padding-bottom: 20rpx;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 118rpx;
			@include border;
			color: $grey2-color;
			font-size: 28rpx;

			&:last-of-type {
				border-bottom: none;
			}
		}
	}

	.textarea {
		margin: 0.5em;
		padding: 0.5em;
		text-indent: 1em;
		font-size: 24rpx;
		background: #f7f7f7;
		height: 6em;
		width: 90%;
		color: #bdbdbd;
		/* 
			padding: 5rpx 0;
			width: 100%;
			font-size: 28rpx;
			height: 12em;
			border-top: 1px solid #f8f8f8;
		 */
	}
}

.bottom-btn-block {
	@include flex-center;
	position: fixed;
	z-index: 350;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;

	.pay-btn {
		@include btn-green;
	}
}
</style>
