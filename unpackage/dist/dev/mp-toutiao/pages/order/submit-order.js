(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/submit-order"],{

/***/ 100:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue?vue&type=template&id=12231db3&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var l2 = _vm.gongyingshang
    ? _vm.__map(
        _vm.moreStoreData.moreStoreList,
        function (storeItem, storeIndex) {
          var $orig = _vm.__get_orig(storeItem)
          var m0 = _vm.isShowMoreStoreYvyueComp(storeItem)
          var m1 =
            m0 && storeItem.yvyueType == _vm.dspcyvyue
              ? _vm.moreStoreYvyueRange(storeItem)
              : null
          var m2 = _vm.moreStoreCalcIsShowShangjiazitidian(storeItem)
          var m3 = _vm.moreStoreCalcIsShowDuodian(storeItem)
          var l0 = _vm.__map(
            storeItem.goodsList,
            function (goodsItem, goodsIndex) {
              var $orig = _vm.__get_orig(goodsItem)
              var f0 = _vm._f("filterTransNum")(goodsItem.goodsPrice)
              return {
                $orig: $orig,
                f0: f0,
              }
            }
          )
          var l1 =
            storeItem.loseGoodsList.length && storeItem.invalidGoodsListIsShow
              ? _vm.__map(
                  storeItem.loseGoodsList,
                  function (invalidGoodsItem, invalidGoodsIndex) {
                    var $orig = _vm.__get_orig(invalidGoodsItem)
                    var f1 = _vm._f("filterTransNum")(
                      invalidGoodsItem.goodsPrice
                    )
                    return {
                      $orig: $orig,
                      f1: f1,
                    }
                  }
                )
              : null
          var f2 = _vm._f("filterTransNum")(storeItem.goodsPrice)
          var f3 =
            storeItem.goodsDiscountsPrice > 0
              ? _vm._f("filterTransNum")(storeItem.goodsDiscountsPrice)
              : null
          var f4 =
            storeItem.storeIsZiying &&
            _vm.useDiscountCouponNum &&
            _vm.discountCouponIndex >= 0
              ? _vm._f("filterTransNum")(_vm.useDiscountCouponPrice)
              : null
          var f5 =
            storeItem.storeIsZiying &&
            _vm.goodsCouponList.length &&
            _vm.goodsCouponIndex >= 0
              ? _vm._f("filterTransNum")(_vm.useGoodsCouponPrice)
              : null
          var m4 = _vm.moreStoreCalcIsShowSubmitInput(storeItem)
          return {
            $orig: $orig,
            m0: m0,
            m1: m1,
            m2: m2,
            m3: m3,
            l0: l0,
            l1: l1,
            f2: f2,
            f3: f3,
            f4: f4,
            f5: f5,
            m4: m4,
          }
        }
      )
    : null
  var l3 = !_vm.gongyingshang
    ? _vm.__map(_vm.goodsList, function (goodsItem, goodsIndex) {
        var $orig = _vm.__get_orig(goodsItem)
        var f6 = _vm._f("filterTransNum")(goodsItem.goodsPrice)
        return {
          $orig: $orig,
          f6: f6,
        }
      })
    : null
  var l4 =
    !_vm.gongyingshang && _vm.loseGoodsList.length && _vm.invalidGoodsListIsShow
      ? _vm.__map(
          _vm.loseGoodsList,
          function (invalidGoodsItem, invalidGoodsIndex) {
            var $orig = _vm.__get_orig(invalidGoodsItem)
            var f7 = _vm._f("filterTransNum")(invalidGoodsItem.goodsPrice)
            return {
              $orig: $orig,
              f7: f7,
            }
          }
        )
      : null
  var f8 = !_vm.gongyingshang
    ? _vm._f("filterTransNum")(_vm.ziyingGoodsAllPrice)
    : null
  var f9 =
    !_vm.gongyingshang && _vm.ziyingGoodsDiscountsPrice > 0
      ? _vm._f("filterTransNum")(_vm.ziyingGoodsDiscountsPrice)
      : null
  var f10 =
    !_vm.gongyingshang &&
    _vm.useDiscountCouponNum &&
    _vm.discountCouponIndex >= 0
      ? _vm._f("filterTransNum")(_vm.useDiscountCouponPrice)
      : null
  var f11 =
    !_vm.gongyingshang &&
    _vm.goodsCouponList.length &&
    _vm.goodsCouponIndex >= 0
      ? _vm._f("filterTransNum")(_vm.useGoodsCouponPrice)
      : null
  var f12 = _vm.yve > 0 ? _vm._f("filterTransNum")(_vm.yve) : null
  var f13 = _vm._f("filterTransNum")(_vm.viewShowOrderShifu)
  var f14 =
    _vm.orderDiscountsPrice > 0
      ? _vm._f("filterTransNum")(_vm.orderDiscountsPrice)
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l2: l2,
        l3: l3,
        l4: l4,
        f8: f8,
        f9: f9,
        f10: f10,
        f11: f11,
        f12: f12,
        f13: f13,
        f14: f14,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 101:
/*!*********************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./submit-order.vue?vue&type=script&lang=js& */ 102);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 102:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _siteinfo = __webpack_require__(/*! @/tools/siteinfo.js */ 38);
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
var _const = __webpack_require__(/*! @/tools/const.js */ 41);
var _getOneStorePageData = __webpack_require__(/*! ./submit-order-fun/getOneStorePageData.js */ 103);
var _getMoreStorePageData2 = __webpack_require__(/*! ./submit-order-fun/getMoreStorePageData.js */ 106);
var _getOneStoreToggleDispatchTypeDataFn = __webpack_require__(/*! ./submit-order-fun/getOneStoreToggleDispatchTypeDataFn.js */ 107);
var _getMoreStoreToggleDispatchTypeDataFn = __webpack_require__(/*! ./submit-order-fun/getMoreStoreToggleDispatchTypeDataFn.js */ 108);
var _order = __webpack_require__(/*! @/pages/order/submit-order-fun/order.js */ 105);
var _submitOrderEnum = __webpack_require__(/*! @/pages/order/submit-order-enum.js */ 104);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var userAddress = function userAddress() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/user-address */ "pages/order/order-components/user-address").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/user-address.vue */ 1040));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var dotZitiModal = function dotZitiModal() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/dot-ziti-modal */ "pages/order/submit-order-components/dot-ziti-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/dot-ziti-modal.vue */ 1082));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var discountCouponModal = function discountCouponModal() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/discount-coupon-modal */ "pages/order/submit-order-components/discount-coupon-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/discount-coupon-modal.vue */ 1089));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var goodsCouponModal = function goodsCouponModal() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/goods-coupon-modal */ "pages/order/submit-order-components/goods-coupon-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/goods-coupon-modal.vue */ 1096));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var goodsInvalidModal = function goodsInvalidModal() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/goods-invalid-modal */ "pages/order/submit-order-components/goods-invalid-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/goods-invalid-modal.vue */ 1103));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var addressInvalidModal = function addressInvalidModal() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/address-invalid-modal */ "pages/order/submit-order-components/address-invalid-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/address-invalid-modal.vue */ 1110));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var dispatchType = function dispatchType() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/dispatch-type */ "pages/order/submit-order-components/dispatch-type").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/dispatch-type.vue */ 1117));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var sellerzitidianShow = function sellerzitidianShow() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/sellerzitidian-show */ "pages/order/submit-order-components/sellerzitidian-show").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/sellerzitidian-show.vue */ 1124));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var duozitidianShow = function duozitidianShow() {
  __webpack_require__.e(/*! require.ensure | pages/order/submit-order-components/duozitidian-show */ "pages/order/submit-order-components/duozitidian-show").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/submit-order-components/duozitidian-show.vue */ 1131));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var vipCard = function vipCard() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/vip-card */ "pages/order/order-components/vip-card").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/vip-card.vue */ 1047));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
/*
	多门店版本 结算订单的三种状态
		只有自营门店
		自营门店 和 入驻门店 混合
		只有入驻门店
*/

var oneZiying = 'oneZiying',
  ziyingruzhu = 'ziyingruzhu',
  ruzhu = 'ruzhu';
