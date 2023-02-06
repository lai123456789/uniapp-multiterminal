<!-- 
	付尾款页面
-->
<template>
	<view class="root-page">
		<loading-css :is-show="isShowLoading"></loading-css>

		<pei-type
			:pei-type-arr="peiTypeArr"
			:pei-type-active="peiTypeActive"
			@setPeiTypeIndexFn="setPeiTypeIndexFn"
		></pei-type>

		<!-- 配送方式是 自提的情况下 展示的商家信息 -->
		<!-- 
		<view class="seller-address-wrap" v-if="calcPeiTypeId == peiTypeEnumObj[peiTypeZiti]">
			<view class="content-wrap">
				<view>提货地点:{{ sellerAddress }}</view>
				<view>店长信息:{{ sellerMobile }}</view>
			</view>
		</view>
		 -->

		<zitidian-show-seller
			v-if="calcPeiTypeId == peiTypeEnumObj[peiTypeZiti]"
			:seller-image="sellerImage"
			:seller-name="sellerName"
			:seller-tel="sellerMobile"
			:seller-open-time="sellerOpenTime"
			:seller-address="sellerAddress"
		></zitidian-show-seller>

		<!-- 展示用户地址组件 -->
		<user-address
			:is-show-address="isShowAddress"
			:address-is-set="addressIsSet"
			:address-user-name="addressUserName"
			:address-user-tel="addressUserTel"
			:address-text="addressText"
			:address-tag-name="addressTagName"
		></user-address>

		<!-- 展示在页面上的自提点 -->
		<zitidian-show
			v-if="calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]"
			:zitidian-info="currentzitidianInfo"
			:zitidian-is-all-not-range="zitidianIsAllNotRange"
			@openListModalFn="setduozitiModalFlagFn(true)"
		></zitidian-show>

		<!-- 自提点列表的模态框组件 -->
		<duoziti-modal
			:is-show="duozitiModalFlag"
			:zitidian-list="zitidianList"
			@closeFn="setduozitiModalFlagFn(false)"
			@selectZitiFn="selectZitiFn"
		></duoziti-modal>

		<!-- 订单 商品的一些信息 -->
		<view class="order-goods-info-wrap">
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
					</view>
				</view>

				<view class="title-text" :style="{ color: configInfo.web_site_color }">{{ jdtTitleText }}</view>

				<!-- 步骤条 -->
				<view class="steps-block">
					<!-- 步骤条前的符号 -->
					<view class="icon-block">
						<view class="before" :style="{ background: configInfo.web_site_color }"></view>
						<view class="after" :style="{ background: configInfo.web_site_color }"></view>
						<view class="line-icon top" :style="{ background: configInfo.web_site_color }"></view>
						<view class="line-icon bottom" :style="{ background: configInfo.web_site_color }"></view>
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
			</view>
		</view>

		<!-- 订单 优惠 打折 的一些信息 -->
		<view class="order-coupon-info-wrap">
			<view class="content-wrap">
				<!-- 优惠券 -->
				<view class="line-block" style="border: none;" @click="openCouponModalFn">
					<view class="line-left-title-text">优惠券</view>
					<view class="line-right-content-text">
						{{ couponText }}
						<!-- 
						<view class="tip-red-text">
							<block v-if="true">(无可用优惠券)</block>
							<block v-else>{{ '不可使用信息' }}</block>
						</view>
						 -->
						<view
							class="iconfont icon-arrow-right-copy-copy"
							color="#374050"
							style="display: inline-block;font-size: 16px;"
						></view>
					</view>
				</view>

				<view class="line-block" v-if="calcPeiTypeId != peiTypeEnumObj[peiTypeZiti]">
					<view class="line-left-title-text">
						{{ calcPeiTypeId == peiTypeEnumObj[peiTypeKuaidi] ? '快递费' : '配送费' }}
					</view>

					<!-- 第三方配送 -->
					<view class="line-right-content-text" v-if="calcIsThirdPeiType">
						<block v-if="thirdIsError">{{ calcYunfei.msg }}</block>
						<block v-else>¥{{ calcYunfei.price | filterTransNum }}</block>
					</view>

					<!-- 非第三方配送 -->
					<view class="line-right-content-text" v-else>
						<block v-if="calcYunfei.feiyong">{{ calcYunfei.msg }}</block>
						<block v-else>¥{{ calcYunfei.price | filterTransNum }}</block>
					</view>
				</view>

				<block
					v-if="
						calcPeiTypeId == peiTypeEnumObj[peiTypeZiti] ||
							calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]
					"
				>
					<view class="line-block">
						<view class="line-left-title-text">收货人</view>
						<view class="input-block">
							<input class="input-dom" type="text" placeholder="收货人" v-model="shouhuoren" />
						</view>
					</view>
					<view class="line-block">
						<view class="line-left-title-text">手机号码</view>
						<view class="input-block">
							<input class="input-dom" type="text" placeholder="手机号码" v-model="haoma" />
						</view>
					</view>
				</block>

				<view class="line-block">
					<view class="line-left-title-text">订单备注</view>

						<view class="input-beizhu-block">
							<input
								class="show-style input-beizhu"
								v-model="textareaContent"
								:style="{ opacity: beizhuInputFlag ? 1 : 0 }"
								type="text"
								@blur="setBeizhuInputFlagFn(false)"
								@focus="setBeizhuInputFlagFn(true)"
							/>

							<view
								class="show-style input-beizhu-text-view"
								:style="{ opacity: beizhuInputFlag ? 0 : 1 }"
							>
								{{ textareaContent ? textareaContent : '示例:订单备注' }}
							</view>
						</view>
				</view>

				<view class="line-block" @click="setQuehuoIsOpenStatus">
					<view class="line-left-title-text">如遇缺货</view>
					<view class="line-right-content-text">
						{{ quehuo[quehuoCurr].name }}
						<view
							class="iconfont icon-arrow-right-copy-copy"
							color="#374050"
							style="display: inline-block;font-size: 16px;"
						></view>
					</view>
				</view>
				<view class="line-content-block" v-if="quehuoIsOpen">
					<view
						class="line-content"
						v-for="(item, index) in quehuo"
						:key="item.id"
						@click="selectQuehuoItemFn(index)"
					>
						<text>{{ item.name }}</text>
						<uni-icons v-show="quehuoCurr != index" size="22" type="circle" color="#c7c7c7"></uni-icons>
						<uni-icons
							v-show="quehuoCurr == index"
							size="22"
							type="circle-filled"
							:color="configInfo.web_site_color"
						></uni-icons>
					</view>
				</view>

				<view class="line-block">
					<view class="line-left-title-text"></view>
					<view class="line-right-content-text">
						<view class="shifu-title-text">实付金额:</view>
						<view class="shifu-price">¥{{ shifuJine | filterTransNum }}</view>
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
					<view class="line-block" @click="setPayTypeFn(payTypeWxxcx)">
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
					<view class="line-block" @click="setPayTypeFn(payTypeWxapp)">
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

					<view class="line-block" @click="setPayTypeFn(payTypeZfbapp)">
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
					<view class="line-block" @click="setPayTypeFn(payTypeWxgzh)" v-if="globalBrowserIsWx">
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

					<view class="line-block" @click="setPayTypeFn(payTypeH5wx)" v-if="!globalBrowserIsWx">
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

		<coupon-modal-box
			:is-show-coupon-modal="isShowCouponModal"
			:coupon-list="couponList"
			:coupon-active="couponActive"
			@closeCouponModalFn="closeCouponModalFn"
			@notUseCouponFn="notUseCouponFn"
			@selectCouponFn="selectCouponFn"
			@commitCouponFn="commitCouponFn"
		></coupon-modal-box>
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
	bigMinus,
	toDoubleNumFn,
	getNotReasonObj,
	cloneFn,
	bigDiv
} from '@/tools/tools.js';

