/*!
 * wonder.js - 3d webgl engine
 * @version v0.0.3
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
else {
    root = window;
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

var CompileConfig = {
    isCompileTest: true,
    closeContractTest: false
};

var Main = (function () {
    function Main() {
    }
    return Main;
}());
Main.isTest = false;

var MainData = (function () {
    function MainData() {
    }
    Object.defineProperty(MainData, "isTest", {
        get: function () {
            return this._isTest;
        },
        set: function (isTest) {
            this._isTest = isTest;
            Main.isTest = MainData.isTest;
        },
        enumerable: true,
        configurable: true
    });
    return MainData;
}());
MainData._isTest = false;
MainData.screenSize = null;

var _describeContext = null;
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
                if (MainData.isTest) {
                    inFunc.apply(this, arguments);
                }
                return value_1.apply(this, arguments);
            };
        }
        return descriptor;
    };
}
function ensure(outFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var value_2 = descriptor.value;
            descriptor.value = function (args) {
                var result = value_2.apply(this, arguments);
                if (MainData.isTest) {
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
function requireGetterAndSetter(inGetterFunc, inSetterFunc) {
    return function (target, name, descriptor) {
        if (CompileConfig.isCompileTest) {
            var getter_1 = descriptor.get, setter_1 = descriptor.set;
            descriptor.get = function () {
                if (MainData.isTest) {
                    inGetterFunc.call(this);
                }
                return getter_1.call(this);
            };
            descriptor.set = function (val) {
                if (MainData.isTest) {
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
                if (MainData.isTest) {
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
                if (MainData.isTest) {
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
                if (MainData.isTest) {
                    outGetterFunc.call(this, result);
                }
                return result;
            };
            descriptor.set = function (val) {
                var result = setter_3.call(this, val);
                if (MainData.isTest) {
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
                if (MainData.isTest) {
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
                if (MainData.isTest) {
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
            if (MainData.isTest) {
                func(target);
            }
        }
    };
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module) {
(function (global, module) {

  var exports = module.exports;

  /**
   * Exports.
   */

  module.exports = expect;
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
    window.expect = module.exports;
  }

})(
    commonjsGlobal
  , module
);
});

var ClassUtils = (function () {
    function ClassUtils() {
    }
    ClassUtils.getClassNameByInstance = function (obj) {
        return obj.constructor["className"];
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
        it("should get class name from objInstance", function () {
            index(className).exist;
            index(className !== "").true;
        });
    })
], ClassUtils, "getClassNameByInstance", null);

