/***********************************************
 基于jasmine的测试库YTester   v0.1

 已完成Fake组件  v0.1

 作者：YYC
 日期：2013-09-01
 电子邮箱：395976266@qq.com
 QQ: 395976266
 博客：http://www.cnblogs.com/chaogex/

 ************************************************/

(function () {
    //判断是否为对象字面量（{}）
    function _isDirectObject(obj) {
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            return true;
        }

        return false;
    }

    function _extendDeep(parent, child) {
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
    }

    function _delete(obj, attr) {
        //因为ie下使用delete有bug，所以用指定为undefined来代替：
        //ie中（如ie8）使用delete删除全局属性（如“window.foo = 1;”中的foo），
        //会抛出错误：“对象不支持此操作”！
        obj[attr] = undefined;
    }

    /**
     * Fake组件
     */
    var Fake = {
        _objectContainer: {},
        _object: null,

        _createEmptyObj: function (objStr) {
            var parts = objStr.split('.'),
                i = 0,
                len = 0,
                higher = window;

            for (i = 0, len = parts.length; i < len; i++) {
                if (!this._namespaceIsExist(higher[parts[i]]) || this._pointToObj(i, len)) {
                    higher[parts[i]] = {};
                }
                higher = higher [parts[i]];
            }

            return this._getMockObj(higher, higher[parts[i]]);
        },
        _namespaceIsExist: function (namespace) {
            return typeof namespace !== "undefined";
        },
        _pointToObj: function (i, len) {
            return i === len - 1;
        },
        _getMockObj: function (higher, current) {
            return this._namespaceIsExist(current) ? current : higher;
        },
        _isNotNamespace: function (obj) {
            return !YYC.Tool.judge.isDirectObject(obj);
        },
        _backUpTopNamespace: function (objStr) {
            var topName = objStr.split('.')[0],
                topNamespace = window[topName];


            if (this._namespaceIsExist(topNamespace)) {
                if (!this._objectContainer[topName]) {
                    this._objectContainer[topName] = _extendDeep(topNamespace);
                }
            }
            else {
                this._objectContainer[topName] = "not exist";
            }
        },
        _check: function (objStr) {
            var parts = objStr.split('.'),
                i = 0,
                len = 0,
                higher = window,
                next = null,
                targetObj = null;

            for (i = 0, len = parts.length; i < len; i++) {
                next = higher[parts[i]];

                if (!this._namespaceIsExist(next)) {
                    continue;
                }

                if (this._pointToObj(i, len) && this._namespaceIsExist(next)) {
                    targetObj = higher[parts[i]];

                    if (!_isDirectObject(targetObj)) {
                        throw new Error("必须为对象");
                    }
                }
                else if (this._namespaceIsExist(next) && this._isNotNamespace((next))) {
                    throw new Error("必须为命名空间");
                }
                else {
                    higher = higher[parts[i]];
                }
            }
        },
        createObj: function (objStr) {
            var self = this;

            if (objStr) {
//                this._check(objStr);

                this._backUpTopNamespace(objStr);

                this._object = this._createEmptyObj(objStr);
            }
            else {
                this._object = window;
            }

            return {
                _object: self._object,

                replace: function (obj) {
                    _extendDeep(obj, self._object);
                },
                restore: function () {
                    var i = null;

                    for (i in self._objectContainer) {
                        if (self._objectContainer.hasOwnProperty(i)) {
                            if (self._objectContainer[i] === "not exist") {
                                _delete(window, i);
                            }
                            else {
                                window[i] = self._objectContainer[i];
                            }
                        }
                    }
                }
            }
        }
    };

    YYC.namespace("Test").Fake = Fake;
}());

