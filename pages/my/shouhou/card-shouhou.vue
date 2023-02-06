<template>
	<view
		class="card-item-block border-radius20"
		@click="navigateToFn({ url: `/pages/order-state/dingdan-state?id=${orderInfo.id}` })"
	>
		<view class="top-bar">
			<view class="time-block">{{ orderInfo.ord_bh }}</view>
			<view class="state">{{ orderInfo.refund_status }}</view>
		</view>
		<view class="goods-block">
			<view class="goods-list-block-wrap">
				<view class="goods-list-block">
					<view class="image-block" v-for="(item, index) in orderInfo.original_img" :key="index">
						<image class="image-size" :src="item"></image>
					</view>
				</view>
			</view>
			<view class="price-info">
				共{{ orderInfo.buy_num }}件 实付:
				<text>¥{{ orderInfo.pay_price }}</text>
			</view>
		</view>
		<!-- 退款成功就隐藏 -->
		<view class="btn-block">
			<view class="state"></view>
			<!-- 在申请售后中 -->
			<block v-if="orderInfo.tui_bh">
				<view
					@click.stop="navigateToFn({ url: '/pages/my/shouhou/tuikuan?id=' + orderInfo.tui_bh })"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					退款进度
				</view>
				<block v-if="isShowAfterSaleBtn">
					<view
						:data-type="type"
						@click.stop="shenqingshouhou(orderInfo)"
						:class="[
							'btn-block-box',
							'greyStyle',
							isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
						]"
					>
						申请售后
					</view>
				</block>
				<block v-if="orderInfo.refund_status == '待审核'">
					<view
						@click.stop="cancelCommitFn(orderInfo.tui_bh)"
						:class="[
							'btn-block-box',
							'greyStyle',
							isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
						]"
					>
						撤销申请
					</view>
					<view
						@click.stop="
							navigateToFn({
								url:
									'/pages/my/shouhou/shenqingshouhuo?type=修改申请&id=' +
									orderInfo.id +
									'&tui_bh=' +
									orderInfo.tui_bh
							})
						"
						:class="[
							'btn-block-box',
							'greyStyle',
							isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
						]"
					>
						修改申请
					</view>
				</block>
			</block>
			<!-- 订单完成可以申请售后 -->
			<block v-else>
				<view
					@click.stop="navigateToFn({ url: '/pages/my/shouhou/shenqingshouhuo?id=' + orderInfo.id })"
					:class="[
						'btn-block-box',
						'greyStyle',
						isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
					]"
				>
					申请售后
				</view>
			</block>
		</view>
	</view>
</template>
<script>
import { assertObject } from '@/tools/tools.js';
export default {
	props: {
		orderInfo: {
			type: Object
		},
		type: {
			/*
				typeArr: ['ask', 'all'],
				可以申请售后的商品      所有在售后的商品
			*/
			type: String
		}
	},
	methods: {
		shenqingshouhou(orderInfo) {
			let that = this;
			console.log(orderInfo, 'orderInfo打印_', '\n');
			that.navigateToFn({
				url:
					'/pages/my/shouhou/shenqingshouhuo?id=' +
					orderInfo.id +
					'&tui_bh=' +
					(that.type == 'all' ? orderInfo.tui_bh : '') +
					''
			});
		},
		cancelFn(id) {
			let that = this;
			uni.showModal({
				title: '取消订单',
				async success(e) {
					if (e.confirm) {
						let result = await that.$request({
							url: '/api/order/qx_order',
							data: {
								id
							}
						});
						uni.showToast({
							icon: 'success'
						});
						that.$emit('refreshFn');
					}
				}
			});
		},
		querenshouhuo(ord_id) {
			let that = this;
			uni.showModal({
				title: '确认收货',
				async success(e) {
					if (e.confirm) {
						let result = await that.$request({
							url: '/api/order/confirm',
							data: {
								ord_id
							}
						});
						console.log(result, 'ookkk 26');
						that.$emit('refreshFn');
					}
				}
			});
		},
		cancelCommitFn(id) {
			let that = this;
			uni.showModal({
				title: '撤销售后申请',
				async success(e) {
					if (e.confirm) {
						console.log('取消售后申请', id);
						let result = await that.$request({
							url: '/api/order/che_tui_apply',
							data: {
								tui_bh: id
							}
						});
						that.$emit('refreshFn');
						console.log(result, '结果31');
					}
				}
			});
		}
	},
	computed: {
		// 是否显示售后按钮
		isShowAfterSaleBtn() {
			let that = this;
			let orderInfo = assertObject(that.orderInfo);
			if (orderInfo.refund_statusId == 9) {
				return false;
			} else {
				if (
					orderInfo.refund_status == '待审核' ||
					orderInfo.refund_status == '退款成功' ||
					orderInfo.refund_status == '已撤销' ||
					orderInfo.refund_status == '后台退款' ||
					orderInfo.not_allow_refund == 1
				) {
					return false;
				} else {
					return true;
				}
			}
		},
		/*
		// 付完款,骑手未接单。用户在客户端取消订单 不显示底部可以操作的按钮
		isShowBottomBtn() {
			let that = this;
			let orderInfo = assertObject(that.orderInfo);
			if (orderInfo.refund_statusId == 9) {
				return false;
			}
			return true;
		}
		 */
	}
};
</script>

<style lang="scss" scoped>
.card-item-block {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 20rpx;
	margin-bottom: 20rpx;
	background: #ffffff;

	.goods-block {
		height: 288rpx;
		border-top: 1px solid #f8f8f8;
		border-bottom: 1px solid #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-list-block-wrap {
			width: 100%;
			height: 205rpx;
			overflow: hidden;
			.goods-list-block {
				font-size: 0;
				width: 100%;
				white-space: nowrap;
				overflow-x: auto;
				height: 225rpx;
				.image-block {
					display: inline-block;
					margin: 20rpx 20rpx 20rpx 0;
					width: 165rpx;
					height: 165rpx;
				}
			}
		}

		.price-info {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: $grey1-color;
			font-size: 26rpx;

			text {
				font-weight: 600;
			}
		}
	}

	.top-bar,
	.btn-block {
		height: 86rpx;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.time-block {
			font-size: 20rpx;
			color: $grey2-color;
		}

		.state {
			font-size: 26rpx;
			color: #ff6128;
		}
	}

	.btn-block {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.btn-block-box {
			@include flex-center;
			width: 160rpx;
			height: 64rpx;
			margin-left: 0.5em;
			border-radius: 10rpx;
			font-size: 26rpx;
			color: #ffffff;
			border: 1px solid transparent;

			&.greyStyle {
				color: $grey1-color;
				border: 1px solid #efefef;
			}
		}
	}
}
</style>
