/**
 * 判断类型
 */
module.exports = (function () {
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
        ///**
        // * 判断是否为jQuery对象
        // */
        //isjQuery: function (ob) {
        //    if (!global.jQuery) {
        //        return false;
        //    }
        //
        //    return ob instanceof global.jQuery;
        //},
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

