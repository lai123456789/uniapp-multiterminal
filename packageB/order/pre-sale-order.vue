<template>
	<view class="root-page">
		<loading-css :is-show="isShowLoading"></loading-css>

		<view class="order-info-wrap">
			<view class="content-wrap">
				<view class="goods-info-block">
					<view class="left-image-wraper">
						<view class="image-wrap"><img-bg-css :src="goodsImage"></img-bg-css></view>
					</view>

					<view class="right-description-wrap">
						<view class="goods-name-block">{{ goodsName }}</view>
						<view class="goods-description">
							{{ spec == oneSpec ? goodsDescription : `已选: ${specKeyStr}` }}
						</view>
					</view>

					<view class="price-wrap">
						<view class="price-block">
							<view class="price-icon">¥</view>
							<view class="price-text">{{ oneGoodsPrice | filterTransNum }}</view>
						</view>
						<view class="buy-num-text">×{{ buyNum }}</view>
					</view>
				</view>

				<view class="buy-num">
					<view class="title-text"><view class="title">数量</view></view>
					<view class="control-block">
						<view
							class="iconfont icon-jianshao"
							:style="{
								color: calcJianBtnStyle,
								fontSize: '30rpx',
								background: '#ffffff',
								border: `1px solid ${calcJianBtnStyle}`
							}"
							@click="setBuyNumFn('-')"
						></view>
						<input class="input-dom" type="number" v-model="buyNum" @blur="inputBlurFn" />
						<view
							class="iconfont icon-jia"
							:style="{
								color: '#ffffff',
								fontSize: '30rpx',
								background: calcAddBtnBackground,
								border: 'none'
							}"
							@click="setBuyNumFn('+')"
						></view>
					</view>
				</view>

				<view class="title-text" :style="{ color: configInfo.web_site_color }">{{ jdtTitleText }}</view>

				<!-- 步骤条 -->
				<view class="steps-block">
					<!-- 步骤条前的符号 -->
					<view class="icon-block">
						<view class="before" :style="{ background: configInfo.web_site_color }"></view>
						<view class="after"></view>
						<view class="line-icon top" :style="{ background: configInfo.web_site_color }"></view>
						<view class="line-icon bottom"></view>
					</view>
					<view class="steps-row dingjin">
						<view class="text">定金</view>
						<view class="price">{{ preSaleDingJin }}</view>
					</view>
					<view class="steps-row weikuan">
						<view class="text">尾款</view>
						<view class="price">{{ weikuan }}</view>
					</view>
				</view>

				<view class="title-text" style="margin-bottom: 20rpx;">
					{{ calcPreSaleWeikuanStartStr }} 开始支付尾款
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

		<view class="pay-type-wrap">
			<view class="content-wrap">
				<view class="title-text">支付方式</view>

				<view class="line-block-list">
					<view class="line-block">
						<view class="left-block">
							<view class="image-block"><yve-icon></yve-icon></view>
							<view class="left-icon-text">
								储值余额
								<block v-if="yve > 0">({{ yve | filterTransNum }})</block>
							</view>
						</view>
						<view class="right-block">
							<block v-if="yve == 0">{{ yve | filterTransNum }}</block>
							<switch
								v-else
								style="transform: translateX(20rpx) scale(0.7)"
								:checked="defaultStatus"
								:color="configInfo.web_site_color"
								@change="switchChangeFn"
							></switch>
						</view>
					</view>

					<!-- #ifdef MP-WEIXIN -->
					<view class="line-block" @click="setPayTypeFn(payTypeWxxcx)" v-if="calcWeixinPayMiniprogram">
						<view class="left-block">
							<view class="image-block">
								<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 60rpx;"></view>
							</view>
							<view class="left-icon-text">微信</view>
						</view>
						<view class="right-block">
							<view
								v-show="payType == payTypeWxxcx"
								class="iconfont icon-circle"
								:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
							></view>
							<view
								v-show="payType != payTypeWxxcx"
								class="iconfont icon-circle1"
								:style="{ 'font-size': '20px', color: '#c7c7c7' }"
							></view>
						</view>
					</view>
					<!-- #endif -->

					<!-- #ifdef APP-PLUS -->
					<view class="line-block" @click="setPayTypeFn(payTypeWxapp)" v-if="calcWeixinPayAndroidApp">
						<view class="left-block">
							<view class="image-block">
								<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 60rpx;"></view>
							</view>
							<view class="left-icon-text">微信</view>
						</view>
						<view class="right-block">
							<view
								v-show="payType == payTypeWxapp"
								class="iconfont icon-circle"
								:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
							></view>
							<view
								v-show="payType != payTypeWxapp"
								class="iconfont icon-circle1"
								:style="{ 'font-size': '20px', color: '#c7c7c7' }"
							></view>
						</view>
					</view>

					<view class="line-block" @click="setPayTypeFn(payTypeZfbapp)" v-if="calcZhifubaoPayAndroidApp">
						<view class="left-block">
							<view class="image-block">
								<view class="iconfont icon-zhifubao" style="color: #5a9ef7;font-size: 60rpx;"></view>
							</view>
							<view class="left-icon-text">支付宝</view>
						</view>
						<view class="right-block">
							<view
								v-show="payType == payTypeZfbapp"
								class="iconfont icon-circle"
								:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
							></view>
							<view
								v-show="payType != payTypeZfbapp"
								class="iconfont icon-circle1"
								:style="{ 'font-size': '20px', color: '#c7c7c7' }"
							></view>
						</view>
					</view>
					<!-- #endif -->

					<!-- #ifdef H5 -->
					<view
						class="line-block"
						@click="setPayTypeFn(payTypeWxgzh)"
						v-if="globalBrowserIsWx && calcWeixinofficialaccount"
					>
						<view class="left-block">
							<view class="image-block">
								<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 60rpx;"></view>
							</view>
							<view class="left-icon-text">微信</view>
						</view>
						<view class="right-block">
							<view
								v-show="payType == payTypeWxgzh"
								class="iconfont icon-circle"
								:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
							></view>
							<view
								v-show="payType != payTypeWxgzh"
								class="iconfont icon-circle1"
								:style="{ 'font-size': '20px', color: '#c7c7c7' }"
							></view>
						</view>
					</view>

					<view
						class="line-block"
						@click="setPayTypeFn(payTypeH5wx)"
						v-if="!globalBrowserIsWx && calcWeixinPayH5"
					>
						<view class="left-block">
							<view class="image-block">
								<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 60rpx;"></view>
							</view>
							<view class="left-icon-text">微信</view>
						</view>
						<view class="right-block">
							<view
								v-show="payType == payTypeH5wx"
								class="iconfont icon-circle"
								:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
							></view>
							<view
								v-show="payType != payTypeH5wx"
								class="iconfont icon-circle1"
								:style="{ 'font-size': '20px', color: '#c7c7c7' }"
							></view>
						</view>
					</view>

					<!-- 
					普通浏览器(非微信客户端浏览器) 暂时取消支付宝支付
					<view class="line-block" @click="setPayTypeFn(payTypeH5zfb)" v-if="!globalBrowserIsWx">
						<view class="left-block">
							<view class="image-block">
								<view class="iconfont icon-zhifubao" style="color: #5a9ef7;font-size: 60rpx;"></view>
							</view>
							<view class="left-icon-text">支付宝</view>
						</view>
						<view class="right-block">
							<view
								v-show="payType == payTypeH5zfb"
								class="iconfont icon-circle"
								:style="{ 'font-size': '22px', color: configInfo.web_site_color }"
							></view>
							<view
								v-show="payType != payTypeH5zfb"
								class="iconfont icon-circle1"
								:style="{ 'font-size': '20px', color: '#c7c7c7' }"
							></view>
						</view>
					</view> 
					 -->
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="bottom-topay-wrap">
			<view class="bottom-topay-bar">
				<view class="left-text-block">
					<view class="title-text">待支付 合计:</view>
					<view class="price-block">
						<view class="icon">¥</view>
						<view class="price">{{ hejiPrice | filterTransNum }}</view>
					</view>
				</view>
				<view
					class="right-btn"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color }"
					@click="$onceClick(toPayFn)"
				>
					提交订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	transNumFn,
	bigTimes,
	timeStr2timeObj,
	assertObject,
	assertArray,
	assertString,
	bigMinus
} from '@/tools/tools.js';

