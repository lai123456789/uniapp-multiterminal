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
	<!-- 页面开始↓↓ -->
	<!-- <view :class="['page', youhuiquanModalBox ? 'stopScrollStyle' : '']"> -->
	<view :class="['page']">
		<!-- 首页的骨架屏组件 -->
		<first-screen-gjp :first-screen-gjp-flag="firstScreenGjpFlag"></first-screen-gjp>

		<template v-if="!firstScreenGjpFlag">
			<!-- #ifdef APP-PLUS || MP-WEIXIN || MP-TOUTIAO -->
			<!-- ↓↓↓ 页面顶部 titleBar 标题组件 -->
			<title-bar :bg-color="calcTopHeadBgColor">{{ configInfo.shoname }}</title-bar>
			<!-- #endif -->

			<!-- ↓↓↓ 头部展示 当前地址组件 -->
			<home-top-show-address
				:address-text="currentAddressText"
				:home-swiper-bg-color="calcTopHeadBgColor"
			></home-top-show-address>

			<!-- ↓↓↓ 搜索框组件-->
			<!-- #ifdef MP-WEIXIN || APP-PLUS || MP-TOUTIAO -->
			<view class="home-search-wrap" :style="{ top: `${statusBarHeight + 44}px` }">
				<home-search :home-swiper-bg-color="calcTopHeadBgColor"></home-search>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="home-search-wrap" :style="{ top: `${statusBarHeight}px` }">
				<home-search :home-swiper-bg-color="calcTopHeadBgColor"></home-search>
			</view>
			<!-- #endif -->

			<!-- ↓↓↓ 首页顶部轮播图 -->
			<home-swiper
				:home-swiper-list="homeSwiperList"
				:home-swiper-item-active="homeSwiperItemActive"
				:home-swiper-bg-color="calcTopHeadBgColor"
				:autoplay="homeSwiperAutoplay"
				@swiperChangeFn="swiperChangeFn"
			></home-swiper>
			<!-- 轮播图下面的dom元素获取高度使用 -->
			<view class="home-swiper-bottom-dom"></view>

			<!-- <view><button type="default" size="mini" @click="fnn1">开发测试的登录按钮3</button></view> -->

			<!-- ↓↓↓ 首页页面里展示优惠券组件 (最后处理) -->
			<home-top-coupon
				v-if="homeCouponOptions.show_type == 1 && homeCouponList.length"
				:coupon-title-text="homeCouponOptions.title"
				:coupon-list="homeCouponList"
				@getCouponSuccess="getCouponSuccess"
			></home-top-coupon>

			<!-- ↓↓↓ 平台图标 组件 -->
			<home-platform-icon
				:platform-icon-list="homeTagTextList"
				:platform-icon-options="homeTagTextOptions"
			></home-platform-icon>

			<!-- ↓↓↓ 系统消息轮播 组件 -->
			<home-news
				:home-msg-text-options="homeMsgTextOptions"
				:home-msg-text-list="homeMsgTextList"
				:autoplay="homeNewsAutoplay"
				page="index-home"
			></home-news>

			<!-- ↓↓↓ 首页的 分类 组件 -->
			<home-type-btns
				:home-menu-btn-list="homeMenuBtnList"
				:is-show-home-menu-tip="isShowHomeMenuTip"
				@hideHomeMenuTipFn="hideHomeMenuTipFn"
			></home-type-btns>

			<!-- ↓↓↓ 热销排行 爆款 横向滚动商品 -->
			<home-hot-scroll-goods :home-page-scroll-goods="homePageScrollGoods"></home-hot-scroll-goods>

			<!-- ↓↓↓ 秒杀 菜场 模块展示 -->
			<home-miaosha-caichang
				:home-is-show="homeIsShow"
				:miaosha-goods-list="miaoshaGoodsList"
				:cai-chang-goods-list="caiChangGoodsList"
			></home-miaosha-caichang>

			<!-- ↓↓↓ 魔方图片的所有组件 -->
			<view class="all-components" v-if="bannerImageList.length">
				<all-components
					v-for="(item, index) in bannerImageList"
					:style-id="item.styleId"
					:list="item.list"
					:key="index"
					:data-key-id="item.styleId"
				></all-components>
			</view>
			<!-- ↓↓↓ 底部商品分类导航条组件 -->

			<block v-if="homeBottomGoodsClassList.length">
				<view class="nav-bar-list-wrap" :style="{ top }">
					<bottom-goods-class-nav-bar
						:home-bottom-goods-class-list="homeBottomGoodsClassList"
						:nav-bar-list-active="navBarListActive"
						@changeNavBarFn="changeNavBarFn"
					></bottom-goods-class-nav-bar>
				</view>
			</block>

			<!-- 商品列表上面的dom元素获取高度使用 -->
			<view
				class="bottom-shop-list-getdom"
				style="width: 100%; height: 0; opacity: 0; background: rgba(0,0,0,0);"
			></view>
			<!-- ↓↓↓ 底部商品列表组件 -->
			<bottom-goods-list
				:goods-list="homePageBottomGoodsList"
				:goods-loading="goodsLoading"
				:load-more-status="loadMoreStatus"
			></bottom-goods-list>

			<!-- ↓↓↓ 回到顶部按钮组件 -->
			<to-top-btn :flag="isShowToTopBtn"></to-top-btn>

			<!-- ↓↓↓ 登录框 -->
			<login-fn
				:is-show-login="loginBoxFlag"
				@loginSuccessCallback="refreshFn"
				@close="closeGlobalLoginFn"
			></login-fn>
		</template>

		<!-- ↓↓↓ 多规格弹框 -->
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

		<!-- ↓↓↓ 自定义页面底部tabBar 组件 -->
		<view class="hans-tabbar">
			<view class="hans-tabbar-height" :class="[isiPhoneX ? 'isiPhoneXClass' : '']"></view>
			<view class="hans-tabbar-fixde" :class="[isiPhoneX ? 'isiPhoneXClass' : '']">
				<hans-tabbar :cardNumber="cardNumber" :list="MenuList" :tab-current="tabCurrent"></hans-tabbar>
			</view>
		</view>

		<!-- ↓↓↓ 主体结构加载完毕 以下是弹框相关 -->

		<!-- #ifdef APP-PLUS -->
		<!-- app 平台下版本升级的 首页弹框 -->
		<app-update-version-modal v-if="modalGroupAppVersionFlag"></app-update-version-modal>
		<!-- app平台的用户协议框 -->
		<app-agreement :isShow="isShowAppAgreement" @confirmBtnClickFn="confirmBtnClickFn"></app-agreement>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<!-- 优惠券到账提醒 模板消息 授权弹框按钮 -->
		<home-toast-modal-msg
			v-if="modalGroupWeixinTemplateMsgFlag"
			@close="closeWeixinTemplateMsgFn"
		></home-toast-modal-msg>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<!-- ↓↓↓ 提示 添加到我的小程序组件 -->
		<home-tips></home-tips>
		<!-- #endif -->

		<!-- ↓↓↓ 首页的 首页优惠券弹框 组件 -->
		<home-coupon-modal
			v-if="modalGroupCouponFlag"
			:set-options="homeCouponOptions"
			:list="homeCouponList"
			@lingqv="lingqvFn"
			@close="closeHomeCouponModalFn"
		></home-coupon-modal>

		<!-- ↓↓↓ 首页的 广告图弹框 组件 -->
		<home-ad-modal
			v-if="modalGroupHomeAdFlag"
			:ad-options="homeAdOption"
			@close="closeHomeAdModalFn"
		></home-ad-modal>

		<!-- ↓↓↓ 弹框提示一下用户 不在配送范围内 -->
		<address-out-of-range-modal
			v-if="modalGroupNotRangeFlag"
			@clone="setAddressOutOfRangeModalFlagFn(false)"
		></address-out-of-range-modal>

		<!-- ↓↓↓ 轮播平台售卖记录组件 -->
		<play-buy-history :page-is-show="homeIsShow" page="index"></play-buy-history>

		<!-- ↓↓↓ page结束 -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