//
//var Stub = YYC.Class({
//    Init: function () {
//    },
//    Private: {
//        _objectContainer: {},
//        _object: null,
//
//        _createEmptyObj: function (objStr) {
//            var parts = objStr.split('.'),
//                i = 0,
//                len = 0,
//                higher  = window;
//
//            for (i = 0, len = parts.length; i < len; i++) {
//                if (!this._namespaceIsExist(higher[parts[i]]) || this._pointToObj(i, len)) {
//                    higher[parts[i]] = {};
//                }
//                higher  = higher [parts[i]];
//            }
//
//            return this._getMockObj(higher, higher[parts[i]]);
//        },
//        _namespaceIsExist: function (namespace) {
//            return typeof namespace !== "undefined";
//        },
//        _pointToObj: function(i, len){
//            return i === len - 1;
//        },
//        _getMockObj: function(higher, current){
//            return this._namespaceIsExist(current) ? current : higher;
//        },
//        _isNotNamespace: function(obj){
//            return !YYC.Tool.judge.isDirectObject(obj);
//        },
//        _backUpTopNamespace: function (objStr) {
//            var topName = objStr.split('.')[0],
//                topNamespace = window[topName];
//
//
//            if (this._namespaceIsExist(topNamespace)) {
//                if (!this._objectContainer[topName]) {
//                    this._objectContainer[topName] = YYC.Tool.extend.extendDeep(topNamespace);
//                }
//            }
//            else {
//                this._objectContainer[topName] = "not exist";
//            }
//        },
//        _check: function (objStr) {
//            var parts = objStr.split('.'),
//                i = 0,
//                len = 0,
//                higher = window,
//                next = null,
//                targetObj = null;
//
//            for (i = 0, len = parts.length; i < len; i++) {
//                next = higher[parts[i]];
//
//                if (!this._namespaceIsExist(next)) {
//                    continue;
//                }
//
//                if (this._pointToObj(i, len) && this._namespaceIsExist(next)) {
//                    targetObj = higher[parts[i]];
//
//                    if (!YYC.Tool.judge.isDirectObject(targetObj)) {
//                        throw new Error("要mock的必须为对象");
//                    }
//                }
//                else if (this._namespaceIsExist(next) && this._isNotNamespace((next))) {
//                    throw new Error("必须为命名空间");
//                }
//                else {
//                    higher = higher[parts[i]];
//                }
//            }
//        }
//    },
//    Public: {
//        /**
//         * stub对象实例
//         * @param objStr
//         * @returns {{_object: *, mock: Function, replace: Function}}
//         */
//        createObj: function (objStr) {
//            var self = this;
//
//            if (objStr) {
//                this._check(objStr);
//
//                this._backUpTopNamespace(objStr);
//
//                this._object = this._createEmptyObj(objStr);
//            }
//            else {
//                this._object = window;
//            }
//
//            return {
//                _object: self._object,
//
//                mock: function (methodStr) {
//                    var self = this;
//
//                    if (!YYC.Tool.judge.isString(methodStr)) {
//                        throw new Error("参数必须为string类型");
//                    }
//
//
//                    self._object[methodStr] = jasmine.createSpy(methodStr);
//
//                    return {
//                        fake: function (func) {
//                            self._object[methodStr].andCallFake(func);
//                        },
//                        "return": function (value) {
//                            self._object[methodStr].andReturn(value);
//                        }
//                    }
//                },
//                replace: function (obj) {
//                    YYC.Tool.extend.extendDeep(obj, self._object);
//                }
//            }
//        },
//        getMockObj: function(){
//            return this._object;
//        },
//        restore: function () {
//            var i = null;
//
//            for (i in this._objectContainer) {
//                if (this._objectContainer.hasOwnProperty(i)) {
//                    if (this._objectContainer[i] === "not exist") {
//                        YYC.Tool.object.delete(window, i);
//                    }
//                    else {
//                        window[i] = this._objectContainer[i];
//                    }
//                }
//            }
//        },
//        dispose: function () {
//
//        }
//    }
//});