import {
	payTypeyve,
	payTypeWxxcx,
	payTypeWxapp,
	payTypeZfbapp,
	payTypeWxgzh,
	payTypeH5wx,
	payTypeH5zfb,
	payTypeEnumObj
} from '@/tools/const.js';

import vipCard from '@/packageB/order/order-components/vip-card.vue'; // 开通会员卡组件
import { one, all, oneSpec, twoSpec } from '@/packageB/goods-detail/const.js'; // 几个常量字符串


export default {
	components: {
		vipCard
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			// ↓↓ 商品数据
			spec: '', // 单规格oneSpec--多规格 two
			one,
			all,
			oneSpec,
			twoSpec,
			goodsId: null, // 商品id
			goodsImage: '', // 商品图片
			goodsName: '', // 商品名字
			goodsDescription: '', // 商品描述

			specKeyStr: '', // 当前选中规格的文字描述

			buyNum: 1, // 购买数量
			preSaleDingJin: 0, // 商品预售 定金
			weikuan: 0, // 尾款
			oneGoodsPrice: 0, // 一个商品的价格
			preSaleWeikuanStart: '', // 开始付尾款时间
			goodsCount: 10, // 商品库存
			specId: null, // 规格id
			templateId: [], // 模板消息id

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
			vipOptionCardPrice: 0, // 购买会员卡的价格

			jdtTitleText: '', // 进度条上面的标题信息
			defaultStatus: false, // 是否使用余额抵扣
			yve: 0, // 账户余额
			shifuJine: 0, // 实付金额
			dingdanJine: 0, // 订单金额
			payType: '', // 客户选的支付类型
			payTypeyve, // 支付类型储值余额 (枚举常量字符串)
			payTypeWxxcx, // 支付类型微信小程序支付 (枚举常量字符串)
			payTypeWxapp, // 支付类型微信app支付 (枚举常量字符串)
			payTypeZfbapp, // 支付类型支付宝app支付 (枚举常量字符串)
			payTypeWxgzh,
			payTypeH5wx,
			payTypeH5zfb
		};
	},
	onShow() {
		uni.setStorageSync('orderZhifuLoadCont', 0);
		uni.setStorageSync('orderZhifuReloadFlag', 0);
	},
	onLoad(options) {
		let that = this;

		that.setDefaultPayTypeFn();

		let goodsInfo = uni.getStorageSync('goodsInfo');
		/*
		let goodsInfo = {
			goodsDescription: '绿色健康食品西蓝花',
			goodsId: '117',
			goodsImage: 'http://192.168.1.15/uploads/images/16148600026040cee282342.jpg',
			goodsName: '西蓝花',
			buyNum: 1,
			spec: 'oneSpec',
			preSaleDingJin: 33.5,
			preSaleWeikuanStart: '2021-03-04 00:00:00~2021-03-07 00:00:00',
			goodsCount: 20
		};
		 */
		uni.setStorageSync('goodsInfo', '');
		console.log('预售页面带过来的商品信息', goodsInfo);
		that.spec = goodsInfo.spec; // 单规格oneSpec--多规格 two
		that.goodsId = goodsInfo.goodsId; // 商品id
		that.goodsImage = goodsInfo.goodsImage; // 商品图片
		that.goodsName = goodsInfo.goodsName; // 商品名字
		that.goodsDescription = goodsInfo.goodsDescription; // 商品描述
		that.specKeyStr = goodsInfo.specKeyStr; // 当前选中规格的文字描述
		that.buyNum = goodsInfo.buyNum; // 购买数量
		that.oneGoodsPrice = goodsInfo.oneGoodsPrice; // 一个商品的价格
		that.preSaleWeikuanStart = goodsInfo.preSaleWeikuanStart; // 开始付尾款时间
		that.goodsCount = goodsInfo.goodsCount; // 库存
		// 无规格商品
		if (that.spec == oneSpec) {
		} else if (that.spec == twoSpec) {
			// 多规格商品
			that.specId = goodsInfo.specId; // 规格id
		}
		that.getCaifenFn();
	},
	methods: {
		// 进入结算页面后设置默认的支付方式
		setDefaultPayTypeFn(){
			let that = this;
			// #ifdef MP-WEIXIN
			if (that.calcWeixinPayMiniprogram) {
				that.payType = payTypeWxxcx;
			}else{
				that.defaultStatus = true
			}
			// #endif
	
			// #ifdef APP-PLUS
			if (that.calcWeixinPayAndroidApp) {
				that.payType = payTypeWxapp;
			} else if (that.calcZhifubaoPayAndroidApp) {
				that.payType = payTypeZfbapp;
			}else{
				that.defaultStatus = true
			}
			// #endif
	
			// #ifdef H5
			if (that.globalBrowserIsWx) {
				if (that.calcWeixinofficialaccount) {
					that.payType = payTypeWxgzh;
				}else{
					that.defaultStatus = true
				}
			} else {
				if (that.calcWeixinPayH5) {
					that.payType = payTypeH5wx;
				}else{
					that.defaultStatus = true
				}
			}
			// #endif
		},
		// 设置购买数量
		setBuyNumFn(flag) {
			let that = this;
			if (that.goodsCount <= 0) {
				return false;
			}
			if (flag == '+') {
				// 超过库存后不能添加
				if (that.buyNum >= that.goodsCount) {
					that.buyNum = that.goodsCount;
					return false;
				}
				that.buyNum++;
			} else if (flag == '-') {
				if (that.buyNum <= 1) {
					that.buyNum = 1;
				} else {
					that.buyNum--;
				}
			}
			that.defaultStatus = false;
			that.setDefaultPayTypeFn();
			that.getOrderInfoFn(() => {}, true);
		},
		// 光标失焦
		inputBlurFn(e) {
			let that = this;
			if (that.goodsCount <= 0) {
				that.buyNum = 1;
				return false;
			}
			let buyNum = transNumFn(e.detail.value);
			if (buyNum <= 1) {
				buyNum = 1;
			}

			if (buyNum > that.goodsCount) {
				buyNum = that.goodsCount;
			}
			that.buyNum = buyNum;
			console.log(that.buyNum);
			that.defaultStatus = false;
			that.setDefaultPayTypeFn();
			that.getOrderInfoFn(() => {}, true);
		},
		// 获取拆分的数据 (余额)
		async getCaifenFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/order/fill_chaifen'
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.yve = transNumFn(assertObject(result.data.data).yue);
					that.getOrderInfoFn();
				} else {
					that.isShowLoading = false;
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				that.isShowLoading = false;
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},
		// 根据商品获取订单信息
		async getOrderInfoFn(fn, isShowLoading) {
			let that = this;
			if (isShowLoading) {
				uni.showLoading({});
			}
			// 平台类型
			let platformType;
			// #ifdef MP-WEIXIN
			platformType = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			platformType = 'APP';
			// #endif

			// 规格id
			let goodsSpecInfo = {};
			if (that.spec == twoSpec) {
				goodsSpecInfo.group_goods_spec_id = that.specId;
			}
			// 参数信息
			let opt = {
				from: 'pre_sale_deposit',
				prom_type: 'pre_sale_deposit',
				goods: that.goodsId,
				Platform: platformType,
				...goodsSpecInfo,
				vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0,
				buy_num: that.buyNum
			};

			let result = await that.$request({
				url: '/api/order/fill_order',
				data: opt
			});
			console.log('展示页面信息接口 /api/order/fill_order 返回数据', result);
			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);

					// 处理 模板消息
					that.templateId = assertArray(resultObj.templateId)
						.filter(item => {
							return item.mini_status == 1;
						})
						.map(item => {
							return item.mini_template_id;
						});

					// 开通vip选项卡 相关配置
					let vipOptionCard = assertObject(resultObj.fill_content);
					that.vipOptionCardIsOpen = vipOptionCard.is_fill == 1; // 是否显示 勾选vip 确认 开通会员 卡片
					that.vipOptionCardId = transNumFn(vipOptionCard.vip_id); // 展示的会员卡id
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

					// 定金 尾款
					let jdtInfo = assertObject(resultObj.preSaleJdt); // 进度条信息
					that.jdtTitleText = assertString(jdtInfo.text); // 进度条上面的标题信息

					let jdArr = assertArray(jdtInfo.jd); // 进度信息
					that.preSaleDingJin = assertObject(jdArr[0]).money; // 定金
					that.weikuan = assertObject(jdArr[1]).money; // 尾款

					// 价格
					let priceObj = assertObject(resultObj.price);

					that.shifuJine = transNumFn(priceObj['实付金额']); // 实付金额
					that.dingdanJine = transNumFn(priceObj['订单金额']); // 订单金额

					that.hideAllFn();
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
			that.isShowLoading = false;
			fn && fn();
		},
		// 获取发送模板消息权限 (弹框形式给用户)
		getTemplateId() {
			let that = this;
			return new Promise((resFn, rejFn) => {
				uni.requestSubscribeMessage({
					tmplIds: that.templateId,
					success(res) {
						resFn(res);
					},
					fail(e) {
						rejFn(e);
					},
					complete(e) {
						console.log('模板消息 uni.requestSubscribeMessage 接口返回的东西', e);
					}
				});
			});
		},
		// 选择会员卡
		selectVipOptionCardFn(e) {
			let that = this;
			that.vipOptionCardIsSelect = e;
			that.defaultStatus = false;
			that.setDefaultPayTypeFn();
			that.getOrderInfoFn(() => {}, true);
		},

		// 切换 是否使余额
		switchChangeFn(e) {
			let that = this;
			if (that.yve > 0) {
				that.defaultStatus = e.detail.value;
			} else {
				that.defaultStatus = false;
				uni.showToast({
					title: '余额不足',
					icon: 'none'
				});
			}
		},
		// 设置支付类型
		setPayTypeFn(type) {
			this.payType = type;
		},
		// 去支付
		async toPayFn() {
			let that = this;

			let balancePrice, payType, payPrice;

			if (that.defaultStatus) {
				balancePrice = that.yve >= that.shifuJine ? that.shifuJine : that.yve;
				payPrice = that.shifuJine;
				payType = that.yve >= that.shifuJine ? payTypeEnumObj[payTypeyve] : payTypeEnumObj[that.payType];
			} else {
				balancePrice = 0;
				payPrice = that.shifuJine;
				payType = payTypeEnumObj[that.payType];
			}

			// #ifdef MP-WEIXIN
			// 未开启小程序微信支付 此时 只能用余额可以购买当前商品
			if (!that.calcWeixinPayMiniprogram) {
				// 用户使用余额支付并且 余额足够支付当前订单的总价格
				let { result: checkUseYveResult, msg: checkUseYveMsg } = that.checkUseYve();
				if (checkUseYveResult) {
					payType = payTypeEnumObj[payTypeyve];
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
					payType = payTypeEnumObj[payTypeyve];
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
						payType = payTypeEnumObj[payTypeyve];
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
						return false;
					}
				}
			} else {
				if (!that.calcWeixinPayH5) {
					// 用户使用余额支付并且 余额足够支付当前订单的总价格
					let { result: checkUseYveResult, msg: checkUseYveMsg } = that.checkUseYve();
					if (checkUseYveResult) {
						payType = payTypeEnumObj[payTypeyve];
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
						return false;
					}
				}
			}

			// #endif

			let specIdObj = {};

			if (that.spec == twoSpec) {
				specIdObj.group_goods_spec_id = that.specId;
			}
			// #ifdef MP-WEIXIN
			if (that.templateId.length > 0) {
				let templateId = await that.getTemplateId();
				console.log('模板消息', templateId);
			}
			// #endif

			let opt = {
				prom_type: 'pre_sale',
				from: 'pre_sale_deposit',
				goods_id: that.goodsId,
				...specIdObj,
				ord_price: that.dingdanJine,
				balance_price: balancePrice,
				pay_type: payType,
				pay_price: payPrice,
				vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0,
				buy_num: that.buyNum,
				ord_id: 0
			};

			that.hideAllFn();
			uni.showLoading({});
			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/order/make_order',
				data: opt
			});
			console.log('生成订单接口 /api/order/make_order 返回数据', result);

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let ordId = assertObject(result.data.data).ord_id;
					that.hideAllFn();

					that.navigateToFn({
						url: `/pages/order-state/zhifu?ord_id=${ordId}`,
						type: 'redirectTo'
					});
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},
		/*
			@description 是否可以使用余额支付 当前平台没有对应的第三方支付 只能使用余额支付的情况下 根据当前订单要付的钱数来提示对应的内容
			@return { Object }
				当result 为 真时表示可以使用余额支付
				当result 为 假时表示不能支付购买弹出对应的msg消息
		*/
		checkUseYve() {
			let that = this;
			// 用户使用余额支付并且 余额足够支付当前订单的总价格
			if (that.defaultStatus && that.shifuJine <= that.yve) {
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
					if (that.shifuJine > that.yve) {
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
	}, // <------  methods 结束
	computed: {
		// 页面上展示的价格  定金 * 数量
		calcPreSaleDingJin() {
			let that = this;
			return false;
			return transNumFn(bigTimes(transNumFn(that.buyNum), transNumFn(that.preSaleDingJin)));
		},
		// 网购物车里添加 的按钮背景色
		// 购买数量 加 按钮的样式
		calcAddBtnBackground() {
			let that = this;
			if (that.goodsCount <= 0 || that.buyNum >= that.goodsCount) {
				return '#888888';
			}
			return that.configInfo.web_site_color;
		},
		// 网购物车里添加 的按钮背景色
		// 购买数量 减 按钮的样式
		calcJianBtnStyle() {
			let that = this;
			if (that.goodsCount <= 0 || that.buyNum <= 1) {
				return '#888888';
			}
			return that.configInfo.web_site_color;
		},
		// 开始付尾款的时间
		calcPreSaleWeikuanStartStr() {
			let that = this;
			let { month, day, hours, minutes } = timeStr2timeObj(that.preSaleWeikuanStart.split('~')[0]);
			return `${month}.${day} ${hours}:${minutes}`;
		},
		// 返回 待支付 合计的钱数
		hejiPrice() {
			let that = this;
			if (that.defaultStatus) {
				return that.yve >= that.shifuJine ? 0 : bigMinus(that.shifuJine, that.yve);
			} else {
				return that.shifuJine;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.root-page {
	.order-info-wrap {
		padding: 12rpx 0;
		overflow: hidden;
		.content-wrap {
			margin: 0 24rpx;
			background: #ffffff;
			border-radius: 16rpx;
			overflow: hidden;

			.goods-info-block {
				display: flex;
				align-items: center;
				position: relative;
				padding: 20rpx 0;
				font-size: 0;

				.left-image-wraper {
					position: relative;
					width: 202rpx;
					height: 202rpx;
					margin-right: 10rpx;

					.image-wrap {
						padding: 10rpx;
						width: 100%;
						height: 100%;
					}
				}

				.right-description-wrap {
					flex: 1;
					height: 182rpx;

					.goods-name-block {
						width: 100%;
						height: 72rpx;
						line-height: 1.4;
						font-size: 26rpx;
						color: #374050;
						font-weight: bold;
						text-overflow: ellipsis;
						/*设置溢出显示类型为...*/
						-webkit-line-clamp: 2;
						/*设置显示的行数*/
						overflow: hidden;
						/*隐藏多于行*/
						display: -webkit-box;
						/*将对象作为弹性伸缩盒子模型显示*/
						-webkit-box-orient: vertical;
					}

					.goods-description {
						width: 100%;
						height: 62rpx;
						line-height: 1.4;
						font-size: 22rpx;
						color: #91939c;
						text-overflow: ellipsis;
						/*设置溢出显示类型为...*/
						-webkit-line-clamp: 2;
						/*设置显示的行数*/
						overflow: hidden;
						/*隐藏多于行*/
						display: -webkit-box;
						/*将对象作为弹性伸缩盒子模型显示*/
						-webkit-box-orient: vertical;
					}
				}

				.price-wrap {
					width: 120rpx;
					height: 182rpx;

					.price-block {
						height: 40rpx;
						color: #eb3c39;
						font-weight: bold;
						text-align: right;
						white-space: nowrap;

						.price-icon {
							display: inline-block;
							margin-right: 2rpx;
							line-height: 40rpx;
							font-size: 18rpx;
							vertical-align: bottom;
						}

						.price-text {
							flex: 1;
							display: inline-block;
							line-height: 40rpx;
							font-size: 28rpx;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							vertical-align: bottom;
						}
					}
					.buy-num-text {
						font-size: 24rpx;
						color: #91939c;
						text-align: right;
					}
				}
			}

			.buy-num {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;

				.title-text {
					display: inline-block;
					.title {
						display: inline-block;
						font-size: 30rpx;
						color: #2a2a2a;
						line-height: 50rpx;
						white-space: nowrap;
						opacity: hidden;
					}
				}

				.control-block {
					display: flex;

					.iconfont {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 48rpx;
						height: 48rpx;

						border-radius: 50%;
						border: 1px solid #888888;
					}

					.input-dom {
						margin: 0 10rpx;
						width: 70rpx;
						font-size: 30rpx;
						text-align: center;
					}
				}
			}
			.title-text {
				font-size: 28rpx;
				color: #2d2d2d;
			}
			.steps-block {
				display: flex;
				flex-direction: column;
				position: relative;
				padding-left: 110rpx;
				height: 160rpx;

				.icon-block {
					position: absolute;
					top: 50%;
					left: 80rpx;
					width: 14rpx;
					height: 100rpx;
					transform: translateY(-50%);
					.before,
					.after {
						position: absolute;
						left: 0;
						width: 14rpx;
						height: 14rpx;
						border-radius: 10000rpx;
						background: #909090;
					}
					.before {
						top: 4rpx;
					}
					.after {
						bottom: 0;
					}
					.line-icon {
						position: absolute;
						left: 50%;
						width: 2px;
						height: 50rpx;
						transform: translateX(-50%);
						background: #909090;
						&.top {
							top: 4rpx;
						}
						&.bottom {
							bottom: 0;
							&::after {
								content: '';
								display: block;
								position: absolute;
								z-index: 10;
								top: 0;
								left: 50%;
								width: 4px;
								height: 2px;
								transform: translateY(-50%) translateX(-50%);
								background: #ffffff;
							}
						}
					}
				}

				.steps-row {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;
					&.dingjin {
						color: $red-color;
					}
					&.weikuan {
						color: #000000;
					}
					.text {
						font-size: 26rpx;
					}
					.price {
						font-size: 26rpx;
						font-weight: 600;
					}
				}
			}
		}
	}

	.pay-type-wrap {
		padding: 12rpx 0;
		overflow: hidden;
		.content-wrap {
			margin: 0 24rpx;
			background: #ffffff;
			border-radius: 16rpx;
			overflow: hidden;
			.title-text {
				line-height: 88rpx;
				font-size: 36rpx;
				color: $grey1-color;
				font-weight: 600;
			}
			.line-block-list {
				.line-block {
					border-top: 1px solid #f8f8f8;
					&:first-child {
						border-top: none;
					}
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
						}
						.left-icon-text {
							color: $grey1-color;
							text-indent: 0.5em;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
	.bottom-topay-wrap {
		padding: 12rpx 0 0;
		height: 112rpx;
		overflow: hidden;
		.bottom-topay-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			padding: 0 24rpx;
			width: 100%;
			height: 100rpx;
			background: #ffffff;
			.left-text-block {
				font-size: 0;
				.title-text {
					display: inline-block;
					margin-right: 10rpx;
					vertical-align: baseline;
					font-size: 23rpx;
					color: $grey2-color;
				}
				.price-block {
					display: inline-block;
					vertical-align: baseline;
					font-weight: 600;
					.icon {
						display: inline-block;
						vertical-align: baseline;
						color: $red-color;
						font-size: 18rpx;
					}
					.price {
						display: inline-block;
						vertical-align: baseline;
						color: $red-color;
						font-size: 28rpx;
					}
				}
			}
			.right-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 240rpx;
				height: 88rpx;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
}
</style>
