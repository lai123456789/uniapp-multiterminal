<!-- 全改 -->
<template>
	<view class="page">
		<loading-css :is-show="isShowLoading"></loading-css>
		<!-- 配送地址↓↓ -->
		<view class="user-address">
			<view class="content-wrap">
				<view class="address-box">
					<image
						style="width:38rpx;height:46rpx"
						:src="calcImageSrc('/cart/dad8562db8b24ad0471d20e3872007b_03.png')"
					></image>
					<text>{{ currentAddressText ? currentAddressText : '未获取位置信息' }}</text>
				</view>
				<text v-if="isLogin && !calcCartIsEmpty" @click="delSelectGoods">删除</text>
			</view>
		</view>
		<view class="go-home-block" v-if="calcCartIsEmpty">
			<image class="bg-null-cart" :src="calcImageSrc('/cart/null-cart.png')"></image>
			<text>购物车空空如也</text>
			<view
				v-if="isLogin"
				class="navigator"
				@click="navigateToFn({ isTab: true, url: `/pages/index/index` })"
				:style="{ background: configInfo.web_site_color }"
			>
				去首页
			</view>
			<view
				v-else
				class="navigator"
				@click="closeGlobalLoginFn(true)"
				:style="{ background: configInfo.web_site_color }"
			>
				去登录
			</view>
		</view>

		<view class="cart-content-block content-wrap">
			<block v-for="(cartGoodsItem, cartGoodsIndex) in cartGoodsList" :key="cartGoodsItem.sellerId">
				<view class="seller-item-cart" v-if="cartGoodsItem.sellerCartGoodsList.length">
					<view
						class="seller-name-block"
						:class="[
							cartGoodsItem.isShowDispatch ? 'show-dispatch-info' : '',
							!gongyingshang ? 'not-gongyingshang' : ''
						]"
					>
						<view
							v-if="gongyingshang"
							class="is-select flex-center"
							@click="$onceClick(sellerActiveIconClickFn, cartGoodsIndex)"
						>
							<is-active-icon :is-active="calcSellerIsActive(cartGoodsItem)"></is-active-icon>
						</view>
						<view class="seller-name-content" :class="!gongyingshang ? 'not-gongyingshang' : ''">
							<view
								v-if="gongyingshang"
								class="top-seller-info"
								@click="toSellerFn(cartGoodsItem.sellerId)"
							>
								<image
									v-if="cartGoodsItem.sellerImage"
									class="seller-image"
									:src="cartGoodsItem.sellerImage"
								></image>
								<view class="seller-text text-ellipsis">{{ cartGoodsItem.sellerName }}</view>
								<view class="iconfont icon-arrow-right-copy-copy" style="width: 40rpx;"></view>
							</view>

							<view
								class="bottom-dispatch-info"
								:class="[cartGoodsItem.isShowDispatch ? 'show-dispatch-info' : '']"
							>
								<view class="dispatch-title-time" :class="[!gongyingshang ? 'not-gongyingshang' : '']">
									<view class="dispatch-title" :style="{ color: configInfo.web_site_color }">
										{{ cartGoodsItem.dispatchTitle }}
									</view>
									<view
										v-if="cartGoodsItem.dispatchTitle && cartGoodsItem.dispatchTime"
										class="dispatch-shu-dom"
									></view>
									<view class="dispatch-time">{{ cartGoodsItem.dispatchTime }}</view>
								</view>
								<view
									v-if="cartGoodsItem.isShowToHomeBtn"
									class="to-home-btn"
									@click="toSellerFn(cartGoodsItem.sellerId)"
								>
									<view class="btn-text">去凑单</view>
									<view
										class="iconfont icon-arrow-right-copy-copy"
										style="width: 40rpx; font-size: 26rpx;"
									></view>
								</view>
							</view>
						</view>
					</view>
					<view class="seller-goods-list">
						<block
							v-for="(sellerGoodsItem, sellerGoodsIndex) in cartGoodsItem.sellerCartGoodsList"
							:key="sellerGoodsItem.cartId"
						>
							<view
								class="seller-goods-item"
								:class="[sellerGoodsItem.discountsMsg ? 'has-discounts' : '']"
							>
								<view class="top-goods-info">
									<view
										class="is-select-block flex-center"
										@click="$onceClick(goodsActiveIconClickFn, cartGoodsIndex, sellerGoodsIndex)"
									>
										<view
											v-if="sellerGoodsItem.isInvalid"
											class="goods-state-text text-ellipsis border-radius"
										>
											失效
										</view>
										<is-active-icon v-else :is-active="sellerGoodsItem.isActive"></is-active-icon>
									</view>
									<view
										class="goods-image-wrap-block"
										:class="[sellerGoodsItem.isInvalid ? 'invalid' : '']"
										@click="
											$onceClick(
												toGoodsDetailPageFn,
												sellerGoodsItem.isInvalid,
												sellerGoodsItem.goodsTypeIsMiaosha,
												sellerGoodsItem.goodsId
											)
										"
									>
										<view class="tag-img-wrap" v-if="sellerGoodsItem.topLeftTagImage">
											<image class="image-size" :src="sellerGoodsItem.topLeftTagImage"></image>
										</view>
										<img-bg-css :src="sellerGoodsItem.goodsImage"></img-bg-css>
									</view>
									<view
										class="goods-info-block"
										:class="[sellerGoodsItem.isInvalid ? 'invalid' : '']"
										@click="
											$onceClick(
												toGoodsDetailPageFn,
												sellerGoodsItem.isInvalid,
												sellerGoodsItem.goodsTypeIsMiaosha,
												sellerGoodsItem.goodsId
											)
										"
									>
										<view class="goods-name text-ellipsis">{{ sellerGoodsItem.goodsName }}</view>
										<view class="goods-description_spec-key-block">
											<!-- 
											<view class="goods-description-text text-ellipsis" v-if="true">
												轩尧槟榔芋400g轩尧槟榔
											</view>
											 -->
											<view
												class="goods-spec-key-name-text text-ellipsis"
												v-if="sellerGoodsItem.goodsSpecName"
											>
												{{ sellerGoodsItem.goodsSpecName }}
											</view>
										</view>
										<view class="goods-tag-block">
											<view class="goods-tag-wrap" v-if="sellerGoodsItem.tagList.length">
												<view
													class="goods-tag"
													v-for="(tagItem, tagIndex) in sellerGoodsItem.tagList"
													:key="tagIndex"
												>
													{{ tagItem }}
												</view>
											</view>
										</view>
										<view class="bottom-price-block">
											<view
												v-if="sellerGoodsItem.vipStylePrice"
												class="vip-price-wrap"
												style="height: 26rpx; font-size: 0;"
											>
												<vip-price>{{ sellerGoodsItem.goodsPrice | filterTransNum }}</vip-price>
											</view>
											<view v-else class="price-block">
												<view class="price-icon">¥</view>
												<view class="price-text">
													{{ sellerGoodsItem.goodsPrice | filterTransNum }}
												</view>
											</view>
										</view>
										<view
											v-if="!sellerGoodsItem.isInvalid"
											class="control-block"
											@click.stop="catchTouchMove"
										>
											<view
												class="control-btn-block flex-center"
												@click="
													$onceClick(controlBtnClickFn, dec, cartGoodsIndex, sellerGoodsIndex)
												"
											>
												<cart-control-btn
													btn-type="minus"
													:is-disable="sellerGoodsItem.cartNum <= 1"
												></cart-control-btn>
											</view>

											<input
												v-if="inputDomFlag"
												class="input-dom"
												type="number"
												@blur="setNumInpFn($event, cartGoodsIndex, sellerGoodsIndex)"
												:value="sellerGoodsItem.cartNum"
											/>
											<view
												class="control-btn-block flex-center"
												@click="
													$onceClick(controlBtnClickFn, inc, cartGoodsIndex, sellerGoodsIndex)
												"
											>
												<cart-control-btn
													btn-type="plus"
													:is-disable="sellerGoodsItem.addBtnStopFlag"
												></cart-control-btn>
											</view>
											<view
												v-if="sellerGoodsItem.bubbleTips && sellerGoodsItem.isShowBubbleTips"
												class="bubble-tips border-radius"
												@click.stop="bubbleTipsClickFn(cartGoodsIndex, sellerGoodsIndex)"
											>
												<view class="tips-text">{{ sellerGoodsItem.bubbleTips }}</view>
											</view>
										</view>
									</view>
								</view>
								<view class="bottom-goods-discounts-block" v-if="sellerGoodsItem.discountsMsg">
									<!-- :style="{ borderColor: hexToRgba(configInfo.web_site_color, 0.2) }" -->
									<view
										class="view-after-dom"
										:style="{ borderColor: 'rgba(255, 97, 40, 0.18)' }"
									></view>
									<view class="discounts-tips" :style="{ borderColor: 'rgba(255, 97, 40, 0.18)' }">
										<view class="discounts-tips-icon">优惠</view>
										<view class="discounts-tips-text text-ellipsis">
											{{ sellerGoodsItem.discountsMsg }}
										</view>
									</view>
								</view>
							</view>
						</block>

						<!-- :class="[cartGoodsItem.sellerIsShowDiscounts ? 'seller-discounts' : '']" -->
						<view v-if="gongyingshang" class="seller-item-commit-btn-block content-wrap">
							<!--
							<view
								class="seller-discounts-info"
								v-if="cartGoodsItem.sellerIsShowDiscounts"
								@click="sellerDiscountsClickFn(cartGoodsIndex)"
							>
								<view class="discounts-total-price">
									已减:¥{{ cartGoodsItem.sellerDiscountsTotalPrice | filterTransNum }}
								</view>
								<view class="discounts-info">
									<view class="discounts-title red-price">优惠明细</view>
									<view class="discounts-icon">
										<view class="iconfont icon-icon_gantanhaozhong red-price"></view>
									</view>
								</view>
							</view>
							-->

							<view
								class="seller-commit-btn border-radius"
								v-if="calcSellerHasActive(cartGoodsItem)"
								@click="paySellerBtnClickFn(cartGoodsItem)"
							>
								<view class="left-price-block">
									<view class="price-icon">¥</view>
									<view class="price-num">{{ cartGoodsItem.sellerTotalPrice | filterTransNum }}</view>
								</view>
								<view class="right-text-block" :style="{ background: configInfo.goods_cart_bgcolor }">
									去结算({{ cartGoodsItem.sellerTotalNum }})
								</view>
							</view>
							<view
								class="seller-commit-btn border-radius"
								v-else
								style="background: #f4f5f7; color: #bcbdc1;"
							>
								<view class="right-text-block" style="padding: 0 30rpx">结算(0)</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>

		<!-- 失效商品 -->
		<invalid-goods-wrap
			v-if="loseGoodsList.length"
			:loseGoodsList="loseGoodsList"
			:loseGoodsTitle="loseGoodsTitle"
			:loseGoodsText="loseGoodsText"
			@clearInvalidGoodsFn="clearInvalidGoodsFn"
		></invalid-goods-wrap>
		<block v-if="likeGoodsList.length > 0">
			<view class="like-goods-list-bar">
				<view class="bar-title">
					<view class="after-dom">
						<view class="icon-O"></view>
						<view class="icon-I"></view>
					</view>
					<view class="before-dom">
						<view class="icon-O"></view>
						<view class="icon-I"></view>
					</view>
					{{ likeGoodsTitle }}
				</view>
			</view>

			<view class="bottom-shop-list">
				<view class="content-wrap">
					<view class="list-goods-item-div" v-for="(item, index) in likeGoodsList" :key="index">
						<list-goods-item
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
							:gysMdId="item.gysMdId"
							:gysMdName="item.gysMdName"
							page="gouwuche"
							ref="listGoodsItem"
							@emitGetCartListFn="emitGetCartListFn"
						></list-goods-item>
					</view>
				</view>
			</view>
		</block>
		<view style="height: 96rpx;" v-if="isLogin"></view>
		<view class="order-btn-block" v-if="isLogin" :style="{ bottom: isiPhoneX ? '142rpx' : '112rpx' }">
			<view class="isAll-btn" @click="$onceClick(allSelectFn)">
				<uni-icons
					v-if="allSelectBtnActiveStatus"
					:color="configInfo.web_site_color"
					size="20"
					type="checkbox-filled"
				></uni-icons>
				<uni-icons v-else color="#c7c7c7" size="20" type="circle"></uni-icons>
				<text class="text">全选</text>
			</view>
			<view
				class="price-all"
				:class="[bottomIsShowDiscounts ? '' : 'show-bottom-discounts']"
				@click="bottomDiscountsClickFn"
			>
				<view class="top-price-title">
					<view class="bottom-price-text">不含运费 合计:</view>
					<view class="bar-price-block">
						<view class="price-icon red-price">¥</view>
						<view class="price-text red-price">{{ bottomTotalPrice | filterTransNum }}</view>
					</view>
				</view>
				<view class="bottom-discounts" v-if="bottomIsShowDiscounts">
					<view class="discounts-total-price">已减: ¥{{ bottomDiscountsTotalPrice | filterTransNum }}</view>
					<view class="discounts-info red-price">
						<view class="discounts-title">优惠明细</view>
						<view class="discounts-icon">
							<view
								class="iconfont icon-arrow-right-copy-copy red-price"
								style="font-size: 24rpx;"
								:style="{ transform: `rotate(${discountsModalFlag ? 90 : -90}deg)` }"
							></view>
							<!-- <view class="iconfont icon-icon_gantanhaozhong red-price"></view> -->
						</view>
					</view>
				</view>
			</view>

			<view
				v-if="bottomTotalNum"
				class="order-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				:style="{ background: configInfo.goods_cart_bgcolor, opacity: commitBtnState ? 0.8 : 1 }"
				@click="$onceClick(toPayFn)"
			>
				结算({{ bottomTotalNum }})
			</view>

			<view
				v-else
				class="order-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				style="background: #f4f5f7; color: #bcbdc1"
			>
				结算({{ bottomTotalNum }})
			</view>
		</view>

		<discounts-modal
			:discountsModalFlag="discountsModalFlag"
			:discountsModalTitle="discountsModalTitle"
			:discountsModalList="discountsModalList"
			@setDiscountsModalFlagFn="setDiscountsModalFlagFn"
		></discounts-modal>

		<goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="currentGoodsName"
			:goods-description="currentGoodsDescription"
			:goods-images="currentGoodsImages"
			:goods-id="currentGoodsId"
			:selected-num="currentGoodsSelectedNum"
			page="gouwuche"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
			@emitGetCartListFn="emitGetCartListFn"
		></goods-spec>

		<!-- ↓↓↓ 登录框 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="onShowFn" @close="closeGlobalLoginFn"></login-fn>

		<view class="hans-tabbar">
			<view class="hans-tabbar-height" :class="[isiPhoneX ? 'isiPhoneXClass' : '']"></view>
			<view class="hans-tabbar-fixde" :class="[isiPhoneX ? 'isiPhoneXClass' : '']">
				<hans-tabbar :cardNumber="cardNumber" :list="MenuList" :tab-current="tabCurrent"></hans-tabbar>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import isActiveIcon from '@/pages/cart/cart-components/is-active-icon.vue';
