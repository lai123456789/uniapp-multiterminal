<!-- 
	订单详情页面
 -->
<template>
	<view class="page">
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 订单状态 -->
		<view class="cancel-block">
			<view class="content-wrap">
				<view class="cancel-content border-radius20">
					<view class="before" :style="{ background: configInfo.web_site_color }"></view>
					<view class="h3-block">
						<view class="h3-1">{{ orderInfoStatus }}</view>
						<view class="h3-2" v-if="showTime == '0:0' && orderInfoStatus == '待支付'">订单已过期</view>
						<view class="h3-2" v-if="orderInfoStatus == '待支付' && showTime != '0:0'">
							剩余支付时间 {{ showTime }}
						</view>
					</view>
					<view class="h4">
						<view
							class="btn-buy border-radius20"
							@click="cancelFn"
							v-if="orderInfoStatus == '待支付' && (type == 'dzf' || type == 'all')"
						>
							取消订单
						</view>
						<!--
							确认支付按钮-不是新版购物车接口下单
						-->
						<view
							class="btn-buy border-radius20"
							@click="$onceClick(payFn)"
							v-if="orderInfoStatus == '待支付' && !orderIsSelectPaymentType"
						>
							确认支付
						</view>

						<!--
							确认支付按钮-是新版购物车接口下单
						-->
						<view
							class="btn-buy border-radius20"
							@click="setPaymentTypeModalIsShow(true)"
							v-if="orderInfoStatus == '待支付' && orderIsSelectPaymentType"
						>
							确认支付
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 展示用户地址组件 -->
		<user-address
			:is-show-address="isShowAddress"
			:address-is-set="true"
			:address-user-name="orderInfoUserName"
			:address-user-tel="orderInfoUserPhone"
			:address-text="orderInfoAddress"
			:address-tag-name="orderInfoUserTag"
			page="dingdan-state"
		></user-address>

		<!-- 多点自提信息 -->
		<zitidian-show
			v-if="orderInfoPostType == peiTypeEnumObj[peiTypeDuozitidian]"
			:zitidian-info="zitidianInfo"
			page="pages/order-state/dingdan-state"
		></zitidian-show>

		<!-- 商家自提信息 -->
		<zitidian-show-seller
			v-if="orderInfoPostType == peiTypeEnumObj[peiTypeZiti]"
			:seller-image="showAddressInfo.sellerImage"
			:seller-name="showAddressInfo.sellerName"
			:seller-tel="showAddressInfo.sellerTel"
			:seller-open-time="showAddressInfo.sellerOpenTime"
			:seller-address="showAddressInfo.sellerAddress"
		></zitidian-show-seller>

		<!-- 订单的商品信息 -->
		<view class="goods-list-block">
			<view class="content-wrap">
				<view class="goods-content">
					<view class="title">
						<view class="h3">购物清单</view>
						<view class="h4" v-if="orderInfoPayType == 0">
							<!-- 预计送达时间 -->
							预计送达时间 {{ orderInfoPeisongTime }}
						</view>
					</view>
					<view class="goods-list">
						<block v-for="(item, index) in goodsList" :key="index">
							<view class="item">
								<view class="top-goods-info">
									<view class="image-block"><image :src="item.original_img" mode=""></image></view>
									<view class="goods-description-block">
										<view class="goods-name">
											<view class="name-block">{{ item.goods_name }}</view>
										</view>
										<view class="goods-description-box">
											<view class="goods-description">
												{{ item.spec_name ? item.spec_name : item.goods_remark }}
											</view>
										</view>
										<view class="tag-list" v-if="trimFn(item.tag_name)">
											<view class="tag-block">{{ item.tag_name }}</view>
										</view>
									</view>

									<!-- 右边的价格 和 购买数量 -->
									<view class="right-price-num">
										<view class="price-block" v-if="orderInfoPayType == '积分兑换'">
											{{ item.single_price }}积分
										</view>
										<view class="price-block" v-else>¥ {{ item.single_price }}</view>

										<view class="num">× {{ item.buy_num }}</view>
										<text
											class="text"
											v-if="item.tui_bh"
											@click="toShouhou(item.tui_bh)"
											:style="{ color: configInfo.web_site_color }"
										>
											售后详情
										</text>
									</view>
								</view>

								<view
									v-if="item.czDiffDesc || item.htDiffDesc"
									class="bottom-diff-price-tips"
									:style="{ color: configInfo.web_site_color }"
									@click="navigateToFn({ url: '/packageA/kefu/kefu' })"
								>
									<view style="display: inline-block;">
										<uni-icons
											type="help"
											style="font-weight: 100;"
											:color="configInfo.web_site_color"
											size="14"
										></uni-icons>
									</view>
									{{ item.czDiffDesc ? item.czDiffDesc : '' }}
									{{ item.czDiffDesc && item.htDiffDesc ? '、' : '' }}
									{{ item.htDiffDesc ? item.htDiffDesc : '' }}
								</view>
							</view>
						</block>
					</view>

					<view class="xiaofei">
						<view class="peisong" v-for="(item, keys, index) in orderInfoSaleObj" :key="index">
							<view class="text">{{ keys }}</view>
							<view class="cont">¥{{ item }}</view>
						</view>
					</view>
				</view>

				<view class="goods-content" style="margin-top: 20rpx;" v-if="preSaleJdt.length">
					<view class="steps-block">
						<view class="title">
							<view class="h3">预售商品付款</view>
							<view class="h4" v-if="orderInfoPayType == 0">
								<!-- 预计送达时间 -->
								预计送达时间 {{ orderInfoPeisongTime }}
							</view>
						</view>

						<uni-steps
							:left="true"
							:options="preSaleJdt"
							direction="column"
							:active="preSaleJdt.length"
						></uni-steps>
					</view>
				</view>

				<view class="zongjia">
					实付金额:
					<text>¥{{ orderInfoOrdPayPrice | filterTransNum }}</text>
				</view>

				<view class="order-info">
					<view class="line">
						<text>订单编号: {{ orderInfoOrdBh }}</text>
						<text
							class="copy-btn"
							@click="copyFn(orderInfoOrdBh)"
							:style="{ color: configInfo.web_site_color }"
						>
							复制
						</text>
					</view>
					<view class="line">
						<text>下单时间: {{ orderInfoAddTime }}</text>
					</view>
					<view class="line" v-if="orderInfoPayType">
						<text>支付方式: {{ orderInfoPayType }}</text>
					</view>
					<view class="line">
						<text>配送方式: {{ orderInfoPostTypeText }}</text>
						<text
							class="copy-btn"
							style="font-weight: bold; text-decoration: underline;"
							v-if="orderInfoPostType == 2 && orderDetail.status == '待收货'"
							@click="openkdFn"
							:style="{ color: configInfo.web_site_color }"
						>
							物流信息
						</text>
					</view>

					<block v-if="orderInfoPostType == 3 || orderInfoPostType == 4 || orderInfoPostType == 0">
						<view class="line" v-if="thirdPeisongStatusMsg">
							<text>配送状态: {{ thirdPeisongStatusMsg }}</text>
							<!--
							<text class="copy-btn" v-if="calcIsAtRunIng" style="font-weight: bold; text-decoration: underline;" @click="openThirdPeisongInfoFn"
							 :style="{ color: configInfo.web_site_color }">
								查看详情
							</text>
							-->
						</view>
					</block>

					<view
						class="line"
						v-if="sendEndImg"
						@click="lookBigImgFn([sendEndImg])"
						style="justify-content: flex-start;"
					>
						<text>送达凭证:</text>
						<view class="img-box"><image class="image-dom" :src="sendEndImg"></image></view>
					</view>

					<view class="line" v-if="calcIsAtRunIng && thirdQiShouName && thirdQiShouTel">
						<text>联系骑手: {{ thirdQiShouName }}({{ thirdQiShouTel }})</text>
						<text
							class="copy-btn"
							@click="telFn(thirdQiShouTel)"
							style="font-weight: bold;"
							:style="{ color: configInfo.web_site_color }"
						>
							呼叫骑手
						</text>
					</view>

					<view class="line" v-if="orderInfoQuehuo">
						<text>如遇缺货: {{ orderInfoQuehuo }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="map-wrap" v-if="calcIsAtRunIng">
			<map
				id="dingdan-map"
				class="map-dom"
				:show-compass="true"
				:markers="markers"
				:polyline="polyline"
				:latitude="latitude"
				:longitude="longitude"
				@regionchange="regionchangeFn"
				:scale="11"
			></map>
		</view>
		<!-- 物流信息模态框 -->
		<view :class="['couponModal']" v-if="isShowCouponModal">
			<view class="top" @click="closeCouponModalFn"></view>
			<view class="bottom">
				<view class="icon-block" @click="closeCouponModalFn">
					<uni-icons color="#bbbdc0" size="20" type="closeempty"></uni-icons>
				</view>
				<view class="title-h4">物流信息</view>

				<view class="content">
					<view class="card-wrap">
						<view class="card-block">
							<view class="state-top-block">
								<view class="state-info">
									<text class="h5">订单状态:</text>
									<text class="h6">{{ kdInfoSuccess ? kdStateArr[kdInfoState] : kdInfoReason }}</text>
								</view>
								<view class="state-info">
									<text class="h5">快递单号:</text>
									<text class="h6">{{ kdInfoLogisticCode }}</text>
								</view>
								<view class="state-info">
									<text class="h5">快递编码:</text>
									<text class="h6">{{ kdInfoShipperCode }}</text>
								</view>
							</view>

							<view class="Traces-block" v-if="calcTracesArr.length > 0">
								<!-- 进度条 -->
								<uni-steps
									:options="calcTracesArr"
									direction="column"
									left
									:active="calcTracesArr.length - 1"
								></uni-steps>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 支付时弹出的选择支付方式模态框 -->
		<payment-type-modal
			:orderInfoOrdPayPrice="orderInfoOrdPayPrice"
			:isShow="isShowPaymentTypeModal"
			:showPaymentType="showPaymentType"
			:currentPaymentType="currentPaymentType"
			:yve="yve"
			:isUseYve="isUseYve"
			@setPaymentTypeModalIsShow="setPaymentTypeModalIsShow(false)"
			@setPaymentType="setPaymentType"
			@toggleUseYveFn="toggleUseYveFn"
			@confirmPaymentBtnClickFn="confirmPaymentBtnClickFn"
		></payment-type-modal>
		<!-- 登录框组件 -->
		<login-fn
			:is-show-login="loginBoxFlag"
			@loginSuccessCallback="refreshFn"
			@close="closeGlobalLoginFn"
			is-show-exit
			hide-page
		></login-fn>
	</view>
</template>
<script>
import { host } from '@/tools/siteinfo.js';
import { common, rob, group, integral, preSale, orderTypeEnum } from '@/tools/const.js';

import QQMapWX from '@/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min';
import { checkTypeFn, transNumFn, assertObject, assertArray, assertString, Object2QueryString } from '@/tools/tools';

import { getPayDataFn } from '@/pages/order/submit-order-fun/order.js'; // 订单相关方法

// #ifdef APP-PLUS

import {
	// 当前运行环境 安卓 or 苹果
	ENVANDROID,
	ENVIOS
} from '@/tools/const.js';

import amapFile from '@/tools/libs/a-map-sdk/amap-wx.js';
import { amapKey } from '@/tools/siteinfo.js';
var myAmapFun;
// #endif

import {
	// ↓↓ 配送方式 ===========================
	peiTypeShangjia,
	peiTypeZiti,
	peiTypeKuaidi,
	peiTypeDada,
	peiTypeShansong,
	peiTypeDuozitidian,
	peiTypeEnumObj,
	paymentTypeEnum,
	payment_zfb,
	payment_wx,
	xcx_wx,
	xcx_tt,
	browser_third,
	browser_wx,
	app_android,
	app_ios
} from '@/tools/const.js';

import { oneModel, moreModel, storeType } from '@/pages/order/submit-order-enum.js';

import userAddress from '@/pages/order/order-components/user-address.vue'; // 展示用户地址组件
import zitidianShow from '@/pages/order/order-components/duozitidian/zitidian-show.vue'; // 展示在页面上的自提点

import zitidianShowSeller from '@/pages/order/order-components/zitidian-show-seller.vue'; // 展示在页面上的自提点 商家自提类型
import paymentTypeModal from '@/pages/order-state/order-components/payment-type-modal.vue'; // 支付时弹出的选择支付方式模态框

let timer, mapTimer, qqmapsdk;
export default {
	components: {
		userAddress,
		zitidianShow,
		zitidianShowSeller,
		paymentTypeModal
	},
	data() {
		return {
			mmpLat: 39.908397,
			mmpLon: 116.446029,

			isShowLoading: true, // 开屏动画

			// ↓↓ 配送方式 ===========================
			peiTypeShangjia,
			peiTypeZiti,
			peiTypeKuaidi,
			peiTypeDada,
			peiTypeShansong,
			peiTypeDuozitidian,
			peiTypeEnumObj,

			orderInfo: {},
			isShowCouponModal: false, // 物流模态框

			ord_id: null, // 订单编号
			orderDetail: {}, // 订单信息
			cancel_order_countdown: null,
			showTime: '',

			backPage: '',
			type: '',
			commentFlag: false,
			pay: '',

			kdStateArr: ['暂无物流信息', '已揽件', '在途中', '签收', '问题件'],
			isLoadKded: false, // 是否加载过 快递相关信息

			kdInfoLogisticCode: '', // 快递单号
			kdInfoShipperCode: '', // 快递编码
			kdInfoState: '', // 物流状态
			kdInfoSuccess: false, // 请求状态
			kdInfoTraces: '', // 轨迹信息
			kdInfoReason: '', // 错误信息

			orderInfoOrdBh: '', // 订单号
			orderInfoOrdPrice: 0, // 订单金额
			orderInfoOrdPayPrice: 0, // 实付金额
			orderInfoAddTime: '', // 订单下单时间
			orderInfoPeisongTime: '', // 配送时间
			orderInfoPayTime: '', // 支付时间
			orderInfoUserName: '', // 收货人姓名
			orderInfoUserPhone: '', // 收货人手机号
			orderInfoAddress: '', // 收货地址
			orderInfoUserTag: '', // 收货地址标签
			orderInfoPayType: '', // 支付方式
			orderInfoPeisongPrice: 0, // 配送费
			orderInfoStatus: '', // 订单状态
			orderInfoQuehuo: '', // 如遇缺货 提示的文字
			/*
				orderInfoPostType 配送方式
					0: 店家配送;
					1: 自提;
					2: 快递;
					3: 达达;
					4: 闪送;
					5: 到点自提;
			*/
			orderInfoPostType: '', // 配送方式 等于2  加一个按钮，查看物流信息  其他第三方配送....

			orderInfoPostTypeText: '', // 配送方式 对应的文字展示字符串
			thirdPeisongStatusMsg: '', // 第三方 (达达闪送) 配送状态

			thirdQiShouName: '', // 骑手名字
			thirdQiShouTel: '', // 骑手电话

			goodsList: [], // 商品数据
			orderInfoSaleObj: {}, // 订单优惠钱的信息

			sendEndImg: '', // 送达的凭证图片路径

			id: null,
			// 万达坐标(商家位置) 发
			origin: {
				latitude: 0,
				longitude: 0
			},

			// 双桥(目标位置) 收
			target: {
				latitude: 0,
				longitude: 0
			},
			// 八里桥(骑手位置)
			latitude: 0,
			longitude: 0,

			polyline: [], // 地图上 路线线 根据数据 画 在地图是的

			pageLoad: 0,

			// 预售进度条
			preSaleJdt: [],
			// 多自提点 信息
			zitidianName: '', // 自提点名字
			zitidianImage: '', // 自提点预览图
			zitidianTime: '', // 自提点营业时间
			zitidianAddressText: '', // 自提点地址

			isddzt: false, // 是否是到点自提的订单  true 是到点自提   false 不是到点自提

			loginBoxFlag: false, // 登录框显示隐藏状态

			isShowPaymentTypeModal: false,
			currentPaymentType: '',
			orderIsSelectPaymentType: false, // 该订单支付时是否可以弹出选支付方式弹框

			yve: 0, // 余额
			isUseYve: false, // 是否使用余额抵扣
			// 订单类型
			orderType: ''
		};
	},
	onLoad(options) {
		let that = this;
		that.ord_id = options.id;
		that.backPage = options.backPage;
		that.type = options.type;
		that.pay = options.pay;

		qqmapsdk = new QQMapWX({
			key: that.configInfo.tx_map_key
		});
		// #ifdef APP-PLUS
		myAmapFun = new amapFile.AMapWX({ key: amapKey });
		// #endif

		that.setDefaultPaymentTypeFn();
	},
	onShow() {
		let that = this;

		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});

		if (!that.isShowLoading) {
			that.isShowLoading = true;
		}
		uni.setStorageSync('orderZhifuLoadCont', 0);
		uni.setStorageSync('orderZhifuReloadFlag', 0);

		if (!that.isLogin) {
			that.closeGlobalLoginFn(true);
			that.isShowLoading = false;
		} else {
			that.getOrderDetailFn(() => {
				if (that.backPage == 'dingdanList' && that.pay && that.pageLoad == 0) {
					that.payFn();
				}
				if (that.calcIsAtRunIng) {
					that.openThirdPeisongInfoFn();
				}
			});
		}
		that.pageLoad++;
	},
	onUnload() {
		let that = this;
		clearInterval(timer);
		clearInterval(mapTimer);
		if (that.backPage == 'dingdanList' && !that.commentFlag) {
			uni.setStorageSync('refreshBack', 1);
		}
	},

	methods: {
		// 切换抵扣余额
		toggleUseYveFn(e) {
			this.isUseYve = e;
		},
		// 调起客户端支付
		async confirmPaymentBtnClickFn() {
			let that = this;

			let platform;
			// #ifdef MP-WEIXIN
			platform = xcx_wx;
			// #endif
			// #ifdef H5
			if (that.globalBrowserIsWx) {
				platform = browser_wx;
			} else {
				platform = browser_third;
			}
			// #endif

			// #ifdef APP-PLUS
			if (that.appenv == ENVANDROID) {
				platform = app_android;
			} else if (that.appenv == ENVIOS) {
				platform = app_ios;
			}
			// #endif

			let orderId = that.ord_id;

			let payDataResult = await getPayDataFn(
				that,
				storeType.oneModel,
				orderId,
				platform,
				that.currentPaymentType ? that.currentPaymentType : payment_wx,
				that.isUseYve
			);

			if (payDataResult.type == 'success') {
				let handleFn = {
					[2099]() {
						// 2099 是余额支付成功 直接跳转订单页面
						that.refreshFn();
					},
					[200]() {
						// #ifdef MP-WEIXIN
						// 200 拉起客户端支付
						let payMentOptions = {
							...payDataResult.result,
							provider: 'wxpay',
							orderInfo: payDataResult.result,
							success(e) {
								console.log('uni.requestPayment 成功', e);
								that.refreshFn();
							},
							fail(e) {
								console.log('uni.requestPayment 失败', e);
								uni.showModal({
									title: '订单未支付,是否继续支付',
									success(e) {
										if (e.confirm) {
											that.requestPaymentFn(payMentOptions);
										} else {
											that.setPaymentTypeModalIsShow(false);
										}
									}
								});
							}
						};
						that.requestPaymentFn(payMentOptions);
						// #endif

						// #ifdef APP-PLUS
						// 200 拉起客户端支付
						// 微信支付
						if (payment_wx == that.currentPaymentType) {
							let payMentOptions = {
								...payDataResult.result,
								provider: 'wxpay',
								orderInfo: payDataResult.result,
								success(e) {
									console.log('uni.requestPayment 成功', e);
									that.refreshFn();
								},
								fail(e) {
									console.log('uni.requestPayment 失败', e);
									uni.showModal({
										title: '订单未支付,是否继续支付',
										success(e) {
											if (e.confirm) {
												that.requestPaymentFn(payMentOptions);
											} else {
												that.setPaymentTypeModalIsShow(false);
											}
										}
									});
								}
							};
							console.log('app微信支付 uni.requestPayment 参数', payMentOptions);
							that.requestPaymentFn(payMentOptions);
						} else if (payment_zfb == that.currentPaymentType) {
							// 支付宝支付
							let payMentOptions = {
								orderInfo: payDataResult.result,
								provider: 'alipay',
								success(e) {
									console.log('uni.requestPayment 成功', e);
									that.refreshFn();
								},
								fail(e) {
									console.log('uni.requestPayment 失败', e);
									uni.showModal({
										title: '订单未支付,是否继续支付',
										success(e) {
											if (e.confirm) {
												that.requestPaymentFn(payMentOptions);
											} else {
												that.setPaymentTypeModalIsShow(false);
											}
										}
									});
								}
							};
							console.log('app支付宝支付 uni.requestPayment 参数', payMentOptions);
							that.requestPaymentFn(payMentOptions);
						}
						// #endif

						// #ifdef H5
						// 200 拉起客户端支付

						if (that.globalBrowserIsWx) {
							// 公众号支付
							function paymentFn(opt) {
								WeixinJSBridge.invoke('getBrandWCPayRequest', opt, function(res) {
									console.log('jweixinModule.invoke 结果', res);
									if (res.err_msg == 'get_brand_wcpay_request:ok') {
										that.refreshFn();
									} else {
										uni.showModal({
											title: '订单未支付,是否继续支付',
											success(e) {
												if (e.confirm) {
													paymentFn(opt);
												} else {
													that.setPaymentTypeModalIsShow(false);
												}
											}
										});
									}
								});
							}
							console.log('公众号支付参数', payDataResult.result);
							paymentFn(payDataResult.result);
						} else {
							// 普通浏览器支付
							let redirectUrl = encodeURIComponent(`${host}/h5/#/pages/my/dingdan/index?act=0`);
							let url = `${payDataResult.result}&redirect_url=${redirectUrl}`;
							setTimeout(() => {
								location.href = url;
							});
							that.navigateToFn({
								isTab: true,
								url: '/pages/my/my'
							});
						}

						// #endif
					}
				};
				handleFn[payDataResult.code]();
			} else {
				uni.showToast({
					icon: 'none',
					title: payDataResult.msg
				});
			}
		},
		// 拉起客户端支付
		requestPaymentFn(opt) {
			uni.requestPayment(opt);
		},
		// 设置支付方式模态框显示隐藏状态
		setPaymentTypeModalIsShow(flag) {
			this.isShowPaymentTypeModal = flag;
		},
		// 进入页面后设置默认的支付方式
		setDefaultPaymentTypeFn() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (that.showPaymentType.wx) {
				that.setPaymentType(payment_wx);
			}
			// #endif
			// #ifdef H5
			if (that.showPaymentType.wx) {
				that.setPaymentType(payment_wx);
			}
			// #endif
			// #ifdef APP-PLUS
			if (that.showPaymentType.wx) {
				that.setPaymentType(payment_wx);
			} else if (that.showPaymentType.zfb) {
				that.setPaymentType(payment_zfb);
			}
			// #endif
		},
		// 设置支付方式
		setPaymentType(type) {
			this.currentPaymentType = type;
		},

		regionchangeFn(e) {
			console.log(e);
			// console.log(e.detail.scale);
		},
		// 第三方地图页面 load 加载的函数
		async mapPageLoadFn(thirdPeisongInfoObj) {
			let that = this;
			that.id = thirdPeisongInfoObj.id; // 订单id

			// 赋值商家地址
			that.origin.latitude = that.shopAddressObj.latitude - 0;
			that.origin.longitude = that.shopAddressObj.longitude - 0;

			// 赋值订单地址
			that.target.latitude = thirdPeisongInfoObj.orderAddress.latitude - 0;
			that.target.longitude = thirdPeisongInfoObj.orderAddress.longitude - 0;

			let qiLocationResult = await that.getQiLocationFn();
			if (qiLocationResult.type == 'error') {
				uni.showToast({
					icon: 'none',
					title: qiLocationResult.msg
				});
				return false;
			}
			// 八里桥(骑手位置)

			let { latitude, longitude } = qiLocationResult.result;

			setTimeout(() => {
				this.latitude = latitude - 0;
				this.longitude = longitude - 0;
			});

			mapTimer = setInterval(() => {
				that.setQiLocationFn();
			}, 1000 * 10);

			that.setPolylineFn();

			console.log(that.markers, 'that.markers', '\n');
		},

		/*
			@description 返回promise对象 里面的数据是骑手的经纬度
			@return <Object>
				{
					latitude:'',
					longitude:'',
				}
		*/
		getQiLocationFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/order/order_detail_show_wz',
					data: {
						id: that.id
					}
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let { latitude, longitude } = result.data.data;

						resFn({
							type: 'success',
							msg: result.data.msg,
							result: {
								latitude,
								longitude
							}
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result: result.data
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

		// 给data里的 markers 里的 骑手(latitude,longitude) 循环赋值
		async setQiLocationFn() {
			let that = this;
			let qiLocationResult = await that.getQiLocationFn();
			if (qiLocationResult.type == 'success') {
				let { latitude, longitude } = qiLocationResult.result;

				let lng = transNumFn(longitude),
					lat = transNumFn(latitude);

				that.latitude = lat;
				that.longitude = lng;

				let mapCtx = uni.createMapContext('dingdan-map');
				mapCtx.translateMarker({
					markerId: 2,
					destination: {
						latitude: lat,
						longitude: lng
					}
				});

				mapCtx.moveToLocation({
					latitude: lat,
					longitude: lng
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: qiLocationResult.msg
				});
			}
		},

		// 设置 polyline 数据
		async setPolylineFn() {
			let that = this;
			let polylineDataArrResult = await that.getPolylineDataArrFn({
				fromLng: that.origin.longitude,
				fromLat: that.origin.latitude,
				toLng: that.target.longitude,
				toLat: that.target.latitude
			});

			if (polylineDataArrResult.type == 'success') {
				that.polyline = [
					{
						points: polylineDataArrResult.result,
						color: '#007afb',
						width: 6
					}
				];
			} else {
				uni.showToast({
					icon: 'none',
					title: polylineDataArrResult.msg
				});
			}
		},
		// 获取polyline数据
		getPolylineDataArrFn(locationOptions) {
			let that = this;
			return new Promise(async resFn => {
				locationOptions.mode = 'bicycling';
				let polylineData1 = await that.getPolylineDataFn(locationOptions);
				console.log('polylineData1', polylineData1);
				if (polylineData1.type == 'success') {
					resFn(polylineData1);
				} else if (
					polylineData1.type == 'error' &&
					polylineData1.msg == '起终点距离超长' &&
					polylineData1.result.status == 373
				) {
					locationOptions.mode = 'driving';
					let polylineData2 = await that.getPolylineDataFn(locationOptions);
					if (polylineData2.type == 'success') {
						resFn(polylineData2);
					} else {
						resFn({
							type: 'error',
							result: polylineData2,
							msg: polylineData2.msg
						});
					}
				} else {
					resFn({
						type: 'error',
						result: polylineData1,
						msg: polylineData1.msg
					});
				}
			});
		},
		// 获取polyline数据 (根据mode获取)
		getPolylineDataFn(locationOptions) {
			let that = this;
			let { fromLng, fromLat, toLng, toLat, mode } = locationOptions;
			console.log('locationOptions', locationOptions);
			return new Promise(async resFn => {
				// #ifdef MP-WEIXIN
				let qqmapsdkResult = qqmapsdk.direction({
					mode: mode ? mode : 'driving',
					from: {
						longitude: fromLng,
						latitude: fromLat
					},
					to: {
						longitude: toLng,
						latitude: toLat
					},
					success(res) {
						var coors = res.result.routes[0].polyline,
							pl = [];
						//坐标解压（返回的点串坐标，通过前向差分进行压缩）
						var kr = 1000000;
						for (var i = 2; i < coors.length; i++) {
							coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
						}
						//将解压后的坐标放入点串数组pl中
						for (var i = 0; i < coors.length; i += 2) {
							pl.push({
								latitude: coors[i],
								longitude: coors[i + 1]
							});
						}
						resFn({
							type: 'success',
							result: pl,
							msg: '获取polyline数据成功'
						});
					},
					fail(e) {
						resFn({
							type: 'error',
							result: e,
							msg: e.message
						});
					}
				});
				// #endif

				// #ifdef H5
				let url = `https://apis.map.qq.com/ws/direction/v1/${mode ? mode : 'driving'}/?`;
				let mapOptions = {
					key: that.configInfo.tx_map_key,
					output: 'jsonp',
					from: `${fromLat},${fromLng}`,
					to: `${toLat},${toLng}`
				};

				let directionResult = await that.$jsonp(`${url}${Object2QueryString(mapOptions)}`);
				console.log('directionResult', directionResult);
				if (directionResult.status == 0) {
					var coors = directionResult.result.routes[0].polyline,
						pl = [];
					//坐标解压（返回的点串坐标，通过前向差分进行压缩）
					var kr = 1000000;
					for (var i = 2; i < coors.length; i++) {
						coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
					}
					//将解压后的坐标放入点串数组pl中
					for (var i = 0; i < coors.length; i += 2) {
						pl.push({
							latitude: coors[i],
							longitude: coors[i + 1]
						});
					}
					resFn({
						type: 'success',
						result: pl,
						msg: '获取polyline数据成功'
					});
				} else {
					resFn({
						type: 'error',
						result: directionResult,
						msg: directionResult.message
					});
				}
				// #endif

				// #ifdef APP-PLUS

				myAmapFun.getDrivingRoute({
					origin: `${fromLng},${fromLat}`,
					destination: `${toLng},${toLat}`,
					success(data) {
						var points = [];
						if (data.paths && data.paths[0] && data.paths[0].steps) {
							var steps = data.paths[0].steps;
							for (var i = 0; i < steps.length; i++) {
								var poLen = steps[i].polyline.split(';');
								for (var j = 0; j < poLen.length; j++) {
									points.push({
										longitude: parseFloat(poLen[j].split(',')[0]),
										latitude: parseFloat(poLen[j].split(',')[1])
									});
								}
							}
						}
						resFn({
							type: 'success',
							result: points,
							msg: '获取polyline数据成功'
						});
					},
					fail(e) {
						resFn({
							type: 'error',
							result: e,
							msg: '获取polyline数据失败'
						});
					}
				});

				// #endif
			});
		},
		refreshFn() {
			let that = this;
			that.setPaymentTypeModalIsShow(false); // 隐藏支付框
			// 刷新页面
			that.getOrderDetailFn();
		},
		// 跳转到售后详情里
		toShouhou(tui_bh) {
			this.navigateToFn({
				url: `/pages/my/shouhou/tuikuan?id=${tui_bh}`
			});
		},
		// @description 跳转页面 查看第三方配送 信息
		openThirdPeisongInfoFn() {
			let that = this;
			let postTypeObj = {};
			if (that.orderInfoPostType == 3) {
				postTypeObj.orderInfoPostType = 3;
			}
			if (that.orderInfoPostType == 4) {
				postTypeObj.orderInfoPostType = 4;
			}
			if (that.orderInfoPostType == 0) {
				postTypeObj.orderInfoPostType = 0;
			}

			// 处理 赋值在订单的收货地址信息
			let orderAddress = that.orderDetail.address_jingweidu;
			let longitude = orderAddress.split(',')[0];
			let latitude = orderAddress.split(',')[1];

			let thirdPeisongInfoObj = {
				id: that.ord_id,
				...that.orderDetail.third_peisong,
				...postTypeObj,
				orderAddress: {
					longitude,
					latitude
				}
			};
			that.mapPageLoadFn(thirdPeisongInfoObj);
		},
		// 打开物流信息
		async openkdFn() {
			let that = this;
			if (that.isLoadKded) {
				that.isShowCouponModal = true;
			} else {
				let result = await that.$request({
					loading: true,
					url: '/api/order/show_kd',
					data: {
						id: that.orderDetail.id
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						/*
						result.data.data.Traces = [{
								"AcceptStation": "【浙江省金华市义乌市新后傅公司】 已打包",
								"AcceptTime": "2020-06-18 22:07:15"
							},
							{
								"AcceptStation": "【浙江省金华市义乌市新后傅】 已发出 下一站 【义乌转运中心公司】",
								"AcceptTime": "2020-06-19 00:51:49"
							},
							{
								"AcceptStation": "【浙江省金华市义乌市新后傅公司】 已收件 取件人: 陆小乖 (15267349749)",
								"AcceptTime": "2020-06-19 01:13:41"
							},
							{
								"AcceptStation": "【义乌转运中心公司】 已收入",
								"AcceptTime": "2020-06-19 01:40:40"
							},
							{
								"AcceptStation": "【义乌转运中心】 已发出 下一站 【北京转运中心公司】",
								"AcceptTime": "2020-06-19 02:02:20"
							},
							{
								"AcceptStation": "【杭州转运中心公司】 已收入",
								"AcceptTime": "2020-06-19 19:07:18"
							},
							{
								"AcceptStation": "【杭州转运中心】 已发出 下一站 【北京转运中心公司】",
								"AcceptTime": "2020-06-19 19:28:01"
							},
							{
								"AcceptStation": "【北京转运中心公司】 已收入",
								"AcceptTime": "2020-06-20 10:12:43"
							},
							{
								"AcceptStation": "【北京转运中心】 已发出 下一站 【北京市通州区富豪公司】",
								"AcceptTime": "2020-06-20 10:40:45"
							},
							{
								"AcceptStation": "【北京市通州区富豪公司】 已收入",
								"AcceptTime": "2020-06-20 14:54:18"
							},
							{
								"AcceptStation": "【北京市通州区富豪公司】 派件中  派件人: 张建伟 电话 18521854327  如有疑问，请联系：010-53713918",
								"AcceptTime": "2020-06-20 14:56:08"
							},
							{
								"AcceptStation": "客户签收人: 车棚超市 已签收  感谢使用圆通速递，期待再次为您服务 如有疑问请联系：18521854327，投诉电话：010-53713918",
								"AcceptTime": "2020-06-20 17:37:32"
							},

						];
						*/
						that.isLoadKded = true;
						let kdInfo = result.data.data;
						that.kdInfoLogisticCode = kdInfo.LogisticCode; // 快递单号
						that.kdInfoShipperCode = kdInfo.ShipperCode; // 快递编码
						that.kdInfoState = kdInfo.State; // 物流状态
						that.kdInfoSuccess = kdInfo.Success; // 请求状态
						that.kdInfoTraces = kdInfo.Traces; // 轨迹信息
						that.kdInfoReason = kdInfo.Reason; // 错误信息
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

				that.isShowCouponModal = true;
			}
		},
		// 关闭模态框 (点空白处关闭)
		closeCouponModalFn() {
			this.isShowCouponModal = false;
		},

		// 获取剩余支付时间
		getCancelOrderCountdown() {
			let that = this;
			that.cancel_order_countdown = that.$store.state.configInfo.cancel_order_countdown;
			that.setTime(that.orderInfoAddTime, that.cancel_order_countdown);
		},

		// 给变量不停地设置 当前距离结束的秒数
		setTime(str, num) {
			let that = this;
			clearInterval(timer);
			timer = setInterval(() => {
				str = str + '';
				str = str.replace(/-/g, '/');

				let createTime = new Date(str).getTime();
				let newTime = new Date().getTime();

				if (createTime + num * 60 * 1000 <= newTime) {
					that.showTime = `0:0`;
					return;
				}
				let showTime = Math.floor((createTime + num * 60 * 1000 - newTime) / 1000);
				that.showTime = `${Math.floor(showTime / 60)}:${Math.floor(showTime % 60)}`;
			}, 500);
		},

		// 获取当前订单信息
		async getOrderDetailFn(fn) {
			let that = this;
			console.log('获取订单信息接口 /api/order/order_detail 参数 id', that.ord_id, '\n');
			let result = await that.$request({
				url: '/api/order/order_detail',
				data: {
					id: that.ord_id
				}
			});

			// console.log('获取当前订单信息接口 /api/order/order_detail 返回的数据', result, '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let orderInfo = assertObject(result.data.data);

					that.orderInfo = orderInfo; // 返回的所有数据

					that.orderType = orderTypeEnum[orderInfo.prom_type]; // 订单类型

					that.orderInfoOrdBh = orderInfo.ord_bh; // 订单号
					that.orderInfoOrdPrice = transNumFn(orderInfo.ord_price); // 订单金额
					that.orderInfoOrdPayPrice = transNumFn(orderInfo.pay_price); // 实付金额
					that.orderInfoAddTime = orderInfo.add_time; // 订单下单时间
					that.orderInfoPeisongTime = orderInfo.peisong_time; // 配送时间
					that.orderInfoPayTime = orderInfo.pay_time; // 支付时间
					that.orderInfoUserName = orderInfo.user_name; // 收货人姓名
					that.orderInfoUserPhone = orderInfo.user_phone; // 收货人手机号
					that.orderInfoAddress = orderInfo.address; // 收货地址
					that.orderInfoUserTag = orderInfo.user_tag; // 收货地址标签
					that.orderInfoPayType = orderInfo.pay_type; // 支付方式
					that.orderInfoPeisongPrice = transNumFn(orderInfo.peisong_price); // 配送费
					that.orderInfoStatus = orderInfo.status; // 订单状态
					that.orderInfoQuehuo = orderInfo.quehuo; // 如遇缺货 提示的文字
					that.orderInfoPostType = orderInfo.post_type; // 配送方式 等于2  加一个按钮，查看物流信息  其他第三方配送....
					that.orderInfoPostTypeText = orderInfo.post_type_text; // 配送方式 文字展示
					that.orderInfoBalancePrice = transNumFn(orderInfo.balance_price); // 余额抵扣的金额

					that.yve = transNumFn(assertObject(orderInfo.user_info).money); // 账户余额

					that.orderIsSelectPaymentType = orderInfo.pt_type == 20; // 该订单支付时是否可以弹出选支付方式弹框

					// that.isddzt = orderInfo.is_ddzt == 1;
					console.log('that.orderInfo 订单信息', that.orderInfo);
					console.log('that.orderInfoPostType 配送方式', that.orderInfoPostType);

					if (that.orderInfoPostType == peiTypeEnumObj[peiTypeDuozitidian]) {
						that.zitidianName = orderInfo.ztd_name; // 自提点名字
						that.zitidianImage = orderInfo.ztd_img; // 自提点预览图
						that.zitidianTime = orderInfo.ztd_bh; // 自提点营业时间
						that.zitidianAddressText = orderInfo.address; // 自提点地址
					}

					let voucher = assertArray(orderInfo.voucher); // 送达的凭证图片路径
					that.sendEndImg = voucher.length > 0 ? voucher[0] : '';

					that.goodsList = assertArray(orderInfo.goods);
					let orderInfoSaleObj = {};

					if (checkTypeFn(orderInfo.sale) == 'Object' && Object.keys(orderInfo.sale).length > 0) {
						for (let i in orderInfo.sale) {
							if (i && transNumFn(orderInfo.sale[i]) > 0) {
								orderInfoSaleObj[i] = orderInfo.sale[i];
							}
						}
						delete orderInfoSaleObj['实付金额'];
					} else {
						orderInfoSaleObj = {};
					}
					that.orderInfoSaleObj = orderInfoSaleObj;

					that.orderDetail = result.data.data;
					that.getCancelOrderCountdown();

					/*
						@description 处理 第三方 (达达闪送) 配送状态 文字信息
						@return that.thirdPeisongStatusMsg <String> 赋值给这个属性
					*/
					if (that.orderInfoPostType == 3 || that.orderInfoPostType == 4 || that.orderInfoPostType == 0) {
						let thirdPeisongObj = result.data.data.third_peisong;
						if (checkTypeFn(thirdPeisongObj) == 'Object' && Object.keys(thirdPeisongObj).length > 0) {
							if (that.orderInfoPostType == 3 && thirdPeisongObj.status == 'success') {
								// 达达
								that.thirdPeisongStatusMsg = thirdPeisongObj.result.statusMsg;
							}
							if (that.orderInfoPostType == 4 && thirdPeisongObj.status == 200) {
								// 闪送
								that.thirdPeisongStatusMsg = thirdPeisongObj.data.orderStatusDesc; // 第三方 (达达闪送) 配送状态
							}
							if (
								that.orderInfoPostType == 0 &&
								checkTypeFn(thirdPeisongObj.statusChangeLog) == 'Array' &&
								thirdPeisongObj.statusChangeLog.length > 0
							) {
								// 平台配送
								that.thirdPeisongStatusMsg =
									thirdPeisongObj.statusChangeLog[
										thirdPeisongObj.statusChangeLog.length - 1
									].orderStatus; // 平台配送 配送状态
							}
						}
					}

					/*
							@description 处理 第三方 (达达闪送) 骑手信息
						*/
					if (that.orderInfoPostType == 3 || that.orderInfoPostType == 4 || that.orderInfoPostType == 0) {
						let thirdPeisongObj = orderInfo.third_peisong;

						let thirdQiShouName = ''; // 骑手名字
						let thirdQiShouTel = ''; // 骑手电话
						if (checkTypeFn(thirdPeisongObj) == 'Object' && Object.keys(thirdPeisongObj).length > 0) {
							if (that.orderInfoPostType == 3 && thirdPeisongObj.status == 'success') {
								// 达达
								thirdQiShouName = thirdPeisongObj.result.transporterName;
								thirdQiShouTel = thirdPeisongObj.result.transporterPhone;
							}
							if (that.orderInfoPostType == 4 && thirdPeisongObj.status == 200) {
								// 闪送
								thirdQiShouName = assertObject(assertObject(assertObject(thirdPeisongObj.data)).courier)
									.name;
								thirdQiShouTel = assertObject(assertObject(thirdPeisongObj.data).courier).mobile;
							}
							if (that.orderInfoPostType == 0) {
								// 平台配送
								thirdQiShouName = that.orderInfo.rider_username;
								thirdQiShouTel = that.orderInfo.rider_mobile;
							}
						}
						that.thirdQiShouName = thirdQiShouName;
						that.thirdQiShouTel = thirdQiShouTel;
					}

					let preSaleJdt = assertArray(orderInfo.preSaleJdt);

					if (preSaleJdt.length) {
						that.preSaleJdt = preSaleJdt.map(item => {
							return {
								title: `${item.title} ${item.money}`
							};
						});
					} else {
						that.preSaleJdt = [];
					}

					fn && fn();
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

			console.log('pi/order/order_detai结果', result);
		},
		// 支付函数
		async payFn() {
			let that = this,
				type,
				Platform;

			// 判断是否需要调取微信支付
			if (that.orderInfoPayType == '余额支付') {
				type = 'balance';
				// #ifdef MP-WEIXIN
				Platform = 'wxMiniProgram';
				// #endif
				// #ifdef APP-PLUS
				Platform = 'App';
				// #endif

				// #ifdef H5
				if (that.globalBrowserIsWx) {
					// 公众号微信浏览器
					Platform = 'wxOfficialAccount';
				} else {
					// 非微信浏览器 普通浏览器
					Platform = 'H5';
				}
				// #endif
			} else if (that.orderInfoPayType == '微信支付' && that.orderInfoBalancePrice >= 0) {
				// #ifdef MP-WEIXIN
				type = 'wechat';
				Platform = 'wxMiniProgram';
				// #endif

				// #ifdef APP-PLUS
				type = 'wechatApp';
				Platform = 'App';
				// #endif

				// #ifdef H5
				if (that.globalBrowserIsWx) {
					// 公众号微信浏览器
					type = 'wechatOfficialAccount';
					Platform = 'wxOfficialAccount';
				} else {
					// 非微信浏览器 普通浏览器
					type = 'wechatH5';
					Platform = 'H5';
				}
				// #endif
			} else if (that.orderInfoPayType == '支付宝支付' && that.orderInfoBalancePrice >= 0) {
				// #ifdef APP-PLUS
				type = 'alipay';
				Platform = 'App';
				// #endif

				// #ifdef H5
				if (!that.globalBrowserIsWx) {
					// 非微信浏览器 普通浏览器
					type = 'alipayH5';
					Platform = 'H5';
				}
				// #endif
			}
			console.log(
				'余额抵扣',
				that.orderInfoBalancePrice,
				'\n',
				'支付类型',
				that.orderInfoPayType,
				'\n',
				'支付类型',
				type,
				'\n',
				'支付平台',
				Platform,
				'\n'
			);
			// 去后台拿签名
			let objs = {
				type,
				Platform,
				ord_id: that.ord_id
			};
			console.log('支付的参数', objs);
			let result = await that.$request({
				method: 'post',
				url: '/api/pay/pay',
				data: objs
			});
			console.log('支付的结果', result);

			// #ifdef H5
			that.h5GzhPayFn(result);
			return false;
			// #endif

			if (result.statusCode == 200) {
				if (that.orderInfoPayType == '余额支付') {
					if (result.data.code == 200) {
						// 直接提示支付成功
						that.getOrderDetailFn(() => {
							uni.showModal({
								showCancel: false, //不显示取消按钮
								title: '支付成功',
								success(e) {
									//确认后的回调
									that.commentFlag = true;
									that.toBackFn();
								}
							});
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						});
					}
				} else if (that.orderInfoPayType == '微信支付') {
					if (result.data.code == 200) {
						let payOptions;
						// #ifdef MP-WEIXIN
						// 前端调 微信支付 付款
						payOptions = JSON.parse(result.data.data);

						uni.requestPayment({
							...payOptions,
							success(e) {
								console.log('成功', e);

								that.getOrderDetailFn(() => {
									uni.showModal({
										showCancel: false, //不显示取消按钮
										title: '支付成功',
										success(e) {
											//确认后的回调
											that.commentFlag = true;
											that.toBackFn();
										}
									});
								});
							},
							fail(e) {
								return;
								console.log('失败！！！！', e);
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付失败',
									success(e) {
										//确认后的回调
										// that.toBackFn()
									}
								});
							}
						});
						// #endif

						// #ifdef APP-PLUS

						payOptions = result.data.data;
						let providerObj = {
							provider: 'wxpay'
						};

						let payMentOptions = {
							...providerObj,
							orderInfo: payOptions,
							success(e) {
								that.getOrderDetailFn(() => {
									uni.showModal({
										showCancel: false, //不显示取消按钮
										title: '支付成功',
										success(e) {
											//确认后的回调
											that.commentFlag = true;
											that.toBackFn();
										}
									});
								});

								console.log('成功', e);
							},
							fail(e) {
								return;
								console.log('失败！！！！', e);
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付失败',
									success(e) {
										//确认后的回调
										// that.toBackFn()
									}
								});
							}
						};
						console.log('payMentOptions 对象', payMentOptions);
						uni.requestPayment(payMentOptions);

						// #endif
					} else {
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						});
					}
				} else if (that.orderInfoPayType == '支付宝支付') {
					let zfbStr = assertString(result.data);

					let payMentOptions = {
						provider: 'alipay',
						orderInfo: zfbStr,
						success(e) {
							that.getOrderDetailFn(() => {
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付成功',
									success(e) {
										//确认后的回调
										that.commentFlag = true;
										that.toBackFn();
									}
								});
							});
						},
						fail(e) {
							return;
							console.log('失败！！！！', e);
							uni.showModal({
								showCancel: false, //不显示取消按钮
								title: '支付失败',
								success(e) {
									//确认后的回调
									// that.toBackFn()
								}
							});
						}
					};
					console.log('payMentOptions 对象', payMentOptions);
					uni.requestPayment(payMentOptions);
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}

			console.log(result, '-------------------');
		},
		// #ifdef H5
		h5GzhPayFn(result) {
			let that = this;
			console.log('公众号支付返回的东西', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let gzhWxPayOptions = assertObject(result.data.data); // 公众号支付需要的数据

					gzhWxPayOptions.timeStamp = `${gzhWxPayOptions.timeStamp}`;

					console.log('gzhWxPayOptions 参数', gzhWxPayOptions);

					if (that.globalBrowserIsWx) {
						// 公众号支付
						WeixinJSBridge.invoke('getBrandWCPayRequest', gzhWxPayOptions, function(res) {
							console.log('jweixinModule.invoke 结果', res);

							if (res.err_msg == 'get_brand_wcpay_request:ok') {
								that.getOrderDetailFn(() => {
									uni.showModal({
										showCancel: false, //不显示取消按钮
										title: '支付成功',
										success(e) {
											//确认后的回调
											// that.toBackFn()
											// that.getOrderDetailFn()
										}
									});
								});
							} else {
								uni.showModal({
									showCancel: false, //不显示取消按钮
									title: '支付失败',
									success(e) {
										//确认后的回调
										// that.toBackFn()
									}
								});
								return false;
							}
						});
					} else {
						// 普通浏览器支付

						let h5wxPayOptions = assertObject(result.data.data); // 公众号支付需要的数据

						let redirectUrl = encodeURIComponent(
							`${location.origin}${location.pathname}#/pages/my/dingdan/index?act=0`
						);

						let url = `${h5wxPayOptions.mweb_url}&redirect_url=${redirectUrl}`;

						console.log(url);

						location.href = url;
					}
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
		// #endif

		// 取消订单
		cancelFn() {
			let that = this;
			uni.showModal({
				title: '取消订单',
				async success(e) {
					if (e.confirm) {
						that.navigateToFn({
							type: 'redirectTo',
							url: `/pages/my/dingdan/qvxiao?id=${that.ord_id}&backPage=dingdanList`
						});
					}
				}
			});
		}
	},

	computed: {
		/*
			@description
				根据后台开通的支付选项和当前客户端平台类型 判断 页面是否显示 微信支付 和 支付宝支付 选项
			@return <Object>
				{
					wx: true,
					zfb: false
				}
		*/
		showPaymentType() {
			let that = this;
			let isShow = {
				wx: false,
				zfb: false
			};

			// #ifdef MP-WEIXIN
			if (that.calcWeixinPayMiniprogram) {
				isShow.wx = true;
			}
			// #endif

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				if (that.calcWeixinofficialaccount) {
					isShow.wx = true;
				}
			} else {
				if (that.calcWeixinPayH5) {
					isShow.wx = true;
				}
			}

			// #endif

			// #ifdef APP-PLUS
			if (that.calcWeixinPayAndroidApp) {
				isShow.wx = true;
			}
			if (that.calcZhifubaoPayAndroidApp) {
				isShow.zfb = true;
			}
			// #endif
			return isShow;
		},
		mmpMark() {
			let that = this;

			return [
				{
					id: 1,
					width: 24,
					height: 24,
					iconPath: '/static/global-image/fa.png',
					// iconPath: 'https://dev.sjwxsc.com/wx-image/global-image/fa.png',

					latitude: 39.909185,
					longitude: 116.397443
				},
				{
					id: 2,
					width: 24,
					height: 24,
					iconPath: '/static/global-image/qi.png',
					// iconPath: 'https://dev.sjwxsc.com/wx-image/global-image/qi.png',

					latitude: that.latitude,
					longitude: that.longitude
				},

				{
					id: 3,
					width: 24,
					height: 24,
					iconPath: '/static/global-image/shou.png',
					// iconPath: 'https://dev.sjwxsc.com/wx-image/global-image/shou.png',

					latitude: 39.907836,
					longitude: 116.498443
				}
			];
		},
		// 是否显示用户地址
		isShowAddress() {
			let that = this;
			// 预售订单 & 只付定金 不显示收货地址
			if (that.orderType == preSale && that.orderInfoStatus == '已付定金') {
				return false;
			}
			// 根据配送方式判断是否显示用户收货地址
			let isShowAddress = {
				[peiTypeEnumObj[peiTypeShangjia]]: true, // 商家配送 0
				[peiTypeEnumObj[peiTypeZiti]]: false, // 自提 1
				[peiTypeEnumObj[peiTypeKuaidi]]: true, // 快递 2
				[peiTypeEnumObj[peiTypeDada]]: true, // 达达 3
				[peiTypeEnumObj[peiTypeShansong]]: true, // 闪送 4
				[peiTypeEnumObj[peiTypeDuozitidian]]: false // 多自提点 5
			};
			return isShowAddress[that.orderInfoPostType];
		},
		/*
			@description 当前订单是否是 第三方配送 并且是否可以 查看详情 (只有在配送中可以看详情地图距离 信息)
			@return <Boolean>
		*/
		calcIsAtRunIng() {
			let that = this;
			let resultBoolean;
			if (that.orderInfoPostType == 3 || that.orderInfoPostType == 4 || that.orderInfoPostType == 0) {
				let thirdPeisongObj = that.orderDetail.third_peisong;
				if (checkTypeFn(thirdPeisongObj) == 'Object' && Object.keys(thirdPeisongObj).length > 0) {
					if (
						that.orderInfoPostType == 3 &&
						checkTypeFn(thirdPeisongObj.result) == 'Object' &&
						thirdPeisongObj.result.statusCode == 3
					) {
						// 达达
						resultBoolean = true;
					} else if (
						that.orderInfoPostType == 4 &&
						checkTypeFn(thirdPeisongObj.data) == 'Object' &&
						thirdPeisongObj.data.orderStatus == 20
					) {
						// 闪送
						resultBoolean = true;
					} else if (
						that.orderInfoPostType == 0 &&
						checkTypeFn(thirdPeisongObj.statusChangeLog) == 'Array' &&
						thirdPeisongObj.statusChangeLog.length > 0 &&
						thirdPeisongObj.statusChangeLog[thirdPeisongObj.statusChangeLog.length - 1].orderStatus ==
							'配送中'
					) {
						resultBoolean = true;
					} else {
						resultBoolean = false;
					}
				} else {
					resultBoolean = false;
				}
			} else {
				resultBoolean = false;
			}
			return resultBoolean;
		},
		// 返回 轨迹信息 的数据
		calcTracesArr() {
			let that = this;
			if (that.kdInfoSuccess) {
				let kdInfoTraces = [];
				if (checkTypeFn(that.kdInfoTraces) == 'Array' && that.kdInfoTraces.length > 0) {
					kdInfoTraces = that.kdInfoTraces;
				} else {
					kdInfoTraces = [];
				}
				if (kdInfoTraces.length > 0) {
					return kdInfoTraces.map(item => {
						return {
							title: item.AcceptStation,
							desc: item.AcceptTime
						};
					});
				} else {
					return [];
				}
			} else {
				return [];
			}
		},
		// 返回商家信息 地址 和 联系电话
		showAddressInfo() {
			let configInfo = assertObject(this.configInfo);
			return {
				sellerImage: this.addimgPathHostFn(configInfo.shop_image),
				sellerName: configInfo.shop_name,
				sellerTel: configInfo.mobile,
				sellerOpenTime: configInfo.shop_bh,
				sellerAddress: configInfo.address
			};
		},

		// @description 商家地址 信息
		// @return <Object>
		shopAddressObj() {
			let that = this;
			let positionStr = that.configInfo.shop_coordinate;
			let positionArr = positionStr.split(',');
			let longitude = positionArr[0];
			let latitude = positionArr[1];
			return {
				latitude,
				longitude
			};
		},

		// 返回markers数据
		markers() {
			let that = this;
			return [
				{
					id: 1,
					width: 24,
					height: 24,
					iconPath: '/static/global-image/fa.png',
					latitude: that.origin.latitude,
					longitude: that.origin.longitude
				},
				{
					id: 2,
					width: 24,
					height: 24,
					iconPath: '/static/global-image/qi.png',

					latitude: that.latitude,
					longitude: that.longitude
				},
				{
					id: 3,
					width: 24,
					height: 24,
					iconPath: '/static/global-image/shou.png',
					latitude: that.target.latitude,
					longitude: that.target.longitude
				}
			];
		},
		// 配送方式是多点自提 时返回 自提点信息
		zitidianInfo() {
			let that = this;
			return {
				zitidianImage: that.zitidianImage,
				isRange: true,
				zitidianTime: that.zitidianTime,
				zitidianAddressText: that.zitidianAddressText,
				zitidianName: that.zitidianName
			};
		}
	} // ↑↑↑↑↑ computed 结束
};
</script>

