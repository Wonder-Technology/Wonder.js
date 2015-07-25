var dyCb;
(function (dyCb) {
    dyCb.$BREAK = {
        break: true
    };
    dyCb.$REMOVE = void 0;
})(dyCb || (dyCb = {}));

/// <reference path="definitions.d.ts"/>
var dyCb;
(function (dyCb) {
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
            var result = dyCb.Collection.create(), children = this._children, key = null;
            for (key in children) {
                if (children.hasOwnProperty(key)) {
                    result.addChild(key);
                }
            }
            return result;
        };
        Hash.prototype.getChild = function (key) {
            return this._children[key];
        };
        Hash.prototype.addChild = function (key, value) {
            this._children[key] = value;
            return this;
        };
        Hash.prototype.appendChild = function (key, value) {
            //if (JudgeUtils.isArray(this._children[key])) {
            //    this._children[key].push(value);
            //}
            //else {
            //    this._children[key] = [value];
            //}
            if (this._children[key] instanceof dyCb.Collection) {
                this._children[key].addChild(value);
            }
            else {
                this._children[key] = dyCb.Collection.create().addChild(value);
            }
            return this;
        };
        Hash.prototype.removeChild = function (arg) {
            if (dyCb.JudgeUtils.isString(arg)) {
                var key = arg;
                this._children[key] = undefined;
                delete this._children[key];
            }
            else if (dyCb.JudgeUtils.isFunction(arg)) {
                var func = arg, self_1 = this;
                //return this._removeChild(this._children, arg);
                this.forEach(function (val, key) {
                    if (func(val, key)) {
                        self_1._children[key] = undefined;
                        delete self_1._children[key];
                    }
                });
            }
            return this;
        };
        Hash.prototype.hasChild = function (arg) {
            if (dyCb.JudgeUtils.isFunction(arguments[0])) {
                var func = arguments[0], result = false;
                this.forEach(function (val, key) {
                    if (func(val, key)) {
                        result = true;
                        return dyCb.$BREAK;
                    }
                });
                return result;
            }
            var key = arguments[0];
            return !!this._children[key];
        };
        Hash.prototype.forEach = function (func, context) {
            var i = null, children = this._children;
            for (i in children) {
                if (children.hasOwnProperty(i)) {
                    if (func.call(context, children[i], i) === dyCb.$BREAK) {
                        break;
                    }
                }
            }
            return this;
        };
        Hash.prototype.filter = function (func) {
            var result = {}, scope = this._children;
            this.forEach(function (val, key) {
                if (!func.call(scope, val, key)) {
                    return;
                }
                result[key] = val;
            });
            return Hash.create(result);
        };
        Hash.prototype.map = function (func) {
            var resultMap = {};
            this.forEach(function (val, key) {
                var result = func(val, key);
                if (result !== dyCb.$REMOVE) {
                    dyCb.Log.error(!dyCb.JudgeUtils.isArray(result) || result.length !== 2, dyCb.Log.info.FUNC_MUST_BE("iterator", "[key, value]"));
                    resultMap[result[0]] = result[1];
                }
            });
            return Hash.create(resultMap);
        };
        return Hash;
    })();
    dyCb.Hash = Hash;
})(dyCb || (dyCb = {}));

var dyCb;
(function (dyCb) {
    var JudgeUtils = (function () {
        function JudgeUtils() {
        }
        JudgeUtils.isArray = function (val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        };
        JudgeUtils.isFunction = function (func) {
            return Object.prototype.toString.call(func) === "[object Function]";
        };
        JudgeUtils.isNumber = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        };
        JudgeUtils.isString = function (str) {
            return Object.prototype.toString.call(str) === "[object String]";
        };
        JudgeUtils.isBoolean = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        };
        JudgeUtils.isDom = function (obj) {
            return obj instanceof HTMLElement;
        };
        /**
         * 判断是否为对象字面量（{}）
         */
        JudgeUtils.isDirectObject = function (obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return true;
            }
            return false;
        };
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
        JudgeUtils.isHostMethod = function (object, property) {
            var type = typeof object[property];
            return type === "function" ||
                (type === "object" && !!object[property]) ||
                type === "unknown";
        };
        return JudgeUtils;
    })();
    dyCb.JudgeUtils = JudgeUtils;
})(dyCb || (dyCb = {}));

var dyCb;
(function (dyCb) {
    var AjaxUtils = (function () {
        function AjaxUtils() {
        }
        /*!
         实现ajax

         ajax({
         type:"post",//post或者get，非必须
         url:"test.jsp",//必须的
         data:"name=dipoo&info=good",//非必须
         dataType:"json",//text/xml/json，非必须
         success:function(data){//回调函数，非必须
         alert(data.name);
         }
         });*/
        AjaxUtils.ajax = function (conf) {
            var type = conf.type; //type参数,可选
            var url = conf.url; //url参数，必填
            var data = conf.data; //data参数可选，只有在post请求时需要
            var dataType = conf.dataType; //datatype参数可选
            var success = conf.success; //回调函数可选
            var error = conf.error;
            var xhr = null;
            var self = this;
            if (type === null) {
                type = "get";
            }
            if (dataType === null) {
                dataType = "text";
            }
            xhr = this._createAjax(error);
            if (!xhr) {
                return;
            }
            try {
                xhr.open(type, url, true);
                if (this._isSoundFile(dataType)) {
                    xhr.responseType = "arraybuffer";
                }
                if (type === "GET" || type === "get") {
                    xhr.send(null);
                }
                else if (type === "POST" || type === "post") {
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(data);
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4
                        && (xhr.status === 200 || self._isLocalFile(xhr.status))) {
                        if (dataType === "text" || dataType === "TEXT") {
                            if (success !== null) {
                                success(xhr.responseText);
                            }
                        }
                        else if (dataType === "xml" || dataType === "XML") {
                            if (success !== null) {
                                success(xhr.responseXML);
                            }
                        }
                        else if (dataType === "json" || dataType === "JSON") {
                            if (success !== null) {
                                success(eval("(" + xhr.responseText + ")"));
                            }
                        }
                        else if (self._isSoundFile(dataType)) {
                            if (success !== null) {
                                success(xhr.response);
                            }
                        }
                    }
                };
            }
            catch (e) {
                error(xhr, e);
            }
        };
        AjaxUtils._createAjax = function (error) {
            var xhr = null;
            try {
                xhr = new ActiveXObject("microsoft.xmlhttp");
            }
            catch (e1) {
                try {
                    xhr = new XMLHttpRequest();
                }
                catch (e2) {
                    error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
                    return null;
                }
            }
            return xhr;
        };
        AjaxUtils._isLocalFile = function (status) {
            return document.URL.contain("file://") && status === 0;
        };
        AjaxUtils._isSoundFile = function (dataType) {
            return dataType === "arraybuffer";
        };
        return AjaxUtils;
    })();
    dyCb.AjaxUtils = AjaxUtils;
})(dyCb || (dyCb = {}));

/// <reference path="../definitions.d.ts"/>
var dyCb;
(function (dyCb) {
    var ConvertUtils = (function () {
        function ConvertUtils() {
        }
        ConvertUtils.toString = function (obj) {
            if (dyCb.JudgeUtils.isNumber(obj)) {
                return String(obj);
            }
            //if (JudgeUtils.isjQuery(obj)) {
            //    return _jqToString(obj);
            //}
            if (dyCb.JudgeUtils.isFunction(obj)) {
                return this._convertCodeToString(obj);
            }
            if (dyCb.JudgeUtils.isDirectObject(obj) || dyCb.JudgeUtils.isArray(obj)) {
                return JSON.stringify(obj);
            }
            return String(obj);
        };
        ConvertUtils._convertCodeToString = function (fn) {
            return fn.toString().split('\n').slice(1, -1).join('\n') + '\n';
        };
        return ConvertUtils;
    })();
    dyCb.ConvertUtils = ConvertUtils;
})(dyCb || (dyCb = {}));

/// <reference path="../definitions.d.ts"/>
var dyCb;
(function (dyCb) {
    //declare var window:any;
    var EventUtils = (function () {
        function EventUtils() {
        }
        EventUtils.bindEvent = function (context, func) {
            //var args = Array.prototype.slice.call(arguments, 2),
            //    self = this;
            return function (event) {
                //return fun.apply(object, [self.wrapEvent(event)].concat(args)); //对事件对象进行包装
                return func.call(context, event);
            };
        };
        EventUtils.addEvent = function (dom, eventName, handler) {
            if (dyCb.JudgeUtils.isHostMethod(dom, "addEventListener")) {
                dom.addEventListener(eventName, handler, false);
            }
            else if (dyCb.JudgeUtils.isHostMethod(dom, "attachEvent")) {
                dom.attachEvent("on" + eventName, handler);
            }
            else {
                dom["on" + eventName] = handler;
            }
        };
        EventUtils.removeEvent = function (dom, eventName, handler) {
            if (dyCb.JudgeUtils.isHostMethod(dom, "removeEventListener")) {
                dom.removeEventListener(eventName, handler, false);
            }
            else if (dyCb.JudgeUtils.isHostMethod(dom, "detachEvent")) {
                dom.detachEvent("on" + eventName, handler);
            }
            else {
                dom["on" + eventName] = null;
            }
        };
        return EventUtils;
    })();
    dyCb.EventUtils = EventUtils;
})(dyCb || (dyCb = {}));

/// <reference path="../definitions.d.ts"/>
var dyCb;
(function (dyCb) {
    var ExtendUtils = (function () {
        function ExtendUtils() {
        }
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
        ExtendUtils.extendDeep = function (parent, child, filter) {
            if (filter === void 0) { filter = function (val, i) { return true; }; }
            var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
            //数组的话，不获得Array原型上的成员。
            if (toStr.call(parent) === sArr) {
                _child = child || [];
                for (i = 0, len = parent.length; i < len; i++) {
                    if (!filter(parent[i], i)) {
                        continue;
                    }
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    }
                    else {
                        _child[i] = parent[i];
                    }
                }
            }
            else if (toStr.call(parent) === sOb) {
                _child = child || {};
                for (i in parent) {
                    if (!filter(parent[i], i)) {
                        continue;
                    }
                    type = toStr.call(parent[i]);
                    if (type === sArr || type === sOb) {
                        _child[i] = type === sArr ? [] : {};
                        arguments.callee(parent[i], _child[i]);
                    }
                    else {
                        _child[i] = parent[i];
                    }
                }
            }
            else {
                _child = parent;
            }
            return _child;
        };
        /**
         * 浅拷贝
         */
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
                    && !dyCb.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        return ExtendUtils;
    })();
    dyCb.ExtendUtils = ExtendUtils;
})(dyCb || (dyCb = {}));

var dyCb;
(function (dyCb) {
    var Log = (function () {
        function Log() {
        }
        /**
         * Output Debug message.
         * @function
         * @param {String} message
         */
        Log.log = function (message) {
            if (console && console.log) {
                console.log(message);
            }
            else {
                alert(message);
            }
        };
        /**
         * 断言失败时，会提示错误信息，但程序会继续执行下去
         * 使用断言捕捉不应该发生的非法情况。不要混淆非法情况与错误情况之间的区别，后者是必然存在的并且是一定要作出处理的。
         *
         * 1）对非预期错误使用断言
         断言中的布尔表达式的反面一定要描述一个非预期错误，下面所述的在一定情况下为非预期错误的一些例子：
         （1）空指针。
         （2）输入或者输出参数的值不在预期范围内。
         （3）数组的越界。
         非预期错误对应的就是预期错误，我们通常使用错误处理代码来处理预期错误，而使用断言处理非预期错误。在代码执行过程中，有些错误永远不应该发生，这样的错误是非预期错误。断言可以被看成是一种可执行的注释，你不能依赖它来让代码正常工作（《Code Complete 2》）。例如：
         int nRes = f(); // nRes 由 f 函数控制， f 函数保证返回值一定在 -100 ~ 100
         Assert(-100 <= nRes && nRes <= 100); // 断言，一个可执行的注释
         由于 f 函数保证了返回值处于 -100 ~ 100，那么如果出现了 nRes 不在这个范围的值时，就表明一个非预期错误的出现。后面会讲到“隔栏”，那时会对断言有更加深刻的理解。
         2）不要把需要执行的代码放入断言中
         断言用于软件的开发和维护，而通常不在发行版本中包含断言。
         需要执行的代码放入断言中是不正确的，因为在发行版本中，这些代码通常不会被执行，例如：
         Assert(f()); // f 函数通常在发行版本中不会被执行
         而使用如下方法则比较安全：
         res = f();
         Assert(res); // 安全
         3）对来源于内部系统的可靠的数据使用断言，而不要对外部不可靠的数据使用断言，对于外部不可靠数据，应该使用错误处理代码。
         再次强调，把断言看成可执行的注释。
         * @param cond 如果cond返回false，则断言失败，显示message
         * @param message
         */
        Log.assert = function (cond, message) {
            if (console.assert) {
                console.assert(cond, message);
            }
            else {
                if (!cond && message) {
                    if (console && console.log) {
                        console.log(message);
                    }
                    else {
                        alert(message);
                    }
                }
            }
        };
        Log.error = function (cond, message) {
            if (cond) {
                throw new Error(message);
            }
        };
        Log.info = {
            INVALID_PARAM: "invalid parameter",
            ABSTRACT_ATTRIBUTE: "abstract attribute need override",
            ABSTRACT_METHOD: "abstract method need override",
            helperFunc: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var result = "";
                Array.prototype.slice.call(arguments, 0).forEach(function (val) {
                    result += String(val) + " ";
                });
                return result.slice(0, -1);
            },
            assertion: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (arguments.length === 2) {
                    return this.helperFunc(arguments[0], arguments[1]);
                }
                else if (arguments.length === 3) {
                    return this.helperFunc(arguments[1], arguments[0], arguments[2]);
                }
                else {
                    throw new Error("arguments.length must <= 3");
                }
            },
            FUNC_INVALID: function (value) {
                return this.assertion("invalid", value);
            },
            FUNC_MUST: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST_BE: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must be");
                return this.assertion.apply(this, arr);
            },
            FUNC_MUST_NOT_BE: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("must not be");
                return this.assertion.apply(this, arr);
            },
            FUNC_SHOULD: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var arr = Array.prototype.slice.call(arguments, 0);
                arr.unshift("should");
                return this.assertion.apply(this, arr);
            },
            FUNC_SUPPORT: function (value) {
                return this.assertion("support", value);
            },
            FUNC_NOT_SUPPORT: function (value) {
                return this.assertion("not support", value);
            },
            FUNC_MUST_DEFINE: function (value) {
                return this.assertion("must define", value);
            },
            FUNC_MUST_NOT_DEFINE: function (value) {
                return this.assertion("must not define", value);
            },
            FUNC_UNKNOW: function (value) {
                return this.assertion("unknow", value);
            },
            FUNC_EXPECT: function (value) {
                return this.assertion("expect", value);
            },
            FUNC_UNEXPECT: function (value) {
                return this.assertion("unexpected", value);
            }
        };
        return Log;
    })();
    dyCb.Log = Log;
})(dyCb || (dyCb = {}));

