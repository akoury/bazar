/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate = __webpack_require__(20);

/**
 * @class
 * @global
 * @param {object} options Construction options
 * @classdesc This class is used to report error conditions, frequently as the first parameter to callbacks throughout the Braintree SDK.
 * @description <strong>You cannot use this constructor directly. Interact with instances of this class through {@link callback callbacks}.</strong>
 */
function BraintreeError(options) {
  if (!BraintreeError.types.hasOwnProperty(options.type)) {
    throw new Error(options.type + ' is not a valid type.');
  }

  if (!options.code) {
    throw new Error('Error code required.');
  }

  if (!options.message) {
    throw new Error('Error message required.');
  }

  this.name = 'BraintreeError';

  /**
   * @type {string}
   * @description A code that corresponds to specific errors.
   */
  this.code = options.code;

  /**
   * @type {string}
   * @description A short description of the error.
   */
  this.message = options.message;

  /**
   * @type {BraintreeError.types}
   * @description The type of error.
   */
  this.type = options.type;

  /**
   * @type {object=}
   * @description Additional information about the error, such as an underlying network error response.
   */
  this.details = options.details;
}

BraintreeError.prototype = Object.create(Error.prototype);
BraintreeError.prototype.constructor = BraintreeError;

/**
 * Enum for {@link BraintreeError} types.
 * @name BraintreeError.types
 * @enum
 * @readonly
 * @memberof BraintreeError
 * @property {string} CUSTOMER An error caused by the customer.
 * @property {string} MERCHANT An error that is actionable by the merchant.
 * @property {string} NETWORK An error due to a network problem.
 * @property {string} INTERNAL An error caused by Braintree code.
 * @property {string} UNKNOWN An error where the origin is unknown.
 */
BraintreeError.types = enumerate([
  'CUSTOMER',
  'MERCHANT',
  'NETWORK',
  'INTERNAL',
  'UNKNOWN'
]);

BraintreeError.findRootError = function (err) {
  if (err instanceof BraintreeError && err.details && err.details.originalError) {
    return BraintreeError.findRootError(err.details.originalError);
  }

  return err;
};

module.exports = BraintreeError;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  paymentOptionIDs: {
    card: 'card',
    paypal: 'paypal',
    paypalCredit: 'paypalCredit',
    applePay: 'applePay',
    venmo: 'venmo',
    googlePay: 'googlePay'
  },
  paymentMethodTypes: {
    card: 'CreditCard',
    paypal: 'PayPalAccount',
    paypalCredit: 'PayPalAccount',
    applePay: 'ApplePayCard',
    venmo: 'VenmoAccount',
    googlePay: 'AndroidPayCard'
  },
  analyticsKinds: {
    CreditCard: 'card',
    PayPalAccount: 'paypal',
    ApplePayCard: 'applepay',
    VenmoAccount: 'venmo',
    AndroidPayCard: 'googlepay'
  },
  paymentMethodCardTypes: {
    Visa: 'visa',
    MasterCard: 'master-card',
    'American Express': 'american-express',
    'Diners Club': 'diners-club',
    Discover: 'discover',
    JCB: 'jcb',
    UnionPay: 'unionpay',
    Maestro: 'maestro'
  },
  configurationCardTypes: {
    visa: 'Visa',
    'master-card': 'MasterCard',
    'american-express': 'American Express',
    'diners-club': 'Discover',
    discover: 'Discover',
    jcb: 'JCB',
    unionpay: 'UnionPay',
    maestro: 'Maestro'
  },
  errors: {
    NO_PAYMENT_METHOD_ERROR: 'No payment method is available.',
    PAYPAL_NON_LINKED_SANDBOX: 'A <a href="https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing" target="_blank" rel="nofollow">linked sandbox account</a> is required to use PayPal Checkout in sandbox.'
  },
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  ANALYTICS_PREFIX: 'web.dropin.',
  CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT: 200,
  CHECKOUT_JS_SOURCE: 'https://www.paypalobjects.com/api/checkout.min.js',
  GOOGLE_PAYMENT_SOURCE: 'https://payments.developers.google.com/js/apis/pay.js',
  INTEGRATION: 'dropin2',
  PAYPAL_CHECKOUT_SCRIPT_ID: 'braintree-dropin-paypal-checkout-script',
  GOOGLE_PAYMENT_SCRIPT_ID: 'braintree-dropin-google-payment-script',
  DATA_COLLECTOR_SCRIPT_ID: 'braintree-dropin-data-collector-script',
  STYLESHEET_ID: 'braintree-dropin-stylesheet'
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deferred = __webpack_require__(124);
var once = __webpack_require__(125);
var promiseOrCallback = __webpack_require__(126);

function wrapPromise(fn) {
  return function () {
    var callback;
    var args = Array.prototype.slice.call(arguments);
    var lastArg = args[args.length - 1];

    if (typeof lastArg === 'function') {
      callback = args.pop();
      callback = once(deferred(callback));
    }
    return promiseOrCallback(fn.apply(this, args), callback); // eslint-disable-line no-invalid-this
  };
}

wrapPromise.wrapPrototype = function (target, options) {
  var methods, ignoreMethods, includePrivateMethods;

  options = options || {};
  ignoreMethods = options.ignoreMethods || [];
  includePrivateMethods = options.transformPrivateMethods === true;

  methods = Object.getOwnPropertyNames(target.prototype).filter(function (method) {
    var isNotPrivateMethod;
    var isNonConstructorFunction = method !== 'constructor' &&
      typeof target.prototype[method] === 'function';
    var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;

    if (includePrivateMethods) {
      isNotPrivateMethod = true;
    } else {
      isNotPrivateMethod = method.charAt(0) !== '_';
    }

    return isNonConstructorFunction &&
      isNotPrivateMethod &&
      isNotAnIgnoredMethod;
  });

  methods.forEach(function (method) {
    var original = target.prototype[method];

    target.prototype[method] = wrapPromise(original);
  });

  return target;
};

module.exports = wrapPromise;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise = global.Promise || __webpack_require__(45);

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Promise = global.Promise || __webpack_require__(45);

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(30);
var isBuffer = __webpack_require__(74);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(17);
var addMetadata = __webpack_require__(43);

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(client, kind, callback) {
  var configuration = client.getConfiguration();
  var request = client._request;
  var timestamp = _millisToSeconds(Date.now());
  var url = configuration.gatewayConfiguration.analytics.url;
  var data = {
    analytics: [{
      kind: constants.ANALYTICS_PREFIX + kind,
      timestamp: timestamp
    }]
  };

  request({
    url: url,
    method: 'post',
    data: addMetadata(configuration, data),
    timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
  }, callback);
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isBraintreeWebError(err) {
  return err.name === 'BraintreeError';
}

function DropinError(err) {
  this.name = 'DropinError';

  if (typeof err === 'string') {
    this.message = err;
  } else {
    this.message = err.message;
  }

  if (isBraintreeWebError(err)) {
    this._braintreeWebError = err;
  } else {
    this._braintreeWebError = err.braintreeWebError;
  }
}

DropinError.prototype = Object.create(Error.prototype);
DropinError.prototype.constructor = DropinError;

module.exports = DropinError;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(10).assign;
var DropinError = __webpack_require__(8);
var errors = __webpack_require__(2).errors;
var Promise = __webpack_require__(5);

function BaseView(options) {
  options = options || {};

  assign(this, options);
}

BaseView.prototype.getElementById = function (id) {
  if (!this.element) { return null; }

  return this.element.querySelector('[data-braintree-id="' + id + '"]');
};

BaseView.prototype.requestPaymentMethod = function () {
  return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
};

BaseView.prototype.getPaymentMethod = function () {
  return this.activeMethodView && this.activeMethodView.paymentMethod;
};

BaseView.prototype.onSelection = function () {};

BaseView.prototype.teardown = function () {
  return Promise.resolve();
};

module.exports = BaseView;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

function assignPolyfill(destination) {
  var i, source, key;

  for (i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}

module.exports = {
  assign: assignNormalized,
  _assign: assignPolyfill
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'function';
  });
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);
var sharedErrors = __webpack_require__(18);

module.exports = function (instance, methodNames) {
  methodNames.forEach(function (methodName) {
    instance[methodName] = function () {
      throw new BraintreeError({
        type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
        code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
        message: methodName + ' cannot be called after teardown.'
      });
    };
  });
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classesOf(element) {
  return element.className.trim().split(/\s+/);
}

function _hasClass(element, classname) {
  return new RegExp('\\b' + classname + '\\b').test(element.className);
}

function add(element) {
  var toAdd = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toAdd.indexOf(classname) === -1;
  }).concat(toAdd).join(' ');

  element.className = className;
}

function remove(element) {
  var toRemove = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toRemove.indexOf(classname) === -1;
  }).join(' ');

  element.className = className;
}

function toggle(element, classname, adding) {
  if (arguments.length < 3) {
    if (_hasClass(element, classname)) {
      remove(element, classname);
    } else {
      add(element, classname);
    }
  } else if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}

module.exports = {
  add: add,
  remove: remove,
  toggle: toggle
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob = __webpack_require__(37).atob;
var constants = __webpack_require__(2);
var braintreeClientVersion = __webpack_require__(38).VERSION;

function _millisToSeconds(millis) {
  return Math.floor(millis / 1000);
}

function sendAnalyticsEvent(client, kind, callback) {
  var configuration = client.getConfiguration();
  var analyticsRequest = client._request;
  var timestamp = _millisToSeconds(Date.now());
  var url = configuration.gatewayConfiguration.analytics.url;
  var data = {
    analytics: [{
      kind: constants.ANALYTICS_PREFIX + kind,
      timestamp: timestamp
    }],
    _meta: configuration.analyticsMetadata,
    braintreeLibraryVersion: braintreeClientVersion
  };

  if (configuration.authorizationType === 'TOKENIZATION_KEY') {
    data.tokenizationKey = configuration.authorization;
  } else {
    data.authorizationFingerprint = JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
  }

  analyticsRequest({
    url: url,
    method: 'post',
    data: data,
    timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
  }, callback);
}

module.exports = {
  sendEvent: sendAnalyticsEvent
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assignNormalized = typeof Object.assign === 'function' ? Object.assign : assignPolyfill;

function assignPolyfill(destination) {
  var i, source, key;

  for (i = 1; i < arguments.length; i++) {
    source = arguments[i];
    for (key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key];
      }
    }
  }

  return destination;
}

module.exports = {
  assign: assignNormalized,
  _assign: assignPolyfill
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);
var Promise = __webpack_require__(4);
var sharedErrors = __webpack_require__(18);
var VERSION = "3.31.0";

function basicComponentVerification(options) {
  var client, clientVersion, name;

  if (!options) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.type,
      code: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.code,
      message: 'Options must be passed to basicComponentVerification function.'
    }));
  }

  name = options.name;
  client = options.client;

  if (client == null) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.client is required when instantiating ' + name + '.'
    }));
  }

  clientVersion = client.getVersion();

  if (clientVersion !== VERSION) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
      code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
      message: 'Client (version ' + clientVersion + ') and ' + name + ' (version ' + VERSION + ') components must be from the same SDK version.'
    }));
  }

  return Promise.resolve();
}

module.exports = {
  verify: basicComponentVerification
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = "3.31.0";
var PLATFORM = 'web';

module.exports = {
  ANALYTICS_PREFIX: 'web.',
  ANALYTICS_REQUEST_TIMEOUT_MS: 2000,
  INTEGRATION_TIMEOUT_MS: 60000,
  VERSION: VERSION,
  INTEGRATION: 'custom',
  SOURCE: 'client',
  PLATFORM: PLATFORM,
  BRAINTREE_LIBRARY_VERSION: 'braintree/' + PLATFORM + '/' + VERSION
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  INVALID_USE_OF_INTERNAL_FUNCTION: {
    type: BraintreeError.types.INTERNAL,
    code: 'INVALID_USE_OF_INTERNAL_FUNCTION'
  },
  CALLBACK_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CALLBACK_REQUIRED'
  },
  INSTANTIATION_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'INSTANTIATION_OPTION_REQUIRED'
  },
  INVALID_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'INVALID_OPTION'
  },
  INCOMPATIBLE_VERSIONS: {
    type: BraintreeError.types.MERCHANT,
    code: 'INCOMPATIBLE_VERSIONS'
  },
  METHOD_CALLED_AFTER_TEARDOWN: {
    type: BraintreeError.types.MERCHANT,
    code: 'METHOD_CALLED_AFTER_TEARDOWN'
  },
  BRAINTREE_API_ACCESS_RESTRICTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'BRAINTREE_API_ACCESS_RESTRICTED',
    message: 'Your access is restricted and cannot use this part of the Braintree API.'
  }
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isIos(ua) {
  ua = ua || global.navigator.userAgent;
  return /iPhone|iPod|iPad/i.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function enumerate(values, prefix) {
  prefix = prefix == null ? '' : prefix;

  return values.reduce(function (enumeration, value) {
    enumeration[value] = prefix + value;

    return enumeration;
  }, {});
}

module.exports = enumerate;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isIe9(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('MSIE 9') !== -1;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  HOSTED_FIELDS_TIMEOUT: {
    type: BraintreeError.types.UNKNOWN,
    code: 'HOSTED_FIELDS_TIMEOUT',
    message: 'Hosted Fields timed out when attempting to set up.'
  },
  HOSTED_FIELDS_INVALID_FIELD_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_KEY'
  },
  HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_INVALID_FIELD_SELECTOR',
    message: 'Selector does not reference a valid DOM node.'
  },
  HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME',
    message: 'Element already contains a Braintree iframe.'
  },
  HOSTED_FIELDS_FIELD_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_INVALID'
  },
  HOSTED_FIELDS_FIELD_NOT_PRESENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_NOT_PRESENT'
  },
  HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR',
    message: 'A tokenization network error occurred.'
  },
  HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE',
    message: 'This credit card already exists in the merchant\'s vault.'
  },
  HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED',
    message: 'CVV verification failed during tokenization.'
  },
  HOSTED_FIELDS_FAILED_TOKENIZATION: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FAILED_TOKENIZATION',
    message: 'The supplied card data failed tokenization.'
  },
  HOSTED_FIELDS_FIELDS_EMPTY: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_EMPTY',
    message: 'All fields are empty. Cannot tokenize empty card fields.'
  },
  HOSTED_FIELDS_FIELDS_INVALID: {
    type: BraintreeError.types.CUSTOMER,
    code: 'HOSTED_FIELDS_FIELDS_INVALID',
    message: 'Some payment input fields are invalid. Cannot tokenize invalid card fields.'
  },
  HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED'
  },
  HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED'
  },
  HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'HOSTED_FIELDS_FIELD_PROPERTY_INVALID'
  }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(6);
var normalizeHeaderName = __webpack_require__(76);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(32);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(32);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)))

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
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
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function once(fn) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      fn.apply(null, arguments);
    }
  };
}

module.exports = once;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function _notEmpty(obj) {
  var key;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) { return true; }
  }

  return false;
}

/* eslint-disable no-mixed-operators */
function _isArray(value) {
  return value && typeof value === 'object' && typeof value.length === 'number' &&
    Object.prototype.toString.call(value) === '[object Array]' || false;
}
/* eslint-enable no-mixed-operators */

function parse(url) {
  var query, params;

  url = url || global.location.href;

  if (!/\?/.test(url)) {
    return {};
  }

  query = url.replace(/#.*$/, '').replace(/^.*\?/, '').split('&');

  params = query.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});

  return params;
}

function stringify(params, namespace) {
  var k, v, p;
  var query = [];

  for (p in params) {
    if (!params.hasOwnProperty(p)) {
      continue;
    }

    v = params[p];

    if (namespace) {
      if (_isArray(params)) {
        k = namespace + '[]';
      } else {
        k = namespace + '[' + p + ']';
      }
    } else {
      k = p;
    }
    if (typeof v === 'object') {
      query.push(stringify(v, k));
    } else {
      query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }

  return query.join('&');
}

function queryify(url, params) {
  url = url || '';

  if (params != null && typeof params === 'object' && _notEmpty(params)) {
    url += url.indexOf('?') === -1 ? '?' : '';
    url += url.indexOf('=') !== -1 ? '&' : '';
    url += stringify(params);
  }

  return url;
}

module.exports = {
  parse: parse,
  stringify: stringify,
  queryify: queryify
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable no-reserved-keys */

var enumerate = __webpack_require__(20);
var errors = __webpack_require__(23);
var VERSION = "3.31.0";

var constants = {
  VERSION: VERSION,
  maxExpirationYearAge: 19,
  externalEvents: {
    FOCUS: 'focus',
    BLUR: 'blur',
    EMPTY: 'empty',
    NOT_EMPTY: 'notEmpty',
    VALIDITY_CHANGE: 'validityChange',
    CARD_TYPE_CHANGE: 'cardTypeChange'
  },
  defaultMaxLengths: {
    number: 19,
    postalCode: 8,
    expirationDate: 7,
    expirationMonth: 2,
    expirationYear: 4,
    cvv: 3
  },
  externalClasses: {
    FOCUSED: 'braintree-hosted-fields-focused',
    INVALID: 'braintree-hosted-fields-invalid',
    VALID: 'braintree-hosted-fields-valid'
  },
  defaultIFrameStyle: {
    border: 'none',
    width: '100%',
    height: '100%',
    'float': 'left'
  },
  tokenizationErrorCodes: {
    81724: errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
    81736: errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED
  },
  whitelistedStyles: [
    '-moz-appearance',
    '-moz-osx-font-smoothing',
    '-moz-tap-highlight-color',
    '-moz-transition',
    '-webkit-appearance',
    '-webkit-font-smoothing',
    '-webkit-tap-highlight-color',
    '-webkit-transition',
    'appearance',
    'color',
    'direction',
    'font',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-variant-alternates',
    'font-variant-caps',
    'font-variant-east-asian',
    'font-variant-ligatures',
    'font-variant-numeric',
    'font-weight',
    'letter-spacing',
    'line-height',
    'padding',
    'opacity',
    'outline',
    'text-shadow',
    'transition'
  ],
  whitelistedFields: {
    number: {
      name: 'credit-card-number',
      label: 'Credit Card Number'
    },
    cvv: {
      name: 'cvv',
      label: 'CVV'
    },
    expirationDate: {
      name: 'expiration',
      label: 'Expiration Date'
    },
    expirationMonth: {
      name: 'expiration-month',
      label: 'Expiration Month'
    },
    expirationYear: {
      name: 'expiration-year',
      label: 'Expiration Year'
    },
    postalCode: {
      name: 'postal-code',
      label: 'Postal Code'
    }
  },
  whitelistedAttributes: {
    'aria-invalid': 'boolean',
    'aria-required': 'boolean',
    disabled: 'boolean',
    placeholder: 'string'
  }
};

constants.events = enumerate([
  'FRAME_READY',
  'VALIDATE_STRICT',
  'CONFIGURATION',
  'TOKENIZATION_REQUEST',
  'INPUT_EVENT',
  'TRIGGER_INPUT_FOCUS',
  'ADD_CLASS',
  'REMOVE_CLASS',
  'SET_ATTRIBUTE',
  'REMOVE_ATTRIBUTE',
  'CLEAR_FIELD',
  'AUTOFILL_EXPIRATION_DATE',
  'SET_MESSAGE'
], 'hosted-fields:');

module.exports = constants;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function addSelectionEventHandler(element, func) {
  element.addEventListener('click', func);
  element.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      func();
    }
  });
}

module.exports = addSelectionEventHandler;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var settle = __webpack_require__(77);
var buildURL = __webpack_require__(79);
var parseHeaders = __webpack_require__(80);
var isURLSameOrigin = __webpack_require__(81);
var createError = __webpack_require__(33);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(82);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(83);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(78);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(94);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = self && self.setImmediate || global && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = self && self.clearImmediate || global && global.clearImmediate || this && this.clearImmediate;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

function atob(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: atobNormalized,
  _atob: atob
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);
var Client = __webpack_require__(106);
var getConfiguration = __webpack_require__(128).getConfiguration;
var VERSION = "3.31.0";
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);
var sharedErrors = __webpack_require__(18);

var cachedClients = {};

/** @module braintree-web/client */

/**
 * @function create
 * @description This function is the entry point for the <code>braintree.client</code> module. It is used for creating {@link Client} instances that service communication to Braintree servers.
 * @param {object} options Object containing all {@link Client} options:
 * @param {string} options.authorization A tokenizationKey or clientToken.
 * @param {callback} [callback] The second argument, <code>data</code>, is the {@link Client} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   // ...
 * });
 * @static
 */
function create(options) {
  if (!options.authorization) {
    return Promise.reject(new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.authorization is required when instantiating a client.'
    }));
  }

  if (cachedClients[options.authorization]) {
    return Promise.resolve(cachedClients[options.authorization]);
  }

  return getConfiguration(options).then(function (configuration) {
    var client;

    if (options.debug) {
      configuration.isDebug = true;
    }

    client = new Client(configuration);

    cachedClients[options.authorization] = client;

    return client;
  });
}

// Primarily used for testing the client create call
function clearCache() {
  cachedClients = {};
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION,
  _clearCache: clearCache
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIe = __webpack_require__(108);
var isIe9 = __webpack_require__(21);

module.exports = {
  isIe: isIe,
  isIe9: isIe9
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ajaxIsAvaliable;
var once = __webpack_require__(26);
var JSONPDriver = __webpack_require__(110);
var AJAXDriver = __webpack_require__(111);
var getUserAgent = __webpack_require__(120);
var isHTTP = __webpack_require__(121);

function isAjaxAvailable() {
  if (ajaxIsAvaliable == null) {
    ajaxIsAvaliable = !(isHTTP() && /MSIE\s(8|9)/.test(getUserAgent()));
  }

  return ajaxIsAvaliable;
}

module.exports = function (options, cb) {
  cb = once(cb || Function.prototype);
  options.method = (options.method || 'GET').toUpperCase();
  options.timeout = options.timeout == null ? 60000 : options.timeout;
  options.data = options.data || {};

  if (isAjaxAvailable()) {
    AJAXDriver.request(options, cb);
  } else {
    JSONPDriver.request(options, cb);
  }
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parser;
var legalHosts = {
  'paypal.com': 1,
  'braintreepayments.com': 1,
  'braintreegateway.com': 1,
  'braintree-api.com': 1
};

function stripSubdomains(domain) {
  return domain.split('.').slice(-2).join('.');
}

function isWhitelistedDomain(url) {
  var mainDomain;

  url = url.toLowerCase();

  if (!/^https:/.test(url)) {
    return false;
  }

  parser = parser || document.createElement('a');
  parser.href = url;
  mainDomain = stripSubdomains(parser.hostname);

  return legalHosts.hasOwnProperty(mainDomain);
}

module.exports = isWhitelistedDomain;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

function convertToBraintreeError(originalErr, btErrorObject) {
  if (originalErr instanceof BraintreeError) {
    return originalErr;
  }

  return new BraintreeError({
    type: btErrorObject.type,
    code: btErrorObject.code,
    message: btErrorObject.message,
    details: {
      originalError: originalErr
    }
  });
}

module.exports = convertToBraintreeError;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createAuthorizationData = __webpack_require__(44);
var jsonClone = __webpack_require__(123);
var constants = __webpack_require__(17);

function addMetadata(configuration, data) {
  var key;
  var attrs = data ? jsonClone(data) : {};
  var authAttrs = createAuthorizationData(configuration.authorization).attrs;
  var _meta = jsonClone(configuration.analyticsMetadata);

  attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;

  for (key in attrs._meta) {
    if (attrs._meta.hasOwnProperty(key)) {
      _meta[key] = attrs._meta[key];
    }
  }

  attrs._meta = _meta;

  if (authAttrs.tokenizationKey) {
    attrs.tokenizationKey = authAttrs.tokenizationKey;
  } else {
    attrs.authorizationFingerprint = authAttrs.authorizationFingerprint;
  }

  return attrs;
}

module.exports = addMetadata;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob = __webpack_require__(122).atob;

var apiUrls = {
  production: 'https://api.braintreegateway.com:443',
  sandbox: 'https://api.sandbox.braintreegateway.com:443'
};

function _isTokenizationKey(str) {
  return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey) {
  var tokens = tokenizationKey.split('_');
  var environment = tokens[0];
  var merchantId = tokens.slice(2).join('_');

  return {
    merchantId: merchantId,
    environment: environment
  };
}

function createAuthorizationData(authorization) {
  var parsedClientToken, parsedTokenizationKey;
  var data = {
    attrs: {},
    configUrl: ''
  };

  if (_isTokenizationKey(authorization)) {
    parsedTokenizationKey = _parseTokenizationKey(authorization);
    data.attrs.tokenizationKey = authorization;
    data.configUrl = apiUrls[parsedTokenizationKey.environment] + '/merchants/' + parsedTokenizationKey.merchantId + '/client_api/v1/configuration';
  } else {
    parsedClientToken = JSON.parse(atob(authorization));
    data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
  }

  return data;
}

module.exports = createAuthorizationData;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36).setImmediate))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN'
  },
  CLIENT_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_REQUIRED'
  },
  CLIENT_OPTION_INVALID: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_OPTION_INVALID'
  },
  CLIENT_MISSING_GATEWAY_CONFIGURATION: {
    type: BraintreeError.types.INTERNAL,
    code: 'CLIENT_MISSING_GATEWAY_CONFIGURATION',
    message: 'Missing gatewayConfiguration.'
  },
  CLIENT_INVALID_AUTHORIZATION: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_INVALID_AUTHORIZATION',
    message: 'Authorization is invalid. Make sure your client token or tokenization key is valid.'
  },
  CLIENT_GATEWAY_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_GATEWAY_NETWORK',
    message: 'Cannot contact the gateway at this time.'
  },
  CLIENT_REQUEST_TIMEOUT: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_TIMEOUT',
    message: 'Request timed out waiting for a reply.'
  },
  CLIENT_REQUEST_ERROR: {
    type: BraintreeError.types.NETWORK,
    code: 'CLIENT_REQUEST_ERROR',
    message: 'There was a problem with your request.'
  },
  CLIENT_RATE_LIMITED: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_RATE_LIMITED',
    message: 'You are being rate-limited; please try again in a few minutes.'
  },
  CLIENT_AUTHORIZATION_INSUFFICIENT: {
    type: BraintreeError.types.MERCHANT,
    code: 'CLIENT_AUTHORIZATION_INSUFFICIENT',
    message: 'The authorization used has insufficient privileges.'
  }
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (event, callback) {
  if (this._events[event]) {
    this._events[event].push(callback);
  } else {
    this._events[event] = [callback];
  }
};

EventEmitter.prototype._emit = function (event) {
  var i, args;
  var callbacks = this._events[event];

  if (!callbacks) { return; }

  args = Array.prototype.slice.call(arguments, 1);

  for (i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(null, args);
  }
};

module.exports = EventEmitter;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atob = __webpack_require__(37).atob;

module.exports = function (client) {
  var authorizationFingerprint;
  var configuration = client.getConfiguration();

  if (configuration.authorizationType !== 'TOKENIZATION_KEY') {
    authorizationFingerprint = JSON.parse(atob(configuration.authorization)).authorizationFingerprint;
    return !authorizationFingerprint || authorizationFingerprint.indexOf('customer_id=') === -1;
  }
  return true;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;

var result = {};

result[paymentOptionIDs.applePay] = __webpack_require__(130);
result[paymentOptionIDs.card] = __webpack_require__(134);
result[paymentOptionIDs.googlePay] = __webpack_require__(158);
result[paymentOptionIDs.paypal] = __webpack_require__(162);
result[paymentOptionIDs.paypalCredit] = __webpack_require__(166);
result[paymentOptionIDs.venmo] = __webpack_require__(167);

module.exports = result;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  APPLE_PAY_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_NOT_ENABLED',
    message: 'Apple Pay is not enabled for this merchant.'
  },
  APPLE_PAY_VALIDATION_URL_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_VALIDATION_URL_REQUIRED',
    message: 'performValidation must be called with a validationURL.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_NETWORK: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_NETWORK',
    message: 'A network error occurred when validating the Apple Pay merchant.'
  },
  APPLE_PAY_MERCHANT_VALIDATION_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_MERCHANT_VALIDATION_FAILED',
    message: 'Make sure you have registered your domain name in the Braintree Control Panel.'
  },
  APPLE_PAY_PAYMENT_TOKEN_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'APPLE_PAY_PAYMENT_TOKEN_REQUIRED',
    message: 'tokenize must be called with a payment token.'
  },
  APPLE_PAY_TOKENIZATION: {
    type: BraintreeError.types.NETWORK,
    code: 'APPLE_PAY_TOKENIZATION',
    message: 'A network error occurred when processing the Apple Pay payment.'
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setAttributes = __webpack_require__(140);
var defaultAttributes = __webpack_require__(141);
var assign = __webpack_require__(142);

module.exports = function createFrame(options) {
  var iframe = document.createElement('iframe');
  var config = assign({}, defaultAttributes, options);

  if (config.style && typeof config.style !== 'string') {
    assign(iframe.style, config.style);
    delete config.style;
  }

  setAttributes(iframe, config);

  if (!iframe.getAttribute('id')) {
    iframe.id = iframe.name;
  }

  return iframe;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bus = __webpack_require__(143);
var events = __webpack_require__(144);
var checkOrigin = __webpack_require__(145).checkOrigin;
var BraintreeError = __webpack_require__(1);

function BraintreeBus(options) {
  options = options || {};

  this.channel = options.channel;
  if (!this.channel) {
    throw new BraintreeError({
      type: BraintreeError.types.INTERNAL,
      code: 'MISSING_CHANNEL_ID',
      message: 'Channel ID must be specified.'
    });
  }

  this.merchantUrl = options.merchantUrl;

  this._isDestroyed = false;
  this._isVerbose = false;

  this._listeners = [];

  this._log('new bus on channel ' + this.channel, [location.href]);
}

BraintreeBus.prototype.on = function (eventName, originalHandler) {
  var namespacedEvent, args;
  var handler = originalHandler;
  var self = this;

  if (this._isDestroyed) { return; }

  if (this.merchantUrl) {
    handler = function () {
      /* eslint-disable no-invalid-this */
      if (checkOrigin(this.origin, self.merchantUrl)) {
        originalHandler.apply(this, arguments);
      }
      /* eslint-enable no-invalid-this */
    };
  }

  namespacedEvent = this._namespaceEvent(eventName);
  args = Array.prototype.slice.call(arguments);
  args[0] = namespacedEvent;
  args[1] = handler;

  this._log('on', args);
  bus.on.apply(bus, args);

  this._listeners.push({
    eventName: eventName,
    handler: handler,
    originalHandler: originalHandler
  });
};

BraintreeBus.prototype.emit = function (eventName) {
  var args;

  if (this._isDestroyed) { return; }

  args = Array.prototype.slice.call(arguments);
  args[0] = this._namespaceEvent(eventName);

  this._log('emit', args);
  bus.emit.apply(bus, args);
};

BraintreeBus.prototype._offDirect = function (eventName) {
  var args = Array.prototype.slice.call(arguments);

  if (this._isDestroyed) { return; }

  args[0] = this._namespaceEvent(eventName);

  this._log('off', args);
  bus.off.apply(bus, args);
};

BraintreeBus.prototype.off = function (eventName, originalHandler) {
  var i, listener;
  var handler = originalHandler;

  if (this._isDestroyed) { return; }

  if (this.merchantUrl) {
    for (i = 0; i < this._listeners.length; i++) {
      listener = this._listeners[i];

      if (listener.originalHandler === originalHandler) {
        handler = listener.handler;
      }
    }
  }

  this._offDirect(eventName, handler);
};

BraintreeBus.prototype._namespaceEvent = function (eventName) {
  return ['braintree', this.channel, eventName].join(':');
};

BraintreeBus.prototype.teardown = function () {
  var listener, i;

  for (i = 0; i < this._listeners.length; i++) {
    listener = this._listeners[i];
    this._offDirect(listener.eventName, listener.handler);
  }

  this._listeners.length = 0;

  this._isDestroyed = true;
};

BraintreeBus.prototype._log = function (functionName, args) {
  if (this._isVerbose) {
    console.log(functionName, args); // eslint-disable-line no-console
  }
};

BraintreeBus.events = events;

module.exports = BraintreeBus;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function useMin(isDebug) {
  return isDebug ? '' : '.min';
}

module.exports = useMin;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isAndroid(ua) {
  ua = ua || global.navigator.userAgent;
  return /Android/.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEdge = __webpack_require__(156);
var isSamsung = __webpack_require__(57);

module.exports = function isChrome(ua) {
  ua = ua || navigator.userAgent;
  return (ua.indexOf('Chrome') !== -1 || ua.indexOf('CriOS') !== -1) && !isEdge(ua) && !isSamsung(ua);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isSamsungBrowser(ua) {
  ua = ua || global.navigator.userAgent;
  return /SamsungBrowser/i.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function (win) {
  win = win || global;

  return win.document.characterSet.toLowerCase() === 'utf-8';
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browserDetection = __webpack_require__(157);

function isHidden(element) {
  if (!element) { // no parentNode, so nothing containing the element is hidden
    return false;
  }

  if (element.style.display === 'none') {
    return true;
  }

  return isHidden(element.parentNode);
}

function onTransitionEnd(element, propertyName, callback) {
  if (browserDetection.isIe9() || isHidden(element)) {
    callback();
    return;
  }

  function transitionEventListener(event) {
    if (event.propertyName === propertyName) {
      element.removeEventListener('transitionend', transitionEventListener);
      callback();
    }
  }

  element.addEventListener('transitionend', transitionEventListener);
}

module.exports = {
  onTransitionEnd: onTransitionEnd
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Promise = __webpack_require__(5);

function loadScript(container, options) {
  var script = document.createElement('script');
  var attrs = options.dataAttributes || {};

  script.src = options.src;
  script.id = options.id;
  script.async = true;

  Object.keys(attrs).forEach(function (key) {
    script.setAttribute('data-' + key, attrs[key]);
  });

  return new Promise(function (resolve) {
    script.addEventListener('load', resolve);
    container.appendChild(script);
  });
}

function loadStylesheet(options) {
  var stylesheet = document.createElement('link');
  var head = options.head || document.head;

  stylesheet.setAttribute('rel', 'stylesheet');
  stylesheet.setAttribute('type', 'text/css');
  stylesheet.setAttribute('href', options.href);
  stylesheet.setAttribute('id', options.id);

  if (head.firstChild) {
    head.insertBefore(stylesheet, head.firstChild);
  } else {
    head.appendChild(stylesheet);
  }
}

module.exports = {
  loadScript: loadScript,
  loadStylesheet: loadStylesheet
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign = __webpack_require__(10).assign;
var BaseView = __webpack_require__(9);
var btPaypal = __webpack_require__(163);
var DropinError = __webpack_require__(8);
var Promise = __webpack_require__(5);

var ASYNC_DEPENDENCY_TIMEOUT = 30000;
var READ_ONLY_CONFIGURATION_OPTIONS = ['offerCredit', 'locale'];

function BasePayPalView() {
  BaseView.apply(this, arguments);
}

BasePayPalView.prototype = Object.create(BaseView.prototype);

BasePayPalView.prototype.initialize = function () {
  var asyncDependencyTimeoutHandler;
  var isCredit = Boolean(this._isPayPalCredit);
  var setupComplete = false;
  var self = this;
  var paypalType = isCredit ? 'paypalCredit' : 'paypal';
  var paypalConfiguration = this.model.merchantConfiguration[paypalType];

  this.paypalConfiguration = assign({}, paypalConfiguration);

  this.model.asyncDependencyStarting();
  asyncDependencyTimeoutHandler = setTimeout(function () {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError('There was an error connecting to PayPal.')
    });
  }, ASYNC_DEPENDENCY_TIMEOUT);

  return btPaypal.create({client: this.client}).then(function (paypalInstance) {
    var checkoutJSConfiguration;
    var buttonSelector = '[data-braintree-id="paypal-button"]';
    var environment = self.client.getConfiguration().gatewayConfiguration.environment === 'production' ? 'production' : 'sandbox';
    var locale = self.model.merchantConfiguration.locale;

    self.paypalInstance = paypalInstance;

    self.paypalConfiguration.offerCredit = Boolean(isCredit);
    checkoutJSConfiguration = {
      env: environment,
      style: self.paypalConfiguration.buttonStyle || {},
      commit: self.paypalConfiguration.commit,
      locale: locale,
      payment: function () {
        return paypalInstance.createPayment(self.paypalConfiguration).catch(reportError);
      },
      onAuthorize: function (data) {
        return paypalInstance.tokenizePayment(data).then(function (tokenizePayload) {
          if (self.paypalConfiguration.flow === 'vault' && !self.model.isGuestCheckout) {
            tokenizePayload.vaulted = true;
          }
          self.model.addPaymentMethod(tokenizePayload);
        }).catch(reportError);
      },
      onError: reportError
    };

    if (locale) {
      self.paypalConfiguration.locale = locale;
    }

    if (isCredit) {
      buttonSelector = '[data-braintree-id="paypal-credit-button"]';
      checkoutJSConfiguration.style.label = 'credit';
    }

    return global.paypal.Button.render(checkoutJSConfiguration, buttonSelector).then(function () {
      self.model.asyncDependencyReady();
      setupComplete = true;
      clearTimeout(asyncDependencyTimeoutHandler);
    });
  }).catch(reportError);

  function reportError(err) {
    if (setupComplete) {
      self.model.reportError(err);
    } else {
      self.model.asyncDependencyFailed({
        view: self.ID,
        error: err
      });
      clearTimeout(asyncDependencyTimeoutHandler);
    }
  }
};

BasePayPalView.prototype.updateConfiguration = function (key, value) {
  if (READ_ONLY_CONFIGURATION_OPTIONS.indexOf(key) === -1) {
    this.paypalConfiguration[key] = value;
  }
};

BasePayPalView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;

  return Promise.resolve(gatewayConfiguration.paypalEnabled);
};

module.exports = BasePayPalView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  PAYPAL_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_NOT_ENABLED',
    message: 'PayPal is not enabled for this merchant.'
  },
  PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED',
    message: 'A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing for details on linking your PayPal sandbox with Braintree.'
  },
  PAYPAL_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED',
    message: 'Could not tokenize user\'s PayPal account.'
  },
  PAYPAL_FLOW_FAILED: {
    type: BraintreeError.types.NETWORK,
    code: 'PAYPAL_FLOW_FAILED',
    message: 'Could not initialize PayPal flow.'
  },
  PAYPAL_FLOW_OPTION_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_FLOW_OPTION_REQUIRED',
    message: 'PayPal flow property is invalid or missing.'
  },
  PAYPAL_POPUP_OPEN_FAILED: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_POPUP_OPEN_FAILED',
    message: 'PayPal popup failed to open, make sure to tokenize in response to a user action.'
  },
  PAYPAL_POPUP_CLOSED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'PAYPAL_POPUP_CLOSED',
    message: 'Customer closed PayPal popup before authorizing.'
  },
  PAYPAL_INVALID_PAYMENT_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'PAYPAL_INVALID_PAYMENT_OPTION',
    message: 'PayPal payment options are invalid.'
  }
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  VENMO_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_NOT_ENABLED',
    message: 'Venmo is not enabled for this merchant.'
  },
  VENMO_TOKENIZATION_REQUEST_ACTIVE: {
    type: BraintreeError.types.MERCHANT,
    code: 'VENMO_TOKENIZATION_REQUEST_ACTIVE',
    message: 'Another tokenization request is active.'
  },
  VENMO_APP_FAILED: {
    type: BraintreeError.types.UNKNOWN,
    code: 'VENMO_APP_FAILED',
    message: 'Venmo app encountered a problem.'
  },
  VENMO_APP_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_APP_CANCELED',
    message: 'Venmo app authorization was canceled.'
  },
  VENMO_CANCELED: {
    type: BraintreeError.types.CUSTOMER,
    code: 'VENMO_CANCELED',
    message: 'User canceled Venmo authorization, or Venmo app is not available.'
  }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browserDetection = __webpack_require__(170);

function isBrowserSupported(options) {
  var isAndroidChrome = browserDetection.isAndroid() && browserDetection.isChrome();
  var isIosChrome = browserDetection.isIos() && browserDetection.isChrome();
  var supportsReturnToSameTab = browserDetection.isIosSafari() || isAndroidChrome;
  var supportsReturnToNewTab = isIosChrome || browserDetection.isSamsungBrowser() || browserDetection.isMobileFirefox();

  options = options || {
    allowNewBrowserTab: true
  };

  return supportsReturnToSameTab || (options.allowNewBrowserTab && supportsReturnToNewTab);
}

module.exports = {
  isBrowserSupported: isBrowserSupported
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseView = __webpack_require__(9);
var PaymentMethodView = __webpack_require__(176);
var DropinError = __webpack_require__(8);
var classlist = __webpack_require__(13);
var errors = __webpack_require__(2).errors;
var Promise = __webpack_require__(5);

var PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING = {
  CreditCard: 'Card',
  PayPalAccount: 'PayPal',
  ApplePayCard: 'Apple Pay',
  AndroidPayCard: 'Google Pay',
  VenmoAccount: 'Venmo'
};

function PaymentMethodsView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentMethodsView.prototype = Object.create(BaseView.prototype);
PaymentMethodsView.prototype.constructor = PaymentMethodsView;
PaymentMethodsView.ID = PaymentMethodsView.prototype.ID = 'methods';

PaymentMethodsView.prototype._initialize = function () {
  var i;
  var paymentMethods = this.model.getPaymentMethods();

  this.views = [];
  this.container = this.getElementById('methods-container');
  this._headingLabel = this.getElementById('methods-label');

  this.model.on('addPaymentMethod', this._addPaymentMethod.bind(this));
  this.model.on('removePaymentMethod', this._removePaymentMethod.bind(this));
  this.model.on('changeActivePaymentMethod', this._changeActivePaymentMethodView.bind(this));

  for (i = paymentMethods.length - 1; i >= 0; i--) {
    this._addPaymentMethod(paymentMethods[i]);
  }
};

PaymentMethodsView.prototype.removeActivePaymentMethod = function () {
  if (!this.activeMethodView) {
    return;
  }
  this.activeMethodView.setActive(false);
  this.activeMethodView = null;
  classlist.add(this._headingLabel, 'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype._getPaymentMethodString = function () {
  var stringKey = PAYMENT_METHOD_TYPE_TO_TRANSLATION_STRING[this.activeMethodView.paymentMethod.type];
  var paymentMethodTypeString = this.strings[stringKey];

  return this.strings.payingWith.replace('{{paymentSource}}', paymentMethodTypeString);
};

PaymentMethodsView.prototype._addPaymentMethod = function (paymentMethod) {
  var paymentMethodView = new PaymentMethodView({
    model: this.model,
    paymentMethod: paymentMethod,
    strings: this.strings
  });

  if (this.model.isGuestCheckout && this.container.firstChild) {
    this.container.removeChild(this.container.firstChild);
    this.views.pop();
  }

  if (this.container.firstChild) {
    this.container.insertBefore(paymentMethodView.element, this.container.firstChild);
  } else {
    this.container.appendChild(paymentMethodView.element);
  }

  this.views.push(paymentMethodView);
};

PaymentMethodsView.prototype._removePaymentMethod = function (paymentMethod) {
  var i;

  for (i = 0; i < this.views.length; i++) {
    if (this.views[i].paymentMethod === paymentMethod) {
      this.container.removeChild(this.views[i].element);
      this._headingLabel.innerHTML = '&nbsp;';
      this.views.splice(i, 1);
      break;
    }
  }
};

PaymentMethodsView.prototype._changeActivePaymentMethodView = function (paymentMethod) {
  var i;
  var previousActiveMethodView = this.activeMethodView;

  for (i = 0; i < this.views.length; i++) {
    if (this.views[i].paymentMethod === paymentMethod) {
      this.activeMethodView = this.views[i];
      this._headingLabel.innerHTML = this._getPaymentMethodString();
      break;
    }
  }

  if (previousActiveMethodView) {
    previousActiveMethodView.setActive(false);
  }
  this.activeMethodView.setActive(true);
  classlist.remove(this._headingLabel, 'braintree-no-payment-method-selected');
};

PaymentMethodsView.prototype.requestPaymentMethod = function () {
  if (!this.activeMethodView) {
    return Promise.reject(new DropinError(errors.NO_PAYMENT_METHOD_ERROR));
  }
  return Promise.resolve(this.activeMethodView.paymentMethod);
};

module.exports = PaymentMethodsView;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(14);
var addSelectionEventHandler = __webpack_require__(29);
var BaseView = __webpack_require__(9);

var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;

var paymentMethodOptionHTML = "<div class=\"braintree-option__logo\">\n  <svg width=\"48\" height=\"29\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-option__label\" aria-label=\"@OPTION_LABEL\">\n  @OPTION_TITLE\n  <div class=\"braintree-option__disabled-message\"></div>\n</div>\n";

function PaymentOptionsView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentOptionsView.prototype = Object.create(BaseView.prototype);
PaymentOptionsView.prototype.constructor = PaymentOptionsView;
PaymentOptionsView.ID = PaymentOptionsView.prototype.ID = 'options';

PaymentOptionsView.prototype._initialize = function () {
  this.container = this.getElementById('payment-options-container');
  this.elements = {};

  this.model.supportedPaymentOptions.forEach(function (paymentOptionID) {
    this._addPaymentOption(paymentOptionID);
  }.bind(this));
};

PaymentOptionsView.prototype._addPaymentOption = function (paymentOptionID) {
  var paymentSource;
  var div = document.createElement('div');
  var html = paymentMethodOptionHTML;
  var clickHandler = function clickHandler() {
    this.mainView.setPrimaryView(paymentOptionID);
    this.model.selectPaymentOption(paymentOptionID);
    analytics.sendEvent(this.client, 'selected.' + paymentOptionIDs[paymentOptionID]);
  }.bind(this);

  div.className = 'braintree-option braintree-option__' + paymentOptionID;
  div.setAttribute('tabindex', '0');

  switch (paymentOptionID) {
    case paymentOptionIDs.applePay:
      paymentSource = this.strings['Apple Pay'];
      html = html.replace(/@ICON/g, 'logoApplePay');
      break;
    case paymentOptionIDs.card:
      paymentSource = this.strings.Card;
      html = html.replace(/@ICON/g, 'iconCardFront');
      html = html.replace(/@CLASSNAME/g, 'braintree-icon--bordered');
      break;
    case paymentOptionIDs.googlePay:
      paymentSource = this.strings['Google Pay'];
      html = html.replace(/@ICON/g, 'logoGooglePay');
      break;
    case paymentOptionIDs.paypal:
      paymentSource = this.strings.PayPal;
      html = html.replace(/@ICON/g, 'logoPayPal');
      break;
    case paymentOptionIDs.paypalCredit:
      paymentSource = this.strings['PayPal Credit'];
      html = html.replace(/@ICON/g, 'logoPayPalCredit');
      break;
    case paymentOptionIDs.venmo:
      paymentSource = this.strings.Venmo;
      html = html.replace(/@ICON/g, 'logoVenmo');
      break;
    default:
      break;
  }

  html = html.replace(/@OPTION_LABEL/g, this._generateOptionLabel(paymentSource));
  html = html.replace(/@OPTION_TITLE/g, paymentSource);
  html = html.replace(/@CLASSNAME/g, '');

  div.innerHTML = html;

  addSelectionEventHandler(div, clickHandler);

  this.container.appendChild(div);
  this.elements[paymentOptionID] = {
    div: div,
    clickHandler: clickHandler
  };
};

PaymentOptionsView.prototype._generateOptionLabel = function (paymentSourceString) {
  return this.strings.payingWith.replace('{{paymentSource}}', paymentSourceString);
};

module.exports = PaymentOptionsView;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;

    return v.toString(16);
  });
}

module.exports = uuid;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);

module.exports = {
  THREEDS_AUTHENTICATION_IN_PROGRESS: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_AUTHENTICATION_IN_PROGRESS',
    message: 'Cannot call verifyCard while existing authentication is in progress.'
  },
  THREEDS_MISSING_VERIFY_CARD_OPTION: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_MISSING_VERIFY_CARD_OPTION'
  },
  THREEDS_NO_VERIFICATION_PAYLOAD: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NO_VERIFICATION_PAYLOAD',
    message: 'No verification payload available.'
  },
  THREEDS_NOT_ENABLED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_NOT_ENABLED',
    message: '3D Secure is not enabled for this merchant.'
  },
  THREEDS_CAN_NOT_USE_TOKENIZATION_KEY: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_CAN_NOT_USE_TOKENIZATION_KEY',
    message: '3D Secure can not use a tokenization key for authorization.'
  },
  THREEDS_HTTPS_REQUIRED: {
    type: BraintreeError.types.MERCHANT,
    code: 'THREEDS_HTTPS_REQUIRED',
    message: '3D Secure requires HTTPS.'
  },
  THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
    type: BraintreeError.types.INTERNAL,
    code: 'THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN',
    message: 'Term Url must be on a Braintree domain.'
  }
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(70);
module.exports = __webpack_require__(213);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(71);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('cart-checkout', __webpack_require__(96));
Vue.component('product-checkout', __webpack_require__(99));
Vue.component('braintree-checkout', __webpack_require__(102));

document.addEventListener('turbolinks:load', function () {
  var app = new Vue({
    el: '#app'
  });
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_turbolinks__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_turbolinks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_turbolinks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_turbolinks__ = __webpack_require__(95);
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__(72);

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * User Libraries
 */


__WEBPACK_IMPORTED_MODULE_0_turbolinks___default.a.start();

window.Vue = __webpack_require__(93);


Vue.use(__WEBPACK_IMPORTED_MODULE_1_vue_turbolinks__["a" /* default */]);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(73);

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var bind = __webpack_require__(30);
var Axios = __webpack_require__(75);
var defaults = __webpack_require__(24);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(35);
axios.CancelToken = __webpack_require__(89);
axios.isCancel = __webpack_require__(34);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(90);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(24);
var utils = __webpack_require__(6);
var InterceptorManager = __webpack_require__(84);
var dispatchRequest = __webpack_require__(85);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(33);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);
var transformData = __webpack_require__(86);
var isCancel = __webpack_require__(34);
var defaults = __webpack_require__(24);
var isAbsoluteURL = __webpack_require__(87);
var combineURLs = __webpack_require__(88);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(6);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(35);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Turbolinks 5.1.1
Copyright © 2018 Basecamp, LLC
 */
(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.SnapshotRenderer=function(r){function n(t,r,n){this.currentSnapshot=t,this.newSnapshot=r,this.isPreview=n,this.currentHeadDetails=new e.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new e.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(n,r),n.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(e.Renderer)}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),
this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"=="function"&&__webpack_require__(92)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);

/***/ }),
/* 92 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
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
 * Check if value is primitive
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
 * Get the raw type string of a value e.g. [object Object]
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

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
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
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
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
 * Check whether the object has the property.
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
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

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

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

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

var SSR_ATTR = 'data-server-rendered';

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
  'errorCaptured'
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
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

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
var bailRE = /[^\w.$]/;
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

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
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
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
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
  _Set = (function () {
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
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
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
      while (vm) {
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
        tree.push(vm);
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
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
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
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
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
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
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
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
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
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
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
function defineReactive (
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

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
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
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
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
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
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
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
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
      "development" !== 'production' && warn(
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
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
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
    "development" !== 'production' && assertObjectType(key, childVal, vm);
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
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
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
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
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
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
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
  if ("development" !== 'production' && warnMissing && !res) {
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
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
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
  if ("development" !== 'production' && isObject(def)) {
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
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
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

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
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
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
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
/* globals MessageChannel */

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

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
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
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

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
      perf.clearMeasures(name);
    };
  }
}

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

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

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
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
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
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
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

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
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
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
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

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
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
  return res
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
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
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

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
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
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
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
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
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
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
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
      (slots.default || (slots.default = [])).push(child);
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

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

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
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
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

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
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
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
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
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
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
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
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
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
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

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
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
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
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
    if (vm._watcher === watcher && vm._isMounted) {
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
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
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
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
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
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
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
  observerState.shouldConvert = isRoot;
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
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
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
      "development" !== 'production' && warn(
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
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
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
    if ("development" !== 'production' && getter == null) {
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
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
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
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
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
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
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
  keyOrFn,
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
  return vm.$watch(keyOrFn, handler, options)
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
    dataDef.set = function (newData) {
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
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
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
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
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
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
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
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
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

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
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
      "development" !== 'production' && warn(
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
        if (!(key in hash)) {
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
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
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
      "development" !== 'production' && warn(
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
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
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
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
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
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
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
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

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

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
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
    "development" !== 'production' && warn(
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
  if ("development" !== 'production' &&
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
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
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
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
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
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
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
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

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

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
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

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
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
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
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
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

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
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

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
    if ("development" !== 'production' && name) {
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
        if ("development" !== 'production' && type === 'component') {
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
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
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
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

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

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

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

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

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

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

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

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(36).setImmediate))

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(31)))

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function handleVueDestructionOn(turbolinksEvent, vue) {
  document.addEventListener(turbolinksEvent, function teardown() {
    vue.$destroy();
    document.removeEventListener(turbolinksEvent, teardown);
  });
}

function plugin(Vue, options) {
  // Install a global mixin
  Vue.mixin({

    beforeMount: function() {
      // If this is the root component, we want to cache the original element contents to replace later
      // We don't care about sub-components, just the root
      if (this == this.$root) {
        handleVueDestructionOn('turbolinks:visit', this);
        this.$originalEl = this.$el.outerHTML;
      }
    },

    destroyed: function() {
      // We only need to revert the html for the root component
      if (this == this.$root && this.$el) {
        this.$el.outerHTML = this.$originalEl;
      }
    }
  })
};

/* harmony default export */ __webpack_exports__["a"] = (plugin);


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(25)
/* script */
var __vue_script__ = __webpack_require__(97)
/* template */
var __vue_template__ = __webpack_require__(98)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/CartCheckout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-569b6b3d", Component.options)
  } else {
    hotAPI.reload("data-v-569b6b3d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['email', 'totalPrice'],
    data: function data() {
        return {
            processing: false,
            stripeHandler: null
        };
    },
    created: function created() {
        this.stripeHandler = this.initStripe();
    },

    methods: {
        initStripe: function initStripe() {
            var handler = StripeCheckout.configure({
                key: App.stripeKey
            });

            window.addEventListener('popstate', function () {
                handler.close();
            });

            return handler;
        },
        order: function order() {
            this.stripeHandler.open({
                name: 'Bazar',
                description: 'Your order',
                currency: 'usd',
                email: this.email,
                allowRememberMe: false,
                panelLabel: 'Pay {{amount}}',
                amount: parseInt(this.totalPrice),
                token: this.purchaseItems
            });
        },
        purchaseItems: function purchaseItems(token) {
            var _this = this;

            this.processing = true;
            axios.post('/orders/store', { email: token.email, payment_token: token.id }).then(function (response) {
                Turbolinks.visit('/orders/' + response.data.confirmation_number);
            }).catch(function (error) {
                alert(error.response.data);
                _this.processing = false;
            });
        }
    },
    computed: {
        totalPriceInDollars: function totalPriceInDollars() {
            return (this.totalPrice / 100).toFixed(2);
        }
    }
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "form",
      {
        on: {
          submit: function($event) {
            $event.preventDefault()
            _vm.order($event)
          }
        }
      },
      [
        _c("button", { attrs: { type: "submit", disabled: _vm.processing } }, [
          _vm._v("Order for " + _vm._s(_vm.totalPriceInDollars) + " $")
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-569b6b3d", module.exports)
  }
}

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(25)
/* script */
var __vue_script__ = __webpack_require__(100)
/* template */
var __vue_template__ = __webpack_require__(101)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/ProductCheckout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ad277ee", Component.options)
  } else {
    hotAPI.reload("data-v-3ad277ee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['productId', 'productPrice', 'userEmail'],
    data: function data() {
        return {
            quantity: 1,
            processing: false,
            stripeHandler: null
        };
    },
    created: function created() {
        this.stripeHandler = this.initStripe();
    },

    methods: {
        initStripe: function initStripe() {
            var handler = StripeCheckout.configure({
                key: App.stripeKey
            });

            window.addEventListener('popstate', function () {
                handler.close();
            });

            return handler;
        },
        order: function order() {
            this.stripeHandler.open({
                name: 'Bazar',
                description: 'Your order',
                currency: 'usd',
                email: this.userEmail,
                allowRememberMe: false,
                panelLabel: 'Pay {{amount}}',
                amount: this.totalPrice,
                token: this.purchaseItems
            });
        },
        purchaseItems: function purchaseItems(token) {
            var _this = this;

            this.processing = true;
            axios.post('/orders/store/' + this.productId, { email: token.email, quantity: this.quantity, payment_token: token.id }).then(function (response) {
                Turbolinks.visit('/orders/' + response.data.confirmation_number);
            }).catch(function (error) {
                alert(error.response.data);
                _this.processing = false;
            });
        },
        addToCart: function addToCart() {
            this.processing = true;
            axios.post('/products/' + this.productId + '/add', { quantity: this.quantity }).then(function (response) {
                alert(response.data);
            }).catch(function (error) {
                alert(error.response.data);
            });
            this.processing = false;
        }
    },
    computed: {
        totalPrice: function totalPrice() {
            return this.quantity * this.productPrice;
        },
        totalPriceInDollars: function totalPriceInDollars() {
            return (this.totalPrice / 100).toFixed(2);
        }
    }
});

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "form",
      {
        on: {
          submit: function($event) {
            $event.preventDefault()
            _vm.order($event)
          }
        }
      },
      [
        _c(
          "label",
          {
            staticClass:
              "uppercase tracking-wide text-teal-light text-sm font-bold mb-2",
            attrs: { for: "quantity" }
          },
          [_vm._v("\n            Quantity\n        ")]
        ),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.quantity,
              expression: "quantity"
            }
          ],
          staticClass:
            "appearance-none w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-2 mb-6",
          attrs: {
            id: "quantity",
            type: "number",
            name: "quantity",
            min: "1",
            required: ""
          },
          domProps: { value: _vm.quantity },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.quantity = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass:
              "bg-teal hover:bg-teal-dark text-white py-4 px-4 w-full rounded mb-4",
            attrs: { type: "submit", disabled: _vm.processing }
          },
          [
            _vm._v(
              "Order " +
                _vm._s(_vm.quantity) +
                " for " +
                _vm._s(_vm.totalPriceInDollars) +
                " $"
            )
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass:
          "bg-blue hover:bg-blue-dark text-white py-4 px-4 w-full rounded",
        attrs: { disabled: _vm.processing },
        on: { click: _vm.addToCart }
      },
      [_vm._v("Add " + _vm._s(_vm.quantity) + " to Cart")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3ad277ee", module.exports)
  }
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(25)
/* script */
var __vue_script__ = __webpack_require__(103)
/* template */
var __vue_template__ = __webpack_require__(212)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/BraintreeCheckout.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d5ddda5a", Component.options)
  } else {
    hotAPI.reload("data-v-d5ddda5a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_braintree_web_drop_in__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_braintree_web_drop_in___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_braintree_web_drop_in__);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['totalPrice'],
    data: function data() {
        return {
            processing: false,
            instance: null
        };
    },
    mounted: function mounted() {
        var _this = this;

        new __WEBPACK_IMPORTED_MODULE_0_braintree_web_drop_in___default.a.create({
            authorization: 'sandbox_qcx9kppr_pprzfnybxxn993w5',
            container: '#dropin-container'
        }, function (createErr, instance) {
            _this.instance = instance;
        });
    },

    methods: {
        order: function order() {
            var _this2 = this;

            this.processing = true;

            this.instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
                axios.post('/orders/store', { email: 'epa@gmail.com', payment_token: payload.nonce }).then(function (response) {
                    Turbolinks.visit('/orders/' + response.data.confirmation_number);
                }).catch(function (error) {
                    alert(error.response.data);
                    _this2.processing = false;
                });
            });
        }
    },
    computed: {
        totalPriceInDollars: function totalPriceInDollars() {
            return (this.totalPrice / 100).toFixed(2);
        }
    }
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module braintree-web-drop-in
 * @description There are two ways to integrate Drop-in into your page: a script tag integration and a JavaScript integration using [`dropin.create`](#.create).
 *
 * The script tag integration is the fastest way to integrate. All you need to do is add the Drop-in script inside your form element where you want Drop-in to appear and include a `data-braintree-dropin-authorization` property with your [tokenization key](https://developers.braintreepayments.com/guides/authorization/tokenization-key/javascript/v3) or [client token](https://developers.braintreepayments.com/guides/authorization/client-token).
 *
 * When your form is submitted, Drop-in will intercept the form submission and attempt to tokenize the payment method. If the tokenization is successful, it will insert the payment method nonce into a hidden input with the name `payment_method_nonce` and then submit your form. If the tokenization is unsuccessful, a relevant error will be shown in the UI.
 *
 * If you have data collector enabled, the device data will be injected into a hidden input with the name `device_data` before form submission.
 *
 * Specify creation options as data attributes in your script tag, as shown in the examples below. The following configuration properties may be set:
 *
 * * `data-locale`
 * * `data-card.cardholder-name.required`
 * * `data-payment-option-priority`
 * * `data-data-collector.kount`
 * * `data-data-collector.paypal`
 * * `data-paypal.amount`
 * * `data-paypal.currency`
 * * `data-paypal.flow`
 * * `data-paypal-credit.amount`
 * * `data-paypal-credit.currency`
 * * `data-paypal-credit.flow`
 *
 * For more control and customization, use [`dropin.create` instead](#.create).
 *
 * See our [demo app](../../script-tag-integration.html) for an example of using our script tag integration.
 *
 * @example
 * <caption>A full example accepting only cards</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *        data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *       ></script>
 *       <input type="submit" value="Purchase"></input>
 *     </form>
 *   </body>
 * </html>
 *
 * @example
 * <caption>A full example accepting cards, PayPal, and PayPal credit</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *        data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *        data-paypal.flow="checkout"
 *        data-paypal.amount="10.00"
 *        data-paypal.currency="USD"
 *        data-paypal-credit.flow="vault"
 *       ></script>
 *       <input type="submit" value="Purchase"></input>
 *     </form>
 *   </body>
 * </html>
 *
 * @example
 * <caption>Specifying a locale and payment option priority</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-locale="de_DE"
 *    data-payment-option-priority='["paypal","card", "paypalCredit"]'
 *    data-paypal.flow="checkout"
 *    data-paypal.amount="10.00"
 *    data-paypal.currency="USD"
 *    data-paypal-credit.flow="vault"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 *
 * @example
 * <caption>Including an optional cardholder name field in card form</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-card.cardholder-name.required="false"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 *
 * @example
 * <caption>Including a required cardholder name field in card form</caption>
 * <form id="payment-form" action="/" method="post">
 *   <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"
 *    data-braintree-dropin-authorization="CLIENT_AUTHORIZATION"
 *    data-card.cardholder-name.required="true"
 *   ></script>
 *   <input type="submit" value="Purchase"></input>
 * </form>
 */

var Dropin = __webpack_require__(105);
var client = __webpack_require__(38);
var createFromScriptTag = __webpack_require__(209);
var constants = __webpack_require__(2);
var analytics = __webpack_require__(14);
var DropinError = __webpack_require__(8);
var Promise = __webpack_require__(5);
var wrapPromise = __webpack_require__(3);

var VERSION = "1.10.0";

/**
 * @typedef {object} cardCreateOptions The configuration options for cards. Internally, Drop-in uses [Hosted Fields](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html) to render the card form. The `overrides.fields` and `overrides.styles` allow the Hosted Fields to be customized.
 *
 * @param {boolean|object} [cardholderName] Will enable a cardholder name field above the card number field. If set to an object, you can specify whether or not the field is required. If set to a `true`, it will default the field to being present, but not required.
 * @param {boolean} [cardholderName.required=false] When true, the cardholder name field will be required to request the payment method nonce.
 * @param {object} [overrides.fields] The Hosted Fields [`fields` options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html#~fieldOptions). Only `number`, `cvv`, `expirationDate` and `postalCode` can be configured. Each is a [Hosted Fields `field` object](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html#~field). `selector` cannot be modified.
 * @param {object} [overrides.styles] The Hosted Fields [`styles` options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/module-braintree-web_hosted-fields.html#~styleOptions).
 */

/**
 * @typedef {object} dataCollectorOptions The configuration options for Data Collector. Requires [advanced fraud protection](https://developers.braintreepayments.com/guides/advanced-fraud-tools/client-side/javascript/v3) to be enabled in the Braintree gateway. Contact our [support team](https://developers.braintreepayments.com/forms/contact) to configure your Kount ID. The device data will be included on the {@link Dropin#requestPaymentMethod|requestPaymentMethod payload}.
 *
 * @param {boolean} [kount] If true, Kount fraud data collection is enabled. Required if `paypal` parameter is not used.
 * @param {boolean} [paypal] If true, PayPal fraud data collection is enabled. Required if `kount` parameter is not used.
 */

/**
 * @typedef {object} threeDSecureOptions The configuration options for 3D Secure. Requires [3D Secure](https://developers.braintreepayments.com/guides/3d-secure/overview) to be enabled in the Braintree gateway. The liability shift information will be included on the {@link Dropin#requestPaymentMethod|requestPaymentMethod payload}.
 *
 * @param {string} amount The amount to verify with 3D Secure.
 */

/** @typedef {object} paypalCreateOptions The configuration options for PayPal and PayPalCredit. For a full list of options see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#createPayment).
 *
 * @param {string} flow Either `checkout` for a one-time [Checkout with PayPal](https://developers.braintreepayments.com/guides/paypal/checkout-with-paypal/javascript/v3) flow or `vault` for a [Vault flow](https://developers.braintreepayments.com/guides/paypal/vault/javascript/v3). Required when using PayPal or PayPal Credit.
 * @param {string|number} [amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [currency] The currency code of the amount, such as `USD`. Required when using the Checkout flow.
 * @param {string} [buttonStyle] The style object to apply to the PayPal button. Button customization includes color, shape, size, and label. The options [found here](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/customize-button/#button-styles) are available.
 * @param {boolean} [commit] The user action to show on the PayPal review page. If true, a `Pay Now` button will be shown. If false, a `Continue` button will be shown.
 */

/** @typedef {object} applePayCreateOptions The configuration options for Apple Pay.
 *
 * @param {string} [buttonStyle=black] Configures the Apple Pay button style. Valid values are `black`, `white`, `white-outline`.
 * @param {string} displayName The canonical name for your store. Use a non-localized name. This parameter should be a UTF-8 string that is a maximum of 128 characters. The system may display this name to the user.
 * @param {external:ApplePayPaymentRequest} paymentRequest The payment request details to apply on top of those from Braintree.
 */

/** @typedef {object} googlePayCreateOptions The configuration options for Google Pay. Additional options from the few listed here are available, many have default values applied based on the settings found in the Braintree Gateway. For more information, see [Google's Documentation](https://developers.google.com/pay/api/web/object-reference#request-objects).
 *
 * @param {string} merchantId The ID provided by Google for processing transactions in production. Not necessary for testing in sandbox.
 * @param {external:GooglePayTransactionInfo} transactionInfo The transaction details necessary for processing the payment.
 */

/**
 * @typedef {object} ApplePayPaymentRequest An [Apple Pay Payment Request object](https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest).
 * @external ApplePayPaymentRequest
 * @see {@link https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest PaymentRequest}
 */

/**
 * @typedef {object} GooglePayTransactionInfo A [Google Pay TransactionInfo object](https://developers.google.com/pay/api/web/object-reference#TransactionInfo).
 * @external GooglePayTransactionInfo
 * @see {@link https://developers.google.com/pay/api/web/object-reference#TransactionInfo TransactionInfo}
 */

/** @typedef {object|boolean} venmoCreateOptions The configuration options for Venmo. If `true` is passed instead of a configuration object, the default settings listed will be used.
 *
 * @param {boolean} [allowNewBrowserTab=true] If false, it restricts supported browsers to those that can app switch to the Venmo app without opening a new tab.
 */

/**
 * @static
 * @function create
 * @description This function is the entry point for `braintree.dropin`. It is used for creating {@link Dropin} instances.
 * @param {object} options Object containing all {@link Dropin} options:
 * @param {string} options.authorization A [tokenization key](https://developers.braintreepayments.com/guides/authorization/tokenization-key/javascript/v3) or a [client token](https://developers.braintreepayments.com/guides/authorization/client-token). If authorization is a client token created with a [customer ID](https://developers.braintreepayments.com/guides/drop-in/javascript/v3#customer-id), Drop-in will render saved payment methods and automatically store any newly-added payment methods in their Vault record.
 * @param {string|HTMLElement} options.container A reference to an empty element, such as a `<div>`, where Drop-in will be included on your page or the selector for the empty element. e.g. `#dropin-container`.
 * @param {string} options.selector Deprecated: Now an alias for `options.container`.
 * @param {string} [options.locale=`en_US`] Use this option to change the language, links, and terminology used throughout Drop-in. Supported locales include:
 * `da_DK`,
 * `de_DE`,
 * `en_AU`,
 * `en_GB`,
 * `en_US`,
 * `es_ES`,
 * `fr_CA`,
 * `fr_FR`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * `zh_TW`.
 *
 * @param {object} [options.translations] To use your own translations, pass an object with the strings you wish to replace. This object must use the same structure as the object used internally for supported translations, which can be found [here](https://github.com/braintree/braintree-web-drop-in/blob/master/src/translations/en_US.js). Any strings that are not included will be those from the provided `locale` or `en_US` if no `locale` is provided. See below for an example of creating Drop-in with custom translations.
 * @param {array} [options.paymentOptionPriority] Use this option to indicate the order in which enabled payment options should appear when multiple payment options are enabled. By default, payment options will appear in this order: `['card', 'paypal', 'paypalCredit', 'venmo', 'applePay']`. Payment options omitted from this array will not be offered to the customer.
 *
 * @param {object} [options.card] The configuration options for cards. See [`cardCreateOptions`](#~cardCreateOptions) for all `card` options. If this option is omitted, cards will still appear as a payment option. To remove cards as a payment option, use `paymentOptionPriority`.
 * @param {object} [options.paypal] The configuration options for PayPal. To include a PayPal option in your Drop-in integration, include the `paypal` parameter and [enable PayPal in the Braintree Control Panel](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#go-live). To test in Sandbox, you will need to [link a PayPal sandbox test account to your Braintree sandbox account](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#linked-paypal-testing).
 *
 * Some of the PayPal configuration options are listed [here](#~paypalCreateOptions), but for a full list see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#createPayment).
 *
 * @param {object} [options.paypalCredit] The configuration options for PayPal Credit. To include a PayPal Credit option in your Drop-in integration, include the `paypalCredit` parameter and [enable PayPal in the Braintree Control Panel](https://developers.braintreepayments.com/guides/paypal/testing-go-live/#go-live).
 *
 * Some of the PayPal Credit configuration options are listed [here](#~paypalCreateOptions), but for a full list see the [PayPal Checkout client reference options](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#createPayment). For more information on PayPal Credit, see the [Braintree Developer Docs](https://developers.braintreepayments.com/guides/paypal/paypal-credit/javascript/v3).
 *
 * @param {object|boolean} [options.venmo] The configuration options for Pay with Venmo. To include a Venmo option in your Drop-in integration, include the `venmo` parameter and [follow the documentation for setting up Venmo in the Braintree control panel](https://articles.braintreepayments.com/guides/payment-methods/venmo#setup). If a user's browser does not support Venmo, the Venmo option will not be rendered.
 *
 * See [`venmoCreateOptions`](#~venmoCreateOptions) for `venmo` options.
 *
 * @param {object} [options.applePay] The configuration options for Apple Pay. To include an Apple Pay option in your Drop-in integration, include the `applePay` parameter and [enable Apple Pay in the Braintree Control Panel](https://developers.braintreepayments.com/guides/apple-pay/configuration/javascript/v3). If a user's browser does not support Apple Pay, the Apple Pay option will not be rendered. See [Apple's documentation](https://support.apple.com/en-us/HT201469) for browser and device support.
 *
 * See [`applePayCreateOptions`](#~applePayCreateOptions) for `applePay` options.
 *
 * @param {object} [options.googlePay] The configuration options for Google Pay. To include a Google Pay option in your Drop-in integration, include the `googlePay` parameter and [enable Google Pay in the Braintree Control Panel](https://developers.braintreepayments.com/guides/google-pay/configuration/javascript/v3). If a user's browser does not support Google Pay, the Google Pay option will not be rendered. See [Google's documentation](https://developers.google.com/pay/api/web/test-and-deploy) for browser and device support.
 *
 * See [`googlePayCreateOptions`](#~googlePayCreateOptions) for `googlePay` options.
 *
 * @param {object} [options.dataCollector] The configuration options for data collector. See [`dataCollectorOptions`](#~dataCollectorOptions) for all `dataCollector` options. If Data Collector is configured and fails to load, Drop-in creation will fail.
 *
 * @param {object} [options.threeDSecure] The configuration options for 3D Secure. See [`threeDSecureOptions`](#~threeDSecureOptions) for all `threeDSecure` options. If 3D Secure is configured and fails to load, Drop-in creation will fail.
 *
 * @param {object} [options.dataCollector] The configuration options for data collector. See [`dataCollectorOptions`](#~dataCollectorOptions) for all `dataCollector` options. If Data Collector is configured and fails to load, Drop-in creation will fail.
 *
 * @param {boolean} [options.preselectVaultedPaymentMethod=true] Whether or not to initialize Drop-in with a vaulted payment method pre-selected. Only applicable when using a [client token with a customer id](https://developers.braintreepayments.com/reference/request/client-token/generate/#customer_id) and a customer with saved payment methods.
 *
 * @param {function} [callback] The second argument, `data`, is the {@link Dropin} instance. Returns a promise if no callback is provided.
 * @returns {void|Promise} Returns a promise if no callback is provided.
 * @example
 * <caption>A full example of accepting credit cards with callback API</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <div id="dropin-container"></div>
 *     <button id="submit-button">Purchase</button>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"></script>
 *
 *     <script>
 *       var submitButton = document.querySelector('#submit-button');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }, function (err, dropinInstance) {
 *         if (err) {
 *           // Handle any errors that might've occurred when creating Drop-in
 *           console.error(err);
 *           return;
 *         }
 *         submitButton.addEventListener('click', function () {
 *           dropinInstance.requestPaymentMethod(function (err, payload) {
 *             if (err) {
 *               // Handle errors in requesting payment method
 *             }
 *
 *             // Send payload.nonce to your server
 *           });
 *         });
 *       });
 *     </script>
 *   </body>
 * </html>
 * @example
 * <caption>A full example of accepting credit cards with promise API</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <div id="dropin-container"></div>
 *     <button id="submit-button">Purchase</button>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"></script>
 *
 *     <script>
 *       var submitButton = document.querySelector('#submit-button');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }).then(function (dropinInstance) {
 *         submitButton.addEventListener('click', function () {
 *           dropinInstance.requestPaymentMethod().then(function (payload) {
 *             // Send payload.nonce to your server
 *           }).catch(function (err) {
 *             // Handle errors in requesting payment method
 *           });
 *         });
 *       }).catch(function (err) {
 *         // Handle any errors that might've occurred when creating Drop-in
 *         console.error(err);
 *       });
 *     </script>
 *   </body>
 * </html>
 * @example
 * <caption>Setting up a Drop-in instance to accept credit cards, PayPal, PayPal Credit, Venmo, and Apple Pay</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   applePay: {
 *     displayName: 'Merchant Name',
 *     paymentRequest: {
   *     label: 'Localized Name',
 *       total: '10.00'
 *     }
 *   },
 *   paypal: {
 *     flow: 'checkout',
 *     amount: '10.00',
 *     currency: 'USD'
 *   },
 *  paypalCredit: {
 *    flow: 'checkout',
 *    amount: '10.00',
 *    currency: 'USD'
 *   },
 *   venmo: true
 * }, function (err, dropinInstance) {
 *   // Set up a handler to request a payment method and
 *   // submit the payment method nonce to your server
 * });
 * @example
 * <caption>Setting up a Drop-in instance to accept Venmo with restricted browser support</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   venmo: {
 *     allowNewBrowserTab: false
 *   }
 * }, function (err, dropinInstance) {
 *   // Set up a handler to request a payment method and
 *   // submit the payment method nonce to your server
 * });
 *
 * @example
 * <caption>Submitting the payment method nonce to the server using a form</caption>
 * <!DOCTYPE html>
 * <html lang="en">
 *   <head>
 *     <meta charset="UTF-8">
 *     <title>Checkout</title>
 *   </head>
 *   <body>
 *     <form id="payment-form" action="/" method="post">
 *       <div id="dropin-container"></div>
 *       <input type="submit" value="Purchase"></input>
 *       <input type="hidden" id="nonce" name="payment_method_nonce"></input>
 *     </form>
 *
 *     <script src="https://js.braintreegateway.com/web/dropin/{@pkg version}/js/dropin.min.js"></script>
 *
 *     <script>
 *       var form = document.querySelector('#payment-form');
 *       var nonceInput = document.querySelector('#nonce');
 *
 *       braintree.dropin.create({
 *         authorization: 'CLIENT_AUTHORIZATION',
 *         container: '#dropin-container'
 *       }, function (err, dropinInstance) {
 *         if (err) {
 *           // Handle any errors that might've occurred when creating Drop-in
 *           console.error(err);
 *           return;
 *         }
 *         form.addEventListener('submit', function (event) {
 *           event.preventDefault();
 *
 *           dropinInstance.requestPaymentMethod(function (err, payload) {
 *             if (err) {
 *               // Handle errors in requesting payment method
 *               return;
 *             }
 *
 *             // Send payload.nonce to your server
 *             nonceInput.value = payload.nonce;
 *             form.submit();
 *           });
 *         });
 *       });
 *     </script>
 *   </body>
 * </html>
 *
 * @example
 * <caption>Use your own translations</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   translations: {
 *     payingWith: 'You are paying with {{paymentSource}}',
 *     chooseAnotherWayToPay: 'My custom chooseAnotherWayToPay string',
 *     // Any other custom translation strings
 *   }
 * }, callback);
 *
 * @example
 * <caption>Customizing Drop-in with card form overrides</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     overrides: {
 *       fields: {
 *         number: {
 *           placeholder: '1111 1111 1111 1111' // Update the number field placeholder
 *         },
 *         postalCode: {
 *           minlength: 5 // Set the minimum length of the postal code field
 *         },
 *         cvv: null // Remove the CVV field from your form
 *       },
 *       styles: {
 *         input: {
 *           'font-size': '18px' // Change the font size for all inputs
 *         },
 *         ':focus': {
 *           color: 'red' // Change the focus color to red for all inputs
 *         }
 *       }
 *     }
 *   }
 * }, callback);
 *
 * @example
 * <caption>Including a cardholder name field</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     cardholderName: true
 *   }
 * }, callback);
 *
 * @example
 * <caption>Including a required cardholder name field</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   card: {
 *     cardholderName: {
 *       required: true
 *     }
 *   }
 * }, callback);
 *
 * @example
 * <caption>Enabling 3D Secure</caption>
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container',
 *   threeDSecure: {
 *     amount: '10.00'
 *   }
 * }, callback);
 */

function create(options) {
  if (!options.authorization) {
    return Promise.reject(new DropinError('options.authorization is required.'));
  }

  return client.create({
    authorization: options.authorization
  }).catch(function (err) {
    return Promise.reject(new DropinError({
      message: 'There was an error creating Drop-in.',
      braintreeWebError: err
    }));
  }).then(function (clientInstance) {
    clientInstance = setAnalyticsIntegration(clientInstance);

    if (clientInstance.getConfiguration().authorizationType === 'TOKENIZATION_KEY') {
      analytics.sendEvent(clientInstance, 'started.tokenization-key');
    } else {
      analytics.sendEvent(clientInstance, 'started.client-token');
    }

    return new Promise(function (resolve, reject) {
      new Dropin({
        merchantConfiguration: options,
        client: clientInstance
      })._initialize(function (err, instance) {
        if (err) {
          reject(err);
          return;
        }

        resolve(instance);
      });
    });
  });
}

function setAnalyticsIntegration(clientInstance) {
  var configuration = clientInstance.getConfiguration();

  configuration.analyticsMetadata.integration = constants.INTEGRATION;
  configuration.analyticsMetadata.integrationType = constants.INTEGRATION;
  configuration.analyticsMetadata.dropinVersion = VERSION;

  clientInstance.getConfiguration = function () {
    return configuration;
  };

  return clientInstance;
}

// we check for document's existence to support server side rendering
createFromScriptTag(create, typeof document !== 'undefined' && document.querySelector('script[data-braintree-dropin-authorization]'));

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of Drop-in, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign = __webpack_require__(10).assign;
var analytics = __webpack_require__(14);
var constants = __webpack_require__(2);
var DropinError = __webpack_require__(8);
var DropinModel = __webpack_require__(129);
var EventEmitter = __webpack_require__(48);
var isGuestCheckout = __webpack_require__(49);
var assets = __webpack_require__(60);

var MainView = __webpack_require__(175);
var paymentMethodsViewID = __webpack_require__(65).ID;
var paymentOptionsViewID = __webpack_require__(66).ID;
var paymentOptionIDs = constants.paymentOptionIDs;
var translations = __webpack_require__(178);
var isUtf8 = __webpack_require__(58);
var uuid = __webpack_require__(67);
var Promise = __webpack_require__(5);
var sanitizeHtml = __webpack_require__(202);
var ThreeDSecure = __webpack_require__(203);
var wrapPrototype = __webpack_require__(3).wrapPrototype;

var mainHTML = "<div class=\"braintree-dropin\">\n  <div data-braintree-id=\"methods-label\" class=\"braintree-heading\">&nbsp;</div>\n  <div data-braintree-id=\"choose-a-way-to-pay\" class=\"braintree-heading\">{{chooseAWayToPay}}</div>\n  <div class=\"braintree-placeholder\">&nbsp;</div>\n\n  <div data-braintree-id=\"upper-container\" class=\"braintree-upper-container\">\n    <div data-braintree-id=\"loading-container\" class=\"braintree-loader__container\">\n      <div data-braintree-id=\"loading-indicator\" class=\"braintree-loader__indicator\">\n        <svg width=\"14\" height=\"16\" class=\"braintree-loader__lock\">\n          <use xlink:href=\"#iconLockLoader\"></use>\n        </svg>\n      </div>\n    </div>\n\n    <div data-braintree-id=\"methods\" class=\"braintree-methods braintree-methods-initial\">\n      <div data-braintree-id=\"methods-container\"></div>\n    </div>\n\n    <div data-braintree-id=\"options\" class=\"braintree-test-class braintree-options braintree-options-initial\">\n      <div data-braintree-id=\"payment-options-container\" class=\"braintree-options-list\"></div>\n    </div>\n\n    <div data-braintree-id=\"sheet-container\" class=\"braintree-sheet__container\">\n      <div data-braintree-id=\"paypal\" class=\"braintree-paypal braintree-sheet\">\n        <div data-braintree-id=\"paypal-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPal\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"paypalCredit\" class=\"braintree-paypalCredit braintree-sheet\">\n        <div data-braintree-id=\"paypal-credit-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\">\n                <use xlink:href=\"#logoPayPalCredit\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{PayPal Credit}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"paypal-credit-button\" class=\"braintree-sheet__button--paypal\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"applePay\" class=\"braintree-applePay braintree-sheet\">\n        <div data-braintree-id=\"apple-pay-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg height=\"24\" width=\"40\">\n              <use xlink:href=\"#logoApplePay\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{Apple Pay}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <div data-braintree-id=\"apple-pay-button\" class=\"braintree-sheet__button--apple-pay apple-pay-button\"></div>\n        </div>\n      </div>\n      <div data-braintree-id=\"googlePay\" class=\"braintree-googlePay braintree-sheet\">\n        <div data-braintree-id=\"google-pay-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg height=\"24\" width=\"40\">\n              <use xlink:href=\"#logoGooglePay\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{Google Pay}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <button type=\"button\" data-braintree-id=\"google-pay-button\" class=\"braintree-sheet__button--google-pay google-pay-button\"></button>\n        </div>\n      </div>\n      <div data-braintree-id=\"venmo\" class=\"braintree-venmo braintree-sheet\">\n        <div data-braintree-id=\"venmo-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg height=\"24\" width=\"40\">\n              <use xlink:href=\"#logoVenmo\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__label\">{{Venmo}}</div>\n          </div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--button\">\n          <svg data-braintree-id=\"venmo-button\" class=\"braintree-sheet__button--venmo\">\n            <use xlink:href=\"#buttonVenmo\"></use>\n          </svg>\n        </div>\n      </div>\n      <div data-braintree-id=\"card\" class=\"braintree-card braintree-form braintree-sheet\">\n        <div data-braintree-id=\"card-sheet-header\" class=\"braintree-sheet__header\">\n          <div class=\"braintree-sheet__header-label\">\n            <div class=\"braintree-sheet__logo--header\">\n              <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                <use xlink:href=\"#iconCardFront\"></use>\n              </svg>\n            </div>\n            <div class=\"braintree-sheet__text\">{{payWithCard}}</div>\n          </div>\n          <div data-braintree-id=\"card-view-icons\" class=\"braintree-sheet__icons\"></div>\n        </div>\n        <div class=\"braintree-sheet__content braintree-sheet__content--form\">\n          <div data-braintree-id=\"cardholder-name-field-group\" class=\"braintree-form__field-group\">\n            <label for=\"braintree__card-view-input__cardholder-name\">\n              <div class=\"braintree-form__label\">{{cardholderNameLabel}}</div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form-cardholder-name braintree-form__hosted-field\">\n                  <input id=\"braintree__card-view-input__cardholder-name\" type=\"text\" placeholder=\"{{cardholderNamePlaceholder}}\"/>\n                </div>\n                <div class=\"braintree-form__icon-container\">\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n            </label>\n            <div data-braintree-id=\"cardholder-name-field-error\" class=\"braintree-form__field-error\"></div>\n          </div>\n          <div data-braintree-id=\"number-field-group\" class=\"braintree-form__field-group\">\n            <label>\n              <div class=\"braintree-form__label\">{{cardNumberLabel}}</div>\n              <div class=\"braintree-form__field\">\n                <div class=\"braintree-form-number braintree-form__hosted-field\"></div>\n                <div class=\"braintree-form__icon-container\">\n                  <div data-braintree-id=\"card-number-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                    <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                    <use data-braintree-id=\"card-number-icon-svg\" xlink:href=\"#iconCardFront\"></use>\n                    </svg>\n                  </div>\n                  <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                    <svg width=\"24\" height=\"24\">\n                      <use xlink:href=\"#iconError\"></use>\n                    </svg>\n                  </div>\n                </div>\n              </div>\n            </label>\n            <div data-braintree-id=\"number-field-error\" class=\"braintree-form__field-error\"></div>\n          </div>\n\n          <div class=\"braintree-form__flexible-fields\">\n            <div data-braintree-id=\"expiration-date-field-group\" class=\"braintree-form__field-group\">\n              <label>\n                <div class=\"braintree-form__label\">{{expirationDateLabel}}\n                  <span class=\"braintree-form__descriptor\">{{expirationDateLabelSubheading}}</span>\n                </div>\n                <div class=\"braintree-form__field\">\n                  <div class=\"braintree-form__hosted-field braintree-form-expiration\"></div>\n                  <div class=\"braintree-form__icon-container\">\n                    <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                      <svg width=\"24\" height=\"24\">\n                        <use xlink:href=\"#iconError\"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n\n                <div data-braintree-id=\"expiration-date-field-error\" class=\"braintree-form__field-error\"></div>\n              </div>\n            </label>\n\n            <div data-braintree-id=\"cvv-field-group\" class=\"braintree-form__field-group\">\n              <label>\n                <div class=\"braintree-form__label\">{{cvvLabel}}\n                  <span data-braintree-id=\"cvv-label-descriptor\" class=\"braintree-form__descriptor\">{{cvvThreeDigitLabelSubheading}}</span>\n                </div>\n                <div class=\"braintree-form__field\">\n                  <div class=\"braintree-form__hosted-field braintree-form-cvv\"></div>\n                  <div class=\"braintree-form__icon-container\">\n                    <div data-braintree-id=\"cvv-icon\" class=\"braintree-form__icon braintree-form__field-secondary-icon\">\n                      <svg width=\"40\" height=\"24\" class=\"braintree-icon--bordered\">\n                      <use data-braintree-id=\"cvv-icon-svg\" xlink:href=\"#iconCVVBack\"></use>\n                      </svg>\n                    </div>\n                    <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                      <svg width=\"24\" height=\"24\">\n                        <use xlink:href=\"#iconError\"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id=\"cvv-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n\n            <div data-braintree-id=\"postal-code-field-group\" class=\"braintree-form__field-group\">\n              <label>\n                <div class=\"braintree-form__label\">{{postalCodeLabel}}</div>\n                <div class=\"braintree-form__field\">\n                  <div class=\"braintree-form__hosted-field braintree-form-postal-code\"></div>\n                  <div class=\"braintree-form__icon-container\">\n                    <div class=\"braintree-form__icon braintree-form__field-error-icon\">\n                      <svg width=\"24\" height=\"24\">\n                        <use xlink:href=\"#iconError\"></use>\n                      </svg>\n                    </div>\n                  </div>\n                </div>\n              </label>\n              <div data-braintree-id=\"postal-code-field-error\" class=\"braintree-form__field-error\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div data-braintree-id=\"sheet-error\" class=\"braintree-sheet__error\">\n        <div class=\"braintree-form__icon braintree-sheet__error-icon\">\n          <svg width=\"24\" height=\"24\">\n            <use xlink:href=\"#iconError\"></use>\n          </svg>\n        </div>\n        <div data-braintree-id=\"sheet-error-text\" class=\"braintree-sheet__error-text\"></div>\n      </div>\n    </div>\n  </div>\n\n  <div data-braintree-id=\"lower-container\" class=\"braintree-test-class braintree-options braintree-hidden\">\n    <div data-braintree-id=\"other-ways-to-pay\" class=\"braintree-heading\">{{otherWaysToPay}}</div>\n  </div>\n\n  <div data-braintree-id=\"toggle\" class=\"braintree-toggle braintree-hidden\" tabindex=\"0\">\n    <span>{{chooseAnotherWayToPay}}</span>\n  </div>\n</div>\n";
var svgHTML = "<svg data-braintree-id=\"svgs\" style=\"display: none\">\n  <defs>\n    <symbol id=\"icon-visa\" viewBox=\"0 0 40 24\">\n      <title>Visa</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M0 22.033C0 23.12.892 24 1.992 24h36.016c1.1 0 1.992-.88 1.992-1.967V20.08H0v1.953z\" style=\"fill: #F8B600\" />\n      <path d=\"M0 3.92h40V1.967C40 .88 39.108 0 38.008 0H1.992C.892 0 0 .88 0 1.967V3.92zM19.596 7.885l-2.11 9.478H14.93l2.11-9.478h2.554zm10.743 6.12l1.343-3.56.773 3.56H30.34zm2.85 3.358h2.36l-2.063-9.478H31.31c-.492 0-.905.274-1.088.695l-3.832 8.783h2.682l.532-1.415h3.276l.31 1.415zm-6.667-3.094c.01-2.502-3.6-2.64-3.577-3.76.008-.338.345-.7 1.083-.793.365-.045 1.373-.08 2.517.425l.448-2.01c-.615-.214-1.405-.42-2.39-.42-2.523 0-4.3 1.288-4.313 3.133-.016 1.364 1.268 2.125 2.234 2.58.996.464 1.33.762 1.325 1.177-.006.636-.793.918-1.526.928-1.285.02-2.03-.333-2.623-.6l-.462 2.08c.598.262 1.7.49 2.84.502 2.682 0 4.437-1.273 4.445-3.243zM15.948 7.884l-4.138 9.478h-2.7L7.076 9.8c-.123-.466-.23-.637-.606-.834-.615-.32-1.63-.62-2.52-.806l.06-.275h4.345c.554 0 1.052.354 1.178.966l1.076 5.486 2.655-6.45h2.683z\" style=\"fill: #1A1F71\" />\n    </symbol>\n\n    <symbol id=\"icon-master-card\" viewBox=\"0 0 40 24\">\n      <title>MasterCard</title>\n      <path d=\"M0 1.927C0 .863.892 0 1.992 0h36.016C39.108 0 40 .863 40 1.927v20.146C40 23.137 39.108 24 38.008 24H1.992C.892 24 0 23.137 0 22.073V1.927z\" style=\"fill: #FFF\" />\n      <path d=\"M11.085 22.2v-1.36c0-.522-.318-.863-.864-.863-.272 0-.568.09-.773.386-.16-.25-.386-.386-.727-.386-.228 0-.455.068-.637.318v-.272h-.478V22.2h.478v-1.202c0-.386.204-.567.523-.567.318 0 .478.205.478.568V22.2h.477v-1.202c0-.386.23-.567.524-.567.32 0 .478.205.478.568V22.2h.523zm7.075-2.177h-.774v-.658h-.478v.658h-.432v.43h.432v.998c0 .5.205.795.75.795.206 0 .433-.068.592-.16l-.136-.407c-.136.09-.296.114-.41.114-.227 0-.318-.137-.318-.363v-.976h.774v-.43zm4.048-.046c-.273 0-.454.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .204.023.295.046l.137-.454c-.09-.023-.228-.023-.32-.023zm-6.118.227c-.228-.16-.546-.227-.888-.227-.546 0-.91.272-.91.703 0 .363.274.567.75.635l.23.023c.25.045.385.113.385.227 0 .16-.182.272-.5.272-.32 0-.57-.113-.728-.227l-.228.363c.25.18.59.272.932.272.637 0 1-.295 1-.703 0-.385-.295-.59-.75-.658l-.227-.022c-.205-.023-.364-.068-.364-.204 0-.16.16-.25.41-.25.272 0 .545.114.682.182l.205-.386zm12.692-.227c-.273 0-.455.136-.568.318v-.272h-.478V22.2h.478v-1.225c0-.363.16-.567.455-.567.09 0 .203.023.294.046L29.1 20c-.09-.023-.227-.023-.318-.023zm-6.096 1.134c0 .66.455 1.135 1.16 1.135.32 0 .546-.068.774-.25l-.228-.385c-.182.136-.364.204-.57.204-.385 0-.658-.272-.658-.703 0-.407.273-.68.66-.702.204 0 .386.068.568.204l.228-.385c-.228-.182-.455-.25-.774-.25-.705 0-1.16.477-1.16 1.134zm4.413 0v-1.087h-.48v.272c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.317 0 .545-.113.68-.317v.272h.48v-1.09zm-1.753 0c0-.384.25-.702.66-.702.387 0 .66.295.66.703 0 .387-.273.704-.66.704-.41-.022-.66-.317-.66-.703zm-5.71-1.133c-.636 0-1.09.454-1.09 1.134 0 .682.454 1.135 1.114 1.135.32 0 .638-.09.888-.295l-.228-.34c-.18.136-.41.227-.636.227-.296 0-.592-.136-.66-.522h1.615v-.18c.022-.704-.388-1.158-1.002-1.158zm0 .41c.297 0 .502.18.547.52h-1.137c.045-.295.25-.52.59-.52zm11.852.724v-1.95h-.48v1.135c-.158-.204-.385-.318-.68-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.68-.317v.272h.48v-1.09zm-1.752 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703zm-15.97 0v-1.087h-.476v.272c-.16-.204-.387-.318-.683-.318-.615 0-1.093.477-1.093 1.134 0 .66.478 1.135 1.092 1.135.318 0 .545-.113.682-.317v.272h.477v-1.09zm-1.773 0c0-.384.25-.702.66-.702.386 0 .66.295.66.703 0 .387-.274.704-.66.704-.41-.022-.66-.317-.66-.703z\" style=\"fill: #000\" />\n      <path style=\"fill: #FF5F00\" d=\"M23.095 3.49H15.93v12.836h7.165\" />\n      <path d=\"M16.382 9.91c0-2.61 1.23-4.922 3.117-6.42-1.39-1.087-3.14-1.745-5.05-1.745-4.528 0-8.19 3.65-8.19 8.164 0 4.51 3.662 8.162 8.19 8.162 1.91 0 3.66-.657 5.05-1.746-1.89-1.474-3.118-3.81-3.118-6.417z\" style=\"fill: #EB001B\" />\n      <path d=\"M32.76 9.91c0 4.51-3.664 8.162-8.19 8.162-1.91 0-3.662-.657-5.05-1.746 1.91-1.496 3.116-3.81 3.116-6.417 0-2.61-1.228-4.922-3.116-6.42 1.388-1.087 3.14-1.745 5.05-1.745 4.526 0 8.19 3.674 8.19 8.164z\" style=\"fill: #F79E1B\" />\n    </symbol>\n\n    <symbol id=\"icon-unionpay\" viewBox=\"0 0 40 24\">\n      <title>Union Pay</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.877 2h8.126c1.135 0 1.84.93 1.575 2.077l-3.783 16.35c-.267 1.142-1.403 2.073-2.538 2.073H5.13c-1.134 0-1.84-.93-1.574-2.073L7.34 4.076C7.607 2.93 8.74 2 9.878 2z\" style=\"fill: #E21836\" />\n      <path d=\"M17.325 2h9.345c1.134 0 .623.93.356 2.077l-3.783 16.35c-.265 1.142-.182 2.073-1.32 2.073H12.58c-1.137 0-1.84-.93-1.574-2.073l3.783-16.35C15.056 2.93 16.19 2 17.324 2z\" style=\"fill: #00447B\" />\n      <path d=\"M26.3 2h8.126c1.136 0 1.84.93 1.575 2.077l-3.782 16.35c-.266 1.142-1.402 2.073-2.54 2.073h-8.122c-1.137 0-1.842-.93-1.574-2.073l3.78-16.35C24.03 2.93 25.166 2 26.303 2z\" style=\"fill: #007B84\" />\n      <path d=\"M27.633 14.072l-.99 3.3h.266l-.208.68h-.266l-.062.212h-.942l.064-.21H23.58l.193-.632h.194l1.005-3.35.2-.676h.962l-.1.34s.255-.184.498-.248c.242-.064 1.636-.088 1.636-.088l-.206.672h-.33zm-1.695 0l-.254.843s.285-.13.44-.172c.16-.04.395-.057.395-.057l.182-.614h-.764zm-.38 1.262l-.263.877s.29-.15.447-.196c.157-.037.396-.066.396-.066l.185-.614h-.766zm-.614 2.046h.767l.222-.74h-.765l-.223.74z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M28.055 13.4h1.027l.01.385c-.005.065.05.096.17.096h.208l-.19.637h-.555c-.48.035-.662-.172-.65-.406l-.02-.71zM28.193 16.415h-.978l.167-.566H28.5l.16-.517h-1.104l.19-.638h3.072l-.193.638h-1.03l-.16.516h1.032l-.17.565H29.18l-.2.24h.454l.11.712c.013.07.014.116.036.147.023.026.158.038.238.038h.137l-.21.694h-.348c-.054 0-.133-.004-.243-.01-.105-.008-.18-.07-.25-.105-.064-.03-.16-.11-.182-.24l-.11-.712-.507.7c-.162.222-.38.39-.748.39h-.712l.186-.62h.273c.078 0 .15-.03.2-.056.052-.023.098-.05.15-.126l.74-1.05zM17.478 14.867h2.59l-.19.622H18.84l-.16.53h1.06l-.194.64h-1.06l-.256.863c-.03.095.25.108.353.108l.53-.072-.212.71h-1.193c-.096 0-.168-.013-.272-.037-.1-.023-.145-.07-.19-.138-.043-.07-.11-.128-.064-.278l.343-1.143h-.588l.195-.65h.592l.156-.53h-.588l.188-.623zM19.223 13.75h1.063l-.194.65H18.64l-.157.136c-.067.066-.09.038-.18.087-.08.04-.254.123-.477.123h-.466l.19-.625h.14c.118 0 .198-.01.238-.036.046-.03.098-.096.157-.203l.267-.487h1.057l-.187.356zM20.74 13.4h.905l-.132.46s.286-.23.487-.313c.2-.075.65-.143.65-.143l1.464-.007-.498 1.672c-.085.286-.183.472-.244.555-.055.087-.12.16-.248.23-.124.066-.236.104-.34.115-.096.007-.244.01-.45.012h-1.41l-.4 1.324c-.037.13-.055.194-.03.23.02.03.068.066.135.066l.62-.06-.21.726h-.698c-.22 0-.383-.004-.495-.013-.108-.01-.22 0-.295-.058-.065-.058-.164-.133-.162-.21.007-.073.037-.192.082-.356l1.268-4.23zm1.922 1.69h-1.484l-.09.3h1.283c.152-.018.184.004.196-.003l.096-.297zm-1.402-.272s.29-.266.786-.353c.112-.022.82-.015.82-.015l.106-.357h-1.496l-.216.725z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M23.382 16.1l-.084.402c-.036.125-.067.22-.16.302-.1.084-.216.172-.488.172l-.502.02-.004.455c-.006.13.028.117.048.138.024.022.045.032.067.04l.157-.008.48-.028-.198.663h-.552c-.385 0-.67-.008-.765-.084-.092-.057-.105-.132-.103-.26l.035-1.77h.88l-.013.362h.212c.072 0 .12-.007.15-.026.027-.02.047-.048.06-.093l.087-.282h.692zM10.84 7.222c-.032.143-.596 2.763-.598 2.764-.12.53-.21.91-.508 1.152-.172.14-.37.21-.6.21-.37 0-.587-.185-.624-.537l-.007-.12.113-.712s.593-2.388.7-2.703c.002-.017.005-.026.007-.035-1.152.01-1.357 0-1.37-.018-.007.024-.037.173-.037.173l-.605 2.688-.05.23-.1.746c0 .22.042.4.13.553.275.485 1.06.557 1.504.557.573 0 1.11-.123 1.47-.345.63-.375.797-.962.944-1.48l.067-.267s.61-2.48.716-2.803c.003-.017.006-.026.01-.035-.835.01-1.08 0-1.16-.018zM14.21 12.144c-.407-.006-.55-.006-1.03.018l-.018-.036c.042-.182.087-.363.127-.548l.06-.25c.086-.39.173-.843.184-.98.007-.084.036-.29-.2-.29-.1 0-.203.048-.307.096-.058.207-.174.79-.23 1.055-.118.558-.126.62-.178.897l-.036.037c-.42-.006-.566-.006-1.05.018l-.024-.04c.08-.332.162-.668.24-.998.203-.9.25-1.245.307-1.702l.04-.028c.47-.067.585-.08 1.097-.185l.043.047-.077.287c.086-.052.168-.104.257-.15.242-.12.51-.155.658-.155.223 0 .468.062.57.323.098.232.034.52-.094 1.084l-.066.287c-.13.627-.152.743-.225 1.174l-.05.036zM15.87 12.144c-.245 0-.405-.006-.56 0-.153 0-.303.008-.532.018l-.013-.02-.015-.02c.062-.238.097-.322.128-.406.03-.084.06-.17.115-.41.072-.315.116-.535.147-.728.033-.187.052-.346.075-.53l.02-.014.02-.018c.244-.036.4-.057.56-.082.16-.024.32-.055.574-.103l.008.023.008.022c-.047.195-.094.39-.14.588-.047.197-.094.392-.137.587-.093.414-.13.57-.152.68-.02.105-.026.163-.063.377l-.022.02-.023.017zM19.542 10.728c.143-.633.033-.928-.108-1.11-.213-.273-.59-.36-.978-.36-.235 0-.793.023-1.23.43-.312.29-.458.687-.546 1.066-.088.387-.19 1.086.447 1.344.198.085.48.108.662.108.466 0 .945-.13 1.304-.513.278-.312.405-.775.448-.965zm-1.07-.046c-.02.106-.113.503-.24.673-.086.123-.19.198-.305.198-.033 0-.235 0-.238-.3-.003-.15.027-.304.063-.47.108-.478.236-.88.56-.88.255 0 .27.298.16.78zM29.536 12.187c-.493-.004-.635-.004-1.09.015l-.03-.037c.124-.472.248-.943.358-1.42.142-.62.175-.882.223-1.244l.037-.03c.49-.07.625-.09 1.135-.186l.015.044c-.093.388-.186.777-.275 1.166-.19.816-.258 1.23-.33 1.658l-.044.035z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M29.77 10.784c.144-.63-.432-.056-.525-.264-.14-.323-.052-.98-.62-1.2-.22-.085-.732.025-1.17.428-.31.29-.458.683-.544 1.062-.088.38-.19 1.078.444 1.328.2.085.384.11.567.103.638-.034 1.124-1.002 1.483-1.386.277-.303.326.115.368-.07zm-.974-.047c-.024.1-.117.503-.244.67-.083.117-.283.192-.397.192-.032 0-.232 0-.24-.3 0-.146.03-.3.067-.467.11-.47.235-.87.56-.87.254 0 .363.293.254.774zM22.332 12.144c-.41-.006-.55-.006-1.03.018l-.018-.036c.04-.182.087-.363.13-.548l.057-.25c.09-.39.176-.843.186-.98.008-.084.036-.29-.198-.29-.1 0-.203.048-.308.096-.057.207-.175.79-.232 1.055-.115.558-.124.62-.176.897l-.035.037c-.42-.006-.566-.006-1.05.018l-.022-.04.238-.998c.203-.9.25-1.245.307-1.702l.038-.028c.472-.067.587-.08 1.098-.185l.04.047-.073.287c.084-.052.17-.104.257-.15.24-.12.51-.155.655-.155.224 0 .47.062.575.323.095.232.03.52-.098 1.084l-.065.287c-.133.627-.154.743-.225 1.174l-.05.036zM26.32 8.756c-.07.326-.282.603-.554.736-.225.114-.498.123-.78.123h-.183l.013-.074.336-1.468.01-.076.007-.058.132.015.71.062c.275.105.388.38.31.74zM25.88 7.22l-.34.003c-.883.01-1.238.006-1.383-.012l-.037.182-.315 1.478-.793 3.288c.77-.01 1.088-.01 1.22.004l.21-1.024s.153-.644.163-.667c0 0 .047-.066.096-.092h.07c.665 0 1.417 0 2.005-.437.4-.298.675-.74.797-1.274.03-.132.054-.29.054-.446 0-.205-.04-.41-.16-.568-.3-.423-.896-.43-1.588-.433zM33.572 9.28l-.04-.043c-.502.1-.594.118-1.058.18l-.034.034-.005.023-.003-.007c-.345.803-.334.63-.615 1.26-.003-.03-.003-.048-.004-.077l-.07-1.37-.044-.043c-.53.1-.542.118-1.03.18l-.04.034-.006.056.003.007c.06.315.047.244.108.738.03.244.065.49.093.73.05.4.077.6.134 1.21-.328.55-.408.757-.722 1.238l.017.044c.478-.018.587-.018.94-.018l.08-.088c.265-.578 2.295-4.085 2.295-4.085zM16.318 9.62c.27-.19.304-.45.076-.586-.23-.137-.634-.094-.906.095-.273.186-.304.45-.075.586.228.134.633.094.905-.096z\" style=\"fill: #FEFEFE\" />\n      <path d=\"M31.238 13.415l-.397.684c-.124.232-.357.407-.728.41l-.632-.01.184-.618h.124c.064 0 .11-.004.148-.022.03-.01.054-.035.08-.072l.233-.373h.988z\" style=\"fill: #FEFEFE\" />\n    </symbol>\n\n    <symbol id=\"icon-american-express\" viewBox=\"0 0 40 24\">\n      <title>American Express</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path style=\"fill: #1478BE\" d=\"M6.26 12.32h2.313L7.415 9.66M27.353 9.977h-3.738v1.23h3.666v1.384h-3.675v1.385h3.821v1.005c.623-.77 1.33-1.466 2.025-2.235l.707-.77c-.934-1.004-1.87-2.08-2.804-3.075v1.077z\" />\n      <path d=\"M38.25 7h-5.605l-1.328 1.4L30.072 7H16.984l-1.017 2.416L14.877 7h-9.58L1.25 16.5h4.826l.623-1.556h1.4l.623 1.556H29.99l1.327-1.483 1.328 1.483h5.605l-4.36-4.667L38.25 7zm-17.685 8.1h-1.557V9.883L16.673 15.1h-1.33L13.01 9.883l-.084 5.217H9.73l-.623-1.556h-3.27L5.132 15.1H3.42l2.884-6.772h2.42l2.645 6.233V8.33h2.646l2.107 4.51 1.868-4.51h2.575V15.1zm14.727 0h-2.024l-2.024-2.26-2.023 2.26H22.06V8.328H29.53l1.795 2.177 2.024-2.177h2.025L32.26 11.75l3.032 3.35z\" style=\"fill: #1478BE\" />\n    </symbol>\n\n    <symbol id=\"icon-jcb\" viewBox=\"0 0 40 24\">\n      <title>JCB</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M33.273 2.01h.013v17.062c-.004 1.078-.513 2.103-1.372 2.746-.63.47-1.366.67-2.14.67-.437 0-4.833.026-4.855 0-.01-.01 0-.07 0-.082v-6.82c0-.04.004-.064.033-.064h5.253c.867 0 1.344-.257 1.692-.61.44-.448.574-1.162.294-1.732-.24-.488-.736-.78-1.244-.913-.158-.04-.32-.068-.483-.083-.01 0-.064 0-.07-.006-.03-.034.023-.04.038-.046.102-.033.215-.042.32-.073.532-.164.993-.547 1.137-1.105.15-.577-.05-1.194-.524-1.552-.34-.257-.768-.376-1.187-.413-.43-.038-4.774-.022-5.21-.022-.072 0-.05-.02-.05-.09V5.63c0-.31.01-.616.073-.92.126-.592.41-1.144.815-1.59.558-.615 1.337-1.01 2.16-1.093.478-.048 4.89-.017 5.305-.017zm-4.06 8.616c.06.272-.01.567-.204.77-.173.176-.407.25-.648.253-.195.003-1.725 0-1.788 0l.003-1.645c.012-.027.02-.018.06-.018.097 0 1.713-.004 1.823.005.232.02.45.12.598.306.076.096.128.208.155.328zm-2.636 2.038h1.944c.242.002.47.063.652.228.226.204.327.515.283.815-.04.263-.194.5-.422.634-.187.112-.39.125-.6.125h-1.857v-1.8z\" style=\"fill: #53B230\" />\n      <path d=\"M6.574 13.89c-.06-.03-.06-.018-.07-.06-.006-.026-.005-8.365.003-8.558.04-.95.487-1.857 1.21-2.47.517-.434 1.16-.71 1.83-.778.396-.04.803-.018 1.2-.018.69 0 4.11-.013 4.12 0 .008.008.002 16.758 0 17.074-.003.956-.403 1.878-1.105 2.523-.506.465-1.15.77-1.83.86-.41.056-5.02.032-5.363.032-.066 0-.054.013-.066-.024-.01-.025 0-7 0-7.17.66.178 1.35.28 2.03.348.662.067 1.33.093 1.993.062.93-.044 1.947-.192 2.712-.762.32-.238.574-.553.73-.922.148-.353.2-.736.2-1.117 0-.348.006-3.93-.016-3.942-.023-.014-2.885-.015-2.9.012-.012.022 0 3.87 0 3.95-.003.47-.16.933-.514 1.252-.468.42-1.11.47-1.707.423-.687-.055-1.357-.245-1.993-.508-.157-.065-.312-.135-.466-.208z\" style=\"fill: #006CB9\" />\n      <path d=\"M15.95 9.835c-.025.02-.05.04-.072.06V6.05c0-.295-.012-.594.01-.888.12-1.593 1.373-2.923 2.944-3.126.382-.05 5.397-.042 5.41-.026.01.01 0 .062 0 .074v16.957c0 1.304-.725 2.52-1.89 3.1-.504.25-1.045.35-1.605.35-.322 0-4.757.015-4.834 0-.05-.01-.023.01-.035-.02-.007-.022 0-6.548 0-7.44v-.422c.554.48 1.256.75 1.96.908.536.12 1.084.176 1.63.196.537.02 1.076.01 1.61-.037.546-.05 1.088-.136 1.625-.244.137-.028.274-.057.41-.09.033-.006.17-.017.187-.044.013-.02 0-.097 0-.12v-1.324c-.582.292-1.19.525-1.83.652-.778.155-1.64.198-2.385-.123-.752-.326-1.2-1.024-1.274-1.837-.076-.837.173-1.716.883-2.212.736-.513 1.7-.517 2.553-.38.634.1 1.245.305 1.825.58.078.037.154.075.23.113V9.322c0-.02.013-.1 0-.118-.02-.028-.152-.038-.188-.046-.066-.016-.133-.03-.2-.045C22.38 9 21.84 8.908 21.3 8.85c-.533-.06-1.068-.077-1.603-.066-.542.01-1.086.054-1.62.154-.662.125-1.32.337-1.883.716-.085.056-.167.117-.245.18z\" style=\"fill: #E20138\" />\n    </symbol>\n\n    <symbol id=\"icon-discover\" viewBox=\"0 0 40 24\">\n      <title>Discover</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M38.995 11.75S27.522 20.1 6.5 23.5h31.495c.552 0 1-.448 1-1V11.75z\" style=\"fill: #F48024\" />\n      <path d=\"M5.332 11.758c-.338.305-.776.438-1.47.438h-.29V8.55h.29c.694 0 1.115.124 1.47.446.37.33.595.844.595 1.372 0 .53-.224 1.06-.595 1.39zM4.077 7.615H2.5v5.515h1.57c.833 0 1.435-.197 1.963-.637.63-.52 1-1.305 1-2.116 0-1.628-1.214-2.762-2.956-2.762zM7.53 13.13h1.074V7.616H7.53M11.227 9.732c-.645-.24-.834-.397-.834-.695 0-.347.338-.61.8-.61.322 0 .587.132.867.446l.562-.737c-.462-.405-1.015-.612-1.618-.612-.975 0-1.718.678-1.718 1.58 0 .76.346 1.15 1.355 1.513.42.148.635.247.743.314.215.14.322.34.322.57 0 .448-.354.78-.834.78-.51 0-.924-.258-1.17-.736l-.695.67c.495.726 1.09 1.05 1.907 1.05 1.116 0 1.9-.745 1.9-1.812 0-.876-.363-1.273-1.585-1.72zM13.15 10.377c0 1.62 1.27 2.877 2.907 2.877.462 0 .858-.09 1.347-.32v-1.267c-.43.43-.81.604-1.297.604-1.082 0-1.85-.785-1.85-1.9 0-1.06.792-1.895 1.8-1.895.512 0 .9.183 1.347.62V7.83c-.472-.24-.86-.34-1.322-.34-1.627 0-2.932 1.283-2.932 2.887zM25.922 11.32l-1.468-3.705H23.28l2.337 5.656h.578l2.38-5.655H27.41M29.06 13.13h3.046v-.934h-1.973v-1.488h1.9v-.934h-1.9V8.55h1.973v-.935H29.06M34.207 10.154h-.314v-1.67h.33c.67 0 1.034.28 1.034.818 0 .554-.364.852-1.05.852zm2.155-.91c0-1.033-.71-1.628-1.95-1.628H32.82v5.514h1.073v-2.215h.14l1.487 2.215h1.32l-1.733-2.323c.81-.165 1.255-.72 1.255-1.563z\" style=\"fill: #221F20\" />\n      <path d=\"M23.6 10.377c0 1.62-1.31 2.93-2.927 2.93-1.617.002-2.928-1.31-2.928-2.93s1.31-2.932 2.928-2.932c1.618 0 2.928 1.312 2.928 2.932z\" style=\"fill: #F48024\" />\n    </symbol>\n\n    <symbol id=\"icon-diners-club\" viewBox=\"0 0 40 24\">\n      <title>Diners Club</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M9.02 11.83c0-5.456 4.54-9.88 10.14-9.88 5.6 0 10.139 4.424 10.139 9.88-.002 5.456-4.54 9.88-10.14 9.88-5.6 0-10.14-4.424-10.14-9.88z\" style=\"fill: #FEFEFE\" />\n      <path style=\"fill: #FFF\" d=\"M32.522 22H8.5V1.5h24.022\" />\n      <path d=\"M25.02 11.732c-.003-2.534-1.607-4.695-3.868-5.55v11.102c2.26-.857 3.865-3.017 3.87-5.552zm-8.182 5.55V6.18c-2.26.86-3.86 3.017-3.867 5.55.007 2.533 1.61 4.69 3.868 5.55zm2.158-14.934c-5.25.002-9.503 4.202-9.504 9.384 0 5.182 4.254 9.38 9.504 9.382 5.25 0 9.504-4.2 9.505-9.382 0-5.182-4.254-9.382-9.504-9.384zM18.973 22C13.228 22.027 8.5 17.432 8.5 11.84 8.5 5.726 13.228 1.5 18.973 1.5h2.692c5.677 0 10.857 4.225 10.857 10.34 0 5.59-5.18 10.16-10.857 10.16h-2.692z\" style=\"fill: #004A97\" />\n    </symbol>\n\n    <symbol id=\"icon-maestro\" viewBox=\"0 0 40 24\">\n      <title>Maestro</title>\n      <path d=\"M38.333 24H1.667C.75 24 0 23.28 0 22.4V1.6C0 .72.75 0 1.667 0h36.666C39.25 0 40 .72 40 1.6v20.8c0 .88-.75 1.6-1.667 1.6z\" style=\"fill: #FFF\" />\n      <path d=\"M14.67 22.39V21c.022-.465-.303-.86-.767-.882h-.116c-.3-.023-.603.14-.788.394-.164-.255-.442-.417-.743-.394-.256-.023-.51.116-.65.324v-.278h-.487v2.203h.487v-1.183c-.046-.278.162-.533.44-.58h.094c.325 0 .488.21.488.58v1.23h.487v-1.23c-.047-.278.162-.556.44-.58h.093c.325 0 .487.21.487.58v1.23l.534-.024zm2.712-1.09v-1.113h-.487v.28c-.162-.21-.417-.326-.695-.326-.65 0-1.16.51-1.16 1.16 0 .65.51 1.16 1.16 1.16.278 0 .533-.117.695-.325v.278h.487V21.3zm-1.786 0c.024-.37.348-.65.72-.626.37.023.65.348.626.72-.023.347-.302.625-.673.625-.372 0-.674-.28-.674-.65-.023-.047-.023-.047 0-.07zm12.085-1.16c.163 0 .325.024.465.094.14.046.278.14.37.255.117.115.186.23.256.37.117.3.117.626 0 .927-.046.14-.138.255-.254.37-.116.117-.232.186-.37.256-.303.116-.65.116-.952 0-.14-.046-.28-.14-.37-.255-.118-.116-.187-.232-.257-.37-.116-.302-.116-.627 0-.928.047-.14.14-.255.256-.37.115-.117.23-.187.37-.256.163-.07.325-.116.488-.093zm0 .465c-.092 0-.185.023-.278.046-.092.024-.162.094-.232.14-.07.07-.116.14-.14.232-.068.185-.068.394 0 .58.024.092.094.162.14.23.07.07.14.117.232.14.186.07.37.07.557 0 .092-.023.16-.092.23-.14.07-.068.117-.138.14-.23.07-.186.07-.395 0-.58-.023-.093-.093-.162-.14-.232-.07-.07-.138-.116-.23-.14-.094-.045-.187-.07-.28-.045zm-7.677.695c0-.695-.44-1.16-1.043-1.16-.65 0-1.16.534-1.137 1.183.023.65.534 1.16 1.183 1.136.325 0 .65-.093.905-.302l-.23-.348c-.187.14-.42.232-.65.232-.326.023-.627-.21-.673-.533h1.646v-.21zm-1.646-.21c.023-.3.278-.532.58-.532.3 0 .556.232.556.533h-1.136zm3.664-.346c-.207-.116-.44-.186-.695-.186-.255 0-.417.093-.417.255 0 .163.162.186.37.21l.233.022c.488.07.766.278.766.672 0 .395-.37.72-1.02.72-.348 0-.673-.094-.95-.28l.23-.37c.21.162.465.232.743.232.324 0 .51-.094.51-.28 0-.115-.117-.185-.395-.23l-.232-.024c-.487-.07-.765-.302-.765-.65 0-.44.37-.718.927-.718.325 0 .627.07.905.232l-.21.394zm2.32-.116h-.788v.997c0 .23.07.37.325.37.14 0 .3-.046.417-.115l.14.417c-.186.116-.395.162-.604.162-.58 0-.765-.302-.765-.812v-1.02h-.44v-.44h.44v-.673h.487v.672h.79v.44zm1.67-.51c.117 0 .233.023.35.07l-.14.463c-.093-.045-.21-.045-.302-.045-.325 0-.464.208-.464.58v1.25h-.487v-2.2h.487v.277c.116-.255.325-.37.557-.394z\" style=\"fill: #000\" />\n      <path style=\"fill: #7673C0\" d=\"M23.64 3.287h-7.305V16.41h7.306\" />\n      <path d=\"M16.8 9.848c0-2.55 1.183-4.985 3.2-6.56C16.384.435 11.12 1.06 8.29 4.7 5.435 8.32 6.06 13.58 9.703 16.41c3.038 2.387 7.283 2.387 10.32 0-2.04-1.578-3.223-3.99-3.223-6.562z\" style=\"fill: #EB001B\" />\n      <path d=\"M33.5 9.848c0 4.613-3.735 8.346-8.35 8.346-1.88 0-3.69-.626-5.15-1.785 3.618-2.83 4.245-8.092 1.415-11.71-.418-.532-.882-.996-1.415-1.413C23.618.437 28.883 1.06 31.736 4.7 32.873 6.163 33.5 7.994 33.5 9.85z\" style=\"fill: #00A1DF\" />\n    </symbol>\n\n    <symbol id=\"logoPayPal\" viewBox=\"0 0 48 29\">\n      <title>PayPal Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" />\n      <path d=\"M31.216 16.4c.394-.7.69-1.5.886-2.4.196-.8.196-1.6.1-2.2-.1-.7-.396-1.2-.79-1.7-.195-.3-.59-.5-.885-.7.1-.8.1-1.5 0-2.1-.1-.6-.394-1.1-.886-1.6-.885-1-2.56-1.6-4.922-1.6h-6.4c-.492 0-.787.3-.886.8l-2.658 17.2c0 .2 0 .3.1.4.097.1.294.2.393.2h4.036l-.295 1.8c0 .1 0 .3.1.4.098.1.195.2.393.2h3.35c.393 0 .688-.3.786-.7v-.2l.59-4.1v-.2c.1-.4.395-.7.788-.7h.59c1.675 0 3.152-.4 4.137-1.1.59-.5 1.083-1 1.478-1.7h-.002z\" style=\"fill: #263B80\" />\n      <path d=\"M21.364 9.4c0-.3.196-.5.492-.6.098-.1.196-.1.394-.1h5.02c.592 0 1.183 0 1.675.1.1 0 .295.1.394.1.098 0 .294.1.393.1.1 0 .1 0 .197.102.295.1.492.2.69.3.295-1.6 0-2.7-.887-3.8-.985-1.1-2.658-1.6-4.923-1.6h-6.4c-.49 0-.885.3-.885.8l-2.758 17.3c-.098.3.197.6.59.6h3.94l.985-6.4 1.083-6.9z\" style=\"fill: #263B80\" />\n      <path d=\"M30.523 9.4c0 .1 0 .3-.098.4-.887 4.4-3.742 5.9-7.484 5.9h-1.87c-.492 0-.787.3-.886.8l-.985 6.2-.296 1.8c0 .3.196.6.492.6h3.348c.394 0 .69-.3.787-.7v-.2l.592-4.1v-.2c.1-.4.394-.7.787-.7h.69c3.248 0 5.808-1.3 6.497-5.2.296-1.6.197-3-.69-3.9-.196-.3-.49-.5-.885-.7z\" style=\"fill: #159BD7\" />\n      <path d=\"M29.635 9c-.098 0-.295-.1-.394-.1-.098 0-.294-.1-.393-.1-.492-.102-1.083-.102-1.673-.102h-5.022c-.1 0-.197 0-.394.1-.198.1-.394.3-.492.6l-1.083 6.9v.2c.1-.5.492-.8.886-.8h1.87c3.742 0 6.598-1.5 7.484-5.9 0-.1 0-.3.098-.4-.196-.1-.492-.2-.69-.3 0-.1-.098-.1-.196-.1z\" style=\"fill: #232C65\" />\n    </symbol>\n\n    <symbol id=\"logoPayPalCredit\" viewBox=\"0 0 48 29\">\n      <title>PayPal Credit Logo</title>\n      <path d=\"M46 29H2c-1.1 0-2-.87-2-1.932V1.934C0 .87.9 0 2 0h44c1.1 0 2 .87 2 1.934v25.134C48 28.13 47.1 29 46 29z\" fill-opacity=\"0\" style=\"fill: #FFF\" fill-rule=\"nonzero\" />\n      <path d=\"M27.44 21.6h.518c1.377 0 2.67-.754 2.953-2.484.248-1.588-.658-2.482-2.14-2.482h-.38c-.093 0-.172.067-.187.16l-.763 4.805zm-1.254-6.646c.024-.158.16-.273.32-.273h2.993c2.47 0 4.2 1.942 3.81 4.436-.4 2.495-2.752 4.436-5.21 4.436h-3.05c-.116 0-.205-.104-.187-.218l1.323-8.38zM22.308 16.907l-.192 1.21h2.38c.116 0 .204.103.186.217l-.23 1.462c-.023.157-.16.273-.318.273h-2.048c-.16 0-.294.114-.32.27l-.203 1.26h2.52c.117 0 .205.102.187.217l-.228 1.46c-.025.16-.16.275-.32.275h-4.55c-.116 0-.204-.104-.186-.218l1.322-8.38c.025-.158.16-.273.32-.273h4.55c.116 0 .205.104.187.22l-.23 1.46c-.024.158-.16.274-.32.274H22.63c-.16 0-.295.115-.32.273M35.325 23.552h-1.81c-.115 0-.203-.104-.185-.218l1.322-8.38c.025-.158.16-.273.32-.273h1.81c.115 0 .203.104.185.22l-1.322 8.38c-.025.156-.16.272-.32.272M14.397 18.657h.224c.754 0 1.62-.14 1.777-1.106.158-.963-.345-1.102-1.15-1.104h-.326c-.097 0-.18.07-.197.168l-.326 2.043zm3.96 4.895h-2.37c-.102 0-.194-.058-.238-.15l-1.565-3.262h-.023l-.506 3.19c-.02.128-.13.222-.26.222h-1.86c-.116 0-.205-.104-.187-.218l1.33-8.432c.02-.128.13-.22.26-.22h3.222c1.753 0 2.953.834 2.66 2.728-.2 1.224-1.048 2.283-2.342 2.506l2.037 3.35c.076.125-.014.286-.16.286zM40.216 23.552h-1.808c-.116 0-.205-.104-.187-.218l1.06-6.7h-1.684c-.116 0-.205-.104-.187-.218l.228-1.462c.025-.157.16-.273.32-.273h5.62c.116 0 .205.104.186.22l-.228 1.46c-.025.158-.16.274-.32.274h-1.63l-1.05 6.645c-.025.156-.16.272-.32.272M11.467 17.202c-.027.164-.228.223-.345.104-.395-.405-.975-.62-1.6-.62-1.41 0-2.526 1.083-2.75 2.458-.21 1.4.588 2.41 2.022 2.41.592 0 1.22-.225 1.74-.6.144-.105.34.02.313.194l-.328 2.03c-.02.12-.108.22-.226.254-.702.207-1.24.355-1.9.355-3.823 0-4.435-3.266-4.238-4.655.553-3.894 3.712-4.786 5.65-4.678.623.034 1.182.117 1.73.323.177.067.282.25.252.436l-.32 1.99\" style=\"fill: #21306F\" />\n      <path d=\"M23.184 7.67c-.11.717-.657.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.105.123.137.305.097.557zm-.23-1.87h-1.998c-.137 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h1.024c.095 0 .177-.07.192-.164l.23-1.452c.02-.135.136-.235.273-.235h.63c1.317 0 2.076-.636 2.275-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51z\" style=\"fill: #0093C7\" />\n      <path d=\"M8.936 7.67c-.11.717-.656.717-1.186.717h-.302l.212-1.34c.013-.08.082-.14.164-.14h.138c.36 0 .702 0 .877.206.104.123.136.305.096.557zm-.23-1.87H6.708c-.136 0-.253.098-.274.233l-.808 5.123c-.016.1.062.192.165.192h.955c.136 0 .252-.1.274-.234l.217-1.382c.02-.135.137-.235.274-.235h.633c1.316 0 2.075-.636 2.274-1.898.09-.553.003-.987-.255-1.29-.284-.334-.788-.51-1.456-.51zM13.343 9.51c-.092.545-.526.912-1.08.912-.277 0-.5-.09-.642-.258-.14-.168-.193-.406-.148-.672.086-.542.527-.92 1.072-.92.27 0 .492.09.637.26.148.172.205.412.163.677zm1.334-1.863h-.957c-.082 0-.152.06-.164.14l-.042.268-.067-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.135 1.923-.092.56.038 1.097.356 1.47.29.344.708.487 1.204.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.017-.102-.06-.193-.163-.193z\" style=\"fill: #21306F\" />\n      <path d=\"M27.59 9.51c-.09.545-.525.912-1.078.912-.278 0-.5-.09-.643-.258-.142-.168-.195-.406-.15-.672.086-.542.526-.92 1.07-.92.273 0 .494.09.64.26.146.172.203.412.16.677zm1.334-1.863h-.956c-.082 0-.152.06-.164.14l-.043.268-.065-.097c-.208-.3-.67-.4-1.13-.4-1.057 0-1.96.8-2.136 1.923-.092.56.038 1.097.355 1.47.292.344.71.487 1.205.487.852 0 1.325-.548 1.325-.548l-.043.265c-.016.1.062.193.164.193h.862c.136 0 .253-.1.274-.234l.517-3.275c.015-.102-.063-.193-.166-.193z\" style=\"fill: #0093C7\" />\n      <path d=\"M19.77 7.647h-.96c-.092 0-.178.045-.23.122L17.254 9.72l-.562-1.877c-.035-.118-.143-.198-.266-.198h-.945c-.113 0-.194.112-.157.22l1.06 3.108-.997 1.404c-.078.11 0 .262.136.262h.96c.092 0 .177-.044.23-.12l3.196-4.614c.077-.11-.002-.26-.137-.26\" style=\"fill: #21306F\" />\n      <path d=\"M30.052 5.94l-.82 5.216c-.016.1.062.192.165.192h.824c.138 0 .254-.1.275-.234l.81-5.122c.015-.1-.064-.193-.166-.193h-.924c-.082 0-.15.06-.164.14\" style=\"fill: #0093C7\" />\n    </symbol>\n\n    <symbol id=\"iconCardFront\" viewBox=\"0 0 48 29\">\n      <title>Generic Card</title>\n      <path d=\"M46.177 29H1.823C.9 29 0 28.13 0 27.187V1.813C0 .87.9 0 1.823 0h44.354C47.1 0 48 .87 48 1.813v25.375C48 28.13 47.1 29 46.177 29z\" style=\"fill: #FFF\" />\n      <path d=\"M4.8 9.14c0-.427.57-.973 1.067-.973h7.466c.496 0 1.067.546 1.067.972v3.888c0 .425-.57.972-1.067.972H5.867c-.496 0-1.067-.547-1.067-.972v-3.89z\" style=\"fill: #828282\" />\n      <rect style=\"fill: #828282\" x=\"10.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <rect style=\"fill: #828282\" x=\"4.8\" y=\"22.167\" width=\"3.6\" height=\"2.333\" rx=\"1.167\" />\n      <path d=\"M6.55 16.333h34.9c.966 0 1.75.784 1.75 1.75 0 .967-.784 1.75-1.75 1.75H6.55c-.966 0-1.75-.783-1.75-1.75 0-.966.784-1.75 1.75-1.75z\" style=\"fill: #828282\" />\n      <ellipse style=\"fill: #828282\" cx=\"40.2\" cy=\"6.417\" rx=\"3\" ry=\"2.917\" />\n    </symbol>\n\n    <symbol id=\"iconCVVBack\" viewBox=\"0 0 40 24\">\n      <title>CVV Back</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\"/>\n      <path style=\"fill: #828282\" d=\"M0 5h40v4H0z\" />\n      <path d=\"M20 13.772v5.456c0 .423.37.772.82.772h13.36c.45 0 .82-.35.82-.772v-5.456c0-.423-.37-.772-.82-.772H20.82c-.45 0-.82.35-.82.772zm-1-.142c0-.9.76-1.63 1.68-1.63h13.64c.928 0 1.68.737 1.68 1.63v5.74c0 .9-.76 1.63-1.68 1.63H20.68c-.928 0-1.68-.737-1.68-1.63v-5.74z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"16.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"16.5\" r=\"1.5\" />\n    </symbol>\n\n    <symbol id=\"iconCVVFront\" viewBox=\"0 0 40 24\">\n      <title>CVV Front</title>\n      <path d=\"M38.48 24H1.52C.75 24 0 23.28 0 22.5v-21C0 .72.75 0 1.52 0h36.96C39.25 0 40 .72 40 1.5v21c0 .78-.75 1.5-1.52 1.5z\" style=\"fill: #FFF\" />\n      <path d=\"M16 5.772v5.456c0 .423.366.772.81.772h17.38c.444 0 .81-.348.81-.772V5.772C35 5.35 34.634 5 34.19 5H16.81c-.444 0-.81.348-.81.772zm-1-.142c0-.9.75-1.63 1.66-1.63h17.68c.917 0 1.66.737 1.66 1.63v5.74c0 .9-.75 1.63-1.66 1.63H16.66c-.917 0-1.66-.737-1.66-1.63V5.63z\" style=\"fill: #000\" fill-rule=\"nonzero\" />\n      <circle style=\"fill: #828282\" cx=\"19.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"27.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"23.5\" cy=\"8.5\" r=\"1.5\" />\n      <circle style=\"fill: #828282\" cx=\"31.5\" cy=\"8.5\" r=\"1.5\" />\n      <path d=\"M4 7.833C4 7.47 4.476 7 4.89 7h6.22c.414 0 .89.47.89.833v3.334c0 .364-.476.833-.89.833H4.89c-.414 0-.89-.47-.89-.833V7.833zM4 18.5c0-.828.668-1.5 1.5-1.5h29c.828 0 1.5.666 1.5 1.5 0 .828-.668 1.5-1.5 1.5h-29c-.828 0-1.5-.666-1.5-1.5z\" style=\"fill: #828282\" />\n    </symbol>\n\n    <symbol id=\"iconCheck\" viewBox=\"0 0 42 32\">\n      <title>Check</title>\n      <path class=\"path1\" d=\"M14.379 29.76L39.741 3.415 36.194.001l-21.815 22.79-10.86-11.17L0 15.064z\" />\n    </symbol>\n\n    <symbol id=\"iconLockLoader\" viewBox=\"0 0 28 32\">\n      <title>Lock Loader</title>\n      <path d=\"M6 10V8c0-4.422 3.582-8 8-8 4.41 0 8 3.582 8 8v2h-4V7.995C18 5.79 16.205 4 14 4c-2.21 0-4 1.792-4 3.995V10H6zM.997 14c-.55 0-.997.445-.997.993v16.014c0 .548.44.993.997.993h26.006c.55 0 .997-.445.997-.993V14.993c0-.548-.44-.993-.997-.993H.997z\" />\n    </symbol>\n\n    <symbol id=\"iconError\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n      <path d=\"M0 0h24v24H0z\" style=\"fill: none\" />\n      <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\" />\n    </symbol>\n\n    <symbol id=\"logoApplePay\" viewBox=\"0 0 165.52 105.97\" width=\"24\">\n      <title>Apple Pay Logo</title>\n      <defs>\n      <style>\n        .cls-1{fill:#231f20;}.cls-2{fill:#fff;}\n      </style>\n      </defs>\n      <path id=\"_Path_\" data-name=\"&lt;Path&gt;\" class=\"cls-1\" d=\"M150.7 0h-139a20.78 20.78 0 0 0-3.12.3 10.51 10.51 0 0 0-3 1 9.94 9.94 0 0 0-4.31 4.32 10.46 10.46 0 0 0-1 3A20.65 20.65 0 0 0 0 11.7v82.57a20.64 20.64 0 0 0 .3 3.11 10.46 10.46 0 0 0 1 3 9.94 9.94 0 0 0 4.35 4.35 10.47 10.47 0 0 0 3 1 20.94 20.94 0 0 0 3.11.27h142.06a21 21 0 0 0 3.11-.27 10.48 10.48 0 0 0 3-1 9.94 9.94 0 0 0 4.35-4.35 10.4 10.4 0 0 0 1-3 20.63 20.63 0 0 0 .27-3.11V11.69a20.64 20.64 0 0 0-.27-3.11 10.4 10.4 0 0 0-1-3 9.94 9.94 0 0 0-4.35-4.35 10.52 10.52 0 0 0-3-1 20.84 20.84 0 0 0-3.1-.23h-1.43z\"/>\n      <path id=\"_Path_2\" data-name=\"&lt;Path&gt;\" class=\"cls-2\" d=\"M150.7 3.53h3.03a17.66 17.66 0 0 1 2.58.22 7 7 0 0 1 2 .65 6.41 6.41 0 0 1 2.8 2.81 6.88 6.88 0 0 1 .64 2 17.56 17.56 0 0 1 .22 2.58v82.38a17.54 17.54 0 0 1-.22 2.59 6.85 6.85 0 0 1-.64 2 6.41 6.41 0 0 1-2.81 2.81 6.92 6.92 0 0 1-2 .65 18 18 0 0 1-2.57.22H11.79a18 18 0 0 1-2.58-.22 6.94 6.94 0 0 1-2-.65 6.41 6.41 0 0 1-2.8-2.8 6.93 6.93 0 0 1-.65-2 17.47 17.47 0 0 1-.22-2.58v-82.4a17.49 17.49 0 0 1 .22-2.59 6.92 6.92 0 0 1 .65-2 6.41 6.41 0 0 1 2.8-2.8 7 7 0 0 1 2-.65 17.63 17.63 0 0 1 2.58-.22H150.7\"/>\n      <g id=\"_Group_\" data-name=\"&lt;Group&gt;\">\n      <g id=\"_Group_2\" data-name=\"&lt;Group&gt;\">\n      <path id=\"_Path_3\" data-name=\"&lt;Path&gt;\" class=\"cls-1\" d=\"M43.51 35.77a9.15 9.15 0 0 0 2.1-6.52 9.07 9.07 0 0 0-6 3.11 8.56 8.56 0 0 0-2.16 6.27 7.57 7.57 0 0 0 6.06-2.86\"/>\n      <path id=\"_Path_4\" data-name=\"&lt;Path&gt;\" class=\"cls-1\" d=\"M45.59 39.08c-3.35-.2-6.2 1.9-7.79 1.9s-4-1.8-6.7-1.75a9.87 9.87 0 0 0-8.4 5.1c-3.6 6.2-.95 15.4 2.55 20.45 1.7 2.5 3.75 5.25 6.45 5.15s3.55-1.65 6.65-1.65 4 1.65 6.7 1.6 4.55-2.5 6.25-5a22.2 22.2 0 0 0 2.8-5.75 9.08 9.08 0 0 1-5.45-8.25A9.26 9.26 0 0 1 53 43.13a9.57 9.57 0 0 0-7.45-4\"/>\n      </g>\n      <g id=\"_Group_3\" data-name=\"&lt;Group&gt;\">\n      <path id=\"_Compound_Path_\" data-name=\"&lt;Compound Path&gt;\" class=\"cls-1\" d=\"M79 32.11c7.28 0 12.35 5 12.35 12.32S86.15 56.8 78.79 56.8h-8.06v12.82h-5.82V32.11zm-8.27 19.81h6.68c5.07 0 8-2.73 8-7.46S82.48 37 77.44 37h-6.71z\"/>\n      <path id=\"_Compound_Path_2\" data-name=\"&lt;Compound Path&gt;\" class=\"cls-1\" d=\"M92.76 61.85c0-4.81 3.67-7.56 10.42-8l7.25-.44v-2.06c0-3-2-4.7-5.56-4.7-2.94 0-5.07 1.51-5.51 3.82h-5.24c.16-4.86 4.73-8.4 10.92-8.4 6.65 0 11 3.48 11 8.89v18.66h-5.38v-4.5h-.13a9.59 9.59 0 0 1-8.58 4.78c-5.42 0-9.19-3.22-9.19-8.05zm17.68-2.42v-2.11l-6.47.42c-3.64.23-5.54 1.59-5.54 4s2 3.77 5.07 3.77c3.95-.05 6.94-2.57 6.94-6.08z\"/>\n      <path id=\"_Compound_Path_3\" data-name=\"&lt;Compound Path&gt;\" class=\"cls-1\" d=\"M121 79.65v-4.5a17.14 17.14 0 0 0 1.72.1c2.57 0 4-1.09 4.91-3.9l.52-1.66-9.88-27.29h6.08l6.86 22.15h.13l6.86-22.15h5.93l-10.21 28.67c-2.34 6.58-5 8.73-10.68 8.73a15.93 15.93 0 0 1-2.24-.15z\"/>\n      </g>\n      </g>\n    </symbol>\n    <symbol id=\"logoGooglePay\" viewBox=\"0 0 60.51 24.04\">\n      <title>GooglePay_AcceptanceMark_RGB_60x24pt</title>\n      <path d=\"M28.67,11.76v7H26.43V1.42h5.92a5.39,5.39,0,0,1,3.84,1.51A5,5,0,0,1,36.44,10l-.25.26a5.35,5.35,0,0,1-3.84,1.48Zm0-8.2V9.62H32.4a2.93,2.93,0,0,0,2.21-.9A3,3,0,0,0,32.4,3.56Z\" fill=\"#5f6368\"/>\n      <path d=\"M42.93,6.52a5.56,5.56,0,0,1,3.91,1.32,4.71,4.71,0,0,1,1.43,3.63v7.32H46.13V17.14H46a4.28,4.28,0,0,1-3.69,2A4.83,4.83,0,0,1,39.06,18a3.74,3.74,0,0,1-1.32-2.92,3.52,3.52,0,0,1,1.39-2.93,5.87,5.87,0,0,1,3.73-1.09,6.65,6.65,0,0,1,3.27.72v-.51a2.5,2.5,0,0,0-.92-2,3.17,3.17,0,0,0-2.16-.81,3.4,3.4,0,0,0-2.95,1.57l-2-1.23A5.45,5.45,0,0,1,42.93,6.52ZM40,15.15a1.82,1.82,0,0,0,.74,1.46,2.74,2.74,0,0,0,1.74.58,3.58,3.58,0,0,0,2.51-1,3.26,3.26,0,0,0,1.11-2.45,4.54,4.54,0,0,0-2.91-.83,3.74,3.74,0,0,0-2.27.66A2,2,0,0,0,40,15.15Z\" fill=\"#5f6368\"/>\n      <path d=\"M60.52,6.9,53.07,24H50.76l2.77-6L48.63,6.91h2.43l3.54,8.54h0l3.44-8.54Z\" fill=\"#5f6368\"/>\n      <path d=\"M19.65,10.24a12.54,12.54,0,0,0-.17-2H10.06v3.84h5.39a4.61,4.61,0,0,1-2,3v2.49h3.22A9.75,9.75,0,0,0,19.65,10.24Z\" fill=\"#4285f4\"/>\n      <path d=\"M10.06,20a9.54,9.54,0,0,0,6.62-2.41l-3.22-2.49a6,6,0,0,1-3.4.95,6,6,0,0,1-5.6-4.12H1.15V14.5A10,10,0,0,0,10.06,20Z\" fill=\"#34a853\"/>\n      <path d=\"M4.46,11.92a6,6,0,0,1,0-3.82V5.53H1.15a10,10,0,0,0,0,9Z\" fill=\"#fbbc04\"/>\n      <path d=\"M10.06,4a5.44,5.44,0,0,1,3.83,1.5h0l2.85-2.85A9.58,9.58,0,0,0,10.06,0a10,10,0,0,0-8.91,5.5L4.46,8.1A6,6,0,0,1,10.06,4Z\" fill=\"#ea4335\"/>\n    </symbol>\n\n    <symbol id=\"logoVenmo\" viewBox=\"0 0 48 32\">\n      <title>Venmo</title>\n      <g fill=\"none\" fill-rule=\"evenodd\">\n        <rect fill=\"#3D95CE\" width=\"47.4074074\" height=\"31.6049383\" rx=\"3.16049383\"/>\n        <path d=\"M33.1851852,10.1131555 C33.1851852,14.8373944 29.2425262,20.9745161 26.0425868,25.2839506 L18.7337285,25.2839506 L15.8024691,7.35534396 L22.202175,6.73384536 L23.7519727,19.4912014 C25.2000422,17.0781163 26.9870326,13.2859484 26.9870326,10.7005 C26.9870326,9.28531656 26.7500128,8.32139205 26.3796046,7.52770719 L32.207522,6.32098765 C32.8813847,7.45939896 33.1851852,8.63196439 33.1851852,10.1131555 Z\" fill=\"#FFF\"/>\n      </g>\n    </symbol>\n    <symbol id=\"buttonVenmo\" viewBox=\"0 0 295 42\">\n      <g fill=\"none\" fill-rule=\"evenodd\">\n        <rect fill=\"#3D95CE\" width=\"295\" height=\"42\" rx=\"3\"/>\n        <path d=\"M11.3250791 0C11.7902741.780434316 12 1.58428287 12 2.59970884 12 5.838396 9.27822123 10.0456806 7.06917212 13L2.02356829 13 0 .709099732 4.41797878.283033306 5.48786751 9.02879887C6.48752911 7.3745159 7.72116169 4.77480706 7.72116169 3.00236102 7.72116169 2.03218642 7.55753727 1.37137098 7.30182933.827262801L11.3250791 0 11.3250791 0zM17.5051689 5.68512193C18.333931 5.68512193 20.4203856 5.28483546 20.4203856 4.03281548 20.4203856 3.43161451 20.0177536 3.13172102 19.5432882 3.13172102 18.7131868 3.13172102 17.6238766 4.18269796 17.5051689 5.68512193L17.5051689 5.68512193zM17.4102028 8.1647385C17.4102028 9.69351403 18.2153451 10.293301 19.2827401 10.293301 20.4451012 10.293301 21.5580312 9.99340752 23.0045601 9.21725797L22.4597224 13.1234575C21.440541 13.649203 19.8521716 14 18.310433 14 14.3996547 14 13 11.49596 13 8.36552446 13 4.30815704 15.2767521 0 19.9706358 0 22.554932 0 24 1.52864698 24 3.65720949 24.0002435 7.08869546 19.8287953 8.13992948 17.4102028 8.1647385L17.4102028 8.1647385zM37 2.84753211C37 3.32189757 36.9261179 4.00994664 36.8526108 4.45959542L35.4649774 12.9998782 30.9621694 12.9998782 32.2279161 5.1711436C32.2519185 4.95879931 32.3256755 4.53131032 32.3256755 4.29412759 32.3256755 3.72466988 31.9603904 3.5825794 31.5212232 3.5825794 30.9379171 3.5825794 30.3532359 3.84326124 29.9638234 4.03356751L28.5281854 13 24 13 26.0686989.213683657 29.9878258.213683657 30.0374555 1.23425123C30.9620444.641294408 32.1795365 3.90379019e-8 33.9069526 3.90379019e-8 36.1955476-.000243475057 37 1.1387937 37 2.84753211L37 2.84753211zM51.2981937 1.39967969C52.6582977.49918987 53.9425913 0 55.7133897 0 58.1518468 0 59 1.13900518 59 2.84769558 59 3.32204771 58.9223438 4.01007745 58.8448195 4.4597136L57.3830637 12.9997565 52.6328518 12.9997565 53.9932194 5.00577861C54.0182698 4.792101 54.0708756 4.53142648 54.0708756 4.36608506 54.0708756 3.72493046 53.6854953 3.58272222 53.2224587 3.58272222 52.6325881 3.58272222 52.0429812 3.81989829 51.6052587 4.03369766L50.0914245 12.9998782 45.3423992 12.9998782 46.7027668 5.00590037C46.7278172 4.79222275 46.7788409 4.53154824 46.7788409 4.36620681 46.7788409 3.72505221 46.3933287 3.58284398 45.9318743 3.58284398 45.3153711 3.58284398 44.7000546 3.84351849 44.2893602 4.03381941L42.7740757 13 38 13 40.1814929.214042876 44.2643098.214042876 44.3925941 1.28145692C45.3423992.641763367 46.6253743.000487014507 48.3452809.000487014507 49.8344603 0 50.8094476.593061916 51.2981937 1.39967969L51.2981937 1.39967969zM67.5285327 5.39061542C67.5285327 4.29258876 67.2694573 3.54396333 66.4936812 3.54396333 64.7759775 3.54396333 64.4232531 6.76273249 64.4232531 8.4093242 64.4232531 9.65848482 64.7530184 10.4315735 65.5285529 10.4315735 67.1521242 10.4315735 67.5285327 7.03707905 67.5285327 5.39061542L67.5285327 5.39061542zM60 8.21054461C60 3.96893154 62.1170713 0 66.988027 0 70.6583423 0 72 2.29633967 72 5.46592624 72 9.65835674 69.905767 14 64.9173573 14 61.2233579 14 60 11.4294418 60 8.21054461L60 8.21054461z\" transform=\"translate(112 14)\" fill=\"#FFF\"/>\n      </g>\n    </symbol>\n\n    <symbol id=\"iconClose\" width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" overflow=\"visible\">\n      <path d=\"M16 5.414L14.586 4 10 8.586 5.414 4 4 5.414 8.586 10 4 14.586 5.414 16 10 11.414 14.586 16 16 14.586 11.414 10\"/>\n    </symbol>\n  </defs>\n</svg>\n";

var UPDATABLE_CONFIGURATION_OPTIONS = [
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit,
  paymentOptionIDs.applePay,
  paymentOptionIDs.googlePay,
  'threeDSecure'
];
var UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED = [
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit,
  paymentOptionIDs.applePay,
  paymentOptionIDs.googlePay
];
var DEFAULT_CHECKOUTJS_LOG_LEVEL = 'warn';
var VERSION = "1.10.0";

/**
 * @typedef {object} Dropin~cardPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the card.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, e.g. Visa, Mastercard.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard` when the method requested is a card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 * @property {?boolean} liablityShifted If 3D Secure is configured, whether or not liability did shift.
 * @property {?boolean} liablityShiftPossible If 3D Secure is configured, whether or not liability shift is possible.
 */

/**
 * @typedef {object} Dropin~paypalPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the PayPal account.
 * @property {object} details Additional PayPal account details. See a full list of details in the [PayPal client reference](http://braintree.github.io/braintree-web/{@pkg bt-web-version}/PayPalCheckout.html#~tokenizePayload).
 * @property {string} type The payment method type, always `PayPalAccount` when the method requested is a PayPal account.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~applePayPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the Apple Pay provided card.
 * @property {string} details.cardType Type of card, ex: Visa, Mastercard.
 * @property {string} details.cardHolderName The name of the card holder.
 * @property {string} details.dpanLastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `ApplePayCard` when the method requested is an Apple Pay provided card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~venmoPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the Venmo account.
 * @property {string} details.username The Venmo username.
 * @property {string} type The payment method type, always `VenmoAccount` when the method requested is a Venmo account.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} Dropin~googlePayPaymentMethodPayload
 * @property {string} nonce The payment method nonce, used by your server to charge the Google Pay card.
 * @property {string} details.cardType Type of card, ex: Visa, Mastercard.
 * @property {string} details.lastFour The last 4 digits of the card.
 * @property {string} details.lastTwo The last 2 digits of the card.
 * @param {external:GooglePayPaymentData} details.rawPaymentData The raw response back from the Google Pay flow, which includes shipping address, phone and email if passed in as required parameters.
 * @property {string} type The payment method type, always `AndroidPayCard` when the method requested is a Google Pay Card.
 * @property {object} binData Information about the card based on the bin. Documented {@link Dropin~binData|here}.
 * @property {?string} deviceData If data collector is configured, the device data property to be used when making a transaction.
 */

/**
 * @typedef {object} GooglePayPaymentData A [Google Pay Payment Data object](https://developers.google.com/pay/api/web/object-reference#PaymentData).
 * @external GooglePayPaymentData
 * @see {@link https://developers.google.com/pay/api/web/object-reference#PaymentData PaymentData}
 */

/**
 * @typedef {object} Dropin~binData Information about the card based on the bin.
 * @property {string} commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} countryOfIssuance The country of issuance.
 * @property {string} debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} issuingBank The issuing bank.
 * @property {string} payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} productId The product id.
 */

/**
 * @name Dropin#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. `event` should be one of the following:
 *  * [`paymentMethodRequestable`](#event:paymentMethodRequestable)
 *  * [`noPaymentMethodRequestable`](#event:noPaymentMethodRequestable)
 *  * [`paymentOptionSelected`](#event:paymentOptionSelected)
 * @returns {void}
 * @example
 * <caption>Dynamically enable or disable your submit button based on whether or not the payment method is requestable</caption>
 * var submitButton = document.querySelector('#submit-button');
 *
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   submitButton.addEventListener('click', function () {
 *     dropinInstance.requestPaymentMethod(function (err, payload) {
 *       // Send payload.nonce to your server.
 *     });
 *   });
 *
 *   if (dropinInstance.isPaymentMethodRequestable()) {
 *     // This will be true if you generated the client token
 *     // with a customer ID and there is a saved payment method
 *     // available to tokenize with that customer.
 *     submitButton.removeAttribute('disabled');
 *   }
 *
 *   dropinInstance.on('paymentMethodRequestable', function (event) {
 *     console.log(event.type); // The type of Payment Method, e.g 'CreditCard', 'PayPalAccount'.
 *     console.log(event.paymentMethodIsSelected); // true if a customer has selected a payment method when paymentMethodRequestable fires
 *
 *     submitButton.removeAttribute('disabled');
 *   });
 *
 *   dropinInstance.on('noPaymentMethodRequestable', function () {
 *     submitButton.setAttribute('disabled', true);
 *   });
 * });
 * @example
 * <caption>Automatically submit nonce to server as soon as it becomes available</caption>
 * var submitButton = document.querySelector('#submit-button');
 *
 * braintree.dropin.create({
 *   authorization: 'CLIENT_AUTHORIZATION',
 *   container: '#dropin-container'
 * }, function (err, dropinInstance) {
 *   function sendNonceToServer() {
 *     dropinInstance.requestPaymentMethod(function (err, payload) {
 *       if (err) {
 *         // handle errors
 *       }
 *
 *       // send payload.nonce to your server
 *     });
 *   }
 *
 *   // allows us to still request the payment method manually, such as
 *   // when filling out a credit card form
 *   submitButton.addEventListener('click', sendNonceToServer);
 *
 *   dropinInstance.on('paymentMethodRequestable', function (event) {
 *     // if the nonce is already available (via PayPal authentication
 *     // or by using a stored payment method), we can request the
 *     // nonce right away. Otherwise, we wait for the customer to
 *     // request the nonce by pressing the submit button once they
 *     // are finished entering their credit card details
 *     if (event.paymentMethodIsSelected) {
 *       sendNonceToServer();
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the payment method available in Drop-in changes. This includes when the state of Drop-in transitions from having no payment method available to having a payment method available and when the payment method available changes. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}.
 * @event Dropin#paymentMethodRequestable
 * @type {Dropin~paymentMethodRequestablePayload}
 */

/**
 * @typedef {object} Dropin~paymentMethodRequestablePayload
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:paymentMethodRequestable|`paymentMethodRequestable`} event.
 * @property {string} type The type of payment method that is requestable. Either `CreditCard` or `PayPalAccount`.
 * @property {boolean} paymentMethodIsSelected A property to determine if a payment method is currently selected when the payment method becomes requestable.
 *
 * This will be `true` any time a payment method is visably selected in the Drop-in UI, such as when PayPal authentication completes or a stored payment method is selected.
 *
 * This will be `false` when {@link Dropin#requestPaymentMethod|`requestPaymentMethod`} can be called, but a payment method is not currently selected. For instance, when a card form has been filled in with valid values, but has not been submitted to be converted into a payment method nonce.
 */

/**
 * This event is emitted when there is no payment method available in Drop-in. This event is not fired if there is no payment method available on initialization. To check if there is a payment method requestable on initialization, use {@link Dropin#isPaymentMethodRequestable|`isPaymentMethodRequestable`}. No payload is available in the callback for this event.
 * @event Dropin#noPaymentMethodRequestable
 */

/**
 * This event is emitted when the customer selects a new payment option type (e.g. PayPal, PayPal Credit, credit card). This event is not emitted when the user changes between existing saved payment methods. Only relevant when accepting multiple payment options.
 * @event Dropin#paymentOptionSelected
 * @type {Dropin~paymentOptionSelectedPayload}
 */

/**
 * @typedef {object} Dropin~paymentOptionSelectedPayload
 * @description The event payload sent from {@link Dropin#on|`on`} with the {@link Dropin#event:paymentOptionSelected|`paymentOptionSelected`} event.
 * @property {string} paymentOption The payment option view selected. Either `card`, `paypal`, or `paypalCredit`.
 */

/**
 * @class
 * @param {object} options For create options, see {@link module:braintree-web-drop-in|dropin.create}.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web-drop-in|dropin.create} instead.</strong>
 * @classdesc This class represents a Drop-in component, that will create a pre-made UI for accepting cards and PayPal on your page. Instances of this class have methods for requesting a payment method and subscribing to events. For more information, see the [Drop-in guide](https://developers.braintreepayments.com/guides/drop-in/javascript/v3) in the Braintree Developer Docs. To be used in conjunction with the [Braintree Server SDKs](https://developers.braintreepayments.com/start/hello-server/).
 */
function Dropin(options) {
  this._client = options.client;
  this._componentID = uuid();
  this._dropinWrapper = document.createElement('div');
  this._dropinWrapper.id = 'braintree--dropin__' + this._componentID;
  this._dropinWrapper.setAttribute('data-braintree-id', 'wrapper');
  this._dropinWrapper.style.display = 'none';
  this._dropinWrapper.className = 'braintree-loading';
  this._merchantConfiguration = options.merchantConfiguration;

  EventEmitter.call(this);
}

Dropin.prototype = Object.create(EventEmitter.prototype, {
  constructor: Dropin
});

Dropin.prototype._initialize = function (callback) {
  var localizedStrings, localizedHTML, paypalScriptOptions;
  var self = this;
  var container = self._merchantConfiguration.container || self._merchantConfiguration.selector;
  var setupPromise = Promise.resolve();

  self._injectStylesheet();

  if (!container) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('options.container is required.'));
    return;
  } else if (self._merchantConfiguration.container && self._merchantConfiguration.selector) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('Must only have one options.selector or options.container.'));
    return;
  }

  if (typeof container === 'string') {
    container = document.querySelector(container);
  }

  if (!container || container.nodeType !== 1) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('options.selector or options.container must reference a valid DOM node.'));
    return;
  }

  if (container.innerHTML.trim()) {
    analytics.sendEvent(self._client, 'configuration-error');
    callback(new DropinError('options.selector or options.container must reference an empty DOM node.'));
    return;
  }

  // Backfill with `en`
  self._strings = assign({}, translations.en);
  if (self._merchantConfiguration.locale) {
    localizedStrings = translations[self._merchantConfiguration.locale] || translations[self._merchantConfiguration.locale.split('_')[0]];
    // Fill `strings` with `localizedStrings` that may exist
    self._strings = assign(self._strings, localizedStrings);
  }

  if (!isUtf8()) {
    // non-utf-8 encodings often don't support the bullet character
    self._strings.endingIn = self._strings.endingIn.replace(/•/g, '*');
  }

  if (self._merchantConfiguration.translations) {
    Object.keys(self._merchantConfiguration.translations).forEach(function (key) {
      self._strings[key] = sanitizeHtml(self._merchantConfiguration.translations[key]);
    });
  }

  localizedHTML = Object.keys(self._strings).reduce(function (result, stringKey) {
    var stringValue = self._strings[stringKey];

    return result.replace(RegExp('{{' + stringKey + '}}', 'g'), stringValue);
  }, mainHTML);

  self._dropinWrapper.innerHTML = svgHTML + localizedHTML;
  container.appendChild(self._dropinWrapper);

  self._getVaultedPaymentMethods().then(function (paymentMethods) {
    self._model = new DropinModel({
      client: self._client,
      componentID: self._componentID,
      merchantConfiguration: self._merchantConfiguration,
      paymentMethods: paymentMethods
    });

    return self._model.initialize();
  }).then(function () {
    var paypalRequired;

    self._model.on('cancelInitialization', function (err) {
      self._dropinWrapper.innerHTML = '';
      analytics.sendEvent(self._client, 'load-error');
      callback(err);
    });

    self._model.on('asyncDependenciesReady', function () {
      if (self._model.dependencySuccessCount >= 1) {
        analytics.sendEvent(self._client, 'appeared');
        self._disableErroredPaymentMethods();

        self._handleAppSwitch();

        callback(null, self);
      } else {
        self._model.cancelInitialization(new DropinError('All payment options failed to load.'));
      }
    });

    self._model.on('paymentMethodRequestable', function (event) {
      self._emit('paymentMethodRequestable', event);
    });

    self._model.on('noPaymentMethodRequestable', function () {
      self._emit('noPaymentMethodRequestable');
    });

    self._model.on('paymentOptionSelected', function (event) {
      self._emit('paymentOptionSelected', event);
    });

    paypalRequired = self._supportsPaymentOption(paymentOptionIDs.paypal) || self._supportsPaymentOption(paymentOptionIDs.paypalCredit);

    if (paypalRequired && !global.paypal) {
      paypalScriptOptions = {
        src: constants.CHECKOUT_JS_SOURCE,
        id: constants.PAYPAL_CHECKOUT_SCRIPT_ID,
        dataAttributes: {
          'log-level': self._merchantConfiguration.paypal && self._merchantConfiguration.paypal.logLevel || DEFAULT_CHECKOUTJS_LOG_LEVEL
        }
      };

      setupPromise = setupPromise.then(function () {
        return assets.loadScript(self._dropinWrapper, paypalScriptOptions);
      });
    }

    return setupPromise;
  }).then(function () {
    return self._setUpDependenciesAndViews();
  }).catch(function (err) {
    self.teardown().then(function () {
      callback(err);
    });
  });
};

/**
 * Modify your configuration intially set in {@link module:braintree-web-drop-in|`dropin.create`}.
 *
 * If `updateConfiguration` is called after a user completes the PayPal authorization flow, any PayPal accounts not stored in the Vault record will be removed.
 * @public
 * @param {string} property The top-level property to update. Either `paypal`, `paypalCredit`, `applePay`, or `googlePay`.
 * @param {string} key The key of the property to update, such as `amount` or `currency`.
 * @param {any} value The value of the property to update. Must be the type of the property specified in {@link module:braintree-web-drop-in|`dropin.create`}.
 * @returns {void}
 * @example
 * dropinInstance.updateConfiguration('paypal', 'amount', '10.00');
 */
Dropin.prototype.updateConfiguration = function (property, key, value) {
  if (UPDATABLE_CONFIGURATION_OPTIONS.indexOf(property) === -1) {
    return;
  }

  if (property === 'threeDSecure') {
    if (this._threeDSecure) {
      this._threeDSecure.updateConfiguration(key, value);
    }

    return;
  }

  this._mainView.getView(property).updateConfiguration(key, value);

  if (UPDATABLE_CONFIGURATION_OPTIONS_THAT_REQUIRE_UNVAULTED_PAYMENT_METHODS_TO_BE_REMOVED.indexOf(property) === -1) {
    return;
  }

  this._removeUnvaultedPaymentMethods(function (paymentMethod) {
    return paymentMethod.type === constants.paymentMethodTypes[property];
  });
  this._navigateToInitialView();
};

/**
 * Removes the currently selected payment method and returns the customer to the payment options view. Does not remove vaulted payment methods.
 * @public
 * @returns {void}
 * @example
 * dropinInstance.requestPaymentMethod(function (requestPaymentMethodError, payload) {
 *   if (requestPaymentMethodError) {
 *     // handle errors
 *     return;
 *   }
 *
 *   functionToSendNonceToServer(payload.nonce, function (transactionError, response) {
 *     if (transactionError) {
 *       // transaction sale with selected payment method failed
 *       // clear the selected payment method and add a message
 *       // to the checkout page about the failure
 *       dropinInstance.clearSelectedPaymentMethod();
 *       divForErrorMessages.textContent = 'my error message about entering a different payment method.';
 *     } else {
 *       // redirect to success page
 *     }
 *   });
 * });
 */
Dropin.prototype.clearSelectedPaymentMethod = function () {
  this._removeUnvaultedPaymentMethods();

  this._navigateToInitialView();

  this._model.removeActivePaymentMethod();
};

Dropin.prototype._setUpDataCollector = function () {
  var self = this;
  var config = assign({}, self._merchantConfiguration.dataCollector, {client: self._client});

  this._model.asyncDependencyStarting();
  global.braintree.dataCollector.create(config).then(function (instance) {
    self._dataCollectorInstance = instance;
    self._model.asyncDependencyReady();
  }).catch(function (err) {
    self._model.cancelInitialization(new DropinError({
      message: 'Data Collector failed to set up.',
      braintreeWebError: err
    }));
  });
};

Dropin.prototype._setUpThreeDSecure = function () {
  var self = this;
  var config = assign({}, this._merchantConfiguration.threeDSecure);

  this._model.asyncDependencyStarting();

  this._threeDSecure = new ThreeDSecure(this._client, config, this._strings.cardVerification);

  this._threeDSecure.initialize().then(function () {
    self._model.asyncDependencyReady();
  }).catch(function (err) {
    self._model.cancelInitialization(new DropinError({
      message: '3D Secure failed to set up.',
      braintreeWebError: err
    }));
  });
};

Dropin.prototype._setUpDependenciesAndViews = function () {
  var braintreeWebVersion, dataCollectorScriptOptions;

  if (this._merchantConfiguration.dataCollector && !document.querySelector('#' + constants.DATA_COLLECTOR_SCRIPT_ID)) {
    braintreeWebVersion = this._client.getVersion();
    dataCollectorScriptOptions = {
      src: 'https://js.braintreegateway.com/web/' + braintreeWebVersion + '/js/data-collector.min.js',
      id: constants.DATA_COLLECTOR_SCRIPT_ID
    };

    assets.loadScript(this._dropinWrapper, dataCollectorScriptOptions).then(this._setUpDataCollector.bind(this));
  }

  if (this._merchantConfiguration.threeDSecure) {
    this._setUpThreeDSecure();
  }

  this._mainView = new MainView({
    client: this._client,
    element: this._dropinWrapper,
    model: this._model,
    strings: this._strings
  });
};

Dropin.prototype._removeUnvaultedPaymentMethods = function (filter) {
  filter = filter || function () { return true; };

  this._model.getPaymentMethods().forEach(function (paymentMethod) {
    if (filter(paymentMethod) && !paymentMethod.vaulted) {
      this._model.removePaymentMethod(paymentMethod);
    }
  }.bind(this));
};

Dropin.prototype._navigateToInitialView = function () {
  var hasNoSavedPaymentMethods, hasOnlyOneSupportedPaymentOption;
  var isOnMethodsView = this._mainView.primaryView.ID === paymentMethodsViewID;

  if (isOnMethodsView) {
    hasNoSavedPaymentMethods = this._model.getPaymentMethods().length === 0;

    if (hasNoSavedPaymentMethods) {
      hasOnlyOneSupportedPaymentOption = this._model.supportedPaymentOptions.length === 1;

      if (hasOnlyOneSupportedPaymentOption) {
        this._mainView.setPrimaryView(this._model.supportedPaymentOptions[0]);
      } else {
        this._mainView.setPrimaryView(paymentOptionsViewID);
      }
    }
  }
};

Dropin.prototype._supportsPaymentOption = function (paymentOption) {
  return this._model.supportedPaymentOptions.indexOf(paymentOption) !== -1;
};

Dropin.prototype._disableErroredPaymentMethods = function () {
  var paymentMethodOptionsElements;
  var failedDependencies = Object.keys(this._model.failedDependencies);

  if (failedDependencies.length === 0) {
    return;
  }

  paymentMethodOptionsElements = this._mainView.getOptionsElements();

  failedDependencies.forEach(function (paymentMethodId) {
    var element = paymentMethodOptionsElements[paymentMethodId];
    var div = element.div;
    var clickHandler = element.clickHandler;
    var error = this._model.failedDependencies[paymentMethodId];
    var errorMessageDiv = div.querySelector('.braintree-option__disabled-message');

    div.classList.add('braintree-disabled');
    div.removeEventListener('click', clickHandler);
    if (error.code === 'PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED') {
      errorMessageDiv.innerHTML = constants.errors.PAYPAL_NON_LINKED_SANDBOX;
    } else {
      errorMessageDiv.innerHTML = error.message;
    }
  }.bind(this));
};

Dropin.prototype._handleAppSwitch = function () {
  if (this._model.appSwitchError) {
    this._mainView.setPrimaryView(this._model.appSwitchError.id);
    this._model.reportError(this._model.appSwitchError.error);
  } else if (this._model.appSwitchPayload) {
    this._model.addPaymentMethod(this._model.appSwitchPayload);
  }
};

/**
 * Requests a payment method object which includes the payment method nonce used by by the [Braintree Server SDKs](https://developers.braintreepayments.com/start/hello-server/).
 *
 * If a payment method is not available, an error will appear in the UI. When a callback is used, an error will be passed to it. If no callback is used, the returned Promise will be rejected with an error.
 * @public
 * @param {callback} [callback] The first argument will be an error if no payment method is available and will otherwise be null. The second argument will be an object containing a payment method nonce; either a {@link Dropin~cardPaymentMethodPayload|cardPaymentMethodPayload}, a {@link Dropin~paypalPaymentMethodPayload|paypalPaymentMethodPayload}, a {@link Dropin~venmoPaymentMethodPayload|venmoPaymentMethodPayload}, a {@link Dropin~googlePayPaymentMethodPayload|googlePayPaymentMethodPayload} or an {@link Dropin~applePayPaymentMethodPayload|applePayPaymentMethodPayload}. If no callback is provided, `requestPaymentMethod` will return a promise.
 * @returns {void|Promise} Returns a promise if no callback is provided.
 * @example <caption>Requesting a payment method</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // handle error
 *      return;
 *    }
 *    hiddenNonceInput.value = payload.nonce;
 *    form.submit();
 *  });
 * });
 * @example <caption>Requesting a payment method with data collector</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 * var hiddenDeviceDataInput = document.querySelector('#my-device-data-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // handle error
 *      return;
 *    }
 *    hiddenNonceInput.value = payload.nonce;
 *    hiddenDeviceDataInput.value = payload.deviceData;
 *    form.submit();
 *  });
 * });
 *
 * @example <caption>Requesting a payment method with 3D Secure</caption>
 * var form = document.querySelector('#my-form');
 * var hiddenNonceInput = document.querySelector('#my-nonce-input');
 *
 * form.addEventListener('submit', function (event) {
 *  event.preventDefault();
 *
 *  dropinInstance.requestPaymentMethod(function (err, payload) {
 *    if (err) {
 *      // Handle error
 *      return;
 *    }
 *
 *    if (payload.liabilityShifted || payload.type !== 'CreditCard') {
 *      hiddenNonceInput.value = payload.nonce;
 *      form.submit();
 *    } else {
 *      // Decide if you will force the user to enter a different payment method
 *      // if liablity was not shifted
 *      dropinInstance.clearSelectedPaymentMethod();
 *    }
 *  });
 * });
 */
Dropin.prototype.requestPaymentMethod = function () {
  return this._mainView.requestPaymentMethod().then(function (payload) {
    if (this._threeDSecure && payload.type === constants.paymentMethodTypes.card && payload.liabilityShifted == null) {
      return this._threeDSecure.verify(payload.nonce).then(function (newPayload) {
        payload.nonce = newPayload.nonce;
        payload.liabilityShifted = newPayload.liabilityShifted;
        payload.liabilityShiftPossible = newPayload.liabilityShiftPossible;

        return payload;
      });
    }

    return payload;
  }.bind(this)).then(function (payload) {
    if (this._dataCollectorInstance) {
      payload.deviceData = this._dataCollectorInstance.deviceData;
    }
    return payload;
  }.bind(this)).then(function (payload) {
    return formatPaymentMethodPayload(payload);
  });
};

Dropin.prototype._removeStylesheet = function () {
  var stylesheet = document.getElementById(constants.STYLESHEET_ID);

  if (stylesheet) {
    stylesheet.parentNode.removeChild(stylesheet);
  }
};

Dropin.prototype._injectStylesheet = function () {
  var stylesheetUrl, assetsUrl;

  if (document.getElementById(constants.STYLESHEET_ID)) { return; }

  assetsUrl = this._client.getConfiguration().gatewayConfiguration.assetsUrl;
  stylesheetUrl = assetsUrl + '/web/dropin/' + VERSION + '/css/dropin.css';

  assets.loadStylesheet({
    href: stylesheetUrl,
    id: constants.STYLESHEET_ID
  });
};

Dropin.prototype._getVaultedPaymentMethods = function () {
  if (isGuestCheckout(this._client)) {
    return Promise.resolve([]);
  }

  return this._client.request({
    endpoint: 'payment_methods',
    method: 'get',
    data: {
      defaultFirst: 1
    }
  }).then(function (paymentMethodsPayload) {
    var paymentMethods = paymentMethodsPayload.paymentMethods.map(function (paymentMethod) {
      paymentMethod.vaulted = true;
      return paymentMethod;
    }).map(formatPaymentMethodPayload);

    return Promise.resolve(paymentMethods);
  }).catch(function () {
    return Promise.resolve([]);
  });
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web-drop-in|dropin.create}. This may be be useful in a single-page app.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` will return a promise.
 * @returns {void|Promise} Returns a promise if no callback is provided.
 */
Dropin.prototype.teardown = function () {
  var mainviewTeardownError, dataCollectorError;
  var promise = Promise.resolve();
  var self = this;

  this._removeStylesheet();

  if (this._mainView) {
    promise.then(function () {
      return self._mainView.teardown().catch(function (err) {
        mainviewTeardownError = err;
      });
    });
  }

  if (this._dataCollectorInstance) {
    promise.then(function () {
      return this._dataCollectorInstance.teardown().catch(function (error) {
        dataCollectorError = new DropinError({
          message: 'Drop-in errored tearing down Data Collector.',
          braintreeWebError: error
        });
      });
    }.bind(this));
  }

  if (this._threeDSecure) {
    promise.then(function () {
      return this._threeDSecure.teardown().catch(function (error) {
        dataCollectorError = new DropinError({
          message: 'Drop-in errored tearing down 3D Secure.',
          braintreeWebError: error
        });
      });
    }.bind(this));
  }

  return promise.then(function () {
    return self._removeDropinWrapper();
  }).then(function () {
    if (mainviewTeardownError) {
      return Promise.reject(mainviewTeardownError);
    } else if (dataCollectorError) {
      return Promise.reject(dataCollectorError);
    }

    return Promise.resolve();
  });
};

/**
 * Returns a boolean indicating if a payment method is available through {@link Dropin#requestPaymentMethod|requestPaymentMethod}. Particularly useful for detecting if using a client token with a customer ID to show vaulted payment methods.
 * @public
 * @returns {Boolean} True if a payment method is available, otherwise false.
 */
Dropin.prototype.isPaymentMethodRequestable = function () {
  return this._model.isPaymentMethodRequestable();
};

Dropin.prototype._removeDropinWrapper = function () {
  this._dropinWrapper.parentNode.removeChild(this._dropinWrapper);

  return Promise.resolve();
};

function formatPaymentMethodPayload(paymentMethod) {
  var formattedPaymentMethod = {
    nonce: paymentMethod.nonce,
    details: paymentMethod.details,
    type: paymentMethod.type
  };

  if (paymentMethod.vaulted != null) {
    formattedPaymentMethod.vaulted = paymentMethod.vaulted;
  }

  if (paymentMethod.type === constants.paymentMethodTypes.card) {
    formattedPaymentMethod.description = paymentMethod.description;
  }

  if (paymentMethod.type === constants.paymentMethodTypes.googlePay) {
    formattedPaymentMethod.details.rawPaymentData = paymentMethod.rawPaymentData;
  }

  if (typeof paymentMethod.liabilityShiftPossible === 'boolean') {
    formattedPaymentMethod.liabilityShifted = paymentMethod.liabilityShifted;
    formattedPaymentMethod.liabilityShiftPossible = paymentMethod.liabilityShiftPossible;
  }

  if (paymentMethod.deviceData) {
    formattedPaymentMethod.deviceData = paymentMethod.deviceData;
  }

  if (paymentMethod.binData) {
    formattedPaymentMethod.binData = paymentMethod.binData;
  }

  return formattedPaymentMethod;
}

module.exports = wrapPrototype(Dropin);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GraphQL = __webpack_require__(107);
var request = __webpack_require__(40);
var isWhitelistedDomain = __webpack_require__(41);
var BraintreeError = __webpack_require__(1);
var convertToBraintreeError = __webpack_require__(42);
var addMetadata = __webpack_require__(43);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);
var once = __webpack_require__(26);
var deferred = __webpack_require__(46);
var assign = __webpack_require__(15).assign;
var analytics = __webpack_require__(7);
var constants = __webpack_require__(127);
var errors = __webpack_require__(47);
var sharedErrors = __webpack_require__(18);
var VERSION = __webpack_require__(17).VERSION;
var methods = __webpack_require__(11);
var convertMethodsToError = __webpack_require__(12);

/**
 * This object is returned by {@link Client#getConfiguration|getConfiguration}. This information is used extensively by other Braintree modules to properly configure themselves.
 * @typedef {object} Client~configuration
 * @property {object} client The braintree-web/client parameters.
 * @property {string} client.authorization A tokenizationKey or clientToken.
 * @property {object} gatewayConfiguration Gateway-supplied configuration.
 * @property {object} analyticsMetadata Analytics-specific data.
 * @property {string} analyticsMetadata.sessionId Uniquely identifies a browsing session.
 * @property {string} analyticsMetadata.sdkVersion The braintree.js version.
 * @property {string} analyticsMetadata.merchantAppId Identifies the merchant's web app.
 */

/**
 * @class
 * @param {Client~configuration} configuration Options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/client.create|braintree.client.create} instead.</strong>
 * @classdesc This class is required by many other Braintree components. It serves as the base API layer that communicates with our servers. It is also capable of being used to formulate direct calls to our servers, such as direct credit card tokenization. See {@link Client#request}.
 */
function Client(configuration) {
  var configurationJSON, gatewayConfiguration, braintreeApiConfiguration;

  configuration = configuration || {};

  configurationJSON = JSON.stringify(configuration);
  gatewayConfiguration = configuration.gatewayConfiguration;

  if (!gatewayConfiguration) {
    throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
  }

  [
    'assetsUrl',
    'clientApiUrl',
    'configUrl'
  ].forEach(function (property) {
    if (property in gatewayConfiguration && !isWhitelistedDomain(gatewayConfiguration[property])) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: property + ' property is on an invalid domain.'
      });
    }
  });

  /**
   * Returns a copy of the configuration values.
   * @public
   * @returns {Client~configuration} configuration
   */
  this.getConfiguration = function () {
    return JSON.parse(configurationJSON);
  };

  this._request = request;
  this._configuration = this.getConfiguration();

  this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + '/v1/';

  braintreeApiConfiguration = gatewayConfiguration.braintreeApi;
  if (braintreeApiConfiguration) {
    this._braintreeApi = {
      baseUrl: braintreeApiConfiguration.url + '/',
      accessToken: braintreeApiConfiguration.accessToken
    };

    if (!isWhitelistedDomain(this._braintreeApi.baseUrl)) {
      throw new BraintreeError({
        type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
        code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
        message: 'braintreeApi URL is on an invalid domain.'
      });
    }
  }

  if (gatewayConfiguration.graphQL) {
    this._graphQL = new GraphQL({
      graphQL: gatewayConfiguration.graphQL
    });
  }
}

/**
 * Used by other modules to formulate all network requests to the Braintree gateway. It is also capable of being used directly from your own form to tokenize credit card information. However, be sure to satisfy PCI compliance if you use direct card tokenization.
 * @public
 * @param {object} options Request options:
 * @param {string} options.method HTTP method, e.g. "get" or "post".
 * @param {string} options.endpoint Endpoint path, e.g. "payment_methods".
 * @param {object} options.data Data to send with the request.
 * @param {number} [options.timeout=60000] Set a timeout (in milliseconds) for the request.
 * @param {callback} [callback] The second argument, <code>data</code>, is the returned server data.
 * @example
 * <caption>Direct Credit Card Tokenization</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-expiration-date'].value,
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @example
 * <caption>Tokenizing Fields for AVS Checks</caption>
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   var form = document.getElementById('my-form-id');
 *   var data = {
 *     creditCard: {
 *       number: form['cc-number'].value,
 *       cvv: form['cc-cvv'].value,
 *       expirationDate: form['cc-date'].value,
 *       // The billing address can be checked with AVS rules.
 *       // See: https://articles.braintreepayments.com/support/guides/fraud-tools/basic/avs-cvv-rules
 *       billingAddress: {
 *         postalCode: form['cc-postal-code'].value,
 *         streetAddress: form['cc-street-address'].value,
 *         countryName: form['cc-country-name'].value,
 *         countryCodeAlpha2: form['cc-country-alpha2'].value,
 *         countryCodeAlpha3: form['cc-country-alpha3'].value,
 *         countryCodeNumeric: form['cc-country-numeric'].value
 *       },
 *       options: {
 *         validate: false
 *       }
 *     }
 *   };
 *
 *   // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
 *   // payment fields cannot be hosted on your checkout page.
 *   // For an alternative to the following, use Hosted Fields.
 *   clientInstance.request({
 *     endpoint: 'payment_methods/credit_cards',
 *     method: 'post',
 *     data: data
 *   }, function (requestErr, response) {
 *     // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
 *     if (requestErr) { throw new Error(requestErr); }
 *
 *     console.log('Got nonce:', response.creditCards[0].nonce);
 *   });
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Client.prototype.request = function (options, callback) {
  var self = this; // eslint-disable-line no-invalid-this
  var requestPromise = new Promise(function (resolve, reject) {
    var optionName, api, baseUrl, requestOptions;

    if (!options.method) {
      optionName = 'options.method';
    } else if (!options.endpoint) {
      optionName = 'options.endpoint';
    }

    if (optionName) {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_REQUIRED.type,
        code: errors.CLIENT_OPTION_REQUIRED.code,
        message: optionName + ' is required when making a request.'
      });
    }

    if ('api' in options) {
      api = options.api;
    } else {
      api = 'clientApi';
    }

    requestOptions = {
      method: options.method,
      graphQL: self._graphQL,
      timeout: options.timeout
    };

    if (api === 'clientApi') {
      baseUrl = self._clientApiBaseUrl;

      requestOptions.data = addMetadata(self._configuration, options.data);
    } else if (api === 'braintreeApi') {
      if (!self._braintreeApi) {
        throw new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
      }

      baseUrl = self._braintreeApi.baseUrl;

      requestOptions.data = options.data;

      requestOptions.headers = {
        'Braintree-Version': constants.BRAINTREE_API_VERSION_HEADER,
        Authorization: 'Bearer ' + self._braintreeApi.accessToken
      };
    } else {
      throw new BraintreeError({
        type: errors.CLIENT_OPTION_INVALID.type,
        code: errors.CLIENT_OPTION_INVALID.code,
        message: 'options.api is invalid.'
      });
    }

    requestOptions.url = baseUrl + options.endpoint;
    requestOptions.sendAnalyticsEvent = function (kind) {
      analytics.sendEvent(self, kind);
    };

    self._request(requestOptions, function (err, data, status) {
      var resolvedData, requestError;

      requestError = formatRequestError(status, err);

      if (requestError) {
        reject(requestError);

        return;
      }

      resolvedData = assign({_httpStatus: status}, data);

      resolve(resolvedData);
    });
  });

  if (typeof callback === 'function') {
    callback = once(deferred(callback));

    requestPromise.then(function (response) {
      callback(null, response, response._httpStatus);
    }).catch(function (err) {
      var status = err && err.details && err.details.httpStatus;

      callback(err, null, status);
    });

    return;
  }

  return requestPromise; // eslint-disable-line consistent-return
};

function formatRequestError(status, err) { // eslint-disable-line consistent-return
  var requestError;

  if (status === -1) {
    requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
  } else if (status === 403) {
    requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
  } else if (status === 429) {
    requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
  } else if (status >= 500) {
    requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
  } else if (status < 200 || status >= 400) {
    requestError = convertToBraintreeError(err, {
      type: errors.CLIENT_REQUEST_ERROR.type,
      code: errors.CLIENT_REQUEST_ERROR.code,
      message: errors.CLIENT_REQUEST_ERROR.message
    });
  }

  if (requestError) {
    requestError.details = requestError.details || {};
    requestError.details.httpStatus = status;

    return requestError;
  }
}

Client.prototype.toJSON = function () {
  return this.getConfiguration();
};

/**
 * Returns the Client version.
 * @public
 * @returns {String} The created client's version.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   console.log(clientInstance.getVersion()); // Ex: 1.0.0
 * });
 * @returns {void}
 */
Client.prototype.getVersion = function () {
  return VERSION;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/client.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * clientInstance.teardown();
 * @example <caption>With callback</caption>
 * clientInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Client.prototype.teardown = wrapPromise(function () {
  var self = this; // eslint-disable-line no-invalid-this

  convertMethodsToError(self, methods(Client.prototype));

  return Promise.resolve();
});

module.exports = Client;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browserDetection = __webpack_require__(39);

var features = {
  tokenize_credit_cards: 'payment_methods/credit_cards' // eslint-disable-line camelcase
};

var blacklistedInputPaths = [
  'creditCard.options.unionPayEnrollment'
];

function GraphQL(config) {
  this._config = config.graphQL;
}

GraphQL.prototype.getGraphQLEndpoint = function () {
  return this._config.url;
};

GraphQL.prototype.isGraphQLRequest = function (url, body) {
  var featureEnabled;
  var path = this.getClientApiPath(url);

  if (!this._isGraphQLEnabled() || !path || browserDetection.isIe9()) {
    return false;
  }

  featureEnabled = this._config.features.some(function (feature) {
    return features[feature] === path;
  });

  if (containsBlacklistedKeys(body)) {
    return false;
  }

  return featureEnabled;
};

GraphQL.prototype.getClientApiPath = function (url) {
  var path;
  var clientApiPrefix = '/client_api/v1/';
  var pathParts = url.split(clientApiPrefix);

  if (pathParts.length > 1) {
    path = pathParts[1].split('?')[0];
  }

  return path;
};

GraphQL.prototype._isGraphQLEnabled = function () {
  return Boolean(this._config);
};

function containsBlacklistedKeys(body) {
  return blacklistedInputPaths.some(function (keys) {
    var value = keys.split('.').reduce(function (accumulator, key) {
      return accumulator && accumulator[key];
    }, body);

    return value !== undefined; // eslint-disable-line no-undefined
  });
}

module.exports = GraphQL;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIE11 = __webpack_require__(109);

module.exports = function isIE(ua) {
  ua = ua || global.navigator.userAgent;
  return ua.indexOf('MSIE') !== -1 || isIE11(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isIe11(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Trident/7') !== -1;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var head;
var uuid = __webpack_require__(22);
var querystring = __webpack_require__(27);
var timeouts = {};

function _removeScript(script) {
  if (script && script.parentNode) {
    script.parentNode.removeChild(script);
  }
}

function _createScriptTag(url, callbackName) {
  var script = document.createElement('script');
  var done = false;

  script.src = url;
  script.async = true;
  script.onerror = function () {
    global[callbackName]({message: 'error', status: 500});
  };

  script.onload = script.onreadystatechange = function () {
    if (done) { return; }

    if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
      done = true;
      script.onload = script.onreadystatechange = null;
    }
  };

  return script;
}

function _cleanupGlobal(callbackName) {
  try {
    delete global[callbackName];
  } catch (_) {
    global[callbackName] = null;
  }
}

function _setupTimeout(timeout, callbackName) {
  timeouts[callbackName] = setTimeout(function () {
    timeouts[callbackName] = null;

    global[callbackName]({
      error: 'timeout',
      status: -1
    });

    global[callbackName] = function () {
      _cleanupGlobal(callbackName);
    };
  }, timeout);
}

function _setupGlobalCallback(script, callback, callbackName) {
  global[callbackName] = function (response) {
    var status = response.status || 500;
    var err = null;
    var data = null;

    delete response.status;

    if (status >= 400 || status < 200) {
      err = response;
    } else {
      data = response;
    }

    _cleanupGlobal(callbackName);
    _removeScript(script);

    clearTimeout(timeouts[callbackName]);
    callback(err, data, status);
  };
}

function request(options, callback) {
  var script;
  var callbackName = 'callback_json_' + uuid().replace(/-/g, '');
  var url = options.url;
  var attrs = options.data;
  var method = options.method;
  var timeout = options.timeout;

  url = querystring.queryify(url, attrs);
  url = querystring.queryify(url, {
    _method: method,
    callback: callbackName
  });

  script = _createScriptTag(url, callbackName);
  _setupGlobalCallback(script, callback, callbackName);
  _setupTimeout(timeout, callbackName);

  if (!head) {
    head = document.getElementsByTagName('head')[0];
  }

  head.appendChild(script);
}

module.exports = {
  request: request
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var querystring = __webpack_require__(27);
var browserDetection = __webpack_require__(39);
var assign = __webpack_require__(15).assign;
var prepBody = __webpack_require__(112);
var parseBody = __webpack_require__(113);
var xhr = __webpack_require__(114);
var isXHRAvailable = xhr.isAvailable;
var GraphQLRequest = __webpack_require__(115);
var DefaultRequest = __webpack_require__(119);

var MAX_TCP_RETRYCOUNT = 1;
var TCP_PRECONNECT_BUG_STATUS_CODE = 408;

function requestShouldRetry(status) {
  return (!status || status === TCP_PRECONNECT_BUG_STATUS_CODE) && browserDetection.isIe();
}

function graphQLRequestShouldRetryWithClientApi(body) {
  var errorType = !body.data && body.errors &&
      body.errors[0] &&
      body.errors[0].extensions &&
      body.errors[0].extensions.errorType;

  return errorType === 'unknown_error';
}

function _requestWithRetry(options, tcpRetryCount, cb) {
  var status, resBody, ajaxRequest, body, method, headers, parsedBody;
  var url = options.url;
  var graphQL = options.graphQL;
  var timeout = options.timeout;
  var req = xhr.getRequestObject();
  var callback = cb;
  var isGraphQLRequest = Boolean(graphQL && graphQL.isGraphQLRequest(url, options.data));

  options.headers = assign({'Content-Type': 'application/json'}, options.headers);

  if (isGraphQLRequest) {
    ajaxRequest = new GraphQLRequest(options);
  } else {
    ajaxRequest = new DefaultRequest(options);
  }

  url = ajaxRequest.getUrl();
  body = ajaxRequest.getBody();
  method = ajaxRequest.getMethod();
  headers = ajaxRequest.getHeaders();

  if (method === 'GET') {
    url = querystring.queryify(url, body);
    body = null;
  }

  if (isXHRAvailable) {
    req.onreadystatechange = function () {
      if (req.readyState !== 4) { return; }

      if (req.status === 0 && isGraphQLRequest) {
        // If a merchant experiences a connection
        // issue to the GraphQL endpoint (possibly
        // due to a Content Security Policy), retry
        // the request against the old client API.
        delete options.graphQL;
        _requestWithRetry(options, tcpRetryCount, cb);

        return;
      }

      parsedBody = parseBody(req.responseText);
      resBody = ajaxRequest.adaptResponseBody(parsedBody);
      status = ajaxRequest.determineStatus(req.status, parsedBody);

      if (status >= 400 || status < 200) {
        if (isGraphQLRequest && graphQLRequestShouldRetryWithClientApi(parsedBody)) {
          delete options.graphQL;
          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }

        if (tcpRetryCount < MAX_TCP_RETRYCOUNT && requestShouldRetry(status)) {
          tcpRetryCount++;
          _requestWithRetry(options, tcpRetryCount, cb);

          return;
        }
        callback(resBody || 'error', null, status || 500);
      } else {
        callback(null, resBody, status);
      }
    };
  } else {
    if (options.headers) {
      url = querystring.queryify(url, headers);
    }

    req.onload = function () {
      callback(null, parseBody(req.responseText), req.status);
    };

    req.onerror = function () {
      // XDomainRequest does not report a body or status for errors, so
      // hardcode to 'error' and 500, respectively
      callback('error', null, 500);
    };

    // This must remain for IE9 to work
    req.onprogress = function () {};

    req.ontimeout = function () {
      callback('timeout', null, -1);
    };
  }

  try {
    req.open(method, url, true);
  } catch (requestOpenError) {
    // If a merchant has a Content Security Policy and they have
    // not whitelisted our endpoints, some browsers may
    // synchronously throw an error. If it is not a GraphQL
    // request, we throw the error. If it is a GraphQL request
    // we remove the GraphQL option and try the request against
    // the old client API.
    if (!isGraphQLRequest) {
      throw requestOpenError;
    }

    delete options.graphQL;

    _requestWithRetry(options, tcpRetryCount, cb);

    return;
  }

  req.timeout = timeout;

  if (isXHRAvailable) {
    Object.keys(headers).forEach(function (headerKey) {
      req.setRequestHeader(headerKey, headers[headerKey]);
    });
  }

  try {
    req.send(prepBody(method, body));
  } catch (e) { /* ignored */ }
}

function request(options, cb) {
  _requestWithRetry(options, 0, cb);
}

module.exports = {
  request: request
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (method, body) {
  if (typeof method !== 'string') {
    throw new Error('Method must be a string');
  }

  if (method.toLowerCase() !== 'get' && body != null) {
    body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  return body;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (body) {
  try {
    body = JSON.parse(body);
  } catch (e) { /* ignored */ }

  return body;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isXHRAvailable = global.XMLHttpRequest && 'withCredentials' in new global.XMLHttpRequest();

function getRequestObject() {
  return isXHRAvailable ? new XMLHttpRequest() : new XDomainRequest();
}

module.exports = {
  isAvailable: isXHRAvailable,
  getRequestObject: getRequestObject
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BRAINTREE_VERSION = '2017-12-15';

var assign = __webpack_require__(15).assign;

var creditCardTokenizationBodyGenerator = __webpack_require__(116);
var creditCardTokenizationResponseAdapter = __webpack_require__(117);

var generators = {
  'payment_methods/credit_cards': creditCardTokenizationBodyGenerator
};
var adapters = {
  'payment_methods/credit_cards': creditCardTokenizationResponseAdapter
};

function GraphQLRequest(options) {
  var clientApiPath = options.graphQL.getClientApiPath(options.url);

  this._graphQL = options.graphQL;
  this._data = options.data;
  this._method = options.method;
  this._headers = options.headers;
  this._sendAnalyticsEvent = options.sendAnalyticsEvent || Function.prototype;

  this._generator = generators[clientApiPath];
  this._adapter = adapters[clientApiPath];

  this._sendAnalyticsEvent('graphql.init');
}

GraphQLRequest.prototype.getUrl = function () {
  return this._graphQL.getGraphQLEndpoint();
};

GraphQLRequest.prototype.getBody = function () {
  var formattedBody = formatBodyKeys(this._data);

  return this._generator(formattedBody);
};

GraphQLRequest.prototype.getMethod = function () {
  return 'POST';
};

GraphQLRequest.prototype.getHeaders = function () {
  var authorization, headers;

  if (this._data.authorizationFingerprint) {
    this._sendAnalyticsEvent('graphql.authorization-fingerprint');
    authorization = this._data.authorizationFingerprint;
  } else {
    this._sendAnalyticsEvent('graphql.tokenization-key');
    authorization = this._data.tokenizationKey;
  }

  headers = {
    Authorization: 'Bearer ' + authorization,
    'Braintree-Version': BRAINTREE_VERSION
  };

  return assign({}, this._headers, headers);
};

GraphQLRequest.prototype.adaptResponseBody = function (parsedBody) {
  return this._adapter(parsedBody);
};

GraphQLRequest.prototype.determineStatus = function (httpStatus, parsedResponse) {
  var status, errorType;

  if (httpStatus === 200) {
    errorType = parsedResponse.errors &&
      parsedResponse.errors[0] &&
      parsedResponse.errors[0].extensions &&
      parsedResponse.errors[0].extensions.errorType;

    if (parsedResponse.data && !parsedResponse.errors) {
      status = 200;
    } else if (errorType === 'user_error') {
      status = 422;
    } else if (errorType === 'developer_error') {
      status = 403;
    } else if (errorType === 'unknown_error') {
      status = 500;
    } else if (isCoercionOrValidationError(errorType, parsedResponse)) {
      status = 403;
    } else {
      status = 500;
    }
  } else if (!httpStatus) {
    status = 500;
  } else {
    status = httpStatus;
  }

  this._sendAnalyticsEvent('graphql.status.' + httpStatus);
  this._sendAnalyticsEvent('graphql.determinedStatus.' + status);

  return status;
};

function isCoercionOrValidationError(errorType, parsedResponse) {
  return !errorType && parsedResponse.errors[0].message;
}

function snakeCaseToCamelCase(snakeString) {
  if (snakeString.indexOf('_') === -1) {
    return snakeString;
  }

  return snakeString.toLowerCase().replace(/(\_\w)/g, function (match) {
    return match[1].toUpperCase();
  });
}

function formatBodyKeys(originalBody) {
  var body = {};

  Object.keys(originalBody).forEach(function (key) {
    var camelCaseKey = snakeCaseToCamelCase(key);

    if (typeof originalBody[key] === 'object') {
      body[camelCaseKey] = formatBodyKeys(originalBody[key]);
    } else if (typeof originalBody[key] === 'number') {
      body[camelCaseKey] = String(originalBody[key]);
    } else {
      body[camelCaseKey] = originalBody[key];
    }
  });

  return body;
}

module.exports = GraphQLRequest;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(15).assign;

var CREDIT_CARD_TOKENIZATION_MUTATION = 'mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) { ' +
'  tokenizeCreditCard(input: $input) { ' +
'    token ' +
'    creditCard { ' +
'      brand ' +
'      last4 ' +
'      binData { ' +
'        prepaid ' +
'        healthcare ' +
'        debit ' +
'        durbinRegulated ' +
'        commercial ' +
'        payroll ' +
'        issuingBank ' +
'        countryOfIssuance ' +
'        productId ' +
'      } ' +
'    } ' +
'  } ' +
'}';

function createCreditCardTokenizationBody(body) {
  var cc = body.creditCard;
  var billingAddress = cc && cc.billingAddress;
  var expDate = cc && cc.expirationDate;
  var expirationMonth = cc && (cc.expirationMonth || (expDate && expDate.split('/')[0].trim()));
  var expirationYear = cc && (cc.expirationYear || (expDate && expDate.split('/')[1].trim()));
  var variables = {
    input: {
      creditCard: {
        number: cc && cc.number,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        cvv: cc && cc.cvv,
        cardholderName: cc && cc.cardholderName
      },
      options: {}
    }
  };

  if (billingAddress) {
    variables.input.creditCard.billingAddress = billingAddress;
  }

  variables.input = addValidationRule(body, variables.input);

  return variables;
}

function addValidationRule(body, input) {
  var validate;

  if (body.creditCard && body.creditCard.options && typeof body.creditCard.options.validate === 'boolean') {
    validate = body.creditCard.options.validate;
  } else if ((body.authorizationFingerprint && body.tokenizationKey) || body.authorizationFingerprint) {
    validate = true;
  } else if (body.tokenizationKey) {
    validate = false;
  }

  if (typeof validate === 'boolean') {
    input.options = assign({
      validate: validate
    }, input.options);
  }

  return input;
}

function creditCardTokenization(body) {
  return JSON.stringify({
    query: CREDIT_CARD_TOKENIZATION_MUTATION,
    variables: createCreditCardTokenizationBody(body),
    operationName: 'TokenizeCreditCard'
  });
}

module.exports = creditCardTokenization;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var errorResponseAdapter = __webpack_require__(118);

function creditCardTokenizationResponseAdapter(responseBody) {
  var adaptedResponse;

  if (responseBody.data && !responseBody.errors) {
    adaptedResponse = adaptTokenizeCreditCardResponseBody(responseBody);
  } else {
    adaptedResponse = errorResponseAdapter(responseBody);
  }

  return adaptedResponse;
}

function adaptTokenizeCreditCardResponseBody(body) {
  var data = body.data.tokenizeCreditCard;
  var creditCard = data.creditCard;
  var lastTwo = creditCard.last4 ? creditCard.last4.substr(2, 4) : '';
  var binData = creditCard.binData;
  var response;

  if (binData) {
    ['issuingBank', 'countryOfIssuance', 'productId'].forEach(function (key) {
      if (binData[key] === null) { binData[key] = 'Unknown'; }
    });
  }

  response = {
    creditCards: [
      {
        binData: binData,
        consumed: false,
        description: lastTwo ? 'ending in ' + lastTwo : '',
        nonce: data.token,
        details: {
          cardType: creditCard.brand || 'Unknown',
          lastFour: creditCard.last4 || '',
          lastTwo: lastTwo
        },
        type: 'CreditCard',
        threeDSecureInfo: null
      }
    ]
  };

  return response;
}

module.exports = creditCardTokenizationResponseAdapter;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function errorResponseAdapter(responseBody) {
  var response;
  var errorType = responseBody.errors &&
    responseBody.errors[0] &&
    responseBody.errors[0].extensions &&
    responseBody.errors[0].extensions.errorType;

  if (errorType === 'user_error') {
    response = userErrorResponseAdapter(responseBody);
  } else if (errorType) {
    response = errorWithTypeResponseAdapter(responseBody);
  } else {
    response = {error: {message: 'There was a problem serving your request'}, fieldErrors: []};
  }

  return response;
}

function errorWithTypeResponseAdapter(responseBody) {
  return {error: {message: responseBody.errors[0].message}, fieldErrors: []};
}

function userErrorResponseAdapter(responseBody) {
  var error = responseBody.errors[0];
  var message = error.extensions.legacyMessage;
  var errorDetails = error.extensions.errorDetails;
  var fieldErrors = buildFieldErrors(errorDetails);

  return {error: {message: message}, fieldErrors: fieldErrors};
}

function buildFieldErrors(errorDetails) {
  var fieldErrors = [];

  errorDetails.forEach(function (detail) {
    addFieldError(detail.inputPath.slice(1), detail, fieldErrors);
  });

  return fieldErrors;
}

function addFieldError(inputPath, errorDetail, fieldErrors) {
  var fieldError;
  var legacyCode = errorDetail.legacyCode;
  var inputField = inputPath[0];

  if (inputPath.length === 1) {
    fieldErrors.push({
      code: legacyCode,
      field: inputField,
      message: errorDetail.message
    });

    return;
  }

  fieldErrors.forEach(function (candidate) {
    if (candidate.field === inputField) {
      fieldError = candidate;
    }
  });

  if (!fieldError) {
    fieldError = {field: inputField, fieldErrors: []};
    fieldErrors.push(fieldError);
  }

  addFieldError(inputPath.slice(1), errorDetail, fieldError.fieldErrors);
}

module.exports = errorResponseAdapter;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function DefaultRequest(options) {
  this._url = options.url;
  this._data = options.data;
  this._method = options.method;
  this._headers = options.headers;
}

DefaultRequest.prototype.getUrl = function () {
  return this._url;
};

DefaultRequest.prototype.getBody = function () {
  return this._data;
};

DefaultRequest.prototype.getMethod = function () {
  return this._method;
};

DefaultRequest.prototype.getHeaders = function () {
  return this._headers;
};

DefaultRequest.prototype.adaptResponseBody = function (parsedBody) {
  return parsedBody;
};

DefaultRequest.prototype.determineStatus = function (status) {
  return status;
};

module.exports = DefaultRequest;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function getUserAgent() {
  return global.navigator.userAgent;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function () {
  return global.location.protocol === 'http:';
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var atobNormalized = typeof global.atob === 'function' ? global.atob : atob;

function atob(base64String) {
  var a, b, c, b1, b2, b3, b4, i;
  var base64Matcher = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$');
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var result = '';

  if (!base64Matcher.test(base64String)) {
    throw new Error('Non base64 encoded input passed to window.atob polyfill');
  }

  i = 0;
  do {
    b1 = characters.indexOf(base64String.charAt(i++));
    b2 = characters.indexOf(base64String.charAt(i++));
    b3 = characters.indexOf(base64String.charAt(i++));
    b4 = characters.indexOf(base64String.charAt(i++));

    a = (b1 & 0x3F) << 2 | b2 >> 4 & 0x3;
    b = (b2 & 0xF) << 4 | b3 >> 2 & 0xF;
    c = (b3 & 0x3) << 6 | b4 & 0x3F;

    result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : '') + (c ? String.fromCharCode(c) : '');
  } while (i < base64String.length);

  return result;
}

module.exports = {
  atob: function (base64String) {
    return atobNormalized.call(global, base64String);
  },
  _atob: atob
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
  return JSON.parse(JSON.stringify(value));
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function deferred(fn) {
  return function () {
    // IE9 doesn't support passing arguments to setTimeout so we have to emulate it.
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 1);
  };
}

module.exports = deferred;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function once(fn) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      fn.apply(null, arguments);
    }
  };
}

module.exports = once;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function promiseOrCallback(promise, callback) { // eslint-disable-line consistent-return
  if (callback) {
    promise
      .then(function (data) {
        callback(null, data);
      })
      .catch(function (err) {
        callback(err);
      });
  } else {
    return promise;
  }
}

module.exports = promiseOrCallback;


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  BRAINTREE_API_VERSION_HEADER: '2017-04-03'
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var BraintreeError = __webpack_require__(1);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);
var request = __webpack_require__(40);
var uuid = __webpack_require__(22);
var constants = __webpack_require__(17);
var createAuthorizationData = __webpack_require__(44);
var errors = __webpack_require__(47);

function getConfiguration(options) {
  return new Promise(function (resolve, reject) {
    var configuration, authData, attrs, configUrl;
    var sessionId = uuid();
    var analyticsMetadata = {
      merchantAppId: global.location.host,
      platform: constants.PLATFORM,
      sdkVersion: constants.VERSION,
      source: constants.SOURCE,
      integration: constants.INTEGRATION,
      integrationType: constants.INTEGRATION,
      sessionId: sessionId
    };

    try {
      authData = createAuthorizationData(options.authorization);
    } catch (err) {
      reject(new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION));

      return;
    }
    attrs = authData.attrs;
    configUrl = authData.configUrl;

    attrs._meta = analyticsMetadata;
    attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
    attrs.configVersion = '3';

    request({
      url: configUrl,
      method: 'GET',
      data: attrs
    }, function (err, response, status) {
      var errorTemplate;

      if (err) {
        if (status === 403) {
          errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
        } else {
          errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
        }

        reject(new BraintreeError({
          type: errorTemplate.type,
          code: errorTemplate.code,
          message: errorTemplate.message,
          details: {
            originalError: err
          }
        }));

        return;
      }

      configuration = {
        authorization: options.authorization,
        authorizationType: attrs.tokenizationKey ? 'TOKENIZATION_KEY' : 'CLIENT_TOKEN',
        analyticsMetadata: analyticsMetadata,
        gatewayConfiguration: response
      };

      resolve(configuration);
    });
  });
}

module.exports = {
  getConfiguration: wrapPromise(getConfiguration)
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DropinError = __webpack_require__(8);
var EventEmitter = __webpack_require__(48);
var constants = __webpack_require__(2);
var paymentMethodTypes = constants.paymentMethodTypes;
var paymentOptionIDs = constants.paymentOptionIDs;
var isGuestCheckout = __webpack_require__(49);
var Promise = __webpack_require__(5);
var paymentSheetViews = __webpack_require__(50);

var VAULTED_PAYMENT_METHOD_TYPES_THAT_SHOULD_BE_HIDDEN = [
  paymentMethodTypes.applePay,
  paymentMethodTypes.googlePay,
  paymentMethodTypes.venmo
];
var DEFAULT_PAYMENT_OPTION_PRIORITY = [
  paymentOptionIDs.card,
  paymentOptionIDs.paypal,
  paymentOptionIDs.paypalCredit,
  paymentOptionIDs.venmo,
  paymentOptionIDs.applePay,
  paymentOptionIDs.googlePay
];

function DropinModel(options) {
  this.componentID = options.componentID;
  this.merchantConfiguration = options.merchantConfiguration;

  this.isGuestCheckout = isGuestCheckout(options.client);

  this.dependenciesInitializing = 0;
  this.dependencySuccessCount = 0;
  this.failedDependencies = {};
  this._options = options;

  EventEmitter.call(this);
}

DropinModel.prototype = Object.create(EventEmitter.prototype, {
  constructor: DropinModel
});

DropinModel.prototype.initialize = function () {
  return getSupportedPaymentOptions(this._options).then(function (paymentOptions) {
    this.supportedPaymentOptions = paymentOptions;
    this._paymentMethods = this._getSupportedPaymentMethods(this._options.paymentMethods);
    this._paymentMethodIsRequestable = this._paymentMethods.length > 0;
  }.bind(this));
};

DropinModel.prototype.isPaymentMethodRequestable = function () {
  return Boolean(this._paymentMethodIsRequestable);
};

DropinModel.prototype.addPaymentMethod = function (paymentMethod) {
  this._paymentMethods.push(paymentMethod);
  this._emit('addPaymentMethod', paymentMethod);
  this.changeActivePaymentMethod(paymentMethod);
};

DropinModel.prototype.removePaymentMethod = function (paymentMethod) {
  var paymentMethodLocation = this._paymentMethods.indexOf(paymentMethod);

  if (paymentMethodLocation === -1) {
    return;
  }

  this._paymentMethods.splice(paymentMethodLocation, 1);
  this._emit('removePaymentMethod', paymentMethod);
};

DropinModel.prototype.changeActivePaymentMethod = function (paymentMethod) {
  this._activePaymentMethod = paymentMethod;
  this._emit('changeActivePaymentMethod', paymentMethod);
};

DropinModel.prototype.changeActivePaymentView = function (paymentViewID) {
  this._activePaymentView = paymentViewID;
  this._emit('changeActivePaymentView', paymentViewID);
};

DropinModel.prototype.removeActivePaymentMethod = function () {
  this._activePaymentMethod = null;
  this._emit('removeActivePaymentMethod');
  this.setPaymentMethodRequestable({
    isRequestable: false
  });
};

DropinModel.prototype.selectPaymentOption = function (paymentViewID) {
  this._emit('paymentOptionSelected', {
    paymentOption: paymentViewID
  });
};

DropinModel.prototype._shouldEmitRequestableEvent = function (options) {
  var requestableStateHasNotChanged = this.isPaymentMethodRequestable() === options.isRequestable;
  var typeHasNotChanged = options.type === this._paymentMethodRequestableType;

  if (requestableStateHasNotChanged && (!options.isRequestable || typeHasNotChanged)) {
    return false;
  }

  return true;
};

DropinModel.prototype.setPaymentMethodRequestable = function (options) {
  var shouldEmitEvent = this._shouldEmitRequestableEvent(options);
  var paymentMethodRequestableResponse = {
    paymentMethodIsSelected: Boolean(options.selectedPaymentMethod),
    type: options.type
  };

  this._paymentMethodIsRequestable = options.isRequestable;

  if (options.isRequestable) {
    this._paymentMethodRequestableType = options.type;
  } else {
    delete this._paymentMethodRequestableType;
  }

  if (!shouldEmitEvent) {
    return;
  }

  if (options.isRequestable) {
    this._emit('paymentMethodRequestable', paymentMethodRequestableResponse);
  } else {
    this._emit('noPaymentMethodRequestable');
  }
};

DropinModel.prototype.getPaymentMethods = function () {
  // we want to return a copy of the Array
  // so we can loop through it in dropin.updateConfiguration
  // while calling model.removePaymentMethod
  // which updates the original array
  return this._paymentMethods.slice();
};

DropinModel.prototype.getActivePaymentMethod = function () {
  return this._activePaymentMethod;
};

DropinModel.prototype.getActivePaymentView = function () {
  return this._activePaymentView;
};

DropinModel.prototype.reportAppSwitchPayload = function (payload) {
  this.appSwitchPayload = payload;
};

DropinModel.prototype.reportAppSwitchError = function (sheetId, error) {
  this.appSwitchError = {
    id: sheetId,
    error: error
  };
};

DropinModel.prototype.asyncDependencyStarting = function () {
  this.dependenciesInitializing++;
};

DropinModel.prototype.asyncDependencyReady = function () {
  this.dependencySuccessCount++;
  this.dependenciesInitializing--;
  this._checkAsyncDependencyFinished();
};

DropinModel.prototype.asyncDependencyFailed = function (options) {
  if (this.failedDependencies.hasOwnProperty(options.view)) {
    return;
  }
  this.failedDependencies[options.view] = options.error;
  this.dependenciesInitializing--;
  this._checkAsyncDependencyFinished();
};

DropinModel.prototype._checkAsyncDependencyFinished = function () {
  if (this.dependenciesInitializing === 0) {
    this._emit('asyncDependenciesReady');
  }
};

DropinModel.prototype.cancelInitialization = function (error) {
  this._emit('cancelInitialization', error);
};

DropinModel.prototype.reportError = function (error) {
  this._emit('errorOccurred', error);
};

DropinModel.prototype.clearError = function () {
  this._emit('errorCleared');
};

DropinModel.prototype._getSupportedPaymentMethods = function (paymentMethods) {
  var supportedPaymentMethods = this.supportedPaymentOptions.reduce(function (array, key) {
    var paymentMethodType = paymentMethodTypes[key];

    if (canShowVaultedPaymentMethodType(paymentMethodType)) {
      array.push(paymentMethodType);
    }

    return array;
  }, []);

  return paymentMethods.filter(function (paymentMethod) {
    return supportedPaymentMethods.indexOf(paymentMethod.type) > -1;
  });
};

function getSupportedPaymentOptions(options) {
  var paymentOptionPriority = options.merchantConfiguration.paymentOptionPriority || DEFAULT_PAYMENT_OPTION_PRIORITY;
  var promises;

  if (!(paymentOptionPriority instanceof Array)) {
    throw new DropinError('paymentOptionPriority must be an array.');
  }

  // Remove duplicates
  paymentOptionPriority = paymentOptionPriority.filter(function (item, pos) { return paymentOptionPriority.indexOf(item) === pos; });

  promises = paymentOptionPriority.map(function (paymentOption) {
    return getPaymentOption(paymentOption, options);
  });

  return Promise.all(promises).then(function (result) {
    result = result.filter(function (item) {
      return item.success;
    });

    if (result.length === 0) {
      return Promise.reject(new DropinError('No valid payment options available.'));
    }

    return result.map(function (item) { return item.id; });
  });
}

function getPaymentOption(paymentOption, options) {
  return isPaymentOptionEnabled(paymentOption, options).then(function (success) {
    return {
      success: success,
      id: paymentOptionIDs[paymentOption]
    };
  });
}

function isPaymentOptionEnabled(paymentOption, options) {
  var SheetView = paymentSheetViews[paymentOptionIDs[paymentOption]];

  if (!SheetView) {
    return Promise.reject(new DropinError('paymentOptionPriority: Invalid payment option specified.'));
  }

  return SheetView.isEnabled({
    client: options.client,
    merchantConfiguration: options.merchantConfiguration
  });
}

function canShowVaultedPaymentMethodType(paymentMethodType) {
  return paymentMethodType && VAULTED_PAYMENT_METHOD_TYPES_THAT_SHOULD_BE_HIDDEN.indexOf(paymentMethodType) === -1;
}

module.exports = DropinModel;


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign = __webpack_require__(10).assign;
var BaseView = __webpack_require__(9);
var btApplePay = __webpack_require__(131);
var DropinError = __webpack_require__(8);
var isHTTPS = __webpack_require__(133);
var Promise = __webpack_require__(5);
var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;

function ApplePayView() {
  BaseView.apply(this, arguments);
}

ApplePayView.prototype = Object.create(BaseView.prototype);
ApplePayView.prototype.constructor = ApplePayView;
ApplePayView.ID = ApplePayView.prototype.ID = paymentOptionIDs.applePay;

ApplePayView.prototype.initialize = function () {
  var self = this;

  self.applePayConfiguration = assign({}, self.model.merchantConfiguration.applePay);

  self.model.asyncDependencyStarting();

  return btApplePay.create({client: this.client}).then(function (applePayInstance) {
    var buttonDiv = self.getElementById('apple-pay-button');

    self.applePayInstance = applePayInstance;

    self.model.on('changeActivePaymentView', function (paymentViewID) {
      if (paymentViewID !== self.ID) {
        return;
      }

      global.ApplePaySession.canMakePaymentsWithActiveCard(self.applePayInstance.merchantIdentifier).then(function (canMakePayments) {
        if (!canMakePayments) {
          self.model.reportError('applePayActiveCardError');
        }
      });
    });

    buttonDiv.onclick = self._showPaymentSheet.bind(self);
    buttonDiv.classList.add('apple-pay-button-' + (self.model.merchantConfiguration.applePay.buttonStyle || 'black'));

    self.model.asyncDependencyReady();
  }).catch(function (err) {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError(err)
    });
  });
};

ApplePayView.prototype._showPaymentSheet = function () {
  var self = this;
  var request = self.applePayInstance.createPaymentRequest(this.applePayConfiguration.paymentRequest);
  var session = new global.ApplePaySession(2, request);

  session.onvalidatemerchant = function (event) {
    self.applePayInstance.performValidation({
      validationURL: event.validationURL,
      displayName: self.applePayConfiguration.displayName
    }).then(function (validationData) {
      session.completeMerchantValidation(validationData);
    }).catch(function (validationErr) {
      self.model.reportError(validationErr);
      session.abort();
    });
  };

  session.onpaymentauthorized = function (event) {
    self.applePayInstance.tokenize({
      token: event.payment.token
    }).then(function (payload) {
      session.completePayment(global.ApplePaySession.STATUS_SUCCESS);
      payload.payment = event.payment;
      self.model.addPaymentMethod(payload);
    }).catch(function (tokenizeErr) {
      self.model.reportError(tokenizeErr);
      session.completePayment(global.ApplePaySession.STATUS_FAILURE);
    });
  };

  session.begin();
  return false;
};

ApplePayView.prototype.updateConfiguration = function (key, value) {
  this.applePayConfiguration[key] = value;
};

ApplePayView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;
  var applePayEnabled = gatewayConfiguration.applePayWeb && Boolean(options.merchantConfiguration.applePay);
  var applePayBrowserSupported;

  if (!applePayEnabled) {
    return Promise.resolve(false);
  }

  applePayBrowserSupported = global.ApplePaySession && isHTTPS.isHTTPS();

  if (!applePayBrowserSupported) {
    return Promise.resolve(false);
  }

  return Promise.resolve(Boolean(global.ApplePaySession.canMakePayments()));
};

module.exports = ApplePayView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @module braintree-web/apple-pay
 * @description Accept Apple Pay on the Web. *This component is currently in beta and is subject to change.*
 */

var BraintreeError = __webpack_require__(1);
var ApplePay = __webpack_require__(132);
var analytics = __webpack_require__(7);
var basicComponentVerification = __webpack_require__(16);
var errors = __webpack_require__(51);
var VERSION = "3.31.0";
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} [callback] The second argument, `data`, is the {@link ApplePay} instance. If no callback is provided, `create` returns a promise that resolves with the {@link ApplePay} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Apple Pay',
    client: options.client
  }).then(function () {
    if (!options.client.getConfiguration().gatewayConfiguration.applePayWeb) {
      return Promise.reject(new BraintreeError(errors.APPLE_PAY_NOT_ENABLED));
    }

    analytics.sendEvent(options.client, 'applepay.initialized');

    return new ApplePay(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var BraintreeError = __webpack_require__(1);
var analytics = __webpack_require__(7);
var errors = __webpack_require__(51);
var Promise = __webpack_require__(4);
var methods = __webpack_require__(11);
var convertMethodsToError = __webpack_require__(12);
var wrapPromise = __webpack_require__(3);

/**
 * @typedef {object} ApplePay~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.cardHolderName The name of the card holder.
 * @property {string} details.dpanLastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `ApplePayCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * An Apple Pay Payment Authorization Event object.
 * @typedef {object} ApplePayPaymentAuthorizedEvent
 * @external ApplePayPaymentAuthorizedEvent
 * @see {@link https://developer.apple.com/reference/applepayjs/applepaypaymentauthorizedevent ApplePayPaymentAuthorizedEvent}
 */

/**
 * An Apple Pay Payment Request object.
 * @typedef {object} ApplePayPaymentRequest
 * @external ApplePayPaymentRequest
 * @see {@link https://developer.apple.com/reference/applepayjs/1916082-applepay_js_data_types/paymentrequest PaymentRequest}
 */

/**
 * @class
 * @param {object} options Options
 * @description <strong>You cannot use this constructor directly. Use {@link module:braintree-web/apple-pay.create|braintree.applePay.create} instead.</strong>
 * @classdesc This class represents an Apple Pay component. Instances of this class have methods for validating the merchant server and tokenizing payments.
 */
function ApplePay(options) {
  this._client = options.client;
  /**
   * @name ApplePay#merchantIdentifier
   * @description A special merchant ID which represents the merchant association with Braintree. Required when using `ApplePaySession.canMakePaymentsWithActiveCard`.
   * @example
   * var promise = ApplePaySession.canMakePaymentsWithActiveCard(applePayInstance.merchantIdentifier);
   * promise.then(function (canMakePaymentsWithActiveCard) {
   *   if (canMakePaymentsWithActiveCard) {
   *     // Set up Apple Pay buttons
   *   }
   * });
   */
  Object.defineProperty(this, 'merchantIdentifier', {
    value: this._client.getConfiguration().gatewayConfiguration.applePayWeb.merchantIdentifier,
    configurable: false,
    writable: false
  });
}

/**
 * Merges a payment request with Braintree defaults to return an {external:ApplePayPaymentRequest}.
 *
 * The following properties are assigned to `paymentRequest` if not already defined. Their default values come from the Braintree gateway.
 * - `countryCode`
 * - `currencyCode`
 * - `merchantCapabilities`
 * - `supportedNetworks`
 * @public
 * @param {external:ApplePayPaymentRequest} paymentRequest The payment request details to apply on top of those from Braintree.
 * @returns {external:ApplePayPaymentRequest} The decorated `paymentRequest` object.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *
 *   var session = new ApplePaySession(2, paymentRequest);
 *
 *   // ...
 */
ApplePay.prototype.createPaymentRequest = function (paymentRequest) {
  var applePay = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
  var defaults = {
    countryCode: applePay.countryCode,
    currencyCode: applePay.currencyCode,
    merchantCapabilities: applePay.merchantCapabilities || ['supports3DS'],
    supportedNetworks: applePay.supportedNetworks.map(function (network) {
      return network === 'mastercard' ? 'masterCard' : network;
    })
  };

  return Object.assign({}, defaults, paymentRequest);
};

/**
 * Validates your merchant website, as required by `ApplePaySession` before payment can be authorized.
 * @public
 * @param {object} options Options
 * @param {string} options.validationURL The validationURL fram an `ApplePayValidateMerchantEvent`.
 * @param {string} options.displayName The canonical name for your store. Use a non-localized name. This parameter should be a UTF-8 string that is a maximum of 128 characters. The system may display this name to the user.
 * @param {callback} [callback] The second argument, <code>data</code>, is the Apple Pay merchant session object. If no callback is provided, `performValidation` returns a promise.
 * Pass the merchant session to your Apple Pay session's `completeMerchantValidation` method.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(2, paymentRequest);
 *
 *   session.onvalidatemerchant = function (event) {
 *     applePayInstance.performValidation({
 *       validationURL: event.validationURL,
 *       displayName: 'My Great Store'
 *     }, function (validationErr, validationData) {
 *       if (validationErr) {
 *         console.error(validationErr);
 *         session.abort();
 *         return;
 *       }
 *
 *       session.completeMerchantValidation(validationData);
 *     });
 *   };
 * });
 */
ApplePay.prototype.performValidation = function (options) {
  var applePayWebSession;
  var self = this;

  if (!options || !options.validationURL) {
    return Promise.reject(new BraintreeError(errors.APPLE_PAY_VALIDATION_URL_REQUIRED));
  }

  applePayWebSession = {
    validationUrl: options.validationURL,
    domainName: options.domainName || global.location.hostname,
    merchantIdentifier: options.merchantIdentifier || this.merchantIdentifier
  };

  if (options.displayName != null) {
    applePayWebSession.displayName = options.displayName;
  }

  return this._client.request({
    method: 'post',
    endpoint: 'apple_pay_web/sessions',
    data: {
      _meta: {source: 'apple-pay'},
      applePayWebSession: applePayWebSession
    }
  }).then(function (response) {
    analytics.sendEvent(self._client, 'applepay.performValidation.succeeded');

    return Promise.resolve(response);
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'applepay.performValidation.failed');

    if (err.code === 'CLIENT_REQUEST_ERROR') {
      return Promise.reject(new BraintreeError({
        type: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,
        code: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,
        message: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,
        details: {
          originalError: err.details.originalError
        }
      }));
    }

    return Promise.reject(new BraintreeError({
      type: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,
      code: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,
      message: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Tokenizes an Apple Pay payment. This will likely be called in your `ApplePaySession`'s `onpaymentauthorized` callback.
 * @public
 * @param {object} options Options
 * @param {object} options.token The `payment.token` property of an {@link external:ApplePayPaymentAuthorizedEvent}.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ApplePay~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a promise that resolves with a {@link ApplePay~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * var applePay = require('braintree-web/apple-pay');
 *
 * applePay.create({client: clientInstance}, function (applePayErr, applePayInstance) {
 *   if (applePayErr) {
 *     // Handle error here
 *     return;
 *   }
 *
 *   var paymentRequest = applePayInstance.createPaymentRequest({
 *     total: {
 *       label: 'My Company',
 *       amount: '19.99'
 *     }
 *   });
 *   var session = new ApplePaySession(2, paymentRequest);
 *
 *   session.onpaymentauthorized = function (event) {
 *     applePayInstance.tokenize({
 *       token: event.payment.token
 *     }, function (tokenizeErr, tokenizedPayload) {
 *       if (tokenizeErr) {
 *         session.completePayment(ApplePaySession.STATUS_FAILURE);
 *         return;
 *       }
 *       session.completePayment(ApplePaySession.STATUS_SUCCESS);
 *
 *       // Send the tokenizedPayload to your server here!
 *     });
 *   };
 *
 *   // ...
 * });
 */
ApplePay.prototype.tokenize = function (options) {
  var self = this;

  if (!options.token) {
    return Promise.reject(new BraintreeError(errors.APPLE_PAY_PAYMENT_TOKEN_REQUIRED));
  }

  return this._client.request({
    method: 'post',
    endpoint: 'payment_methods/apple_payment_tokens',
    data: {
      _meta: {
        source: 'apple-pay'
      },
      applePaymentToken: Object.assign({}, options.token, {
        // The gateway requires this key to be base64-encoded.
        paymentData: btoa(JSON.stringify(options.token.paymentData))
      })
    }
  }).then(function (response) {
    analytics.sendEvent(self._client, 'applepay.tokenize.succeeded');

    return Promise.resolve(response.applePayCards[0]);
  }).catch(function (err) {
    analytics.sendEvent(self._client, 'applepay.tokenize.failed');

    return Promise.reject(new BraintreeError({
      type: errors.APPLE_PAY_TOKENIZATION.type,
      code: errors.APPLE_PAY_TOKENIZATION.code,
      message: errors.APPLE_PAY_TOKENIZATION.message,
      details: {
        originalError: err
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/apple-pay.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * applePayInstance.teardown();
 * @example <caption>With callback</caption>
 * applePayInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
ApplePay.prototype.teardown = function () {
  convertMethodsToError(this, methods(ApplePay.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(ApplePay);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function isHTTPS() {
  return global.location.protocol === 'https:';
}

module.exports = {
  isHTTPS: isHTTPS
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(10).assign;

var BaseView = __webpack_require__(9);
var classlist = __webpack_require__(13);
var constants = __webpack_require__(2);
var DropinError = __webpack_require__(8);
var hostedFields = __webpack_require__(135);
var isUtf8 = __webpack_require__(58);
var transitionHelper = __webpack_require__(59);
var Promise = __webpack_require__(5);

var cardIconHTML = "<div data-braintree-id=\"visa-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-visa\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"master-card-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-master-card\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"unionpay-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-unionpay\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"american-express-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-american-express\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"jcb-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-jcb\"></use>\n    </svg>\n</div>\n<!-- Remove braintree-hidden class when supportedCardType accurately indicates Diners Club support -->\n<div data-braintree-id=\"diners-club-card-icon\" class=\"braintree-sheet__card-icon braintree-hidden\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-diners-club\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"discover-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-discover\"></use>\n    </svg>\n</div>\n<div data-braintree-id=\"maestro-card-icon\" class=\"braintree-sheet__card-icon\">\n    <svg width=\"40\" height=\"24\">\n        <use xlink:href=\"#icon-maestro\"></use>\n    </svg>\n</div>\n";

function CardView() {
  BaseView.apply(this, arguments);
}

CardView.prototype = Object.create(BaseView.prototype);
CardView.prototype.constructor = CardView;
CardView.ID = CardView.prototype.ID = constants.paymentOptionIDs.card;

CardView.prototype.initialize = function () {
  var cvvFieldGroup, postalCodeFieldGroup;
  var cardholderNameField = this.getElementById('cardholder-name-field-group');
  var cardIcons = this.getElementById('card-view-icons');
  var hfOptions = this._generateHostedFieldsOptions();

  cardIcons.innerHTML = cardIconHTML;
  this._hideUnsupportedCardIcons();

  this.hasCVV = hfOptions.fields.cvv;
  this.hasCardholderName = Boolean(this.model.merchantConfiguration.card && this.model.merchantConfiguration.card.cardholderName);
  this.cardholderNameInput = cardholderNameField.querySelector('input');
  this.cardNumberIcon = this.getElementById('card-number-icon');
  this.cardNumberIconSvg = this.getElementById('card-number-icon-svg');
  this.cvvIcon = this.getElementById('cvv-icon');
  this.cvvIconSvg = this.getElementById('cvv-icon-svg');
  this.cvvLabelDescriptor = this.getElementById('cvv-label-descriptor');
  this.fieldErrors = {};
  this.extraInputs = [
    {
      fieldName: 'cardholderName',
      enabled: this.hasCardholderName,
      required: this.hasCardholderName && this.model.merchantConfiguration.card.cardholderName.required,
      requiredError: this.strings.fieldEmptyForCardholderName,
      validations: [
        {
          isValid: function (value) {
            return value.length < 256;
          },
          error: this.strings.fieldTooLongForCardholderName
        }
      ]
    }
  ];

  if (!this.hasCVV) {
    cvvFieldGroup = this.getElementById('cvv-field-group');
    cvvFieldGroup.parentNode.removeChild(cvvFieldGroup);
  }

  if (!hfOptions.fields.postalCode) {
    postalCodeFieldGroup = this.getElementById('postal-code-field-group');
    postalCodeFieldGroup.parentNode.removeChild(postalCodeFieldGroup);
  }

  this.extraInputs.forEach(function (extraInput) {
    if (extraInput.enabled) {
      this._setupExtraInput(extraInput);
    } else {
      this._removeExtraInput(extraInput);
    }
  }.bind(this));

  this.model.asyncDependencyStarting();

  return hostedFields.create(hfOptions).then(function (hostedFieldsInstance) {
    this.hostedFieldsInstance = hostedFieldsInstance;
    this.hostedFieldsInstance.on('blur', this._onBlurEvent.bind(this));
    this.hostedFieldsInstance.on('cardTypeChange', this._onCardTypeChangeEvent.bind(this));
    this.hostedFieldsInstance.on('focus', this._onFocusEvent.bind(this));
    this.hostedFieldsInstance.on('notEmpty', this._onNotEmptyEvent.bind(this));
    this.hostedFieldsInstance.on('validityChange', this._onValidityChangeEvent.bind(this));

    this.model.asyncDependencyReady();
  }.bind(this)).catch(function (err) {
    this.model.asyncDependencyFailed({
      view: this.ID,
      error: err
    });
  }.bind(this));
};

CardView.prototype._setupExtraInput = function (extraInput) {
  var self = this;
  var fieldNameKebab = camelCaseToKebabCase(extraInput.fieldName);
  var field = this.getElementById(fieldNameKebab + '-field-group');
  var input = field.querySelector('input');
  var nameContainer = field.querySelector('.braintree-form__hosted-field');

  input.addEventListener('keyup', function () {
    var valid = self._validateExtraInput(extraInput, true);

    classlist.toggle(nameContainer, 'braintree-form__field--valid', valid);

    if (valid) {
      self.hideFieldError(extraInput.fieldName);
    }

    self._sendRequestableEvent();
  }, false);

  if (extraInput.required) {
    input.addEventListener('blur', function () {
      // the active element inside the blur event is the document.body
      // by taking it out of the event loop, we can detect the new
      // active element (hosted field or other card view element)
      setTimeout(function () {
        if (isCardViewElement()) {
          self._validateExtraInput(extraInput, true);
        }
      }, 0);
    }, false);
  }
};

CardView.prototype._removeExtraInput = function (extraInput) {
  var field = this.getElementById(camelCaseToKebabCase(extraInput.fieldName) + '-field-group');

  field.parentNode.removeChild(field);
};

CardView.prototype._sendRequestableEvent = function () {
  if (!this._isTokenizing) {
    this.model.setPaymentMethodRequestable({
      isRequestable: this._validateForm(),
      type: constants.paymentMethodTypes.card
    });
  }
};

CardView.prototype._generateHostedFieldsOptions = function () {
  var challenges = this.client.getConfiguration().gatewayConfiguration.challenges;
  var hasCVVChallenge = challenges.indexOf('cvv') !== -1;
  var hasPostalCodeChallenge = challenges.indexOf('postal_code') !== -1;
  var overrides = this.model.merchantConfiguration.card && this.model.merchantConfiguration.card.overrides;
  var options = {
    client: this.client,
    fields: {
      number: {
        selector: this._generateFieldSelector('number'),
        placeholder: generateCardNumberPlaceholder()
      },
      expirationDate: {
        selector: this._generateFieldSelector('expiration'),
        placeholder: this.strings.expirationDatePlaceholder
      },
      cvv: {
        selector: this._generateFieldSelector('cvv'),
        placeholder: addBullets(3)
      },
      postalCode: {
        selector: this._generateFieldSelector('postal-code')
      }
    },
    styles: {
      input: {
        'font-size': '16px',
        'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
        color: '#000'
      },
      ':focus': {
        color: 'black'
      },
      '::-webkit-input-placeholder': {
        color: '#6a6a6a'
      },
      ':-moz-placeholder': {
        color: '#6a6a6a'
      },
      '::-moz-placeholder': {
        color: '#6a6a6a'
      },
      ':-ms-input-placeholder ': {
        color: '#6a6a6a'
      },
      'input::-ms-clear': {
        color: 'transparent'
      }
    }
  };

  if (!hasCVVChallenge) {
    delete options.fields.cvv;
  }

  if (!hasPostalCodeChallenge) {
    delete options.fields.postalCode;
  }

  if (!overrides) { return options; }

  if (overrides.fields) {
    if (overrides.fields.cvv && overrides.fields.cvv.placeholder) {
      this._hasCustomCVVPlaceholder = true;
    }

    Object.keys(overrides.fields).forEach(function (field) {
      if ((field === 'cvv' || field === 'postalCode') && overrides.fields[field] === null) {
        delete options.fields[field];
        return;
      }

      if (!options.fields[field]) {
        return;
      }

      assign(options.fields[field], overrides.fields[field], {
        selector: options.fields[field].selector
      });
    });
  }

  if (overrides.styles) {
    Object.keys(overrides.styles).forEach(function (style) {
      if (overrides.styles[style] === null) {
        delete options.styles[style];
        return;
      }

      normalizeStyles(overrides.styles[style]);
      options.styles[style] = options.styles[style] || {};

      assign(options.styles[style], overrides.styles[style]);
    });
  }

  return options;
};

CardView.prototype._validateForm = function (showFieldErrors) {
  var cardType, cardTypeSupported, state;
  var isValid = true;
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  if (!this.hostedFieldsInstance) {
    return false;
  }

  state = this.hostedFieldsInstance.getState();

  Object.keys(state.fields).forEach(function (key) {
    var field = state.fields[key];

    if (!showFieldErrors && !isValid) {
      // return early if form is already invalid
      // and we don't need to display all field errors
      return;
    }

    if (field.isEmpty) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError(key, this.strings['fieldEmptyFor' + capitalize(key)]);
      }
    } else if (!field.isValid) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError(key, this.strings['fieldInvalidFor' + capitalize(key)]);
      }
    }
  }.bind(this));

  if (state.fields.number.isValid) {
    cardType = constants.configurationCardTypes[state.cards[0].type];
    cardTypeSupported = supportedCardTypes.indexOf(cardType) !== -1;

    if (!cardTypeSupported) {
      isValid = false;

      if (showFieldErrors) {
        this.showFieldError('number', this.strings.unsupportedCardTypeError);
      }
    }
  }

  if (this.extraInputs) {
    this.extraInputs.forEach(function (extraInput) {
      var fieldIsValid;

      if (!extraInput.enabled) {
        return;
      }

      fieldIsValid = this._validateExtraInput(extraInput, showFieldErrors);

      isValid = isValid && fieldIsValid;
    }.bind(this));
  }

  return isValid;
};

CardView.prototype._validateExtraInput = function (extraInput, showFieldError) {
  var fieldNameKebab = camelCaseToKebabCase(extraInput.fieldName);
  var field = this.getElementById(fieldNameKebab + '-field-group');
  var input = field.querySelector('input');
  var valid = true;

  if (extraInput.required) {
    valid = input.value.length > 0;

    if (!valid && showFieldError) {
      this.showFieldError(extraInput.fieldName, extraInput.requiredError);
    }
  }

  extraInput.validations.forEach(function (validation) {
    var validationPassed = validation.isValid(input.value);

    if (!validationPassed && showFieldError) {
      this.showFieldError(extraInput.fieldName, validation.error);
    }

    valid = valid && validationPassed;
  }.bind(this));

  return valid;
};

CardView.prototype.getPaymentMethod = function () { // eslint-disable-line consistent-return
  var formIsValid = this._validateForm();

  if (formIsValid) {
    return {
      type: constants.paymentMethodTypes.card
    };
  }
};

CardView.prototype.tokenize = function () {
  var transitionCallback;
  var self = this;
  var state = self.hostedFieldsInstance.getState();
  var tokenizeOptions = {
    vault: !self.model.isGuestCheckout
  };

  this.model.clearError();

  if (!this._validateForm(true)) {
    self.model.reportError('hostedFieldsFieldsInvalidError');
    classlist.remove(self.element, 'braintree-sheet--loading');

    return Promise.reject(new DropinError(constants.errors.NO_PAYMENT_METHOD_ERROR));
  }

  if (this.hasCardholderName) {
    tokenizeOptions.cardholderName = this.cardholderNameInput.value;
  }

  self._isTokenizing = true;

  return self.hostedFieldsInstance.tokenize(tokenizeOptions).then(function (payload) {
    Object.keys(state.fields).forEach(function (field) {
      self.hostedFieldsInstance.clear(field);
    });

    if (!self.model.isGuestCheckout) {
      payload.vaulted = true;
    }

    return new Promise(function (resolve) {
      transitionCallback = function () {
        // Wait for braintree-sheet--tokenized class to be added in IE 9
        // before attempting to remove it
        setTimeout(function () {
          self.model.addPaymentMethod(payload);
          resolve(payload);
          classlist.remove(self.element, 'braintree-sheet--tokenized');
        }, 0);
        self._isTokenizing = false;
      };

      transitionHelper.onTransitionEnd(self.element, 'max-height', transitionCallback);

      setTimeout(function () {
        classlist.remove(self.element, 'braintree-sheet--loading');
      }, constants.CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);

      classlist.add(self.element, 'braintree-sheet--tokenized');
    });
  }).catch(function (err) {
    self._isTokenizing = false;
    self.model.reportError(err);
    classlist.remove(self.element, 'braintree-sheet--loading');
    return Promise.reject(new DropinError({
      message: constants.errors.NO_PAYMENT_METHOD_ERROR,
      braintreeWebError: err
    }));
  });
};

CardView.prototype.showFieldError = function (field, errorMessage) {
  var fieldError;
  var fieldGroup = this.getElementById(camelCaseToKebabCase(field) + '-field-group');
  var input = fieldGroup.querySelector('input');

  if (!this.fieldErrors.hasOwnProperty(field)) {
    this.fieldErrors[field] = this.getElementById(camelCaseToKebabCase(field) + '-field-error');
  }

  classlist.add(fieldGroup, 'braintree-form__field-group--has-error');

  fieldError = this.fieldErrors[field];
  fieldError.innerHTML = errorMessage;

  if (input && isNormalFieldElement(input)) {
    input.setAttribute('aria-invalid', true);
  } else {
    this.hostedFieldsInstance.setAttribute({
      field: field,
      attribute: 'aria-invalid',
      value: true
    });
    this.hostedFieldsInstance.setMessage({
      field: field,
      message: errorMessage
    });
  }
};

CardView.prototype.hideFieldError = function (field) {
  var fieldGroup = this.getElementById(camelCaseToKebabCase(field) + '-field-group');
  var input = fieldGroup.querySelector('input');

  if (!this.fieldErrors.hasOwnProperty(field)) {
    this.fieldErrors[field] = this.getElementById(camelCaseToKebabCase(field) + '-field-error');
  }

  classlist.remove(fieldGroup, 'braintree-form__field-group--has-error');

  if (input && isNormalFieldElement(input)) {
    input.removeAttribute('aria-invalid');
  } else {
    this.hostedFieldsInstance.removeAttribute({
      field: field,
      attribute: 'aria-invalid'
    });
    this.hostedFieldsInstance.setMessage({
      field: field,
      message: ''
    });
  }
};

CardView.prototype.teardown = function () {
  return this.hostedFieldsInstance.teardown();
};

CardView.prototype._generateFieldSelector = function (field) {
  return '#braintree--dropin__' + this.model.componentID + ' .braintree-form-' + field;
};

CardView.prototype._onBlurEvent = function (event) {
  var field = event.fields[event.emittedBy];
  var fieldGroup = this.getElementById(camelCaseToKebabCase(event.emittedBy) + '-field-group');

  classlist.remove(fieldGroup, 'braintree-form__field-group--is-focused');

  if (shouldApplyFieldEmptyError(field)) {
    this.showFieldError(event.emittedBy, this.strings['fieldEmptyFor' + capitalize(event.emittedBy)]);
  } else if (!field.isEmpty && !field.isValid) {
    this.showFieldError(event.emittedBy, this.strings['fieldInvalidFor' + capitalize(event.emittedBy)]);
  } else if (event.emittedBy === 'number' && !this._isCardTypeSupported(event.cards[0].type)) {
    this.showFieldError('number', this.strings.unsupportedCardTypeError);
  }

  setTimeout(function () {
    // when focusing on a field by clicking the label,
    // we need to wait a bit for the iframe to be
    // focused properly before applying validations
    if (shouldApplyFieldEmptyError(field)) {
      this.showFieldError(event.emittedBy, this.strings['fieldEmptyFor' + capitalize(event.emittedBy)]);
    }
  }.bind(this), 150);
};

CardView.prototype._onCardTypeChangeEvent = function (event) {
  var cardType;
  var cardNumberHrefLink = '#iconCardFront';
  var cvvHrefLink = '#iconCVVBack';
  var cvvDescriptor = this.strings.cvvThreeDigitLabelSubheading;
  var cvvPlaceholder = addBullets(3);
  var numberFieldGroup = this.getElementById('number-field-group');

  if (event.cards.length === 1) {
    cardType = event.cards[0].type;
    cardNumberHrefLink = '#icon-' + cardType;
    if (cardType === 'american-express') {
      cvvHrefLink = '#iconCVVFront';
      cvvDescriptor = this.strings.cvvFourDigitLabelSubheading;
      cvvPlaceholder = addBullets(4);
    }
    // Keep icon visible when field is not focused
    classlist.add(numberFieldGroup, 'braintree-form__field-group--card-type-known');
  } else {
    classlist.remove(numberFieldGroup, 'braintree-form__field-group--card-type-known');
  }

  this.cardNumberIconSvg.setAttribute('xlink:href', cardNumberHrefLink);

  if (this.hasCVV) {
    this.cvvIconSvg.setAttribute('xlink:href', cvvHrefLink);
    this.cvvLabelDescriptor.innerHTML = cvvDescriptor;

    if (!this._hasCustomCVVPlaceholder) {
      this.hostedFieldsInstance.setAttribute({
        field: 'cvv',
        attribute: 'placeholder',
        value: cvvPlaceholder
      });
    }
  }
};

CardView.prototype._onFocusEvent = function (event) {
  var fieldGroup = this.getElementById(camelCaseToKebabCase(event.emittedBy) + '-field-group');

  classlist.add(fieldGroup, 'braintree-form__field-group--is-focused');
};

CardView.prototype._onNotEmptyEvent = function (event) {
  this.hideFieldError(event.emittedBy);
};

CardView.prototype._onValidityChangeEvent = function (event) {
  var isValid;
  var field = event.fields[event.emittedBy];

  if (event.emittedBy === 'number' && event.cards[0]) {
    isValid = field.isValid && this._isCardTypeSupported(event.cards[0].type);
  } else {
    isValid = field.isValid;
  }

  classlist.toggle(field.container, 'braintree-form__field--valid', isValid);

  if (field.isPotentiallyValid) {
    this.hideFieldError(event.emittedBy);
  }

  this._sendRequestableEvent();
};

CardView.prototype.requestPaymentMethod = function () {
  classlist.add(this.element, 'braintree-sheet--loading');
  return this.tokenize();
};

CardView.prototype.onSelection = function () {
  if (!this.hostedFieldsInstance) {
    return;
  }

  if (this.hasCardholderName) {
    setTimeout(function () { // wait until input is visible
      this.cardholderNameInput.focus();
    }.bind(this), 1);
  } else {
    this.hostedFieldsInstance.focus('number');
  }
};

CardView.prototype._hideUnsupportedCardIcons = function () {
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  Object.keys(constants.configurationCardTypes).forEach(function (paymentMethodCardType) {
    var cardIcon;
    var configurationCardType = constants.configurationCardTypes[paymentMethodCardType];

    if (supportedCardTypes.indexOf(configurationCardType) === -1) {
      cardIcon = this.getElementById(paymentMethodCardType + '-card-icon');
      classlist.add(cardIcon, 'braintree-hidden');
    }
  }.bind(this));
};

CardView.prototype._isCardTypeSupported = function (cardType) {
  var configurationCardType = constants.configurationCardTypes[cardType];
  var supportedCardTypes = this.client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes;

  return supportedCardTypes.indexOf(configurationCardType) !== -1;
};

CardView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;

  return Promise.resolve(gatewayConfiguration.creditCards.supportedCardTypes.length > 0);
};

function isNormalFieldElement(element) {
  return element.id.indexOf('braintree__card-view-input') !== -1;
}

function shouldApplyFieldEmptyError(field) {
  return field.isEmpty && isCardViewElement();
}

function isCardViewElement() {
  var activeId = document.activeElement && document.activeElement.id;
  var isHostedFieldsElement = document.activeElement instanceof HTMLIFrameElement && activeId.indexOf('braintree-hosted-field') !== -1;

  return isHostedFieldsElement || isNormalFieldElement(document.activeElement);
}

function camelCaseToKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function capitalize(string) {
  return string[0].toUpperCase() + string.substr(1);
}

function normalizeStyles(styles) {
  Object.keys(styles).forEach(function (style) {
    var transformedKeyName = camelCaseToKebabCase(style);

    styles[transformedKeyName] = styles[style];
  });
}

function addBullets(number) {
  var bulletCharacter = isUtf8() ? '•' : '*';

  return Array(number + 1).join(bulletCharacter);
}

function generateCardNumberPlaceholder() {
  var four = addBullets(4);

  return [four, four, four, four].join(' ');
}

module.exports = CardView;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module braintree-web/hosted-fields */

var HostedFields = __webpack_require__(136);
var basicComponentVerification = __webpack_require__(16);
var errors = __webpack_require__(23);
var supportsInputFormatting = __webpack_require__(154);
var wrapPromise = __webpack_require__(3);
var BraintreeError = __webpack_require__(1);
var Promise = __webpack_require__(4);
var VERSION = "3.31.0";

/**
 * Fields used in {@link module:braintree-web/hosted-fields~fieldOptions fields options}
 * @typedef {object} field
 * @property {string} selector A CSS selector to find the container where the hosted field will be inserted.
 * @property {string} [placeholder] Will be used as the `placeholder` attribute of the input. If `placeholder` is not natively supported by the browser, it will be polyfilled.
 * @property {string} [type] Will be used as the `type` attribute of the input. To mask `cvv` input, for instance, `type: "password"` can be used.
 * @property {boolean} [formatInput=true] Enable or disable automatic formatting on this field.
 * @property {object|boolean} [maskInput=false] Enable or disable input masking when input is not focused. If set to `true` instead of an object, the defaults for the `maskInput` parameters will be used.
 * @property {string} [maskInput.character=•] The character to use when masking the input. The default character ('•') uses a unicode symbol, so the webpage must support UTF-8 characters when using the default.
 * @property {object|boolean} [select] If truthy, this field becomes a `<select>` dropdown list. This can only be used for `expirationMonth` and `expirationYear` fields. If you do not use a `placeholder` property for the field, the current month/year will be the default selected value.
 * @property {string[]} [select.options] An array of 12 strings, one per month. This can only be used for the `expirationMonth` field. For example, the array can look like `['01 - January', '02 - February', ...]`.
 * @property {number} [maxlength] This option applies only to the CVV and postal code fields. Will be used as the `maxlength` attribute of the input if it is less than the default. The primary use cases for the `maxlength` option are: limiting the length of the CVV input for CVV-only verifications when the card type is known and limiting the length of the postal code input when cards are coming from a known region.
 * @property {number} [minlength=3] This option applies only to the cvv and postal code fields. Will be used as the `minlength` attribute of the input.
 * For postal code fields, the default value is 3, representing the Icelandic postal code length. This option's primary use case is to increase the `minlength`, e.g. for US customers, the postal code `minlength` can be set to 5.
 * For cvv fields, the default value is 3. The `minlength` attribute only applies to integrations capturing a cvv without a number field.
 * @property {string} [prefill] A value to prefill the field with. For example, when creating an update card form, you can prefill the expiration date fields with the old expiration date data.
 */

/**
 * An object that has {@link module:braintree-web/hosted-fields~field field objects} for each field. Used in {@link module:braintree-web/hosted-fields~create create}.
 * @typedef {object} fieldOptions
 * @property {field} [number] A field for card number.
 * @property {field} [expirationDate] A field for expiration date in `MM/YYYY` format. This should not be used with the `expirationMonth` and `expirationYear` properties.
 * @property {field} [expirationMonth] A field for expiration month in `MM` format. This should be used with the `expirationYear` property.
 * @property {field} [expirationYear] A field for expiration year in `YYYY` format. This should be used with the `expirationMonth` property.
 * @property {field} [cvv] A field for 3 or 4 digit CVV or CID.
 * @property {field} [postalCode] A field for postal or region code.
 */

/**
 * An object that represents CSS that will be applied in each hosted field. This object looks similar to CSS. Typically, these styles involve fonts (such as `font-family` or `color`).
 *
 * These are the CSS properties that Hosted Fields supports. Any other CSS should be specified on your page and outside of any Braintree configuration. Trying to set unsupported properties will fail and put a warning in the console.
 *
 * Supported CSS properties are:
 * `appearance`
 * `color`
 * `direction`
 * `font-family`
 * `font-size-adjust`
 * `font-size`
 * `font-stretch`
 * `font-style`
 * `font-variant-alternates`
 * `font-variant-caps`
 * `font-variant-east-asian`
 * `font-variant-ligatures`
 * `font-variant-numeric`
 * `font-variant`
 * `font-weight`
 * `font`
 * `letter-spacing`
 * `line-height`
 * `opacity`
 * `outline`
 * `padding`
 * `text-shadow`
 * `transition`
 * `-moz-appearance`
 * `-moz-osx-font-smoothing`
 * `-moz-tap-highlight-color`
 * `-moz-transition`
 * `-webkit-appearance`
 * `-webkit-font-smoothing`
 * `-webkit-tap-highlight-color`
 * `-webkit-transition`
 * @typedef {object} styleOptions
 */

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {fieldOptions} options.fields A {@link module:braintree-web/hosted-fields~fieldOptions set of options for each field}.
 * @param {styleOptions} options.styles {@link module:braintree-web/hosted-fields~styleOptions Styles} applied to each field.
 * @param {callback} [callback] The second argument, `data`, is the {@link HostedFields} instance. If no callback is provided, `create` returns a promise that resolves with the {@link HostedFields} instance.
 * @returns {void}
 * @example
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       'font-size': '16pt',
 *       'color': '#3A3A3A'
 *     },
 *     '.number': {
 *       'font-family': 'monospace'
 *     },
 *     '.valid': {
 *       'color': 'green'
 *     }
 *   },
 *   fields: {
 *     number: {
 *       selector: '#card-number'
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
 *       type: 'month'
 *     }
 *   }
 * }, callback);
 * @example <caption>Right to Left Language Support</caption>
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   styles: {
 *     'input': {
 *       // other styles
 *       direction: 'rtl'
 *     },
 *   },
 *   fields: {
 *     number: {
 *       selector: '#card-number',
 *       // Credit card formatting is not currently supported
 *       // with RTL languages, so we need to turn it off for the number input
 *       formatInput: false
 *     },
 *     cvv: {
 *       selector: '#cvv',
 *       placeholder: '•••'
 *     },
 *     expirationDate: {
 *       selector: '#expiration-date',
 *       type: 'month'
 *     }
 *   }
 * }, callback);
 * @example <caption>Creating an expiration date update form with prefilled data</caption>
 * var storedCreditCardInformation = {
 *   // get this info from your server
 *   // with a payment method lookup
 *   month: '09',
 *   year: '2017'
 * };
 *
 * braintree.hostedFields.create({
 *   client: clientInstance,
 *   fields: {
 *     expirationMonth: {
 *       selector: '#expiration-month',
 *       prefill: storedCreditCardInformation.month
 *     },
 *     expirationMonth: {
 *       selector: '#expiration-year',
 *       prefill: storedCreditCardInformation.year
 *     }
 *   }
 * }, callback);
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Hosted Fields',
    client: options.client
  }).then(function () {
    var integration = new HostedFields(options);

    return new Promise(function (resolve, reject) {
      integration.on('ready', function () {
        resolve(integration);
      });
      integration.on('timeout', function () {
        reject(new BraintreeError(errors.HOSTED_FIELDS_TIMEOUT));
      });
    });
  });
}

module.exports = {
  /**
   * @static
   * @function supportsInputFormatting
   * @description Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true. For a list of unsupported browsers, [go here](https://github.com/braintree/restricted-input/blob/master/README.md#browsers-where-formatting-is-turned-off-automatically).
   * @returns {Boolean} Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true.
   * @example
   * <caption>Conditionally choosing split expiration date inputs if formatting is unavailable</caption>
   * var canFormat = braintree.hostedFields.supportsInputFormatting();
   * var fields = {
   *   number: {
   *     selector: '#card-number'
   *   },
   *   cvv: {
   *     selector: '#cvv'
   *   }
   * };
   *
   * if (canFormat) {
   *   fields.expirationDate = {
   *     selection: '#expiration-date'
   *   };
   *   functionToCreateAndInsertExpirationDateDivToForm();
   * } else {
   *   fields.expirationMonth = {
   *     selection: '#expiration-month'
   *   };
   *   fields.expirationYear = {
   *     selection: '#expiration-year'
   *   };
   *   functionToCreateAndInsertExpirationMonthAndYearDivsToForm();
   * }
   *
   * braintree.hostedFields.create({
   *   client: clientInstance,
   *   styles: {
   *     // Styles
   *   },
   *   fields: fields
   * }, callback);
   */
  supportsInputFormatting: supportsInputFormatting,
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var Destructor = __webpack_require__(137);
var classlist = __webpack_require__(139);
var iFramer = __webpack_require__(52);
var Bus = __webpack_require__(53);
var BraintreeError = __webpack_require__(1);
var composeUrl = __webpack_require__(146);
var constants = __webpack_require__(28);
var errors = __webpack_require__(23);
var INTEGRATION_TIMEOUT_MS = __webpack_require__(17).INTEGRATION_TIMEOUT_MS;
var uuid = __webpack_require__(22);
var findParentTags = __webpack_require__(147);
var browserDetection = __webpack_require__(148);
var events = constants.events;
var EventEmitter = __webpack_require__(150);
var injectFrame = __webpack_require__(151);
var analytics = __webpack_require__(7);
var whitelistedFields = constants.whitelistedFields;
var methods = __webpack_require__(11);
var convertMethodsToError = __webpack_require__(12);
var sharedErrors = __webpack_require__(18);
var getCardTypes = __webpack_require__(152);
var attributeValidationError = __webpack_require__(153);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);

/**
 * @typedef {object} HostedFields~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, always `CreditCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * @typedef {object} HostedFields~stateObject
 * @description The event payload sent from {@link HostedFields#on|on} or {@link HostedFields#getState|getState}.
 * @property {HostedFields~hostedFieldsCard[]} cards
 * This will return an array of potential {@link HostedFields~hostedFieldsCard|cards}. If the card type has been determined, the array will contain only one card.
 * Internally, Hosted Fields uses <a href="https://github.com/braintree/credit-card-type">credit-card-type</a>,
 * an open-source card detection library.
 * @property {string} emittedBy
 * The name of the field associated with an event. This will not be included if returned by {@link HostedFields#getState|getState}. It will be one of the following strings:<br>
 * - `"number"`
 * - `"cvv"`
 * - `"expirationDate"`
 * - `"expirationMonth"`
 * - `"expirationYear"`
 * - `"postalCode"`
 * @property {object} fields
 * @property {?HostedFields~hostedFieldsFieldData} fields.number {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the number field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.cvv {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the CVV field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationDate {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration date field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationMonth {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration month field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.expirationYear {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the expiration year field, if it is present.
 * @property {?HostedFields~hostedFieldsFieldData} fields.postalCode {@link HostedFields~hostedFieldsFieldData|hostedFieldsFieldData} for the postal code field, if it is present.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsFieldData
 * @description Data about Hosted Fields fields, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {HTMLElement} container Reference to the container DOM element on your page associated with the current event.
 * @property {boolean} isFocused Whether or not the input is currently focused.
 * @property {boolean} isEmpty Whether or not the user has entered a value in the input.
 * @property {boolean} isPotentiallyValid
 * A determination based on the future validity of the input value.
 * This is helpful when a user is entering a card number and types <code>"41"</code>.
 * While that value is not valid for submission, it is still possible for
 * it to become a fully qualified entry. However, if the user enters <code>"4x"</code>
 * it is clear that the card number can never become valid and isPotentiallyValid will
 * return false.
 * @property {boolean} isValid Whether or not the value of the associated input is <i>fully</i> qualified for submission.
 */

/**
 * @typedef {object} HostedFields~hostedFieldsCard
 * @description Information about the card type, sent in {@link HostedFields~stateObject|stateObjects}.
 * @property {string} type The code-friendly representation of the card type. It will be one of the following strings:
 * - `american-express`
 * - `diners-club`
 * - `discover`
 * - `jcb`
 * - `maestro`
 * - `master-card`
 * - `unionpay`
 * - `visa`
 * @property {string} niceType The pretty-printed card type. It will be one of the following strings:
 * - `American Express`
 * - `Diners Club`
 * - `Discover`
 * - `JCB`
 * - `Maestro`
 * - `MasterCard`
 * - `UnionPay`
 * - `Visa`
 * @property {object} code
 * This object contains data relevant to the security code requirements of the card brand.
 * For example, on a Visa card there will be a <code>CVV</code> of 3 digits, whereas an
 * American Express card requires a 4-digit <code>CID</code>.
 * @property {string} code.name <code>"CVV"</code> <code>"CID"</code> <code>"CVC"</code>
 * @property {number} code.size The expected length of the security code. Typically, this is 3 or 4.
 */

/**
 * @name HostedFields#on
 * @function
 * @param {string} event The name of the event to which you are subscribing.
 * @param {function} handler A callback to handle the event.
 * @description Subscribes a handler function to a named event. `event` should be {@link HostedFields#event:blur|blur}, {@link HostedFields#event:focus|focus}, {@link HostedFields#event:empty|empty}, {@link HostedFields#event:notEmpty|notEmpty}, {@link HostedFields#event:cardTypeChange|cardTypeChange}, or {@link HostedFields#event:validityChange|validityChange}. Events will emit a {@link HostedFields~stateObject|stateObject}.
 * @example
 * <caption>Listening to a Hosted Field event, in this case 'focus'</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'has been focused');
 *   });
 * });
 * @returns {void}
 */

/**
 * This event is emitted when the user requests submission of an input field, such as by pressing the Enter or Return key on their keyboard, or mobile equivalent.
 * @event HostedFields#inputSubmitRequest
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Clicking a submit button upon hitting Enter (or equivalent) within a Hosted Field</caption>
 * var hostedFields = require('braintree-web/hosted-fields');
 * var submitButton = document.querySelector('input[type="submit"]');
 *
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('inputSubmitRequest', function () {
 *     // User requested submission, e.g. by pressing Enter or equivalent
 *     submitButton.click();
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from having data to being empty.
 * @event HostedFields#empty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an empty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('empty', function (event) {
 *     console.log(event.emittedBy, 'is now empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field transitions from being empty to having data.
 * @event HostedFields#notEmpty
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to an notEmpty event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('notEmpty', function (event) {
 *     console.log(event.emittedBy, 'is now not empty');
 *   });
 * });
 */

/**
 * This event is emitted when a field loses focus.
 * @event HostedFields#blur
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a blur event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('blur', function (event) {
 *     console.log(event.emittedBy, 'lost focus');
 *   });
 * });
 */

/**
 * This event is emitted when a field gains focus.
 * @event HostedFields#focus
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a focus event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('focus', function (event) {
 *     console.log(event.emittedBy, 'gained focus');
 *   });
 * });
 */

/**
 * This event is emitted when activity within the number field has changed such that the possible card type has changed.
 * @event HostedFields#cardTypeChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a cardTypeChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('cardTypeChange', function (event) {
 *     if (event.cards.length === 1) {
 *       console.log(event.cards[0].type);
 *     } else {
 *       console.log('Type of card not yet known');
 *     }
 *   });
 * });
 */

/**
 * This event is emitted when the validity of a field has changed. Validity is represented in the {@link HostedFields~stateObject|stateObject} as two booleans: `isValid` and `isPotentiallyValid`.
 * @event HostedFields#validityChange
 * @type {HostedFields~stateObject}
 * @example
 * <caption>Listening to a validityChange event</caption>
 * hostedFields.create({ ... }, function (createErr, hostedFieldsInstance) {
 *   hostedFieldsInstance.on('validityChange', function (event) {
 *     var field = event.fields[event.emittedBy];
 *
 *     if (field.isValid) {
 *       console.log(event.emittedBy, 'is fully valid');
 *     } else if (field.isPotentiallyValid) {
 *       console.log(event.emittedBy, 'is potentially valid');
 *     } else {
 *       console.log(event.emittedBy, 'is not valid');
 *     }
 *   });
 * });
 */

function createInputEventHandler(fields) {
  return function (eventData) {
    var field;
    var merchantPayload = eventData.merchantPayload;
    var emittedBy = merchantPayload.emittedBy;
    var container = fields[emittedBy].containerElement;

    Object.keys(merchantPayload.fields).forEach(function (key) {
      merchantPayload.fields[key].container = fields[key].containerElement;
    });

    field = merchantPayload.fields[emittedBy];

    if (eventData.type === 'blur') {
      performBlurFixForIos(container);
    }

    classlist.toggle(container, constants.externalClasses.FOCUSED, field.isFocused);
    classlist.toggle(container, constants.externalClasses.VALID, field.isValid);
    classlist.toggle(container, constants.externalClasses.INVALID, !field.isPotentiallyValid);

    this._state = { // eslint-disable-line no-invalid-this
      cards: merchantPayload.cards,
      fields: merchantPayload.fields
    };

    this._emit(eventData.type, merchantPayload); // eslint-disable-line no-invalid-this
  };
}

// iOS Safari has a bug where inputs in iframes
// will not dismiss the keyboard when they lose
// focus. We create a hidden button input that we
// can focus on and blur to force the keyboard to
// dismiss. See #229
function performBlurFixForIos(container) {
  var hiddenInput;

  if (!browserDetection.isIos()) {
    return;
  }

  if (document.activeElement === document.body) {
    hiddenInput = container.querySelector('input');

    if (!hiddenInput) {
      hiddenInput = document.createElement('input');

      hiddenInput.type = 'button';
      hiddenInput.style.height = '0px';
      hiddenInput.style.width = '0px';
      hiddenInput.style.opacity = '0';
      hiddenInput.style.padding = '0';
      hiddenInput.style.position = 'absolute';
      hiddenInput.style.left = '-200%';
      hiddenInput.style.top = '0px';

      container.insertBefore(hiddenInput, container.firstChild);
    }

    hiddenInput.focus();
    hiddenInput.blur();
  }
}

/**
 * @class HostedFields
 * @param {object} options The Hosted Fields {@link module:braintree-web/hosted-fields.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/hosted-fields.create|braintree-web.hosted-fields.create} instead.</strong>
 * @classdesc This class represents a Hosted Fields component produced by {@link module:braintree-web/hosted-fields.create|braintree-web/hosted-fields.create}. Instances of this class have methods for interacting with the input fields within Hosted Fields' iframes.
 */
function HostedFields(options) {
  var failureTimeout, clientConfig;
  var self = this;
  var fields = {};
  var fieldCount = 0;
  var componentId = uuid();

  clientConfig = options.client.getConfiguration();

  if (!options.fields) {
    throw new BraintreeError({
      type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
      code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
      message: 'options.fields is required when instantiating Hosted Fields.'
    });
  }

  EventEmitter.call(this);

  this._injectedNodes = [];
  this._destructor = new Destructor();
  this._fields = fields;
  this._state = {
    fields: {},
    cards: getCardTypes('')
  };

  this._bus = new Bus({
    channel: componentId,
    merchantUrl: location.href
  });

  this._destructor.registerFunctionForTeardown(function () {
    self._bus.teardown();
  });

  this._client = options.client;

  analytics.sendEvent(this._client, 'custom.hosted-fields.initialized');

  Object.keys(options.fields).forEach(function (key) {
    var field, container, frame;

    if (!constants.whitelistedFields.hasOwnProperty(key)) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
        message: '"' + key + '" is not a valid field.'
      });
    }

    field = options.fields[key];

    container = document.querySelector(field.selector);

    if (!container) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
        code: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
        message: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
        details: {
          fieldSelector: field.selector,
          fieldKey: key
        }
      });
    } else if (container.querySelector('iframe[name^="braintree-"]')) {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
        code: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
        message: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
        details: {
          fieldSelector: field.selector,
          fieldKey: key
        }
      });
    }

    if (field.maxlength && typeof field.maxlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for maxlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    if (field.minlength && typeof field.minlength !== 'number') {
      throw new BraintreeError({
        type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
        code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
        message: 'The value for minlength must be a number.',
        details: {
          fieldKey: key
        }
      });
    }

    frame = iFramer({
      type: key,
      name: 'braintree-hosted-field-' + key,
      style: constants.defaultIFrameStyle
    });

    this._injectedNodes = this._injectedNodes.concat(injectFrame(frame, container));
    this._setupLabelFocus(key, container);
    fields[key] = {
      frameElement: frame,
      containerElement: container
    };
    fieldCount++;

    this._state.fields[key] = {
      isEmpty: true,
      isValid: false,
      isPotentiallyValid: true,
      isFocused: false,
      container: container
    };

    setTimeout(function () {
      // Edge has an intermittent issue where
      // the iframes load, but the JavaScript
      // can't message out to the parent page.
      // We can fix this by setting the src
      // to about:blank first followed by
      // the actual source. Both instances
      // of setting the src need to be in a
      // setTimeout to work.
      // In Safari, including this behavior
      // results in a new history event for
      // each iframe. So we only do this
      // hack in browsers that are not
      // safari based.
      if (global.navigator && global.navigator.vendor && global.navigator.vendor.indexOf('Apple') === -1) { // TODO - move to browser detection module
        frame.src = 'about:blank';
      }
      setTimeout(function () {
        frame.src = composeUrl(clientConfig.gatewayConfiguration.assetsUrl, componentId, clientConfig.isDebug);
      }, 0);
    }, 0);
  }.bind(this));

  failureTimeout = setTimeout(function () {
    analytics.sendEvent(self._client, 'custom.hosted-fields.load.timed-out');
    self._emit('timeout');
  }, INTEGRATION_TIMEOUT_MS);

  this._bus.on(events.FRAME_READY, function (reply) {
    fieldCount--;
    if (fieldCount === 0) {
      clearTimeout(failureTimeout);
      reply(options);
      self._emit('ready');
    }
  });

  this._bus.on(
    events.INPUT_EVENT,
    createInputEventHandler(fields).bind(this)
  );

  this._destructor.registerFunctionForTeardown(function () {
    var j, node, parent;

    for (j = 0; j < self._injectedNodes.length; j++) {
      node = self._injectedNodes[j];
      parent = node.parentNode;

      parent.removeChild(node);

      classlist.remove(
        parent,
        constants.externalClasses.FOCUSED,
        constants.externalClasses.INVALID,
        constants.externalClasses.VALID
      );
    }
  });

  this._destructor.registerFunctionForTeardown(function () {
    var methodNames = methods(HostedFields.prototype).concat(methods(EventEmitter.prototype));

    convertMethodsToError(self, methodNames);
  });
}

HostedFields.prototype = Object.create(EventEmitter.prototype, {
  constructor: HostedFields
});

HostedFields.prototype._setupLabelFocus = function (type, container) {
  var labels, i;
  var shouldSkipLabelFocus = browserDetection.isIos();
  var bus = this._bus;

  if (shouldSkipLabelFocus) { return; }
  if (container.id == null) { return; }

  function triggerFocus() {
    bus.emit(events.TRIGGER_INPUT_FOCUS, type);
  }

  labels = Array.prototype.slice.call(document.querySelectorAll('label[for="' + container.id + '"]'));
  labels = labels.concat(findParentTags(container, 'label'));

  for (i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', triggerFocus, false);
  }

  this._destructor.registerFunctionForTeardown(function () {
    for (i = 0; i < labels.length; i++) {
      labels[i].removeEventListener('click', triggerFocus, false);
    }
  });
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/hosted-fields.create|create}.
 * @public
 * @param {callback} [callback] Called on completion, containing an error if one occurred. No data is returned if teardown completes successfully. If no callback is provided, `teardown` returns a promise.
 * @example
 * hostedFieldsInstance.teardown(function (teardownErr) {
 *   if (teardownErr) {
 *     console.error('Could not tear down Hosted Fields!');
 *   } else {
 *     console.info('Hosted Fields has been torn down!');
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.teardown = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    self._destructor.teardown(function (err) {
      analytics.sendEvent(self._client, 'custom.hosted-fields.teardown-completed');

      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

/**
 * Tokenizes fields and returns a nonce payload.
 * @public
 * @param {object} [options] All tokenization options for the Hosted Fields component.
 * @param {boolean} [options.vault=false] When true, will vault the tokenized card. Cards will only be vaulted when using a client created with a client token that includes a customer ID.
 * @param {string} [options.cardholderName] When supplied, the cardholder name to be tokenized with the contents of the fields.
 * @param {string} [options.billingAddress.postalCode] When supplied, this postal code will be tokenized along with the contents of the fields. If a postal code is provided as part of the Hosted Fields configuration, the value of the field will be tokenized and this value will be ignored.
 * @param {string} [options.billingAddress.firstName] When supplied, this customer first name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.lastName] When supplied, this customer last name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.company] When supplied, this company name will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.streetAddress] When supplied, this street address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.extendedAddress] When supplied, this extended address will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.locality] When supplied, this locality (the city) will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.region] When supplied, this region (the state) will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeNumeric] When supplied, this numeric country code will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha2] When supplied, this alpha 2 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryCodeAlpha3] When supplied, this alpha 3 representation of a country will be tokenized along with the contents of the fields.
 * @param {string} [options.billingAddress.countryName] When supplied, this country name will be tokenized along with the contents of the fields.
 *
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link HostedFields~tokenizePayload|tokenizePayload}. If no callback is provided, `tokenize` returns a function that resolves with a {@link HostedFields~tokenizePayload|tokenizePayload}.
 * @example <caption>Tokenize a card</caption>
 * hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     switch (tokenizeErr.code) {
 *       case 'HOSTED_FIELDS_FIELDS_EMPTY':
 *         // occurs when none of the fields are filled in
 *         console.error('All fields are empty! Please fill out the form.');
 *         break;
 *       case 'HOSTED_FIELDS_FIELDS_INVALID':
 *         // occurs when certain fields do not pass client side validation
 *         console.error('Some fields are invalid:', tokenizeErr.details.invalidFieldKeys);
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the fail on duplicate payment method
 *         //     option is set to true
 *         //   * the card being tokenized has previously been vaulted (with any customer)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.fail_on_duplicate_payment_method
 *         console.error('This payment method already exists in your vault.');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED':
 *         // occurs when:
 *         //   * the client token used for client authorization was generated
 *         //     with a customer ID and the verify card option is set to true
 *         //     and you have credit card verification turned on in the Braintree
 *         //     control panel
 *         //   * the cvv does not pass verfication (https://developers.braintreepayments.com/reference/general/testing/#avs-and-cvv/cid-responses)
 *         // See: https://developers.braintreepayments.com/reference/request/client-token/generate/#options.verify_card
 *         console.error('CVV did not pass verification');
 *         break;
 *       case 'HOSTED_FIELDS_FAILED_TOKENIZATION':
 *         // occurs for any other tokenization error on the server
 *         console.error('Tokenization failed server side. Is the card valid?');
 *         break;
 *       case 'HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR':
 *         // occurs when the Braintree gateway cannot be contacted
 *         console.error('Network error occurred when tokenizing.');
 *         break;
 *       default:
 *         console.error('Something bad happened!', tokenizeErr);
 *     }
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize and vault a card</caption>
 * hostedFieldsInstance.tokenize({
 *   vault: true
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with cardholder name</caption>
 * hostedFieldsInstance.tokenize({
 *   cardholderName: 'First Last'
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with the postal code option</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     postalCode: '11111'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @example <caption>Tokenize a card with additional billing address options</caption>
 * hostedFieldsInstance.tokenize({
 *   billingAddress: {
 *     firstName: 'First',
 *     lastName: 'Last',
 *     company: 'Company',
 *     streetAddress: '123 Street',
 *     extendedAddress: 'Unit 1',
 *     // passing just one of the country options is sufficient to
 *     // associate the card details with a particular country
 *     // valid country names and codes can be found here:
 *     // https://developers.braintreepayments.com/reference/general/countries/ruby#list-of-countries
 *     countryName: 'United States',
 *     countryCodeAlpha2: 'US',
 *     countryCodeAlpha3: 'USA',
 *     countryCodeNumeric: '840'
 *   }
 * }, function (tokenizeErr, payload) {
 *   if (tokenizeErr) {
 *     console.error(tokenizeErr);
 *   } else {
 *     console.log('Got nonce:', payload.nonce);
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.tokenize = function (options) {
  var self = this;

  if (!options) {
    options = {};
  }

  return new Promise(function (resolve, reject) {
    self._bus.emit(events.TOKENIZATION_REQUEST, options, function (response) {
      var err = response[0];
      var payload = response[1];

      if (err) {
        reject(err);
      } else {
        resolve(payload);
      }
    });
  });
};

/**
 * Add a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to add a class to. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be added.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is added successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *   }
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.addClass = function (field, classname) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when adding a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot add class to "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.ADD_CLASS, field, classname);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Removes a class to a {@link module:braintree-web/hosted-fields~field field}. Useful for updating field styles when events occur elsewhere in your checkout.
 * @public
 * @param {string} field The field you wish to remove a class from. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} classname The class to be removed.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the class is removed successfully.
 *
 * @example
 * hostedFieldsInstance.addClass('number', 'custom-class', function (addClassErr) {
 *   if (addClassErr) {
 *     console.error(addClassErr);
 *     return;
 *   }
 *
 *   // some time later...
 *   hostedFieldsInstance.removeClass('number', 'custom-class');
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeClass = function (field, classname) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when removing a class.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove class from "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.REMOVE_CLASS, field, classname);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets an attribute of a {@link module:braintree-web/hosted-fields~field field}.
 * Supported attributes are `aria-invalid`, `aria-required`, `disabled`, and `placeholder`.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to add to the field.
 * @param {string} options.value The value for the attribute.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is set successfully.
 *
 * @example <caption>Set the placeholder attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'placeholder',
 *   value: '1111 1111 1111 1111'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @example <caption>Set the aria-required attribute of a field</caption>
 * hostedFieldsInstance.setAttribute({
 *   field: 'number',
 *   attribute: 'aria-required',
 *   value: true
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setAttribute = function (options) {
  var attributeErr, err;

  if (!whitelistedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when setting an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot set attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute, options.value);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.SET_ATTRIBUTE, options.field, options.attribute, options.value);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Sets a visually hidden message (for screenreaders) on a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to set.
 * @param {string} options.field The field to which you wish to add an attribute. Must be a valid {@link module:braintree-web/hosted-fields~field field}.
 * @param {string} options.message The message to set.
 *
 * @example <caption>Set an error message on a field</caption>
 * hostedFieldsInstance.setMessage({
 *   field: 'number',
 *   message: 'Invalid card number'
 * });
 *
 * @example <caption>Remove the message on a field</caption>
 * hostedFieldsInstance.setMessage({
 *   field: 'number',
 *   message: ''
 * });
 *
 * @returns {void}
 */
HostedFields.prototype.setMessage = function (options) {
  this._bus.emit(events.SET_MESSAGE, options.field, options.message);
};

/**
 * Removes a supported attribute from a {@link module:braintree-web/hosted-fields~field field}.
 *
 * @public
 * @param {object} options The options for the attribute you wish to remove.
 * @param {string} options.field The field from which you wish to remove an attribute. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} options.attribute The name of the attribute you wish to remove from the field.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the attribute is removed successfully.
 *
 * @example <caption>Remove the placeholder attribute of a field</caption>
 * hostedFieldsInstance.removeAttribute({
 *   field: 'number',
 *   attribute: 'placeholder'
 * }, function (attributeErr) {
 *   if (attributeErr) {
 *     console.error(attributeErr);
 *   }
 * });
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.removeAttribute = function (options) {
  var attributeErr, err;

  if (!whitelistedFields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + options.field + '" is not a valid field. You must use a valid field option when removing an attribute.'
    });
  } else if (!this._fields.hasOwnProperty(options.field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot remove attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    attributeErr = attributeValidationError(options.attribute);

    if (attributeErr) {
      err = attributeErr;
    } else {
      this._bus.emit(events.REMOVE_ATTRIBUTE, options.field, options.attribute);
    }
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * @deprecated since version 3.8.0. Use {@link HostedFields#setAttribute|setAttribute} instead.
 *
 * @public
 * @param {string} field The field whose placeholder you wish to change. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {string} placeholder Will be used as the `placeholder` attribute of the input.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the placeholder updated successfully.
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
HostedFields.prototype.setPlaceholder = function (field, placeholder) {
  return this.setAttribute({
    field: field,
    attribute: 'placeholder',
    value: placeholder
  });
};

/**
 * Clear the value of a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you wish to clear. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field cleared successfully.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * hostedFieldsInstance.clear('number', function (clearErr) {
 *   if (clearErr) {
 *     console.error(clearErr);
 *   }
 * });
 *
 * @example <caption>Clear several fields</caption>
 * hostedFieldsInstance.clear('number');
 * hostedFieldsInstance.clear('cvv');
 * hostedFieldsInstance.clear('expirationDate');
 */
HostedFields.prototype.clear = function (field) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when clearing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot clear "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.CLEAR_FIELD, field);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Programmatically focus a {@link module:braintree-web/hosted-fields~field field}.
 * @public
 * @param {string} field The field you want to focus. Must be a valid {@link module:braintree-web/hosted-fields~fieldOptions fieldOption}.
 * @param {callback} [callback] Callback executed on completion, containing an error if one occurred. No data is returned if the field focused successfully.
 * @returns {void}
 * @example
 * hostedFieldsInstance.focus('number', function (focusErr) {
 *   if (focusErr) {
 *     console.error(focusErr);
 *   }
 * });
 * @example <caption>Using an event listener</caption>
 * myElement.addEventListener('click', function (e) {
 *   // Note: In Firefox, the focus method can be suppressed
 *   // if the element has a tabindex property or the element
 *   // is an anchor link with an href property.
 *   e.preventDefault();
 *   hostedFieldsInstance.focus('number');
 * });
 */
HostedFields.prototype.focus = function (field) {
  var err;

  if (!whitelistedFields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
      code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
      message: '"' + field + '" is not a valid field. You must use a valid field option when focusing a field.'
    });
  } else if (!this._fields.hasOwnProperty(field)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
      code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
      message: 'Cannot focus "' + field + '" field because it is not part of the current Hosted Fields options.'
    });
  } else {
    this._bus.emit(events.TRIGGER_INPUT_FOCUS, field);
  }

  if (err) {
    return Promise.reject(err);
  }

  return Promise.resolve();
};

/**
 * Returns an {@link HostedFields~stateObject|object} that includes the state of all fields and possible card types.
 * @public
 * @returns {object} {@link HostedFields~stateObject|stateObject}
 * @example <caption>Check if all fields are valid</caption>
 * var state = hostedFields.getState();
 *
 * var formValid = Object.keys(state.fields).every(function (key) {
 *   return state.fields[key].isValid;
 * });
 */
HostedFields.prototype.getState = function () {
  return this._state;
};

module.exports = wrapPromise.wrapPrototype(HostedFields);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var batchExecuteFunctions = __webpack_require__(138);

function Destructor() {
  this._teardownRegistry = [];

  this._isTearingDown = false;
}

Destructor.prototype.registerFunctionForTeardown = function (fn) {
  if (typeof fn === 'function') {
    this._teardownRegistry.push(fn);
  }
};

Destructor.prototype.teardown = function (callback) {
  if (this._isTearingDown) {
    callback(new Error('Destructor is already tearing down'));

    return;
  }

  this._isTearingDown = true;

  batchExecuteFunctions(this._teardownRegistry, function (err) {
    this._teardownRegistry = [];
    this._isTearingDown = false;

    if (typeof callback === 'function') {
      callback(err);
    }
  }.bind(this));
};

module.exports = Destructor;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var once = __webpack_require__(26);

function call(fn, callback) {
  var isSync = fn.length === 0;

  if (isSync) {
    fn();
    callback(null);
  } else {
    fn(callback);
  }
}

module.exports = function (functions, cb) {
  var i;
  var length = functions.length;
  var remaining = length;
  var callback = once(cb);

  if (length === 0) {
    callback(null);

    return;
  }

  function finish(err) {
    if (err) {
      callback(err);

      return;
    }

    remaining -= 1;
    if (remaining === 0) {
      callback(null);
    }
  }

  for (i = 0; i < length; i++) {
    call(functions[i], finish);
  }
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classesOf(element) {
  return element.className.trim().split(/\s+/);
}

function add(element) {
  var toAdd = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toAdd.indexOf(classname) === -1;
  }).concat(toAdd).join(' ');

  element.className = className;
}

function remove(element) {
  var toRemove = Array.prototype.slice.call(arguments, 1);
  var className = _classesOf(element).filter(function (classname) {
    return toRemove.indexOf(classname) === -1;
  }).join(' ');

  element.className = className;
}

function toggle(element, classname, adding) {
  if (adding) {
    add(element, classname);
  } else {
    remove(element, classname);
  }
}

module.exports = {
  add: add,
  remove: remove,
  toggle: toggle
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function setAttributes(element, attributes) {
  var value;

  for (var key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      value = attributes[key];

      if (value == null) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, value);
      }
    }
  }
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  src: 'about:blank',
  frameBorder: 0,
  allowtransparency: true,
  scrolling: 'no'
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function assign(target) {
  var objs = Array.prototype.slice.call(arguments, 1);

  objs.forEach(function (obj) {
    if (typeof obj !== 'object') { return; }

    Object.keys(obj).forEach(function (key) {
      target[key] = obj[key];
    });
  });

  return target;
}


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
(function (root, factory) {
  if (true) {
    module.exports = factory(typeof global === 'undefined' ? root : global);
  } else if (typeof define === 'function' && define.amd) {
    define([], function () { return factory(root); });
  } else {
    root.framebus = factory(root);
  }
})(this, function (root) { // eslint-disable-line no-invalid-this
  var win, framebus;
  var popups = [];
  var subscribers = {};
  var prefix = '/*framebus*/';

  function include(popup) {
    if (popup == null) { return false; }
    if (popup.Window == null) { return false; }
    if (popup.constructor !== popup.Window) { return false; }

    popups.push(popup);
    return true;
  }

  function target(origin) {
    var key;
    var targetedFramebus = {};

    for (key in framebus) {
      if (!framebus.hasOwnProperty(key)) { continue; }

      targetedFramebus[key] = framebus[key];
    }

    targetedFramebus._origin = origin || '*';

    return targetedFramebus;
  }

  function publish(event) {
    var payload, args;
    var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

    if (_isntString(event)) { return false; }
    if (_isntString(origin)) { return false; }

    args = Array.prototype.slice.call(arguments, 1);

    payload = _packagePayload(event, args, origin);
    if (payload === false) { return false; }

    _broadcast(win.top || win.self, payload, origin);

    return true;
  }

  function subscribe(event, fn) {
    var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

    if (_subscriptionArgsInvalid(event, fn, origin)) { return false; }

    subscribers[origin] = subscribers[origin] || {};
    subscribers[origin][event] = subscribers[origin][event] || [];
    subscribers[origin][event].push(fn);

    return true;
  }

  function unsubscribe(event, fn) {
    var i, subscriberList;
    var origin = _getOrigin(this); // eslint-disable-line no-invalid-this

    if (_subscriptionArgsInvalid(event, fn, origin)) { return false; }

    subscriberList = subscribers[origin] && subscribers[origin][event];
    if (!subscriberList) { return false; }

    for (i = 0; i < subscriberList.length; i++) {
      if (subscriberList[i] === fn) {
        subscriberList.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  function _getOrigin(scope) {
    return scope && scope._origin || '*';
  }

  function _isntString(string) {
    return typeof string !== 'string';
  }

  function _packagePayload(event, args, origin) {
    var packaged = false;
    var payload = {
      event: event,
      origin: origin
    };
    var reply = args[args.length - 1];

    if (typeof reply === 'function') {
      payload.reply = _subscribeReplier(reply, origin);
      args = args.slice(0, -1);
    }

    payload.args = args;

    try {
      packaged = prefix + JSON.stringify(payload);
    } catch (e) {
      throw new Error('Could not stringify event: ' + e.message);
    }
    return packaged;
  }

  function _unpackPayload(e) {
    var payload, replyOrigin, replySource, replyEvent;

    if (e.data.slice(0, prefix.length) !== prefix) { return false; }

    try {
      payload = JSON.parse(e.data.slice(prefix.length));
    } catch (err) {
      return false;
    }

    if (payload.reply != null) {
      replyOrigin = e.origin;
      replySource = e.source;
      replyEvent = payload.reply;

      payload.reply = function reply(data) { // eslint-disable-line consistent-return
        var replyPayload = _packagePayload(replyEvent, [data], replyOrigin);

        if (replyPayload === false) { return false; }

        replySource.postMessage(replyPayload, replyOrigin);
      };

      payload.args.push(payload.reply);
    }

    return payload;
  }

  function _attach(w) {
    if (win) { return; }
    win = w || root;

    if (win.addEventListener) {
      win.addEventListener('message', _onmessage, false);
    } else if (win.attachEvent) {
      win.attachEvent('onmessage', _onmessage);
    } else if (win.onmessage === null) {
      win.onmessage = _onmessage;
    } else {
      win = null;
    }
  }

  function _uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;

      return v.toString(16);
    });
  }

  function _onmessage(e) {
    var payload;

    if (_isntString(e.data)) { return; }

    payload = _unpackPayload(e);
    if (!payload) { return; }

    _dispatch('*', payload.event, payload.args, e);
    _dispatch(e.origin, payload.event, payload.args, e);
    _broadcastPopups(e.data, payload.origin, e.source);
  }

  function _dispatch(origin, event, args, e) {
    var i;

    if (!subscribers[origin]) { return; }
    if (!subscribers[origin][event]) { return; }

    for (i = 0; i < subscribers[origin][event].length; i++) {
      subscribers[origin][event][i].apply(e, args);
    }
  }

  function _hasOpener(frame) {
    if (frame.top !== frame) { return false; }
    if (frame.opener == null) { return false; }
    if (frame.opener === frame) { return false; }
    if (frame.opener.closed === true) { return false; }

    return true;
  }

  function _broadcast(frame, payload, origin) {
    var i;

    try {
      frame.postMessage(payload, origin);

      if (_hasOpener(frame)) {
        _broadcast(frame.opener.top, payload, origin);
      }

      for (i = 0; i < frame.frames.length; i++) {
        _broadcast(frame.frames[i], payload, origin);
      }
    } catch (_) { /* ignored */ }
  }

  function _broadcastPopups(payload, origin, source) {
    var i, popup;

    for (i = popups.length - 1; i >= 0; i--) {
      popup = popups[i];

      if (popup.closed === true) {
        popups = popups.slice(i, 1);
      } else if (source !== popup) {
        _broadcast(popup.top, payload, origin);
      }
    }
  }

  function _subscribeReplier(fn, origin) {
    var uuid = _uuid();

    function replier(d, o) {
      fn(d, o);
      framebus.target(origin).unsubscribe(uuid, replier);
    }

    framebus.target(origin).subscribe(uuid, replier);
    return uuid;
  }

  function _subscriptionArgsInvalid(event, fn, origin) {
    if (_isntString(event)) { return true; }
    if (typeof fn !== 'function') { return true; }
    if (_isntString(origin)) { return true; }

    return false;
  }

  _attach();

  framebus = {
    target: target,
    include: include,
    publish: publish,
    pub: publish,
    trigger: publish,
    emit: publish,
    subscribe: subscribe,
    sub: subscribe,
    on: subscribe,
    unsubscribe: unsubscribe,
    unsub: unsubscribe,
    off: unsubscribe
  };

  return framebus;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate = __webpack_require__(20);

module.exports = enumerate([
  'CONFIGURATION_REQUEST'
], 'bus:');


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isWhitelistedDomain = __webpack_require__(41);

function checkOrigin(postMessageOrigin, merchantUrl) {
  var merchantOrigin, merchantHost;
  var a = document.createElement('a');

  a.href = merchantUrl;

  if (a.protocol === 'https:') {
    merchantHost = a.host.replace(/:443$/, '');
  } else if (a.protocol === 'http:') {
    merchantHost = a.host.replace(/:80$/, '');
  } else {
    merchantHost = a.host;
  }

  merchantOrigin = a.protocol + '//' + merchantHost;

  if (merchantOrigin === postMessageOrigin) { return true; }

  a.href = postMessageOrigin;

  return isWhitelistedDomain(postMessageOrigin);
}

module.exports = {
  checkOrigin: checkOrigin
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(28);
var useMin = __webpack_require__(54);

module.exports = function composeUrl(assetsUrl, componentId, isDebug) {
  return assetsUrl +
    '/web/' +
    constants.VERSION +
    '/html/hosted-fields-frame' + useMin(isDebug) + '.html#' +
    componentId;
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findParentTags(element, tag) {
  var parent = element.parentNode;
  var parents = [];

  while (parent != null) {
    if (parent.tagName != null && parent.tagName.toLowerCase() === tag) {
      parents.push(parent);
    }

    parent = parent.parentNode;
  }

  return parents;
}

module.exports = findParentTags;


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isIe9: __webpack_require__(21),
  isIos: __webpack_require__(19),
  isIosWebview: __webpack_require__(149)
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIos = __webpack_require__(19);

// The Google Search iOS app is technically a webview and doesn't support popups.
function isGoogleSearchApp(ua) {
  return /\bGSA\b/.test(ua);
}

module.exports = function isIosWebview(ua) {
  ua = ua || global.navigator.userAgent;
  if (isIos(ua)) {
    if (isGoogleSearchApp(ua)) {
      return true;
    }
    return /.+AppleWebKit(?!.*Safari)/.test(ua);
  }
  return false;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function EventEmitter() {
  this._events = {};
}

EventEmitter.prototype.on = function (event, callback) {
  if (this._events[event]) {
    this._events[event].push(callback);
  } else {
    this._events[event] = [callback];
  }
};

EventEmitter.prototype._emit = function (event) {
  var i, args;
  var callbacks = this._events[event];

  if (!callbacks) { return; }

  args = Array.prototype.slice.call(arguments, 1);

  for (i = 0; i < callbacks.length; i++) {
    callbacks[i].apply(null, args);
  }
};

module.exports = EventEmitter;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function injectFrame(frame, container) {
  var clearboth = document.createElement('div');
  var fragment = document.createDocumentFragment();

  clearboth.style.clear = 'both';

  fragment.appendChild(frame);
  fragment.appendChild(clearboth);

  container.appendChild(fragment);

  return [frame, clearboth];
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var testOrder;
var types = {};
var customCards = {};
var VISA = 'visa';
var MASTERCARD = 'master-card';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var ORIGINAL_TEST_ORDER = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO
];

function clone(originalObject) {
  var dupe;

  if (!originalObject) { return null; }

  dupe = JSON.parse(JSON.stringify(originalObject));
  delete dupe.prefixPattern;
  delete dupe.exactPattern;

  return dupe;
}

testOrder = clone(ORIGINAL_TEST_ORDER);

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4$/,
  exactPattern: /^4\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'Mastercard',
  type: MASTERCARD,
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
  gaps: [4, 10],
  lengths: [14, 16, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
  exactPattern: /^(6011|65|64[4-9])\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  prefixPattern: /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[02,06,07]|628(?!0|1)|629[1,2])|622018)$/,
  exactPattern: /^(((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[02,06,07]|628(?!0|1)|629[1,2]))\d*|622018\d{12})$/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: /^(5[06-9]|6[37])\d*$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

function findType(type) {
  return customCards[type] || types[type];
}

function creditCardType(cardNumber) {
  var type, value, i;
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = findType(type);

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
}

creditCardType.getTypeInfo = function (type) {
  return clone(findType(type));
};

function getCardPosition(name, ignoreErrorForNotExisting) {
  var position = testOrder.indexOf(name);

  if (!ignoreErrorForNotExisting && position === -1) {
    throw new Error('"' + name + '" is not a supported card type.');
  }

  return position;
}

creditCardType.removeCard = function (name) {
  var position = getCardPosition(name);

  testOrder.splice(position, 1);
};

creditCardType.addCard = function (config) {
  var existingCardPosition = getCardPosition(config.type, true);

  customCards[config.type] = config;

  if (existingCardPosition === -1) {
    testOrder.push(config.type);
  }
};

creditCardType.changeOrder = function (name, position) {
  var currentPosition = getCardPosition(name);

  testOrder.splice(currentPosition, 1);
  testOrder.splice(position, 0, name);
};

creditCardType.resetModifications = function () {
  testOrder = clone(ORIGINAL_TEST_ORDER);
  customCards = {};
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO
};

module.exports = creditCardType;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);
var errors = __webpack_require__(23);
var whitelist = __webpack_require__(28).whitelistedAttributes;

function attributeValidationError(attribute, value) {
  var err;

  if (!whitelist.hasOwnProperty(attribute)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
      message: 'The "' + attribute + '" attribute is not supported in Hosted Fields.'
    });
  } else if (value != null && !_isValid(attribute, value)) {
    err = new BraintreeError({
      type: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
      code: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
      message: 'Value "' + value + '" is not allowed for "' + attribute + '" attribute.'
    });
  }

  return err;
}

function _isValid(attribute, value) {
  if (whitelist[attribute] === 'string') {
    return typeof value === 'string' || typeof value === 'number';
  } else if (whitelist[attribute] === 'boolean') {
    return String(value) === 'true' || String(value) === 'false';
  }

  return false;
}

module.exports = attributeValidationError;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var device = __webpack_require__(155);

module.exports = function () {
  // Digits get dropped in samsung browser
  return !device.isSamsungBrowser();
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var UA = global.navigator && global.navigator.userAgent;

var isAndroid = __webpack_require__(55);
var isChrome = __webpack_require__(56);
var isIos = __webpack_require__(19);
var isIE9 = __webpack_require__(21);

// Old Android Webviews used specific versions of Chrome with 0.0.0 as their version suffix
// https://developer.chrome.com/multidevice/user-agent#webview_user_agent
var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;

function _isOldSamsungBrowserOrSamsungWebview(ua) {
  return !isChrome(ua) && ua.indexOf('Samsung') > -1;
}

function isKitKatWebview(uaArg) {
  var ua = uaArg || UA;

  return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
}

function isAndroidChrome(uaArg) {
  var ua = uaArg || UA;

  return isAndroid(ua) && isChrome(ua);
}

function isSamsungBrowser(ua) {
  ua = ua || UA;
  return /SamsungBrowser/.test(ua) || _isOldSamsungBrowserOrSamsungWebview(ua);
}

module.exports = {
  isIE9: isIE9,
  isAndroidChrome: isAndroidChrome,
  isIos: isIos,
  isKitKatWebview: isKitKatWebview,
  isSamsungBrowser: isSamsungBrowser
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isEdge(ua) {
  ua = ua || navigator.userAgent;
  return ua.indexOf('Edge/') !== -1;
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIe9 = __webpack_require__(21);

module.exports = {
  isIe9: isIe9
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var assign = __webpack_require__(10).assign;
var BaseView = __webpack_require__(9);
var btGooglePay = __webpack_require__(159);
var DropinError = __webpack_require__(8);
var constants = __webpack_require__(2);
var assets = __webpack_require__(60);
var classlist = __webpack_require__(13);
var Promise = __webpack_require__(5);
var analytics = __webpack_require__(14);

function GooglePayView() {
  BaseView.apply(this, arguments);
}

GooglePayView.prototype = Object.create(BaseView.prototype);
GooglePayView.prototype.constructor = GooglePayView;
GooglePayView.ID = GooglePayView.prototype.ID = constants.paymentOptionIDs.googlePay;

GooglePayView.prototype.initialize = function () {
  var self = this;

  self.googlePayConfiguration = assign({}, self.model.merchantConfiguration.googlePay);

  self.model.asyncDependencyStarting();

  return btGooglePay.create({client: self.client}).then(function (googlePayInstance) {
    self.googlePayInstance = googlePayInstance;
    self.paymentsClient = createPaymentsClient(self.client);
  }).then(function () {
    var buttonDiv = self.getElementById('google-pay-button');

    buttonDiv.addEventListener('click', function (event) {
      event.preventDefault();

      classlist.add(self.element, 'braintree-sheet--loading');

      self.tokenize().then(function () {
        classlist.remove(self.element, 'braintree-sheet--loading');
      });
    });
    self.model.asyncDependencyReady();
  }).catch(function (err) {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError(err)
    });
  });
};

GooglePayView.prototype.tokenize = function () {
  var self = this;
  var paymentDataRequest = self.googlePayInstance.createPaymentDataRequest(self.googlePayConfiguration);
  var rawPaymentData;

  return self.paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
    rawPaymentData = paymentData;
    return self.googlePayInstance.parseResponse(paymentData);
  }).then(function (tokenizePayload) {
    tokenizePayload.rawPaymentData = rawPaymentData;
    self.model.addPaymentMethod(tokenizePayload);
  }).catch(function (err) {
    var reportedError = err;

    if (err.statusCode === 'DEVELOPER_ERROR') {
      console.error(err); // eslint-disable-line no-console
      reportedError = 'developerError';
    } else if (err.statusCode === 'CANCELED') {
      analytics.sendEvent(self.client, 'googlepay.loadPaymentData.canceled');
      return;
    } else if (err.statusCode) {
      analytics.sendEvent(self.client, 'googlepay.loadPaymentData.failed');
    }

    self.model.reportError(reportedError);
  });
};

GooglePayView.prototype.updateConfiguration = function (key, value) {
  this.googlePayConfiguration[key] = value;
};

GooglePayView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;

  if (!(gatewayConfiguration.androidPay && Boolean(options.merchantConfiguration.googlePay))) {
    return Promise.resolve(false);
  }

  return Promise.resolve().then(function () {
    if (!global.google) {
      return assets.loadScript(global.document.head, {
        id: constants.GOOGLE_PAYMENT_SCRIPT_ID,
        src: constants.GOOGLE_PAYMENT_SOURCE
      });
    }

    return Promise.resolve();
  }).then(function () {
    var paymentsClient = createPaymentsClient(options.client);

    return paymentsClient.isReadyToPay({
      allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD']
    });
  }).then(function (response) {
    return Boolean(response.result);
  });
};

function createPaymentsClient(client) {
  return new global.google.payments.api.PaymentsClient({
    environment: client.getConfiguration().gatewayConfiguration.environment === 'production' ? 'PRODUCTION' : 'TEST'
  });
}

module.exports = GooglePayView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module braintree-web/google-payment
 * @description A component to integrate with Google Pay. The majority of the integration uses [Google's pay.js JavaScript file](https://payments.developers.google.com/js/apis/pay.js). The Braintree component generates the configuration object necessary for Google Pay to initiate the Payment Request and parse the returned data to retrieve the payment method nonce which is used to process the transaction on the server.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 * */

var basicComponentVerification = __webpack_require__(16);
var BraintreeError = __webpack_require__(1);
var GooglePayment = __webpack_require__(160);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);
var VERSION = "3.31.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} [callback] The second argument, `data`, is the {@link GooglePayment} instance. If no callback is provided, `create` returns a promise that resolves with the {@link GooglePayment} instance.
 * @example <caption>Simple Example</caption>
 * // include https://payments.developers.google.com/js/apis/pay.js in a script tag
 * // on your page to load the `google.api.PaymentsClient` global object.
 *
 * var paymentButton = document.querySelector('#google-pay-button');
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * });
 *
 * braintree.client.create({
 *   authorization: 'tokenization-key-or-client-token'
 * }).then(function (clientInstance) {
 *   return braintree.googlePayment.create({
 *     client: clientInstance
 *   });
 * }).then(function (googlePaymentInstance) {
 *   paymentButton.addEventListener('click', function (event) {
 *     var paymentDataRequest;
 *
 *     event.preventDefault();
 *
 *     paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *       merchantId: 'your-merchant-id-from-google',
 *       transactionInfo: {
 *         currencyCode: 'USD',
 *         totalPriceStatus: 'FINAL',
 *         totalPrice: '100.00'
 *       }
 *     });
 *
 *     paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
 *       return googlePaymentInstance.parseResponse(paymentData);
 *     }).then(function (result) {
 *       // send result.nonce to your server
 *     }).catch(function (err) {
 *       // handle err
 *     });
 *   });
 * });
 * @example <caption>Check Browser and Customer Compatibility</caption>
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * });
 *
 * function setupGooglePayButton(googlePaymentInstance) {
 *   var button = document.createElement('button');
 *
 *   button.id = 'google-pay';
 *   button.appendChild(document.createTextNode('Google Pay'));
 *   button.addEventListener('click', function (event) {
 *     var paymentRequestData;
 *
 *     event.preventDefault();
 *
 *     paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
 *       merchantId: 'your-merchant-id-from-google',
 *       transactionInfo: {
 *         currencyCode: 'USD',
 *         totalPriceStatus: 'FINAL',
 *         totalPrice: '100.00' // your amount
 *       }
 *     });
 *
 *     paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
 *       return googlePaymentInstance.parseResponse(paymentData);
*       }).then(function (result) {
 *       // send result.nonce to your server
 *     }).catch(function (err) {
 *       // handle errors
 *     });
 *   });
 *
 *   document.getElementById('container').appendChild(button);
 * }
 *
 * braintree.client.create({
 *   authorization: 'tokenization-key-or-client-token'
 * }).then(function (clientInstance) {
 *   return braintree.googlePayment.create({
 *     client: clientInstance
 *   });
 * }).then(function (googlePaymentInstance) {
 *   return paymentsClient.isReadyToPay({
 *     allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods
 *   });
 * }).then(function (response) {
 *   if (response.result) {
 *     setupGooglePayButton(googlePaymentInstance);
 *   }
 * }).catch(function (err) {
 *   // handle setup errors
 * });
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Google Pay',
    client: options.client
  }).then(function () {
    if (!options.client.getConfiguration().gatewayConfiguration.androidPay) {
      return Promise.reject(new BraintreeError({
        type: BraintreeError.types.MERCHANT,
        code: 'GOOGLE_PAYMENT_NOT_ENABLED',
        message: 'Google Pay is not enabled for this merchant.'
      }));
    }

    return new GooglePayment(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(7);
var assign = __webpack_require__(15).assign;
var convertMethodsToError = __webpack_require__(12);
var generateGooglePayConfiguration = __webpack_require__(161);
var BraintreeError = __webpack_require__(1);
var methods = __webpack_require__(11);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);

/**
 * @typedef {object} GooglePayment~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {string} type The payment method type, `CreditCard` or `AndroidPayCard`.
 * @property {object} binData Information about the card based on the bin.
 * @property {string} binData.commercial Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.countryOfIssuance The country of issuance.
 * @property {string} binData.debit Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.durbinRegulated Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.healthcare Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.issuingBank The issuing bank.
 * @property {string} binData.payroll Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.prepaid Possible values: 'Yes', 'No', 'Unknown'.
 * @property {string} binData.productId The product id.
 */

/**
 * @class GooglePayment
 * @param {object} options Google Payment {@link module:braintree-web/google-payment.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/google-payment.create|braintree-web.google-payment.create} instead.</strong>
 * @classdesc This class represents a Google Payment component produced by {@link module:braintree-web/google-payment.create|braintree-web/google-payment.create}. Instances of this class have methods for initializing the Google Pay flow.
 *
 * **Note:** This component is currently in beta and the API may include breaking changes when upgrading. Please review the [Changelog](https://github.com/braintree/braintree-web/blob/master/CHANGELOG.md) for upgrade steps whenever you upgrade the version of braintree-web.
 */
function GooglePayment(options) {
  this._client = options.client;

  this._braintreeGeneratedPaymentRequestConfiguration = generateGooglePayConfiguration(this._client.getConfiguration());
}

/**
 * Create a configuration object for use in the `loadPaymentData` method.
 * @public
 * @param {object} overrides The supplied parameters for creating the Payment Data Request object. Only required parameters are the `merchantId` provided by Google and a `transactionInfo` object, but any of the parameters in the Payment Data Request can be overwritten. See https://developers.google.com/payments/web/object-reference#PaymentDataRequest
 * @param {string} merchantId The merchant id provided by registering with Google.
 * @param {object} transactionInfo See https://developers.google.com/payments/web/object-reference#TransactionInfo for more information.
 * @example
 * var configuration = googlePaymentInstance.createPaymentDataRequest({
 *   merchantId: 'my-merchant-id-from-google',
 *   transactionInfo: {
 *     currencyCode: 'USD',
 *     totalPriceStatus: 'FINAL',
 *     totalPrice: '100.00'
 *   }
 * });
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequest).then(function (response) {
 *   // handle response with googlePaymentInstance.parseResponse
 *   // (see below)
 * });
 * @returns {object} Returns a configuration object for Google Payment Request.
 */
GooglePayment.prototype.createPaymentDataRequest = function (overrides) {
  analytics.sendEvent(this._client, 'google-payment.createPaymentDataRequest');

  return assign({}, this._braintreeGeneratedPaymentRequestConfiguration, overrides);
};

/**
 * Parse the response from the tokenization.
 * @public
 * @param {object} response The response back from the Google Pay tokenization.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link GooglePay~tokenizePayload|tokenizePayload}. If no callback is provided, `parseResponse` returns a promise that resolves with a {@link GooglePayment~tokenizePayload|tokenizePayload}.
 * @example with callback
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequestFromCreatePaymentDataRequest).then(function (response) {
 *   googlePaymentInstance.parseResponse(response, function (err, data) {
 *     if (err) {
 *       // handle errors
 *     }
 *     // send parsedResponse.nonce to your server
 *   });
 * });
 * @example with promise
 * var paymentsClient = new google.payments.api.PaymentsClient({
 *   environment: 'TEST' // or 'PRODUCTION'
 * })
 *
 * paymentsClient.loadPaymentData(paymentDataRequestFromCreatePaymentDataRequest).then(function (response) {
 *   return googlePaymentInstance.parseResponse(response);
 * }).then(function (parsedResponse) {
 *   // send parsedResponse.nonce to your server
 * }).catch(function (err) {
 *   // handle errors
 * });
 * @returns {Promise|void} Returns a promise that resolves the parsed response if no callback is provided.
 */
GooglePayment.prototype.parseResponse = function (response) {
  var client = this._client;

  return Promise.resolve().then(function () {
    var payload;
    var parsedResponse = JSON.parse(response.paymentMethodToken.token);
    var error = parsedResponse.error;

    if (error) {
      return Promise.reject(error);
    }

    payload = parsedResponse.androidPayCards[0];
    analytics.sendEvent(client, 'google-payment.parseResponse.succeeded');

    return Promise.resolve({
      nonce: payload.nonce,
      type: payload.type,
      description: payload.description,
      details: {
        cardType: payload.details.cardType,
        lastFour: payload.details.lastFour,
        lastTwo: payload.details.lastTwo
      },
      binData: payload.binData
    });
  }).catch(function (error) {
    analytics.sendEvent(client, 'google-payment.parseResponse.failed');

    return Promise.reject(new BraintreeError({
      code: 'GOOGLE_PAYMENT_GATEWAY_ERROR',
      message: 'There was an error when tokenizing the Google Pay payment method.',
      type: BraintreeError.types.UNKNOWN,
      details: {
        originalError: error
      }
    }));
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/google-payment.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * googlePaymentInstance.teardown();
 * @example <caption>With callback</caption>
 * googlePaymentInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
GooglePayment.prototype.teardown = function () {
  convertMethodsToError(this, methods(GooglePayment.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(GooglePayment);


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = "3.31.0";

module.exports = function (configuration) {
  var isProduction = configuration.gatewayConfiguration.environment === 'production';
  var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
  var metadata = configuration.analyticsMetadata;
  var data = {
    environment: isProduction ? 'PRODUCTION' : 'TEST',
    allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
    paymentMethodTokenizationParameters: {
      tokenizationType: 'PAYMENT_GATEWAY',
      parameters: {
        gateway: 'braintree',
        'braintree:merchantId': configuration.gatewayConfiguration.merchantId,
        'braintree:authorizationFingerprint': androidPayConfiguration.googleAuthorizationFingerprint,
        'braintree:apiVersion': 'v1',
        'braintree:sdkVersion': VERSION,
        'braintree:metadata': JSON.stringify({
          source: metadata.source,
          integration: metadata.integration,
          sessionId: metadata.sessionId,
          version: VERSION,
          platform: metadata.platform
        })
      }
    },
    cardRequirements: {
      allowedCardNetworks: androidPayConfiguration.supportedNetworks.map(function (card) { return card.toUpperCase(); })
    }
  };

  if (configuration.authorizationType === 'TOKENIZATION_KEY') {
    data.paymentMethodTokenizationParameters.parameters['braintree:clientKey'] = configuration.authorization;
  }

  return data;
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;
var BasePayPalView = __webpack_require__(61);

function PayPalView() {
  BasePayPalView.apply(this, arguments);
}

PayPalView.prototype = Object.create(BasePayPalView.prototype);
PayPalView.prototype.constructor = PayPalView;
PayPalView.ID = PayPalView.prototype.ID = paymentOptionIDs.paypal;

PayPalView.isEnabled = function (options) {
  return BasePayPalView.isEnabled(options).then(function (enabled) {
    return enabled && Boolean(options.merchantConfiguration.paypal);
  });
};

module.exports = PayPalView;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module braintree-web/paypal-checkout
 * @description A component to integrate with the [PayPal Checkout.js library](https://github.com/paypal/paypal-checkout).
 */

var BraintreeError = __webpack_require__(1);
var analytics = __webpack_require__(7);
var basicComponentVerification = __webpack_require__(16);
var errors = __webpack_require__(62);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);
var PayPalCheckout = __webpack_require__(164);
var VERSION = "3.31.0";

/**
 * @static
 * @function create
 * @description There are two ways to integrate the PayPal Checkout component. See the [PayPal Checkout constructor documentation](PayPalCheckout.html#PayPalCheckout) for more information and examples.
 *
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} [callback] The second argument, `data`, is the {@link PayPalCheckout} instance.
 * @example
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   // set up checkout.js
 * }).catch(function (err) {
 *   console.error('Error!', err);
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'PayPal Checkout',
    client: options.client
  }).then(function () {
    var config = options.client.getConfiguration();

    if (!config.gatewayConfiguration.paypalEnabled) {
      return Promise.reject(new BraintreeError(errors.PAYPAL_NOT_ENABLED));
    }

    if (!config.gatewayConfiguration.paypal.clientId) {
      return Promise.reject(new BraintreeError(errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED));
    }

    analytics.sendEvent(options.client, 'paypal-checkout.initialized');

    return new PayPalCheckout(options);
  });
}

/**
 * @static
 * @function isSupported
 * @description Returns true if PayPal Checkout [supports this browser](index.html#browser-support-webviews).
 * @deprecated Previously, this method checked for Popup support in the browser. Checkout.js now falls back to a modal if popups are not supported.
 * @returns {Boolean} Returns true if PayPal Checkout supports this browser.
 */
function isSupported() {
  return true;
}

module.exports = {
  create: wrapPromise(create),
  isSupported: isSupported,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(7);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);
var BraintreeError = __webpack_require__(1);
var convertToBraintreeError = __webpack_require__(42);
var errors = __webpack_require__(62);
var constants = __webpack_require__(165);
var methods = __webpack_require__(11);
var convertMethodsToError = __webpack_require__(12);

/**
 * PayPal Checkout tokenized payload. Returned in {@link PayPalCheckout#tokenizePayment}'s callback as the second argument, `data`.
 * @typedef {object} PayPalCheckout~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `PayPalAccount`.
 * @property {object} details Additional PayPal account details.
 * @property {string} details.email User's email address.
 * @property {string} details.payerId User's payer ID, the unique identifier for each PayPal account.
 * @property {string} details.firstName User's given name.
 * @property {string} details.lastName User's surname.
 * @property {?string} details.countryCode User's 2 character country code.
 * @property {?string} details.phone User's phone number (e.g. 555-867-5309).
 * @property {?object} details.shippingAddress User's shipping address details, only available if shipping address is enabled.
 * @property {string} details.shippingAddress.recipientName Recipient of postage.
 * @property {string} details.shippingAddress.line1 Street number and name.
 * @property {string} details.shippingAddress.line2 Extended address.
 * @property {string} details.shippingAddress.city City or locality.
 * @property {string} details.shippingAddress.state State or region.
 * @property {string} details.shippingAddress.postalCode Postal code.
 * @property {string} details.shippingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} details.billingAddress User's billing address details.
 * Not available to all merchants; [contact PayPal](https://developers.braintreepayments.com/support/guides/paypal/setup-guide#contacting-paypal-support) for details on eligibility and enabling this feature.
 * Alternatively, see `shippingAddress` above as an available client option.
 * @property {string} details.billingAddress.line1 Street number and name.
 * @property {string} details.billingAddress.line2 Extended address.
 * @property {string} details.billingAddress.city City or locality.
 * @property {string} details.billingAddress.state State or region.
 * @property {string} details.billingAddress.postalCode Postal code.
 * @property {string} details.billingAddress.countryCode 2 character country code (e.g. US).
 * @property {?object} creditFinancingOffered This property will only be present when the customer pays with PayPal Credit.
 * @property {object} creditFinancingOffered.totalCost This is the estimated total payment amount including interest and fees the user will pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalCost.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalCost.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {number} creditFinancingOffered.term Length of financing terms in months.
 * @property {object} creditFinancingOffered.monthlyPayment This is the estimated amount per month that the customer will need to pay including fees and interest.
 * @property {string} creditFinancingOffered.monthlyPayment.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.monthlyPayment.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {object} creditFinancingOffered.totalInterest Estimated interest or fees amount the payer will have to pay during the lifetime of the loan.
 * @property {string} creditFinancingOffered.totalInterest.value An amount defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) for the given currency.
 * @property {string} creditFinancingOffered.totalInterest.currency 3 letter currency code as defined by [ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm).
 * @property {boolean} creditFinancingOffered.payerAcceptance Status of whether the customer ultimately was approved for and chose to make the payment using the approved installment credit.
 * @property {boolean} creditFinancingOffered.cartAmountImmutable Indicates whether the cart amount is editable after payer's acceptance on PayPal side.
 */

/**
 * @class
 * @param {object} options see {@link module:braintree-web/paypal-checkout.create|paypal-checkout.create}
 * @classdesc This class represents a PayPal Checkout component that coordinates with the {@link https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4|PayPal checkout.js} library. Instances of this class can generate payment data and tokenize authorized payments.
 *
 * All UI (such as preventing actions on the parent page while authentication is in progress) is managed by {@link https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4|checkout.js}.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/paypal-checkout.create|braintree-web.paypal-checkout.create} instead.</strong>
 *
 * You must have PayPal's checkout.js script loaded on your page to use PayPal Checkout. You can either use the [paypal-checkout package on npm](https://www.npmjs.com/package/paypal-checkout) with a build tool or use a script hosted by PayPal:
 *
 * ```html
 * <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 log-level="warn"></script>
 * ```
 *
 * Once you have the script loaded, there are two ways to integrate with the checkout.js library.
 *
 * #### Pass a Braintree object into checkout.js
 *
 * You can pass a `braintree` object into PayPal's checkout.js library. This will create the necessary Braintree {@link moudle:braintree-web/client.create|client} and {@link moudle:braintree-web/paypal-checkout.create|PayPal Checkout} components and automatically tokenize the authorized PayPal account. Use this integration option if you are not integrating with any other Braintree components.
 *
 * ```javascript
 * paypal.Button.render({
 *   braintree: braintree, // this object is available on the window by including the client and paypal-checkout component scripts on the page
 *   client: {
 *     production: 'production_authorization',
 *     sandbox: 'sandbox_authorization'
 *   },
 *
 *   env: 'production', // or 'sandbox'
 *
 *   payment: function (data, actions) {
 *     return actions.braintree.create({
 *       // your createPayment options here
 *     });
 *   },
 *
 *   onAuthorize: function (payload, actions) {
 *     // send payload.nonce to your server
 *
 *     // for more data about the user's PayPal account:
 *     // return actions.payment.get().then(function(data) { console.log(data); });
 *   }
 * }, '#paypal-button'); // the PayPal button will be rendered in an html element with the id `paypal-button`
 * ```
 *
 * If you are using `npm` to load braintree, simply pass in the invidual components:
 *
 * ```javascript
 * var btClient = require('braintree-web/client');
 * var btPayPal = require('braintree-web/paypal-checkout');
 *
 * paypal.Button.render({
 *   braintree: {
 *     client: btClient,
 *     paypalCheckout: btPayPal
 *   },
 *   client: {
 *     production: 'production_authorization',
 *     sandbox: 'sandbox_authorization'
 *   },
 *   // rest of checkout.js config
 * ```
 *
 * #### Create the Braintree components manually
 *
 * Alternatively, you can create the Braintree {@link moudle:braintree-web/client.create|client} and {@link moudle:braintree-web/paypal-checkout.create|PayPal Checkout} components manually. Use this integration style if you prefer to have some logic between receiving the authorized PayPal account and tokenizing it.
 *
 * ```javascript
 * braintree.client.create({
 *   authorization: 'authorization'
 * }).then(function (clientInstance) {
 *   return braintree.paypalCheckout.create({
 *     client: clientInstance
 *   });
 * }).then(function (paypalCheckoutInstance) {
 *   return paypal.Button.render({
 *     env: 'production', // or 'sandbox'
 *
 *     payment: function () {
 *       return paypalCheckoutInstance.createPayment({
 *         // your createPayment options here
 *       });
 *     },
 *
 *     onAuthorize: function (data, actions) {
 *       // some logic here before tokenization happens below
 *       return paypalCheckoutInstance.tokenizePayment(data).then(function (payload) {
 *         // Submit payload.nonce to your server
 *       });
 *     }
 *   }, '#paypal-button');
 * }).catch(function (err) {
 *  console.error('Error!', err);
 * });
 * ```
 */
function PayPalCheckout(options) {
  this._client = options.client;
}

/**
 * Creates a PayPal payment ID or billing token using the given options. This is meant to be passed to PayPal's checkout.js library.
 * When a {@link callback} is defined, the function returns undefined and invokes the callback with the id to be used with the checkout.js library. Otherwise, it returns a Promise that resolves with the id.
 * @public
 * @param {object} options All options for the PayPalCheckout component.
 * @param {string} options.flow Set to 'checkout' for one-time payment flow, or 'vault' for Vault flow. If 'vault' is used with a client token generated with a customer ID, the PayPal account will be added to that customer as a saved payment method.
 * @param {string} [options.intent=authorize]
 * * `authorize` - Submits the transaction for authorization but not settlement.
 * * `order` - Validates the transaction without an authorization (i.e. without holding funds). Useful for authorizing and capturing funds up to 90 days after the order has been placed. Only available for Checkout flow.
 * * `sale` - Payment will be immediately submitted for settlement upon creating a transaction.
 * @param {boolean} [options.offerCredit=false] Offers PayPal Credit as the default funding instrument for the transaction. If the customer isn't pre-approved for PayPal Credit, they will be prompted to apply for it.
 * @param {string|number} [options.amount] The amount of the transaction. Required when using the Checkout flow.
 * @param {string} [options.currency] The currency code of the amount, such as 'USD'. Required when using the Checkout flow.
 * @param {string} [options.displayName] The merchant name displayed inside of the PayPal lightbox; defaults to the company name on your Braintree account
 * @param {string} [options.locale=en_US] Use this option to change the language, links, and terminology used in the PayPal flow. This locale will be used unless the buyer has set a preferred locale for their account. If an unsupported locale is supplied, a fallback locale (determined by buyer preference or browser data) will be used and no error will be thrown.
 *
 * Supported locales are:
 * `da_DK`,
 * `de_DE`,
 * `en_AU`,
 * `en_GB`,
 * `en_US`,
 * `es_ES`,
 * `fr_CA`,
 * `fr_FR`,
 * `id_ID`,
 * `it_IT`,
 * `ja_JP`,
 * `ko_KR`,
 * `nl_NL`,
 * `no_NO`,
 * `pl_PL`,
 * `pt_BR`,
 * `pt_PT`,
 * `ru_RU`,
 * `sv_SE`,
 * `th_TH`,
 * `zh_CN`,
 * `zh_HK`,
 * and `zh_TW`.
 *
 * @param {boolean} [options.enableShippingAddress=false] Returns a shipping address object in {@link PayPal#tokenize}.
 * @param {object} [options.shippingAddressOverride] Allows you to pass a shipping address you have already collected into the PayPal payment flow.
 * @param {string} options.shippingAddressOverride.line1 Street address.
 * @param {string} [options.shippingAddressOverride.line2] Street address (extended).
 * @param {string} options.shippingAddressOverride.city City.
 * @param {string} options.shippingAddressOverride.state State.
 * @param {string} options.shippingAddressOverride.postalCode Postal code.
 * @param {string} options.shippingAddressOverride.countryCode Country.
 * @param {string} [options.shippingAddressOverride.phone] Phone number.
 * @param {string} [options.shippingAddressOverride.recipientName] Recipient's name.
 * @param {boolean} [options.shippingAddressEditable=true] Set to false to disable user editing of the shipping address.
 * @param {string} [options.billingAgreementDescription] Use this option to set the description of the preapproved payment agreement visible to customers in their PayPal profile during Vault flows. Max 255 characters.
 * @param {string} [options.landingPageType] Use this option to specify the PayPal page to display when a user lands on the PayPal site to complete the payment.
 * * `login` - A PayPal account login page is used.
 * * `billing` - A non-PayPal account landing page is used.
 * @param {callback} [callback] The second argument is a PayPal `paymentId` or `billingToken` string, depending on whether `options.flow` is `checkout` or `vault`. This is also what is resolved by the promise if no callback is provided.
 * @example
 * // this paypal object is created by checkout.js
 * // see https://github.com/paypal/paypal-checkout
 * paypal.Button.render({
 *   // when createPayment resolves, it is automatically passed to checkout.js
 *   payment: function () {
 *    return paypalCheckoutInstance.createPayment({
 *       flow: 'checkout',
 *       amount: '10.00',
 *       currency: 'USD',
 *       intent: 'sale'
 *     });
 *   },
 *   // Add other options, e.g. onAuthorize, env, locale
 * }, '#paypal-button');
 *
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.createPayment = function (options) {
  var endpoint;

  if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
    return Promise.reject(new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED));
  }

  endpoint = 'paypal_hermes/' + constants.FLOW_ENDPOINTS[options.flow];

  analytics.sendEvent(this._client, 'paypal-checkout.createPayment');
  if (options.offerCredit === true) {
    analytics.sendEvent(this._client, 'paypal-checkout.credit.offered');
  }

  return this._client.request({
    endpoint: endpoint,
    method: 'post',
    data: this._formatPaymentResourceData(options)
  }).then(function (response) {
    var flowToken;

    if (options.flow === 'checkout') {
      flowToken = response.paymentResource.paymentToken;
    } else {
      flowToken = response.agreementSetup.tokenId;
    }

    return flowToken;
  }).catch(function (err) {
    var status = err.details && err.details.httpStatus;

    if (status === 422) {
      return Promise.reject(new BraintreeError({
        type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
        code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
        message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
        details: {
          originalError: err
        }
      }));
    }

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_FLOW_FAILED.type,
      code: errors.PAYPAL_FLOW_FAILED.code,
      message: errors.PAYPAL_FLOW_FAILED.message
    }));
  });
};

/**
 * Tokenizes the authorize data from PayPal's checkout.js library when completing a buyer approval flow.
 * When a {@link callback} is defined, invokes the callback with {@link PayPalCheckout~tokenizePayload|tokenizePayload} and returns undefined. Otherwise, returns a Promise that resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @public
 * @param {object} tokenizeOptions Tokens and IDs required to tokenize the payment.
 * @param {string} tokenizeOptions.payerId Payer ID returned by PayPal `onAuthorize` callback.
 * @param {string} [tokenizeOptions.paymentId] Payment ID returned by PayPal `onAuthorize` callback.
 * @param {string} [tokenizeOptions.billingToken] Billing Token returned by PayPal `onAuthorize` callback.
 * @param {callback} [callback] The second argument, <code>payload</code>, is a {@link PayPalCheckout~tokenizePayload|tokenizePayload}. If no callback is provided, the promise resolves with a {@link PayPalCheckout~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.tokenizePayment = function (tokenizeOptions) {
  var self = this;
  var payload;
  var client = this._client;
  var options = {
    flow: tokenizeOptions.billingToken ? 'vault' : 'checkout',
    intent: tokenizeOptions.intent
  };
  var params = {
    // The paymentToken provided by Checkout.js v4 is the ECToken
    ecToken: tokenizeOptions.paymentToken,
    billingToken: tokenizeOptions.billingToken,
    payerId: tokenizeOptions.payerID,
    paymentId: tokenizeOptions.paymentID
  };

  analytics.sendEvent(client, 'paypal-checkout.tokenization.started');

  return client.request({
    endpoint: 'payment_methods/paypal_accounts',
    method: 'post',
    data: self._formatTokenizeData(options, params)
  }).then(function (response) {
    payload = self._formatTokenizePayload(response);

    analytics.sendEvent(client, 'paypal-checkout.tokenization.success');
    if (payload.creditFinancingOffered) {
      analytics.sendEvent(client, 'paypal-checkout.credit.accepted');
    }

    return payload;
  }).catch(function (err) {
    analytics.sendEvent(client, 'paypal-checkout.tokenization.failed');

    return Promise.reject(convertToBraintreeError(err, {
      type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
      code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
      message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
    }));
  });
};

PayPalCheckout.prototype._formatPaymentResourceData = function (options) {
  var key;
  var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
  var paymentResource = {
    // returnUrl and cancelUrl are required in hermes create_payment_resource route
    // but are not validated and are not actually used with checkout.js
    returnUrl: 'x',
    cancelUrl: 'x',
    offerPaypalCredit: options.offerCredit === true,
    experienceProfile: {
      brandName: options.displayName || gatewayConfiguration.paypal.displayName,
      localeCode: options.locale,
      noShipping: (!options.enableShippingAddress).toString(),
      addressOverride: options.shippingAddressEditable === false,
      landingPageType: options.landingPageType
    }
  };

  if (options.flow === 'checkout') {
    paymentResource.amount = options.amount;
    paymentResource.currencyIsoCode = options.currency;

    if (options.hasOwnProperty('intent')) {
      paymentResource.intent = options.intent;
    }

    for (key in options.shippingAddressOverride) {
      if (options.shippingAddressOverride.hasOwnProperty(key)) {
        paymentResource[key] = options.shippingAddressOverride[key];
      }
    }
  } else {
    paymentResource.shippingAddress = options.shippingAddressOverride;

    if (options.billingAgreementDescription) {
      paymentResource.description = options.billingAgreementDescription;
    }
  }

  return paymentResource;
};

PayPalCheckout.prototype._formatTokenizeData = function (options, params) {
  var clientConfiguration = this._client.getConfiguration();
  var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
  var isTokenizationKey = clientConfiguration.authorizationType === 'TOKENIZATION_KEY';
  var data = {
    paypalAccount: {
      correlationId: params.billingToken || params.ecToken,
      options: {
        validate: options.flow === 'vault' && !isTokenizationKey
      }
    }
  };

  if (params.billingToken) {
    data.paypalAccount.billingAgreementToken = params.billingToken;
  } else {
    data.paypalAccount.paymentToken = params.paymentId;
    data.paypalAccount.payerId = params.payerId;
    data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;

    if (options.intent) {
      data.paypalAccount.intent = options.intent;
    }
  }

  return data;
};

PayPalCheckout.prototype._formatTokenizePayload = function (response) {
  var payload;
  var account = {};

  if (response.paypalAccounts) {
    account = response.paypalAccounts[0];
  }

  payload = {
    nonce: account.nonce,
    details: {},
    type: account.type
  };

  if (account.details && account.details.payerInfo) {
    payload.details = account.details.payerInfo;
  }

  if (account.details && account.details.creditFinancingOffered) {
    payload.creditFinancingOffered = account.details.creditFinancingOffered;
  }

  return payload;
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/paypal-checkout.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * paypalCheckoutInstance.teardown();
 * @example <caption>With callback</caption>
 * paypalCheckoutInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
PayPalCheckout.prototype.teardown = function () {
  convertMethodsToError(this, methods(PayPalCheckout.prototype));

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(PayPalCheckout);


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  LANDING_FRAME_NAME: 'braintreepaypallanding',
  FLOW_ENDPOINTS: {
    checkout: 'create_payment_resource',
    vault: 'setup_billing_agreement'
  }
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;
var BasePayPalView = __webpack_require__(61);

function PayPalCreditView() {
  BasePayPalView.apply(this, arguments);

  this._isPayPalCredit = true;
}

PayPalCreditView.prototype = Object.create(BasePayPalView.prototype);
PayPalCreditView.prototype.constructor = PayPalCreditView;
PayPalCreditView.ID = PayPalCreditView.prototype.ID = paymentOptionIDs.paypalCredit;

PayPalCreditView.isEnabled = function (options) {
  return BasePayPalView.isEnabled(options).then(function (enabled) {
    return enabled && Boolean(options.merchantConfiguration.paypalCredit);
  });
};
module.exports = PayPalCreditView;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(10).assign;
var BaseView = __webpack_require__(9);
var btVenmo = __webpack_require__(168);
var classlist = __webpack_require__(13);
var DropinError = __webpack_require__(8);
var Promise = __webpack_require__(5);
var paymentOptionIDs = __webpack_require__(2).paymentOptionIDs;

function VenmoView() {
  BaseView.apply(this, arguments);
}

VenmoView.prototype = Object.create(BaseView.prototype);
VenmoView.prototype.constructor = VenmoView;
VenmoView.ID = VenmoView.prototype.ID = paymentOptionIDs.venmo;

VenmoView.prototype.initialize = function () {
  var self = this;
  var venmoConfiguration = assign({}, self.model.merchantConfiguration.venmo, {client: this.client});

  self.model.asyncDependencyStarting();

  return btVenmo.create(venmoConfiguration).then(function (venmoInstance) {
    self.venmoInstance = venmoInstance;

    if (!self.venmoInstance.hasTokenizationResult()) {
      return Promise.resolve();
    }

    return self.venmoInstance.tokenize().then(function (payload) {
      self.model.reportAppSwitchPayload(payload);
    }).catch(function (err) {
      if (self._isIgnorableError(err)) {
        return;
      }
      self.model.reportAppSwitchError(paymentOptionIDs.venmo, err);
    });
  }).then(function () {
    var button = self.getElementById('venmo-button');

    button.addEventListener('click', function (event) {
      event.preventDefault();

      classlist.add(self.element, 'braintree-sheet--loading');

      return self.venmoInstance.tokenize().then(function (payload) {
        self.model.addPaymentMethod(payload);
      }).catch(function (tokenizeErr) {
        if (self._isIgnorableError(tokenizeErr)) {
          return;
        }

        self.model.reportError(tokenizeErr);
      }).then(function () {
        classlist.remove(self.element, 'braintree-sheet--loading');
      });
    });

    self.model.asyncDependencyReady();
  }).catch(function (err) {
    self.model.asyncDependencyFailed({
      view: self.ID,
      error: new DropinError(err)
    });
  });
};

VenmoView.prototype._isIgnorableError = function (error) {
  // customer cancels the flow in the app
  // we don't emit an error because the customer
  // initiated that action
  return error.code === 'VENMO_APP_CANCELED';
};

VenmoView.isEnabled = function (options) {
  var gatewayConfiguration = options.client.getConfiguration().gatewayConfiguration;
  var venmoEnabled = gatewayConfiguration.payWithVenmo && Boolean(options.merchantConfiguration.venmo);

  if (!venmoEnabled) {
    return Promise.resolve(false);
  }

  return Promise.resolve(btVenmo.isBrowserSupported(options.merchantConfiguration.venmo));
};

module.exports = VenmoView;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module braintree-web/venmo */

var analytics = __webpack_require__(7);
var basicComponentVerification = __webpack_require__(16);
var errors = __webpack_require__(63);
var wrapPromise = __webpack_require__(3);
var BraintreeError = __webpack_require__(1);
var Venmo = __webpack_require__(169);
var Promise = __webpack_require__(4);
var supportsVenmo = __webpack_require__(64);
var VERSION = "3.31.0";

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications. Doing so causes {@link Venmo#isBrowserSupported|isBrowserSupported} to return true only for mobile web browsers that support returning from the Venmo app to the same tab.
 * @param {callback} [callback] The second argument, `data`, is the {@link Venmo} instance. If no callback is provided, `create` returns a promise that resolves with the {@link Venmo} instance.
 * @example
 * braintree.venmo.create({
 *   client: clientInstance
 * }).then(function (venmoInstance) {
 *   // venmoInstance is ready to be used.
 * }).catch(function (createErr) {
 *   console.error('Error creating Venmo instance', createErr);
 * });
 * @returns {Promise|void} Returns the Venmo instance.
 */
function create(options) {
  return basicComponentVerification.verify({
    name: 'Venmo',
    client: options.client
  }).then(function () {
    var instance;
    var configuration = options.client.getConfiguration();

    if (!configuration.gatewayConfiguration.payWithVenmo) {
      return Promise.reject(new BraintreeError(errors.VENMO_NOT_ENABLED));
    }

    instance = new Venmo(options);

    analytics.sendEvent(options.client, 'venmo.initialized');

    return instance._initialize();
  });
}

/**
 * @static
 * @function isBrowserSupported
 * @param {object} [options] browser support options:
 * @param {boolean} [options.allowNewBrowserTab=true] This should be set to false if your payment flow requires returning to the same tab, e.g. single page applications.
 * @example
 * if (braintree.venmo.isBrowserSupported()) {
 *   // set up Venmo
 * }
 * @example <caption>Explicitly require browser support returning to the same tab</caption>
 * if (braintree.venmo.isBrowserSupported({
 *   allowNewBrowserTab: false
 * })) {
 *   // set up Venmo
 * }
 * @returns {boolean} Whether or not the browser supports Venmo.
 */
function isBrowserSupported(options) {
  return supportsVenmo.isBrowserSupported(options);
}

module.exports = {
  create: wrapPromise(create),
  isBrowserSupported: isBrowserSupported,
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var analytics = __webpack_require__(7);
var isBrowserSupported = __webpack_require__(64);
var constants = __webpack_require__(174);
var errors = __webpack_require__(63);
var querystring = __webpack_require__(27);
var methods = __webpack_require__(11);
var convertMethodsToError = __webpack_require__(12);
var wrapPromise = __webpack_require__(3);
var BraintreeError = __webpack_require__(1);
var Promise = __webpack_require__(4);
var VERSION = "3.31.0";

/**
 * Venmo tokenize payload.
 * @typedef {object} Venmo~tokenizePayload
 * @property {string} nonce The payment method nonce.
 * @property {string} type The payment method type, always `VenmoAccount`.
 * @property {object} details Additional Venmo account details.
 * @property {string} details.username Username of the Venmo account.
 */

/**
 * @class
 * @param {object} options The Venmo {@link module:braintree-web/venmo.create create} options.
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/venmo.create|braintree-web.venmo.create} instead.</strong>
 * @classdesc This class represents a Venmo component produced by {@link module:braintree-web/venmo.create|braintree-web/venmo.create}. Instances of this class have methods for tokenizing Venmo payments.
 */
function Venmo(options) {
  var configuration;

  this._client = options.client;
  configuration = this._client.getConfiguration();
  this._isDebug = configuration.isDebug;
  this._assetsUrl = configuration.gatewayConfiguration.assetsUrl + '/web/' + VERSION;
  this._allowNewBrowserTab = options.allowNewBrowserTab !== false;
}

Venmo.prototype._initialize = function () {
  var currentUrl = global.location.href.replace(global.location.hash, '');
  var params = querystring.parse(global.location.href);
  var configuration = this._client.getConfiguration();
  var venmoConfiguration = configuration.gatewayConfiguration.payWithVenmo;
  var analyticsMetadata = this._client.getConfiguration().analyticsMetadata;
  var braintreeData = {
    _meta: {
      version: analyticsMetadata.sdkVersion,
      integration: analyticsMetadata.integration,
      platform: analyticsMetadata.platform,
      sessionId: analyticsMetadata.sessionId
    }
  };

  params['x-success'] = currentUrl + '#venmoSuccess=1';
  params['x-cancel'] = currentUrl + '#venmoCancel=1';
  params['x-error'] = currentUrl + '#venmoError=1';
  params.ua = global.navigator.userAgent;
  /* eslint-disable camelcase */
  params.braintree_merchant_id = venmoConfiguration.merchantId;
  params.braintree_access_token = venmoConfiguration.accessToken;
  params.braintree_environment = venmoConfiguration.environment;
  params.braintree_sdk_data = btoa(JSON.stringify(braintreeData));
  /* eslint-enable camelcase */

  this._url = constants.VENMO_OPEN_URL + '?' + querystring.stringify(params);

  return Promise.resolve(this);
};

/**
 * Returns a boolean indicating whether the current browser supports Venmo as a payment method.
 *
 * If `options.allowNewBrowserTab` is false when calling {@link module:braintree-web/venmo.create|venmo.create}, this method will return true only for browsers known to support returning from the Venmo app to the same browser tab. Currently, this is limited to iOS Safari and Android Chrome.
 * @public
 * @returns {boolean} True if the current browser is supported, false if not.
 */
Venmo.prototype.isBrowserSupported = function () {
  return isBrowserSupported.isBrowserSupported({
    allowNewBrowserTab: this._allowNewBrowserTab
  });
};

/**
 * Returns a boolean indicating whether a Venmo tokenization result is ready to be processed immediately.
 *
 * This method should be called after initialization to see if the result of Venmo authorization is available. If it returns true, call {@link Venmo#tokenize|tokenize} immediately to process the results.
 *
 * @public
 * @returns {boolean} True if the results of Venmo payment authorization are available and ready to process.
 */
Venmo.prototype.hasTokenizationResult = function () {
  var params = getFragmentParameters();

  return typeof (params.venmoSuccess || params.venmoError || params.venmoCancel) !== 'undefined';
};

/**
 * Launches the Venmo flow and returns a nonce payload.
 *
 * If {@link Venmo#hasTokenizationResult|hasTokenizationResult} returns true, calling tokenize will immediately process and return the results without initiating the Venmo payment authorization flow.
 *
 * Only one Venmo flow can be active at a time. One way to achieve this is to disable your Venmo button while the flow is open.
 * @public
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link Venmo~tokenizePayload|tokenizePayload}. If no callback is provided, the method will return a Promise that resolves with a {@link Venmo~tokenizePayload|tokenizePayload}.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * button.addEventListener('click', function () {
 *   // Disable the button so that we don't attempt to open multiple popups.
 *   button.setAttribute('disabled', 'disabled');
 *
 *   // Because tokenize opens a new window, this must be called
 *   // as a result of a user action, such as a button click.
 *   venmoInstance.tokenize().then(function (payload) {
 *     // Submit payload.nonce to your server
 *     // Use payload.username to get the Venmo username and display any UI
 *   }).catch(function (tokenizeError) {
 *     // Handle flow errors or premature flow closure
 *     switch (tokenizeErr.code) {
 *       case 'VENMO_APP_CANCELED':
 *         console.log('User canceled Venmo flow.');
 *         break;
 *       case 'VENMO_CANCELED':
 *         console.log('User canceled Venmo, or Venmo app is not available.');
 *         break;
 *       default:
 *         console.error('Error!', tokenizeErr);
 *     }
 *   }).then(function () {
 *     button.removeAttribute('disabled');
 *   });
 * });
 */
Venmo.prototype.tokenize = function () {
  var self = this;

  if (this._tokenizationInProgress === true) {
    return Promise.reject(new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_ACTIVE));
  }

  if (this.hasTokenizationResult()) {
    return this._processResults();
  }

  return new Promise(function (resolve, reject) {
    self._tokenizationInProgress = true;
    self._previousHash = global.location.hash;

    global.open(self._url);

    // Subscribe to document visibility change events to detect when app switch
    // has returned.
    self._visibilityChangeListener = function () {
      if (!global.document.hidden) {
        self._tokenizationInProgress = false;

        setTimeout(function () {
          self._processResults().then(resolve).catch(reject).then(function () {
            global.location.hash = self._previousHash;
            self._removeVisibilityEventListener();
            delete self._visibilityChangeListener;
          });
        }, constants.PROCESS_RESULTS_DELAY);
      }
    };

    // Add a brief delay to ignore visibility change events that occur right before app switch
    setTimeout(function () {
      global.document.addEventListener(documentVisibilityChangeEventName(), self._visibilityChangeListener);
    }, constants.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY);
  });
};

/**
 * Cleanly tear down anything set up by {@link module:braintree-web/venmo.create|create}.
 * @public
 * @param {callback} [callback] Called once teardown is complete. No data is returned if teardown completes successfully.
 * @example
 * venmoInstance.teardown();
 * @example <caption>With callback</caption>
 * venmoInstance.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
Venmo.prototype.teardown = function () {
  this._removeVisibilityEventListener();
  convertMethodsToError(this, methods(Venmo.prototype));

  return Promise.resolve();
};

Venmo.prototype._removeVisibilityEventListener = function () {
  global.document.removeEventListener(documentVisibilityChangeEventName(), this._visibilityChangeListener);
};

Venmo.prototype._processResults = function () {
  var self = this;
  var params = getFragmentParameters();

  return new Promise(function (resolve, reject) {
    if (params.venmoSuccess) {
      analytics.sendEvent(self._client, 'venmo.appswitch.handle.success');
      resolve(formatTokenizePayload(params));
    } else if (params.venmoError) {
      analytics.sendEvent(self._client, 'venmo.appswitch.handle.error');
      reject(new BraintreeError({
        type: errors.VENMO_APP_FAILED.type,
        code: errors.VENMO_APP_FAILED.code,
        message: errors.VENMO_APP_FAILED.message,
        details: {
          originalError: {
            message: decodeURIComponent(params.errorMessage),
            code: params.errorCode
          }
        }
      }));
    } else if (params.venmoCancel) {
      analytics.sendEvent(self._client, 'venmo.appswitch.handle.cancel');
      reject(new BraintreeError(errors.VENMO_APP_CANCELED));
    } else {
      // User has either manually switched back to browser, or app is not available for app switch
      analytics.sendEvent(self._client, 'venmo.appswitch.cancel-or-unavailable');
      reject(new BraintreeError(errors.VENMO_CANCELED));
    }

    clearFragmentParameters();
  });
};

function getFragmentParameters() {
  var keyValuesArray = global.location.hash.substring(1).split('&');

  return keyValuesArray.reduce(function (toReturn, keyValue) {
    var parts = keyValue.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts[1]);

    toReturn[key] = value;

    return toReturn;
  }, {});
}

function clearFragmentParameters() {
  if (typeof global.history.replaceState === 'function') {
    history.pushState({}, '', global.location.href.slice(0, global.location.href.indexOf('#')));
  }
}

function formatTokenizePayload(fragmentParams, venmoAccountData) {
  return {
    nonce: venmoAccountData ? venmoAccountData.nonce : fragmentParams.paymentMethodNonce,
    type: 'VenmoAccount',
    details: {
      username: fragmentParams.username
    }
  };
}

// From https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
function documentVisibilityChangeEventName() {
  var visibilityChange;

  if (typeof global.document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    visibilityChange = 'visibilitychange';
  } else if (typeof global.document.msHidden !== 'undefined') {
    visibilityChange = 'msvisibilitychange';
  } else if (typeof global.document.webkitHidden !== 'undefined') {
    visibilityChange = 'webkitvisibilitychange';
  }

  return visibilityChange;
}

module.exports = wrapPromise.wrapPrototype(Venmo);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAndroid = __webpack_require__(55);
var isChrome = __webpack_require__(56);
var isIos = __webpack_require__(19);
var isIosSafari = __webpack_require__(171);
var isSamsungBrowser = __webpack_require__(57);
var isMobileFirefox = __webpack_require__(172);

module.exports = {
  isAndroid: isAndroid,
  isChrome: isChrome,
  isIos: isIos,
  isIosSafari: isIosSafari,
  isSamsungBrowser: isSamsungBrowser,
  isMobileFirefox: isMobileFirefox
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIos = __webpack_require__(19);
var webkitRegexp = /webkit/i;

function isWebkit(ua) {
  return ua.match(webkitRegexp);
}

module.exports = function isIosSafari(ua) {
  ua = ua || navigator.userAgent;

  return isIos(ua) && isWebkit(ua) && ua.indexOf('CriOS') === -1;
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var isIosFirefox = __webpack_require__(173);

module.exports = function isMobileFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return isIosFirefox(ua) || /iPhone|iPod|iPad|Mobile|Tablet/i.test(ua) && /Firefox/i.test(ua);
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

module.exports = function isIosFirefox(ua) {
  ua = ua || global.navigator.userAgent;
  return /FxiOS/i.test(ua);
};


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
  PROCESS_RESULTS_DELAY: 1000,
  VENMO_OPEN_URL: 'https://venmo.com/braintree/checkout'
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(14);
var analyticsKinds = __webpack_require__(2).analyticsKinds;
var BaseView = __webpack_require__(9);
var classlist = __webpack_require__(13);
var sheetViews = __webpack_require__(50);
var PaymentMethodsView = __webpack_require__(65);
var PaymentOptionsView = __webpack_require__(66);
var addSelectionEventHandler = __webpack_require__(29);
var Promise = __webpack_require__(5);
var supportsFlexbox = __webpack_require__(177);
var transitionHelper = __webpack_require__(59);

var CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT = __webpack_require__(2).CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT;
var DEVELOPER_MISCONFIGURATION_MESSAGE = 'Developer Error: Something went wrong. Check the console for details.';

function MainView() {
  BaseView.apply(this, arguments);

  this.dependenciesInitializing = 0;

  this._initialize();
}

MainView.prototype = Object.create(BaseView.prototype);
MainView.prototype.constructor = MainView;

MainView.prototype._initialize = function () {
  var paymentOptionsView;
  var hasMultiplePaymentOptions = this.model.supportedPaymentOptions.length > 1;
  var paymentMethods = this.model.getPaymentMethods();
  var preselectVaultedPaymentMethod = this.model.merchantConfiguration.preselectVaultedPaymentMethod !== false;

  this._views = {};

  this.sheetContainer = this.getElementById('sheet-container');
  this.sheetErrorText = this.getElementById('sheet-error-text');

  this.toggle = this.getElementById('toggle');
  this.lowerContainer = this.getElementById('lower-container');

  this.loadingContainer = this.getElementById('loading-container');
  this.loadingIndicator = this.getElementById('loading-indicator');
  this.dropinContainer = this.element.querySelector('.braintree-dropin');

  this.supportsFlexbox = supportsFlexbox();

  this.model.on('asyncDependenciesReady', this.hideLoadingIndicator.bind(this));

  this.model.on('errorOccurred', this.showSheetError.bind(this));
  this.model.on('errorCleared', this.hideSheetError.bind(this));

  this.paymentSheetViewIDs = Object.keys(sheetViews).reduce(function (ids, sheetViewKey) {
    var PaymentSheetView, paymentSheetView;

    if (this.model.supportedPaymentOptions.indexOf(sheetViewKey) !== -1) {
      PaymentSheetView = sheetViews[sheetViewKey];

      paymentSheetView = new PaymentSheetView({
        element: this.getElementById(PaymentSheetView.ID),
        mainView: this,
        model: this.model,
        client: this.client,
        strings: this.strings
      });
      paymentSheetView.initialize();

      this.addView(paymentSheetView);
      ids.push(paymentSheetView.ID);
    }

    return ids;
  }.bind(this), []);

  this.paymentMethodsViews = new PaymentMethodsView({
    element: this.element,
    model: this.model,
    strings: this.strings
  });
  this.addView(this.paymentMethodsViews);

  addSelectionEventHandler(this.toggle, this.toggleAdditionalOptions.bind(this));

  this.model.on('changeActivePaymentMethod', function () {
    setTimeout(function () {
      this.setPrimaryView(PaymentMethodsView.ID);
    }.bind(this), CHANGE_ACTIVE_PAYMENT_METHOD_TIMEOUT);
  }.bind(this));

  this.model.on('changeActivePaymentView', function (id) {
    var activePaymentView = this.getView(id);

    if (id === PaymentMethodsView.ID) {
      classlist.add(this.paymentMethodsViews.container, 'braintree-methods--active');
      classlist.remove(this.sheetContainer, 'braintree-sheet--active');
    } else {
      setTimeout(function () {
        classlist.add(this.sheetContainer, 'braintree-sheet--active');
      }.bind(this), 0);
      classlist.remove(this.paymentMethodsViews.container, 'braintree-methods--active');
      if (!this.getView(id).getPaymentMethod()) {
        this.model.setPaymentMethodRequestable({
          isRequestable: false
        });
      }
    }

    activePaymentView.onSelection();
  }.bind(this));

  this.model.on('removeActivePaymentMethod', function () {
    var activePaymentView = this.getView(this.model.getActivePaymentView());

    if (activePaymentView && typeof activePaymentView.removeActivePaymentMethod === 'function') {
      activePaymentView.removeActivePaymentMethod();
    }
  }.bind(this));

  if (hasMultiplePaymentOptions) {
    paymentOptionsView = new PaymentOptionsView({
      client: this.client,
      element: this.getElementById(PaymentOptionsView.ID),
      mainView: this,
      model: this.model,
      strings: this.strings
    });

    this.addView(paymentOptionsView);
  }

  if (paymentMethods.length > 0) {
    if (preselectVaultedPaymentMethod) {
      this.model.changeActivePaymentMethod(paymentMethods[0]);
    } else {
      this.setPrimaryView(this.paymentMethodsViews.ID);
    }
  } else if (hasMultiplePaymentOptions) {
    this.setPrimaryView(paymentOptionsView.ID);
  } else {
    this.setPrimaryView(this.paymentSheetViewIDs[0]);
  }
};

MainView.prototype.addView = function (view) {
  this._views[view.ID] = view;
};

MainView.prototype.getView = function (id) {
  return this._views[id];
};

MainView.prototype.setPrimaryView = function (id, secondaryViewId) {
  var paymentMethod;

  setTimeout(function () {
    this.element.className = prefixShowClass(id);
    if (secondaryViewId) {
      classlist.add(this.element, prefixShowClass(secondaryViewId));
    }
  }.bind(this), 0);

  this.primaryView = this.getView(id);
  this.model.changeActivePaymentView(id);

  if (this.paymentSheetViewIDs.indexOf(id) !== -1) {
    if (this.model.getPaymentMethods().length > 0 || this.getView(PaymentOptionsView.ID)) {
      this.showToggle();
    } else {
      this.hideToggle();
    }
  } else if (id === PaymentMethodsView.ID) {
    this.showToggle();
    // Move options below the upper-container
    this.getElementById('lower-container').appendChild(this.getElementById('options'));
  } else if (id === PaymentOptionsView.ID) {
    this.hideToggle();
  }

  if (!this.supportsFlexbox) {
    this.element.setAttribute('data-braintree-no-flexbox', true);
  }

  paymentMethod = this.primaryView.getPaymentMethod();

  this.model.setPaymentMethodRequestable({
    isRequestable: Boolean(paymentMethod),
    type: paymentMethod && paymentMethod.type,
    selectedPaymentMethod: paymentMethod
  });

  this.model.clearError();
};

MainView.prototype.requestPaymentMethod = function () {
  var activePaymentView = this.getView(this.model.getActivePaymentView());

  return activePaymentView.requestPaymentMethod().then(function (payload) {
    analytics.sendEvent(this.client, 'request-payment-method.' + analyticsKinds[payload.type]);

    return payload;
  }.bind(this)).catch(function (err) {
    analytics.sendEvent(this.client, 'request-payment-method.error');
    return Promise.reject(err);
  }.bind(this));
};

MainView.prototype.hideLoadingIndicator = function () {
  classlist.add(this.dropinContainer, 'braintree-loaded');
  transitionHelper.onTransitionEnd(this.loadingIndicator, 'transform', function () {
    this.loadingContainer.parentNode.removeChild(this.loadingContainer);
  }.bind(this));
};

MainView.prototype.toggleAdditionalOptions = function () {
  var sheetViewID;
  var hasMultiplePaymentOptions = this.model.supportedPaymentOptions.length > 1;
  var isPaymentSheetView = this.paymentSheetViewIDs.indexOf(this.primaryView.ID) !== -1;

  this.hideToggle();

  if (!hasMultiplePaymentOptions) {
    sheetViewID = this.paymentSheetViewIDs[0];

    classlist.add(this.element, prefixShowClass(sheetViewID));
    this.model.changeActivePaymentView(sheetViewID);
  } else if (isPaymentSheetView) {
    if (this.model.getPaymentMethods().length === 0) {
      this.setPrimaryView(PaymentOptionsView.ID);
    } else {
      this.setPrimaryView(PaymentMethodsView.ID, PaymentOptionsView.ID);
      this.hideToggle();
    }
  } else {
    classlist.add(this.element, prefixShowClass(PaymentOptionsView.ID));
  }
};

MainView.prototype.showToggle = function () {
  classlist.remove(this.toggle, 'braintree-hidden');
  classlist.add(this.lowerContainer, 'braintree-hidden');
};

MainView.prototype.hideToggle = function () {
  classlist.add(this.toggle, 'braintree-hidden');
  classlist.remove(this.lowerContainer, 'braintree-hidden');
};

MainView.prototype.showSheetError = function (error) {
  var errorMessage;
  var genericErrorMessage = this.strings.genericError;

  if (this.strings.hasOwnProperty(error)) {
    errorMessage = this.strings[error];
  } else if (error && error.code) {
    errorMessage = this.strings[snakeCaseToCamelCase(error.code) + 'Error'] || genericErrorMessage;
  } else if (error === 'developerError') {
    errorMessage = DEVELOPER_MISCONFIGURATION_MESSAGE;
  } else {
    errorMessage = genericErrorMessage;
  }

  classlist.add(this.sheetContainer, 'braintree-sheet--has-error');
  this.sheetErrorText.innerHTML = errorMessage;
};

MainView.prototype.hideSheetError = function () {
  classlist.remove(this.sheetContainer, 'braintree-sheet--has-error');
};

MainView.prototype.getOptionsElements = function () {
  return this._views.options.elements;
};

MainView.prototype.teardown = function () {
  var error;
  var viewNames = Object.keys(this._views);
  var teardownPromises = viewNames.map(function (view) {
    return this._views[view].teardown().catch(function (err) {
      error = err;
    });
  }.bind(this));

  return Promise.all(teardownPromises).then(function () {
    if (error) {
      return Promise.reject(error);
    }

    return Promise.resolve();
  });
};

function snakeCaseToCamelCase(s) {
  return s.toLowerCase().replace(/(\_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

function prefixShowClass(classname) {
  return 'braintree-show-' + classname;
}

module.exports = MainView;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BaseView = __webpack_require__(9);
var classlist = __webpack_require__(13);
var constants = __webpack_require__(2);

var addSelectionEventHandler = __webpack_require__(29);

var paymentMethodHTML = "<div class=\"braintree-method__logo\">\n  <svg width=\"40\" height=\"24\" class=\"@CLASSNAME\">\n    <use xlink:href=\"#@ICON\"></use>\n  </svg>\n</div>\n\n<div class=\"braintree-method__label\">@TITLE<br><div class=\"braintree-method__label--small\">@SUBTITLE</div></div>\n\n<div class=\"braintree-method__check-container\">\n  <div class=\"braintree-method__check\">\n    <svg height=\"100%\" width=\"100%\">\n      <use xlink:href=\"#iconCheck\"></use>\n    </svg>\n  </div>\n</div>\n";

function PaymentMethodView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

PaymentMethodView.prototype = Object.create(BaseView.prototype);
PaymentMethodView.prototype.constructor = PaymentMethodView;

PaymentMethodView.prototype._initialize = function () {
  var endingInText;
  var html = paymentMethodHTML;
  var paymentMethodCardTypes = constants.paymentMethodCardTypes;
  var paymentMethodTypes = constants.paymentMethodTypes;

  this.element = document.createElement('div');
  this.element.className = 'braintree-method';
  this.element.setAttribute('tabindex', '0');

  addSelectionEventHandler(this.element, function () {
    this.model.changeActivePaymentMethod(this.paymentMethod);
  }.bind(this));

  switch (this.paymentMethod.type) {
    case paymentMethodTypes.applePay:
      html = html.replace(/@ICON/g, 'logoApplePay')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.strings['Apple Pay'])
        .replace(/@SUBTITLE/g, '');
      break;
    case paymentMethodTypes.card:
      endingInText = this.strings.endingIn.replace('{{lastTwoCardDigits}}', this.paymentMethod.details.lastTwo);
      html = html.replace(/@ICON/g, 'icon-' + paymentMethodCardTypes[this.paymentMethod.details.cardType])
        .replace(/@CLASSNAME/g, ' braintree-icon--bordered')
        .replace(/@TITLE/g, endingInText)
        .replace(/@SUBTITLE/g, this.strings[this.paymentMethod.details.cardType]);
      break;
    case paymentMethodTypes.googlePay:
      html = html.replace(/@ICON/g, 'logoGooglePay')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.strings['Google Pay'])
        .replace(/@SUBTITLE/g, '');
      break;
    case paymentMethodTypes.paypal:
      html = html.replace(/@ICON/g, 'logoPayPal')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.paymentMethod.details.email)
        .replace(/@SUBTITLE/g, this.strings.PayPal);
      break;
    case paymentMethodTypes.venmo:
      html = html.replace(/@ICON/g, 'logoVenmo')
        .replace(/@CLASSNAME/g, '')
        .replace(/@TITLE/g, this.paymentMethod.details.username)
        .replace(/@SUBTITLE/g, this.strings.Venmo);
      break;
    default:
      break;
  }

  this.element.innerHTML = html;
};

PaymentMethodView.prototype.setActive = function (isActive) {
  // setTimeout required to animate addition of new payment methods
  setTimeout(function () {
    classlist.toggle(this.element, 'braintree-method--active', isActive);
  }.bind(this), 0);
};

module.exports = PaymentMethodView;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var el = document.createElement('div');
  var prop = 'flex-basis: 1px';
  var prefixes = [
    '-webkit-',
    '-moz-',
    '-ms-',
    '-o-',
    ''
  ];

  prefixes.forEach(function (prefix) {
    el.style.cssText += prefix + prop;
  });

  return Boolean(el.style.length);
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable camelcase */


module.exports = {
  da: __webpack_require__(179),
  de: __webpack_require__(180),
  en: __webpack_require__(181),
  en_AU: __webpack_require__(182),
  en_GB: __webpack_require__(183),
  es: __webpack_require__(184),
  fr_CA: __webpack_require__(185),
  fr: __webpack_require__(186),
  id: __webpack_require__(187),
  it: __webpack_require__(188),
  ja: __webpack_require__(189),
  ko: __webpack_require__(190),
  nl: __webpack_require__(191),
  no: __webpack_require__(192),
  pl: __webpack_require__(193),
  pt_BR: __webpack_require__(194),
  pt: __webpack_require__(195),
  ru: __webpack_require__(196),
  sv: __webpack_require__(197),
  th: __webpack_require__(198),
  zh: __webpack_require__(199),
  zh_HK: __webpack_require__(200),
  zh_TW: __webpack_require__(201)
};
/* eslint-enable camelcase */


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Betaler med {{paymentSource}}",
  "chooseAnotherWayToPay": "Vælg en anden betalingsmetode",
  "chooseAWayToPay": "Vælg, hvordan du vil betale",
  "otherWaysToPay": "Andre betalingsmetoder",
  "cardVerification": "Bekræftelse af kort",
  "fieldEmptyForCvv": "Du skal angive kontrolcifrene.",
  "fieldEmptyForExpirationDate": "Du skal angive udløbsdatoen.",
  "fieldEmptyForCardholderName": "Du skal angive kortindehaverens navn.",
  "fieldTooLongForCardholderName": "Kortejerens navn skal være mindre end 256 tegn.",
  "fieldEmptyForNumber": "Du skal angive et nummer.",
  "fieldEmptyForPostalCode": "Du skal angive et postnummer.",
  "fieldInvalidForCvv": "Sikkerhedskoden er ugyldig.",
  "fieldInvalidForExpirationDate": "Udløbsdatoen er ugyldig.",
  "fieldInvalidForNumber": "Kortnummeret er ugyldigt.",
  "fieldInvalidForPostalCode": "Postnummeret er ugyldigt.",
  "genericError": "Der opstod fejl i vores system.",
  "hostedFieldsFailedTokenizationError": "Kontroller oplysningerne, og prøv igen.",
  "hostedFieldsFieldsInvalidError": "Kontroller oplysningerne, og prøv igen.",
  "hostedFieldsTokenizationNetworkErrorError": "Netværksfejl. Prøv igen.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Betalingskortet blev ikke bekræftet. Kontrollér oplysningerne, og prøv igen.",
  "paypalAccountTokenizationFailedError": "PayPal-kontoen blev ikke tilføjet. Prøv igen.",
  "paypalFlowFailedError": "Der kunne ikke oprettes forbindelse til PayPal. Prøv igen.",
  "paypalTokenizationRequestActiveError": "PayPal-betalingen er i gang med at blive autoriseret.",
  "venmoCanceledError": "Der opstod en fejl. Sørg for, at du har den seneste version af Venmo-appen installeret på din enhed, og at din browser understøtter skift til Venmo.",
  "venmoAppFailedError": "Venmo-appen blev ikke fundet på din enhed.",
  "unsupportedCardTypeError": "Korttypen understøttes ikke. Prøv et andet kort.",
  "applePayTokenizationError": "Der opstod en netværksfejl under behandlingen af betalingen med Apple Pay. Prøv igen.",
  "applePayActiveCardError": "Knyt et understøttet kort til din Apple Pay-e-pung.",
  "cardholderNameLabel": "Kortindehaverens navn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "Kontrolcifre",
  "cvvThreeDigitLabelSubheading": "(3 cifre)",
  "cvvFourDigitLabelSubheading": "(4 cifre)",
  "cardholderNamePlaceholder": "Kortindehaverens navn",
  "expirationDateLabel": "Udløbsdato",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "payWithCard": "Betal med kort",
  "endingIn": "Slutter med ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Zahlen mit {{paymentSource}}",
  "chooseAnotherWayToPay": "Andere Zahlungsmethode wählen",
  "chooseAWayToPay": "Wie möchten Sie bezahlen?",
  "otherWaysToPay": "Andere Zahlungsmethoden",
  "cardVerification": "Kartenbestätigung",
  "fieldEmptyForCvv": "Geben Sie die Kartenprüfnummer ein.",
  "fieldEmptyForExpirationDate": "Geben Sie das Ablaufdatum ein.",
  "fieldEmptyForCardholderName": "Geben Sie den Namen des Karteninhabers ein.",
  "fieldTooLongForCardholderName": "Der Name des Karteninhabers darf 255 Zeichen nicht übersteigen.",
  "fieldEmptyForNumber": "Geben Sie die Nummer ein.",
  "fieldEmptyForPostalCode": "Geben Sie die PLZ ein.",
  "fieldInvalidForCvv": "Die Kartenprüfnummer ist ungültig.",
  "fieldInvalidForExpirationDate": "Das Ablaufdatum ist ungültig.",
  "fieldInvalidForNumber": "Die Kreditkartennummer ist ungültig.",
  "fieldInvalidForPostalCode": "Die PLZ ist ungültig.",
  "genericError": "Bei uns ist ein Problem aufgetreten.",
  "hostedFieldsFailedTokenizationError": "Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "hostedFieldsFieldsInvalidError": "Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "hostedFieldsTokenizationNetworkErrorError": "Netzwerkfehler. Versuchen Sie es erneut.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Überprüfung der Karte fehlgeschlagen. Überprüfen Sie Ihre Eingabe und versuchen Sie es erneut.",
  "paypalAccountTokenizationFailedError": "Beim Hinzufügen des PayPal-Kontos ist ein Problem aufgetreten. Versuchen Sie es erneut.",
  "paypalFlowFailedError": "Beim Verbinden mit PayPal ist ein Problem aufgetreten. Versuchen Sie es erneut.",
  "paypalTokenizationRequestActiveError": "Die PayPal-Zahlung wird bereits autorisiert.",
  "venmoCanceledError": "Etwas ist schief gelaufen. Vergewissern Sie sich, dass Sie die neueste Version der Venmo-App auf Ihrem Gerät installiert haben und Ihr Browser den Wechsel zu Venmo unterstützt.",
  "venmoAppFailedError": "Die Venmo-App wurde auf Ihrem Gerät nicht gefunden.",
  "unsupportedCardTypeError": "Dieser Kreditkartentyp wird nicht unterstützt. Versuchen Sie es mit einer anderen Karte.",
  "applePayTokenizationError": "Netzwerkfehler bei der Zahlungsabwicklung mit Apple Pay. Versuchen Sie es erneut.",
  "applePayActiveCardError": "Fügen Sie der Apple-Pay-Börse eine unterstützte Kreditkarte hinzu.",
  "cardholderNameLabel": "Name des Karteninhabers",
  "cardNumberLabel": "Kartennummer",
  "cvvLabel": "Prüfnr.",
  "cvvThreeDigitLabelSubheading": "(3-stellig)",
  "cvvFourDigitLabelSubheading": "(4-stellig)",
  "cardholderNamePlaceholder": "Name des Karteninhabers",
  "expirationDateLabel": "Gültig bis",
  "expirationDateLabelSubheading": "(MM/JJ)",
  "expirationDatePlaceholder": "MM/JJ",
  "postalCodeLabel": "PLZ",
  "payWithCard": "Mit Kreditkarte zahlen",
  "endingIn": "Mit den Endziffern ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kreditkarte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  payingWith: 'Paying with {{paymentSource}}',
  chooseAnotherWayToPay: 'Choose another way to pay',
  chooseAWayToPay: 'Choose a way to pay',
  otherWaysToPay: 'Other ways to pay',
  cardVerification: 'Card Verification',
  // Errors
  fieldEmptyForCvv: 'Please fill out a CVV.',
  fieldEmptyForExpirationDate: 'Please fill out an expiration date.',
  fieldEmptyForCardholderName: 'Please fill out a cardholder name.',
  fieldEmptyForNumber: 'Please fill out a card number.',
  fieldEmptyForPostalCode: 'Please fill out a postal code.',
  fieldInvalidForCvv: 'This security code is not valid.',
  fieldInvalidForExpirationDate: 'This expiration date is not valid.',
  fieldInvalidForNumber: 'This card number is not valid.',
  fieldInvalidForPostalCode: 'This postal code is not valid.',
  fieldTooLongForCardholderName: 'Cardholder name must be less than 256 characters.',
  genericError: 'Something went wrong on our end.',
  hostedFieldsFailedTokenizationError: 'Please check your information and try again.',
  hostedFieldsTokenizationCvvVerificationFailedError: 'Credit card verification failed. Please check your information and try again.',
  hostedFieldsTokenizationNetworkErrorError: 'Network error. Please try again.',
  hostedFieldsFieldsInvalidError: 'Please check your information and try again.',
  paypalAccountTokenizationFailedError: 'Something went wrong adding the PayPal account. Please try again.',
  paypalFlowFailedError: 'Something went wrong connecting to PayPal. Please try again.',
  paypalTokenizationRequestActiveError: 'PayPal payment authorization is already in progress.',
  applePayTokenizationError: 'A network error occurred while processing the Apple Pay payment. Please try again.',
  applePayActiveCardError: 'Add a supported card to your Apple Pay wallet.',
  venmoCanceledError: 'Something went wrong. Ensure you have the most recent version of the Venmo app installed on your device and your browser supports switching to Venmo.',
  venmoAppFailedError: 'The Venmo app could not be found on your device.',
  unsupportedCardTypeError: 'This card type is not supported. Please try another card.',
  // Card form
  cardholderNameLabel: 'Cardholder Name',
  cardNumberLabel: 'Card Number',
  cvvLabel: 'CVV',
  cvvThreeDigitLabelSubheading: '(3 digits)',
  cvvFourDigitLabelSubheading: '(4 digits)',
  expirationDateLabel: 'Expiration Date',
  expirationDateLabelSubheading: '(MM/YY)',
  cardholderNamePlaceholder: 'Cardholder Name',
  expirationDatePlaceholder: 'MM/YY',
  postalCodeLabel: 'Postal Code',
  payWithCard: 'Pay with card',
  // Payment Method descriptions
  endingIn: 'Ending in ••{{lastTwoCardDigits}}',
  Card: 'Card',
  PayPal: 'PayPal',
  'PayPal Credit': 'PayPal Credit',
  'Apple Pay': 'Apple Pay',
  'Google Pay': 'Google Pay',
  'Venmo': 'Venmo',
  'American Express': 'American Express',
  Discover: 'Discover',
  'Diners Club': 'Diners Club',
  MasterCard: 'MasterCard',
  Visa: 'Visa',
  JCB: 'JCB',
  Maestro: 'Maestro',
  UnionPay: 'UnionPay'
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "cardVerification": "Card verification",
  "fieldEmptyForCvv": "Please fill out a CVV.",
  "fieldEmptyForExpirationDate": "Please fill out an expiry date.",
  "fieldEmptyForCardholderName": "Please fill out a cardholder name.",
  "fieldTooLongForCardholderName": "Cardholder name must be less than 256 characters.",
  "fieldEmptyForNumber": "Please fill out a number.",
  "fieldEmptyForPostalCode": "Please fill out a postcode.",
  "fieldInvalidForCvv": "This security code is not valid.",
  "fieldInvalidForExpirationDate": "This expiry date is not valid.",
  "fieldInvalidForNumber": "This card number is not valid.",
  "fieldInvalidForPostalCode": "This postcode is not valid.",
  "genericError": "Something went wrong on our end.",
  "hostedFieldsFailedTokenizationError": "Please check your information and try again.",
  "hostedFieldsFieldsInvalidError": "Please check your information and try again.",
  "hostedFieldsTokenizationNetworkErrorError": "Network error. Please try again.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Credit card verification failed. Please check your entries and try again.",
  "paypalAccountTokenizationFailedError": "Something went wrong while adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong while connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "venmoCanceledError": "We're sorry, something seems to have gone wrong. Please ensure you have the most recent version of the Venmo app installed on your device and your browser supports the switch to Venmo.",
  "venmoAppFailedError": "The Venmo app wasn't found on your device.",
  "unsupportedCardTypeError": "This card type is not supported. Please try another card.",
  "applePayTokenizationError": "A network error occurred while processing the Apple Pay payment. Please try again.",
  "applePayActiveCardError": "Link a supported card to your Apple Pay wallet.",
  "cardholderNameLabel": "Cardholder Name",
  "cardNumberLabel": "Card Number",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder Name",
  "expirationDateLabel": "Expiry date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "Postcode",
  "payWithCard": "Pay with credit or debit card",
  "endingIn": "Ending in ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Paying with {{paymentSource}}",
  "chooseAnotherWayToPay": "Choose another way to pay",
  "chooseAWayToPay": "Choose a way to pay",
  "otherWaysToPay": "Other ways to pay",
  "cardVerification": "Card Verification",
  "fieldEmptyForCvv": "Please fill in a CSC.",
  "fieldEmptyForExpirationDate": "Please fill in an expiry date.",
  "fieldEmptyForCardholderName": "Please fill in a cardholder name.",
  "fieldTooLongForCardholderName": "Cardholder name must be less than 256 characters.",
  "fieldEmptyForNumber": "Please fill in a number.",
  "fieldEmptyForPostalCode": "Please fill in a postcode.",
  "fieldInvalidForCvv": "This security code is not valid.",
  "fieldInvalidForExpirationDate": "This expiry date is not valid.",
  "fieldInvalidForNumber": "This card number is not valid.",
  "fieldInvalidForPostalCode": "This postcode is not valid.",
  "genericError": "Something went wrong on our end.",
  "hostedFieldsFailedTokenizationError": "Please check your information and try again.",
  "hostedFieldsFieldsInvalidError": "Please check your information and try again.",
  "hostedFieldsTokenizationNetworkErrorError": "Network error. Please try again.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Credit card verification failed. Please check your information and try again.",
  "paypalAccountTokenizationFailedError": "Something went wrong while adding the PayPal account. Please try again.",
  "paypalFlowFailedError": "Something went wrong while connecting to PayPal. Please try again.",
  "paypalTokenizationRequestActiveError": "PayPal payment authorisation is already in progress.",
  "venmoCanceledError": "We're sorry, something seems to have gone wrong. Make sure you have the most recent version of the Venmo app installed on your device and your browser supports the switch to Venmo.",
  "venmoAppFailedError": "The Venmo app isn't on your device.",
  "unsupportedCardTypeError": "This card type is not supported. Please try another card.",
  "applePayTokenizationError": "A network error occurred while processing the Apple Pay payment. Please try again.",
  "applePayActiveCardError": "Add a supported card to your Apple Pay wallet.",
  "cardholderNameLabel": "Cardholder Name",
  "cardNumberLabel": "Card Number",
  "cvvLabel": "CSC",
  "cvvThreeDigitLabelSubheading": "(3 digits)",
  "cvvFourDigitLabelSubheading": "(4 digits)",
  "cardholderNamePlaceholder": "Cardholder Name",
  "expirationDateLabel": "Expiry Date",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "Postcode",
  "payWithCard": "Pay with card",
  "endingIn": "Ending in ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Card",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Pago con {{paymentSource}}",
  "chooseAnotherWayToPay": "Selecciona otra forma de pago.",
  "chooseAWayToPay": "Selecciona una forma de pago.",
  "otherWaysToPay": "Otras formas de pago",
  "cardVerification": "Verificación de tarjeta",
  "fieldEmptyForCvv": "Escribe el código CVV.",
  "fieldEmptyForExpirationDate": "Escribe la fecha de vencimiento.",
  "fieldEmptyForCardholderName": "Escribe el nombre de un titular de la tarjeta.",
  "fieldTooLongForCardholderName": "El nombre del titular de la tarjeta debe tener menos de 256 caracteres.",
  "fieldEmptyForNumber": "Escribe un número.",
  "fieldEmptyForPostalCode": "Escribe el código postal.",
  "fieldInvalidForCvv": "Este código de seguridad no es válido.",
  "fieldInvalidForExpirationDate": "Esta fecha de vencimiento no es válida.",
  "fieldInvalidForNumber": "Este número de tarjeta no es válido.",
  "fieldInvalidForPostalCode": "Este código postal no es válido.",
  "genericError": "Hemos tenido algún problema.",
  "hostedFieldsFailedTokenizationError": "Comprueba la información e inténtalo de nuevo.",
  "hostedFieldsFieldsInvalidError": "Comprueba la información e inténtalo de nuevo.",
  "hostedFieldsTokenizationNetworkErrorError": "Error de red. Inténtalo de nuevo.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Error de verificación de la tarjeta de crédito. Comprueba la información e inténtalo de nuevo.",
  "paypalAccountTokenizationFailedError": "Se ha producido un error al vincular la cuenta PayPal. Inténtalo de nuevo.",
  "paypalFlowFailedError": "Se ha producido un error al conectarse a PayPal. Inténtalo de nuevo.",
  "paypalTokenizationRequestActiveError": "Ya hay una autorización de pago de PayPal en curso.",
  "venmoCanceledError": "Ha habido un problema. Asegúrate de que tienes la versión más reciente de la aplicación de Venmo instalada en tu dispositivo y de que tu navegador es compatible con cambiar a Venmo.",
  "venmoAppFailedError": "No se ha encontrado la aplicación de Venmo en tu dispositivo.",
  "unsupportedCardTypeError": "No se admite este tipo de tarjeta. Prueba con otra tarjeta.",
  "applePayTokenizationError": "Se ha producido un error de red al procesar el pago con Apple Pay. Inténtalo de nuevo.",
  "applePayActiveCardError": "Añade una tarjeta admitida a tu Wallet de Apple Pay.",
  "cardholderNameLabel": "Nombre del titular de la tarjeta",
  "cardNumberLabel": "Número de tarjeta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nombre del titular de la tarjeta",
  "expirationDateLabel": "Fecha de vencimiento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "payWithCard": "Pagar con tarjeta",
  "endingIn": "Terminada en ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Tarjeta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisir un autre mode de paiement",
  "chooseAWayToPay": "Choisir le mode de paiement",
  "otherWaysToPay": "Autres modes de paiement",
  "cardVerification": "Vérification de la carte",
  "fieldEmptyForCvv": "Veuillez saisir un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Veuillez saisir une date d'expiration.",
  "fieldEmptyForCardholderName": "Veuillez saisir un nom de titulaire de la carte.",
  "fieldTooLongForCardholderName": "Le nom du titulaire de la carte doit contenir moins de 256 caractères.",
  "fieldEmptyForNumber": "Veuillez saisir un numéro.",
  "fieldEmptyForPostalCode": "Veuillez saisir un code postal.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur s'est produite de notre côté.",
  "hostedFieldsFailedTokenizationError": "Vérifiez vos informations, puis réessayez.",
  "hostedFieldsFieldsInvalidError": "Vérifiez vos informations, puis réessayez.",
  "hostedFieldsTokenizationNetworkErrorError": "Erreur réseau. Veuillez réessayer.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "La vérification de la carte de crédit a échoué. Vérifiez vos informations, puis réessayez.",
  "paypalAccountTokenizationFailedError": "Une erreur s'est produite lors de l'enregistrement du compte PayPal. Veuillez réessayer.",
  "paypalFlowFailedError": "Une erreur s'est produite au cours de la connexion à PayPal. Veuillez réessayer.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "venmoCanceledError": "Une erreur s'est produite. Assurez-vous que la version la plus récente de l'application Venmo est installée sur votre appareil et que votre navigateur prend Venmo en charge.",
  "venmoAppFailedError": "L'application Venmo est introuvable sur votre appareil.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Veuillez essayer une autre carte.",
  "applePayTokenizationError": "Une erreur de réseau s'est produite lors du traitement du paiement avec Apple Pay. Veuillez réessayer.",
  "applePayActiveCardError": "Ajoutez une carte prise en charge à Apple Pay.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Numéro de carte",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d'expiration",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "payWithCard": "Payer par carte",
  "endingIn": "Se terminant par ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Payer avec {{paymentSource}}",
  "chooseAnotherWayToPay": "Choisissez une autre façon de payer.",
  "chooseAWayToPay": "Choisissez comment payer.",
  "otherWaysToPay": "Autres façons de payer",
  "cardVerification": "Vérification de la carte",
  "fieldEmptyForCvv": "Entrez un cryptogramme visuel.",
  "fieldEmptyForExpirationDate": "Entrez une date d'expiration.",
  "fieldEmptyForCardholderName": "Entrez un nom du titulaire de la carte.",
  "fieldTooLongForCardholderName": "Le nom du titulaire de la carte doit contenir moins de 256 caractères.",
  "fieldEmptyForNumber": "Entrez un numéro.",
  "fieldEmptyForPostalCode": "Entrez un code postal.",
  "fieldInvalidForCvv": "Ce cryptogramme visuel n'est pas valide.",
  "fieldInvalidForExpirationDate": "Cette date d'expiration n'est pas valide.",
  "fieldInvalidForNumber": "Ce numéro de carte n'est pas valide.",
  "fieldInvalidForPostalCode": "Ce code postal n'est pas valide.",
  "genericError": "Une erreur est survenue.",
  "hostedFieldsFailedTokenizationError": "Vérifiez vos informations et réessayez.",
  "hostedFieldsFieldsInvalidError": "Vérifiez vos informations et réessayez.",
  "hostedFieldsTokenizationNetworkErrorError": "Erreur réseau. Réessayez.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Échec de vérification de la carte bancaire. Vérifiez vos informations et réessayez.",
  "paypalAccountTokenizationFailedError": "Une erreur est survenue lors de l'ajout du compte PayPal. Réessayez.",
  "paypalFlowFailedError": "Une erreur est survenue lors de la connexion à PayPal. Réessayez.",
  "paypalTokenizationRequestActiveError": "L'autorisation de paiement PayPal est déjà en cours.",
  "venmoCanceledError": "Une erreur est survenue. Vérifiez que vous disposez de la dernière version de l'application Venmo sur votre appareil et que votre navigateur prend en charge la redirection vers Venmo.",
  "venmoAppFailedError": "L'application Venmo est introuvable sur votre appareil.",
  "unsupportedCardTypeError": "Ce type de carte n'est pas pris en charge. Essayez une autre carte.",
  "applePayTokenizationError": "Une erreur réseau s'est produite lors du traitement du paiement Apple Pay. Réessayez.",
  "applePayActiveCardError": "Enregistrez une carte prise en charge sur Apple Pay.",
  "cardholderNameLabel": "Nom du titulaire de la carte",
  "cardNumberLabel": "Nº de carte",
  "cvvLabel": "Cryptogramme visuel",
  "cvvThreeDigitLabelSubheading": "(3 chiffres)",
  "cvvFourDigitLabelSubheading": "(4 chiffres)",
  "cardholderNamePlaceholder": "Nom du titulaire de la carte",
  "expirationDateLabel": "Date d'expiration",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Code postal",
  "payWithCard": "Payer par carte",
  "endingIn": "Se terminant par ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carte",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Membayar dengan {{paymentSource}}",
  "chooseAnotherWayToPay": "Pilih metode pembayaran lain",
  "chooseAWayToPay": "Pilih metode pembayaran",
  "otherWaysToPay": "Metode pembayaran lain",
  "cardVerification": "Verifikasi Kartu",
  "fieldEmptyForCvv": "Masukkan CVV.",
  "fieldEmptyForExpirationDate": "Masukkan tanggal akhir berlaku.",
  "fieldEmptyForCardholderName": "Masukkan nama pemegang kartu.",
  "fieldTooLongForCardholderName": "Nama pemegang kartu harus kurang dari 256 karakter.",
  "fieldEmptyForNumber": "Masukkan nomor.",
  "fieldEmptyForPostalCode": "Masukkan kode pos.",
  "fieldInvalidForCvv": "Kode keamanan ini tidak valid.",
  "fieldInvalidForExpirationDate": "Tanggal akhir berlaku ini tidak valid.",
  "fieldInvalidForNumber": "Nomor kartu ini tidak valid.",
  "fieldInvalidForPostalCode": "Kode pos ini tidak valid.",
  "genericError": "Terjadi kesalahan pada sistem kami.",
  "hostedFieldsFailedTokenizationError": "Periksa informasi Anda dan coba lagi.",
  "hostedFieldsFieldsInvalidError": "Periksa informasi Anda dan coba lagi.",
  "hostedFieldsTokenizationNetworkErrorError": "Masalah jaringan. Coba lagi.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Verifikasi kartu kredit gagal. Periksa informasi Anda dan coba lagi.",
  "paypalAccountTokenizationFailedError": "Terjadi kesalahan saat menambahkan rekening PayPal. Coba lagi.",
  "paypalFlowFailedError": "Terjadi kesalahan saat menyambung ke PayPal. Coba lagi.",
  "paypalTokenizationRequestActiveError": "Otorisasi pembayaran PayPal sedang diproses.",
  "venmoCanceledError": "Terdapat kesalahan. Pastikan Anda telah menginstal aplikasi Venmo versi terbaru pada perangkat dan peramban Anda mendukung untuk beralih ke Venmo.",
  "venmoAppFailedError": "Aplikasi Venmo tidak dapat ditemukan pada perangkat Anda.",
  "unsupportedCardTypeError": "Jenis kartu ini tidak didukung. Coba kartu lainnya.",
  "applePayTokenizationError": "Terjadi kesalahan jaringan sewaktu memproses pembayaran melalui Apple Pay. Coba lagi.",
  "applePayActiveCardError": "Tambahkan kartu yang didukung ke wallet Apple Pay.",
  "cardholderNameLabel": "Nama Pemegang Kartu",
  "cardNumberLabel": "Nomor Kartu",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 angka)",
  "cvvFourDigitLabelSubheading": "(4 angka)",
  "cardholderNamePlaceholder": "Nama Pemegang Kartu",
  "expirationDateLabel": "Tanggal Kedaluwarsa",
  "expirationDateLabelSubheading": "(BB/TT)",
  "expirationDatePlaceholder": "BB/TT",
  "postalCodeLabel": "Kode Pos",
  "payWithCard": "Bayar dengan kartu",
  "endingIn": "Berakhiran ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kartu",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Pagamento con {{paymentSource}}",
  "chooseAnotherWayToPay": "Scegli di pagare in un altro modo",
  "chooseAWayToPay": "Scegli come pagare",
  "otherWaysToPay": "Altri modi di pagare",
  "cardVerification": "Codice di sicurezza",
  "fieldEmptyForCvv": "Immetti il codice di sicurezza (CVV).",
  "fieldEmptyForExpirationDate": "Immetti la data di scadenza.",
  "fieldEmptyForCardholderName": "Immetti il nome del titolare della carta.",
  "fieldTooLongForCardholderName": "Il nome del titolare della carta deve avere meno di 256 caratteri.",
  "fieldEmptyForNumber": "Immetti il numero di carta.",
  "fieldEmptyForPostalCode": "Immetti il CAP.",
  "fieldInvalidForCvv": "Il codice di sicurezza non è valido.",
  "fieldInvalidForExpirationDate": "La data di scadenza non è valida.",
  "fieldInvalidForNumber": "Il numero di carta non è valido.",
  "fieldInvalidForPostalCode": "Il CAP non è valido.",
  "genericError": "Si è verificato un errore nei nostri sistemi.",
  "hostedFieldsFailedTokenizationError": "Controlla e riprova.",
  "hostedFieldsFieldsInvalidError": "Controlla e riprova.",
  "hostedFieldsTokenizationNetworkErrorError": "Errore di rete. Riprova.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "La verifica della carta di credito non è andata a buon fine. Controlla i dati e riprova.",
  "paypalAccountTokenizationFailedError": "Si è verificato un errore nel collegamento del conto PayPal. Riprova.",
  "paypalFlowFailedError": "Si è verificato un errore di connessione a PayPal. Riprova.",
  "paypalTokenizationRequestActiveError": "L'autorizzazione di pagamento PayPal è già in corso.",
  "venmoCanceledError": "Si è verificato un errore. Assicurati di avere la versione più recente dell'app Venmo installata sul tuo dispositivo e che il browser supporti l'uso di Venmo.",
  "venmoAppFailedError": "Impossibile trovare l'app Venmo sul dispositivo in uso.",
  "unsupportedCardTypeError": "Questo tipo di carta non è supportato. Prova con un'altra carta.",
  "applePayTokenizationError": "Si è verificato un errore di rete durante l'elaborazione del pagamento con Apple Pay. Riprova.",
  "applePayActiveCardError": "Collega una carta supportata al tuo Apple Pay Wallet.",
  "cardholderNameLabel": "Titolare della carta",
  "cardNumberLabel": "Numero di carta",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 cifre)",
  "cvvFourDigitLabelSubheading": "(4 cifre)",
  "cardholderNamePlaceholder": "Titolare della carta",
  "expirationDateLabel": "Data di scadenza",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "CAP",
  "payWithCard": "Paga con una carta",
  "endingIn": "Le cui ultime cifre sono ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Carta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "{{paymentSource}}で支払う",
  "chooseAnotherWayToPay": "別の支払方法を選択する",
  "chooseAWayToPay": "支払方法を選択する",
  "otherWaysToPay": "その他の支払方法",
  "cardVerification": "カード確認",
  "fieldEmptyForCvv": "カード確認コードを入力してください。",
  "fieldEmptyForExpirationDate": "有効期限を入力してください。",
  "fieldEmptyForCardholderName": "カード保有者の名前を入力してください。",
  "fieldTooLongForCardholderName": "カード保有者の名前は256文字未満にしてください。",
  "fieldEmptyForNumber": "番号を入力してください。",
  "fieldEmptyForPostalCode": "郵便番号を入力してください。",
  "fieldInvalidForCvv": "このセキュリティコードは無効です。",
  "fieldInvalidForExpirationDate": "この有効期限は無効です。",
  "fieldInvalidForNumber": "このカード番号は無効です。",
  "fieldInvalidForPostalCode": "この郵便番号は無効です。",
  "genericError": "弊社側で問題が発生しました。",
  "hostedFieldsFailedTokenizationError": "情報を確認してもう一度お試しください。",
  "hostedFieldsFieldsInvalidError": "情報を確認してもう一度お試しください。",
  "hostedFieldsTokenizationNetworkErrorError": "ネットワークエラーです。もう一度お試しください。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "クレジットカードの認証に失敗しました。情報を確認してもう一度お試しください。",
  "paypalAccountTokenizationFailedError": "PayPalアカウントの追加で問題が発生しました。もう一度お試しください。",
  "paypalFlowFailedError": "PayPalへの接続に問題が発生しました。もう一度お試しください。",
  "paypalTokenizationRequestActiveError": "PayPal支払いの承認はすでに処理中です。",
  "venmoCanceledError": "問題が発生しました。お客さまの端末にインストールされているVenmoアプリが最新のバージョンであること、お使いのブラウザがVenmoへの切り替えをサポートしていることを確認してください。",
  "venmoAppFailedError": "お客さまの端末でVenmoアプリが見つかりませんでした。",
  "unsupportedCardTypeError": "このカードタイプはサポートされていません。別のカードをご使用ください。",
  "applePayTokenizationError": "Apple Payの支払いを処理する際にネットワークエラーが発生しました。もう一度お試しください。",
  "applePayActiveCardError": "Apple Payウォレットに対応しているカードを追加してください。",
  "cardholderNameLabel": "カード保有者の名前",
  "cardNumberLabel": "カード番号",
  "cvvLabel": "カード確認コード",
  "cvvThreeDigitLabelSubheading": "(3桁)",
  "cvvFourDigitLabelSubheading": "(4桁)",
  "cardholderNamePlaceholder": "カード保有者の名前",
  "expirationDateLabel": "有効期限",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "郵便番号",
  "payWithCard": "カードで支払う",
  "endingIn": "x-{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "カード",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "銀聯(UnionPay)"
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "{{paymentSource}}(으)로 결제",
  "chooseAnotherWayToPay": "다른 결제수단 선택",
  "chooseAWayToPay": "결제수단 선택",
  "otherWaysToPay": "다른 방법으로 결제",
  "cardVerification": "카드 인증",
  "fieldEmptyForCvv": "CVV를 입력하세요.",
  "fieldEmptyForExpirationDate": "만료일을 입력하세요.",
  "fieldEmptyForCardholderName": "카드 소유자 이름을 입력하세요.",
  "fieldTooLongForCardholderName": "카드 소유자 이름은 256자 미만이어야 합니다.",
  "fieldEmptyForNumber": "번호를 입력하세요.",
  "fieldEmptyForPostalCode": "우편번호를 입력하세요.",
  "fieldInvalidForCvv": "이 보안 코드가 올바르지 않습니다.",
  "fieldInvalidForExpirationDate": "이 만료일이 올바르지 않습니다.",
  "fieldInvalidForNumber": "이 카드 번호가 올바르지 않습니다.",
  "fieldInvalidForPostalCode": "이 우편번호가 올바르지 않습니다.",
  "genericError": "저희 쪽에 문제가 발생했습니다.",
  "hostedFieldsFailedTokenizationError": "정보를 확인하고 다시 시도해 주세요.",
  "hostedFieldsFieldsInvalidError": "정보를 확인하고 다시 시도해 주세요.",
  "hostedFieldsTokenizationNetworkErrorError": "네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "신용카드 인증에 실패했습니다. 정보를 확인하고 다시 시도해 주세요.",
  "paypalAccountTokenizationFailedError": "PayPal 계정을 추가하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
  "paypalFlowFailedError": "PayPal 계정을 연결하는 동안 문제가 발생했습니다. 다시 시도해 주세요.",
  "paypalTokenizationRequestActiveError": "PayPal 결제 승인이 이미 진행 중입니다.",
  "venmoCanceledError": "오류가 발생했습니다. 기기에 최신 버전의 Venmo 앱이 설치되어 있으며 브라우저가 Venmo로 전환 기능을 지원하는지 확인하세요.",
  "venmoAppFailedError": "기기에서 Venmo 앱을 찾을 수 없습니다.",
  "unsupportedCardTypeError": "이 카드 형식은 지원되지 않습니다. 다른 카드로 시도해 주세요.",
  "applePayTokenizationError": "Apple Pay 결제를 처리하는 동안 네트워크 오류가 발생했습니다. 다시 시도해 주세요.",
  "applePayActiveCardError": "Apple Pay 전자지갑에 지원되는 카드를 추가하세요.",
  "cardholderNameLabel": "카드 소유자 이름",
  "cardNumberLabel": "카드 번호",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3자리)",
  "cvvFourDigitLabelSubheading": "(4자리)",
  "cardholderNamePlaceholder": "카드 소유자 이름",
  "expirationDateLabel": "만료일",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "우편번호",
  "payWithCard": "카드로 결제",
  "endingIn": "끝 번호: ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "카드",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Betalen met {{paymentSource}}",
  "chooseAnotherWayToPay": "Kies een andere betaalmethode",
  "chooseAWayToPay": "Kies een betaalwijze",
  "otherWaysToPay": "Andere manieren om te betalen",
  "cardVerification": "Kaartcontrole",
  "fieldEmptyForCvv": "Vul een CSC in.",
  "fieldEmptyForExpirationDate": "Vul een vervaldatum in.",
  "fieldEmptyForCardholderName": "Vul een naam voor de kaarthouder in.",
  "fieldTooLongForCardholderName": "De naam van de kaarthouder moet korter zijn dan 256 tekens.",
  "fieldEmptyForNumber": "Vul een nummer in.",
  "fieldEmptyForPostalCode": "Vul een postcode in.",
  "fieldInvalidForCvv": "Deze CSC is ongeldig.",
  "fieldInvalidForExpirationDate": "Deze vervaldatum is ongeldig.",
  "fieldInvalidForNumber": "Dit creditcardnummer is ongeldig.",
  "fieldInvalidForPostalCode": "Deze postcode is ongeldig.",
  "genericError": "Er is iets fout gegaan.",
  "hostedFieldsFailedTokenizationError": "Controleer uw gegevens en probeer het opnieuw.",
  "hostedFieldsFieldsInvalidError": "Controleer uw gegevens en probeer het opnieuw.",
  "hostedFieldsTokenizationNetworkErrorError": "'Netwerkfout. Probeer het opnieuw.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "De controle van de creditcard is mislukt. Controleer uw gegevens en probeer het opnieuw.",
  "paypalAccountTokenizationFailedError": "Er is iets misgegaan bij het toevoegen van de PayPal-rekening. Probeer het opnieuw.",
  "paypalFlowFailedError": "Er is iets misgegaan bij de verbinding met PayPal. Probeer het opnieuw.",
  "paypalTokenizationRequestActiveError": "De autorisatie van de PayPal-betaling is al in behandeling.",
  "venmoCanceledError": "Er ging iets fout. Controleer of de meest recente versie van de Venmo-app op je apparaat is geïnstalleerd en dat je browser overschakelen naar Venmo ondersteunt.",
  "venmoAppFailedError": "De Venmo-app is niet aangetroffen op je apparaat.",
  "unsupportedCardTypeError": "Dit type creditcard wordt niet ondersteund. Gebruik een andere creditcard.",
  "applePayTokenizationError": "Er is een netwerkfout opgetreden bij het verwerken van de Apple Pay-betaling. Probeer het opnieuw.",
  "applePayActiveCardError": "Voeg een ondersteunde creditcard toe aan je Apple Pay-wallet.",
  "cardholderNameLabel": "Naam kaarthouder",
  "cardNumberLabel": "Creditcardnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 cijfers)",
  "cvvFourDigitLabelSubheading": "(4 cijfers)",
  "cardholderNamePlaceholder": "Naam kaarthouder",
  "expirationDateLabel": "VervaldatumB",
  "expirationDateLabelSubheading": "(MM/JJ)",
  "expirationDatePlaceholder": "MM/JJ",
  "postalCodeLabel": "Postcode",
  "payWithCard": "Betalen met creditcard",
  "endingIn": "Eindigend op ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Creditcard",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Betaling med {{paymentSource}}",
  "chooseAnotherWayToPay": "Velg en annen måte å betale på",
  "chooseAWayToPay": "Velg betalingsmåte",
  "otherWaysToPay": "Andre måter å betale på",
  "cardVerification": "Kortbekreftelse",
  "fieldEmptyForCvv": "Oppgi en kortsikkerhetskode (CVV).",
  "fieldEmptyForExpirationDate": "Oppgi en utløpsdato.",
  "fieldEmptyForCardholderName": "Oppgi et navn for kortinnehaveren.",
  "fieldTooLongForCardholderName": "Makslengden for kortinnehaverens navn er 256 tegn.",
  "fieldEmptyForNumber": "Oppgi et nummer.",
  "fieldEmptyForPostalCode": "Oppgi et postnummer.",
  "fieldInvalidForCvv": "Denne sikkerhetskoden er ikke gyldig.",
  "fieldInvalidForExpirationDate": "Denne utløpsdatoen er ikke gyldig.",
  "fieldInvalidForNumber": "Dette kortnummeret er ikke gyldig.",
  "fieldInvalidForPostalCode": "Dette postnummeret er ikke gyldig.",
  "genericError": "Noe gikk galt hos oss.",
  "hostedFieldsFailedTokenizationError": "Kontroller informasjonen og prøv på nytt.",
  "hostedFieldsFieldsInvalidError": "Kontroller informasjonen og prøv på nytt.",
  "hostedFieldsTokenizationNetworkErrorError": "Nettverksfeil. Prøv på nytt.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Bekreftelsen av betalingskortet mislyktes. Kontroller informasjonen og prøv på nytt.",
  "paypalAccountTokenizationFailedError": "Noe gikk galt da PayPal-kontoen ble lagt til. Prøv på nytt.",
  "paypalFlowFailedError": "Det oppsto et problem med tilkoblingen til PayPal. Prøv på nytt.",
  "paypalTokenizationRequestActiveError": "Godkjenning av PayPal-betalingen pågår allerede",
  "venmoCanceledError": "Noe gikk galt. Kontroller at du har installert den nyeste versjonen av Venmo-appen på enheten og at nettleseren din støtter bytte til Venmo.",
  "venmoAppFailedError": "Finner ikke Venmo-appen på enheten.",
  "unsupportedCardTypeError": "Denne korttypen støttes ikke. Prøv med et annet kort.",
  "applePayTokenizationError": "Det oppsto en nettverksfeil under behandlingen av Apple Pay-betalingen. Prøv på nytt.",
  "applePayActiveCardError": "Legg til et kort som støttes i Apple Pay-lommeboken din.",
  "cardholderNameLabel": "Kortinnehaverens navn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 siffer)",
  "cvvFourDigitLabelSubheading": "(4 siffer)",
  "cardholderNamePlaceholder": "Kortinnehaverens navn",
  "expirationDateLabel": "Utløpsdato",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "payWithCard": "Betal med kort",
  "endingIn": "Som slutter på ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Forma płatności: {{paymentSource}}",
  "chooseAnotherWayToPay": "Wybierz inną formę płatności",
  "chooseAWayToPay": "Wybierz sposób płatności",
  "otherWaysToPay": "Inne formy płatności",
  "cardVerification": "Weryfikacja karty",
  "fieldEmptyForCvv": "Podaj kod bezpieczeństwa.",
  "fieldEmptyForExpirationDate": "Podaj datę ważności.",
  "fieldEmptyForCardholderName": "Podaj imię i nazwisko posiadacza karty.",
  "fieldTooLongForCardholderName": "Imię i nazwisko posiadacza karty musi mieć mniej niż 256 znaków.",
  "fieldEmptyForNumber": "Podaj numer.",
  "fieldEmptyForPostalCode": "Podaj kod pocztowy.",
  "fieldInvalidForCvv": "Podany kod bezpieczeństwa jest nieprawidłowy.",
  "fieldInvalidForExpirationDate": "Podana data ważności jest nieprawidłowa.",
  "fieldInvalidForNumber": "Podany numer karty jest nieprawidłowy.",
  "fieldInvalidForPostalCode": "Podany kod pocztowy jest nieprawidłowy.",
  "genericError": "Wystąpił błąd po naszej stronie.",
  "hostedFieldsFailedTokenizationError": "Sprawdź swoje informacje i spróbuj ponownie.",
  "hostedFieldsFieldsInvalidError": "Sprawdź swoje informacje i spróbuj ponownie.",
  "hostedFieldsTokenizationNetworkErrorError": "Błąd sieci. Spróbuj ponownie.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Weryfikacja karty kredytowej nie powiodła się. Sprawdź swoje informacje i spróbuj ponownie.",
  "paypalAccountTokenizationFailedError": "Coś poszło nie tak podczas dodawania konta PayPal. Spróbuj ponownie.",
  "paypalFlowFailedError": "Coś poszło nie tak podczas łączenia z systemem PayPal. Spróbuj ponownie.",
  "paypalTokenizationRequestActiveError": "Autoryzacja płatności PayPal jest już w trakcie realizacji.",
  "venmoCanceledError": "Wystąpił problem. Upewnij się, czy na swoim urządzeniu masz zainstalowaną najnowszą wersję aplikacji Venmo i Twoja przeglądarka ją obsługuje.",
  "venmoAppFailedError": "Nie można odnaleźć aplikacji Venmo na urządzeniu.",
  "unsupportedCardTypeError": "Ten typ karty nie jest obsługiwany. Spróbuj użyć innej karty.",
  "applePayTokenizationError": "Wystąpił błąd sieci podczas przetwarzania płatności Apple Pay. Spróbuj ponownie.",
  "applePayActiveCardError": "Dodaj obsługiwaną kartę do portfela Apple Pay.",
  "cardholderNameLabel": "Imię i nazwisko posiadacza karty",
  "cardNumberLabel": "Numer karty",
  "cvvLabel": "Kod CVC",
  "cvvThreeDigitLabelSubheading": "(3 cyfry)",
  "cvvFourDigitLabelSubheading": "(4 cyfry)",
  "cardholderNamePlaceholder": "Imię i nazwisko posiadacza karty",
  "expirationDateLabel": "Data ważności",
  "expirationDateLabelSubheading": "(MM/RR)",
  "expirationDatePlaceholder": "MM/RR",
  "postalCodeLabel": "Kod pocztowy",
  "payWithCard": "Zapłać kartą",
  "endingIn": "O numerze zakończonym cyframi ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Karta",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Pagando com {{paymentSource}}",
  "chooseAnotherWayToPay": "Escolher outro meio de pagamento",
  "chooseAWayToPay": "Escolher um meio de pagamento",
  "otherWaysToPay": "Outro meio de pagamento",
  "cardVerification": "Verificação do cartão",
  "fieldEmptyForCvv": "Informe o Código de Segurança.",
  "fieldEmptyForExpirationDate": "Informe a data de vencimento.",
  "fieldEmptyForCardholderName": "Informe o nome do titular do cartão.",
  "fieldTooLongForCardholderName": "O nome do titular do cartão deve ter menos de 256 caracteres.",
  "fieldEmptyForNumber": "Informe um número.",
  "fieldEmptyForPostalCode": "Informe um CEP.",
  "fieldInvalidForCvv": "Este código de segurança não é válido.",
  "fieldInvalidForExpirationDate": "Esta data de vencimento não é válida.",
  "fieldInvalidForNumber": "O número do cartão não é válido.",
  "fieldInvalidForPostalCode": "Este CEP não é válido.",
  "genericError": "Ocorreu um erro.",
  "hostedFieldsFailedTokenizationError": "Verifique as informações e tente novamente.",
  "hostedFieldsFieldsInvalidError": "Verifique as informações e tente novamente.",
  "hostedFieldsTokenizationNetworkErrorError": "Erro de rede. Tente novamente.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Falha ao verificar o cartão de crédito. Verifique as informações e tente novamente.",
  "paypalAccountTokenizationFailedError": "Ocorreu um erro ao adicionar a conta do PayPal. Tente novamente.",
  "paypalFlowFailedError": "Ocorreu um erro de conexão com o PayPal. Tente novamente.",
  "paypalTokenizationRequestActiveError": "A autorização de pagamento do PayPal já está em andamento.",
  "venmoCanceledError": "Ocorreu um erro. Certifique-se de ter a versão mais recente do aplicativo Venmo instalado no seu dispositivo e que o seu navegador suporte a mudança para o Venmo.",
  "venmoAppFailedError": "Não foi possível encontrar o aplicativo Venmo no seu dispositivo.",
  "unsupportedCardTypeError": "Este tipo de cartão não é aceito. Experimente outro cartão.",
  "applePayTokenizationError": "Ocorreu um erro de rede ao processar o pagamento com Apple Pay. Tente novamente.",
  "applePayActiveCardError": "Adicione cartão suportado à sua carteira do Apple Pay.",
  "cardholderNameLabel": "Nome do titular do cartão",
  "cardNumberLabel": "Número do cartão",
  "cvvLabel": "Cód. Seg.",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nome do titular do cartão",
  "expirationDateLabel": "Data de vencimento",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "CEP",
  "payWithCard": "Pague com seu cartão",
  "endingIn": "Com final ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Cartão",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Pagar com {{paymentSource}}",
  "chooseAnotherWayToPay": "Escolher outra forma de pagamento",
  "chooseAWayToPay": "Escolha um meio de pagamento",
  "otherWaysToPay": "Outras formas de pagamento",
  "cardVerification": "Verificação de cartão",
  "fieldEmptyForCvv": "Introduza o código CVV.",
  "fieldEmptyForExpirationDate": "Introduza a data de validade.",
  "fieldEmptyForCardholderName": "Introduza um nome do titular do cartão.",
  "fieldTooLongForCardholderName": "O nome do titular do cartão tem de ter menos de 256 carateres.",
  "fieldEmptyForNumber": "Introduza um número.",
  "fieldEmptyForPostalCode": "Introduza o código postal.",
  "fieldInvalidForCvv": "Este código de segurança não é válido.",
  "fieldInvalidForExpirationDate": "Esta data de validade não é correta.",
  "fieldInvalidForNumber": "Este número de cartão não é válido.",
  "fieldInvalidForPostalCode": "Este código postal não é válido.",
  "genericError": "Tudo indica que ocorreu um problema.",
  "hostedFieldsFailedTokenizationError": "Verifique os dados e tente novamente.",
  "hostedFieldsFieldsInvalidError": "Verifique os dados e tente novamente.",
  "hostedFieldsTokenizationNetworkErrorError": "Erro de rede. Tente novamente.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "A verificação do cartão de crédito falhou. Verifique os dados e tente novamente.",
  "paypalAccountTokenizationFailedError": "Ocorreu um erro ao associar a conta PayPal. Tente novamente.",
  "paypalFlowFailedError": "Ocorreu um erro na ligação com PayPal. Tente novamente.",
  "paypalTokenizationRequestActiveError": "Já há uma autorização de pagamento PayPal em curso.",
  "venmoCanceledError": "Ocorreu um erro. Certifique-se de que tem a versão mais recente da aplicação Venmo instalada no seu dispositivo e que o navegador suporta a mudança para o Venmo.",
  "venmoAppFailedError": "Não foi possível encontrar a aplicação Venmo no dispositivo.",
  "unsupportedCardTypeError": "Este tipo de cartão não é suportado. Tente usar outro cartão.",
  "applePayTokenizationError": "Ocorreu um erro de rede ao processar o pagamento com Apple Pay. Tente novamente.",
  "applePayActiveCardError": "Adicione um cartão suportado à sua carteira Apple Pay.",
  "cardholderNameLabel": "Nome do titular do cartão",
  "cardNumberLabel": "Número do cartão",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 dígitos)",
  "cvvFourDigitLabelSubheading": "(4 dígitos)",
  "cardholderNamePlaceholder": "Nome do titular do cartão",
  "expirationDateLabel": "Data de validade",
  "expirationDateLabelSubheading": "(MM/AA)",
  "expirationDatePlaceholder": "MM/AA",
  "postalCodeLabel": "Código postal",
  "payWithCard": "Pagar com cartão",
  "endingIn": "Que termina em ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Cartão",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Способы оплаты: {{paymentSource}}",
  "chooseAnotherWayToPay": "Выберите другой способ оплаты",
  "chooseAWayToPay": "Выберите способ оплаты",
  "otherWaysToPay": "Другие способы оплаты",
  "cardVerification": "Проверка карты",
  "fieldEmptyForCvv": "Укажите код безопасности.",
  "fieldEmptyForExpirationDate": "Укажите дату окончания срока действия.",
  "fieldEmptyForCardholderName": "Введите имя и фамилию владельца карты.",
  "fieldTooLongForCardholderName": "Имя владельца карты должно содержать не более 256 символов.",
  "fieldEmptyForNumber": "Введите номер.",
  "fieldEmptyForPostalCode": "Укажите почтовый индекс.",
  "fieldInvalidForCvv": "Этот код безопасности недействителен.",
  "fieldInvalidForExpirationDate": "Эта дата окончания срока действия недействительна.",
  "fieldInvalidForNumber": "Этот номер карты недействителен.",
  "fieldInvalidForPostalCode": "Этот почтовый индекс недействителен.",
  "genericError": "Возникла проблема с нашей стороны.",
  "hostedFieldsFailedTokenizationError": "Проверьте правильность ввода данных и повторите попытку.",
  "hostedFieldsFieldsInvalidError": "Проверьте правильность ввода данных и повторите попытку.",
  "hostedFieldsTokenizationNetworkErrorError": "Ошибка сети. Повторите попытку.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Проверка банковской карты не выполнена. Проверьте правильность ввода данных и повторите попытку.",
  "paypalAccountTokenizationFailedError": "Что-то пошло не так — не удалось добавить учетную запись PayPal. Повторите попытку.",
  "paypalFlowFailedError": "Что-то пошло не так — не удалось подключиться к системе PayPal. Повторите попытку.",
  "paypalTokenizationRequestActiveError": "Выполняется авторизация платежа PayPal.",
  "venmoCanceledError": "Возникла ошибка. Просим вас убедиться, что у вас установлена новейшая версия приложения Venmo и ваш браузер поддерживает переключение к Venmo.",
  "venmoAppFailedError": "Приложение Venmo не обнаружено на вашем устройстве.",
  "unsupportedCardTypeError": "Этот тип карты не поддерживается. Попробуйте воспользоваться другой картой.",
  "applePayTokenizationError": "При обработке платежа через Apple Pay возникла сетевая ошибка. Повторите попытку.",
  "applePayActiveCardError": "Добавьте поддерживаемую карту к своему счету Apple Pay.",
  "cardholderNameLabel": "Имя и фамилия владельца",
  "cardNumberLabel": "Номер карты",
  "cvvLabel": "Код безопасности",
  "cvvThreeDigitLabelSubheading": "(3 цифры)",
  "cvvFourDigitLabelSubheading": "(4 цифры)",
  "cardholderNamePlaceholder": "Имя и фамилия владельца",
  "expirationDateLabel": "Действует до",
  "expirationDateLabelSubheading": "(ММ/ГГ)",
  "expirationDatePlaceholder": "ММ/ГГ",
  "postalCodeLabel": "Индекс",
  "payWithCard": "Оплатить картой",
  "endingIn": "Заканчивается на ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Карта",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "Betalas med {{paymentSource}}",
  "chooseAnotherWayToPay": "Välj ett annat sätt att betala",
  "chooseAWayToPay": "Välj hur du vill betala",
  "otherWaysToPay": "Andra sätt att betala",
  "cardVerification": "Kortverifiering",
  "fieldEmptyForCvv": "Fyll i en CVV-kod.",
  "fieldEmptyForExpirationDate": "Fyll i ett utgångsdatum.",
  "fieldEmptyForCardholderName": "Fyll i kortinnehavarens namn.",
  "fieldTooLongForCardholderName": "Kortinnehavarens namn måste vara kortare än 256 tecken.",
  "fieldEmptyForNumber": "Fyll i ett nummer.",
  "fieldEmptyForPostalCode": "Fyll i ett postnummer.",
  "fieldInvalidForCvv": "Den här säkerhetskoden är inte giltig.",
  "fieldInvalidForExpirationDate": "Det här utgångsdatumet är inte giltigt.",
  "fieldInvalidForNumber": "Det här kortnumret är inte giltigt.",
  "fieldInvalidForPostalCode": "Det här postnumret är inte giltigt.",
  "genericError": "Ett fel uppstod.",
  "hostedFieldsFailedTokenizationError": "Kontrollera uppgifterna och försök igen.",
  "hostedFieldsFieldsInvalidError": "Kontrollera uppgifterna och försök igen.",
  "hostedFieldsTokenizationNetworkErrorError": "Nätverksfel. Försök igen.",
  "hostedFieldsTokenizationCvvVerificationFailedError": "Verifieringen av betalkort misslyckades. Kontrollera uppgifterna och försök igen.",
  "paypalAccountTokenizationFailedError": "Ett fel uppstod när PayPal-kontot skulle läggas till. Försök igen.",
  "paypalFlowFailedError": "Ett fel uppstod när anslutningen till PayPal skulle upprättas. Försök igen.",
  "paypalTokenizationRequestActiveError": "Betalningsgodkännandet för PayPal behandlas redan.",
  "venmoCanceledError": "Något gick fel. Se till att du har den senaste versionen av Venmo-appen installerad på din enhet och att webbläsaren stöder att gå över till Venmo.",
  "venmoAppFailedError": "Venmo-appen kunde inte hittas på din enhet.",
  "unsupportedCardTypeError": "Den här korttypen stöds inte. Pröva med ett annat kort.",
  "applePayTokenizationError": "Ett nätverksfel inträffade när Apple Pay-betalningen skulle behandlas. Försök igen.",
  "applePayActiveCardError": "Lägg till ett kort som stöds i Apple Pay-e-plånboken.",
  "cardholderNameLabel": "Kortinnehavarens namn",
  "cardNumberLabel": "Kortnummer",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 siffror)",
  "cvvFourDigitLabelSubheading": "(4 siffror)",
  "cardholderNamePlaceholder": "Kortinnehavarens namn",
  "expirationDateLabel": "Utgångsdatum",
  "expirationDateLabelSubheading": "(MM/ÅÅ)",
  "expirationDatePlaceholder": "MM/ÅÅ",
  "postalCodeLabel": "Postnummer",
  "payWithCard": "Betala med kort",
  "endingIn": "Slutar på ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "Kort",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "การชำระเงินด้วย {{paymentSource}}",
  "chooseAnotherWayToPay": "เลือกวิธีอื่นเพื่อชำระเงิน",
  "chooseAWayToPay": "เลือกวิธีชำระเงิน",
  "otherWaysToPay": "วิธีอื่นๆ ในการชำระเงิน",
  "cardVerification": "การตรวจสอบยืนยันบัตร",
  "fieldEmptyForCvv": "โปรดกรอก CVV (รหัสการตรวจสอบยืนยันบัตร)",
  "fieldEmptyForExpirationDate": "โปรดกรอกวันที่หมดอายุ",
  "fieldEmptyForCardholderName": "โปรดกรอกชื่อเจ้าของบัตร",
  "fieldTooLongForCardholderName": "ชื่อผู้ถือบัตรจะต้องไม่เกิน 256 อักขระ",
  "fieldEmptyForNumber": "โปรดกรอกหมายเลข",
  "fieldEmptyForPostalCode": "โปรดกรอกรหัสไปรษณีย์",
  "fieldInvalidForCvv": "รหัสความปลอดภัยนี้ไม่ถูกต้อง",
  "fieldInvalidForExpirationDate": "วันที่หมดอายุนี้ไม่ถูกต้อง",
  "fieldInvalidForNumber": "หมายเลขบัตรนี้ไม่ถูกต้อง",
  "fieldInvalidForPostalCode": "รหัสไปรษณีย์นี้ไม่ถูกต้อง",
  "genericError": "เกิดข้อผิดพลาดขึ้นในระบบของเรา",
  "hostedFieldsFailedTokenizationError": "โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
  "hostedFieldsFieldsInvalidError": "โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
  "hostedFieldsTokenizationNetworkErrorError": "ข้อผิดพลาดด้านเครือข่าย โปรดลองอีกครั้ง",
  "hostedFieldsTokenizationCvvVerificationFailedError": "การตรวจสอบยืนยันบัตรเครดิตล้มเหลว โปรดตรวจสอบข้อมูลของคุณ แล้วลองอีกครั้ง",
  "paypalAccountTokenizationFailedError": "เกิดข้อผิดพลาดในการเพิ่มบัญชี PayPal โปรดลองอีกครั้ง",
  "paypalFlowFailedError": "เกิดข้อผิดพลาดในการเชื่อมต่อกับ PayPal โปรดลองอีกครั้ง",
  "paypalTokenizationRequestActiveError": "การอนุญาตการชำระเงินของ PayPal อยู่ในระหว่างดำเนินการ",
  "venmoCanceledError": "เกิดข้อผิดพลาดบางประการ ตรวจสอบว่าคุณมีแอป Venmo เวอร์ชันล่าสุดติดตั้งในอุปกรณ์ของคุณ และมีเบราเซอร์ที่รองรับ Venmo",
  "venmoAppFailedError": "ไม่พบแอป Venmo บนอุปกรณ์ของคุณ",
  "unsupportedCardTypeError": "ไม่รองรับบัตรประเภทนี้ โปรดลองใช้บัตรใบอื่น",
  "applePayTokenizationError": "เกิดข้อผิดพลาดด้านเครือข่ายขึ้นขณะดำเนินการชำระเงินด้วย Apple Pay โปรดลองอีกครั้ง",
  "applePayActiveCardError": "เพิ่มบัตรที่รองรับในกระเป๋าสตางค์ Apple Pay ของคุณ",
  "cardholderNameLabel": "ชื่อเจ้าของบัตร",
  "cardNumberLabel": "หมายเลขบัตร",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "(3 หลัก)",
  "cvvFourDigitLabelSubheading": "(4 หลัก)",
  "cardholderNamePlaceholder": "ชื่อเจ้าของบัตร",
  "expirationDateLabel": "วันหมดอายุ",
  "expirationDateLabelSubheading": "(ดด/ปป)",
  "expirationDatePlaceholder": "ดด/ปป",
  "postalCodeLabel": "รหัสไปรษณีย์",
  "payWithCard": "ชำระเงินด้วยบัตร",
  "endingIn": "ลงท้ายด้วย ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "บัตร",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "正在使用{{paymentSource}}付款",
  "chooseAnotherWayToPay": "选择其他付款方式",
  "chooseAWayToPay": "选择付款方式",
  "otherWaysToPay": "其他付款方式",
  "cardVerification": "卡验证",
  "fieldEmptyForCvv": "请填写CVV。",
  "fieldEmptyForExpirationDate": "请填写有效期限。",
  "fieldEmptyForCardholderName": "请填写持卡人的姓名。",
  "fieldTooLongForCardholderName": "持卡人姓名必须少于256个字符。",
  "fieldEmptyForNumber": "请填写一个号码。",
  "fieldEmptyForPostalCode": "请填写邮政编码。",
  "fieldInvalidForCvv": "此安全代码无效。",
  "fieldInvalidForExpirationDate": "此有效期限无效。",
  "fieldInvalidForNumber": "此卡号无效。",
  "fieldInvalidForPostalCode": "此邮政编码无效。",
  "genericError": "我们遇到了一些问题",
  "hostedFieldsFailedTokenizationError": "请检查您的信息，然后重试。",
  "hostedFieldsFieldsInvalidError": "请检查您的信息，然后重试。",
  "hostedFieldsTokenizationNetworkErrorError": "网络错误。请重试。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡验证失败。请检查您的信息，然后重试。",
  "paypalAccountTokenizationFailedError": "添加PayPal账户时出错。请重试。",
  "paypalFlowFailedError": "连接到PayPal时出错。请重试。",
  "paypalTokenizationRequestActiveError": "PayPal付款授权已在进行中。",
  "venmoCanceledError": "我们遇到了问题。请确保您的设备上已安装最新版本的Venmo应用，并且您的浏览器支持切换到Venmo。",
  "venmoAppFailedError": "在您的设备上找不到Venmo应用。",
  "unsupportedCardTypeError": "不支持该卡类型。请尝试其他卡。",
  "applePayTokenizationError": "处理Apple Pay付款时出现网络错误。请重试。",
  "applePayActiveCardError": "请添加受支持的卡到您的Apple Pay钱包。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡号",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3位数）",
  "cvvFourDigitLabelSubheading": "（4位数）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "有效期限",
  "expirationDateLabelSubheading": "（MM/YY）",
  "expirationDatePlaceholder": "MM/YY",
  "postalCodeLabel": "邮政编码",
  "payWithCard": "用卡付款",
  "endingIn": "尾号为{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "银联"
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "付款方式為 {{paymentSource}}",
  "chooseAnotherWayToPay": "選擇其他付款方式",
  "chooseAWayToPay": "選擇付款方式",
  "otherWaysToPay": "其他付款方式",
  "cardVerification": "信用卡認證",
  "fieldEmptyForCvv": "請填寫信用卡認證碼。",
  "fieldEmptyForExpirationDate": "請填寫到期日。",
  "fieldEmptyForCardholderName": "請填寫持卡人的名字。",
  "fieldTooLongForCardholderName": "持卡人姓名必須少於 256 個字元。",
  "fieldEmptyForNumber": "請填寫號碼。",
  "fieldEmptyForPostalCode": "請填寫郵遞區號。",
  "fieldInvalidForCvv": "此安全代碼無效。",
  "fieldInvalidForExpirationDate": "此到期日無效。",
  "fieldInvalidForNumber": "此卡號無效。",
  "fieldInvalidForPostalCode": "此郵遞區號無效。",
  "genericError": "系統發生錯誤。",
  "hostedFieldsFailedTokenizationError": "請檢查你的資料並再試一次。",
  "hostedFieldsFieldsInvalidError": "請檢查你的資料並再試一次。",
  "hostedFieldsTokenizationNetworkErrorError": "網絡錯誤。請重試。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡認證失敗。請檢查你的資料並再試一次。",
  "paypalAccountTokenizationFailedError": "加入 PayPal 帳戶時發生錯誤。請重試。",
  "paypalFlowFailedError": "連接 PayPal 時發生錯誤。請重試。",
  "paypalTokenizationRequestActiveError": "PayPal 付款授權已在處理中。",
  "venmoCanceledError": "系統發生錯誤，請確保你已在裝置上安裝最新版本的 Venmo 應用程式，而且你的瀏覽器支援切換至 Venmo。",
  "venmoAppFailedError": "在你的裝置上找不到 Venmo 應用程式。",
  "unsupportedCardTypeError": "不可使用此信用卡類型。請改用其他信用卡。",
  "applePayTokenizationError": "處理 Apple Pay 付款時發生網絡錯誤。請重試。",
  "applePayActiveCardError": "在 Apple Pay 錢包中加入支援的信用卡。",
  "cardholderNameLabel": "持卡人名字",
  "cardNumberLabel": "卡號",
  "cvvLabel": "信用卡認證碼",
  "cvvThreeDigitLabelSubheading": "（3 位數）",
  "cvvFourDigitLabelSubheading": "（4 位數）",
  "cardholderNamePlaceholder": "持卡人名字",
  "expirationDateLabel": "到期日",
  "expirationDateLabelSubheading": "(MM/YY)",
  "expirationDatePlaceholder": "月 / 年",
  "postalCodeLabel": "郵遞區號",
  "payWithCard": "使用信用卡付款",
  "endingIn": "最後兩位數為 ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "信用卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal Credit",
  "Google Pay": "Google Pay",
  "American Express": "American Express",
  "Discover": "Discover",
  "Diners Club": "Diners Club",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  "payingWith": "以 {{paymentSource}} 付款",
  "chooseAnotherWayToPay": "選擇支付款項的以其他方式付款",
  "chooseAWayToPay": "選擇支付款項的方式",
  "otherWaysToPay": "其他付款方式",
  "cardVerification": "信用卡認證",
  "fieldEmptyForCvv": "請填妥信用卡驗證碼。",
  "fieldEmptyForExpirationDate": "請填妥到期日。",
  "fieldEmptyForCardholderName": "請填妥持卡人姓名。",
  "fieldTooLongForCardholderName": "持卡人姓名不能超過 256 個字元。",
  "fieldEmptyForNumber": "請填妥號碼。",
  "fieldEmptyForPostalCode": "請填寫郵遞區號。",
  "fieldInvalidForCvv": "這組安全代碼無效。",
  "fieldInvalidForExpirationDate": "此到期日無效。",
  "fieldInvalidForNumber": "此卡號無效。",
  "fieldInvalidForPostalCode": "此郵遞區號無效。",
  "genericError": "我們的系統發生問題。",
  "hostedFieldsFailedTokenizationError": "請檢查你的資料並重試。",
  "hostedFieldsFieldsInvalidError": "請檢查你的資料並重試。",
  "hostedFieldsTokenizationNetworkErrorError": "網路錯誤。請重試。",
  "hostedFieldsTokenizationCvvVerificationFailedError": "信用卡認證失敗。請檢查你的資料並重試。",
  "paypalAccountTokenizationFailedError": "新增 PayPal 帳戶時，系統發生錯誤。請重試。",
  "paypalFlowFailedError": "連結至 PayPal 時，系統發生錯誤。請重試。",
  "paypalTokenizationRequestActiveError": "PayPal 支付款項的授權已在處理中。",
  "venmoCanceledError": "系統發生錯誤。確認你的裝置上裝有最新版本的 Venmo 應用程式，而且瀏覽器支援切換至 Venmo。",
  "venmoAppFailedError": "你的裝置上找不到 Venmo 應用程式。",
  "unsupportedCardTypeError": "不支援此卡片類型。請嘗試其他卡片。",
  "applePayTokenizationError": "在處理 Apple Pay 付款時發生網路錯誤。請重試。",
  "applePayActiveCardError": "新增支援的卡片至你的 Apple Pay 錢包。",
  "cardholderNameLabel": "持卡人姓名",
  "cardNumberLabel": "卡號",
  "cvvLabel": "CVV",
  "cvvThreeDigitLabelSubheading": "（3 位數）",
  "cvvFourDigitLabelSubheading": "（4 位數）",
  "cardholderNamePlaceholder": "持卡人姓名",
  "expirationDateLabel": "到期日",
  "expirationDateLabelSubheading": "（月 / 年）",
  "expirationDatePlaceholder": "月 / 年",
  "postalCodeLabel": "郵遞區號",
  "payWithCard": "使用信用卡 / 扣帳卡付款",
  "endingIn": "你的末兩碼為 ••{{lastTwoCardDigits}}",
  "Apple Pay": "Apple Pay",
  "Venmo": "Venmo",
  "Card": "信用卡或扣帳卡",
  "PayPal": "PayPal",
  "PayPal Credit": "PayPal 信貸",
  "Google Pay": "Google Pay",
  "American Express": "美國運通 (American Express)",
  "Discover": "Discover",
  "Diners Club": "大來國際 (Diners Club)",
  "MasterCard": "Mastercard",
  "Visa": "Visa",
  "JCB": "JCB",
  "Maestro": "Maestro",
  "UnionPay": "UnionPay"
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



var classlist = __webpack_require__(13);
var threeDSecure = __webpack_require__(204);
var Promise = __webpack_require__(5);

function ThreeDSecure(client, merchantConfiguration, cardVerificationString) {
  this._client = client;
  this._config = merchantConfiguration;
  this._modal = this._setupModal(cardVerificationString);
}

ThreeDSecure.prototype.initialize = function () {
  var self = this;

  return threeDSecure.create({
    client: this._client
  }).then(function (instance) {
    self._instance = instance;
  });
};

ThreeDSecure.prototype.verify = function (nonce) {
  var self = this;

  this._revealModal();

  return Promise.all([
    this._waitForThreeDSecure(),
    this._instance.verifyCard({
      nonce: nonce,
      amount: this._config.amount,
      showLoader: false,
      addFrame: function (err, iframe) {
        var modalBody = self._modal.querySelector('.braintree-three-d-secure__modal-body');

        iframe.onload = function () {
          classlist.add(modalBody, 'braintree-three-d-secure__frame-active');
        };

        modalBody.appendChild(iframe);
      },
      removeFrame: function () {
        self._cleanupModal();
      }
    }).then(function (payload) {
      self._resolveThreeDSecure();

      return payload;
    })
  ]).then(function (result) {
    self._cleanupModal();

    return result[1];
  }).catch(function (err) {
    self._cleanupModal();

    if (err.type === 'THREE_D_SECURE_CANCELLED') {
      return Promise.resolve(err.payload);
    }

    return Promise.reject(err);
  });
};

ThreeDSecure.prototype.cancel = function () {
  var self = this;

  return this._instance.cancelVerifyCard().then(function (payload) {
    self._rejectThreeDSecure({
      type: 'THREE_D_SECURE_CANCELLED',
      payload: {
        nonce: payload.nonce,
        liabilityShifted: payload.liabilityShifted,
        liabilityShiftPossible: payload.liabilityShiftPossible
      }
    });
  }).catch(function () {
    // only reason this would reject
    // is if there is no verification in progress
    // so we just swallow the error
  }).then(function () {
    self._cleanupModal();
  });
};

ThreeDSecure.prototype.updateConfiguration = function (key, value) {
  this._config[key] = value;
};

ThreeDSecure.prototype.teardown = function () {
  return this._instance.teardown();
};

ThreeDSecure.prototype._cleanupModal = function () {
  var iframe = this._modal.querySelector('iframe');

  classlist.remove(this._modal.querySelector('.braintree-three-d-secure__modal'), 'braintree-three-d-secure__frame_visible');
  classlist.remove(this._modal.querySelector('.braintree-three-d-secure__backdrop'), 'braintree-three-d-secure__frame_visible');

  if (iframe && iframe.parentNode) {
    iframe.parentNode.removeChild(iframe);
  }
  setTimeout(function () {
    if (this._modal.parentNode) {
      this._modal.parentNode.removeChild(this._modal);
    }
  }.bind(this), 300);
};

ThreeDSecure.prototype._setupModal = function (cardVerificationString) {
  var self = this;
  var modal = document.createElement('div');

  modal.innerHTML = "<div class=\"braintree-three-d-secure\">\n  <div class=\"braintree-three-d-secure__backdrop\"></div>\n  <div class=\"braintree-three-d-secure__modal\">\n    <div data-braintree-id=\"three-d-secure-loading-container\" class=\"braintree-loader__container\">\n      <div data-braintree-id=\"three-d-secure-loading-indicator\" class=\"braintree-loader__indicator\">\n        <svg width=\"14\" height=\"16\" class=\"braintree-loader__lock\">\n          <use xlink:href=\"#iconLockLoader\"></use>\n        </svg>\n      </div>\n    </div>\n    <div class=\"braintree-three-d-secure__modal-header\">\n      {{cardVerification}}\n      <div class=\"braintree-three-d-secure__modal-close\">\n        <svg width=\"21\" height=\"21\">\n          <use xlink:href=\"#iconClose\"></use>\n        </svg>\n      </div>\n    </div>\n    <div class=\"braintree-three-d-secure__modal-body\">\n    </div>\n  </div>\n</div>\n"
    .replace('{{cardVerification}}', cardVerificationString);

  modal.querySelector('.braintree-three-d-secure__modal-close').addEventListener('click', function () {
    self.cancel();
  });

  return modal;
};

ThreeDSecure.prototype._waitForThreeDSecure = function () {
  var self = this;

  return new Promise(function (resolve, reject) {
    self._resolveThreeDSecure = resolve;
    self._rejectThreeDSecure = reject;
  });
};

ThreeDSecure.prototype._revealModal = function () {
  document.body.appendChild(this._modal);
  classlist.add(this._modal.querySelector('.braintree-three-d-secure__backdrop'), 'braintree-three-d-secure__frame_visible');
  setTimeout(function () {
    classlist.add(this._modal.querySelector('.braintree-three-d-secure__modal'), 'braintree-three-d-secure__frame_visible');
  }.bind(this), 10);
};

module.exports = ThreeDSecure;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/** @module braintree-web/three-d-secure */

var ThreeDSecure = __webpack_require__(205);
var isHTTPS = __webpack_require__(208).isHTTPS;
var basicComponentVerification = __webpack_require__(16);
var BraintreeError = __webpack_require__(1);
var analytics = __webpack_require__(7);
var errors = __webpack_require__(68);
var VERSION = "3.31.0";
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);

/**
 * @static
 * @function create
 * @param {object} options Creation options:
 * @param {Client} options.client A {@link Client} instance.
 * @param {callback} [callback] The second argument, `data`, is the {@link ThreeDSecure} instance. If no callback is provided, it returns a promise that resolves the {@link ThreeDSecure} instance.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
function create(options) {
  return basicComponentVerification.verify({
    name: '3D Secure',
    client: options.client
  }).then(function () {
    var error, isProduction;
    var config = options.client.getConfiguration();

    if (!config.gatewayConfiguration.threeDSecureEnabled) {
      error = errors.THREEDS_NOT_ENABLED;
    }

    if (config.authorizationType === 'TOKENIZATION_KEY') {
      error = errors.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY;
    }

    isProduction = config.gatewayConfiguration.environment === 'production';

    if (isProduction && !isHTTPS()) {
      error = errors.THREEDS_HTTPS_REQUIRED;
    }

    if (error) {
      return Promise.reject(new BraintreeError(error));
    }

    analytics.sendEvent(options.client, 'threedsecure.initialized');

    return new ThreeDSecure(options);
  });
}

module.exports = {
  create: wrapPromise(create),
  /**
   * @description The current version of the SDK, i.e. `{@pkg version}`.
   * @type {string}
   */
  VERSION: VERSION
};


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BraintreeError = __webpack_require__(1);
var analytics = __webpack_require__(7);
var assign = __webpack_require__(15).assign;
var methods = __webpack_require__(11);
var convertMethodsToError = __webpack_require__(12);
var constants = __webpack_require__(206);
var useMin = __webpack_require__(54);
var Bus = __webpack_require__(53);
var uuid = __webpack_require__(22);
var deferred = __webpack_require__(46);
var errors = __webpack_require__(68);
var events = __webpack_require__(207);
var VERSION = "3.31.0";
var iFramer = __webpack_require__(52);
var Promise = __webpack_require__(4);
var wrapPromise = __webpack_require__(3);

var IFRAME_HEIGHT = 400;
var IFRAME_WIDTH = 400;

/**
 * @typedef {object} ThreeDSecure~verifyPayload
 * @property {string} nonce The new payment method nonce produced by the 3D Secure lookup. The original nonce passed into {@link ThreeDSecure#verifyCard|verifyCard} was consumed. This new nonce should be used to transact on your server.
 * @property {object} details Additional account details.
 * @property {string} details.cardType Type of card, ex: Visa, MasterCard.
 * @property {string} details.lastFour Last four digits of card number.
 * @property {string} details.lastTwo Last two digits of card number.
 * @property {string} description A human-readable description.
 * @property {boolean} liabilityShiftPossible Indicates whether the card was eligible for 3D Secure.
 * @property {boolean} liabilityShifted Indicates whether the liability for fraud has been shifted away from the merchant.
 */

/**
 * @class
 * @param {object} options 3D Secure {@link module:braintree-web/three-d-secure.create create} options
 * @description <strong>Do not use this constructor directly. Use {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create} instead.</strong>
 * @classdesc This class represents a ThreeDSecure component produced by {@link module:braintree-web/three-d-secure.create|braintree.threeDSecure.create}. Instances of this class have a method for launching a 3D Secure authentication flow.
 */
function ThreeDSecure(options) {
  this._options = options;
  this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.assetsUrl;
  this._isDebug = options.client.getConfiguration().isDebug;
  this._client = options.client;
}

/**
 * @callback ThreeDSecure~addFrameCallback
 * @param {?BraintreeError} [err] `null` or `undefined` if there was no error.
 * @param {HTMLIFrameElement} iframe An iframe element containing the bank's authentication page that you must put on your page.
 * @description The callback used for options.addFrame in {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * @callback ThreeDSecure~removeFrameCallback
 * @description The callback used for options.removeFrame in {@link ThreeDSecure#verifyCard|verifyCard}.
 * @returns {void}
 */

/**
 * Launch the 3D Secure login flow, returning a nonce payload.
 * @public
 * @param {object} options Options for card verification.
 * @param {string} options.nonce A nonce referencing the card to be verified. For example, this can be a nonce that was returned by Hosted Fields.
 * @param {number} options.amount The amount of the transaction in the current merchant account's currency. For example, if you are running a transaction of $123.45 US dollars, `amount` would be 123.45.
 * @param {callback} options.addFrame This {@link ThreeDSecure~addFrameCallback|addFrameCallback} will be called when the bank frame needs to be added to your page.
 * @param {callback} options.removeFrame This {@link ThreeDSecure~removeFrameCallback|removeFrameCallback} will be called when the bank frame needs to be removed from your page.
 * @param {boolean} [options.showLoader=true] Whether to show the loader icon while the bank frame is loading.
 * @param {callback} [callback] The second argument, <code>data</code>, is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If no callback is provided, it will return a promise that resolves {@link ThreeDSecure~verifyPayload|verifyPayload}.

 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * <caption>Verifying an existing nonce with 3DS</caption>
 * var my3DSContainer;
 *
 * threeDSecure.verifyCard({
 *   nonce: existingNonce,
 *   amount: 123.45,
 *   addFrame: function (err, iframe) {
 *     // Set up your UI and add the iframe.
 *     my3DSContainer = document.createElement('div');
 *     my3DSContainer.appendChild(iframe);
 *     document.body.appendChild(my3DSContainer);
 *   },
 *   removeFrame: function () {
 *     // Remove UI that you added in addFrame.
 *     document.body.removeChild(my3DSContainer);
 *   }
 * }, function (err, payload) {
 *   if (err) {
 *     console.error(err);
 *     return;
 *   }
 *
 *   if (payload.liabilityShifted) {
 *     // Liablity has shifted
 *     submitNonceToServer(payload.nonce);
 *   } else if (payload.liabilityShiftPossible) {
 *     // Liablity may still be shifted
 *     // Decide if you want to submit the nonce
 *   } else {
 *     // Liablity has not shifted and will not shift
 *     // Decide if you want to submit the nonce
 *   }
 * });
 */
ThreeDSecure.prototype.verifyCard = function (options) {
  var url, showLoader, addFrame, removeFrame, error, errorOption;
  var self = this;

  options = options || {};

  if (this._verifyCardInProgress === true) {
    error = errors.THREEDS_AUTHENTICATION_IN_PROGRESS;
  } else if (!options.nonce) {
    errorOption = 'a nonce';
  } else if (!options.amount) {
    errorOption = 'an amount';
  } else if (typeof options.addFrame !== 'function') {
    errorOption = 'an addFrame function';
  } else if (typeof options.removeFrame !== 'function') {
    errorOption = 'a removeFrame function';
  }

  if (errorOption) {
    error = {
      type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
      code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
      message: 'verifyCard options must include ' + errorOption + '.'
    };
  }

  if (error) {
    return Promise.reject(new BraintreeError(error));
  }

  showLoader = options.showLoader !== false;

  this._verifyCardInProgress = true;

  addFrame = deferred(options.addFrame);
  removeFrame = deferred(options.removeFrame);

  url = 'payment_methods/' + options.nonce + '/three_d_secure/lookup';

  return this._client.request({
    endpoint: url,
    method: 'post',
    data: {amount: options.amount}
  }).then(function (response) {
    self._lookupPaymentMethod = response.paymentMethod;

    return new Promise(function (resolve, reject) {
      self._verifyCardCallback = function (verifyErr, payload) {
        self._verifyCardInProgress = false;

        if (verifyErr) {
          reject(verifyErr);
        } else {
          resolve(payload);
        }
      };

      self._handleLookupResponse({
        showLoader: showLoader,
        lookupResponse: response,
        addFrame: addFrame,
        removeFrame: removeFrame
      });
    });
  }).catch(function (err) {
    self._verifyCardInProgress = false;

    return Promise.reject(err);
  });
};

/**
 * Cancel the 3DS flow and return the verification payload if available.
 * @public
 * @param {callback} [callback] The second argument is a {@link ThreeDSecure~verifyPayload|verifyPayload}. If there is no verifyPayload (the initial lookup did not complete), an error will be returned. If no callback is passed, `cancelVerifyCard` will return a promise.
 * @returns {Promise|void} Returns a promise if no callback is provided.
 * @example
 * threeDSecure.cancelVerifyCard(function (err, verifyPayload) {
 *   if (err) {
 *     // Handle error
 *     console.log(err.message); // No verification payload available
 *     return;
 *   }
 *
 *   verifyPayload.nonce; // The nonce returned from the 3ds lookup call
 *   verifyPayload.liabilityShifted; // boolean
 *   verifyPayload.liabilityShiftPossible; // boolean
 * });
 */
ThreeDSecure.prototype.cancelVerifyCard = function () {
  var response;

  this._verifyCardInProgress = false;

  if (!this._lookupPaymentMethod) {
    return Promise.reject(new BraintreeError(errors.THREEDS_NO_VERIFICATION_PAYLOAD));
  }

  response = assign({}, this._lookupPaymentMethod, {
    liabilityShiftPossible: this._lookupPaymentMethod.threeDSecureInfo.liabilityShiftPossible,
    liabilityShifted: this._lookupPaymentMethod.threeDSecureInfo.liabilityShifted,
    verificationDetails: this._lookupPaymentMethod.threeDSecureInfo.verificationDetails
  });

  return Promise.resolve(response);
};

ThreeDSecure.prototype._handleLookupResponse = function (options) {
  var lookupResponse = options.lookupResponse;

  if (lookupResponse.lookup && lookupResponse.lookup.acsUrl && lookupResponse.lookup.acsUrl.length > 0) {
    options.addFrame(null, this._createIframe({
      showLoader: options.showLoader,
      response: lookupResponse.lookup,
      removeFrame: options.removeFrame
    }));
  } else {
    this._verifyCardCallback(null, {
      nonce: lookupResponse.paymentMethod.nonce,
      liabilityShiftPossible: lookupResponse.threeDSecureInfo.liabilityShiftPossible,
      liabilityShifted: lookupResponse.threeDSecureInfo.liabilityShifted,
      verificationDetails: lookupResponse.threeDSecureInfo
    });
  }
};

ThreeDSecure.prototype._createIframe = function (options) {
  var url, authenticationCompleteBaseUrl;
  var parentURL = window.location.href;
  var response = options.response;

  this._bus = new Bus({
    channel: uuid(),
    merchantUrl: location.href
  });

  authenticationCompleteBaseUrl = this._assetsUrl + '/web/' + VERSION + '/html/three-d-secure-authentication-complete-frame.html?channel=' + encodeURIComponent(this._bus.channel) + '&';

  if (parentURL.indexOf('#') > -1) {
    parentURL = parentURL.split('#')[0];
  }

  this._bus.on(Bus.events.CONFIGURATION_REQUEST, function (reply) {
    reply({
      acsUrl: response.acsUrl,
      pareq: response.pareq,
      termUrl: response.termUrl + '&three_d_secure_version=' + VERSION + '&authentication_complete_base_url=' + encodeURIComponent(authenticationCompleteBaseUrl),
      md: response.md,
      parentUrl: parentURL
    });
  });

  this._bus.on(events.AUTHENTICATION_COMPLETE, function (data) {
    this._handleAuthResponse(data, options);
  }.bind(this));

  url = this._assetsUrl + '/web/' + VERSION + '/html/three-d-secure-bank-frame' + useMin(this._isDebug) + '.html?showLoader=' + options.showLoader;

  this._bankIframe = iFramer({
    src: url,
    height: IFRAME_HEIGHT,
    width: IFRAME_WIDTH,
    name: constants.LANDING_FRAME_NAME + '_' + this._bus.channel
  });

  return this._bankIframe;
};

ThreeDSecure.prototype._handleAuthResponse = function (data, options) {
  var authResponse = JSON.parse(data.auth_response);

  this._bus.teardown();

  options.removeFrame();

  // This also has to be in a setTimeout so it executes after the `removeFrame`.
  deferred(function () {
    if (authResponse.success) {
      this._verifyCardCallback(null, this._formatAuthResponse(authResponse.paymentMethod, authResponse.threeDSecureInfo));
    } else if (authResponse.threeDSecureInfo && authResponse.threeDSecureInfo.liabilityShiftPossible) {
      this._verifyCardCallback(null, this._formatAuthResponse(this._lookupPaymentMethod, authResponse.threeDSecureInfo));
    } else {
      this._verifyCardCallback(new BraintreeError({
        type: BraintreeError.types.UNKNOWN,
        code: 'UNKNOWN_AUTH_RESPONSE',
        message: authResponse.error.message
      }));
    }
  }.bind(this))();
};

ThreeDSecure.prototype._formatAuthResponse = function (paymentMethod, threeDSecureInfo) {
  return {
    nonce: paymentMethod.nonce,
    details: paymentMethod.details,
    description: paymentMethod.description,
    liabilityShifted: threeDSecureInfo.liabilityShifted,
    liabilityShiftPossible: threeDSecureInfo.liabilityShiftPossible
  };
};

/**
 * Cleanly remove anything set up by {@link module:braintree-web/three-d-secure.create|create}.
 * @public
 * @param {callback} [callback] Called on completion. If no callback is passed, `teardown` will return a promise.
 * @example
 * threeDSecure.teardown();
 * @example <caption>With callback</caption>
 * threeDSecure.teardown(function () {
 *   // teardown is complete
 * });
 * @returns {Promise|void} Returns a promise if no callback is provided.
 */
ThreeDSecure.prototype.teardown = function () {
  var iframeParent;

  convertMethodsToError(this, methods(ThreeDSecure.prototype));

  analytics.sendEvent(this._options.client, 'threedsecure.teardown-completed');

  if (this._bus) {
    this._bus.teardown();
  }

  if (this._bankIframe) {
    iframeParent = this._bankIframe.parentNode;

    if (iframeParent) {
      iframeParent.removeChild(this._bankIframe);
    }
  }

  return Promise.resolve();
};

module.exports = wrapPromise.wrapPrototype(ThreeDSecure);


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  LANDING_FRAME_NAME: 'braintreethreedsecurelanding'
};


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enumerate = __webpack_require__(20);

module.exports = enumerate([
  'AUTHENTICATION_COMPLETE'
], 'threedsecure:');


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

function isHTTPS(protocol) {
  protocol = protocol || global.location.protocol;

  return protocol === 'https:';
}

module.exports = {
  isHTTPS: isHTTPS
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var analytics = __webpack_require__(14);
var find = __webpack_require__(210);
var uuid = __webpack_require__(67);
var DropinError = __webpack_require__(8);
var kebabCaseToCamelCase = __webpack_require__(211);
var WHITELISTED_DATA_ATTRIBUTES = [
  'locale',
  'payment-option-priority',

  'data-collector.kount',
  'data-collector.paypal',

  // camelcase version was accidentally used initially.
  // we add the kebab case version to match the docs, but
  // we retain the camelcase version for backwards compatibility
  'card.cardholderName',
  'card.cardholderName.required',
  'card.cardholder-name',
  'card.cardholder-name.required',

  'paypal.amount',
  'paypal.currency',
  'paypal.flow',

  'paypal-credit.amount',
  'paypal-credit.currency',
  'paypal-credit.flow'
];

function injectHiddenInput(name, value, form) {
  var input = form.querySelector('[name="' + name + '"]');

  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }

  input.value = value;
}

function addCompositeKeyValuePairToObject(obj, key, value) {
  var decomposedKeys = key.split('.');
  var topLevelKey = kebabCaseToCamelCase(decomposedKeys[0]);

  if (decomposedKeys.length === 1) {
    obj[topLevelKey] = deserialize(value);
  } else {
    obj[topLevelKey] = obj[topLevelKey] || {};
    addCompositeKeyValuePairToObject(obj[topLevelKey], decomposedKeys.slice(1).join('.'), value);
  }
}

function deserialize(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}

function createFromScriptTag(createFunction, scriptTag) {
  var authorization, container, createOptions, form;

  if (!scriptTag) {
    return;
  }

  authorization = scriptTag.getAttribute('data-braintree-dropin-authorization');

  if (!authorization) {
    throw new DropinError('Authorization not found in data-braintree-dropin-authorization attribute');
  }

  container = document.createElement('div');
  container.id = 'braintree-dropin-' + uuid();

  form = find.findParentForm(scriptTag);

  if (!form) {
    throw new DropinError('No form found for script tag integration.');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });

  scriptTag.parentNode.insertBefore(container, scriptTag);

  createOptions = {
    authorization: authorization,
    container: container
  };

  WHITELISTED_DATA_ATTRIBUTES.forEach(function (compositeKey) {
    var value = scriptTag.getAttribute('data-' + compositeKey);

    if (value == null) {
      return;
    }

    addCompositeKeyValuePairToObject(createOptions, compositeKey, value);
  });

  createFunction(createOptions).then(function (instance) {
    analytics.sendEvent(instance._client, 'integration-type.script-tag');
    form.addEventListener('submit', function () {
      instance.requestPaymentMethod(function (requestPaymentError, payload) {
        if (requestPaymentError) {
          return;
        }

        injectHiddenInput('payment_method_nonce', payload.nonce, form);

        if (payload.deviceData) {
          injectHiddenInput('device_data', payload.deviceData, form);
        }

        form.submit();
      });
    });
  });
}

module.exports = createFromScriptTag;


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function findParentForm(element) {
  var parentNode = element.parentNode;

  if (!parentNode || parentNode.nodeName === 'FORM') {
    return parentNode;
  }

  return findParentForm(parentNode);
}

module.exports = {
  findParentForm: findParentForm
};


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function kebabCaseToCamelCase(kebab) {
  var parts = kebab.split('-');
  var first = parts.shift();
  var capitalizedParts = parts.map(function (part) {
    return part.charAt(0).toUpperCase() + part.substring(1);
  });

  return [first].concat(capitalizedParts).join('');
}

module.exports = kebabCaseToCamelCase;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { attrs: { id: "dropin-container" } }),
    _vm._v(" "),
    _c(
      "button",
      { attrs: { disabled: _vm.processing }, on: { click: _vm.order } },
      [_vm._v("Order for " + _vm._s(_vm.totalPriceInDollars) + " $")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d5ddda5a", module.exports)
  }
}

/***/ }),
/* 213 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);