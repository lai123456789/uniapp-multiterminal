(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 14));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 23);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = tt.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _tt$getSystemInfoSync = tt.getSystemInfoSync(),
    platform = _tt$getSystemInfoSync.platform,
    pixelRatio = _tt$getSystemInfoSync.pixelRatio,
    windowWidth = _tt$getSystemInfoSync.windowWidth; // uni=>tt runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
var EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {
    var _this2 = this;
    (0, _classCallCheck2.default)(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this2.on(name, events[name]);
      });
    }
  }
  (0, _createClass2.default)(EventChannel, [{
    key: "emit",
    value: function emit(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {
        return opt.type !== 'once';
      });
    }
  }, {
    key: "on",
    value: function on(eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    }
  }, {
    key: "off",
    value: function off(eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    }
  }, {
    key: "_clearCache",
    value: function _clearCache(eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    }
  }, {
    key: "_addListener",
    value: function _addListener(eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type
      });
    }
  }]);
  return EventChannel;
}();
var eventChannels = {};
var eventChannelStack = [];
var id = 0;
function initEventChannel(events) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}
function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  }
};
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || tt.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    tt.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-toutiao".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序",
    appVersion: "3.1",
    appVersionCode: "40",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.18",
    uniRuntimeVersion: "3.6.18",
    uniPlatform: undefined || "mp-toutiao",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = "mp-toutiao".split('-')[1];
  var _hostName = result.hostName || _platform; // mp-jd
  {
    _hostName = result.appName;
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var oName = 'getUserInfo';
var nName = 'getUserProfile';
var getUserProfile = {
  name: tt.canIUse(nName) ? nName : oName
};

// 不支持的 API 列表
var todos = ['preloadPage', 'unPreloadPage', 'loadSubPackage'
// 'createCameraContext',
// 'createLivePlayerContext',
// 'getSavedFileInfo',
// 'createMapContext',
// 'onMemoryWarning',
// 'onGyroscopeChange',
// 'startGyroscope',
// 'stopGyroscope',
// 'setScreenBrightness',
// 'getScreenBrightness',
// 'addPhoneContact',
// 'openBluetoothAdapter',
// 'startBluetoothDevicesDiscovery',
// 'onBluetoothDeviceFound',
// 'stopBluetoothDevicesDiscovery',
// 'onBluetoothAdapterStateChange',
// 'getConnectedBluetoothDevices',
// 'getBluetoothDevices',
// 'getBluetoothAdapterState',
// 'closeBluetoothAdapter',
// 'writeBLECharacteristicValue',
// 'readBLECharacteristicValue',
// 'onBLEConnectionStateChange',
// 'onBLECharacteristicValueChange',
// 'notifyBLECharacteristicValueChange',
// 'getBLEDeviceServices',
// 'getBLEDeviceCharacteristics',
// 'createBLEConnection',
// 'closeBLEConnection',
// 'onBeaconServiceChange',
// 'onBeaconUpdate',
// 'getBeacons',
// 'startBeaconDiscovery',
// 'stopBeaconDiscovery',
// 'showNavigationBarLoading',
// 'hideNavigationBarLoading',
// 'setTabBarItem',
// 'setTabBarStyle',
// 'hideTabBar',
// 'showTabBar',
// 'setTabBarBadge',
// 'removeTabBarBadge',
// 'showTabBarRedDot',
// 'hideTabBarRedDot',
// 'setBackgroundColor',
// 'setBackgroundTextStyle',
// 'chooseInvoiceTitle',
// 'addTemplate',
// 'deleteTemplate',
// 'getTemplateLibraryById',
// 'getTemplateLibraryList',
// 'getTemplateList',
// 'sendTemplateMessage',
// 'setEnableDebug',
// 'onWindowResize',
// 'offWindowResize',
// 'createOffscreenCanvas',
// 'vibrate'
];

// 存在兼容性的 API 列表
// 头条小程序自1.35.0+支持canIUses
var canIUses = [
  // 'createIntersectionObserver',
  // 'getSavedFileList',
  // 'removeSavedFile',
  // 'hideKeyboard',
  // 'getImageInfo',
  // 'createVideoContext',
  // 'onSocketOpen',
  // 'onSocketError',
  // 'sendSocketMessage',
  // 'onSocketMessage',
  // 'closeSocket',
  // 'onSocketClose',
  // 'getExtConfig',
  // 'getExtConfigSync',
  // 'navigateToMiniProgram',
  // 'navigateBackMiniProgram',
  // 'compressImage',
  // 'chooseLocation',
  // 'openDocument',
  // 'onUserCaptureScreen',
  // 'getBackgroundAudioManager',
  // 'setNavigationBarColor',
];

// 需要做转换的 API 列表
var protocols = {
  chooseImage: {
    args: {
      sizeType: false
    }
  },
  navigateTo: navigateTo,
  redirectTo: redirectTo,
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  getUserProfile: getUserProfile,
  connectSocket: {
    args: {
      method: false
    }
  },
  chooseVideo: {
    args: {
      camera: false
    }
  },
  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false
    }
  },
  startAccelerometer: {
    args: {
      interval: false
    }
  },
  showToast: {
    args: {
      image: false,
      mask: false
    }
  },
  showLoading: {
    args: {
      mask: false
    }
  },
  showModal: {
    args: {
      cancelColor: false,
      confirmColor: false
    }
  },
  showActionSheet: {
    args: {
      itemColor: false
    }
  },
  login: {
    args: {
      scopes: false,
      timeout: false
    }
  },
  getUserInfo: {
    args: {
      lang: false,
      timeout: false
    }
  },
  requestPayment: {
    name: tt.pay ? 'pay' : 'requestPayment',
    args: {
      orderInfo: tt.pay ? 'orderInfo' : 'data'
    }
  },
  getFileInfo: {
    args: {
      digestAlgorithm: false
    }
  }
};
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5934\u6761\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5934\u6761\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = tt[methodName].apply(tt, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['toutiao'],
  share: ['toutiao'],
  payment: ['toutiao'],
  push: ['toutiao']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
function createMediaQueryObserver() {
  var mediaQueryObserver = {};
  var _tt$getSystemInfoSync2 = tt.getSystemInfoSync(),
    windowWidth = _tt$getSystemInfoSync2.windowWidth,
    windowHeight = _tt$getSystemInfoSync2.windowHeight;
  var orientation = windowWidth < windowHeight ? 'portrait' : 'landscape';
  mediaQueryObserver.observe = function (options, callback) {
    var matches = true;
    for (var item in options) {
      var itemValue = item === 'orientation' ? options[item] : Number(options[item]);
      if (options[item] !== '') {
        if (item === 'width') {
          if (itemValue === windowWidth) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minWidth') {
          if (windowWidth >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxWidth') {
          if (windowWidth <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'height') {
          if (itemValue === windowHeight) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'minHeight') {
          if (windowHeight >= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'maxHeight') {
          if (windowHeight <= itemValue) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
        if (item === 'orientation') {
          if (options[item] === orientation) {
            matches = true;
          } else {
            matches = false;
            callback(matches);
            return matches;
          }
        }
      }
    }
    callback(matches);
    return matches;
  };
  mediaQueryObserver.disconnect = function () {};
  return mediaQueryObserver;
}

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createMediaQueryObserver: createMediaQueryObserver,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    }
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  {
    // fix by Lxh 字节自定义组件Component构造器文档上写有created，但是实测只触发了lifetimes上的created
    isComponent && options.lifetimes && options.lifetimes[name] && (options = options.lifetimes);
  }
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options, true);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "tt".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      // 用于字节跳动小程序模拟抽象节点
      properties.generic = {
        type: Object,
        value: null
      };
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this3 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this3.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this3.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this3.route || _this3.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this3.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel$1() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };
  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };
  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel$1();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-toutiao";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(tt.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
var mocks = ['__route__', '__webviewId__', '__nodeid__', '__nodeId__'];
function isPage() {
  return this.__nodeid__ === 0 || this.__nodeId__ === 0;
}
function initRefs$1(vm) {
  var mpInstance = vm.$scope;
  /* eslint-disable no-undef */
  var minorVersion = parseInt(tt.getSystemInfoSync().SDKVersion.split('.')[1]);
  if (minorVersion > 16) {
    initRefs(vm);
  } else {
    mpInstance.selectAllComponents('.vue-ref', function (components) {
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        vm.$refs[ref] = component.$vm || toSkip(component);
      });
    });
    mpInstance.selectAllComponents('.vue-ref-in-for', function (forComponents) {
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!vm.$refs[ref]) {
          vm.$refs[ref] = [];
        }
        vm.$refs[ref].push(component.$vm || toSkip(component));
      });
    });
  }
}
var instances = Object.create(null);
var components = Object.create(null);
function initRelation(_ref5) {
  var vuePid = _ref5.vuePid,
    mpInstance = _ref5.mpInstance;
  // 头条 triggerEvent 后，接收事件时机特别晚，已经到了 ready 之后
  var nodeId = (mpInstance.__nodeId__ || mpInstance.__nodeid__) + '';
  var webviewId = mpInstance.__webviewId__ + '';
  instances[webviewId + '_' + nodeId] = mpInstance.$vm;
  this.triggerEvent('__l', {
    vuePid: vuePid,
    nodeId: nodeId,
    webviewId: webviewId
  });
}
function handleLink$1(_ref6) {
  var _ref6$detail = _ref6.detail,
    vuePid = _ref6$detail.vuePid,
    nodeId = _ref6$detail.nodeId,
    webviewId = _ref6$detail.webviewId;
  var vm = instances[webviewId + '_' + nodeId];
  if (!vm) {
    return;
  }
  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vm.$parent = parentVm;
  vm.$root = parentVm.$root;
  parentVm.$children.push(vm);
  vm.__call_hook('created');
  vm.__call_hook('beforeMount');
  vm._isMounted = true;
  vm.__call_hook('mounted');
  vm.__call_hook('onReady');
}
function parseApp(vm) {
  _vue.default.prototype._$fallback = true; // 降级（调整原 vue 的部分生命周期，如 created，beforeMount,inject,provide）

  _vue.default.mixin({
    created: function created() {
      // 处理 injections,头条 triggerEvent 是异步，且触发时机很慢，故延迟 relation 设置
      if (this.mpType !== 'app') {
        if (this.mpType === 'page' && !this.$scope.route && this.$scope.__route__) {
          this.$scope.route = this.$scope.__route__;
        }
        initRefs$1(this);
        this.__init_injections(this);
        this.__init_provide(this);
      }
    }
  });
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: function initRefs() {} // attached 时，可能查询不到
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref7.isPage,
    initRelation = _ref7.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function currentComponents(mpInstance, callback) {
  var webviewId = mpInstance.__webviewId__;
  var currentComponents = components[webviewId];
  if (currentComponents) {
    callback(currentComponents);
  }
}
function parseComponent(vueComponentOptions, needVueOptions) {
  var _parseBaseComponent = parseBaseComponent(vueComponentOptions, {
      isPage: isPage,
      initRelation: initRelation
    }, true),
    _parseBaseComponent2 = (0, _slicedToArray2.default)(_parseBaseComponent, 3),
    componentOptions = _parseBaseComponent2[0],
    vueOptions = _parseBaseComponent2[1],
    VueComponent = _parseBaseComponent2[2];
  var lifetimes = componentOptions.lifetimes;

  // 基础库 2.0 以上 attached 顺序错乱，按照 created 顺序强制纠正
  lifetimes.created = function created() {
    var _this4 = this;
    currentComponents(this, function (components) {
      components.push(_this4);
    });
  };
  lifetimes.attached = function attached() {
    var _this5 = this;
    this.__lifetimes_attached = function () {
      var properties = this.properties;
      var options = {
        mpType: isPage.call(this) ? 'page' : 'component',
        mpInstance: this,
        propsData: properties
      };
      initVueIds(properties.vueId, this);

      // 初始化 vue 实例
      this.$vm = new VueComponent(options);

      // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
      initSlots(this.$vm, properties.vueSlots);

      // 处理父子关系
      initRelation.call(this, {
        vuePid: this._$vuePid,
        mpInstance: this
      });

      // 触发首次 setData
      this.$vm.$mount();
    };
    currentComponents(this, function (components) {
      var component = _this5;
      while (component && component.__lifetimes_attached && components[0] && component === components[0]) {
        components.shift();
        component.__lifetimes_attached();
        delete component.__lifetimes_attached;
        component = components[0];
      }
    });
  };
  var oldDetached = lifetimes.detached;
  lifetimes.detached = function detached() {
    var _this6 = this;
    if (typeof oldDetached === 'function') {
      oldDetached.call(this);
    }
    currentComponents(this, function (components) {
      var index = components.indexOf(_this6);
      if (index >= 0) {
        components.splice(index, 1);
      }
    });
  };

  // ready 比 handleLink 还早，初始化逻辑放到 handleLink 中
  delete lifetimes.ready;
  componentOptions.methods.__l = handleLink$1;
  return needVueOptions ? [componentOptions, vueOptions] : componentOptions;
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  var pageOptions = parseBasePage(vuePageOptions);
  var lifetimes = pageOptions.lifetimes;
  var oldCreated = lifetimes.created;
  lifetimes.created = function created() {
    var webviewId = this.__webviewId__;
    components[webviewId] = [];
    if (typeof oldCreated === 'function') {
      oldCreated.call(this);
    }
  };
  // 页面需要在 ready 中触发，其他组件是在 handleLink 中触发
  lifetimes.ready = function ready() {
    if (this.$vm && this.$vm.mpType === 'page') {
      this.$vm.__call_hook('created');
      this.$vm.__call_hook('beforeMount');
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted');
      this.$vm.__call_hook('onReady');
    } else {
      this.is && console.warn(this.is + ' is not ready');
    }
  };
  var oldDetached = lifetimes.detached;
  lifetimes.detached = function detached() {
    if (typeof oldDetached === 'function') {
      oldDetached.call(this);
    }
    // 清理
    var webviewId = this.__webviewId__;
    webviewId && Object.keys(instances).forEach(function (key) {
      if (key.indexOf(webviewId + '_') === 0) {
        delete instances[key];
      }
    });
    delete components[webviewId];
  };
  return pageOptions;
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && tt.onAppShow) {
    tt.onAppShow(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && tt.onAppHide) {
    tt.onAppHide(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && tt.onAppShow) {
    tt.onAppShow(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && tt.onAppHide) {
    tt.onAppHide(function () {
      for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = tt.getLaunchOptionsSync && tt.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!tt.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-toutiao" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, tt[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(tt).forEach(function (name) {
    if (hasOwn(tt, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, tt[name]));
    }
  });
}
tt.createApp = createApp;
tt.createPage = createPage;
tt.createComponent = createComponent;
tt.createSubpackageApp = createSubpackageApp;
tt.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 10:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 103:
/*!*******************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order-fun/getOneStorePageData.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneStorePageData = getOneStorePageData;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
var _submitOrderEnum = __webpack_require__(/*! @/pages/order/submit-order-enum.js */ 104);
var _order = __webpack_require__(/*! @/pages/order/submit-order-fun/order.js */ 105);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 订单相关方法

/*
	@description 获取单店提交订单页面展示基本数据
	@param
		客户端设备的经度信息
		longitude <Number> 纬度
		latitude <Number>  经度
	@return Promise
*/

function getOneStorePageData(that, longitude, latitude) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn) {
      var _codeEnum;
      var result, successState, notRangeState, errorState, codeEnum, _addressObject, _handleAddrFn, _handleDiscountCoupon, resultObject, isRange, infoResult, infoPrinfResult, shifuGoodsPrice, dispatchTypeList, addressEnum, addressObject, addressInfo, addressResObj, addressTypeText, currentAddr, handleAddrFn, yvyueResult, yvyueType, yvyueData, orderInfoResult, dispFeeResult, dispFeeType, dispFeePriceNum, discountCouponResult, discountCouponCode, discountCouponUserId, discountCouponList, discountCouponIndex, handleDiscountCouponFn, shifu, allDiscountsPrice, useCouponPrice, goodsList;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return that.$request({
                method: 'post',
                url: '/api/Orderbranch/orderPre',
                data: {
                  lon: longitude,
                  lat: latitude
                }
              });
            case 2:
              result = _context.sent;
              console.log('/api/Orderbranch/orderPre 接口返回数据', result);
              //数据返回后 处理方式  处理数据
              successState = 'successState', notRangeState = 'notRangeState', errorState = 'errorState'; // 失败
              codeEnum = (_codeEnum = {}, (0, _defineProperty2.default)(_codeEnum, 50001, notRangeState), (0, _defineProperty2.default)(_codeEnum, 200, successState), _codeEnum);
              if (result.statusCode == 200) {
                if (codeEnum[result.data.code] == successState || codeEnum[result.data.code] == notRangeState) {
                  resultObject = (0, _tools.assertObject)(result.data.data); // 是否在配送范围内
                  isRange = codeEnum[result.data.code] == notRangeState ? false : true; // 商品实付金额
                  infoResult = (0, _tools.assertObject)(resultObject.info);
                  infoPrinfResult = (0, _tools.assertObject)(infoResult.prinf);
                  shifuGoodsPrice = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(infoPrinfResult.total_price)); // ↓↓↓ 配送方式数组
                  dispatchTypeList = (0, _tools.assertArray)(resultObject.dm).map(function (i) {
                    var dispatchTypeItem = (0, _tools.assertObject)(i);
                    return {
                      id: dispatchTypeItem.id,
                      name: dispatchTypeItem.name
                    };
                  }); // ↓↓↓ 收货地址 | 自提地址 | 自提点
                  addressEnum = {
                    '1': _submitOrderEnum.userAdrs,
                    '2': _submitOrderEnum.userAdrs,
                    '3': _submitOrderEnum.sellerAdrs,
                    '4': _submitOrderEnum.zitiAdrs
                  };
                  addressObject = (_addressObject = {}, (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.userAdrs, {
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
                    addressCoordinate: '' // 收货地址经纬度
                  }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.sellerAdrs, {
                    sellerImage: '',
                    sellerName: '',
                    sellerTel: '',
                    sellerOpenTime: '',
                    sellerAddress: ''
                  }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.zitiAdrs, []), _addressObject);
                  addressInfo = (0, _tools.assertObject)(resultObject.dmio); // 四种方式对应的地址信息
                  addressResObj = (0, _tools.assertObject)(addressInfo.data); // data数据
                  addressTypeText = addressEnum[(0, _tools.transNumFn)(addressInfo.type)]; // 类型数字对应的枚举字符串
                  currentAddr = addressObject[addressTypeText]; // 当前地址信息
                  addressObject.addressTypeText = addressTypeText;
                  handleAddrFn = (_handleAddrFn = {}, (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.userAdrs, function () {
                    if ((0, _tools.checkTypeFn)(addressResObj) == 'Object' && Object.keys(addressResObj).length) {
                      currentAddr.addressIsSet = true;
                      currentAddr.addressId = addressResObj.id;
                      currentAddr.addressUserName = addressResObj.name;
                      currentAddr.addressUserTel = addressResObj.mobile;
                      currentAddr.addressTagName = addressResObj.tag_name;
                      currentAddr.addressText = addressResObj.address;
                      currentAddr.addressCoordinate = addressResObj.coordinate;
                    } else {
                      currentAddr.addressIsSet = false;
                    }
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.sellerAdrs, function () {
                    currentAddr.sellerImage = addressResObj.shop_image;
                    currentAddr.sellerName = addressResObj.shop_name;
                    currentAddr.sellerTel = addressResObj.mobile;
                    currentAddr.sellerOpenTime = addressResObj.shop_bh;
                    currentAddr.sellerAddress = addressResObj.shop_detail_address;
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.zitiAdrs, function () {
                    var zitiList = (0, _tools.assertArray)(addressResObj.list).map(function (i, k) {
                      return {
                        id: i.id,
                        zitidianImage: i.img,
                        isRange: i.is_range == 1,
                        zitidianName: i.name,
                        zitidianDist: i.dist,
                        zitidianTime: i.bh,
                        zitidianAddressText: i.address
                      };
                    });
                    currentAddr.push.apply(currentAddr, (0, _toConsumableArray2.default)(zitiList));
                  }), _handleAddrFn);
                  handleAddrFn[addressTypeText]();

                  // ↓↓↓ 预约配送数据
                  yvyueResult = (0, _tools.assertObject)(resultObject.pt);
                  yvyueType = _submitOrderEnum.yvyueTypeEnum[yvyueResult.code];
                  if (yvyueType == _submitOrderEnum.dspcnow) {
                    yvyueData = yvyueResult.data;
                  } else {
                    yvyueData = (0, _tools.assertArray)(yvyueResult.data).map(function (i) {
                      var item = (0, _tools.assertObject)(i);
                      var timeList = (0, _tools.assertArray)(item.list).map(function (tim) {
                        var time = (0, _tools.assertObject)(tim);
                        return {
                          text: time.text,
                          timeId: time.value
                        };
                      });
                      return {
                        text: item.title,
                        timeList: timeList
                      };
                    });
                  }

                  // ↓↓↓ 商品价格 优惠价格 待支付 总优惠
                  orderInfoResult = (0, _tools.assertObject)(resultObject.order_info); // ↓↓↓ 配送费相关
                  dispFeeResult = (0, _tools.assertObject)(resultObject.freight);
                  dispFeeType = _submitOrderEnum.dispFeeTypeEnum[dispFeeResult.type];
                  dispFeePriceNum = dispFeeType == _submitOrderEnum.dispFeeShow ? (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(dispFeeResult.price)) : 0; // ↓↓↓ 优惠券相关
                  discountCouponResult = (0, _tools.assertObject)(resultObject.coupon);
                  discountCouponCode = (0, _tools.transNumFn)(discountCouponResult.code);
                  discountCouponUserId = (0, _tools.assertObject)(discountCouponResult.info).coupon_user_id;
                  discountCouponList = (0, _tools.assertArray)(discountCouponResult.list).map(function (i) {
                    var discountCouponMoney = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(i.money)); // 优惠券面值多少钱

                    var discountCouponIsUse = i.is_use == 1; // 是否可用
                    var useCouponPrice; // 当前优惠券可优惠并抵扣的金额
                    if (discountCouponIsUse) {
                      if (shifuGoodsPrice >= discountCouponMoney) {
                        useCouponPrice = discountCouponMoney;
                      } else {
                        useCouponPrice = shifuGoodsPrice;
                      }
                    } else {
                      useCouponPrice = 0;
                    }
                    return {
                      discountCouponUserId: i.coupon_user_id,
                      // 关联id
                      discountCouponName: i.coupon_name,
                      // 【名字】
                      discountCouponRightTitle: i.coupon_title,
                      // 名字后标题
                      discountCouponUseType: i.user_coupon_use_type,
                      // 类型
                      discountCouponUseRange: i.goods_range_title,
                      // 范围
                      discountCouponUseTime: i.indate,
                      // 时间
                      discountCouponMoney: discountCouponMoney,
                      discountCouponLeftTitle: i.title,
                      // 红包上标题
                      discountCouponNotUseMsg: (0, _order.getCouponNotUseMsg)(i.not_reason),
                      // 不可以原因
                      discountCouponIsUse: discountCouponIsUse,
                      useCouponPrice: useCouponPrice
                    };
                  });
                  handleDiscountCouponFn = (_handleDiscountCoupon = {}, (0, _defineProperty2.default)(_handleDiscountCoupon, 0, function _() {
                    discountCouponIndex = -1;
                  }), (0, _defineProperty2.default)(_handleDiscountCoupon, 1, function _() {
                    discountCouponIndex = discountCouponList.findIndex(function (i) {
                      return i.discountCouponUserId == discountCouponUserId;
                    });
                  }), _handleDiscountCoupon);
                  handleDiscountCouponFn[discountCouponCode]();

                  // 处理实付金额
                  shifu = (0, _tools.transNumFn)(orderInfoResult.pay_price);
                  allDiscountsPrice = (0, _tools.transNumFn)(orderInfoResult.total_discounts_price);
                  if (discountCouponIndex >= 0) {
                    useCouponPrice = discountCouponList[discountCouponIndex].useCouponPrice;
                    shifu = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)((0, _tools.bigPlus)(shifu, useCouponPrice)));
                    allDiscountsPrice = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)((0, _tools.bigMinus)(allDiscountsPrice, useCouponPrice)));
                  }

                  // 有配送费时
                  if (dispFeeType == _submitOrderEnum.dispFeeShow) {
                    shifu = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)((0, _tools.bigMinus)(shifu, dispFeePriceNum)));
                  }

                  // 商品列表
                  goodsList = (0, _tools.assertArray)(resultObject.goods_list).map(function (item) {
                    return {
                      goodsId: item.goods_id,
                      goodsImg: item.original_img,
                      goodsName: item.goods_name,
                      specName: item.spec_name,
                      cartNum: item.cart_num,
                      goodsPrice: item.shop_price
                    };
                  });
                  resFn({
                    type: 'success',
                    msg: result.data.msg,
                    result: _objectSpread(_objectSpread({
                      dispatchTypeList: dispatchTypeList
                    }, addressObject), {}, {
                      // 商品列表
                      goodsList: goodsList,
                      // 失效商品列表
                      loseGoodsList: (0, _tools.assertArray)(resultObject.lose_goods).map(function (item) {
                        return {
                          goodsImg: item.original_img,
                          goodsName: item.goods_name,
                          specName: item.spec_name,
                          loseMsg: item.reason,
                          goodsPrice: item.shop_price
                        };
                      }),
                      yve: (0, _tools.transNumFn)((0, _tools.assertObject)(resultObject.user_info).money),
                      yvyueType: yvyueType,
                      yvyueData: yvyueData,
                      ziyingGoodsAllPrice: (0, _tools.transNumFn)(orderInfoResult.goods_price),
                      ziyingGoodsDiscountsPrice: (0, _tools.transNumFn)(orderInfoResult.goods_discounts_price),
                      shifu: shifu,
                      allDiscountsPrice: allDiscountsPrice,
                      dispFeeType: dispFeeType,
                      dispFeeTip: dispFeeResult.text,
                      dispFeePriceText: dispFeeResult.price_text,
                      dispFeePriceNum: dispFeePriceNum,
                      // 优惠券
                      discountCouponList: discountCouponList,
                      discountCouponIndex: discountCouponIndex,
                      // ↓↓↓ 商品券相关
                      goodsCouponList: (0, _tools.assertArray)(resultObject.gc).map(function (i) {
                        // 过滤出可用商品券的商品
                        var useGoodsCoupon = goodsList.filter(function (goods) {
                          return goods.goodsId == i.goods_id;
                        });

                        // 商品券可抵扣的钱数
                        var goodsCouponPrice = useGoodsCoupon.length ? useGoodsCoupon[0].goodsPrice : (0, _tools.transNumFn)(i.money);
                        return {
                          goodsCouponId: i.id,
                          goodsCouponGoodsId: i.goods_id,
                          goodsCouponGoodsName: i.name,
                          goodsCouponPrice: goodsCouponPrice,
                          goodsCouponImage: i.original_img
                        };
                      }),
                      shifuGoodsPrice: shifuGoodsPrice,
                      isRange: isRange
                    })
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
            case 7:
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
}

/***/ }),