// #ifdef H5
import jweixinModule from '@/tools/libs/jweixin-module.js';
// #endif

import { success, error, bindMobileTips } from '@/tools/const.js';

import {
	checkTypeFn,
	timeStr2Arr,
	assertObject,
	assertArray,
	transNumFn,
	cloneFn,
	addSpecFilterItemActAttrFn
} from '@/tools/tools.js';

import firstScreenGjp from '@/pages/index/index-components/first-screen-gjp.vue'; // 首页的骨架屏组件

import addressOutOfRangeModal from '@/pages/index/index-components/address-out-of-range-modal.vue'; // 弹框提示一下用户 不在配送范围内
import homeNews from '@/pages/index/index-components/home-news.vue'; // 首页的 系统消息 轮播 组件
import homeTypeBtns from '@/pages/index/index-components/home-type-btns.vue'; // 首页的 分类 组件
import homeTopShowAddress from '@/pages/index/index-components/home-top-show-address.vue'; // 头部展示 当前地址组件
import homeSearch from '@/pages/index/index-components/home-search.vue'; // 搜索框组件
import homeSwiper from '@/pages/index/index-components/home-swiper.vue'; // 首页顶部轮播图
import homeTopCoupon from '@/pages/index/index-components/home-top-coupon.vue'; // 首页页面里展示优惠券组件
import homePlatformIcon from '@/pages/index/index-components/home-platform-icon.vue'; // 首页显示的平台图标 组件
import homeHotScrollGoods from '@/pages/index/index-components/home-hot-scroll-goods.vue'; // 首页的 热销排行 商品滑动 组件
import homeMiaoshaCaichang from '@/pages/index/index-components/home-miaosha-caichang.vue'; // 首页的 秒杀菜场模块 组件
import bottomGoodsClassNavBar from '@/pages/index/index-components/bottom-goods-class-nav-bar.vue'; // 首页的 底部商品分类导航条组件 组件
import bottomGoodsList from '@/pages/index/index-components/bottom-goods-list.vue'; // 首页的 底部商品列表组件 组件
import homeCouponModal from '@/pages/index/index-components/home-coupon-modal-components/home-coupon-modal.vue'; // 首页的 首页优惠券弹框 组件
import homeAdModal from '@/pages/index/index-components/home-ad-modal.vue'; // 首页的 广告图弹框 组件

import playBuyHistory from '@/df-components/global-components/play-buy-history.vue'; // 轮播平台售卖记录组件

// #ifdef MP-WEIXIN
import homeToastModalMsg from '@/pages/index/index-components/home-toast-modal-msg.vue'; // 小程序里用户没有允许 发放优惠券的模板消息 弹框
import homeTips from '@/pages/index/index-components/home-tips'; // 首页提示 添加到我的小程序 组件
// #endif

// #ifdef APP-PLUS
let AppVersion = plus.runtime.version;
import { getVersionFn } from '@/tools/tools';
import appUpdateVersionModal from '@/pages/index/index-components/app-update-version-modal.vue'; // app 平台下版本升级的 首页弹框
import appAgreement from '@/pages/index/index-components/app-agreement.vue'; // app平台的用户协议
// #endif

let statusBarHeight = uni.getSystemInfoSync().statusBarHeight, // 状态栏 高度
	homeSwiperAutoplayTimer, // 首页轮播图自动轮播
	homeNewsTimer, // 首页系统通知轮播
	setTabBarCartNumTimer, // 购物车数量
	qqmapsdk, // 腾讯地图sdk里的对象
	loopShowModalTimer; // 循环展示弹框

