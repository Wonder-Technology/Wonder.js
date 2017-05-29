/*!
 * wonder.js - 3d webgl engine
 * @version v1.0.0-alpha.2
 * @author Yuanchao Yang <395976266@qq.com>
 * @link https://github.com/yyc-git/Wonder.js
 * @license MIT
 */


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
    return Log;
}());
Log$1.info = {
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

var Log$$1 = (function (_super) {
    __extends(Log$$1, _super);
    function Log$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Log$$1;
}(Log$1));
var error$1 = function (cond) {
    var messages = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        messages[_i - 1] = arguments[_i];
    }
    if (cond) {
        throw new Error(messages.join("\n"));
    }
};

var CompileConfig = {
    isCompileTest: true,
    closeContractTest: false
};

var MainData = (function () {
    function MainData() {
    }
    return MainData;
}());
MainData.isTest = false;

var _describeContext = null;
var getIsTest = function () {
    return MainData.isTest;
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
function it$1(message, func, context) {
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
                if (getIsTest()) {
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
        if (!getIsTest()) {
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
                if (getIsTest()) {
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
        if (!getIsTest()) {
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
                if (getIsTest()) {
                    inGetterFunc.call(this);
                }
                return getter_1.call(this);
            };
            descriptor.set = function (val) {
                if (getIsTest()) {
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
                if (getIsTest()) {
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
                if (getIsTest()) {
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
                if (getIsTest()) {
                    outGetterFunc.call(this, result);
                }
                return result;
            };
            descriptor.set = function (val) {
                var result = setter_3.call(this, val);
                if (getIsTest()) {
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
                if (getIsTest()) {
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
                if (getIsTest()) {
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
            if (getIsTest()) {
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

var index = createCommonjsModule(function (module) {
(function (global, module) {

  var exports = module.exports;

  /**
   * Exports.
   */

    /**
     * modify by wonder
     */
  module.exports.expect = expect;




  expect.Assertion = Assertion;

  /**
   * Exports version.
   */

  expect.version = '0.3.1';

  /**
   * Possible assertion flags.
   */

  var flags = {
      not: ['to', 'be', 'have', 'include', 'only']
    , to: ['be', 'have', 'include', 'only', 'not']
    , only: ['have']
    , have: ['own']
    , be: ['an']
  };

  function expect (obj) {
    return new Assertion(obj);
  }

  /**
   * Constructor
   *
   * @api private
   */

  function Assertion (obj, flag, parent) {
    this.obj = obj;
    this.flags = {};

    if (undefined != parent) {
      this.flags[flag] = true;

      for (var i in parent.flags) {
        if (parent.flags.hasOwnProperty(i)) {
          this.flags[i] = true;
        }
      }
    }

    var $flags = flag ? flags[flag] : keys(flags)
      , self = this;

    if ($flags) {
      for (var i = 0, l = $flags.length; i < l; i++) {
        // avoid recursion
        if (this.flags[$flags[i]]) continue;

        var name = $flags[i]
          , assertion = new Assertion(this.obj, name, this);

        if ('function' == typeof Assertion.prototype[name]) {
          // clone the function, make sure we dont touch the prot reference
          var old = this[name];
          this[name] = function () {
            return old.apply(self, arguments);
          };

          for (var fn in Assertion.prototype) {
            if (Assertion.prototype.hasOwnProperty(fn) && fn != name) {
                /*!
                modify by wonder
                 */
              if(fn !== "length"){
                  this[name][fn] = bind(assertion[fn], assertion);
              }
            }
          }
        } else {
          this[name] = assertion;
        }
      }
    }
  }

  /**
   * Performs an assertion
   *
   * @api private
   */

  Assertion.prototype.assert = function (truth, msg, error, expected) {
    var msg = this.flags.not ? error : msg
      , ok = this.flags.not ? !truth : truth
      , err;

    if (!ok) {
      err = new Error(msg.call(this));
      if (arguments.length > 3) {
        err.actual = this.obj;
        err.expected = expected;
        err.showDiff = true;
      }
      throw err;
    }

    this.and = new Assertion(this.obj);
  };

  /**
   * Check if the value is truthy
   *
   * @api public
   */

  Assertion.prototype.ok = function () {
    this.assert(
        !!this.obj
      , function(){ return 'expected ' + i(this.obj) + ' to be truthy' }
      , function(){ return 'expected ' + i(this.obj) + ' to be falsy' });
  };

  /**
   * Creates an anonymous function which calls fn with arguments.
   *
   * @api public
   */

  Assertion.prototype.withArgs = function() {
    expect(this.obj).to.be.a('function');
    var fn = this.obj;
    var args = Array.prototype.slice.call(arguments);
    return expect(function() { fn.apply(null, args); });
  };

  /**
   * Assert that the function throws.
   *
   * @param {Function|RegExp} callback, or regexp to match error string against
   * @api public
   */

  Assertion.prototype.throwError =
  Assertion.prototype.throwException = function (fn) {
    expect(this.obj).to.be.a('function');

    var thrown = false
      , not = this.flags.not;

    try {
      this.obj();
    } catch (e) {
      if (isRegExp(fn)) {
        var subject = 'string' == typeof e ? e : e.message;
        if (not) {
          expect(subject).to.not.match(fn);
        } else {
          expect(subject).to.match(fn);
        }
      } else if ('function' == typeof fn) {
        fn(e);
      }
      thrown = true;
    }

    if (isRegExp(fn) && not) {
      // in the presence of a matcher, ensure the `not` only applies to
      // the matching.
      this.flags.not = false;
    }

    var name = this.obj.name || 'fn';
    this.assert(
        thrown
      , function(){ return 'expected ' + name + ' to throw an exception' }
      , function(){ return 'expected ' + name + ' not to throw an exception' });
  };

  /**
   * Checks if the array is empty.
   *
   * @api public
   */

  Assertion.prototype.empty = function () {
    var expectation;

    if ('object' == typeof this.obj && null !== this.obj && !isArray(this.obj)) {
      if ('number' == typeof this.obj.length) {
        expectation = !this.obj.length;
      } else {
        expectation = !keys(this.obj).length;
      }
    } else {
      if ('string' != typeof this.obj) {
        expect(this.obj).to.be.an('object');
      }

      expect(this.obj).to.have.property('length');
      expectation = !this.obj.length;
    }

    this.assert(
        expectation
      , function(){ return 'expected ' + i(this.obj) + ' to be empty' }
      , function(){ return 'expected ' + i(this.obj) + ' to not be empty' });
    return this;
  };

  /**
   * Checks if the obj exactly equals another.
   *
   * @api public
   */

  Assertion.prototype.be =
  Assertion.prototype.equal = function (obj) {
    this.assert(
        obj === this.obj
      , function(){ return 'expected ' + i(this.obj) + ' to equal ' + i(obj) }
      , function(){ return 'expected ' + i(this.obj) + ' to not equal ' + i(obj) });
    return this;
  };

  /**
   * Checks if the obj sortof equals another.
   *
   * @api public
   */

  Assertion.prototype.eql = function (obj) {
    this.assert(
        expect.eql(this.obj, obj)
      , function(){ return 'expected ' + i(this.obj) + ' to sort of equal ' + i(obj) }
      , function(){ return 'expected ' + i(this.obj) + ' to sort of not equal ' + i(obj) }
      , obj);
    return this;
  };

  /**
   * Assert within start to finish (inclusive).
   *
   * @param {Number} start
   * @param {Number} finish
   * @api public
   */

  Assertion.prototype.within = function (start, finish) {
    var range = start + '..' + finish;
    this.assert(
        this.obj >= start && this.obj <= finish
      , function(){ return 'expected ' + i(this.obj) + ' to be within ' + range }
      , function(){ return 'expected ' + i(this.obj) + ' to not be within ' + range });
    return this;
  };

  /**
   * Assert typeof / instance of
   *
   * @api public
   */

  Assertion.prototype.a =
  Assertion.prototype.an = function (type) {
    if ('string' == typeof type) {
      // proper english in error msg
      var n = /^[aeiou]/.test(type) ? 'n' : '';

      // typeof with support for 'array'
      this.assert(
          'array' == type ? isArray(this.obj) :
            'regexp' == type ? isRegExp(this.obj) :
              'object' == type
                ? 'object' == typeof this.obj && null !== this.obj
                : type == typeof this.obj
        , function(){ return 'expected ' + i(this.obj) + ' to be a' + n + ' ' + type }
        , function(){ return 'expected ' + i(this.obj) + ' not to be a' + n + ' ' + type });
    } else {
      // instanceof
      var name = type.name || 'supplied constructor';
      this.assert(
          this.obj instanceof type
        , function(){ return 'expected ' + i(this.obj) + ' to be an instance of ' + name }
        , function(){ return 'expected ' + i(this.obj) + ' not to be an instance of ' + name });
    }

    return this;
  };

  /**
   * Assert numeric value above _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.greaterThan =
  Assertion.prototype.above = function (n) {
    this.assert(
        this.obj > n
      , function(){ return 'expected ' + i(this.obj) + ' to be above ' + n }
      , function(){ return 'expected ' + i(this.obj) + ' to be below ' + n });
    return this;
  };

  /**
   * Assert numeric value below _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.lessThan =
  Assertion.prototype.below = function (n) {
    this.assert(
        this.obj < n
      , function(){ return 'expected ' + i(this.obj) + ' to be below ' + n }
      , function(){ return 'expected ' + i(this.obj) + ' to be above ' + n });
    return this;
  };

  /**
   * Assert string value matches _regexp_.
   *
   * @param {RegExp} regexp
   * @api public
   */

  Assertion.prototype.match = function (regexp) {
    this.assert(
        regexp.exec(this.obj)
      , function(){ return 'expected ' + i(this.obj) + ' to match ' + regexp }
      , function(){ return 'expected ' + i(this.obj) + ' not to match ' + regexp });
    return this;
  };

  /**
   * Assert property "length" exists and has value of _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.length = function (n) {
    expect(this.obj).to.have.property('length');
    var len = this.obj.length;
    this.assert(
        n == len
      , function(){ return 'expected ' + i(this.obj) + ' to have a length of ' + n + ' but got ' + len }
      , function(){ return 'expected ' + i(this.obj) + ' to not have a length of ' + len });
    return this;
  };

  /**
   * Assert property _name_ exists, with optional _val_.
   *
   * @param {String} name
   * @param {Mixed} val
   * @api public
   */

  Assertion.prototype.property = function (name, val) {
    if (this.flags.own) {
      this.assert(
          Object.prototype.hasOwnProperty.call(this.obj, name)
        , function(){ return 'expected ' + i(this.obj) + ' to have own property ' + i(name) }
        , function(){ return 'expected ' + i(this.obj) + ' to not have own property ' + i(name) });
      return this;
    }

    if (this.flags.not && undefined !== val) {
      if (undefined === this.obj[name]) {
        throw new Error(i(this.obj) + ' has no property ' + i(name));
      }
    } else {
      var hasProp;
      try {
        hasProp = name in this.obj;
      } catch (e) {
        hasProp = undefined !== this.obj[name];
      }

      this.assert(
          hasProp
        , function(){ return 'expected ' + i(this.obj) + ' to have a property ' + i(name) }
        , function(){ return 'expected ' + i(this.obj) + ' to not have a property ' + i(name) });
    }

    if (undefined !== val) {
      this.assert(
          val === this.obj[name]
        , function(){ return 'expected ' + i(this.obj) + ' to have a property ' + i(name)
          + ' of ' + i(val) + ', but got ' + i(this.obj[name]) }
        , function(){ return 'expected ' + i(this.obj) + ' to not have a property ' + i(name)
          + ' of ' + i(val) });
    }

    this.obj = this.obj[name];
    return this;
  };

  /**
   * Assert that the array contains _obj_ or string contains _obj_.
   *
   * @param {Mixed} obj|string
   * @api public
   */

  Assertion.prototype.string =
  Assertion.prototype.contain = function (obj) {
    if ('string' == typeof this.obj) {
      this.assert(
          ~this.obj.indexOf(obj)
        , function(){ return 'expected ' + i(this.obj) + ' to contain ' + i(obj) }
        , function(){ return 'expected ' + i(this.obj) + ' to not contain ' + i(obj) });
    } else {
      this.assert(
          ~indexOf(this.obj, obj)
        , function(){ return 'expected ' + i(this.obj) + ' to contain ' + i(obj) }
        , function(){ return 'expected ' + i(this.obj) + ' to not contain ' + i(obj) });
    }
    return this;
  };

  /**
   * Assert exact keys or inclusion of keys by using
   * the `.own` modifier.
   *
   * @param {Array|String ...} keys
   * @api public
   */

  Assertion.prototype.key =
  Assertion.prototype.keys = function ($keys) {
    var str
      , ok = true;

    $keys = isArray($keys)
      ? $keys
      : Array.prototype.slice.call(arguments);

    if (!$keys.length) throw new Error('keys required');

    var actual = keys(this.obj)
      , len = $keys.length;

    // Inclusion
    ok = every($keys, function (key) {
      return ~indexOf(actual, key);
    });

    // Strict
    if (!this.flags.not && this.flags.only) {
      ok = ok && $keys.length == actual.length;
    }

    // Key string
    if (len > 1) {
      $keys = map($keys, function (key) {
        return i(key);
      });
      var last = $keys.pop();
      str = $keys.join(', ') + ', and ' + last;
    } else {
      str = i($keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (!this.flags.only ? 'include ' : 'only have ') + str;

    // Assertion
    this.assert(
        ok
      , function(){ return 'expected ' + i(this.obj) + ' to ' + str }
      , function(){ return 'expected ' + i(this.obj) + ' to not ' + str });

    return this;
  };

  /**
   * Assert a failure.
   *
   * @param {String ...} custom message
   * @api public
   */
  Assertion.prototype.fail = function (msg) {
    var error = function() { return msg || "explicit failure"; };
    this.assert(false, error, error);
    return this;
  };







    /**
     * extend by wonder
     */


    function addProperty(name, fn) {
        Object.defineProperty(Assertion.prototype, name, {
            get: function addProperty() {
                return fn.call(this);
            },
            configurable: true
        });
    }



    Assertion.prototype.lte = function (n) {
        this.assert(
            this.obj <= n
            , function(){ return 'expected ' + i(this.obj) + ' to be <= ' + n }
            , function(){ return 'expected ' + i(this.obj) + ' to be > ' + n });
        return this;
    };

    Assertion.prototype.gte = function (n) {
        this.assert(
            this.obj >= n
            , function(){ return 'expected ' + i(this.obj) + ' to be >= ' + n }
            , function(){ return 'expected ' + i(this.obj) + ' to be < ' + n });
        return this;
    };


    addProperty("exist",  function () {
        this.assert(
            this.obj !== null && this.obj !== undefined
            , function(){ return 'expected ' + i(this.obj) + ' to be exist' }
            , function(){ return 'expected ' + i(this.obj) + ' to not exist' });
        return this;
    });

    addProperty("true",  function () {
        this.assert(
            this.obj === true
            , function(){ return 'expected ' + i(this.obj) + ' to be true' }
            , function(){ return 'expected ' + i(this.obj) + ' to be false' });
        return this;
    });

    addProperty("false",  function () {
        this.assert(
            this.obj === false
            , function(){ return 'expected ' + i(this.obj) + ' to be false' }
            , function(){ return 'expected ' + i(this.obj) + ' to be true' });
        return this;
    });










  /**
   * Function bind implementation.
   */

  function bind (fn, scope) {
    return function () {
      return fn.apply(scope, arguments);
    }
  }

  /**
   * Array every compatibility
   *
   * @see bit.ly/5Fq1N2
   * @api public
   */

  function every (arr, fn, thisObj) {
    var scope = thisObj || global;
    for (var i = 0, j = arr.length; i < j; ++i) {
      if (!fn.call(scope, arr[i], i, arr)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Array indexOf compatibility.
   *
   * @see bit.ly/a5Dxa2
   * @api public
   */

  function indexOf (arr, o, i) {
    if (Array.prototype.indexOf) {
      return Array.prototype.indexOf.call(arr, o, i);
    }

    if (arr.length === undefined) {
      return -1;
    }

    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0
        ; i < j && arr[i] !== o; i++);

    return j <= i ? -1 : i;
  }

  // https://gist.github.com/1044128/
  var getOuterHTML = function(element) {
    if ('outerHTML' in element) return element.outerHTML;
    var ns = "http://www.w3.org/1999/xhtml";
    var container = document.createElementNS(ns, '_');
    var xmlSerializer = new XMLSerializer();
    var html;
    if (document.xmlVersion) {
      return xmlSerializer.serializeToString(element);
    } else {
      container.appendChild(element.cloneNode(false));
      html = container.innerHTML.replace('><', '>' + element.innerHTML + '<');
      container.innerHTML = '';
      return html;
    }
  };

  // Returns true if object is a DOM element.
  var isDOMElement = function (object) {
    if (typeof HTMLElement === 'object') {
      return object instanceof HTMLElement;
    } else {
      return object &&
        typeof object === 'object' &&
        object.nodeType === 1 &&
        typeof object.nodeName === 'string';
    }
  };

  /**
   * Inspects an object.
   *
   * @see taken from node.js `util` module (copyright Joyent, MIT license)
   * @api private
   */

  function i (obj, showHidden, depth) {
    var seen = [];

    function stylize (str) {
      return str;
    }

    function format (value, recurseTimes) {
      // Provide a hook for user-specified inspect functions.
      // Check that value is an object with an inspect function on it
      if (value && typeof value.inspect === 'function' &&
          // Filter out the util module, it's inspect function is special
          value !== exports &&
          // Also filter out any prototype objects using the circular check.
          !(value.constructor && value.constructor.prototype === value)) {
        return value.inspect(recurseTimes);
      }

      // Primitive types cannot have properties
      switch (typeof value) {
        case 'undefined':
          return stylize('undefined', 'undefined');

        case 'string':
          var simple = '\'' + json.stringify(value).replace(/^"|"$/g, '')
                                                   .replace(/'/g, "\\'")
                                                   .replace(/\\"/g, '"') + '\'';
          return stylize(simple, 'string');

        case 'number':
          return stylize('' + value, 'number');

        case 'boolean':
          return stylize('' + value, 'boolean');
      }
      // For some reason typeof null is "object", so special case here.
      if (value === null) {
        return stylize('null', 'null');
      }

      if (isDOMElement(value)) {
        return getOuterHTML(value);
      }

      // Look up the keys of the object.
      var visible_keys = keys(value);
      var $keys = showHidden ? Object.getOwnPropertyNames(value) : visible_keys;

      // Functions without properties can be shortcutted.
      if (typeof value === 'function' && $keys.length === 0) {
        if (isRegExp(value)) {
          return stylize('' + value, 'regexp');
        } else {
          var name = value.name ? ': ' + value.name : '';
          return stylize('[Function' + name + ']', 'special');
        }
      }

      // Dates without properties can be shortcutted
      if (isDate(value) && $keys.length === 0) {
        return stylize(value.toUTCString(), 'date');
      }

      // Error objects can be shortcutted
      if (value instanceof Error) {
        return stylize("["+value.toString()+"]", 'Error');
      }

      var base, type, braces;
      // Determine the object type
      if (isArray(value)) {
        type = 'Array';
        braces = ['[', ']'];
      } else {
        type = 'Object';
        braces = ['{', '}'];
      }

      // Make functions say that they are functions
      if (typeof value === 'function') {
        var n = value.name ? ': ' + value.name : '';
        base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
      } else {
        base = '';
      }

      // Make dates with properties first say the date
      if (isDate(value)) {
        base = ' ' + value.toUTCString();
      }

      if ($keys.length === 0) {
        return braces[0] + base + braces[1];
      }

      if (recurseTimes < 0) {
        if (isRegExp(value)) {
          return stylize('' + value, 'regexp');
        } else {
          return stylize('[Object]', 'special');
        }
      }

      seen.push(value);

      var output = map($keys, function (key) {
        var name, str;
        if (value.__lookupGetter__) {
          if (value.__lookupGetter__(key)) {
            if (value.__lookupSetter__(key)) {
              str = stylize('[Getter/Setter]', 'special');
            } else {
              str = stylize('[Getter]', 'special');
            }
          } else {
            if (value.__lookupSetter__(key)) {
              str = stylize('[Setter]', 'special');
            }
          }
        }
        if (indexOf(visible_keys, key) < 0) {
          name = '[' + key + ']';
        }
        if (!str) {
          if (indexOf(seen, value[key]) < 0) {
            if (recurseTimes === null) {
              str = format(value[key]);
            } else {
              str = format(value[key], recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
              if (isArray(value)) {
                str = map(str.split('\n'), function (line) {
                  return '  ' + line;
                }).join('\n').substr(2);
              } else {
                str = '\n' + map(str.split('\n'), function (line) {
                  return '   ' + line;
                }).join('\n');
              }
            }
          } else {
            str = stylize('[Circular]', 'special');
          }
        }
        if (typeof name === 'undefined') {
          if (type === 'Array' && key.match(/^\d+$/)) {
            return str;
          }
          name = json.stringify('' + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = stylize(name, 'name');
          } else {
            name = name.replace(/'/g, "\\'")
                       .replace(/\\"/g, '"')
                       .replace(/(^"|"$)/g, "'");
            name = stylize(name, 'string');
          }
        }

        return name + ': ' + str;
      });

      seen.pop();

      var numLinesEst = 0;
      var length = reduce(output, function (prev, cur) {
        numLinesEst++;
        if (indexOf(cur, '\n') >= 0) numLinesEst++;
        return prev + cur.length + 1;
      }, 0);

      if (length > 50) {
        output = braces[0] +
                 (base === '' ? '' : base + '\n ') +
                 ' ' +
                 output.join(',\n  ') +
                 ' ' +
                 braces[1];

      } else {
        output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
      }

      return output;
    }
    return format(obj, (typeof depth === 'undefined' ? 2 : depth));
  }

  expect.stringify = i;

  function isArray (ar) {
    return Object.prototype.toString.call(ar) === '[object Array]';
  }

  function isRegExp(re) {
    var s;
    try {
      s = '' + re;
    } catch (e) {
      return false;
    }

    return re instanceof RegExp || // easy case
           // duck-type for context-switching evalcx case
           typeof(re) === 'function' &&
           re.constructor.name === 'RegExp' &&
           re.compile &&
           re.test &&
           re.exec &&
           s.match(/^\/.*\/[gim]{0,3}$/);
  }

  function isDate(d) {
    return d instanceof Date;
  }

  function keys (obj) {
    if (Object.keys) {
      return Object.keys(obj);
    }

    var keys = [];

    for (var i in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, i)) {
        keys.push(i);
      }
    }

    return keys;
  }

  function map (arr, mapper, that) {
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, mapper, that);
    }

    var other= new Array(arr.length);

    for (var i= 0, n = arr.length; i<n; i++)
      if (i in arr)
        other[i] = mapper.call(that, arr[i], i, arr);

    return other;
  }

  function reduce (arr, fun) {
    if (Array.prototype.reduce) {
      return Array.prototype.reduce.apply(
          arr
        , Array.prototype.slice.call(arguments, 1)
      );
    }

    var len = +this.length;

    if (typeof fun !== "function")
      throw new TypeError();

    // no value to return if no initial value and an empty array
    if (len === 0 && arguments.length === 1)
      throw new TypeError();

    var i = 0;
    if (arguments.length >= 2) {
      var rv = arguments[1];
    } else {
      do {
        if (i in this) {
          rv = this[i++];
          break;
        }

        // if array contains no values, no initial value to return
        if (++i >= len)
          throw new TypeError();
      } while (true);
    }

    for (; i < len; i++) {
      if (i in this)
        rv = fun.call(null, rv, this[i], i, this);
    }

    return rv;
  }

  /**
   * Asserts deep equality
   *
   * @see taken from node.js `assert` module (copyright Joyent, MIT license)
   * @api private
   */

  expect.eql = function eql(actual, expected) {
    // 7.1. All identical values are equivalent, as determined by ===.
    if (actual === expected) {
      return true;
    } else if ('undefined' != typeof Buffer
      && Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
      if (actual.length != expected.length) return false;

      for (var i = 0; i < actual.length; i++) {
        if (actual[i] !== expected[i]) return false;
      }

      return true;

      // 7.2. If the expected value is a Date object, the actual value is
      // equivalent if it is also a Date object that refers to the same time.
    } else if (actual instanceof Date && expected instanceof Date) {
      return actual.getTime() === expected.getTime();

      // 7.3. Other pairs that do not both pass typeof value == "object",
      // equivalence is determined by ==.
    } else if (typeof actual != 'object' && typeof expected != 'object') {
      return actual == expected;
    // If both are regular expression use the special `regExpEquiv` method
    // to determine equivalence.
    } else if (isRegExp(actual) && isRegExp(expected)) {
      return regExpEquiv(actual, expected);
    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical "prototype" property. Note: this
    // accounts for both named and indexed properties on Arrays.
    } else {
      return objEquiv(actual, expected);
    }
  };

  function isUndefinedOrNull (value) {
    return value === null || value === undefined;
  }

  function isArguments (object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }

  function regExpEquiv (a, b) {
    return a.source === b.source && a.global === b.global &&
           a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
  }

  function objEquiv (a, b) {
    if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
      return false;
    // an identical "prototype" property.
    if (a.prototype !== b.prototype) return false;
    //~~~I've managed to break Object.keys through screwy arguments passing.
    //   Converting to array solves the problem.
    if (isArguments(a)) {
      if (!isArguments(b)) {
        return false;
      }
      a = pSlice.call(a);
      b = pSlice.call(b);
      return expect.eql(a, b);
    }
    try{
      var ka = keys(a),
        kb = keys(b),
        key, i;
    } catch (e) {//happens when one is a string literal and the other isn't
      return false;
    }
    // having the same number of owned properties (keys incorporates hasOwnProperty)
    if (ka.length != kb.length)
      return false;
    //the same set of keys (although not necessarily the same order),
    ka.sort();
    kb.sort();
    //~~~cheap key test
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] != kb[i])
        return false;
    }
    //equivalent values for every corresponding key, and
    //~~~possibly expensive deep test
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!expect.eql(a[key], b[key]))
         return false;
    }
    return true;
  }

  var json = (function () {
    "use strict";

    if ('object' == typeof JSON && JSON.parse && JSON.stringify) {
      return {
          parse: nativeJSON.parse
        , stringify: nativeJSON.stringify
      }
    }

    var JSON = {};

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    function date(d, key) {
      return isFinite(d.valueOf()) ?
          d.getUTCFullYear()     + '-' +
          f(d.getUTCMonth() + 1) + '-' +
          f(d.getUTCDate())      + 'T' +
          f(d.getUTCHours())     + ':' +
          f(d.getUTCMinutes())   + ':' +
          f(d.getUTCSeconds())   + 'Z' : null;
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

  // Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

  // If the value has a toJSON method, call it to obtain a replacement value.

        if (value instanceof Date) {
            value = date(key);
        }

  // If we were called with a replacer function, then call the replacer to
  // obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

  // What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

  // JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

  // If the value is a boolean or null, convert it to a string. Note:
  // typeof null does not produce 'null'. The case is included here in
  // the remote chance that this gets fixed someday.

            return String(value);

  // If the type is 'object', we might be dealing with an object or an array or
  // null.

        case 'object':

  // Due to a specification blunder in ECMAScript, typeof null is 'object',
  // so watch out for that case.

            if (!value) {
                return 'null';
            }

  // Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

  // Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

  // The value is an array. Stringify every element. Use null as a placeholder
  // for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

  // Join all of the elements together, separated with commas, and wrap them in
  // brackets.

                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

  // If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

  // Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

  // Join all of the member texts together, separated with commas,
  // and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

  // If the JSON object does not yet have a stringify method, give it one.

    JSON.stringify = function (value, replacer, space) {

  // The stringify method takes a value and an optional replacer, and an optional
  // space parameter, and returns a JSON text. The replacer can be a function
  // that can replace values, or an array of strings that will select the keys.
  // A default replacer method can be provided. Use of the space parameter can
  // produce text that is more easily readable.

        var i;
        gap = '';
        indent = '';

  // If the space parameter is a number, make an indent string containing that
  // many spaces.

        if (typeof space === 'number') {
            for (i = 0; i < space; i += 1) {
                indent += ' ';
            }

  // If the space parameter is a string, it will be used as the indent string.

        } else if (typeof space === 'string') {
            indent = space;
        }

  // If there is a replacer, it must be a function or an array.
  // Otherwise, throw an error.

        rep = replacer;
        if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                typeof replacer.length !== 'number')) {
            throw new Error('JSON.stringify');
        }

  // Make a fake root object containing our value under the key of ''.
  // Return the result of stringifying the value.

        return str('', {'': value});
    };

  // If the JSON object does not yet have a parse method, give it one.

    JSON.parse = function (text, reviver) {
    // The parse method takes a text and an optional reviver function, and returns
    // a JavaScript value if the text is a valid JSON text.

        var j;

        function walk(holder, key) {

    // The walk method is used to recursively walk the resulting structure so
    // that modifications can be made.

            var k, v, value = holder[key];
            if (value && typeof value === 'object') {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = walk(value, k);
                        if (v !== undefined) {
                            value[k] = v;
                        } else {
                            delete value[k];
                        }
                    }
                }
            }
            return reviver.call(holder, key, value);
        }


    // Parsing happens in four stages. In the first stage, we replace certain
    // Unicode characters with escape sequences. JavaScript handles many characters
    // incorrectly, either silently deleting them, or treating them as line endings.

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
            text = text.replace(cx, function (a) {
                return '\\u' +
                    ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

    // In the second stage, we run the text against regular expressions that look
    // for non-JSON patterns. We are especially concerned with '()' and 'new'
    // because they can cause invocation, and '=' because it can cause mutation.
    // But just to be safe, we want to reject all unexpected forms.

    // We split the second stage into 4 regexp operations in order to work around
    // crippling inefficiencies in IE's and Safari's regexp engines. First we
    // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
    // replace all simple value tokens with ']' characters. Third, we delete all
    // open brackets that follow a colon or comma or that begin the text. Finally,
    // we look to see that the remaining characters are only whitespace or ']' or
    // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

        if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                    .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                    .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

    // In the third stage we use the eval function to compile the text into a
    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
    // in JavaScript: it can begin a block or an object literal. We wrap the text
    // in parens to eliminate the ambiguity.

            j = eval('(' + text + ')');

    // In the optional fourth stage, we recursively walk the new structure, passing
    // each name/value pair to a reviver function for possible transformation.

            return typeof reviver === 'function' ?
                walk({'': j}, '') : j;
        }

    // If the text is not JSON parseable, then a SyntaxError is thrown.

        throw new SyntaxError('JSON.parse');
    };

    return JSON;
  })();

  if ('undefined' != typeof window) {
      /**
       * modify by wonder
       */
      if(!window.expect){
          window.expect = module.exports.expect;
      }
  }

})(
    commonjsGlobal
  , module
);
});

var index_1 = index.expect;

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
var isUndefined = function (v) { return v === void 0; };
var isNotUndefined = function (v) { return v !== void 0; };

var deleteVal = function (key, obj) { return obj[key] = void 0; };
var deleteBySwap = function (sourceIndex, targetIndex, obj) {
    obj[sourceIndex] = obj[targetIndex];
    deleteVal(targetIndex, obj);
};
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
    return ComponentData;
}());
ComponentData.addComponentHandleMap = {};
ComponentData.disposeHandleMap = {};
ComponentData.initHandleMap = {};

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
    return ClassUtils;
}());
ClassUtils._classMap = {};
__decorate([
    ensure(function (className) {
        it$1("should exist class name", function () {
            index_1(className).exist;
            index_1(className !== "").true;
        });
    })
], ClassUtils, "getClassNameByInstance", null);
__decorate([
    ensure(function (className) {
        it$1("should exist class name", function () {
            index_1(className).exist;
            index_1(className !== "").true;
        });
    })
], ClassUtils, "getClassNameByClass", null);

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
_addTypeID(["Geometry", "BoxGeometry", "CustomGeometry"], _table);
_addTypeID(["Material", "BasicMaterial"], _table);
_addTypeID(["MeshRenderer"], _table);
_addTypeID(["Tag"], _table);
_addTypeID(["CameraController"], _table);

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
    it$1("component should alive", function () {
        index_1(isAlive(component, data)).true;
    });
};
var addComponentToGameObjectMap = requireCheckFunc(function (gameObjectMap, index, gameObject) {
    it$1("component should not exist in gameObject", function () {
        index_1(gameObjectMap[index]).not.exist;
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
var deleteComponentBySwap = requireCheckFunc(function (sourceIndex, targetIndex, componentMap) {
    it$1("targetIndex should >= 0", function () {
        index_1(targetIndex).gte(0);
    });
}, function (sourceIndex, targetIndex, componentMap) {
    componentMap[targetIndex].index = sourceIndex;
    markComponentIndexRemoved(componentMap[sourceIndex]);
    deleteBySwap(sourceIndex, targetIndex, componentMap);
});
var markComponentIndexRemoved = function (component) {
    component.index = -1;
};

var checkIndexShouldEqualCount = function (ComponentData) {
    it$1("ComponentData.index should === ComponentData.count", function () {
        index_1(ComponentData.index).equal(ComponentData.count);
    });
    it$1("ComponentData.index should >= 0", function () {
        index_1(ComponentData.index).gte(0);
    });
    it$1("ComponentData.count should >= 0", function () {
        index_1(ComponentData.count).gte(0);
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
    return Component;
}());
Component = __decorate([
    registerClass("Component")
], Component);

var CameraControllerData = (function () {
    function CameraControllerData() {
    }
    return CameraControllerData;
}());
CameraControllerData.index = null;
CameraControllerData.count = null;
CameraControllerData.dirtyIndexArray = null;
CameraControllerData.gameObjectMap = null;
CameraControllerData.worldToCameraMatrixCacheMap = null;

var CameraController = (function (_super) {
    __extends(CameraController, _super);
    function CameraController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CameraController;
}(Component));
CameraController = __decorate([
    registerClass("CameraController")
], CameraController);
var createCameraController = function () {
    return create(CameraControllerData);
};
var getCameraControllerGameObject = function (component) {
    return getGameObject(component.index, CameraControllerData);
};

var isNotValidVal = function (val) { return isUndefined(val); };
var deleteBySwap$1 = function (index, array) {
    var last = array.length - 1, temp = null;
    if (last === -1) {
        return null;
    }
    temp = array[last];
    array[last] = array[index];
    array[index] = temp;
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
    return PerspectiveCameraData;
}());
PerspectiveCameraData.fovyMap = null;
PerspectiveCameraData.aspectMap = null;

var CameraData = (function () {
    function CameraData() {
    }
    return CameraData;
}());
CameraData.nearMap = null;
CameraData.farMap = null;
CameraData.worldToCameraMatrixMap = null;
CameraData.pMatrixMap = null;

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

var Vector2 = Vector2_1 = (function () {
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
    return Vector2;
}());
Vector2 = Vector2_1 = __decorate([
    registerClass("Vector2")
], Vector2);
var Vector2_1;

var DEG_TO_RAD = Math.PI / 180;
var RAD_TO_DEG = 180 / Math.PI;

var Matrix3 = Matrix3_1 = (function () {
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
    return Matrix3;
}());
Matrix3 = Matrix3_1 = __decorate([
    registerClass("Matrix3")
], Matrix3);
var Matrix3_1;

var Vector4 = Vector4_1 = (function () {
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
    return Vector4;
}());
Vector4 = Vector4_1 = __decorate([
    registerClass("Vector4")
], Vector4);
var Vector4_1;

var Vector3 = Vector3_1 = (function () {
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
    return Vector3;
}());
Vector3.up = null;
Vector3.forward = null;
Vector3.right = null;
Vector3 = Vector3_1 = __decorate([
    registerClass("Vector3")
], Vector3);
Vector3.up = Vector3.create(0, 1, 0);
Vector3.forward = Vector3.create(0, 0, 1);
Vector3.right = Vector3.create(1, 0, 0);
var Vector3_1;

var Quaternion = Quaternion_1 = (function () {
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
    return Quaternion;
}());
Quaternion = Quaternion_1 = __decorate([
    registerClass("Quaternion")
], Quaternion);
var Quaternion_1;

var Matrix4 = Matrix4_1 = (function () {
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
    return Matrix4;
}());
__decorate([
    requireCheck(function (angle, x, y, z) {
        it$1("axis's component shouldn't all be zero", function () {
            index_1(x === 0 && y === 0 && z === 0).false;
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
var Matrix4_1;

var updateProjectionMatrix$1 = requireCheckFunc(function (index, PerspectiveCameraData, CameraData) {
    it$1("fovy should exist", function () {
        index_1(isValidMapValue(PerspectiveCameraData.fovyMap[index])).true;
    });
    it$1("aspect should exist", function () {
        index_1(isValidMapValue(PerspectiveCameraData.aspectMap[index])).true;
    });
    it$1("near should exist", function () {
        index_1(isValidMapValue(CameraData.nearMap[index])).true;
    });
    it$1("far should exist", function () {
        index_1(isValidMapValue(CameraData.farMap[index])).true;
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
    return GameObjectData;
}());
GameObjectData.uid = null;
GameObjectData.disposeCount = null;
GameObjectData.componentMap = null;
GameObjectData.parentMap = null;
GameObjectData.childrenMap = null;
GameObjectData.aliveUIDArray = null;

var DataBufferConfig = {
    transformDataBufferCount: 16 * 1024,
    geometryDataBufferCount: 1024 * 1024,
    geometryIndicesBufferBits: 16,
};

var ThreeDTransformData = (function () {
    function ThreeDTransformData() {
    }
    Object.defineProperty(ThreeDTransformData, "count", {
        get: function () {
            return DataBufferConfig.transformDataBufferCount;
        },
        enumerable: true,
        configurable: true
    });
    return ThreeDTransformData;
}());
ThreeDTransformData.localToWorldMatrices = null;
ThreeDTransformData.localPositions = null;
ThreeDTransformData.localRotations = null;
ThreeDTransformData.localScales = null;
ThreeDTransformData.firstDirtyIndex = null;
ThreeDTransformData.indexInArrayBuffer = null;
ThreeDTransformData.notUsedIndexLinkList = null;
ThreeDTransformData.isTranslateMap = null;
ThreeDTransformData.parentMap = null;
ThreeDTransformData.childrenMap = null;
ThreeDTransformData.cacheMap = null;
ThreeDTransformData.tempMap = null;
ThreeDTransformData.transformMap = null;
ThreeDTransformData.uid = null;
ThreeDTransformData.disposeCount = null;
ThreeDTransformData.isClearCacheMap = null;
ThreeDTransformData.gameObjectMap = null;
ThreeDTransformData.aliveUIDArray = null;
ThreeDTransformData.buffer = null;
var ThreeDTransformRelationData = (function () {
    function ThreeDTransformRelationData() {
        this.indexInArrayBuffer = null;
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
    return GlobalTempData;
}());
GlobalTempData.matrix4_1 = Matrix4.create();
GlobalTempData.matrix4_2 = Matrix4.create();
GlobalTempData.matrix4_3 = Matrix4.create();
GlobalTempData.vector3_1 = Vector3.create();
GlobalTempData.vector3_2 = Vector3.create();
GlobalTempData.vector3_3 = Vector3.create();
GlobalTempData.vector3_4 = Vector3.create();
GlobalTempData.quaternion_1 = Quaternion.create();

var ThreeDTransform = (function (_super) {
    __extends(ThreeDTransform, _super);
    function ThreeDTransform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uid = null;
        return _this;
    }
    return ThreeDTransform;
}(Component));
ThreeDTransform = __decorate([
    registerClass("ThreeDTransform")
], ThreeDTransform);
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
    return getParent$$1(component, ThreeDTransformData);
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

var _setValue = function (dataArr, increment, startIndex, target) {
    dataArr[startIndex + increment] = target;
};
var DataUtils = (function () {
    function DataUtils() {
    }
    DataUtils.setMatrices = function (dataArr, mat, index) {
        var values = mat.values;
        for (var i = 0; i <= 15; i++) {
            _setValue(dataArr, i, index, values[i]);
        }
    };
    DataUtils.setMatrix4ByIndex = function (mat, dataArr, index) {
        mat.set(dataArr[index], dataArr[index + 1], dataArr[index + 2], dataArr[index + 3], dataArr[index + 4], dataArr[index + 5], dataArr[index + 6], dataArr[index + 7], dataArr[index + 8], dataArr[index + 9], dataArr[index + 10], dataArr[index + 11], dataArr[index + 12], dataArr[index + 13], dataArr[index + 14], dataArr[index + 15]);
        return mat;
    };
    DataUtils.setVectors = function (dataArr, vec, index) {
        var values = vec.values;
        for (var i = 0; i <= 2; i++) {
            _setValue(dataArr, i, index, values[i]);
        }
    };
    DataUtils.setVector3ByIndex = function (vec, dataArr, index) {
        vec.set(dataArr[index], dataArr[index + 1], dataArr[index + 2]);
        return vec;
    };
    DataUtils.setQuaternions = function (dataArr, qua, index) {
        _setValue(dataArr, 0, index, qua.x);
        _setValue(dataArr, 1, index, qua.y);
        _setValue(dataArr, 2, index, qua.z);
        _setValue(dataArr, 3, index, qua.w);
    };
    DataUtils.setQuaternionByIndex = function (qua, dataArr, index) {
        qua.set(dataArr[index], dataArr[index + 1], dataArr[index + 2], dataArr[index + 3]);
        return qua;
    };
    DataUtils.swap = function (dataArr, index1, index2, length) {
        for (var i = 0; i < length; i++) {
            var newIndex1 = index1 + i, newIndex2 = index2 + i, temp = dataArr[newIndex2];
            dataArr[newIndex2] = dataArr[newIndex1];
            dataArr[newIndex1] = temp;
        }
    };
    DataUtils.createMatrix4ByIndex = function (mat, dataArr, index) {
        return this.setMatrix4ByIndex(mat, dataArr, index);
    };
    DataUtils.createVector3ByIndex = function (vec, dataArr, index) {
        return this.setVector3ByIndex(vec, dataArr, index);
    };
    DataUtils.createQuaternionByIndex = function (qua, dataArr, index) {
        return this.setQuaternionByIndex(qua, dataArr, index);
    };
    DataUtils.removeItemInArray = function (arr, index) {
        arr[index] = void 0;
    };
    DataUtils.removeSingleItemInTypeArray = function (dataArr, index, resetValFunc) {
        resetValFunc(dataArr, index).run();
    };
    DataUtils.removeTypeArrayItemBySwap = function (dataArr, index, swapItemIndex, length) {
        for (var i = 0; i < length; i++) {
            dataArr[index + i] = dataArr[swapItemIndex + i];
        }
    };
    return DataUtils;
}());
__decorate([
    requireCheck(function (dataArr, index, swapItemIndex, length) {
        it("index should <= swapItemIndex", function () {
            index_1(index).lte(swapItemIndex);
        });
    })
], DataUtils, "removeTypeArrayItemBySwap", null);

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

var getUID = requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    it$1("indexInArrayBuffer should exist", function () {
        index_1(indexInArrayBuffer).exist;
    });
    it$1("transform should exist", function () {
        index_1(ThreeDTransformData.transformMap[indexInArrayBuffer]).exist;
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return ThreeDTransformData.transformMap[indexInArrayBuffer].uid;
});
var isIndexUsed = ensureFunc(function (isExist, indexInArrayBuffer, ThreeDTransformData) {
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return isValidMapValue(ThreeDTransformData.transformMap[indexInArrayBuffer]);
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

var getParent$1 = requireCheckFunc(function (uid, ThreeDTransformData) {
    it$1("uid should exist", function () {
        index_1(uid).exist;
    });
}, function (uid, ThreeDTransformData) {
    return ThreeDTransformData.parentMap[uid];
});
var setParent$1 = requireCheckFunc(function (transform, parent, ThreeDTransformData) {
    it$1("parent should not be self", function () {
        if (parent !== null) {
            index_1(_isTransformEqual(transform, parent)).false;
        }
    });
}, function (transform, parent, ThreeDTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, parentIndexInArrayBuffer = null, currentParent = getParent$1(uid, ThreeDTransformData), isCurrentParentExisit = isParentExist(currentParent);
    if (parent === null) {
        if (isCurrentParentExisit) {
            _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
            addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
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
    addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
});
var _isTransformEqual = function (tra1, tra2) { return tra1.uid === tra2.uid; };
var getChildren = function (uid, ThreeDTransformData) {
    return ThreeDTransformData.childrenMap[uid];
};
var isParentExist = function (parent) { return isNotUndefined(parent); };
var isChildrenExist = function (children) { return isNotUndefined(children); };
var isNotChangeParent = function (currentParentIndexInArrayBuffer, newParentIndexInArrayBuffer) {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
};
var removeHierarchyData = function (uid, ThreeDTransformData) {
    deleteVal(uid, ThreeDTransformData.childrenMap);
    var parent = getParent$1(uid, ThreeDTransformData);
    if (isParentExist(parent)) {
        _removeHierarchyFromParent(parent, uid, ThreeDTransformData);
    }
};
var _removeHierarchyFromParent = function (parent, targetUID, ThreeDTransformData) {
    var parentUID = parent.uid, children = getChildren(parentUID, ThreeDTransformData);
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
    it$1("children should be empty array if has no child", function () {
        index_1(getChildren(uid, ThreeDTransformData)).be.a("array");
    });
}, function (uid, child, ThreeDTransformData) {
    var children = getChildren(uid, ThreeDTransformData);
    children.push(child);
});
var setChildren = function (uid, children, ThreeDTransformData) {
    ThreeDTransformData.childrenMap[uid] = children;
};
var _setParent$1 = function (uid, parent, ThreeDTransformData) {
    ThreeDTransformData.parentMap[uid] = parent;
};
var _addToParent = requireCheckFunc(function (targetUID, target, parent, ThreeDTransformData) {
    it$1("the child one should not has parent", function () {
        index_1(isValidMapValue(getParent$1(targetUID, ThreeDTransformData))).false;
    });
    it$1("parent should not already has the child", function () {
        var parentUID = parent.uid, children = getChildren(parentUID, ThreeDTransformData);
        if (isValidMapValue(children)) {
            index_1(children.indexOf(target)).equal(-1);
        }
    });
}, function (targetUID, target, parent, ThreeDTransformData) {
    var parentUID = parent.uid;
    _setParent$1(targetUID, parent, ThreeDTransformData);
    _addChild$1(parentUID, target, ThreeDTransformData);
});

var swap = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it$1("source index and target index should be used", function () {
        index_1(isIndexUsed(index1, ThreeDTransformData)).true;
        index_1(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    swapTypeArrData(index1, index2, ThreeDTransformData);
    swapTransformMapData(index1, index2, ThreeDTransformData);
    return ThreeDTransformData;
});
var swapTransformMapData = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it$1("source index and target index should be used", function () {
        index_1(isIndexUsed(index1, ThreeDTransformData)).true;
        index_1(isIndexUsed(index2, ThreeDTransformData)).true;
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
    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
    return ThreeDTransformData;
};
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
        dataArr[newIndex1] = 0;
    }
};
var _moveToTransformMap = function (transformMap, sourceIndex, targetIndex) {
    var sourceTransform = transformMap[sourceIndex];
    sourceTransform.index = targetIndex;
    transformMap[targetIndex] = sourceTransform;
    deleteVal(sourceIndex, transformMap);
};
var moveToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it$1("source index should not be used", function () {
        index_1(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it$1("source index should be used", function () {
        index_1(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it$1("target index should not be used", function () {
        index_1(isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
    return ThreeDTransformData;
}));
var moveMapDataToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it$1("source index should not be used", function () {
        index_1(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it$1("source index should be used", function () {
        index_1(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it$1("target index should not be used", function () {
        index_1(isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    return _changeMapData(sourceIndex, targetIndex, _moveToTransformMap, ThreeDTransformData);
}));
var moveTypeArrDataToIndex = function (sourceIndex, targetIndex, ThreeDTransformData) {
    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
};
var setTransformDataInTypeArr = function (indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData) {
    setLocalRotationData(qua, getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalPositionData(positionVec, getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalScaleData(scaleVec, getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalToWorldMatricesData(mat, getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
};
var setLocalToWorldMatricesData = function (mat, mat4IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
};
var setLocalPositionData = function (position, vec3IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
var setLocalRotationData = function (qua, quaIndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);
    return ThreeDTransformData;
};
var setLocalScaleData = function (scale, vec3IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
var setPositionData = function (indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData) {
    if (isParentExist(parent)) {
        var indexInArrayBuffer_1 = parent.index;
        DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix({
            uid: getUID(indexInArrayBuffer_1, ThreeDTransformData),
            index: indexInArrayBuffer_1
        }, GlobalTempData.matrix4_3, ThreeDTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
};
var getMatrix4DataSize = function () { return 16; };
var getVector3DataSize = function () { return 3; };
var getQuaternionDataSize = function () { return 4; };
var getMatrix4DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * getMatrix4DataSize(); };
var getVector3DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * getVector3DataSize(); };
var getQuaternionDataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * getQuaternionDataSize(); };

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
    it$1("firstDirtyIndex should <= count", function () {
        index_1(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (ThreeDTransformData) {
    return ThreeDTransformData.firstDirtyIndex + 1;
});
var minusFirstDirtyIndex = ensureFunc(function (firstDirtyIndex) {
    it$1("firstDirtyIndex should >= start index:" + getStartIndexInArrayBuffer(), function () {
        index_1(firstDirtyIndex).gte(getStartIndexInArrayBuffer());
    });
}, function (firstDirtyIndex) {
    return firstDirtyIndex - 1;
});
var generateNotUsedIndexInArrayBuffer = ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, function (ThreeDTransformData) {
    var result = ThreeDTransformData.indexInArrayBuffer;
    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }
    ThreeDTransformData.indexInArrayBuffer += 1;
    return result;
});
var _isValidArrayValue = function (val) {
    return isNotUndefined(val);
};
var _isValidLinkNode = function (node) {
    return node !== null;
};
var generateNotUsedIndexInNormalList = ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, function (ThreeDTransformData) {
    var index = _getNotUsedIndexFromArr(ThreeDTransformData);
    if (_isValidArrayValue(index)) {
        return index;
    }
    index = ThreeDTransformData.indexInArrayBuffer;
    ThreeDTransformData.indexInArrayBuffer += 1;
    return index;
});
var addToDirtyList$1 = requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    it$1("firstDirtyIndex should <= count", function () {
        index_1(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    var targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
    if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    return targetDirtyIndex;
});
var _getNotUsedIndexFromArr = function (ThreeDTransformData) {
    var notUsedIndexLinkList = ThreeDTransformData.notUsedIndexLinkList, node = null;
    do {
        node = _getNotUsedIndexNode(notUsedIndexLinkList);
    } while (_isValidLinkNode(node) && isIndexUsed(node.val, ThreeDTransformData));
    return node.val;
};
var _getNotUsedIndexNode = function (notUsedIndexLinkList) {
    return notUsedIndexLinkList.shift();
};
var addNotUsedIndex = function (index, notUsedIndexLinkList) {
    notUsedIndexLinkList.push(LinkNode.create(index));
};
var isNotDirty = function (indexInArrayBuffer, firstDirtyIndex) {
    return indexInArrayBuffer < firstDirtyIndex;
};
var addItAndItsChildrenToDirtyList = function (rootIndexInArrayBuffer, uid, ThreeDTransformData) {
    var indexInArraybuffer = rootIndexInArrayBuffer, children = getChildren(uid, ThreeDTransformData);
    if (isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        addToDirtyList$1(indexInArraybuffer, ThreeDTransformData);
    }
    if (isChildrenExist(children)) {
        forEach(children, function (child) {
            addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
        });
    }
    return ThreeDTransformData;
};
var _checkGeneratedNotUsedIndex = function (ThreeDTransformData, indexInArrayBuffer) {
    it$1("indexInArrayBuffer should < firstDirtyIndex", function () {
        index_1(indexInArrayBuffer).exist;
        index_1(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
    it$1("index should not be used", function () {
        index_1(isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
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
    count = ThreeDTransformData.count;
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
var _updateDirtyList = curry(function (GlobalTempData, ThreeDTransformData, state) {
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);
    var count = ThreeDTransformData.count;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }
    return state;
});
var _cleanDirtyList = curry(function (ThreeDTransformData, state) {
    var count = ThreeDTransformData.count;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        if (_needMoveOffDirtyList(i)) {
            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
        }
    }
    return state;
});
var _needMoveOffDirtyList = function (index) {
    return true;
};
var _moveFromDirtyListToNormalList = function (index, ThreeDTransformData) {
    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
    moveToIndex(index, generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
};
var _transform = function (index, GlobalTempData, ThreeDTransformData) {
    var vec3Index = getVector3DataIndexInArrayBuffer(index), quaIndex = getQuaternionDataIndexInArrayBuffer(index), mat4Index = getMatrix4DataIndexInArrayBuffer(index), mat = GlobalTempData.matrix4_2.setTRS(DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index), DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex), DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)), parent = getParent$1(getUID(index, ThreeDTransformData), ThreeDTransformData);
    if (isParentExist(parent)) {
        var parentIndex = parent.index;
        return setLocalToWorldMatricesData(DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(parentIndex))
            .multiply(mat), mat4Index, ThreeDTransformData);
    }
    return setLocalToWorldMatricesData(mat, mat4Index, ThreeDTransformData);
};
var _sortParentBeforeChildInDirtyList = function (ThreeDTransformData) {
    var count = ThreeDTransformData.count;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var parent = getParent$1(getUID(i, ThreeDTransformData), ThreeDTransformData);
        if (isParentExist(parent)) {
            var parentIndex = parent.index;
            if (parentIndex > i) {
                swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
};

var checkTransformShouldAlive = function (transform, ThreeTransformData) {
    checkComponentShouldAlive(transform, ThreeTransformData, function (transform, ThreeTransformData) {
        return isValidMapValue(ThreeTransformData.transformMap[transform.index]);
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
        var transform = data.transform, indexInArrayBuffer = transform.index, uid = transform.uid, parent = getParent$1(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer), position = data.position, localPosition = data.localPosition;
        if (localPosition) {
            setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeDTransformData);
        }
        if (position) {
            setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
        }
    }
    return ThreeDTransformData;
});
var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry(function (batchData, ThreeDTransformData) {
    var notDirtyIndexArr = [], firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    var _getNotDirtyIndex = function (indexInArrayBuffer, uid, notDirtyIndexArr, isTranslate$$1, ThreeDTransformData) {
        var children = getChildren(uid, ThreeDTransformData);
        if (isTranslate$$1) {
            setIsTranslate(uid, true, ThreeDTransformData);
        }
        if (isNotDirty(indexInArrayBuffer, firstDirtyIndex)) {
            notDirtyIndexArr.push(indexInArrayBuffer);
            firstDirtyIndex = minusFirstDirtyIndex(firstDirtyIndex);
        }
        if (isChildrenExist(children)) {
            forEach(children, function (child) {
                _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate$$1, ThreeDTransformData);
            });
        }
    };
    for (var _i = 0, batchData_3 = batchData; _i < batchData_3.length; _i++) {
        var data = batchData_3[_i];
        var transform = data.transform, indexInArrayBuffer = transform.index;
        _getNotDirtyIndex(indexInArrayBuffer, transform.uid, notDirtyIndexArr, isTranslate(data), ThreeDTransformData);
    }
    return [notDirtyIndexArr, firstDirtyIndex];
});
var _addBatchToDirtyList = function (ThreeDTransformData, targetDirtyIndex, swapFunc, moveToIndexFunc, notDirtyIndexArr) {
    for (var _i = 0, notDirtyIndexArr_1 = notDirtyIndexArr; _i < notDirtyIndexArr_1.length; _i++) {
        var indexInArrayBuffer = notDirtyIndexArr_1[_i];
        targetDirtyIndex = minusFirstDirtyIndex(targetDirtyIndex);
        if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
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
    return TagData;
}());
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

var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tag;
}(Component));
Tag = __decorate([
    registerClass("Tag")
], Tag);
var createTag = function (slotCount) {
    if (slotCount === void 0) { slotCount = 4; }
    return create$3(slotCount, TagData);
};
var addTag$1 = requireCheckFunc(function (component, tag) {
    checkShouldAlive$1(component, TagData);
}, function (component, tag) {
    addTag$$1(component, tag, TagData);
});
var removeTag$1 = requireCheckFunc(function (component, tag) {
    checkShouldAlive$1(component, TagData);
}, function (component, tag) {
    removeTag$$1(component, tag, TagData);
});
var findGameObjectsByTag$1 = function (tag) {
    return findGameObjectsByTag$$1(tag, TagData);
};
var getTagGameObject = requireCheckFunc(function (component) {
    checkShouldAlive$1(component, TagData);
}, function (component) {
    return getGameObject$2(component.index, TagData);
});

var addAddComponentHandle$3 = function (_class) {
    addAddComponentHandle$1(_class, addComponent$3);
};
var addDisposeHandle$3 = function (_class) {
    addDisposeHandle$1(_class, disposeComponent$3);
};
var create$3 = ensureFunc(function (tag, slotCount, TagData$$1) {
    it$1("slot array should has no hole", function () {
        for (var _i = 0, _a = TagData$$1.slotCountMap; _i < _a.length; _i++) {
            var count = _a[_i];
            index_1(count).exist;
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
    it$1("index should >= 0", function () {
        index_1(index).gte(0);
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
    it$1("tag should not already be added", function () {
        var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData$$1), tagArray = TagData$$1.tagArray, slotCountMap = TagData$$1.slotCountMap, currentSlotCount = getSlotCount(index, slotCountMap);
        index_1(tagArray.slice(indexInArray, indexInArray + currentSlotCount).indexOf(tag) > -1).false;
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
    it$1("current used slot count should >= 0", function () {
        var index = tagComponent.index, usedSlotCountMap = TagData$$1.usedSlotCountMap;
        index_1(getUsedSlotCount(index, usedSlotCountMap)).gte(0);
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
    it$1("usedSlotCount should <= slotCount", function () {
        index_1(currentUsedSlotCount).lte(currentSlotCount);
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
var checkShouldAlive$1 = function (tag, TagData$$1) {
    checkComponentShouldAlive(tag, TagData$$1, function (tag, TagData$$1) {
        return isValidMapValue(TagData$$1.indexMap[TagData$$1.indexInTagArrayMap[tag.index]]);
    });
};
var disposeComponent$3 = ensureFunc(function (returnVal, tag) {
    it$1("count should >= 0", function () {
        index_1(TagData.count).gte(0);
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
        reAllocateTagMap(TagData);
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

var isDisposeTooManyComponents = function (disposeCount) {
    return disposeCount >= MemoryConfig.maxComponentDisposeCount;
};
var _setMapVal = function (map, uid, val) {
    map[uid] = val;
};
var reAllocateThreeDTransformMap = function (ThreeDTransformData) {
    var val = null, newParentMap = {}, newChildrenMap = {}, newIsTranslateMap = {}, newGameObjectMap = {}, newTempMap = {}, newAliveUIDArray = [], aliveUIDArray = ThreeDTransformData.aliveUIDArray, parentMap = ThreeDTransformData.parentMap, childrenMap = ThreeDTransformData.childrenMap, isTranslateMap = ThreeDTransformData.isTranslateMap, gameObjectMap = ThreeDTransformData.gameObjectMap, tempMap = ThreeDTransformData.tempMap;
    clearCacheMap(ThreeDTransformData);
    for (var _i = 0, aliveUIDArray_1 = aliveUIDArray; _i < aliveUIDArray_1.length; _i++) {
        var uid = aliveUIDArray_1[_i];
        val = childrenMap[uid];
        if (isNotValidMapValue(val)) {
            continue;
        }
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
var reAllocateGameObjectMap = function (GameObjectData) {
    var val = null, newParentMap = {}, newChildrenMap = {}, newComponentMap = {}, newAliveUIDArray = [], aliveUIDArray = GameObjectData.aliveUIDArray, parentMap = GameObjectData.parentMap, childrenMap = GameObjectData.childrenMap, componentMap = GameObjectData.componentMap;
    for (var _i = 0, aliveUIDArray_2 = aliveUIDArray; _i < aliveUIDArray_2.length; _i++) {
        var uid = aliveUIDArray_2[_i];
        val = componentMap[uid];
        if (isNotValidMapValue(val)) {
            continue;
        }
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
var reAllocateTagMap = function (TagData) {
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

var addAddComponentHandle$2 = function (_class) {
    addAddComponentHandle$1(_class, addComponent$2);
};
var addDisposeHandle$2 = function (_class) {
    addDisposeHandle$1(_class, disposeComponent$2);
};
var create$2 = ensureFunc(function (transform, ThreeDTransformData$$1) {
    it$1("componentMap should has data", function () {
        index_1(getChildren(transform.uid, ThreeDTransformData$$1)).exist;
    });
}, function (ThreeDTransformData$$1) {
    var transform = new ThreeDTransform(), index = _generateIndexInArrayBuffer(ThreeDTransformData$$1), uid = _buildUID$1(ThreeDTransformData$$1);
    transform.index = index;
    transform.uid = uid;
    _createTempData(uid, ThreeDTransformData$$1);
    _setTransformMap(index, transform, ThreeDTransformData$$1);
    setChildren(uid, [], ThreeDTransformData$$1);
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
        return isChildrenExist(getChildren(component.uid, ThreeDTransformData$$1));
    });
};
var init$2 = function (GlobalTempData$$1, ThreeDTransformData$$1, state) {
    return update$1(null, GlobalTempData$$1, ThreeDTransformData$$1, state);
};
var addComponent$2 = function (transform, gameObject) {
    var indexInArrayBuffer = transform.index, uid = transform.uid;
    addComponentToGameObjectMap(ThreeDTransformData.gameObjectMap, uid, gameObject);
    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
};
var disposeComponent$2 = function (transform) {
    var indexInArrayBuffer = transform.index, uid = transform.uid;
    if (isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
        _disposeFromNormalList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
    }
    else {
        _disposeFromDirtyList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
    }
    ThreeDTransformData.disposeCount += 1;
    if (isDisposeTooManyComponents(ThreeDTransformData.disposeCount)) {
        reAllocateThreeDTransformMap(ThreeDTransformData);
        ThreeDTransformData.disposeCount = 0;
    }
};
var getGameObject$1 = function (uid, ThreeDTransformData$$1) { return getComponentGameObject(ThreeDTransformData$$1.gameObjectMap, uid); };
var getParent$$1 = function (transform, ThreeDTransformData$$1) {
    var parent = getParent$1(transform.uid, ThreeDTransformData$$1);
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
    return DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(transform.index));
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
    var indexInArrayBuffer = getMatrix4DataIndexInArrayBuffer(transform.index), localToWorldMatrices = ThreeTransformData.localToWorldMatrices;
    return _getTempData(transform.uid, ThreeDTransformData).position.set(localToWorldMatrices[indexInArrayBuffer + 12], localToWorldMatrices[indexInArrayBuffer + 13], localToWorldMatrices[indexInArrayBuffer + 14]);
}));
var _setTransformMap = function (indexInArrayBuffer, transform, ThreeDTransformData$$1) { return ThreeDTransformData$$1.transformMap[indexInArrayBuffer] = transform; };
var setPosition = requireCheckFunc(function (transform, position, GlobalTempData$$1, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, function (transform, position, GlobalTempData$$1, ThreeTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, parent = getParent$1(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData$$1, ThreeTransformData);
    setIsTranslate(uid, true, ThreeTransformData);
    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
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
    return DataUtils.createVector3ByIndex(_getTempData(transform.uid, ThreeDTransformData).localPosition, ThreeDTransformData.localPositions, getVector3DataIndexInArrayBuffer(transform.index));
}));
var setLocalPosition = requireCheckFunc(function (transform, position, ThreeTransformData) {
    checkTransformShouldAlive(transform, ThreeTransformData);
}, function (transform, position, ThreeTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);
    setIsTranslate(uid, true, ThreeTransformData);
    return addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
});
var update$1 = function (elapsed, GlobalTempData$$1, ThreeDTransformData$$1, state) {
    return update$2(elapsed, GlobalTempData$$1, ThreeDTransformData$$1, state);
};
var _disposeItemInDataContainer = function (indexInArrayBuffer, uid, GlobalTempData$$1, ThreeDTransformData$$1) {
    var mat = GlobalTempData$$1.matrix4_1.setIdentity(), positionVec = GlobalTempData$$1.vector3_1.set(0, 0, 0), qua = GlobalTempData$$1.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData$$1.vector3_2.set(1, 1, 1);
    setTransformDataInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData$$1);
    removeHierarchyData(uid, ThreeDTransformData$$1);
    _disposeMapDatas$1(indexInArrayBuffer, uid, ThreeDTransformData$$1);
    return ThreeDTransformData$$1;
};
var _disposeMapDatas$1 = function (indexInArrayBuffer, uid, ThreeDTransformData$$1) {
    deleteVal(indexInArrayBuffer, ThreeDTransformData$$1.transformMap);
};
var _disposeFromNormalList = function (indexInArrayBuffer, uid, GlobalTempData$$1, ThreeDTransformData$$1) {
    addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData$$1.notUsedIndexLinkList);
    return _disposeItemInDataContainer(indexInArrayBuffer, uid, GlobalTempData$$1, ThreeDTransformData$$1);
};
var _disposeFromDirtyList = function (indexInArrayBuffer, uid, GlobalTempData$$1, ThreeDTransformData$$1) {
    var firstDirtyIndex = ThreeDTransformData$$1.firstDirtyIndex;
    swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData$$1);
    _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData$$1, ThreeDTransformData$$1);
    ThreeDTransformData$$1.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData$$1);
};
var _addDefaultTransformData = function (GlobalTempData$$1, ThreeDTransformData$$1) {
    var count = ThreeDTransformData$$1.count, mat = GlobalTempData$$1.matrix4_1.setIdentity(), positionVec = GlobalTempData$$1.vector3_1.set(0, 0, 0), qua = GlobalTempData$$1.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData$$1.vector3_2.set(1, 1, 1);
    for (var i = getStartIndexInArrayBuffer(); i < count; i++) {
        setTransformDataInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData$$1);
    }
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
    var buffer = null, count = ThreeDTransformData$$1.count, size = Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);
    ThreeDTransformData$$1.buffer = new ArrayBuffer(count * size);
    buffer = ThreeDTransformData$$1.buffer;
    ThreeDTransformData$$1.localToWorldMatrices = new Float32Array(buffer, 0, count * getMatrix4DataSize());
    ThreeDTransformData$$1.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getMatrix4DataSize(), count * getVector3DataSize());
    ThreeDTransformData$$1.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize()), count * getQuaternionDataSize());
    ThreeDTransformData$$1.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getMatrix4DataSize() + getVector3DataSize() + getQuaternionDataSize()), count * getVector3DataSize());
    ThreeDTransformData$$1.notUsedIndexLinkList = LinkList.create();
    ThreeDTransformData$$1.parentMap = createMap();
    ThreeDTransformData$$1.childrenMap = createMap();
    ThreeDTransformData$$1.isTranslateMap = createMap();
    ThreeDTransformData$$1.cacheMap = createMap();
    ThreeDTransformData$$1.tempMap = createMap();
    ThreeDTransformData$$1.transformMap = createMap();
    ThreeDTransformData$$1.gameObjectMap = createMap();
    ThreeDTransformData$$1.firstDirtyIndex = ThreeDTransformData$$1.count;
    ThreeDTransformData$$1.indexInArrayBuffer = getStartIndexInArrayBuffer();
    ThreeDTransformData$$1.uid = 0;
    ThreeDTransformData$$1.disposeCount = 0;
    ThreeDTransformData$$1.isClearCacheMap = false;
    ThreeDTransformData$$1.aliveUIDArray = [];
    _addDefaultTransformData(GlobalTempData$$1, ThreeDTransformData$$1);
};

var checkGameObjectShouldAlive = function (gameObject, GameObjectData) {
    it$1("gameObject is diposed, should release it", function () {
        index_1(isAlive(gameObject, GameObjectData)).true;
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

var getState = function (DirectorData) {
    return DirectorData.state;
};
var setState = function (state, DirectorData) {
    return IO.of(function () {
        DirectorData.state = state;
    });
};

var immutable$1 = createCommonjsModule(function (module, exports) {
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

var immutable_1 = immutable$1.fromJS;
var immutable_2 = immutable$1.Map;

var createState = function () {
    return immutable_2();
};
var isValueExist = function (val) {
    return val !== void 0;
};

var DirectorData = (function () {
    function DirectorData() {
    }
    return DirectorData;
}());
DirectorData.state = createState();

var GameObject = (function () {
    function GameObject() {
        this.uid = null;
    }
    return GameObject;
}());
GameObject = __decorate([
    registerClass("GameObject")
], GameObject);
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
    return getComponent(gameObject, getTypeIDFromClass(_class), GameObjectData);
});
var getGameObjectTransform = function (gameObject) {
    return getTransform(gameObject, GameObjectData);
};
var hasGameObjectComponent = requireCheckFunc(function (gameObject, _class) {
}, function (gameObject, _class) {
    return hasComponent(gameObject, getTypeIDFromClass(_class), GameObjectData);
});
var isGameObjectAlive = function (gameObject) {
    return isAlive(gameObject, GameObjectData);
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

var GeometryData = (function () {
    function GeometryData() {
    }
    return GeometryData;
}());
GeometryData.index = null;
GeometryData.count = null;
GeometryData.verticesMap = null;
GeometryData.indicesMap = null;
GeometryData.indexType = null;
GeometryData.indexTypeSize = null;
GeometryData.configDataMap = null;
GeometryData.computeDataFuncMap = null;
GeometryData.gameObjectMap = null;
GeometryData.geometryMap = null;

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

var DebugConfig = {
    isTest: false,
    debugCollision: false,
    showDebugPanel: false
};

var EScreenSize;
(function (EScreenSize) {
    EScreenSize[EScreenSize["FULL"] = 0] = "FULL";
})(EScreenSize || (EScreenSize = {}));

var Main = (function () {
    function Main() {
    }
    return Main;
}());
Main.isTest = false;

var detect = function (state) {
    return GPUDetector.getInstance().detect(state);
};

var getIsTest$1 = function (MainData) {
    return MainData.isTest;
};
var setIsTest = function (isTest, MainData) {
    return IO.of(function () {
        MainData.isTest = isTest;
    });
};
var setLibIsTest = function (isTest) {
    return IO.of(function () {
        Main.isTest = isTest;
    });
};
var getScreenSize = function (state) {
    return state.getIn(["Main", "screenSize"]);
};
var setConfig = function (closeContractTest, MainData, _a) {
    var _b = _a.canvasId, canvasId = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
        options: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        }
    } : _f;
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
        setIsTest(_isTest, MainData).run();
        return immutable_1({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
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
var init$4 = requireCheckFunc(function (gameState, configState, DeviceManagerData) {
    it$1("should set config before", function () {
        index_1(configState.get("useDevicePixelRatio")).exist;
    });
}, function (gameState, configState, DeviceManagerData) {
    return compose(map(detect), chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))), chain(setScreen(DeviceManagerData)), createGL)(configState.get("canvasId"), configState.get("contextConfig"), DeviceManagerData, gameState);
});

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
var getWidth = curry(function (dom) {
    return dom.clientWidth;
});
var setWidth = curry(function (width, dom) {
    return IO.of(function () {
        dom.width = width;
        return dom;
    });
});
var getHeight = curry(function (dom) {
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

var RectRegion = RectRegion_1 = (function (_super) {
    __extends(RectRegion, _super);
    function RectRegion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return RectRegion;
}(Vector4));
RectRegion = RectRegion_1 = __decorate([
    registerClass("RectRegion")
], RectRegion);
var RectRegion_1;

var root$1;
if (JudgeUtils$1.isNodeJs() && typeof global != "undefined") {
    root$1 = global;
}
else if (typeof window != "undefined") {
    root$1 = window;
}
else if (typeof self != "undefined") {
    root$1 = self;
}
else {
    Log$$1.error("no avaliable root!");
}

var getRootProperty = function (propertyName) {
    return IO.of(function () {
        return root$1[propertyName];
    });
};

var getGL = function (DeviceManagerData, state) {
    return DeviceManagerData.gl;
};
var setGL = curry(function (gl, DeviceManagerData, state) {
    DeviceManagerData.gl = gl;
    return state;
});
var setContextConfig = curry(function (contextConfig, state) {
    return state.setIn(["DeviceManager", "contextConfig"], contextConfig);
});
var setPixelRatio = function (pixelRatio, state) {
    return state.setIn(["DeviceManager", "pixelRatio"], pixelRatio);
};
var getViewport = function (state) {
    return state.getIn(["DeviceManager", "viewport"]);
};
var setViewport = function (x, y, width, height, state) {
    return state.setIn(["DeviceManager", "viewport"], RectRegion.create(x, y, width, height));
};
var _getCanvas = function (DomQuery$$1, domId) {
    if (domId !== "") {
        return DomQuery$$1.create(_getCanvasId(domId)).get(0);
    }
    return DomQuery$$1.create("<canvas></canvas>").prependTo("body").get(0);
};
var _getCanvasId = ensureFunc(function (id) {
    it$1("dom id should be #string", function () {
        index_1(/#[^#]+/.test(id)).true;
    });
}, function (domId) {
    if (domId.indexOf('#') > -1) {
        return domId;
    }
    return "#" + domId;
});
var setPixelRatioAndCanvas = curry(function (useDevicePixelRatio, state) {
    return IO.of(function () {
        if (!useDevicePixelRatio) {
            return state;
        }
        var pixelRatio = getRootProperty("devicePixelRatio").run(), dom = getCanvas(state);
        dom.width = Math.round(dom.width * pixelRatio);
        dom.height = Math.round(dom.height * pixelRatio);
        return setPixelRatio(pixelRatio, state);
    });
});
var createGL = curry(function (canvasId, contextConfig, DeviceManagerData, state) {
    return IO.of(function () {
        var dom = _getCanvas(DomQuery, canvasId), gl = getContext(contextConfig, dom);
        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(dom), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    });
});
var setViewportOfGL = curry(function (x, y, width, height, DeviceManagerData, state) {
    return IO.of(function () {
        var gl = getGL(DeviceManagerData, state), viewport = getViewport(state);
        if (isValueExist(viewport) && viewport.x === x && viewport.y === y && viewport.width === width && viewport.height === height) {
            return state;
        }
        gl.viewport(x, y, width, height);
        return setViewport(x, y, width, height, state);
    });
});
var _setBodyByScreenSize = function (screenSize) {
    return IO.of(function () {
        if (screenSize === EScreenSize.FULL) {
            DomQuery.create("body").css("margin", "0");
        }
        return screenSize;
    });
};
var _getScreenData = function (screenSize) {
    return IO.of(function () {
        var x = null, y = null, width = null, height = null, styleWidth = null, styleHeight = null;
        if (screenSize === EScreenSize.FULL) {
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
var _setScreenData = curry(function (DeviceManagerData, state, _a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height, styleWidth = _a.styleWidth, styleHeight = _a.styleHeight;
    return IO.of(function () {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(getCanvas(state)).run();
        return setViewportOfGL(0, 0, width, height, DeviceManagerData, state).run();
    });
});
var setScreen = curry(function (DeviceManagerData, state) {
    return IO.of(requireCheckFunc(function (state) {
        it$1("should exist MainData.screenSize", function () {
            index_1(getScreenSize(DirectorData.state)).exist;
        });
    }, function () {
        var dom = getCanvas(state);
        initCanvas(dom).run();
        return compose(chain(_setScreenData(DeviceManagerData, state)), chain(_getScreenData), _setBodyByScreenSize)(getScreenSize(state)).run();
    }));
});
var clear = function (gl, color, DeviceManagerData) {
    _setClearColor(gl, color, DeviceManagerData);
    setColorWrite(gl, true, true, true, true, DeviceManagerData);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};
var _setClearColor = function (gl, color, DeviceManagerData) {
    var clearColor = DeviceManagerData.clearColor;
    if (clearColor && clearColor.isEqual(color)) {
        return;
    }
    gl.clearColor(color.r, color.g, color.b, color.a);
    DeviceManagerData.clearColor = color;
};
var setColorWrite = function (gl, writeRed, writeGreen, writeBlue, writeAlpha, DeviceManagerData) {
    if (DeviceManagerData.writeRed !== writeRed
        || DeviceManagerData.writeGreen !== writeGreen
        || DeviceManagerData.writeBlue !== writeBlue
        || DeviceManagerData.writeAlpha !== writeAlpha) {
        gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
        DeviceManagerData.writeRed = writeRed;
        DeviceManagerData.writeGreen = writeGreen;
        DeviceManagerData.writeBlue = writeBlue;
        DeviceManagerData.writeAlpha = writeAlpha;
    }
};
var initData$7 = function (DeviceManagerData) {
    DeviceManagerData.gl = null;
    DeviceManagerData.clearColor = null;
    DeviceManagerData.writeRed = null;
    DeviceManagerData.writeGreen = null;
    DeviceManagerData.writeBlue = null;
    DeviceManagerData.writeAlpha = null;
};

var DeviceManagerData = (function () {
    function DeviceManagerData() {
    }
    return DeviceManagerData;
}());
DeviceManagerData.gl = null;
DeviceManagerData.clearColor = null;
DeviceManagerData.writeRed = null;
DeviceManagerData.writeGreen = null;
DeviceManagerData.writeBlue = null;
DeviceManagerData.writeAlpha = null;

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
    GPUDetector.prototype.detect = function (state) {
        this._isDetected = true;
        this._detectExtension(state);
        this._detectCapabilty(state);
        return state;
    };
    GPUDetector.prototype._detectExtension = function (state) {
        this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc", state);
        this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic", state);
        this.extensionInstancedArrays = this._getExtension("ANGLE_instanced_arrays", state);
        this.extensionUintIndices = this._getExtension("element_index_uint", state);
        this.extensionDepthTexture = this._getExtension("depth_texture", state);
        this.extensionVAO = this._getExtension("vao", state);
        this.extensionStandardDerivatives = this._getExtension("standard_derivatives", state);
    };
    GPUDetector.prototype._detectCapabilty = function (state) {
        var gl = getGL(DeviceManagerData, state);
        this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxAnisotropy = this._getMaxAnisotropy(state);
        this.maxBoneCount = this._getMaxBoneCount(state);
        this._detectPrecision(state);
    };
    GPUDetector.prototype._getExtension = function (name, state) {
        var extension, gl = getGL(DeviceManagerData, state);
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
    GPUDetector.prototype._getMaxBoneCount = function (state) {
        var gl = getGL(DeviceManagerData, state), numUniforms = null, maxBoneCount = null;
        numUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
        numUniforms -= 4 * 4;
        numUniforms -= 1;
        numUniforms -= 4 * 4;
        maxBoneCount = Math.floor(numUniforms / 4);
        return Math.min(maxBoneCount, 128);
    };
    GPUDetector.prototype._getMaxAnisotropy = function (state) {
        var extension = this.extensionTextureFilterAnisotropic, gl = getGL(DeviceManagerData, state);
        return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    };
    GPUDetector.prototype._detectPrecision = function (state) {
        var gl = getGL(DeviceManagerData, state);
        if (!gl.getShaderPrecisionFormat) {
            this.precision = EGPUPrecision.HIGHP;
            return;
        }
        var vertexShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.HIGH_FLOAT), vertexShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT), fragmentShaderPrecisionHighpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), fragmentShaderPrecisionMediumpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT), highpAvailable = vertexShaderPrecisionHighpFloat.precision > 0 && fragmentShaderPrecisionHighpFloat.precision > 0, mediumpAvailable = vertexShaderPrecisionMediumpFloat.precision > 0 && fragmentShaderPrecisionMediumpFloat.precision > 0;
        if (!highpAvailable) {
            if (mediumpAvailable) {
                this.precision = EGPUPrecision.MEDIUMP;
                Log$$1.warn(Log$$1.info.FUNC_NOT_SUPPORT("gpu", "highp, using mediump"));
            }
            else {
                this.precision = EGPUPrecision.LOWP;
                Log$$1.warn(Log$$1.info.FUNC_NOT_SUPPORT("gpu", "highp and mediump, using lowp"));
            }
        }
        else {
            this.precision = EGPUPrecision.HIGHP;
        }
    };
    return GPUDetector;
}());
GPUDetector = __decorate([
    singleton(),
    registerClass("GPUDetector")
], GPUDetector);
var EGPUPrecision;
(function (EGPUPrecision) {
    EGPUPrecision[EGPUPrecision["HIGHP"] = 0] = "HIGHP";
    EGPUPrecision[EGPUPrecision["MEDIUMP"] = 1] = "MEDIUMP";
    EGPUPrecision[EGPUPrecision["LOWP"] = 2] = "LOWP";
})(EGPUPrecision || (EGPUPrecision = {}));

var EBufferType;
(function (EBufferType) {
    EBufferType[EBufferType["BYTE"] = "BYTE"] = "BYTE";
    EBufferType[EBufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
    EBufferType[EBufferType["SHORT"] = "SHORT"] = "SHORT";
    EBufferType[EBufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
    EBufferType[EBufferType["INT"] = "INT"] = "INT";
    EBufferType[EBufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
    EBufferType[EBufferType["FLOAT"] = "FLOAT"] = "FLOAT";
})(EBufferType || (EBufferType = {}));

var EDrawMode;
(function (EDrawMode) {
    EDrawMode[EDrawMode["POINTS"] = "POINTS"] = "POINTS";
    EDrawMode[EDrawMode["LINES"] = "LINES"] = "LINES";
    EDrawMode[EDrawMode["LINE_LOOP"] = "LINE_LOOP"] = "LINE_LOOP";
    EDrawMode[EDrawMode["LINE_STRIP"] = "LINE_STRIP"] = "LINE_STRIP";
    EDrawMode[EDrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    EDrawMode[EDrawMode["TRIANGLE_STRIP"] = "TRIANGLE_STRIP"] = "TRIANGLE_STRIP";
    EDrawMode[EDrawMode["TRANGLE_FAN"] = "TRIANGLE_FAN"] = "TRANGLE_FAN";
})(EDrawMode || (EDrawMode = {}));

var addAddComponentHandle$4 = function (_class) {
    addAddComponentHandle$1(_class, addComponent$4);
};
var addDisposeHandle$4 = function (_class) {
    addDisposeHandle$1(_class, disposeComponent$4);
};
var addInitHandle$1 = function (_class) {
    addInitHandle(_class, initGeometry$1);
};
var create$4 = requireCheckFunc(function (geometry, GeometryData$$1) {
    checkIndexShouldEqualCount(GeometryData$$1);
}, function (geometry, GeometryData$$1) {
    var index = generateComponentIndex(GeometryData$$1);
    geometry.index = index;
    GeometryData$$1.count += 1;
    GeometryData$$1.geometryMap[index] = geometry;
    return geometry;
});
var init$3 = function (GeometryData$$1, state) {
    for (var i = 0, count = GeometryData$$1.count; i < count; i++) {
        initGeometry$1(i, state);
    }
    return state;
};
var initGeometry$1 = function (index, state) {
    var computeDataFunc = GeometryData.computeDataFuncMap[index];
    if (_isComputeDataFuncNotExist(computeDataFunc)) {
        return;
    }
    var _a = computeDataFunc(index, GeometryData), vertices = _a.vertices, indices = _a.indices;
    setVertices(index, vertices, GeometryData);
    setIndices(index, indices, GeometryData);
};
var _isComputeDataFuncNotExist = function (func) { return isNotValidMapValue(func); };
var getDrawMode$1 = function (index, GeometryData$$1) {
    return EDrawMode.TRIANGLES;
};
var getVerticesCount = function (index, GeometryData$$1) {
    return getVertices$1(index, GeometryData$$1).length;
};
var getIndicesCount = function (index, GeometryData$$1) {
    return getIndices$1(index, GeometryData$$1).length;
};
var getIndexType = function (GeometryData$$1) {
    return GeometryData$$1.indexType;
};
var getIndexTypeSize = function (GeometryData$$1) {
    return GeometryData$$1.indexTypeSize;
};
var getVertices$1 = function (index, GeometryData$$1) {
    return GeometryData$$1.verticesMap[index];
};
var setVertices = requireCheckFunc(function (index, vertices, GeometryData$$1) {
    it$1("vertices should not already exist", function () {
        index_1(GeometryData$$1.verticesMap[index]).not.exist;
    });
}, function (index, vertices, GeometryData$$1) {
    GeometryData$$1.verticesMap[index] = vertices;
});
var getIndices$1 = function (index, GeometryData$$1) {
    return GeometryData$$1.indicesMap[index];
};
var setIndices = requireCheckFunc(function (index, indices, GeometryData$$1) {
    it$1("indices should not already exist", function () {
        index_1(GeometryData$$1.indicesMap[index]).not.exist;
    });
}, function (index, indices, GeometryData$$1) {
    GeometryData$$1.indicesMap[index] = indices;
});
var hasIndices = function (index, GeometryData$$1) {
    var indices = getIndices$1(index, GeometryData$$1);
    if (isNotValidMapValue(indices)) {
        return false;
    }
    return indices.length > 0;
};
var addComponent$4 = function (component, gameObject) {
    addComponentToGameObjectMap(GeometryData.gameObjectMap, component.index, gameObject);
};
var disposeComponent$4 = ensureFunc(function (returnVal, component) {
    checkIndexShouldEqualCount(GeometryData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    deleteBySwap$1(sourceIndex, GeometryData.verticesMap);
    deleteBySwap$1(sourceIndex, GeometryData.indicesMap);
    GeometryData.count -= 1;
    GeometryData.index -= 1;
    lastComponentIndex = GeometryData.count;
    deleteBySwap(sourceIndex, lastComponentIndex, GeometryData.configDataMap);
    deleteBySwap(sourceIndex, lastComponentIndex, GeometryData.computeDataFuncMap);
    deleteBySwap(sourceIndex, lastComponentIndex, GeometryData.gameObjectMap);
    deleteComponentBySwap(sourceIndex, lastComponentIndex, GeometryData.geometryMap);
});
var getGameObject$3 = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
var getConfigData = function (index, GeometryData$$1) {
    return GeometryData$$1.configDataMap[index];
};
var initData$6 = function (DataBufferConfig, GeometryData$$1) {
    var isIndicesBufferNeed32Bits = _checkIsIndicesBufferNeed32BitsByConfig(DataBufferConfig), indicesArrayBytes = null;
    if (isIndicesBufferNeed32Bits) {
        indicesArrayBytes = Uint32Array.BYTES_PER_ELEMENT;
        GeometryData$$1.indexType = EBufferType.UNSIGNED_INT;
    }
    else {
        indicesArrayBytes = Uint16Array.BYTES_PER_ELEMENT;
        GeometryData$$1.indexType = EBufferType.UNSIGNED_SHORT;
    }
    GeometryData$$1.indexTypeSize = indicesArrayBytes;
    GeometryData$$1.configDataMap = createMap();
    GeometryData$$1.verticesMap = [];
    GeometryData$$1.indicesMap = [];
    GeometryData$$1.computeDataFuncMap = createMap();
    GeometryData$$1.gameObjectMap = createMap();
    GeometryData$$1.geometryMap = createMap();
    GeometryData$$1.index = 0;
    GeometryData$$1.count = 0;
};
var _checkIsIndicesBufferNeed32BitsByConfig = function (DataBufferConfig) {
    if (DataBufferConfig.geometryIndicesBufferBits === 16) {
        return false;
    }
    return GPUDetector.getInstance().extensionUintIndices === true;
};
var isIndicesBufferNeed32BitsByData = function (GeometryData$$1) {
    return GeometryData$$1.indexType === EBufferType.UNSIGNED_INT;
};
var convertVerticesArrayToTypeArray = function (vertices) {
    return new Float32Array(vertices);
};
var convertIndicesArrayToTypeArray = function (indices, GeometryData$$1) {
    return isIndicesBufferNeed32BitsByData(GeometryData$$1) ? new Uint32Array(indices) : new Uint16Array(indices);
};

var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Geometry;
}(Component));
Geometry = __decorate([
    registerClass("Geometry")
], Geometry);
var getDrawMode$$1 = function (geometry) {
    return getDrawMode$1(geometry.index, GeometryData);
};
var getVertices$$1 = function (geometry) {
    return getVertices$1(geometry.index, GeometryData);
};
var getIndices$$1 = function (geometry) {
    return getIndices$1(geometry.index, GeometryData);
};
var getGeometryConfigData = function (geometry) {
    return getConfigData(geometry.index, GeometryData);
};
var initGeometry$$1 = function (geometry) {
    initGeometry$1(geometry.index, getState(DirectorData));
};
var getGeometryGameObject = function (geometry) {
    return getGameObject$3(geometry.index, GeometryData);
};

var Shader = (function () {
    function Shader() {
        this.index = null;
    }
    return Shader;
}());
Shader = __decorate([
    registerClass("Shader")
], Shader);

var isBufferExist = function (buffer) { return isValidMapValue(buffer); };

var getOrCreateBuffer = function (gl, geometryIndex, GeometryData, IndexBufferData) {
    var buffers = IndexBufferData.buffers, buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer(gl, getIndices$1(geometryIndex, GeometryData), buffer, IndexBufferData);
    return buffer;
};
var _initBuffer = function (gl, data, buffer, IndexBufferData) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer(gl, IndexBufferData);
};
var _resetBindedBuffer = function (gl, IndexBufferData) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};
var getType = function (GeometryData) {
    return getIndexType(GeometryData);
};
var getTypeSize = function (GeometryData) {
    return getIndexTypeSize(GeometryData);
};
var initData$10 = function (IndexBufferData) {
    IndexBufferData.buffers = [];
};

var isConfigDataExist = function (configData) {
    return isValueExist(configData);
};

var main_begin = "void main(void){\n";
var main_end = "}\n";
var setPos_mvp = "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n";

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

var buildGLSLSource = requireCheckFunc(function (materialIndex, materialShaderLibConfig, shaderLibData) {
    it$1("shaderLib should be defined", function () {
        forEach(materialShaderLibConfig, function (shaderLibName) {
            index_1(shaderLibData[shaderLibName]).exist;
        });
    });
}, function (materialIndex, materialShaderLibConfig, shaderLibData) {
    var vsTop = "", vsDefine = "", vsVarDeclare = "", vsFuncDeclare = "", vsFuncDefine = "", vsBody = "", fsTop = "", fsDefine = "", fsVarDeclare = "", fsFuncDeclare = "", fsFuncDefine = "", fsBody = "";
    vsBody += main_begin;
    fsBody += main_begin;
    fsTop += _getPrecisionSource(lowp_fragment, mediump_fragment, highp_fragment);
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var glslData = shaderLibData[shaderLibName].glsl, vs = null, fs = null, func = null;
        if (!isConfigDataExist(glslData)) {
            return;
        }
        vs = glslData.vs;
        fs = glslData.fs;
        func = glslData.func;
        if (isConfigDataExist(vs)) {
            vsTop += _getGLSLPartData(vs, "top");
            vsDefine += _getGLSLPartData(vs, "define");
            vsVarDeclare += _getGLSLPartData(vs, "varDeclare");
            vsFuncDeclare += _getGLSLPartData(vs, "funcDeclare");
            vsFuncDefine += _getGLSLPartData(vs, "funcDefine");
            vsBody += _getGLSLPartData(vs, "body");
        }
        if (isConfigDataExist(fs)) {
            fsTop += _getGLSLPartData(fs, "top");
            fsDefine += _getGLSLPartData(fs, "define");
            fsVarDeclare += _getGLSLPartData(fs, "varDeclare");
            fsFuncDeclare += _getGLSLPartData(fs, "funcDeclare");
            fsFuncDefine += _getGLSLPartData(fs, "funcDefine");
            fsBody += _getGLSLPartData(fs, "body");
        }
        if (isConfigDataExist(func)) {
            var funcConfig = func(materialIndex);
            if (isConfigDataExist(funcConfig)) {
                var vs_1 = funcConfig.vs, fs_1 = funcConfig.fs;
                if (isConfigDataExist(vs_1)) {
                    vs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), vs_1);
                    vsTop += _getFuncGLSLPartData(vs_1, "top");
                    vsDefine += _getFuncGLSLPartData(vs_1, "define");
                    vsVarDeclare += _getFuncGLSLPartData(vs_1, "varDeclare");
                    vsFuncDeclare += _getFuncGLSLPartData(vs_1, "funcDeclare");
                    vsFuncDefine += _getFuncGLSLPartData(vs_1, "funcDefine");
                    vsBody += _getFuncGLSLPartData(vs_1, "body");
                }
                if (isConfigDataExist(fs_1)) {
                    fs_1 = ExtendUtils.extend(_getEmptyFuncGLSLConfig(), fs_1);
                    fsTop += _getFuncGLSLPartData(fs_1, "top");
                    fsDefine += _getFuncGLSLPartData(fs_1, "define");
                    fsVarDeclare += _getFuncGLSLPartData(fs_1, "varDeclare");
                    fsFuncDeclare += _getFuncGLSLPartData(fs_1, "funcDeclare");
                    fsFuncDefine += _getFuncGLSLPartData(fs_1, "funcDefine");
                    fsBody += _getFuncGLSLPartData(fs_1, "body");
                }
            }
        }
    });
    vsBody += main_end;
    fsBody += main_end;
    vsTop += _generateAttributeSource(materialShaderLibConfig, shaderLibData);
    vsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, vsVarDeclare, vsFuncDefine, vsBody);
    fsTop += _generateUniformSource(materialShaderLibConfig, shaderLibData, fsVarDeclare, fsFuncDefine, fsBody);
    return {
        vsSource: vsTop + vsDefine + vsVarDeclare + vsFuncDeclare + vsFuncDefine + vsBody,
        fsSource: fsTop + fsDefine + fsVarDeclare + fsFuncDeclare + fsFuncDefine + fsBody
    };
});
var _getEmptyFuncGLSLConfig = function () {
    return {
        "top": "",
        "varDeclare": "",
        "funcDeclare": "",
        "funcDefine": "",
        "body": ""
    };
};
var _getPrecisionSource = function (lowp_fragment$$1, mediump_fragment$$1, highp_fragment$$1) {
    var precision = GPUDetector.getInstance().precision, result = null;
    switch (precision) {
        case EGPUPrecision.HIGHP:
            result = highp_fragment$$1.top;
            break;
        case EGPUPrecision.MEDIUMP:
            result = mediump_fragment$$1.top;
            break;
        case EGPUPrecision.LOWP:
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
var _getFuncGLSLPartData = function (glslConfig, partName) {
    return glslConfig[partName];
};
var _isInSource = function (key, source) {
    return source.indexOf(key) > -1;
};
var _generateAttributeSource = function (materialShaderLibConfig, shaderLibData) {
    var result = "";
    forEach(materialShaderLibConfig, function (shaderLibName) {
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
var _generateUniformSource = function (materialShaderLibConfig, shaderLibData, sourceVarDeclare, sourceFuncDefine, sourceBody) {
    var result = "", generateFunc = compose(forEachArray(function (data) {
        result += "uniform " + data.type + " " + data.name + ";\n";
    }), filterArray(function (data) {
        var name = data.name;
        return _isInSource(name, sourceVarDeclare) || _isInSource(name, sourceFuncDefine) || _isInSource(name, sourceBody);
    }));
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send, uniformData = null;
        if (!isConfigDataExist(sendData) || !isConfigDataExist(sendData.uniform)) {
            return;
        }
        uniformData = sendData.uniform;
        generateFunc(uniformData);
    });
    return result;
};

var setLocationMap = ensureFunc(function (returnVal, gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData) {
    it$1("attribute should contain position at least", function () {
        index_1(ShaderData.attributeLocationMap[shaderIndex]["a_position"]).be.a("number");
    });
}, requireCheckFunc(function (gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData) {
    it$1("not setted location before", function () {
        index_1(isValidMapValue(ShaderData.attributeLocationMap[shaderIndex])).false;
        index_1(isValidMapValue(ShaderData.uniformLocationMap[shaderIndex])).false;
    });
}, function (gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData) {
    var attributeLocationMap = {}, uniformLocationMap = {}, sendData = null, attributeName = null, uniformName = null;
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var attribute = null, uniform = null;
        sendData = shaderLibData[shaderLibName].send;
        if (!isConfigDataExist(sendData)) {
            return;
        }
        attribute = sendData.attribute;
        uniform = sendData.uniform;
        if (isConfigDataExist(attribute)) {
            forEach(attribute, function (data) {
                attributeName = data.name;
                attributeLocationMap[attributeName] = gl.getAttribLocation(program, attributeName);
            });
        }
        if (isConfigDataExist(uniform)) {
            forEach(uniform, function (data) {
                uniformName = data.name;
                uniformLocationMap[uniformName] = gl.getUniformLocation(program, uniformName);
            });
        }
    });
    ShaderData.attributeLocationMap[shaderIndex] = attributeLocationMap;
    ShaderData.uniformLocationMap[shaderIndex] = uniformLocationMap;
}));
var getAttribLocation = ensureFunc(function (pos, name, attributeLocationMap) {
    it$1(name + "'s attrib location should be number", function () {
        index_1(pos).be.a("number");
    });
}, function (name, attributeLocationMap) {
    return attributeLocationMap[name];
});
var getUniformLocation = ensureFunc(function (pos, name, uniformLocationMap) {
    it$1(name + "'s uniform location should exist in map", function () {
        index_1(isValidMapValue(pos)).true;
    });
}, function (name, uniformLocationMap) {
    return uniformLocationMap[name];
});
var isUniformLocationNotExist = function (pos) {
    return pos === null;
};
var isAttributeLocationNotExist = function (pos) {
    return pos === -1;
};

var EVariableType;
(function (EVariableType) {
    EVariableType[EVariableType["FLOAT"] = "float"] = "FLOAT";
    EVariableType[EVariableType["VEC3"] = "vec3"] = "VEC3";
    EVariableType[EVariableType["MAT4"] = "mat4"] = "MAT4";
})(EVariableType || (EVariableType = {}));

var getOrCreateBuffer$1 = function (gl, geometryIndex, bufferType, GeometryData, ArrayBufferData) {
    var buffers = ArrayBufferData.buffers, buffer = buffers[geometryIndex];
    if (isBufferExist(buffer)) {
        return buffer;
    }
    buffer = gl.createBuffer();
    buffers[geometryIndex] = buffer;
    _initBuffer$1(gl, getVertices$1(geometryIndex, GeometryData), buffer, ArrayBufferData);
    ArrayBufferData.bufferDataMap[geometryIndex] = {
        size: 3,
        type: EBufferType.FLOAT
    };
    return buffer;
};
var _initBuffer$1 = function (gl, data, buffer, ArrayBufferData) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    _resetBindedBuffer$1(gl, ArrayBufferData);
};
var _resetBindedBuffer$1 = function (gl, ArrayBufferData) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
var initData$11 = function (ArrayBufferData) {
    ArrayBufferData.buffers = [];
    ArrayBufferData.bufferDataMap = createMap();
};

var getUniformData = function (field, from, renderCommand, MaterialData) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommand[field];
            break;
        case "material":
            data = _getUnifromDataFromMaterial(field, renderCommand.materialIndex, MaterialData);
            break;
        default:
            error$1(true, "unknow from:" + from);
            break;
    }
    return data;
};
var _getUnifromDataFromMaterial = function (field, materialIndex, MaterialData) {
    var data = null;
    switch (field) {
        case "color":
            data = getColor(materialIndex, MaterialData).toVector3();
            break;
        case "opacity":
            data = getOpacity(materialIndex, MaterialData);
            break;
        default:
            error$1(true, "unknow field:" + field);
            break;
    }
    return data;
};
var sendBuffer = function (gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData) {
    var _a = ArrayBufferData.bufferDataMap[geometryIndex], size = _a.size, type = _a.type, vertexAttribHistory = ShaderData.vertexAttribHistory;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);
    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);
        vertexAttribHistory[pos] = true;
    }
};
var sendMatrix4 = function (gl, name, data, uniformLocationMap) {
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniformMatrix4fv(pos, false, data);
    });
};
var sendVector3 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    var recordedData = getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData && recordedData.x == data.x && recordedData.y == data.y && recordedData.z == data.z) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniform3f(pos, data.x, data.y, data.z);
    });
};
var sendFloat1 = requireCheckFunc(function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    it$1("data should be number", function () {
        index_1(data).be.a("number");
    });
}, function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    var recordedData = getUniformCache(shaderIndex, name, uniformCacheMap);
    if (recordedData === data) {
        return;
    }
    _setUniformCache(shaderIndex, name, data, uniformCacheMap);
    _sendUniformData(gl, name, data, uniformLocationMap, function (pos, data) {
        gl.uniform1f(pos, data);
    });
});
var getUniformCache = function (shaderIndex, name, uniformCacheMap) {
    return uniformCacheMap[shaderIndex][name];
};
var _setUniformCache = function (shaderIndex, name, data, uniformCacheMap) {
    uniformCacheMap[shaderIndex][name] = data;
};
var _sendUniformData = function (gl, name, data, uniformLocationMap, sendFunc) {
    var pos = getUniformLocation(name, uniformLocationMap);
    if (isUniformLocationNotExist(pos)) {
        return;
    }
    sendFunc(pos, data);
};
var addSendAttributeConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    it$1("sendAttributeConfigMap should not has duplicate attribute name", function () {
        index_1(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    it$1("sendAttributeConfigMap[shaderIndex] should not be defined", function () {
        index_1(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibConfig, shaderLibData, sendAttributeConfigMap) {
    var sendDataArr = [];
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    });
    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}));
var addSendUniformConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    it$1("sendUniformConfigMap should not has duplicate attribute name", function () {
        index_1(hasDuplicateItems(sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    it$1("sendUniformConfigMap[shaderIndex] should not be defined", function () {
        index_1(sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibConfig, shaderLibData, sendUniformConfigMap) {
    var sendDataArr = [];
    forEach(materialShaderLibConfig, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.uniform)) {
            sendDataArr = sendDataArr.concat(sendData.uniform);
        }
    });
    sendUniformConfigMap[shaderIndex] = sendDataArr;
}));

var use$1 = requireCheckFunc(function (gl, shaderIndex, ShaderData) {
    it$1("program should exist", function () {
        index_1(getProgram(shaderIndex, ShaderData)).exist;
    });
}, function (gl, shaderIndex, ShaderData) {
    var program = getProgram(shaderIndex, ShaderData);
    if (ShaderData.lastUsedProgram === program) {
        return;
    }
    ShaderData.lastUsedProgram = program;
    gl.useProgram(program);
    disableVertexAttribArray(gl, ShaderData);
    ShaderData.lastBindedArrayBuffer = null;
    ShaderData.lastBindedIndexBuffer = null;
});
var disableVertexAttribArray = requireCheckFunc(function (gl, ShaderData) {
    it$1("vertexAttribHistory should has not hole", function () {
        forEach(ShaderData.vertexAttribHistory, function (isEnable) {
            index_1(isEnable).exist;
            index_1(isEnable).be.a("boolean");
        });
    });
}, function (gl, ShaderData) {
    var vertexAttribHistory = ShaderData.vertexAttribHistory;
    for (var i = 0, len = vertexAttribHistory.length; i < len; i++) {
        var isEnable = vertexAttribHistory[i];
        if (isEnable === false || i > gl.VERTEX_ATTRIB_ARRAY_ENABLED) {
            continue;
        }
        gl.disableVertexAttribArray(i);
    }
    ShaderData.vertexAttribHistory = [];
});
var getMaterialShaderLibConfig = requireCheckFunc(function (materialClassName, material_config) {
    var materialData = material_config[materialClassName];
    it$1("materialClassName should be defined", function () {
        index_1(materialData).exist;
    });
    it$1("shaderLib should be array", function () {
        index_1(materialData.shader.shaderLib).be.a("array");
    });
}, function (materialClassName, material_config) {
    return material_config[materialClassName].shader.shaderLib;
});
var registerProgram = function (shaderIndex, ShaderData, program) {
    ShaderData.programMap[shaderIndex] = program;
};
var getProgram = ensureFunc(function (program) {
}, function (shaderIndex, ShaderData) {
    return ShaderData.programMap[shaderIndex];
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
    it$1("link program error:" + gl.getProgramInfoLog(program), function () {
        index_1(gl.getProgramParameter(program, gl.LINK_STATUS)).true;
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
var sendAttributeData$1 = function (gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData) {
    var sendDataArr = ShaderData.sendAttributeConfigMap[shaderIndex], attributeLocationMap = ShaderData.attributeLocationMap[shaderIndex], lastBindedArrayBuffer = ShaderData.lastBindedArrayBuffer;
    for (var _i = 0, sendDataArr_1 = sendDataArr; _i < sendDataArr_1.length; _i++) {
        var sendData = sendDataArr_1[_i];
        var buffer = getOrCreateBuffer$1(gl, geometryIndex, sendData.buffer, GeometryData, ArrayBufferData), pos = getAttribLocation(sendData.name, attributeLocationMap);
        if (isAttributeLocationNotExist(pos)) {
            return;
        }
        if (lastBindedArrayBuffer === buffer) {
            return;
        }
        lastBindedArrayBuffer = buffer;
        sendBuffer(gl, pos, buffer, geometryIndex, ShaderData, ArrayBufferData);
    }
    ShaderData.lastBindedArrayBuffer = lastBindedArrayBuffer;
};
var sendUniformData$1 = function (gl, shaderIndex, MaterialData, ShaderData, renderCommand) {
    var sendDataArr = ShaderData.sendUniformConfigMap[shaderIndex], uniformLocationMap = ShaderData.uniformLocationMap[shaderIndex], uniformCacheMap = ShaderData.uniformCacheMap;
    for (var _i = 0, sendDataArr_2 = sendDataArr; _i < sendDataArr_2.length; _i++) {
        var sendData = sendDataArr_2[_i];
        var name = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = getUniformData(field, from, renderCommand, MaterialData);
        switch (type) {
            case EVariableType.MAT4:
                sendMatrix4(gl, name, data, uniformLocationMap);
                break;
            case EVariableType.VEC3:
                sendVector3(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap);
                break;
            case EVariableType.FLOAT:
                sendFloat1(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap);
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    }
};

var create$6 = function (ShaderData) {
    var shader = new Shader(), index = generateComponentIndex(ShaderData);
    shader.index = index;
    ShaderData.count += 1;
    ShaderData.uniformCacheMap[index] = {};
    return shader;
};
var init$6 = function (state, materialIndex, shaderIndex, materialClassName, material_config, shaderLib_generator, DeviceManagerData, ShaderData) {
    var materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config), shaderLibData = shaderLib_generator.shaderLibs, _a = buildGLSLSource(materialIndex, materialShaderLibConfig, shaderLibData), vsSource = _a.vsSource, fsSource = _a.fsSource, program = getProgram(shaderIndex, ShaderData), gl = getGL(DeviceManagerData, state);
    if (!isProgramExist(program)) {
        program = gl.createProgram();
        registerProgram(shaderIndex, ShaderData, program);
    }
    initShader(program, vsSource, fsSource, gl);
    setLocationMap(gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData);
    addSendAttributeConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibConfig, shaderLibData, ShaderData.sendUniformConfigMap);
};
var sendAttributeData$$1 = function (gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData) {
    sendAttributeData$1(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
};
var sendUniformData$$1 = function (gl, shaderIndex, MaterialData, ShaderData, renderCommand) {
    sendUniformData$1(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
};
var bindIndexBuffer = function (gl, geometryIndex, ShaderData, GeometryData, IndexBufferData) {
    var buffer = getOrCreateBuffer(gl, geometryIndex, GeometryData, IndexBufferData);
    if (ShaderData.lastBindedIndexBuffer === buffer) {
        return;
    }
    ShaderData.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
var use$$1 = function (gl, shaderIndex, ShaderData) {
    use$1(gl, shaderIndex, ShaderData);
};

var initData$9 = function (ShaderData) {
    ShaderData.index = 0;
    ShaderData.count = 0;
    ShaderData.programMap = createMap();
    ShaderData.attributeLocationMap = createMap();
    ShaderData.uniformLocationMap = createMap();
    ShaderData.sendAttributeConfigMap = createMap();
    ShaderData.sendUniformConfigMap = createMap();
    ShaderData.vertexAttribHistory = [];
    ShaderData.uniformCacheMap = createMap();
    ShaderData.shaderMap = createMap();
    ShaderData.isInitMap = createMap();
};

var material_config = {
    "BasicMaterial": {
        "shader": {
            "shaderLib": [
                "CommonShaderLib",
                "VerticeCommonShaderLib",
                "BasicMaterialColorShaderLib",
                "BasicShaderLib",
                "EndBasicShaderLib",
                "EndShaderLib"
            ]
        }
    }
};

var MaterialData = (function () {
    function MaterialData() {
    }
    return MaterialData;
}());
MaterialData.index = null;
MaterialData.count = null;
MaterialData.shaderMap = null;
MaterialData.materialClassNameMap = null;
MaterialData.gameObjectMap = null;
MaterialData.colorMap = null;
MaterialData.opacityMap = null;
MaterialData.alphaTestMap = null;
MaterialData.materialMap = null;

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
                        "name": "u_mMatrix",
                        "field": "mMatrix",
                        "type": "mat4"
                    },
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
        "VerticeCommonShaderLib": {
            "send": {
                "attribute": [
                    {
                        "name": "a_position",
                        "buffer": "vertice",
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
                        "from": "material",
                        "field": "color",
                        "type": "vec3"
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
                        "from": "material",
                        "field": "opacity",
                        "type": "float"
                    }
                ]
            }
        },
        "EndBasicShaderLib": {
            "glsl": {
                "func": function (materialIndex) {
                    var alphaTest = getAlphaTest(materialIndex, MaterialData);
                    if (isPropertyExist(alphaTest)) {
                        return {
                            "fs": {
                                "body": "if (gl_FragColor.a < " + alphaTest + "){\n    discard;\n}\n"
                            }
                        };
                    }
                    return void 0;
                }
            }
        },
        "EndShaderLib": {
            "glsl": {
                "fs": {
                    "source": end_basic_fragment
                }
            }
        }
    }
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
var Color = Color_1 = (function () {
    function Color() {
        this._r = null;
        this._g = null;
        this._b = null;
        this._a = null;
        this._colorString = null;
        this._colorVec3Cache = null;
        this._colorVec4Cache = null;
    }
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
    };
    return Color;
}());
__decorate([
    ensureGetter(function (r) {
        assert(r >= 0, Log$$1.info.FUNC_SHOULD("r", ">= 0, but actual is " + r));
    })
], Color.prototype, "r", null);
__decorate([
    ensureGetter(function (g) {
        assert(g >= 0, Log$$1.info.FUNC_SHOULD("g", ">= 0, but actual is " + g));
    })
], Color.prototype, "g", null);
__decorate([
    ensureGetter(function (b) {
        assert(b >= 0, Log$$1.info.FUNC_SHOULD("b", ">= 0, but actual is " + b));
    })
], Color.prototype, "b", null);
__decorate([
    ensureGetter(function (a) {
        assert(a >= 0, Log$$1.info.FUNC_SHOULD("a", ">= 0, but actual is " + a));
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
    requireCheck(function (colorVal) {
        it$1("color should be #xxxxxx", function () {
            index_1(REGEX_NUM.test(colorVal)).true;
        });
    })
], Color.prototype, "setColorByNum", null);
Color = Color_1 = __decorate([
    registerClass("Color")
], Color);
var Color_1;

var ShaderData = (function () {
    function ShaderData() {
    }
    return ShaderData;
}());
ShaderData.index = null;
ShaderData.count = null;
ShaderData.programMap = null;
ShaderData.attributeLocationMap = null;
ShaderData.uniformLocationMap = null;
ShaderData.uniformCacheMap = null;
ShaderData.sendAttributeConfigMap = null;
ShaderData.sendUniformConfigMap = null;
ShaderData.shaderMap = null;
ShaderData.isInitMap = null;
ShaderData.lastUsedProgram = null;
ShaderData.vertexAttribHistory = null;
ShaderData.lastBindedArrayBuffer = null;
ShaderData.lastBindedIndexBuffer = null;

var addAddComponentHandle$5 = function (_class) {
    addAddComponentHandle$1(_class, addComponent$5);
};
var addDisposeHandle$5 = function (_class) {
    addDisposeHandle$1(_class, disposeComponent$5);
};
var addInitHandle$2 = function (_class) {
    addInitHandle(_class, initMaterial$1);
};
var create$5 = requireCheckFunc(function (material, className, MaterialData$$1) {
    it$1("MaterialData.index should >= 0", function () {
        index_1(MaterialData$$1.index).gte(0);
    });
    it$1("MaterialData.count should >= 0", function () {
        index_1(MaterialData$$1.count).gte(0);
    });
}, function (material, className, MaterialData$$1) {
    var index = generateComponentIndex(MaterialData$$1);
    material.index = index;
    MaterialData$$1.count += 1;
    _setMaterialClassName(index, className, MaterialData$$1);
    setColor(index, _createDefaultColor(), MaterialData$$1);
    setOpacity(index, 1, MaterialData$$1);
    MaterialData$$1.materialMap[index] = material;
    return material;
});
var _createDefaultColor = function () {
    var color = Color.create();
    return color.setColorByNum("#ffffff");
};
var init$5 = requireCheckFunc(function (state, material_config$$1, shaderLib_generator$$1, DeviceManagerData$$1, ShaderData$$1, MaterialData$$1) {
}, function (state, material_config$$1, shaderLib_generator$$1, DeviceManagerData$$1, ShaderData$$1, MaterialData$$1) {
    for (var i = 0, count = MaterialData$$1.count; i < count; i++) {
        initMaterial$1(i, state);
    }
});
var initMaterial$1 = function (index, state) {
    var shader = getShader(index, MaterialData), isInitMap = ShaderData.isInitMap, shaderIndex = shader.index;
    if (isInitMap[shaderIndex] === true) {
        return;
    }
    isInitMap[shaderIndex] = true;
    init$6(state, index, shaderIndex, _getMaterialClassName(index, MaterialData), material_config, shaderLib_generator, DeviceManagerData, ShaderData);
};
var _getMaterialClassName = function (materialIndex, MaterialData$$1) {
    return MaterialData$$1.materialClassNameMap[materialIndex];
};
var _setMaterialClassName = function (materialIndex, className, MaterialData$$1) {
    MaterialData$$1.materialClassNameMap[materialIndex] = className;
};
var getShader = function (materialIndex, MaterialData$$1) {
    return MaterialData$$1.shaderMap[materialIndex];
};
var setShader = function (materialIndex, shader, MaterialData$$1) {
    MaterialData$$1.shaderMap[materialIndex] = shader;
};
var getColor = function (materialIndex, MaterialData$$1) {
    return MaterialData$$1.colorMap[materialIndex];
};
var setColor = function (materialIndex, color, MaterialData$$1) {
    MaterialData$$1.colorMap[materialIndex] = color;
};
var getOpacity = function (materialIndex, MaterialData$$1) {
    return MaterialData$$1.opacityMap[materialIndex];
};
var setOpacity = function (materialIndex, opacity, MaterialData$$1) {
    MaterialData$$1.opacityMap[materialIndex] = opacity;
};
var getAlphaTest = function (materialIndex, MaterialData$$1) {
    return MaterialData$$1.alphaTestMap[materialIndex];
};
var setAlphaTest = function (materialIndex, alphaTest, MaterialData$$1) {
    MaterialData$$1.alphaTestMap[materialIndex] = alphaTest;
};
var isPropertyExist = function (propertyVal) {
    return isValidMapValue(propertyVal);
};
var addComponent$5 = function (component, gameObject) {
    addComponentToGameObjectMap(MaterialData.gameObjectMap, component.index, gameObject);
};
var disposeComponent$5 = ensureFunc(function (returnVal, component) {
    checkIndexShouldEqualCount(MaterialData);
}, function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    MaterialData.count -= 1;
    MaterialData.index -= 1;
    lastComponentIndex = MaterialData.count;
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.shaderMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.materialClassNameMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.colorMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.opacityMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.alphaTestMap);
    deleteBySwap(sourceIndex, lastComponentIndex, MaterialData.gameObjectMap);
    deleteComponentBySwap(sourceIndex, lastComponentIndex, MaterialData.materialMap);
});
var getGameObject$4 = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
var initData$8 = function (MaterialData$$1) {
    MaterialData$$1.shaderMap = createMap();
    MaterialData$$1.materialClassNameMap = createMap();
    MaterialData$$1.colorMap = createMap();
    MaterialData$$1.opacityMap = createMap();
    MaterialData$$1.alphaTestMap = createMap();
    MaterialData$$1.materialMap = createMap();
    MaterialData$$1.gameObjectMap = createMap();
    MaterialData$$1.index = 0;
    MaterialData$$1.count = 0;
};

var Material = (function (_super) {
    __extends(Material, _super);
    function Material() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Material;
}(Component));
Material = __decorate([
    registerClass("Material")
], Material);
var getMaterialColor = function (material) {
    return getColor(material.index, MaterialData);
};
var setMaterialColor = function (material, color) {
    setColor(material.index, color, MaterialData);
};
var getMaterialOpacity = function (material) {
    return getOpacity(material.index, MaterialData);
};
var setMaterialOpacity = function (material, opacity) {
    setOpacity(material.index, opacity, MaterialData);
};
var getMaterialAlphaTest = function (material) {
    return getAlphaTest(material.index, MaterialData);
};
var setMaterialAlphaTest = function (material, alphaTest) {
    setAlphaTest(material.index, alphaTest, MaterialData);
};
var getMaterialGameObject = function (component) {
    return getGameObject$4(component.index, MaterialData);
};
var getMaterialShader = function (material) {
    return getShader(material.index, MaterialData);
};
var initMaterial$$1 = function (material) {
    initMaterial$1(material.index, getState(DirectorData));
};

var create$1 = ensureFunc(function (gameObject, transform, GameObjectData) {
    it$1("componentMap should has data", function () {
        index_1(_getComponentData(gameObject.uid, GameObjectData)).exist;
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
var isAlive = function (entity, GameObjectData) {
    return isValidMapValue(_getComponentData(entity.uid, GameObjectData));
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
    var uid = entity.uid;
    var parent = _getParent(uid, GameObjectData);
    if (_isParentExist(parent)) {
        _removeFromChildrenMap(parent.uid, uid, GameObjectData);
    }
    _diposeAllDatas(entity, GameObjectData);
    GameObjectData.disposeCount += 1;
    if (isDisposeTooManyComponents(GameObjectData.disposeCount)) {
        reAllocateGameObjectMap(GameObjectData);
        GameObjectData.disposeCount = 0;
    }
};
var _removeFromChildrenMap = function (parentUID, childUID, GameObjectData) {
    removeChildEntity(_getChildren(parentUID, GameObjectData), childUID);
};
var _diposeAllDatas = function (gameObject, GameObjectData) {
    var uid = gameObject.uid, children = _getChildren(uid, GameObjectData);
    _disposeAllComponents(gameObject, GameObjectData);
    _disposeMapDatas(uid, GameObjectData);
    if (_isChildrenExist(children)) {
        forEach(children, function (child) {
            _diposeAllDatas(child, GameObjectData);
        });
    }
};
var _disposeMapDatas = function (uid, GameObjectData) {
    deleteVal(uid, GameObjectData.childrenMap);
    deleteVal(uid, GameObjectData.parentMap);
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
    it$1("component should exist", function () {
        index_1(component).exist;
    });
    it$1("should not has this type of component, please dispose it", function () {
        index_1(hasComponent(gameObject, getTypeIDFromComponent(component), GameObjectData)).false;
    });
}, function (gameObject, component, GameObjectData) {
    var uid = gameObject.uid, typeID = getTypeIDFromComponent(component), data = _getComponentData(uid, GameObjectData);
    execHandle(component, "addComponentHandleMap", [component, gameObject]);
    if (!data) {
        var d = {};
        d[typeID] = component;
        _setComponentData(uid, d, GameObjectData);
        return;
    }
    data[typeID] = component;
});
var _removeComponent = function (typeID, gameObject, component, GameObjectData) {
    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
    if (isValidMapValue(data)) {
        deleteVal(typeID, data);
    }
};
var disposeComponent$1 = function (gameObject, component, GameObjectData) {
    var typeID = getTypeIDFromComponent(component);
    _removeComponent(typeID, gameObject, component, GameObjectData);
    execHandle(component, "disposeHandleMap");
};
var getComponent = function (gameObject, componentTypeID, GameObjectData) {
    var uid = gameObject.uid, data = _getComponentData(uid, GameObjectData);
    if (isValidMapValue(data)) {
        var component = data[componentTypeID];
        return isValidMapValue(component) ? component : null;
    }
    return null;
};
var _getComponentData = function (uid, GameObjectData) { return GameObjectData.componentMap[uid]; };
var _setComponentData = function (uid, data, GameObjectData) { return GameObjectData.componentMap[uid] = data; };
var hasComponent = function (gameObject, componentTypeID, GameObjectData) {
    return getComponent(gameObject, componentTypeID, GameObjectData) !== null;
};
var getTransform = function (gameObject, GameObjectData) {
    return getComponent(gameObject, getTypeIDFromClass(ThreeDTransform), GameObjectData);
};
var getGeometry = function (gameObject, GameObjectData) {
    return getComponent(gameObject, getTypeIDFromClass(Geometry), GameObjectData);
};
var getMaterial = function (gameObject, GameObjectData) {
    return getComponent(gameObject, getTypeIDFromClass(Material), GameObjectData);
};
var _isParentExist = function (parent) { return isNotUndefined(parent); };
var _isChildrenExist = function (children) { return isNotUndefined(children); };
var _isComponentExist = function (component) { return component !== null; };
var _isGameObjectEqual = function (gameObject1, gameObject2) { return gameObject1.uid === gameObject2.uid; };
var _getParent = function (uid, GameObjectData) { return GameObjectData.parentMap[uid]; };
var _setParent = function (uid, parent, GameObjectData) {
    GameObjectData.parentMap[uid] = parent;
};
var _getChildren = function (uid, GameObjectData) {
    return GameObjectData.childrenMap[uid];
};
var _addChild = function (uid, child, GameObjectData) {
    var children = _getChildren(uid, GameObjectData);
    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        _setChildren(uid, [child], GameObjectData);
    }
};
var _setChildren = function (uid, children, GameObjectData) {
    GameObjectData.childrenMap[uid] = children;
};
var addChild = requireCheckFunc(function (gameObject, child, ThreeDTransformData, GameObjectData) {
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    var transform = getTransform(gameObject, GameObjectData), uid = gameObject.uid, childUID = child.uid, parent = _getParent(childUID, GameObjectData);
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
    it$1("child should has transform component", function () {
        index_1(getTransform(child, GameObjectData)).exist;
    });
}, function (gameObject, child, ThreeDTransformData, GameObjectData) {
    var uid = gameObject.uid, childUID = child.uid;
    deleteVal(childUID, GameObjectData.parentMap);
    setParent$$1(getTransform(child, GameObjectData), null, ThreeDTransformData);
    _removeFromChildrenMap(uid, childUID, GameObjectData);
});
var hasChild = function (gameObject, child, GameObjectData) {
    var parent = _getParent(child.uid, GameObjectData);
    if (!_isParentExist(parent)) {
        return false;
    }
    return _isGameObjectEqual(parent, gameObject);
};
var initData$3 = function (GameObjectData) {
    GameObjectData.uid = 0;
    GameObjectData.componentMap = createMap();
    GameObjectData.parentMap = createMap();
    GameObjectData.childrenMap = createMap();
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

var create$7 = function (GeometryData) {
    var geometry = new BoxGeometry(), index = null;
    geometry = create$4(geometry, GeometryData);
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
    }, vertices = [], indices = [];
    var faceAxes = [
        [0, 1, 3],
        [4, 5, 7],
        [3, 2, 6],
        [1, 0, 4],
        [1, 4, 2],
        [5, 0, 6]
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
        vertices: convertVerticesArrayToTypeArray(vertices),
        indices: convertIndicesArrayToTypeArray(indices, GeometryData)
    };
};
var _getConfigData = ensureFunc(function (data) {
    it$1("config data should be defined", function () {
        index_1(data).exist;
        index_1(data.width).exist;
        index_1(data.height).exist;
        index_1(data.depth).exist;
        index_1(data.widthSegments).exist;
        index_1(data.heightSegments).exist;
        index_1(data.depthSegments).exist;
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
    return BoxGeometry;
}(Geometry));
BoxGeometry = __decorate([
    registerClass("BoxGeometry")
], BoxGeometry);
var createBoxGeometry = function () {
    return create$7(GeometryData);
};
var setBoxGeometryConfigData = function (geometry, data) {
    setConfigData(geometry.index, data, GeometryData);
};

var create$8 = function (GeometryData) {
    return create$4(new CustomGeometry(), GeometryData);
};

var CustomGeometry = (function (_super) {
    __extends(CustomGeometry, _super);
    function CustomGeometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CustomGeometry;
}(Geometry));
CustomGeometry = __decorate([
    registerClass("CustomGeometry")
], CustomGeometry);
var createCustomGeometry = function () {
    return create$8(GeometryData);
};
var setCustomGeometryVertices = function (geometry, vertices) {
    return setVertices(geometry.index, vertices, GeometryData);
};
var setCustomGeometryIndices = function (geometry, indices) {
    return setIndices(geometry.index, indices, GeometryData);
};

var create$9 = function (ShaderData, MaterialData) {
    var material = new BasicMaterial(), materialClassName = "BasicMaterial";
    material = create$5(material, materialClassName, MaterialData);
    setShader(material.index, _createShader(materialClassName, ShaderData), MaterialData);
    return material;
};
var _createShader = function (materialClassName, ShaderData) {
    var shaderMap = ShaderData.shaderMap, shader = shaderMap[materialClassName];
    if (isValidMapValue(shader)) {
        return shader;
    }
    shader = create$6(ShaderData);
    shaderMap[materialClassName] = shader;
    return shader;
};

var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BasicMaterial;
}(Material));
BasicMaterial = __decorate([
    registerClass("BasicMaterial")
], BasicMaterial);
var createBasicMaterial = function () {
    return create$9(ShaderData, MaterialData);
};

var MeshRendererData = (function () {
    function MeshRendererData() {
    }
    return MeshRendererData;
}());
MeshRendererData.renderGameObjectArray = null;
MeshRendererData.gameObjectMap = null;
MeshRendererData.meshRendererMap = null;
MeshRendererData.index = null;
MeshRendererData.count = null;

var addAddComponentHandle$6 = function (_class) {
    addAddComponentHandle$1(_class, addComponent$6);
};
var addDisposeHandle$6 = function (_class) {
    addDisposeHandle$1(_class, disposeComponent$6);
};
var create$10 = requireCheckFunc(function (MeshRendererData$$1) {
    checkIndexShouldEqualCount(MeshRendererData$$1);
}, function (MeshRendererData$$1) {
    var renderer = new MeshRenderer(), index = generateComponentIndex(MeshRendererData$$1);
    renderer.index = index;
    MeshRendererData$$1.count += 1;
    MeshRendererData$$1.meshRendererMap[index] = renderer;
    return renderer;
});
var _setRenderGameObjectArray = requireCheckFunc(function (index, gameObject, renderGameObjectArray) {
    it$1("should not exist gameObject", function () {
        index_1(renderGameObjectArray[index]).not.exist;
    });
}, function (index, gameObject, renderGameObjectArray) {
    renderGameObjectArray[index] = gameObject;
});
var addComponent$6 = function (component, gameObject) {
    _setRenderGameObjectArray(component.index, gameObject, MeshRendererData.renderGameObjectArray);
    addComponentToGameObjectMap(MeshRendererData.gameObjectMap, component.index, gameObject);
};
var disposeComponent$6 = function (component) {
    var sourceIndex = component.index, lastComponentIndex = null;
    deleteBySwap$1(sourceIndex, MeshRendererData.renderGameObjectArray);
    MeshRendererData.count -= 1;
    MeshRendererData.index -= 1;
    lastComponentIndex = MeshRendererData.count;
    deleteBySwap(sourceIndex, lastComponentIndex, MeshRendererData.gameObjectMap);
    deleteComponentBySwap(sourceIndex, lastComponentIndex, MeshRendererData.meshRendererMap);
};
var getGameObject$5 = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
var getRenderList = curry(function (state, MeshRendererData$$1) {
    return MeshRendererData$$1.renderGameObjectArray;
});
var initData$12 = function (MeshRendererData$$1) {
    MeshRendererData$$1.renderGameObjectArray = [];
    MeshRendererData$$1.gameObjectMap = createMap();
    MeshRendererData$$1.meshRendererMap = createMap();
    MeshRendererData$$1.index = 0;
    MeshRendererData$$1.count = 0;
};

var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MeshRenderer;
}(Component));
MeshRenderer = __decorate([
    registerClass("MeshRenderer")
], MeshRenderer);
var createMeshRenderer = function () {
    return create$10(MeshRendererData);
};
var getMeshRendererGameObject = function (component) {
    return getGameObject$5(component.index, MeshRendererData);
};
var getMeshRendererRenderList = function () {
    return getRenderList(null, MeshRendererData);
};

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
    return Log;
}());
Log$2.info = {
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
    return Entity;
}());
Entity.UID = 1;

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
    return AutoDetachObserver;
}(Observer));
__decorate([
    requireCheck$1(function () {
        if (this.isDisposed) {
            Log$2.warn("only can dispose once");
        }
    })
], AutoDetachObserver.prototype, "dispose", null);

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
    return ClassMapUtils;
}());
ClassMapUtils._classMap = {};

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
    return Stream;
}(Entity));
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
    return TimeoutStream;
}(BaseStream));
__decorate([
    requireCheck$1(function (time, scheduler) {
        assert$1(time > 0, Log$2.info.FUNC_SHOULD("time", "> 0"));
    })
], TimeoutStream, "create", null);

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

function registerClass$1(className) {
    return function (target) {
        ClassMapUtils.addClassMap(className, target);
    };
}

var Operator = (function () {
    function Operator() {
    }
    Operator.empty = function () {
        return this.createStream(function (observer) {
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
    return Operator;
}());
Operator = __decorate([
    registerClass$1("Operator")
], Operator);
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
    return ConcatStream;
}(BaseStream));
ConcatStream = __decorate([
    registerClass$1("ConcatStream")
], ConcatStream);

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
    return IgnoreElementsStream;
}(BaseStream));
IgnoreElementsStream = __decorate([
    registerClass$1("IgnoreElementsStream")
], IgnoreElementsStream);

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
    return TimeController;
}());
__decorate([
    ensure(function () {
        assert(this.elapsed >= 0, Log$$1.info.FUNC_SHOULD("elapsed:" + this.elapsed, ">= 0"));
    })
], TimeController.prototype, "computeElapseTime", null);

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
        return root$1.performance.now();
    };
    DirectorTimeController.prototype._updateFps = function (deltaTime) {
        if (this._lastTime === null) {
            this.fps = STARTING_FPS;
        }
        else {
            this.fps = 1000 / deltaTime;
        }
    };
    return DirectorTimeController;
}(TimeController));
DirectorTimeController = __decorate([
    registerClass("DirectorTimeController")
], DirectorTimeController);

var _generateTypeID$1 = function () {
    var result = _typeID$1;
    _typeID$1 += 1;
    return String(result);
};
var getTypeIDFromClass$1 = function (_class) {
    return _table$1[ClassUtils.getClassNameByClass(_class)];
};

var _addTypeID$1 = function (componentClassNameArr, table) {
    var id = _generateTypeID$1();
    for (var _i = 0, componentClassNameArr_1 = componentClassNameArr; _i < componentClassNameArr_1.length; _i++) {
        var className = componentClassNameArr_1[_i];
        table[className] = id;
    }
};
var _typeID$1 = 1;
var _table$1 = {};
_addTypeID$1(["ThreeDTransform"], _table$1);
_addTypeID$1(["Geometry", "BoxGeometry", "CustomGeometry"], _table$1);
_addTypeID$1(["Material", "BasicMaterial"], _table$1);
_addTypeID$1(["MeshRenderer"], _table$1);
_addTypeID$1(["Tag"], _table$1);
_addTypeID$1(["CameraController"], _table$1);

var create$11 = function (GameObjectData) {
    return create$1(null, GameObjectData);
};
var addChild$1 = function (scene, child, GameObjectData, SceneData) {
    if (_isCamera(child, GameObjectData)) {
        SceneData.cameraArray.push(child);
    }
    addChild(scene, child, null, GameObjectData);
};
var removeChild$1 = function (gameObject, child, ThreeDTransformData, GameObjectData) {
    removeChild(gameObject, child, ThreeDTransformData, GameObjectData);
};
var _isCamera = function (gameObject, GameObjectData) {
    return hasComponent(gameObject, getTypeIDFromClass$1(CameraController), GameObjectData);
};
var getCurrentCamera = ensureFunc(function (camera, SceneData) {
    it$1("current camera should exist", function () {
        index_1(camera).exist;
    });
}, function (SceneData) {
    return SceneData.cameraArray[0];
});
var initData$13 = function (SceneData) {
    SceneData.cameraArray = [];
};

var RenderCommand = (function () {
    function RenderCommand() {
        this.materialIndex = null;
        this.shaderIndex = null;
        this.geometryIndex = null;
        this.mMatrix = null;
        this.vMatrix = null;
        this.pMatrix = null;
        this.drawMode = null;
    }
    return RenderCommand;
}());

var createRenderCommands = requireCheckFunc(curry(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, renderGameObjectArray) {
    forEach(renderGameObjectArray, function (gameObject) {
        var geometry = getGeometry(gameObject, GameObjectData), material = getMaterial(gameObject, GameObjectData);
        it$1("geometry should exist in gameObject", function () {
            index_1(geometry).exist;
        });
        it$1("material should exist in gameObject", function () {
            index_1(material).exist;
        });
    });
}), curry(function (state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData, renderGameObjectArray) {
    var commandArr = [];
    for (var _i = 0, renderGameObjectArray_1 = renderGameObjectArray; _i < renderGameObjectArray_1.length; _i++) {
        var gameObject = renderGameObjectArray_1[_i];
        var command = new RenderCommand(), currentCamera = getComponent(getCurrentCamera(SceneData), getTypeIDFromClass$1(CameraController), GameObjectData), currentCameraIndex = currentCamera.index, geometry = getGeometry(gameObject, GameObjectData), material = getMaterial(gameObject, GameObjectData), transform = getTransform(gameObject, GameObjectData), materialIndex = material.index, shader = getShader(materialIndex, MaterialData);
        command.mMatrix = getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData).values;
        command.vMatrix = getWorldToCameraMatrix$1(currentCameraIndex, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).values;
        command.pMatrix = getPMatrix$1(currentCameraIndex, CameraData).values;
        command.drawMode = getDrawMode$1(geometry, GeometryData);
        command.materialIndex = materialIndex;
        command.shaderIndex = shader.index;
        command.geometryIndex = geometry.index;
        commandArr.push(command);
    }
    return commandArr;
}));

var sortRenderCommands = curry(function (state, renderCommandArray) {
    return renderCommandArray;
});

var draw = curry(function (state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData, renderCommandArray) {
    for (var _i = 0, renderCommandArray_1 = renderCommandArray; _i < renderCommandArray_1.length; _i++) {
        var renderCommand = renderCommandArray_1[_i];
        var shaderIndex = renderCommand.shaderIndex, geometryIndex = renderCommand.geometryIndex, gl = getGL(DeviceManagerData, state);
        use$$1(gl, shaderIndex, ShaderData);
        sendAttributeData$$1(gl, shaderIndex, geometryIndex, ShaderData, GeometryData, ArrayBufferData);
        sendUniformData$$1(gl, shaderIndex, MaterialData, ShaderData, renderCommand);
        if (hasIndices(geometryIndex, GeometryData)) {
            bindIndexBuffer(gl, geometryIndex, ShaderData, GeometryData, IndexBufferData);
            _drawElements(gl, geometryIndex, GeometryData);
        }
        else {
            _drawArray(gl, geometryIndex, GeometryData);
        }
    }
    return state;
});
var _drawElements = function (gl, geometryIndex, GeometryData) {
    var startOffset = 0, drawMode = getDrawMode$1(geometryIndex, GeometryData), count = getIndicesCount(geometryIndex, GeometryData), type = getType(GeometryData), typeSize = getTypeSize(GeometryData);
    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
};
var _drawArray = function (gl, geometryIndex, GeometryData) {
    var startOffset = 0, drawMode = getDrawMode$1(geometryIndex, GeometryData), count = getVerticesCount(geometryIndex, GeometryData);
    gl.drawArrays(gl[drawMode], startOffset, count);
};

var ArrayBufferData = (function () {
    function ArrayBufferData() {
    }
    return ArrayBufferData;
}());
ArrayBufferData.buffers = null;
ArrayBufferData.bufferDataMap = null;

var IndexBufferData = (function () {
    function IndexBufferData() {
    }
    return IndexBufferData;
}());
IndexBufferData.buffers = null;

var render_config = {
    "render_setting": {
        "clearColor": Color.create("#000000")
    }
};

var SceneData = (function () {
    function SceneData() {
    }
    return SceneData;
}());
SceneData.cameraArray = null;

var init$7 = function (state) {
    init$5(state, material_config, shaderLib_generator, DeviceManagerData, ShaderData, MaterialData);
    return state;
};
var clear$1 = function (state) {
    clear(getGL(DeviceManagerData, state), render_config.render_setting.clearColor, DeviceManagerData);
    return state;
};
var render = function (state) {
    return compose(draw(state, DeviceManagerData, MaterialData, ShaderData, GeometryData, ArrayBufferData, IndexBufferData), sortRenderCommands(state), createRenderCommands(state, GameObjectData, ThreeDTransformData, CameraControllerData, CameraData, MaterialData, GeometryData, SceneData), getRenderList(state))(MeshRendererData);
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
        set: function (dom) {
            setCanvas(dom).run();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "width", {
        get: function () {
            return getWidth(this.dom);
        },
        set: function (width) {
            setWidth(width, this.dom).run();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "height", {
        get: function () {
            return getHeight(this.dom);
        },
        set: function (height) {
            setHeight(height, this.dom).run();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleWidth", {
        get: function () {
            return getStyleWidth(this.dom);
        },
        set: function (styleWidth) {
            setStyleWidth(styleWidth, this.dom).run();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "styleHeight", {
        get: function () {
            return getStyleHeight(this.dom);
        },
        set: function (styleHeight) {
            setStyleHeight(styleHeight, this.dom).run();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "x", {
        get: function () {
            return getX(this.dom);
        },
        set: function (x) {
            setX(x, this.dom).run();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "y", {
        get: function () {
            return getY(this.dom);
        },
        set: function (y) {
            setY(y, this.dom).run();
        },
        enumerable: true,
        configurable: true
    });
    return View;
}());
View = __decorate([
    registerClass("View")
], View);

var DeviceManager = (function () {
    function DeviceManager() {
        this.view = View.create();
    }
    DeviceManager.getInstance = function () { };
    Object.defineProperty(DeviceManager.prototype, "gl", {
        get: function () {
            return getGL(DeviceManagerData, getState(DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "viewport", {
        get: function () {
            return getViewport(getState(DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.createGL = function (canvasId, contextConfig) {
        return createGL(canvasId, immutable_1(contextConfig), getState(DirectorData));
    };
    DeviceManager.prototype.setScreen = function () {
        return setScreen(DeviceManagerData, getState(DirectorData));
    };
    return DeviceManager;
}());
__decorate([
    requireCheck(function () {
        it$1("canvas should be setter", function () {
            index_1(getCanvas(getState(DirectorData))).exist;
        });
    })
], DeviceManager.prototype, "setScreen", null);
DeviceManager = __decorate([
    singleton(),
    registerClass("DeviceManager")
], DeviceManager);
var setDeviceManagerGL = function (gl) {
    return setGL(gl, DeviceManagerData, getState(DirectorData));
};

var Director = (function () {
    function Director() {
        this.scene = create$11(GameObjectData);
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
        return resultState;
    };
    Director.prototype._initSystem = function (state) {
        var resultState = init$2(GlobalTempData, ThreeDTransformData, state);
        resultState = init$3(GeometryData, state);
        resultState = init$1(PerspectiveCameraData, CameraData, CameraControllerData, state);
        return resultState;
    };
    Director.prototype._initRenderer = function (state) {
        var resultState = init$7(state);
        return resultState;
    };
    Director.prototype._buildLoopStream = function () {
        return intervalRequest();
    };
    Director.prototype._loopBody = function (time, state) {
        var elapsed = null;
        return this._run(elapsed, state);
    };
    Director.prototype._run = function (elapsed, state) {
        var resultState = this._update(elapsed, state);
        resultState = this._render(state);
        return resultState;
    };
    Director.prototype._update = function (elapsed, state) {
        var resultState = this._updateSystem(elapsed, state);
        return resultState;
    };
    Director.prototype._render = function (state) {
        var resultState = state;
        resultState = clear$1(state);
        resultState = render(state);
        return resultState;
    };
    Director.prototype._updateSystem = function (elapsed, state) {
        var resultState = update$1(elapsed, GlobalTempData, ThreeDTransformData, state);
        resultState = update(PerspectiveCameraData, CameraData, CameraControllerData);
        return resultState;
    };
    return Director;
}());
Director = __decorate([
    singleton(true),
    registerClass("Director")
], Director);
initData$9(ShaderData);
initData$6(DataBufferConfig, GeometryData);
addAddComponentHandle$4(Geometry);
addDisposeHandle$4(Geometry);
addInitHandle$1(Geometry);
initData$8(MaterialData);
addAddComponentHandle$5(Material);
addDisposeHandle$5(Material);
addInitHandle$2(Material);
initData$12(MeshRendererData);
addAddComponentHandle$6(MeshRenderer);
addDisposeHandle$6(MeshRenderer);
initData$5(TagData);
addAddComponentHandle$3(Tag);
addDisposeHandle$3(Tag);
initData$4(GlobalTempData, ThreeDTransformData);
addAddComponentHandle$2(ThreeDTransform);
addDisposeHandle$2(ThreeDTransform);
initData$11(ArrayBufferData);
initData$10(IndexBufferData);
initData$13(SceneData);
initData$2(CameraControllerData, PerspectiveCameraData, CameraData);
addAddComponentHandle$$1(CameraController);
addDisposeHandle$$1(CameraController);
initData$3(GameObjectData);

var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Scene;
}(GameObject));
var addSceneChild = requireCheckFunc(function (scene, gameObject) {
    it$1("scene should alive", function () {
        index_1(isAlive(scene, GameObjectData)).true;
    });
}, function (scene, gameObject) {
    addChild$1(scene, gameObject, GameObjectData, SceneData);
});
var removeSceneChild = requireCheckFunc(function (scene, gameObject) {
    it$1("scene should alive", function () {
        index_1(isAlive(scene, GameObjectData)).true;
    });
}, function (scene, gameObject) {
    removeChild$1(scene, gameObject, ThreeDTransformData, GameObjectData);
});

var Main$1 = (function () {
    function Main() {
    }
    Object.defineProperty(Main, "isTest", {
        get: function () {
            return getIsTest$1(MainData);
        },
        set: function (isTest) {
            setIsTest(isTest, MainData).run();
            setLibIsTest(isTest).run();
        },
        enumerable: true,
        configurable: true
    });
    Main.setConfig = function (configState) {
        this._configState = setConfig(CompileConfig.closeContractTest, MainData, configState).run();
        setState(getState(DirectorData).set("Main", this._configState.get("Main")), DirectorData).run();
        return this;
    };
    Main.init = function () {
        setState(init$4(getState(DirectorData), this._configState.get("config"), DeviceManagerData).run(), DirectorData).run();
        return this;
    };
    return Main;
}());
Main$1._configState = null;
__decorate([
    requireCheck(function () {
        it$1("configState should exist", function () {
            index_1(Main$1._configState).exist;
        });
    })
], Main$1, "init", null);

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

var initThreeDTransformData = initData$4;
var DomQuery$1 = DomQuery;
var fromArray$1 = fromArray;
var initTagData = initData$5;
var initGeometryData = initData$6;
var initMaterialData = initData$8;
var initShaderData = initData$9;
var initMeshRendererData = initData$12;
var initArrayBufferData = initData$11;
var initIndexBufferData = initData$10;
var initDeviceManagerData = initData$7;
var initCameraControllerData = initData$2;
var initGameObjectData = initData$3;
var createState$1 = createState;
var useProgram = use$$1;
var sendAttributeData$2 = sendAttributeData$$1;
var sendUniformData$2 = sendUniformData$$1;
var disableVertexAttribArray$1 = disableVertexAttribArray;
var DataUtils$1 = DataUtils;

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
        return root$1.performance.now();
    };
    return CommonTimeController;
}(TimeController));
CommonTimeController = __decorate([
    registerClass("CommonTimeController")
], CommonTimeController);

export { getCameraPMatrix, getCameraNear, setCameraNear, getCameraFar, setCameraFar, CameraController, createCameraController, getCameraControllerGameObject, CameraControllerData, CameraData, getPerspectiveCameraFovy, setPerspectiveCameraFovy, getPerspectiveCameraAspect, setPerspectiveCameraAspect, PerspectiveCameraData, Component, ComponentData, getTypeIDFromClass, getTypeIDFromComponent, BoxGeometry, createBoxGeometry, setBoxGeometryConfigData, CustomGeometry, createCustomGeometry, setCustomGeometryVertices, setCustomGeometryIndices, Geometry, getDrawMode$$1 as getDrawMode, getVertices$$1 as getVertices, getIndices$$1 as getIndices, getGeometryConfigData, initGeometry$$1 as initGeometry, getGeometryGameObject, GeometryData, BasicMaterial, createBasicMaterial, Material, getMaterialColor, setMaterialColor, getMaterialOpacity, setMaterialOpacity, getMaterialAlphaTest, setMaterialAlphaTest, getMaterialGameObject, getMaterialShader, initMaterial$$1 as initMaterial, MaterialData, MeshRenderer, createMeshRenderer, getMeshRendererGameObject, getMeshRendererRenderList, MeshRendererData, Tag, createTag, addTag$1 as addTag, removeTag$1 as removeTag, findGameObjectsByTag$1 as findGameObjectsByTag, getTagGameObject, TagData, LinkList, LinkNode, ThreeDTransform, createThreeDTransform, getThreeDTransformPosition, setThreeDTransformPosition, getThreeDTransformLocalToWorldMatrix, getThreeDTransformLocalPosition, setThreeDTransformLocalPosition, setThreeDTransformBatchTransformDatas, getThreeDTransformParent, setThreeDTransformParent, getThreeDTransformGameObject, ThreeDTransformData, ThreeDTransformRelationData, getUID, isIndexUsed, getStartIndexInArrayBuffer, CompileConfig, DataBufferConfig, DebugConfig, MemoryConfig, Director, DirectorData, GameObject, createGameObject, addGameObjectComponent, disposeGameObject, initGameObject$1 as initGameObject, disposeGameObjectComponent, getGameObjectComponent, getGameObjectTransform, hasGameObjectComponent, isGameObjectAlive, addGameObject, removeGameObject, hasGameObject, GameObjectData, Scene, addSceneChild, removeSceneChild, SceneData, Main$1 as Main, MainData, GlobalTempData, cache, assert, describe, it$1 as it, requireCheck, requireCheckFunc, ensure, ensureFunc, requireGetterAndSetter, requireGetter, requireSetter, ensureGetterAndSetter, ensureGetter, ensureSetter, invariant, execOnlyOnce, registerClass, singleton, virtual, root$1 as root, DeviceManager, setDeviceManagerGL, DeviceManagerData, EScreenSize, GPUDetector, EGPUPrecision, DEG_TO_RAD, RAD_TO_DEG, Matrix3, Matrix4, Quaternion, Vector2, Vector3, Vector4, ArrayBufferData, IndexBufferData, RenderCommand, material_config, render_config, shaderLib_generator, EBufferType, EDrawMode, EVariableType, empty, NULL, basic_materialColor_fragment, end_basic_fragment, common_define, common_fragment, common_function, common_vertex, highp_fragment, lowp_fragment, mediump_fragment, Shader, ShaderData, main_begin, main_end, setPos_mvp, Color, RectRegion, View, initThreeDTransformData, DomQuery$1 as DomQuery, fromArray$1 as fromArray, initTagData, initGeometryData, initMaterialData, initShaderData, initMeshRendererData, initArrayBufferData, initIndexBufferData, initDeviceManagerData, initCameraControllerData, initGameObjectData, createState$1 as createState, useProgram, sendAttributeData$2 as sendAttributeData, sendUniformData$2 as sendUniformData, disableVertexAttribArray$1 as disableVertexAttribArray, DataUtils$1 as DataUtils, Log$$1 as Log, error$1 as error, CommonTimeController, DirectorTimeController, TimeController };
//# sourceMappingURL=wd.module.js.map
