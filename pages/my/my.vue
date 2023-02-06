<template>
	<view class="root-page">
		<!-- 标题栏组件包裹元素 -->
		<view class="title-bar-wrap" :style="{ opacity: calcTitleBarOpacity }">
			<!-- 占位元素 -->
			<view class="title-bar-block" :style="{ height: `${statusBarHeight + 44}px` }"></view>

			<!-- 根据屏幕定位的元素 -->
			<view class="title-bar-flex" :style="{ height: `${statusBarHeight + 44}px` }">
				<!-- 手机状态栏  (手机信号 手机电量 时间 。。。) -->
				<view class="status-bar-block" :style="{ height: `${statusBarHeight}px` }"></view>

				<!-- 放置内容的元素 -->
				<view class="title-block flex-center">
					<view class="title-text ">
						<!-- 标题栏中间 的 文字 -->
						{{ calcMyPageTitle }}
					</view>
				</view>
			</view>
		</view>

		<view class="head-wrap" :style="calcStyleHeadWrapBg">
			<image
				v-if="configInfo.user_is_background == 2"
				class="user-bg-image"
				:src="addimgPathHostFn(configInfo.user_background_img)"
			></image>

			<!-- 有登录状态 -->
			<block v-if="isLogin">
				<view class="user-info" @click="navigateToFn({ url: `/packageA/tel-login/user-info` })">
					<view class="content-wrap">
						<view class="user-image-block">
							<image class="user-image" :src="userInfoAvatar"></image>
							<image class="user-hat" v-if="isVip" :src="calcImageSrc('/my/hat.png')"></image>
							<view class="user-badge">
								<text class="text">LV{{ userInfoLv }}</text>
								<image :src="calcImageSrc('/global-image/badge.png')"></image>
							</view>
						</view>

						<view class="user-name-block">
							<view class="user-name">
								<view class="text">{{ userInfoNickName }}</view>
								<!-- #ifdef MP-WEIXIN -->
								<!-- open-type="getUserInfo" -->
								<button class="updata-user-info clear-btn-style" @click.stop="updataUserInfoFn">
									<uni-icons style="margin-left: 20rpx;" type="loop" color="#ffffff"></uni-icons>
								</button>
								<!-- #endif -->
								<!-- #ifdef APP-PLUS -->
								<button
									v-if="!(appleCheckOpen && appenv == ENVIOS)"
									class="updata-user-info clear-btn-style"
									open-type="getUserInfo"
									@click.stop="updataUserInfoFn"
								>
									<uni-icons style="margin-left: 20rpx;" type="loop" color="#ffffff"></uni-icons>
								</button>
								<!-- #endif -->
							</view>

							<view class="vip-block" :style="{ visibility: isOpenVipFunc ? 'initial' : 'hidden' }">
								<view :class="['vip-block-left', !vipTes ? 'borderStyle' : '']">{{ vipName }}</view>
								<view v-if="vipTes" class="vip-block-right">{{ vipTes }}</view>
							</view>
						</view>

						<view class="more-icon">
							<uni-icons color="#ffffff" size="20" type="arrowright"></uni-icons>
						</view>

						<text class="time-tips" v-if="vipEndTime">{{ vipEndTime }}</text>
					</view>
				</view>

				<view class="vip-card-block" v-if="isOpenVipFunc" :style="{ height: laBaMsg ? '324rpx' : '264rpx' }">
					<view class="content-wrap">
						<view class="card-A">
							<view>
								<image :src="calcImageSrc('/my/lb.png')" mode=""></image>
								<text>{{ laBaMsg }}</text>
							</view>
						</view>
						<view class="card-B" :style="{ top: laBaMsg ? '70rpx' : '15rpx' }">
							<view class="card-B-title">
								<view>
									<image :src="vipIcon" mode=""></image>
									<text>{{ vipTitle }}</text>
								</view>
								<navigator v-if="!miniProgrameCheck" url="/packageA/kaitonghuiyuan/huiyuanjieshao">
									{{ vipBtnText }}
								</navigator>
							</view>
							<view class="icon-list">
								<view class="item" v-for="(item, index) in vipIconList" :key="index">
									<image :src="item.icon" mode=""></image>
									<text>{{ item.name }}</text>
								</view>
							</view>
							<image :src="calcImageSrc('/my/bg-logo-wxsx.png')" class="bg-logo"></image>
						</view>
					</view>
				</view>
				<image
					v-if="isOpenVipFunc"
					class="bottom-white-img"
					:src="calcImageSrc('/my/bottom-whit-img.png')"
					mode=""
				></image>
			</block>

			<!-- 没登录状态 -->
			<block v-if="!isLogin">
				<view class="user-info" @click="closeGlobalLoginFn(true)">
					<view class="content-wrap">
						<view class="user-image-block">
							<image class="user-image" :src="calcImageSrc('/my/per0.png')"></image>
						</view>
						<view class="user-name-block"><view class="user-name">点击登录账户</view></view>
					</view>
				</view>

				<view class="vip-card-block" v-if="isOpenVipFunc" :style="{ height: laBaMsg ? '324rpx' : '264rpx' }">
					<view class="content-wrap">
						<view class="card-A">
							<view>
								<image :src="calcImageSrc('/my/lb.png')" mode=""></image>
								<text>{{ laBaMsg }}</text>
							</view>
						</view>
						<view class="card-B" :style="{ top: laBaMsg ? '70rpx' : '15rpx' }">
							<view class="card-B-title">
								<view>
									<image :src="vipIcon" mode=""></image>
									<text>{{ vipTitle }}</text>
								</view>
								<navigator v-if="!miniProgrameCheck" url="/packageA/kaitonghuiyuan/huiyuanjieshao">
									{{ vipBtnText }}
								</navigator>
							</view>
							<view class="icon-list">
								<view class="item" v-for="(item, index) in vipIconList" :key="index">
									<image :src="item.icon" mode=""></image>
									<text>{{ item.name }}</text>
								</view>
							</view>
							<image :src="calcImageSrc('/my/bg-logo-wxsx.png')" class="bg-logo"></image>
						</view>
					</view>
				</view>
				<image
					v-if="isOpenVipFunc"
					class="bottom-white-img"
					:src="calcImageSrc('/my/bottom-whit-img.png')"
					mode=""
				></image>
			</block>
		</view>

		<!-- 用户余额 优惠券 积分 ↓↓↓ -->
		<view class="user-property">
			<view class="content-wrap">
				<view class="user-property-block border-radius20" :class="[isOpenVipFunc ? '' : 'noVip']">
					<view
						class="navigator"
						@click="navigateToFn({ url: '/packageA/yve/yve', checkLogin: true })"
						v-if="!miniProgrameCheck"
					>
						<view class="value">
							<text>¥</text>
							{{ userInfoMoney | filterTransNum }}
						</view>
						<text>余额</text>
					</view>
					<view
						class="navigator"
						@click="navigateToFn({ url: `/packageA/youhuiquan/index`, checkLogin: true })"
					>
						<view class="value">{{ userInfoCoupon }}</view>
						<text>优惠券</text>
					</view>

					<view
						class="navigator"
						@click="navigateToFn({ url: `/packageA/shangpinquan/index`, checkLogin: true })"
					>
						<view class="value">{{ userInfoMc }}</view>
						<text>商品券</text>
					</view>

					<view
						class="navigator"
						@click="navigateToFn({ url: '/packageA/jifenshangcheng/jifenshangcheng', checkLogin: true })"
					>
						<view class="value">{{ userInfoIntegral }}</view>
						<text>积分</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 我的订单↓↓↓ -->
		<view class="my-order-wrap">
			<view class="content-wrap">
				<view class="my-order-block border-radius20">
					<view class="title-h2">我的订单</view>
					<view class="menu-list">
						<view
							class="navigator"
							@click="navigateToFn({ url: `/pages/my/dingdan/index?act=1`, checkLogin: true })"
						>
							<view class="item-wrap">
								<view class="badge" v-if="orderNumUn > 0">
									<uni-badge :text="orderNumUn" type="error" style="color:#ffffff"></uni-badge>
								</view>
								<image :src="getConfigImg('dzf')"></image>
							</view>
							<text>待支付</text>
						</view>

						<view
							class="navigator"
							@click="navigateToFn({ url: `/pages/my/dingdan/index?act=2`, checkLogin: true })"
						>
							<view class="item-wrap">
								<view class="badge" v-if="orderNumIng > 0">
									<uni-badge :text="orderNumIng" type="error" style="color:#ffffff"></uni-badge>
								</view>
								<image :src="getConfigImg('jxz')"></image>
							</view>
							<text>进行中</text>
						</view>

						<view
							class="navigator"
							@click="navigateToFn({ url: `/pages/my/dingdan/index?act=3`, checkLogin: true })"
						>
							<view class="item-wrap">
								<view class="badge" v-if="orderNumEd > 0">
									<uni-badge :text="orderNumEd" type="error" style="color:#ffffff"></uni-badge>
								</view>
								<image :src="getConfigImg('dpj')"></image>
							</view>
							<text>待评价</text>
						</view>

						<view
							class="navigator"
							@click="navigateToFn({ url: `/pages/my/shouhou/index`, checkLogin: true })"
						>
							<view class="item-wrap"><image :src="getConfigImg('ts')"></image></view>
							<text>退货/售后</text>
						</view>

						<view
							class="navigator"
							@click="navigateToFn({ url: `/pages/my/dingdan/index?act=0`, checkLogin: true })"
						>
							<view class="item-wrap"><image :src="getConfigImg('qd')"></image></view>
							<text>全部订单</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 广告位↓↓↓ -->
		<view class="banner-block" v-if="bannerList.length > 0">
			<view class="content-wrap">
				<scroll-view :scroll-x="true" class="scroll-view">
					<view
						class="image-block"
						v-for="(item, index) in bannerList"
						:key="index"
						@click="swiperClickFn(item)"
					>
						<image :src="item.image"></image>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 我的服务↓↓↓ -->
		<view class="my-serve">
			<view class="content-wrap">
				<view class="my-serve-block border-radius20">
					<view class="title-h2">我的服务</view>
					<view class="menu-list">
						<view
							@click="navigateToFn({ url: '/packageA/yve/chongzhi', checkLogin: true })"
							class="menu-block"
							v-if="!miniProgrameCheck && getConfigIsShow('cz')"
						>
							<image :src="getConfigImg('cz')"></image>
							<text>充值</text>
						</view>
						<view
							@click="navigateToFn({ url: '/packageA/address/index', checkLogin: true })"
							class="menu-block"
							v-if="getConfigIsShow('dz')"
						>
							<image :src="getConfigImg('dz')"></image>
							<text>收货地址</text>
						</view>

						<view
							class="menu-block"
							@click="navigateToFn({ url: '/packageA/everyday-buy/everyday-buy', checkLogin: true })"
							v-if="getConfigIsShow('yhcg')"
						>
							<image :src="getConfigImg('yhcg')"></image>
							<text>常购商品</text>
						</view>

						<view
							@click="
								navigateToFn({ url: '/packageA/jifenshangcheng/jifenshangcheng', checkLogin: true })
							"
							class="menu-block"
							v-if="getConfigIsShow('jf')"
						>
							<image :src="getConfigImg('jf')"></image>
							<text>积分商城</text>
						</view>

						<!-- <view @click="navigateToFn({url:'/packageA/yaoqingma/yaoqingma',checkLogin:true,})" class="menu-block" v-if="getConfigIsShow('tj')"> -->
						<view @click="devIngFn" class="menu-block" v-if="getConfigIsShow('tj')">
							<image :src="getConfigImg('tj')"></image>
							<text>推荐有礼</text>
						</view>
						<view
							@click="navigateToFn({ url: '/packageA/tuijianyouli/tuijianyouli', checkLogin: true })"
							class="menu-block"
							v-if="getConfigIsShow('yq')"
						>
							<!-- <view @click="devIngFn" class="menu-block"> -->
							<image :src="getConfigImg('yq')"></image>
							<text>邀请得现金</text>
						</view>

						<view
							@click="navigateToFn({ url: `/packageA/pintuan/pintuan`, checkLogin: true })"
							class="menu-block"
							v-if="getConfigIsShow('pt')"
						>
							<image :src="getConfigImg('pt')"></image>
							<text>我的拼团</text>
						</view>

						<view
							@click="navigateToFn({ url: '/packageA/fenxiao/fenxiao', checkLogin: true })"
							class="menu-block"
							v-if="getConfigIsShow('fxzx')"
						>
							<image :src="getConfigImg('fxzx')"></image>
							<text>分销中心</text>
						</view>

						<!-- #ifdef MP-WEIXIN -->
						<view
							@click="navigateToFn({ url: '/packageA/zhibo/zhibo-list', checkLogin: true })"
							class="menu-block"
							v-if="getConfigIsShow('zb')"
						>
							<image :src="getConfigImg('zb')"></image>
							<text>直播</text>
						</view>
						<!-- #endif -->

						<!-- #ifdef APP-PLUS -->
						<view
							@click="appToMiniprogramFn({ path: `pages/my/my` })"
							class="menu-block"
							v-if="getConfigIsShow('zb')"
						>
							<image :src="getConfigImg('zb')"></image>
							<text>直播</text>
						</view>
						<!-- #endif -->

						<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
						<view
							@click="navigateToFn({ url: '/packageA/shipin/shipin', checkLogin: true })"
							class="menu-block"
							v-if="getConfigIsShow('video')"
						>
							<image :src="getConfigImg('video')"></image>
							<text>视频</text>
						</view>
						<!-- #endif -->

						<view
							@click="navigateToFn({ url: '/packageA/kefu/kefu' })"
							class="menu-block"
							v-if="getConfigIsShow('kb')"
						>
							<image :src="getConfigImg('kb')"></image>
							<text>客服与帮助</text>
						</view>

						<view
							v-if="getConfigIsShow('sqgys')"
							@click="navigateToFn({ url: '/packageA/gongyingshang/gongyingshang', checkLogin: true })"
							class="menu-block"
						>
							<image :src="getConfigImg('sqgys')"></image>
							<text>供应商招募</text>
						</view>

						<view
							@click="navigateToFn({ url: '/packageA/set/set' })"
							class="menu-block"
							v-if="getConfigIsShow('sz')"
						>
							<image :src="getConfigImg('sz')"></image>
							<text>设置</text>
						</view>

						<!-- 临时的开放按钮 完事后删除掉 -->
						<!-- 
						<view
							@click="navigateToFn({ url: '/packageA/gongyingshang-list/gongyingshang-list' })"
							class="menu-block"
							v-if="getConfigIsShow('sz')"
						>
							<image :src="getConfigImg('sz')"></image>
							<text>供应商列表</text>
						</view>
						-->

						<!-- #ifndef APP-PLUS -->
						<!-- <view @click="devIngFn" class="menu-block" v-if="getConfigIsShow('down')"> -->
						<view
							@click="navigateToFn({ url: '/packageA/load-app/load-app' })"
							class="menu-block"
							v-if="getConfigIsShow('down')"
						>
							<image :src="getConfigImg('down')"></image>
							<text>下载app</text>
						</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<view class="logo" v-if="calcLogoText" @click="bottomLogoClickFn">
			<view class="text">{{ calcLogoText }}</view>
		</view>

		<!-- ↓↓↓ 登录框 -->
		<login-fn
			:is-show-login="loginBoxFlag"
			@loginSuccessCallback="loginAfterFn"
			@close="closeGlobalLoginFn"
		></login-fn>

		<get-tel @callback="showFn" :is-show="showGetTelModal" @close="closeGetTelModalFn"></get-tel>

		<view class="hans-tabbar">
			<view class="hans-tabbar-height" :class="[isiPhoneX ? 'isiPhoneXClass' : '']"></view>
			<view class="hans-tabbar-fixde" :class="[isiPhoneX ? 'isiPhoneXClass' : '']">
				<hans-tabbar :cardNumber="cardNumber" :list="MenuList" :tab-current="tabCurrent"></hans-tabbar>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