/***/ 104:
/*!************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order-enum.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zitiAdrs = exports.yvyueTypeEnum = exports.userAdrs = exports.storeType = exports.sellerAdrs = exports.oneModel = exports.moreModel = exports.dspcyvyue = exports.dspcnow = exports.dispFeeTypeEnum = exports.dispFeeShow0 = exports.dispFeeShow = exports.dispFeeHide = void 0;
// 提交订单页面枚举常量

/*
	三种地址显示方式
*/
var userAdrs = 'userAdrs',
  // 显示用户地址信息
  sellerAdrs = 'sellerAdrs',
  // 显示自提店信息
  zitiAdrs = 'zitiAdrs'; // 显示自提点信息

/*
预约
	yvyueType 预约配送方式
		'dspcnow' 立即配送
		'dspcyvyue' 预约配送
*/
exports.zitiAdrs = zitiAdrs;
exports.sellerAdrs = sellerAdrs;
exports.userAdrs = userAdrs;
var dspcnow = 'dspcnow',
  dspcyvyue = 'dspcyvyue';
exports.dspcyvyue = dspcyvyue;
exports.dspcnow = dspcnow;
var yvyueTypeEnum = {
  '1': dspcnow,
  '2': dspcyvyue
};

/*
	配送费
	type0 dispFeeHide 隐藏
	type1 dispFeeShow0 配送费是0
	type2 dispFeeShow 正常显示金额
*/
exports.yvyueTypeEnum = yvyueTypeEnum;
var dispFeeHide = 'dispFeeHide',
  dispFeeShow0 = 'dispFeeShow0',
  dispFeeShow = 'dispFeeShow';
exports.dispFeeShow = dispFeeShow;
exports.dispFeeShow0 = dispFeeShow0;
exports.dispFeeHide = dispFeeHide;
var dispFeeTypeEnum = {
  '0': dispFeeHide,
  '1': dispFeeShow0,
  '2': dispFeeShow
};
exports.dispFeeTypeEnum = dispFeeTypeEnum;
var oneModel = 'oneModel',
  // 单店模式
  moreModel = 'moreModel'; // 多店模式
exports.moreModel = moreModel;
exports.oneModel = oneModel;
var storeType = {
  oneModel: oneModel,
  moreModel: moreModel
};
exports.storeType = storeType;

/***/ }),

/***/ 105:
/*!*****************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order-fun/order.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrderFn = createOrderFn;
exports.getCouponNotUseMsg = getCouponNotUseMsg;
exports.getPayDataFn = getPayDataFn;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
var _const = __webpack_require__(/*! @/tools/const.js */ 41);
var _submitOrderEnum = __webpack_require__(/*! @/pages/order/submit-order-enum.js */ 104);
// 订单相关方法

/*
	@description 生成订单接口 返回对应的订单编号/订单id
	@param model { storeType }
		'oneModel' 单门店模式
		'moreModel' 多门店模式

	@param data { Object } 对应当前门店模式的订单参数
	@return Promise
*/
function createOrderFn(that, model, data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn) {
      var result, _successCode, successCode, _handleResFn, handleResFn;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return that.$request({
                method: 'post',
                url: '/api/Orderbranch/orderSub',
                data: JSON.stringify(data)
              });
            case 2:
              result = _context.sent;
              console.log('生成订单接口 /api/Orderbranch/orderSub result.data', result.data);
              console.log('生成订单接口 JSON.stringify(result.data)', JSON.stringify(result.data));
              if (result.statusCode == 200) {
                successCode = (_successCode = {}, (0, _defineProperty2.default)(_successCode, 200, true), (0, _defineProperty2.default)(_successCode, 353209, true), (0, _defineProperty2.default)(_successCode, 30302, true), _successCode);
                if (successCode[result.data.code]) {
                  handleResFn = (_handleResFn = {}, (0, _defineProperty2.default)(_handleResFn, 200, function _() {
                    var _handleSuccessFn;
                    var resultData = (0, _tools.assertObject)(result.data.data);
                    var orderId;
                    var handleSuccessFn = (_handleSuccessFn = {}, (0, _defineProperty2.default)(_handleSuccessFn, _submitOrderEnum.oneModel, function () {
                      orderId = resultData.order_id;
                    }), (0, _defineProperty2.default)(_handleSuccessFn, _submitOrderEnum.moreModel, function () {
                      orderId = resultData.order_number;
                    }), _handleSuccessFn);
                    handleSuccessFn[model]();
                    resFn({
                      code: 200,
                      type: 'success',
                      msg: '获取订单编号/订单id成功',
                      result: orderId
                    });
                  }), (0, _defineProperty2.default)(_handleResFn, 353209, function _() {
                    resFn({
                      code: 353209,
                      type: 'success',
                      msg: result.data.msg,
                      result: (0, _tools.assertArray)(result.data.data).map(function (i) {
                        return {
                          goodsImage: i.original_img,
                          msg: i.reason
                        };
                      })
                    });
                  }), (0, _defineProperty2.default)(_handleResFn, 30302, function _() {
                    resFn({
                      code: 30302,
                      type: 'success',
                      msg: result.data.msg
                    });
                  }), _handleResFn);
                  handleResFn[result.data.code]();
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
            case 6:
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
}

/*
	@description 支付接口
	@param 
		model { storeType }
			'oneModel' 单门店模式
			'moreModel' 多门店模式
		orderId 对应模式的订单编号/订单id
		platform 当前平台字符串
		payType 支付方式字符串
		isUseYve 是否使用余额
	@return Promise
*/

function getPayDataFn(that, model, orderId, platform, payType, isUseYve) {
  console.log('arguments', arguments);
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(resFn) {
      var _platformEnum, _payTypeEnum;
      var platformEnum, payTypeEnum, data, result, _successCode2, successCode, _handleFn, resultObject, handleFn;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 后台对应的平台参数
              platformEnum = (_platformEnum = {}, (0, _defineProperty2.default)(_platformEnum, _const.xcx_wx, 'wxMiniProgram'), (0, _defineProperty2.default)(_platformEnum, _const.browser_third, 'H5'), (0, _defineProperty2.default)(_platformEnum, _const.browser_wx, 'wxOfficialAccount'), (0, _defineProperty2.default)(_platformEnum, _const.app_android, 'App'), (0, _defineProperty2.default)(_platformEnum, _const.app_ios, 'App'), _platformEnum); // 后台对应的支付方式参数
              payTypeEnum = (_payTypeEnum = {}, (0, _defineProperty2.default)(_payTypeEnum, _const.payment_wx, 'wechat'), (0, _defineProperty2.default)(_payTypeEnum, _const.payment_zfb, 'alipay'), _payTypeEnum);
              data = {
                platform: platformEnum[platform],
                type: payTypeEnum[payType],
                is_money: isUseYve ? 1 : 0
              };
              if (model == _submitOrderEnum.storeType.oneModel) {
                data.order_id = orderId;
              } else if (model == _submitOrderEnum.storeType.moreModel) {
                data.order_number = orderId;
              }
              console.log('支付接口参数', {
                method: 'post',
                url: '/api/Payment/orderPay',
                data: data
              });
              _context2.next = 7;
              return that.$request({
                method: 'post',
                url: '/api/Payment/orderPay',
                data: data
              });
            case 7:
              result = _context2.sent;
              console.log('支付接口参数', data);
              console.log('支付接口返回数据 /api/Payment/orderPay', result.data);
              console.log('支付接口返回数据 JSON.stringify(result.data)', JSON.stringify(result.data));
              if (result.statusCode == 200) {
                successCode = (_successCode2 = {}, (0, _defineProperty2.default)(_successCode2, 2099, true), (0, _defineProperty2.default)(_successCode2, 200, true), _successCode2);
                if (successCode[result.data.code]) {
                  resultObject = {};
                  handleFn = (_handleFn = {}, (0, _defineProperty2.default)(_handleFn, 2099, function _() {
                    resultObject = {};
                  }), (0, _defineProperty2.default)(_handleFn, 200, function _() {}), _handleFn);
                  handleFn[result.data.code]();
                  resFn({
                    code: result.data.code,
                    type: 'success',
                    msg: result.data.msg,
                    result: resultObject
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
            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

/*
	@description 把不能使用优惠原因字符串转成正常可展示的
		'商品金额差**元可用__101' -> '商品金额差101元可用'
		'' -> ''
*/
function getCouponNotUseMsg(notUseMsg) {
  if (notUseMsg.includes('**') && notUseMsg.includes('__')) {
    var _notUseMsg$split = notUseMsg.split('__'),
      _notUseMsg$split2 = (0, _slicedToArray2.default)(_notUseMsg$split, 2),
      msg = _notUseMsg$split2[0],
      money = _notUseMsg$split2[1];
    var _msg$split = msg.split('**'),
      _msg$split2 = (0, _slicedToArray2.default)(_msg$split, 2),
      msgStart = _msg$split2[0],
      msgEnd = _msg$split2[1];
    return "".concat(msgStart).concat(money).concat(msgEnd);
  }
  return notUseMsg;
}

/***/ }),

/***/ 106:
/*!********************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order-fun/getMoreStorePageData.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMoreStorePageData = getMoreStorePageData;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
var _submitOrderEnum = __webpack_require__(/*! @/pages/order/submit-order-enum.js */ 104);
var _order = __webpack_require__(/*! @/pages/order/submit-order-fun/order.js */ 105);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 订单相关方法
/*
	@description 获取多店提交订单页面展示基本数据
	@param
		客户端设备的经度信息
		longitude <Number> 纬度
		latitude <Number>  经度

		StoreType <String> 'all' 所有门店一块算
		StoreType <Number>  单个门店id
	@return Promise
*/

function getMoreStorePageData(that, longitude, latitude, StoreType) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn) {
      var _codeEnum;
      var result, successState, notRangeState, errorState, codeEnum, resultObject, isHasZiying, addressResult, addressResObj, addressIsSet, addressId, addressUserName, addressUserTel, addressTagName, addressText, addressCoordinate, couponOptions, moreStoreDispFee, moreStoreList, priceOptions, totalOrderInfo, allDiscountsPrice, shifu, useCouponPrice;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return that.$request({
                method: 'post',
                url: '/api/Orderbranch/orderPre',
                data: {
                  lon: longitude,
                  lat: latitude,
                  supp_id: StoreType
                }
              });
            case 2:
              result = _context.sent;
              // console.log('多门店 /api/Orderbranch/orderPre 接口数据', result);
              //数据返回后 处理方式  处理数据
              successState = 'successState', notRangeState = 'notRangeState', errorState = 'errorState'; // 失败
              codeEnum = (_codeEnum = {}, (0, _defineProperty2.default)(_codeEnum, 50001, notRangeState), (0, _defineProperty2.default)(_codeEnum, 200, successState), _codeEnum);
              if (result.statusCode == 200) {
                if (codeEnum[result.data.code] == successState || codeEnum[result.data.code] == notRangeState) {
                  resultObject = (0, _tools.assertObject)(result.data.data);
                  isHasZiying = false; // 是否有自营
                  // ↓↓↓ 多门店页面顶部的地址
                  addressResult = (0, _tools.assertObject)(resultObject.address);
                  addressResObj = (0, _tools.assertObject)(addressResult.data);
                  addressIsSet = false;
                  addressId = null;
                  addressUserName = '';
                  addressUserTel = '';
                  addressTagName = '';
                  addressText = '';
                  addressCoordinate = '';
                  if (Object.keys(addressResObj).length) {
                    addressIsSet = true;
                    addressId = addressResObj.id;
                    addressUserName = addressResObj.name;
                    addressUserTel = addressResObj.mobile;
                    addressTagName = addressResObj.tag_name;
                    addressText = addressResObj.address;
                    addressCoordinate = addressResObj.coordinate;
                  } else {
                    addressIsSet = false;
                    addressId = null;
                    addressUserName = '';
                    addressUserTel = '';
                    addressTagName = '';
                    addressText = '';
                    addressCoordinate = '';
                  }

                  // ↓↓↓ 商品券 优惠券相关数据
                  couponOptions = {};
                  moreStoreDispFee = 0; // 多门店的自营店配送费
                  // 所有门店列表
                  moreStoreList = (0, _tools.assertArray)(resultObject.data).map(function (i) {
                    var _addressObject, _handleAddrFn;
                    var item = (0, _tools.assertObject)(i);

                    // 门店信息
                    var itemInfoObject = (0, _tools.assertObject)(item.info);

                    // data[0].info.store_info
                    var itemInfoStoreInfo = (0, _tools.assertObject)(itemInfoObject.store_info);
                    var storeIsZiying = itemInfoStoreInfo.id == 0; // 是否自营

                    if (storeIsZiying) {
                      isHasZiying = true; // 有自营商店
                    }
                    // data[0].info.prinf
                    var infoPrinf = (0, _tools.assertObject)(itemInfoObject.prinf);
                    var shifuGoodsPrice = infoPrinf.total_price; // 商品实付商品金额

                    // ↓↓↓ 配送方式
                    var dispatchTypeList = (0, _tools.assertArray)(item.dm).map(function (i) {
                      var dispatchTypeItem = (0, _tools.assertObject)(i);
                      return {
                        id: dispatchTypeItem.id,
                        name: dispatchTypeItem.name
                      };
                    });

                    // ↓↓↓ 收货地址 | 自提地址 | 自提点
                    var addressEnum = {
                      '1': _submitOrderEnum.userAdrs,
                      '2': _submitOrderEnum.userAdrs,
                      '3': _submitOrderEnum.sellerAdrs,
                      '4': _submitOrderEnum.zitiAdrs
                    };
                    var addressObject = (_addressObject = {}, (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.userAdrs, {
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
                      addressCoordinate: '' // 收货地址经纬度
                    }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.sellerAdrs, {
                      sellerImage: '',
                      sellerName: '',
                      sellerTel: '',
                      sellerOpenTime: '',
                      sellerAddress: ''
                    }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.zitiAdrs, []), _addressObject);
                    var addressInfo = (0, _tools.assertObject)(item.dmio); // 四种方式对应的地址信息
                    var addressResObj = (0, _tools.assertObject)(addressInfo.data); // data数据
                    var addressTypeText = addressEnum[(0, _tools.transNumFn)(addressInfo.type)]; // 类型数字对应的枚举字符串
                    var currentAddr = addressObject[addressTypeText]; // 当前地址信息

                    addressObject.addressTypeText = addressTypeText;
                    var handleAddrFn = (_handleAddrFn = {}, (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.userAdrs, function () {
                      if ((0, _tools.checkTypeFn)(addressResObj) == 'Object' && Object.keys(addressResObj).length) {
                        currentAddr.addressIsSet = true;
                        currentAddr.addressId = addressResObj.id;
                        currentAddr.addressUserName = addressResObj.name;
                        currentAddr.addressUserTel = addressResObj.mobile;
                        currentAddr.addressTagName = addressResObj.tag_name;
                        currentAddr.addressText = addressResObj.address;
                        currentAddr.addressCoordinate = addressResObj.coordinate;
                      } else {
                        currentAddr.addressIsSet = false;
                      }
                    }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.sellerAdrs, function () {
                      currentAddr.sellerImage = addressResObj.shop_image;
                      currentAddr.sellerName = addressResObj.shop_name;
                      currentAddr.sellerTel = addressResObj.mobile;
                      currentAddr.sellerOpenTime = addressResObj.shop_bh;
                      currentAddr.sellerAddress = addressResObj.shop_detail_address;
                    }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.zitiAdrs, function () {
                      var zitiList = (0, _tools.assertArray)(addressResObj.list).map(function (i, k) {
                        return {
                          id: i.id,
                          zitidianImage: i.img,
                          isRange: i.is_range == 1,
                          zitidianName: i.name,
                          zitidianDist: i.dist,
                          zitidianTime: i.bh,
                          zitidianAddressText: i.address
                        };
                      });
                      currentAddr.push.apply(currentAddr, (0, _toConsumableArray2.default)(zitiList));
                    }), _handleAddrFn);
                    handleAddrFn[addressTypeText]();

                    // ↓↓↓ 预约配送数据
                    var yvyueResult = (0, _tools.assertObject)(item.pt);
                    var yvyueType = _submitOrderEnum.yvyueTypeEnum[yvyueResult.code];
                    var yvyueData;
                    if (yvyueType == _submitOrderEnum.dspcnow) {
                      yvyueData = yvyueResult.data;
                    } else {
                      yvyueData = (0, _tools.assertArray)(yvyueResult.data).map(function (i) {
                        var item = (0, _tools.assertObject)(i);
                        var timeList = (0, _tools.assertArray)(item.list).map(function (tim) {
                          var time = (0, _tools.assertObject)(tim);
                          return {
                            text: time.text,
                            timeId: time.value
                          };
                        });
                        return {
                          text: item.title,
                          timeList: timeList
                        };
                      });
                    }
                    // 预约立即送出字符串
                    // 预约数据
                    var yvyueText, yvyueRangeDataArr;
                    if (yvyueType == _submitOrderEnum.dspcnow) {
                      yvyueText = yvyueData;
                    } else {
                      yvyueRangeDataArr = yvyueData;
                    }

                    // 商品的优惠金额 商品金额数据
                    var orderInfo = (0, _tools.assertObject)(item.order_info);

                    // ↓↓↓ 配送费相关
                    var dispFeeResult = (0, _tools.assertObject)(item.freight);
                    var dispFeeType = _submitOrderEnum.dispFeeTypeEnum[dispFeeResult.type];
                    var dispFeePriceNum = dispFeeType == _submitOrderEnum.dispFeeShow ? (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(dispFeeResult.price)) : 0;
                    if (storeIsZiying && dispFeeType == _submitOrderEnum.dispFeeShow && dispFeePriceNum > 0) {
                      moreStoreDispFee = dispFeePriceNum;
                    }
                    if (storeIsZiying) {
                      var _handleDiscountCoupon;
                      // ↓↓↓ 优惠券
                      var discountCouponResult = (0, _tools.assertObject)(item.coupon);
                      var discountCouponCode = (0, _tools.transNumFn)(discountCouponResult.code);
                      var discountCouponUserId = (0, _tools.assertObject)(discountCouponResult.info).coupon_user_id;
                      var discountCouponList = (0, _tools.assertArray)(discountCouponResult.list).map(function (i) {
                        var discountCouponMoney = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(i.money)); // 优惠券面值多少钱

                        var discountCouponIsUse = i.is_use == 1; // 是否可用
                        var useCouponPrice; // 当前优惠券可优惠并抵扣的金额
                        if (discountCouponIsUse) {
                          if (shifuGoodsPrice >= discountCouponMoney) {
                            useCouponPrice = discountCouponMoney;
                          } else {
                            useCouponPrice = shifuGoodsPrice;
                          }
                        } else {
                          useCouponPrice = 0;
                        }
                        return {
                          discountCouponUserId: i.coupon_user_id,
                          // 关联id
                          discountCouponName: i.coupon_name,
                          // 【名字】
                          discountCouponRightTitle: i.coupon_title,
                          // 名字后标题
                          discountCouponUseType: i.user_coupon_use_type,
                          // 类型
                          discountCouponUseRange: i.goods_range_title,
                          // 范围
                          discountCouponUseTime: i.indate,
                          // 时间
                          discountCouponMoney: discountCouponMoney,
                          discountCouponLeftTitle: i.title,
                          // 红包上标题
                          discountCouponNotUseMsg: (0, _order.getCouponNotUseMsg)(i.not_reason),
                          // 不可以原因
                          discountCouponIsUse: discountCouponIsUse,
                          useCouponPrice: useCouponPrice
                        };
                      });
                      var discountCouponIndex;
                      var handleDiscountCouponFn = (_handleDiscountCoupon = {}, (0, _defineProperty2.default)(_handleDiscountCoupon, 0, function _() {
                        discountCouponIndex = -1;
                      }), (0, _defineProperty2.default)(_handleDiscountCoupon, 1, function _() {
                        discountCouponIndex = discountCouponList.findIndex(function (i) {
                          return i.discountCouponUserId == discountCouponUserId;
                        });
                      }), _handleDiscountCoupon);
                      handleDiscountCouponFn[discountCouponCode]();

                      // 优惠券
                      couponOptions.discountCouponList = discountCouponList;
                      couponOptions.discountCouponIndex = discountCouponIndex;

                      // ↓↓↓ 商品券相关
                      couponOptions.goodsCouponList = (0, _tools.assertArray)(item.gc).map(function (i) {
                        return {
                          goodsCouponId: i.id,
                          goodsCouponGoodsId: i.goods_id,
                          goodsCouponGoodsName: i.name,
                          goodsCouponPrice: (0, _tools.transNumFn)(i.money),
                          goodsCouponImage: i.original_img
                        };
                      });
                    }
                    return _objectSpread(_objectSpread(_objectSpread({
                      storeId: itemInfoStoreInfo.id,
                      storeIsZiying: storeIsZiying,
                      storeName: itemInfoStoreInfo.name,
                      storeImage: itemInfoStoreInfo.img,
                      isRange: itemInfoObject.is_da == 1,
                      // 是否在配送范围内

                      dispatchTypeList: dispatchTypeList
                    }, addressObject), {}, {
                      yvyueType: yvyueType,
                      yvyueData: yvyueData,
                      yvyueText: yvyueText,
                      yvyueRangeDataArr: yvyueRangeDataArr,
                      yvyueDayKey: 0,
                      // 预约天索引
                      yvyueTimeKey: 0,
                      // 预约小时索引
                      yvyueDayBeifenKey: 0,
                      // 预约天备份索引
                      yvyueTimeBeifenKey: 0,
                      // 预约小时备份索引

                      // 商品列表
                      goodsList: (0, _tools.assertArray)(item.goods_list).map(function (item) {
                        return {
                          goodsId: item.goods_id,
                          goodsImg: item.original_img,
                          goodsName: item.goods_name,
                          specName: item.spec_name,
                          cartNum: item.cart_num,
                          goodsPrice: item.shop_price
                        };
                      }),
                      // 是否显示失效商品列表
                      invalidGoodsListIsShow: false,
                      // 失效商品列表
                      loseGoodsList: (0, _tools.assertArray)(item.lose_goods).map(function (item) {
                        return {
                          goodsImg: item.original_img,
                          goodsName: item.goods_name,
                          specName: item.spec_name,
                          loseMsg: item.reason,
                          goodsPrice: item.shop_price
                        };
                      })
                    }, couponOptions), {}, {
                      shifuGoodsPrice: shifuGoodsPrice,
                      // 商品实付商品金额

                      // 商品优惠金额
                      goodsDiscountsPrice: (0, _tools.toDoubleNumFn)((0, _tools.transNumFn)(orderInfo.goods_discounts_price)),
                      // 商品金额
                      goodsPrice: (0, _tools.toDoubleNumFn)((0, _tools.transNumFn)(orderInfo.goods_price)),
                      dispFeeType: dispFeeType,
                      dispFeeTip: dispFeeResult.text,
                      dispFeePriceText: dispFeeResult.price_text,
                      dispFeePriceNum: dispFeePriceNum,
                      // 自提数据
                      usernameText: '',
                      // 名字
                      usertelText: '',
                      // 电话

                      beizhuInputOpacity: false,
                      // 备注框
                      beizhuText: '' // 备注文字
                    });
                  }); // 处理实付金额
                  priceOptions = {};
                  totalOrderInfo = (0, _tools.assertObject)(resultObject.total_order_info);
                  allDiscountsPrice = totalOrderInfo.discounts_price; // 优惠金额
                  shifu = totalOrderInfo.pay_price; // 支付金额
                  if (isHasZiying) {
                    if (couponOptions.discountCouponIndex >= 0) {
                      useCouponPrice = couponOptions.discountCouponList[couponOptions.discountCouponIndex].useCouponPrice; // 优惠券钱数
                      // 
                      shifu = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)((0, _tools.bigPlus)(shifu, useCouponPrice)));
                      allDiscountsPrice = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)((0, _tools.bigMinus)(allDiscountsPrice, useCouponPrice)));
                    }
                    if (moreStoreDispFee > 0) {
                      shifu = (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)((0, _tools.bigMinus)(shifu, moreStoreDispFee)));
                    }
                  }
                  priceOptions.allDiscountsPrice = allDiscountsPrice;
                  priceOptions.shifu = shifu;
                  resFn({
                    type: 'success',
                    msg: result.data.msg,
                    result: _objectSpread(_objectSpread({
                      isHasZiying: isHasZiying,
                      addressIsSet: addressIsSet,
                      addressId: addressId,
                      addressUserName: addressUserName,
                      addressUserTel: addressUserTel,
                      addressTagName: addressTagName,
                      addressText: addressText,
                      addressCoordinate: addressCoordinate,
                      yve: (0, _tools.transNumFn)((0, _tools.assertObject)(resultObject.user_info).money),
                      moreStoreList: moreStoreList
                    }, couponOptions), priceOptions)
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
            case 6:
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
}

/***/ }),

/***/ 107:
/*!***********************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order-fun/getOneStoreToggleDispatchTypeDataFn.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneStoreToggleDispatchTypeDataFn = getOneStoreToggleDispatchTypeDataFn;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
var _submitOrderEnum = __webpack_require__(/*! @/pages/order/submit-order-enum.js */ 104);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*
	@description 获取切换配送方式接口数据
	@param
		dispatchTypeId <Number> 配送方式id
		longitude <Number> 纬度
		latitude <Number> 经度
		shifuGoodsPrice <Number> 实付商品金额
	@return Promise