/// <reference path="definitions.d.ts"/>
var dyCb;
(function (dyCb) {
    var Collection = (function () {
        function Collection(children) {
            if (children === void 0) { children = []; }
            this._children = null;
            this._filter = function (arr, func, context) {
                var scope = context || window, result = [];
                this._forEach(arr, function (value, index) {
                    if (!func.call(scope, value, index)) {
                        return;
                    }
                    result.push(value);
                });
                return Collection.create(result);
            };
            this._children = children;
        }
        Collection.create = function (children) {
            if (children === void 0) { children = []; }
            var obj = new this(children);
            return obj;
        };
        Collection.prototype.getCount = function () {
            return this._children.length;
        };
        Collection.prototype.hasChild = function (arg) {
            if (dyCb.JudgeUtils.isFunction(arguments[0])) {
                var func = arguments[0];
                return this._contain(this._children, function (c, i) {
                    return func(c, i);
                });
            }
            var child = arguments[0];
            return this._contain(this._children, function (c, i) {
                if (c === child
                    || (c.uid && child.uid && c.uid === child.uid)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        Collection.prototype.getChildren = function () {
            return this._children;
        };
        Collection.prototype.getChild = function (index) {
            return this._children[index];
        };
        Collection.prototype.addChild = function (child) {
            this._children.push(child);
            return this;
        };
        Collection.prototype.addChildren = function (arg) {
            if (dyCb.JudgeUtils.isArray(arg)) {
                var children = arg;
                this._children = this._children.concat(children);
            }
            else if (arg instanceof Collection) {
                var children = arg;
                this._children = this._children.concat(children.toArray());
            }
            else {
                var child = arg;
                this.addChild(child);
            }
            return this;
        };
        Collection.prototype.removeAllChildren = function () {
            this._children = [];
            return this;
        };
        Collection.prototype.forEach = function (func, context) {
            this._forEach(this._children, func, context);
            return this;
        };
        Collection.prototype.filter = function (func) {
            return this._filter(this._children, func, this._children);
        };
        //public removeChildAt (index) {
        //    Log.error(index < 0, "序号必须大于等于0");
        //
        //    this._children.splice(index, 1);
        //}
        //
        //public copy () {
        //    return ExtendUtils.extendDeep(this._children);
        //}
        //
        //public reverse () {
        //    this._children.reverse();
        //}
        Collection.prototype.removeChild = function (arg) {
            if (dyCb.JudgeUtils.isFunction(arg)) {
                var func = arg;
                this._removeChild(this._children, func);
            }
            else if (arg.uid) {
                this._removeChild(this._children, function (e) {
                    if (!e.uid) {
                        return false;
                    }
                    return e.uid === arg.uid;
                });
            }
            else {
                this._removeChild(this._children, function (e) {
                    return e === arg;
                });
            }
            return this;
        };
        Collection.prototype.sort = function (func) {
            this._children.sort(func);
            return this;
        };
        Collection.prototype.map = function (func) {
            return this._map(this._children, func);
        };
        Collection.prototype.toArray = function () {
            return this._children;
        };
        Collection.prototype._indexOf = function (arr, arg) {
            var result = -1;
            if (dyCb.JudgeUtils.isFunction(arg)) {
                var func = arg;
                this._forEach(arr, function (value, index) {
                    if (!!func.call(null, value, index)) {
                        result = index;
                        return dyCb.$BREAK; //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            else {
                var val = arg;
                this._forEach(arr, function (value, index) {
                    if (val === value
                        || (value.contain && value.contain(val))
                        || (value.indexOf && value.indexOf(val) > -1)) {
                        result = index;
                        return dyCb.$BREAK; //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            return result;
        };
        Collection.prototype._contain = function (arr, arg) {
            return this._indexOf(arr, arg) > -1;
        };
        Collection.prototype._forEach = function (arr, func, context) {
            var scope = context || window, i = 0, len = arr.length;
            for (i = 0; i < len; i++) {
                if (func.call(scope, arr[i], i) === dyCb.$BREAK) {
                    break;
                }
            }
        };
        Collection.prototype._map = function (arr, func) {
            var resultArr = [];
            this._forEach(arr, function (e, index) {
                var result = func(e, index);
                if (result !== dyCb.$REMOVE) {
                    resultArr.push(result);
                }
                //e && e[handlerName] && e[handlerName].apply(context || e, valueArr);
            });
            return Collection.create(resultArr);
        };
        Collection.prototype._removeChild = function (arr, func) {
            var self = this, index = null;
            index = this._indexOf(arr, function (e, index) {
                return !!func.call(self, e);
            });
            //if (index !== null && index !== -1) {
            if (index !== -1) {
                arr.splice(index, 1);
            }
            //return false;
            return arr;
        };
        return Collection;
    })();
    dyCb.Collection = Collection;
})(dyCb || (dyCb = {}));

/// <reference path="../definitions.d.ts"/>
var dyCb;
(function (dyCb) {
    var DomQuery = (function () {
        function DomQuery(domStr) {
            this._doms = null;
            if (dyCb.JudgeUtils.isDom(arguments[0])) {
                this._doms = [arguments[0]];
            }
            else {
                this._doms = document.querySelectorAll(domStr);
            }
            return this;
        }
        DomQuery.create = function (domStr) {
            var obj = new this(domStr);
            return obj;
        };
        DomQuery.prototype.get = function (index) {
            return this._doms[index];
        };
        return DomQuery;
    })();
    dyCb.DomQuery = DomQuery;
})(dyCb || (dyCb = {}));



/// <reference path="../definitions.d.ts"/>

var dyRt;
(function (dyRt) {
    dyRt.root = window;
})(dyRt || (dyRt = {}));

var dyRt;
(function (dyRt) {
    dyRt.ABSTRACT_METHOD = function () {
        return new Error("abstract method need override");
    }, dyRt.ABSTRACT_ATTRIBUTE = null;
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
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
    })();
    dyRt.InnerSubscription = InnerSubscription;
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
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
    })();
    dyRt.Entity = Entity;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var Stream = (function (_super) {
        __extends(Stream, _super);
        function Stream(subscribeFunc) {
            _super.call(this, "Stream");
            this.scheduler = dyRt.ABSTRACT_ATTRIBUTE;
            this.subscribeFunc = null;
            this._disposeHandler = dyCb.Collection.create();
            this.subscribeFunc = subscribeFunc || function () { };
        }
        Object.defineProperty(Stream.prototype, "disposeHandler", {
            get: function () {
                return this._disposeHandler;
            },
            set: function (disposeHandler) {
                this._disposeHandler = disposeHandler;
            },
            enumerable: true,
            configurable: true
        });
        Stream.prototype.subscribe = function (arg1, onError, onCompleted) {
            throw dyRt.ABSTRACT_METHOD();
        };
        Stream.prototype.buildStream = function (observer) {
            this.subscribeFunc(observer);
        };
        Stream.prototype.addDisposeHandler = function (func) {
            this._disposeHandler.addChild(func);
        };
        Stream.prototype.handleSubject = function (arg) {
            if (this._isSubject(arg)) {
                this._setSubject(arg);
                return true;
            }
            return false;
        };
        Stream.prototype.do = function (onNext, onError, onCompleted) {
            return dyRt.DoStream.create(this, onNext, onError, onCompleted);
        };
        Stream.prototype.map = function (selector) {
            return dyRt.MapStream.create(this, selector);
        };
        Stream.prototype.flatMap = function (selector) {
            //return FlatMapStream.create(this, selector);
            return this.map(selector).mergeAll();
        };
        Stream.prototype.mergeAll = function () {
            return dyRt.MergeAllStream.create(this);
        };
        Stream.prototype.takeUntil = function (otherStream) {
            return dyRt.TakeUntilStream.create(this, otherStream);
        };
        Stream.prototype._isSubject = function (subject) {
            return subject instanceof dyRt.Subject;
        };
        Stream.prototype._setSubject = function (subject) {
            subject.source = this;
        };
        return Stream;
    })(dyRt.Entity);
    dyRt.Stream = Stream;
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var Subject = (function () {
        function Subject() {
            this._source = null;
            this._observers = dyCb.Collection.create();
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
            var observer = arg1 instanceof dyRt.Observer
                ? arg1
                : dyRt.AutoDetachObserver.create(arg1, onError, onCompleted);
            observer.setDisposeHandler(this._source.disposeHandler);
            this._observers.addChild(observer);
            return dyRt.InnerSubscription.create(this, observer);
        };
        Subject.prototype.next = function (value) {
            this._observers.forEach(function (ob) {
                ob.next(value);
            });
        };
        Subject.prototype.error = function (error) {
            this._observers.forEach(function (ob) {
                ob.error(error);
            });
        };
        Subject.prototype.completed = function () {
            this._observers.forEach(function (ob) {
                ob.completed();
            });
        };
        Subject.prototype.start = function () {
            this._source.buildStream(this);
        };
        Subject.prototype.remove = function (observer) {
            this._observers.removeChild(function (ob) {
                return dyRt.JudgeUtils.isEqual(ob, observer);
            });
        };
        Subject.prototype.dispose = function () {
            this._observers.forEach(function (ob) {
                ob.dispose();
            });
            this._observers.removeAllChildren();
        };
        return Subject;
    })();
    dyRt.Subject = Subject;
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var Scheduler = (function () {
        function Scheduler() {
        }
        Scheduler.create = function () {
            var obj = new this();
            return obj;
        };
        Scheduler.prototype.publishRecursive = function (observer, initial, action) {
            action(initial);
        };
        Scheduler.prototype.publishInterval = function (observer, initial, interval, action) {
            return dyRt.root.setInterval(function () {
                initial = action(initial);
            }, interval);
        };
        return Scheduler;
    })();
    dyRt.Scheduler = Scheduler;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var Observer = (function (_super) {
        __extends(Observer, _super);
        function Observer(onNext, onError, onCompleted) {
            _super.call(this, "Observer");
            this._isDisposed = null;
            this.onUserNext = null;
            this.onUserError = null;
            this.onUserCompleted = null;
            this._isStop = false;
            this._disposeHandler = dyCb.Collection.create();
            this.onUserNext = onNext || function () { };
            this.onUserError = onError || function () { };
            this.onUserCompleted = onCompleted || function () { };
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
            this._disposeHandler.forEach(function (handler) {
                handler();
            });
        };
        //public fail(e) {
        //    if (!this._isStop) {
        //        this._isStop = true;
        //        this.error(e);
        //        return true;
        //    }
        //
        //    return false;
        //}
        Observer.prototype.setDisposeHandler = function (disposeHandler) {
            this._disposeHandler = disposeHandler;
        };
        Observer.prototype.onNext = function (value) {
            throw dyRt.ABSTRACT_METHOD();
        };
        Observer.prototype.onError = function (error) {
            throw dyRt.ABSTRACT_METHOD();
        };
        Observer.prototype.onCompleted = function () {
            throw dyRt.ABSTRACT_METHOD();
        };
        return Observer;
    })(dyRt.Entity);
    dyRt.Observer = Observer;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var AnonymousObserver = (function (_super) {
        __extends(AnonymousObserver, _super);
        function AnonymousObserver() {
            _super.apply(this, arguments);
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
    })(dyRt.Observer);
    dyRt.AnonymousObserver = AnonymousObserver;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var AutoDetachObserver = (function (_super) {
        __extends(AutoDetachObserver, _super);
        function AutoDetachObserver() {
            _super.apply(this, arguments);
        }
        AutoDetachObserver.create = function (onNext, onError, onCompleted) {
            return new this(onNext, onError, onCompleted);
        };
        AutoDetachObserver.prototype.dispose = function () {
            if (this.isDisposed) {
                dyCb.Log.log("only can dispose once");
                return;
            }
            _super.prototype.dispose.call(this);
        };
        AutoDetachObserver.prototype.onNext = function (value) {
            try {
                this.onUserNext(value);
            }
            catch (e) {
                this.error(e);
            }
        };
        AutoDetachObserver.prototype.onError = function (err) {
            try {
                this.onUserError(err);
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
                //this.error(e);
                throw e;
            }
        };
        return AutoDetachObserver;
    })(dyRt.Observer);
    dyRt.AutoDetachObserver = AutoDetachObserver;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var MapObserver = (function (_super) {
        __extends(MapObserver, _super);
        function MapObserver(currentObserver, selector) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._selector = null;
            this._currentObserver = currentObserver;
            this._selector = selector;
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
    })(dyRt.Observer);
    dyRt.MapObserver = MapObserver;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var DoObserver = (function (_super) {
        __extends(DoObserver, _super);
        function DoObserver(currentObserver, prevObserver) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._prevObserver = null;
            this._currentObserver = currentObserver;
            this._prevObserver = prevObserver;
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
                this._currentObserver.error(error);
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
    })(dyRt.Observer);
    dyRt.DoObserver = DoObserver;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var MergeAllObserver = (function (_super) {
        __extends(MergeAllObserver, _super);
        function MergeAllObserver(currentObserver, streamGroup) {
            _super.call(this, null, null, null);
            this._currentObserver = null;
            this._streamGroup = null;
            this._done = false;
            this._currentObserver = currentObserver;
            this._streamGroup = streamGroup;
        }
        MergeAllObserver.create = function (currentObserver, streamGroup) {
            return new this(currentObserver, streamGroup);
        };
        Object.defineProperty(MergeAllObserver.prototype, "currentObserver", {
            get: function () {
                return this._currentObserver;
            },
            set: function (currentObserver) {
                this._currentObserver = currentObserver;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MergeAllObserver.prototype, "done", {
            get: function () {
                return this._done;
            },
            set: function (done) {
                this._done = done;
            },
            enumerable: true,
            configurable: true
        });
        MergeAllObserver.prototype.onNext = function (innerSource) {
            dyCb.Log.error(!(innerSource instanceof dyRt.Stream || dyRt.JudgeUtils.isPromise(innerSource)), dyCb.Log.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
            if (dyRt.JudgeUtils.isPromise(innerSource)) {
                innerSource = dyRt.fromPromise(innerSource);
            }
            this._streamGroup.addChild(innerSource);
            innerSource.buildStream(InnerObserver.create(this, this._streamGroup, innerSource));
        };
        MergeAllObserver.prototype.onError = function (error) {
            this._currentObserver.error(error);
        };
        MergeAllObserver.prototype.onCompleted = function () {
            this.done = true;
            if (this._streamGroup.getCount() === 0) {
                this._currentObserver.completed();
            }
        };
        return MergeAllObserver;
    })(dyRt.Observer);
    dyRt.MergeAllObserver = MergeAllObserver;
    var InnerObserver = (function (_super) {
        __extends(InnerObserver, _super);
        function InnerObserver(parent, streamGroup, currentStream) {
            _super.call(this, null, null, null);
            this._parent = null;
            this._streamGroup = null;
            this._currentStream = null;
            this._parent = parent;
            this._streamGroup = streamGroup;
            this._currentStream = currentStream;
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
                return dyRt.JudgeUtils.isEqual(stream, currentStream);
            });
            //if this innerSource is async stream(as promise stream),
            //it will first exec all parent.next and one parent.completed,
            //then exec all this.next and all this.completed
            //so in this case, it should invoke parent.currentObserver.completed after the last invokcation of this.completed(have invoked all the innerSource)
            if (this._isAsync() && this._streamGroup.getCount() === 0) {
                parent.currentObserver.completed();
            }
        };
        InnerObserver.prototype._isAsync = function () {
            return this._parent.done;
        };
        return InnerObserver;
    })(dyRt.Observer);
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var TakeUntilObserver = (function (_super) {
        __extends(TakeUntilObserver, _super);
        function TakeUntilObserver(prevObserver) {
            _super.call(this, null, null, null);
            this._prevObserver = null;
            this._prevObserver = prevObserver;
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
    })(dyRt.Observer);
    dyRt.TakeUntilObserver = TakeUntilObserver;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var BaseStream = (function (_super) {
        __extends(BaseStream, _super);
        function BaseStream() {
            _super.apply(this, arguments);
        }
        BaseStream.prototype.subscribeCore = function (observer) {
            throw dyRt.ABSTRACT_METHOD();
        };
        BaseStream.prototype.subscribe = function (arg1, onError, onCompleted) {
            var observer = null;
            if (this.handleSubject(arg1)) {
                return;
            }
            observer = arg1 instanceof dyRt.Observer
                ? arg1
                : dyRt.AutoDetachObserver.create(arg1, onError, onCompleted);
            observer.setDisposeHandler(this.disposeHandler);
            //todo encapsulate it to scheduleItem
            //todo delete target?
            //this.scheduler.target = observer;
            //dyCb.Log.error(this._hasMultiObservers(), "should use Subject to handle multi observers");
            this.buildStream(observer);
            return observer;
        };
        BaseStream.prototype.buildStream = function (observer) {
            _super.prototype.buildStream.call(this, observer);
            this.subscribeCore(observer);
        };
        return BaseStream;
    })(dyRt.Stream);
    dyRt.BaseStream = BaseStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var DoStream = (function (_super) {
        __extends(DoStream, _super);
        function DoStream(source, onNext, onError, onCompleted) {
            _super.call(this, null);
            this._source = null;
            this._observer = null;
            this._source = source;
            this._observer = dyRt.AnonymousObserver.create(onNext, onError, onCompleted);
            this.scheduler = this._source.scheduler;
        }
        DoStream.create = function (source, onNext, onError, onCompleted) {
            var obj = new this(source, onNext, onError, onCompleted);
            return obj;
        };
        DoStream.prototype.buildStream = function (observer) {
            this._source.buildStream(dyRt.DoObserver.create(observer, this._observer));
        };
        return DoStream;
    })(dyRt.BaseStream);
    dyRt.DoStream = DoStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var MapStream = (function (_super) {
        __extends(MapStream, _super);
        function MapStream(source, selector) {
            _super.call(this, null);
            this._source = null;
            this._selector = null;
            this._source = source;
            this.scheduler = this._source.scheduler;
            //this.scheduler.addWrapTarget(MapObserver.create(selector));
            this._selector = selector;
        }
        MapStream.create = function (source, selector) {
            var obj = new this(source, selector);
            return obj;
        };
        MapStream.prototype.buildStream = function (observer) {
            this._source.buildStream(dyRt.MapObserver.create(observer, this._selector));
        };
        return MapStream;
    })(dyRt.BaseStream);
    dyRt.MapStream = MapStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var FromArrayStream = (function (_super) {
        __extends(FromArrayStream, _super);
        function FromArrayStream(array, scheduler) {
            _super.call(this, null);
            this._array = null;
            this._array = array;
            this.scheduler = scheduler;
        }
        FromArrayStream.create = function (array, scheduler) {
            var obj = new this(array, scheduler);
            return obj;
        };
        FromArrayStream.prototype.subscribeCore = function (observer) {
            var array = this._array, len = array.length;
            //next,completed is for TestScheduler to inject
            //todo remove inject next,completed?
            function loopRecursive(i, next, completed) {
                if (i < len) {
                    if (next) {
                        next(array[i]);
                    }
                    else {
                        observer.next(array[i]);
                    }
                    arguments.callee(i + 1, next, completed);
                }
                else {
                    if (completed) {
                        completed();
                    }
                    else {
                        observer.completed();
                    }
                }
            }
            this.scheduler.publishRecursive(observer, 0, loopRecursive);
        };
        return FromArrayStream;
    })(dyRt.BaseStream);
    dyRt.FromArrayStream = FromArrayStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var FromPromiseStream = (function (_super) {
        __extends(FromPromiseStream, _super);
        function FromPromiseStream(promise, scheduler) {
            _super.call(this, null);
            this._promise = null;
            this._promise = promise;
            this.scheduler = scheduler;
        }
        FromPromiseStream.create = function (promise, scheduler) {
            var obj = new this(promise, scheduler);
            return obj;
        };
        FromPromiseStream.prototype.subscribeCore = function (observer) {
            //todo remove test logic from product logic(as Scheduler->publicxxx, FromPromise->then...)
            this._promise.then(function (data) {
                observer.next(data);
                observer.completed();
            }, function (err) {
                observer.error(err);
            }, observer);
        };
        return FromPromiseStream;
    })(dyRt.BaseStream);
    dyRt.FromPromiseStream = FromPromiseStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var FromEventPatternStream = (function (_super) {
        __extends(FromEventPatternStream, _super);
        function FromEventPatternStream(addHandler, removeHandler) {
            _super.call(this, null);
            this._addHandler = null;
            this._removeHandler = null;
            this._addHandler = addHandler;
            this._removeHandler = removeHandler;
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
            this.addDisposeHandler(function () {
                self._removeHandler(innerHandler);
            });
        };
        return FromEventPatternStream;
    })(dyRt.BaseStream);
    dyRt.FromEventPatternStream = FromEventPatternStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var AnonymousStream = (function (_super) {
        __extends(AnonymousStream, _super);
        function AnonymousStream(subscribeFunc) {
            _super.call(this, subscribeFunc);
            this.scheduler = dyRt.Scheduler.create();
        }
        AnonymousStream.create = function (subscribeFunc) {
            var obj = new this(subscribeFunc);
            return obj;
        };
        AnonymousStream.prototype.subscribe = function (onNext, onError, onCompleted) {
            var observer = null;
            if (this.handleSubject(arguments[0])) {
                return;
            }
            observer = dyRt.AutoDetachObserver.create(onNext, onError, onCompleted);
            observer.setDisposeHandler(this.disposeHandler);
            //todo encapsulate it to scheduleItem
            //this.scheduler.target = observer;
            this.buildStream(observer);
            return observer;
        };
        return AnonymousStream;
    })(dyRt.Stream);
    dyRt.AnonymousStream = AnonymousStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var IntervalStream = (function (_super) {
        __extends(IntervalStream, _super);
        function IntervalStream(interval, scheduler) {
            _super.call(this, null);
            this._interval = null;
            this._interval = interval;
            this.scheduler = scheduler;
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
                //self.scheduler.next(count);
                observer.next(count);
                return count + 1;
            });
            this.addDisposeHandler(function () {
                dyRt.root.clearInterval(id);
            });
        };
        return IntervalStream;
    })(dyRt.BaseStream);
    dyRt.IntervalStream = IntervalStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var MergeAllStream = (function (_super) {
        __extends(MergeAllStream, _super);
        function MergeAllStream(source) {
            _super.call(this, null);
            this._source = null;
            this._observer = null;
            this._source = source;
            //this._observer = AnonymousObserver.create(onNext, onError,onCompleted);
            this.scheduler = this._source.scheduler;
        }
        MergeAllStream.create = function (source) {
            var obj = new this(source);
            return obj;
        };
        MergeAllStream.prototype.buildStream = function (observer) {
            var streamGroup = dyCb.Collection.create();
            this._source.buildStream(dyRt.MergeAllObserver.create(observer, streamGroup));
        };
        return MergeAllStream;
    })(dyRt.BaseStream);
    dyRt.MergeAllStream = MergeAllStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var TakeUntilStream = (function (_super) {
        __extends(TakeUntilStream, _super);
        function TakeUntilStream(source, otherStream) {
            _super.call(this, null);
            this._source = null;
            this._otherStream = null;
            this._source = source;
            this._otherStream = dyRt.JudgeUtils.isPromise(otherStream) ? dyRt.fromPromise(otherStream) : otherStream;
            this.scheduler = this._source.scheduler;
        }
        TakeUntilStream.create = function (source, otherSteam) {
            var obj = new this(source, otherSteam);
            return obj;
        };
        TakeUntilStream.prototype.buildStream = function (observer) {
            this._source.buildStream(observer);
            this._otherStream.buildStream(dyRt.TakeUntilObserver.create(observer));
        };
        return TakeUntilStream;
    })(dyRt.BaseStream);
    dyRt.TakeUntilStream = TakeUntilStream;
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    dyRt.createStream = function (subscribeFunc) {
        return dyRt.AnonymousStream.create(subscribeFunc);
    };
    dyRt.fromArray = function (array, scheduler) {
        if (scheduler === void 0) { scheduler = dyRt.Scheduler.create(); }
        return dyRt.FromArrayStream.create(array, scheduler);
    };
    dyRt.fromPromise = function (promise, scheduler) {
        if (scheduler === void 0) { scheduler = dyRt.Scheduler.create(); }
        return dyRt.FromPromiseStream.create(promise, scheduler);
    };
    dyRt.fromEventPattern = function (addHandler, removeHandler) {
        return dyRt.FromEventPatternStream.create(addHandler, removeHandler);
    };
    dyRt.interval = function (interval, scheduler) {
        if (scheduler === void 0) { scheduler = dyRt.Scheduler.create(); }
        return dyRt.IntervalStream.create(interval, scheduler);
    };
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var defaultIsEqual = function (a, b) {
        return a === b;
    };
    var Record = (function () {
        function Record(time, value, actionType, comparer) {
            this._time = null;
            this._value = null;
            this._actionType = null;
            this._comparer = null;
            this._time = time;
            this._value = value;
            this._actionType = actionType;
            this._comparer = comparer || defaultIsEqual;
        }
        Record.create = function (time, value, actionType, comparer) {
            var obj = new this(time, value, actionType, comparer);
            return obj;
        };
        Object.defineProperty(Record.prototype, "time", {
            get: function () {
                return this._time;
            },
            set: function (time) {
                this._time = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Record.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Record.prototype, "actionType", {
            get: function () {
                return this._actionType;
            },
            set: function (actionType) {
                this._actionType = actionType;
            },
            enumerable: true,
            configurable: true
        });
        Record.prototype.equals = function (other) {
            return this._time === other.time && this._comparer(this._value, other.value);
        };
        return Record;
    })();
    dyRt.Record = Record;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var MockObserver = (function (_super) {
        __extends(MockObserver, _super);
        function MockObserver(scheduler) {
            _super.call(this, null, null, null);
            this._messages = [];
            this._scheduler = null;
            this._scheduler = scheduler;
        }
        MockObserver.create = function (scheduler) {
            var obj = new this(scheduler);
            return obj;
        };
        Object.defineProperty(MockObserver.prototype, "messages", {
            get: function () {
                return this._messages;
            },
            set: function (messages) {
                this._messages = messages;
            },
            enumerable: true,
            configurable: true
        });
        MockObserver.prototype.onNext = function (value) {
            this._messages.push(dyRt.Record.create(this._scheduler.clock, value));
        };
        MockObserver.prototype.onError = function (error) {
            this._messages.push(dyRt.Record.create(this._scheduler.clock, error));
        };
        MockObserver.prototype.onCompleted = function () {
            this._messages.push(dyRt.Record.create(this._scheduler.clock, null));
        };
        MockObserver.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this._scheduler.remove(this);
        };
        return MockObserver;
    })(dyRt.Observer);
    dyRt.MockObserver = MockObserver;
})(dyRt || (dyRt = {}));

/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var MockPromise = (function () {
        function MockPromise(scheduler, messages) {
            this._messages = [];
            //get messages(){
            //    return this._messages;
            //}
            //set messages(messages:[Record]){
            //    this._messages = messages;
            //}
            this._scheduler = null;
            this._scheduler = scheduler;
            this._messages = messages;
        }
        MockPromise.create = function (scheduler, messages) {
            var obj = new this(scheduler, messages);
            return obj;
        };
        MockPromise.prototype.then = function (successCb, errorCb, observer) {
            //var scheduler = <TestScheduler>(this.scheduler);
            this._scheduler.setStreamMap(observer, this._messages);
        };
        return MockPromise;
    })();
    dyRt.MockPromise = MockPromise;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var SUBSCRIBE_TIME = 200;
    var DISPOSE_TIME = 1000;
    var TestScheduler = (function (_super) {
        __extends(TestScheduler, _super);
        function TestScheduler() {
            _super.apply(this, arguments);
            this._clock = null;
            this._initialClock = null;
            this._isDisposed = false;
            this._timerMap = dyCb.Hash.create();
            this._streamMap = dyCb.Hash.create();
            this._subscribedTime = null;
            this._disposedTime = null;
        }
        TestScheduler.next = function (tick, value) {
            return dyRt.Record.create(tick, value, dyRt.ActionType.NEXT);
        };
        TestScheduler.error = function (tick, error) {
            return dyRt.Record.create(tick, error, dyRt.ActionType.ERROR);
        };
        TestScheduler.completed = function (tick) {
            return dyRt.Record.create(tick, null, dyRt.ActionType.COMPLETED);
        };
        TestScheduler.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(TestScheduler.prototype, "clock", {
            get: function () {
                return this._clock;
            },
            set: function (clock) {
                this._clock = clock;
            },
            enumerable: true,
            configurable: true
        });
        TestScheduler.prototype.setStreamMap = function (observer, messages) {
            var self = this;
            messages.forEach(function (record) {
                var func = null;
                switch (record.actionType) {
                    case dyRt.ActionType.NEXT:
                        func = function () {
                            observer.next(record.value);
                        };
                        break;
                    case dyRt.ActionType.ERROR:
                        func = function () {
                            observer.error(record.value);
                        };
                        break;
                    case dyRt.ActionType.COMPLETED:
                        func = function () {
                            observer.completed();
                        };
                        break;
                    default:
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_UNKNOW("actionType"));
                        break;
                }
                self._streamMap.addChild(String(record.time), func);
            });
        };
        TestScheduler.prototype.remove = function (observer) {
            this._isDisposed = true;
        };
        TestScheduler.prototype.publishRecursive = function (observer, initial, recursiveFunc) {
            var self = this;
            var messages = [];
            this._setClock();
            recursiveFunc(initial, function (value) {
                self._tick(1);
                messages.push(TestScheduler.next(self._clock, value));
            }, function () {
                self._tick(1);
                messages.push(TestScheduler.completed(self._clock));
                self.setStreamMap(observer, messages);
            });
        };
        TestScheduler.prototype.publishInterval = function (observer, initial, interval, action) {
            //produce 10 val for test
            var COUNT = 10;
            var messages = [];
            this._setClock();
            while (COUNT > 0 && !this._isDisposed) {
                this._tick(interval);
                messages.push(TestScheduler.next(this._clock, initial));
                //no need to invoke action
                //action(initial);
                initial++;
                COUNT--;
            }
            this.setStreamMap(observer, messages);
            return NaN;
        };
        TestScheduler.prototype._setClock = function () {
            if (this._initialClock) {
                this._clock = Math.min(this._clock, this._initialClock);
            }
            this._initialClock = this._clock;
        };
        TestScheduler.prototype.startWithTime = function (create, subscribedTime, disposedTime) {
            var observer = this.createObserver(), source, subscription;
            this._subscribedTime = subscribedTime;
            this._disposedTime = disposedTime;
            this._clock = subscribedTime;
            var self = this;
            this._runAt(subscribedTime, function () {
                source = create();
                subscription = source.subscribe(observer);
            });
            this._runAt(disposedTime, function () {
                subscription.dispose();
            });
            this.start();
            return observer;
        };
        TestScheduler.prototype.startWithSubscribe = function (create, subscribedTime) {
            if (subscribedTime === void 0) { subscribedTime = SUBSCRIBE_TIME; }
            return this.startWithTime(create, subscribedTime, DISPOSE_TIME);
        };
        TestScheduler.prototype.startWithDispose = function (create, disposedTime) {
            if (disposedTime === void 0) { disposedTime = DISPOSE_TIME; }
            return this.startWithTime(create, SUBSCRIBE_TIME, disposedTime);
        };
        TestScheduler.prototype.publicAbsolute = function (time, handler) {
            this._runAt(time, function () {
                handler();
            });
        };
        TestScheduler.prototype.start = function () {
            var extremeNumArr = this._getMinAndMaxTime(), min = extremeNumArr[0], max = extremeNumArr[1], time = min;
            //todo reduce loop time
            while (time <= max) {
                //because "_exec,_runStream" may change "_clock",
                //so it should reset the _clock
                this._clock = time;
                this._exec(time, this._timerMap);
                this._clock = time;
                this._runStream(time);
                time++;
                //todo get max time only from streamMap?
                //need refresh max time.
                //because if timerMap has callback that create infinite stream(as interval),
                //it will set streamMap so that the max time will change
                max = this._getMinAndMaxTime()[1];
            }
        };
        TestScheduler.prototype.createStream = function (args) {
            return dyRt.TestStream.create(Array.prototype.slice.call(arguments, 0), this);
        };
        TestScheduler.prototype.createObserver = function () {
            return dyRt.MockObserver.create(this);
        };
        TestScheduler.prototype.createResolvedPromise = function (time, value) {
            return dyRt.MockPromise.create(this, [TestScheduler.next(time, value), TestScheduler.completed(time + 1)]);
        };
        TestScheduler.prototype.createRejectPromise = function (time, error) {
            return dyRt.MockPromise.create(this, [TestScheduler.error(time, error)]);
        };
        TestScheduler.prototype._getMinAndMaxTime = function () {
            var timeArr = this._timerMap.getKeys().addChildren(this._streamMap.getKeys())
                .map(function (key) {
                return Number(key);
            }).toArray();
            return [Math.min.apply(Math, timeArr), Math.max.apply(Math, timeArr)];
        };
        TestScheduler.prototype._exec = function (time, map) {
            var handler = map.getChild(String(time));
            if (handler) {
                handler();
            }
        };
        TestScheduler.prototype._runStream = function (time) {
            var handler = this._streamMap.getChild(String(time));
            //if(handler && this._hasObserver()){
            if (handler) {
                handler();
            }
        };
        //private _hasObserver(){
        //    if(this.target instanceof Subject){
        //        let subject = <Subject>this.target;
        //
        //         return subject.getObservers() > 0
        //    }
        //
        //    return !!this.target;
        //}
        TestScheduler.prototype._runAt = function (time, callback) {
            this._timerMap.addChild(String(time), callback);
        };
        TestScheduler.prototype._tick = function (time) {
            this._clock += time;
        };
        return TestScheduler;
    })(dyRt.Scheduler);
    dyRt.TestScheduler = TestScheduler;
})(dyRt || (dyRt = {}));

var dyRt;
(function (dyRt) {
    (function (ActionType) {
        ActionType[ActionType["NEXT"] = 0] = "NEXT";
        ActionType[ActionType["ERROR"] = 1] = "ERROR";
        ActionType[ActionType["COMPLETED"] = 2] = "COMPLETED";
    })(dyRt.ActionType || (dyRt.ActionType = {}));
    var ActionType = dyRt.ActionType;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions"/>
var dyRt;
(function (dyRt) {
    var TestStream = (function (_super) {
        __extends(TestStream, _super);
        function TestStream(messages, scheduler) {
            _super.call(this, null);
            this.scheduler = null;
            this._messages = null;
            this._messages = messages;
            this.scheduler = scheduler;
        }
        TestStream.create = function (messages, scheduler) {
            var obj = new this(messages, scheduler);
            return obj;
        };
        TestStream.prototype.subscribeCore = function (observer) {
            //var scheduler = <TestScheduler>(this.scheduler);
            this.scheduler.setStreamMap(observer, this._messages);
        };
        return TestStream;
    })(dyRt.BaseStream);
    dyRt.TestStream = TestStream;
})(dyRt || (dyRt = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    var JudgeUtils = (function (_super) {
        __extends(JudgeUtils, _super);
        function JudgeUtils() {
            _super.apply(this, arguments);
        }
        JudgeUtils.isPromise = function (obj) {
            return !!obj
                && !_super.isFunction.call(this, obj.subscribe)
                && _super.isFunction.call(this, obj.then);
        };
        JudgeUtils.isEqual = function (ob1, ob2) {
            return ob1.uid === ob2.uid;
        };
        return JudgeUtils;
    })(dyCb.JudgeUtils);
    dyRt.JudgeUtils = JudgeUtils;
})(dyRt || (dyRt = {}));

/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      , msie: t
      , version: getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else result = {}

    // set webkit or gecko flag for browsers based on these engines
    if (/(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (android || result.silk) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
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
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')


  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   3.0.18
 */

(function() {
    "use strict";
    function lib$rsvp$utils$$objectOrFunction(x) {
      return typeof x === 'function' || (typeof x === 'object' && x !== null);
    }

    function lib$rsvp$utils$$isFunction(x) {
      return typeof x === 'function';
    }

    function lib$rsvp$utils$$isMaybeThenable(x) {
      return typeof x === 'object' && x !== null;
    }

    var lib$rsvp$utils$$_isArray;
    if (!Array.isArray) {
      lib$rsvp$utils$$_isArray = function (x) {
        return Object.prototype.toString.call(x) === '[object Array]';
      };
    } else {
      lib$rsvp$utils$$_isArray = Array.isArray;
    }

    var lib$rsvp$utils$$isArray = lib$rsvp$utils$$_isArray;

    var lib$rsvp$utils$$now = Date.now || function() { return new Date().getTime(); };

    function lib$rsvp$utils$$F() { }

    var lib$rsvp$utils$$o_create = (Object.create || function (o) {
      if (arguments.length > 1) {
        throw new Error('Second argument not supported');
      }
      if (typeof o !== 'object') {
        throw new TypeError('Argument must be an object');
      }
      lib$rsvp$utils$$F.prototype = o;
      return new lib$rsvp$utils$$F();
    });
    function lib$rsvp$events$$indexOf(callbacks, callback) {
      for (var i=0, l=callbacks.length; i<l; i++) {
        if (callbacks[i] === callback) { return i; }
      }

      return -1;
    }

    function lib$rsvp$events$$callbacksFor(object) {
      var callbacks = object._promiseCallbacks;

      if (!callbacks) {
        callbacks = object._promiseCallbacks = {};
      }

      return callbacks;
    }

    var lib$rsvp$events$$default = {

      /**
        `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
        Example:

        ```javascript
        var object = {};

        RSVP.EventTarget.mixin(object);

        object.on('finished', function(event) {
          // handle event
        });

        object.trigger('finished', { detail: value });
        ```

        `EventTarget.mixin` also works with prototypes:

        ```javascript
        var Person = function() {};
        RSVP.EventTarget.mixin(Person.prototype);

        var yehuda = new Person();
        var tom = new Person();

        yehuda.on('poke', function(event) {
          console.log('Yehuda says OW');
        });

        tom.on('poke', function(event) {
          console.log('Tom says OW');
        });

        yehuda.trigger('poke');
        tom.trigger('poke');
        ```

        @method mixin
        @for RSVP.EventTarget
        @private
        @param {Object} object object to extend with EventTarget methods
      */
      'mixin': function(object) {
        object['on']      = this['on'];
        object['off']     = this['off'];
        object['trigger'] = this['trigger'];
        object._promiseCallbacks = undefined;
        return object;
      },

      /**
        Registers a callback to be executed when `eventName` is triggered

        ```javascript
        object.on('event', function(eventInfo){
          // handle the event
        });

        object.trigger('event');
        ```

        @method on
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to listen for
        @param {Function} callback function to be called when the event is triggered.
      */
      'on': function(eventName, callback) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks;

        callbacks = allCallbacks[eventName];

        if (!callbacks) {
          callbacks = allCallbacks[eventName] = [];
        }

        if (lib$rsvp$events$$indexOf(callbacks, callback) === -1) {
          callbacks.push(callback);
        }
      },

      /**
        You can use `off` to stop firing a particular callback for an event:

        ```javascript
        function doStuff() { // do stuff! }
        object.on('stuff', doStuff);

        object.trigger('stuff'); // doStuff will be called

        // Unregister ONLY the doStuff callback
        object.off('stuff', doStuff);
        object.trigger('stuff'); // doStuff will NOT be called
        ```

        If you don't pass a `callback` argument to `off`, ALL callbacks for the
        event will not be executed when the event fires. For example:

        ```javascript
        var callback1 = function(){};
        var callback2 = function(){};

        object.on('stuff', callback1);
        object.on('stuff', callback2);

        object.trigger('stuff'); // callback1 and callback2 will be executed.

        object.off('stuff');
        object.trigger('stuff'); // callback1 and callback2 will not be executed!
        ```

        @method off
        @for RSVP.EventTarget
        @private
        @param {String} eventName event to stop listening to
        @param {Function} callback optional argument. If given, only the function
        given will be removed from the event's callback queue. If no `callback`
        argument is given, all callbacks will be removed from the event's callback
        queue.
      */
      'off': function(eventName, callback) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, index;

        if (!callback) {
          allCallbacks[eventName] = [];
          return;
        }

        callbacks = allCallbacks[eventName];

        index = lib$rsvp$events$$indexOf(callbacks, callback);

        if (index !== -1) { callbacks.splice(index, 1); }
      },

      /**
        Use `trigger` to fire custom events. For example:

        ```javascript
        object.on('foo', function(){
          console.log('foo event happened!');
        });
        object.trigger('foo');
        // 'foo event happened!' logged to the console
        ```

        You can also pass a value as a second argument to `trigger` that will be
        passed as an argument to all event listeners for the event:

        ```javascript
        object.on('foo', function(value){
          console.log(value.name);
        });

        object.trigger('foo', { name: 'bar' });
        // 'bar' logged to the console
        ```

        @method trigger
        @for RSVP.EventTarget
        @private
        @param {String} eventName name of the event to be triggered
        @param {Any} options optional value to be passed to any event handlers for
        the given `eventName`
      */
      'trigger': function(eventName, options) {
        var allCallbacks = lib$rsvp$events$$callbacksFor(this), callbacks, callback;

        if (callbacks = allCallbacks[eventName]) {
          // Don't cache the callbacks.length since it may grow
          for (var i=0; i<callbacks.length; i++) {
            callback = callbacks[i];

            callback(options);
          }
        }
      }
    };

    var lib$rsvp$config$$config = {
      instrument: false
    };

    lib$rsvp$events$$default['mixin'](lib$rsvp$config$$config);

    function lib$rsvp$config$$configure(name, value) {
      if (name === 'onerror') {
        // handle for legacy users that expect the actual
        // error to be passed to their function added via
        // `RSVP.configure('onerror', someFunctionHere);`
        lib$rsvp$config$$config['on']('error', value);
        return;
      }

      if (arguments.length === 2) {
        lib$rsvp$config$$config[name] = value;
      } else {
        return lib$rsvp$config$$config[name];
      }
    }

    var lib$rsvp$instrument$$queue = [];

    function lib$rsvp$instrument$$scheduleFlush() {
      setTimeout(function() {
        var entry;
        for (var i = 0; i < lib$rsvp$instrument$$queue.length; i++) {
          entry = lib$rsvp$instrument$$queue[i];

          var payload = entry.payload;

          payload.guid = payload.key + payload.id;
          payload.childGuid = payload.key + payload.childId;
          if (payload.error) {
            payload.stack = payload.error.stack;
          }

          lib$rsvp$config$$config['trigger'](entry.name, entry.payload);
        }
        lib$rsvp$instrument$$queue.length = 0;
      }, 50);
    }

    function lib$rsvp$instrument$$instrument(eventName, promise, child) {
      if (1 === lib$rsvp$instrument$$queue.push({
          name: eventName,
          payload: {
            key: promise._guidKey,
            id:  promise._id,
            eventName: eventName,
            detail: promise._result,
            childId: child && child._id,
            label: promise._label,
            timeStamp: lib$rsvp$utils$$now(),
            error: lib$rsvp$config$$config["instrument-with-stack"] ? new Error(promise._label) : null
          }})) {
            lib$rsvp$instrument$$scheduleFlush();
          }
      }
    var lib$rsvp$instrument$$default = lib$rsvp$instrument$$instrument;

    function  lib$rsvp$$internal$$withOwnPromise() {
      return new TypeError('A promises callback cannot return that same promise.');
    }

    function lib$rsvp$$internal$$noop() {}

    var lib$rsvp$$internal$$PENDING   = void 0;
    var lib$rsvp$$internal$$FULFILLED = 1;
    var lib$rsvp$$internal$$REJECTED  = 2;

    var lib$rsvp$$internal$$GET_THEN_ERROR = new lib$rsvp$$internal$$ErrorObject();

    function lib$rsvp$$internal$$getThen(promise) {
      try {
        return promise.then;
      } catch(error) {
        lib$rsvp$$internal$$GET_THEN_ERROR.error = error;
        return lib$rsvp$$internal$$GET_THEN_ERROR;
      }
    }

    function lib$rsvp$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
      try {
        then.call(value, fulfillmentHandler, rejectionHandler);
      } catch(e) {
        return e;
      }
    }

    function lib$rsvp$$internal$$handleForeignThenable(promise, thenable, then) {
      lib$rsvp$config$$config.async(function(promise) {
        var sealed = false;
        var error = lib$rsvp$$internal$$tryThen(then, thenable, function(value) {
          if (sealed) { return; }
          sealed = true;
          if (thenable !== value) {
            lib$rsvp$$internal$$resolve(promise, value);
          } else {
            lib$rsvp$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          if (sealed) { return; }
          sealed = true;

          lib$rsvp$$internal$$reject(promise, reason);
        }, 'Settle: ' + (promise._label || ' unknown promise'));

        if (!sealed && error) {
          sealed = true;
          lib$rsvp$$internal$$reject(promise, error);
        }
      }, promise);
    }

    function lib$rsvp$$internal$$handleOwnThenable(promise, thenable) {
      if (thenable._state === lib$rsvp$$internal$$FULFILLED) {
        lib$rsvp$$internal$$fulfill(promise, thenable._result);
      } else if (thenable._state === lib$rsvp$$internal$$REJECTED) {
        thenable._onError = null;
        lib$rsvp$$internal$$reject(promise, thenable._result);
      } else {
        lib$rsvp$$internal$$subscribe(thenable, undefined, function(value) {
          if (thenable !== value) {
            lib$rsvp$$internal$$resolve(promise, value);
          } else {
            lib$rsvp$$internal$$fulfill(promise, value);
          }
        }, function(reason) {
          lib$rsvp$$internal$$reject(promise, reason);
        });
      }
    }

    function lib$rsvp$$internal$$handleMaybeThenable(promise, maybeThenable) {
      if (maybeThenable.constructor === promise.constructor) {
        lib$rsvp$$internal$$handleOwnThenable(promise, maybeThenable);
      } else {
        var then = lib$rsvp$$internal$$getThen(maybeThenable);

        if (then === lib$rsvp$$internal$$GET_THEN_ERROR) {
          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$GET_THEN_ERROR.error);
        } else if (then === undefined) {
          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
        } else if (lib$rsvp$utils$$isFunction(then)) {
          lib$rsvp$$internal$$handleForeignThenable(promise, maybeThenable, then);
        } else {
          lib$rsvp$$internal$$fulfill(promise, maybeThenable);
        }
      }
    }

    function lib$rsvp$$internal$$resolve(promise, value) {
      if (promise === value) {
        lib$rsvp$$internal$$fulfill(promise, value);
      } else if (lib$rsvp$utils$$objectOrFunction(value)) {
        lib$rsvp$$internal$$handleMaybeThenable(promise, value);
      } else {
        lib$rsvp$$internal$$fulfill(promise, value);
      }
    }

    function lib$rsvp$$internal$$publishRejection(promise) {
      if (promise._onError) {
        promise._onError(promise._result);
      }

      lib$rsvp$$internal$$publish(promise);
    }

    function lib$rsvp$$internal$$fulfill(promise, value) {
      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }

      promise._result = value;
      promise._state = lib$rsvp$$internal$$FULFILLED;

      if (promise._subscribers.length === 0) {
        if (lib$rsvp$config$$config.instrument) {
          lib$rsvp$instrument$$default('fulfilled', promise);
        }
      } else {
        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, promise);
      }
    }

    function lib$rsvp$$internal$$reject(promise, reason) {
      if (promise._state !== lib$rsvp$$internal$$PENDING) { return; }
      promise._state = lib$rsvp$$internal$$REJECTED;
      promise._result = reason;
      lib$rsvp$config$$config.async(lib$rsvp$$internal$$publishRejection, promise);
    }

    function lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
      var subscribers = parent._subscribers;
      var length = subscribers.length;

      parent._onError = null;

      subscribers[length] = child;
      subscribers[length + lib$rsvp$$internal$$FULFILLED] = onFulfillment;
      subscribers[length + lib$rsvp$$internal$$REJECTED]  = onRejection;

      if (length === 0 && parent._state) {
        lib$rsvp$config$$config.async(lib$rsvp$$internal$$publish, parent);
      }
    }

    function lib$rsvp$$internal$$publish(promise) {
      var subscribers = promise._subscribers;
      var settled = promise._state;

      if (lib$rsvp$config$$config.instrument) {
        lib$rsvp$instrument$$default(settled === lib$rsvp$$internal$$FULFILLED ? 'fulfilled' : 'rejected', promise);
      }

      if (subscribers.length === 0) { return; }

      var child, callback, detail = promise._result;

      for (var i = 0; i < subscribers.length; i += 3) {
        child = subscribers[i];
        callback = subscribers[i + settled];

        if (child) {
          lib$rsvp$$internal$$invokeCallback(settled, child, callback, detail);
        } else {
          callback(detail);
        }
      }

      promise._subscribers.length = 0;
    }

    function lib$rsvp$$internal$$ErrorObject() {
      this.error = null;
    }

    var lib$rsvp$$internal$$TRY_CATCH_ERROR = new lib$rsvp$$internal$$ErrorObject();

    function lib$rsvp$$internal$$tryCatch(callback, detail) {
      try {
        return callback(detail);
      } catch(e) {
        lib$rsvp$$internal$$TRY_CATCH_ERROR.error = e;
        return lib$rsvp$$internal$$TRY_CATCH_ERROR;
      }
    }

    function lib$rsvp$$internal$$invokeCallback(settled, promise, callback, detail) {
      var hasCallback = lib$rsvp$utils$$isFunction(callback),
          value, error, succeeded, failed;

      if (hasCallback) {
        value = lib$rsvp$$internal$$tryCatch(callback, detail);

        if (value === lib$rsvp$$internal$$TRY_CATCH_ERROR) {
          failed = true;
          error = value.error;
          value = null;
        } else {
          succeeded = true;
        }

        if (promise === value) {
          lib$rsvp$$internal$$reject(promise, lib$rsvp$$internal$$withOwnPromise());
          return;
        }

      } else {
        value = detail;
        succeeded = true;
      }

      if (promise._state !== lib$rsvp$$internal$$PENDING) {
        // noop
      } else if (hasCallback && succeeded) {
        lib$rsvp$$internal$$resolve(promise, value);
      } else if (failed) {
        lib$rsvp$$internal$$reject(promise, error);
      } else if (settled === lib$rsvp$$internal$$FULFILLED) {
        lib$rsvp$$internal$$fulfill(promise, value);
      } else if (settled === lib$rsvp$$internal$$REJECTED) {
        lib$rsvp$$internal$$reject(promise, value);
      }
    }

    function lib$rsvp$$internal$$initializePromise(promise, resolver) {
      var resolved = false;
      try {
        resolver(function resolvePromise(value){
          if (resolved) { return; }
          resolved = true;
          lib$rsvp$$internal$$resolve(promise, value);
        }, function rejectPromise(reason) {
          if (resolved) { return; }
          resolved = true;
          lib$rsvp$$internal$$reject(promise, reason);
        });
      } catch(e) {
        lib$rsvp$$internal$$reject(promise, e);
      }
    }

    function lib$rsvp$enumerator$$makeSettledResult(state, position, value) {
      if (state === lib$rsvp$$internal$$FULFILLED) {
        return {
          state: 'fulfilled',
          value: value
        };
      } else {
        return {
          state: 'rejected',
          reason: value
        };
      }
    }

    function lib$rsvp$enumerator$$Enumerator(Constructor, input, abortOnReject, label) {
      this._instanceConstructor = Constructor;
      this.promise = new Constructor(lib$rsvp$$internal$$noop, label);
      this._abortOnReject = abortOnReject;

      if (this._validateInput(input)) {
        this._input     = input;
        this.length     = input.length;
        this._remaining = input.length;

        this._init();

        if (this.length === 0) {
          lib$rsvp$$internal$$fulfill(this.promise, this._result);
        } else {
          this.length = this.length || 0;
          this._enumerate();
          if (this._remaining === 0) {
            lib$rsvp$$internal$$fulfill(this.promise, this._result);
          }
        }
      } else {
        lib$rsvp$$internal$$reject(this.promise, this._validationError());
      }
    }

    var lib$rsvp$enumerator$$default = lib$rsvp$enumerator$$Enumerator;

    lib$rsvp$enumerator$$Enumerator.prototype._validateInput = function(input) {
      return lib$rsvp$utils$$isArray(input);
    };

    lib$rsvp$enumerator$$Enumerator.prototype._validationError = function() {
      return new Error('Array Methods must be provided an Array');
    };

    lib$rsvp$enumerator$$Enumerator.prototype._init = function() {
      this._result = new Array(this.length);
    };

    lib$rsvp$enumerator$$Enumerator.prototype._enumerate = function() {
      var length  = this.length;
      var promise = this.promise;
      var input   = this._input;

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        this._eachEntry(input[i], i);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
      var c = this._instanceConstructor;
      if (lib$rsvp$utils$$isMaybeThenable(entry)) {
        if (entry.constructor === c && entry._state !== lib$rsvp$$internal$$PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result);
        } else {
          this._willSettleAt(c.resolve(entry), i);
        }
      } else {
        this._remaining--;
        this._result[i] = this._makeResult(lib$rsvp$$internal$$FULFILLED, i, entry);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
      var promise = this.promise;

      if (promise._state === lib$rsvp$$internal$$PENDING) {
        this._remaining--;

        if (this._abortOnReject && state === lib$rsvp$$internal$$REJECTED) {
          lib$rsvp$$internal$$reject(promise, value);
        } else {
          this._result[i] = this._makeResult(state, i, value);
        }
      }

      if (this._remaining === 0) {
        lib$rsvp$$internal$$fulfill(promise, this._result);
      }
    };

    lib$rsvp$enumerator$$Enumerator.prototype._makeResult = function(state, i, value) {
      return value;
    };

    lib$rsvp$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
      var enumerator = this;

      lib$rsvp$$internal$$subscribe(promise, undefined, function(value) {
        enumerator._settledAt(lib$rsvp$$internal$$FULFILLED, i, value);
      }, function(reason) {
        enumerator._settledAt(lib$rsvp$$internal$$REJECTED, i, reason);
      });
    };
    function lib$rsvp$promise$all$$all(entries, label) {
      return new lib$rsvp$enumerator$$default(this, entries, true /* abort on reject */, label).promise;
    }
    var lib$rsvp$promise$all$$default = lib$rsvp$promise$all$$all;
    function lib$rsvp$promise$race$$race(entries, label) {
      /*jshint validthis:true */
      var Constructor = this;

      var promise = new Constructor(lib$rsvp$$internal$$noop, label);

      if (!lib$rsvp$utils$$isArray(entries)) {
        lib$rsvp$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
        return promise;
      }

      var length = entries.length;

      function onFulfillment(value) {
        lib$rsvp$$internal$$resolve(promise, value);
      }

      function onRejection(reason) {
        lib$rsvp$$internal$$reject(promise, reason);
      }

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        lib$rsvp$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
      }

      return promise;
    }
    var lib$rsvp$promise$race$$default = lib$rsvp$promise$race$$race;
    function lib$rsvp$promise$resolve$$resolve(object, label) {
      /*jshint validthis:true */
      var Constructor = this;

      if (object && typeof object === 'object' && object.constructor === Constructor) {
        return object;
      }

      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
      lib$rsvp$$internal$$resolve(promise, object);
      return promise;
    }
    var lib$rsvp$promise$resolve$$default = lib$rsvp$promise$resolve$$resolve;
    function lib$rsvp$promise$reject$$reject(reason, label) {
      /*jshint validthis:true */
      var Constructor = this;
      var promise = new Constructor(lib$rsvp$$internal$$noop, label);
      lib$rsvp$$internal$$reject(promise, reason);
      return promise;
    }
    var lib$rsvp$promise$reject$$default = lib$rsvp$promise$reject$$reject;

    var lib$rsvp$promise$$guidKey = 'rsvp_' + lib$rsvp$utils$$now() + '-';
    var lib$rsvp$promise$$counter = 0;

    function lib$rsvp$promise$$needsResolver() {
      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function lib$rsvp$promise$$needsNew() {
      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise’s eventual value or the reason
      why the promise cannot be fulfilled.

      Terminology
      -----------

      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.

      A promise can be in one of three states: pending, fulfilled, or rejected.

      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.

      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.


      Basic Usage:
      ------------

      ```js
      var promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);

        // on failure
        reject(reason);
      });

      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Advanced Usage:
      ---------------

      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.

      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          var xhr = new XMLHttpRequest();

          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();

          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }

      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```

      Unlike callbacks, promises are great composable primitives.

      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON

        return values;
      });
      ```

      @class RSVP.Promise
      @param {function} resolver
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @constructor
    */
    function lib$rsvp$promise$$Promise(resolver, label) {
      this._id = lib$rsvp$promise$$counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      if (lib$rsvp$config$$config.instrument) {
        lib$rsvp$instrument$$default('created', this);
      }

      if (lib$rsvp$$internal$$noop !== resolver) {
        if (!lib$rsvp$utils$$isFunction(resolver)) {
          lib$rsvp$promise$$needsResolver();
        }

        if (!(this instanceof lib$rsvp$promise$$Promise)) {
          lib$rsvp$promise$$needsNew();
        }

        lib$rsvp$$internal$$initializePromise(this, resolver);
      }
    }

    var lib$rsvp$promise$$default = lib$rsvp$promise$$Promise;

    // deprecated
    lib$rsvp$promise$$Promise.cast = lib$rsvp$promise$resolve$$default;
    lib$rsvp$promise$$Promise.all = lib$rsvp$promise$all$$default;
    lib$rsvp$promise$$Promise.race = lib$rsvp$promise$race$$default;
    lib$rsvp$promise$$Promise.resolve = lib$rsvp$promise$resolve$$default;
    lib$rsvp$promise$$Promise.reject = lib$rsvp$promise$reject$$default;

    lib$rsvp$promise$$Promise.prototype = {
      constructor: lib$rsvp$promise$$Promise,

      _guidKey: lib$rsvp$promise$$guidKey,

      _onError: function (reason) {
        lib$rsvp$config$$config.async(function(promise) {
          setTimeout(function() {
            if (promise._onError) {
              lib$rsvp$config$$config['trigger']('error', reason);
            }
          }, 0);
        }, this);
      },

    /**
      The primary way of interacting with a promise is through its `then` method,
      which registers callbacks to receive either a promise's eventual value or the
      reason why the promise cannot be fulfilled.

      ```js
      findUser().then(function(user){
        // user is available
      }, function(reason){
        // user is unavailable, and you are given the reason why
      });
      ```

      Chaining
      --------

      The return value of `then` is itself a promise.  This second, 'downstream'
      promise is resolved with the return value of the first promise's fulfillment
      or rejection handler, or rejected if the handler throws an exception.

      ```js
      findUser().then(function (user) {
        return user.name;
      }, function (reason) {
        return 'default name';
      }).then(function (userName) {
        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
        // will be `'default name'`
      });

      findUser().then(function (user) {
        throw new Error('Found user, but still unhappy');
      }, function (reason) {
        throw new Error('`findUser` rejected and we're unhappy');
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
      });
      ```
      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

      ```js
      findUser().then(function (user) {
        throw new PedagogicalException('Upstream error');
      }).then(function (value) {
        // never reached
      }).then(function (value) {
        // never reached
      }, function (reason) {
        // The `PedgagocialException` is propagated all the way down to here
      });
      ```

      Assimilation
      ------------

      Sometimes the value you want to propagate to a downstream promise can only be
      retrieved asynchronously. This can be achieved by returning a promise in the
      fulfillment or rejection handler. The downstream promise will then be pending
      until the returned promise is settled. This is called *assimilation*.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // The user's comments are now available
      });
      ```

      If the assimliated promise rejects, then the downstream promise will also reject.

      ```js
      findUser().then(function (user) {
        return findCommentsByAuthor(user);
      }).then(function (comments) {
        // If `findCommentsByAuthor` fulfills, we'll have the value here
      }, function (reason) {
        // If `findCommentsByAuthor` rejects, we'll have the reason here
      });
      ```

      Simple Example
      --------------

      Synchronous Example

      ```javascript
      var result;

      try {
        result = findResult();
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js
      findResult(function(result, err){
        if (err) {
          // failure
        } else {
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findResult().then(function(result){
        // success
      }, function(reason){
        // failure
      });
      ```

      Advanced Example
      --------------

      Synchronous Example

      ```javascript
      var author, books;

      try {
        author = findAuthor();
        books  = findBooksByAuthor(author);
        // success
      } catch(reason) {
        // failure
      }
      ```

      Errback Example

      ```js

      function foundBooks(books) {

      }

      function failure(reason) {

      }

      findAuthor(function(author, err){
        if (err) {
          failure(err);
          // failure
        } else {
          try {
            findBoooksByAuthor(author, function(books, err) {
              if (err) {
                failure(err);
              } else {
                try {
                  foundBooks(books);
                } catch(reason) {
                  failure(reason);
                }
              }
            });
          } catch(error) {
            failure(err);
          }
          // success
        }
      });
      ```

      Promise Example;

      ```javascript
      findAuthor().
        then(findBooksByAuthor).
        then(function(books){
          // found books
      }).catch(function(reason){
        // something went wrong
      });
      ```

      @method then
      @param {Function} onFulfilled
      @param {Function} onRejected
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      then: function(onFulfillment, onRejection, label) {
        var parent = this;
        var state = parent._state;

        if (state === lib$rsvp$$internal$$FULFILLED && !onFulfillment || state === lib$rsvp$$internal$$REJECTED && !onRejection) {
          if (lib$rsvp$config$$config.instrument) {
            lib$rsvp$instrument$$default('chained', this, this);
          }
          return this;
        }

        parent._onError = null;

        var child = new this.constructor(lib$rsvp$$internal$$noop, label);
        var result = parent._result;

        if (lib$rsvp$config$$config.instrument) {
          lib$rsvp$instrument$$default('chained', parent, child);
        }

        if (state) {
          var callback = arguments[state - 1];
          lib$rsvp$config$$config.async(function(){
            lib$rsvp$$internal$$invokeCallback(state, child, callback, result);
          });
        } else {
          lib$rsvp$$internal$$subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
      },

    /**
      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
      as the catch block of a try/catch statement.

      ```js
      function findAuthor(){
        throw new Error('couldn't find that author');
      }

      // synchronous
      try {
        findAuthor();
      } catch(reason) {
        // something went wrong
      }

      // async with promises
      findAuthor().catch(function(reason){
        // something went wrong
      });
      ```

      @method catch
      @param {Function} onRejection
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'catch': function(onRejection, label) {
        return this.then(null, onRejection, label);
      },

    /**
      `finally` will be invoked regardless of the promise's fate just as native
      try/catch/finally behaves

      Synchronous example:

      ```js
      findAuthor() {
        if (Math.random() > 0.5) {
          throw new Error();
        }
        return new Author();
      }

      try {
        return findAuthor(); // succeed or fail
      } catch(error) {
        return findOtherAuther();
      } finally {
        // always runs
        // doesn't affect the return value
      }
      ```

      Asynchronous example:

      ```js
      findAuthor().catch(function(reason){
        return findOtherAuther();
      }).finally(function(){
        // author was either found, or not
      });
      ```

      @method finally
      @param {Function} callback
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise}
    */
      'finally': function(callback, label) {
        var constructor = this.constructor;

        return this.then(function(value) {
          return constructor.resolve(callback()).then(function(){
            return value;
          });
        }, function(reason) {
          return constructor.resolve(callback()).then(function(){
            throw reason;
          });
        }, label);
      }
    };

    function lib$rsvp$all$settled$$AllSettled(Constructor, entries, label) {
      this._superConstructor(Constructor, entries, false /* don't abort on reject */, label);
    }

    lib$rsvp$all$settled$$AllSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
    lib$rsvp$all$settled$$AllSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$all$settled$$AllSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;
    lib$rsvp$all$settled$$AllSettled.prototype._validationError = function() {
      return new Error('allSettled must be called with an array');
    };

    function lib$rsvp$all$settled$$allSettled(entries, label) {
      return new lib$rsvp$all$settled$$AllSettled(lib$rsvp$promise$$default, entries, label).promise;
    }
    var lib$rsvp$all$settled$$default = lib$rsvp$all$settled$$allSettled;
    function lib$rsvp$all$$all(array, label) {
      return lib$rsvp$promise$$default.all(array, label);
    }
    var lib$rsvp$all$$default = lib$rsvp$all$$all;
    var lib$rsvp$asap$$len = 0;
    var lib$rsvp$asap$$toString = {}.toString;
    var lib$rsvp$asap$$vertxNext;
    function lib$rsvp$asap$$asap(callback, arg) {
      lib$rsvp$asap$$queue[lib$rsvp$asap$$len] = callback;
      lib$rsvp$asap$$queue[lib$rsvp$asap$$len + 1] = arg;
      lib$rsvp$asap$$len += 2;
      if (lib$rsvp$asap$$len === 2) {
        // If len is 1, that means that we need to schedule an async flush.
        // If additional callbacks are queued before the queue is flushed, they
        // will be processed by this flush that we are scheduling.
        lib$rsvp$asap$$scheduleFlush();
      }
    }

    var lib$rsvp$asap$$default = lib$rsvp$asap$$asap;

    var lib$rsvp$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
    var lib$rsvp$asap$$browserGlobal = lib$rsvp$asap$$browserWindow || {};
    var lib$rsvp$asap$$BrowserMutationObserver = lib$rsvp$asap$$browserGlobal.MutationObserver || lib$rsvp$asap$$browserGlobal.WebKitMutationObserver;
    var lib$rsvp$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

    // test for web worker but not in IE10
    var lib$rsvp$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
      typeof importScripts !== 'undefined' &&
      typeof MessageChannel !== 'undefined';

    // node
    function lib$rsvp$asap$$useNextTick() {
      var nextTick = process.nextTick;
      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
      // setImmediate should be used instead instead
      var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
        nextTick = setImmediate;
      }
      return function() {
        nextTick(lib$rsvp$asap$$flush);
      };
    }

    // vertx
    function lib$rsvp$asap$$useVertxTimer() {
      return function() {
        lib$rsvp$asap$$vertxNext(lib$rsvp$asap$$flush);
      };
    }

    function lib$rsvp$asap$$useMutationObserver() {
      var iterations = 0;
      var observer = new lib$rsvp$asap$$BrowserMutationObserver(lib$rsvp$asap$$flush);
      var node = document.createTextNode('');
      observer.observe(node, { characterData: true });

      return function() {
        node.data = (iterations = ++iterations % 2);
      };
    }

    // web worker
    function lib$rsvp$asap$$useMessageChannel() {
      var channel = new MessageChannel();
      channel.port1.onmessage = lib$rsvp$asap$$flush;
      return function () {
        channel.port2.postMessage(0);
      };
    }

    function lib$rsvp$asap$$useSetTimeout() {
      return function() {
        setTimeout(lib$rsvp$asap$$flush, 1);
      };
    }

    var lib$rsvp$asap$$queue = new Array(1000);
    function lib$rsvp$asap$$flush() {
      for (var i = 0; i < lib$rsvp$asap$$len; i+=2) {
        var callback = lib$rsvp$asap$$queue[i];
        var arg = lib$rsvp$asap$$queue[i+1];

        callback(arg);

        lib$rsvp$asap$$queue[i] = undefined;
        lib$rsvp$asap$$queue[i+1] = undefined;
      }

      lib$rsvp$asap$$len = 0;
    }

    function lib$rsvp$asap$$attemptVertex() {
      try {
        var r = require;
        var vertx = r('vertx');
        lib$rsvp$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
        return lib$rsvp$asap$$useVertxTimer();
      } catch(e) {
        return lib$rsvp$asap$$useSetTimeout();
      }
    }

    var lib$rsvp$asap$$scheduleFlush;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (lib$rsvp$asap$$isNode) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useNextTick();
    } else if (lib$rsvp$asap$$BrowserMutationObserver) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMutationObserver();
    } else if (lib$rsvp$asap$$isWorker) {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useMessageChannel();
    } else if (lib$rsvp$asap$$browserWindow === undefined && typeof require === 'function') {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$attemptVertex();
    } else {
      lib$rsvp$asap$$scheduleFlush = lib$rsvp$asap$$useSetTimeout();
    }
    function lib$rsvp$defer$$defer(label) {
      var deferred = { };

      deferred['promise'] = new lib$rsvp$promise$$default(function(resolve, reject) {
        deferred['resolve'] = resolve;
        deferred['reject'] = reject;
      }, label);

      return deferred;
    }
    var lib$rsvp$defer$$default = lib$rsvp$defer$$defer;
    function lib$rsvp$filter$$filter(promises, filterFn, label) {
      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!lib$rsvp$utils$$isFunction(filterFn)) {
          throw new TypeError("You must pass a function as filter's second argument.");
        }

        var length = values.length;
        var filtered = new Array(length);

        for (var i = 0; i < length; i++) {
          filtered[i] = filterFn(values[i]);
        }

        return lib$rsvp$promise$$default.all(filtered, label).then(function(filtered) {
          var results = new Array(length);
          var newLength = 0;

          for (var i = 0; i < length; i++) {
            if (filtered[i]) {
              results[newLength] = values[i];
              newLength++;
            }
          }

          results.length = newLength;

          return results;
        });
      });
    }
    var lib$rsvp$filter$$default = lib$rsvp$filter$$filter;

    function lib$rsvp$promise$hash$$PromiseHash(Constructor, object, label) {
      this._superConstructor(Constructor, object, true, label);
    }

    var lib$rsvp$promise$hash$$default = lib$rsvp$promise$hash$$PromiseHash;

    lib$rsvp$promise$hash$$PromiseHash.prototype = lib$rsvp$utils$$o_create(lib$rsvp$enumerator$$default.prototype);
    lib$rsvp$promise$hash$$PromiseHash.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$promise$hash$$PromiseHash.prototype._init = function() {
      this._result = {};
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._validateInput = function(input) {
      return input && typeof input === 'object';
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._validationError = function() {
      return new Error('Promise.hash must be called with an object');
    };

    lib$rsvp$promise$hash$$PromiseHash.prototype._enumerate = function() {
      var promise = this.promise;
      var input   = this._input;
      var results = [];

      for (var key in input) {
        if (promise._state === lib$rsvp$$internal$$PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
          results.push({
            position: key,
            entry: input[key]
          });
        }
      }

      var length = results.length;
      this._remaining = length;
      var result;

      for (var i = 0; promise._state === lib$rsvp$$internal$$PENDING && i < length; i++) {
        result = results[i];
        this._eachEntry(result.entry, result.position);
      }
    };

    function lib$rsvp$hash$settled$$HashSettled(Constructor, object, label) {
      this._superConstructor(Constructor, object, false, label);
    }

    lib$rsvp$hash$settled$$HashSettled.prototype = lib$rsvp$utils$$o_create(lib$rsvp$promise$hash$$default.prototype);
    lib$rsvp$hash$settled$$HashSettled.prototype._superConstructor = lib$rsvp$enumerator$$default;
    lib$rsvp$hash$settled$$HashSettled.prototype._makeResult = lib$rsvp$enumerator$$makeSettledResult;

    lib$rsvp$hash$settled$$HashSettled.prototype._validationError = function() {
      return new Error('hashSettled must be called with an object');
    };

    function lib$rsvp$hash$settled$$hashSettled(object, label) {
      return new lib$rsvp$hash$settled$$HashSettled(lib$rsvp$promise$$default, object, label).promise;
    }
    var lib$rsvp$hash$settled$$default = lib$rsvp$hash$settled$$hashSettled;
    function lib$rsvp$hash$$hash(object, label) {
      return new lib$rsvp$promise$hash$$default(lib$rsvp$promise$$default, object, label).promise;
    }
    var lib$rsvp$hash$$default = lib$rsvp$hash$$hash;
    function lib$rsvp$map$$map(promises, mapFn, label) {
      return lib$rsvp$promise$$default.all(promises, label).then(function(values) {
        if (!lib$rsvp$utils$$isFunction(mapFn)) {
          throw new TypeError("You must pass a function as map's second argument.");
        }

        var length = values.length;
        var results = new Array(length);

        for (var i = 0; i < length; i++) {
          results[i] = mapFn(values[i]);
        }

        return lib$rsvp$promise$$default.all(results, label);
      });
    }
    var lib$rsvp$map$$default = lib$rsvp$map$$map;

    function lib$rsvp$node$$Result() {
      this.value = undefined;
    }

    var lib$rsvp$node$$ERROR = new lib$rsvp$node$$Result();
    var lib$rsvp$node$$GET_THEN_ERROR = new lib$rsvp$node$$Result();

    function lib$rsvp$node$$getThen(obj) {
      try {
       return obj.then;
      } catch(error) {
        lib$rsvp$node$$ERROR.value= error;
        return lib$rsvp$node$$ERROR;
      }
    }


    function lib$rsvp$node$$tryApply(f, s, a) {
      try {
        f.apply(s, a);
      } catch(error) {
        lib$rsvp$node$$ERROR.value = error;
        return lib$rsvp$node$$ERROR;
      }
    }

    function lib$rsvp$node$$makeObject(_, argumentNames) {
      var obj = {};
      var name;
      var i;
      var length = _.length;
      var args = new Array(length);

      for (var x = 0; x < length; x++) {
        args[x] = _[x];
      }

      for (i = 0; i < argumentNames.length; i++) {
        name = argumentNames[i];
        obj[name] = args[i + 1];
      }

      return obj;
    }

    function lib$rsvp$node$$arrayResult(_) {
      var length = _.length;
      var args = new Array(length - 1);

      for (var i = 1; i < length; i++) {
        args[i - 1] = _[i];
      }

      return args;
    }

    function lib$rsvp$node$$wrapThenable(then, promise) {
      return {
        then: function(onFulFillment, onRejection) {
          return then.call(promise, onFulFillment, onRejection);
        }
      };
    }

    function lib$rsvp$node$$denodeify(nodeFunc, options) {
      var fn = function() {
        var self = this;
        var l = arguments.length;
        var args = new Array(l + 1);
        var arg;
        var promiseInput = false;

        for (var i = 0; i < l; ++i) {
          arg = arguments[i];

          if (!promiseInput) {
            // TODO: clean this up
            promiseInput = lib$rsvp$node$$needsPromiseInput(arg);
            if (promiseInput === lib$rsvp$node$$GET_THEN_ERROR) {
              var p = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);
              lib$rsvp$$internal$$reject(p, lib$rsvp$node$$GET_THEN_ERROR.value);
              return p;
            } else if (promiseInput && promiseInput !== true) {
              arg = lib$rsvp$node$$wrapThenable(promiseInput, arg);
            }
          }
          args[i] = arg;
        }

        var promise = new lib$rsvp$promise$$default(lib$rsvp$$internal$$noop);

        args[l] = function(err, val) {
          if (err)
            lib$rsvp$$internal$$reject(promise, err);
          else if (options === undefined)
            lib$rsvp$$internal$$resolve(promise, val);
          else if (options === true)
            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$arrayResult(arguments));
          else if (lib$rsvp$utils$$isArray(options))
            lib$rsvp$$internal$$resolve(promise, lib$rsvp$node$$makeObject(arguments, options));
          else
            lib$rsvp$$internal$$resolve(promise, val);
        };

        if (promiseInput) {
          return lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self);
        } else {
          return lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self);
        }
      };

      fn.__proto__ = nodeFunc;

      return fn;
    }

    var lib$rsvp$node$$default = lib$rsvp$node$$denodeify;

    function lib$rsvp$node$$handleValueInput(promise, args, nodeFunc, self) {
      var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
      if (result === lib$rsvp$node$$ERROR) {
        lib$rsvp$$internal$$reject(promise, result.value);
      }
      return promise;
    }

    function lib$rsvp$node$$handlePromiseInput(promise, args, nodeFunc, self){
      return lib$rsvp$promise$$default.all(args).then(function(args){
        var result = lib$rsvp$node$$tryApply(nodeFunc, self, args);
        if (result === lib$rsvp$node$$ERROR) {
          lib$rsvp$$internal$$reject(promise, result.value);
        }
        return promise;
      });
    }

    function lib$rsvp$node$$needsPromiseInput(arg) {
      if (arg && typeof arg === 'object') {
        if (arg.constructor === lib$rsvp$promise$$default) {
          return true;
        } else {
          return lib$rsvp$node$$getThen(arg);
        }
      } else {
        return false;
      }
    }
    function lib$rsvp$race$$race(array, label) {
      return lib$rsvp$promise$$default.race(array, label);
    }
    var lib$rsvp$race$$default = lib$rsvp$race$$race;
    function lib$rsvp$reject$$reject(reason, label) {
      return lib$rsvp$promise$$default.reject(reason, label);
    }
    var lib$rsvp$reject$$default = lib$rsvp$reject$$reject;
    function lib$rsvp$resolve$$resolve(value, label) {
      return lib$rsvp$promise$$default.resolve(value, label);
    }
    var lib$rsvp$resolve$$default = lib$rsvp$resolve$$resolve;
    function lib$rsvp$rethrow$$rethrow(reason) {
      setTimeout(function() {
        throw reason;
      });
      throw reason;
    }
    var lib$rsvp$rethrow$$default = lib$rsvp$rethrow$$rethrow;

    // default async is asap;
    lib$rsvp$config$$config.async = lib$rsvp$asap$$default;
    var lib$rsvp$$cast = lib$rsvp$resolve$$default;
    function lib$rsvp$$async(callback, arg) {
      lib$rsvp$config$$config.async(callback, arg);
    }

    function lib$rsvp$$on() {
      lib$rsvp$config$$config['on'].apply(lib$rsvp$config$$config, arguments);
    }

    function lib$rsvp$$off() {
      lib$rsvp$config$$config['off'].apply(lib$rsvp$config$$config, arguments);
    }

    // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
    if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
      var lib$rsvp$$callbacks = window['__PROMISE_INSTRUMENTATION__'];
      lib$rsvp$config$$configure('instrument', true);
      for (var lib$rsvp$$eventName in lib$rsvp$$callbacks) {
        if (lib$rsvp$$callbacks.hasOwnProperty(lib$rsvp$$eventName)) {
          lib$rsvp$$on(lib$rsvp$$eventName, lib$rsvp$$callbacks[lib$rsvp$$eventName]);
        }
      }
    }

    var lib$rsvp$umd$$RSVP = {
      'race': lib$rsvp$race$$default,
      'Promise': lib$rsvp$promise$$default,
      'allSettled': lib$rsvp$all$settled$$default,
      'hash': lib$rsvp$hash$$default,
      'hashSettled': lib$rsvp$hash$settled$$default,
      'denodeify': lib$rsvp$node$$default,
      'on': lib$rsvp$$on,
      'off': lib$rsvp$$off,
      'map': lib$rsvp$map$$default,
      'filter': lib$rsvp$filter$$default,
      'resolve': lib$rsvp$resolve$$default,
      'reject': lib$rsvp$reject$$default,
      'all': lib$rsvp$all$$default,
      'rethrow': lib$rsvp$rethrow$$default,
      'defer': lib$rsvp$defer$$default,
      'EventTarget': lib$rsvp$events$$default,
      'configure': lib$rsvp$config$$configure,
      'async': lib$rsvp$$async
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
      define(function() { return lib$rsvp$umd$$RSVP; });
    } else if (typeof module !== 'undefined' && module['exports']) {
      module['exports'] = lib$rsvp$umd$$RSVP;
    } else if (typeof this !== 'undefined') {
      this['RSVP'] = lib$rsvp$umd$$RSVP;
    }
}).call(this);


