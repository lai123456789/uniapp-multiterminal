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

import Vue from 'vue'
import Vuex from 'vuex'


import {
	checkTypeFn,
	assertObject,
	cloneFn
} from '@/tools/tools'


// 站点域名
import {
	host,
} from '@/tools/siteinfo.js'

import home from './home';
import _class from './_class';
import cart from './cart';
import userInfo from './user-info';
import eat from './eat.js';




Vue.use(Vuex);
const store = new Vuex.Store({
	modules: {
		home,
		_class,
		cart,
		userInfo,
		eat,
	},
	state: {

		appStaticPath: '', // 设置程序里使用的静态图片路径 (永远不换的图片)
		configInfo: {}, // 全局的设置数据







		MenuList: [], // tab-bar 的数据


		isiPhoneX: false, // 是否iphonx 




		homeTemplateIdList: [], // 首页的模板消息id字符串 数组
		homeTemplateIdSettingFlag: true, // 设置过 允许并且 不再提示
		globalMainSwitch: false, // 小程序设置里 允许发送发送模板消息的 设置
		defaultHomeToastModalStatus: true, // 默认首页 弹出 确认 权限的 模态框

		isUserCloneFlag: false, // 是否是 用户 手动关闭的


		token: '', // 全局的token

		refreshCurrentPage: false, // 登录返回后重新刷新页面


		backIconTop: 26, // 详情页返回上一页的左上角图标距离顶部的位置



		// #ifdef H5
		browserIsWx: false, // 当前环境是否是基于公众号微信浏览器 是微信浏览器 true;   不是微信浏览器 false
		// #endif

		buyHistoryList: [], // 平台的购买记录数据


		// #ifdef APP-PLUS
		appenv: '', // 当前运行环境 安卓 or 苹果
		// #endif
		
	},
	mutations: {
		// 赋值 给token 值
		setToken(store, tokenStr) {
			store.token = tokenStr;
		},
		// 设置程序里使用的静态图片路径 (永远不换的图片)
		setAppStaticPath(store) {
			store.appStaticPath = `${host}/wx-image`;
		},


		// 赋值 全局的设置数据
		setConfigInfo(store, configInfo) {
			store.configInfo = configInfo
		},

		// 赋值 tab-bar 的数据
		setMenuList(store, arg) {
			store.MenuList = arg;
		},

		// 赋值 是否iphonx 
		setIsiPhoneX(store, bool) {
			store.isiPhoneX = bool;
		},

		// 设置发送优惠券模板id 数组
		setHomeTemplateIdList(store, list) {
			store.homeTemplateIdList = list;
		},
		// 设置首页模板消息id 是否被永久 允许了
		setHomeTemplateIdSettingFlag(store, bool) {
			store.homeTemplateIdSettingFlag = bool;
		},
		// 赋值 小程序设置里 允许发送发送模板消息的 设置
		setGlobalMainSwitch(store, bool) {
			store.globalMainSwitch = bool;
		},
		// 赋值 首页弹框状态
		setDefaultHomeToastModalStatus(store, bool) {
			store.defaultHomeToastModalStatus = bool;
		},

		// 赋值 是否是用户手动关闭的状态
		setIsUserCloneFlag(store, bool) {
			store.isUserCloneFlag = bool;
		},

		// 赋值当前页面是否需要刷新
		setRefreshCurrentPage(store, bool) {
			store.refreshCurrentPage = bool;
		},
		// 赋值 详情页返回上一页的左上角图标距离顶部的距离
		setBackIconTop(store, height) {
			store.backIconTop = height
		},
		// #ifdef H5
		// 赋值 当前环境是否是基于公众号微信浏览器
		setBrowserIsWx(store, flag) {
			store.browserIsWx = flag
		},
		// #endif
		// 赋值 平台的购买记录数据
		setBuyHistoryList(store, list) {
			store.buyHistoryList = list
		},

		// #ifdef APP-PLUS
		// 赋值 给当前运行环境 安卓 or 苹果
		setAppenv(store, envStr) {
			store.appenv = envStr
		},
		// #endif
		
		
	},
	actions: {

	},
	getters: {
		// 是否打开 吃什么 选项
		getIsOpenEat(state) {
			let tabbar = state.configInfo.tabbar || [];
			for (let i = 0; i < tabbar.length; i++) {
				if (tabbar[i].field == 'c') {
					if (tabbar[i].xs == 1) {
						return true;
					} else {
						return false;
					}

				}
			}
		},
		/* 
			返回是否 审核状态
			true 在审核
			false 不审核
		*/
		miniProgrameCheck(state) {
			return state.configInfo.mini_program_check == 1;
		},
		/*
			@description 是否开启了会员功能
			@return <Boolean>
				true 表示开启了vip功能
				false 表示关闭了vip功能
		 */
		isOpenVipFunc(state) {
			return state.configInfo.user_vip_card == 1 ? true : false
		},

		/* 
			
			@description 是否打开 全栈搜索功能
			@return <Boolean>
				true 表示开启了全栈搜索功能
				false 表示关闭了全栈搜索功能
		*/
		isOpenHomeSearchFunc(state) {
			return assertObject(state.configInfo).search_is_show == 1 ? true : false
		}


	}
})

export default store;