import {
    mapState
} from 'vuex'

import getTel from '@/df-components/loginFn/get-tel';
import { en2ch, assertString, assertObject, transNumFn } from '@/tools/tools';

let statusBarHeight = uni.getSystemInfoSync().statusBarHeight; // 状态栏 高度
import {
	// 当前运行环境 安卓 or 苹果
	ENVANDROID,
	ENVIOS
} from '@/tools/const.js';

export default {
	components: {
		getTel
	},
	data() {
		return {
			ENVANDROID,
			ENVIOS,
			statusBarHeight,
			isShowLoading: true, // 开屏动画
			showGetTelModal: false, // 是否显示 获取手机号的模态框
			loginBoxFlag: false, // 登录框显示隐藏状态
			cardNumber: 0 // 购物车数量
		};
	},
	onLoad(options) {
		let that = this;
		// #ifdef H5
		that.gzhH5WxloginEndFn(options);
		// #endif
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
		that.showFn();
	},
	computed: {
		// 底部公司名字
		calcLogoText() {
			return this.configInfo.PoweredBy;
		},
		// tab-bar 数据
		tabCurrent() {
			for (let i = 0; i < this.MenuList.length; i++) {
				if (this.MenuList[i].field == 'm') {
					return i;
				}
			}
			return 0;
		},
		// 根据 后台的配置来 显示背景
		calcStyleHeadWrapBg() {
			let that = this;
			let obj = {};
			if (that.configInfo.user_is_background == 1) {
				obj.background = that.configInfo.user_background_color;
			}
			return that.obj2styleStr(obj);
		},
		// 根据当前的页面滚动返回 透明度
		calcTitleBarOpacity() {
			if (this.mixinScrollTop >= 60) {
				return 1;
			}
			return this.mixinScrollTop / 60;
		},
		// 返回个人中心tab-bar文字
		calcMyPageTitle() {
			let that = this;
			let { length } = that.MenuList;
			return assertObject(that.MenuList[length - 1])['text'];
		},
		...mapState({
			userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
			userInfoNickName: store => store.userInfo.userInfoNickName, // 网名
			userInfoLv: store => store.userInfo.userInfoLv, // 等级
			userInfoMoney: store => store.userInfo.userInfoMoney, // 余额
			userInfoCoupon: store => store.userInfo.userInfoCoupon, // 优惠券数量
			userInfoMc: store => store.userInfo.userInfoMc, // 商品券
			userInfoIntegral: store => store.userInfo.userInfoIntegral, // 积分
			userInfoMobile: store => store.userInfo.userInfoMobile, // 手机号
			isVip: store => store.userInfo.isVip, // 是否是vip用户
			vipName: store => store.userInfo.vipName, // 会员名称   不是会员传的是 普通会员
			vipTes: store => store.userInfo.vipTes, // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
			vipEndTime: store => store.userInfo.vipEndTime, // 会员过期时间文字  此字段没提示就是空  直接用就行了
			laBaMsg: store => store.userInfo.laBaMsg, // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
			vipIcon: store => store.userInfo.vipIcon, // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
			vipTitle: store => store.userInfo.vipTitle, // V的图标后的标题文字 后端字段是 vip_eco
			vipBtnText: store => store.userInfo.vipBtnText, // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
			vipIconList: store => store.userInfo.vipIconList, // 会员权益列表
			orderNumUn: store => store.userInfo.orderNumUn, // 我的订单-待支付数量
			orderNumIng: store => store.userInfo.orderNumIng, // 我的订单-进行中数量
			orderNumEd: store => store.userInfo.orderNumEd, // 我的订单-待评价数量
			bannerList: store => store.userInfo.bannerList, // 个人中心轮播图数据
		})
	},
	methods: {
		//更新用户信息
		async updataUserInfoFn() {
			let that = this;

			let userProfileObject, avatarUrl, nickName, province, city, gender, data, area;
			// #ifdef MP-WEIXIN
			userProfileObject = await that.getUserProfileFn();

			if (userProfileObject.type == 'success') {
				avatarUrl = userProfileObject.result.avatarUrl;
				nickName = userProfileObject.result.nickName;
				province = userProfileObject.result.province;
				city = userProfileObject.result.city;
				gender = userProfileObject.result.gender;

				data = {
					avatar: avatarUrl,
					nickname: nickName,
					area: `${en2ch(province)}-${en2ch(city)}`,
					sex: gender
				};
			}

			// #endif

			// #ifdef APP-PLUS
			userProfileObject = await that.getLoginDataFn();

			if (userProfileObject.type == 'success') {
				avatarUrl = userProfileObject.result.avatar;
				nickName = userProfileObject.result.nickname;
				area = userProfileObject.result.area;
				gender = userProfileObject.result.sex;

				data = {
					avatar: avatarUrl,
					nickname: nickName,
					area,
					sex: gender
				};
			}

			// #endif
			if (userProfileObject.type != 'success') {
				uni.showToast({
					icon: 'none',
					title: '获取个人信息失败'
				});
				return false;
			}

			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/User/updateUserInfo',
				// 头像 昵称 城市 性别
				data
			});
			console.log('获取用户的最新数据', data, '\n', '更新用户信息接口 返回的数据', result, '\n');

			if (result.statusCode == 200) {
				uni.showToast({
					icon: 'none',
					title: result.data.msg
				});
				if (result.data.code == 200) {
					// 更新本地信息
					that.showFn();
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},

		// onShow 执行的函数
		showFn() {
			let that = this;
			that.setTabBarCartNumFn();
			if (that.isLogin) {
				that.hasTokenGetUserInfo(() => {
					that.isShowLoading = false; // 关闭开屏动画
				});
			} else {
				that.unHasTokenGetUserInfo(() => {
					that.isShowLoading = false; // 关闭开屏动画
				});
			}
		},

		// 关闭获取手机号 模态框
		closeGetTelModalFn() {
			this.showGetTelModal = false;
		},
		// 打开获取手机号 模态框
		openGetTelModalFn() {
			let that = this;
			if (assertString(that.userInfoMobile).length <= 0) {
				setTimeout(() => {
					that.showGetTelModal = true;
				}, 800);
			}
		},
		// 登录后的回调 更新本地信息打开 打开绑定手机号的登录框
		loginAfterFn() {
			let that = this;
			that.isShowLoading = false; // 关闭开屏动画
			that.setTabBarCartNumFn();

			// #ifdef MP-WEIXIN
			that.openGetTelModalFn();
			// #endif
		},

		// #ifdef H5
		// 微信公众授权登录后
		gzhH5WxloginEndFn(options) {
			let that = this;
			let { token } = assertObject(options);
			if (token) {
				// 登录前先退出一下
				that.logOutFn();
				that.$store.commit('setToken', token);
				uni.setStorageSync('token', token);
				that.hideAllFn();
				uni.showLoading({});
				that.hasTokenGetUserInfo(() => {
					uni.hideLoading();
					uni.showToast({
						icon: 'success',
						title: '登录成功'
					});
					setTimeout(() => {
						that.navigateToFn({
							isTab: true,
							url: '/pages/my/my'
						});
					}, 500);
				});
			}
		},
		// #endif
		// 点击底部版权
		bottomLogoClickFn() {
			let that = this;
			let flag = transNumFn(that.configInfo.is_bottom_skip);
			if (flag) {
				that.navigateToFn({ url: `/packageA/dev-ad/dev-ad` });
			}
		}
	} //← ←methods结束
};
</script>

