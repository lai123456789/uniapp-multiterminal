<template>
	<view class="page">
		<view class="cancel-block">
			<view class="content-wrap">
				<view class="cancel-content border-radius20">
					<view class="before" :style="{ background: configInfo.web_site_color }"></view>
					<view class="h3-block">
						<view class="h3-1">申请售后</view>
						<view class="h3-2">若您使用了优惠券，将返回到账户</view>
					</view>
					<view class="h4">请选择售后商品</view>
					<view class="my-goods-block">
						<view
							class="item"
							v-for="(item, index) in goods"
							:key="index"
							@click="selectGoodsFn(item, index)"
						>
							<view class="goods-image-block">
								<view class="zzc" v-if="item.is_selected == 0">
									<view class="text">{{ item.not_allow_refund }}</view>
								</view>
								<image :src="item.original_img"></image>
							</view>
							<view class="goods-description-block">
								<view class="goods-name">{{ item.goods_name }}</view>

								<view class="goods-description" v-if="item.goods_remark && trimFn(item.goods_remark)">
									{{ item.goods_remark }}
								</view>
								<view class="goods-tab-block">
									<view class="tag-block" v-if="item.tag_name && trimFn(item.tag_name)">
										{{ item.tag_name }}
									</view>
								</view>
								<view class="goods-price">
									<view class="shop-price-block-lr">
										<view class="origin-price">
											¥
											<text>{{ item.single_price }}</text>
										</view>
									</view>
								</view>
								<view class="goods-number" v-if="item.buy_num > 1">×{{ item.buy_num }}</view>
							</view>

							<!-- 
								item.is_selected==0不显示
								
								item.is_selected!=0显示
							 -->
							<view
								class="flag-icon"
								v-if="item.is_selected != 0"
								:style="{ display: type == '修改申请' ? 'none' : 'flex' }"
							>
								<uni-icons
									v-if="item.isSelect"
									:color="configInfo.web_site_color"
									size="20"
									type="checkbox-filled"
								></uni-icons>
								<uni-icons v-else color="#91939c" size="20" type="circle"></uni-icons>
							</view>
						</view>
					</view>
					<view class="h4">请选择售后原因,并添加备注</view>
					<view class="cancel-list">
						<view class="item" v-for="(item, index) in reason" :key="index" @click="seleCtcancelFn(index)">
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

						<view class="item"><text>备注</text></view>

						<view class="textarea-block">
							<textarea maxlength="1200" class="textarea" v-model="textarea"></textarea>
						</view>
					</view>
				</view>
				<!-- 

				<navigator url="./tuikuan" class="bottom-btn-block" hover-class="none">
					<button class="pay-btn">
						提交
					</button>
				</navigator>
				 -->
				<view class="bottom-btn-block">
					<button
						class="pay-btn"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						@click="afterSaleFn"
						:style="{ background: configInfo.web_site_color }"
					>
						提交
					</button>
				</view>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>
