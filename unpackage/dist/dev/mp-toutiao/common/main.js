(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!***********************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, uni, createApp) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _App = _interopRequireDefault(__webpack_require__(/*! @/App */ 26));
var _mixin = _interopRequireDefault(__webpack_require__(/*! @/tools/mixin */ 35));
var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 42));
var _siteinfo = __webpack_require__(/*! @/tools/siteinfo */ 38);
var _const = __webpack_require__(/*! @/tools/const */ 41);
var _installs = __webpack_require__(/*! @/tools/libs/installs */ 48);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__; /* 
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

// 挂载vuex 
_vue.default.prototype.$store = _store.default;
_vue.default.mixin(_mixin.default); // 挂载混入

// 挂载全局组件↓↓↓↓↓↓↓
// 开屏动画
var loadingCss = function loadingCss() {
  __webpack_require__.e(/*! require.ensure | df-components/loading-image/loader-css */ "df-components/loading-image/loader-css").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/loading-image/loader-css */ 752));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('loading-css', loadingCss);

// 没有数据的空页面
var nullBlock = function nullBlock() {
  __webpack_require__.e(/*! require.ensure | df-components/undefined-image/index */ "df-components/undefined-image/index").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/undefined-image */ 759));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('null-block', nullBlock);

// 回到顶部按钮
var toTopBtn = function toTopBtn() {
  __webpack_require__.e(/*! require.ensure | df-components/to-top-btn/index */ "df-components/to-top-btn/index").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/to-top-btn */ 766));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('to-top-btn', toTopBtn);

// 登录框
var loginFn = function loginFn() {
  __webpack_require__.e(/*! require.ensure | df-components/loginFn/index */ "df-components/loginFn/index").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/loginFn */ 773));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('login-fn', loginFn);

// 自定义导航栏底部tab-bar 
var hansTabbar = function hansTabbar() {
  __webpack_require__.e(/*! require.ensure | df-components/hans-tabbar/hans-tabbar */ "df-components/hans-tabbar/hans-tabbar").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/hans-tabbar/hans-tabbar */ 780));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('hans-tabbar', hansTabbar);

// 自定义顶部标题栏组件 title-bar
var titleBar = function titleBar() {
  __webpack_require__.e(/*! require.ensure | df-components/title-bar/title-bar */ "df-components/title-bar/title-bar").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/title-bar/title-bar.vue */ 787));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('title-bar', titleBar);

// 商品列表页面的 购物车 按钮
var fixedCartIcon = function fixedCartIcon() {
  __webpack_require__.e(/*! require.ensure | df-components/fixed-cart-icon/fixed-cart-icon */ "df-components/fixed-cart-icon/fixed-cart-icon").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/fixed-cart-icon/fixed-cart-icon.vue */ 794));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('fixed-cart-icon', fixedCartIcon);

// 图片组件 图片未加载时 显示css加载动画
var imgBgCss = function imgBgCss() {
  __webpack_require__.e(/*! require.ensure | df-components/img-bg-css/img-bg-css */ "df-components/img-bg-css/img-bg-css").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/img-bg-css/img-bg-css.vue */ 801));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('img-bg-css', imgBgCss);

// 余额图标组件 (支付页面余额的那个星星图标)
var yveIcon = function yveIcon() {
  __webpack_require__.e(/*! require.ensure | df-components/yve-icon/yve-icon */ "df-components/yve-icon/yve-icon").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/yve-icon/yve-icon.vue */ 808));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('yve-icon', yveIcon);

// 会员价格显示组件
var vipPrice = function vipPrice() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/vip-price */ "df-components/global-components/vip-price").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/vip-price.vue */ 815));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('vip-price', vipPrice);

// 可以横向滑动的商品组件
var scrollGoodsItem = function scrollGoodsItem() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/scroll-goods-item */ "df-components/global-components/scroll-goods-item").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/scroll-goods-item.vue */ 822));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('scroll-goods-item', scrollGoodsItem);

// 列表商品组件
var listGoodsItem = function listGoodsItem() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/list-goods-item */ "df-components/global-components/list-goods-item").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/list-goods-item.vue */ 829));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('list-goods-item', listGoodsItem);

// 列表商品组件 (横向排列展示)
var listGoodsItemRow = function listGoodsItemRow() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/list-goods-item-row */ "df-components/global-components/list-goods-item-row").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/list-goods-item-row.vue */ 836));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('list-goods-item-row', listGoodsItemRow);

// 商品规格弹框
var goodsSpec = function goodsSpec() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/goods-spec */ "df-components/global-components/goods-spec").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/goods-spec.vue */ 843));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('goods-spec', goodsSpec);

// 自定义动态组件 实现
var allComponents = function allComponents() {
  __webpack_require__.e(/*! require.ensure | df-components/all-component/all-components */ "df-components/all-component/all-components").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/all-component/all-components.vue */ 850));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('all-components', allComponents);

// 悬浮页面按钮组件
var floatIcon = function floatIcon() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/float-icon */ "df-components/global-components/float-icon").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/float-icon.vue */ 857));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
_vue.default.component('float-icon', floatIcon);

// 挂载全局组件↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// Vue.prototype.onoff = false; // 处理一瞬间点击好多次
_vue.default.prototype.$onceClick = _installs.onceClick; // 处理一瞬间点击好多次

_vue.default.prototype.$errorMsg = _const.errorMsg; // 错误提示文字

// h5 端请求腾讯地图 服务器跨域问题

_vue.default.config.productionTip = false; // 隐藏vue 打印的东西

_App.default.mpType = 'app'; // 不知道是啥 是uni-app 自带的东西不用随便动 
var app = new _vue.default(_objectSpread(_objectSpread({}, _App.default), {}, {
  beforeCreate: function beforeCreate() {
    console.log('main文件里beforecreate执行', '当前host', _siteinfo.host);
  },
  created: function created() {
    // 不考虑操作dom可以执行mixin里的methods
    this.mainCreatedFn();
  }
}));
createApp(app).$mount();

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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 26:
/*!***********************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/App.vue ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 27);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 32);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 27:
/*!************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 28);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 28:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _default = {
  onLaunch: function onLaunch(options) {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var config;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('App.vue onLaunch run');
              console.log('app的onLaunch执行 options参数', options);
              console.log('获取全局配置前');
              _context.next = 5;
              return _this.setConfigFn();
            case 5:
              config = _context.sent;
              // 设置全局的config 数据

              // console.log('获取全局配置后 that.configInfo->', this.configInfo, 'config', config);
              _this.launchFn(options);
              uni.onTabBarMidButtonTap(function () {
                plus.android.requestPermissions(['android.permission.ACCESS_FINE_LOCATION'], function (e) {
                  if (e.deniedAlways.length > 0) {
                    //权限被永久拒绝
                    // 弹出提示框解释为何需要权限，引导用户打开设置页面开启
                    console.log('权限被永久拒绝' + e.deniedAlways.toString());
                  }
                  if (e.deniedPresent.length > 0) {
                    //权限被临时拒绝
                    // 弹出提示框解释为何需要权限，可再次调用plus.android.requestPermissions申请权限
                    console.log('权限被临时拒绝' + e.deniedPresent.toString());
                  }
                  if (e.granted.length > 0) {
                    //权限被允许
                    console.log('权限被允许' + e.granted.toString());
                  }
                }, function (e) {
                  console.log('Request Permissions error:' + JSON.stringify(e));
                });
              });
            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  onShow: function onShow() {
    console.log('App.vue onShow run');
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 32:
/*!*********************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 33);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 33:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-toutiao/common/main.js.map