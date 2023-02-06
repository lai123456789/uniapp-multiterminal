<template>
	<view class="page">
		<view class="all-goods-menu-list">
			<view class="content-wrap">
				<view class="class-goods-list">
					<block v-for="(item1, index1) in classGoodList" :key="index1">
						<!-- ↓↓↓判断是对象 -->
						<block v-if="checkTypeFn(item1.son) == 'Object'">
							<view
								class="title-block"
								:style="{ background: barStyle.bgColor, color: barStyle.textColor }"
							>
								<view class="text-block">
									<view class="h3">{{ item1.name }}</view>
									<view class="h4">{{ item1.title }}</view>
								</view>
							</view>
							<view class="goods-list-block Object">
								<scroll-view :scroll-x="true" class="scroll-view-dom" :enhanced="true" :bounces="false">
									<view class="bottom-scroll-goods-wrap">
										<view
											class="scroll-view-div"
											v-for="(item2, index2) in item1.son.goodsList"
											:key="index2"
										>
											<scroll-goods-item
												:goods-id="item2.goodsId"
												:goods-image="item2.goodsImage"
												:is-hot="item2.isHot"
												:is-new="item2.isNew"
												:goods-name="item2.goodsName"
												:goods-tag="item2.goodsTag"
												:is-vip-price="item2.isVipPrice"
												:goods-price="item2.goodsPrice"
												:vip-price="item2.vipPrice"
												:line-price="item2.linePrice"
												:selected-num="item2.selectedNum"
												:sales-sum="item2.salesSum"
												page="caichang"
												:is-spec="item2.isSpec"
												:data-is-spec="item2.isSpec"
												:tag-img="item2.tagImg"
											></scroll-goods-item>
										</view>
									</view>
								</scroll-view>
							</view>
						</block>
						<!-- ↓↓↓判断是数组 -->
						<block v-if="checkTypeFn(item1.son) == 'Array'">
							<view
								class="title-block"
								:style="{ background: barStyle.bgColor, color: barStyle.textColor }"
							>
								<view class="text-block">
									<view class="h3">{{ item1.name }}</view>
									<view class="h4">{{ item1.title }}</view>
								</view>
								<navigator
									class="navigator-btn"
									:url="'/pages/list-page/index?id=' + item1.id"
									:style="{ color: barStyle.bgColor }"
								>
									查看更多
								</navigator>
							</view>
							<view class="goods-list-block Array">
								<block
									v-for="(item2, index2) in item1.sonGoodsList"
									:key="index2"
									v-if="item2.goods.length > 0"
								>
									<view class="two-class-title" :style="{ color: barStyle.bgColor }">
										{{ item2.name }}
									</view>
									<view class="scroll-view-block_wrap">
										<scroll-view
											:scroll-x="true"
											class="scroll-view-dom"
											:enhanced="true"
											:bounces="false"
										>
											<view class="bottom-scroll-goods-wrap">
												<view
													v-for="(item3, index3) in item2.goodsList"
													:key="index3"
													class="scroll-view-div"
												>
													<scroll-goods-item
														:goods-id="item3.goodsId"
														:goods-image="item3.goodsImage"
														:is-hot="item3.isHot"
														:is-new="item3.isNew"
														:goods-name="item3.goodsName"
														:goods-tag="item3.goodsTag"
														:is-vip-price="item3.isVipPrice"
														:goods-price="item3.goodsPrice"
														:vip-price="item3.vipPrice"
														:line-price="item3.linePrice"
														:selected-num="item3.selectedNum"
														:sales-sum="item3.salesSum"
														page="caichang"
														:is-spec="item3.isSpec"
														:data-is-spec="item3.isSpec"
														:tag-img="item3.tagImg"
													></scroll-goods-item>
												</view>
											</view>
										</scroll-view>
									</view>
								</block>
							</view>
						</block>
					</block>
				</view>
			</view>
		</view>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn"></login-fn>
		
		<loading-css :is-show="isShowLoading"></loading-css>
		<goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="currentGoodsName"
			:goods-description="currentGoodsDescription"
			:goods-images="currentGoodsImages"
			:goods-id="currentGoodsId"
			:selected-num="currentGoodsSelectedNum"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
		></goods-spec>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { checkTypeFn, assertArray, cloneFn, addSpecFilterItemActAttrFn } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			classGoodList: [], // 菜场页面 的 商品数据

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '', // 当前弹窗多规格的商品即加入到购物车里的数量
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onUnload() {
		uni.$off('goodsAddCartEd_caichangIndex');
	},
	onLoad() {
		let that = this;
		uni.$off('goodsAddCartEd_caichangIndex');
		uni.$on('goodsAddCartEd_caichangIndex', arg => {
			console.log('emit 的数据', arg);
			let { selectedNum, goodsId } = arg;

			that.classGoodList.forEach(item => {
				if (checkTypeFn(item.son) == 'Object') {
					item.son.goodsList.forEach(goodsItem => {
						if (goodsItem.goodsId == goodsId) {
							goodsItem.selectedNum = selectedNum;
						}
					});
				} else {
					item.sonGoodsList.forEach(classItem => {
						classItem.goodsList.forEach(goodsItem => {
							if (goodsItem.goodsId == goodsId) {
								goodsItem.selectedNum = selectedNum;
							}
						});
					});
				}
			});
		});
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});

		that.getCaiChangFn();
		let title = that.caiChangOptions.caichangTitleText || '菜场';
		uni.setNavigationBarTitle({
			title
		});

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			let currentGoods;

			that.classGoodList.forEach(item => {
				if (checkTypeFn(item.son) == 'Object') {
					item.son.goodsList.forEach(goodsItem => {
						if (goodsItem.goodsId == goodsId) {
							currentGoods = goodsItem;
						}
					});
				} else {
					item.sonGoodsList.forEach(classItem => {
						classItem.goodsList.forEach(goodsItem => {
							if (goodsItem.goodsId == goodsId) {
								currentGoods = goodsItem;
							}
						});
					});
				}
			});

			/*

			if (goodsId == that.currentGoodsId) {
				that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量
				that.isShowGoodsSpec = true;
				return false;
			}
			*/
			that.currentGoodsId = goodsId;
			uni.showLoading({});

			console.log('当前点击商品的信息currentGoods', currentGoods);

			that.currentGoodsName = currentGoods.goodsName; // 当前弹窗多规格的商品名字
			that.currentGoodsDescription = currentGoods.goodsDescription; // 当前弹窗多规格的商品描述
			that.currentGoodsImages = currentGoods.goodsImage; // 当前弹窗多规格的商品图片

			that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量

			let result = await that.getSpecInfoFn(that.currentGoodsId);
			if (result.type != 'success') {
				that.hideAllFn();
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: result.msg,
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}

			that.goodsSpecSelectItemList = result.result.goodsSpecSelectItemList;
			that.goodsSpecRowsList = result.result.goodsSpecRowsList;

			console.log(`${that.currentGoodsId} 商品的规格信息`, result);

			that.isShowGoodsSpec = true;
			that.hideAllFn();
		});
	},
	computed: {
		// 处理 标题栏的 背景颜色 和 字体颜色
		barStyle() {
			let that = this;
			let bgColor, textColor;
			bgColor = that.caiChangOptions.vege_color
				? that.caiChangOptions.vege_color
				: this.configInfo.web_site_color;
			textColor = that.caiChangOptions.vege_text_color ? that.caiChangOptions.vege_text_color : '#ffffff';
			return {
				bgColor,
				textColor
			};
		},
		...mapState({
			caiChangOptions: store => store.home.caiChangOptions // 菜场模块 信息 和 样式配置
		})
	},
	methods: {
		checkTypeFn(item) {
			return checkTypeFn(item);
		},
		refreshFn() {
			this.getCaiChangFn();
		},
		// 获取菜场页面商品数据
		async getCaiChangFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Foodmarket/categoryGoods'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultData = assertArray(result.data.data);

					resultData.forEach(item => {
						if (checkTypeFn(item.son) == 'Object') {
							item.son.goodsList = cloneFn(item.son.goods).map(item => {
								return {
									goodsId: item.goods_id, // 商品id
									goodsImage: item.original_img, // 商品图片
									isHot: item.is_hot == 1, // 是否热销爆款
									isNew: item.is_new == 1, // 是否新品
									goodsName: item.goods_name, // 商品名字
									isVipPrice: item.is_vip_price == 1, // 是否会员专享
									goodsPrice: item.shop_price, // 商品价格
									vipPrice: item.vip_market_price, // vip专享价
									linePrice: item.vip_market_price, // 划线价
									goodsTag: item.tag_name, // 商品标签
									selectedNum: item.selectedNum, // 加入到购物车里的数量
									salesSum: item.sales_sum, // 商品已售的数量
									isSpec: item.is_guige == 1, // 商品是否多规格
									tagImg: item.top_left_tag_img // 商品左上的图片标签
								};
							});
						} else {
							item.sonGoodsList = cloneFn(item.son).map(item => {
								let cloneItem = cloneFn(item);

								let goods = cloneFn(cloneItem.goods);
								cloneItem.goodsList = goods.map(goodsItem => {
									return {
										goodsId: goodsItem.goods_id, // 商品id
										goodsImage: goodsItem.original_img, // 商品图片
										isHot: goodsItem.is_hot == 1, // 是否热销爆款
										isNew: goodsItem.is_new == 1, // 是否新品
										goodsName: goodsItem.goods_name, // 商品名字
										isVipPrice: goodsItem.is_vip_price == 1, // 是否会员专享
										goodsPrice: goodsItem.shop_price, // 商品价格
										vipPrice: goodsItem.vip_market_price, // vip专享价
										linePrice: goodsItem.vip_market_price, // 划线价
										goodsTag: goodsItem.tag_name, // 商品标签
										selectedNum: goodsItem.selectedNum, // 加入到购物车里的数量
										salesSum: goodsItem.sales_sum, // 商品已售的数量
										isSpec: goodsItem.is_guige == 1, // 商品是否多规格
										tagImg: goodsItem.top_left_tag_img // 商品左上的图片标签
									};
								});

								return cloneItem;
							});
						}
					});
					console.log('组合完的数据', resultData);

					that.classGoodList = resultData;
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
		},

		// ↓↓↓ 多规格相关方法 --------------------------------------------------------
		// 设置规格框的显示隐藏
		setGoodsSpec(bool) {
			let that = this;
			that.isShowGoodsSpec = bool;
			if (!bool) {
				that.goodsSpecSelectItemList = addSpecFilterItemActAttrFn(cloneFn(that.goodsSpecSelectItemList));
			}
		},
		// 选择规格项 改变展示 状态
		setSpecFilterItemActiveFn(arg) {
			let that = this;
			let { index, specFilterIndex } = arg;

			console.log('外部列表修改', index, specFilterIndex);

			let goodsSpecSelectItemList = cloneFn(that.goodsSpecSelectItemList);

			goodsSpecSelectItemList.forEach((item, inde) => {
				if (inde == index) {
					item.item.forEach((it, inx) => {
						if (inx == specFilterIndex) {
							it.active = true;
						} else {
							it.active = false;
						}
					});
				}
			});
			that.goodsSpecSelectItemList = goodsSpecSelectItemList;
		}
		// ↑↑↑ 多规格相关方法 --------------------------------------------------------
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	background: #fafafa;
}