import {
	// ↓↓ 支付方式 ===========================
	payTypeyve,
	payTypeWxxcx,
	payTypeWxapp,
	payTypeZfbapp,
	payTypeWxgzh,
	payTypeH5wx,
	payTypeH5zfb,
	payTypeEnumObj,
	// ↓↓ 配送方式 ===========================
	peiTypeShangjia,
	peiTypeZiti,
	peiTypeKuaidi,
	peiTypeDada,
	peiTypeShansong,
	peiTypeDuozitidian,
	peiTypeEnumObj
} from '@/tools/const.js';

import vipCard from '@/packageB/order/order-components/vip-card.vue'; // 开通会员卡组件
// import peiType from '@/packageB/order/order-components/pei-type.vue'; // 配送方式组件
import peiType from '@/pages/order/order-components/pei-type.vue'; // 配送方式组件
import userAddress from '@/packageB/order/order-components/user-address.vue'; // 展示用户地址组件

import zitidianShow from '@/pages/order/order-components/duozitidian/zitidian-show.vue'; // 展示在页面上的自提点
import duozitiModal from '@/pages/order/order-components/duozitidian/duoziti-modal.vue'; // 自提点列表的模态框组件

import couponModalBox from '@/packageB/order/order-components/coupon-modal-box.vue'; // 优惠券模态框组件

import zitidianShowSeller from '@/pages/order/order-components/zitidian-show-seller.vue'; // 展示在页面上的自提点 商家自提类型

import { one, all, oneSpec, twoSpec } from '@/packageB/goods-detail/const.js'; // 几个常量字符串

let payType;

// #ifdef MP-WEIXIN
payType = payTypeWxxcx;
// #endif

// #ifdef APP-PLUS
payType = payTypeWxapp;
// #endif

