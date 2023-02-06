<!-- 预售商品多规格弹框 -->
<template>
	<view class="goods-spec-wrap" v-show="isShow" @click.stop="closeFn">
		<view class="spec-box" @click.stop="catchTouchMove">
			<view class="icon-clone-btn" @click.stop="closeFn">
				<view class="iconfont icon-jia" style="color: #888888; font-size: 40rpx;"></view>
			</view>
			<view class="goods-detail-block">
				<view class="left-image-wrap"><img-bg-css :src="currentGoodsImages"></img-bg-css></view>

				<view class="right-goods-description-block">
					<view class="goods-name">{{ goodsName }}</view>

					<view class="goods-description">
						<view class="goods-description-text">{{ goodsDescription }}</view>
					</view>

					<view class="goods-price-block">
						<view class="text-title">预售全款:</view>
						<view class="goods-price">¥{{ preSaleTotalPrice | filterTransNum }}</view>
					</view>

					<view class="goods-price-block">
						<view class="text-title">定金:</view>
						<view class="goods-price">¥{{ preSaleDingJin | filterTransNum }}</view>
						<view
							class="reduce-price-wrap border-radius"
							:style="{ background: configInfo.web_site_color }"
							v-if="preSaleReduceMoney > 0"
						>
							<view class="reduce-price-title">付定金立减</view>
							<view class="reduce-price">¥{{ preSaleReduceMoney | filterTransNum }}</view>
						</view>
					</view>

					<view class="selected-text">已选择: {{ specKeyStr }}</view>
				</view>
			</view>

			<view class="spec-block">
				<view class="spec-item" v-for="(item, index) in goodsSpecSelectItemList" :key="item.id">
					<view class="spec-item-title">{{ item.name }}:</view>
					<view class="spec-item-values">
						<view
							v-for="(specFilterItem, specFilterIndex) in item.item"
							:key="specFilterItem.id"
							:class="['spec-item-values-item', specFilterItem.active ? 'act' : '']"
							@click.stop="setSpecFilterItemActiveFn(index, specFilterIndex)"
						>
							{{ specFilterItem.name }}
						</view>
					</view>
				</view>
			</view>
			<view class="buy-num">
				<view class="title-text">
					<view class="title">数量</view>
					<view class="limit-tips" v-if="historyLimit > 0">
						(历史限购{{ historyLimit }}{{ currentgoodsUnit }})
					</view>
				</view>
				<view class="control-block">
					<view
						class="iconfont icon-jianshao"
						:style="{
							color: calcJianBtnStyle,
							fontSize: '30rpx',
							background: '#ffffff',
							border: `1px solid ${calcJianBtnStyle}`
						}"
						@click="setBuyNumFn('-')"
					></view>
					<input class="input-dom" type="number" v-model="buyNum" @blur="inputBlurFn" />
					<view
						class="iconfont icon-jia"
						:style="{
							color: '#ffffff',
							fontSize: '30rpx',
							background: calcAddBtnBackground,
							border: 'none'
						}"
						@click="setBuyNumFn('+')"
					></view>
				</view>
			</view>

			<view class="commit-btn-block">
				<view
					v-if="currentgoodsCount > 0"
					:class="['commit-btn', isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color }"
					@click="commitClickFn"
				>
					确定
				</view>
				<view v-else class="commit-btn" :style="{ background: '#ff5446' }">库存不足</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cloneFn, assertObject, assertArray, assertString, transNumFn, bigMinus, bigPlus } from '@/tools/tools.js';