*/
function getOneStoreToggleDispatchTypeDataFn(that, dispatchTypeId, longitude, latitude, shifuGoodsPrice) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn) {
      var _codeEnum;
      var result, successState, notRangeState, errorState, codeEnum, _addressObject, _handleAddrFn, resultObject, isRange, addressEnum, addressObject, addressInfo, addressResObj, addressTypeText, currentAddr, handleAddrFn, yvyueResult, yvyueType, yvyueData, dispFeeResult, dispFeeType, dispFeePriceNum;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return that.$request({
                method: 'post',
                url: '/api/Orderbranch/orderDm',
                data: {
                  id: dispatchTypeId,
                  lon: longitude,
                  lat: latitude,
                  total_price: shifuGoodsPrice
                }
              });
            case 2:
              result = _context.sent;
              // console.log('获取切换配送方式接口数据 getOneStoreToggleDispatchTypeDataFn', result);
              //数据返回后 处理方式  处理数据
              successState = 'successState', notRangeState = 'notRangeState', errorState = 'errorState'; // 失败
              codeEnum = (_codeEnum = {}, (0, _defineProperty2.default)(_codeEnum, 50001, notRangeState), (0, _defineProperty2.default)(_codeEnum, 200, successState), _codeEnum);
              if (result.statusCode == 200) {
                if (codeEnum[result.data.code] == successState || codeEnum[result.data.code] == notRangeState) {
                  resultObject = (0, _tools.assertObject)(result.data.data); // 是否在配送范围内
                  isRange = codeEnum[result.data.code] == notRangeState ? false : true; // ↓↓↓ 收货地址 | 自提地址 | 自提点
                  addressEnum = {
                    '1': _submitOrderEnum.userAdrs,
                    '2': _submitOrderEnum.userAdrs,
                    '3': _submitOrderEnum.sellerAdrs,
                    '4': _submitOrderEnum.zitiAdrs
                  };
                  addressObject = (_addressObject = {}, (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.userAdrs, {
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
                    addressCoordinate: '' // 收货地址经纬度
                  }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.sellerAdrs, {
                    sellerImage: '',
                    sellerName: '',
                    sellerTel: '',
                    sellerOpenTime: '',
                    sellerAddress: ''
                  }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.zitiAdrs, []), _addressObject);
                  addressInfo = (0, _tools.assertObject)(resultObject.dmio); // 四种方式对应的地址信息
                  addressResObj = (0, _tools.assertObject)(addressInfo.data); // data数据
                  addressTypeText = addressEnum[(0, _tools.transNumFn)(addressInfo.type)]; // 类型数字对应的枚举字符串
                  currentAddr = addressObject[addressTypeText]; // 当前地址信息
                  addressObject.addressTypeText = addressTypeText;
                  handleAddrFn = (_handleAddrFn = {}, (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.userAdrs, function () {
                    if ((0, _tools.checkTypeFn)(addressResObj) == 'Object' && Object.keys(addressResObj).length) {
                      currentAddr.addressIsSet = true;
                      currentAddr.addressId = addressResObj.id;
                      currentAddr.addressUserName = addressResObj.name;
                      currentAddr.addressUserTel = addressResObj.mobile;
                      currentAddr.addressTagName = addressResObj.tag_name;
                      currentAddr.addressText = addressResObj.address;
                      currentAddr.addressCoordinate = addressResObj.coordinate;
                    } else {
                      currentAddr.addressIsSet = false;
                    }
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.sellerAdrs, function () {
                    currentAddr.sellerImage = addressResObj.shop_image;
                    currentAddr.sellerName = addressResObj.shop_name;
                    currentAddr.sellerTel = addressResObj.mobile;
                    currentAddr.sellerOpenTime = addressResObj.shop_bh;
                    currentAddr.sellerAddress = addressResObj.shop_detail_address;
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.zitiAdrs, function () {
                    var zitiList = (0, _tools.assertArray)(addressResObj.list).map(function (i, k) {
                      return {
                        id: i.id,
                        zitidianImage: i.img,
                        isRange: i.is_range == 1,
                        zitidianName: i.name,
                        zitidianDist: i.dist,
                        zitidianTime: i.bh,
                        zitidianAddressText: i.address
                      };
                    });
                    currentAddr.push.apply(currentAddr, (0, _toConsumableArray2.default)(zitiList));
                  }), _handleAddrFn);
                  handleAddrFn[addressTypeText]();

                  // ↓↓↓ 预约配送数据
                  yvyueResult = (0, _tools.assertObject)(resultObject.pt);
                  yvyueType = _submitOrderEnum.yvyueTypeEnum[yvyueResult.code];
                  if (yvyueType == _submitOrderEnum.dspcnow) {
                    yvyueData = yvyueResult.data;
                  } else {
                    yvyueData = (0, _tools.assertArray)(yvyueResult.data).map(function (i) {
                      var item = (0, _tools.assertObject)(i);
                      var timeList = (0, _tools.assertArray)(item.list).map(function (tim) {
                        var time = (0, _tools.assertObject)(tim);
                        return {
                          text: time.text,
                          timeId: time.value
                        };
                      });
                      return {
                        text: item.title,
                        timeList: timeList
                      };
                    });
                  }

                  // ↓↓↓ 配送费相关
                  dispFeeResult = (0, _tools.assertObject)(resultObject.freight);
                  dispFeeType = _submitOrderEnum.dispFeeTypeEnum[dispFeeResult.type];
                  dispFeePriceNum = dispFeeType == _submitOrderEnum.dispFeeShow ? (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(dispFeeResult.price)) : 0;
                  resFn({
                    type: 'success',
                    msg: '获取订单页面数据成功',
                    result: _objectSpread(_objectSpread({}, addressObject), {}, {
                      yvyueType: yvyueType,
                      yvyueData: yvyueData,
                      dispFeeType: dispFeeType,
                      dispFeeTip: dispFeeResult.text,
                      dispFeePriceText: dispFeeResult.price_text,
                      dispFeePriceNum: dispFeePriceNum,
                      isRange: isRange
                    })
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
            case 6:
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
}

/***/ }),

/***/ 108:
/*!************************************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/order/submit-order-fun/getMoreStoreToggleDispatchTypeDataFn.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMoreStoreToggleDispatchTypeDataFn = getMoreStoreToggleDispatchTypeDataFn;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 29));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 19));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 31));
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
var _submitOrderEnum = __webpack_require__(/*! @/pages/order/submit-order-enum.js */ 104);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*
	@description 多门店获取切换配送方式接口数据
	@param
		dispatchTypeId <Number> 配送方式id
		longitude <Number> 纬度
		latitude <Number> 经度
		shifuGoodsPrice <Number> 实付商品金额
	@return Promise
*/
function getMoreStoreToggleDispatchTypeDataFn(that, dispatchTypeId, longitude, latitude, shifuGoodsPrice) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resFn) {
      var _codeEnum;
      var result, successState, notRangeState, errorState, codeEnum, _addressObject, _handleAddrFn, resultObject, isRange, addressEnum, addressObject, addressInfo, addressResObj, addressTypeText, currentAddr, handleAddrFn, yvyueResult, yvyueType, yvyueData, dispFeeResult, dispFeeType, dispFeePriceNum;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return that.$request({
                method: 'post',
                url: '/api/Orderbranch/orderDm',
                data: {
                  id: dispatchTypeId,
                  lon: longitude,
                  lat: latitude,
                  total_price: shifuGoodsPrice
                }
              });
            case 2:
              result = _context.sent;
              // console.log('获取切换配送方式接口数据 getMoreStoreToggleDispatchTypeDataFn', result);
              //数据返回后 处理方式  处理数据
              successState = 'successState', notRangeState = 'notRangeState', errorState = 'errorState'; // 失败
              codeEnum = (_codeEnum = {}, (0, _defineProperty2.default)(_codeEnum, 50001, notRangeState), (0, _defineProperty2.default)(_codeEnum, 200, successState), _codeEnum);
              if (result.statusCode == 200) {
                if (codeEnum[result.data.code] == successState || codeEnum[result.data.code] == notRangeState) {
                  resultObject = (0, _tools.assertObject)(result.data.data); // 是否在配送范围内
                  isRange = codeEnum[result.data.code] == notRangeState ? false : true; // ↓↓↓ 收货地址 | 自提地址 | 自提点
                  addressEnum = {
                    '1': _submitOrderEnum.userAdrs,
                    '2': _submitOrderEnum.userAdrs,
                    '3': _submitOrderEnum.sellerAdrs,
                    '4': _submitOrderEnum.zitiAdrs
                  };
                  addressObject = (_addressObject = {}, (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.userAdrs, {
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
                    addressCoordinate: '' // 收货地址经纬度
                  }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.sellerAdrs, {
                    sellerImage: '',
                    sellerName: '',
                    sellerTel: '',
                    sellerOpenTime: '',
                    sellerAddress: ''
                  }), (0, _defineProperty2.default)(_addressObject, _submitOrderEnum.zitiAdrs, []), _addressObject);
                  addressInfo = (0, _tools.assertObject)(resultObject.dmio); // 四种方式对应的地址信息
                  addressResObj = (0, _tools.assertObject)(addressInfo.data); // data数据
                  addressTypeText = addressEnum[(0, _tools.transNumFn)(addressInfo.type)]; // 类型数字对应的枚举字符串
                  currentAddr = addressObject[addressTypeText]; // 当前地址信息
                  addressObject.addressTypeText = addressTypeText;
                  handleAddrFn = (_handleAddrFn = {}, (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.userAdrs, function () {
                    if ((0, _tools.checkTypeFn)(addressResObj) == 'Object' && Object.keys(addressResObj).length) {
                      currentAddr.addressIsSet = true;
                      currentAddr.addressId = addressResObj.id;
                      currentAddr.addressUserName = addressResObj.name;
                      currentAddr.addressUserTel = addressResObj.mobile;
                      currentAddr.addressTagName = addressResObj.tag_name;
                      currentAddr.addressText = addressResObj.address;
                      currentAddr.addressCoordinate = addressResObj.coordinate;
                    } else {
                      currentAddr.addressIsSet = false;
                    }
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.sellerAdrs, function () {
                    currentAddr.sellerImage = addressResObj.shop_image;
                    currentAddr.sellerName = addressResObj.shop_name;
                    currentAddr.sellerTel = addressResObj.mobile;
                    currentAddr.sellerOpenTime = addressResObj.shop_bh;
                    currentAddr.sellerAddress = addressResObj.shop_detail_address;
                  }), (0, _defineProperty2.default)(_handleAddrFn, _submitOrderEnum.zitiAdrs, function () {
                    var zitiList = (0, _tools.assertArray)(addressResObj.list).map(function (i, k) {
                      return {
                        id: i.id,
                        zitidianImage: i.img,
                        isRange: i.is_range == 1,
                        zitidianName: i.name,
                        zitidianDist: i.dist,
                        zitidianTime: i.bh,
                        zitidianAddressText: i.address
                      };
                    });
                    currentAddr.push.apply(currentAddr, (0, _toConsumableArray2.default)(zitiList));
                  }), _handleAddrFn);
                  handleAddrFn[addressTypeText]();

                  // ↓↓↓ 预约配送数据
                  yvyueResult = (0, _tools.assertObject)(resultObject.pt);
                  yvyueType = _submitOrderEnum.yvyueTypeEnum[yvyueResult.code];
                  if (yvyueType == _submitOrderEnum.dspcnow) {
                    yvyueData = yvyueResult.data;
                  } else {
                    yvyueData = (0, _tools.assertArray)(yvyueResult.data).map(function (i) {
                      var item = (0, _tools.assertObject)(i);
                      var timeList = (0, _tools.assertArray)(item.list).map(function (tim) {
                        var time = (0, _tools.assertObject)(tim);
                        return {
                          text: time.text,
                          timeId: time.value
                        };
                      });
                      return {
                        text: item.title,
                        timeList: timeList
                      };
                    });
                  }

                  // ↓↓↓ 配送费相关
                  dispFeeResult = (0, _tools.assertObject)(resultObject.freight);
                  dispFeeType = _submitOrderEnum.dispFeeTypeEnum[dispFeeResult.type];
                  dispFeePriceNum = dispFeeType == _submitOrderEnum.dispFeeShow ? (0, _tools.transNumFn)((0, _tools.toDoubleNumFn)(dispFeeResult.price)) : 0;
                  resFn({
                    type: 'success',
                    msg: isRange ? '获取订单页面数据成功' : result.data.msg,
                    result: _objectSpread(_objectSpread({}, addressObject), {}, {
                      yvyueType: yvyueType,
                      yvyueData: yvyueData,
                      dispFeeType: dispFeeType,
                      dispFeeTip: dispFeeResult.text,
                      dispFeePriceText: dispFeeResult.price_text,
                      dispFeePriceNum: dispFeePriceNum,
                      isRange: isRange
                    })
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
            case 6:
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
}

/***/ }),

/***/ 11:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 13);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 12:
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 13:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 14:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 15);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 16);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 15:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 16:
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 17:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 18:
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 11);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 19:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 20);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 21);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 22);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 21:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 22:
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 23:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 4));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 12));
var isArray = Array.isArray;
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 24:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序","VUE_APP_PLATFORM":"mp-toutiao","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 245:
/*!************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages/index/index-components/miaosha-tool.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMiaoshaTimeOption = getMiaoshaTimeOption;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _tools = __webpack_require__(/*! @/tools/tools.js */ 39);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 秒杀相关工具函数

/*
	@description 传入单位是分钟的数字转换为 xx:xx:xx （时:分:秒）
	@param { Number } allMinute 数字单位是分钟
	@return { String } xx:xx:xx （时:分:秒）
*/
function allMinute2Time(allMinute) {
  var newDate = new Date();
  var hour = Math.floor(allMinute / 60);
  var minute = allMinute % 60;
  var second = 60 - newDate.getSeconds();
  return {
    hour: (0, _tools.num2zeroStr)(hour),
    minute: (0, _tools.num2zeroStr)(minute),
    second: (0, _tools.num2zeroStr)(second)
  };
}

/*
	@description  根据后台设置的开始时间(12:00)和结束时间(13:00) 返回 tipTitle 提示文字  和 时分秒 (完成补零操作的字符串)
	@param { String } miaoshaStartTime 开始时间(12:00)
	@param { String } miaoshaEndTime 结束时间(13:00)
	@return { Object } 
		{
			tipTitle: '', // 距离结束   距离开始
			hour: '01', // 小时  
			minute: '02', // 分钟
			second: '03', // 秒
		}
*/
function getMiaoshaTimeOption(miaoshaStartTime, miaoshaEndTime) {
  var newDate = new Date(); // 当前时间对象
  var newTimeHour = newDate.getHours(); // 当前的时间小时 20
  var newTimeMinute = newDate.getMinutes(); // 当前的时间分钟 00
  var newTimeAllMinute = newTimeHour * 60 + newTimeMinute; // 把小时的单位换算成分钟表示

  var miaoshaStartTimeArr = miaoshaStartTime.split(':'); // 开始秒杀的时间 20:00
  var miaoshaStartTimeHour = (0, _tools.transNumFn)(miaoshaStartTimeArr[0]); // 开始秒杀的时间小时 20
  var miaoshaStartTimeMinute = (0, _tools.transNumFn)(miaoshaStartTimeArr[1]); // 开始秒杀的时间分钟 00
  var miaoshaStartTimeAllMinute = miaoshaStartTimeHour * 60 + miaoshaStartTimeMinute; // 把小时的单位换算成分钟表示

  var miaoshaEndTimeArr = miaoshaEndTime.split(':'); // 结束秒杀的时间 20:00
  var miaoshaEndTimeHour = (0, _tools.transNumFn)(miaoshaEndTimeArr[0]); // 结束秒杀的时间小时 20
  var miaoshaEndTimeMinute = (0, _tools.transNumFn)(miaoshaEndTimeArr[1]); // 结束秒杀的时间分钟 00
  var miaoshaEndTimeAllMinute = miaoshaEndTimeHour * 60 + miaoshaEndTimeMinute; // 把小时的单位换算成分钟表示

  var allMinute; // 分钟数
  var tipStr; // 时间前的提示文字  (距离结束/距离开始)
  if (miaoshaStartTimeAllMinute < newTimeAllMinute && miaoshaEndTimeAllMinute > newTimeAllMinute) {
    // 当前时间在秒杀范围内     还差xxx结束
    allMinute = miaoshaEndTimeAllMinute - newTimeAllMinute;
    tipStr = '距离结束';
  } else if (miaoshaStartTimeAllMinute > newTimeAllMinute) {
    // 当前时间没到秒杀范围内     还差xxx开始
    allMinute = miaoshaStartTimeAllMinute - newTimeAllMinute;
    tipStr = '距离开始';
  } else if (miaoshaEndTimeAllMinute < newTimeAllMinute) {
    // 当前时间超过秒杀范围     还差xxx开始
    allMinute = 24 * 60 - newTimeAllMinute + miaoshaStartTimeAllMinute;
    tipStr = '距离开始';
  }
  return _objectSpread({
    tipTitle: tipStr
  }, allMinute2Time(allMinute));
}

/***/ }),

/***/ 25:
/*!**************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/pages.json ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 270:
/*!************************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/pintuan-detail-tool.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDataFn = handleDataFn;
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
// 后台数据结构转前端使用方法
// 参数 data 是后台返回的数据
function handleDataFn(data) {
  var resultList = []; // 经过一系列循环 判断后返回的数组

  (0, _tools.cloneFn)(data).forEach(function (item) {
    if (resultList.length) {
      // 判断是否为空
      var endIsPushFlag; // 记录结束循环后是否要push一下
      resultList.forEach(function (it) {
        if (it.gdId == item.gb_id) {
          // resultList 里有当前团id信息
          endIsPushFlag = false;
          if (it.userInfo.length < 2) {
            it.userInfo.push({
              // 把用户信息push到这个团里
              headimgurl: item.headimgurl,
              nickName: item.nickname
            });
          }
        } else {
          // resultList 没有团信息记录一下
          endIsPushFlag = true;
        }
      });
      if (endIsPushFlag) {
        // 根据签名的记录 没有团信息 循环外 需要push一下
        resultList.push({
          gdId: item.gb_id,
          // 团id
          diffNum: item.diffNum,
          endTime: item.end_time,
          userInfo: [{
            headimgurl: item.headimgurl,
            nickName: item.nickname
          }]
        });
      }
    } else {
      // resultList 里啥也没有 的情况下 直接push团
      resultList.push({
        gdId: item.gb_id,
        // 团id
        diffNum: item.diffNum,
        endTime: item.end_time,
        encrypt: item.encrypt,
        userInfo: [{
          headimgurl: item.headimgurl,
          nickName: item.nickname
        }]
      });
    }
  });
  /* return [...resultList,...resultList,...resultList,...resultList,...resultList,...resultList,...resultList]; */ // 循环完把数据 return 出来
  return resultList;
}

/***/ }),

/***/ 279:
/*!**********************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageB/goods-detail/const.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twoSpec = exports.oneSpec = exports.one = exports.all = void 0;
// 定义常量
var all = 'all',
  // 预售商品使用统一的价格信息
  one = 'one',
  // 预售商品使用规格里的价格信息
  oneSpec = 'oneSpec',
  // 单商品无规格
  twoSpec = 'twoSpec'; // 多规格商品
exports.twoSpec = twoSpec;
exports.oneSpec = oneSpec;
exports.one = one;
exports.all = all;

/***/ }),

/***/ 29:
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 30)();
module.exports = runtime;

/***/ }),

/***/ 3:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 30:
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 12)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 31:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 34:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 35:
/*!******************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/mixin.js ***!
  \******************************************************************************/
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
var _vuex = __webpack_require__(/*! vuex */ 36);
var _qqmapWxJssdkMin = _interopRequireDefault(__webpack_require__(/*! @/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min.js */ 37));
var _siteinfo = __webpack_require__(/*! @/tools/siteinfo.js */ 38);
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
var _const = __webpack_require__(/*! @/tools/const.js */ 41);
var _methods;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var toTopBtnTimeer; // 回到顶部按钮的 定时器

var menuButtonRectInfo = {}; // 小程序胶囊按钮信息

menuButtonRectInfo = uni.getMenuButtonBoundingClientRect();
var getSystemInfoSync = uni.getSystemInfoSync();
var statusBarHeight = getSystemInfoSync.statusBarHeight,
  // 状态栏 高度
  windowWidth = getSystemInfoSync.windowWidth; // 屏幕宽

