<!-- 商品多规格弹框 -->
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

					<view class="goods-limit">
						<view v-if="currentgoodsLimit > 0" class="goods-limit-text">
							单次限购{{ currentgoodsLimit }}{{ currentgoodsUnit }}
						</view>
					</view>

					<view class="goods-description">
						<view class="goods-description-text">{{ goodsDescription }}</view>
					</view>

					<view class="goods-jifen-block" v-if="calcIsJiFenPage">
						<view class="goods-jifen">{{ currentgoodsJifen }}积分</view>
					</view>

					<view class="goods-pintuan-block" v-else-if="calcIsPinTuanPage">
						<view class="goods-price">¥{{ currentgoodsPrice | filterTransNum }}</view>
						<vip-price v-if="currentgoodsIsVipPrice">
							{{ currentgoodsVipMarketPrice | filterTransNum }}
						</vip-price>
						<view v-else class="goods-price-line">¥{{ currentgoodsVipMarketPrice | filterTransNum }}</view>
					</view>

					<view class="goods-price-block" v-else>
						<view class="goods-price">¥{{ currentgoodsPrice | filterTransNum }}</view>
						<vip-price v-if="currentgoodsIsVipPrice">
							{{ currentgoodsVipMarketPrice | filterTransNum }}
						</vip-price>
						<view v-else class="goods-price-line">¥{{ currentgoodsVipMarketPrice | filterTransNum }}</view>
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

			<view
				class="buy-num"
				:class="[calcIsJiFenPage ? 'jifen-page' : '', calcIsPinTuanPage ? 'pintuan-page' : '']"
			>
				<view class="title-text">
					<view class="title">数量</view>

					<view class="limit-tips" v-if="currentgoodsHistoryLimit > 0">
						(历史限购{{ currentgoodsHistoryLimit }}{{ currentgoodsUnit }})
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

			<view class="commit-btn-block" @click="commitClickFn">
				<view
					v-if="currentgoodsCount > 0"
					:class="['commit-btn', isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color }"
				>
					确定
				</view>

				<view v-else class="commit-btn" :style="{ background: '#ff5446' }">库存不足</view>
			</view>
		</view>
	</view>
</template>

