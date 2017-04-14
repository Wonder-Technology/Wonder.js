(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

	function initShaders(gl, vshader, fshader) {
	    var program = createProgram(gl, vshader, fshader);
	    if (!program) {
	        console.log('Failed to create program');
	        return false;
	    }
	    gl.useProgram(program);
	    gl.program = program;
	    return true;
	}
	function createProgram(gl, vshader, fshader) {
	    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
	    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
	    if (!vertexShader || !fragmentShader) {
	        return null;
	    }
	    var program = gl.createProgram();
	    if (!program) {
	        return null;
	    }
	    gl.attachShader(program, vertexShader);
	    gl.attachShader(program, fragmentShader);
	    gl.linkProgram(program);
	    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	    if (!linked) {
	        var error = gl.getProgramInfoLog(program);
	        console.log('Failed to link program: ' + error);
	        gl.deleteProgram(program);
	        gl.deleteShader(fragmentShader);
	        gl.deleteShader(vertexShader);
	        return null;
	    }
	    return program;
	}
	function loadShader(gl, type, source) {
	    var shader = gl.createShader(type);
	    if (shader == null) {
	        console.log('unable to create shader');
	        return null;
	    }
	    gl.shaderSource(shader, source);
	    gl.compileShader(shader);
	    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	    if (!compiled) {
	        var error = gl.getShaderInfoLog(shader);
	        console.log('Failed to compile shader: ' + error);
	        gl.deleteShader(shader);
	        return null;
	    }
	    return shader;
	}
	function getWebGLContext(canvas) {
	    var gl = setupWebGL(canvas);
	    if (!gl)
	        return null;
	    return gl;
	}
	var setupWebGL = function (canvas) {
	    if (canvas.addEventListener) {
	        canvas.addEventListener("webglcontextcreationerror", function (event) {
	            throw new Error(event.statusMessage);
	        }, false);
	    }
	    var context = create3DContext(canvas);
	    if (!context) {
	        throw new Error("error");
	    }
	    return context;
	};
	var create3DContext = function (canvas) {
	    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	    var context = null;
	    for (var ii = 0; ii < names.length; ++ii) {
	        try {
	            context = canvas.getContext(names[ii]);
	        }
	        catch (e) { }
	        if (context) {
	            break;
	        }
	    }
	    return context;
	};

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
	            this.obj === true
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
	        it("should exist class name", function () {
	            index_1(className).exist;
	            index_1(className !== "").true;
	        });
	    })
	], ClassUtils, "getClassNameByInstance", null);
	__decorate([
	    ensure(function (className) {
	        it("should exist class name", function () {
	            index_1(className).exist;
	            index_1(className !== "").true;
	        });
	    })
	], ClassUtils, "getClassNameByClass", null);

	function registerClass(className) {
	    return function (_class) {
	        ClassUtils.addClassNameAttributeToClass(className, _class);
	        ClassUtils.addClass(className, _class);
	    };
	}

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
	        it("axis's component shouldn't all be zero", function () {
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

	onmessage = function (e) {
	    if (e.data.rAF) {
	        _render(e.data.renderData);
	    }
	    else if (e.data.canvas) {
	        _init(e.data.canvas);
	    }
	};
	var a_Position;
	var vertices;
	var vertexBuffer;
	var u_ModelMatrix;
	var gl;
	var n;
	var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' +
	    'uniform mat4 u_ModelMatrix;\n' +
	    'void main() {\n' +
	    '  gl_Position = u_ModelMatrix * a_Position;\n' +
	    '}\n';
	var FSHADER_SOURCE = 'void main() {\n' +
	    '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
	    '}\n';
	var _init = function (canvas) {
	    gl = getWebGLContext(canvas);
	    if (!gl) {
	        console.log('Failed to get the rendering context for WebGL');
	        return;
	    }
	    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	        console.log('Failed to intialize shaders.');
	        return;
	    }
	    n = _initVertexBuffers(gl);
	    if (n < 0) {
	        console.log('Failed to set the positions of the vertices');
	        return;
	    }
	    _initUniformBuffers(gl);
	};
	var _initVertexBuffers = function (gl) {
	    vertices = new Float32Array([
	        -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5
	    ]);
	    var n = 4;
	    vertexBuffer = gl.createBuffer();
	    if (!vertexBuffer) {
	        console.log('Failed to create the buffer object');
	        return -1;
	    }
	    return n;
	};
	var _initUniformBuffers = function (gl) {
	    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	    if (!u_ModelMatrix) {
	        console.log('Failed to get the storage location of u_ModelMatrix');
	        return;
	    }
	};
	var _render = function (_a) {
	    var position = _a.position;
	    _sendData(gl, position);
	    gl.clearColor(0, 0, 0, 1);
	    gl.clear(gl.COLOR_BUFFER_BIT);
	    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
	    gl.commit();
	};
	var _sendVertexData = function (a_Position, vertices, vertexBuffer, gl) {
	    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
	    gl.enableVertexAttribArray(a_Position);
	};
	var _sendUniformData = function (position, u_ModelMatrix, gl) {
	    var modelMatrix = Matrix4.create();
	    modelMatrix.setTranslate(position, 0, 0);
	    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.values);
	};
	var _sendData = function (gl, position) {
	    _sendVertexData(a_Position, vertices, vertexBuffer, gl);
	    _sendUniformData(position, u_ModelMatrix, gl);
	};

})));
//# sourceMappingURL=renderWorker.js.map