import cartControlBtn from '@/pages/cart/cart-components/cart-control-btn.vue';
import invalidGoodsWrap from '@/pages/cart/cart-components/invalid-goods-wrap.vue';
import discountsModal from '@/pages/cart/cart-components/discounts-modal.vue';
import { success, error, delCartGoodsTypeCartId, bindMobileTips } from '@/tools/const.js';

import {
	checkTypeFn,
	assertObject,
	assertArray,
	assertNumber,
	toDoubleNumFn,
	transNumFn,
	cloneFn,
	addSpecFilterItemActAttrFn,
	bigMinus,
	bigTimes,
	bigPlus
} from '@/tools/tools';

let windowTop = uni.getSystemInfoSync().windowTop;
console.log('windowTop', windowTop);

const inc = 'inc', // 增加
	dec = 'dec'; // 减少

export default {
	components: {
		isActiveIcon,
		cartControlBtn,
		invalidGoodsWrap,
		discountsModal
	},
	data() {
		return {
			inputDomFlag: true, // input 输入框的显示隐藏状态
			currentAddressText: '', // 临时的地址文字

			isShowLoading: true, // 开屏动画

			likeGoodsTitle: '', // 猜你喜欢商品的标题文字
			likeGoodsList: [], // 猜你喜欢商品列表数据

			commitBtnTemplateList: [], // 小程序模板消息字符串
			loseGoodsList: [], // 失效商品列表
			loseGoodsTitle: '', // 失效商品列表顶部的标题
			loseGoodsText: '', // 失效商品前的展示文字

			cartGoodsList: [], // 购物车列表数据

			// 优惠详情弹框数据
			discountsModalFlag: false, // 是否弹框
			discountsModalTitle: '',
			discountsModalList: [],

			// 购物车底部信息
			bottomIsShowDiscounts: false,
			bottomDiscountsTitle: '',
			bottomDiscountsTotalPrice: 0,
			bottomDiscountsList: [],
			bottomTotalPrice: 0,
			bottomTotalNum: 0,

			inc,
			dec,

			sendAjaxFlag: false, // 页面发送网络请求的锁 (任何操作都会上锁 必须等前一个网络请求返回后才可以执行)

			commitBtnState: false, // 提交按钮的状态

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
		that.hideAllFn();
		console.log('hide run');
		// 关闭页面底部的优惠信息弹框
		if (that.discountsModalFlag) {
			that.discountsModalFlag = false;
		}
	},
	onUnload() {
		uni.$off('goodsAddCartEd_cart');
	},
	onLoad() {
		let that = this;
		// 加入购物车成功后
		uni.$off('goodsAddCartEd_cart');
		uni.$on('goodsAddCartEd_cart', arg => {
			let { selectedNum, goodsId } = arg;
			that.likeGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});
		});
		that.loadFn();
	},
	onShow() {
		let that = this;

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

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			let currentGoods = assertObject(assertArray(that.likeGoodsList.filter(item => item.goodsId == goodsId))[0]);

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

		that.onShowFn();
		// 关闭页面底部的优惠信息弹框
		if (that.discountsModalFlag) {
			that.discountsModalFlag = false;
		}
	},

	async onPullDownRefresh() {
		let that = this;
		if (that.sendAjaxFlag) {
			uni.stopPullDownRefresh();
			return false;
		}
		that.sendAjaxFlag = true;
		if (that.isLogin) {
			let [getLikeGoodsResult, getMyCartDataResult] = await Promise.all([
				that.getLikeGoodsFn(),
				that.getMyCartDataFn()
			]);

			if (getLikeGoodsResult.type == 'success' && getMyCartDataResult.type == 'success') {
				let { likeGoodsTitle, likeGoodsList } = getLikeGoodsResult.result;
				that.likeGoodsTitle = likeGoodsTitle;
				that.likeGoodsList = likeGoodsList;

				let {
					loseGoodsList,
					loseGoodsTitle,
					loseGoodsText,
					commitBtnTemplateList,
					cartGoodsList,

					bottomIsShowDiscounts,
					bottomDiscountsTitle,
					bottomDiscountsTotalPrice,
					bottomDiscountsList,
					bottomTotalPrice,
					bottomTotalNum
				} = getMyCartDataResult.result;

				that.loseGoodsList = loseGoodsList;
				that.loseGoodsTitle = loseGoodsTitle;
				that.loseGoodsText = loseGoodsText;
				that.commitBtnTemplateList = commitBtnTemplateList;

				that.cartGoodsList = cartGoodsList;

				that.bottomIsShowDiscounts = bottomIsShowDiscounts;
				that.bottomDiscountsTitle = bottomDiscountsTitle;
				that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
				that.bottomDiscountsList = bottomDiscountsList;
				that.bottomTotalPrice = bottomTotalPrice;
				that.bottomTotalNum = bottomTotalNum;

				that.sendAjaxFlag = false;
				uni.stopPullDownRefresh();
			} else {
				uni.showToast({
					icon: 'none',
					title: getLikeGoodsResult.type == 'error' ? getLikeGoodsResult.msg : getMyCartDataResult.msg
				});
			}
		} else {
			let getLikeGoodsResult = await that.getLikeGoodsFn();
			if (getLikeGoodsResult.type == 'success') {
				let { likeGoodsTitle, likeGoodsList } = getLikeGoodsResult.result;
				that.likeGoodsTitle = likeGoodsTitle;
				that.likeGoodsList = likeGoodsList;
			} else {
				uni.showToast({
					icon: 'none',
					title: getLikeGoodsResult.msg
				});
			}
			that.sendAjaxFlag = false;
			uni.stopPullDownRefresh();
		}
	},
	methods: {
		// ↓↓↓ 获取页面数据的几个函数
		// 获取购物车数据
		getMyCartDataFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: '/api/Cart/myCart'
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);

						// ↓↓ 模板字符串
						let commitBtnTemplateList = assertArray(resultObject.template)
							.filter(i => i.mini_status == 1 && i.mini_template_id)
							.map(i => i.mini_template_id);

						// ↓↓ 失效商品
						let loseGoodsObject = assertObject(resultObject.lose_goods),
							loseGoodsList = assertArray(loseGoodsObject.list).map(item => {
								return {
									cartId: item.cart_id,
									goodsImage: item.original_img, // 商品图片
									goodsName: item.goods_name, // 商品名字
									loseReasonText: item.reason, // 商品名字
									topLeftTagImage: `${item.top_left_tag_img}`,
									goodsPrice: transNumFn(item.shop_price),
									vipStylePrice: item.goods_type == 3
								};
							}),
							loseGoodsTitle = loseGoodsObject.title,
							loseGoodsText = loseGoodsObject.name;

						// ↓↓ 购物车各商家商品数据
						let cartGoodsList = assertArray(resultObject.list_goods)
							.filter(i => assertArray(assertObject(i).goods_list).length > 0)
							.map(item => {
								let sellerItem = assertObject(item),
									sellerItemInfo = assertObject(sellerItem.info),
									sellerItemInfoDetail = assertObject(sellerItemInfo.store_info),
									sellerItemInfoDispatch = assertObject(sellerItemInfo.dispatch),
									sellerItemInfoPrinf = assertObject(sellerItemInfo.prinf),
									sellerItemInfoDiscounts = assertObject(sellerItemInfo.discounts),
									sellerCartGoodsList = assertArray(sellerItem.goods_list).map(item => {
										let goodsItem = assertObject(item),
											cartNum = transNumFn(goodsItem.cart_num),
											oneboy = transNumFn(goodsItem.oneboy);
										return {
											cartId: goodsItem.cart_id,
											goodsId: goodsItem.goods_id,
											cartNum,
											isActive: goodsItem.is_active == 1,
											goodsImage: goodsItem.original_img,
											topLeftTagImage: `${goodsItem.top_left_tag_img}`,
											goodsName: goodsItem.goods_name,
											goodsSpecName: goodsItem.spec_name,
											discountsMsg: goodsItem.promotion,
											goodsPrice: transNumFn(goodsItem.shop_price),
											vipStylePrice: goodsItem.goods_type == 3,
											goodsTypeIsMiaosha: goodsItem.goods_type == 2,
											storeCount: goodsItem.store_count,
											oneboy,
											addBtnStopFlag: cartNum >= oneboy,
											tagList: assertArray(goodsItem.desc)
												.filter(i => i)
												.map(i => i),
											bubbleTips: goodsItem.remqua,
											isShowBubbleTips: true,
											isInvalid: false
										};
									});
								return {
									sellerId: sellerItemInfoDetail.id,
									sellerName: sellerItemInfoDetail.name,
									sellerImage: sellerItemInfoDetail.img,
									isShowDispatch: sellerItemInfoDispatch.is_dispatch == 1,
									dispatchTime: sellerItemInfoDispatch.arrival_time,
									dispatchTitle: sellerItemInfoDispatch.shosub,
									isShowToHomeBtn: sellerItemInfoDispatch.is_aoi == 1,

									sellerIsShowDiscounts: sellerItemInfoDiscounts.is_dis == 1,
									sellerDiscountsTitle: sellerItemInfoDiscounts.title,
									sellerDiscountsTotalPrice: transNumFn(sellerItemInfoDiscounts.total_price),
									sellerDiscountsList: assertArray(sellerItemInfoDiscounts.list).map(i => {
										return {
											name: i.name,
											price: transNumFn(i.price)
										};
									}),
									sellerTotalPrice: transNumFn(sellerItemInfoPrinf.total_price),
									sellerTotalNum: transNumFn(sellerItemInfoPrinf.total_num),

									sellerCartGoodsList
								};
							});

						// ↓↓ 底部钱数和优惠信息
						let bottomTotalData = assertObject(resultObject.total_data),
							bottomDiscounts = assertObject(bottomTotalData.discounts),
							bottomPrinf = assertObject(bottomTotalData.prinf);

						resFn({
							type: 'success',
							msg: '获取购物车页面数据成功',
							result: {
								loseGoodsList,
								loseGoodsTitle,
								loseGoodsText,
								commitBtnTemplateList,

								cartGoodsList,

								bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
								bottomDiscountsTitle: bottomDiscounts.title,
								bottomDiscountsTotalPrice: transNumFn(bottomDiscounts.total_price),
								bottomDiscountsList: assertArray(bottomDiscounts.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								}),
								bottomTotalPrice: transNumFn(bottomPrinf.total_price),
								bottomTotalNum: transNumFn(bottomPrinf.total_num)
							}
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},

		// 获取猜你喜欢 的 商品数据
		getLikeGoodsFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: `/api/Cart/likeGoods`
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(assertObject(result.data.data).like);

						let likeGoodsList = assertArray(resultObject.value).map(item => {
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
								selectedNum: transNumFn(item.selectedNum), // 已经添加到购物车的数量
								isSpec: item.is_guige == 1, // 商品是否多规格
								tagImg: item.topLeftTag, // 商品左上的图片标签
								gysMdId: transNumFn(item.supp_id), // 供应商门店id
								gysMdName: item.dp_name // 供应商门店名字
							};
						});

						resFn({
							type: 'success',
							msg: '获取猜你喜欢商品列表成功',
							result: {
								likeGoodsTitle: resultObject.name,
								likeGoodsList
							}
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},

		/* 
			@description 修改购物车数量 (只能加减不能删除)
			@param type <String> 'dec' 删除,  'inc' 增加
			@param type <Number> 设置商品数量
			@param cartId <Number> 购物车id
			@return <Promise>
		*/
		cartNumberChangeFn(type, cartId) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/Cart/cartNumber',
					data: {
						din: type,
						cart_id: cartId
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 40004) {
						// 错误状态  40004  前端提示删除
						resFn({
							type: 'success40004'
						});
					} else if (result.data.code == 40001) {
						// codeing
						// 错误状态  40001 当前商品失效了  前端需要改一下商品样式

						let resultObject = assertObject(result.data.data),
							resultResultObject = assertObject(resultObject.result),
							resultInfo = assertObject(resultResultObject.info),
							sellerItemInfoDispatch = assertObject(resultInfo.dispatch),
							sellerItemInfoDiscounts = assertObject(resultInfo.discounts),
							sellerItemInfoPrinf = assertObject(resultInfo.prinf);

						// ↓↓ 底部钱数和优惠信息
						let bottomTotalData = assertObject(resultResultObject.total),
							bottomDiscounts = assertObject(bottomTotalData.discounts),
							bottomPrinf = assertObject(bottomTotalData.prinf);

						resFn({
							type: 'success40001',
							msg: resultObject.msg,
							result: {
								dispatchTitle: sellerItemInfoDispatch.shosub,
								isShowToHomeBtn: sellerItemInfoDispatch.is_aoi == 1,

								sellerIsShowDiscounts: sellerItemInfoDiscounts.is_dis == 1,
								sellerDiscountsTitle: sellerItemInfoDiscounts.title,
								sellerDiscountsTotalPrice: transNumFn(sellerItemInfoDiscounts.total_price),
								sellerDiscountsList: assertArray(sellerItemInfoDiscounts.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								}),
								sellerTotalPrice: transNumFn(sellerItemInfoPrinf.total_price),
								sellerTotalNum: transNumFn(sellerItemInfoPrinf.total_num),

								bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
								bottomDiscountsTitle: bottomDiscounts.title,
								bottomDiscountsTotalPrice: transNumFn(bottomDiscounts.total_price),
								bottomDiscountsList: assertArray(bottomDiscounts.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								}),
								bottomTotalPrice: transNumFn(bottomPrinf.total_price),
								bottomTotalNum: transNumFn(bottomPrinf.total_num)
							}
						});
					} else if (result.data.code == 200) {
						let cartGoodsNumChangeResult = assertObject(result.data.data), // 全部数据
							// data.info
							dataInfoObject = assertObject(cartGoodsNumChangeResult.info),
							// data.result
							dataResultObject = assertObject(cartGoodsNumChangeResult.result),
							// data.result.info
							dataResultInfoObject = assertObject(dataResultObject.info),
							// data.result.info.discounts
							dataResultInfoDiscountsObject = assertObject(dataResultInfoObject.discounts),
							// data.result.info.dispatch
							dataResultInfoDispatchObject = assertObject(dataResultInfoObject.dispatch),
							// data.result.info.prinf
							dataResultInfoPrinfObject = assertObject(dataResultInfoObject.prinf),
							// data.result.total
							bottomTotalData = assertObject(dataResultObject.total),
							// data.result.total.discounts
							bottomDiscounts = assertObject(bottomTotalData.discounts),
							// data.result.total.prinf
							bottomPrinf = assertObject(bottomTotalData.prinf);

						resFn({
							type: 'success',
							msg: `${dataInfoObject.msg}`,
							result: {
								changeGoodsIsActive: dataInfoObject.is_active == 1, // 选中状态
								changeGoodsCartNum: transNumFn(dataInfoObject.cart_num), // 购物车数量
								changeGoodsAddBtnStopFlag: dataInfoObject.is_inc == 0, // 添加按钮是否置灰
								changeGoodsDiscountsMsg: dataInfoObject.promotion, // 活动明细

								sellerIsShowDiscounts: dataResultInfoDiscountsObject.is_dis == 1,
								sellerDiscountsTitle: dataResultInfoDiscountsObject.title,
								sellerDiscountsTotalPrice: transNumFn(dataResultInfoDiscountsObject.total_price),
								sellerDiscountsList: assertArray(dataResultInfoDiscountsObject.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								}),

								isShowToHomeBtn: dataResultInfoDispatchObject.is_aoi == 1,
								dispatchTitle: dataResultInfoDispatchObject.shosub,

								sellerTotalPrice: transNumFn(dataResultInfoPrinfObject.total_price),
								sellerTotalNum: transNumFn(dataResultInfoPrinfObject.total_num),

								bottomTotalPrice: transNumFn(bottomPrinf.total_price),
								bottomTotalNum: transNumFn(bottomPrinf.total_num),
								bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
								bottomDiscountsTitle: bottomDiscounts.title,
								bottomDiscountsTotalPrice: transNumFn(bottomDiscounts.total_price),
								bottomDiscountsList: assertArray(bottomDiscounts.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								})
							}
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},
		// 删除购物车商品
		delCartGoods(cartId) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					loading: true,
					method: 'post',
					url: '/api/Cart/cartDel',
					data: {
						cart_id: checkTypeFn(cartId) == 'Array' ? cartId.join(',') : cartId,
						is_lose: 0
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);

						let list = assertArray(resultObject.list).map(item => {
							let sellerItem = assertObject(item),
								sellerItemInfoDispatch = assertObject(sellerItem.dispatch),
								sellerItemInfoPrinf = assertObject(sellerItem.prinf),
								sellerItemInfoDiscounts = assertObject(sellerItem.discounts);

							return {
								suppId: item.supp_id,
								isEmpty: item.is_empty == 1,
								dispatchTitle: sellerItemInfoDispatch.shosub,
								isShowToHomeBtn: sellerItemInfoDispatch.is_aoi == 1,
								sellerTotalPrice: transNumFn(sellerItemInfoPrinf.total_price),
								sellerTotalNum: transNumFn(sellerItemInfoPrinf.total_num),

								sellerIsShowDiscounts: sellerItemInfoDiscounts.is_dis == 1,
								sellerDiscountsTitle: sellerItemInfoDiscounts.title,
								sellerDiscountsTotalPrice: transNumFn(sellerItemInfoDiscounts.total_price),
								sellerDiscountsList: assertArray(sellerItemInfoDiscounts.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								})
							};
						});

						let bottomTotalObject = assertObject(resultObject.total),
							bottomPrinf = assertObject(bottomTotalObject.prinf),
							bottomDiscounts = assertObject(bottomTotalObject.discounts);

						resFn({
							type: 'success',
							msg: result.data.msg,
							result: {
								list,
								bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
								bottomDiscountsTitle: bottomDiscounts.title,
								bottomDiscountsTotalPrice: transNumFn(bottomDiscounts.total_price),
								bottomDiscountsList: assertArray(bottomDiscounts.list).map(i => {
									return {
										name: i.name,
										price: transNumFn(i.price)
									};
								}),
								bottomTotalPrice: transNumFn(bottomPrinf.total_price),
								bottomTotalNum: transNumFn(bottomPrinf.total_num)
							}
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},
		// 改变选中状态
		changeGoodsActive(cartId, activeFlag) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/Cart/cartActive',
					data: {
						cart_ids: checkTypeFn(cartId) == 'Array' ? cartId.join(',') : cartId,
						cart_val: activeFlag ? 'ca' : 'nca'
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);
						resFn({
							type: 'success',
							msg: result.data.msg,
							result
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},

		// ↓↓↓ 页面交互处理的方法
		async loadFn() {
			let that = this;

			let getLikeGoodsResult = await that.getLikeGoodsFn();
			if (getLikeGoodsResult.type == 'success') {
				let { likeGoodsTitle, likeGoodsList } = getLikeGoodsResult.result;
				that.likeGoodsTitle = likeGoodsTitle;
				that.likeGoodsList = likeGoodsList;
			} else {
				uni.showToast({
					icon: 'none',
					title: getLikeGoodsResult.msg
				});
			}
			if (!that.isLogin) {
				that.isShowLoading = false;
			}
		},

		// 生命周期 show
		onShowFn() {
			let that = this;
			if (that.isLogin) {
				that.renderCartListFn();
			} else {
				// 未登录清空下清空那些只有登录才会有的数据字段
				that.commitBtnTemplateList = [];
				that.loseGoodsList = [];
				that.loseGoodsTitle = '';
				that.loseGoodsText = '';
				that.cartGoodsList = [];
				that.discountsModalTitle = '';
				that.discountsModalList = [];
				that.cardNumber = 0;
			}
			let indexAddressInfo = assertObject(uni.getStorageSync('indexAddressInfo'));
			if(indexAddressInfo.currentAddressText){
				that.currentAddressText = indexAddressInfo.currentAddressText;
			}

			that.isLogin && that.setLocalAddressFn();
			that.commitBtnState = false;
			uni.setStorageSync('orderZhifuLoadCont', 0);
			uni.setStorageSync('orderZhifuReloadFlag', 0);
		},

		// 渲染购物车列表相关数据
		async renderCartListFn() {
			let that = this;
			if (!that.isLogin) {
				return false;
			}
			let getMyCartDataResult = await that.getMyCartDataFn();
			// console.log('获取购物车列表数据 getMyCartDataResult ',getMyCartDataResult)
			if (getMyCartDataResult.type == 'success') {
				let {
					loseGoodsList,
					loseGoodsTitle,
					loseGoodsText,
					commitBtnTemplateList,

					cartGoodsList,

					bottomIsShowDiscounts,
					bottomDiscountsTitle,
					bottomDiscountsTotalPrice,
					bottomDiscountsList,
					bottomTotalPrice,
					bottomTotalNum
				} = getMyCartDataResult.result;

				that.loseGoodsList = loseGoodsList;
				that.loseGoodsTitle = loseGoodsTitle;
				that.loseGoodsText = loseGoodsText;
				that.commitBtnTemplateList = commitBtnTemplateList;

				that.cartGoodsList = cartGoodsList;

				that.bottomIsShowDiscounts = bottomIsShowDiscounts;
				that.bottomDiscountsTitle = bottomDiscountsTitle;
				that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
				that.bottomDiscountsList = bottomDiscountsList;
				that.bottomTotalPrice = bottomTotalPrice;
				that.bottomTotalNum = bottomTotalNum;
			} else {
				uni.showToast({
					icon: 'none',
					title: getMyCartDataResult.msg
				});
			}
			if (that.isShowLoading) {
				that.isShowLoading = false;
			}
			// ↓↓↓ 给tab-bar角标数字 赋值
			that.setTabBarCartNumFn();
			that.hideAllFn();
		},
		// 设置优惠信息弹框显示隐藏
		setDiscountsModalFlagFn(flag) {
			this.discountsModalFlag = flag;
		},
		// 底部的优惠信息点击
		bottomDiscountsClickFn() {
			let that = this;
			if (!that.bottomIsShowDiscounts) {
				return false;
			}
			that.discountsModalFlag = !that.discountsModalFlag;
			if (that.discountsModalFlag) {
				that.discountsModalTitle = that.bottomDiscountsTitle;
				that.discountsModalList = that.bottomDiscountsList;
			} else {
				that.discountsModalTitle = '';
				that.discountsModalList = [];
			}
		},
		/*
		// 单独门店的优惠信息点击 (方法没在用)
		sellerDiscountsClickFn(index) {
			let that = this;
			let { sellerDiscountsTitle, sellerDiscountsList } = that.cartGoodsList[index];
			that.discountsModalTitle = sellerDiscountsTitle;
			that.discountsModalList = sellerDiscountsList;
			if (!that.discountsModalFlag) {
				that.discountsModalFlag = true;
			}
		},
		*/
		// 购物车增加减去按钮点击
		async controlBtnClickFn(type, cartGoodsIndex, sellerGoodsIndex) {
			let that = this;

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

			if (that.sendAjaxFlag) {
				return false;
			}
			that.sendAjaxFlag = true;

			let changeSeller = that.cartGoodsList[cartGoodsIndex];
			let changeGoods = changeSeller.sellerCartGoodsList[sellerGoodsIndex];
			if ((type == dec && changeGoods.cartNum == 1) || (checkTypeFn(type) == 'Number' && type <= 0)) {
				uni.showModal({
					title: '您确定删除该商品吗？',
					success({ confirm }) {
						if (confirm) {
							console.log('执行删除操作');

							that.delCartGoodsFn(changeGoods.cartId);
						} else {
							console.log('取消');
						}
					}
				});
				that.sendAjaxFlag = false;
				return false;
			}
			that.hideAllFn();
			uni.showLoading({});

			let cartNumberChangeResult = await that.cartNumberChangeFn(type, changeGoods.cartId);
			console.log('cartNumberChangeResult', cartNumberChangeResult);

			if (cartNumberChangeResult.type == 'success') {
				let {
					changeGoodsIsActive,
					changeGoodsCartNum,
					changeGoodsAddBtnStopFlag,
					changeGoodsDiscountsMsg,

					sellerIsShowDiscounts,
					sellerDiscountsTitle,
					sellerDiscountsTotalPrice,
					sellerDiscountsList,

					isShowToHomeBtn,
					dispatchTitle,

					sellerTotalPrice,
					sellerTotalNum,

					bottomTotalPrice,
					bottomTotalNum,
					bottomIsShowDiscounts,
					bottomDiscountsTitle,
					bottomDiscountsTotalPrice,
					bottomDiscountsList
				} = cartNumberChangeResult.result;

				changeGoods.isActive = changeGoodsIsActive;
				changeGoods.cartNum = changeGoodsCartNum;
				changeGoods.addBtnStopFlag = changeGoodsAddBtnStopFlag;
				changeGoods.discountsMsg = changeGoodsDiscountsMsg;

				changeSeller.sellerIsShowDiscounts = sellerIsShowDiscounts;
				changeSeller.sellerDiscountsTitle = sellerDiscountsTitle;
				changeSeller.sellerDiscountsTotalPrice = sellerDiscountsTotalPrice;
				changeSeller.sellerDiscountsList = sellerDiscountsList;

				changeSeller.isShowToHomeBtn = isShowToHomeBtn;
				changeSeller.dispatchTitle = dispatchTitle;

				changeSeller.sellerTotalPrice = sellerTotalPrice;
				changeSeller.sellerTotalNum = sellerTotalNum;

				that.bottomTotalPrice = bottomTotalPrice;
				that.bottomTotalNum = bottomTotalNum;
				that.bottomIsShowDiscounts = bottomIsShowDiscounts;
				that.bottomDiscountsTitle = bottomDiscountsTitle;
				that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
				that.bottomDiscountsList = bottomDiscountsList;

				that.hideAllFn();
				if (cartNumberChangeResult.msg) {
					uni.showToast({
						icon: 'none',
						title: cartNumberChangeResult.msg
					});
				}
				uni.$emit('goodsAddCartEd', {
					goodsId: changeGoods.goodsId,
					selectedNum: changeGoodsCartNum
				});
				that.inputDomFlag = false;
				that.$nextTick(() => {
					that.inputDomFlag = true;
				});

				// ↓↓↓ 给tab-bar角标数字 赋值
				that.setTabBarCartNumFn();
			} else if (cartNumberChangeResult.type == 'success40004') {
				that.hideAllFn();

				uni.showModal({
					title: '您确定删除该商品吗？',
					success({ confirm }) {
						if (confirm) {
							console.log('执行删除操作');
							that.delCartGoodsFn(changeGoods.cartId);
						} else {
							changeGoods.cartNum = 1;
							console.log('取消');
						}
					}
				});
			} else if (cartNumberChangeResult.type == 'success40001') {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: cartNumberChangeResult.msg
				});

				let {
					dispatchTitle,
					isShowToHomeBtn,

					sellerIsShowDiscounts,
					sellerDiscountsTitle,
					sellerDiscountsTotalPrice,
					sellerDiscountsList,

					sellerTotalPrice,
					sellerTotalNum,

					bottomIsShowDiscounts,
					bottomDiscountsTitle,
					bottomDiscountsTotalPrice,
					bottomDiscountsList,

					bottomTotalPrice,
					bottomTotalNum
				} = cartNumberChangeResult.result;

				// 更新商品失效样式
				changeGoods.isInvalid = true;

				// 更新当前门店信息
				changeSeller.dispatchTitle = dispatchTitle;
				changeSeller.isShowToHomeBtn = isShowToHomeBtn;

				changeSeller.sellerIsShowDiscounts = sellerIsShowDiscounts;
				changeSeller.sellerDiscountsTitle = sellerDiscountsTitle;
				changeSeller.sellerDiscountsTotalPrice = sellerDiscountsTotalPrice;
				changeSeller.sellerDiscountsList = sellerDiscountsList;

				changeSeller.sellerTotalPrice = sellerTotalPrice;
				changeSeller.sellerTotalNum = sellerTotalNum;

				// 更新购物车底部信息
				that.bottomIsShowDiscounts = bottomIsShowDiscounts;
				that.bottomDiscountsTitle = bottomDiscountsTitle;
				that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
				that.bottomDiscountsList = bottomDiscountsList;

				that.bottomTotalPrice = bottomTotalPrice;
				that.bottomTotalNum = bottomTotalNum;
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: cartNumberChangeResult.msg
				});
			}

			that.sendAjaxFlag = false;

			console.log('cartNumberChangeResult', cartNumberChangeResult);
		},
		// 删除已加购的购物车商品
		async delCartGoodsFn(cartId) {
			let that = this;
			let delCartGoodsResult = await that.delCartGoods(cartId);
			console.log('that.delCartGoods(cartId) delCartGoodsResult', delCartGoodsResult);
			if (delCartGoodsResult.type == 'success') {
				let {
					list,
					bottomIsShowDiscounts,
					bottomDiscountsTitle,
					bottomDiscountsTotalPrice,
					bottomDiscountsList,
					bottomTotalPrice,
					bottomTotalNum
				} = delCartGoodsResult.result;

				// 删除成功后把删除的商品加购数量更新到底部的猜你喜欢商品列表
				let zeroCartIdList = checkTypeFn(cartId) == 'Array' ? cartId : [cartId];
				let zeroGoodsIdList = [];

				let cloneCartGoodsList = cloneFn(that.cartGoodsList);

				// 改变数据前先把购物车id对应的商品idpush到zeroGoodsIdList里
				cloneCartGoodsList.forEach(i => {
					i.sellerCartGoodsList.forEach(j => {
						if (zeroCartIdList.includes(j.cartId)) {
							zeroGoodsIdList.push(j.goodsId);
						}
					});
				});

				cloneCartGoodsList.forEach((cartGoodsItem, cartGoodsIndex) => {
					list.forEach((item, index) => {
						if (item.suppId == cartGoodsItem.sellerId) {
							if (item.isEmpty) {
								cartGoodsItem.sellerCartGoodsList = [];
							} else {
								if (checkTypeFn(cartId) == 'Array') {
									let cloneSellerCartGoodsList = cloneFn(cartGoodsItem.sellerCartGoodsList);

									cloneSellerCartGoodsList.forEach(i => (i.del = cartId.includes(i.cartId)));
									let sellerCartGoodsList = cloneSellerCartGoodsList.filter(i => !i.del);
									sellerCartGoodsList.forEach(i => delete i.del);
									cartGoodsItem.sellerCartGoodsList = sellerCartGoodsList;
								} else {
									let index = cartGoodsItem.sellerCartGoodsList.findIndex(i => i.cartId == cartId);
									cartGoodsItem.sellerCartGoodsList.splice(index, 1);
								}
							}
							cartGoodsItem.dispatchTitle = item.dispatchTitle;
							cartGoodsItem.isShowToHomeBtn = item.isShowToHomeBtn;
							cartGoodsItem.sellerTotalPrice = item.sellerTotalPrice;
							cartGoodsItem.sellerTotalNum = item.sellerTotalNum;
							cartGoodsItem.sellerIsShowDiscounts = item.sellerIsShowDiscounts;
							cartGoodsItem.sellerDiscountsTitle = item.sellerDiscountsTitle;
							cartGoodsItem.sellerDiscountsTotalPrice = item.sellerDiscountsTotalPrice;
							cartGoodsItem.sellerDiscountsList = item.sellerDiscountsList;
						}
					});
				});

				that.cartGoodsList = cloneCartGoodsList;

				that.bottomIsShowDiscounts = bottomIsShowDiscounts;
				that.bottomDiscountsTitle = bottomDiscountsTitle;
				that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
				that.bottomDiscountsList = bottomDiscountsList;
				that.bottomTotalPrice = bottomTotalPrice;
				that.bottomTotalNum = bottomTotalNum;

				zeroGoodsIdList.map(i => uni.$emit('goodsAddCartEd', { goodsId: i, selectedNum: 0 }));
				// ↓↓↓ 给tab-bar角标数字 赋值
				that.setTabBarCartNumFn();
			} else {
				uni.showToast({
					icon: 'none',
					title: delCartGoodsResult.msg
				});
			}
		},
		// 输入框blur事件后
		setNumInpFn(e, cartGoodsIndex, sellerGoodsIndex) {
			let that = this;
			// 未绑定手机号不能操作以下功能
			if (!that.isRunBindMobileFunc) {
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						that.inputDomFlag = false;
						if (e.confirm) {
							that.navigateToFn({ url: `/packageA/tel-login/user-info` });
						} else {
							that.$nextTick(() => {
								that.inputDomFlag = true;
							});
						}
					}
				});
				return false;
			}

			let changeSeller = that.cartGoodsList[cartGoodsIndex];
			let changeGoods = changeSeller.sellerCartGoodsList[sellerGoodsIndex];

			let setCartNum = assertNumber(transNumFn(e.detail.value)); // 输入的数值
			if (setCartNum <= 0) {
				uni.showModal({
					title: '您确定删除该商品吗？',
					success({ confirm }) {
						if (confirm) {
							console.log('执行删除操作');
							that.delCartGoodsFn(changeGoods.cartId);
						} else {
							console.log('取消');
							that.inputDomFlag = false;
							that.$nextTick(() => {
								that.inputDomFlag = true;
							});
						}
					}
				});

				return false;
			}
			that.controlBtnClickFn(setCartNum, cartGoodsIndex, sellerGoodsIndex);
		},
		// 删除选中状态的商品
		delSelectGoods() {
			let that = this;
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

			let cartIdList = [];
			that.cartGoodsList.forEach(i => {
				let cartIdArr = i.sellerCartGoodsList.filter(i => i.isActive).map(i => i.cartId);
				cartIdList = cartIdList.concat(cartIdArr);
			});
			if (cartIdList.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '您尚未选中的商品'
				});
				return false;
			}

			uni.showModal({
				title: '您是否要删除已选中的商品',
				success({ confirm }) {
					if (confirm) {
						console.log('要删除的商品 cartIdList', cartIdList);
						that.delCartGoodsFn(cartIdList);
					} else {
						console.log('取消');
					}
				}
			});
		},
		// 提示的气泡被点击
		bubbleTipsClickFn(cartGoodsIndex, sellerGoodsIndex) {
			let that = this;
			that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList[sellerGoodsIndex].isShowBubbleTips = false;
			console.log(
				'isShowBubbleTips',
				that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList[sellerGoodsIndex].isShowBubbleTips
			);
		},

		// 根据id跳转到门店页面
		toSellerFn(id) {
			let that = this;
			let idNum = transNumFn(id);
			if (!that.gongyingshang || idNum <= 0) {
				that.navigateToFn({
					isTab: true,
					url: '/pages/index/index'
				});
				return false;
			}

			that.navigateToFn({
				url: `/packageA/gongyingshang-seller/gongyingshang-seller?gysMdId=${idNum}`
			});
		},
		// 根据商品类型和id跳转到对应的商品详情页面
		toGoodsDetailPageFn(isInvalid, goodsType, id) {
			if (isInvalid) {
				return false;
			}
			let pagePath = goodsType
				? '/packageB/goods-detail/goods-detail-seckill'
				: '/packageB/goods-detail/goods-detail';
			this.navigateToFn({
				url: `${pagePath}?goods_id=${id}`
			});
		},
		// 成功清空失效商品
		clearInvalidGoodsFn() {
			this.loseGoodsList = [];
		},
		// 底部的商品添加购物车后更新上面的购物车列表
		emitGetCartListFn() {
			this.renderCartListFn();
		},
		// 单个商品切换选中状态
		async goodsActiveIconClickFn(cartGoodsIndex, sellerGoodsIndex) {
			let that = this;
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

			let goods = that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList[sellerGoodsIndex];
			if (goods.isInvalid) {
				return false;
			}
			if (that.sendAjaxFlag) {
				return false;
			}
			that.sendAjaxFlag = true;

			that.hideAllFn();
			uni.showLoading();

			let changeGoodsActiveResult = await that.changeGoodsActive(goods.cartId, !goods.isActive);
			if (changeGoodsActiveResult.type == 'success') {
				that.renderCartListFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: changeGoodsActiveResult.msg
				});
			}
			that.sendAjaxFlag = false;
		},
		// 单个店铺切换选中状态
		async sellerActiveIconClickFn(cartGoodsIndex) {
			let that = this;

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

			if (that.sendAjaxFlag) {
				return false;
			}
			that.sendAjaxFlag = true;

			that.hideAllFn();
			uni.showLoading();
			let sellerGoodsList = that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList;

			let isActive, cartIdList;
			if (sellerGoodsList.some(i => i.isInvalid)) {
				isActive = true;
				cartIdList = sellerGoodsList.filter(i => !i.isInvalid).map(i => i.cartId);
			} else {
				isActive = !sellerGoodsList.every(i => i.isActive);
				cartIdList = sellerGoodsList.map(i => i.cartId);
			}

			let changeGoodsActiveResult = await that.changeGoodsActive(cartIdList, isActive);
			if (changeGoodsActiveResult.type == 'success') {
				that.renderCartListFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: changeGoodsActiveResult.msg
				});
			}
			that.sendAjaxFlag = false;
		},
		//点击全选按钮
		async allSelectFn() {
			let that = this;

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

			if (that.sendAjaxFlag) {
				return false;
			}
			that.sendAjaxFlag = true;

			if (that.calcCartIsEmpty) {
				return false;
			}

			let isActive,
				isHasInvalid = false,
				cartIdList;

			that.cartGoodsList.forEach(i => {
				i.sellerCartGoodsList.forEach(j => {
					if (j.isInvalid) {
						isHasInvalid = true;
					}
				});
			});

			if (isHasInvalid) {
				isActive = true;
				cartIdList = (() => {
					let temCartIdList = [];
					that.cartGoodsList.forEach(i => {
						i.sellerCartGoodsList.forEach(j => {
							if (!j.isInvalid) {
								temCartIdList.push(j.cartId);
							}
						});
					});
					return temCartIdList;
				})();
			} else {
				isActive = !that.allSelectBtnActiveStatus;
				cartIdList = (() => {
					let temCartIdList = [];

					that.cartGoodsList.forEach(i => {
						i.sellerCartGoodsList.forEach(j => {
							temCartIdList.push(j.cartId);
						});
					});
					return temCartIdList;
				})();
			}

			console.log('cartIdList, isActive', cartIdList, isActive);

			that.hideAllFn();
			uni.showLoading();

			let changeGoodsActiveResult = await that.changeGoodsActive(cartIdList, isActive);
			if (changeGoodsActiveResult.type == 'success') {
				that.renderCartListFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: changeGoodsActiveResult.msg
				});
			}
			that.sendAjaxFlag = false;
		},
		// 单店结算按钮
		async paySellerBtnClickFn(cartGoodsItem) {
			let that = this;
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
			// #ifdef MP-WEIXIN
			if (that.commitBtnTemplateList.length) {
				let temIdRes = await that.requestSubscribeMessageFn(that.commitBtnTemplateList);
			}
			// #endif
			that.navigateToFn({
				url: `/pages/order/submit-order?storeType=${cartGoodsItem.sellerId}`
			});
		},
		// 选择好商品后去结算
		async toPayFn() {
			let that = this;
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
			
			// #ifdef MP-WEIXIN
			if (that.commitBtnTemplateList.length) {
				let temIdRes = await that.requestSubscribeMessageFn(that.commitBtnTemplateList);
			}
			// #endif

			if (that.gongyingshang) {
				that.navigateToFn({
					url: `/pages/order/submit-order?storeType=all`
				});
			} else {
				that.navigateToFn({
					url: `/pages/order/submit-order`
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
		// 获取当前位置信息赋值到 storage 里 结算页面的多自提点需要这个位置信息
		// 给页面顶部设置地址
		async setPageAddressFn(latitude, longitude) {
			let that = this;
			let addressTextResult = await that.getCurrentAddressInfo({
				latitude,
				longitude
			});
			console.log('getCurrentAddressInfo addressTextResult', addressTextResult);
			if(addressTextResult.type == 'success'){
				that.currentAddressText = addressTextResult.result.address
			}
		},
		async setLocalAddressFn() {
			let that = this;
			// #ifdef MP-WEIXIN || MP-TOUTIAO
			let userLocationInfo = await that.settingInfoFn('scope.userLocation'); // 用户授权位置信息
			console.log('用户授权位置信息 userLocationInfo', userLocationInfo);

			if (userLocationInfo.type == 'success') {
				if (userLocationInfo.isFirst) {
					let locationInfo = await that.getLocationInfoFn();
					console.log('locationInfo 获取位置 -aa', locationInfo);

					if (locationInfo.type == 'error') {
						that.navigateToFn({
							url: `/packageA/set-address-page/index?page=cart`
						});
					} else {
						uni.setStorageSync('cartAddress', {
							latitude: locationInfo.result.latitude,
							longitude: locationInfo.result.longitude
						});
						!that.currentAddressText && that.setPageAddressFn(locationInfo.result.latitude,locationInfo.result.longitude);
					}

					return false;
				} else {
					if (userLocationInfo.isOk) {
						let locationInfo = await that.getLocationInfoFn();
						console.log('locationInfo 获取位置 -bb', locationInfo);

						if (locationInfo.type == 'success') {
							uni.setStorageSync('cartAddress', {
								latitude: locationInfo.result.latitude,
								longitude: locationInfo.result.longitude
							});
							!that.currentAddressText && that.setPageAddressFn(locationInfo.result.latitude,locationInfo.result.longitude);
						} else {
							that.navigateToFn({
								url: `/packageA/set-address-page/index?page=cart`
							});
							return false;
						}
					} else {
						that.navigateToFn({
							url: `/packageA/set-address-page/index?page=cart`
						});
						return false;
					}
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: userLocationInfo.msg
				});
				return false;
			}
			// #endif

			// #ifdef APP-PLUS

			let locationInfo = await that.getLocationInfoFn();
			console.log('locationInfo 获取位置', locationInfo);
			if (locationInfo.type == 'success') {
				uni.setStorageSync('cartAddress', {
					latitude: locationInfo.result.latitude,
					longitude: locationInfo.result.longitude
				});
				!that.currentAddressText && that.setPageAddressFn(locationInfo.result.latitude,locationInfo.result.longitude);
			} else {
				let indexAddressInfo = assertObject(uni.getStorageSync('indexAddressInfo'));
				uni.setStorageSync('cartAddress', {
					latitude: indexAddressInfo.latitude,
					longitude: indexAddressInfo.longitude
				});
			}
			// #endif

			// #ifdef H5
			let locationInfo = await that.getLocationInfoFn();
			console.log('locationInfo 获取位置', locationInfo);
			if (locationInfo.type == success) {
				uni.setStorageSync('cartAddress', {
					latitude: locationInfo.result.latitude,
					longitude: locationInfo.result.longitude
				});
				!that.currentAddressText && that.setPageAddressFn(locationInfo.result.latitude,locationInfo.result.longitude);
				return false;
			}
			uni.showModal({
				showCancel: false, //不显示取消按钮
				title: '获取定位失败',
				success(e) {
					//确认后的回调
					that.toBackFn();
				}
			});
			// #endif
		},
	}, // ↑↑↑↑↑ methods 结束
	computed: {
		// tab-bar的选中项
		tabCurrent() {
			for (let i = 0; i < this.MenuList.length; i++) {
				if (this.MenuList[i].field == 'g') {
					return i;
				}
			}
			return 0;
		},
		// 当前状态是否空购物车
		calcCartIsEmpty() {
			let that = this;
			if (that.isLogin) {
				let goodsCont = 0;
				that.cartGoodsList.forEach(i => {
					goodsCont += i.sellerCartGoodsList.length;
				});
				if (goodsCont >= 1) {
					return false;
				}
			}
			return true;
		},
		// 当前门店的商品是否全部选中
		calcSellerIsActive() {
			return cartGoodsItem => {
				if (cartGoodsItem.sellerCartGoodsList.some(i => i.isInvalid)) {
					return false;
				} else {
					return cartGoodsItem.sellerCartGoodsList.every(i => i.isActive);
				}
			};
		},
		// 当前门店是否有选中的商品
		calcSellerHasActive() {
			return i => i.sellerCartGoodsList.some(o => o.isActive);
		},
		// 底部的全选按钮状态
		allSelectBtnActiveStatus() {
			if (this.calcCartIsEmpty) {
				return false;
			}
			let active = 0,
				notActive = 0,
				len = 0,
				isInvalid = false;

			this.cartGoodsList.forEach(i => {
				len += i.sellerCartGoodsList.length;
				i.sellerCartGoodsList.forEach(j => {
					if (j.isInvalid) {
						isInvalid = true;
					}
					if (j.isActive) {
						active += 1;
					} else {
						notActive += 1;
					}
				});
			});
			if (isInvalid) {
				return false;
			}

			if (active == len) {
				return true;
			}
			return false;
		}
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	min-height: 100vh;
	background: $bg-grey-color;
}

.user-address {
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;

		> text {
			padding: 0 20rpx;
			line-height: 80rpx;
			font-size: 26rpx;
			color: $grey1-color;
		}
	}

	.address-box {
		display: flex;
		align-items: center;
		height: 88rpx;

		image {
			margin-left: 5rpx;
			margin-right: 24rpx;
			width: 38rpx;
			height: 46rpx;
		}

		text {
			display: inline-block;
			min-width: 50vw;
			max-width: 60vw;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: $grey1-color;
			font-size: 30rpx;
			font-weight: 600;
		}
	}
}

.go-home-block {
	position: relative;
	width: 750rpx;
	height: 452rpx;

	.bg-null-cart {
		width: 750rpx;
		height: 452rpx;
		position: absolute;
		z-index: 5;
	}

	text {
		display: block;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 260rpx;
		z-index: 10;
		font-size: 36rpx;
		color: $grey1-color;
		font-weight: 600;
	}

	.navigator {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 45rpx;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 160rpx;
		height: 66rpx;
		color: #ffffff;
		font-size: 28rpx;
		border-radius: 10000rpx;
	}
}

.like-goods-list-bar {
	line-height: 88rpx;
	text-align: center;
	font-size: 30rpx;
	font-weight: 600;
	color: $grey1-color;
	background: $bg-grey-color;
	.bar-title {
		display: inline-block;
		position: relative;
		padding: 0 20rpx;
		.before-dom,
		.after-dom {
			position: absolute;
			top: 50%;
		}
		.icon-O {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 7rpx;
			height: 7rpx;
			background: $grey1-color;
			border-radius: 50%;
		}
		.icon-I {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 50rpx;
			height: 2rpx;
		}

		.before-dom {
			left: 0;
			transform: translateY(-50%) translateX(-100%);
			.icon-I {
				right: 0;
				background: linear-gradient(90deg, rgba(0, 0, 0, 0), $grey1-color);
			}
			.icon-O {
				right: 0;
			}
		}
		.after-dom {
			right: 0;
			transform: translateY(-50%) translateX(100%);
			.icon-I {
				left: 0;
				background: linear-gradient(-90deg, rgba(0, 0, 0, 0), $grey1-color);
			}
			.icon-O {
				left: 0;
			}
		}
	}
}
.bottom-shop-list {
	background: $bg-grey-color;
	font-size: 0;

	.list-goods-item-div {
		display: inline-block;
		margin-right: 19rpx;
		margin-bottom: 20rpx;

		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}

.order-btn-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	z-index: 500;
	bottom: 96rpx;
	/* #ifdef H5 */
	bottom: 50px;
	/* #endif */
	padding: 0 24rpx;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	box-shadow: 0px 0px 6rpx #d8d8d8;

	.isAll-btn {
		display: flex;
		align-items: center;
		font-size: 22rpx;
		color: $grey1-color;

		height: 100%;
		padding: 0 20rpx;

		.text {
			margin-left: 0.3em;
		}
	}

	.price-all {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 78rpx;
		font-size: 23rpx;
		color: $grey2-color;
		&.show-bottom-discounts {
			justify-content: center;
		}

		.top-price-title {
			display: flex;
			align-items: center;
			.bottom-price-text {
			}
			.bar-price-block {
				display: flex;
				align-items: baseline;
				padding-left: 0.4em;

				.price-icon {
					font-weight: bold;
					font-size: 18rpx;
				}
				.price-text {
					font-weight: bold;
					font-size: 28rpx;
				}
			}
		}
		.bottom-discounts {
			display: flex;
			.discounts-total-price {
			}
			.discounts-info {
				display: flex;
				align-items: center;
				padding-left: 0.4em;
				.discounts-title {
				}
				.discounts-icon {
					display: inline-block;
					height: 24rpx;
				}
			}
		}
	}

	.order-btn {
		@include btn-green;
		@include flex-center;
		width: 240rpx;
		height: 88rpx;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
}
.cart-content-block {
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	.seller-item-cart {
		margin-top: 20rpx;
		padding: 20rpx 0;
		background: #ffffff;
		border-radius: 30rpx;
		&:first-child {
			margin-top: 0;
		}
		.seller-name-block {
			display: flex;
			justify-content: flex-end;
			position: relative;
			height: 76rpx;

			&.show-dispatch-info {
				height: 100rpx;
				.bottom-dispatch-info {
				}
			}
			&.not-gongyingshang {
				display: none;
				&.show-dispatch-info {
					display: flex;
					height: 60rpx;
				}
			}

			padding-bottom: 20rpx;
			&::after {
				content: '';
				display: block;
				position: absolute;
				z-index: 10;
				bottom: 0;
				left: 20rpx;
				right: 20rpx;
				height: 1px;
				background: #f1f1f1;
			}

			.is-select {
				width: 76rpx;
			}
			.seller-name-content {
				display: flex;
				flex-direction: column;
				// width: 602rpx;
				width: 626rpx;
				&.not-gongyingshang {
					width: 100%;
				}

				.top-seller-info {
					flex: 1;
					display: flex;
					align-items: center;
					.seller-image {
						margin-right: 8rpx;
						width: 30rpx;
						height: 30rpx;
						border-radius: 10rpx;
						overflow: hidden;
					}
					.seller-text {
						max-width: 524rpx;
						font-size: 26rpx;
						font-weight: bold;
					}
				}
				.bottom-dispatch-info {
					flex: 1;
					display: none;
					&.show-dispatch-info {
						display: flex;
					}
					justify-content: space-between;
					align-items: center;
					font-size: 22rpx;
					.dispatch-title-time {
						display: flex;
						align-items: center;
						&.not-gongyingshang {
							padding-left: 20rpx;
						}

						.dispatch-title {
						}
						.dispatch-shu-dom {
							margin: 0 8rpx;
							width: 1px;
							height: 22rpx;
							background: #bdbdbd;
						}

						.dispatch-time {
							position: relative;
							color: #000000;
						}
					}
					.to-home-btn {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	.seller-goods-list {
		.seller-goods-item {
			position: relative;
			padding: 20rpx 0;
			height: 220rpx;
			&.has-discounts {
				// height: 298rpx;
				height: 290rpx;
			}
			&::after {
				content: '';
				display: block;
				position: absolute;
				z-index: 10;
				bottom: 0;
				left: 20rpx;
				right: 20rpx;
				height: 1px;
				background: #f1f1f1;
			}
			&:last-child::after {
				display: none;
			}

			.top-goods-info {
				display: flex;

				.is-select-block {
					width: 76rpx;
					height: 180rpx;
					.goods-state-text {
						padding: 0 10rpx;
						background: #929398;
						font-size: 20rpx;
						color: #ffffff;
						line-height: 36rpx;
						text-align: center;
					}
				}
				.goods-image-wrap-block {
					position: relative;
					width: 180rpx;
					height: 180rpx;
					border-radius: 14rpx;
					overflow: hidden;
					&.invalid {
						filter: grayscale(30%);
					}
					.tag-img-wrap {
						position: absolute;
						z-index: 15;
						top: 10rpx;
						left: 10rpx;
						width: 54rpx;
						height: 54rpx;
					}
				}
				.goods-info-block {
					position: relative;
					padding: 0 24rpx 0 20rpx;
					width: 446rpx;
					height: 180rpx;
					&.invalid {
						filter: grayscale(30%);
					}

					.goods-name {
						width: 402rpx;
						height: 46rpx;
						line-height: 46rpx;
						font-size: 30rpx;
						color: #374050;
						font-weight: bold;
					}
					.goods-description_spec-key-block {
						display: flex;
						align-items: center;
						width: 402rpx;
						height: 36rpx;
						.goods-description-text,
						.goods-spec-key-name-text {
							width: 402rpx;
							font-size: 26rpx;
							color: #91939c;
						}
					}

					.goods-tag-block {
						width: 402rpx;
						height: 52rpx;
						overflow: hidden;

						.goods-tag-wrap {
							padding-top: 10rpx;
							width: 402rpx;
							height: 72rpx;
							white-space: nowrap;
							overflow-y: hidden;
							font-size: 0;
							.goods-tag {
								display: inline-block;
								margin-right: 10rpx;
								padding: 0rpx 10rpx;
								white-space: nowrap;
								color: #ff6128;
								line-height: 32rpx;
								font-size: 18rpx;
								border-radius: 8rpx;
								border: 1px solid #ff6128;
								&:last-child {
									margin-right: 0;
								}
							}
						}
					}

					.bottom-price-block {
						display: flex;
						align-items: center;
						height: 42rpx;
						.price-block {
							display: flex;
							flex-wrap: nowrap;
							align-items: baseline;
							padding: 0 10rpx 0 0;
							height: 40rpx;
							color: #eb3c39;
							font-weight: bold;

							.price-icon {
								display: inline-block;
								margin-right: 2rpx;
								line-height: 40rpx;
								font-size: 18rpx;
							}

							.price-text {
								flex: 1;
								display: inline-block;
								line-height: 40rpx;
								font-size: 28rpx;
								text-overflow: ellipsis;
								white-space: nowrap;
								overflow: hidden;
							}
						}
					}

					.control-block {
						display: flex;
						justify-content: space-between;
						align-items: center;
						position: absolute;
						right: 24rpx;
						bottom: 0;
						width: 160rpx;
						height: 54rpx;

						.input-dom {
							display: flex;
							margin: 0 10rpx;
							text-align: center;
							font-size: 26rpx;
							color: $grey1-color;
						}

						.control-btn-block {
							width: 54rpx;
						}

						.bubble-tips {
							position: absolute;
							z-index: 20;
							left: 50%;
							transform: translateX(-50%) translateY(100%);
							background: #374050;
							white-space: nowrap;
							bottom: 0;
							&::after {
								content: '';
								display: block;
								position: absolute;
								left: 50%;
								top: 2px;
								transform: translateX(-50%) translateY(-100%);
								border: 14rpx solid transparent;
								border-bottom: 14rpx solid #374050;
							}
							.tips-text {
								color: #ffffff;
								font-size: 20rpx;
								padding: 4rpx 12rpx;
								white-space: nowrap;
							}
						}
					}
				}
			}
			.bottom-goods-discounts-block {
				position: relative;
				padding: 0 76rpx;
				height: 78rpx;
				.view-after-dom {
					position: absolute;
					z-index: 10;
					top: 0;
					left: 156rpx;
					width: 20rpx;
					height: 20rpx;
					transform: rotate(45deg);
					border: 1px solid;
					background: #ffffff;
					border-right: none;
					border-bottom: none;
					border-radius: 5rpx 0 0 0;
				}
				.discounts-tips {
					display: flex;
					align-items: center;
					position: absolute;
					top: 10rpx;
					padding: 0 16rpx;
					width: 550rpx;
					height: 58rpx;
					border-radius: 14rpx;
					border: 1px solid;
					background: #ffffff;
					.discounts-tips-icon {
						margin-right: 8rpx;
						font-size: 20rpx;
						color: #ff6128;
						background: rgba(255, 97, 40, 0.18);
						border-radius: 8rpx;
						width: 50rpx;
						text-align: center;
					}
					.discounts-tips-text {
						width: 460rpx;
						font-size: 22rpx;
						color: #374050;
					}
				}
			}
		}

		.seller-item-commit-btn-block {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 0;
			padding-top: 20rpx;
			&.seller-discounts {
				justify-content: space-between;
			}
			/*
			.seller-discounts-info {
				font-size: 23rpx;
				color: #91939c;
				.discounts-total-price {
				}
				.discounts-info {
					display: flex;
					align-items: center;
					.discounts-title {
					}
					.discounts-icon {
					}
				}
			}
			*/

			.seller-commit-btn {
				display: inline-flex;
				align-items: center;
				height: 70rpx;
				background: #fef6df;
				overflow: hidden;
				color: #000000;
				font-weight: bold;
				.left-price-block {
					display: flex;
					align-items: baseline;
					padding-right: 20rpx;
					.price-icon {
						display: inline-block;
						padding-left: 20rpx;
						font-size: 20rpx;
					}
					.price-num {
						display: inline-block;
						font-size: 34rpx;
					}
				}
				.right-text-block {
					display: inline-flex;
					align-items: center;
					height: 100%;
					padding: 0 20rpx;
					font-size: 28rpx;
				}
			}
		}
	}
}
</style>
