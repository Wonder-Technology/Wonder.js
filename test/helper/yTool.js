(function () {
    var global = this;

    //* 配置命名空间
    //默认“YYC.Tool”为工具箱的命名空间

    var YToolConfig = {
        topNamespace: "YYC",
        toolNamespace: "Tool"
    };


    var Top = {},
        Tool = {};

    /**
     * 定义通用方法
     */
    Top = (function () {
        return {
            /**
             * 创建命名空间。
             示例：
             namespace("Tool.Button");
             */
            namespace: function (str) {
                var parent = global[YToolConfig.topNamespace],
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    throw new Error("命名空间不能为空");
                }
                if (parts[0] === YToolConfig.topNamespace) {
                    parts = parts.slice(1);
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                return parent;
            },
            /**
             * 生成命名空间,并执行func

             示例：
             register("YYC.Test.t", function () {
	                    YYC.Test.t = {
	                        a: 100
	                    };
                });
             */
            register: function (str, func) {
                var parent = global[YToolConfig.topNamespace],
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    throw new Error("命名空间不能为空");
                }
                if (parts[0] === YToolConfig.topNamespace) {
                    parts = parts.slice(1);
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                if (func) {
                    func.call(parent, this);
                }

                return parent;
            }
        }
    }());

    Tool = Top[YToolConfig.toolNamespace] = {};

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
            dom.addEventListener(sEventType, fnHandler, false);
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

    /**
     * 继承
     */
    Tool.extend = (function () {
        return {
            /**
             * 浅拷贝
             */
            extend: function (destination, source) {
                var property = "";

                for (property in source) {
                    destination[property] = source[property];
                }
                return destination;
            },
            extendExist: function (destination, source) {
                var property = "";

                for (property in source) {
                    if (destination[property] !== undefined) {    //destination中没有的属性不拷贝
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            extendNoExist: function (destination, source) {
                var property = "";

                for (property in source) {
                    if (destination[property] === undefined) {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            /**
             * 浅拷贝(不包括source的原型链)
             */
            extendNoPrototype: function (destination, source) {
                //            var temp = {};
                var property = "";

                for (property in source) {
                    if (source.hasOwnProperty(property)) {
                        destination[property] = source[property];
                    }
                }
                return destination;
            },
            /**
             * 深拷贝
             *
             * 示例：
             * 如果拷贝对象为数组，能够成功拷贝（不拷贝Array原型链上的成员）
             * expect(extend.extendDeep([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]])).toEqual([1, { x: 1, y: 1 }, "a", { x: 2 }, [2]]);
             *
             * 如果拷贝对象为对象，能够成功拷贝（能拷贝原型链上的成员）
             * var result = null;
             function A() {
	            };
             A.prototype.a = 1;

             function B() {
	            };
             B.prototype = new A();
             B.prototype.b = { x: 1, y: 1 };
             B.prototype.c = [{ x: 1 }, [2]];

             var t = new B();

             result = extend.extendDeep(t);

             expect(result).toEqual(
             {
                 a: 1,
                 b: { x: 1, y: 1 },
                 c: [{ x: 1 }, [2]]
             });
             * @param parent
             * @param child
             * @returns
             */
            extendDeep: function (parent, child) {
                var i = null,
                    len = 0,
                    toStr = Object.prototype.toString,
                    sArr = "[object Array]",
                    sOb = "[object Object]",
                    type = "",
                    _child = null;

                //数组的话，不获得Array原型上的成员。
                if (toStr.call(parent) === sArr) {
                    _child = child || [];

                    for (i = 0, len = parent.length; i < len; i++) {
                        type = toStr.call(parent[i]);
                        if (type === sArr || type === sOb) {    //如果为数组或object对象
                            _child[i] = type === sArr ? [] : {};
                            arguments.callee(parent[i], _child[i]);
                        } else {
                            _child[i] = parent[i];
                        }
                    }
                }
                //对象的话，要获得原型链上的成员。因为考虑以下情景：
                //类A继承于类B，现在想要拷贝类A的实例a的成员（包括从类B继承来的成员），那么就需要获得原型链上的成员。
                else if (toStr.call(parent) === sOb) {
                    _child = child || {};

                    for (i in parent) {
                        type = toStr.call(parent[i]);
                        if (type === sArr || type === sOb) {    //如果为数组或object对象
                            _child[i] = type === sArr ? [] : {};
                            arguments.callee(parent[i], _child[i]);
                        } else {
                            _child[i] = parent[i];
                        }
                    }
                }
                else {
                    _child = parent;
                }

                return _child;
            },
            /**
             * 原型继承
             */
            inherit: function (child, parent) {
                var func = function () {
                };
                func.prototype = parent.prototype;
                child.prototype = new func();
                child.prototype.constructor = child;
                child.prototype.parent = parent;
            }
        }
    }());

    /**
     * ajax辅助方法
     */

    Tool.ajaxHelper = (function () {
        function _judgeAndShowLoadingImg(timeCount, timer, loading, whole, imgPath) {
            var imgSrc = "<img src='" + imgPath + "' border='0'/>";   //加载中图片

            if (timeCount !== 0) {    //如果已经加载成功或加载失败，则清除重复执行并返回
                clearInterval(timer);
                return;
            }
            else {
                $(whole).hide();
                $(loading).html(imgSrc).show();
                clearInterval(timer);
            }
        };

        return {

            /**
             * 设定ajax全局事件，显示加载中、加载失败

             示例：
             <div id="loading" style="border:1px solid red;display:none;">
             </div>
             <div id="whole" >
             </div>
             * @param loading    显示信息的层的ID
             * @param whole        正文所在层的ID
             * @param deferTime 延迟时间（秒）。如果延迟时间内加载成功，则不显示“加载中”图片，否则显示
             * @param imgPath   加载中图片的路径。如"/Content/Image/Shared/Loading/ico_loading3.gif"
             * @returns
             */
            showWholeLoading: function (loading, whole, deferTime, imgPath) {
                var _timeCount = 0,
                    _timer = null;

                $(loading).ajaxStart(function () {
                    _timeCount = 0;  //归位
                    _timer = setInterval(function () {
                        _judgeAndShowLoadingImg(_timeCount, _timer, loading, whole, imgPath);
                    }, deferTime * 1000);
                }).ajaxSuccess(function () {
                    _timeCount++;    //计数加1，用来判断是否加载成功
                    $(this).hide();
                    $(whole).show();
                }).ajaxError(function (e, xhr, settings, exception) {
                    _timeCount += 2;    //计数加2，用来判断是否加载失败
                    $(this).html("加载失败：" + exception).show();
                    $(whole).hide();
                });
            },
            /**
             * 设置单次ajax的事件，显示加载中、加载失败

             示例：
             <div id="loading" style="border:1px solid red;display:none;">
             </div>
             <div id="whole" >
             </div>
             * @param loading    显示信息的层的ID
             * @param whole        正文所在层的ID
             * @param deferTime 延迟时间（秒）。如果延迟时间内加载成功，则不显示“加载中”图片，否则显示
             * @param imgPath   加载中图片的路径。如"/Content/Image/Shared/Loading/ico_loading3.gif"
             * @param setting   ajax的参数。包括url、data、type、dataType、success
             * @returns
             */
            showSingleLoading: function (loading, whole, deferTime, imgPath, setting) {
                var _timeCount = 0,
                    _timer = null,
                    self = this;

                $.ajax({
                    url: setting.url,
                    data: setting.data,
                    type: setting.type || "GET",
                    dataType: setting.dataType,

                    beforeSend: function () {
                        _timeCount = 0;  //归位
                        _timer = setInterval(function () {
                            _judgeAndShowLoadingImg(_timeCount, _timer, loading, whole, imgPath);
                        }, deferTime * 1000);
                    },
                    error: function (jqXHR, textStatus, exception) {
                        _timeCount += 2;    //计数加2，用来判断是否加载失败
                        $(loading).html("加载失败：" + exception).show();
                        $(whole).hide();
                    },
                    success: function (data) {
                        _timeCount++;    //计数加1，用来判断是否加载成功
                        $(loading).hide();
                        $(whole).show();

                        setting.success(data)
                    }
                });
            }
        }

    }());

    /**
     * 异步操作
     */
    Tool.async = (function () {
        return {
            /**
             * 等待second秒后，执行nextStep。可指定nextStep指向obj。
             *
             * 示例：
             * wait(global, 3); //暂停3秒，此处指定nextStep中的this指向window
             this.nextStep = function () {   //3秒后执行的函数，里面的this已指向window
	            alert("Next!");
	            alert(this);
	            };
             */
            wait: function (obj, second) {
                var ind = -1;
                //内部函数goOn
                //该函数把要暂停的函数放到数组window.eventList里，同时通过setTimeout来调用继续函数(nextStep)。
                function goOn(ind) {
                    var obj = global.eventList[ind];
                    var i = 0;

                    global.eventList[ind] = null;
                    if (obj.nextStep) obj.nextStep.call(obj, null); //这里调用后续方法
                    else obj();
                };

                if (global.eventList == null) {
                    global.eventList = new Array();
                }

                for (i = 0; global.eventList.length; i++) {
                    if (global.eventList[i] == null) {
                        global.eventList[i] = obj;
                        ind = i;
                        break;
                    }
                }
                if (ind == -1) {
                    ind = global.eventList.length;
                    global.eventList[ind] = obj;
                }
                setTimeout(function () {
                    goOn(ind);  //调用内部函数goOn
                }, second * 1000);
            },
            /**
             * 清空"所有"的定时器
             * @param index 其中一个定时器序号（不一定为第一个计时器序号）
             */
            clearAllTimer: function (index) {
                var i = 0,
                    num = 0,
                    timerNum = 250, //最大定时器个数
                    firstIndex = 0;

                //获得最小的定时器序号
                firstIndex = (index - timerNum >= 1) ? (index - timerNum) : 1;
                num = firstIndex + timerNum * 2;    //循环次数

                //以第一个计时器序号为起始值（计时器的序号会递加，但是ie下每次刷新浏览器后计时器序号会叠加，
                //且最初的序号也不一定从1开始（可能比1大），也就是说ie下计时器序号的起始值可能很大；chrome和firefox计时器每次从1开始）
                for (i = firstIndex; i < num; i++) {
                    global.clearTimeout(i);
                }
                //for (i = firstIndex.timer_firstIndex; i < num; i++) {
                for (i = firstIndex; i < num; i++) {
                    global.clearInterval(i);
                }
            },
            /**
             * 阻塞线程一段时间
             */
            sleep: function (s) {
                var d = new Date();
                while ((new Date().getTime() - d.getTime()) < s) {
                }
            }
        }
    }());

    /**
     * 集合通用操作
     */
    Tool.collection = (function () {
        return {
            /**
             * 获得jquery集合中Dom元素最大的width和height
             */
            getMaxWidthHeight: function (list) {
                var maxWidth = 0,
                    maxHeight = 0,
                    width = 0,
                    height = 0;

                list.each(function () {
                    width = $(this).width();
                    height = $(this).height();

                    if (width > maxWidth) {
                        maxWidth = width;
                    }
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });

                return { width: maxWidth, height: maxHeight };
            }
        }
    }());

    Tool.cookie = (function () {
        return {
            /**
             * 封装setCookie（处理异常）
             */
            trySetCookie: function (objName, objValue, objHours, func) {
                try {
                    this.setCookie(objName, objValue, objHours);   //要设置expires，否则会出现错误！！！
                }
                catch (e) {
                    alert("写入Cookie操作失败！您可能禁用了Cookie");
                }
                finally {
                    if (func) {
                        if (Tool.judge.isFunction(func)) {
                            func();
                        }
                        else {  //func为url字符串
                            if (Tool.judge.isString(func)) {
                                global.location.href = func;    //跳转到对应模块
                            }
                        }
                    }
                }
            },
            /**
             * 设置cookie。要设置expires，否则会出现错误！
             */
            setCookie: function (objName, objValue, objHours) {
                /*
                 最多利用的应为encodeURIComponent，它是将中文、韩文等特殊字符转换成utf-8格式的url编码，
                 以是假定给背景转达参数必要利用encodeURIComponent时必要背景解码对utf-8撑持（form中的编码体例和当前页面编码体例不异）

                 此处用encodeURIComponent而不用escape，因为objValue如果包含中文的话，escape编码的字符串在解码时会出问题！
                 */
                var str = encodeURIComponent(objName) + "=" + encodeURIComponent(objValue);
                var date = new Date();
                var ms = null;
                if (objHours > 0) {                               //如果不设定过期时间，浏览器关闭时cookie自动消失
                    ms = objHours * 3600 * 1000;
                }
                else {
                    ms = 1 * 3600 * 1000;   //默认为1小时。此处要设置过期时间！否则会出现错误！！！详见“6-27备忘:cookie的问题”
                }
                date.setTime(date.getTime() + ms);
                str += ";expires=" + date.toGMTString() + ";path=/";   //要设置相同的path，防止删除不掉
                document.cookie = str;
                if (document.cookie == "") {
                    throw new Error("写入Cookie操作失败！您可能禁用了Cookie");  //如果写cookie失败，则抛出异常
                }
            },
            getCookie: function (name) {
                var arrStr = document.cookie.split(";"),
                    decode = Tool.code.decode,
                    temp = null,
                    decodeStr = null;

                for (var i = 0; i < arrStr.length; i++) {
                    temp = arrStr[i].split("=");

                    if (Tool.string.trim(decode(temp[0])) === name) {
                        return decode(temp[1]);
                    }
                }
                return "no";
            },
            /**
             * 删除cookie
             */
            clearCookie: function (name) {
                var exp = new Date();

                exp.setTime(exp.getTime() - 10000);
                document.cookie = name + "=;expires=" + exp.toGMTString() + ";path=/";
            }
        }
    })();

    /**
     * checkbox复选框通用操作
     */
    Tool.checkbox = (function () {
        return {
            $: function (id) {
                return $("#" + id);
            },
            /**
             *     selectAll()只对多选框有效，其余方法对单选框和多选框都有效。
             *     如果全选框选中，则集合都选中；否则集合都不选中。
             *
             *     示例：
             全选框：<input type="checkbox" id="user_company_selectAll" onclick="checkbox.selectAll('user_company_selectAll', 'user_company_table');"/>
             其中user_company_selectAll为全选框的id，user_company_table为多选框的父级层的id。

             * @param id_all    全选框id
             * @param id_every    要操作的多选框的父级对象的id值
             * @returns
             */
            selectAll: function (id_all, id_every) {
                if (this.$(id_all).attr("checked") == "checked") {
                    this.$(id_every).find("input[type=checkbox]").attr("checked", true);
                }
                else {
                    this.$(id_every).find("input[type=checkbox]").attr("checked", false);
                }
            },
            check: function (id) {
                this.$(id).attr("checked", true);
            },
            unCheck: function (id) {
                this.$(id).attr("checked", false);
            },
            isCheck: function (id) {
                if (!this.$(id).attr("checked")) {
                    return false;
                }
                else {
                    return true;
                }
            },
            /**
             * 获得单选框选中项
             *
             * @returns    返回选中项
             */
            getCheckedByRadio: function (name) {
                //对特殊字符转义
                var name = Tool.escape.escapeJquery(name);

                return $('input:radio[name=' + name + ']:checked');
            },
            /**
             * 获得一组设置了name属性的多选框的选中项。
             *
             * @returns    返回项可能有多项
             */
            getCheckedByCheckbox: function (name) {
                //对特殊字符转义
                var name = Tool.escape.escapeJquery(name);

                return $('input:checkbox[name=' + name + ']:checked');
            }
        }
    }());
    Tool.iframe = (function () {
        return {
            //跳转到父窗口的锚记，用于在子窗口中调用（iframe）
            //name:锚记名
            //如果在父窗口调用，也能跳转到父窗口的锚记！
            jumpToParentPosition: function (name) {
                if (!parent) {
                    throw new Error("parent未定义！");
                }

                parent.location.hash = name;
            }
        }
    }());
    Tool.page = (function () {
        return {
            /*在当前鼠标位置的右边显示层*/
            showDivInRightPosition: function (e, id) {
                var position = Tool.posiiton.getMousePosition(e);

                var top = position.y;
                var left = position.x;

                this.$(id).css("top", top);     //id为层的Id
                this.$(id).css("left", left);
            },
            /*显示arguments[0]，其余隐藏*/
            showFirstArgument: function () {
                this.$(arguments[0]).css("display", "");
                var length = arguments.length;
                for (var i = 1; i < length; i++) {
                    this.$(arguments[i]).css("display", "none");
                }
            },
            /*验证码*/
            createCode: function () {
                var code = "";
                var codeLength = 6; //验证码的长度
                var checkCode = document.getElementById("checkCode");

                //所有候选组成验证码的字符，当然也可以用中文的
                var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G',
                    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

                for (var i = 0; i < codeLength; i++) {
                    var charIndex = Math.floor(Math.random() * 36);
                    code += selectChar[charIndex];
                }
                if (checkCode) {
                    checkCode.className = "code";
                    checkCode.value = code;
                    checkCode.blur();
                }
            },
            //显示错误信息
            err_msg: function (str, id) {
                document.getElementById("d" + id).innerHTML = '<img src="/Content/Image/Shared/check_' + (str ? 'error' : 'right') + '.gif" align="absmiddle"/> ' + str.toString();
            }
        }
    }());
    Tool.select = (function () {
        var _$ = function (id) {
            return $("#" + id);
        }

        return {
            selectAll: function (id) {
                _$(id + " option").each(function () {
                    $(this).attr("selected", "selected");   //选中该option
                });
            },
            selectNone: function (id) {
                _$(id + " option").each(function () {
                    $(this).attr("selected", false);   //不选中该option
                });
            },
            changeHandler: function (id, handler) {
                _$(id).change(handler);
            },
            //清空下拉框
            clear: function (id) {
                _$(id).empty();
            },
            //添加option(添加到末尾)
            appendOption: function (id, option) {
                $(option).appendTo("#" + id);
            },
            //添加option(添加到开头)
            prependOption: function (id, option) {
                $(option).prependTo("#" + id);
            },
            //修改value=old_value的option的value为new_value
            changeValue: function (id, old_value, new_value) {
                //对特殊字符转义
                old_value = Tool.escape.escapeJquery(old_value);
                if (typeof (id) == 'string') {  //id为id值
                    _$(id).children("option[value*=" + old_value + "]").each(function () {
                        $(this).val(new_value);
                    });
                }
                else {  //id为dom对象
                    $(id).children("option[value*=" + old_value + "]").each(function () {
                        $(this).val(new_value);
                    });
                }
            },
            //修改value=old_value的option的text为new_text
            changeText: function (id, old_value, new_text) {
                //对特殊字符转义
                old_value = Tool.escape.escapeJquery(old_value);

                if (typeof (id) == 'string') {  //id为id值
                    _$(id).children("option[value*=" + old_value + "]").each(function () {
                        $(this).text(new_text);
                    });
                }
                else {  //id为dom对象
                    $(id).children("option[value*=" + old_value + "]").each(function () {
                        $(this).text(new_text);
                    });
                }
            },
            //同时修改value和text
            changeValueText: function (id, old_value, new_value, new_text) {
                //先修改text
                this.changeText(id, old_value, new_text);
                this.changeValue(id, old_value, new_value);
            },
            //选中最后一项
            selectLast: function (id) {
                if (typeof (id) == 'string') {  //id为id值
                    _$(id + " option:last").attr("selected", "selected");
                }
                else {  //id为dom对象(option:last)
                    $(id).attr("selected", "selected");
                }
            },
            /* 单选 */
            single: {
                /* 获取选中的value */
                getValue: function (id) {
                    return _$(id).val();
                },

                /* 获取选中的文本值

                 在ie9和ff中，var category = $("#info_category option:checked").text()可以取到值；
                 在360中，var category = $("#info_category option[selected]").text()可以取到值！

                 因此以下方法可以兼容360、ie9、ff
                 */
                getText: function (id) {
                    return _$(id + " option:checked").text() == "" ? _$(id + " option[selected]").text() : _$(id + " option:checked").text();
                },
                //获得选中项的索引
                getIndex: function (id) {
                    return document.getElementById(id).selectedIndex;
                },
                //选中指定的option
                selectIndex: function (id, index) {
                    if (typeof (id) == 'string') {  //id为id值
                        _$(id)[0].selectedIndex = index;
                    }
                    else {  //id为dom对象
                        $(id)[0].selectedIndex = index;
                    }
                },
                //选中指定value的option
                selectByValue: function (id, value) {
                    _$(id).val(value);
                }
            },
            /* 多选 */
            multiple: {
                getValue: function (id) {
                    return _$(id).val().join(",");
                },
                getText: function (id) {
                    /*  如果text为null，则text += "a";alert(text);
                     结果为"nulla"   ！！！！

                     var text = null;
                     */
                    var text = "";
                    var checked = null;

                    checked = _$(id + " option:checked");
                    if (checked.length == 0) {
                        checked = _$(id + " option[selected]");
                    }
                    checked.each(function () {
                        text += $(this).text() + ',';
                    });

                    return text.slice(0, -1);   //去掉最后一个逗号
                },
                //设置select中对应value的option选中
                selectByValue: function (id, array) {
                    //ff下select需要刷新
                    if (Tool.judge.browser.isFF()) {
                        Tool.select.selectNone(id);
                    }

                    var i = array.length;
                    while (i--) {   //往下数，这样效率高
                        //对特殊字符转义
                        array[i] = Tool.escape.escapeJquery(array[i]);
                        _$(id).children("option[value=" + array[i] + "]").each(function () {   //可能有多个option的value等于该值
                            $(this).attr("selected", "selected");   //选中该option
                        });
                    }
                }
            }
        }
    })();
    Tool.selector = (function () {
        return {
            /*返回当前元素*/
            current: function (e) {
                /*  已修改！这样谷歌浏览器下也可以正常返回！
                 9-28

                 return (this.Browser.ff && arguments[0].target) || (this.Browser.ie && arguments[0].srcElement);
                 */
                if (!e) {
                    throw new Error("e未定义");
                }

                return (Tool.judge.browser.isIE() && e.srcElement) || e.target;
            },
            /*  获得当前样式

             示例：
             <style type="text/css">
             p{color:#0F0;}
             #text{color:#FF0;}
             </style>
             <p id="text"> hello world </p>
             <script>
             var ldd={
             getStyle:function(obj,prop){return obj.style[prop];},

             getCurrentStyle:function(obj,prop){
             if(obj.currentStyle){return obj.currentStyle[prop];}      //IE
             if(document.defaultView){return document.defaultView.getComputedStyle(obj,null)[prop];}   //非 IE
             }
             };
             var obj=document.getElementById("text");

             alert(ldd.getStyle(obj,"color"));

             alert(ldd.getCurrentStyle(obj,"color"));
             </script>
             上述代码中，第一个alert 不显示任何内容，第二个alert显示"#F00" 。
             obj.style 返回通过 STYLE 标签属性应用到元素的内嵌样式，此种样式权重最大，为1000。因为<p>中没有内嵌样式，故而第一个alert 不显示任何内容。
             obj.currentStyle （IE 特有，w3c标准方法为 document.defaultView.getComputedStyle）返回的是浏览器当前使用的属性，由于<p> 中没有内嵌样式，根据css 权重，最终使用的color  是#text 中的样式，即color:#FF0。 所以第二个alert显示的内容为"#F00"。
             */
            getCurrentStyle: function (element) {
                return element.currentStyle || document.defaultView.getComputedStyle(element, null);
            },
            getDom: function (id) {
                return typeof id == "string" ? document.getElementById(id) : id;
            },
            $: function (id) {
                return typeof id == "string" ? $("#" + id) : id;
            }
        }
    }());
    Tool.table = (function () {
        function _opeateColView(tableDom, arr_cellNum, displayValue) {
            var i = 0,
                j = 0,
                args = null,
                cell = null,
                len1 = 0,
                len2 = 0;

            if (arr_cellNum.length == 1) {
                for (i = 0, len1 = tableDom.rows.length; i < len1; i++) {
                    cell = tableDom.rows[i].cells[arr_cellNum[0] - 1];
                    if (cell) {
                        cell.style.display = displayValue;
                    }
                }
            }
            else {
                for (i = 0, len1 = tableDom.rows.length; i < len1; i++) {
                    for (j = 0, len2 = arr_cellNum.length; j < len2; j++) {
                        cell = tableDom.rows[i].cells[arr_cellNum[j] - 1];
                        if (cell) {
                            cell.style.display = displayValue;
                        }
                    }
                }
            }
        };

        return {
            hideCol: function (tableDom, cellNum) {
                _opeateColView(tableDom, Array.prototype.slice.call(arguments, 1), "none");
            },
            showCol: function (tableDom, cellNum) {
                _opeateColView(tableDom, Array.prototype.slice.call(arguments, 1), "");
            }
        };
    }());

    /* 注意：不能写成：
     Tool.event.addEvent(document.getElementById("test_div"), "mousedown", Tool.event.bindEvent(this, Handler));
     Tool.event.removeEvent(document.getElementById("test_div"), "mousedown", Tool.event.bindEvent(this, Handler));

     这样不能移除掉绑定的事件！因为Tool.event.bindEvent(this, Handler)不是同一个函数！（因为bindEvent返回了一个匿名函数，这两个
     bindEvent返回的匿名函数不是同一个！）

     应该写为：
     this._Handle = Tool.event.bindEvent(this, Handler);
     Tool.event.addEvent($("div"), "mousedown", _Handle);
     Tool.event.removeEvent($("div"), "mousedown", _Handle);

     这样_Handle就是同一个函数了！
     */
    Tool.event = (function () {
        return {
            //注意！bindEvent传的参数与BindWithArguments类似，只是第一个参数为event！
            bindEvent: function (object, fun) {
                var args = Array.prototype.slice.call(arguments, 2);
                var self = this;

                return function (event) {
                    return fun.apply(object, [self.wrapEvent(event)].concat(args)); //对事件对象进行包装
                }
            },
            /* oTarget既可以是单个dom元素，也可以使jquery集合。
             如：
             Tool.event.addEvent(document.getElementById("test_div"), "mousedown", _Handle);
             Tool.event.addEvent($("div"), "mousedown", _Handle);
             */
            addEvent: function (oTarget, sEventType, fnHandler) {
                //            var oTarget = $(oTarget)[0];    //转换为dom对象
                var dom = null,
                    i = 0,
                    len = 0,
                    temp = null;

                if (Tool.judge.isjQuery(oTarget)) {
                    oTarget.each(function () {
                        dom = this;

                        if (Tool.judge.isHostMethod(dom, "addEventListener")) {
                            dom.addEventListener(sEventType, fnHandler, false);
                        }
                        else if (Tool.judge.isHostMethod(dom, "attachEvent")) {
                            dom.attachEvent("on" + sEventType, fnHandler);
                        }
                        else {
                            dom["on" + sEventType] = fnHandler;
                        }
                    });
                }
                else {
                    dom = oTarget;

                    if (Tool.judge.isHostMethod(dom, "addEventListener")) {
                        dom.addEventListener(sEventType, fnHandler, false);
                    }
                    else if (Tool.judge.isHostMethod(dom, "attachEvent")) {
                        dom.attachEvent("on" + sEventType, fnHandler);
                    }
                    else {
                        dom["on" + sEventType] = fnHandler;
                    }
                }
            },
            removeEvent: function (oTarget, sEventType, fnHandler) {
                var dom = null;


                if (Tool.judge.isjQuery(oTarget)) {
                    oTarget.each(function () {
                        dom = this;
                        if (Tool.judge.isHostMethod(dom, "removeEventListener")) {
                            dom.removeEventListener(sEventType, fnHandler, false);
                        }
                        else if (Tool.judge.isHostMethod(dom, "detachEvent")) {
                            dom.detachEvent("on" + sEventType, fnHandler);
                        }
                        else {
                            dom["on" + sEventType] = null;
                        }
                    });
                }
                else {
                    dom = oTarget;
                    if (Tool.judge.isHostMethod(dom, "removeEventListener")) {
                        dom.removeEventListener(sEventType, fnHandler, false);
                    }
                    else if (Tool.judge.isHostMethod(dom, "detachEvent")) {
                        dom.detachEvent("on" + sEventType, fnHandler);
                    }
                    else {
                        dom["on" + sEventType] = null;
                    }
                }
            },
            /*
             包装event对象   -待补充

             event.type:返回事件名。返回没有“on”作为前缀的事件名，比如，onclick事件返回的type是click
             event.target: 返回事件源，就是发生事件的元素
             event.preventDefault: 阻止默认事件动作
             event.stopBubble: 阻止冒泡
             //event.offsetLeft:为匹配的元素集合中获取第一个元素的当前坐标的left，相对于文档（document）。
             //event.offsetTop:为匹配的元素集合中获取第一个元素的当前坐标的top，相对于文档（document）。
             //event.positionLeft:获取匹配元素中第一个元素的当前坐标的left，相对于offset parent的坐标。( offset parent指离该元素最近的而且被定位过的祖先元素 )
             //event.positionTop:获取匹配元素中第一个元素的当前坐标的top，相对于offset parent的坐标。( offset parent指离该元素最近的而且被定位过的祖先元素 )
             event.pageX: 鼠标相对于文档的左边缘的位置。
             event.pageY: 鼠标相对于文档的上边缘的位置。
             event.relatedTarget: 发生mouseover和mouseout事件时，相关的dom元素。
             （mouseover：鼠标来之前的元素；mouseout：鼠标将要去的那个元素）
             event.mouseButton: 鼠标按键。
             左键： 0
             右键： 1
             中键： 2

             */
            wrapEvent: function (oEvent) {
                var e = oEvent ? oEvent : global.event,
                    target = e.srcElement || e.target;

                //ie
                if (Tool.judge.browser.isIE()) {
                    e.pageX = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                    e.pageY = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;

                    e.stopBubble = function () {
                        e.cancelBubble = true;
                    };

                    if (Tool.judge.browser.isIE7() || Tool.judge.browser.isIE8()) {
                        e.preventDefault = function () {
                            e.returnValue = false;
                        };

                        if (e.type == "mouseout") {
                            e.relatedTarget = e.toElement;
                        }
                        else if (e.type == "mouseover") {
                            e.relatedTarget = e.fromElement;
                        }

                        switch (e.button) {
                            case 1:
                                e.mouseButton = 0;
                                break;
                            case 4:
                                e.mouseButton = 1;
                                break;
                            case 2:
                                e.mouseButton = 2;
                                break;
                            default:
                                e.mouseButton = e.button;
                                break;
                        }
                    }
                    else {
                        e.mouseButton = e.button;
                    }
                }
                else {
                    e.stopBubble = e.stopPropagation;

                    e.keyCode = e.which;
                    //注意：firefox没有多个键一起按的事件
                    e.mouseButton = e.button;
                }
                e.target = target;


//                e.offsetLeft = $(target).offset().left;   //使用jquery的方法
//                e.offsetTop = $(target).offset().top;     //使用jquery的方法
//
//                e.positionLeft = $(target).position().left;   //使用jquery的方法
//                e.positionTop = $(target).position().top;   //使用jquery的方法

                return e;
            },
            getEvent: function () {
                //this.getEvent.caller为调用了getEvent方法的函数的引用
                return this.getEvent.caller.arguments[0];
            },
            /* 手动触发事件

             默认为不冒泡，不进行默认动作。

             2012-12-03

             网上资料：http://hi.baidu.com/suchen36/item/fb3eefbb8125c0a4eaba93e2


             为大家介绍js下的几个方法：
             1. createEvent（eventType）
             参数：eventType 共5种类型：
             Events ：包括所有的事件.

             HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select',
             'submit', 'unload'. 事件

             UIEevents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'.
             间接包含 MouseEvents.

             MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'.

             MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved',
             'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument',
             'DOMNodeRemovedFromDocument', 'DOMSubtreeModified'.

             2. 在createEvent后必须初始化，为大家介绍5种对应的初始化方法

             HTMLEvents 和 通用 Events：
             initEvent( 'type', bubbles, cancelable )

             UIEvents ：
             initUIEvent( 'type', bubbles, cancelable, windowObject, detail )

             MouseEvents：
             initMouseEvent( 'type', bubbles, cancelable, windowObject, detail, screenX, screenY,
             clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget )

             MutationEvents ：
             initMutationEvent( 'type', bubbles, cancelable, relatedNode, prevValue, newValue,
             attrName, attrChange )

             3. 在初始化完成后就可以随时触发需要的事件了，为大家介绍targetObj.dispatchEvent(event)
             使targetObj对象的event事件触发
             需要注意的是在IE 5.5+版本上请用fireEvent方法，还是浏览兼容的考虑

             4. 例子
             //例子1 立即触发鼠标被按下事件
             var fireOnThis = document.getElementById('someID');
             var evObj = document.createEvent('MouseEvents');
             evObj.initMouseEvent( 'click', true, true, global, 1, 12, 345, 7, 220, false, false, true, false, 0, null );
             fireOnThis.dispatchEvent(evObj);

             //例子2 考虑兼容性的一个鼠标移动事件
             var fireOnThis = document.getElementById('someID');
             if( document.createEvent )
             {
             var evObj = document.createEvent('MouseEvents');
             evObj.initEvent( 'mousemove', true, false );
             fireOnThis.dispatchEvent(evObj);
             }
             else if( document.createEventObject )
             {
             fireOnThis.fireEvent('onmousemove');
             }

             */
            triggerEvent: function (oTarget, type, eventData) {
                var evObj = null,
                    dom = null;

                if (Tool.judge.isHostMethod(document, "createEvent")) {
                    /* 判断事件类型
                     switch (type) {
                     case 'abort':
                     case 'blur':
                     case 'change':
                     case 'error':
                     case 'focus':
                     case 'load':
                     case 'reset':
                     case 'resize':
                     case 'scroll':
                     case 'select':
                     case 'submit':
                     case 'unload':
                     evObj = document.createEvent('HTMLEvents');
                     evObj.initEvent(type, false, true);
                     break;
                     case 'DOMActivate':
                     case 'DOMFocusIn':
                     case 'DOMFocusOut':
                     case 'keydown':
                     case 'keypress':
                     case 'keyup':
                     evObj = document.createEvent('UIEevents');
                     evObj.initUIEvent(type, false, true);     //出错：参数过少
                     break;
                     case 'click':
                     case 'mousedown':
                     case 'mousemove':
                     case 'mouseout':
                     case 'mouseover':
                     case 'mouseup':
                     evObj = document.createEvent('MouseEvents');
                     evObj.initMouseEvent(type, false, true);  //出错：参数过少
                     break;
                     case 'DOMAttrModified':
                     case 'DOMNodeInserted':
                     case 'DOMNodeRemoved':
                     case 'DOMCharacterDataModified':
                     case 'DOMNodeInsertedIntoDocument':
                     case 'DOMNodeRemovedFromDocument':
                     case 'DOMSubtreeModified':
                     evObj = document.createEvent('MutationEvents');
                     evObj.initMutationEvent(type, false, true);   //出错：参数过少
                     break;
                     default:
                     throw new Error("超出范围！");
                     break;

                     }
                     */

                    //此处使用通用事件
                    evObj = document.createEvent('Events');
                    evObj.initEvent(type, false, true);

                    if(!!eventData){
                        Tool.extend.extend(evObj, eventData);
                    }

                    if (Tool.judge.isjQuery(oTarget)) {
                        oTarget.each(function () {
                            dom = this;
                            dom.dispatchEvent(evObj);
                        });
                    }
                    else {
                        dom = oTarget;
                        dom.dispatchEvent(evObj);
                    }
                }
                else if (Tool.judge.isHostMethod(document, "createEventObject")) {
                    if (Tool.judge.isjQuery(oTarget)) {
                        oTarget.each(function () {
                            dom = this;
                            dom.fireEvent('on' + type);
                        });
                    }
                    else {
                        dom = oTarget;
                        dom.fireEvent('on' + type);
                    }
                }
            }
        }
    }());

    Tool.array = (function () {
        return {
            /*
             判断数组中是否有重复项，有即返回true，否则返回false
             发送给多人时，判断是否重复发给同一人
             如收件人：yang11,yang11,111111
             此处yang11重复！
             */
            hasRepeatItem: function (array, isEqual) {
                var new_array = this.extendDeep(array),
                    isEqual = isEqual || function (a, b) {
                            return a === b;
                        },
                    first = null;

                function _judge(array){
                    if (array.length == 0) {
                        return false;
                    }

                    first = array[0];

                    /*判断数组是否有重复的第一个元素*/
                    for (var i = 1; i < array.length; i++) {
                        if (isEqual(first, array[i])) {
                            return true;    //退出for循环，返回函数返回值true
                        }
                        else {
                            continue;
                        }
                    }
                    array.shift();  //删除数组第一个元素

                    return arguments.callee(array);
                }

                return _judge(new_array);
            },    /*
             判断数组中是否有重复项，有即返回true，否则返回false
             发送给多人时，判断是否重复发给同一人
             如收件人：yang11,yang11,111111
             此处yang11重复！
             */
            hasRepeatItem: function (array, isEqual) {
                var new_array = Tool.extend.extendDeep(array),
                    isEqual = isEqual || function (a, b) {
                            return a === b;
                        },
                    first = null;

                function _judge(array){
                    if (array.length == 0) {
                        return false;
                    }

                    first = array[0];

                    /*判断数组是否有重复的第一个元素*/
                    for (var i = 1; i < array.length; i++) {
                        if (isEqual(first, array[i])) {
                            return true;
                        }
                        else {
                            continue;
                        }
                    }
                    array.shift();

                    return arguments.callee(array);
                }

                return _judge(new_array);
            },
            /*返回一个新的数组，元素与array相同（地址不同）*/
            clone: function (array) {
                var new_array = new Array(array.length);
                for (var i = 0, _length = array.length; i < _length; i++) {
                    new_array[i] = array[i];
                }
                return new_array;
            },
            /**
             * 将ele添加到数组开头
             * @param arr
             * @param ele
             * @returns
             */
            prependElement: function (arr, ele) {
                arr.unshift(ele);	//arr.unshift(ele1, ele2, ...);		可以添加多个

                return arr;
            },
            /**
             * 将ele添加到数组结尾
             * @param arr
             * @param ele
             * @returns
             */
            appendElement: function (arr, ele) {
                arr.push(ele);	//arr.push(ele1, ele2, ...);		可以添加多个

                return arr;
            },
            getNoRepeatArr: function (arr, isEqual) {
                var isEqual = isEqual || function (a, b) {
                            return a === b;
                        },
                    resultArr = [];

                arr.forEach(function (ele) {
                    if (resultArr.contain(function (val) {
                            return isEqual(val, ele);
                        })) {
                        return;
                    }

                    resultArr.push(ele);
                });

                return resultArr;
            },
            getMaxRepeatEleNum: function (arr, isEqual) {
                var num = 1,
                    numArr = [],
                    i = 0,
                    j = 0,
                    len = arr.length,
                    originEle = null,
                    targetEle = null,
                    isEqual = isEqual || function (a, b) {
                            return a === b;
                        };

                for (i = 0; i < len; i++) {
                    originEle = arr[i];

                    for (j = i + 1; j < len; j++) {
                        targetEle = arr[j];
                        if (isEqual(originEle, targetEle)) {
                            num += 1;
                        }
                    }

                    numArr.push(num);
                    num = 1;
                }

                numArr.sort();

                return numArr[numArr.length - 1];
            }
        }
    }());
    Tool.date = (function () {
        var _addFirstTime = function (hourStr, minuteStr, arr) {
            arr.push(hourStr + ":" + minuteStr);
        };
        var _addRemainTime = function (hourStr, minuteStr, arr, interval, num) {
            var hour = parseInt(hourStr, 10);
            minute = parseInt(minuteStr, 10);

            num--;
            while (num) {
                minute = minute + interval;
                if (minute >= 60) {
                    hour++;
                    minute = 0;
                }

                if (hour >= 24) {
                    hour = 0;
                }
                //转换字符串
                arr.push(("0" + hour.toString()).slice(-2) + ":" + ("0" + minute.toString()).slice(-2));

                num--;
            }
        };


        return {
            /**
             * 日期格式化
             * 用法：date.format(new Date(1372045823), "yyyy-MM-dd HH:mm:ss")
             * @param date    Date实例
             * @param format    格式
             * @returns    字符串
             */
            format: function (date, format) {
                var o = {
                    "M+": date.getMonth() + 1, //month
                    "d+": date.getDate(), //day
                    "h+": date.getHours(), //hour
                    "H+": date.getHours(), //hour
                    "m+": date.getMinutes(), //minute
                    "s+": date.getSeconds(), //second
                    "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                    "S": date.getMilliseconds() //millisecond
                };
                if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
                    (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o) if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1,
                        RegExp.$1.length == 1 ? o[k] :
                            ("00" + o[k]).substr(("" + o[k]).length));
                return format;
            },
            /**
             * 以beginTimeNum转换为的时间“00:00”-"23:59"开始，以interval递增num次，获得时间的数组。
             * 如：
             * expect(date.buildTimeArr(55, 5, 3)).toEqual(["00:55", "01:00", "01:05"]);
             *
             * @param beginTimeNum    开始时间（String类型），值为"0000" - "2359"
             * @param interval    时间间隔，以分为单位
             * @param num    数组个数
             * @returns
             */
            buildTimeArr: function (beginTimeStr, interval, num) {
                var arr = [],
                    hourStr = beginTimeStr.slice(0, 2),
                    minuteStr = beginTimeStr.slice(2, 4);

                /*如果beginTimeStr为数字如550，则可以用以下代码
                 *
                 var tempNum = parseInt(beginTimeStr, 10) / 100;
                 hour = Math.floor(tempNum);
                 minute = Math.round(Tool.number.getDecimal(tempNum, 2) * 100);
                 arr.push(("0" + hour.toString()).slice(-2) + ":" + ("0" + minute.toString()).slice(-2));
                 */

                _addFirstTime(hourStr, minuteStr, arr);
                _addRemainTime(hourStr, minuteStr, arr, interval, num);

                return arr;
            },
            /**
             * 将utc时间转换为本地时间，并指定格式
             * @param utc    以秒s为单位
             * @param pattern   如"yyyy-MM-dd HH:mm:ss"
             * @returns
             */
            utc2LocalTime: function (utc, pattern) {
                return this.format(new Date(Number(utc) * 1000), pattern);
            },
            /*
             当前时间戳（毫秒ms）

             第一种方法：
             var timestamp = Date.parse(new Date());

             结果：1280977330000
             第二种方法：
             var timestamp = (new Date()).valueOf();
             或者
             var timestamp = new Date().getTime();
             或
             var timestamp = +new Date();

             结果：1280977330748

             以上代码将获取从 1970年1月1日午夜开始的毫秒数。二者的区别是，第一种方法的毫秒位上为全零，即只是精确到秒的毫秒数
             };
             */

            /*
             将"08/11/2013"转换为Date对象：new Date("08/11/2013");

             getMonth()获得的值的范围为0-11，0表示1月，11表示12月。
             */




            strDate2Timestamp: function (strDate) {
                return new Date(Date.parse(strDate.replace(/-/g, "/"))).getTime();
            }
        }
    }());
    Tool.func = (function () {
        return {
            argumentNames: function (fn) {
                var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g, '').split(',');
                return names.length == 1 && !names[0] ? [] : names;
            },
            //获得函数名
            getFunctionName: function (fn) {
                var name = "";

                if (!fn) {
                    return null;
                }

                name = fn.toString().match(/^.*function\s*([^\(]*)/);
                return name === null ? name : name[1];
            },
            bind: function (object, fun) {
                return function () {
                    return fun.apply(object, arguments);
                };
            },
            /*
             注意BindWithArguments与bind的区别！它们传的参数不一样！

             示例：

             var func = bind(this, A);
             func("a");  //将func的参数"a"传入A

             var func = bindWithArguments(this, A, "b");
             func(); //将"b"传入A
             */

            bindWithArguments: function (object, fun, args) {
                var _args = null;
                var self = this;

                _args = Array.prototype.slice.call(arguments, 2);

                return function () {
                    return fun.apply(object, _args);
                }
            }
        }
    }());
    Tool.string = (function () {
        return {
            /* 去除开头和结尾的指定字符串（如果有的话） */
            trimStr: function (source, str) {
                var temp = "";
                var new_str = "^" + str;
                var reg = new RegExp(new_str);

                temp = source.replace(reg, "");
                new_str = str + "$";
                reg = new RegExp(new_str);

                return temp.replace(reg, "");
            },
            /*7-16 - 7-17
             * 替换指定的匹配。
             *即替换第number个匹配项
             *source为要处理的字符串，matchStr为匹配的正则表达式(没有两边的“/“，即本来应该为“/\d*as/g“，则match为“\d*as“)，
             *replaceMent为替换项，number指明要替换第几个匹配项

             例如：
             var body = "<br/><span/><br/>";
             replace(body, "<br\/>", "<br/>*\r", "last");   //最后的br后加*，作为评论内容开始的标记

             //body = "<br/><span/><br/>*\r"
             */
            replace: function (source, matchStr, replaceMent, number) {
                var _source = "";
                var _number = null;
                var temp = null;
                var remain = null;
                var index = null;
                var result = null;
                var str = null;
                var reg = null;
                var replace_reg = null;
                var i = 1;
                var arr_m = null;

                if (Tool.judge.isString(source)) {
                    _source = source;
                }
                else {
                    try {
                        _source = source.toString();
                    }
                    catch (e) {
                        alert("source需要为string类型");
                        return;
                    }
                }

                switch (number) {
                    case "last":    //替换最后一个匹配项
                        str = matchStr + "([^" + matchStr + "]*)$";
                        reg = new RegExp(str);  //使用RegExp对象来构造动态匹配
                        result = _source.replace(reg, function (_match, first) { //_match为匹配项，first为第一个子匹配项
                            return replaceMent + first;
                        });
                        break;
                    case "first":   //替换第一个匹配项
                        str = matchStr;
                        reg = new RegExp(str);  //使用RegExp对象来构造动态匹配
                        result = _source.replace(reg, replaceMent);
                        break;
                    default:    //替换指定位置的匹配项
                        reg = new RegExp(matchStr, "g");
                        replace_reg = new RegExp(matchStr);

                        while ((arr_m = reg.exec(_source)) != null) {
                            if (i++ == number) {    //先判等，再自加
                                index = reg.lastIndex - arr_m[0].length;    //lastIndex为下一次匹配开始的位置，即为匹配的字符串的最后一个字符的后一位的位置
                                temp = _source.slice(0, index);
                                remain = _source.slice(index).replace(replace_reg, replaceMent);
                                result = temp + remain;
                                break;
                            }
                        }
                        if (!reg.lastIndex) {
                            result = _source;
                        }
                        break;
                }
                return result;
            },
            //去掉两边空白
            trim: function (info) {
                return info.replace(/^\s*/, "").replace(/\s*$/, "");
            }
        }
    }());

    Tool.object = (function () {
        return {
            //删除obj的成员member
            deleteMember: function (obj, member) {
                /* 它不会删除o.x指向的对象，而是删除o.x属性本身。
                 示例：
                 var o = {};
                 o.x = new Object();
                 delete o.x;     // 上一行new的Object对象依然存在
                 o.x;            // undefined，o的名为x的属性被删除了
                 在实际的Javascript中，delete o.x之后，Object对象会由于失去了引用而被垃圾回收， 所以delete o.x也就“相当于”删除了o.x所指向的对象，
                 具有DontDelete的的属性不能被delete。例如，prototype中声明的属性就无法被delete

                 delete是普通运算符，会返回true或false。规则为：当被delete的对象的属性存在并且拥有DontDelete时
                 返回false，否则返回true。 这里的一个特点就是，对象属性不存在时也返回true，所以返回值并非完全等同于删除成功与否。
                 */
                delete obj[member];
            }
        };
    }());

    Tool.math = (function () {
        return {
            /**
             * 获得小数部分
             * 如：
             * expect(number.getDecimal(2.22, 2)).toEqual(0.22);
             *
             * @param decimal    要处理的数字
             * @param digit    小数位数
             * @returns
             */
            getDecimal: function (decimal, digit) {
                var numStr = Tool.convert.toString(decimal),
                    index = numStr.indexOf("."),
                    digit = digit + 1;

                if (index === -1) {
                    return 0;
                }


                return Number("0" + numStr.substring(index, index + digit));

                /*
                 * 不使用正则表达式，因为不好处理digit位数大于实际的小数位数的情况。
                 * 如：number.getDecimal("2.2", 2)

                 var rex = new RegExp("[0-9]+(\\.[0-9]{" + digit.toString() + "})[0-9]\*");

                 return parseFloat(decimal.toString().replace(rex, "0$1"));
                 */
            },
            truncateDecimal: function (decimal, digit) {
                var num = Math.pow(10, digit),
                    decimalNumber = this.getDecimalNumber(decimal),
                    result = 0;

                if (num === Infinity) {
                    throw new Error("浮点溢出");
                }
                if (!isNaN(decimalNumber) && digit > decimalNumber) {
                    return decimal;
                }

                if (decimal > 0) {
                    result = Math.floor(decimal * num) / num;
                }
                else {
                    result = -Math.floor(-decimal * num) / num;
                }

                return result;
            },
            toFixed: function (decimal, digit) {
                var num = Math.pow(10, digit),
                    decimalNumber = this.getDecimalNumber(decimal),
                    result = 0;

                if (num === Infinity) {
                    throw new Error("浮点溢出");
                }
                if (!isNaN(decimalNumber) && digit > decimalNumber) {
                    return decimal;
                }

                if (decimal > 0) {
                    result = Math.round(decimal * num) / num;
                }
                else {
                    result = -Math.round(-decimal * num) / num;
                }

                if (result < 0 && result > 1e-5) {
                    result = 0;
                }

                return result;
            },
            getDecimalNumber: function (decimal) {
                var numStr = Tool.convert.toString(decimal);

                var portionArr = numStr.split('.');

                if (numStr.indexOf("e") > -1) {
                    return NaN;
                }

                if (portionArr.length === 1) {
                    //throw new Error("参数必须为小数");
                    return decimal;
                }

                return portionArr[1].length;
            }
        }
    }());
    Tool.random = (function () {
        return {
            //0到1随机小数，如0.4581578007260767
            zeroToOne: function () {
                return Math.random();
            },
            //min到max的任意整数
            nToM: function (min, _under) {
                if (min && _under < min) {
                    throw new Error("参数错误");
                    return;
                }

                max = _under + 1;     //此处要加1。因为_nToM函数只会产生over到_under-1的数。
                switch (arguments.length) {
                    case 1:
                        return Math.floor(Math.random() * max + 1); //没设下限的话，默认为1
                    case 2:
                        return Math.floor(Math.random() * (max - min) + min);
                    default:
                        return 0;
                }
            },
            //生成制定位数的随机整数
            //如生成4位的随机整数：rndNum(4);
            rndNum: function (n) {
                var rnd = "";
                for (var i = 0; i < n; i++)
                    rnd += Math.floor(Math.random() * 10);
                return rnd;
            },

            //min到max的任意整数，且是num的倍数
            nToMByT: function (num, min, max) {
                var a = 0,
                    b = 0,
                    c = 0;

                switch (arguments.length) {
                    case 2:
                        a = Math.floor(max / num);
                        b = 0;  //没设下限的话，默认从0开始
                        c = this.nToM(a, b);
                        return c * num;
                    case 3:
                        a = Math.floor(max / num);
                        b = Math.ceil(min / num);
                        if (a < b) {
                            throw new Error("不存over到under且是num的倍数的整数");
                            return;
                        }
                        c = this.nToM(b, a);
                        return c * num;
                    default:
                        throw new Error("nToMByT 形参不能超过3个");
                }
            },
            //根据概率判断是否发生
            //probability为0-1的数，1表示100%，0表示0%
            probability: function (probability) {
                var result = Math.random();
                //            console.log(t);
                if (result <= probability) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }());

    Tool.optimize = (function () {
        return {
            /*  9-4
             释放闭包
             */
            release: function (resource) {
                $(global).unload(function () {
                    if (resource) {
                        resource = null;
                    }
                    try {
                        if (Tool.judge.browser.isIE()) {
                            CollectGarbage();   //强制回收,ie才有
                        }
                    }
                    catch (e) {
                    }
                });
            },
            //循环处理数组的优化。来自《高性能Javascript》 -> 第6章
            //前提：处理过程可以异步。数据不用按顺序处理。
            //适用于一次性处理整个数组耗时太长（阻塞UI线程），处理单个数组元素耗时不是很短的情况（否则使用后面的批处理了！）。
            //参数：数组，处理函数，回调函数。
            //实例：
            //var arr = [1, 2, 3, 4, 5, 6];
            //function outputValue(value){
            //   console.log(value);
            //};
            //handleArray(arr, outputValue, function(){console.log("Done")});
            handleArray: function (arr, handler, callback) {
                var todo = arr.concat();    //克隆数组

                //处理完单个数组元素后，UI线程空闲25ms，然后再将处理下个数组元素的任务加入到UI线程队列中。
                setTimeout(function () {
                    handler(todo.shift());

                    if (todo.length > 0) {
                        setTimeout(arguments.callee, 25);
                    }
                    else {
                        callback(arr);
                    }
                }, 25);
            },
            /**
             *
             将函数分为多步（函数）执行。来自《高性能Javascript》 -> 第6章
             前提：任务可以异步处理而不影响用户体验或造成相关代码错误。
             适用于函数运行时间太久的情况。
             参数：每步调用的函数数组，参数数组，回调函数。
             注意：每步调用的函数传入的参数都一样！。按照函数数组顺序调用。
             实例：
             function saveDocument(id){
      var tasks = [operDucument, writeText, closeDocument, updateUI]; //数组元素为每步调用的函数
      multiStep(tasks, [id], 25, function(){ console.log("Done");})
    }
             * @param steps
             * @param args
             * @param time 延迟时间，以ms为单位
             * @param callback
             */
            multiStep: function (steps, args, time, callback) {
                var tasks = steps.concat(),
                    time = time || [25, 25],
                    callback = callback || function () {
                        };


                time = Tool.random.nToM(time[0], time[1]);

                setTimeout(function () {
                    var task = tasks.shift();
                    task.apply(null, args || []);
                    if (tasks.length > 0) {
                        setTimeout(arguments.callee, time);
                    }
                    else {
                        callback();
                    }
                }, time);
            },
            //循环批处理数组的优化。来自《高性能Javascript》 -> 第6章
            //与handleArray用法相同。
            //不同点是handleArray一次处理1个数组元素，而batchHandleArray一次处理多个数组元素（执行50ms）。
            batchHandleArray: function (arr, handler, callback) {
                var todo = arr.concat();    //克隆数组

                setTimeout(function () {
                    var start = +new Date();    //“+”将Date对象转化成数字

                    //执行50ms处理一批数组元素（至少处理1个），然后UI线程空闲25ms，然后将该任务加入到UI线程队列中。
                    do {
                        handler(todo.shift());
                    } while (todo.length > 0 && (+new Date() - start < 50));

                    if (todo.length > 0) {
                        setTimeout(arguments.callee, 25);
                    }
                    else {
                        callback(arr);
                    }
                }, 25);
            }
        }
    }());

    Tool.position = (function () {
        function _getCurrentCoord(target) {
            var coor = target.offset();

            if (coor) {
                return { left: coor.left, top: coor.top };
            }

            return { left: 0, top: 0 }
        }


        return {
            /*获得鼠标位置(代码来自于网上)
             兼容ie和ff和chrome
             //360下y坐标有问题！！

             */
            getMousePosition: function (ev) {
                /*
                 这段代码不兼容360

                 if (ev.pageX || ev.pageY) { //ff
                 return { x: ev.pageX, y: ev.pageY };
                 }
                 return {    //ie
                 x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                 y: ev.clientY + document.body.scrollTop - document.body.clientTop
                 };
                 */
                /*新加的这段代码兼容360*/
                var point = {
                    x: 0,
                    y: 0
                };

                // 如果浏览器支持 pageYOffset, 通过 pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
                if (typeof global.pageYOffset != 'undefined') {
                    point.x = global.pageXOffset;
                    point.y = global.pageYOffset;
                }
                // 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离
                // IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat
                else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                    point.x = document.documentElement.scrollLeft;
                    point.y = document.documentElement.scrollTop;
                }
                // 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度
                else if (typeof document.body != 'undefined') {
                    point.x = document.body.scrollLeft;
                    point.y = document.body.scrollTop;
                }

                // 加上鼠标在视窗中的位置
                point.x += ev.clientX;
                point.y += ev.clientY;

                // 返回鼠标在视窗中的位置
                return point;

            },
            //获得obj到指定的祖先元素parentObj的距离
            getToParentOffset: function (obj, parentObj) {
                var left = 0, top = 0, position = null,
                    obj = $(obj),
                    parentObj = $(parentObj);

                do {
                    position = obj.position();
                    left += position.left;
                    top += position.top;

                    obj = obj.offsetParent();
                } while (obj && obj[0] !== parentObj[0]);    //jquery对象不能用"=="或"==="判等，要转换为dom对象再判等
                return {
                    left: left,
                    top: top
                };
            },
            //获得页面滚动条距离
            //测试环境：ie7、9、ff、chrome
            currentScrollTop: function () {
                if (navigator.userAgent.indexOf("Chrome") >= 0) {
                    return document.body.scrollTop;
                }
                else {
                    return document.documentElement.scrollTop;
                }
            },
            //将obj绝对定位到target中中间。
            //被定位对象 定位目标 被定为对象宽度 被定为对象高度
            positionToCenter: function (obj, target, width, height) {
                var left = 0,
                    top = 0,
                    targetCoor = null,
                    target_width = 0,
                    target_height = 0;

                target = $(target);
                obj = $(obj);

                target_width = target.width();
                target_height = target.height();

                if (width > target_width || height > target_height) {
                    throw new Error("被定位对象宽度或高度超过目标对象！");
                }


                targetCoor = _getCurrentCoord(target);

                //定位
                left = targetCoor.left + target_width / 2 - width / 2;
                top = targetCoor.top + target_height / 2 - height / 2;

                obj.css({ "top": top, "left": left, "position": "absolute" });
            }
        }
    }());
    Tool.path = (function () {
        /*
         location.pathname： 返回URL的域名（域名IP）后的部分。

         例如 http://www.example.com/wordpress/返回/wordpress/，
         又或则 http://127.0.0.1/index.html 返回/index.html，
         注意是带url的域名或域名IP

         在磁盘上随便建个Html文件进行location.pathname测试，如浏览器上的路径是： C:\Documents and Settings\Administrator\桌面\testjs.html， 这样，得到的结果是: /C:\Documents and Settings\Administrator\桌面\testjs.html

         既然提到这了，那我们就分析下下面的URL：

         http://www.example.com:8080/test.php?user=admin&pwd=admin#login
         想得到整个如上的完整url，我们用：location.href;
         得到传输协议http:,我们用：location.protocol;
         得到主机名连同端口www.example.com:8080，我们用：location.host;
         得到主机名www.joymood.cn，我们用：location.hostname;
         得到主机后部分不包括问号?后部分的/test.php，就用我们刚才讲的：location.pathname;
         得到url中问号?之后井号#之前的部分?user=admin&pwd=admin，我们就用： location.search;
         得到#之前的部分#login，我们就用location.hash

         如上，我们可以通过location对象的某些属性得到一个完整URL的各个部分。
         */
        return {
            /**
             获得指定的js文件的加载目录

             @param jsName   js文件名
             */
            getJsDir: function (jsName) {
                //var path = $("script").eq(-1).attr("src");
                var path = $("script[src*='" + jsName + "']").attr("src");

                return path.substring(0, path.lastIndexOf("/") + 1);
            }
        };
    }());

    Tool.code = (function () {
        //*base64编码与解码

        var base64 = (function () {
            var keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=";

            return {
                encode64: function (input) {
                    input = escape(input);
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);
                    return output;
                },
                decode64: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        alert("There were invalid base64 characters in the input text.\n" +
                            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
                            "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
                        output = output + String.fromCharCode(chr1);
                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);
                    return unescape(output);
                }
            }
        }());

        return {
            decode: function (str) {
                var _str = decodeURIComponent(str);

                _str = _str.replace(/\+/g, " "); //将+号替换为空格
                return _str;
            },
            base64: base64
        };
    }());
    Tool.escape = (function () {
        return {
            /* 转义字符串str
             失败！！！ “\”被转义了！！因此取不到str中的"\"
             escape: function (str) {
             return String(str).replace(/\\/g, "\\\\");
             },
             */

            /*  对Jquery中的特殊字符转义。
             用于选择器中的字符（OperateSelect.js）。
             */
            escapeJquery: function (str) {
                return String(str).replace(/(#|\.|@|\[|\])/g, "\\$1");
            }
        }
    }());


    // 支持AMD、CMD、CommonJS规范
    // 支持通过script标签直接引用（Top的方法位于命名空间YYC中，Tool的方法位于命名空间YYC.Tool中）

    var hasDefine = typeof define === "function",
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine || hasExports) {
        Tool.object.deleteMember(Top, YToolConfig.toolNamespace);
        Tool.extend.extend(Tool, Top);

        if (hasDefine) {
            define(function () {
                return Tool;
            });
        }
        else if (hasExports) {
            module.exports = Tool;
        }
    }
    else {
        global[YToolConfig.topNamespace] = global[YToolConfig.topNamespace] || {};

        Tool.extend.extend(global[YToolConfig.topNamespace], Top);
    }
}());