var goodsAddCartEdEmitList = ['goodsAddCartEd_gongyingshangSeller', 'goodsAddCartEd_activity', 'goodsAddCartEd_foodDetail', 'goodsAddCartEd_everydayBuy', 'goodsAddCartEd_huiyuanjieshao', 'goodsAddCartEd_vipGoodsList', 'goodsAddCartEd_goodsDetailSeckill', 'goodsAddCartEd_goodsDetail', 'goodsAddCartEd_cart', 'goodsAddCartEd_class', 'goodsAddCartEd_index', 'goodsAddCartEd_caichangIndex', 'goodsAddCartEd_todaySeckill', 'goodsAddCartEd_homeSwiper', 'goodsAddCartEd_indexHot', 'goodsAddCartEd_listPageIndex', 'goodsAddCartEd_youhuiquan', 'goodsAddCartEd_searchIndex']; // 加入购物车成功后 触发的事件
var _default = {
  data: function data() {
    return {
      onoff: false,
      WXtop: 0,
      isShowToTopBtn: false,
      // 是否显示回到顶部按钮

      windowWidth: windowWidth,
      statusBarHeight: statusBarHeight,
      // 状态栏 高度
      menuButtonRectInfo: menuButtonRectInfo,
      mixinScrollTop: 0,
      // 当前页面滚动的距离
      mixinScrollIsStop: true,
      // 当前页面 屏幕是否停止滚动

      anniushuzi: _const.anniushuzi,
      // 一个加号按钮按钮右上是数字
      shuanganniushuzi: _const.shuanganniushuzi // 一个减号按钮 数字 一个加号按钮按钮
    };
  },

  methods: (_methods = {
    // 停止3秒钟
    sleepFn: function sleepFn() {
      var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      console.log("sleepFn \u963B\u6B62\u7A0B\u5E8F".concat(time, "\u79D2"));
      return new Promise(function (resFn) {
        setTimeout(function () {
          resFn("sleepFn \u963B\u585E\u5B8C\u6BD5".concat(time, "\u79D2"));
        }, time * 1000);
      });
    },
    // main 文件 下 created 方法执行 不操作dom
    mainCreatedFn: function mainCreatedFn() {
      var that = this;
      that.$store.commit('setAppStaticPath'); // 设置程序里使用的静态图片路径 (永远不换的图片)

      var token = (0, _tools.assertString)(uni.getStorageSync('token'));
      if (token.length > 0) {
        that.$store.commit('setToken', token);
        that.hasTokenGetUserInfo(function () {});
      } else {
        that.$store.commit('setToken', '');
        that.unHasTokenGetUserInfo(function () {});
      }
      console.log('当前token', token);

      /* 
      let tokenMap = {
      	[`https://dev.sjwxsc.com`]: 'a69b2371-58fc-40fd-8b88-894fb9facf5e',
      	[`https://localdev.sjwxsc.com`]: '586ea319-8a1e-4461-a6d7-e77358a68fd8'
      }
      that.$store.commit('setToken', tokenMap[host]);
       */

      console.log("\n\t\t\t\t\u4E07\u8C61\u4F18\u9C9C\u751F\u9C9C\u7CFB\u7EDF(\u7B80\u79F0: \u4E07\u8C61\u4F18\u9C9C)\n\t\t\t\t\u8F6F\u8457\u8BC1\u4E66\u53F7: 6907220\n\t\t\t\t\u8F6F\u8457\u767B\u8BB0\u53F7: 2021SR0182903\n\t\t\t\t\u624B\u673A: 18310199838\n\t\t\t\t\u7535\u8BDD: 4006697689\n\t\t\t\t\u90AE\u7BB1: 3319653051@qq.com\n\t\t\t\t\u8457\u4F5C\u6743\u4EBA: \u5317\u4EAC\u4E16\u95F4\u4E07\u8C61\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\n\t\t\t\t\u7248\u6743\u6240\u6709: \u5317\u4EAC\u4E16\u95F4\u4E07\u8C61\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\n\t\t\t\t\u4EFB\u4F55\u7EC4\u7EC7\u548C\u4E2A\u4EBA\u672A\u7ECF\u672C\u5355\u4F4D\u8BB8\u53EF\u4E0E\u6388\u6743, \u4E0D\u5F97\u64C5\u81EA\u590D\u5236\u3001\u66F4\u6539\u5185\u5BB9\u672C\u7CFB\u7EDF\u53D7\u7248\u6743\u6CD5\u4FDD\u62A4\u5982\u672A\u7ECF\u6388\u6743\u800C\u64C5\u81EA\u590D\u5236\u6216\u4F20\u64AD\u672C\u7CFB\u7EDF(\u6216\u5176\u4E2D\u90E8\u5206), \u5C06\u53D7\u5230\u4E25\u5389\u7684\u5211\u4E8B\u53CA\u6C11\u4E8B\u5236\u88C1\uFF0C\u5E76\u5C06\u5728\u6CD5\u5F8B\u8BB8\u53EF\u8303\u56F4\u5185\u53D7\u5230\u6700\u5927\u53EF\u80FD\u7684\u8D77\u8BC9!\n\t\t\t");
    },
    // 程序 onLaunch 时触发的函数
    launchFn: function launchFn(e) {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var that, sharer;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = _this;
                console.log('launchFn 函数里所带的参数', e, '\n', 'launchFn e.query', e.query, '\n');
                that.checkIsiPhoneXFn(); // 查看是否 苹果x
                sharer = e.query.scene; // 分享人的 加密字符串
                if (sharer && !e.query.shareFn) {
                  // 有加密人字符串 不是通过小程序分享的(海报图片扫码方式)
                  that.setSharerStrFn(sharer);
                }
                if (sharer && e.query.shareFn) {
                  // 有加密人字符串 是通过小程序分享的 (转发小程序)
                  that.setSharerStrFn_btn(e.query);
                }
                uni.$on('goodsAddCartEd', function (arg) {
                  return goodsAddCartEdEmitList.forEach(function (i) {
                    return uni.$emit(i, arg);
                  });
                }); // 加入购物车成功后 开始触发页面里事件渲染视图
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, (0, _defineProperty2.default)(_methods, '$request', function $request(options) {
    var that = this;
    var method = options.method,
      loading = options.loading,
      temUrl = options.temUrl,
      url = options.url,
      data = options.data,
      header = options.header,
      useTokenRule = options.useTokenRule;

    // 处理请求的动画
    if (loading) {
      that.hideAllFn();
      uni.showLoading({});
    }
    // 处理可能调试使用的 临时网络地址
    if (temUrl) {
      // 有临时的请求地址 就 用 临时的请求地址
      url = temUrl;
    } else {
      // 否则用默认的 host + url 
      url = "".concat(_siteinfo.host).concat(url);
    }
    // 处理 使用token规则 header对象

    /* 
    	使用token规则
    	'mustUseToken' 接口必须有token 如果没有 就 弹框 提示登录
    	'toTheFullUseToken'  表示 有token 带上  没有token 留空 也是默认情况
    	'notUseToken'  表示 不管有没有token 都不带
    */

    var headerObj = {};
    if (useTokenRule === 'mustUseToken') {
      if (that.isLogin) {
        headerObj.token = that.globalToken;
      } else {
        that.closeGlobalLoginFn(true);
        return new Promise(function (resFn, rejFn) {
          that.logOutFn(); // 先退出登录一下
          resFn({
            statusCode: 200,
            data: {
              code: 400,
              msg: '未登录'
            }
          });
        });
      }
    } else if (useTokenRule === 'notUseToken') {
      headerObj = {};
    } else {
      if (that.isLogin) {
        headerObj.token = that.globalToken;
        // console.log('打印全局的token that.globalToken', that.globalToken);
      }
    }
    /* 
    console.log(
    	'发起请求时带的header头', headerObj
    );
     */

    return new Promise(function (resFn, rejFn) {
      uni.request({
        timeout: 1000 * 6,
        // 请求超过6s 自动断开
        method: method,
        url: url,
        data: data,
        header: _objectSpread(_objectSpread({}, headerObj), header),
        success: function success(e) {
          if (e.statusCode == 200 && e.data.code == 401) {
            that.logOutFn(); // 先退出登录一下
            that.closeGlobalLoginFn(true);
            resFn({
              statusCode: 200,
              data: {
                code: 400,
                msg: '未登录'
              }
            });
            return false;
          } else {
            resFn(e);
          }
          if (loading) {
            that.hideAllFn();
          }
        },
        fail: function fail(e) {
          resFn(e);
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "toBackFn", function toBackFn() {
    // 正常返回上一页 如果没有上一页 就回首页
    if (getCurrentPages().length >= 2) {
      uni.navigateBack({});
    } else {
      this.navigateToFn({
        isTab: true,
        url: '/pages/index/index'
      });
    }
  }), (0, _defineProperty2.default)(_methods, "toTopFn", function toTopFn() {
    this.isShowToTopBtn = false;
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }), (0, _defineProperty2.default)(_methods, "calcImageSrc", function calcImageSrc(src) {
    return "".concat(this.appStaticPath).concat(src);
  }), (0, _defineProperty2.default)(_methods, "regTel", function regTel(tel) {
    return _tools.checkTelReg.test(tel);
  }), (0, _defineProperty2.default)(_methods, "tagStyle", function tagStyle(index) {
    var arr = ['blueStyle', 'orangeStyle', 'pinkStyle', 'yellowStyle', 'redStyle'];
    index = index ? index : 0;
    return arr[index % arr.length];
  }), (0, _defineProperty2.default)(_methods, "randFn", function randFn(min, max) {
    return Math.round(Math.random() * (max - min)) - min;
  }), (0, _defineProperty2.default)(_methods, "navigateToFn", function navigateToFn(obj) {
    if (obj.checkLogin && !this.isLogin) {
      // 需要登录才能跳转
      this.closeGlobalLoginFn(true);
      return false;
    }
    if (obj.isTab) {
      // 是否tab-bar页面
      uni.switchTab({
        url: obj.url
      });
      return false;
    }
    var typeAttr; // 其他跳转方式
    if (obj.type) {
      typeAttr = obj.type;
    } else {
      typeAttr = 'navigateTo';
    }
    if (getCurrentPages().length >= 9) {
      // 如果跳转超过9页 就只能删除掉前一页面 重新覆盖  redirectTo 方式
      typeAttr = 'redirectTo';
    }
    uni[typeAttr](_objectSpread({}, obj));
  }), (0, _defineProperty2.default)(_methods, "setTabBarCartNumFn", function setTabBarCartNumFn() {
    var _this2 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var that, result;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              that = _this2;
              if (that.isLogin) {
                _context2.next = 4;
                break;
              }
              uni.$emit('setCardNumberFn', 0);
              return _context2.abrupt("return", false);
            case 4:
              _context2.next = 6;
              return that.getCartNumsumFn();
            case 6:
              result = _context2.sent;
              if (result.type == 'success') {
                uni.$emit('setCardNumberFn', result.result);
              } else {
                that.hideAllFn();
                uni.showToast({
                  icon: 'none',
                  title: result.msg
                });
              }
            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getCartNumsumFn", function getCartNumsumFn() {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(resFn) {
        var result, resultObj;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return that.$request({
                  url: '/api/Cart/getCartNumsum'
                });
              case 2:
                result = _context3.sent;
                resultObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = {
                      type: 'success',
                      msg: result.data.msg,
                      result: (0, _tools.transNumFn)((0, _tools.assertObject)(result.data.data).number)
                    };
                  } else {
                    resultObj = {
                      type: 'error',
                      msg: result.data.msg,
                      result: result
                    };
                  }
                } else {
                  resultObj = {
                    type: 'error',
                    msg: that.$errorMsg,
                    result: result
                  };
                }
                resFn(resultObj);
              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "addShoppingCartFn", function addShoppingCartFn(goodsId, number, specId) {
    var that = this;
    specId = function () {
      var n = (0, _tools.transNumFn)(specId);
      return n <= 0 ? 0 : n;
    }();
    if (number > 0) {
      that.vibrateFn();
    }
    return new Promise( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(resFn) {
        var result, resultObj;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return that.$request({
                  method: 'post',
                  url: '/api/Cart/addCart',
                  data: {
                    goods_id: goodsId,
                    number: number,
                    spec_id: specId
                  }
                });
              case 2:
                result = _context4.sent;
                resultObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = {
                      type: 'success',
                      msg: result.data.msg,
                      result: (0, _tools.transNumFn)((0, _tools.assertObject)(result.data.data).selectedNum)
                    };
                  } else {
                    resultObj = {
                      type: 'error',
                      msg: result.data.msg,
                      result: result
                    };
                  }
                } else {
                  resultObj = {
                    type: 'error',
                    msg: that.$errorMsg,
                    result: result
                  };
                }
                resFn(resultObj);
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "delCartGoodsAtListFn", function delCartGoodsAtListFn(goodsId) {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(resFn) {
        var result, _assertObject, msg;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return that.$request({
                  method: 'post',
                  url: '/api/Cart/cartDel',
                  data: {
                    goods_id: goodsId,
                    is_lose: 0
                  }
                });
              case 2:
                result = _context5.sent;
                //数据返回后 处理方式  处理数据
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    _assertObject = (0, _tools.assertObject)(result.data.data), msg = _assertObject.msg;
                    resFn({
                      type: 'success',
                      msg: msg,
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
                return _context5.stop();
            }
          }
        }, _callee5);
      }));
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "delShoppingCartGoodsFn", function delShoppingCartGoodsFn(options) {
    var _dataObject;
    var that = this;
    var id = options.id,
      type = options.type;
    var dataObject = (_dataObject = {}, (0, _defineProperty2.default)(_dataObject, _const.delCartGoodsTypeCartId, {
      id: id
    }), (0, _defineProperty2.default)(_dataObject, _const.delCartGoodsTypeGoodsId, {
      goods_id: id
    }), _dataObject);

    /* 
    console.log(
    	'delShoppingCartGoodsFn(options)->options',options,'\n',
    	'dataObject ->',dataObject,'\n',
    );
    */

    return new Promise( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(resFn, rejFn) {
        var result, resultObj;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return that.$request({
                  url: '/api/Cart/delCart',
                  data: dataObject[type]
                });
              case 2:
                result = _context6.sent;
                resultObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = {
                      type: 'success',
                      msg: result.data.msg,
                      result: result.data.data
                    };
                  } else {
                    resultObj = {
                      type: 'error',
                      msg: result.data.msg,
                      result: result
                    };
                  }
                } else {
                  resultObj = {
                    type: 'error',
                    msg: that.$errorMsg,
                    result: result
                  };
                }
                resFn(resultObj);
              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "changeGoodsSelectStatusFn", function changeGoodsSelectStatusFn(id, flag) {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(resFn, rejFn) {
        var result, resultObj;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return that.$request({
                  url: '/api/Cart/change_active_status',
                  data: {
                    id: id,
                    is_active: flag ? 1 : 0
                  }
                });
              case 2:
                result = _context7.sent;
                resultObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = {
                      type: 'success',
                      msg: result.data.msg,
                      result: result
                    };
                  } else {
                    resultObj = {
                      type: 'error',
                      msg: result.data.msg,
                      result: result
                    };
                  }
                } else {
                  resultObj = {
                    type: 'error',
                    msg: that.$errorMsg,
                    result: result
                  };
                }
                resFn(resultObj);
              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "replaceFn", function replaceFn(str, n) {
    var reg = /\{(\d|\D)*\}/;
    if (!reg.test(str)) {
      return str;
    }
    var res = str.match(reg)['0'];
    var result = str.replace(res, n);
    return result;
  }), (0, _defineProperty2.default)(_methods, "closeGlobalLoginFn", function closeGlobalLoginFn(flag) {
    uni.$emit('setLoginBoxFlag', !!flag);
  }), (0, _defineProperty2.default)(_methods, "trimFn", function trimFn(str) {
    if ((0, _tools.checkTypeFn)(str) == 'String') {
      return this.strTrimFn(str);
    }
    return false;
  }), (0, _defineProperty2.default)(_methods, "strTrimFn", function strTrimFn(str) {
    return (0, _tools.assertString)(str).trim();
  }), (0, _defineProperty2.default)(_methods, "timeZero", function timeZero(time) {
    var str = time + '';
    return ('000' + str).slice(-2);
  }), (0, _defineProperty2.default)(_methods, "obj2styleStr", function obj2styleStr(styleObj) {
    var styleStr = '';
    for (var key in styleObj) {
      styleStr += "".concat(key, ":").concat(styleObj[key], ";");
    }
    return styleStr;
  }), (0, _defineProperty2.default)(_methods, "catchTouchMove", function catchTouchMove() {
    return false;
  }), (0, _defineProperty2.default)(_methods, "setSharerStrFn", function setSharerStrFn(sharer) {
    var searchArr = decodeURIComponent(sharer).split(',');
    sharer = searchArr[0];
    console.log('分享人的加密字符串', sharer);
    uni.setStorageSync('sharer', sharer);
  }), (0, _defineProperty2.default)(_methods, "setSharerStrFn_btn", function setSharerStrFn_btn(sharer) {
    sharer = sharer.scene;
    if (sharer) {
      uni.setStorageSync('sharer', sharer);
    }
  }), (0, _defineProperty2.default)(_methods, "setConfigFn", function setConfigFn() {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(res) {
        var result, resultObj;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return that.$request({
                  url: '/api/Index/GetConfig'
                });
              case 2:
                result = _context8.sent;
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = (0, _tools.assertObject)(result.data.data);
                    that.$store.commit('setConfigInfo', resultObj.config);
                    console.log('获取全局配置中 赋值后');
                    that.getTabBar(); // 获取底部tab栏
                    res(resultObj.config);
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
              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));
      return function (_x8) {
        return _ref6.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "checkIsiPhoneXFn", function checkIsiPhoneXFn() {
    var that = this;
    uni.getSystemInfo({
      success: function success(res) {
        var iPhoneList = ['iPhone X', 'iPhone 11', 'iPhone 11 Pro Max'];
        var modelmes = res.model,
          bool = false;
        iPhoneList.forEach(function (item) {
          if (modelmes.search(item) != -1) {
            bool = true;
          }
        });
        that.$store.commit('setIsiPhoneX', bool);
      }
    });
  }), (0, _defineProperty2.default)(_methods, "getTabBar", function getTabBar() {
    var that = this,
      pathList = [{
        "pagePath": "/pages/index/index"
      }, {
        "pagePath": "/pages/class/class"
      }, {
        "pagePath": "/pages/eat/eat"
      }, {
        "pagePath": "/pages/cart/cart"
      }, {
        "pagePath": "/pages/my/my"
      }],
      configInfo = (0, _tools.assertObject)(that.configInfo),
      tabBarList = (0, _tools.assertArray)(configInfo.tabbar),
      menuList = tabBarList.map(function (tatBarItem, index) {
        var typeObj = {};
        // 判断是购物车 加上标识符
        if (tatBarItem.field == 'g') {
          typeObj.type = 'card';
        }
        if (tatBarItem.field == 'c') {
          typeObj.type = tatBarItem.type;
          typeObj.content = tatBarItem.content;
        }
        return _objectSpread({
          "pagePath": pathList[index].pagePath,
          "selectedIconPath": that.addimgPathHostFn(tatBarItem.xi),
          "iconPath": that.addimgPathHostFn(tatBarItem.mi),
          "text": tatBarItem.inm,
          field: tatBarItem.field,
          isShow: tatBarItem.xs == 1
        }, typeObj);
      }).filter(function (item) {
        return item.isShow;
      });
    that.$store.commit('setMenuList', menuList);
  }), (0, _defineProperty2.default)(_methods, "hexToRgba", function hexToRgba(hex, opacity) {
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
  }), (0, _defineProperty2.default)(_methods, "devIngFn", function devIngFn() {
    uni.showModal({
      showCancel: false,
      //不显示取消按钮
      title: '敬请期待',
      success: function success(e) {//确认后的回调
      }
    });
  }), (0, _defineProperty2.default)(_methods, "getConfigImg", function getConfigImg(flag) {
    for (var i = 0; i < this.configInfo.dodecorate.length; i++) {
      if (this.configInfo.dodecorate[i].field == flag) {
        return this.addimgPathHostFn(this.configInfo.dodecorate[i].img);
      }
    }
  }), (0, _defineProperty2.default)(_methods, "getConfigIsShow", function getConfigIsShow(flag) {
    for (var i = 0; i < this.configInfo.dodecorate.length; i++) {
      if (this.configInfo.dodecorate[i].field == flag) {
        return this.configInfo.dodecorate[i].xs == '1';
      }
    }
  }), (0, _defineProperty2.default)(_methods, "getH", function getH(h1, winh) {
    if (h1 <= winh) {
      return winh;
    }
    return h1;
  }), (0, _defineProperty2.default)(_methods, "shareFn", function shareFn(obj) {
    var that = this;
    var resultObj = _objectSpread({}, obj.options);

    // 需要带参数并且需要带分享者的 加密字符串
    if ((0, _tools.checkTypeFn)(obj.query) == 'Object' && Object.keys(obj.query).length > 0 && obj.query.scene) {
      if (that.isLogin) {
        obj.query.scene = that.userInfoEncrypt;
      } else {
        delete obj.query.scene;
      }
    }
    resultObj.path = function () {
      var pathStr = obj.path;
      if ((0, _tools.checkTypeFn)(obj.query) == 'Object' && Object.keys(obj.query).length > 0) {
        pathStr += "?shareFn=true&";
        for (var i in obj.query) {
          pathStr += "".concat(i, "=").concat(obj.query[i], "&");
        }
        pathStr = pathStr.substr(0, pathStr.length - 1);
      }
      return pathStr;
    }();
    console.log(resultObj, '分享出去的对象', '\n');
    return resultObj;
  }), (0, _defineProperty2.default)(_methods, "shareAppFn", function shareAppFn(obj) {
    var that = this;
    var resultObj;
    if (Object.keys((0, _tools.assertObject)(obj.options)).length > 0) {
      resultObj = _objectSpread({}, obj.options);
    } else {
      resultObj = {};
    }

    // 需要带参数并且需要带分享者的 加密字符串
    if ((0, _tools.checkTypeFn)(obj.query) == 'Object' && Object.keys(obj.query).length > 0 && obj.query.scene) {
      if (that.isLogin) {
        obj.query.scene = that.userInfoEncrypt;
      } else {
        delete obj.query.scene;
      }
    }
    resultObj.path = function () {
      var pathStr = obj.path;
      if ((0, _tools.checkTypeFn)(obj.query) == 'Object' && Object.keys(obj.query).length > 0) {
        pathStr += "?shareFn=true&";
        for (var i in obj.query) {
          pathStr += "".concat(i, "=").concat(obj.query[i], "&");
        }
        pathStr = pathStr.substr(0, pathStr.length - 1);
      }
      return pathStr;
    }();
    var _resultObj = resultObj,
      imageUrl = _resultObj.imageUrl,
      title = _resultObj.title,
      path = _resultObj.path;
    var opt = {
      provider: 'weixin',
      type: 5,
      scene: 'WXSceneSession',
      imageUrl: imageUrl,
      title: title,
      miniProgram: {
        // id: 'gh_19b177f69985',
        id: that.configInfo.originalid,
        path: path,
        type: 0,
        // 微信小程序版本类型，可取值： 0-正式版； 1-测试版； 2-体验版。 默认值为0。
        webUrl: 'https://uniapp.dcloud.io'
      },
      complete: function complete(e) {
        console.log('分享完返回的东西', e);
      }
    };
    uni.share(opt);
    console.log('app分享的参数信息', opt);
  }), (0, _defineProperty2.default)(_methods, "openSettingFn", function openSettingFn(settingStr) {
    uni.openSetting();
  }), (0, _defineProperty2.default)(_methods, "settingInfoFn", function settingInfoFn(settingStr) {
    return new Promise(function (resFn, rejFn) {
      var obj = {};
      uni.getSetting({
        success: function success(res) {
          obj.type = 'success';
          obj.msg = '获取权限列表成功';
          var keys = Object.keys(res.authSetting);
          if (keys.includes(settingStr)) {
            obj.isFirst = false;
            if (res.authSetting[settingStr]) {
              obj.isOk = true;
            } else {
              obj.isOk = false;
            }
          } else {
            obj.isFirst = true;
          }
          resFn(obj);
        },
        fail: function fail() {
          rejFn({
            type: 'error',
            msg: '获取权限列表失败',
            result: '获取权限列表失败'
          });
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "homeTempIdListIsConfirm", function homeTempIdListIsConfirm(list) {
    return new Promise(function (resFn, rejFn) {
      uni.getSetting({
        withSubscriptions: true,
        //是否同时获取用户订阅消息的订阅状态，默认不获取
        success: function success(res) {
          var arr = [];
          list.forEach(function (message) {
            if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings && res.subscriptionsSetting.itemSettings[message] == 'accept') {
              arr.push(true);
            } else {
              arr.push(false);
            }
          });
          var everyResult = arr.every(function (item) {
            return item == true;
          });
          if (arr.length == list.length && everyResult) {
            resFn({
              type: 'success'
            });
          } else {
            resFn({
              type: 'error'
            });
          }
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "getGlobalSendMsgFlag", function getGlobalSendMsgFlag() {
    return new Promise(function (resFn, rejFn) {
      uni.getSetting({
        withSubscriptions: true,
        //是否同时获取用户订阅消息的订阅状态，默认不获取
        success: function success(res) {
          if ((0, _tools.checkTypeFn)(res.subscriptionsSetting) == 'Object' && Object.keys(res.subscriptionsSetting).length > 0 && res.subscriptionsSetting.mainSwitch) {
            resFn({
              type: 'success',
              msg: '订阅消息已开启',
              result: res
            });
          } else {
            resFn({
              type: 'error',
              msg: '订阅消息未开启',
              result: res
            });
          }
        },
        fail: function fail(e) {
          resFn({
            type: 'error',
            msg: '获取失败',
            result: e
          });
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "isUserCloneMsg", function isUserCloneMsg(list) {
    list = (0, _tools.assertArray)(list);
    return new Promise(function (resFn, rejFn) {
      uni.getSetting({
        withSubscriptions: true,
        //是否同时获取用户订阅消息的订阅状态，默认不获取
        success: function success(res) {
          if ((0, _tools.checkTypeFn)(res.subscriptionsSetting) == 'Object' && Object.keys(res.subscriptionsSetting).length > 0 && res.subscriptionsSetting.mainSwitch) {
            var arr = [];
            list.forEach(function (message) {
              if (res.subscriptionsSetting.itemSettings && res.subscriptionsSetting.itemSettings[message] == 'reject') {
                arr.push(true);
              } else {
                arr.push(false);
              }
            });
            if (arr.includes(true)) {
              resFn({
                type: 'success'
              });
            } else {
              resFn({
                type: 'error'
              });
            }
          } else {
            resFn({
              type: 'error'
            });
          }
        },
        fail: function fail() {
          resFn({
            type: 'error'
          });
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "getMyPageFn", function getMyPageFn() {
    var that = this;
    console.log('getMyPageFn 执行');
    return new Promise( /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(resFn, rejFn) {
        var result, resObj, resultObj, headWrapInfo, vipIconList, bannerList, laBaMsg, vipIcon, vipTitle, vipBtnText;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return that.$request({
                  url: '/api/User/PageData'
                });
              case 2:
                result = _context9.sent;
                resObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = (0, _tools.assertObject)(result.data.data); // 后台返回的数据
                    headWrapInfo = (0, _tools.assertObject)(resultObj.vip); // 个人中心头部的数据
                    vipIconList = (0, _tools.assertArray)(headWrapInfo.vip_equity); // 会员权益列表
                    bannerList = (0, _tools.assertArray)(resultObj.image); // 个人中心的轮播图数据
                    laBaMsg = headWrapInfo.user_vip_card_cue; // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
                    vipIcon = headWrapInfo.user_vip_card_icon; // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
                    vipTitle = headWrapInfo.vip_eco; // V的图标后的标题文字 后端字段是 vip_eco
                    vipBtnText = headWrapInfo.vip_button; // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
                    resObj = {
                      type: 'success',
                      msg: result.data.msg,
                      result: {
                        vipIconList: vipIconList,
                        // 会员权益列表
                        bannerList: bannerList,
                        // 个人中心的轮播图数据
                        laBaMsg: laBaMsg,
                        // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
                        vipIcon: vipIcon,
                        // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
                        vipTitle: vipTitle,
                        // V的图标后的标题文字 后端字段是 vip_eco
                        vipBtnText: vipBtnText // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
                      }
                    };
                  } else {
                    resObj = {
                      type: 'error',
                      msg: result.data.msg
                    };
                  }
                } else {
                  resObj = {
                    type: 'error',
                    msg: that.$errorMsg
                  };
                }
                resFn(resObj);
              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
      return function (_x9, _x10) {
        return _ref7.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "getUserInfoFn", function getUserInfoFn() {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(resFn, rejFn) {
        var result, resObj, resultObj, userInfoObj, userInfoAvatar, userInfoNickName, userInfoLv, userInfoMoney, userInfoCoupon, userInfoMc, userInfoIntegral, userInfoMobile, userInfoEncrypt, headWrapInfo, isVip, vipName, vipTes, vipEndTime, laBaMsg, vipIcon, vipTitle, vipBtnText, vipIconList, orderNumObj, orderNumUn, orderNumIng, orderNumEd;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return that.$request({
                  url: '/api/User/index'
                });
              case 2:
                result = _context10.sent;
                resObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    resultObj = (0, _tools.assertObject)(result.data.data); // 后台返回的数据
                    // 个人中心头部的数据 - 用户的数据
                    userInfoObj = (0, _tools.assertObject)(resultObj.userinfo);
                    userInfoAvatar = userInfoObj.avatar; // 头像地址
                    userInfoNickName = userInfoObj.nickname; // 网名
                    userInfoLv = userInfoObj.lv; // 等级
                    userInfoMoney = userInfoObj.money; // 余额
                    userInfoCoupon = userInfoObj.coupon; // 优惠券数量
                    userInfoMc = userInfoObj.mc; // 商品券
                    userInfoIntegral = userInfoObj.integral; // 积分
                    userInfoMobile = userInfoObj.mobile; // 手机号
                    userInfoEncrypt = userInfoObj.encrypt; // 加密字符串
                    // 个人中心头部的数据 - 卡片里的东西
                    headWrapInfo = (0, _tools.assertObject)(resultObj.userVip); // 
                    isVip = headWrapInfo.is_vip == 1 ? true : false; // 是否是vip用户
                    vipName = headWrapInfo.vip_name; // 会员名称   不是会员传的是 普通会员
                    vipTes = headWrapInfo.vip_tes; // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
                    vipEndTime = headWrapInfo.vip_end_time; // 会员过期时间文字  此字段没提示就是空  直接用就行了
                    laBaMsg = headWrapInfo.user_vip_card_cue; // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
                    vipIcon = headWrapInfo.user_vip_card_icon; // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
                    vipTitle = headWrapInfo.vip_eco; // V的图标后的标题文字 后端字段是 vip_eco
                    vipBtnText = headWrapInfo.vip_button; // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
                    vipIconList = (0, _tools.assertArray)(headWrapInfo.vip_equity); // 会员权益列表
                    // 我的订单-订单数 数据
                    orderNumObj = resultObj.orderNum;
                    orderNumUn = orderNumObj.non_order; // 我的订单-待支付数量
                    orderNumIng = orderNumObj.on_order; // 我的订单-进行中数量
                    orderNumEd = orderNumObj.com_order; // 我的订单-待评价数量
                    resObj = {
                      type: 'success',
                      msg: result.data.msg,
                      result: {
                        // 个人中心头部的数据 - 用户的数据
                        userInfoAvatar: userInfoAvatar,
                        // 头像地址
                        userInfoNickName: userInfoNickName,
                        // 网名
                        userInfoLv: userInfoLv,
                        // 等级
                        userInfoMoney: userInfoMoney,
                        // 余额
                        userInfoCoupon: userInfoCoupon,
                        // 优惠券数量
                        userInfoMc: userInfoMc,
                        // 商品券
                        userInfoIntegral: userInfoIntegral,
                        // 积分
                        userInfoMobile: userInfoMobile,
                        // 手机号
                        userInfoEncrypt: userInfoEncrypt,
                        // 加密字符串

                        isVip: isVip,
                        // 是否是vip用户
                        vipName: vipName,
                        // 会员名称   不是会员传的是 普通会员
                        vipTes: vipTes,
                        // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
                        vipEndTime: vipEndTime,
                        // 会员过期时间文字  此字段没提示就是空  直接用就行了

                        laBaMsg: laBaMsg,
                        // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
                        vipIcon: vipIcon,
                        // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
                        vipTitle: vipTitle,
                        // V的图标后的标题文字 后端字段是 vip_eco
                        vipBtnText: vipBtnText,
                        // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
                        vipIconList: vipIconList,
                        // 会员权益列表

                        // 我的订单-订单数 数据
                        orderNumUn: orderNumUn,
                        // 我的订单-待支付数量
                        orderNumIng: orderNumIng,
                        // 我的订单-进行中数量
                        orderNumEd: orderNumEd // 我的订单-待评价数量
                      }
                    };
                  } else {
                    resObj = {
                      type: 'error',
                      msg: result.data.msg
                    };
                  }
                } else {
                  resObj = {
                    type: 'error',
                    msg: that.$errorMsg
                  };
                }
                resFn(resObj);
              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));
      return function (_x11, _x12) {
        return _ref8.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "unHasTokenGetUserInfo", function unHasTokenGetUserInfo(fn) {
    var _this3 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
      var that, result, _result$result, vipIconList, bannerList, laBaMsg, vipIcon, vipTitle, vipBtnText;
      return _regenerator.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              that = _this3;
              _context11.next = 3;
              return that.getMyPageFn();
            case 3:
              result = _context11.sent;
              if (result.type == 'success') {
                _result$result = result.result, vipIconList = _result$result.vipIconList, bannerList = _result$result.bannerList, laBaMsg = _result$result.laBaMsg, vipIcon = _result$result.vipIcon, vipTitle = _result$result.vipTitle, vipBtnText = _result$result.vipBtnText;
                that.$store.commit('setPage', {
                  vipIconList: vipIconList,
                  bannerList: bannerList,
                  laBaMsg: laBaMsg,
                  vipIcon: vipIcon,
                  vipTitle: vipTitle,
                  vipBtnText: vipBtnText
                });
              } else {
                uni.showToast({
                  icon: 'none',
                  title: result.msg
                });
              }
              fn && fn();
            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  }), (0, _defineProperty2.default)(_methods, "hasTokenGetUserInfo", function hasTokenGetUserInfo(fn) {
    var _this4 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
      var that, _yield$Promise$all, _yield$Promise$all2, myPageResult, userInfoResult, errorMsg, bannerList, _userInfoResult$resul, userInfoAvatar, userInfoNickName, userInfoLv, userInfoMoney, userInfoCoupon, userInfoMc, userInfoIntegral, userInfoMobile, userInfoEncrypt, isVip, vipName, vipTes, vipEndTime, laBaMsg, vipIcon, vipTitle, vipBtnText, vipIconList, orderNumUn, orderNumIng, orderNumEd;
      return _regenerator.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              that = _this4;
              _context12.next = 3;
              return Promise.all([that.getMyPageFn(), that.getUserInfoFn()]);
            case 3:
              _yield$Promise$all = _context12.sent;
              _yield$Promise$all2 = (0, _slicedToArray2.default)(_yield$Promise$all, 2);
              myPageResult = _yield$Promise$all2[0];
              userInfoResult = _yield$Promise$all2[1];
              console.log('个人中心有登录状态下返回的两个数据', [myPageResult, userInfoResult]);
              if (myPageResult.type == 'error') {
                errorMsg = myPageResult.msg;
              }
              if (userInfoResult.type == 'error') {
                errorMsg = userInfoResult.msg;
              }
              if (myPageResult.type == 'success' && userInfoResult.type == 'success') {
                bannerList = myPageResult.result.bannerList; // 个人中心的轮播图数据
                _userInfoResult$resul = userInfoResult.result, userInfoAvatar = _userInfoResult$resul.userInfoAvatar, userInfoNickName = _userInfoResult$resul.userInfoNickName, userInfoLv = _userInfoResult$resul.userInfoLv, userInfoMoney = _userInfoResult$resul.userInfoMoney, userInfoCoupon = _userInfoResult$resul.userInfoCoupon, userInfoMc = _userInfoResult$resul.userInfoMc, userInfoIntegral = _userInfoResult$resul.userInfoIntegral, userInfoMobile = _userInfoResult$resul.userInfoMobile, userInfoEncrypt = _userInfoResult$resul.userInfoEncrypt, isVip = _userInfoResult$resul.isVip, vipName = _userInfoResult$resul.vipName, vipTes = _userInfoResult$resul.vipTes, vipEndTime = _userInfoResult$resul.vipEndTime, laBaMsg = _userInfoResult$resul.laBaMsg, vipIcon = _userInfoResult$resul.vipIcon, vipTitle = _userInfoResult$resul.vipTitle, vipBtnText = _userInfoResult$resul.vipBtnText, vipIconList = _userInfoResult$resul.vipIconList, orderNumUn = _userInfoResult$resul.orderNumUn, orderNumIng = _userInfoResult$resul.orderNumIng, orderNumEd = _userInfoResult$resul.orderNumEd;
                that.$store.commit('setUserInfoAndPage', {
                  // 个人中心头部的数据 - 用户的数据
                  userInfoAvatar: userInfoAvatar,
                  // 头像地址
                  userInfoNickName: userInfoNickName,
                  // 网名
                  userInfoLv: userInfoLv,
                  // 等级
                  userInfoMoney: userInfoMoney,
                  // 余额
                  userInfoCoupon: userInfoCoupon,
                  // 优惠券数量
                  userInfoMc: userInfoMc,
                  // 商品券
                  userInfoIntegral: userInfoIntegral,
                  // 积分
                  userInfoMobile: userInfoMobile,
                  // 手机号
                  userInfoEncrypt: userInfoEncrypt,
                  // 加密字符串

                  isVip: isVip,
                  // 是否是vip用户
                  vipName: vipName,
                  // 会员名称   不是会员传的是 普通会员
                  vipTes: vipTes,
                  // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
                  vipEndTime: vipEndTime,
                  // 会员过期时间文字  此字段没提示就是空  直接用就行了

                  laBaMsg: laBaMsg,
                  // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
                  vipIcon: vipIcon,
                  // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
                  vipTitle: vipTitle,
                  // V的图标后的标题文字 后端字段是 vip_eco
                  vipBtnText: vipBtnText,
                  // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
                  vipIconList: vipIconList,
                  // 会员权益列表

                  // 我的订单-订单数 数据
                  orderNumUn: orderNumUn,
                  // 我的订单-待支付数量
                  orderNumIng: orderNumIng,
                  // 我的订单-进行中数量
                  orderNumEd: orderNumEd,
                  // 我的订单-待评价数量

                  bannerList: bannerList // 个人中心的轮播图数据
                });
              } else {
                uni.showToast({
                  icon: 'none',
                  msg: errorMsg
                });
              }
              fn && fn();
            case 12:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getLoginData", function getLoginData() {
    var _this5 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13() {
      var that;
      return _regenerator.default.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              that = _this5;
              return _context13.abrupt("return", new Promise(function (resFn, rejFn) {
                uni.getUserInfo({
                  //获取用户信息
                  success: function success(userInfoRes) {
                    //第一次提示用户授权 成功后的回调 授权后再点直接成功 拿回来用户信息
                    uni.login({
                      success: function success(e) {
                        /* 
                        console.log(
                        	'uni.getUserInfo', userInfoRes, '\n',
                        	'uni.login', e, '\n',
                        );
                         */
                        resFn({
                          type: 'success',
                          msg: '成功',
                          result: {
                            encryptedData: userInfoRes.encryptedData,
                            iv: userInfoRes.iv,
                            code: e.code
                          }
                        });
                      }
                    });
                  }
                });
              }));
            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getUserProfileFn", function getUserProfileFn() {}), (0, _defineProperty2.default)(_methods, "loginFn", function loginFn() {
    var _this6 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
      var that, userProfileObject, avatarUrl, nickName, province, city, gender;
      return _regenerator.default.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              that = _this6;
              _context15.next = 3;
              return that.getUserProfileFn();
            case 3:
              userProfileObject = _context15.sent;
              console.log('getUserProfileFn 返回数据', userProfileObject);
              if (!(userProfileObject.type == 'success')) {
                _context15.next = 13;
                break;
              }
              avatarUrl = userProfileObject.result.avatarUrl;
              nickName = userProfileObject.result.nickName;
              province = userProfileObject.result.province;
              city = userProfileObject.result.city;
              gender = userProfileObject.result.gender;
              _context15.next = 15;
              break;
            case 13:
              uni.showToast({
                icon: 'none',
                title: '获取个人信息失败'
              });
              return _context15.abrupt("return", false);
            case 15:
              uni.getUserInfo({
                //获取用户信息
                success: function success(userInfoRes) {
                  var iv = encodeURIComponent(userInfoRes.iv);
                  var encryptedData = encodeURIComponent(userInfoRes.encryptedData);
                  console.log('uni.getUserInfo success函数 userInfoRes 数据', userInfoRes);
                  //第一次提示用户授权 成功后的回调 授权后再点直接成功 拿回来用户信息
                  uni.login({
                    success: function success(e) {
                      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14() {
                        var code, sharerObj, sharerStr, data, result, token;
                        return _regenerator.default.wrap(function _callee14$(_context14) {
                          while (1) {
                            switch (_context14.prev = _context14.next) {
                              case 0:
                                code = e.code; // 登录时 把分享者的字符串带上
                                console.log('uni.login success函数 e数据', e);
                                sharerObj = {};
                                sharerStr = uni.getStorageSync('sharer'); // 带上分享上级的加密字符串
                                if (sharerStr) {
                                  sharerObj.sharer = sharerStr;
                                }
                                data = _objectSpread({
                                  platform: 'wechat_applet',
                                  code: code,
                                  iv: iv,
                                  encryptedData: encryptedData,
                                  avatar: avatarUrl,
                                  nickname: nickName,
                                  area: "".concat((0, _tools.en2ch)(province), "-").concat((0, _tools.en2ch)(city)),
                                  sex: gender
                                }, sharerObj);
                                _context14.next = 8;
                                return that.$request({
                                  loading: true,
                                  url: '/api/User/third',
                                  data: data
                                });
                              case 8:
                                result = _context14.sent;
                                console.log('用户登录时带的参数', data, '\n', '返回的结果', result, '\n');
                                if (result.statusCode == 200) {
                                  if (result.data.code == 200) {
                                    that.logOutFn(); // 先退出登录一下
                                    token = (0, _tools.assertObject)(result.data.data).token;
                                    that.$store.commit('setToken', token);
                                    uni.setStorageSync('token', token);
                                    that.hideAllFn();
                                    uni.showLoading({});
                                    that.hasTokenGetUserInfo(function () {
                                      uni.hideLoading();
                                      uni.showToast({
                                        icon: 'success',
                                        title: '登录成功'
                                      });
                                      setTimeout(function () {
                                        that.toBackFn(); // 正常返回上一页 如果没有上一页 就回首页
                                      }, 500);
                                    });
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
                              case 11:
                              case "end":
                                return _context14.stop();
                            }
                          }
                        }, _callee14);
                      }))();
                    }
                  });
                },
                fail: function fail(e) {
                  console.log('登录失败 小程序 getUserInfo 接口fail ', e);
                }
              });
            case 16:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }))();
  }), (0, _defineProperty2.default)(_methods, "logOutFn", function logOutFn() {
    var that = this;
    uni.setStorageSync('token', ''); // 清空token
    uni.setStorageSync('sharer', ''); // 清空分享上级的加密字符串

    that.$store.commit('setToken', '');
    that.$store.commit('setUserInfoAndPage', {
      userInfoAvatar: '',
      // 头像地址
      userInfoNickName: '',
      // 网名
      userInfoLv: 0,
      // 等级
      userInfoMoney: 0,
      // 余额
      userInfoCoupon: 0,
      // 优惠券数量
      userInfoMc: 0,
      // 商品券
      userInfoIntegral: 0,
      // 积分
      userInfoMobile: '',
      // 手机号
      userInfoEncrypt: '',
      // 加密字符串

      isVip: false,
      // 是否是vip用户
      vipName: '',
      // 会员名称   不是会员传的是 普通会员
      vipTes: '',
      // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
      vipEndTime: '',
      // 会员过期时间文字  此字段没提示就是空  直接用就行了

      laBaMsg: '',
      // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
      vipIcon: '',
      // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
      vipTitle: '',
      // V的图标后的标题文字 后端字段是 vip_eco
      vipBtnText: '',
      // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
      vipIconList: [],
      // 会员权益列表

      orderNumUn: 0,
      // 我的订单-待支付数量
      orderNumIng: 0,
      // 我的订单-进行中数量
      orderNumEd: 0,
      // 我的订单-待评价数量

      bannerList: [] // 个人中心轮播图数据
    });
  }), (0, _defineProperty2.default)(_methods, "lookBigImgFn", function lookBigImgFn(imgList) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    uni.previewImage({
      current: index,
      //预览图片的下标
      urls: imgList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
    });
  }), (0, _defineProperty2.default)(_methods, "checkSessionFn", function checkSessionFn() {
    return new Promise(function (resFn, rejFn) {
      var resObj = {};
      uni.checkSession({
        success: function success(e) {
          resObj = {
            type: 'success',
            msg: '成功',
            result: {
              code: ''
            }
          };
          resFn(resObj);
          return false;
        },
        fail: function fail(e) {
          uni.login({
            success: function success(loginInfo) {
              if (loginInfo.errMsg == 'login:ok') {
                resObj = {
                  type: 'success',
                  msg: '成功',
                  result: {
                    code: loginInfo.code
                  }
                };
              } else {
                resObj = {
                  type: 'error',
                  msg: '失败'
                };
              }
              resFn(resObj);
            }
          });
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "wxGetTelFn", function wxGetTelFn(e) {
    var _this7 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
      var that, checkSessionResult, code, result;
      return _regenerator.default.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              that = _this7;
              _context16.next = 3;
              return that.checkSessionFn();
            case 3:
              checkSessionResult = _context16.sent;
              if (!(checkSessionResult.type != 'success')) {
                _context16.next = 7;
                break;
              }
              uni.showToast({
                icon: 'none',
                title: '获取手机号失败'
              });
              return _context16.abrupt("return", false);
            case 7:
              code = checkSessionResult.result.code;
              _context16.next = 10;
              return that.$request({
                method: 'post',
                url: '/api/User/BinMobile',
                data: {
                  code: code,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv
                }
              });
            case 10:
              result = _context16.sent;
              console.log('通过微信小程序授权获取用户手机号接口返回数据', result);
              uni.$emit('wxBindTel', result);
            case 13:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }))();
  }), (0, _defineProperty2.default)(_methods, "hideAllFn", function hideAllFn() {
    uni.hideLoading();
    uni.hideToast();
  }), (0, _defineProperty2.default)(_methods, "AppOpenMiniprogramFn", function AppOpenMiniprogramFn(options) {
    var that = this;
    var path = options.path;
    var id = that.configInfo.originalid;
    plus.share.getServices(function (res) {
      var sweixin = null;
      for (var i = 0; i < res.length; i++) {
        var t = res[i];
        if (t.id == 'weixin') {
          sweixin = t;
        }
      }
      if (sweixin) {
        sweixin.launchMiniProgram({
          id: id,
          path: path,
          type: 0
        });
      }
    }, function (res) {
      console.log('app 跳转到小程序 函数的回调结果', res);
    });
  }), (0, _defineProperty2.default)(_methods, "appToMiniprogramFn", function appToMiniprogramFn(options) {
    var that = this;
    console.log('options,that.configInfo.service_url', options, that.configInfo.service_url);
    // 没有配置信息进入客服
    if (!options) {
      if (that.configInfo.service_url) {
        var kefuUrl = encodeURIComponent(that.configInfo.service_url);
        console.log("uniapp\u8DF3\u8F6C\u7684url", "/packageA/web-view/index?data=".concat(kefuUrl, "&title=\u5BA2\u670D"));
        that.navigateToFn({
          url: "/packageA/web-view/index?data=".concat(kefuUrl, "&title=\u5BA2\u670D")
        });
        return false;
      }
      uni.showModal({
        title: '在小程序里使用此功能',
        success: function success(e) {
          if (e.confirm) {
            // 确认后的回调
            that.AppOpenMiniprogramFn({
              path: "packageA/kefu/kefu"
            });
          }
        }
      });
      return false;
    }
    options.title = options.title ? options.title : '在小程序里使用此功能';
    options.path = options.path ? options.path : 'pages/index/index';
    uni.showModal({
      title: options.title,
      success: function success(e) {
        if (e.confirm) {
          // 确认后的回调
          that.AppOpenMiniprogramFn({
            path: options.path
          });
        }
      }
    });
  }), (0, _defineProperty2.default)(_methods, "telFn", function telFn(tel) {
    uni.makePhoneCall({
      phoneNumber: tel
    });
  }), (0, _defineProperty2.default)(_methods, "swiperClickFn", function swiperClickFn(item) {
    var that = this;
    console.log('点击轮播图跳转的数据', item);
    /*
    	轮播图类型  
    		0：无跳转
    		1：跳转到单个商品详情
    		2：跳转到商品分类
    		3：跳转到多个商品列表
    		4：跳转到文章
    		5：跳转到外部链接
    		6：跳转到小程序
    		7：跳转平台链接
    		8：跳转吃什么详情
    		9：跳转专题页面
    */
    if (item.type == 1) {
      // 1：跳转到单个商品详情
      that.navigateToFn({
        url: "/packageB/goods-detail/goods-detail?goods_id=".concat(item.content)
      });
    } else if (item.type == 2) {
      // 2：跳转到商品分类
      var str = item.content;
      var idArr = str.split('_');
      var topClassId = idArr[0];
      var leftClassId = idArr[1];
      uni.setStorageSync('home2Class', {
        topClassId: topClassId,
        leftClassId: leftClassId
      });
      that.navigateToFn({
        isTab: 1,
        url: "/pages/class/class"
      });
    } else if (item.type == 3) {
      // 3：跳转到多个商品列表
      that.navigateToFn({
        url: "/pages/list-page/home-swiper?goodsIdList=".concat(item.content)
      });
    } else if (item.type == 4) {
      // 4：跳转到文章
      uni.setStorageSync('helpQuestionItem', {
        title: '',
        content: item.content
      });
      that.navigateToFn({
        url: "/packageA/kefu/help-detail"
      });
    } else if (item.type == 5) {
      // 5：跳转到外部链接
      that.navigateToFn({
        url: "/packageA/web-view/index?data=".concat(item.content, "&title=").concat(item.title)
      });
    } else if (item.type == 6) {
      // 6：跳转到小程序
      var AppId, AppUrl;
      if ((0, _tools.checkTypeFn)(item.content) == 'String') {
        var info = JSON.parse(item.content);
        AppId = info.AppId;
        AppUrl = info.AppUrl;
      } else {
        AppId = item.content.appid;
        AppUrl = item.content.path;
      }
      uni.navigateToMiniProgram({
        appId: AppId,
        path: AppUrl
      });
    } else if (item.type == 7) {
      // 7：跳转平台链接
      var tabBarList = ["pages/index/index", "pages/class/class", "pages/eat/eat", "pages/cart/cart", "pages/my/my"];
      var navigateToOptions = {
        url: (0, _tools.url2navigateToUrlFn)(item.content)
      };
      if (tabBarList.includes(item.content)) {
        navigateToOptions.isTab = true;
      }
      that.navigateToFn(navigateToOptions);
    } else if (item.type == 8) {
      // 8：跳转吃什么详情
      that.navigateToFn({
        url: (0, _tools.url2navigateToUrlFn)(item.content)
      });
    } else if (item.type == 9) {
      that.navigateToFn({
        url: "/packageA/activity/activity?id=".concat(item.content)
      });
    } else {
      return false;
    }
  }), (0, _defineProperty2.default)(_methods, "getDefaultSpecFn", function getDefaultSpecFn(specFilter, specGoodsDetail) {
    var defaultSelectArr = [];
    specFilter.forEach(function (itme) {
      defaultSelectArr.push(itme.itme[0].id);
    });
    specGoodsDetail.forEach(function (item) {
      defaultSelectArr.push(item.key.split('_').map(function (item) {
        return (0, _tools.transNumFn)(item);
      }));
    });
    return {};
  }), (0, _defineProperty2.default)(_methods, "addimgPathHostFn", function addimgPathHostFn(str) {
    var that = this;
    var imgPathStr = (0, _tools.assertString)(str);
    if (imgPathStr.includes('http://') || imgPathStr.includes('https://')) {
      return imgPathStr;
    } else {
      return "".concat(that.configInfo.path).concat(imgPathStr);
    }
  }), (0, _defineProperty2.default)(_methods, "getSpecInfoFn", function getSpecInfoFn(goodsId) {
    var _this8 = this;
    return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee18() {
      var that;
      return _regenerator.default.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              that = _this8;
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(resFn) {
                  var result, resultObj, resObj, goodsSpecRowsList, goodsSpecSelectItemList;
                  return _regenerator.default.wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          _context17.next = 2;
                          return that.$request({
                            // temUrl: 'http://192.168.1.2/api/Goods/goods_list_spec',
                            url: '/api/Goods/goods_list_spec',
                            data: {
                              goods_id: goodsId
                            }
                          });
                        case 2:
                          result = _context17.sent;
                          resultObj = {};
                          if (result.statusCode == 200) {
                            if (result.data.code == 200) {
                              resObj = (0, _tools.assertObject)(result.data.data);
                              goodsSpecRowsList = (0, _tools.assertObject)(resObj.spec_goods_price); // 多规格项
                              goodsSpecSelectItemList = (0, _tools.addSpecFilterItemActAttrFn)((0, _tools.assertArray)(resObj.filter_spec)); // 多规格 笛卡尔积项对应的 商品 信息
                              resFn({
                                type: 'success',
                                msg: result.data.msg,
                                result: {
                                  goodsSpecSelectItemList: goodsSpecSelectItemList,
                                  goodsSpecRowsList: goodsSpecRowsList
                                }
                              });
                            } else {
                              resultObj = {
                                type: 'error',
                                msg: result.data.msg,
                                result: result
                              };
                            }
                          } else {
                            resultObj = {
                              type: 'error',
                              msg: that.$errorMsg,
                              result: result
                            };
                          }
                          resFn(resultObj);
                        case 6:
                        case "end":
                          return _context17.stop();
                      }
                    }
                  }, _callee17);
                }));
                return function (_x13) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 2:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }))();
  }), (0, _defineProperty2.default)(_methods, "getNewVersionFn", function getNewVersionFn() {
    var isCanIUse = uni.canIUse("getUpdateManager");
    console.log('当前微信版本是否 支持更新小程序代码, canIUse("getUpdateManager")返回结果', isCanIUse);
    if (isCanIUse) {
      var updateManager = uni.getUpdateManager();
      console.log('uni.getUpdateManager 更新详情对象 updateManager', updateManager);
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            uni.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function success(res) {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function () {
            uni.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            });
          });
        }
      });
    } else {
      uni.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      });
    }
  }), (0, _defineProperty2.default)(_methods, "checkRangeFn", function checkRangeFn(locationStr) {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee19(resFn, rejFn) {
        var locationArr, flag, result, resultObj;
        return _regenerator.default.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                locationArr = locationStr.split(',');
                if (locationArr[0] - 0 && locationArr[1] - 0) {
                  flag = true;
                } else {
                  flag = false;
                }
                if (flag) {
                  _context19.next = 5;
                  break;
                }
                resFn({
                  type: 'error',
                  msg: '缺少坐标参数',
                  result: locationStr
                });
                return _context19.abrupt("return", false);
              case 5:
                _context19.next = 7;
                return that.$request({
                  url: '/api/Address/delivery_range',
                  data: {
                    location: locationStr
                  }
                });
              case 7:
                result = _context19.sent;
                resultObj = {};
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    if (result.data.data) {
                      resultObj.type = 'success';
                      resultObj.msg = '在配送范围内';
                      resultObj.result = result;
                    } else {
                      resultObj.type = 'error';
                      resultObj.msg = '地址不在配送范围内';
                      resultObj.result = result;
                    }
                  } else {
                    resultObj.type = 'error';
                    resultObj.msg = result.data.msg;
                    resultObj.result = result;
                  }
                } else {
                  resultObj.type = 'error';
                  resultObj.msg = that.$errorMsg;
                  resultObj.result = result;
                }
                resFn(resultObj);
              case 11:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19);
      }));
      return function (_x14, _x15) {
        return _ref10.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "getLocationInfoFn", function getLocationInfoFn() {
    var that = this;
    return new Promise(function (resFn) {
      uni.getLocation({
        type: 'gcj02',
        success: function success(locationInfo) {
          resFn({
            type: 'success',
            msg: '成功',
            result: locationInfo
          });
        },
        fail: function fail(e) {
          resFn({
            type: 'error',
            msg: '获取位置失败',
            result: e
          });
        }
      });
    });
  }), (0, _defineProperty2.default)(_methods, "getDuozitidianFn", function getDuozitidianFn(lon, lat) {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee20(resFn) {
        var resObj, result, duozitidianList;
        return _regenerator.default.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                resObj = {};
                _context20.next = 3;
                return that.$request({
                  method: 'post',
                  url: "/api/Orderbranch/spusList",
                  data: {
                    lon: lon,
                    lat: lat
                  }
                });
              case 3:
                result = _context20.sent;
                if (result.statusCode == 200) {
                  if (result.data.code == 200) {
                    duozitidianList = (0, _tools.assertArray)(result.data.data).map(function (item) {
                      return {
                        id: item.id,
                        zitidianName: item.name,
                        zitidianAddressText: item.address,
                        zitidianImage: item.img,
                        zitidianTime: item.bh,
                        zitidianDist: item.dist,
                        isRange: item.is_range == 1
                      };
                    });
                    resObj = {
                      msg: result.data.msg,
                      type: 'success',
                      result: duozitidianList
                    };
                  } else {
                    resObj = {
                      msg: result.data.msg,
                      type: 'error',
                      result: result
                    };
                  }
                } else {
                  resObj = {
                    msg: that.$errorMsg,
                    type: 'error',
                    result: result
                  };
                }
                resFn(resObj);
              case 6:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));
      return function (_x16) {
        return _ref11.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "requestSubscribeMessageFn", function requestSubscribeMessageFn(templateIdList) {
    return new Promise(function (resFn) {
      var requestSubscribeMessageOptions = {
        tmplIds: templateIdList,
        success: function success(res) {
          resFn({
            type: 'success',
            result: res
          });
        },
        fail: function fail(e) {
          resFn({
            type: 'error',
            result: e
          });
        },
        complete: function complete(e) {
          console.log('mixin模板消息 requestSubscribeMessageFn 接口返回的东西', e);
        }
      };
      console.log(requestSubscribeMessageOptions);
      uni.requestSubscribeMessage(requestSubscribeMessageOptions);
    });
  }), (0, _defineProperty2.default)(_methods, "rpxTopxFn", function rpxTopxFn(rpx) {
    return windowWidth * rpx / 750;
  }), (0, _defineProperty2.default)(_methods, "getCurrentAddressInfo", function getCurrentAddressInfo(locationInfo) {
    var that = this;
    return new Promise( /*#__PURE__*/function () {
      var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee21(resFn) {
        var qqmapsdk;
        return _regenerator.default.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                qqmapsdk = new _qqmapWxJssdkMin.default({
                  key: that.configInfo.tx_map_key
                });
                qqmapsdk.reverseGeocoder({
                  location: {
                    latitude: locationInfo.latitude,
                    longitude: locationInfo.longitude
                  },
                  poi_options: "address_format=short",
                  success: function success(res) {
                    resFn({
                      type: _const.success,
                      result: res.result
                    });
                  },
                  fail: function fail(e) {
                    resFn({
                      type: _const.error,
                      msg: 'err:mapSdk',
                      result: e
                    });
                  },
                  complete: function complete(e) {
                    console.log('qqmapsdk.reverseGeocoder 函数运行完的结果', e);
                  }
                });
              case 2:
              case "end":
                return _context21.stop();
            }
          }
        }, _callee21);
      }));
      return function (_x17) {
        return _ref12.apply(this, arguments);
      };
    }());
  }), (0, _defineProperty2.default)(_methods, "copyStrFn", function copyStrFn(copyStr, fn) {
    uni.setClipboardData({
      data: copyStr,
      success: function success() {
        fn && fn();
      }
    });
  }), (0, _defineProperty2.default)(_methods, "copyFn", function copyFn(copyStr) {
    this.copyStrFn(copyStr, function () {
      uni.showToast({
        icon: 'success',
        title: '拷贝成功'
      });
    });
  }), (0, _defineProperty2.default)(_methods, "vibrateFn", function vibrateFn() {}), (0, _defineProperty2.default)(_methods, "isOpenGps", function isOpenGps() {
    var systemInfo = uni.getSystemInfoSync();
    if (systemInfo.brand == 'devtools') {
      return true;
    }
    return systemInfo.locationEnabled;
  }), _methods),
  // <------methods 结束

  computed: _objectSpread(_objectSpread({
    /* 
    	@description 是否登录
    	@return <Boolean>
    		true 是已登录
    		false 是未登录
    */
    isLogin: function isLogin() {
      return (0, _tools.assertString)(this.globalToken).length > 0;
    },
    /*
    	@description 当前用户是否绑定了手机号
    	@return <Boolean>
    		true 已绑定
    		false 未绑定
    */
    userIsBindMobile: function userIsBindMobile() {
      if (this.isLogin && "".concat(this.userInfoMobile).length === 11) {
        return true;
      }
      return false;
    },
    /* 
    	是否全角
    		返回true是全角
    		返回false是半角
    */
    isAllAngle: function isAllAngle() {
      var that = this;
      return that.configInfo.btn_type == 1;
    },
    /*
    	@description 后台是否开启 短信 功能 
    	@return <Boolean>
    		true 表示 后台有开启 短信服务
    		false 表示 后台没开启 短信服务
    */
    calcIsOpenSMFlag: function calcIsOpenSMFlag() {
      var that = this;
      /* 
      	枚举映射对象 规则是
      		 1 表示开启
      		 0 表示关闭
      */
      var mapEnumObj = {
        '1': true,
        '0': false
      };
      var flag = that.configInfo.sm_status;
      return mapEnumObj[flag];
    },
    /*
    	@return <Boolean>
    	是否使用了优惠券背景图片
    		返回true 使用了背景图片
    		返回false 使用了背景颜色
    */
    isUseCouponBgImg: function isUseCouponBgImg() {
      return this.configInfo.coupon_is_back == 2;
    },
    /*
    	@description
    		全局的是否显示吃什么页面
    	@return
    		<Boolean>
    		true 表示开启
    		false 表示关闭
    */
    isOpenEatPage: function isOpenEatPage() {
      var that = this;
      var configInfo = (0, _tools.assertObject)(that.configInfo);
      var tabBar = (0, _tools.assertArray)(configInfo.tabbar);
      var isOpenEatPageFlag = false;
      tabBar.forEach(function (item) {
        if (item.field == 'c') {
          if (item.xs == 1) {
            isOpenEatPageFlag = true;
          } else {
            isOpenEatPageFlag = false;
          }
        }
      });
      return isOpenEatPageFlag;
    },
    // 返回微信支付和支付宝支付的平台是否开通数据
    calcOpenIngPayData: function calcOpenIngPayData() {
      var that = this,
        configInfo = (0, _tools.assertObject)(that.configInfo),
        paysConfig = (0, _tools.assertObject)(configInfo.pays_config);
      return paysConfig;
    },
    // 返回微信支付下开通的平台
    calcOpenIngWeiXinPayTypeArr: function calcOpenIngWeiXinPayTypeArr() {
      var that = this,
        payTypeObject = (0, _tools.assertObject)(that.calcOpenIngPayData.wechat),
        payTypeArr = Object.keys(payTypeObject);
      return payTypeArr.filter(function (i) {
        return payTypeObject[i] == 1;
      });
    },
    // 返回支付宝支付下开通的平台
    calcOpenIngZhifubaoPayTypeArr: function calcOpenIngZhifubaoPayTypeArr() {
      var that = this,
        payTypeObject = (0, _tools.assertObject)(that.calcOpenIngPayData.alipay),
        payTypeArr = Object.keys(payTypeObject);
      return payTypeArr.filter(function (i) {
        return payTypeObject[i] == 1;
      });
    },
    // 安卓app平台是否支持微信支付
    calcWeixinPayAndroidApp: function calcWeixinPayAndroidApp() {
      return (0, _tools.assertArray)(this.calcOpenIngWeiXinPayTypeArr).includes(_const.openIngEnumObj[_const.openIngApp]);
    },
    // h5平台是否支持微信支付
    calcWeixinPayH5: function calcWeixinPayH5() {
      return (0, _tools.assertArray)(this.calcOpenIngWeiXinPayTypeArr).includes(_const.openIngEnumObj[_const.openIngH5]);
    },
    // 微信小程序平台是否支持微信支付
    calcWeixinPayMiniprogram: function calcWeixinPayMiniprogram() {
      return (0, _tools.assertArray)(this.calcOpenIngWeiXinPayTypeArr).includes(_const.openIngEnumObj[_const.openIngWxminiprogram]);
    },
    // 公众号平台是否支持微信支付
    calcWeixinofficialaccount: function calcWeixinofficialaccount() {
      return (0, _tools.assertArray)(this.calcOpenIngWeiXinPayTypeArr).includes(_const.openIngEnumObj[_const.openIngWxofficialaccount]);
    },
    // 安卓app平台是否支持支付宝支付
    calcZhifubaoPayAndroidApp: function calcZhifubaoPayAndroidApp() {
      return (0, _tools.assertArray)(this.calcOpenIngZhifubaoPayTypeArr).includes(_const.openIngEnumObj[_const.openIngApp]);
    },
    // h5平台是否支持支付宝支付
    calcZhifubaoPayH5: function calcZhifubaoPayH5() {
      return (0, _tools.assertArray)(this.calcOpenIngZhifubaoPayTypeArr).includes(_const.openIngEnumObj[_const.openIngH5]);
    },
    // 微信小程序平台是否支持支付宝支付
    calcZhifubaoPayMiniprogram: function calcZhifubaoPayMiniprogram() {
      return (0, _tools.assertArray)(this.calcOpenIngZhifubaoPayTypeArr).includes(_const.openIngEnumObj[_const.openIngWxminiprogram]);
    },
    // 公众号平台是否支持支付宝支付
    calcZhifubaoofficialaccount: function calcZhifubaoofficialaccount() {
      return (0, _tools.assertArray)(this.calcOpenIngZhifubaoPayTypeArr).includes(_const.openIngEnumObj[_const.openIngWxofficialaccount]);
    }
  }, (0, _vuex.mapState)({
    configInfo: function configInfo(store) {
      return store.configInfo;
    },
    // 全局的配置信息
    appStaticPath: function appStaticPath(store) {
      return store.appStaticPath;
    },
    // 设置程序里使用的静态图片路径 (永远不换的图片)
    MenuList: function MenuList(store) {
      return store.MenuList;
    },
    // tab-bar 的数据
    isiPhoneX: function isiPhoneX(store) {
      return store.isiPhoneX;
    },
    // 是否iphonx 
    globalToken: function globalToken(store) {
      return store.token;
    },
    // 全局存的 token 串

    goodsAddCartStyle: function goodsAddCartStyle(store) {
      var goodsAddCartStyleFlag = (0, _tools.transNumFn)((0, _tools.assertObject)(store.configInfo).spjganys);
      if (goodsAddCartStyleFlag == 1) {
        return _const.shuanganniushuzi;
      }
      return _const.anniushuzi;
    },
    // 商品右下角的加入购物车按钮的样式
    /*
        @description 是否开启供应商功能
        @return <Boolean>
            true 开启了多门店功能
            false 未开启多门店功能 单店运营
    */
    gongyingshang: function gongyingshang(store) {
      return (0, _tools.transNumFn)((0, _tools.assertObject)(store.configInfo).system_pattern) == 2;
    },
    backIconTop: function backIconTop(store) {
      return store.backIconTop;
    },
    // 详情页返回上一页的左上角图标距离顶部的位置
    /*
    	是否可以执行 绑定手机号后才能使用的功能
    		true	可以执行 绑定手机号后才能使用的功能
    		false	不能执行 绑定手机号后才能使用的功能
    */
    isRunBindMobileFunc: function isRunBindMobileFunc(store) {
      return (0, _tools.transNumFn)((0, _tools.assertObject)(store.configInfo).manbintel) == 1 ? this.isLogin && this.userIsBindMobile : this.isLogin;
    },
    /*
    	是否在提交苹果审核
    		true	在审核中
    		false	不在审核
    */
    appleCheckOpen: function appleCheckOpen(store) {
      return (0, _tools.transNumFn)((0, _tools.assertObject)(store.configInfo).is_iphone_audit) == 1;
    }
  })), (0, _vuex.mapGetters)({
    getIsOpenEat: 'getIsOpenEat',
    // 是否开启吃了吗
    isOpenVipFunc: 'isOpenVipFunc',
    // 是否开启了会员功能
    miniProgrameCheck: 'miniProgrameCheck',
    // 小程序是否在审核

    isOpenHomeSearchFunc: 'isOpenHomeSearchFunc' // 是否打开 全栈搜索功能
  })),

  // 全局的 filters 
  filters: {
    //  保留两位小数
    filterTransNum: function filterTransNum(number) {
      return (0, _tools.toDoubleNumFn)((0, _tools.transNumFn)(number));
    },
    // 把规格字符串的;分好 替换成空格展示
    filterSpecName: function filterSpecName(specKeyName) {
      specKeyName = (0, _tools.assertString)(specKeyName);
      return "\u5DF2\u9009: ".concat(specKeyName.replace(/;/ig, ' '));
    }
  },
  onPageScroll: function onPageScroll(e) {
    var _this9 = this;
    // console.log(e.scrollTop);
    this.mixinScrollTop = e.scrollTop;
    if (this.mixinScrollIsStop) {
      this.mixinScrollIsStop = false;
    }

    // console.log('this.mixinScrollIsStop',this.mixinScrollIsStop);

    clearTimeout(toTopBtnTimeer);
    toTopBtnTimeer = setTimeout(function () {
      if (e.scrollTop > 600) {
        _this9.isShowToTopBtn = true;
      } else {
        _this9.isShowToTopBtn = false;
      }
      _this9.mixinScrollIsStop = true;
      // console.log('this.mixinScrollIsStop',this.mixinScrollIsStop);
    }, 100);
  },
  // 卸载页面时关闭登录框
  onUnload: function onUnload() {
    this.closeGlobalLoginFn(false);
  },
  // 切到其他页面时关闭登录框
  onHide: function onHide() {
    this.closeGlobalLoginFn(false);
  },
  onShow: function onShow() {
    uni.hideTabBar();
    console.log('mixin run onShow uni.hideTabBar');
  },
  onLoad: function onLoad() {}
};
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
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 36:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 37:
/*!***********************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(wx) {var _classCallCheck = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 17);
var _createClass = __webpack_require__(/*! @babel/runtime/helpers/createClass */ 18);
var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200
};
var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + 'direction/v1/';
var MODE = {
  driving: 'driving',
  transit: 'transit'
};
var EARTH_RADIUS = 6378136.49;
var Utils = {
  safeAdd: function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  },
  bitRotateLeft: function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  },
  md5cmn: function md5cmn(q, a, b, x, s, t) {
    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
  },
  md5ff: function md5ff(a, b, c, d, x, s, t) {
    return this.md5cmn(b & c | ~b & d, a, b, x, s, t);
  },
  md5gg: function md5gg(a, b, c, d, x, s, t) {
    return this.md5cmn(b & d | c & ~d, a, b, x, s, t);
  },
  md5hh: function md5hh(a, b, c, d, x, s, t) {
    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5ii: function md5ii(a, b, c, d, x, s, t) {
    return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
  },
  binlMD5: function binlMD5(x, len) {
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;
    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = this.safeAdd(a, olda);
      b = this.safeAdd(b, oldb);
      c = this.safeAdd(c, oldc);
      d = this.safeAdd(d, oldd);
    }
    return [a, b, c, d];
  },
  binl2rstr: function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  },
  rstr2binl: function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  },
  rstrMD5: function rstrMD5(s) {
    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
  },
  rstrHMACMD5: function rstrHMACMD5(key, data) {
    var i;
    var bkey = this.rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
  },
  rstr2hex: function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  },
  str2rstrUTF8: function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  },
  rawMD5: function rawMD5(s) {
    return this.rstrMD5(this.str2rstrUTF8(s));
  },
  hexMD5: function hexMD5(s) {
    return this.rstr2hex(this.rawMD5(s));
  },
  rawHMACMD5: function rawHMACMD5(k, d) {
    return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));
  },
  hexHMACMD5: function hexHMACMD5(k, d) {
    return this.rstr2hex(this.rawHMACMD5(k, d));
  },
  md5: function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return this.hexMD5(string);
      }
      return this.rawMD5(string);
    }
    if (!raw) {
      return this.hexHMACMD5(key, string);
    }
    return this.rawHMACMD5(key, string);
  },
  getSig: function getSig(requestParam, sk, feature, mode) {
    var sig = null;
    var requestArr = [];
    Object.keys(requestParam).sort().forEach(function (key) {
      requestArr.push(key + '=' + requestParam[key]);
    });
    if (feature == 'search') {
      sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;
    }
    if (feature == 'suggest') {
      sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;
    }
    if (feature == 'reverseGeocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'geocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'getCityList') {
      sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;
    }
    if (feature == 'getDistrictByCityId') {
      sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;
    }
    if (feature == 'calculateDistance') {
      sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'direction') {
      sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;
    }
    sig = this.md5(sig);
    return sig;
  },
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1])
      });
    }
    return endLocation;
  },
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete
    });
  },
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1]
        };
      } else {
        location = {};
      }
    }
    return location;
  },
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg
    };
  },
  handleData: function handleData(param, data, feature) {
    if (feature == 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null
        });
      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify
      });
    } else if (feature == 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null
        });
      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify
      });
    } else if (feature == 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null
      };
      if (reverseGeocoderResult.pois) {
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null
          });
        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify
        });
      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify
        });
      }
    } else if (feature == 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null
      };
      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify
      });
    } else if (feature == 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult
      });
    } else if (feature == 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature == 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance
      });
    } else if (feature == 'direction') {
      var direction = data.result.routes;
      param.success(data, direction);
    } else {
      param.success(data);
    }
  },
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = {
      "content-type": "application/json"
    };
    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:
          {
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:
          {
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:
          {
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }
      }
    };
    return options;
  },
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  }
};
var QQMapWX = /*#__PURE__*/function () {
  "use strict";

  function QQMapWX(options) {
    _classCallCheck(this, QQMapWX);
    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }
  _createClass(QQMapWX, [{
    key: "search",
    value: function search(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (!Utils.checkKeyword(options)) {
        return;
      }
      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key
      };
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;
      if (options.region) {
        region = options.region;
      }
      if (options.rectangle) {
        rectangle = options.rectangle;
      }
      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else if (rectangle && !region) {
          requestParam.boundary = "rectangle(" + rectangle + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam
        }, 'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    }
  }, {
    key: "getSuggestion",
    value: function getSuggestion(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (!Utils.checkKeyword(options)) {
        return;
      }
      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        get_subpois: options.get_subpois || 0,
        output: 'json',
        key: that.key
      };
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam
          }, "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam
        }, "suggest"));
      }
    }
  }, {
    key: "reverseGeocoder",
    value: function reverseGeocoder(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key
      };
      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }
      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam
        }, 'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    }
  }, {
    key: "geocoder",
    value: function geocoder(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }
      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key
      };
      if (options.region) {
        requestParam.region = options.region;
      }
      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');
      }
      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam
      }, 'geocoder'));
    }
  }, {
    key: "getCityList",
    value: function getCityList(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key
      };
      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');
      }
      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam
      }, 'getCityList'));
    }
  }, {
    key: "getDistrictByCityId",
    value: function getDistrictByCityId(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }
      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key
      };
      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');
      }
      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam
      }, 'getDistrictByCityId'));
    }
  }, {
    key: "calculateDistance",
    value: function calculateDistance(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }
      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key
      };
      if (options.from) {
        options.location = options.from;
      }
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to);
          var data = {
            message: "query ok",
            result: {
              elements: []
            },
            status: 0
          };
          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude
              },
              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng
              }
            });
          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult
          });
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam
          }, 'calculateDistance'));
        };
        Utils.locationProcess(options, locationsuccess);
      }
    }
  }, {
    key: "direction",
    value: function direction(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }
      var requestParam = {
        output: 'json',
        key: that.key
      };
      if (typeof options.to == 'string') {
        requestParam.to = options.to;
      } else {
        requestParam.to = options.to.latitude + ',' + options.to.longitude;
      }
      var SET_URL_DIRECTION = null;
      options.mode = options.mode || MODE.driving;
      SET_URL_DIRECTION = URL_DIRECTION + options.mode;
      if (options.from) {
        options.location = options.from;
      }
      if (options.mode == MODE.driving) {
        if (options.from_poi) {
          requestParam.from_poi = options.from_poi;
        }
        if (options.heading) {
          requestParam.heading = options.heading;
        }
        if (options.speed) {
          requestParam.speed = options.speed;
        }
        if (options.accuracy) {
          requestParam.accuracy = options.accuracy;
        }
        if (options.road_type) {
          requestParam.road_type = options.road_type;
        }
        if (options.to_poi) {
          requestParam.to_poi = options.to_poi;
        }
        if (options.from_track) {
          requestParam.from_track = options.from_track;
        }
        if (options.waypoints) {
          requestParam.waypoints = options.waypoints;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
        if (options.plate_number) {
          requestParam.plate_number = options.plate_number;
        }
      }
      if (options.mode == MODE.transit) {
        if (options.departure_time) {
          requestParam.departure_time = options.departure_time;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
      }
      var locationsuccess = function locationsuccess(result) {
        requestParam.from = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: SET_URL_DIRECTION,
          data: requestParam
        }, 'direction'));
      };
      Utils.locationProcess(options, locationsuccess);
    }
  }]);
  return QQMapWX;
}();
;
module.exports = QQMapWX;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 38:
/*!*********************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/siteinfo.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.host = exports.amapKey = void 0;
// const host = `https://dev.sjwxsc.com`;
// const host = `https://localdev.sjwxsc.com`;
var host = "https://line.sjwxsc.com";

// ↓↓↓ 安卓打包时需添加高德小程序key
exports.host = host;
var amapKey = "4a73acef63358385ac2ea8ba36b6a29b";

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
exports.amapKey = amapKey;

/***/ }),

