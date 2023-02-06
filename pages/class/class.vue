<template>
	<!--
		万象优鲜生鲜系统(简称: 万象优鲜)
		软著证书号: 6907220
		软著登记号: 2021SR0182903
		手机: 18310199838
		电话: 4006697689
		邮箱: 3319653051@qq.com
		著作权人: 北京世间万象网络科技有限公司
		版权所有: 北京世间万象网络科技有限公司
		任何组织和个人未经本单位许可与授权, 不得擅自复制、更改内容本系统受版权法保护如未经授权而擅自复制或传播本系统(或其中部分), 将受到严厉的刑事及民事制裁，并将在法律许可范围内受到最大可能的起诉!
	-->
	<view class="class-page-root" :style="{ height: `${systemInfoWindowHeight}px` }">
		<loading-css :is-show="isShowLoading"></loading-css>

		<!--  展开的所有分类 遮罩层 -->
		<view
			v-if="showAllClassFlag"
			class="all-class-wrap"
			:style="{ top: `${topBtnLinkHeight}px`, height: `${systemInfoWindowHeight - topBtnLinkHeight}px` }"
			@click.stop="setShowAllClassFlagFn(false)"
			@touchend.stop="setShowAllClassFlagFn(false)"
		>
			<view class="class-item-block" @click.stop="catchTouchMove" @touchend.stop="catchTouchMove">
				<view
					class="class-item"
					v-for="(item, index) in topBigClassData"
					:key="index"
					:class="[index == topBigClassActive ? 'act' : '']"
					@click="topBigClassClickFn(item, index)"
				>
					<image class="class-item-image" :src="item.topBigClassItemImage"></image>
					<view
						class="class-item-text"
						:style="{
							background: index == topBigClassActive ? configInfo.web_site_color : '',
							color: index == topBigClassActive ? '#ffffff' : '#374050'
						}"
					>
						{{ item.topBigClassItemTitle }}
					</view>
				</view>
			</view>
		</view>

		<view class="class-link-btn">
			<!-- 展开所有分类的 全部按钮  -->
			<view class="show-all-class-btn" @click="allClassBtnClickFn" v-if="topBigClassData.length > 5">
				<view class="text">全</view>
				<view class="text">部</view>

				<view
					class="flex-center bottom-icon"
					:style="{ transform: `rotate(${showAllClassFlag ? 180 : 0}deg)` }"
				>
					<view class="iconfont icon-arrow-right-copy-copy" style="font-size: 14px;"></view>
				</view>
			</view>

			<view class="btn-link-scroll-wrap">
				<scroll-view
					class="btn-link-scroll-view-dom"
					:scroll-x="true"
					:scroll-left="navBarScrollLeft"
					:scroll-with-animation="true"
				>
					<view
						v-for="(item, index) in topBigClassData"
						:key="index"
						class="item"
						:class="[index == topBigClassActive ? 'act' : '']"
						@click="topBigClassClickFn(item, index)"
					>
						<image :src="item.topBigClassItemImage"></image>
						<text
							class="border-radius"
							:style="{
								background: index == topBigClassActive ? configInfo.web_site_color : '',
								color: index == topBigClassActive ? '#ffffff' : '#374050'
							}"
						>
							{{ item.topBigClassItemTitle }}
						</text>
					</view>

					<view class="item" style="width: 90rpx; height: 100%;" v-if="topBigClassData.length > 5"></view>
				</scroll-view>
			</view>
		</view>
		<!-- main 主体 部分 -->
		<view class="main" @click.stop="catchTouchMove" :style="calcMainStyle">
			<view class="fixed-block fixed" v-show="isFixed || leftSmallClassActive != 0">
				<view class="sort-type">
					<text
						v-for="(item, index) in rightGoodsRuleList"
						:key="index"
						:class="[index == rightGoodsRuleActive ? 'act' : '']"
						@click="rightGoodsRuleClickFn(item, index)"
						:style="{ color: index == rightGoodsRuleActive ? configInfo.web_site_color : '#374050' }"
					>
						{{ item.name }}
						<block v-if="item.name == '价格'">
							<text
								class="iconfont icon-arrow-right-copy-copy sort-type-arrow-icon"
								:class="[
									rightGoodsRuleScreen == 'price_next' ? 'priceNextStyle' : '',
									rightGoodsRuleScreen == 'price_up' ? 'priceUpStyle' : ''
								]"
								:style="{ fontSize: '14px', color: configInfo.web_site_color }"
							></text>
						</block>
					</text>
				</view>
			</view>

			<scroll-view
				:scroll-y="true"
				class="left-menu-list"
				:style="{ 'padding-bottom': isiPhoneX ? '71px' : '56px' }"
			>
				<view class="act-bg-block" :style="{ top: `${calcActBgTop}px` }">
					<view class="left-line-block" :style="{ background: configInfo.web_site_color }"></view>
					<view class="yuan-bg" :style="{ background: hexToRgba(configInfo.web_site_color, 0.1) }"></view>
					<view class="right-arrow">
						<view
							class="iconfont icon-sanjiao"
							:style="{ color: configInfo.web_site_color }"
							style="transform: rotate(270deg); font-size: 8px;"
						></view>
					</view>
				</view>
				<view class="menu-btn-link open-search-btn" v-if="calcIsShowSearchBtn">
					<view
						class="flex-center search-box"
						@click="navigateToFn({ url: `/packageA/search/index` })"
						style="height: 48rpx"
					>
						<uni-icons
							class="icon-search"
							size="18"
							:color="configInfo.web_site_color"
							type="search"
						></uni-icons>
						<view class="">搜索</view>
					</view>
				</view>
				<view class="menu-btn-link" style="height: 80rpx" v-if="calcIsShowSearchBtn"></view>

				<view
					v-for="(item, index) in leftSmallClassData"
					:key="index"
					class="menu-btn-link"
					:class="[index == leftSmallClassActive ? 'act' : '']"
					@click="leftSmallClassClickFn(item, index)"
					:style="{ color: index == leftSmallClassActive ? configInfo.web_site_color : '#374050' }"
				>
					<!-- <view class="after" :style="{ background: configInfo.web_site_color }"></view> -->
					{{ item.leftSmallClassTitle }}
				</view>
			</scroll-view>
			<scroll-view
				:scroll-y="true"
				class="right-content-block"
				:style="{ 'padding-bottom': isiPhoneX ? '71px' : '56px' }"
				@scroll="isShowFixedFn"
				@scrolltoupper="scrolltoupperFn"
				@scrolltolower="scrolltolowerFn"
				@touchstart="rightContentStartFn"
				@touchend="rightContentEndFn"
			>
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
					<swiper
						v-if="swiperList.length > 0 && leftSmallClassActive == 0"
						class="class-banner"
						:circular="true"
						:autoplay="classPageSwierpAutoplay"
						:interval="1500"
						:duration="450"
						:current="swiperCurrentNum"
					>
						<swiper-item v-for="(item, index) in swiperList" :key="index" @click="swiperClickFn(item)">
							<image class="border-radius20" :src="item.image"></image>
						</swiper-item>
					</swiper>

					<view
						class="fixed-block"
						v-if="!goodsLoading"
						:style="{ opacity: leftSmallClassActive == 0 ? 1 : 0 }"
					>
						<view class="sort-type">
							<text
								v-for="(item, index) in rightGoodsRuleList"
								:key="index"
								:class="[rightGoodsRuleActive == index ? 'act' : '']"
								@click="rightGoodsRuleClickFn(item, index)"
								:style="{
									color: rightGoodsRuleActive == index ? configInfo.web_site_color : '#374050'
								}"
							>
								{{ item.name }}
								<block v-if="item.name == '价格'">
									<text
										class="iconfont icon-arrow-right-copy-copy sort-type-arrow-icon"
										:class="[
											rightGoodsRuleScreen == 'price_next' ? 'priceNextStyle' : '',
											rightGoodsRuleScreen == 'price_up' ? 'priceUpStyle' : ''
										]"
										:style="{ fontSize: '14px', color: configInfo.web_site_color }"
									></text>
								</block>
							</text>
						</view>
					</view>

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
						page="classpage"
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

		<!-- ↓↓↓ 登录框 -->
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

		<view class="hans-tabbar">
			<view class="hans-tabbar-height" :class="[isiPhoneX ? 'isiPhoneXClass' : '']"></view>
			<view class="hans-tabbar-fixde" :class="[isiPhoneX ? 'isiPhoneXClass' : '']">
				<hans-tabbar :cardNumber="cardNumber" :list="MenuList" :tab-current="tabCurrent"></hans-tabbar>
			</view>
		</view>
	</view>