var dy;
(function (dy) {
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
            var obj = new this(x, y);
            return obj;
        };
        return Point;
    })();
    dy.Point = Point;
})(dy || (dy = {}));

var dy;
(function (dy) {
    var Position = (function () {
        function Position(x, y, z) {
            this.x = null;
            this.y = null;
            this.z = null;
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Position.create = function (x, y, z) {
            var obj = new this(x, y, z);
            return obj;
        };
        return Position;
    })();
    dy.Position = Position;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
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
            //private _width:number = null;
            get: function () {
                return this._dom.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "height", {
            get: function () {
                return this._dom.height;
            },
            enumerable: true,
            configurable: true
        });
        ViewWebGL.prototype.getContext = function () {
            return this._dom.getContext("webgl") || this._dom.getContext("experimental-webgl");
        };
        return ViewWebGL;
    })();
    dy.ViewWebGL = ViewWebGL;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Vector3 = (function () {
        function Vector3() {
            this._values = new Float32Array(3);
            if (arguments.length > 0) {
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] = arguments[2];
            }
        }
        Vector3.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0], arguments[1], arguments[2]);
            }
            return m;
        };
        Object.defineProperty(Vector3.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Vector3.prototype.normalize = function () {
            var v = this._values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                return Vector3.create(0, 0, 0);
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            return this;
        };
        Vector3.prototype.sub = function (v) {
            return Vector3.create(this._values[0] - v.values[0], this._values[1] - v.values[1], this._values[2] - v.values[2]);
        };
        Vector3.prototype.reverse = function () {
            this._values[0] = -this._values[0];
            this._values[1] = -this._values[1];
            this._values[2] = -this._values[2];
            return this;
        };
        Vector3.prototype.copy = function () {
            var result = Vector3.create(), i = 0, len = this._values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this._values[i];
            }
            return result;
        };
        Vector3.prototype.toVec4 = function () {
            return dy.Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        };
        return Vector3;
    })();
    dy.Vector3 = Vector3;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Vector4 = (function () {
        function Vector4() {
            this._values = new Float32Array(4);
            if (arguments.length > 0) {
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] = arguments[2];
                this._values[3] = arguments[3];
            }
        }
        Vector4.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0], arguments[1], arguments[2], arguments[3]);
            }
            return m;
        };
        Object.defineProperty(Vector4.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Vector4.prototype.normalize = function () {
            var v = this._values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
            if (d === 0) {
                return Vector4.create(0, 0, 0, 0);
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            v[3] = v[3] / d;
            return this;
        };
        Vector4.prototype.toVec3 = function () {
            return dy.Vector3.create(this._values[0], this._values[1], this._values[2]);
        };
        return Vector4;
    })();
    dy.Vector4 = Vector4;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    var Matrix = (function () {
        function Matrix() {
            this._values = null;
            this._matrixArr = null;
            if (arguments.length === 1) {
                this._values = arguments[0];
            }
            else {
                this._values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
            this._matrixArr = [];
        }
        Matrix.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0]);
            }
            return m;
        };
        Object.defineProperty(Matrix.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Matrix.prototype.push = function () {
            this._matrixArr.push(this._values);
        };
        Matrix.prototype.pop = function () {
            this._values = this._matrixArr.pop();
        };
        Matrix.prototype.setIdentity = function () {
            var e = this._values;
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
        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        Matrix.prototype.setInverseOf = function (other) {
            var i, s, d, inv, det;
            s = other.values;
            inv = new Float32Array(16);
            d = this._values;
            inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
                + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
            inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
                - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
            inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
                + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
            inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
                - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
            inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
                - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
            inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
                + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
            inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
                - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
            inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
                + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
            inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
                + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
            inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
                - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
            inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
                + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
            inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
                - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
            inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
                - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
            inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
                + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
            inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
                - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
            inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
                + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
            det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
            if (det === 0) {
                return this;
            }
            det = 1 / det;
            for (i = 0; i < 16; i++) {
                d[i] = inv[i] * det;
            }
            return this;
        };
        /**
         * Calculate the inverse matrix of specified matrix, and set to this.
         * @param other The source matrix
         * @return this
         */
        Matrix.prototype.inverseOf = function () {
            return this.setInverseOf(this);
        };
        /**
         * Transpose the matrix.
         * @return this
         */
        Matrix.prototype.transpose = function () {
            var e, t;
            e = this._values;
            t = e[1];
            e[1] = e[4];
            e[4] = t;
            t = e[2];
            e[2] = e[8];
            e[8] = t;
            t = e[3];
            e[3] = e[12];
            e[12] = t;
            t = e[6];
            e[6] = e[9];
            e[9] = t;
            t = e[7];
            e[7] = e[13];
            e[13] = t;
            t = e[11];
            e[11] = e[14];
            e[14] = t;
            return this;
        };
        /**
         * Set the matrix for translation.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        Matrix.prototype.setTranslate = function (x, y, z) {
            var e = this._values;
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
        /**
         * Multiply the matrix for translation from the right.
         * @param x The X value of a translation.
         * @param y The Y value of a translation.
         * @param z The Z value of a translation.
         * @return this
         */
        Matrix.prototype.translate = function (x, y, z) {
            this.applyMatrix(Matrix.create().setTranslate(x, y, z));
            return this;
        };
        /**
         * Set the matrix for rotation.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        Matrix.prototype.setRotate = function (angle, x, y, z) {
            var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
            var angle = Math.PI * angle / 180;
            e = this._values;
            s = Math.sin(angle);
            c = Math.cos(angle);
            if (0 !== x && 0 === y && 0 === z) {
                // Rotation around X axis
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
                // Rotation around Y axis
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
                // Rotation around Z axis
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
                // Rotation around another axis
                len = Math.sqrt(x * x + y * y + z * z);
                if (len !== 1) {
                    //转换为单位向量
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
        /**
         * Multiply the matrix for rotation from the right.
         * The vector of rotation axis may not be normalized.
         * @param angle The angle of rotation (degrees)
         * @param x The X coordinate of vector of rotation axis.
         * @param y The Y coordinate of vector of rotation axis.
         * @param z The Z coordinate of vector of rotation axis.
         * @return this
         */
        Matrix.prototype.rotate = function (angle, x, y, z) {
            this.applyMatrix(Matrix.create().setRotate(angle, x, y, z));
            return this;
        };
        /**
         * Set the matrix for scaling.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        Matrix.prototype.setScale = function (x, y, z) {
            var e = this._values;
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
        /**
         * Multiply the matrix for scaling from the right.
         * @param x The scale factor along the X axis
         * @param y The scale factor along the Y axis
         * @param z The scale factor along the Z axis
         * @return this
         */
        Matrix.prototype.scale = function (x, y, z) {
            this.applyMatrix(Matrix.create().setScale(x, y, z));
            return this;
        };
        Matrix.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
            var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
            fx = centerX - eyeX;
            fy = centerY - eyeY;
            fz = centerZ - eyeZ;
            // Normalize f.
            rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
            fx *= rlf;
            fy *= rlf;
            fz *= rlf;
            // Calculate cross product of f and up.
            sx = fy * upZ - fz * upY;
            sy = fz * upX - fx * upZ;
            sz = fx * upY - fy * upX;
            // Normalize s.
            rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
            sx *= rls;
            sy *= rls;
            sz *= rls;
            // Calculate cross product of s and f.
            ux = sy * fz - sz * fy;
            uy = sz * fx - sx * fz;
            uz = sx * fy - sy * fx;
            // Set to this.
            e = this._values;
            e[0] = sx;
            e[1] = ux;
            e[2] = -fx;
            e[3] = 0;
            e[4] = sy;
            e[5] = uy;
            e[6] = -fy;
            e[7] = 0;
            e[8] = sz;
            e[9] = uz;
            e[10] = -fz;
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
            //Translate.
            //this.translate(-eyeX, -eyeY, -eyeZ);
            this.values = this.multiply(Matrix.create().setTranslate(-eyeX, -eyeY, -eyeZ)).values;
            return this;
        };
        /**
         * Multiply the viewing matrix from the right.
         * @param eyeX, eyeY, eyeZ The position of the eye point.
         * @param centerX, centerY, centerZ The position of the reference point.
         * @param upX, upY, upZ The direction of the up vector.
         * @return this
         */
        Matrix.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
            this.applyMatrix(Matrix.create().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
            return this;
        };
        Matrix.prototype.setOrtho = function (near, far) {
            var e = this._values;
            e[0] = 1;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = 1;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = 2 / (near - far);
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = (near + far) / (near - far);
            e[15] = 1;
            return this;
        };
        Matrix.prototype.ortho = function (n, f) {
            this.applyMatrix(Matrix.create().setOrtho(n, f));
            return this;
        };
        /**
         * Set the perspective projection matrix by fovy and aspect.
         * @param fovy The angle between the upper and lower sides of the frustum.
         * @param aspect The aspect ratio of the frustum. (width/height)
         * @param near The distances to the nearer depth clipping plane. This value must be plus value.
         * @param far The distances to the farther depth clipping plane. This value must be plus value.
         * @return this
         */
        Matrix.prototype.setPerspective = function (fovy, aspect, near, far) {
            var e, rd, s, ct, log = dyCb.Log, info = log.info;
            log.error(near === far || aspect === 0, info.FUNC_MUST_NOT_BE("frustum", "null"));
            log.error(near <= 0, info.FUNC_MUST("near", "> 0"));
            log.error(far <= 0, info.FUNC_MUST("far", "> 0"));
            var fovy = Math.PI * fovy / 180 / 2;
            s = Math.sin(fovy);
            if (s === 0) {
                log.error(s === 0, info.FUNC_MUST_NOT_BE("frustum", "null"));
            }
            rd = 1 / (far - near);
            ct = Math.cos(fovy) / s;
            e = this._values;
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
        Matrix.prototype.perspective = function (fovy, aspect, near, far) {
            this.applyMatrix(Matrix.create().setPerspective(fovy, aspect, near, far));
            return this;
        };
        Matrix.prototype.applyMatrix = function (other) {
            var a = this, b = other;
            //this._values = MathUtils.multiply(a, b);
            //b*a，而不是a*b
            //这是因为在webgl中，向量是右乘的，
            //此处希望坐标向量先进行this._values的变换，然后进行other.values的变换，因此要b*a，从而在右乘向量时为b*a*vec
            this._values = b.multiply(a).values;
            return this;
        };
        Matrix.prototype.multiply = function (matrix2) {
            var mat1 = this._values, mat2 = matrix2.values;
            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
            var dest = new Float32Array(16);
            dest[0] = A * a + B * e + C * i + D * m;
            dest[1] = A * b + B * f + C * j + D * n;
            dest[2] = A * c + B * g + C * k + D * o;
            dest[3] = A * d + B * h + C * l + D * p;
            dest[4] = E * a + F * e + G * i + H * m;
            dest[5] = E * b + F * f + G * j + H * n;
            dest[6] = E * c + F * g + G * k + H * o;
            dest[7] = E * d + F * h + G * l + H * p;
            dest[8] = I * a + J * e + K * i + L * m;
            dest[9] = I * b + J * f + K * j + L * n;
            dest[10] = I * c + J * g + K * k + L * o;
            dest[11] = I * d + J * h + K * l + L * p;
            dest[12] = M * a + N * e + O * i + P * m;
            dest[13] = M * b + N * f + O * j + P * n;
            dest[14] = M * c + N * g + O * k + P * o;
            dest[15] = M * d + N * h + O * l + P * p;
            return Matrix.create(dest);
        };
        Matrix.prototype.multiplyVector4 = function (vector) {
            var mat1 = this._values, vec4 = vector.values;
            var result = [];
            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];
            return dy.Vector4.create(result[0], result[1], result[2], result[3]);
        };
        Matrix.prototype.copy = function () {
            var result = Matrix.create(), i = 0, len = this._values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this._values[i];
            }
            return result;
        };
        return Matrix;
    })();
    dy.Matrix = Matrix;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Action = (function () {
        function Action(matrix) {
            this._isFinish = false;
            this.matrix = null;
            this.matrix = matrix;
        }
        Object.defineProperty(Action.prototype, "isFinish", {
            get: function () {
                return this._isFinish;
            },
            set: function (isFinish) {
                this._isFinish = isFinish;
            },
            enumerable: true,
            configurable: true
        });
        Action.prototype.update = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.finish = function () {
            this._isFinish = true;
        };
        return Action;
    })();
    dy.Action = Action;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ActionManager = (function () {
        function ActionManager() {
            this._children = dyCb.Collection.create();
        }
        ActionManager.create = function () {
            var obj = new this();
            return obj;
        };
        ActionManager.prototype.addChild = function (action) {
            if (this.hasChild(action)) {
                return;
            }
            this._children.addChild(action);
        };
        ActionManager.prototype.hasChild = function (action) {
            return this._children.hasChild(action);
        };
        ActionManager.prototype.update = function () {
            var self = this, removeQueue = [];
            //time = null;
            this._children.forEach(function (child) {
                //修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
                if (!child) {
                    return;
                }
                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }
                //if (child.isStop()) {
                //    return;
                //}
                //child.update(time);
                child.update();
            });
            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        };
        return ActionManager;
    })();
    dy.ActionManager = ActionManager;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Rotate = (function (_super) {
        __extends(Rotate, _super);
        function Rotate(matrix, axisData) {
            _super.call(this, matrix);
            this._speed = null;
            this._axis = null;
            this._point = null;
            this._angle = 0;
            this._speed = axisData.speed;
            if (axisData.axis.length === 2) {
                this._axis = axisData.axis[1].sub(axisData.axis[0]);
                this._point = axisData.axis[0];
            }
            else if (axisData.axis.length === 1) {
                this._axis = axisData.axis[0];
                this._point = dy.Vector3.create(0, 0, 0);
            }
            else {
                dyCb.Log.error(true, "axis's length should be 1 or 2");
            }
        }
        Rotate.create = function (matrix, actionData) {
            var obj = new this(matrix, actionData);
            return obj;
        };
        Rotate.prototype.update = function () {
            var movePoint = null, backPoint = null;
            this._angle = this._speed;
            if (this._isNotRotateAroundOriginPoint()) {
                movePoint = this._point.copy().reverse().values;
                backPoint = this._point.values;
                this.matrix.translate(movePoint[0], movePoint[1], movePoint[2]);
                this.matrix.rotate(this._angle, this._axis.values[0], this._axis.values[1], this._axis.values[2]);
                this.matrix.translate(backPoint[0], backPoint[1], backPoint[2]);
            }
            else {
                this.matrix.rotate(this._angle, this._axis.values[0], this._axis.values[1], this._axis.values[2]);
            }
        };
        Rotate.prototype._isNotRotateAroundOriginPoint = function () {
            return this._point.values[0] !== 0
                || this._point.values[1] !== 0
                || this._point.values[2] !== 0;
        };
        return Rotate;
    })(dy.Action);
    dy.Rotate = Rotate;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Scale = (function (_super) {
        __extends(Scale, _super);
        function Scale(matrix, data) {
            _super.call(this, matrix);
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._x = data.x;
            this._y = data.y;
            this._z = data.z;
        }
        Scale.create = function (matrix, data) {
            var obj = new this(matrix, data);
            return obj;
        };
        Scale.prototype.update = function () {
            this.matrix.scale(this._x, this._y, this._z);
            this.finish();
        };
        return Scale;
    })(dy.Action);
    dy.Scale = Scale;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Translate = (function (_super) {
        __extends(Translate, _super);
        function Translate(matrix, posData) {
            _super.call(this, matrix);
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._x = posData.x;
            this._y = posData.y;
            this._z = posData.z;
        }
        Translate.create = function (matrix, posData) {
            var obj = new this(matrix, posData);
            return obj;
        };
        Translate.prototype.update = function () {
            this.matrix.translate(this._x, this._y, this._z);
            this.finish();
        };
        return Translate;
    })(dy.Action);
    dy.Translate = Translate;
})(dy || (dy = {}));

