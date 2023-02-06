<!-- 
	预售商品详情页面
-->
<template>
	<view class="root-page">
		<loading-image :is-show-gif="isShowGif"></loading-image>
		<!-- <back-btn></back-btn> -->
		<goods-detail-swiper
			:goods-video-src="goodsVideoSrc"
			:swiper-img-arr="swiperImgArr"
			page-type="yvshou"
		></goods-detail-swiper>

		<!-- ↓↓ 商品 描述 -->
		<view class="goods-description-wrap">
			<!-- 名字 分享海报按钮 -->
			<view class="content-wrap goods-description-name-share-btn">
				<view class="goods-name">{{ detailGoodsName }}</view>
				<view class="share-btn-block">
					<share-code-img
						:goods-id="goodsId"
						:goods-name="detailGoodsName"
						:goods-imgs="swiperImgArr"
						:goods-price="preSaleTotalPrice"
						path="packageB/goods-detail/pre-sale-detail"
					></share-code-img>
				</view>
			</view>
			<!-- 商品描述文字展示 -->
			<view class="content-wrap goods-description-text">{{ detailGoodsRemark }}</view>

			<!-- 价格-销量-库存 -->

			<view class="content-wrap price-sales-stock">
				<view class="price-block">
					<view class="price">
						¥
						<text>{{ preSaleTotalPrice | filterTransNum }}</text>
					</view>
					<view class="unit">/{{ detailGoodsUnit }}</view>

					<view
						class="reduce-money border-radius"
						:style="{ background: configInfo.web_site_color }"
						v-if="preSaleReduceMoney > 0"
					>
						<view class="icon-text">付定金立减¥</view>
						<view class="reduce-price">{{ preSaleReduceMoney | filterTransNum }}</view>
					</view>
				</view>

				<view class="sales-volume">
					<text v-show="monthNum >= 1">月销售量{{ monthNum }}{{ detailGoodsUnit }}</text>
					<text v-show="monthNum >= 1 && detailGoodsStoreCount >= 1">,</text>
					<text v-show="detailGoodsStoreCount >= 1">
						库存{{ detailGoodsStoreCount }}{{ detailGoodsUnit }}
					</text>
				</view>
			</view>
		</view>

		<!-- 优惠券 会员卡展示 -->
		<view class="goods-info">
			<view class="goods-info-content">
				<coupon-bar v-if="yhCoupon.length" title-text="优惠券" :coupon-list="yhCoupon"></coupon-bar>

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
			</view>
		</view>

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

		<!-- 预售商品的详情里 底部 添加 购物车 的 导航栏 -->
		<pre-sale-bottom-add-cart-bar
			:pre-sale-ding-jin="preSaleDingJin"
			:pre-sale-end-time="preSaleEndTime"
			:pre-sale-dingjin-start="preSaleDingjinStart"
			:send-time-text="sendTimeText"
			@addFn="addFn"
			:goodsImage="swiperImgArr[0]"
        	:pagePath="`packageB/goods-detail/pre-sale-detail?goods_id=${goodsId}`"
			:goodsName="detailGoodsName"
			:cardNumber="cardNumber"
		></pre-sale-bottom-add-cart-bar>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn"></login-fn>

		<!-- 多规格弹框组件 -->
		<pre-sale-detail-goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="detailGoodsName"
			:goods-description="detailGoodsRemark"
			:goods-images="swiperImgArr[0]"
			:goods-id="goodsId"
			:sku-type="skuType"
			:bottom-goods-spec-rows-list="bottomGoodsSpecRowsList"
			:history-limit="preSaleLimitNum"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
			@commitClickFn="commitClickFn"
			page="yvshou"
		></pre-sale-detail-goods-spec>

		<!-- ↓↓↓ 轮播平台售卖记录组件 -->
		<play-buy-history :page-is-show="pageShowFlag" page="detail"></play-buy-history>
	</view>
</template>

<script>
// #ifdef H5
import jweixinModule from '@/tools/libs/jweixin-module.js';
// #endif

import { success, error,bindMobileTips } from '@/tools/const.js';


