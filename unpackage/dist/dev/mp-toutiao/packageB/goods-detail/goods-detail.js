(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["packageB/goods-detail/goods-detail"],{

/***/ 231:
/*!*************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js?{"page":"packageB%2Fgoods-detail%2Fgoods-detail"} ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _goodsDetail = _interopRequireDefault(__webpack_require__(/*! ./packageB/goods-detail/goods-detail.vue */ 232));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_goodsDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 232:
/*!******************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goods-detail.vue?vue&type=template&id=c59861ac&scoped=true& */ 233);
/* harmony import */ var _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goods-detail.vue?vue&type=script&lang=js& */ 235);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./goods-detail.vue?vue&type=style&index=0&id=c59861ac&lang=scss&scoped=true& */ 237);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c59861ac",
  null,
  false,
  _goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "packageB/goods-detail/goods-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 233:
/*!*************************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue?vue&type=template&id=c59861ac&scoped=true& ***!
  \*************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goods-detail.vue?vue&type=template&id=c59861ac&scoped=true& */ 234);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_template_id_c59861ac_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 234:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue?vue&type=template&id=c59861ac&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var f0 = _vm._f("filterTransNum")(_vm.detailGoodsShopPrice)
  var f1 = _vm._f("filterTransNum")(_vm.detailGoodsHuiyuanPrice)
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        f0: f0,
        f1: f1,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 235:
/*!*******************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goods-detail.vue?vue&type=script&lang=js& */ 236);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 236:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _const = __webpack_require__(/*! @/tools/const.js */ 41);
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
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
var addCartBlock = function addCartBlock() {
  Promise.all(/*! require.ensure | df-components/add-cart-block/index */[__webpack_require__.e("common/vendor"), __webpack_require__.e("df-components/add-cart-block/index")]).then((function () {
    return resolve(__webpack_require__(/*! @/df-components/add-cart-block */ 1194));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var loadingImage = function loadingImage() {
  __webpack_require__.e(/*! require.ensure | df-components/loading-image/index */ "df-components/loading-image/index").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/loading-image */ 1201));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var shareCodeImg = function shareCodeImg() {
  Promise.all(/*! require.ensure | df-components/share-code-img/share-code-img */[__webpack_require__.e("common/vendor"), __webpack_require__.e("df-components/share-code-img/share-code-img")]).then((function () {
    return resolve(__webpack_require__(/*! @/df-components/share-code-img/share-code-img */ 1208));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var backBtn = function backBtn() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/back-btn */ "packageB/goods-detail/goods-detail-components/back-btn").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/back-btn.vue */ 1215));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var goodsDetailSwiper = function goodsDetailSwiper() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/goods-detail-swiper */ "packageB/goods-detail/goods-detail-components/goods-detail-swiper").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/goods-detail-swiper.vue */ 1222));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var recommendEat = function recommendEat() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/recommend-eat */ "packageB/goods-detail/goods-detail-components/recommend-eat").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/recommend-eat.vue */ 1229));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var recommendGoods = function recommendGoods() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/recommend-goods */ "packageB/goods-detail/goods-detail-components/recommend-goods").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/recommend-goods.vue */ 1236));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var comment = function comment() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/comment */ "packageB/goods-detail/goods-detail-components/comment").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/comment.vue */ 1243));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var detailShoppingRecords = function detailShoppingRecords() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/detail-shopping-records */ "packageB/goods-detail/goods-detail-components/detail-shopping-records").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/detail-shopping-records.vue */ 1250));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var sellerPromisePriceShow = function sellerPromisePriceShow() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/seller-promise-price-show */ "packageB/goods-detail/goods-detail-components/seller-promise-price-show").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/seller-promise-price-show.vue */ 1257));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var openVipPage = function openVipPage() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/to-vip-page */ "packageB/goods-detail/goods-detail-components/to-vip-page").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/to-vip-page.vue */ 1264));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var couponBar = function couponBar() {
  __webpack_require__.e(/*! require.ensure | packageB/goods-detail/goods-detail-components/coupon-bar */ "packageB/goods-detail/goods-detail-components/coupon-bar").then((function () {
    return resolve(__webpack_require__(/*! @/packageB/goods-detail/goods-detail-components/coupon-bar.vue */ 1271));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var playBuyHistory = function playBuyHistory() {
  __webpack_require__.e(/*! require.ensure | df-components/global-components/play-buy-history */ "df-components/global-components/play-buy-history").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/global-components/play-buy-history.vue */ 969));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var everyDayBuyBtnFlag = true; // everyDayBuyBtnFlag 是否可以切换常购
var _default = {
  components: {
    openVipPage: openVipPage,
    addCartBlock: addCartBlock,
    loadingImage: loadingImage,
    shareCodeImg: shareCodeImg,
    backBtn: backBtn,
    goodsDetailSwiper: goodsDetailSwiper,
    recommendEat: recommendEat,
    recommendGoods: recommendGoods,
    comment: comment,
    detailShoppingRecords: detailShoppingRecords,
    sellerPromisePriceShow: sellerPromisePriceShow,
    couponBar: couponBar,
    playBuyHistory: playBuyHistory
  },
  data: function data() {
    return {
      buyRowPage: 1,
      //购买记录当前的 页码
      isShowGif: true,
      // 是否显示开屏动画
      goodsId: null,
      //商品id
      swiperImgArr: [],
      // 轮播图的图片数组

      isEveryDayBuyGoods: false,
      // 是否常购商品

      // 商品信息↓↓
      detailGoodsName: '',
      // 商品名字
      detailGoodsRemark: '',
      // 商品描述
      detailGoodsContent: '',
      // 商品详情
      detailGoodsShopPrice: '',
      // 商品价格
      detailGoodsHuiyuanPrice: '',
      // 商品会员价格
      detailGoodsUnit: '',
      // 商品单位
      detailGoodsPost: '',
      // 配送信息 文字
      detailGoodsStoreCount: 0,
      // 库存数
      detailGoodsTag: '',
      // 商品标签
      selectedNum: 0,
      // 当前商品加入到购物车的数量
      videoStrStr: '',
      // 商品的视频连接地址

      shareTitle: '',
      // 分享标题
      shareImage: '',
      // 分享图片

      // 跳转到开通会员的按钮 相关配置
      toVipPageStyleIsOpen: false,
      // 是否显示 跳转到开通会员的按钮
      toVipPageStyleIconImg: '',
      // 左侧的图标
      toVipPageStyleBgColor: '',
      // 整体背景颜色
      toVipPageLeftText: '',
      // 左侧的文字
      toVipPageLeftTextColor: '',
      // 左侧的文字颜色
      toVipPageRightText: '',
      // 右侧文字
      toVipPageRightTextColor: '',
      // 右侧的文字颜色

      goodsCoupon: [{}],
      // 商品券
      yhCoupon: [{}],
      // 优惠券

      payHistoryList: [],
      //购买记录
      monthNum: '',
      //月销售量

      promisesNodes: '',
      //商家承诺
      priceMean: '',
      //价格说明

      // 推荐菜谱↓↓
      recDeliciousArr: [],
      //菜谱的列表数据
      recDeliciousName: '',
      //菜谱的标题文字

      // 推荐商品↓↓
      recGoodsArr: [],
      //推荐商品列表数据
      recGoodsName: '',
      //推荐商品标题文字

      // 商品评价↓↓
      goodsCommentSum: '',
      //商品的总和
      goodsCommentName: '',
      //名字
      goodsCommentScale: '',
      //百分比
      goodsCommentArr: [],
      //数据列表

      pageShowFlag: false,
      // 当前页面是否show

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
      // 当前页面展示商品的多规格相关--------------------------------------------------------
      isSpec: false,
      // 当前页面展示商品 是否 多规格
      detailPageGoodsSpecSelectItemList: [{}],
      // 当前详情页面 商品的 多规格项
      detailPageGoodsSpecRowsList: {},
      // 当前详情页面 商品的 笛卡尔积项对应的 商品 信息

      // ↑↑↑ 多规格相关数据 --------------------------------------------------------
      loginBoxFlag: false,
      // 登录框显示隐藏状态
      cardNumber: 0 // 购物车数量
    };
  },
  onUnload: function onUnload() {
    uni.$off('goodsAddCartEd_goodsDetail');
  },
  onLoad: function onLoad(option) {
    var that = this;
    console.log('商品详情load函数 带的参数_', option);
    if (option.scene && !option.shareFn) {
      that.setSharerStrFn(option.scene);
      var searchArr = decodeURIComponent(option.scene).split(',');
      option.goods_id = searchArr[1];
    }
    if (option.shareFn) {
      that.setSharerStrFn_btn(option);
    }
    that.goodsId = option.goods_id;
    uni.$off('goodsAddCartEd_goodsDetail');
    uni.$on('goodsAddCartEd_goodsDetail', function (arg) {
      var selectedNum = arg.selectedNum,
        goodsId = arg.goodsId;
      that.recGoodsArr.forEach(function (goodsItem) {
        if (goodsItem.goodsId == goodsId) {
          goodsItem.selectedNum = selectedNum;
        }
      });
    });
  },
  onHide: function onHide() {
    this.pageShowFlag = false;
  },
  onShow: function onShow() {
    var that = this;

    // 监听登录框
    uni.$off('setLoginBoxFlag');
    uni.$on('setLoginBoxFlag', function (loginBoxFlag) {
      that.loginBoxFlag = loginBoxFlag;
    });

    // 监听购物车数量改变
    uni.$off('setCardNumberFn');
    uni.$on('setCardNumberFn', function (cardNumber) {
      that.cardNumber = cardNumber;
    });
    that.setTabBarCartNumFn();
    setTimeout(function () {
      that.pageShowFlag = true;
    });
    everyDayBuyBtnFlag = true;
    that.getGoodsInfoFn();

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
                console.log('商品详情里 show 函数 监听的数据', goodsId, page);
                if (page == 'goods-detail-bottom-add-cart-block') {
                  currentGoods = {
                    goodsName: that.detailGoodsName,
                    goodsDescription: that.detailGoodsRemark,
                    goodsImage: that.swiperImgArr[0],
                    selectedNum: that.selectedNum
                  };
                } else {
                  currentGoods = (0, _tools.assertObject)((0, _tools.assertArray)(that.recGoodsArr.filter(function (item) {
                    return item.goodsId == goodsId;
                  }))[0]);
                }
                that.currentGoodsId = goodsId;
                uni.showLoading({});
                console.log('当前点击商品的信息currentGoods', currentGoods);
                that.currentGoodsName = currentGoods.goodsName; // 当前弹窗多规格的商品名字
                that.currentGoodsDescription = currentGoods.goodsDescription; // 当前弹窗多规格的商品描述
                that.currentGoodsImages = currentGoods.goodsImage; // 当前弹窗多规格的商品图片

                that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量
                if (!(page == 'goods-detail-bottom-add-cart-block')) {
                  _context.next = 15;
                  break;
                }
                that.goodsSpecSelectItemList = that.detailPageGoodsSpecSelectItemList;
                that.goodsSpecRowsList = that.detailPageGoodsSpecRowsList;
                _context.next = 24;
                break;
              case 15:
                _context.next = 17;
                return that.getSpecInfoFn(that.currentGoodsId);
              case 17:
                result = _context.sent;
                if (!(result.type != 'success')) {
                  _context.next = 22;
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
              case 22:
                that.goodsSpecSelectItemList = result.result.goodsSpecSelectItemList;
                that.goodsSpecRowsList = result.result.goodsSpecRowsList;
              case 24:
                that.isShowGoodsSpec = true;
                that.hideAllFn();
              case 26:
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
  onShareAppMessage: function onShareAppMessage() {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var that, title;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              that = _this;
              title = "".concat(that.shareTitle ? that.shareTitle : that.detailGoodsName, "(\xA5").concat(that.detailGoodsShopPrice, "/").concat(that.detailGoodsUnit, ")");
              /*
              
              console.log('a');
              await that.sleepFn(3);
              console.log('b');
              */
              return _context2.abrupt("return", that.shareFn({
                path: '/packageB/goods-detail/goods-detail',
                query: {
                  scene: true,
                  // 如果登录就带着自己的加密字符串
                  goods_id: that.goodsId
                },
                options: {
                  title: title,
                  imageUrl: that.shareImage ? that.shareImage : that.swiperImgArr[0]
                }
              }));
            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  methods: {
    // 刷新页面
    refreshFn: function refreshFn() {
      this.getGoodsInfoFn();
      this.setTabBarCartNumFn();
    },
    //根据id获取商品详细信息
    getGoodsInfoFn: function getGoodsInfoFn() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var that, goods_id, result, resultData, goodsDetail, toVipPageStyleObj, isSpec, specObj, detailPageGoodsSpecRowsList, i, coupon, payHistory, recDelicious, recDeliciousArr, recGoods, recGoodsArr, goodsComment;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this2;
                goods_id = that.goodsId;
                _context3.next = 4;
                return that.$request({
                  url: '/api/Goods/goods_detail',
                  data: {
                    goods_id: goods_id,
                    type: 'common'
                  }
                });
              case 4:
                result = _context3.sent;
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultData = (0, _tools.assertObject)(result.data.data);
                    console.log('请求商品详情返回的数据', resultData);

                    // 商品是否常购
                    that.isEveryDayBuyGoods = resultData.oftenBuy == 1 ? true : false;

                    /* 商品详情 */
                    goodsDetail = (0, _tools.assertObject)(resultData.detail); // 单个商品分享图文配置
                    that.shareTitle = goodsDetail.share_title;
                    that.shareImage = goodsDetail.share_img;
                    that.videoStrStr = goodsDetail.video;

                    // 赋值轮播图的数据
                    that.swiperImgArr = (0, _tools.assertArray)(goodsDetail.images);
                    console.log('that.swiperImgArr', that.swiperImgArr);

                    // 赋值商品信息↓↓↓
                    // 商品名字
                    that.detailGoodsName = goodsDetail.goods_name;

                    // 商品描述

                    that.detailGoodsRemark = goodsDetail.goods_remark;

                    // 商品价格
                    that.detailGoodsShopPrice = goodsDetail.shop_price;
                    // 商品会员价格
                    that.detailGoodsHuiyuanPrice = goodsDetail.huiyuan_price;
                    // 商品单位
                    that.detailGoodsUnit = goodsDetail.unit;
                    // 商品tag 3是vip
                    that.detailGoodsTag = goodsDetail.tag;

                    // 商品配送信息
                    that.detailGoodsPost = goodsDetail.post;

                    // 商品总库存
                    that.detailGoodsStoreCount = (0, _tools.transNumFn)(goodsDetail.store_count);

                    // 商品详情
                    that.detailGoodsContent = (0, _tools.goodsDetailWidthFn)((0, _tools.assertString)(goodsDetail.goods_content));

                    // 商家承诺
                    that.promisesNodes = (0, _tools.goodsDetailWidthFn)((0, _tools.assertString)(goodsDetail.promises));

                    // 价格说明
                    that.priceMean = (0, _tools.goodsDetailWidthFn)((0, _tools.assertString)(goodsDetail.price_mean));

                    // 跳转到开通会员的按钮
                    toVipPageStyleObj = (0, _tools.assertObject)(goodsDetail.gd_content);
                    that.toVipPageStyleIsOpen = toVipPageStyleObj.is_gd == 1; // 是否显示 跳转到开通会员的按钮
                    that.toVipPageStyleIconImg = toVipPageStyleObj.gd_icon; // 左侧的图标
                    that.toVipPageStyleBgColor = toVipPageStyleObj.gd_bg_color; // 整体背景颜色
                    that.toVipPageLeftText = toVipPageStyleObj.gd_z_con; // 左侧的文字
                    that.toVipPageLeftTextColor = toVipPageStyleObj.gd_zt_color; // 左侧的文字颜色
                    that.toVipPageRightText = toVipPageStyleObj.gd_y_con; // 右侧文字
                    that.toVipPageRightTextColor = toVipPageStyleObj.gd_yt_color; // 右侧的文字颜色

                    /* 处理多规格 */
                    // 是否是多规格
                    isSpec = goodsDetail.is_guige == 1;
                    if (isSpec) {
                      specObj = (0, _tools.assertObject)(goodsDetail.spec);
                      that.detailPageGoodsSpecSelectItemList = (0, _tools.addSpecFilterItemActAttrFn)((0, _tools.assertArray)(specObj.filter_spec)); // 多规格项
                      detailPageGoodsSpecRowsList = (0, _tools.assertObject)(specObj.spec_goods_price);
                      for (i in detailPageGoodsSpecRowsList) {
                        (0, _tools.assertObject)(detailPageGoodsSpecRowsList[i]).unit = goodsDetail.unit;
                      }
                      that.detailPageGoodsSpecRowsList = detailPageGoodsSpecRowsList; // 多规格 笛卡尔积项对应的 商品 信息

                      console.log('查看规格项', that.goodsSpecSelectItemList);
                    } else {
                      that.detailPageGoodsSpecSelectItemList = []; // 多规格项
                      that.detailPageGoodsSpecRowsList = {}; // 多规格 笛卡尔积项对应的 商品 信息
                    }

                    that.isSpec = isSpec;
                    that.selectedNum = goodsDetail.selectedNum;

                    /* 商品券 */
                    coupon = (0, _tools.assertObject)(resultData.coupon);
                    that.goodsCoupon = (0, _tools.assertArray)(coupon.goods_coupon).map(function (item) {
                      return {
                        couponName: item.name.length > 8 ? "".concat(item.name.substring(0, 7), "...") : item.name,
                        // 处理商品券名字打点 超过8个字
                        styleIsDefault: false
                      };
                    });
                    console.log('商品券', that.goodsCoupon);
                    that.yhCoupon = (0, _tools.assertArray)(coupon.yh_coupon).map(function (item) {
                      return {
                        couponName: item.page_title,
                        styleIsDefault: !item.coupon_status
                      };
                    }).sort(function (item) {
                      return !item.coupon_status;
                    });
                    console.log('优惠券列表', that.yhCoupon);

                    /* 商品购买记录数据 */
                    payHistory = (0, _tools.assertObject)(resultData.pay_history);
                    that.payHistoryList = (0, _tools.assertArray)(payHistory.history);
                    // 月销量
                    that.monthNum = payHistory.monthNum;

                    // 赋值菜谱数据↓↓
                    recDelicious = (0, _tools.assertObject)(resultData.rec_delicious);
                    recDeliciousArr = (0, _tools.assertArray)(recDelicious.value);
                    that.recDeliciousArr = recDeliciousArr; //数据列表
                    that.recDeliciousName = recDelicious.name; //名字

                    /* 赋值推荐商品数据 */
                    recGoods = (0, _tools.assertObject)(resultData.rec_goods);
                    recGoodsArr = (0, _tools.assertArray)(recGoods.value); // 处理推荐商品数据列表
                    that.recGoodsArr = recGoodsArr.map(function (item) {
                      return {
                        goodsId: item.goods_id,
                        // 商品id
                        goodsImage: item.image,
                        // 商品图片
                        isHot: item.is_hot == 1,
                        // 是否热销爆款
                        isNew: item.is_new == 1,
                        // 是否新品
                        goodsName: item.goods_name,
                        // 商品名字
                        isVipPrice: item.is_vip_price == 1,
                        // 是否会员专享
                        goodsPrice: item.shop_price,
                        // 商品价格
                        vipPrice: item.vip_market_price,
                        // vip专享价
                        linePrice: item.vip_market_price,
                        // 划线价
                        goodsTag: item.activity,
                        // 商品标签
                        selectedNum: item.selectedNum,
                        // 加入到购物车里的数量
                        isSpec: item.is_guige == 1,
                        // 商品是否多规格
                        tagImg: item.topLeftTag // 商品左上的图片标签
                      };
                    });

                    that.recGoodsName = recGoods.name; //名字

                    // 赋值商品评论数据↓↓
                    goodsComment = (0, _tools.assertObject)(resultData.goods_comment);
                    that.goodsCommentArr = [(0, _tools.assertObject)(goodsComment.value)]; //数据列表
                    that.goodsCommentName = goodsComment.name; //名字
                    that.goodsCommentSum = goodsComment.sum; //总数
                    that.goodsCommentScale = goodsComment.scale; //百分比
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
                that.isShowGif = false;
              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 添加到购物车成功 修改goodsInfo的数据
    changeGoodsInfoFn: function changeGoodsInfoFn(e) {
      this.selectedNum = e;
    },
    // 查看更多购买记录
    loadMoreShoppingRecordsFn: function loadMoreShoppingRecordsFn() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var that, result, payHistoryList;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                that = _this3;
                that.buyRowPage++;
                _context4.next = 4;
                return that.$request({
                  loading: true,
                  url: '/api/Goods/more_goods_payhistory',
                  data: {
                    page: that.buyRowPage,
                    id: that.goodsId
                  }
                });
              case 4:
                result = _context4.sent;
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    payHistoryList = (0, _tools.assertArray)(result.data.data);
                    if (payHistoryList.length < 1) {
                      that.buyRowPage--;
                      if (that.buyRowPage <= 1) {
                        that.buyRowPage = 1;
                      }
                    }
                    that.payHistoryList = that.payHistoryList.concat(payHistoryList);
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
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
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
    // 切换常购状态
    setEveryDayBuyStatus: function setEveryDayBuyStatus() {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var that, url, result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                that = _this4; // 未登录就提示登录
                if (that.isLogin) {
                  _context5.next = 4;
                  break;
                }
                that.closeGlobalLoginFn(true);
                return _context5.abrupt("return", false);
              case 4:
                if (that.isRunBindMobileFunc) {
                  _context5.next = 7;
                  break;
                }
                uni.showModal({
                  title: _const.bindMobileTips,
                  success: function success(e) {
                    e.confirm && that.navigateToFn({
                      url: "/packageA/tel-login/user-info"
                    });
                  }
                });
                return _context5.abrupt("return", false);
              case 7:
                console.log('everyDayBuyBtnFlag', everyDayBuyBtnFlag);
                if (everyDayBuyBtnFlag) {
                  _context5.next = 10;
                  break;
                }
                return _context5.abrupt("return", false);
              case 10:
                everyDayBuyBtnFlag = false;
                if (that.isEveryDayBuyGoods) {
                  url = '/api/User/delOftenbuy';
                } else {
                  url = '/api/User/addOftenbuy';
                }
                _context5.next = 14;
                return that.$request({
                  method: 'post',
                  url: url,
                  data: {
                    goods_id: that.goodsId
                  }
                });
              case 14:
                result = _context5.sent;
                //数据返回后 处理方式  处理数据
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    that.isEveryDayBuyGoods = !that.isEveryDayBuyGoods;
                  }
                  uni.showToast({
                    icon: 'none',
                    title: result.data.msg
                  });
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: that.$errorMsg
                  });
                }
                everyDayBuyBtnFlag = true;
              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 237:
/*!****************************************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue?vue&type=style&index=0&id=c59861ac&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./goods-detail.vue?vue&type=style&index=0&id=c59861ac&lang=scss&scoped=true& */ 238);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_goods_detail_vue_vue_type_style_index_0_id_c59861ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 238:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/goods-detail.vue?vue&type=style&index=0&id=c59861ac&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[231,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/packageB/goods-detail/goods-detail.js.map