</template>

<script>
// 工具库 相关

import { assertObject, assertArray, cloneFn, addSpecFilterItemActAttrFn, transNumFn } from '@/tools/tools';
import listGoodsItemRows from '@/df-components/global-components/list-goods-item-row-class-page.vue';

let classPageSwierpAutoplayTimer, clientX, clientY;

const touped = 'touped', // 已到达顶部
	tolowed = 'tolowed', // 已到达底部
	scrolling = 'scrolling'; // 在滑动中

export default {
	components: {
		listGoodsItemRows
	},
	data() {
		return {
			rightGoodsListScrollTop: 0, // 顶部距离
			rightGoodsListScroll: 0, // 右边的商品列表滑动的距离

			systemInfoWindowHeight: 0, // 当前可用空间的屏幕高度 (不算浏览器搜索栏 不算公众号顶部title 不算小程序顶部那块)

			isShowLoading: true, // 开屏动画

			topBigClassData: [], // 顶部的大分类数据
			leftSmallClassData: [], // 左侧的小分类数据

			topBigClassActive: 0, // 顶部的大分类索引
			leftSmallClassActive: 0, // 左侧的小分类数据索引

			swiperList: [], // 轮播图数据
			swiperCurrentNum: 0, // 当前轮播图的索引
			rightGoodsRuleList: [], // 商品的排序规则
			rightGoodsRuleActive: 0, // 商品的排序选中索引

			classPageGoodsList: [], // 商品列表
			rightGoodsListPage: 1, // 右侧的商品分页索引
			logData: {}, // 点击规则的记录

			rightGoodsRuleScreen: null, // 当前rule规则
			loadMoreStatus: 'more', // 底部状态
			isFixed: false, // rule规则列表是否fixed显示
			pageLoad: 0, // 页面加载次数

			showAllClassFlag: false, // 显示所有分类的状态
			goodsLoading: true, // 是否在加载商品中 控制右边loading显示隐藏状态

			classPageSwierpAutoplay: false, // 分类页面商品轮播图是否自动轮播的状态

			scrollViewState: '', // 商品列表滑动的状态

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
			loginBoxFlag: false, // 登录框显示隐藏状态
			cardNumber: 0 // 购物车数量
		};
	},
	onHide() {
		let that = this;
		that.showAllClassFlag = false;
		clearTimeout(classPageSwierpAutoplayTimer);
		if (that.classPageSwierpAutoplay) {
			that.classPageSwierpAutoplay = false;
		}
	},
	onUnload() {
		uni.$off('goodsAddCartEd_class');
	},

	onLoad() {
		let that = this;
		// 加入购物车成功后
		uni.$off('goodsAddCartEd_class');
		uni.$on('goodsAddCartEd_class', arg => {
			let { selectedNum, goodsId } = arg;
			that.classPageGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});
		});

		// 首页轮播图 点击 跳转过来 带的参数
		let home2Class = uni.getStorageSync('home2Class');
		console.log('home2Class', home2Class);
		if (home2Class) {
			that.homeSwiperClickFn(home2Class);
		} else {
			that.loadFn();
		}
	},
	onShow() {
		let that = this;
		let systemInfo = uni.getSystemInfoSync();
		that.systemInfoWindowHeight = systemInfo.windowHeight;

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

		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();

		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});

		clearTimeout(classPageSwierpAutoplayTimer);
		classPageSwierpAutoplayTimer = setTimeout(() => {
			if (!that.classPageSwierpAutoplay) {
				that.classPageSwierpAutoplay = true;
			}
		}, 300);

		if (that.pageLoad != 0) {
			let home2Class = uni.getStorageSync('home2Class');
			if (home2Class) {
				that.homeSwiperClickFn(home2Class);
			}
		}

		that.pageLoad++;

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
		// 重新登录后刷新页面
		refreshFn() {
			this.loadFn();
			this.setTabBarCartNumFn();
		},
		// 获取顶部大分类数据
		getTopBigClassDataFn(id) {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let data = {};
				if (id) {
					data.category_id = id;
				}
				let result = await that.$request({
					url: '/api/Category/GetCategory',
					data
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);
						let topBigClassData = assertArray(resultObject.prent).map(item => {
								return {
									id: item.id,
									topBigClassItemTitle: item.name,
									topBigClassItemImage: item.image
								};
							}),
							leftSmallClassData = assertArray(resultObject.level).map(item => {
								return {
									id: item.id,
									leftSmallClassTitle: item.name,
									leftSmallClassParam: item.param
								};
							});

						resFn({
							msg: '获取顶部大分类数据成功',
							result: {
								topBigClassData,
								leftSmallClassData
							}
						});
					} else {
						rejFn({
							msg: result.data.msg,
							result
						});
					}
				} else {
					rejFn({
						msg: that.$errorMsg,
						result
					});
				}
			});
		},
		// 根据当前选中的条件获取对应的商品数据(包括排序方式) 和 商品上方的轮播图数据
		getClassPageGoodsFn(page, param, screen) {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let data = {};
				if (page) {
					data.page = page;
				} else {
					data.page = 1;
				}
				if (param) {
					data.param = param;
				}
				if (screen) {
					data.screen = screen;
				}

				let result = await that.$request({
					url: '/api/Category/GetCategoryGoods',
					data
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data); // 接口返回的所有数据
						let swiperList = assertArray(resultObject.nav); // 轮播图数据
						let rightGoodsRuleList = assertArray(resultObject.rule); // 商品的排序规则

						let classPageGoodsList = assertArray(resultObject.goods).map(item => {
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
							msg: '获取商品数据成功',
							result: {
								swiperList,
								rightGoodsRuleList,
								classPageGoodsList
							}
						});
					} else {
						rejFn({
							msg: result.data.msg,
							result
						});
					}
				} else {
					rejFn({
						msg: that.$errorMsg,
						result
					});
				}
			});
		},

		// 页面 load 执行
		async loadFn() {
			let that = this,
				getTopBigClassDataIsSuccess = false; // 第一步获取页面顶部分类数据 和 左侧小分类数据是否成功

			that.topBigClassActive = 0; // 顶部的大分类索引
			that.leftSmallClassActive = 0; // 左侧的小分类数据索引
			that.rightGoodsListPage = 1; // 右侧的商品分页索引
			that.goodsLoading = true;

			that.logData = {}; // 点击规则的记录
			that.rightGoodsRuleScreen = null; // 当前rule规则

			try {
				let topBigClassDataResult = await that.getTopBigClassDataFn();

				// 赋值顶部的大分类数据
				that.topBigClassData = topBigClassDataResult.result.topBigClassData;

				// 赋值左侧的小分类数据
				that.leftSmallClassData = topBigClassDataResult.result.leftSmallClassData;

				getTopBigClassDataIsSuccess = true;
			} catch (e) {
				console.log('getTopBigClassDataFn 函数 /api/Category/GetCategory 接口 报错', e);
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
				getTopBigClassDataIsSuccess = false;
				that.isShowLoading = false;
				that.goodsLoading = false;
			}

			if (getTopBigClassDataIsSuccess) {
				try {
					let classPageGoodsResult = await that.getClassPageGoodsFn(
						that.rightGoodsListPage,
						that.leftSmallClassData[that.leftSmallClassActive].leftSmallClassParam
					);

					that.swiperList = classPageGoodsResult.result.swiperList; // 轮播图数据
					that.swiperCurrentNum = 0;
					that.rightGoodsRuleList = classPageGoodsResult.result.rightGoodsRuleList; // 商品的排序规则

					that.classPageGoodsList = classPageGoodsResult.result.classPageGoodsList; // 商品列表
					if (that.topBigClassData.length > 5) {
						that.showAllClassFlag = true; // 显示所有分类的状态
					}
				} catch (e) {
					console.log('getClassPageGoodsFn 函数 /api/Category/GetCategoryGoods 接口 报错', e);
					uni.showToast({
						icon: 'none',
						title: e.msg
					});
				}
				that.isShowLoading = false;
				that.goodsLoading = false;
			}
		},
		// 点击顶部的大分类
		async topBigClassClickFn(item, index) {
			let that = this;
			that.topBigClassActive = index;
			that.leftSmallClassActive = 0;
			that.rightGoodsRuleActive = 0;
			that.rightGoodsListPage = 1;
			that.goodsLoading = true;
			that.showAllClassFlag = false; // 显示所有分类的状态

			that.logData = {}; // 点击规则的记录
			that.rightGoodsRuleScreen = null; // 当前rule规则

			let getLeftSmallClassDataIsSuccess = false;
			that.loadMoreStatus = 'more'; // 底部状态

			try {
				let leftSmallClassDataResult = await that.getTopBigClassDataFn(item.id);
				that.leftSmallClassData = leftSmallClassDataResult.result.leftSmallClassData;
				getLeftSmallClassDataIsSuccess = true;
			} catch (e) {
				//TODO handle the exception
				getLeftSmallClassDataIsSuccess = false;
				that.goodsLoading = false;
			}

			if (getLeftSmallClassDataIsSuccess) {
				try {
					let classPageGoodsResult = await that.getClassPageGoodsFn(
						that.rightGoodsListPage,
						that.leftSmallClassData[that.leftSmallClassActive].leftSmallClassParam
					);
					that.swiperList = classPageGoodsResult.result.swiperList; // 轮播图数据
					that.swiperCurrentNum = 0;
					that.rightGoodsRuleList = classPageGoodsResult.result.rightGoodsRuleList; // 商品的排序规则
					that.classPageGoodsList = classPageGoodsResult.result.classPageGoodsList; // 商品列表
				} catch (e) {
					//TODO handle the exception
					console.log('getClassPageGoodsFn 函数 /api/Category/GetCategoryGoods 接口 报错', e);
					uni.showToast({
						icon: 'none',
						title: e.msg
					});
				}
				that.goodsLoading = false;
			}
		},
		// 点击左侧的小分类
		async leftSmallClassClickFn(item, index) {
			let that = this;
			that.leftSmallClassActive = index;
			that.rightGoodsRuleActive = 0;
			that.rightGoodsListPage = 1;
			that.goodsLoading = true;

			that.logData = {}; // 点击规则的记录
			that.rightGoodsRuleScreen = null; // 当前rule规则
			that.loadMoreStatus = 'more'; // 底部状态

			try {
				let classPageGoodsResult = await that.getClassPageGoodsFn(
					that.rightGoodsListPage,
					that.leftSmallClassData[that.leftSmallClassActive].leftSmallClassParam
				);
				that.swiperList = classPageGoodsResult.result.swiperList; // 轮播图数据
				that.swiperCurrentNum = 0;

				that.rightGoodsRuleList = classPageGoodsResult.result.rightGoodsRuleList; // 商品的排序规则
				that.classPageGoodsList = classPageGoodsResult.result.classPageGoodsList; // 商品列表
			} catch (e) {
				console.log('getClassPageGoodsFn 函数 /api/Category/GetCategoryGoods 接口 报错', e);
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}

			that.goodsLoading = false;
		},
		// 点击商品的排序规则
		async rightGoodsRuleClickFn(item, index) {
			let that = this;

			for (let i in that.logData) {
				if (i != item.name) {
					delete that.logData[i];
				}
			}

			let screen;
			if (index == that.rightGoodsRuleActive) {
				if (!that.logData[item.name]) {
					that.logData[item.name] = 1;
				} else {
					that.logData[item.name]++;
				}
				screen = item.param[that.logData[item.name] % item.param.length];
			} else {
				screen = item.param[0];
			}

			that.rightGoodsRuleScreen = screen;
			that.rightGoodsRuleActive = index;
			that.rightGoodsListPage = 1;

			try {
				let classPageGoodsResult = await that.getClassPageGoodsFn(
					that.rightGoodsListPage,
					that.leftSmallClassData[that.leftSmallClassActive].leftSmallClassParam,
					screen
				);
				that.swiperCurrentNum = 0;
				that.rightGoodsRuleList = classPageGoodsResult.result.rightGoodsRuleList; // 商品的排序规则
				that.classPageGoodsList = classPageGoodsResult.result.classPageGoodsList; // 商品列表
			} catch (e) {
				//TODO handle the exception
				console.log('getClassPageGoodsFn 函数 /api/Category/GetCategoryGoods 接口 报错', e);
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
		},
		// 设置分类模态框的状态
		setShowAllClassFlagFn(flag) {
			setTimeout(() => {
				this.showAllClassFlag = flag;
				return false;
			}, 300);
			return false;
		},
		// 查看全部按钮点击
		allClassBtnClickFn() {
			this.showAllClassFlag = !this.showAllClassFlag;
		},
		// 是否显示 fixed 的tab
		isShowFixedFn(e) {
			this.isFixed = e.detail.scrollTop > 150 ? true : false;
			this.rightGoodsListScroll = e.target.scrollHeight - e.target.scrollTop;
			this.rightGoodsListScrollTop = e.target.scrollTop;
			this.scrollViewState = scrolling;
			// console.log(e.target.scrollTop);
		},
		// 首页 点击 轮播图 进到 分类页面
		async homeSwiperClickFn(obj) {
			/*
				{topClassId: "2", leftClassId: "0"}
			*/
			let that = this,
				getTopBigClassDataIsSuccess = false;
			console.log(obj, '首页传过来的参数');
			uni.setStorageSync('home2Class', '');
			// that.topBigClassActive = that.topBigClassData.findIndex(item => item.id == obj.topClassId);
			that.rightGoodsListPage = 1; // 右侧的商品分页索引
			that.rightGoodsRuleActive = 0;

			that.goodsLoading = true;
			that.logData = {}; // 点击规则的记录
			that.rightGoodsRuleScreen = null; // 当前rule规则

			try {
				let topBigClassDataResult = await that.getTopBigClassDataFn(obj.topClassId);

				// 赋值顶部的大分类数据
				that.topBigClassData = topBigClassDataResult.result.topBigClassData;

				// 赋值左侧的小分类数据
				that.leftSmallClassData = topBigClassDataResult.result.leftSmallClassData;

				getTopBigClassDataIsSuccess = true;
			} catch (e) {
				console.log('getTopBigClassDataFn 函数 /api/Category/GetCategory 接口 报错', e);
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
				getTopBigClassDataIsSuccess = false;
				that.isShowLoading = false;
				that.goodsLoading = false;
			}
			if (getTopBigClassDataIsSuccess) {
				that.topBigClassActive = that.topBigClassData.findIndex(item => item.id == obj.topClassId);

				if (obj.leftClassId - 0) {
					that.leftSmallClassActive = that.leftSmallClassData.findIndex(
						item => item.leftSmallClassParam.split(',')[1] == obj.leftClassId
					);
				} else {
					that.leftSmallClassActive = 0; // 左侧的小分类数据索引
				}

				try {
					let classPageGoodsResult = await that.getClassPageGoodsFn(
						that.rightGoodsListPage,
						that.leftSmallClassData[that.leftSmallClassActive].leftSmallClassParam
					);

					that.swiperList = classPageGoodsResult.result.swiperList; // 轮播图数据
					that.swiperCurrentNum = 0;
					that.rightGoodsRuleList = classPageGoodsResult.result.rightGoodsRuleList; // 商品的排序规则

					that.classPageGoodsList = classPageGoodsResult.result.classPageGoodsList; // 商品列表
				} catch (e) {
					console.log('getClassPageGoodsFn 函数 /api/Category/GetCategoryGoods 接口 报错', e);
					uni.showToast({
						icon: 'none',
						title: e.msg
					});
				}
				that.isShowLoading = false;
				that.goodsLoading = false;
			}
		},
		// 触顶事件
		scrolltoupperFn() {
			setTimeout(() => {
				console.log('scrolltoupperFn');
				this.scrollViewState = touped;
			}, 80);
		},
		// 触底事件 onReachBottom 加载更多数据
		async scrolltolowerFn() {
			let that = this;

			setTimeout(() => {
				console.log('scrolltolowerFn');
				this.scrollViewState = tolowed;
			}, 80);

			//
			if (that.loadMoreStatus == 'noMore') {
				return false;
			}
			//
			if (
				that.classPageGoodsList.length < 6 &&
				that.classPageGoodsList.length > 0 &&
				that.rightGoodsListPage == 1
			) {
				return false;
			}

			// 触底后加载更多

			that.rightGoodsListPage++;

			that.loadMoreStatus = 'loading';

			try {
				let classPageGoodsResult = await that.getClassPageGoodsFn(
					that.rightGoodsListPage,
					that.leftSmallClassData[that.leftSmallClassActive].leftSmallClassParam,
					that.rightGoodsRuleScreen
				);
				if (classPageGoodsResult.result.classPageGoodsList.length) {
					that.loadMoreStatus = 'more';
					that.classPageGoodsList = that.classPageGoodsList.concat(
						classPageGoodsResult.result.classPageGoodsList
					); // 商品列表
				} else {
					that.rightGoodsListPage--;
					if (that.rightGoodsListPage <= 1) {
						that.rightGoodsListPage = 1;
					}
					that.loadMoreStatus = 'noMore';
				}
			} catch (e) {
				console.log('getClassPageGoodsFn 函数 /api/Category/GetCategoryGoods 接口 报错', e);
				uni.showToast({
					icon: 'none',
					title: e.msg
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
		// 记录滑动右边商品列表开始的坐标信息
		rightContentStartFn(e) {
			clientX = e.changedTouches[0].clientX;
			clientY = e.changedTouches[0].clientY;
		},
		// 滑动右边商品列表结束, 判断滑动方向并加载对应数据
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
				} else if (subY < -50) {
					console.log('上滑');
					// 处理上划操作

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
							// 判断到底部才执行
							uni.createSelectorQuery()
								.selectAll('.right-content-block')
								.boundingClientRect(rect => {
									let height = transNumFn(assertObject(assertArray(rect)[0]).height);
									if (that.rightGoodsListScroll - height < 0) {
										that.bottomBtnClickToNextFn();
									}
								})
								.exec();
							return false;
						}

						if (that.loadMoreStatus == 'noMore') {
							// 判断到底部才执行
							setTimeout(() => {
								if (that.scrollViewState == tolowed) {
									that.bottomBtnClickToNextFn();
								}
							}, 120);

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
				return `“${that.leftSmallClassData[that.leftSmallClassActive + 1].leftSmallClassTitle}”`;
			}
			return '没有更多数据了';
		},
		// 返回顶部的滑动按钮 高度 转换为px
		topBtnLinkHeight() {
			return this.rpxTopxFn(173);
		},
		tabCurrent() {
			let that = this;
			for (let i = 0; i < that.MenuList.length; i++) {
				if (that.MenuList[i].field == 'f') {
					return i;
				}
			}
			return 0;
		},
		// 根据 当前选中的 菜单索引 计算 距离左侧的距离
		navBarScrollLeft() {
			let that = this;
			let itemWeight = (that.windowWidth * 70) / 375;
			let res = that.topBigClassActive * itemWeight - that.windowWidth / 2 + itemWeight / 2;
			return res;
		},
		// 根据当前平台来返回main的样式
		calcMainStyle() {
			// #ifdef MP-WEIXIN || APP-PLUS || MP-TOUTIAO
			return `height: 100vh;`;
			// #endif
			// #ifdef H5
			if (this.globalBrowserIsWx) {
				return `height: 100vh;`;
			} else {
				return `height: ${this.systemInfoWindowHeight}px`;
			}
			// #endif
		},

		// 计算当前菜单滑块的高度
		calcActBgTop() {
			let that = this;
			let itemHeight = Math.floor(that.rpxTopxFn(100));
			let searchHeight = that.calcIsShowSearchBtn ? Math.floor(that.rpxTopxFn(80)) : 0;

			console.log('itemHeight,searchHeight', itemHeight, searchHeight);

			return that.leftSmallClassActive * itemHeight + searchHeight;
		},
		// 是否展示搜索按钮
		calcIsShowSearchBtn() {
			return transNumFn(assertObject(this.configInfo).fl_ss_ys) == 1;
		}
	},
	watch: {
		calcActBgTop(...arg) {
			console.log(arg);
		}
	}
};
</script>

<style lang="scss" scoped>
.class-page-root {
	position: relative;
	width: 100vw;
	background: $bg-grey-color;

	.all-class-wrap {
		position: absolute;
		z-index: 50;
		left: 0;
		width: 750rpx;
		background: rgba(0, 0, 0, 0.3);
		overflow-x: hidden;

		.class-item-block {
			background: #ffffff;
			font-size: 0;
			.class-item {
				display: inline-flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				margin: 10rpx 0;
				width: 150rpx;
				height: 158rpx;
				.class-item-image {
					display: block;
					width: 110rpx;
					height: 110rpx;
					border-radius: 50%;
				}
				.class-item-text {
					display: inline-block;
					padding: 0 0.5em;
					line-height: 40rpx;
					font-size: 23rpx;
					color: #374050;
					border-radius: 10000rpx;
				}
			}
		}
	}

	.class-link-btn {
		position: relative;
		z-index: 10;
		background-color: $bg-grey-color;
		padding: 10rpx 0 5rpx;

		.show-all-class-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			z-index: 5;
			top: 0;
			right: 0;
			width: 78rpx;
			height: 100%;
			background: #ffffff;
			color: #505050;
			font-size: 24rpx;
			border-bottom: 1px solid #f6f6f6;
			.bottom-icon {
				width: 30rpx;
				height: 30rpx;
				position: relative;

				.iconfont {
					transition: 0.1s;
					transform: rotate(90deg);

					&::before {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translateX(-50%) translateY(-50%);
					}
				}
			}
		}
		.btn-link-scroll-wrap {
			width: 100%;
			height: 158rpx;
			overflow: hidden;
			.btn-link-scroll-view-dom {
				white-space: nowrap;
				height: 200rpx;
			}
			.item {
				display: inline-flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 4rpx;
				width: 140rpx;
				height: 158rpx;
				vertical-align: top;
			}
			image {
				display: block;
				width: 104rpx;
				height: 104rpx;
				border-radius: 50%;
			}

			text {
				display: inline-block;
				padding: 0 0.5em;
				line-height: 40rpx;
				font-size: 23rpx;
				color: $grey1-color;
			}
		}
	}

	.main {
		display: flex;
		position: absolute;
		z-index: 5;
		top: 0;
		background: #ffffff;
		padding-top: 172rpx;

		.fixed-block {
			background: #ffffff;
			margin-top: -1px;

			&.fixed {
				position: absolute;
				z-index: 500;
				right: 0;
				width: 569rpx;
			}

			.sort-type {
				text-align: right;

				> text {
					padding: 0 25rpx;
					line-height: 68rpx;
					font-size: 23rpx;
					color: $grey1-color;

					.sort-type-arrow-icon {
						display: none;
					}

					&.act {
						.sort-type-arrow-icon {
							display: inline-block;
							padding: 0;
							line-height: initial;
							transition: 0.3s;

							&.priceNextStyle {
								transform: rotate(90deg);
							}
							&.priceUpStyle {
								transform: rotate(-90deg);
							}
						}
					}
				}

				border-bottom: 1px solid #efefef;
			}
		}

		.left-menu-list {
			position: relative;
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

			.act-bg-block {
				position: absolute;
				left: 0;
				top: 0;
				width: 181rpx;
				height: 100rpx;
				transition: 0.3s;
				background-color: $bg-grey-color;
				.left-line-block {
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 8rpx;
					height: 60rpx;
					border-radius: 0 1000px 1000px 0;
				}
				.yuan-bg {
					position: absolute;
					top: 26rpx;
					left: 36rpx;
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
				}
				.right-arrow {
					position: absolute;
					top: 50%;
					right: 0;
					transform: translateY(-50%);
				}
			}

			.menu-btn-link {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				font-size: 23rpx;
				color: $grey1-color;
				position: relative;
				transition: 0.3s;
				&.open-search-btn {
					position: fixed;
					z-index: 10;
					top: 173rpx;
					width: 178rpx;
					height: 80rpx;
					background: #ffffff;
				}

				.search-box {
					width: 66%;
					height: 66%;
					// border: 1px solid #f5f5f5;
					// border: 1px solid #91939c;
					border: 1px solid #c3c4c8;
					border-radius: 14rpx;
				}

				&.act {
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
			padding-bottom: 96rpx;
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

			.class-banner {
				width: 550rpx;
				height: 200rpx;
				margin: 10rpx auto 0;
				display: block;

				image {
					width: 550rpx;
					height: 200rpx;
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
