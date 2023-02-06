<template>
	<view class="class-page-root" :style="{ height: `${systemInfoWindowHeight}px` }" @touchmove.stop="catchTouchMove">
		<loading-css :is-show="isShowLoading"></loading-css>
		<!-- main 主体 部分 -->
		<view class="main" @click.stop="catchTouchMove" :style="calcMainStyle" @touchmove.stop="catchTouchMove">
			<scroll-view :scroll-y="true" class="left-menu-list">
				<!-- :style="{ 'padding-bottom': isiPhoneX ? '71px' : '56px' }" -->
				<view
					v-for="(item, index) in leftSmallClassData"
					:key="index"
					class="menu-btn-link"
					:class="[index == leftSmallClassActive ? 'act' : '']"
					@click="leftSmallClassClickFn(item, index)"
					:style="{ color: index == leftSmallClassActive ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					{{ item.leftMenuItemTitle }}
				</view>
			</scroll-view>
			<scroll-view
				:scroll-y="true"
				class="right-content-block"
				@scroll="isShowFixedFn"
				@scrolltolower="scrolltolowerFn"
				@touchstart="rightContentStartFn"
				@touchend="rightContentEndFn"
			>
				<!-- :style="{ 'padding-bottom': isiPhoneX ? '71px' : '56px' }" -->
				<view class="loading-wrap" v-if="goodsLoading">
					<view class="loading-block">
						<view
							class="loading-item loading-item1"
							:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
						></view>
						<view
							class="loading-item loading-item2"
							:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
						></view>
						<view
							class="loading-item loading-item3"
							:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
						></view>
						<view
							class="loading-item loading-item4"
							:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
						></view>
					</view>
				</view>

				<block v-if="!goodsLoading">
					<list-goods-item-rows
						v-for="(goodsItem, index) in classPageGoodsList"
						:key="index"
						:goods-id="goodsItem.goodsId"
						:goods-image="goodsItem.goodsImage"
						:is-hot="goodsItem.isHot"
						:is-new="goodsItem.isNew"
						:goods-name="goodsItem.goodsName"
						:goods-description="goodsItem.goodsDescription"
						:goods-tag="goodsItem.goodsTag"
						:is-vip-price="goodsItem.isVipPrice"
						:goods-price="goodsItem.goodsPrice"
						:vip-price="goodsItem.vipPrice"
						:line-price="goodsItem.linePrice"
						:selected-num="goodsItem.selectedNum"
						:is-spec="goodsItem.isSpec"
						:tag-img="goodsItem.tagImg"
						:gysMdId="goodsItem.gysMdId"
						:gysMdName="goodsItem.gysMdName"
					></list-goods-item-rows>

					<null-block
						v-if="classPageGoodsList.length == 0"
						:text="calcIsCanToNext ? `上划 查看分类${calcShowNextText}` : '空空如也~'"
						min-height="460rpx"
						:image-size="{ width: '570rpx', height: '300rpx' }"
					></null-block>

					<view class="uni-load-more" v-if="classPageGoodsList.length >= 6">
						<uni-load-more v-if="loadMoreStatus != 'noMore'" :status="loadMoreStatus"></uni-load-more>
						<view v-else class="to-next-tips">
							{{ calcIsCanToNext ? `上划 查看分类${calcShowNextText}` : '没有更多数据了' }}
						</view>
					</view>

					<block
						v-if="classPageGoodsList.length < 6 && classPageGoodsList.length > 0 && rightGoodsListPage == 1"
					>
						<view v-if="calcIsCanToNext" class="to-next-tips">
							{{ calcIsCanToNext ? `上划 查看分类${calcShowNextText}` : '没有更多数据了' }}
						</view>
					</block>

					<!-- #ifdef H5 -->
					<view class="item" style="opacity: 0;"></view>
					<!-- #endif -->
				</block>
			</scroll-view>
		</view>

		<!-- 登录框组件 -->
		<login-fn
			:is-show-login="loginBoxFlag"
			@loginSuccessCallback="refreshFn"
			@close="closeGlobalLoginFn"
		></login-fn>

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
// 工具库 相关
import { assertObject, assertArray, cloneFn, addSpecFilterItemActAttrFn, transNumFn } from '@/tools/tools';
import { success, error } from '@/tools/const.js';
import listGoodsItemRows from '@/df-components/global-components/list-goods-item-row-class-page.vue';
let clientX, clientY;
export default {
	components: {
		listGoodsItemRows
	},
	data() {
		return {
			screenShowNum: 8, // 一屏可以展示8个商品
			rightGoodsListScrollTop: 0, // 顶部距离
			rightGoodsListScroll: 0, // 右边的商品列表滑动的距离

			systemInfoWindowHeight: 0, // 当前可用空间的屏幕高度 (不算浏览器搜索栏 不算公众号顶部title 不算小程序顶部那块)

			isShowLoading: true, // 开屏动画

			leftSmallClassData: [], // 左侧的小分类数据

			leftSmallClassActive: 0, // 左侧的小分类数据索引

			classPageGoodsList: [], // 商品列表
			rightGoodsListPage: 1, // 右侧的商品分页索引

			loadMoreStatus: 'more', // 底部状态
			pageLoad: 0, // 页面加载次数

			goodsLoading: true, // 是否在加载商品中 控制右边loading显示隐藏状态

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
			loginBoxFlag: false // 登录框显示隐藏状态
		};
	},

	onUnload() {
		uni.$off('goodsAddCartEd_everydayBuy');
	},
	onLoad() {
		let that = this;
		// 加入购物车成功后
		uni.$off('goodsAddCartEd_everydayBuy');
		uni.$on('goodsAddCartEd_everydayBuy', arg => {
			let { selectedNum, goodsId } = arg;
			that.classPageGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});
		});
		that.loadFn();
	},
	onReady() {
		let systemInfo = uni.getSystemInfoSync();
		this.systemInfoWindowHeight = systemInfo.windowHeight;
	},
	onShow() {
		let that = this;
		/*
		let str = `
			systemInfo.screenHeight: ${systemInfo.screenHeight}
			systemInfo.screenWidth: ${systemInfo.screenWidth}
			systemInfo.windowWidth: ${systemInfo.windowWidth}
			systemInfo.windowHeight: ${systemInfo.windowHeight}
			systemInfo.windowTop: ${systemInfo.windowTop}
			systemInfo.windowBottom: ${systemInfo.windowBottom}
		`;
		console.log(str);
		that.str = str;
		*/
		that.pageLoad++;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			let currentGoods = assertObject(
				assertArray(that.classPageGoodsList.filter(item => item.goodsId == goodsId))[0]
			);

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

	methods: {
		// 获取左侧分类数据
		getLeftMenuListDataFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/User/flOftenbuy'
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);

						let leftMenuListData = assertArray(resultObject.list).map(item => {
							return {
								id: item.id,
								leftMenuItemTitle: item.name
							};
						});

						resFn({
							type: success,
							msg: '获取左侧分类数据成功',
							result: leftMenuListData
						});
					} else {
						resFn({
							type: error,
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: error,
						msg: that.$errorMsg,
						result
					});
				}
			});
		},
		// 获取右侧分类数据
		getRightGoodsListDataFn(id, page = 1) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/User/goodsOftenbuy',
					data: {
						par: id,
						page: page
					}
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);

						let rightGoodsListData = assertArray(resultObject.list).map(item => {
							// 商品列表
							return {
								goodsId: item.goods_id, // 商品id
								goodsImage: item.image, // 商品图片
								isHot: item.is_hot == 1, // 是否热销爆款
								isNew: item.is_new == 1, // 是否新品
								goodsName: item.goods_name, // 商品名字
								goodsDescription: item.goods_remark, // 商品描述
								isVipPrice: item.is_vip_price == 1, // 是否会员专享
								goodsPrice: item.shop_price, // 商品价格
								vipPrice: item.vip_market_price, // vip专享价
								linePrice: item.vip_market_price, // 划线价
								goodsTag: item.activity, // 商品标签
								selectedNum: item.selectedNum, // 加入到购物车里的数量
								isSpec: item.is_guige == 1, // 商品是否多规格
								tagImg: item.top_left_tag_img, // 商品左上的图片标签
								gysMdId: transNumFn(item.supp_id), // 供应商门店id
								gysMdName: item.dp_name // 供应商门店名字
							};
						});

						resFn({
							type: success,
							msg: '获取当前分类商品数据成功',
							result: rightGoodsListData
						});
					} else {
						resFn({
							type: error,
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: error,
						msg: that.$errorMsg,
						result
					});
				}
			});
		},

		// 页面 load 执行
		async loadFn() {
			let that = this;
			that.leftSmallClassActive = 0; // 左侧的小分类数据索引
			that.rightGoodsListPage = 1; // 右侧的商品分页索引
			that.goodsLoading = true;

			let leftMenuListData = await that.getLeftMenuListDataFn();
			if (leftMenuListData.type == success) {
				that.leftSmallClassData = leftMenuListData.result;
				let { id } = that.leftSmallClassData[that.leftSmallClassActive];
				let rightGoodsListData = await that.getRightGoodsListDataFn(id, that.rightGoodsListPage);

				if (rightGoodsListData.type == success) {
					that.classPageGoodsList = rightGoodsListData.result; // 商品列表
				} else {
					console.log(
						'that.getRightGoodsListDataFn 函数 根据分类id获取当前分类下商品 /api/User/goodsOftenbuy 接口 报错',
						rightGoodsListData
					);
					uni.showToast({
						icon: 'none',
						title: rightGoodsListData.msg
					});
				}
			} else {
				console.log(
					'that.getLeftMenuListDataFn 函数 获取左侧分类数据 /api/User/flOftenbuy 接口 报错',
					leftMenuListData
				);
				uni.showToast({
					icon: 'none',
					title: leftMenuListData.msg
				});
			}

			that.isShowLoading = false;
			that.goodsLoading = false;
		},

		// 点击左侧的小分类
		async leftSmallClassClickFn(item, index) {
			let that = this;
			that.leftSmallClassActive = index;
			that.rightGoodsListPage = 1;
			that.goodsLoading = true;
			that.loadMoreStatus = 'more'; // 底部状态

			let rightGoodsListData = await that.getRightGoodsListDataFn(
				that.leftSmallClassData[that.leftSmallClassActive].id,
				that.rightGoodsListPage
			);
			if (rightGoodsListData.type == success) {
				that.classPageGoodsList = rightGoodsListData.result; // 商品列表
			} else {
				console.log(
					'that.getRightGoodsListDataFn 函数 根据分类id获取当前分类下商品 /api/User/goodsOftenbuy 接口 报错',
					rightGoodsListData
				);

				uni.showToast({
					icon: 'none',
					title: rightGoodsListData.msg
				});
			}
			that.goodsLoading = false;
		},
		// 重新登录后刷新页面
		refreshFn() {
			this.loadFn();
		},
		// 记录当前商品列表滑动距离
		isShowFixedFn(e) {
			this.rightGoodsListScroll = e.target.scrollHeight - e.target.scrollTop;
			this.rightGoodsListScrollTop = e.target.scrollTop;
		},

		// 触底事件 onReachBottom 加载更多数据
		async scrolltolowerFn() {
			let that = this;
			if (that.loadMoreStatus == 'noMore') {
				return false;
			}
			if (
				that.classPageGoodsList.length < 6 &&
				that.classPageGoodsList.length > 0 &&
				that.rightGoodsListPage == 1
			) {
				return false;
			}

			that.rightGoodsListPage++;

			that.loadMoreStatus = 'loading';

			let { id } = that.leftSmallClassData[that.leftSmallClassActive];

			let rightGoodsListData = await that.getRightGoodsListDataFn(id, that.rightGoodsListPage);

			if (rightGoodsListData.type == success) {
				if (rightGoodsListData.result.length) {
					that.loadMoreStatus = 'more';

					that.classPageGoodsList = that.classPageGoodsList.concat(rightGoodsListData.result); // 商品列表
				} else {
					that.rightGoodsListPage--;
					if (that.rightGoodsListPage <= 1) {
						that.rightGoodsListPage = 1;
					}
					that.loadMoreStatus = 'noMore';
				}
			} else {
				console.log(
					'that.getRightGoodsListDataFn 函数 根据分类id获取当前分类下商品 /api/User/goodsOftenbuy 接口 报错',
					rightGoodsListData
				);
				uni.showToast({
					icon: 'none',
					title: rightGoodsListData.msg
				});
			}
		},
		// 右边商品列表 底部按钮点击 进入下一个分类
		bottomBtnClickToNextFn() {
			let that = this;
			if (that.calcIsCanToNext) {
				that.leftSmallClassActive++;
				let item = that.leftSmallClassData[that.leftSmallClassActive];
				that.leftSmallClassClickFn(item, that.leftSmallClassActive);
				that.loadMoreStatus = 'more';
			}
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
		},
		// ↑↑↑ 多规格相关方法 --------------------------------------------------------
		rightContentStartFn(e) {
			clientX = e.changedTouches[0].clientX;
			clientY = e.changedTouches[0].clientY;
		},
		rightContentEndFn(e) {
			let that = this;
			const subX = e.changedTouches[0].clientX - clientX;
			const subY = e.changedTouches[0].clientY - clientY;
			if (subY > 50 || subY < -50) {
				if (subY > 50) {
					console.log('下滑');

					if (that.rightGoodsListScrollTop <= 0 && that.leftSmallClassActive > 0) {
						that.leftSmallClassActive--;
						let item = that.leftSmallClassData[that.leftSmallClassActive];
						that.leftSmallClassClickFn(item, that.leftSmallClassActive);
						that.loadMoreStatus = 'more';
					}

					/*
					uni.createSelectorQuery()
						.selectAll('.right-content-block')
						.boundingClientRect(rect => {
							let height = transNumFn(assertObject(assertArray(rect)[0]).height);
							if (that.rightGoodsListScroll - height < 0) {
								that.bottomBtnClickToNextFn();
							}
						})
						.exec();

						 */
				} else if (subY < -50) {
					console.log('上滑');
					// 处理上划操作

					console.log(
						`
						that.loadMoreStatus: ${that.loadMoreStatus},
						that.calcIsCanToNext: ${that.calcIsCanToNext},
						that.classPageGoodsList: ${that.classPageGoodsList},
						that.rightGoodsListPage: ${that.rightGoodsListPage},
						`
					);

					if (that.calcIsCanToNext) {
						if (that.classPageGoodsList.length <= 0) {
							that.bottomBtnClickToNextFn();
							return false;
						}
						if (
							that.classPageGoodsList.length < 6 &&
							that.classPageGoodsList.length > 0 &&
							that.rightGoodsListPage == 1
						) {
							that.bottomBtnClickToNextFn();
							return false;
						}

						if (that.loadMoreStatus == 'noMore') {
							// 判断到底部才执行

							setTimeout(() => {
								uni.createSelectorQuery()
									.selectAll('.right-content-block')
									.boundingClientRect(rect => {
										let height = transNumFn(assertObject(assertArray(rect)[0]).height) + 1;
										if (that.rightGoodsListScroll - height <= 5) {
											that.bottomBtnClickToNextFn();
										}
										console.log(
											`
												height: ${height},
												that.rightGoodsListScroll: ${that.rightGoodsListScroll},
												that.rightGoodsListScroll - height: ${that.rightGoodsListScroll - height},
											`
										);
									})
									.exec();
							}, 80);
						}
					}
				}
			} else {
				if (subX > 100) {
					console.log('右滑');
				} else if (subX < -100) {
					console.log('左滑');
				} else {
					console.log('无效');
				}
			}
		}
	},
	// ↑↑↑↑↑ methods 结束
	computed: {
		/*
		  @description 是否可以再次下滑动作
		  @return <Boolean>
			true可以下滑
			false已经是最后一个了不能再下滑
		*/
		calcIsCanToNext() {
			return this.leftSmallClassData.length - 1 > this.leftSmallClassActive;
		},
		// 根据当前分类的索引 返回显示 下一分类名称还是 没有更多数据了
		calcShowNextText() {
			let that = this;
			if (that.calcIsCanToNext) {
				return `“${that.leftSmallClassData[that.leftSmallClassActive + 1].leftMenuItemTitle}”`;
			}
			return '没有更多数据了';
		},

		// 根据当前平台来返回main的样式
		calcMainStyle() {
			// #ifdef MP-WEIXIN || APP-PLUS
			return `height: 100vh;`;
			// #endif
			// #ifdef H5
			if (this.globalBrowserIsWx) {
				return `height: 100vh;`;
			} else {
				return `height: ${this.systemInfoWindowHeight}px`;
			}
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.class-page-root {
	position: relative;
	width: 100vw;
	background: $bg-grey-color;

	.main {
		display: flex;
		position: absolute;
		z-index: 5;
		top: 0;
		background: #ffffff;
		border-top: 1px solid #efefef;
		.left-menu-list {
			box-sizing: border-box;
			width: 181rpx;
			height: 100%;
			border-right: 1px solid #efefef;

			& ::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				white-space: nowrap;
			}

			.menu-btn-link {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				font-size: 23rpx;
				color: $grey1-color;
				position: relative;

				.after {
					display: none;
				}

				&.act {
					.after {
						display: block;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 4rpx;
						height: 40rpx;
					}
				}
			}
		}

		.right-content-block {
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				white-space: nowrap;
			}
			width: 569rpx;
			// padding-bottom: 96rpx;
			position: relative;

			.loading-wrap {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				z-index: 100;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #ffffff;
				.loading-block {
					display: inline-block;
					position: relative;
					width: 80px;
					height: 80px;
					transform: scale(0.5);

					@keyframes lds-ring {
						0% {
							transform: rotate(0deg);
						}
						100% {
							transform: rotate(360deg);
						}
					}

					.loading-item {
						box-sizing: border-box;
						display: block;
						position: absolute;
						width: 64px;
						height: 64px;
						margin: 8px;
						border: 8px solid red;
						border-radius: 50%;
						animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
						border-color: #fff transparent transparent transparent;
						&1 {
							animation-delay: -0.45s;
						}
						&2 {
							animation-delay: -0.3s;
						}
						&3 {
							animation-delay: -0.15s;
						}
					}
				}
			}
			.to-next-tips {
				text-align: center;
				font-size: 15px;
				color: #777777;
				height: 40px;
				line-height: 40px;
			}
		}
	}
}
</style>
