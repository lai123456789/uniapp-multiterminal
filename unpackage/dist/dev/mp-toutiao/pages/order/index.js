(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/order/index"],{

/***/ 89:
/*!********************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/main.js?{"page":"pages%2Forder%2Findex"} ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
__webpack_require__(/*! uni-pages */ 25);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/order/index.vue */ 90));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 90:
/*!*************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=0ca91b30&scoped=true& */ 91);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ 93);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&id=0ca91b30&lang=scss&scoped=true& */ 95);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 34);

var renderjs





/* normalize component */

var component = Object(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0ca91b30",
  null,
  false,
  _index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/order/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 91:
/*!********************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue?vue&type=template&id=0ca91b30&scoped=true& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=template&id=0ca91b30&scoped=true& */ 92);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_template_id_0ca91b30_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 92:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue?vue&type=template&id=0ca91b30&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var l0 =
    _vm.selectGoods.length >= 1
      ? _vm.__map(_vm.selectGoods, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var f0 = _vm._f("filterSpecName")(
            item.isGuige ? item.keyName : item.goodsRemark
          )
          return {
            $orig: $orig,
            f0: f0,
          }
        })
      : null
  var l1 =
    _vm.invalidGoods.length > 0
      ? _vm.__map(_vm.invalidGoods, function (item, index) {
          var $orig = _vm.__get_orig(item)
          var f1 = _vm._f("filterSpecName")(
            item.isGuige ? item.keyName : item.goodsRemark
          )
          return {
            $orig: $orig,
            f1: f1,
          }
        })
      : null
  var f2 =
    _vm.price_hy_yh > 0 ? _vm._f("filterTransNum")(_vm.price_hy_yh) : null
  var f3 =
    _vm.price_goods_spyh > 0
      ? _vm._f("filterTransNum")(_vm.price_goods_spyh)
      : null
  var f4 =
    _vm.calcPeiTypeId != _vm.peiTypeEnumObj[_vm.peiTypeZiti] &&
    (_vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeShangjia] ||
      _vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeDuozitidian]) &&
    _vm.mianpeisong &&
    _vm.postFee > 0
      ? _vm._f("filterTransNum")(_vm.freePost)
      : null
  var f5 =
    _vm.calcPeiTypeId != _vm.peiTypeEnumObj[_vm.peiTypeZiti] &&
    (_vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeShangjia] ||
      _vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeDuozitidian]) &&
    !_vm.mianpeisong
      ? _vm._f("filterTransNum")(_vm.postFee)
      : null
  var f6 =
    _vm.calcPeiTypeId != _vm.peiTypeEnumObj[_vm.peiTypeZiti] &&
    _vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeKuaidi] &&
    _vm.miankuaidi &&
    _vm.postage > 0
      ? _vm._f("filterTransNum")(_vm.freePostage)
      : null
  var f7 =
    _vm.calcPeiTypeId != _vm.peiTypeEnumObj[_vm.peiTypeZiti] &&
    _vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeKuaidi] &&
    !_vm.miankuaidi
      ? _vm._f("filterTransNum")(_vm.postage)
      : null
  var f8 =
    _vm.calcPeiTypeId != _vm.peiTypeEnumObj[_vm.peiTypeZiti] &&
    _vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeDada] &&
    !_vm.errorMsg.isHas
      ? _vm._f("filterTransNum")(_vm.postFeeData.fee)
      : null
  var f9 =
    _vm.calcPeiTypeId != _vm.peiTypeEnumObj[_vm.peiTypeZiti] &&
    _vm.calcPeiTypeId == _vm.peiTypeEnumObj[_vm.peiTypeShansong] &&
    !_vm.errorMsg.isHas
      ? _vm._f("filterTransNum")(_vm.postFeeData.fee)
      : null
  var f10 = _vm._f("filterTransNum")(_vm.price_sfje)
  var f11 = _vm.yve > 0 ? _vm._f("filterTransNum")(_vm.yve) : null
  var f12 = _vm.yve == 0 ? _vm._f("filterTransNum")(_vm.yve) : null
  var f13 = _vm._f("filterTransNum")(_vm.hejiPrice)
  if (!_vm._isMounted) {
    _vm.e0 = function ($event) {
      _vm.quehuoIsOpen = !_vm.quehuoIsOpen
    }
  }
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0,
        l1: l1,
        f2: f2,
        f3: f3,
        f4: f4,
        f5: f5,
        f6: f6,
        f7: f7,
        f8: f8,
        f9: f9,
        f10: f10,
        f11: f11,
        f12: f12,
        f13: f13,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 93:
