<!-- 
	普通商品详情页面
-->
<template>
	<view>
		<!--
		<view class="create-share-image-wrap">
			<canvas
				class="create-share-canvas"
				canvas-id="create-share-canvas"
			></canvas>
		</view>
		-->
		<loading-image :is-show-gif="isShowGif"></loading-image>
		<!-- <back-btn></back-btn> -->
		<goods-detail-swiper
			:goods-video-src="videoStrStr"
			:swiper-img-arr="swiperImgArr"
			page-type="default"
			:is-every-day-buy-goods="isEveryDayBuyGoods"
			@setEveryDayBuyStatus="setEveryDayBuyStatus"
		></goods-detail-swiper>
		<view class="goods-description-wrap content-wrap">
			<view class="goods-name-share-block">
				<view class="goods-name-block">{{ detailGoodsName }}</view>
				<view class="share-btn-block flex-center">
					<view class="share-code-img-wrap">
						<share-code-img
							:goods-id="goodsId"
							:goods-name="detailGoodsName"
							:goods-imgs="swiperImgArr"
							:goods-price="detailGoodsShopPrice"
							path="packageB/goods-detail/goods-detail"
						></share-code-img>
					</view>
				</view>
			</view>
			<view class="goods-description-text">{{ detailGoodsRemark }}</view>
			
			<view class="goods-price-sale">
				<view class="price-box">
					<view class="goods-price-box">
						<view class="icon-price red-price">
							¥
						</view>
						<view class="price-txt red-price">
							{{ detailGoodsShopPrice | filterTransNum }}
						</view>
						<view class="unit-text">
							/{{ detailGoodsUnit }}
						</view>
					</view>
					<view class="vip-price-wrap">
						<vip-price>{{ detailGoodsHuiyuanPrice | filterTransNum }}</vip-price>
					</view>
				</view>
				<view class="sale-text">
					<block v-if="monthNum >= 1">月销售量{{ monthNum }}{{ detailGoodsUnit }}</block>
					<block v-if="monthNum >= 1 && detailGoodsStoreCount >= 1">,</block>
					<block v-if="detailGoodsStoreCount >= 1">
						库存{{ detailGoodsStoreCount }}{{ detailGoodsUnit }}
					</block>
				</view>
			</view>
			<view class="dispatch-info-block">
				<view class="title-text">配送</view>
				<view class="dispatch-detail">{{ detailGoodsPost }}</view>
			</view>
		</view>
		

		<coupon-bar v-if="yhCoupon.length" title-text="优惠券" :coupon-list="yhCoupon"></coupon-bar>

		<coupon-bar v-if="goodsCoupon.length" title-text="商品券" :coupon-list="goodsCoupon"></coupon-bar>

		<!-- 打开开通会员页面的 提示 栏 -->
		<open-vip-page
			:to-vip-page-style-is-open="toVipPageStyleIsOpen"
			:to-vip-page-style-icon-img="toVipPageStyleIconImg"
			:to-vip-page-style-bg-color="toVipPageStyleBgColor"
			:to-vip-page-left-text="toVipPageLeftText"
			:to-vip-page-left-text-color="toVipPageLeftTextColor"
			:to-vip-page-right-text="toVipPageRightText"
			:to-vip-page-right-text-color="toVipPageRightTextColor"
		></open-vip-page>

		<!-- ↓↓ 商品详情页面 推荐吃什么 菜单 滑动 组件 -->
		<recommend-eat :recommend-eat-list="recDeliciousArr" :recommend-eat-name="recDeliciousName"></recommend-eat>

		<!-- ↓↓ 商品详情页面 推荐商品列表 滑动 组件 -->
		<recommend-goods :recommend-goods-list="recGoodsArr" :recommend-goods-name="recGoodsName"></recommend-goods>

		<!-- ↓↓ 商品详情页面 展示 评论组件 -->
		<comment
			:goods-id="goodsId"
			:comment-name="goodsCommentName"
			:comment-sum="goodsCommentSum"
			:comment-scale="goodsCommentScale"
			:comment-list="goodsCommentArr"
		></comment>

		<!-- 商品详情页面 商品详情富文本 和 购买记录组件  -->
		<detail-shopping-records
			:goods-detail-content="detailGoodsContent"
			:pay-history-list="payHistoryList"
			@loadMoreShoppingRecordsFn="loadMoreShoppingRecordsFn"
		></detail-shopping-records>

		<!-- 商品详情页面 商家承诺 和 价格说明组件  -->
		<seller-promise-price-show :seller-promise="promisesNodes" :price-show="priceMean"></seller-promise-price-show>

		<add-cart-block
			page="default"
			:goods-id="goodsId"
			:is-spec="isSpec"
			:selected-num="selectedNum"
			@changeGoodsInfoFn="changeGoodsInfoFn"
			:goodsImage="swiperImgArr[0]"
			:pagePath="`packageB/goods-detail/goods-detail?goods_id=${goodsId}`"
			:goodsName="detailGoodsName"
			:cardNumber="cardNumber"
		></add-cart-block>
		<view style="height: 96rpx;"></view>

		<to-top-btn :flag="isShowToTopBtn"></to-top-btn>

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

		<!-- ↓↓↓ 轮播平台售卖记录组件 -->
		<play-buy-history :page-is-show="pageShowFlag" page="detail"></play-buy-history>
	</view>