<style lang="scss" scoped>
.page,
page {
	min-height: 100vh;
	background: $bg-grey-color;
	overflow: hidden;
}

@mixin border {
	border-bottom: 1px solid #f8f8f8;
}

.cancel-content {
	position: relative;
	margin-top: 20rpx;
	padding: 0 20rpx;
	margin-bottom: 10rpx;
	overflow: hidden;
	background: #ffffff;

	.before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 24rpx;
	}

	.h3-block {
		margin-top: 36rpx;
		@include border;

		.h3-1 {
			font-size: 34rpx;
			font-weight: 600;
			color: $grey1-color;
			line-height: 2em;
		}

		.h3-2 {
			font-size: 28rpx;
			color: $grey2-color;
			line-height: 70rpx;
		}
	}

	.h4 {
		display: flex;
		justify-content: flex-end;

		.btn-buy {
			@include flex-center;
			margin: 12rpx 0;
			margin-left: 12rpx;
			width: 160rpx;
			height: 64rpx;
			border: 1px solid #efefef;
			color: $grey1-color;
			font-size: 25rpx;
		}
	}
}

.goods-list-block {
	padding-top: 10rpx;
	.goods-content {
		border-radius: 20rpx;
		background: #ffffff;
		padding: 0 20rpx;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 86rpx;

			.h3 {
				font-size: 34rpx;
				font-weight: 600;
				color: $grey1-color;
			}

			.h4 {
				font-size: 22rpx;
				color: $grey2-color;
			}
		}

		.goods-list {
			.item {
				padding: 20rpx 0;
				@include border;

				&:first-child {
					border-top: 1px solid #f8f8f8;
				}

				.top-goods-info {
					display: flex;

					.image-block {
						margin-right: 20rpx;
						width: 160rpx;
						height: 160rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.goods-description-block {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: flex-start;

						.goods-name {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.name-block {
								font-size: 30rpx;
								color: $grey1-color;
							}

							.name-block {
								max-width: 9em;
								@include text-ellipsis;
							}
						}

						.goods-description-box {
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 60rpx;

							.goods-description {
								font-size: 22rpx;
								color: $grey2-color;
								max-width: 16em;
								@include text-ellipsis;
							}
						}

						.tag-list {
							font-size: 0;
							display: flex;
							justify-content: space-between;
						}
					}

					.right-price-num {
						width: 150rpx;
						text-align: right;
						.num {
							font-size: 22rpx;
							color: $grey2-color;
							max-width: 16em;
							@include text-ellipsis;
						}

						.price-block {
							font-size: 30rpx;
							color: $grey1-color;
						}

						.text {
							font-size: 23rpx;
							color: #6ccc4e;
						}
					}
				}
				.bottom-diff-price-tips {
					margin: 8rpx 0 0;
					padding-left: 0.4em;
					font-size: 25rpx;
					font-weight: 600;
					line-height: 1.2;
				}
			}
		}

		.xiaofei {
			.peisong {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 85rpx;
				color: $grey1-color;
				font-size: 26rpx;
				font-weight: 600;
			}
		}
	}

	.zongjia {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin: 20rpx 0;
		padding: 0 20rpx;
		height: 88rpx;
		background: #ffffff;
		border-radius: 20rpx;
		font-size: 28rpx;
		color: $grey2-color;

		text {
			text-indent: 0.5em;
			font-weight: 600;
			color: $grey1-color;
		}
	}

	.order-info {
		padding: 0 20rpx;
		background: #ffffff;
		border-radius: 20rpx;

		margin-bottom: 20rpx;

		.line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88rpx;
			font-size: 23rpx;
			color: $grey1-color;

			.img-box {
				margin: 0 1em;
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				overflow: hidden;

				.image-dom {
					width: 100%;
					height: 100%;
				}
			}
		}

		.copy-btn {
		}
	}
}