export default {
	components: {
		vipCard,
		peiType,
		userAddress,
		couponModalBox,
		zitidianShow,
		duozitiModal,
		zitidianShowSeller
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			// ↓↓ 商品数据
			spec: '', // 单规格oneSpec--多规格 twoSpec
			one,
			all,
			oneSpec,
			twoSpec,
			goodsId: null, // 商品id
			goodsImage: '', // 商品图片
			goodsName: '', // 商品名字
			goodsDescription: '', // 商品描述

			specKeyStr: '', // 当前选中规格的文字描述

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

			peisongFei: 0, // 配送费
			yunFei: 0, // 运费

			payType, // 客户选的支付类型
			payTypeyve, // 支付类型储值余额 (枚举常量字符串)
			payTypeWxxcx, // 支付类型微信小程序支付 (枚举常量字符串)
			payTypeWxapp, // 支付类型微信app支付 (枚举常量字符串)
			payTypeZfbapp, // 支付类型支付宝app支付 (枚举常量字符串)
			payTypeWxgzh,
			payTypeH5wx,
			payTypeH5zfb,

			peiTypeShangjia,
			peiTypeZiti,
			peiTypeKuaidi,
			peiTypeDada,
			peiTypeShansong,
			peiTypeDuozitidian,
			peiTypeEnumObj,

			// 配送方法
			peiTypeArr: [{}],
			peiTypeActive: 0,

			// 地址相关
			addressIsSet: false,
			addressUserName: '', // 收货人名字
			addressUserTel: '', // 收货人电话
			addressText: '', // 收货人地址描述
			addressTagName: '', // 地址标签
			addressId: null, // 收货地址id
			addressCoordinate: '', // 地址经纬度信息

			// 缺货后如何处理
			quehuo: [{}], // 缺货选项
			quehuoCurr: 0, // 当前选中的索引
			quehuoIsOpen: false, // 选择看下拉状态

			textareaContent: '', // 备注信息
			beizhuInputFlag: false, // 备注文字框的聚焦状态

			ordId: null, // 订单id

			shouhuoren: '', // 到点自提收货人名字
			haoma: '', // 到点自提收货人号码

			// 处理商家的一些信息
			sellerImage: '', // 商家门店图片
			sellerName: '', // 商家店名称
			sellerMobile: '', // 商家电话
			sellerOpenTime: '', // 商家营业时间
			sellerAddress: '', // 商家店地址

			freePost: 0, // 满多少免配送费
			postFee: 0, // 骑手配送费
			postage: 0, // 快递运费
			freePostage: 0, // 满多少减运费

			// 优惠券相关
			isShowCouponModal: false, // 优惠券模态框显示隐藏 状态
			couponUseId: -2, // 用户选择的优惠券id  进入结算页传0  默认不选中传 'no'
			couponList: [{}], // 优惠券列表
			couponActive: -1, // 优惠券选中下标
			couponBeforeActive: null, // 打开模态框前的索引
			pageCount: 0, // 页面加载次数
			buyNum: 0, // 购买数量

			// 第三方(达达 闪送)配送
			orderInfo: '', // 订单号字符串
			deliveryNo: '', // 编号字符串
			fee: 0, // 配送费(单位元)
			thirdErrorMsg: '', // 失败的文字描述信息
			thirdIsError: false, // 第三方配送是否失败

			// ↓↓ 多自提点 数据
			localhostLon: 0, // 当前设备的 经度
			localhostLat: 0, // 当前设备的 纬度
			zitidianList: [{}], // 自提点列表数据
			zitidianActive: 0, // 默认选中的自提点
			duozitiModalFlag: false, // 自提点列表模态框 显示 隐藏 状态

			previousInputUserName: '', // 上一次用户输入的名字
			previousInputUserPhone: '' // 上一次用户输入的 手机号
		};
	},
	onLoad(options) {
		let that = this;

		that.ordId = options.ordId; // 订单id
		that.goodsId = options.goodsId; // 商品id
		that.buyNum = options.buyNum; // 购买数量
		that.goodsId = options.goodsId; // 商品id
		that.goodsImage = options.goodsImage; // 商品id

		if (options.specId == 0) {
			that.spec = oneSpec;
		} else {
			that.spec = twoSpec;
			that.specId = options.specId; // 规格id
		}

		// 多自提点需要获取的经纬度信息
		let cartAddress = assertObject(uni.getStorageSync('cartAddress'));
		that.localhostLat = transNumFn(cartAddress.latitude);
		that.localhostLon = transNumFn(cartAddress.longitude);
		uni.setStorageSync('cartAddress', '');

		// #ifdef H5
		if (that.globalBrowserIsWx) {
			that.payType = payTypeWxgzh;
		} else {
			that.payType = payTypeH5wx;
		}
		// #endif
		/*
		let goodsInfo = {
			goodsDescription: '绿色健康食品西蓝花',
			goodsId: '117',
			goodsImage: 'http://192.168.1.15/uploads/images/16148600026040cee282342.jpg',
			goodsName: '西蓝花',
			spec: 'oneSpec',
			preSaleDingJin: 33.5,
			preSaleWeikuanStart: '2021-03-04 00:00:00~2021-03-07 00:00:00',
			goodsCount: 20
		};
		 */
		/*
		uni.setStorageSync('goodsInfo', '');
		console.log('预售页面带过来的商品信息', goodsInfo);
		that.spec = goodsInfo.spec; // 单规格oneSpec--多规格 two
		that.goodsId = goodsInfo.goodsId; // 商品id
		that.goodsImage = goodsInfo.goodsImage; // 商品图片
		that.goodsName = goodsInfo.goodsName; // 商品名字
		that.goodsDescription = goodsInfo.goodsDescription; // 商品描述
		that.specKeyStr = goodsInfo.specKeyStr; // 当前选中规格的文字描述
		that.oneGoodsPrice = goodsInfo.oneGoodsPrice; // 一个商品的价格
		that.preSaleWeikuanStart = goodsInfo.preSaleWeikuanStart; // 开始付尾款时间
		that.goodsCount = goodsInfo.goodsCount; // 库存
		// 无规格商品
		if (that.spec == oneSpec) {
		} else if (that.spec == twoSpec) {
			// 多规格商品
			that.specId = goodsInfo.specId; // 规格id
		}
		*/
		that.loadFn();
	},
	onShow() {
		let that = this;
		uni.setStorageSync('orderZhifuLoadCont', 0);
		uni.setStorageSync('orderZhifuReloadFlag', 0);
		// 获取选择的地址
		let temSelectAd = uni.getStorageSync('temSelectAd');
		if (temSelectAd) {
			console.log('选择的地址', temSelectAd);
			that.addressIsSet = true;
			that.addressUserName = temSelectAd.name; // 收货人名字
			that.addressUserTel = temSelectAd.mobile; // 收货人电话
			that.addressText = temSelectAd.address; // 收货人地址描述
			that.addressTagName = temSelectAd.tag; // 地址标签
			that.addressId = temSelectAd.id; // 收货地址id
			that.addressCoordinate = temSelectAd.coordinate; // 收货地址经纬度信息
			

			if (
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeDada] ||
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeShansong]
			) {
				// 达达或者闪送 重新计算
				that.getOrderInfoFn(() => {
					uni.showToast({
						icon: 'none',
						title: '地址变更,费用已发生变化'
					});
				}, true);
			}
			uni.setStorageSync('temSelectAd', '');
		}
	},
	methods: {
		// 设置备注输入框隐藏显示
		setBeizhuInputFlagFn(flag) {
			this.beizhuInputFlag = flag;
		},
		/*
	   	@description
			获取拆分的数据
				地址信息
				配送方式
				缺货后如何处理
				商家自提点信息
				余额
	   	@return <Object>
	    */
		getChaifenFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/order/fill_chaifen'
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						// 成功返回的数据
						let resObj = {};
						let resultObj = assertObject(result.data.data);

						// 处理地址信息
						let addressObj = assertObject(resultObj.address);
						if (addressObj.id) {
							resObj.address = {
								isSet: true,
								addressId: addressObj.id, // 地址id
								addressUserName: addressObj.name, // 收货人名字
								addressUserTel: addressObj.mobile, // 收货人电话
								addressText: addressObj.address, // 收货人地址描述
								addressHousenumber: addressObj.housenumber, // 收货人门牌号
								addressCoordinate: addressObj.coordinate, // 收货地址经纬度
								addressArea: addressObj.area, // 收货地址的 市
								addressTagName: addressObj.tag_name // 地址标签
							};
						} else {
							resObj.address = {
								isSet: false
							};
						}

						// 如遇缺货如何处理
						let quehuo = assertArray(resultObj.quehuo);
						resObj.quehuo = quehuo;

						// 处理配送方式数据
						let peiTypeArr = assertArray(resultObj.peiType).filter(typeItem => typeItem.value == 1);

						resObj.peiTypeArr = peiTypeArr;

						// 处理自提商家信息
						let sellerInfo = assertObject(resultObj.peisong);

						resObj.sellerInfo = {
							freePost: transNumFn(sellerInfo.free_post), // 满多少免配送费
							postFee: transNumFn(sellerInfo.post_fee), // 骑手配送费
							postTime: sellerInfo.post_time, // 配送时间 '8:20 - 22:50'
							postage: transNumFn(sellerInfo.postage), // 快递运费
							freePostage: transNumFn(sellerInfo.free_postage), // 满多少减运费

							// 处理商家的一些信息
							sellerImage: sellerInfo.shop_image, // 商家门店图片
							sellerName: sellerInfo.shop_name, // 商家店名称
							sellerMobile: sellerInfo.mobile, // 商家电话
							sellerOpenTime: sellerInfo.shop_bh, // 商家营业时间
							sellerAddress: sellerInfo.address // 商家店地址

							/*
							isPreparePeisong: sellerInfo.is_prepare_peisong == 1, // 是否开启预约配送
							prepareDays: transNumFn(sellerInfo.prepare_days), // 预约配送的天数
							peisongTimeLater: transNumFn(sellerInfo.peisong_time_later) // 预计骑手配送时长
							*/
						};
						let yve = transNumFn(resultObj.yue); // 账户余额
						resObj.yve = yve;

						let { user_name: userName, user_phone: userPhone } = assertObject(resultObj.znp_user);
						resObj.previousInputInfo = {
							// 上一次输入的值
							userName,
							userPhone
						};

						resFn({
							type: 'success',
							msg: '获取拆分数据成功',
							result: resObj
						});
					} else {
						resFn({
							type: 'error',
							result,
							msg: result.data.msg
						});
					}
				} else {
					resFn({
						type: 'error',
						result,
						msg: that.$errorMsg
					});
				}
			});
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

			// 收货地址
			let addressIdInfo = {};

			if (that.addressIsSet) {
				addressIdInfo.address_id = that.addressId;
			}

			// 参数信息
			let opt = {
				from: 'pre_sale_payoff',
				prom_type: 'pre_sale_payoff',
				post_type: that.calcPeiTypeId,
				Platform: platformType,
				vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0,
				ord_id: that.ordId,
				buy_num: that.buyNum,
				coupon_user_id: that.calcCouponUseId,
				...addressIdInfo,
				...goodsSpecInfo,
				goods: that.goodsId
			};

			let result = await that.$request({
				url: '/api/order/fill_order',
				data: opt
			});

			console.log('展示页面信息接口 /api/order/fill_order 请求参数', opt, JSON.stringify(opt));
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

					// let jdArr = assertArray(jdtInfo.jd); // 进度信息
					that.preSaleDingJin = assertObject(jdtInfo[0]).money; // 定金
					that.weikuan = assertObject(jdtInfo[1]).money; // 尾款

					// 价格
					let priceObj = assertObject(resultObj.price);

					that.shifuJine = transNumFn(priceObj['实付金额']); // 实付金额
					that.dingdanJine = transNumFn(priceObj['订单金额']); // 订单金额

					that.peisongFei = transNumFn(priceObj['配送费']); // 配送费
					that.yunFei = transNumFn(priceObj['运费']); // 运费

					// 商品信息

					let goodsInfo = assertArray(assertObject(priceObj.goods).goods_id)[0];

					that.goodsName = goodsInfo.goods_name;

					that.oneGoodsPrice = transNumFn(goodsInfo.single_price); // 一个商品的价格

					// 无规格商品
					if (that.spec == oneSpec) {
						that.goodsDescription = goodsInfo.goods_remark;
					} else if (that.spec == twoSpec) {
						// 多规格商品
						that.specKeyStr = goodsInfo.goods_spec_name;
					}

					// 处理达达 闪送的参数
					let orderInfo, // 订单号字符串
						deliveryNo, // 编号字符串
						fee, // 配送费(单位元)
						thirdIsError, // 第三方配送是否失败
						thirdErrorMsg; // 失败的文字描述信息

					let thirdPeiInfo = assertObject(resultObj.result_prepay_dada); // 第三方(达达闪送)配送的信息
					if (peiTypeEnumObj[peiTypeDada] == that.calcPeiTypeId) {
						orderInfo = resultObj.order_info;
						// 达达
						if (thirdPeiInfo.status == 'success') {
							thirdIsError = false;
							deliveryNo = assertObject(thirdPeiInfo.result).deliveryNo;
							fee = transNumFn(assertObject(thirdPeiInfo.result).fee);
						} else {
							thirdIsError = true;
							thirdErrorMsg = thirdPeiInfo.msg;
						}
					} else if (peiTypeEnumObj[peiTypeShansong] == that.calcPeiTypeId) {
						// 闪送
						orderInfo = resultObj.order_info;

						if (thirdPeiInfo.status == 200) {
							thirdIsError = false;
							deliveryNo = assertObject(thirdPeiInfo.data).orderNumber;
							fee = bigDiv(transNumFn(assertObject(thirdPeiInfo.data).totalFeeAfterSave), 100);
						} else {
							thirdIsError = true;
							thirdErrorMsg = thirdPeiInfo.msg;
						}
					} else {
						orderInfo = null;
						deliveryNo = null;
						fee = 0;
					}

					that.orderInfo = orderInfo; // 订单号字符串
					that.deliveryNo = deliveryNo; // 编号字符串
					that.fee = fee; // 配送费(单位元)
					that.thirdIsError = thirdIsError; // 第三方配送是否失败
					that.thirdErrorMsg = thirdErrorMsg; // 失败的文字描述信息

					// 处理优惠券数据

					if (that.pageCount == 0) {
						// 第一次加载页面
						let isSeted = false; // 把第一个可用优惠券给选上了  false不选   true选

						let couponList = assertArray(resultObj.coupon).map((item, index) => {
							let couponNotUseObj = {};

							if (item.not_reason) {
								couponNotUseObj.couponNotUse = true;
								couponNotUseObj.couponNotUseObj = getNotReasonObj(item.not_reason);
							} else {
								couponNotUseObj.couponNotUse = false;
							}

							if (item.is_use == 1 && !isSeted) {
								isSeted = true;
								that.couponActive = index;
							}

							return {
								couponId: item.coupon_user_id, // 优惠券id
								couponMoney: transNumFn(item.money), // 左边优惠券 上面的 优惠券值的钱数
								couponLeftTitle: item.title, // 左边优惠券的券肚子上标题文字
								couponName: item.coupon_name, // 右边第一行第一个 文字展示商品券名字
								couponRightTitle: item.coupon_title, // 右边第一行第二个 文字展示商品券标题
								couponUserUseType: item.user_coupon_use_type, // 右边第二行 用户 使用条件
								couponGoodsUseTitle: item.goods_range_title, // 右边第三行 商品 使用条件
								couponUseTime: item.indate, // 有效时间截止文字描述信息
								couponIsUse: item.is_use == 1, // 是否可以选中
								...couponNotUseObj,
								index
							};
						});

						let couponUseItem = couponList[that.couponActive];
						if (couponUseItem) {
							that.couponUseId = couponUseItem.couponId;
						} else {
							that.couponUseId = 0;
						}
						that.couponList = couponList;
					} else {
						// 第多次次加载页面
					}
					that.hideAllFn();
				} else {
					console.log('jjj');
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
			that.pageCount++;
		},
		// 选择会员卡
		selectVipOptionCardFn(e) {
			let that = this;
			that.vipOptionCardIsSelect = e;
			that.defaultStatus = false;
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
			if (that.calcIsThirdPeiType && that.thirdIsError) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: that.thirdErrorMsg,
					success(e) {
						that.getOrderInfoFn(() => {}, true);
					}
				});
				return false;
			}
			let payPlatform; // 平台类型

			// #ifdef MP-WEIXIN
			payPlatform = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			payPlatform = 'APP';
			// #endif

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				// 微信浏览器
				payPlatform = 'wxOfficialAccount';
			} else {
				// 普通浏览器
				payPlatform = 'H5';
			}
			// #endif

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

			let specIdObj = {};

			if (that.spec == twoSpec) {
				specIdObj.group_goods_spec_id = that.specId;
			}

			// 如果 配送方式是 多自提点 需要判断的条件
			if (that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]) {
				// 没有自提列表
				if (!that.zitidianList.length) {
					uni.showToast({
						icon: 'none',
						title: `自提点列表为空`
					});
					return false;
				}
				// 有自提列表 没有 在范围内的自提点
				if (that.zitidianIsAllNotRange) {
					uni.showToast({
						icon: 'none',
						title: `自提点不在配送范围内`
					});
					return false;
				}
				//
			}

			let ziti = {}; // 自提信息

			if (
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeZiti] ||
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]
			) {
				if (!that.shouhuoren.length || !that.haoma.length) {
					uni.showToast({
						icon: 'none',
						title: '请填写收货人信息'
					});
					return false;
				}
				ziti.user_name = that.shouhuoren;
				ziti.user_phone = that.haoma;
			} else {
				if (!that.addressId) {
					uni.showToast({
						icon: 'none',
						title: '请选择收货地址'
					});
					return false;
				}
			}
			
			
			
			// 商家配送时限制距离
			if (peiTypeEnumObj[peiTypeShangjia] == that.calcPeiTypeId) {
				console.log('是商家配送开始判断是否在配送范围内');
				let checkRangeResult = await that.checkRangeFn(that.addressCoordinate);
				if (checkRangeResult.type != 'success') {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '当前地址不在配送范围内',
						success(e) {
							//确认后的回调
							console.log(e);
						}
					});
					return false;
				}
			}
			
			
			
			// #ifdef MP-WEIXIN
			if (that.templateId.length > 0) {
				let templateId = await that.getTemplateId();
				console.log('模板消息', templateId);
			}
			// #endif

			// 第三方配送的参数
			let dadaShansongparam = {};
			if (that.calcIsThirdPeiType) {
				dadaShansongparam = that.calcDadaShansongparam;
			} else {
				dadaShansongparam = {};
			}

			let addressId = (() => {
				if (that.checkIsMustAddress) {
					return that.addressId;
				} else {
					if (that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]) {
						return assertObject(that.zitidianList[that.zitidianActive]).id;
					}
					return '';
				}
			})();

			let opt = {
				prom_type: 'pre_sale',
				from: 'pre_sale_payoff',
				address_id: addressId,
				goods_id: that.goodsId,
				...specIdObj,
				ord_price: that.dingdanJine,
				balance_price: balancePrice,
				pay_type: payType,
				pay_price: payPrice,
				post_type: that.calcPeiTypeId,
				vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0,
				buy_num: that.buyNum,
				ord_id: that.ordId,
				quehuo: that.calcQuehuoId,
				comment: that.textareaContent,
				coupon_user_id: that.calcCouponUseId,
				fee: 0,
				pay_platform: payPlatform,
				...ziti,
				...dadaShansongparam
			};

			console.log('生成订单接口 /api/order/make_order 参数', opt);

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

					that.navigateToFn({
						url: `/pages/order-state/zhifu?ord_id=${ordId}`,
						type: 'redirectTo'
					});
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
		// 页面加载函数
		async loadFn() {
			let that = this;
			let chaifen = await that.getChaifenFn();
			console.log('拆分接口返回的东西', chaifen);

			if (chaifen.type == 'success') {
				let chaifenResult = chaifen.result;

				that.peiTypeArr = chaifenResult.peiTypeArr;

				// 处理收货地址
				that.addressIsSet = chaifenResult.address.isSet;
				that.addressUserName = chaifenResult.address.addressUserName;
				that.addressUserTel = chaifenResult.address.addressUserTel;
				that.addressText = chaifenResult.address.addressText;
				that.addressTagName = chaifenResult.address.addressTagName;
				that.addressId = chaifenResult.address.addressId;
				that.addressCoordinate = chaifenResult.address.addressCoordinate;
				

				// 处理如遇缺货
				that.quehuo = chaifenResult.quehuo;

				// 处理商家的一些信息
				that.sellerImage = chaifenResult.sellerInfo.sellerImage; // 商家门店图片
				that.sellerName = chaifenResult.sellerInfo.sellerName; // 商家店名称
				that.sellerMobile = chaifenResult.sellerInfo.sellerMobile; // 商家电话
				that.sellerOpenTime = chaifenResult.sellerInfo.sellerOpenTime; // 商家营业时间
				that.sellerAddress = chaifenResult.sellerInfo.sellerAddress; // 商家店地址

				that.freePost = chaifenResult.sellerInfo.freePost; // 满多少免配送费
				that.postFee = chaifenResult.sellerInfo.postFee; // 骑手配送费
				that.postage = chaifenResult.sellerInfo.postage; // 快递运费
				that.freePostage = chaifenResult.sellerInfo.freePostage; // 满多少减运费

				that.yve = chaifenResult.yve; // 余额
				that.previousInputUserName = chaifenResult.previousInputInfo.userName; // 上一次用户输入的名字
				that.previousInputUserPhone = chaifenResult.previousInputInfo.userPhone; // 上一次用户输入的 手机号

				let zitidianList = await that.getDuozitidianFn(that.localhostLon, that.localhostLat);
				console.log('自提点 数据 zitidianList', zitidianList);
				if (zitidianList.type == 'success') {
					that.zitidianList = zitidianList.result;

					let zitidianIsAllNotRange = zitidianList.result.every(i => !i.isRange);

					if (!zitidianIsAllNotRange) {
						that.zitidianActive = zitidianList.result.findIndex(item => item.isRange);
					}

					that.getOrderInfoFn();
				} else {
					that.isShowLoading = false;
					uni.showToast({
						icon: 'none',
						title: zitidianList.msg
					});
				}
			} else {
				that.isShowLoading = false;
				that.hideAllFn();
				uni.showToast({
					title: chaifen.msg,
					icon: 'none'
				});
			}
		},
		// 设置 缺货的选项列表 显示隐藏状态
		setQuehuoIsOpenStatus() {
			this.quehuoIsOpen = !this.quehuoIsOpen;
		},
		// 选择 缺货的选项列表
		selectQuehuoItemFn(index) {
			let that = this;
			that.quehuoCurr = index;
			that.quehuoIsOpen = false;
		},
		// 设置配送方式
		setPeiTypeIndexFn(arg) {
			let that = this;
			that.peiTypeActive = arg.index;
			that.getOrderInfoFn(() => {
				if (
					(that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian] &&
						that.previousInputUserName &&
						that.previousInputUserPhone &&
						!that.shouhuoren &&
						!that.haoma) ||
					(that.calcPeiTypeId == peiTypeEnumObj[peiTypeZiti] &&
						that.previousInputUserName &&
						that.previousInputUserPhone &&
						!that.shouhuoren &&
						!that.haoma)
				) {
					that.shouhuoren = that.previousInputUserName;
					that.haoma = that.previousInputUserPhone;
				}
			}, true);
		},
		// 设置优惠券显示隐藏状态
		setCouponModalFn(flag) {
			this.isShowCouponModal = flag;
		},
		// 打开优惠券模态框
		openCouponModalFn() {
			let that = this;
			that.couponBeforeActive = that.couponActive;
			that.setCouponModalFn(true);
		},
		// 关闭优惠券模态框
		closeCouponModalFn() {
			let that = this;
			that.couponActive = that.couponBeforeActive;
			that.setCouponModalFn(false);
		},
		// 不使用优惠券并关闭 优惠券模态框
		notUseCouponFn() {
			let that = this;
			that.couponUseId = -1;
			that.couponActive = -1;
			that.setCouponModalFn(false);
			that.getOrderInfoFn(() => {}, true);
		},
		// 选择优惠券
		selectCouponFn(arg) {
			this.couponActive = arg.index;
		},
		// 确认使用当前选中的优惠券
		commitCouponFn() {
			let that = this;
			that.couponUseId = that.couponList[that.couponActive].couponIds;
			that.getOrderInfoFn(() => {
				that.isShowCouponModal = false;
			}, true);
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
		// ↓↓ 多自提点 相关方法=============================================
		// 设置 自提点列表 模态框 的隐藏 显示 状态
		setduozitiModalFlagFn(bool) {
			this.duozitiModalFlag = bool;
		},
		// 选择自提点
		selectZitiFn(index) {
			this.zitidianActive = index;
			this.setduozitiModalFlagFn(false);
		}
	}, // <------  methods 结束
	computed: {
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
		},
		/*
			@description
				是否展示用户的地址组件
			@return <Boolean>
				配送方式是 达达 闪送 商家配送 快递
					返回 true 显示
				配送方式是 到店自提 多自提点
					返回 false 隐藏
		*/
		isShowAddress() {
			let that = this;

			let peiTypeList = {
				[peiTypeEnumObj[peiTypeShangjia]]: true,
				[peiTypeEnumObj[peiTypeShansong]]: true,
				[peiTypeEnumObj[peiTypeDada]]: true,
				[peiTypeEnumObj[peiTypeKuaidi]]: true,
				[peiTypeEnumObj[peiTypeZiti]]: false,
				[peiTypeEnumObj[peiTypeDuozitidian]]: false
			};
			return peiTypeList[that.calcPeiTypeId];
		},
		// 当前选中的配送方式id
		calcPeiTypeId() {
			let that = this;
			return transNumFn(assertObject(that.peiTypeArr[that.peiTypeActive]).id);
		},
		// 当前选中的如遇缺货 后如何处理 的id
		calcQuehuoId() {
			let that = this;
			return transNumFn(assertObject(that.quehuo[that.quehuoCurr]).id);
		},
		/*
			@description
				根据当前选的配送方式来返回运费 和 文字描述信息 和 是否免运费
			@return <Object>
				{
					feiyong: false, // 是否已免配送费  true已免    false未免
					price: that.peisongFei // 未免情况返回的配送费
					msg: `订单金额满${toDoubleNumFn(that.freePost)}元以免配送费` // 已免的文字描述信息
				}
		*/
		calcYunfei() {
			let that = this;
			/*
				0--商家配送
				1--自提
				2--快递
				3--达达
				4--闪送
			*/
			// 商家配送
			if (peiTypeEnumObj[peiTypeShangjia] == that.calcPeiTypeId) {
				// 未减免配送费
				if (that.peisongFei > 0) {
					return {
						feiyong: false, // 是否以免配送费
						price: that.peisongFei // 配送费
					};
				} else {
					// 已未减免配送费
					return {
						feiyong: true, // 是否以免配送费
						msg: `订单金额满¥${toDoubleNumFn(that.freePost)}已免配送费` // 文字描述信息
					};
				}
			}
			// 快递配送
			if (peiTypeEnumObj[peiTypeKuaidi] == that.calcPeiTypeId) {
				// 未减免配送费
				if (that.yunFei > 0) {
					return {
						feiyong: false,
						price: that.yunFei
					};
				} else {
					return {
						feiyong: true,
						msg: `订单金额满¥${toDoubleNumFn(that.freePostage)}已免运费` // 文字描述信息
					};
				}
			}

			// 达达 闪送
			if (that.calcIsThirdPeiType) {
				if (that.thirdIsError) {
					return {
						msg: that.thirdErrorMsg
					};
				} else {
					return {
						price: that.fee
					};
				}
			}

			return {};
		},
		//
		calcCouponUseId() {
			let that = this;
			if (that.couponUseId == -2) {
				return 0;
			} else if (that.couponUseId == -1) {
				return 'no';
			} else {
				return assertObject(that.couponList[that.couponActive]).couponId;
			}
		},
		// 优惠券的文字
		couponText() {
			let that = this;

			if (that.couponActive >= 0) {
				let couponMoney = toDoubleNumFn(that.couponList[that.couponActive].couponMoney);
				return `已优惠¥${couponMoney}`;
			}
			if (that.couponList.length > 0) {
				let num = that.couponList.filter(item => item.couponIsUse).length;
				if (num > 0) {
					return `${num}优惠券可用`;
				} else {
					return '无可用优惠券';
				}
			} else {
				return '无可用优惠券';
			}
		},
		/*
			@description
				当前配送方式是否是第三方(达达 闪送)配送 
			@return <Boolean>
				true 表示 是第三方配送
				false 表示 不是第三方配送
		*/
		calcIsThirdPeiType() {
			let that = this;
			if (
				peiTypeEnumObj[peiTypeDada] == that.calcPeiTypeId ||
				peiTypeEnumObj[peiTypeShansong] == that.calcPeiTypeId
			) {
				return true;
			}
			return false;
		},
		// 返回闪送和达达配送时需要的参数
		calcDadaShansongparam() {
			let that = this;
			/* 
				order_info <all>  { 达达 闪送传的东西 结算接口返回的东西 其他配送方式不传 }
				deliveryNo <all>  { 达达 闪送 的平台订单号  其他配送方式不传 }
				fee <all>  { 达达 闪送 的配送费(单位元)  其他配送方式不传 }
			*/
			return {
				order_info: that.orderInfo,
				deliveryNo: that.deliveryNo,
				fee: that.fee
			};
		},
		/*
			@description
				自提点列表是否全部 不在范围内
			@return <Boolean>
				返回 false 表示 有可用的自提点在范围内
				返回 true 表示 没有可用的自提点在范围内
		*/
		zitidianIsAllNotRange() {
			return this.zitidianList.every(i => !i.isRange);
		},
		currentzitidianInfo() {
			return this.zitidianList[this.zitidianActive];
		},
		/*
		  @description
			检查 当前选择的配送方式 是否必须需要配送地址
		  @return <Boolean>
			true 表示当前选择的配送方式 必须填配送地址
			false 表示当前选择的配送方式 可以不填配送地址
		*/
		checkIsMustAddress() {
			let enumObj = {
				[peiTypeEnumObj[peiTypeShangjia]]: true,
				[peiTypeEnumObj[peiTypeKuaidi]]: true,
				[peiTypeEnumObj[peiTypeDada]]: true,
				[peiTypeEnumObj[peiTypeShansong]]: true,

				[peiTypeEnumObj[peiTypeZiti]]: false,
				[peiTypeEnumObj[peiTypeDuozitidian]]: false
			};
			return enumObj[this.calcPeiTypeId];
		}
	} // <------  computed 结束
};
</script>