</template>

<script>
// #ifdef H5
import jweixinModule from '@/tools/libs/jweixin-module.js';
// #endif
import { success, error, bindMobileTips } from '@/tools/const.js';

import addCartBlock from '@/df-components/add-cart-block';
import loadingImage from '@/df-components/loading-image';
import shareCodeImg from '@/df-components/share-code-img/share-code-img';

import backBtn from '@/packageB/goods-detail/goods-detail-components/back-btn.vue'; // 左上角 返回上一页的 按钮
import goodsDetailSwiper from '@/packageB/goods-detail/goods-detail-components/goods-detail-swiper.vue'; // 详情页的 头部轮播图组件 + 视频播放
import recommendEat from '@/packageB/goods-detail/goods-detail-components/recommend-eat.vue'; // 商品详情页面 推荐吃什么 菜单 滑动 组件
import recommendGoods from '@/packageB/goods-detail/goods-detail-components/recommend-goods.vue'; // 商品详情页面 推荐商品列表 滑动 组件
import comment from '@/packageB/goods-detail/goods-detail-components/comment.vue'; // 商品详情页面 展示 评论组件
import detailShoppingRecords from '@/packageB/goods-detail/goods-detail-components/detail-shopping-records.vue'; // 商品详情页面 商品详情富文本 和 购买记录组件
import sellerPromisePriceShow from '@/packageB/goods-detail/goods-detail-components/seller-promise-price-show.vue'; // 商品详情页面 商家承诺 和 价格说明组件
import openVipPage from '@/packageB/goods-detail/goods-detail-components/to-vip-page.vue'; // 商品详情里使用到的组件 跳转到开通vip页面
import couponBar from '@/packageB/goods-detail/goods-detail-components/coupon-bar.vue'; // 详情页 优惠券组件外层的展示条

import playBuyHistory from '@/df-components/global-components/play-buy-history.vue'; // 轮播平台售卖记录组件

import {
	goodsDetailWidthFn,
	assertObject,
	assertArray,
	cloneFn,
	addSpecFilterItemActAttrFn,
	assertString,
	transNumFn
} from '@/tools/tools';

let everyDayBuyBtnFlag = true; // everyDayBuyBtnFlag 是否可以切换常购