import { one, all } from '../const.js';
export default {
	props: {
		// 是否显示该组件 (选择框)
		isShow: {
			type: Boolean
		},
		// 多规格 笛卡尔积项对应的 商品 信息
		goodsSpecRowsList: {
			type: [Object, Array]
		},
		// 多规格项
		goodsSpecSelectItemList: {
			type: [Object, Array]
		},
		// 多规格商品名字
		goodsName: {
			type: String
		},
		// 多规格商品描述
		goodsDescription: {
			type: String
		},
		// 预售商品详情页面轮播图 当规格对应的图片没设置用这个默认的
		goodsImages: {
			type: String
		},
		// 商品单位
		goodsUnit: {
			type: String
		},
		// 商品id
		goodsId: {
			type: [String, Number]
		},
		// 预售商品的多规格 是否使用统一的 预售费用 使用统一all  使用规格里设置的one
		skuType: {
			type: String,
			default: ''
		},
		// 引用组件的页面 是  yvshou  预售商品详情页面 展示预售的信息
		page: {
			type: String
		},
		// 底部的商品规格数据
		bottomGoodsSpecRowsList: {
			type: Object,
			default: {}
		},
		// 历史限购
		historyLimit: {
			type: Number
		}
	},
	data() {
		return {
			buyNum: 1
		};
	},
	methods: {
		// 挑选规格 改变选中状态
		setSpecFilterItemActiveFn(index, specFilterIndex) {
			let that = this;
			that.$emit('setSpecFilterItemActiveFn', {
				index,
				specFilterIndex
			});
			console.log('emit-setSpecFilterItemActiveFn-arg', index, specFilterIndex);
		},
		// 关闭规格框
		closeFn() {
			let that = this;
			that.$emit('setGoodsSpec', false);
		},
		// 设置购买数量
		setBuyNumFn(flag) {
			let that = this;
			if (that.currentgoodsCount <= 0) {
				return false;
			}
			if (flag == '+') {
				// 超过库存后不能添加
				if (that.buyNum >= that.currentgoodsCount) {
					that.buyNum = that.currentgoodsCount;
					return false;
				}
				that.buyNum++;
			} else if (flag == '-') {
				if (that.buyNum <= 1) {
					that.buyNum = 1;
				} else {
					that.buyNum--;
				}
			}
		},
		// 光标失焦
		inputBlurFn(e) {
			let that = this;
			if (that.currentgoodsCount <= 0) {
				that.buyNum = 1;
				return false;
			}
			let buyNum = transNumFn(e.detail.value);
			if (buyNum <= 1) {
				buyNum = 1;
			}

			if (buyNum > that.currentgoodsCount) {
				buyNum = that.currentgoodsCount;
			}
			that.buyNum = buyNum;
			console.log(that.buyNum);
		},
		// 确定提交
		commitClickFn() {
			let that = this;
			if (that.historyLimit != 0 && that.currentSkuPreSale.alreadyBuyCount >= that.historyLimit) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '超过限购数量',
					success(e) {
						//确认后的回调
						console.log(e);
						that.closeFn();
					}
				});
				return false;
			}
			that.$emit('commitClickFn', {
				buyNum: that.buyNum,
				currentgoodsSkuId: that.currentgoodsId,
				preSaleDingJin: that.preSaleDingJin,
				currentgoodsCount: that.currentgoodsCount,
				weikuan: that.preSaleWeikuan,
				currentGoodsImages: that.currentGoodsImages,
				preSaleTotalPrice: that.preSaleTotalPrice,
				specKeyStr: that.specKeyStr,
			});
		}
	},
	watch: {
		isShow(newStatus) {
			if (newStatus) {
				this.buyNum = 1;
			}
			console.log(`当前newStatus状态${newStatus},当前buyNum${this.buyNum}`);
		},
		goodsSpecSelectItemList() {
			console.log(this.currentSkuPreSale, this.currentSkuGoods);
		}
	},
	computed: {
		// 当前选中规格的文字描述
		specKeyStr() {
			let that = this;
			let activeKey = [];
			let goodsSpecSelectItemList = assertArray(that.goodsSpecSelectItemList);

			goodsSpecSelectItemList.forEach(item => {
				assertArray(assertObject(item).item).forEach(it => {
					if (it.active) {
						activeKey.push(it.name);
					}
				});
			});
			return activeKey.join('+');
		},

		// 当前选中规格 所对应的商品信息
		currentSkuGoods() {
			let that = this;
			let activeKey = [];
			that.goodsSpecSelectItemList.forEach(item => {
				assertArray(assertObject(item).item).forEach(it => {
					if (it.active) {
						activeKey.push(it.id);
					}
				});
			});
			let activeKeyStr = (() => {
				if (Object.keys(cloneFn(that.bottomGoodsSpecRowsList)).includes(activeKey.join('_'))) {
					return (activeKeyStr = activeKey.join('_'));
				} else {
					return (activeKeyStr = activeKey.reverse().join('_'));
				}
			})();
			return assertObject(that.bottomGoodsSpecRowsList[activeKeyStr]);
		},
		// 当前多规格弹窗的商品图片
		currentGoodsImages() {
			let that = this;
			let imageSrc = assertString(assertObject(that.currentSkuGoods).spec_image);
			if (imageSrc) {
				return that.addimgPathHostFn(imageSrc);
			}
			return that.goodsImages;
		},

		// 当前选中规格的id (用来加入到购物车里的id)
		currentgoodsId() {
			let that = this;
			return assertObject(that.currentSkuGoods).id;
		},
		// 当前选中规格的库存
		currentgoodsCount() {
			let that = this;
			return transNumFn(assertObject(that.currentSkuGoods).store_count);
		},
		// 当前选中规格 所对应的商品预售信息
		currentSkuPreSale() {
			let that = this;
			if (that.skuType == one) {
				let goodsSpecSelectItemList = assertArray(that.goodsSpecSelectItemList);
				let activeKey = [];
				goodsSpecSelectItemList.forEach(item => {
					assertArray(assertObject(item).item).forEach(it => {
						if (it.active) {
							activeKey.push(it.id);
						}
					});
				});
				return assertObject(that.goodsSpecRowsList[activeKey.join('_')]);
			} else if (that.skuType == all) {
				return assertObject(that.goodsSpecRowsList[0]);
			}
		},
		// 当前多规格弹窗的商品立减金额
		preSaleReduceMoney() {
			let that = this;
			return transNumFn(assertObject(that.currentSkuPreSale).reduce_money);
		},
		// 当前多规格弹窗的商品定金
		preSaleDingJin() {
			let that = this;
			return transNumFn(assertObject(that.currentSkuPreSale).deposit);
		},
		// 当前多规格弹窗的商品预售全款
		preSaleTotalPrice() {
			let that = this;
			return transNumFn(assertObject(that.currentSkuPreSale).total_presale_price);
		},
		/*
			@description
				根据预售总价 和 定金 和 立即金额 返回 尾款
			@return <Number>
				返回 尾款
		*/
		preSaleWeikuan() {
			let that = this;
			return transNumFn(bigMinus(that.preSaleTotalPrice, bigPlus(that.preSaleReduceMoney, that.preSaleDingJin)));
		},
		// 当前多规格弹窗的商品已购买数量
		beforeBuyNum() {
			let that = this;
			return transNumFn(assertObject(that.currentSkuPreSale).alreadyBuyCount);
		},
		// 当前选中规格的单位
		currentgoodsUnit() {
			let that = this;
			return assertObject(that.currentSkuPreSale).unit;
		},
		// 网购物车里添加 的按钮背景色
		// 购买数量 加 按钮的样式
		calcAddBtnBackground() {
			let that = this;
			if (that.currentgoodsCount <= 0 || that.buyNum >= that.currentgoodsCount) {
				return '#888888';
			}
			return that.configInfo.web_site_color;
		},
		// 网购物车里添加 的按钮背景色
		// 购买数量 减 按钮的样式
		calcJianBtnStyle() {
			let that = this;
			if (that.currentgoodsCount <= 0 || that.buyNum <= 1) {
				return '#888888';
			}
			return that.configInfo.web_site_color;
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-spec-wrap {
	position: fixed;
	z-index: 900;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	font-size: 0;

	.spec-box {
		position: absolute;
		bottom: 0;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background: #ffffff;
		overflow: hidden;

		.icon-clone-btn {
			display: inline-block;
			position: absolute;
			top: 20rpx;
			right: 30rpx;

			.iconfont {
				transform: rotate(45deg);
			}
		}

		.goods-detail-block {
			display: flex;
			justify-content: space-between;
			padding: 40rpx 40rpx 0;

			.left-image-wrap {
				margin-right: 28rpx;
				width: 170rpx;
				height: 170rpx;
				border: 1px solid #e3e2e1;
			}

			.right-goods-description-block {
				width: 472rpx;
				height: 178rpx;

				.goods-name {
					padding-right: 24rpx;
					// height: 72rpx;
					height: 36rpx;
					line-height: 1.4;
					font-size: 26rpx;
					color: #374050;
					font-weight: bold;

					text-overflow: ellipsis;
					/*设置溢出显示类型为...*/
					-webkit-line-clamp: 1;
					/*设置显示的行数*/
					overflow: hidden;
					/*隐藏多于行*/
					display: -webkit-box;
					/*将对象作为弹性伸缩盒子模型显示*/
					-webkit-box-orient: vertical;
				}

				.goods-description {
					display: flex;
					align-items: center;
					width: 100%;
					height: 36rpx;

					.goods-description-text {
						width: 100%;
						font-size: 22rpx;
						color: #91939c;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}
				.goods-limit {
					display: flex;
					align-items: center;
					width: 100%;
					height: 36rpx;

					.goods-limit-text {
						width: 100%;
						font-size: 22rpx;
						color: #91939c;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
				}

				.goods-price-block {
					display: flex;
					align-items: center;
					height: 40rpx;
					.text-title {
						margin-right: 10rpx;
						font-size: 25rpx;
						color: #91939c;
					}
					.goods-price {
						margin-right: 10rpx;
						color: #eb3c39;
						font-weight: bold;
						font-size: 28rpx;
					}

					.reduce-price-wrap {
						display: flex;
						align-items: center;
						margin-left: 10rpx;
						padding: 0 10rpx;
						height: 42rpx;
						color: #ffffff;

						.reduce-price-title {
							display: inline-block;
							margin-right: 6rpx;
							font-size: 22rpx;
						}
						.reduce-price {
							display: inline-block;
							font-size: 30rpx;
							font-weight: 600;
						}
					}
				}

				.selected-text {
					height: 40rpx;
					color: #393939;
					font-size: 26rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}

		.spec-block {
			margin: 20rpx 40rpx 0;
			width: 670rpx;
			max-height: 384rpx;
			overflow-x: hidden;

			.spec-item {
				.spec-item-title {
					display: block;
					width: 100%;
					font-size: 30rpx;
					color: #2a2a2a;
					line-height: 60rpx;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				.spec-item-values {
					display: block;
					margin-bottom: 10rpx;
					width: 100%;
					background: #ffffff;

					.spec-item-values-item {
						display: inline-block;
						margin-top: 14rpx;
						margin-bottom: 14rpx;
						margin-right: 20rpx;
						padding: 0 30rpx;
						max-width: 96%;
						color: #636363;
						background: #f5f5f5;
						height: 50rpx;
						line-height: 50rpx;
						font-size: 30rpx;
						border-radius: 1000px;
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;

						&.act {
							color: #6bb936;
							border: 1px solid #4fab0f;
							background: #ffffff;
						}
					}
				}
			}
		}

		.buy-num {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 40rpx;
			height: 100rpx;
			&.pintuan-page,
			&.jifen-page {
				visibility: hidden;
				opacity: 0;
			}

			.title-text {
				display: inline-block;
				.title {
					display: inline-block;
					font-size: 30rpx;
					color: #2a2a2a;
					line-height: 50rpx;
					white-space: nowrap;
					opacity: hidden;
				}
				.limit-tips {
					display: inline-block;
					margin-left: 10rpx;
					font-size: 28rpx;
					color: #8f9092;
					line-height: 50rpx;
					white-space: nowrap;
					opacity: hidden;
				}
			}

			.control-block {
				display: flex;

				.iconfont {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 48rpx;
					height: 48rpx;

					border-radius: 50%;
					border: 1px solid #888888;
				}

				.input-dom {
					margin: 0 10rpx;
					width: 70rpx;
					font-size: 30rpx;
					text-align: center;
				}
			}
		}
	}

	.commit-btn-block {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 116rpx;
		border-top: 1px solid #eeeeee;

		.commit-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 672rpx;
			height: 88rpx;
			background: #6bb836;
			font-size: 32rpx;
			color: #ffffff;
			border-radius: 1000px;

			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
}
</style>
