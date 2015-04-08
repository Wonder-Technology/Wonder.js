/*
 测试辅助工具
 01-24
 */

var testTool = (function () {
    var _isString = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };
    var _isFunction = function (str) {
        return Object.prototype.toString.call(str) === "[object Function]";
    };
    var _isArray = function (str) {
        return Object.prototype.toString.call(str) === "[object Array]";
    };

    return {
        bind: function (object, fun) {
            return function () {
                return fun.apply(object, arguments);
            };
        },
        /*
         注意bindWithArguments与bind的区别！它们传的参数不一样！

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
        },
        jqueryToString: function (jq) {
            var d = $("<div>");

            d.html(jq);

            return d.html();
        },
        extend: function (destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
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
        deleteMember: function (obj, member) {
            //因为ie下使用delete有bug，所以用指定为undefined来代替：
            //ie中（如ie8）使用delete删除全局属性（如“window.foo = 1;”中的foo），
            //会抛出错误：“对象不支持此操作”！
//            attr = undefined;
            delete obj[member];
        },
        //将obj[funcName]替换为空函数并监视，从而达到不执行该函数的目的。
        toBeEmptyFuncAndSpy: function (obj, funcName) {
            if (!_isString(funcName)) {
                throw new Error("第二个参数必须为函数名");
            }

            spyOn(obj, funcName).andCallFake(function () {
            });
        },
        /**
         * 创建一个类，它有一个名为funcName的方法，该方法被Spy并设置返回值为returnValue
         * 示例：
         * var fakeAnimate = testTool.spyReturn("getCurrentFrame", frame);
         * testTool.spyReturn(fakeAnimate, "getCurrentFrame", frame);
         * @param funcName
         * @param returnValue
         * @returns {{}}
         */
        spyReturn: function (funcName, returnValue) {
            var obj = null,
                _funcName = null,
                _returnValue = null;

            if (arguments.length === 2) {
                obj = {};
                _funcName = arguments[0];
                _returnValue = arguments[1];
            }
            else if (arguments.length === 3) {
                obj = arguments[0];
                _funcName = arguments[1];
                _returnValue = arguments[2];
            }

            obj[_funcName] = function () {
            };

            spyOn(obj, _funcName).andReturn(_returnValue);

            return obj;
        },
//        /**
//         * 创建一个为fakeFunc的类
//         *
//         * 示例1：
//         * fakeYYC = buildFakeObj(["Tool", "toString"], function (obj) {
//                return obj.toString();
//            });
//
//         相当于：：
//         fakeYYC = {
//                Tool: {
//                    toString: function (obj) {
//                        return obj.toString();
//                    }
//                }
//            }
//
//
//         * 示例2：
//         * fakeYYC = buildFakeObj(["Tool", ["toString", "b"]], function (obj) {
//                return obj.toString();
//            });
//
//         相当于：：
//         fakeYYC = {
//                Tool: {
//                    toString: function (obj) {
//                        return obj.toString();
//                    },
//                    b: function (obj) {
//                        return obj.toString();
//                    }
//                }
//            }
//         *
//         * 示例3：
//         *  buildFakeObj(fakeYYC, ["Tool", "toString"], function (obj) {
//                return obj.toString();
//            });
//
//         相当于：：
//         fakeYYC.Tool = {
//                    toString: function (obj) {
//                        return obj.toString();
//                    }
//                }
//         }
//
//         *
//         * @param methodArr
//         * @param fakeFunc
//         * @returns {null}
//         */
//        buildFakeObj: function () {
//            var obj = null,
//                methodArr = null,
//                fakeFunc = null,
//                lastIndex = 0,
//                top = null;
//
//            if (arguments.length === 2) {
//                obj = {};
//                methodArr = arguments[0];
//                fakeFunc = arguments[1];
//
//            }
//            else if (arguments.length === 3) {
//                obj = arguments[0];
//                methodArr = arguments[1];
//                fakeFunc = arguments[2];
//            }
//
//            top = obj;
////            lastIndex = methodArr.length - 1;
//
//            methodArr.forEach(function (method, index) {
////                if (index === lastIndex) {
//                obj[method] = fakeFunc;
////                    return;
////                }
//
////                obj[method] = obj[method] || {};
////                obj = obj[method];
//            });
//
//            return top;
//        },
        judgeSingleInstance: function (_Class) {
            it("获得单例实例", function () {
                var obj1 = _Class.getInstance();
                obj1.a = 2;

                var obj2 = _Class.getInstance();

                expect(obj2.a).toEqual(2);
            });
        }
//        buildFakeTab: function (sandbox, fakeTab) {
//            sandbox.stub(Controller, "getInstance").returns({
//                getCurrentSelectTab: sandbox.stub().returns(fakeTab)
//            });
//        }
    }
}());