<style lang="scss" scoped>
.input-beizhu-block {
	position: relative;
	@mixin size {
		width: 370rpx;
		height: 64rpx;
	}
	@include size;
	.show-style {
		@include size;
		position: absolute;
		right: 0;
		top: 0;
		text-align: right;
		font-size: 26rpx;
		line-height: 64rpx;
	}
	.input-beizhu {
		z-index: 2;
	}
	.input-beizhu-text-view {
		z-index: 1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}

.root-page {
	.seller-address-wrap {
		text-indent: 0.5em;
		font-size: 26rpx;
		color: $grey1-color;
	}
	.order-goods-info-wrap {
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
						color: #000000;
					}
					&.weikuan {
						color: $red-color;
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

	.order-coupon-info-wrap {
		padding: 12rpx 0;
		overflow: hidden;
		.content-wrap {
			margin: 0 24rpx;
			background: #ffffff;
			border-radius: 16rpx;
			overflow: hidden;

			.line-block {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 90rpx;
				border-top: 1px solid #f1f1f1;
				.line-left-title-text,
				.line-right-content-text {
					color: $grey1-color;
					font-size: 26rpx;
					white-space: nowrap;
				}
				.tip-red-text {
					display: inline-block;
					font-weight: bold;
					color: $red-color;
				}
			}

			.line-content-block {
				.line-content {
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 90rpx;
					border-top: 1px solid #f1f1f1;
					font-size: 22rpx;
					padding: 0 20rpx;
				}
			}

			.shifu-title-text {
				display: inline-block;
			}
			.shifu-price {
				display: inline-block;
				margin-left: 0.5em;
				font-size: 30rpx;
				font-weight: 600;
			}
			.input-block {
				width: 80%;
				.input-dom {
					padding-left: 0.2em;
					font-size: 26rpx;
					font-weight: 600;
					color: $grey1-color;
					background: #f7f7f7;
					padding: 0.4em 1em;
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
		width: 100%;
		overflow: hidden;
		&::after {
			content: '';
			display: block;
			height: 100rpx;
		}
		.bottom-topay-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 0 24rpx;
			width: 100%;
			height: 100rpx;
			background: #ffffff;
			box-shadow: 0px 0px 12rpx #d8d8d8;
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
