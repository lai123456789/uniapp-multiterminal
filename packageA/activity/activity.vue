<!-- 
	专题活动页面 - 三种活动模板的整合
-->
<template>
	<view class="activity-root" :style="{ background: pageBgColor }">
		<loading-css :is-show="isShowLoading"></loading-css>

		<view class="banner-wrap" v-if="topImage">
			<image
				class="image-size"
				mode="widthFix"
				:src="topImage"
				@click="swiperClickFn({ type: topImageClickType, content: topImageClickContent })"
			></image>
		</view>

		<!-- 模板2 的优惠券模块 -->
		<view class="coupon-wrap" v-if="templateType2 == templateType && couponList.length">
			<view class="title-bar">
				<view class="title-text">
					<view class="text-content" :style="{ color: couponTitleColor }">{{ couponTitleText }}</view>
					<view class="icon-before">
						<view class="after-dom" :style="{ background: couponTitleIconBgColor }"></view>
						<view class="before-dom" :style="{ background: couponTitleIconBgColor }"></view>
					</view>
					<view class="icon-after">
						<view class="after-dom" :style="{ background: couponTitleIconBgColor }"></view>
						<view class="before-dom" :style="{ background: couponTitleIconBgColor }"></view>
					</view>
				</view>
			</view>
			<view class="coupon-list">
				<view
					v-for="(item, index) in couponList"
					class="coupon-item"
					:class="[item.is_lingqu ? 'yilingqv' : '']"
					:key="index"
					:style="{ color: couponBlockTextColor, background: couponBlockBgColor }"
					@click="getCouponFn(index)"
				>
					<view class="price-box">
						<view class="price-icon">¥</view>
						<view class="price-money">{{ item.money }}</view>
					</view>
					<view class="coupon-info">
						<view class="coupon-name">{{ item.name }}</view>
						<view class="coupon-use-range">{{ item.coupon_ues_type }}</view>
					</view>
				</view>
			</view>
		</view>

		<block v-if="templateType == templateType1">
			<!-- 模板1 的头部商品 -->
			<view class="goods-list-column">
				<view class="goods-list-banner" v-if="topGoodsBannerTitleImage">
					<image class="image-size image-dom" mode="widthFix" :src="topGoodsBannerTitleImage"></image>
				</view>

				<view class="goods-list-column-listpage-wrap">
					<view class="goods-column-item-div" v-for="(item, index) in topGoodsList" :key="index">
						<goods-item-column
							:goods-id="item.goodsId"
							:goods-image="item.goodsImage"
							:is-hot="item.isHot"
							:is-new="item.isNew"
							:goods-name="item.goodsName"
							:goods-description="item.goodsDescription"
							:goods-tag="item.goodsTag"
							:is-vip-price="item.isVipPrice"
							:goods-price="item.goodsPrice"
							:vip-price="item.vipPrice"
							:line-price="item.linePrice"
							:selected-num="item.selectedNum"
							:is-spec="item.isSpec"
							:tag-img="item.tagImg"
							page="packageA/activity/activity"
						></goods-item-column>
					</view>
				</view>
			</view>
			<view class="goods-list-banner" v-if="bottomGoodsBannerTitleImage">
				<image class="image-size image-dom" mode="widthFix" :src="bottomGoodsBannerTitleImage"></image>
			</view>

			<!-- 模板1 的底部商品 -->
			<view class="goods-list-scroll">
				<scroll-view :scroll-x="true" class="scroll-view-dom" @scrolltolower="scrolltolowerFn">
					<view class="goods-column-scroll-item-div" v-for="(item, index) in bottomGoodsList" :key="index">
						<goods-item-column
							:goods-id="item.goodsId"
							:goods-image="item.goodsImage"
							:is-hot="item.isHot"
							:is-new="item.isNew"
							:goods-name="item.goodsName"
							:goods-description="item.goodsDescription"
							:goods-tag="item.goodsTag"
							:is-vip-price="item.isVipPrice"
							:goods-price="item.goodsPrice"
							:vip-price="item.vipPrice"
							:line-price="item.linePrice"
							:selected-num="item.selectedNum"
							:is-spec="item.isSpec"
							:tag-img="item.tagImg"
							page="packageA/activity/activity"
						></goods-item-column>
					</view>
				</scroll-view>
			</view>
		</block>

		<!-- 模板2 模板3 的头部商品 -->

		<block v-if="templateType == templateType2 || templateType == templateType3">
			<view class="goods-list-row">
				<view class="goods-list-banner" v-if="topGoodsBannerTitleImage">
					<image class="image-size image-dom" mode="widthFix" :src="topGoodsBannerTitleImage"></image>
				</view>

				<view class="goods-row-item-wrap" v-for="(item, index) in topGoodsList" :key="index">
					<goods-item-row
						:goods-id="item.goodsId"
						:goods-image="item.goodsImage"
						:is-hot="item.isHot"
						:is-new="item.isNew"
						:goods-name="item.goodsName"
						:goods-description="item.goodsDescription"
						:goods-tag="item.goodsTag"
						:is-vip-price="item.isVipPrice"
						:goods-price="item.goodsPrice"
						:vip-price="item.vipPrice"
						:line-price="item.linePrice"
						:selected-num="item.selectedNum"
						:is-spec="item.isSpec"
						:tag-img="item.tagImg"
						page="packageA/activity/activity"
					></goods-item-row>
				</view>
			</view>

			<!-- 模板2 模板3 的底部部商品 -->
			<view class="goods-list-column">
				<view class="goods-list-banner" v-if="bottomGoodsBannerTitleImage">
					<image class="image-size image-dom" mode="widthFix" :src="bottomGoodsBannerTitleImage"></image>
				</view>

				<view class="goods-list-column-listpage-wrap">
					<view class="goods-column-item-div" v-for="(item, index) in bottomGoodsList" :key="index">
						<goods-item-column
							:goods-id="item.goodsId"
							:goods-image="item.goodsImage"
							:is-hot="item.isHot"
							:is-new="item.isNew"
							:goods-name="item.goodsName"
							:goods-description="item.goodsDescription"
							:goods-tag="item.goodsTag"
							:is-vip-price="item.isVipPrice"
							:goods-price="item.goodsPrice"
							:vip-price="item.vipPrice"
							:line-price="item.linePrice"
							:selected-num="item.selectedNum"
							:is-spec="item.isSpec"
							:tag-img="item.tagImg"
							page="packageA/activity/activity"
						></goods-item-column>
					</view>
				</view>
			</view>
		</block>

		<!-- 模板2 模板3 的底部加载更多按钮 -->
		<view
			class="load-more-btn"
			:style="{ background: loadMoreBgColor }"
			@click="loadMoreGoodsFn"
			v-if="templateType == templateType2 || templateType == templateType3"
		>
			<view class="btn-text" :style="{ color: loadMoreTextColor }">{{ loadMoreBtnText }}</view>
			<view class="btn-icon" :style="{ transform: `rotate(${loadMoreBtnText == '收起' ? 180 : 0}deg)` }">
				<view class="after" :style="{ borderColor: loadMoreIconColor }"></view>
			</view>
		</view>

		<!-- 模板1的底部logo图 -->
		<view class="bottom-seller-logo" v-if="templateType == templateType1 && bottomImage">
			<image class="image-size" mode="widthFix" :src="bottomImage"></image>
		</view>

		<!-- 模板2的底部 查看更多图 -->
		<view
			v-if="templateType == templateType2 && bottomImage"
			class="load-more-image-btn"
			@click="navigateToFn({ url: '/pages/class/class', isTab: true })"
		>
			<image class="image-dom" :src="bottomImage"></image>
		</view>

		<!-- 模板3的底部 底线组件 -->
		<div class="bottom-line" :style="{ color: bottomLineColor }" v-if="templateType == templateType3">
			<view class="after" :style="{ background: bottomLineColor }"></view>
			<view class="before" :style="{ background: bottomLineColor }"></view>
			{{ bottomLineText }}
		</div>

		<login-fn
			:is-show-login="loginBoxFlag"
			@loginSuccessCallback="refreshFn"
			@close="closeGlobalLoginFn"
		></login-fn>

		<fixed-cart-icon :scroll-is-stop="mixinScrollIsStop" :cardNumber="cardNumber"></fixed-cart-icon>

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
import { assertArray, assertObject, addSpecFilterItemActAttrFn, cloneFn } from '@/tools/tools.js';