.couponModal {
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 700;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);

	.top {
		flex: 1;
	}

	.bottom {
		height: 1100rpx;
		background: #f5f5f5;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;

		.icon-block {
			display: inline-flex;
			align-items: center;
			position: absolute;
			right: 1em;
			top: 1em;
			font-size: 26rpx;
			// color: $red-color;
			color: #bbbdc0;
			border: 1px solid #bbbdc0;
			border-radius: 100rpx;
			padding-left: 0.5em;
			padding-right: 0.5em;
		}

		.title-h4 {
			text-align: left;
			padding-left: 24rpx;

			color: $grey1-color;
			line-height: 110rpx;
			font-size: 30rpx;
		}

		.content {
			padding: 0 34rpx;

			.title-h5 {
				color: $grey2-color;
				line-height: 55rpx;
				font-size: 30rpx;
			}

			.card-wrap {
				height: 1080rpx;

				.card-block {
					height: 100%;
					overflow-x: hidden;
					@include hide-scrollbar;
					padding-bottom: 100rpx;

					.state-top-block {
						margin-bottom: 10rpx;
						background: #ffffff;
						border-radius: 20rpx;
						padding: 20rpx;
						font-size: 28rpx;
						line-height: 1.6em;

						.h5 {
							margin-right: 0.5em;
						}
					}

					.Traces-block {
						background: #ffffff;
						border-radius: 20rpx;
						margin: 10px 0;
						padding-right: 10rpx;
						overflow: hidden;
					}
				}
			}
		}
	}
}
.map-wrap {
	@mixin size {
		width: 702rpx;
		height: 702rpx;
	}
	margin: 20rpx auto;
	@include size;
	overflow: hidden;
	border-radius: 20rpx;

	.map-dom {
		@include size;
	}
}
</style>