export default {
	components: {
		homeTopShowAddress,
		homeSearch,
		homeSwiper,
		homeTopCoupon,
		homePlatformIcon,
		homeNews,
		homeTypeBtns,
		homeHotScrollGoods,
		homeMiaoshaCaichang,
		bottomGoodsClassNavBar,
		bottomGoodsList,
		homeCouponModal,
		homeAdModal,

		firstScreenGjp,
		playBuyHistory,

		// #ifdef MP-WEIXIN
		homeTips,
		homeToastModalMsg,
		// #endif
		// #ifdef APP-PLUS
		appUpdateVersionModal,
		appAgreement,
		// #endif
		addressOutOfRangeModal
	},
	data() {
		return {
			statusBarHeight,
			homeSwiperList: [], // 首页轮播图数据
			homeSwiperItemActive: 0, // 首页轮播图 当前索引

			homeSwiperAutoplay: false, // 首页轮播图是否自动轮播
			homeNewsAutoplay: false, // 首页系统消息轮播是否自动轮播

			firstScreenGjpFlag: true, // 首页的骨架屏 默认显示

			homeCouponList: [], // 优惠券列表数据
			homeCouponOptions: {}, // 优惠券 相关配置

			homeTagTextList: [], // 中台提交系统标签列表数据
			homeTagTextOptions: {}, // 中台提交系统标签 相关样式配置

			homeMsgTextList: [], // 系统通知 广播轮播信息 列表
			homeMsgTextOptions: {}, // 系统通知 广播轮播信息 样式配置
			homeMenuBtnList: [], // 首页跳转到分类页面的菜单栏 按钮数据
			isShowHomeMenuTip: true, // 是否显示 首页跳转到分类页面的菜单栏 的提示

			homePageScrollGoods: [], // 首页 横向滚动商品列表数据

			miaoshaGoodsList: [], // 秒杀模块的 商品列表数据
			caiChangGoodsList: [], // 菜场模块 的商品列表

			bannerImageList: [], // 魔方图片数据

			homeBottomGoodsClassList: [], // 底部商品 分类列表
			navBarListActive: 0, // 横向菜单 索引

			// 首页的商品数据
			homePageBottomGoodsList: [], // 首页底部的商品数据
			pageIndex: 1, // 底部 商品分页数
			goodsLoading: false, // 底部商品图加载 状态 true正在加载, false不在加载
			loadMoreStatus: 'loading', // 底部商品列表 下拉状态

			homeIsShow: false, // 首页是否shou

			currentAddressText: '', // 展示在首页的地址文字描述文字
			addressIsAtRangeFlag: false, // 当前地址是否在配送范围内

			// 弹框相关
			isGetedAddressFlag: false, // 原生获取地址信息的弹框是否弹出了

			// #ifdef APP-PLUS
			modalGroupAppVersionFlag: false, // app版本更新弹框
			isShowAppAgreement: false, // app平台的用户协议框是否展示
			// #endif

			// #ifdef MP-WEIXIN
			modalGroupWeixinTemplateMsgFlag: false, // 微信模板消息弹框
			weixinTemplateMsgFlagCloseEd: false, // 微信模板消息弹框 是否被用户关闭过了 ( 关闭过就不弹了  )
			// #endif
			modalGroupCouponFlag: false, // 领取优惠券弹框
			couponFlagCloseEd: false, // 领取优惠券弹框 是否被用户关闭过了 ( 关闭过就不弹了  )

			modalGroupHomeAdFlag: false, // 广告图弹框
			homeAdFlagCloseEd: false, // 广告图弹框 是否被用户关闭过了 ( 关闭过就不弹了  )
			modalGroupNotRangeFlag: false, // 距离提示弹框
			notRangeFlagCloseEd: false, // 距离提示弹框 是否被用户关闭过了 ( 关闭过就不弹了  )

			// ↑↑↑ ↓↓↓ ================================================================================================================================================================

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '', // 当前弹窗多规格的商品即加入到购物车里的数量
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag: false, // 登录框显示隐藏状态
			cardNumber: 0, // 购物车数量

			// 打开app次数
			openAppCount: 0
		};
	},
	onReady() {
		let that = this;
		console.log('onReady Run');
		// #ifdef H5
		setTimeout(() => {
			// console.log(`uni.setNavigationBarTitle({ title: that.configInfo.shoname })`);
			uni.setNavigationBarTitle({ title: that.configInfo.shoname });
		}, 300);
		// #endif
	},
	onShow() {
		let that = this;
		console.log('showFnRun');

		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});

		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});

		// #ifdef H5
		setTimeout(() => {
			// console.log(`uni.setNavigationBarTitle({ title: that.configInfo.shoname })`);
			uni.setNavigationBarTitle({ title: that.configInfo.shoname });
		}, 0);
		that.jweixinModuleReadyFn();
		// #endif
		that.homeIsShow = true;
		clearTimeout(homeSwiperAutoplayTimer);
		clearTimeout(homeNewsTimer);
		homeSwiperAutoplayTimer = setTimeout(() => {
			if (!that.homeSwiperAutoplay && !that.calcPageIsScrollToSwiperBottom) {
				that.homeSwiperAutoplay = true;
			}
		}, 300);
		homeNewsTimer = setTimeout(() => {
			if (!that.homeNewsAutoplay) {
				that.homeNewsAutoplay = true;
			}
		}, 300);

		that.getSetHomeAddressInfoFn();

		clearTimeout(setTabBarCartNumTimer);

		clearTimeout(loopShowModalTimer);
		that.loopShowModalFn();

		setTabBarCartNumTimer = setTimeout(() => {
			that.setTabBarCartNumFn();
		}, 400);
		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			console.log('引用组件的页面', page);
			let currentGoods;

			if (page == 'home-bottom-goods-list') {
				currentGoods = assertObject(
					assertArray(that.homePageBottomGoodsList.filter(item => item.goodsId == goodsId))[0]
				);
			} else if (page == 'home-scroll') {
				assertArray(that.homePageScrollGoods).forEach(item => {
					assertArray(item.goodsList).forEach(it => {
						if (it.goodsId == goodsId) {
							currentGoods = it;
						}
					});
				});
			}
			/*

			if (goodsId == that.currentGoodsId) {
				that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量
				that.isShowGoodsSpec = true;
				return false;
			}
			 */
			that.currentGoodsId = goodsId;
			uni.showLoading();

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
	onUnload() {
		uni.$off('goodsAddCartEd_index');
		this.$set(this, 'homePageBottomGoodsList', []);
	},
	onLoad(options) {
		let that = this;
		console.log('首页load的options参数', options);

		// #ifdef APP-PLUS
		// app平台下 判断 是否是第一次进入app ? 弹框同意协议 : 正常进入
		let openAppCountStorage = transNumFn(uni.getStorageSync('openAppCountStorage'));
		if (openAppCountStorage) {
			uni.setStorageSync('openAppCountStorage', openAppCountStorage + 1);
			that.openAppCount = openAppCountStorage + 1;
		} else {
			uni.setStorageSync('openAppCountStorage', 1);
			that.openAppCount = 1;
		}
		if (that.openAppCount <= 1) {
			that.isShowAppAgreement = true;
			that.firstScreenGjpFlag = false;
		} else {
			that.isShowAppAgreement = false;
		}
		console.log('that.openAppCount', that.openAppCount);
		// #endif
		that.hideAllFn();
		// #ifdef MP-WEIXIN
		uni.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		});
		// #endif

		if (options.shareFn) {
			that.setSharerStrFn_btn(options);
		}

		// #ifdef MP-WEIXIN || H5 || MP-TOUTIAO
		that.pageLoadFn(async () => {
			// 页面加载完获取平台的购买记录数据
			let buyHistoryResult = await that.getBuyHistoryFn();
			if (buyHistoryResult.type == success && buyHistoryResult.result.length) {
				that.$store.commit('setBuyHistoryList', buyHistoryResult.result);
				uni.$emit('homeLoadEndFn');
			}
		});
		// #endif

		// #ifdef APP-PLUS
		if (that.openAppCount > 1) {
			that.pageLoadFn(async () => {
				// 页面加载完获取平台的购买记录数据
				let buyHistoryResult = await that.getBuyHistoryFn();
				if (buyHistoryResult.type == success && buyHistoryResult.result.length) {
					that.$store.commit('setBuyHistoryList', buyHistoryResult.result);
					uni.$emit('homeLoadEndFn');
				}
			});
		}
		// #endif

		/* 
		console.log('平台是否开启供应商功能 that.gongyingshang',that.gongyingshang);
		console.log('平台设置的加入购物车按钮样式',that.goodsAddCartStyle);
		*/
		// 加入购物车成功后
		uni.$off('goodsAddCartEd_index');
		uni.$on('goodsAddCartEd_index', arg => {
			let { selectedNum, goodsId } = arg;
			console.log('that.homePageScrollGoods', that.homePageScrollGoods);

			that.homePageScrollGoods.forEach(i => {
				i.goodsList.forEach(j => {
					if (j.goodsId == goodsId) {
						j.selectedNum = selectedNum;
					}
				});
			});

			that.homePageBottomGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});
		});
	},
	// #ifdef MP-WEIXIN
	// 小程序分享首页到朋友圈带标题
	onShareTimeline() {
		return {
			title: this.configInfo.applet_share_title
		};
	},
	// #endif

	onHide() {
		let that = this;
		that.homeIsShow = false;
		clearTimeout(homeSwiperAutoplayTimer);
		if (that.homeSwiperAutoplay) {
			that.homeSwiperAutoplay = false;
		}
		clearTimeout(homeNewsTimer);
		if (that.homeNewsAutoplay) {
			that.homeNewsAutoplay = false;
		}
		that.hideHomeMenuTipFn();

		clearTimeout(loopShowModalTimer);

		uni.$off('popSpecBlock');
	},
	// 下拉刷新
	onPullDownRefresh() {
		let that = this;
		// #ifdef APP-PLUS
		if (that.openAppCount <= 1) {
			uni.stopPullDownRefresh(); //停止下拉刷新动画
			return false;
		}
		// #endif
		that.couponFlagCloseEd = false; // 领取优惠券弹框 是否被用户关闭过了 ( 关闭过就不弹了  )
		that.notRangeFlagCloseEd = false; // 距离提示弹框 是否被用户关闭过了 ( 关闭过就不弹了  )
		that.homeAdFlagCloseEd = false; // 广告图弹框 是否被用户关闭过了 ( 关闭过就不弹了  )

		clearTimeout(loopShowModalTimer);
		that.pageLoadFn(() => {
			uni.stopPullDownRefresh(); //停止下拉刷新动画
			that.indexPageGetAddressInfoFn();
		});
	},
	// 分享首页用 微信聊天对话框分享出去
	onShareAppMessage() {
		let that = this;
		let options = {};
		if (that.configInfo.share_home) {
			options.imageUrl = that.addimgPathHostFn(that.configInfo.share_home);
		}
		if (that.configInfo.applet_share_title) {
			options.title = that.configInfo.applet_share_title;
		}
		return that.shareFn({
			options,
			path: '/pages/index/index',
			query: {
				scene: true
			}
		});
	},
	methods: {
		// #ifdef APP-PLUS
		// app的协议框同意事件
		confirmBtnClickFn() {
			let that = this;
			uni.setStorageSync('openAppCountStorage', 2);
			that.openAppCount = 2;
			that.isShowAppAgreement = false;
			that.firstScreenGjpFlag = true;
			
			that.pageLoadFn(async () => {
				// 页面加载完获取平台的购买记录数据
				let buyHistoryResult = await that.getBuyHistoryFn();
				if (buyHistoryResult.type == success && buyHistoryResult.result.length) {
					that.$store.commit('setBuyHistoryList', buyHistoryResult.result);
					uni.$emit('homeLoadEndFn');
				}
			});
		},
		// #endif
		async fnn1() {
			let that = this;
			
			
			uni.setStorageSync('token', '011665e9-ff5b-4b42-9790-788b7c85f296');
			return false;
			
			
			let locationInfo = await that.getLocationInfoFn();
			
			console.log(locationInfo);
			return false;
			
			uni.setStorageSync('openAppCountStorage', 0);
			that.openAppCount = 1;

			return false;

			

			console.log(that.calcZhifubaoPayAndroidApp);
			return false;

			that.navigateToFn({
				url: `/pages/order/submit-order`
			});
			return false;

			let s = await that.getLocationInfoFn();
			console.log('that.getLocationInfoFn 方法获取的地址信息', s);

			return false;

			// console.log('that.appenv',that.appenv,);
			// console.log('that.appleCheckOpen',that.appleCheckOpen);
		},
		// ↓↓↓ 页面网络请求层方法
		// 获取首屏数据 包括  首页页面头部数据 首页页面 热销排行 滑动商品数据
		getIndexPageFirstScreenDataFn() {
			let that = this;
			return new Promise(async resFn => {
				Promise.all([that.getIndexPageHeaderDataFn(), that.getIndexPageHotScrollGoodsFn()]).then(
					([indexPageHeaderData, indexPageHotScrollGoods]) => {
						resFn({
							result: {
								indexPageHeaderData,
								indexPageHotScrollGoods
							}
						});
					}
				);
			});
		},
		/*
			获取首页页面头部数据
				轮播图-优惠券-系统设置的标签-广播通知轮播-首页跳转到其他页面的菜单按钮
		*/
		getIndexPageHeaderDataFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: `/api/Index/index`
				});
				let resObj = {};
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let homeHeadData = assertObject(result.data.data); // 首页 头部 部分的所有信息

						let homeSwiperList = assertArray(homeHeadData.News); // 首页 轮播图列表

						let homeCouponData = assertObject(homeHeadData.Coupon); // 优惠券相关数据
						let homeCouponList = assertArray(homeCouponData.list); // 优惠券列表数据

						let homeCouponOptionsSet = assertObject(homeCouponData.set); // 优惠券 配置信息 (设置颜色...)

						let homeCouponOptions = {
							// 优惠券 相关配置
							title: homeCouponData.title, // 优惠券 标题文字
							show_type: homeCouponData.show_type, // 优惠券的显示方式 1：页面显示  2：弹框显示
							coupon_popout_color: homeCouponOptionsSet.coupon_popout_color, // 弹框背景颜色
							coupon_popout_but_color: homeCouponOptionsSet.coupon_popout_but_color, // 弹框按钮背景颜色
							coupon_popout_but_text_color: homeCouponOptionsSet.coupon_popout_but_text_color, // 弹框按钮字体颜色
							coupon_popout_text_color: homeCouponOptionsSet.coupon_popout_text_color, // 弹框字体颜色
							coupon_popout_money_text_color: homeCouponOptionsSet.coupon_popout_money_text_color, // 弹框金额字体颜色
							coupon_popout_money_color: homeCouponOptionsSet.coupon_popout_money_color, // 弹框金额背景颜色
							coupon_popout_title_color: homeCouponOptionsSet.coupon_popout_title_color, // 弹框标题背景颜色
							coupon_popout_title_text_color: homeCouponOptionsSet.coupon_popout_title_text_color // 弹框标题字体颜色
						};

						let homeTagTextData = assertObject(homeHeadData.Tag); // 中台提交系统标签数据
						let homeTagTextList = assertArray(homeTagTextData.list); // 中台提交系统标签列表数据
						let homeTagTextOptions = assertObject(homeTagTextData.set); // 中台提交系统标签 相关样式配置

						let homeMsgTextData = assertObject(homeHeadData.Notice); // 系统通知 广播轮播相关数据
						let homeMsgTextList = assertArray(homeMsgTextData.list); // 系统通知 广播轮播信息 列表
						let homeMsgTextOptions = assertObject(homeMsgTextData.set); // 系统通知 广播轮播信息 样式配置

						let homeMenuBtnList = assertArray(homeHeadData.iconNavi); // 首页跳转到分类页面的菜单栏 按钮数据

						resObj = {
							type: success,
							msg: result.data.msg,
							result: {
								homeSwiperList, // 首页 轮播图列表
								homeCouponList, // 优惠券列表数据
								homeCouponOptions, // 优惠券 相关配置

								homeTagTextList, // 中台提交系统标签列表数据
								homeTagTextOptions, // 中台提交系统标签 相关样式配置

								homeMsgTextList, // 系统通知 广播轮播信息 列表
								homeMsgTextOptions, // 系统通知 广播轮播信息 样式配置
								homeMenuBtnList // 首页跳转到分类页面的菜单栏 按钮数据
							}
						};
					} else {
						resObj = {
							type: error,
							msg: result.data.msg,
							result
						};
					}
				} else {
					resObj = {
						type: error,
						msg: that.$errorMsg,
						result
					};
				}
				resFn(resObj);
			});
		},
		// 获取首页页面 热销排行 滑动商品数据
		getIndexPageHotScrollGoodsFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: `/api/Index/GoodsType`
				});
				let resObj = {};

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let homeScrollGoodsInfoObj = assertObject(result.data.data); // 首页的 横向滚动 商品 数据
						let homeScrollGoodsList = assertArray(homeScrollGoodsInfoObj.list); //  首页 横向滚动商品列表数据
						homeScrollGoodsList.forEach(item => {
							// item.goods_list = assertArray(item.goods_list);

							let cloneGoodsList = cloneFn(assertArray(item.goods_list));
							item.goodsList = cloneGoodsList.map(item => {
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
									selectedNum: transNumFn(item.selectedNum), // 加入到购物车里的数量
									isSpec: item.is_guige == 1, // 商品是否多规格
									tagImg: item.top_left_tag_img // 商品左上的图片标签
								};
							});
							/*
								 判断背景格式
									1：使用系统主题颜色
									2：使用background_color字段颜色
									3：使用background_icon字段背景图
							*/
							if (item.is_background == 1) {
								item.bgType = 'color';
								item.bgContent = that.configInfo.web_site_color;
							} else if (item.is_background == 2) {
								item.bgStyleType = 'color';
								item.bgContent = item.background_color;
							} else if (item.is_background == 3) {
								item.bgType = 'image';
								item.bgContent = item.background_icon;
							}
							item.titleText = item.name; // 主标题
							item.subTitleText = item.brief; // 副标题
							item.titleIcon = item.icon; // 标题前的icon图标
							item.titleColor = item.text_color ? item.text_color : that.configInfo.web_site_text_color; // 标题文字的颜色
							item.isShowMoreBtn = item.is_more_btn == 1; // 是否显示加载更多按钮
						});
						resObj = {
							type: success,
							msg: result.data.msg,
							result: homeScrollGoodsList.map(item => {
								// 首页 横向滚动商品列表数据
								return {
									goodsList: item.goodsList,
									bgType: item.bgType,
									bgContent: item.bgContent,
									titleText: item.titleText,
									subTitleText: item.subTitleText,
									titleIcon: item.titleIcon,
									titleColor: item.titleColor,
									isShowMoreBtn: item.isShowMoreBtn,
									id: item.id
								};
							})
						};
					} else {
						resObj = {
							type: error,
							msg: result.data.msg,
							result
						};
					}
				} else {
					resObj = {
						type: error,
						msg: that.$errorMsg,
						result
					};
				}
				resFn(resObj);
			});
		},
		// 菜场 和 秒杀相关的数据
		getIndexPageCaichangMiaoshaoFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: `/api/Index/RobFoodmarket`
				});
				let resObj = {};
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let homeCaiChangMiaoShaObj = assertObject(result.data.data); // 菜场 和 秒杀相关的数据

						let miaoshaObj = assertObject(homeCaiChangMiaoShaObj.Rob); // 秒杀的数据
						let miaoshaGoodsList = assertArray(miaoshaObj.list); // 秒杀模块展示的商品列表
						let miaoshaOptions = {
							// 秒杀模块 相关配置

							miaoshaStartTime: miaoshaObj.start_time, // 开始时间
							miaoshaEndTime: miaoshaObj.end_time, // 结束时间
							miaoshaHomeBgColor: miaoshaObj.rob_hm_color || that.configInfo.web_site_color, // 今日秒杀首页推荐背景颜色
							miaoshaListPageBgColor: miaoshaObj.rob_list_color || that.configInfo.web_site_color // 今日秒杀列表背景色
						};
						/*
							今日秒杀商品列表 背景图设置规则
								如果没有背景图 就用 rob_list_color字段背景颜色用
								如果没有背景颜色就用系统设置背景颜色
						*/
						if (miaoshaObj.rob_list_img) {
							miaoshaOptions.miaoshaListPageBgImage = miaoshaObj.rob_list_img;
						} else {
							miaoshaOptions.miaoshaListPageBgImage = null;
						}

						let caiChangObj = assertObject(homeCaiChangMiaoShaObj.Foodmarket); // 菜场 相关的数据

						let caiChangGoodsList = assertArray(caiChangObj.list); // 菜场模块展示的商品列表

						let caiChangOptions = {
							// 菜场 模块 相关配置
							caichangTitleText: caiChangObj.vege_name, // 菜场模块标题文字
							caichangSubTitleText: caiChangObj.title, // 菜场模块副标题文字
							caichangListPageTitleBarTextColor: caiChangObj.vege_text_color, // 菜场页面 的 滑动模块标题栏的文字颜色
							caichangListPageTitleBarBgColor: caiChangObj.vege_color, // 菜场页面 的 滑动模块标题栏的文字背景颜色
							caichangHomeBgColor: caiChangObj.vege_hm_color // 菜场模块背景颜色
						};

						resObj = {
							type: success,
							msg: result.data.msg,
							result: {
								miaoshaGoodsList, // 秒杀模块 展示的商品列表
								miaoshaOptions, // 秒杀模块 相关样式配置
								caiChangGoodsList, // 菜场模块 展示的商品列表
								caiChangOptions // 菜场模块 相关样式配置
							}
						};
					} else {
						resObj = {
							type: error,
							msg: result.data.msg,
							result
						};
					}
				} else {
					resObj = {
						type: error,
						msg: that.$errorMsg,
						result
					};
				}
				resFn(resObj);
			});
		},

		// 获取首页页面 魔方图片 数据
		getIndexPageMofangTupianFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: `/api/Index/getIndexPicture`
				});

				let resObj = {};
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						function sortBy(field) {
							return function(a, b) {
								return a[field] - b[field];
							};
						}
						let resultArr = assertArray(result.data.data)
							.filter(item => item.is_show - 0)
							.map(item => {
								let list = assertArray(assertObject(item).content).map(item => {
									return {
										type: transNumFn(item.jump_type),
										content: item.path,
										image: that.addimgPathHostFn(item.image)
									};
								});
								return {
									sort: item.sort,
									styleId: transNumFn(item.style_id),
									list
								};
							})
							.sort(sortBy('sort'))
							.reverse();

						resObj = {
							msg: result.data.msg,
							type: success,
							result: resultArr
						};
					} else {
						resObj = {
							msg: result.data.msg,
							type: error,
							result
						};
					}
				} else {
					resObj = {
						msg: that.$errorMsg,
						type: error,
						result
					};
				}
				resFn(resObj);
			});
		},

		// 获取首页页面 底部商品 数据
		getIndexPageBottomGoodsFn(pageIndex, goodsTypeId) {
			let that = this,
				data = {};
			if (pageIndex) {
				data.page = pageIndex;
			} else {
				data.page = 1;
			}
			if (goodsTypeId) {
				data.guideId = goodsTypeId;
			}
			return new Promise(async resFn => {
				let result = await that.$request({
					url: `/api/Index/GuideGoods`,
					data
				});
				let resObj = {};
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let homeBottomGoodsData = assertObject(result.data.data); // 底部商品 滑动菜单栏 和 菜单相对应的 商品列表数据

						let homeBottomGoodsClassList = assertArray(homeBottomGoodsData.guide); // 底部商品 分类列表

						let goodsList = assertArray(homeBottomGoodsData.goods).map(item => {
							return {
								goodsId: item.goods_id, // 商品id
								goodsImage: item.image, // 商品图片
								isHot: item.is_hot == 1, // 是否热销爆款
								isNew: item.is_new == 1, // 是否新品
								goodsName: item.goods_name, // 商品名称
								goodsDescription: item.goods_remark, // 商品描述
								goodsTag: item.activity, // 商品标签文字
								isVipPrice: item.is_vip_price == 1, // 是否会员专享
								goodsPrice: item.shop_price, // 商品价格
								vipPrice: item.vip_market_price, // 会员价
								linePrice: item.vip_market_price, // 划线价
								selectedNum: item.selectedNum, // 已经添加到购物车的数量
								isSpec: item.is_guige == 1, // 商品是否多规格
								tagImg: item.top_left_tag_img, // 商品左上的图片标签
								gysMdId: transNumFn(item.supp_id), // 供应商门店id
								gysMdName: item.dp_name // 供应商门店名字
							};
						});
						let homeBottomGoodsList = goodsList; // 当前分类下的 商品列表

						console.log('首页底部的商品列表数据', homeBottomGoodsList);

						resObj = {
							type: success,
							msg: result.data.msg,
							result: {
								homeBottomGoodsClassList, // 底部商品 分类列表
								homeBottomGoodsList // 当前分类下的 商品列表
							}
						};
					} else {
						resObj = {
							type: error,
							msg: result.data.msg,
							result
						};
					}
				} else {
					resObj = {
						type: error,
						msg: that.$errorMsg,
						result
					};
				}
				resFn(resObj);
			});
		},

		// 当前坐标的文字描述 和 是否在配送范围内
		currentAddressInfoFn(locationInfo) {
			let that = this;
			return new Promise(resFn => {
				Promise.all([
					that.getCurrentAddressInfo(locationInfo),
					that.checkRangeFn(`${locationInfo.longitude},${locationInfo.latitude}`)
				]).then(([currentAddressTextResult, checkRangeResult]) => {
					resFn({
						result: {
							currentAddressTextResult,
							checkRangeResult
						}
					});
				});
			});
		},
		// #ifdef MP-WEIXIN
		// 获取 手动发送优惠券模板ID列表 首页弹框用户授权这个模板id列表
		getIndexPageCouponTemplateIdListFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/Pay/hand_send_coupon'
				});
				let resultObj = {};
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let templateIdList = assertArray(result.data.data)
							.filter(item => item.mini_status == 1)
							.map(item => item.mini_template_id);
						resultObj = {
							type: 'success',
							msg: '成功',
							result: templateIdList
						};
					} else {
						resultObj = {
							type: 'error',
							msg: result.data.msg,
							result: result
						};
					}
				} else {
					resultObj = {
						type: 'error',
						msg: that.$errorMsg,
						result
					};
				}
				resFn(resultObj);
			});
		},
		// #endif
		// ↑↑↑ 页面网络请求层方法

		// ↓↓↓ 页面方法调用层方法

		// 页面打开第一次加载 or 登录成功后的回调 or 下拉刷新会触发
		async pageLoadFn(fn) {
			let that = this;
			that.hideAllFn();

			// ↓↓↓ 首屏数据

			// 1. 轮播图 优惠券 系统设置的标签 广播通知 轮播 首页跳转到其他页面的菜单按钮
			// 2. 热销排行榜 滑动数据
			let indexPageFirstScreenDataResult = await that.getIndexPageFirstScreenDataFn();
			/*
			console.log(
				'JSON.stringify(indexPageFirstScreenDataResult)',
				JSON.stringify(indexPageFirstScreenDataResult),
				indexPageFirstScreenDataResult
			);
			 */

			let { indexPageHeaderData, indexPageHotScrollGoods } = indexPageFirstScreenDataResult.result;

			if (indexPageHeaderData.type == success) {
				let {
					homeSwiperList,
					homeCouponList,
					homeCouponOptions,

					homeTagTextList,
					homeTagTextOptions,

					homeMsgTextList,
					homeMsgTextOptions,
					homeMenuBtnList
				} = indexPageHeaderData.result;

				that.homeSwiperList = homeSwiperList;
				that.homeCouponList = homeCouponList;
				that.homeCouponOptions = homeCouponOptions;
				that.homeTagTextList = homeTagTextList;
				that.homeTagTextOptions = homeTagTextOptions;
				that.homeMsgTextList = homeMsgTextList;
				that.homeMsgTextOptions = homeMsgTextOptions;
				that.homeMenuBtnList = homeMenuBtnList;

				/* 
					优惠券以前领取过 并且 是刚登陆 优惠券弹框还是显示状态 这时把优惠券弹框隐藏掉
				*/
				if (that.homeCouponList.length <= 0 && that.modalGroupCouponFlag) {
					that.modalGroupCouponFlag = false;
				}
			} else {
				that.firstScreenGjpFlag = false;
			}

			if (indexPageHotScrollGoods.type == success) {
				that.homePageScrollGoods = indexPageHotScrollGoods.result;
			} else {
				that.firstScreenGjpFlag = false;
			}
			if (that.firstScreenGjpFlag) {
				that.firstScreenGjpFlag = false;
			}

			// ↑↑↑ 首屏数据
			// ↓↓↓ 非首屏数据
			// 菜场秒杀
			let indexPageCaichangMiaoshaoResult = await that.getIndexPageCaichangMiaoshaoFn();
			if (indexPageCaichangMiaoshaoResult.type == success) {
				let {
					miaoshaGoodsList, // 秒杀模块 展示的商品列表
					miaoshaOptions, // 秒杀模块 相关样式配置
					caiChangGoodsList, // 菜场模块 展示的商品列表
					caiChangOptions // 菜场模块 相关样式配置
				} = indexPageCaichangMiaoshaoResult.result;

				that.miaoshaGoodsList = miaoshaGoodsList; // 秒杀模块的 商品列表数据
				that.$store.commit('setMiaoshaOptions', miaoshaOptions);
				that.caiChangGoodsList = caiChangGoodsList; // 菜场模块 的商品列表
				that.$store.commit('setCaiChangOptions', caiChangOptions);

				console.log('miaoshaOptions', miaoshaOptions);
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: indexPageCaichangMiaoshaoResult.msg
				});
			}

			// 魔方图片
			let indexPageMofangTupianResult = await that.getIndexPageMofangTupianFn();
			console.log('魔方图片数据 indexPageMofangTupianResult', indexPageMofangTupianResult);
			if (indexPageMofangTupianResult.type == success) {
				that.bannerImageList = indexPageMofangTupianResult.result;
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: indexPageMofangTupianResult.msg
				});
			}

			// 底部商品
			let indexPageBottomGoodsResult = await that.getIndexPageBottomGoodsFn(1);
			if (indexPageBottomGoodsResult.type == success) {
				that.navBarListActive = 0; // 横向菜单 索引
				that.homeBottomGoodsClassList = indexPageBottomGoodsResult.result.homeBottomGoodsClassList;
				that.homePageBottomGoodsList = indexPageBottomGoodsResult.result.homeBottomGoodsList;

				if (that.homePageBottomGoodsList.length) {
					that.loadMoreStatus = 'more';
				} else {
					that.loadMoreStatus = 'noMore';
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: indexPageBottomGoodsResult.msg
				});
			}

			// #ifdef MP-WEIXIN
			// 获取小程序里首页的模板消息列表
			let indexPageCouponTemplateIdListResult = await that.getIndexPageCouponTemplateIdListFn();

			if (indexPageCouponTemplateIdListResult.type == success) {
				let indexPageCouponTemplateIdList = indexPageCouponTemplateIdListResult.result;

				that.$store.commit('setHomeTemplateIdList', indexPageCouponTemplateIdList);

				if (indexPageCouponTemplateIdList.length) {
					// 首页的模板消息 是否被同意过
					let homeSetingFalgResult = await that.homeTempIdListIsConfirm(indexPageCouponTemplateIdList);

					if (homeSetingFalgResult.type == 'success') {
						that.$store.commit('setHomeTemplateIdSettingFlag', true);
					} else {
						that.$store.commit('setHomeTemplateIdSettingFlag', false);
					}

					//
					let isUserCloneMsgFlag = await that.isUserCloneMsg(indexPageCouponTemplateIdList);

					if (isUserCloneMsgFlag.type == 'success') {
						that.$store.commit('setIsUserCloneFlag', true);
					} else {
						that.$store.commit('setIsUserCloneFlag', false);
					}
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: indexPageCouponTemplateIdListResult.msg
				});
			}
			// #endif

			fn && fn();

			let indexAddressInfo = assertObject(uni.getStorageSync('indexAddressInfo'));

			// 是否有首页地址信息 true有;  false没有
			let isHasAddressInfo = checkTypeFn(indexAddressInfo) == 'Object' && Object.keys(indexAddressInfo).length;
			if (!isHasAddressInfo) {
				that.indexPageGetAddressInfoFn(() => {
					clearTimeout(loopShowModalTimer);
					that.loopShowModalFn();
				});
			} else {
				that.currentAddressText = indexAddressInfo.currentAddressText;
				that.addressIsAtRangeFlag = indexAddressInfo.addressIsAtRangeFlag;
				that.isGetedAddressFlag = true;
				clearTimeout(loopShowModalTimer);
				that.loopShowModalFn();
			}
		},

		// 分类商品组滑动到右边 隐藏 漂浮的提示
		hideHomeMenuTipFn() {
			this.isShowHomeMenuTip = false;
		},
		// 底部的商品分类滑动导航点击
		changeNavBarFn(e) {
			this.navBarListActive = e.index;
			this.navBarListClickFn(e.index, e.item);
		},
		// 底部的商品分类滑动导航点击后请求当前分类商品数据
		async navBarListClickFn(index, item) {
			let that = this;

			that.goodsLoading = true;

			that.pageIndex = 1;
			let indexPageBottomGoodsResult = await that.getIndexPageBottomGoodsFn(that.pageIndex, item.id);

			if (indexPageBottomGoodsResult.type == success) {
				that.homePageBottomGoodsList = indexPageBottomGoodsResult.result.homeBottomGoodsList;
				if (that.homePageBottomGoodsList.length) {
					that.loadMoreStatus = 'more';
				} else {
					that.loadMoreStatus = 'noMore';
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: indexPageBottomGoodsResult.msg
				});
			}
			that.goodsLoading = false;
			that.$nextTick(() => {
				setTimeout(() => {
					var query = uni.createSelectorQuery().in(that);
					query
						.selectAll('.bottom-shop-list-getdom')
						.boundingClientRect(rect => {
							let topVal = transNumFn(assertObject(assertArray(rect)[0]).top);

							let pageTo = that.mixinScrollTop + topVal - (88 + statusBarHeight + that.rpxTopxFn(128));

							console.log('$nextTick Run', pageTo);

							console.log('bottom-shop-list dom元素位置信息', rect, rect[0].top);

							uni.pageScrollTo({
								scrollTop: pageTo,
								duration: 100
							});
						})
						.exec();
				}, 10);
			});
		},
		// 展示优惠券类型是在顶部页面时 领取优惠券成功
		getCouponSuccess(item) {
			let it = cloneFn(item.item);
			it.isGet = true;
			this.$set(this.homeCouponList, item.index, it);
		},
		// 首页加载地址信息
		async indexPageGetAddressInfoFn(fn) {
			let that = this;
			let locationInfo = await that.getLocationInfoFn();
			that.isGetedAddressFlag = true;

			if (locationInfo.type == success) {
				let { latitude, longitude } = locationInfo.result;

				let {
					result: { currentAddressTextResult, checkRangeResult }
				} = await that.currentAddressInfoFn({ latitude, longitude });

				console.log('当前坐标的文字描述 和 是否在配送范围内 currentAddressInfoResult', {
					currentAddressTextResult,
					checkRangeResult
				});
				that.addressIsAtRangeFlag = checkRangeResult.type == success;

				if (currentAddressTextResult.type == success) {
					that.currentAddressText = currentAddressTextResult.result.address;

					let indexAddressInfo = {
						latitude: latitude,
						longitude: longitude,
						currentAddressText: that.currentAddressText,
						addressIsAtRangeFlag: that.addressIsAtRangeFlag
					};
					console.log('indexAddressInfo 数据', indexAddressInfo);

					uni.setStorageSync('indexAddressInfo', indexAddressInfo);
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: currentAddressTextResult.msg
					});
				}

				fn && fn();
			} else {
				that.navigateToFn({
					url: `/packageA/set-address-page/index?page=index`
				});
			}

			console.log('在首页获取位置信息locationInfo', locationInfo);
		},
		// 循环调用显示当前的所有弹框函数
		loopShowModalFn() {
			let that = this;
			clearTimeout(loopShowModalTimer);

			loopShowModalTimer = setTimeout(() => {
				if (that.isGetedAddressFlag) {
					// #ifdef APP-PLUS
					// 处理 app版本更新弹框
					let currentVersion = getVersionFn(AppVersion);
					let newVersion = getVersionFn(that.configInfo.versionNum);
					if (that.configInfo.app_download_url && newVersion > currentVersion) {
						if (that.modalGroupAppVersionFlag) {
							return false;
						}
						// 有下载链接 并且 线上版本要比现在使用的高
						that.modalGroupAppVersionFlag = true; // app 平台的更新最新版本的弹框
						return false;
					} else {
						that.modalGroupAppVersionFlag = false; // app 平台的更新最新版本的弹框
					}
					// #endif

					// #ifdef MP-WEIXIN
					/*

					console.log(
						`系统允许弹框 ${that.globalMainSwitch} '\n'
						首页的 模板id列表 ${that.homeTemplateIdList}  '\n'
						运行模板消息时 没有 勾选 "允许通知并不再提示"  ${!that.homeTemplateIdSettingFlag} '\n'`
					);
					 */

					// 处理 引导用户允许 发送模板消息弹框
					if (
						that.globalMainSwitch && // 系统允许弹框
						that.homeTemplateIdList && // 首页的 模板id列表 不是空
						!that.homeTemplateIdSettingFlag && // 运行模板消息时 没有 勾选 "允许通知并不再提示"
						!that.weixinTemplateMsgFlagCloseEd // 是否被用户关闭过了 (关闭过就不弹了  )
					) {
						if (that.modalGroupWeixinTemplateMsgFlag) {
							return false;
						}
						that.modalGroupWeixinTemplateMsgFlag = true;
						return false;
					} else {
						that.modalGroupWeixinTemplateMsgFlag = false;
					}
					// #endif

					// 处理 距离提示弹框
					if (!that.addressIsAtRangeFlag && !that.notRangeFlagCloseEd) {
						if (that.modalGroupNotRangeFlag) {
							return false;
						}
						that.modalGroupNotRangeFlag = true;
						return false;
					} else {
						that.modalGroupNotRangeFlag = false;
					}

					// 处理间隔xxxx时间内不再弹出
					let newDate = +new Date();
					let loopShowModalFlag = uni.getStorageSync('loopShowModalFlag');
					if (loopShowModalFlag) {
						if (newDate - loopShowModalFlag > 1800000) {
							// if (newDate - loopShowModalFlag > 1000 * 60) {
							uni.setStorageSync('loopShowModalFlag', newDate);
						} else {
							if (newDate - loopShowModalFlag > 5 * 1000) {
								return false;
							}
						}
					} else {
						uni.setStorageSync('loopShowModalFlag', newDate);
					}

					// 处理 领取优惠券弹框
					if (
						that.homeCouponList.length &&
						that.homeCouponOptions.show_type == 2 &&
						!that.couponFlagCloseEd
					) {
						if (that.modalGroupCouponFlag) {
							return false;
						}
						that.modalGroupCouponFlag = true;
						return false;
					} else {
						that.modalGroupCouponFlag = false;
					}
					// 处理平台首页广告图
					if (that.homeAdOption && !that.homeAdFlagCloseEd) {
						if (that.modalGroupHomeAdFlag) {
							return false;
						}
						that.modalGroupHomeAdFlag = true;
						return false;
					} else {
						that.modalGroupHomeAdFlag = false;
					}
				}
			}, 1000);
		},
		// #ifdef MP-WEIXIN
		// 关闭引导用户允许 发送模板消息弹框
		closeWeixinTemplateMsgFn() {
			this.modalGroupWeixinTemplateMsgFlag = false;
			this.weixinTemplateMsgFlagCloseEd = true;
			clearTimeout(loopShowModalTimer);
			this.loopShowModalFn();
		},
		// #endif
		// 关闭首页 领取优惠券弹框
		closeHomeCouponModalFn() {
			this.modalGroupCouponFlag = false;
			this.couponFlagCloseEd = true; // 领取优惠券弹框 是否被用户关闭过了 ( 关闭过就不弹了  )
			clearTimeout(loopShowModalTimer);
			this.loopShowModalFn();
		},
		// 关闭首页 广告图弹框
		closeHomeAdModalFn() {
			this.modalGroupHomeAdFlag = false;
			this.homeAdFlagCloseEd = true;
			clearTimeout(loopShowModalTimer);
			this.loopShowModalFn();
		},
		// 领取 优惠券
		async lingqvFn(e) {
			let that = this;
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

			let idList = that.homeCouponList
				.map(item => {
					return item.id;
				})
				.join(',');

			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/User/GetCoupon',
				data: {
					couponIds: idList
				}
			});
			console.log(result, '领取优惠券结果');

			if (result.statusCode == 200) {
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
			that.closeHomeCouponModalFn();
		},

		// ↑↑↑ 页面方法调用层方法
		// 选择地址页面 设置好后 首页展示出来
		async getSetHomeAddressInfoFn() {
			let that = this;
			let indexAddressInfo = assertObject(uni.getStorageSync('indexAddressInfo'));
			console.log('indexAddressInfo', indexAddressInfo);
			// 是否有首页地址信息 true有;  false没有
			let isHasAddressInfo = checkTypeFn(indexAddressInfo) == 'Object' && Object.keys(indexAddressInfo).length;

			if (isHasAddressInfo && indexAddressInfo.reset) {
				that.currentAddressText = indexAddressInfo.currentAddressText;
				that.addressIsAtRangeFlag = indexAddressInfo.addressIsAtRangeFlag;
			}
		},

		//↓↓轮播图切换事件 切换 底部 表示点
		swiperChangeFn(e) {
			this.homeSwiperItemActive = e.current;
			// console.log('轮播图切换事件触发 当前索引', this.homeSwiperItemActive);
		},

		// 上拉触底 加载更多
		async onReachBottom() {
			let that = this;
			// #ifdef APP-PLUS
			if (that.openAppCount <= 1) {
				return false;
			}
			// #endif
			that.loadMoreStatus = 'loading';
			that.pageIndex++;
			let { id: typeId } = assertObject(that.homeBottomGoodsClassList[that.navBarListActive]);

			let args = [that.pageIndex];
			if (typeId) {
				args.push(typeId);
			}
			let indexPageBottomGoodsResult = await that.getIndexPageBottomGoodsFn(...args);
			if (indexPageBottomGoodsResult.type == success) {
				if (indexPageBottomGoodsResult.result.homeBottomGoodsList.length) {
					that.loadMoreStatus = 'more';
					that.homePageBottomGoodsList = that.homePageBottomGoodsList.concat(
						indexPageBottomGoodsResult.result.homeBottomGoodsList
					);
				} else {
					that.loadMoreStatus = 'noMore';
					that.pageIndex--;
					if (that.pageIndex <= 1) {
						that.pageIndex == 1;
					}
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: indexPageBottomGoodsResult.msg
				});
			}
		},

		// 登录后回调
		refreshFn() {
			this.pageLoadFn();
			this.setTabBarCartNumFn();
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

		setAddressOutOfRangeModalFlagFn(flag) {
			this.modalGroupNotRangeFlag = flag;
			if (!flag) {
				this.notRangeFlagCloseEd = true;
				clearTimeout(loopShowModalTimer);
				this.loopShowModalFn();
			}
			// console.log('that.addressOutOfRangeModalFlag', this.addressOutOfRangeModalFlag);
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

					if (that.configInfo.share_home) {
						updateAppMessageShareDataOptions.imgUrl = that.addimgPathHostFn(that.configInfo.share_home);
					}
					if (that.configInfo.applet_share_title) {
						updateAppMessageShareDataOptions.desc = that.configInfo.applet_share_title;
					}
					updateAppMessageShareDataOptions.title = document.title;

					let shareUrlStr = `${location.origin}${location.pathname}${location.hash}`;
					if (that.isLogin) {
						if (shareUrlStr.includes('?')) {
							shareUrlStr += `&shareFn=true&scene=${that.userInfoEncrypt}`;
						} else {
							shareUrlStr += `?shareFn=true&scene=${that.userInfoEncrypt}`;
						}
					}
					updateAppMessageShareDataOptions.link = shareUrlStr;

					console.log('updateAppMessageShareDataOptions', updateAppMessageShareDataOptions);

					jweixinModule.updateAppMessageShareData(updateAppMessageShareDataOptions);
					jweixinModule.updateTimelineShareData(updateAppMessageShareDataOptions);
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
					jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
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
		// 获取购买记录数据
		getBuyHistoryFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/Index/order_notify_switch'
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);
						let list = assertArray(resultObject.list).map((item, index) => {
							if (item.headimgurl && item.nickname) {
								return {
									headimgurl: that.addimgPathHostFn(item.headimgurl),
									msg: `${item.nickname}刚刚下单啦`
								};
							}
							return {
								headimgurl: that.calcImageSrc('/eat/my-user-image.png'),
								msg: `匿名用户-${index}刚刚下单啦`
							};
						});
						resFn({
							type: success,
							msg: '获取数据成功',
							result: list
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
		}
	}, //<---- methods 结束
	computed: {
		// 返回当前轮播图的背景颜色
		homeSwiperBgColor() {
			if (this.homeSwiperList.length) {
				let color = this.homeSwiperList[this.homeSwiperItemActive].color;
				return color ? color : this.configInfo.web_site_color;
			}
			return this.configInfo.web_site_color;
		},
		// 当前页面滚动是否到轮播图下面了
		calcPageIsScrollToSwiperBottom() {
			if (this.homeSwiperList.length) {
				// #ifdef H5
				return this.mixinScrollTop > 131;
				// #endif
				// #ifdef MP-WEIXIN || APP-PLUS || MP-TOUTIAO
				return this.mixinScrollTop > 175;
				// #endif
			}
			return this.mixinScrollTop > 30;
		},
		// 返回顶部头部背景颜色
		calcTopHeadBgColor() {
			if (this.calcPageIsScrollToSwiperBottom) {
				return this.configInfo.web_site_color;
			}
			return this.homeSwiperBgColor;
		},
		tabCurrent() {
			for (let i = 0; i < this.MenuList.length; i++) {
				if (this.MenuList[i].field == 'h') {
					return i;
				}
			}
			return 0;
		},
		// 首页的弹框广告配置
		homeAdOption() {
			let that = this;
			let AdOption = assertObject(assertObject(this.configInfo).advertising);
			if (Object.keys(AdOption).length) {
				AdOption.image = that.addimgPathHostFn(AdOption.image);
				return AdOption;
			} else {
				return false;
			}
		},
		top() {
			let that = this,
				top;
			// #ifdef APP-PLUS || MP-WEIXIN || MP-TOUTIAO
			top = 88 + that.statusBarHeight - that.rpxTopxFn(10);
			// #endif
			// #ifdef H5
			top = 44 + that.statusBarHeight - that.rpxTopxFn(10);
			// #endif
			return `${top}px`;
		},
		...mapState({
			homeTemplateIdList: state => state.homeTemplateIdList, // 首页 模板消息 数组
			homeTemplateIdSettingFlag: state => state.homeTemplateIdSettingFlag, // 首页模板消息id 是否被永久 允许了
			globalMainSwitch: state => state.globalMainSwitch, // 小程序设置里 允许发送发送模板消息的 设置
			defaultHomeToastModalStatus: state => state.defaultHomeToastModalStatus, //  默认首页 弹出 确认 权限的 模态框
			isUserCloneFlag: state => state.isUserCloneFlag //  是否是 用户 手动关闭的
		})
	}, // ↑↑↑↑↑ computed 结束
	watch: {
		calcPageIsScrollToSwiperBottom(newVal, oldVal) {
			this.homeSwiperAutoplay = !newVal;
			console.log(
				'watch -> calcPageIsScrollToSwiperBottom',
				`新赋的值 ${newVal}`,
				`之前的值 ${oldVal}`,
				`轮播图是否自动轮播 this.homeSwiperAutoplay ${this.homeSwiperAutoplay}`
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.all-components {
	background: #f5f5f5;
	padding-top: 8rpx;
}
.home-search-wrap {
	position: sticky;
	z-index: 50;
	height: 44px;
}
.nav-bar-list-wrap {
	height: 128rpx;
	position: -webkit-sticky;
	position: sticky;
	z-index: 49;
	border-bottom: 1px solid #ffffff;
}
</style>