//reference to three.js->Color.js
var dy;
(function (dy) {
    var Color = (function () {
        function Color() {
            this._r = null;
            this._g = null;
            this._b = null;
        }
        Color.create = function (colorVal) {
            var obj = new this();
            obj.initWhenCreate(colorVal);
            return obj;
        };
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (r) {
                this._r = r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this._g;
            },
            set: function (g) {
                this._g = g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this._b;
            },
            set: function (b) {
                this._b = b;
            },
            enumerable: true,
            configurable: true
        });
        Color.prototype.initWhenCreate = function (colorVal) {
            this._setColor(colorVal);
        };
        Color.prototype._setColor = function (colorVal) {
            //
            //// rgb(255,0,0)
            ////
            ////将我们平常习惯的颜色值表达形式rgb(255,0,0)-数值型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-255换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为数值型rgb(255,0,0)
            //
            //    var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.r
            //    this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.g
            //    this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// rgb(100%,0%,0%)
            ////将我们平常习惯的颜色值表达形式rgb(100%,0%,0%)-百分比型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0%-100%换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为百分比型rgb(100%,0%,0%)
            //
            //    var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.r
            //    this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.g
            //    this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            // #ff0000
            //将我们平常习惯的颜色值表达形式#ff0000-6位16进制型，转换成THREE.JS认识的形式0.0-1.0，
            //这里将取值范围从00-ff换算成0.0-1.0.
            if (/^\#([0-9a-f]{6})$/i.test(colorVal)) {
                var color = /^\#([0-9a-f]{6})$/i.exec(colorVal); //将字符串中的数值赋值给color，color是一个数组。
                this._setHex(parseInt(color[1], 16)); //将数组中的第2个元素转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b
                return this; //返回颜色对象。
            }
            //
            //// #f00
            ////将我们平常习惯的颜色值表达形式#f00-3位16进制型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-f换算成0.0-1.0.
            //
            //if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为3位16进制型 #f00
            //
            //    var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );	//将数组中的第2，3,4个元素*2，转换成16进制int类型整数.调用setHex 方法，将16进制数值赋值给Color.r,Color.g,Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// red
            ////将我们平常习惯的颜色值表达形式red颜色名，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将颜色名换算成0.0-1.0.
            //
            //if ( /^(\w+)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为颜色名，即参数style中是否只是字符串没有数字。
            //
            //    this.setHex( THREE.ColorKeywords[ style ] );	//将字符串作为THREE.ColorKeywords对象的属性名，取出与该属性名相对应的16进制的属性值.调用setHex 方法，将16进制的属性值赋值给Color.r,Color.g,Color.b
            //
            //    return this;	//返回颜色对象。
            //
            //}
        };
        /*setHex方法
         ///setHex方法用于设置16进制颜色值给当前实例
         ///更多关于hex颜色的内容参考维基百科,http://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E9%A2%9C%E8%89%B2
         */
        ///<summary>setHex</summary>
        ///<param name ="hex" type="number(16进制颜色值0xffddff）">16进制数值0xffddff</param>
        ///<returns type="Color">返回颜色对象</returns>
        Color.prototype._setHex = function (hex) {
            hex = Math.floor(hex);
            this._r = (hex >> 16 & 255) / 255; //将左边两位16进制数值变换成rgb颜色值对应的red，并赋值给属性Color.r。
            this._g = (hex >> 8 & 255) / 255; //将中间两位16进制数值变换成rgb颜色值对应的green，并赋值给属性Color.g。
            this._b = (hex & 255) / 255; //将右边两位16进制数值变换成rgb颜色值对应的blue，并赋值给属性Color.b。
            return this; //返回颜色对象
        };
        return Color;
    })();
    dy.Color = Color;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var JudgeUtils = (function (_super) {
        __extends(JudgeUtils, _super);
        function JudgeUtils() {
            _super.apply(this, arguments);
        }
        JudgeUtils.isView = function (obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        };
        JudgeUtils.isEqual = function (target1, target2) {
            return target1.uid === target2.uid;
        };
        return JudgeUtils;
    })(dyCb.JudgeUtils);
    dy.JudgeUtils = JudgeUtils;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (ShaderType) {
        ShaderType[ShaderType["VS"] = 0] = "VS";
        ShaderType[ShaderType["FS"] = 1] = "FS";
    })(dy.ShaderType || (dy.ShaderType = {}));
    var ShaderType = dy.ShaderType;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Shader = (function () {
        function Shader() {
        }
        Shader.createShader = function (source, type) {
            var shader = null, gl = dy.Director.getInstance().gl;
            switch (type) {
                case dy.ShaderType.VS:
                    shader = gl.createShader(gl.VERTEX_SHADER);
                    break;
                case dy.ShaderType.FS:
                    shader = gl.createShader(gl.FRAGMENT_SHADER);
                    break;
                default:
                    return;
            }
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                return shader;
            }
            else {
                dyCb.Log.log(gl.getShaderInfoLog(shader));
            }
        };
        return Shader;
    })();
    dy.Shader = Shader;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (BufferType) {
        BufferType[BufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
        BufferType[BufferType["SHORT"] = "SHORT"] = "SHORT";
        BufferType[BufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
        BufferType[BufferType["INT"] = "INT"] = "INT";
        BufferType[BufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
        BufferType[BufferType["FLOAT"] = "FLOAT"] = "FLOAT";
    })(dy.BufferType || (dy.BufferType = {}));
    var BufferType = dy.BufferType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (AttributeDataType) {
        AttributeDataType[AttributeDataType["FLOAT_4"] = 0] = "FLOAT_4";
        AttributeDataType[AttributeDataType["BUFFER"] = 1] = "BUFFER";
    })(dy.AttributeDataType || (dy.AttributeDataType = {}));
    var AttributeDataType = dy.AttributeDataType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (DrawMode) {
        DrawMode[DrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
    })(dy.DrawMode || (dy.DrawMode = {}));
    var DrawMode = dy.DrawMode;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ElementBuffer = (function () {
        function ElementBuffer() {
            this._buffer = null;
            this._type = null;
            this._num = null;
            this._typeSize = null;
        }
        ElementBuffer.create = function (data, type) {
            var obj = new this();
            obj.initWhenCreate(data, type);
            return obj;
        };
        Object.defineProperty(ElementBuffer.prototype, "buffer", {
            get: function () { return this._buffer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "type", {
            get: function () { return this._type; },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "num", {
            get: function () { return this._num; },
            set: function (num) {
                this._num = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ElementBuffer.prototype, "typeSize", {
            get: function () { return this._typeSize; },
            enumerable: true,
            configurable: true
        });
        ElementBuffer.prototype.initWhenCreate = function (data, type) {
            var gl = dy.Director.getInstance().gl;
            if (!data || !this._checkDataType(data, type)) {
                return null;
            }
            this._buffer = gl.createBuffer(); // Create a buffer object
            if (!this._buffer) {
                dyCb.Log.log('Failed to create the this._buffer object');
                return null;
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            this._type = gl[type];
            this._num = data.length;
            this._typeSize = this._getInfo(type).size;
            return this._buffer;
        };
        ElementBuffer.prototype._checkDataType = function (data, type) {
            var info = this._getInfo(type);
            return data instanceof info.typeClass;
        };
        ElementBuffer.prototype._getInfo = function (type) {
            var info = null;
            switch (type) {
                case dy.BufferType.UNSIGNED_BYTE:
                    info = {
                        typeClass: Uint8Array,
                        size: 1
                    };
                    break;
                case dy.BufferType.SHORT:
                    info = {
                        typeClass: Int16Array,
                        size: 2
                    };
                    break;
                case dy.BufferType.UNSIGNED_SHORT:
                    info = {
                        typeClass: Uint16Array,
                        size: 2
                    };
                    break;
                case dy.BufferType.INT:
                    info = {
                        typeClass: Int32Array,
                        size: 4
                    };
                    break;
                case dy.BufferType.UNSIGNED_INT:
                    info = {
                        typeClass: Uint32Array,
                        size: 4
                    };
                    break;
                case dy.BufferType.FLOAT:
                    info = {
                        typeClass: Float32Array,
                        size: 4
                    };
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("BufferType"));
                    break;
            }
            return info;
        };
        return ElementBuffer;
    })();
    dy.ElementBuffer = ElementBuffer;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ArrayBuffer = (function () {
        function ArrayBuffer() {
            this._buffer = null;
            this._num = null;
            this._type = null;
            this._count = null;
        }
        ArrayBuffer.create = function (data, num, type) {
            var obj = new this();
            obj.initWhenCreate(data, num, type);
            return obj;
        };
        Object.defineProperty(ArrayBuffer.prototype, "buffer", {
            get: function () { return this._buffer; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "num", {
            get: function () { return this._num; },
            set: function (num) {
                this._num = num;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "type", {
            get: function () { return this._type; },
            set: function (type) {
                this._type = type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ArrayBuffer.prototype, "count", {
            get: function () {
                return this._count;
            },
            set: function (count) {
                this._count = count;
            },
            enumerable: true,
            configurable: true
        });
        ArrayBuffer.prototype.initWhenCreate = function (data, num, type) {
            var gl = dy.Director.getInstance().gl;
            if (!data) {
                return null;
            }
            this._buffer = gl.createBuffer(); // Create a buffer object
            if (!this._buffer) {
                dyCb.Log.log('Failed to create the this._buffer object');
                return null;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            this._num = num;
            this._type = gl[type];
            this._count = data.length / num;
            return this._buffer;
        };
        return ArrayBuffer;
    })();
    dy.ArrayBuffer = ArrayBuffer;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (UniformDataType) {
        UniformDataType[UniformDataType["FLOAT_MAT4"] = 0] = "FLOAT_MAT4";
    })(dy.UniformDataType || (dy.UniformDataType = {}));
    var UniformDataType = dy.UniformDataType;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Program = (function () {
        function Program() {
            this._program = dy.Director.getInstance().gl.createProgram();
        }
        Program.create = function (vsSource, fsSource) {
            var obj = new this();
            obj.initWhenCreate(vsSource, fsSource);
            return obj;
        };
        Program.prototype.use = function () {
            dy.Director.getInstance().gl.useProgram(this._program);
        };
        Program.prototype.setUniformData = function (name, type, data) {
            var gl = dy.Director.getInstance().gl, pos = gl.getUniformLocation(this._program, name);
            switch (type) {
                case dy.UniformDataType.FLOAT_MAT4:
                    gl.uniformMatrix4fv(pos, false, data.values);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("UniformDataType"));
                    break;
            }
        };
        Program.prototype.setAttributeData = function (name, type, data) {
            var gl = dy.Director.getInstance().gl, pos = gl.getAttribLocation(this._program, name);
            switch (type) {
                case dy.AttributeDataType.FLOAT_4:
                    var dataArr = data;
                    gl.vertexAttrib4f(pos, dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
                    break;
                case dy.AttributeDataType.BUFFER:
                    var buffer = data;
                    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                    gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
                    gl.enableVertexAttribArray(pos);
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("AttributeDataType"));
                    break;
            }
        };
        Program.prototype.initWhenCreate = function (vsSource, fsSource) {
            var gl = dy.Director.getInstance().gl, vs = null, fs = null;
            vs = dy.Shader.createShader(vsSource, dy.ShaderType.VS);
            fs = dy.Shader.createShader(fsSource, dy.ShaderType.FS);
            // 向程序对象里分配着色器
            gl.attachShader(this._program, vs);
            gl.attachShader(this._program, fs);
            /*!
            if bower warn:"Attribute 0 is disabled. This has significant performance penalty",
            then do this before linkProgram:
             gl.bindAttribLocation( this._program, 0, "a_position");



             can reference here:
             http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top


             OpenGL requires attribute zero to be enabled otherwise it will not render anything.
             On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
              attach it to attribute zero, and enable it.

             It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
             if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.

             In your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.


             https://github.com/mrdoob/three.js/issues/3896
             */
            // 将着色器连接
            gl.linkProgram(this._program);
            // 判断着色器的连接是否成功
            if (gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
                // 返回程序对象
                return this._program;
            }
            else {
                // 如果失败，弹出错误信息
                alert(gl.getProgramInfoLog(this._program));
                return null;
            }
        };
        return Program;
    })();
    dy.Program = Program;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var QuadCommand = (function () {
        function QuadCommand() {
            this._buffers = dyCb.Hash.create();
            this._color = null;
            this._drawMode = dy.DrawMode.TRIANGLES;
        }
        QuadCommand.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(QuadCommand.prototype, "buffers", {
            get: function () {
                return this._buffers;
            },
            set: function (buffers) {
                var i = null;
                for (i in buffers) {
                    if (buffers.hasOwnProperty(i)) {
                        this._buffers.addChild(i, buffers[i]);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadCommand.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QuadCommand.prototype, "drawMode", {
            get: function () {
                return this._drawMode;
            },
            set: function (drawMode) {
                this._drawMode = drawMode;
            },
            enumerable: true,
            configurable: true
        });
        QuadCommand.prototype.execute = function (scene) {
            this._sendData(scene.program);
            this._draw();
        };
        QuadCommand.prototype.init = function () {
            //this._initBuffer();
        };
        //private _initBuffer(){
        //    this._buffers.addChild("vertexBuffer",
        //        this._bufferData.vertices? ArrayBuffer.create(this._bufferData.vertices, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("texCoordBuffer",
        //        this._bufferData.texCoords? ArrayBuffer.create(this._bufferData.texCoords, 2, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("normalBuffer",
        //        this._bufferData.normals? ArrayBuffer.create(this._bufferData.normals, 3, BufferType.FLOAT) : null
        //    );
        //    this._buffers.addChild("indexBuffer",
        //        this._bufferData.indices? ElementBuffer.create(this._bufferData.indices, BufferType.UNSIGNED_SHORT) : null
        //    );
        //    this._buffers.addChild("colorBuffer",
        //        this._bufferData.colors? ArrayBuffer.create(this._bufferData.colors, 3, BufferType.FLOAT) : null
        //    );
        //}
        QuadCommand.prototype._sendData = function (program) {
            if (this._buffers.hasChild("vertexBuffer")) {
                program.setAttributeData("a_position", dy.AttributeDataType.BUFFER, this._buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }
            //if(this.color){
            /*!
            this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
            because a_color'pos is 0, and it should be array data(like Float32Array)
            refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
            */
            program.setAttributeData("a_color", dy.AttributeDataType.BUFFER, this._buffers.getChild("colorBuffer"));
            //}
        };
        QuadCommand.prototype._draw = function () {
            var totalNum = 0, startOffset = 0, vertexBuffer = this._buffers.getChild("vertexBuffer"), gl = dy.Director.getInstance().gl;
            if (this._buffers.hasChild("indexBuffer")) {
                var indexBuffer = this._buffers.getChild("indexBuffer");
                totalNum = indexBuffer.num;
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                gl.drawElements(gl[this._drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            }
            else {
                totalNum = vertexBuffer.num;
                gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
            }
        };
        return QuadCommand;
    })();
    dy.QuadCommand = QuadCommand;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var WebGLRenderer = (function () {
        function WebGLRenderer() {
            this._commandQueue = dyCb.Collection.create();
            this._clearColor = dy.Color.create("#000000");
            this._clearAlpha = 1.0;
        }
        WebGLRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        WebGLRenderer.prototype.createQuadCommand = function () {
            return dy.QuadCommand.create();
        };
        WebGLRenderer.prototype.addCommand = function (command) {
            if (this._commandQueue.hasChild(command)) {
                return;
            }
            command.init();
            this._commandQueue.addChild(command);
        };
        WebGLRenderer.prototype.render = function (scene) {
            this._commandQueue.forEach(function (command) {
                command.execute(scene);
            });
            this._clearCommand();
        };
        WebGLRenderer.prototype.init = function () {
            dy.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
        };
        WebGLRenderer.prototype.setClearColor = function (color, alpha) {
            if (alpha === void 0) { alpha = 1.0; }
            this._clearColor = color;
            this._clearAlpha = alpha;
            dy.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
        };
        WebGLRenderer.prototype._clearCommand = function () {
            this._commandQueue.removeAllChildren();
        };
        return WebGLRenderer;
    })();
    dy.WebGLRenderer = WebGLRenderer;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var MeshMaterial = (function () {
        function MeshMaterial(params) {
            this._color = null;
            this._color = dy.Color.create(params.color || "0xffffff");
        }
        MeshMaterial.create = function (params) {
            var obj = new this(params);
            return obj;
        };
        Object.defineProperty(MeshMaterial.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
            },
            enumerable: true,
            configurable: true
        });
        return MeshMaterial;
    })();
    dy.MeshMaterial = MeshMaterial;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GLSLLoader = (function () {
        function GLSLLoader() {
            this._container = dyCb.Hash.create();
        }
        GLSLLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        GLSLLoader.prototype.load = function (url, id) {
            var self = this;
            if (this._container.getChild(id)) {
                dy.LoaderManager.getInstance().onResLoaded();
                return;
            }
            return dyRt.fromPromise(this._loadText(url)).do(function (data) {
                dy.LoaderManager.getInstance().onResLoaded();
                self._container.addChild(id, data);
            }, function (err) {
                dy.LoaderManager.getInstance().onResError(url, err);
            }, null);
        };
        GLSLLoader.prototype.getGLSL = function (id) {
            return this._container.getChild(id);
        };
        GLSLLoader.prototype._loadText = function (url) {
            return new RSVP.Promise(function (resolve, reject) {
                dyCb.AjaxUtils.ajax({
                    type: "get",
                    //async: true,
                    url: url,
                    contentType: "text/plain; charset=utf-8",
                    dataType: "text",
                    //cache: false,
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (XMLHttpRequest, errorThrown) {
                        reject("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                            + "\nmessage:" + errorThrown.message
                            + "\nresponseText:" + XMLHttpRequest.responseText);
                    }
                });
            });
        };
        GLSLLoader._instance = null;
        return GLSLLoader;
    })();
    dy.GLSLLoader = GLSLLoader;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var LoaderManager = (function () {
        function LoaderManager() {
            this._resCount = 0;
            this._currentLoadedCount = 0;
        }
        LoaderManager.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        LoaderManager.prototype.getResourceCount = function () {
            return this._resCount;
        };
        LoaderManager.prototype.getCurrentLoadedCount = function () {
            return this._currentLoadedCount;
        };
        LoaderManager.prototype.load = function (resourcesArr) {
            var self = this;
            return dyRt.fromArray(resourcesArr).flatMap(function (res) {
                self._resCount++;
                return dy.GLSLLoader.getInstance().load(res.url, res.id);
            });
        };
        LoaderManager.prototype.reset = function () {
            this._resCount = 0;
            this._currentLoadedCount = 0;
        };
        LoaderManager.prototype.onResLoaded = function () {
            this._currentLoadedCount += 1;
        };
        LoaderManager.prototype.onResError = function (path, err) {
            dyCb.Log.log("加载" + path + "资源失败");
            if (err) {
                dyCb.Log.log(err);
            }
        };
        LoaderManager.prototype._isFinishLoad = function () {
            var self = this;
            if (this.getCurrentLoadedCount() === this.getResourceCount()) {
                if (this.onload) {
                    this.onload();
                }
                else {
                    dyCb.Log.assert(false, "没有定义onload");
                }
            }
            else {
                if (this.onloading) {
                    setTimeout(function () {
                        self.onloading(self.getCurrentLoadedCount(), self.getResourceCount());
                    }, 16);
                }
                setTimeout(function () {
                    self._isFinishLoad.call(self);
                }, 16);
            }
        };
        LoaderManager._instance = null;
        return LoaderManager;
    })();
    dy.LoaderManager = LoaderManager;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Geometry = (function () {
        function Geometry(material) {
            this._vertices = null;
            this._indices = null;
            this._colors = null;
            this.material = null;
            this.material = material;
        }
        Object.defineProperty(Geometry.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "colors", {
            get: function () {
                return this._colors;
            },
            set: function (colors) {
                this._colors = colors;
            },
            enumerable: true,
            configurable: true
        });
        Geometry.prototype.initWhenCreate = function () {
            this._vertices = this.computeVerticesBuffer();
            this._indices = this.computeIndicesBuffer();
            //this._normals = this._computeNormals();
            //this._texCoords = this._computeTexCoords();
            this._colors = this._computeColorsBuffer(this.material);
        };
        Geometry.prototype.computeVerticesBuffer = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Geometry.prototype.computeIndicesBuffer = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Geometry.prototype._computeColorsBuffer = function (material) {
            var arr = [], color = material.color, i = 0, len = this._vertices.count;
            for (i = 0; i < len; i++) {
                arr.push(color.r, color.g, color.b, 1.0);
            }
            return dy.ArrayBuffer.create(new Float32Array(arr), 4, dy.BufferType.FLOAT);
        };
        return Geometry;
    })();
    dy.Geometry = Geometry;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry(width, height, depth, material) {
            _super.call(this, material);
            this._width = null;
            this._height = null;
            this._depth = null;
            this._width = width;
            this._height = height;
            this._depth = depth;
        }
        BoxGeometry.create = function (width, height, depth, material) {
            var geom = new this(width, height, depth, material);
            geom.initWhenCreate();
            return geom;
        };
        BoxGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, depth = this._depth, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, front = depth / 2, back = -depth / 2;
            return dy.ArrayBuffer.create(new Float32Array([
                right, up, front, left, up, front, left, down, front, right, down, front,
                right, up, front, right, down, front, right, down, back, right, up, back,
                right, up, front, right, up, back, left, up, back, left, up, front,
                left, up, front, left, up, back, left, down, back, left, down, front,
                left, down, back, right, down, back, right, down, front, left, down, front,
                right, down, back, left, down, back, left, up, back, right, up, back // v4-v7-v6-v5 back
            ]), 3, dy.BufferType.FLOAT);
        };
        BoxGeometry.prototype.computeIndicesBuffer = function () {
            return dy.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23 // back
            ]), dy.BufferType.UNSIGNED_SHORT);
        };
        return BoxGeometry;
    })(dy.Geometry);
    dy.BoxGeometry = BoxGeometry;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var RectGeometry = (function (_super) {
        __extends(RectGeometry, _super);
        function RectGeometry(width, height, material) {
            _super.call(this, material);
            this._width = null;
            this._height = null;
            this._width = width;
            this._height = height;
        }
        RectGeometry.create = function (width, height, material) {
            var geom = new this(width, height, material);
            geom.initWhenCreate();
            return geom;
        };
        RectGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2;
            return dy.ArrayBuffer.create(new Float32Array([
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, dy.BufferType.FLOAT);
        };
        RectGeometry.prototype.computeIndicesBuffer = function () {
            return dy.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3
            ]), dy.BufferType.UNSIGNED_SHORT);
        };
        return RectGeometry;
    })(dy.Geometry);
    dy.RectGeometry = RectGeometry;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (SphereDrawMode) {
        SphereDrawMode[SphereDrawMode["LATITUDELONGTITUDE"] = 0] = "LATITUDELONGTITUDE";
        SphereDrawMode[SphereDrawMode["DECOMPOSITION"] = 1] = "DECOMPOSITION";
    })(dy.SphereDrawMode || (dy.SphereDrawMode = {}));
    var SphereDrawMode = dy.SphereDrawMode;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry(radius, drawMode, segments, material) {
            _super.call(this, material);
            this._radius = null;
            this._drawMode = null;
            this._segments = null;
            this._data = null;
            this._radius = radius;
            this._drawMode = drawMode;
            this._segments = segments;
        }
        SphereGeometry.create = function (radius, drawMode, segments, material) {
            var geom = new this(radius, drawMode, segments, material);
            geom.initWhenCreate();
            return geom;
        };
        SphereGeometry.prototype.initWhenCreate = function () {
            this._data = this._computeData(this._radius, this._drawMode, this._segments);
            _super.prototype.initWhenCreate.call(this);
        };
        SphereGeometry.prototype.computeVerticesBuffer = function () {
            return this._data.vertices;
        };
        SphereGeometry.prototype.computeIndicesBuffer = function () {
            return this._data.indices;
        };
        SphereGeometry.prototype._computeData = function (radius, drawMode, segments) {
            var data = null;
            if (drawMode === dy.SphereDrawMode.LATITUDELONGTITUDE) {
                data = GetDataByLatitudeLongtitude.create(radius, segments).getData();
            }
            else if (drawMode === dy.SphereDrawMode.DECOMPOSITION) {
                data = GetDataByDecomposition.create(radius, segments).getData();
            }
            return data;
        };
        return SphereGeometry;
    })(dy.Geometry);
    dy.SphereGeometry = SphereGeometry;
    var GetDataByLatitudeLongtitude = (function () {
        function GetDataByLatitudeLongtitude(radius, bands) {
            this._vertices = [];
            this._indices = [];
            this._radius = null;
            this._latitudeBands = null;
            this._longitudeBands = null;
            this._radius = radius;
            this._latitudeBands = bands;
            this._longitudeBands = bands;
        }
        GetDataByLatitudeLongtitude.create = function (radius, bands) {
            var geom = new this(radius, bands);
            return geom;
        };
        Object.defineProperty(GetDataByLatitudeLongtitude.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GetDataByLatitudeLongtitude.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        GetDataByLatitudeLongtitude.prototype.getData = function () {
            //维度
            for (var latNumber = 0; latNumber <= this._latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this._latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);
                //经度
                for (var longNumber = 0; longNumber <= this._longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this._longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    //var x = this._radius * cosPhi * sinTheta + pointX;
                    //var y = this._radius *cosTheta + pointY;
                    //var z = this._radius *sinPhi * sinTheta + pointZ;
                    var x = this._radius * cosPhi * sinTheta;
                    var y = this._radius * cosTheta;
                    var z = this._radius * sinPhi * sinTheta;
                    var u = 1 - (longNumber / this._longitudeBands);
                    var v = 1 - (latNumber / this._latitudeBands);
                    //normals.push(x);
                    //normals.push(y);
                    //normals.push(z);
                    //texCoords.push(u);
                    //texCoords.push(v);
                    this._vertices.push(x);
                    this._vertices.push(y);
                    this._vertices.push(z);
                }
            }
            //this._一圈有经度点longitudeBands个
            for (var latNumber = 0; latNumber < this._latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < this._longitudeBands; longNumber++) {
                    var first = latNumber * (this._longitudeBands + 1) + longNumber;
                    var second = first + this._longitudeBands + 1;
                    this._indices.push(first);
                    this._indices.push(second);
                    this._indices.push(first + 1);
                    this._indices.push(second);
                    this._indices.push(second + 1);
                    this._indices.push(first + 1);
                }
            }
            return {
                vertices: dy.ArrayBuffer.create(new Float32Array(this._vertices), 3, dy.BufferType.FLOAT),
                indices: dy.ElementBuffer.create(new Uint16Array(this._indices), dy.BufferType.UNSIGNED_SHORT)
            };
        };
        return GetDataByLatitudeLongtitude;
    })();
    var GetDataByDecomposition = (function () {
        function GetDataByDecomposition(radius, count) {
            this._vertices = [];
            this._indices = [];
            this._vLen = null;
            this._radius = null;
            this._count = null;
            this._radius = radius;
            this._count = count;
        }
        GetDataByDecomposition.create = function (radius, count) {
            var geom = new this(radius, count);
            return geom;
        };
        Object.defineProperty(GetDataByDecomposition.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GetDataByDecomposition.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        //todo add texCoords
        GetDataByDecomposition.prototype.getData = function () {
            var originVertices = [
                [this._radius, 0, 0],
                [-this._radius, 0, 0],
                [0, this._radius, 0],
                [0, -this._radius, 0],
                [0, 0, this._radius],
                [0, 0, -this._radius]
            ];
            var originIndices = [
                //[2,4,0],[2,0,5],[2,5,1],[2,1,4],   [3,0,4],[3,5,0],[3,1,5],[3,4,1]
                //[2,4,0]
                [2, 4, 0], [2, 0, 5], [2, 5, 1], [2, 1, 4],
                [3, 0, 4], [3, 5, 0], [3, 1, 5], [3, 4, 1]
            ];
            this._vLen = originVertices.length;
            var j = 0;
            var len = originVertices.length;
            for (j = 0; j < len; j++) {
                this._vertices = this._vertices.concat(originVertices[j]);
            }
            var j = 0, len = originIndices.length; //8面体
            for (j = 0; j < len; j++) {
                //for (i = 0; i < this._count; i++){
                //this._vertices = this._vertices.concat(originVertices[originIndices[j][0]],
                //    originVertices[originIndices[j][1]],
                //    originVertices[originIndices[j][2]]);
                this._subDivide(originVertices[originIndices[j][0]], originVertices[originIndices[j][1]], originVertices[originIndices[j][2]], originIndices[j], this._count, this._radius);
            }
            return {
                vertices: dy.ArrayBuffer.create(new Float32Array(this._vertices), 3, dy.BufferType.FLOAT),
                indices: dy.ElementBuffer.create(new Uint16Array(this._indices), dy.BufferType.UNSIGNED_SHORT)
            };
        };
        GetDataByDecomposition.prototype._subDivide = function (v1, v2, v3, ind, count, radius) {
            if (count <= 0) {
                this._indices = this._indices.concat(ind);
                return;
            }
            //
            var i = 0;
            var v12 = [], v23 = [], v31 = [];
            //求向量中心点
            for (i = 0; i < 3; i++) {
                v12[i] = (v1[i] + v2[i]) / 2; //求取等分的中点坐标
                v23[i] = (v2[i] + v3[i]) / 2;
                v31[i] = (v3[i] + v1[i]) / 2;
            }
            //模长扩展
            this._normalize(v12, radius);
            this._normalize(v23, radius);
            this._normalize(v31, radius);
            this._vertices = this._vertices.concat(v12, v23, v31);
            var iV1 = ind[0], iV2 = ind[1], iV3 = ind[2], iV12 = this._vLen, iV23 = this._vLen + 1, iV31 = this._vLen + 2;
            var in1 = [
                iV1, iV12, iV31
            ];
            var in2 = [
                iV31, iV12, iV23
            ];
            var in3 = [
                iV12, iV2, iV23
            ];
            var in4 = [
                iV31, iV23, iV3
            ];
            this._vLen = this._vLen + 3;
            //继续切分三角形
            this._subDivide(v1, v12, v31, in1, count - 1, radius); //对所产生的4个新的三角面再进行等分
            this._subDivide(v31, v12, v23, in2, count - 1, radius);
            this._subDivide(v12, v2, v23, in3, count - 1, radius);
            this._subDivide(v31, v23, v3, in4, count - 1, radius);
        };
        GetDataByDecomposition.prototype._normalize = function (v, radius) {
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                return [0, 0, 0];
            }
            v[0] = radius * v[0] / d;
            v[1] = radius * v[1] / d;
            v[2] = radius * v[2] / d;
            return v;
        };
        return GetDataByDecomposition;
    })();
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var TriangleGeometry = (function (_super) {
        __extends(TriangleGeometry, _super);
        function TriangleGeometry(width, height, material) {
            _super.call(this, material);
            this._width = null;
            this._height = null;
            this._width = width;
            this._height = height;
        }
        TriangleGeometry.create = function (width, height, material) {
            var geom = new this(width, height, material);
            geom.initWhenCreate();
            return geom;
        };
        TriangleGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2;
            return dy.ArrayBuffer.create(new Float32Array([
                0.0, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, dy.BufferType.FLOAT);
        };
        TriangleGeometry.prototype.computeIndicesBuffer = function () {
            return dy.ElementBuffer.create(new Uint8Array([
                0, 1, 2
            ]), dy.BufferType.UNSIGNED_BYTE);
        };
        return TriangleGeometry;
    })(dy.Geometry);
    dy.TriangleGeometry = TriangleGeometry;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventListenerMap = (function () {
        function EventListenerMap() {
            this._listenerMap = dyCb.Hash.create();
        }
        EventListenerMap.create = function () {
            var obj = new this();
            return obj;
        };
        EventListenerMap.prototype.appendChild = function (eventName, data) {
            this._listenerMap.appendChild(
            //String(data.target.uid) + "_" + eventName,
            this._buildKey(data.target, eventName), data);
        };
        EventListenerMap.prototype.getChild = function (args) {
            var self = this;
            //
            //return this._listenerMap.filter((list:dyCb.Collection, key:string) => {
            //    return key === self._buildKey(target, eventName);
            //});
            //
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                return this._listenerMap.getChild(eventName);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                return this._listenerMap.filter(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.hasChild = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (arguments.length === 1 && dy.JudgeUtils.isFunction(arguments[0])) {
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                return this._listenerMap.hasChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventListenerMap.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventListenerMap.prototype.removeChild = function (args) {
            var self = this;
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], list = null;
                list = this._listenerMap.getChild(eventName);
                list.removeChild(function (val) {
                    return val.handler === handler;
                });
                if (list.getCount() === 0) {
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                this._listenerMap.removeChild(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                this._listenerMap.map(function (list, key) {
                    list.removeChild(function (val) {
                        return val.handler === handler;
                    });
                    if (list.getCount() === 0) {
                        return dyCb.$REMOVE;
                    }
                    return [key, list];
                });
            }
        };
        EventListenerMap.prototype.getEventOffDataList = function (target, eventName) {
            var result = dyCb.Collection.create(), self = this;
            if (arguments.length === 1) {
                this.getChild(target)
                    .forEach(function (list, key) {
                    if (list && list.getCount() > 0) {
                        result.addChild({
                            eventName: self.getEventNameFromKey(key),
                            wrapHandler: list.getChild(0).wrapHandler
                        });
                    }
                });
                return result;
            }
            else if (arguments.length === 2) {
                var list = this.getChild(target, eventName);
                if (list && list.getCount() > 0) {
                    result.addChild({
                        eventName: eventName,
                        wrapHandler: list.getChild(0).wrapHandler
                    });
                }
                return result;
            }
        };
        EventListenerMap.prototype.getEventNameFromKey = function (key) {
            return key.indexOf("_") > -1 ? key.split("_")[1] : key;
        };
        EventListenerMap.prototype.getUidFromKey = function (key) {
            return key.indexOf("_") > -1 ? Number(key.split("_")[0]) : null;
        };
        EventListenerMap.prototype.isTarget = function (key, target, list) {
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        };
        EventListenerMap.prototype._buildKey = function (args) {
            if (dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                return this._buildKeyWithUid(uid, eventName);
            }
            else {
                var target = arguments[0], eventName = arguments[1];
                return target ? this._buildKeyWithUid(target.uid, eventName) : eventName;
            }
        };
        EventListenerMap.prototype._buildKeyWithUid = function (uid, eventName) {
            return String(uid) + "_" + eventName;
        };
        return EventListenerMap;
    })();
    dy.EventListenerMap = EventListenerMap;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventType) {
        EventType[EventType["MOUSE"] = 0] = "MOUSE";
        EventType[EventType["KEYBOARD"] = 1] = "KEYBOARD";
        EventType[EventType["CUSTOM"] = 2] = "CUSTOM";
    })(dy.EventType || (dy.EventType = {}));
    var EventType = dy.EventType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventName) {
        EventName[EventName["CLICK"] = "click"] = "CLICK";
        EventName[EventName["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
        EventName[EventName["MOUSEUP"] = "mouseup"] = "MOUSEUP";
        EventName[EventName["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
        EventName[EventName["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
        EventName[EventName["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
        EventName[EventName["KEYDOWN"] = "keydown"] = "KEYDOWN";
        EventName[EventName["KEYUP"] = "keyup"] = "KEYUP";
        EventName[EventName["KEYPRESS"] = "keypress"] = "KEYPRESS";
    })(dy.EventName || (dy.EventName = {}));
    var EventName = dy.EventName;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventPhase) {
        EventPhase[EventPhase["BROADCAST"] = 0] = "BROADCAST";
        EventPhase[EventPhase["EMIT"] = 1] = "EMIT";
    })(dy.EventPhase || (dy.EventPhase = {}));
    var EventPhase = dy.EventPhase;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
//todo complete it(add more event type)
var dy;
(function (dy) {
    var _table = dyCb.Hash.create();
    //todo not declare "<any>"!
    _table.addChild(dy.EventName.CLICK, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEOVER, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEOUT, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEMOVE, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEDOWN, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEUP, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.KEYDOWN, dy.EventType.KEYBOARD);
    _table.addChild(dy.EventName.KEYPRESS, dy.EventType.KEYBOARD);
    _table.addChild(dy.EventName.KEYUP, dy.EventType.KEYBOARD);
    var EventTable = (function () {
        function EventTable() {
        }
        //getEventType should put here,
        //it should not put in Event class, it's better to extract EventTable class to put in
        EventTable.getEventType = function (eventName) {
            var result = _table.getChild(eventName);
            if (result === void 0) {
                result = dy.EventType.CUSTOM;
            }
            return result;
        };
        return EventTable;
    })();
    dy.EventTable = EventTable;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
//rich domain model
//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type
var dy;
(function (dy) {
    var Event = (function () {
        function Event(eventName) {
            //abstact attri
            this.type = null;
            //get type(){
            //    dyCb.Log.error(this._type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
            //
            //    return this._type;
            //}
            this._name = null;
            //target is the actual target that received the event.
            this._target = null;
            //currentTarget is always the object listening for the event
            this._currentTarget = null;
            this._isStopPropagation = false;
            this._phase = null;
            this._name = eventName;
        }
        Object.defineProperty(Event.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            get: function () {
                //dyCb.Log.error(!this._target, dyCb.Log.info.FUNC_MUST_DEFINE("target"));
                return this._target;
                //return this._target;
                //return this._event.srcElement || this._event.target;
            },
            set: function (target) {
                this._target = target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "currentTarget", {
            get: function () {
                return this._currentTarget;
            },
            set: function (currentTarget) {
                this._currentTarget = currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "isStopPropagation", {
            get: function () {
                return this._isStopPropagation;
            },
            set: function (isStopPropagation) {
                this._isStopPropagation = isStopPropagation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "phase", {
            get: function () {
                return this._phase;
            },
            set: function (phase) {
                this._phase = phase;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.copy = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Event.prototype.stopPropagation = function () {
            this._isStopPropagation = true;
        };
        Event.prototype.copyMember = function (destination, source, memberArr) {
            memberArr.forEach(function (member) {
                destination[member] = source[member];
            });
            return destination;
        };
        return Event;
    })();
    dy.Event = Event;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent(event, eventName) {
            _super.call(this, eventName);
            this.type = dy.EventType.MOUSE;
            this._event = null;
            this._location = null;
            this._locationInView = null;
            this._button = null;
            this._event = event;
        }
        //public static CLICK:string = "click";
        //public static MOUSEOVER:string = "mouseover";
        //public static MOUSEOUT:string = "mouseout";
        //public static MOUSEMOVE:string = "mousemove";
        //public static create(eventName:EventName) {
        //    var obj = new this(eventName);
        //
        //    return obj;
        //}
        MouseEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(MouseEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "location", {
            //Get cursor location(related to document)
            get: function () {
                var point = null, e = this.event;
                if (this._location) {
                    return this._location;
                }
                point = dy.Point.create();
                if (bowser.msie) {
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
            //Returns the current cursor location in screen coordinates(related to canvas)
            get: function () {
                //return this._locationInView;
                var point = null, viewOffset = null;
                if (this._locationInView) {
                    return this._locationInView;
                }
                point = this.location;
                //canvasOffset = this._getCanvasOffset(this.event.currentTarget);
                viewOffset = dy.Director.getInstance().getView().offset;
                return dy.Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
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
                if (this._button) {
                    return this._button;
                }
                if (bowser.msie) {
                    switch (e.button) {
                        case 1:
                            mouseButton = dy.MouseButton.LEFT;
                            break;
                        case 4:
                            mouseButton = dy.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = dy.MouseButton.CENTER;
                            break;
                        default:
                            dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            //mouseButton = e.button;
                            break;
                    }
                }
                else {
                    switch (e.button) {
                        case 0:
                            mouseButton = dy.MouseButton.LEFT;
                            break;
                        case 1:
                            mouseButton = dy.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = dy.MouseButton.CENTER;
                            break;
                        default:
                            dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            //mouseButton = e.button;
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
        MouseEvent.prototype.copy = function () {
            var eventObj = MouseEvent.create(this._event, this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return MouseEvent;
    })(dy.Event);
    dy.MouseEvent = MouseEvent;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
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
    }, SHIFT_KEY_MAP = {
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
    var KeyboardEvent = (function (_super) {
        __extends(KeyboardEvent, _super);
        function KeyboardEvent(event, eventName) {
            _super.call(this, eventName);
            this.type = dy.EventType.KEYBOARD;
            this._event = null;
            this._event = event;
        }
        KeyboardEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(KeyboardEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
            get: function () {
                return this._event.ctrlKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "altKey", {
            get: function () {
                return this._event.altKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
            get: function () {
                return this._event.shiftKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "metaKey", {
            get: function () {
                //return this._event.metaKey && !this.ctrlKey;
                return this._event.metaKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
            get: function () {
                return this._event.keyCode;
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
        KeyboardEvent.prototype.copy = function () {
            var eventObj = KeyboardEvent.create(this._event, this.name);
            return this.copyMember(eventObj, this, ["altKey", "shiftKey", "ctrlKey", "metaKey", "keyCode", "key"]);
        };
        return KeyboardEvent;
    })(dy.Event);
    dy.KeyboardEvent = KeyboardEvent;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CustomEvent = (function (_super) {
        __extends(CustomEvent, _super);
        function CustomEvent() {
            _super.apply(this, arguments);
            this.type = dy.EventType.CUSTOM;
            this._userData = null;
        }
        CustomEvent.create = function (eventName) {
            var obj = new this(eventName);
            return obj;
        };
        Object.defineProperty(CustomEvent.prototype, "userData", {
            get: function () {
                return this._userData;
            },
            set: function (userData) {
                this._userData = userData;
            },
            enumerable: true,
            configurable: true
        });
        CustomEvent.prototype.copyPublicAttri = function (destination, source) {
            var property = null;
            //destination = {};
            dyCb.ExtendUtils.extend(destination, function (item, property) {
                return property.slice(0, 1) !== "_"
                    && !dy.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        CustomEvent.prototype.copy = function () {
            var eventObj = CustomEvent.create(this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return CustomEvent;
    })(dy.Event);
    dy.CustomEvent = CustomEvent;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (MouseButton) {
        MouseButton[MouseButton["LEFT"] = 0] = "LEFT";
        MouseButton[MouseButton["RIGHT"] = 1] = "RIGHT";
        MouseButton[MouseButton["CENTER"] = 2] = "CENTER";
    })(dy.MouseButton || (dy.MouseButton = {}));
    var MouseButton = dy.MouseButton;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventListener = (function () {
        function EventListener(option) {
            this._eventType = null;
            this._priority = null;
            this._handlerDataList = dyCb.Collection.create();
            this._eventType = option.eventType;
            this._priority = option.priority || 1;
        }
        EventListener.create = function (option) {
            var obj = new this(option);
            obj.initWhenCreate(option);
            return obj;
        };
        Object.defineProperty(EventListener.prototype, "eventType", {
            get: function () {
                return this._eventType;
            },
            set: function (eventType) {
                this._eventType = eventType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "priority", {
            get: function () {
                return this._priority;
            },
            set: function (priority) {
                this._priority = priority;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "handlerDataList", {
            get: function () {
                return this._handlerDataList;
            },
            set: function (handlerDataList) {
                this._handlerDataList = handlerDataList;
            },
            enumerable: true,
            configurable: true
        });
        EventListener.prototype.initWhenCreate = function (option) {
            this._setHandlerDataList(option);
        };
        EventListener.prototype._setHandlerDataList = function (option) {
            var i = null, REGEX_HANDER = /on\w+/;
            for (i in option) {
                if (option.hasOwnProperty(i)) {
                    if (REGEX_HANDER.test(i)) {
                        this._handlerDataList.addChild({
                            eventName: this._parseEventName(i),
                            handler: option[i]
                        });
                    }
                }
            }
        };
        EventListener.prototype._parseEventName = function (handlerName) {
            return handlerName.slice(2).toLowerCase();
        };
        return EventListener;
    })();
    dy.EventListener = EventListener;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventHandler = (function () {
        function EventHandler() {
        }
        EventHandler.prototype.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.trigger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return EventHandler;
    })();
    dy.EventHandler = EventHandler;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var DomEventHandler = (function (_super) {
        __extends(DomEventHandler, _super);
        function DomEventHandler() {
            _super.apply(this, arguments);
        }
        DomEventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, dom = this.getDom(), eventRegister = dy.EventRegister.getInstance(), eventOffDataList = null;
            eventOffDataList = eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
            if (eventOffDataList) {
                eventOffDataList.forEach(function (eventOffData) {
                    self._unBind(dom, eventOffData.eventName, eventOffData.wrapHandler);
                });
            }
        };
        DomEventHandler.prototype.getDom = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        DomEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        DomEventHandler.prototype.handler = function (target, eventName, handler, priority) {
            var wrapHandler = null;
            if (!dy.EventRegister.getInstance().isBinded(target, eventName)) {
                wrapHandler = this._bind(this.getDom(), eventName, target);
            }
            else {
                wrapHandler = dy.EventRegister.getInstance().getWrapHandler(target, eventName);
            }
            dy.EventRegister.getInstance().register(target, eventName, handler, wrapHandler, priority);
        };
        DomEventHandler.prototype._bind = function (dom, eventName, target) {
            var wrapHandler = null;
            wrapHandler = this.buildWrapHandler(target, eventName);
            dyCb.EventUtils.addEvent(dom, eventName, wrapHandler);
            return wrapHandler;
        };
        DomEventHandler.prototype._unBind = function (dom, eventName, handler) {
            dyCb.EventUtils.removeEvent(dom, eventName, handler);
        };
        return DomEventHandler;
    })(dy.EventHandler);
    dy.DomEventHandler = DomEventHandler;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//responsiblity:handle logic with specify event category
//judge is under point
//wrap event object
var dy;
(function (dy) {
    var MouseEventHandler = (function (_super) {
        __extends(MouseEventHandler, _super);
        function MouseEventHandler() {
            _super.apply(this, arguments);
        }
        MouseEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        MouseEventHandler.prototype.on = function (target, eventName, handler, priority) {
            dyCb.Log.error(!(target instanceof dy.GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));
            this.handler(target, eventName, handler, priority);
        };
        MouseEventHandler.prototype.trigger = function (target, event, notSetTarget) {
            var eventName = event.name, eventType = event.type, registerDataList = null, isStopPropagation = false, self = this;
            if (!(target instanceof dy.GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }
            if (!notSetTarget) {
                event.target = target;
            }
            registerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(target, eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        MouseEventHandler.prototype.getDom = function () {
            return dy.Director.getInstance().getView().dom;
        };
        MouseEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject = self._createEventObject(event, eventName, target), topTarget = dy.Director.getInstance().getTopUnderPoint(eventObject.locationInView);
                dy.EventManager.emit(topTarget, eventObject);
            });
        };
        MouseEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        MouseEventHandler.prototype._createEventObject = function (event, eventName, currentTarget) {
            var obj = dy.MouseEvent.create(event ? event : window.event, eventName);
            obj.currentTarget = currentTarget;
            return obj;
        };
        MouseEventHandler._instance = null;
        return MouseEventHandler;
    })(dy.DomEventHandler);
    dy.MouseEventHandler = MouseEventHandler;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    //todo bind on GameObject which has the focus
    var KeyboardEventHandler = (function (_super) {
        __extends(KeyboardEventHandler, _super);
        function KeyboardEventHandler() {
            _super.apply(this, arguments);
        }
        KeyboardEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        KeyboardEventHandler.prototype.on = function (eventName, handler, priority) {
            this.handler(null, eventName, handler, priority);
        };
        KeyboardEventHandler.prototype.trigger = function (event) {
            var eventName = event.name, eventType = event.type, registerDataList = null, self = this;
            registerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
            });
            return true;
        };
        KeyboardEventHandler.prototype.getDom = function () {
            return document;
        };
        KeyboardEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                dy.EventManager.trigger(self._createEventObject(event, eventName));
            });
        };
        KeyboardEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        KeyboardEventHandler.prototype._createEventObject = function (event, eventName) {
            var obj = dy.KeyboardEvent.create(event ? event : window.event, eventName);
            return obj;
        };
        KeyboardEventHandler._instance = null;
        return KeyboardEventHandler;
    })(dy.DomEventHandler);
    dy.KeyboardEventHandler = KeyboardEventHandler;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CustomEventHandler = (function (_super) {
        __extends(CustomEventHandler, _super);
        function CustomEventHandler() {
            _super.apply(this, arguments);
        }
        CustomEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        CustomEventHandler.prototype.on = function (args) {
            if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                dy.EventRegister.getInstance().register(null, eventName, handler, null, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                dy.EventRegister.getInstance().register(target, eventName, handler, null, priority);
            }
        };
        CustomEventHandler.prototype.off = function (args) {
            var eventRegister = dy.EventRegister.getInstance();
            eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
        };
        CustomEventHandler.prototype.trigger = function (args) {
            var event = null;
            if (arguments.length === 1 || arguments.length === 2) {
                var userData = null;
                if (arguments.length === 1) {
                    event = arguments[0];
                }
                else {
                    event = arguments[0];
                    userData = arguments[1];
                }
                return this._triggerEventHandler(event, userData);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = null, userData = null, notSetTarget = null;
                if (arguments.length === 3) {
                    target = arguments[0];
                    event = arguments[1];
                    notSetTarget = arguments[2];
                }
                else {
                    target = arguments[0];
                    event = arguments[1];
                    userData = arguments[2];
                    notSetTarget = arguments[3];
                }
                return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
            }
        };
        CustomEventHandler.prototype._triggerEventHandler = function (event, userData) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            listenerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                eventCopy.target = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
                //if(eventCopy.isStopPropagation){
                //    isStopPropagation = true;
                //}
            });
            //return isStopPropagation;
            return true;
        };
        CustomEventHandler.prototype._triggerTargetAndEventHandler = function (target, event, userData, notSetTarget) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            if (!notSetTarget) {
                event.target = target;
            }
            listenerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(target, event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
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
        CustomEventHandler._instance = null;
        return CustomEventHandler;
    })(dy.EventHandler);
    dy.CustomEventHandler = CustomEventHandler;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventDispatcher = (function () {
        //private _eventBinder: EventBinder = null;
        //private _eventRegister:EventRegister = null;
        function EventDispatcher() {
            //this._eventBinder = binder;
            //EventRegister.getInstance() = register;
        }
        EventDispatcher.create = function () {
            var obj = new this();
            return obj;
        };
        EventDispatcher.prototype.trigger = function (args) {
            if (arguments.length === 1) {
                var event_1 = arguments[0], eventType = event_1.type;
                //dyCb.Log.error(eventType !== EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_1);
            }
            else if (arguments.length === 2 && !(arguments[1] instanceof dy.Event)) {
                var event_2 = arguments[0], userData = arguments[1], eventType = event_2.type;
                dyCb.Log.error(eventType !== dy.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_2, userData);
            }
            else if (arguments.length === 2 || (arguments.length === 3 && dy.JudgeUtils.isBoolean(arguments[2]))) {
                var target = arguments[0], event_3 = arguments[1], notSetTarget = arguments[2] === void 0 ? false : arguments[2], eventType = event_3.type;
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_3, notSetTarget);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], event_4 = arguments[1], userData = arguments[2], notSetTarget = arguments[3] === void 0 ? false : arguments[3], eventType = event_4.type;
                dyCb.Log.error(eventType !== dy.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_4, userData, notSetTarget);
            }
        };
        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        EventDispatcher.prototype.emit = function (target, eventObject, userData) {
            var isStopPropagation = false;
            eventObject.phase = dy.EventPhase.EMIT;
            eventObject.target = target;
            do {
                isStopPropagation = this._triggerWithUserData(target, eventObject.copy(), userData, true);
                if (isStopPropagation) {
                    break;
                }
                target = this._getParent(target);
            } while (target);
        };
        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        EventDispatcher.prototype.broadcast = function (target, eventObject, userData) {
            var self = this;
            eventObject.phase = dy.EventPhase.BROADCAST;
            eventObject.target = target;
            this._triggerWithUserData(target, eventObject.copy(), userData, true);
            function iterator(obj) {
                var children = obj.getChilren();
                if (children.getCount() === 0) {
                    return;
                }
                children.forEach(function (child) {
                    self._triggerWithUserData(child, eventObject.copy(), userData, true);
                    iterator(child);
                });
            }
            iterator(target);
        };
        EventDispatcher.prototype._getParent = function (target) {
            var parent = target.bubbleParent;
            return parent ? parent : target.parent;
        };
        EventDispatcher.prototype._triggerWithUserData = function (target, event, userData, notSetTarget) {
            return userData ? this.trigger(target, event.copy(), userData, notSetTarget)
                : this.trigger(target, event, notSetTarget);
        };
        return EventDispatcher;
    })();
    dy.EventDispatcher = EventDispatcher;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventRegister = (function () {
        function EventRegister() {
            this._listenerMap = dy.EventListenerMap.create();
        }
        EventRegister.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        EventRegister.prototype.register = function (target, eventName, handler, wrapHandler, priority) {
            //var isBindEventOnView = false,
            var data = {
                target: target,
                handler: handler,
                wrapHandler: wrapHandler,
                priority: priority
            };
            //eventName = <string>eventName;
            ////priority set in listener, not in this(binder)!
            //if(priority){
            //    listener.setPriority(priority);
            //}
            //if (this.isBindEventOnView(eventName)){
            //    isBindEventOnView = true;
            //    //this._listenerMap.appendChild(this._buildKey(target.uid, eventName), handler);
            //}
            //else {
            //    isBindEventOnView = false;
            //    //this._listenerMap.addChild(eventName, data);
            //}
            this._listenerMap.appendChild(eventName, data);
            //this._listenerList.addChild(listener.eventType,  {
            //    target:target,
            //    listener:listener
            //});
            //return isBindEventOnView;
        };
        EventRegister.prototype.remove = function (args) {
            var target = arguments[0];
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
                return null;
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                this._listenerMap.removeChild(eventName, handler);
                return null;
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(uid, eventName);
                return null;
            }
            else if (arguments.length === 1) {
                var dataList = null;
                dataList = this._listenerMap.getEventOffDataList(target);
                this._listenerMap.removeChild(target);
                this._handleAfterAllEventHandlerRemoved(target);
                return dataList;
            }
            else if (arguments.length === 2 || arguments.length === 3) {
                var eventName = arguments[1];
                this._listenerMap.removeChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                    return this._listenerMap.getEventOffDataList(target, eventName);
                }
                return null;
            }
        };
        EventRegister.prototype.getEventRegisterDataList = function (args) {
            var result = this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0)), self = this;
            if (!result) {
                return null;
            }
            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        };
        EventRegister.prototype.setBubbleParent = function (target, parent) {
            target.bubbleParent = parent;
        };
        EventRegister.prototype.isBinded = function (target, eventName) {
            return this._listenerMap.hasChild(target, eventName);
        };
        EventRegister.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventRegister.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventRegister.prototype.getChild = function (target, eventName) {
            return this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
        };
        EventRegister.prototype.getEventNameFromKey = function (key) {
            return this._listenerMap.getEventNameFromKey(key);
        };
        EventRegister.prototype.getUidFromKey = function (key) {
            return this._listenerMap.getUidFromKey(key);
        };
        EventRegister.prototype.getWrapHandler = function (target, eventName) {
            var list = this.getChild(target, eventName);
            if (list && list.getCount() > 0) {
                return list.getChild(0).wrapHandler;
            }
        };
        EventRegister.prototype.isTarget = function (key, target, list) {
            return this._listenerMap.isTarget(key, target, list);
        };
        //public copy(){
        //
        //}
        //private _isContain(parentTarget:GameObject, childTarget:GameObject){
        //    var parent = null;
        //
        //    parent = childTarget.parent;
        //
        //    while(parent){
        //        if(JudgeUtils.isEqual(parent, parentTarget)){
        //            return true;
        //        }
        //
        //        parent = childTarget.parent;
        //    }
        //
        //    return false;
        //}
        //private _removeFromMap(target:GameObject, eventName:EventName) {
        //}
        EventRegister.prototype._isAllEventHandlerRemoved = function (target) {
            return !this._listenerMap.hasChild(function (list, key) {
                return key.indexOf(String(target.uid)) > -1 && list !== undefined;
            });
        };
        EventRegister.prototype._handleAfterAllEventHandlerRemoved = function (target) {
            this.setBubbleParent(target, null);
        };
        EventRegister._instance = null;
        return EventRegister;
    })();
    dy.EventRegister = EventRegister;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    //responsibilty:on, off event(manage list)
    var EventBinder = (function () {
        //private _listenerList:EventListener = EventListener.create();
        //private _eventRegister:EventRegister = null;
        function EventBinder() {
            //EventRegister.getInstance() = eventRegister;
        }
        EventBinder.create = function () {
            var obj = new this();
            return obj;
        };
        EventBinder.prototype.on = function (args) {
            if (arguments.length === 1) {
                var listener = !(arguments[0] instanceof dy.EventListener) ? dy.EventListener.create(arguments[0]) : arguments[0];
                listener.handlerDataList.forEach(function (handlerData) {
                    dy.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = !(arguments[1] instanceof dy.EventListener) ? dy.EventListener.create(arguments[1]) : arguments[1];
                listener.handlerDataList.forEach(function (handlerData) {
                    dy.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        };
        EventBinder.prototype.off = function () {
            var eventRegister = dy.EventRegister.getInstance(), eventOffDataList = null, argArr = Array.prototype.slice.call(arguments, 0);
            if (arguments.length === 0) {
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key), targetUid = eventRegister.getUidFromKey(key);
                    if (!targetUid) {
                        dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                            .off(eventName);
                        return;
                    }
                    dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                        .off(targetUid, eventName);
                });
            }
            else if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key);
                    if (eventRegister.isTarget(key, target, list)) {
                        dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        };
        return EventBinder;
    })();
    dy.EventBinder = EventBinder;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var FactoryEventHandler = (function () {
        function FactoryEventHandler() {
        }
        FactoryEventHandler.createEventHandler = function (eventType) {
            var handler = null;
            switch (eventType) {
                case dy.EventType.MOUSE:
                    handler = dy.MouseEventHandler.getInstance();
                    break;
                case dy.EventType.KEYBOARD:
                    handler = dy.KeyboardEventHandler.getInstance();
                    break;
                case dy.EventType.CUSTOM:
                    handler = dy.CustomEventHandler.getInstance();
                    break;
                //todo more type
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventType"));
                    break;
            }
            return handler;
        };
        return FactoryEventHandler;
    })();
    dy.FactoryEventHandler = FactoryEventHandler;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    //    /*!
    //     it is designed as singleton, not static class, because it need maintain state(_instance attri).
    //
    //
    //     1>什么时候使用静态类代替singleton :
    //     这里有几个很好的静态类比singleton更好的应用场景. 最基本的例子就是在Java中的java.lang.Math类的实现方式, Math类就是用过静态方法来实现的,而不是单例来实现的.
    //     总结 :
    //     如果你的singleton不提维持任何状态, 仅仅是提供全局的访问 , 这个时候就适合用静态类 , 这样速度也更快, 因为static bind在编译期间(compile during) . 记住不经意维持子类的状态 , 尤其是在并发的情况下, 多个线程并发修改,这容易导致不容易发现的race condition 关于race condition .
    //
    //     静态类适用于一些工具类 , 其他的如单个访问资源就可以用singleton.
    //     2>静态类和singleton之间的区别 :
    //     ① static类有更好的访问效率(Static class provides better performance than Singleton pattern, because static methods are bonded on compile time)
    //     ③ singleton比static class更容易测试. 那个容易模拟(mock), 哪个就容易测试. singleton很容易用JUnit测试, 因为你能够传递mock对象, 当singleton需要的时候(作为方法参数或者构造函数参数),
    //     ④ 如果你的需求是维护(maintain)状态, 那么singleton比static class更好 , 如果使用static class会出现一些问题.
    //     ⑤ singleton支持延迟加载 , 而static class 则不支持这样的特性 , 在重量级的对象, 延迟加载就显得非常重要.
    //     ⑥ 在一些依赖注入(Dependency injection framework)的框架 , 它能够很好的管理singleton对象 . 例如Spring.
    //
    //     3>singleton相对于静态类的一些高级特点 :
    //     singleton 对于static class 主要的优点是更加面向对象 . 对于singleton你可以使用继承(Inheritance)和多态(polymorphism)来继承一个基类, 实现一个接口, 提供不同功能 的实现. 例如 , Java中java.lang.Runtime ,该类就是一个singleton的, 调用getRuntime(),基于不同的JVM ,返回不同的实现对象, 针对一个一个JVM,确保只有一个Runtime对象 , 如果使用static class就不能很好的来实现这样的功能了 .
    //     欢迎转载 转载请注明出处 : http://blog.csdn.net/johnny901114/article/details/11969015
    //     */
    //
    ////singleton class
    //static class
    var EventManager = (function () {
        function EventManager() {
        }
        EventManager.on = function (args) {
            if (arguments.length === 1) {
                var listener = arguments[0];
                this._eventBinder.on(listener);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isString(arguments[0]) && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], priority = 1;
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = arguments[1];
                this._eventBinder.on(target, listener);
            }
            else if (arguments.length === 3 && dy.JudgeUtils.isString(arguments[0]) && dy.JudgeUtils.isFunction(arguments[1]) && dy.JudgeUtils.isNumber(arguments[2])) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3] === undefined ? 1 : arguments[3];
                this._eventBinder.on(target, eventName, handler, priority);
            }
        };
        EventManager.off = function () {
            this._eventBinder.off.apply(this._eventBinder, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.trigger = function (args) {
            this._eventDispatcher.trigger.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.broadcast = function (target, event, userData) {
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.emit = function (target, event, userData) {
            this._eventDispatcher.emit.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.fromEvent = function (args) {
            var addHandler = null, removeHandler = null;
            if (arguments.length === 1) {
                var eventName = arguments[0];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[1])) {
                var eventName = arguments[0], priority = arguments[1];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], priority = arguments[2];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            return dyRt.fromEventPattern(addHandler, removeHandler);
        };
        EventManager.setBubbleParent = function (target, parent) {
            dy.EventRegister.getInstance().setBubbleParent(target, parent);
            //this._eventDispatcher.setBubbleParent(target, parent);
        };
        //private static static _instance:EventManager = null;
        //
        //public static static getInstance() {
        //    if (this._instance === null) {
        //        this._instance = new this();
        //        //this._instance.initWhenCreate();
        //    }
        //    return this._instance;
        //}
        EventManager._eventBinder = dy.EventBinder.create();
        EventManager._eventDispatcher = dy.EventDispatcher.create();
        return EventManager;
    })();
    dy.EventManager = EventManager;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GameObject = (function () {
        function GameObject() {
            this._uid = null;
            //todo add mesh,scene position 研究threejs->dynamic，看如何表示position
            this._position = null;
            this._parent = null;
            this._bubbleParent = null;
            this._children = dyCb.Collection.create();
            this._uid = GameObject._count;
            GameObject._count += 1;
        }
        Object.defineProperty(GameObject.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            set: function (uid) {
                this._uid = uid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (position) {
                this._position = position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                this._parent = parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "bubbleParent", {
            get: function () {
                return this._bubbleParent;
            },
            set: function (bubbleParent) {
                this._bubbleParent = bubbleParent;
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.init = function () {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        /*!
         virtual
         */
        GameObject.prototype.dispose = function () {
            this.parent = null;
            dy.EventManager.off(this);
        };
        /*!
         hook method
         */
        GameObject.prototype.onEnter = function () {
        };
        GameObject.prototype.onStartLoop = function () {
        };
        GameObject.prototype.onEndLoop = function () {
        };
        GameObject.prototype.onExit = function () {
        };
        GameObject.prototype.hasChild = function (child) {
            return this._children.hasChild(child);
        };
        //public addChild(child:GameObject, sort:boolean=true):boolean {
        GameObject.prototype.addChild = function (child) {
            //need user judge it!
            //if(this._children.hasChild(child)) {
            //    return false;
            //}
            if (child.parent) {
                //will remove bind event,remove from parent ...
                child.removeMe();
            }
            child.parent = this;
            //child.dispatchEvent(new CoreEvent('beforeadd', false, {
            //    parent: this
            //}));
            this._children.addChild(child);
            //if(sort) {
            /*!
            sort when add child/children, not when get children.
            because each loop will get children(to render), so if using the latter, each loop should sort!
             */
            this.sort();
            //}
            //child._parent = this;
            //child.setBubbleParent(this);
            //child._transform.dirty = true;
            //child.dispatchEvent(new CoreEvent('add', false));
            //this.dispatchEvent(new CoreEvent('childadd', false, {
            //    child: child
            //}));
            child.init();
            child.onEnter();
            return this;
        };
        GameObject.prototype.getChilren = function () {
            return this._children;
        };
        GameObject.prototype.sort = function () {
            this._children.sort(this._ascendZ);
            return this;
        };
        GameObject.prototype.forEach = function (func) {
            this._children.forEach(func);
            return this;
        };
        GameObject.prototype.removeChild = function (child) {
            child.onExit();
            this._children.removeChild(child);
            //var idx = this._children.indexOf(child);
            //if(idx !== -1) {
            //    child.dispatchEvent(new CoreEvent('beforeremove', false));
            //    this._children.splice(idx, 1);
            child.dispose();
            //child.setBubbleParent(null);
            //    child.dispatchEvent(new CoreEvent('remove', false, {
            //        parent: this
            //    }));
            //    this.dispatchEvent(new CoreEvent('childremove', false, {
            //        child: child
            //    }));
            //    return true;
            //}
            //return false;
            return this;
        };
        /**
         * remove this game object from parent.
         * @returns {boolean}
         */
        GameObject.prototype.removeMe = function () {
            var parent = this._parent;
            parent && parent.removeChild(this);
            return this;
        };
        GameObject.prototype.getTopUnderPoint = function (point) {
            //var found, localP, child;
            //var childrenArr;
            //if(!this._active || !this._visible) return null;
            //if(this._interactiveRect) {
            //    localP = this.transform.globalToLocal(x, y);
            //    if(!this._interactiveRect.containsXY(localP.x, localP.y)) {
            //        return null;
            //    }
            //}
            //childrenArr = this._children;
            //if(childrenArr.length > 0) {
            //    for(var i=childrenArr.length-1; i>=0; i--) {
            //        child = childrenArr[i];
            //        found = child.getUnderPoint(x, y, touchable);
            //        if(found) {
            //            return found;
            //        }
            //    }
            //}
            //
            //if(!touchable || this._touchable) {
            //    if(!localP) {
            //        localP = this.transform.globalToLocal(x, y);
            //    }
            //    if(this.testHit(localP.x, localP.y)) {
            //        return this;
            //    }
            //}
            //return null;
            var result = null, i = null, children = null, len = this._children.getCount();
            children = this._children;
            if (len > 0) {
                for (i = len - 1; i >= 0; i--) {
                    var child = children.getChild(i);
                    result = child.getTopUnderPoint(point);
                    if (result) {
                        return result;
                    }
                }
            }
            if (this.isHit(point)) {
                return this;
            }
            return null;
        };
        GameObject.prototype.isHit = function (locationInView) {
            //todo extract collider?
            //var collider:Collider = this._collider;
            //return collider && collider.collideXY(localX, localY);
            //var RANGE = 10;
            //
            //return Math.abs(this._position.x - locationInView.x) < RANGE
            //&& Math.abs(this._position.y - locationInView.y) < RANGE;
            //todo complete this after adding position
            if (locationInView) {
                return true;
            }
            else {
                return false;
            }
        };
        GameObject.prototype._ascendZ = function (a, b) {
            return function (a, b) {
                return a.position.z - b.position.z;
            };
        };
        GameObject._count = 1;
        return GameObject;
    })();
    dy.GameObject = GameObject;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Mesh = (function (_super) {
        __extends(Mesh, _super);
        function Mesh(gemo) {
            _super.call(this);
            this._matrix = dy.Matrix.create();
            this._gemo = null;
            this._actionManager = dy.ActionManager.create();
            this._gemo = gemo;
        }
        //todo push,pop matrix, so need change pos, rotate angle, scale instead of changing matrix!
        //when need push,pop matrix?
        //todo use component architecture, delete Mesh, make Geometry,Material to be component
        //todo be Material(add baseClass Material)
        Mesh.create = function (gemo) {
            var obj = new this(gemo);
            return obj;
        };
        Object.defineProperty(Mesh.prototype, "matrix", {
            get: function () {
                return this._matrix;
            },
            set: function (matrix) {
                this._matrix = matrix;
            },
            enumerable: true,
            configurable: true
        });
        Mesh.prototype.runAction = function (action) {
            this._actionManager.addChild(action);
        };
        Mesh.prototype.update = function () {
            this._actionManager.update();
        };
        Mesh.prototype.draw = function () {
            this._addDrawCommand();
        };
        Mesh.prototype.init = function () {
            this.position = dy.Position.create(0, 0, 0);
        };
        Mesh.prototype._addDrawCommand = function () {
            var renderer = dy.Director.getInstance().renderer, quadCmd = renderer.createQuadCommand();
            quadCmd.buffers = {
                vertexBuffer: this._gemo.vertices,
                //texCoords: this._gemo.texCoords,
                //normals: this._gemo.normals,
                indexBuffer: this._gemo.indices,
                colorBuffer: this._gemo.colors
            };
            //quadCmd.bufferData = ;
            //quadCmd.color = this._material.color;
            renderer.addCommand(quadCmd);
        };
        return Mesh;
    })(dy.GameObject);
    dy.Mesh = Mesh;
})(dy || (dy = {}));

var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene(camera) {
            _super.call(this);
            //private _meshes:dyCb.Collection = dyCb.Collection.create();
            this._camera = null;
            this._program = null;
            this._camera = camera;
        }
        Scene.create = function (camera, vsSource, fsSource) {
            var obj = new this(camera);
            obj.initWhenCreate(vsSource, fsSource);
            return obj;
        };
        Object.defineProperty(Scene.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            set: function (camera) {
                this._camera = camera;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Scene.prototype, "program", {
            get: function () {
                return this._program;
            },
            set: function (program) {
                this._program = program;
            },
            enumerable: true,
            configurable: true
        });
        Scene.prototype.initWhenCreate = function (vsSource, fsSource) {
            this._program = dy.Program.create(vsSource, fsSource);
        };
        //public add(meshesArr:Mesh[]) {
        //    this._meshes.addChildren(meshesArr);
        //}
        Scene.prototype.run = function () {
            var self = this;
            this._camera.pushMatrix();
            this._camera.onStartLoop();
            this._camera.run();
            this._program.use();
            this.forEach(function (mesh) {
                self._setData(mesh);
                mesh.update();
                mesh.draw();
            });
            this._camera.onEndLoop();
            this._camera.popMatrix();
        };
        Scene.prototype.init = function () {
            this.position = dy.Position.create(0, 0, 0);
        };
        Scene.prototype._setData = function (mesh) {
            this._program.setUniformData("u_mvpMatrix", dy.UniformDataType.FLOAT_MAT4, this._computeMvpMatrix(mesh));
        };
        Scene.prototype._computeMvpMatrix = function (mesh) {
            return mesh.matrix.copy().applyMatrix(this._camera.computeVpMatrix());
        };
        return Scene;
    })(dy.GameObject);
    dy.Scene = Scene;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    /**
     * 来自《HTML5 Canvas 核心技术》
     * 不能写到global中，否则会报错“illegal invocation”！
     */
    window.requestNextAnimationFrame = (function () {
        var originalRequestAnimationFrame = undefined, wrapper = undefined, callback = undefined, geckoVersion = null, userAgent = navigator.userAgent, index = 0, self = this;
        wrapper = function (time) {
            time = +new Date();
            self.callback(time);
        };
        /*!
         bug!
         below code:
         when invoke b after 1s, will only invoke b, not invoke a!

         function a(time){
         console.log("a", time);
         webkitRequestAnimationFrame(a);
         }

         function b(time){
         console.log("b", time);
         webkitRequestAnimationFrame(b);
         }

         a();

         setTimeout(b, 1000);



         so use requestAnimationFrame priority!
         */
        if (window.requestAnimationFrame) {
            return requestAnimationFrame;
        }
        // Workaround for Chrome 10 bug where Chrome
        // does not pass the time to the animation function
        if (window.webkitRequestAnimationFrame) {
            // Define the wrapper
            // Make the switch
            originalRequestAnimationFrame = window.webkitRequestAnimationFrame;
            window.webkitRequestAnimationFrame = function (callback, element) {
                self.callback = callback;
                // Browser calls the wrapper and wrapper calls the callback
                return originalRequestAnimationFrame(wrapper, element);
            };
        }
        //修改time参数
        if (window.msRequestAnimationFrame) {
            originalRequestAnimationFrame = window.msRequestAnimationFrame;
            window.msRequestAnimationFrame = function (callback) {
                self.callback = callback;
                return originalRequestAnimationFrame(wrapper);
            };
        }
        // Workaround for Gecko 2.0, which has a bug in
        // mozRequestAnimationFrame() that restricts animations
        // to 30-40 fps.
        if (window.mozRequestAnimationFrame) {
            // Check the Gecko version. Gecko is used by browsers
            // other than Firefox. Gecko 2.0 corresponds to
            // Firefox 4.0.
            index = userAgent.indexOf('rv:');
            if (userAgent.indexOf('Gecko') != -1) {
                geckoVersion = userAgent.substr(index + 3, 3);
                if (geckoVersion === '2.0') {
                    // Forces the return statement to fall through
                    // to the setTimeout() function.
                    window.mozRequestAnimationFrame = undefined;
                }
            }
        }
        //            return  window.requestAnimationFrame ||  //传递给callback的time不是从1970年1月1日到当前所经过的毫秒数！
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                var start, finish;
                window.setTimeout(function () {
                    start = +new Date();
                    callback(start);
                    finish = +new Date();
                    self.timeout = 1000 / 60 - (finish - start);
                }, self.timeout);
            };
    }());
    window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame
        || window.webkitCancelAnimationFrame
        || window.webkitCancelRequestAnimationFrame
        || window.mozCancelRequestAnimationFrame
        || window.oCancelRequestAnimationFrame
        || window.msCancelRequestAnimationFrame
        || clearTimeout;
    var Director = (function () {
        function Director() {
            //todo :Renderer
            this._renderer = null;
            this._view = null;
            this._gl = null;
            this._scene = null;
            this._loopId = null;
        }
        Director.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        };
        Object.defineProperty(Director.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            set: function (renderer) {
                this._renderer = renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (view) {
                this._view = view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "gl", {
            get: function () {
                return this._gl;
            },
            set: function (gl) {
                this._gl = gl;
            },
            enumerable: true,
            configurable: true
        });
        Director.prototype.initWhenCreate = function () {
            //todo detect to decide using which renderer
            this._renderer = dy.WebGLRenderer.create();
        };
        Director.prototype.runWithScene = function (scene) {
            scene.init();
            scene.onEnter();
            this._scene = scene;
            //todo not put here?
            this._renderer.init();
            this._startLoop();
        };
        Director.prototype.getView = function () {
            return this._view;
        };
        Director.prototype.getTopUnderPoint = function (point) {
            if (!this._scene) {
                return null;
            }
            return this._scene.getTopUnderPoint(point);
        };
        Director.prototype.createGL = function (canvasId) {
            this._view = dy.ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this._gl = this._view.getContext();
        };
        Director.prototype._startLoop = function () {
            var self = this, mainLoop = null;
            mainLoop = function (time) {
                self._loopBody(time);
                self._loopId = window.requestNextAnimationFrame(mainLoop);
            };
            this._loopId = window.requestNextAnimationFrame(mainLoop);
        };
        //todo add tick mechanism
        Director.prototype._loopBody = function (time) {
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            this._scene.onStartLoop();
            this._scene.run();
            this._renderer.render(this._scene);
            this._scene.onEndLoop();
        };
        Director._instance = null;
        return Director;
    })();
    dy.Director = Director;
})(dy || (dy = {}));

/// <reference path="definitions.d.ts"/>
var dy;
(function (dy) {
    //todo can set perspectiveParams, add updateProjectMatrix method
    //todo optimize to reduce compute
    var Camera = (function () {
        function Camera(lookAtParams, perspectiveParams) {
            this._pMatrix = null;
            this._vMatrix = null;
            this._moveSpeed = 0.05;
            this._rotateStepX = 0.1;
            this._rotateStepY = 0.1;
            this._zoomSpeed = 10;
            this._eyeX = null;
            this._eyeY = null;
            this._eyeZ = null;
            this._upX = null;
            this._upY = null;
            this._upZ = null;
            this._centerX = null;
            this._centerY = null;
            this._centerZ = null;
            this._zoomAngle = null;
            this._aspect = null;
            this._near = null;
            this._far = null;
            this._moveX = null;
            this._moveY = null;
            this._moveZ = null;
            this._rotateAngleX = null;
            this._rotateAngleY = null;
            this._zoomInAngle = null;
            this._zoomOutAngle = null;
            this._eyeX = lookAtParams.eyeX;
            this._eyeY = lookAtParams.eyeY;
            this._eyeZ = lookAtParams.eyeZ;
            this._upX = lookAtParams.upX;
            this._upY = lookAtParams.upY;
            this._upZ = lookAtParams.upZ;
            this._centerX = lookAtParams.centerX;
            this._centerY = lookAtParams.centerY;
            this._centerZ = lookAtParams.centerZ;
            this._zoomAngle = perspectiveParams.angle;
            this._aspect = perspectiveParams.aspect;
            this._near = perspectiveParams.near;
            this._far = perspectiveParams.far;
            this._moveX = 0;
            this._moveY = 0;
            this._moveZ = 0;
            this._rotateAngleX = 0;
            this._rotateAngleY = 0;
            this._zoomInAngle = 0;
            this._zoomOutAngle = 0;
            this._pMatrix = dy.Matrix.create();
            this._vMatrix = dy.Matrix.create();
        }
        Camera.create = function (lookAtParams, perspectiveParams) {
            var obj = new this(lookAtParams, perspectiveParams);
            obj.initWhenCreate();
            return obj;
        };
        Object.defineProperty(Camera.prototype, "pMatrix", {
            get: function () {
                return this._pMatrix;
            },
            set: function (pMatrix) {
                this._pMatrix = pMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "vMatrix", {
            get: function () {
                return this._vMatrix;
            },
            set: function (vMatrix) {
                this._vMatrix = vMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "moveSpeed", {
            get: function () {
                return this._moveSpeed;
            },
            set: function (moveSpeed) {
                this._moveSpeed = moveSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotateStepX", {
            get: function () {
                return this._rotateStepX;
            },
            set: function (_rotateStepX) {
                this._rotateStepX = _rotateStepX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "rotateStepY", {
            get: function () {
                return this._rotateStepY;
            },
            set: function (rotateStepY) {
                this._rotateStepY = rotateStepY;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "zoomSpeed", {
            get: function () {
                return this._zoomSpeed;
            },
            set: function (zoomSpeed) {
                this._zoomSpeed = zoomSpeed;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.initWhenCreate = function () {
            this._vMatrix.setLookAt(this._eyeX, this._eyeY, this._eyeZ, this._centerX, this._centerY, this._centerZ, this._upX, this._upY, this._upZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.computeVpMatrix = function () {
            var matrix = dy.Matrix.create();
            matrix.applyMatrix(this._vMatrix);
            matrix.applyMatrix(this._pMatrix);
            return matrix;
        };
        Camera.prototype.moveLeft = function () {
            this._computeMoveDistance(dy.Vector4.create(-this._moveSpeed, 0, 0, 1));
            //绕x轴旋转时，投影xy平面为垂直方向，而Left和Right移动投影到xy平面为水平方向，因此绕x轴旋转不会影响Left和Right移动
            //this._moveX = this._moveX + cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveRight = function () {
            this._computeMoveDistance(dy.Vector4.create(this._moveSpeed, 0, 0, 1));
            //this._moveX = this._moveX - cos(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - sin(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveBack = function () {
            this._computeMoveDistance(dy.Vector4.create(0, 0, this._moveSpeed, 1));
            //this._moveY = this._moveY - sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleX* PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX + sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        Camera.prototype.moveFront = function () {
            this._computeMoveDistance(dy.Vector4.create(0, 0, -this._moveSpeed, 1));
            //this._moveY = this._moveY + sin(this._rotateAngleX * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ - cos(this._rotateAngleX* PI / 180) *this._moveSpeed;
            //this._moveX = this._moveX - sin(this._rotateAngleY * PI / 180) * this._moveSpeed;
            //this._moveZ = this._moveZ + cos(this._rotateAngleY* PI / 180) *this._moveSpeed;
        };
        //todo 用欧拉角或四元数来表示方向
        Camera.prototype.rotate = function () {
            this._rotateAngleY = this._rotateAngleY + this._rotateStepY;
            ;
            this._rotateAngleX = Math.max(Math.min(this._rotateAngleX + this._rotateStepX, 90.0), -90.0);
        };
        Camera.prototype.zoomIn = function () {
            this._zoomAngle = Math.min(this._zoomAngle + this._zoomSpeed, 179);
        };
        Camera.prototype.zoomOut = function () {
            this._zoomAngle = Math.max(this._zoomAngle - this._zoomSpeed, 1);
        };
        Camera.prototype.run = function () {
            /*!
             需要对视图坐标系进行变换，先进行旋转变换R，再进行平移变换T，即M=T*R
             因此相当于对视图坐标进行M的逆变换，即M-1=R-1 * T-1，即X'=(R-1 * T-1) * X（X为视图坐标，X'为变换后的坐标）

             而此处是对视图坐标进行变换，因此要进行M的逆变换。

             注意：旋转角rotateAngle和移动距离都是针对视图坐标系的！
             */
            this._vMatrix.translate(-this._moveX, -this._moveY, -this._moveZ);
            this._vMatrix.rotate(-this._rotateAngleY, 0.0, 1.0, 0.0);
            this._vMatrix.rotate(-this._rotateAngleX, 1.0, 0.0, 0.0);
            //var vec4 = MatrixTool.multiplyVector4(this._vMatrix.values, [this._eyeX, this._eyeY, this._eyeZ, 1]);
            //this._eyeX = vec4[0];
            //this._eyeY = vec4[1];
            //this._eyeZ = vec4[2];
            //this._vMatrix.translate(this._moveX, this._moveY, this._moveZ);
            this._pMatrix.setPerspective(this._zoomAngle, this._aspect, this._near, this._far);
        };
        Camera.prototype.pushMatrix = function () {
            this._vMatrix.push();
            this._pMatrix.push();
        };
        Camera.prototype.popMatrix = function () {
            this._vMatrix.pop();
            this._pMatrix.pop();
        };
        /*!
         hook method
         */
        Camera.prototype.onStartLoop = function () {
        };
        Camera.prototype.onEndLoop = function () {
        };
        Camera.prototype._computeMoveDistance = function (speedVec4) {
            /*!
             此处移动距离是针对视图坐标系的（先旋转，然后平移），因此需要计算视图坐标系旋转后移动的距离。
             */
            var matrix = dy.Matrix.create();
            matrix.setRotate(this._rotateAngleX, 1.0, 0.0, 0.0);
            matrix.rotate(this._rotateAngleY, 0.0, 1.0, 0.0);
            var result = matrix.multiplyVector4(speedVec4).values;
            this._moveX += result[0];
            this._moveY += result[1];
            this._moveZ += result[2];
        };
        return Camera;
    })();
    dy.Camera = Camera;
})(dy || (dy = {}));
