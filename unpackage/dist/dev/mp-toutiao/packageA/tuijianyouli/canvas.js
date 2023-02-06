(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["packageA/tuijianyouli/canvas"],{

/***/ 386:
/*!*******************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js?{"page":"packageA%2Ftuijianyouli%2Fcanvas"} ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _canvas = _interopRequireDefault(__webpack_require__(/*! ./packageA/tuijianyouli/canvas.vue */ 387));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_canvas.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 387:
/*!************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas.vue?vue&type=template&id=ec52d74e&scoped=true& */ 388);
/* harmony import */ var _canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.vue?vue&type=script&lang=js& */ 390);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas.vue?vue&type=style&index=0&id=ec52d74e&lang=scss&scoped=true& */ 392);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "ec52d74e",
  null,
  false,
  _canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "packageA/tuijianyouli/canvas.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 388:
/*!*******************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue?vue&type=template&id=ec52d74e&scoped=true& ***!
  \*******************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./canvas.vue?vue&type=template&id=ec52d74e&scoped=true& */ 389);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_template_id_ec52d74e_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 389:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue?vue&type=template&id=ec52d74e&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 390:
/*!*************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./canvas.vue?vue&type=script&lang=js& */ 391);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 391:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _vuex = __webpack_require__(/*! vuex */ 36);
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
var _const = __webpack_require__(/*! @/tools/const.js */ 41);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var openSetting = function openSetting() {
  __webpack_require__.e(/*! require.ensure | df-components/openSetting/openSetting */ "df-components/openSetting/openSetting").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/openSetting/openSetting */ 1341));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var _default = {
  components: {
    openSetting: openSetting
  },
  data: function data() {
    return {
      isShowOpenSetting: false,
      isShowLoading: true,
      // 头像信息
      avatarSrc: '',
      //头像地址
      avatarSize: 0,
      //头像尺寸

      // 二维码信息
      codeSize: 0,
      //二维码尺寸
      codeX: 0,
      //二维码x坐标
      codeY: 0,
      //二维码y坐标

      // 画布信息
      canvasBgWidth: 0,
      //画布宽
      canvasBgHeight: 0,
      //画布高

      // 背景图信息
      gbImgSrc: '',
      //存放临时路径的对象
      temPathArr: {
        avatar: '',
        //头像
        code: '',
        //初始二维码
        bg: '',
        //背景图片
        avatarCode: '' //头像二维码 (剪切圆形的头像本地地址)
      },

      shareImgPath: ''
    };
  },
  mounted: function mounted() {
    var that = this;
  },
  onShow: function onShow() {
    var that = this;
    that.isShowLoading = true;
  },
  onLoad: function onLoad() {
    console.log('vuex 的 头像地址that.userInfoAvatar;', this.userInfoAvatar);
  },
  methods: {
    // pc后台转换单位函数
    pc2pxFn: function pc2pxFn(px) {
      px = px - 0;
      // pc后台设置屏幕宽度320
      return this.windowWidth * px / 320;
    },
    // 把配置列表的信息复制到data里
    setConfigFn: function setConfigFn() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var that, shareCodeImgHttpSrc;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = _this;
                that.avatarSrc = that.userInfoAvatar; //头像地址
                that.gbImgSrc = that.configInfo.invite_bg_img; //背景图地址
                if (that.gbImgSrc) {
                  _context.next = 6;
                  break;
                }
                that.failFn({
                  msg: '未设置海报背景图片'
                });
                return _context.abrupt("return");
              case 6:
                that.codeX = that.pc2pxFn(that.configInfo.invite_bg_qrcode_left); //二维码左边距
                that.codeY = that.pc2pxFn(that.configInfo.invite_bg_qrcode_top); //二维码上边距
                that.codeSize = that.pc2pxFn(that.configInfo.invite_bg_qrcode_size); //二维码大小

                that.canvasBgWidth = that.windowWidth; //画布宽
                that.canvasBgHeight = that.pc2pxFn(540); //画布高

                that.avatarSize = that.codeSize * 192 / 430;

                // 获取分享二维码图片链接
                _context.next = 14;
                return that.getShareCodeImgFn();
              case 14:
                shareCodeImgHttpSrc = _context.sent;
                if (shareCodeImgHttpSrc.type == 'success') {
                  Promise.all([(0, _tools.url2temPath)(shareCodeImgHttpSrc.result), (0, _tools.url2temPath)(that.avatarSrc), (0, _tools.url2temPath)(that.gbImgSrc)]).then(function (temPathArr) {
                    //初始二维码    //头像    //背景图片
                    that.temPathArr.code = temPathArr[0].result;
                    that.temPathArr.avatar = temPathArr[1].result;
                    that.temPathArr.bg = temPathArr[2].result;
                    console.log(that.temPathArr, '拿到三个临时路径', '\n');
                    that.clipArcAvatarFn();
                  }).catch(function (e) {
                    that.failFn({
                      msg: e.msg
                    });
                  });
                } else {
                  that.failFn({
                    msg: shareCodeImgHttpSrc.msg
                  });
                }
                console.log(that.avatarSrc, ' 头像地址', '\n', that.gbImgSrc, ' 背景地址', '\n');
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    // 剪切头像 成圆形
    clipArcAvatarFn: function clipArcAvatarFn() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var that, ctx, imgW, imgH, imgPath;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this2; // 创建画布对象
                ctx = uni.createCanvasContext('avatarCanvas'); // 根据 图片的大小 绘制底图 的大小
                imgW = that.avatarSize, imgH = that.avatarSize, imgPath = that.temPathArr.avatar;
                ctx.save();
                ctx.arc(imgW / 2, imgH / 2, imgW / 2, 0, 2 * Math.PI); //绘制圆形
                ctx.setStrokeStyle('rgba(0,0,0,0)');
                ctx.stroke(); //这个一定要有，不然图片不剪切，我就是遇到了这个问题
                ctx.clip(); //剪切
                ctx.drawImage(imgPath, 0, 0, imgW, imgH); //置入图片
                ctx.restore(); //恢复之前保存的绘图上下文
                ctx.draw(true, function () {
                  //保存画布上的东西 画完后执行回调
                  that.saveAvatarFn();
                });
              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 保存圆形头像地址
    saveAvatarFn: function saveAvatarFn() {
      var that = this;
      // 拿到拼合好的图片
      uni.canvasToTempFilePath({
        canvasId: 'avatarCanvas',
        success: function success(res) {
          var tempFilePath = res.tempFilePath;
          that.temPathArr.avatarCode = tempFilePath;
          console.log('保存完圆形头像的临时路径开始 画最终分享图', '\n');
          that.createSharImgFn();
        },
        fail: function fail(res) {
          that.failFn({
            msg: '获取圆形头像路径失败'
          });
        }
      }, that);
    },
    // 生成分享图片
    createSharImgFn: function createSharImgFn() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var that, bgImgSrc, ctx, imgW, imgH, imgPath;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this3;
                bgImgSrc = that.temPathArr.bg; // 创建画布对象
                ctx = uni.createCanvasContext('sharImgCanvas'); // 获取图片信息，要按照原图来绘制，否则图片会变形
                // 根据 图片的大小 绘制底图 的大小
                imgW = that.canvasBgWidth, imgH = that.canvasBgHeight, imgPath = bgImgSrc; // 绘制底图 用原图的宽高比绘制
                ctx.drawImage(imgPath, 0, 0, imgW, imgH);
                (function () {
                  // 根据 图片的大小 绘制底图 的大小
                  var imgW = that.codeSize,
                    imgH = that.codeSize,
                    imgPath = that.temPathArr.code;
                  ctx.drawImage(imgPath, that.codeX, that.codeY, imgW, imgH);
                  ctx.beginPath();
                  var _that$getAvatarInfo = that.getAvatarInfo(),
                    avatarSize = _that$getAvatarInfo.avatarSize,
                    avatarX = _that$getAvatarInfo.avatarX,
                    avatarY = _that$getAvatarInfo.avatarY;
                  ctx.arc(avatarX, avatarY, avatarSize / 2, 0, 2 * Math.PI);
                  ctx.setFillStyle('#ffffff');
                  ctx.fill();
                  ctx.drawImage(that.temPathArr.avatarCode, avatarX - avatarSize / 2, avatarY - avatarSize / 2, avatarSize, avatarSize);
                  ctx.draw(true, function () {
                    that.showShareImgFn();
                  });
                })();
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 获取头像尺寸坐标信息
    getAvatarInfo: function getAvatarInfo() {
      var that = this;
      var avatarSize = parseInt(that.codeSize * 192 / 430),
        //头像尺寸
        avatarMargin = (that.codeSize - avatarSize) / 2,
        //头像距离二维码图片边框的边界距离
        avatarX = avatarMargin + that.codeX + avatarSize / 2,
        //头像在整个画布上的距离X
        avatarY = avatarMargin + that.codeY + avatarSize / 2; //头像在整个画布上的距离Y
      return {
        avatarSize: avatarSize,
        avatarX: avatarX,
        avatarY: avatarY
      };
    },
    // 获取分享二维码链接
    getShareCodeImgFn: function getShareCodeImgFn() {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(resFn, rejFn) {
          var result;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return that.$request({
                    url: '/api/Share/xcxImg'
                  });
                case 2:
                  result = _context4.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resFn({
                        type: 'success',
                        msg: '获取分享二维码图片成功',
                        result: result.data.data
                      });
                    } else {
                      rejFn({
                        type: 'error',
                        msg: result.data.msg,
                        result: result.data.msg
                      });
                    }
                  } else {
                    rejFn({
                      type: 'error',
                      msg: that.$errorMsg,
                      result: that.$errorMsg
                    });
                  }
                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    },
    failFn: function failFn(failMsg) {
      var that = this;
      uni.showModal({
        showCancel: false,
        //不显示取消按钮
        title: failMsg.msg,
        success: function success(e) {
          //确认后的回调
          console.log(e);
          that.toBackFn();
        }
      });
    },
    // 点击保存到本地
    saveShearImgFn: function saveShearImgFn() {
      var that = this;
      // 未绑定手机号不能操作以下功能
      if (!that.isRunBindMobileFunc) {
        uni.showModal({
          title: _const.bindMobileTips,
          success: function success(e) {
            e.confirm && that.navigateToFn({
              url: "/packageA/tel-login/user-info"
            });
          }
        });
        return false;
      }
    },
    // 安卓app端保存图片
    saveImgAppFn: function saveImgAppFn(src) {
      uni.getImageInfo({
        src: src,
        success: function success(res) {
          uni.saveImageToPhotosAlbum({
            filePath: res.path,
            success: function success() {
              uni.showToast({
                icon: 'success',
                title: '保存成功'
              });
            },
            fail: function fail() {
              uni.showToast({
                icon: 'none',
                title: '保存失败'
              });
            }
          });
        },
        fail: function fail(e) {
          console.log('获取图片信息错误', e);
        }
      });
    },
    // 保存图片函数
    saveImgFn: function saveImgFn(src) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var that, settingInfo;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                that = _this4; // 获取权限列表的信息
                _context5.next = 3;
                return that.settingInfoFn('scope.writePhotosAlbum');
              case 3:
                settingInfo = _context5.sent;
                console.log(settingInfo, '获取权限列表的信息', '\n');
                if (settingInfo.type == 'success') {
                  // 如果用户 授权 了 并且 授权 状态是 禁止的 状态
                  if (settingInfo.isOk == false && settingInfo.isFirst == false) {
                    // 打开权限列表 让用户打开该状态
                    // that.openSettingFn('scope.writePhotosAlbum');

                    that.isShowOpenSetting = true;
                    /*
                    				wx.openSetting({
                    	success(res) {
                    		console.log(res.authSetting);
                    	}
                    });
                     */
                  }
                  // 如果是第一次使用该 权限 或者 该权限已通过 正常调用函数
                  if (settingInfo.isFirst || settingInfo.isOk) {
                    uni.getImageInfo({
                      src: src,
                      success: function success(res) {
                        uni.saveImageToPhotosAlbum({
                          filePath: res.path,
                          success: function success() {
                            uni.showToast({
                              icon: 'success',
                              title: '保存成功'
                            });
                          },
                          fail: function fail() {
                            uni.showToast({
                              icon: 'none',
                              title: '保存失败'
                            });
                          }
                        });
                      },
                      fail: function fail(e) {
                        console.log('获取图片信息错误', e);
                      }
                    });
                  }
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: settingInfo.msg
                  });
                }
              case 6:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    cloneSettingFn: function cloneSettingFn() {
      console.log('cloneSettingFn', '\n');
      this.isShowOpenSetting = false;
    },
    // canvas画完后 展示最后的分享图片
    showShareImgFn: function showShareImgFn() {
      var that = this;
      // 拿到拼合好的图片
      uni.canvasToTempFilePath({
        canvasId: 'sharImgCanvas',
        success: function success(res) {
          var tempFilePath = res.tempFilePath;
          that.shareImgPath = tempFilePath;
          that.isShowLoading = false;
        },
        fail: function fail(res) {
          that.failFn({
            msg: '保存失败稍后重试'
          });
        }
      }, that);
    }
  },
  computed: _objectSpread({}, (0, _vuex.mapState)({
    userInfoAvatar: function userInfoAvatar(store) {
      return store.userInfo.userInfoAvatar;
    } // 头像地址
  }))
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 392:
/*!**********************************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue?vue&type=style&index=0&id=ec52d74e&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./canvas.vue?vue&type=style&index=0&id=ec52d74e&lang=scss&scoped=true& */ 393);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_canvas_vue_vue_type_style_index_0_id_ec52d74e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 393:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/tuijianyouli/canvas.vue?vue&type=style&index=0&id=ec52d74e&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[386,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/packageA/tuijianyouli/canvas.js.map