import goodsItemColumn from '@/packageA/activity/activity-components/goods-item-column.vue';
import goodsItemRow from '@/packageA/activity/activity-components/goods-item-row.vue';

// const ztId = 2;

const templateType1 = 1,
	templateType2 = 2,
	templateType3 = 3;

export default {
	components: { goodsItemColumn, goodsItemRow },
	data() {
		return {
			isShowLoading: true, // 开屏动画

			id: null, // 模板id
			templateType: null, // 模板类型 1,2,3 (对应 后台的 模板一 模板二 模板三)

			// ↓↓↓ 三个模板类型
			templateType1,
			templateType2,
			templateType3,

			pageTitle: '', // 页面标题
			pageBgColor: '', // 页面背景颜色

			topImage: '', // 页面顶部的图片路径
			topImageClickType: 0, // 点击顶部图跳转类型
			topImageClickContent: 0, // 点击顶部图跳转内容

			topGoodsBannerTitleImage: '', // 顶部的商品标题图片路径
			topGoodsList: [{}], // 顶部的商品列表数据

			bottomGoodsBannerTitleImage: '', // 底部的商品标题图片路径
			bottomGoodsList: [{}], // 底部的商品列表数据

			bottomImage: '', // 页面底部的图片路径

			couponTitleText: '', // 优惠券标题文字
			couponTitleColor: '', // 优惠券标题文字颜色
			couponTitleIconBgColor: '', // 优惠券标题的图标的背景颜色
			couponBlockBgColor: '', // 优惠券背景颜色
			couponBlockTextColor: '', // 优惠券字体颜色
			couponList: [{}], // 优惠券列表

			loadMoreBgColor: '', // 加载更多按钮背景颜色
			loadMoreTextColor: '', // 加载更多按钮文字颜色
			loadMoreIconColor: '', // 加载更多按钮箭头图标颜色

			isloadEnd: false, // 是否全部加载完成了
			goodsListIsAllOpen: false, // 商品列表是否全部展开了
			moreGoodsListStr: '', // 收起商品的数据

			bottomGoodsIndex: 1, // 底部商品的分页数索引

			// 处理模板三的底线
			bottomLineText: '', // 底部的底线提示文字
			bottomLineColor: '', // 底部的底线提示文字颜色

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
	onUnload() {
		uni.$off('goodsAddCartEd_activity');
	},

	onLoad(options) {
		let that = this;
		that.id = options.id;

		// 加入购物车成功后
		uni.$off('goodsAddCartEd_activity');
		uni.$on('goodsAddCartEd_activity', arg => {
			let { selectedNum, goodsId } = arg;
			that.topGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});
			that.bottomGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});
		});
	},
	onShow() {
		let that = this;
		that.isShowLoading = true;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});

		that.loadFn();
		
		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();
		

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			let currentGoods = assertObject(
				assertArray(
					cloneFn(that.topGoodsList)
						.concat(cloneFn(that.bottomGoodsList))
						.filter(item => item.goodsId == goodsId)
				)[0]
			);

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
		// 登录成功后
		refreshFn() {
			this.loadFn();
		},
		// 根据模板id获取当前模板类型 和 展示数据
		getTemplateInfoFn(templateId) {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/Zthd/ztDetail',
					data: {
						id: templateId
					}
				});
				//数据返回后 处理方式  处理数据
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data); // 接口的所有数据

						let goodsObj = assertObject(resultObject.goods); // 所有商品数据
						let topGoods = assertObject(goodsObj['1']); // 页面上半部分商品
						let bottomGoods = assertObject(goodsObj['2']); // 页面下半部分商品

						let pageTopImage = assertObject(resultObject.top_img); // 页面顶部的图片信息

						let templateType = resultObject.z_id; // 模板类型

						// 成功的 result 数据
						let resultObj = {
							templateType
						};

						// ↓↓↓ 页面配置
						// 页面标题
						resultObj.pageTitle = resultObject.title;
						// 页面背景颜色
						resultObj.pageBgColor = resultObject.bg_color;

						// 页面顶部图片配置
						let content;
						if (pageTopImage.jump_type == 6) {
							let con = assertObject(pageTopImage.jumpPath);
							content = {
								appid: con.AppId,
								path: con.AppUrl
							};
						} else {
							content = pageTopImage.jumpPath;
						}
						resultObj.topImage = pageTopImage.httpPath ? pageTopImage.httpPath : '';
						resultObj.topImageClickType = pageTopImage.jump_type;
						resultObj.topImageClickContent = content;

						resultObj.topGoods = {
							bannerTitleImage: topGoods.bannerHttp ? topGoods.bannerHttp : '',
							goodsList: assertArray(topGoods.goodsList)
						};
						resultObj.bottomGoods = {
							bannerTitleImage: bottomGoods.bannerHttp ? bottomGoods.bannerHttp : '',
							goodsList: assertArray(bottomGoods.goodsList)
						};

						// 处理 模板2 的优惠券数据
						if (templateType == templateType2) {
							let couponObj = assertObject(resultObject.coupon);
							resultObj.couponTitleText = couponObj.title; // 优惠券标题文字
							resultObj.couponTitleColor = couponObj.title_color; // 优惠券标题文字颜色
							resultObj.couponTitleIconBgColor = couponObj.title_icon_color; // 优惠券标题的图标的背景颜色
							resultObj.couponBlockBgColor = couponObj.c_bg_color; // 优惠券背景颜色
							resultObj.couponBlockTextColor = couponObj.c_text_color; // 优惠券字体颜色
							resultObj.couponList = assertArray(couponObj.couponList);
						}
						// 处理 模板1 和 模板2 的底部图片
						if (templateType == templateType1 || templateType == templateType2) {
							if (resultObject.bottom_img) {
								resultObj.bottomImage = `${resultObject.path}${resultObject.bottom_img}`;
							} else {
								resultObj.bottomImage = '';
							}
						}

						// 处理 模板2 和 模板3 的底部按钮配置
						if (templateType == templateType2 || templateType == templateType3) {
							let loadMore = assertObject(resultObject.other_data);
							resultObj.loadMoreBgColor = loadMore.show_more_bgcolor;
							resultObj.loadMoreTextColor = loadMore.show_more_textcolor;
							resultObj.loadMoreIconColor = loadMore.show_more_iconcolor;
						}

						// 处理模板三的底线
						if (templateType == templateType3) {
							let bottomLine = assertObject(resultObject.bottom_img);
							resultObj.bottomLineText = bottomLine.text;
							resultObj.bottomLineColor = bottomLine.color;
						}

						resFn({
							msg: '获取数据成功',
							result: resultObj
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
		// 底部商品组滑动加载更多商品
		getBottomGoodsFn(pageIndex = 2, activityId) {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: `/api/Zthd/pageModeNew`,
					data: {
						page: pageIndex,
						zt_id: activityId
					}
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let goodsList = assertArray(result.data.data);
						resFn({
							msg: result.data.msg,
							result: goodsList
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
		// 页面加载
		async loadFn() {
			let that = this;
			try {
				let { result } = await that.getTemplateInfoFn(that.id);

				console.log('getTemplateInfoFn函数的 /api/Zthd/ztDetail 接口返回数据', result);

				let { templateType } = result;

				that.templateType = templateType;

				that.pageTitle = result.pageTitle; // 页面标题
				that.pageBgColor = result.pageBgColor; // 页面背景颜色

				that.topImage = result.topImage; // 页面顶部图片路径
				that.topImageClickType = result.topImageClickType; // 顶部图片跳转类型
				that.topImageClickContent = result.topImageClickContent; // 顶部图片跳转content

				that.topGoodsBannerTitleImage = result.topGoods.bannerTitleImage;
				that.topGoodsList = result.topGoods.goodsList.map(item => {
					return {
						goodsId: item.goods_id, // 商品id
						goodsImage: item.original_img, // 商品图片
						isHot: item.is_hot == 1, // 是否热销爆款
						isNew: item.is_new == 1, // 是否新品
						goodsName: item.goods_name, // 商品名称
						goodsDescription: item.goods_remark, // 商品描述
						goodsTag: item.tag_name, // 商品标签文字
						isVipPrice: item.is_vip_price == 1, // 是否会员专享
						goodsPrice: item.shop_price, // 商品价格
						vipPrice: item.vip_market_price, // 会员价
						linePrice: item.vip_market_price, // 划线价
						selectedNum: item.selectedNum, // 已经添加到购物车的数量
						isSpec: item.is_guige == 1, // 商品是否多规格
						tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
					};
				});

				that.bottomGoodsBannerTitleImage = result.bottomGoods.bannerTitleImage;
				that.bottomGoodsList = result.bottomGoods.goodsList.map(item => {
					return {
						goodsId: item.goods_id, // 商品id
						goodsImage: item.original_img, // 商品图片
						isHot: item.is_hot == 1, // 是否热销爆款
						isNew: item.is_new == 1, // 是否新品
						goodsName: item.goods_name, // 商品名称
						goodsDescription: item.goods_remark, // 商品描述
						goodsTag: item.tag_name, // 商品标签文字
						isVipPrice: item.is_vip_price == 1, // 是否会员专享
						goodsPrice: item.shop_price, // 商品价格
						vipPrice: item.vip_market_price, // 会员价
						linePrice: item.vip_market_price, // 划线价
						selectedNum: item.selectedNum, // 已经添加到购物车的数量
						isSpec: item.is_guige == 1, // 商品是否多规格
						tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
					};
				});

				if (that.bottomGoodsList.length >= 12) {
					that.isloadEnd = false;
					that.goodsListIsAllOpen = false;
				} else {
					that.isloadEnd = true;
					that.goodsListIsAllOpen = true;
				}

				// 处理 模板2 的优惠券数据
				if (templateType == templateType2) {
					that.couponTitleText = result.couponTitleText;
					that.couponTitleColor = result.couponTitleColor;
					that.couponTitleIconBgColor = result.couponTitleIconBgColor;
					that.couponBlockBgColor = result.couponBlockBgColor;
					that.couponBlockTextColor = result.couponBlockTextColor;
					that.couponList = result.couponList;
				}
				// 处理 模板1 和 模板2 的底部图片
				if (templateType == templateType1 || templateType == templateType2) {
					that.bottomImage = result.bottomImage;
				}

				// 处理 模板2 和 模板3 的底部按钮配置
				if (templateType == templateType2 || templateType == templateType3) {
					that.loadMoreBgColor = result.loadMoreBgColor;
					that.loadMoreTextColor = result.loadMoreTextColor;
					that.loadMoreIconColor = result.loadMoreIconColor;
				}

				// 处理模板三的底线
				if (templateType == templateType3) {
					that.bottomLineText = result.bottomLineText;
					that.bottomLineColor = result.bottomLineColor;
				}
				// 修改页面标题
				uni.setNavigationBarTitle({ title: that.pageTitle });
			} catch (e) {
				console.log('getTemplateInfoFn函数的 /api/Zthd/ztDetail 接口报错', e);
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
			that.isShowLoading = false;
			that.scrollGoodsIndex = 1;
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

		// 页面底部加载更多按钮
		async loadMoreGoodsFn() {
			let that = this;
			if (that.isloadEnd) {
				if (that.goodsListIsAllOpen) {
					that.goodsListIsAllOpen = false;

					let moreGoodsList = that.bottomGoodsList.splice(3, that.bottomGoodsList.length);
					that.moreGoodsListStr = JSON.stringify(moreGoodsList);
				} else {
					that.goodsListIsAllOpen = true;
					that.bottomGoodsList = that.bottomGoodsList.concat(JSON.parse(that.moreGoodsListStr));
				}
				return false;
			}

			that.bottomGoodsIndex++;

			uni.showLoading({});
			try {
				let { result } = await that.getBottomGoodsFn(that.bottomGoodsIndex, that.id);
				if (result.length) {
					let mapGoodsArr = result.map(item => {
						return {
							goodsId: item.goods_id, // 商品id
							goodsImage: item.original_img, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名称
							goodsDescription: item.goods_remark, // 商品描述
							goodsTag: item.tag_name, // 商品标签文字
							isVipPrice: item.is_vip_price == 1, // 是否会员专享
							goodsPrice: item.shop_price, // 商品价格
							vipPrice: item.vip_market_price, // 会员价
							linePrice: item.vip_market_price, // 划线价
							selectedNum: item.selectedNum, // 已经添加到购物车的数量
							isSpec: item.is_guige == 1, // 商品是否多规格
							tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
						};
					});

					that.bottomGoodsList = that.bottomGoodsList.concat(mapGoodsArr);

					if (mapGoodsArr.length >= 12) {
						that.isloadEnd = false;
						that.goodsListIsAllOpen = false;
					} else {
						that.isloadEnd = true;
						that.goodsListIsAllOpen = true;
					}
				} else {
					that.bottomGoodsIndex--;
					if (that.bottomGoodsIndex <= 1) {
						that.bottomGoodsIndex = 1;
					}
					that.isloadEnd = true;
					that.goodsListIsAllOpen = true;
				}

				that.hideAllFn();
			} catch (e) {
				console.log('that.getBottomGoodsFn 函数运行错误', e);
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
		},
		async getCouponFn(index) {
			let that = this;
			let currentCoupon = assertObject(that.couponList[index]);

			if (currentCoupon.is_lingqu) {
				return false;
			}
			let result = await that.$request({
				method: 'post',
				url: `/api/User/GetCoupon`,
				data: {
					couponIds: currentCoupon.id
				}
			});

			if (result.statusCode == 200) {
				let icon;

				if (result.data.code == 200) {
					icon = 'success';
					that.couponList[index].is_lingqu = true;
				} else {
					icon = 'none';
				}

				uni.showToast({
					icon,
					title: result.data.msg
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},
		// 页面底部的商品滑动列表 滑到最右边执行的函数
		async scrolltolowerFn() {
			let that = this;

			uni.showLoading({});

			that.scrollGoodsIndex++;

			try {
				let { result } = await that.getBottomGoodsFn(that.scrollGoodsIndex, that.id);
				if (result.length) {
					let mapGoodsArr = result.map(item => {
						return {
							goodsId: item.goods_id, // 商品id
							goodsImage: item.original_img, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名称
							goodsDescription: item.goods_remark, // 商品描述
							goodsTag: item.tag_name, // 商品标签文字
							isVipPrice: item.is_vip_price == 1, // 是否会员专享
							goodsPrice: item.shop_price, // 商品价格
							vipPrice: item.vip_market_price, // 会员价
							linePrice: item.vip_market_price, // 划线价
							selectedNum: item.selectedNum, // 已经添加到购物车的数量
							isSpec: item.is_guige == 1, // 商品是否多规格
							tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
						};
					});
					that.bottomGoodsList = that.bottomGoodsList.concat(mapGoodsArr);
				} else {
					that.scrollGoodsIndex--;
					if (that.scrollGoodsIndex <= 1) {
						that.scrollGoodsIndex = 1;
					}
				}

				that.hideAllFn();
			} catch (e) {
				console.log('getScrollGoodsFn 运行失败', e);
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
		}
	}, // ↑↑↑↑↑ methods 结束
	computed: {
		// 加载更多按钮展示的文字
		loadMoreBtnText() {
			let that = this;
			if (that.isloadEnd) {
				if (that.goodsListIsAllOpen) {
					return '收起';
				} else {
					return '查看更多';
				}
			} else {
				return '查看更多';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.activity-root {
	width: 750rpx;
	min-height: 100vh;
	background: #feb58c;

	image {
		display: block;
	}

	.banner-wrap {
		width: 100%;
	}

	/* 标题图片 */

	.goods-list-banner {
		overflow: hidden;
		.image-dom {
			margin: 12rpx 0;
		}
	}

	/* 优惠券 */
	.coupon-wrap {
		height: 120px;
		.title-bar {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 68rpx;
			text-align: center;
		}
		.title-text {
			display: inline-block;
			position: relative;
			font-size: 32rpx;
			font-weight: 600;
			color: #ea2618;
			letter-spacing: 2rpx;

			.text-content {
				max-width: 520rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}

		.icon-before,
		.icon-after {
			position: absolute;
			top: 50%;
			margin-top: -14rpx;
			width: 28rpx;
			height: 28rpx;
		}

		.icon-before {
			left: -8rpx;
			transform: translateX(-100%);

			.after-dom {
				position: absolute;
				top: 50%;
				left: 0;
				width: 10rpx;
				height: 10rpx;
				background: #ea2618;
				transform: translateY(-50%) rotate(45deg);
			}

			.before-dom {
				position: absolute;
				top: 50%;
				right: 0;
				width: 16rpx;
				height: 16rpx;
				background: #ea2618;
				transform: translateY(-50%) rotate(45deg);
			}
		}

		.icon-after {
			right: -8rpx;
			transform: translateX(100%);

			.after-dom {
				position: absolute;
				top: 50%;
				left: 0;
				width: 16rpx;
				height: 16rpx;
				background: #ea2618;
				transform: translateY(-50%) rotate(45deg);
			}

			.before-dom {
				position: absolute;
				top: 50%;
				right: 0;
				width: 10rpx;
				height: 10rpx;
				background: #ea2618;
				transform: translateY(-50%) rotate(45deg);
			}
		}

		.coupon-list {
			overflow-y: hidden;
			padding: 0 20rpx;
			height: 164rpx;
			white-space: nowrap;
		}

		.coupon-list::-webkit-scrollbar {
			display: none;
		}

		.coupon-item {
			display: inline-flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin-left: 8rpx;
			padding: 16rpx 20rpx;
			width: 188rpx;
			height: 164rpx;
			background: #ff6160;
			border-radius: 8rpx;
			color: #ffffff;
			font-size: 0;
			overflow: hidden;
			&.yilingqv {
				position: relative;
				background: #d0d0d0 !important;
				&::after {
					content: '已领取';
					display: block;
					position: absolute;
					width: 80rpx;
					height: 30rpx;
					background: #b1b1b1;
					color: #ffffff;
					font-size: 20rpx;
					text-align: center;
					right: 0;
					top: 0;
					border-radius: 1000px 0 0 1000px;
				}
			}

			.price-box {
				height: 64rpx;
				text-align: center;
			}

			.coupon-info {
				display: flex;
				flex-direction: column;
				width: 100%;
				text-align: center;
			}
		}

		.coupon-item:nth-child(1) {
			margin-left: 0;
		}

		.price-icon {
			display: inline-block;
			margin-right: 2rpx;
			font-size: 24rpx;
			vertical-align: text-bottom;
		}

		.price-money {
			display: inline-block;
			font-weight: 600;
			font-size: 44rpx;
			vertical-align: super;
		}

		.coupon-name {
			width: 100%;
			font-size: 26rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.coupon-use-range {
			width: 100%;
			font-size: 24rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

	/* 一个商品独占一行左图右字样式 */
	.goods-list-row {
		.goods-row-item-wrap {
			overflow: hidden;
			padding: 5rpx 0;
		}
	}

	/* 三个商品一行排列商品 上图下字样式 */

	.goods-list-column-listpage-wrap {
		width: 702rpx;
		margin: 0 auto;
		font-size: 0;

		.goods-column-item-div {
			display: inline-block;
			margin-right: 12rpx;
			margin-bottom: 12rpx;

			&:nth-child(3n) {
				margin-right: 0 !important;
			}
		}
	}

	.load-more-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20rpx auto;
		width: 702rpx;
		height: 80rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background: #ffffff;

		.btn-text {
			font-size: 28rpx;
			color: #000000;
		}

		.btn-icon {
			position: relative;
			margin: 0 4rpx;
			width: 20rpx;
			height: 10rpx;
			overflow: hidden;
			.after {
				display: block;
				position: absolute;
				top: 0;
				left: 50%;
				width: 10rpx;
				height: 10rpx;
				border: 1px solid #000000;
				transform: translateY(-50%) translateX(-50%) rotate(45deg);
			}
		}
	}

	.load-more-image-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		.image-dom {
			margin: 20rpx auto;
			width: 300rpx;
			height: 70rpx;
		}
	}

	.bottom-line {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0 auto;
		width: 702rpx;
		height: 80rpx;
		color: #bd8c84;
		font-size: 28rpx;

		.after,
		.before {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			width: 168rpx;
			height: 1px;
			background: #bd8c84;
		}

		.after {
			right: 60rpx;
		}

		.before {
			left: 60rpx;
		}
	}

	/* 一行排列可滑动商品 */

	.goods-list-scroll {
		width: 750rpx;
		height: 476rpx;
		// padding: 0 24rpx;
		font-size: 0;
		overflow: hidden;
		.scroll-view-dom {
			white-space: nowrap;
			height: 490rpx;
			.goods-column-scroll-item-div {
				display: inline-block;
				margin-right: 10rpx;

				&:nth-child(1) {
					margin-left: 24rpx;
				}
				&:nth-last-child(1) {
					margin-right: 24rpx;
				}
			}
		}
	}
}
</style>
