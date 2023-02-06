<template>
	<view class="page">
		<view class="goods-list-block">
			<view class="content-wrap">
				<view class="title"><div class="h3">购物清单</div></view>
				<view class="goods-list">
					<view class="item">
						<view class="item-image-block"><image :src="goodsDetailOriginalImg" mode=""></image></view>
						<view class="item-description-block">
							<view class="item-name">
								<text class="name-">{{ goodsDetailName }}</text>
								<text>
									¥{{ (isSpec ? currentgoodsPinPrice : goodsDetailPintuanPrice) | filterTransNum }}
								</text>
							</view>
							<view class="item-description">
								<text class="description-">
									{{ isSpec ? `已选: ${specKeyStr}` : goodsDetailRemark }}
								</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 会员卡组件 -->
		<vip-card
			@selectVipOptionCardFn="selectVipOptionCardFn"
			:vipOptionCardIsSelect="vipOptionCardIsSelect"
			:vipOptionCardIsOpen="vipOptionCardIsOpen"
			:vipOptionCardId="vipOptionCardId"
			:vipOptionCardName="vipOptionCardName"
			:vipOptionCardTagBgColor="vipOptionCardTagBgColor"
			:vipOptionCardTagIconImg="vipOptionCardTagIconImg"
			:vipOptionCardTagText="vipOptionCardTagText"
			:vipOptionCardTagTextColor="vipOptionCardTagTextColor"
			:vipOptionCardTipBgColor="vipOptionCardTipBgColor"
			:vipOptionCardTipText="vipOptionCardTipText"
			:vipOptionCardTipTextColor="vipOptionCardTipTextColor"
			:vipOptionCardTime="vipOptionCardTime"
			:vipOptionCardPrice="vipOptionCardPrice"
		></vip-card>

		<view class="pay-type">
			<view class="content-wrap">
				<view class="cont-block">
					<view class="h3">支付方式</view>

					<view class="line-block-list">
						<view class="line-block">
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block"><yve-icon></yve-icon></view>
									<!-- <text>储值余额 ({{ yve | filterTransNum }})</text> -->
									<text>
										储值余额
										<block v-if="yve > 0">({{ yve | filterTransNum }})</block>
									</text>
								</view>
								<view>
									<block v-if="yve == 0">{{ yve | filterTransNum }}</block>
									<switch
										v-else
										style="transform: translateX(20rpx) scale(0.7)"
										:disabled="disabledSwitch"
										:checked="defaultStatus"
										:color="configInfo.web_site_color"
										@change="switchChangeFn"
									></switch>
								</view>
							</view>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<view class="line-block" @click="setPayFlagFn(payTypeWxxcx)" v-if="calcWeixinPayMiniprogram">
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block">
										<!-- <image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image> -->
										<view
											class="iconfont icon-weixin"
											style="color: #6ccc4e;font-size: 60rpx;"
										></view>
									</view>
									<text>微信</text>
								</view>
								<view>
									<uni-icons
										size="22"
										v-if="payFlag == payTypeWxxcx"
										type="circle-filled"
										:color="configInfo.web_site_color"
									></uni-icons>
									<uni-icons size="22" v-else type="circle" color="#c7c7c7"></uni-icons>
								</view>
							</view>
						</view>
						<!-- #endif -->

						<!-- #ifdef APP-PLUS -->

						<view class="line-block" @click="setPayFlagFn(payTypeWxapp)" v-if="calcWeixinPayAndroidApp">
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block">
										<!-- <image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image> -->
										<view
											class="iconfont icon-weixin"
											style="color: #6ccc4e;font-size: 60rpx;"
										></view>
									</view>
									<text>微信</text>
								</view>
								<view>
									<uni-icons
										size="22"
										v-if="payFlag == payTypeWxapp"
										type="circle-filled"
										:color="configInfo.web_site_color"
									></uni-icons>
									<uni-icons size="22" v-else type="circle" color="#c7c7c7"></uni-icons>
								</view>
							</view>
						</view>

						<view class="line-block" @click="setPayFlagFn(payTypeZfbapp)" v-if="calcZhifubaoPayAndroidApp">
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block">
										<view
											class="iconfont icon-zhifubao"
											style="color: #5a9ef7;font-size: 60rpx;"
										></view>
									</view>
									<text>支付宝</text>
								</view>
								<view>
									<uni-icons
										size="22"
										v-if="payFlag == payTypeZfbapp"
										type="circle-filled"
										:color="configInfo.web_site_color"
									></uni-icons>
									<uni-icons size="22" v-else type="circle" color="#c7c7c7"></uni-icons>
								</view>
							</view>
						</view>
						<!-- #endif -->

						<!-- #ifdef H5 -->
						<view
							class="line-block"
							@click="setPayFlagFn(payTypeWxgzh)"
							v-if="globalBrowserIsWx && calcWeixinofficialaccount"
						>
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block">
										<!-- <image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image> -->
										<view
											class="iconfont icon-weixin"
											style="color: #6ccc4e;font-size: 60rpx;"
										></view>
									</view>
									<text>微信</text>
								</view>
								<view>
									<uni-icons
										size="22"
										v-if="payFlag == payTypeWxgzh"
										type="circle-filled"
										:color="configInfo.web_site_color"
									></uni-icons>
									<uni-icons size="22" v-else type="circle" color="#c7c7c7"></uni-icons>
								</view>
							</view>
						</view>

						<view
							class="line-block"
							@click="setPayFlagFn(payTypeH5wx)"
							v-if="!globalBrowserIsWx && calcWeixinPayH5"
						>
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block">
										<!-- <image :src="calcImageSrc('/my/icon-wx.png')" mode=""></image> -->
										<view
											class="iconfont icon-weixin"
											style="color: #6ccc4e;font-size: 60rpx;"
										></view>
									</view>
									<text>微信</text>
								</view>
								<view>
									<uni-icons
										size="22"
										v-if="payFlag == payTypeH5wx"
										type="circle-filled"
										:color="configInfo.web_site_color"
									></uni-icons>
									<uni-icons size="22" v-else type="circle" color="#c7c7c7"></uni-icons>
								</view>
							</view>
						</view>
						<!-- 
						普通浏览器(非微信客户端浏览器) 暂时取消支付宝支付
						<view class="line-block" @click="setPayFlagFn(payTypeH5zfb)" v-if="!globalBrowserIsWx">
							<view class="content-wrap">
								<view class="left-block">
									<view class="image-block">
										<view
											class="iconfont icon-zhifubao"
											style="color: #5a9ef7;font-size: 60rpx;"
										></view>
									</view>
									<text>支付宝</text>
								</view>
								<view>
									<uni-icons
										size="22"
										v-if="payFlag == payTypeH5zfb"
										type="circle-filled"
										:color="configInfo.web_site_color"
									></uni-icons>
									<uni-icons size="22" v-else type="circle" color="#c7c7c7"></uni-icons>
								</view>
							</view>
						</view>
						-->
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<loading-css :is-show="isShowLoading"></loading-css>

		<view style="width:100vw; height: 100rpx;"></view>
		<view class="order-btn-block">
			<view class="price-all">
				待支付:
				<view class="shop-price-block-lr">
					<view class="origin-price">
						¥
						<text>{{ hejiPrice | filterTransNum }}</text>
					</view>
				</view>
			</view>

			<view
				class="order-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="$onceClick(payFn)"
				:style="{ background: configInfo.web_site_color, opacity: payBtnFlag ? 1 : 0.8 }"
			>
				立即拼团
			</view>
		</view>
	</view>