<script>
// 工具库 相关
import { checkTypeFn } from '@/tools/tools';
export default {
	data() {
		return {
			isShowLoading: true,
			type: '',
			ordId: null,
			reason: [
				//申请退款原因
				{
					id: '',
					name: ''
				}
			],
			order: {
				//订单信息
				id: '',
				ord_bh: '', //订单编号
				status: '',
				orderstatus: '', //订单状态
				user_name: '', //收货人姓名
				user_phone: '', //收货人手机号
				address: '', //收货地址
				add_time: '', //下单时间
				peisong_time: '', //配送时间
				pay_time: '', //支付时间
				pay_type: '', //支付方式
				pay_price: '', //支付金额
				ord_price: '', //订单金额
				redpacket_sale_money: '', //红包抵扣金额
				coupon_sale_money: '', //优惠券优惠金额
				goods_sale_money: '', //商品活动优惠金额
				vip_sale_money: '', //会员优惠金额
				post_fee: '' //配送费
			},
			goods: [
				//订单的商品信息
				{
					id: '',
					original_img: '', //商品封面图
					goods_name: '', //商品名称
					tag_name: '', //标签
					single_price: '', //售价
					buy_num: '', //购买数量
					goods_id: '' //商品id
				}
			],
			textarea: '',
			templateId: []
		};
	},
	onLoad(options) {
		let that = this;
		console.log(options, '申请售后页面options', '\n');
		that = this;
		that.ordId = options.id;
		that.type = options.type;
		that.tui_bh = options.tui_bh;

		that.getApplySaleDataFn();
		console.log('售后页面');
	},
	methods: {
		// 选择售后原因 改状态
		seleCtcancelFn(ind) {
			let that = this;
			that.reason.forEach((item, index) => {
				item.isSelect = index == ind ? true : false;
			});

			// that.reason[index].isSelect = !that.reason[index].isSelect;
		},
		// 选择售后商品 改状态
		selectGoodsFn(item, index) {
			let that = this;
			if (item.is_selected != 0) {
				that.goods[index].isSelect = !that.goods[index].isSelect;
			}
		},
		// 获取退款页 数据 退款原因  退款商品
		async getApplySaleDataFn() {
			let that = this;
			let obj = {};

			if (that.type == '修改申请') {
				obj.tui_bh = that.tui_bh;
			} else {
				if (that.tui_bh) {
					obj.tui_bh = that.tui_bh;
				}
			}
			console.log(obj, '打印obj参数', '\n');

			let result = await that.$request({
				url: '/api/order/apply_sale_data',
				data: {
					id: that.ordId,
					Platform: 'wxMiniProgram',
					edit: that.type == '修改申请' ? 'yes' : 'no',
					...obj
				}
			});

			if (that.type == '修改申请') {
				obj.tui_bh = that.tui_bh;

				that.textarea = result.data.data.editSelected.tkms;
			}

			that.isShowLoading = false;

			// 售后原因列表
			result.data.data.reason.forEach((item, index) => {
				//设置选择状态

				if (that.type == '修改申请') {
					if (item.id == result.data.data.editSelected.apply_reason) {
						item.isSelect = true;
					} else {
						item.isSelect = false;
					}
				} else {
					if (index == 0) {
						item.isSelect = true;
					} else {
						item.isSelect = false;
					}
				}
			});

			that.reason = result.data.data.reason;

			// 售后商品列表
			result.data.data.goods.forEach(item => {
				//设置选择状态
				item.isSelect = false;
			});
			that.goods = result.data.data.goods;

			// 订单信息
			that.order = result.data.data.order;

			// 处理模板消息

			if (checkTypeFn(result.data.data.templateId) != 'Array') {
				result.data.data.templateId = [];
			}
			let templateId = result.data.data.templateId
				.filter(item => {
					return item.mini_status == 1;
				})
				.map(item => {
					return item.mini_template_id;
				});
			that.templateId = templateId;

			console.log(result, '结果31');
		},
		getTemplateResult() {
			let that = this;
			return new Promise((resFn, rejFn) => {
				uni.requestSubscribeMessage({
					tmplIds: that.templateId,
					success(res) {
						console.log('成功', '\n');
						resFn(res);
					},
					fail(e) {
						console.log('失败', '\n');
						rejFn(e);
					}
				});
			});
		},
		// 提交售后
		async afterSaleFn() {
			let that = this;
			// #ifdef MP-WEIXIN

			if (that.templateId.length >= 1) {
				let templateResult;
				if (that.type != '修改申请') {
					templateResult = await that.getTemplateResult();
				}
			}
			// #endif

			// 售后商品id列表
			let id = that.goods.filter(item => {
				return item.isSelect == true;
			});
			if (id.length < 1 && that.type != '修改申请') {
				uni.showToast({
					icon: 'none',
					title: '请选择要售后的商品'
				});
				return false;
			}
			id = id
				.map(item => {
					return item.goods_id;
				})
				.join(',');

			// 售后原因id
			let reason = that.reason.filter(item => {
				return item.isSelect == true;
			});

			reason = reason[0].id;
			console.log(id);

			let result;
			/* 
				 返回 商品id
				 */
			if (that.type == '修改申请') {
				result = await that.$request({
					method: 'post',
					url: '/api/order/mod_tui_apply',
					data: {
						id,
						tui_bh: that.tui_bh,
						reason,
						// ms: that.textarea ? that.textarea : '备注',
						ms: that.textarea
					}
				});
			} else {
				let id = that.goods
					.filter(item => {
						return item.isSelect == true;
					})
					.map(item => {
						return {
							goods_id: item.goods_id,
							spec_id: item.spec_id
						};
					});

				result = await that.$request({
					method: 'post',
					url: '/api/order/apply_after_sale',
					data: {
						id: JSON.stringify(id),
						ord_id: that.ordId,
						reason,
						// ms: that.textarea ? that.textarea : '备注',
						ms: that.textarea
					}
				});
			}

			if (result.data.data == 1) {
				that.navigateToFn({
					url: '/pages/my/shouhou/index',
					delta: 1,
					type: 'navigateBack'
				});
			} else {
				uni.showToast({
					title: result.data.msg,
					icon: 'none'
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
		font-size: 28rpx;
		color: $grey1-color;
		line-height: 80rpx;
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

	.textarea-block {
		padding: 20rpx;
		width: 100%;
		height: 12em;
		border: 1px solid #f8f8f8;
		border-top: none;
	}

	.textarea {
		width: 100%;
		font-size: 28rpx;
		height: 100%;
	}
}

.bottom-btn-block {
	@include flex-center;
	width: 100%;
	height: 100rpx;

	.pay-btn {
		@include btn-green;
	}
}

.my-goods-block {
	.item {
		border-top: 1px solid #f1f1f1;
		height: 220rpx;
		padding-top: 19rpx 20rpx 20rpx;
		display: flex;
		align-items: center;

		.flag-icon {
			width: 56rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}

		.goods-number {
			font-size: 22rpx;
			color: #91939c;

			margin-top: 0.2em;
			text-indent: 0.2em;
		}

		.goods-image-block {
			position: relative;
			width: 200rpx;
			height: 182rpx;
			display: flex;
			// justify-content: center;
			align-items: center;

			image {
				width: 180rpx;
				height: 180rpx;
			}

			.zzc {
				position: absolute;
				left: 0;
				top: 0;
				z-index: 1;
				width: 180rpx;
				height: 180rpx;
				background: rgba(255, 255, 255, 0.6);
				@include flex-center;
				.text {
					@include flex-center;
					padding: 20rpx;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.4);
					color: #ffffff;
					font-size: 30rpx;
				}
			}
		}

		.goods-description-block {
			width: 404rpx;
			height: 182rpx;

			.goods-name {
				font-weight: 600;
				font-size: 30rpx;
				color: $grey1-color;
				@include text-ellipsis;
			}

			.goods-description {
				height: 34rpx;
				@include text-ellipsis;
				font-size: 26rpx;
				color: $grey2-color;
			}

			.goods-tab-block {
				display: flex;
				align-items: center;
				height: 50rpx;
				overflow: hidden;
				font-size: 0;
			}

			.goods-price {
				display: flex;
				justify-content: space-between;
				@include shop-price-block-lr;
			}

			.control-block {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 160rpx;

				input {
					display: flex;
					margin: 0 10rpx;
					text-align: center;
					font-size: 26rpx;
					color: $grey1-color;
				}
			}
		}
	}
}
</style>