/***/ 39:
/*!******************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/tools.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Object2QueryString = Object2QueryString;
exports.addSpecFilterItemActAttrFn = addSpecFilterItemActAttrFn;
exports.assertArray = assertArray;
exports.assertNumber = assertNumber;
exports.assertObject = assertObject;
exports.assertString = assertString;
exports.bigDiv = bigDiv;
exports.bigMinus = bigMinus;
exports.bigPlus = bigPlus;
exports.bigTimes = bigTimes;
exports.calcEndTime = calcEndTime;
exports.calcOverTime = calcOverTime;
exports.checkAvatarPath = checkAvatarPath;
exports.checkIsValid = checkIsValid;
exports.checkTelReg = void 0;
exports.checkTypeFn = checkTypeFn;
exports.cloneFn = cloneFn;
exports.createHoursArr = createHoursArr;
exports.debounce = debounce;
exports.en2ch = en2ch;
exports.getNotReasonObj = getNotReasonObj;
exports.getVersionFn = getVersionFn;
exports.goodsDetailWidthFn = goodsDetailWidthFn;
exports.num2zeroStr = num2zeroStr;
exports.timeStamp2textFn = timeStamp2textFn;
exports.timeStamp2timeText = timeStamp2timeText;
exports.timeStr2Arr = timeStr2Arr;
exports.timeStr2timeObj = timeStr2timeObj;
exports.toDayStr = void 0;
exports.toDoubleNumFn = toDoubleNumFn;
exports.tomorrowStr = void 0;
exports.transNumFn = transNumFn;
exports.url2navigateToUrlFn = url2navigateToUrlFn;
exports.url2temPath = url2temPath;
exports.validateFn = void 0;
var _siteinfo = __webpack_require__(/*! ./siteinfo.js */ 38);
var _big = _interopRequireDefault(__webpack_require__(/*! @/tools/libs/big */ 40));
// ↓↓↓↓↓↓↓↓ 通用工具方法

