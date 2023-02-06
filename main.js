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


uni.hideTabBar({}); // 因为是自定义底部菜单 所以 隐藏掉 默认的那个

// 根vue
import Vue from 'vue'

// 引入app
import App from '@/App'

// 混入
import mixin from '@/tools/mixin'

// vuex 全局的状态管理
import store from '@/store'


// 域名信息
import {
	host
} from '@/tools/siteinfo'


// 常量 errorMsg 错误信息
import {
	errorMsg
} from '@/tools/const'


// 挂载vuex 
Vue.prototype.$store = store;

Vue.mixin(mixin); // 挂载混入

// 挂载全局组件↓↓↓↓↓↓↓
// 开屏动画
import loadingCss from '@/df-components/loading-image/loader-css'
Vue.component('loading-css', loadingCss)

// 没有数据的空页面
import nullBlock from '@/df-components/undefined-image'
Vue.component('null-block', nullBlock)



// 回到顶部按钮
import toTopBtn from '@/df-components/to-top-btn'
Vue.component('to-top-btn', toTopBtn)


// 登录框
import loginFn from '@/df-components/loginFn'
Vue.component('login-fn', loginFn)

// 自定义导航栏底部tab-bar 
import hansTabbar from '@/df-components/hans-tabbar/hans-tabbar'
Vue.component('hans-tabbar', hansTabbar)


// 自定义顶部标题栏组件 title-bar
import titleBar from '@/df-components/title-bar/title-bar.vue'
Vue.component('title-bar', titleBar)



// 商品列表页面的 购物车 按钮
import fixedCartIcon from '@/df-components/fixed-cart-icon/fixed-cart-icon.vue'
Vue.component('fixed-cart-icon', fixedCartIcon)


// 图片组件 图片未加载时 显示css加载动画
import imgBgCss from '@/df-components/img-bg-css/img-bg-css.vue'
Vue.component('img-bg-css', imgBgCss);

// 余额图标组件 (支付页面余额的那个星星图标)
import yveIcon from '@/df-components/yve-icon/yve-icon.vue'
Vue.component('yve-icon', yveIcon);

// 会员价格显示组件
import vipPrice from '@/df-components/global-components/vip-price.vue'
Vue.component('vip-price', vipPrice);


// 可以横向滑动的商品组件
import scrollGoodsItem from '@/df-components/global-components/scroll-goods-item.vue'
Vue.component('scroll-goods-item', scrollGoodsItem);

// 列表商品组件
import listGoodsItem from '@/df-components/global-components/list-goods-item.vue'
Vue.component('list-goods-item', listGoodsItem);

// 列表商品组件 (横向排列展示)
import listGoodsItemRow from '@/df-components/global-components/list-goods-item-row.vue'
Vue.component('list-goods-item-row', listGoodsItemRow);


// 商品规格弹框
import goodsSpec from '@/df-components/global-components/goods-spec.vue'
Vue.component('goods-spec', goodsSpec);


// 自定义动态组件 实现
import allComponents from '@/df-components/all-component/all-components.vue'
Vue.component('all-components', allComponents);



// 悬浮页面按钮组件
import floatIcon from '@/df-components/global-components/float-icon.vue'
Vue.component('float-icon', floatIcon);


// 挂载全局组件↑↑↑↑↑↑↑↑↑↑↑↑↑↑

import {
	onceClick
} from '@/tools/libs/installs'

// Vue.prototype.onoff = false; // 处理一瞬间点击好多次
Vue.prototype.$onceClick = onceClick; // 处理一瞬间点击好多次


Vue.prototype.$errorMsg = errorMsg; // 错误提示文字


// h5 端请求腾讯地图 服务器跨域问题


// #ifdef H5
import {
	VueJsonp
} from '@/tools/libs/vue-jsonp.js'
Vue.use(VueJsonp)
// #endif




Vue.config.productionTip = false; // 隐藏vue 打印的东西

App.mpType = 'app' // 不知道是啥 是uni-app 自带的东西不用随便动 
const app = new Vue({
	...App,
	beforeCreate() {
		console.log(
			'main文件里beforecreate执行',
			'当前host', host,
		);
	},
	created() {
		// 不考虑操作dom可以执行mixin里的methods
		this.mainCreatedFn();
	},
});
app.$mount();


// #ifdef H5
// let showvConsoleHost = ['192.168.1.10', 'dev.sjwxsc.com']; // 显示控制台的域名列表
let showvConsoleHost = []; // 显示控制台的域名列表
let locationHost = location.host
if (showvConsoleHost.filter(i => locationHost.includes(i)).length) {
	// h5手机浏览器调试的控制台
	let scriptTag = document.createElement('script');
	document.body.append(scriptTag)

	scriptTag.addEventListener('load', function() {
		var vConsole = new VConsole();
		console.log('load');
	}, false)
	scriptTag.src = 'https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js'
}
// #endif




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