import loadingImage from '@/df-components/loading-image';
import shareCodeImg from '@/df-components/share-code-img/share-code-img'; // 分享商品海报

import backBtn from '@/packageB/goods-detail/goods-detail-components/back-btn.vue'; // 左上角 返回上一页的 按钮
import goodsDetailSwiper from '@/packageB/goods-detail/goods-detail-components/goods-detail-swiper.vue'; // 详情页的 头部轮播图组件 + 视频播放
import recommendEat from '@/packageB/goods-detail/goods-detail-components/recommend-eat.vue'; // 商品详情页面 推荐吃什么 菜单 滑动 组件
import recommendGoods from '@/packageB/goods-detail/goods-detail-components/recommend-goods.vue'; // 商品详情页面 推荐商品列表 滑动 组件
import comment from '@/packageB/goods-detail/goods-detail-components/comment.vue'; // 商品详情页面 展示 评论组件
import detailShoppingRecords from '@/packageB/goods-detail/goods-detail-components/detail-shopping-records.vue'; // 商品详情页面 商品详情富文本 和 购买记录组件
import sellerPromisePriceShow from '@/packageB/goods-detail/goods-detail-components/seller-promise-price-show.vue'; // 商品详情页面 商家承诺 和 价格说明组件
import openVipPage from '@/packageB/goods-detail/goods-detail-components/to-vip-page.vue'; // 商品详情里使用到的组件 跳转到开通vip页面
import preSaleBottomAddCartBar from '@/packageB/goods-detail/goods-detail-components/pre-sale-bottom-add-cart-bar.vue'; // 预售商品的详情里 底部 添加 购物车 的 导航栏
import preSaleDetailGoodsSpec from '@/packageB/goods-detail/goods-detail-components/pre-sale-detail-goods-spec.vue'; // 预售商品多规格弹框
import couponBar from '@/packageB/goods-detail/goods-detail-components/coupon-bar.vue'; // 详情页 优惠券组件外层的展示条
import playBuyHistory from '@/df-components/global-components/play-buy-history.vue'; // 轮播平台售卖记录组件
import {
	goodsDetailWidthFn,
	assertObject,
	assertArray,
	addSpecFilterItemActAttrFn,
	assertString,
	transNumFn,
	cloneFn,
	bigPlus,
	bigMinus
} from '@/tools/tools';

import { one, all, oneSpec, twoSpec } from '@/packageB/goods-detail/const.js';