export default {
	components: {
		openVipPage,
		addCartBlock,
		loadingImage,
		shareCodeImg,
		backBtn,
		goodsDetailSwiper,
		recommendEat,
		recommendGoods,
		comment,
		detailShoppingRecords,
		sellerPromisePriceShow,
		couponBar,
		playBuyHistory
	},
	data() {
		return {
			buyRowPage: 1, //购买记录当前的 页码
			isShowGif: true, // 是否显示开屏动画
			goodsId: null, //商品id
			swiperImgArr: [], // 轮播图的图片数组

			isEveryDayBuyGoods: false, // 是否常购商品

			// 商品信息↓↓
			detailGoodsName: '', // 商品名字
			detailGoodsRemark: '', // 商品描述
			detailGoodsContent: '', // 商品详情
			detailGoodsShopPrice: '', // 商品价格
			detailGoodsHuiyuanPrice: '', // 商品会员价格
			detailGoodsUnit: '', // 商品单位
			detailGoodsPost: '', // 配送信息 文字
			detailGoodsStoreCount: 0, // 库存数
			detailGoodsTag: '', // 商品标签
			selectedNum: 0, // 当前商品加入到购物车的数量
			videoStrStr: '', // 商品的视频连接地址

			shareTitle: '', // 分享标题
			shareImage: '', // 分享图片

			// 跳转到开通会员的按钮 相关配置
			toVipPageStyleIsOpen: false, // 是否显示 跳转到开通会员的按钮
			toVipPageStyleIconImg: '', // 左侧的图标
			toVipPageStyleBgColor: '', // 整体背景颜色
			toVipPageLeftText: '', // 左侧的文字
			toVipPageLeftTextColor: '', // 左侧的文字颜色
			toVipPageRightText: '', // 右侧文字
			toVipPageRightTextColor: '', // 右侧的文字颜色

			goodsCoupon: [{}], // 商品券
			yhCoupon: [{}], // 优惠券

			payHistoryList: [], //购买记录
			monthNum: '', //月销售量

			promisesNodes: '', //商家承诺
			priceMean: '', //价格说明

			// 推荐菜谱↓↓
			recDeliciousArr: [], //菜谱的列表数据
			recDeliciousName: '', //菜谱的标题文字

			// 推荐商品↓↓
			recGoodsArr: [], //推荐商品列表数据
			recGoodsName: '', //推荐商品标题文字

			// 商品评价↓↓
			goodsCommentSum: '', //商品的总和
			goodsCommentName: '', //名字
			goodsCommentScale: '', //百分比
			goodsCommentArr: [], //数据列表

			pageShowFlag: false, // 当前页面是否show

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '', // 当前弹窗多规格的商品即加入到购物车里的数量
			// 当前页面展示商品的多规格相关--------------------------------------------------------
			isSpec: false, // 当前页面展示商品 是否 多规格
			detailPageGoodsSpecSelectItemList: [{}], // 当前详情页面 商品的 多规格项
			detailPageGoodsSpecRowsList: {}, // 当前详情页面 商品的 笛卡尔积项对应的 商品 信息

			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag: false, // 登录框显示隐藏状态
			cardNumber: 0 // 购物车数量
		};
	},

	onUnload() {
		uni.$off('goodsAddCartEd_goodsDetail');
	},

	onLoad(option) {
		let that = this;
		console.log('商品详情load函数 带的参数_', option);
		if (option.scene && !option.shareFn) {
			that.setSharerStrFn(option.scene);
			let searchArr = decodeURIComponent(option.scene).split(',');
			option.goods_id = searchArr[1];
		}
		if (option.shareFn) {
			that.setSharerStrFn_btn(option);
		}

		that.goodsId = option.goods_id;

		uni.$off('goodsAddCartEd_goodsDetail');
		uni.$on('goodsAddCartEd_goodsDetail', arg => {
			let { selectedNum, goodsId } = arg;
			that.recGoodsArr.forEach(goodsItem => {
				if (goodsItem.goodsId == goodsId) {
					goodsItem.selectedNum = selectedNum;
				}
			});
		});
	},
	onHide() {
		this.pageShowFlag = false;
	},
	onShow() {
		let that = this;

		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});

		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();

		setTimeout(() => {
			that.pageShowFlag = true;
		});

		everyDayBuyBtnFlag = true;

		that.getGoodsInfoFn();

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			console.log('商品详情里 show 函数 监听的数据', goodsId, page);

			let currentGoods;
			if (page == 'goods-detail-bottom-add-cart-block') {
				currentGoods = {
					goodsName: that.detailGoodsName,
					goodsDescription: that.detailGoodsRemark,
					goodsImage: that.swiperImgArr[0],
					selectedNum: that.selectedNum
				};
			} else {
				currentGoods = assertObject(assertArray(that.recGoodsArr.filter(item => item.goodsId == goodsId))[0]);
			}
			that.currentGoodsId = goodsId;
			uni.showLoading({});

			console.log('当前点击商品的信息currentGoods', currentGoods);

			that.currentGoodsName = currentGoods.goodsName; // 当前弹窗多规格的商品名字
			that.currentGoodsDescription = currentGoods.goodsDescription; // 当前弹窗多规格的商品描述
			that.currentGoodsImages = currentGoods.goodsImage; // 当前弹窗多规格的商品图片

			that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量

			if (page == 'goods-detail-bottom-add-cart-block') {
				that.goodsSpecSelectItemList = that.detailPageGoodsSpecSelectItemList;
				that.goodsSpecRowsList = that.detailPageGoodsSpecRowsList;
			} else {
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
			}

			that.isShowGoodsSpec = true;
			that.hideAllFn();
		});
	},

	async onShareAppMessage() {
		let that = this;
		let title = `${that.shareTitle ? that.shareTitle : that.detailGoodsName}(¥${that.detailGoodsShopPrice}/${
			that.detailGoodsUnit
		})`;

		/*
		
		console.log('a');
		await that.sleepFn(3);
		console.log('b');
		*/

		return that.shareFn({
			path: '/packageB/goods-detail/goods-detail',
			query: {
				scene: true, // 如果登录就带着自己的加密字符串
				goods_id: that.goodsId
			},
			options: {
				title,
				imageUrl: that.shareImage ? that.shareImage : that.swiperImgArr[0]
			}
		});
	},
	methods: {
		// 刷新页面
		refreshFn() {
			this.getGoodsInfoFn();
			this.setTabBarCartNumFn();
		},
		//根据id获取商品详细信息
		async getGoodsInfoFn() {
			let that = this;
			let goods_id = that.goodsId;
			let result = await that.$request({
				url: '/api/Goods/goods_detail',
				data: {
					goods_id,
					type: 'common'
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					const resultData = assertObject(result.data.data);

					console.log('请求商品详情返回的数据', resultData);

					// 商品是否常购
					that.isEveryDayBuyGoods = resultData.oftenBuy == 1 ? true : false;

					/* 商品详情 */
					let goodsDetail = assertObject(resultData.detail);

					// 单个商品分享图文配置
					that.shareTitle = goodsDetail.share_title;
					that.shareImage = goodsDetail.share_img;

					that.videoStrStr = goodsDetail.video;

					// 赋值轮播图的数据
					that.swiperImgArr = assertArray(goodsDetail.images);

					console.log('that.swiperImgArr', that.swiperImgArr);

					// 赋值商品信息↓↓↓
					// 商品名字
					that.detailGoodsName = goodsDetail.goods_name;

					// 商品描述

					that.detailGoodsRemark = goodsDetail.goods_remark;

					// 商品价格
					that.detailGoodsShopPrice = goodsDetail.shop_price;
					// 商品会员价格
					that.detailGoodsHuiyuanPrice = goodsDetail.huiyuan_price;
					// 商品单位
					that.detailGoodsUnit = goodsDetail.unit;
					// 商品tag 3是vip
					that.detailGoodsTag = goodsDetail.tag;

					// 商品配送信息
					that.detailGoodsPost = goodsDetail.post;

					// 商品总库存
					that.detailGoodsStoreCount = transNumFn(goodsDetail.store_count);

					// 商品详情
					that.detailGoodsContent = goodsDetailWidthFn(assertString(goodsDetail.goods_content));

					// 商家承诺
					that.promisesNodes = goodsDetailWidthFn(assertString(goodsDetail.promises));

					// 价格说明
					that.priceMean = goodsDetailWidthFn(assertString(goodsDetail.price_mean));

					// 跳转到开通会员的按钮
					let toVipPageStyleObj = assertObject(goodsDetail.gd_content);
					that.toVipPageStyleIsOpen = toVipPageStyleObj.is_gd == 1; // 是否显示 跳转到开通会员的按钮
					that.toVipPageStyleIconImg = toVipPageStyleObj.gd_icon; // 左侧的图标
					that.toVipPageStyleBgColor = toVipPageStyleObj.gd_bg_color; // 整体背景颜色
					that.toVipPageLeftText = toVipPageStyleObj.gd_z_con; // 左侧的文字
					that.toVipPageLeftTextColor = toVipPageStyleObj.gd_zt_color; // 左侧的文字颜色
					that.toVipPageRightText = toVipPageStyleObj.gd_y_con; // 右侧文字
					that.toVipPageRightTextColor = toVipPageStyleObj.gd_yt_color; // 右侧的文字颜色

					/* 处理多规格 */
					// 是否是多规格
					let isSpec = goodsDetail.is_guige == 1;
					if (isSpec) {
						let specObj = assertObject(goodsDetail.spec);

						that.detailPageGoodsSpecSelectItemList = addSpecFilterItemActAttrFn(
							assertArray(specObj.filter_spec)
						); // 多规格项

						let detailPageGoodsSpecRowsList = assertObject(specObj.spec_goods_price);
						for (let i in detailPageGoodsSpecRowsList) {
							assertObject(detailPageGoodsSpecRowsList[i]).unit = goodsDetail.unit;
						}

						that.detailPageGoodsSpecRowsList = detailPageGoodsSpecRowsList; // 多规格 笛卡尔积项对应的 商品 信息

						console.log('查看规格项', that.goodsSpecSelectItemList);
					} else {
						that.detailPageGoodsSpecSelectItemList = []; // 多规格项
						that.detailPageGoodsSpecRowsList = {}; // 多规格 笛卡尔积项对应的 商品 信息
					}
					that.isSpec = isSpec;

					that.selectedNum = goodsDetail.selectedNum;

					/* 商品券 */
					let coupon = assertObject(resultData.coupon);
					that.goodsCoupon = assertArray(coupon.goods_coupon).map(item => {
						return {
							couponName: item.name.length > 8 ? `${item.name.substring(0, 7)}...` : item.name, // 处理商品券名字打点 超过8个字
							styleIsDefault: false
						};
					});
					console.log('商品券', that.goodsCoupon);

					that.yhCoupon = assertArray(coupon.yh_coupon)
						.map(item => {
							return {
								couponName: item.page_title,
								styleIsDefault: !item.coupon_status
							};
						})
						.sort(item => !item.coupon_status);

					console.log('优惠券列表', that.yhCoupon);

					/* 商品购买记录数据 */
					let payHistory = assertObject(resultData.pay_history);
					that.payHistoryList = assertArray(payHistory.history);
					// 月销量
					that.monthNum = payHistory.monthNum;

					// 赋值菜谱数据↓↓
					let recDelicious = assertObject(resultData.rec_delicious);
					let recDeliciousArr = assertArray(recDelicious.value);

					that.recDeliciousArr = recDeliciousArr; //数据列表
					that.recDeliciousName = recDelicious.name; //名字

					/* 赋值推荐商品数据 */
					let recGoods = assertObject(resultData.rec_goods);
					let recGoodsArr = assertArray(recGoods.value);

					// 处理推荐商品数据列表
					that.recGoodsArr = recGoodsArr.map(item => {
						return {
							goodsId: item.goods_id, // 商品id
							goodsImage: item.image, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名字
							isVipPrice: item.is_vip_price == 1, // 是否会员专享
							goodsPrice: item.shop_price, // 商品价格
							vipPrice: item.vip_market_price, // vip专享价
							linePrice: item.vip_market_price, // 划线价
							goodsTag: item.activity, // 商品标签
							selectedNum: item.selectedNum, // 加入到购物车里的数量
							isSpec: item.is_guige == 1, // 商品是否多规格
							tagImg: item.topLeftTag // 商品左上的图片标签
						};
					});
					that.recGoodsName = recGoods.name; //名字

					// 赋值商品评论数据↓↓
					let goodsComment = assertObject(resultData.goods_comment);

					that.goodsCommentArr = [assertObject(goodsComment.value)]; //数据列表
					that.goodsCommentName = goodsComment.name; //名字
					that.goodsCommentSum = goodsComment.sum; //总数
					that.goodsCommentScale = goodsComment.scale; //百分比
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
			that.isShowGif = false;

			// #ifdef H5
			that.jweixinModuleReadyFn();
			// #endif
		},
		// 添加到购物车成功 修改goodsInfo的数据
		changeGoodsInfoFn(e) {
			this.selectedNum = e;
		},

		// 查看更多购买记录
		async loadMoreShoppingRecordsFn() {
			let that = this;
			that.buyRowPage++;
			let result = await that.$request({
				loading: true,
				url: '/api/Goods/more_goods_payhistory',
				data: {
					page: that.buyRowPage,
					id: that.goodsId
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let payHistoryList = assertArray(result.data.data);

					if (payHistoryList.length < 1) {
						that.buyRowPage--;
						if (that.buyRowPage <= 1) {
							that.buyRowPage = 1;
						}
					}
					that.payHistoryList = that.payHistoryList.concat(payHistoryList);
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
		// #ifdef H5
		// 微信公众号sdk分享
		async jweixinModuleReadyFn() {
			let that = this;
			console.log('jweixinModuleReadyFn run', that.isWeixn());
			if (!that.isWeixn()) {
				return false;
			}
			let result = await that.getGzhSignPackageFn();
			console.log('that.getGzhSignPackageFn', result);
			if (result.type == success) {
				let jweixin = result.result;
				jweixinModule.ready(function() {
					console.log('jweixinModule.ready', updateAppMessageShareDataOptions);

					let updateAppMessageShareDataOptions = {
						success() {
							console.log('success', e);
						}
					};
					updateAppMessageShareDataOptions.imgUrl = that.swiperImgArr[0];
					updateAppMessageShareDataOptions.desc = that.detailGoodsRemark;
					updateAppMessageShareDataOptions.title = that.detailGoodsName;

					let shareUrlStr = `${location.origin}${location.pathname}${location.hash}`;
					if (that.isLogin) {
						shareUrlStr += `&shareFn=true&scene=${that.userInfoEncrypt}`;
					}
					updateAppMessageShareDataOptions.link = shareUrlStr;

					console.log('updateAppMessageShareDataOptions', updateAppMessageShareDataOptions);

					jweixinModule.updateAppMessageShareData(updateAppMessageShareDataOptions);
				});

				jweixinModule.error(function(e) {
					console.log('jweixinModule.error', e);
				});

				jweixinModule.config({
					// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: jweixin.appId, // 必填，公众号的唯一标识
					timestamp: jweixin.timestamp, // 必填，生成签名的时间戳
					nonceStr: jweixin.nonceStr, // 必填，生成签名的随机串
					signature: jweixin.signature, // 必填，签名
					jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表
					success(res) {
						console.log('jweixinModule.config res', res);
					}
				});
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
		},
		// #endif
		// 切换常购状态
		async setEveryDayBuyStatus() {
			let that = this;
			// 未登录就提示登录
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}

			// 未绑定手机号不能操作以下功能
			if (!that.isRunBindMobileFunc) {
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({ url: `/packageA/tel-login/user-info` });
					}
				});
				return false;
			}

			console.log('everyDayBuyBtnFlag', everyDayBuyBtnFlag);
			if (!everyDayBuyBtnFlag) {
				return false;
			}

			everyDayBuyBtnFlag = false;

			let url;
			if (that.isEveryDayBuyGoods) {
				url = '/api/User/delOftenbuy';
			} else {
				url = '/api/User/addOftenbuy';
			}
			let result = await that.$request({
				method: 'post',
				url,
				data: {
					goods_id: that.goodsId
				}
			});

			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.isEveryDayBuyGoods = !that.isEveryDayBuyGoods;
				}
				uni.showToast({
					icon: 'none',
					title: result.data.msg
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
			everyDayBuyBtnFlag = true;
		}
	}
};
</script>

<style lang="scss" scoped>
.create-share-image-wrap {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 200;
	width: 750rpx;
	height: 750rpx;
	.create-share-canvas {
		width: 750rpx;
		height: 750rpx;
	}
}
.goods-description-wrap {
	.goods-name-share-block {
		display: flex;
		align-items: flex-start;
		padding-top: 30rpx;
		.goods-name-block {
			width: 622rpx;
			font-size: 36rpx;
			font-weight: bold;
			color: #374050;
		}
		.share-btn-block {
			justify-content: flex-end;
			width: 80rpx;
			height: 80rpx;
			.share-code-img-wrap{
				overflow: hidden;
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
	.goods-price-sale {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10rpx 0;
	    .price-box {
			display: flex;
			align-items: center;
	        .goods-price-box {
				display: flex;
				align-items: baseline;
				margin-right: 20rpx;
	            .icon-price {
					font-size: 26rpx;
				}
	            .price-txt {
					font-size: 40rpx;
					font-weight: bold;
				}
	            .unit-text {
					font-size: 26rpx;
					color: #91939c;
				}
	        }
	        .vip-price-wrap {}
	    }
	    .sale-text {
			font-size: 26rpx;
			color: #91939c;
		}
	}
	
	.goods-description-text {
		padding: 10rpx 0;
		font-size: 26rpx;
		color: #91939c;
		line-height: 44rpx;
		
	}
	.dispatch-info-block {
		display: flex;
		align-items: center;
		padding: 10rpx 0;
		.title-text {
			padding-right: 16rpx;
			white-space: nowrap;
			font-size: 26rpx;
			color: #91939c;
		}
		.dispatch-detail {
			font-size: 26rpx;
			color: #374050;
		}
	}
}

</style>