.page {
	padding: 10rpx 0;
}

.all-goods-menu-list {
	.title-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		padding: 0 20rpx;
		height: 88rpx;
		background-image: linear-gradient(90deg, #6ccc4f, #60c669);
		border-radius: 20rpx 20rpx 0 0;
		color: #ffffff;

		.text-block {
			flex: 1;
			display: flex;
			align-items: center;

			.h3 {
				font-size: 34rpx;
				font-weight: 600;
			}

			.h4 {
				font-size: 23rpx;
				margin-left: 1em;
			}
		}

		.navigator-btn {
			width: 140rpx;
			height: 48rpx;
			line-height: 48rpx;
			border-radius: 1000rpx;
			text-align: center;
			background-color: #ffffff;
			color: #6ccc4e;
			font-size: 24rpx;
			font-weight: 600;
		}
	}

	.goods-list-block {
		border-radius: 0 0 20rpx 20rpx;
		overflow: hidden;

		.two-class-title {
			@include flex-center;
			height: 48rpx;
			font-size: 23rpx;
			background: #f0f0f0;
		}

		&.Object {
			background: #ffffff;
			padding-bottom: 20rpx;
			border-radius: 0 0 10px 10px;
			height: 396rpx;
			overflow: hidden;
		}

		&.Array .scroll-view-block_wrap {
			background: #ffffff;
			padding-bottom: 20rpx;
			height: 396rpx;
			overflow: hidden;
		}

		.scroll-view-dom {
			height: 416rpx;

			.bottom-scroll-goods-wrap {
				font-size: 0;
				white-space: nowrap;

				.scroll-view-div {
					display: inline-block;
					height: 396rpx;
				}
			}
		}
	}
}
</style>