export default {
	components: {
		loadingImage,
		shareCodeImg,
		backBtn,
		goodsDetailSwiper,
		recommendEat,
		recommendGoods,
		comment,
		detailShoppingRecords,
		sellerPromisePriceShow,
		openVipPage,
		preSaleBottomAddCartBar,
		preSaleDetailGoodsSpec,
		couponBar,
		playBuyHistory
	},

	data() {
		return {
			isShowGif: true, // 是否显示开屏动画
			goodsId: null, // 当前商品id
			goodsVideoSrc: '', // 商品的视频播放地址
			swiperImgArr: [], // 商品的轮播图片 数组
			detailGoodsName: '', // 商品名字
			detailGoodsRemark: '', // 商品描述
			
			
			
			shareTitle: '', // 分享标题
			shareImage: '', // 分享图片

			detailGoodsUnit: '', // 商品单位
			detailGoodsStoreCount: 0, // 商品总库存
			detailGoodsContent: '', // 商品详情
			promisesNodes: '', // 商家承诺
			priceMean: '', // 价格说明

			// ↓↓ 商品预售数据
			preSaleTotalPrice: 0, // 商品预售总价
			preSaleReduceMoney: 0, // 商品预售 立减钱数
			preSaleDingJin: 0, // 商品预售 定金
			sendTimeText: '', // 发货时间说明
			preSaleEndTime: '', // 预售结束时间
			preSaleWeikuanStart: '', // 开始付尾款时间
			preSaleDingjinStart: '', // 开始付定金时间
			skuType: '', // 预售商品的多规格 是否使用统一的 预售费用 使用统一all  使用规格里设置的one

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------

			isShowGoodsSpec: false, // 是否显示多规格弹框
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '', // 当前弹窗多规格的商品即加入到购物车里的数量

			// 当前页面展示商品的多规格相关--------------------------------------------------------
			isSpec: false, // 当前页面展示商品 是否是 多规格
			goodsSpecSelectItemList: [{}], // 当前详情页面 商品的 多规格项
			goodsSpecRowsList: {}, // 当前详情页面 商品的 笛卡尔积项对应的 商品 信息

			bottomGoodsSpecRowsList: {}, // 底部的商品规格数据

			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态


			preSaleLimitNum: 0, // 预售商品限购数量

			// 跳转到开通会员的按钮 相关配置
			toVipPageStyleIsOpen: false, // 是否显示 跳转到开通会员的按钮
			toVipPageStyleIconImg: '', // 左侧的图标
			toVipPageStyleBgColor: '', // 整体背景颜色
			toVipPageLeftText: '', // 左侧的文字
			toVipPageLeftTextColor: '', // 左侧的文字颜色
			toVipPageRightText: '', // 右侧文字
			toVipPageRightTextColor: '', // 右侧的文字颜色

			selectedNum: 0, // 当前商品加入到购物车的数量
			yhCoupon: [{}], // 优惠券

			buyRowPage: 1, // 购买记录分页索引
			payHistoryList: [], //购买记录
			monthNum: '', //月销售量

			// 推荐菜谱↓↓
			recDeliciousArr: [], //菜谱的列表数据
			recDeliciousName: '', //菜谱的标题文字

			// 推荐商品↓↓
			recGoodsArr: [], //推荐商品列表数据
			recGoodsName: '', //推荐商品标题文字

			// 商品评价↓↓
			commentPage: 1, // 评论分页
			goodsCommentSum: 0, //评价的总和
			goodsCommentName: '', //名字
			goodsCommentScale: '', //百分比
			goodsCommentArr: [], //数据列表
			pageShowFlag: false, // 当前页面是否show
			cardNumber:0,
		};
	},
	onLoad(option) {
		let that = this;
		console.log('进入商品详情-预售页面option', option);
		if (option.scene && !option.shareFn) {
			that.setSharerStrFn(option.scene);
			let searchArr = decodeURIComponent(option.scene).split(',');
			option.goods_id = searchArr[1];
			console.log(searchArr, '解码后的东西', '\n', option.scene, '打印 option.scene', '\n');
		}
		if (option.shareFn) {
			that.setSharerStrFn_btn(option);
		}

		that.goodsId = option.goods_id;
	},

	onHide() {
		this.pageShowFlag = false;
	},

	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});

		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();


		uni.setStorageSync('orderZhifuLoadCont', 0);
		uni.setStorageSync('orderZhifuReloadFlag', 0);
		that.getGoodsInfoFn();
		that.pageShowFlag = true;
	},
	onShareAppMessage() {
		let that = this;
		let pageTypeObj = {};

		return that.shareFn({
			path: 'packageB/goods-detail/pre-sale-detail',
			query: {
				scene: true, // 如果登录就带着自己的加密字符串
				goods_id: that.goodsId,
				isRob: false
			},
			options: {
				title: that.shareTitle ? that.shareTitle : that.detailGoodsName,
				imageUrl: that.shareImage ? that.shareImage : that.swiperImgArr[0]
			}
		});
	},
	methods: {
		// 刷新页面重新加载数据
		refreshFn() {
			this.getGoodsInfoFn();
			this.setTabBarCartNumFn();
		},
		//根据id获取商品详细信息
		async getGoodsInfoFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Goods/goods_detail',
				data: {
					goods_id: that.goodsId,
					type: 'pre_sale'
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					const resultData = assertObject(result.data.data);
					console.log('请求商品详情返回的数据', resultData);
					
				

					let goodsDetail = assertObject(resultData.detail); // 商品详情数据
					
					// 单个商品分享图文配置
					that.shareTitle = goodsDetail.share_title;
					that.shareImage = goodsDetail.share_img;
					
					
					let goodsPreSaleInfo = assertObject(goodsDetail.pre_sale); // 商品的预售数据

					that.goodsVideoSrc = goodsDetail.video; // 商品的视频播放地址

					// 赋值轮播图的数据
					that.swiperImgArr = assertArray(goodsDetail.images);

					// 赋值商品信息↓↓↓
					// 商品名字
					that.detailGoodsName = goodsDetail.goods_name;

					// 商品描述
					that.detailGoodsRemark = goodsDetail.goods_remark;

					// ↓↓ 商品预售
					// 商品预售总价
					that.preSaleTotalPrice = transNumFn(goodsPreSaleInfo.total_presale_price);
					// 商品预售 立减钱数
					that.preSaleReduceMoney = transNumFn(goodsPreSaleInfo.reduce_money);

					// 商品预售 定金
					that.preSaleDingJin = transNumFn(goodsPreSaleInfo.deposit);

					// 发货时间说明
					that.sendTimeText = assertString(goodsPreSaleInfo.end_time);

					// 预售结束时间
					that.preSaleEndTime = assertString(goodsPreSaleInfo.fdj_end_time).replace(/\-/g, '/');
					// 开始付定金时间时间
					that.preSaleDingjinStart = assertString(goodsPreSaleInfo.fdj_start_time).replace(/\-/g, '/');
					// 开始付尾款时间
					that.preSaleWeikuanStart = assertString(goodsPreSaleInfo.payoff_time).replace(/\-/g, '/');

					// 预售商品的多规格 是否使用统一的 预售费用 使用统一all  使用规格里设置的one
					that.skuType = assertString(goodsDetail.set_sku_type);

					// 商品单位
					that.detailGoodsUnit = goodsDetail.unit;

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
					// 是多规格
					if (isSpec) {
						// 使用规格设置的预售 价格
						let specObj = assertObject(goodsDetail.spec);
						// 多规格选择项
						that.goodsSpecSelectItemList = addSpecFilterItemActAttrFn(assertArray(specObj.filter_spec)); // 多规格项
						if (goodsDetail.set_sku_type == one) {
							let goodsSpecRowsList = assertObject(goodsPreSaleInfo.pre_sale_spec);
							for (let i in goodsSpecRowsList) {
								let item = assertObject(goodsSpecRowsList[i]);
								item.unit = goodsDetail.unit;
							}
							that.goodsSpecRowsList = goodsSpecRowsList; // 多规格 笛卡尔积项对应的 商品 信息

							// 统一预售价格
						} else if (goodsDetail.set_sku_type == all) {
							let goodsSpecRowsList = cloneFn(assertArray(goodsPreSaleInfo.pre_sale_spec));
							assertObject(goodsSpecRowsList[0]).unit = goodsDetail.unit;
							that.goodsSpecRowsList = goodsSpecRowsList;
						}
						// 底部的商品规格数据
						that.bottomGoodsSpecRowsList = assertObject(assertObject(goodsDetail.spec).spec_goods_price);
					} else {
						// 单规格 codeing...
					}
					that.isSpec = isSpec;

					// 预售商品限购数量
					that.preSaleLimitNum = transNumFn(goodsPreSaleInfo.limit_num);
					that.selectedNum = goodsDetail.selectedNum; // 当前商品在购物车里的数量

					// 优惠券
					let coupon = assertObject(resultData.coupon);

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

					// ↓↓ 赋值推荐吃什么菜谱数据
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
					let goodsCommentArr = [assertObject(goodsComment.value)];

					that.goodsCommentArr = goodsCommentArr; //数据列表
					that.goodsCommentName = goodsComment.name; //名字
					that.goodsCommentSum = goodsComment.sum; //总数
					that.goodsCommentScale = goodsComment.scale; //百分比

					that.goodsCommentArr = goodsCommentArr; //数据列表
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

		// 加载更多购买记录
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
		// 付定金按钮
		addFn() {
			let that = this;
			if (!that.isLogin) {
				// 未登录就提示登录
				that.closeGlobalLoginFn(true);
				return false;
			}
			
			
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			
			if (that.isSpec) {
				that.isShowGoodsSpec = true;
				// 多规格
				/*
				if (that.skuType == one) {
					// 使用单独设置的预售价格
				} else if (that.skuType == all) {
					// 使用统一设置的预售价格
				}
				*/
			} else {
				// 单规格
				/*
					商品id
					图片路径
					商品名字
					描述信息
					规格信息
					规格id
					购买数量
					定金
					开始付尾款时间
					库存
					尾款
				*/
				let goodsInfo = {
					spec: oneSpec, // 单规格-多规格 two
					goodsId: that.goodsId,
					goodsImage: that.swiperImgArr[0],
					goodsName: that.detailGoodsName,
					goodsDescription: that.detailGoodsRemark,
					buyNum: 1,
					preSaleWeikuanStart: that.preSaleWeikuanStart,
					goodsCount: that.detailGoodsStoreCount,
					oneGoodsPrice: that.preSaleTotalPrice
				};
				uni.setStorageSync('goodsInfo', goodsInfo);
				that.navigateToFn({ url: '/packageB/order/pre-sale-order' });
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

		// 多规格弹框 确认提交
		commitClickFn(e) {
			let that = this;
			console.log(e);
			let goodsInfo = {
				spec: twoSpec, // 单规格-多规格 two
				goodsId: that.goodsId,
				specId: e.currentgoodsSkuId,
				goodsImage: e.currentGoodsImages,
				goodsName: that.detailGoodsName,
				goodsDescription: that.detailGoodsRemark,
				buyNum: e.buyNum,
				preSaleWeikuanStart: that.preSaleWeikuanStart,
				goodsCount: e.currentgoodsCount,
				oneGoodsPrice: e.preSaleTotalPrice,
				specKeyStr: e.specKeyStr
			};
			uni.setStorageSync('goodsInfo', goodsInfo);
			that.setGoodsSpec(false);
			that.navigateToFn({ url: '/packageB/order/pre-sale-order' });
		},
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
		}
		// #endif
	},
	computed: {
		/*
			@description
				根据预售总价 和 定金 和 立即金额 返回 尾款
			@return <Number>
				返回 尾款
		*/
		calcWeikuan() {
			let that = this;
			return transNumFn(bigMinus(that.preSaleTotalPrice, bigPlus(that.preSaleReduceMoney, that.preSaleDingJin)));
		}
	}
};
</script>

<style lang="scss" scoped>
.goods-description-wrap {
	background: #ffffff;
	.goods-description-name-share-btn {
		display: flex;
		padding-top: 30rpx;
		.goods-name {
			flex: 1;
			margin-bottom: 10px;
			line-height: 1.3em;
			color: $grey1-color;
			font-size: 36rpx;
			font-weight: 600;
		}
		.share-btn-block {
			width: 80rpx;
			padding-top: 10rpx;
		}
	}
	.goods-description-text {
		margin-bottom: 20rpx;
		line-height: 44rpx;
		font-size: 25rpx;
		color: $grey2-color;
	}

	.price-sales-stock {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 66rpx;
		font-size: 25rpx;
		color: $grey2-color;

		.price-block {
			display: flex;
			align-items: center;
			.price {
				color: $red-color;
				text {
					font-weight: 600;
					font-size: 40rpx;
				}
			}
			.reduce-money {
				display: flex;
				align-items: center;
				position: relative;
				margin-left: 1em;
				padding: 0 0.8em;
				height: 44rpx;
				color: #ffffff;

				.icon-text {
					display: inline-block;
					font-size: 24rpx;
				}
				.reduce-price {
					display: inline-block;
					font-size: 32rpx;
					font-weight: 600;
				}
			}
		}
		.sales-volume {
		}
	}
}
.goods-info {
	width: 750rpx;
	overflow: hidden;
	background: $bg-grey-color;
	.goods-info-content {
		margin: 0 0 10rpx;
		background: #ffffff;
	}
}
</style>