<script>
import { cloneFn, assertObject, assertArray, assertString, transNumFn } from '@/tools/tools.js';
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
		// 多规格商品图片地址
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
		// 该商品已加入到购物车的数量
		selectedNum: {
			type: [String, Number]
		},
		// 引用组件的页面 是  gouwuche  购物车页面 加入成功后  更新购物车列表
		// 引用组件的页面 是  jifen-page  积分兑换详情页面 不展示价格 展示需要的积分
		// 引用组件的页面 是  yvshou  预售商品详情页面 展示预售的信息
		page: {
			type: String
		}
	},
	data() {
		return {
			currentGoodsImages: '', // 当前选中规格的商品图片
			currentgoodsVipMarketPrice: '', // 当前选中规格的划线价 or 会员价
			currentgoodsPrice: '', // 当前选中规格的售卖价钱

			buyNum: 1, // 购买的数量

			currentgoodsCount: '', // 当前选中规格的库存
			currentgoodsId: '', // 当前选中规格的id (用来加入到购物车里的id)

			currentgoodsIsVipPrice: false, // 当前选中规格是否 是 vip价格

			currentgoodsJifen: 0, // 积分兑换商品的积分数

			currentgoodsLimit: 0, // 单次限购的数量
			currentgoodsHistoryLimit: 0, // 历史限购的数量
			currentgoodsUnit: '' // 当前选中规格的单位
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
		// 添加到购物车
		async commitClickFn() {
			let that = this;
			// 库存为0
			if (that.currentgoodsCount <= 0) {
				uni.showToast({
					icon: 'none',
					title: '库存不足'
				});
				return false;
			}
			// 购买的数量比库存多
			if (that.buyNum > that.currentgoodsCount) {
				uni.showToast({
					icon: 'none',
					title: `库存不足`
				});
				that.buyNum = 1;
				return false;
			}
			let selectedNum = transNumFn(that.selectedNum);

			if (that.calcIsJiFenPage) {
				that.$emit('commitSpec', {
					currentgoodsId: that.currentgoodsId,
					currentgoodsJifen: that.currentgoodsJifen,
					specKeyStr: that.specKeyStr
				});
				return false;
			} else if (that.calcIsPinTuanPage) {
				that.$emit('commitSpec', {
					currentgoodsId: that.currentgoodsId,
					currentgoodsPinPrice: that.currentgoodsPrice,
					specKeyStr: that.specKeyStr
				});
				return false;
			}

			that.hideAllFn();
			uni.showLoading({});

			let result = await that.addShoppingCartFn(that.goodsId, that.buyNum, that.currentgoodsId);
			console.log('多规格添加到购物车返回的数据', result);
			console.log(
				'没买之前的数量',
				selectedNum,
				'新加入到购物车的数量',
				that.buyNum,
				'加一块的数',
				selectedNum + transNumFn(that.buyNum)
			);
			that.hideAllFn();
			if (result.type != 'success') {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: result.msg,
					success(e) {}
				});
				return false;
			}
			that.$emit('setGoodsSpec', false);
			that.changeView(selectedNum + transNumFn(that.buyNum)); // 添加购物车后 的数量
			uni.showToast({
				icon: 'success',
				title: '加入购物车成功'
			});

			if (that.page == 'gouwuche') {
				that.$emit('emitGetCartListFn');
			} else {
				that.setTabBarCartNumFn();
			}
			that.buyNum = 1;
		},
		// 改变视图
		changeView(selectedNum) {
			let that = this;
			console.log('changeView emit');
			uni.$emit('goodsAddCartEd', {
				goodsId: that.goodsId,
				selectedNum
			});
		}
	},
	watch: {
		goodsSpecSelectItemList(goodsSpecSelectItemList) {
			let that = this;
			console.log('watch-run');

			let activeKey = [];
			goodsSpecSelectItemList.forEach(item => {
				item.item.forEach(it => {
					if (it.active) {
						activeKey.push(it.id);
					}
				});
			});
			let currentSpecGoods = assertObject(that.goodsSpecRowsList[activeKey.join('_')]);

			console.log('watch-goodsSpecSelectItemList-currentSpecGoods', currentSpecGoods);

			that.currentGoodsImages = that.addimgPathHostFn(currentSpecGoods.spec_image || that.goodsImages); // 当前选中规格的商品图片

			// 积分页面
			if (that.calcIsJiFenPage) {
				that.currentgoodsJifen = currentSpecGoods.exchange_score; // 当前选中规格的积分数
				// 拼团页面
			} else if (that.calcIsPinTuanPage) {
				that.currentgoodsVipMarketPrice = currentSpecGoods.shop_price; // 当前选中规格的划线价or 会员价
				that.currentgoodsPrice = currentSpecGoods.pinprice; // 当前选中规格的拼团价
				// 普通页面
			} else {
				that.currentgoodsVipMarketPrice = currentSpecGoods.vip_market_price; // 当前选中规格的划线价or 会员价
				that.currentgoodsPrice = currentSpecGoods.shop_price; // 当前选中规格的售卖价
				that.currentgoodsLimit = currentSpecGoods.person_limit_single; // 当前选中规格的单次限购
				that.currentgoodsHistoryLimit = currentSpecGoods.person_limit_sum; // 当前选中规格的历史限购

				that.currentgoodsUnit = currentSpecGoods.unit; // 当前选中规格的单位
			}

			that.currentgoodsCount = transNumFn(currentSpecGoods.store_count); // 当前选中规格的库存
			that.currentgoodsId = currentSpecGoods.id; // 当前选中规格的id (用来加入到购物车里的id)

			that.currentgoodsIsVipPrice = currentSpecGoods.is_vip_price == 1; // 当前选中规格是否 是 vip价格

			if (that.currentgoodsCount >= 1 && that.buyNum >= that.currentgoodsCount) {
				that.buyNum = that.currentgoodsCount;
			}
			if (that.currentgoodsCount <= 0) {
				that.buyNum = 1;
			}
		},
		isShow(newStatus) {
			if (newStatus) {
				this.buyNum = 1;
			}
			console.log(`当前newStatus状态${newStatus},当前buyNum${this.buyNum}`);
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
		/*
			@description
				当前要购买的数量 是否 超过库存数
			@return <Boolean>
				超过返回true
				没超过返回false
			函数保留 暂时页面没用
		*/
		goodsCountIsMax() {
			let that = this;
			if (that.buyNum > that.currentgoodsCount) {
				return true;
			}
			return false;
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
		},
		/*
			@description
				是否是积分详情页面 
			@return <Boolear>
				是积分详情页面    返回true
				不是积分详情页面  返回false
		*/
		calcIsJiFenPage() {
			let that = this;
			return that.page == 'jifen-page';
		},
		/*
			@description
				是否是拼团商品页面 
			@return <Boolear>
				是拼团商品页面    返回true
				不是拼团商品页面  返回false
		*/
		calcIsPinTuanPage() {
			let that = this;
			return that.page == 'pintuan-page';
		},
		/*
			@description
				是否是预售商品详情页面 
			@return <Boolear>
				是预售商品详情页面    返回true
				不是预售商品详情页面  返回false
		*/
		calcIsPreSale() {
			let that = this;
			return that.page == 'yvshou';
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-spec-wrap {
	position: fixed;
	z-index: 850;
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

				.goods-pintuan-block,
				.goods-price-block {
					display: flex;
					align-items: center;
					height: 40rpx;

					.goods-price {
						margin-right: 10rpx;
						color: #eb3c39;
						font-weight: bold;
						font-size: 28rpx;
					}

					.goods-price-line {
						font-size: 24rpx;
						color: #91939c;
						text-decoration: line-through;
					}
				}
				.goods-jifen-block {
					display: flex;
					align-items: center;
					height: 40rpx;
					.goods-jifen {
						margin-right: 10rpx;
						color: #eb3c39;
						font-weight: bold;
						font-size: 28rpx;
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
				color: transparent !important;
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