// 检测类型
function checkTypeFn(item) {
  return Object.prototype.toString.call(item).slice(8, -1);
}

// 数据转数字
function transNumFn(item) {
  if (item) {
    var type = checkTypeFn(item);
    if (type == 'Number' || type == 'BigInt') {
      return item;
    } else if (type == 'String') {
      return transNumFn(item - 0);
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

// 断言 必须是对象
function assertObject(item) {
  if (checkTypeFn(item) == 'Object' && Object.keys(item).length > 0) {
    return item;
  }
  return {};
}
// 断言 必须是数组
function assertArray(item) {
  if (checkTypeFn(item) == 'Array' && item.length > 0) {
    return item;
  }
  return [];
}
// 断言 必须是字符串
function assertString(item) {
  if (checkTypeFn(item) == 'String' && item.length > 0) {
    return item;
  }
  return '';
}
// 断言 必须是数字
function assertNumber(item) {
  if (checkTypeFn(item) == 'Number' && item > 0) {
    return item;
  }
  return 0;
}

// 解决js精度问题的库

function bigPlus(a, b) {
  //a+b
  return Number(new _big.default(a).plus(b).toFixed(9));
}
function bigMinus(a, b) {
  //a-b
  return Number(new _big.default(a).minus(b).toFixed(9));
}
function bigTimes(a, b) {
  //a*b
  return Number(new _big.default(a).times(b).toFixed(9));
}
function bigDiv(a, b) {
  //a/b
  return Number(new _big.default(a).div(b).toFixed(9));
}

/*
	@description 获取保留两位小数的字符串数字
	@return <String> 带小数点的字符串数字
*/
function toDoubleNumFn(item) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var pow = Math.pow(10, n),
    num = bigTimes(transNumFn(item), pow),
    flag = num < 0 ? '-' : '+',
    abs = Math.abs(num),
    floor = Math.floor(abs) / pow,
    result = "".concat(flag).concat(floor) - 0;
  return result.toFixed(n);
}

// 深度克隆一份对象
function cloneFn(item) {
  return JSON.parse(JSON.stringify(item));
}

// 补零
function num2zeroStr(item) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var str = '';
  for (var i = 0; i < n + 1; i++) {
    str += 0;
  }
  return "".concat(str).concat(transNumFn(item)).slice(-n);
}

// 把对象转查询字符串格式
function Object2QueryString(object) {
  object = assertObject(object);
  var queryStr = '';
  for (var k in object) {
    queryStr += "".concat(k, "=").concat(object[k], "&");
  }
  return queryStr.substring(0, queryStr.length - 1);
}

/* 
	版本字符串转纯数字
	传入必须是字符串 返回数字
*/
function getVersionFn(str) {
  str = "".concat(str);
  var version = str.toLocaleUpperCase().replace(/V/ig, '').replace(/\./ig, '');
  var rr = version.split('');
  var nd = rr.findIndex(function (i) {
    return i > 0;
  });
  return "0000".concat(version).slice(-(rr.length - nd)) - 0;
}

// 防抖
function debounce(fn, wait) {
  var timer;
  return function () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(void 0, arg);
    }, wait);
  };
}

// ↑↑↑↑↑↑↑↑ 通用工具方法

// ↓↓↓↓↓↓↓↓ 万象优鲜项目通用相关工具

// 生成小时数据
function createHoursArr(to, off, runLen) {
  var toHoursBefore = transNumFn(to.split(':')[0]);
  var toHoursAfter = transNumFn(to.split(':')[1]);
  var offHoursBefore = transNumFn(off.split(':')[0]);
  var offHoursAfter = transNumFn(off.split(':')[1]);
  var arr = [];
  for (var i = toHoursBefore; i < offHoursBefore; i += runLen) {
    var lastOffHoursBefore = i + runLen >= offHoursBefore ? offHoursBefore : i + runLen;
    var lastOffHoursAfter = i + runLen >= offHoursBefore ? offHoursAfter : toHoursAfter;
    var textStr = "".concat(num2zeroStr(i), ":").concat(num2zeroStr(toHoursAfter), "~").concat(num2zeroStr(lastOffHoursBefore), ":").concat(num2zeroStr(lastOffHoursAfter));
    arr.push({
      textStr: textStr,
      toHoursBefore: i,
      offHoursBefore: lastOffHoursBefore
    });
  }
  return arr;
}

// 固定的字符串常量
var toDayStr = '今天';
exports.toDayStr = toDayStr;
var tomorrowStr = '明天';