/*!**************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=script&lang=js& */ 94);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 94:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
var _const = __webpack_require__(/*! @/tools/const.js */ 41);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var youhuiquan = function youhuiquan() {
  __webpack_require__.e(/*! require.ensure | df-components/youhuiquan-block/dingdan */ "df-components/youhuiquan-block/dingdan").then((function () {
    return resolve(__webpack_require__(/*! @/df-components/youhuiquan-block/dingdan */ 1026));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var peiType = function peiType() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/pei-type */ "pages/order/order-components/pei-type").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/pei-type.vue */ 1033));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var userAddress = function userAddress() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/user-address */ "pages/order/order-components/user-address").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/user-address.vue */ 1040));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var vipCard = function vipCard() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/vip-card */ "pages/order/order-components/vip-card").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/vip-card.vue */ 1047));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var myPickerComp = function myPickerComp() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/my-picker-comp */ "pages/order/order-components/my-picker-comp").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/my-picker-comp.vue */ 1054));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var zitidianShow = function zitidianShow() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/duozitidian/zitidian-show */ "pages/order/order-components/duozitidian/zitidian-show").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/duozitidian/zitidian-show.vue */ 1061));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var duozitiModal = function duozitiModal() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/duozitidian/duoziti-modal */ "pages/order/order-components/duozitidian/duoziti-modal").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/duozitidian/duoziti-modal.vue */ 1068));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var zitidianShowSeller = function zitidianShowSeller() {
  __webpack_require__.e(/*! require.ensure | pages/order/order-components/zitidian-show-seller */ "pages/order/order-components/zitidian-show-seller").then((function () {
    return resolve(__webpack_require__(/*! @/pages/order/order-components/zitidian-show-seller.vue */ 1075));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var that;
var _default = {
  name: 'order-index',
  components: {
    youhuiquan: youhuiquan,
    vipCard: vipCard,
    myPickerComp: myPickerComp,
    peiType: peiType,
    userAddress: userAddress,
    zitidianShow: zitidianShow,
    duozitiModal: duozitiModal,
    zitidianShowSeller: zitidianShowSeller
  },
  data: function data() {
    return {
      isShowLoading: true,
      // 开屏动画
      // ↓↓ 支付方式 ===========================
      payTypeyve: _const.payTypeyve,
      payTypeWxxcx: _const.payTypeWxxcx,
      payTypeWxapp: _const.payTypeWxapp,
      payTypeZfbapp: _const.payTypeZfbapp,
      payTypeWxgzh: _const.payTypeWxgzh,
      payTypeH5wx: _const.payTypeH5wx,
      payTypeH5zfb: _const.payTypeH5zfb,
      payTypeEnumObj: _const.payTypeEnumObj,
      // ↓↓ 配送方式 ===========================
      peiTypeShangjia: _const.peiTypeShangjia,
      peiTypeZiti: _const.peiTypeZiti,
      peiTypeKuaidi: _const.peiTypeKuaidi,
      peiTypeDada: _const.peiTypeDada,
      peiTypeShansong: _const.peiTypeShansong,
      peiTypeDuozitidian: _const.peiTypeDuozitidian,
      peiTypeEnumObj: _const.peiTypeEnumObj,
      // 配送方法
      peiTypeArr: [{}],
      peiTypeActive: 0,
      postFeeData: {},
      // 达达和闪送 的数据

      // 从购物车列表里带过来的商品数据
      cartPageGoodsList: [{}],
      // 选中结算的商品列表
      selectGoods: [{}],
      // 选中结算的商品列表 (限购次数的商品列表)
      invalidGoods: [{}],
      // 地址相关
      addressIsSet: false,
      addressUserName: '',
      // 收货人名字
      addressUserTel: '',
      // 收货人电话
      addressText: '',
      // 收货人地址描述
      addressTagName: '',
      // 地址标签
      addressId: null,
      // 收货地址id
      addressCoordinate: '',
      // 收货地址经纬度
      addressArea: '',
      // 收货地址的 市

      // 处理商家的一些信息
      sellerImage: '',
      // 商家门店图片
      sellerName: '',
      // 商家店名称
      sellerMobile: '',
      // 商家电话
      sellerOpenTime: '',
      // 商家营业时间
      sellerAddress: '',
      // 商家店地址

      freePost: 0,
      // 满多少免配送费
      postFee: 0,
      // 骑手配送费
      postage: 0,
      // 快递运费
      freePostage: 0,
      // 满多少减运费
      postTime: '',
      // 配送时间 '8:20 - 22:50'
      peisongTimeLater: 0,
      // 预计骑手配送时长

      // 缺货信息
      quehuo: [{}],
      // 结算钱的信息
      price: {},
      // 余额
      yve: 0,
      previousInputUserName: '',
      // 上一次用户输入的名字
      previousInputUserPhone: '',
      // 上一次用户输入的 手机号

      quehuoIsOpen: false,
      quehuoCurr: 0,
      payFlag: '',
      couponJSON: {},
      /* ↓↓↓↓↓↓↓
      	优惠券列表
      	商品券列表
      	选中的优惠券
      	选中的商品券
      	选中的优惠券 个数
      	选中的商品券 个数
      */

      coupon: [{}],
      goods_coupon: [{}],
      coupon_user_id: 0,
      good_coupon_id: 0,
      couponCount: 0,
      goodsCouponCount: 0,
      // 是否显示优惠券模态框
      isShowCouponModal: false,
      // 是否显示商品券模态框
      isShowGoodsCouponModal: false,
      // 备注信息   是否启用余额抵扣状态
      textarea: '',
      beizhuInputFlag: false,
      // 备注文字框的聚焦状态
      defaultStatus: false,
      // 是否使用余额抵扣

      // 到点自提收货人名字
      shouhuoren: '',
      // 到点自提收货人号码
      haoma: '',
      // 临时 用来缓存选择优惠券后不确定使用的对象
      temObj: {},
      // 记录是否第一次请求
      pageCont: 0,
      templateId: [],
      getOrderInfoLastTime: null,
      // 最后一次请求后台 订单信息的时间
      errorMsg: {
        // 记录因为距离太远 而不能下单 的 错误消息
        isHas: false,
        msg: ''
      },
      qvZhiFuBtnFlag: true,
      // 去支付按钮 的锁  防止 多次点击 true可以支付,  false 不能点击

      // ↓↓ 预约配送相关数据
      qiToTime: '',
      // 骑手开始配送
      qiOffTime: '',
      // 骑手结束配送

      isOpenyvyueFun: false,
      // 是否开启预约配送
      yvyueDays: 0,
      // 预约的天数
      hoursArr: [{}],
      // 小时的数据
      newToDayHourArr: [{}],
      // 选择今天配送的小时数据
      newHours: 0,
      // 当前的小时数
      newMinutes: 0,
      // 当前的分钟数

      daysIndex: 0,
      // 天的索引
      hoursIndex: 0,
      // 小时的索引
      cancelIndexDays: 0,
      // 选择前的天数索引
      cancelIndexhours: 0,
      // 选择前的小时索引
      isTomorrowStr: false,
      // 当前选天的列 选中的 是否是 '明天'
      pickerSelectHour: '',
      // 当前选小时的列 选中的 小时字符串

      // ↓↓ 开通会员的选项卡片 数据
      vipOptionCardIsSelect: false,
      // 用户 是否同意开启 vip
      vipOptionCardIsOpen: false,
      // 是否显示 勾选vip 确认 开通会员 卡片
      vipOptionCardId: 0,
      // 展示的会员卡id
      vipOptionCardName: '',
      // 会员卡名字
      vipOptionCardTagBgColor: '',
      // 会员卡左上标签的背景色
      vipOptionCardTagIconImg: '',
      // 会员卡左上标签的 图标 图片地址
      vipOptionCardTagText: '',
      // 会员卡左上标签的 文字内容
      vipOptionCardTagTextColor: '',
      // 会员卡左上标签的 文字 颜色
      vipOptionCardTipBgColor: '',
      // 会员卡右上的提示气泡背景颜色
      vipOptionCardTipText: '',
      // 会员卡右上的提示气泡展示文字
      vipOptionCardTipTextColor: '',
      // 会员卡右上的提示气泡展示文字颜色
      vipOptionCardTime: '',
      // 会员卡的有效时间
      vipOptionCardPrice: 0,
      // 购买会员卡的价格

      // ↓↓ 多自提点 数据
      localhostLon: 0,
      // 当前设备的 经度
      localhostLat: 0,
      // 当前设备的 纬度
      zitidianList: [{}],
      // 自提点列表数据
      zitidianActive: 0,
      // 默认选中的自提点
      duozitiModalFlag: false // 自提点列表模态框 显示 隐藏 状态
    };
  },
  onLoad: function onLoad(options) {
    that = this;
    that.setDefaultPayTypeFn();
    var selectGoods = uni.getStorageSync('selectGoods');
    // 从购物车带进来的 商品列表数据
    that.cartPageGoodsList = JSON.parse(selectGoods);
    console.log('从购物车页面带来的 商品列表', that.cartPageGoodsList);
    that.loadFn();
    uni.setStorageSync('selectGoods', '');

    // 多自提点需要获取的经纬度信息
    var cartAddress = (0, _tools.assertObject)(uni.getStorageSync('cartAddress'));
    that.localhostLat = (0, _tools.transNumFn)(cartAddress.latitude);
    that.localhostLon = (0, _tools.transNumFn)(cartAddress.longitude);
    uni.setStorageSync('cartAddress', '');
    /*
    setInterval(() => {
    	console.log(' 自提点 this.currentzitidianInfo', this.currentzitidianInfo);
    }, 1000);
     */
  },
  onShow: function onShow() {
    var that = this;
    uni.setStorageSync('orderZhifuLoadCont', 0);
    uni.setStorageSync('orderZhifuReloadFlag', 0);
    // 获取选择的地址
    var temSelectAd = uni.getStorageSync('temSelectAd');
    if (temSelectAd) {
      that.addressIsSet = true;
      that.addressUserName = temSelectAd.name; // 收货人名字
      that.addressUserTel = temSelectAd.mobile; // 收货人电话
      that.addressText = temSelectAd.address; // 收货人地址描述
      that.addressTagName = temSelectAd.tag; // 地址标签
      that.addressId = temSelectAd.id; // 收货地址id
      that.addressCoordinate = temSelectAd.coordinate; // 收货地址经纬度
      that.addressArea = temSelectAd.area; // 收货地址的 市

      if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDada] || that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeShansong]) {
        // 达达或者闪送 重新计算
        that.getOrderInfoFn(function () {
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
    // 进入结算页面后设置默认的支付方式
    setDefaultPayTypeFn: function setDefaultPayTypeFn() {
      var that = this;
    },
    // 设置备注输入框隐藏显示
    setBeizhuInputFlagFn: function setBeizhuInputFlagFn(flag) {
      this.beizhuInputFlag = flag;
    },
    // 设置当前的支付方式
    setPayFlagFn: function setPayFlagFn(flag) {
      this.payFlag = _const.payTypeEnumObj[flag];
    },
    getChaiFenFn: function getChaiFenFn() {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn, rejFn) {
          var result, resObj, resultObj, addressObj, quehuo, peiTypeArr, sellerInfo, yve, _assertObject, userName, userPhone;
          return _regenerator.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return that.$request({
                    url: '/api/order/fill_chaifen'
                  });
                case 2:
                  result = _context.sent;
                  if (result.statusCode == 200) {
                    if (result.data.code == 200) {
                      // 成功返回的数据
                      resObj = {};
                      resultObj = (0, _tools.assertObject)(result.data.data); // 处理地址信息
                      addressObj = (0, _tools.assertObject)(resultObj.address);
                      if (addressObj.id) {
                        resObj.address = {
                          isSet: true,
                          addressId: addressObj.id,
                          // 地址id
                          addressUserName: addressObj.name,
                          // 收货人名字
                          addressUserTel: addressObj.mobile,
                          // 收货人电话
                          addressText: addressObj.address,
                          // 收货人地址描述
                          addressHousenumber: addressObj.housenumber,
                          // 收货人门牌号
                          addressCoordinate: addressObj.coordinate,
                          // 收货地址经纬度
                          addressArea: addressObj.area,
                          // 收货地址的 市
                          addressTagName: addressObj.tag_name // 地址标签
                        };
                      } else {
                        resObj.address = {
                          isSet: false
                        };
                      }

                      // 如遇缺货如何处理
                      quehuo = (0, _tools.assertArray)(resultObj.quehuo);
                      resObj.quehuo = quehuo;

                      // 处理配送方式数据
                      peiTypeArr = (0, _tools.assertArray)(resultObj.peiType).filter(function (typeItem) {
                        return typeItem.value == 1;
                      });
                      resObj.peiTypeArr = peiTypeArr;

                      // 处理自提商家信息
                      sellerInfo = (0, _tools.assertObject)(resultObj.peisong);
                      resObj.sellerInfo = {
                        freePost: (0, _tools.transNumFn)(sellerInfo.free_post),
                        // 满多少免配送费
                        postFee: (0, _tools.transNumFn)(sellerInfo.post_fee),
                        // 骑手配送费
                        postTime: sellerInfo.post_time,
                        // 配送时间 '8:20 - 22:50'
                        postage: (0, _tools.transNumFn)(sellerInfo.postage),
                        // 快递运费
                        freePostage: (0, _tools.transNumFn)(sellerInfo.free_postage),
                        // 满多少减运费
                        isPreparePeisong: sellerInfo.is_prepare_peisong == 1,
                        // 是否开启预约配送
                        prepareDays: (0, _tools.transNumFn)(sellerInfo.prepare_days),
                        // 预约配送的天数
                        peisongTimeLater: (0, _tools.transNumFn)(sellerInfo.peisong_time_later),
                        // 预计骑手配送时长

                        // 处理商家的一些信息
                        sellerImage: sellerInfo.shop_image,
                        // 商家门店图片
                        sellerName: sellerInfo.shop_name,
                        // 商家店名称
                        sellerMobile: sellerInfo.mobile,
                        // 商家电话
                        sellerOpenTime: sellerInfo.shop_bh,
                        // 商家营业时间
                        sellerAddress: sellerInfo.address // 商家店地址
                      };
                      yve = (0, _tools.transNumFn)(resultObj.yue); // 账户余额
                      resObj.yve = yve;
                      _assertObject = (0, _tools.assertObject)(resultObj.znp_user), userName = _assertObject.user_name, userPhone = _assertObject.user_phone;
                      resObj.previousInputInfo = {
                        // 上一次输入的值
                        userName: userName,
                        userPhone: userPhone
                      };
                      resFn({
                        type: 'success',
                        msg: '获取拆分数据成功',
                        result: resObj
                      });
                    } else {
                      resFn({
                        type: 'error',
                        result: result,
                        msg: result.data.msg
                      });
                    }
                  } else {
                    resFn({
                      type: 'error',
                      result: result,
                      msg: that.$errorMsg
                    });
                  }
                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    },
    // 获取当前的小时数
    getNewHoursFn: function getNewHoursFn() {
      var that = this;
      var date = new Date();
      that.newHours = date.getHours();
      that.newMinutes = date.getMinutes();
    },
    // 页面 load 执行
    loadFn: function loadFn() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var that, chaifen, chaifenResult, startEndTimeArr, newToDayTime, newToDayTimeStr, newToDayHourArr, zitidianList, zitidianIsAllNotRange;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this;
                _context2.next = 3;
                return that.getChaiFenFn();
              case 3:
                chaifen = _context2.sent;
                //获取拆分出来的数据
                console.log('拆分出来的数据', chaifen);
                if (!(chaifen.type == 'success')) {
                  _context2.next = 49;
                  break;
                }
                chaifenResult = chaifen.result; // 处理 用户的配送方式
                that.peiTypeArr = chaifenResult.peiTypeArr;

                // 处理收货地址
                that.addressIsSet = chaifenResult.address.isSet;
                that.addressUserName = chaifenResult.address.addressUserName;
                that.addressUserTel = chaifenResult.address.addressUserTel;
                that.addressText = chaifenResult.address.addressText;
                that.addressTagName = chaifenResult.address.addressTagName;
                that.addressId = chaifenResult.address.addressId;
                that.addressCoordinate = chaifenResult.address.addressCoordinate; // 收货地址经纬度
                that.addressArea = chaifenResult.address.addressArea; // 收货地址的 市

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
                that.postTime = chaifenResult.sellerInfo.postTime; // 配送时间 '8:20 - 22:50'

                that.isOpenyvyueFun = chaifenResult.sellerInfo.isPreparePeisong; // 是否开启预约配送
                that.yvyueDays = chaifenResult.sellerInfo.prepareDays; // 预约配送的天数 最多两天  0:立即送出; 1:今天 ; 2:明天
                that.peisongTimeLater = chaifenResult.sellerInfo.peisongTimeLater; // 预计骑手配送时长

                // 处理配送相关信息
                startEndTimeArr = that.postTime.split('-'); // 得到开始和结束的时间数组 ["9:00 ", " 22:00"]
                that.qiToTime = startEndTimeArr[0]; // 赋值骑手开始上班时间-小时
                that.qiOffTime = startEndTimeArr[1]; // 赋值骑手开始下班时间-小时

                that.getNewHoursFn();
                that.hoursArr = (0, _tools.createHoursArr)(that.qiToTime, that.qiOffTime, that.peisongTimeLater);
                newToDayTime = new Date((Math.floor(+new Date() / 1000) + 60 * 10) * 1000);
                newToDayTimeStr = "".concat((0, _tools.num2zeroStr)(newToDayTime.getHours()), ":").concat((0, _tools.num2zeroStr)(newToDayTime.getMinutes()));
                newToDayHourArr = (0, _tools.createHoursArr)(newToDayTimeStr, that.qiOffTime, that.peisongTimeLater);
                that.newToDayHourArr = newToDayHourArr.length > 0 ? newToDayHourArr : [{
                  textStr: "".concat((0, _tools.num2zeroStr)(that.newHours), ":").concat((0, _tools.num2zeroStr)(that.newMinutes), "~").concat((0, _tools.num2zeroStr)(that.qiOffTime.split(':')[0]), ":").concat((0, _tools.num2zeroStr)(that.qiOffTime.split(':')[1])),
                  toHoursBefore: that.newHours,
                  offHoursBefore: that.qiOffTime.split(':')[0]
                }];

                // 处理如遇缺货
                that.quehuo = chaifenResult.quehuo;

                // 处理余额
                that.yve = chaifenResult.yve; // 余额

                that.previousInputUserName = chaifenResult.previousInputInfo.userName; // 上一次用户输入的名字
                that.previousInputUserPhone = chaifenResult.previousInputInfo.userPhone; // 上一次用户输入的 手机号
                _context2.next = 44;
                return that.getDuozitidianFn(that.localhostLon, that.localhostLat);
              case 44:
                zitidianList = _context2.sent;
                console.log('自提点 数据 zitidianList', zitidianList);
                if (zitidianList.type == 'success') {
                  that.zitidianList = zitidianList.result;
                  zitidianIsAllNotRange = zitidianList.result.every(function (i) {
                    return !i.isRange;
                  });
                  if (!zitidianIsAllNotRange) {
                    that.zitidianActive = zitidianList.result.findIndex(function (item) {
                      return item.isRange;
                    });
                  }
                  that.getOrderInfoFn();
                } else {
                  that.isShowLoading = false;
                  uni.showToast({
                    icon: 'none',
                    title: zitidianList.msg
                  });
                }
                _context2.next = 51;
                break;
              case 49:
                that.isShowLoading = false;
                uni.showToast({
                  icon: 'none',
                  title: "".concat(chaifen.msg, ".")
                });
              case 51:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 获取订单详情
    getOrderInfoFn: function getOrderInfoFn(fn, isShowLoading) {
      var _this2 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var that, addressObj, cartPageGoodsList, cartId, Platform, opt, result, resultObj, priceInfo, goods, selectGoods, invalidGoodsList, invalidGoods, coupon, couponCount, _coupon, _couponCount, _couponCount2, good_coupon_id, goodsCoupon, result_prepay_dada, _result_prepay_dada, vipOptionCard, templateId;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this2; // 选择地址的时候 把 地址的id给后台
                addressObj = {};
                if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDada] || that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeShansong]) {
                  if (that.addressIsSet) {
                    addressObj.address_id = that.addressId;
                  } else {
                    addressObj.address_id = 0;
                  }
                }
                cartPageGoodsList = that.cartPageGoodsList.map(function (item) {
                  return {
                    id: item.id,
                    num: item.number
                  };
                });
                cartId = JSON.stringify(cartPageGoodsList);
                opt = {
                  loading: !!isShowLoading,
                  url: '/api/order/fill_order',
                  data: _objectSpread(_objectSpread({}, addressObj), {}, {
                    from: 'cart',
                    prom_type: 'common',
                    cart_id: cartId,
                    coupon_user_id: that.coupon_user_id,
                    goods_coupon: that.good_coupon_id,
                    post_type: that.peiTypeArr[that.peiTypeActive].id,
                    Platform: Platform,
                    is_send_immediately: 1,
                    // 是否立即送出 1--立即单  2--预约单   默认1
                    peisong_time: '',
                    // 骑手开始配送的时间
                    vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0
                  })
                };
                console.log('请求 /api/order/fill_order 接口 带的参数', opt);
                _context3.next = 9;
                return that.$request(opt);
              case 9:
                result = _context3.sent;
                console.log('请求 api/order/fill_order 接口返回的结果 ', result);
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = (0, _tools.assertObject)(result.data.data);
                    priceInfo = (0, _tools.assertObject)(resultObj.price);
                    goods = (0, _tools.assertArray)(priceInfo.goods); // 选中结算的商品列表
                    console.log('打印可以结算的商品数组 goods', goods);
                    selectGoods = that.cartPageGoodsList.filter(function (item) {
                      var _iterator = _createForOfIteratorHelper(goods),
                        _step;
                      try {
                        for (_iterator.s(); !(_step = _iterator.n()).done;) {
                          var i = _step.value;
                          if (i.goods_id == item.goodsId && i.spec_id == item.specId) {
                            return true;
                          }
                        }
                      } catch (err) {
                        _iterator.e(err);
                      } finally {
                        _iterator.f();
                      }
                    }).map(function (item) {
                      var _iterator2 = _createForOfIteratorHelper(goods),
                        _step2;
                      try {
                        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                          var i = _step2.value;
                          if (i.goods_id == item.goodsId && i.spec_id == item.specId) {
                            return _objectSpread(_objectSpread({}, item), i);
                          }
                        }
                      } catch (err) {
                        _iterator2.e(err);
                      } finally {
                        _iterator2.f();
                      }
                    });
                    that.selectGoods = selectGoods;
                    console.log('打印可以结算的商品数组合并好的数据 that.selectGoods', that.selectGoods);
                    invalidGoodsList = (0, _tools.assertArray)(priceInfo.invalidGoods);
                    console.log('打印可以失效的商品数组 invalidGoodsList', invalidGoodsList);
                    invalidGoods = that.cartPageGoodsList.filter(function (item) {
                      var _iterator3 = _createForOfIteratorHelper(invalidGoodsList),
                        _step3;
                      try {
                        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                          var i = _step3.value;
                          if (i.goods_id == item.goodsId && i.spec_id == item.specId) {
                            return true;
                          }
                        }
                      } catch (err) {
                        _iterator3.e(err);
                      } finally {
                        _iterator3.f();
                      }
                    }).map(function (item) {
                      var _iterator4 = _createForOfIteratorHelper(invalidGoodsList),
                        _step4;
                      try {
                        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                          var i = _step4.value;
                          if (i.goods_id == item.goodsId && i.spec_id == item.specId) {
                            item.isShowText = i.is_make_order.is_make_order_msg;
                            return _objectSpread(_objectSpread({}, item), i);
                          }
                        }
                      } catch (err) {
                        _iterator4.e(err);
                      } finally {
                        _iterator4.f();
                      }
                    });
                    that.invalidGoods = invalidGoods;
                    console.log('打印失效的商品数组合并好的数据 that.invalidGoods', that.invalidGoods);
                    that.getOrderInfoLastTime = result.data.time; // 赋值最后的请求时间
                    // =====================================================================================↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
                    // 处理优惠券

                    // 第一次加载页面
                    if (that.pageCont == 0) {
                      that.couponJSON = JSON.stringify((0, _tools.assertArray)(resultObj.coupon));
                      coupon = JSON.parse(that.couponJSON); // 优惠券优惠的金额是0
                      if (priceInfo.coupon_sale_money == 0) {
                        if (priceInfo.goods_coupon_sale_money > 0) {
                          coupon.forEach(function (item) {
                            item.isSelect = false;
                            if (item.is_use == 1) {
                              item.is_use = 0;
                              item.not_reason = '使用商品券进行优惠';
                            }
                          });
                        }
                      } else {
                        couponCount = 0;
                        coupon.forEach(function (item, index) {
                          if (couponCount == 0 && item.is_use == 1) {
                            item.isSelect = true;
                            couponCount++;
                            that.couponCount = 1;
                            that.coupon_user_id = item.coupon_user_id;
                          } else {
                            item.isSelect = false;
                          }
                        });
                      }
                      that.coupon = coupon;

                      // 第多次加载页面
                    } else {
                      _coupon = JSON.parse(that.couponJSON);
                      if (priceInfo.goods_coupon_sale_money - 0 >= priceInfo.ord_price - 0) {
                        _coupon.forEach(function (item) {
                          item.isSelect = false;
                          if (item.is_use == 1) {
                            item.is_use = 0;
                            item.not_reason = '使用商品券进行优惠';
                          }
                        });
                      } else {
                        if (that.coupon_user_id == 0) {
                          _couponCount = 0;
                          _coupon.forEach(function (item, index) {
                            if (_couponCount == 0 && item.is_use == 1) {
                              item.isSelect = true;
                              _couponCount++;
                              that.couponCount = 1;
                              that.coupon_user_id = item.coupon_user_id;
                            } else {
                              item.isSelect = false;
                            }
                          });
                        } else if (that.coupon_user_id == 'no') {
                          _couponCount2 = 0;
                          that.couponCount = _couponCount2;
                          that.coupon_user_id = 'no';
                          _coupon.forEach(function (item, index) {
                            item.isSelect = false;
                          });
                        } else {
                          that.couponCount = 1;
                          _coupon.forEach(function (item, index) {
                            if (that.coupon_user_id == item.coupon_user_id) {
                              item.isSelect = true;
                            } else {
                              item.isSelect = false;
                            }
                          });
                        }
                      }
                      that.coupon = _coupon;
                    }

                    // 处理商品券=====================================================================================================
                    if (that.pageCont == 0) {
                      // 处理商品券
                      good_coupon_id = [];
                      goodsCoupon = (0, _tools.assertArray)(resultObj.goods_coupon);
                      goodsCoupon.forEach(function (goods_coupon) {
                        that.selectGoods.forEach(function (selectGoods) {
                          if (selectGoods.goodsId == goods_coupon.goods_id) {
                            goods_coupon.original_img = selectGoods.originalImg;
                          }
                        });
                        goods_coupon.isSelect = true;
                        good_coupon_id.push(goods_coupon.id);
                      });
                      console.log(result.data.data.goods_coupon, '给优惠券添加 图片路径后 的数据', '\n');
                      that.goods_coupon = goodsCoupon;
                      that.good_coupon_id = good_coupon_id.join(',');
                    }

                    // =====================================================================================↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
                    // 处理 优惠的价格

                    // 处理价格
                    that.price = priceInfo;

                    // 处理 达达和闪送的数据
                    if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDada]) {
                      // 达达
                      result_prepay_dada = (0, _tools.assertObject)(resultObj.result_prepay_dada);
                      if (result_prepay_dada.status == 'success') {
                        that.postFeeData.order_info = resultObj.order_info;
                        that.postFeeData.deliveryNo = result_prepay_dada.result.deliveryNo;
                        that.postFeeData.totalFee = result_prepay_dada.result.deliverFee;
                        that.postFeeData.fee = result_prepay_dada.result.fee;
                        that.errorMsg.msg = '';
                        that.errorMsg.isHas = false;
                      } else {
                        that.errorMsg.msg = result_prepay_dada.msg;
                        that.errorMsg.isHas = true;
                        setTimeout(function () {
                          uni.hideLoading();
                          uni.showModal({
                            showCancel: false,
                            //不显示取消按钮
                            title: result_prepay_dada.msg,
                            success: function success(e) {
                              //确认后的回调
                              console.log(e);
                            }
                          });

                          // uni.showToast({
                          // 	icon: 'none',
                          // 	title: result_prepay_dada.msg
                          // });
                        });
                      }
                    }

                    if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeShansong]) {
                      // 闪送
                      _result_prepay_dada = resultObj.result_prepay_dada;
                      if (_result_prepay_dada.status == 200) {
                        that.postFeeData.order_info = resultObj.order_info;
                        that.postFeeData.deliveryNo = _result_prepay_dada.data.orderNumber;
                        that.postFeeData.totalFee = (0, _tools.bigDiv)((0, _tools.transNumFn)(_result_prepay_dada.data.totalAmount), 100);
                        that.postFeeData.fee = (0, _tools.bigDiv)((0, _tools.transNumFn)(_result_prepay_dada.data.totalFeeAfterSave), 100);
                        that.errorMsg.msg = '';
                        that.errorMsg.isHas = false;
                      } else {
                        that.errorMsg.msg = _result_prepay_dada.msg;
                        that.errorMsg.isHas = true;
                        setTimeout(function () {
                          uni.hideLoading();
                          uni.showModal({
                            showCancel: false,
                            //不显示取消按钮
                            title: _result_prepay_dada.msg,
                            success: function success(e) {
                              //确认后的回调
                              console.log(e);
                            }
                          });

                          // uni.showToast({
                          // 	icon: 'none',
                          // 	title: result_prepay_dada.msg
                          // });
                        });
                      }
                    }

                    // 开通vip选项卡 相关配置
                    vipOptionCard = (0, _tools.assertObject)(resultObj.fill_content);
                    that.vipOptionCardIsOpen = vipOptionCard.is_fill == 1; // 是否显示 勾选vip 确认 开通会员 卡片
                    that.vipOptionCardId = (0, _tools.transNumFn)(vipOptionCard.vip_id); // 展示的会员卡id
                    that.vipOptionCardName = vipOptionCard.fill_name; // 会员卡名字
                    that.vipOptionCardTagBgColor = vipOptionCard.fill_bg_color; // 会员卡左上标签的背景色
                    that.vipOptionCardTagIconImg = vipOptionCard.fill_icon; // 会员卡左上标签的 图标 图片地址
                    that.vipOptionCardTagText = vipOptionCard.fill_con; // 会员卡左上标签的 文字内容
                    that.vipOptionCardTagTextColor = vipOptionCard.fill_bq_color; // 会员卡左上标签的 文字 颜色
                    that.vipOptionCardTipBgColor = vipOptionCard.fill_xz_color; // 会员卡右上的提示气泡背景颜色
                    that.vipOptionCardTipText = vipOptionCard.fill_xz_con; // 会员卡右上的提示气泡展示文字
                    that.vipOptionCardTipTextColor = vipOptionCard.fill_xzt_color; // 会员卡右上的提示气泡展示文字颜色
                    that.vipOptionCardTime = vipOptionCard.time; // 会员卡的有效时间
                    that.vipOptionCardPrice = (0, _tools.transNumFn)(vipOptionCard.vip_or_price); // 购买会员卡的价格

                    // 处理 模板消息
                    if (that.pageCont == 0) {
                      templateId = (0, _tools.assertArray)(resultObj.templateId).filter(function (item) {
                        return item.mini_status == 1;
                      }).map(function (item) {
                        return item.mini_template_id;
                      });
                      that.templateId = templateId;
                    }
                    fn && fn(resultObj);
                    console.log(that.coupon, '本地的优惠券列表', '\n', (0, _typeof2.default)(that.coupon), '本地的优惠券列表类型', '\n', that.coupon.length, '本地的优惠券列表长度', '\n', that.pageCont, '页面加载次数', '\n');
                    that.pageCont++;
                    console.log(that.$data, '本地的$data数据', '\n');
                  } else {
                    console.log('回到购物车页面', '\n');
                    uni.showModal({
                      showCancel: false,
                      //不显示取消按钮
                      title: "_".concat(result.data.msg),
                      success: function success(e) {
                        //确认后的回调
                        // that.toBackFn();
                      }
                    });
                  }
                } else {
                  uni.showModal({
                    showCancel: false,
                    //不显示取消按钮
                    title: '网络错误,请稍后重试',
                    success: function success(e) {
                      //确认后的回调
                      that.toBackFn();
                    }
                  });
                }
                that.isShowLoading = false;
              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    // 设置配送方式
    setPeiTypeIndexFn: function setPeiTypeIndexFn(arg) {
      var that = this;
      that.peiTypeActive = arg.index;
      that.defaultStatus = false;
      that.setDefaultPayTypeFn();
      that.coupon_user_id = 0;
      that.pageCont = 0;
      that.vipOptionCardIsSelect = false;
      that.getOrderInfoFn(function () {
        uni.showToast({
          icon: 'none',
          title: '配送变更,费用已发生变化'
        });

        // 如果是到店自提 或者 多自提点自提 就把之前输入的 用户信息 自动输入上去

        console.log({
          '\n': '=========',
          calcPeiTypeId: that.calcPeiTypeId,
          previousInputUserName: that.previousInputUserName,
          previousInputUserPhone: that.previousInputUserPhone
        });
        if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDuozitidian] && that.previousInputUserName && that.previousInputUserPhone && !that.shouhuoren && !that.haoma || that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeZiti] && that.previousInputUserName && that.previousInputUserPhone && !that.shouhuoren && !that.haoma) {
          that.shouhuoren = that.previousInputUserName;
          that.haoma = that.previousInputUserPhone;
        }
      }, true);
    },
    // 选择缺货情况处理方式
    quehuoItemFn: function quehuoItemFn(index) {
      var that = this;
      that.quehuoCurr = index;
      that.quehuoIsOpen = false;
    },
    // 打开优惠券的模态框
    openCouponModalFn: function openCouponModalFn() {
      var that = this;
      var temObj = {
        coupon: that.coupon
      };
      that.temObj = JSON.stringify(temObj);
      that.isShowCouponModal = true;
    },
    // 选择优惠券
    selectCouponFn: function selectCouponFn(coupon) {
      var that = this;
      // if(that.price.coupon_sale_money == 0){
      // 	uni.showToast({
      // 		icon:'none',
      // 		title:'已使用商品券进行优惠'
      // 	})
      // 	return

      // }
      // 改变选中状态
      that.coupon.forEach(function (item, index) {
        if (index == coupon.index) {
          that.coupon[coupon.index].isSelect = !that.coupon[coupon.index].isSelect;
        } else {
          that.coupon[index].isSelect = false;
        }
      });

      // 计算选中数量
      var couponCount = 0;
      that.coupon.forEach(function (item) {
        if (item.isSelect) {
          couponCount++;
        }
      });
      that.couponCount = couponCount;

      // 设置选中的 券

      var selectItemArr = that.coupon.filter(function (item) {
        return item.isSelect == true;
      });
      console.log(coupon, '点击的结果', '\n', selectItemArr, '选出的优惠券', '\n');
      if (selectItemArr.length > 0) {
        that.coupon_user_id = selectItemArr[0].coupon_user_id;
      } else {
        that.coupon_user_id = 'no';
      }
    },
    // 关闭优惠券的模态框 (点空白处关闭)
    closeCouponModalFn: function closeCouponModalFn() {
      var that = this;
      var _JSON$parse = JSON.parse(that.temObj),
        coupon = _JSON$parse.coupon;
      that.coupon = coupon;
      that.isShowCouponModal = false;
    },
    // 不使用优惠券 并 关闭模态框(右上角 不使用优惠券)
    notUseCoupon_cloneFn: function notUseCoupon_cloneFn() {
      var that = this;
      that.coupon_user_id = 'no';
      that.coupon.forEach(function (item) {
        item.isSelect = false;
      });
      that.setCouponFn();
    },
    // 确定选择的优惠券
    setCouponFn: function setCouponFn() {
      var that = this;
      that.isShowCouponModal = false;
      that.getOrderInfoFn(function () {}, true);
    },
    // 打开商品券模态框
    openGoodsCouponModalFn: function openGoodsCouponModalFn() {
      var that = this;
      var temObj = {
        goods_coupon: that.goods_coupon
      };
      that.temObj = JSON.stringify(temObj);
      that.isShowGoodsCouponModal = true;
    },
    // 选择商品券
    selectGoodsCouponFn: function selectGoodsCouponFn(item, index) {
      var that = this;
      // 改变选中状态
      that.goods_coupon[index].isSelect = !that.goods_coupon[index].isSelect;

      // 计算选中数量
      var goodsCouponCount = 0,
        selectGood_coupon_id = [];
      that.goods_coupon.forEach(function (item) {
        console.log(item, '循环商品券数据', '\n');
        if (item.isSelect) {
          goodsCouponCount++;
          selectGood_coupon_id.push(item.id);
        }
      });
      that.goodsCouponCount = goodsCouponCount;
      if (selectGood_coupon_id.length > 0) {
        that.good_coupon_id = selectGood_coupon_id.join(',');
      } else {
        that.good_coupon_id = 'no';
      }
      console.log(that.good_coupon_id, '发送给后台的 选中商品券id 字符串', '\n');
    },
    // 关闭商品券的模态框 (点空白处关闭)
    closeGoodsCouponModalFn: function closeGoodsCouponModalFn() {
      var that = this;
      var _JSON$parse2 = JSON.parse(that.temObj),
        goods_coupon = _JSON$parse2.goods_coupon;
      that.goods_coupon = goods_coupon;
      that.isShowGoodsCouponModal = false;
    },
    // 不使用商品券 并 关闭模态框(右上角 不使用商品券)
    notUseGoodsCoupon_cloneFn: function notUseGoodsCoupon_cloneFn() {
      var that = this;
      that.good_coupon_id = 'no';
      that.goods_coupon.forEach(function (item) {
        item.isSelect = false;
      });
      that.setGoodsCouponFn();
    },
    // 确定选择的商品券
    setGoodsCouponFn: function setGoodsCouponFn() {
      var that = this;
      that.isShowGoodsCouponModal = false;
      // 保存地址
      that.getOrderInfoFn(function (orderInfo) {}, true);
    },
    // 切换 是否使余额
    switchChangeFn: function switchChangeFn(e) {
      var that = this;
      if (that.yve > 0) {
        this.defaultStatus = e.detail.value;
      } else {
        this.defaultStatus = false;
        uni.showToast({
          title: '余额不足',
          icon: 'none'
        });
      }
    },
    // 获取发送模板消息权限 (弹框形式给用户)
    getTemplateId: function getTemplateId() {
      var that = this;
      return new Promise(function (resFn, rejFn) {
        uni.requestSubscribeMessage({
          tmplIds: that.templateId,
          success: function success(res) {
            console.log('成功', '\n');
            console.log(res, '打印发送到后台的结果', '\n', JSON.stringify(res), '转字符串后', '\n');
            resFn(res);
          },
          fail: function fail(e) {
            rejFn(e);
          }
        });
      });
    },
    // 达达配送超时(3分钟超时)后 重新获取 DaDadeliveryNo信息 和 配送费信息
    getDaDadeliveryNoFn: function getDaDadeliveryNoFn() {
      var that = this;
      return new Promise( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(resFn, rejFn) {
          var resultObj, totalWeight, addressJSON, DaDadeliveryNoResult;
          return _regenerator.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  resultObj = {};
                  if (!that.addressIsSet) {
                    _context4.next = 11;
                    break;
                  }
                  totalWeight = 0;
                  that.selectGoods.forEach(function (item) {
                    var itemWeight = (0, _tools.transNumFn)(item.weight),
                      totalWeight = (0, _tools.bigPlus)(totalWeight, itemWeight);
                  });
                  addressJSON = JSON.stringify({
                    user_area: that.addressArea,
                    user_address: that.addressText,
                    address_jingweidu: that.addressCoordinate,
                    user_name: that.addressUserName,
                    user_phone: that.addressUserTel
                  });
                  _context4.next = 7;
                  return that.$request({
                    url: '/api/Dada/dada_select_fee_api',
                    data: {
                      ord_bh: that.postFeeData.order_info,
                      ord_price: that.price['订单金额'],
                      address: addressJSON,
                      weight: totalWeight
                    }
                  });
                case 7:
                  DaDadeliveryNoResult = _context4.sent;
                  if (DaDadeliveryNoResult.statusCode == 200) {
                    if (DaDadeliveryNoResult.data.code == 200) {
                      console.log(DaDadeliveryNoResult.data.data, 'DaDadeliveryNoResult.data.data', '\n');
                      if (DaDadeliveryNoResult.data.data.status == 'success') {
                        resultObj = {
                          type: 'success',
                          result: {
                            deliveryNo: DaDadeliveryNoResult.data.data.result.deliveryNo,
                            fee: DaDadeliveryNoResult.data.data.result.fee
                          },
                          msg: '成功'
                        };
                      } else {
                        resultObj = {
                          type: 'error',
                          result: DaDadeliveryNoResult.data.data,
                          msg: DaDadeliveryNoResult.data.data.msg
                        };
                      }
                    } else {
                      resultObj = {
                        type: 'error',
                        result: null,
                        msg: DaDadeliveryNoResult.data.msg
                      };
                    }
                  } else {
                    resultObj = {
                      type: 'error',
                      result: null,
                      msg: that.$errorMsg
                    };
                  }
                  _context4.next = 12;
                  break;
                case 11:
                  resultObj = {
                    type: 'error',
                    result: null,
                    msg: '未选地址'
                  };
                case 12:
                  resFn(resultObj);
                case 13:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));
        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    },
    // 提交订单
    payFn: function payFn() {
      var _this3 = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var that, userInfoObj, dada_shansongObj, getDaDadeliveryNoResult, checkRangeResult, ord_price, pay_price, balance_price, pay_type, dingDanJine, shiFuJine, coupon_user_id, isSendImmediately, peisongTime, addressId, objs, result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                that = _this3;
                if (that.qvZhiFuBtnFlag) {
                  _context5.next = 3;
                  break;
                }
                return _context5.abrupt("return", false);
              case 3:
                that.qvZhiFuBtnFlag = false;

                // 没有结算商品不给结算
                if (!(that.selectGoods.length <= 0)) {
                  _context5.next = 8;
                  break;
                }
                uni.showModal({
                  showCancel: false,
                  //不显示取消按钮
                  title: '没有可结算的商品',
                  success: function success(e) {
                    //确认后的回调
                    console.log(e);
                  }
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 8:
                // 到店自提 和 多自提点 需要的 自提人的 名字 手机号
                userInfoObj = {}; // 达达 闪送的参数
                dada_shansongObj = {}; // 达达  闪送
                if (!(that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDada] || that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeShansong])) {
                  _context5.next = 37;
                  break;
                }
                if (!(that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDada] && Math.floor(+new Date() / 1000) - that.getOrderInfoLastTime > 3 * 60)) {
                  _context5.next = 28;
                  break;
                }
                console.log('达达 超时重新获取 达达的参数', '\n');
                that.hideAllFn();
                uni.showLoading({});
                _context5.next = 17;
                return that.getDaDadeliveryNoFn();
              case 17:
                getDaDadeliveryNoResult = _context5.sent;
                if (!(getDaDadeliveryNoResult.type == 'success')) {
                  _context5.next = 24;
                  break;
                }
                that.postFeeData.deliveryNo = getDaDadeliveryNoResult.result.deliveryNo;
                that.postFeeData.fee = getDaDadeliveryNoResult.result.fee;
                that.hideAllFn();
                _context5.next = 28;
                break;
              case 24:
                that.hideAllFn();
                uni.showToast({
                  title: getDaDadeliveryNoResult.msg,
                  icon: 'none'
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 28:
                if (!that.errorMsg.isHas) {
                  _context5.next = 32;
                  break;
                }
                uni.showModal({
                  showCancel: false,
                  //不显示取消按钮
                  title: that.errorMsg.msg,
                  success: function success(e) {
                    //确认后的回调
                    console.log(e);
                  }
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 32:
                dada_shansongObj.order_info = that.postFeeData.order_info;
                dada_shansongObj.deliveryNo = that.postFeeData.deliveryNo;
                dada_shansongObj.fee = that.postFeeData.fee;
                _context5.next = 38;
                break;
              case 37:
                dada_shansongObj = {};
              case 38:
                if (!(that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDuozitidian])) {
                  _context5.next = 47;
                  break;
                }
                if (that.zitidianList.length) {
                  _context5.next = 43;
                  break;
                }
                uni.showToast({
                  icon: 'none',
                  title: "\u81EA\u63D0\u70B9\u5217\u8868\u4E3A\u7A7A"
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 43:
                if (!that.zitidianIsAllNotRange) {
                  _context5.next = 47;
                  break;
                }
                uni.showToast({
                  icon: 'none',
                  title: "\u81EA\u63D0\u70B9\u4E0D\u5728\u914D\u9001\u8303\u56F4\u5185"
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 47:
                if (!(that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeZiti] || that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDuozitidian])) {
                  _context5.next = 58;
                  break;
                }
                if (!(that.shouhuoren.length < 1 || that.shouhuoren.length > 20)) {
                  _context5.next = 52;
                  break;
                }
                uni.showToast({
                  title: '收货人名字长度是1~20',
                  icon: 'none'
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 52:
                if (that.regTel(that.haoma)) {
                  _context5.next = 56;
                  break;
                }
                uni.showToast({
                  title: '请检查手机号格式是否正确',
                  icon: 'none'
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 56:
                userInfoObj.user_name = that.shouhuoren;
                userInfoObj.user_phone = that.haoma;
              case 58:
                if (!(that.checkIsMustAddress && !that.addressIsSet)) {
                  _context5.next = 62;
                  break;
                }
                uni.showToast({
                  icon: 'none',
                  title: '请选择收货地址'
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 62:
                if (!(_const.peiTypeEnumObj[_const.peiTypeShangjia] == that.calcPeiTypeId)) {
                  _context5.next = 71;
                  break;
                }
                console.log('是商家配送开始判断是否在配送范围内');
                _context5.next = 66;
                return that.checkRangeFn(that.addressCoordinate);
              case 66:
                checkRangeResult = _context5.sent;
                if (!(checkRangeResult.type != 'success')) {
                  _context5.next = 71;
                  break;
                }
                uni.showModal({
                  showCancel: false,
                  //不显示取消按钮
                  title: '当前地址不在配送范围内',
                  success: function success(e) {
                    //确认后的回调
                    console.log(e);
                  }
                });
                that.qvZhiFuBtnFlag = true;
                return _context5.abrupt("return", false);
              case 71:
                dingDanJine = (0, _tools.transNumFn)(that.price['订单金额']); // 订单金额
                shiFuJine = (0, _tools.transNumFn)(that.price['实付金额']); // 实付金额
                /*
                // 用户开通会员
                if (that.vipOptionCardIsSelect) {
                	// 订单金额 + 会员卡金额
                	ord_price = bigPlus(dingDanJine, that.vipOptionCardPrice);
                			// 实付金额 + 会员卡金额
                	shiFuJine = bigPlus(shiFuJine, that.vipOptionCardPrice);
                			// 用户不开通会员
                } else {
                	// 订单金额
                	ord_price = dingDanJine;
                }
                */
                // shiFuJine = bigPlus(shiFuJine, that.vipOptionCardPrice);
                ord_price = dingDanJine;

                // console.log('订单金额ord_price', ord_price, typeof ord_price);

                if (that.defaultStatus) {
                  balance_price = that.yve >= shiFuJine ? shiFuJine : that.yve;
                  pay_price = shiFuJine;
                  pay_type = that.yve >= shiFuJine ? 1 : that.payFlag;
                } else {
                  balance_price = 0;
                  pay_price = shiFuJine;
                  pay_type = that.payFlag;
                }
                if (that.coupon_user_id == 'no') {
                  coupon_user_id = 0;
                } else if (that.coupon_user_id == 0) {
                  coupon_user_id = 0;
                } else {
                  coupon_user_id = that.coupon_user_id;
                }

                // 快递传1  商家配送自提 立即送出1  预约2
                isSendImmediately = function () {
                  if (that.isOpenyvyueFun) {
                    // 是否开启预约配送
                    if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeKuaidi]) {
                      return 1;
                    } else {
                      if (that.isTomorrowStr) {
                        return 2;
                      } else {
                        if (that.hoursIndex == 0) {
                          return 1;
                        } else {
                          return 2;
                        }
                      }
                    }
                  } else {
                    return 1;
                  }
                }(); // 传给后台的配送时间
                peisongTime = function () {
                  var newDate = new Date();
                  if (that.isTomorrowStr) {
                    // 明天
                    newDate = newDate.setDate(newDate.getDate() + 1);
                    newDate = new Date(newDate);
                  }
                  var year = newDate.getFullYear();
                  var month = (0, _tools.num2zeroStr)(newDate.getMonth() + 1);
                  var getdate = (0, _tools.num2zeroStr)(newDate.getDate());

                  // let hour = that.calcPickerHoursArr[that.hoursIndex].textStr.replace('~', '-');
                  return "".concat(year, "-").concat(month, "-").concat(getdate, " ").concat(that.pickerSelectHour);
                }();
                addressId = function () {
                  if (that.checkIsMustAddress) {
                    return that.addressId;
                  } else {
                    if (that.calcPeiTypeId == _const.peiTypeEnumObj[_const.peiTypeDuozitidian]) {
                      return (0, _tools.assertObject)(that.zitidianList[that.zitidianActive]).id;
                    }
                    return '';
                  }
                }();
                objs = _objectSpread(_objectSpread(_objectSpread({}, dada_shansongObj), {}, {
                  cart_id: JSON.stringify(that.selectGoods.map(function (item) {
                    return {
                      id: item.id,
                      num: item.number
                    };
                  })),
                  prom_type: 'common',
                  from: 'cart',
                  address_id: addressId,
                  quehuo: that.quehuo[that.quehuoCurr].id,
                  comment: that.textarea,
                  // 订单金额
                  ord_price: ord_price,
                  // 实付金额
                  pay_price: pay_price,
                  // 余额抵扣
                  balance_price: balance_price,
                  pay_type: pay_type,
                  post_type: that.calcPeiTypeId
                }, userInfoObj), {}, {
                  goods_coupon: that.good_coupon_id,
                  coupon_user_id: coupon_user_id,
                  peisong_time: peisongTime,
                  is_send_immediately: isSendImmediately,
                  vip_id: that.vipOptionCardIsSelect ? that.vipOptionCardId : 0
                });
                that.hideAllFn();
                uni.showLoading({});
                console.log('生成订单 /api/order/make_order 接口的参数', objs);
                /*
                return false;
                that.qvZhiFuBtnFlag = true;
                return false;
                 */
                _context5.next = 85;
                return that.$request({
                  method: 'POST',
                  url: '/api/order/make_order',
                  data: objs
                });
              case 85:
                result = _context5.sent;
                console.log('生成订单 /api/order/make_order 接口的返回的数据', result);
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    if (result.data.data && result.data.data.ord_id) {
                      that.selectGoods.forEach(function (item) {
                        uni.$emit('goodsAddCartEd', {
                          goodsId: item.goodsId,
                          selectedNum: 0
                        });
                      });
                      console.log('navigateToFn__after', '\n');
                      that.hideAllFn();
                      that.qvZhiFuBtnFlag = true;
                      that.navigateToFn({
                        url: "/pages/order-state/zhifu?ord_id=".concat(result.data.data.ord_id),
                        type: 'redirectTo'
                      });
                    } else {
                      that.hideAllFn();
                      uni.showModal({
                        showCancel: false,
                        //不显示取消按钮
                        title: result.data.msg,
                        success: function success(e) {
                          //确认后的回调
                          console.log(e);
                          that.toBackFn();
                        }
                      });
                    }
                  } else {
                    that.qvZhiFuBtnFlag = true;
                    that.hideAllFn();
                    uni.showModal({
                      showCancel: false,
                      //不显示取消按钮
                      title: result.data.msg,
                      success: function success(e) {
                        //确认后的回调
                        that.toBackFn();
                      }
                    });
                  }
                } else {
                  that.hideAllFn();
                  uni.showToast({
                    icon: 'none',
                    title: that.$errorMsg
                  });
                }
                that.qvZhiFuBtnFlag = true;
              case 89:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }))();
    },
    // 选择会员卡
    selectVipOptionCardFn: function selectVipOptionCardFn(e) {
      var that = this;
      that.vipOptionCardIsSelect = e;
      that.defaultStatus = false;
      that.setDefaultPayTypeFn();
      that.getOrderInfoFn(function () {}, true);
    },
    // ↓↓预约配送组件 相关方法=============================================
    pickerViewChangeFn: function pickerViewChangeFn(e) {
      var that = this;
      var daysIndex = e.daysIndex,
        hoursIndex = e.hoursIndex;
      that.daysIndex = daysIndex;
      that.hoursIndex = hoursIndex;
    },
    pickerViewClickFn: function pickerViewClickFn() {
      var that = this;
      that.cancelIndexDays = that.daysIndex; // 选择前的天数索引
      that.cancelIndexhours = that.hoursIndex; // 选择前的小时索引
    },
    pickerViewCancelFn: function pickerViewCancelFn() {
      var that = this;
      that.daysIndex = that.cancelIndexDays; // 选择前的天数索引
      that.hoursIndex = that.cancelIndexhours; // 选择前的小时索引
    },
    pickerViewColumnchangeFn: function pickerViewColumnchangeFn(e) {
      var that = this;
      var keyStr = e.keyStr,
        value = e.value;
      that[keyStr] = value;
    },
    isTomorrowStrFn: function isTomorrowStrFn(e) {
      var that = this;
      var isTomorrowStr = e.isTomorrowStr,
        pickerSelectHour = e.pickerSelectHour;
      that.isTomorrowStr = isTomorrowStr;
      that.pickerSelectHour = pickerSelectHour;
    },
    // ↓↓ 多自提点 相关方法=============================================
    // 设置 自提点列表 模态框 的隐藏 显示 状态
    setduozitiModalFlagFn: function setduozitiModalFlagFn(bool) {
      this.duozitiModalFlag = bool;
    },
    // 选择自提点
    selectZitiFn: function selectZitiFn(index) {
      this.zitidianActive = index;
      this.setduozitiModalFlagFn(false);
    },
    /*
    	@description 是否可以使用余额支付 当前平台没有对应的第三方支付 只能使用余额支付的情况下 根据当前订单要付的钱数来提示对应的内容
    	@return { Object }
    		当result 为 真时表示可以使用余额支付
    		当result 为 假时表示不能支付购买弹出对应的msg消息
    */
    checkUseYve: function checkUseYve() {
      var that = this;
      var shiFuJine = (0, _tools.transNumFn)(that.price['实付金额']); // 实付金额

      // 用户使用余额支付并且 余额足够支付当前订单的总价格
      if (that.defaultStatus && shiFuJine <= that.yve) {
        return {
          result: true
        };
      } else {
        var title;
        // 用户使用余额支付 但是余额不够
        if (that.defaultStatus) {
          title = '余额不足';
        } else {
          // 不用余额支付 余额不够
          if (shiFuJine > that.yve) {
            title = '余额不足';
          } else {
            // 不用余额支付余额够 客户想用微信支付
          }
        }
        return {
          result: false,
          msg: title
        };
      }
    }
  },
  // ↑↑↑↑↑methods 结束
  computed: {
    /*
    	返回 Id 值
    		0 商家配送
    		1 自提
    		2 快递
    		3 达达
    		4 闪送
    		5 多自提点
    		400 表示配送方式的数组是空
    */
    calcPeiTypeId: function calcPeiTypeId() {
      var that = this;
      if (that.peiTypeArr.length) {
        return that.peiTypeArr[that.peiTypeActive].id;
      } else {
        return 400;
      }
    },
    // 计算费用
    calcPostFee: function calcPostFee() {
      var that = this;
      if (that.calcPeiTypeId === _const.peiTypeEnumObj[_const.peiTypeDada]) {
        // 达达
      } else if (that.calcPeiTypeId === _const.peiTypeEnumObj[_const.peiTypeShansong]) {
        // 闪送
      }
      return 1;
    },
    // 根据条件 判断 文本域 显示隐藏
    calcShowtextarea: function calcShowtextarea() {
      if (this.isShowLoading) {
        return false;
      }
      if (this.isShowCouponModal == false && this.isShowGoodsCouponModal == false) {
        return true;
      }
      return false;
    },
    // 是否免配送
    mianpeisong: function mianpeisong() {
      if (this.price['配送费'] && this.price['配送费'] - 0 > 0) {
        return false;
      }
      return true;
    },
    // 是否免快递
    miankuaidi: function miankuaidi() {
      if (this.price['运费'] && this.price['运费'] - 0 > 0) {
        return false;
      }
      return true;
    },
    // 展示 出的 couponMsg
    couponMsg: function couponMsg() {
      if (this.price['优惠券'] - 0 == 0) {
        if (this.pageCont == 1) {
          if (this.price['商品券'] - 0 > 0) {
            return "\u5DF2\u4F7F\u7528\u5546\u54C1\u5238\u8FDB\u884C\u4F18\u60E0";
          } else {
            return "\u65E0\u53EF\u7528\u4F18\u60E0\u5238";
          }
        } else {
          if (that.coupon_user_id == 0) {
            return "\u65E0\u53EF\u7528\u4F18\u60E0\u5238";
          } else if (that.coupon_user_id == 'no') {
            var len = this.coupon.filter(function (item) {
              return item.is_use == true;
            }).length;
            if (len == 0) {
              if (this.price['商品券'] - 0 > 0) {
                return "\u5DF2\u4F7F\u7528\u5546\u54C1\u5238\u8FDB\u884C\u4F18\u60E0";
              } else {
                return "\u65E0\u53EF\u7528\u4F18\u60E0\u5238";
              }
            }
            return "".concat(len, "\u5F20\u4F18\u60E0\u5238\u53EF\u7528");
          } else {
            if (this.price['商品券'] - 0 > 0) {
              return "\u5DF2\u4F7F\u7528\u5546\u54C1\u5238\u8FDB\u884C\u4F18\u60E0";
            } else {
              return "\u65E0\u53EF\u7528\u4F18\u60E0\u5238";
            }
          }
        }
      } else {
        return "\u5DF2\u4F18\u60E0\uFFE5".concat(this.price['优惠券']);
      }
    },
    // 展示 出的 goodsCouponMsg
    goodsCouponMsg: function goodsCouponMsg() {
      var that = this;
      if (that.price['商品券'] - 0 != 0) {
        return "\u5DF2\u4F18\u60E0\uFFE5".concat(that.price['商品券']);
      } else {
        var hasUseCount = that.goods_coupon.length;
        return "".concat(hasUseCount, "\u5F20\u5546\u54C1\u5238\u53EF\u7528");
      }
    },
    price_hy_yh: function price_hy_yh() {
      return (0, _tools.transNumFn)(this.price['会员优惠']);
    },
    price_goods_spyh: function price_goods_spyh() {
      return (0, _tools.transNumFn)(this.price['商品优惠']);
    },
    price_sfje: function price_sfje() {
      return (0, _tools.transNumFn)(this.price['实付金额']);
    },
    // 返回 待支付 合计的钱数
    hejiPrice: function hejiPrice() {
      var that = this;
      // let shiFuJine = transNumFn(that.price['实付金额']); // 实付金额
      var allShiFuJine = (0, _tools.transNumFn)(that.price['实付金额']); // 实付金额

      // allShiFuJine 实付金额 + 会员卡金额
      // let allShiFuJine = that.vipOptionCardIsSelect ? bigPlus(shiFuJine, that.vipOptionCardPrice) : shiFuJine;

      if (that.defaultStatus) {
        return that.yve >= allShiFuJine ? 0 : (0, _tools.bigMinus)(allShiFuJine, that.yve);
      } else {
        return allShiFuJine;
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
    isShowAddress: function isShowAddress() {
      var _peiTypeList;
      var that = this;
      var peiTypeList = (_peiTypeList = {}, (0, _defineProperty2.default)(_peiTypeList, _const.peiTypeEnumObj[_const.peiTypeShangjia], true), (0, _defineProperty2.default)(_peiTypeList, _const.peiTypeEnumObj[_const.peiTypeShansong], true), (0, _defineProperty2.default)(_peiTypeList, _const.peiTypeEnumObj[_const.peiTypeDada], true), (0, _defineProperty2.default)(_peiTypeList, _const.peiTypeEnumObj[_const.peiTypeKuaidi], true), (0, _defineProperty2.default)(_peiTypeList, _const.peiTypeEnumObj[_const.peiTypeZiti], false), (0, _defineProperty2.default)(_peiTypeList, _const.peiTypeEnumObj[_const.peiTypeDuozitidian], false), _peiTypeList);
      return peiTypeList[that.calcPeiTypeId];
    },
    /*
    	@description
    		自提点列表是否全部 不在范围内
    	@return <Boolean>
    		返回 false 表示 有可用的自提点在范围内
    		返回 true 表示 没有可用的自提点在范围内
    */
    zitidianIsAllNotRange: function zitidianIsAllNotRange() {
      return this.zitidianList.every(function (i) {
        return !i.isRange;
      });
    },
    currentzitidianInfo: function currentzitidianInfo() {
      return this.zitidianList[this.zitidianActive];
    },
    /*
      @description
    	检查 当前选择的配送方式 是否必须需要配送地址
      @return <Boolean>
    	true 表示当前选择的配送方式 必须填配送地址
    	false 表示当前选择的配送方式 可以不填配送地址
    */
    checkIsMustAddress: function checkIsMustAddress() {
      var _enumObj;
      var enumObj = (_enumObj = {}, (0, _defineProperty2.default)(_enumObj, _const.peiTypeEnumObj[_const.peiTypeShangjia], true), (0, _defineProperty2.default)(_enumObj, _const.peiTypeEnumObj[_const.peiTypeKuaidi], true), (0, _defineProperty2.default)(_enumObj, _const.peiTypeEnumObj[_const.peiTypeDada], true), (0, _defineProperty2.default)(_enumObj, _const.peiTypeEnumObj[_const.peiTypeShansong], true), (0, _defineProperty2.default)(_enumObj, _const.peiTypeEnumObj[_const.peiTypeZiti], false), (0, _defineProperty2.default)(_enumObj, _const.peiTypeEnumObj[_const.peiTypeDuozitidian], false), _enumObj);
      return enumObj[this.calcPeiTypeId];
    }
  } // ↑↑↑↑↑ computed 结束
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 95:
/*!***********************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue?vue&type=style&index=0&id=0ca91b30&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./index.vue?vue&type=style&index=0&id=0ca91b30&lang=scss&scoped=true& */ 96);
/* harmony import */ var _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_E_HBuilderX_2_6_9_20200403_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_index_vue_vue_type_style_index_0_id_0ca91b30_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 96:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/index.vue?vue&type=style&index=0&id=0ca91b30&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[89,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-toutiao/pages/order/index.js.map