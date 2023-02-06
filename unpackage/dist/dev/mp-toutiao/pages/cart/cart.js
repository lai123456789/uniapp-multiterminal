(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/cart/cart"],{

/***/ 73:
/*!******************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js?{"page":"pages%2Fcart%2Fcart"} ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _cart = _interopRequireDefault(__webpack_require__(/*! ./pages/cart/cart.vue */ 74));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_cart.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 74:
/*!***********************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.vue?vue&type=template&id=0f00adf4&scoped=true& */ 75);
/* harmony import */ var _cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart.vue?vue&type=script&lang=js& */ 77);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart.vue?vue&type=style&index=0&id=0f00adf4&lang=scss&scoped=true& */ 79);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0f00adf4",
  null,
  false,
  _cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/cart/cart.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 75:
/*!******************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue?vue&type=template&id=0f00adf4&scoped=true& ***!
  \******************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cart.vue?vue&type=template&id=0f00adf4&scoped=true& */ 76);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_template_id_0f00adf4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 76:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue?vue&type=template&id=0f00adf4&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniIcons: function () {
      return Promise.all(/*! import() | components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/components/uni-icons/uni-icons.vue */ 976))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var m0 = _vm.calcImageSrc("/cart/dad8562db8b24ad0471d20e3872007b_03.png")
  var m1 = _vm.calcCartIsEmpty ? _vm.calcImageSrc("/cart/null-cart.png") : null
  var l1 = _vm.__map(
    _vm.cartGoodsList,
    function (cartGoodsItem, cartGoodsIndex) {
      var $orig = _vm.__get_orig(cartGoodsItem)
      var m2 =
        cartGoodsItem.sellerCartGoodsList.length && _vm.gongyingshang
          ? _vm.calcSellerIsActive(cartGoodsItem)
          : null
      var l0 = cartGoodsItem.sellerCartGoodsList.length
        ? _vm.__map(
            cartGoodsItem.sellerCartGoodsList,
            function (sellerGoodsItem, sellerGoodsIndex) {
              var $orig = _vm.__get_orig(sellerGoodsItem)
              var f0 = sellerGoodsItem.vipStylePrice
                ? _vm._f("filterTransNum")(sellerGoodsItem.goodsPrice)
                : null
              var f1 = !sellerGoodsItem.vipStylePrice
                ? _vm._f("filterTransNum")(sellerGoodsItem.goodsPrice)
                : null
              return {
                $orig: $orig,
                f0: f0,
                f1: f1,
              }
            }
          )
        : null
      var m3 =
        cartGoodsItem.sellerCartGoodsList.length && _vm.gongyingshang
          ? _vm.calcSellerHasActive(cartGoodsItem)
          : null
      var f2 =
        cartGoodsItem.sellerCartGoodsList.length && _vm.gongyingshang && m3
          ? _vm._f("filterTransNum")(cartGoodsItem.sellerTotalPrice)
          : null
      return {
        $orig: $orig,
        m2: m2,
        l0: l0,
        m3: m3,
        f2: f2,
      }
    }
  )
  var f3 = _vm.isLogin ? _vm._f("filterTransNum")(_vm.bottomTotalPrice) : null
  var f4 =
    _vm.isLogin && _vm.bottomIsShowDiscounts
      ? _vm._f("filterTransNum")(_vm.bottomDiscountsTotalPrice)
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        m0: m0,
        m1: m1,
        l1: l1,
        f3: f3,
        f4: f4,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 77:
/*!************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cart.vue?vue&type=script&lang=js& */ 78);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 78:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _vuex = __webpack_require__(/*! vuex */ 36);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var isActiveIcon = function isActiveIcon() {
  __webpack_require__.e(/*! require.ensure | pages/cart/cart-components/is-active-icon */ "pages/cart/cart-components/is-active-icon").then((function () {
    return resolve(__webpack_require__(/*! @/pages/cart/cart-components/is-active-icon.vue */ 998));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var cartControlBtn = function cartControlBtn() {
  __webpack_require__.e(/*! require.ensure | pages/cart/cart-components/cart-control-btn */ "pages/cart/cart-components/cart-control-btn").then((function () {
    return resolve(__webpack_require__(/*! @/pages/cart/cart-components/cart-control-btn.vue */ 1005));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var invalidGoodsWrap = function invalidGoodsWrap() {
  __webpack_require__.e(/*! require.ensure | pages/cart/cart-components/invalid-goods-wrap */ "pages/cart/cart-components/invalid-goods-wrap").then((function () {
    return resolve(__webpack_require__(/*! @/pages/cart/cart-components/invalid-goods-wrap.vue */ 1012));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var discountsModal = function discountsModal() {
  __webpack_require__.e(/*! require.ensure | pages/cart/cart-components/discounts-modal */ "pages/cart/cart-components/discounts-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/cart/cart-components/discounts-modal.vue */ 1019));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var windowTop = uni.getSystemInfoSync().windowTop;
console.log('windowTop', windowTop);
var inc = 'inc',
  // 增加
  dec = 'dec'; // 减少
var _default = {
  components: {
    isActiveIcon: isActiveIcon,
    cartControlBtn: cartControlBtn,
    invalidGoodsWrap: invalidGoodsWrap,
    discountsModal: discountsModal
  },
  data: function data() {
    return {
      inputDomFlag: true,
      // input 输入框的显示隐藏状态
      currentAddressText: '',
      // 临时的地址文字

      isShowLoading: true,
      // 开屏动画

      likeGoodsTitle: '',
      // 猜你喜欢商品的标题文字
      likeGoodsList: [],
      // 猜你喜欢商品列表数据

      commitBtnTemplateList: [],
      // 小程序模板消息字符串
      loseGoodsList: [],
      // 失效商品列表
      loseGoodsTitle: '',
      // 失效商品列表顶部的标题
      loseGoodsText: '',
      // 失效商品前的展示文字

      cartGoodsList: [],
      // 购物车列表数据

      // 优惠详情弹框数据
      discountsModalFlag: false,
      // 是否弹框
      discountsModalTitle: '',
      discountsModalList: [],
      // 购物车底部信息
      bottomIsShowDiscounts: false,
      bottomDiscountsTitle: '',
      bottomDiscountsTotalPrice: 0,
      bottomDiscountsList: [],
      bottomTotalPrice: 0,
      bottomTotalNum: 0,
      inc: inc,
      dec: dec,
      sendAjaxFlag: false,
      // 页面发送网络请求的锁 (任何操作都会上锁 必须等前一个网络请求返回后才可以执行)

      commitBtnState: false,
      // 提交按钮的状态

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
  onHide: function onHide() {
    var that = this;
    that.hideAllFn();
    console.log('hide run');
    // 关闭页面底部的优惠信息弹框
    if (that.discountsModalFlag) {
      that.discountsModalFlag = false;
    }
  },
  onUnload: function onUnload() {
    uni.$off('goodsAddCartEd_cart');
  },
  onLoad: function onLoad() {
    var that = this;
    // 加入购物车成功后
    uni.$off('goodsAddCartEd_cart');
    uni.$on('goodsAddCartEd_cart', function (arg) {
      var selectedNum = arg.selectedNum,
        goodsId = arg.goodsId;
      that.likeGoodsList.forEach(function (item) {
        if (item.goodsId == goodsId) {
          item.selectedNum = selectedNum;
        }
      });
    });
    that.loadFn();
  },
  onShow: function onShow() {
    var that = this;

    // 监听购物车数量改变
    uni.$off('setCardNumberFn');
    uni.$on('setCardNumberFn', function (cardNumber) {
      that.cardNumber = cardNumber;
    });

    // 监听登录框
    uni.$off('setLoginBoxFlag');
    uni.$on('setLoginBoxFlag', function (loginBoxFlag) {
      that.loginBoxFlag = loginBoxFlag;
    });

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
                currentGoods = (0, _tools.assertObject)((0, _tools.assertArray)(that.likeGoodsList.filter(function (item) {
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
    that.onShowFn();
    // 关闭页面底部的优惠信息弹框
    if (that.discountsModalFlag) {
      that.discountsModalFlag = false;
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var that, _yield$Promise$all, _yield$Promise$all2, getLikeGoodsResult, getMyCartDataResult, _getLikeGoodsResult$r, likeGoodsTitle, likeGoodsList, _getMyCartDataResult$, loseGoodsList, loseGoodsTitle, loseGoodsText, commitBtnTemplateList, cartGoodsList, bottomIsShowDiscounts, bottomDiscountsTitle, bottomDiscountsTotalPrice, bottomDiscountsList, bottomTotalPrice, bottomTotalNum, _getLikeGoodsResult, _getLikeGoodsResult$r2, _likeGoodsTitle, _likeGoodsList;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              that = _this;
              if (!that.sendAjaxFlag) {
                _context2.next = 4;
                break;
              }
              uni.stopPullDownRefresh();
              return _context2.abrupt("return", false);
            case 4:
              that.sendAjaxFlag = true;
              if (!that.isLogin) {
                _context2.next = 15;
                break;
              }
              _context2.next = 8;
              return Promise.all([that.getLikeGoodsFn(), that.getMyCartDataFn()]);
            case 8:
              _yield$Promise$all = _context2.sent;
              _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2);
              getLikeGoodsResult = _yield$Promise$all2[0];
              getMyCartDataResult = _yield$Promise$all2[1];
              if (getLikeGoodsResult.type == 'success' && getMyCartDataResult.type == 'success') {
                _getLikeGoodsResult$r = getLikeGoodsResult.result, likeGoodsTitle = _getLikeGoodsResult$r.likeGoodsTitle, likeGoodsList = _getLikeGoodsResult$r.likeGoodsList;
                that.likeGoodsTitle = likeGoodsTitle;
                that.likeGoodsList = likeGoodsList;
                _getMyCartDataResult$ = getMyCartDataResult.result, loseGoodsList = _getMyCartDataResult$.loseGoodsList, loseGoodsTitle = _getMyCartDataResult$.loseGoodsTitle, loseGoodsText = _getMyCartDataResult$.loseGoodsText, commitBtnTemplateList = _getMyCartDataResult$.commitBtnTemplateList, cartGoodsList = _getMyCartDataResult$.cartGoodsList, bottomIsShowDiscounts = _getMyCartDataResult$.bottomIsShowDiscounts, bottomDiscountsTitle = _getMyCartDataResult$.bottomDiscountsTitle, bottomDiscountsTotalPrice = _getMyCartDataResult$.bottomDiscountsTotalPrice, bottomDiscountsList = _getMyCartDataResult$.bottomDiscountsList, bottomTotalPrice = _getMyCartDataResult$.bottomTotalPrice, bottomTotalNum = _getMyCartDataResult$.bottomTotalNum;
                that.loseGoodsList = loseGoodsList;
                that.loseGoodsTitle = loseGoodsTitle;
                that.loseGoodsText = loseGoodsText;
                that.commitBtnTemplateList = commitBtnTemplateList;
                that.cartGoodsList = cartGoodsList;
                that.bottomIsShowDiscounts = bottomIsShowDiscounts;
                that.bottomDiscountsTitle = bottomDiscountsTitle;
                that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
                that.bottomDiscountsList = bottomDiscountsList;
                that.bottomTotalPrice = bottomTotalPrice;
                that.bottomTotalNum = bottomTotalNum;
                that.sendAjaxFlag = false;
                uni.stopPullDownRefresh();
              } else {
                uni.showToast({
                  icon: 'none',
                  title: getLikeGoodsResult.type == 'error' ? getLikeGoodsResult.msg : getMyCartDataResult.msg
                });
              }
              _context2.next = 21;
              break;
            case 15:
              _context2.next = 17;
              return that.getLikeGoodsFn();
            case 17:
              _getLikeGoodsResult = _context2.sent;
              if (_getLikeGoodsResult.type == 'success') {
                _getLikeGoodsResult$r2 = _getLikeGoodsResult.result, _likeGoodsTitle = _getLikeGoodsResult$r2.likeGoodsTitle, _likeGoodsList = _getLikeGoodsResult$r2.likeGoodsList;
                that.likeGoodsTitle = _likeGoodsTitle;
                that.likeGoodsList = _likeGoodsList;
              } else {
                uni.showToast({
                  icon: 'none',
                  title: _getLikeGoodsResult.msg
                });
              }
              that.sendAjaxFlag = false;
              uni.stopPullDownRefresh();
            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  methods: {
    // ↓↓↓ 获取页面数据的几个函数
    // 获取购物车数据
    getMyCartDataFn: function getMyCartDataFn() {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(resFn) {
          var result, resultObject, commitBtnTemplateList, loseGoodsObject, loseGoodsList, loseGoodsTitle, loseGoodsText, cartGoodsList, bottomTotalData, bottomDiscounts, bottomPrinf;
          return _regenerator.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return that.$request({
                    url: '/api/Cart/myCart'
                  });
                case 2:
                  result = _context3.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resultObject = (0, _tools.assertObject)(result.data.data); // ↓↓ 模板字符串
                      commitBtnTemplateList = (0, _tools.assertArray)(resultObject.template).filter(function (i) {
                        return i.mini_status == 1 && i.mini_template_id;
                      }).map(function (i) {
                        return i.mini_template_id;
                      }); // ↓↓ 失效商品
                      loseGoodsObject = (0, _tools.assertObject)(resultObject.lose_goods), loseGoodsList = (0, _tools.assertArray)(loseGoodsObject.list).map(function (item) {
                        return {
                          cartId: item.cart_id,
                          goodsImage: item.original_img,
                          // 商品图片
                          goodsName: item.goods_name,
                          // 商品名字
                          loseReasonText: item.reason,
                          // 商品名字
                          topLeftTagImage: "".concat(item.top_left_tag_img),
                          goodsPrice: (0, _tools.transNumFn)(item.shop_price),
                          vipStylePrice: item.goods_type == 3
                        };
                      }), loseGoodsTitle = loseGoodsObject.title, loseGoodsText = loseGoodsObject.name; // ↓↓ 购物车各商家商品数据
                      cartGoodsList = (0, _tools.assertArray)(resultObject.list_goods).filter(function (i) {
                        return (0, _tools.assertArray)((0, _tools.assertObject)(i).goods_list).length > 0;
                      }).map(function (item) {
                        var sellerItem = (0, _tools.assertObject)(item),
                          sellerItemInfo = (0, _tools.assertObject)(sellerItem.info),
                          sellerItemInfoDetail = (0, _tools.assertObject)(sellerItemInfo.store_info),
                          sellerItemInfoDispatch = (0, _tools.assertObject)(sellerItemInfo.dispatch),
                          sellerItemInfoPrinf = (0, _tools.assertObject)(sellerItemInfo.prinf),
                          sellerItemInfoDiscounts = (0, _tools.assertObject)(sellerItemInfo.discounts),
                          sellerCartGoodsList = (0, _tools.assertArray)(sellerItem.goods_list).map(function (item) {
                            var goodsItem = (0, _tools.assertObject)(item),
                              cartNum = (0, _tools.transNumFn)(goodsItem.cart_num),
                              oneboy = (0, _tools.transNumFn)(goodsItem.oneboy);
                            return {
                              cartId: goodsItem.cart_id,
                              goodsId: goodsItem.goods_id,
                              cartNum: cartNum,
                              isActive: goodsItem.is_active == 1,
                              goodsImage: goodsItem.original_img,
                              topLeftTagImage: "".concat(goodsItem.top_left_tag_img),
                              goodsName: goodsItem.goods_name,
                              goodsSpecName: goodsItem.spec_name,
                              discountsMsg: goodsItem.promotion,
                              goodsPrice: (0, _tools.transNumFn)(goodsItem.shop_price),
                              vipStylePrice: goodsItem.goods_type == 3,
                              goodsTypeIsMiaosha: goodsItem.goods_type == 2,
                              storeCount: goodsItem.store_count,
                              oneboy: oneboy,
                              addBtnStopFlag: cartNum >= oneboy,
                              tagList: (0, _tools.assertArray)(goodsItem.desc).filter(function (i) {
                                return i;
                              }).map(function (i) {
                                return i;
                              }),
                              bubbleTips: goodsItem.remqua,
                              isShowBubbleTips: true,
                              isInvalid: false
                            };
                          });
                        return {
                          sellerId: sellerItemInfoDetail.id,
                          sellerName: sellerItemInfoDetail.name,
                          sellerImage: sellerItemInfoDetail.img,
                          isShowDispatch: sellerItemInfoDispatch.is_dispatch == 1,
                          dispatchTime: sellerItemInfoDispatch.arrival_time,
                          dispatchTitle: sellerItemInfoDispatch.shosub,
                          isShowToHomeBtn: sellerItemInfoDispatch.is_aoi == 1,
                          sellerIsShowDiscounts: sellerItemInfoDiscounts.is_dis == 1,
                          sellerDiscountsTitle: sellerItemInfoDiscounts.title,
                          sellerDiscountsTotalPrice: (0, _tools.transNumFn)(sellerItemInfoDiscounts.total_price),
                          sellerDiscountsList: (0, _tools.assertArray)(sellerItemInfoDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          }),
                          sellerTotalPrice: (0, _tools.transNumFn)(sellerItemInfoPrinf.total_price),
                          sellerTotalNum: (0, _tools.transNumFn)(sellerItemInfoPrinf.total_num),
                          sellerCartGoodsList: sellerCartGoodsList
                        };
                      }); // ↓↓ 底部钱数和优惠信息
                      bottomTotalData = (0, _tools.assertObject)(resultObject.total_data), bottomDiscounts = (0, _tools.assertObject)(bottomTotalData.discounts), bottomPrinf = (0, _tools.assertObject)(bottomTotalData.prinf);
                      resFn({
                        type: 'success',
                        msg: '获取购物车页面数据成功',
                        result: {
                          loseGoodsList: loseGoodsList,
                          loseGoodsTitle: loseGoodsTitle,
                          loseGoodsText: loseGoodsText,
                          commitBtnTemplateList: commitBtnTemplateList,
                          cartGoodsList: cartGoodsList,
                          bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
                          bottomDiscountsTitle: bottomDiscounts.title,
                          bottomDiscountsTotalPrice: (0, _tools.transNumFn)(bottomDiscounts.total_price),
                          bottomDiscountsList: (0, _tools.assertArray)(bottomDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          }),
                          bottomTotalPrice: (0, _tools.transNumFn)(bottomPrinf.total_price),
                          bottomTotalNum: (0, _tools.transNumFn)(bottomPrinf.total_num)
                        }
                      });
                    } else {
                      resFn({
                        type: 'error',
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    resFn({
                      type: 'error',
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
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    },
    // 获取猜你喜欢 的 商品数据
    getLikeGoodsFn: function getLikeGoodsFn() {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(resFn) {
          var result, resultObject, likeGoodsList;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return that.$request({
                    url: "/api/Cart/likeGoods"
                  });
                case 2:
                  result = _context4.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resultObject = (0, _tools.assertObject)((0, _tools.assertObject)(result.data.data).like);
                      likeGoodsList = (0, _tools.assertArray)(resultObject.value).map(function (item) {
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
                          selectedNum: (0, _tools.transNumFn)(item.selectedNum),
                          // 已经添加到购物车的数量
                          isSpec: item.is_guige == 1,
                          // 商品是否多规格
                          tagImg: item.topLeftTag,
                          // 商品左上的图片标签
                          gysMdId: (0, _tools.transNumFn)(item.supp_id),
                          // 供应商门店id
                          gysMdName: item.dp_name // 供应商门店名字
                        };
                      });

                      resFn({
                        type: 'success',
                        msg: '获取猜你喜欢商品列表成功',
                        result: {
                          likeGoodsTitle: resultObject.name,
                          likeGoodsList: likeGoodsList
                        }
                      });
                    } else {
                      resFn({
                        type: 'error',
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    resFn({
                      type: 'error',
                      msg: that.$errorMsg,
                      result: result
                    });
                  }
                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));
        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    },
    /* 
    	@description 修改购物车数量 (只能加减不能删除)
    	@param type <String> 'dec' 删除,  'inc' 增加
    	@param type <Number> 设置商品数量
    	@param cartId <Number> 购物车id
    	@return <Promise>
    */
    cartNumberChangeFn: function cartNumberChangeFn(type, cartId) {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(resFn) {
          var result, resultObject, resultResultObject, resultInfo, sellerItemInfoDispatch, sellerItemInfoDiscounts, sellerItemInfoPrinf, bottomTotalData, bottomDiscounts, bottomPrinf, cartGoodsNumChangeResult, dataInfoObject, dataResultObject, dataResultInfoObject, dataResultInfoDiscountsObject, dataResultInfoDispatchObject, dataResultInfoPrinfObject, _bottomTotalData, _bottomDiscounts, _bottomPrinf;
          return _regenerator.default.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _context5.next = 2;
                  return that.$request({
                    method: 'post',
                    url: '/api/Cart/cartNumber',
                    data: {
                      din: type,
                      cart_id: cartId
                    }
                  });
                case 2:
                  result = _context5.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 40004) {
                      // 错误状态  40004  前端提示删除
                      resFn({
                        type: 'success40004'
                      });
                    } else if (result.data.code == 40001) {
                      // codeing
                      // 错误状态  40001 当前商品失效了  前端需要改一下商品样式
                      resultObject = (0, _tools.assertObject)(result.data.data), resultResultObject = (0, _tools.assertObject)(resultObject.result), resultInfo = (0, _tools.assertObject)(resultResultObject.info), sellerItemInfoDispatch = (0, _tools.assertObject)(resultInfo.dispatch), sellerItemInfoDiscounts = (0, _tools.assertObject)(resultInfo.discounts), sellerItemInfoPrinf = (0, _tools.assertObject)(resultInfo.prinf); // ↓↓ 底部钱数和优惠信息
                      bottomTotalData = (0, _tools.assertObject)(resultResultObject.total), bottomDiscounts = (0, _tools.assertObject)(bottomTotalData.discounts), bottomPrinf = (0, _tools.assertObject)(bottomTotalData.prinf);
                      resFn({
                        type: 'success40001',
                        msg: resultObject.msg,
                        result: {
                          dispatchTitle: sellerItemInfoDispatch.shosub,
                          isShowToHomeBtn: sellerItemInfoDispatch.is_aoi == 1,
                          sellerIsShowDiscounts: sellerItemInfoDiscounts.is_dis == 1,
                          sellerDiscountsTitle: sellerItemInfoDiscounts.title,
                          sellerDiscountsTotalPrice: (0, _tools.transNumFn)(sellerItemInfoDiscounts.total_price),
                          sellerDiscountsList: (0, _tools.assertArray)(sellerItemInfoDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          }),
                          sellerTotalPrice: (0, _tools.transNumFn)(sellerItemInfoPrinf.total_price),
                          sellerTotalNum: (0, _tools.transNumFn)(sellerItemInfoPrinf.total_num),
                          bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
                          bottomDiscountsTitle: bottomDiscounts.title,
                          bottomDiscountsTotalPrice: (0, _tools.transNumFn)(bottomDiscounts.total_price),
                          bottomDiscountsList: (0, _tools.assertArray)(bottomDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          }),
                          bottomTotalPrice: (0, _tools.transNumFn)(bottomPrinf.total_price),
                          bottomTotalNum: (0, _tools.transNumFn)(bottomPrinf.total_num)
                        }
                      });
                    } else if (result.data.code == 200) {
                      cartGoodsNumChangeResult = (0, _tools.assertObject)(result.data.data), dataInfoObject = (0, _tools.assertObject)(cartGoodsNumChangeResult.info), dataResultObject = (0, _tools.assertObject)(cartGoodsNumChangeResult.result), dataResultInfoObject = (0, _tools.assertObject)(dataResultObject.info), dataResultInfoDiscountsObject = (0, _tools.assertObject)(dataResultInfoObject.discounts), dataResultInfoDispatchObject = (0, _tools.assertObject)(dataResultInfoObject.dispatch), dataResultInfoPrinfObject = (0, _tools.assertObject)(dataResultInfoObject.prinf), _bottomTotalData = (0, _tools.assertObject)(dataResultObject.total), _bottomDiscounts = (0, _tools.assertObject)(_bottomTotalData.discounts), _bottomPrinf = (0, _tools.assertObject)(_bottomTotalData.prinf);
                      resFn({
                        type: 'success',
                        msg: "".concat(dataInfoObject.msg),
                        result: {
                          changeGoodsIsActive: dataInfoObject.is_active == 1,
                          // 选中状态
                          changeGoodsCartNum: (0, _tools.transNumFn)(dataInfoObject.cart_num),
                          // 购物车数量
                          changeGoodsAddBtnStopFlag: dataInfoObject.is_inc == 0,
                          // 添加按钮是否置灰
                          changeGoodsDiscountsMsg: dataInfoObject.promotion,
                          // 活动明细

                          sellerIsShowDiscounts: dataResultInfoDiscountsObject.is_dis == 1,
                          sellerDiscountsTitle: dataResultInfoDiscountsObject.title,
                          sellerDiscountsTotalPrice: (0, _tools.transNumFn)(dataResultInfoDiscountsObject.total_price),
                          sellerDiscountsList: (0, _tools.assertArray)(dataResultInfoDiscountsObject.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          }),
                          isShowToHomeBtn: dataResultInfoDispatchObject.is_aoi == 1,
                          dispatchTitle: dataResultInfoDispatchObject.shosub,
                          sellerTotalPrice: (0, _tools.transNumFn)(dataResultInfoPrinfObject.total_price),
                          sellerTotalNum: (0, _tools.transNumFn)(dataResultInfoPrinfObject.total_num),
                          bottomTotalPrice: (0, _tools.transNumFn)(_bottomPrinf.total_price),
                          bottomTotalNum: (0, _tools.transNumFn)(_bottomPrinf.total_num),
                          bottomIsShowDiscounts: _bottomDiscounts.is_dis == 1,
                          bottomDiscountsTitle: _bottomDiscounts.title,
                          bottomDiscountsTotalPrice: (0, _tools.transNumFn)(_bottomDiscounts.total_price),
                          bottomDiscountsList: (0, _tools.assertArray)(_bottomDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          })
                        }
                      });
                    } else {
                      resFn({
                        type: 'error',
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    resFn({
                      type: 'error',
                      msg: that.$errorMsg,
                      result: result
                    });
                  }
                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));
        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());
    },
    // 删除购物车商品
    delCartGoods: function delCartGoods(cartId) {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(resFn) {
          var result, resultObject, list, bottomTotalObject, bottomPrinf, bottomDiscounts;
          return _regenerator.default.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return that.$request({
                    loading: true,
                    method: 'post',
                    url: '/api/Cart/cartDel',
                    data: {
                      cart_id: (0, _tools.checkTypeFn)(cartId) == 'Array' ? cartId.join(',') : cartId,
                      is_lose: 0
                    }
                  });
                case 2:
                  result = _context6.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resultObject = (0, _tools.assertObject)(result.data.data);
                      list = (0, _tools.assertArray)(resultObject.list).map(function (item) {
                        var sellerItem = (0, _tools.assertObject)(item),
                          sellerItemInfoDispatch = (0, _tools.assertObject)(sellerItem.dispatch),
                          sellerItemInfoPrinf = (0, _tools.assertObject)(sellerItem.prinf),
                          sellerItemInfoDiscounts = (0, _tools.assertObject)(sellerItem.discounts);
                        return {
                          suppId: item.supp_id,
                          isEmpty: item.is_empty == 1,
                          dispatchTitle: sellerItemInfoDispatch.shosub,
                          isShowToHomeBtn: sellerItemInfoDispatch.is_aoi == 1,
                          sellerTotalPrice: (0, _tools.transNumFn)(sellerItemInfoPrinf.total_price),
                          sellerTotalNum: (0, _tools.transNumFn)(sellerItemInfoPrinf.total_num),
                          sellerIsShowDiscounts: sellerItemInfoDiscounts.is_dis == 1,
                          sellerDiscountsTitle: sellerItemInfoDiscounts.title,
                          sellerDiscountsTotalPrice: (0, _tools.transNumFn)(sellerItemInfoDiscounts.total_price),
                          sellerDiscountsList: (0, _tools.assertArray)(sellerItemInfoDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          })
                        };
                      });
                      bottomTotalObject = (0, _tools.assertObject)(resultObject.total), bottomPrinf = (0, _tools.assertObject)(bottomTotalObject.prinf), bottomDiscounts = (0, _tools.assertObject)(bottomTotalObject.discounts);
                      resFn({
                        type: 'success',
                        msg: result.data.msg,
                        result: {
                          list: list,
                          bottomIsShowDiscounts: bottomDiscounts.is_dis == 1,
                          bottomDiscountsTitle: bottomDiscounts.title,
                          bottomDiscountsTotalPrice: (0, _tools.transNumFn)(bottomDiscounts.total_price),
                          bottomDiscountsList: (0, _tools.assertArray)(bottomDiscounts.list).map(function (i) {
                            return {
                              name: i.name,
                              price: (0, _tools.transNumFn)(i.price)
                            };
                          }),
                          bottomTotalPrice: (0, _tools.transNumFn)(bottomPrinf.total_price),
                          bottomTotalNum: (0, _tools.transNumFn)(bottomPrinf.total_num)
                        }
                      });
                    } else {
                      resFn({
                        type: 'error',
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    resFn({
                      type: 'error',
                      msg: that.$errorMsg,
                      result: result
                    });
                  }
                case 4:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));
        return function (_x5) {
          return _ref5.apply(this, arguments);
        };
      }());
    },
    // 改变选中状态
    changeGoodsActive: function changeGoodsActive(cartId, activeFlag) {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(resFn) {
          var result, resultObject;
          return _regenerator.default.wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return that.$request({
                    method: 'post',
                    url: '/api/Cart/cartActive',
                    data: {
                      cart_ids: (0, _tools.checkTypeFn)(cartId) == 'Array' ? cartId.join(',') : cartId,
                      cart_val: activeFlag ? 'ca' : 'nca'
                    }
                  });
                case 2:
                  result = _context7.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resultObject = (0, _tools.assertObject)(result.data.data);
                      resFn({
                        type: 'success',
                        msg: result.data.msg,
                        result: result
                      });
                    } else {
                      resFn({
                        type: 'error',
                        msg: result.data.msg,
                        result: result
                      });
                    }
                  } else {
                    resFn({
                      type: 'error',
                      msg: that.$errorMsg,
                      result: result
                    });
                  }
                case 4:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));
        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }());
    },
    // ↓↓↓ 页面交互处理的方法
    loadFn: function loadFn() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var that, getLikeGoodsResult, _getLikeGoodsResult$r3, likeGoodsTitle, likeGoodsList;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                that = _this2;
                _context8.next = 3;
                return that.getLikeGoodsFn();
              case 3:
                getLikeGoodsResult = _context8.sent;
                if (getLikeGoodsResult.type == 'success') {
                  _getLikeGoodsResult$r3 = getLikeGoodsResult.result, likeGoodsTitle = _getLikeGoodsResult$r3.likeGoodsTitle, likeGoodsList = _getLikeGoodsResult$r3.likeGoodsList;
                  that.likeGoodsTitle = likeGoodsTitle;
                  that.likeGoodsList = likeGoodsList;
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: getLikeGoodsResult.msg
                  });
                }
                if (!that.isLogin) {
                  that.isShowLoading = false;
                }
              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    // 生命周期 show
    onShowFn: function onShowFn() {
      var that = this;
      if (that.isLogin) {
        that.renderCartListFn();
      } else {
        // 未登录清空下清空那些只有登录才会有的数据字段
        that.commitBtnTemplateList = [];
        that.loseGoodsList = [];
        that.loseGoodsTitle = '';
        that.loseGoodsText = '';
        that.cartGoodsList = [];
        that.discountsModalTitle = '';
        that.discountsModalList = [];
        that.cardNumber = 0;
      }
      var indexAddressInfo = (0, _tools.assertObject)(uni.getStorageSync('indexAddressInfo'));
      if (indexAddressInfo.currentAddressText) {
        that.currentAddressText = indexAddressInfo.currentAddressText;
      }
      that.isLogin && that.setLocalAddressFn();
      that.commitBtnState = false;
      uni.setStorageSync('orderZhifuLoadCont', 0);
      uni.setStorageSync('orderZhifuReloadFlag', 0);
    },
    // 渲染购物车列表相关数据
    renderCartListFn: function renderCartListFn() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var that, getMyCartDataResult, _getMyCartDataResult$2, loseGoodsList, loseGoodsTitle, loseGoodsText, commitBtnTemplateList, cartGoodsList, bottomIsShowDiscounts, bottomDiscountsTitle, bottomDiscountsTotalPrice, bottomDiscountsList, bottomTotalPrice, bottomTotalNum;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                that = _this3;
                if (that.isLogin) {
                  _context9.next = 3;
                  break;
                }
                return _context9.abrupt("return", false);
              case 3:
                _context9.next = 5;
                return that.getMyCartDataFn();
              case 5:
                getMyCartDataResult = _context9.sent;
                // console.log('获取购物车列表数据 getMyCartDataResult ',getMyCartDataResult)
                if (getMyCartDataResult.type == 'success') {
                  _getMyCartDataResult$2 = getMyCartDataResult.result, loseGoodsList = _getMyCartDataResult$2.loseGoodsList, loseGoodsTitle = _getMyCartDataResult$2.loseGoodsTitle, loseGoodsText = _getMyCartDataResult$2.loseGoodsText, commitBtnTemplateList = _getMyCartDataResult$2.commitBtnTemplateList, cartGoodsList = _getMyCartDataResult$2.cartGoodsList, bottomIsShowDiscounts = _getMyCartDataResult$2.bottomIsShowDiscounts, bottomDiscountsTitle = _getMyCartDataResult$2.bottomDiscountsTitle, bottomDiscountsTotalPrice = _getMyCartDataResult$2.bottomDiscountsTotalPrice, bottomDiscountsList = _getMyCartDataResult$2.bottomDiscountsList, bottomTotalPrice = _getMyCartDataResult$2.bottomTotalPrice, bottomTotalNum = _getMyCartDataResult$2.bottomTotalNum;
                  that.loseGoodsList = loseGoodsList;
                  that.loseGoodsTitle = loseGoodsTitle;
                  that.loseGoodsText = loseGoodsText;
                  that.commitBtnTemplateList = commitBtnTemplateList;
                  that.cartGoodsList = cartGoodsList;
                  that.bottomIsShowDiscounts = bottomIsShowDiscounts;
                  that.bottomDiscountsTitle = bottomDiscountsTitle;
                  that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
                  that.bottomDiscountsList = bottomDiscountsList;
                  that.bottomTotalPrice = bottomTotalPrice;
                  that.bottomTotalNum = bottomTotalNum;
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: getMyCartDataResult.msg
                  });
                }
                if (that.isShowLoading) {
                  that.isShowLoading = false;
                }
                // ↓↓↓ 给tab-bar角标数字 赋值
                that.setTabBarCartNumFn();
                that.hideAllFn();
              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 设置优惠信息弹框显示隐藏
    setDiscountsModalFlagFn: function setDiscountsModalFlagFn(flag) {
      this.discountsModalFlag = flag;
    },
    // 底部的优惠信息点击
    bottomDiscountsClickFn: function bottomDiscountsClickFn() {
      var that = this;
      if (!that.bottomIsShowDiscounts) {
        return false;
      }
      that.discountsModalFlag = !that.discountsModalFlag;
      if (that.discountsModalFlag) {
        that.discountsModalTitle = that.bottomDiscountsTitle;
        that.discountsModalList = that.bottomDiscountsList;
      } else {
        that.discountsModalTitle = '';
        that.discountsModalList = [];
      }
    },
    /*
    // 单独门店的优惠信息点击 (方法没在用)
    sellerDiscountsClickFn(index) {
    	let that = this;
    	let { sellerDiscountsTitle, sellerDiscountsList } = that.cartGoodsList[index];
    	that.discountsModalTitle = sellerDiscountsTitle;
    	that.discountsModalList = sellerDiscountsList;
    	if (!that.discountsModalFlag) {
    		that.discountsModalFlag = true;
    	}
    },
    */
    // 购物车增加减去按钮点击
    controlBtnClickFn: function controlBtnClickFn(type, cartGoodsIndex, sellerGoodsIndex) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var that, changeSeller, changeGoods, cartNumberChangeResult, _cartNumberChangeResu, changeGoodsIsActive, changeGoodsCartNum, changeGoodsAddBtnStopFlag, changeGoodsDiscountsMsg, sellerIsShowDiscounts, sellerDiscountsTitle, sellerDiscountsTotalPrice, sellerDiscountsList, isShowToHomeBtn, dispatchTitle, sellerTotalPrice, sellerTotalNum, bottomTotalPrice, bottomTotalNum, bottomIsShowDiscounts, bottomDiscountsTitle, bottomDiscountsTotalPrice, bottomDiscountsList, _cartNumberChangeResu2, _dispatchTitle, _isShowToHomeBtn, _sellerIsShowDiscounts, _sellerDiscountsTitle, _sellerDiscountsTotalPrice, _sellerDiscountsList, _sellerTotalPrice, _sellerTotalNum, _bottomIsShowDiscounts, _bottomDiscountsTitle, _bottomDiscountsTotalPrice, _bottomDiscountsList, _bottomTotalPrice, _bottomTotalNum;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                that = _this4; // 未绑定手机号不能操作以下功能
                if (that.isRunBindMobileFunc) {
                  _context10.next = 4;
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
                return _context10.abrupt("return", false);
              case 4:
                if (!that.sendAjaxFlag) {
                  _context10.next = 6;
                  break;
                }
                return _context10.abrupt("return", false);
              case 6:
                that.sendAjaxFlag = true;
                changeSeller = that.cartGoodsList[cartGoodsIndex];
                changeGoods = changeSeller.sellerCartGoodsList[sellerGoodsIndex];
                if (!(type == dec && changeGoods.cartNum == 1 || (0, _tools.checkTypeFn)(type) == 'Number' && type <= 0)) {
                  _context10.next = 13;
                  break;
                }
                uni.showModal({
                  title: '您确定删除该商品吗？',
                  success: function success(_ref7) {
                    var confirm = _ref7.confirm;
                    if (confirm) {
                      console.log('执行删除操作');
                      that.delCartGoodsFn(changeGoods.cartId);
                    } else {
                      console.log('取消');
                    }
                  }
                });
                that.sendAjaxFlag = false;
                return _context10.abrupt("return", false);
              case 13:
                that.hideAllFn();
                uni.showLoading({});
                _context10.next = 17;
                return that.cartNumberChangeFn(type, changeGoods.cartId);
              case 17:
                cartNumberChangeResult = _context10.sent;
                console.log('cartNumberChangeResult', cartNumberChangeResult);
                if (cartNumberChangeResult.type == 'success') {
                  _cartNumberChangeResu = cartNumberChangeResult.result, changeGoodsIsActive = _cartNumberChangeResu.changeGoodsIsActive, changeGoodsCartNum = _cartNumberChangeResu.changeGoodsCartNum, changeGoodsAddBtnStopFlag = _cartNumberChangeResu.changeGoodsAddBtnStopFlag, changeGoodsDiscountsMsg = _cartNumberChangeResu.changeGoodsDiscountsMsg, sellerIsShowDiscounts = _cartNumberChangeResu.sellerIsShowDiscounts, sellerDiscountsTitle = _cartNumberChangeResu.sellerDiscountsTitle, sellerDiscountsTotalPrice = _cartNumberChangeResu.sellerDiscountsTotalPrice, sellerDiscountsList = _cartNumberChangeResu.sellerDiscountsList, isShowToHomeBtn = _cartNumberChangeResu.isShowToHomeBtn, dispatchTitle = _cartNumberChangeResu.dispatchTitle, sellerTotalPrice = _cartNumberChangeResu.sellerTotalPrice, sellerTotalNum = _cartNumberChangeResu.sellerTotalNum, bottomTotalPrice = _cartNumberChangeResu.bottomTotalPrice, bottomTotalNum = _cartNumberChangeResu.bottomTotalNum, bottomIsShowDiscounts = _cartNumberChangeResu.bottomIsShowDiscounts, bottomDiscountsTitle = _cartNumberChangeResu.bottomDiscountsTitle, bottomDiscountsTotalPrice = _cartNumberChangeResu.bottomDiscountsTotalPrice, bottomDiscountsList = _cartNumberChangeResu.bottomDiscountsList;
                  changeGoods.isActive = changeGoodsIsActive;
                  changeGoods.cartNum = changeGoodsCartNum;
                  changeGoods.addBtnStopFlag = changeGoodsAddBtnStopFlag;
                  changeGoods.discountsMsg = changeGoodsDiscountsMsg;
                  changeSeller.sellerIsShowDiscounts = sellerIsShowDiscounts;
                  changeSeller.sellerDiscountsTitle = sellerDiscountsTitle;
                  changeSeller.sellerDiscountsTotalPrice = sellerDiscountsTotalPrice;
                  changeSeller.sellerDiscountsList = sellerDiscountsList;
                  changeSeller.isShowToHomeBtn = isShowToHomeBtn;
                  changeSeller.dispatchTitle = dispatchTitle;
                  changeSeller.sellerTotalPrice = sellerTotalPrice;
                  changeSeller.sellerTotalNum = sellerTotalNum;
                  that.bottomTotalPrice = bottomTotalPrice;
                  that.bottomTotalNum = bottomTotalNum;
                  that.bottomIsShowDiscounts = bottomIsShowDiscounts;
                  that.bottomDiscountsTitle = bottomDiscountsTitle;
                  that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
                  that.bottomDiscountsList = bottomDiscountsList;
                  that.hideAllFn();
                  if (cartNumberChangeResult.msg) {
                    uni.showToast({
                      icon: 'none',
                      title: cartNumberChangeResult.msg
                    });
                  }
                  uni.$emit('goodsAddCartEd', {
                    goodsId: changeGoods.goodsId,
                    selectedNum: changeGoodsCartNum
                  });
                  that.inputDomFlag = false;
                  that.$nextTick(function () {
                    that.inputDomFlag = true;
                  });

                  // ↓↓↓ 给tab-bar角标数字 赋值
                  that.setTabBarCartNumFn();
                } else if (cartNumberChangeResult.type == 'success40004') {
                  that.hideAllFn();
                  uni.showModal({
                    title: '您确定删除该商品吗？',
                    success: function success(_ref8) {
                      var confirm = _ref8.confirm;
                      if (confirm) {
                        console.log('执行删除操作');
                        that.delCartGoodsFn(changeGoods.cartId);
                      } else {
                        changeGoods.cartNum = 1;
                        console.log('取消');
                      }
                    }
                  });
                } else if (cartNumberChangeResult.type == 'success40001') {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: cartNumberChangeResult.msg
                  });
                  _cartNumberChangeResu2 = cartNumberChangeResult.result, _dispatchTitle = _cartNumberChangeResu2.dispatchTitle, _isShowToHomeBtn = _cartNumberChangeResu2.isShowToHomeBtn, _sellerIsShowDiscounts = _cartNumberChangeResu2.sellerIsShowDiscounts, _sellerDiscountsTitle = _cartNumberChangeResu2.sellerDiscountsTitle, _sellerDiscountsTotalPrice = _cartNumberChangeResu2.sellerDiscountsTotalPrice, _sellerDiscountsList = _cartNumberChangeResu2.sellerDiscountsList, _sellerTotalPrice = _cartNumberChangeResu2.sellerTotalPrice, _sellerTotalNum = _cartNumberChangeResu2.sellerTotalNum, _bottomIsShowDiscounts = _cartNumberChangeResu2.bottomIsShowDiscounts, _bottomDiscountsTitle = _cartNumberChangeResu2.bottomDiscountsTitle, _bottomDiscountsTotalPrice = _cartNumberChangeResu2.bottomDiscountsTotalPrice, _bottomDiscountsList = _cartNumberChangeResu2.bottomDiscountsList, _bottomTotalPrice = _cartNumberChangeResu2.bottomTotalPrice, _bottomTotalNum = _cartNumberChangeResu2.bottomTotalNum; // 更新商品失效样式
                  changeGoods.isInvalid = true;

                  // 更新当前门店信息
                  changeSeller.dispatchTitle = _dispatchTitle;
                  changeSeller.isShowToHomeBtn = _isShowToHomeBtn;
                  changeSeller.sellerIsShowDiscounts = _sellerIsShowDiscounts;
                  changeSeller.sellerDiscountsTitle = _sellerDiscountsTitle;
                  changeSeller.sellerDiscountsTotalPrice = _sellerDiscountsTotalPrice;
                  changeSeller.sellerDiscountsList = _sellerDiscountsList;
                  changeSeller.sellerTotalPrice = _sellerTotalPrice;
                  changeSeller.sellerTotalNum = _sellerTotalNum;

                  // 更新购物车底部信息
                  that.bottomIsShowDiscounts = _bottomIsShowDiscounts;
                  that.bottomDiscountsTitle = _bottomDiscountsTitle;
                  that.bottomDiscountsTotalPrice = _bottomDiscountsTotalPrice;
                  that.bottomDiscountsList = _bottomDiscountsList;
                  that.bottomTotalPrice = _bottomTotalPrice;
                  that.bottomTotalNum = _bottomTotalNum;
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: cartNumberChangeResult.msg
                  });
                }
                that.sendAjaxFlag = false;
                console.log('cartNumberChangeResult', cartNumberChangeResult);
              case 22:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    // 删除已加购的购物车商品
    delCartGoodsFn: function delCartGoodsFn(cartId) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var that, delCartGoodsResult, _delCartGoodsResult$r, list, bottomIsShowDiscounts, bottomDiscountsTitle, bottomDiscountsTotalPrice, bottomDiscountsList, bottomTotalPrice, bottomTotalNum, zeroCartIdList, zeroGoodsIdList, cloneCartGoodsList;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                that = _this5;
                _context11.next = 3;
                return that.delCartGoods(cartId);
              case 3:
                delCartGoodsResult = _context11.sent;
                console.log('that.delCartGoods(cartId) delCartGoodsResult', delCartGoodsResult);
                if (delCartGoodsResult.type == 'success') {
                  _delCartGoodsResult$r = delCartGoodsResult.result, list = _delCartGoodsResult$r.list, bottomIsShowDiscounts = _delCartGoodsResult$r.bottomIsShowDiscounts, bottomDiscountsTitle = _delCartGoodsResult$r.bottomDiscountsTitle, bottomDiscountsTotalPrice = _delCartGoodsResult$r.bottomDiscountsTotalPrice, bottomDiscountsList = _delCartGoodsResult$r.bottomDiscountsList, bottomTotalPrice = _delCartGoodsResult$r.bottomTotalPrice, bottomTotalNum = _delCartGoodsResult$r.bottomTotalNum; // 删除成功后把删除的商品加购数量更新到底部的猜你喜欢商品列表
                  zeroCartIdList = (0, _tools.checkTypeFn)(cartId) == 'Array' ? cartId : [cartId];
                  zeroGoodsIdList = [];
                  cloneCartGoodsList = (0, _tools.cloneFn)(that.cartGoodsList); // 改变数据前先把购物车id对应的商品idpush到zeroGoodsIdList里
                  cloneCartGoodsList.forEach(function (i) {
                    i.sellerCartGoodsList.forEach(function (j) {
                      if (zeroCartIdList.includes(j.cartId)) {
                        zeroGoodsIdList.push(j.goodsId);
                      }
                    });
                  });
                  cloneCartGoodsList.forEach(function (cartGoodsItem, cartGoodsIndex) {
                    list.forEach(function (item, index) {
                      if (item.suppId == cartGoodsItem.sellerId) {
                        if (item.isEmpty) {
                          cartGoodsItem.sellerCartGoodsList = [];
                        } else {
                          if ((0, _tools.checkTypeFn)(cartId) == 'Array') {
                            var cloneSellerCartGoodsList = (0, _tools.cloneFn)(cartGoodsItem.sellerCartGoodsList);
                            cloneSellerCartGoodsList.forEach(function (i) {
                              return i.del = cartId.includes(i.cartId);
                            });
                            var sellerCartGoodsList = cloneSellerCartGoodsList.filter(function (i) {
                              return !i.del;
                            });
                            sellerCartGoodsList.forEach(function (i) {
                              return delete i.del;
                            });
                            cartGoodsItem.sellerCartGoodsList = sellerCartGoodsList;
                          } else {
                            var _index = cartGoodsItem.sellerCartGoodsList.findIndex(function (i) {
                              return i.cartId == cartId;
                            });
                            cartGoodsItem.sellerCartGoodsList.splice(_index, 1);
                          }
                        }
                        cartGoodsItem.dispatchTitle = item.dispatchTitle;
                        cartGoodsItem.isShowToHomeBtn = item.isShowToHomeBtn;
                        cartGoodsItem.sellerTotalPrice = item.sellerTotalPrice;
                        cartGoodsItem.sellerTotalNum = item.sellerTotalNum;
                        cartGoodsItem.sellerIsShowDiscounts = item.sellerIsShowDiscounts;
                        cartGoodsItem.sellerDiscountsTitle = item.sellerDiscountsTitle;
                        cartGoodsItem.sellerDiscountsTotalPrice = item.sellerDiscountsTotalPrice;
                        cartGoodsItem.sellerDiscountsList = item.sellerDiscountsList;
                      }
                    });
                  });
                  that.cartGoodsList = cloneCartGoodsList;
                  that.bottomIsShowDiscounts = bottomIsShowDiscounts;
                  that.bottomDiscountsTitle = bottomDiscountsTitle;
                  that.bottomDiscountsTotalPrice = bottomDiscountsTotalPrice;
                  that.bottomDiscountsList = bottomDiscountsList;
                  that.bottomTotalPrice = bottomTotalPrice;
                  that.bottomTotalNum = bottomTotalNum;
                  zeroGoodsIdList.map(function (i) {
                    return uni.$emit('goodsAddCartEd', {
                      goodsId: i,
                      selectedNum: 0
                    });
                  });
                  // ↓↓↓ 给tab-bar角标数字 赋值
                  that.setTabBarCartNumFn();
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: delCartGoodsResult.msg
                  });
                }
              case 6:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }))();
    },
    // 输入框blur事件后
    setNumInpFn: function setNumInpFn(e, cartGoodsIndex, sellerGoodsIndex) {
      var that = this;
      // 未绑定手机号不能操作以下功能
      if (!that.isRunBindMobileFunc) {
        uni.showModal({
          title: _const.bindMobileTips,
          success: function success(e) {
            that.inputDomFlag = false;
            if (e.confirm) {
              that.navigateToFn({
                url: "/packageA/tel-login/user-info"
              });
            } else {
              that.$nextTick(function () {
                that.inputDomFlag = true;
              });
            }
          }
        });
        return false;
      }
      var changeSeller = that.cartGoodsList[cartGoodsIndex];
      var changeGoods = changeSeller.sellerCartGoodsList[sellerGoodsIndex];
      var setCartNum = (0, _tools.assertNumber)((0, _tools.transNumFn)(e.detail.value)); // 输入的数值
      if (setCartNum <= 0) {
        uni.showModal({
          title: '您确定删除该商品吗？',
          success: function success(_ref9) {
            var confirm = _ref9.confirm;
            if (confirm) {
              console.log('执行删除操作');
              that.delCartGoodsFn(changeGoods.cartId);
            } else {
              console.log('取消');
              that.inputDomFlag = false;
              that.$nextTick(function () {
                that.inputDomFlag = true;
              });
            }
          }
        });
        return false;
      }
      that.controlBtnClickFn(setCartNum, cartGoodsIndex, sellerGoodsIndex);
    },
    // 删除选中状态的商品
    delSelectGoods: function delSelectGoods() {
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
      var cartIdList = [];
      that.cartGoodsList.forEach(function (i) {
        var cartIdArr = i.sellerCartGoodsList.filter(function (i) {
          return i.isActive;
        }).map(function (i) {
          return i.cartId;
        });
        cartIdList = cartIdList.concat(cartIdArr);
      });
      if (cartIdList.length <= 0) {
        uni.showToast({
          icon: 'none',
          title: '您尚未选中的商品'
        });
        return false;
      }
      uni.showModal({
        title: '您是否要删除已选中的商品',
        success: function success(_ref10) {
          var confirm = _ref10.confirm;
          if (confirm) {
            console.log('要删除的商品 cartIdList', cartIdList);
            that.delCartGoodsFn(cartIdList);
          } else {
            console.log('取消');
          }
        }
      });
    },
    // 提示的气泡被点击
    bubbleTipsClickFn: function bubbleTipsClickFn(cartGoodsIndex, sellerGoodsIndex) {
      var that = this;
      that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList[sellerGoodsIndex].isShowBubbleTips = false;
      console.log('isShowBubbleTips', that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList[sellerGoodsIndex].isShowBubbleTips);
    },
    // 根据id跳转到门店页面
    toSellerFn: function toSellerFn(id) {
      var that = this;
      var idNum = (0, _tools.transNumFn)(id);
      if (!that.gongyingshang || idNum <= 0) {
        that.navigateToFn({
          isTab: true,
          url: '/pages/index/index'
        });
        return false;
      }
      that.navigateToFn({
        url: "/packageA/gongyingshang-seller/gongyingshang-seller?gysMdId=".concat(idNum)
      });
    },
    // 根据商品类型和id跳转到对应的商品详情页面
    toGoodsDetailPageFn: function toGoodsDetailPageFn(isInvalid, goodsType, id) {
      if (isInvalid) {
        return false;
      }
      var pagePath = goodsType ? '/packageB/goods-detail/goods-detail-seckill' : '/packageB/goods-detail/goods-detail';
      this.navigateToFn({
        url: "".concat(pagePath, "?goods_id=").concat(id)
      });
    },
    // 成功清空失效商品
    clearInvalidGoodsFn: function clearInvalidGoodsFn() {
      this.loseGoodsList = [];
    },
    // 底部的商品添加购物车后更新上面的购物车列表
    emitGetCartListFn: function emitGetCartListFn() {
      this.renderCartListFn();
    },
    // 单个商品切换选中状态
    goodsActiveIconClickFn: function goodsActiveIconClickFn(cartGoodsIndex, sellerGoodsIndex) {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var that, goods, changeGoodsActiveResult;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                that = _this6; // 未绑定手机号不能操作以下功能
                if (that.isRunBindMobileFunc) {
                  _context12.next = 4;
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
                return _context12.abrupt("return", false);
              case 4:
                goods = that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList[sellerGoodsIndex];
                if (!goods.isInvalid) {
                  _context12.next = 7;
                  break;
                }
                return _context12.abrupt("return", false);
              case 7:
                if (!that.sendAjaxFlag) {
                  _context12.next = 9;
                  break;
                }
                return _context12.abrupt("return", false);
              case 9:
                that.sendAjaxFlag = true;
                that.hideAllFn();
                uni.showLoading();
                _context12.next = 14;
                return that.changeGoodsActive(goods.cartId, !goods.isActive);
              case 14:
                changeGoodsActiveResult = _context12.sent;
                if (changeGoodsActiveResult.type == 'success') {
                  that.renderCartListFn();
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: changeGoodsActiveResult.msg
                  });
                }
                that.sendAjaxFlag = false;
              case 17:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }))();
    },
    // 单个店铺切换选中状态
    sellerActiveIconClickFn: function sellerActiveIconClickFn(cartGoodsIndex) {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
        var that, sellerGoodsList, isActive, cartIdList, changeGoodsActiveResult;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                that = _this7; // 未绑定手机号不能操作以下功能
                if (that.isRunBindMobileFunc) {
                  _context13.next = 4;
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
                return _context13.abrupt("return", false);
              case 4:
                if (!that.sendAjaxFlag) {
                  _context13.next = 6;
                  break;
                }
                return _context13.abrupt("return", false);
              case 6:
                that.sendAjaxFlag = true;
                that.hideAllFn();
                uni.showLoading();
                sellerGoodsList = that.cartGoodsList[cartGoodsIndex].sellerCartGoodsList;
                if (sellerGoodsList.some(function (i) {
                  return i.isInvalid;
                })) {
                  isActive = true;
                  cartIdList = sellerGoodsList.filter(function (i) {
                    return !i.isInvalid;
                  }).map(function (i) {
                    return i.cartId;
                  });
                } else {
                  isActive = !sellerGoodsList.every(function (i) {
                    return i.isActive;
                  });
                  cartIdList = sellerGoodsList.map(function (i) {
                    return i.cartId;
                  });
                }
                _context13.next = 13;
                return that.changeGoodsActive(cartIdList, isActive);
              case 13:
                changeGoodsActiveResult = _context13.sent;
                if (changeGoodsActiveResult.type == 'success') {
                  that.renderCartListFn();
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: changeGoodsActiveResult.msg
                  });
                }
                that.sendAjaxFlag = false;
              case 16:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }))();
    },
    //点击全选按钮
    allSelectFn: function allSelectFn() {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
        var that, isActive, isHasInvalid, cartIdList, changeGoodsActiveResult;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                that = _this8; // 未绑定手机号不能操作以下功能
                if (that.isRunBindMobileFunc) {
                  _context14.next = 4;
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
                return _context14.abrupt("return", false);
              case 4:
                if (!that.sendAjaxFlag) {
                  _context14.next = 6;
                  break;
                }
                return _context14.abrupt("return", false);
              case 6:
                that.sendAjaxFlag = true;
                if (!that.calcCartIsEmpty) {
                  _context14.next = 9;
                  break;
                }
                return _context14.abrupt("return", false);
              case 9:
                isHasInvalid = false;
                that.cartGoodsList.forEach(function (i) {
                  i.sellerCartGoodsList.forEach(function (j) {
                    if (j.isInvalid) {
                      isHasInvalid = true;
                    }
                  });
                });
                if (isHasInvalid) {
                  isActive = true;
                  cartIdList = function () {
                    var temCartIdList = [];
                    that.cartGoodsList.forEach(function (i) {
                      i.sellerCartGoodsList.forEach(function (j) {
                        if (!j.isInvalid) {
                          temCartIdList.push(j.cartId);
                        }
                      });
                    });
                    return temCartIdList;
                  }();
                } else {
                  isActive = !that.allSelectBtnActiveStatus;
                  cartIdList = function () {
                    var temCartIdList = [];
                    that.cartGoodsList.forEach(function (i) {
                      i.sellerCartGoodsList.forEach(function (j) {
                        temCartIdList.push(j.cartId);
                      });
                    });
                    return temCartIdList;
                  }();
                }
                console.log('cartIdList, isActive', cartIdList, isActive);
                that.hideAllFn();
                uni.showLoading();
                _context14.next = 17;
                return that.changeGoodsActive(cartIdList, isActive);
              case 17:
                changeGoodsActiveResult = _context14.sent;
                if (changeGoodsActiveResult.type == 'success') {
                  that.renderCartListFn();
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: changeGoodsActiveResult.msg
                  });
                }
                that.sendAjaxFlag = false;
              case 20:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }))();
    },
    // 单店结算按钮
    paySellerBtnClickFn: function paySellerBtnClickFn(cartGoodsItem) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var that;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                that = _this9; // 未绑定手机号不能操作以下功能
                if (that.isRunBindMobileFunc) {
                  _context15.next = 4;
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
                return _context15.abrupt("return", false);
              case 4:
                that.navigateToFn({
                  url: "/pages/order/submit-order?storeType=".concat(cartGoodsItem.sellerId)
                });
              case 5:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }))();
    },
    // 选择好商品后去结算
    toPayFn: function toPayFn() {
      var _this10 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        var that;
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                that = _this10; // 未绑定手机号不能操作以下功能
                if (that.isRunBindMobileFunc) {
                  _context16.next = 4;
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
                return _context16.abrupt("return", false);
              case 4:
                if (that.gongyingshang) {
                  that.navigateToFn({
                    url: "/pages/order/submit-order?storeType=all"
                  });
                } else {
                  that.navigateToFn({
                    url: "/pages/order/submit-order"
                  });
                }
              case 5:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
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
    // 获取当前位置信息赋值到 storage 里 结算页面的多自提点需要这个位置信息
    // 给页面顶部设置地址
    setPageAddressFn: function setPageAddressFn(latitude, longitude) {
      var _this11 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17() {
        var that, addressTextResult;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                that = _this11;
                _context17.next = 3;
                return that.getCurrentAddressInfo({
                  latitude: latitude,
                  longitude: longitude
                });
              case 3:
                addressTextResult = _context17.sent;
                console.log('getCurrentAddressInfo addressTextResult', addressTextResult);
                if (addressTextResult.type == 'success') {
                  that.currentAddressText = addressTextResult.result.address;
                }
              case 6:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }))();
    },
    setLocalAddressFn: function setLocalAddressFn() {
      var _this12 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
        var that, userLocationInfo, locationInfo, _locationInfo;
        return _regenerator.default.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                that = _this12;
                _context18.next = 3;
                return that.settingInfoFn('scope.userLocation');
              case 3:
                userLocationInfo = _context18.sent;
                // 用户授权位置信息
                console.log('用户授权位置信息 userLocationInfo', userLocationInfo);
                if (!(userLocationInfo.type == 'success')) {
                  _context18.next = 33;
                  break;
                }
                if (!userLocationInfo.isFirst) {
                  _context18.next = 15;
                  break;
                }
                _context18.next = 9;
                return that.getLocationInfoFn();
              case 9:
                locationInfo = _context18.sent;
                console.log('locationInfo 获取位置 -aa', locationInfo);
                if (locationInfo.type == 'error') {
                  that.navigateToFn({
                    url: "/packageA/set-address-page/index?page=cart"
                  });
                } else {
                  uni.setStorageSync('cartAddress', {
                    latitude: locationInfo.result.latitude,
                    longitude: locationInfo.result.longitude
                  });
                  !that.currentAddressText && that.setPageAddressFn(locationInfo.result.latitude, locationInfo.result.longitude);
                }
                return _context18.abrupt("return", false);
              case 15:
                if (!userLocationInfo.isOk) {
                  _context18.next = 29;
                  break;
                }
                _context18.next = 18;
                return that.getLocationInfoFn();
              case 18:
                _locationInfo = _context18.sent;
                console.log('locationInfo 获取位置 -bb', _locationInfo);
                if (!(_locationInfo.type == 'success')) {
                  _context18.next = 25;
                  break;
                }
                uni.setStorageSync('cartAddress', {
                  latitude: _locationInfo.result.latitude,
                  longitude: _locationInfo.result.longitude
                });
                !that.currentAddressText && that.setPageAddressFn(_locationInfo.result.latitude, _locationInfo.result.longitude);
                _context18.next = 27;
                break;
              case 25:
                that.navigateToFn({
                  url: "/packageA/set-address-page/index?page=cart"
                });
                return _context18.abrupt("return", false);
              case 27:
                _context18.next = 31;
                break;
              case 29:
                that.navigateToFn({
                  url: "/packageA/set-address-page/index?page=cart"
                });
                return _context18.abrupt("return", false);
              case 31:
                _context18.next = 35;
                break;
              case 33:
                uni.showToast({
                  icon: 'none',
                  title: userLocationInfo.msg
                });
                return _context18.abrupt("return", false);
              case 35:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }))();
    }
  },
  // ↑↑↑↑↑ methods 结束
  computed: {
    // tab-bar的选中项
    tabCurrent: function tabCurrent() {
      for (var i = 0; i < this.MenuList.length; i++) {
        if (this.MenuList[i].field == 'g') {
          return i;
        }
      }
      return 0;
    },
    // 当前状态是否空购物车
    calcCartIsEmpty: function calcCartIsEmpty() {
      var that = this;
      if (that.isLogin) {
        var goodsCont = 0;
        that.cartGoodsList.forEach(function (i) {
          goodsCont += i.sellerCartGoodsList.length;
        });
        if (goodsCont >= 1) {
          return false;
        }
      }
      return true;
    },
    // 当前门店的商品是否全部选中
    calcSellerIsActive: function calcSellerIsActive() {
      return function (cartGoodsItem) {
        if (cartGoodsItem.sellerCartGoodsList.some(function (i) {
          return i.isInvalid;
        })) {
          return false;
        } else {
          return cartGoodsItem.sellerCartGoodsList.every(function (i) {
            return i.isActive;
          });
        }
      };
    },
    // 当前门店是否有选中的商品
    calcSellerHasActive: function calcSellerHasActive() {
      return function (i) {
        return i.sellerCartGoodsList.some(function (o) {
          return o.isActive;
        });
      };
    },
    // 底部的全选按钮状态
    allSelectBtnActiveStatus: function allSelectBtnActiveStatus() {
      if (this.calcCartIsEmpty) {
        return false;
      }
      var active = 0,
        notActive = 0,
        len = 0,
        isInvalid = false;
      this.cartGoodsList.forEach(function (i) {
        len += i.sellerCartGoodsList.length;
        i.sellerCartGoodsList.forEach(function (j) {
          if (j.isInvalid) {
            isInvalid = true;
          }
          if (j.isActive) {
            active += 1;
          } else {
            notActive += 1;
          }
        });
      });
      if (isInvalid) {
        return false;
      }
      if (active == len) {
        return true;
      }
      return false;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 79:
/*!*********************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue?vue&type=style&index=0&id=0f00adf4&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./cart.vue?vue&type=style&index=0&id=0f00adf4&lang=scss&scoped=true& */ 80);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_cart_vue_vue_type_style_index_0_id_0f00adf4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 80:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/cart/cart.vue?vue&type=style&index=0&id=0f00adf4&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[73,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/pages/cart/cart.js.map