//(function () {
//    var YTester = {
//        _objectContainer: {},
//        _object: null,
//
//        _createEmptyObj: function (objStr) {
//            var parts = objStr.split('.'),
//                i = 0,
//                len = 0,
//                higher  = window;
//
//            for (i = 0, len = parts.length; i < len; i++) {
//                if (!this._namespaceIsExist(higher[parts[i]]) || this._pointToObj(i, len)) {
//                    higher[parts[i]] = {};
//                }
//                higher  = higher [parts[i]];
//            }
//
//            return this._getMockObj(higher, higher[parts[i]]);
//        },
//        _namespaceIsExist: function (namespace) {
//            return typeof namespace !== "undefined";
//        },
//        _pointToObj: function(i, len){
//            return i === len - 1;
//        },
//        _getMockObj: function(higher, current){
//            return this._namespaceIsExist(current) ? current : higher;
//        },
//        _isNotNamespace: function(obj){
//            return !YYC.Tool.judge.isDirectObject(obj);
//        },
//        _backUpTopNamespace: function (objStr) {
//            var topName = objStr.split('.')[0],
//                topNamespace = window[topName];
//
//
//            if (this._namespaceIsExist(topNamespace)) {
//                if (!this._objectContainer[topName]) {
//                    this._objectContainer[topName] = YYC.Tool.extend.extendDeep(topNamespace);
//                }
//            }
//            else {
//                this._objectContainer[topName] = "not exist";
//            }
//
//        },
//        _check: function (objStr) {
//            var parts = objStr.split('.'),
//                i = 0,
//                len = 0,
//                higher = window,
//                next = null,
//                targetObj = null;
//
//            for (i = 0, len = parts.length; i < len; i++) {
//                next = higher[parts[i]];
//
//                if (!this._namespaceIsExist(next)) {
//                    continue;
//                }
//
//                if (this._pointToObj(i, len) && this._namespaceIsExist(next)) {
//                    targetObj = higher[parts[i]];
//
//                    if (!YYC.Tool.judge.isDirectObject(targetObj)) {
//                        throw new Error("要mock的必须为对象");
//                    }
//                }
//                else if (this._namespaceIsExist(next) && this._isNotNamespace((next))) {
//                    throw new Error("必须为命名空间");
//                }
//                else {
//                    higher = higher[parts[i]];
//                }
//            }
//        } ,
//
//        /**
//         * mock对象
//         * @param objStr
//         * @returns {{_object: *, mock: Function, replace: Function}}
//         */
//        createObj: function (objStr) {
//            var self = this;
//
//            if (objStr) {
//                this._check(objStr);
//
//                this._backUpTopNamespace(objStr);
//
//                this._object = this._createEmptyObj(objStr);
//            }
//            else {
//                this._object = window;
//            }
//
//            return {
//                _object: self._object,
//
//                mock: function (methodStr) {
//                    var self = this;
//
//                    if (!YYC.Tool.judge.isString(methodStr)) {
//                        throw new Error("参数必须为string类型");
//                    }
//
//
//                    self._object[methodStr] = jasmine.createSpy(methodStr);
//
//                    return {
//                        fake: function (func) {
//                            self._object[methodStr].andCallFake(func);
//                        },
//                        "return": function (value) {
//                            self._object[methodStr].andReturn(value);
//                        }
//                    }
//                },
//                replace: function (obj) {
//                    YYC.Tool.extend.extendDeep(obj, self._object);
//                }
//            }
//        },
//        getMockObj: function(){
//            return this._object;
//        },
//        restore: function () {
//            var i = null;
//
//            for (i in this._objectContainer) {
//                if (this._objectContainer.hasOwnProperty(i)) {
//                    if (this._objectContainer[i] === "not exist") {
//                        YYC.Tool.object.delete(window, i);
//                    }
//                    else {
//                        window[i] = this._objectContainer[i];
//                    }
//                }
//            }
//        },
//        dispose: function () {
//
//        }
//    };
//
//
//
//    YYC.YTester = YTester;
//}());