</template>

<script>
import { checkTypeFn, assertNumber, assertArray, assertObject, transNumFn, bigPlus, bigMinus } from '@/tools/tools';
import {
	payTypeyve, // 支付类型储值余额
	payTypeWxxcx, // 支付类型微信小程序支付
	payTypeWxapp, // 支付类型微信app支付
	payTypeZfbapp, // 支付类型支付宝app支付
	payTypeWxgzh, // 支付类型公众号微信支付
	payTypeH5wx, // 支付类型H5普通浏览器微信支付
	payTypeH5zfb, // 支付类型H5普通浏览器支付宝支付
	payTypeEnumObj // 支付类型枚举对象
} from '@/tools/const.js';

import vipCard from '@/pages/order/order-components/vip-card.vue'; // 开通会员卡组件

export default {
	components: {
		vipCard
	},
	data() {
		return {
			payTypeyve, // 支付类型储值余额
			payTypeWxxcx, // 支付类型微信小程序支付
			payTypeWxapp, // 支付类型微信app支付
			payTypeZfbapp, // 支付类型支付宝app支付
			payTypeWxgzh, // 支付类型公众号微信支付
			payTypeH5wx, // 支付类型H5普通浏览器微信支付
			payTypeH5zfb, // 支付类型H5普通浏览器支付宝支付
			payTypeEnumObj, // 支付类型枚举对象

			isShowLoading: true, // 开屏动画

			payBtnFlag: true, // 支付按钮被点击状态 true可以点击, false不能点击

			goodsDetailId: '', // 要兑换商品的id
			goodsDetailOriginalImg: '', // 要兑换商品的预览图
			goodsDetailName: '', // 要兑换商品的名字
			goodsDetailRemark: '', // 要兑换商品的描述信息
			goodsDetailPintuanPrice: '', //  拼团价格
			gbId: '', // 团id

			// ============================================================================================================================================================================

			yve: 0, // 用户的余额
			templateIdList: [], // 模板id列表
			orderPrice: 0, // 订单金额
			payPrice: 0, // 实付金额
			defaultStatus: false, // 是否使用 余额抵扣 默认关闭
			payFlag: '',

			// 多规格
			isSpec: false, // 是否是多规格
			currentgoodsId: false, // 多规格 商品id
			currentgoodsPinPrice: 0, // 多规格 商品 拼团价
			specKeyStr: '', // 多规格 商品 已选规格字符串

			// ↓↓ 开通会员的选项卡片 数据
			vipOptionCardIsSelect: false, // 用户 是否同意开启 vip
			vipOptionCardIsOpen: false, // 是否显示 勾选vip 确认 开通会员 卡片
			vipOptionCardId: 0, // 展示的会员卡id
			vipOptionCardName: '', // 会员卡名字
			vipOptionCardTagBgColor: '', // 会员卡左上标签的背景色
			vipOptionCardTagIconImg: '', // 会员卡左上标签的 图标 图片地址
			vipOptionCardTagText: '', // 会员卡左上标签的 文字内容
			vipOptionCardTagTextColor: '', // 会员卡左上标签的 文字 颜色
			vipOptionCardTipBgColor: '', // 会员卡右上的提示气泡背景颜色
			vipOptionCardTipText: '', // 会员卡右上的提示气泡展示文字
			vipOptionCardTipTextColor: '', // 会员卡右上的提示气泡展示文字颜色
			vipOptionCardTime: '', // 会员卡的有效时间
			vipOptionCardPrice: 0 // 购买会员卡的价格
		};
	},

	onLoad(options) {
		let that = this;
		that.setDefaultPayTypeFn();

		// let selectGoods = JSON.parse(options.info);
		let selectGoods = uni.getStorageSync('pintuanInfo');

		that.goodsDetailId = selectGoods.goods_id;
		that.goodsDetailOriginalImg = selectGoods.original_img;
		that.goodsDetailName = selectGoods.goods_name;
		that.goodsDetailRemark = selectGoods.goods_remark;
		that.goodsDetailPintuanPrice = selectGoods.shop_price;
		that.gbId = selectGoods.gb_id ? selectGoods.gb_id : 0;

		that.isSpec = selectGoods.isSpec; // 是否是多规格
		that.currentgoodsId = selectGoods.currentgoodsId; // 多规格 商品id
		that.currentgoodsPinPrice = selectGoods.currentgoodsPinPrice; // 多规格 商品 拼团价
		that.specKeyStr = selectGoods.specKeyStr; // 多规格 商品 已选规格字符串

		that.getCommitOrderInfoFn();
		uni.setStorageSync('pintuanInfo', '');
	},
	computed: {
		disabledSwitch() {
			return this.yve <= 0;
		},
		// 合计待支付的钱数
		hejiPrice() {
			let that = this;
			if (that.defaultStatus) {
				return that.yve >= that.payPrice ? 0 : bigMinus(that.payPrice, that.yve);
			} else {
				return that.payPrice;
			}
		}
	},
	methods: {
		// 进入结算页面后设置默认的支付方式
		setDefaultPayTypeFn(){
			let that = this;
			// #ifdef MP-WEIXIN
			if (that.calcWeixinPayMiniprogram) {
				that.payFlag = payTypeWxxcx;
			}else{
				that.defaultStatus = true;
			}
			// #endif
			
			// #ifdef APP-PLUS
			if (that.calcWeixinPayAndroidApp) {
				that.payFlag = payTypeWxapp;
			} else if (that.calcZhifubaoPayAndroidApp) {
				that.payFlag = payTypeZfbapp;
			}else{
				that.defaultStatus = true;
			}
			// #endif
			// #ifdef H5
			if (that.globalBrowserIsWx) {
				if (that.calcWeixinofficialaccount) {
					that.payFlag = payTypeWxgzh;
				}else{
					that.defaultStatus = true;
				}
			} else {
				if (that.calcWeixinPayH5) {
					that.payFlag = payTypeH5wx;
				}else{
					that.defaultStatus = true;
				}
			}
			// #endif
		},
		// 设置当前的支付方式
		setPayFlagFn(flag) {
			this.payFlag = flag;
		},
		// 获取 提交订单的 页面 展示信息 (配送方式、如遇缺货....)
		async getCommitOrderInfoFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/order/fill_chaifen'
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let commitOrderInfoObj = assertObject(result.data.data);
					that.yve = transNumFn(commitOrderInfoObj.yue);
					that.getOrderInfoFn();
				} else {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
					that.isShowLoading = false;
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});

				that.isShowLoading = false;
			}
		},

		switchChangeFn(e) {
			let that = this;
			if (that.yve - 0 > 0) {
				this.defaultStatus = e.detail.value;
			} else {
				this.defaultStatus = false;
				uni.showToast({
					title: '余额不足',
					icon: 'none'
				});
			}
		},
		// 获取订单详情
		async getOrderInfoFn(fn, isShowLoading) {
			let that = this;
			let dataOptions = {};
			// #ifdef MP-WEIXIN
			dataOptions.Platform = 'wxMiniProgram';
			// #endif

			let data = {
				from: 'group',
				prom_type: 'group',
				goods: that.goodsDetailId,
				vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0,
				...dataOptions
			};

			if (that.isSpec) {
				data.group_goods_spec_id = that.currentgoodsId;
			}

			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/order/fill_order',
				data
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let orderInfo = assertObject(result.data.data);

					console.log(orderInfo, 'orderInfo  /api/order/fill_order', '\n');
					// 处理模板消息
					let templateIdList = assertArray(orderInfo.templateId);

					templateIdList = templateIdList
						.filter(item => item.mini_status == 1)
						.map(item => item.mini_template_id);
					that.templateIdList = templateIdList;

					let priceObj = assertObject(orderInfo.price);
					that.orderPrice = transNumFn(priceObj['订单金额']); // 订单金额
					that.payPrice = transNumFn(priceObj['实付金额']); // 实付金额

					// 开通vip选项卡 相关配置
					let vipOptionCard = assertObject(orderInfo.fill_content);
					that.vipOptionCardIsOpen = vipOptionCard.is_fill == 1; // 是否显示 勾选vip 确认 开通会员 卡片
					that.vipOptionCardId = vipOptionCard.vip_id; // 展示的会员卡id
					that.vipOptionCardName = vipOptionCard.fill_name; // 会员卡名字
					that.vipOptionCardTagBgColor = vipOptionCard.fill_bg_color; // 会员卡左上标签的背景色
					that.vipOptionCardTagIconImg = vipOptionCard.fill_icon; // 会员卡左上标签的 图标 图片地址
					that.vipOptionCardTagText = vipOptionCard.fill_con; // 会员卡左上标签的 文字内容
					that.vipOptionCardTagTextColor = vipOptionCard.fill_bq_color; // 会员卡左上标签的 文字 颜色
					that.vipOptionCardTipBgColor = vipOptionCard.fill_xz_color; // 会员卡右上的提示气泡背景颜色
					that.vipOptionCardTipText = vipOptionCard.fill_xz_con; // 会员卡右上的提示气泡展示文字
					that.vipOptionCardTipTextColor = vipOptionCard.fill_xzt_color; // 会员卡右上的提示气泡展示文字颜色
					that.vipOptionCardTime = vipOptionCard.time; // 会员卡的有效时间
					that.vipOptionCardPrice = transNumFn(vipOptionCard.vip_or_price); // 购买会员卡的价格
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
		// 弹出 获取 模板id权限 的窗口
		getTemplateResult() {
			let that = this;
			return new Promise((resFn, rejFn) => {
				uni.requestSubscribeMessage({
					tmplIds: that.templateIdList,
					success(res) {
						console.log('成功', '\n');
						resFn(res);
					},
					fail(e) {
						'失败', '\n', resFn(e);
					}
				});
			});
		},
		// 去支付按钮
		async payFn() {
			let that = this;
			if (!that.payBtnFlag) {
				return false;
			}
			that.payBtnFlag = false;
			let pay_price, // 支付的钱数
				pay_type, // 支付的类型
				balance_price; // 余额抵扣的金额

			let payPrice = that.payPrice; // 当前订单的实付金额 (商品 + 会员卡)

			if (that.defaultStatus) {
				pay_price = payPrice;
				pay_type = that.yve >= payPrice ? payTypeEnumObj[payTypeyve] : payTypeEnumObj[that.payFlag];
				balance_price = that.yve >= payPrice ? payPrice : that.yve;
			} else {
				pay_price = payPrice;
				pay_type = payTypeEnumObj[that.payFlag];
				balance_price = 0;
			}
			// #ifdef MP-WEIXIN
			// 未开启小程序微信支付 此时 只能用余额可以购买当前商品
			if (!that.calcWeixinPayMiniprogram) {
				// 用户使用余额支付并且 余额足够支付当前订单的总价格
				let { result: checkUseYveResult, msg: checkUseYveMsg } = that.checkUseYve();
				if (checkUseYveResult) {
					pay_type = payTypeEnumObj[payTypeyve];
				} else {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: checkUseYveMsg,
						success(e) {
							//确认后的回调
							console.log(e);
							// that.toBackFn()
						}
					});
					that.payBtnFlag = true;
					return false;
				}
			}
			// #endif

			// #ifdef APP-PLUS
			// 未开启app微信支付 和 app支付宝支付 此时 只能用余额可以购买当前商品
			if (!that.calcWeixinPayAndroidApp && !that.calcZhifubaoPayAndroidApp) {
				// 用户使用余额支付并且 余额足够支付当前订单的总价格
				let { result: checkUseYveResult, msg: checkUseYveMsg } = that.checkUseYve();
				if (checkUseYveResult) {
					pay_type = payTypeEnumObj[payTypeyve];
				} else {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: checkUseYveMsg,
						success(e) {
							//确认后的回调
							console.log(e);
							// that.toBackFn()
						}
					});
					that.payBtnFlag = true;
					return false;
				}
			}
			// #endif

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				if (!that.calcWeixinofficialaccount) {
					// 用户使用余额支付并且 余额足够支付当前订单的总价格
					let { result: checkUseYveResult, msg: checkUseYveMsg } = that.checkUseYve();
					if (checkUseYveResult) {
						pay_type = payTypeEnumObj[payTypeyve];
					} else {
						uni.showModal({
							showCancel: false, //不显示取消按钮
							title: checkUseYveMsg,
							success(e) {
								//确认后的回调
								console.log(e);
								// that.toBackFn()
							}
						});
						that.payBtnFlag = true;
						return false;
					}
				}
			} else {
				if (!that.calcWeixinPayH5) {
					// 用户使用余额支付并且 余额足够支付当前订单的总价格
					let { result: checkUseYveResult, msg: checkUseYveMsg } = that.checkUseYve();
					if (checkUseYveResult) {
						pay_type = payTypeEnumObj[payTypeyve];
					} else {
						uni.showModal({
							showCancel: false, //不显示取消按钮
							title: checkUseYveMsg,
							success(e) {
								//确认后的回调
								console.log(e);
								// that.toBackFn()
							}
						});
						that.payBtnFlag = true;
						return false;
					}
				}
			}

			// #endif

			// #ifdef MP-WEIXIN
			console.log('that.templateIdList', that.templateIdList);
			if (that.templateIdList.length > 0) {
				let templateResult = await that.getTemplateResult();
				console.log('uni.requestSubscribeMessage 返回结果', templateResult);
			}
			// #endif

			let objs = {
				gb_id: that.gbId,
				prom_type: 'group',
				from: 'group',
				goods_id: that.goodsDetailId,
				ord_price: that.orderPrice,
				pay_price: payPrice,
				pay_type,
				balance_price,
				vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0
			};

			// #ifdef MP-WEIXIN
			objs.pay_platform = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			objs.pay_platform = 'APP';
			// #endif

			// #ifdef H5

			if (that.globalBrowserIsWx) {
				objs.pay_platform = 'wxOfficialAccount';
			} else {
				objs.pay_platform = 'H5';
			}
			// #endif

			if (that.isSpec) {
				objs.group_goods_spec_id = that.currentgoodsId;
			}
			console.log('参数打印objs', objs);

			that.hideAllFn();
			uni.showLoading({});
			// 生成订单
			let result = await that.$request({
				method: 'POST',
				url: '/api/order/make_order',
				data: objs
			});

			console.log(
				'生成订单接口 /api/order/make_order 传的参数',
				objs,
				'\n',
				'生成订单接口 /api/order/make_order 返回的数据',
				result,
				'\n'
			);

			if (result.statusCode == 200) {
				if (result.data.code == 200 && assertObject(result.data.data).ord_id) {
					let type;
					console.log('pay_type', pay_type);
					if (pay_type == payTypeEnumObj[payTypeyve]) {
						// 余额
						type = 'balance';
					} else if (pay_type == payTypeEnumObj[payTypeWxxcx]) {
						// 小程序微信
						type = 'wechat';
					} else if (pay_type == payTypeEnumObj[payTypeZfbapp]) {
						// app支付宝
						type = 'alipay';
					} else if (pay_type == payTypeEnumObj[payTypeWxapp]) {
						// app微信
						type = 'wechatApp';
					} else if (pay_type == payTypeEnumObj[payTypeWxgzh]) {
						// 微信公众号
						type = 'wechatOfficialAccount';
					} else if (pay_type == payTypeEnumObj[payTypeH5wx]) {
						// h5 普通浏览器 微信支付
						type = 'wechatH5';
					} else if (pay_type == payTypeEnumObj[payTypeH5zfb]) {
						// h5 普通浏览器 支付宝支付
						type = 'alipayH5';
					}
					let Platform;

					// #ifdef MP-WEIXIN
					Platform = 'wxMiniProgram';
					// #endif

					// #ifdef APP-PLUS
					Platform = 'App';
					// #endif

					// #ifdef H5
					if (that.globalBrowserIsWx) {
						Platform = 'wxOfficialAccount';
					} else {
						Platform = 'H5';
					}
					// #endif

					let payResData = {
						ord_id: result.data.data.ord_id,
						Platform,
						type: type
					};

					let payOpt = {
						method: 'post',
						url: '/api/pay/pay',
						data: payResData
					};
					let payRes = await that.$request(payOpt);
					console.log('支付接口 /api/pay/pay 传的参数', payOpt);
					console.log('支付接口 /api/pay/pay 返回的数据', payRes);

					// 只是余额支付 就 跳详情
					if (pay_type == payTypeEnumObj[payTypeyve]) {
						that.hideAllFn();
						that.payBtnFlag = true;
						that.navigateToFn({
							type: 'redirectTo',
							url: `/packageA/pintuan/me?id=${result.data.data.gb_id}`
						});
						return false;
					}

					// #ifdef H5
					that.h5GzhPayFn(payRes, () => {
						that.hideAllFn();
						that.payBtnFlag = true;
						that.navigateToFn({
							type: 'redirectTo',
							url: `/packageA/pintuan/me?id=${result.data.data.gb_id}`
						});
					});
					return false;
					// #endif

					//数据返回后 处理方式  处理数据
					if (payRes.statusCode == 200) {
						let platform;

						// #ifdef MP-WEIXIN
						platform = 'wxMiniProgram';
						// #endif

						// #ifdef APP-PLUS
						platform = 'App';
						// #endif

						let payOptions;
						// #ifdef MP-WEIXIN
						payOptions = JSON.parse(payRes.data.data);
						// #endif

						// #ifdef APP-PLUS
						payOptions = {};
						if (pay_type == 4) {
							payOptions.provider = 'wxpay';
							payOptions.orderInfo = payRes.data.data;
						} else if (pay_type == 2) {
							payOptions.provider = 'alipay';
							payOptions.orderInfo = payRes.data;
						}
						// #endif

						let payMentOptions = {
							...payOptions,
							success(e) {
								that.hideAllFn();
								console.log('成功', e);
								that.payBtnFlag = true;
								// 跳详情
								that.navigateToFn({
									type: 'redirectTo',
									url: `/packageA/pintuan/me?id=${result.data.data.gb_id}`
								});
							},
							fail(e) {
								// 跳拼团列表
								that.hideAllFn();
								that.payBtnFlag = true;
								that.navigateToFn({
									type: 'redirectTo',
									url: `/packageA/pintuan/pintuan`
								});
								return false;
							}
						};
						console.log('payMentOptions 数据', payMentOptions);
						uni.requestPayment(payMentOptions);
					} else {
						that.hideAllFn();
						uni.showToast({
							icon: 'none',
							title: that.$errorMsg
						});
						that.payBtnFlag = true;
					}
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
					that.payBtnFlag = true;
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
				that.payBtnFlag = true;
			}

			return false;
		},
		// 选择会员卡
		selectVipOptionCardFn(e) {
			let that = this;
			that.vipOptionCardIsSelect = e;
			that.defaultStatus = false;
			that.setDefaultPayTypeFn();
			that.getOrderInfoFn(() => {}, true);
		},
		// #ifdef H5
		h5GzhPayFn(result, successFn) {
			let that = this;
			console.log('公众号支付返回的东西', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let gzhWxPayOptions = assertObject(result.data.data); // 公众号支付需要的数据

					console.log('gzhWxPayOptions 参数', gzhWxPayOptions);

					if (that.globalBrowserIsWx) {
						// 公众号支付
						WeixinJSBridge.invoke('getBrandWCPayRequest', gzhWxPayOptions, function(res) {
							console.log('jweixinModule.invoke 结果', res);
							if (res.err_msg == 'get_brand_wcpay_request:ok') {
								successFn && successFn();
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
							`${location.origin}${location.pathname}#/packageA/pintuan/pintuan`
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

		/*
			@description 是否可以使用余额支付 当前平台没有对应的第三方支付 只能使用余额支付的情况下 根据当前订单要付的钱数来提示对应的内容
			@return { Object }
				当result 为 真时表示可以使用余额支付
				当result 为 假时表示不能支付购买弹出对应的msg消息
		*/
		checkUseYve() {
			let that = this;
			// 用户使用余额支付并且 余额足够支付当前订单的总价格
			if (that.defaultStatus && that.payPrice <= that.yve) {
				return {
					result: true
				};
			} else {
				let title;
				// 用户使用余额支付 但是余额不够
				if (that.defaultStatus) {
					title = '余额不足';
				} else {
					// 不用余额支付 余额不够
					if (that.payPrice > that.yve) {
						title = '余额不足';
					} else {
						// 不用余额支付余额够 客户想用微信支付
						// #ifdef MP-WEIXIN
						title = '平台未开通小程序微信支付';
						// #endif
						// #ifdef APP-PLUS
						title = '平台未开通APP微信支付和APP支付宝支付';
						// #endif
						// #ifdef H5
						if (that.globalBrowserIsWx) {
							title = '平台未开通公众号微信支付';
						} else {
							title = '平台未开通h5微信支付';
						}
						// #endif
					}
				}
				return {
					result: false,
					msg: title
				};
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page,
.page {
	overflow: hidden;
	min-height: 100vh;
	background: $bg-grey-color;
}

.postType {
	margin-top: 20rpx;

	.postType-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		border-radius: 20rpx;
		background: #ffffff;

		.type-text {
			line-height: 88rpx;
			font-size: 36rpx;
			color: $grey1-color;
			font-weight: 600;
		}

		.select-item {
			display: flex;
			align-items: center;

			text {
				color: $grey1-color;
				text-indent: 0.5em;
				font-size: 26rpx;
			}
		}
	}
}

.seller-address {
	margin-top: 20rpx;
	color: $grey1-color;
	text-indent: 0.5em;
	font-size: 26rpx;
}

.address-block {
	padding-top: 20rpx;

	.address {
		position: relative;
		overflow: hidden;
		height: 128rpx;
		background: #ffffff;
		border-radius: 20rpx;

		.gb-image {
			position: absolute;
			bottom: 0;
			width: 702rpx;
			height: 20rpx;
		}

		.address-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			width: 100%;
			height: 120rpx;

			.address-icon {
				margin-right: 20rpx;
				font-size: 0;

				image {
					width: 38rpx;
					height: 46rpx;
				}
			}

			.address-cont {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.user-addres {
					display: flex;
					align-items: center;
					font-size: 0;

					text {
						display: inline-block;
						margin-right: 0.2em;
						font-size: 26rpx;
						color: $grey1-color;
						@include text-ellipsis;
						max-width: 15em;
					}
				}

				.user-info {
					display: flex;
					color: $grey2-color;
					font-size: 26rpx;

					.name {
						margin-right: 0.2em;
						@include text-ellipsis;
						max-width: 8em;
					}
				}
			}

			.icon-block {
			}

			.add-address-btn {
				color: $grey1-color;
				font-weight: 600;
			}
		}
	}
}

.goods-list-block {
	margin-top: 20rpx;
	margin-bottom: 10rpx;

	.title {
		padding: 0 20rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #ffffff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 88rpx;

		.h3 {
			// margin-left: 20rpx;
			font-size: 30rpx;
			font-weight: 600;
			color: $grey1-color;
		}

	}
}

.goods-list {
	border-radius: 0 0 20rpx 20rpx;
	padding: 0 20rpx;
	background: #ffffff;

	.item {
		display: flex;
		padding: 10rpx 0;
		height: 200rpx;
		border-top: 1px solid #f1f1f1;

		&:last-child {
		}

		.item-image-block {
			@include flex-center;
			margin: 0 20rpx;
			width: 156rpx;
			height: 100%;

			image {
				width: 150rpx;
				height: 150rpx;
			}
		}

		.item-description-block {
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			flex: 1;
			position: relative;

			.item-name,
			.item-description {
				display: flex;
				justify-content: space-between;
			}

			.item-name {
				color: $grey1-color;
				font-size: 30rpx;
				margin-top: 0.2em;
				line-height: 1.6em;

				.name- {
					max-width: 12em;
					@include text-ellipsis;
				}
			}

			.item-description {
				color: $grey2-color;
				font-size: 23rpx;
				line-height: 1.4em;

				.description- {
					max-width: 16em;
					@include text-ellipsis;
				}
			}

			.price-info-block {
				text-align: right;
				color: $grey2-color;
				font-size: 23rpx;
				line-height: 1.4em;

				.red-price {
					color: $red-color;
				}
			}
		}
	}

	.textarea {
		margin: 0.5em;
		padding: 0.5em;
		text-indent: 1em;
		font-size: 24rpx;
		background: #f7f7f7;
		height: 6em;
		width: 90%;
		color: #bdbdbd;
	}
}

.line-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90rpx;
	border-top: 1px solid #f1f1f1;

	.h6,
	.h5 {
		font-size: 26rpx;
		color: $grey1-color;
	}

	.h6 {
		display: flex;
		align-items: center;
		color: $grey1-color;

		.price {
			margin-left: 0.5em;
			font-size: 30rpx;
			font-weight: 600;
		}
	}

	.inp-block {
		width: 80%;

		input {
			padding-left: 0.2em;
			font-size: 26rpx;
			font-weight: 600;
			color: $grey1-color;
			background: #f7f7f7;
		}
	}
}

.line-cont-block {
	.line-cont {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		border-top: 1px solid #f1f1f1;
		font-size: 22rpx;
		padding: 0 20rpx;
	}
}

.deg90 {
	transform: rotate(90deg);
}

.useRedCard-block {
	.useRedCard-cont {
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		border-top: 1px solid #f1f1f1;
		align-items: center;

		.card-info {
			display: flex;
			align-items: center;
			height: 45rpx;

			.card-name {
				margin-right: 0.5em;
				font-weight: 600;
				font-size: 30rpx;
				color: $grey1-color;
			}

			.youhui {
				font-size: 24rpx;
				color: $grey2-color;
			}
		}

		.time {
			font-size: 23rpx;
			color: $grey2-color;
		}
	}
}

.pay-type {
	overflow: hidden;
	.content-wrap {
		margin: 10rpx 0;
	}

	.cont-block {
		padding: 0 20rpx;
		border-radius: 20rpx;
		background: #ffffff;

		.h3 {
			line-height: 88rpx;
			font-size: 36rpx;
			color: $grey1-color;
			font-weight: 600;
		}

		.line-block-list {
			.line-block:first-child {
				border-top: none;
			}

			.line-block {
				border-top: 1px solid #f8f8f8;

				.content-wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 120rpx;
					padding: 0;

					.left-block {
						display: flex;
						align-items: center;

						.image-block {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;

							image {
								width: 100%;
								height: 100%;
							}
						}

						text {
							color: $grey1-color;
							text-indent: 0.5em;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
}

.order-btn-block {
	position: fixed;
	width: 100%;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24rpx;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	.price-all {
		display: flex;
		align-items: flex-end;
		font-size: 23rpx;
		color: $grey2-color;
		@include shop-price-block-lr;

		.shop-price-block-lr {
			text-indent: 0.3em;
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
</style>