function registerClass(className) {
    return function (_class) {
        ClassUtils.addClassNameAttributeToClass(className, _class);
        ClassUtils.addClass(className, _class);
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

var JudgeUtils$1 = (function (_super) {
    __extends(JudgeUtils$$1, _super);
    function JudgeUtils$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JudgeUtils$$1.isView = function (obj) {
        return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
    };
    JudgeUtils$$1.isEqual = function (target1, target2) {
        if ((!target1 && target2) || (target1 && !target2)) {
            return false;
        }
        if (target1.uid && target2.uid) {
            return target1.uid === target2.uid;
        }
        return target1 === target2;
    };
    JudgeUtils$$1.isPowerOfTwo = function (value) {
        return (value & (value - 1)) === 0 && value !== 0;
    };
    JudgeUtils$$1.isFloatArray = function (data) {
        return Object.prototype.toString.call(data) === "[object Float32Array]" || Object.prototype.toString.call(data) === "[object Float16Array]";
    };
    JudgeUtils$$1.isInterface = function (target, memberOfInterface) {
        return !!target[memberOfInterface];
    };
    JudgeUtils$$1.isSelf = function (self, entityObject) {
        return self.uid === entityObject.uid;
    };
    JudgeUtils$$1.isComponenet = function (component) {
        return component.entityObject !== void 0;
    };
    JudgeUtils$$1.isDom = function (obj) {
        return Object.prototype.toString.call(obj).match(/\[object HTML\w+/) !== null;
    };
    JudgeUtils$$1.isCollection = function (list) {
        return list instanceof Collection;
    };
    JudgeUtils$$1.isClass = function (objInstance, className) {
        return objInstance.constructor.name === className;
    };
    return JudgeUtils$$1;
}(JudgeUtils));
JudgeUtils$1 = __decorate([
    registerClass("JudgeUtils")
], JudgeUtils$1);

var NOT_CLONE_TAG = "not_clone";
var getCloneAttributeMembers = function (obj) {
    return obj[buildMemberContainerAttributeName(obj)];
};
var setCloneAttributeMembers = function (obj, members) {
    obj[buildMemberContainerAttributeName(obj)] = members;
};
var searchCloneAttributeMembers = function (obj) {
    var CLONE_MEMBER_PREFIX = "__decorator_clone";
    var result = null;
    for (var memberName in obj) {
        if (obj.hasOwnProperty(memberName)) {
            if (memberName.indexOf(CLONE_MEMBER_PREFIX) > -1) {
                result = obj[memberName];
                break;
            }
        }
    }
    return result;
};
var getAllCloneAttributeMembers = function (obj) {
    var IS_GATHERED_ATTRIBUTE_NAME = "__decorator_clone_isGathered_" + ClassUtils.getClassNameByInstance(obj) + "_cloneAttributeMembers";
    var result = Collection.create();
    var gather = function (obj) {
        if (!obj) {
            return;
        }
        if (obj[IS_GATHERED_ATTRIBUTE_NAME]) {
            var members_1 = getCloneAttributeMembers(obj);
            assert(members_1, Log$$1.info.FUNC_NOT_EXIST("" + buildMemberContainerAttributeName(obj)));
            result.addChildren(members_1);
            return;
        }
        gather(obj.__proto__);
        var members = searchCloneAttributeMembers(obj);
        if (members) {
            result.addChildren(members);
        }
    }, setGatheredResult = function () {
        setCloneAttributeMembers(obj.__proto__, result);
        obj.__proto__[IS_GATHERED_ATTRIBUTE_NAME] = true;
    };
    gather(obj.__proto__);
    setGatheredResult();
    return getCloneAttributeMembers(obj);
};
var initCloneAttributeMembers = function (obj) {
    setCloneAttributeMembers(obj, Collection.create());
};
var buildMemberContainerAttributeName = function (obj) {
    return "__decorator_clone_" + ClassUtils.getClassNameByInstance(obj) + "_cloneAttributeMembers";
};
var generateCloneableMember = function (cloneType) {
    var cloneDataArr = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        cloneDataArr[_i - 1] = arguments[_i];
    }
    return function (target, memberName) {
        if (!getCloneAttributeMembers(target)) {
            initCloneAttributeMembers(target);
        }
        if (cloneDataArr.length === 1) {
            getCloneAttributeMembers(target).addChild({
                memberName: memberName,
                cloneType: cloneType,
                configData: cloneDataArr[0]
            });
        }
        else if (cloneDataArr.length === 2) {
            getCloneAttributeMembers(target).addChild({
                memberName: memberName,
                cloneType: cloneType,
                cloneFunc: cloneDataArr[0],
                configData: cloneDataArr[1]
            });
        }
    };
};
function cloneAttributeAsBasicType(configData) {
    return generateCloneableMember(CloneType.BASIC, ExtendUtils.extend({
        order: 0
    }, configData));
}
function cloneAttributeAsCloneable(configData) {
    return generateCloneableMember(CloneType.CLONEABLE, ExtendUtils.extend({
        order: 0
    }, configData));
}
function cloneAttributeAsCustomType(cloneFunc, configData) {
    return generateCloneableMember(CloneType.CUSTOM, cloneFunc, ExtendUtils.extend({
        order: 0
    }, configData));
}
var CloneUtils = (function () {
    function CloneUtils() {
    }
    CloneUtils.clone = function (sourceInstance, cloneData, createDataArr, target) {
        if (cloneData === void 0) { cloneData = null; }
        if (createDataArr === void 0) { createDataArr = null; }
        if (target === void 0) { target = null; }
        var cloneAttributeMembers = getAllCloneAttributeMembers(sourceInstance)
            .sort(function (memberDataA, memberDataB) {
            return memberDataA.configData.order - memberDataB.configData.order;
        }), className = ClassUtils.getClassNameByInstance(sourceInstance);
        if (target === null) {
            if (createDataArr) {
                var _class = ClassUtils.getClass(className);
                target = _class.create.apply(_class, createDataArr);
            }
            else {
                target = ClassUtils.getClass(className).create();
            }
        }
        if (!cloneAttributeMembers) {
            return target;
        }
        cloneAttributeMembers.forEach(function (memberData) {
            var cloneType = memberData.cloneType, memberName = memberData.memberName;
            switch (cloneType) {
                case CloneType.CLONEABLE:
                    if (sourceInstance[memberName] !== null && sourceInstance[memberName] !== void 0) {
                        if (target[memberName] !== null) {
                            target[memberName] = sourceInstance[memberName].clone(target[memberName]);
                        }
                        else {
                            target[memberName] = sourceInstance[memberName].clone();
                        }
                    }
                    break;
                case CloneType.BASIC:
                    target[memberName] = sourceInstance[memberName];
                    break;
                case CloneType.CUSTOM:
                    var cloneFunc = memberData.cloneFunc;
                    cloneFunc.call(target, sourceInstance, target, memberName, cloneData);
                    break;
            }
        });
        return target;
    };
    CloneUtils.cloneArray = function (arr, isDeep) {
        if (isDeep === void 0) { isDeep = false; }
        if (arr === null) {
            return null;
        }
        if (isDeep) {
            return ExtendUtils.extendDeep(arr);
        }
        return [].concat(arr);
    };
    CloneUtils.markNotClone = function (entityObject) {
        if (!entityObject.hasTag(NOT_CLONE_TAG)) {
            entityObject.addTag(NOT_CLONE_TAG);
        }
    };
    CloneUtils.isNotClone = function (entityObject) {
        return entityObject.hasTag(NOT_CLONE_TAG);
    };
    return CloneUtils;
}());
__decorate([
    requireCheck(function (source, cloneData, createDataArr) {
        if (cloneData === void 0) { cloneData = null; }
        if (createDataArr === void 0) { createDataArr = null; }
        if (createDataArr) {
            assert(JudgeUtils$1.isArrayExactly(createDataArr), Log$$1.info.FUNC_MUST_BE("param:createDataArr", "be arr"));
        }
    })
], CloneUtils, "clone", null);
CloneUtils = __decorate([
    registerClass("CloneUtils")
], CloneUtils);
var CloneType;
(function (CloneType) {
    CloneType[CloneType["CLONEABLE"] = 0] = "CLONEABLE";
    CloneType[CloneType["BASIC"] = 1] = "BASIC";
    CloneType[CloneType["CUSTOM"] = 2] = "CUSTOM";
})(CloneType || (CloneType = {}));

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
        this._matrixArr = null;
        if (args.length === 1) {
            this.values = args[0];
        }
        else {
            this.values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        }
        this._matrixArr = [];
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
    Matrix4.prototype.push = function () {
        this._matrixArr.push(this.values);
    };
    Matrix4.prototype.pop = function () {
        this.values = this._matrixArr.pop();
    };
    Matrix4.prototype.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var te = this.values, values = null;
        if (args.length === 1) {
            var matrix = args[0];
            values = matrix.values;
        }
        else {
            values = [
                args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15]
            ];
        }
        te[0] = values[0];
        te[1] = values[1];
        te[2] = values[2];
        te[3] = values[3];
        te[4] = values[4];
        te[5] = values[5];
        te[6] = values[6];
        te[7] = values[7];
        te[8] = values[8];
        te[9] = values[9];
        te[10] = values[10];
        te[11] = values[11];
        te[12] = values[12];
        te[13] = values[13];
        te[14] = values[14];
        te[15] = values[15];
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
        for (var index$$1 = 0; index$$1 < 16; index$$1++) {
            array[offset + index$$1] = values[index$$1];
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
        it("axis's component shouldn't all be zero", function () {
            index(x === 0 && y === 0 && z === 0).false;
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

function virtual(target, name, descriptor) {
    return descriptor;
}

var Camera = (function () {
    function Camera() {
        this._worldToCameraMatrix = null;
        this._near = null;
        this._far = null;
        this._pMatrix = Matrix4.create();
        this.entityObject = null;
        this.pMatrixDirty = false;
        this._isUserSpecifyThePMatrix = false;
    }
    Object.defineProperty(Camera.prototype, "cameraToWorldMatrix", {
        get: function () {
            return this.entityObject.transform.localToWorldMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "worldToCameraMatrix", {
        get: function () {
            if (this._worldToCameraMatrix) {
                return this._worldToCameraMatrix;
            }
            return this.cameraToWorldMatrix.clone().invert();
        },
        set: function (matrix) {
            this._worldToCameraMatrix = matrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "near", {
        get: function () {
            return this._near;
        },
        set: function (near) {
            this._near = near;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "far", {
        get: function () {
            return this._far;
        },
        set: function (far) {
            this._far = far;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "pMatrix", {
        get: function () {
            return this._pMatrix;
        },
        set: function (pMatrix) {
            this._isUserSpecifyThePMatrix = true;
            this._pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.init = function () {
        if (this.pMatrixDirty) {
            this._updateProjectionMatrix();
            this.pMatrixDirty = false;
        }
    };
    Camera.prototype.dispose = function () {
    };
    Camera.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    Camera.prototype.update = function (elapsed) {
        if (this.pMatrixDirty) {
            this._updateProjectionMatrix();
            this.pMatrixDirty = false;
        }
    };
    Camera.prototype.getInvViewProjMat = function () {
        return this.pMatrix.clone().multiply(this.worldToCameraMatrix).invert();
    };
    Camera.prototype._updateProjectionMatrix = function () {
        if (this._isUserSpecifyThePMatrix) {
            return;
        }
        this.updateProjectionMatrix();
    };
    return Camera;
}());
__decorate([
    requireGetter(function () {
        assert(this.entityObject, Log$$1.info.FUNC_MUST_DEFINE("entityObject"));
    })
], Camera.prototype, "cameraToWorldMatrix", null);
__decorate([
    cloneAttributeAsCloneable()
], Camera.prototype, "_worldToCameraMatrix", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Camera.prototype, "near", null);
__decorate([
    cloneAttributeAsBasicType()
], Camera.prototype, "far", null);
__decorate([
    cloneAttributeAsCloneable()
], Camera.prototype, "pMatrix", null);
__decorate([
    cloneAttributeAsBasicType()
], Camera.prototype, "_isUserSpecifyThePMatrix", void 0);
__decorate([
    virtual
], Camera.prototype, "init", null);
__decorate([
    virtual
], Camera.prototype, "dispose", null);

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

var JudgeUtils$2 = (function (_super) {
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
}(JudgeUtils));

var SubjectObserver = (function () {
    function SubjectObserver() {
        this.observers = Collection.create();
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
            return JudgeUtils$2.isEqual(ob, observer);
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
    Log$1.error(!cond, message);
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
            Log$1.warn("only can dispose once");
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
        if (JudgeUtils$2.isArray(arguments[0])) {
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
        if (JudgeUtils$2.isNumber(args[0])) {
            var maxConcurrent = args[0];
            return ClassMapUtils.getClass("MergeStream").create(this, maxConcurrent);
        }
        if (JudgeUtils$2.isArray(args[0])) {
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
        assert$1(count >= 0, Log$1.info.FUNC_SHOULD("count", ">= 0"));
    })
], Stream.prototype, "take", null);
__decorate([
    requireCheck$1(function (count) {
        if (count === void 0) { count = 1; }
        assert$1(count >= 0, Log$1.info.FUNC_SHOULD("count", ">= 0"));
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

var GroupDisposable = (function (_super) {
    __extends(GroupDisposable, _super);
    function GroupDisposable(disposable) {
        var _this = _super.call(this, "GroupDisposable") || this;
        _this._group = Collection.create();
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

var root$1;
if (JudgeUtils$2.isNodeJs() && typeof global != "undefined") {
    root$1 = global;
}
else {
    root$1 = window;
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
        return root$1.setInterval(function () {
            initial = action(initial);
        }, interval);
    };
    Scheduler.prototype.publishIntervalRequest = function (observer, action) {
        var self = this, loop = function (time) {
            var isEnd = action(time);
            if (isEnd) {
                return;
            }
            self._requestLoopId = root$1.requestNextAnimationFrame(loop);
        };
        this._requestLoopId = root$1.requestNextAnimationFrame(loop);
    };
    Scheduler.prototype.publishTimeout = function (observer, time, action) {
        return root$1.setTimeout(function () {
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
        else if (JudgeUtils$2.isIObserver(args[0])) {
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
            root$1.clearInterval(id);
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
            root$1.cancelNextRequestAnimationFrame(self.scheduler.requestLoopId);
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
            root$1.clearTimeout(id);
        });
    };
    return TimeoutStream;
}(BaseStream));
__decorate([
    requireCheck$1(function (time, scheduler) {
        assert$1(time > 0, Log$1.info.FUNC_SHOULD("time", "> 0"));
    })
], TimeoutStream, "create", null);

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
var fromEventPattern = function (addHandler, removeHandler) {
    return FromEventPatternStream.create(addHandler, removeHandler);
};

var intervalRequest = function (scheduler) {
    if (scheduler === void 0) { scheduler = Scheduler.create(); }
    return IntervalRequestStream.create(scheduler);
};

var callFunc = function (func, context) {
    if (context === void 0) { context = root$1; }
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
        if (JudgeUtils$2.isPromise(innerSource)) {
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
    return MergeAllObserver;
}(Observer));
__decorate([
    requireCheck$1(function (innerSource) {
        assert$1(innerSource instanceof Stream || JudgeUtils$2.isPromise(innerSource), Log$1.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
    })
], MergeAllObserver.prototype, "onNext", null);
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
            return JudgeUtils$2.isEqual(stream, currentStream);
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
        var streamGroup = Collection.create(), groupDisposable = GroupDisposable.create();
        this._source.buildStream(MergeAllObserver.create(observer, streamGroup, groupDisposable));
        return groupDisposable;
    };
    return MergeAllStream;
}(BaseStream));
MergeAllStream = __decorate([
    registerClass$1("MergeAllStream")
], MergeAllStream);

var Entity$1 = (function () {
    function Entity() {
        this.uid = null;
        this.data = null;
        this._tagList = Collection.create();
        this.uid = Entity._count;
        Entity._count += 1;
    }
    Entity.prototype.addTag = function (tag) {
        this._tagList.addChild(tag);
    };
    Entity.prototype.removeTag = function (tag) {
        this._tagList.removeChild(tag);
    };
    Entity.prototype.getTagList = function () {
        return this._tagList;
    };
    Entity.prototype.hasTag = function (tag) {
        return this._tagList.hasChild(tag);
    };
    Entity.prototype.containTag = function (tag) {
        return this._tagList.hasChildWithFunc(function (t) {
            return t.indexOf(tag) > -1;
        });
    };
    return Entity;
}());
Entity$1._count = 1;

var Component = (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.entityObject = null;
        return _this;
    }
    Object.defineProperty(Component.prototype, "transform", {
        get: function () {
            if (!this.entityObject) {
                return null;
            }
            return this.entityObject.transform;
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.init = function () {
    };
    Component.prototype.dispose = function () {
    };
    Component.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    Component.prototype.addToObject = function (entityObject, isShareComponent) {
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (isShareComponent) {
            return;
        }
        if (this.entityObject) {
            this.entityObject.removeComponent(this);
        }
        this.entityObject = entityObject;
        this.addToComponentContainer();
    };
    Component.prototype.addToComponentContainer = function () {
    };
    Component.prototype.removeFromObject = function (entityObject) {
        this.removeFromComponentContainer();
    };
    Component.prototype.removeFromComponentContainer = function () {
    };
    return Component;
}(Entity$1));
__decorate([
    virtual
], Component.prototype, "init", null);
__decorate([
    virtual
], Component.prototype, "dispose", null);
__decorate([
    virtual
], Component.prototype, "clone", null);
__decorate([
    virtual
], Component.prototype, "addToObject", null);
__decorate([
    virtual
], Component.prototype, "addToComponentContainer", null);
__decorate([
    virtual
], Component.prototype, "removeFromObject", null);
__decorate([
    virtual
], Component.prototype, "removeFromComponentContainer", null);

function cacheGetter(judgeFunc, returnCacheValueFunc, setCacheFunc) {
    return function (target, name, descriptor) {
        var getter = descriptor.get;
        descriptor.get = function () {
            var result = null;
            if (judgeFunc.call(this)) {
                return returnCacheValueFunc.call(this);
            }
            result = getter.call(this);
            setCacheFunc.call(this, result);
            return result;
        };
        return descriptor;
    };
}
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
function cacheBufferForBufferContainer() {
    return function (target, name, descriptor) {
        var value = descriptor.value;
        descriptor.value = function (dataName) {
            var result = null;
            if (this.container.hasChild(dataName)) {
                return this.container.getChild(dataName);
            }
            result = value.call(this, dataName);
            this.container.addChild(dataName, result);
            return result;
        };
        return descriptor;
    };
}
function cacheBufferForBufferContainerWithFuncParam(setDataNameFuncName) {
    return function (target, name, descriptor) {
        var value = descriptor.value;
        descriptor.value = function (dataName) {
            var result = null, settedDataName = this[setDataNameFuncName](dataName);
            if (this.container.hasChild(settedDataName)) {
                return this.container.getChild(settedDataName);
            }
            result = value.call(this, dataName);
            this.container.addChild(settedDataName, result);
            return result;
        };
        return descriptor;
    };
}

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

var ETransformState;
(function (ETransformState) {
    ETransformState[ETransformState["ISTRANSLATE"] = "isTranslate"] = "ISTRANSLATE";
    ETransformState[ETransformState["ISROTATE"] = "isRotate"] = "ISROTATE";
    ETransformState[ETransformState["ISSCALE"] = "isScale"] = "ISSCALE";
    ETransformState[ETransformState["ISLOCALTRANSLATE"] = "isLocalTranslate"] = "ISLOCALTRANSLATE";
    ETransformState[ETransformState["ISLOCALROTATE"] = "isLocalRotate"] = "ISLOCALROTATE";
    ETransformState[ETransformState["ISLOCALSCALE"] = "isLocalScale"] = "ISLOCALSCALE";
})(ETransformState || (ETransformState = {}));

var EEngineEvent;
(function (EEngineEvent) {
    EEngineEvent[EEngineEvent["STARTLOOP"] = "wd_startLoop"] = "STARTLOOP";
    EEngineEvent[EEngineEvent["ENDLOOP"] = "wd_endLoop"] = "ENDLOOP";
    EEngineEvent[EEngineEvent["POINT_TAP"] = "wd_pointtap"] = "POINT_TAP";
    EEngineEvent[EEngineEvent["POINT_DOWN"] = "wd_pointdown"] = "POINT_DOWN";
    EEngineEvent[EEngineEvent["POINT_UP"] = "wd_pointup"] = "POINT_UP";
    EEngineEvent[EEngineEvent["POINT_MOVE"] = "wd_pointmove"] = "POINT_MOVE";
    EEngineEvent[EEngineEvent["POINT_OVER"] = "wd_pointover"] = "POINT_OVER";
    EEngineEvent[EEngineEvent["POINT_OUT"] = "wd_pointout"] = "POINT_OUT";
    EEngineEvent[EEngineEvent["POINT_SCALE"] = "wd_pointscale"] = "POINT_SCALE";
    EEngineEvent[EEngineEvent["POINT_DRAG"] = "wd_pointdrag"] = "POINT_DRAG";
    EEngineEvent[EEngineEvent["TRANSFORM_TRANSLATE"] = "wd_transform_translate"] = "TRANSFORM_TRANSLATE";
    EEngineEvent[EEngineEvent["TRANSFORM_ROTATE"] = "wd_transform_rotate"] = "TRANSFORM_ROTATE";
    EEngineEvent[EEngineEvent["TRANSFORM_SCALE"] = "wd_transform_scale"] = "TRANSFORM_SCALE";
})(EEngineEvent || (EEngineEvent = {}));

var Transform = (function (_super) {
    __extends(Transform, _super);
    function Transform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p_parent = null;
        _this._isTranslate = false;
        _this._isRotate = false;
        _this._isScale = false;
        _this.dirtyLocal = true;
        _this.children = Collection.create();
        _this._endLoopSubscription = null;
        return _this;
    }
    Object.defineProperty(Transform.prototype, "parent", {
        get: function () {
            return this.p_parent;
        },
        set: function (parent) {
            this.setParent(parent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isTransform", {
        get: function () {
            return this.isTranslate || this.isRotate || this.isScale;
        },
        set: function (isTransform) {
            if (isTransform) {
                this._setGlobalTransformState(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isTranslate", {
        get: function () {
            return this._isTranslate;
        },
        set: function (isTranslate) {
            this._setGlobalTransformState(ETransformState.ISTRANSLATE, isTranslate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isRotate", {
        get: function () {
            return this._isRotate;
        },
        set: function (isRotate) {
            this._setGlobalTransformState(ETransformState.ISROTATE, isRotate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isScale", {
        get: function () {
            return this._isScale;
        },
        set: function (isScale) {
            this._setGlobalTransformState(ETransformState.ISSCALE, isScale);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isLocalTranslate", {
        set: function (isTranslate) {
            this._setLocalTransformState(ETransformState.ISLOCALTRANSLATE, isTranslate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isLocalRotate", {
        set: function (isRotate) {
            this._setLocalTransformState(ETransformState.ISLOCALROTATE, isRotate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Transform.prototype, "isLocalScale", {
        set: function (isScale) {
            this._setLocalTransformState(ETransformState.ISLOCALSCALE, isScale);
        },
        enumerable: true,
        configurable: true
    });
    Transform.prototype.init = function () {
        var self = this;
        this.clearCache();
        this._endLoopSubscription = EventManager.fromEvent(EEngineEvent.ENDLOOP)
            .subscribe(function () {
            self._resetTransformFlag();
        });
    };
    Transform.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this._endLoopSubscription && this._endLoopSubscription.dispose();
    };
    Transform.prototype.addChild = function (child) {
        this.children.addChild(child);
    };
    Transform.prototype.removeChild = function (child) {
        this.children.removeChild(child);
    };
    Transform.prototype.setChildrenTransformState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var state = args[0];
            if (state) {
                this.children.forEach(function (child) {
                    child.isTransform = true;
                });
            }
        }
        else {
            var transformState_1 = args[0], state = args[1];
            if (state) {
                this.children.forEach(function (child) {
                    child[transformState_1] = true;
                });
            }
        }
    };
    Transform.prototype.handleWhenSetTransformState = function (transformState) {
    };
    Transform.prototype.setParent = function (parent) {
        if (this.p_parent) {
            this.p_parent.removeChild(this);
        }
        if (!parent) {
            this.p_parent = null;
            return;
        }
        this.p_parent = parent;
        this.p_parent.addChild(this);
    };
    Transform.prototype.getMatrix = function (syncMethod, matrixAttriName) {
        var syncList = Collection.create(), current = this.p_parent;
        syncList.addChild(this);
        while (current !== null) {
            syncList.addChild(current);
            current = current.parent;
        }
        syncList.reverse().forEach(function (transform) {
            transform[syncMethod]();
        });
        return this[matrixAttriName];
    };
    Transform.prototype._setGlobalTransformState = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var state = args[0];
            if (!state) {
                return;
            }
            this._isTranslate = true;
            this._isRotate = true;
            this._isScale = true;
            this.dirtyLocal = true;
            this.clearCache();
            this.handleWhenSetTransformState();
            this.setChildrenTransformState(state);
        }
        else {
            var transformState = args[0], state = args[1];
            this["_" + transformState] = state;
            if (state) {
                this.dirtyLocal = true;
                this.clearCache();
                this.handleWhenSetTransformState(transformState);
            }
            if (state) {
                this.setChildrenTransformState(transformState, state);
            }
        }
    };
    Transform.prototype._setLocalTransformState = function (transformState, state) {
        if (state) {
            this.dirtyLocal = true;
            this.clearCache();
        }
        if (state) {
            this.setChildrenTransformState(transformState, state);
        }
    };
    Transform.prototype._resetTransformFlag = function () {
        this.isTranslate = false;
        this.isScale = false;
        this.isRotate = false;
    };
    return Transform;
}(Component));
__decorate([
    cloneAttributeAsBasicType()
], Transform.prototype, "parent", null);
__decorate([
    virtual
], Transform.prototype, "handleWhenSetTransformState", null);

var RendererComponent = (function (_super) {
    __extends(RendererComponent, _super);
    function RendererComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RendererComponent;
}(Component));

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

var ViewWebGL = (function () {
    function ViewWebGL(dom) {
        this._dom = null;
        this._dom = dom;
    }
    ViewWebGL.create = function (view) {
        var obj = new this(view);
        return obj;
    };
    Object.defineProperty(ViewWebGL.prototype, "offset", {
        get: function () {
            var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
            while (view = view.offsetParent) {
                offset.x += view.offsetLeft;
                offset.y += view.offsetTop;
            }
            return offset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "dom", {
        get: function () {
            return this._dom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "width", {
        get: function () {
            return this._dom.clientWidth;
        },
        set: function (width) {
            this._dom.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "height", {
        get: function () {
            return this._dom.clientHeight;
        },
        set: function (height) {
            this._dom.height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "styleWidth", {
        get: function () {
            return this._dom.style.width;
        },
        set: function (styleWidth) {
            this._dom.style.width = styleWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "styleHeight", {
        get: function () {
            return this._dom.style.height;
        },
        set: function (styleHeight) {
            this._dom.style.height = styleHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "x", {
        get: function () {
            return Number(this._dom.style.left.slice(0, -2));
        },
        set: function (x) {
            this._dom.style.left = x + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewWebGL.prototype, "y", {
        get: function () {
            return Number(this._dom.style.top.slice(0, -2));
        },
        set: function (y) {
            this._dom.style.top = y + "px";
        },
        enumerable: true,
        configurable: true
    });
    ViewWebGL.prototype.initCanvas = function () {
        this._dom.style.cssText = "position:absolute;left:0;top:0;";
    };
    ViewWebGL.prototype.getContext = function (contextConfig) {
        return this._dom.getContext("webgl", contextConfig.options) || this._dom.getContext("experimental-webgl", contextConfig.options);
    };
    return ViewWebGL;
}());
ViewWebGL = __decorate([
    registerClass("ViewWebGL")
], ViewWebGL);

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

var root$2;
if (JudgeUtils$1.isNodeJs() && typeof global != "undefined") {
    root$2 = global;
}
else {
    root$2 = window;
}

var EScreenSize;
(function (EScreenSize) {
    EScreenSize[EScreenSize["FULL"] = 0] = "FULL";
})(EScreenSize || (EScreenSize = {}));

var DeviceManager = (function () {
    function DeviceManager() {
        this._scissorTest = false;
        this._depthTest = null;
        this._depthFunc = null;
        this._side = null;
        this.polygonOffset = null;
        this._polygonOffsetMode = null;
        this._depthWrite = null;
        this._blend = null;
        this._alphaToCoverage = null;
        this.view = null;
        this.gl = null;
        this.contextConfig = null;
        this._writeRed = null;
        this._writeGreen = null;
        this._writeBlue = null;
        this._writeAlpha = null;
        this._blendSrc = null;
        this._blendDst = null;
        this._blendEquation = null;
        this._blendFuncSeparate = null;
        this._blendEquationSeparate = null;
        this._scissorRegion = RectRegion.create();
        this._viewport = RectRegion.create();
        this._clearColor = null;
        this._pixelRatio = null;
    }
    DeviceManager.getInstance = function () { };
    Object.defineProperty(DeviceManager.prototype, "scissorTest", {
        get: function () {
            return this._scissorTest;
        },
        set: function (scissorTest) {
            var gl = this.gl;
            if (this._scissorTest === scissorTest) {
                return;
            }
            if (scissorTest) {
                gl.enable(gl.SCISSOR_TEST);
            }
            else {
                gl.disable(gl.SCISSOR_TEST);
            }
            this._scissorTest = scissorTest;
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.setScissor = function (x, y, width, height) {
        if (this._scissorRegion.y === y && this._scissorRegion.width === width && this._scissorRegion.height === height) {
            return;
        }
        this.gl.scissor(x, y, width, height);
        this._scissorRegion.set(x, y, width, height);
        this.scissorTest = true;
    };
    DeviceManager.prototype.setViewport = function (x, y, width, height) {
        if (this._viewport.x === x && this._viewport.y === y && this._viewport.width === width && this._viewport.height === height) {
            return;
        }
        this._viewport.set(x, y, width, height);
        this.gl.viewport(x, y, width, height);
    };
    DeviceManager.prototype.getViewport = function () {
        return this._viewport;
    };
    Object.defineProperty(DeviceManager.prototype, "depthTest", {
        get: function () {
            return this._depthTest;
        },
        set: function (depthTest) {
            var gl = this.gl;
            if (this._depthTest !== depthTest) {
                if (depthTest) {
                    gl.enable(gl.DEPTH_TEST);
                }
                else {
                    gl.disable(gl.DEPTH_TEST);
                }
                this._depthTest = depthTest;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "depthFunc", {
        get: function () {
            return this._depthFunc;
        },
        set: function (depthFunc) {
            var gl = this.gl;
            if (this._depthFunc !== depthFunc) {
                gl.depthFunc(gl[depthFunc]);
                this._depthFunc = depthFunc;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "side", {
        get: function () {
            return this._side;
        },
        set: function (side) {
            var gl = this.gl;
            if (this._side !== side) {
                switch (side) {
                    case ESide.NONE:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT_AND_BACK);
                        break;
                    case ESide.BOTH:
                        gl.disable(gl.CULL_FACE);
                        break;
                    case ESide.FRONT:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.BACK);
                        break;
                    case ESide.BACK:
                        gl.enable(gl.CULL_FACE);
                        gl.cullFace(gl.FRONT);
                        break;
                    default:
                        Log$$1.error(true, Log$$1.info.FUNC_UNEXPECT("side", side));
                        break;
                }
                this._side = side;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "polygonOffsetMode", {
        get: function () {
            return this._polygonOffsetMode;
        },
        set: function (polygonOffsetMode) {
            var gl = this.gl;
            if (this._polygonOffsetMode !== polygonOffsetMode) {
                switch (polygonOffsetMode) {
                    case EPolygonOffsetMode.NONE:
                        gl.polygonOffset(0.0, 0.0);
                        gl.disable(gl.POLYGON_OFFSET_FILL);
                        break;
                    case EPolygonOffsetMode.IN:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(1.0, 1.0);
                        break;
                    case EPolygonOffsetMode.OUT:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        gl.polygonOffset(-1.0, -1.0);
                        break;
                    case EPolygonOffsetMode.CUSTOM:
                        gl.enable(gl.POLYGON_OFFSET_FILL);
                        Log$$1.error(!this.polygonOffset, Log$$1.info.FUNC_MUST_DEFINE("polygonOffset"));
                        gl.polygonOffset(this.polygonOffset.x, this.polygonOffset.y);
                        break;
                    default:
                        break;
                }
                this._polygonOffsetMode = polygonOffsetMode;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "depthWrite", {
        get: function () {
            return this._depthWrite;
        },
        set: function (depthWrite) {
            if (this._depthWrite !== depthWrite) {
                this.gl.depthMask(depthWrite);
                this._depthWrite = depthWrite;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "blend", {
        get: function () {
            return this._blend;
        },
        set: function (blend) {
            var gl = this.gl;
            if (this._blend !== blend) {
                if (blend) {
                    gl.enable(gl.BLEND);
                }
                else {
                    gl.disable(gl.BLEND);
                }
                this._blend = blend;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "alphaToCoverage", {
        get: function () {
            return this._alphaToCoverage;
        },
        set: function (alphaToCoverage) {
            var gl = this.gl;
            if (this._alphaToCoverage !== alphaToCoverage) {
                if (alphaToCoverage) {
                    gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                }
                else {
                    gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
                }
                this._alphaToCoverage = alphaToCoverage;
            }
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.setBlendFunc = function (blendSrc, blendDst) {
        if ((this._blendSrc !== blendSrc) || (this._blendDst !== blendDst)) {
            this._blend && this.gl.blendFunc(this.gl[blendSrc], this.gl[blendDst]);
            this._blendSrc = blendSrc;
            this._blendDst = blendDst;
        }
    };
    DeviceManager.prototype.setBlendEquation = function (blendEquation) {
        if (this._blendEquation !== blendEquation) {
            this._blend && this.gl.blendEquation(this.gl[blendEquation]);
            this._blendEquation = blendEquation;
        }
    };
    DeviceManager.prototype.setBlendFuncSeparate = function (blendFuncSeparate) {
        var gl = this.gl;
        if (!this._blendFuncSeparate || this._blendFuncSeparate[0] !== blendFuncSeparate[0] || this._blendFuncSeparate[1] !== blendFuncSeparate[1]) {
            this._blend && gl.blendFuncSeparate(gl[blendFuncSeparate[0]], gl[blendFuncSeparate[1]], gl[blendFuncSeparate[2]], gl[blendFuncSeparate[3]]);
            this._blendFuncSeparate = blendFuncSeparate;
        }
    };
    DeviceManager.prototype.setBlendEquationSeparate = function (blendEquationSeparate) {
        var gl = this.gl;
        if (!this._blendEquationSeparate || this._blendEquationSeparate[0] !== blendEquationSeparate[0] || this._blendEquationSeparate[1] !== blendEquationSeparate[1]) {
            this._blend && gl.blendEquationSeparate(gl[blendEquationSeparate[0]], gl[blendEquationSeparate[1]]);
            this._blendEquationSeparate = blendEquationSeparate;
        }
    };
    DeviceManager.prototype.setColorWrite = function (writeRed, writeGreen, writeBlue, writeAlpha) {
        if (this._writeRed !== writeRed
            || this._writeGreen !== writeGreen
            || this._writeBlue !== writeBlue
            || this._writeAlpha !== writeAlpha) {
            this.gl.colorMask(writeRed, writeGreen, writeBlue, writeAlpha);
            this._writeRed = writeRed;
            this._writeGreen = writeGreen;
            this._writeBlue = writeBlue;
            this._writeAlpha = writeAlpha;
        }
    };
    DeviceManager.prototype.clear = function (options) {
        var gl = this.gl, color = options.color;
        this._setClearColor(color);
        this.setColorWrite(true, true, true, true);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    };
    DeviceManager.prototype.createGL = function (canvasId, contextConfig, useDevicePixelRatio) {
        var canvas = null;
        this.contextConfig = contextConfig;
        if (!!canvasId) {
            canvas = DomQuery.create(this._getCanvasId(canvasId)).get(0);
        }
        else {
            canvas = DomQuery.create("<canvas></canvas>").prependTo("body").get(0);
        }
        this.view = ViewWebGL.create(canvas);
        if (useDevicePixelRatio) {
            this.setPixelRatio(root$2.devicePixelRatio);
        }
        this.gl = this.view.getContext(contextConfig);
        if (!this.gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
    };
    DeviceManager.prototype.setScreen = function () {
        var screenSize = MainData.screenSize, x = null, y = null, width = null, height = null, styleWidth = null, styleHeight = null;
        if (screenSize === EScreenSize.FULL) {
            x = 0;
            y = 0;
            width = root$2.innerWidth;
            height = root$2.innerHeight;
            styleWidth = "100%";
            styleHeight = "100%";
            DomQuery.create("body").css("margin", "0");
        }
        else {
            x = screenSize.x || 0;
            y = screenSize.y || 0;
            width = screenSize.width || root$2.innerWidth;
            height = screenSize.height || root$2.innerHeight;
            styleWidth = width + "px";
            styleHeight = height + "px";
        }
        this.view.initCanvas();
        this.view.x = x;
        this.view.y = y;
        this.view.width = width;
        this.view.height = height;
        this.view.styleWidth = styleWidth;
        this.view.styleHeight = styleHeight;
        this.setViewport(0, 0, width, height);
    };
    DeviceManager.prototype.setHardwareScaling = function (level) {
        var width = this.view.width / level, height = this.view.height / level;
        this.view.width = width;
        this.view.height = height;
        this.setViewport(0, 0, width, height);
    };
    DeviceManager.prototype.setPixelRatio = function (pixelRatio) {
        this.view.width = Math.round(this.view.width * pixelRatio);
        this.view.height = Math.round(this.view.height * pixelRatio);
        this._pixelRatio = pixelRatio;
    };
    DeviceManager.prototype.getPixelRatio = function () {
        return this._pixelRatio;
    };
    DeviceManager.prototype._setClearColor = function (color) {
        if (this._clearColor && this._clearColor.isEqual(color)) {
            return;
        }
        this.gl.clearColor(color.r, color.g, color.b, color.a);
        this._clearColor = color;
    };
    DeviceManager.prototype._getCanvasId = function (canvasId) {
        if (canvasId.indexOf('#') > -1) {
            return canvasId;
        }
        return "#" + canvasId;
    };
    return DeviceManager;
}());
__decorate([
    requireCheck(function () {
        it("should exist MainData.screenSize", function () {
            index(MainData.screenSize).exist;
        });
    })
], DeviceManager.prototype, "setScreen", null);
__decorate([
    requireCheck(function (level) {
        it("level should > 0, but actual is " + level, function () {
            index(level).greaterThan(0);
        });
    })
], DeviceManager.prototype, "setHardwareScaling", null);
__decorate([
    ensure(function (id) {
        it("canvas id should be #xxx", function () {
            index(/#[^#]+/.test(id)).true;
        });
    })
], DeviceManager.prototype, "_getCanvasId", null);
DeviceManager = __decorate([
    singleton(),
    registerClass("DeviceManager")
], DeviceManager);
var EDepthFunction;
(function (EDepthFunction) {
    EDepthFunction[EDepthFunction["NEVER"] = "NEVER"] = "NEVER";
    EDepthFunction[EDepthFunction["ALWAYS"] = "ALWAYS"] = "ALWAYS";
    EDepthFunction[EDepthFunction["LESS"] = "LESS"] = "LESS";
    EDepthFunction[EDepthFunction["LEQUAL"] = "LEQUAL"] = "LEQUAL";
    EDepthFunction[EDepthFunction["EQUAL"] = "EQUAL"] = "EQUAL";
    EDepthFunction[EDepthFunction["GEQUAL"] = "GEQUAL"] = "GEQUAL";
    EDepthFunction[EDepthFunction["GREATER"] = "GREATER"] = "GREATER";
    EDepthFunction[EDepthFunction["NOTEQUAL"] = "NOTEQUAL"] = "NOTEQUAL";
})(EDepthFunction || (EDepthFunction = {}));
var ESide;
(function (ESide) {
    ESide[ESide["NONE"] = 0] = "NONE";
    ESide[ESide["BOTH"] = 1] = "BOTH";
    ESide[ESide["BACK"] = 2] = "BACK";
    ESide[ESide["FRONT"] = 3] = "FRONT";
})(ESide || (ESide = {}));
var EPolygonOffsetMode;
(function (EPolygonOffsetMode) {
    EPolygonOffsetMode[EPolygonOffsetMode["NONE"] = 0] = "NONE";
    EPolygonOffsetMode[EPolygonOffsetMode["IN"] = 1] = "IN";
    EPolygonOffsetMode[EPolygonOffsetMode["OUT"] = 2] = "OUT";
    EPolygonOffsetMode[EPolygonOffsetMode["CUSTOM"] = 3] = "CUSTOM";
})(EPolygonOffsetMode || (EPolygonOffsetMode = {}));
var EBlendFunc;
(function (EBlendFunc) {
    EBlendFunc[EBlendFunc["ZERO"] = "ZEOR"] = "ZERO";
    EBlendFunc[EBlendFunc["ONE"] = "ONE"] = "ONE";
    EBlendFunc[EBlendFunc["SRC_COLOR"] = "SRC_COLOR"] = "SRC_COLOR";
    EBlendFunc[EBlendFunc["ONE_MINUS_SRC_COLOR"] = "ONE_MINUS_SRC_COLOR"] = "ONE_MINUS_SRC_COLOR";
    EBlendFunc[EBlendFunc["DST_COLOR"] = "DST_COLOR"] = "DST_COLOR";
    EBlendFunc[EBlendFunc["ONE_MINUS_DST_COLOR"] = "ONE_MINUS_DST_COLOR"] = "ONE_MINUS_DST_COLOR";
    EBlendFunc[EBlendFunc["SRC_ALPHA"] = "SRC_ALPHA"] = "SRC_ALPHA";
    EBlendFunc[EBlendFunc["SRC_ALPHA_SATURATE"] = "SRC_ALPHA_SATURATE"] = "SRC_ALPHA_SATURATE";
    EBlendFunc[EBlendFunc["ONE_MINUS_SRC_ALPHA"] = "ONE_MINUS_SRC_ALPHA"] = "ONE_MINUS_SRC_ALPHA";
    EBlendFunc[EBlendFunc["DST_ALPHA"] = "DST_ALPHA"] = "DST_ALPHA";
    EBlendFunc[EBlendFunc["ONE_MINUS_DST_ALPH"] = "ONE_MINUS_DST_ALPHA"] = "ONE_MINUS_DST_ALPH";
})(EBlendFunc || (EBlendFunc = {}));
var EBlendEquation;
(function (EBlendEquation) {
    EBlendEquation[EBlendEquation["ADD"] = "FUNC_ADD"] = "ADD";
    EBlendEquation[EBlendEquation["SUBTRACT"] = "FUNC_SUBTRACT"] = "SUBTRACT";
    EBlendEquation[EBlendEquation["REVERSE_SUBTRAC"] = "FUNC_REVERSE_SUBTRACT"] = "REVERSE_SUBTRAC";
})(EBlendEquation || (EBlendEquation = {}));
var EBlendType;
(function (EBlendType) {
    EBlendType[EBlendType["NONE"] = 0] = "NONE";
    EBlendType[EBlendType["NORMAL"] = 1] = "NORMAL";
    EBlendType[EBlendType["ADDITIVE"] = 2] = "ADDITIVE";
    EBlendType[EBlendType["ADDITIVEALPHA"] = 3] = "ADDITIVEALPHA";
    EBlendType[EBlendType["MULTIPLICATIVE"] = 4] = "MULTIPLICATIVE";
    EBlendType[EBlendType["PREMULTIPLIED"] = 5] = "PREMULTIPLIED";
})(EBlendType || (EBlendType = {}));
var ECanvasType;
(function (ECanvasType) {
    ECanvasType[ECanvasType["TwoDUI"] = "TwoDUI"] = "TwoDUI";
})(ECanvasType || (ECanvasType = {}));

var Buffer$1 = (function (_super) {
    __extends(Buffer, _super);
    function Buffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buffer = null;
        return _this;
    }
    Buffer.prototype.dispose = function () {
        DeviceManager.getInstance().gl.deleteBuffer(this.buffer);
        delete this.buffer;
    };
    return Buffer;
}(Entity$1));

var EBufferUsage;
(function (EBufferUsage) {
    EBufferUsage[EBufferUsage["STREAM_DRAW"] = "STREAM_DRAW"] = "STREAM_DRAW";
    EBufferUsage[EBufferUsage["STATIC_DRAW"] = "STATIC_DRAW"] = "STATIC_DRAW";
    EBufferUsage[EBufferUsage["DYNAMIC_DRAW"] = "DYNAMIC_DRAW"] = "DYNAMIC_DRAW";
})(EBufferUsage || (EBufferUsage = {}));

var CommonBuffer = (function (_super) {
    __extends(CommonBuffer, _super);
    function CommonBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = null;
        _this.count = null;
        _this.usage = null;
        return _this;
    }
    CommonBuffer.prototype.resetBufferData = function (glBufferTargetStr, typedData, offset) {
        if (offset === void 0) { offset = 0; }
        var gl = DeviceManager.getInstance().gl;
        if (this.usage === EBufferUsage.STATIC_DRAW && offset === 0) {
            gl.bufferData(gl[glBufferTargetStr], typedData, gl.DYNAMIC_DRAW);
            return;
        }
        gl.bufferSubData(gl[glBufferTargetStr], offset, typedData);
    };
    return CommonBuffer;
}(Buffer$1));

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

var BufferTable = (function () {
    function BufferTable() {
    }
    BufferTable.bindIndexBuffer = function (indexBuffer) {
        var gl = null;
        if (this.lastBindedElementBuffer === indexBuffer) {
            return;
        }
        this.lastBindedElementBuffer = indexBuffer;
        gl = DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
    };
    BufferTable.hasBuffer = function (key) {
        return this._table.hasChild(key);
    };
    BufferTable.addBuffer = function (key, buffer) {
        this._table.addChild(key, buffer);
    };
    BufferTable.getBuffer = function (key) {
        return this._table.getChild(key);
    };
    BufferTable.dispose = function () {
        this._table.forEach(function (buffer) {
            buffer.dispose();
        });
        this.lastBindedArrayBufferListUidStr = null;
        this.lastBindedElementBuffer = null;
    };
    BufferTable.clearAll = function () {
        this._table.removeAllChildren();
        this.lastBindedArrayBufferListUidStr = null;
        this.lastBindedElementBuffer = null;
    };
    BufferTable.resetBindedArrayBuffer = function () {
        var gl = DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.lastBindedArrayBufferListUidStr = null;
    };
    BufferTable.resetBindedElementBuffer = function () {
        var gl = DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        this.lastBindedElementBuffer = null;
    };
    return BufferTable;
}());
BufferTable.lastBindedArrayBufferListUidStr = null;
BufferTable.lastBindedElementBuffer = null;
BufferTable._table = Hash.create();
BufferTable = __decorate([
    registerClass("BufferTable")
], BufferTable);
var BufferTableKey;
(function (BufferTableKey) {
    BufferTableKey[BufferTableKey["PROCEDURAL_VERTEX"] = "PROCEDURAL_VERTEX"] = "PROCEDURAL_VERTEX";
    BufferTableKey[BufferTableKey["PROCEDURAL_INDEX"] = "PROCEDURAL_INDEX"] = "PROCEDURAL_INDEX";
})(BufferTableKey || (BufferTableKey = {}));

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
    Object.defineProperty(GPUDetector.prototype, "gl", {
        get: function () {
            return DeviceManager.getInstance().gl;
        },
        enumerable: true,
        configurable: true
    });
    GPUDetector.prototype.detect = function () {
        this._isDetected = true;
        this._detectExtension();
        this._detectCapabilty();
    };
    GPUDetector.prototype._detectExtension = function () {
        this.extensionCompressedTextureS3TC = this._getExtension("WEBGL_compressed_texture_s3tc");
        this.extensionTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic");
        this.extensionInstancedArrays = this._getExtension("ANGLE_instanced_arrays");
        this.extensionUintIndices = this._getExtension("element_index_uint");
        this.extensionDepthTexture = this._getExtension("depth_texture");
        this.extensionVAO = this._getExtension("vao");
        this.extensionStandardDerivatives = this._getExtension("standard_derivatives");
    };
    GPUDetector.prototype._detectCapabilty = function () {
        var gl = this.gl;
        this.maxTextureUnit = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.maxCubemapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
        this.maxAnisotropy = this._getMaxAnisotropy();
        this.maxBoneCount = this._getMaxBoneCount();
        this._detectPrecision();
    };
    GPUDetector.prototype._getExtension = function (name) {
        var extension, gl = this.gl;
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
    GPUDetector.prototype._getMaxBoneCount = function () {
        var gl = this.gl, numUniforms = null, maxBoneCount = null;
        numUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
        numUniforms -= 4 * 4;
        numUniforms -= 1;
        numUniforms -= 4 * 4;
        maxBoneCount = Math.floor(numUniforms / 4);
        return Math.min(maxBoneCount, 128);
    };
    GPUDetector.prototype._getMaxAnisotropy = function () {
        var extension = this.extensionTextureFilterAnisotropic, gl = this.gl;
        return extension !== null ? gl.getParameter(extension.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0;
    };
    GPUDetector.prototype._detectPrecision = function () {
        var gl = this.gl;
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

var ElementBuffer = (function (_super) {
    __extends(ElementBuffer, _super);
    function ElementBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        return _this;
    }
    ElementBuffer.create = function (data, type, usage) {
        if (type === void 0) { type = null; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, type, usage);
        return obj;
    };
    Object.defineProperty(ElementBuffer.prototype, "typeSize", {
        get: function () {
            return this.data.BYTES_PER_ELEMENT;
        },
        enumerable: true,
        configurable: true
    });
    ElementBuffer.prototype.initWhenCreate = function (data, type, usage) {
        var gl = DeviceManager.getInstance().gl, isNeed32Bits = null, typedData = null;
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            Log$$1.warn('Failed to create the this.buffer object');
            return null;
        }
        if (!data) {
            return null;
        }
        isNeed32Bits = this._checkIsNeed32Bits(data, type);
        typedData = this._convertToTypedArray(isNeed32Bits, data);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typedData, gl[usage]);
        BufferTable.resetBindedElementBuffer();
        this._saveData(typedData, this._getType(isNeed32Bits, type), usage);
        return this.buffer;
    };
    ElementBuffer.prototype.resetData = function (data, type, offset) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        var gl = DeviceManager.getInstance().gl, isNeed32Bits = this._checkIsNeed32Bits(data, type), typedData = this._convertToTypedArray(isNeed32Bits, data);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer);
        this.resetBufferData("ELEMENT_ARRAY_BUFFER", typedData, offset);
        this._saveData(typedData, this._getType(isNeed32Bits, type), EBufferUsage.DYNAMIC_DRAW);
        return this;
    };
    ElementBuffer.prototype._convertToTypedArray = function (isNeed32Bits, data) {
        return isNeed32Bits ? new Uint32Array(data) : new Uint16Array(data);
    };
    ElementBuffer.prototype._checkIsNeed32Bits = function (indices, type) {
        var isNeed32Bits = false;
        if (type !== null) {
            if (type === EBufferType.UNSIGNED_INT) {
                return true;
            }
            return false;
        }
        if (GPUDetector.getInstance().extensionUintIndices) {
            for (var _i = 0, indices_1 = indices; _i < indices_1.length; _i++) {
                var indice = indices_1[_i];
                if (indice > 65535) {
                    isNeed32Bits = true;
                    break;
                }
            }
        }
        else {
            isNeed32Bits = false;
        }
        return isNeed32Bits;
    };
    ElementBuffer.prototype._getType = function (isNeed32Bits, type) {
        return type === null ? (isNeed32Bits ? EBufferType.UNSIGNED_INT : EBufferType.UNSIGNED_SHORT) : type;
    };
    ElementBuffer.prototype._saveData = function (data, type, usage) {
        this.type = type;
        this.count = data.length;
        this.data = data;
        this.usage = usage;
    };
    return ElementBuffer;
}(CommonBuffer));
__decorate([
    ensureGetter(function (typeSize) {
        assert(typeSize > 0, Log$$1.info.FUNC_SHOULD("typeSize", "> 0, but actual is " + typeSize));
    })
], ElementBuffer.prototype, "typeSize", null);
__decorate([
    requireCheck(function (data, type, offset) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        assert(this.buffer, Log$$1.info.FUNC_MUST("create gl buffer"));
    })
], ElementBuffer.prototype, "resetData", null);
__decorate([
    requireCheck(function (isNeed32Bits, type) {
        if (type !== null) {
            if (isNeed32Bits) {
                assert(type === EBufferType.UNSIGNED_INT, Log$$1.info.FUNC_MUST_BE("type", "UNSIGNED_SHORT, but actual is " + type));
            }
            else {
                assert(type === EBufferType.UNSIGNED_SHORT || type === EBufferType.UNSIGNED_INT, Log$$1.info.FUNC_MUST_BE("type", "UNSIGNED_SHORT or UNSIGNED_INT, but actual is " + type));
            }
        }
    })
], ElementBuffer.prototype, "_getType", null);
ElementBuffer = __decorate([
    registerClass("ElementBuffer")
], ElementBuffer);

var EBufferDataType;
(function (EBufferDataType) {
    EBufferDataType[EBufferDataType["VERTICE"] = "VERTICE"] = "VERTICE";
    EBufferDataType[EBufferDataType["INDICE"] = "INDICE"] = "INDICE";
})(EBufferDataType || (EBufferDataType = {}));

var ArrayBuffer = (function (_super) {
    __extends(ArrayBuffer, _super);
    function ArrayBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = null;
        _this.data = null;
        return _this;
    }
    ArrayBuffer.create = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, size, type, usage);
        return obj;
    };
    ArrayBuffer.prototype.initWhenCreate = function (data, size, type, usage) {
        var gl = DeviceManager.getInstance().gl, typedData = null;
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            Log$$1.warn('Failed to create the this.buffer object');
            return null;
        }
        if (!data) {
            return null;
        }
        typedData = this._convertToTypedArray(data, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, typedData, gl[usage]);
        BufferTable.resetBindedArrayBuffer();
        this._saveData(typedData, size, type, usage);
        return this.buffer;
    };
    ArrayBuffer.prototype.resetData = function (data, size, type, offset) {
        if (size === void 0) { size = this.size; }
        if (type === void 0) { type = this.type; }
        if (offset === void 0) { offset = 0; }
        var gl = DeviceManager.getInstance().gl, typedData = this._convertToTypedArray(data, type);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.resetBufferData("ARRAY_BUFFER", typedData, offset);
        this._saveData(typedData, size, type, EBufferUsage.DYNAMIC_DRAW);
        return this;
    };
    ArrayBuffer.prototype._convertToTypedArray = function (data, type) {
        return new Float32Array(data);
    };
    ArrayBuffer.prototype._saveData = function (data, size, type, usage) {
        this.size = size;
        this.type = type;
        this.count = data.length / size;
        this.usage = usage;
        this.data = data;
    };
    return ArrayBuffer;
}(CommonBuffer));
__decorate([
    requireCheck(function (data, size, type, offset) {
        if (size === void 0) { size = this.size; }
        if (type === void 0) { type = this.type; }
        if (offset === void 0) { offset = 0; }
        assert(this.buffer, Log$$1.info.FUNC_MUST("create gl buffer"));
    })
], ArrayBuffer.prototype, "resetData", null);
ArrayBuffer = __decorate([
    registerClass("ArrayBuffer")
], ArrayBuffer);

var _table = Hash.create();
_table.addChild(EBufferDataType.VERTICE, "vertices");
_table.addChild(EBufferDataType.INDICE, "indices");
var BufferDataTable = (function () {
    function BufferDataTable() {
    }
    BufferDataTable.getGeometryDataName = function (type) {
        var result = _table.getChild(type);
        return result;
    };
    return BufferDataTable;
}());
__decorate([
    ensure(function (result, type) {
        Log$$1.error(result === void 0, Log$$1.info.FUNC_NOT_EXIST(type, "in BufferDataTable"));
    })
], BufferDataTable, "getGeometryDataName", null);
BufferDataTable = __decorate([
    registerClass("BufferDataTable")
], BufferDataTable);

var BufferContainer = (function () {
    function BufferContainer(entityObject) {
        this.geometryData = null;
        this.entityObject = null;
        this.container = Hash.create();
        this._indiceBuffer = null;
        this.entityObject = entityObject;
    }
    BufferContainer.prototype.createBuffersFromGeometryData = function () {
        this.getChild(EBufferDataType.VERTICE);
        this.getChild(EBufferDataType.INDICE);
    };
    BufferContainer.prototype.removeCache = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.container.removeChild(args[0]);
    };
    BufferContainer.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = args[0], result = null;
        switch (type) {
            case EBufferDataType.VERTICE:
                result = this.getVertice(type);
                break;
            case EBufferDataType.INDICE:
                result = this._getIndice(type);
                break;
            default:
                break;
        }
        return result;
    };
    BufferContainer.prototype.init = function () {
    };
    BufferContainer.prototype.dispose = function () {
        this.container.forEach(function (buffer) {
            buffer.dispose();
        });
        this.geometryData.dispose();
    };
    BufferContainer.prototype.createOnlyOnceAndUpdateArrayBuffer = function (bufferAttriName, data, size, type, offset, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (offset === void 0) { offset = 0; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var buffer = this[bufferAttriName];
        if (buffer) {
            buffer.resetData(data, size, type, offset);
            return;
        }
        this[bufferAttriName] = ArrayBuffer.create(data, size, type, usage);
    };
    BufferContainer.prototype.createOnlyOnceAndUpdateElememntBuffer = function (bufferAttriName, data, type, offset, usage) {
        if (type === void 0) { type = null; }
        if (offset === void 0) { offset = 0; }
        if (usage === void 0) { usage = EBufferUsage.STATIC_DRAW; }
        var buffer = this[bufferAttriName];
        if (buffer) {
            buffer.resetData(data, type, offset);
            return;
        }
        this[bufferAttriName] = ElementBuffer.create(data, type, usage);
    };
    BufferContainer.prototype.hasData = function (data) {
        return !!data && data.length > 0;
    };
    BufferContainer.prototype._getIndice = function (type) {
        var geometryData = null;
        geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
        if (!this.hasData(geometryData)) {
            return null;
        }
        this.createOnlyOnceAndUpdateElememntBuffer("_indiceBuffer", geometryData);
        return this._indiceBuffer;
    };
    return BufferContainer;
}());
__decorate([
    virtual
], BufferContainer.prototype, "createBuffersFromGeometryData", null);
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        it("test arguments", function () {
            if (args.length === 2) {
                var dataName = args[1];
                index(dataName).exist;
                index(dataName).be.a("string");
            }
        });
    })
], BufferContainer.prototype, "getChild", null);
__decorate([
    cache(function (type) {
        return this.container.hasChild(type);
    }, function (type) {
        return this.container.getChild(type);
    }, function (result, type) {
        this.container.addChild(type, result);
    })
], BufferContainer.prototype, "_getIndice", null);

var CommonBufferContainer = (function (_super) {
    __extends(CommonBufferContainer, _super);
    function CommonBufferContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._verticeBuffer = null;
        return _this;
    }
    CommonBufferContainer.prototype.getVertice = function (type) {
        var geometryData = this.geometryData[BufferDataTable.getGeometryDataName(type)];
        if (!this.hasData(geometryData)) {
            return null;
        }
        this.createOnlyOnceAndUpdateArrayBuffer("_verticeBuffer", geometryData, 3);
        return this._verticeBuffer;
    };
    return CommonBufferContainer;
}(BufferContainer));
__decorate([
    cacheBufferForBufferContainer()
], CommonBufferContainer.prototype, "getVertice", null);

var BasicBufferContainer = (function (_super) {
    __extends(BasicBufferContainer, _super);
    function BasicBufferContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicBufferContainer.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    return BasicBufferContainer;
}(CommonBufferContainer));
BasicBufferContainer = __decorate([
    registerClass("BasicBufferContainer")
], BasicBufferContainer);

var GeometryData = (function () {
    function GeometryData(geometry) {
        this._vertices = null;
        this._faces = null;
        this.geometry = null;
        this._indiceCache = null;
        this._indiceDirty = true;
        this.geometry = geometry;
    }
    Object.defineProperty(GeometryData.prototype, "vertices", {
        get: function () {
            return this._vertices;
        },
        set: function (vertices) {
            this._vertices = vertices;
            this.geometry.buffers.removeCache(EBufferDataType.VERTICE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryData.prototype, "indices", {
        get: function () {
            var indices = [];
            for (var _i = 0, _a = this._faces; _i < _a.length; _i++) {
                var face = _a[_i];
                indices.push(face.aIndex, face.bIndex, face.cIndex);
            }
            return indices;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GeometryData.prototype, "faces", {
        get: function () {
            return this._faces;
        },
        set: function (faces) {
            this._faces = faces;
            this.geometry.buffers.removeCache(EBufferDataType.INDICE);
            this.onChangeFace();
        },
        enumerable: true,
        configurable: true
    });
    GeometryData.prototype.dispose = function () {
    };
    GeometryData.prototype.onChangeFace = function () {
        this._indiceDirty = true;
    };
    return GeometryData;
}());
__decorate([
    cacheGetter(function () {
        return !this._indiceDirty && this._indiceCache;
    }, function () {
        return this._indiceCache;
    }, function (result) {
        this._indiceCache = result;
        this._indiceDirty = false;
    })
], GeometryData.prototype, "indices", null);
__decorate([
    virtual
], GeometryData.prototype, "onChangeFace", null);

var BasicGeometryData = (function (_super) {
    __extends(BasicGeometryData, _super);
    function BasicGeometryData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicGeometryData.create = function (geometry) {
        var obj = new this(geometry);
        return obj;
    };
    return BasicGeometryData;
}(GeometryData));
BasicGeometryData = __decorate([
    registerClass("BasicGeometryData")
], BasicGeometryData);

var Geometry = (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._material = null;
        _this.buffers = null;
        _this.drawMode = EDrawMode.TRIANGLES;
        return _this;
    }
    Object.defineProperty(Geometry.prototype, "material", {
        get: function () {
            return this._material;
        },
        set: function (material) {
            if (!JudgeUtils$1.isEqual(material, this._material)) {
                this._material = material;
                this._material.geometry = this;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Geometry.prototype, "geometryData", {
        get: function () {
            if (this.buffers === null) {
                return null;
            }
            return this.buffers.geometryData;
        },
        enumerable: true,
        configurable: true
    });
    Geometry.prototype.init = function () {
        var geometryData = null, computedData = this.computeData();
        this.buffers = this.createBufferContainer();
        geometryData = this.createGeometryData(computedData);
        this.buffers.geometryData = geometryData;
        this.buffers.init();
        this._material.init();
    };
    Geometry.prototype.dispose = function () {
        this.buffers.dispose();
        this._material.dispose();
    };
    Geometry.prototype.createBuffersFromGeometryData = function () {
        this.buffers.createBuffersFromGeometryData();
    };
    Geometry.prototype.createBufferContainer = function () {
        return BasicBufferContainer.create(this.entityObject);
    };
    Geometry.prototype.createGeometryData = function (computedData) {
        return this.createBasicGeometryData(computedData);
    };
    Geometry.prototype.createBasicGeometryData = function (computedData) {
        var vertices = computedData.vertices, _a = computedData.faces, faces = _a === void 0 ? [] : _a, geometryData = BasicGeometryData.create(this);
        geometryData.vertices = vertices;
        geometryData.faces = faces;
        return geometryData;
    };
    return Geometry;
}(Component));
__decorate([
    cloneAttributeAsCloneable()
], Geometry.prototype, "material", null);
__decorate([
    cloneAttributeAsBasicType()
], Geometry.prototype, "drawMode", void 0);
__decorate([
    ensure(function () {
        var geometryData = this.buffers.geometryData;
        it("faces.count should be be " + geometryData.indices.length / 3 + ", but actual is " + geometryData.faces.length, function () {
            index(geometryData.faces.length * 3).equal(geometryData.indices.length);
        });
    }),
    execOnlyOnce("_isInit")
], Geometry.prototype, "init", null);
__decorate([
    requireCheck(function () {
        var _this = this;
        it("not exist buffers", function () {
            index(_this.buffers).exist;
        });
    })
], Geometry.prototype, "createBuffersFromGeometryData", null);
__decorate([
    virtual
], Geometry.prototype, "createBufferContainer", null);
__decorate([
    virtual
], Geometry.prototype, "createGeometryData", null);

var SortUtils = (function () {
    function SortUtils() {
    }
    SortUtils.insertSort = function (targetArr, compareFunc, isChangeSelf) {
        if (isChangeSelf === void 0) { isChangeSelf = false; }
        var resultArr = isChangeSelf ? targetArr : ExtendUtils.extend([], targetArr);
        for (var i = 1, len = resultArr.length; i < len; i++) {
            for (var j = i; j > 0 && compareFunc(resultArr[j], resultArr[j - 1]); j--) {
                this._swap(resultArr, j - 1, j);
            }
        }
        return resultArr;
    };
    SortUtils.quickSort = function (targetArr, compareFunc, isChangeSelf) {
        if (isChangeSelf === void 0) { isChangeSelf = false; }
        var resultArr = isChangeSelf ? targetArr : ExtendUtils.extend([], targetArr);
        var sort = function (l, r) {
            if (l >= r) {
                return;
            }
            var i = l, j = r, x = resultArr[l];
            while (i < j) {
                while (i < j && compareFunc(x, resultArr[j])) {
                    j--;
                }
                if (i < j) {
                    resultArr[i++] = resultArr[j];
                }
                while (i < j && compareFunc(resultArr[i], x)) {
                    i++;
                }
                if (i < j) {
                    resultArr[j--] = resultArr[i];
                }
            }
            resultArr[i] = x;
            sort(l, i - 1);
            sort(i + 1, r);
        };
        sort(0, resultArr.length - 1);
        return resultArr;
    };
    SortUtils._swap = function (children, i, j) {
        var t = null;
        t = children[i];
        children[i] = children[j];
        children[j] = t;
    };
    return SortUtils;
}());
SortUtils = __decorate([
    registerClass("SortUtils")
], SortUtils);

var ComponentInitOrderTable = (function () {
    function ComponentInitOrderTable() {
    }
    ComponentInitOrderTable.getOrder = function (component) {
        if (component instanceof Geometry) {
            return 4;
        }
        return 5;
    };
    return ComponentInitOrderTable;
}());
ComponentInitOrderTable = __decorate([
    registerClass("ComponentInitOrderTable")
], ComponentInitOrderTable);

var ComponentManager = (function () {
    function ComponentManager(entityObject) {
        this.transform = null;
        this._entityObject = null;
        this._components = Collection.create();
        this._rendererComponent = null;
        this._geometry = null;
        this._entityObject = entityObject;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
        for (var _i = 0, _a = SortUtils.insertSort(this._components.getChildren(), function (a, b) {
            return ComponentInitOrderTable.getOrder(a) < ComponentInitOrderTable.getOrder(b);
        }); _i < _a.length; _i++) {
            var component = _a[_i];
            component.init();
        }
    };
    ComponentManager.prototype.dispose = function () {
        var components = this.removeAllComponent();
        components.forEach(function (component) {
            component.dispose();
        });
        this._components.removeAllChildren();
    };
    ComponentManager.prototype.removeAllComponent = function () {
        var _this = this;
        var result = Collection.create();
        this._components.forEach(function (component) {
            _this._removeComponentHandler(component);
            result.addChild(component);
        }, this);
        return result;
    };
    ComponentManager.prototype.getComponent = function (_class) {
        return this._components.findOne(function (component) {
            return component instanceof _class;
        });
    };
    ComponentManager.prototype.getComponents = function () {
        return this._components;
    };
    ComponentManager.prototype.findComponentByUid = function (uid) {
        return this._components.findOne(function (component) {
            return component.uid === uid;
        });
    };
    ComponentManager.prototype.forEachComponent = function (func) {
        this._components.forEach(func);
        return this;
    };
    ComponentManager.prototype.hasComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = null;
        if (JudgeUtils$1.isComponenet(args[0])) {
            var component = args[0];
            result = this._components.hasChild(component);
        }
        else {
            var _class_1 = args[0];
            result = this._components.hasChildWithFunc(function (component) {
                return component instanceof _class_1;
            });
        }
        return result;
    };
    ComponentManager.prototype.addComponent = function (component, isShareComponent) {
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (!component) {
            return;
        }
        if (component instanceof RendererComponent) {
            this._rendererComponent = component;
        }
        else if (component instanceof Geometry) {
            this._geometry = component;
        }
        else if (component instanceof Transform) {
            if (this.transform) {
                this.removeComponent(this.transform);
            }
            this.transform = component;
        }
        component.addToObject(this._entityObject, isShareComponent);
        this._components.addChild(component);
        return this;
    };
    ComponentManager.prototype.removeComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var component = null;
        if (args[0] instanceof Component) {
            component = args[0];
        }
        else {
            component = this.getComponent(args[0]);
        }
        if (component) {
            this._components.removeChild(component);
            this._removeComponentHandler(component);
        }
        return this;
    };
    ComponentManager.prototype.getComponentCount = function (_class) {
        return this._components.filter(function (component) {
            return component instanceof _class;
        }).getCount();
    };
    ComponentManager.prototype.getGeometry = function () {
        return this._geometry;
    };
    ComponentManager.prototype.getRendererComponent = function () {
        return this._rendererComponent;
    };
    ComponentManager.prototype._removeComponentHandler = function (component) {
        component.removeFromObject(this._entityObject);
    };
    return ComponentManager;
}());
__decorate([
    requireCheck(function (component, isShareComponent) {
        var _this = this;
        if (isShareComponent === void 0) { isShareComponent = false; }
        if (!component) {
            return;
        }
        it("should not add the component which is already added", function () {
            index(_this.hasComponent(component)).false;
        });
    })
], ComponentManager.prototype, "addComponent", null);
__decorate([
    requireCheck(function () {
        var _this = this;
        it("entityObject shouldn't contain more than 1 geometry component", function () {
            index(_this.getComponentCount(Geometry)).lessThan(2);
        });
    })
], ComponentManager.prototype, "getGeometry", null);
__decorate([
    requireCheck(function () {
        var _this = this;
        it("entityObject shouldn't contain more than 1 rendererComponent", function () {
            index(_this.getComponentCount(RendererComponent)).lessThan(2);
        });
    })
], ComponentManager.prototype, "getRendererComponent", null);
ComponentManager = __decorate([
    registerClass("ComponentManager")
], ComponentManager);

var EntityObjectManager = (function () {
    function EntityObjectManager(entityObject) {
        this._entityObject = null;
        this._children = Collection.create();
        this._entityObject = entityObject;
    }
    EntityObjectManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    EntityObjectManager.prototype.init = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityObjectManager.prototype.dispose = function () {
        this.forEach(function (child) {
            child.dispose();
        });
    };
    EntityObjectManager.prototype.hasChild = function (child) {
        return this._children.hasChild(child);
    };
    EntityObjectManager.prototype.addChild = function (child) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this._entityObject;
        child.transform.parent = this._entityObject.transform;
        this._children.addChild(child);
        return this;
    };
    EntityObjectManager.prototype.addChildren = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (JudgeUtils$1.isArray(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                this.addChild(child);
            }
        }
        else if (JudgeUtils$1.isCollection(args[0])) {
            var children = args[0];
            children.forEach(function (child) {
                _this.addChild(child);
            });
        }
        else {
            this.addChild(args[0]);
        }
        return this;
    };
    EntityObjectManager.prototype.forEach = function (func) {
        this._children.forEach(func);
        return this;
    };
    EntityObjectManager.prototype.filter = function (func) {
        return this._children.filter(func);
    };
    EntityObjectManager.prototype.sort = function (func, isSortSelf) {
        if (isSortSelf === void 0) { isSortSelf = false; }
        return this._children.sort(func, isSortSelf);
    };
    EntityObjectManager.prototype.getChildren = function () {
        return this._children;
    };
    EntityObjectManager.prototype.getAllChildren = function () {
        var result = Collection.create();
        var getChildren = function (entityObject) {
            result.addChildren(entityObject.getChildren());
            entityObject.forEach(function (child) {
                getChildren(child);
            });
        };
        getChildren(this._entityObject);
        return result;
    };
    EntityObjectManager.prototype.getChild = function (index) {
        return this._children.getChild(index);
    };
    EntityObjectManager.prototype.findChildByUid = function (uid) {
        return this._children.findOne(function (child) {
            return child.uid === uid;
        });
    };
    EntityObjectManager.prototype.findChildByTag = function (tag) {
        return this._children.findOne(function (child) {
            return child.hasTag(tag);
        });
    };
    EntityObjectManager.prototype.findChildByName = function (name) {
        return this._children.findOne(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityObjectManager.prototype.findChildrenByName = function (name) {
        return this._children.filter(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityObjectManager.prototype.removeChild = function (child) {
        this._children.removeChild(child);
        child.parent = null;
        return this;
    };
    EntityObjectManager.prototype.removeAllChildren = function () {
        var _this = this;
        this._children.forEach(function (child) {
            _this.removeChild(child);
        }, this);
    };
    return EntityObjectManager;
}());
EntityObjectManager = __decorate([
    registerClass("EntityObjectManager")
], EntityObjectManager);

var EntityObject = (function (_super) {
    __extends(EntityObject, _super);
    function EntityObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._bubbleParent = null;
        _this.name = null;
        _this.parent = null;
        _this.customEventMap = Hash.create();
        _this.componentManager = ComponentManager.create(_this);
        _this._hasComponentCache = Hash.create();
        _this._getComponentCache = Hash.create();
        _this._componentChangeSubscription = null;
        _this._entityObjectManager = EntityObjectManager.create(_this);
        return _this;
    }
    Object.defineProperty(EntityObject.prototype, "bubbleParent", {
        get: function () {
            return this._bubbleParent ? this._bubbleParent : this.parent;
        },
        set: function (bubbleParent) {
            this._bubbleParent = bubbleParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "componentDirty", {
        set: function (componentDirty) {
            if (componentDirty === true) {
                this.clearCache();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "transform", {
        get: function () {
            return this.componentManager.transform;
        },
        enumerable: true,
        configurable: true
    });
    EntityObject.prototype.initWhenCreate = function () {
        this.addComponent(this.createTransform());
    };
    EntityObject.prototype.clone = function (config) {
        if (config === void 0) { config = {}; }
        var result = null;
        if (CloneUtils.isNotClone((this))) {
            return null;
        }
        config = ExtendUtils.extend({
            cloneChildren: true,
            shareGeometry: false,
            cloneGeometry: true
        }, config);
        result = CloneUtils.clone(this);
        this.forEachComponent(function (component) {
            if (!config.cloneGeometry && component instanceof Geometry) {
                return;
            }
            if (config.shareGeometry && component instanceof Geometry) {
                result.addComponent(component, true);
                return;
            }
            result.addComponent(component.clone());
        });
        if (config.cloneChildren) {
            this._cloneChildren(result);
        }
        return result;
    };
    EntityObject.prototype.init = function () {
        var self = this;
        this.componentManager.init();
        this._entityObjectManager.init();
        this.afterInitChildren();
        return this;
    };
    EntityObject.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
        this.componentManager.dispose();
        this._entityObjectManager.dispose();
        EventManager.off(this);
    };
    EntityObject.prototype.hasChild = function (child) {
        return this._entityObjectManager.hasChild(child);
    };
    EntityObject.prototype.addChild = function (child) {
        this._entityObjectManager.addChild(child);
        return this;
    };
    EntityObject.prototype.getChildren = function () {
        return this._entityObjectManager.getChildren();
    };
    EntityObject.prototype.removeChild = function (child) {
        this._entityObjectManager.removeChild(child);
        return this;
    };
    EntityObject.prototype.forEach = function (func) {
        this._entityObjectManager.forEach(func);
        return this;
    };
    EntityObject.prototype.getComponent = function (_class) {
        return this.componentManager.getComponent(_class);
    };
    EntityObject.prototype.hasComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = this._getHasComponentCacheKey(args[0]), result = this._hasComponentCache.getChild(key);
        if (result !== void 0) {
            return result;
        }
        result = this.componentManager.hasComponent(args[0]);
        this._hasComponentCache.addChild(key, result);
        return result;
    };
    EntityObject.prototype.addComponent = function (component, isShareComponent) {
        if (isShareComponent === void 0) { isShareComponent = false; }
        this.componentManager.addComponent(component, isShareComponent);
        this.componentDirty = true;
        return this;
    };
    EntityObject.prototype.removeComponent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.componentManager.removeComponent(args[0]);
        this.componentDirty = true;
        return this;
    };
    EntityObject.prototype.forEachComponent = function (func) {
        this.componentManager.forEachComponent(func);
        return this;
    };
    EntityObject.prototype.render = function (renderer, camera) {
        var rendererComponent = null;
        rendererComponent = this.componentManager.getRendererComponent();
        if (rendererComponent) {
            rendererComponent.render(renderer, this, camera);
        }
        this.getRenderList().forEach(function (child) {
            child.render(renderer, camera);
        });
    };
    EntityObject.prototype.update = function (elapsed) {
        this.forEach(function (child) {
            child.update(elapsed);
        });
    };
    EntityObject.prototype.clearCache = function () {
        this._hasComponentCache.removeAllChildren();
        this._getComponentCache.removeAllChildren();
    };
    EntityObject.prototype.getGeometry = function () {
        return this.componentManager.getGeometry();
    };
    EntityObject.prototype.afterInitChildren = function () {
    };
    EntityObject.prototype.getRenderList = function () {
        return this.getChildren();
    };
    EntityObject.prototype._getHasComponentCacheKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (JudgeUtils$1.isComponenet(args[0])) {
            var component = args[0];
            return String(component.uid);
        }
        else {
            var _class = args[0];
            return _class.name;
        }
    };
    EntityObject.prototype._cloneChildren = function (result) {
        this.forEach(function (child) {
            var resultChild = child.clone();
            if (resultChild !== null) {
                result.addChild(resultChild);
            }
        });
    };
    return EntityObject;
}(Entity$1));
__decorate([
    cloneAttributeAsBasicType()
], EntityObject.prototype, "bubbleParent", null);
__decorate([
    cloneAttributeAsBasicType()
], EntityObject.prototype, "name", void 0);
__decorate([
    cloneAttributeAsBasicType()
], EntityObject.prototype, "parent", void 0);
__decorate([
    virtual
], EntityObject.prototype, "initWhenCreate", null);
__decorate([
    cache(function (_class) {
        return this._getComponentCache.hasChild(_class.name);
    }, function (_class) {
        return this._getComponentCache.getChild(_class.name);
    }, function (result, _class) {
        this._getComponentCache.addChild(_class.name, result);
    })
], EntityObject.prototype, "getComponent", null);
__decorate([
    virtual
], EntityObject.prototype, "render", null);
__decorate([
    virtual
], EntityObject.prototype, "getGeometry", null);
__decorate([
    virtual
], EntityObject.prototype, "afterInitChildren", null);
__decorate([
    virtual
], EntityObject.prototype, "getRenderList", null);
__decorate([
    ensure(function (key) {
        it("key:" + key + " be string", function () {
            index(JudgeUtils$1.isString(key)).true;
        });
    })
], EntityObject.prototype, "_getHasComponentCacheKey", null);

var EEventType;
(function (EEventType) {
    EEventType[EEventType["MOUSE"] = 0] = "MOUSE";
    EEventType[EEventType["TOUCH"] = 1] = "TOUCH";
    EEventType[EEventType["POINT"] = 2] = "POINT";
    EEventType[EEventType["KEYBOARD"] = 3] = "KEYBOARD";
    EEventType[EEventType["CUSTOM"] = 4] = "CUSTOM";
})(EEventType || (EEventType = {}));

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
// module.exports.chrome = "a";
// module.exports.firefox = "a";
// module.exports.msie = "a";
// module.exports.version = "a";
// module.exports.mobile = "a";
});

var bowser_1 = bowser.version;
var bowser_2 = bowser.chrome;
var bowser_3 = bowser.msie;
var bowser_4 = bowser.firefox;
var bowser_5 = bowser.mobile;

var EBrowserIdentifier;
(function (EBrowserIdentifier) {
    EBrowserIdentifier[EBrowserIdentifier["FALLBACK"] = "fallback"] = "FALLBACK";
    EBrowserIdentifier[EBrowserIdentifier["FIREFOX"] = "firefox"] = "FIREFOX";
    EBrowserIdentifier[EBrowserIdentifier["CHROME"] = "chrome"] = "CHROME";
})(EBrowserIdentifier || (EBrowserIdentifier = {}));
var EEventName;
(function (EEventName) {
    EEventName[EEventName["CLICK"] = "click"] = "CLICK";
    EEventName[EEventName["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
    EEventName[EEventName["MOUSEUP"] = "mouseup"] = "MOUSEUP";
    EEventName[EEventName["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
    EEventName[EEventName["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
    EEventName[EEventName["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
    EEventName[EEventName["MOUSEWHEEL"] = "mousewheel|DOMMouseScroll*" + EBrowserIdentifier.FIREFOX] = "MOUSEWHEEL";
    EEventName[EEventName["MOUSEDRAG"] = "mousedrag"] = "MOUSEDRAG";
    EEventName[EEventName["TOUCHUP"] = "touchend"] = "TOUCHUP";
    EEventName[EEventName["TOUCHMOVE"] = "touchmove"] = "TOUCHMOVE";
    EEventName[EEventName["TOUCHDOWN"] = "touchstart"] = "TOUCHDOWN";
    EEventName[EEventName["KEYDOWN"] = "keydown"] = "KEYDOWN";
    EEventName[EEventName["KEYUP"] = "keyup"] = "KEYUP";
    EEventName[EEventName["KEYPRESS"] = "keypress"] = "KEYPRESS";
})(EEventName || (EEventName = {}));
var EVENTNAME_SPLITTER = '|';
var BROWSER_IDENTIFIER = '*';
var EventNameHandler = (function () {
    function EventNameHandler() {
    }
    EventNameHandler.handleEventName = function (domEventName) {
        var eventName = domEventName, fallbackEventName = null, specifyBrowserEventNameArr = [], result = null;
        for (var _i = 0, _a = eventName.split(EVENTNAME_SPLITTER); _i < _a.length; _i++) {
            var name = _a[_i];
            if (this._isFallbackEventName(name)) {
                fallbackEventName = name;
            }
            else {
                specifyBrowserEventNameArr.push(name);
            }
        }
        result = this._getSpecifyBrowserEventName(specifyBrowserEventNameArr);
        return result !== null ? result : fallbackEventName;
    };
    EventNameHandler._isFallbackEventName = function (eventName) {
        return eventName.split(BROWSER_IDENTIFIER).length === 1;
    };
    EventNameHandler._getSpecifyBrowserEventName = function (specifyBrowserEventNameArr) {
        var result = null;
        for (var _i = 0, specifyBrowserEventNameArr_1 = specifyBrowserEventNameArr; _i < specifyBrowserEventNameArr_1.length; _i++) {
            var eventName = specifyBrowserEventNameArr_1[_i];
            var _a = eventName.split(BROWSER_IDENTIFIER), domEventName = _a[0], browserIdentifier = _a[1];
            switch (browserIdentifier) {
                case EBrowserIdentifier.CHROME:
                    if (bowser_2) {
                        result = domEventName;
                    }
                    break;
                case EBrowserIdentifier.FIREFOX:
                    if (bowser_4) {
                        result = domEventName;
                    }
                    break;
                default:
                    break;
            }
            if (result) {
                break;
            }
        }
        return result;
    };
    return EventNameHandler;
}());
EventNameHandler = __decorate([
    registerClass("EventNameHandler")
], EventNameHandler);

var _table$1 = Hash.create();
_table$1.addChild(EEventName.CLICK, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEMOVE, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEDOWN, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEDRAG, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEOUT, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEOVER, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEUP, EEventType.MOUSE);
_table$1.addChild(EEventName.MOUSEWHEEL, EEventType.MOUSE);
_table$1.addChild(EEventName.TOUCHMOVE, EEventType.TOUCH);
_table$1.addChild(EEventName.TOUCHDOWN, EEventType.TOUCH);
_table$1.addChild(EEventName.TOUCHUP, EEventType.TOUCH);
_table$1.addChild(EEngineEvent.POINT_TAP, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_OVER, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_OUT, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_MOVE, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_DOWN, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_UP, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_SCALE, EEventType.POINT);
_table$1.addChild(EEngineEvent.POINT_DRAG, EEventType.POINT);
_table$1.addChild(EEventName.KEYDOWN, EEventType.KEYBOARD);
_table$1.addChild(EEventName.KEYPRESS, EEventType.KEYBOARD);
_table$1.addChild(EEventName.KEYUP, EEventType.KEYBOARD);
var EventTable = (function () {
    function EventTable() {
    }
    EventTable.getEventType = function (eventName) {
        var result = _table$1.getChild(eventName);
        if (result === void 0) {
            result = EEventType.CUSTOM;
        }
        return result;
    };
    return EventTable;
}());
EventTable = __decorate([
    registerClass("EventTable")
], EventTable);

var EventBinder = (function () {
    function EventBinder() {
    }
    return EventBinder;
}());

var EventHandler = (function () {
    function EventHandler() {
    }
    return EventHandler;
}());

var EventRegister = (function () {
    function EventRegister() {
    }
    EventRegister.prototype.getEventRegisterDataList = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = this.listenerMap.getChild.apply(this.listenerMap, args);
        if (!result) {
            return null;
        }
        return result.sort(function (dataA, dataB) {
            return dataB.priority - dataA.priority;
        }, true);
    };
    EventRegister.prototype.forEachAll = function (func) {
        return this.listenerMap.forEachAll(func);
    };
    EventRegister.prototype.forEachEventName = function (func) {
        this.listenerMap.forEachEventName(func);
    };
    EventRegister.prototype.clear = function () {
        return this.listenerMap.clear();
    };
    EventRegister.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.listenerMap.getChild.apply(this.listenerMap, Array.prototype.slice.call(arguments, 0));
    };
    return EventRegister;
}());

var EventListenerMap = (function () {
    function EventListenerMap() {
    }
    EventListenerMap.prototype.buildSecondLevelKey = function (eventName) {
        return eventName;
    };
    return EventListenerMap;
}());

var DomEventListenerMap = (function (_super) {
    __extends(DomEventListenerMap, _super);
    function DomEventListenerMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._targetListenerMap = Hash.create();
        return _this;
    }
    DomEventListenerMap.create = function () {
        var obj = new this();
        return obj;
    };
    DomEventListenerMap.prototype.hasChild = function (dom, eventName) {
        var list = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
        if (!list) {
            return false;
        }
        list = list.getChild(eventName);
        return list && list.getCount() > 0;
    };
    DomEventListenerMap.prototype.appendChild = function (dom, eventName, data) {
        var firstLevelKey = this.buildFirstLevelKey(dom);
        if (!this._targetListenerMap.hasChild(firstLevelKey)) {
            var secondMap = Hash.create();
            secondMap.addChild(this.buildSecondLevelKey(eventName), Collection.create([data]));
            this._targetListenerMap.addChild(firstLevelKey, secondMap);
            return;
        }
        this._targetListenerMap.getChild(firstLevelKey).appendChild(this.buildSecondLevelKey(eventName), data);
    };
    DomEventListenerMap.prototype.forEachAll = function (func) {
        this._targetListenerMap.forEach(function (secondMap) {
            secondMap.forEach(func);
        });
    };
    DomEventListenerMap.prototype.forEachEventName = function (func) {
        this.forEachAll(func);
    };
    DomEventListenerMap.prototype.clear = function () {
        this._targetListenerMap.removeAllChildren();
    };
    DomEventListenerMap.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var dom = args[0];
            return this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
        }
        else if (args.length === 2) {
            var dom = args[0], eventName = args[1], secondMap = null;
            secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            if (!secondMap) {
                return null;
            }
            return secondMap.getChild(this.buildSecondLevelKey(eventName));
        }
    };
    DomEventListenerMap.prototype.removeChild = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = null;
        if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName_1 = args[0], arr_1 = [];
            this._targetListenerMap.forEach(function (secondMap, firstLevelKey) {
                var secondLevelKey = _this.buildSecondLevelKey(eventName_1);
                if (secondMap.hasChild(secondLevelKey)) {
                    arr_1.push(secondMap.removeChild(secondLevelKey).getChild(0));
                }
            });
            var l = Collection.create();
            for (var _a = 0, arr_2 = arr_1; _a < arr_2.length; _a++) {
                var list = arr_2[_a];
                l.addChildren(list);
            }
            result = this._getEventDataOffDataList(eventName_1, l);
        }
        else if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName_2 = args[0], handler_1 = args[1], arr_3 = [];
            this._targetListenerMap.forEach(function (secondMap, firstLevelKey) {
                var list = secondMap.getChild(_this.buildSecondLevelKey(eventName_2));
                if (list) {
                    arr_3.push(list.removeChild(function (data) {
                        return data.originHandler === handler_1;
                    }));
                }
            });
            var l = Collection.create();
            for (var _b = 0, arr_4 = arr_3; _b < arr_4.length; _b++) {
                var list = arr_4[_b];
                l.addChildren(list);
            }
            result = this._getEventDataOffDataList(eventName_2, l);
        }
        else if (args.length === 2 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], secondMap = null;
            secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            if (!secondMap) {
                result = Collection.create();
            }
            else {
                result = this._getEventDataOffDataList(eventName, secondMap.removeChild(this.buildSecondLevelKey(eventName)).getChild(0));
            }
        }
        else if (args.length === 3 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler_2 = args[2], secondMap = null;
            secondMap = this._targetListenerMap.getChild(this.buildFirstLevelKey(dom));
            if (!secondMap) {
                result = Collection.create();
            }
            else {
                var list = secondMap.getChild(this.buildSecondLevelKey(eventName));
                if (!list) {
                    result = Collection.create();
                }
                else {
                    result = this._getEventDataOffDataList(eventName, list.removeChild(function (val) {
                        return val.originHandler === handler_2;
                    }));
                }
            }
        }
        return result;
    };
    DomEventListenerMap.prototype.buildFirstLevelKey = function (dom) {
        if (dom.id) {
            return "" + dom.tagName + dom.id;
        }
        if (dom.nodeName) {
            return "" + dom.nodeName;
        }
        return "" + dom.tagName;
    };
    DomEventListenerMap.prototype._getEventDataOffDataList = function (eventName, result) {
        if (!result) {
            return Collection.create();
        }
        return result.map(function (data) {
            return {
                dom: data.dom,
                eventName: eventName,
                domHandler: data.domHandler
            };
        });
    };
    return DomEventListenerMap;
}(EventListenerMap));
DomEventListenerMap = __decorate([
    registerClass("DomEventListenerMap")
], DomEventListenerMap);

var DomEventRegister = (function (_super) {
    __extends(DomEventRegister, _super);
    function DomEventRegister() {
        var _this = _super.call(this) || this;
        _this.listenerMap = DomEventListenerMap.create();
        return _this;
    }
    DomEventRegister.getInstance = function () { };
    DomEventRegister.prototype.register = function (dom, eventName, eventData, handler, originHandler, domHandler, priority) {
        this.listenerMap.appendChild(dom, eventName, {
            dom: dom,
            eventName: eventName,
            eventData: eventData,
            handler: handler,
            originHandler: originHandler,
            domHandler: domHandler,
            priority: priority
        });
    };
    DomEventRegister.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = null;
        if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0];
            result = this.listenerMap.removeChild(eventName);
        }
        else if (args.length === 2 && JudgeUtils$1.isFunction(args[1])) {
            var eventName = args[0], handler = args[1];
            result = this.listenerMap.removeChild(eventName, handler);
        }
        else if ((args.length === 2 && JudgeUtils$1.isDom(args[0])) || args.length === 3) {
            result = this.listenerMap.removeChild.apply(this.listenerMap, args);
        }
        return result;
    };
    DomEventRegister.prototype.isBinded = function (dom, eventName) {
        return this.listenerMap.hasChild(dom, eventName);
    };
    DomEventRegister.prototype.getDomHandler = function (dom, eventName) {
        var list = this.getChild(dom, eventName);
        if (list && list.getCount() > 0) {
            return list.getChild(0).domHandler;
        }
    };
    return DomEventRegister;
}(EventRegister));
DomEventRegister = __decorate([
    singleton(),
    registerClass("DomEventRegister")
], DomEventRegister);

var EventUtils = (function () {
    function EventUtils() {
    }
    EventUtils.bindEvent = function (context, func) {
        return function (event) {
            return func.call(context, event);
        };
    };
    EventUtils.addEvent = function (dom, eventName, handler) {
        if (JudgeUtils.isHostMethod(dom, "addEventListener")) {
            dom.addEventListener(eventName, handler, false);
        }
        else if (JudgeUtils.isHostMethod(dom, "attachEvent")) {
            dom.attachEvent("on" + eventName, handler);
        }
        else {
            dom["on" + eventName] = handler;
        }
    };
    EventUtils.removeEvent = function (dom, eventName, handler) {
        if (JudgeUtils.isHostMethod(dom, "removeEventListener")) {
            dom.removeEventListener(eventName, handler, false);
        }
        else if (JudgeUtils.isHostMethod(dom, "detachEvent")) {
            dom.detachEvent("on" + eventName, handler);
        }
        else {
            dom["on" + eventName] = null;
        }
    };
    return EventUtils;
}());

var DomEventHandler = (function (_super) {
    __extends(DomEventHandler, _super);
    function DomEventHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DomEventHandler.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var self = this, eventName = null, dom = null, eventRegister = DomEventRegister.getInstance(), eventOffDataList = null;
        if (args.length === 1) {
            eventName = args[0];
            dom = this.getDefaultDom();
            eventOffDataList = eventRegister.remove(eventName);
        }
        else if (args.length === 2 && JudgeUtils$1.isDom(args[0])) {
            dom = args[0];
            eventName = args[1];
            eventOffDataList = eventRegister.remove(dom, eventName);
        }
        else if (args.length === 2) {
            var handler = args[1];
            eventName = args[0];
            dom = this.getDefaultDom();
            eventOffDataList = eventRegister.remove(eventName, handler);
        }
        else {
            var handler = args[2];
            dom = args[0];
            eventName = args[1];
            eventOffDataList = eventRegister.remove(dom, eventName, handler);
        }
        if (eventOffDataList && !eventRegister.isBinded(dom, eventName)) {
            eventOffDataList.forEach(function (eventOffData) {
                self._unBind(eventOffData.dom, eventOffData.eventName, eventOffData.domHandler);
            });
        }
    };
    DomEventHandler.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var dom = null, event = null, eventName = null, registerDataList = null;
        if (args.length === 1) {
            event = args[0];
            dom = this.getDefaultDom();
        }
        else {
            dom = args[0];
            event = args[1];
        }
        eventName = event.name;
        registerDataList = DomEventRegister.getInstance().getEventRegisterDataList(dom, eventName);
        if (registerDataList === null || registerDataList.getCount() === 0) {
            return;
        }
        registerDataList.forEach(function (registerData) {
            var eventCopy = event.clone();
            registerData.handler(eventCopy, registerData.eventData);
        });
    };
    DomEventHandler.prototype.clearHandler = function () {
    };
    DomEventHandler.prototype.buildDomHandler = function (dom, eventName) {
        var self = this, context = root$2;
        return EventUtils.bindEvent(context, function (event) {
            self.triggerDomEvent(dom, event, eventName);
        });
    };
    DomEventHandler.prototype.handler = function (dom, eventName, handler, priority) {
        var domHandler = null, originHandler = handler;
        handler = this.addEngineHandler(eventName, handler);
        if (!DomEventRegister.getInstance().isBinded(dom, eventName)) {
            domHandler = this._bind(dom, eventName);
        }
        else {
            domHandler = DomEventRegister.getInstance().getDomHandler(dom, eventName);
        }
        DomEventRegister.getInstance().register(dom, eventName, this.createEventData(), handler, originHandler, domHandler, priority);
    };
    DomEventHandler.prototype._bind = function (dom, eventName) {
        var domHandler = null;
        domHandler = this.buildDomHandler(dom, eventName);
        EventUtils.addEvent(dom, EventNameHandler.handleEventName(eventName), domHandler);
        return domHandler;
    };
    DomEventHandler.prototype._unBind = function (dom, eventName, handler) {
        EventUtils.removeEvent(dom, EventNameHandler.handleEventName(eventName), handler);
    };
    return DomEventHandler;
}(EventHandler));
__decorate([
    virtual
], DomEventHandler.prototype, "clearHandler", null);

var PointEventHandler = (function (_super) {
    __extends(PointEventHandler, _super);
    function PointEventHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointEventHandler.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var dom = null, eventName = null, handler = null, priority = null;
        if (args.length === 3) {
            dom = this.getDefaultDom();
            eventName = args[0];
            handler = args[1];
            priority = args[2];
        }
        else {
            dom = args[0];
            eventName = args[1];
            handler = args[2];
            priority = args[3];
        }
        this.handler(dom, eventName, handler, priority);
    };
    PointEventHandler.prototype.getDefaultDom = function () {
        return document.body;
    };
    PointEventHandler.prototype.triggerDomEvent = function (dom, event, eventName) {
        var eventObj = this.createEventObject(dom, event, eventName);
        EventManager.trigger(dom, eventObj);
    };
    PointEventHandler.prototype.createEventData = function () {
        var eventData = Hash.create();
        eventData.addChild("lastX", null);
        eventData.addChild("lastY", null);
        return eventData;
    };
    PointEventHandler.prototype.handleMove = function (handler) {
        var self = this;
        return function (event, eventData) {
            self._copyEventDataToEventObject(event, eventData);
            handler(event);
            self._saveLocation(event, eventData);
        };
    };
    PointEventHandler.prototype._copyEventDataToEventObject = function (event, eventData) {
        event.lastX = eventData.getChild("lastX");
        event.lastY = eventData.getChild("lastY");
    };
    PointEventHandler.prototype._saveLocation = function (event, eventData) {
        var location = event.location;
        eventData.setValue("lastX", location.x);
        eventData.setValue("lastY", location.y);
    };
    return PointEventHandler;
}(DomEventHandler));
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 4) {
            var dom_1 = args[0];
            it("first param should be HTMLElement", function () {
                index(JudgeUtils$1.isDom(dom_1)).true;
            });
        }
    })
], PointEventHandler.prototype, "on", null);

var Event = (function () {
    function Event(eventName) {
        this.name = null;
        this.currentTarget = null;
        this.isStopPropagation = false;
        this.phase = null;
        this.name = eventName;
    }
    Event.prototype.stopPropagation = function () {
        this.isStopPropagation = true;
    };
    Event.prototype.copyMember = function (destination, source, memberArr) {
        memberArr.forEach(function (member) {
            destination[member] = source[member];
        });
        return destination;
    };
    return Event;
}());

var DomEvent = (function (_super) {
    __extends(DomEvent, _super);
    function DomEvent(event, eventName) {
        var _this = _super.call(this, eventName) || this;
        _this._event = null;
        _this.event = event;
        return _this;
    }
    Object.defineProperty(DomEvent.prototype, "event", {
        get: function () {
            return this._event;
        },
        set: function (event) {
            this._event = event || root$2.event;
        },
        enumerable: true,
        configurable: true
    });
    DomEvent.prototype.preventDefault = function () {
        var e = this._event;
        if (bowser_3 && Number(bowser_1) <= 8) {
            e.returnValue = false;
        }
        else {
            e.preventDefault();
        }
    };
    DomEvent.prototype.getDataFromCustomEvent = function (event) {
        this.target = event.target;
        this.currentTarget = event.currentTarget;
        this.isStopPropagation = event.isStopPropagation;
    };
    return DomEvent;
}(Event));

var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        this.x = null;
        this.y = null;
        this.x = x;
        this.y = y;
    }
    Point.create = function (x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        var obj = new this(x, y);
        return obj;
    };
    return Point;
}());
Point = __decorate([
    registerClass("Point")
], Point);

var EMouseButton;
(function (EMouseButton) {
    EMouseButton[EMouseButton["LEFT"] = 0] = "LEFT";
    EMouseButton[EMouseButton["RIGHT"] = 1] = "RIGHT";
    EMouseButton[EMouseButton["CENTER"] = 2] = "CENTER";
})(EMouseButton || (EMouseButton = {}));

var MouseEvent = MouseEvent_1 = (function (_super) {
    __extends(MouseEvent, _super);
    function MouseEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._location = null;
        _this._locationInView = null;
        _this._button = null;
        _this.type = EEventType.MOUSE;
        _this.lastX = null;
        _this.lastY = null;
        return _this;
    }
    MouseEvent.create = function (event, eventName) {
        var obj = new this(event, eventName);
        return obj;
    };
    Object.defineProperty(MouseEvent.prototype, "location", {
        get: function () {
            var point = null, e = this.event;
            if (this._location) {
                return this._location;
            }
            point = Point.create();
            if (bowser_3) {
                point.x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                point.y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
            }
            else {
                point.x = e.pageX;
                point.y = e.pageY;
            }
            return point;
        },
        set: function (point) {
            this._location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "locationInView", {
        get: function () {
            var point = null, viewOffset = null;
            if (this._locationInView) {
                return this._locationInView;
            }
            point = this.location;
            viewOffset = DeviceManager.getInstance().view.offset;
            return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        },
        set: function (locationInView) {
            this._locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "button", {
        get: function () {
            var e = this.event, mouseButton = null;
            if (bowser_5) {
                return null;
            }
            if (this._button !== null) {
                return this._button;
            }
            if (bowser_3) {
                switch (e.button) {
                    case 1:
                        mouseButton = EMouseButton.LEFT;
                        break;
                    case 4:
                        mouseButton = EMouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = EMouseButton.CENTER;
                        break;
                    default:
                        Log$$1.error(true, Log$$1.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        break;
                }
            }
            else {
                switch (e.button) {
                    case 0:
                        mouseButton = EMouseButton.LEFT;
                        break;
                    case 1:
                        mouseButton = EMouseButton.RIGHT;
                        break;
                    case 2:
                        mouseButton = EMouseButton.CENTER;
                        break;
                    default:
                        Log$$1.error(true, Log$$1.info.FUNC_NOT_SUPPORT("multi mouse button"));
                        break;
                }
            }
            return mouseButton;
        },
        set: function (button) {
            this._button = button;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "wheel", {
        get: function () {
            var e = this.event;
            if (bowser_5) {
                return null;
            }
            if (e.detail) {
                return -1 * e.detail;
            }
            if (e.wheelDelta) {
                return e.wheelDelta / 120;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MouseEvent.prototype, "movementDelta", {
        get: function () {
            var e = this.event, dx = null, dy = null;
            if (this._isPointerLocked()) {
                dx = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
                dy = e.movementY || e.webkitMovementY || e.mozMovementY || 0;
            }
            else {
                var location = this.location, lastX = this.lastX, lastY = this.lastY;
                if (lastX === null && lastY === null) {
                    dx = 0;
                    dy = 0;
                }
                else {
                    dx = location.x - lastX;
                    dy = location.y - lastY;
                }
            }
            return {
                x: dx,
                y: dy
            };
        },
        enumerable: true,
        configurable: true
    });
    MouseEvent.prototype.clone = function () {
        var eventObj = MouseEvent_1.create(this.event, this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    };
    MouseEvent.prototype._isPointerLocked = function () {
        return !!(document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement);
    };
    return MouseEvent;
}(DomEvent));
MouseEvent = MouseEvent_1 = __decorate([
    registerClass("MouseEvent")
], MouseEvent);
var MouseEvent_1;

var MouseEventHandler = (function (_super) {
    __extends(MouseEventHandler, _super);
    function MouseEventHandler() {
        return _super.call(this) || this;
    }
    MouseEventHandler.getInstance = function () { };
    MouseEventHandler.prototype.addEngineHandler = function (eventName, handler) {
        var resultHandler = null;
        switch (eventName) {
            case EEventName.MOUSEMOVE:
                resultHandler = this.handleMove(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }
        return resultHandler;
    };
    MouseEventHandler.prototype.createEventObject = function (dom, event, eventName) {
        var obj = MouseEvent.create(event ? event : root$2.event, eventName);
        obj.target = dom;
        return obj;
    };
    return MouseEventHandler;
}(PointEventHandler));
MouseEventHandler = __decorate([
    singleton(),
    registerClass("MouseEventHandler")
], MouseEventHandler);

var TouchEvent = TouchEvent_1 = (function (_super) {
    __extends(TouchEvent, _super);
    function TouchEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._location = null;
        _this._locationInView = null;
        _this.type = EEventType.TOUCH;
        _this.lastX = null;
        _this.lastY = null;
        return _this;
    }
    TouchEvent.create = function (event, eventName) {
        var obj = new this(event, eventName);
        return obj;
    };
    Object.defineProperty(TouchEvent.prototype, "location", {
        get: function () {
            var point = null;
            if (this._location) {
                return this._location;
            }
            var touchData = this.touchData;
            point = Point.create();
            point.x = touchData.pageX;
            point.y = touchData.pageY;
            return point;
        },
        set: function (point) {
            this._location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "touchData", {
        get: function () {
            var touches = this.event.changedTouches;
            return touches[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "locationInView", {
        get: function () {
            var point = null, viewOffset = null;
            if (this._locationInView) {
                return this._locationInView;
            }
            point = this.location;
            viewOffset = DeviceManager.getInstance().view.offset;
            return Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
        },
        set: function (locationInView) {
            this._locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchEvent.prototype, "movementDelta", {
        get: function () {
            var dx = null, dy = null, location = this.location, lastX = this.lastX, lastY = this.lastY;
            if (lastX === null && lastY === null) {
                dx = 0;
                dy = 0;
            }
            else {
                dx = location.x - lastX;
                dy = location.y - lastY;
            }
            return {
                x: dx,
                y: dy
            };
        },
        enumerable: true,
        configurable: true
    });
    TouchEvent.prototype.clone = function () {
        var eventObj = TouchEvent_1.create(this.event, this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    };
    return TouchEvent;
}(DomEvent));
__decorate([
    ensureGetter(function (touchData) {
        it("should exist touch data", function () {
            index(touchData).exist;
        }, this);
    })
], TouchEvent.prototype, "touchData", null);
TouchEvent = TouchEvent_1 = __decorate([
    registerClass("TouchEvent")
], TouchEvent);
var TouchEvent_1;

var TouchEventHandler = (function (_super) {
    __extends(TouchEventHandler, _super);
    function TouchEventHandler() {
        return _super.call(this) || this;
    }
    TouchEventHandler.getInstance = function () { };
    TouchEventHandler.prototype.addEngineHandler = function (eventName, handler) {
        var resultHandler = null;
        switch (eventName) {
            case EEventName.TOUCHMOVE:
                resultHandler = this.handleMove(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }
        return resultHandler;
    };
    TouchEventHandler.prototype.createEventObject = function (dom, event, eventName) {
        var obj = TouchEvent.create(event ? event : root$2.event, eventName);
        obj.target = dom;
        return obj;
    };
    return TouchEventHandler;
}(PointEventHandler));
TouchEventHandler = __decorate([
    singleton(),
    registerClass("TouchEventHandler")
], TouchEventHandler);

var SPECIAL_KEY_MAP = {
    8: "backspace",
    9: "tab",
    10: "return",
    13: "return",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "del",
    59: ";",
    61: "=",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scroll",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
};
var SHIFT_KEY_MAP = {
    "`": "~",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")",
    "-": "_",
    "=": "+",
    ";": ": ",
    "'": "\"",
    ",": "<",
    ".": ">",
    "/": "?",
    "\\": "|"
};
var KeyboardEvent = KeyboardEvent_1 = (function (_super) {
    __extends(KeyboardEvent, _super);
    function KeyboardEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = EEventType.KEYBOARD;
        _this.keyState = null;
        return _this;
    }
    KeyboardEvent.create = function (event, eventName) {
        var obj = new this(event, eventName);
        return obj;
    };
    Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
        get: function () {
            return this.event.ctrlKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "altKey", {
        get: function () {
            return this.event.altKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
        get: function () {
            return this.event.shiftKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "metaKey", {
        get: function () {
            return this.event.metaKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
        get: function () {
            return this.event.keyCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "key", {
        get: function () {
            var key = SPECIAL_KEY_MAP[this.keyCode], char = null;
            if (!key) {
                char = String.fromCharCode(this.keyCode).toLowerCase();
                if (this.shiftKey) {
                    return SHIFT_KEY_MAP[char];
                }
                return char;
            }
            return key;
        },
        enumerable: true,
        configurable: true
    });
    KeyboardEvent.prototype.clone = function () {
        var eventObj = KeyboardEvent_1.create(this.event, this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
    };
    return KeyboardEvent;
}(DomEvent));
KeyboardEvent = KeyboardEvent_1 = __decorate([
    registerClass("KeyboardEvent")
], KeyboardEvent);
var KeyboardEvent_1;

var KeyboardEventHandler = (function (_super) {
    __extends(KeyboardEventHandler, _super);
    function KeyboardEventHandler() {
        return _super.call(this) || this;
    }
    KeyboardEventHandler.getInstance = function () { };
    KeyboardEventHandler.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventName = null, handler = null, priority = null;
        if (args.length === 3) {
            eventName = args[0];
            handler = args[1];
            priority = args[2];
        }
        else {
            Log$$1.warn("keyboard event can only bind on document.body");
            eventName = args[1];
            handler = args[2];
            priority = args[3];
        }
        this.handler(this.getDefaultDom(), eventName, handler, priority);
    };
    KeyboardEventHandler.prototype.triggerDomEvent = function (dom, event, eventName) {
        var eventObj = this._createEventObject(dom, event, eventName);
        EventManager.trigger(dom, eventObj);
    };
    KeyboardEventHandler.prototype.getDefaultDom = function () {
        return document.body;
    };
    KeyboardEventHandler.prototype.addEngineHandler = function (eventName, handler) {
        var resultHandler = null;
        switch (eventName) {
            case EEventName.KEYDOWN:
                resultHandler = this._handleKeyDown(handler);
                break;
            case EEventName.KEYUP:
                resultHandler = this._handleKeyUp(handler);
                break;
            default:
                resultHandler = handler;
                break;
        }
        return resultHandler;
    };
    KeyboardEventHandler.prototype.createEventData = function () {
        var eventData = Hash.create();
        eventData.addChild("keyState", {});
        return eventData;
    };
    KeyboardEventHandler.prototype._handleKeyDown = function (handler) {
        var self = this;
        return function (event, eventData) {
            var keyState = eventData.getChild("keyState");
            self._setKeyStateAllFalse(keyState);
            keyState[event.key] = true;
            self._copyEventDataToEventObject(event, eventData);
            handler(event);
        };
    };
    KeyboardEventHandler.prototype._handleKeyUp = function (handler) {
        var self = this;
        return function (event, eventData) {
            self._setKeyStateAllFalse(eventData.getChild("keyState"));
            self._copyEventDataToEventObject(event, eventData);
            handler(event);
        };
    };
    KeyboardEventHandler.prototype._copyEventDataToEventObject = function (event, eventData) {
        event.keyState = eventData.getChild("keyState");
    };
    KeyboardEventHandler.prototype._setKeyStateAllFalse = function (keyState) {
        for (var i in keyState) {
            if (keyState.hasOwnProperty(i)) {
                keyState[i] = false;
            }
        }
    };
    KeyboardEventHandler.prototype._createEventObject = function (dom, event, eventName) {
        var obj = KeyboardEvent.create(event ? event : root$2.event, eventName);
        obj.target = dom;
        return obj;
    };
    return KeyboardEventHandler;
}(DomEventHandler));
KeyboardEventHandler = __decorate([
    singleton(),
    registerClass("KeyboardEventHandler")
], KeyboardEventHandler);

var CustomEventListenerMap = (function (_super) {
    __extends(CustomEventListenerMap, _super);
    function CustomEventListenerMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._globalListenerMap = Hash.create();
        _this._targetRecordMap = Hash.create();
        return _this;
    }
    CustomEventListenerMap.create = function () {
        var obj = new this();
        return obj;
    };
    CustomEventListenerMap.prototype.hasChild = function (target) {
        return target.customEventMap.getCount() > 0;
    };
    CustomEventListenerMap.prototype.appendChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            var eventName = args[0], data = args[1];
            this._globalListenerMap.appendChild(eventName, data);
        }
        else {
            var target = args[0], eventName = args[1], data = args[2];
            this._targetRecordMap.addChild(this.buildFirstLevelKey(target), target);
            target.customEventMap.appendChild(this.buildSecondLevelKey(eventName), data);
        }
    };
    CustomEventListenerMap.prototype.forEachAll = function (func) {
        this._globalListenerMap.forEach(func);
        this._targetRecordMap.forEach(function (target) {
            target.customEventMap.forEach(func);
        });
    };
    CustomEventListenerMap.prototype.forEachEventName = function (func) {
        this._globalListenerMap.forEach(func);
    };
    CustomEventListenerMap.prototype.clear = function () {
        this._globalListenerMap.removeAllChildren();
        this._targetRecordMap.forEach(function (target) {
            target.customEventMap.removeAllChildren();
        });
        this._targetRecordMap.removeAllChildren();
    };
    CustomEventListenerMap.prototype.getChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0];
            return this._globalListenerMap.getChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            var target = args[0];
            return target.customEventMap;
        }
        else if (args.length === 2) {
            var target = args[0], eventName = args[1], secondMap = null;
            secondMap = target.customEventMap;
            if (!secondMap) {
                return null;
            }
            return secondMap.getChild(this.buildSecondLevelKey(eventName));
        }
    };
    CustomEventListenerMap.prototype.removeChild = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0];
            this._globalListenerMap.removeChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            var target = args[0];
            target.customEventMap.removeAllChildren();
            this._targetRecordMap.removeChild(this.buildFirstLevelKey(target));
        }
        else if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler_1 = args[1], list = null;
            list = this._globalListenerMap.getChild(eventName);
            if (!!list) {
                list.removeChild(function (val) {
                    return val.originHandler === handler_1;
                });
                if (list.getCount() === 0) {
                    this._globalListenerMap.removeChild(eventName);
                }
            }
        }
        else if (args.length === 2 && JudgeUtils$1.isNumber(args[0])) {
            var uid = args[0], eventName = args[1], secondMap = null;
            secondMap = (this._targetRecordMap.getChild(this.buildFirstLevelKey(uid)));
            if (!!secondMap) {
                secondMap.removeChild(this.buildSecondLevelKey(eventName));
            }
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], secondMap = null;
            secondMap = target.customEventMap;
            if (!!secondMap) {
                secondMap.removeChild(this.buildSecondLevelKey(eventName));
            }
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler_2 = args[2], secondMap = null;
            secondMap = target.customEventMap;
            if (!!secondMap) {
                var secondList = secondMap.getChild(eventName);
                if (!!secondList) {
                    secondList.removeChild(function (val) {
                        return val.originHandler === handler_2;
                    });
                    if (secondList.getCount() === 0) {
                        secondMap.removeChild(eventName);
                    }
                }
            }
        }
    };
    CustomEventListenerMap.prototype.buildFirstLevelKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var v = args[0], uid = v.uid;
        if (uid) {
            return String(uid);
        }
        return v;
    };
    return CustomEventListenerMap;
}(EventListenerMap));
CustomEventListenerMap = __decorate([
    registerClass("CustomEventListenerMap")
], CustomEventListenerMap);

var CustomEventRegister = (function (_super) {
    __extends(CustomEventRegister, _super);
    function CustomEventRegister() {
        var _this = _super.call(this) || this;
        _this.listenerMap = CustomEventListenerMap.create();
        return _this;
    }
    CustomEventRegister.getInstance = function () { };
    CustomEventRegister.prototype.register = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 5) {
            var eventName = args[0], handler = args[1], originHandler = args[2], domHandler = args[3], priority = args[4];
            this.listenerMap.appendChild(eventName, {
                target: null,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }
        else {
            var target = args[0], eventName = args[1], handler = args[2], originHandler = args[3], domHandler = args[4], priority = args[5];
            this.listenerMap.appendChild(target, eventName, {
                target: target,
                eventName: eventName,
                handler: handler,
                originHandler: originHandler,
                domHandler: domHandler,
                priority: priority
            });
        }
    };
    CustomEventRegister.prototype.remove = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = args[0];
        if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0];
            this.listenerMap.removeChild(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            this.listenerMap.removeChild(target);
            this._handleAfterAllEventHandlerRemoved(target);
        }
        else if (args.length === 2 && JudgeUtils$1.isFunction(args[1])) {
            var eventName = args[0], handler = args[1];
            this.listenerMap.removeChild(eventName, handler);
        }
        else if (args.length === 2 && JudgeUtils$1.isNumber(args[0])) {
            var uid = args[0], eventName = args[1];
            this.listenerMap.removeChild(uid, eventName);
        }
        else if ((args.length === 2 && args[0] instanceof EntityObject) || args.length === 3) {
            this.listenerMap.removeChild.apply(this.listenerMap, args);
            if (this._isAllEventHandlerRemoved(target)) {
                this._handleAfterAllEventHandlerRemoved(target);
            }
        }
    };
    CustomEventRegister.prototype.setBubbleParent = function (target, parent) {
        target.bubbleParent = parent;
    };
    CustomEventRegister.prototype._isAllEventHandlerRemoved = function (target) {
        return !this.listenerMap.hasChild(target);
    };
    CustomEventRegister.prototype._handleAfterAllEventHandlerRemoved = function (target) {
        this.setBubbleParent(target, null);
    };
    return CustomEventRegister;
}(EventRegister));
CustomEventRegister = __decorate([
    singleton(),
    registerClass("CustomEventRegister")
], CustomEventRegister);

var CustomEventHandler = (function (_super) {
    __extends(CustomEventHandler, _super);
    function CustomEventHandler() {
        return _super.call(this) || this;
    }
    CustomEventHandler.getInstance = function () { };
    CustomEventHandler.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 3) {
            var eventName = args[0], handler = args[1], originHandler = handler, priority = args[2];
            CustomEventRegister.getInstance().register(eventName, handler, originHandler, null, priority);
        }
        else if (args.length === 4) {
            var target = args[0], eventName = args[1], handler = args[2], originHandler = handler, priority = args[3];
            CustomEventRegister.getInstance().register(target, eventName, handler, originHandler, null, priority);
        }
    };
    CustomEventHandler.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventRegister = CustomEventRegister.getInstance();
        eventRegister.remove.apply(eventRegister, args);
    };
    CustomEventHandler.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var event = null;
        if (args.length === 1 || args.length === 2) {
            var userData = null;
            if (args.length === 1) {
                event = args[0];
            }
            else {
                event = args[0];
                userData = args[1];
            }
            return this._triggerEventHandler(event, userData);
        }
        else if (args.length === 3 || args.length === 4) {
            var target = null, userData = null, notSetTarget = null;
            if (args.length === 3) {
                target = args[0];
                event = args[1];
                notSetTarget = args[2];
            }
            else {
                target = args[0];
                event = args[1];
                userData = args[2];
                notSetTarget = args[3];
            }
            return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
        }
    };
    CustomEventHandler.prototype._triggerEventHandler = function (event, userData) {
        var registerDataList = null, self = this;
        registerDataList = CustomEventRegister.getInstance().getEventRegisterDataList(event.name);
        if (registerDataList === null || registerDataList.getCount() === 0) {
            return false;
        }
        registerDataList.forEach(function (registerData) {
            event.currentTarget = registerData.target;
            event.target = registerData.target;
            self._setUserData(event, userData);
            registerData.handler(event);
        });
        return true;
    };
    CustomEventHandler.prototype._triggerTargetAndEventHandler = function (target, event, userData, notSetTarget) {
        var registerDataList = null, isStopPropagation = false, self = this;
        if (!notSetTarget) {
            event.target = target;
        }
        registerDataList = CustomEventRegister.getInstance().getEventRegisterDataList(target, event.name);
        if (registerDataList === null || registerDataList.getCount() === 0) {
            return false;
        }
        registerDataList.forEach(function (registerData) {
            event.currentTarget = registerData.target;
            self._setUserData(event, userData);
            registerData.handler(event);
            if (event.isStopPropagation) {
                isStopPropagation = true;
            }
        });
        return isStopPropagation;
    };
    CustomEventHandler.prototype._setUserData = function (event, userData) {
        if (userData) {
            event.userData = userData;
        }
    };
    return CustomEventHandler;
}(EventHandler));
CustomEventHandler = __decorate([
    singleton(),
    registerClass("CustomEventHandler")
], CustomEventHandler);

var EventHandlerFactory = (function () {
    function EventHandlerFactory() {
    }
    EventHandlerFactory.createEventHandler = function (eventType) {
        var handler = null;
        switch (eventType) {
            case EEventType.MOUSE:
                handler = MouseEventHandler.getInstance();
                break;
            case EEventType.TOUCH:
                handler = TouchEventHandler.getInstance();
                break;
            case EEventType.KEYBOARD:
                handler = KeyboardEventHandler.getInstance();
                break;
            case EEventType.CUSTOM:
            case EEventType.POINT:
                handler = CustomEventHandler.getInstance();
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_INVALID("eventType"));
                break;
        }
        return handler;
    };
    return EventHandlerFactory;
}());
EventHandlerFactory = __decorate([
    registerClass("EventHandlerFactory")
], EventHandlerFactory);

var DomEventBinder = (function (_super) {
    __extends(DomEventBinder, _super);
    function DomEventBinder() {
        return _super.call(this) || this;
    }
    DomEventBinder.getInstance = function () { };
    DomEventBinder.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(dom, eventName, handler);
        }
        else if (args.length === 4) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = args[3];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(dom, eventName, handler, priority);
        }
    };
    DomEventBinder.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventRegister = DomEventRegister.getInstance();
        if (args.length === 0) {
            eventRegister.forEachAll(function (list, eventName) {
                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName);
            });
            eventRegister.clear();
        }
        else if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName_1 = args[0];
            eventRegister.forEachEventName(function (list, registeredEventName) {
                if (registeredEventName === eventName_1) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName_1))
                        .off(eventName_1);
                }
            });
        }
        else if (args.length === 1 && JudgeUtils$1.isDom(args[0])) {
            var dom_1 = args[0], secondMap = null;
            secondMap = eventRegister.getChild(dom_1);
            if (!!secondMap) {
                secondMap.forEach(function (list, eventName) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                        .off(dom_1, eventName);
                });
            }
        }
        else if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(eventName, handler);
        }
        else if (args.length === 2 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(dom, eventName);
        }
        else if (args.length === 3) {
            var dom = args[0], eventName = args[1], handler = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(dom, eventName, handler);
        }
    };
    return DomEventBinder;
}(EventBinder));
DomEventBinder = __decorate([
    singleton(),
    registerClass("DomEventBinder")
], DomEventBinder);

var CustomEventBinder = (function (_super) {
    __extends(CustomEventBinder, _super);
    function CustomEventBinder() {
        return _super.call(this) || this;
    }
    CustomEventBinder.getInstance = function () { };
    CustomEventBinder.prototype.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2) {
            var eventName = args[0], handler = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(eventName, handler, priority);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(target, eventName, handler);
        }
        else if (args.length === 4) {
            var target = args[0], eventName = args[1], handler = args[2], priority = args[3];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .on(target, eventName, handler, priority);
        }
    };
    CustomEventBinder.prototype.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventRegister = CustomEventRegister.getInstance();
        if (args.length === 0) {
            eventRegister.forEachAll(function (list, eventName) {
                EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                    .off(eventName);
            });
            eventRegister.clear();
        }
        else if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName_1 = args[0];
            eventRegister.forEachEventName(function (list, registeredEventName) {
                if (registeredEventName === eventName_1) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName_1))
                        .off(eventName_1);
                }
            });
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            var target_1 = args[0], secondMap = null;
            secondMap = eventRegister.getChild(target_1);
            if (!!secondMap) {
                secondMap.forEach(function (list, eventName) {
                    EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                        .off(target_1, eventName);
                });
            }
        }
        else if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(eventName, handler);
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(target, eventName);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2];
            EventHandlerFactory.createEventHandler(EventTable.getEventType(eventName))
                .off(target, eventName, handler);
        }
    };
    return CustomEventBinder;
}(EventBinder));
CustomEventBinder = __decorate([
    singleton(),
    registerClass("CustomEventBinder")
], CustomEventBinder);

var EventBinderFactory = (function () {
    function EventBinderFactory() {
    }
    EventBinderFactory.createEventBinder = function (eventName) {
        var binder = null, eventType = EventTable.getEventType(eventName);
        switch (eventType) {
            case EEventType.MOUSE:
            case EEventType.TOUCH:
            case EEventType.KEYBOARD:
                binder = DomEventBinder.getInstance();
                break;
            case EEventType.CUSTOM:
            case EEventType.POINT:
                binder = CustomEventBinder.getInstance();
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_INVALID("eventName:" + eventName));
                break;
        }
        return binder;
    };
    return EventBinderFactory;
}());
EventBinderFactory = __decorate([
    registerClass("EventBinderFactory")
], EventBinderFactory);

var CustomEvent = CustomEvent_1 = (function (_super) {
    __extends(CustomEvent, _super);
    function CustomEvent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.call(this, args[0]) || this;
        _this.type = EEventType.CUSTOM;
        _this.userData = null;
        if (args.length === 2) {
            var userData = args[1];
            _this.userData = userData;
        }
        return _this;
    }
    CustomEvent.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var obj = null;
        if (args.length === 1) {
            obj = new this(args[0]);
        }
        else {
            obj = new this(args[0], args[1]);
        }
        return obj;
    };
    CustomEvent.prototype.copyPublicAttri = function (destination, source) {
        var property = null;
        ExtendUtils.extend(destination, function (item, property) {
            return property.slice(0, 1) !== "_"
                && !JudgeUtils$1.isFunction(item);
        });
        return destination;
    };
    CustomEvent.prototype.clone = function () {
        var eventObj = CustomEvent_1.create(this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
    };
    CustomEvent.prototype.getDataFromDomEvent = function (event) {
        this.target = event.target;
        this.currentTarget = event.currentTarget;
        this.isStopPropagation = event.isStopPropagation;
    };
    return CustomEvent;
}(Event));
CustomEvent = CustomEvent_1 = __decorate([
    registerClass("CustomEvent")
], CustomEvent);
var CustomEvent_1;

var EventDispatcher = (function () {
    function EventDispatcher() {
    }
    return EventDispatcher;
}());

var DomEventDispatcher = (function (_super) {
    __extends(DomEventDispatcher, _super);
    function DomEventDispatcher() {
        return _super.call(this) || this;
    }
    DomEventDispatcher.getInstance = function () { };
    DomEventDispatcher.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 1) {
            var event = args[0], eventType = event.type;
            EventHandlerFactory.createEventHandler(eventType)
                .trigger(event);
        }
        else if (args.length === 2) {
            var dom = args[0], event = args[1], eventType = event.type;
            EventHandlerFactory.createEventHandler(eventType)
                .trigger(dom, event);
        }
    };
    return DomEventDispatcher;
}(EventDispatcher));
DomEventDispatcher = __decorate([
    singleton(),
    registerClass("DomEventDispatcher")
], DomEventDispatcher);

var EventUtils$1 = (function () {
    function EventUtils() {
    }
    EventUtils.isEvent = function (arg) {
        return arg && arg.currentTarget !== void 0;
    };
    EventUtils.isEntityObject = function (arg) {
        return arg && arg.bubbleParent !== void 0;
    };
    return EventUtils;
}());
__decorate([
    ensure(function (isEntityObject, arg) {
        if (isEntityObject) {
            assert(arg instanceof EntityObject, Log$$1.info.FUNC_MUST_BE("EntityObject, but actual is " + arg));
        }
    })
], EventUtils$1, "isEntityObject", null);
EventUtils$1 = __decorate([
    registerClass("EventUtils")
], EventUtils$1);

var EEventPhase;
(function (EEventPhase) {
    EEventPhase[EEventPhase["BROADCAST"] = 0] = "BROADCAST";
    EEventPhase[EEventPhase["EMIT"] = 1] = "EMIT";
})(EEventPhase || (EEventPhase = {}));

var CustomEventDispatcher = (function (_super) {
    __extends(CustomEventDispatcher, _super);
    function CustomEventDispatcher() {
        return _super.call(this) || this;
    }
    CustomEventDispatcher.getInstance = function () { };
    CustomEventDispatcher.prototype.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
        if (length === 1) {
            var event = args[0], eventType = event.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(event);
        }
        else if (length === 2 && EventUtils$1.isEvent(args[0])) {
            var event = args[0], userData = args[1], eventType = event.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(event, userData);
        }
        else if ((length === 2 && EventUtils$1.isEntityObject(args[0])) || (length === 3 && JudgeUtils$1.isBoolean(args[2]))) {
            var target = args[0], event = args[1], notSetTarget = args[2] === void 0 ? false : args[2], eventType = event.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(target, event, notSetTarget);
        }
        else if (length === 3 || length === 4) {
            var target = args[0], event = args[1], userData = args[2], notSetTarget = args[3] === void 0 ? false : args[3], eventType = event.type;
            return EventHandlerFactory.createEventHandler(eventType)
                .trigger(target, event, userData, notSetTarget);
        }
    };
    CustomEventDispatcher.prototype.emit = function (target, eventObject, userData) {
        var isStopPropagation = false;
        if (!target) {
            return;
        }
        eventObject.phase = EEventPhase.EMIT;
        eventObject.target = target;
        do {
            isStopPropagation = this._triggerWithUserData(target, eventObject, userData, true);
            if (isStopPropagation) {
                break;
            }
            target = target.bubbleParent;
        } while (target);
    };
    CustomEventDispatcher.prototype.broadcast = function (target, eventObject, userData) {
        var self = this;
        var iterator = function (obj) {
            var children = obj.getChildren();
            if (children.getCount() === 0) {
                return;
            }
            children.forEach(function (child) {
                self._triggerWithUserData(child, eventObject, userData, true);
                iterator(child);
            });
        };
        if (!target) {
            return;
        }
        eventObject.phase = EEventPhase.BROADCAST;
        eventObject.target = target;
        this._triggerWithUserData(target, eventObject, userData, true);
        iterator(target);
    };
    CustomEventDispatcher.prototype._triggerWithUserData = function (target, event, userData, notSetTarget) {
        return userData ? this.trigger(target, event, userData, notSetTarget)
            : this.trigger(target, event, notSetTarget);
    };
    return CustomEventDispatcher;
}(EventDispatcher));
CustomEventDispatcher = __decorate([
    singleton(),
    registerClass("CustomEventDispatcher")
], CustomEventDispatcher);

var EventDispatcherFactory = (function () {
    function EventDispatcherFactory() {
    }
    EventDispatcherFactory.createEventDispatcher = function (event) {
        var dispatcher = null, eventType = event.type;
        switch (eventType) {
            case EEventType.MOUSE:
            case EEventType.TOUCH:
            case EEventType.KEYBOARD:
                dispatcher = DomEventDispatcher.getInstance();
                break;
            case EEventType.CUSTOM:
            case EEventType.POINT:
                dispatcher = CustomEventDispatcher.getInstance();
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_INVALID("event:" + event));
                break;
        }
        return dispatcher;
    };
    return EventDispatcherFactory;
}());
EventDispatcherFactory = __decorate([
    registerClass("EventDispatcherFactory")
], EventDispatcherFactory);

var EventManager = EventManager_1 = (function () {
    function EventManager() {
    }
    EventManager.on = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = 1, eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.on(eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1], priority = args[2], eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.on(eventName, handler, priority);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], priority = 1, eventBinder = CustomEventBinder.getInstance();
            eventBinder.on(target, eventName, handler, priority);
        }
        else if (args.length === 3 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = 1, eventBinder = DomEventBinder.getInstance();
            eventBinder.on(dom, eventName, handler, priority);
        }
        else if (args.length === 4 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], priority = args[3], eventBinder = CustomEventBinder.getInstance();
            eventBinder.on(target, eventName, handler, priority);
        }
        else if (args.length === 4 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], priority = args[3], eventBinder = DomEventBinder.getInstance();
            eventBinder.on(dom, eventName, handler, priority);
        }
    };
    EventManager.off = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 0) {
            var customEventBinder = CustomEventBinder.getInstance(), domEventBinder = DomEventBinder.getInstance();
            customEventBinder.off();
            domEventBinder.off();
        }
        else if (args.length === 1 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.off(eventName);
        }
        else if (args.length === 1 && args[0] instanceof EntityObject) {
            var target = args[0], eventBinder = CustomEventBinder.getInstance();
            eventBinder.off(target);
        }
        else if (args.length === 1 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventBinder = DomEventBinder.getInstance();
            eventBinder.off(dom);
        }
        else if (args.length === 2 && JudgeUtils$1.isString(args[0])) {
            var eventName = args[0], handler = args[1], eventBinder = EventBinderFactory.createEventBinder(eventName);
            eventBinder.off(eventName, handler);
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], eventBinder = CustomEventBinder.getInstance();
            eventBinder.off(target, eventName);
        }
        else if (args.length === 2 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], eventBinder = DomEventBinder.getInstance();
            eventBinder.off(dom, eventName);
        }
        else if (args.length === 3 && args[0] instanceof EntityObject) {
            var target = args[0], eventName = args[1], handler = args[2], eventBinder = CustomEventBinder.getInstance();
            eventBinder.off(target, eventName, handler);
        }
        else if (args.length === 3 && JudgeUtils$1.isDom(args[0])) {
            var dom = args[0], eventName = args[1], handler = args[2], eventBinder = DomEventBinder.getInstance();
            eventBinder.off(dom, eventName, handler);
        }
    };
    EventManager.trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var length = args.length;
        if (length === 1) {
            var event = args[0], eventDispatcher = EventDispatcherFactory.createEventDispatcher(event);
            eventDispatcher.trigger(event);
        }
        else if (length === 2 && EventUtils$1.isEvent(args[0])) {
            var event = args[0], userData = args[1], eventDispatcher = CustomEventDispatcher.getInstance();
            eventDispatcher.trigger(event, userData);
        }
        else if (length === 2 && EventUtils$1.isEntityObject(args[0])) {
            var target = args[0], event = args[1], eventDispatcher = CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event);
        }
        else if (length === 2) {
            var dom = args[0], event = args[1], eventDispatcher = DomEventDispatcher.getInstance();
            if (!dom) {
                return;
            }
            eventDispatcher.trigger(dom, event);
        }
        else if (length === 3) {
            var target = args[0], event = args[1], userData = args[2], eventDispatcher = CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event, userData);
        }
        else if (length === 4) {
            var target = args[0], event = args[1], userData = args[2], notSetTarget = args[3], eventDispatcher = CustomEventDispatcher.getInstance();
            if (!target) {
                return;
            }
            eventDispatcher.trigger(target, event, userData, notSetTarget);
        }
    };
    EventManager.broadcast = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventDispatcher = CustomEventDispatcher.getInstance();
        eventDispatcher.broadcast.apply(eventDispatcher, args);
    };
    EventManager.emit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eventDispatcher = CustomEventDispatcher.getInstance();
        eventDispatcher.emit.apply(eventDispatcher, args);
    };
    EventManager.fromEvent = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var addHandler = null, removeHandler = null;
        if (args.length === 1) {
            var eventName_1 = args[0];
            addHandler = function (handler) {
                EventManager_1.on(eventName_1, handler);
            };
            removeHandler = function (handler) {
                EventManager_1.off(eventName_1, handler);
            };
        }
        else if (args.length === 2 && JudgeUtils$1.isNumber(args[1])) {
            var eventName_2 = args[0], priority_1 = args[1];
            addHandler = function (handler) {
                EventManager_1.on(eventName_2, handler, priority_1);
            };
            removeHandler = function (handler) {
                EventManager_1.off(eventName_2, handler);
            };
        }
        else if (args.length === 2) {
            var eventName_3 = args[1];
            addHandler = function (handler) {
                EventManager_1.on(args[0], eventName_3, handler);
            };
            removeHandler = function (handler) {
                EventManager_1.off(args[0], eventName_3, handler);
            };
        }
        else if (args.length === 3) {
            var eventName_4 = args[1], priority_2 = args[2];
            addHandler = function (handler) {
                EventManager_1.on(args[0], eventName_4, handler, priority_2);
            };
            removeHandler = function (handler) {
                EventManager_1.off(args[0], eventName_4, handler);
            };
        }
        return fromEventPattern(addHandler, removeHandler);
    };
    EventManager.setBubbleParent = function (target, parent) {
        CustomEventRegister.getInstance().setBubbleParent(target, parent);
    };
    return EventManager;
}());
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof EntityObject) {
            var eventName_5 = args[1];
            it("event must be custom event", function () {
                var eventType = EventTable.getEventType(eventName_5);
                index(eventType === EEventType.CUSTOM || eventType === EEventType.POINT).true;
            });
        }
        else if (JudgeUtils$1.isDom(args[0])) {
            var eventName = args[1], eventType_1 = EventTable.getEventType(eventName);
            it("event must be dom event", function () {
                index(eventType_1 === EEventType.TOUCH || eventType_1 === EEventType.MOUSE || eventType_1 === EEventType.KEYBOARD).true;
            });
        }
    })
], EventManager, "on", null);
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length > 2 && args[0] instanceof EntityObject) {
            var eventName = args[1], eventType_2 = EventTable.getEventType(eventName);
            it("event must be custom or point event", function () {
                index(eventType_2 === EEventType.CUSTOM || eventType_2 === EEventType.POINT).true;
            });
        }
        else if (args.length > 2 && JudgeUtils$1.isDom(args[0])) {
            var eventName = args[1], eventType_3 = EventTable.getEventType(eventName);
            it("event must be keyboard event", function () {
                index(eventType_3 === EEventType.KEYBOARD).true;
            });
        }
    })
], EventManager, "off", null);
__decorate([
    requireCheck(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 2 && args[0] instanceof Event) {
            var event = args[0];
            assert(event instanceof CustomEvent, Log$$1.info.FUNC_MUST_BE("event type", "CUSTOM"));
        }
        else if (args.length === 2 && args[0] instanceof EntityObject) {
        }
        else if (args.length === 2) {
            if (args[0]) {
                assert(JudgeUtils$1.isDom(args[0]), Log$$1.info.FUNC_MUST_BE("the first param", "dom"));
            }
        }
        else if (args[0] instanceof EntityObject) {
            var event = args[1];
            assert(event instanceof CustomEvent, Log$$1.info.FUNC_MUST_BE("event type", "CUSTOM"));
        }
    })
], EventManager, "trigger", null);
__decorate([
    requireCheck(function (target, eventObject, userData) {
        assert(eventObject instanceof CustomEvent, Log$$1.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
    })
], EventManager, "broadcast", null);
__decorate([
    requireCheck(function (target, eventObject, userData) {
        assert(eventObject instanceof CustomEvent, Log$$1.info.FUNC_MUST_BE("eventObject", "CustomEvent"));
    })
], EventManager, "emit", null);
__decorate([
    requireCheck(function (target, parent) {
        assert(target instanceof EntityObject, "only EntityObject can setBubleParent");
    })
], EventManager, "setBubbleParent", null);
EventManager = EventManager_1 = __decorate([
    registerClass("EventManager")
], EventManager);
var EventManager_1;

var CameraController = (function (_super) {
    __extends(CameraController, _super);
    function CameraController(cameraComponent) {
        var _this = _super.call(this) || this;
        _this.camera = null;
        _this._worldToCameraMatrixCache = null;
        _this._clearCacheSubscription = null;
        _this.camera = cameraComponent;
        return _this;
    }
    Object.defineProperty(CameraController.prototype, "cameraToWorldMatrix", {
        get: function () {
            return this.camera.cameraToWorldMatrix;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "worldToCameraMatrix", {
        get: function () {
            return this._getWorldToCameraMatrix();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CameraController.prototype, "pMatrix", {
        get: function () {
            return this.camera.pMatrix;
        },
        set: function (pMatrix) {
            this.camera.pMatrix = pMatrix;
        },
        enumerable: true,
        configurable: true
    });
    CameraController.prototype.init = function () {
        this.camera.entityObject = this.entityObject;
        this.camera.init();
        this.bindClearCacheEvent();
    };
    CameraController.prototype.update = function (elapsed) {
        this.camera.update(elapsed);
    };
    CameraController.prototype.dispose = function () {
        this.camera.dispose();
        this.disposeClearCacheEvent();
    };
    CameraController.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    CameraController.prototype.bindClearCacheEvent = function () {
        var self = this;
        this._clearCacheSubscription = fromArray([
            EventManager.fromEvent(EEngineEvent.ENDLOOP),
            EventManager.fromEvent(this.entityObject, EEngineEvent.TRANSFORM_TRANSLATE),
            EventManager.fromEvent(this.entityObject, EEngineEvent.TRANSFORM_ROTATE),
            EventManager.fromEvent(this.entityObject, EEngineEvent.TRANSFORM_SCALE)
        ])
            .mergeAll()
            .subscribe(function () {
            self._clearCache();
        });
    };
    CameraController.prototype.disposeClearCacheEvent = function () {
        this._clearCacheSubscription && this._clearCacheSubscription.dispose();
    };
    CameraController.prototype._clearCache = function () {
        this._worldToCameraMatrixCache = null;
    };
    CameraController.prototype._getWorldToCameraMatrix = function () {
        return this.camera.worldToCameraMatrix;
    };
    return CameraController;
}(Component));
__decorate([
    cacheGetter(function () {
        return this._worldToCameraMatrixCache !== null;
    }, function () {
        return this._worldToCameraMatrixCache;
    }, function (result) {
        this._worldToCameraMatrixCache = result;
    })
], CameraController.prototype, "worldToCameraMatrix", null);
__decorate([
    cloneAttributeAsCloneable()
], CameraController.prototype, "camera", void 0);
__decorate([
    virtual
], CameraController.prototype, "bindClearCacheEvent", null);
__decorate([
    virtual
], CameraController.prototype, "disposeClearCacheEvent", null);

var BasicCameraController = (function (_super) {
    __extends(BasicCameraController, _super);
    function BasicCameraController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicCameraController.create = function (cameraComponent) {
        var obj = new this(cameraComponent);
        return obj;
    };
    return BasicCameraController;
}(CameraController));
BasicCameraController = __decorate([
    registerClass("BasicCameraController")
], BasicCameraController);

var PerspectiveCamera = (function (_super) {
    __extends(PerspectiveCamera, _super);
    function PerspectiveCamera() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._fovy = null;
        _this._aspect = null;
        return _this;
    }
    PerspectiveCamera.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
        get: function () {
            return this._fovy;
        },
        set: function (fovy) {
            this._fovy = fovy;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
        get: function () {
            return this._aspect;
        },
        set: function (aspect) {
            this._aspect = aspect;
            this.pMatrixDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    PerspectiveCamera.prototype.zoomIn = function (speed, min) {
        if (min === void 0) { min = 1; }
        this.fovy = Math.max(this.fovy - speed, min);
    };
    PerspectiveCamera.prototype.zoomOut = function (speed, max) {
        if (max === void 0) { max = 179; }
        this.fovy = Math.min(this.fovy + speed, max);
    };
    PerspectiveCamera.prototype.updateProjectionMatrix = function () {
        this.pMatrix.setPerspective(this._fovy, this._aspect, this.near, this.far);
    };
    return PerspectiveCamera;
}(Camera));
__decorate([
    cloneAttributeAsBasicType()
], PerspectiveCamera.prototype, "fovy", null);
__decorate([
    cloneAttributeAsBasicType()
], PerspectiveCamera.prototype, "aspect", null);
PerspectiveCamera = __decorate([
    registerClass("PerspectiveCamera")
], PerspectiveCamera);

var Face3 = (function () {
    function Face3(aIndex, bIndex, cIndex, faceNormal, vertexNormals) {
        this._faceNormal = null;
        this.aIndex = null;
        this.bIndex = null;
        this.cIndex = null;
        this.vertexNormals = null;
        this.aIndex = aIndex;
        this.bIndex = bIndex;
        this.cIndex = cIndex;
        this._faceNormal = faceNormal;
        this.vertexNormals = vertexNormals;
    }
    Face3.create = function (aIndex, bIndex, cIndex, faceNormal, vertexNormals) {
        if (faceNormal === void 0) { faceNormal = null; }
        if (vertexNormals === void 0) { vertexNormals = Collection.create(); }
        var obj = new this(aIndex, bIndex, cIndex, faceNormal, vertexNormals);
        return obj;
    };
    Object.defineProperty(Face3.prototype, "faceNormal", {
        get: function () {
            return this._faceNormal !== null ? this._faceNormal : Vector3.create(0, 0, 0);
        },
        set: function (faceNormal) {
            this._faceNormal = faceNormal;
        },
        enumerable: true,
        configurable: true
    });
    Face3.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    Face3.prototype.hasFaceNormal = function () {
        return this._faceNormal !== null;
    };
    Face3.prototype.hasVertexNormal = function () {
        return this.vertexNormals.getCount() > 0;
    };
    return Face3;
}());
__decorate([
    cloneAttributeAsCloneable()
], Face3.prototype, "_faceNormal", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Face3.prototype, "aIndex", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Face3.prototype, "bIndex", void 0);
__decorate([
    cloneAttributeAsBasicType()
], Face3.prototype, "cIndex", void 0);
__decorate([
    cloneAttributeAsCustomType(function (source, target, memberName) {
        target[memberName] = source[memberName].clone(true);
    })
], Face3.prototype, "vertexNormals", void 0);
Face3 = __decorate([
    registerClass("Face3")
], Face3);

var GeometryUtils = (function () {
    function GeometryUtils() {
    }
    GeometryUtils.convertToFaces = function (indices, normals) {
        var hasNormals = this.hasData(normals), faces = [];
        for (var i = 0, len = indices.length; i < len; i += 3) {
            var a = indices[i], b = indices[i + 1], c = indices[i + 2], face = Face3.create(a, b, c);
            if (hasNormals) {
                face.vertexNormals.addChildren([
                    this.getThreeComponent(normals, a),
                    this.getThreeComponent(normals, b),
                    this.getThreeComponent(normals, c)
                ]);
                face.faceNormal = face.vertexNormals.getChild(0).clone();
            }
            faces.push(face);
        }
        return faces;
    };
    GeometryUtils.hasData = function (data) {
        return data && ((data.length && data.length > 0) || (data.getCount && data.getCount() > 0));
    };
    GeometryUtils.getThreeComponent = function (sourceData, index) {
        var startIndex = 3 * index;
        return Vector3.create(sourceData[startIndex], sourceData[startIndex + 1], sourceData[startIndex + 2]);
    };
    GeometryUtils.iterateThreeComponent = function (dataArr, iterator) {
        for (var i = 0, len = dataArr.length; i < len; i += 3) {
            iterator(Vector3.create(dataArr[i], dataArr[i + 1], dataArr[i + 2]));
        }
    };
    GeometryUtils.setThreeComponent = function (targetData, sourceData, index) {
        if (sourceData instanceof Vector3) {
            targetData[index * 3] = sourceData.x;
            targetData[index * 3 + 1] = sourceData.y;
            targetData[index * 3 + 2] = sourceData.z;
        }
        else {
            targetData[index * 3] = sourceData[0];
            targetData[index * 3 + 1] = sourceData[1];
            targetData[index * 3 + 2] = sourceData[2];
        }
    };
    return GeometryUtils;
}());
__decorate([
    requireCheck(function (data) {
        if (data) {
            assert(data instanceof Collection || data instanceof Hash || JudgeUtils$1.isArrayExactly(data), Log$$1.info.FUNC_SHOULD("data", "be Array or Collection or Hash"));
        }
    })
], GeometryUtils, "hasData", null);
__decorate([
    requireCheck(function (dataArr, iterator) {
        assert(dataArr.length % 3 === 0, Log$$1.info.FUNC_SHOULD("dataArr.length", "times of three"));
    })
], GeometryUtils, "iterateThreeComponent", null);
GeometryUtils = __decorate([
    registerClass("GeometryUtils")
], GeometryUtils);

var BoxGeometry = (function (_super) {
    __extends(BoxGeometry, _super);
    function BoxGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = null;
        _this.height = null;
        _this.depth = null;
        _this.widthSegments = 1;
        _this.heightSegments = 1;
        _this.depthSegments = 1;
        return _this;
    }
    BoxGeometry.create = function () {
        var geom = new this();
        return geom;
    };
    BoxGeometry.prototype.computeData = function () {
        var width = this.width, height = this.height, depth = this.depth, widthSegments = this.widthSegments, heightSegments = this.heightSegments, depthSegments = this.depthSegments, sides = {
            FRONT: 0,
            BACK: 1,
            TOP: 2,
            BOTTOM: 3,
            RIGHT: 4,
            LEFT: 5
        };
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
        var vertices = [];
        var indices = [];
        function generateFace(side, uSegments, vSegments) {
            var x, y, z, u, v;
            var i, j;
            var offset = vertices.length / 3;
            for (i = 0; i <= uSegments; i++) {
                for (j = 0; j <= vSegments; j++) {
                    var temp1 = Vector3.create();
                    var temp2 = Vector3.create();
                    var temp3 = Vector3.create();
                    var r = Vector3.create();
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
            vertices: vertices,
            faces: GeometryUtils.convertToFaces(indices)
        };
    };
    return BoxGeometry;
}(Geometry));
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "width", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "height", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "depth", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "widthSegments", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "heightSegments", void 0);
__decorate([
    cloneAttributeAsBasicType()
], BoxGeometry.prototype, "depthSegments", void 0);
BoxGeometry = __decorate([
    registerClass("BoxGeometry")
], BoxGeometry);

var WebGLState = (function () {
    function WebGLState() {
    }
    return WebGLState;
}());

var BasicState = (function (_super) {
    __extends(BasicState, _super);
    function BasicState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicState.create = function () {
        var obj = new this();
        return obj;
    };
    BasicState.prototype.setState = function (material) {
    };
    return BasicState;
}(WebGLState));
BasicState = __decorate([
    registerClass("BasicState")
], BasicState);

var GlUtils = (function () {
    function GlUtils() {
    }
    GlUtils.drawElements = function (mode, count, type, offset) {
        this._getGl().drawElements(mode, count, type, offset);
    };
    GlUtils.drawArrays = function (mode, first, count) {
        this._getGl().drawArrays(mode, first, count);
    };
    GlUtils._getGl = function () {
        return DeviceManager.getInstance().gl;
    };
    return GlUtils;
}());
GlUtils = __decorate([
    registerClass("GlUtils")
], GlUtils);

var RenderCommand = (function () {
    function RenderCommand() {
        this._webglState = null;
        this.drawMode = EDrawMode.TRIANGLES;
    }
    Object.defineProperty(RenderCommand.prototype, "webglState", {
        get: function () {
            return this._webglState ? this._webglState : BasicState.create();
        },
        set: function (webglState) {
            this._webglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    RenderCommand.prototype.init = function () {
    };
    RenderCommand.prototype.dispose = function () {
    };
    RenderCommand.prototype.drawElements = function (indexBuffer) {
        var startOffset = 0, gl = DeviceManager.getInstance().gl;
        BufferTable.bindIndexBuffer(indexBuffer);
        GlUtils.drawElements(gl[this.drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);
    };
    RenderCommand.prototype.drawArray = function (vertexBuffer) {
        var startOffset = 0, gl = DeviceManager.getInstance().gl;
        GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);
    };
    return RenderCommand;
}());
__decorate([
    virtual
], RenderCommand.prototype, "init", null);
__decorate([
    virtual
], RenderCommand.prototype, "dispose", null);

var QuadCommand = (function (_super) {
    __extends(QuadCommand, _super);
    function QuadCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mMatrix = null;
        _this.vMatrix = null;
        _this.pMatrix = null;
        _this.buffers = null;
        _this.material = null;
        _this.target = null;
        _this.sortId = null;
        return _this;
    }
    Object.defineProperty(QuadCommand.prototype, "program", {
        get: function () {
            return this.material.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuadCommand.prototype, "mvpMatrix", {
        get: function () {
            return this.mMatrix.applyMatrix(this.vMatrix, true).applyMatrix(this.pMatrix, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuadCommand.prototype, "vpMatrix", {
        get: function () {
            return this.vMatrix.applyMatrix(this.pMatrix, true);
        },
        enumerable: true,
        configurable: true
    });
    QuadCommand.prototype.execute = function () {
        var material = this.material;
        material.updateShader(this);
        this.draw(material);
    };
    return QuadCommand;
}(RenderCommand));
__decorate([
    requireGetter(function () {
        assert(!!this.mMatrix && !!this.vMatrix && !!this.pMatrix, Log$$1.info.FUNC_NOT_EXIST("mMatrix or vMatrix or pMatrix"));
    })
], QuadCommand.prototype, "mvpMatrix", null);
__decorate([
    requireGetter(function () {
        assert(!!this.vMatrix && !!this.pMatrix, Log$$1.info.FUNC_NOT_EXIST("vMatrix or pMatrix"));
    })
], QuadCommand.prototype, "vpMatrix", null);

var SingleDrawCommand = (function (_super) {
    __extends(SingleDrawCommand, _super);
    function SingleDrawCommand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.normalMatrix = null;
        return _this;
    }
    SingleDrawCommand.create = function () {
        var obj = new this();
        return obj;
    };
    SingleDrawCommand.prototype.draw = function (material) {
        var vertexBuffer = null, indexBuffer = this.buffers.getChild(EBufferDataType.INDICE);
        this.webglState.setState(material);
        if (indexBuffer) {
            this.drawElements(indexBuffer);
        }
        else {
            vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
            this.drawArray(vertexBuffer);
        }
    };
    return SingleDrawCommand;
}(QuadCommand));
SingleDrawCommand = __decorate([
    registerClass("SingleDrawCommand")
], SingleDrawCommand);

var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRenderer.prototype.render = function (renderer, target, camera) {
        var geometry = target.getGeometry();
        if (!geometry) {
            return;
        }
        renderer.addCommand(this.createDrawCommand(target, geometry, camera));
    };
    MeshRenderer.prototype.createDrawCommand = function (target, geometry, camera) {
        var cmd = null, cameraComponent = camera.getComponent(CameraController), material = geometry.material;
        cmd = this._createCommand(target, material);
        cmd.target = target;
        cmd.buffers = geometry.buffers;
        cmd.drawMode = geometry.drawMode;
        cmd.mMatrix = target.transform.localToWorldMatrix;
        if (target.data && target.data.vMatrix) {
            cmd.vMatrix = target.data.vMatrix;
        }
        else {
            cmd.vMatrix = cameraComponent.worldToCameraMatrix;
        }
        if (target.data && target.data.pMatrix) {
            cmd.pMatrix = target.data.pMatrix;
        }
        else {
            cmd.pMatrix = cameraComponent.pMatrix;
        }
        cmd.material = material;
        return cmd;
    };
    MeshRenderer.prototype._createCommand = function (target, material) {
        var cmd = null;
        cmd = SingleDrawCommand.create();
        cmd.normalMatrix = this.entityObject.transform.normalMatrix;
        return cmd;
    };
    return MeshRenderer;
}(RendererComponent));
__decorate([
    requireCheck(function (target, geometry, camera) {
        var controller = camera.getComponent(CameraController);
        it("camera must add Camera Component", function () {
            index(!!controller && !!controller.camera).true;
        });
        it("Mesh must add geometry component", function () {
            index(!!geometry).true;
        });
    })
], MeshRenderer.prototype, "createDrawCommand", null);
MeshRenderer = __decorate([
    registerClass("MeshRenderer")
], MeshRenderer);

var ThreeDTransform = (function (_super) {
    __extends(ThreeDTransform, _super);
    function ThreeDTransform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._localToWorldMatrix = null;
        _this._position = Vector3.create();
        _this._rotation = Quaternion.create(0, 0, 0, 1);
        _this._scale = Vector3.create(1, 1, 1);
        _this._eulerAngles = null;
        _this._localPosition = Vector3.create(0, 0, 0);
        _this._localRotation = Quaternion.create(0, 0, 0, 1);
        _this._localEulerAngles = null;
        _this._localScale = Vector3.create(1, 1, 1);
        _this.dirtyWorld = null;
        _this._localToParentMatrix = Matrix4.create();
        _this._localToWorldMatrixCache = null;
        _this._positionCache = null;
        _this._rotationCache = null;
        _this._scaleCache = null;
        _this._eulerAnglesCache = null;
        _this._localEulerAnglesCache = null;
        _this._normalMatrixCache = null;
        _this._isUserSpecifyTheLocalToWorldMatrix = false;
        _this._userLocalToWorldMatrix = null;
        return _this;
    }
    ThreeDTransform.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(ThreeDTransform.prototype, "localToWorldMatrix", {
        get: function () {
            if (this._isUserSpecifyTheLocalToWorldMatrix) {
                return this._userLocalToWorldMatrix;
            }
            return this.getMatrix("sync", "_localToWorldMatrix");
        },
        set: function (matrix) {
            this._isUserSpecifyTheLocalToWorldMatrix = true;
            this._userLocalToWorldMatrix = matrix;
            this.isTransform = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "normalMatrix", {
        get: function () {
            return this.localToWorldMatrix.invertTo3x3().transpose();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "position", {
        get: function () {
            this._position = this.localToWorldMatrix.getTranslation();
            return this._position;
        },
        set: function (position) {
            if (this.p_parent === null) {
                this._localPosition = position;
            }
            else {
                this._localPosition = this.p_parent.localToWorldMatrix.clone().invert().multiplyPoint(position);
            }
            this.isTranslate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "rotation", {
        get: function () {
            this._rotation.setFromMatrix(this.localToWorldMatrix);
            return this._rotation;
        },
        set: function (rotation) {
            if (this.p_parent === null) {
                this._localRotation = rotation;
            }
            else {
                this._localRotation = this.p_parent.rotation.clone().invert().multiply(rotation);
            }
            this.isRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "scale", {
        get: function () {
            this._scale = this.localToWorldMatrix.getScale();
            return this._scale;
        },
        set: function (scale) {
            if (this.p_parent === null) {
                this._localScale = scale;
            }
            else {
                this._localScale = this.p_parent.localToWorldMatrix.clone().invert().multiplyVector3(scale);
            }
            this.isScale = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "eulerAngles", {
        get: function () {
            this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
            return this._eulerAngles;
        },
        set: function (eulerAngles) {
            this._localRotation.setFromEulerAngles(eulerAngles);
            if (this.p_parent !== null) {
                this._localRotation = this.p_parent.rotation.clone().invert().multiply(this._localRotation);
            }
            this.isRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localPosition", {
        get: function () {
            return this._localPosition;
        },
        set: function (position) {
            this._localPosition = position;
            this.isLocalTranslate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localRotation", {
        get: function () {
            return this._localRotation;
        },
        set: function (rotation) {
            this._localRotation = rotation;
            this.isLocalRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localEulerAngles", {
        get: function () {
            this._localEulerAngles = this._localRotation.getEulerAngles();
            return this._localEulerAngles;
        },
        set: function (localEulerAngles) {
            this._localRotation.setFromEulerAngles(localEulerAngles);
            this.isLocalRotate = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "localScale", {
        get: function () {
            return this._localScale;
        },
        set: function (scale) {
            this._localScale = scale;
            this.isLocalScale = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "up", {
        get: function () {
            return this.localToWorldMatrix.getY().normalize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "right", {
        get: function () {
            return this.localToWorldMatrix.getX().normalize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ThreeDTransform.prototype, "forward", {
        get: function () {
            return this.localToWorldMatrix.getZ().normalize().scale(-1);
        },
        enumerable: true,
        configurable: true
    });
    ThreeDTransform.prototype.sync = function () {
        if (this.dirtyLocal) {
            this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
            this.dirtyLocal = false;
            this.dirtyWorld = true;
        }
        if (this.dirtyWorld) {
            if (this.p_parent === null) {
                this._localToWorldMatrix = this._localToParentMatrix.clone();
            }
            else {
                this._localToWorldMatrix = this.p_parent.localToWorldMatrix.clone().multiply(this._localToParentMatrix);
            }
            this.dirtyWorld = false;
            this.children.forEach(function (child) {
                child.dirtyWorld = true;
            });
        }
    };
    ThreeDTransform.prototype.translateLocal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var translation = null;
        if (args.length === 3) {
            translation = Vector3.create(args[0], args[1], args[2]);
        }
        else {
            translation = args[0];
        }
        this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));
        this.isTranslate = true;
        return this;
    };
    ThreeDTransform.prototype.translate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var translation = null;
        if (args.length === 3) {
            translation = Vector3.create(args[0], args[1], args[2]);
        }
        else {
            translation = args[0];
        }
        this.position = translation.add(this.position);
        return this;
    };
    ThreeDTransform.prototype.rotate = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eulerAngles = null, quaternion = Quaternion.create();
        if (args.length === 3) {
            eulerAngles = Vector3.create(args[0], args[1], args[2]);
        }
        else {
            eulerAngles = args[0];
        }
        quaternion.setFromEulerAngles(eulerAngles);
        if (this.p_parent === null) {
            this._localRotation = quaternion.multiply(this._localRotation);
        }
        else {
            quaternion = this.p_parent.rotation.clone().invert().multiply(quaternion);
            this._localRotation = quaternion.multiply(this.rotation);
        }
        this.isRotate = true;
        return this;
    };
    ThreeDTransform.prototype.rotateLocal = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var eulerAngles = null, quaternion = Quaternion.create();
        if (args.length === 3) {
            eulerAngles = Vector3.create(args[0], args[1], args[2]);
        }
        else {
            eulerAngles = args[0];
        }
        quaternion.setFromEulerAngles(eulerAngles);
        this._localRotation.multiply(quaternion);
        this.isRotate = true;
        return this;
    };
    ThreeDTransform.prototype.rotateAround = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var angle = null, center = null, axis = null, rot = null, dir = null;
        if (args.length === 3) {
            angle = args[0];
            center = args[1];
            axis = args[2];
        }
        else {
            angle = args[0];
            center = Vector3.create(args[1], args[2], args[3]);
            axis = Vector3.create(args[4], args[5], args[6]);
        }
        rot = Quaternion.create().setFromAxisAngle(angle, axis);
        dir = this.position.clone().sub(center);
        dir = rot.multiplyVector3(dir);
        this.position = center.add(dir);
        this.rotation = rot.multiply(this.rotation);
        return this;
    };
    ThreeDTransform.prototype.lookAt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var target = null, up = null;
        if (args.length === 1) {
            target = args[0];
            up = Vector3.up;
        }
        else if (args.length === 2) {
            target = args[0];
            up = args[1];
        }
        else if (args.length === 3) {
            target = Vector3.create(args[0], args[1], args[2]);
            up = Vector3.up;
        }
        else {
            target = Vector3.create(args[0], args[1], args[2]);
            up = Vector3.create(args[3], args[4], args[5]);
        }
        this.rotation = Quaternion.create().setFromMatrix(Matrix4.create().setLookAt(this.position, target, up));
        return this;
    };
    ThreeDTransform.prototype.clearCache = function () {
        this._localToWorldMatrixCache = null;
        this._normalMatrixCache = null;
        this._positionCache = null;
        this._rotationCache = null;
        this._scaleCache = null;
        this._eulerAnglesCache = null;
        this._localEulerAnglesCache = null;
    };
    ThreeDTransform.prototype.handleWhenSetTransformState = function (transformState) {
        var eventName = null;
        if (transformState === void 0) {
            EventManager.trigger(this.entityObject, CustomEvent.create(EEngineEvent.TRANSFORM_TRANSLATE));
            EventManager.trigger(this.entityObject, CustomEvent.create(EEngineEvent.TRANSFORM_ROTATE));
            EventManager.trigger(this.entityObject, CustomEvent.create(EEngineEvent.TRANSFORM_SCALE));
            return;
        }
        switch (transformState) {
            case ETransformState.ISTRANSLATE:
                eventName = EEngineEvent.TRANSFORM_TRANSLATE;
                break;
            case ETransformState.ISROTATE:
                eventName = EEngineEvent.TRANSFORM_ROTATE;
                break;
            case ETransformState.ISSCALE:
                eventName = EEngineEvent.TRANSFORM_SCALE;
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_UNKNOW("transformState:" + transformState));
                break;
        }
        EventManager.trigger(this.entityObject, CustomEvent.create(eventName));
    };
    return ThreeDTransform;
}(Transform));
__decorate([
    cacheGetter(function () {
        return this._localToWorldMatrixCache !== null;
    }, function () {
        return this._localToWorldMatrixCache;
    }, function (result) {
        this._localToWorldMatrixCache = result;
    })
], ThreeDTransform.prototype, "localToWorldMatrix", null);
__decorate([
    cacheGetter(function () {
        return this._normalMatrixCache !== null;
    }, function () {
        return this._normalMatrixCache;
    }, function (result) {
        this._normalMatrixCache = result;
    })
], ThreeDTransform.prototype, "normalMatrix", null);
__decorate([
    cloneAttributeAsCloneable(),
    cacheGetter(function () {
        return this._positionCache !== null;
    }, function () {
        return this._positionCache;
    }, function (result) {
        this._positionCache = result;
    })
], ThreeDTransform.prototype, "position", null);
__decorate([
    cloneAttributeAsCloneable(),
    cacheGetter(function () {
        return this._rotationCache !== null;
    }, function () {
        return this._rotationCache;
    }, function (result) {
        this._rotationCache = result;
    })
], ThreeDTransform.prototype, "rotation", null);
__decorate([
    cloneAttributeAsCloneable(),
    cacheGetter(function () {
        return this._scaleCache !== null;
    }, function () {
        return this._scaleCache;
    }, function (result) {
        this._scaleCache = result;
    })
], ThreeDTransform.prototype, "scale", null);
__decorate([
    cacheGetter(function () {
        return this._eulerAnglesCache !== null;
    }, function () {
        return this._eulerAnglesCache;
    }, function (result) {
        this._eulerAnglesCache = result;
    })
], ThreeDTransform.prototype, "eulerAngles", null);
__decorate([
    cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "localPosition", null);
__decorate([
    cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "localRotation", null);
__decorate([
    cacheGetter(function () {
        return this._localEulerAnglesCache !== null;
    }, function () {
        return this._localEulerAnglesCache;
    }, function (result) {
        this._localEulerAnglesCache = result;
    })
], ThreeDTransform.prototype, "localEulerAngles", null);
__decorate([
    cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "localScale", null);
__decorate([
    cloneAttributeAsBasicType()
], ThreeDTransform.prototype, "_isUserSpecifyTheLocalToWorldMatrix", void 0);
__decorate([
    cloneAttributeAsCloneable()
], ThreeDTransform.prototype, "_userLocalToWorldMatrix", void 0);
ThreeDTransform = __decorate([
    registerClass("ThreeDTransform")
], ThreeDTransform);

var DebugConfig = {
    isTest: false,
    debugCollision: false,
    showDebugPanel: false
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
        _this._sources = Collection.create();
        var self = _this;
        _this.scheduler = sources[0].scheduler;
        sources.forEach(function (source) {
            if (JudgeUtils$2.isPromise(source)) {
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

root$1.requestNextAnimationFrame = (function () {
    var originalRequestAnimationFrame = undefined, wrapper = undefined, callback = undefined, geckoVersion = null, userAgent = root$1.navigator && root$1.navigator.userAgent, index = 0, self = this;
    wrapper = function (time) {
        time = root$1.performance.now();
        self.callback(time);
    };
    if (root$1.requestAnimationFrame) {
        return requestAnimationFrame;
    }
    if (root$1.webkitRequestAnimationFrame) {
        originalRequestAnimationFrame = root$1.webkitRequestAnimationFrame;
        root$1.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;
            return originalRequestAnimationFrame(wrapper, element);
        };
    }
    if (root$1.msRequestAnimationFrame) {
        originalRequestAnimationFrame = root$1.msRequestAnimationFrame;
        root$1.msRequestAnimationFrame = function (callback) {
            self.callback = callback;
            return originalRequestAnimationFrame(wrapper);
        };
    }
    if (root$1.mozRequestAnimationFrame) {
        index = userAgent.indexOf('rv:');
        if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);
            if (geckoVersion === '2.0') {
                root$1.mozRequestAnimationFrame = undefined;
            }
        }
    }
    return root$1.webkitRequestAnimationFrame ||
        root$1.mozRequestAnimationFrame ||
        root$1.oRequestAnimationFrame ||
        root$1.msRequestAnimationFrame ||
        function (callback, element) {
            var start, finish;
            root$1.setTimeout(function () {
                start = root$1.performance.now();
                callback(start);
                finish = root$1.performance.now();
                self.timeout = 1000 / 60 - (finish - start);
            }, self.timeout);
        };
}());
root$1.cancelNextRequestAnimationFrame = root$1.cancelRequestAnimationFrame
    || root$1.webkitCancelAnimationFrame
    || root$1.webkitCancelRequestAnimationFrame
    || root$1.mozCancelRequestAnimationFrame
    || root$1.oCancelRequestAnimationFrame
    || root$1.msCancelRequestAnimationFrame
    || clearTimeout;

var RenderUtils = (function () {
    function RenderUtils() {
    }
    RenderUtils.getGameObjectRenderList = function (sourceList) {
        var renderList = [];
        sourceList.forEach(function (child) {
            var activeGameObject = null;
            activeGameObject = child;
            if (activeGameObject.isVisible) {
                renderList.push(activeGameObject);
            }
        });
        return Collection.create(renderList);
    };
    return RenderUtils;
}());
RenderUtils = __decorate([
    registerClass("RenderUtils")
], RenderUtils);

var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderGroup = 0;
        _this.renderPriority = 0;
        _this.isVisible = true;
        return _this;
    }
    GameObject.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    GameObject.prototype.initWhenCreate = function () {
        _super.prototype.initWhenCreate.call(this);
        this.name = "gameObject" + String(this.uid);
    };
    GameObject.prototype.createTransform = function () {
        return ThreeDTransform.create();
    };
    GameObject.prototype.getRenderList = function () {
        return RenderUtils.getGameObjectRenderList(this.getChildren());
    };
    return GameObject;
}(EntityObject));
__decorate([
    cloneAttributeAsBasicType()
], GameObject.prototype, "renderGroup", void 0);
__decorate([
    cloneAttributeAsBasicType()
], GameObject.prototype, "renderPriority", void 0);
__decorate([
    cloneAttributeAsBasicType()
], GameObject.prototype, "isVisible", void 0);
GameObject = __decorate([
    registerClass("GameObject")
], GameObject);

var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Scene;
}(EntityObject));

var GameObjectScene = (function (_super) {
    __extends(GameObjectScene, _super);
    function GameObjectScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._currentCamera = null;
        _this._cameraList = Collection.create();
        return _this;
    }
    GameObjectScene.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(GameObjectScene.prototype, "currentCamera", {
        get: function () {
            return this._currentCamera || this._cameraList.getChild(0);
        },
        set: function (arg) {
            if (JudgeUtils$1.isNumber(arg)) {
                var index = arg;
                this._currentCamera = this._cameraList.getChild(index);
            }
            else if (arg instanceof GameObject) {
                var currentCamera = arg;
                this._currentCamera = currentCamera;
            }
        },
        enumerable: true,
        configurable: true
    });
    GameObjectScene.prototype.addChild = function (child) {
        var cameraList = this._getCameras(child);
        if (cameraList.getCount() > 0) {
            this._cameraList.addChildren(cameraList);
        }
        return _super.prototype.addChild.call(this, child);
    };
    GameObjectScene.prototype.update = function (elapsed) {
        var currentCamera = this._getCurrentCameraComponent();
        if (currentCamera) {
            currentCamera.update(elapsed);
        }
        _super.prototype.update.call(this, elapsed);
    };
    GameObjectScene.prototype.render = function (renderer) {
        _super.prototype.render.call(this, renderer, this.currentCamera);
    };
    GameObjectScene.prototype.getRenderList = function () {
        return RenderUtils.getGameObjectRenderList(this.getChildren());
    };
    GameObjectScene.prototype.createTransform = function () {
        return null;
    };
    GameObjectScene.prototype._getCameras = function (gameObject) {
        return this._find(gameObject, this._isCamera);
    };
    GameObjectScene.prototype._find = function (gameObject, judgeFunc) {
        var self = this, resultArr = Collection.create();
        var find = function (gameObject) {
            if (judgeFunc.call(self, gameObject)) {
                resultArr.addChild(gameObject);
            }
            gameObject.forEach(function (child) {
                find(child);
            });
        };
        find(gameObject);
        return resultArr;
    };
    GameObjectScene.prototype._isCamera = function (child) {
        return child.hasComponent(CameraController);
    };
    GameObjectScene.prototype._getCurrentCameraComponent = function () {
        if (!this.currentCamera) {
            return null;
        }
        return this.currentCamera.getComponent(CameraController);
    };
    return GameObjectScene;
}(Scene));
__decorate([
    requireSetter(function (arg) {
        if (JudgeUtils$1.isNumber(arg)) {
            var index = arg;
            assert(!!this._cameraList.getChild(index), Log$$1.info.FUNC_NOT_EXIST("current camera in cameraList"));
        }
    })
], GameObjectScene.prototype, "currentCamera", null);
GameObjectScene = __decorate([
    registerClass("GameObjectScene")
], GameObjectScene);

var SceneDispatcher = (function (_super) {
    __extends(SceneDispatcher, _super);
    function SceneDispatcher() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "scene" + String(_this.uid);
        _this.gameObjectScene = GameObjectScene.create();
        return _this;
    }
    SceneDispatcher.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Object.defineProperty(SceneDispatcher.prototype, "currentCamera", {
        get: function () {
            return this.gameObjectScene.currentCamera;
        },
        set: function (arg) {
            this.gameObjectScene.currentCamera = arg;
        },
        enumerable: true,
        configurable: true
    });
    SceneDispatcher.prototype.addChild = function (child) {
        if (child instanceof GameObject) {
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;
        return this;
    };
    SceneDispatcher.prototype.dispose = function () {
        this.gameObjectScene.dispose();
    };
    SceneDispatcher.prototype.hasChild = function (child) {
        if (child instanceof GameObject) {
            return this.gameObjectScene.hasChild(child);
        }
    };
    SceneDispatcher.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof EntityObject) {
            var child = args[0];
            this.addChild(child);
        }
        if (args[0] instanceof Collection) {
            var children = args[0], self_1 = this;
            children.forEach(function (child) {
                self_1.addChild(child);
            });
        }
        else if (JudgeUtils$1.isArrayExactly(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                this.addChild(child);
            }
        }
        return this;
    };
    SceneDispatcher.prototype.getChildren = function () {
        return this.gameObjectScene.getChildren();
    };
    SceneDispatcher.prototype.createTransform = function () {
        return null;
    };
    return SceneDispatcher;
}(EntityObject));
SceneDispatcher = __decorate([
    registerClass("SceneDispatcher")
], SceneDispatcher);

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
        return root$2.performance.now();
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

var Renderer = (function () {
    function Renderer() {
        this._webglState = null;
    }
    Object.defineProperty(Renderer.prototype, "webglState", {
        get: function () {
            return this._webglState ? this._webglState : BasicState.create();
        },
        set: function (webglState) {
            this._webglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.init = function () {
    };
    return Renderer;
}());
__decorate([
    virtual
], Renderer.prototype, "init", null);

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
    Color.prototype._setColor = function (colorVal) {
        var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i, REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i, REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i, REGEX_NUM = /^\#([0-9a-f]{6})$/i;
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
            color = REGEX_NUM.exec(colorVal);
            this._setHex(parseInt(color[1], 16));
            return this;
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
Color = Color_1 = __decorate([
    registerClass("Color")
], Color);
var Color_1;

var WebGLRenderer = (function (_super) {
    __extends(WebGLRenderer, _super);
    function WebGLRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._commandQueue = Collection.create();
        _this._clearOptions = {
            color: Color.create("#000000")
        };
        return _this;
    }
    WebGLRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    WebGLRenderer.prototype.addCommand = function (command) {
        this._commandQueue.addChild(command);
        command.init();
    };
    WebGLRenderer.prototype.hasCommand = function () {
        return this._commandQueue.getCount() > 0;
    };
    WebGLRenderer.prototype.clear = function () {
        DeviceManager.getInstance().clear(this._clearOptions);
    };
    WebGLRenderer.prototype.render = function () {
        var deviceManager = DeviceManager.getInstance(), webglState = this.webglState;
        this._commandQueue.forEach(function (command) {
            command.webglState = webglState;
            command.execute();
        }, this);
        this._clearCommand();
        this.webglState = null;
    };
    WebGLRenderer.prototype.init = function () {
        var deviceManager = DeviceManager.getInstance();
        deviceManager.depthTest = true;
        deviceManager.blend = false;
        deviceManager.setColorWrite(true, true, true, true);
        deviceManager.side = ESide.FRONT;
        deviceManager.depthWrite = true;
    };
    WebGLRenderer.prototype.setClearColor = function (color) {
        this._setClearOptions({
            color: color
        });
    };
    WebGLRenderer.prototype._clearCommand = function () {
        this._commandQueue.forEach(function (command) {
            command.dispose();
        });
        this._commandQueue.removeAllChildren();
    };
    WebGLRenderer.prototype._setClearOptions = function (clearOptions) {
        ExtendUtils.extend(this._clearOptions, clearOptions);
    };
    return WebGLRenderer;
}(Renderer));
__decorate([
    ensure(function () {
        assert(!this._commandQueue.hasRepeatItems(), Log$$1.info.FUNC_SHOULD_NOT("has duplicate render command"));
    })
], WebGLRenderer.prototype, "addCommand", null);
__decorate([
    requireCheck(function () {
        assert(!!this.webglState, Log$$1.info.FUNC_MUST_DEFINE("webglState"));
    })
], WebGLRenderer.prototype, "render", null);
WebGLRenderer = __decorate([
    registerClass("WebGLRenderer")
], WebGLRenderer);

var EGameState;
(function (EGameState) {
    EGameState[EGameState["NORMAL"] = 0] = "NORMAL";
    EGameState[EGameState["STOP"] = 1] = "STOP";
    EGameState[EGameState["PAUSE"] = 2] = "PAUSE";
})(EGameState || (EGameState = {}));
var Director = (function () {
    function Director() {
        this.scene = null;
        this.renderer = null;
        this._gameLoop = null;
        this._gameState = EGameState.NORMAL;
        this._timeController = DirectorTimeController.create();
    }
    Director.getInstance = function () { };
    
    Object.defineProperty(Director.prototype, "gameTime", {
        get: function () {
            return this._timeController.gameTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "fps", {
        get: function () {
            return this._timeController.fps;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isNormal", {
        get: function () {
            return this._gameState === EGameState.NORMAL;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isStop", {
        get: function () {
            return this._gameState === EGameState.STOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isPause", {
        get: function () {
            return this._gameState === EGameState.PAUSE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "isTimeChange", {
        get: function () {
            return this._timeController.isTimeChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "elapsed", {
        get: function () {
            return this._timeController.elapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Director.prototype, "view", {
        get: function () {
            return DeviceManager.getInstance().view;
        },
        enumerable: true,
        configurable: true
    });
    Director.prototype.initWhenCreate = function () {
        this.scene = SceneDispatcher.create();
        this.renderer = WebGLRenderer.create();
    };
    Director.prototype.start = function () {
        this._gameState = EGameState.NORMAL;
        this._startLoop();
    };
    Director.prototype.stop = function () {
        this._gameLoop && this._gameLoop.dispose();
        this._gameState = EGameState.STOP;
        this._timeController.stop();
    };
    Director.prototype.pause = function () {
        if (this._gameState === EGameState.PAUSE) {
            return;
        }
        this._gameState = EGameState.PAUSE;
        this._timeController.pause();
    };
    Director.prototype.resume = function () {
        this._gameState = EGameState.NORMAL;
        this._timeController.resume();
    };
    Director.prototype.getDeltaTime = function () {
        return this._timeController.deltaTime;
    };
    Director.prototype._startLoop = function () {
        var self = this;
        this._gameLoop = this._buildInitStream()
            .ignoreElements()
            .concat(this._buildLoopStream())
            .subscribe(function (time) {
            self._loopBody(time);
        });
    };
    Director.prototype._buildInitStream = function () {
        var _this = this;
        return callFunc(function () {
            _this._init();
        }, this);
    };
    Director.prototype._init = function () {
        this._initGameObjectScene();
    };
    Director.prototype._initGameObjectScene = function () {
        var gameObjectScene = this.scene.gameObjectScene;
        gameObjectScene.init();
        this.renderer.init();
        this._timeController.start();
    };
    Director.prototype._buildLoopStream = function () {
        return intervalRequest();
    };
    Director.prototype._loopBody = function (time) {
        var elapsed = null;
        if (this._gameState === EGameState.PAUSE || this._gameState === EGameState.STOP) {
            return false;
        }
        elapsed = this._timeController.computeElapseTime(time);
        this._run(elapsed);
        return true;
    };
    Director.prototype._run = function (elapsed) {
        this._timeController.tick(elapsed);
        EventManager.trigger(CustomEvent.create(EEngineEvent.STARTLOOP));
        this._update(elapsed);
        this._render();
        EventManager.trigger(CustomEvent.create(EEngineEvent.ENDLOOP));
    };
    Director.prototype._update = function (elapsed) {
        this.scene.gameObjectScene.update(elapsed);
    };
    Director.prototype._render = function () {
        this.scene.gameObjectScene.render(this.renderer);
        this.renderer.clear();
        if (this.renderer.hasCommand()) {
            this.renderer.webglState = BasicState.create();
            this.renderer.render();
        }
    };
    return Director;
}());
Director = __decorate([
    singleton(true),
    registerClass("Director")
], Director);

var ProgramTable = (function () {
    function ProgramTable() {
    }
    ProgramTable.hasProgram = function (key) {
        return this._table.hasChild(key);
    };
    ProgramTable.addProgram = function (key, program) {
        this._table.addChild(key, program);
    };
    ProgramTable.getProgram = function (key) {
        return this._table.getChild(key);
    };
    ProgramTable.dispose = function () {
        this._table.forEach(function (program) {
            program.dispose();
        });
        this.lastUsedProgram = null;
    };
    ProgramTable.clearAll = function () {
        this._table.removeAllChildren();
        this.lastUsedProgram = null;
    };
    return ProgramTable;
}());
ProgramTable.lastUsedProgram = null;
ProgramTable._table = Hash.create();
ProgramTable = __decorate([
    registerClass("ProgramTable")
], ProgramTable);

var Main$1 = (function () {
    function Main() {
    }
    Main.setConfig = function (_a) {
        var _b = _a.canvasId, canvasId = _b === void 0 ? null : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
            options: {
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }
        } : _f;
        MainData.screenSize = screenSize;
        this._canvasId = canvasId;
        this._useDevicePixelRatio = useDevicePixelRatio;
        this._contextConfig = {
            options: ExtendUtils.extend({
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }, contextConfig.options)
        };
        this._setIsTest(isTest);
        return this;
    };
    Main.init = function () {
        DeviceManager.getInstance().createGL(this._canvasId, this._contextConfig, this._useDevicePixelRatio);
        DeviceManager.getInstance().setScreen();
        GPUDetector.getInstance().detect();
        return this;
    };
    Main._setIsTest = function (isTestFromDebugConfig) {
        if (CompileConfig.closeContractTest) {
            MainData.isTest = false;
        }
        else {
            MainData.isTest = isTestFromDebugConfig;
        }
    };
    return Main;
}());
Main$1._canvasId = null;
Main$1._contextConfig = null;
Main$1._useDevicePixelRatio = null;
Main$1 = __decorate([
    registerClass("Main")
], Main$1);

var PointEvent = (function (_super) {
    __extends(PointEvent, _super);
    function PointEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = EEventType.POINT;
        _this.eventObj = null;
        return _this;
    }
    Object.defineProperty(PointEvent.prototype, "lastX", {
        get: function () {
            return this.eventObj.lastX;
        },
        set: function (x) {
            this.eventObj.lastX = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PointEvent.prototype, "lastY", {
        get: function () {
            return this.eventObj.lastY;
        },
        set: function (y) {
            this.eventObj.lastY = y;
        },
        enumerable: true,
        configurable: true
    });
    PointEvent.prototype.cloneHelper = function (eventObj) {
        eventObj.event = this.event;
        return this.copyMember(eventObj, this, ["eventObj", "target", "currentTarget", "isStopPropagation", "phase", "lastX", "lastY"]);
    };
    return PointEvent;
}(DomEvent));

var MousePointEvent = MousePointEvent_1 = (function (_super) {
    __extends(MousePointEvent, _super);
    function MousePointEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MousePointEvent.create = function (eventName) {
        var obj = new this(null, eventName);
        return obj;
    };
    Object.defineProperty(MousePointEvent.prototype, "location", {
        get: function () {
            return this.eventObj.location;
        },
        set: function (point) {
            this.eventObj.location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "locationInView", {
        get: function () {
            return this.eventObj.locationInView;
        },
        set: function (locationInView) {
            this.eventObj.locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "button", {
        get: function () {
            return this.eventObj.button;
        },
        set: function (button) {
            this.eventObj.button = button;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "wheel", {
        get: function () {
            return this.eventObj.wheel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MousePointEvent.prototype, "movementDelta", {
        get: function () {
            return this.eventObj.movementDelta;
        },
        enumerable: true,
        configurable: true
    });
    MousePointEvent.prototype.getDataFromEventObj = function (e) {
        this.eventObj = e;
        this.event = e.event;
    };
    MousePointEvent.prototype.clone = function () {
        return this.cloneHelper(MousePointEvent_1.create(this.name));
    };
    return MousePointEvent;
}(PointEvent));
MousePointEvent = MousePointEvent_1 = __decorate([
    registerClass("MousePointEvent")
], MousePointEvent);
var MousePointEvent_1;

var TouchPointEvent = TouchPointEvent_1 = (function (_super) {
    __extends(TouchPointEvent, _super);
    function TouchPointEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = null;
        return _this;
    }
    TouchPointEvent.create = function (eventName) {
        var obj = new this(null, eventName);
        return obj;
    };
    Object.defineProperty(TouchPointEvent.prototype, "location", {
        get: function () {
            return this.eventObj.location;
        },
        set: function (point) {
            this.eventObj.location = point;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchPointEvent.prototype, "locationInView", {
        get: function () {
            return this.eventObj.locationInView;
        },
        set: function (locationInView) {
            this.eventObj.locationInView = locationInView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchPointEvent.prototype, "wheel", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TouchPointEvent.prototype, "movementDelta", {
        get: function () {
            return this.eventObj.movementDelta;
        },
        enumerable: true,
        configurable: true
    });
    TouchPointEvent.prototype.getDataFromEventObj = function (e) {
        var touchData = e.touchData;
        this.eventObj = e;
        this.event = {
            clientX: touchData.clientX,
            clientY: touchData.clientY,
            pageX: touchData.pageX,
            pageY: touchData.pageY,
            target: touchData.target,
            currentTarget: e.currentTarget
        };
    };
    TouchPointEvent.prototype.clone = function () {
        return this.cloneHelper(TouchPointEvent_1.create(this.name));
    };
    return TouchPointEvent;
}(PointEvent));
TouchPointEvent = TouchPointEvent_1 = __decorate([
    registerClass("TouchPointEvent")
], TouchPointEvent);
var TouchPointEvent_1;

var ShaderManager = (function () {
    function ShaderManager(material) {
        this._material = null;
        this._mainShader = null;
        this._material = material;
    }
    ShaderManager.create = function (material) {
        var obj = new this(material);
        return obj;
    };
    Object.defineProperty(ShaderManager.prototype, "shader", {
        get: function () {
            var scene = Director.getInstance().scene;
            return this._mainShader;
        },
        enumerable: true,
        configurable: true
    });
    ShaderManager.prototype.setShader = function (shader) {
        this._mainShader = shader;
    };
    ShaderManager.prototype.init = function () {
        var material = this._material;
        this._mainShader.init(material);
    };
    ShaderManager.prototype.dispose = function () {
        this._mainShader.dispose();
    };
    ShaderManager.prototype.update = function (quadCmd) {
        this.shader.update(quadCmd, this._material);
    };
    return ShaderManager;
}());
__decorate([
    ensureGetter(function (shader) {
        assert(!!shader, Log$$1.info.FUNC_NOT_EXIST("shader"));
    })
], ShaderManager.prototype, "shader", null);
ShaderManager = __decorate([
    registerClass("ShaderManager")
], ShaderManager);

var Material = (function () {
    function Material() {
        this._color = Color.create("#ffffff");
        this.geometry = null;
        this._shaderManager = ShaderManager.create(this);
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            return this.shader.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (this._color.isEqual(color)) {
                return;
            }
            this._color = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "shader", {
        get: function () {
            return this._shaderManager.shader;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.clone = function () {
        return CloneUtils.clone(this);
    };
    Material.prototype.initWhenCreate = function () {
        this._shaderManager.setShader(this.createShader());
    };
    Material.prototype.init = function () {
        this._shaderManager.init();
    };
    Material.prototype.dispose = function () {
        this._shaderManager.dispose();
    };
    Material.prototype.updateShader = function (quadCmd) {
        this._shaderManager.update(quadCmd);
    };
    return Material;
}());
__decorate([
    cloneAttributeAsCloneable()
], Material.prototype, "color", null);
__decorate([
    cloneAttributeAsBasicType()
], Material.prototype, "geometry", void 0);

var ArrayUtils$1 = (function () {
    function ArrayUtils() {
    }
    ArrayUtils.removeRepeatItems = function (arr, isEqual) {
        if (isEqual === void 0) { isEqual = function (a, b) {
            return a === b;
        }; }
        var resultArr = [], self = this;
        arr.forEach(function (ele) {
            if (self.contain(resultArr, function (val) {
                return isEqual(val, ele);
            })) {
                return;
            }
            resultArr.push(ele);
        });
        return resultArr;
    };
    ArrayUtils.contain = function (arr, ele) {
        if (JudgeUtils.isFunction(ele)) {
            var func = ele;
            for (var i = 0, len = arr.length; i < len; i++) {
                var value = arr[i];
                if (!!func.call(null, value, i)) {
                    return true;
                }
            }
        }
        else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var value = arr[i];
                if (ele === value || (value.contain && value.contain(ele))) {
                    return true;
                }
            }
        }
        return false;
    };
    
    return ArrayUtils;
}());

var ArrayUtils = (function (_super) {
    __extends(ArrayUtils$$1, _super);
    function ArrayUtils$$1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayUtils$$1.hasRepeatItems = function (arr) {
        var noRepeatArr = [], hasRepeat = false;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var item = arr_1[_i];
            if (!item) {
                continue;
            }
            if (this.contain(noRepeatArr, item)) {
                hasRepeat = true;
                break;
            }
            noRepeatArr.push(item);
        }
        return hasRepeat;
    };
    ArrayUtils$$1.contain = function (arr, item) {
        var c = null;
        for (var i = 0, len = arr.length; i < len; i++) {
            c = arr[i];
            if (item.uid && c.uid && item.uid == c.uid) {
                return true;
            }
            else if (item === c) {
                return true;
            }
        }
        return false;
    };
    return ArrayUtils$$1;
}(ArrayUtils$1));
ArrayUtils = __decorate([
    registerClass("ArrayUtils")
], ArrayUtils);

var GLSLDataSender = (function () {
    function GLSLDataSender(program) {
        this._program = null;
        this._uniformCache = {};
        this._vertexAttribHistory = [];
        this._getUniformLocationCache = {};
        this._toSendBufferArr = [];
        this._toSendBuffersUidStr = "";
        this._program = program;
    }
    GLSLDataSender.create = function (program) {
        var obj = new this(program);
        return obj;
    };
    GLSLDataSender.prototype.sendFloat1 = function (name, data) {
        var gl = null, pos = null;
        if (this._uniformCache[name] == data) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform1f(pos, Number(data));
    };
    GLSLDataSender.prototype.sendFloat2 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] === data[0] && recordedData[1] === data[1]) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform2f(pos, data[0], data[1]);
    };
    GLSLDataSender.prototype.sendFloat3 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2]) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform3f(pos, data[0], data[1], data[2]);
    };
    GLSLDataSender.prototype.sendFloat4 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] === data[0] && recordedData[1] === data[1] && recordedData[2] === data[2] && recordedData[3] === data[3]) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform4f(pos, data[0], data[1], data[2], data[3]);
    };
    GLSLDataSender.prototype.sendVector2 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] == data.x && recordedData[1] == data.y) {
            return;
        }
        var x = data.x, y = data.y;
        this._recordUniformData(name, [x, y]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform2f(pos, x, y);
    };
    GLSLDataSender.prototype.sendVector3 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] == data.x && recordedData[1] == data.y && recordedData[2] == data.z) {
            return;
        }
        var x = data.x, y = data.y, z = data.z;
        this._recordUniformData(name, [x, y, z]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform3f(pos, x, y, z);
    };
    GLSLDataSender.prototype.sendVector4 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name];
        if (recordedData && recordedData[0] == data.x && recordedData[1] == data.y && recordedData[2] == data.z && recordedData[3] == data.w) {
            return;
        }
        var x = data.x, y = data.y, z = data.z, w = data.w;
        this._recordUniformData(name, [x, y, z, w]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform4f(pos, x, y, z, w);
    };
    GLSLDataSender.prototype.sendColor3 = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name], convertedData = null;
        if (recordedData && recordedData[0] == data.r && recordedData[1] == data.g && recordedData[2] == data.b) {
            return;
        }
        var r = data.r, g = data.g, b = data.b;
        this._recordUniformData(name, [r, g, b]);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform3f(pos, r, g, b);
    };
    GLSLDataSender.prototype.sendNum1 = function (name, data) {
        var gl = null, pos = null;
        if (this._uniformCache[name] === data) {
            return;
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform1i(pos, data);
    };
    GLSLDataSender.prototype.sendMatrix3 = function (name, data) {
        var gl = DeviceManager.getInstance().gl, pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniformMatrix3fv(pos, false, data.values);
    };
    GLSLDataSender.prototype.sendMatrix4 = function (name, data) {
        var gl = DeviceManager.getInstance().gl, pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniformMatrix4fv(pos, false, data.values);
    };
    GLSLDataSender.prototype.sendMatrix4Array = function (name, data) {
        var gl = DeviceManager.getInstance().gl, pos = this.getUniformLocation(name + "[0]");
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniformMatrix4fv(pos, false, data);
    };
    GLSLDataSender.prototype.sendSampleArray = function (name, data) {
        var gl = null, pos = null, recordedData = this._uniformCache[name], isEqual = true;
        if (recordedData) {
            for (var i = 0, len = data.length; i < len; i++) {
                if (recordedData[i] !== data[i]) {
                    isEqual = false;
                    break;
                }
            }
            if (isEqual) {
                return;
            }
        }
        this._recordUniformData(name, data);
        gl = DeviceManager.getInstance().gl;
        pos = this.getUniformLocation(name);
        if (this._isUniformDataNotExistByLocation(pos)) {
            return;
        }
        gl.uniform1iv(pos, data);
    };
    GLSLDataSender.prototype.getUniformLocation = function (name) {
        var pos = null, gl = DeviceManager.getInstance().gl;
        pos = this._getUniformLocationCache[name];
        if (pos !== void 0) {
            return pos;
        }
        pos = gl.getUniformLocation(this._program.glProgram, name);
        this._getUniformLocationCache[name] = pos;
        return pos;
    };
    GLSLDataSender.prototype.addBufferToToSendList = function (pos, buffer) {
        this._toSendBufferArr[pos] = buffer;
        this._toSendBuffersUidStr += String(buffer.uid);
    };
    GLSLDataSender.prototype.sendAllBufferData = function () {
        var toSendBufferArr = this._toSendBufferArr;
        for (var pos = 0, len = toSendBufferArr.length; pos < len; pos++) {
            var buffer = toSendBufferArr[pos];
            if (!buffer) {
                continue;
            }
            this.sendBuffer(pos, buffer);
        }
    };
    GLSLDataSender.prototype.clearBufferList = function () {
        this._toSendBufferArr = [];
        this._toSendBuffersUidStr = "";
    };
    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
        var gl = DeviceManager.getInstance().gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
        gl.vertexAttribPointer(pos, buffer.size, gl[buffer.type], false, 0, 0);
        if (this._vertexAttribHistory[pos] !== true) {
            gl.enableVertexAttribArray(pos);
            this._vertexAttribHistory[pos] = true;
        }
    };
    GLSLDataSender.prototype.disableVertexAttribArray = function () {
        var gl = DeviceManager.getInstance().gl;
        for (var i in this._vertexAttribHistory) {
            var iAsNumber = +i;
            if (iAsNumber > gl.VERTEX_ATTRIB_ARRAY_ENABLED || !this._vertexAttribHistory[iAsNumber]) {
                continue;
            }
            this._vertexAttribHistory[iAsNumber] = false;
            gl.disableVertexAttribArray(iAsNumber);
        }
        this._vertexAttribHistory = [];
    };
    GLSLDataSender.prototype.clearAllCache = function () {
        this._getUniformLocationCache = {};
        this._uniformCache = {};
    };
    GLSLDataSender.prototype.dispose = function () {
        this.disableVertexAttribArray();
    };
    GLSLDataSender.prototype._recordUniformData = function (name, data) {
        this._uniformCache[name] = data;
    };
    GLSLDataSender.prototype._isUniformDataNotExistByLocation = function (pos) {
        return pos === null;
    };
    return GLSLDataSender;
}());
__decorate([
    requireCheck(function (name, data) {
        assert(JudgeUtils$1.isNumber(data), Log$$1.info.FUNC_MUST_BE("data", "be number"));
    })
], GLSLDataSender.prototype, "sendNum1", null);
__decorate([
    requireCheck(function (name, data) {
        it("data should be array, but actual is " + data, function () {
            index(JudgeUtils$1.isFloatArray(data) || JudgeUtils$1.isArrayExactly(data)).true;
        });
        it("name shouldn't be the first matrix of the array", function () {
            index(/\[0\]$/.test(name)).false;
        });
    })
], GLSLDataSender.prototype, "sendMatrix4Array", null);
__decorate([
    requireCheck(function (name, data) {
        assert(JudgeUtils$1.isArrayExactly(data), Log$$1.info.FUNC_SHOULD("data", "be array, but actual is " + data));
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var unit = data_1[_i];
            assert(JudgeUtils$1.isNumber(unit), Log$$1.info.FUNC_SHOULD("data", "be Array<number>, but actual is " + data));
        }
    })
], GLSLDataSender.prototype, "sendSampleArray", null);
__decorate([
    requireCheck(function () {
        assert(!ArrayUtils.hasRepeatItems(this._toSendBufferArr), Log$$1.info.FUNC_SHOULD_NOT("_toSendBufferArr", "has repeat buffer"));
    }),
    cache(function () {
        return BufferTable.lastBindedArrayBufferListUidStr === this._toSendBuffersUidStr;
    }, function () {
    }, function () {
        BufferTable.lastBindedArrayBufferListUidStr = this._toSendBuffersUidStr;
    })
], GLSLDataSender.prototype, "sendAllBufferData", null);
GLSLDataSender = __decorate([
    registerClass("GLSLDataSender")
], GLSLDataSender);

var EVariableType;
(function (EVariableType) {
    EVariableType[EVariableType["FLOAT_1"] = "FLOAT_1"] = "FLOAT_1";
    EVariableType[EVariableType["FLOAT_2"] = "FLOAT_2"] = "FLOAT_2";
    EVariableType[EVariableType["FLOAT_3"] = "FLOAT_3"] = "FLOAT_3";
    EVariableType[EVariableType["FLOAT_4"] = "FLOAT_4"] = "FLOAT_4";
    EVariableType[EVariableType["VECTOR_2"] = "VECTOR_2"] = "VECTOR_2";
    EVariableType[EVariableType["VECTOR_3"] = "VECTOR_3"] = "VECTOR_3";
    EVariableType[EVariableType["VECTOR_4"] = "VECTOR_4"] = "VECTOR_4";
    EVariableType[EVariableType["COLOR_3"] = "COLOR_3"] = "COLOR_3";
    EVariableType[EVariableType["FLOAT_MAT3"] = "FLOAT_MAT3"] = "FLOAT_MAT3";
    EVariableType[EVariableType["FLOAT_MAT4"] = "FLOAT_MAT4"] = "FLOAT_MAT4";
    EVariableType[EVariableType["BUFFER"] = "BUFFER"] = "BUFFER";
    EVariableType[EVariableType["SAMPLER_CUBE"] = "SAMPLER_CUBE"] = "SAMPLER_CUBE";
    EVariableType[EVariableType["SAMPLER_2D"] = "SAMPLER_2D"] = "SAMPLER_2D";
    EVariableType[EVariableType["NUMBER_1"] = "NUMBER_1"] = "NUMBER_1";
    EVariableType[EVariableType["STRUCTURE"] = "STRUCTURE"] = "STRUCTURE";
    EVariableType[EVariableType["STRUCTURES"] = "STRUCTURES"] = "STRUCTURES";
    EVariableType[EVariableType["SAMPLER_ARRAY"] = "SAMPLER_ARRAY"] = "SAMPLER_ARRAY";
    EVariableType[EVariableType["FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY";
})(EVariableType || (EVariableType = {}));

var Program = (function (_super) {
    __extends(Program, _super);
    function Program() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.glProgram = null;
        _this._getAttribLocationCache = Hash.create();
        _this._sender = GLSLDataSender.create(_this);
        return _this;
    }
    Program.create = function () {
        var obj = new this();
        return obj;
    };
    Program.prototype.use = function () {
        if (JudgeUtils$1.isEqual(this, ProgramTable.lastUsedProgram)) {
            return;
        }
        ProgramTable.lastUsedProgram = this;
        DeviceManager.getInstance().gl.useProgram(this.glProgram);
        this._sender.disableVertexAttribArray();
        BufferTable.lastBindedArrayBufferListUidStr = null;
    };
    Program.prototype.getAttribLocation = function (name) {
        var pos = null, gl = DeviceManager.getInstance().gl;
        pos = this._getAttribLocationCache.getChild(name);
        if (pos !== void 0) {
            return pos;
        }
        pos = gl.getAttribLocation(this.glProgram, name);
        this._getAttribLocationCache.addChild(name, pos);
        return pos;
    };
    Program.prototype.getUniformLocation = function (name) {
        return this._sender.getUniformLocation(name);
    };
    Program.prototype.sendUniformData = function (name, type, data) {
        if (data === null) {
            return;
        }
        switch (type) {
            case EVariableType.FLOAT_1:
                this._sender.sendFloat1(name, data);
                break;
            case EVariableType.FLOAT_2:
                this._sender.sendFloat2(name, data);
                break;
            case EVariableType.FLOAT_3:
                this._sender.sendFloat3(name, data);
                break;
            case EVariableType.FLOAT_4:
                this._sender.sendFloat4(name, data);
                break;
            case EVariableType.VECTOR_2:
                this._sender.sendVector2(name, data);
                break;
            case EVariableType.VECTOR_3:
                this._sender.sendVector3(name, data);
                break;
            case EVariableType.VECTOR_4:
                this._sender.sendVector4(name, data);
                break;
            case EVariableType.COLOR_3:
                this._sender.sendColor3(name, data);
                break;
            case EVariableType.FLOAT_MAT3:
                this._sender.sendMatrix3(name, data);
                break;
            case EVariableType.FLOAT_MAT4:
                this._sender.sendMatrix4(name, data);
                break;
            case EVariableType.NUMBER_1:
            case EVariableType.SAMPLER_CUBE:
            case EVariableType.SAMPLER_2D:
                this._sender.sendNum1(name, data);
                break;
            case EVariableType.FLOAT_MAT4_ARRAY:
                this._sender.sendMatrix4Array(name, data);
                break;
            case EVariableType.SAMPLER_ARRAY:
                this._sender.sendSampleArray(name, data);
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_INVALID("EVariableType:", type));
                break;
        }
    };
    Program.prototype.sendAttributeBuffer = function (name, type, buffer) {
        var pos = null;
        pos = this.getAttribLocation(name);
        if (pos === -1) {
            return;
        }
        this._sender.addBufferToToSendList(pos, buffer);
    };
    Program.prototype.sendStructureData = function (name, type, data) {
        this.sendUniformData(name, type, data);
    };
    Program.prototype.sendFloat1 = function (name, data) {
        this._sender.sendFloat1(name, data);
    };
    Program.prototype.sendFloat2 = function (name, data) {
        this._sender.sendFloat2(name, data);
    };
    Program.prototype.sendFloat3 = function (name, data) {
        this._sender.sendFloat3(name, data);
    };
    Program.prototype.sendFloat4 = function (name, data) {
        this._sender.sendFloat4(name, data);
    };
    Program.prototype.sendVector2 = function (name, data) {
        this._sender.sendVector2(name, data);
    };
    Program.prototype.sendVector3 = function (name, data) {
        this._sender.sendVector3(name, data);
    };
    Program.prototype.sendVector4 = function (name, data) {
        this._sender.sendVector4(name, data);
    };
    Program.prototype.sendColor3 = function (name, data) {
        this._sender.sendColor3(name, data);
    };
    Program.prototype.sendNum1 = function (name, data) {
        this._sender.sendNum1(name, data);
    };
    Program.prototype.sendMatrix3 = function (name, data) {
        this._sender.sendMatrix3(name, data);
    };
    Program.prototype.sendMatrix4 = function (name, data) {
        this._sender.sendMatrix4(name, data);
    };
    Program.prototype.sendMatrix4Array = function (name, data) {
        this._sender.sendMatrix4Array(name, data);
    };
    Program.prototype.sendSampleArray = function (name, data) {
        this._sender.sendSampleArray(name, data);
    };
    Program.prototype.sendAllBufferData = function () {
        this._sender.sendAllBufferData();
        this._sender.clearBufferList();
    };
    Program.prototype.initWithShader = function (shader) {
        var gl = DeviceManager.getInstance().gl, vs = null, fs = null;
        if (this.glProgram) {
            this.dispose();
        }
        this.glProgram = DeviceManager.getInstance().gl.createProgram();
        vs = shader.createVsShader();
        fs = shader.createFsShader();
        gl.attachShader(this.glProgram, vs);
        gl.attachShader(this.glProgram, fs);
        gl.bindAttribLocation(this.glProgram, 0, "a_position");
        gl.linkProgram(this.glProgram);
        Log$$1.error(gl.getProgramParameter(this.glProgram, gl.LINK_STATUS) === false, gl.getProgramInfoLog(this.glProgram));
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return this;
    };
    Program.prototype.dispose = function () {
        var gl = DeviceManager.getInstance().gl;
        gl.deleteProgram(this.glProgram);
        this.glProgram = null;
        this._sender.dispose();
        this._clearAllCache();
    };
    Program.prototype._clearAllCache = function () {
        this._getAttribLocationCache.removeAllChildren();
        this._sender.clearAllCache();
    };
    return Program;
}(Entity$1));
__decorate([
    requireCheck(function (name, type, buffer) {
        assert(buffer instanceof ArrayBuffer, Log$$1.info.FUNC_MUST_BE("ArrayBuffer"));
        assert(type === EVariableType.BUFFER, Log$$1.info.FUNC_SHOULD("type", "be EVariableType.BUFFER, but actual is " + type));
    })
], Program.prototype, "sendAttributeBuffer", null);
Program = __decorate([
    registerClass("Program")
], Program);

var ShaderLib = (function () {
    function ShaderLib() {
        this.shader = null;
    }
    ShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
    };
    ShaderLib.prototype.init = function () {
    };
    ShaderLib.prototype.dispose = function () {
    };
    return ShaderLib;
}());
__decorate([
    virtual
], ShaderLib.prototype, "sendShaderVariables", null);
__decorate([
    virtual
], ShaderLib.prototype, "init", null);
__decorate([
    virtual
], ShaderLib.prototype, "dispose", null);

var Shader = (function () {
    function Shader() {
        this._attributes = Hash.create();
        this._uniforms = Hash.create();
        this._vsSource = "";
        this._fsSource = "";
        this.libDirty = false;
        this.definitionDataDirty = false;
        this.libs = Collection.create();
        this.sourceBuilder = this.createShaderSourceBuilder();
        this._programCache = null;
    }
    Object.defineProperty(Shader.prototype, "attributes", {
        get: function () {
            return this._attributes;
        },
        set: function (attributes) {
            if (this._isNotEqual(attributes, this._attributes)) {
                this.definitionDataDirty = true;
            }
            this._attributes = attributes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "uniforms", {
        get: function () {
            return this._uniforms;
        },
        set: function (uniforms) {
            if (this._isNotEqual(uniforms, this._uniforms)) {
                this.definitionDataDirty = true;
            }
            this._uniforms = uniforms;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "vsSource", {
        get: function () {
            return this._vsSource;
        },
        set: function (vsSource) {
            if (vsSource !== this._vsSource) {
                this.definitionDataDirty = true;
            }
            this._vsSource = vsSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "fsSource", {
        get: function () {
            return this._fsSource;
        },
        set: function (fsSource) {
            if (fsSource !== this._fsSource) {
                this.definitionDataDirty = true;
            }
            this._fsSource = fsSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "dirty", {
        get: function () {
            return this.libDirty || this.definitionDataDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "program", {
        get: function () {
            return ProgramTable.getProgram(this._getProgramTableKey());
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.createVsShader = function () {
        var gl = DeviceManager.getInstance().gl;
        return this._initShader(gl.createShader(gl.VERTEX_SHADER), this.vsSource);
    };
    Shader.prototype.createFsShader = function () {
        var gl = DeviceManager.getInstance().gl;
        return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this.fsSource);
    };
    Shader.prototype.init = function (material) {
        this.libs.forEach(function (lib) {
            lib.init();
        });
        this.judgeRefreshShader(null, material);
    };
    Shader.prototype.dispose = function () {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.libs.forEach(function (lib) {
            lib.dispose();
        });
        this._clearAllCache();
    };
    Shader.prototype.hasLib = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args[0] instanceof ShaderLib) {
            var lib = args[0];
            return this.libs.hasChild(lib);
        }
        else {
            var _class_1 = args[0];
            return this.libs.hasChildWithFunc(function (lib) {
                return lib instanceof _class_1;
            });
        }
    };
    Shader.prototype.addLib = function (lib) {
        this.libs.addChild(lib);
        lib.shader = this;
        this.libDirty = true;
    };
    Shader.prototype.addShaderLibToTop = function (lib) {
        this.libs.unShiftChild(lib);
        lib.shader = this;
        this.libDirty = true;
    };
    Shader.prototype.getLib = function (libClass) {
        return this.libs.findOne(function (lib) {
            return lib instanceof libClass;
        });
    };
    Shader.prototype.getLibs = function () {
        return this.libs;
    };
    Shader.prototype.removeLib = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.libDirty = true;
        return this.libs.removeChild(args[0]);
    };
    Shader.prototype.removeAllLibs = function () {
        this.libDirty = true;
        this.libs.removeAllChildren();
    };
    Shader.prototype.sortLib = function (func) {
        this.libDirty = true;
        this.libs.sort(func, true);
    };
    Shader.prototype.judgeRefreshShader = function (cmd, material) {
        if (this.libDirty) {
            this.buildDefinitionData(cmd, material);
        }
        if (this.definitionDataDirty) {
            this._programCache = null;
            this._registerAndUpdateProgram();
            this._programCache = null;
        }
        this.libDirty = false;
        this.definitionDataDirty = false;
    };
    Shader.prototype._registerAndUpdateProgram = function () {
        var key = this._getProgramTableKey();
        if (ProgramTable.hasProgram(key)) {
            return;
        }
        ProgramTable.addProgram(key, Program.create());
        this._updateProgram();
    };
    Shader.prototype._updateProgram = function () {
        this.program.initWithShader(this);
    };
    Shader.prototype._getProgramTableKey = function () {
        return this.vsSource + "\n" + this.fsSource;
    };
    Shader.prototype._initShader = function (shader, source) {
        var gl = DeviceManager.getInstance().gl;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return shader;
        }
        else {
            Log$$1.log(gl.getShaderInfoLog(shader));
            Log$$1.log("attributes:\n", this.attributes);
            Log$$1.log("uniforms:\n", this.uniforms);
            Log$$1.log("source:\n", source);
        }
    };
    Shader.prototype._isNotEqual = function (list1, list2) {
        var result = false;
        list1.forEach(function (data, key) {
            var list2Data = list2.getChild(key);
            if (!list2Data || data.type !== list2Data.type || data.value !== list2Data.value) {
                result = true;
                return $BREAK;
            }
        });
        return result;
    };
    Shader.prototype._clearAllCache = function () {
        this._programCache = null;
    };
    return Shader;
}());
__decorate([
    ensureGetter(function (program) {
        it("program should exist(its table key is " + this._getProgramTableKey(), function () {
            index(program).exist;
        }, this);
    }),
    cacheGetter(function () {
        return this._programCache !== null;
    }, function () {
        return this._programCache;
    }, function (program) {
        this._programCache = program;
    })
], Shader.prototype, "program", null);
__decorate([
    execOnlyOnce("_isInit")
], Shader.prototype, "init", null);
__decorate([
    ensure(function () {
        var _this = this;
        it("should set ShaderLib.shader to be this", function () {
            _this.libs.forEach(function (lib) {
                index(lib.shader === _this).true;
            });
        }, this);
        it("libDirty should be true", function () {
            index(_this.libDirty).true;
        }, this);
    })
], Shader.prototype, "addLib", null);
__decorate([
    ensure(function (val, lib) {
        var _this = this;
        it("should add shader lib to the top", function () {
            index(JudgeUtils$1.isEqual(lib, _this.libs.getChild(0))).true;
        }, this);
        it("should set ShaderLib.shader to be this", function () {
            _this.libs.forEach(function (lib) {
                index(lib.shader === _this).true;
            });
        }, this);
        it("libDirty should be true", function () {
            index(_this.libDirty).true;
        }, this);
    })
], Shader.prototype, "addShaderLibToTop", null);

var EVariableCategory;
(function (EVariableCategory) {
    EVariableCategory[EVariableCategory["ENGINE"] = "ENGINE"] = "ENGINE";
    EVariableCategory[EVariableCategory["CUSTOM"] = "CUSTOM"] = "CUSTOM";
})(EVariableCategory || (EVariableCategory = {}));

var BufferUtils = (function () {
    function BufferUtils() {
    }
    BufferUtils.convertArrayToArrayBuffer = function (type, value) {
        var size = this._getBufferSize(type);
        return ArrayBuffer.create(value, size, EBufferType.FLOAT);
    };
    BufferUtils._getBufferSize = function (type) {
        var size = null;
        switch (type) {
            case EVariableType.FLOAT_1:
            case EVariableType.NUMBER_1:
                size = 1;
                break;
            case EVariableType.FLOAT_2:
                size = 2;
                break;
            case EVariableType.FLOAT_3:
                size = 3;
                break;
            case EVariableType.FLOAT_4:
                size = 4;
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_UNEXPECT("EVariableType", type));
                break;
        }
        return size;
    };
    return BufferUtils;
}());
__decorate([
    requireCheck(function (type, value) {
        it("value:" + value + " should be array", function () {
            index(JudgeUtils$1.isArrayExactly(value)).true;
        });
    })
], BufferUtils, "convertArrayToArrayBuffer", null);
BufferUtils = __decorate([
    registerClass("BufferUtils")
], BufferUtils);

var ShaderSourceBuilder = (function () {
    function ShaderSourceBuilder() {
        this.attributes = Hash.create();
        this.uniforms = Hash.create();
        this.vsSource = null;
        this.fsSource = null;
    }
    ShaderSourceBuilder.prototype.dispose = function () {
        this.clearShaderDefinition();
    };
    ShaderSourceBuilder.prototype.convertAttributesData = function () {
        this.attributes
            .filter(function (data) {
            return data.value !== EVariableCategory.ENGINE && JudgeUtils$1.isArrayExactly(data.value);
        })
            .forEach(function (data, key) {
            data.value = BufferUtils.convertArrayToArrayBuffer(data.type, data.value);
        });
    };
    return ShaderSourceBuilder;
}());
__decorate([
    requireCheck(function () {
        this.attributes.forEach(function (data) {
            assert(!JudgeUtils$1.isFloatArray(data.value), Log$$1.info.FUNC_SHOULD_NOT("attribute->value", "be Float array"));
        });
    })
], ShaderSourceBuilder.prototype, "convertAttributesData", null);

var main_begin = "void main(void){\n";
var main_end = "}\n";
var setPos_mvp = "gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * vec4(a_position, 1.0);\n";

var empty$1 = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };

var basic_materialColor_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "vec4 totalColor = vec4(u_color, 1.0);\n" };
var end_basic_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "gl_FragColor = vec4(totalColor.rgb, totalColor.a * u_opacity);\n" };
var common_define = { top: "", define: "#define NULL -1.0\n", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
var common_fragment = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
var common_function = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "mat2 transpose(mat2 m) {\n  return mat2(  m[0][0], m[1][0],   // new col 0\n                m[0][1], m[1][1]    // new col 1\n             );\n  }\nmat3 transpose(mat3 m) {\n  return mat3(  m[0][0], m[1][0], m[2][0],  // new col 0\n                m[0][1], m[1][1], m[2][1],  // new col 1\n                m[0][2], m[1][2], m[2][2]   // new col 1\n             );\n  }\n\nbool isRenderListEmpty(int isRenderListEmpty){\n  return isRenderListEmpty == 1;\n}\n", body: "" };
var common_vertex = { top: "", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
var highp_fragment = { top: "precision highp float;\nprecision highp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
var lowp_fragment = { top: "precision lowp float;\nprecision lowp int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };
var mediump_fragment = { top: "precision mediump float;\nprecision mediump int;\n", define: "", varDeclare: "", funcDeclare: "", funcDefine: "", body: "" };

var _table$2 = Hash.create();
_table$2.addChild(EVariableType.FLOAT_1, "float");
_table$2.addChild(EVariableType.FLOAT_2, "vec2");
_table$2.addChild(EVariableType.FLOAT_3, "vec3");
_table$2.addChild(EVariableType.FLOAT_4, "vec4");
_table$2.addChild(EVariableType.VECTOR_2, "vec2");
_table$2.addChild(EVariableType.VECTOR_3, "vec3");
_table$2.addChild(EVariableType.VECTOR_4, "vec4");
_table$2.addChild(EVariableType.FLOAT_MAT3, "mat3");
_table$2.addChild(EVariableType.FLOAT_MAT4, "mat4");
_table$2.addChild(EVariableType.NUMBER_1, "int");
_table$2.addChild(EVariableType.SAMPLER_CUBE, "samplerCube");
_table$2.addChild(EVariableType.SAMPLER_2D, "sampler2D");
var VariableTypeTable = (function () {
    function VariableTypeTable() {
    }
    VariableTypeTable.getVariableType = function (type) {
        var result = _table$2.getChild(type);
        Log$$1.error(result === void 0, Log$$1.info.FUNC_NOT_EXIST(type, "in VariableTypeTable"));
        return result;
    };
    return VariableTypeTable;
}());
VariableTypeTable = __decorate([
    registerClass("VariableTypeTable")
], VariableTypeTable);

var EngineShaderSourceBuilder = (function (_super) {
    __extends(EngineShaderSourceBuilder, _super);
    function EngineShaderSourceBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsSourceTop = "";
        _this.vsSourceDefine = "";
        _this.vsSourceVarDeclare = "";
        _this.vsSourceFuncDeclare = "";
        _this.vsSourceFuncDefine = "";
        _this.vsSourceBody = "";
        _this.fsSourceTop = "";
        _this.fsSourceDefine = "";
        _this.fsSourceVarDeclare = "";
        _this.fsSourceFuncDeclare = "";
        _this.fsSourceFuncDefine = "";
        _this.fsSourceBody = "";
        _this.vsSourceDefineList = Collection.create();
        _this.fsSourceDefineList = Collection.create();
        _this.vsSourceExtensionList = Collection.create();
        _this.fsSourceExtensionList = Collection.create();
        return _this;
    }
    EngineShaderSourceBuilder.create = function () {
        var obj = new this();
        return obj;
    };
    EngineShaderSourceBuilder.prototype.build = function (libs) {
        this._readLibSource(libs);
        if (this.vsSource === null) {
            this._buildVsSource();
        }
        if (this.fsSource === null) {
            this._buildFsSource();
        }
        this.convertAttributesData();
    };
    EngineShaderSourceBuilder.prototype.clearShaderDefinition = function () {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.vsSourceDefineList.removeAllChildren();
        this.fsSourceDefineList.removeAllChildren();
        this.vsSourceTop = "";
        this.vsSourceDefine = "";
        this.vsSourceVarDeclare = "";
        this.vsSourceFuncDeclare = "";
        this.vsSourceFuncDefine = "";
        this.vsSourceBody = "";
        this.vsSource = null;
        this.fsSourceTop = "";
        this.fsSourceDefine = "";
        this.fsSourceVarDeclare = "";
        this.fsSourceFuncDeclare = "";
        this.fsSourceFuncDefine = "";
        this.fsSourceBody = "";
        this.fsSource = null;
    };
    EngineShaderSourceBuilder.prototype._readLibSource = function (libs) {
        var setSourceLibs = libs.filter(function (lib) {
            return lib.vsSource !== null || lib.fsSource !== null;
        });
        this._judgeAndSetVsSource(setSourceLibs);
        this._judgeAndSetFsSource(setSourceLibs);
        this._judgeAndSetPartSource(libs);
    };
    EngineShaderSourceBuilder.prototype._judgeAndSetVsSource = function (setSourceLibs) {
        var setVsSourceLib = setSourceLibs.findOne(function (lib) {
            return lib.vsSource !== null;
        });
        if (setVsSourceLib) {
            this.vsSource = setVsSourceLib.vsSource;
        }
    };
    EngineShaderSourceBuilder.prototype._judgeAndSetFsSource = function (setSourceLibs) {
        var setFsSourceLib = setSourceLibs.findOne(function (lib) {
            return lib.fsSource !== null;
        });
        if (setFsSourceLib) {
            this.fsSource = setFsSourceLib.fsSource;
        }
    };
    EngineShaderSourceBuilder.prototype._judgeAndSetPartSource = function (libs) {
        var vsSource = this.vsSource, fsSource = this.fsSource, attributes = this.attributes, uniforms = this.uniforms, vsSourceDefineList = this.vsSourceDefineList, fsSourceDefineList = this.fsSourceDefineList, vsSourceExtensionList = this.vsSourceExtensionList, fsSourceExtensionList = this.fsSourceExtensionList, vsSourceTop = "", vsSourceDefine = "", vsSourceVarDeclare = "", vsSourceFuncDeclare = "", vsSourceFuncDefine = "", vsSourceBody = "", fsSourceTop = "", fsSourceDefine = "", fsSourceVarDeclare = "", fsSourceFuncDeclare = "", fsSourceFuncDefine = "", fsSourceBody = "";
        libs.forEach(function (lib) {
            attributes.addChildren(lib.attributes);
            uniforms.addChildren(lib.uniforms);
            if (vsSource === null) {
                vsSourceTop += lib.vsSourceTop;
                vsSourceDefine += lib.vsSourceDefine;
                vsSourceVarDeclare += lib.vsSourceVarDeclare;
                vsSourceFuncDeclare += lib.vsSourceFuncDeclare;
                vsSourceFuncDefine += lib.vsSourceFuncDefine;
                vsSourceBody += lib.vsSourceBody;
                vsSourceDefineList.addChildren(lib.vsSourceDefineList);
                vsSourceExtensionList.addChildren(lib.vsSourceExtensionList);
            }
            if (fsSource === null) {
                fsSourceTop += lib.fsSourceTop;
                fsSourceDefine += lib.fsSourceDefine;
                fsSourceVarDeclare += lib.fsSourceVarDeclare;
                fsSourceFuncDeclare += lib.fsSourceFuncDeclare;
                fsSourceFuncDefine += lib.fsSourceFuncDefine;
                fsSourceBody += lib.fsSourceBody;
                fsSourceDefineList.addChildren(lib.fsSourceDefineList);
                fsSourceExtensionList.addChildren(lib.fsSourceExtensionList);
            }
        });
        if (vsSource === null) {
            this.vsSourceTop = vsSourceTop;
            this.vsSourceDefine = vsSourceDefine;
            this.vsSourceVarDeclare = vsSourceVarDeclare;
            this.vsSourceFuncDeclare = vsSourceFuncDeclare;
            this.vsSourceFuncDefine = vsSourceFuncDefine;
            this.vsSourceBody = vsSourceBody;
        }
        if (fsSource === null) {
            this.fsSourceTop = fsSourceTop;
            this.fsSourceDefine = fsSourceDefine;
            this.fsSourceVarDeclare = fsSourceVarDeclare;
            this.fsSourceFuncDeclare = fsSourceFuncDeclare;
            this.fsSourceFuncDefine = fsSourceFuncDefine;
            this.fsSourceBody = fsSourceBody;
        }
    };
    EngineShaderSourceBuilder.prototype._buildVsSource = function () {
        this.vsSource = this._buildVsSourceTop() + this._buildVsSourceDefine() + this._buildVsSourceVarDeclare() + this._buildVsSourceFuncDeclare() + this._buildVsSourceFuncDefine() + this._buildVsSourceBody();
    };
    EngineShaderSourceBuilder.prototype._buildFsSource = function () {
        this.fsSource = this._buildFsSourceTop() + this._buildFsSourceDefine() + this._buildFsSourceVarDeclare() + this._buildFsSourceFuncDeclare() + this._buildFsSourceFuncDefine() + this._buildFsSourceBody();
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceTop = function () {
        return this._buildVsSourceExtension() + this._getPrecisionSource() + this.vsSourceTop;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceDefine = function () {
        return this._buildSourceDefine(this.vsSourceDefineList) + this.vsSourceDefine;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceExtension = function () {
        return this._buildSourceExtension(this.vsSourceExtensionList);
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceVarDeclare = function () {
        return this._generateAttributeSource() + this._generateUniformSource(this.vsSourceVarDeclare, this.vsSourceFuncDefine, this.vsSourceBody) + this.vsSourceVarDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceFuncDeclare = function () {
        return this.vsSourceFuncDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceFuncDefine = function () {
        return this.vsSourceFuncDefine;
    };
    EngineShaderSourceBuilder.prototype._buildVsSourceBody = function () {
        return main_begin + this.vsSourceBody + main_end;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceTop = function () {
        return this._buildFsSourceExtension() + this._getPrecisionSource() + this.fsSourceTop;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceDefine = function () {
        return this._buildSourceDefine(this.fsSourceDefineList) + this.fsSourceDefine;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceExtension = function () {
        return this._buildSourceExtension(this.fsSourceExtensionList);
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceVarDeclare = function () {
        return this._generateUniformSource(this.fsSourceVarDeclare, this.fsSourceFuncDefine, this.fsSourceBody) + this.fsSourceVarDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceFuncDeclare = function () {
        return this.fsSourceFuncDeclare;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceFuncDefine = function () {
        return this.fsSourceFuncDefine;
    };
    EngineShaderSourceBuilder.prototype._buildFsSourceBody = function () {
        return main_begin + this.fsSourceBody + main_end;
    };
    EngineShaderSourceBuilder.prototype._buildSourceDefine = function (defineList) {
        var result = "";
        defineList.forEach(function (sourceDefine) {
            if (sourceDefine.value === void 0) {
                result += "#define " + sourceDefine.name + "\n";
            }
            else {
                result += "#define " + sourceDefine.name + " " + sourceDefine.value + "\n";
            }
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._buildSourceExtension = function (extensionList) {
        var result = "";
        extensionList.forEach(function (name) {
            result += "#extension " + name + " : enable\n";
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._getPrecisionSource = function () {
        var precision = GPUDetector.getInstance().precision, result = null;
        switch (precision) {
            case EGPUPrecision.HIGHP:
                result = highp_fragment.top;
                break;
            case EGPUPrecision.MEDIUMP:
                result = mediump_fragment.top;
                break;
            case EGPUPrecision.LOWP:
                result = lowp_fragment.top;
                break;
            default:
                result = "";
                break;
        }
        return result;
    };
    EngineShaderSourceBuilder.prototype._generateAttributeSource = function () {
        var result = "";
        this.attributes.filter(function (data, key) {
            return !!data;
        }).forEach(function (data, key) {
            result += "attribute " + VariableTypeTable.getVariableType(data.type) + " " + key + ";\n";
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._generateUniformSource = function (sourceVarDeclare, sourceFuncDefine, sourceBody) {
        var result = "", self = this;
        this.uniforms.filter(function (data, key) {
            return !!data && data.type !== EVariableType.STRUCTURE && data.type !== EVariableType.STRUCTURES && !self._isExistInSource(key, sourceVarDeclare) && (self._isExistInSource(key, sourceFuncDefine) || self._isExistInSource(key, sourceBody));
        }).forEach(function (data, key) {
            result += "uniform " + VariableTypeTable.getVariableType(data.type) + " " + key + ";\n";
        });
        return result;
    };
    EngineShaderSourceBuilder.prototype._isExistInSource = function (key, source) {
        return source.indexOf(key) !== -1;
    };
    return EngineShaderSourceBuilder;
}(ShaderSourceBuilder));
__decorate([
    requireCheck(function (libs) {
        assert(this.vsSource === null, Log$$1.info.FUNC_SHOULD("vsSource", "be null"));
        assert(this.fsSource === null, Log$$1.info.FUNC_SHOULD("fsSource", "be null"));
    })
], EngineShaderSourceBuilder.prototype, "build", null);
EngineShaderSourceBuilder = __decorate([
    registerClass("EngineShaderSourceBuilder")
], EngineShaderSourceBuilder);

var EngineShader = (function (_super) {
    __extends(EngineShader, _super);
    function EngineShader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineShader.prototype.buildDefinitionData = function (cmd, material) {
        this.libs.forEach(function (lib) {
            lib.setShaderDefinition(cmd, material);
        });
        this.sourceBuilder.clearShaderDefinition();
        this.sourceBuilder.build(this.libs);
        this.attributes = this.sourceBuilder.attributes;
        this.uniforms = this.sourceBuilder.uniforms;
        this.vsSource = this.sourceBuilder.vsSource;
        this.fsSource = this.sourceBuilder.fsSource;
    };
    EngineShader.prototype.createShaderSourceBuilder = function () {
        return EngineShaderSourceBuilder.create();
    };
    return EngineShader;
}(Shader));

var CommonShader = (function (_super) {
    __extends(CommonShader, _super);
    function CommonShader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonShader.create = function () {
        var obj = new this();
        return obj;
    };
    CommonShader.prototype.update = function (cmd, material) {
        var program = null;
        this.judgeRefreshShader(cmd, material);
        program = this.program;
        program.use();
        this.libs.forEach(function (lib) {
            lib.sendShaderVariables(program, cmd, material);
        });
    };
    return CommonShader;
}(EngineShader));
CommonShader = __decorate([
    registerClass("CommonShader")
], CommonShader);

var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_position = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_positionVec2 = {
    type: EVariableType.FLOAT_2,
    value: EVariableCategory.ENGINE
};
VariableLib.a_currentFramePosition = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_nextFramePosition = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normal = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_currentFrameNormal = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_nextFrameNormal = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_color = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_texCoord = {
    type: EVariableType.FLOAT_2,
    value: EVariableCategory.ENGINE
};
VariableLib.a_tangent = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_vMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_pMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mvpMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_vpMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_normalMatrix = {
    type: EVariableType.FLOAT_MAT3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_samplerCube0 = {
    type: EVariableType.SAMPLER_CUBE,
    value: EVariableCategory.ENGINE
};
VariableLib.u_sampler2D0 = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_sampler2D1 = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap1Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap2Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap3Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_specularMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_emissionMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_normalMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_reflectionMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_refractionMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_cameraPos = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_refractionRatio = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_reflectivity = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map0SourceRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map1SourceRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapSourceRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map0RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_map1RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMapRepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_combineMode = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mixRatio = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightMapIntensity = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuse = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_specular = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_emission = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_shininess = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightModel = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isBothSide = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_opacity = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_ambient = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_directionLights = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.u_pointLights = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.u_vpMatrixFromLight = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightPos = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_farPlane = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_interpolation = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_tilesHeightNumber = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_tilesWidthNumber = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_amplitude = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_jointColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_time = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_speed = {
    type: EVariableType.VECTOR_2,
    value: EVariableCategory.ENGINE
};
VariableLib.u_shift = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_alphaThreshold = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_fireColor = {
    type: EVariableType.STRUCTURE,
    value: EVariableCategory.ENGINE
};
VariableLib.u_layerHeightDatas = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.u_layerSampler2Ds = {
    type: EVariableType.SAMPLER_ARRAY,
    value: EVariableCategory.ENGINE
};
VariableLib.u_herb1Color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_herb2Color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_herb3Color = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_groundColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_ampScale = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_woodColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_roadColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_skyColor = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_cloudColor = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_brickColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_waveData = {
    type: EVariableType.STRUCTURE,
    value: EVariableCategory.ENGINE
};
VariableLib.u_windMatrix = {
    type: EVariableType.FLOAT_MAT4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMap1Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMap2Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bumpMap3Sampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_levelData = {
    type: EVariableType.STRUCTURE,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_0 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_1 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_2 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_mVec4_3 = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_0 = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_1 = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_normalVec4_2 = {
    type: EVariableType.FLOAT_3,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isRenderListEmpty = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isReflectionRenderListEmpty = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_isRefractionRenderListEmpty = {
    type: EVariableType.NUMBER_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_bitmapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.a_page = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_pageSampler2Ds = {
    type: EVariableType.SAMPLER_ARRAY,
    value: EVariableCategory.ENGINE
};
VariableLib.u_mixMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap1RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap2RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_diffuseMap3RepeatRegion = {
    type: EVariableType.VECTOR_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassMapDatas = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.a_quadIndex = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_windData = {
    type: EVariableType.STRUCTURES,
    value: EVariableCategory.ENGINE
};
VariableLib.a_vertexIndex = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassRangeWidth = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_grassRangeHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainRangeWidth = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainRangeHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainMinHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainMaxHeight = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainSubdivisions = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainScaleY = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_terrainPositionY = {
    type: EVariableType.FLOAT_1,
    value: EVariableCategory.ENGINE
};
VariableLib.u_heightMapSampler = {
    type: EVariableType.SAMPLER_2D,
    value: EVariableCategory.ENGINE
};
VariableLib.u_lightColor = {
    type: EVariableType.VECTOR_3,
    value: EVariableCategory.ENGINE
};
VariableLib.a_jointIndice = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.a_jointWeight = {
    type: EVariableType.FLOAT_4,
    value: EVariableCategory.ENGINE
};
VariableLib.u_jointMatrices = {
    type: EVariableType.FLOAT_MAT4_ARRAY,
    value: EVariableCategory.ENGINE
};
VariableLib = __decorate([
    registerClass("VariableLib")
], VariableLib);

var EngineShaderLib = (function (_super) {
    __extends(EngineShaderLib, _super);
    function EngineShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = Hash.create();
        _this.uniforms = Hash.create();
        _this.vsSourceTop = "";
        _this.vsSourceDefine = "";
        _this.vsSourceVarDeclare = "";
        _this.vsSourceFuncDeclare = "";
        _this.vsSourceFuncDefine = "";
        _this.vsSourceBody = "";
        _this.vsSource = null;
        _this.fsSourceTop = "";
        _this.fsSourceDefine = "";
        _this.fsSourceVarDeclare = "";
        _this.fsSourceFuncDeclare = "";
        _this.fsSourceFuncDefine = "";
        _this.fsSourceBody = "";
        _this.fsSource = null;
        _this.vsSourceDefineList = Collection.create();
        _this.fsSourceDefineList = Collection.create();
        _this.vsSourceExtensionList = Collection.create();
        _this.fsSourceExtensionList = Collection.create();
        return _this;
    }
    EngineShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        var vs = null, fs = null;
        this._clearShaderDefinition();
        vs = this.getVsChunk();
        fs = this.getFsChunk();
        vs && this.setVsSource(vs);
        fs && this.setFsSource(fs);
    };
    EngineShaderLib.prototype.sendAttributeBuffer = function (program, name, data) {
        program.sendAttributeBuffer(name, EVariableType.BUFFER, data);
    };
    EngineShaderLib.prototype.sendUniformData = function (program, name, data) {
        program.sendUniformData(name, VariableLib[name].type, data);
    };
    EngineShaderLib.prototype.getVsChunk = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var chunk = args.length === 0 ? this.vsChunk : args[0];
        return this._getChunk(chunk, EShaderLibType.vs);
    };
    EngineShaderLib.prototype.getFsChunk = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var chunk = args.length === 0 ? this.fsChunk : args[0];
        return this._getChunk(chunk, EShaderLibType.fs);
    };
    EngineShaderLib.prototype.setVsSource = function (vs, operator) {
        if (operator === void 0) { operator = "="; }
        if (JudgeUtils$1.isString(vs)) {
            this.vsSource = vs;
        }
        else {
            this._setSource(vs, EShaderLibType.vs, operator);
        }
    };
    EngineShaderLib.prototype.setFsSource = function (fs, operator) {
        if (operator === void 0) { operator = "="; }
        if (JudgeUtils$1.isString(fs)) {
            this.fsSource = fs;
        }
        else {
            this._setSource(fs, EShaderLibType.fs, operator);
        }
    };
    EngineShaderLib.prototype.addAttributeVariable = function (variableArr) {
        this._addVariable(this.attributes, variableArr);
    };
    EngineShaderLib.prototype.addUniformVariable = function (variableArr) {
        this._addVariable(this.uniforms, variableArr);
    };
    EngineShaderLib.prototype._addVariable = function (target, variableArr) {
        variableArr.forEach(function (variable) {
            assert(VariableLib[variable], Log$$1.info.FUNC_SHOULD(variable, "exist in VariableLib"));
            target.addChild(variable, VariableLib[variable]);
        });
    };
    EngineShaderLib.prototype._clearShaderDefinition = function () {
        this.attributes.removeAllChildren();
        this.uniforms.removeAllChildren();
        this.vsSourceDefineList.removeAllChildren();
        this.fsSourceDefineList.removeAllChildren();
        this.vsSourceExtensionList.removeAllChildren();
        this.fsSourceExtensionList.removeAllChildren();
        this.vsSourceTop = "";
        this.vsSourceDefine = "";
        this.vsSourceVarDeclare = "";
        this.vsSourceFuncDeclare = "";
        this.vsSourceFuncDefine = "";
        this.vsSourceBody = "";
        this.vsSource = null;
        this.fsSourceTop = "";
        this.fsSourceDefine = "";
        this.fsSourceVarDeclare = "";
        this.fsSourceFuncDeclare = "";
        this.fsSourceFuncDefine = "";
        this.fsSourceBody = "";
        this.fsSource = null;
    };
    EngineShaderLib.prototype._getChunk = function (chunk, sourceType) {
        var key = null;
        if (chunk === null) {
            return empty$1;
        }
        return chunk;
    };
    EngineShaderLib.prototype._setSource = function (chunk, sourceType, operator) {
        if (!chunk) {
            return;
        }
        switch (operator) {
            case "+":
                this[sourceType + "SourceTop"] += chunk.top;
                this[sourceType + "SourceDefine"] += chunk.define;
                this[sourceType + "SourceVarDeclare"] += chunk.varDeclare;
                this[sourceType + "SourceFuncDeclare"] += chunk.funcDeclare;
                this[sourceType + "SourceFuncDefine"] += chunk.funcDefine;
                this[sourceType + "SourceBody"] += chunk.body;
                break;
            case "=":
                this[sourceType + "SourceTop"] = chunk.top;
                this[sourceType + "SourceDefine"] = chunk.define;
                this[sourceType + "SourceVarDeclare"] = chunk.varDeclare;
                this[sourceType + "SourceFuncDeclare"] = chunk.funcDeclare;
                this[sourceType + "SourceFuncDefine"] = chunk.funcDefine;
                this[sourceType + "SourceBody"] = chunk.body;
                break;
            default:
                Log$$1.error(true, Log$$1.info.FUNC_INVALID("opertor:", operator));
                break;
        }
    };
    return EngineShaderLib;
}(ShaderLib));
__decorate([
    virtual
], EngineShaderLib.prototype, "setShaderDefinition", null);
__decorate([
    requireCheck(function (program, name, data) {
        assert(!!VariableLib[name], name + " should exist in VariableLib");
    })
], EngineShaderLib.prototype, "sendUniformData", null);
__decorate([
    requireCheck(function () {
        assert(this.vsSource === null, Log$$1.info.FUNC_SHOULD("vsSource", "be null"));
    })
], EngineShaderLib.prototype, "setVsSource", null);
__decorate([
    requireCheck(function () {
        assert(this.fsSource === null, Log$$1.info.FUNC_SHOULD("fsSource", "be null"));
    })
], EngineShaderLib.prototype, "setFsSource", null);
__decorate([
    requireCheck(function (target, variableArr) {
        variableArr.forEach(function (variable) {
            it("should exist in VariableLib", function () {
                index(VariableLib[variable]).exist;
            });
        });
    })
], EngineShaderLib.prototype, "_addVariable", null);
var EShaderLibType;
(function (EShaderLibType) {
    EShaderLibType[EShaderLibType["vs"] = "vs"] = "vs";
    EShaderLibType[EShaderLibType["fs"] = "fs"] = "fs";
})(EShaderLibType || (EShaderLibType = {}));

var CommonShaderLib = (function (_super) {
    __extends(CommonShaderLib, _super);
    function CommonShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = common_vertex;
        _this.fsChunk = common_fragment;
        return _this;
    }
    CommonShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    CommonShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        this.sendUniformData(program, "u_vMatrix", cmd.vMatrix);
        this.sendUniformData(program, "u_pMatrix", cmd.pMatrix);
        this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
    };
    CommonShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        this.addUniformVariable(["u_vMatrix", "u_pMatrix", "u_mMatrix"]);
        this.vsSourceDefine = common_define.define + common_vertex.define;
        this.vsSourceFuncDefine = common_function.funcDefine + common_vertex.funcDefine;
        this.fsSourceDefine = common_define.define + common_fragment.define;
        this.fsSourceFuncDefine = common_function.funcDefine + common_fragment.funcDefine;
    };
    return CommonShaderLib;
}(EngineShaderLib));
CommonShaderLib = __decorate([
    registerClass("CommonShaderLib")
], CommonShaderLib);

var VerticeCommonShaderLib = (function (_super) {
    __extends(VerticeCommonShaderLib, _super);
    function VerticeCommonShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = null;
        return _this;
    }
    VerticeCommonShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    VerticeCommonShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        this._sendAttributeVariables(program, cmd);
    };
    VerticeCommonShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        this.addAttributeVariable(["a_position"]);
    };
    VerticeCommonShaderLib.prototype._sendAttributeVariables = function (program, cmd) {
        var verticeBuffer = cmd.buffers.getChild(EBufferDataType.VERTICE);
        if (!verticeBuffer) {
            return;
        }
        this.sendAttributeBuffer(program, "a_position", verticeBuffer);
    };
    return VerticeCommonShaderLib;
}(EngineShaderLib));
VerticeCommonShaderLib = __decorate([
    registerClass("VerticeCommonShaderLib")
], VerticeCommonShaderLib);

var ShaderLibUtils = (function () {
    function ShaderLibUtils() {
    }
    ShaderLibUtils.addVerticeShaderLib = function (geometry, shader) {
        shader.addLib(VerticeCommonShaderLib.create());
    };
    return ShaderLibUtils;
}());
ShaderLibUtils = __decorate([
    registerClass("ShaderLibUtils")
], ShaderLibUtils);

var EndShaderLib = (function (_super) {
    __extends(EndShaderLib, _super);
    function EndShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = end_basic_fragment;
        return _this;
    }
    EndShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    EndShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        program.sendAllBufferData();
    };
    return EndShaderLib;
}(EngineShaderLib));
EndShaderLib = __decorate([
    registerClass("EndShaderLib")
], EndShaderLib);

var EngineMaterial = (function (_super) {
    __extends(EngineMaterial, _super);
    function EngineMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EngineMaterial.prototype.init = function () {
        this._addTopShaderLib();
        this.addShaderLib();
        this._addEndShaderLib();
        _super.prototype.init.call(this);
    };
    EngineMaterial.prototype.addShaderLib = function () {
    };
    EngineMaterial.prototype.createShader = function () {
        return CommonShader.create();
    };
    EngineMaterial.prototype._addTopShaderLib = function () {
        this.shader.addLib(CommonShaderLib.create());
        ShaderLibUtils.addVerticeShaderLib(this.geometry, this.shader);
    };
    EngineMaterial.prototype._addShaderLibToTop = function (lib) {
        this.shader.addShaderLibToTop(lib);
    };
    EngineMaterial.prototype._addEndShaderLib = function () {
        this.shader.addLib(EndShaderLib.create());
    };
    return EngineMaterial;
}(Material));
__decorate([
    virtual
], EngineMaterial.prototype, "addShaderLib", null);

var BasicMaterialColorShaderLib = (function (_super) {
    __extends(BasicMaterialColorShaderLib, _super);
    function BasicMaterialColorShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = basic_materialColor_fragment;
        return _this;
    }
    BasicMaterialColorShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    BasicMaterialColorShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        this.sendUniformData(program, "u_color", material.color.toVector3());
    };
    BasicMaterialColorShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        this.addUniformVariable(["u_color"]);
    };
    return BasicMaterialColorShaderLib;
}(EngineShaderLib));
BasicMaterialColorShaderLib = __decorate([
    registerClass("BasicMaterialColorShaderLib")
], BasicMaterialColorShaderLib);

var BasicShaderLib = (function (_super) {
    __extends(BasicShaderLib, _super);
    function BasicShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = null;
        return _this;
    }
    BasicShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    BasicShaderLib.prototype.sendShaderVariables = function (program, cmd, material) {
        this.sendUniformData(program, "u_opacity", material.opacity);
    };
    BasicShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        this.addUniformVariable(["u_opacity"]);
        this.vsSourceBody = setPos_mvp;
    };
    return BasicShaderLib;
}(EngineShaderLib));
BasicShaderLib = __decorate([
    registerClass("BasicShaderLib")
], BasicShaderLib);

var EndBasicShaderLib = (function (_super) {
    __extends(EndBasicShaderLib, _super);
    function EndBasicShaderLib() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vsChunk = null;
        _this.fsChunk = end_basic_fragment;
        return _this;
    }
    EndBasicShaderLib.create = function () {
        var obj = new this();
        return obj;
    };
    EndBasicShaderLib.prototype.setShaderDefinition = function (cmd, material) {
        _super.prototype.setShaderDefinition.call(this, cmd, material);
        if (material.alphaTest !== null) {
            this.fsSourceBody += "if (gl_FragColor.a < " + material.alphaTest + "){\n    discard;\n}\n";
        }
    };
    return EndBasicShaderLib;
}(EngineShaderLib));
EndBasicShaderLib = __decorate([
    registerClass("EndBasicShaderLib")
], EndBasicShaderLib);

var StandardBasicMaterial = (function (_super) {
    __extends(StandardBasicMaterial, _super);
    function StandardBasicMaterial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.opacity = 1.0;
        _this.alphaTest = null;
        return _this;
    }
    StandardBasicMaterial.prototype.addExtendShaderLib = function () {
    };
    StandardBasicMaterial.prototype.addShaderLib = function () {
        var envMap = null;
        this.shader.addLib(BasicMaterialColorShaderLib.create());
        this.shader.addLib(BasicShaderLib.create());
        this.addExtendShaderLib();
        this.shader.addLib(EndBasicShaderLib.create());
    };
    return StandardBasicMaterial;
}(EngineMaterial));
__decorate([
    cloneAttributeAsBasicType()
], StandardBasicMaterial.prototype, "opacity", void 0);
__decorate([
    cloneAttributeAsBasicType()
], StandardBasicMaterial.prototype, "alphaTest", void 0);
__decorate([
    virtual
], StandardBasicMaterial.prototype, "addExtendShaderLib", null);

var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicMaterial.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    return BasicMaterial;
}(StandardBasicMaterial));
BasicMaterial = __decorate([
    registerClass("BasicMaterial")
], BasicMaterial);

var EVariableSemantic;
(function (EVariableSemantic) {
    EVariableSemantic[EVariableSemantic["POSITION"] = "POSITION"] = "POSITION";
    EVariableSemantic[EVariableSemantic["NORMAL"] = "NORMAL"] = "NORMAL";
    EVariableSemantic[EVariableSemantic["TEXCOORD"] = "TEXCOORD"] = "TEXCOORD";
    EVariableSemantic[EVariableSemantic["TANGENT"] = "TANGENT"] = "TANGENT";
    EVariableSemantic[EVariableSemantic["COLOR"] = "COLOR"] = "COLOR";
    EVariableSemantic[EVariableSemantic["MODEL"] = "MODEL"] = "MODEL";
    EVariableSemantic[EVariableSemantic["VIEW"] = "VIEW"] = "VIEW";
    EVariableSemantic[EVariableSemantic["PROJECTION"] = "PROJECTION"] = "PROJECTION";
    EVariableSemantic[EVariableSemantic["MODEL_VIEW"] = "MODEL_VIEW"] = "MODEL_VIEW";
    EVariableSemantic[EVariableSemantic["MODEL_VIEW_PROJECTION"] = "MODEL_VIEW_PROJECTION"] = "MODEL_VIEW_PROJECTION";
    EVariableSemantic[EVariableSemantic["MODEL_INVERSE"] = "MODEL_INVERSE"] = "MODEL_INVERSE";
    EVariableSemantic[EVariableSemantic["VIEW_INVERSE"] = "VIEW_INVERSE"] = "VIEW_INVERSE";
    EVariableSemantic[EVariableSemantic["PROJECTION_INVERSE"] = "PROJECTION_INVERSE"] = "PROJECTION_INVERSE";
    EVariableSemantic[EVariableSemantic["MODEL_VIEW_INVERSE"] = "MODEL_VIEW_INVERSE"] = "MODEL_VIEW_INVERSE";
    EVariableSemantic[EVariableSemantic["MODEL_VIEW_PROJECTION_INVERSE"] = "MODEL_VIEW_PROJECTION_INVERSE"] = "MODEL_VIEW_PROJECTION_INVERSE";
    EVariableSemantic[EVariableSemantic["MODEL_INVERSE_TRANSPOSE"] = "MODEL_INVERSE_TRANSPOSE"] = "MODEL_INVERSE_TRANSPOSE";
    EVariableSemantic[EVariableSemantic["MODEL_VIEW_INVERSE_TRANSPOSE"] = "MODEL_VIEW_INVERSE_TRANSPOSE"] = "MODEL_VIEW_INVERSE_TRANSPOSE";
    EVariableSemantic[EVariableSemantic["VIEWPORT"] = "VIEWPORT"] = "VIEWPORT";
})(EVariableSemantic || (EVariableSemantic = {}));

var _table$3 = Hash.create();
_table$3.addChild("lightMap", "u_lightMapSampler");
_table$3.addChild("diffuseMap", "u_diffuseMapSampler");
_table$3.addChild("diffuseMap1", "u_diffuseMap1Sampler");
_table$3.addChild("diffuseMap2", "u_diffuseMap2Sampler");
_table$3.addChild("diffuseMap3", "u_diffuseMap3Sampler");
_table$3.addChild("specularMap", "u_specularMapSampler");
_table$3.addChild("emissionMap", "u_emissionMapSampler");
_table$3.addChild("normalMap", "u_normalMapSampler");
_table$3.addChild("reflectionMap", "u_reflectionMapSampler");
_table$3.addChild("refractionMap", "u_refractionMapSampler");
_table$3.addChild("bitmap", "u_bitmapSampler");
_table$3.addChild("bumpMap", "u_bumpMapSampler");
_table$3.addChild("bumpMap1", "u_bumpMap1Sampler");
_table$3.addChild("bumpMap2", "u_bumpMap2Sampler");
_table$3.addChild("bumpMap3", "u_bumpMap3Sampler");
_table$3.addChild("mixMap", "u_mixMapSampler");
_table$3.addChild("grassMap", "u_grassMapSampler");
_table$3.addChild("heightMap", "u_heightMapSampler");
var VariableNameTable = (function () {
    function VariableNameTable() {
    }
    VariableNameTable.getVariableName = function (name) {
        return _table$3.getChild(name);
    };
    return VariableNameTable;
}());
__decorate([
    ensure(function (variableName) {
        it("variableName should in VariableNameTable", function () {
            index(variableName).exist;
        });
    })
], VariableNameTable, "getVariableName", null);
VariableNameTable = __decorate([
    registerClass("VariableNameTable")
], VariableNameTable);

var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.clamp = function (num, below, up) {
        if (num < below) {
            return below;
        }
        else if (num > up) {
            return up;
        }
        return num;
    };
    MathUtils.bigThan = function (num, below) {
        return num < below ? below : num;
    };
    MathUtils.generateZeroToOne = function () {
        return Math.random();
    };
    MathUtils.generateMinToMax = function (min, max) {
        return Math.random() * (max + 1 - min) + min;
    };
    MathUtils.generateInteger = function (min, max) {
        return Math.floor(this.generateMinToMax(min, max));
    };
    MathUtils.mod = function (a, b) {
        var n = Math.floor(a / b);
        a -= n * b;
        if (a < 0) {
            a += b;
        }
        return a;
    };
    MathUtils.maxFloorIntegralMultiple = function (a, b) {
        if (b == 0) {
            return a;
        }
        if (a < b) {
            return 0;
        }
        return Math.floor(a / b) * b;
    };
    return MathUtils;
}());
__decorate([
    requireCheck(function (min, max) {
        it("min should <= max", function () {
            index(min).lte(max);
        });
    })
], MathUtils, "generateMinToMax", null);
__decorate([
    ensure(function (val) {
        it("result should >= 0", function () {
            index(val).gte(0);
        });
    })
], MathUtils, "mod", null);
__decorate([
    requireCheck(function (a, b) {
        it("a,b should >= 0", function () {
            index(a).gte(0);
            index(b).gte(0);
        });
    }),
    ensure(function (val) {
        it("result should >= 0", function () {
            index(val).gte(0);
        });
    })
], MathUtils, "maxFloorIntegralMultiple", null);
MathUtils = __decorate([
    registerClass("MathUtils")
], MathUtils);

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
        return root$2.performance.now();
    };
    return CommonTimeController;
}(TimeController));
CommonTimeController = __decorate([
    registerClass("CommonTimeController")
], CommonTimeController);

export { Camera, BasicCameraController, CameraController, PerspectiveCamera, ComponentInitOrderTable, BoxGeometry, BasicBufferContainer, BasicGeometryData, BufferContainer, CommonBufferContainer, GeometryData, Geometry, GeometryUtils, MeshRenderer, RendererComponent, ETransformState, ThreeDTransform, Transform, DebugConfig, Component, Director, Entity$1 as Entity, EntityObject, GameObject, ComponentManager, EntityObjectManager, BufferTable, BufferTableKey, ProgramTable, GameObjectScene, Scene, SceneDispatcher, Main$1 as Main, MainData, cacheGetter, cache, cacheBufferForBufferContainer, cacheBufferForBufferContainerWithFuncParam, cloneAttributeAsBasicType, cloneAttributeAsCloneable, cloneAttributeAsCustomType, CloneUtils, CloneType, assert, describe, it, requireCheck, ensure, requireGetterAndSetter, requireGetter, requireSetter, ensureGetterAndSetter, ensureGetter, ensureSetter, invariant, execOnlyOnce, registerClass, singleton, virtual, root$2 as root, DeviceManager, EDepthFunction, ESide, EPolygonOffsetMode, EBlendFunc, EBlendEquation, EBlendType, ECanvasType, EScreenSize, GPUDetector, EGPUPrecision, CustomEventBinder, CustomEventRegister, DomEventBinder, DomEventRegister, EventBinder, EventRegister, CustomEventDispatcher, DomEventDispatcher, EventDispatcher, EEngineEvent, EventManager, EventBinderFactory, EventDispatcherFactory, EventHandlerFactory, CustomEventHandler, DomEventHandler, EventHandler, KeyboardEventHandler, MouseEventHandler, PointEventHandler, TouchEventHandler, CustomEvent, DomEvent, EEventPhase, EEventType, EMouseButton, Event, EEventName, EventNameHandler, EventTable, KeyboardEvent, MouseEvent, MousePointEvent, PointEvent, TouchEvent, TouchPointEvent, CustomEventListenerMap, DomEventListenerMap, EventListenerMap, EventUtils$1 as EventUtils, BasicMaterial, EngineMaterial, Material, ShaderManager, StandardBasicMaterial, DEG_TO_RAD, RAD_TO_DEG, Matrix3, Matrix4, Quaternion, Vector2, Vector3, Vector4, ArrayBuffer, Buffer$1 as Buffer, BufferDataTable, CommonBuffer, EBufferDataType, EBufferType, EBufferUsage, ElementBuffer, QuadCommand, RenderCommand, SingleDrawCommand, EDrawMode, GlUtils, GLSLDataSender, Program, Renderer, WebGLRenderer, BasicMaterialColorShaderLib, BasicShaderLib, EndBasicShaderLib, CommonShaderLib, EndShaderLib, VerticeCommonShaderLib, EngineShaderLib, ShaderLib, CommonShader, EngineShader, Shader, EngineShaderSourceBuilder, ShaderSourceBuilder, EVariableCategory, EVariableSemantic, EVariableType, VariableLib, VariableNameTable, VariableTypeTable, BasicState, WebGLState, Color, Face3, Point, RectRegion, ViewWebGL, ArrayUtils, BufferUtils, ClassUtils, JudgeUtils$1 as JudgeUtils, Log$$1 as Log, MathUtils, RenderUtils, ShaderLibUtils, SortUtils, CommonTimeController, DirectorTimeController, TimeController, CompileConfig };
//# sourceMappingURL=wd.module.js.map