var _default = {
  components: {
    userAddress: userAddress,
    dotZitiModal: dotZitiModal,
    discountCouponModal: discountCouponModal,
    goodsCouponModal: goodsCouponModal,
    goodsInvalidModal: goodsInvalidModal,
    addressInvalidModal: addressInvalidModal,
    dispatchType: dispatchType,
    sellerzitidianShow: sellerzitidianShow,
    duozitidianShow: duozitidianShow,
    vipCard: vipCard
  },
  data: function data() {
    return {
      // ↓↓↓ 通用数据 ========================================================================================
      isShowLoading: true,
      // isShowLoading: false,

      // 设备的坐标数据
      /*
      long: 116.634539,
      lati: 39.908149,
      */
      long: 0,
      lati: 0,
      // 地址相关
      addressIsSet: false,
      // 地址信息是否为空
      addressId: null,
      // id
      addressUserName: '',
      // 用户名
      addressUserTel: '',
      // 手机号
      addressTagName: '',
      // 标签
      addressText: '',
      // 地址文字
      addressCoordinate: '',
      // 经纬度

      // ↓↓↓ 自营商家自提点信息
      sellerImage: '',
      // 门店图片
      sellerName: '',
      // 门店名称
      sellerTel: '',
      // 联系电话
      sellerOpenTime: '',
      // 营业时间
      sellerAddress: '',
      // 门店地址

      duozitidianActive: 0,
      // 多自提点下标
      duozitidianList: [],
      // 多自提点列表
      dotZitiModalFlag: false,
      // 多自提点列表模态框

      beizhuInputOpacity: false,
      // 备注的input框透明度
      beizhuText: '',
      // 备注文字

      usernameText: '',
      // 自提收货人名字
      usertelText: '',
      // 自提收货人手机号

      commitBtnLoadingState: false,
      // 提交订单按钮状态

      yve: 0,
      // 余额

      isShowDiscountCouponModalFlag: false,
      // 优惠券模态框显示隐藏状态
      discountCouponList: [],
      // 优惠券列表
      discountCouponIndex: -1,
      // 当前优惠券索引

      isShowGoodsCouponModalFlag: false,
      // 商品券模态框显示隐藏状态
      goodsCouponList: [],
      // 商品券列表
      goodsCouponIndex: -1,
      // 当前商品券索引

      isUseYve: false,
      // 是否使用余额

      // ↓↓↓ 单门店数据 ========================================================================================

      dispatchTypeList: [],
      // 配送方式列表

      dispatchTypeActive: 0,
      // 配送方式下标

      isRange: false,
      // 是否在配送范围内
      dispFeeHide: _submitOrderEnum.dispFeeHide,
      dispFeeShow0: _submitOrderEnum.dispFeeShow0,
      dispFeeShow: _submitOrderEnum.dispFeeShow,
      dispFeeType: '',
      // 配送费展示类型
      dispFeeTip: '',
      // 提示文字
      dispFeePriceText: '',
      // 配送费内容
      dispFeePriceNum: 0,
      // 实际配送费钱数

      dspcnow: _submitOrderEnum.dspcnow,
      dspcyvyue: _submitOrderEnum.dspcyvyue,
      ziyingYvyueType: '',
      // 自营预约类型
      ziyingYvyueText: '',
      // 自营预约立即送出字符串
      ziyingYvyueRangeDataArr: [],
      // 自营预约数据

      ziyingYvyueDayKey: 0,
      // 自营预约天索引
      ziyingYvyueTimeKey: 0,
      // 自营预约小时索引
      ziyingYvyueDayBeifenKey: 0,
      // 自营预约天备份索引
      ziyingYvyueTimeBeifenKey: 0,
      // 自营预约小时备份索引

      goodsList: [],
      // 自营商品列表
      loseGoodsList: [],
      // 自营失效商品列表

      invalidGoodsListIsShow: false,
      // 是否显示失效商品列表

      ziyingGoodsAllPrice: 0,
      // 自营商品金额
      ziyingGoodsDiscountsPrice: 0,
      // 自营商品优惠

      // 实付金额 = 商品总价 - 商品优惠 - 配送费 (不包含优惠券 商品券 配送费)
      shifu: 0,
      // 总计优惠金额(不包含优惠券和商品券)
      allDiscountsPrice: 0,
      // 实际的配送费

      // 实付商品价格 (商品价格 - 商品优惠) [是商品满折 满减后的钱数 不包括优惠券商品券优惠的金额 切换配送方式时传到后台去判断是否免配送费]
      shifuGoodsPrice: 0,
      // ↓↓↓ 多门店数据 ========================================================================================
      moreStoreData: {
        storeType: '',
        // 门店类型 全部门店all;  单个门店是门店id
        moreStoreList: [],
        // 所有门店数据
        isHasZiying: false,
        // moreStoreList是否有自营门店
        ziyingStoreIndex: false // moreStoreList的自营门店索引
      },

      moreStoreDispatchTypePickerRange: [],
      // 多店自营商家的配送方式
      moreStoreDispatchTypeBeifenActive: 0,
      // 多店自营商家的配送方式备份
      moreStoreDispatchTypeActive: 0,
      // 多店自营商家的配送方式索引

      isShowGoodsInvalidModalFlag: !true,
      // 商品失效商品提示框
      goodsInvalidInfo: {
        // 失效商品数据
        goodsList: [],
        title: ''
      },
      isShowAddressInvalidModalFlag: !true,
      // 地址失效商品提示框

      // ↓↓↓ 支付相关 ========================================================================================
      paymentTypeEnum: _const.paymentTypeEnum,
      payment_zfb: _const.payment_zfb,
      payment_wx: _const.payment_wx,
      currentPaymentType: '' // 当前选中的支付方式

      /*
      // ↓↓↓ 未在使用的data ========================================================================================
      // ↓↓↓ 如遇缺货相关
      quehuoPickerIndex: 0, // 当前选中索引
      quehuoPickerRange: [
      	{ id: 0, name: '请选择缺货处理方式' },
      	{ id: 19, name: '直接取消订单' },
      	{ id: 20, name: '取消缺货商品' }
      ], // 可选项
      		// 开通会员卡相关
      vipOptionCardIsSelect: !false,
      vipOptionCardIsOpen: true,
      vipOptionCardId: 13,
      vipOptionCardName: '超级会员卡',
      vipOptionCardTagBgColor: '#181313',
      vipOptionCardTagIconImg:
      	'https://wanxiangyouxian.oss-cn-beijing.aliyuncs.com//uploads/images/20210507/13619a5f379e2af12a3057dd069508ab.png',
      vipOptionCardTagText: '超级会员卡',
      vipOptionCardTagTextColor: '#3f97fc',
      vipOptionCardTipBgColor: '#ff3e20',
      vipOptionCardTipText: '勾选享优惠',
      vipOptionCardTipTextColor: '#f9f4f4',
      vipOptionCardTime: '1年',
      vipOptionCardPrice: 99
      */
    };
  },
  onShow: function onShow() {
    var that = this;
    if (that.gongyingshang) {
      that.moreStoreShowFn();
    } else {
      that.oneStoreShowFn();
    }
  },
  onLoad: function onLoad(options) {
    var that = this;
    console.log('submit-order load options', options);
    that.loadFn();
    if (that.gongyingshang) {
      that.moreStoreLoadFn(options);
    } else {
      that.oneStoreLoadFn();
    }
  },
  methods: {
    /*
    	@description 根据收货地址id验证是否在配送范围内
    	@param addressId <Number> 地址id
    	@return Promise
    */
    addressIsRange: function addressIsRange(addressId) {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn) {
          var result;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return that.$request({
                    method: 'post',
                    url: '/api/Orderbranch/orderDmio',
                    data: {
                      id: addressId
                    }
                  });
                case 2:
                  result = _context.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      resFn({
                        type: 'success'
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
    // 页面load
    loadFn: function loadFn() {
      var that = this;
      var _assertObject = (0, _tools.assertObject)(uni.getStorageSync('cartAddress')),
        latitude = _assertObject.latitude,
        longitude = _assertObject.longitude;
      that.long = longitude;
      that.lati = latitude;
      that.setDefaultPaymentTypeFn();
    },
    // 单门店版本页面show
    oneStoreShowFn: function oneStoreShowFn() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var that, temSelectAd, addressIsRangeResult;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this; // 获取选择的地址
                temSelectAd = (0, _tools.assertObject)(uni.getStorageSync('temSelectAd'));
                if (!Object.keys(temSelectAd).length) {
                  _context2.next = 16;
                  break;
                }
                that.addressIsSet = true;
                that.addressId = temSelectAd.id;
                that.addressUserName = temSelectAd.name;
                that.addressUserTel = temSelectAd.mobile;
                that.addressTagName = temSelectAd.tag;
                that.addressText = temSelectAd.address;
                that.addressCoordinate = temSelectAd.coordinate;
                if (!(_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchshangjia)) {
                  _context2.next = 15;
                  break;
                }
                _context2.next = 13;
                return that.addressIsRange(that.addressId);
              case 13:
                addressIsRangeResult = _context2.sent;
                if (addressIsRangeResult.type == 'success') {
                  that.isRange = true;
                } else {
                  that.isRange = false;
                  that.hideAllFn();
                  uni.showModal({
                    showCancel: false,
                    title: addressIsRangeResult.msg,
                    success: function success(e) {}
                  });
                }
              case 15:
                uni.setStorageSync('temSelectAd', '');
              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 多门店版本页面show
    moreStoreShowFn: function moreStoreShowFn() {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var that, temSelectAd, isCheckRange, _check, check, addressIsRangeResult;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this2; // 获取选择的地址
                temSelectAd = (0, _tools.assertObject)(uni.getStorageSync('temSelectAd'));
                if (!Object.keys(temSelectAd).length) {
                  _context3.next = 17;
                  break;
                }
                that.addressIsSet = true;
                that.addressId = temSelectAd.id;
                that.addressUserName = temSelectAd.name;
                that.addressUserTel = temSelectAd.mobile;
                that.addressTagName = temSelectAd.tag;
                that.addressText = temSelectAd.address;
                that.addressCoordinate = temSelectAd.coordinate;

                /*
                	需要判断条件
                		自营店 和 入驻店混合订单
                		纯入驻店订单
                	不用需要判断条件
                		只有自营店一个时 并且 配送方式是 (到店自提 || 到点自提 || 快递配送)
                */

                if (that.moreStoreOrderState == ruzhu || that.moreStoreOrderState == ziyingruzhu) {
                  isCheckRange = true;
                } else {
                  check = (_check = {}, (0, _defineProperty2.default)(_check, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_check, _const.dispatchmendian, false), (0, _defineProperty2.default)(_check, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_check, _const.dispatchkuaidi, false), _check);
                  if (check[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
                    isCheckRange = true;
                  } else {
                    isCheckRange = false;
                  }
                }
                if (!isCheckRange) {
                  _context3.next = 16;
                  break;
                }
                _context3.next = 14;
                return that.addressIsRange(that.addressId);
              case 14:
                addressIsRangeResult = _context3.sent;
                if (addressIsRangeResult.type == 'success') {
                  that.moreStoreData.moreStoreList.forEach(function (i) {
                    i.isRange = true;
                  });
                } else {
                  that.moreStoreData.moreStoreList.forEach(function (i) {
                    i.isRange = false;
                  });
                  that.hideAllFn();
                  uni.showModal({
                    showCancel: false,
                    title: addressIsRangeResult.msg,
                    success: function success(e) {}
                  });
                }
              case 16:
                uni.setStorageSync('temSelectAd', '');
              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 单店 页面load运行
    oneStoreLoadFn: function oneStoreLoadFn() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
        var that, submitOrderPageDataResult, _handleAddrFn, _submitOrderPageDataR, dispatchTypeList, addressTypeText, userAdrsObject, sellerAdrsObject, zitiAdrsList, goodsList, loseGoodsList, yve, yvyueType, yvyueData, ziyingGoodsAllPrice, ziyingGoodsDiscountsPrice, shifu, allDiscountsPrice, shifuGoodsPrice, dispFeeType, dispFeeTip, dispFeePriceText, dispFeePriceNum, discountCouponList, discountCouponIndex, goodsCouponList, isRange, handleAddrFn;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                that = _this3;
                _context4.next = 3;
                return (0, _getOneStorePageData.getOneStorePageData)(that, that.long, that.lati);
              case 3:
                submitOrderPageDataResult = _context4.sent;
                console.log('load submitOrderPageDataResult', submitOrderPageDataResult);
                if (submitOrderPageDataResult.type == 'success') {
                  _submitOrderPageDataR = submitOrderPageDataResult.result, dispatchTypeList = _submitOrderPageDataR.dispatchTypeList, addressTypeText = _submitOrderPageDataR.addressTypeText, userAdrsObject = _submitOrderPageDataR.userAdrs, sellerAdrsObject = _submitOrderPageDataR.sellerAdrs, zitiAdrsList = _submitOrderPageDataR.zitiAdrs, goodsList = _submitOrderPageDataR.goodsList, loseGoodsList = _submitOrderPageDataR.loseGoodsList, yve = _submitOrderPageDataR.yve, yvyueType = _submitOrderPageDataR.yvyueType, yvyueData = _submitOrderPageDataR.yvyueData, ziyingGoodsAllPrice = _submitOrderPageDataR.ziyingGoodsAllPrice, ziyingGoodsDiscountsPrice = _submitOrderPageDataR.ziyingGoodsDiscountsPrice, shifu = _submitOrderPageDataR.shifu, allDiscountsPrice = _submitOrderPageDataR.allDiscountsPrice, shifuGoodsPrice = _submitOrderPageDataR.shifuGoodsPrice, dispFeeType = _submitOrderPageDataR.dispFeeType, dispFeeTip = _submitOrderPageDataR.dispFeeTip, dispFeePriceText = _submitOrderPageDataR.dispFeePriceText, dispFeePriceNum = _submitOrderPageDataR.dispFeePriceNum, discountCouponList = _submitOrderPageDataR.discountCouponList, discountCouponIndex = _submitOrderPageDataR.discountCouponIndex, goodsCouponList = _submitOrderPageDataR.goodsCouponList, isRange = _submitOrderPageDataR.isRange;
                  that.dispatchTypeList = dispatchTypeList;
                  handleAddrFn = (_handleAddrFn = {}, (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.userAdrs, function () {
                    that.addressIsSet = userAdrsObject.addressIsSet;
                    if (userAdrsObject.addressIsSet) {
                      that.addressId = userAdrsObject.addressId;
                      that.addressUserName = userAdrsObject.addressUserName;
                      that.addressUserTel = userAdrsObject.addressUserTel;
                      that.addressTagName = userAdrsObject.addressTagName;
                      that.addressText = userAdrsObject.addressText;
                      that.addressCoordinate = userAdrsObject.addressCoordinate;
                    }
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.sellerAdrs, function () {
                    that.sellerImage = sellerAdrsObject.sellerImage;
                    that.sellerName = sellerAdrsObject.sellerName;
                    that.sellerTel = sellerAdrsObject.sellerTel;
                    that.sellerOpenTime = sellerAdrsObject.sellerOpenTime;
                    that.sellerAddress = sellerAdrsObject.sellerAddress;
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.zitiAdrs, function () {
                    that.duozitidianList = zitiAdrsList;
                    if (zitiAdrsList.every(function (i) {
                      return !i.isRange;
                    })) {
                      that.duozitidianActive = 0;
                    } else {
                      that.duozitidianActive = zitiAdrsList.findIndex(function (i) {
                        return i.isRange;
                      });
                    }
                  }), _handleAddrFn);
                  handleAddrFn[addressTypeText]();
                  that.goodsList = goodsList;
                  that.loseGoodsList = loseGoodsList;
                  that.yve = yve;
                  that.ziyingYvyueType = yvyueType;
                  if (yvyueType == _submitOrderEnum.dspcnow) {
                    that.ziyingYvyueText = yvyueData;
                  } else {
                    that.ziyingYvyueRangeDataArr = yvyueData;
                  }
                  that.ziyingGoodsAllPrice = ziyingGoodsAllPrice;
                  that.ziyingGoodsDiscountsPrice = ziyingGoodsDiscountsPrice;
                  that.shifu = shifu;
                  that.allDiscountsPrice = allDiscountsPrice;
                  that.dispFeeType = dispFeeType;
                  that.dispFeeTip = dispFeeTip;
                  that.dispFeePriceText = dispFeePriceText;
                  that.dispFeePriceNum = dispFeePriceNum;
                  that.discountCouponList = discountCouponList;
                  that.discountCouponIndex = discountCouponIndex;
                  that.goodsCouponList = goodsCouponList;
                  that.shifuGoodsPrice = shifuGoodsPrice;
                  that.isRange = isRange;
                  if (!isRange) {
                    uni.showModal({
                      showCancel: false,
                      title: submitOrderPageDataResult.msg
                    });
                  }
                } else {
                  uni.showModal({
                    showCancel: false,
                    title: submitOrderPageDataResult.msg,
                    success: function success(e) {
                      that.toBackFn();
                    }
                  });
                }
                that.isShowLoading = false;
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }))();
    },
    // 设置配送方式
    setDispatchTypeFn: function setDispatchTypeFn(index) {
      var _this4 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var that, toggleDispatchTypeResult, _handleAddrFn2, _toggleDispatchTypeRe, addressTypeText, userAdrsObject, sellerAdrsObject, zitiAdrsList, yvyueType, yvyueData, dispFeeType, dispFeeTip, dispFeePriceText, dispFeePriceNum, isRange, handleAddrFn;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                that = _this4;
                that.dispatchTypeActive = index;
                that.ziyingYvyueDayKey = 0; // 自营预约天索引
                that.ziyingYvyueTimeKey = 0; // 自营预约小时索引

                that.hideAllFn();
                uni.showLoading();
                _context5.next = 8;
                return (0, _getOneStoreToggleDispatchTypeDataFn.getOneStoreToggleDispatchTypeDataFn)(that, that.calcOneStoreDispatchTypeId, that.long, that.lati, that.shifuGoodsPrice);
              case 8:
                toggleDispatchTypeResult = _context5.sent;
                console.log('切换配送方式返回数据 getOneStoreToggleDispatchTypeDataFn()', toggleDispatchTypeResult);
                if (toggleDispatchTypeResult.type == 'success') {
                  _toggleDispatchTypeRe = toggleDispatchTypeResult.result, addressTypeText = _toggleDispatchTypeRe.addressTypeText, userAdrsObject = _toggleDispatchTypeRe.userAdrs, sellerAdrsObject = _toggleDispatchTypeRe.sellerAdrs, zitiAdrsList = _toggleDispatchTypeRe.zitiAdrs, yvyueType = _toggleDispatchTypeRe.yvyueType, yvyueData = _toggleDispatchTypeRe.yvyueData, dispFeeType = _toggleDispatchTypeRe.dispFeeType, dispFeeTip = _toggleDispatchTypeRe.dispFeeTip, dispFeePriceText = _toggleDispatchTypeRe.dispFeePriceText, dispFeePriceNum = _toggleDispatchTypeRe.dispFeePriceNum, isRange = _toggleDispatchTypeRe.isRange;
                  handleAddrFn = (_handleAddrFn2 = {}, (0, _defineProperty2.default)(_handleAddrFn2, _submitOrderEnum.userAdrs, function () {
                    if (!that.addressIsSet) {
                      that.isRange = isRange;
                      that.addressIsSet = userAdrsObject.addressIsSet;
                      if (userAdrsObject.addressIsSet) {
                        that.addressId = userAdrsObject.addressId;
                        that.addressUserName = userAdrsObject.addressUserName;
                        that.addressUserTel = userAdrsObject.addressUserTel;
                        that.addressTagName = userAdrsObject.addressTagName;
                        that.addressText = userAdrsObject.addressText;
                        that.addressCoordinate = userAdrsObject.addressCoordinate;
                      }
                    }
                  }), (0, _defineProperty2.default)(_handleAddrFn2, _submitOrderEnum.sellerAdrs, function () {
                    that.sellerImage = sellerAdrsObject.sellerImage;
                    that.sellerName = sellerAdrsObject.sellerName;
                    that.sellerTel = sellerAdrsObject.sellerTel;
                    that.sellerOpenTime = sellerAdrsObject.sellerOpenTime;
                    that.sellerAddress = sellerAdrsObject.sellerAddress;
                  }), (0, _defineProperty2.default)(_handleAddrFn2, _submitOrderEnum.zitiAdrs, function () {
                    that.duozitidianList = zitiAdrsList;
                    if (zitiAdrsList.every(function (i) {
                      return !i.isRange;
                    })) {
                      that.duozitidianActive = 0;
                    } else {
                      that.duozitidianActive = zitiAdrsList.findIndex(function (i) {
                        return i.isRange;
                      });
                    }
                  }), _handleAddrFn2);
                  handleAddrFn[addressTypeText]();
                  that.ziyingYvyueType = yvyueType;
                  if (yvyueType == _submitOrderEnum.dspcnow) {
                    that.ziyingYvyueText = yvyueData;
                  } else {
                    that.ziyingYvyueRangeDataArr = yvyueData;
                  }
                  that.dispFeeType = dispFeeType;
                  that.dispFeeTip = dispFeeTip;
                  that.dispFeePriceText = dispFeePriceText;
                  that.dispFeePriceNum = dispFeePriceNum;
                  that.hideAllFn();
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: toggleDispatchTypeResult.msg
                  });
                }
              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 点击自营商家选配送方式picker组件
    moreStoreDispatchTypeClickFn: function moreStoreDispatchTypeClickFn() {
      this.moreStoreDispatchTypeBeifenActive = this.moreStoreDispatchTypeActive;
    },
    // 自营商家选配送方式取消时选默认
    moreStoreDispatchTypeCancelFn: function moreStoreDispatchTypeCancelFn() {
      this.moreStoreDispatchTypeActive = this.moreStoreDispatchTypeBeifenActive;
    },
    // 多门店的自营商家切换配送方式
    moreStoreDispatchTypeChangeFn: function moreStoreDispatchTypeChangeFn(e) {
      var _this5 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
        var that, value, storeIsZiyingIndex, moreStoreZiying, moreStoreToggleDispatchTypeResult, _handleAddrFn3, _moreStoreToggleDispa, addressTypeText, userAdrsObject, sellerAdrsObject, zitiAdrsList, yvyueType, yvyueData, dispFeeType, dispFeeTip, dispFeePriceText, dispFeePriceNum, isRange, handleAddrFn, ziyingStore;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                that = _this5;
                value = e.detail.value;
                that.moreStoreDispatchTypeActive = value;
                storeIsZiyingIndex = that.moreStoreData.moreStoreList.findIndex(function (i) {
                  return i.storeIsZiying;
                });
                moreStoreZiying = that.moreStoreData.moreStoreList[storeIsZiyingIndex];
                _context6.next = 7;
                return (0, _getMoreStoreToggleDispatchTypeDataFn.getMoreStoreToggleDispatchTypeDataFn)(that, that.calcMoreStoreDispatchTypeId, that.long, that.lati, moreStoreZiying.shifuGoodsPrice);
              case 7:
                moreStoreToggleDispatchTypeResult = _context6.sent;
                console.log('多门店模式的 自营店切换配送方式返回数据 moreStoreDispatchTypeChangeFn()', moreStoreToggleDispatchTypeResult);
                if (moreStoreToggleDispatchTypeResult.type == 'success') {
                  _moreStoreToggleDispa = moreStoreToggleDispatchTypeResult.result, addressTypeText = _moreStoreToggleDispa.addressTypeText, userAdrsObject = _moreStoreToggleDispa.userAdrs, sellerAdrsObject = _moreStoreToggleDispa.sellerAdrs, zitiAdrsList = _moreStoreToggleDispa.zitiAdrs, yvyueType = _moreStoreToggleDispa.yvyueType, yvyueData = _moreStoreToggleDispa.yvyueData, dispFeeType = _moreStoreToggleDispa.dispFeeType, dispFeeTip = _moreStoreToggleDispa.dispFeeTip, dispFeePriceText = _moreStoreToggleDispa.dispFeePriceText, dispFeePriceNum = _moreStoreToggleDispa.dispFeePriceNum, isRange = _moreStoreToggleDispa.isRange;
                  that.$set(that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex], 'isRange', isRange);
                  if (!isRange) {
                    uni.showModal({
                      showCancel: false,
                      title: moreStoreToggleDispatchTypeResult.msg,
                      success: function success(e) {
                        //确认后的回调
                      }
                    });
                  }
                  handleAddrFn = (_handleAddrFn3 = {}, (0, _defineProperty2.default)(_handleAddrFn3, _submitOrderEnum.userAdrs, function () {
                    if (!that.addressIsSet) {
                      that.addressIsSet = userAdrsObject.addressIsSet;
                      if (userAdrsObject.addressIsSet) {
                        that.addressId = userAdrsObject.addressId;
                        that.addressUserName = userAdrsObject.addressUserName;
                        that.addressUserTel = userAdrsObject.addressUserTel;
                        that.addressTagName = userAdrsObject.addressTagName;
                        that.addressText = userAdrsObject.addressText;
                        that.addressCoordinate = userAdrsObject.addressCoordinate;
                      }
                    }
                  }), (0, _defineProperty2.default)(_handleAddrFn3, _submitOrderEnum.sellerAdrs, function () {
                    that.$set(moreStoreZiying.sellerAdrs, 'sellerImage', sellerAdrsObject.sellerImage);
                    that.$set(moreStoreZiying.sellerAdrs, 'sellerName', sellerAdrsObject.sellerName);
                    that.$set(moreStoreZiying.sellerAdrs, 'sellerTel', sellerAdrsObject.sellerTel);
                    that.$set(moreStoreZiying.sellerAdrs, 'sellerOpenTime', sellerAdrsObject.sellerOpenTime);
                    that.$set(moreStoreZiying.sellerAdrs, 'sellerAddress', sellerAdrsObject.sellerAddress);
                  }), (0, _defineProperty2.default)(_handleAddrFn3, _submitOrderEnum.zitiAdrs, function () {
                    moreStoreZiying.zitiAdrs = zitiAdrsList;
                    that.duozitidianList = zitiAdrsList;
                    if (zitiAdrsList.every(function (i) {
                      return !i.isRange;
                    })) {
                      that.duozitidianActive = 0;
                    } else {
                      that.duozitidianActive = zitiAdrsList.findIndex(function (i) {
                        return i.isRange;
                      });
                    }
                  }), _handleAddrFn3);
                  handleAddrFn[addressTypeText]();
                  that.$set(moreStoreZiying, 'yvyueType', yvyueType);
                  if (yvyueType == _submitOrderEnum.dspcnow) {
                    that.$set(moreStoreZiying, 'yvyueText', yvyueData);
                  } else {
                    that.$set(moreStoreZiying, 'yvyueData', yvyueData);
                    that.$set(moreStoreZiying, 'yvyueRangeDataArr', yvyueData);
                  }
                  /*
                  console.log(moreStoreZiying.yvyueType);
                  console.log(moreStoreZiying.yvyueText);
                  console.log(moreStoreZiying.yvyueData);
                  */
                  ziyingStore = that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex];
                  that.$set(ziyingStore, 'dispFeeType', dispFeeType);
                  that.$set(ziyingStore, 'dispFeeTip', dispFeeTip);
                  that.$set(ziyingStore, 'dispFeePriceText', dispFeePriceText);
                  that.$set(ziyingStore, 'dispFeePriceNum', dispFeePriceNum);
                  that.$set(ziyingStore, 'yvyueDayKey', 0);
                  that.$set(ziyingStore, 'yvyueTimeKey', 0);
                  that.$set(ziyingStore, 'isRange', isRange);
                  that.hideAllFn();
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: moreStoreToggleDispatchTypeResult.msg
                  });
                }
              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }))();
    },
    // focus blur 事件修改备注透明度
    setBeizhuInputOpacityFn: function setBeizhuInputOpacityFn(bool) {
      this.beizhuInputOpacity = bool;
    },
    // 单门店 切换失效商品列表是否展示状态
    toggleOneStoreInvalidGoodsListFn: function toggleOneStoreInvalidGoodsListFn(bool) {
      this.invalidGoodsListIsShow = !this.invalidGoodsListIsShow;
    },
    // 设置多自提点列表的显示隐藏状态
    setDotZitiModalFlagFn: function setDotZitiModalFlagFn(bool) {
      this.dotZitiModalFlag = bool;
    },
    // 选择列表自提点的
    selectDotZitiFn: function selectDotZitiFn(index) {
      var that = this;
      that.setDotZitiModalFlagFn(false);
      that.duozitidianActive = index;
    },
    // 选优惠券栏点击
    discountCouponLineClickFn: function discountCouponLineClickFn() {
      var that = this;
      if (that.useDiscountCouponNum <= 0 && that.discountCouponList.length <= 0) {
        return false;
      }
      that.setDiscountCouponModalFlagFn(true);
    },
    // 设置优惠券模态框显示隐藏状态
    setDiscountCouponModalFlagFn: function setDiscountCouponModalFlagFn(bool) {
      this.isShowDiscountCouponModalFlag = bool;
    },
    // 设置优惠券
    discountCouponItemClickFn: function discountCouponItemClickFn(arg) {
      this.discountCouponIndex = arg;
    },
    // 选商品券栏点击
    goodsCouponLineClickFn: function goodsCouponLineClickFn() {
      var that = this;
      if (that.goodsCouponList.length <= 0) {
        return false;
      }
      that.setGoodsCouponModalFlagFn(true);
    },
    // 设置商品券模态框显示隐藏状态
    setGoodsCouponModalFlagFn: function setGoodsCouponModalFlagFn(bool) {
      this.isShowGoodsCouponModalFlag = bool;
    },
    // 设置商品券
    goodsCouponItemClickFn: function goodsCouponItemClickFn(arg) {
      this.goodsCouponIndex = arg;
    },
    // 自营选择器点击
    ziyingPickerClickFn: function ziyingPickerClickFn() {
      var that = this;
      console.log('自营选择器点击');
      that.ziyingYvyueDayBeifenKey = that.ziyingYvyueDayKey;
      that.ziyingYvyueTimeBeifenKey = that.ziyingYvyueTimeKey;
      that.ziyingYvyueDayKey = 0;
      that.ziyingYvyueTimeKey = 0;
    },
    // 自营选择配送时间取消
    ziyingPickerCancelFn: function ziyingPickerCancelFn() {
      var that = this;
      console.log('自营选择配送时间取消');
      that.ziyingYvyueDayKey = that.ziyingYvyueDayBeifenKey;
      that.ziyingYvyueTimeKey = that.ziyingYvyueTimeBeifenKey;
    },
    // 自营选择配送时间单列改变
    ziyingPickerColumnChangeFn: function ziyingPickerColumnChangeFn(e) {
      var that = this;
      console.log('自营选择配送时间单列改变', e);
      var pickerColumnEnum = {
        0: 'ziyingYvyueDayKey',
        1: 'ziyingYvyueTimeKey'
      };
      var _e$detail = e.detail,
        column = _e$detail.column,
        value = _e$detail.value;
      var key = pickerColumnEnum[column];
      that[key] = value;
      if (key == 'ziyingYvyueDayKey') {
        that.ziyingYvyueTimeKey = 0;
      }
    },
    // 自营选择配送时间确认
    ziyingPickerChangeFn: function ziyingPickerChangeFn(e) {
      var that = this;
      console.log('自营选择配送时间确认', e);
      var _e$detail$value = (0, _slicedToArray2.default)(e.detail.value, 2),
        column1 = _e$detail$value[0],
        column2 = _e$detail$value[1];
      that.$set(that, 'ziyingYvyueDayKey', column1);
      that.$set(that, 'ziyingYvyueTimeKey', column2);
    },
    /*
    	@description 单门店版本 提交前校验页面数据
    	@return <Boolean>
    		true  校验通过
    		false 校验失败
    */
    oneStoreValidateFn: function oneStoreValidateFn() {
      var that = this;
      /*
      	商家配送
      		必须有收货地址 && 当前自提点在配送范围内
      	到店
      		必须有自提人名字 手机号
      	快递配送
      		必须有收货地址
      	到点配送
      		必须有自提人名字 手机号 && 当前自提点在配送范围内
      */
      // 商家配送
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchshangjia) {
        if (!that.addressIsSet) {
          uni.showToast({
            icon: 'none',
            title: '请选收货地址'
          });
          return false;
        }
        if (!that.isRange) {
          uni.showToast({
            icon: 'none',
            title: '不在配送范围内'
          });
          return false;
        }
      }

      // 到店
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchmendian) {
        var usernameValidate = _tools.validateFn.name('收货人名字', that.usernameText);
        if (!usernameValidate.validate) {
          uni.showToast({
            icon: 'none',
            title: usernameValidate.msg
          });
          return false;
        }
        var usertelValidate = _tools.validateFn.tel(that.usertelText);
        if (!usertelValidate.validate) {
          uni.showToast({
            icon: 'none',
            title: usertelValidate.msg
          });
          return false;
        }
      }

      // 快递
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchkuaidi) {
        if (!that.addressIsSet) {
          uni.showToast({
            icon: 'none',
            title: '请选收货地址'
          });
          return false;
        }
      }

      // 到点
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchdaodian) {
        if (!that.currentDuozitidianInfo.isRange) {
          uni.showToast({
            icon: 'none',
            title: '不在配送范围内'
          });
          return false;
        }
        var _usernameValidate = _tools.validateFn.name('收货人名字', that.usernameText);
        if (!_usernameValidate.validate) {
          uni.showToast({
            icon: 'none',
            title: _usernameValidate.msg
          });
          return false;
        }
        var _usertelValidate = _tools.validateFn.tel(that.usertelText);
        if (!_usertelValidate.validate) {
          uni.showToast({
            icon: 'none',
            title: _usertelValidate.msg
          });
          return false;
        }
      }
      return true;
    },
    // 提交订单单门店所需要的数据
    oneStoreOrderDataFn: function oneStoreOrderDataFn() {
      var _isSendYvyueTime, _isSendUserNameTel;
      var that = this;
      // 单门店版本
      var oneStoreParams = {
        dispatchTypeId: that.calcOneStoreDispatchTypeId,
        beizhuText: that.beizhuText,
        dmio: 0
      };

      // 处理 dmio
      // 商家配送
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchshangjia) {
        oneStoreParams.dmio = that.addressId;
      }
      // 快递
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchkuaidi) {
        oneStoreParams.dmio = that.addressId;
      }

      // 到点
      if (_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == _const.dispatchdaodian) {
        oneStoreParams.dmio = that.currentDuozitidianInfo.id;
      }

      // 根据当前的配送方式判断是否传预约配送时间
      var isSendYvyueTime = (_isSendYvyueTime = {}, (0, _defineProperty2.default)(_isSendYvyueTime, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_isSendYvyueTime, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isSendYvyueTime, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isSendYvyueTime, _const.dispatchkuaidi, false), _isSendYvyueTime);
      // 预约配送时间
      if (isSendYvyueTime[_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId]]) {
        if (that.ziyingYvyueType == _submitOrderEnum.dspcyvyue) {
          oneStoreParams.yvyueTimeId = that.ziyingYvyueRangeDataArr[that.ziyingYvyueDayKey].timeList[that.ziyingYvyueTimeKey].timeId;
        } else {
          oneStoreParams.yvyueTimeId = 0;
        }
      } else {
        oneStoreParams.yvyueTimeId = 0;
      }
      // 使用的优惠券商品券
      if (that.discountCouponIndex >= 0) {
        oneStoreParams.discountCouponId = that.discountCouponList[that.discountCouponIndex].discountCouponUserId;
      } else {
        oneStoreParams.discountCouponId = 0;
      }
      if (that.goodsCouponIndex >= 0) {
        oneStoreParams.goodsCouponId = that.goodsCouponList[that.goodsCouponIndex].goodsCouponId;
      } else {
        oneStoreParams.goodsCouponId = 0;
      }

      // 自提人名手机号信息
      // 根据当前的配送方式判断是否传自提人信息
      var isSendUserNameTel = (_isSendUserNameTel = {}, (0, _defineProperty2.default)(_isSendUserNameTel, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isSendUserNameTel, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isSendUserNameTel, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isSendUserNameTel, _const.dispatchkuaidi, false), _isSendUserNameTel);
      if (isSendUserNameTel[_const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId]]) {
        oneStoreParams.usernameText = that.usernameText;
        oneStoreParams.usertelText = that.usertelText;
      } else {
        oneStoreParams.usernameText = '';
        oneStoreParams.usertelText = '';
      }
      return {
        remark: oneStoreParams.beizhuText,
        coupon_id: oneStoreParams.discountCouponId,
        dm: oneStoreParams.dispatchTypeId,
        dmio: oneStoreParams.dmio,
        gc: oneStoreParams.goodsCouponId,
        username: oneStoreParams.usernameText,
        phone: oneStoreParams.usertelText,
        pt: oneStoreParams.yvyueTimeId
      };
    },
    // 单门店提交订单按钮
    oneStoreCommitFn: function oneStoreCommitFn() {
      var _this6 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var that, oneStoreValidateFlag, data, orderResult;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                that = _this6;
                oneStoreValidateFlag = that.oneStoreValidateFn();
                if (oneStoreValidateFlag) {
                  _context7.next = 5;
                  break;
                }
                that.commitBtnLoadingState = false;
                return _context7.abrupt("return", false);
              case 5:
                data = that.oneStoreOrderDataFn(); // data.pt = "2021-10-18 10:00~2021-10-18 10:30"
                console.log('单门店版本提交订单data', data);
                console.log('单门店版本提交订单JSON.stringify(data)', JSON.stringify(data));
                _context7.next = 10;
                return (0, _order.createOrderFn)(that, _submitOrderEnum.storeType.oneModel, data);
              case 10:
                orderResult = _context7.sent;
                if (orderResult.type == 'success') {
                  if (orderResult.code == 200) {
                    that.toPayFn(_submitOrderEnum.storeType.oneModel, orderResult.result);
                  } else if (orderResult.code == 353209) {
                    // 有失效商品
                    that.goodsInvalidInfo.title = orderResult.msg;
                    that.goodsInvalidInfo.goodsList = orderResult.result;
                    that.isShowGoodsInvalidModalFlag = true;
                  } else if (orderResult.code == 30302) {
                    // 预约时间过时
                    uni.showModal({
                      showCancel: false,
                      title: orderResult.msg,
                      success: function success(e) {
                        //确认后的回调
                        that.toBackFn();
                      }
                    });
                  }
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: orderResult.msg
                  });
                }
                that.commitBtnLoadingState = false;
              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    },
    /*
    	@description 多门店版本 提交前校验页面数据
    	@return <Boolean>
    		true  校验通过
    		false 校验失败
    */
    moreStoreValidateFn: function moreStoreValidateFn() {
      var that = this;
      /*
      	有自营店
      			只有自营店
      				配送方式
      					快递配送
      					商家配送
      						判断有无设置收货地址
      							有收货地址
      								判断是否在配送范围内
      									在范围内 继续执行
      									不在范围内  提示并return
      							无收货地址
      								提示并返回
      
      			有自营店 有入驻门店
      				判断有无设置收货地址
      					有收货地址
      						判断是否在配送范围内
      							在范围内 继续执行
      							不在范围内  提示并return
      					无收货地址
      						提示并返回
      
      		到店
      		到点
      			判断有无设置提货人信息
      				有提货人 继续执行
      				无提货人 提示并返回
      			无自营店
      		判断有无设置收货地址
      			有收货地址
      				判断是否在配送范围内
      					在范围内 继续执行
      					不在范围内  提示并return
      			无收货地址
      				提示并返回
      */
      // 有自营店
      if (that.moreStoreData.isHasZiying) {
        var _assertZitiinfoEnum;
        // 多门店版本 只有自营店商品
        if (that.moreStoreData.moreStoreList.length == 1) {
          var _assertAddressEnum;
          if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchdaodian && !that.currentDuozitidianInfo.isRange) {
            uni.showToast({
              icon: 'none',
              title: '不在配送范围内'
            });
            return false;
          }

          // 根据配送方式判断是否要有收货地址
          var assertAddressEnum = (_assertAddressEnum = {}, (0, _defineProperty2.default)(_assertAddressEnum, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_assertAddressEnum, _const.dispatchmendian, false), (0, _defineProperty2.default)(_assertAddressEnum, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_assertAddressEnum, _const.dispatchkuaidi, true), _assertAddressEnum);
          if (assertAddressEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
            if (that.addressIsSet) {
              var _checkRangeEnum;
              // 根据配送方式判断是否要判断配送范围
              var checkRangeEnum = (_checkRangeEnum = {}, (0, _defineProperty2.default)(_checkRangeEnum, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_checkRangeEnum, _const.dispatchmendian, false), (0, _defineProperty2.default)(_checkRangeEnum, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_checkRangeEnum, _const.dispatchkuaidi, false), _checkRangeEnum);
              if (checkRangeEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]] && that.moreStoreData.moreStoreList.some(function (i) {
                return !i.isRange;
              })) {
                uni.showToast({
                  icon: 'none',
                  title: '不在配送范围内'
                });
                return false;
              }
            } else {
              uni.showToast({
                icon: 'none',
                title: '请选收货地址'
              });
              return false;
            }
          }
        } else {
          // 多门店版本 有自营 有入驻
          if (that.addressIsSet) {
            // 根据不同配送方式判断 是否在配送范围内
            /*
            	商家配送
            		所有isRange
            	到店自提
            		除自营店外 剩余入驻门店判断isRange
            	快递配送
            		除自营店外 剩余入驻门店判断isRange
            	到点自提
            		自营店判断当前自提点是否在配送范围内
            		剩余入驻门店判断isRange
            */
            // 商家配送
            if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchshangjia && that.moreStoreData.moreStoreList.some(function (i) {
              return !i.isRange;
            })) {
              uni.showToast({
                icon: 'none',
                title: '不在配送范围内'
              });
              return false;
            }
            var storeList = (0, _tools.cloneFn)(that.moreStoreData.moreStoreList);
            storeList.splice(that.moreStoreData.moreStoreList.ziyingStoreIndex, 1);

            // 到店自提
            if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchmendian) {
              if (storeList.some(function (i) {
                return !i.isRange;
              })) {
                uni.showToast({
                  icon: 'none',
                  title: '不在配送范围内'
                });
                return false;
              }
            }
            // 快递自提
            if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchkuaidi) {
              if (storeList.some(function (i) {
                return !i.isRange;
              })) {
                uni.showToast({
                  icon: 'none',
                  title: '不在配送范围内'
                });
                return false;
              }
            }
            // 到点自提
            if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchdaodian) {
              if (!that.currentDuozitidianInfo.isRange) {
                uni.showToast({
                  icon: 'none',
                  title: '不在配送范围内'
                });
                return false;
              }
              if (storeList.some(function (i) {
                return !i.isRange;
              })) {
                uni.showToast({
                  icon: 'none',
                  title: '不在配送范围内'
                });
                return false;
              }
            }
          } else {
            uni.showToast({
              icon: 'none',
              title: '请选收货地址'
            });
            return false;
          }
        }

        // 根据配送方式判断是否要有自提人信息
        var assertZitiinfoEnum = (_assertZitiinfoEnum = {}, (0, _defineProperty2.default)(_assertZitiinfoEnum, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_assertZitiinfoEnum, _const.dispatchmendian, true), (0, _defineProperty2.default)(_assertZitiinfoEnum, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_assertZitiinfoEnum, _const.dispatchkuaidi, false), _assertZitiinfoEnum);
        if (assertZitiinfoEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
          var usernameValidate = _tools.validateFn.name('收货人名字', that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex].usernameText);
          if (!usernameValidate.validate) {
            uni.showToast({
              icon: 'none',
              title: usernameValidate.msg
            });
            return false;
          }
          var usertelValidate = _tools.validateFn.tel(that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex].usertelText);
          if (!usertelValidate.validate) {
            uni.showToast({
              icon: 'none',
              title: usertelValidate.msg
            });
            return false;
          }
        }
      } else {
        // 无自营店
        if (that.addressIsSet) {
          if (that.moreStoreData.moreStoreList.some(function (i) {
            return !i.isRange;
          })) {
            uni.showToast({
              icon: 'none',
              title: '不在配送范围内'
            });
            return false;
          }
        } else {
          uni.showToast({
            icon: 'none',
            title: '请选收货地址'
          });
          return false;
        }
      }
      return true;
    },
    // 提交订单多门店所需要的数据
    moreStoreOrderDataFn: function moreStoreOrderDataFn() {
      var that = this;
      // 多门店数据
      var paramList = that.moreStoreData.moreStoreList.map(function (storeItem) {
        var moreStoreParams = {
          storeIsZiying: storeItem.storeIsZiying,
          storeId: storeItem.storeId,
          beizhuText: storeItem.beizhuText,
          dmio: 0
        };

        // 配送方式
        if (storeItem.storeIsZiying) {
          moreStoreParams.dispatchTypeId = that.calcMoreStoreDispatchTypeId;
        } else {
          moreStoreParams.dispatchTypeId = storeItem.dispatchTypeList[0].id;
        }

        // dmio
        if (storeItem.storeIsZiying) {
          // 根据当前的配送方式判断是否传多自提点id
          if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchshangjia) {
            moreStoreParams.dmio = that.addressId;
          }
          if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchdaodian) {
            moreStoreParams.dmio = that.currentDuozitidianInfo.id;
          }
          if (_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == _const.dispatchkuaidi) {
            moreStoreParams.dmio = that.addressId;
          }
        } else {
          moreStoreParams.dmio = that.addressId;
        }

        // 预约配送时间
        if (storeItem.storeIsZiying) {
          var _isSendYvyueTime2;
          // 根据当前的配送方式判断是否传预约配送时间
          var isSendYvyueTime = (_isSendYvyueTime2 = {}, (0, _defineProperty2.default)(_isSendYvyueTime2, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_isSendYvyueTime2, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isSendYvyueTime2, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isSendYvyueTime2, _const.dispatchkuaidi, false), _isSendYvyueTime2);
          if (isSendYvyueTime[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
            if (storeItem.yvyueType == _submitOrderEnum.dspcyvyue) {
              moreStoreParams.yvyueTimeId = storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey].timeList[storeItem.yvyueTimeKey].timeId;
            } else {
              moreStoreParams.yvyueTimeId = 0;
            }
          } else {
            moreStoreParams.yvyueTimeId = 0;
          }
        } else {
          if (storeItem.yvyueType == _submitOrderEnum.dspcyvyue) {
            moreStoreParams.yvyueTimeId = storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey].timeList[storeItem.yvyueTimeKey].timeId;
          } else {
            moreStoreParams.yvyueTimeId = 0;
          }
        }

        // 使用的优惠券商品券
        if (that.moreStoreData.isHasZiying && storeItem.storeIsZiying) {
          if (that.discountCouponIndex >= 0) {
            moreStoreParams.discountCouponId = that.discountCouponList[that.discountCouponIndex].discountCouponUserId;
          } else {
            moreStoreParams.discountCouponId = 0;
          }
          if (that.goodsCouponIndex >= 0) {
            moreStoreParams.goodsCouponId = that.goodsCouponList[that.goodsCouponIndex].goodsCouponId;
          } else {
            moreStoreParams.goodsCouponId = 0;
          }
        }
        // 自提人名手机号信息
        if (that.moreStoreData.isHasZiying && storeItem.storeIsZiying) {
          var _isSendUserNameTel2;
          // 根据当前的配送方式判断是否传自提人信息
          var isSendUserNameTel = (_isSendUserNameTel2 = {}, (0, _defineProperty2.default)(_isSendUserNameTel2, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isSendUserNameTel2, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isSendUserNameTel2, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isSendUserNameTel2, _const.dispatchkuaidi, false), _isSendUserNameTel2);
          if (isSendUserNameTel[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
            moreStoreParams.usernameText = storeItem.usernameText;
            moreStoreParams.usertelText = storeItem.usertelText;
          } else {
            moreStoreParams.usernameText = '';
            moreStoreParams.usertelText = '';
          }
        }
        return moreStoreParams;
      });
      return paramList.map(function (i) {
        var paramsInfo = {
          supp_id: i.storeId,
          dm: i.dispatchTypeId,
          pt: i.yvyueTimeId,
          remark: i.beizhuText,
          dmio: i.dmio
        };
        if (i.storeIsZiying) {
          paramsInfo.coupon_id = i.discountCouponId;
          paramsInfo.gc = i.goodsCouponId;
          paramsInfo.username = i.usernameText;
          paramsInfo.phone = i.usertelText;
        }
        return paramsInfo;
      });
    },
    // 多门店提交订单按钮
    moreStoreCommitFn: function moreStoreCommitFn() {
      var _this7 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8() {
        var that, moreStoreValidateFlag, data, orderResult;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                that = _this7;
                moreStoreValidateFlag = that.moreStoreValidateFn();
                if (moreStoreValidateFlag) {
                  _context8.next = 5;
                  break;
                }
                that.commitBtnLoadingState = false;
                return _context8.abrupt("return", false);
              case 5:
                data = that.moreStoreOrderDataFn(); // data[0].pt = '2021-10-26 12:30~2021-10-26 13:00';
                console.log('多门店版本提交订单data', data);
                console.log('多门店版本提交订单JSON.stringify(data)', JSON.stringify(data));
                /* 
                that.commitBtnLoadingState = false;
                return false;
                 */
                _context8.next = 10;
                return (0, _order.createOrderFn)(that, _submitOrderEnum.storeType.moreModel, data);
              case 10:
                orderResult = _context8.sent;
                console.log('createOrderFn 生成订单方法返回数据', orderResult);
                if (orderResult.type == 'success') {
                  if (orderResult.code == 200) {
                    // 正常
                    that.toPayFn(_submitOrderEnum.storeType.moreModel, orderResult.result);
                  } else if (orderResult.code == 353209) {
                    // 有失效商品
                    that.goodsInvalidInfo.title = orderResult.msg;
                    that.goodsInvalidInfo.goodsList = orderResult.result;
                    that.isShowGoodsInvalidModalFlag = true;
                  } else if (orderResult.code == 30302) {
                    // 预约时间过时
                    uni.showModal({
                      showCancel: false,
                      title: orderResult.msg,
                      success: function success(e) {
                        //确认后的回调
                        that.toBackFn();
                      }
                    });
                  }
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: orderResult.msg
                  });
                }
                that.commitBtnLoadingState = false;
                console.log('that.commitBtnLoadingState', that.commitBtnLoadingState);
              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }))();
    },
    // 校验当前平台是否开通对应的支付渠道
    validatePaymentTypeFn: function validatePaymentTypeFn() {
      var that = this;
      if (!that.currentPaymentType) {
        if (that.yve >= that.orderShifu && that.isUseYve) {
          return true;
        } else {
          if (that.isUseYve) {
            uni.showToast({
              icon: 'none',
              title: '余额不足'
            });
            return false;
          } else {
            uni.showToast({
              icon: 'none',
              title: '平台未开通支付渠道'
            });
            return false;
          }
        }
      } else {
        return true;
      }
    },
    // 提交按钮点击
    commitFn: function commitFn() {
      var that = this;
      if (that.commitBtnLoadingState) {
        return false;
      }
      that.commitBtnLoadingState = true;
      if (!that.validatePaymentTypeFn()) {
        that.commitBtnLoadingState = false;
        return false;
      }
      if (that.gongyingshang) {
        that.moreStoreCommitFn();
      } else {
        that.oneStoreCommitFn();
      }
    },
    // 生成订单后(调用支付接口前)把项目里其他页面商品列表的加购数量归零
    setGoodsNumFn: function setGoodsNumFn() {
      var that = this;
      var goodsIdList = [];
      if (that.gongyingshang) {
        that.moreStoreData.moreStoreList.forEach(function (i) {
          i.goodsList.forEach(function (j) {
            goodsIdList.push(j.goodsId);
          });
        });
      } else {
        that.goodsList.forEach(function (j) {
          goodsIdList.push(j.goodsId);
        });
      }
      goodsIdList.forEach(function (i) {
        uni.$emit('goodsAddCartEd', {
          goodsId: i,
          selectedNum: 0
        });
      });
    },
    // 支付操作
    toPayFn: function toPayFn(model, orderId) {
      var _this8 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9() {
        var that, platform, payDataResult, _handleFn, handleFn;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                that = _this8;
                that.setGoodsNumFn();
                _context9.next = 4;
                return (0, _order.getPayDataFn)(that, model, orderId, platform, that.currentPaymentType ? that.currentPaymentType : _const.payment_wx, that.isUseYve);
              case 4:
                payDataResult = _context9.sent;
                console.log('payDataResult ', payDataResult);
                if (payDataResult.type == 'success') {
                  handleFn = (_handleFn = {}, (0, _defineProperty2.default)(_handleFn, 2099, function _() {
                    // 2099 是余额支付成功 直接跳转订单页面
                    that.navigateToFn({
                      type: 'redirectTo',
                      url: "/pages/my/dingdan/index?act=0"
                    });
                  }), (0, _defineProperty2.default)(_handleFn, 200, function _() {}), _handleFn);
                  handleFn[payDataResult.code]();
                } else {
                  uni.showToast({
                    icon: 'none',
                    title: payDataResult.msg
                  });
                }
              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }))();
    },
    // 拉起客户端支付
    requestPaymentFn: function requestPaymentFn(opt) {
      uni.requestPayment(opt);
    },
    // 进入页面后设置默认的支付方式
    setDefaultPaymentTypeFn: function setDefaultPaymentTypeFn() {
      var that = this;
    },
    // 设置支付方式
    setPaymentType: function setPaymentType(type) {
      this.currentPaymentType = type;
    },
    // 切换抵扣余额
    toggleUseYveFn: function toggleUseYveFn(e) {
      this.isUseYve = e.detail.value;
    },
    // ↓↓↓ 多门店相关方法=================================================================================
    // 多店 页面load运行
    moreStoreLoadFn: function moreStoreLoadFn(options) {
      var _this9 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var that, thatMoreStoreData, getMoreStorePageDataResult, _isUseAdrs, _getMoreStorePageData, yve, addressIsSet, addressId, addressUserName, addressUserTel, addressTagName, addressText, addressCoordinate, moreStoreList, isHasZiying, discountCouponList, discountCouponIndex, goodsCouponList, allDiscountsPrice, shifu, dispatchTypeList, isUseAdrs, addressObject;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                that = _this9;
                thatMoreStoreData = that.moreStoreData;
                thatMoreStoreData.storeType = options.storeType;
                _context10.next = 5;
                return (0, _getMoreStorePageData2.getMoreStorePageData)(that, that.long, that.lati, thatMoreStoreData.storeType);
              case 5:
                getMoreStorePageDataResult = _context10.sent;
                console.log('getMoreStorePageDataResult', getMoreStorePageDataResult);
                if (getMoreStorePageDataResult.type == 'success') {
                  _getMoreStorePageData = getMoreStorePageDataResult.result, yve = _getMoreStorePageData.yve, addressIsSet = _getMoreStorePageData.addressIsSet, addressId = _getMoreStorePageData.addressId, addressUserName = _getMoreStorePageData.addressUserName, addressUserTel = _getMoreStorePageData.addressUserTel, addressTagName = _getMoreStorePageData.addressTagName, addressText = _getMoreStorePageData.addressText, addressCoordinate = _getMoreStorePageData.addressCoordinate, moreStoreList = _getMoreStorePageData.moreStoreList, isHasZiying = _getMoreStorePageData.isHasZiying, discountCouponList = _getMoreStorePageData.discountCouponList, discountCouponIndex = _getMoreStorePageData.discountCouponIndex, goodsCouponList = _getMoreStorePageData.goodsCouponList, allDiscountsPrice = _getMoreStorePageData.allDiscountsPrice, shifu = _getMoreStorePageData.shifu;
                  thatMoreStoreData.moreStoreList = moreStoreList;
                  thatMoreStoreData.isHasZiying = isHasZiying;
                  if (isHasZiying) {
                    thatMoreStoreData.ziyingStoreIndex = moreStoreList.findIndex(function (i) {
                      return i.storeIsZiying;
                    });
                  } else {
                    thatMoreStoreData.ziyingStoreIndex = -1;
                  }
                  if (moreStoreList.some(function (i) {
                    return !i.isRange;
                  })) {
                    uni.showModal({
                      showCancel: false,
                      //不显示取消按钮
                      title: getMoreStorePageDataResult.msg,
                      success: function success(e) {
                        //确认后的回调
                      }
                    });
                  }

                  // 配送方式
                  if (isHasZiying) {
                    dispatchTypeList = moreStoreList[thatMoreStoreData.ziyingStoreIndex].dispatchTypeList;
                    that.moreStoreDispatchTypeBeifenActive = 0;
                    that.moreStoreDispatchTypeActive = 0;
                    that.moreStoreDispatchTypePickerRange = dispatchTypeList;
                  }

                  // 根据不同配送方式判断是否使用 门店数据里的 地址信息
                  isUseAdrs = (_isUseAdrs = {}, (0, _defineProperty2.default)(_isUseAdrs, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_isUseAdrs, _const.dispatchmendian, false), (0, _defineProperty2.default)(_isUseAdrs, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_isUseAdrs, _const.dispatchkuaidi, true), _isUseAdrs);
                  if (isHasZiying && isUseAdrs[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
                    addressObject = moreStoreList[thatMoreStoreData.ziyingStoreIndex].userAdrs;
                    that.addressIsSet = addressObject.addressIsSet;
                    that.addressId = addressObject.addressId;
                    that.addressUserName = addressObject.addressUserName;
                    that.addressUserTel = addressObject.addressUserTel;
                    that.addressTagName = addressObject.addressTagName;
                    that.addressText = addressObject.addressText;
                    that.addressCoordinate = addressObject.addressCoordinate;
                  } else {
                    that.addressIsSet = addressIsSet;
                    that.addressId = addressId;
                    that.addressUserName = addressUserName;
                    that.addressUserTel = addressUserTel;
                    that.addressTagName = addressTagName;
                    that.addressText = addressText;
                    that.addressCoordinate = addressCoordinate;
                  }
                  that.yve = yve;
                  that.shifu = shifu;
                  that.allDiscountsPrice = allDiscountsPrice;

                  // 优惠券商品券
                  if (isHasZiying) {
                    that.discountCouponList = discountCouponList;
                    that.discountCouponIndex = discountCouponIndex;
                    that.goodsCouponList = goodsCouponList;
                  }

                  // 多自提点
                  if (isHasZiying) {
                    if (moreStoreList[thatMoreStoreData.ziyingStoreIndex].addressTypeText == _submitOrderEnum.zitiAdrs) {
                      that.duozitidianList = moreStoreList[thatMoreStoreData.ziyingStoreIndex].zitiAdrs; // 多自提点列表
                      if (that.duozitidianList.every(function (i) {
                        return !i.isRange;
                      })) {
                        that.duozitidianActive = 0;
                      } else {
                        that.duozitidianActive = that.duozitidianList.findIndex(function (i) {
                          return i.isRange;
                        }); // 多自提点下标
                      }
                    }
                  }
                } else {
                  uni.showModal({
                    showCancel: false,
                    title: getMoreStorePageDataResult.msg,
                    success: function success(e) {
                      that.toBackFn();
                    }
                  });
                }
                that.isShowLoading = false;
              case 9:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }))();
    },
    // 多门店 切换失效商品列表是否展示状态
    toggleMoreStoreInvalidGoodsListFn: function toggleMoreStoreInvalidGoodsListFn(storeItem) {
      storeItem.invalidGoodsListIsShow = !storeItem.invalidGoodsListIsShow;
    },
    // 多门店选择配送时间确认
    moreStroePickerChangeFn: function moreStroePickerChangeFn(e, ite, ind) {
      var that = this;
      console.log('多门店选择配送时间确认', e);
      var _e$detail$value2 = (0, _slicedToArray2.default)(e.detail.value, 2),
        column1 = _e$detail$value2[0],
        column2 = _e$detail$value2[1];
      that.$set(ite, 'yvyueDayKey', column1);
      that.$set(ite, 'yvyueTimeKey', column2);
    },
    // 多门店选择器点击
    moreStroePickerClickFn: function moreStroePickerClickFn(e, ite, ind) {
      console.log('多门店选择器点击');
      ite.yvyueDayBeifenKey = ite.yvyueDayKey;
      ite.yvyueTimeBeifenKey = ite.yvyueTimeKey;
      ite.yvyueDayKey = 0;
      ite.yvyueTimeKey = 0;
    },
    // 多门店选择配送时间取消
    moreStroePickerCancelFn: function moreStroePickerCancelFn(e, ite, ind) {
      console.log('多门店选择配送时间取消');
      ite.yvyueDayKey = ite.yvyueDayBeifenKey;
      ite.yvyueTimeKey = ite.yvyueTimeBeifenKey;
    },
    // 多门店选择配送时间单列改变
    moreStroePickerColumnChangeFn: function moreStroePickerColumnChangeFn(e, ite, ind) {
      var that = this;
      console.log('多门店选择配送时间单列改变', e);
      var pickerColumnEnum = {
        0: 'yvyueDayKey',
        1: 'yvyueTimeKey'
      };
      var _e$detail2 = e.detail,
        column = _e$detail2.column,
        value = _e$detail2.value;
      var key = pickerColumnEnum[column];
      ite[key] = value;
      if (key == 'yvyueDayKey') {
        ite.yvyueTimeKey = 0;
      }
      console.log("\n\t\t\t\tpickerColumnEnum: ".concat(JSON.stringify(pickerColumnEnum), "\n\t\t\t\tcolumn: ").concat(column, "\n\t\t\t\tvalue: ").concat(value, "\n\t\t\t\tkey: ").concat(key, "\n\t\t\t"));
    },
    // 多门店备注框 focus blur 事件修改透明度
    setMoreStoreBeizhuInputOpacityFn: function setMoreStoreBeizhuInputOpacityFn(bool, storeItem, storeIndex) {
      storeItem.beizhuInputOpacity = bool;
    }
    /*
    // 选择会员卡
    selectVipOptionCardFn(e) {
    	let that = this;
    	that.vipOptionCardIsSelect = e;
    	// codeing .... 使用切换会员卡
    },
      // 缺货的Picker组件取消
      quehuoPickerCancelFn() {
      	this.quehuoPickerIndex = 0;
      },
      // 缺货的Picker组件确认
      quehuoPickerChangeFn(e) {
      	let {
      		detail: { value }
      	} = e;
      	this.quehuoPickerIndex = value;
      },
      */
    // ↑↑↑ methods结束
  },
  computed: {
    // 单店版本-当前的配送方式对应的id
    calcOneStoreDispatchTypeId: function calcOneStoreDispatchTypeId() {
      var that = this;
      return (0, _tools.assertObject)(that.dispatchTypeList[that.dispatchTypeActive]).id;
    },
    // 单店版本-用户地址框是否显示
    oneStoreCalcIsShowAddress: function oneStoreCalcIsShowAddress() {
      var _isShowEnum;
      var isShowEnum = (_isShowEnum = {}, (0, _defineProperty2.default)(_isShowEnum, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_isShowEnum, _const.dispatchmendian, false), (0, _defineProperty2.default)(_isShowEnum, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_isShowEnum, _const.dispatchkuaidi, true), _isShowEnum);
      return isShowEnum[_const.dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
    },
    // 单店版本-根据当前配送方式 返回是否要展示预约配送组件
    oneStoreCalcIsShowYvyueComp: function oneStoreCalcIsShowYvyueComp() {
      var that = this;
      var dispatchTypeIdText = _const.dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId];

      // 不同配送方式对应的状态
      var isShowEnum = {
        dispatchshangjia: true,
        // 商家配送
        dispatchmendian: true,
        // 门店自提
        dispatchdaodian: true,
        // 到点自提
        dispatchkuaidi: false // 快递
      };

      return isShowEnum[dispatchTypeIdText];
    },
    // 当前选中的多自提点
    currentDuozitidianInfo: function currentDuozitidianInfo() {
      return this.duozitidianList[this.duozitidianActive];
    },
    /*
    	@description
    		多自提点列表是否全部 不在范围内
    	@return <Boolean>
    		返回 false 表示 有可用的自提点在范围内
    		返回 true 表示 没有可用的自提点在范围内
    */
    duozitidianIsAllNotRange: function duozitidianIsAllNotRange() {
      return this.duozitidianList.every(function (i) {
        return !i.isRange;
      });
    },
    // 自营平台的商家自提点是否显示
    ziyingCalcIsShowShangjiazitidian: function ziyingCalcIsShowShangjiazitidian() {
      var _isShowEnum2;
      var isShowEnum = (_isShowEnum2 = {}, (0, _defineProperty2.default)(_isShowEnum2, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isShowEnum2, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isShowEnum2, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_isShowEnum2, _const.dispatchkuaidi, false), _isShowEnum2);
      return isShowEnum[_const.dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
    },
    // 自营平台的多点自提是否显示
    ziyingCalcIsShowDuodian: function ziyingCalcIsShowDuodian() {
      var _isShowEnum3;
      var isShowEnum = (_isShowEnum3 = {}, (0, _defineProperty2.default)(_isShowEnum3, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isShowEnum3, _const.dispatchmendian, false), (0, _defineProperty2.default)(_isShowEnum3, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isShowEnum3, _const.dispatchkuaidi, false), _isShowEnum3);
      return isShowEnum[_const.dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
    },
    // 自营平台的提交 提货人 信息的两个input框是否显示
    ziyingCalcIsShowSubmitInput: function ziyingCalcIsShowSubmitInput() {
      var _isShowEnum4;
      var isShowEnum = (_isShowEnum4 = {}, (0, _defineProperty2.default)(_isShowEnum4, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isShowEnum4, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isShowEnum4, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isShowEnum4, _const.dispatchkuaidi, false), _isShowEnum4);
      return isShowEnum[_const.dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
    },
    // 自营预约Range数据
    ziyingYvyueRange: function ziyingYvyueRange() {
      var that = this;
      return [that.ziyingYvyueRangeDataArr, (0, _tools.assertObject)(that.ziyingYvyueRangeDataArr[that.ziyingYvyueDayKey]).timeList];
    },
    // 使用商品券減掉的金额
    useGoodsCouponPrice: function useGoodsCouponPrice() {
      var that = this;
      if (that.goodsCouponList.length && that.goodsCouponIndex >= 0) {
        // 可以使用商品券抵扣的钱数 = 实付 - 优惠券优惠钱数
        var shifu;
        if (that.gongyingshang) {
          shifu = that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex].shifuGoodsPrice;
        } else {
          shifu = that.shifu;
        }
        var canUseGoodsCouponPrice = (0, _tools.bigMinus)(shifu, that.useDiscountCouponPrice);
        var goodsCouponPrice = (0, _tools.assertObject)(that.goodsCouponList[that.goodsCouponIndex]).goodsCouponPrice; // 商品券面值
        // 面值 >= 可抵扣的钱 ? 返回已抵扣的 : 面值
        if (goodsCouponPrice >= canUseGoodsCouponPrice) {
          return canUseGoodsCouponPrice;
        }
        return goodsCouponPrice;
      }
      return 0;
    },
    // 使用优惠券減掉的金额
    useDiscountCouponPrice: function useDiscountCouponPrice() {
      var that = this;
      if (that.useDiscountCouponNum && that.discountCouponIndex >= 0) {
        return (0, _tools.assertObject)(that.discountCouponList[that.discountCouponIndex]).useCouponPrice;
      }
      return 0;
    },
    // 当前可用优惠券的数量
    useDiscountCouponNum: function useDiscountCouponNum() {
      return this.discountCouponList.filter(function (i) {
        return i.discountCouponIsUse;
      }).length;
    },
    // 订单实付金额 = 商品实付金额 - 商品券 - 优惠券 + 配送费
    orderShifu: function orderShifu() {
      var that = this;
      // 商品券 和 优惠券 总优惠的金额
      var couponsPrice = (0, _tools.toDoubleNumFn)((0, _tools.bigPlus)((0, _tools.transNumFn)(that.useDiscountCouponPrice), (0, _tools.transNumFn)(that.useGoodsCouponPrice)));

      // console.log('orderShifu couponsPrice',couponsPrice);

      var shifu;
      if (couponsPrice >= that.shifu) {
        shifu = 0;
      } else {
        // 实付金额-俩券优惠的金额
        shifu = (0, _tools.bigMinus)((0, _tools.transNumFn)(that.shifu), (0, _tools.transNumFn)(couponsPrice));
      }

      // 配送费
      var dispFeePriceNum = 0;
      if (that.gongyingshang && that.moreStoreData.isHasZiying) {
        var storeIsZiyingIndex = that.moreStoreData.moreStoreList.findIndex(function (i) {
          return i.storeIsZiying;
        });
        dispFeePriceNum = that.moreStoreData.moreStoreList[storeIsZiyingIndex].dispFeePriceNum;
      } else {
        dispFeePriceNum = that.dispFeePriceNum;
      }

      // 实付金额 + 配送费
      shifu = (0, _tools.bigPlus)((0, _tools.transNumFn)(shifu), (0, _tools.transNumFn)(dispFeePriceNum));
      return (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(shifu));
    },
    // 视图上展示的实付金额 = orderShifu - 余额抵扣
    viewShowOrderShifu: function viewShowOrderShifu() {
      var that = this;
      if (that.isUseYve) {
        if (that.yve >= that.orderShifu) {
          return 0;
        } else {
          return (0, _tools.bigMinus)(that.orderShifu, that.yve);
        }
      }
      return that.orderShifu;
    },
    // 订单总计优惠金额 = 商品券 + 优惠券 + 商品优惠
    orderDiscountsPrice: function orderDiscountsPrice() {
      var that = this;
      // 商品券 和 优惠券 总优惠的金额
      var couponsPrice = (0, _tools.toDoubleNumFn)((0, _tools.bigPlus)((0, _tools.transNumFn)(that.useDiscountCouponPrice), (0, _tools.transNumFn)(that.useGoodsCouponPrice)));
      // 俩券 + 商品优惠

      return (0, _tools.bigPlus)((0, _tools.transNumFn)(couponsPrice), (0, _tools.transNumFn)(that.allDiscountsPrice));
    },
    // ↓↓↓ 多门店相关计算属性============================================================================================================
    /*
    	多店版本-结算订单的三种状态
    		只有自营门店
    		自营门店 和 入驻门店 混合
    		只有入驻门店
    */
    moreStoreOrderState: function moreStoreOrderState() {
      var that = this;
      if (that.gongyingshang) {
        if (that.moreStoreData.isHasZiying) {
          if (that.moreStoreData.moreStoreList.length == 1) {
            return oneZiying;
          } else {
            return ziyingruzhu;
          }
        } else {
          return ruzhu;
        }
      } else {
        return '';
      }
    },
    // 多店版本-当前选的配送方式对应的id
    calcMoreStoreDispatchTypeId: function calcMoreStoreDispatchTypeId() {
      var that = this;
      return (0, _tools.assertObject)(that.moreStoreDispatchTypePickerRange[that.moreStoreDispatchTypeActive]).id;
    },
    // 多店版本-用户收货地址框是否显示
    moreStoreCalcIsShowAddress: function moreStoreCalcIsShowAddress() {
      var that = this;
      var ziyingStoreNum = 0,
        ruzhuStoreNum = 0;
      that.moreStoreData.moreStoreList.forEach(function (i) {
        if (i.storeIsZiying) {
          ziyingStoreNum++;
        } else {
          ruzhuStoreNum++;
        }
      });
      if (ruzhuStoreNum > 0) {
        return true;
      } else {
        var _isShowEnum5;
        var isShowEnum = (_isShowEnum5 = {}, (0, _defineProperty2.default)(_isShowEnum5, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_isShowEnum5, _const.dispatchmendian, false), (0, _defineProperty2.default)(_isShowEnum5, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_isShowEnum5, _const.dispatchkuaidi, true), _isShowEnum5);
        return isShowEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
      }
    },
    // 多店版本-各店是否显示预约组件
    isShowMoreStoreYvyueComp: function isShowMoreStoreYvyueComp() {
      var that = this;
      return function (storeItem) {
        if (storeItem.storeIsZiying) {
          var _isShowEnum6;
          // 不同配送方式对应的状态
          var isShowEnum = (_isShowEnum6 = {}, (0, _defineProperty2.default)(_isShowEnum6, _const.dispatchshangjia, true), (0, _defineProperty2.default)(_isShowEnum6, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isShowEnum6, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isShowEnum6, _const.dispatchkuaidi, false), _isShowEnum6);
          return isShowEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
        } else {
          return true;
        }
      };
    },
    // 多店版本-各个门店预约组件Range数据
    moreStoreYvyueRange: function moreStoreYvyueRange() {
      return function (storeItem) {
        return [storeItem.yvyueRangeDataArr, (0, _tools.assertObject)(storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey]).timeList];
      };
    },
    // 多店版本-自营店的提交 提货人 信息的两个input框是否显示
    moreStoreCalcIsShowSubmitInput: function moreStoreCalcIsShowSubmitInput() {
      var that = this;
      return function (storeItem) {
        if (storeItem.storeIsZiying) {
          var _isShowEnum7;
          var isShowEnum = (_isShowEnum7 = {}, (0, _defineProperty2.default)(_isShowEnum7, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isShowEnum7, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isShowEnum7, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isShowEnum7, _const.dispatchkuaidi, false), _isShowEnum7);
          return isShowEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
        }
        return false;
      };
    },
    // 多店版本-自营店的商家自提点是否显示
    moreStoreCalcIsShowShangjiazitidian: function moreStoreCalcIsShowShangjiazitidian() {
      var that = this;
      return function (storeItem) {
        var _isShowEnum8;
        var isShowEnum = (_isShowEnum8 = {}, (0, _defineProperty2.default)(_isShowEnum8, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isShowEnum8, _const.dispatchmendian, true), (0, _defineProperty2.default)(_isShowEnum8, _const.dispatchdaodian, false), (0, _defineProperty2.default)(_isShowEnum8, _const.dispatchkuaidi, false), _isShowEnum8);
        return storeItem.storeIsZiying && isShowEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
      };
    },
    // 多店版本-自营店的多点自提是否显示
    moreStoreCalcIsShowDuodian: function moreStoreCalcIsShowDuodian() {
      var that = this;
      return function (storeItem) {
        var _isShowEnum9;
        var isShowEnum = (_isShowEnum9 = {}, (0, _defineProperty2.default)(_isShowEnum9, _const.dispatchshangjia, false), (0, _defineProperty2.default)(_isShowEnum9, _const.dispatchmendian, false), (0, _defineProperty2.default)(_isShowEnum9, _const.dispatchdaodian, true), (0, _defineProperty2.default)(_isShowEnum9, _const.dispatchkuaidi, false), _isShowEnum9);
        return storeItem.storeIsZiying && isShowEnum[_const.dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
      };
    },
    /*
    	@description 
    		根据后台开通的支付选项和当前客户端平台类型 判断 页面是否显示 微信支付 和 支付宝支付 选项
    	@return <Object>
    		{
    			wx: true, 
    			zfb: false
    		}
    */
    showPaymentType: function showPaymentType() {
      var that = this;
      var isShow = {
        wx: false,
        zfb: false
      };
      return isShow;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 109:
/*!******************************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue?vue&type=style&index=0&id=12231db3&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./submit-order.vue?vue&type=style&index=0&id=12231db3&lang=scss&scoped=true& */ 110);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 110:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue?vue&type=style&index=0&id=12231db3&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 97:
/*!***************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js?{"page":"pages%2Forder%2Fsubmit-order"} ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _submitOrder = _interopRequireDefault(__webpack_require__(/*! ./pages/order/submit-order.vue */ 98));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_submitOrder.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 98:
/*!********************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./submit-order.vue?vue&type=template&id=12231db3&scoped=true& */ 99);
/* harmony import */ var _submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./submit-order.vue?vue&type=script&lang=js& */ 101);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _submit_order_vue_vue_type_style_index_0_id_12231db3_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./submit-order.vue?vue&type=style&index=0&id=12231db3&lang=scss&scoped=true& */ 109);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _submit_order_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "12231db3",
  null,
  false,
  _submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/submit-order.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 99:
/*!***************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order.vue?vue&type=template&id=12231db3&scoped=true& ***!
  \***************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./submit-order.vue?vue&type=template&id=12231db3&scoped=true& */ 100);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_submit_order_vue_vue_type_template_id_12231db3_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ })

},[[97,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/pages/order/submit-order.js.map