// 小程序获取的字母地址转换 文字描述的地址信息
exports.tomorrowStr = tomorrowStr;
function en2ch(address) {
  var province = [{
    name: "beijing",
    cities: ["xicheng", "dongcheng", "chongwen", "xuanwu", "chaoyang", "haidian", "fengtai", "shijingshan", "mentougou", "fangshan", "tongzhou", "shunyi", "daxing", "changping", "pinggu", "huairou", "miyun", "yanqing"]
  }, {
    name: "tianjin",
    cities: ["qingyang", "hedong", "hexi", "nankai", "hebei", "hongqiao", "tanggu", "hangu", "dagang", "dongli", "xiqing", "beichen", "jinnan", "wuqing", "baodi", "jinghai", "ninghe", "jixian", "kaifaqu"]
  }, {
    name: "hebei",
    cities: ["shijiazhuang", "qinhuangdao", "langfang", "baoding", "handan", "tangshan", "xingtai", "hengshui", "zhangjiakou", "chengde", "cangzhou", "hengshui"]
  }, {
    name: "shanxi",
    cities: ["taiyuan", "datong", "changzhi", "jinzhong", "yangquan", "shuozhou", "yuncheng", "linfen"]
  }, {
    name: "namenggu",
    cities: ["huhehaote", "chifeng", "tongliao", "xilinguole", "xingan"]
  }, {
    name: "liaoning",
    cities: ["dalian", "shenyang", "anshan", "fushun", "yingkou", "jinzhou", "dandong", "chaoyang", "liaoyang", "fuxin", "tieling", "panjin", "benxi", "huludao"]
  }, {
    name: "jilin",
    cities: ["changchun", "jilin", "siping", "liaoyuan", "tonghua", "yanji", "baicheng", "liaoyuan", "songyuan", "linjiang", "huichun"]
  }, {
    name: "heilongjiang",
    cities: ["haerbin", "qiqihaer", "daqing", "mudanjiang", "hegang", "jiamusi", "suihua"]
  }, {
    name: "shanghai",
    cities: ["pudong", "yangpu", "xuhui", "jingan", "luwan", "huangpu", "putuo", "zhabei", "hongkou", "changning", "baoshan", "minxing", "jiading", "jinshan", "songjiang", "qingpu", "chongming", "fengxian", "nanhui"]
  }, {
    name: "jiangsu",
    cities: ["nanjing", "suzhou", "wuxi", "changzhou", "yangzhou", "xuzhou", "nantong", "zhenjiang", "taizhou", "huaian", "lianyungang", "suqian", "yancheng", "huaiyin", "muyang", "zhangjiagang"]
  }, {
    name: "zhejiang",
    cities: ["hangzhou", "jinhua", "ningbo", "wenzhou", "jiaxing", "shaoxing", "lishui", "huzhou", "taizhou", "zhoushan", "quzhou"]
  }, {
    name: "anhui",
    cities: ["hefei", "maanshan", "bangbu", "huangshan", "wuhu", "huainan", "tongling", "fuyang", "xuancheng", "anqing"]
  }, {
    name: "fujian",
    cities: ["fuzhou", "xiamen", "quanzhou", "zhangzhou", "nanping", "longyan", "putian", "sanming", "ningde"]
  }, {
    name: "jiangxi",
    cities: ["nanchang", "jingdezhen", "shangrao", "pingxiang", "jiujiang", "jian", "yichun", "yingtan", "xinyu", "ganzhou"]
  }, {
    name: "shandong",
    cities: ["qingdao", "jinan", "zibo", "yantai", "taian", "linyi", "rizhao", "dezhou", "weihai", "dongying", "heze", "jining", "weifang", "zaozhuang", "liaocheng"]
  }, {
    name: "henan",
    cities: ["zhengzhou", "luoyang", "kaifeng", "pingdingshan", "puyang", "anyang", "xuchang", "nanyang", "xinyang", "zhoukou", "xinxiang", "jiaozuo", "sanmenxia", "shangqiu"]
  }, {
    name: "hubei",
    cities: ["wuhan", "xiangfan", "xiaogan", "shiyan", "jingzhou", "huangshi", "yichang", "huanggang", "enshi", "ezhou", "jianghan", "suizao", "jingsha", "xianning"]
  }, {
    name: "hunan",
    cities: ["changsha", "xiangtan", "yueyang", "zhuzhou", "huaihua", "yongzhou", "yiyang", "zhangjiajie", "changde", "hengyang", "xiangxi", "shaoyang", "loudi", "chenzhou"]
  }, {
    name: "guangdong",
    cities: ["guangzhou", "shenzhen", "dongwan", "foshan", "zhuhai", "shantou", "shaoguan", "jiangmen", "meizhou", "jieyang", "zhongshan", "heyuan", "huizhou", "maoming", "zhanjiang", "yangjiang", "chaozhou", "yunfu", "shanwei", "chaoyang", "zhaoqing", "shunde", "qingyuan"]
  }, {
    name: "guangxi",
    cities: ["nanning", "guilin", "liuzhou", "wuzhou", "laibin", "guigang", "yulin", "hezhou"]
  }, {
    name: "hainan",
    cities: ["haikou", "sanya"]
  }, {
    name: "zhongqing",
    cities: ["yuzhong", "dadukou", "jiangbei", "shapingba", "jiulongpo", "nanan", "beibei", "wansheng", "shuangqiao", "yubei", "banan", "wanzhou", "fuling", "qianjiang", "changshou"]
  }, {
    name: "sichuan",
    cities: ["chengdou", "dazhou", "nanchong", "leshan", "mianyang", "deyang", "najiang", "suining", "yibin", "bazhong", "zigong", "kangding", "panzhihua"]
  }, {
    name: "guizhou",
    cities: ["guiyang", "zunyi", "anshun", "qianxinan", "douyun"]
  }, {
    name: "yunnan",
    cities: ["kunming", "lijiang", "zhaotong", "yuxi", "lincang", "wenshan", "honghe", "chuxiong", "dali"]
  }, {
    name: "xicang",
    cities: ["lasa", "linzhi", "rikaze", "changdou"]
  }, {
    name: "shanxi",
    cities: ["xian", "xianyang", "yanan", "hanzhong", "yulin", "shangnan", "lueyang", "yijun", "linyou", "baihe"]
  }, {
    name: "gansu",
    cities: ["lanzhou", "jinchang", "tianshui", "wuwei", "zhangye", "pingliang", "jiuquan"]
  }, {
    name: "qinghai",
    cities: ["huangnan", "hainan", "xining", "haidong", "haixi", "haibei", "guoluo", "yushu"]
  }, {
    name: "ningxia",
    cities: ["yinchuan", "wuzhong"]
  }, {
    name: "xinjiang",
    cities: ["wulumuqi", "hami", "kashi", "bayinguoleng", "changji", "yili", "aletai", "kelamayi", "boertala"]
  }, {
    name: "xianggang",
    cities: ["zhongxiqu", "wanziqu", "dongqu", "nanqu", "jiulong-youjianwangqu", "jiulong-shenshuibuqu", "jiulong-jiulongchengqu", "jiulong-huangdaxianqu", "jiulong-guantangqu", "xinjie-beiqu", "xinjie-dapuqu", "xinjie-shatianqu", "xinjie-xigongqu", "xinjie-quanwanqu", "xinjie-tunmenqu", "xinjie-yuanlangqu", "xinjie-kuiqingqu", "xinjie-lidaoqu"]
  }, {
    name: "aomen",
    cities: ["huadimatangqu", "shenganduonitangqu", "datangqu", "wangdetangqu", "fengshuntangqu", "jiamotangqu", "shengfangjigetangqu", "ludangcheng"]
  }];
  var province2 = [{
    name: "北京",
    cities: ["西城", "东城", "崇文", "宣武", "朝阳", "海淀", "丰台", "石景山", "门头沟", "房山", "通州", "顺义", "大兴", "昌平", "平谷", "怀柔", "密云", "延庆"]
  }, {
    name: "天津",
    cities: ["青羊", "河东", "河西", "南开", "河北", "红桥", "塘沽", "汉沽", "大港", "东丽", "西青", "北辰", "津南", "武清", "宝坻", "静海", "宁河", "蓟县", "开发区"]
  }, {
    name: "河北",
    cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"]
  }, {
    name: "山西",
    cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"]
  }, {
    name: "内蒙古",
    cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"]
  }, {
    name: "辽宁",
    cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"]
  }, {
    name: "吉林",
    cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"]
  }, {
    name: "黑龙江",
    cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"]
  }, {
    name: "上海",
    cities: ["浦东", "杨浦", "徐汇", "静安", "卢湾", "黄浦", "普陀", "闸北", "虹口", "长宁", "宝山", "闵行", "嘉定", "金山", "松江", "青浦", "崇明", "奉贤", "南汇"]
  }, {
    name: "江苏",
    cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"]
  }, {
    name: "浙江",
    cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"]
  }, {
    name: "安徽",
    cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"]
  }, {
    name: "福建",
    cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"]
  }, {
    name: "江西",
    cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"]
  }, {
    name: "山东",
    cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"]
  }, {
    name: "河南",
    cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"]
  }, {
    name: "湖北",
    cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"]
  }, {
    name: "湖南",
    cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"]
  }, {
    name: "广东",
    cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"]
  }, {
    name: "广西",
    cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"]
  }, {
    name: "海南",
    cities: ["海口", "三亚"]
  }, {
    name: "重庆",
    cities: ["渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "万州", "涪陵", "黔江", "长寿"]
  }, {
    name: "四川",
    cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"]
  }, {
    name: "贵州",
    cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"]
  }, {
    name: "云南",
    cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"]
  }, {
    name: "西藏",
    cities: ["拉萨", "林芝", "日喀则", "昌都"]
  }, {
    name: "陕西",
    cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"]
  }, {
    name: "甘肃",
    cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"]
  }, {
    name: "青海",
    cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"]
  }, {
    name: "宁夏",
    cities: ["银川", "吴忠"]
  }, {
    name: "新疆",
    cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"]
  }, {
    name: "香港",
    cities: ["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"]
  }, {
    name: "澳门",
    cities: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"]
  }];
  var getChina = function getChina(strs) {
    var str = strs.toLowerCase();
    for (var i = 0; i < province.length; i++) {
      if (str == province[i].name) {
        return province2[i].name;
        // break;
      }

      for (var u = 0; u < province[i].cities.length; u++) {
        if (str == province[i].cities[u]) {
          return province2[i].cities[u];
          // break;
        }
      }
    }

    return '未知';
  };
  return getChina(address);
}
// 电话号码正则(手机号正则)
var checkTelReg = /^[0-9]{11}$/;

// 普通路径转换成navigateToFn 函数可以调用的 (在路径前加 / )
exports.checkTelReg = checkTelReg;
function url2navigateToUrlFn(url) {
  return url[0] == '/' ? url : "/".concat(url);
}

// 给规格项添加默认选中的 属性
function addSpecFilterItemActAttrFn(specFilterItem) {
  var cloneSpecFilterItem = cloneFn(specFilterItem);
  cloneSpecFilterItem.forEach(function (item) {
    item.item.forEach(function (i, k) {
      if (k == 0) {
        i.active = true;
      } else {
        i.active = false;
      }
    });
  });
  return cloneSpecFilterItem;
}
// ↑↑↑↑↑↑↑↑ 万象优鲜项目通用相关工具

// ↓↓↓↓↓↓↓↓ 万象优鲜项目页面里需要的工具函数
/*
	@description
		检测头像图片路径是否正常 如果不带域名加上 siteInfo 里的host return 出去
	@param
		avatar <String>
	@return <String>
		返回正常的用户头像地址
*/
function checkAvatarPath(avatar) {
  avatar = assertString(avatar);
  var result = avatar.includes('http://') || avatar.includes('https://');
  if (result) {
    return avatar;
  } else {
    return "".concat(_siteinfo.host).concat(avatar);
  }
}

// 网络地址转临时路径
function url2temPath(url) {
  return new Promise(function (resFn, rejFn) {
    uni.getImageInfo({
      src: url,
      success: function success(res) {
        resFn({
          result: res.path,
          type: 'success',
          msg: '成功',
          url: url
        });
      },
      fail: function fail() {
        rejFn({
          result: '获取图片信息错误',
          msg: '获取图片信息错误',
          type: 'error',
          url: url
        });
      }
    });
  });
}

/* 
	传入 js格式(毫秒为单位)的时间戳 换算成 xx天 小于1天 返回 xx小时
*/
function calcOverTime(timeStamp) {
  var day = Math.floor(timeStamp / 86400000);
  if (day > 0) {
    return "".concat(day, "\u5929");
  }
  var hours = Math.floor(timeStamp / 1000 / 60 / 60);
  return "".concat(hours, "\u5C0F\u65F6");
}

// 商品详情 里富文本字符串 图片 百分比显示
function goodsDetailWidthFn(str) {
  if (typeof str != 'string') {
    return '';
  }
  str = str.replace(/src="\/uploads/ig, "src=\"".concat(_siteinfo.host, "/uploads"));

  // 把行间 style="xxx替换  data-style="xxx
  var REGaddDataHead_style = /style="/ig;
  var str0 = str.replace(REGaddDataHead_style, 'data-style="');

  // 把行间 width="100" 替换  data-width="100" 
  var REGaddDataHead = /width="/ig;
  var str2 = str0.replace(REGaddDataHead, 'data-width="');

  // 把style 里的  width: 100px  替换  width: 100%
  var reg = /img src/ig;
  var str3 = str2.replace(reg, 'img style="width:100%;display:block;" src');
  return str3;
}

/* 
	obj.draw_time,
	obj.number_type,
	obj.number,
	计算结束时间
 */
function calcEndTime(obj) {
  var timeStamp;
  if (obj.number_type == 1) {
    //分钟
    timeStamp = (obj.draw_time - 0) * 1000 + (obj.number - 0) * 60 * 1000;
  } else if (obj.number_type == 2) {
    //小时
    timeStamp = (obj.draw_time - 0) * 1000 + (obj.number - 0) * 3600 * 1000;
  } else if (obj.number_type == 3) {
    //天数
    timeStamp = (obj.draw_time - 0) * 1000 + (obj.number - 0) * 86400 * 1000;
  } else if (obj.number_type == 4) {
    //月数
    timeStamp = (obj.draw_time - 0) * 1000 + (obj.number - 0) * 2592000 * 1000;
  } else if (obj.number_type == 5) {
    //年数
    timeStamp = (obj.draw_time - 0) * 1000 + (obj.number - 0) * 31536000 * 1000;
  } else {
    console.log('参数错误 致命错误');
    return;
  }
  timeStamp = Math.floor(timeStamp / 1000);
  return {
    timeStamp: timeStamp
  };
}

/*
	判断是否过期 返回true / false
	在有效期内 true
	不在有效期内 false

	obj.time_bar
	obj.use_end_time
	obj.use_start_time

	obj.draw_time,
	obj.number_type,
	obj.number,
*/
function checkIsValid(obj) {
  /*
   	1--领取后算时间  2--平台限制
  */
  var curtData = Math.floor(+new Date() / 1000);

  // 2--平台限制
  if (obj.time_bar == 2) {
    /*
    		结束
    		obj.use_end_time
     		obj.use_start_time
     		开始
    		 */
    if (obj.use_start_time < curtData && obj.use_end_time > curtData) {
      return true;
    } else {
      return false;
    }

    // 1--领取后算时间
  } else {
    var res = calcEndTime({
      draw_time: obj.draw_time,
      number_type: obj.number_type,
      number: obj.number
    });
    if (obj.draw_time < curtData && res.timeStamp > curtData) {
      return true;
    } else {
      return false;
    }
  }
}

// 时间字符串转数组
function timeStr2Arr(str) {
  if (!str) {
    return false;
  }
  function fn2(n) {
    var str = n + '';
    return str.padStart(2, '0');
  }
  var date = new Date(),
    strHours = str.split(':')[0] - 0,
    strMinutes = str.split(':')[1] - 1,
    newHours = date.getHours(),
    newMinutes = date.getMinutes(),
    newT = newHours * 60 + newMinutes,
    endT = strHours * 60 + strMinutes;
  var resHoure = Math.floor((endT - newT) / 60);
  var resMinutes = (endT - newT) % 60;
  var resSeconds = 60 - date.getSeconds();
  var resMilliseconds = 1000 - date.getMilliseconds();
  var resArr;
  if (endT + 1 - newT > 0) {
    resArr = [fn2(resHoure), fn2(resMinutes), fn2(resSeconds), resMilliseconds];
  } else {
    resArr = [fn2(0), fn2(0), fn2(0), fn2(0)];
  }
  return resArr;
}

/* 
	@description
		传时间戳返回时间描述文字
			传
				1609161226410
			返回
				'2020年12月28日21时13分46秒'
		@param
			timeStamp <Number> 时间戳数字 单位是毫秒
		@return
			文字描述的时间字符串
*/
function timeStamp2textFn(timeStamp) {
  var date = new Date(timeStamp);
  return "".concat(date.getFullYear(), "\u5E74").concat(date.getMonth() + 1, "\u6708").concat(date.getDate(), "\u65E5").concat(date.getHours(), "\u65F6").concat(date.getMinutes(), "\u5206").concat(date.getSeconds(), "\u79D2");
}

/* 
	@description
		传时间数据库的时间字符串 返回 年月日
			传
				2021-03-04 12:30:00
			返回
				{
					year: 2021,
					month:3,
					day:4,
					hours:12,
					minutes:30,
				}
				'2020年12月28日21时13分46秒'
		@param
			timeStamp <Number> 时间戳数字 单位是毫秒
		@return
			文字描述的时间字符串
*/
function timeStr2timeObj(str) {
  var strs = "".concat(str).replace(/\-/g, '/');
  var date = new Date(strs),
    year = date.getFullYear,
    month = num2zeroStr(date.getMonth() + 1),
    day = num2zeroStr(date.getDate()),
    hours = num2zeroStr(date.getHours()),
    minutes = num2zeroStr(date.getMinutes());
  return {
    year: year,
    month: month,
    day: day,
    hours: hours,
    minutes: minutes
  };
}

/*
	@description
		获取可以循环的数据结构,传入后台的not_reason字符串
		服务器反的数据格式
			not_reason1: "商品金额差**元可用__61.1",
			not_reason2: "没有符合条件的商品",
			not_reason3: "",
	@param
		str <String>
	@return <Object>

*/
function getNotReasonObj(str) {
  var arrSplit = assertString(str).split('__');
  if (arrSplit.length == 2) {
    var arr = assertString(arrSplit[0]).split('**');
    return [{
      redColor: false,
      text: arr[0]
    }, {
      redColor: true,
      text: arrSplit[1]
    }, {
      redColor: false,
      text: arr[1]
    }];
  }
  return [{
    redColor: false,
    text: arrSplit[0]
  }];
}

// 时间戳(js毫秒级) 转 时间文字描述 (目前只用在拼团首页 和 拼团详情)
function timeStamp2timeText(s) {
  var resStr = '';
  var tian = Math.floor(s / 86400000);
  if (tian) {
    resStr += "".concat(tian, "\u5929");
  }
  var shi = Math.floor(s / 3600000) % 24;
  if (shi) {
    var s1 = "000".concat(shi).slice(-2);
    resStr += "".concat(s1, "\u65F6");
  } else {
    if (resStr) {
      resStr += "00\u65F6";
    }
  }
  var fen = Math.floor(s / 60000) % 60;
  if (fen) {
    var _s = "000".concat(fen).slice(-2);
    resStr += "".concat(_s, "\u5206");
  }
  /* let miao =Math.floor(s/1000)%1000 ;
  if(miao){
  	let s1 = `000${fen}`.slice(-2);
  	resStr +=`${s1}秒`;
  } */
  return resStr;
}

// 

/*
	@description 判断固定格式字符串 (例如 名字 手机号等) 是否符合要求
		校验通过 返回 true
		校验失败 返回 页面提示信息
*/
var validateFn = {
  name: function name(title, str) {
    if (str.length > 0 && str.length <= 20) {
      return {
        validate: true
      };
    }
    return {
      validate: false,
      msg: "".concat(title, "\u957F\u5EA6\u662F1~20")
    };
  },
  tel: function tel(_tel) {
    if (checkTelReg.test(_tel)) {
      return {
        validate: true
      };
    }
    return {
      validate: false,
      msg: "\u8BF7\u68C0\u67E5\u624B\u673A\u53F7\u683C\u5F0F"
    };
  }
};

// ↑↑↑↑↑↑↑↑ 万象优鲜项目页面里需要的工具函数

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
exports.validateFn = validateFn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 4:
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 5);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 6);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 7);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 9);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 40:
/*!*********************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/libs/big.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!function (r) {
  "use strict";

  var o,
    t = 20,
    i = 1,
    P = 1e6,
    s = -7,
    c = 21,
    f = !1,
    u = "[big.js] ",
    h = u + "Invalid ",
    M = h + "decimal places",
    l = h + "rounding mode",
    x = u + "Division by zero",
    a = {},
    D = void 0,
    p = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  function N(r, t, e, n) {
    var i = r.c;
    if (e === D && (e = o.RM), 0 !== e && 1 !== e && 2 !== e && 3 !== e) throw Error(l);
    if (t < 1) n = 3 === e && (n || !!i[0]) || 0 === t && (1 === e && 5 <= i[0] || 2 === e && (5 < i[0] || 5 === i[0] && (n || i[1] !== D))), i.length = 1, n ? (r.e = r.e - t + 1, i[0] = 1) : i[0] = r.e = 0;else if (t < i.length) {
      if (n = 1 === e && 5 <= i[t] || 2 === e && (5 < i[t] || 5 === i[t] && (n || i[t + 1] !== D || 1 & i[t - 1])) || 3 === e && (n || !!i[0]), i.length = t--, n) for (; 9 < ++i[t];) {
        i[t] = 0, t-- || (++r.e, i.unshift(1));
      }
      for (t = i.length; !i[--t];) {
        i.pop();
      }
    }
    return r;
  }
  function w(r, t, e) {
    var n = r.e,
      i = r.c.join(""),
      o = i.length;
    if (t) i = i.charAt(0) + (1 < o ? "." + i.slice(1) : "") + (n < 0 ? "e" : "e+") + n;else if (n < 0) {
      for (; ++n;) {
        i = "0" + i;
      }
      i = "0." + i;
    } else if (0 < n) {
      if (++n > o) for (n -= o; n--;) {
        i += "0";
      } else n < o && (i = i.slice(0, n) + "." + i.slice(n));
    } else 1 < o && (i = i.charAt(0) + "." + i.slice(1));
    return r.s < 0 && e ? "-" + i : i;
  }
  a.abs = function () {
    var r = new this.constructor(this);
    return r.s = 1, r;
  }, a.cmp = function (r) {
    var t,
      e = this,
      n = e.c,
      i = (r = new e.constructor(r)).c,
      o = e.s,
      s = r.s,
      c = e.e,
      f = r.e;
    if (!n[0] || !i[0]) return n[0] ? o : i[0] ? -s : 0;
    if (o != s) return o;
    if (t = o < 0, c != f) return f < c ^ t ? 1 : -1;
    for (s = (c = n.length) < (f = i.length) ? c : f, o = -1; ++o < s;) {
      if (n[o] != i[o]) return n[o] > i[o] ^ t ? 1 : -1;
    }
    return c == f ? 0 : f < c ^ t ? 1 : -1;
  }, a.div = function (r) {
    var t = this,
      e = t.constructor,
      n = t.c,
      i = (r = new e(r)).c,
      o = t.s == r.s ? 1 : -1,
      s = e.DP;
    if (s !== ~~s || s < 0 || P < s) throw Error(M);
    if (!i[0]) throw Error(x);
    if (!n[0]) return new e(0 * o);
    var c,
      f,
      u,
      h,
      l,
      a = i.slice(),
      p = c = i.length,
      w = n.length,
      g = n.slice(0, c),
      v = g.length,
      d = r,
      m = d.c = [],
      E = 0,
      b = s + (d.e = t.e - r.e) + 1;
    for (d.s = o, o = b < 0 ? 0 : b, a.unshift(0); v++ < c;) {
      g.push(0);
    }
    do {
      for (u = 0; u < 10; u++) {
        if (c != (v = g.length)) h = v < c ? 1 : -1;else for (l = -1, h = 0; ++l < c;) {
          if (i[l] != g[l]) {
            h = i[l] > g[l] ? 1 : -1;
            break;
          }
        }
        if (!(h < 0)) break;
        for (f = v == c ? i : a; v;) {
          if (g[--v] < f[v]) {
            for (l = v; l && !g[--l];) {
              g[l] = 9;
            }
            --g[l], g[v] += 10;
          }
          g[v] -= f[v];
        }
        for (; !g[0];) {
          g.shift();
        }
      }
      m[E++] = h ? u : ++u, g[0] && h ? g[v] = n[p] || 0 : g = [n[p]];
    } while ((p++ < w || g[0] !== D) && o--);
    return m[0] || 1 == E || (m.shift(), d.e--, b--), b < E && N(d, b, e.RM, g[0] !== D), d;
  }, a.eq = function (r) {
    return 0 === this.cmp(r);
  }, a.gt = function (r) {
    return 0 < this.cmp(r);
  }, a.gte = function (r) {
    return -1 < this.cmp(r);
  }, a.lt = function (r) {
    return this.cmp(r) < 0;
  }, a.lte = function (r) {
    return this.cmp(r) < 1;
  }, a.minus = a.sub = function (r) {
    var t,
      e,
      n,
      i,
      o = this,
      s = o.constructor,
      c = o.s,
      f = (r = new s(r)).s;
    if (c != f) return r.s = -f, o.plus(r);
    var u = o.c.slice(),
      h = o.e,
      l = r.c,
      a = r.e;
    if (!u[0] || !l[0]) return l[0] ? (r.s = -f, r) : new s(u[0] ? o : 0);
    if (c = h - a) {
      for ((n = (i = c < 0) ? (c = -c, u) : (a = h, l)).reverse(), f = c; f--;) {
        n.push(0);
      }
      n.reverse();
    } else for (e = ((i = u.length < l.length) ? u : l).length, c = f = 0; f < e; f++) {
      if (u[f] != l[f]) {
        i = u[f] < l[f];
        break;
      }
    }
    if (i && (n = u, u = l, l = n, r.s = -r.s), 0 < (f = (e = l.length) - (t = u.length))) for (; f--;) {
      u[t++] = 0;
    }
    for (f = t; c < e;) {
      if (u[--e] < l[e]) {
        for (t = e; t && !u[--t];) {
          u[t] = 9;
        }
        --u[t], u[e] += 10;
      }
      u[e] -= l[e];
    }
    for (; 0 === u[--f];) {
      u.pop();
    }
    for (; 0 === u[0];) {
      u.shift(), --a;
    }
    return u[0] || (r.s = 1, u = [a = 0]), r.c = u, r.e = a, r;
  }, a.mod = function (r) {
    var t,
      e = this,
      n = e.constructor,
      i = e.s,
      o = (r = new n(r)).s;
    if (!r.c[0]) throw Error(x);
    return e.s = r.s = 1, t = 1 == r.cmp(e), e.s = i, r.s = o, t ? new n(e) : (i = n.DP, o = n.RM, n.DP = n.RM = 0, e = e.div(r), n.DP = i, n.RM = o, this.minus(e.times(r)));
  }, a.plus = a.add = function (r) {
    var t,
      e = this,
      n = e.constructor,
      i = e.s,
      o = (r = new n(r)).s;
    if (i != o) return r.s = -o, e.minus(r);
    var s = e.e,
      c = e.c,
      f = r.e,
      u = r.c;
    if (!c[0] || !u[0]) return u[0] ? r : new n(c[0] ? e : 0 * i);
    if (c = c.slice(), i = s - f) {
      for ((t = 0 < i ? (f = s, u) : (i = -i, c)).reverse(); i--;) {
        t.push(0);
      }
      t.reverse();
    }
    for (c.length - u.length < 0 && (t = u, u = c, c = t), i = u.length, o = 0; i; c[i] %= 10) {
      o = (c[--i] = c[i] + u[i] + o) / 10 | 0;
    }
    for (o && (c.unshift(o), ++f), i = c.length; 0 === c[--i];) {
      c.pop();
    }
    return r.c = c, r.e = f, r;
  }, a.pow = function (r) {
    var t = this,
      e = new t.constructor(1),
      n = e,
      i = r < 0;
    if (r !== ~~r || r < -1e6 || 1e6 < r) throw Error(h + "exponent");
    for (i && (r = -r); 1 & r && (n = n.times(t)), r >>= 1;) {
      t = t.times(t);
    }
    return i ? e.div(n) : n;
  }, a.prec = function (r, t) {
    if (r !== ~~r || r < 1 || P < r) throw Error(h + "precision");
    return N(new this.constructor(this), r, t);
  }, a.round = function (r, t) {
    if (r === D) r = 0;else if (r !== ~~r || r < -P || P < r) throw Error(M);
    return N(new this.constructor(this), r + this.e + 1, t);
  }, a.sqrt = function () {
    var r,
      t,
      e,
      n = this,
      i = n.constructor,
      o = n.s,
      s = n.e,
      c = new i(.5);
    if (!n.c[0]) return new i(n);
    if (o < 0) throw Error(u + "No square root");
    for (s = (r = 0 === (o = Math.sqrt(n + "")) || o === 1 / 0 ? ((t = n.c.join("")).length + s & 1 || (t += "0"), s = ((s + 1) / 2 | 0) - (s < 0 || 1 & s), new i(((o = Math.sqrt(t)) == 1 / 0 ? "5e" : (o = o.toExponential()).slice(0, o.indexOf("e") + 1)) + s)) : new i(o)).e + (i.DP += 4); e = r, r = c.times(e.plus(n.div(e))), e.c.slice(0, s).join("") !== r.c.slice(0, s).join("");) {
      ;
    }
    return N(r, (i.DP -= 4) + r.e + 1, i.RM);
  }, a.times = a.mul = function (r) {
    var t,
      e = this.constructor,
      n = this.c,
      i = (r = new e(r)).c,
      o = n.length,
      s = i.length,
      c = this.e,
      f = r.e;
    if (r.s = this.s == r.s ? 1 : -1, !n[0] || !i[0]) return new e(0 * r.s);
    for (r.e = c + f, o < s && (t = n, n = i, i = t, f = o, o = s, s = f), t = new Array(f = o + s); f--;) {
      t[f] = 0;
    }
    for (c = s; c--;) {
      for (s = 0, f = o + c; c < f;) {
        s = t[f] + i[c] * n[f - c - 1] + s, t[f--] = s % 10, s = s / 10 | 0;
      }
      t[f] = s;
    }
    for (s ? ++r.e : t.shift(), c = t.length; !t[--c];) {
      t.pop();
    }
    return r.c = t, r;
  }, a.toExponential = function (r, t) {
    var e = this,
      n = e.c[0];
    if (r !== D) {
      if (r !== ~~r || r < 0 || P < r) throw Error(M);
      for (e = N(new e.constructor(e), ++r, t); e.c.length < r;) {
        e.c.push(0);
      }
    }
    return w(e, !0, !!n);
  }, a.toFixed = function (r, t) {
    var e = this,
      n = e.c[0];
    if (r !== D) {
      if (r !== ~~r || r < 0 || P < r) throw Error(M);
      for (r = r + (e = N(new e.constructor(e), r + e.e + 1, t)).e + 1; e.c.length < r;) {
        e.c.push(0);
      }
    }
    return w(e, !1, !!n);
  }, a.toJSON = function () {
    return w(this, !0, !0);
  }, a.toNumber = function () {
    var r = Number(w(this, !0, !0));
    if (!0 === this.constructor.strict && !this.eq(r.toString())) throw Error(u + "Imprecise conversion");
    return r;
  }, a.toPrecision = function (r, t) {
    var e = this,
      n = e.constructor,
      i = e.c[0];
    if (r !== D) {
      if (r !== ~~r || r < 1 || P < r) throw Error(h + "precision");
      for (e = N(new n(e), r, t); e.c.length < r;) {
        e.c.push(0);
      }
    }
    return w(e, r <= e.e || e.e <= n.NE || e.e >= n.PE, !!i);
  }, a.toString = function () {
    var r = this,
      t = r.constructor;
    return w(r, r.e <= t.NE || r.e >= t.PE, !!r.c[0]);
  }, a.valueOf = function () {
    var r = this.constructor;
    if (!0 === r.strict) throw Error(u + "valueOf disallowed");
    return w(this, this.e <= r.NE || this.e >= r.PE, !0);
  }, (o = function e() {
    function n(r) {
      var t = this;
      if (!(t instanceof n)) return r === D ? e() : new n(r);
      if (r instanceof n) t.s = r.s, t.e = r.e, t.c = r.c.slice();else {
        if ("string" != typeof r) {
          if (!0 === n.strict) throw TypeError(h + "number");
          r = 0 === r && 1 / r < 0 ? "-0" : String(r);
        }
        !function (r, t) {
          var e, n, i;
          if (!p.test(t)) throw Error(h + "number");
          for (r.s = "-" == t.charAt(0) ? (t = t.slice(1), -1) : 1, -1 < (e = t.indexOf(".")) && (t = t.replace(".", "")), 0 < (n = t.search(/e/i)) ? (e < 0 && (e = n), e += +t.slice(n + 1), t = t.substring(0, n)) : e < 0 && (e = t.length), i = t.length, n = 0; n < i && "0" == t.charAt(n);) {
            ++n;
          }
          if (n == i) r.c = [r.e = 0];else {
            for (; 0 < i && "0" == t.charAt(--i);) {
              ;
            }
            for (r.e = e - n - 1, r.c = [], e = 0; n <= i;) {
              r.c[e++] = +t.charAt(n++);
            }
          }
        }(t, r);
      }
      t.constructor = n;
    }
    return n.prototype = a, n.DP = t, n.RM = i, n.NE = s, n.PE = c, n.strict = f, n;
  }()).default = o.Big = o,  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return o;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(this);

/***/ }),

