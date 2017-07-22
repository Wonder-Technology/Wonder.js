/*!
 * wonder.js - 3d webgl engine
 * @version v1.0.0-alpha.3
 * @author Yuanchao Yang <395976266@qq.com>
 * @link https://github.com/yyc-git/Wonder.js
 * @license MIT
 */


(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.wd = global.wd || {})));
}(this, (function (exports) { 'use strict';

	function __extends(d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	var JudgeUtils = (function () {
	    function JudgeUtils() {
	    }
	    JudgeUtils.isArray = function (arr) {
	        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	        var length = arr && arr.length;
	        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	    };
	    JudgeUtils.isArrayExactly = function (arr) {
	        return Object.prototype.toString.call(arr) === "[object Array]";
	    };
	    JudgeUtils.isNumber = function (num) {
	        return typeof num == "number";
	    };
	    JudgeUtils.isNumberExactly = function (num) {
	        return Object.prototype.toString.call(num) === "[object Number]";
	    };
	    JudgeUtils.isString = function (str) {
	        return typeof str == "string";
	    };
	    JudgeUtils.isStringExactly = function (str) {
	        return Object.prototype.toString.call(str) === "[object String]";
	    };
	    JudgeUtils.isBoolean = function (bool) {
	        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
	    };
	    JudgeUtils.isDom = function (obj) {
	        return !!(obj && obj.nodeType === 1);
	    };
	    JudgeUtils.isObject = function (obj) {
	        var type = typeof obj;
	        return type === 'function' || type === 'object' && !!obj;
	    };
	    JudgeUtils.isDirectObject = function (obj) {
	        return Object.prototype.toString.call(obj) === "[object Object]";
	    };
	    JudgeUtils.isHostMethod = function (object, property) {
	        var type = typeof object[property];
	        return type === "function" ||
	            (type === "object" && !!object[property]);
	    };
	    JudgeUtils.isNodeJs = function () {
	        return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
	    };
	    JudgeUtils.isFunction = function (func) {
	        return true;
	    };
	    return JudgeUtils;
	}());
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    JudgeUtils.isFunction = function (func) {
	        return typeof func == 'function';
	    };
	}
	else {
	    JudgeUtils.isFunction = function (func) {
	        return Object.prototype.toString.call(func) === "[object Function]";
	    };
	}

	var root;
	if (JudgeUtils.isNodeJs() && typeof global != "undefined") {
	    root = global;
	}
	else if (typeof window != "undefined") {
	    root = window;
	}
	else if (typeof self != "undefined") {
	    root = self;
	}
	else {
	    Log$1.error("no avaliable root!");
	}

	var Log$1 = (function () {
	    function Log() {
	    }
	    Log.log = function () {
	        var messages = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            messages[_i] = arguments[_i];
	        }
	        if (!this._exec("log", messages)) {
	            root.alert(messages.join(","));
	        }
	        this._exec("trace", messages);
	    };
	    Log.assert = function (cond) {
	        var messages = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            messages[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            if (!this._exec("assert", arguments, 1)) {
	                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	        }
	    };
	    Log.error = function (cond) {
	        var message = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            message[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
	        }
	    };
	    Log.warn = function () {
	        var message = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            message[_i] = arguments[_i];
	        }
	        var result = this._exec("warn", arguments);
	        if (!result) {
	            this.log.apply(this, arguments);
	        }
	        else {
	            this._exec("trace", ["warn trace"]);
	        }
	    };
	    Log._exec = function (consoleMethod, args, sliceBegin) {
	        if (sliceBegin === void 0) { sliceBegin = 0; }
	        if (root.console && root.console[consoleMethod]) {
	            root.console[consoleMethod].apply(root.console, Array.prototype.slice.call(args, sliceBegin));
	            return true;
	        }
	        return false;
	    };
	    Log.info = {
	        INVALID_PARAM: "invalid parameter",
	        helperFunc: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = "";
	            args.forEach(function (val) {
	                result += String(val) + " ";
	            });
	            return result.slice(0, -1);
	        },
	        assertion: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            if (args.length === 2) {
	                return this.helperFunc(args[0], args[1]);
	            }
	            else if (args.length === 3) {
	                return this.helperFunc(args[1], args[0], args[2]);
	            }
	            else {
	                throw new Error("args.length must <= 3");
	            }
	        },
	        FUNC_INVALID: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("invalid");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_BE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must be");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_NOT_BE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must not be");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_SHOULD: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("should");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_SHOULD_NOT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("should not");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_SUPPORT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("support");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_NOT_SUPPORT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("not support");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_DEFINE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must define");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_NOT_DEFINE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must not define");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_UNKNOW: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("unknow");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_EXPECT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("expect");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_UNEXPECT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("unexpect");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_EXIST: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("exist");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_NOT_EXIST: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("not exist");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_ONLY: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("only");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_CAN_NOT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("can't");
	            return this.assertion.apply(this, args);
	        }
	    };
	    return Log;
	}());

	var Log$$1 = (function (_super) {
	    __extends(Log$$1, _super);
	    function Log$$1() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return Log$$1;
	}(Log$1));

	var CompileConfig = {
	    isCompileTest: true,
	    closeContractTest: false
	};

	var InitConfigData = (function () {
	    function InitConfigData() {
	    }
	    InitConfigData.isTest = null;
	    return InitConfigData;
	}());

	var InitConfigWorkerData = (function () {
	    function InitConfigWorkerData() {
	    }
	    InitConfigWorkerData.isTest = null;
	    return InitConfigWorkerData;
	}());

	var _describeContext = null;
	var _getIsTest = function () {
	    if (InitConfigData.isTest === true || InitConfigWorkerData.isTest === true) {
	        return true;
	    }
	    return false;
	};
	function assert(cond, message) {
	    if (message === void 0) { message = "contract error"; }
	    Log$$1.error(!cond, message);
	}
	function describe(message, func, preCondition, context) {
	    if (preCondition === void 0) { preCondition = function () { return true; }; }
	    if (context === void 0) { context = this; }
	    if (preCondition.call(context, null)) {
	        _describeContext = context;
	        try {
	            func.call(context, null);
	        }
	        catch (e) {
	            assert(false, message + "->" + e.message);
	        }
	        finally {
	            _describeContext = null;
	        }
	    }
	}
	function it(message, func, context) {
	    try {
	        if (arguments.length === 3) {
	            func.call(context, null);
	        }
	        else {
	            if (_describeContext) {
	                func.call(_describeContext, null);
	            }
	            else {
	                func();
	            }
	        }
	    }
	    catch (e) {
	        assert(false, message + "->" + e.message);
	    }
	}
	function requireCheck(inFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var value_1 = descriptor.value;
	            descriptor.value = function (args) {
	                if (_getIsTest()) {
	                    inFunc.apply(this, arguments);
	                }
	                return value_1.apply(this, arguments);
	            };
	        }
	        return descriptor;
	    };
	}
	function requireCheckFunc(checkFunc, bodyFunc) {
	    if (!CompileConfig.isCompileTest) {
	        return bodyFunc;
	    }
	    return function () {
	        var paramArr = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            paramArr[_i] = arguments[_i];
	        }
	        if (!_getIsTest()) {
	            return bodyFunc.apply(null, paramArr);
	        }
	        checkFunc.apply(null, paramArr);
	        return bodyFunc.apply(null, paramArr);
	    };
	}
	function ensure(outFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var value_2 = descriptor.value;
	            descriptor.value = function (args) {
	                var result = value_2.apply(this, arguments);
	                if (_getIsTest()) {
	                    var params = [result];
	                    for (var i = 0, len = arguments.length; i < len; i++) {
	                        params[i + 1] = arguments[i];
	                    }
	                    outFunc.apply(this, params);
	                }
	                return result;
	            };
	        }
	        return descriptor;
	    };
	}
	function ensureFunc(checkFunc, bodyFunc) {
	    if (!CompileConfig.isCompileTest) {
	        return bodyFunc;
	    }
	    return function () {
	        var paramArr = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            paramArr[_i] = arguments[_i];
	        }
	        if (!_getIsTest()) {
	            return bodyFunc.apply(null, paramArr);
	        }
	        var result = bodyFunc.apply(null, paramArr);
	        checkFunc.apply(null, [result].concat(paramArr));
	        return result;
	    };
	}
	function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var getter_1 = descriptor.get, setter_1 = descriptor.set;
	            descriptor.get = function () {
	                if (_getIsTest()) {
	                    inGetterFunc.call(this);
	                }
	                return getter_1.call(this);
	            };
	            descriptor.set = function (val) {
	                if (_getIsTest()) {
	                    inSetterFunc.call(this, val);
	                }
	                setter_1.call(this, val);
	            };
	        }
	        return descriptor;
	    };
	}
	function requireGetter(inFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var getter_2 = descriptor.get;
	            descriptor.get = function () {
	                if (_getIsTest()) {
	                    inFunc.call(this);
	                }
	                return getter_2.call(this);
	            };
	        }
	        return descriptor;
	    };
	}
	function requireSetter(inFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var setter_2 = descriptor.set;
	            descriptor.set = function (val) {
	                if (_getIsTest()) {
	                    inFunc.call(this, val);
	                }
	                setter_2.call(this, val);
	            };
	        }
	        return descriptor;
	    };
	}
	function ensureGetterAndSetter(outGetterFunc, outSetterFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var getter_3 = descriptor.get, setter_3 = descriptor.set;
	            descriptor.get = function () {
	                var result = getter_3.call(this);
	                if (_getIsTest()) {
	                    outGetterFunc.call(this, result);
	                }
	                return result;
	            };
	            descriptor.set = function (val) {
	                var result = setter_3.call(this, val);
	                if (_getIsTest()) {
	                    var params = [result, val];
	                    outSetterFunc.apply(this, params);
	                }
	            };
	        }
	        return descriptor;
	    };
	}
	function ensureGetter(outFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var getter_4 = descriptor.get;
	            descriptor.get = function () {
	                var result = getter_4.call(this);
	                if (_getIsTest()) {
	                    outFunc.call(this, result);
	                }
	                return result;
	            };
	        }
	        return descriptor;
	    };
	}
	function ensureSetter(outFunc) {
	    return function (target, name, descriptor) {
	        if (CompileConfig.isCompileTest) {
	            var setter_4 = descriptor.set;
	            descriptor.set = function (val) {
	                var result = setter_4.call(this, val);
	                if (_getIsTest()) {
	                    var params = [result, val];
	                    outFunc.apply(this, params);
	                }
	            };
	        }
	        return descriptor;
	    };
	}
	function invariant(func) {
	    return function (target) {
	        if (CompileConfig.isCompileTest) {
	            if (_getIsTest()) {
	                func(target);
	            }
	        }
	    };
	}

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



	function unwrapExports (x) {
		return x && x.__esModule ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var wdet = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		factory(exports);
	}(commonjsGlobal, (function (exports) { 'use strict';

		function __extends(d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		}

		var ExpectData = (function () {
		    function ExpectData() {
		    }
		    return ExpectData;
		}());
		ExpectData.assertion = null;
		ExpectData.source = null;
		ExpectData.isNot = null;

		var JudgeUtils = (function () {
		    function JudgeUtils() {
		    }
		    JudgeUtils.isArray = function (arr) {
		        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
		        var length = arr && arr.length;
		        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
		    };
		    JudgeUtils.isArrayExactly = function (arr) {
		        return Object.prototype.toString.call(arr) === "[object Array]";
		    };
		    JudgeUtils.isNumber = function (num) {
		        return typeof num == "number";
		    };
		    JudgeUtils.isNumberExactly = function (num) {
		        return Object.prototype.toString.call(num) === "[object Number]";
		    };
		    JudgeUtils.isString = function (str) {
		        return typeof str == "string";
		    };
		    JudgeUtils.isStringExactly = function (str) {
		        return Object.prototype.toString.call(str) === "[object String]";
		    };
		    JudgeUtils.isBoolean = function (bool) {
		        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
		    };
		    JudgeUtils.isDom = function (obj) {
		        return !!(obj && obj.nodeType === 1);
		    };
		    JudgeUtils.isObject = function (obj) {
		        var type = typeof obj;
		        return type === 'function' || type === 'object' && !!obj;
		    };
		    JudgeUtils.isDirectObject = function (obj) {
		        return Object.prototype.toString.call(obj) === "[object Object]";
		    };
		    JudgeUtils.isHostMethod = function (object, property) {
		        var type = typeof object[property];
		        return type === "function" ||
		            (type === "object" && !!object[property]);
		    };
		    JudgeUtils.isNodeJs = function () {
		        return ((typeof commonjsGlobal != "undefined" && commonjsGlobal.module) || ('object' != "undefined")) && 'object' != "undefined";
		    };
		    JudgeUtils.isFunction = function (func) {
		        return true;
		    };
		    return JudgeUtils;
		}());
		if (typeof /./ != 'function' && typeof Int8Array != 'object') {
		    JudgeUtils.isFunction = function (func) {
		        return typeof func == 'function';
		    };
		}
		else {
		    JudgeUtils.isFunction = function (func) {
		        return Object.prototype.toString.call(func) === "[object Function]";
		    };
		}

		var $BREAK = {
		    break: true
		};
		var $REMOVE = void 0;

		var List = (function () {
		    function List() {
		        this.children = null;
		    }
		    List.prototype.getCount = function () {
		        return this.children.length;
		    };
		    List.prototype.hasChild = function (child) {
		        var c = null, children = this.children;
		        for (var i = 0, len = children.length; i < len; i++) {
		            c = children[i];
		            if (child.uid && c.uid && child.uid == c.uid) {
		                return true;
		            }
		            else if (child === c) {
		                return true;
		            }
		        }
		        return false;
		    };
		    List.prototype.hasChildWithFunc = function (func) {
		        for (var i = 0, len = this.children.length; i < len; i++) {
		            if (func(this.children[i], i)) {
		                return true;
		            }
		        }
		        return false;
		    };
		    List.prototype.getChildren = function () {
		        return this.children;
		    };
		    List.prototype.getChild = function (index) {
		        return this.children[index];
		    };
		    List.prototype.addChild = function (child) {
		        this.children.push(child);
		        return this;
		    };
		    List.prototype.addChildren = function (arg) {
		        if (JudgeUtils.isArray(arg)) {
		            var children = arg;
		            this.children = this.children.concat(children);
		        }
		        else if (arg instanceof List) {
		            var children = arg;
		            this.children = this.children.concat(children.getChildren());
		        }
		        else {
		            var child = arg;
		            this.addChild(child);
		        }
		        return this;
		    };
		    List.prototype.setChildren = function (children) {
		        this.children = children;
		        return this;
		    };
		    List.prototype.unShiftChild = function (child) {
		        this.children.unshift(child);
		    };
		    List.prototype.removeAllChildren = function () {
		        this.children = [];
		        return this;
		    };
		    List.prototype.forEach = function (func, context) {
		        this._forEach(this.children, func, context);
		        return this;
		    };
		    List.prototype.toArray = function () {
		        return this.children;
		    };
		    List.prototype.copyChildren = function () {
		        return this.children.slice(0);
		    };
		    List.prototype.removeChildHelper = function (arg) {
		        var result = null;
		        if (JudgeUtils.isFunction(arg)) {
		            var func = arg;
		            result = this._removeChild(this.children, func);
		        }
		        else if (arg.uid) {
		            result = this._removeChild(this.children, function (e) {
		                if (!e.uid) {
		                    return false;
		                }
		                return e.uid === arg.uid;
		            });
		        }
		        else {
		            result = this._removeChild(this.children, function (e) {
		                return e === arg;
		            });
		        }
		        return result;
		    };
		    List.prototype._forEach = function (arr, func, context) {
		        var scope = context, i = 0, len = arr.length;
		        for (i = 0; i < len; i++) {
		            if (func.call(scope, arr[i], i) === $BREAK) {
		                break;
		            }
		        }
		    };
		    List.prototype._removeChild = function (arr, func) {
		        var self = this, removedElementArr = [], remainElementArr = [];
		        this._forEach(arr, function (e, index) {
		            if (!!func.call(self, e)) {
		                removedElementArr.push(e);
		            }
		            else {
		                remainElementArr.push(e);
		            }
		        });
		        this.children = remainElementArr;
		        return removedElementArr;
		    };
		    return List;
		}());

		var ExtendUtils = (function () {
		    function ExtendUtils() {
		    }
		    ExtendUtils.extendDeep = function (parent, child, filter) {
		        if (filter === void 0) { filter = function (val, i) { return true; }; }
		        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
		        if (toStr.call(parent) === sArr) {
		            _child = child || [];
		            for (i = 0, len = parent.length; i < len; i++) {
		                var member = parent[i];
		                if (!filter(member, i)) {
		                    continue;
		                }
		                if (member.clone) {
		                    _child[i] = member.clone();
		                    continue;
		                }
		                type = toStr.call(member);
		                if (type === sArr || type === sOb) {
		                    _child[i] = type === sArr ? [] : {};
		                    ExtendUtils.extendDeep(member, _child[i]);
		                }
		                else {
		                    _child[i] = member;
		                }
		            }
		        }
		        else if (toStr.call(parent) === sOb) {
		            _child = child || {};
		            for (i in parent) {
		                var member = parent[i];
		                if (!filter(member, i)) {
		                    continue;
		                }
		                if (member.clone) {
		                    _child[i] = member.clone();
		                    continue;
		                }
		                type = toStr.call(member);
		                if (type === sArr || type === sOb) {
		                    _child[i] = type === sArr ? [] : {};
		                    ExtendUtils.extendDeep(member, _child[i]);
		                }
		                else {
		                    _child[i] = member;
		                }
		            }
		        }
		        else {
		            _child = parent;
		        }
		        return _child;
		    };
		    ExtendUtils.extend = function (destination, source) {
		        var property = "";
		        for (property in source) {
		            destination[property] = source[property];
		        }
		        return destination;
		    };
		    ExtendUtils.copyPublicAttri = function (source) {
		        var property = null, destination = {};
		        this.extendDeep(source, destination, function (item, property) {
		            return property.slice(0, 1) !== "_"
		                && !JudgeUtils.isFunction(item);
		        });
		        return destination;
		    };
		    return ExtendUtils;
		}());

		var Collection = (function (_super) {
		    __extends(Collection, _super);
		    function Collection(children) {
		        if (children === void 0) { children = []; }
		        var _this = _super.call(this) || this;
		        _this.children = children;
		        return _this;
		    }
		    Collection.create = function (children) {
		        if (children === void 0) { children = []; }
		        var obj = new this(children);
		        return obj;
		    };
		    Collection.prototype.clone = function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var target = null, isDeep = null;
		        if (args.length === 0) {
		            isDeep = false;
		            target = Collection.create();
		        }
		        else if (args.length === 1) {
		            if (JudgeUtils.isBoolean(args[0])) {
		                target = Collection.create();
		                isDeep = args[0];
		            }
		            else {
		                target = args[0];
		                isDeep = false;
		            }
		        }
		        else {
		            target = args[0];
		            isDeep = args[1];
		        }
		        if (isDeep === true) {
		            target.setChildren(ExtendUtils.extendDeep(this.children));
		        }
		        else {
		            target.setChildren(ExtendUtils.extend([], this.children));
		        }
		        return target;
		    };
		    Collection.prototype.filter = function (func) {
		        var children = this.children, result = [], value = null;
		        for (var i = 0, len = children.length; i < len; i++) {
		            value = children[i];
		            if (func.call(children, value, i)) {
		                result.push(value);
		            }
		        }
		        return Collection.create(result);
		    };
		    Collection.prototype.findOne = function (func) {
		        var scope = this.children, result = null;
		        this.forEach(function (value, index) {
		            if (!func.call(scope, value, index)) {
		                return;
		            }
		            result = value;
		            return $BREAK;
		        });
		        return result;
		    };
		    Collection.prototype.reverse = function () {
		        return Collection.create(this.copyChildren().reverse());
		    };
		    Collection.prototype.removeChild = function (arg) {
		        return Collection.create(this.removeChildHelper(arg));
		    };
		    Collection.prototype.sort = function (func, isSortSelf) {
		        if (isSortSelf === void 0) { isSortSelf = false; }
		        if (isSortSelf) {
		            this.children.sort(func);
		            return this;
		        }
		        return Collection.create(this.copyChildren().sort(func));
		    };
		    Collection.prototype.map = function (func) {
		        var resultArr = [];
		        this.forEach(function (e, index) {
		            var result = func(e, index);
		            if (result !== $REMOVE) {
		                resultArr.push(result);
		            }
		        });
		        return Collection.create(resultArr);
		    };
		    Collection.prototype.removeRepeatItems = function () {
		        var noRepeatList = Collection.create();
		        this.forEach(function (item) {
		            if (noRepeatList.hasChild(item)) {
		                return;
		            }
		            noRepeatList.addChild(item);
		        });
		        return noRepeatList;
		    };
		    Collection.prototype.hasRepeatItems = function () {
		        var noRepeatList = Collection.create(), hasRepeat = false;
		        this.forEach(function (item) {
		            if (noRepeatList.hasChild(item)) {
		                hasRepeat = true;
		                return $BREAK;
		            }
		            noRepeatList.addChild(item);
		        });
		        return hasRepeat;
		    };
		    return Collection;
		}(List));

		var Log = (function () {
		    function Log() {
		    }
		    Log.log = function () {
		        var messages = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            messages[_i] = arguments[_i];
		        }
		        if (!this._exec("log", messages)) {
		            root.alert(messages.join(","));
		        }
		        this._exec("trace", messages);
		    };
		    Log.assert = function (cond) {
		        var messages = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            messages[_i - 1] = arguments[_i];
		        }
		        if (cond) {
		            if (!this._exec("assert", arguments, 1)) {
		                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
		            }
		        }
		    };
		    Log.error = function (cond) {
		        var message = [];
		        for (var _i = 1; _i < arguments.length; _i++) {
		            message[_i - 1] = arguments[_i];
		        }
		        if (cond) {
		            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
		        }
		    };
		    Log.warn = function () {
		        var message = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            message[_i] = arguments[_i];
		        }
		        var result = this._exec("warn", arguments);
		        if (!result) {
		            this.log.apply(this, arguments);
		        }
		        else {
		            this._exec("trace", ["warn trace"]);
		        }
		    };
		    Log._exec = function (consoleMethod, args, sliceBegin) {
		        if (sliceBegin === void 0) { sliceBegin = 0; }
		        if (root.console && root.console[consoleMethod]) {
		            root.console[consoleMethod].apply(root.console, Array.prototype.slice.call(args, sliceBegin));
		            return true;
		        }
		        return false;
		    };
		    return Log;
		}());
		Log.info = {
		    INVALID_PARAM: "invalid parameter",
		    helperFunc: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var result = "";
		        args.forEach(function (val) {
		            result += String(val) + " ";
		        });
		        return result.slice(0, -1);
		    },
		    assertion: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        if (args.length === 2) {
		            return this.helperFunc(args[0], args[1]);
		        }
		        else if (args.length === 3) {
		            return this.helperFunc(args[1], args[0], args[2]);
		        }
		        else {
		            throw new Error("args.length must <= 3");
		        }
		    },
		    FUNC_INVALID: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("invalid");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_MUST: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("must");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_MUST_BE: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("must be");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_MUST_NOT_BE: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("must not be");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_SHOULD: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("should");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_SHOULD_NOT: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("should not");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_SUPPORT: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("support");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_NOT_SUPPORT: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("not support");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_MUST_DEFINE: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("must define");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_MUST_NOT_DEFINE: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("must not define");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_UNKNOW: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("unknow");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_EXPECT: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("expect");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_UNEXPECT: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("unexpect");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_EXIST: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("exist");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_NOT_EXIST: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("not exist");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_ONLY: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("only");
		        return this.assertion.apply(this, args);
		    },
		    FUNC_CAN_NOT: function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        args.unshift("can't");
		        return this.assertion.apply(this, args);
		    }
		};

		var root;
		if (JudgeUtils.isNodeJs() && typeof commonjsGlobal != "undefined") {
		    root = commonjsGlobal;
		}
		else if (typeof window != "undefined") {
		    root = window;
		}
		else if (typeof self != "undefined") {
		    root = self;
		}
		else {
		    Log.error("no avaliable root!");
		}

		var Queue = (function (_super) {
		    __extends(Queue, _super);
		    function Queue(children) {
		        if (children === void 0) { children = []; }
		        var _this = _super.call(this) || this;
		        _this.children = children;
		        return _this;
		    }
		    Queue.create = function (children) {
		        if (children === void 0) { children = []; }
		        var obj = new this(children);
		        return obj;
		    };
		    Object.defineProperty(Queue.prototype, "front", {
		        get: function () {
		            return this.children[this.children.length - 1];
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Object.defineProperty(Queue.prototype, "rear", {
		        get: function () {
		            return this.children[0];
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Queue.prototype.push = function (element) {
		        this.children.unshift(element);
		    };
		    Queue.prototype.pop = function () {
		        return this.children.pop();
		    };
		    Queue.prototype.clear = function () {
		        this.removeAllChildren();
		    };
		    return Queue;
		}(List));

		var Stack = (function (_super) {
		    __extends(Stack, _super);
		    function Stack(children) {
		        if (children === void 0) { children = []; }
		        var _this = _super.call(this) || this;
		        _this.children = children;
		        return _this;
		    }
		    Stack.create = function (children) {
		        if (children === void 0) { children = []; }
		        var obj = new this(children);
		        return obj;
		    };
		    Object.defineProperty(Stack.prototype, "top", {
		        get: function () {
		            return this.children[this.children.length - 1];
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Stack.prototype.push = function (element) {
		        this.children.push(element);
		    };
		    Stack.prototype.pop = function () {
		        return this.children.pop();
		    };
		    Stack.prototype.clear = function () {
		        this.removeAllChildren();
		    };
		    Stack.prototype.clone = function () {
		        var args = [];
		        for (var _i = 0; _i < arguments.length; _i++) {
		            args[_i] = arguments[_i];
		        }
		        var target = null, isDeep = null;
		        if (args.length === 0) {
		            isDeep = false;
		            target = Stack.create();
		        }
		        else if (args.length === 1) {
		            if (JudgeUtils.isBoolean(args[0])) {
		                target = Stack.create();
		                isDeep = args[0];
		            }
		            else {
		                target = args[0];
		                isDeep = false;
		            }
		        }
		        else {
		            target = args[0];
		            isDeep = args[1];
		        }
		        if (isDeep === true) {
		            target.setChildren(ExtendUtils.extendDeep(this.children));
		        }
		        else {
		            target.setChildren(ExtendUtils.extend([], this.children));
		        }
		        return target;
		    };
		    Stack.prototype.filter = function (func) {
		        var children = this.children, result = [], value = null;
		        for (var i = 0, len = children.length; i < len; i++) {
		            value = children[i];
		            if (func.call(children, value, i)) {
		                result.push(value);
		            }
		        }
		        return Collection.create(result);
		    };
		    Stack.prototype.findOne = function (func) {
		        var scope = this.children, result = null;
		        this.forEach(function (value, index) {
		            if (!func.call(scope, value, index)) {
		                return;
		            }
		            result = value;
		            return $BREAK;
		        });
		        return result;
		    };
		    Stack.prototype.reverse = function () {
		        return Collection.create(this.copyChildren().reverse());
		    };
		    Stack.prototype.removeChild = function (arg) {
		        return Collection.create(this.removeChildHelper(arg));
		    };
		    Stack.prototype.sort = function (func, isSortSelf) {
		        if (isSortSelf === void 0) { isSortSelf = false; }
		        if (isSortSelf) {
		            this.children.sort(func);
		            return this;
		        }
		        return Collection.create(this.copyChildren().sort(func));
		    };
		    Stack.prototype.map = function (func) {
		        var resultArr = [];
		        this.forEach(function (e, index) {
		            var result = func(e, index);
		            if (result !== $REMOVE) {
		                resultArr.push(result);
		            }
		        });
		        return Collection.create(resultArr);
		    };
		    Stack.prototype.removeRepeatItems = function () {
		        var noRepeatList = Collection.create();
		        this.forEach(function (item) {
		            if (noRepeatList.hasChild(item)) {
		                return;
		            }
		            noRepeatList.addChild(item);
		        });
		        return noRepeatList;
		    };
		    Stack.prototype.hasRepeatItems = function () {
		        var noRepeatList = Collection.create(), hasRepeat = false;
		        this.forEach(function (item) {
		            if (noRepeatList.hasChild(item)) {
		                hasRepeat = true;
		                return $BREAK;
		            }
		            noRepeatList.addChild(item);
		        });
		        return hasRepeat;
		    };
		    return Stack;
		}(List));

		var Assertion = (function () {
		    function Assertion() {
		    }
		    Assertion.create = function () {
		        var obj = new this();
		        return obj;
		    };
		    Object.defineProperty(Assertion.prototype, "not", {
		        get: function () {
		            ExpectData.isNot = true;
		            return this;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Object.defineProperty(Assertion.prototype, "be", {
		        get: function () {
		            return this;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Object.defineProperty(Assertion.prototype, "true", {
		        get: function () {
		            var source = ExpectData.source;
		            this._assert(!!source === true, "true");
		            return this;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Object.defineProperty(Assertion.prototype, "false", {
		        get: function () {
		            var source = ExpectData.source;
		            this._assert(!!source === false, "false");
		            return this;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Object.defineProperty(Assertion.prototype, "exist", {
		        get: function () {
		            var source = ExpectData.source;
		            this._assert(source !== null && source !== void 0, "exist");
		            return this;
		        },
		        enumerable: true,
		        configurable: true
		    });
		    Assertion.prototype.equal = function (n) {
		        var source = ExpectData.source;
		        this._assert(source === n, "equal", n);
		        return this;
		    };
		    Assertion.prototype.gt = function (n) {
		        var source = ExpectData.source;
		        this._assert(source > n, ">", n);
		        return this;
		    };
		    Assertion.prototype.gte = function (n) {
		        var source = ExpectData.source;
		        this._assert(source >= n, ">=", n);
		        return this;
		    };
		    Assertion.prototype.lt = function (n) {
		        var source = ExpectData.source;
		        this._assert(source < n, "<", n);
		        return this;
		    };
		    Assertion.prototype.lte = function (n) {
		        var source = ExpectData.source;
		        this._assert(source <= n, "<=", n);
		        return this;
		    };
		    Assertion.prototype.a = function (type) {
		        var source = ExpectData.source;
		        switch (type) {
		            case "number":
		                this._assert(JudgeUtils.isNumber(source), "number");
		                break;
		            case "array":
		                this._assert(JudgeUtils.isArrayExactly(source), "array");
		                break;
		            case "boolean":
		                this._assert(JudgeUtils.isBoolean(source), "boolean");
		                break;
		            case "string":
		                this._assert(JudgeUtils.isStringExactly(source), "string");
		                break;
		            default:
		                break;
		        }
		    };
		    Assertion.prototype._buildFailMsg = function (operationStr, target) {
		        if (!!target) {
		            return "expected " + this._format(ExpectData.source) + " to be " + operationStr + " " + target;
		        }
		        return "expected " + this._format(ExpectData.source) + " to be " + operationStr;
		    };
		    Assertion.prototype._assert = function (passCondition, failMsg, target) {
		        var pass = null, failMessage = null;
		        if (ExpectData.isNot) {
		            pass = !passCondition;
		        }
		        else {
		            pass = passCondition;
		        }
		        if (pass) {
		            ExpectData.isNot = false;
		            return;
		        }
		        failMessage = this._buildFailMsg(failMsg, target);
		        if (ExpectData.isNot) {
		            ExpectData.isNot = false;
		            failMessage = failMessage.replace("to be", "not to be");
		        }
		        throw new Error(failMessage);
		    };
		    Assertion.prototype._format = function (source) {
		        return source;
		    };
		    return Assertion;
		}());

		var expect = function (source) {
		    var assertion = ExpectData.assertion;
		    ExpectData.source = source;
		    return assertion;
		};
		var _initData = function () {
		    ExpectData.assertion = Assertion.create();
		    ExpectData.isNot = false;
		};
		_initData();

		exports.Assertion = Assertion;
		exports.expect = expect;
		exports.ExpectData = ExpectData;

		Object.defineProperty(exports, '__esModule', { value: true });

	})));

	});

	var wdet_1 = wdet.expect;

	var $BREAK = {
	    break: true
	};
	var $REMOVE = void 0;

	var List = (function () {
	    function List() {
	        this.children = null;
	    }
	    List.prototype.getCount = function () {
	        return this.children.length;
	    };
	    List.prototype.hasChild = function (child) {
	        var c = null, children = this.children;
	        for (var i = 0, len = children.length; i < len; i++) {
	            c = children[i];
	            if (child.uid && c.uid && child.uid == c.uid) {
	                return true;
	            }
	            else if (child === c) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.hasChildWithFunc = function (func) {
	        for (var i = 0, len = this.children.length; i < len; i++) {
	            if (func(this.children[i], i)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.getChildren = function () {
	        return this.children;
	    };
	    List.prototype.getChild = function (index) {
	        return this.children[index];
	    };
	    List.prototype.addChild = function (child) {
	        this.children.push(child);
	        return this;
	    };
	    List.prototype.addChildren = function (arg) {
	        if (JudgeUtils.isArray(arg)) {
	            var children = arg;
	            this.children = this.children.concat(children);
	        }
	        else if (arg instanceof List) {
	            var children = arg;
	            this.children = this.children.concat(children.getChildren());
	        }
	        else {
	            var child = arg;
	            this.addChild(child);
	        }
	        return this;
	    };
	    List.prototype.setChildren = function (children) {
	        this.children = children;
	        return this;
	    };
	    List.prototype.unShiftChild = function (child) {
	        this.children.unshift(child);
	    };
	    List.prototype.removeAllChildren = function () {
	        this.children = [];
	        return this;
	    };
	    List.prototype.forEach = function (func, context) {
	        this._forEach(this.children, func, context);
	        return this;
	    };
	    List.prototype.toArray = function () {
	        return this.children;
	    };
	    List.prototype.copyChildren = function () {
	        return this.children.slice(0);
	    };
	    List.prototype.removeChildHelper = function (arg) {
	        var result = null;
	        if (JudgeUtils.isFunction(arg)) {
	            var func = arg;
	            result = this._removeChild(this.children, func);
	        }
	        else if (arg.uid) {
	            result = this._removeChild(this.children, function (e) {
	                if (!e.uid) {
	                    return false;
	                }
	                return e.uid === arg.uid;
	            });
	        }
	        else {
	            result = this._removeChild(this.children, function (e) {
	                return e === arg;
	            });
	        }
	        return result;
	    };
	    List.prototype._forEach = function (arr, func, context) {
	        var scope = context, i = 0, len = arr.length;
	        for (i = 0; i < len; i++) {
	            if (func.call(scope, arr[i], i) === $BREAK) {
	                break;
	            }
	        }
	    };
	    List.prototype._removeChild = function (arr, func) {
	        var self = this, removedElementArr = [], remainElementArr = [];
	        this._forEach(arr, function (e, index) {
	            if (!!func.call(self, e)) {
	                removedElementArr.push(e);
	            }
	            else {
	                remainElementArr.push(e);
	            }
	        });
	        this.children = remainElementArr;
	        return removedElementArr;
	    };
	    return List;
	}());

	var ExtendUtils = (function () {
	    function ExtendUtils() {
	    }
	    ExtendUtils.extendDeep = function (parent, child, filter) {
	        if (filter === void 0) { filter = function (val, i) { return true; }; }
	        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
	        if (toStr.call(parent) === sArr) {
	            _child = child || [];
	            for (i = 0, len = parent.length; i < len; i++) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else if (toStr.call(parent) === sOb) {
	            _child = child || {};
	            for (i in parent) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else {
	            _child = parent;
	        }
	        return _child;
	    };
	    ExtendUtils.extend = function (destination, source) {
	        var property = "";
	        for (property in source) {
	            destination[property] = source[property];
	        }
	        return destination;
	    };
	    ExtendUtils.copyPublicAttri = function (source) {
	        var property = null, destination = {};
	        this.extendDeep(source, destination, function (item, property) {
	            return property.slice(0, 1) !== "_"
	                && !JudgeUtils.isFunction(item);
	        });
	        return destination;
	    };
	    return ExtendUtils;
	}());

	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Collection.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Collection.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Collection.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils.isBoolean(args[0])) {
	                target = Collection.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils.extendDeep(this.children));
	        }
	        else {
	            target.setChildren(ExtendUtils.extend([], this.children));
	        }
	        return target;
	    };
	    Collection.prototype.filter = function (func) {
	        var children = this.children, result = [], value = null;
	        for (var i = 0, len = children.length; i < len; i++) {
	            value = children[i];
	            if (func.call(children, value, i)) {
	                result.push(value);
	            }
	        }
	        return Collection.create(result);
	    };
	    Collection.prototype.findOne = function (func) {
	        var scope = this.children, result = null;
	        this.forEach(function (value, index) {
	            if (!func.call(scope, value, index)) {
	                return;
	            }
	            result = value;
	            return $BREAK;
	        });
	        return result;
	    };
	    Collection.prototype.reverse = function () {
	        return Collection.create(this.copyChildren().reverse());
	    };
	    Collection.prototype.removeChild = function (arg) {
	        return Collection.create(this.removeChildHelper(arg));
	    };
	    Collection.prototype.sort = function (func, isSortSelf) {
	        if (isSortSelf === void 0) { isSortSelf = false; }
	        if (isSortSelf) {
	            this.children.sort(func);
	            return this;
	        }
	        return Collection.create(this.copyChildren().sort(func));
	    };
	    Collection.prototype.map = function (func) {
	        var resultArr = [];
	        this.forEach(function (e, index) {
	            var result = func(e, index);
	            if (result !== $REMOVE) {
	                resultArr.push(result);
	            }
	        });
	        return Collection.create(resultArr);
	    };
	    Collection.prototype.removeRepeatItems = function () {
	        var noRepeatList = Collection.create();
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                return;
	            }
	            noRepeatList.addChild(item);
	        });
	        return noRepeatList;
	    };
	    Collection.prototype.hasRepeatItems = function () {
	        var noRepeatList = Collection.create(), hasRepeat = false;
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                hasRepeat = true;
	                return $BREAK;
	            }
	            noRepeatList.addChild(item);
	        });
	        return hasRepeat;
	    };
	    return Collection;
	}(List));

	var JudgeUtils$1 = (function (_super) {
	    __extends(JudgeUtils$$1, _super);
	    function JudgeUtils$$1() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    JudgeUtils$$1.isCollection = function (list) {
	        return list instanceof Collection;
	    };
	    return JudgeUtils$$1;
	}(JudgeUtils));
	var isString = JudgeUtils$1.isString;
	var isUndefined = function (v) { return v === void 0; };
	var isNotUndefined = function (v) { return v !== void 0; };

	var deleteVal = function (key, obj) { return obj[key] = void 0; };

	var isValidMapValue = function (val) {
	    return isNotUndefined(val);
	};
	var isNotValidMapValue = function (val) {
	    return isUndefined(val);
	};
	var createMap = function () { return Object.create(null); };

	var ComponentData = (function () {
	    function ComponentData() {
	    }
	    ComponentData.addComponentHandleMap = {};
	    ComponentData.disposeHandleMap = {};
	    ComponentData.initHandleMap = {};
	    return ComponentData;
	}());

	var ClassUtils = (function () {
	    function ClassUtils() {
	    }
	    ClassUtils.getClassNameByInstance = function (obj) {
	        return obj.constructor["className"];
	    };
	    ClassUtils.getClassNameByClass = function (_class) {
	        return _class["className"];
	    };
	    ClassUtils.addClass = function (className, _class) {
	        this._classMap[className] = _class;
	    };
	    ClassUtils.addClassNameAttributeToClass = function (className, _class) {
	        _class["className"] = className;
	    };
	    ClassUtils.getClass = function (className) {
	        return this._classMap[className];
	    };
	    ClassUtils._classMap = {};
	    __decorate([
	        ensure(function (className) {
	            it("should exist class name", function () {
	                wdet_1(className).exist;
	                wdet_1(className !== "").true;
	            });
	        })
	    ], ClassUtils, "getClassNameByInstance", null);
	    __decorate([
	        ensure(function (className) {
	            it("should exist class name", function () {
	                wdet_1(className).exist;
	                wdet_1(className !== "").true;
	            });
	        })
	    ], ClassUtils, "getClassNameByClass", null);
	    return ClassUtils;
	}());

	var _generateTypeID = function () {
	    var result = _typeID;
	    _typeID += 1;
	    return String(result);
	};
	var getTypeIDFromClass = function (_class) {
	    return _table[ClassUtils.getClassNameByClass(_class)];
	};
	var getTypeIDFromComponent = function (component) {
	    return _table[ClassUtils.getClassNameByInstance(component)];
	};
	var _addTypeID = function (componentClassNameArr, table) {
	    var id = _generateTypeID();
	    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
	        var className = componentClassNameArr_1[_i];
	        table[className] = id;
	    }
	};
	var _typeID = 1;
	var _table = {};
	_addTypeID(["ThreeDTransform"], _table);
	_addTypeID(["BoxGeometry"], _table);
	_addTypeID(["CustomGeometry"], _table);
	_addTypeID(["BasicMaterial"], _table);
	_addTypeID(["LightMaterial"], _table);
	_addTypeID(["MeshRenderer"], _table);
	_addTypeID(["Tag"], _table);
	_addTypeID(["CameraController"], _table);
	_addTypeID(["AmbientLight"], _table);
	_addTypeID(["DirectionLight"], _table);
	_addTypeID(["PointLight"], _table);

	var deleteVal$1 = function (key, arr) { return arr[key] = void 0; };
	var isNotValidVal = function (val) { return isUndefined(val); };
	var isValidVal = function (val) { return isNotUndefined(val); };
	var deleteBySwap$1 = function (index, lastIndex, array) {
	    if (lastIndex === -1) {
	        return null;
	    }
	    array[index] = array[lastIndex];
	    array.pop();
	};
	var hasDuplicateItems = function (arr) {
	    var noRepeatArr = [], hasRepeat = false;
	    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
	        var item = arr_1[_i];
	        if (!item) {
	            continue;
	        }
	        if (_contain(noRepeatArr, item)) {
	            hasRepeat = true;
	            break;
	        }
	        noRepeatArr.push(item);
	    }
	    return hasRepeat;
	};
	var _contain = function (arr, item) {
	    var c = null;
	    for (var i = 0, len = arr.length; i < len; i++) {
	        c = arr[i];
	        if (item === c) {
	            return true;
	        }
	    }
	    return false;
	};
	var removeDuplicateItems = function (arr) {
	    var resultArr = [];
	    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
	        var ele = arr_2[_i];
	        if (_contain(resultArr, ele)) {
	            continue;
	        }
	        resultArr.push(ele);
	    }
	    
	    return resultArr;
	};
	var removeItem = function (arr, item) {
	    return filter(arr, function (ele) {
	        return ele !== item;
	    });
	};
	var filter = function (arr, func) {
	    var result = [];
	    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
	        var ele = arr_3[_i];
	        if (func(ele)) {
	            result.push(ele);
	        }
	    }
	    return result;
	};
	var forEach = function (arr, func) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	        func(arr[i], i);
	    }
	};

	var _addHandle = function (_class, handleMap, handle) {
	    var typeID = getTypeIDFromClass(_class);
	    handleMap[typeID] = handle;
	};
	var addAddComponentHandle$1 = function (_class, handle) {
	    _addHandle(_class, ComponentData.addComponentHandleMap, handle);
	};
	var addDisposeHandle$1 = function (_class, handle) {
	    _addHandle(_class, ComponentData.disposeHandleMap, handle);
	};
	var addInitHandle = function (_class, handle) {
	    _addHandle(_class, ComponentData.initHandleMap, handle);
	};
	var execHandle = function (component, handleMapName, args) {
	    var handle = ComponentData[handleMapName][getTypeIDFromComponent(component)];
	    if (_isHandleNotExist(handle)) {
	        return;
	    }
	    if (!!args) {
	        handle.apply(null, args);
	    }
	    else {
	        handle(component);
	    }
	};
	var execInitHandle = function (typeID, index, state) {
	    var handle = ComponentData.initHandleMap[typeID];
	    if (_isHandleNotExist(handle)) {
	        return;
	    }
	    handle(index, state);
	};
	var _isHandleNotExist = function (handle) { return isNotValidMapValue(handle); };
	var checkComponentShouldAlive = function (component, data, isAlive) {
	    it("component should alive", function () {
	        wdet_1(isAlive(component, data)).true;
	    });
	};
	var addComponentToGameObjectMap = requireCheckFunc(function (gameObjectMap, index, gameObject) {
	    it("component should not exist in gameObject", function () {
	        wdet_1(gameObjectMap[index]).not.exist;
	    });
	}, function (gameObjectMap, index, gameObject) {
	    gameObjectMap[index] = gameObject;
	});
	var getComponentGameObject = function (gameObjectMap, index) {
	    return gameObjectMap[index];
	};
	var generateComponentIndex = function (ComponentData$$1) {
	    return ComponentData$$1.index++;
	};
	var deleteComponent = requireCheckFunc(function (index, componentMap) {
	    it("index should >= 0", function () {
	        wdet_1(index).gte(0);
	    });
	}, function (index, componentMap) {
	    markComponentIndexRemoved(componentMap[index]);
	    deleteVal(index, componentMap);
	});
	var deleteComponentBySwapArray = requireCheckFunc(function (sourceIndex, targetIndex, componentMap) {
	    it("targetIndex should >= 0", function () {
	        wdet_1(targetIndex).gte(0);
	    });
	}, function (sourceIndex, targetIndex, componentMap) {
	    componentMap[targetIndex].index = sourceIndex;
	    markComponentIndexRemoved(componentMap[sourceIndex]);
	    deleteBySwap$1(sourceIndex, targetIndex, componentMap);
	});
	var markComponentIndexRemoved = function (component) {
	    component.index = -1;
	};
	var isComponentIndexNotRemoved = function (component) {
	    return component.index !== -1;
	};

	var checkIndexShouldEqualCount = function (ComponentData) {
	    it("ComponentData.index should === ComponentData.count", function () {
	        wdet_1(ComponentData.index).equal(ComponentData.count);
	    });
	    it("ComponentData.index should >= 0", function () {
	        wdet_1(ComponentData.index).gte(0);
	    });
	    it("ComponentData.count should >= 0", function () {
	        wdet_1(ComponentData.count).gte(0);
	    });
	};

	function registerClass(className) {
	    return function (_class) {
	        ClassUtils.addClassNameAttributeToClass(className, _class);
	        ClassUtils.addClass(className, _class);
	    };
	}

	var Component = (function () {
	    function Component() {
	        this.index = null;
	    }
	    Component = __decorate([
	        registerClass("Component")
	    ], Component);
	    return Component;
	}());

	var CameraControllerData = (function () {
	    function CameraControllerData() {
	    }
	    CameraControllerData.index = null;
	    CameraControllerData.count = null;
	    CameraControllerData.dirtyIndexArray = null;
	    CameraControllerData.gameObjectMap = null;
	    CameraControllerData.worldToCameraMatrixCacheMap = null;
	    return CameraControllerData;
	}());

	var CameraController = (function (_super) {
	    __extends(CameraController, _super);
	    function CameraController() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    CameraController = __decorate([
	        registerClass("CameraController")
	    ], CameraController);
	    return CameraController;
	}(Component));
	var createCameraController = function () {
	    return create(CameraControllerData);
	};
	var getCameraControllerGameObject = function (component) {
	    return getGameObject(component.index, CameraControllerData);
	};

	var cacheFunc = function (hasCacheFunc, getCacheFunc, setCacheFunc, bodyFunc) {
	    return function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (hasCacheFunc.apply(null, args)) {
	            return getCacheFunc.apply(null, args);
	        }
	        var result = bodyFunc.apply(null, args);
	        args.push(result);
	        setCacheFunc.apply(null, args);
	        return result;
	    };
	};

	var PerspectiveCameraData = (function () {
	    function PerspectiveCameraData() {
	    }
	    PerspectiveCameraData.fovyMap = null;
	    PerspectiveCameraData.aspectMap = null;
	    return PerspectiveCameraData;
	}());

	var CameraData = (function () {
	    function CameraData() {
	    }
	    CameraData.nearMap = null;
	    CameraData.farMap = null;
	    CameraData.worldToCameraMatrixMap = null;
	    CameraData.pMatrixMap = null;
	    return CameraData;
	}());

	var addAddComponentHandle$$1 = function (_class) {
	    addAddComponentHandle$1(_class, addComponent);
	};
	var addDisposeHandle$$1 = function (_class) {
	    addDisposeHandle$1(_class, disposeComponent);
	};
	var create = requireCheckFunc(function (CameraControllerData$$1) {
	    checkIndexShouldEqualCount(CameraControllerData$$1);
	}, function (CameraControllerData$$1) {
	    var controller = new CameraController(), index = generateComponentIndex(CameraControllerData$$1);
	    controller.index = index;
	    CameraControllerData$$1.count += 1;
	    addToDirtyList(index, CameraControllerData$$1);
	    return controller;
	});
	var addToDirtyList = ensureFunc(function (index, CameraControllerData$$1) {
	}, function (index, CameraControllerData$$1) {
	    CameraControllerData$$1.dirtyIndexArray.push(index);
	});
	var init$1 = function (PerspectiveCameraData$$1, CameraData$$1, CameraControllerData$$1, state) {
	    _forEachDirtyList(CameraControllerData$$1.dirtyIndexArray, function (dirtyIndex) {
	        initCameraController(state, dirtyIndex, PerspectiveCameraData$$1, CameraData$$1);
	    });
	    _clearDirtyList(CameraControllerData$$1);
	    return state;
	};
	var initCameraController = function (state, index, PerspectiveCameraData$$1, CameraData$$1) {
	    init$$1(state, index, PerspectiveCameraData$$1, CameraData$$1);
	};
	var _forEachDirtyList = function (dirtyIndexArray, func) {
	    var arr = removeDuplicateItems(dirtyIndexArray);
	    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
	        var dirtyIndex = arr_1[_i];
	        func(dirtyIndex);
	    }
	};
	var _clearDirtyList = function (CameraControllerData$$1) {
	    CameraControllerData$$1.dirtyIndexArray = [];
	};
	var update = function (PerspectiveCameraData$$1, CameraData$$1, CameraControllerData$$1) {
	    _forEachDirtyList(CameraControllerData$$1.dirtyIndexArray, function (dirtyIndex) {
	        updateProjectionMatrix$$1(dirtyIndex, PerspectiveCameraData$$1, CameraData$$1);
	    });
	    _clearDirtyList(CameraControllerData$$1);
	    _clearCache(CameraControllerData$$1);
	};
	var addComponent = function (component, gameObject) {
	    addComponentToGameObjectMap(CameraControllerData.gameObjectMap, component.index, gameObject);
	};
	var disposeComponent = function (component) {
	    var index = component.index;
	    deleteVal(index, CameraControllerData.gameObjectMap);
	    deleteVal(index, CameraControllerData.worldToCameraMatrixCacheMap);
	    CameraControllerData.count -= 1;
	    CameraControllerData.dirtyIndexArray = removeItem(CameraControllerData.dirtyIndexArray, index);
	    dispose$$1(index, PerspectiveCameraData, CameraData);
	};
	var getGameObject = function (index, CameraControllerData$$1) {
	    return getComponentGameObject(CameraControllerData$$1.gameObjectMap, index);
	};
	var getWorldToCameraMatrix$1 = cacheFunc(function (index, ThreeDTransformData, GameObjectData, CameraControllerData$$1, CameraData$$1) {
	    return isValidMapValue(CameraControllerData$$1.worldToCameraMatrixCacheMap[index]);
	}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData$$1, CameraData$$1) {
	    return CameraControllerData$$1.worldToCameraMatrixCacheMap[index];
	}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData$$1, CameraData$$1, worldToCamraMatrix) {
	    CameraControllerData$$1.worldToCameraMatrixCacheMap[index] = worldToCamraMatrix;
	}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData$$1, CameraData$$1) {
	    return getWorldToCameraMatrix$$1(index, ThreeDTransformData, GameObjectData, CameraControllerData$$1, CameraData$$1);
	});
	var getPMatrix$1 = function (index, CameraData$$1) {
	    return getPMatrix$$1(index, CameraData$$1);
	};
	var _clearCache = function (CameraControllerData$$1) {
	    CameraControllerData$$1.worldToCameraMatrixCacheMap = {};
	};
	var initData$2 = function (CameraControllerData$$1, PerspectiveCameraData$$1, CameraData$$1) {
	    CameraControllerData$$1.index = 0;
	    CameraControllerData$$1.count = 0;
	    CameraControllerData$$1.gameObjectMap = createMap();
	    CameraControllerData$$1.dirtyIndexArray = [];
	    CameraControllerData$$1.worldToCameraMatrixCacheMap = createMap();
	    initData$$1(PerspectiveCameraData$$1, CameraData$$1);
	};

	var Vector2 = (function () {
	    function Vector2() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.values = new Float32Array(2);
	        if (args.length > 0) {
	            this.values[0] = args[0];
	            this.values[1] = args[1];
	        }
	    }
	    Vector2_1 = Vector2;
	    Vector2.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var m = null;
	        if (args.length === 0) {
	            m = new this();
	        }
	        else {
	            m = new this(args[0], args[1]);
	        }
	        return m;
	    };
	    Object.defineProperty(Vector2.prototype, "x", {
	        get: function () {
	            return this.values[0];
	        },
	        set: function (x) {
	            this.values[0] = x;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector2.prototype, "y", {
	        get: function () {
	            return this.values[1];
	        },
	        set: function (y) {
	            this.values[1] = y;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector2.prototype.set = function (x, y) {
	        this.x = x;
	        this.y = y;
	    };
	    Vector2.prototype.add = function (v) {
	        this.values[0] = this.values[0] + v.values[0];
	        this.values[1] = this.values[1] + v.values[1];
	        return this;
	    };
	    Vector2.prototype.mul = function (v) {
	        this.values[0] = this.values[0] * v.values[0];
	        this.values[1] = this.values[1] * v.values[1];
	        return this;
	    };
	    Vector2.prototype.isEqual = function (v) {
	        return this.x === v.x && this.y === v.y;
	    };
	    Vector2.prototype.clone = function () {
	        return Vector2_1.create(this.x, this.y);
	    };
	    Vector2 = Vector2_1 = __decorate([
	        registerClass("Vector2")
	    ], Vector2);
	    return Vector2;
	    var Vector2_1;
	}());

	var DEG_TO_RAD = Math.PI / 180;
	var RAD_TO_DEG = 180 / Math.PI;

	var Matrix3 = (function () {
	    function Matrix3() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.values = null;
	        if (args.length === 1) {
	            this.values = args[0];
	        }
	        else {
	            this.values = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
	        }
	    }
	    Matrix3_1 = Matrix3;
	    Matrix3.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var m = null;
	        if (args.length === 0) {
	            m = new this();
	        }
	        else {
	            m = new this(args[0]);
	        }
	        return m;
	    };
	    Object.defineProperty(Matrix3.prototype, "a", {
	        get: function () {
	            return this.values[0];
	        },
	        set: function (a) {
	            this.values[0] = a;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix3.prototype, "c", {
	        get: function () {
	            return this.values[1];
	        },
	        set: function (c) {
	            this.values[1] = c;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix3.prototype, "b", {
	        get: function () {
	            return this.values[3];
	        },
	        set: function (b) {
	            this.values[3] = b;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix3.prototype, "d", {
	        get: function () {
	            return this.values[4];
	        },
	        set: function (d) {
	            this.values[4] = d;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix3.prototype, "tx", {
	        get: function () {
	            return this.values[6];
	        },
	        set: function (tx) {
	            this.values[6] = tx;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Matrix3.prototype, "ty", {
	        get: function () {
	            return this.values[7];
	        },
	        set: function (ty) {
	            this.values[7] = ty;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Matrix3.prototype.setIdentity = function () {
	        var e = this.values;
	        e[0] = 1;
	        e[3] = 0;
	        e[6] = 0;
	        e[1] = 0;
	        e[4] = 1;
	        e[7] = 0;
	        e[2] = 0;
	        e[5] = 0;
	        e[8] = 1;
	        return this;
	    };
	    Matrix3.prototype.invert = function () {
	        var a1 = this.values[0];
	        var b1 = this.values[1];
	        var c1 = this.values[3];
	        var d1 = this.values[4];
	        var tx1 = this.values[6];
	        var ty1 = this.values[7];
	        var n = a1 * d1 - b1 * c1;
	        this.values[0] = d1 / n;
	        this.values[1] = -b1 / n;
	        this.values[3] = -c1 / n;
	        this.values[4] = a1 / n;
	        this.values[6] = (c1 * ty1 - d1 * tx1) / n;
	        this.values[7] = -(a1 * ty1 - b1 * tx1) / n;
	        return this;
	    };
	    Matrix3.prototype.multiplyScalar = function (s) {
	        var te = this.values;
	        te[0] *= s;
	        te[3] *= s;
	        te[6] *= s;
	        te[1] *= s;
	        te[4] *= s;
	        te[7] *= s;
	        te[2] *= s;
	        te[5] *= s;
	        te[8] *= s;
	        return this;
	    };
	    Matrix3.prototype.multiplyVector2 = function (vector) {
	        var x = vector.x, y = vector.y, result = Vector2.create(), e = this.values;
	        result.x = e[0] * x + e[3] * y;
	        result.y = e[1] * x + e[4] * y;
	        return result;
	    };
	    Matrix3.prototype.multiplyPoint = function (vector) {
	        var x = vector.x, y = vector.y, result = Vector2.create(), e = this.values;
	        result.x = e[0] * x + e[3] * y + this.tx;
	        result.y = e[1] * x + e[4] * y + this.ty;
	        return result;
	    };
	    Matrix3.prototype.multiply = function (matrix) {
	        var m11 = this.a * matrix.a + this.c * matrix.b;
	        var m12 = this.b * matrix.a + this.d * matrix.b;
	        var m21 = this.a * matrix.c + this.c * matrix.d;
	        var m22 = this.b * matrix.c + this.d * matrix.d;
	        var dx = this.a * matrix.tx + this.c * matrix.ty + this.tx;
	        var dy = this.b * matrix.tx + this.d * matrix.ty + this.ty;
	        this.a = m11;
	        this.b = m12;
	        this.c = m21;
	        this.d = m22;
	        this.tx = dx;
	        this.ty = dy;
	        return this;
	    };
	    Matrix3.prototype.transpose = function () {
	        var tmp, m = this.values;
	        tmp = m[1];
	        m[1] = m[3];
	        m[3] = tmp;
	        tmp = m[2];
	        m[2] = m[6];
	        m[6] = tmp;
	        tmp = m[5];
	        m[5] = m[7];
	        m[7] = tmp;
	        return this;
	    };
	    Matrix3.prototype.clone = function () {
	        return Matrix3_1.create().set(this);
	    };
	    Matrix3.prototype.cloneToArray = function (array, offset) {
	        if (offset === void 0) { offset = 0; }
	        var values = this.values;
	        for (var index = 0; index < 9; index++) {
	            array[offset + index] = values[index];
	        }
	        return this;
	    };
	    Matrix3.prototype.set = function (matrix) {
	        var te = this.values, values = matrix.values;
	        te[0] = values[0];
	        te[3] = values[3];
	        te[6] = values[6];
	        te[1] = values[1];
	        te[4] = values[4];
	        te[7] = values[7];
	        te[2] = values[2];
	        te[5] = values[5];
	        te[8] = values[8];
	        return this;
	    };
	    Matrix3.prototype.setTS = function (t, s) {
	        this.setPosition(t.x, t.y);
	        this.setScale(s.x, s.y);
	    };
	    Matrix3.prototype.rotate = function (angle) {
	        var rad = angle * DEG_TO_RAD;
	        var c = Math.cos(rad);
	        var s = Math.sin(rad);
	        var m11 = this.a * c + this.c * s;
	        var m12 = this.b * c + this.d * s;
	        var m21 = this.a * -s + this.c * c;
	        var m22 = this.b * -s + this.d * c;
	        this.a = m11;
	        this.b = m12;
	        this.c = m21;
	        this.d = m22;
	        return this;
	    };
	    Matrix3.prototype.setRotation = function (angle) {
	        var rad = angle * DEG_TO_RAD;
	        var cos_a = Math.cos(rad);
	        var sin_a = Math.sin(rad);
	        var values = this.values;
	        values[0] = cos_a;
	        values[1] = -sin_a;
	        values[3] = sin_a;
	        values[4] = cos_a;
	        return this;
	    };
	    Matrix3.prototype.translate = function (x, y) {
	        this.tx += this.a * x + this.c * y;
	        this.ty += this.b * x + this.d * y;
	    };
	    Matrix3.prototype.setPosition = function (x, y) {
	        this.tx = x;
	        this.ty = y;
	    };
	    Matrix3.prototype.scale = function (x, y) {
	        this.a *= x;
	        this.b *= x;
	        this.c *= y;
	        this.d *= y;
	        return this;
	    };
	    Matrix3.prototype.setScale = function (x, y) {
	        var values = this.values;
	        values[0] = x;
	        values[4] = y;
	        return this;
	    };
	    Matrix3.prototype.getTranslation = function () {
	        return Vector2.create(this.tx, this.ty);
	    };
	    Matrix3.prototype.getScale = function () {
	        return Vector2.create(Math.sqrt(this.a * this.a + this.b * this.b), Math.sqrt(this.c * this.c + this.d * this.d));
	    };
	    Matrix3.prototype.getRotation = function () {
	        return this._getSkewX();
	    };
	    Matrix3.prototype.getSkew = function () {
	        return Vector2.create(this._getSkewX(), this._getSkewY());
	    };
	    Matrix3.prototype._getDeltaTransformPoint = function (matrix, point) {
	        return {
	            x: point.x * matrix.a + point.y * matrix.c + 0,
	            y: point.x * matrix.b + point.y * matrix.d + 0
	        };
	    };
	    Matrix3.prototype._getSkewX = function () {
	        var px = this._getDeltaTransformPoint(this, { x: 0, y: 1 });
	        return ((180 / Math.PI) * Math.atan2(px.y, px.x) - 90);
	    };
	    Matrix3.prototype._getSkewY = function () {
	        var py = this._getDeltaTransformPoint(this, { x: 1, y: 0 });
	        return ((180 / Math.PI) * Math.atan2(py.y, py.x));
	    };
	    Matrix3 = Matrix3_1 = __decorate([
	        registerClass("Matrix3")
	    ], Matrix3);
	    return Matrix3;
	    var Matrix3_1;
	}());

	var Vector4 = (function () {
	    function Vector4() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.values = new Float32Array(4);
	        if (args.length > 0) {
	            this.values[0] = args[0];
	            this.values[1] = args[1];
	            this.values[2] = args[2];
	            this.values[3] = args[3];
	        }
	    }
	    Vector4_1 = Vector4;
	    Vector4.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var m = null;
	        if (args.length === 0) {
	            m = new this();
	        }
	        else {
	            m = new this(args[0], args[1], args[2], args[3]);
	        }
	        return m;
	    };
	    Object.defineProperty(Vector4.prototype, "x", {
	        get: function () {
	            return this.values[0];
	        },
	        set: function (x) {
	            this.values[0] = x;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "y", {
	        get: function () {
	            return this.values[1];
	        },
	        set: function (y) {
	            this.values[1] = y;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "z", {
	        get: function () {
	            return this.values[2];
	        },
	        set: function (z) {
	            this.values[2] = z;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector4.prototype, "w", {
	        get: function () {
	            return this.values[3];
	        },
	        set: function (w) {
	            this.values[3] = w;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector4.prototype.normalize = function () {
	        var v = this.values;
	        var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
	        if (d === 0) {
	            return Vector4_1.create(0, 0, 0, 0);
	        }
	        v[0] = v[0] / d;
	        v[1] = v[1] / d;
	        v[2] = v[2] / d;
	        v[3] = v[3] / d;
	        return this;
	    };
	    Vector4.prototype.isEqual = function (v) {
	        return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
	    };
	    Vector4.prototype.clone = function () {
	        return this.copyHelper(Vector4_1.create());
	    };
	    Vector4.prototype.toVector3 = function () {
	        return Vector3.create(this.values[0], this.values[1], this.values[2]);
	    };
	    Vector4.prototype.lengthManhattan = function () {
	        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	    };
	    Vector4.prototype.multiplyScalar = function (scalar) {
	        this.x *= scalar;
	        this.y *= scalar;
	        this.z *= scalar;
	        this.w *= scalar;
	        return this;
	    };
	    Vector4.prototype.dot = function (v) {
	        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
	    };
	    Vector4.prototype.set = function (x, y, z, w) {
	        this.x = x;
	        this.y = y;
	        this.z = z;
	        this.w = w;
	    };
	    Vector4.prototype.copyHelper = function (vector4) {
	        var result = vector4, i = 0, len = this.values.length;
	        for (i = 0; i < len; i++) {
	            result.values[i] = this.values[i];
	        }
	        return result;
	    };
	    Vector4 = Vector4_1 = __decorate([
	        registerClass("Vector4")
	    ], Vector4);
	    return Vector4;
	    var Vector4_1;
	}());

	var Vector3 = (function () {
	    function Vector3() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.values = null;
	        this.values = new Float32Array(3);
	        if (args.length > 0) {
	            this.values[0] = args[0];
	            this.values[1] = args[1];
	            this.values[2] = args[2];
	        }
	    }
	    Vector3_1 = Vector3;
	    Vector3.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var m = null;
	        if (args.length === 0) {
	            m = new this();
	        }
	        else {
	            m = new this(args[0], args[1], args[2]);
	        }
	        return m;
	    };
	    Object.defineProperty(Vector3.prototype, "x", {
	        get: function () {
	            return this.values[0];
	        },
	        set: function (x) {
	            this.values[0] = x;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3.prototype, "y", {
	        get: function () {
	            return this.values[1];
	        },
	        set: function (y) {
	            this.values[1] = y;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Vector3.prototype, "z", {
	        get: function () {
	            return this.values[2];
	        },
	        set: function (z) {
	            this.values[2] = z;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Vector3.prototype.normalize = function () {
	        var v = this.values;
	        var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	        if (d === 0) {
	            v[0] = 0;
	            v[1] = 0;
	            v[2] = 0;
	            return this;
	        }
	        v[0] = v[0] / d;
	        v[1] = v[1] / d;
	        v[2] = v[2] / d;
	        if (v[0] === -0) {
	            v[0] = 0;
	        }
	        if (v[1] === -0) {
	            v[1] = 0;
	        }
	        if (v[2] === -0) {
	            v[2] = 0;
	        }
	        return this;
	    };
	    Vector3.prototype.isZero = function () {
	        var v = this.values;
	        return v[0] === 0 && v[1] === 0 && v[2] === 0;
	    };
	    Vector3.prototype.scale = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var v = this.values;
	        if (args.length === 1) {
	            var scalar = args[0];
	            v[0] *= scalar;
	            v[1] *= scalar;
	            v[2] *= scalar;
	        }
	        else if (args.length === 3) {
	            var x = args[0], y = args[1], z = args[2];
	            v[0] *= x;
	            v[1] *= y;
	            v[2] *= z;
	        }
	        return this;
	    };
	    Vector3.prototype.set = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 3) {
	            this.x = args[0];
	            this.y = args[1];
	            this.z = args[2];
	        }
	        else {
	            var v = args[0];
	            this.x = v.x;
	            this.y = v.y;
	            this.z = v.z;
	        }
	        return this;
	    };
	    Vector3.prototype.sub = function (v) {
	        this.values[0] = this.values[0] - v.values[0];
	        this.values[1] = this.values[1] - v.values[1];
	        this.values[2] = this.values[2] - v.values[2];
	        return this;
	    };
	    Vector3.prototype.sub2 = function (v1, v2) {
	        this.values[0] = v1.values[0] - v2.values[0];
	        this.values[1] = v1.values[1] - v2.values[1];
	        this.values[2] = v1.values[2] - v2.values[2];
	        return this;
	    };
	    Vector3.prototype.add = function (v) {
	        this.values[0] = this.values[0] + v.values[0];
	        this.values[1] = this.values[1] + v.values[1];
	        this.values[2] = this.values[2] + v.values[2];
	        return this;
	    };
	    Vector3.prototype.add2 = function (v1, v2) {
	        this.values[0] = v1.values[0] + v2.values[0];
	        this.values[1] = v1.values[1] + v2.values[1];
	        this.values[2] = v1.values[2] + v2.values[2];
	        return this;
	    };
	    Vector3.prototype.mul = function (v) {
	        this.values[0] = this.values[0] * v.values[0];
	        this.values[1] = this.values[1] * v.values[1];
	        this.values[2] = this.values[2] * v.values[2];
	        return this;
	    };
	    Vector3.prototype.mul2 = function (v1, v2) {
	        this.values[0] = v1.values[0] * v2.values[0];
	        this.values[1] = v1.values[1] * v2.values[1];
	        this.values[2] = v1.values[2] * v2.values[2];
	        return this;
	    };
	    Vector3.prototype.reverse = function () {
	        this.values[0] = -this.values[0];
	        this.values[1] = -this.values[1];
	        this.values[2] = -this.values[2];
	        return this;
	    };
	    Vector3.prototype.clone = function () {
	        var result = Vector3_1.create(), i = 0, len = this.values.length;
	        for (i = 0; i < len; i++) {
	            result.values[i] = this.values[i];
	        }
	        return result;
	    };
	    Vector3.prototype.toVector4 = function () {
	        return Vector4.create(this.values[0], this.values[1], this.values[2], 1.0);
	    };
	    Vector3.prototype.length = function () {
	        var v = this.values;
	        return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
	    };
	    Vector3.prototype.cross = function (lhs, rhs) {
	        var a, b, r, ax, ay, az, bx, by, bz;
	        a = lhs.values;
	        b = rhs.values;
	        r = this.values;
	        ax = a[0];
	        ay = a[1];
	        az = a[2];
	        bx = b[0];
	        by = b[1];
	        bz = b[2];
	        r[0] = ay * bz - by * az;
	        r[1] = az * bx - bz * ax;
	        r[2] = ax * by - bx * ay;
	        return this;
	    };
	    Vector3.prototype.lerp = function (lhs, rhs, alpha) {
	        var a = lhs.values, b = rhs.values, r = this.values;
	        r[0] = a[0] + alpha * (b[0] - a[0]);
	        r[1] = a[1] + alpha * (b[1] - a[1]);
	        r[2] = a[2] + alpha * (b[2] - a[2]);
	        return this;
	    };
	    Vector3.prototype.dot = function (rhs) {
	        var a = this.values, b = rhs.values;
	        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
	    };
	    Vector3.prototype.calAngleCos = function (v1) {
	        var l = this.length() * v1.length();
	        if (l === 0) {
	            return NaN;
	        }
	        return this.dot(v1) / l;
	    };
	    Vector3.prototype.min = function (v) {
	        if (this.x > v.x) {
	            this.x = v.x;
	        }
	        if (this.y > v.y) {
	            this.y = v.y;
	        }
	        if (this.z > v.z) {
	            this.z = v.z;
	        }
	        return this;
	    };
	    Vector3.prototype.max = function (v) {
	        if (this.x < v.x) {
	            this.x = v.x;
	        }
	        if (this.y < v.y) {
	            this.y = v.y;
	        }
	        if (this.z < v.z) {
	            this.z = v.z;
	        }
	        return this;
	    };
	    Vector3.prototype.isEqual = function (v) {
	        return this.x === v.x && this.y === v.y && this.z === v.z;
	    };
	    Vector3.prototype.toArray = function () {
	        return [this.x, this.y, this.z];
	    };
	    Vector3.prototype.applyMatrix3 = function (m) {
	        var x = this.x, y = this.y, z = this.z, e = m.values;
	        this.x = e[0] * x + e[3] * y + e[6] * z;
	        this.y = e[1] * x + e[4] * y + e[7] * z;
	        this.z = e[2] * x + e[5] * y + e[8] * z;
	        return this;
	    };
	    Vector3.prototype.applyMatrix4 = function (m) {
	        var x = this.x, y = this.y, z = this.z, e = m.values;
	        this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
	        this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
	        this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
	        return this;
	    };
	    Vector3.prototype.distanceTo = function (v) {
	        return Math.sqrt(this.distanceToSquared(v));
	    };
	    Vector3.prototype.distanceToSquared = function (v) {
	        var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
	        return Math.pow(dx, 2) + Math.pow(dy, 2) + Math.pow(dz, 2);
	    };
	    Vector3.up = null;
	    Vector3.forward = null;
	    Vector3.right = null;
	    Vector3 = Vector3_1 = __decorate([
	        registerClass("Vector3")
	    ], Vector3);
	    return Vector3;
	    var Vector3_1;
	}());
	Vector3.up = Vector3.create(0, 1, 0);
	Vector3.forward = Vector3.create(0, 0, 1);
	Vector3.right = Vector3.create(1, 0, 0);

	var Quaternion = (function () {
	    function Quaternion(x, y, z, w) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (z === void 0) { z = 0; }
	        if (w === void 0) { w = 1; }
	        this.x = null;
	        this.y = null;
	        this.z = null;
	        this.w = null;
	        this.x = x;
	        this.y = y;
	        this.z = z;
	        this.w = w;
	    }
	    Quaternion_1 = Quaternion;
	    Quaternion.create = function (x, y, z, w) {
	        var obj = new this(x, y, z, w);
	        return obj;
	    };
	    Quaternion.prototype.setFromEulerAngles = function (eulerAngles) {
	        var sx, cx, sy, cy, sz, cz, halfToRad, ex = eulerAngles.x, ey = eulerAngles.y, ez = eulerAngles.z;
	        halfToRad = 0.5 * DEG_TO_RAD;
	        ex *= halfToRad;
	        ey *= halfToRad;
	        ez *= halfToRad;
	        sx = Math.sin(ex);
	        cx = Math.cos(ex);
	        sy = Math.sin(ey);
	        cy = Math.cos(ey);
	        sz = Math.sin(ez);
	        cz = Math.cos(ez);
	        this.x = sx * cy * cz - cx * sy * sz;
	        this.y = cx * sy * cz + sx * cy * sz;
	        this.z = cx * cy * sz - sx * sy * cz;
	        this.w = cx * cy * cz + sx * sy * sz;
	        return this;
	    };
	    Quaternion.prototype.multiply = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w, rhs1, rhs2, result = this;
	        if (args.length === 1) {
	            rhs1 = this;
	            rhs2 = args[0];
	        }
	        else if (args.length === 2) {
	            rhs1 = args[0];
	            rhs2 = args[1];
	        }
	        q1x = rhs1.x;
	        q1y = rhs1.y;
	        q1z = rhs1.z;
	        q1w = rhs1.w;
	        q2x = rhs2.x;
	        q2y = rhs2.y;
	        q2z = rhs2.z;
	        q2w = rhs2.w;
	        result.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
	        result.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
	        result.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
	        result.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
	        return result;
	    };
	    Quaternion.prototype.setFromMatrix = function (matrix) {
	        var m00, m01, m02, m10, m11, m12, m20, m21, m22, tr, s, rs, lx, ly, lz, m;
	        m = matrix.values;
	        m00 = m[0];
	        m01 = m[1];
	        m02 = m[2];
	        m10 = m[4];
	        m11 = m[5];
	        m12 = m[6];
	        m20 = m[8];
	        m21 = m[9];
	        m22 = m[10];
	        lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
	        ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
	        lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);
	        m00 *= lx;
	        m01 *= lx;
	        m02 *= lx;
	        m10 *= ly;
	        m11 *= ly;
	        m12 *= ly;
	        m20 *= lz;
	        m21 *= lz;
	        m22 *= lz;
	        tr = m00 + m11 + m22;
	        if (tr >= 0) {
	            s = Math.sqrt(tr + 1);
	            this.w = s * 0.5;
	            s = 0.5 / s;
	            this.x = (m12 - m21) * s;
	            this.y = (m20 - m02) * s;
	            this.z = (m01 - m10) * s;
	        }
	        else {
	            if (m00 > m11) {
	                if (m00 > m22) {
	                    rs = (m00 - (m11 + m22)) + 1;
	                    rs = Math.sqrt(rs);
	                    this.x = rs * 0.5;
	                    rs = 0.5 / rs;
	                    this.w = (m12 - m21) * rs;
	                    this.y = (m01 + m10) * rs;
	                    this.z = (m02 + m20) * rs;
	                }
	                else {
	                    rs = (m22 - (m00 + m11)) + 1;
	                    rs = Math.sqrt(rs);
	                    this.z = rs * 0.5;
	                    rs = 0.5 / rs;
	                    this.w = (m01 - m10) * rs;
	                    this.x = (m20 + m02) * rs;
	                    this.y = (m21 + m12) * rs;
	                }
	            }
	            else if (m11 > m22) {
	                rs = (m11 - (m22 + m00)) + 1;
	                rs = Math.sqrt(rs);
	                this.y = rs * 0.5;
	                rs = 0.5 / rs;
	                this.w = (m20 - m02) * rs;
	                this.z = (m12 + m21) * rs;
	                this.x = (m10 + m01) * rs;
	            }
	            else {
	                rs = (m22 - (m00 + m11)) + 1;
	                rs = Math.sqrt(rs);
	                this.z = rs * 0.5;
	                rs = 0.5 / rs;
	                this.w = (m01 - m10) * rs;
	                this.x = (m20 + m02) * rs;
	                this.y = (m21 + m12) * rs;
	            }
	        }
	        return this;
	    };
	    Quaternion.prototype.setFromAxisAngle = function (angle, axis) {
	        var sa, ca;
	        axis = axis.normalize();
	        angle *= 0.5 * DEG_TO_RAD;
	        sa = Math.sin(angle);
	        ca = Math.cos(angle);
	        this.x = sa * axis.x;
	        this.y = sa * axis.y;
	        this.z = sa * axis.z;
	        this.w = ca;
	        return this;
	    };
	    Quaternion.prototype.invert = function () {
	        return this.conjugate().normalize();
	    };
	    Quaternion.prototype.conjugate = function () {
	        this.x *= -1;
	        this.y *= -1;
	        this.z *= -1;
	        return this;
	    };
	    Quaternion.prototype.clone = function () {
	        return Quaternion_1.create(this.x, this.y, this.z, this.w);
	    };
	    Quaternion.prototype.normalize = function () {
	        var len = this.length();
	        if (len === 0) {
	            this.x = this.y = this.z = 0;
	            this.w = 1;
	        }
	        else {
	            len = 1 / len;
	            this.x *= len;
	            this.y *= len;
	            this.z *= len;
	            this.w *= len;
	        }
	        return this;
	    };
	    Quaternion.prototype.length = function () {
	        var x, y, z, w;
	        x = this.x;
	        y = this.y;
	        z = this.z;
	        w = this.w;
	        return Math.sqrt(x * x + y * y + z * z + w * w);
	    };
	    Quaternion.prototype.multiplyVector3 = function (vector) {
	        var q = this;
	        var x = vector.x;
	        var y = vector.y;
	        var z = vector.z;
	        var qx = q.x;
	        var qy = q.y;
	        var qz = q.z;
	        var qw = q.w;
	        var ix = qw * x + qy * z - qz * y;
	        var iy = qw * y + qz * x - qx * z;
	        var iz = qw * z + qx * y - qy * x;
	        var iw = -qx * x - qy * y - qz * z;
	        return Vector3.create(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
	    };
	    Quaternion.prototype.set = function (x, y, z, w) {
	        this.x = x;
	        this.y = y;
	        this.z = z;
	        this.w = w;
	        return this;
	    };
	    Quaternion.prototype.sub = function (quat) {
	        var result = quat.clone().invert().multiply(this);
	        this.set(result.x, result.y, result.z, result.w);
	        return this;
	    };
	    Quaternion.prototype.getEulerAngles = function () {
	        var x, y, z, qx, qy, qz, qw, a2;
	        qx = this.x;
	        qy = this.y;
	        qz = this.z;
	        qw = this.w;
	        a2 = 2 * (qw * qy - qx * qz);
	        if (a2 <= -0.99999) {
	            x = 2 * Math.atan2(qx, qw);
	            y = -Math.PI / 2;
	            z = 0;
	        }
	        else if (a2 >= 0.99999) {
	            x = 2 * Math.atan2(qx, qw);
	            y = Math.PI / 2;
	            z = 0;
	        }
	        else {
	            x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
	            y = Math.asin(a2);
	            z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
	        }
	        return Vector3.create(x, y, z).scale(RAD_TO_DEG);
	    };
	    Quaternion.prototype.slerp = function (left, right, amount) {
	        if (amount === 0) {
	            this.set(left.x, left.y, left.z, left.w);
	            return this;
	        }
	        else if (amount === 1) {
	            this.set(right.x, right.y, right.z, right.w);
	            return this;
	        }
	        var num2;
	        var num3;
	        var num = amount;
	        var num4 = (((left.x * right.x) + (left.y * right.y)) + (left.z * right.z)) + (left.w * right.w);
	        var flag = false;
	        if (num4 < 0) {
	            flag = true;
	            num4 = -num4;
	        }
	        if (num4 > 0.999999) {
	            num3 = 1 - num;
	            num2 = flag ? -num : num;
	        }
	        else {
	            var num5 = Math.acos(num4);
	            var num6 = (1.0 / Math.sin(num5));
	            num3 = (Math.sin((1.0 - num) * num5)) * num6;
	            num2 = flag ? ((-Math.sin(num * num5)) * num6) : ((Math.sin(num * num5)) * num6);
	        }
	        this.set((num3 * left.x) + (num2 * right.x), (num3 * left.y) + (num2 * right.y), (num3 * left.z) + (num2 * right.z), (num3 * left.w) + (num2 * right.w));
	        return this;
	    };
	    Quaternion = Quaternion_1 = __decorate([
	        registerClass("Quaternion")
	    ], Quaternion);
	    return Quaternion;
	    var Quaternion_1;
	}());

	var Matrix4 = (function () {
	    function Matrix4() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.values = null;
	        if (args.length === 1) {
	            this.values = args[0];
	        }
	        else {
	            this.values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	        }
	    }
	    Matrix4_1 = Matrix4;
	    Matrix4.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var m = null;
	        if (args.length === 0) {
	            m = new this();
	        }
	        else {
	            m = new this(args[0]);
	        }
	        return m;
	    };
	    Matrix4.prototype.set = function (initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
	        var te = this.values;
	        te[0] = initialM11;
	        te[1] = initialM12;
	        te[2] = initialM13;
	        te[3] = initialM14;
	        te[4] = initialM21;
	        te[5] = initialM22;
	        te[6] = initialM23;
	        te[7] = initialM24;
	        te[8] = initialM31;
	        te[9] = initialM32;
	        te[10] = initialM33;
	        te[11] = initialM34;
	        te[12] = initialM41;
	        te[13] = initialM42;
	        te[14] = initialM43;
	        te[15] = initialM44;
	        return this;
	    };
	    Matrix4.prototype.setIdentity = function () {
	        var e = this.values;
	        e[0] = 1;
	        e[4] = 0;
	        e[8] = 0;
	        e[12] = 0;
	        e[1] = 0;
	        e[5] = 1;
	        e[9] = 0;
	        e[13] = 0;
	        e[2] = 0;
	        e[6] = 0;
	        e[10] = 1;
	        e[14] = 0;
	        e[3] = 0;
	        e[7] = 0;
	        e[11] = 0;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.invert = function () {
	        var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, invDet, m;
	        m = this.values;
	        a00 = m[0];
	        a01 = m[1];
	        a02 = m[2];
	        a03 = m[3];
	        a10 = m[4];
	        a11 = m[5];
	        a12 = m[6];
	        a13 = m[7];
	        a20 = m[8];
	        a21 = m[9];
	        a22 = m[10];
	        a23 = m[11];
	        a30 = m[12];
	        a31 = m[13];
	        a32 = m[14];
	        a33 = m[15];
	        b00 = a00 * a11 - a01 * a10;
	        b01 = a00 * a12 - a02 * a10;
	        b02 = a00 * a13 - a03 * a10;
	        b03 = a01 * a12 - a02 * a11;
	        b04 = a01 * a13 - a03 * a11;
	        b05 = a02 * a13 - a03 * a12;
	        b06 = a20 * a31 - a21 * a30;
	        b07 = a20 * a32 - a22 * a30;
	        b08 = a20 * a33 - a23 * a30;
	        b09 = a21 * a32 - a22 * a31;
	        b10 = a21 * a33 - a23 * a31;
	        b11 = a22 * a33 - a23 * a32;
	        invDet = 1 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);
	        m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
	        m[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
	        m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
	        m[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
	        m[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
	        m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
	        m[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
	        m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
	        m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
	        m[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
	        m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
	        m[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
	        m[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
	        m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
	        m[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
	        m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
	        return this;
	    };
	    Matrix4.prototype.invertTo3x3 = function () {
	        var a11, a21, a31, a12, a22, a32, a13, a23, a33, m, r, det, idet;
	        var mat3 = Matrix3.create();
	        m = this.values;
	        r = mat3.values;
	        a11 = m[10] * m[5] - m[6] * m[9];
	        a21 = -m[10] * m[1] + m[2] * m[9];
	        a31 = m[6] * m[1] - m[2] * m[5];
	        a12 = -m[10] * m[4] + m[6] * m[8];
	        a22 = m[10] * m[0] - m[2] * m[8];
	        a32 = -m[6] * m[0] + m[2] * m[4];
	        a13 = m[9] * m[4] - m[5] * m[8];
	        a23 = -m[9] * m[0] + m[1] * m[8];
	        a33 = m[5] * m[0] - m[1] * m[4];
	        det = m[0] * a11 + m[1] * a12 + m[2] * a13;
	        if (det === 0) {
	            Log$$1.warn("can't invert matrix, determinant is 0");
	            return mat3;
	        }
	        idet = 1 / det;
	        r[0] = idet * a11;
	        r[1] = idet * a21;
	        r[2] = idet * a31;
	        r[3] = idet * a12;
	        r[4] = idet * a22;
	        r[5] = idet * a32;
	        r[6] = idet * a13;
	        r[7] = idet * a23;
	        r[8] = idet * a33;
	        return mat3;
	    };
	    Matrix4.prototype.transpose = function () {
	        var te = this.values;
	        var tmp;
	        tmp = te[1];
	        te[1] = te[4];
	        te[4] = tmp;
	        tmp = te[2];
	        te[2] = te[8];
	        te[8] = tmp;
	        tmp = te[6];
	        te[6] = te[9];
	        te[9] = tmp;
	        tmp = te[3];
	        te[3] = te[12];
	        te[12] = tmp;
	        tmp = te[7];
	        te[7] = te[13];
	        te[13] = tmp;
	        tmp = te[11];
	        te[11] = te[14];
	        te[14] = tmp;
	        return this;
	    };
	    Matrix4.prototype.setTranslate = function (x, y, z) {
	        var e = this.values;
	        e[0] = 1;
	        e[4] = 0;
	        e[8] = 0;
	        e[12] = x;
	        e[1] = 0;
	        e[5] = 1;
	        e[9] = 0;
	        e[13] = y;
	        e[2] = 0;
	        e[6] = 0;
	        e[10] = 1;
	        e[14] = z;
	        e[3] = 0;
	        e[7] = 0;
	        e[11] = 0;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.translate = function (x, y, z) {
	        this.applyMatrix(Matrix4_1.create().setTranslate(x, y, z));
	        return this;
	    };
	    Matrix4.prototype.setRotate = function (angle, x, y, z) {
	        var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
	        var angle = Math.PI * angle / 180;
	        e = this.values;
	        s = Math.sin(angle);
	        c = Math.cos(angle);
	        if (0 !== x && 0 === y && 0 === z) {
	            if (x < 0) {
	                s = -s;
	            }
	            e[0] = 1;
	            e[4] = 0;
	            e[8] = 0;
	            e[12] = 0;
	            e[1] = 0;
	            e[5] = c;
	            e[9] = -s;
	            e[13] = 0;
	            e[2] = 0;
	            e[6] = s;
	            e[10] = c;
	            e[14] = 0;
	            e[3] = 0;
	            e[7] = 0;
	            e[11] = 0;
	            e[15] = 1;
	        }
	        else if (0 === x && 0 !== y && 0 === z) {
	            if (y < 0) {
	                s = -s;
	            }
	            e[0] = c;
	            e[4] = 0;
	            e[8] = s;
	            e[12] = 0;
	            e[1] = 0;
	            e[5] = 1;
	            e[9] = 0;
	            e[13] = 0;
	            e[2] = -s;
	            e[6] = 0;
	            e[10] = c;
	            e[14] = 0;
	            e[3] = 0;
	            e[7] = 0;
	            e[11] = 0;
	            e[15] = 1;
	        }
	        else if (0 === x && 0 === y && 0 !== z) {
	            if (z < 0) {
	                s = -s;
	            }
	            e[0] = c;
	            e[4] = -s;
	            e[8] = 0;
	            e[12] = 0;
	            e[1] = s;
	            e[5] = c;
	            e[9] = 0;
	            e[13] = 0;
	            e[2] = 0;
	            e[6] = 0;
	            e[10] = 1;
	            e[14] = 0;
	            e[3] = 0;
	            e[7] = 0;
	            e[11] = 0;
	            e[15] = 1;
	        }
	        else {
	            len = Math.sqrt(x * x + y * y + z * z);
	            if (len !== 1) {
	                rlen = 1 / len;
	                x *= rlen;
	                y *= rlen;
	                z *= rlen;
	            }
	            nc = 1 - c;
	            xy = x * y;
	            yz = y * z;
	            zx = z * x;
	            xs = x * s;
	            ys = y * s;
	            zs = z * s;
	            e[0] = x * x * nc + c;
	            e[1] = xy * nc + zs;
	            e[2] = zx * nc - ys;
	            e[3] = 0;
	            e[4] = xy * nc - zs;
	            e[5] = y * y * nc + c;
	            e[6] = yz * nc + xs;
	            e[7] = 0;
	            e[8] = zx * nc + ys;
	            e[9] = yz * nc - xs;
	            e[10] = z * z * nc + c;
	            e[11] = 0;
	            e[12] = 0;
	            e[13] = 0;
	            e[14] = 0;
	            e[15] = 1;
	        }
	        return this;
	    };
	    Matrix4.prototype.rotate = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var angle = args[0];
	        if (args.length === 2) {
	            var vector3 = args[1];
	            this.applyMatrix(Matrix4_1.create().setRotate(angle, vector3.values[0], vector3.values[1], vector3.values[2]));
	        }
	        else if (args.length === 4) {
	            var x = args[1], y = args[2], z = args[3];
	            this.applyMatrix(Matrix4_1.create().setRotate(angle, x, y, z));
	        }
	        return this;
	    };
	    Matrix4.prototype.setScale = function (x, y, z) {
	        var e = this.values;
	        e[0] = x;
	        e[4] = 0;
	        e[8] = 0;
	        e[12] = 0;
	        e[1] = 0;
	        e[5] = y;
	        e[9] = 0;
	        e[13] = 0;
	        e[2] = 0;
	        e[6] = 0;
	        e[10] = z;
	        e[14] = 0;
	        e[3] = 0;
	        e[7] = 0;
	        e[11] = 0;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.scale = function (x, y, z) {
	        this.applyMatrix(Matrix4_1.create().setScale(x, y, z));
	        return this;
	    };
	    Matrix4.prototype.setLookAt = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var x, y, z, eye, center, up;
	        if (args.length === 3) {
	            eye = args[0];
	            center = args[1];
	            up = args[2];
	        }
	        else if (args.length === 9) {
	            eye = Vector3.create(args[0], args[1], args[2]);
	            center = Vector3.create(args[3], args[4], args[5]);
	            up = Vector3.create(args[6], args[7], args[8]);
	        }
	        x = Vector3.create();
	        z = eye.clone().sub(center).normalize();
	        y = up.clone().normalize();
	        x.cross(y, z).normalize();
	        y.cross(z, x);
	        var r = this.values;
	        r[0] = x.x;
	        r[1] = x.y;
	        r[2] = x.z;
	        r[3] = 0;
	        r[4] = y.x;
	        r[5] = y.y;
	        r[6] = y.z;
	        r[7] = 0;
	        r[8] = z.x;
	        r[9] = z.y;
	        r[10] = z.z;
	        r[11] = 0;
	        r[12] = eye.x;
	        r[13] = eye.y;
	        r[14] = eye.z;
	        r[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.lookAt = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var matrix = Matrix4_1.create();
	        this.applyMatrix(matrix.setLookAt.apply(matrix, args));
	        return this;
	    };
	    Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
	        var e = this.values, rw, rh, rd;
	        rw = 1 / (right - left);
	        rh = 1 / (top - bottom);
	        rd = 1 / (far - near);
	        e[0] = 2 * rw;
	        e[1] = 0;
	        e[2] = 0;
	        e[3] = 0;
	        e[4] = 0;
	        e[5] = 2 * rh;
	        e[6] = 0;
	        e[7] = 0;
	        e[8] = 0;
	        e[9] = 0;
	        e[10] = -2 * rd;
	        e[11] = 0;
	        e[12] = -(right + left) * rw;
	        e[13] = -(top + bottom) * rh;
	        e[14] = -(far + near) * rd;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
	        this.applyMatrix(Matrix4_1.create().setOrtho(left, right, bottom, top, near, far));
	        return this;
	    };
	    Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
	        var e = null, rd = null, s = null, ct = null, fovy = Math.PI * fovy / 180 / 2;
	        s = Math.sin(fovy);
	        Log$$1.error(s === 0, Log$$1.info.FUNC_MUST_NOT_BE("frustum", "null"));
	        rd = 1 / (far - near);
	        ct = Math.cos(fovy) / s;
	        e = this.values;
	        e[0] = ct / aspect;
	        e[1] = 0;
	        e[2] = 0;
	        e[3] = 0;
	        e[4] = 0;
	        e[5] = ct;
	        e[6] = 0;
	        e[7] = 0;
	        e[8] = 0;
	        e[9] = 0;
	        e[10] = -(far + near) * rd;
	        e[11] = -1;
	        e[12] = 0;
	        e[13] = 0;
	        e[14] = -2 * near * far * rd;
	        e[15] = 0;
	        return this;
	    };
	    Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
	        this.applyMatrix(Matrix4_1.create().setPerspective(fovy, aspect, near, far));
	        return this;
	    };
	    Matrix4.prototype.applyMatrix = function (other, notChangeSelf) {
	        if (notChangeSelf === void 0) { notChangeSelf = false; }
	        var a = this, b = other.clone();
	        if (notChangeSelf) {
	            return b.multiply(a);
	        }
	        this.values = b.multiply(a).values;
	        return this;
	    };
	    Matrix4.prototype.multiply = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var mat1 = null, mat2 = null, result = null;
	        result = this.values;
	        if (args.length === 1) {
	            mat1 = this.values;
	            mat2 = args[0].values;
	        }
	        else if (args.length === 2) {
	            mat1 = args[0].values;
	            mat2 = args[1].values;
	        }
	        var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
	        result[0] = A * a + B * e + C * i + D * m;
	        result[1] = A * b + B * f + C * j + D * n;
	        result[2] = A * c + B * g + C * k + D * o;
	        result[3] = A * d + B * h + C * l + D * p;
	        result[4] = E * a + F * e + G * i + H * m;
	        result[5] = E * b + F * f + G * j + H * n;
	        result[6] = E * c + F * g + G * k + H * o;
	        result[7] = E * d + F * h + G * l + H * p;
	        result[8] = I * a + J * e + K * i + L * m;
	        result[9] = I * b + J * f + K * j + L * n;
	        result[10] = I * c + J * g + K * k + L * o;
	        result[11] = I * d + J * h + K * l + L * p;
	        result[12] = M * a + N * e + O * i + P * m;
	        result[13] = M * b + N * f + O * j + P * n;
	        result[14] = M * c + N * g + O * k + P * o;
	        result[15] = M * d + N * h + O * l + P * p;
	        return this;
	    };
	    Matrix4.prototype.multiplyVector4 = function (vector) {
	        var mat1 = this.values, vec4 = vector.values;
	        var result = [];
	        result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
	        result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
	        result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
	        result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];
	        return Vector4.create(result[0], result[1], result[2], result[3]);
	    };
	    Matrix4.prototype.multiplyVector3 = function (vector) {
	        var mat1 = this.values, vec3 = vector.values;
	        var result = [];
	        result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8];
	        result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9];
	        result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10];
	        return Vector3.create(result[0], result[1], result[2]);
	    };
	    Matrix4.prototype.multiplyPoint = function (vector) {
	        var mat1 = this.values, vec3 = vector.values;
	        var result = [];
	        result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8] + mat1[12];
	        result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9] + mat1[13];
	        result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10] + mat1[14];
	        return Vector3.create(result[0], result[1], result[2]);
	    };
	    Matrix4.prototype.clone = function () {
	        var result = Matrix4_1.create(), i = 0, len = this.values.length;
	        for (i = 0; i < len; i++) {
	            result.values[i] = this.values[i];
	        }
	        return result;
	    };
	    Matrix4.prototype.cloneToArray = function (array, offset) {
	        if (offset === void 0) { offset = 0; }
	        var values = this.values;
	        for (var index = 0; index < 16; index++) {
	            array[offset + index] = values[index];
	        }
	        return this;
	    };
	    Matrix4.prototype.getX = function () {
	        return Vector3.create(this.values[0], this.values[1], this.values[2]);
	    };
	    Matrix4.prototype.getY = function () {
	        return Vector3.create(this.values[4], this.values[5], this.values[6]);
	    };
	    Matrix4.prototype.getZ = function () {
	        return Vector3.create(this.values[8], this.values[9], this.values[10]);
	    };
	    Matrix4.prototype.getTranslation = function () {
	        return Vector3.create(this.values[12], this.values[13], this.values[14]);
	    };
	    Matrix4.prototype.getScale = function () {
	        return Vector3.create(this.getX().length(), this.getY().length(), this.getZ().length());
	    };
	    Matrix4.prototype.getRotation = function () {
	        return Quaternion.create().setFromMatrix(this);
	    };
	    Matrix4.prototype.getEulerAngles = function () {
	        var x, y, z, sx, sy, sz, m, halfPi;
	        var scale = this.getScale();
	        sx = scale.x;
	        sy = scale.y;
	        sz = scale.z;
	        m = this.values;
	        y = Math.asin(-m[2] / sx);
	        halfPi = Math.PI * 0.5;
	        if (y < halfPi) {
	            if (y > -halfPi) {
	                x = Math.atan2(m[6] / sy, m[10] / sz);
	                z = Math.atan2(m[1] / sx, m[0] / sx);
	            }
	            else {
	                z = 0;
	                x = -Math.atan2(m[4] / sy, m[5] / sy);
	            }
	        }
	        else {
	            z = 0;
	            x = Math.atan2(m[4] / sy, m[5] / sy);
	        }
	        return Vector3.create(x, y, z).scale(RAD_TO_DEG);
	    };
	    Matrix4.prototype.setTRS = function (t, r, s) {
	        var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
	        tx = t.x;
	        ty = t.y;
	        tz = t.z;
	        qx = r.x;
	        qy = r.y;
	        qz = r.z;
	        qw = r.w;
	        sx = s.x;
	        sy = s.y;
	        sz = s.z;
	        x2 = qx + qx;
	        y2 = qy + qy;
	        z2 = qz + qz;
	        xx = qx * x2;
	        xy = qx * y2;
	        xz = qx * z2;
	        yy = qy * y2;
	        yz = qy * z2;
	        zz = qz * z2;
	        wx = qw * x2;
	        wy = qw * y2;
	        wz = qw * z2;
	        m = this.values;
	        m[0] = (1 - (yy + zz)) * sx;
	        m[1] = (xy + wz) * sx;
	        m[2] = (xz - wy) * sx;
	        m[3] = 0;
	        m[4] = (xy - wz) * sy;
	        m[5] = (1 - (xx + zz)) * sy;
	        m[6] = (yz + wx) * sy;
	        m[7] = 0;
	        m[8] = (xz + wy) * sz;
	        m[9] = (yz - wx) * sz;
	        m[10] = (1 - (xx + yy)) * sz;
	        m[11] = 0;
	        m[12] = tx;
	        m[13] = ty;
	        m[14] = tz;
	        m[15] = 1;
	        return this;
	    };
	    __decorate([
	        requireCheck(function (angle, x, y, z) {
	            it("axis's component shouldn't all be zero", function () {
	                wdet_1(x === 0 && y === 0 && z === 0).false;
	            });
	        })
	    ], Matrix4.prototype, "setRotate", null);
	    __decorate([
	        requireCheck(function (left, right, bottom, top, near, far) {
	            assert(left !== right && bottom !== top && near !== far, Log$$1.info.FUNC_MUST_NOT_BE("frustum", "null"));
	        })
	    ], Matrix4.prototype, "setOrtho", null);
	    __decorate([
	        requireCheck(function (fovy, aspect, near, far) {
	            assert(near !== far && aspect !== 0, Log$$1.info.FUNC_MUST_NOT_BE("frustum", "null"));
	            assert(near > 0, Log$$1.info.FUNC_MUST("near", "> 0"));
	            assert(far > 0, Log$$1.info.FUNC_MUST("far", "> 0"));
	        })
	    ], Matrix4.prototype, "setPerspective", null);
	    Matrix4 = Matrix4_1 = __decorate([
	        registerClass("Matrix4")
	    ], Matrix4);
	    return Matrix4;
	    var Matrix4_1;
	}());

	var updateProjectionMatrix$1 = requireCheckFunc(function (index, PerspectiveCameraData, CameraData) {
	    it("fovy should exist", function () {
	        wdet_1(isValidMapValue(PerspectiveCameraData.fovyMap[index])).true;
	    });
	    it("aspect should exist", function () {
	        wdet_1(isValidMapValue(PerspectiveCameraData.aspectMap[index])).true;
	    });
	    it("near should exist", function () {
	        wdet_1(isValidMapValue(CameraData.nearMap[index])).true;
	    });
	    it("far should exist", function () {
	        wdet_1(isValidMapValue(CameraData.farMap[index])).true;
	    });
	}, function (index, PerspectiveCameraData, CameraData) {
	    setPMatrix(index, _getOrCreatePMatrix(index, CameraData).setPerspective(PerspectiveCameraData.fovyMap[index], PerspectiveCameraData.aspectMap[index], CameraData.nearMap[index], CameraData.farMap[index]), CameraData);
	});
	var _getOrCreatePMatrix = function (index, CameraData) {
	    var mat = CameraData.pMatrixMap[index];
	    if (isValidMapValue(mat)) {
	        return mat;
	    }
	    return Matrix4.create();
	};
	var getFovy = function (index, PerspectiveCameraData) {
	    return PerspectiveCameraData.fovyMap[index];
	};
	var setFovy = function (index, fovy, PerspectiveCameraData, CameraControllerData) {
	    PerspectiveCameraData.fovyMap[index] = fovy;
	    addToDirtyList(index, CameraControllerData);
	};
	var getAspect = function (index, PerspectiveCameraData) {
	    return PerspectiveCameraData.aspectMap[index];
	};
	var setAspect = function (index, aspect, PerspectiveCameraData, CameraControllerData) {
	    PerspectiveCameraData.aspectMap[index] = aspect;
	    addToDirtyList(index, CameraControllerData);
	};
	var dispose$1 = function (index, PerspectiveCameraData) {
	    deleteVal(index, PerspectiveCameraData.fovyMap);
	    deleteVal(index, PerspectiveCameraData.aspectMap);
	};
	var initData$1 = function (PerspectiveCameraData) {
	    PerspectiveCameraData.fovyMap = createMap();
	    PerspectiveCameraData.aspectMap = createMap();
	};

	var GameObjectData = (function () {
	    function GameObjectData() {
	    }
	    GameObjectData.uid = null;
	    GameObjectData.disposeCount = null;
	    GameObjectData.componentMap = null;
	    GameObjectData.parentMap = null;
	    GameObjectData.childrenMap = null;
	    GameObjectData.aliveUIDArray = null;
	    return GameObjectData;
	}());

	var DataBufferConfig = {
	    transformDataBufferCount: 20 * 1000,
	    geometryDataBufferCount: 1000 * 1000,
	    basicMaterialDataBufferCount: 20 * 1000,
	    lightMaterialDataBufferCount: 20 * 1000,
	    textureDataBufferCount: 20 * 1000,
	    ambientLightDataBufferCount: 1,
	    directionLightDataBufferCount: 4,
	    pointLightDataBufferCount: 4,
	    renderCommandBufferCount: 10 * 1024,
	    geometryIndicesBufferBits: 16
	};

	var ThreeDTransformData = (function () {
	    function ThreeDTransformData() {
	    }
	    Object.defineProperty(ThreeDTransformData, "maxCount", {
	        get: function () {
	            return DataBufferConfig.transformDataBufferCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ThreeDTransformData.localToWorldMatrices = null;
	    ThreeDTransformData.localPositions = null;
	    ThreeDTransformData.localRotations = null;
	    ThreeDTransformData.localScales = null;
	    ThreeDTransformData.defaultPosition = null;
	    ThreeDTransformData.defaultRotation = null;
	    ThreeDTransformData.defaultScale = null;
	    ThreeDTransformData.defaultLocalToWorldMatrice = null;
	    ThreeDTransformData.firstDirtyIndex = null;
	    ThreeDTransformData.index = null;
	    ThreeDTransformData.notUsedIndexLinkList = null;
	    ThreeDTransformData.isTranslateMap = null;
	    ThreeDTransformData.parentMap = null;
	    ThreeDTransformData.childrenMap = null;
	    ThreeDTransformData.cacheMap = null;
	    ThreeDTransformData.tempMap = null;
	    ThreeDTransformData.transformMap = null;
	    ThreeDTransformData.count = null;
	    ThreeDTransformData.uid = null;
	    ThreeDTransformData.disposeCount = null;
	    ThreeDTransformData.isClearCacheMap = null;
	    ThreeDTransformData.gameObjectMap = null;
	    ThreeDTransformData.aliveUIDArray = null;
	    ThreeDTransformData.buffer = null;
	    return ThreeDTransformData;
	}());
	var ThreeDTransformRelationData = (function () {
	    function ThreeDTransformRelationData() {
	        this.index = null;
	        this.parent = null;
	        this.children = null;
	    }
	    ThreeDTransformRelationData.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    return ThreeDTransformRelationData;
	}());

	var GlobalTempData = (function () {
	    function GlobalTempData() {
	    }
	    GlobalTempData.matrix4_1 = Matrix4.create();
	    GlobalTempData.matrix4_2 = Matrix4.create();
	    GlobalTempData.matrix4_3 = Matrix4.create();
	    GlobalTempData.vector3_1 = Vector3.create();
	    GlobalTempData.vector3_2 = Vector3.create();
	    GlobalTempData.vector3_3 = Vector3.create();
	    GlobalTempData.vector3_4 = Vector3.create();
	    GlobalTempData.quaternion_1 = Quaternion.create();
	    return GlobalTempData;
	}());

	var ThreeDTransform = (function (_super) {
	    __extends(ThreeDTransform, _super);
	    function ThreeDTransform() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.uid = null;
	        return _this;
	    }
	    ThreeDTransform = __decorate([
	        registerClass("ThreeDTransform")
	    ], ThreeDTransform);
	    return ThreeDTransform;
	}(Component));
	var createThreeDTransform = function () {
	    return create$2(ThreeDTransformData);
	};
	var getThreeDTransformPosition = requireCheckFunc(function (component) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component) {
	    return getPosition(component, ThreeDTransformData);
	});
	var setThreeDTransformPosition = requireCheckFunc(function (component, position) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component, position) {
	    setPosition(component, position, GlobalTempData, ThreeDTransformData);
	});
	var getThreeDTransformLocalToWorldMatrix = requireCheckFunc(function (component) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component) {
	    return getLocalToWorldMatrix(component, getTempLocalToWorldMatrix(component, ThreeDTransformData), ThreeDTransformData);
	});
	var getThreeDTransformLocalPosition = requireCheckFunc(function (component) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component) {
	    return getLocalPosition(component, ThreeDTransformData);
	});
	var setThreeDTransformLocalPosition = requireCheckFunc(function (component, localPosition) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component, localPosition) {
	    setLocalPosition(component, localPosition, ThreeDTransformData);
	});
	var setThreeDTransformBatchTransformDatas = function (batchData) {
	    setBatchDatas$$1(batchData, GlobalTempData, ThreeDTransformData);
	};
	var getThreeDTransformParent = requireCheckFunc(function (component) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component) {
	    return getParent$1(component, ThreeDTransformData);
	});
	var setThreeDTransformParent = requireCheckFunc(function (component, parent) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component, parent) {
	    setParent$$1(component, parent, ThreeDTransformData);
	});
	var getThreeDTransformGameObject = requireCheckFunc(function (component) {
	    checkShouldAlive(component, ThreeDTransformData);
	}, function (component) {
	    return getGameObject$1(component.uid, ThreeDTransformData);
	});

	var identity_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function identity(value) {
	    return value;
	}
	exports.default = identity;
	});

	var _freeGlobal = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	exports.default = freeGlobal;
	});

	var _root = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _freeGlobal_js_1 = _freeGlobal;
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	var root = _freeGlobal_js_1.default || freeSelf || Function('return this')();
	exports.default = root;
	});

	var _Symbol = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _root_js_1 = _root;
	var Symbol = _root_js_1.default.Symbol;
	exports.default = Symbol;
	});

	var _getRawTag = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _Symbol_js_1 = _Symbol;
	var objectProto = Object.prototype;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var nativeObjectToString = objectProto.toString;
	var symToStringTag = _Symbol_js_1.default ? _Symbol_js_1.default.toStringTag : undefined;
	function getRawTag(value) {
	    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
	    try {
	        value[symToStringTag] = undefined;
	        var unmasked = true;
	    }
	    catch (e) { }
	    var result = nativeObjectToString.call(value);
	    if (unmasked) {
	        if (isOwn) {
	            value[symToStringTag] = tag;
	        }
	        else {
	            delete value[symToStringTag];
	        }
	    }
	    return result;
	}
	exports.default = getRawTag;
	});

	var _objectToString = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var objectProto = Object.prototype;
	var nativeObjectToString = objectProto.toString;
	function objectToString(value) {
	    return nativeObjectToString.call(value);
	}
	exports.default = objectToString;
	});

	var _baseGetTag = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _Symbol_js_1 = _Symbol;
	var _getRawTag_js_1 = _getRawTag;
	var _objectToString_js_1 = _objectToString;
	var nullTag = '[object Null]', undefinedTag = '[object Undefined]';
	var symToStringTag = _Symbol_js_1.default ? _Symbol_js_1.default.toStringTag : undefined;
	function baseGetTag(value) {
	    if (value == null) {
	        return value === undefined ? undefinedTag : nullTag;
	    }
	    return (symToStringTag && symToStringTag in Object(value))
	        ? _getRawTag_js_1.default(value)
	        : _objectToString_js_1.default(value);
	}
	exports.default = baseGetTag;
	});

	var isObject_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function isObject(value) {
	    var type = typeof value;
	    return value != null && (type == 'object' || type == 'function');
	}
	exports.default = isObject;
	});

	var isFunction_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseGetTag_js_1 = _baseGetTag;
	var isObject_js_1 = isObject_1;
	var asyncTag = '[object AsyncFunction]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', proxyTag = '[object Proxy]';
	function isFunction(value) {
	    if (!isObject_js_1.default(value)) {
	        return false;
	    }
	    var tag = _baseGetTag_js_1.default(value);
	    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}
	exports.default = isFunction;
	});

	var _coreJsData = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _root_js_1 = _root;
	var coreJsData = _root_js_1.default['__core-js_shared__'];
	exports.default = coreJsData;
	});

	var _isMasked = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _coreJsData_js_1 = _coreJsData;
	var maskSrcKey = (function () {
	    var uid = /[^.]+$/.exec(_coreJsData_js_1.default && _coreJsData_js_1.default.keys && _coreJsData_js_1.default.keys.IE_PROTO || '');
	    return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	function isMasked(func) {
	    return !!maskSrcKey && (maskSrcKey in func);
	}
	exports.default = isMasked;
	});

	var _toSource = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var funcProto = Function.prototype;
	var funcToString = funcProto.toString;
	function toSource(func) {
	    if (func != null) {
	        try {
	            return funcToString.call(func);
	        }
	        catch (e) { }
	        try {
	            return (func + '');
	        }
	        catch (e) { }
	    }
	    return '';
	}
	exports.default = toSource;
	});

	var _baseIsNative = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var isFunction_js_1 = isFunction_1;
	var _isMasked_js_1 = _isMasked;
	var isObject_js_1 = isObject_1;
	var _toSource_js_1 = _toSource;
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	var funcProto = Function.prototype, objectProto = Object.prototype;
	var funcToString = funcProto.toString;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var reIsNative = RegExp('^' +
	    funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
	function baseIsNative(value) {
	    if (!isObject_js_1.default(value) || _isMasked_js_1.default(value)) {
	        return false;
	    }
	    var pattern = isFunction_js_1.default(value) ? reIsNative : reIsHostCtor;
	    return pattern.test(_toSource_js_1.default(value));
	}
	exports.default = baseIsNative;
	});

	var _getValue = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function getValue(object, key) {
	    return object == null ? undefined : object[key];
	}
	exports.default = getValue;
	});

	var _getNative = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseIsNative_js_1 = _baseIsNative;
	var _getValue_js_1 = _getValue;
	function getNative(object, key) {
	    var value = _getValue_js_1.default(object, key);
	    return _baseIsNative_js_1.default(value) ? value : undefined;
	}
	exports.default = getNative;
	});

	var _WeakMap = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _getNative_js_1 = _getNative;
	var _root_js_1 = _root;
	var WeakMap = _getNative_js_1.default(_root_js_1.default, 'WeakMap');
	exports.default = WeakMap;
	});

	var _metaMap = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _WeakMap_js_1 = _WeakMap;
	var metaMap = _WeakMap_js_1.default && new _WeakMap_js_1.default;
	exports.default = metaMap;
	});

	var _baseSetData = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var identity_js_1 = identity_1;
	var _metaMap_js_1 = _metaMap;
	var baseSetData = !_metaMap_js_1.default ? identity_js_1.default : function (func, data) {
	    _metaMap_js_1.default.set(func, data);
	    return func;
	};
	exports.default = baseSetData;
	});

	var _baseCreate = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var isObject_js_1 = isObject_1;
	var objectCreate = Object.create;
	var baseCreate = (function () {
	    function object() { }
	    return function (proto) {
	        if (!isObject_js_1.default(proto)) {
	            return {};
	        }
	        if (objectCreate) {
	            return objectCreate(proto);
	        }
	        object.prototype = proto;
	        var result = new object;
	        object.prototype = undefined;
	        return result;
	    };
	}());
	exports.default = baseCreate;
	});

	var _createCtor = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseCreate_js_1 = _baseCreate;
	var isObject_js_1 = isObject_1;
	function createCtor(Ctor) {
	    return function () {
	        var args = arguments;
	        switch (args.length) {
	            case 0: return new Ctor;
	            case 1: return new Ctor(args[0]);
	            case 2: return new Ctor(args[0], args[1]);
	            case 3: return new Ctor(args[0], args[1], args[2]);
	            case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	            case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	            case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	            case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	        }
	        var thisBinding = _baseCreate_js_1.default(Ctor.prototype), result = Ctor.apply(thisBinding, args);
	        return isObject_js_1.default(result) ? result : thisBinding;
	    };
	}
	exports.default = createCtor;
	});

	var _createBind = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createCtor_js_1 = _createCtor;
	var _root_js_1 = _root;
	var WRAP_BIND_FLAG = 1;
	function createBind(func, bitmask, thisArg) {
	    var isBind = bitmask & WRAP_BIND_FLAG, Ctor = _createCtor_js_1.default(func);
	    function wrapper() {
	        var fn = (this && this !== _root_js_1.default && this instanceof wrapper) ? Ctor : func;
	        return fn.apply(isBind ? thisArg : this, arguments);
	    }
	    return wrapper;
	}
	exports.default = createBind;
	});

	var _apply = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function apply(func, thisArg, args) {
	    switch (args.length) {
	        case 0: return func.call(thisArg);
	        case 1: return func.call(thisArg, args[0]);
	        case 2: return func.call(thisArg, args[0], args[1]);
	        case 3: return func.call(thisArg, args[0], args[1], args[2]);
	    }
	    return func.apply(thisArg, args);
	}
	exports.default = apply;
	});

	var _composeArgs = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var nativeMax = Math.max;
	function composeArgs(args, partials, holders, isCurried) {
	    var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(leftLength + rangeLength), isUncurried = !isCurried;
	    while (++leftIndex < leftLength) {
	        result[leftIndex] = partials[leftIndex];
	    }
	    while (++argsIndex < holdersLength) {
	        if (isUncurried || argsIndex < argsLength) {
	            result[holders[argsIndex]] = args[argsIndex];
	        }
	    }
	    while (rangeLength--) {
	        result[leftIndex++] = args[argsIndex++];
	    }
	    return result;
	}
	exports.default = composeArgs;
	});

	var _composeArgsRight = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var nativeMax = Math.max;
	function composeArgsRight(args, partials, holders, isCurried) {
	    var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result = Array(rangeLength + rightLength), isUncurried = !isCurried;
	    while (++argsIndex < rangeLength) {
	        result[argsIndex] = args[argsIndex];
	    }
	    var offset = argsIndex;
	    while (++rightIndex < rightLength) {
	        result[offset + rightIndex] = partials[rightIndex];
	    }
	    while (++holdersIndex < holdersLength) {
	        if (isUncurried || argsIndex < argsLength) {
	            result[offset + holders[holdersIndex]] = args[argsIndex++];
	        }
	    }
	    return result;
	}
	exports.default = composeArgsRight;
	});

	var _countHolders = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function countHolders(array, placeholder) {
	    var length = array.length, result = 0;
	    while (length--) {
	        if (array[length] === placeholder) {
	            ++result;
	        }
	    }
	    return result;
	}
	exports.default = countHolders;
	});

	var _baseLodash = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function baseLodash() {
	}
	exports.default = baseLodash;
	});

	var _LazyWrapper = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseCreate_js_1 = _baseCreate;
	var _baseLodash_js_1 = _baseLodash;
	var MAX_ARRAY_LENGTH = 4294967295;
	function LazyWrapper(value) {
	    this.__wrapped__ = value;
	    this.__actions__ = [];
	    this.__dir__ = 1;
	    this.__filtered__ = false;
	    this.__iteratees__ = [];
	    this.__takeCount__ = MAX_ARRAY_LENGTH;
	    this.__views__ = [];
	}
	LazyWrapper.prototype = _baseCreate_js_1.default(_baseLodash_js_1.default.prototype);
	LazyWrapper.prototype.constructor = LazyWrapper;
	exports.default = LazyWrapper;
	});

	var noop_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function noop() {
	}
	exports.default = noop;
	});

	var _getData = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _metaMap_js_1 = _metaMap;
	var noop_js_1 = noop_1;
	var getData = !_metaMap_js_1.default ? noop_js_1.default : function (func) {
	    return _metaMap_js_1.default.get(func);
	};
	exports.default = getData;
	});

	var _realNames = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var realNames = {};
	exports.default = realNames;
	});

	var _getFuncName = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _realNames_js_1 = _realNames;
	var objectProto = Object.prototype;
	var hasOwnProperty = objectProto.hasOwnProperty;
	function getFuncName(func) {
	    var result = (func.name + ''), array = _realNames_js_1.default[result], length = hasOwnProperty.call(_realNames_js_1.default, result) ? array.length : 0;
	    while (length--) {
	        var data = array[length], otherFunc = data.func;
	        if (otherFunc == null || otherFunc == func) {
	            return data.name;
	        }
	    }
	    return result;
	}
	exports.default = getFuncName;
	});

	var _LodashWrapper = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseCreate_js_1 = _baseCreate;
	var _baseLodash_js_1 = _baseLodash;
	function LodashWrapper(value, chainAll) {
	    this.__wrapped__ = value;
	    this.__actions__ = [];
	    this.__chain__ = !!chainAll;
	    this.__index__ = 0;
	    this.__values__ = undefined;
	}
	LodashWrapper.prototype = _baseCreate_js_1.default(_baseLodash_js_1.default.prototype);
	LodashWrapper.prototype.constructor = LodashWrapper;
	exports.default = LodashWrapper;
	});

	var isArray_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var isArray = Array.isArray;
	exports.default = isArray;
	});

	var isObjectLike_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function isObjectLike(value) {
	    return value != null && typeof value == 'object';
	}
	exports.default = isObjectLike;
	});

	var _copyArray = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function copyArray(source, array) {
	    var index = -1, length = source.length;
	    array || (array = Array(length));
	    while (++index < length) {
	        array[index] = source[index];
	    }
	    return array;
	}
	exports.default = copyArray;
	});

	var _wrapperClone = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _LazyWrapper_js_1 = _LazyWrapper;
	var _LodashWrapper_js_1 = _LodashWrapper;
	var _copyArray_js_1 = _copyArray;
	function wrapperClone(wrapper) {
	    if (wrapper instanceof _LazyWrapper_js_1.default) {
	        return wrapper.clone();
	    }
	    var result = new _LodashWrapper_js_1.default(wrapper.__wrapped__, wrapper.__chain__);
	    result.__actions__ = _copyArray_js_1.default(wrapper.__actions__);
	    result.__index__ = wrapper.__index__;
	    result.__values__ = wrapper.__values__;
	    return result;
	}
	exports.default = wrapperClone;
	});

	var wrapperLodash = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _LazyWrapper_js_1 = _LazyWrapper;
	var _LodashWrapper_js_1 = _LodashWrapper;
	var _baseLodash_js_1 = _baseLodash;
	var isArray_js_1 = isArray_1;
	var isObjectLike_js_1 = isObjectLike_1;
	var _wrapperClone_js_1 = _wrapperClone;
	var objectProto = Object.prototype;
	var hasOwnProperty = objectProto.hasOwnProperty;
	function lodash(value) {
	    if (isObjectLike_js_1.default(value) && !isArray_js_1.default(value) && !(value instanceof _LazyWrapper_js_1.default)) {
	        if (value instanceof _LodashWrapper_js_1.default) {
	            return value;
	        }
	        if (hasOwnProperty.call(value, '__wrapped__')) {
	            return _wrapperClone_js_1.default(value);
	        }
	    }
	    return new _LodashWrapper_js_1.default(value);
	}
	lodash.prototype = _baseLodash_js_1.default.prototype;
	lodash.prototype.constructor = lodash;
	exports.default = lodash;
	});

	var _isLaziable = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _LazyWrapper_js_1 = _LazyWrapper;
	var _getData_js_1 = _getData;
	var _getFuncName_js_1 = _getFuncName;
	var wrapperLodash_js_1 = wrapperLodash;
	function isLaziable(func) {
	    var funcName = _getFuncName_js_1.default(func), other = wrapperLodash_js_1.default[funcName];
	    if (typeof other != 'function' || !(funcName in _LazyWrapper_js_1.default.prototype)) {
	        return false;
	    }
	    if (func === other) {
	        return true;
	    }
	    var data = _getData_js_1.default(other);
	    return !!data && func === data[0];
	}
	exports.default = isLaziable;
	});

	var _shortOut = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var HOT_COUNT = 800, HOT_SPAN = 16;
	var nativeNow = Date.now;
	function shortOut(func) {
	    var count = 0, lastCalled = 0;
	    return function () {
	        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
	        lastCalled = stamp;
	        if (remaining > 0) {
	            if (++count >= HOT_COUNT) {
	                return arguments[0];
	            }
	        }
	        else {
	            count = 0;
	        }
	        return func.apply(undefined, arguments);
	    };
	}
	exports.default = shortOut;
	});

	var _setData = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseSetData_js_1 = _baseSetData;
	var _shortOut_js_1 = _shortOut;
	var setData = _shortOut_js_1.default(_baseSetData_js_1.default);
	exports.default = setData;
	});

	var _getWrapDetails = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
	function getWrapDetails(source) {
	    var match = source.match(reWrapDetails);
	    return match ? match[1].split(reSplitDetails) : [];
	}
	exports.default = getWrapDetails;
	});

	var _insertWrapDetails = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
	function insertWrapDetails(source, details) {
	    var length = details.length;
	    if (!length) {
	        return source;
	    }
	    var lastIndex = length - 1;
	    details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
	    details = details.join(length > 2 ? ', ' : ' ');
	    return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
	}
	exports.default = insertWrapDetails;
	});

	var constant_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function constant(value) {
	    return function () {
	        return value;
	    };
	}
	exports.default = constant;
	});

	var _defineProperty = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _getNative_js_1 = _getNative;
	var defineProperty = (function () {
	    try {
	        var func = _getNative_js_1.default(Object, 'defineProperty');
	        func({}, '', {});
	        return func;
	    }
	    catch (e) { }
	}());
	exports.default = defineProperty;
	});

	var _baseSetToString = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var constant_js_1 = constant_1;
	var _defineProperty_js_1 = _defineProperty;
	var identity_js_1 = identity_1;
	var baseSetToString = !_defineProperty_js_1.default ? identity_js_1.default : function (func, string) {
	    return _defineProperty_js_1.default(func, 'toString', {
	        'configurable': true,
	        'enumerable': false,
	        'value': constant_js_1.default(string),
	        'writable': true
	    });
	};
	exports.default = baseSetToString;
	});

	var _setToString = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseSetToString_js_1 = _baseSetToString;
	var _shortOut_js_1 = _shortOut;
	var setToString = _shortOut_js_1.default(_baseSetToString_js_1.default);
	exports.default = setToString;
	});

	var _arrayEach = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function arrayEach(array, iteratee) {
	    var index = -1, length = array == null ? 0 : array.length;
	    while (++index < length) {
	        if (iteratee(array[index], index, array) === false) {
	            break;
	        }
	    }
	    return array;
	}
	exports.default = arrayEach;
	});

	var _baseFindIndex = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
	    while ((fromRight ? index-- : ++index < length)) {
	        if (predicate(array[index], index, array)) {
	            return index;
	        }
	    }
	    return -1;
	}
	exports.default = baseFindIndex;
	});

	var _baseIsNaN = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function baseIsNaN(value) {
	    return value !== value;
	}
	exports.default = baseIsNaN;
	});

	var _strictIndexOf = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function strictIndexOf(array, value, fromIndex) {
	    var index = fromIndex - 1, length = array.length;
	    while (++index < length) {
	        if (array[index] === value) {
	            return index;
	        }
	    }
	    return -1;
	}
	exports.default = strictIndexOf;
	});

	var _baseIndexOf = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseFindIndex_js_1 = _baseFindIndex;
	var _baseIsNaN_js_1 = _baseIsNaN;
	var _strictIndexOf_js_1 = _strictIndexOf;
	function baseIndexOf(array, value, fromIndex) {
	    return value === value
	        ? _strictIndexOf_js_1.default(array, value, fromIndex)
	        : _baseFindIndex_js_1.default(array, _baseIsNaN_js_1.default, fromIndex);
	}
	exports.default = baseIndexOf;
	});

	var _arrayIncludes = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseIndexOf_js_1 = _baseIndexOf;
	function arrayIncludes(array, value) {
	    var length = array == null ? 0 : array.length;
	    return !!length && _baseIndexOf_js_1.default(array, value, 0) > -1;
	}
	exports.default = arrayIncludes;
	});

	var _updateWrapDetails = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _arrayEach_js_1 = _arrayEach;
	var _arrayIncludes_js_1 = _arrayIncludes;
	var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
	var wrapFlags = [
	    ['ary', WRAP_ARY_FLAG],
	    ['bind', WRAP_BIND_FLAG],
	    ['bindKey', WRAP_BIND_KEY_FLAG],
	    ['curry', WRAP_CURRY_FLAG],
	    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
	    ['flip', WRAP_FLIP_FLAG],
	    ['partial', WRAP_PARTIAL_FLAG],
	    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
	    ['rearg', WRAP_REARG_FLAG]
	];
	function updateWrapDetails(details, bitmask) {
	    _arrayEach_js_1.default(wrapFlags, function (pair) {
	        var value = '_.' + pair[0];
	        if ((bitmask & pair[1]) && !_arrayIncludes_js_1.default(details, value)) {
	            details.push(value);
	        }
	    });
	    return details.sort();
	}
	exports.default = updateWrapDetails;
	});

	var _setWrapToString = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _getWrapDetails_js_1 = _getWrapDetails;
	var _insertWrapDetails_js_1 = _insertWrapDetails;
	var _setToString_js_1 = _setToString;
	var _updateWrapDetails_js_1 = _updateWrapDetails;
	function setWrapToString(wrapper, reference, bitmask) {
	    var source = (reference + '');
	    return _setToString_js_1.default(wrapper, _insertWrapDetails_js_1.default(source, _updateWrapDetails_js_1.default(_getWrapDetails_js_1.default(source), bitmask)));
	}
	exports.default = setWrapToString;
	});

	var _createRecurry = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _isLaziable_js_1 = _isLaziable;
	var _setData_js_1 = _setData;
	var _setWrapToString_js_1 = _setWrapToString;
	var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64;
	function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
	    var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
	    bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
	    bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
	    if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
	        bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
	    }
	    var newData = [
	        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
	        newHoldersRight, argPos, ary, arity
	    ];
	    var result = wrapFunc.apply(undefined, newData);
	    if (_isLaziable_js_1.default(func)) {
	        _setData_js_1.default(result, newData);
	    }
	    result.placeholder = placeholder;
	    return _setWrapToString_js_1.default(result, func, bitmask);
	}
	exports.default = createRecurry;
	});

	var _getHolder = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function getHolder(func) {
	    var object = func;
	    return object.placeholder;
	}
	exports.default = getHolder;
	});

	var _isIndex = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var MAX_SAFE_INTEGER = 9007199254740991;
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	function isIndex(value, length) {
	    length = length == null ? MAX_SAFE_INTEGER : length;
	    return !!length &&
	        (typeof value == 'number' || reIsUint.test(value)) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}
	exports.default = isIndex;
	});

	var _reorder = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _copyArray_js_1 = _copyArray;
	var _isIndex_js_1 = _isIndex;
	var nativeMin = Math.min;
	function reorder(array, indexes) {
	    var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = _copyArray_js_1.default(array);
	    while (length--) {
	        var index = indexes[length];
	        array[length] = _isIndex_js_1.default(index, arrLength) ? oldArray[index] : undefined;
	    }
	    return array;
	}
	exports.default = reorder;
	});

	var _replaceHolders = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var PLACEHOLDER = '__lodash_placeholder__';
	function replaceHolders(array, placeholder) {
	    var index = -1, length = array.length, resIndex = 0, result = [];
	    while (++index < length) {
	        var value = array[index];
	        if (value === placeholder || value === PLACEHOLDER) {
	            array[index] = PLACEHOLDER;
	            result[resIndex++] = index;
	        }
	    }
	    return result;
	}
	exports.default = replaceHolders;
	});

	var _createHybrid = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _composeArgs_js_1 = _composeArgs;
	var _composeArgsRight_js_1 = _composeArgsRight;
	var _countHolders_js_1 = _countHolders;
	var _createCtor_js_1 = _createCtor;
	var _createRecurry_js_1 = _createRecurry;
	var _getHolder_js_1 = _getHolder;
	var _reorder_js_1 = _reorder;
	var _replaceHolders_js_1 = _replaceHolders;
	var _root_js_1 = _root;
	var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_ARY_FLAG = 128, WRAP_FLIP_FLAG = 512;
	function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	    var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined : _createCtor_js_1.default(func);
	    function wrapper() {
	        var length = arguments.length, args = Array(length), index = length;
	        while (index--) {
	            args[index] = arguments[index];
	        }
	        if (isCurried) {
	            var placeholder = _getHolder_js_1.default(wrapper), holdersCount = _countHolders_js_1.default(args, placeholder);
	        }
	        if (partials) {
	            args = _composeArgs_js_1.default(args, partials, holders, isCurried);
	        }
	        if (partialsRight) {
	            args = _composeArgsRight_js_1.default(args, partialsRight, holdersRight, isCurried);
	        }
	        length -= holdersCount;
	        if (isCurried && length < arity) {
	            var newHolders = _replaceHolders_js_1.default(args, placeholder);
	            return _createRecurry_js_1.default(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
	        }
	        var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
	        length = args.length;
	        if (argPos) {
	            args = _reorder_js_1.default(args, argPos);
	        }
	        else if (isFlip && length > 1) {
	            args.reverse();
	        }
	        if (isAry && ary < length) {
	            args.length = ary;
	        }
	        if (this && this !== _root_js_1.default && this instanceof wrapper) {
	            fn = Ctor || _createCtor_js_1.default(fn);
	        }
	        return fn.apply(thisBinding, args);
	    }
	    return wrapper;
	}
	exports.default = createHybrid;
	});

	var _createCurry = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _apply_js_1 = _apply;
	var _createCtor_js_1 = _createCtor;
	var _createHybrid_js_1 = _createHybrid;
	var _createRecurry_js_1 = _createRecurry;
	var _getHolder_js_1 = _getHolder;
	var _replaceHolders_js_1 = _replaceHolders;
	var _root_js_1 = _root;
	function createCurry(func, bitmask, arity) {
	    var Ctor = _createCtor_js_1.default(func);
	    function wrapper() {
	        var length = arguments.length, args = Array(length), index = length, placeholder = _getHolder_js_1.default(wrapper);
	        while (index--) {
	            args[index] = arguments[index];
	        }
	        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
	            ? []
	            : _replaceHolders_js_1.default(args, placeholder);
	        length -= holders.length;
	        if (length < arity) {
	            return _createRecurry_js_1.default(func, bitmask, _createHybrid_js_1.default, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
	        }
	        var fn = (this && this !== _root_js_1.default && this instanceof wrapper) ? Ctor : func;
	        return _apply_js_1.default(fn, this, args);
	    }
	    return wrapper;
	}
	exports.default = createCurry;
	});

	var _createPartial = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _apply_js_1 = _apply;
	var _createCtor_js_1 = _createCtor;
	var _root_js_1 = _root;
	var WRAP_BIND_FLAG = 1;
	function createPartial(func, bitmask, thisArg, partials) {
	    var isBind = bitmask & WRAP_BIND_FLAG, Ctor = _createCtor_js_1.default(func);
	    function wrapper() {
	        var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = (this && this !== _root_js_1.default && this instanceof wrapper) ? Ctor : func;
	        while (++leftIndex < leftLength) {
	            args[leftIndex] = partials[leftIndex];
	        }
	        while (argsLength--) {
	            args[leftIndex++] = arguments[++argsIndex];
	        }
	        return _apply_js_1.default(fn, isBind ? thisArg : this, args);
	    }
	    return wrapper;
	}
	exports.default = createPartial;
	});

	var _mergeData = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _composeArgs_js_1 = _composeArgs;
	var _composeArgsRight_js_1 = _composeArgsRight;
	var _replaceHolders_js_1 = _replaceHolders;
	var PLACEHOLDER = '__lodash_placeholder__';
	var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256;
	var nativeMin = Math.min;
	function mergeData(data, source) {
	    var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
	    var isCombo = ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
	        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
	        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));
	    if (!(isCommon || isCombo)) {
	        return data;
	    }
	    if (srcBitmask & WRAP_BIND_FLAG) {
	        data[2] = source[2];
	        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
	    }
	    var value = source[3];
	    if (value) {
	        var partials = data[3];
	        data[3] = partials ? _composeArgs_js_1.default(partials, value, source[4]) : value;
	        data[4] = partials ? _replaceHolders_js_1.default(data[3], PLACEHOLDER) : source[4];
	    }
	    value = source[5];
	    if (value) {
	        partials = data[5];
	        data[5] = partials ? _composeArgsRight_js_1.default(partials, value, source[6]) : value;
	        data[6] = partials ? _replaceHolders_js_1.default(data[5], PLACEHOLDER) : source[6];
	    }
	    value = source[7];
	    if (value) {
	        data[7] = value;
	    }
	    if (srcBitmask & WRAP_ARY_FLAG) {
	        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	    }
	    if (data[9] == null) {
	        data[9] = source[9];
	    }
	    data[0] = source[0];
	    data[1] = newBitmask;
	    return data;
	}
	exports.default = mergeData;
	});

	var isSymbol_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseGetTag_js_1 = _baseGetTag;
	var isObjectLike_js_1 = isObjectLike_1;
	var symbolTag = '[object Symbol]';
	function isSymbol(value) {
	    return typeof value == 'symbol' ||
	        (isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == symbolTag);
	}
	exports.default = isSymbol;
	});

	var toNumber_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var isObject_js_1 = isObject_1;
	var isSymbol_js_1 = isSymbol_1;
	var NAN = 0 / 0;
	var reTrim = /^\s+|\s+$/g;
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	var reIsBinary = /^0b[01]+$/i;
	var reIsOctal = /^0o[0-7]+$/i;
	var freeParseInt = parseInt;
	function toNumber(value) {
	    if (typeof value == 'number') {
	        return value;
	    }
	    if (isSymbol_js_1.default(value)) {
	        return NAN;
	    }
	    if (isObject_js_1.default(value)) {
	        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	        value = isObject_js_1.default(other) ? (other + '') : other;
	    }
	    if (typeof value != 'string') {
	        return value === 0 ? value : +value;
	    }
	    value = value.replace(reTrim, '');
	    var isBinary = reIsBinary.test(value);
	    return (isBinary || reIsOctal.test(value))
	        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	        : (reIsBadHex.test(value) ? NAN : +value);
	}
	exports.default = toNumber;
	});

	var toFinite_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var toNumber_js_1 = toNumber_1;
	var INFINITY = 1 / 0, MAX_INTEGER = 1.7976931348623157e+308;
	function toFinite(value) {
	    if (!value) {
	        return value === 0 ? value : 0;
	    }
	    value = toNumber_js_1.default(value);
	    if (value === INFINITY || value === -INFINITY) {
	        var sign = (value < 0 ? -1 : 1);
	        return sign * MAX_INTEGER;
	    }
	    return value === value ? value : 0;
	}
	exports.default = toFinite;
	});

	var toInteger_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var toFinite_js_1 = toFinite_1;
	function toInteger(value) {
	    var result = toFinite_js_1.default(value), remainder = result % 1;
	    return result === result ? (remainder ? result - remainder : result) : 0;
	}
	exports.default = toInteger;
	});

	var _createWrap = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseSetData_js_1 = _baseSetData;
	var _createBind_js_1 = _createBind;
	var _createCurry_js_1 = _createCurry;
	var _createHybrid_js_1 = _createHybrid;
	var _createPartial_js_1 = _createPartial;
	var _getData_js_1 = _getData;
	var _mergeData_js_1 = _mergeData;
	var _setData_js_1 = _setData;
	var _setWrapToString_js_1 = _setWrapToString;
	var toInteger_js_1 = toInteger_1;
	var FUNC_ERROR_TEXT = 'Expected a function';
	var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64;
	var nativeMax = Math.max;
	function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	    var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
	    if (!isBindKey && typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	    }
	    var length = partials ? partials.length : 0;
	    if (!length) {
	        bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
	        partials = holders = undefined;
	    }
	    ary = ary === undefined ? ary : nativeMax(toInteger_js_1.default(ary), 0);
	    arity = arity === undefined ? arity : toInteger_js_1.default(arity);
	    length -= holders ? holders.length : 0;
	    if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
	        var partialsRight = partials, holdersRight = holders;
	        partials = holders = undefined;
	    }
	    var data = isBindKey ? undefined : _getData_js_1.default(func);
	    var newData = [
	        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
	        argPos, ary, arity
	    ];
	    if (data) {
	        _mergeData_js_1.default(newData, data);
	    }
	    func = newData[0];
	    bitmask = newData[1];
	    thisArg = newData[2];
	    partials = newData[3];
	    holders = newData[4];
	    arity = newData[9] = newData[9] === undefined
	        ? (isBindKey ? 0 : func.length)
	        : nativeMax(newData[9] - length, 0);
	    if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
	        bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
	    }
	    if (!bitmask || bitmask == WRAP_BIND_FLAG) {
	        var result = _createBind_js_1.default(func, bitmask, thisArg);
	    }
	    else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
	        result = _createCurry_js_1.default(func, bitmask, arity);
	    }
	    else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
	        result = _createPartial_js_1.default(func, bitmask, thisArg, partials);
	    }
	    else {
	        result = _createHybrid_js_1.default.apply(undefined, newData);
	    }
	    var setter = data ? _baseSetData_js_1.default : _setData_js_1.default;
	    return _setWrapToString_js_1.default(setter(result, newData), func, bitmask);
	}
	exports.default = createWrap;
	});

	var curry_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createWrap_js_1 = _createWrap;
	var WRAP_CURRY_FLAG = 8;
	function curry(func, arity, guard) {
	    arity = guard ? undefined : arity;
	    var result = _createWrap_js_1.default(func, WRAP_CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
	    result.placeholder = curry.placeholder;
	    return result;
	}
	curry.placeholder = {};
	exports.default = curry;
	});

	var curry = unwrapExports(curry_1);

	var _arrayPush = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function arrayPush(array, values) {
	    var index = -1, length = values.length, offset = array.length;
	    while (++index < length) {
	        array[offset + index] = values[index];
	    }
	    return array;
	}
	exports.default = arrayPush;
	});

	var _baseIsArguments = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseGetTag_js_1 = _baseGetTag;
	var isObjectLike_js_1 = isObjectLike_1;
	var argsTag = '[object Arguments]';
	function baseIsArguments(value) {
	    return isObjectLike_js_1.default(value) && _baseGetTag_js_1.default(value) == argsTag;
	}
	exports.default = baseIsArguments;
	});

	var isArguments_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseIsArguments_js_1 = _baseIsArguments;
	var isObjectLike_js_1 = isObjectLike_1;
	var objectProto = Object.prototype;
	var hasOwnProperty = objectProto.hasOwnProperty;
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var isArguments = _baseIsArguments_js_1.default(function () { return arguments; }()) ? _baseIsArguments_js_1.default : function (value) {
	    return isObjectLike_js_1.default(value) && hasOwnProperty.call(value, 'callee') &&
	        !propertyIsEnumerable.call(value, 'callee');
	};
	exports.default = isArguments;
	});

	var _isFlattenable = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _Symbol_js_1 = _Symbol;
	var isArguments_js_1 = isArguments_1;
	var isArray_js_1 = isArray_1;
	var spreadableSymbol = _Symbol_js_1.default ? _Symbol_js_1.default.isConcatSpreadable : undefined;
	function isFlattenable(value) {
	    return isArray_js_1.default(value) || isArguments_js_1.default(value) ||
	        !!(spreadableSymbol && value && value[spreadableSymbol]);
	}
	exports.default = isFlattenable;
	});

	var _baseFlatten = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _arrayPush_js_1 = _arrayPush;
	var _isFlattenable_js_1 = _isFlattenable;
	function baseFlatten(array, depth, predicate, isStrict, result) {
	    var index = -1, length = array.length;
	    predicate || (predicate = _isFlattenable_js_1.default);
	    result || (result = []);
	    while (++index < length) {
	        var value = array[index];
	        if (depth > 0 && predicate(value)) {
	            if (depth > 1) {
	                baseFlatten(value, depth - 1, predicate, isStrict, result);
	            }
	            else {
	                _arrayPush_js_1.default(result, value);
	            }
	        }
	        else if (!isStrict) {
	            result[result.length] = value;
	        }
	    }
	    return result;
	}
	exports.default = baseFlatten;
	});

	var flatten_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseFlatten_js_1 = _baseFlatten;
	function flatten(array) {
	    var length = array == null ? 0 : array.length;
	    return length ? _baseFlatten_js_1.default(array, 1) : [];
	}
	exports.default = flatten;
	});

	var _overRest = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _apply_js_1 = _apply;
	var nativeMax = Math.max;
	function overRest(func, start, transform) {
	    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	    return function () {
	        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
	        while (++index < length) {
	            array[index] = args[start + index];
	        }
	        index = -1;
	        var otherArgs = Array(start + 1);
	        while (++index < start) {
	            otherArgs[index] = args[index];
	        }
	        otherArgs[start] = transform(array);
	        return _apply_js_1.default(func, this, otherArgs);
	    };
	}
	exports.default = overRest;
	});

	var _flatRest = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var flatten_js_1 = flatten_1;
	var _overRest_js_1 = _overRest;
	var _setToString_js_1 = _setToString;
	function flatRest(func) {
	    return _setToString_js_1.default(_overRest_js_1.default(func, undefined, flatten_js_1.default), func + '');
	}
	exports.default = flatRest;
	});

	var _createFlow = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _LodashWrapper_js_1 = _LodashWrapper;
	var _flatRest_js_1 = _flatRest;
	var _getData_js_1 = _getData;
	var _getFuncName_js_1 = _getFuncName;
	var isArray_js_1 = isArray_1;
	var _isLaziable_js_1 = _isLaziable;
	var FUNC_ERROR_TEXT = 'Expected a function';
	var WRAP_CURRY_FLAG = 8, WRAP_PARTIAL_FLAG = 32, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256;
	function createFlow(fromRight) {
	    return _flatRest_js_1.default(function (funcs) {
	        var length = funcs.length, index = length, prereq = _LodashWrapper_js_1.default.prototype.thru;
	        if (fromRight) {
	            funcs.reverse();
	        }
	        while (index--) {
	            var func = funcs[index];
	            if (typeof func != 'function') {
	                throw new TypeError(FUNC_ERROR_TEXT);
	            }
	            if (prereq && !wrapper && _getFuncName_js_1.default(func) == 'wrapper') {
	                var wrapper = new _LodashWrapper_js_1.default([], true);
	            }
	        }
	        index = wrapper ? index : length;
	        while (++index < length) {
	            func = funcs[index];
	            var funcName = _getFuncName_js_1.default(func), data = funcName == 'wrapper' ? _getData_js_1.default(func) : undefined;
	            if (data && _isLaziable_js_1.default(data[0]) &&
	                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
	                !data[4].length && data[9] == 1) {
	                wrapper = wrapper[_getFuncName_js_1.default(data[0])].apply(wrapper, data[3]);
	            }
	            else {
	                wrapper = (func.length == 1 && _isLaziable_js_1.default(func))
	                    ? wrapper[funcName]()
	                    : wrapper.thru(func);
	            }
	        }
	        return function () {
	            var args = arguments, value = args[0];
	            if (wrapper && args.length == 1 && isArray_js_1.default(value)) {
	                return wrapper.plant(value).value();
	            }
	            var index = 0, result = length ? funcs[index].apply(this, args) : value;
	            while (++index < length) {
	                result = funcs[index].call(this, result);
	            }
	            return result;
	        };
	    });
	}
	exports.default = createFlow;
	});

	var flowRight_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _createFlow_js_1 = _createFlow;
	var flowRight = _createFlow_js_1.default(true);
	exports.default = flowRight;
	});

	var flowRight = unwrapExports(flowRight_1);

	var compose = flowRight;
	var chain = curry(function (f, m) {
	    return m.chain(f);
	});
	var map = curry(function (f, m) {
	    return m.map(f);
	});
	var filterArray = curry(function (f, arr) {
	    return filter(arr, f);
	});
	var forEachArray = curry(function (f, arr) {
	    return forEach(arr, f);
	});

	var getUID = requireCheckFunc(function (index, ThreeDTransformData) {
	    it("index should exist", function () {
	        wdet_1(index).exist;
	    });
	    it("transform should exist", function () {
	        wdet_1(ThreeDTransformData.transformMap[index]).exist;
	    });
	}, function (index, ThreeDTransformData) {
	    return ThreeDTransformData.transformMap[index].uid;
	});
	var isIndexUsed = ensureFunc(function (isExist, index, ThreeDTransformData) {
	}, function (index, ThreeDTransformData) {
	    return isValidMapValue(ThreeDTransformData.transformMap[index]);
	});
	var getStartIndexInArrayBuffer = function () { return 1; };

	var removeChildEntity = function (children, targetUID) {
	    for (var i = 0, len = children.length; i < len; ++i) {
	        if (children[i].uid === targetUID) {
	            children.splice(i, 1);
	            break;
	        }
	    }
	};

	var getParent$2 = requireCheckFunc(function (uid, ThreeDTransformData) {
	    it("uid should exist", function () {
	        wdet_1(uid).exist;
	    });
	}, function (uid, ThreeDTransformData) {
	    return ThreeDTransformData.parentMap[uid];
	});
	var setParent$1 = requireCheckFunc(function (transform, parent, ThreeDTransformData) {
	    it("parent should not be self", function () {
	        if (parent !== null) {
	            wdet_1(_isTransformEqual(transform, parent)).false;
	        }
	    });
	}, function (transform, parent, ThreeDTransformData) {
	    var index = transform.index, uid = transform.uid, parentIndexInArrayBuffer = null, currentParent = getParent$2(uid, ThreeDTransformData), isCurrentParentExisit = isParentExist(currentParent);
	    if (parent === null) {
	        if (isCurrentParentExisit) {
	            _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
	            addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
	        }
	        return;
	    }
	    parentIndexInArrayBuffer = parent.index;
	    if (isCurrentParentExisit) {
	        if (isNotChangeParent(currentParent.index, parentIndexInArrayBuffer)) {
	            return;
	        }
	        _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
	    }
	    _addToParent(uid, transform, parent, ThreeDTransformData);
	    addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
	});
	var _isTransformEqual = function (tra1, tra2) { return tra1.uid === tra2.uid; };
	var getChildren$1 = function (uid, ThreeDTransformData) {
	    return ThreeDTransformData.childrenMap[uid];
	};
	var isParentExist = function (parent) { return isNotUndefined(parent); };
	var isChildrenExist = function (children) { return isNotUndefined(children); };
	var isNotChangeParent = function (currentParentIndexInArrayBuffer, newParentIndexInArrayBuffer) {
	    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
	};
	var removeHierarchyData = function (uid, ThreeDTransformData) {
	    deleteVal(uid, ThreeDTransformData.childrenMap);
	};
	var _removeHierarchyFromParent = function (parent, targetUID, ThreeDTransformData) {
	    var parentUID = parent.uid, children = getChildren$1(parentUID, ThreeDTransformData);
	    deleteVal(targetUID, ThreeDTransformData.parentMap);
	    if (isNotValidMapValue(children)) {
	        return;
	    }
	    _removeChild(parentUID, targetUID, children, ThreeDTransformData);
	};
	var _removeChild = function (parentUID, targetUID, children, ThreeDTransformData) {
	    removeChildEntity(children, targetUID);
	};
	var _addChild$1 = requireCheckFunc(function (uid, child, ThreeDTransformData) {
	    it("children should be empty array if has no child", function () {
	        wdet_1(getChildren$1(uid, ThreeDTransformData)).be.a("array");
	    });
	}, function (uid, child, ThreeDTransformData) {
	    var children = getChildren$1(uid, ThreeDTransformData);
	    children.push(child);
	});
	var setChildren$1 = function (uid, children, ThreeDTransformData) {
	    ThreeDTransformData.childrenMap[uid] = children;
	};
	var _setParent$1 = function (uid, parent, ThreeDTransformData) {
	    ThreeDTransformData.parentMap[uid] = parent;
	};
	var _addToParent = requireCheckFunc(function (targetUID, target, parent, ThreeDTransformData) {
	    it("the child one should not has parent", function () {
	        wdet_1(isValidMapValue(getParent$2(targetUID, ThreeDTransformData))).false;
	    });
	    it("parent should not already has the child", function () {
	        var parentUID = parent.uid, children = getChildren$1(parentUID, ThreeDTransformData);
	        if (isValidMapValue(children)) {
	            wdet_1(children.indexOf(target)).equal(-1);
	        }
	    });
	}, function (targetUID, target, parent, ThreeDTransformData) {
	    var parentUID = parent.uid;
	    _setParent$1(targetUID, parent, ThreeDTransformData);
	    _addChild$1(parentUID, target, ThreeDTransformData);
	});

	var getMatrix3DataSize = function () { return 9; };
	var getMatrix4DataSize = function () { return 16; };
	var getVector3DataSize = function () { return 3; };
	var getQuaternionDataSize = function () { return 4; };

	var getSubarray = function (typeArr, startIndex, endIndex) {
	    return typeArr.subarray(startIndex, endIndex);
	};
	var deleteBySwapAndNotReset = function (sourceIndex, targetIndex, typeArr) {
	    typeArr[sourceIndex] = typeArr[targetIndex];
	};
	var deleteBySwapAndReset = function (sourceIndex, targetIndex, typeArr, length, defaultValueArr) {
	    for (var i = 0; i < length; i++) {
	        typeArr[sourceIndex + i] = typeArr[targetIndex + i];
	        typeArr[targetIndex + i] = defaultValueArr[i];
	    }
	};
	var deleteSingleValueBySwapAndReset = function (sourceIndex, lastIndex, typeArr, resetValue) {
	    typeArr[sourceIndex] = typeArr[lastIndex];
	    typeArr[lastIndex] = resetValue;
	};
	var deleteOneItemBySwapAndReset = function (sourceIndex, targetIndex, typeArr, defaultValue) {
	    typeArr[sourceIndex] = typeArr[targetIndex];
	    typeArr[targetIndex] = defaultValue;
	};
	var set = function (typeArr, valArr, offset) {
	    if (offset === void 0) { offset = 0; }
	    typeArr.set(valArr, offset);
	};
	var setMatrices3 = function (typeArr, mat, index) {
	    var values = mat.values;
	    typeArr[index] = values[0];
	    typeArr[index + 1] = values[1];
	    typeArr[index + 2] = values[2];
	    typeArr[index + 3] = values[3];
	    typeArr[index + 4] = values[4];
	    typeArr[index + 5] = values[5];
	    typeArr[index + 6] = values[6];
	    typeArr[index + 7] = values[7];
	    typeArr[index + 8] = values[8];
	};
	var setMatrices = function (typeArr, mat, index) {
	    var values = mat.values;
	    typeArr[index] = values[0];
	    typeArr[index + 1] = values[1];
	    typeArr[index + 2] = values[2];
	    typeArr[index + 3] = values[3];
	    typeArr[index + 4] = values[4];
	    typeArr[index + 5] = values[5];
	    typeArr[index + 6] = values[6];
	    typeArr[index + 7] = values[7];
	    typeArr[index + 8] = values[8];
	    typeArr[index + 9] = values[9];
	    typeArr[index + 10] = values[10];
	    typeArr[index + 11] = values[11];
	    typeArr[index + 12] = values[12];
	    typeArr[index + 13] = values[13];
	    typeArr[index + 14] = values[14];
	    typeArr[index + 15] = values[15];
	};
	var setMatrix4ByIndex = requireCheckFunc(function (mat, typeArr, index) {
	    it("should not exceed type arr's length", function () {
	        wdet_1(index + 15).lte(typeArr.length - 1);
	    });
	}, function (mat, typeArr, index) {
	    mat.set(typeArr[index], typeArr[index + 1], typeArr[index + 2], typeArr[index + 3], typeArr[index + 4], typeArr[index + 5], typeArr[index + 6], typeArr[index + 7], typeArr[index + 8], typeArr[index + 9], typeArr[index + 10], typeArr[index + 11], typeArr[index + 12], typeArr[index + 13], typeArr[index + 14], typeArr[index + 15]);
	    return mat;
	});
	var setVectors = function (typeArr, vec, index) {
	    var values = vec.values;
	    typeArr[index] = values[0];
	    typeArr[index + 1] = values[1];
	    typeArr[index + 2] = values[2];
	};
	var setVector3ByIndex = requireCheckFunc(function (vec, typeArr, index) {
	    it("should not exceed type arr's length", function () {
	        wdet_1(index + 2).lte(typeArr.length - 1);
	    });
	}, function (vec, typeArr, index) {
	    var values = vec.values;
	    values[0] = typeArr[index];
	    values[1] = typeArr[index + 1];
	    values[2] = typeArr[index + 2];
	    return vec;
	});
	var setQuaternions = function (typeArr, qua, index) {
	    typeArr[index] = qua.x;
	    typeArr[index + 1] = qua.y;
	    typeArr[index + 2] = qua.z;
	    typeArr[index + 3] = qua.z;
	};
	var setQuaternionByIndex = requireCheckFunc(function (qua, typeArr, index) {
	    it("should not exceed type arr's length", function () {
	        wdet_1(index + 3).lte(typeArr.length - 1);
	    });
	}, function (qua, typeArr, index) {
	    qua.set(typeArr[index], typeArr[index + 1], typeArr[index + 2], typeArr[index + 3]);
	    return qua;
	});

	var createMatrix4ByIndex = function (mat, typeArr, index) {
	    return setMatrix4ByIndex(mat, typeArr, index);
	};
	var createVector3ByIndex = function (vec, typeArr, index) {
	    return setVector3ByIndex(vec, typeArr, index);
	};
	var fillTypeArr = requireCheckFunc(function (typeArr, dataArr, startIndex, count) {
	    it("should not exceed type arr's length", function () {
	        wdet_1(count + startIndex).lte(typeArr.length);
	    });
	}, function (typeArr, dataArr, startIndex, count) {
	    typeArr.set(dataArr, startIndex);
	});
	var setTypeArrayValue = requireCheckFunc(function (typeArr, index, value) {
	    it("should not exceed type arr's length", function () {
	        wdet_1(index).lte(typeArr.length - 1);
	    });
	}, function (typeArr, index, value) {
	    typeArr[index] = value;
	});
	var setSingleValue = function (typeArr, index, value) {
	    var size = 1, i = index * size;
	    setTypeArrayValue(typeArr, i, value);
	};
	var computeBufferLength = function (count, size) { return count * size; };

	var swap$$1 = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
	    it("source index and target index should be used", function () {
	        wdet_1(isIndexUsed(index1, ThreeDTransformData)).true;
	        wdet_1(isIndexUsed(index2, ThreeDTransformData)).true;
	    });
	}, function (index1, index2, ThreeDTransformData) {
	    swapTypeArrData(index1, index2, ThreeDTransformData);
	    swapTransformMapData(index1, index2, ThreeDTransformData);
	    return ThreeDTransformData;
	});
	var swapTransformMapData = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
	    it("source index and target index should be used", function () {
	        wdet_1(isIndexUsed(index1, ThreeDTransformData)).true;
	        wdet_1(isIndexUsed(index2, ThreeDTransformData)).true;
	    });
	}, function (index1, index2, ThreeDTransformData) {
	    return _changeMapData(index1, index2, _swapTransformMap, ThreeDTransformData);
	});
	var swapTypeArrData = function (index1, index2, ThreeDTransformData) {
	    return _changeTypeArrData(index1, index2, _swapTypeArr, ThreeDTransformData);
	};
	var _swapTypeArr = function (dataArr, index1, index2, length) {
	    for (var i = 0; i < length; i++) {
	        var newIndex1 = index1 + i, newIndex2 = index2 + i, temp = dataArr[newIndex2];
	        dataArr[newIndex2] = dataArr[newIndex1];
	        dataArr[newIndex1] = temp;
	    }
	};
	var _swapTransformMap = function (transformMap, sourceIndex, targetIndex) {
	    var sourceTransform = transformMap[sourceIndex], targetTransform = transformMap[targetIndex];
	    sourceTransform.index = targetIndex;
	    targetTransform.index = sourceIndex;
	    transformMap[targetIndex] = sourceTransform;
	    transformMap[sourceIndex] = targetTransform;
	};
	var _changeTypeArrData = function (sourceIndex, targetIndex, changeFunc, ThreeDTransformData) {
	    if (sourceIndex === targetIndex) {
	        return ThreeDTransformData;
	    }
	    var mat4SourceIndex = getMatrix4DataIndexInArrayBuffer(sourceIndex), mat4TargetIndex = getMatrix4DataIndexInArrayBuffer(targetIndex), mat4Size = getMatrix4DataSize(), vec3SourceIndex = getVector3DataIndexInArrayBuffer(sourceIndex), vec3TargetIndex = getVector3DataIndexInArrayBuffer(targetIndex), vec3Size = getVector3DataSize(), quaSourceIndex = getQuaternionDataIndexInArrayBuffer(sourceIndex), quaTargetIndex = getQuaternionDataIndexInArrayBuffer(targetIndex), quaSize = getQuaternionDataSize();
	    changeFunc(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
	    changeFunc(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
	    changeFunc(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
	    _changeLocalScaleData(vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc);
	    return ThreeDTransformData;
	};
	var _changeLocalScaleData = requireCheckFunc(function (vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc) {
	    it("source localScale data shouldn't be [0,0,0]", function () {
	        if (ThreeDTransformData.localScales[vec3SourceIndex] === 0
	            && ThreeDTransformData.localScales[vec3SourceIndex + 1] === 0
	            && ThreeDTransformData.localScales[vec3SourceIndex + 2] === 0) {
	            wdet_1(false).true;
	        }
	    });
	}, function (vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc) {
	    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
	});
	var _changeMapData = function (sourceIndex, targetIndex, changeFunc, ThreeDTransformData) {
	    if (sourceIndex === targetIndex) {
	        return ThreeDTransformData;
	    }
	    changeFunc(ThreeDTransformData.transformMap, sourceIndex, targetIndex);
	    return ThreeDTransformData;
	};
	var _moveToTypeArr = function (dataArr, sourceIndex, targetIndex, length) {
	    for (var i = 0; i < length; i++) {
	        var newIndex1 = sourceIndex + i, newIndex2 = targetIndex + i;
	        dataArr[newIndex2] = dataArr[newIndex1];
	    }
	};
	var _moveToTransformMap = function (transformMap, sourceIndex, targetIndex) {
	    var sourceTransform = transformMap[sourceIndex];
	    sourceTransform.index = targetIndex;
	    transformMap[targetIndex] = sourceTransform;
	    deleteVal(sourceIndex, transformMap);
	};
	var moveToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
	    it("source index should not be used", function () {
	        wdet_1(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
	    });
	}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
	    it("source index should be used", function () {
	        wdet_1(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
	    });
	    it("target index should not be used", function () {
	        wdet_1(isIndexUsed(targetIndex, ThreeDTransformData)).false;
	    });
	}, function (sourceIndex, targetIndex, ThreeDTransformData) {
	    moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
	    moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
	    addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
	    return ThreeDTransformData;
	}));
	var moveMapDataToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
	    it("source index should not be used", function () {
	        wdet_1(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
	    });
	}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
	    it("source index should be used", function () {
	        wdet_1(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
	    });
	    it("target index should not be used", function () {
	        wdet_1(isIndexUsed(targetIndex, ThreeDTransformData)).false;
	    });
	}, function (sourceIndex, targetIndex, ThreeDTransformData) {
	    return _changeMapData(sourceIndex, targetIndex, _moveToTransformMap, ThreeDTransformData);
	}));
	var moveTypeArrDataToIndex = function (sourceIndex, targetIndex, ThreeDTransformData) {
	    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
	};
	var setTransformDataInTypeArr = function (index, mat, qua, positionVec, scaleVec, ThreeDTransformData) {
	    setLocalRotationData(qua, getQuaternionDataIndexInArrayBuffer(index), ThreeDTransformData);
	    setLocalPositionData(positionVec, getVector3DataIndexInArrayBuffer(index), ThreeDTransformData);
	    setLocalScaleData(scaleVec, getVector3DataIndexInArrayBuffer(index), ThreeDTransformData);
	    setLocalToWorldMatricesData(mat, getMatrix4DataIndexInArrayBuffer(index), ThreeDTransformData);
	};
	var setLocalToWorldMatricesData = function (mat, mat4IndexInArrayBuffer, ThreeDTransformData) {
	    setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
	};
	var setLocalPositionData = function (position, vec3IndexInArrayBuffer, ThreeDTransformData) {
	    setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
	    return ThreeDTransformData;
	};
	var setLocalRotationData = function (qua, quaIndexInArrayBuffer, ThreeDTransformData) {
	    setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);
	    return ThreeDTransformData;
	};
	var setLocalScaleData = function (scale, vec3IndexInArrayBuffer, ThreeDTransformData) {
	    setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);
	    return ThreeDTransformData;
	};
	var setPositionData = function (index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData) {
	    if (isParentExist(parent)) {
	        var index_1 = parent.index;
	        setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix({
	            uid: getUID(index_1, ThreeDTransformData),
	            index: index_1
	        }, GlobalTempData.matrix4_3, ThreeDTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
	    }
	    else {
	        setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
	    }
	};
	var getMatrix4DataIndexInArrayBuffer = function (index) { return index * getMatrix4DataSize(); };
	var getVector3DataIndexInArrayBuffer = function (index) { return index * getVector3DataSize(); };
	var getQuaternionDataIndexInArrayBuffer = function (index) { return index * getQuaternionDataSize(); };

	var LinkList = (function () {
	    function LinkList() {
	        this._first = null;
	        this._last = null;
	    }
	    LinkList.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    LinkList.prototype.shift = function () {
	        var node = this._first;
	        if (node === null) {
	            return null;
	        }
	        this._first = node.next;
	        return node;
	    };
	    LinkList.prototype.push = function (node) {
	        if (this._last === null) {
	            this._first = node;
	            this._last = node;
	            return;
	        }
	        this._last.next = node;
	        this._last = node;
	    };
	    return LinkList;
	}());
	var LinkNode = (function () {
	    function LinkNode(val) {
	        this.val = null;
	        this.next = null;
	        this.val = val;
	    }
	    LinkNode.create = function (val) {
	        var obj = new this(val);
	        return obj;
	    };
	    return LinkNode;
	}());

	var addFirstDirtyIndex = ensureFunc(function (firstDirtyIndex, ThreeDTransformData) {
	    it("firstDirtyIndex should <= maxCount", function () {
	        wdet_1(firstDirtyIndex).lte(ThreeDTransformData.maxCount);
	    });
	}, function (ThreeDTransformData) {
	    return ThreeDTransformData.firstDirtyIndex + 1;
	});
	var minusFirstDirtyIndex = ensureFunc(function (firstDirtyIndex) {
	    it("firstDirtyIndex should >= start index:" + getStartIndexInArrayBuffer(), function () {
	        wdet_1(firstDirtyIndex).gte(getStartIndexInArrayBuffer());
	    });
	}, function (firstDirtyIndex) {
	    return firstDirtyIndex - 1;
	});
	var generateNotUsedIndexInArrayBuffer = ensureFunc(function (index, ThreeDTransformData) {
	    _checkGeneratedNotUsedIndex(ThreeDTransformData, index);
	}, function (ThreeDTransformData) {
	    var result = ThreeDTransformData.index;
	    if (result >= ThreeDTransformData.firstDirtyIndex) {
	        return _getNotUsedIndexFromArr(ThreeDTransformData);
	    }
	    ThreeDTransformData.index += 1;
	    return result;
	});
	var _isValidArrayValue = function (val) {
	    return isNotUndefined(val);
	};
	var _isValidLinkNode = function (node) {
	    return node !== null;
	};
	var generateNotUsedIndexInNormalList = ensureFunc(function (index, ThreeDTransformData) {
	    _checkGeneratedNotUsedIndex(ThreeDTransformData, index);
	}, function (ThreeDTransformData) {
	    var index = _getNotUsedIndexFromArr(ThreeDTransformData);
	    if (_isValidArrayValue(index)) {
	        return index;
	    }
	    index = ThreeDTransformData.index;
	    ThreeDTransformData.index += 1;
	    return index;
	});
	var addToDirtyList$1 = requireCheckFunc(function (index, ThreeDTransformData) {
	    it("firstDirtyIndex should <= maxCount", function () {
	        wdet_1(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
	    });
	}, function (index, ThreeDTransformData) {
	    var targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
	    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
	    if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
	        swap$$1(index, targetDirtyIndex, ThreeDTransformData);
	    }
	    else {
	        moveToIndex(index, targetDirtyIndex, ThreeDTransformData);
	    }
	    return targetDirtyIndex;
	});
	var _getNotUsedIndexFromArr = function (ThreeDTransformData) {
	    var notUsedIndexLinkList = ThreeDTransformData.notUsedIndexLinkList, isValidLinkNode = true, node = null;
	    do {
	        node = _getNotUsedIndexNode(notUsedIndexLinkList);
	        isValidLinkNode = _isValidLinkNode(node);
	    } while (isValidLinkNode && isIndexUsed(node.val, ThreeDTransformData));
	    if (!isValidLinkNode) {
	        return void 0;
	    }
	    return node.val;
	};
	var _getNotUsedIndexNode = function (notUsedIndexLinkList) {
	    return notUsedIndexLinkList.shift();
	};
	var addNotUsedIndex = function (index, notUsedIndexLinkList) {
	    notUsedIndexLinkList.push(LinkNode.create(index));
	};
	var isNotDirty = function (index, firstDirtyIndex) {
	    return index < firstDirtyIndex;
	};
	var addItAndItsChildrenToDirtyList = function (rootIndexInArrayBuffer, uid, ThreeDTransformData) {
	    var indexInArraybuffer = rootIndexInArrayBuffer, children = getChildren$1(uid, ThreeDTransformData);
	    if (isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
	        addToDirtyList$1(indexInArraybuffer, ThreeDTransformData);
	    }
	    if (isChildrenExist(children)) {
	        forEach(children, function (child) {
	            if (isNotAlive$1(child, ThreeDTransformData)) {
	                return;
	            }
	            addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
	        });
	    }
	    return ThreeDTransformData;
	};
	var _checkGeneratedNotUsedIndex = function (ThreeDTransformData, index) {
	    it("index should < firstDirtyIndex", function () {
	        wdet_1(index).exist;
	        wdet_1(index).lt(ThreeDTransformData.firstDirtyIndex);
	    });
	    it("index should not be used", function () {
	        wdet_1(isIndexUsed(index, ThreeDTransformData)).false;
	    });
	};

	var getIsTranslate = function (uid, ThreeDTransformData) {
	    return ThreeDTransformData.isTranslateMap[uid];
	};
	var setIsTranslate = requireCheckFunc(function (uid, isTranslate, ThreeDTransformData) {
	}, function (uid, isTranslate, ThreeDTransformData) {
	    ThreeDTransformData.isTranslateMap[uid] = isTranslate;
	});
	var isTranslate = function (data) {
	    return !!data.position || !!data.localPosition;
	};

	var clearCache = curry(function (ThreeDTransformData, state) {
	    var count = null, cacheMap = null;
	    if (ThreeDTransformData.isClearCacheMap) {
	        ThreeDTransformData.isClearCacheMap = false;
	        return;
	    }
	    count = ThreeDTransformData.maxCount;
	    cacheMap = ThreeDTransformData.cacheMap;
	    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
	        var uid = getUID(i, ThreeDTransformData), isTranslate$$1 = getIsTranslate(uid, ThreeDTransformData);
	        if (isTranslate$$1) {
	            deleteVal(uid, cacheMap);
	            setIsTranslate(uid, false, ThreeDTransformData);
	        }
	    }
	});
	var clearCacheMap = function (ThreeDTransformData) {
	    ThreeDTransformData.cacheMap = {};
	    ThreeDTransformData.isClearCacheMap = true;
	};
	var getLocalToWorldMatrixCache = function (uid, ThreeTransformData) {
	    return _getCache(uid, ThreeTransformData).localToWorldMatrix;
	};
	var setLocalToWorldMatrixCache = function (uid, mat, ThreeTransformData) {
	    _getCache(uid, ThreeTransformData).localToWorldMatrix = mat;
	};
	var getPositionCache = function (uid, ThreeTransformData) {
	    return _getCache(uid, ThreeTransformData).position;
	};
	var setPositionCache = function (uid, pos, ThreeTransformData) {
	    _getCache(uid, ThreeTransformData).position = pos;
	};
	var getLocalPositionCache = function (uid, ThreeTransformData) {
	    return _getCache(uid, ThreeTransformData).localPosition;
	};
	var setLocalPositionCache = function (uid, pos, ThreeTransformData) {
	    ThreeTransformData.cacheMap[uid].localPosition = pos;
	};
	var getNormalMatrixCache = function (uid, ThreeTransformData) {
	    return _getCache(uid, ThreeTransformData).normalMatrix;
	};
	var setNormalMatrixCache = function (uid, mat, ThreeTransformData) {
	    _getCache(uid, ThreeTransformData).normalMatrix = mat;
	};
	var _getCache = function (uid, ThreeTransformData) {
	    var cache = ThreeTransformData.cacheMap[uid];
	    if (isNotValidMapValue(cache)) {
	        cache = {};
	        ThreeTransformData.cacheMap[uid] = cache;
	    }
	    return cache;
	};

	var update$2 = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
	    return compose(_cleanDirtyList(ThreeDTransformData), _updateDirtyList(GlobalTempData, ThreeDTransformData), clearCache(ThreeDTransformData))(state);
	};
	var _updateDirtyList = requireCheckFunc(curry(function (GlobalTempData, ThreeDTransformData, state) {
	    it("firstDirtyIndex should <= maxCount", function () {
	        wdet_1(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
	    });
	}), curry(function (GlobalTempData, ThreeDTransformData, state) {
	    _sortParentBeforeChildInDirtyList(ThreeDTransformData);
	    var count = ThreeDTransformData.maxCount;
	    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
	        _transform(i, GlobalTempData, ThreeDTransformData);
	    }
	    return state;
	}));
	var _cleanDirtyList = requireCheckFunc(curry(function (ThreeDTransformData, state) {
	    it("firstDirtyIndex should <= maxCount", function () {
	        wdet_1(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
	    });
	}), curry(function (ThreeDTransformData, state) {
	    var count = ThreeDTransformData.maxCount;
	    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
	        if (_needMoveOffDirtyList(i)) {
	            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
	        }
	    }
	    return state;
	}));
	var _needMoveOffDirtyList = function (index) {
	    return true;
	};
	var _moveFromDirtyListToNormalList = function (index, ThreeDTransformData) {
	    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
	    moveToIndex(index, generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
	};
	var _transform = function (index, GlobalTempData, ThreeDTransformData) {
	    var vec3Index = getVector3DataIndexInArrayBuffer(index), quaIndex = getQuaternionDataIndexInArrayBuffer(index), mat4Index = getMatrix4DataIndexInArrayBuffer(index), mat = GlobalTempData.matrix4_2.setTRS(setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index), setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex), setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)), parent = getParent$2(getUID(index, ThreeDTransformData), ThreeDTransformData);
	    if (isParentExist(parent)) {
	        var parentIndex = parent.index;
	        return setLocalToWorldMatricesData(setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(parentIndex))
	            .multiply(mat), mat4Index, ThreeDTransformData);
	    }
	    return setLocalToWorldMatricesData(mat, mat4Index, ThreeDTransformData);
	};
	var _sortParentBeforeChildInDirtyList = function (ThreeDTransformData) {
	    var count = ThreeDTransformData.maxCount;
	    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
	        var parent = getParent$2(getUID(i, ThreeDTransformData), ThreeDTransformData);
	        if (isParentExist(parent)) {
	            var parentIndex = parent.index;
	            if (parentIndex > i) {
	                swap$$1(parentIndex, i, ThreeDTransformData);
	            }
	        }
	    }
	};

	var checkTransformShouldAlive = function (transform, ThreeDTransformData) {
	    checkComponentShouldAlive(transform, ThreeDTransformData, function (transform, ThreeDTransformData) {
	        return isAlive$1(transform, ThreeDTransformData);
	    });
	};

	var setBatchDatas$1 = requireCheckFunc(function (batchData, GlobalTempData, ThreeTransformData) {
	    for (var _i = 0, batchData_1 = batchData; _i < batchData_1.length; _i++) {
	        var data = batchData_1[_i];
	        checkTransformShouldAlive(data.transform, ThreeTransformData);
	    }
	}, function (batchData, GlobalTempData, ThreeDTransformData) {
	    compose(_addBatchToDirtyListByChangeMapData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex), _addBatchToDirtyListByChangeTypeArrData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex), function (_a) {
	        var noDirtyIndex = _a[0], targetDirtyIndex = _a[1];
	        ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
	        return noDirtyIndex;
	    }, _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(batchData), _setBatchTransformData(batchData, GlobalTempData))(ThreeDTransformData);
	});
	var _setBatchTransformData = curry(function (batchData, GlobalTempData, ThreeDTransformData) {
	    for (var _i = 0, batchData_2 = batchData; _i < batchData_2.length; _i++) {
	        var data = batchData_2[_i];
	        var transform = data.transform, index = transform.index, uid = transform.uid, parent = getParent$2(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index), position = data.position, localPosition = data.localPosition;
	        if (localPosition) {
	            setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeDTransformData);
	        }
	        if (position) {
	            setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
	        }
	    }
	    return ThreeDTransformData;
	});
	var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry(function (batchData, ThreeDTransformData) {
	    var notDirtyIndexArr = [], firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
	    var _getNotDirtyIndex = function (index, uid, notDirtyIndexArr, isTranslate$$1, ThreeDTransformData) {
	        var children = getChildren$1(uid, ThreeDTransformData);
	        if (isTranslate$$1) {
	            setIsTranslate(uid, true, ThreeDTransformData);
	        }
	        if (isNotDirty(index, firstDirtyIndex)) {
	            notDirtyIndexArr.push(index);
	            firstDirtyIndex = minusFirstDirtyIndex(firstDirtyIndex);
	        }
	        if (isChildrenExist(children)) {
	            forEach(children, function (child) {
	                if (isNotAlive$1(child, ThreeDTransformData)) {
	                    return;
	                }
	                _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate$$1, ThreeDTransformData);
	            });
	        }
	    };
	    for (var _i = 0, batchData_3 = batchData; _i < batchData_3.length; _i++) {
	        var data = batchData_3[_i];
	        var transform = data.transform, index = transform.index;
	        _getNotDirtyIndex(index, transform.uid, notDirtyIndexArr, isTranslate(data), ThreeDTransformData);
	    }
	    return [notDirtyIndexArr, firstDirtyIndex];
	});
	var _addBatchToDirtyList = function (ThreeDTransformData, targetDirtyIndex, swapFunc, moveToIndexFunc, notDirtyIndexArr) {
	    for (var _i = 0, notDirtyIndexArr_1 = notDirtyIndexArr; _i < notDirtyIndexArr_1.length; _i++) {
	        var index = notDirtyIndexArr_1[_i];
	        targetDirtyIndex = minusFirstDirtyIndex(targetDirtyIndex);
	        if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
	            swapFunc(index, targetDirtyIndex, ThreeDTransformData);
	        }
	        else {
	            moveToIndexFunc(index, targetDirtyIndex, ThreeDTransformData);
	        }
	    }
	    return targetDirtyIndex;
	};
	var _addBatchToDirtyListByChangeTypeArrData = curry(function (ThreeDTransformData, targetDirtyIndex, notDirtyIndexArr) {
	    _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, swapTypeArrData, moveTypeArrDataToIndex, notDirtyIndexArr);
	    return notDirtyIndexArr;
	});
	var _addBatchToDirtyListByChangeMapData = curry(function (ThreeDTransformData, targetDirtyIndex, notDirtyIndexArr) {
	    return _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, swapTransformMapData, function (sourceIndex, targetIndex, ThreeDTransformData) {
	        moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
	        addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
	    }, notDirtyIndexArr);
	});

	var TagData = (function () {
	    function TagData() {
	    }
	    TagData.tagArray = null;
	    TagData.slotCountMap = null;
	    TagData.usedSlotCountMap = null;
	    TagData.indexMap = null;
	    TagData.indexInTagArrayMap = null;
	    TagData.lastIndexInTagArray = null;
	    TagData.tagMap = null;
	    TagData.gameObjectMap = null;
	    TagData.index = null;
	    TagData.count = null;
	    TagData.disposeCount = null;
	    return TagData;
	}());

	var Tag = (function (_super) {
	    __extends(Tag, _super);
	    function Tag() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Tag = __decorate([
	        registerClass("Tag")
	    ], Tag);
	    return Tag;
	}(Component));
	var createTag = function (slotCount) {
	    if (slotCount === void 0) { slotCount = 4; }
	    return create$3(slotCount, TagData);
	};
	var addTag$1 = requireCheckFunc(function (component, tag) {
	    _checkShouldAlive(component, TagData);
	}, function (component, tag) {
	    addTag$$1(component, tag, TagData);
	});
	var removeTag$1 = requireCheckFunc(function (component, tag) {
	    _checkShouldAlive(component, TagData);
	}, function (component, tag) {
	    removeTag$$1(component, tag, TagData);
	});
	var findGameObjectsByTag$1 = function (tag) {
	    return findGameObjectsByTag$$1(tag, TagData);
	};
	var getTagGameObject = requireCheckFunc(function (component) {
	    _checkShouldAlive(component, TagData);
	}, function (component) {
	    return getGameObject$2(component.index, TagData);
	});
	var _checkShouldAlive = function (tag, TagData$$1) {
	    checkComponentShouldAlive(tag, TagData$$1, function (tag, TagData$$1) {
	        return isValidMapValue(TagData$$1.indexMap[TagData$$1.indexInTagArrayMap[tag.index]]);
	    });
	};

	var addAddComponentHandle$3 = function (_class) {
	    addAddComponentHandle$1(_class, addComponent$3);
	};
	var addDisposeHandle$3 = function (_class) {
	    addDisposeHandle$1(_class, disposeComponent$3);
	};
	var create$3 = ensureFunc(function (tag, slotCount, TagData$$1) {
	    it("slot array should has no hole", function () {
	        for (var _i = 0, _a = TagData$$1.slotCountMap; _i < _a.length; _i++) {
	            var count = _a[_i];
	            wdet_1(count).exist;
	        }
	    });
	}, function (slotCount, TagData$$1) {
	    var tag = new Tag(), index = generateComponentIndex(TagData$$1);
	    tag.index = index;
	    TagData$$1.count += 1;
	    _setSlotCount(index, slotCount, TagData$$1.slotCountMap);
	    _setUsedSlotCount(index, 0, TagData$$1.usedSlotCountMap);
	    setNextIndexInTagArrayMap(index, slotCount, TagData$$1.indexInTagArrayMap);
	    _initIndexMap(index, slotCount, TagData$$1);
	    TagData$$1.lastIndexInTagArray += slotCount;
	    TagData$$1.tagMap[index] = tag;
	    return tag;
	});
	var setNextIndexInTagArrayMap = requireCheckFunc(function (index, slotCount, indexInTagArrayMap) {
	    it("index should >= 0", function () {
	        wdet_1(index).gte(0);
	    });
	}, function (index, slotCount, indexInTagArrayMap) {
	    indexInTagArrayMap[index + 1] = indexInTagArrayMap[index] + slotCount;
	});
	var _initIndexMap = function (index, slotCount, TagData$$1) {
	    var indexMap = TagData$$1.indexMap, lastIndexInTagArray = TagData$$1.lastIndexInTagArray;
	    for (var i = lastIndexInTagArray, count = lastIndexInTagArray + slotCount; i < count; i++) {
	        indexMap[i] = index;
	    }
	};
	var addTag$$1 = requireCheckFunc(function (tagComponent, tag, TagData$$1) {
	    it("tag should not already be added", function () {
	        var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData$$1), tagArray = TagData$$1.tagArray, slotCountMap = TagData$$1.slotCountMap, currentSlotCount = getSlotCount(index, slotCountMap);
	        wdet_1(tagArray.slice(indexInArray, indexInArray + currentSlotCount).indexOf(tag) > -1).false;
	    });
	}, function (tagComponent, tag, TagData$$1) {
	    var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData$$1), slotCountMap = TagData$$1.slotCountMap, tagArray = TagData$$1.tagArray, usedSlotCountMap = TagData$$1.usedSlotCountMap, currentSlotCount = getSlotCount(index, slotCountMap), currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap);
	    if (_isSlotAllUsed(currentUsedSlotCount, currentSlotCount)) {
	        var increasedSlotCount = _allocateDoubleSlotCountAndAddTag(indexInArray, index, tag, currentSlotCount, currentUsedSlotCount, TagData$$1), slotCount = currentSlotCount + increasedSlotCount;
	        _setSlotCount(index, slotCount, slotCountMap);
	        _updateIndexInTagArrayMap(index, increasedSlotCount, TagData$$1);
	        TagData$$1.lastIndexInTagArray = _updateIndexMap(indexInArray, index, increasedSlotCount, TagData$$1);
	    }
	    else {
	        tagArray[indexInArray + currentUsedSlotCount] = tag;
	    }
	    _setUsedSlotCount(index, currentUsedSlotCount + 1, usedSlotCountMap);
	});
	var _updateIndexInTagArrayMap = function (startIndex, increasedSlotCount, TagData$$1) {
	    var count = TagData$$1.count, indexInTagArrayMap = TagData$$1.indexInTagArrayMap;
	    for (var i = startIndex + 1; i <= count; i++) {
	        indexInTagArrayMap[i] += increasedSlotCount;
	    }
	};
	var _updateIndexMap = function (indexInArray, index, increasedSlotCount, TagData$$1) {
	    var indexMap = TagData$$1.indexMap, lastIndexInTagArray = TagData$$1.lastIndexInTagArray + increasedSlotCount, spliceParamArr = [indexInArray + increasedSlotCount, 0];
	    for (var i = 0; i < increasedSlotCount; i++) {
	        spliceParamArr.push(index);
	    }
	    Array.prototype.splice.apply(indexMap, spliceParamArr);
	    return lastIndexInTagArray;
	};
	var removeTag$$1 = requireCheckFunc(function (tagComponent, tag, TagData$$1) {
	    it("current used slot count should >= 0", function () {
	        var index = tagComponent.index, usedSlotCountMap = TagData$$1.usedSlotCountMap;
	        wdet_1(getUsedSlotCount(index, usedSlotCountMap)).gte(0);
	    });
	}, function (tagComponent, tag, TagData$$1) {
	    var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData$$1), usedSlotCountMap = TagData$$1.usedSlotCountMap, tagArray = TagData$$1.tagArray, currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap), newUsedSlotCount = currentUsedSlotCount;
	    for (var i = indexInArray, count = indexInArray + currentUsedSlotCount; i < count; i++) {
	        if (tagArray[i] === tag) {
	            tagArray[i] = void 0;
	            newUsedSlotCount = currentUsedSlotCount - 1;
	            break;
	        }
	    }
	    if (newUsedSlotCount <= 0) {
	        newUsedSlotCount = 0;
	    }
	    _setUsedSlotCount(index, newUsedSlotCount, usedSlotCountMap);
	});
	var addComponent$3 = function (component, gameObject) {
	    addComponentToGameObjectMap(TagData.gameObjectMap, component.index, gameObject);
	};
	var getSlotCount = function (index, slotCountMap) {
	    return slotCountMap[index];
	};
	var _setSlotCount = function (index, slotCount, slotCountMap) {
	    slotCountMap[index] = slotCount;
	};
	var getUsedSlotCount = function (index, usedSlotCountMap) {
	    return usedSlotCountMap[index];
	};
	var _setUsedSlotCount = function (index, slotCount, usedSlotCountMap) {
	    usedSlotCountMap[index] = slotCount;
	};
	var _isSlotAllUsed = requireCheckFunc(function (currentUsedSlotCount, currentSlotCount) {
	    it("usedSlotCount should <= slotCount", function () {
	        wdet_1(currentUsedSlotCount).lte(currentSlotCount);
	    });
	}, function (currentUsedSlotCount, currentSlotCount) {
	    return currentUsedSlotCount === currentSlotCount;
	});
	var _allocateDoubleSlotCountAndAddTag = function (indexInArray, index, tag, currentSlotCount, currentUsedSlotCount, TagData$$1) {
	    var spliceArr = [indexInArray + currentUsedSlotCount, 0, tag], tagArray = TagData$$1.tagArray;
	    for (var i = 0, len = currentSlotCount - 1; i < len; i++) {
	        spliceArr.push(null);
	    }
	    Array.prototype.splice.apply(tagArray, spliceArr);
	    return currentSlotCount;
	};
	var _convertTagIndexToIndexInArray = function (tagIndex, TagData$$1) {
	    return TagData$$1.indexInTagArrayMap[tagIndex];
	};
	var _convertIndexInArrayToTagIndex = function (indexInTagArray, TagData$$1) {
	    return TagData$$1.indexMap[indexInTagArray];
	};
	var disposeComponent$3 = ensureFunc(function (returnVal, tag) {
	    it("count should >= 0", function () {
	        wdet_1(TagData.count).gte(0);
	    });
	}, function (tag) {
	    var index = tag.index, indexInTagArray = _convertTagIndexToIndexInArray(index, TagData), currentUsedSlotCount = getUsedSlotCount(index, TagData.usedSlotCountMap), tagArray = TagData.tagArray;
	    for (var i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
	        tagArray[i] = void 0;
	    }
	    deleteVal(indexInTagArray, TagData.indexMap);
	    TagData.count -= 1;
	    markComponentIndexRemoved(TagData.tagMap[index]);
	    TagData.disposeCount += 1;
	    if (isDisposeTooManyComponents(TagData.disposeCount)) {
	        reAllocateTag(TagData);
	        TagData.disposeCount = 0;
	    }
	});
	var getGameObject$2 = function (index, Data) {
	    return getComponentGameObject(Data.gameObjectMap, index);
	};
	var findGameObjectsByTag$$1 = function (targetTag, TagData$$1) {
	    var gameObjectArr = [], gameObjectMap = TagData$$1.gameObjectMap;
	    forEach(TagData$$1.tagArray, function (tag, indexInTagArray) {
	        if (tag === targetTag) {
	            gameObjectArr.push(gameObjectMap[_convertIndexInArrayToTagIndex(indexInTagArray, TagData$$1)]);
	        }
	    });
	    return gameObjectArr;
	};
	var initData$5 = function (TagData$$1) {
	    TagData$$1.tagArray = [];
	    TagData$$1.slotCountMap = [];
	    TagData$$1.usedSlotCountMap = [];
	    TagData$$1.indexMap = [];
	    TagData$$1.indexInTagArrayMap = [0];
	    TagData$$1.gameObjectMap = createMap();
	    TagData$$1.tagMap = createMap();
	    TagData$$1.lastIndexInTagArray = 0;
	    TagData$$1.index = 0;
	    TagData$$1.count = 0;
	    TagData$$1.disposeCount = 0;
	};

	var MemoryConfig = {
	    maxComponentDisposeCount: 1000
	};

	var isDisposeTooManyComponents = function (disposeCount, maxComponentDisposeCount) {
	    if (maxComponentDisposeCount === void 0) { maxComponentDisposeCount = MemoryConfig.maxComponentDisposeCount; }
	    return disposeCount >= maxComponentDisposeCount;
	};
	var _setMapVal = function (map, key, val) {
	    map[key] = val;
	};
	var _setArrayVal = function (arr, index, val) {
	    arr[index] = val;
	};
	var reAllocateThreeDTransform = function (ThreeDTransformData) {
	    var val = null, newParentMap = createMap(), newChildrenMap = createMap(), newIsTranslateMap = createMap(), newGameObjectMap = createMap(), newTempMap = createMap(), newAliveUIDArray = [], aliveUIDArray = ThreeDTransformData.aliveUIDArray, parentMap = ThreeDTransformData.parentMap, childrenMap = ThreeDTransformData.childrenMap, isTranslateMap = ThreeDTransformData.isTranslateMap, gameObjectMap = ThreeDTransformData.gameObjectMap, tempMap = ThreeDTransformData.tempMap;
	    clearCacheMap(ThreeDTransformData);
	    var disposedUIDArr = [], actualAliveUIDArr = [];
	    for (var _i = 0, aliveUIDArray_1 = aliveUIDArray; _i < aliveUIDArray_1.length; _i++) {
	        var uid = aliveUIDArray_1[_i];
	        val = childrenMap[uid];
	        if (isNotValidMapValue(val)) {
	            disposedUIDArr.push(uid);
	        }
	        else {
	            actualAliveUIDArr.push(uid);
	        }
	    }
	    _cleanChildrenMap(disposedUIDArr, parentMap, isAlive$1, getChildren$1, setChildren$1, ThreeDTransformData);
	    for (var _a = 0, actualAliveUIDArr_1 = actualAliveUIDArr; _a < actualAliveUIDArr_1.length; _a++) {
	        var uid = actualAliveUIDArr_1[_a];
	        val = childrenMap[uid];
	        newAliveUIDArray.push(uid);
	        _setMapVal(newChildrenMap, uid, val);
	        val = tempMap[uid];
	        _setMapVal(newTempMap, uid, val);
	        val = parentMap[uid];
	        _setMapVal(newParentMap, uid, val);
	        val = isTranslateMap[uid];
	        _setMapVal(newIsTranslateMap, uid, val);
	        val = gameObjectMap[uid];
	        _setMapVal(newGameObjectMap, uid, val);
	    }
	    ThreeDTransformData.parentMap = newParentMap;
	    ThreeDTransformData.childrenMap = newChildrenMap;
	    ThreeDTransformData.isTranslateMap = newIsTranslateMap;
	    ThreeDTransformData.tempMap = newTempMap;
	    ThreeDTransformData.gameObjectMap = newGameObjectMap;
	    ThreeDTransformData.aliveUIDArray = newAliveUIDArray;
	};
	var reAllocateGameObject = function (GameObjectData) {
	    var val = null, newParentMap = createMap(), newChildrenMap = createMap(), newComponentMap = createMap(), newAliveUIDArray = [], aliveUIDArray = GameObjectData.aliveUIDArray, parentMap = GameObjectData.parentMap, childrenMap = GameObjectData.childrenMap, componentMap = GameObjectData.componentMap, disposedUIDArr = [], actualAliveUIDArr = [];
	    for (var _i = 0, aliveUIDArray_2 = aliveUIDArray; _i < aliveUIDArray_2.length; _i++) {
	        var uid = aliveUIDArray_2[_i];
	        val = componentMap[uid];
	        if (isNotValidMapValue(val)) {
	            disposedUIDArr.push(uid);
	        }
	        else {
	            actualAliveUIDArr.push(uid);
	        }
	    }
	    _cleanChildrenMap(disposedUIDArr, parentMap, isAlive$$1, getChildren, setChildren, GameObjectData);
	    for (var _a = 0, actualAliveUIDArr_2 = actualAliveUIDArr; _a < actualAliveUIDArr_2.length; _a++) {
	        var uid = actualAliveUIDArr_2[_a];
	        val = componentMap[uid];
	        newAliveUIDArray.push(uid);
	        _setMapVal(newComponentMap, uid, val);
	        val = parentMap[uid];
	        _setMapVal(newParentMap, uid, val);
	        val = childrenMap[uid];
	        _setMapVal(newChildrenMap, uid, val);
	    }
	    GameObjectData.parentMap = newParentMap;
	    GameObjectData.childrenMap = newChildrenMap;
	    GameObjectData.componentMap = newComponentMap;
	    GameObjectData.aliveUIDArray = newAliveUIDArray;
	};
	var _cleanChildrenMap = function (disposedUIDArr, parentMap, isAlive$$2, getChildren$$1, setChildren$$1, Data) {
	    var isCleanedParentMap = createMap();
	    for (var _i = 0, disposedUIDArr_1 = disposedUIDArr; _i < disposedUIDArr_1.length; _i++) {
	        var uid = disposedUIDArr_1[_i];
	        var parent = parentMap[uid];
	        if (_isParentExist$1(parent)) {
	            var parentUID = parent.uid;
	            if (isValidMapValue(isCleanedParentMap[parentUID])) {
	                continue;
	            }
	            _cleanChildren(parentUID, isAlive$$2, getChildren$$1, setChildren$$1, Data);
	            deleteVal(uid, parentMap);
	        }
	    }
	};
	var _cleanChildren = function (parentUID, isAlive$$2, getChildren$$1, setChildren$$1, Data) {
	    var children = getChildren$$1(parentUID, Data);
	    if (!_isChildrenExist$1(children)) {
	        return;
	    }
	    var newChildren = [];
	    for (var i = 0, len = children.length; i < len; ++i) {
	        var child = children[i];
	        if (isAlive$$2(child, Data)) {
	            newChildren.push(child);
	        }
	    }
	    setChildren$$1(parentUID, newChildren, Data);
	};
	var _isParentExist$1 = function (parent) { return isNotUndefined(parent); };
	var _isChildrenExist$1 = function (children) { return isNotUndefined(children); };
	var reAllocateTag = function (TagData) {
	    var usedSlotCountMap = TagData.usedSlotCountMap, slotCountMap = TagData.slotCountMap, indexMap = TagData.indexMap, tagArray = TagData.tagArray, gameObjectMap = TagData.gameObjectMap, indexInTagArrayMap = TagData.indexInTagArrayMap, tagMap = TagData.tagMap, newIndexInTagArrayMap = [0], newTagArray = [], newGameObjectMap = createMap(), newUsedSlotCountMap = [], newSlotCountMap = [], newIndexMap = [], newTagMap = createMap(), newIndexInTagArray = 0, newIndexInTagArrayInMap = null, newIndex = 0, newLastIndexInTagArray = 0, hasNewData = false, tagIndex = null;
	    for (var _i = 0, indexInTagArrayMap_1 = indexInTagArrayMap; _i < indexInTagArrayMap_1.length; _i++) {
	        var indexInTagArray = indexInTagArrayMap_1[_i];
	        var index = indexMap[indexInTagArray];
	        if (isNotValidVal(index)) {
	            continue;
	        }
	        hasNewData = true;
	        var currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap), tag = tagMap[index];
	        newGameObjectMap[newIndex] = gameObjectMap[index];
	        newSlotCountMap[newIndex] = getSlotCount(index, slotCountMap);
	        newUsedSlotCountMap[newIndex] = currentUsedSlotCount;
	        newIndexInTagArrayInMap = newIndexInTagArray;
	        newIndexInTagArrayMap[newIndex] = newIndexInTagArrayInMap;
	        tag.index = newIndex;
	        newTagMap[newIndex] = tag;
	        for (var i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
	            newTagArray[newIndexInTagArray] = tagArray[i];
	            newIndexMap[newIndexInTagArray] = newIndex;
	            newIndexInTagArray += 1;
	        }
	        newIndex += 1;
	    }
	    if (hasNewData) {
	        newIndex -= 1;
	        newLastIndexInTagArray = newIndexInTagArrayInMap + getSlotCount(newIndex, newSlotCountMap);
	        tagIndex = newIndex + 1;
	    }
	    else {
	        tagIndex = 0;
	    }
	    setNextIndexInTagArrayMap(newIndex, newSlotCountMap[newIndex], newIndexInTagArrayMap);
	    TagData.slotCountMap = newSlotCountMap;
	    TagData.usedSlotCountMap = newUsedSlotCountMap;
	    TagData.gameObjectMap = newGameObjectMap;
	    TagData.tagMap = newTagMap;
	    TagData.indexMap = newIndexMap;
	    TagData.indexInTagArrayMap = newIndexInTagArrayMap;
	    TagData.lastIndexInTagArray = newLastIndexInTagArray;
	    TagData.tagArray = newTagArray;
	    TagData.index = tagIndex;
	};
	var reAllocateGeometry = ensureFunc(function (returnVal, GeometryData) {
	    checkIndexShouldEqualCount(GeometryData);
	}, function (GeometryData) {
	    var val = null, index = GeometryData.index, vertices = GeometryData.vertices, normals = GeometryData.normals, texCoords = GeometryData.texCoords, indices = GeometryData.indices, verticesInfoList = GeometryData.verticesInfoList, normalsInfoList = GeometryData.normalsInfoList, texCoordsInfoList = GeometryData.texCoordsInfoList, indicesInfoList = GeometryData.indicesInfoList, gameObjectMap = GeometryData.gameObjectMap, geometryMap = GeometryData.geometryMap, computeDataFuncMap = GeometryData.computeDataFuncMap, configDataMap = GeometryData.configDataMap, verticesCacheMap = GeometryData.verticesCacheMap, normalsCacheMap = GeometryData.normalsCacheMap, texCoordsCacheMap = GeometryData.texCoordsCacheMap, indicesCacheMap = GeometryData.indicesCacheMap, newIndexInArrayBuffer = 0, newVerticesOffset = 0, newNormalsOffset = 0, newTexCoordsOffset = 0, newIndicesOffset = 0, newVertivesInfoList = [], newNormalsInfoList = [], newTexCoordsInfoList = [], newIndicesInfoList = [], newGameObjectMap = createMap(), newGeometryMap = createMap(), newComputeDatafuncMap = createMap(), newConfigDataMap = [], newVerticesCacheMap = [], newNormalsCacheMap = [], newTexCoordsCacheMap = [], newIndicesCacheMap = [], newVertices = [], newNormals = [], newTexCoords = [], newIndices = [], disposedIndexArray = [];
	    for (var i = 0; i < index; i++) {
	        val = geometryMap[i];
	        if (isNotValidMapValue(val)) {
	            disposedIndexArray.push(i);
	            continue;
	        }
	        var verticesInfo = verticesInfoList[i], normalsInfo = normalsInfoList[i], texCoordsInfo = texCoordsInfoList[i], indicesInfo = indicesInfoList[i];
	        _updateInfoList(newVertivesInfoList, newIndexInArrayBuffer, verticesInfo, newVerticesOffset);
	        if (isValidVal(normalsInfo)) {
	            _updateInfoList(newNormalsInfoList, newIndexInArrayBuffer, normalsInfo, newNormalsOffset);
	        }
	        if (isValidVal(texCoordsInfo)) {
	            _updateInfoList(newTexCoordsInfoList, newIndexInArrayBuffer, texCoordsInfo, newTexCoordsOffset);
	        }
	        _updateInfoList(newIndicesInfoList, newIndexInArrayBuffer, indicesInfo, newIndicesOffset);
	        newVerticesOffset = _fillTypeArr(newVertices, newVerticesOffset, vertices, verticesInfo.startIndex, verticesInfo.endIndex);
	        if (isValidVal(normalsInfo)) {
	            newNormalsOffset = _fillTypeArr(newNormals, newNormalsOffset, normals, normalsInfo.startIndex, normalsInfo.endIndex);
	        }
	        if (isValidVal(texCoordsInfo)) {
	            newTexCoordsOffset = _fillTypeArr(newTexCoords, newTexCoordsOffset, texCoords, texCoordsInfo.startIndex, texCoordsInfo.endIndex);
	        }
	        newIndicesOffset = _fillTypeArr(newIndices, newIndicesOffset, indices, indicesInfo.startIndex, indicesInfo.endIndex);
	        _updateComponentIndex(geometryMap, newGeometryMap, i, newIndexInArrayBuffer);
	        val = computeDataFuncMap[i];
	        _setMapVal(newComputeDatafuncMap, newIndexInArrayBuffer, val);
	        val = configDataMap[i];
	        _setMapVal(newConfigDataMap, newIndexInArrayBuffer, val);
	        val = verticesCacheMap[i];
	        _setMapVal(newVerticesCacheMap, newIndexInArrayBuffer, val);
	        val = normalsCacheMap[i];
	        _setMapVal(newNormalsCacheMap, newIndexInArrayBuffer, val);
	        val = texCoordsCacheMap[i];
	        _setMapVal(newTexCoordsCacheMap, newIndexInArrayBuffer, val);
	        val = indicesCacheMap[i];
	        _setMapVal(newIndicesCacheMap, newIndexInArrayBuffer, val);
	        val = geometryMap[i];
	        _setMapVal(newGeometryMap, newIndexInArrayBuffer, val);
	        val = gameObjectMap[i];
	        _setMapVal(newGameObjectMap, newIndexInArrayBuffer, val);
	        newIndexInArrayBuffer += 1;
	    }
	    set(GeometryData.vertices, newVertices);
	    set(GeometryData.normals, newNormals);
	    set(GeometryData.texCoords, newTexCoords);
	    set(GeometryData.indices, newIndices);
	    GeometryData.gameObjectMap = newGameObjectMap;
	    GeometryData.verticesInfoList = newVertivesInfoList;
	    GeometryData.normalsInfoList = newNormalsInfoList;
	    GeometryData.texCoordsInfoList = newTexCoordsInfoList;
	    GeometryData.indicesInfoList = newIndicesInfoList;
	    GeometryData.geometryMap = newGeometryMap;
	    GeometryData.computeDataFuncMap = newComputeDatafuncMap;
	    GeometryData.configDataMap = newConfigDataMap;
	    GeometryData.verticesCacheMap = newVerticesCacheMap;
	    GeometryData.normalsCacheMap = newNormalsCacheMap;
	    GeometryData.texCoordsCacheMap = newTexCoordsCacheMap;
	    GeometryData.indicesCacheMap = newIndicesCacheMap;
	    GeometryData.verticesOffset = newVerticesOffset;
	    GeometryData.normalsOffset = newNormalsOffset;
	    GeometryData.texCoordsOffset = newTexCoordsOffset;
	    GeometryData.indicesOffset = newIndicesOffset;
	    GeometryData.index = newIndexInArrayBuffer;
	    return disposedIndexArray;
	});
	var _updateComponentIndex = function (componentMap, newComponentMap, oldIndex, newIndex) {
	    var component = componentMap[oldIndex];
	    component.index = newIndex;
	    newComponentMap[newIndex] = component;
	};
	var _fillTypeArr = requireCheckFunc(function (targetTypeArr, targetStartIndex, sourceTypeArr, startIndex, endIndex) {
	}, function (targetTypeArr, targetStartIndex, sourceTypeArr, startIndex, endIndex) {
	    var typeArrIndex = targetStartIndex;
	    for (var i = startIndex; i < endIndex; i++) {
	        targetTypeArr[typeArrIndex] = sourceTypeArr[i];
	        typeArrIndex += 1;
	    }
	    return typeArrIndex;
	});
	var _updateInfoList = ensureFunc(function (returnVal, newInfoList, newIndexInArrayBuffer, info, offset) {
	    it("info.startIndex should >= 0", function () {
	        wdet_1(newInfoList[newIndexInArrayBuffer].startIndex).gte(0);
	    });
	}, function (newInfoList, newIndexInArrayBuffer, info, offset) {
	    var increment = info.endIndex - info.startIndex;
	    _setArrayVal(newInfoList, newIndexInArrayBuffer, {
	        startIndex: offset,
	        endIndex: offset + increment
	    });
	});

	var addAddComponentHandle$2 = function (_class) {
	    addAddComponentHandle$1(_class, addComponent$2);
	};
	var addDisposeHandle$2 = function (_class) {
	    addDisposeHandle$1(_class, disposeComponent$2);
	};
	var create$2 = ensureFunc(function (transform, ThreeDTransformData$$1) {
	    it("componentMap should has data", function () {
	        wdet_1(getChildren$1(transform.uid, ThreeDTransformData$$1)).exist;
	    });
	    it("count should <= ThreeDTransformData.maxCount", function () {
	        wdet_1(ThreeDTransformData$$1.count).lte(ThreeDTransformData$$1.maxCount);
	    });
	}, function (ThreeDTransformData$$1) {
	    var transform = new ThreeDTransform(), index = _generateIndexInArrayBuffer(ThreeDTransformData$$1), uid = _buildUID$1(ThreeDTransformData$$1);
	    transform.index = index;
	    transform.uid = uid;
	    ThreeDTransformData$$1.count += 1;
	    _createTempData(uid, ThreeDTransformData$$1);
	    _setTransformMap(index, transform, ThreeDTransformData$$1);
	    setChildren$1(uid, [], ThreeDTransformData$$1);
	    _setDefaultTypeArrData(index, ThreeDTransformData$$1);
	    ThreeDTransformData$$1.aliveUIDArray.push(uid);
	    return transform;
	});
	var _buildUID$1 = function (ThreeDTransformData$$1) {
	    return ThreeDTransformData$$1.uid++;
	};
	var _generateIndexInArrayBuffer = function (ThreeDTransformData$$1) {
	    return generateNotUsedIndexInArrayBuffer(ThreeDTransformData$$1);
	};
	var _createTempData = function (uid, ThreeDTransformData$$1) {
	    ThreeDTransformData$$1.tempMap[uid] = {
	        position: Vector3.create(),
	        localPosition: Vector3.create(),
	        localToWorldMatrix: Matrix4.create()
	    };
	    return ThreeDTransformData$$1;
	};
	var checkShouldAlive = function (component, ThreeDTransformData$$1) {
	    checkComponentShouldAlive(component, ThreeDTransformData$$1, function (component, ThreeDTransformData$$1) {
	        return isChildrenExist(getChildren$1(component.uid, ThreeDTransformData$$1));
	    });
	};
	var init$2 = function (GlobalTempData$$1, ThreeDTransformData$$1, state) {
	    return update$1(null, GlobalTempData$$1, ThreeDTransformData$$1, state);
	};
	var addComponent$2 = function (transform, gameObject) {
	    var index = transform.index, uid = transform.uid;
	    addComponentToGameObjectMap(ThreeDTransformData.gameObjectMap, uid, gameObject);
	    return addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
	};
	var isAlive$1 = function (transform, ThreeDTransformData$$1) {
	    return isValidMapValue(ThreeDTransformData$$1.transformMap[transform.index]);
	};
	var isNotAlive$1 = function (transform, ThreeDTransformData$$1) {
	    return !isAlive$1(transform, ThreeDTransformData$$1);
	};
	var disposeComponent$2 = function (transform) {
	    var index = transform.index, uid = transform.uid;
	    if (isNotDirty(index, ThreeDTransformData.firstDirtyIndex)) {
	        _disposeFromNormalList(index, uid, GlobalTempData, ThreeDTransformData);
	    }
	    else {
	        _disposeFromDirtyList(index, uid, GlobalTempData, ThreeDTransformData);
	    }
	    ThreeDTransformData.count -= 1;
	    ThreeDTransformData.disposeCount += 1;
	    if (isDisposeTooManyComponents(ThreeDTransformData.disposeCount)) {
	        reAllocateThreeDTransform(ThreeDTransformData);
	        ThreeDTransformData.disposeCount = 0;
	    }
	};
	var getGameObject$1 = function (uid, ThreeDTransformData$$1) { return getComponentGameObject(ThreeDTransformData$$1.gameObjectMap, uid); };
	var getParent$1 = function (transform, ThreeDTransformData$$1) {
	    var parent = getParent$2(transform.uid, ThreeDTransformData$$1);
	    if (isValidMapValue(parent)) {
	        return parent;
	    }
	    return null;
	};
	var setParent$$1 = function (transform, parent, ThreeDTransformData$$1) { return setParent$1(transform, parent, ThreeDTransformData$$1); };
	var getLocalToWorldMatrix = requireCheckFunc(function (transform, mat, ThreeTransformData) {
	    checkTransformShouldAlive(transform, ThreeTransformData);
	}, cacheFunc(function (transform, mat, ThreeTransformData) {
	    return isValidMapValue(getLocalToWorldMatrixCache(transform.uid, ThreeTransformData));
	}, function (transform, mat, ThreeTransformData) {
	    return getLocalToWorldMatrixCache(transform.uid, ThreeTransformData);
	}, function (transform, mat, ThreeTransformData, returnedMat) {
	    setLocalToWorldMatrixCache(transform.uid, returnedMat, ThreeTransformData);
	}, function (transform, mat, ThreeTransformData) {
	    return createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
	}));
	var getPosition = requireCheckFunc(function (transform, ThreeTransformData) {
	    checkTransformShouldAlive(transform, ThreeTransformData);
	}, cacheFunc(function (transform, ThreeTransformData) {
	    return isValidMapValue(getPositionCache(transform.uid, ThreeTransformData));
	}, function (transform, ThreeTransformData) {
	    return getPositionCache(transform.uid, ThreeTransformData);
	}, function (transform, ThreeTransformData, position) {
	    setPositionCache(transform.uid, position, ThreeTransformData);
	}, function (transform, ThreeTransformData) {
	    var index = getMatrix4DataIndexInArrayBuffer(transform.index), localToWorldMatrices = ThreeTransformData.localToWorldMatrices;
	    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
	}));
	var getNormalMatrix = requireCheckFunc(function (transform, GlobalTempData$$1, ThreeTransformData) {
	    checkTransformShouldAlive(transform, ThreeTransformData);
	}, cacheFunc(function (transform, GlobalTempData$$1, ThreeTransformData) {
	    return isValidMapValue(getNormalMatrixCache(transform.uid, ThreeTransformData));
	}, function (transform, GlobalTempData$$1, ThreeTransformData) {
	    return getNormalMatrixCache(transform.uid, ThreeTransformData);
	}, function (transform, GlobalTempData$$1, ThreeTransformData, mat) {
	    setNormalMatrixCache(transform.uid, mat, ThreeTransformData);
	}, function (transform, GlobalTempData$$1, ThreeTransformData) {
	    return getLocalToWorldMatrix(transform, GlobalTempData$$1.matrix4_1, ThreeDTransformData).invertTo3x3().transpose();
	}));
	var _setTransformMap = function (index, transform, ThreeDTransformData$$1) { return ThreeDTransformData$$1.transformMap[index] = transform; };
	var setPosition = requireCheckFunc(function (transform, position, GlobalTempData$$1, ThreeTransformData) {
	    checkTransformShouldAlive(transform, ThreeTransformData);
	}, function (transform, position, GlobalTempData$$1, ThreeTransformData) {
	    var index = transform.index, uid = transform.uid, parent = getParent$2(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);
	    setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData$$1, ThreeTransformData);
	    setIsTranslate(uid, true, ThreeTransformData);
	    return addItAndItsChildrenToDirtyList(index, uid, ThreeTransformData);
	});
	var setBatchDatas$$1 = function (batchData, GlobalTempData$$1, ThreeTransformData) { return setBatchDatas$1(batchData, GlobalTempData$$1, ThreeDTransformData); };
	var getLocalPosition = requireCheckFunc(function (transform, ThreeTransformData) {
	    checkTransformShouldAlive(transform, ThreeTransformData);
	}, cacheFunc(function (transform, ThreeTransformData) {
	    return isValidMapValue(getLocalPositionCache(transform.uid, ThreeTransformData));
	}, function (transform, ThreeTransformData) {
	    return getLocalPositionCache(transform.uid, ThreeTransformData);
	}, function (transform, ThreeTransformData, position) {
	    setLocalPositionCache(transform.uid, position, ThreeTransformData);
	}, function (transform, ThreeTransformData) {
	    return createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
	}));
	var setLocalPosition = requireCheckFunc(function (transform, position, ThreeTransformData) {
	    checkTransformShouldAlive(transform, ThreeTransformData);
	}, function (transform, position, ThreeTransformData) {
	    var index = transform.index, uid = transform.uid, vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index);
	    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);
	    setIsTranslate(uid, true, ThreeTransformData);
	    return addItAndItsChildrenToDirtyList(index, uid, ThreeTransformData);
	});
	var update$1 = function (elapsed, GlobalTempData$$1, ThreeDTransformData$$1, state) {
	    return update$2(elapsed, GlobalTempData$$1, ThreeDTransformData$$1, state);
	};
	var _disposeItemInDataContainer = function (index, uid, GlobalTempData$$1, ThreeDTransformData$$1) {
	    removeHierarchyData(uid, ThreeDTransformData$$1);
	    _disposeMapDatas$1(index, uid, ThreeDTransformData$$1);
	    return ThreeDTransformData$$1;
	};
	var _disposeMapDatas$1 = function (index, uid, ThreeDTransformData$$1) {
	    deleteVal(index, ThreeDTransformData$$1.transformMap);
	};
	var _disposeFromNormalList = function (index, uid, GlobalTempData$$1, ThreeDTransformData$$1) {
	    addNotUsedIndex(index, ThreeDTransformData$$1.notUsedIndexLinkList);
	    return _disposeItemInDataContainer(index, uid, GlobalTempData$$1, ThreeDTransformData$$1);
	};
	var _disposeFromDirtyList = function (index, uid, GlobalTempData$$1, ThreeDTransformData$$1) {
	    var firstDirtyIndex = ThreeDTransformData$$1.firstDirtyIndex;
	    swap$$1(index, firstDirtyIndex, ThreeDTransformData$$1);
	    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData$$1, ThreeDTransformData$$1);
	    ThreeDTransformData$$1.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData$$1);
	};
	var _setDefaultTypeArrData = function (index, ThreeDTransformData$$1) {
	    setTransformDataInTypeArr(index, ThreeDTransformData$$1.defaultLocalToWorldMatrice, ThreeDTransformData$$1.defaultRotation, ThreeDTransformData$$1.defaultPosition, ThreeDTransformData$$1.defaultScale, ThreeDTransformData$$1);
	};
	var getTempLocalToWorldMatrix = function (transform, ThreeDTransformData$$1) { return _getTempData(transform.uid, ThreeDTransformData$$1).localToWorldMatrix; };
	var _getTempData = function (uid, ThreeDTransformData$$1) {
	    var tempData = ThreeDTransformData$$1.tempMap[uid];
	    if (isNotValidMapValue(tempData)) {
	        tempData = {};
	        ThreeDTransformData$$1.tempMap[uid] = tempData;
	    }
	    return tempData;
	};
	var initData$4 = function (GlobalTempData$$1, ThreeDTransformData$$1) {
	    _initBufferData(ThreeDTransformData$$1);
	    ThreeDTransformData$$1.defaultPosition = Vector3.create(0, 0, 0);
	    ThreeDTransformData$$1.defaultRotation = Quaternion.create(0, 0, 0, 1);
	    ThreeDTransformData$$1.defaultScale = Vector3.create(1, 1, 1);
	    ThreeDTransformData$$1.defaultLocalToWorldMatrice = Matrix4.create().setIdentity();
	    ThreeDTransformData$$1.notUsedIndexLinkList = LinkList.create();
	    ThreeDTransformData$$1.parentMap = createMap();
	    ThreeDTransformData$$1.childrenMap = createMap();
	    ThreeDTransformData$$1.isTranslateMap = createMap();
	    ThreeDTransformData$$1.cacheMap = createMap();
	    ThreeDTransformData$$1.tempMap = createMap();
	    ThreeDTransformData$$1.transformMap = createMap();
	    ThreeDTransformData$$1.gameObjectMap = createMap();
	    ThreeDTransformData$$1.firstDirtyIndex = ThreeDTransformData$$1.maxCount;
	    ThreeDTransformData$$1.index = getStartIndexInArrayBuffer();
	    ThreeDTransformData$$1.uid = 0;
	    ThreeDTransformData$$1.disposeCount = 0;
	    ThreeDTransformData$$1.isClearCacheMap = false;
	    ThreeDTransformData$$1.count = 0;
	    ThreeDTransformData$$1.aliveUIDArray = [];
	};
	var _initBufferData = function (ThreeDTransformData$$1) {
	    var buffer = null, count = ThreeDTransformData$$1.maxCount, size = Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize() + getVector3DataSize());
	    buffer = new ArrayBuffer(count * size);
	    ThreeDTransformData$$1.localToWorldMatrices = new Float32Array(buffer, 0, count * getMatrix4DataSize());
	    ThreeDTransformData$$1.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getMatrix4DataSize(), count * getVector3DataSize());
	    ThreeDTransformData$$1.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize()), count * getQuaternionDataSize());
	    ThreeDTransformData$$1.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize()), count * getVector3DataSize());
	    ThreeDTransformData$$1.buffer = buffer;
	};

	var checkGameObjectShouldAlive = function (gameObject, GameObjectData) {
	    it("gameObject is diposed, should release it", function () {
	        wdet_1(isAlive$$1(gameObject, GameObjectData)).true;
	    });
	};

	var _arrayMap = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	function arrayMap(array, iteratee) {
	    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
	    while (++index < length) {
	        result[index] = iteratee(array[index], index, array);
	    }
	    return result;
	}
	exports.default = arrayMap;
	});

	var _baseToString = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _Symbol_js_1 = _Symbol;
	var _arrayMap_js_1 = _arrayMap;
	var isArray_js_1 = isArray_1;
	var isSymbol_js_1 = isSymbol_1;
	var INFINITY = 1 / 0;
	var symbolProto = _Symbol_js_1.default ? _Symbol_js_1.default.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
	function baseToString(value) {
	    if (typeof value == 'string') {
	        return value;
	    }
	    if (isArray_js_1.default(value)) {
	        return _arrayMap_js_1.default(value, baseToString) + '';
	    }
	    if (isSymbol_js_1.default(value)) {
	        return symbolToString ? symbolToString.call(value) : '';
	    }
	    var result = (value + '');
	    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	exports.default = baseToString;
	});

	var toString_1 = createCommonjsModule(function (module, exports) {
	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var _baseToString_js_1 = _baseToString;
	function toString(value) {
	    return value == null ? '' : _baseToString_js_1.default(value);
	}
	exports.default = toString;
	});

	var toString$1 = unwrapExports(toString_1);

	var IO = (function () {
	    function IO(func) {
	        this.func = null;
	        this.func = func;
	    }
	    IO.of = function (func) {
	        var obj = new this(func);
	        return obj;
	    };
	    IO.prototype.chain = function (f) {
	        var io = this;
	        return IO.of(function () {
	            var next = f(io.func.apply(io, arguments));
	            return next.func.apply(next, arguments);
	        });
	    };
	    IO.prototype.map = function (f) {
	        return IO.of(flowRight(f, this.func));
	    };
	    
	    IO.prototype.ap = function (thatIO) {
	        return this.chain(function (f) {
	            return thatIO.map(f);
	        });
	    };
	    
	    IO.prototype.run = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        return this.func.apply(this, arguments);
	    };
	    
	    IO.prototype.toString = function () {
	        return "(" + toString$1(this.run()) + ")";
	    };
	    return IO;
	}());

	var DomQuery = (function () {
	    function DomQuery() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this._doms = null;
	        if (JudgeUtils.isDom(args[0])) {
	            this._doms = [args[0]];
	        }
	        else if (this._isDomEleStr(args[0])) {
	            this._doms = [this._buildDom(args[0])];
	        }
	        else {
	            this._doms = document.querySelectorAll(args[0]);
	        }
	        return this;
	    }
	    DomQuery.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var obj = new this(args[0]);
	        return obj;
	    };
	    DomQuery.prototype.get = function (index) {
	        return this._doms[index];
	    };
	    DomQuery.prototype.prepend = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var targetDom = null;
	        targetDom = this._buildDom(args[0]);
	        for (var _a = 0, _b = this._doms; _a < _b.length; _a++) {
	            var dom = _b[_a];
	            if (dom.nodeType === 1) {
	                dom.insertBefore(targetDom, dom.firstChild);
	            }
	        }
	        return this;
	    };
	    DomQuery.prototype.prependTo = function (eleStr) {
	        var targetDom = null;
	        targetDom = DomQuery.create(eleStr);
	        for (var _i = 0, _a = this._doms; _i < _a.length; _i++) {
	            var dom = _a[_i];
	            if (dom.nodeType === 1) {
	                targetDom.prepend(dom);
	            }
	        }
	        return this;
	    };
	    DomQuery.prototype.remove = function () {
	        for (var _i = 0, _a = this._doms; _i < _a.length; _i++) {
	            var dom = _a[_i];
	            if (dom && dom.parentNode && dom.tagName != 'BODY') {
	                dom.parentNode.removeChild(dom);
	            }
	        }
	        return this;
	    };
	    DomQuery.prototype.css = function (property, value) {
	        for (var _i = 0, _a = this._doms; _i < _a.length; _i++) {
	            var dom = _a[_i];
	            dom.style[property] = value;
	        }
	    };
	    DomQuery.prototype.attr = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 1) {
	            var name = args[0];
	            return this.get(0).getAttribute(name);
	        }
	        else {
	            var name = args[0], value = args[1];
	            for (var _a = 0, _b = this._doms; _a < _b.length; _a++) {
	                var dom = _b[_a];
	                dom.setAttribute(name, value);
	            }
	        }
	    };
	    DomQuery.prototype.text = function (str) {
	        var dom = this.get(0);
	        if (str !== void 0) {
	            if (dom.textContent !== void 0) {
	                dom.textContent = str;
	            }
	            else {
	                dom.innerText = str;
	            }
	        }
	        else {
	            return dom.textContent !== void 0 ? dom.textContent : dom.innerText;
	        }
	    };
	    DomQuery.prototype._isDomEleStr = function (eleStr) {
	        return eleStr.match(/<(\w+)[^>]*><\/\1>/) !== null;
	    };
	    DomQuery.prototype._buildDom = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (JudgeUtils.isString(args[0])) {
	            var div = this._createElement("div"), eleStr = args[0];
	            div.innerHTML = eleStr;
	            return div.firstChild;
	        }
	        return args[0];
	    };
	    DomQuery.prototype._createElement = function (eleStr) {
	        return document.createElement(eleStr);
	    };
	    return DomQuery;
	}());

	var WorkerDetectData = (function () {
	    function WorkerDetectData() {
	    }
	    WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer = null;
	    WorkerDetectData.isSupportSharedArrayBuffer = null;
	    WorkerDetectData.renderWorkerFileDir = null;
	    return WorkerDetectData;
	}());

	if (JudgeUtils$1.isNodeJs() && typeof global != "undefined") {
	    exports.root = global;
	}
	else if (typeof window != "undefined") {
	    exports.root = window;
	}
	else if (typeof self != "undefined") {
	    exports.root = self;
	}
	else {
	    Log$$1.error("no avaliable root!");
	}

	var RenderWorkerConfig = {
	    useRenderWorker: true
	};

	var detect = curry(function (WorkerDetectData$$1) {
	    if (typeof exports.root.isSupportSharedArrayBuffer_wonder !== "undefined" && typeof exports.root.isSupportRenderWorkerAndSharedArrayBuffer_wonder !== "undefined") {
	        WorkerDetectData$$1.isSupportSharedArrayBuffer = exports.root.isSupportSharedArrayBuffer_wonder;
	        WorkerDetectData$$1.isSupportRenderWorkerAndSharedArrayBuffer = exports.root.isSupportRenderWorkerAndSharedArrayBuffer_wonder;
	        return;
	    }
	    var canvas = DomQuery.create("<canvas></canvas>").get(0);
	    if (typeof SharedArrayBuffer !== "undefined") {
	        WorkerDetectData$$1.isSupportSharedArrayBuffer = true;
	    }
	    else {
	        WorkerDetectData$$1.isSupportSharedArrayBuffer = false;
	    }
	    if (("transferControlToOffscreen" in canvas) && WorkerDetectData$$1.isSupportSharedArrayBuffer) {
	        WorkerDetectData$$1.isSupportRenderWorkerAndSharedArrayBuffer = true;
	    }
	    else {
	        WorkerDetectData$$1.isSupportRenderWorkerAndSharedArrayBuffer = false;
	    }
	});
	var isSupportSharedArrayBuffer = function () {
	    return WorkerDetectData.isSupportSharedArrayBuffer;
	};
	var isSupportRenderWorkerAndSharedArrayBuffer = function () {
	    return RenderWorkerConfig.useRenderWorker && WorkerDetectData.isSupportRenderWorkerAndSharedArrayBuffer;
	};
	var setWorkerConfig = function (config, WorkerDetectData$$1) {
	    return IO.of(function () {
	        WorkerDetectData$$1.renderWorkerFileDir = config.renderWorkerFileDir;
	    });
	};
	var getRenderWorkerFilePath = function () {
	    return _getValidFileDir(WorkerDetectData.renderWorkerFileDir) + "wd.renderWorker.js";
	};
	var _getValidFileDir = function (dir) {
	    if (dir.slice(-1) !== '/') {
	        return dir + "/";
	    }
	    return dir;
	};
	detect(WorkerDetectData);

	var MeshRendererData = (function () {
	    function MeshRendererData() {
	    }
	    MeshRendererData.renderGameObjectArray = null;
	    MeshRendererData.gameObjectMap = null;
	    MeshRendererData.meshRendererMap = null;
	    MeshRendererData.index = null;
	    MeshRendererData.count = null;
	    return MeshRendererData;
	}());

	var MeshRenderer = (function (_super) {
	    __extends(MeshRenderer, _super);
	    function MeshRenderer() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    MeshRenderer = __decorate([
	        registerClass("MeshRenderer")
	    ], MeshRenderer);
	    return MeshRenderer;
	}(Component));
	var createMeshRenderer = function () {
	    return create$4(MeshRendererData);
	};
	var getMeshRendererGameObject = requireCheckFunc(function (component) {
	    _checkShouldAlive$1(component, MeshRendererData);
	}, function (component) {
	    return getGameObject$3(component.index, MeshRendererData);
	});
	var getMeshRendererRenderList = function () {
	    return getRenderList(null, MeshRendererData);
	};
	var _checkShouldAlive$1 = function (component, MeshRendererData$$1) {
	    checkComponentShouldAlive(component, MeshRendererData$$1, function (component, MeshRendererData$$1) {
	        return isComponentIndexNotRemoved(component);
	    });
	};

	var addAddComponentHandle$4 = function (_class) {
	    addAddComponentHandle$1(_class, addComponent$4);
	};
	var addDisposeHandle$4 = function (_class) {
	    addDisposeHandle$1(_class, disposeComponent$4);
	};
	var create$4 = requireCheckFunc(function (MeshRendererData$$1) {
	    checkIndexShouldEqualCount(MeshRendererData$$1);
	}, function (MeshRendererData$$1) {
	    var renderer = new MeshRenderer(), index = generateComponentIndex(MeshRendererData$$1);
	    renderer.index = index;
	    MeshRendererData$$1.count += 1;
	    MeshRendererData$$1.meshRendererMap[index] = renderer;
	    return renderer;
	});
	var _setRenderGameObjectArray = requireCheckFunc(function (index, gameObject, renderGameObjectArray) {
	    it("should not exist gameObject", function () {
	        wdet_1(renderGameObjectArray[index]).not.exist;
	    });
	}, function (index, gameObject, renderGameObjectArray) {
	    renderGameObjectArray[index] = gameObject;
	});
	var addComponent$4 = function (component, gameObject) {
	    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData.renderGameObjectArray);
	    addComponentToGameObjectMap(MeshRendererData.gameObjectMap, component.index, gameObject);
	};
	var disposeComponent$4 = ensureFunc(function (returnVal, component) {
	    checkIndexShouldEqualCount(MeshRendererData);
	}, function (component) {
	    var sourceIndex = component.index, lastComponentIndex = null;
	    MeshRendererData.count -= 1;
	    MeshRendererData.index -= 1;
	    lastComponentIndex = MeshRendererData.count;
	    deleteBySwap$1(sourceIndex, lastComponentIndex, MeshRendererData.renderGameObjectArray);
	    deleteBySwap$1(sourceIndex, lastComponentIndex, MeshRendererData.gameObjectMap);
	    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MeshRendererData.meshRendererMap);
	});
	var getGameObject$3 = function (index, Data) {
	    return getComponentGameObject(Data.gameObjectMap, index);
	};
	var getRenderList = curry(function (state, MeshRendererData$$1) {
	    return MeshRendererData$$1.renderGameObjectArray;
	});
	var initData$6 = function (MeshRendererData$$1) {
	    MeshRendererData$$1.renderGameObjectArray = [];
	    MeshRendererData$$1.gameObjectMap = [];
	    MeshRendererData$$1.meshRendererMap = [];
	    MeshRendererData$$1.index = 0;
	    MeshRendererData$$1.count = 0;
	};

	var _generateComponentID = function () {
	    var result = _componentID;
	    _componentID += 1;
	    return String(result);
	};
	var getComponentIDFromClass = function (_class) {
	    return _table$1[ClassUtils.getClassNameByClass(_class)];
	};
	var getComponentIDFromComponent = function (component) {
	    return _table$1[ClassUtils.getClassNameByInstance(component)];
	};
	var _addComponentID = function (componentClassNameArr, table) {
	    var id = _generateComponentID();
	    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
	        var className = componentClassNameArr_1[_i];
	        table[className] = id;
	    }
	};
	var _componentID = 1;
	var _table$1 = {};
	_addComponentID(["ThreeDTransform"], _table$1);
	_addComponentID(["Geometry", "BoxGeometry", "CustomGeometry"], _table$1);
	_addComponentID(["Material", "BasicMaterial", "LightMaterial"], _table$1);
	_addComponentID(["MeshRenderer"], _table$1);
	_addComponentID(["Tag"], _table$1);
	_addComponentID(["CameraController"], _table$1);
	_addComponentID(["Light", "AmbientLight", "DirectionLight", "PointLight"], _table$1);

	var create$5 = function (GameObjectData) {
	    return create$1(null, GameObjectData);
	};
	var addChild$1 = function (scene, child, ThreeDTransformData, GameObjectData, SceneData) {
	    if (_isCamera(child, GameObjectData)) {
	        SceneData.cameraArray.push(child);
	    }
	    addChild(scene, child, ThreeDTransformData, GameObjectData);
	};
	var removeChild$1 = function (gameObject, child, ThreeDTransformData, GameObjectData) {
	    removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
	};
	var _isCamera = function (gameObject, GameObjectData) {
	    return hasComponent(gameObject, getComponentIDFromClass(CameraController), GameObjectData);
	};
	var getCurrentCamera = ensureFunc(function (camera, SceneData) {
	    it("current camera should exist", function () {
	        wdet_1(camera).exist;
	    });
	}, function (SceneData) {
	    return SceneData.cameraArray[0];
	});
	var initData$8 = function (SceneData) {
	    SceneData.cameraArray = [];
	};

	function cache(judgeFunc, returnCacheValueFunc, setCacheFunc) {
	    return function (target, name, descriptor) {
	        var value = descriptor.value;
	        descriptor.value = function (args) {
	            var result = null, setArgs = null;
	            if (judgeFunc.apply(this, arguments)) {
	                return returnCacheValueFunc.apply(this, arguments);
	            }
	            result = value.apply(this, arguments);
	            setArgs = [result];
	            for (var i = 0, len = arguments.length; i < len; i++) {
	                setArgs[i + 1] = arguments[i];
	            }
	            setCacheFunc.apply(this, setArgs);
	            return result;
	        };
	        return descriptor;
	    };
	}

	var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i;
	var REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i;
	var REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i;
	var REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i;
	var REGEX_NUM = /^\#([0-9a-f]{6})$/i;
	var Color = (function () {
	    function Color() {
	        this._r = null;
	        this._g = null;
	        this._b = null;
	        this._a = null;
	        this._colorString = null;
	        this._colorVec3Cache = null;
	        this._colorVec4Cache = null;
	        this._colorArr3Cache = null;
	    }
	    Color_1 = Color;
	    Color.create = function (colorVal) {
	        var obj = new this();
	        obj.initWhenCreate(colorVal);
	        return obj;
	    };
	    Object.defineProperty(Color.prototype, "dirty", {
	        set: function (dirty) {
	            if (dirty) {
	                this._clearCache();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "r", {
	        get: function () {
	            return this._r;
	        },
	        set: function (r) {
	            if (this._r !== r) {
	                this.dirty = true;
	                this._r = r;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "g", {
	        get: function () {
	            return this._g;
	        },
	        set: function (g) {
	            if (this._g !== g) {
	                this.dirty = true;
	                this._g = g;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "b", {
	        get: function () {
	            return this._b;
	        },
	        set: function (b) {
	            if (this._b !== b) {
	                this.dirty = true;
	                this._b = b;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "a", {
	        get: function () {
	            return this._a;
	        },
	        set: function (a) {
	            if (this._a !== a) {
	                this.dirty = true;
	                this._a = a;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Color.prototype.initWhenCreate = function (colorVal) {
	        if (!colorVal) {
	            return;
	        }
	        this._colorString = colorVal;
	        this._setColor(colorVal);
	    };
	    Color.prototype.toVector3 = function () {
	        return Vector3.create(this.r, this.g, this.b);
	    };
	    Color.prototype.toVector4 = function () {
	        return Vector4.create(this.r, this.g, this.b, this.a);
	    };
	    Color.prototype.toArray3 = function () {
	        return [this.r, this.g, this.b];
	    };
	    Color.prototype.toString = function () {
	        return this._colorString;
	    };
	    Color.prototype.clone = function () {
	        return Color_1.create(this._colorString);
	    };
	    Color.prototype.isEqual = function (color) {
	        return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
	    };
	    Color.prototype.setColorByNum = function (colorVal) {
	        var color = null;
	        this._colorString = colorVal;
	        color = REGEX_NUM.exec(colorVal);
	        this._setHex(parseInt(color[1], 16));
	        return this;
	    };
	    Color.prototype._setColor = function (colorVal) {
	        var color = null;
	        if (REGEX_RGBA.test(colorVal)) {
	            color = REGEX_RGBA.exec(colorVal);
	            this.r = this._getColorValue(color, 1);
	            this.g = this._getColorValue(color, 2);
	            this.b = this._getColorValue(color, 3);
	            this.a = Number(color[4]);
	            return this;
	        }
	        if (REGEX_RGBA_2.test(colorVal)) {
	            color = REGEX_RGBA_2.exec(colorVal);
	            this.r = parseFloat(color[1]);
	            this.g = parseFloat(color[2]);
	            this.b = parseFloat(color[3]);
	            this.a = Number(color[4]);
	            return this;
	        }
	        if (REGEX_RGB.test(colorVal)) {
	            color = REGEX_RGB.exec(colorVal);
	            this.r = this._getColorValue(color, 1);
	            this.g = this._getColorValue(color, 2);
	            this.b = this._getColorValue(color, 3);
	            this.a = 1;
	            return this;
	        }
	        if (REGEX_RGB_2.test(colorVal)) {
	            color = REGEX_RGB_2.exec(colorVal);
	            this.r = parseFloat(color[1]);
	            this.g = parseFloat(color[2]);
	            this.b = parseFloat(color[3]);
	            this.a = 1;
	            return this;
	        }
	        if (REGEX_NUM.test(colorVal)) {
	            return this.setColorByNum(colorVal);
	        }
	    };
	    Color.prototype._getColorValue = function (color, index, num) {
	        if (num === void 0) { num = 255; }
	        return Math.min(num, parseInt(color[index], 10)) / num;
	    };
	    Color.prototype._setHex = function (hex) {
	        hex = Math.floor(hex);
	        this.r = (hex >> 16 & 255) / 255;
	        this.g = (hex >> 8 & 255) / 255;
	        this.b = (hex & 255) / 255;
	        this.a = 1;
	        return this;
	    };
	    Color.prototype._clearCache = function () {
	        this._colorVec3Cache = null;
	        this._colorVec4Cache = null;
	        this._colorArr3Cache = null;
	    };
	    __decorate([
	        ensureGetter(function (r) {
	            it("r should >= 0", function () {
	                wdet_1(r).gte(0);
	            });
	        })
	    ], Color.prototype, "r", null);
	    __decorate([
	        ensureGetter(function (g) {
	            it("g should >= 0", function () {
	                wdet_1(g).gte(0);
	            });
	        })
	    ], Color.prototype, "g", null);
	    __decorate([
	        ensureGetter(function (b) {
	            it("b should >= 0", function () {
	                wdet_1(b).gte(0);
	            });
	        })
	    ], Color.prototype, "b", null);
	    __decorate([
	        ensureGetter(function (a) {
	            it("a should >= 0", function () {
	                wdet_1(a).gte(0);
	            });
	        })
	    ], Color.prototype, "a", null);
	    __decorate([
	        cache(function () {
	            return this._colorVec3Cache !== null;
	        }, function () {
	            return this._colorVec3Cache;
	        }, function (result) {
	            this._colorVec3Cache = result;
	        })
	    ], Color.prototype, "toVector3", null);
	    __decorate([
	        cache(function () {
	            return this._colorVec4Cache !== null;
	        }, function () {
	            return this._colorVec4Cache;
	        }, function (result) {
	            this._colorVec4Cache = result;
	        })
	    ], Color.prototype, "toVector4", null);
	    __decorate([
	        cache(function () {
	            return this._colorArr3Cache !== null;
	        }, function () {
	            return this._colorArr3Cache;
	        }, function (result) {
	            this._colorArr3Cache = result;
	        })
	    ], Color.prototype, "toArray3", null);
	    __decorate([
	        requireCheck(function (colorVal) {
	            it("color should be #xxxxxx", function () {
	                wdet_1(REGEX_NUM.test(colorVal)).true;
	            });
	        })
	    ], Color.prototype, "setColorByNum", null);
	    Color = Color_1 = __decorate([
	        registerClass("Color")
	    ], Color);
	    return Color;
	    var Color_1;
	}());

	var MaterialData = (function () {
	    function MaterialData() {
	    }
	    MaterialData.buffer = null;
	    MaterialData.shaderIndices = null;
	    MaterialData.colors = null;
	    MaterialData.opacities = null;
	    MaterialData.alphaTests = null;
	    MaterialData.defaultShaderIndex = null;
	    MaterialData.defaultColorArr = null;
	    MaterialData.defaultOpacity = null;
	    MaterialData.defaultAlphaTest = null;
	    MaterialData.gameObjectMap = null;
	    MaterialData.materialMap = null;
	    MaterialData.workerInitList = null;
	    return MaterialData;
	}());

	var getColorArr3$1 = function (index, DataFromSystem) {
	    return getColorArr3Data(index, DataFromSystem.colors);
	};
	var getColorArr3Data = function (index, colors) {
	    var size = 3, i = index * size;
	    return [colors[i], colors[i + 1], colors[i + 2]];
	};
	var getSingleSizeData = function (index, datas) {
	    return datas[index];
	};

	var setShaderIndex = function (materialIndex, shaderIndex, MaterialDataFromSystem) {
	    setTypeArrayValue(MaterialDataFromSystem.shaderIndices, materialIndex, shaderIndex);
	};
	var getOpacity$1 = function (materialIndex, MaterialDataFromSystem) {
	    return getSingleSizeData(materialIndex, MaterialDataFromSystem.opacities);
	};
	var getAlphaTest$1 = function (materialIndex, MaterialDataFromSystem) {
	    return getSingleSizeData(materialIndex, MaterialDataFromSystem.alphaTests);
	};
	var isTestAlpha$1 = function (alphaTest) {
	    return alphaTest >= 0;
	};
	var getShaderIndexDataSize = function () { return 1; };
	var getColorDataSize = function () { return 3; };
	var getOpacityDataSize = function () { return 1; };
	var getAlphaTestDataSize = function () { return 1; };
	var createTypeArrays = function (buffer, count, MaterialDataFromSystem) {
	    var offset = 0;
	    MaterialDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count * getShaderIndexDataSize());
	    offset += count * Uint32Array.BYTES_PER_ELEMENT * getShaderIndexDataSize();
	    MaterialDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
	    MaterialDataFromSystem.opacities = new Float32Array(buffer, offset, count * getOpacityDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getOpacityDataSize();
	    MaterialDataFromSystem.alphaTests = new Float32Array(buffer, offset, count * getAlphaTestDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getAlphaTestDataSize();
	    return offset;
	};
	var buildInitShaderDataMap = function (DeviceManagerDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, ShaderDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem) {
	    return {
	        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
	        ProgramDataFromSystem: ProgramDataFromSystem,
	        LocationDataFromSystem: LocationDataFromSystem,
	        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
	        ShaderDataFromSystem: ShaderDataFromSystem,
	        MapManagerDataFromSystem: MapManagerDataFromSystem,
	        MaterialDataFromSystem: MaterialDataFromSystem,
	        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
	        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
	        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
	        PointLightDataFromSystem: PointLightDataFromSystem
	    };
	};

	(function (EVariableType) {
	    EVariableType["INT"] = "int";
	    EVariableType["FLOAT"] = "float";
	    EVariableType["FLOAT3"] = "float3";
	    EVariableType["VEC3"] = "vec3";
	    EVariableType["MAT3"] = "mat3";
	    EVariableType["MAT4"] = "mat4";
	    EVariableType["SAMPLER_2D"] = "sampler2D";
	})(exports.EVariableType || (exports.EVariableType = {}));

	var isBufferExist = function (buffer) { return isValidMapValue(buffer); };
	var disposeBuffer = function (geometryIndex, buffers, getGL, DeviceManagerDataFromSystem) {
	    var gl = getGL(DeviceManagerDataFromSystem, null), buffer = buffers[geometryIndex];
	    if (isBufferExist(buffer)) {
	        gl.deleteBuffer(buffers[geometryIndex]);
	        deleteVal$1(geometryIndex, buffers);
	    }
	};

	var getOrCreateBuffer = function (gl, geometryIndex, buffers, getDatas, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
	    var buffer = buffers[geometryIndex];
	    if (isBufferExist(buffer)) {
	        return buffer;
	    }
	    buffer = gl.createBuffer();
	    buffers[geometryIndex] = buffer;
	    _initBuffer(gl, getDatas(geometryIndex, GeometryDataFromSystem), buffer);
	    return buffer;
	};
	var _initBuffer = function (gl, data, buffer) {
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	    _resetBindedBuffer(gl);
	};
	var _resetBindedBuffer = function (gl) {
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);
	};
	var initData$12 = function (ArrayBufferDataFromSystemFromSystem) {
	    ArrayBufferDataFromSystemFromSystem.vertexBuffer = [];
	    ArrayBufferDataFromSystemFromSystem.normalBuffers = [];
	    ArrayBufferDataFromSystemFromSystem.texCoordBuffers = [];
	};

	var getShadingDataSize = function () { return 1; };
	var getLightModelDataSize = function () { return 1; };
	var getShininessDataSize = function () { return 1; };
	var getSpecularColorArr3 = function (materialIndex, LightMaterialDataFromSystem) {
	    return getColorArr3Data(materialIndex, LightMaterialDataFromSystem.specularColors);
	};
	var getEmissionColorArr3 = function (materialIndex, LightMaterialDataFromSystem) {
	    return getColorArr3Data(materialIndex, LightMaterialDataFromSystem.emissionColors);
	};
	var getShininess = function (materialIndex, LightMaterialDataFromSystem) {
	    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shininess);
	};
	var getShading = function (materialIndex, LightMaterialDataFromSystem) {
	    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shadings);
	};
	var getLightModel = function (materialIndex, LightMaterialDataFromSystem) {
	    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.lightModels);
	};
	var hasDiffuseMap = function (LightMaterialDataFromSystem) {
	    return _isLightMapExist(LightMaterialDataFromSystem.diffuseMapIndex);
	};
	var hasSpecularMap = function (LightMaterialDataFromSystem) {
	    return _isLightMapExist(LightMaterialDataFromSystem.specularMapIndex);
	};
	var _isLightMapExist = function (mapIndex) { return mapIndex !== null; };
	var computeLightBufferIndex = function (index) { return index - getLightMaterialBufferStartIndex(); };
	var createTypeArrays$2 = function (buffer, offset, count, LightMaterialDataFromSystem) {
	    LightMaterialDataFromSystem.specularColors = new Float32Array(buffer, offset, count * getColorDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
	    LightMaterialDataFromSystem.emissionColors = new Float32Array(buffer, offset, count * getColorDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();
	    LightMaterialDataFromSystem.shininess = new Float32Array(buffer, offset, count * getShininessDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getShininessDataSize();
	    LightMaterialDataFromSystem.shadings = new Uint8Array(buffer, offset, count * getShadingDataSize());
	    offset += count * Uint8Array.BYTES_PER_ELEMENT * getShadingDataSize();
	    LightMaterialDataFromSystem.lightModels = new Uint8Array(buffer, offset, count * getLightModelDataSize());
	    offset += count * Uint8Array.BYTES_PER_ELEMENT * getLightModelDataSize();
	    return offset;
	};
	var getClassName = function () { return "LightMaterial"; };

	var getMaterialBufferSize = function () {
	    return Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
	};
	var getBasicMaterialBufferCount = function () {
	    return DataBufferConfig.basicMaterialDataBufferCount;
	};
	var getBasicMaterialBufferSize = function () {
	    return getMaterialBufferSize();
	};
	var getLightMaterialBufferCount = function () {
	    return DataBufferConfig.lightMaterialDataBufferCount;
	};
	var getLightMaterialBufferSize = function () {
	    return getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getLightModelDataSize()) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + getShininessDataSize());
	};
	var getBufferLength = function () {
	    return getBasicMaterialBufferCount() * getBasicMaterialBufferSize() + getLightMaterialBufferCount() * getLightMaterialBufferSize();
	};
	var getBufferTotalCount = function () {
	    return getBasicMaterialBufferCount() + getLightMaterialBufferCount();
	};
	var getBasicMaterialBufferStartIndex = function () { return 0; };
	var getLightMaterialBufferStartIndex = function () { return DataBufferConfig.basicMaterialDataBufferCount; };

	(function (ETextureWrapMode) {
	    ETextureWrapMode["REPEAT"] = "REPEAT";
	    ETextureWrapMode["MIRRORED_REPEAT"] = "MIRRORED_REPEAT";
	    ETextureWrapMode["CLAMP_TO_EDGE"] = "CLAMP_TO_EDGE";
	})(exports.ETextureWrapMode || (exports.ETextureWrapMode = {}));

	(function (ETextureFilterMode) {
	    ETextureFilterMode["NEAREST"] = "NEAREST";
	    ETextureFilterMode["NEAREST_MIPMAP_MEAREST"] = "NEAREST_MIPMAP_MEAREST";
	    ETextureFilterMode["NEAREST_MIPMAP_LINEAR"] = "NEAREST_MIPMAP_LINEAR";
	    ETextureFilterMode["LINEAR"] = "LINEAR";
	    ETextureFilterMode["LINEAR_MIPMAP_NEAREST"] = "LINEAR_MIPMAP_NEAREST";
	    ETextureFilterMode["LINEAR_MIPMAP_LINEAR"] = "LINEAR_MIPMAP_LINEAR";
	})(exports.ETextureFilterMode || (exports.ETextureFilterMode = {}));

	(function (ETextureFormat) {
	    ETextureFormat["RGB"] = "RGB";
	    ETextureFormat["RGBA"] = "RGBA";
	    ETextureFormat["ALPHA"] = "ALPHA";
	    ETextureFormat["LUMINANCE"] = "LUMINANCE";
	    ETextureFormat["LUMINANCE_ALPHA"] = "LUMINANCE_ALPHA";
	    ETextureFormat["RGB_S3TC_DXT1"] = "RGB_S3TC_DXT1";
	    ETextureFormat["RGBA_S3TC_DXT1"] = "RGBA_S3TC_DXT1";
	    ETextureFormat["RGBA_S3TC_DXT3"] = "RGBA_S3TC_DXT3";
	    ETextureFormat["RGBA_S3TC_DXT5"] = "RGBA_S3TC_DXT5";
	})(exports.ETextureFormat || (exports.ETextureFormat = {}));

	(function (ETextureType) {
	    ETextureType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
	    ETextureType["UNSIGNED_SHORT_5_6_5"] = "UNSIGNED_SHORT_5_6_5";
	    ETextureType["UNSIGNED_SHORT_4_4_4_4"] = "UNSIGNED_SHORT_4_4_4_4";
	    ETextureType["UNSIGNED_SHORT_5_5_5_1"] = "UNSIGNED_SHORT_5_5_5_1";
	})(exports.ETextureType || (exports.ETextureType = {}));

	(function (ETextureTarget) {
	    ETextureTarget["TEXTURE_2D"] = "TEXTURE_2D";
	})(exports.ETextureTarget || (exports.ETextureTarget = {}));

	function singleton(isInitWhenCreate) {
	    if (isInitWhenCreate === void 0) { isInitWhenCreate = false; }
	    return function (target) {
	        target._instance = null;
	        if (isInitWhenCreate) {
	            target.getInstance = function () {
	                if (target._instance === null) {
	                    var instance = new target();
	                    target._instance = instance;
	                    instance.initWhenCreate();
	                }
	                return target._instance;
	            };
	        }
	        else {
	            target.getInstance = function () {
	                if (target._instance === null) {
	                    target._instance = new target();
	                }
	                return target._instance;
	            };
	        }
	    };
	}

	var GPUDetector = (function () {
	    function GPUDetector() {
	        this.maxTextureUnit = null;
	        this.maxTextureSize = null;
	        this.maxCubemapTextureSize = null;
	        this.maxAnisotropy = null;
	        this.maxBoneCount = null;
	        this.extensionCompressedTextureS3TC = null;
	        this.extensionTextureFilterAnisotropic = null;
	        this.extensionInstancedArrays = null;
	        this.extensionUintIndices = null;
	        this.extensionDepthTexture = null;
	        this.extensionVAO = null;
	        this.extensionStandardDerivatives = null;
	        this.precision = null;
	        this._isDetected = false;
	    }
	    GPUDetector.getInstance = function () { };
	    GPUDetector.prototype.detect = function (state, getGL, DeviceManagerDataFromSystem) {
	        var gl = getGL(DeviceManagerDataFromSystem, state);
	        this._isDetected = true;
	        this._detectExtension(state, gl);
	        this._detectCapabilty(state, gl);
	        return state;
	    };
	    GPUDetector.prototype._detectExtension = function (state, gl) {
	        this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc", state, gl);
	        this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic", state, gl);
	        this.extensionInstancedArrays = this._getExtension("ANGLE_instanced_arrays", state, gl);
	        this.extensionUintIndices = this._getExtension("element_index_uint", state, gl);
	        this.extensionDepthTexture = this._getExtension("depth_texture", state, gl);
	        this.extensionVAO = this._getExtension("vao", state, gl);
	        this.extensionStandardDerivatives = this._getExtension("standard_derivatives", state, gl);
	    };
	    GPUDetector.prototype._detectCapabilty = function (state, gl) {
	        this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
	        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
	        this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
	        this.maxAnisotropy = this._getMaxAnisotropy(state, gl);
	        this.maxBoneCount = this._getMaxBoneCount(state, gl);
	        this._detectPrecision(state, gl);
	    };
	    GPUDetector.prototype._getExtension = function (name, state, gl) {
	        var extension = null;
	        switch (name) {
	            case "EXT_texture_filter_anisotropic":
	                extension = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
	                break;
	            case "WEBGL_compressed_texture_s3tc":
	                extension = gl.getExtension("WEBGL_compressed_texture_s3tc") || gl.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
	                break;
	            case "WEBGL_compressed_texture_pvrtc":
	                extension = gl.getExtension("WEBGL_compressed_texture_pvrtc") || gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
	                break;
	            case "ANGLE_instanced_arrays":
	                extension = gl.getExtension("ANGLE_instanced_arrays");
	                break;
	            case "element_index_uint":
	                extension = gl.getExtension("OES_element_index_uint") !== null;
	                break;
	            case "depth_texture":
	                extension = gl.getExtension("WEBKIT_WEBGL_depth_texture") !== null || gl.getExtension("WEBGL_depth_texture") !== null;
	                break;
	            case "vao":
	                extension = gl.getExtension("OES_vertex_array_object");
	                break;
	            case "standard_derivatives":
	                extension = gl.getExtension("OES_standard_derivatives");
	                break;
	            default:
	                extension = gl.getExtension(name);
	                break;
	        }
	        return extension;
	    };
	    GPUDetector.prototype._getMaxBoneCount = function (state, gl) {
	        var numUniforms = null, maxBoneCount = null;
	        numUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
	        numUniforms -= 4 * 4;
	        numUniforms -= 1;
	        numUniforms -= 4 * 4;
	        maxBoneCount = Math.floor(numUniforms / 4);
	        return Math.min(maxBoneCount, 128);
	    };
	    GPUDetector.prototype._getMaxAnisotropy = function (state, gl) {
	        var extension = this.extensionTextureFilterAnisotropic;
	        return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
	    };
	    GPUDetector.prototype._detectPrecision = function (state, gl) {
	        if (!gl.getShaderPrecisionFormat) {
	            this.precision = exports.EGPUPrecision.HIGHP;
	            return;
	        }
	        var vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT), vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT), fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT), highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0, mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
	        if (!highpAvailable) {
	            if (mediumpAvailable) {
	                this.precision = exports.EGPUPrecision.MEDIUMP;
	                Log$$1.warn(Log$$1.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
	            }
	            else {
	                this.precision = exports.EGPUPrecision.LOWP;
	                Log$$1.warn(Log$$1.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
	            }
	        }
	        else {
	            this.precision = exports.EGPUPrecision.HIGHP;
	        }
	    };
	    GPUDetector = __decorate([
	        singleton(),
	        registerClass("GPUDetector")
	    ], GPUDetector);
	    return GPUDetector;
	}());

	(function (EGPUPrecision) {
	    EGPUPrecision[EGPUPrecision["HIGHP"] = 0] = "HIGHP";
	    EGPUPrecision[EGPUPrecision["MEDIUMP"] = 1] = "MEDIUMP";
	    EGPUPrecision[EGPUPrecision["LOWP"] = 2] = "LOWP";
	})(exports.EGPUPrecision || (exports.EGPUPrecision = {}));

	var isCached = function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
	    return _getActiveTexture(unitIndex, TextureCacheDataFromSystem) === textureIndex;
	};
	var _getActiveTexture = requireCheckFunc(function (unitIndex, TextureCacheDataFromSystem) {
	    _checkUnit(unitIndex);
	}, function (unitIndex, TextureCacheDataFromSystem) {
	    return TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex];
	});
	var addActiveTexture = requireCheckFunc(function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
	    _checkUnit(unitIndex);
	}, function (unitIndex, textureIndex, TextureCacheDataFromSystem) {
	    TextureCacheDataFromSystem.bindTextureUnitCache[unitIndex] = textureIndex;
	});
	var _checkUnit = function (unitIndex) {
	    var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;
	    it("texture unitIndex should >= 0, but actual is " + unitIndex, function () {
	        wdet_1(unitIndex).gte(0);
	    });
	    it("trying to cache " + unitIndex + " texture unitIndexs, but GPU only supports " + maxTextureUnit + " unitIndexs", function () {
	        wdet_1(unitIndex).lt(maxTextureUnit);
	    });
	};
	var clearAllBindTextureUnitCache = function (TextureCacheDataFromSystem) {
	    TextureCacheDataFromSystem.bindTextureUnitCache = [];
	};
	var initData$13 = function (TextureCacheDataFromSystem) {
	    TextureCacheDataFromSystem.bindTextureUnitCache = [];
	};

	var getBufferDataSize = function () { return 1; };
	var createTypeArrays$3 = function (buffer, count, TextureDataFromSystem) {
	    var offset = 0;
	    TextureDataFromSystem.widths = new Float32Array(buffer, offset, count * getBufferDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();
	    TextureDataFromSystem.heights = new Float32Array(buffer, offset, count * getBufferDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getBufferDataSize();
	    TextureDataFromSystem.isNeedUpdates = new Uint8Array(buffer, offset, count * getBufferDataSize());
	    offset += count * Uint8Array.BYTES_PER_ELEMENT * getBufferDataSize();
	    return offset;
	};
	var getSource = function (textureIndex, TextureDataFromSystem) {
	    return TextureDataFromSystem.sourceMap[textureIndex];
	};
	var getWidth = function (textureIndex, TextureDataFromSystem) {
	    var width = getSingleSizeData(textureIndex, TextureDataFromSystem.widths);
	    if (width === 0) {
	        var source = getSource(textureIndex, TextureDataFromSystem);
	        if (_isSourceValueExist(source)) {
	            return source.width;
	        }
	    }
	    return width;
	};
	var getHeight = function (textureIndex, TextureDataFromSystem) {
	    var height = getSingleSizeData(textureIndex, TextureDataFromSystem.heights);
	    if (height === 0) {
	        var source = getSource(textureIndex, TextureDataFromSystem);
	        if (_isSourceValueExist(source)) {
	            return source.height;
	        }
	    }
	    return height;
	};
	var getWrapS = function (textureIndex, TextureData) {
	    return exports.ETextureWrapMode.CLAMP_TO_EDGE;
	};
	var getWrapT = function (textureIndex, TextureData) {
	    return exports.ETextureWrapMode.CLAMP_TO_EDGE;
	};
	var getMagFilter = function (textureIndex, TextureData) {
	    return exports.ETextureFilterMode.LINEAR;
	};
	var getMinFilter = function (textureIndex, TextureData) {
	    return exports.ETextureFilterMode.NEAREST;
	};
	var getFormat = function (textureIndex, TextureData) {
	    return exports.ETextureFormat.RGBA;
	};
	var getType = function (textureIndex, TextureData) {
	    return exports.ETextureType.UNSIGNED_BYTE;
	};
	var getFlipY = function (textureIndex, TextureData) {
	    return true;
	};
	var getIsNeedUpdate = function (textureIndex, TextureDataFromSystem) {
	    return getSingleSizeData(textureIndex, TextureDataFromSystem.isNeedUpdates);
	};
	var setIsNeedUpdate = function (textureIndex, value, TextureDataFromSystem) {
	    setTypeArrayValue(TextureDataFromSystem.isNeedUpdates, textureIndex, value);
	};
	var initTextures = function (gl, TextureDataFromSystem) {
	    for (var i = 0; i < TextureDataFromSystem.index; i++) {
	        initTexture(gl, i, TextureDataFromSystem);
	    }
	};
	var initTexture = function (gl, textureIndex, TextureDataFromSystem) {
	    _createWebglTexture(gl, textureIndex, TextureDataFromSystem);
	};
	var _createWebglTexture = function (gl, textureIndex, TextureDataFromSystem) {
	    var glTexture = _getWebglTexture(textureIndex, TextureDataFromSystem);
	    if (_isGLTextureExist(glTexture)) {
	        return;
	    }
	    TextureDataFromSystem.glTextures[textureIndex] = gl.createTexture();
	};
	var _isGLTextureExist = function (glTexture) { return isValidVal(glTexture); };
	var _isSourceExist = function (textureIndex, TextureDataFromSystem) { return _isSourceValueExist(TextureDataFromSystem.sourceMap[textureIndex]); };
	var _isSourceValueExist = function (source) { return isValidVal(source); };
	var _getWebglTexture = function (textureIndex, TextureData) {
	    return TextureData.glTextures[textureIndex];
	};
	var getBufferCount$1 = function () { return DataBufferConfig.textureDataBufferCount; };
	var needUpdate = function (textureIndex, TextureDataFromSystem) {
	    return getIsNeedUpdate(textureIndex, TextureDataFromSystem) === 0;
	};
	var markNeedUpdate = function (textureIndex, value, TextureDataFromSystem) {
	    if (value === false) {
	        setIsNeedUpdate(textureIndex, 1, TextureDataFromSystem);
	    }
	    else {
	        setIsNeedUpdate(textureIndex, 0, TextureDataFromSystem);
	    }
	};
	var update$3 = requireCheckFunc(function (gl, textureIndex, setFlipY, TextureDataFromSystem) {
	    it("texture source should exist", function () {
	        wdet_1(_isSourceExist(textureIndex, TextureDataFromSystem)).true;
	    });
	}, function (gl, textureIndex, setFlipY, TextureDataFromSystem) {
	    var width = getWidth(textureIndex, TextureDataFromSystem), height = getHeight(textureIndex, TextureDataFromSystem), wrapS = getWrapS(textureIndex, TextureDataFromSystem), wrapT = getWrapT(textureIndex, TextureDataFromSystem), magFilter = getMagFilter(textureIndex, TextureDataFromSystem), minFilter = getMinFilter(textureIndex, TextureDataFromSystem), format = getFormat(textureIndex, TextureDataFromSystem), type = getType(textureIndex, TextureDataFromSystem), flipY = getFlipY(textureIndex, TextureDataFromSystem), source = TextureDataFromSystem.sourceMap[textureIndex], target = exports.ETextureTarget.TEXTURE_2D, isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
	    setFlipY(gl, flipY);
	    _setTextureParameters(gl, gl[target], isSourcePowerOfTwo, wrapS, wrapT, magFilter, minFilter);
	    _allocateSourceToTexture(gl, source, format, type);
	    markNeedUpdate(textureIndex, false, TextureDataFromSystem);
	});
	var _setTextureParameters = function (gl, textureType, isSourcePowerOfTwo, wrapS, wrapT, magFilter, minFilter) {
	    if (isSourcePowerOfTwo) {
	        gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl[wrapS]);
	        gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl[wrapT]);
	        gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[magFilter]);
	        gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[minFilter]);
	    }
	    else {
	        gl.texParameteri(textureType, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(textureType, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	        gl.texParameteri(textureType, gl.TEXTURE_MAG_FILTER, gl[_filterFallback(magFilter)]);
	        gl.texParameteri(textureType, gl.TEXTURE_MIN_FILTER, gl[_filterFallback(minFilter)]);
	    }
	};
	var _filterFallback = function (filter$$1) {
	    if (filter$$1 === exports.ETextureFilterMode.NEAREST || filter$$1 === exports.ETextureFilterMode.NEAREST_MIPMAP_MEAREST || filter$$1 === exports.ETextureFilterMode.NEAREST_MIPMAP_LINEAR) {
	        return exports.ETextureFilterMode.NEAREST;
	    }
	    return exports.ETextureFilterMode.LINEAR;
	};
	var _allocateSourceToTexture = function (gl, source, format, type) {
	    _drawNoMipmapTwoDTexture(gl, source, format, type);
	};
	var _drawNoMipmapTwoDTexture = function (gl, source, format, type) {
	    _drawTexture(gl, gl.TEXTURE_2D, 0, source, format, type);
	};
	var _drawTexture = function (gl, glTarget, index, source, format, type) {
	    gl.texImage2D(glTarget, index, gl[format], gl[format], gl[type], source);
	};
	var _isSourcePowerOfTwo = function (width, height) {
	    return _isPowerOfTwo(width) && _isPowerOfTwo(height);
	};
	var _isPowerOfTwo = function (value) {
	    return (value & (value - 1)) === 0 && value !== 0;
	};
	var bindToUnit = function (gl, unitIndex, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem, isCached$$1, addActiveTexture$$1) {
	    var target = exports.ETextureTarget.TEXTURE_2D;
	    if (isCached$$1(unitIndex, textureIndex, TextureCacheDataFromSystem)) {
	        return;
	    }
	    addActiveTexture$$1(unitIndex, textureIndex, TextureCacheDataFromSystem);
	    gl.activeTexture(gl["TEXTURE" + unitIndex]);
	    gl.bindTexture(gl[target], _getWebglTexture(textureIndex, TextureDataFromSystem));
	};
	var sendData$1 = function (gl, mapCount, shaderIndex, textureIndex, unitIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem) {
	    directlySendUniformData(gl, _getUniformSamplerName(textureIndex, TextureDataFromSystem), shaderIndex, program, _getSamplerType(_getTarget()), unitIndex, glslSenderData, uniformLocationMap, uniformCacheMap);
	};
	var _getSamplerType = function (target) {
	    var type = null;
	    switch (target) {
	        case exports.ETextureTarget.TEXTURE_2D:
	            type = exports.EVariableType.SAMPLER_2D;
	            break;
	        default:
	            break;
	    }
	    return type;
	};
	var _getTarget = function () {
	    return exports.ETextureTarget.TEXTURE_2D;
	};
	var _getUniformSamplerName = function (index, TextureDataFromSystem) {
	    return TextureDataFromSystem.uniformSamplerNameMap[index];
	};
	var disposeSourceMap = function (sourceIndex, lastComponentIndex, TextureDataFromSystem) {
	    deleteBySwap$1(sourceIndex, lastComponentIndex, TextureDataFromSystem.sourceMap);
	};
	var disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheDataFromSystem, TextureDataFromSystem) {
	    var glTexture = _getWebglTexture(sourceIndex, TextureDataFromSystem);
	    gl.deleteTexture(glTexture);
	    _unBindAllUnit(gl, TextureCacheDataFromSystem);
	    deleteBySwap$1(sourceIndex, lastComponentIndex, TextureDataFromSystem.glTextures);
	};
	var _unBindAllUnit = function (gl, TextureCacheDataFromSystem) {
	    var maxTextureUnit = GPUDetector.getInstance().maxTextureUnit;
	    for (var channel = 0; channel < maxTextureUnit; channel++) {
	        gl.activeTexture(gl["TEXTURE" + channel]);
	        gl.bindTexture(gl.TEXTURE_2D, null);
	    }
	    clearAllBindTextureUnitCache(TextureCacheDataFromSystem);
	};
	var _getWebglTexture = function (textureIndex, TextureDataFromSystem) {
	    return TextureDataFromSystem.glTextures[textureIndex];
	};

	var getTextureIndexDataSize = function () { return 1; };
	var getTextureCountDataSize = function () { return 1; };
	var bindAndUpdate = function (gl, mapCount, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, bindToUnit$$1, needUpdate$$1, update$$1) {
	    var textureIndices = MapManagerDataFromSystem.textureIndices;
	    for (var i = 0; i < mapCount; i++) {
	        var textureIndex = textureIndices[i];
	        bindToUnit$$1(gl, i, textureIndex, TextureCacheDataFromSystem, TextureDataFromSystem);
	        if (needUpdate$$1(textureIndex, TextureDataFromSystem)) {
	            update$$1(gl, textureIndex, TextureDataFromSystem);
	        }
	    }
	};
	var sendData$$1 = function (gl, mapCount, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData, MapManagerData) {
	    var textureIndices = MapManagerData.textureIndices;
	    for (var i = 0; i < mapCount; i++) {
	        var textureIndex = textureIndices[i];
	        sendData$1(gl, mapCount, shaderIndex, textureIndex, i, program, glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureData);
	    }
	};
	var getMapCount = function (materialIndex, MapManagerDataFromSystem) {
	    return MapManagerDataFromSystem.textureCounts[materialIndex];
	};
	var getBufferCount$$1 = function () { return getBufferTotalCount() * getMaxTextureCount(); };
	var getMaxTextureCount = function () { return 16; };
	var createTypeArrays$1 = function (buffer, count, MapManagerDataFromSystem) {
	    var offset = 0;
	    MapManagerDataFromSystem.textureIndices = new Float32Array(buffer, offset, count * getTextureIndexDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getTextureIndexDataSize();
	    MapManagerDataFromSystem.textureCounts = new Uint8Array(buffer, offset, count * getTextureCountDataSize());
	    offset += count * Uint8Array.BYTES_PER_ELEMENT * getTextureCountDataSize();
	    return offset;
	};

	var use$2 = requireCheckFunc(function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
	    it("program should exist", function () {
	        wdet_1(getProgram(shaderIndex, ProgramDataFromSystem)).exist;
	    });
	}, function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
	    var program = getProgram(shaderIndex, ProgramDataFromSystem);
	    if (ProgramDataFromSystem.lastUsedProgram === program) {
	        return program;
	    }
	    ProgramDataFromSystem.lastUsedProgram = program;
	    gl.useProgram(program);
	    disableVertexAttribArray(gl, GLSLSenderDataFromSystem);
	    ProgramDataFromSystem.lastBindedArrayBuffer = null;
	    ProgramDataFromSystem.lastBindedIndexBuffer = null;
	    return program;
	});
	var disableVertexAttribArray = requireCheckFunc(function (gl, GLSLSenderDataFromSystem) {
	    it("vertexAttribHistory should has not hole", function () {
	        forEach(GLSLSenderDataFromSystem.vertexAttribHistory, function (isEnable) {
	            wdet_1(isEnable).exist;
	            wdet_1(isEnable).be.a("boolean");
	        });
	    });
	}, function (gl, GLSLSenderDataFromSystem) {
	    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;
	    for (var i = 0, len = vertexAttribHistory.length; i < len; i++) {
	        var isEnable = vertexAttribHistory[i];
	        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
	            continue;
	        }
	        gl.disableVertexAttribArray(i);
	    }
	    GLSLSenderDataFromSystem.vertexAttribHistory = [];
	});
	var getMaterialShaderLibConfig = requireCheckFunc(function (materialClassName, material_config) {
	    var materialData = material_config.materials[materialClassName];
	    it("materialClassName should be defined", function () {
	        wdet_1(materialData).exist;
	    });
	    it("shaderLib should be array", function () {
	        wdet_1(materialData.shader.shaderLib).be.a("array");
	    });
	}, function (materialClassName, material_config) {
	    return material_config.materials[materialClassName].shader.shaderLib;
	});
	var registerProgram = function (shaderIndex, ProgramDataFromSystem, program) {
	    ProgramDataFromSystem.programMap[shaderIndex] = program;
	};
	var getProgram = ensureFunc(function (program) {
	}, function (shaderIndex, ProgramDataFromSystem) {
	    return ProgramDataFromSystem.programMap[shaderIndex];
	});
	var isProgramExist = function (program) { return isValidMapValue(program); };
	var initShader = function (program, vsSource, fsSource, gl) {
	    var vs = _compileShader(gl, vsSource, gl.createShader(gl.VERTEX_SHADER)), fs = _compileShader(gl, fsSource, gl.createShader(gl.FRAGMENT_SHADER));
	    gl.attachShader(program, vs);
	    gl.attachShader(program, fs);
	    gl.bindAttribLocation(program, 0, "a_position");
	    _linkProgram(gl, program);
	    gl.deleteShader(vs);
	    gl.deleteShader(fs);
	};
	var _linkProgram = ensureFunc(function (returnVal, gl, program) {
	    it("link program error:" + gl.getProgramInfoLog(program), function () {
	        wdet_1(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
	    });
	}, function (gl, program) {
	    gl.linkProgram(program);
	});
	var _compileShader = function (gl, glslSource, shader) {
	    gl.shaderSource(shader, glslSource);
	    gl.compileShader(shader);
	    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	        return shader;
	    }
	    else {
	        Log$$1.log(gl.getShaderInfoLog(shader));
	        Log$$1.log("source:\n", glslSource);
	    }
	};
	var sendAttributeData$2 = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
	    var sendDataArr = GLSLSenderDataFromSystem.sendAttributeConfigMap[shaderIndex], attributeLocationMap = LocationDataFromSystem.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ProgramDataFromSystem.lastBindedArrayBuffer;
	    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
	        var sendData_1 = sendDataArr_1[_i];
	        var bufferName = sendData_1.buffer, buffer = _getOrCreateArrayBuffer(gl, geometryIndex, bufferName, getArrayBufferDataFuncMap, GeometryDataFromSystem, ArrayBufferDataFromSystem), pos = null;
	        if (lastBindedArrayBuffer === buffer) {
	            continue;
	        }
	        pos = getAttribLocation(gl, program, sendData_1.name, attributeLocationMap);
	        if (isAttributeLocationNotExist(pos)) {
	            continue;
	        }
	        lastBindedArrayBuffer = buffer;
	        sendBuffer(gl, sendData_1.type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferDataFromSystem);
	    }
	    ProgramDataFromSystem.lastBindedArrayBuffer = lastBindedArrayBuffer;
	};
	var _getOrCreateArrayBuffer = function (gl, geometryIndex, bufferName, _a, GeometryDataFromSystem, ArrayBufferDataFromSystem) {
	    var getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords;
	    var buffer = null;
	    switch (bufferName) {
	        case "vertex":
	            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.vertexBuffer, getVertices, GeometryDataFromSystem, ArrayBufferDataFromSystem);
	            break;
	        case "normal":
	            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.normalBuffers, getNormals, GeometryDataFromSystem, ArrayBufferDataFromSystem);
	            break;
	        case "texCoord":
	            buffer = getOrCreateBuffer(gl, geometryIndex, ArrayBufferDataFromSystem.texCoordBuffers, getTexCoords, GeometryDataFromSystem, ArrayBufferDataFromSystem);
	            break;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_INVALID("name:" + name));
	            break;
	    }
	    return buffer;
	};
	var sendUniformData$2 = function (gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData) {
	    var uniformLocationMap = drawDataMap.LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = drawDataMap.GLSLSenderDataFromSystem.uniformCacheMap;
	    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, drawDataMap, uniformLocationMap, uniformCacheMap, renderCommandUniformData);
	    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
	    sendData$$1(gl, mapCount, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, drawDataMap.TextureDataFromSystem, drawDataMap.MapManagerDataFromSystem);
	};
	var _sendUniformData = function (gl, shaderIndex, program, glslSenderData, _a, uniformLocationMap, uniformCacheMap, renderCommandUniformData) {
	    var MaterialDataFromSystem = _a.MaterialDataFromSystem, BasicMaterialDataFromSystem = _a.BasicMaterialDataFromSystem, LightMaterialDataFromSystem = _a.LightMaterialDataFromSystem;
	    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];
	    for (var i = 0, len = sendUniformDataArr.length; i < len; i++) {
	        var sendData_2 = sendUniformDataArr[i], name = sendData_2.name, field = sendData_2.field, type = sendData_2.type, from = sendData_2.from || "cmd", data = glslSenderData.getUniformData(field, from, renderCommandUniformData, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem);
	        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
	    }
	};
	var directlySendUniformData = function (gl, name, shaderIndex, program, type, data, _a, uniformLocationMap, uniformCacheMap) {
	    var sendMatrix3 = _a.sendMatrix3, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendInt = _a.sendInt, sendFloat1 = _a.sendFloat1, sendFloat3 = _a.sendFloat3;
	    switch (type) {
	        case exports.EVariableType.MAT3:
	            sendMatrix3(gl, program, name, data, uniformLocationMap);
	            break;
	        case exports.EVariableType.MAT4:
	            sendMatrix4(gl, program, name, data, uniformLocationMap);
	            break;
	        case exports.EVariableType.VEC3:
	            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
	            break;
	        case exports.EVariableType.INT:
	        case exports.EVariableType.SAMPLER_2D:
	            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
	            break;
	        case exports.EVariableType.FLOAT:
	            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
	            break;
	        case exports.EVariableType.FLOAT3:
	            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
	            break;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_INVALID("EVariableType:", type));
	            break;
	    }
	};
	var _sendUniformFuncData = function (gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap) {
	    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];
	    for (var i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
	        var sendFunc = sendUniformFuncDataArr[i];
	        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
	    }
	};
	var initData$11 = function (ProgramDataFromSystem) {
	    ProgramDataFromSystem.programMap = createMap();
	};

	var immutable = createCommonjsModule(function (module, exports) {
	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	  module.exports = factory();
	}(commonjsGlobal, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function Iterator(next) {
	      this.next = next;
	    }

	    Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect =
	  Iterator.prototype.toSource = function () { return this.toString(); };
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step !== 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      if (o !== o || o === Infinity) {
	        return 0;
	      }
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(Map, KeyedCollection);

	    // @pragma Construction

	    function Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
	      return emptyMap().withMutations(function(map ) {
	        for (var i = 0; i < keyValues.length; i += 2) {
	          if (i + 1 >= keyValues.length) {
	            throw new Error('Missing value for key: ' + keyValues[i]);
	          }
	          map.set(keyValues[i], keyValues[i + 1]);
	        }
	      });
	    };

	    Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger, arguments);
	    };

	    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	    };

	    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  };

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  };

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  };

	  createClass(MapIterator, Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ?
	      existing.mergeDeep(value) :
	      is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function(existing, value, key)  {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        };
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.insert = function(index, value) {
	      return this.splice(index, 0, value);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger, arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMergerWith(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value);
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    };
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    };
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    };
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    };
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    };
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      if (end === Infinity) {
	        end = originalSize;
	      } else {
	        end = end | 0;
	      }
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      };
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    };

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    };
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    };
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      if (this._map && !this._map.has(k)) {
	        var defaultVal = this._defaultValues[k];
	        if (v === defaultVal) {
	          return this;
	        }
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	    // @pragma Construction

	    function Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findEntry: function(predicate, context, notSetValue) {
	      var found = notSetValue;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    findLastEntry: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	    },

	    findLastKey: function(predicate, context) {
	      return this.toKeyedSeq().reverse().findKey(predicate, context);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    lastKeyOf: function(searchValue) {
	      return this.toKeyedSeq().reverse().keyOf(searchValue);
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      var key = this.lastKeyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var entry = this.findLastEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    keySeq: function() {
	      return Range(0, this.size);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;
	  SetIterable.prototype.contains = SetIterable.prototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));
	});

	var immutable_1 = immutable.fromJS;
	var immutable_2 = immutable.Map;

	var createState = function () {
	    return immutable_2();
	};
	var isValueExist = function (val) {
	    return val !== void 0;
	};

	var isConfigDataExist = function (configData) {
	    return isValueExist(configData);
	};

	(function (EBufferType) {
	    EBufferType["BYTE"] = "BYTE";
	    EBufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
	    EBufferType["SHORT"] = "SHORT";
	    EBufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
	    EBufferType["INT"] = "INT";
	    EBufferType["UNSIGNED_INT"] = "UNSIGNED_INT";
	    EBufferType["FLOAT"] = "FLOAT";
	})(exports.EBufferType || (exports.EBufferType = {}));

	var getUniformData = function (field, from, renderCommandUniformData, materialData, basicMaterialData, lightMaterialData) {
	    var data = null;
	    switch (from) {
	        case "cmd":
	            data = renderCommandUniformData[field];
	            break;
	        case "basicMaterial":
	            data = _getUnifromDataFromBasicMaterial(field, renderCommandUniformData.materialIndex, materialData, basicMaterialData);
	            break;
	        case "lightMaterial":
	            data = _getUnifromDataFromLightMaterial(field, renderCommandUniformData.materialIndex, materialData, lightMaterialData);
	            break;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_UNKNOW("from:" + from));
	            break;
	    }
	    return data;
	};
	var _getUnifromDataFromBasicMaterial = function (field, index, _a, _b) {
	    var getColorArr3 = _a.getColorArr3, getOpacity = _a.getOpacity, MaterialDataFromSystem = _a.MaterialDataFromSystem;
	    var BasicMaterialDataFromSystem = _b.BasicMaterialDataFromSystem;
	    var data = null;
	    switch (field) {
	        case "color":
	            data = getColorArr3(index, MaterialDataFromSystem);
	            break;
	        case "opacity":
	            data = getOpacity(index, MaterialDataFromSystem);
	            break;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_UNKNOW("field:" + field));
	            break;
	    }
	    return data;
	};
	var _getUnifromDataFromLightMaterial = function (field, index, _a, _b) {
	    var getColorArr3 = _a.getColorArr3, getOpacity = _a.getOpacity, MaterialDataFromSystem = _a.MaterialDataFromSystem;
	    var getEmissionColorArr3 = _b.getEmissionColorArr3, getSpecularColorArr3 = _b.getSpecularColorArr3, getShininess = _b.getShininess, getLightModel = _b.getLightModel, LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
	    var data = null;
	    switch (field) {
	        case "color":
	            data = getColorArr3(index, MaterialDataFromSystem);
	            break;
	        case "emissionColor":
	            data = getEmissionColorArr3(index, LightMaterialDataFromSystem);
	            break;
	        case "opacity":
	            data = getOpacity(index, MaterialDataFromSystem);
	            break;
	        case "specularColor":
	            data = getSpecularColorArr3(index, LightMaterialDataFromSystem);
	            break;
	        case "shininess":
	            data = getShininess(index, LightMaterialDataFromSystem);
	            break;
	        case "lightModel":
	            data = getLightModel(index, LightMaterialDataFromSystem);
	            break;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_UNKNOW("field:" + field));
	            break;
	    }
	    return data;
	};
	var sendBuffer = function (gl, type, pos, buffer, geometryIndex, GLSLSenderDataFromSystem, ArrayBufferData) {
	    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	    gl.vertexAttribPointer(pos, _getBufferSizeByType(type), gl[exports.EBufferType.FLOAT], false, 0, 0);
	    if (vertexAttribHistory[pos] !== true) {
	        gl.enableVertexAttribArray(pos);
	        vertexAttribHistory[pos] = true;
	    }
	};
	var _getBufferSizeByType = function (type) {
	    var size = null;
	    switch (type) {
	        case "vec2":
	            size = 2;
	            break;
	        case "vec3":
	            size = 3;
	            break;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_INVALID("type:" + type));
	            break;
	    }
	    return size;
	};
	var sendMatrix3 = function (gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
	    _sendUniformData$1(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
	        gl.uniformMatrix3fv(pos, false, data);
	    });
	};
	var sendMatrix4 = function (gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
	    _sendUniformData$1(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
	        gl.uniformMatrix4fv(pos, false, data);
	    });
	};
	var sendVector3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
	    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap), x = data.x, y = data.y, z = data.z;
	    if (recordedData && recordedData.x == x && recordedData.y == y && recordedData.z == z) {
	        return;
	    }
	    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
	    _sendUniformData$1(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
	        gl.uniform3f(pos, x, y, z);
	    });
	};
	var sendInt = requireCheckFunc(function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
	    it("data should be number", function () {
	        wdet_1(data).be.a("number");
	    });
	}, function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
	    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap);
	    if (recordedData === data) {
	        return;
	    }
	    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
	    _sendUniformData$1(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
	        gl.uniform1i(pos, data);
	    });
	});
	var sendFloat1 = requireCheckFunc(function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
	    it("data should be number", function () {
	        wdet_1(data).be.a("number");
	    });
	}, function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, glFunc) {
	    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap);
	    if (recordedData === data) {
	        return;
	    }
	    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
	    _sendUniformData$1(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
	        gl.uniform1f(pos, data);
	    });
	});
	var sendFloat3 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist) {
	    var recordedData = _getUniformCache(shaderIndex, name, uniformCacheMap), x = data[0], y = data[1], z = data[2];
	    if (recordedData && recordedData[0] == x && recordedData[1] == y && recordedData[2] == z) {
	        return;
	    }
	    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
	    _sendUniformData$1(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, function (pos, data) {
	        gl.uniform3f(pos, x, y, z);
	    });
	};
	var _getUniformCache = function (shaderIndex, name, uniformCacheMap) {
	    var cache = uniformCacheMap[shaderIndex];
	    if (_isCacheNotExist(cache)) {
	        cache = {};
	        uniformCacheMap[shaderIndex] = cache;
	        return null;
	    }
	    return cache[name];
	};
	var _isCacheNotExist = function (cache) { return isNotValidMapValue(cache); };
	var _setUniformCache = function (shaderIndex, name, data, uniformCacheMap) {
	    uniformCacheMap[shaderIndex][name] = data;
	};
	var _sendUniformData$1 = function (gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, send) {
	    var pos = getUniformLocation(gl, program, name, uniformLocationMap);
	    if (isUniformLocationNotExist(pos)) {
	        return;
	    }
	    send(pos, data);
	};
	var addSendAttributeConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
	    it("sendAttributeConfigMap should not has duplicate attribute name", function () {
	        wdet_1(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
	    });
	}, requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
	    it("sendAttributeConfigMap[shaderIndex] should not be defined", function () {
	        wdet_1(sendAttributeConfigMap[shaderIndex]).not.exist;
	    });
	}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
	    var sendDataArr = [];
	    forEach(materialShaderLibNameArr, function (shaderLibName) {
	        var sendData = shaderLibData[shaderLibName].send;
	        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
	            sendDataArr = sendDataArr.concat(sendData.attribute);
	        }
	    });
	    sendAttributeConfigMap[shaderIndex] = sendDataArr;
	}));
	var addSendUniformConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
	    it("sendUniformConfigMap should not has duplicate attribute name", function () {
	        wdet_1(hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
	    });
	}, requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
	    it("sendUniformConfigMap[shaderIndex] should not be defined", function () {
	        wdet_1(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
	    });
	}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
	    var sendUniformDataArr = [], sendUniformFuncDataArr = [];
	    forEach(materialShaderLibNameArr, function (shaderLibName) {
	        var sendData = shaderLibData[shaderLibName].send;
	        if (isConfigDataExist(sendData)) {
	            if (isConfigDataExist(sendData.uniform)) {
	                sendUniformDataArr = sendUniformDataArr.concat(sendData.uniform);
	            }
	            if (isConfigDataExist(sendData.uniformFunc)) {
	                sendUniformFuncDataArr = sendUniformFuncDataArr.concat(sendData.uniformFunc);
	            }
	        }
	    });
	    GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex] = sendUniformDataArr;
	    GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex] = sendUniformFuncDataArr;
	}));
	var initData$14 = function (GLSLSenderDataFromSystem) {
	    GLSLSenderDataFromSystem.sendAttributeConfigMap = createMap();
	    GLSLSenderDataFromSystem.sendUniformConfigMap = createMap();
	    GLSLSenderDataFromSystem.sendUniformFuncConfigMap = createMap();
	    GLSLSenderDataFromSystem.vertexAttribHistory = [];
	    GLSLSenderDataFromSystem.uniformCacheMap = createMap();
	};

	var getOrCreateBuffer$1 = function (gl, geometryIndex, getIndices, GeometryWorkerData, IndexBufferDataFromSystem) {
	    var buffers = IndexBufferDataFromSystem.buffers, buffer = buffers[geometryIndex];
	    if (isBufferExist(buffer)) {
	        return buffer;
	    }
	    buffer = gl.createBuffer();
	    buffers[geometryIndex] = buffer;
	    _initBuffer$1(gl, getIndices(geometryIndex, GeometryWorkerData), buffer, IndexBufferDataFromSystem);
	    return buffer;
	};
	var _initBuffer$1 = function (gl, data, buffer, IndexBufferDataFromSystem) {
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
	    _resetBindedBuffer$1(gl, IndexBufferDataFromSystem);
	};
	var _resetBindedBuffer$1 = function (gl, IndexBufferDataFromSystem) {
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	};
	var initData$15 = function (IndexBufferDataFromSystem) {
	    IndexBufferDataFromSystem.buffers = [];
	};

	var main_begin = "void main(void){\n";
	var main_end = "}\n";
	var setPos_mvp = "gl_Position = u_pMatrix * u_vMatrix * mMatrix * vec4(a_position, 1.0);\n";

	var empty = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var NULL = -1.0;
	var basic_materialColor_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec4 totalColor = vec4(u_color, 1.0);\n" };
	var end_basic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n" };
	var common_define = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var common_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var common_function = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n\n//bool isRenderListEmpty(int isRenderListEmpty){\n//  return isRenderListEmpty == 1;\n//}\n", body: "" };
	var common_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var highp_fragment = { top: "precision highp float;\nprecision highp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var lowp_fragment = { top: "precision lowp float;\nprecision lowp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var mediump_fragment = { top: "precision mediump float;\nprecision mediump int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
	var noNormalMap_light_fragment = { top: "", define: "", varDeclare: "varying vec3 v_normal;\n", funcDeclare: "", funcDefine: "#if POINT_LIGHTS_COUNT > 0\nvec3 getPointLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= POINT_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getPointLightDirByLightPos(u_pointLights[x].position);\n        }\n    }\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n#if DIRECTION_LIGHTS_COUNT > 0\nvec3 getDirectionLightDir(int index){\n    //workaround '[] : Index expression must be constant' error\n    for (int x = 0; x <= DIRECTION_LIGHTS_COUNT; x++) {\n        if(x == index){\n            return getDirectionLightDirByLightPos(u_directionLights[x].position);\n        }\n    }\n\n    /*!\n    solve error in window7 chrome/firefox:\n    not all control paths return a value.\n    failed to create d3d shaders\n    */\n    return vec3(0.0);\n}\n#endif\n\n\nvec3 getViewDir(){\n    return normalize(u_cameraPos - v_worldPosition);\n}\n", body: "" };
	var lightCommon_fragment = { top: "", define: "", varDeclare: "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\nstruct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\nstruct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", funcDeclare: "", funcDefine: "", body: "" };
	var lightCommon_vertex = { top: "", define: "", varDeclare: "varying vec3 v_worldPosition;\n#if POINT_LIGHTS_COUNT > 0\n    struct PointLight {\n    vec3 position;\n    vec3 color;\n    float intensity;\n\n    float range;\n    float constant;\n    float linear;\n    float quadratic;\n};\nuniform PointLight u_pointLights[POINT_LIGHTS_COUNT];\n\n#endif\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n    struct DirectionLight {\n    vec3 position;\n\n    float intensity;\n\n    vec3 color;\n};\nuniform DirectionLight u_directionLights[DIRECTION_LIGHTS_COUNT];\n#endif\n", funcDeclare: "", funcDefine: "", body: "" };
	var lightEnd_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = totalColor;\n" };
	var light_common = { top: "", define: "", varDeclare: "", funcDeclare: "vec3 getDirectionLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos);\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);\n", funcDefine: "vec3 getDirectionLightDirByLightPos(vec3 lightPos){\n    return lightPos - vec3(0.0);\n    //return vec3(0.0) - lightPos;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos){\n    return lightPos - v_worldPosition;\n}\nvec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){\n    return lightPos - worldPosition;\n}\n", body: "" };
	var light_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 halfAngle = normalize(lightDir + viewDir);\n        float blinnTerm = dot(normal, halfAngle);\n\n        blinnTerm = clamp(blinnTerm, 0.0, 1.0);\n        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;\n        blinnTerm = pow(blinnTerm, shininess);\n\n        return blinnTerm;\n}\n\nfloat getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){\n        vec3 reflectDir = reflect(-lightDir, normal);\n        float phongTerm = dot(viewDir, reflectDir);\n\n        phongTerm = clamp(phongTerm, 0.0, 1.0);\n        phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;\n        phongTerm = pow(phongTerm, shininess);\n\n        return phongTerm;\n}\n\nvec4 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir)\n{\n        vec3 materialLight = getMaterialLight();\n        vec4 materialDiffuse = getMaterialDiffuse();\n        vec3 materialSpecular = u_specular;\n        vec3 materialEmission = getMaterialEmission();\n\n        float specularStrength = getSpecularStrength();\n\n        float dotResultBetweenNormAndLight = dot(normal, lightDir);\n        float diff = max(dotResultBetweenNormAndLight, 0.0);\n\n        vec3 emissionColor = materialEmission;\n\n        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse.rgb;\n\n\n        if(u_lightModel == 3){\n            return vec4(emissionColor + ambientColor, 1.0);\n        }\n\n        vec4 diffuseColor = vec4(color * materialDiffuse.rgb * diff * intensity, materialDiffuse.a);\n\n        float spec = 0.0;\n\n        if(u_lightModel == 2){\n                spec = getPhongShininess(u_shininess, normal, lightDir, viewDir, diff);\n        }\n        else if(u_lightModel == 1){\n                spec = getBlinnShininess(u_shininess, normal, lightDir, viewDir, diff);\n        }\n\n        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;\n\n        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);\n//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), 1.0);\n}\n\n\n\n\n#if POINT_LIGHTS_COUNT > 0\n        vec4 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)\n{\n        //lightDir is not normalize computing distance\n        float distance = length(lightDir);\n\n        float attenuation = 0.0;\n\n        if(distance < light.range)\n        {\n            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));\n        }\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\n#if DIRECTION_LIGHTS_COUNT > 0\n        vec4 calcDirectionLight(vec3 lightDir, DirectionLight light, vec3 normal, vec3 viewDir)\n{\n        float attenuation = 1.0;\n\n        lightDir = normalize(lightDir);\n\n        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);\n}\n#endif\n\n\n\nvec4 calcTotalLight(vec3 norm, vec3 viewDir){\n    vec4 totalLight = vec4(0.0);\n\n    #if POINT_LIGHTS_COUNT > 0\n                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){\n                totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);\n        }\n    #endif\n\n    #if DIRECTION_LIGHTS_COUNT > 0\n                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){\n                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);\n        }\n    #endif\n\n        return totalLight;\n}\n", body: "vec3 normal = normalize(getNormal());\n\n#ifdef BOTH_SIDE\nnormal = normal * (-1.0 + 2.0 * float(gl_FrontFacing));\n#endif\n\nvec3 viewDir = normalize(getViewDir());\n\nvec4 totalColor = calcTotalLight(normal, viewDir);\n\ntotalColor.a *= u_opacity;\n\ntotalColor.rgb = totalColor.rgb * getShadowVisibility();\n" };
	var light_setWorldPosition_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "v_worldPosition = vec3(mMatrix * vec4(a_position, 1.0));\n" };
	var light_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_Position = u_pMatrix * u_vMatrix * vec4(v_worldPosition, 1.0);\n" };
	var map_forBasic_fragment = { top: "", define: "", varDeclare: "varying vec2 v_mapCoord0;\n", funcDeclare: "", funcDefine: "", body: "totalColor *= texture2D(u_sampler2D0, v_mapCoord0);\n" };
	var map_forBasic_vertex = { top: "", define: "", varDeclare: "varying vec2 v_mapCoord0;\n", funcDeclare: "", funcDefine: "", body: "//    vec2 sourceTexCoord0 = a_texCoord * u_map0SourceRegion.zw + u_map0SourceRegion.xy;\n//\n//    v_mapCoord0 = sourceTexCoord0 * u_map0RepeatRegion.zw + u_map0RepeatRegion.xy;\n\n    v_mapCoord0 = a_texCoord;\n" };
	var modelMatrix_noInstance_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "mat4 mMatrix = u_mMatrix;\n" };
	var normalMatrix_noInstance_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "mat3 normalMatrix = u_normalMatrix;\n" };
	var diffuseMap_fragment = { top: "", define: "", varDeclare: "varying vec2 v_diffuseMapTexCoord;\n", funcDeclare: "", funcDefine: "vec4 getMaterialDiffuse() {\n        return texture2D(u_diffuseMapSampler, v_diffuseMapTexCoord);\n    }\n", body: "" };
	var diffuseMap_vertex = { top: "", define: "", varDeclare: "varying vec2 v_diffuseMapTexCoord;\n", funcDeclare: "", funcDefine: "", body: "//todo optimize(combine, reduce compute numbers)\n    //todo BasicTexture extract textureMatrix\n//    vec2 sourceTexCoord = a_texCoord * u_diffuseMapSourceRegion.zw + u_diffuseMapSourceRegion.xy;\n//    v_diffuseMapTexCoord = sourceTexCoord * u_diffuseMapRepeatRegion.zw + u_diffuseMapRepeatRegion.xy;\n\n    v_diffuseMapTexCoord = a_texCoord;\n" };
	var noDiffuseMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec4 getMaterialDiffuse() {\n        return vec4(u_diffuse, 1.0);\n    }\n", body: "" };
	var noEmissionMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec3 getMaterialEmission() {\n        return u_emission;\n    }\n", body: "" };
	var noLightMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec3 getMaterialLight() {\n        return vec3(0.0);\n    }\n", body: "" };
	var noNormalMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "vec3 getNormal();\n", funcDefine: "vec3 getNormal(){\n    return v_normal;\n}\n\n", body: "" };
	var noNormalMap_vertex = { top: "", define: "", varDeclare: "varying vec3 v_normal;\n", funcDeclare: "", funcDefine: "", body: "v_normal = normalize(normalMatrix * a_normal);\n" };
	var noSpecularMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "float getSpecularStrength() {\n        return 1.0;\n    }\n", body: "" };
	var specularMap_fragment = { top: "", define: "", varDeclare: "varying vec2 v_specularMapTexCoord;\n", funcDeclare: "", funcDefine: "float getSpecularStrength() {\n        return texture2D(u_specularMapSampler, v_specularMapTexCoord).r;\n    }\n", body: "" };
	var specularMap_vertex = { top: "", define: "", varDeclare: "varying vec2 v_specularMapTexCoord;\n", funcDeclare: "", funcDefine: "", body: "v_specularMapTexCoord = a_texCoord;\n" };
	var noShadowMap_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "vec3 getShadowVisibility() {\n        return vec3(1.0);\n    }\n", body: "" };

	var buildGLSLSource = requireCheckFunc(function (materialIndex, materialShaderLibNameArr, shaderLibData, funcDataMap, initShaderDataMap) {
	    it("shaderLib should be defined", function () {
	        forEach(materialShaderLibNameArr, function (shaderLibName) {
	            wdet_1(shaderLibData[shaderLibName]).exist;
	        });
	    });
	}, function (materialIndex, materialShaderLibNameArr, shaderLibData, funcDataMap, initShaderDataMap) {
	    var vsTop = "", vsDefine = "", vsVarDeclare = "", vsFuncDeclare = "", vsFuncDefine = "", vsBody = "", fsTop = "", fsDefine = "", fsVarDeclare = "", fsFuncDeclare = "", fsFuncDefine = "", fsBody = "";
	    var _setVs = function (getGLSLPartData, getGLSLDefineListData, vs) {
	        vsTop += getGLSLPartData(vs, "top");
	        vsDefine += _buildSourceDefine(getGLSLDefineListData(vs), initShaderDataMap) + getGLSLPartData(vs, "define");
	        vsVarDeclare += getGLSLPartData(vs, "varDeclare");
	        vsFuncDeclare += getGLSLPartData(vs, "funcDeclare");
	        vsFuncDefine += getGLSLPartData(vs, "funcDefine");
	        vsBody += getGLSLPartData(vs, "body");
	    }, _setFs = function (getGLSLPartData, getGLSLDefineListData, fs) {
	        fsTop += getGLSLPartData(fs, "top");
	        fsDefine += _buildSourceDefine(getGLSLDefineListData(fs), initShaderDataMap) + getGLSLPartData(fs, "define");
	        fsVarDeclare += getGLSLPartData(fs, "varDeclare");
	        fsFuncDeclare += getGLSLPartData(fs, "funcDeclare");
	        fsFuncDefine += getGLSLPartData(fs, "funcDefine");
	        fsBody += getGLSLPartData(fs, "body");
	    };
	    vsBody += main_begin;
	    fsBody += main_begin;
	    fsTop += _getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment);
	    forEach(materialShaderLibNameArr, function (shaderLibName) {
	        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
	        if (!isConfigDataExist(glslData)) {
	            return;
	        }
	        vs = glslData.vs;
	        fs = glslData.fs;
	        func = glslData.func;
	        if (isConfigDataExist(vs)) {
	            _setVs(_getGLSLPartData, _getGLSLDefineListData, vs);
	        }
	        if (isConfigDataExist(fs)) {
	            _setFs(_getGLSLPartData, _getGLSLDefineListData, fs);
	        }
	        if (isConfigDataExist(func)) {
	            var funcConfig = func(materialIndex, funcDataMap, initShaderDataMap);
	            if (isConfigDataExist(funcConfig)) {
	                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
	                if (isConfigDataExist(vs_1)) {
	                    vs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs_1);
	                    _setVs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, vs_1);
	                }
	                if (isConfigDataExist(fs_1)) {
	                    fs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs_1);
	                    _setFs(_getFuncGLSLPartData, _getFuncGLSLDefineListData, fs_1);
	                }
	            }
	        }
	    });
	    vsBody += main_end;
	    fsBody += main_end;
	    vsTop += _generateAttributeSource(materialShaderLibNameArr, shaderLibData);
	    vsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
	    fsTop += _generateUniformSource(materialShaderLibNameArr, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
	    return {
	        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
	        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
	    };
	});
	var getMaterialShaderLibNameArr = function (materialShaderLibConfig, materialShaderLibGroup, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
	    var nameArr = [];
	    forEach(materialShaderLibConfig, function (item) {
	        if (isString(item)) {
	            nameArr.push(item);
	        }
	        else {
	            var i = item;
	            switch (i.type) {
	                case "group":
	                    nameArr = nameArr.concat(materialShaderLibGroup[i.value]);
	                    break;
	                case "branch":
	                    var shaderLibName = _execBranch(i, materialIndex, initShaderFuncDataMap, initShaderDataMap);
	                    if (_isShaderLibNameExist(shaderLibName)) {
	                        nameArr.push(shaderLibName);
	                    }
	            }
	        }
	    });
	    return nameArr;
	};
	var _execBranch = requireCheckFunc(function (i, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
	    it("branch should exist", function () {
	        wdet_1(i.branch).exist;
	    });
	}, function (i, materialIndex, initShaderFuncDataMap, initShaderDataMap) {
	    return i.branch(materialIndex, initShaderFuncDataMap, initShaderDataMap);
	});
	var _isShaderLibNameExist = function (name) { return !!name; };
	var _getEmptyFuncGLSLConfig = function () {
	    return {
	        "top": "",
	        "varDeclare": "",
	        "funcDeclare": "",
	        "funcDefine": "",
	        "body": "",
	        "defineList": []
	    };
	};
	var _buildSourceDefine = function (defineList, initShaderDataMap) {
	    var result = "";
	    for (var _i = 0, defineList_1 = defineList; _i < defineList_1.length; _i++) {
	        var item = defineList_1[_i];
	        if (item.valueFunc === void 0) {
	            result += "#define " + item.name + "\n";
	        }
	        else {
	            result += "#define " + item.name + " " + item.valueFunc(initShaderDataMap) + "\n";
	        }
	    }
	    return result;
	};
	var _getPrecisionSource = function (lowp_fragment$$1, mediump_fragment$$1, highp_fragment$$1) {
	    var precision = GPUDetector.getInstance().precision, result = null;
	    switch (precision) {
	        case exports.EGPUPrecision.HIGHP:
	            result = highp_fragment$$1.top;
	            break;
	        case exports.EGPUPrecision.MEDIUMP:
	            result = mediump_fragment$$1.top;
	            break;
	        case exports.EGPUPrecision.LOWP:
	            result = lowp_fragment$$1.top;
	            break;
	        default:
	            result = "";
	            break;
	    }
	    return result;
	};
	var _getGLSLPartData = function (glslConfig, partName) {
	    var partConfig = glslConfig[partName];
	    if (isConfigDataExist(partConfig)) {
	        return partConfig;
	    }
	    else if (isConfigDataExist(glslConfig.source)) {
	        return glslConfig.source[partName];
	    }
	    return "";
	};
	var _getGLSLDefineListData = function (glslConfig) {
	    var partConfig = glslConfig.defineList;
	    if (isConfigDataExist(partConfig)) {
	        return partConfig;
	    }
	    return [];
	};
	var _getFuncGLSLPartData = function (glslConfig, partName) {
	    return glslConfig[partName];
	};
	var _getFuncGLSLDefineListData = function (glslConfig) {
	    return glslConfig.defineList;
	};
	var _isInSource = function (key, source) {
	    return source.indexOf(key) > -1;
	};
	var _generateAttributeSource = function (materialShaderLibNameArr, shaderLibData) {
	    var result = "";
	    forEach(materialShaderLibNameArr, function (shaderLibName) {
	        var sendData = shaderLibData[shaderLibName].send, attributeData = null;
	        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.attribute)) {
	            return;
	        }
	        attributeData = sendData.attribute;
	        forEach(attributeData, function (data) {
	            result += "attribute " + data.type + " " + data.name + ";\n";
	        });
	    });
	    return result;
	};
	var _generateUniformSource = function (materialShaderLibNameArr, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
	    var result = "", generateFunc = compose(forEachArray(function (_a) {
	        var name = _a.name, type = _a.type;
	        result += "uniform " + _generateUniformSourceType(type) + " " + name + ";\n";
	    }), filterArray(function (_a) {
	        var name = _a.name;
	        return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
	    }));
	    forEach(materialShaderLibNameArr, function (shaderLibName) {
	        var sendData = shaderLibData[shaderLibName].send, uniform = null, uniformDefine = null;
	        if (!isConfigDataExist(sendData)) {
	            return;
	        }
	        uniform = sendData.uniform;
	        uniformDefine = sendData.uniformDefine;
	        if (isConfigDataExist(uniform)) {
	            generateFunc(uniform);
	        }
	        if (isConfigDataExist(uniformDefine)) {
	            generateFunc(uniformDefine);
	        }
	    });
	    return result;
	};
	var _generateUniformSourceType = function (type) {
	    var sourceType = null;
	    switch (type) {
	        case "float3":
	            sourceType = "vec3";
	            break;
	        default:
	            sourceType = type;
	            break;
	    }
	    return sourceType;
	};

	var setEmptyLocationMap = function (shaderIndex, LocationDataFromSystem) {
	    LocationDataFromSystem.attributeLocationMap[shaderIndex] = createMap();
	    LocationDataFromSystem.uniformLocationMap[shaderIndex] = createMap();
	};
	var getAttribLocation = ensureFunc(function (pos, gl, program, name, attributeLocationMap) {
	}, function (gl, program, name, attributeLocationMap) {
	    var pos = null;
	    pos = attributeLocationMap[name];
	    if (isValidMapValue(pos)) {
	        return pos;
	    }
	    pos = gl.getAttribLocation(program, name);
	    attributeLocationMap[name] = pos;
	    return pos;
	});
	var getUniformLocation = ensureFunc(function (pos, gl, name, uniformLocationMap) {
	}, function (gl, program, name, uniformLocationMap) {
	    var pos = null;
	    pos = uniformLocationMap[name];
	    if (isValidMapValue(pos)) {
	        return pos;
	    }
	    pos = gl.getUniformLocation(program, name);
	    uniformLocationMap[name] = pos;
	    return pos;
	});
	var isUniformLocationNotExist = function (pos) {
	    return pos === null;
	};
	var isAttributeLocationNotExist = function (pos) {
	    return pos === -1;
	};
	var initData$16 = function (LocationDataFromSystem) {
	    LocationDataFromSystem.attributeLocationMap = createMap();
	    LocationDataFromSystem.uniformLocationMap = createMap();
	};

	var init$6 = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
	    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config), materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap), shaderIndex = _genereateShaderIndex(materialShaderLibNameArr, ShaderDataFromSystem), program = getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
	    if (isProgramExist(program)) {
	        return shaderIndex;
	    }
	    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
	    var _a = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
	    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);
	    program = gl.createProgram();
	    registerProgram(shaderIndex, ProgramDataFromSystem, program);
	    initShader(program, vsSource, fsSource, gl);
	    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
	    addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
	    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
	    return shaderIndex;
	};
	var _genereateShaderIndex = function (materialShaderLibNameArr, ShaderDataFromSystem) {
	    var shaderLibWholeName = materialShaderLibNameArr.join(''), index = ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName];
	    if (isValidMapValue(index)) {
	        return index;
	    }
	    index = ShaderDataFromSystem.index;
	    ShaderDataFromSystem.index += 1;
	    ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName] = index;
	    return index;
	};
	var sendAttributeData$1 = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation$$1, isAttributeLocationNotExist$$1, sendBuffer$$1, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem) {
	    sendAttributeData$2(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation$$1, isAttributeLocationNotExist$$1, sendBuffer$$1, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
	};
	var sendUniformData$1 = function (gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData) {
	    sendUniformData$2(gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData);
	};
	var bindIndexBuffer$1 = function (gl, geometryIndex, getIndicesFunc, ProgramDataFromSystem, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem) {
	    var buffer = getOrCreateBuffer$1(gl, geometryIndex, getIndicesFunc, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem);
	    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
	        return;
	    }
	    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	};
	var use$1 = function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
	    return use$2(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
	};

	var GeometryData = (function () {
	    function GeometryData() {
	    }
	    GeometryData.index = null;
	    GeometryData.count = null;
	    GeometryData.disposeCount = null;
	    GeometryData.maxDisposeIndex = null;
	    GeometryData.isReallocate = null;
	    GeometryData.buffer = null;
	    GeometryData.verticesOffset = null;
	    GeometryData.normalsOffset = null;
	    GeometryData.texCoordsOffset = null;
	    GeometryData.indicesOffset = null;
	    GeometryData.verticesInfoList = null;
	    GeometryData.normalsInfoList = null;
	    GeometryData.texCoordsInfoList = null;
	    GeometryData.indicesInfoList = null;
	    GeometryData.isInit = null;
	    GeometryData.verticesWorkerInfoList = null;
	    GeometryData.normalsWorkerInfoList = null;
	    GeometryData.texCoordsWorkerInfoList = null;
	    GeometryData.indicesWorkerInfoList = null;
	    GeometryData.disposedGeometryIndexArray = null;
	    GeometryData.vertices = null;
	    GeometryData.normals = null;
	    GeometryData.texCoords = null;
	    GeometryData.indices = null;
	    GeometryData.verticesCacheMap = null;
	    GeometryData.normalsCacheMap = null;
	    GeometryData.texCoordsCacheMap = null;
	    GeometryData.indicesCacheMap = null;
	    GeometryData.indexType = null;
	    GeometryData.indexTypeSize = null;
	    GeometryData.configDataMap = null;
	    GeometryData.computeDataFuncMap = null;
	    GeometryData.gameObjectMap = null;
	    GeometryData.geometryMap = null;
	    return GeometryData;
	}());

	(function (EDrawMode) {
	    EDrawMode["POINTS"] = "POINTS";
	    EDrawMode["LINES"] = "LINES";
	    EDrawMode["LINE_LOOP"] = "LINE_LOOP";
	    EDrawMode["LINE_STRIP"] = "LINE_STRIP";
	    EDrawMode["TRIANGLES"] = "TRIANGLES";
	    EDrawMode["TRIANGLE_STRIP"] = "TRIANGLE_STRIP";
	    EDrawMode["TRANGLE_FAN"] = "TRIANGLE_FAN";
	})(exports.EDrawMode || (exports.EDrawMode = {}));

	var getVertexDataSize = function () { return 3; };
	var getNormalDataSize = function () { return 3; };
	var getTexCoordsDataSize = function () { return 2; };
	var getIndexDataSize = function () { return 1; };
	var getUIntArrayClass = function (indexType) {
	    switch (indexType) {
	        case exports.EBufferType.UNSIGNED_SHORT:
	            return Uint16Array;
	        case exports.EBufferType.INT:
	            return Uint32Array;
	        default:
	            Log$$1.error(true, Log$$1.info.FUNC_INVALID("indexType:" + indexType));
	            break;
	    }
	};
	var getIndexType$1 = function (GeometryDataFromSystem) {
	    return GeometryDataFromSystem.indexType;
	};
	var getIndexTypeSize$1 = function (GeometryDataFromSystem) {
	    return GeometryDataFromSystem.indexTypeSize;
	};
	var hasIndices$1 = function (index, getIndices, GeometryDataFromSystem) {
	    var indices = getIndices(index, GeometryDataFromSystem);
	    if (isNotValidMapValue(indices)) {
	        return false;
	    }
	    return indices.length > 0;
	};
	var getDrawMode$1 = function (index, GeometryDataFromSystem) {
	    return exports.EDrawMode.TRIANGLES;
	};
	var getVerticesCount$1 = function (index, getVertices, GeometryDataFromSystem) {
	    return getVertices(index, GeometryDataFromSystem).length;
	};
	var getIndicesCount$1 = function (index, getIndices, GeometryDataFromSystem) {
	    return getIndices(index, GeometryDataFromSystem).length;
	};
	var createBufferViews = function (buffer, count, UintArray, GeometryDataFromSystem) {
	    GeometryDataFromSystem.vertices = new Float32Array(buffer, 0, count * getVertexDataSize());
	    GeometryDataFromSystem.normals = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getVertexDataSize(), count * getVertexDataSize());
	    GeometryDataFromSystem.texCoords = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize()), count * getTexCoordsDataSize());
	    GeometryDataFromSystem.indices = new UintArray(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize() + getTexCoordsDataSize()), count * getIndexDataSize());
	};

	var createSharedArrayBufferOrArrayBuffer = function (length) {
	    var Buffer = null;
	    if (isSupportSharedArrayBuffer()) {
	        Buffer = SharedArrayBuffer;
	    }
	    else {
	        Buffer = ArrayBuffer;
	    }
	    return new Buffer(length);
	};

	var ArrayBufferData = (function () {
	    function ArrayBufferData() {
	    }
	    ArrayBufferData.vertexBuffer = null;
	    ArrayBufferData.normalBuffers = null;
	    ArrayBufferData.texCoordBuffers = null;
	    return ArrayBufferData;
	}());

	var IndexBufferData = (function () {
	    function IndexBufferData() {
	    }
	    IndexBufferData.buffers = null;
	    return IndexBufferData;
	}());

	var disposeGeometryBuffers = function (disposedIndexArray, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, disposeArrayBuffer, disposeIndexBuffer) {
	    for (var _i = 0, disposedIndexArray_1 = disposedIndexArray; _i < disposedIndexArray_1.length; _i++) {
	        var index = disposedIndexArray_1[_i];
	        disposeArrayBuffer(index, ArrayBufferDataFromSystem);
	        disposeIndexBuffer(index, IndexBufferDataFromSystem);
	    }
	};

	var getCanvas = function (state) {
	    return state.getIn(["View", "dom"]);
	};
	var setCanvas = curry(function (dom, state) {
	    return state.setIn(["View", "dom"], dom);
	});
	var getX = curry(function (dom) {
	    return Number(dom.style.left.slice(0, -2));
	});
	var setX = curry(function (x, dom) {
	    return IO.of(function () {
	        dom.style.left = x + "px";
	        return dom;
	    });
	});
	var getY = curry(function (dom) {
	    return Number(dom.style.top.slice(0, -2));
	});
	var setY = curry(function (y, dom) {
	    return IO.of(function () {
	        dom.style.top = y + "px";
	        return dom;
	    });
	});
	var getWidth$1 = curry(function (dom) {
	    return dom.clientWidth;
	});
	var setWidth = curry(function (width, dom) {
	    return IO.of(function () {
	        dom.width = width;
	        return dom;
	    });
	});
	var getHeight$1 = curry(function (dom) {
	    return dom.clientHeight;
	});
	var setHeight = curry(function (height, dom) {
	    return IO.of(function () {
	        dom.height = height;
	        return dom;
	    });
	});
	var getStyleWidth = curry(function (dom) {
	    return dom.style.width;
	});
	var setStyleWidth = curry(function (width, dom) {
	    return IO.of(function () {
	        dom.style.width = width;
	        return dom;
	    });
	});
	var getStyleHeight = curry(function (dom) {
	    return dom.style.height;
	});
	var setStyleHeight = curry(function (height, dom) {
	    return IO.of(function () {
	        dom.style.height = height;
	        return dom;
	    });
	});
	var initCanvas = function (dom) {
	    return IO.of(function () {
	        dom.style.cssText = "position:absolute;left:0;top:0;";
	        return dom;
	    });
	};
	var getContext = function (contextConfig, dom) {
	    var options = contextConfig.get("options").toObject();
	    return (dom.getContext("webgl", options) || dom.getContext("experimental-webgl", options));
	};

	(function (EScreenSize) {
	    EScreenSize[EScreenSize["FULL"] = 0] = "FULL";
	})(exports.EScreenSize || (exports.EScreenSize = {}));

	var RectRegion = (function (_super) {
	    __extends(RectRegion, _super);
	    function RectRegion() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    RectRegion_1 = RectRegion;
	    Object.defineProperty(RectRegion.prototype, "width", {
	        get: function () {
	            return this.z;
	        },
	        set: function (width) {
	            this.z = width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RectRegion.prototype, "height", {
	        get: function () {
	            return this.w;
	        },
	        set: function (height) {
	            this.w = height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RectRegion.prototype.clone = function () {
	        return this.copyHelper(RectRegion_1.create());
	    };
	    RectRegion.prototype.isNotEmpty = function () {
	        return this.x !== 0
	            || this.y !== 0
	            || this.width !== 0
	            || this.height !== 0;
	    };
	    RectRegion = RectRegion_1 = __decorate([
	        registerClass("RectRegion")
	    ], RectRegion);
	    return RectRegion;
	    var RectRegion_1;
	}(Vector4));

	var getRootProperty = function (propertyName) {
	    return IO.of(function () {
	        return exports.root[propertyName];
	    });
	};

	(function (ESide) {
	    ESide[ESide["NONE"] = 0] = "NONE";
	    ESide[ESide["BOTH"] = 1] = "BOTH";
	    ESide[ESide["BACK"] = 2] = "BACK";
	    ESide[ESide["FRONT"] = 3] = "FRONT";
	})(exports.ESide || (exports.ESide = {}));

	var getGL$1 = function (DeviceManagerDataFromSystem, state) {
	    return DeviceManagerDataFromSystem.gl;
	};
	var setGL$1 = curry(function (gl, DeviceManagerDataFromSystem, state) {
	    DeviceManagerDataFromSystem.gl = gl;
	    return state;
	});
	var setContextConfig$1 = curry(function (contextConfig, state) {
	    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
	});
	var setPixelRatio$1 = curry(function (pixelRatio, state) {
	    if (pixelRatio === null) {
	        return state;
	    }
	    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
	});
	var getViewport$1 = function (state) {
	    return state.getIn(["DeviceManager", "viewport"]);
	};
	var setViewport$1 = function (x, y, width, height, state) {
	    return state.setIn(["DeviceManager", "viewport"], RectRegion.create(x, y, width, height));
	};
	var setCanvasPixelRatio$1 = curry(function (useDevicePixelRatio, canvas) {
	    return IO.of(function () {
	        var pixelRatio = getRootProperty("devicePixelRatio").run();
	        canvas.width = Math.round(canvas.width * pixelRatio);
	        canvas.height = Math.round(canvas.height * pixelRatio);
	        return pixelRatio;
	    });
	});
	var setViewportOfGL$1 = curry(function (DeviceManagerDataFromSystem, state, _a) {
	    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
	    return IO.of(function () {
	        var gl = getGL$1(DeviceManagerDataFromSystem, state), viewport = getViewport$1(state);
	        if (isValueExist(viewport) && viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
	            return state;
	        }
	        gl.viewport(x, y, width, height);
	        return setViewport$1(x, y, width, height, state);
	    });
	});
	var _setBodyByScreenSize = function (screenSize) {
	    return IO.of(function () {
	        if (screenSize === exports.EScreenSize.FULL) {
	            DomQuery.create("body").css("margin", "0");
	        }
	        return screenSize;
	    });
	};
	var _getScreenData = function (screenSize) {
	    return IO.of(function () {
	        var x = null, y = null, width = null, height = null, styleWidth = null, styleHeight = null;
	        if (screenSize === exports.EScreenSize.FULL) {
	            x = 0;
	            y = 0;
	            width = getRootProperty("innerWidth").run();
	            height = getRootProperty("innerHeight").run();
	            styleWidth = "100%";
	            styleHeight = "100%";
	        }
	        else {
	            x = screenSize.x || 0;
	            y = screenSize.y || 0;
	            width = screenSize.width || getRootProperty("innerWidth").run();
	            height = screenSize.height || getRootProperty("innerHeight").run();
	            styleWidth = width + "px";
	            styleHeight = height + "px";
	        }
	        return {
	            x: x,
	            y: y,
	            width: width,
	            height: height,
	            styleWidth: styleWidth,
	            styleHeight: styleHeight
	        };
	    });
	};
	var getScreenSize$1 = function (state) {
	    return state.getIn(["Main", "screenSize"]);
	};
	var setScreen$1 = function (canvas, setScreenData, DeviceManagerDataFromSystem, state) {
	    return IO.of(requireCheckFunc(function () {
	        it("should exist MainData.screenSize", function () {
	            wdet_1(getScreenSize$1(state)).exist;
	        });
	    }, function () {
	        initCanvas(canvas).run();
	        return compose(chain(setScreenData(DeviceManagerDataFromSystem, canvas, state)), chain(_getScreenData), _setBodyByScreenSize)(getScreenSize$1(state)).run();
	    }));
	};
	var clear$1 = function (gl, color, DeviceManagerDataFromSystem) {
	    _setClearColor(gl, color, DeviceManagerDataFromSystem);
	    setColorWrite$1(gl, true, true, true, true, DeviceManagerDataFromSystem);
	    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	};
	var _setClearColor = function (gl, color, DeviceManagerDataFromSystem) {
	    var clearColor = DeviceManagerDataFromSystem.clearColor;
	    if (clearColor && clearColor.isEqual(color)) {
	        return;
	    }
	    gl.clearColor(color.r, color.g, color.b, color.a);
	    DeviceManagerDataFromSystem.clearColor = color;
	};
	var setColorWrite$1 = function (gl, writeRed, writeGreen, writeBlue, writeAlpha, DeviceManagerDataFromSystem) {
	    if (DeviceManagerDataFromSystem.writeRed !== writeRed
	        || DeviceManagerDataFromSystem.writeGreen !== writeGreen
	        || DeviceManagerDataFromSystem.writeBlue !== writeBlue
	        || DeviceManagerDataFromSystem.writeAlpha !== writeAlpha) {
	        gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
	        DeviceManagerDataFromSystem.writeRed = writeRed;
	        DeviceManagerDataFromSystem.writeGreen = writeGreen;
	        DeviceManagerDataFromSystem.writeBlue = writeBlue;
	        DeviceManagerDataFromSystem.writeAlpha = writeAlpha;
	    }
	};
	var setSide$1 = function (gl, side, DeviceManagerDataFromSystem) {
	    if (DeviceManagerDataFromSystem.side !== side) {
	        switch (side) {
	            case exports.ESide.NONE:
	                gl.enable(gl.CULL_FACE);
	                gl.cullFace(gl.FRONT_AND_BACK);
	                break;
	            case exports.ESide.BOTH:
	                gl.disable(gl.CULL_FACE);
	                break;
	            case exports.ESide.FRONT:
	                gl.enable(gl.CULL_FACE);
	                gl.cullFace(gl.BACK);
	                break;
	            case exports.ESide.BACK:
	                gl.enable(gl.CULL_FACE);
	                gl.cullFace(gl.FRONT);
	                break;
	            default:
	                Log$$1.error(true, Log$$1.info.FUNC_UNEXPECT("side", side));
	                break;
	        }
	        DeviceManagerDataFromSystem.side = side;
	    }
	};
	var initData$20 = function (DeviceManagerDataFromSystem) {
	    DeviceManagerDataFromSystem.gl = null;
	    DeviceManagerDataFromSystem.clearColor = null;
	    DeviceManagerDataFromSystem.writeRed = null;
	    DeviceManagerDataFromSystem.writeGreen = null;
	    DeviceManagerDataFromSystem.writeBlue = null;
	    DeviceManagerDataFromSystem.writeAlpha = null;
	    DeviceManagerDataFromSystem.side = null;
	};

	var createGL = curry(function (canvas, contextConfig, DeviceManagerData, state) {
	    return IO.of(function () {
	        var gl = _getOnlyGL(canvas, contextConfig);
	        return compose(setCanvas(canvas), setContextConfig$$1(contextConfig), setGL$$1(gl, DeviceManagerData))(state);
	    });
	});
	var _getOnlyGL = function (canvas, contextConfig) {
	    var gl = getContext(contextConfig, canvas);
	    if (!gl) {
	        DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
	        return null;
	    }
	    return gl;
	};
	var getGL$$1 = getGL$1;
	var setGL$$1 = setGL$1;
	var setContextConfig$$1 = setContextConfig$1;
	var setPixelRatio$$1 = setPixelRatio$1;
	var getViewport$$1 = getViewport$1;

	var setCanvasPixelRatio$$1 = curry(function (useDevicePixelRatio, canvas, state) {
	    return IO.of(function () {
	        if (!useDevicePixelRatio) {
	            return state;
	        }
	        var pixelRatio = setCanvasPixelRatio$1(useDevicePixelRatio, canvas).run();
	        return setPixelRatio$$1(pixelRatio, state);
	    });
	});
	var setViewportOfGL$$1 = setViewportOfGL$1;

	var setScreen$$1 = curry(function (canvas, DeviceManagerData, state) {
	    return setScreen$1(canvas, _setScreenData, DeviceManagerData, state);
	});
	var _setScreenData = curry(function (DeviceManagerData, canvas, state, data) {
	    var x = data.x, y = data.y, width = data.width, height = data.height, styleWidth = data.styleWidth, styleHeight = data.styleHeight;
	    return IO.of(function () {
	        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(canvas).run();
	        return setViewportOfGL$$1(DeviceManagerData, state, data).run();
	    });
	});
	var clear$$1 = clear$1;

	var setSide$$1 = setSide$1;
	var initData$19 = initData$20;

	var DeviceManagerData = (function () {
	    function DeviceManagerData() {
	    }
	    DeviceManagerData.gl = null;
	    DeviceManagerData.clearColor = null;
	    DeviceManagerData.writeRed = null;
	    DeviceManagerData.writeGreen = null;
	    DeviceManagerData.writeBlue = null;
	    DeviceManagerData.writeAlpha = null;
	    DeviceManagerData.side = null;
	    return DeviceManagerData;
	}());

	var disposeBuffer$1 = function (geometryIndex, ArrayBufferData) {
	    disposeBuffer(geometryIndex, ArrayBufferData.vertexBuffer, getGL$$1, DeviceManagerData);
	    disposeBuffer(geometryIndex, ArrayBufferData.normalBuffers, getGL$$1, DeviceManagerData);
	    disposeBuffer(geometryIndex, ArrayBufferData.texCoordBuffers, getGL$$1, DeviceManagerData);
	};
	var initData$18 = initData$12;

	var initData$21 = initData$15;
	var disposeBuffer$2 = function (geometryIndex, IndexBufferData) {
	    disposeBuffer(geometryIndex, IndexBufferData.buffers, getGL$$1, DeviceManagerData);
	};

	var addAddComponentHandle$6 = function (BoxGeometry, CustomGeometry) {
	    addAddComponentHandle$1(BoxGeometry, addComponent$6);
	    addAddComponentHandle$1(CustomGeometry, addComponent$6);
	};
	var addDisposeHandle$6 = function (BoxGeometry, CustomGeometry) {
	    addDisposeHandle$1(BoxGeometry, disposeComponent$6);
	    addDisposeHandle$1(CustomGeometry, disposeComponent$6);
	};
	var addInitHandle$2 = function (BoxGeometry, CustomGeometry) {
	    addInitHandle(BoxGeometry, initGeometry);
	    addInitHandle(CustomGeometry, initGeometry);
	};
	var create$8 = requireCheckFunc(function (geometry, GeometryData$$1) {
	}, function (geometry, GeometryData$$1) {
	    var index = generateComponentIndex(GeometryData$$1);
	    geometry.index = index;
	    GeometryData$$1.count += 1;
	    GeometryData$$1.geometryMap[index] = geometry;
	    return geometry;
	});
	var init$7 = function (GeometryData$$1, state) {
	    for (var i = 0, count = GeometryData$$1.count; i < count; i++) {
	        initGeometry(i, state);
	    }
	    _markIsInit(GeometryData$$1);
	    return state;
	};
	var initGeometry = function (index, state) {
	    var computeDataFunc = GeometryData.computeDataFuncMap[index];
	    if (_isComputeDataFuncNotExist(computeDataFunc)) {
	        return;
	    }
	    var _a = computeDataFunc(index, GeometryData), vertices = _a.vertices, normals = _a.normals, texCoords = _a.texCoords, indices = _a.indices;
	    setVertices(index, vertices, GeometryData);
	    setNormals(index, normals, GeometryData);
	    setTexCoords(index, texCoords, GeometryData);
	    setIndices(index, indices, GeometryData);
	};
	var _isComputeDataFuncNotExist = function (func) { return isNotValidMapValue(func); };
	var getVertices = function (index, GeometryData$$1) {
	    return _getPointData(index, GeometryData$$1.vertices, GeometryData$$1.verticesCacheMap, GeometryData$$1.verticesInfoList);
	};
	var setVertices = requireCheckFunc(function (index, vertices, GeometryData$$1) {
	}, function (index, vertices, GeometryData$$1) {
	    GeometryData$$1.verticesOffset = _setPointData(index, vertices, getVertexDataSize(), GeometryData$$1.vertices, GeometryData$$1.verticesCacheMap, GeometryData$$1.verticesInfoList, GeometryData$$1.verticesWorkerInfoList, GeometryData$$1.verticesOffset, GeometryData$$1);
	});
	var getNormals = function (index, GeometryData$$1) {
	    return _getPointData(index, GeometryData$$1.normals, GeometryData$$1.normalsCacheMap, GeometryData$$1.normalsInfoList);
	};
	var setNormals = requireCheckFunc(function (index, normals, GeometryData$$1) {
	}, function (index, normals, GeometryData$$1) {
	    GeometryData$$1.normalsOffset = _setPointData(index, normals, getNormalDataSize(), GeometryData$$1.normals, GeometryData$$1.normalsCacheMap, GeometryData$$1.normalsInfoList, GeometryData$$1.normalsWorkerInfoList, GeometryData$$1.normalsOffset, GeometryData$$1);
	});
	var getTexCoords = function (index, GeometryData$$1) {
	    return _getPointData(index, GeometryData$$1.texCoords, GeometryData$$1.texCoordsCacheMap, GeometryData$$1.texCoordsInfoList);
	};
	var setTexCoords = requireCheckFunc(function (index, texCoords, GeometryData$$1) {
	}, function (index, texCoords, GeometryData$$1) {
	    GeometryData$$1.texCoordsOffset = _setPointData(index, texCoords, getTexCoordsDataSize(), GeometryData$$1.texCoords, GeometryData$$1.texCoordsCacheMap, GeometryData$$1.texCoordsInfoList, GeometryData$$1.texCoordsWorkerInfoList, GeometryData$$1.texCoordsOffset, GeometryData$$1);
	});
	var getIndices = function (index, GeometryData$$1) {
	    return _getPointData(index, GeometryData$$1.indices, GeometryData$$1.indicesCacheMap, GeometryData$$1.indicesInfoList);
	};
	var setIndices = requireCheckFunc(function (index, indices, GeometryData$$1) {
	}, function (index, indices, GeometryData$$1) {
	    GeometryData$$1.indicesOffset = _setPointData(index, indices, getIndexDataSize(), GeometryData$$1.indices, GeometryData$$1.indicesCacheMap, GeometryData$$1.indicesInfoList, GeometryData$$1.indicesWorkerInfoList, GeometryData$$1.indicesOffset, GeometryData$$1);
	});
	var _getPointData = requireCheckFunc(function (index, points, cacheMap, infoList) {
	    it("infoList[index] should exist", function () {
	        wdet_1(infoList[index]).exist;
	    });
	}, function (index, points, cacheMap, infoList) {
	    var dataArr = cacheMap[index];
	    if (isValidMapValue(dataArr)) {
	        return dataArr;
	    }
	    var info = infoList[index];
	    dataArr = getSubarray(points, info.startIndex, info.endIndex);
	    cacheMap[index] = dataArr;
	    return dataArr;
	});
	var _setPointData = function (index, dataArr, dataSize, points, cacheMap, infoList, workerInfoList, offset, GeometryData$$1) {
	    var count = dataArr.length, startIndex = offset;
	    offset += count;
	    infoList[index] = _buildInfo(startIndex, offset);
	    fillTypeArr(points, dataArr, startIndex, count);
	    _removeCache(index, cacheMap);
	    if (_isInit(GeometryData$$1)) {
	        _addWorkerInfo(workerInfoList, index, startIndex, offset);
	    }
	    return offset;
	};
	var _removeCache = function (index, cacheMap) {
	    deleteVal(index, cacheMap);
	};
	var _buildInfo = function (startIndex, endIndex) {
	    return {
	        startIndex: startIndex,
	        endIndex: endIndex
	    };
	};
	var addComponent$6 = function (component, gameObject) {
	    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
	};
	var disposeComponent$6 = function (component) {
	    var sourceIndex = component.index;
	    deleteComponent(sourceIndex, GeometryData.geometryMap);
	    GeometryData.count -= 1;
	    GeometryData.disposeCount += 1;
	    GeometryData.isReallocate = false;
	    if (isDisposeTooManyComponents(GeometryData.disposeCount) || _isBufferNearlyFull(GeometryData)) {
	        var disposedIndexArray = reAllocateGeometry(GeometryData);
	        _disposeBuffers(disposedIndexArray);
	        clearWorkerInfoList(GeometryData);
	        GeometryData.isReallocate = true;
	        GeometryData.disposeCount = 0;
	    }
	};
	var _disposeBuffers = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    _disposeBuffers = requireCheckFunc(function (disposedIndexArray) {
	        it("should not add data twice in one frame", function () {
	            wdet_1(GeometryData.disposedGeometryIndexArray.length).equal(0);
	        });
	    }, function (disposedIndexArray) {
	        GeometryData.disposedGeometryIndexArray = disposedIndexArray;
	    });
	}
	else {
	    _disposeBuffers = function (disposedIndexArray) {
	        disposeGeometryBuffers(disposedIndexArray, ArrayBufferData, IndexBufferData, disposeBuffer$1, disposeBuffer$2);
	    };
	}
	var isReallocate = function (GeometryData$$1) {
	    return GeometryData$$1.isReallocate;
	};
	var _isBufferNearlyFull = function (GeometryData$$1) {
	    var infoList = GeometryData$$1.indicesInfoList, lastInfo = infoList[infoList.length - 1];
	    if (isNotValidVal(lastInfo)) {
	        return false;
	    }
	    return lastInfo.endIndex >= GeometryData$$1.maxDisposeIndex;
	};
	var getGameObject$5 = function (index, Data) {
	    return getComponentGameObject(Data.gameObjectMap, index);
	};
	var getConfigData = function (index, GeometryData$$1) {
	    return GeometryData$$1.configDataMap[index];
	};
	var _checkIsIndicesBufferNeed32BitsByConfig = function (DataBufferConfig) {
	    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
	        return false;
	    }
	    return GPUDetector.getInstance().extensionUintIndices === true;
	};

	var _markIsInit = function (GeometryData$$1) {
	    GeometryData$$1.isInit = true;
	};
	var _isInit = function (GeometryData$$1) {
	    return GeometryData$$1.isInit;
	};
	var clearWorkerInfoList = function (GeometryData$$1) {
	    GeometryData$$1.verticesWorkerInfoList = [];
	    GeometryData$$1.normalsWorkerInfoList = [];
	    GeometryData$$1.texCoordsWorkerInfoList = [];
	    GeometryData$$1.indicesWorkerInfoList = [];
	};
	var hasNewPointData = function (GeometryData$$1) {
	    return GeometryData$$1.verticesWorkerInfoList.length > 0;
	};
	var hasDisposedGeometryIndexArrayData = function (GeometryData$$1) {
	    return GeometryData$$1.disposedGeometryIndexArray.length > 0;
	};
	var clearDisposedGeometryIndexArray = function (GeometryData$$1) {
	    GeometryData$$1.disposedGeometryIndexArray = [];
	};
	var _addWorkerInfo = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    _addWorkerInfo = function (infoList, index, startIndex, endIndex) {
	        infoList.push(_buildWorkerInfo(index, startIndex, endIndex));
	    };
	}
	else {
	    _addWorkerInfo = function (infoList, index, startIndex, endIndex) {
	    };
	}
	var _buildWorkerInfo = function (index, startIndex, endIndex) {
	    return {
	        index: index,
	        startIndex: startIndex,
	        endIndex: endIndex
	    };
	};
	var initData$17 = function (DataBufferConfig, GeometryData$$1) {
	    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig), indicesArrayBytes = null;
	    if (isIndicesBufferNeed32Bits) {
	        indicesArrayBytes = Uint32Array.BYTES_PER_ELEMENT;
	        GeometryData$$1.indexType = exports.EBufferType.UNSIGNED_INT;
	    }
	    else {
	        indicesArrayBytes = Uint16Array.BYTES_PER_ELEMENT;
	        GeometryData$$1.indexType = exports.EBufferType.UNSIGNED_SHORT;
	    }
	    GeometryData$$1.indexTypeSize = indicesArrayBytes;
	    GeometryData$$1.configDataMap = createMap();
	    GeometryData$$1.verticesCacheMap = createMap();
	    GeometryData$$1.normalsCacheMap = createMap();
	    GeometryData$$1.texCoordsCacheMap = createMap();
	    GeometryData$$1.indicesCacheMap = createMap();
	    GeometryData$$1.computeDataFuncMap = createMap();
	    GeometryData$$1.gameObjectMap = createMap();
	    GeometryData$$1.geometryMap = createMap();
	    GeometryData$$1.index = 0;
	    GeometryData$$1.count = 0;
	    _initBufferData$2(indicesArrayBytes, getUIntArrayClass(GeometryData$$1.indexType), DataBufferConfig, GeometryData$$1);
	    GeometryData$$1.verticesInfoList = [];
	    GeometryData$$1.normalsInfoList = [];
	    GeometryData$$1.texCoordsInfoList = [];
	    GeometryData$$1.indicesInfoList = [];
	    GeometryData$$1.verticesWorkerInfoList = [];
	    GeometryData$$1.normalsWorkerInfoList = [];
	    GeometryData$$1.texCoordsWorkerInfoList = [];
	    GeometryData$$1.indicesWorkerInfoList = [];
	    GeometryData$$1.disposedGeometryIndexArray = [];
	    GeometryData$$1.verticesOffset = 0;
	    GeometryData$$1.normalsOffset = 0;
	    GeometryData$$1.texCoordsOffset = 0;
	    GeometryData$$1.indicesOffset = 0;
	    GeometryData$$1.disposeCount = 0;
	    GeometryData$$1.isReallocate = false;
	};
	var _initBufferData$2 = function (indicesArrayBytes, UintArray, DataBufferConfig, GeometryData$$1) {
	    var buffer = null, count = DataBufferConfig.geometryDataBufferCount, size = Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize() + getTexCoordsDataSize()) + indicesArrayBytes * getIndexDataSize();
	    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
	    createBufferViews(buffer, count, UintArray, GeometryData$$1);
	    GeometryData$$1.buffer = buffer;
	    GeometryData$$1.maxDisposeIndex = GeometryData$$1.indices.length * 0.9;
	};
	var getIndexType$$1 = null;
	var getIndexTypeSize$$1 = null;
	var hasIndices$$1 = null;
	var getDrawMode$$1 = null;
	var getVerticesCount$$1 = null;
	var getIndicesCount$$1 = null;
	if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
	    getIndexType$$1 = getIndexType$1;
	    getIndexTypeSize$$1 = getIndexTypeSize$1;
	    hasIndices$$1 = function (index, GeometryData$$1) { return hasIndices$1(index, getIndices, GeometryData$$1); };
	    getDrawMode$$1 = getDrawMode$1;
	    getVerticesCount$$1 = function (index, GeometryData$$1) { return getVerticesCount$1(index, getVertices, GeometryData$$1); };
	    getIndicesCount$$1 = function (index, GeometryData$$1) { return getIndicesCount$1(index, getIndices, GeometryData$$1); };
	}

	var getAttribLocation$1 = getAttribLocation;
	var getUniformLocation$1 = getUniformLocation;
	var isUniformLocationNotExist$1 = isUniformLocationNotExist;
	var isAttributeLocationNotExist$1 = isAttributeLocationNotExist;
	var initData$22 = initData$16;

	var Material = (function (_super) {
	    __extends(Material, _super);
	    function Material() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Material = __decorate([
	        registerClass("Material")
	    ], Material);
	    return Material;
	}(Component));
	var getMaterialGameObject = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (component) {
	    return getGameObject$4(component.index, MaterialData);
	});
	var checkShouldAlive$1 = function (material) {
	    checkComponentShouldAlive(material, null, function (material) {
	        return isComponentIndexNotRemoved(material);
	    });
	};

	var ShaderData = (function () {
	    function ShaderData() {
	    }
	    ShaderData.index = null;
	    ShaderData.count = null;
	    ShaderData.shaderLibWholeNameMap = null;
	    return ShaderData;
	}());

	var SpecifyMaterialData = (function () {
	    function SpecifyMaterialData() {
	    }
	    SpecifyMaterialData.index = null;
	    return SpecifyMaterialData;
	}());

	var LightMaterialData = (function (_super) {
	    __extends(LightMaterialData, _super);
	    function LightMaterialData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    LightMaterialData.specularColors = null;
	    LightMaterialData.emissionColors = null;
	    LightMaterialData.shininess = null;
	    LightMaterialData.shadings = null;
	    LightMaterialData.lightModels = null;
	    LightMaterialData.defaultShininess = null;
	    LightMaterialData.defaultShading = null;
	    LightMaterialData.defaultLightModel = null;
	    LightMaterialData.emptyColor = null;
	    LightMaterialData.emptyColorArr = null;
	    LightMaterialData.diffuseMapIndex = null;
	    LightMaterialData.specularMapIndex = null;
	    return LightMaterialData;
	}(SpecifyMaterialData));

	var DirectorData = (function () {
	    function DirectorData() {
	    }
	    DirectorData.state = createState();
	    return DirectorData;
	}());

	var MapManagerData = (function () {
	    function MapManagerData() {
	    }
	    MapManagerData.buffer = null;
	    MapManagerData.textureIndices = null;
	    MapManagerData.textureCounts = null;
	    return MapManagerData;
	}());

	var TextureData = (function () {
	    function TextureData() {
	    }
	    TextureData.index = null;
	    TextureData.glTextures = null;
	    TextureData.sourceMap = null;
	    TextureData.textureMap = null;
	    TextureData.uniformSamplerNameMap = null;
	    TextureData.buffer = null;
	    TextureData.widths = null;
	    TextureData.heights = null;
	    TextureData.isNeedUpdates = null;
	    TextureData.defaultWidth = null;
	    TextureData.defaultHeight = null;
	    TextureData.defaultIsNeedUpdate = null;
	    TextureData.disposedTextureDataMap = null;
	    return TextureData;
	}());

	var LightMaterial = (function (_super) {
	    __extends(LightMaterial, _super);
	    function LightMaterial() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    LightMaterial = __decorate([
	        registerClass("LightMaterial")
	    ], LightMaterial);
	    return LightMaterial;
	}(Material));
	var createLightMaterial = function () {
	    return create$9(ShaderData, MaterialData, LightMaterialData);
	};
	var initLightMaterial = function (material) {
	    initMaterial$1(material.index, getState(DirectorData));
	};
	var getLightMaterialColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getColor(material.index, MaterialData);
	});
	var setLightMaterialColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, color) {
	    setColor(material.index, color, MaterialData);
	});
	var getLightMaterialOpacity = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getOpacity$$1(material.index, MaterialData);
	});
	var setLightMaterialOpacity = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, opacity) {
	    setOpacity(material.index, opacity, MaterialData);
	});
	var getLightMaterialAlphaTest = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getAlphaTest$$1(material.index, MaterialData);
	});
	var setLightMaterialAlphaTest = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, alphaTest) {
	    setAlphaTest(material.index, alphaTest, MaterialData);
	});
	var getLightMaterialSpecularColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getSpecularColor(material.index, LightMaterialData);
	});
	var setLightMaterialSpecularColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, color) {
	    setSpecularColor(material.index, color, LightMaterialData);
	});
	var getLightMaterialEmissionColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getEmissionColor(material.index, LightMaterialData);
	});
	var setLightMaterialEmissionColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, color) {
	    setEmissionColor(material.index, color, LightMaterialData);
	});
	var getLightMaterialShininess = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getShininess$1(material.index, LightMaterialData);
	});
	var setLightMaterialShininess = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, shininess) {
	    setShininess(material.index, shininess, LightMaterialData);
	});
	var getLightMaterialShading = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getShading$1(material.index, LightMaterialData);
	});
	var setLightMaterialShading = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, shading) {
	    setShading(material.index, shading, LightMaterialData);
	});
	var getLightMaterialLightModel = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getLightModel$1(material.index, LightMaterialData);
	});
	var setLightMaterialLightModel = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, lightModel) {
	    setLightModel(material.index, lightModel, LightMaterialData);
	});
	var setLightMaterialDiffuseMap = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, map) {
	    setDiffuseMap(material.index, map, MapManagerData, TextureData);
	});
	var setLightMaterialSpecularMap = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, map) {
	    setSpecularMap(material.index, map, MapManagerData, TextureData);
	});

	(function (ELightModel) {
	    ELightModel[ELightModel["BLINN"] = 1] = "BLINN";
	    ELightModel[ELightModel["PHONG"] = 2] = "PHONG";
	    ELightModel[ELightModel["CONSTANT"] = 3] = "CONSTANT";
	})(exports.ELightModel || (exports.ELightModel = {}));

	var initData$25 = function (startIndex, SpecifyMaterialData) {
	    SpecifyMaterialData.index = startIndex;
	};

	var getColor3Data = function (index, colors) {
	    var color = Color.create(), size = 3, i = index * size;
	    color.r = colors[i];
	    color.g = colors[i + 1];
	    color.b = colors[i + 2];
	    return color;
	};
	var setColor3Data = function (index, color, colors) {
	    var r = color.r, g = color.g, b = color.b, size = 3, index = index * size;
	    setTypeArrayValue(colors, index, r);
	    setTypeArrayValue(colors, index + 1, g);
	    setTypeArrayValue(colors, index + 2, b);
	};

	var isCached$1 = isCached;
	var addActiveTexture$1 = addActiveTexture;

	var initData$28 = initData$13;

	var TextureCacheData = (function () {
	    function TextureCacheData() {
	    }
	    TextureCacheData.bindTextureUnitCache = null;
	    return TextureCacheData;
	}());

	var Texture = (function () {
	    function Texture() {
	        this.index = null;
	    }
	    return Texture;
	}());
	var createTexture = function () {
	    return create$10(TextureData);
	};
	var disposeTexture = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture) {
	    dispose$4(getGL$$1(DeviceManagerData, getState(DirectorData)), texture, TextureCacheData, TextureData);
	});
	var getTextureSource = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture) {
	    return getSource$1(texture.index, TextureData);
	});
	var setTextureSource = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture, source) {
	    setSource(texture.index, source, TextureData);
	});
	var getTextureWidth = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture) {
	    return getWidth$2(texture.index, TextureData);
	});
	var setTextureWidth = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture, value) {
	    setWidth$1(texture.index, value, TextureData);
	});
	var getTextureHeight = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture) {
	    return getHeight$2(texture.index, TextureData);
	});
	var setTextureHeight = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture, value) {
	    setHeight$1(texture.index, value, TextureData);
	});
	var getTextureIsNeedUpdate = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture) {
	    return getIsNeedUpdate$1(texture.index, TextureData);
	});
	var setTextureIsNeedUpdate = requireCheckFunc(function (texture) {
	    _checkShouldAlive$2(texture);
	}, function (texture, value) {
	    setIsNeedUpdate$1(texture.index, value, TextureData);
	});
	var _checkShouldAlive$2 = function (texture) {
	    checkComponentShouldAlive(texture, null, function (texture) {
	        return isComponentIndexNotRemoved(texture);
	    });
	};

	var create$10 = ensureFunc(function (component) {
	    it("index should <= max count", function () {
	        wdet_1(component.index).lt(getBufferCount$1());
	    });
	}, function (TextureData) {
	    var texture = new Texture(), index = generateComponentIndex(TextureData);
	    texture.index = index;
	    TextureData.textureMap[index] = texture;
	    return texture;
	});
	var getSource$1 = getSource;
	var setSource = function (textureIndex, source, TextureData) {
	    TextureData.sourceMap[textureIndex] = source;
	};
	var getWidth$2 = getWidth;
	var setWidth$1 = function (textureIndex, value, TextureData) {
	    setTypeArrayValue(TextureData.widths, textureIndex, value);
	};
	var getHeight$2 = getHeight;
	var setHeight$1 = function (textureIndex, value, TextureData) {
	    setTypeArrayValue(TextureData.heights, textureIndex, value);
	};
	var getIsNeedUpdate$1 = getIsNeedUpdate;
	var setIsNeedUpdate$1 = function (textureIndex, value, TextureData) {
	    setTypeArrayValue(TextureData.isNeedUpdates, textureIndex, value);
	};
	var setUniformSamplerName = function (index, name, TextureData) {
	    TextureData.uniformSamplerNameMap[index] = name;
	};
	var bindToUnit$1 = function (gl, unitIndex, textureIndex, TextureCacheData, TextureData) {
	    bindToUnit(gl, unitIndex, textureIndex, TextureCacheData, TextureData, isCached$1, addActiveTexture$1);
	};
	var initTextures$1 = initTextures;
	var needUpdate$1 = needUpdate;
	var update$4 = function (gl, textureIndex, TextureData) {
	    update$3(gl, textureIndex, _setFlipY, TextureData);
	};
	var _setFlipY = function (gl, flipY) {
	    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
	};
	var dispose$4 = function (gl, texture, TextureCacheData, TextureData) {
	    var bufferDataSize = getBufferDataSize(), sourceIndex = texture.index, lastComponentIndex = null;
	    TextureData.index -= 1;
	    lastComponentIndex = TextureData.index;
	    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.widths, TextureData.defaultWidth);
	    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.heights, TextureData.defaultHeight);
	    deleteOneItemBySwapAndReset(sourceIndex * bufferDataSize, lastComponentIndex * bufferDataSize, TextureData.isNeedUpdates, TextureData.defaultIsNeedUpdate);
	    disposeSourceMap(sourceIndex, lastComponentIndex, TextureData);
	    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, TextureData.textureMap);
	    _disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
	    _addDisposeDataForWorker(sourceIndex, lastComponentIndex, TextureData);
	};
	var _disposeGLTexture = null;
	var _addDisposeDataForWorker = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    _disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData) {
	    };
	    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
	        TextureData.disposedTextureDataMap.push(_buildDisposedTextureData(sourceIndex, lastComponentIndex));
	    };
	    var _buildDisposedTextureData = function (sourceIndex, lastComponentIndex) {
	        return {
	            sourceIndex: sourceIndex,
	            lastComponentIndex: lastComponentIndex
	        };
	    };
	}
	else {
	    _disposeGLTexture = function (gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData) {
	        disposeGLTexture(gl, sourceIndex, lastComponentIndex, TextureCacheData, TextureData);
	    };
	    _addDisposeDataForWorker = function (sourceIndex, lastComponentIndex, TextureData) {
	    };
	}
	var hasDisposedTextureDataMap = function (TextureData) {
	    return TextureData.disposedTextureDataMap.length > 0;
	};
	var clearDisposedTextureDataMap = function (TextureData) {
	    TextureData.disposedTextureDataMap = [];
	};
	var convertSourceMapToSrcIndexArr = function (TextureData) {
	    var arr = [];
	    forEach(TextureData.sourceMap, function (source, index) {
	        if (_isSourceNotExist(source)) {
	            return;
	        }
	        arr.push({
	            src: source.src,
	            index: index
	        });
	    });
	    return arr;
	};
	var getUniformSamplerNameMap = function (TextureData) {
	    return TextureData.uniformSamplerNameMap;
	};
	var _isSourceNotExist = function (source) { return isNotValidVal(source); };
	var initData$27 = function (TextureCacheData, TextureData) {
	    initData$28(TextureCacheData);
	    TextureData.index = 0;
	    TextureData.glTextures = [];
	    TextureData.sourceMap = [];
	    TextureData.textureMap = [];
	    TextureData.uniformSamplerNameMap = [];
	    TextureData.disposedTextureDataMap = [];
	    _setDefaultData(TextureData);
	    _initBufferData$4(TextureData);
	};
	var _setDefaultData = function (TextureData) {
	    TextureData.defaultWidth = 0;
	    TextureData.defaultHeight = 0;
	    TextureData.defaultIsNeedUpdate = 0;
	};
	var _initBufferData$4 = function (TextureData) {
	    var buffer = null, count = getBufferCount$1(), size = Float32Array.BYTES_PER_ELEMENT * (getBufferDataSize() * 2) + Uint8Array.BYTES_PER_ELEMENT * (getBufferDataSize()), offset = null;
	    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));
	    offset = createTypeArrays$3(buffer, count, TextureData);
	    _setDefaultTypeArrData$2(count, TextureData);
	    TextureData.buffer = buffer;
	};
	var _setDefaultTypeArrData$2 = function (count, TextureData) {
	    var width = TextureData.defaultWidth, height = TextureData.defaultHeight, isNeedUpdate = TextureData.defaultIsNeedUpdate;
	    for (var i = 0; i < count; i++) {
	        setWidth$1(i, width, TextureData);
	        setHeight$1(i, height, TextureData);
	        setIsNeedUpdate$1(i, isNeedUpdate, TextureData);
	    }
	};

	var initMapManagers = function (gl, TextureData) {
	    initTextures$1(gl, TextureData);
	};

	var addMap = requireCheckFunc(function (materialIndex, map, count, uniformSamplerName, MapManagerData, TextureData) {
	    it("map count shouldn't exceed max count", function () {
	        wdet_1(count + 1).lte(getMaxTextureCount());
	    });
	}, function (materialIndex, map, count, uniformSamplerName, MapManagerData, TextureData) {
	    var textureIndex = map.index;
	    MapManagerData.textureIndices[materialIndex + count] = textureIndex;
	    MapManagerData.textureCounts[materialIndex] = count + 1;
	    setUniformSamplerName(textureIndex, uniformSamplerName, TextureData);
	});
	var getMapCount$1 = getMapCount;
	var bindAndUpdate$1 = function (gl, mapCount, TextureCacheData, TextureData, MapManagerData) {
	    bindAndUpdate(gl, mapCount, TextureCacheData, TextureData, MapManagerData, bindToUnit$1, needUpdate$1, update$4);
	};
	var dispose$3 = function (materialSourceIndex, materialLastComponentIndex, MapManagerData) {
	    deleteSingleValueBySwapAndReset(materialSourceIndex, materialLastComponentIndex, MapManagerData.textureCounts, 0);
	};
	var initData$26 = function (TextureCacheData, TextureData, MapManagerData) {
	    initData$27(TextureCacheData, TextureData);
	    _initBufferData$3(MapManagerData);
	};
	var _initBufferData$3 = function (MapManagerData) {
	    var buffer = null, count = getBufferCount$$1(), size = Float32Array.BYTES_PER_ELEMENT + Uint8Array.BYTES_PER_ELEMENT, offset = null;
	    buffer = createSharedArrayBufferOrArrayBuffer(computeBufferLength(count, size));
	    offset = createTypeArrays$1(buffer, count, MapManagerData);
	    _setDefaultTypeArrData$1(count, MapManagerData);
	    MapManagerData.buffer = buffer;
	};
	var _setDefaultTypeArrData$1 = function (count, MapManagerData) {
	};

	var create$9 = ensureFunc(function (component) {
	    it("index should <= max count", function () {
	        wdet_1(component.index).lt(getLightMaterialBufferStartIndex() + getLightMaterialBufferCount());
	    });
	}, function (ShaderData, MaterialData$$1, LightMaterialData$$1) {
	    var material = new LightMaterial(), index = generateComponentIndex(LightMaterialData$$1);
	    material.index = index;
	    material = create$6(index, material, ShaderData, MaterialData$$1);
	    return material;
	});
	var getSpecularColor = function (index, LightMaterialData$$1) {
	    return getColor3Data(computeLightBufferIndex(index), LightMaterialData$$1.specularColors);
	};
	var getSpecularColorArr3$1 = function (index, LightMaterialData$$1) {
	    return getSpecularColorArr3(computeLightBufferIndex(index), LightMaterialData$$1);
	};
	var setSpecularColor = function (index, color, LightMaterialData$$1) {
	    setColorData(computeLightBufferIndex(index), color, LightMaterialData$$1.specularColors);
	};
	var getDiffuseMapIndex = function (LightMaterialData$$1) {
	    return LightMaterialData$$1.diffuseMapIndex;
	};
	var setDiffuseMap = function (index, map, MapManagerData$$1, TextureData) {
	    var count = getMapCount$1(index, MapManagerData$$1);
	    addMap(index, map, count, "u_diffuseMapSampler", MapManagerData$$1, TextureData);
	    LightMaterialData.diffuseMapIndex = map.index;
	};
	var getSpecularMapIndex = function (LightMaterialData$$1) {
	    return LightMaterialData$$1.specularMapIndex;
	};
	var setSpecularMap = function (index, map, MapManagerData$$1, TextureData) {
	    var count = getMapCount$1(index, MapManagerData$$1);
	    addMap(index, map, count, "u_specularMapSampler", MapManagerData$$1, TextureData);
	    LightMaterialData.specularMapIndex = map.index;
	};
	var getEmissionColor = function (index, LightMaterialData$$1) {
	    return getColor3Data(computeLightBufferIndex(index), LightMaterialData$$1.emissionColors);
	};
	var getEmissionColorArr3$1 = function (index, LightMaterialData$$1) {
	    return getEmissionColorArr3(computeLightBufferIndex(index), LightMaterialData$$1);
	};
	var setEmissionColor = function (index, color, LightMaterialData$$1) {
	    setColorData(computeLightBufferIndex(index), color, LightMaterialData$$1.emissionColors);
	};
	var getShininess$1 = function (index, LightMaterialDataFromSystem) {
	    return getShininess(computeLightBufferIndex(index), LightMaterialDataFromSystem);
	};
	var setShininess = function (index, shininess, LightMaterialData$$1) {
	    setTypeArrayValue(LightMaterialData$$1.shininess, computeLightBufferIndex(index), shininess);
	};
	var getShading$1 = function (index, LightMaterialDataFromSystem) {
	    return getShading(computeLightBufferIndex(index), LightMaterialDataFromSystem);
	};
	var setShading = function (index, shading, LightMaterialData$$1) {
	    setTypeArrayValue(LightMaterialData$$1.shadings, computeLightBufferIndex(index), shading);
	};
	var getLightModel$1 = function (index, LightMaterialDataFromSystem) {
	    return getLightModel(computeLightBufferIndex(index), LightMaterialDataFromSystem);
	};
	var setLightModel = function (index, lightModel, LightMaterialData$$1) {
	    setTypeArrayValue(LightMaterialData$$1.lightModels, computeLightBufferIndex(index), lightModel);
	};
	var initMaterial$1 = function (index, state) {
	    initMaterial$$1(index, state, getClassName(), MaterialData);
	};
	var addComponent$7 = function (component, gameObject) {
	    addComponent$5(component, gameObject, MaterialData);
	};
	var disposeComponent$7 = function (component) {
	    var sourceIndex = component.index, lightMaterialSourceIndex = computeLightBufferIndex(sourceIndex), lastComponentIndex = null, lightMaterialLastComponentIndex = null, colorDataSize = getColorDataSize(), shininessDataSize = getShininessDataSize(), shadingDataSize = getShadingDataSize(), lightModelDataSize = getLightModelDataSize();
	    LightMaterialData.index -= 1;
	    lastComponentIndex = LightMaterialData.index;
	    lightMaterialLastComponentIndex = computeLightBufferIndex(lastComponentIndex);
	    disposeComponent$5(sourceIndex, lastComponentIndex, MapManagerData, MaterialData);
	    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.specularColors, colorDataSize, MaterialData.defaultColorArr);
	    deleteBySwapAndReset(lightMaterialSourceIndex * colorDataSize, lightMaterialLastComponentIndex * colorDataSize, LightMaterialData.emissionColors, colorDataSize, LightMaterialData.emptyColorArr);
	    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shadingDataSize, lightMaterialLastComponentIndex * shadingDataSize, LightMaterialData.shadings, LightMaterialData.defaultShading);
	    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * shininessDataSize, lightMaterialLastComponentIndex * shininessDataSize, LightMaterialData.shininess, LightMaterialData.defaultShininess);
	    deleteOneItemBySwapAndReset(lightMaterialSourceIndex * lightModelDataSize, lightMaterialLastComponentIndex * lightModelDataSize, LightMaterialData.lightModels, LightMaterialData.defaultLightModel);
	};
	var initData$24 = function (LightMaterialData$$1) {
	    initData$25(getLightMaterialBufferStartIndex(), LightMaterialData$$1);
	    LightMaterialData$$1.diffuseMapIndex = null;
	    LightMaterialData$$1.specularMapIndex = null;
	    LightMaterialData$$1.emptyColor = _createEmptyColor();
	    LightMaterialData$$1.emptyColorArr = LightMaterialData$$1.emptyColor.toVector3().toArray();
	};
	var createTypeArrays$4 = function (buffer, offset, count, LightMaterialData$$1) {
	    var returnedOffset = createTypeArrays$2(buffer, offset, count, LightMaterialData$$1);
	    _setLightMaterialDefaultTypeArrData(count, LightMaterialData$$1);
	    return returnedOffset;
	};
	var setDefaultData = function (LightMaterialData$$1) {
	    LightMaterialData$$1.defaultShininess = 32;
	    LightMaterialData$$1.defaultShading = 0;
	    LightMaterialData$$1.defaultLightModel = exports.ELightModel.PHONG;
	};
	var _setLightMaterialDefaultTypeArrData = function (count, LightMaterialData$$1) {
	    var startIndex = getLightMaterialBufferStartIndex(), color = createDefaultColor(), emptyColor = LightMaterialData$$1.emptyColor, shading = LightMaterialData$$1.defaultShading, lightModel = LightMaterialData$$1.defaultLightModel, shininess = LightMaterialData$$1.defaultShininess;
	    count += startIndex;
	    for (var i = startIndex; i < count; i++) {
	        setSpecularColor(i, color, LightMaterialData$$1);
	        setEmissionColor(i, emptyColor, LightMaterialData$$1);
	        setShininess(i, shininess, LightMaterialData$$1);
	        setShading(i, shading, LightMaterialData$$1);
	        setLightModel(i, lightModel, LightMaterialData$$1);
	    }
	};
	var _createEmptyColor = function () {
	    var color = Color.create("rgb(0,0,0)");
	    return color;
	};

	var getUniformData$1 = function (field, from, renderCommandUniformData, MaterialData, BasicMaterialData, LightMaterialData) {
	    return getUniformData(field, from, renderCommandUniformData, {
	        getColorArr3: getColorArr3$$1,
	        getOpacity: getOpacity$$1,
	        MaterialDataFromSystem: MaterialData
	    }, {
	        BasicMaterialDataFromSystem: BasicMaterialData
	    }, {
	        getEmissionColorArr3: getEmissionColorArr3$1,
	        getSpecularColorArr3: getSpecularColorArr3$1,
	        getLightModel: getLightModel$1,
	        getShininess: getShininess$1,
	        LightMaterialDataFromSystem: LightMaterialData
	    });
	};
	var sendBuffer$1 = sendBuffer;
	var sendMatrix3$1 = function (gl, program, name, data, uniformLocationMap) {
	    sendMatrix3(gl, program, name, data, uniformLocationMap, getUniformLocation$1, isUniformLocationNotExist$1);
	};
	var sendMatrix4$1 = function (gl, program, name, data, uniformLocationMap) {
	    sendMatrix4(gl, program, name, data, uniformLocationMap, getUniformLocation$1, isUniformLocationNotExist$1);
	};
	var sendVector3$1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
	    sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation$1, isUniformLocationNotExist$1);
	};
	var sendInt$1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
	    sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation$1, isUniformLocationNotExist$1);
	};
	var sendFloat1$1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
	    sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation$1, isUniformLocationNotExist$1);
	};
	var sendFloat3$1 = function (gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap) {
	    sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation$1, isUniformLocationNotExist$1);
	};
	var initData$23 = initData$14;

	var buildGLSLSource$1 = function (materialIndex, materialShaderLibNameArr, shaderLibData, MaterialDataMap) {
	    return buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibData, {
	        getAlphaTest: getAlphaTest$$1,
	        isTestAlpha: isTestAlpha$$1
	    }, MaterialDataMap);
	};

	var Light = (function (_super) {
	    __extends(Light, _super);
	    function Light() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Light = __decorate([
	        registerClass("Light")
	    ], Light);
	    return Light;
	}(Component));
	var checkLightShouldAlive = function (component) {
	    checkComponentShouldAlive(component, null, function (component) {
	        return isComponentIndexNotRemoved(component);
	    });
	};

	var SpecifyLightData = (function () {
	    function SpecifyLightData() {
	    }
	    SpecifyLightData.index = null;
	    SpecifyLightData.count = null;
	    SpecifyLightData.buffer = null;
	    SpecifyLightData.colors = null;
	    SpecifyLightData.gameObjectMap = null;
	    SpecifyLightData.lightMap = null;
	    SpecifyLightData.defaultColorArr = null;
	    return SpecifyLightData;
	}());

	var AmbientLightData = (function (_super) {
	    __extends(AmbientLightData, _super);
	    function AmbientLightData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return AmbientLightData;
	}(SpecifyLightData));

	var getColorDataSize$1 = function () { return 3; };

	var create$12 = requireCheckFunc(function (light, SpecifyLightData) {
	    checkIndexShouldEqualCount(SpecifyLightData);
	}, function (light, SpecifyLightData) {
	    var index = generateComponentIndex(SpecifyLightData);
	    light.index = index;
	    SpecifyLightData.count += 1;
	    SpecifyLightData.lightMap[index] = light;
	    return light;
	});
	var addComponent$9 = function (component, gameObject, SpecifyLightData) {
	    addComponentToGameObjectMap(SpecifyLightData.gameObjectMap, component.index, gameObject);
	};
	var setColor$2 = function (index, color, colors) {
	    setColor3Data(index, color, colors);
	};
	var disposeComponent$9 = ensureFunc(function (returnVal, sourceIndex, SpecifyLightData) {
	    checkIndexShouldEqualCount(SpecifyLightData);
	}, function (sourceIndex, SpecifyLightData) {
	    var colorDataSize = getColorDataSize$1(), lastComponentIndex = null;
	    SpecifyLightData.count -= 1;
	    SpecifyLightData.index -= 1;
	    lastComponentIndex = SpecifyLightData.count;
	    deleteBySwap$1(sourceIndex, lastComponentIndex, SpecifyLightData.gameObjectMap);
	    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, SpecifyLightData.lightMap);
	    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, SpecifyLightData.colors, colorDataSize, SpecifyLightData.defaultColorArr);
	    return lastComponentIndex;
	});
	var initData$30 = function (buffer, SpecifyLightData) {
	    SpecifyLightData.index = 0;
	    SpecifyLightData.count = 0;
	    SpecifyLightData.lightMap = [];
	    SpecifyLightData.gameObjectMap = [];
	    SpecifyLightData.defaultColorArr = createDefaultColor$1().toArray3();
	    SpecifyLightData.buffer = buffer;
	};
	var createDefaultColor$1 = function () {
	    return Color.create().setColorByNum("#ffffff");
	};
	var getPosition$1 = function (index, ThreeDTransformData, GameObjectData, SpecifyLightData) {
	    return getPosition(getTransform(getGameObject$6(index, SpecifyLightData), GameObjectData), ThreeDTransformData);
	};
	var getGameObject$6 = function (index, SpecifyLightData) {
	    return getComponentGameObject(SpecifyLightData.gameObjectMap, index);
	};

	var AmbientLight = (function (_super) {
	    __extends(AmbientLight, _super);
	    function AmbientLight() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AmbientLight = __decorate([
	        registerClass("AmbientLight")
	    ], AmbientLight);
	    return AmbientLight;
	}(Light));
	var createAmbientLight = function () {
	    return create$11(AmbientLightData);
	};
	var getAmbientLightGameObject = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (component) {
	    return getGameObject$6(component.index, AmbientLightData);
	});
	var getAmbientLightColor = function (light) {
	    return getColor$1(light.index, AmbientLightData);
	};
	var setAmbientLightColor = function (light, color) {
	    setColor$1(light.index, color, AmbientLightData);
	};

	var getColor$2 = function (index, AmbientLightDataFromSystem) {
	    return getColor3Data(index, AmbientLightDataFromSystem.colors);
	};
	var getColorArr3$3 = function (index, AmbientLightDataFromSystem) {
	    return getColorArr3$1(index, AmbientLightDataFromSystem);
	};
	var getColorDataSize$2 = getColorDataSize$1;
	var createTypeArrays$5 = function (buffer, count, AmbientLightDataFromSystem) {
	    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * getColorDataSize$2());
	};

	var getAmbientLightBufferCount = function () {
	    return DataBufferConfig.ambientLightDataBufferCount;
	};
	var getDirectionLightBufferCount = function () {
	    return DataBufferConfig.directionLightDataBufferCount;
	};
	var getPointLightBufferCount = function () {
	    return DataBufferConfig.pointLightDataBufferCount;
	};

	var create$11 = ensureFunc(function (light, AmbientLightData$$1) {
	    it("count should <= max count", function () {
	        wdet_1(AmbientLightData$$1.count).lte(DataBufferConfig.ambientLightDataBufferCount);
	    });
	}, function (AmbientLightData$$1) {
	    var light = new AmbientLight();
	    light = create$12(light, AmbientLightData$$1);
	    return light;
	});
	var getColor$1 = getColor$2;
	var getColorArr3$2 = getColorArr3$3;
	var setColor$1 = function (index, color, AmbientLightData$$1) {
	    setColor$2(index, color, AmbientLightData$$1.colors);
	};
	var addComponent$8 = function (component, gameObject) {
	    addComponent$9(component, gameObject, AmbientLightData);
	};
	var disposeComponent$8 = function (component) {
	    disposeComponent$9(component.index, AmbientLightData);
	};
	var initData$29 = function (AmbientLightData$$1) {
	    var count = getAmbientLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * getColorDataSize$2(), buffer = null;
	    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
	    initData$30(buffer, AmbientLightData$$1);
	    createTypeArrays$5(buffer, count, AmbientLightData$$1);
	    _setDefaultTypeArrData$3(count, AmbientLightData$$1);
	};
	var _setDefaultTypeArrData$3 = function (count, AmbientLightData$$1) {
	    var color = createDefaultColor$1();
	    for (var i = 0; i < count; i++) {
	        setColor$1(i, color, AmbientLightData$$1);
	    }
	};

	var DirectionLightData = (function (_super) {
	    __extends(DirectionLightData, _super);
	    function DirectionLightData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    DirectionLightData.intensities = null;
	    DirectionLightData.defaultIntensity = null;
	    DirectionLightData.lightGLSLDataStructureMemberNameArr = null;
	    return DirectionLightData;
	}(SpecifyLightData));

	var DirectionLight = (function (_super) {
	    __extends(DirectionLight, _super);
	    function DirectionLight() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    DirectionLight = __decorate([
	        registerClass("DirectionLight")
	    ], DirectionLight);
	    return DirectionLight;
	}(Light));
	var createDirectionLight = function () {
	    return create$13(DirectionLightData);
	};
	var getDirectionLightGameObject = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (component) {
	    return getGameObject$6(component.index, DirectionLightData);
	});
	var getDirectionLightPosition = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (component) {
	    return getPosition$2(component.index, ThreeDTransformData, GameObjectData, DirectionLightData);
	});
	var getDirectionLightColor = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getColor$3(light.index, DirectionLightData);
	});
	var setDirectionLightColor = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, color) {
	    setColor$3(light.index, color, DirectionLightData);
	});
	var getDirectionLightIntensity = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getIntensity$$1(light.index, DirectionLightData);
	});
	var setDirectionLightIntensity = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, intensity) {
	    setIntensity(light.index, intensity, DirectionLightData);
	});

	var getColorArr3$5 = function (index, DirectionLightDataFromSystem) {
	    return getColorArr3$1(index, DirectionLightDataFromSystem);
	};
	var getIntensity$1 = function (index, DirectionLightDataFromSystem) {
	    return getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
	};
	var getColorDataSize$3 = getColorDataSize$1;
	var getIntensityDataSize = function () { return 1; };
	var createTypeArrays$6 = function (buffer, count, DirectionLightDataFromSystem) {
	    var offset = 0;
	    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize$3());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize$3();
	    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
	};

	var create$13 = ensureFunc(function (light, DirectionLightData$$1) {
	    it("count should <= max count", function () {
	        wdet_1(DirectionLightData$$1.count).lte(DataBufferConfig.directionLightDataBufferCount);
	    });
	}, function (DirectionLightData$$1) {
	    var light = new DirectionLight();
	    light = create$12(light, DirectionLightData$$1);
	    return light;
	});
	var getPosition$2 = function (index, ThreeDTransformData, GameObjectData, DirectionLightData$$1) {
	    return getPosition$1(index, ThreeDTransformData, GameObjectData, DirectionLightData$$1);
	};
	var getAllPositionData = function (ThreeDTransformData, GameObjectData, DirectionLightData$$1) {
	    var positionArr = [];
	    for (var i = 0, count = DirectionLightData$$1.count; i < count; i++) {
	        positionArr.push(getPosition$2(i, ThreeDTransformData, GameObjectData, DirectionLightData$$1).values);
	    }
	    return positionArr;
	};
	var getColor$3 = function (index, DirectionLightData$$1) {
	    return getColor3Data(index, DirectionLightData$$1.colors);
	};
	var getColorArr3$4 = getColorArr3$5;
	var setColor$3 = function (index, color, DirectionLightData$$1) {
	    setColor$2(index, color, DirectionLightData$$1.colors);
	};
	var getIntensity$$1 = getIntensity$1;
	var setIntensity = function (index, intensity, DirectionLightData$$1) {
	    var size = getIntensityDataSize(), i = index * size;
	    setTypeArrayValue(DirectionLightData$$1.intensities, i, intensity);
	};
	var addComponent$10 = function (component, gameObject) {
	    addComponent$9(component, gameObject, DirectionLightData);
	};
	var disposeComponent$10 = function (component) {
	    var intensityDataSize = getIntensityDataSize(), sourceIndex = component.index, lastComponentIndex = null;
	    lastComponentIndex = disposeComponent$9(sourceIndex, DirectionLightData);
	    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, DirectionLightData.intensities, DirectionLightData.defaultIntensity);
	};
	var initData$31 = function (DirectionLightData$$1) {
	    var count = getDirectionLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize$3() + getIntensityDataSize()), buffer = null;
	    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
	    initData$30(buffer, DirectionLightData$$1);
	    createTypeArrays$6(buffer, count, DirectionLightData$$1);
	    DirectionLightData$$1.defaultIntensity = 1;
	    _setDefaultTypeArrData$4(count, DirectionLightData$$1);
	    DirectionLightData$$1.lightGLSLDataStructureMemberNameArr = [
	        {
	            position: "u_directionLights[0].position",
	            color: "u_directionLights[0].color",
	            intensity: "u_directionLights[0].intensity"
	        }, {
	            position: "u_directionLights[1].position",
	            color: "u_directionLights[1].color",
	            intensity: "u_directionLights[1].intensity"
	        }, {
	            position: "u_directionLights[2].position",
	            color: "u_directionLights[2].color",
	            intensity: "u_directionLights[2].intensity"
	        }, {
	            position: "u_directionLights[3].position",
	            color: "u_directionLights[3].color",
	            intensity: "u_directionLights[3].intensity"
	        }
	    ];
	};
	var _setDefaultTypeArrData$4 = function (count, DirectionLightData$$1) {
	    var color = createDefaultColor$1(), intensity = DirectionLightData$$1.defaultIntensity;
	    for (var i = 0; i < count; i++) {
	        setColor$3(i, color, DirectionLightData$$1);
	        setIntensity(i, intensity, DirectionLightData$$1);
	    }
	};

	var PointLightData = (function (_super) {
	    __extends(PointLightData, _super);
	    function PointLightData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    PointLightData.intensities = null;
	    PointLightData.constants = null;
	    PointLightData.linears = null;
	    PointLightData.quadratics = null;
	    PointLightData.ranges = null;
	    PointLightData.defaultIntensity = null;
	    PointLightData.defaultConstant = null;
	    PointLightData.defaultLinear = null;
	    PointLightData.defaultQuadratic = null;
	    PointLightData.defaultRange = null;
	    PointLightData.lightGLSLDataStructureMemberNameArr = null;
	    return PointLightData;
	}(SpecifyLightData));

	var PointLight = (function (_super) {
	    __extends(PointLight, _super);
	    function PointLight() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    PointLight = __decorate([
	        registerClass("PointLight")
	    ], PointLight);
	    return PointLight;
	}(Light));
	var createPointLight = function () {
	    return create$14(PointLightData);
	};
	var getPointLightGameObject = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (component) {
	    return getGameObject$6(component.index, PointLightData);
	});
	var getPointLightPosition = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (component) {
	    return getPosition$3(component.index, ThreeDTransformData, GameObjectData, PointLightData);
	});
	var getPointLightColor = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getColor$5(light.index, PointLightData);
	});
	var setPointLightColor = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, color) {
	    setColor$4(light.index, color, PointLightData);
	});
	var getPointLightIntensity = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getIntensity$2(light.index, PointLightData);
	});
	var setPointLightIntensity = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, value) {
	    setIntensity$1(light.index, value, PointLightData);
	});
	var getPointLightConstant = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getConstant$$1(light.index, PointLightData);
	});
	var setPointLightConstant = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, value) {
	    setConstant(light.index, value, PointLightData);
	});
	var getPointLightLinear = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getLinear$$1(light.index, PointLightData);
	});
	var setPointLightLinear = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, value) {
	    setLinear(light.index, value, PointLightData);
	});
	var getPointLightQuadratic = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getQuadratic$$1(light.index, PointLightData);
	});
	var setPointLightQuadratic = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, value) {
	    setQuadratic(light.index, value, PointLightData);
	});
	var getPointLightRange = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light) {
	    return getRange$$1(light.index, PointLightData);
	});
	var setPointLightRange = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, value) {
	    setRange(light.index, value, PointLightData);
	});
	var setPointLightRangeLevel = requireCheckFunc(function (component) {
	    checkLightShouldAlive(component);
	}, function (light, value) {
	    setRangeLevel(light.index, value, PointLightData);
	});

	var getColorArr3$7 = function (index, PointLightDataFromSystem) {
	    return getColorArr3$1(index, PointLightDataFromSystem);
	};
	var getIntensity$3 = function (index, PointLightDataFromSystem) {
	    return getSingleSizeData(index, PointLightDataFromSystem.intensities);
	};
	var getConstant$1 = function (index, PointLightDataFromSystem) {
	    return getSingleSizeData(index, PointLightDataFromSystem.constants);
	};
	var getLinear$1 = function (index, PointLightDataFromSystem) {
	    return getSingleSizeData(index, PointLightDataFromSystem.linears);
	};
	var getQuadratic$1 = function (index, PointLightDataFromSystem) {
	    return getSingleSizeData(index, PointLightDataFromSystem.quadratics);
	};
	var getRange$1 = function (index, PointLightDataFromSystem) {
	    return getSingleSizeData(index, PointLightDataFromSystem.ranges);
	};
	var getColorDataSize$4 = getColorDataSize$1;
	var getIntensityDataSize$1 = function () { return 1; };
	var getConstantDataSize = function () { return 1; };
	var getLinearDataSize = function () { return 1; };
	var getQuadraticDataSize = function () { return 1; };
	var getRangeDataSize = function () { return 1; };
	var createTypeArrays$7 = function (buffer, count, PointLightDataFromSystem) {
	    var offset = 0;
	    PointLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize$4());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize$4();
	    PointLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize$1());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getIntensityDataSize$1();
	    PointLightDataFromSystem.constants = new Float32Array(buffer, offset, count * getConstantDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getConstantDataSize();
	    PointLightDataFromSystem.linears = new Float32Array(buffer, offset, count * getLinearDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getLinearDataSize();
	    PointLightDataFromSystem.quadratics = new Float32Array(buffer, offset, count * getQuadraticDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getQuadraticDataSize();
	    PointLightDataFromSystem.ranges = new Float32Array(buffer, offset, count * getRangeDataSize());
	    offset += count * Float32Array.BYTES_PER_ELEMENT * getRangeDataSize();
	};

	var create$14 = ensureFunc(function (light, PointLightData$$1) {
	    it("count should <= max count", function () {
	        wdet_1(PointLightData$$1.count).lte(DataBufferConfig.pointLightDataBufferCount);
	    });
	}, function (PointLightData$$1) {
	    var light = new PointLight();
	    light = create$12(light, PointLightData$$1);
	    return light;
	});
	var getPosition$3 = function (index, ThreeDTransformData, GameObjectData, PointLightData$$1) {
	    return getPosition$1(index, ThreeDTransformData, GameObjectData, PointLightData$$1);
	};
	var getAllPositionData$1 = function (ThreeDTransformData, GameObjectData, PointLightData$$1) {
	    var positionArr = [];
	    for (var i = 0, count = PointLightData$$1.count; i < count; i++) {
	        positionArr.push(getPosition$3(i, ThreeDTransformData, GameObjectData, PointLightData$$1).values);
	    }
	    return positionArr;
	};
	var getColor$5 = function (index, PointLightData$$1) {
	    return getColor3Data(index, PointLightData$$1.colors);
	};
	var getColorArr3$6 = getColorArr3$7;
	var setColor$4 = function (index, color, PointLightData$$1) {
	    setColor$2(index, color, PointLightData$$1.colors);
	};
	var getIntensity$2 = getIntensity$3;
	var setIntensity$1 = function (index, value, PointLightData$$1) {
	    setSingleValue(PointLightData$$1.intensities, index, value);
	};
	var getConstant$$1 = getConstant$1;
	var setConstant = function (index, value, PointLightData$$1) {
	    setSingleValue(PointLightData$$1.constants, index, value);
	};
	var getLinear$$1 = getLinear$1;
	var setLinear = function (index, value, PointLightData$$1) {
	    setSingleValue(PointLightData$$1.linears, index, value);
	};
	var getQuadratic$$1 = getQuadratic$1;
	var setQuadratic = function (index, value, PointLightData$$1) {
	    setSingleValue(PointLightData$$1.quadratics, index, value);
	};
	var getRange$$1 = getRange$1;
	var setRange = function (index, value, PointLightData$$1) {
	    setSingleValue(PointLightData$$1.ranges, index, value);
	};
	var setRangeLevel = function (index, value, PointLightData$$1) {
	    switch (value) {
	        case 0:
	            setRange(index, 7, PointLightData$$1);
	            setLinear(index, 0.7, PointLightData$$1);
	            setQuadratic(index, 1.8, PointLightData$$1);
	            break;
	        case 1:
	            setRange(index, 13, PointLightData$$1);
	            setLinear(index, 0.35, PointLightData$$1);
	            setQuadratic(index, 0.44, PointLightData$$1);
	            break;
	        case 2:
	            setRange(index, 20, PointLightData$$1);
	            setLinear(index, 0.22, PointLightData$$1);
	            setQuadratic(index, 0.20, PointLightData$$1);
	            break;
	        case 3:
	            setRange(index, 32, PointLightData$$1);
	            setLinear(index, 0.14, PointLightData$$1);
	            setQuadratic(index, 0.07, PointLightData$$1);
	            break;
	        case 4:
	            setRange(index, 50, PointLightData$$1);
	            setLinear(index, 0.09, PointLightData$$1);
	            setQuadratic(index, 0.032, PointLightData$$1);
	            break;
	        case 5:
	            setRange(index, 65, PointLightData$$1);
	            setLinear(index, 0.07, PointLightData$$1);
	            setQuadratic(index, 0.017, PointLightData$$1);
	            break;
	        case 6:
	            setRange(index, 100, PointLightData$$1);
	            setLinear(index, 0.045, PointLightData$$1);
	            setQuadratic(index, 0.0075, PointLightData$$1);
	            break;
	        case 7:
	            setRange(index, 160, PointLightData$$1);
	            setLinear(index, 0.027, PointLightData$$1);
	            setQuadratic(index, 0.0028, PointLightData$$1);
	            break;
	        case 8:
	            setRange(index, 200, PointLightData$$1);
	            setLinear(index, 0.022, PointLightData$$1);
	            setQuadratic(index, 0.0019, PointLightData$$1);
	            break;
	        case 9:
	            setRange(index, 325, PointLightData$$1);
	            setLinear(index, 0.014, PointLightData$$1);
	            setQuadratic(index, 0.0007, PointLightData$$1);
	            break;
	        case 10:
	            setRange(index, 600, PointLightData$$1);
	            setLinear(index, 0.007, PointLightData$$1);
	            setQuadratic(index, 0.0002, PointLightData$$1);
	            break;
	        case 11:
	            setRange(index, 3250, PointLightData$$1);
	            setLinear(index, 0.0014, PointLightData$$1);
	            setQuadratic(index, 0.000007, PointLightData$$1);
	            break;
	        default:
	            Log$$1.error(true, "over point light range");
	            break;
	    }
	};
	var addComponent$11 = function (component, gameObject) {
	    addComponent$9(component, gameObject, PointLightData);
	};
	var disposeComponent$11 = function (component) {
	    var intensityDataSize = getIntensityDataSize$1(), constantDataSize = getConstantDataSize(), linearDataSize = getLinearDataSize(), quadraticDataSize = getQuadraticDataSize(), rangeDataSize = getRangeDataSize(), sourceIndex = component.index, lastComponentIndex = null;
	    lastComponentIndex = disposeComponent$9(sourceIndex, PointLightData);
	    deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, PointLightData.intensities, PointLightData.defaultIntensity);
	    deleteOneItemBySwapAndReset(sourceIndex * constantDataSize, lastComponentIndex * constantDataSize, PointLightData.constants, PointLightData.defaultConstant);
	    deleteOneItemBySwapAndReset(sourceIndex * linearDataSize, lastComponentIndex * linearDataSize, PointLightData.linears, PointLightData.defaultLinear);
	    deleteOneItemBySwapAndReset(sourceIndex * quadraticDataSize, lastComponentIndex * quadraticDataSize, PointLightData.quadratics, PointLightData.defaultQuadratic);
	    deleteOneItemBySwapAndReset(sourceIndex * rangeDataSize, lastComponentIndex * rangeDataSize, PointLightData.ranges, PointLightData.defaultRange);
	};
	var initData$32 = function (PointLightData$$1) {
	    var count = getPointLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (getColorDataSize$4() + getIntensityDataSize$1() + getConstantDataSize() + getLinearDataSize() + getQuadraticDataSize() + getRangeDataSize()), buffer = null;
	    buffer = createSharedArrayBufferOrArrayBuffer(count * size);
	    initData$30(buffer, PointLightData$$1);
	    createTypeArrays$7(buffer, count, PointLightData$$1);
	    PointLightData$$1.defaultIntensity = 1;
	    PointLightData$$1.defaultConstant = 1;
	    PointLightData$$1.defaultLinear = 0;
	    PointLightData$$1.defaultQuadratic = 0;
	    PointLightData$$1.defaultRange = 60000;
	    _setDefaultTypeArrData$5(count, PointLightData$$1);
	    PointLightData$$1.lightGLSLDataStructureMemberNameArr = [
	        {
	            position: "u_pointLights[0].position",
	            color: "u_pointLights[0].color",
	            intensity: "u_pointLights[0].intensity",
	            constant: "u_pointLights[0].constant",
	            linear: "u_pointLights[0].linear",
	            quadratic: "u_pointLights[0].quadratic",
	            range: "u_pointLights[0].range"
	        }, {
	            position: "u_pointLights[1].position",
	            color: "u_pointLights[1].color",
	            intensity: "u_pointLights[1].intensity",
	            constant: "u_pointLights[1].constant",
	            linear: "u_pointLights[1].linear",
	            quadratic: "u_pointLights[1].quadratic",
	            range: "u_pointLights[1].range"
	        }, {
	            position: "u_pointLights[2].position",
	            color: "u_pointLights[2].color",
	            intensity: "u_pointLights[2].intensity",
	            constant: "u_pointLights[2].constant",
	            linear: "u_pointLights[2].linear",
	            quadratic: "u_pointLights[2].quadratic",
	            range: "u_pointLights[2].range"
	        }, {
	            position: "u_pointLights[3].position",
	            color: "u_pointLights[3].color",
	            intensity: "u_pointLights[3].intensity",
	            constant: "u_pointLights[3].constant",
	            linear: "u_pointLights[3].linear",
	            quadratic: "u_pointLights[3].quadratic",
	            range: "u_pointLights[3].range"
	        }
	    ];
	};
	var _setDefaultTypeArrData$5 = function (count, PointLightData$$1) {
	    var color = createDefaultColor$1(), intensity = PointLightData$$1.defaultIntensity, constant = PointLightData$$1.defaultConstant, linear = PointLightData$$1.defaultLinear, quadratic = PointLightData$$1.defaultQuadratic, range = PointLightData$$1.defaultRange;
	    for (var i = 0; i < count; i++) {
	        setColor$4(i, color, PointLightData$$1);
	        setIntensity$1(i, intensity, PointLightData$$1);
	        setConstant(i, constant, PointLightData$$1);
	        setLinear(i, linear, PointLightData$$1);
	        setQuadratic(i, quadratic, PointLightData$$1);
	        setRange(i, range, PointLightData$$1);
	    }
	};

	var create$7 = function (ShaderData) {
	    ShaderData.count += 1;
	};
	var init$5 = null;
	var sendAttributeData$$1 = null;
	var sendUniformData$$1 = null;
	var bindIndexBuffer$$1 = null;
	var use$$1 = null;
	if (!isSupportRenderWorkerAndSharedArrayBuffer()) {
	    init$5 = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderDataMap) {
	        return init$6(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
	    };
	    var _buildInitShaderFuncDataMap = function () {
	        return {
	            buildGLSLSource: buildGLSLSource$1,
	            getGL: getGL$$1,
	            getMapCount: getMapCount$1,
	            hasSpecularMap: hasSpecularMap,
	            hasDiffuseMap: hasDiffuseMap
	        };
	    };
	    sendAttributeData$$1 = function (gl, shaderIndex, program, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData) { return sendAttributeData$1(gl, shaderIndex, program, geometryIndex, {
	        getVertices: getVertices,
	        getNormals: getNormals,
	        getTexCoords: getTexCoords
	    }, getAttribLocation$1, isAttributeLocationNotExist$1, sendBuffer$1, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData); };
	    sendUniformData$$1 = function (gl, shaderIndex, program, mapCount, drawDataMap, renderCommandUniformData) {
	        sendUniformData$1(gl, shaderIndex, program, mapCount, _buildSendUniformDataDataMap(drawDataMap), drawDataMap, renderCommandUniformData);
	    };
	    var _buildSendUniformDataDataMap = function (drawDataMap) {
	        return {
	            glslSenderData: {
	                getUniformData: getUniformData$1,
	                sendMatrix3: sendMatrix3$1,
	                sendMatrix4: sendMatrix4$1,
	                sendVector3: sendVector3$1,
	                sendInt: sendInt$1,
	                sendFloat1: sendFloat1$1,
	                sendFloat3: sendFloat3$1,
	                GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
	            },
	            ambientLightData: {
	                getColorArr3: getColorArr3$2,
	                AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
	            },
	            directionLightData: {
	                getPosition: function (index) {
	                    return getPosition$2(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
	                },
	                getColorArr3: getColorArr3$4,
	                getIntensity: getIntensity$$1,
	                DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
	            },
	            pointLightData: {
	                getPosition: function (index) {
	                    return getPosition$3(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
	                },
	                getColorArr3: getColorArr3$6,
	                getIntensity: getIntensity$2,
	                getConstant: getConstant$$1,
	                getLinear: getLinear$$1,
	                getQuadratic: getQuadratic$$1,
	                getRange: getRange$$1,
	                PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
	            }
	        };
	    };
	    bindIndexBuffer$$1 = function (gl, geometryIndex, ProgramData, GeometryData, IndexBufferData) {
	        bindIndexBuffer$1(gl, geometryIndex, getIndices, ProgramData, GeometryData, IndexBufferData);
	    };
	    use$$1 = use$1;
	}
	var initData$10 = function (ShaderData) {
	    ShaderData.index = 0;
	    ShaderData.count = 0;
	    ShaderData.shaderLibWholeNameMap = createMap();
	};

	var material_config = {
	    "materials": {
	        "BasicMaterial": {
	            "shader": {
	                "shaderLib": [
	                    { "type": "group", "value": "engineMaterialTop" },
	                    "BasicMaterialColorShaderLib",
	                    "BasicShaderLib",
	                    {
	                        "type": "branch",
	                        "branch": function (materialIndex, _a, _b) {
	                            var getMapCount = _a.getMapCount;
	                            var MapManagerDataFromSystem = _b.MapManagerDataFromSystem;
	                            if (getMapCount(materialIndex, MapManagerDataFromSystem) === 1) {
	                                return "BasicMapShaderLib";
	                            }
	                        }
	                    },
	                    "BasicEndShaderLib",
	                    { "type": "group", "value": "engineMaterialEnd" }
	                ]
	            }
	        },
	        "LightMaterial": {
	            "shader": {
	                "shaderLib": [
	                    { "type": "group", "value": "engineMaterialTop" },
	                    "NormalMatrixNoInstanceShaderLib",
	                    "NormalCommonShaderLib",
	                    "LightCommonShaderLib",
	                    "LightSetWorldPositionShaderLib",
	                    {
	                        "type": "branch",
	                        "branch": function (materialIndex, _a, _b) {
	                            var hasDiffuseMap = _a.hasDiffuseMap, hasSpecularMap = _a.hasSpecularMap;
	                            var LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
	                            if (hasDiffuseMap(LightMaterialDataFromSystem)
	                                || hasSpecularMap(LightMaterialDataFromSystem)) {
	                                return "CommonLightMapShaderLib";
	                            }
	                        }
	                    },
	                    {
	                        "type": "branch",
	                        "branch": function (materialIndex, _a, _b) {
	                            var hasDiffuseMap = _a.hasDiffuseMap;
	                            var LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
	                            if (hasDiffuseMap(LightMaterialDataFromSystem)) {
	                                return "DiffuseMapShaderLib";
	                            }
	                            return "NoDiffuseMapShaderLib";
	                        }
	                    },
	                    {
	                        "type": "branch",
	                        "branch": function (materialIndex, _a, _b) {
	                            var hasSpecularMap = _a.hasSpecularMap;
	                            var LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
	                            if (hasSpecularMap(LightMaterialDataFromSystem)) {
	                                return "SpecularMapShaderLib";
	                            }
	                            return "NoSpecularMapShaderLib";
	                        }
	                    },
	                    "NoLightMapShaderLib",
	                    "NoEmissionMapShaderLib",
	                    "NoNormalMapShaderLib",
	                    "NoShadowMapShaderLib",
	                    "LightShaderLib",
	                    "AmbientLightShaderLib",
	                    "DirectionLightShaderLib",
	                    "PointLightShaderLib",
	                    "LightEndShaderLib",
	                    { "type": "group", "value": "engineMaterialEnd" }
	                ]
	            }
	        }
	    },
	    "shaderLibGroups": {
	        "engineMaterialTop": [
	            "CommonShaderLib",
	            "ModelMatrixNoInstanceShaderLib",
	            "VerticeCommonShaderLib"
	        ],
	        "engineMaterialEnd": [
	            "EndShaderLib"
	        ]
	    }
	};

	var _lightDefineList = [
	    {
	        "name": "DIRECTION_LIGHTS_COUNT",
	        "valueFunc": function (_a) {
	            var DirectionLightDataFromSystem = _a.DirectionLightDataFromSystem;
	            return DirectionLightDataFromSystem.count;
	        }
	    },
	    {
	        "name": "POINT_LIGHTS_COUNT",
	        "valueFunc": function (_a) {
	            var PointLightDataFromSystem = _a.PointLightDataFromSystem;
	            return PointLightDataFromSystem.count;
	        }
	    }
	];
	var shaderLib_generator = {
	    "shaderLibs": {
	        "CommonShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": common_vertex,
	                    "define": common_define.define + common_vertex.define,
	                    "funcDefine": common_function.funcDefine + common_vertex.funcDefine
	                },
	                "fs": {
	                    "source": common_fragment,
	                    "define": common_define.define + common_fragment.define,
	                    "funcDefine": common_function.funcDefine + common_fragment.funcDefine
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_vMatrix",
	                        "field": "vMatrix",
	                        "type": "mat4"
	                    },
	                    {
	                        "name": "u_pMatrix",
	                        "field": "pMatrix",
	                        "type": "mat4"
	                    }
	                ]
	            }
	        },
	        "ModelMatrixNoInstanceShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": modelMatrix_noInstance_vertex,
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_mMatrix",
	                        "field": "mMatrix",
	                        "type": "mat4"
	                    }
	                ]
	            }
	        },
	        "VerticeCommonShaderLib": {
	            "send": {
	                "attribute": [
	                    {
	                        "name": "a_position",
	                        "buffer": "vertex",
	                        "type": "vec3"
	                    }
	                ]
	            }
	        },
	        "BasicMaterialColorShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": basic_materialColor_fragment
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_color",
	                        "from": "basicMaterial",
	                        "field": "color",
	                        "type": "float3"
	                    }
	                ]
	            }
	        },
	        "BasicShaderLib": {
	            "glsl": {
	                "vs": {
	                    "body": setPos_mvp
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_opacity",
	                        "from": "basicMaterial",
	                        "field": "opacity",
	                        "type": "float"
	                    }
	                ]
	            }
	        },
	        "BasicEndShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": end_basic_fragment
	                },
	                "func": function (materialIndex, _a, _b) {
	                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
	                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
	                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
	                    if (isTestAlpha(alphaTest)) {
	                        return {
	                            "fs": {
	                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + end_basic_fragment.body
	                            }
	                        };
	                    }
	                    return void 0;
	                }
	            }
	        },
	        "BasicMapShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": map_forBasic_vertex
	                },
	                "fs": {
	                    "source": map_forBasic_fragment
	                }
	            },
	            "send": {
	                "attribute": [
	                    {
	                        "name": "a_texCoord",
	                        "buffer": "texCoord",
	                        "type": "vec2"
	                    }
	                ],
	                "uniformDefine": [
	                    {
	                        "name": "u_sampler2D0",
	                        "type": "sampler2D"
	                    }
	                ]
	            }
	        },
	        "NormalMatrixNoInstanceShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": normalMatrix_noInstance_vertex
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_normalMatrix",
	                        "field": "normalMatrix",
	                        "type": "mat3"
	                    }
	                ]
	            }
	        },
	        "NormalCommonShaderLib": {
	            "send": {
	                "attribute": [
	                    {
	                        "name": "a_normal",
	                        "buffer": "normal",
	                        "type": "vec3"
	                    }
	                ]
	            }
	        },
	        "LightCommonShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": lightCommon_vertex,
	                    "funcDeclare": light_common.funcDeclare,
	                    "funcDefine": light_common.funcDefine
	                },
	                "fs": {
	                    "source": lightCommon_fragment,
	                    "funcDeclare": light_common.funcDeclare,
	                    "funcDefine": light_common.funcDefine
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_specular",
	                        "from": "lightMaterial",
	                        "field": "specularColor",
	                        "type": "float3"
	                    }
	                ]
	            }
	        },
	        "LightSetWorldPositionShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": light_setWorldPosition_vertex
	                }
	            }
	        },
	        "CommonLightMapShaderLib": {
	            "send": {
	                "attribute": [
	                    {
	                        "name": "a_texCoord",
	                        "buffer": "texCoord",
	                        "type": "vec2"
	                    }
	                ]
	            }
	        },
	        "DiffuseMapShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": diffuseMap_vertex
	                },
	                "fs": {
	                    "source": diffuseMap_fragment
	                }
	            },
	            "send": {
	                "uniformDefine": [
	                    {
	                        "name": "u_diffuseMapSampler",
	                        "type": "sampler2D"
	                    }
	                ]
	            }
	        },
	        "NoDiffuseMapShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": noDiffuseMap_fragment
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_diffuse",
	                        "from": "lightMaterial",
	                        "field": "color",
	                        "type": "float3"
	                    }
	                ]
	            }
	        },
	        "SpecularMapShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": specularMap_vertex
	                },
	                "fs": {
	                    "source": specularMap_fragment
	                }
	            },
	            "send": {
	                "uniformDefine": [
	                    {
	                        "name": "u_specularMapSampler",
	                        "type": "sampler2D"
	                    }
	                ]
	            }
	        },
	        "NoSpecularMapShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": noSpecularMap_fragment
	                }
	            }
	        },
	        "NoLightMapShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": noLightMap_fragment
	                }
	            }
	        },
	        "NoEmissionMapShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": noEmissionMap_fragment
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_emission",
	                        "from": "lightMaterial",
	                        "field": "emissionColor",
	                        "type": "float3"
	                    }
	                ]
	            }
	        },
	        "NoNormalMapShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": noNormalMap_vertex
	                },
	                "fs": {
	                    "source": noNormalMap_fragment,
	                    "varDeclare": noNormalMap_light_fragment.varDeclare,
	                    "funcDefine": noNormalMap_fragment.funcDefine + noNormalMap_light_fragment.funcDefine
	                }
	            }
	        },
	        "NoShadowMapShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": noShadowMap_fragment
	                }
	            }
	        },
	        "LightShaderLib": {
	            "glsl": {
	                "vs": {
	                    "source": light_vertex,
	                    "defineList": _lightDefineList
	                },
	                "fs": {
	                    "source": light_fragment,
	                    "defineList": _lightDefineList
	                }
	            },
	            "send": {
	                "uniform": [
	                    {
	                        "name": "u_shininess",
	                        "from": "lightMaterial",
	                        "field": "shininess",
	                        "type": "float"
	                    },
	                    {
	                        "name": "u_opacity",
	                        "from": "lightMaterial",
	                        "field": "opacity",
	                        "type": "float"
	                    },
	                    {
	                        "name": "u_lightModel",
	                        "from": "lightMaterial",
	                        "field": "lightModel",
	                        "type": "int"
	                    },
	                    {
	                        "name": "u_cameraPos",
	                        "from": "cmd",
	                        "field": "cameraPosition",
	                        "type": "float3"
	                    }
	                ]
	            }
	        },
	        "AmbientLightShaderLib": {
	            "glsl": {
	                "fs": {
	                    "varDeclare": "uniform vec3 u_ambient;"
	                }
	            },
	            "send": {
	                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
	                    var sendFloat3 = _a.glslSenderData.sendFloat3, _b = _a.ambientLightData, getColorArr3 = _b.getColorArr3, AmbientLightDataFromSystem = _b.AmbientLightDataFromSystem;
	                    for (var i = 0, count = AmbientLightDataFromSystem.count; i < count; i++) {
	                        sendFloat3(gl, shaderIndex, program, "u_ambient", getColorArr3(i, AmbientLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                    }
	                }
	            }
	        },
	        "PointLightShaderLib": {
	            "send": {
	                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
	                    var _b = _a.glslSenderData, sendFloat1 = _b.sendFloat1, sendFloat3 = _b.sendFloat3, _c = _a.pointLightData, getColorArr3 = _c.getColorArr3, getIntensity = _c.getIntensity, getConstant = _c.getConstant, getLinear = _c.getLinear, getQuadratic = _c.getQuadratic, getRange = _c.getRange, getPosition = _c.getPosition, PointLightDataFromSystem = _c.PointLightDataFromSystem;
	                    for (var i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
	                        sendFloat3(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].position, getPosition(i), uniformCacheMap, uniformLocationMap);
	                        sendFloat3(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].color, getColorArr3(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].intensity, getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].constant, getConstant(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].linear, getLinear(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].quadratic, getQuadratic(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                        sendFloat1(gl, shaderIndex, program, PointLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].range, getRange(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                    }
	                }
	            }
	        },
	        "DirectionLightShaderLib": {
	            "send": {
	                "uniformFunc": function (gl, shaderIndex, program, _a, uniformLocationMap, uniformCacheMap) {
	                    var _b = _a.glslSenderData, sendFloat1 = _b.sendFloat1, sendFloat3 = _b.sendFloat3, _c = _a.directionLightData, getColorArr3 = _c.getColorArr3, getIntensity = _c.getIntensity, getPosition = _c.getPosition, DirectionLightDataFromSystem = _c.DirectionLightDataFromSystem;
	                    for (var i = 0, count = DirectionLightDataFromSystem.count; i < count; i++) {
	                        sendFloat3(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].position, getPosition(i), uniformCacheMap, uniformLocationMap);
	                        sendFloat3(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].color, getColorArr3(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                        sendFloat1(gl, shaderIndex, program, DirectionLightDataFromSystem.lightGLSLDataStructureMemberNameArr[i].intensity, getIntensity(i, DirectionLightDataFromSystem), uniformCacheMap, uniformLocationMap);
	                    }
	                }
	            }
	        },
	        "LightEndShaderLib": {
	            "glsl": {
	                "fs": {
	                    "source": lightEnd_fragment
	                },
	                "func": function (materialIndex, _a, _b) {
	                    var getAlphaTest = _a.getAlphaTest, isTestAlpha = _a.isTestAlpha;
	                    var MaterialDataFromSystem = _b.MaterialDataFromSystem;
	                    var alphaTest = getAlphaTest(materialIndex, MaterialDataFromSystem);
	                    if (isTestAlpha(alphaTest)) {
	                        return {
	                            "fs": {
	                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n" + lightEnd_fragment.body
	                            }
	                        };
	                    }
	                    return void 0;
	                }
	            }
	        },
	        "EndShaderLib": {}
	    }
	};

	var ProgramData = (function () {
	    function ProgramData() {
	    }
	    ProgramData.programMap = null;
	    ProgramData.lastUsedProgram = null;
	    ProgramData.lastBindedArrayBuffer = null;
	    ProgramData.lastBindedIndexBuffer = null;
	    return ProgramData;
	}());

	var LocationData = (function () {
	    function LocationData() {
	    }
	    LocationData.attributeLocationMap = null;
	    LocationData.uniformLocationMap = null;
	    return LocationData;
	}());

	var GLSLSenderData = (function () {
	    function GLSLSenderData() {
	    }
	    GLSLSenderData.uniformCacheMap = null;
	    GLSLSenderData.sendAttributeConfigMap = null;
	    GLSLSenderData.sendUniformConfigMap = null;
	    GLSLSenderData.sendUniformFuncConfigMap = null;
	    GLSLSenderData.vertexAttribHistory = null;
	    return GLSLSenderData;
	}());

	var BasicMaterialData = (function (_super) {
	    __extends(BasicMaterialData, _super);
	    function BasicMaterialData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return BasicMaterialData;
	}(SpecifyMaterialData));

	var BasicMaterial = (function (_super) {
	    __extends(BasicMaterial, _super);
	    function BasicMaterial() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BasicMaterial = __decorate([
	        registerClass("BasicMaterial")
	    ], BasicMaterial);
	    return BasicMaterial;
	}(Material));
	var createBasicMaterial = function () {
	    return create$15(ShaderData, MaterialData, BasicMaterialData);
	};
	var initBasicMaterial = function (material) {
	    initMaterial$2(material.index, getState(DirectorData));
	};
	var getBasicMaterialColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getColor(material.index, MaterialData);
	});
	var setBasicMaterialColor = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, color) {
	    setColor(material.index, color, MaterialData);
	});
	var getBasicMaterialOpacity = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getOpacity$$1(material.index, MaterialData);
	});
	var setBasicMaterialOpacity = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, opacity) {
	    setOpacity(material.index, opacity, MaterialData);
	});
	var getBasicMaterialAlphaTest = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material) {
	    return getAlphaTest$$1(material.index, MaterialData);
	});
	var setBasicMaterialAlphaTest = requireCheckFunc(function (material) {
	    checkShouldAlive$1(material);
	}, function (material, alphaTest) {
	    setAlphaTest(material.index, alphaTest, MaterialData);
	});
	var addBasicMaterialMap = requireCheckFunc(function (material, map) {
	    checkShouldAlive$1(material);
	}, function (material, map) {
	    addMap$1(material.index, map, MapManagerData, TextureData);
	});

	var createTypeArrays$9 = function (buffer, offset, count, BasicMaterialDataFromSystem) {
	    return offset;
	};
	var getClassName$1 = function () { return "BasicMaterial"; };

	var create$15 = ensureFunc(function (component) {
	    it("index should <= max count", function () {
	        wdet_1(component.index).lt(getBasicMaterialBufferStartIndex() + getBasicMaterialBufferCount());
	    });
	}, function (ShaderData, MaterialData$$1, BasicMaterialData$$1) {
	    var material = new BasicMaterial(), index = generateComponentIndex(BasicMaterialData$$1);
	    material.index = index;
	    material = create$6(index, material, ShaderData, MaterialData$$1);
	    return material;
	});
	var initMaterial$2 = function (index, state) {
	    initMaterial$$1(index, state, getClassName$1(), MaterialData);
	};
	var addMap$1 = function (materialIndex, map, MapManagerData$$1, TextureData) {
	    var count = getMapCount$1(materialIndex, MapManagerData$$1);
	    addMap(materialIndex, map, count, "u_sampler2D" + count, MapManagerData$$1, TextureData);
	};
	var addComponent$12 = function (component, gameObject) {
	    addComponent$5(component, gameObject, MaterialData);
	};
	var disposeComponent$12 = function (component) {
	    var sourceIndex = component.index, lastComponentIndex = null;
	    BasicMaterialData.index -= 1;
	    lastComponentIndex = BasicMaterialData.index;
	    disposeComponent$5(sourceIndex, lastComponentIndex, MapManagerData, MaterialData);
	};
	var createTypeArrays$8 = function (buffer, offset, count, BasicMaterialData$$1) {
	    return createTypeArrays$9(buffer, offset, count, BasicMaterialData$$1);
	};
	var initData$33 = function (BasicMaterialData$$1) {
	    initData$25(getBasicMaterialBufferStartIndex(), BasicMaterialData$$1);
	};
	var setDefaultData$1 = function (BasicMaterialData$$1) {
	};

	var addAddComponentHandle$5 = function (BasicMaterial, LightMaterial) {
	    addAddComponentHandle$1(BasicMaterial, addComponent$12);
	    addAddComponentHandle$1(LightMaterial, addComponent$7);
	};
	var addDisposeHandle$5 = function (BasicMaterial, LightMaterial) {
	    addDisposeHandle$1(BasicMaterial, disposeComponent$12);
	    addDisposeHandle$1(LightMaterial, disposeComponent$7);
	};
	var addInitHandle$1 = function (BasicMaterial, LightMaterial) {
	    addInitHandle(BasicMaterial, initMaterial$2);
	    addInitHandle(LightMaterial, initMaterial$1);
	};
	var create$6 = function (index, material, ShaderData$$1, MaterialData$$1) {
	    MaterialData$$1.materialMap[index] = material;
	    create$7(ShaderData$$1);
	    return material;
	};
	var init$4 = function (state, gl, TextureData, MaterialData$$1, BasicMaterialData$$1, LightMaterialData$$1) {
	    _initMaterials(state, getBasicMaterialBufferStartIndex(), getClassName$1(), BasicMaterialData$$1, MaterialData$$1);
	    _initMaterials(state, getLightMaterialBufferStartIndex(), getClassName(), LightMaterialData$$1, MaterialData$$1);
	    initMapManagers(gl, TextureData);
	};
	var _initMaterials = function (state, startIndex, className, SpecifyMaterialData, MaterialData$$1) {
	    for (var i = startIndex; i < SpecifyMaterialData.index; i++) {
	        initMaterial$$1(i, state, className, MaterialData$$1);
	    }
	};
	var initMaterial$$1 = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    initMaterial$$1 = function (index, state, className, MaterialData$$1) {
	        MaterialData$$1.workerInitList.push(_buildWorkerInitData(index, className));
	    };
	    var _buildWorkerInitData = function (index, className) {
	        return {
	            index: index,
	            className: className
	        };
	    };
	}
	else {
	    initMaterial$$1 = function (index, state, className, MaterialData$$1) {
	        var shaderIndex = init$5(state, index, className, material_config, shaderLib_generator, buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData$$1, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData));
	        setShaderIndex(index, shaderIndex, MaterialData$$1);
	    };
	}
	var clearWorkerInitList = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    clearWorkerInitList = function (MaterialData$$1) {
	        MaterialData$$1.workerInitList = [];
	    };
	}
	else {
	    clearWorkerInitList = function (MaterialData$$1) {
	    };
	}
	var hasNewInitedMaterial = function (MaterialData$$1) {
	    return MaterialData$$1.workerInitList.length > 0;
	};
	var getShaderIndex = function (materialIndex, MaterialData$$1) {
	    return MaterialData$$1.shaderIndices[materialIndex];
	};
	var getColor = function (materialIndex, MaterialData$$1) {
	    return getColor3Data(materialIndex, MaterialData$$1.colors);
	};
	var getColorArr3$$1 = getColorArr3$1;
	var setColor = function (materialIndex, color, MaterialData$$1) {
	    setColorData(materialIndex, color, MaterialData$$1.colors);
	};
	var setColorData = function (materialIndex, color, colors) {
	    setColor3Data(materialIndex, color, colors);
	};
	var getOpacity$$1 = getOpacity$1;
	var setOpacity = requireCheckFunc(function (materialIndex, opacity, MaterialData$$1) {
	    it("opacity should be number", function () {
	        wdet_1(opacity).be.a("number");
	    });
	    it("opacity should <= 1 && >= 0", function () {
	        wdet_1(opacity).lte(1);
	        wdet_1(opacity).gte(0);
	    });
	}, function (materialIndex, opacity, MaterialData$$1) {
	    var size = getOpacityDataSize(), index = materialIndex * size;
	    setTypeArrayValue(MaterialData$$1.opacities, index, opacity);
	});
	var getAlphaTest$$1 = getAlphaTest$1;
	var setAlphaTest = requireCheckFunc(function (materialIndex, alphaTest, MaterialData$$1) {
	    it("alphaTest should be number", function () {
	        wdet_1(alphaTest).be.a("number");
	    });
	}, function (materialIndex, alphaTest, MaterialData$$1) {
	    var size = getAlphaTestDataSize(), index = materialIndex * size;
	    setTypeArrayValue(MaterialData$$1.alphaTests, index, alphaTest);
	});
	var addComponent$5 = function (component, gameObject, MaterialData$$1) {
	    addComponentToGameObjectMap(MaterialData$$1.gameObjectMap, component.index, gameObject);
	};
	var disposeComponent$5 = requireCheckFunc(function (sourceIndex, lastComponentIndex, MapManagerData$$1, MaterialData$$1) {
	    _checkDisposeComponentWorker(sourceIndex);
	}, function (sourceIndex, lastComponentIndex, MapManagerData$$1, MaterialData$$1) {
	    var colorDataSize = getColorDataSize(), opacityDataSize = getOpacityDataSize(), alphaTestDataSize = getAlphaTestDataSize();
	    deleteBySwapAndNotReset(sourceIndex, lastComponentIndex, MaterialData$$1.shaderIndices);
	    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, MaterialData$$1.colors, colorDataSize, MaterialData$$1.defaultColorArr);
	    deleteOneItemBySwapAndReset(sourceIndex * opacityDataSize, lastComponentIndex * opacityDataSize, MaterialData$$1.opacities, MaterialData$$1.defaultOpacity);
	    deleteOneItemBySwapAndReset(sourceIndex * alphaTestDataSize, lastComponentIndex * alphaTestDataSize, MaterialData$$1.alphaTests, MaterialData$$1.defaultAlphaTest);
	    deleteBySwap$1(sourceIndex, lastComponentIndex, MaterialData$$1.gameObjectMap);
	    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, MaterialData$$1.materialMap);
	    dispose$3(sourceIndex, lastComponentIndex, MapManagerData$$1);
	});
	var _checkDisposeComponentWorker = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    _checkDisposeComponentWorker = function (materialIndex) {
	        it("should not dispose the material which is inited in the same frame", function () {
	            for (var _i = 0, _a = MaterialData.workerInitList; _i < _a.length; _i++) {
	                var index = _a[_i].index;
	                wdet_1(materialIndex).not.equal(index);
	            }
	        });
	    };
	}
	else {
	    _checkDisposeComponentWorker = function (index) { };
	}
	var getGameObject$4 = function (index, MaterialData$$1) {
	    return getComponentGameObject(MaterialData$$1.gameObjectMap, index);
	};
	var isTestAlpha$$1 = isTestAlpha$1;
	var createDefaultColor = function () {
	    var color = Color.create();
	    return color.setColorByNum("#ffffff");
	};
	var initData$9 = function (TextureCacheData, TextureData, MapManagerData$$1, MaterialData$$1, BasicMaterialData$$1, LightMaterialData$$1) {
	    MaterialData$$1.materialMap = [];
	    MaterialData$$1.gameObjectMap = [];
	    MaterialData$$1.workerInitList = [];
	    _setMaterialDefaultData(MaterialData$$1);
	    initData$33(BasicMaterialData$$1);
	    setDefaultData$1(BasicMaterialData$$1);
	    initData$24(LightMaterialData$$1);
	    setDefaultData(LightMaterialData$$1);
	    _initBufferData$1(MaterialData$$1, BasicMaterialData$$1, LightMaterialData$$1);
	    initData$26(TextureCacheData, TextureData, MapManagerData$$1);
	};
	var _setMaterialDefaultData = function (MaterialData$$1) {
	    MaterialData$$1.defaultShaderIndex = 0;
	    MaterialData$$1.defaultColorArr = createDefaultColor().toVector3().toArray();
	    MaterialData$$1.defaultOpacity = 1;
	    MaterialData$$1.defaultAlphaTest = -1;
	};
	var _initBufferData$1 = function (MaterialData$$1, BasicMaterialData$$1, LightMaterialData$$1) {
	    var buffer = null, count = getBufferTotalCount(), offset = null;
	    buffer = createSharedArrayBufferOrArrayBuffer(getBufferLength());
	    offset = createTypeArrays(buffer, count, MaterialData$$1);
	    _setMaterialDefaultTypeArrData(count, MaterialData$$1);
	    offset = createTypeArrays$8(buffer, offset, getBasicMaterialBufferCount(), BasicMaterialData$$1);
	    offset = createTypeArrays$4(buffer, offset, getLightMaterialBufferCount(), LightMaterialData$$1);
	    MaterialData$$1.buffer = buffer;
	};
	var _setMaterialDefaultTypeArrData = function (count, MaterialData$$1) {
	    var shaderIndex = MaterialData$$1.defaultShaderIndex, color = createDefaultColor(), opacity = MaterialData$$1.defaultOpacity, alphaTest = MaterialData$$1.defaultAlphaTest;
	    for (var i = 0; i < count; i++) {
	        setShaderIndex(i, shaderIndex, MaterialData$$1);
	        setColor(i, color, MaterialData$$1);
	        setOpacity(i, opacity, MaterialData$$1);
	        setAlphaTest(i, alphaTest, MaterialData$$1);
	    }
	};

	var createTypeArrays$10 = function (buffer, DataBufferConfig, RenderCommandBufferDataFromSystem) {
	    var mat3Length = getMatrix3DataSize(), mat4Length = getMatrix4DataSize(), cameraPositionLength = getVector3DataSize(), count = DataBufferConfig.renderCommandBufferCount, offset = 0;
	    RenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, offset, count * mat4Length);
	    offset += count * Float32Array.BYTES_PER_ELEMENT * mat4Length;
	    RenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, offset, count);
	    offset += count * Uint32Array.BYTES_PER_ELEMENT;
	    RenderCommandBufferDataFromSystem.shaderIndices = new Uint32Array(buffer, offset, count);
	    offset += count * Uint32Array.BYTES_PER_ELEMENT;
	    RenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, offset, count);
	    offset += count * Uint32Array.BYTES_PER_ELEMENT;
	    RenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, offset, mat4Length);
	    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;
	    RenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, offset, mat4Length);
	    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;
	    RenderCommandBufferDataFromSystem.cameraPositions = new Float32Array(buffer, offset, cameraPositionLength);
	    offset += Float32Array.BYTES_PER_ELEMENT * cameraPositionLength;
	    RenderCommandBufferDataFromSystem.normalMatrices = new Float32Array(buffer, offset, mat3Length);
	    offset += Float32Array.BYTES_PER_ELEMENT * mat3Length;
	};

	var createRenderCommandBufferData = curry(requireCheckFunc(function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
	    it("renderGameObjectArray.length should not exceed RenderCommandBufferData->buffer's count", function () {
	        wdet_1(renderGameObjectArray.length).lte(DataBufferConfig.renderCommandBufferCount);
	    });
	}, function (state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData, renderGameObjectArray) {
	    var count = renderGameObjectArray.length, buffer = RenderCommandBufferData.buffer, mMatrices = RenderCommandBufferData.mMatrices, vMatrices = RenderCommandBufferData.vMatrices, pMatrices = RenderCommandBufferData.pMatrices, cameraPositions = RenderCommandBufferData.cameraPositions, normalMatrices = RenderCommandBufferData.normalMatrices, materialIndices = RenderCommandBufferData.materialIndices, shaderIndices = RenderCommandBufferData.shaderIndices, geometryIndices = RenderCommandBufferData.geometryIndices, currentCamera = getCurrentCamera(SceneData), currentCameraComponent = getComponent(currentCamera, getComponentIDFromClass(CameraController), GameObjectData), currentCameraIndex = currentCameraComponent.index, currentCameraTransform = getTransform(currentCamera, GameObjectData), mat4Length = getMatrix4DataSize();
	    setMatrices(vMatrices, getWorldToCameraMatrix$1(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData), 0);
	    setMatrices(pMatrices, getPMatrix$1(currentCameraIndex, CameraData), 0);
	    setVectors(cameraPositions, getPosition(currentCameraTransform, ThreeDTransformData), 0);
	    setMatrices3(normalMatrices, getNormalMatrix(currentCameraTransform, GlobalTempData, ThreeDTransformData), 0);
	    for (var i = 0; i < count; i++) {
	        var matIndex = mat4Length * i, gameObject = renderGameObjectArray[i], geometry = getGeometry(gameObject, GameObjectData), material = getMaterial(gameObject, GameObjectData), transform = getTransform(gameObject, GameObjectData), materialIndex = material.index, shaderIndex = getShaderIndex(materialIndex, MaterialData);
	        setMatrices(mMatrices, getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData), matIndex);
	        materialIndices[i] = materialIndex;
	        shaderIndices[i] = shaderIndex;
	        geometryIndices[i] = geometry.index;
	    }
	    return {
	        buffer: buffer,
	        count: count
	    };
	}), 11);
	var initData$7 = function (DataBufferConfig$$1, RenderCommandBufferData) {
	    var mat3Length = getMatrix3DataSize(), mat4Length = getMatrix4DataSize(), cameraPositionLength = getVector3DataSize(), size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3, buffer = null, count = DataBufferConfig$$1.renderCommandBufferCount;
	    buffer = createSharedArrayBufferOrArrayBuffer(count * size + Float32Array.BYTES_PER_ELEMENT * (mat3Length + mat4Length * 2 + cameraPositionLength));
	    createTypeArrays$10(buffer, DataBufferConfig$$1, RenderCommandBufferData);
	    RenderCommandBufferData.buffer = buffer;
	};

	(function (EWorkerOperateType) {
	    EWorkerOperateType[EWorkerOperateType["INIT_CONFIG"] = 0] = "INIT_CONFIG";
	    EWorkerOperateType[EWorkerOperateType["INIT_GL"] = 1] = "INIT_GL";
	    EWorkerOperateType[EWorkerOperateType["INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE"] = 2] = "INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE";
	    EWorkerOperateType[EWorkerOperateType["DRAW"] = 3] = "DRAW";
	})(exports.EWorkerOperateType || (exports.EWorkerOperateType = {}));

	(function (EGeometryWorkerDataOperateType) {
	    EGeometryWorkerDataOperateType[EGeometryWorkerDataOperateType["ADD"] = 0] = "ADD";
	    EGeometryWorkerDataOperateType[EGeometryWorkerDataOperateType["RESET"] = 1] = "RESET";
	})(exports.EGeometryWorkerDataOperateType || (exports.EGeometryWorkerDataOperateType = {}));

	var getRenderWorker = function (WorkerInstanceData) {
	    return WorkerInstanceData.renderWorker;
	};
	var setRenderWorker = function (worker, WorkerInstanceData) {
	    WorkerInstanceData.renderWorker = worker;
	};
	var createWorker = function (workerFilePath) {
	    return new Worker(workerFilePath);
	};
	var initWorkInstances = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    initWorkInstances = function (WorkerInstanceData) {
	        setRenderWorker(createWorker(getRenderWorkerFilePath()), WorkerInstanceData);
	    };
	}
	else {
	    initWorkInstances = function (WorkerInstanceData) {
	    };
	}

	(function (ERenderWorkerState) {
	    ERenderWorkerState[ERenderWorkerState["DEFAULT"] = 0] = "DEFAULT";
	    ERenderWorkerState[ERenderWorkerState["INIT_COMPLETE"] = 1] = "INIT_COMPLETE";
	    ERenderWorkerState[ERenderWorkerState["DRAW_WAIT"] = 2] = "DRAW_WAIT";
	    ERenderWorkerState[ERenderWorkerState["DRAW_COMPLETE"] = 3] = "DRAW_COMPLETE";
	})(exports.ERenderWorkerState || (exports.ERenderWorkerState = {}));

	var sendDrawData = curry(function (WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData, data) {
	    var geometryData = null, geometryDisposeData = null, textureDisposeData = null, materialData = null, lightData = null;
	    if (hasNewPointData(GeometryData)) {
	        geometryData = {
	            buffer: GeometryData.buffer,
	            type: exports.EGeometryWorkerDataOperateType.ADD,
	            verticesInfoList: GeometryData.verticesWorkerInfoList,
	            normalsInfoList: GeometryData.normalsWorkerInfoList,
	            texCoordsInfoList: GeometryData.texCoordsWorkerInfoList,
	            indicesInfoList: GeometryData.indicesWorkerInfoList
	        };
	    }
	    else if (isReallocate(GeometryData)) {
	        geometryData = {
	            buffer: GeometryData.buffer,
	            type: exports.EGeometryWorkerDataOperateType.RESET,
	            verticesInfoList: GeometryData.verticesInfoList,
	            normalsInfoList: GeometryData.normalsInfoList,
	            texCoordsInfoList: GeometryData.texCoordsInfoList,
	            indicesInfoList: GeometryData.indicesInfoList
	        };
	    }
	    if (hasDisposedGeometryIndexArrayData(GeometryData)) {
	        geometryDisposeData = {
	            disposedGeometryIndexArray: GeometryData.disposedGeometryIndexArray
	        };
	    }
	    if (hasDisposedTextureDataMap(TextureData)) {
	        textureDisposeData = {
	            disposedTextureDataMap: TextureData.disposedTextureDataMap
	        };
	    }
	    if (hasNewInitedMaterial(MaterialData)) {
	        materialData = {
	            buffer: MaterialData.buffer,
	            workerInitList: MaterialData.workerInitList
	        };
	    }
	    lightData = {
	        directionLightData: {
	            positionArr: getAllPositionData(ThreeDTransformData, GameObjectData, DirectionLightData)
	        },
	        pointLightData: {
	            positionArr: getAllPositionData$1(ThreeDTransformData, GameObjectData, PointLightData)
	        }
	    };
	    getRenderWorker(WorkerInstanceData).postMessage({
	        operateType: exports.EWorkerOperateType.DRAW,
	        renderCommandBufferData: data,
	        materialData: materialData,
	        geometryData: geometryData,
	        lightData: lightData,
	        disposeData: {
	            geometryDisposeData: geometryDisposeData,
	            textureDisposeData: textureDisposeData
	        }
	    });
	    clearWorkerInfoList(GeometryData);
	    clearDisposedGeometryIndexArray(GeometryData);
	    clearDisposedTextureDataMap(TextureData);
	    clearWorkerInitList(MaterialData);
	});
	var initData$34 = function (SendDrawRenderCommandBufferData) {
	    SendDrawRenderCommandBufferData.isInitComplete = false;
	    SendDrawRenderCommandBufferData.state = exports.ERenderWorkerState.DEFAULT;
	};

	var render_config = {
	    "clearColor": Color.create("#000000")
	};

	var SceneData = (function () {
	    function SceneData() {
	    }
	    SceneData.cameraArray = null;
	    return SceneData;
	}());

	var RenderCommandBufferData = (function () {
	    function RenderCommandBufferData() {
	    }
	    RenderCommandBufferData.buffer = null;
	    RenderCommandBufferData.mMatrices = null;
	    RenderCommandBufferData.materialIndices = null;
	    RenderCommandBufferData.shaderIndices = null;
	    RenderCommandBufferData.geometryIndices = null;
	    RenderCommandBufferData.vMatrices = null;
	    RenderCommandBufferData.pMatrices = null;
	    RenderCommandBufferData.cameraPositions = null;
	    RenderCommandBufferData.normalMatrices = null;
	    return RenderCommandBufferData;
	}());

	var SendDrawRenderCommandBufferData = (function () {
	    function SendDrawRenderCommandBufferData() {
	    }
	    SendDrawRenderCommandBufferData.state = null;
	    SendDrawRenderCommandBufferData.isInitComplete = null;
	    return SendDrawRenderCommandBufferData;
	}());

	var BufferUtilsForUnitTest = (function () {
	    function BufferUtilsForUnitTest() {
	    }
	    BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist = function (DrawRenderCommandBufferDataFromSystem) {
	        return DrawRenderCommandBufferDataFromSystem.mMatrices === null;
	    };
	    return BufferUtilsForUnitTest;
	}());

	var clear$3 = function (gl, clearGL, render_config, DeviceManagerDataFromSystem, data) {
	    clearGL(gl, render_config.clearColor, DeviceManagerDataFromSystem);
	    return data;
	};
	var buildDrawDataMap = function (DeviceManagerDataFromSystem, TextureDataFromSystem, TextureCacheDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem) {
	    return {
	        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
	        TextureDataFromSystem: TextureDataFromSystem,
	        TextureCacheDataFromSystem: TextureCacheDataFromSystem,
	        MapManagerDataFromSystem: MapManagerDataFromSystem,
	        MaterialDataFromSystem: MaterialDataFromSystem,
	        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
	        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
	        AmbientLightDataFromSystem: AmbientLightDataFromSystem,
	        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
	        PointLightDataFromSystem: PointLightDataFromSystem,
	        ProgramDataFromSystem: ProgramDataFromSystem,
	        LocationDataFromSystem: LocationDataFromSystem,
	        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
	        GeometryDataFromSystem: GeometryDataFromSystem,
	        ArrayBufferDataFromSystem: ArrayBufferDataFromSystem,
	        IndexBufferDataFromSystem: IndexBufferDataFromSystem,
	        DrawRenderCommandBufferDataFromSystem: DrawRenderCommandBufferDataFromSystem
	    };
	};
	var buildDrawFuncDataMap = function (bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount) {
	    return {
	        bindIndexBuffer: bindIndexBuffer,
	        sendAttributeData: sendAttributeData,
	        sendUniformData: sendUniformData,
	        directlySendUniformData: directlySendUniformData,
	        use: use,
	        hasIndices: hasIndices,
	        getIndicesCount: getIndicesCount,
	        getIndexType: getIndexType,
	        getIndexTypeSize: getIndexTypeSize,
	        getVerticesCount: getVerticesCount,
	        bindAndUpdate: bindAndUpdate,
	        getMapCount: getMapCount
	    };
	};
	var draw$1 = function (gl, state, DataBufferConfig, _a, drawDataMap, bufferData) {
	    var bindIndexBuffer = _a.bindIndexBuffer, sendAttributeData = _a.sendAttributeData, sendUniformData = _a.sendUniformData, directlySendUniformData = _a.directlySendUniformData, use = _a.use, hasIndices = _a.hasIndices, getIndicesCount = _a.getIndicesCount, getIndexType = _a.getIndexType, getIndexTypeSize = _a.getIndexTypeSize, getVerticesCount = _a.getVerticesCount, getMapCount = _a.getMapCount, bindAndUpdate = _a.bindAndUpdate;
	    var TextureDataFromSystem = drawDataMap.TextureDataFromSystem, TextureCacheDataFromSystem = drawDataMap.TextureCacheDataFromSystem, MapManagerDataFromSystem = drawDataMap.MapManagerDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, GeometryDataFromSystem = drawDataMap.GeometryDataFromSystem, ArrayBufferDataFromSystem = drawDataMap.ArrayBufferDataFromSystem, IndexBufferDataFromSystem = drawDataMap.IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem = drawDataMap.DrawRenderCommandBufferDataFromSystem, mat3Length = getMatrix3DataSize(), mat4Length = getMatrix4DataSize(), cameraPositionLength = getVector3DataSize(), count = bufferData.count, buffer = bufferData.buffer, mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend, vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend, pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend, cameraPositionForSend = DrawRenderCommandBufferDataFromSystem.cameraPositionForSend, normalMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend, _b = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem), mMatrices = _b.mMatrices, vMatrices = _b.vMatrices, pMatrices = _b.pMatrices, cameraPositions = _b.cameraPositions, normalMatrices = _b.normalMatrices, materialIndices = _b.materialIndices, shaderIndices = _b.shaderIndices, geometryIndices = _b.geometryIndices, program = null;
	    _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
	    _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
	    _updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
	    _updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);
	    for (var i = 0; i < count; i++) {
	        var matStartIndex = 16 * i, matEndIndex = matStartIndex + 16, shaderIndex = shaderIndices[i], geometryIndex = geometryIndices[i], materialIndex = materialIndices[i], mapCount = getMapCount(materialIndex, MapManagerDataFromSystem), drawMode = exports.EDrawMode.TRIANGLES;
	        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
	        bindAndUpdate(gl, mapCount, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem);
	        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);
	        _updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);
	        sendUniformData(gl, shaderIndex, program, mapCount, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex));
	        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
	            bindIndexBuffer(gl, geometryIndex, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem);
	            _drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
	        }
	        else {
	            _drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
	        }
	    }
	    return state;
	};
	var _drawElements = function (gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem) {
	    var startOffset = 0, count = getIndicesCount(geometryIndex, GeometryDataFromSystem), type = getIndexType(GeometryDataFromSystem), typeSize = getIndexTypeSize(GeometryDataFromSystem);
	    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
	};
	var _drawArray = function (gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem) {
	    var startOffset = 0, count = getVerticesCount(geometryIndex, GeometryDataFromSystem);
	    gl.drawArrays(gl[drawMode], startOffset, count);
	};
	var _updateSendMatrixFloat32ArrayData = function (sourceMatrices, matStartIndex, matEndIndex, targetMatrices) {
	    for (var i = matStartIndex; i < matEndIndex; i++) {
	        targetMatrices[i - matStartIndex] = sourceMatrices[i];
	    }
	    return targetMatrices;
	};
	var _buildRenderCommandUniformData = function (mMatrices, vMatrices, pMatrices, cameraPosition, normalMatrices, materialIndex) {
	    return {
	        mMatrix: mMatrices,
	        vMatrix: vMatrices,
	        pMatrix: pMatrices,
	        cameraPosition: cameraPosition,
	        normalMatrix: normalMatrices,
	        materialIndex: materialIndex
	    };
	};
	var _createTypeArraysOnlyOnce = function (buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem) {
	    if (BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
	        createTypeArrays$10(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem);
	    }
	    return DrawRenderCommandBufferDataFromSystem;
	};
	var initData$36 = function (DrawRenderCommandBufferDataFromSystem) {
	    var mat3Length = getMatrix3DataSize(), mat4Length = getMatrix4DataSize(), cameraPositionLength = getVector3DataSize();
	    DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
	    DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
	    DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
	    DrawRenderCommandBufferDataFromSystem.cameraPositionForSend = new Float32Array(cameraPositionLength);
	    DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend = new Float32Array(mat3Length);
	};

	var clear$2 = curry(function (state, render_config, DeviceManagerData, data) {
	    return clear$3(getGL$$1(DeviceManagerData, state), clear$$1, render_config, DeviceManagerData, data);
	});
	var draw$$1 = curry(function (state, DataBufferConfig, drawDataMap, bufferData) {
	    return draw$1(getGL$$1(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer$$1, sendAttributeData$$1, sendUniformData$$1, directlySendUniformData, use$$1, hasIndices$$1, getIndicesCount$$1, getIndexType$$1, getIndexTypeSize$$1, getVerticesCount$$1, bindAndUpdate$1, getMapCount$1), drawDataMap, bufferData);
	});
	var initData$35 = initData$36;

	var DrawRenderCommandBufferData = (function () {
	    function DrawRenderCommandBufferData() {
	    }
	    DrawRenderCommandBufferData.mMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferData.vMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferData.pMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferData.normalMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferData.cameraPositionForSend = null;
	    DrawRenderCommandBufferData.mMatrices = null;
	    DrawRenderCommandBufferData.materialIndices = null;
	    DrawRenderCommandBufferData.shaderIndices = null;
	    DrawRenderCommandBufferData.geometryIndices = null;
	    DrawRenderCommandBufferData.vMatrices = null;
	    DrawRenderCommandBufferData.pMatrices = null;
	    DrawRenderCommandBufferData.cameraPositions = null;
	    DrawRenderCommandBufferData.normalMatrices = null;
	    return DrawRenderCommandBufferData;
	}());

	var WorkerInstanceData = (function () {
	    function WorkerInstanceData() {
	    }
	    WorkerInstanceData.renderWorker = null;
	    return WorkerInstanceData;
	}());

	var initState = function (state, getGL, setSide, DeviceManagerDataFromSystem) {
	    var gl = getGL(DeviceManagerDataFromSystem, state);
	    setSide(gl, exports.ESide.FRONT, DeviceManagerDataFromSystem);
	};

	var init$3 = null;
	var render$1 = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    init$3 = function (state) {
	        var renderWorker = getRenderWorker(WorkerInstanceData);
	        renderWorker.postMessage({
	            operateType: exports.EWorkerOperateType.INIT_MATERIAL_GEOMETRY_LIGHT_TEXTURE,
	            materialData: {
	                buffer: MaterialData.buffer,
	                basicMaterialData: {
	                    startIndex: getBasicMaterialBufferStartIndex(),
	                    index: BasicMaterialData.index
	                },
	                lightMaterialData: {
	                    startIndex: getLightMaterialBufferStartIndex(),
	                    index: LightMaterialData.index,
	                    diffuseMapIndex: getDiffuseMapIndex(LightMaterialData),
	                    specularMapIndex: getSpecularMapIndex(LightMaterialData)
	                }
	            },
	            geometryData: {
	                buffer: GeometryData.buffer,
	                indexType: GeometryData.indexType,
	                indexTypeSize: GeometryData.indexTypeSize,
	                verticesInfoList: GeometryData.verticesInfoList,
	                normalsInfoList: GeometryData.normalsInfoList,
	                texCoordsInfoList: GeometryData.texCoordsInfoList,
	                indicesInfoList: GeometryData.indicesInfoList
	            },
	            lightData: {
	                ambientLightData: {
	                    buffer: AmbientLightData.buffer,
	                    bufferCount: getAmbientLightBufferCount(),
	                    lightCount: AmbientLightData.count
	                },
	                directionLightData: {
	                    buffer: DirectionLightData.buffer,
	                    bufferCount: getDirectionLightBufferCount(),
	                    lightCount: DirectionLightData.count,
	                    directionLightGLSLDataStructureMemberNameArr: DirectionLightData.lightGLSLDataStructureMemberNameArr
	                },
	                pointLightData: {
	                    buffer: PointLightData.buffer,
	                    bufferCount: getPointLightBufferCount(),
	                    lightCount: PointLightData.count,
	                    pointLightGLSLDataStructureMemberNameArr: PointLightData.lightGLSLDataStructureMemberNameArr
	                }
	            },
	            textureData: {
	                mapManagerBuffer: MapManagerData.buffer,
	                textureBuffer: TextureData.buffer,
	                index: TextureData.index,
	                imageSrcIndexArr: convertSourceMapToSrcIndexArr(TextureData),
	                uniformSamplerNameMap: getUniformSamplerNameMap(TextureData)
	            }
	        });
	        renderWorker.onmessage = function (e) {
	            var data = e.data, state = data.state;
	            SendDrawRenderCommandBufferData.state = state;
	        };
	        return state;
	    };
	    render$1 = function (state) {
	        return compose(sendDrawData(WorkerInstanceData, TextureData, MaterialData, GeometryData, ThreeDTransformData, GameObjectData, AmbientLightData, DirectionLightData), createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData), getRenderList(state))(MeshRendererData);
	    };
	}
	else {
	    init$3 = function (state) {
	        initState(state, getGL$$1, setSide$$1, DeviceManagerData);
	        init$4(state, getGL$$1(DeviceManagerData, state), TextureData, MaterialData, BasicMaterialData, LightMaterialData);
	    };
	    render$1 = function (state) {
	        return compose(draw$$1(null, DataBufferConfig, buildDrawDataMap(DeviceManagerData, TextureData, TextureCacheData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, AmbientLightData, DirectionLightData, PointLightData, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData, IndexBufferData, DrawRenderCommandBufferData)), clear$2(null, render_config, DeviceManagerData), createRenderCommandBufferData(state, GlobalTempData, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, RenderCommandBufferData), getRenderList(state))(MeshRendererData);
	    };
	}

	var getState = function (DirectorData) {
	    return DirectorData.state;
	};
	var setState = function (state, DirectorData) {
	    return IO.of(function () {
	        DirectorData.state = state;
	    });
	};
	var run = null;
	var render$$1 = null;
	var _sync = function (elapsed, state, scheduler) {
	    scheduler.update(elapsed);
	    var resultState = updateSystem(elapsed, state);
	    return resultState;
	};
	var updateSystem = function (elapsed, state) {
	    var resultState = update$1(elapsed, GlobalTempData, ThreeDTransformData, state);
	    resultState = update(PerspectiveCameraData, CameraData, CameraControllerData);
	    return resultState;
	};
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    run = function (elapsed, state, timeController, scheduler) {
	        var resultState = state;
	        if (SendDrawRenderCommandBufferData.state === exports.ERenderWorkerState.INIT_COMPLETE) {
	            SendDrawRenderCommandBufferData.isInitComplete = true;
	            SendDrawRenderCommandBufferData.state = exports.ERenderWorkerState.DEFAULT;
	        }
	        else if (!SendDrawRenderCommandBufferData.isInitComplete) {
	            return resultState;
	        }
	        if (SendDrawRenderCommandBufferData.state === exports.ERenderWorkerState.DRAW_COMPLETE) {
	            timeController.tick(elapsed);
	            SendDrawRenderCommandBufferData.state = exports.ERenderWorkerState.DEFAULT;
	            resultState = _sync(elapsed, state, scheduler);
	        }
	        else if (SendDrawRenderCommandBufferData.state !== exports.ERenderWorkerState.DRAW_WAIT) {
	            SendDrawRenderCommandBufferData.state = exports.ERenderWorkerState.DRAW_WAIT;
	            resultState = render$$1(resultState);
	        }
	        return resultState;
	    };
	    render$$1 = function (state) {
	        var resultState = null;
	        resultState = render$1(state);
	        return resultState;
	    };
	}
	else {
	    run = function (elapsed, state, timeController, scheduler) {
	        var resultState = state;
	        timeController.tick(elapsed);
	        resultState = _sync(elapsed, state, scheduler);
	        resultState = render$$1(resultState);
	        return resultState;
	    };
	    render$$1 = function (state) {
	        var resultState = render$1(state);
	        return resultState;
	    };
	}

	var GameObject = (function () {
	    function GameObject() {
	        this.uid = null;
	    }
	    GameObject = __decorate([
	        registerClass("GameObject")
	    ], GameObject);
	    return GameObject;
	}());
	var createGameObject = function () { return create$1(create$2(ThreeDTransformData), GameObjectData); };
	var addGameObjectComponent = requireCheckFunc(function (gameObject, component) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, component) {
	    addComponent$1(gameObject, component, GameObjectData);
	});
	var disposeGameObject = requireCheckFunc(function (gameObject) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject) {
	    dispose$2(gameObject, ThreeDTransformData, GameObjectData);
	});
	var initGameObject$1 = requireCheckFunc(function (gameObject, component) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, component) {
	    initGameObject$$1(gameObject, getState(DirectorData), GameObjectData);
	});
	var disposeGameObjectComponent = requireCheckFunc(function (gameObject, component) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, component) {
	    disposeComponent$1(gameObject, component, GameObjectData);
	});
	var getGameObjectComponent = requireCheckFunc(function (gameObject, _class) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, _class) {
	    return getComponent(gameObject, getComponentIDFromClass(_class), GameObjectData);
	});
	var getGameObjectTransform = function (gameObject) {
	    return getTransform(gameObject, GameObjectData);
	};
	var hasGameObjectComponent = requireCheckFunc(function (gameObject, _class) {
	}, function (gameObject, _class) {
	    return hasComponent(gameObject, getComponentIDFromClass(_class), GameObjectData);
	});
	var isGameObjectAlive = function (gameObject) {
	    return isAlive$$1(gameObject, GameObjectData);
	};
	var addGameObject = requireCheckFunc(function (gameObject, child) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, child) {
	    addChild(gameObject, child, ThreeDTransformData, GameObjectData);
	});
	var removeGameObject = requireCheckFunc(function (gameObject, child) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, child) {
	    removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
	});
	var hasGameObject = requireCheckFunc(function (gameObject, child) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject, child) {
	    return hasChild(gameObject, child, GameObjectData);
	});
	var getGameObjectChildren = requireCheckFunc(function (gameObject) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject) {
	    return getAliveChildren(gameObject.uid, GameObjectData);
	});
	var getGameObjectParent = requireCheckFunc(function (gameObject) {
	    checkGameObjectShouldAlive(gameObject, GameObjectData);
	}, function (gameObject) {
	    return getParent$$1(gameObject.uid, GameObjectData);
	});

	var Geometry = (function (_super) {
	    __extends(Geometry, _super);
	    function Geometry() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Geometry = __decorate([
	        registerClass("Geometry")
	    ], Geometry);
	    return Geometry;
	}(Component));
	var getDrawMode$2 = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getDrawMode$$1(geometry.index, GeometryData);
	});
	var getVertices$1 = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getVertices(geometry.index, GeometryData);
	});
	var getNormals$1 = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getNormals(geometry.index, GeometryData);
	});
	var getTexCoords$1 = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getTexCoords(geometry.index, GeometryData);
	});
	var getIndices$1 = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getIndices(geometry.index, GeometryData);
	});
	var getGeometryConfigData = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getConfigData(geometry.index, GeometryData);
	});
	var initGeometry$1 = function (geometry) {
	    initGeometry(geometry.index, getState(DirectorData));
	};
	var getGeometryGameObject = requireCheckFunc(function (geometry) {
	    _checkShouldAlive$3(geometry, GeometryData);
	}, function (geometry) {
	    return getGameObject$5(geometry.index, GeometryData);
	});
	var _checkShouldAlive$3 = function (geometry, GeometryData$$1) {
	    checkComponentShouldAlive(geometry, GeometryData$$1, function (geometry, GeometryData$$1) {
	        return isComponentIndexNotRemoved(geometry);
	    });
	};

	var create$1 = ensureFunc(function (gameObject, transform, GameObjectData) {
	    it("componentMap should has data", function () {
	        wdet_1(_getComponentData(gameObject.uid, GameObjectData)).exist;
	    });
	}, function (transform, GameObjectData) {
	    var gameObject = new GameObject(), uid = _buildUID(GameObjectData);
	    gameObject.uid = uid;
	    GameObjectData.aliveUIDArray.push(uid);
	    if (!transform) {
	        _setComponentData(uid, {}, GameObjectData);
	    }
	    else {
	        addComponent$1(gameObject, transform, GameObjectData);
	    }
	    return gameObject;
	});
	var _buildUID = function (GameObjectData) {
	    return GameObjectData.uid++;
	};
	var isAlive$$1 = function (entity, GameObjectData) {
	    return isValidMapValue(_getComponentData(entity.uid, GameObjectData));
	};
	var isNotAlive$$1 = function (entity, GameObjectData) {
	    return !isAlive$$1(entity, GameObjectData);
	};
	var initGameObject$$1 = function (gameObject, state, GameObjectData) {
	    var uid = gameObject.uid, componentData = _getComponentData(uid, GameObjectData);
	    for (var typeID in componentData) {
	        if (componentData.hasOwnProperty(typeID)) {
	            execInitHandle(typeID, componentData[typeID].index, state);
	        }
	    }
	};
	var dispose$2 = function (entity, ThreeDTransformData, GameObjectData) {
	    _diposeAllDatas(entity, GameObjectData);
	    GameObjectData.disposeCount += 1;
	    if (isDisposeTooManyComponents(GameObjectData.disposeCount)) {
	        reAllocateGameObject(GameObjectData);
	        GameObjectData.disposeCount = 0;
	    }
	};
	var _removeFromChildrenMap = function (parentUID, childUID, GameObjectData) {
	    removeChildEntity(getChildren(parentUID, GameObjectData), childUID);
	};
	var _diposeAllDatas = function (gameObject, GameObjectData) {
	    var uid = gameObject.uid, children = getChildren(uid, GameObjectData);
	    _disposeAllComponents(gameObject, GameObjectData);
	    _disposeMapDatas(uid, GameObjectData);
	    if (_isChildrenExist(children)) {
	        forEach(children, function (child) {
	            if (isNotAlive$$1(child, GameObjectData)) {
	                return;
	            }
	            _diposeAllDatas(child, GameObjectData);
	        });
	    }
	};
	var _disposeMapDatas = function (uid, GameObjectData) {
	    deleteVal(uid, GameObjectData.childrenMap);
	    deleteVal(uid, GameObjectData.componentMap);
	};
	var _disposeAllComponents = function (gameObject, GameObjectData) {
	    var components = _getComponentData(gameObject.uid, GameObjectData);
	    for (var typeID in components) {
	        if (components.hasOwnProperty(typeID)) {
	            var component = components[typeID];
	            execHandle(component, "disposeHandleMap");
	        }
	    }
	};
	var addComponent$1 = requireCheckFunc(function (gameObject, component, GameObjectData) {
	    it("component should exist", function () {
	        wdet_1(component).exist;
	    });
	    it("should not has this type of component, please dispose it", function () {
	        wdet_1(hasComponent(gameObject, getComponentIDFromComponent(component), GameObjectData)).false;
	    });
	}, function (gameObject, component, GameObjectData) {
	    var uid = gameObject.uid, componentID = getComponentIDFromComponent(component), data = _getComponentData(uid, GameObjectData);
	    execHandle(component, "addComponentHandleMap", [component, gameObject]);
	    if (!data) {
	        var d = {};
	        d[componentID] = component;
	        _setComponentData(uid, d, GameObjectData);
	        return;
	    }
	    data[componentID] = component;
	});
	var _removeComponent = function (componentID, gameObject, component, GameObjectData) {
	    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
	    if (isValidMapValue(data)) {
	        deleteVal(componentID, data);
	    }
	};
	var disposeComponent$1 = function (gameObject, component, GameObjectData) {
	    var componentID = getComponentIDFromComponent(component);
	    _removeComponent(componentID, gameObject, component, GameObjectData);
	    execHandle(component, "disposeHandleMap");
	};
	var getComponent = function (gameObject, componentID, GameObjectData) {
	    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
	    if (isValidMapValue(data)) {
	        var component = data[componentID];
	        return isValidMapValue(component) ? component : null;
	    }
	    return null;
	};
	var _getComponentData = function (uid, GameObjectData) { return GameObjectData.componentMap[uid]; };
	var _setComponentData = function (uid, data, GameObjectData) { return GameObjectData.componentMap[uid] = data; };
	var hasComponent = function (gameObject, componentID, GameObjectData) {
	    return getComponent(gameObject, componentID, GameObjectData) !== null;
	};
	var getTransform = function (gameObject, GameObjectData) {
	    return getComponent(gameObject, getComponentIDFromClass(ThreeDTransform), GameObjectData);
	};
	var getGeometry = function (gameObject, GameObjectData) {
	    return getComponent(gameObject, getComponentIDFromClass(Geometry), GameObjectData);
	};
	var getMaterial = function (gameObject, GameObjectData) {
	    return getComponent(gameObject, getComponentIDFromClass(Material), GameObjectData);
	};
	var _isParentExist = function (parent) { return isNotUndefined(parent); };
	var _isChildrenExist = function (children) { return isNotUndefined(children); };
	var _isComponentExist = function (component) { return component !== null; };
	var _isGameObjectEqual = function (gameObject1, gameObject2) { return gameObject1.uid === gameObject2.uid; };
	var getParent$$1 = function (uid, GameObjectData) { return GameObjectData.parentMap[uid]; };
	var _setParent = function (uid, parent, GameObjectData) {
	    GameObjectData.parentMap[uid] = parent;
	};
	var getChildren = function (uid, GameObjectData) {
	    return GameObjectData.childrenMap[uid];
	};
	var setChildren = function (uid, children, GameObjectData) {
	    GameObjectData.childrenMap[uid] = children;
	};
	var getAliveChildren = function (uid, GameObjectData) {
	    return filter(getChildren(uid, GameObjectData), function (gameObject) {
	        return isAlive$$1(gameObject, GameObjectData);
	    });
	};
	var _addChild = function (uid, child, GameObjectData) {
	    var children = getChildren(uid, GameObjectData);
	    if (isValidMapValue(children)) {
	        children.push(child);
	    }
	    else {
	        setChildren(uid, [child], GameObjectData);
	    }
	};
	var addChild = requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
	}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
	    var transform = getTransform(gameObject, GameObjectData), uid = gameObject.uid, childUID = child.uid, parent = getParent$$1(childUID, GameObjectData);
	    if (_isParentExist(parent)) {
	        removeChild(parent, child, ThreeDTransformData, GameObjectData);
	    }
	    _setParent(childUID, gameObject, GameObjectData);
	    if (_isComponentExist(transform)) {
	        setParent$$1(getTransform(child, GameObjectData), transform, ThreeDTransformData);
	    }
	    _addChild(uid, child, GameObjectData);
	});
	var removeChild = requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
	    it("child should has transform component", function () {
	        wdet_1(getTransform(child, GameObjectData)).exist;
	    });
	}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
	    var uid = gameObject.uid, childUID = child.uid;
	    deleteVal(childUID, GameObjectData.parentMap);
	    setParent$$1(getTransform(child, GameObjectData), null, ThreeDTransformData);
	    _removeFromChildrenMap(uid, childUID, GameObjectData);
	});
	var hasChild = function (gameObject, child, GameObjectData) {
	    if (isNotAlive$$1(gameObject, GameObjectData) || isNotAlive$$1(child, GameObjectData)) {
	        return false;
	    }
	    var parent = getParent$$1(child.uid, GameObjectData);
	    if (!_isParentExist(parent) || isNotAlive$$1(parent, GameObjectData)) {
	        return false;
	    }
	    return _isGameObjectEqual(parent, gameObject);
	};
	var initData$3 = function (GameObjectData) {
	    GameObjectData.uid = 0;
	    GameObjectData.componentMap = createMap();
	    GameObjectData.parentMap = createMap();
	    GameObjectData.childrenMap = createMap();
	    GameObjectData.disposeCount = 0;
	    GameObjectData.aliveUIDArray = [];
	};

	var init$$1 = function (state, index, PerspectiveCameraData, CameraData) {
	    updateProjectionMatrix$$1(index, PerspectiveCameraData, CameraData);
	};
	var updateProjectionMatrix$$1 = function (index, PerspectiveCameraData, CameraData) {
	    updateProjectionMatrix$1(index, PerspectiveCameraData, CameraData);
	};
	var getWorldToCameraMatrix$$1 = function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
	    return _getCameraToWorldMatrix(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).clone().invert();
	};
	var _getCameraToWorldMatrix = function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
	    var transform = getTransform(getGameObject(index, CameraControllerData), GameObjectData);
	    return getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData);
	};
	var getPMatrix$$1 = function (index, CameraData) {
	    return CameraData.pMatrixMap[index];
	};
	var setPMatrix = function (index, pMatrix, CameraData) {
	    CameraData.pMatrixMap[index] = pMatrix;
	};
	var getNear = function (index, CameraData) {
	    return CameraData.nearMap[index];
	};
	var setNear = function (index, near, CameraControllerData, CameraData) {
	    CameraData.nearMap[index] = near;
	    addToDirtyList(index, CameraControllerData);
	};
	var getFar = function (index, CameraData) {
	    return CameraData.farMap[index];
	};
	var setFar = function (index, far, CameraControllerData, CameraData) {
	    CameraData.farMap[index] = far;
	    addToDirtyList(index, CameraControllerData);
	};
	var dispose$$1 = function (index, PerspectiveCameraData, CameraData) {
	    deleteVal(index, CameraData.nearMap);
	    deleteVal(index, CameraData.farMap);
	    deleteVal(index, CameraData.worldToCameraMatrixMap);
	    deleteVal(index, CameraData.pMatrixMap);
	    dispose$1(index, PerspectiveCameraData);
	};
	var initData$$1 = function (PerspectiveCameraData, CameraData) {
	    CameraData.nearMap = createMap();
	    CameraData.farMap = createMap();
	    CameraData.worldToCameraMatrixMap = createMap();
	    CameraData.pMatrixMap = createMap();
	    initData$1(PerspectiveCameraData);
	};

	var getCameraPMatrix = function (cameraController) {
	    return getPMatrix$$1(cameraController.index, CameraData);
	};
	var getCameraNear = function (cameraController) {
	    return getNear(cameraController.index, CameraData);
	};
	var setCameraNear = function (cameraController, near) {
	    setNear(cameraController.index, near, CameraControllerData, CameraData);
	};
	var getCameraFar = function (cameraController) {
	    return getFar(cameraController.index, CameraData);
	};
	var setCameraFar = function (cameraController, far) {
	    setFar(cameraController.index, far, CameraControllerData, CameraData);
	};

	var getPerspectiveCameraFovy = function (cameraController) {
	    return getFovy(cameraController.index, PerspectiveCameraData);
	};
	var setPerspectiveCameraFovy = function (cameraController, fovy) {
	    setFovy(cameraController.index, fovy, PerspectiveCameraData, CameraControllerData);
	};
	var getPerspectiveCameraAspect = function (cameraController) {
	    return getAspect(cameraController.index, PerspectiveCameraData);
	};
	var setPerspectiveCameraAspect = function (cameraController, aspect) {
	    setAspect(cameraController.index, aspect, PerspectiveCameraData, CameraControllerData);
	};

	var create$16 = function (GeometryData) {
	    var geometry = new BoxGeometry(), index = null;
	    geometry = create$8(geometry, GeometryData);
	    index = geometry.index;
	    setConfigData(index, {}, GeometryData);
	    GeometryData.computeDataFuncMap[index] = _computeData;
	    return geometry;
	};
	var _computeData = function (index, GeometryData) {
	    var _a = _getConfigData(index, GeometryData), width = _a.width, height = _a.height, depth = _a.depth, widthSegments = _a.widthSegments, heightSegments = _a.heightSegments, depthSegments = _a.depthSegments, sides = {
	        FRONT: 0,
	        BACK: 1,
	        TOP: 2,
	        BOTTOM: 3,
	        RIGHT: 4,
	        LEFT: 5
	    }, vertices = [], normals = [], texCoords = [], indices = [];
	    var faceAxes = [
	        [0, 1, 3],
	        [4, 5, 7],
	        [3, 2, 6],
	        [1, 0, 4],
	        [1, 4, 2],
	        [5, 0, 6]
	    ];
	    var faceNormals = [
	        [0, 0, 1],
	        [0, 0, -1],
	        [0, 1, 0],
	        [0, -1, 0],
	        [1, 0, 0],
	        [-1, 0, 0]
	    ];
	    var corners = [
	        Vector3.create(-width, -height, depth),
	        Vector3.create(width, -height, depth),
	        Vector3.create(width, height, depth),
	        Vector3.create(-width, height, depth),
	        Vector3.create(width, -height, -depth),
	        Vector3.create(-width, -height, -depth),
	        Vector3.create(-width, height, -depth),
	        Vector3.create(width, height, -depth)
	    ];
	    function generateFace(side, uSegments, vSegments) {
	        var x, y, z, u, v;
	        var i, j;
	        var offset = vertices.length / 3;
	        for (i = 0; i <= uSegments; i++) {
	            for (j = 0; j <= vSegments; j++) {
	                var temp1 = GlobalTempData.vector3_1, temp2 = GlobalTempData.vector3_2, temp3 = GlobalTempData.vector3_3, r = GlobalTempData.vector3_4;
	                temp1.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][1]], i / uSegments);
	                temp2.lerp(corners[faceAxes[side][0]], corners[faceAxes[side][2]], j / vSegments);
	                temp3.sub2(temp2, corners[faceAxes[side][0]]);
	                r.add2(temp1, temp3);
	                u = i / uSegments;
	                v = j / vSegments;
	                vertices.push(r.x, r.y, r.z);
	                normals.push(faceNormals[side][0], faceNormals[side][1], faceNormals[side][2]);
	                texCoords.push(u, v);
	                if ((i < uSegments) && (j < vSegments)) {
	                    indices.push(offset + j + i * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1), offset + j + i * (uSegments + 1) + 1);
	                    indices.push(offset + j + (i + 1) * (uSegments + 1), offset + j + (i + 1) * (uSegments + 1) + 1, offset + j + i * (uSegments + 1) + 1);
	                }
	            }
	        }
	    }
	    generateFace(sides.FRONT, widthSegments, heightSegments);
	    generateFace(sides.BACK, widthSegments, heightSegments);
	    generateFace(sides.TOP, widthSegments, depthSegments);
	    generateFace(sides.BOTTOM, widthSegments, depthSegments);
	    generateFace(sides.RIGHT, depthSegments, heightSegments);
	    generateFace(sides.LEFT, depthSegments, heightSegments);
	    return {
	        vertices: vertices,
	        normals: normals,
	        texCoords: texCoords,
	        indices: indices
	    };
	};
	var _getConfigData = ensureFunc(function (data) {
	    it("config data should be defined", function () {
	        wdet_1(data).exist;
	        wdet_1(data.width).exist;
	        wdet_1(data.height).exist;
	        wdet_1(data.depth).exist;
	        wdet_1(data.widthSegments).exist;
	        wdet_1(data.heightSegments).exist;
	        wdet_1(data.depthSegments).exist;
	    });
	}, function (index, GeometryData) {
	    return GeometryData.configDataMap[index];
	});
	var setConfigData = function (index, data, GeometryData) {
	    GeometryData.configDataMap[index] = ExtendUtils.extend({
	        width: 10,
	        height: 10,
	        depth: 10,
	        widthSegments: 1,
	        heightSegments: 1,
	        depthSegments: 1
	    }, data);
	};

	var BoxGeometry = (function (_super) {
	    __extends(BoxGeometry, _super);
	    function BoxGeometry() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BoxGeometry = __decorate([
	        registerClass("BoxGeometry")
	    ], BoxGeometry);
	    return BoxGeometry;
	}(Geometry));
	var createBoxGeometry = function () {
	    return create$16(GeometryData);
	};
	var setBoxGeometryConfigData = function (geometry, data) {
	    setConfigData(geometry.index, data, GeometryData);
	};

	var create$17 = function (GeometryData) {
	    return create$8(new CustomGeometry(), GeometryData);
	};

	var CustomGeometry = (function (_super) {
	    __extends(CustomGeometry, _super);
	    function CustomGeometry() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    CustomGeometry = __decorate([
	        registerClass("CustomGeometry")
	    ], CustomGeometry);
	    return CustomGeometry;
	}(Geometry));
	var createCustomGeometry = function () {
	    return create$17(GeometryData);
	};
	var setCustomGeometryVertices = function (geometry, vertices) {
	    return setVertices(geometry.index, vertices, GeometryData);
	};
	var setCustomGeometryNormals = function (geometry, normals) {
	    return setNormals(geometry.index, normals, GeometryData);
	};
	var setCustomGeometryTexCoords = function (geometry, texCoords) {
	    return setTexCoords(geometry.index, texCoords, GeometryData);
	};
	var setCustomGeometryIndices = function (geometry, indices) {
	    return setIndices(geometry.index, indices, GeometryData);
	};

	(function (EShading) {
	    EShading[EShading["FLAT"] = 0] = "FLAT";
	    EShading[EShading["SMOOTH"] = 1] = "SMOOTH";
	})(exports.EShading || (exports.EShading = {}));

	var DebugConfig = {
	    isTest: false,
	    debugCollision: false,
	    showDebugPanel: false
	};

	var TimeController = (function () {
	    function TimeController() {
	        this.elapsed = null;
	        this.pauseElapsed = 0;
	        this.pauseTime = null;
	        this.startTime = null;
	    }
	    TimeController.prototype.start = function () {
	        this.startTime = this.getNow();
	        this.pauseElapsed = null;
	    };
	    TimeController.prototype.stop = function () {
	        this.startTime = null;
	    };
	    TimeController.prototype.pause = function () {
	        this.pauseTime = this.getNow();
	    };
	    TimeController.prototype.resume = function () {
	        this.pauseElapsed += this.getNow() - this.pauseTime;
	        this.pauseTime = null;
	    };
	    TimeController.prototype.computeElapseTime = function (time) {
	        if (this.pauseElapsed) {
	            this.elapsed = time - this.pauseElapsed - this.startTime;
	        }
	        else {
	            this.elapsed = time - this.startTime;
	        }
	        if (this.elapsed < 0) {
	            this.elapsed = 0;
	        }
	        return this.elapsed;
	    };
	    __decorate([
	        ensure(function () {
	            assert(this.elapsed >= 0, Log$$1.info.FUNC_SHOULD("elapsed:" + this.elapsed, ">= 0"));
	        })
	    ], TimeController.prototype, "computeElapseTime", null);
	    return TimeController;
	}());

	var STARTING_FPS = 60;
	var GAMETIME_SCALE = 1000;
	var DirectorTimeController = (function (_super) {
	    __extends(DirectorTimeController, _super);
	    function DirectorTimeController() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.gameTime = null;
	        _this.fps = null;
	        _this.isTimeChange = false;
	        _this.deltaTime = null;
	        _this._lastTime = null;
	        return _this;
	    }
	    DirectorTimeController.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    DirectorTimeController.prototype.tick = function (time) {
	        this.deltaTime = this._lastTime !== null ? time - this._lastTime : time;
	        this._updateFps(this.deltaTime);
	        this.gameTime = time / GAMETIME_SCALE;
	        this._lastTime = time;
	    };
	    DirectorTimeController.prototype.start = function () {
	        _super.prototype.start.call(this);
	        this.isTimeChange = true;
	        this.elapsed = 0;
	    };
	    DirectorTimeController.prototype.resume = function () {
	        _super.prototype.resume.call(this);
	        this.isTimeChange = true;
	    };
	    DirectorTimeController.prototype.getNow = function () {
	        return exports.root.performance.now();
	    };
	    DirectorTimeController.prototype._updateFps = function (deltaTime) {
	        if (this._lastTime === null) {
	            this.fps = STARTING_FPS;
	        }
	        else {
	            this.fps = 1000 / deltaTime;
	        }
	    };
	    DirectorTimeController = __decorate([
	        registerClass("DirectorTimeController")
	    ], DirectorTimeController);
	    return DirectorTimeController;
	}(TimeController));

	var JudgeUtils$2 = (function () {
	    function JudgeUtils() {
	    }
	    JudgeUtils.isArray = function (arr) {
	        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	        var length = arr && arr.length;
	        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	    };
	    JudgeUtils.isArrayExactly = function (arr) {
	        return Object.prototype.toString.call(arr) === "[object Array]";
	    };
	    JudgeUtils.isNumber = function (num) {
	        return typeof num == "number";
	    };
	    JudgeUtils.isNumberExactly = function (num) {
	        return Object.prototype.toString.call(num) === "[object Number]";
	    };
	    JudgeUtils.isString = function (str) {
	        return typeof str == "string";
	    };
	    JudgeUtils.isStringExactly = function (str) {
	        return Object.prototype.toString.call(str) === "[object String]";
	    };
	    JudgeUtils.isBoolean = function (bool) {
	        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
	    };
	    JudgeUtils.isDom = function (obj) {
	        return !!(obj && obj.nodeType === 1);
	    };
	    JudgeUtils.isObject = function (obj) {
	        var type = typeof obj;
	        return type === 'function' || type === 'object' && !!obj;
	    };
	    JudgeUtils.isDirectObject = function (obj) {
	        return Object.prototype.toString.call(obj) === "[object Object]";
	    };
	    JudgeUtils.isHostMethod = function (object, property) {
	        var type = typeof object[property];
	        return type === "function" ||
	            (type === "object" && !!object[property]);
	    };
	    JudgeUtils.isNodeJs = function () {
	        return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
	    };
	    JudgeUtils.isFunction = function (func) {
	        return true;
	    };
	    return JudgeUtils;
	}());
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    JudgeUtils$2.isFunction = function (func) {
	        return typeof func == 'function';
	    };
	}
	else {
	    JudgeUtils$2.isFunction = function (func) {
	        return Object.prototype.toString.call(func) === "[object Function]";
	    };
	}

	var root$2;
	if (JudgeUtils$2.isNodeJs() && typeof global != "undefined") {
	    root$2 = global;
	}
	else if (typeof window != "undefined") {
	    root$2 = window;
	}
	else if (typeof self != "undefined") {
	    root$2 = self;
	}
	else {
	    Log$2.error("no avaliable root!");
	}

	var Log$2 = (function () {
	    function Log() {
	    }
	    Log.log = function () {
	        var messages = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            messages[_i] = arguments[_i];
	        }
	        if (!this._exec("log", messages)) {
	            root$2.alert(messages.join(","));
	        }
	        this._exec("trace", messages);
	    };
	    Log.assert = function (cond) {
	        var messages = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            messages[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            if (!this._exec("assert", arguments, 1)) {
	                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	        }
	    };
	    Log.error = function (cond) {
	        var message = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            message[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
	        }
	    };
	    Log.warn = function () {
	        var message = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            message[_i] = arguments[_i];
	        }
	        var result = this._exec("warn", arguments);
	        if (!result) {
	            this.log.apply(this, arguments);
	        }
	        else {
	            this._exec("trace", ["warn trace"]);
	        }
	    };
	    Log._exec = function (consoleMethod, args, sliceBegin) {
	        if (sliceBegin === void 0) { sliceBegin = 0; }
	        if (root$2.console && root$2.console[consoleMethod]) {
	            root$2.console[consoleMethod].apply(root$2.console, Array.prototype.slice.call(args, sliceBegin));
	            return true;
	        }
	        return false;
	    };
	    Log.info = {
	        INVALID_PARAM: "invalid parameter",
	        helperFunc: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = "";
	            args.forEach(function (val) {
	                result += String(val) + " ";
	            });
	            return result.slice(0, -1);
	        },
	        assertion: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            if (args.length === 2) {
	                return this.helperFunc(args[0], args[1]);
	            }
	            else if (args.length === 3) {
	                return this.helperFunc(args[1], args[0], args[2]);
	            }
	            else {
	                throw new Error("args.length must <= 3");
	            }
	        },
	        FUNC_INVALID: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("invalid");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_BE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must be");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_NOT_BE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must not be");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_SHOULD: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("should");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_SHOULD_NOT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("should not");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_SUPPORT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("support");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_NOT_SUPPORT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("not support");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_DEFINE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must define");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_MUST_NOT_DEFINE: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("must not define");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_UNKNOW: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("unknow");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_EXPECT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("expect");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_UNEXPECT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("unexpect");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_EXIST: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("exist");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_NOT_EXIST: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("not exist");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_ONLY: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("only");
	            return this.assertion.apply(this, args);
	        },
	        FUNC_CAN_NOT: function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            args.unshift("can't");
	            return this.assertion.apply(this, args);
	        }
	    };
	    return Log;
	}());

	var Entity = (function () {
	    function Entity(uidPre) {
	        this._uid = null;
	        this._uid = uidPre + String(Entity.UID++);
	    }
	    Object.defineProperty(Entity.prototype, "uid", {
	        get: function () {
	            return this._uid;
	        },
	        set: function (uid) {
	            this._uid = uid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Entity.UID = 1;
	    return Entity;
	}());

	var $BREAK$1 = {
	    break: true
	};
	var $REMOVE$1 = void 0;

	var List$1 = (function () {
	    function List() {
	        this.children = null;
	    }
	    List.prototype.getCount = function () {
	        return this.children.length;
	    };
	    List.prototype.hasChild = function (child) {
	        var c = null, children = this.children;
	        for (var i = 0, len = children.length; i < len; i++) {
	            c = children[i];
	            if (child.uid && c.uid && child.uid == c.uid) {
	                return true;
	            }
	            else if (child === c) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.hasChildWithFunc = function (func) {
	        for (var i = 0, len = this.children.length; i < len; i++) {
	            if (func(this.children[i], i)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.getChildren = function () {
	        return this.children;
	    };
	    List.prototype.getChild = function (index) {
	        return this.children[index];
	    };
	    List.prototype.addChild = function (child) {
	        this.children.push(child);
	        return this;
	    };
	    List.prototype.addChildren = function (arg) {
	        if (JudgeUtils$2.isArray(arg)) {
	            var children = arg;
	            this.children = this.children.concat(children);
	        }
	        else if (arg instanceof List) {
	            var children = arg;
	            this.children = this.children.concat(children.getChildren());
	        }
	        else {
	            var child = arg;
	            this.addChild(child);
	        }
	        return this;
	    };
	    List.prototype.setChildren = function (children) {
	        this.children = children;
	        return this;
	    };
	    List.prototype.unShiftChild = function (child) {
	        this.children.unshift(child);
	    };
	    List.prototype.removeAllChildren = function () {
	        this.children = [];
	        return this;
	    };
	    List.prototype.forEach = function (func, context) {
	        this._forEach(this.children, func, context);
	        return this;
	    };
	    List.prototype.toArray = function () {
	        return this.children;
	    };
	    List.prototype.copyChildren = function () {
	        return this.children.slice(0);
	    };
	    List.prototype.removeChildHelper = function (arg) {
	        var result = null;
	        if (JudgeUtils$2.isFunction(arg)) {
	            var func = arg;
	            result = this._removeChild(this.children, func);
	        }
	        else if (arg.uid) {
	            result = this._removeChild(this.children, function (e) {
	                if (!e.uid) {
	                    return false;
	                }
	                return e.uid === arg.uid;
	            });
	        }
	        else {
	            result = this._removeChild(this.children, function (e) {
	                return e === arg;
	            });
	        }
	        return result;
	    };
	    List.prototype._forEach = function (arr, func, context) {
	        var scope = context, i = 0, len = arr.length;
	        for (i = 0; i < len; i++) {
	            if (func.call(scope, arr[i], i) === $BREAK$1) {
	                break;
	            }
	        }
	    };
	    List.prototype._removeChild = function (arr, func) {
	        var self = this, removedElementArr = [], remainElementArr = [];
	        this._forEach(arr, function (e, index) {
	            if (!!func.call(self, e)) {
	                removedElementArr.push(e);
	            }
	            else {
	                remainElementArr.push(e);
	            }
	        });
	        this.children = remainElementArr;
	        return removedElementArr;
	    };
	    return List;
	}());

	var ExtendUtils$1 = (function () {
	    function ExtendUtils() {
	    }
	    ExtendUtils.extendDeep = function (parent, child, filter) {
	        if (filter === void 0) { filter = function (val, i) { return true; }; }
	        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
	        if (toStr.call(parent) === sArr) {
	            _child = child || [];
	            for (i = 0, len = parent.length; i < len; i++) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else if (toStr.call(parent) === sOb) {
	            _child = child || {};
	            for (i in parent) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else {
	            _child = parent;
	        }
	        return _child;
	    };
	    ExtendUtils.extend = function (destination, source) {
	        var property = "";
	        for (property in source) {
	            destination[property] = source[property];
	        }
	        return destination;
	    };
	    ExtendUtils.copyPublicAttri = function (source) {
	        var property = null, destination = {};
	        this.extendDeep(source, destination, function (item, property) {
	            return property.slice(0, 1) !== "_"
	                && !JudgeUtils$2.isFunction(item);
	        });
	        return destination;
	    };
	    return ExtendUtils;
	}());

	var Collection$1 = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Collection.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Collection.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Collection.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils$2.isBoolean(args[0])) {
	                target = Collection.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils$1.extendDeep(this.children));
	        }
	        else {
	            target.setChildren(ExtendUtils$1.extend([], this.children));
	        }
	        return target;
	    };
	    Collection.prototype.filter = function (func) {
	        var children = this.children, result = [], value = null;
	        for (var i = 0, len = children.length; i < len; i++) {
	            value = children[i];
	            if (func.call(children, value, i)) {
	                result.push(value);
	            }
	        }
	        return Collection.create(result);
	    };
	    Collection.prototype.findOne = function (func) {
	        var scope = this.children, result = null;
	        this.forEach(function (value, index) {
	            if (!func.call(scope, value, index)) {
	                return;
	            }
	            result = value;
	            return $BREAK$1;
	        });
	        return result;
	    };
	    Collection.prototype.reverse = function () {
	        return Collection.create(this.copyChildren().reverse());
	    };
	    Collection.prototype.removeChild = function (arg) {
	        return Collection.create(this.removeChildHelper(arg));
	    };
	    Collection.prototype.sort = function (func, isSortSelf) {
	        if (isSortSelf === void 0) { isSortSelf = false; }
	        if (isSortSelf) {
	            this.children.sort(func);
	            return this;
	        }
	        return Collection.create(this.copyChildren().sort(func));
	    };
	    Collection.prototype.map = function (func) {
	        var resultArr = [];
	        this.forEach(function (e, index) {
	            var result = func(e, index);
	            if (result !== $REMOVE$1) {
	                resultArr.push(result);
	            }
	        });
	        return Collection.create(resultArr);
	    };
	    Collection.prototype.removeRepeatItems = function () {
	        var noRepeatList = Collection.create();
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                return;
	            }
	            noRepeatList.addChild(item);
	        });
	        return noRepeatList;
	    };
	    Collection.prototype.hasRepeatItems = function () {
	        var noRepeatList = Collection.create(), hasRepeat = false;
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                hasRepeat = true;
	                return $BREAK$1;
	            }
	            noRepeatList.addChild(item);
	        });
	        return hasRepeat;
	    };
	    return Collection;
	}(List$1));

	var JudgeUtils$3 = (function (_super) {
	    __extends(JudgeUtils$$1, _super);
	    function JudgeUtils$$1() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    JudgeUtils$$1.isPromise = function (obj) {
	        return !!obj
	            && !_super.isFunction.call(this, obj.subscribe)
	            && _super.isFunction.call(this, obj.then);
	    };
	    JudgeUtils$$1.isEqual = function (ob1, ob2) {
	        return ob1.uid === ob2.uid;
	    };
	    JudgeUtils$$1.isIObserver = function (i) {
	        return i.next && i.error && i.completed;
	    };
	    return JudgeUtils$$1;
	}(JudgeUtils$2));

	var SubjectObserver = (function () {
	    function SubjectObserver() {
	        this.observers = Collection$1.create();
	        this._disposable = null;
	    }
	    SubjectObserver.prototype.isEmpty = function () {
	        return this.observers.getCount() === 0;
	    };
	    SubjectObserver.prototype.next = function (value) {
	        this.observers.forEach(function (ob) {
	            ob.next(value);
	        });
	    };
	    SubjectObserver.prototype.error = function (error) {
	        this.observers.forEach(function (ob) {
	            ob.error(error);
	        });
	    };
	    SubjectObserver.prototype.completed = function () {
	        this.observers.forEach(function (ob) {
	            ob.completed();
	        });
	    };
	    SubjectObserver.prototype.addChild = function (observer) {
	        this.observers.addChild(observer);
	        observer.setDisposable(this._disposable);
	    };
	    SubjectObserver.prototype.removeChild = function (observer) {
	        this.observers.removeChild(function (ob) {
	            return JudgeUtils$3.isEqual(ob, observer);
	        });
	    };
	    SubjectObserver.prototype.dispose = function () {
	        this.observers.forEach(function (ob) {
	            ob.dispose();
	        });
	        this.observers.removeAllChildren();
	    };
	    SubjectObserver.prototype.setDisposable = function (disposable) {
	        this.observers.forEach(function (observer) {
	            observer.setDisposable(disposable);
	        });
	        this._disposable = disposable;
	    };
	    return SubjectObserver;
	}());

	var Observer = (function (_super) {
	    __extends(Observer, _super);
	    function Observer() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var _this = _super.call(this, "Observer") || this;
	        _this._isDisposed = null;
	        _this.onUserNext = null;
	        _this.onUserError = null;
	        _this.onUserCompleted = null;
	        _this._isStop = false;
	        _this._disposable = null;
	        if (args.length === 1) {
	            var observer_1 = args[0];
	            _this.onUserNext = function (v) {
	                observer_1.next(v);
	            };
	            _this.onUserError = function (e) {
	                observer_1.error(e);
	            };
	            _this.onUserCompleted = function () {
	                observer_1.completed();
	            };
	        }
	        else {
	            var onNext = args[0], onError = args[1], onCompleted = args[2];
	            _this.onUserNext = onNext || function (v) { };
	            _this.onUserError = onError || function (e) {
	                throw e;
	            };
	            _this.onUserCompleted = onCompleted || function () { };
	        }
	        return _this;
	    }
	    Object.defineProperty(Observer.prototype, "isDisposed", {
	        get: function () {
	            return this._isDisposed;
	        },
	        set: function (isDisposed) {
	            this._isDisposed = isDisposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Observer.prototype.next = function (value) {
	        if (!this._isStop) {
	            return this.onNext(value);
	        }
	    };
	    Observer.prototype.error = function (error) {
	        if (!this._isStop) {
	            this._isStop = true;
	            this.onError(error);
	        }
	    };
	    Observer.prototype.completed = function () {
	        if (!this._isStop) {
	            this._isStop = true;
	            this.onCompleted();
	        }
	    };
	    Observer.prototype.dispose = function () {
	        this._isStop = true;
	        this._isDisposed = true;
	        if (this._disposable) {
	            this._disposable.dispose();
	        }
	    };
	    Observer.prototype.setDisposable = function (disposable) {
	        this._disposable = disposable;
	    };
	    return Observer;
	}(Entity));

	var Main = (function () {
	    function Main() {
	    }
	    Main.isTest = false;
	    return Main;
	}());

	function assert$1(cond, message) {
	    if (message === void 0) { message = "contract error"; }
	    Log$2.error(!cond, message);
	}
	function requireCheck$1(InFunc) {
	    return function (target, name, descriptor) {
	        var value = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            if (Main.isTest) {
	                InFunc.apply(this, args);
	            }
	            return value.apply(this, args);
	        };
	        return descriptor;
	    };
	}

	var AutoDetachObserver = (function (_super) {
	    __extends(AutoDetachObserver, _super);
	    function AutoDetachObserver() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AutoDetachObserver.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 1) {
	            return new this(args[0]);
	        }
	        else {
	            return new this(args[0], args[1], args[2]);
	        }
	    };
	    AutoDetachObserver.prototype.dispose = function () {
	        if (this.isDisposed) {
	            return;
	        }
	        _super.prototype.dispose.call(this);
	    };
	    AutoDetachObserver.prototype.onNext = function (value) {
	        try {
	            this.onUserNext(value);
	        }
	        catch (e) {
	            this.onError(e);
	        }
	    };
	    AutoDetachObserver.prototype.onError = function (error) {
	        try {
	            this.onUserError(error);
	        }
	        catch (e) {
	            throw e;
	        }
	        finally {
	            this.dispose();
	        }
	    };
	    AutoDetachObserver.prototype.onCompleted = function () {
	        try {
	            this.onUserCompleted();
	            this.dispose();
	        }
	        catch (e) {
	            throw e;
	        }
	    };
	    __decorate([
	        requireCheck$1(function () {
	            if (this.isDisposed) {
	                Log$2.warn("only can dispose once");
	            }
	        })
	    ], AutoDetachObserver.prototype, "dispose", null);
	    return AutoDetachObserver;
	}(Observer));

	var InnerSubscription = (function () {
	    function InnerSubscription(subject, observer) {
	        this._subject = null;
	        this._observer = null;
	        this._subject = subject;
	        this._observer = observer;
	    }
	    InnerSubscription.create = function (subject, observer) {
	        var obj = new this(subject, observer);
	        return obj;
	    };
	    InnerSubscription.prototype.dispose = function () {
	        this._subject.remove(this._observer);
	        this._observer.dispose();
	    };
	    return InnerSubscription;
	}());

	var Subject = (function () {
	    function Subject() {
	        this._source = null;
	        this._observer = new SubjectObserver();
	    }
	    Subject.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Subject.prototype, "source", {
	        get: function () {
	            return this._source;
	        },
	        set: function (source) {
	            this._source = source;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Subject.prototype.subscribe = function (arg1, onError, onCompleted) {
	        var observer = arg1 instanceof Observer
	            ? arg1
	            : AutoDetachObserver.create(arg1, onError, onCompleted);
	        this._observer.addChild(observer);
	        return InnerSubscription.create(this, observer);
	    };
	    Subject.prototype.next = function (value) {
	        this._observer.next(value);
	    };
	    Subject.prototype.error = function (error) {
	        this._observer.error(error);
	    };
	    Subject.prototype.completed = function () {
	        this._observer.completed();
	    };
	    Subject.prototype.start = function () {
	        if (!this._source) {
	            return;
	        }
	        this._observer.setDisposable(this._source.buildStream(this));
	    };
	    Subject.prototype.remove = function (observer) {
	        this._observer.removeChild(observer);
	    };
	    Subject.prototype.dispose = function () {
	        this._observer.dispose();
	    };
	    return Subject;
	}());

	var SingleDisposable = (function (_super) {
	    __extends(SingleDisposable, _super);
	    function SingleDisposable(disposeHandler) {
	        var _this = _super.call(this, "SingleDisposable") || this;
	        _this._disposeHandler = null;
	        _this._isDisposed = false;
	        _this._disposeHandler = disposeHandler;
	        return _this;
	    }
	    SingleDisposable.create = function (disposeHandler) {
	        if (disposeHandler === void 0) { disposeHandler = function () { }; }
	        var obj = new this(disposeHandler);
	        return obj;
	    };
	    SingleDisposable.prototype.setDisposeHandler = function (handler) {
	        this._disposeHandler = handler;
	    };
	    SingleDisposable.prototype.dispose = function () {
	        if (this._isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._disposeHandler();
	    };
	    return SingleDisposable;
	}(Entity));

	var ClassMapUtils = (function () {
	    function ClassMapUtils() {
	    }
	    ClassMapUtils.addClassMap = function (className, _class) {
	        this._classMap[className] = _class;
	    };
	    ClassMapUtils.getClass = function (className) {
	        return this._classMap[className];
	    };
	    ClassMapUtils._classMap = {};
	    return ClassMapUtils;
	}());

	var FunctionUtils = (function () {
	    function FunctionUtils() {
	    }
	    FunctionUtils.bind = function (object, func) {
	        return function () {
	            return func.apply(object, arguments);
	        };
	    };
	    return FunctionUtils;
	}());

	var Stream = (function (_super) {
	    __extends(Stream, _super);
	    function Stream(subscribeFunc) {
	        var _this = _super.call(this, "Stream") || this;
	        _this.scheduler = null;
	        _this.subscribeFunc = null;
	        _this.subscribeFunc = subscribeFunc || function () { };
	        return _this;
	    }
	    Stream.prototype.buildStream = function (observer) {
	        return SingleDisposable.create((this.subscribeFunc(observer) || function () { }));
	    };
	    Stream.prototype.do = function (onNext, onError, onCompleted) {
	        return ClassMapUtils.getClass("DoStream").create(this, onNext, onError, onCompleted);
	    };
	    Stream.prototype.map = function (selector) {
	        return ClassMapUtils.getClass("MapStream").create(this, selector);
	    };
	    Stream.prototype.flatMap = function (selector) {
	        return this.map(selector).mergeAll();
	    };
	    Stream.prototype.concatMap = function (selector) {
	        return this.map(selector).concatAll();
	    };
	    Stream.prototype.mergeAll = function () {
	        return ClassMapUtils.getClass("MergeAllStream").create(this);
	    };
	    Stream.prototype.concatAll = function () {
	        return this.merge(1);
	    };
	    Stream.prototype.skipUntil = function (otherStream) {
	        return ClassMapUtils.getClass("SkipUntilStream").create(this, otherStream);
	    };
	    Stream.prototype.takeUntil = function (otherStream) {
	        return ClassMapUtils.getClass("TakeUntilStream").create(this, otherStream);
	    };
	    Stream.prototype.take = function (count) {
	        if (count === void 0) { count = 1; }
	        var self = this;
	        if (count === 0) {
	            return ClassMapUtils.getClass("Operator").empty();
	        }
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            self.subscribe(function (value) {
	                if (count > 0) {
	                    observer.next(value);
	                }
	                count--;
	                if (count <= 0) {
	                    observer.completed();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.takeLast = function (count) {
	        if (count === void 0) { count = 1; }
	        var self = this;
	        if (count === 0) {
	            return ClassMapUtils.getClass("Operator").empty();
	        }
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            var queue = [];
	            self.subscribe(function (value) {
	                queue.push(value);
	                if (queue.length > count) {
	                    queue.shift();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                while (queue.length > 0) {
	                    observer.next(queue.shift());
	                }
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.takeWhile = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        var self = this, bindPredicate = null;
	        bindPredicate = FunctionUtils.bind(thisArg, predicate);
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            var i = 0, isStart = false;
	            self.subscribe(function (value) {
	                if (bindPredicate(value, i++, self)) {
	                    try {
	                        observer.next(value);
	                        isStart = true;
	                    }
	                    catch (e) {
	                        observer.error(e);
	                        return;
	                    }
	                }
	                else {
	                    if (isStart) {
	                        observer.completed();
	                    }
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.lastOrDefault = function (defaultValue) {
	        if (defaultValue === void 0) { defaultValue = null; }
	        var self = this;
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            var queue = [];
	            self.subscribe(function (value) {
	                queue.push(value);
	                if (queue.length > 1) {
	                    queue.shift();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                if (queue.length === 0) {
	                    observer.next(defaultValue);
	                }
	                else {
	                    while (queue.length > 0) {
	                        observer.next(queue.shift());
	                    }
	                }
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.filter = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        if (this instanceof ClassMapUtils.getClass("FilterStream")) {
	            var self = this;
	            return self.internalFilter(predicate, thisArg);
	        }
	        return ClassMapUtils.getClass("FilterStream").create(this, predicate, thisArg);
	    };
	    Stream.prototype.filterWithState = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        if (this instanceof ClassMapUtils.getClass("FilterStream")) {
	            var self = this;
	            return self.internalFilter(predicate, thisArg);
	        }
	        return ClassMapUtils.getClass("FilterWithStateStream").create(this, predicate, thisArg);
	    };
	    Stream.prototype.concat = function () {
	        var args = null;
	        if (JudgeUtils$3.isArray(arguments[0])) {
	            args = arguments[0];
	        }
	        else {
	            args = Array.prototype.slice.call(arguments, 0);
	        }
	        args.unshift(this);
	        return ClassMapUtils.getClass("ConcatStream").create(args);
	    };
	    Stream.prototype.merge = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (JudgeUtils$3.isNumber(args[0])) {
	            var maxConcurrent = args[0];
	            return ClassMapUtils.getClass("MergeStream").create(this, maxConcurrent);
	        }
	        if (JudgeUtils$3.isArray(args[0])) {
	            args = arguments[0];
	        }
	        else {
	        }
	        var stream = null;
	        args.unshift(this);
	        stream = ClassMapUtils.getClass("Operator").fromArray(args).mergeAll();
	        return stream;
	    };
	    Stream.prototype.repeat = function (count) {
	        if (count === void 0) { count = -1; }
	        return ClassMapUtils.getClass("RepeatStream").create(this, count);
	    };
	    Stream.prototype.ignoreElements = function () {
	        return ClassMapUtils.getClass("IgnoreElementsStream").create(this);
	    };
	    Stream.prototype.handleSubject = function (subject) {
	        if (this._isSubject(subject)) {
	            this._setSubject(subject);
	            return true;
	        }
	        return false;
	    };
	    Stream.prototype._isSubject = function (subject) {
	        return subject instanceof Subject;
	    };
	    Stream.prototype._setSubject = function (subject) {
	        subject.source = this;
	    };
	    __decorate([
	        requireCheck$1(function (count) {
	            if (count === void 0) { count = 1; }
	            assert$1(count >= 0, Log$2.info.FUNC_SHOULD("count", ">= 0"));
	        })
	    ], Stream.prototype, "take", null);
	    __decorate([
	        requireCheck$1(function (count) {
	            if (count === void 0) { count = 1; }
	            assert$1(count >= 0, Log$2.info.FUNC_SHOULD("count", ">= 0"));
	        })
	    ], Stream.prototype, "takeLast", null);
	    return Stream;
	}(Entity));

	var BaseStream = (function (_super) {
	    __extends(BaseStream, _super);
	    function BaseStream() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BaseStream.prototype.subscribe = function (arg1, onError, onCompleted) {
	        var observer = null;
	        if (this.handleSubject(arg1)) {
	            return;
	        }
	        observer = arg1 instanceof Observer
	            ? AutoDetachObserver.create(arg1)
	            : AutoDetachObserver.create(arg1, onError, onCompleted);
	        observer.setDisposable(this.buildStream(observer));
	        return observer;
	    };
	    BaseStream.prototype.buildStream = function (observer) {
	        _super.prototype.buildStream.call(this, observer);
	        return this.subscribeCore(observer);
	    };
	    return BaseStream;
	}(Stream));

	var AnonymousObserver = (function (_super) {
	    __extends(AnonymousObserver, _super);
	    function AnonymousObserver() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AnonymousObserver.create = function (onNext, onError, onCompleted) {
	        return new this(onNext, onError, onCompleted);
	    };
	    AnonymousObserver.prototype.onNext = function (value) {
	        this.onUserNext(value);
	    };
	    AnonymousObserver.prototype.onError = function (error) {
	        this.onUserError(error);
	    };
	    AnonymousObserver.prototype.onCompleted = function () {
	        this.onUserCompleted();
	    };
	    return AnonymousObserver;
	}(Observer));

	var DoObserver = (function (_super) {
	    __extends(DoObserver, _super);
	    function DoObserver(currentObserver, prevObserver) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._currentObserver = null;
	        _this._prevObserver = null;
	        _this._currentObserver = currentObserver;
	        _this._prevObserver = prevObserver;
	        return _this;
	    }
	    DoObserver.create = function (currentObserver, prevObserver) {
	        return new this(currentObserver, prevObserver);
	    };
	    DoObserver.prototype.onNext = function (value) {
	        try {
	            this._prevObserver.next(value);
	        }
	        catch (e) {
	            this._prevObserver.error(e);
	            this._currentObserver.error(e);
	        }
	        finally {
	            this._currentObserver.next(value);
	        }
	    };
	    DoObserver.prototype.onError = function (error) {
	        try {
	            this._prevObserver.error(error);
	        }
	        catch (e) {
	        }
	        finally {
	            this._currentObserver.error(error);
	        }
	    };
	    DoObserver.prototype.onCompleted = function () {
	        try {
	            this._prevObserver.completed();
	        }
	        catch (e) {
	            this._prevObserver.error(e);
	            this._currentObserver.error(e);
	        }
	        finally {
	            this._currentObserver.completed();
	        }
	    };
	    return DoObserver;
	}(Observer));

	function registerClass$1(className) {
	    return function (target) {
	        ClassMapUtils.addClassMap(className, target);
	    };
	}

	var DoStream = (function (_super) {
	    __extends(DoStream, _super);
	    function DoStream(source, onNext, onError, onCompleted) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._observer = null;
	        _this._source = source;
	        _this._observer = AnonymousObserver.create(onNext, onError, onCompleted);
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    DoStream.create = function (source, onNext, onError, onCompleted) {
	        var obj = new this(source, onNext, onError, onCompleted);
	        return obj;
	    };
	    DoStream.prototype.subscribeCore = function (observer) {
	        return this._source.buildStream(DoObserver.create(observer, this._observer));
	    };
	    DoStream = __decorate([
	        registerClass$1("DoStream")
	    ], DoStream);
	    return DoStream;
	}(BaseStream));

	var GroupDisposable = (function (_super) {
	    __extends(GroupDisposable, _super);
	    function GroupDisposable(disposable) {
	        var _this = _super.call(this, "GroupDisposable") || this;
	        _this._group = Collection$1.create();
	        _this._isDisposed = false;
	        if (disposable) {
	            _this._group.addChild(disposable);
	        }
	        return _this;
	    }
	    GroupDisposable.create = function (disposable) {
	        var obj = new this(disposable);
	        return obj;
	    };
	    GroupDisposable.prototype.add = function (disposable) {
	        this._group.addChild(disposable);
	        return this;
	    };
	    GroupDisposable.prototype.remove = function (disposable) {
	        this._group.removeChild(disposable);
	        return this;
	    };
	    GroupDisposable.prototype.dispose = function () {
	        if (this._isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._group.forEach(function (disposable) {
	            disposable.dispose();
	        });
	    };
	    return GroupDisposable;
	}(Entity));

	var ConcatObserver = (function (_super) {
	    __extends(ConcatObserver, _super);
	    function ConcatObserver(currentObserver, startNextStream) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this.currentObserver = null;
	        _this._startNextStream = null;
	        _this.currentObserver = currentObserver;
	        _this._startNextStream = startNextStream;
	        return _this;
	    }
	    ConcatObserver.create = function (currentObserver, startNextStream) {
	        return new this(currentObserver, startNextStream);
	    };
	    ConcatObserver.prototype.onNext = function (value) {
	        this.currentObserver.next(value);
	    };
	    ConcatObserver.prototype.onError = function (error) {
	        this.currentObserver.error(error);
	    };
	    ConcatObserver.prototype.onCompleted = function () {
	        this._startNextStream();
	    };
	    return ConcatObserver;
	}(Observer));

	var ConcatStream = (function (_super) {
	    __extends(ConcatStream, _super);
	    function ConcatStream(sources) {
	        var _this = _super.call(this, null) || this;
	        _this._sources = Collection$1.create();
	        var self = _this;
	        _this.scheduler = sources[0].scheduler;
	        sources.forEach(function (source) {
	            if (JudgeUtils$3.isPromise(source)) {
	                self._sources.addChild(fromPromise(source));
	            }
	            else {
	                self._sources.addChild(source);
	            }
	        });
	        return _this;
	    }
	    ConcatStream.create = function (sources) {
	        var obj = new this(sources);
	        return obj;
	    };
	    ConcatStream.prototype.subscribeCore = function (observer) {
	        var self = this, count = this._sources.getCount(), d = GroupDisposable.create();
	        function loopRecursive(i) {
	            if (i === count) {
	                observer.completed();
	                return;
	            }
	            d.add(self._sources.getChild(i).buildStream(ConcatObserver.create(observer, function () {
	                loopRecursive(i + 1);
	            })));
	        }
	        this.scheduler.publishRecursive(observer, 0, loopRecursive);
	        return GroupDisposable.create(d);
	    };
	    ConcatStream = __decorate([
	        registerClass$1("ConcatStream")
	    ], ConcatStream);
	    return ConcatStream;
	}(BaseStream));

	var MapObserver = (function (_super) {
	    __extends(MapObserver, _super);
	    function MapObserver(currentObserver, selector) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._currentObserver = null;
	        _this._selector = null;
	        _this._currentObserver = currentObserver;
	        _this._selector = selector;
	        return _this;
	    }
	    MapObserver.create = function (currentObserver, selector) {
	        return new this(currentObserver, selector);
	    };
	    MapObserver.prototype.onNext = function (value) {
	        var result = null;
	        try {
	            result = this._selector(value);
	        }
	        catch (e) {
	            this._currentObserver.error(e);
	        }
	        finally {
	            this._currentObserver.next(result);
	        }
	    };
	    MapObserver.prototype.onError = function (error) {
	        this._currentObserver.error(error);
	    };
	    MapObserver.prototype.onCompleted = function () {
	        this._currentObserver.completed();
	    };
	    return MapObserver;
	}(Observer));

	var MapStream = (function (_super) {
	    __extends(MapStream, _super);
	    function MapStream(source, selector) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._selector = null;
	        _this._source = source;
	        _this.scheduler = _this._source.scheduler;
	        _this._selector = selector;
	        return _this;
	    }
	    MapStream.create = function (source, selector) {
	        var obj = new this(source, selector);
	        return obj;
	    };
	    MapStream.prototype.subscribeCore = function (observer) {
	        return this._source.buildStream(MapObserver.create(observer, this._selector));
	    };
	    MapStream = __decorate([
	        registerClass$1("MapStream")
	    ], MapStream);
	    return MapStream;
	}(BaseStream));

	var MergeAllObserver = (function (_super) {
	    __extends(MergeAllObserver, _super);
	    function MergeAllObserver(currentObserver, streamGroup, groupDisposable) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this.done = false;
	        _this.currentObserver = null;
	        _this._streamGroup = null;
	        _this._groupDisposable = null;
	        _this.currentObserver = currentObserver;
	        _this._streamGroup = streamGroup;
	        _this._groupDisposable = groupDisposable;
	        return _this;
	    }
	    MergeAllObserver.create = function (currentObserver, streamGroup, groupDisposable) {
	        return new this(currentObserver, streamGroup, groupDisposable);
	    };
	    MergeAllObserver.prototype.onNext = function (innerSource) {
	        if (JudgeUtils$3.isPromise(innerSource)) {
	            innerSource = fromPromise(innerSource);
	        }
	        this._streamGroup.addChild(innerSource);
	        this._groupDisposable.add(innerSource.buildStream(InnerObserver.create(this, this._streamGroup, innerSource)));
	    };
	    MergeAllObserver.prototype.onError = function (error) {
	        this.currentObserver.error(error);
	    };
	    MergeAllObserver.prototype.onCompleted = function () {
	        this.done = true;
	        if (this._streamGroup.getCount() === 0) {
	            this.currentObserver.completed();
	        }
	    };
	    __decorate([
	        requireCheck$1(function (innerSource) {
	            assert$1(innerSource instanceof Stream || JudgeUtils$3.isPromise(innerSource), Log$2.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
	        })
	    ], MergeAllObserver.prototype, "onNext", null);
	    return MergeAllObserver;
	}(Observer));
	var InnerObserver = (function (_super) {
	    __extends(InnerObserver, _super);
	    function InnerObserver(parent, streamGroup, currentStream) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._parent = null;
	        _this._streamGroup = null;
	        _this._currentStream = null;
	        _this._parent = parent;
	        _this._streamGroup = streamGroup;
	        _this._currentStream = currentStream;
	        return _this;
	    }
	    InnerObserver.create = function (parent, streamGroup, currentStream) {
	        var obj = new this(parent, streamGroup, currentStream);
	        return obj;
	    };
	    InnerObserver.prototype.onNext = function (value) {
	        this._parent.currentObserver.next(value);
	    };
	    InnerObserver.prototype.onError = function (error) {
	        this._parent.currentObserver.error(error);
	    };
	    InnerObserver.prototype.onCompleted = function () {
	        var currentStream = this._currentStream, parent = this._parent;
	        this._streamGroup.removeChild(function (stream) {
	            return JudgeUtils$3.isEqual(stream, currentStream);
	        });
	        if (this._isAsync() && this._streamGroup.getCount() === 0) {
	            parent.currentObserver.completed();
	        }
	    };
	    InnerObserver.prototype._isAsync = function () {
	        return this._parent.done;
	    };
	    return InnerObserver;
	}(Observer));

	var MergeAllStream = (function (_super) {
	    __extends(MergeAllStream, _super);
	    function MergeAllStream(source) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._observer = null;
	        _this._source = source;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    MergeAllStream.create = function (source) {
	        var obj = new this(source);
	        return obj;
	    };
	    MergeAllStream.prototype.subscribeCore = function (observer) {
	        var streamGroup = Collection$1.create(), groupDisposable = GroupDisposable.create();
	        this._source.buildStream(MergeAllObserver.create(observer, streamGroup, groupDisposable));
	        return groupDisposable;
	    };
	    MergeAllStream = __decorate([
	        registerClass$1("MergeAllStream")
	    ], MergeAllStream);
	    return MergeAllStream;
	}(BaseStream));

	var SkipUntilOtherObserver = (function (_super) {
	    __extends(SkipUntilOtherObserver, _super);
	    function SkipUntilOtherObserver(prevObserver, skipUntilStream) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this.otherDisposable = null;
	        _this._prevObserver = null;
	        _this._skipUntilStream = null;
	        _this._prevObserver = prevObserver;
	        _this._skipUntilStream = skipUntilStream;
	        return _this;
	    }
	    SkipUntilOtherObserver.create = function (prevObserver, skipUntilStream) {
	        return new this(prevObserver, skipUntilStream);
	    };
	    SkipUntilOtherObserver.prototype.onNext = function (value) {
	        this._skipUntilStream.isOpen = true;
	        this.otherDisposable.dispose();
	    };
	    SkipUntilOtherObserver.prototype.onError = function (error) {
	        this._prevObserver.error(error);
	    };
	    SkipUntilOtherObserver.prototype.onCompleted = function () {
	        this.otherDisposable.dispose();
	    };
	    return SkipUntilOtherObserver;
	}(Observer));

	var SkipUntilSourceObserver = (function (_super) {
	    __extends(SkipUntilSourceObserver, _super);
	    function SkipUntilSourceObserver(prevObserver, skipUntilStream) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._prevObserver = null;
	        _this._skipUntilStream = null;
	        _this._prevObserver = prevObserver;
	        _this._skipUntilStream = skipUntilStream;
	        return _this;
	    }
	    SkipUntilSourceObserver.create = function (prevObserver, skipUntilStream) {
	        return new this(prevObserver, skipUntilStream);
	    };
	    SkipUntilSourceObserver.prototype.onNext = function (value) {
	        if (this._skipUntilStream.isOpen) {
	            this._prevObserver.next(value);
	        }
	    };
	    SkipUntilSourceObserver.prototype.onError = function (error) {
	        this._prevObserver.error(error);
	    };
	    SkipUntilSourceObserver.prototype.onCompleted = function () {
	        if (this._skipUntilStream.isOpen) {
	            this._prevObserver.completed();
	        }
	    };
	    return SkipUntilSourceObserver;
	}(Observer));

	var SkipUntilStream = (function (_super) {
	    __extends(SkipUntilStream, _super);
	    function SkipUntilStream(source, otherStream) {
	        var _this = _super.call(this, null) || this;
	        _this.isOpen = false;
	        _this._source = null;
	        _this._otherStream = null;
	        _this._source = source;
	        _this._otherStream = JudgeUtils$3.isPromise(otherStream) ? fromPromise(otherStream) : otherStream;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    SkipUntilStream.create = function (source, otherSteam) {
	        var obj = new this(source, otherSteam);
	        return obj;
	    };
	    SkipUntilStream.prototype.subscribeCore = function (observer) {
	        var group = GroupDisposable.create(), otherDisposable = null, skipUntilOtherObserver = null;
	        group.add(this._source.buildStream(SkipUntilSourceObserver.create(observer, this)));
	        skipUntilOtherObserver = SkipUntilOtherObserver.create(observer, this);
	        otherDisposable = this._otherStream.buildStream(skipUntilOtherObserver);
	        skipUntilOtherObserver.otherDisposable = otherDisposable;
	        group.add(otherDisposable);
	        return group;
	    };
	    SkipUntilStream = __decorate([
	        registerClass$1("SkipUntilStream")
	    ], SkipUntilStream);
	    return SkipUntilStream;
	}(BaseStream));

	var TakeUntilObserver = (function (_super) {
	    __extends(TakeUntilObserver, _super);
	    function TakeUntilObserver(prevObserver) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._prevObserver = null;
	        _this._prevObserver = prevObserver;
	        return _this;
	    }
	    TakeUntilObserver.create = function (prevObserver) {
	        return new this(prevObserver);
	    };
	    TakeUntilObserver.prototype.onNext = function (value) {
	        this._prevObserver.completed();
	    };
	    TakeUntilObserver.prototype.onError = function (error) {
	        this._prevObserver.error(error);
	    };
	    TakeUntilObserver.prototype.onCompleted = function () {
	    };
	    return TakeUntilObserver;
	}(Observer));

	var TakeUntilStream = (function (_super) {
	    __extends(TakeUntilStream, _super);
	    function TakeUntilStream(source, otherStream) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._otherStream = null;
	        _this._source = source;
	        _this._otherStream = JudgeUtils$3.isPromise(otherStream) ? fromPromise(otherStream) : otherStream;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    TakeUntilStream.create = function (source, otherSteam) {
	        var obj = new this(source, otherSteam);
	        return obj;
	    };
	    TakeUntilStream.prototype.subscribeCore = function (observer) {
	        var group = GroupDisposable.create(), autoDetachObserver = AutoDetachObserver.create(observer), sourceDisposable = null;
	        sourceDisposable = this._source.buildStream(observer);
	        group.add(sourceDisposable);
	        autoDetachObserver.setDisposable(sourceDisposable);
	        group.add(this._otherStream.buildStream(TakeUntilObserver.create(autoDetachObserver)));
	        return group;
	    };
	    TakeUntilStream = __decorate([
	        registerClass$1("TakeUntilStream")
	    ], TakeUntilStream);
	    return TakeUntilStream;
	}(BaseStream));

	var FilterObserver = (function (_super) {
	    __extends(FilterObserver, _super);
	    function FilterObserver(prevObserver, predicate, source) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this.prevObserver = null;
	        _this.source = null;
	        _this.i = 0;
	        _this.predicate = null;
	        _this.prevObserver = prevObserver;
	        _this.predicate = predicate;
	        _this.source = source;
	        return _this;
	    }
	    FilterObserver.create = function (prevObserver, predicate, source) {
	        return new this(prevObserver, predicate, source);
	    };
	    FilterObserver.prototype.onNext = function (value) {
	        try {
	            if (this.predicate(value, this.i++, this.source)) {
	                this.prevObserver.next(value);
	            }
	        }
	        catch (e) {
	            this.prevObserver.error(e);
	        }
	    };
	    FilterObserver.prototype.onError = function (error) {
	        this.prevObserver.error(error);
	    };
	    FilterObserver.prototype.onCompleted = function () {
	        this.prevObserver.completed();
	    };
	    return FilterObserver;
	}(Observer));

	var FilterStream = (function (_super) {
	    __extends(FilterStream, _super);
	    function FilterStream(source, predicate, thisArg) {
	        var _this = _super.call(this, null) || this;
	        _this.predicate = null;
	        _this._source = null;
	        _this._source = source;
	        _this.predicate = FunctionUtils.bind(thisArg, predicate);
	        return _this;
	    }
	    FilterStream_1 = FilterStream;
	    FilterStream.create = function (source, predicate, thisArg) {
	        var obj = new this(source, predicate, thisArg);
	        return obj;
	    };
	    FilterStream.prototype.subscribeCore = function (observer) {
	        return this._source.subscribe(this.createObserver(observer));
	    };
	    FilterStream.prototype.internalFilter = function (predicate, thisArg) {
	        return this.createStreamForInternalFilter(this._source, this._innerPredicate(predicate, this), thisArg);
	    };
	    FilterStream.prototype.createObserver = function (observer) {
	        return FilterObserver.create(observer, this.predicate, this);
	    };
	    FilterStream.prototype.createStreamForInternalFilter = function (source, innerPredicate, thisArg) {
	        return FilterStream_1.create(source, innerPredicate, thisArg);
	    };
	    FilterStream.prototype._innerPredicate = function (predicate, self) {
	        var _this = this;
	        return function (value, i, o) {
	            return self.predicate(value, i, o) && predicate.call(_this, value, i, o);
	        };
	    };
	    FilterStream = FilterStream_1 = __decorate([
	        registerClass$1("FilterStream")
	    ], FilterStream);
	    return FilterStream;
	    var FilterStream_1;
	}(BaseStream));

	var FilterState;
	(function (FilterState) {
	    FilterState[FilterState["TRIGGER"] = 0] = "TRIGGER";
	    FilterState[FilterState["ENTER"] = 1] = "ENTER";
	    FilterState[FilterState["LEAVE"] = 2] = "LEAVE";
	})(FilterState || (FilterState = {}));

	var FilterWithStateObserver = (function (_super) {
	    __extends(FilterWithStateObserver, _super);
	    function FilterWithStateObserver() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._isTrigger = false;
	        return _this;
	    }
	    FilterWithStateObserver.create = function (prevObserver, predicate, source) {
	        return new this(prevObserver, predicate, source);
	    };
	    FilterWithStateObserver.prototype.onNext = function (value) {
	        var data = null;
	        try {
	            if (this.predicate(value, this.i++, this.source)) {
	                if (!this._isTrigger) {
	                    data = {
	                        value: value,
	                        state: FilterState.ENTER
	                    };
	                }
	                else {
	                    data = {
	                        value: value,
	                        state: FilterState.TRIGGER
	                    };
	                }
	                this.prevObserver.next(data);
	                this._isTrigger = true;
	            }
	            else {
	                if (this._isTrigger) {
	                    data = {
	                        value: value,
	                        state: FilterState.LEAVE
	                    };
	                    this.prevObserver.next(data);
	                }
	                this._isTrigger = false;
	            }
	        }
	        catch (e) {
	            this.prevObserver.error(e);
	        }
	    };
	    return FilterWithStateObserver;
	}(FilterObserver));

	var FilterWithStateStream = (function (_super) {
	    __extends(FilterWithStateStream, _super);
	    function FilterWithStateStream() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    FilterWithStateStream_1 = FilterWithStateStream;
	    FilterWithStateStream.create = function (source, predicate, thisArg) {
	        var obj = new this(source, predicate, thisArg);
	        return obj;
	    };
	    FilterWithStateStream.prototype.createObserver = function (observer) {
	        return FilterWithStateObserver.create(observer, this.predicate, this);
	    };
	    FilterWithStateStream.prototype.createStreamForInternalFilter = function (source, innerPredicate, thisArg) {
	        return FilterWithStateStream_1.create(source, innerPredicate, thisArg);
	    };
	    FilterWithStateStream = FilterWithStateStream_1 = __decorate([
	        registerClass$1("FilterWithStateStream")
	    ], FilterWithStateStream);
	    return FilterWithStateStream;
	    var FilterWithStateStream_1;
	}(FilterStream));

	var MergeObserver = (function (_super) {
	    __extends(MergeObserver, _super);
	    function MergeObserver(currentObserver, maxConcurrent, streamGroup, groupDisposable) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this.done = false;
	        _this.currentObserver = null;
	        _this.activeCount = 0;
	        _this.q = [];
	        _this._maxConcurrent = null;
	        _this._groupDisposable = null;
	        _this._streamGroup = null;
	        _this.currentObserver = currentObserver;
	        _this._maxConcurrent = maxConcurrent;
	        _this._streamGroup = streamGroup;
	        _this._groupDisposable = groupDisposable;
	        return _this;
	    }
	    MergeObserver.create = function (currentObserver, maxConcurrent, streamGroup, groupDisposable) {
	        return new this(currentObserver, maxConcurrent, streamGroup, groupDisposable);
	    };
	    MergeObserver.prototype.handleSubscribe = function (innerSource) {
	        if (JudgeUtils$3.isPromise(innerSource)) {
	            innerSource = fromPromise(innerSource);
	        }
	        this._streamGroup.addChild(innerSource);
	        this._groupDisposable.add(innerSource.buildStream(InnerObserver$1.create(this, this._streamGroup, innerSource)));
	    };
	    MergeObserver.prototype.onNext = function (innerSource) {
	        if (this._isReachMaxConcurrent()) {
	            this.activeCount++;
	            this.handleSubscribe(innerSource);
	            return;
	        }
	        this.q.push(innerSource);
	    };
	    MergeObserver.prototype.onError = function (error) {
	        this.currentObserver.error(error);
	    };
	    MergeObserver.prototype.onCompleted = function () {
	        this.done = true;
	        if (this._streamGroup.getCount() === 0) {
	            this.currentObserver.completed();
	        }
	    };
	    MergeObserver.prototype._isReachMaxConcurrent = function () {
	        return this.activeCount < this._maxConcurrent;
	    };
	    __decorate([
	        requireCheck$1(function (innerSource) {
	            assert$1(innerSource instanceof Stream || JudgeUtils$3.isPromise(innerSource), Log$2.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
	        })
	    ], MergeObserver.prototype, "onNext", null);
	    return MergeObserver;
	}(Observer));
	var InnerObserver$1 = (function (_super) {
	    __extends(InnerObserver, _super);
	    function InnerObserver(parent, streamGroup, currentStream) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._parent = null;
	        _this._streamGroup = null;
	        _this._currentStream = null;
	        _this._parent = parent;
	        _this._streamGroup = streamGroup;
	        _this._currentStream = currentStream;
	        return _this;
	    }
	    InnerObserver.create = function (parent, streamGroup, currentStream) {
	        var obj = new this(parent, streamGroup, currentStream);
	        return obj;
	    };
	    InnerObserver.prototype.onNext = function (value) {
	        this._parent.currentObserver.next(value);
	    };
	    InnerObserver.prototype.onError = function (error) {
	        this._parent.currentObserver.error(error);
	    };
	    InnerObserver.prototype.onCompleted = function () {
	        var parent = this._parent;
	        this._streamGroup.removeChild(this._currentStream);
	        if (parent.q.length > 0) {
	            parent.activeCount = 0;
	            parent.handleSubscribe(parent.q.shift());
	        }
	        else {
	            if (this._isAsync() && this._streamGroup.getCount() === 0) {
	                parent.currentObserver.completed();
	            }
	        }
	    };
	    InnerObserver.prototype._isAsync = function () {
	        return this._parent.done;
	    };
	    return InnerObserver;
	}(Observer));

	var MergeStream = (function (_super) {
	    __extends(MergeStream, _super);
	    function MergeStream(source, maxConcurrent) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._maxConcurrent = null;
	        _this._source = source;
	        _this._maxConcurrent = maxConcurrent;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    MergeStream.create = function (source, maxConcurrent) {
	        var obj = new this(source, maxConcurrent);
	        return obj;
	    };
	    MergeStream.prototype.subscribeCore = function (observer) {
	        var streamGroup = Collection$1.create(), groupDisposable = GroupDisposable.create();
	        this._source.buildStream(MergeObserver.create(observer, this._maxConcurrent, streamGroup, groupDisposable));
	        return groupDisposable;
	    };
	    MergeStream = __decorate([
	        registerClass$1("MergeStream")
	    ], MergeStream);
	    return MergeStream;
	}(BaseStream));

	var RepeatStream = (function (_super) {
	    __extends(RepeatStream, _super);
	    function RepeatStream(source, count) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._count = null;
	        _this._source = source;
	        _this._count = count;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    RepeatStream.create = function (source, count) {
	        var obj = new this(source, count);
	        return obj;
	    };
	    RepeatStream.prototype.subscribeCore = function (observer) {
	        var self = this, d = GroupDisposable.create();
	        function loopRecursive(count) {
	            if (count === 0) {
	                observer.completed();
	                return;
	            }
	            d.add(self._source.buildStream(ConcatObserver.create(observer, function () {
	                loopRecursive(count - 1);
	            })));
	        }
	        this.scheduler.publishRecursive(observer, this._count, loopRecursive);
	        return GroupDisposable.create(d);
	    };
	    RepeatStream = __decorate([
	        registerClass$1("RepeatStream")
	    ], RepeatStream);
	    return RepeatStream;
	}(BaseStream));

	var IgnoreElementsObserver = (function (_super) {
	    __extends(IgnoreElementsObserver, _super);
	    function IgnoreElementsObserver(currentObserver) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._currentObserver = null;
	        _this._currentObserver = currentObserver;
	        return _this;
	    }
	    IgnoreElementsObserver.create = function (currentObserver) {
	        return new this(currentObserver);
	    };
	    IgnoreElementsObserver.prototype.onNext = function (value) {
	    };
	    IgnoreElementsObserver.prototype.onError = function (error) {
	        this._currentObserver.error(error);
	    };
	    IgnoreElementsObserver.prototype.onCompleted = function () {
	        this._currentObserver.completed();
	    };
	    return IgnoreElementsObserver;
	}(Observer));

	var IgnoreElementsStream = (function (_super) {
	    __extends(IgnoreElementsStream, _super);
	    function IgnoreElementsStream(source) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._source = source;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    IgnoreElementsStream.create = function (source) {
	        var obj = new this(source);
	        return obj;
	    };
	    IgnoreElementsStream.prototype.subscribeCore = function (observer) {
	        return this._source.buildStream(IgnoreElementsObserver.create(observer));
	    };
	    IgnoreElementsStream = __decorate([
	        registerClass$1("IgnoreElementsStream")
	    ], IgnoreElementsStream);
	    return IgnoreElementsStream;
	}(BaseStream));

	var root$3;
	if (JudgeUtils$3.isNodeJs() && typeof global != "undefined") {
	    root$3 = global;
	}
	else if (typeof window != "undefined") {
	    root$3 = window;
	}
	else if (typeof self != "undefined") {
	    root$3 = self;
	}
	else {
	    Log$2.error("no avaliable root!");
	}

	root$3.requestNextAnimationFrame = (function () {
	    var originalRequestAnimationFrame = undefined, wrapper = undefined, callback = undefined, geckoVersion = null, userAgent = root$3.navigator && root$3.navigator.userAgent, index = 0, self = this;
	    wrapper = function (time) {
	        time = root$3.performance.now();
	        self.callback(time);
	    };
	    if (root$3.requestAnimationFrame) {
	        return requestAnimationFrame;
	    }
	    if (root$3.webkitRequestAnimationFrame) {
	        originalRequestAnimationFrame = root$3.webkitRequestAnimationFrame;
	        root$3.webkitRequestAnimationFrame = function (callback, element) {
	            self.callback = callback;
	            return originalRequestAnimationFrame(wrapper, element);
	        };
	    }
	    if (root$3.msRequestAnimationFrame) {
	        originalRequestAnimationFrame = root$3.msRequestAnimationFrame;
	        root$3.msRequestAnimationFrame = function (callback) {
	            self.callback = callback;
	            return originalRequestAnimationFrame(wrapper);
	        };
	    }
	    if (root$3.mozRequestAnimationFrame) {
	        index = userAgent.indexOf('rv:');
	        if (userAgent.indexOf('Gecko') != -1) {
	            geckoVersion = userAgent.substr(index + 3, 3);
	            if (geckoVersion === '2.0') {
	                root$3.mozRequestAnimationFrame = undefined;
	            }
	        }
	    }
	    return root$3.webkitRequestAnimationFrame ||
	        root$3.mozRequestAnimationFrame ||
	        root$3.oRequestAnimationFrame ||
	        root$3.msRequestAnimationFrame ||
	        function (callback, element) {
	            var start, finish;
	            root$3.setTimeout(function () {
	                start = root$3.performance.now();
	                callback(start);
	                finish = root$3.performance.now();
	                self.timeout = 1000 / 60 - (finish - start);
	            }, self.timeout);
	        };
	}());
	root$3.cancelNextRequestAnimationFrame = root$3.cancelRequestAnimationFrame
	    || root$3.webkitCancelAnimationFrame
	    || root$3.webkitCancelRequestAnimationFrame
	    || root$3.mozCancelRequestAnimationFrame
	    || root$3.oCancelRequestAnimationFrame
	    || root$3.msCancelRequestAnimationFrame
	    || clearTimeout;

	var Scheduler = (function () {
	    function Scheduler() {
	        this._requestLoopId = null;
	    }
	    Scheduler.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Scheduler.prototype, "requestLoopId", {
	        get: function () {
	            return this._requestLoopId;
	        },
	        set: function (requestLoopId) {
	            this._requestLoopId = requestLoopId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Scheduler.prototype.publishRecursive = function (observer, initial, action) {
	        action(initial);
	    };
	    Scheduler.prototype.publishInterval = function (observer, initial, interval, action) {
	        return root$3.setInterval(function () {
	            initial = action(initial);
	        }, interval);
	    };
	    Scheduler.prototype.publishIntervalRequest = function (observer, action) {
	        var self = this, loop = function (time) {
	            var isEnd = action(time);
	            if (isEnd) {
	                return;
	            }
	            self._requestLoopId = root$3.requestNextAnimationFrame(loop);
	        };
	        this._requestLoopId = root$3.requestNextAnimationFrame(loop);
	    };
	    Scheduler.prototype.publishTimeout = function (observer, time, action) {
	        return root$3.setTimeout(function () {
	            action(time);
	            observer.completed();
	        }, time);
	    };
	    return Scheduler;
	}());

	var AnonymousStream = (function (_super) {
	    __extends(AnonymousStream, _super);
	    function AnonymousStream(subscribeFunc) {
	        var _this = _super.call(this, subscribeFunc) || this;
	        _this.scheduler = Scheduler.create();
	        return _this;
	    }
	    AnonymousStream.create = function (subscribeFunc) {
	        var obj = new this(subscribeFunc);
	        return obj;
	    };
	    AnonymousStream.prototype.buildStream = function (observer) {
	        return SingleDisposable.create((this.subscribeFunc(observer) || function () { }));
	    };
	    AnonymousStream.prototype.subscribe = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var observer = null;
	        if (args[0] instanceof Subject) {
	            var subject = args[0];
	            this.handleSubject(subject);
	            return;
	        }
	        else if (JudgeUtils$3.isIObserver(args[0])) {
	            observer = AutoDetachObserver.create(args[0]);
	        }
	        else {
	            var onNext = args[0], onError = args[1] || null, onCompleted = args[2] || null;
	            observer = AutoDetachObserver.create(onNext, onError, onCompleted);
	        }
	        observer.setDisposable(this.buildStream(observer));
	        return observer;
	    };
	    return AnonymousStream;
	}(Stream));

	var FromArrayStream = (function (_super) {
	    __extends(FromArrayStream, _super);
	    function FromArrayStream(array, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._array = null;
	        _this._array = array;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    FromArrayStream.create = function (array, scheduler) {
	        var obj = new this(array, scheduler);
	        return obj;
	    };
	    FromArrayStream.prototype.subscribeCore = function (observer) {
	        var array = this._array, len = array.length;
	        function loopRecursive(i) {
	            if (i < len) {
	                observer.next(array[i]);
	                loopRecursive(i + 1);
	            }
	            else {
	                observer.completed();
	            }
	        }
	        this.scheduler.publishRecursive(observer, 0, loopRecursive);
	        return SingleDisposable.create();
	    };
	    return FromArrayStream;
	}(BaseStream));

	var FromPromiseStream = (function (_super) {
	    __extends(FromPromiseStream, _super);
	    function FromPromiseStream(promise, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._promise = null;
	        _this._promise = promise;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    FromPromiseStream.create = function (promise, scheduler) {
	        var obj = new this(promise, scheduler);
	        return obj;
	    };
	    FromPromiseStream.prototype.subscribeCore = function (observer) {
	        this._promise.then(function (data) {
	            observer.next(data);
	            observer.completed();
	        }, function (err) {
	            observer.error(err);
	        }, observer);
	        return SingleDisposable.create();
	    };
	    return FromPromiseStream;
	}(BaseStream));

	var FromEventPatternStream = (function (_super) {
	    __extends(FromEventPatternStream, _super);
	    function FromEventPatternStream(addHandler, removeHandler) {
	        var _this = _super.call(this, null) || this;
	        _this._addHandler = null;
	        _this._removeHandler = null;
	        _this._addHandler = addHandler;
	        _this._removeHandler = removeHandler;
	        return _this;
	    }
	    FromEventPatternStream.create = function (addHandler, removeHandler) {
	        var obj = new this(addHandler, removeHandler);
	        return obj;
	    };
	    FromEventPatternStream.prototype.subscribeCore = function (observer) {
	        var self = this;
	        function innerHandler(event) {
	            observer.next(event);
	        }
	        this._addHandler(innerHandler);
	        return SingleDisposable.create(function () {
	            self._removeHandler(innerHandler);
	        });
	    };
	    return FromEventPatternStream;
	}(BaseStream));

	var IntervalStream = (function (_super) {
	    __extends(IntervalStream, _super);
	    function IntervalStream(interval, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._interval = null;
	        _this._interval = interval;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    IntervalStream.create = function (interval, scheduler) {
	        var obj = new this(interval, scheduler);
	        obj.initWhenCreate();
	        return obj;
	    };
	    IntervalStream.prototype.initWhenCreate = function () {
	        this._interval = this._interval <= 0 ? 1 : this._interval;
	    };
	    IntervalStream.prototype.subscribeCore = function (observer) {
	        var self = this, id = null;
	        id = this.scheduler.publishInterval(observer, 0, this._interval, function (count) {
	            observer.next(count);
	            return count + 1;
	        });
	        return SingleDisposable.create(function () {
	            root$3.clearInterval(id);
	        });
	    };
	    return IntervalStream;
	}(BaseStream));

	var IntervalRequestStream = (function (_super) {
	    __extends(IntervalRequestStream, _super);
	    function IntervalRequestStream(scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._isEnd = false;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    IntervalRequestStream.create = function (scheduler) {
	        var obj = new this(scheduler);
	        return obj;
	    };
	    IntervalRequestStream.prototype.subscribeCore = function (observer) {
	        var self = this;
	        this.scheduler.publishIntervalRequest(observer, function (time) {
	            observer.next(time);
	            return self._isEnd;
	        });
	        return SingleDisposable.create(function () {
	            root$3.cancelNextRequestAnimationFrame(self.scheduler.requestLoopId);
	            self._isEnd = true;
	        });
	    };
	    return IntervalRequestStream;
	}(BaseStream));

	var TimeoutStream = (function (_super) {
	    __extends(TimeoutStream, _super);
	    function TimeoutStream(time, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._time = null;
	        _this._time = time;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    TimeoutStream.create = function (time, scheduler) {
	        var obj = new this(time, scheduler);
	        return obj;
	    };
	    TimeoutStream.prototype.subscribeCore = function (observer) {
	        var id = null;
	        id = this.scheduler.publishTimeout(observer, this._time, function (time) {
	            observer.next(time);
	        });
	        return SingleDisposable.create(function () {
	            root$3.clearTimeout(id);
	        });
	    };
	    __decorate([
	        requireCheck$1(function (time, scheduler) {
	            assert$1(time > 0, Log$2.info.FUNC_SHOULD("time", "> 0"));
	        })
	    ], TimeoutStream, "create", null);
	    return TimeoutStream;
	}(BaseStream));

	var DeferStream = (function (_super) {
	    __extends(DeferStream, _super);
	    function DeferStream(buildStreamFunc) {
	        var _this = _super.call(this, null) || this;
	        _this._buildStreamFunc = null;
	        _this._buildStreamFunc = buildStreamFunc;
	        return _this;
	    }
	    DeferStream.create = function (buildStreamFunc) {
	        var obj = new this(buildStreamFunc);
	        return obj;
	    };
	    DeferStream.prototype.subscribeCore = function (observer) {
	        var group = GroupDisposable.create();
	        group.add(this._buildStreamFunc().buildStream(observer));
	        return group;
	    };
	    return DeferStream;
	}(BaseStream));

	var Operator = (function () {
	    function Operator() {
	    }
	    Operator_1 = Operator;
	    Operator.empty = function () {
	        return Operator_1.createStream(function (observer) {
	            observer.completed();
	        });
	    };
	    Operator.createStream = function (subscribeFunc) {
	        return AnonymousStream.create(subscribeFunc);
	    };
	    Operator.fromArray = function (array, scheduler) {
	        if (scheduler === void 0) { scheduler = Scheduler.create(); }
	        return FromArrayStream.create(array, scheduler);
	    };
	    Operator = Operator_1 = __decorate([
	        registerClass$1("Operator")
	    ], Operator);
	    return Operator;
	    var Operator_1;
	}());
	var createStream = Operator.createStream;

	var fromArray = Operator.fromArray;
	var fromPromise = function (promise, scheduler) {
	    if (scheduler === void 0) { scheduler = Scheduler.create(); }
	    return FromPromiseStream.create(promise, scheduler);
	};


	var intervalRequest = function (scheduler) {
	    if (scheduler === void 0) { scheduler = Scheduler.create(); }
	    return IntervalRequestStream.create(scheduler);
	};

	var callFunc = function (func, context) {
	    if (context === void 0) { context = root$3; }
	    return createStream(function (observer) {
	        try {
	            observer.next(func.call(context, null));
	        }
	        catch (e) {
	            observer.error(e);
	        }
	        observer.completed();
	    });
	};

	var View = (function () {
	    function View() {
	    }
	    View.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(View.prototype, "dom", {
	        get: function () {
	            return getCanvas(getState(DirectorData));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "width", {
	        get: function () {
	            return getWidth$1(this.dom);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "height", {
	        get: function () {
	            return getHeight$1(this.dom);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "styleWidth", {
	        get: function () {
	            return getStyleWidth(this.dom);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "styleHeight", {
	        get: function () {
	            return getStyleHeight(this.dom);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "x", {
	        get: function () {
	            return getX(this.dom);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "y", {
	        get: function () {
	            return getY(this.dom);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    View = __decorate([
	        registerClass("View")
	    ], View);
	    return View;
	}());

	var DeviceManager = (function () {
	    function DeviceManager() {
	        this.view = View.create();
	    }
	    DeviceManager.getInstance = function () { };
	    Object.defineProperty(DeviceManager.prototype, "gl", {
	        get: function () {
	            return getGL$$1(DeviceManagerData, getState(DirectorData));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DeviceManager.prototype, "viewport", {
	        get: function () {
	            return getViewport$$1(getState(DirectorData));
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DeviceManager.prototype.createGL = function (canvasID, contextConfig) {
	        return createGL(canvasID, immutable_1(contextConfig), getState(DirectorData));
	    };
	    DeviceManager = __decorate([
	        singleton(),
	        registerClass("DeviceManager")
	    ], DeviceManager);
	    return DeviceManager;
	}());
	var setDeviceManagerGL = function (gl) {
	    return setGL$$1(gl, DeviceManagerData, getState(DirectorData));
	};

	var Hash = (function () {
	    function Hash(children) {
	        if (children === void 0) { children = {}; }
	        this._children = null;
	        this._children = children;
	    }
	    Hash.create = function (children) {
	        if (children === void 0) { children = {}; }
	        var obj = new this(children);
	        return obj;
	    };
	    Hash.prototype.getChildren = function () {
	        return this._children;
	    };
	    Hash.prototype.getCount = function () {
	        var result = 0, children = this._children, key = null;
	        for (key in children) {
	            if (children.hasOwnProperty(key)) {
	                result++;
	            }
	        }
	        return result;
	    };
	    Hash.prototype.getKeys = function () {
	        var result = Collection.create(), children = this._children, key = null;
	        for (key in children) {
	            if (children.hasOwnProperty(key)) {
	                result.addChild(key);
	            }
	        }
	        return result;
	    };
	    Hash.prototype.getValues = function () {
	        var result = Collection.create(), children = this._children, key = null;
	        for (key in children) {
	            if (children.hasOwnProperty(key)) {
	                result.addChild(children[key]);
	            }
	        }
	        return result;
	    };
	    Hash.prototype.getChild = function (key) {
	        return this._children[key];
	    };
	    Hash.prototype.setValue = function (key, value) {
	        this._children[key] = value;
	        return this;
	    };
	    Hash.prototype.addChild = function (key, value) {
	        this._children[key] = value;
	        return this;
	    };
	    Hash.prototype.addChildren = function (arg) {
	        var i = null, children = null;
	        if (arg instanceof Hash) {
	            children = arg.getChildren();
	        }
	        else {
	            children = arg;
	        }
	        for (i in children) {
	            if (children.hasOwnProperty(i)) {
	                this.addChild(i, children[i]);
	            }
	        }
	        return this;
	    };
	    Hash.prototype.appendChild = function (key, value) {
	        if (this._children[key] instanceof Collection) {
	            var c = (this._children[key]);
	            c.addChild(value);
	        }
	        else {
	            this._children[key] = (Collection.create().addChild(value));
	        }
	        return this;
	    };
	    Hash.prototype.setChildren = function (children) {
	        this._children = children;
	    };
	    Hash.prototype.removeChild = function (arg) {
	        var result = [];
	        if (JudgeUtils.isString(arg)) {
	            var key = arg;
	            result.push(this._children[key]);
	            this._children[key] = void 0;
	            delete this._children[key];
	        }
	        else if (JudgeUtils.isFunction(arg)) {
	            var func_1 = arg, self_1 = this;
	            this.forEach(function (val, key) {
	                if (func_1(val, key)) {
	                    result.push(self_1._children[key]);
	                    self_1._children[key] = void 0;
	                    delete self_1._children[key];
	                }
	            });
	        }
	        return Collection.create(result);
	    };
	    Hash.prototype.removeAllChildren = function () {
	        this._children = {};
	    };
	    Hash.prototype.hasChild = function (key) {
	        return this._children[key] !== void 0;
	    };
	    Hash.prototype.hasChildWithFunc = function (func) {
	        var result = false;
	        this.forEach(function (val, key) {
	            if (func(val, key)) {
	                result = true;
	                return $BREAK;
	            }
	        });
	        return result;
	    };
	    Hash.prototype.forEach = function (func, context) {
	        var children = this._children;
	        for (var i in children) {
	            if (children.hasOwnProperty(i)) {
	                if (func.call(context, children[i], i) === $BREAK) {
	                    break;
	                }
	            }
	        }
	        return this;
	    };
	    Hash.prototype.filter = function (func) {
	        var result = {}, children = this._children, value = null;
	        for (var key in children) {
	            if (children.hasOwnProperty(key)) {
	                value = children[key];
	                if (func.call(children, value, key)) {
	                    result[key] = value;
	                }
	            }
	        }
	        return Hash.create(result);
	    };
	    Hash.prototype.findOne = function (func) {
	        var result = [], self = this, scope = this._children;
	        this.forEach(function (val, key) {
	            if (!func.call(scope, val, key)) {
	                return;
	            }
	            result = [key, self.getChild(key)];
	            return $BREAK;
	        });
	        return result;
	    };
	    Hash.prototype.map = function (func) {
	        var resultMap = {};
	        this.forEach(function (val, key) {
	            var result = func(val, key);
	            if (result !== $REMOVE) {
	                Log$1.error(!JudgeUtils.isArray(result) || result.length !== 2, Log$1.info.FUNC_MUST_BE("iterator", "[key, value]"));
	                resultMap[result[0]] = result[1];
	            }
	        });
	        return Hash.create(resultMap);
	    };
	    Hash.prototype.toCollection = function () {
	        var result = Collection.create();
	        this.forEach(function (val, key) {
	            if (val instanceof Collection) {
	                result.addChildren(val);
	            }
	            else {
	                result.addChild(val);
	            }
	        });
	        return result;
	    };
	    Hash.prototype.toArray = function () {
	        var result = [];
	        this.forEach(function (val, key) {
	            if (val instanceof Collection) {
	                result = result.concat(val.getChildren());
	            }
	            else {
	                result.push(val);
	            }
	        });
	        return result;
	    };
	    Hash.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Hash.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils.isBoolean(args[0])) {
	                target = Hash.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils.extendDeep(this._children));
	        }
	        else {
	            target.setChildren(ExtendUtils.extend({}, this._children));
	        }
	        return target;
	    };
	    return Hash;
	}());

	var CommonTimeController = (function (_super) {
	    __extends(CommonTimeController, _super);
	    function CommonTimeController() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    CommonTimeController.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    CommonTimeController.prototype.getNow = function () {
	        if (Director.getInstance().isTimeChange) {
	            return Director.getInstance().elapsed;
	        }
	        return exports.root.performance.now();
	    };
	    CommonTimeController = __decorate([
	        registerClass("CommonTimeController")
	    ], CommonTimeController);
	    return CommonTimeController;
	}(TimeController));

	var Scheduler$1 = (function () {
	    function Scheduler() {
	        this._scheduleCount = 0;
	        this._schedules = Hash.create();
	    }
	    Scheduler.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Scheduler.prototype.update = function (elapsed) {
	        var _this = this;
	        this._schedules.forEach(function (scheduleItem, scheduleId) {
	            if (scheduleItem.isStop || scheduleItem.isPause) {
	                return;
	            }
	            scheduleItem.update(elapsed);
	            if (scheduleItem.isFinish) {
	                _this.remove(scheduleId);
	            }
	        });
	    };
	    Scheduler.prototype.scheduleLoop = function (task, args) {
	        if (args === void 0) { args = []; }
	        return this._schedule(LoopScheduleItem, Array.prototype.slice.call(arguments, 0));
	    };
	    Scheduler.prototype.scheduleFrame = function (task, frame, args) {
	        if (frame === void 0) { frame = 1; }
	        return this._schedule(FrameScheduleItem, Array.prototype.slice.call(arguments, 0));
	    };
	    Scheduler.prototype.scheduleInterval = function (task, time, args) {
	        if (time === void 0) { time = 0; }
	        return this._schedule(IntervalScheduleItem, Array.prototype.slice.call(arguments, 0));
	    };
	    Scheduler.prototype.scheduleTime = function (task, time, args) {
	        if (time === void 0) { time = 0; }
	        return this._schedule(TimeScheduleItem, Array.prototype.slice.call(arguments, 0));
	    };
	    Scheduler.prototype.pause = function (scheduleId) {
	        if (arguments.length === 0) {
	            var self_1 = this;
	            this._schedules.forEach(function (scheduleItem, scheduleId) {
	                self_1.pause(scheduleId);
	            });
	        }
	        else if (arguments.length === 1) {
	            var scheduleItem = this._schedules.getChild(arguments[0]);
	            scheduleItem.pause();
	        }
	    };
	    Scheduler.prototype.resume = function (scheduleId) {
	        if (arguments.length === 0) {
	            var self_2 = this;
	            this._schedules.forEach(function (scheduleItem, scheduleId) {
	                self_2.resume(scheduleId);
	            });
	        }
	        else if (arguments.length === 1) {
	            var scheduleItem = this._schedules.getChild(arguments[0]);
	            scheduleItem.resume();
	        }
	    };
	    Scheduler.prototype.start = function (scheduleId) {
	        if (arguments.length === 0) {
	            var self_3 = this;
	            this._schedules.forEach(function (scheduleItem, scheduleId) {
	                self_3.start(scheduleId);
	            });
	        }
	        else if (arguments.length === 1) {
	            var scheduleItem = this._schedules.getChild(arguments[0]);
	            scheduleItem.start();
	        }
	    };
	    Scheduler.prototype.stop = function (scheduleId) {
	        if (arguments.length === 0) {
	            var self_4 = this;
	            this._schedules.forEach(function (scheduleItem, scheduleId) {
	                self_4.stop(scheduleId);
	            });
	        }
	        else if (arguments.length === 1) {
	            var scheduleItem = this._schedules.getChild(arguments[0]);
	            scheduleItem.stop();
	        }
	    };
	    Scheduler.prototype.has = function (scheduleId) {
	        return !!this._schedules.hasChild(scheduleId);
	    };
	    Scheduler.prototype.remove = function (scheduleId) {
	        this._schedules.removeChild(scheduleId);
	    };
	    Scheduler.prototype.removeAll = function () {
	        this._schedules.removeAllChildren();
	    };
	    Scheduler.prototype._schedule = function (_class, args) {
	        var scheduleId = this._buildId();
	        this._schedules.setValue(scheduleId, _class.create.apply(_class, args));
	        return scheduleId;
	    };
	    Scheduler.prototype._buildId = function () {
	        return 'Schedule_' + (this._scheduleCount++);
	    };
	    return Scheduler;
	}());
	var ScheduleItem = (function () {
	    function ScheduleItem(task, args) {
	        this.isPause = false;
	        this.isStop = false;
	        this.pauseTime = null;
	        this.pauseElapsed = null;
	        this.startTime = null;
	        this.isFinish = false;
	        this.task = null;
	        this.args = null;
	        this.timeController = CommonTimeController.create();
	        this.task = task;
	        this.args = args;
	    }
	    ScheduleItem.prototype.pause = function () {
	        this.isPause = true;
	        this.timeController.pause();
	    };
	    ScheduleItem.prototype.resume = function () {
	        this.isPause = false;
	        this.timeController.resume();
	    };
	    ScheduleItem.prototype.start = function () {
	        this.isStop = false;
	        this.timeController.start();
	    };
	    ScheduleItem.prototype.stop = function () {
	        this.isStop = true;
	        this.timeController.stop();
	    };
	    ScheduleItem.prototype.finish = function () {
	        this.isFinish = true;
	    };
	    return ScheduleItem;
	}());
	var TimeScheduleItem = (function (_super) {
	    __extends(TimeScheduleItem, _super);
	    function TimeScheduleItem(task, time, args) {
	        if (time === void 0) { time = 0; }
	        if (args === void 0) { args = []; }
	        var _this = _super.call(this, task, args) || this;
	        _this._time = null;
	        _this._time = time;
	        return _this;
	    }
	    TimeScheduleItem.create = function (task, time, args) {
	        if (time === void 0) { time = 0; }
	        if (args === void 0) { args = []; }
	        var obj = new this(task, time, args);
	        return obj;
	    };
	    TimeScheduleItem.prototype.update = function (elapsed) {
	        var elapsed = this.timeController.computeElapseTime(elapsed);
	        if (elapsed >= this._time) {
	            this.task.apply(this, this.args);
	            this.finish();
	        }
	    };
	    return TimeScheduleItem;
	}(ScheduleItem));
	var IntervalScheduleItem = (function (_super) {
	    __extends(IntervalScheduleItem, _super);
	    function IntervalScheduleItem(task, time, args) {
	        if (time === void 0) { time = 0; }
	        if (args === void 0) { args = []; }
	        var _this = _super.call(this, task, args) || this;
	        _this._intervalTime = null;
	        _this._elapsed = 0;
	        _this._intervalTime = time;
	        return _this;
	    }
	    IntervalScheduleItem.create = function (task, time, args) {
	        if (time === void 0) { time = 0; }
	        if (args === void 0) { args = []; }
	        var obj = new this(task, time, args);
	        return obj;
	    };
	    IntervalScheduleItem.prototype.update = function (elapsed) {
	        var elapsed = this.timeController.computeElapseTime(elapsed);
	        if (elapsed - this._elapsed >= this._intervalTime) {
	            this.task.apply(this, this.args);
	            this._elapsed = elapsed;
	        }
	    };
	    IntervalScheduleItem.prototype.start = function () {
	        _super.prototype.start.call(this);
	        this._elapsed = 0;
	    };
	    return IntervalScheduleItem;
	}(ScheduleItem));
	var LoopScheduleItem = (function (_super) {
	    __extends(LoopScheduleItem, _super);
	    function LoopScheduleItem() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    LoopScheduleItem.create = function (task, args) {
	        if (args === void 0) { args = []; }
	        var obj = new this(task, args);
	        return obj;
	    };
	    LoopScheduleItem.prototype.update = function (elapsed) {
	        this.task.apply(this, this.args);
	    };
	    return LoopScheduleItem;
	}(ScheduleItem));
	var FrameScheduleItem = (function (_super) {
	    __extends(FrameScheduleItem, _super);
	    function FrameScheduleItem(task, frame, args) {
	        if (frame === void 0) { frame = 1; }
	        if (args === void 0) { args = []; }
	        var _this = _super.call(this, task, args) || this;
	        _this._frame = null;
	        _this._frame = frame;
	        return _this;
	    }
	    FrameScheduleItem.create = function (task, frame, args) {
	        if (frame === void 0) { frame = 1; }
	        if (args === void 0) { args = []; }
	        var obj = new this(task, frame, args);
	        return obj;
	    };
	    FrameScheduleItem.prototype.update = function (elapsed) {
	        this._frame--;
	        if (this._frame <= 0) {
	            this.task.apply(this, this.args);
	            this.finish();
	        }
	    };
	    return FrameScheduleItem;
	}(ScheduleItem));

	var addAddComponentHandle$7 = function (AmbientLight, DirectionLight) {
	    addAddComponentHandle$1(AmbientLight, addComponent$8);
	    addAddComponentHandle$1(DirectionLight, addComponent$10);
	    addAddComponentHandle$1(PointLight, addComponent$11);
	};
	var addDisposeHandle$7 = function (AmbientLight, DirectionLight) {
	    addDisposeHandle$1(AmbientLight, disposeComponent$8);
	    addDisposeHandle$1(DirectionLight, disposeComponent$10);
	    addDisposeHandle$1(PointLight, disposeComponent$11);
	};
	var initData$37 = function (AmbientLightData, DirectionLightData, PointLightData) {
	    initData$29(AmbientLightData);
	    initData$31(DirectionLightData);
	    initData$32(PointLightData);
	};

	var Director = (function () {
	    function Director() {
	        this.scene = create$5(GameObjectData);
	        this.scheduler = null;
	        this._gameLoop = null;
	        this._timeController = DirectorTimeController.create();
	    }
	    Director.getInstance = function () { };
	    
	    Object.defineProperty(Director.prototype, "view", {
	        get: function () {
	            return DeviceManager.getInstance().view;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Director.prototype.initWhenCreate = function () {
	        this.scheduler = Scheduler$1.create();
	    };
	    Director.prototype.start = function () {
	        this._startLoop();
	    };
	    Director.prototype._startLoop = function () {
	        var self = this;
	        this._gameLoop = this._buildInitStream()
	            .ignoreElements()
	            .concat(this._buildLoopStream())
	            .subscribe(function (time) {
	            setState(self._loopBody(time, getState(DirectorData)), DirectorData).run();
	        });
	    };
	    Director.prototype._buildInitStream = function () {
	        var _this = this;
	        return callFunc(function () {
	            setState(_this._init(getState(DirectorData)), DirectorData);
	        }, this);
	    };
	    Director.prototype._init = function (state) {
	        var resultState = state;
	        resultState = this._initSystem(resultState);
	        resultState = this._initRenderer(resultState);
	        this._timeController.start();
	        this.scheduler.start();
	        return resultState;
	    };
	    Director.prototype._initSystem = function (state) {
	        var resultState = init$2(GlobalTempData, ThreeDTransformData, state);
	        resultState = init$7(GeometryData, state);
	        resultState = init$1(PerspectiveCameraData, CameraData, CameraControllerData, state);
	        return resultState;
	    };
	    Director.prototype._initRenderer = function (state) {
	        var resultState = init$3(state);
	        return resultState;
	    };
	    Director.prototype._buildLoopStream = function () {
	        return intervalRequest();
	    };
	    Director.prototype._loopBody = function (time, state) {
	        var elapsed = null;
	        elapsed = this._timeController.computeElapseTime(time);
	        return run(elapsed, state, this._timeController, this.scheduler);
	    };
	    Director = __decorate([
	        singleton(true),
	        registerClass("Director")
	    ], Director);
	    return Director;
	}());
	addAddComponentHandle$6(BoxGeometry, CustomGeometry);
	addDisposeHandle$6(BoxGeometry, CustomGeometry);
	addInitHandle$2(BoxGeometry, CustomGeometry);
	addAddComponentHandle$5(BasicMaterial, LightMaterial);
	addDisposeHandle$5(BasicMaterial, LightMaterial);
	addInitHandle$1(BasicMaterial, LightMaterial);
	addAddComponentHandle$4(MeshRenderer);
	addDisposeHandle$4(MeshRenderer);
	addAddComponentHandle$3(Tag);
	addDisposeHandle$3(Tag);
	addAddComponentHandle$2(ThreeDTransform);
	addDisposeHandle$2(ThreeDTransform);
	addAddComponentHandle$$1(CameraController);
	addDisposeHandle$$1(CameraController);
	addAddComponentHandle$7(AmbientLight, DirectionLight);
	addDisposeHandle$7(AmbientLight, DirectionLight);

	var Scene = (function (_super) {
	    __extends(Scene, _super);
	    function Scene() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return Scene;
	}(GameObject));
	var addSceneChild = requireCheckFunc(function (scene, gameObject) {
	    it("scene should alive", function () {
	        wdet_1(isAlive$$1(scene, GameObjectData)).true;
	    });
	}, function (scene, gameObject) {
	    addChild$1(scene, gameObject, ThreeDTransformData, GameObjectData, SceneData);
	});
	var removeSceneChild = requireCheckFunc(function (scene, gameObject) {
	    it("scene should alive", function () {
	        wdet_1(isAlive$$1(scene, GameObjectData)).true;
	    });
	}, function (scene, gameObject) {
	    removeChild$1(scene, gameObject, ThreeDTransformData, GameObjectData);
	});

	var initData$39 = initData$11;

	var detect$1 = curry(function (getGL, DeviceManagerDataFromSystem, state) {
	    return GPUDetector.getInstance().detect(state, getGL, DeviceManagerDataFromSystem);
	});

	var createGL$1 = curry(function (canvas, renderWorker, contextConfig, viewportData) {
	    return IO.of(function () {
	        var offscreen = canvas.transferControlToOffscreen();
	        renderWorker.postMessage({
	            operateType: exports.EWorkerOperateType.INIT_GL,
	            canvas: offscreen,
	            options: contextConfig.get("options").toObject(),
	            viewportData: viewportData
	        }, [offscreen]);
	    });
	});
	var setContextConfig$2 = setContextConfig$1;
	var getGL$2 = getGL$1;
	var setGL$2 = setGL$1;
	var setPixelRatio$2 = setPixelRatio$1;
	var getViewport$2 = getViewport$1;
	var setViewport$2 = curry(function (viewportData, state) {
	    if (viewportData === null) {
	        return state;
	    }
	    return setViewport$1(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
	});
	var getViewportData = function (screenData, state) {
	    var oldViewportData = getViewport$2(state), x = screenData.x, y = screenData.y, width = screenData.width, height = screenData.height;
	    if (isValueExist(oldViewportData) && oldViewportData.x === x && oldViewportData.y === y && oldViewportData.width === width && oldViewportData.height === height) {
	        return null;
	    }
	    return {
	        x: x,
	        y: y,
	        width: width,
	        height: height
	    };
	};
	var setViewportOfGL$2 = curry(function (DeviceManagerWorkerData, _a, state) {
	    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
	    return IO.of(function () {
	        var gl = getGL$2(DeviceManagerWorkerData, state);
	        gl.viewport(x, y, width, height);
	        return state;
	    });
	});
	var setScreen$2 = curry(function (canvas, DeviceManagerWorkerData, state) {
	    return setScreen$1(canvas, _setScreenData$1, DeviceManagerWorkerData, state);
	});
	var _setScreenData$1 = curry(function (DeviceManagerWorkerData, canvas, state, data) {
	    var x = data.x, y = data.y, width = data.width, height = data.height, styleWidth = data.styleWidth, styleHeight = data.styleHeight;
	    return IO.of(function () {
	        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(canvas).run();
	        return data;
	    });
	});
	var setCanvasPixelRatio$2 = curry(function (useDevicePixelRatio, canvas) {
	    return IO.of(function () {
	        if (!useDevicePixelRatio) {
	            return null;
	        }
	        return setCanvasPixelRatio$1(useDevicePixelRatio, canvas).run();
	    });
	});



	var initData$40 = initData$20;

	var initDevice = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    initDevice = curry(function (contextConfig, state, configState, canvas) {
	        return IO.of(function () {
	            var screenData = setScreen$2(canvas, null, state).run(), viewportData = getViewportData(screenData, state);
	            createGL$1(canvas, getRenderWorker(WorkerInstanceData), contextConfig, viewportData).run();
	            return compose(setCanvas(canvas), setContextConfig$2(contextConfig), setViewport$2(viewportData), setPixelRatio$2(setCanvasPixelRatio$2(configState.get("useDevicePixelRatio"), canvas).run()))(state);
	        });
	    });
	}
	else {
	    initDevice = curry(function (contextConfig, state, configState, canvas) {
	        return compose(map(detect$1(getGL$$1, DeviceManagerData)), chain(setCanvasPixelRatio$$1(configState.get("useDevicePixelRatio"), canvas)), chain(setScreen$$1(canvas, DeviceManagerData)), createGL)(canvas, contextConfig, DeviceManagerData, state);
	    });
	}
	var createCanvas = curry(function (DomQuery, domID) {
	    return IO.of(function () {
	        if (domID !== "") {
	            return DomQuery.create(_getCanvasID(domID)).get(0);
	        }
	        return DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
	    });
	});
	var _getCanvasID = ensureFunc(function (id) {
	    it("dom id should be #string", function () {
	        wdet_1(/#[^#]+/.test(id)).true;
	    });
	}, function (domID) {
	    if (domID.indexOf('#') > -1) {
	        return domID;
	    }
	    return "#" + domID;
	});

	var getIsTest$1 = function (InitConfigDataFromSystem) {
	    return InitConfigDataFromSystem.isTest;
	};
	var setIsTest$1 = function (isTest, InitConfigDataFromSystem) {
	    return IO.of(function () {
	        InitConfigDataFromSystem.isTest = isTest;
	    });
	};

	var setLibIsTest = function (isTest) {
	    return IO.of(function () {
	        Main.isTest = isTest;
	    });
	};
	var getIsTest$$1 = getIsTest$1;
	var setIsTest$$1 = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    setIsTest$$1 = function (isTest, InitConfigData, WorkerInstanceData) {
	        return IO.of(function () {
	            var renderWorker = getRenderWorker(WorkerInstanceData);
	            renderWorker.postMessage({
	                operateType: exports.EWorkerOperateType.INIT_CONFIG,
	                isTest: isTest
	            });
	        });
	    };
	}
	else {
	    setIsTest$$1 = function (isTest, InitConfigData, WorkerInstanceData) {
	        return setIsTest$1(isTest, InitConfigData);
	    };
	}

	var setConfig = function (closeContractTest, InitConfigData, WorkerDetectData, WorkerInstanceData, _a) {
	    var _b = _a.canvasID, canvasID = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? exports.EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
	        options: {
	            alpha: true,
	            depth: true,
	            stencil: false,
	            antialias: true,
	            premultipliedAlpha: true,
	            preserveDrawingBuffer: false
	        }
	    } : _f, _g = _a.workerConfig, workerConfig = _g === void 0 ? {
	        renderWorkerFileDir: "/Wonder.js/dist/worker/"
	    } : _g;
	    return IO.of(function () {
	        var _isTest = false;
	        if (CompileConfig.closeContractTest) {
	            _isTest = false;
	            setLibIsTest(false).run();
	        }
	        else {
	            _isTest = isTest;
	            setLibIsTest(isTest).run();
	        }
	        setWorkerConfig(workerConfig, WorkerDetectData).run();
	        initWorkInstances(WorkerInstanceData);
	        setIsTest$$1(_isTest, InitConfigData, WorkerInstanceData).run();
	        return immutable_1({
	            Main: {
	                screenSize: screenSize
	            },
	            config: {
	                canvasID: canvasID,
	                contextConfig: {
	                    options: ExtendUtils.extend({
	                        alpha: true,
	                        depth: true,
	                        stencil: false,
	                        antialias: true,
	                        premultipliedAlpha: true,
	                        preserveDrawingBuffer: false
	                    }, contextConfig.options)
	                },
	                useDevicePixelRatio: useDevicePixelRatio
	            }
	        });
	    });
	};
	var init$8 = requireCheckFunc(function (gameState, configState, DomQuery) {
	    it("should set config before", function () {
	        wdet_1(configState.get("useDevicePixelRatio")).exist;
	    });
	}, function (gameState, configState, DomQuery) {
	    return compose(chain(initDevice(configState.get("contextConfig"), gameState, configState)), createCanvas(DomQuery))(configState.get("canvasID"));
	});
	var initData$38 = null;
	if (isSupportRenderWorkerAndSharedArrayBuffer()) {
	    initData$38 = function () {
	        _initData();
	    };
	}
	else {
	    initData$38 = function () {
	        _initData();
	        initData$39(ProgramData);
	        initData$22(LocationData);
	        initData$23(GLSLSenderData);
	        initData$18(ArrayBufferData);
	        initData$21(IndexBufferData);
	        initData$35(DrawRenderCommandBufferData);
	    };
	}
	var _initData = function () {
	    initData$10(ShaderData);
	    initData$17(DataBufferConfig, GeometryData);
	    initData$9(TextureCacheData, TextureData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData);
	    initData$6(MeshRendererData);
	    initData$5(TagData);
	    initData$4(GlobalTempData, ThreeDTransformData);
	    initData$8(SceneData);
	    initData$2(CameraControllerData, PerspectiveCameraData, CameraData);
	    initData$3(GameObjectData);
	    initData$7(DataBufferConfig, RenderCommandBufferData);
	    initData$37(AmbientLightData, DirectionLightData, PointLightData);
	    initData$34(SendDrawRenderCommandBufferData);
	};

	var Main$1 = (function () {
	    function Main() {
	    }
	    Object.defineProperty(Main, "isTest", {
	        get: function () {
	            return getIsTest$$1(InitConfigData);
	        },
	        set: function (isTest) {
	            setIsTest$$1(isTest, InitConfigData, WorkerInstanceData).run();
	            setLibIsTest(isTest).run();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Main.setConfig = function (configState) {
	        this._configState = setConfig(CompileConfig.closeContractTest, InitConfigData, WorkerDetectData, WorkerInstanceData, configState).run();
	        setState(getState(DirectorData).set("Main", this._configState.get("Main")), DirectorData).run();
	        return this;
	    };
	    Main.init = function () {
	        initData$38();
	        setState(init$8(getState(DirectorData), this._configState.get("config"), DomQuery).run(), DirectorData).run();
	        return this;
	    };
	    Main._configState = null;
	    __decorate([
	        requireCheck(function () {
	            it("configState should exist", function () {
	                wdet_1(Main._configState).exist;
	            });
	        })
	    ], Main, "init", null);
	    return Main;
	}());

	function execOnlyOnce(flagName) {
	    return function (target, name, descriptor) {
	        var value = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = null;
	            if (this[flagName]) {
	                return;
	            }
	            this[flagName] = true;
	            return value.apply(this, args);
	        };
	        return descriptor;
	    };
	}

	function virtual(target, name, descriptor) {
	    return descriptor;
	}

	(function (ELightWorkerDataOperateType) {
	    ELightWorkerDataOperateType[ELightWorkerDataOperateType["ADD"] = 0] = "ADD";
	    ELightWorkerDataOperateType[ELightWorkerDataOperateType["EDIT"] = 1] = "EDIT";
	    ELightWorkerDataOperateType[ELightWorkerDataOperateType["DISPOSE"] = 2] = "DISPOSE";
	})(exports.ELightWorkerDataOperateType || (exports.ELightWorkerDataOperateType = {}));

	var DeviceManagerWorkerData = (function () {
	    function DeviceManagerWorkerData() {
	    }
	    DeviceManagerWorkerData.gl = null;
	    DeviceManagerWorkerData.clearColor = null;
	    DeviceManagerWorkerData.writeRed = null;
	    DeviceManagerWorkerData.writeGreen = null;
	    DeviceManagerWorkerData.writeBlue = null;
	    DeviceManagerWorkerData.writeAlpha = null;
	    DeviceManagerWorkerData.side = null;
	    return DeviceManagerWorkerData;
	}());

	var ArrayBufferWorkerData = (function () {
	    function ArrayBufferWorkerData() {
	    }
	    ArrayBufferWorkerData.vertexBuffer = null;
	    ArrayBufferWorkerData.normalBuffers = null;
	    ArrayBufferWorkerData.texCoordBuffers = null;
	    return ArrayBufferWorkerData;
	}());

	var IndexBufferWorkerData = (function () {
	    function IndexBufferWorkerData() {
	    }
	    IndexBufferWorkerData.buffers = null;
	    return IndexBufferWorkerData;
	}());

	var DrawRenderCommandBufferWorkerData = (function () {
	    function DrawRenderCommandBufferWorkerData() {
	    }
	    DrawRenderCommandBufferWorkerData.mMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferWorkerData.vMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferWorkerData.pMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferWorkerData.normalMatrixFloatArrayForSend = null;
	    DrawRenderCommandBufferWorkerData.cameraPositionForSend = null;
	    DrawRenderCommandBufferWorkerData.mMatrices = null;
	    DrawRenderCommandBufferWorkerData.materialIndices = null;
	    DrawRenderCommandBufferWorkerData.shaderIndices = null;
	    DrawRenderCommandBufferWorkerData.geometryIndices = null;
	    DrawRenderCommandBufferWorkerData.vMatrices = null;
	    DrawRenderCommandBufferWorkerData.pMatrices = null;
	    DrawRenderCommandBufferWorkerData.cameraPositions = null;
	    DrawRenderCommandBufferWorkerData.normalMatrices = null;
	    return DrawRenderCommandBufferWorkerData;
	}());

	var GeometryWorkerData = (function () {
	    function GeometryWorkerData() {
	    }
	    GeometryWorkerData.verticesCacheMap = null;
	    GeometryWorkerData.normalsCacheMap = null;
	    GeometryWorkerData.texCoordsCacheMap = null;
	    GeometryWorkerData.indicesCacheMap = null;
	    GeometryWorkerData.vertices = null;
	    GeometryWorkerData.normals = null;
	    GeometryWorkerData.texCoords = null;
	    GeometryWorkerData.indices = null;
	    return GeometryWorkerData;
	}());

	var initGL = function (data) {
	    return compose(map(detect$1(getGL$2, DeviceManagerWorkerData)), chain(setViewportOfGL$2(DeviceManagerWorkerData, data.viewportData)), _createGL(data.canvas, data.options, DeviceManagerWorkerData))(createState());
	};
	var _createGL = curry(function (canvas, options, DeviceManagerWorkerData$$1, state) {
	    return IO.of(function () {
	        var gl = _getContext(canvas, options);
	        if (!gl) {
	            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
	        }
	        return compose(setCanvas(canvas), setContextConfig$2(options), setGL$2(gl, DeviceManagerWorkerData$$1))(state);
	    });
	});
	var _getContext = function (canvas, options) {
	    return (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options));
	};

	var SpecifyLightWorkerData = (function () {
	    function SpecifyLightWorkerData() {
	    }
	    SpecifyLightWorkerData.count = null;
	    SpecifyLightWorkerData.colors = null;
	    return SpecifyLightWorkerData;
	}());

	var AmbientLightWorkerData = (function (_super) {
	    __extends(AmbientLightWorkerData, _super);
	    function AmbientLightWorkerData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return AmbientLightWorkerData;
	}(SpecifyLightWorkerData));

	var DirectionLightWorkerData = (function (_super) {
	    __extends(DirectionLightWorkerData, _super);
	    function DirectionLightWorkerData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    DirectionLightWorkerData.positionArr = null;
	    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = null;
	    return DirectionLightWorkerData;
	}(SpecifyLightWorkerData));

	var PointLightWorkerData = (function (_super) {
	    __extends(PointLightWorkerData, _super);
	    function PointLightWorkerData() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    PointLightWorkerData.positionArr = null;
	    PointLightWorkerData.lightGLSLDataStructureMemberNameArr = null;
	    return PointLightWorkerData;
	}(SpecifyLightWorkerData));

	var BasicMaterialWorkerData = (function () {
	    function BasicMaterialWorkerData() {
	    }
	    return BasicMaterialWorkerData;
	}());

	var LightMaterialWorkerData = (function () {
	    function LightMaterialWorkerData() {
	    }
	    LightMaterialWorkerData.specularColors = null;
	    LightMaterialWorkerData.emissionColors = null;
	    LightMaterialWorkerData.shininess = null;
	    LightMaterialWorkerData.shadings = null;
	    LightMaterialWorkerData.lightModels = null;
	    LightMaterialWorkerData.diffuseMapIndex = null;
	    LightMaterialWorkerData.specularMapIndex = null;
	    return LightMaterialWorkerData;
	}());

	var MaterialWorkerData = (function () {
	    function MaterialWorkerData() {
	    }
	    MaterialWorkerData.shaderIndices = null;
	    MaterialWorkerData.colors = null;
	    MaterialWorkerData.opacities = null;
	    MaterialWorkerData.alphaTests = null;
	    return MaterialWorkerData;
	}());

	var GLSLSenderWorkerData = (function () {
	    function GLSLSenderWorkerData() {
	    }
	    GLSLSenderWorkerData.uniformCacheMap = null;
	    GLSLSenderWorkerData.sendAttributeConfigMap = null;
	    GLSLSenderWorkerData.sendUniformConfigMap = null;
	    GLSLSenderWorkerData.vertexAttribHistory = null;
	    return GLSLSenderWorkerData;
	}());

	var LocationWorkerData = (function () {
	    function LocationWorkerData() {
	    }
	    LocationWorkerData.attributeLocationMap = null;
	    LocationWorkerData.uniformLocationMap = null;
	    return LocationWorkerData;
	}());

	var ProgramWorkerData = (function () {
	    function ProgramWorkerData() {
	    }
	    ProgramWorkerData.programMap = null;
	    ProgramWorkerData.lastUsedProgram = null;
	    ProgramWorkerData.lastBindedArrayBuffer = null;
	    ProgramWorkerData.lastBindedIndexBuffer = null;
	    return ProgramWorkerData;
	}());

	var ShaderWorkerData = (function () {
	    function ShaderWorkerData() {
	    }
	    ShaderWorkerData.index = null;
	    ShaderWorkerData.count = null;
	    ShaderWorkerData.shaderLibWholeNameMap = null;
	    return ShaderWorkerData;
	}());

	var StateData = (function () {
	    function StateData() {
	    }
	    StateData.state = createState();
	    return StateData;
	}());

	var getState$1 = function (StateData) {
	    return StateData.state;
	};
	var setState$1 = function (state, StateData) {
	    return IO.of(function () {
	        StateData.state = state;
	    });
	};

	var MapManagerWorkerData = (function () {
	    function MapManagerWorkerData() {
	    }
	    MapManagerWorkerData.textureIndices = null;
	    MapManagerWorkerData.textureCounts = null;
	    return MapManagerWorkerData;
	}());

	var TextureCacheWorkerData = (function () {
	    function TextureCacheWorkerData() {
	    }
	    TextureCacheWorkerData.bindTextureUnitCache = null;
	    return TextureCacheWorkerData;
	}());

	var TextureWorkerData = (function () {
	    function TextureWorkerData() {
	    }
	    TextureWorkerData.index = null;
	    TextureWorkerData.glTextures = null;
	    TextureWorkerData.sourceMap = null;
	    TextureWorkerData.uniformSamplerNameMap = null;
	    TextureWorkerData.widths = null;
	    TextureWorkerData.heights = null;
	    TextureWorkerData.isNeedUpdates = null;
	    return TextureWorkerData;
	}());

	var initData$41 = initData$11;

	var setCount = function (count, SepcifyLightDataFromSystem) {
	    SepcifyLightDataFromSystem.count = count;
	};

	var initData$43 = function (_a, AmbientLightWorkerData) {
	    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount;
	    _setCount(lightCount, AmbientLightWorkerData);
	    createTypeArrays$5(buffer, bufferCount, AmbientLightWorkerData);
	};
	var _setCount = setCount;

	var initData$44 = function (_a, DirectionLightWorkerData) {
	    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, directionLightGLSLDataStructureMemberNameArr = _a.directionLightGLSLDataStructureMemberNameArr;
	    _setCount$1(lightCount, DirectionLightWorkerData);
	    DirectionLightWorkerData.lightGLSLDataStructureMemberNameArr = directionLightGLSLDataStructureMemberNameArr;
	    createTypeArrays$6(buffer, bufferCount, DirectionLightWorkerData);
	};
	var _setCount$1 = setCount;

	var initData$45 = function (_a, PointLightWorkerData) {
	    var buffer = _a.buffer, bufferCount = _a.bufferCount, lightCount = _a.lightCount, pointLightGLSLDataStructureMemberNameArr = _a.pointLightGLSLDataStructureMemberNameArr;
	    _setCount$2(lightCount, PointLightWorkerData);
	    PointLightWorkerData.lightGLSLDataStructureMemberNameArr = pointLightGLSLDataStructureMemberNameArr;
	    createTypeArrays$7(buffer, bufferCount, PointLightWorkerData);
	};
	var _setCount$2 = setCount;

	var initData$42 = function (lightData, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem) {
	    initData$43(lightData.ambientLightData, AmbientLightDataFromSystem);
	    initData$44(lightData.directionLightData, DirectionLightDataFromSystem);
	    initData$45(lightData.pointLightData, PointLightDataFromSystem);
	};

	var initData$49 = initData$16;

	var bowser = createCommonjsModule(function (module) {
	/*!
	 * Bowser - a browser detector
	 * https://github.com/ded/bowser
	 * MIT License | (c) Dustin Diaz 2015
	 */

	!function (root, name, definition) {
	  if ('object' != 'undefined' && module.exports) module.exports = definition();
	  else if (typeof undefined == 'function' && undefined.amd) undefined(name, definition);
	  else root[name] = definition();
	}(commonjsGlobal, 'bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */

	  var t = true;

	  function detect(ua) {

	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[1]) || '';
	    }

	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return (match && match.length > 1 && match[2]) || '';
	    }

	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
	      , likeAndroid = /like android/i.test(ua)
	      , android = !likeAndroid && /android/i.test(ua)
	      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
	      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
	      , chromeos = /CrOS/.test(ua)
	      , silk = /silk/i.test(ua)
	      , sailfish = /sailfish/i.test(ua)
	      , tizen = /tizen/i.test(ua)
	      , webos = /(web|hpw)os/i.test(ua)
	      , windowsphone = /windows phone/i.test(ua)
	      , samsungBrowser = /SamsungBrowser/i.test(ua)
	      , windows = !windowsphone && /windows/i.test(ua)
	      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
	      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
	      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
	      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
	      , tablet = /tablet/i.test(ua)
	      , mobile = !tablet && /[^-]mobi/i.test(ua)
	      , xbox = /xbox/i.test(ua)
	      , result;

	    if (/opera/i.test(ua)) {
	      //  an old Opera
	      result = {
	        name: 'Opera'
	      , opera: t
	      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
	      };
	    } else if (/opr|opios/i.test(ua)) {
	      // a new Opera
	      result = {
	        name: 'Opera'
	        , opera: t
	        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/SamsungBrowser/i.test(ua)) {
	      result = {
	        name: 'Samsung Internet for Android'
	        , samsungBrowser: t
	        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/coast/i.test(ua)) {
	      result = {
	        name: 'Opera Coast'
	        , coast: t
	        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser'
	      , yandexbrowser: t
	      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/ucbrowser/i.test(ua)) {
	      result = {
	          name: 'UC Browser'
	        , ucbrowser: t
	        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/mxios/i.test(ua)) {
	      result = {
	        name: 'Maxthon'
	        , maxthon: t
	        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/epiphany/i.test(ua)) {
	      result = {
	        name: 'Epiphany'
	        , epiphany: t
	        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/puffin/i.test(ua)) {
	      result = {
	        name: 'Puffin'
	        , puffin: t
	        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
	      };
	    }
	    else if (/sleipnir/i.test(ua)) {
	      result = {
	        name: 'Sleipnir'
	        , sleipnir: t
	        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (/k-meleon/i.test(ua)) {
	      result = {
	        name: 'K-Meleon'
	        , kMeleon: t
	        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
	      };
	    }
	    else if (windowsphone) {
	      result = {
	        name: 'Windows Phone'
	      , windowsphone: t
	      };
	      if (edgeVersion) {
	        result.msedge = t;
	        result.version = edgeVersion;
	      }
	      else {
	        result.msie = t;
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
	      }
	    }
	    else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer'
	      , msie: t
	      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      };
	    } else if (chromeos) {
	      result = {
	        name: 'Chrome'
	      , chromeos: t
	      , chromeBook: t
	      , chrome: t
	      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge'
	      , msedge: t
	      , version: edgeVersion
	      };
	    }
	    else if (/vivaldi/i.test(ua)) {
	      result = {
	        name: 'Vivaldi'
	        , vivaldi: t
	        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (sailfish) {
	      result = {
	        name: 'Sailfish'
	      , sailfish: t
	      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey'
	      , seamonkey: t
	      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/firefox|iceweasel|fxios/i.test(ua)) {
	      result = {
	        name: 'Firefox'
	      , firefox: t
	      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
	      };
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t;
	      }
	    }
	    else if (silk) {
	      result =  {
	        name: 'Amazon Silk'
	      , silk: t
	      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS'
	      , phantom: t
	      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/slimerjs/i.test(ua)) {
	      result = {
	        name: 'SlimerJS'
	        , slimer: t
	        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry'
	      , blackberry: t
	      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (webos) {
	      result = {
	        name: 'WebOS'
	      , webos: t
	      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t);
	    }
	    else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada'
	      , bada: t
	      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (tizen) {
	      result = {
	        name: 'Tizen'
	      , tizen: t
	      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/qupzilla/i.test(ua)) {
	      result = {
	        name: 'QupZilla'
	        , qupzilla: t
	        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
	      };
	    }
	    else if (/chromium/i.test(ua)) {
	      result = {
	        name: 'Chromium'
	        , chromium: t
	        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
	      };
	    }
	    else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome'
	        , chrome: t
	        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    }
	    else if (android) {
	      result = {
	        name: 'Android'
	        , version: versionIdentifier
	      };
	    }
	    else if (/safari|applewebkit/i.test(ua)) {
	      result = {
	        name: 'Safari'
	      , safari: t
	      };
	      if (versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    }
	    else if (iosdevice) {
	      result = {
	        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      };
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    }
	    else if(/googlebot/i.test(ua)) {
	      result = {
	        name: 'Googlebot'
	      , googlebot: t
	      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
	      };
	    }
	    else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	     };
	   }

	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      if (/(apple)?webkit\/537\.36/i.test(ua)) {
	        result.name = result.name || "Blink";
	        result.blink = t;
	      } else {
	        result.name = result.name || "Webkit";
	        result.webkit = t;
	      }
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko";
	      result.gecko = t;
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
	    }

	    // set OS flags for platforms that have multiple browsers
	    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
	      result.android = t;
	    } else if (!result.windowsphone && !result.msedge && iosdevice) {
	      result[iosdevice] = t;
	      result.ios = t;
	    } else if (mac) {
	      result.mac = t;
	    } else if (xbox) {
	      result.xbox = t;
	    } else if (windows) {
	      result.windows = t;
	    } else if (linux) {
	      result.linux = t;
	    }

	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }

	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (
	         tablet
	      || nexusTablet
	      || iosdevice == 'ipad'
	      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
	      || result.silk
	    ) {
	      result.tablet = t;
	    } else if (
	         mobile
	      || iosdevice == 'iphone'
	      || iosdevice == 'ipod'
	      || android
	      || nexusMobile
	      || result.blackberry
	      || result.webos
	      || result.bada
	    ) {
	      result.mobile = t;
	    }

	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge ||
	        (result.msie && result.version >= 10) ||
	        (result.yandexbrowser && result.version >= 15) ||
			    (result.vivaldi && result.version >= 1.0) ||
	        (result.chrome && result.version >= 20) ||
	        (result.samsungBrowser && result.version >= 4) ||
	        (result.firefox && result.version >= 20.0) ||
	        (result.safari && result.version >= 6) ||
	        (result.opera && result.version >= 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
	        (result.blackberry && result.version >= 10.1)
	        || (result.chromium && result.version >= 20)
	        ) {
	      result.a = t;
	    }
	    else if ((result.msie && result.version < 10) ||
	        (result.chrome && result.version < 20) ||
	        (result.firefox && result.version < 20.0) ||
	        (result.safari && result.version < 6) ||
	        (result.opera && result.version < 10.0) ||
	        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
	        || (result.chromium && result.version < 20)
	        ) {
	      result.c = t;
	    } else result.x = t;

	    return result
	  }

	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');

	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem=== 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  /**
	   * Get version precisions count
	   *
	   * @example
	   *   getVersionPrecision("1.10.3") // 3
	   *
	   * @param  {string} version
	   * @return {number}
	   */
	  function getVersionPrecision(version) {
	    return version.split(".").length;
	  }

	  /**
	   * Array::map polyfill
	   *
	   * @param  {Array} arr
	   * @param  {Function} iterator
	   * @return {Array}
	   */
	  function map(arr, iterator) {
	    var result = [], i;
	    if (Array.prototype.map) {
	      return Array.prototype.map.call(arr, iterator);
	    }
	    for (i = 0; i < arr.length; i++) {
	      result.push(iterator(arr[i]));
	    }
	    return result;
	  }

	  /**
	   * Calculate browser version weight
	   *
	   * @example
	   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
	   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
	   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
	   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
	   *
	   * @param  {Array<String>} versions versions to compare
	   * @return {Number} comparison result
	   */
	  function compareVersions(versions) {
	    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
	    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
	    var chunks = map(versions, function (version) {
	      var delta = precision - getVersionPrecision(version);

	      // 2) "9" -> "9.0" (for precision = 2)
	      version = version + new Array(delta + 1).join(".0");

	      // 3) "9.0" -> ["000000000"", "000000009"]
	      return map(version.split("."), function (chunk) {
	        return new Array(20 - chunk.length).join("0") + chunk;
	      }).reverse();
	    });

	    // iterate in reverse order by reversed chunks array
	    while (--precision >= 0) {
	      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
	      if (chunks[0][precision] > chunks[1][precision]) {
	        return 1;
	      }
	      else if (chunks[0][precision] === chunks[1][precision]) {
	        if (precision === 0) {
	          // all version chunks are same
	          return 0;
	        }
	      }
	      else {
	        return -1;
	      }
	    }
	  }

	  /**
	   * Check if browser is unsupported
	   *
	   * @example
	   *   bowser.isUnsupportedBrowser({
	   *     msie: "10",
	   *     firefox: "23",
	   *     chrome: "29",
	   *     safari: "5.1",
	   *     opera: "16",
	   *     phantom: "534"
	   *   });
	   *
	   * @param  {Object}  minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function isUnsupportedBrowser(minVersions, strictMode, ua) {
	    var _bowser = bowser;

	    // make strictMode param optional with ua param usage
	    if (typeof strictMode === 'string') {
	      ua = strictMode;
	      strictMode = void(0);
	    }

	    if (strictMode === void(0)) {
	      strictMode = false;
	    }
	    if (ua) {
	      _bowser = detect(ua);
	    }

	    var version = "" + _bowser.version;
	    for (var browser in minVersions) {
	      if (minVersions.hasOwnProperty(browser)) {
	        if (_bowser[browser]) {
	          if (typeof minVersions[browser] !== 'string') {
	            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
	          }

	          // browser version and min supported version.
	          return compareVersions([version, minVersions[browser]]) < 0;
	        }
	      }
	    }

	    return strictMode; // not found
	  }

	  /**
	   * Check if browser is supported
	   *
	   * @param  {Object} minVersions map of minimal version to browser
	   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
	   * @param  {String}  [ua] user agent string
	   * @return {Boolean}
	   */
	  function check(minVersions, strictMode, ua) {
	    return !isUnsupportedBrowser(minVersions, strictMode, ua);
	  }

	  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
	  bowser.compareVersions = compareVersions;
	  bowser.check = check;

	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;

	  return bowser
	});
	});

	var bowser_2 = bowser.chrome;
	var bowser_4 = bowser.firefox;

	var update$5 = function (gl, textureIndex, TextureWorkerData) {
	    update$3(gl, textureIndex, _setFlipY$1, TextureWorkerData);
	};
	var _setFlipY$1 = null;
	if (bowser_2) {
	    _setFlipY$1 = function (gl, flipY) {
	    };
	}
	else if (bowser_4) {
	    _setFlipY$1 = function (gl, flipY) {
	        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
	    };
	}




	var _createImageBitmap = null;
	if (bowser_2) {
	    _createImageBitmap = function (blob, options) {
	        return createImageBitmap(blob, options);
	    };
	}
	else if (bowser_4) {
	    _createImageBitmap = function (blob, options) {
	        return createImageBitmap(blob);
	    };
	}

	var getMapCount$2 = function (materialIndex, MapManagerWorkerData) {
	    var textureCounts = MapManagerWorkerData.textureCounts;
	    if (textureCounts === null) {
	        return 0;
	    }
	    return textureCounts[materialIndex];
	};

	var initMaterial$3 = function (index, state, className) {
	    var shaderIndex = init$9(state, index, className, material_config, shaderLib_generator, buildInitShaderDataMap(DeviceManagerWorkerData, ProgramWorkerData, LocationWorkerData, GLSLSenderWorkerData, ShaderWorkerData, MapManagerWorkerData, MaterialWorkerData, BasicMaterialWorkerData, LightMaterialWorkerData, DirectionLightWorkerData, PointLightWorkerData));
	    setShaderIndex(index, shaderIndex, MaterialWorkerData);
	};



	var getAlphaTest$2 = getAlphaTest$1;
	var isTestAlpha$2 = isTestAlpha$1;

	var initData$50 = initData$14;

	var buildGLSLSource$2 = function (materialIndex, materialShaderLibNameArr, shaderLibData, initShaderDataMap) {
	    return buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibData, {
	        getAlphaTest: getAlphaTest$2,
	        isTestAlpha: isTestAlpha$2
	    }, initShaderDataMap);
	};

	var init$9 = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderDataMap) {
	    return init$6(state, materialIndex, materialClassName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap$1(), initShaderDataMap);
	};
	var _buildInitShaderFuncDataMap$1 = function () {
	    return {
	        buildGLSLSource: buildGLSLSource$2,
	        getGL: getGL$2,
	        getMapCount: getMapCount$2,
	        hasSpecularMap: hasSpecularMap,
	        hasDiffuseMap: hasDiffuseMap
	    };
	};




	var getDirectionLightPosition$1 = function (index, drawDataMap) {
	    return _getLightPosition(index, drawDataMap.DirectionLightDataFromSystem);
	};
	var getPointLightPosition$1 = function (index, drawDataMap) {
	    return _getLightPosition(index, drawDataMap.PointLightDataFromSystem);
	};
	var _getLightPosition = function (index, LightDataFromSystem) {
	    return LightDataFromSystem.positionArr[index];
	};
	var initData$47 = function (ShaderWorkerData) {
	    ShaderWorkerData.index = 0;
	    ShaderWorkerData.count = 0;
	    ShaderWorkerData.shaderLibWholeNameMap = createMap();
	};

	var initData$46 = initData$36;

	var initDeviceManagerWorkerData = initData$40;
	var initProgramWorkerData = initData$41;
	var initGLSLSenderWorkerData = initData$50;
	var initLocationWorkerData = initData$49;
	var initShaderWorkerData = initData$47;
	var initLightWorkerData = initData$42;
	var initDrawRenderCommandBufferWorkerData = initData$46;
	var getDirectionLightPositionInShaderWorker = getDirectionLightPosition$1;
	var getPointLightPositionInShaderWorker = getPointLightPosition$1;
	var updateTextureWorker = update$5;

	var initThreeDTransformData = initData$4;
	var DomQuery$1 = DomQuery;
	var fromArray$1 = fromArray;
	var initTagData = initData$5;
	var initGeometryData = initData$17;
	var initMaterialData = initData$9;
	var initShaderData = initData$10;
	var initProgramData = initData$39;
	var initLocationData = initData$22;
	var initGLSLSenderData = initData$23;
	var initMeshRendererData = initData$6;
	var initArrayBufferData = initData$18;
	var initIndexBufferData = initData$21;
	var initDeviceManagerData = initData$19;
	var initCameraControllerData = initData$2;
	var initLightData = initData$37;
	var initGameObjectData = initData$3;
	var initSceneData = initData$8;
	var initRenderCommandBufferData = initData$7;
	var initDrawRenderCommandBufferData = initData$35;
	var initSendDrawRenderCommandBufferData = initData$34;
	var createState$1 = createState;
	var useProgram = use$$1;
	var sendAttributeData$4 = sendAttributeData$$1;
	var sendUniformData$4 = sendUniformData$$1;
	var disableVertexAttribArray$1 = disableVertexAttribArray;
	var setGeometryIndices = setIndices;
	var setGeometryVertices = setVertices;
	var hasGeometryIndices = hasIndices$$1;
	var getShaderIndex$1 = getShaderIndex;
	var updateSystem$1 = updateSystem;
	var getNormalMatrix$1 = getNormalMatrix;

	exports.getCameraPMatrix = getCameraPMatrix;
	exports.getCameraNear = getCameraNear;
	exports.setCameraNear = setCameraNear;
	exports.getCameraFar = getCameraFar;
	exports.setCameraFar = setCameraFar;
	exports.CameraController = CameraController;
	exports.createCameraController = createCameraController;
	exports.getCameraControllerGameObject = getCameraControllerGameObject;
	exports.CameraControllerData = CameraControllerData;
	exports.CameraData = CameraData;
	exports.getPerspectiveCameraFovy = getPerspectiveCameraFovy;
	exports.setPerspectiveCameraFovy = setPerspectiveCameraFovy;
	exports.getPerspectiveCameraAspect = getPerspectiveCameraAspect;
	exports.setPerspectiveCameraAspect = setPerspectiveCameraAspect;
	exports.PerspectiveCameraData = PerspectiveCameraData;
	exports.Component = Component;
	exports.getComponentIDFromClass = getComponentIDFromClass;
	exports.getComponentIDFromComponent = getComponentIDFromComponent;
	exports.ComponentData = ComponentData;
	exports.getTypeIDFromClass = getTypeIDFromClass;
	exports.getTypeIDFromComponent = getTypeIDFromComponent;
	exports.BoxGeometry = BoxGeometry;
	exports.createBoxGeometry = createBoxGeometry;
	exports.setBoxGeometryConfigData = setBoxGeometryConfigData;
	exports.CustomGeometry = CustomGeometry;
	exports.createCustomGeometry = createCustomGeometry;
	exports.setCustomGeometryVertices = setCustomGeometryVertices;
	exports.setCustomGeometryNormals = setCustomGeometryNormals;
	exports.setCustomGeometryTexCoords = setCustomGeometryTexCoords;
	exports.setCustomGeometryIndices = setCustomGeometryIndices;
	exports.Geometry = Geometry;
	exports.getDrawMode = getDrawMode$2;
	exports.getVertices = getVertices$1;
	exports.getNormals = getNormals$1;
	exports.getTexCoords = getTexCoords$1;
	exports.getIndices = getIndices$1;
	exports.getGeometryConfigData = getGeometryConfigData;
	exports.initGeometry = initGeometry$1;
	exports.getGeometryGameObject = getGeometryGameObject;
	exports.GeometryData = GeometryData;
	exports.AmbientLight = AmbientLight;
	exports.createAmbientLight = createAmbientLight;
	exports.getAmbientLightGameObject = getAmbientLightGameObject;
	exports.getAmbientLightColor = getAmbientLightColor;
	exports.setAmbientLightColor = setAmbientLightColor;
	exports.AmbientLightData = AmbientLightData;
	exports.DirectionLight = DirectionLight;
	exports.createDirectionLight = createDirectionLight;
	exports.getDirectionLightGameObject = getDirectionLightGameObject;
	exports.getDirectionLightPosition = getDirectionLightPosition;
	exports.getDirectionLightColor = getDirectionLightColor;
	exports.setDirectionLightColor = setDirectionLightColor;
	exports.getDirectionLightIntensity = getDirectionLightIntensity;
	exports.setDirectionLightIntensity = setDirectionLightIntensity;
	exports.DirectionLightData = DirectionLightData;
	exports.Light = Light;
	exports.checkLightShouldAlive = checkLightShouldAlive;
	exports.PointLight = PointLight;
	exports.createPointLight = createPointLight;
	exports.getPointLightGameObject = getPointLightGameObject;
	exports.getPointLightPosition = getPointLightPosition;
	exports.getPointLightColor = getPointLightColor;
	exports.setPointLightColor = setPointLightColor;
	exports.getPointLightIntensity = getPointLightIntensity;
	exports.setPointLightIntensity = setPointLightIntensity;
	exports.getPointLightConstant = getPointLightConstant;
	exports.setPointLightConstant = setPointLightConstant;
	exports.getPointLightLinear = getPointLightLinear;
	exports.setPointLightLinear = setPointLightLinear;
	exports.getPointLightQuadratic = getPointLightQuadratic;
	exports.setPointLightQuadratic = setPointLightQuadratic;
	exports.getPointLightRange = getPointLightRange;
	exports.setPointLightRange = setPointLightRange;
	exports.setPointLightRangeLevel = setPointLightRangeLevel;
	exports.PointLightData = PointLightData;
	exports.SpecifyLightData = SpecifyLightData;
	exports.BasicMaterial = BasicMaterial;
	exports.createBasicMaterial = createBasicMaterial;
	exports.initBasicMaterial = initBasicMaterial;
	exports.getBasicMaterialColor = getBasicMaterialColor;
	exports.setBasicMaterialColor = setBasicMaterialColor;
	exports.getBasicMaterialOpacity = getBasicMaterialOpacity;
	exports.setBasicMaterialOpacity = setBasicMaterialOpacity;
	exports.getBasicMaterialAlphaTest = getBasicMaterialAlphaTest;
	exports.setBasicMaterialAlphaTest = setBasicMaterialAlphaTest;
	exports.addBasicMaterialMap = addBasicMaterialMap;
	exports.BasicMaterialData = BasicMaterialData;
	exports.LightMaterial = LightMaterial;
	exports.createLightMaterial = createLightMaterial;
	exports.initLightMaterial = initLightMaterial;
	exports.getLightMaterialColor = getLightMaterialColor;
	exports.setLightMaterialColor = setLightMaterialColor;
	exports.getLightMaterialOpacity = getLightMaterialOpacity;
	exports.setLightMaterialOpacity = setLightMaterialOpacity;
	exports.getLightMaterialAlphaTest = getLightMaterialAlphaTest;
	exports.setLightMaterialAlphaTest = setLightMaterialAlphaTest;
	exports.getLightMaterialSpecularColor = getLightMaterialSpecularColor;
	exports.setLightMaterialSpecularColor = setLightMaterialSpecularColor;
	exports.getLightMaterialEmissionColor = getLightMaterialEmissionColor;
	exports.setLightMaterialEmissionColor = setLightMaterialEmissionColor;
	exports.getLightMaterialShininess = getLightMaterialShininess;
	exports.setLightMaterialShininess = setLightMaterialShininess;
	exports.getLightMaterialShading = getLightMaterialShading;
	exports.setLightMaterialShading = setLightMaterialShading;
	exports.getLightMaterialLightModel = getLightMaterialLightModel;
	exports.setLightMaterialLightModel = setLightMaterialLightModel;
	exports.setLightMaterialDiffuseMap = setLightMaterialDiffuseMap;
	exports.setLightMaterialSpecularMap = setLightMaterialSpecularMap;
	exports.LightMaterialData = LightMaterialData;
	exports.Material = Material;
	exports.getMaterialGameObject = getMaterialGameObject;
	exports.checkShouldAlive = checkShouldAlive$1;
	exports.MaterialData = MaterialData;
	exports.SpecifyMaterialData = SpecifyMaterialData;
	exports.MeshRenderer = MeshRenderer;
	exports.createMeshRenderer = createMeshRenderer;
	exports.getMeshRendererGameObject = getMeshRendererGameObject;
	exports.getMeshRendererRenderList = getMeshRendererRenderList;
	exports.MeshRendererData = MeshRendererData;
	exports.Tag = Tag;
	exports.createTag = createTag;
	exports.addTag = addTag$1;
	exports.removeTag = removeTag$1;
	exports.findGameObjectsByTag = findGameObjectsByTag$1;
	exports.getTagGameObject = getTagGameObject;
	exports.TagData = TagData;
	exports.LinkList = LinkList;
	exports.LinkNode = LinkNode;
	exports.ThreeDTransform = ThreeDTransform;
	exports.createThreeDTransform = createThreeDTransform;
	exports.getThreeDTransformPosition = getThreeDTransformPosition;
	exports.setThreeDTransformPosition = setThreeDTransformPosition;
	exports.getThreeDTransformLocalToWorldMatrix = getThreeDTransformLocalToWorldMatrix;
	exports.getThreeDTransformLocalPosition = getThreeDTransformLocalPosition;
	exports.setThreeDTransformLocalPosition = setThreeDTransformLocalPosition;
	exports.setThreeDTransformBatchTransformDatas = setThreeDTransformBatchTransformDatas;
	exports.getThreeDTransformParent = getThreeDTransformParent;
	exports.setThreeDTransformParent = setThreeDTransformParent;
	exports.getThreeDTransformGameObject = getThreeDTransformGameObject;
	exports.ThreeDTransformData = ThreeDTransformData;
	exports.ThreeDTransformRelationData = ThreeDTransformRelationData;
	exports.getUID = getUID;
	exports.isIndexUsed = isIndexUsed;
	exports.getStartIndexInArrayBuffer = getStartIndexInArrayBuffer;
	exports.CompileConfig = CompileConfig;
	exports.DataBufferConfig = DataBufferConfig;
	exports.DebugConfig = DebugConfig;
	exports.MemoryConfig = MemoryConfig;
	exports.RenderWorkerConfig = RenderWorkerConfig;
	exports.Director = Director;
	exports.DirectorData = DirectorData;
	exports.GameObject = GameObject;
	exports.createGameObject = createGameObject;
	exports.addGameObjectComponent = addGameObjectComponent;
	exports.disposeGameObject = disposeGameObject;
	exports.initGameObject = initGameObject$1;
	exports.disposeGameObjectComponent = disposeGameObjectComponent;
	exports.getGameObjectComponent = getGameObjectComponent;
	exports.getGameObjectTransform = getGameObjectTransform;
	exports.hasGameObjectComponent = hasGameObjectComponent;
	exports.isGameObjectAlive = isGameObjectAlive;
	exports.addGameObject = addGameObject;
	exports.removeGameObject = removeGameObject;
	exports.hasGameObject = hasGameObject;
	exports.getGameObjectChildren = getGameObjectChildren;
	exports.getGameObjectParent = getGameObjectParent;
	exports.GameObjectData = GameObjectData;
	exports.Scene = Scene;
	exports.addSceneChild = addSceneChild;
	exports.removeSceneChild = removeSceneChild;
	exports.SceneData = SceneData;
	exports.Main = Main$1;
	exports.Scheduler = Scheduler$1;
	exports.GlobalTempData = GlobalTempData;
	exports.cache = cache;
	exports.assert = assert;
	exports.describe = describe;
	exports.it = it;
	exports.requireCheck = requireCheck;
	exports.requireCheckFunc = requireCheckFunc;
	exports.ensure = ensure;
	exports.ensureFunc = ensureFunc;
	exports.requireGetterAndSetter = requireGetterAndSetter;
	exports.requireGetter = requireGetter;
	exports.requireSetter = requireSetter;
	exports.ensureGetterAndSetter = ensureGetterAndSetter;
	exports.ensureGetter = ensureGetter;
	exports.ensureSetter = ensureSetter;
	exports.invariant = invariant;
	exports.execOnlyOnce = execOnlyOnce;
	exports.registerClass = registerClass;
	exports.singleton = singleton;
	exports.virtual = virtual;
	exports.WorkerDetectData = WorkerDetectData;
	exports.DEG_TO_RAD = DEG_TO_RAD;
	exports.RAD_TO_DEG = RAD_TO_DEG;
	exports.Matrix3 = Matrix3;
	exports.Matrix4 = Matrix4;
	exports.Quaternion = Quaternion;
	exports.Vector2 = Vector2;
	exports.Vector3 = Vector3;
	exports.Vector4 = Vector4;
	exports.ArrayBufferData = ArrayBufferData;
	exports.IndexBufferData = IndexBufferData;
	exports.RenderCommandBufferData = RenderCommandBufferData;
	exports.InitConfigData = InitConfigData;
	exports.material_config = material_config;
	exports.render_config = render_config;
	exports.shaderLib_generator = shaderLib_generator;
	exports.DeviceManager = DeviceManager;
	exports.setDeviceManagerGL = setDeviceManagerGL;
	exports.DeviceManagerData = DeviceManagerData;
	exports.GPUDetector = GPUDetector;
	exports.DrawRenderCommandBufferData = DrawRenderCommandBufferData;
	exports.empty = empty;
	exports.NULL = NULL;
	exports.basic_materialColor_fragment = basic_materialColor_fragment;
	exports.end_basic_fragment = end_basic_fragment;
	exports.common_define = common_define;
	exports.common_fragment = common_fragment;
	exports.common_function = common_function;
	exports.common_vertex = common_vertex;
	exports.highp_fragment = highp_fragment;
	exports.lowp_fragment = lowp_fragment;
	exports.mediump_fragment = mediump_fragment;
	exports.noNormalMap_light_fragment = noNormalMap_light_fragment;
	exports.lightCommon_fragment = lightCommon_fragment;
	exports.lightCommon_vertex = lightCommon_vertex;
	exports.lightEnd_fragment = lightEnd_fragment;
	exports.light_common = light_common;
	exports.light_fragment = light_fragment;
	exports.light_setWorldPosition_vertex = light_setWorldPosition_vertex;
	exports.light_vertex = light_vertex;
	exports.map_forBasic_fragment = map_forBasic_fragment;
	exports.map_forBasic_vertex = map_forBasic_vertex;
	exports.modelMatrix_noInstance_vertex = modelMatrix_noInstance_vertex;
	exports.normalMatrix_noInstance_vertex = normalMatrix_noInstance_vertex;
	exports.diffuseMap_fragment = diffuseMap_fragment;
	exports.diffuseMap_vertex = diffuseMap_vertex;
	exports.noDiffuseMap_fragment = noDiffuseMap_fragment;
	exports.noEmissionMap_fragment = noEmissionMap_fragment;
	exports.noLightMap_fragment = noLightMap_fragment;
	exports.noNormalMap_fragment = noNormalMap_fragment;
	exports.noNormalMap_vertex = noNormalMap_vertex;
	exports.noSpecularMap_fragment = noSpecularMap_fragment;
	exports.specularMap_fragment = specularMap_fragment;
	exports.specularMap_vertex = specularMap_vertex;
	exports.noShadowMap_fragment = noShadowMap_fragment;
	exports.GLSLSenderData = GLSLSenderData;
	exports.LocationData = LocationData;
	exports.ProgramData = ProgramData;
	exports.ShaderData = ShaderData;
	exports.main_begin = main_begin;
	exports.main_end = main_end;
	exports.setPos_mvp = setPos_mvp;
	exports.MapManagerData = MapManagerData;
	exports.Texture = Texture;
	exports.createTexture = createTexture;
	exports.disposeTexture = disposeTexture;
	exports.getTextureSource = getTextureSource;
	exports.setTextureSource = setTextureSource;
	exports.getTextureWidth = getTextureWidth;
	exports.setTextureWidth = setTextureWidth;
	exports.getTextureHeight = getTextureHeight;
	exports.setTextureHeight = setTextureHeight;
	exports.getTextureIsNeedUpdate = getTextureIsNeedUpdate;
	exports.setTextureIsNeedUpdate = setTextureIsNeedUpdate;
	exports.TextureCacheData = TextureCacheData;
	exports.TextureData = TextureData;
	exports.DeviceManagerWorkerData = DeviceManagerWorkerData;
	exports.SendDrawRenderCommandBufferData = SendDrawRenderCommandBufferData;
	exports.ArrayBufferWorkerData = ArrayBufferWorkerData;
	exports.IndexBufferWorkerData = IndexBufferWorkerData;
	exports.InitConfigWorkerData = InitConfigWorkerData;
	exports.DrawRenderCommandBufferWorkerData = DrawRenderCommandBufferWorkerData;
	exports.GeometryWorkerData = GeometryWorkerData;
	exports.initGL = initGL;
	exports.AmbientLightWorkerData = AmbientLightWorkerData;
	exports.DirectionLightWorkerData = DirectionLightWorkerData;
	exports.PointLightWorkerData = PointLightWorkerData;
	exports.SpecifyLightWorkerData = SpecifyLightWorkerData;
	exports.BasicMaterialWorkerData = BasicMaterialWorkerData;
	exports.LightMaterialWorkerData = LightMaterialWorkerData;
	exports.MaterialWorkerData = MaterialWorkerData;
	exports.GLSLSenderWorkerData = GLSLSenderWorkerData;
	exports.LocationWorkerData = LocationWorkerData;
	exports.ProgramWorkerData = ProgramWorkerData;
	exports.ShaderWorkerData = ShaderWorkerData;
	exports.StateData = StateData;
	exports.getState = getState$1;
	exports.setState = setState$1;
	exports.MapManagerWorkerData = MapManagerWorkerData;
	exports.TextureCacheWorkerData = TextureCacheWorkerData;
	exports.TextureWorkerData = TextureWorkerData;
	exports.Color = Color;
	exports.RectRegion = RectRegion;
	exports.View = View;
	exports.initDeviceManagerWorkerData = initDeviceManagerWorkerData;
	exports.initProgramWorkerData = initProgramWorkerData;
	exports.initGLSLSenderWorkerData = initGLSLSenderWorkerData;
	exports.initLocationWorkerData = initLocationWorkerData;
	exports.initShaderWorkerData = initShaderWorkerData;
	exports.initLightWorkerData = initLightWorkerData;
	exports.initDrawRenderCommandBufferWorkerData = initDrawRenderCommandBufferWorkerData;
	exports.getDirectionLightPositionInShaderWorker = getDirectionLightPositionInShaderWorker;
	exports.getPointLightPositionInShaderWorker = getPointLightPositionInShaderWorker;
	exports.updateTextureWorker = updateTextureWorker;
	exports.initThreeDTransformData = initThreeDTransformData;
	exports.DomQuery = DomQuery$1;
	exports.fromArray = fromArray$1;
	exports.initTagData = initTagData;
	exports.initGeometryData = initGeometryData;
	exports.initMaterialData = initMaterialData;
	exports.initShaderData = initShaderData;
	exports.initProgramData = initProgramData;
	exports.initLocationData = initLocationData;
	exports.initGLSLSenderData = initGLSLSenderData;
	exports.initMeshRendererData = initMeshRendererData;
	exports.initArrayBufferData = initArrayBufferData;
	exports.initIndexBufferData = initIndexBufferData;
	exports.initDeviceManagerData = initDeviceManagerData;
	exports.initCameraControllerData = initCameraControllerData;
	exports.initLightData = initLightData;
	exports.initGameObjectData = initGameObjectData;
	exports.initSceneData = initSceneData;
	exports.initRenderCommandBufferData = initRenderCommandBufferData;
	exports.initDrawRenderCommandBufferData = initDrawRenderCommandBufferData;
	exports.initSendDrawRenderCommandBufferData = initSendDrawRenderCommandBufferData;
	exports.createState = createState$1;
	exports.useProgram = useProgram;
	exports.sendAttributeData = sendAttributeData$4;
	exports.sendUniformData = sendUniformData$4;
	exports.disableVertexAttribArray = disableVertexAttribArray$1;
	exports.setGeometryIndices = setGeometryIndices;
	exports.setGeometryVertices = setGeometryVertices;
	exports.hasGeometryIndices = hasGeometryIndices;
	exports.getShaderIndex = getShaderIndex$1;
	exports.updateSystem = updateSystem$1;
	exports.getNormalMatrix = getNormalMatrix$1;
	exports.BufferUtilsForUnitTest = BufferUtilsForUnitTest;
	exports.Log = Log$$1;
	exports.CommonTimeController = CommonTimeController;
	exports.DirectorTimeController = DirectorTimeController;
	exports.TimeController = TimeController;
	exports.WorkerInstanceData = WorkerInstanceData;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=wd.js.map
