(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["packageA/activity/activity"],{

/***/ 474:
/*!*****************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js?{"page":"packageA%2Factivity%2Factivity"} ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _activity = _interopRequireDefault(__webpack_require__(/*! ./packageA/activity/activity.vue */ 475));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_activity.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 475:
/*!**********************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./activity.vue?vue&type=template&id=34acb849&scoped=true& */ 476);
/* harmony import */ var _activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./activity.vue?vue&type=script&lang=js& */ 478);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./activity.vue?vue&type=style&index=0&id=34acb849&lang=scss&scoped=true& */ 480);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "34acb849",
  null,
  false,
  _activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "packageA/activity/activity.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 476:
/*!*****************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue?vue&type=template&id=34acb849&scoped=true& ***!
  \*****************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./activity.vue?vue&type=template&id=34acb849&scoped=true& */ 477);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_template_id_34acb849_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 477:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue?vue&type=template&id=34acb849&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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

/***/ 478:
/*!***********************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./activity.vue?vue&type=script&lang=js& */ 479);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 479:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var goodsItemColumn = function goodsItemColumn() {
  Promise.all(/*! require.ensure | packageA/activity/activity-components/goods-item-column */[__webpack_require__.e("common/vendor"), __webpack_require__.e("packageA/activity/activity-components/goods-item-column")]).then((function () {
    return resolve(__webpack_require__(/*! @/packageA/activity/activity-components/goods-item-column.vue */ 1355));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var goodsItemRow = function goodsItemRow() {
  Promise.all(/*! require.ensure | packageA/activity/activity-components/goods-item-row */[__webpack_require__.e("common/vendor"), __webpack_require__.e("packageA/activity/activity-components/goods-item-row")]).then((function () {
    return resolve(__webpack_require__(/*! @/packageA/activity/activity-components/goods-item-row.vue */ 1362));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
// const ztId = 2;

var templateType1 = 1,
  templateType2 = 2,
  templateType3 = 3;
var _default = {
  components: {
    goodsItemColumn: goodsItemColumn,
    goodsItemRow: goodsItemRow
  },
  data: function data() {
    return {
      isShowLoading: true,
      // 开屏动画

      id: null,
      // 模板id
      templateType: null,
      // 模板类型 1,2,3 (对应 后台的 模板一 模板二 模板三)

      // ↓↓↓ 三个模板类型
      templateType1: templateType1,
      templateType2: templateType2,
      templateType3: templateType3,
      pageTitle: '',
      // 页面标题
      pageBgColor: '',
      // 页面背景颜色

      topImage: '',
      // 页面顶部的图片路径
      topImageClickType: 0,
      // 点击顶部图跳转类型
      topImageClickContent: 0,
      // 点击顶部图跳转内容

      topGoodsBannerTitleImage: '',
      // 顶部的商品标题图片路径
      topGoodsList: [{}],
      // 顶部的商品列表数据

      bottomGoodsBannerTitleImage: '',
      // 底部的商品标题图片路径
      bottomGoodsList: [{}],
      // 底部的商品列表数据

      bottomImage: '',
      // 页面底部的图片路径

      couponTitleText: '',
      // 优惠券标题文字
      couponTitleColor: '',
      // 优惠券标题文字颜色
      couponTitleIconBgColor: '',
      // 优惠券标题的图标的背景颜色
      couponBlockBgColor: '',
      // 优惠券背景颜色
      couponBlockTextColor: '',
      // 优惠券字体颜色
      couponList: [{}],
      // 优惠券列表

      loadMoreBgColor: '',
      // 加载更多按钮背景颜色
      loadMoreTextColor: '',
      // 加载更多按钮文字颜色
      loadMoreIconColor: '',
      // 加载更多按钮箭头图标颜色

      isloadEnd: false,
      // 是否全部加载完成了
      goodsListIsAllOpen: false,
      // 商品列表是否全部展开了
      moreGoodsListStr: '',
      // 收起商品的数据

      bottomGoodsIndex: 1,
      // 底部商品的分页数索引

      // 处理模板三的底线
      bottomLineText: '',
      // 底部的底线提示文字
      bottomLineColor: '',
      // 底部的底线提示文字颜色

      // ↓↓↓ 多规格相关数据 --------------------------------------------------------
      isShowGoodsSpec: false,
      // 是否显示多规格弹框
      goodsSpecSelectItemList: [{}],
      // 多规格项
      goodsSpecRowsList: {},
      // 多规格 笛卡尔积项对应的 商品 信息
      currentGoodsName: '',
      // 当前弹窗多规格的商品名字
      currentGoodsDescription: '',
      // 当前弹窗多规格的商品描述
      currentGoodsImages: '',
      // 当前弹窗多规格的商品图片
      currentGoodsId: '',
      // 当前弹窗多规格的商品id
      currentGoodsSelectedNum: '',
      // 当前弹窗多规格的商品即加入到购物车里的数量
      // ↑↑↑ 多规格相关数据 --------------------------------------------------------
      loginBoxFlag: false,
      // 登录框显示隐藏状态
      cardNumber: 0 // 购物车数量
    };
  },
  onUnload: function onUnload() {
    uni.$off('goodsAddCartEd_activity');
  },
  onLoad: function onLoad(options) {
    var that = this;
    that.id = options.id;

    // 加入购物车成功后
    uni.$off('goodsAddCartEd_activity');
    uni.$on('goodsAddCartEd_activity', function (arg) {
      var selectedNum = arg.selectedNum,
        goodsId = arg.goodsId;
      that.topGoodsList.forEach(function (item) {
        if (item.goodsId == goodsId) {
          item.selectedNum = selectedNum;
        }
      });
      that.bottomGoodsList.forEach(function (item) {
        if (item.goodsId == goodsId) {
          item.selectedNum = selectedNum;
        }
      });
    });
  },
  onShow: function onShow() {
    var that = this;
    that.isShowLoading = true;
    // 监听登录框
    uni.$off('setLoginBoxFlag');
    uni.$on('setLoginBoxFlag', function (loginBoxFlag) {
      that.loginBoxFlag = loginBoxFlag;
    });
    that.loadFn();

    // 监听购物车数量改变
    uni.$off('setCardNumberFn');
    uni.$on('setCardNumberFn', function (cardNumber) {
      that.cardNumber = cardNumber;
    });
    that.setTabBarCartNumFn();

    // 监听多规格弹框事件
    uni.$off('popSpecBlock');
    uni.$on('popSpecBlock', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(arg) {
        var goodsId, page, currentGoods, result;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                goodsId = arg.goodsId, page = arg.page;
                currentGoods = (0, _tools.assertObject)((0, _tools.assertArray)((0, _tools.cloneFn)(that.topGoodsList).concat((0, _tools.cloneFn)(that.bottomGoodsList)).filter(function (item) {
                  return item.goodsId == goodsId;
                }))[0]);
                that.currentGoodsId = goodsId;
                uni.showLoading({});
                console.log('当前点击商品的信息currentGoods', currentGoods);
                that.currentGoodsName = currentGoods.goodsName; // 当前弹窗多规格的商品名字
                that.currentGoodsDescription = currentGoods.goodsDescription; // 当前弹窗多规格的商品描述
                that.currentGoodsImages = currentGoods.goodsImage; // 当前弹窗多规格的商品图片

                that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量
                _context.next = 11;
                return that.getSpecInfoFn(that.currentGoodsId);
              case 11:
                result = _context.sent;
                if (!(result.type != 'success')) {
                  _context.next = 16;
                  break;
                }
                that.hideAllFn();
                uni.showModal({
                  showCancel: false,
                  //不显示取消按钮
                  title: result.msg,
                  success: function success(e) {
                    //确认后的回调
                    console.log(e);
                  }
                });
                return _context.abrupt("return", false);
              case 16:
                that.goodsSpecSelectItemList = result.result.goodsSpecSelectItemList;
                that.goodsSpecRowsList = result.result.goodsSpecRowsList;
                console.log("".concat(that.currentGoodsId, " \u5546\u54C1\u7684\u89C4\u683C\u4FE1\u606F"), result);
                that.isShowGoodsSpec = true;
                that.hideAllFn();
              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  methods: {
    // 登录成功后
    refreshFn: function refreshFn() {
      this.loadFn();
    },
    // 根据模板id获取当前模板类型 和 展示数据
    getTemplateInfoFn: function getTemplateInfoFn(templateId) {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(resFn, rejFn) {
          var result, resultObject, goodsObj, topGoods, bottomGoods, pageTopImage, templateType, resultObj, content, con, couponObj, loadMore, bottomLine;
          return _regenerator.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return that.$request({
                    url: '/api/Zthd/ztDetail',
                    data: {
                      id: templateId
                    }
                  });
                case 2:
                  result = _context2.sent;
                  //数据返回后 处理方式  处理数据
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resultObject = (0, _tools.assertObject)(result.data.data); // 接口的所有数据
                      goodsObj = (0, _tools.assertObject)(resultObject.goods); // 所有商品数据
                      topGoods = (0, _tools.assertObject)(goodsObj['1']); // 页面上半部分商品
                      bottomGoods = (0, _tools.assertObject)(goodsObj['2']); // 页面下半部分商品
                      pageTopImage = (0, _tools.assertObject)(resultObject.top_img); // 页面顶部的图片信息
                      templateType = resultObject.z_id; // 模板类型
                      // 成功的 result 数据
                      resultObj = {
                        templateType: templateType
                      }; // ↓↓↓ 页面配置
                      // 页面标题
                      resultObj.pageTitle = resultObject.title;
                      // 页面背景颜色
                      resultObj.pageBgColor = resultObject.bg_color;

                      // 页面顶部图片配置

                      if (pageTopImage.jump_type == 6) {
                        con = (0, _tools.assertObject)(pageTopImage.jumpPath);
                        content = {
                          appid: con.AppId,
                          path: con.AppUrl
                        };
                      } else {
                        content = pageTopImage.jumpPath;
                      }
                      resultObj.topImage = pageTopImage.httpPath ? pageTopImage.httpPath : '';
                      resultObj.topImageClickType = pageTopImage.jump_type;
                      resultObj.topImageClickContent = content;
                      resultObj.topGoods = {
                        bannerTitleImage: topGoods.bannerHttp ? topGoods.bannerHttp : '',
                        goodsList: (0, _tools.assertArray)(topGoods.goodsList)
                      };
                      resultObj.bottomGoods = {
                        bannerTitleImage: bottomGoods.bannerHttp ? bottomGoods.bannerHttp : '',
                        goodsList: (0, _tools.assertArray)(bottomGoods.goodsList)
                      };

                      // 处理 模板2 的优惠券数据
                      if (templateType == templateType2) {
                        couponObj = (0, _tools.assertObject)(resultObject.coupon);
                        resultObj.couponTitleText = couponObj.title; // 优惠券标题文字
                        resultObj.couponTitleColor = couponObj.title_color; // 优惠券标题文字颜色
                        resultObj.couponTitleIconBgColor = couponObj.title_icon_color; // 优惠券标题的图标的背景颜色
                        resultObj.couponBlockBgColor = couponObj.c_bg_color; // 优惠券背景颜色
                        resultObj.couponBlockTextColor = couponObj.c_text_color; // 优惠券字体颜色
                        resultObj.couponList = (0, _tools.assertArray)(couponObj.couponList);
                      }
                      // 处理 模板1 和 模板2 的底部图片
                      if (templateType == templateType1 || templateType == templateType2) {
                        if (resultObject.bottom_img) {
                          resultObj.bottomImage = "".concat(resultObject.path).concat(resultObject.bottom_img);
                        } else {
                          resultObj.bottomImage = '';
                        }
                      }

                      // 处理 模板2 和 模板3 的底部按钮配置
                      if (templateType == templateType2 || templateType == templateType3) {
                        loadMore = (0, _tools.assertObject)(resultObject.other_data);
                        resultObj.loadMoreBgColor = loadMore.show_more_bgcolor;
                        resultObj.loadMoreTextColor = loadMore.show_more_textcolor;
                        resultObj.loadMoreIconColor = loadMore.show_more_iconcolor;
                      }

                      // 处理模板三的底线
                      if (templateType == templateType3) {
                        bottomLine = (0, _tools.assertObject)(resultObject.bottom_img);
                        resultObj.bottomLineText = bottomLine.text;
                        resultObj.bottomLineColor = bottomLine.color;
                      }
                      resFn({
                        msg: '获取数据成功',
                        result: resultObj
                      });
                    } else {
                      rejFn({
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    rejFn({
                      msg: that.$errorMsg,
                      result: result
                    });
                  }
                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));
        return function (_x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }());
    },
    // 底部商品组滑动加载更多商品
    getBottomGoodsFn: function getBottomGoodsFn() {
      var pageIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var activityId = arguments.length > 1 ? arguments[1] : undefined;
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(resFn, rejFn) {
          var result, goodsList;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return that.$request({
                    url: "/api/Zthd/pageModeNew",
                    data: {
                      page: pageIndex,
                      zt_id: activityId
                    }
                  });
                case 2:
                  result = _context3.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      goodsList = (0, _tools.assertArray)(result.data.data);
                      resFn({
                        msg: result.data.msg,
                        result: goodsList
                      });
                    } else {
                      rejFn({
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    rejFn({
                      msg: that.$errorMsg,
                      result: result
                    });
                  }
                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));
        return function (_x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }());
    },
    // 页面加载
    loadFn: function loadFn() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var that, _yield$that$getTempla, result, templateType;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                that = _this;
                _context4.prev = 1;
                _context4.next = 4;
                return that.getTemplateInfoFn(that.id);
              case 4:
                _yield$that$getTempla = _context4.sent;
                result = _yield$that$getTempla.result;
                console.log('getTemplateInfoFn函数的 /api/Zthd/ztDetail 接口返回数据', result);
                templateType = result.templateType;
                that.templateType = templateType;
                that.pageTitle = result.pageTitle; // 页面标题
                that.pageBgColor = result.pageBgColor; // 页面背景颜色

                that.topImage = result.topImage; // 页面顶部图片路径
                that.topImageClickType = result.topImageClickType; // 顶部图片跳转类型
                that.topImageClickContent = result.topImageClickContent; // 顶部图片跳转content

                that.topGoodsBannerTitleImage = result.topGoods.bannerTitleImage;
                that.topGoodsList = result.topGoods.goodsList.map(function (item) {
                  return {
                    goodsId: item.goods_id,
                    // 商品id
                    goodsImage: item.original_img,
                    // 商品图片
                    isHot: item.is_hot == 1,
                    // 是否热销爆款
                    isNew: item.is_new == 1,
                    // 是否新品
                    goodsName: item.goods_name,
                    // 商品名称
                    goodsDescription: item.goods_remark,
                    // 商品描述
                    goodsTag: item.tag_name,
                    // 商品标签文字
                    isVipPrice: item.is_vip_price == 1,
                    // 是否会员专享
                    goodsPrice: item.shop_price,
                    // 商品价格
                    vipPrice: item.vip_market_price,
                    // 会员价
                    linePrice: item.vip_market_price,
                    // 划线价
                    selectedNum: item.selectedNum,
                    // 已经添加到购物车的数量
                    isSpec: item.is_guige == 1,
                    // 商品是否多规格
                    tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
                  };
                });

                that.bottomGoodsBannerTitleImage = result.bottomGoods.bannerTitleImage;
                that.bottomGoodsList = result.bottomGoods.goodsList.map(function (item) {
                  return {
                    goodsId: item.goods_id,
                    // 商品id
                    goodsImage: item.original_img,
                    // 商品图片
                    isHot: item.is_hot == 1,
                    // 是否热销爆款
                    isNew: item.is_new == 1,
                    // 是否新品
                    goodsName: item.goods_name,
                    // 商品名称
                    goodsDescription: item.goods_remark,
                    // 商品描述
                    goodsTag: item.tag_name,
                    // 商品标签文字
                    isVipPrice: item.is_vip_price == 1,
                    // 是否会员专享
                    goodsPrice: item.shop_price,
                    // 商品价格
                    vipPrice: item.vip_market_price,
                    // 会员价
                    linePrice: item.vip_market_price,
                    // 划线价
                    selectedNum: item.selectedNum,
                    // 已经添加到购物车的数量
                    isSpec: item.is_guige == 1,
                    // 商品是否多规格
                    tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
                  };
                });

                if (that.bottomGoodsList.length >= 12) {
                  that.isloadEnd = false;
                  that.goodsListIsAllOpen = false;
                } else {
                  that.isloadEnd = true;
                  that.goodsListIsAllOpen = true;
                }

                // 处理 模板2 的优惠券数据
                if (templateType == templateType2) {
                  that.couponTitleText = result.couponTitleText;
                  that.couponTitleColor = result.couponTitleColor;
                  that.couponTitleIconBgColor = result.couponTitleIconBgColor;
                  that.couponBlockBgColor = result.couponBlockBgColor;
                  that.couponBlockTextColor = result.couponBlockTextColor;
                  that.couponList = result.couponList;
                }
                // 处理 模板1 和 模板2 的底部图片
                if (templateType == templateType1 || templateType == templateType2) {
                  that.bottomImage = result.bottomImage;
                }

                // 处理 模板2 和 模板3 的底部按钮配置
                if (templateType == templateType2 || templateType == templateType3) {
                  that.loadMoreBgColor = result.loadMoreBgColor;
                  that.loadMoreTextColor = result.loadMoreTextColor;
                  that.loadMoreIconColor = result.loadMoreIconColor;
                }

                // 处理模板三的底线
                if (templateType == templateType3) {
                  that.bottomLineText = result.bottomLineText;
                  that.bottomLineColor = result.bottomLineColor;
                }
                // 修改页面标题
                uni.setNavigationBarTitle({
                  title: that.pageTitle
                });
                _context4.next = 30;
                break;
              case 26:
                _context4.prev = 26;
                _context4.t0 = _context4["catch"](1);
                console.log('getTemplateInfoFn函数的 /api/Zthd/ztDetail 接口报错', _context4.t0);
                uni.showToast({
                  icon: 'none',
                  title: _context4.t0.msg
                });
              case 30:
                that.isShowLoading = false;
                that.scrollGoodsIndex = 1;
              case 32:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 26]]);
      }))();
    },
    // ↓↓↓ 多规格相关方法 --------------------------------------------------------
    // 设置规格框的显示隐藏
    setGoodsSpec: function setGoodsSpec(bool) {
      var that = this;
      that.isShowGoodsSpec = bool;
      if (!bool) {
        that.goodsSpecSelectItemList = (0, _tools.addSpecFilterItemActAttrFn)((0, _tools.cloneFn)(that.goodsSpecSelectItemList));
      }
    },
    // 选择规格项 改变展示 状态
    setSpecFilterItemActiveFn: function setSpecFilterItemActiveFn(arg) {
      var that = this;
      var index = arg.index,
        specFilterIndex = arg.specFilterIndex;
      console.log('外部列表修改', index, specFilterIndex);
      var goodsSpecSelectItemList = (0, _tools.cloneFn)(that.goodsSpecSelectItemList);
      goodsSpecSelectItemList.forEach(function (item, inde) {
        if (inde == index) {
          item.item.forEach(function (it, inx) {
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
    // 页面底部加载更多按钮
    loadMoreGoodsFn: function loadMoreGoodsFn() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var that, moreGoodsList, _yield$that$getBottom, result, mapGoodsArr;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                that = _this2;
                if (!that.isloadEnd) {
                  _context5.next = 4;
                  break;
                }
                if (that.goodsListIsAllOpen) {
                  that.goodsListIsAllOpen = false;
                  moreGoodsList = that.bottomGoodsList.splice(3, that.bottomGoodsList.length);
                  that.moreGoodsListStr = JSON.stringify(moreGoodsList);
                } else {
                  that.goodsListIsAllOpen = true;
                  that.bottomGoodsList = that.bottomGoodsList.concat(JSON.parse(that.moreGoodsListStr));
                }
                return _context5.abrupt("return", false);
              case 4:
                that.bottomGoodsIndex++;
                uni.showLoading({});
                _context5.prev = 6;
                _context5.next = 9;
                return that.getBottomGoodsFn(that.bottomGoodsIndex, that.id);
              case 9:
                _yield$that$getBottom = _context5.sent;
                result = _yield$that$getBottom.result;
                if (result.length) {
                  mapGoodsArr = result.map(function (item) {
                    return {
                      goodsId: item.goods_id,
                      // 商品id
                      goodsImage: item.original_img,
                      // 商品图片
                      isHot: item.is_hot == 1,
                      // 是否热销爆款
                      isNew: item.is_new == 1,
                      // 是否新品
                      goodsName: item.goods_name,
                      // 商品名称
                      goodsDescription: item.goods_remark,
                      // 商品描述
                      goodsTag: item.tag_name,
                      // 商品标签文字
                      isVipPrice: item.is_vip_price == 1,
                      // 是否会员专享
                      goodsPrice: item.shop_price,
                      // 商品价格
                      vipPrice: item.vip_market_price,
                      // 会员价
                      linePrice: item.vip_market_price,
                      // 划线价
                      selectedNum: item.selectedNum,
                      // 已经添加到购物车的数量
                      isSpec: item.is_guige == 1,
                      // 商品是否多规格
                      tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
                    };
                  });

                  that.bottomGoodsList = that.bottomGoodsList.concat(mapGoodsArr);
                  if (mapGoodsArr.length >= 12) {
                    that.isloadEnd = false;
                    that.goodsListIsAllOpen = false;
                  } else {
                    that.isloadEnd = true;
                    that.goodsListIsAllOpen = true;
                  }
                } else {
                  that.bottomGoodsIndex--;
                  if (that.bottomGoodsIndex <= 1) {
                    that.bottomGoodsIndex = 1;
                  }
                  that.isloadEnd = true;
                  that.goodsListIsAllOpen = true;
                }
                that.hideAllFn();
                _context5.next = 20;
                break;
              case 15:
                _context5.prev = 15;
                _context5.t0 = _context5["catch"](6);
                console.log('that.getBottomGoodsFn 函数运行错误', _context5.t0);
                that.hideAllFn();
                uni.showToast({
                  icon: 'none',
                  title: _context5.t0.msg
                });
              case 20:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[6, 15]]);
      }))();
    },
    getCouponFn: function getCouponFn(index) {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var that, currentCoupon, result, icon;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                that = _this3;
                currentCoupon = (0, _tools.assertObject)(that.couponList[index]);
                if (!currentCoupon.is_lingqu) {
                  _context6.next = 4;
                  break;
                }
                return _context6.abrupt("return", false);
              case 4:
                _context6.next = 6;
                return that.$request({
                  method: 'post',
                  url: "/api/User/GetCoupon",
                  data: {
                    couponIds: currentCoupon.id
                  }
                });
              case 6:
                result = _context6.sent;
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    icon = 'success';
                    that.couponList[index].is_lingqu = true;
                  } else {
                    icon = 'none';
                  }
                  uni.showToast({
                    icon: icon,
                    title: result.data.msg
                  });
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: that.$errorMsg
                  });
                }
              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // 页面底部的商品滑动列表 滑到最右边执行的函数
    scrolltolowerFn: function scrolltolowerFn() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var that, _yield$that$getBottom2, result, mapGoodsArr;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                that = _this4;
                uni.showLoading({});
                that.scrollGoodsIndex++;
                _context7.prev = 3;
                _context7.next = 6;
                return that.getBottomGoodsFn(that.scrollGoodsIndex, that.id);
              case 6:
                _yield$that$getBottom2 = _context7.sent;
                result = _yield$that$getBottom2.result;
                if (result.length) {
                  mapGoodsArr = result.map(function (item) {
                    return {
                      goodsId: item.goods_id,
                      // 商品id
                      goodsImage: item.original_img,
                      // 商品图片
                      isHot: item.is_hot == 1,
                      // 是否热销爆款
                      isNew: item.is_new == 1,
                      // 是否新品
                      goodsName: item.goods_name,
                      // 商品名称
                      goodsDescription: item.goods_remark,
                      // 商品描述
                      goodsTag: item.tag_name,
                      // 商品标签文字
                      isVipPrice: item.is_vip_price == 1,
                      // 是否会员专享
                      goodsPrice: item.shop_price,
                      // 商品价格
                      vipPrice: item.vip_market_price,
                      // 会员价
                      linePrice: item.vip_market_price,
                      // 划线价
                      selectedNum: item.selectedNum,
                      // 已经添加到购物车的数量
                      isSpec: item.is_guige == 1,
                      // 商品是否多规格
                      tagImg: item.top_left_tag_img ? that.addimgPathHostFn(item.top_left_tag_img) : '' // 商品左上的图片标签
                    };
                  });

                  that.bottomGoodsList = that.bottomGoodsList.concat(mapGoodsArr);
                } else {
                  that.scrollGoodsIndex--;
                  if (that.scrollGoodsIndex <= 1) {
                    that.scrollGoodsIndex = 1;
                  }
                }
                that.hideAllFn();
                _context7.next = 17;
                break;
              case 12:
                _context7.prev = 12;
                _context7.t0 = _context7["catch"](3);
                console.log('getScrollGoodsFn 运行失败', _context7.t0);
                that.hideAllFn();
                uni.showToast({
                  icon: 'none',
                  title: _context7.t0.msg
                });
              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[3, 12]]);
      }))();
    }
  },
  // ↑↑↑↑↑ methods 结束
  computed: {
    // 加载更多按钮展示的文字
    loadMoreBtnText: function loadMoreBtnText() {
      var that = this;
      if (that.isloadEnd) {
        if (that.goodsListIsAllOpen) {
          return '收起';
        } else {
          return '查看更多';
        }
      } else {
        return '查看更多';
      }
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 480:
/*!********************************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue?vue&type=style&index=0&id=34acb849&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./activity.vue?vue&type=style&index=0&id=34acb849&lang=scss&scoped=true& */ 481);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_activity_vue_vue_type_style_index_0_id_34acb849_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 481:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/activity/activity.vue?vue&type=style&index=0&id=34acb849&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[474,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/packageA/activity/activity.js.map