beforeEach(function () {
    function _isSpyed(method) {
        return !!method.calls;
    }

    jasmine.addMatchers({
        toBeFunction: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: Object.prototype.toString.call(actual, null) === "[object Function]"
                    }
                }
            };
        },
        toBeString: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: Object.prototype.toString.call(actual, null) === "[object String]"
                    }
                }
            };
        },
        toBeArray: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: Object.prototype.toString.call(actual, null) === "[object Array]"
                    }
                }
            };
        },
        toBeNumber: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: Object.prototype.toString.call(actual, null) === "[object Number]"
                    }
                }
            };
        },
        toBeSame: function (expected) {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual === expected
                    }
                }
            };
        },
        //判断是否为jQuery对象
        toBejQuery: function () {
            return {
                compare: function (actual, expected) {
                    if (!jQuery) {
                        throw new Error("jQuery未定义！");
                    }

                    return {
                        pass: actual instanceof jQuery
                    }
                }
            };
        },
        //判断是否为canvas对象
        toBeCanvas: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: Object.prototype.toString.call(actual) === "[object HTMLCanvasElement]"
                    }
                }
            };
        },
        toBeInstanceOf: function (expected) {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual instanceof expected
                    }
                }
            };
        },
        //判断是否为同一个数组（引用同一个数组）
        toBeSameArray: function (expected) {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual === expected
                    }
                }
            };
        },
        toBeExist: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual !== undefined && actual !== null,
                        message: "Expected to exist, but actual is undefined or null"
                    }
                },
                negativeCompare: function(actual, expected) {
                    return {
                        pass: !(actual !== undefined && actual !== null),
                        message: "Expected not to exist, but actual is exist"
                    }
                }
            };
        },
        //包含字符串
        toContain: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual.indexOf(expected) >= 0
                    }
                }
            };
        },
        /**
         * judge whether both type is equal(recursion)

         expect({a: 1, b: {c: ""}}).toTypeEqual({a: 2, b:{c: "aaa"}});  //通过

         * @param expected
         * @returns
         */
        toTypeEqual: function () {
            return {
                compare: function (actual, expected) {
                    var like = function (expected, actual) {
                        var i = null,
                            toStr = Object.prototype.toString,
                            sArr = "[object Array]",
                            sOb = "[object Object]",
                            type = null;

                        for (i in expected) {
                            if (expected.hasOwnProperty(i)) {
                                type = toStr.call(expected[i]);

                                if (type !== toStr.call(actual[i])) {
                                    return false;
                                }

                                if (type === sArr || type === sOb) {
                                    if (!arguments.callee(expected[i], actual[i])) {
                                        return false;
                                    }
                                }
                            }
                        }

                        return true;
                    }

                    return {
                        pass: like(expected, actual)
                    }
                }
            };
        },
        /**
         * 判断是否进行了断言
         * 用法：expect(function(){xxx}).toAssert();
         * @param expected
         * @returns {boolean}
         */
        toAssert: function () {
            return {
                compare: function (actual, expected) {
                    if (!_isSpyed(YE.assert)) {
                        spyOn(YE, "assert");
                    }

                    actual();

                    if (expected) {
                        return {
                            pass: YE.assert.calls.any() === true
                                && YE.assert.calls.mostRecent().args[0] === false
                                && YE.assert.calls.mostRecent().args[1] === expected
                        }
                    }

                    return {
                        pass: YE.assert.calls.any() === true && YE.assert.calls.mostRecent().args[0] === false
                    }
                }
            };
        },
        toFail: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: false,
                        message: expected || "fail"
                    }
                }
            };
        },
        toPass: function(){
            return {
                compare: function (actual, expected) {
                    return {
                        pass: true,
                        message: expected || "pass"
                    }
                }
            };
        }
    });


    /*!
     modify existed matcher
     */
    jasmine.addMatchers({
        toBeTruthy: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: actual === true
                    }
                }
            };
        },
        toBeFalsy: function () {
            return {
                compare: function (actual) {
                    return {
                        pass: actual === false
                    }
                }
            };
        },
        toThrow: function () {
            return {
                compare: function (actual, expectedMsg) {
                    var result = false;
                    var resultMsg = "";
                    var exception;

                    try {
                        actual();
                    } catch (e) {
                        exception = e;
                    }
                    finally {
                        if(exception){
                            if(!expectedMsg){
                                result = true;
                                resultMsg = "";
                            }
                            else{
                                if(exception.message.indexOf(expectedMsg) > -1){
                                    result = true;
                                    resultMsg = "";
                                }
                                else{
                                    result = false;
                                    resultMsg = "expect error message to contain:" + expectedMsg + ", but actual the error message is:" + exception.message;
                                }
                            }
                        }
                        else{
                            result = false;
                            resultMsg = "expect to be error, but actual is not error";
                        }

                        return {
                            pass: result,
                            message: resultMsg
                        }
                    }
                },
                negativeCompare: function (actual, expected) {
                    var result = false;
                    var resultMsg = "";
                    var exception;

                    try {
                        actual();
                    } catch (e) {
                        exception = e;
                    }
                    finally {
                        if(exception){
                            result = false;

                            resultMsg = "expect not to be error, but actual is error";
                        }
                        else{
                            result = true;
                        }

                        return {
                            pass: result,
                            message: resultMsg
                        }
                    }
                }
            };
        }
    });


    (function (jasmine) {
        //* 引入YTool的judge和convert方法

        var Tool = {};
        var global = window;
        /**
         * 判断类型
         */
        Tool.judge = (function () {
            return {
                /**
                 * 判断浏览器类型
                 */
                browser: {
                    //ie: +[1, ],   //有问题！在ie下“+[1, ]”居然为false！！！！？？？
                    isIE: function () {
                        return !!(document.all && navigator.userAgent.indexOf('Opera') === -1);
                    },
                    //不能用===，因为navigator.appVersion.match(/MSIE\s\d/i)为object类型，不是string类型
                    isIE7: function () {
                        return navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 7";
                    },
                    isIE8: function () {
                        return navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 8";
                    },
                    isIE9: function () {
                        return navigator.appVersion.match(/MSIE\s\d/i) == "MSIE 9";
                    },
                    isFF: function () {
                        return navigator.userAgent.indexOf("Firefox") >= 0 && true;
                    },
                    isOpera: function () {
                        return  navigator.userAgent.indexOf("Opera") >= 0 && true;
                    },
                    isChrome: function () {
                        return navigator.userAgent.indexOf("Chrome") >= 0 && true;
                    }
                },
                /**
                 * 判断是否为jQuery对象
                 */
                isjQuery: function (ob) {
                    if (!global.jQuery) {
                        return false;
                    }

                    return ob instanceof global.jQuery;
                },
                isFunction: function (func) {
                    return Object.prototype.toString.call(func) === "[object Function]";
                },
                isArray: function (val) {
                    return Object.prototype.toString.call(val) === "[object Array]";
                },
                isDate: function (val) {
                    return Object.prototype.toString.call(val) === "[object Date]";
                },
                isString: function (str) {
                    return Object.prototype.toString.call(str) === "[object String]";
                },
                /**
                 * 检测对象是否是空对象(不包含任何可读属性)。
                 * 方法只检测对象本身的属性，不检测从原型继承的属性。
                 */
                isOwnEmptyObject: function (obj) {
                    var name = "";

                    for (name in obj) {
                        if (obj.hasOwnProperty(name)) {
                            return false;
                        }
                    }
                    return true;
                },
                /**
                 * 检测对象是否是空对象(不包含任何可读属性)。
                 * 方法既检测对象本身的属性，也检测从原型继承的属性(因此没有使hasOwnProperty)。
                 */
                isEmptyObject: function (obj) {
                    var name = "";

                    for (name in obj) {
                        return false;
                    }
                    return true;
                },
                /**
                 * 判断是否为奇数
                 * @param num
                 * @returns
                 */
                isOdd: function (num) {
                    return num % 2 !== 0;
                },
                /**
                 * 判断是否为对象字面量（{}）
                 */
                isDirectObject: function (obj) {
                    if (Object.prototype.toString.call(obj) === "[object Object]") {
                        return true;
                    }

                    return false;
                },
                isHTMLImg: function (img) {
                    return Object.prototype.toString.call(img) === "[object HTMLImageElement]";
                },
                isDom: function (obj) {
                    return obj instanceof HTMLElement;
                },
                isNumber: function (obj) {
                    return Object.prototype.toString.call(obj) === "[object Number]";
                },
                isBool: function (obj) {
                    return Object.prototype.toString.call(obj) === "[object Boolean]";
                },
                /**
                 * 检查宿主对象是否可调用
                 *
                 * 任何对象，如果其语义在ECMAScript规范中被定义过，那么它被称为原生对象；
                 环境所提供的，而在ECMAScript规范中没有被描述的对象，我们称之为宿主对象。

                 该方法用于特性检测，判断对象是否可用。用法如下：

                 MyEngine addEvent():
                 if (Tool.judge.isHostMethod(dom, "addEventListener")) {    //判断dom是否具有addEventListener方法
            dom.addEventListener(sEventName, fnHandler, false);
            }
                 */
                isHostMethod: (function () {
                    function isHostMethod(object, property) {
                        var type = typeof object[property];

                        return type === "function" ||
                            (type === "object" && !!object[property]) ||
                            type === "unknown";
                    };

                    return isHostMethod;
                }()),
                /**
                 判断一个元素是否为另一个元素的子元素
                 * @param children  被判断的元素。可以为dom或jquery对象
                 * @param parentSelector    父元素选择器。如“"#parent"”
                 * @returns

                    示例：
                 <div id="parent">
                 <span id="chi"></span>
                 <div>

                 isChildOf($("#chi"), "#parent");    //true
                 */
                isChildOf: function (children, parentSelector) {
                    return $(children).parents(parentSelector).length >= 1
                }
            }
        }() );
        /**
         * 转换类型
         */
        Tool.convert = (function () {
            var JSON = (function () {
                useHasOwn = ({}.hasOwnProperty ? true : false);
                m = {
                    "\b": '\\b',
                    "\t": '\\t',
                    "\n": '\\n',
                    "\f": '\\f',
                    "\r": '\\r',
                    '"': '\\"',
                    "\\": '\\\\'
                };

                function pad(n) {
                    return n < 10 ? "0" + n : n;
                };
                function encodeString(s) {
                    if (/["\\\x00-\x1f]/.test(s)) {
                        return '"' + s.replace(/([\x00-\x1f\\"])/g,
                            function (a, b) {
                                var c = m[b];
                                if (c) {
                                    return c;
                                }
                                c = b.charCodeAt();
                                return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                            }) + '"';
                    }
                    return '"' + s + '"';
                };
                function encodeArray(o) {
                    var a = ["["], b, i, l = o.length, v;
                    for (i = 0; i < l; i += 1) {
                        v = o[i];
                        switch (typeof v) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                if (b) {
                                    a.push(',');
                                }
                                a.push(v === null ? "null" : encode(v));
                                b = true;
                        }
                    }
                    a.push("]");
                    return a.join("");
                };
                function encodeDate(o) {
                    return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-" + pad(o.getDate()) + "T" + pad(o.getHours()) + ":" + pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"';
                };


                return {
                    stringify: function (o) {
                        if (typeof o == "undefined" || o === null) {
                            return "null";
                        } else if (o instanceof Array) {
                            return encodeArray(o);
                        } else if (o instanceof Date) {
                            return encodeDate(o);
                        } else if (typeof o == "string") {
                            return encodeString(o);
                        } else if (typeof o == "number") {
                            return isFinite(o) ? String(o) : "null";
                        } else if (typeof o == "boolean") {
                            return String(o);
                        } else {
                            var self = this;
                            var a = ["{"], b, i, v;
                            for (i in o) {
                                if (!useHasOwn || o.hasOwnProperty(i)) {
                                    v = o[i];
                                    switch (typeof v) {
                                        case "undefined":
                                        case "function":
                                        case "unknown":
                                            break;
                                        default:
                                            if (b) {
                                                a.push(',');
                                            }
                                            a.push(self.encode(i), ":", v === null ? "null" : self.encode(v));
                                            b = true;
                                    }
                                }
                            }
                            a.push("}");
                            return a.join("");
                        }
                    },
                    parse: function (json) {
                        return eval("(" + json + ')');
                    }
                }
            }());

            /**
             * 注意以下转换：
             var myBool = Boolean("false");  // == true
             var myBool = !!"false";  // == true
             */
            function _strToBool(str) {
                switch (str.toLowerCase()) {
                    case "true":
                    case "yes":
                    case "1":
                        return true;
                    case "false":
                    case "no":
                    case "0":
                    case null:
                        return false;
                    default:
                        return Boolean(str);
                }
            }

            function _jqToString(jq) {
                var d = $("<div>");

                d.html(jq);

                return d.html();
            }

            // 将js代码转换为多行字符串
            // 示例：
            // _convertCodeToString(function () {
            // var a = {
            // func: function () {
            // }
            // };
            // });
            function _convertCodeToString(fn) {
                return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
            }

            return {
                toNumber: function (obj) {
                    return Number(obj);
                },
                /**
                 * 转换为字符串
                 *
                 * 示例：
                 * 如果参数为Object直接量（如json数据）或者数组，则使用json序列化为字符串
                 expect(convert.toString({ a: 1 })).toEqual('{"a":1}');
                 expect(convert.toString([1, "b"])).toEqual('[1,"b"]');
                 *
                 * jquery对象转换为string
                 expect(convert.toString($("<div>a</div>"))).toEqual("<div>a</div>");
                 *
                 * 其余类型的参数转换为字符串
                 *  expect(convert.toString(1)).toEqual("1");
                 expect(convert.toString("a1")).toEqual("a1");
                 expect(convert.toString(true)).toEqual("true");
                 expect(convert.toString(null)).toEqual("null");

                 * @param obj
                 * @returns
                 */
                toString: function (obj) {
                    var judge = Tool.judge;

                    if (judge.isNumber(obj)) {
                        return String(obj);
                    }

                    if (judge.isjQuery(obj)) {
                        return _jqToString(obj);
                    }

                    if (judge.isFunction(obj)) {
                        return _convertCodeToString(obj);
                    }

                    if (judge.isDirectObject(obj) || judge.isArray(obj)) {
                        if (global.JSON && global.JSON.stringify) {
                            return global.JSON.stringify(obj);
                        }
                        else {
                            return JSON.stringify(obj);
                        }
                    }

                    return String(obj);
                },
                /**
                 * 将json序列化的字符串再序列化为对象（不支持Date对象序列化）
                 * 示例：
                 *  expect(convert.toObject('{"a":1}')).toEqual({ a: 1 });
                 expect(convert.toObject('[1,"b"]')).toEqual([1, "b"]);
                 *
                 * @param obj
                 * @returns
                 */
                toObject: function (obj) {
                    var judge = Tool.judge;

                    if (!judge.isString(obj)) {
                        throw new Error("参数必须为字符串");
                    }

                    if (global.JSON && global.JSON.parse) {
                        return global.JSON.parse(obj);
                    }
                    else {
                        return JSON.parse(obj);
                    }
                },
                toBoolean: function (obj) {
                    var judge = Tool.judge;

                    if (judge.isString(obj)) {
                        return _strToBool(obj);
                    }
                    else {
                        return Boolean(obj);
                    }
                },
                /**
                 * 转换为jquery对象
                 * @param obj
                 * @returns
                 */
                toJquery: function (obj) {
                    return $(obj);
                },
                /**
                 * 转换为dom对象
                 * @param obj
                 * @returns
                 */
                toDom: function (obj) {
                    var judge = Tool.judge;

                    if (judge.isjQuery(obj)) {
                        return obj[0];
                    }
                    else if (judge.isDom(obj)) {
                        return obj;
                    }
                    else if (judge.isString(obj)) {
                        return $(obj)[0];
                    }
                    else {
                        throw new Error("参数必须为dom元素或jquery对象");
                    }
                }
            }
        }());


        function _verifyIsStub(stub) {
            var method;

            for (var i = 0, l = arguments.length; i < l; ++i) {
                method = arguments[i];

                if (!method) {
                    //assert.fail("fake is not a spy");
                    return false;
                }

                if (method.proxy && method.proxy.isSinonProxy) {
                    verifyIsStub(method.proxy);
                }
                else {
                    if (typeof method !== "function") {
                        //assert.fail(method + " is not a function");
                        return false;
                    }

                    if (typeof method.getCall !== "function") {
                        //assert.fail(method + " is not stubbed");
                        return false;
                    }
                }
            }

            return true;
        }

        function _isSpecificCall(stub) {
            return !stub.firstCall
        }
        function _isCalled(stub){
            var actualArg = null;

            if(stub && stub.callId){
                return true;
            }

            actualArg = _isSpecificCall(stub) || _verifyIsStub(stub) ? stub.args : stub.args[0];

            return actualArg && actualArg.length > 0;
        }
        function getActualArg(stub){
            var actualArg = _isSpecificCall(stub) || _verifyIsStub(stub) ? stub.args : stub.args[0];

            return actualArg;
        }


        jasmine.addMatchers({
            toCalledWith: function () {
                return {
                    compare: function (actual, expected) {
                        var actualArg = getActualArg(actual),
                            expectedArg = null,
                            message = null,
                            toString = function(arg){
                                try{
                                    return Tool.convert.toString(arg).slice(1, -1);
                                }
                                catch(e){
                                    return arg.toString();
                                }
                            };

                        expectedArg = Array.prototype.slice.call(arguments, 1);


                        message = "Expected to called with " + toString(expectedArg);

                        if(!_isCalled(actual)){
                            message += ", but actual is not called";
                        }
                        else{
                            message += ", but actual is " + toString(actualArg);
                        }
                        return {
                            pass: actual.calledWith.apply(actual, expectedArg),
                            message: message
                        }
                    },
                    negativeCompare: function (actual, expected) {
                        var actualArg = getActualArg(actual),
                            expectedArg = null,
                            message = null,
                            toString = function(arg){
                                try{
                                    return Tool.convert.toString(arg).slice(1, -1);
                                }
                                catch(e){
                                    return arg.toString();
                                }
                            };

                        expectedArg = Array.prototype.slice.call(arguments, 1);


                        message = "Expected not to called with " + toString(expectedArg);

                        if(!_isCalled(actual)){
                            message += ", but actual is called";
                        }
                        else{
                            message += ", but actual is called with " + toString(actualArg);
                        }
                        return {
                            pass: !(actual.calledWith.apply(actual, expectedArg)),
                            message: message
                        }
                    }
                };
            },
            toCalled: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.called,
                            message: "Expected to be called, but actual is not called"
                        }
                    },
                    negativeCompare: function(actual, expected) {
                        return {
                            pass: !actual.called,
                            message: "Expected to be not called, but actual is called"
                        }
                    }
                };
            },
            toCalledOnce: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.calledOnce,
                            message: "Expected to be called Once, but actual callCount is " + actual.callCount
                        }
                    },
                    negativeCompare: function(actual, expected) {
                        return {
                            pass: !actual.calledOnce,
                            message: "Expected not to be called Once, but actual callCount is " + actual.callCount
                        }
                    }
                };
            },
            toCalledTwice: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.calledTwice,
                            message: "Expected to be called Twice, but actual callCount is " + actual.callCount
                        }
                    },
                    negativeCompare: function(actual, expected) {
                        return {
                            pass: !actual.calledTwice,
                            message: "Expected not to be called Twice, but actual callCount is " + actual.callCount
                        }
                    }
                };
            },
            toCalledThrice: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.calledThrice,
                            message: "Expected to be called thrice, but actual callCount is " + actual.callCount
                        }
                    },
                    negativeCompare: function(actual, expected) {
                        return {
                            pass: !actual.calledThrice,
                            message: "Expected not to be called thrice, but actual callCount is " + actual.callCount
                        }
                    }
                };
            },
            toCalledBefore: function () {
                return {
                    compare: function (actual, expected) {
                        var msg = null,
                            pass = null;

                        msg = "Expected to be called before, ";

                        if(!_isCalled(expected)){
                            pass = false;
                            msg += "but expected not called";
                        }
                        else{
                            pass = actual.calledBefore(expected);
                            msg += _isCalled(actual) ? "but actual is be called after" : "but actual is not called";
                        }

                        return {
                            pass: pass,
                            message: msg
                        }
                    }
                };
            },
            toCalledAfter: function () {
                return {
                    compare: function (actual, expected) {
                        var msg = null,
                            pass = null;

                        msg = "Expected to be called after, ";

                        if(!_isCalled(expected)){
                            pass = false;
                            msg += "but expected not called";
                        }
                        else{
                            pass = actual.calledAfter(expected);
                            msg += _isCalled(actual) ? "but actual is be called before" : "but actual is not called";
                        }

                        return {
                            pass: pass,
                            message: msg
                        }
                    }
                };
            }
        });
    }(jasmine));
});