<style lang="scss" scoped>
.head-wrap {
	position: relative;
	padding-top: 120rpx;
	padding-bottom: 20rpx;
	overflow: hidden;
	background-image: linear-gradient(135deg, #6ccc4f, #60c669);

	.user-bg-image {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 750rpx;
		height: 616rpx;
	}

	.user-info {
		height: 142rpx;
		position: relative;
		z-index: 10;

		.content-wrap {
			display: flex;
			align-items: center;
			position: relative;

			.more-icon {
				position: absolute;
				top: 50%;
				right: 24rpx;
				transform: translateY(-50%);
			}
			.time-tips {
				position: absolute;
				right: 24rpx;
				bottom: 0;
				color: #374050;
				font-size: 20rpx;
			}
		}

		.user-image-block {
			display: inline-block;
			width: 132rpx;
			height: 142rpx;
			position: relative;

			.user-image {
				box-sizing: border-box;
				position: absolute;
				z-index: 10;
				top: 50%;
				left: 50%;
				width: 128rpx;
				height: 128rpx;
				transform: translate(-50%, -50%);
				border-radius: 50%;
				border: 2rpx solid #fff7da;
			}

			.user-badge {
				display: block;
				position: absolute;
				z-index: 15;
				right: 0;
				bottom: 0;
				width: 40rpx;
				height: 58rpx;
				overflow: hidden;

				.text {
					display: inline-block;
					position: absolute;
					z-index: 16;
					left: 50%;
					transform: translateX(-50%);
					top: 0.9em;
					font-size: 16rpx;
					color: #fc9313;
				}

				image {
					width: 100%;
					height: 100%;
				}
			}

			.user-hat {
				display: block;
				position: absolute;

				left: 0;
				top: 0;
				transform: translate(-25%, -25%);
				width: 62rpx;
				height: 52rpx;
			}
		}

		.user-name-block {
			margin-left: 17rpx;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-around;
			height: 142rpx;

			.user-name {
				color: #ffffff;
				font-weight: 600;
				font-size: 34rpx;
				max-width: 12em;
				@include text-ellipsis;

				background: rgba(0, 0, 0, 0);
				display: inline-flex;
				margin: 0;
				padding: 0;
				line-height: 1.4em;

				.text {
					@include text-ellipsis;
					max-width: 8em;
				}

				.updata-user-info {
					padding: 0 20rpx;
				}
			}

			.vip-block {
				white-space: nowrap;
				font-size: 0;

				.vip-block-left {
					font-size: 20rpx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 116rpx;
					height: 40rpx;
					background-color: #3a3129;
					color: #fff7d9;
					border-radius: 1000px 0 0 1000px;

					&.borderStyle {
						border-radius: 10000rpx;
					}
				}

				.vip-block-right {
					font-size: 20rpx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 86rpx;
					height: 40rpx;
					background-color: #ffde65;
					color: #3a3129;
					border-radius: 0 1000px 1000px 0;
				}
			}
		}
	}

	.vip-card-block {
		width: 702rpx;
		height: 324rpx;
		position: relative;
		z-index: 10;

		.card-A {
			position: absolute;
			top: 15rpx;
			width: 100%;
			height: 160rpx;
			background-image: linear-gradient(90deg, #ffe9ab, #ffb4bf);
			border-radius: 20rpx 20rpx 0 0;
			box-shadow: 0 -1px 1px #fffbd9;

			image {
				width: 26rpx;
				height: 26rpx;
				margin: 0 20rpx;
			}

			text {
				font-size: 20rpx;
				color: #4a4033;
				height: 60rpx;
			}

			> view {
				display: flex;
				line-height: 1.5em;
				align-items: center;
			}
		}

		.card-B {
			overflow: hidden;
			position: absolute;
			top: 70rpx;
			width: 100%;
			height: 255rpx;
			background-image: linear-gradient(90deg, #706a6b, #281c1f);
			border-radius: 20rpx 20rpx 0 0;

			.card-B-title {
				position: relative;
				z-index: 10;
				border-bottom: 1px solid #615f5c;
				height: 80rpx;
				margin: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 30rpx;
					height: 24rpx;
					margin-right: 20rpx;
				}

				text {
					font-size: 26rpx;
					color: #ffcf80;
				}

				navigator {
					width: 140rpx;
					height: 48rpx;
					border-radius: 10000rpx;
					font-size: 24rpx;
					color: #3a3129;
					display: flex;
					justify-content: center;
					align-items: center;
					background-image: linear-gradient(90deg, #ffe894, #ffde62);
				}
			}

			.icon-list {
				position: relative;
				z-index: 10;
				margin: 18rpx 20rpx 0;
				display: flex;
				flex-wrap: wrap;

				.item {
					display: flex;
					align-items: center;
					height: 55rpx;
					width: 165rpx;
					justify-content: center;
				}

				image {
					width: 30rpx;
					height: 30rpx;
				}

				text {
					font-size: 20rpx;
					color: #f8ca7d;
					text-indent: 0.5em;
				}
			}

			.bg-logo {
				position: absolute;
				z-index: 1;
				right: 0;
				bottom: -15rpx;
				width: 193rpx;
				height: 243rpx;
			}
		}
	}
}

.bottom-white-img {
	position: absolute;
	z-index: 100;
	bottom: -5rpx;
	width: 750rpx;
	height: 70rpx;
}

$color: #3e4656;

.user-property {
	padding-top: 20rpx;
	background-color: $bg-grey-color;
	position: relative;
	z-index: 120;

	.user-property-block {
		background: #ffffff;
		display: flex;
		justify-content: space-around;
		height: 165rpx;
		align-items: center;
		overflow: hidden;
	}

	.navigator,
	navigator {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		flex: 1;

		.value {
			font-size: 30rpx;
			font-weight: 600;
			color: $color;

			text {
				font-size: 16rpx;
				font-weight: 200;
				color: $color;
			}
		}

		> text {
			font-size: 23rpx;
			line-height: 50rpx;
			color: $color;
		}
	}
}

.banner-block {
	background-color: $bg-grey-color;
	font-size: 0;
	height: 200rpx;
	overflow: hidden;

	.content-wrap {
		height: 200rpx;
		overflow: hidden;
	}

	@mixin size {
		width: 300rpx;
		height: 200rpx;
	}

	.scroll-view {
		height: 220rpx;
		white-space: nowrap;
		@include hide-scrollbar;

		.image-block {
			margin-left: 20rpx;
			display: inline-block;

			image {
				border-radius: 20rpx;
				@include size;
			}

			&:nth-child(1) {
				margin-left: 0;
			}
		}
	}
}

.my-order-wrap {
	position: relative;
	z-index: 20;
	background-color: $bg-grey-color;
	padding: 20rpx 0;
	text {
		line-height: 60rpx;
		font-size: 25rpx;
	}

	.my-order-block {
		background-color: #ffffff;

		.title-h2 {
			padding: 25rpx 0 0 20rpx;
			font-size: 34rpx;
			font-weight: 600;
			color: $grey1-color;
			margin-bottom: 50rpx;
		}

		.menu-list {
			display: flex;

			padding-bottom: 35rpx;
			flex-wrap: nowrap !important;

			.navigator,
			navigator,
			.menu-block {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 175rpx;
				height: 142rpx;

				image {
					width: 62rpx;
					height: 62rpx;
				}

				text {
					font-size: 24rpx;
					color: $color;
					line-height: 50rpx;
				}
			}

			.navigator {
				position: relative;
			}

			.badge {
				display: inline-block;
				position: absolute;
				z-index: 20;
				transform: scale(0.8);
				/* #ifdef APP-PLUS */
				transform: scale(1) translateY(-10%);
				/* #endif */

				right: 20%;
				top: 0;
				font-size: 0;
			}
		}
	}
}

.my-serve {
	position: relative;
	z-index: 20;
	background-color: $bg-grey-color;
	padding: 20rpx 0;

	.my-serve-block {
		background-color: #ffffff;

		.title-h2 {
			padding: 25rpx 0 0 20rpx;
			font-size: 34rpx;
			font-weight: 600;
			color: $grey1-color;
		}

		.menu-list {
			display: flex;
			flex-wrap: wrap;

			.navigator,
			navigator,
			.menu-block {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 175rpx;
				height: 142rpx;

				image {
					width: 62rpx;
					height: 62rpx;
				}

				text {
					font-size: 24rpx;
					color: $color;
					line-height: 50rpx;
				}
			}

			.navigator {
				position: relative;
			}

			.badge {
				display: inline-block;
				position: absolute;
				z-index: 20;
				transform: scale(0.8);
				/* #ifdef APP-PLUS */
				transform: scale(1) translateY(-10%);
				/* #endif */

				right: 20%;
				top: 0;
				font-size: 0;
			}
		}
	}
}

.logo {
	background-color: $bg-grey-color;
	padding: 10rpx 0 30rpx;

	.text {
		color: #aaaaaa;
		width: 80vw;
		margin: 0 auto;
		text-align: center;
		font-size: 24rpx;
	}
}

.title-bar-wrap {
	position: fixed;
	z-index: 250;
	left: 0;
	top: 0;
	width: 100vw;
	background: #ffffff;
	.title-bar-block {
		width: 100vw;
	}
	.title-bar-flex {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: fixed;
		z-index: 200;
		top: 0;
		left: 0;
		width: 100vw;
		transition: 0.1s;
		.status-bar-block {
			width: 100vw;
		}
		.title-block {
			width: 100vw;
			height: 44px;
			.title-text {
				max-width: 80vw;
				font-size: 16px;
				color: #3e4656;
				font-weight: bold;
				letter-spacing: 1px;
				@include text-ellipsis-rows;
				-webkit-line-clamp: 1; /*设置显示的行数*/
			}
		}
	}
}

/*
	万象优鲜生鲜系统(简称: 万象优鲜)
	软著证书号: 6907220
	软著登记号: 2021SR0182903
	手机: 18310199838
	电话: 4006697689
	邮箱: 3319653051@qq.com
	著作权人: 北京世间万象网络科技有限公司
	版权所有: 北京世间万象网络科技有限公司
	任何组织和个人未经本单位许可与授权, 不得擅自复制、更改内容本系统受版权法保护如未经授权而擅自复制或传播本系统(或其中部分), 将受到严厉的刑事及民事制裁，并将在法律许可范围内受到最大可能的起诉!
*/
</style>