/***/ 41:
/*!******************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/const.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xcx_wx = exports.xcx_tt = exports.success = exports.shuanganniushuzi = exports.rob = exports.promTypeRob = exports.promTypePreSale = exports.promTypeIntegral = exports.promTypeGroup = exports.promTypeEnumObj = exports.promTypeCommon = exports.preSale = exports.peiTypeZiti = exports.peiTypeShansong = exports.peiTypeShangjia = exports.peiTypeKuaidi = exports.peiTypeEnumObj = exports.peiTypeDuozitidian = exports.peiTypeDada = exports.payment_zfb = exports.payment_wx = exports.paymentTypeEnum = exports.payTypeyve = exports.payTypeZfbapp = exports.payTypeWxxcx = exports.payTypeWxgzh = exports.payTypeWxapp = exports.payTypeH5zfb = exports.payTypeH5wx = exports.payTypeEnumObj = exports.orderTypeEnum = exports.openIngWxofficialaccount = exports.openIngWxminiprogram = exports.openIngH5 = exports.openIngEnumObj = exports.openIngApp = exports.integral = exports.group = exports.errorMsg = exports.error = exports.dispatchshangjia = exports.dispatchmendian = exports.dispatchkuaidi = exports.dispatchdaodian = exports.dispatchTypeIdEnum = exports.delCartGoodsTypeGoodsId = exports.delCartGoodsTypeCartId = exports.common = exports.clientPlatformEnum = exports.browser_wx = exports.browser_third = exports.bindMobileTips = exports.app_ios = exports.app_android = exports.anniushuzi = exports.ENVIOS = exports.ENVANDROID = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _payTypeEnumObj, _peiTypeEnumObj, _promTypeEnumObj, _openIngEnumObj;
// 项目中使用的常量

// 支付类型
var payTypeyve = 'payTypeyve',
  // 支付类型储值余额
  payTypeWxxcx = 'payTypeWxxcx',
  // 支付类型微信小程序支付
  payTypeWxapp = 'payTypeWxapp',
  // 支付类型微信app支付
  payTypeZfbapp = 'payTypeZfbapp',
  // 支付类型支付宝app支付
  payTypeWxgzh = 'payTypeWxgzh',
  // 支付类型公众号微信支付
  payTypeH5wx = 'payTypeH5wx',
  // 支付类型H5普通浏览器微信支付
  payTypeH5zfb = 'payTypeH5zfb'; // 支付类型H5普通浏览器支付宝支付

// 支付类型枚举对象
exports.payTypeH5zfb = payTypeH5zfb;
exports.payTypeH5wx = payTypeH5wx;
exports.payTypeWxgzh = payTypeWxgzh;
exports.payTypeZfbapp = payTypeZfbapp;
exports.payTypeWxapp = payTypeWxapp;
exports.payTypeWxxcx = payTypeWxxcx;
exports.payTypeyve = payTypeyve;
var payTypeEnumObj = (_payTypeEnumObj = {}, (0, _defineProperty2.default)(_payTypeEnumObj, payTypeyve, 1), (0, _defineProperty2.default)(_payTypeEnumObj, payTypeWxxcx, 0), (0, _defineProperty2.default)(_payTypeEnumObj, payTypeWxapp, 4), (0, _defineProperty2.default)(_payTypeEnumObj, payTypeZfbapp, 2), (0, _defineProperty2.default)(_payTypeEnumObj, payTypeWxgzh, 5), (0, _defineProperty2.default)(_payTypeEnumObj, payTypeH5wx, 6), (0, _defineProperty2.default)(_payTypeEnumObj, payTypeH5zfb, 7), _payTypeEnumObj);

// 配送方式
exports.payTypeEnumObj = payTypeEnumObj;
var peiTypeShangjia = 'peiTypeShangjia',
  // 商家配送
  peiTypeZiti = 'peiTypeZiti',
  // 自提
  peiTypeKuaidi = 'peiTypeKuaidi',
  // 快递
  peiTypeDada = 'peiTypeDada',
  // 达达
  peiTypeShansong = 'peiTypeShansong',
  // 闪送
  peiTypeDuozitidian = 'peiTypeDuozitidian'; // 多自提点

// 配送方式枚举对象
exports.peiTypeDuozitidian = peiTypeDuozitidian;
exports.peiTypeShansong = peiTypeShansong;
exports.peiTypeDada = peiTypeDada;
exports.peiTypeKuaidi = peiTypeKuaidi;
exports.peiTypeZiti = peiTypeZiti;
exports.peiTypeShangjia = peiTypeShangjia;
var peiTypeEnumObj = (_peiTypeEnumObj = {}, (0, _defineProperty2.default)(_peiTypeEnumObj, peiTypeShangjia, 0), (0, _defineProperty2.default)(_peiTypeEnumObj, peiTypeZiti, 1), (0, _defineProperty2.default)(_peiTypeEnumObj, peiTypeKuaidi, 2), (0, _defineProperty2.default)(_peiTypeEnumObj, peiTypeDada, 3), (0, _defineProperty2.default)(_peiTypeEnumObj, peiTypeShansong, 4), (0, _defineProperty2.default)(_peiTypeEnumObj, peiTypeDuozitidian, 5), _peiTypeEnumObj);
/* 
	
	0 peiTypeEnumObj[peiTypeShangjia]
	1 peiTypeEnumObj[peiTypeZiti]
	2 peiTypeEnumObj[peiTypeKuaidi]
	3 peiTypeEnumObj[peiTypeDada]
	4 peiTypeEnumObj[peiTypeShansong]
	5 peiTypeEnumObj[peiTypeDuozitidian]
*/

// 多门店版本枚举配送方式
exports.peiTypeEnumObj = peiTypeEnumObj;
var dispatchshangjia = 'dispatchshangjia',
  // 商家配送
  dispatchmendian = 'dispatchmendian',
  // 门店自提
  dispatchdaodian = 'dispatchdaodian',
  // 到点自提
  dispatchkuaidi = 'dispatchkuaidi'; // 快递
exports.dispatchkuaidi = dispatchkuaidi;
exports.dispatchdaodian = dispatchdaodian;
exports.dispatchmendian = dispatchmendian;
exports.dispatchshangjia = dispatchshangjia;
var dispatchTypeIdEnum = {
  '0': dispatchshangjia,
  '1': dispatchmendian,
  '5': dispatchdaodian,
  '2': dispatchkuaidi
};
exports.dispatchTypeIdEnum = dispatchTypeIdEnum;
var errorMsg = '网络不给力 请稍后重试';
// const errorMsg = '活动太火爆 请稍后重试';

// 成功失败的常量字符串
exports.errorMsg = errorMsg;
var success = 'success',
  error = 'error';

/* 
	订单类型
	prom_type
	'common'    普通
	'rob'       抢购
	'group'     拼团
	'integral'  积分兑换
	'pre_sale'  预售订单
*/
exports.error = error;
exports.success = success;
var promTypeCommon = 'promTypeCommon',
  // 普通
  promTypeRob = 'promTypeRob',
  // 抢购
  promTypeGroup = 'promTypeGroup',
  // 拼团
  promTypeIntegral = 'promTypeIntegral',
  // 积分兑换
  promTypePreSale = 'promTypePreSale'; // 预售订单
exports.promTypePreSale = promTypePreSale;
exports.promTypeIntegral = promTypeIntegral;
exports.promTypeGroup = promTypeGroup;
exports.promTypeRob = promTypeRob;
exports.promTypeCommon = promTypeCommon;
var promTypeEnumObj = (_promTypeEnumObj = {}, (0, _defineProperty2.default)(_promTypeEnumObj, promTypeCommon, 'common'), (0, _defineProperty2.default)(_promTypeEnumObj, promTypeRob, 'rob'), (0, _defineProperty2.default)(_promTypeEnumObj, promTypeGroup, 'group'), (0, _defineProperty2.default)(_promTypeEnumObj, promTypeIntegral, 'integral'), (0, _defineProperty2.default)(_promTypeEnumObj, promTypePreSale, 'pre_sale'), _promTypeEnumObj);

// 平台开通的支付方式
exports.promTypeEnumObj = promTypeEnumObj;
var openIngApp = 'openIngApp',
  openIngH5 = 'openIngH5',
  openIngWxminiprogram = 'openIngWxminiprogram',
  openIngWxofficialaccount = 'openIngWxofficialaccount';
exports.openIngWxofficialaccount = openIngWxofficialaccount;
exports.openIngWxminiprogram = openIngWxminiprogram;
exports.openIngH5 = openIngH5;
exports.openIngApp = openIngApp;
var openIngEnumObj = (_openIngEnumObj = {}, (0, _defineProperty2.default)(_openIngEnumObj, openIngApp, 'app'), (0, _defineProperty2.default)(_openIngEnumObj, openIngH5, 'h5'), (0, _defineProperty2.default)(_openIngEnumObj, openIngWxminiprogram, 'wxminiprogram'), (0, _defineProperty2.default)(_openIngEnumObj, openIngWxofficialaccount, 'wxofficialaccount'), _openIngEnumObj);

// 当前运行环境 安卓 or 苹果
exports.openIngEnumObj = openIngEnumObj;
var ENVANDROID = 'ENVANDROID',
  ENVIOS = 'ENVIOS';

/*
	商品右下角的加入购物车按钮的样式
		anniushuzi
			一个加号按钮按钮右上是数字
		shuanganniushuzi
			一个减号按钮 数字 一个加号按钮按钮
*/
exports.ENVIOS = ENVIOS;
exports.ENVANDROID = ENVANDROID;
var anniushuzi = 'anniushuzi',
  shuanganniushuzi = 'shuanganniushuzi';

// 从购物车把商品删除的类型
exports.shuanganniushuzi = shuanganniushuzi;
exports.anniushuzi = anniushuzi;
var delCartGoodsTypeCartId = 'delCartGoodsTypeCartId',
  // 购物车id
  delCartGoodsTypeGoodsId = 'delCartGoodsTypeGoodsId'; // 商品id

// 提醒绑定手机号提示
exports.delCartGoodsTypeGoodsId = delCartGoodsTypeGoodsId;
exports.delCartGoodsTypeCartId = delCartGoodsTypeCartId;
var bindMobileTips = '请绑定手机号后操作';

// 各个客户端运行平台字符串
exports.bindMobileTips = bindMobileTips;
var xcx_wx = 'xcx_wx',
  // 微信小程序
  xcx_tt = 'xcx_tt',
  // 头条小程序
  browser_third = 'browser_third',
  // 非微信浏览器
  browser_wx = 'browser_wx',
  // 微信浏览器
  app_android = 'app_android',
  // 安卓
  app_ios = 'app_ios'; // 苹果

// 客户端运行平台枚举
exports.app_ios = app_ios;
exports.app_android = app_android;
exports.browser_wx = browser_wx;
exports.browser_third = browser_third;
exports.xcx_tt = xcx_tt;
exports.xcx_wx = xcx_wx;
var clientPlatformEnum = {
  xcx_wx: xcx_wx,
  xcx_tt: xcx_tt,
  browser_third: browser_third,
  browser_wx: browser_wx,
  app_android: app_android,
  app_ios: app_ios
};

// 支付类型字符串
exports.clientPlatformEnum = clientPlatformEnum;
var payment_zfb = 'payment_zfb',
  payment_wx = 'payment_wx';
// 支付类型枚举
exports.payment_wx = payment_wx;
exports.payment_zfb = payment_zfb;
var paymentTypeEnum = {
  payment_zfb: payment_zfb,
  payment_wx: payment_wx
};

// 订单类型
/*
	common--普通
	rob--抢购
	group--拼团
	integral--积分兑换
	pre_sale--预售订单
*/
exports.paymentTypeEnum = paymentTypeEnum;
var common = 'common',
  rob = 'rob',
  group = 'group',
  integral = 'integral',
  preSale = 'preSale';
exports.preSale = preSale;
exports.integral = integral;
exports.group = group;
exports.rob = rob;
exports.common = common;
var orderTypeEnum = (0, _defineProperty2.default)({
  common: common,
  rob: rob,
  group: group,
  integral: integral
}, 'pre_sale', preSale);
exports.orderTypeEnum = orderTypeEnum;

/***/ }),

/***/ 42:
/*!******************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/store/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 24));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 36));
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
var _siteinfo = __webpack_require__(/*! @/tools/siteinfo.js */ 38);
var _home = _interopRequireDefault(__webpack_require__(/*! ./home */ 43));
var _class2 = _interopRequireDefault(__webpack_require__(/*! ./_class */ 44));
var _cart = _interopRequireDefault(__webpack_require__(/*! ./cart */ 45));
var _userInfo = _interopRequireDefault(__webpack_require__(/*! ./user-info */ 46));
var _eat = _interopRequireDefault(__webpack_require__(/*! ./eat.js */ 47));
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

// 站点域名

_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  modules: {
    home: _home.default,
    _class: _class2.default,
    cart: _cart.default,
    userInfo: _userInfo.default,
    eat: _eat.default
  },
  state: {
    appStaticPath: '',
    // 设置程序里使用的静态图片路径 (永远不换的图片)
    configInfo: {},
    // 全局的设置数据

    MenuList: [],
    // tab-bar 的数据

    isiPhoneX: false,
    // 是否iphonx 

    homeTemplateIdList: [],
    // 首页的模板消息id字符串 数组
    homeTemplateIdSettingFlag: true,
    // 设置过 允许并且 不再提示
    globalMainSwitch: false,
    // 小程序设置里 允许发送发送模板消息的 设置
    defaultHomeToastModalStatus: true,
    // 默认首页 弹出 确认 权限的 模态框

    isUserCloneFlag: false,
    // 是否是 用户 手动关闭的

    token: '',
    // 全局的token

    refreshCurrentPage: false,
    // 登录返回后重新刷新页面

    backIconTop: 26,
    // 详情页返回上一页的左上角图标距离顶部的位置

    buyHistoryList: [] // 平台的购买记录数据
  },

  mutations: {
    // 赋值 给token 值
    setToken: function setToken(store, tokenStr) {
      store.token = tokenStr;
    },
    // 设置程序里使用的静态图片路径 (永远不换的图片)
    setAppStaticPath: function setAppStaticPath(store) {
      store.appStaticPath = "".concat(_siteinfo.host, "/wx-image");
    },
    // 赋值 全局的设置数据
    setConfigInfo: function setConfigInfo(store, configInfo) {
      store.configInfo = configInfo;
    },
    // 赋值 tab-bar 的数据
    setMenuList: function setMenuList(store, arg) {
      store.MenuList = arg;
    },
    // 赋值 是否iphonx 
    setIsiPhoneX: function setIsiPhoneX(store, bool) {
      store.isiPhoneX = bool;
    },
    // 设置发送优惠券模板id 数组
    setHomeTemplateIdList: function setHomeTemplateIdList(store, list) {
      store.homeTemplateIdList = list;
    },
    // 设置首页模板消息id 是否被永久 允许了
    setHomeTemplateIdSettingFlag: function setHomeTemplateIdSettingFlag(store, bool) {
      store.homeTemplateIdSettingFlag = bool;
    },
    // 赋值 小程序设置里 允许发送发送模板消息的 设置
    setGlobalMainSwitch: function setGlobalMainSwitch(store, bool) {
      store.globalMainSwitch = bool;
    },
    // 赋值 首页弹框状态
    setDefaultHomeToastModalStatus: function setDefaultHomeToastModalStatus(store, bool) {
      store.defaultHomeToastModalStatus = bool;
    },
    // 赋值 是否是用户手动关闭的状态
    setIsUserCloneFlag: function setIsUserCloneFlag(store, bool) {
      store.isUserCloneFlag = bool;
    },
    // 赋值当前页面是否需要刷新
    setRefreshCurrentPage: function setRefreshCurrentPage(store, bool) {
      store.refreshCurrentPage = bool;
    },
    // 赋值 详情页返回上一页的左上角图标距离顶部的距离
    setBackIconTop: function setBackIconTop(store, height) {
      store.backIconTop = height;
    },
    // 赋值 平台的购买记录数据
    setBuyHistoryList: function setBuyHistoryList(store, list) {
      store.buyHistoryList = list;
    }
  },
  actions: {},
  getters: {
    // 是否打开 吃什么 选项
    getIsOpenEat: function getIsOpenEat(state) {
      var tabbar = state.configInfo.tabbar || [];
      for (var i = 0; i < tabbar.length; i++) {
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
    miniProgrameCheck: function miniProgrameCheck(state) {
      return state.configInfo.mini_program_check == 1;
    },
    /*
    	@description 是否开启了会员功能
    	@return <Boolean>
    		true 表示开启了vip功能
    		false 表示关闭了vip功能
     */
    isOpenVipFunc: function isOpenVipFunc(state) {
      return state.configInfo.user_vip_card == 1 ? true : false;
    },
    /* 
    	
    	@description 是否打开 全栈搜索功能
    	@return <Boolean>
    		true 表示开启了全栈搜索功能
    		false 表示关闭了全栈搜索功能
    */
    isOpenHomeSearchFunc: function isOpenHomeSearchFunc(state) {
      return (0, _tools.assertObject)(state.configInfo).search_is_show == 1 ? true : false;
    }
  }
});
var _default = store;
exports.default = _default;

/***/ }),

/***/ 43:
/*!*****************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/store/home.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//  首页的全局数据

var store = {
  state: {
    miaoshaOptions: {},
    // 秒杀模块的 样式配置
    caiChangOptions: {} // 菜场模块 信息 和 样式配置
  },

  mutations: {
    // 设置全局的 秒杀模块的 样式配置
    setMiaoshaOptions: function setMiaoshaOptions(state, miaoshaOptions) {
      state.miaoshaOptions = miaoshaOptions;
      console.log('state.miaoshaOptions = miaoshaOptions', miaoshaOptions);
    },
    // 设置全局的 菜场模块 信息 和 样式配置
    setCaiChangOptions: function setCaiChangOptions(state, caiChangOptions) {
      state.caiChangOptions = caiChangOptions;
    }
  },
  actions: {},
  getters: {}
};
var _default = store;
exports.default = _default;

/***/ }),

/***/ 44:
/*!*******************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/store/_class.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//  分类页面的全局数据

var store = {
  state: {},
  mutations: {},
  actions: {}
};
var _default = store;
exports.default = _default;

/***/ }),

/***/ 45:
/*!*****************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/store/cart.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//  购物车页面的全局数据

var store = {
  state: {},
  mutations: {},
  actions: {}
};
var _default = store;
exports.default = _default;

/***/ }),

/***/ 46:
/*!**********************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/store/user-info.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tools = __webpack_require__(/*! @/tools/tools */ 39);
//  个人中心的数据

var store = {
  state: {
    userInfoAvatar: '',
    // 头像地址
    userInfoNickName: '',
    // 网名
    userInfoLv: 0,
    // 等级
    userInfoMoney: 0,
    // 余额
    userInfoCoupon: 0,
    // 优惠券数量
    userInfoMc: 0,
    // 商品券
    userInfoIntegral: 0,
    // 积分
    userInfoMobile: '',
    // 手机号
    userInfoEncrypt: '',
    // 加密字符串

    isVip: false,
    // 是否是vip用户
    vipName: '',
    // 会员名称   不是会员传的是 普通会员
    vipTes: '',
    // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
    vipEndTime: '',
    // 会员过期时间文字  此字段没提示就是空  直接用就行了

    laBaMsg: '',
    // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
    vipIcon: '',
    // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
    vipTitle: '',
    // V的图标后的标题文字 后端字段是 vip_eco
    vipBtnText: '',
    // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
    vipIconList: [],
    // 会员权益列表

    orderNumUn: 0,
    // 我的订单-待支付数量
    orderNumIng: 0,
    // 我的订单-进行中数量
    orderNumEd: 0,
    // 我的订单-待评价数量

    bannerList: [] // 个人中心轮播图数据
  },

  mutations: {
    // 没有登录 传页面信息
    setPage: function setPage(state, arg) {
      var laBaMsg = arg.laBaMsg,
        vipIcon = arg.vipIcon,
        vipTitle = arg.vipTitle,
        vipBtnText = arg.vipBtnText,
        vipIconList = arg.vipIconList,
        bannerList = arg.bannerList;
      state.RobFoodmarket = arg;
      state.laBaMsg = laBaMsg; // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
      state.vipIcon = vipIcon; // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
      state.vipTitle = vipTitle; // V的图标后的标题文字 后端字段是 vip_eco
      state.vipBtnText = vipBtnText; // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
      state.vipIconList = vipIconList; // 会员权益列表

      state.bannerList = bannerList; // 个人中心轮播图数据
    },
    // 有登陆状态 页面信息+用户信息
    setUserInfoAndPage: function setUserInfoAndPage(state, arg) {
      var userInfoAvatar = arg.userInfoAvatar,
        userInfoNickName = arg.userInfoNickName,
        userInfoLv = arg.userInfoLv,
        userInfoMoney = arg.userInfoMoney,
        userInfoCoupon = arg.userInfoCoupon,
        userInfoMc = arg.userInfoMc,
        userInfoIntegral = arg.userInfoIntegral,
        userInfoMobile = arg.userInfoMobile,
        userInfoEncrypt = arg.userInfoEncrypt,
        isVip = arg.isVip,
        vipName = arg.vipName,
        vipTes = arg.vipTes,
        vipEndTime = arg.vipEndTime,
        laBaMsg = arg.laBaMsg,
        vipIcon = arg.vipIcon,
        vipTitle = arg.vipTitle,
        vipBtnText = arg.vipBtnText,
        vipIconList = arg.vipIconList,
        orderNumUn = arg.orderNumUn,
        orderNumIng = arg.orderNumIng,
        orderNumEd = arg.orderNumEd,
        bannerList = arg.bannerList;
      state.userInfoAvatar = (0, _tools.checkAvatarPath)(userInfoAvatar); // 头像地址
      state.userInfoNickName = userInfoNickName; // 网名
      state.userInfoLv = userInfoLv; // 等级
      state.userInfoMoney = userInfoMoney; // 余额
      state.userInfoCoupon = userInfoCoupon; // 优惠券数量
      state.userInfoMc = userInfoMc; // 商品券
      state.userInfoIntegral = userInfoIntegral; // 积分
      state.userInfoMobile = userInfoMobile; // 手机号
      state.userInfoEncrypt = userInfoEncrypt; // 加密字符串

      state.isVip = isVip; // 是否是vip用户
      state.vipName = vipName; // 会员名称   不是会员传的是 普通会员
      state.vipTes = vipTes; // 是否是体验卡 如果此字段是空表示什么都没有 不是空就显示在优享会员后面
      state.vipEndTime = vipEndTime; // 会员过期时间文字  此字段没提示就是空  直接用就行了

      state.laBaMsg = laBaMsg; // 小喇叭 图标后的消息文字   后端字段是 user_vip_card_cue
      state.vipIcon = vipIcon; // 会员图标网络路径（就是那个V的图标）  后端字段是 user_vip_card_icon
      state.vipTitle = vipTitle; // V的图标后的标题文字 后端字段是 vip_eco
      state.vipBtnText = vipBtnText; // V的图标后的标题文字 后的按钮文字 后端字段是 vip_button
      state.vipIconList = vipIconList; // 会员权益列表

      state.orderNumUn = orderNumUn; // 我的订单-待支付数量
      state.orderNumIng = orderNumIng; // 我的订单-进行中数量
      state.orderNumEd = orderNumEd; // 我的订单-待评价数量

      state.bannerList = bannerList; // 个人中心轮播图数据
    }
  },

  actions: {},
  getters: {}
};
var _default = store;
exports.default = _default;

/***/ }),

/***/ 47:
/*!****************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/store/eat.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//  吃什么页面相关数据

var store = {
  state: {
    eatPageList: [] // 吃什么页面 作品列表数据
  },

  mutations: {
    // 赋值 给 吃什么页面 作品列表
    setEatPageList: function setEatPageList(state, eatPageList) {
      state.eatPageList = eatPageList;
      /* 
      console.log(
      	'vuex 传过来新的 eatPageList 数据',
      	eatPageList, '\n',
      );
       */
    }
  },

  actions: {},
  getters: {}
};
var _default = store;
exports.default = _default;

/***/ }),

/***/ 48:
/*!**************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/tools/libs/installs.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onceClick = onceClick;
/* 
	installs.js // 自定义全局的组件
*/
var onoff = false;

// 处理多次点击方法
function onceClick(fn) {
  var that = this;
  // console.log('$onceClick--Start', that.onoff);

  if (that.onoff) {
    console.log('稍等会再点, 正在处理其他东西');
  } else {
    that.onoff = true;
    console.log('$onceClick 的函数 运行');
    for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }
    fn.apply(void 0, arg);
    setTimeout(function () {
      // console.log('$onceClick--setTimeout-before',that.onoff);
      that.onoff = false;
      // console.log('$onceClick--setTimeout-after',that.onoff);
    }, 750);
  }
  // console.log('$onceClick--End', that.onoff);
}

/***/ }),

/***/ 5:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 526:
/*!*******************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/address/address.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sexEnum = exports.nv = exports.nan = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _sexEnum;
/**
 * @description: 收货地址模块里的常量字符串和枚举对象
 * */

// 常量字符串
var nan = 'nan',
  // 男
  nv = 'nv'; // 女
exports.nv = nv;
exports.nan = nan;
var sexEnum = (_sexEnum = {}, (0, _defineProperty2.default)(_sexEnum, nan, 1), (0, _defineProperty2.default)(_sexEnum, nv, 2), _sexEnum);
exports.sexEnum = sexEnum;

/***/ }),

/***/ 575:
/*!***************************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/packageA/youhuiquan/coupon-const.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 3);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yiyong = exports.yiling = exports.weiling = exports.guoqi = exports.couponStatusEnum = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 10));
var _couponStatusEnum;
// 优惠券使用的常量和枚举

// 优惠券的几种状态
var weiling = 'weiling',
  // 未领
  yiling = 'yiling',
  // 已领
  yiyong = 'yiyong',
  // 已用
  guoqi = 'guoqi'; // 过期
exports.guoqi = guoqi;
exports.yiyong = yiyong;
exports.yiling = yiling;
exports.weiling = weiling;
var couponStatusEnum = (_couponStatusEnum = {}, (0, _defineProperty2.default)(_couponStatusEnum, weiling, weiling), (0, _defineProperty2.default)(_couponStatusEnum, yiling, yiling), (0, _defineProperty2.default)(_couponStatusEnum, yiyong, yiyong), (0, _defineProperty2.default)(_couponStatusEnum, guoqi, guoqi), _couponStatusEnum);
exports.couponStatusEnum = couponStatusEnum;

/***/ }),

/***/ 6:
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 7:
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 8);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 8:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 9:
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 981:
/*!*********************************************************************************************!*\
  !*** F:/test-uniapp2/万象优鲜商城生鲜配送系统生鲜批发版本APP小程序公众号抖音小程序快手商城小程序/components/uni-icons/icons.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609"
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-toutiao/common/vendor.js.map