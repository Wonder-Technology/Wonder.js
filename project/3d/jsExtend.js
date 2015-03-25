/**jsExtend 扩展js对象
 * author：YYC
 * date：2014-01-01
 * email：395976266@qq.com
 * qq: 395976266
 * blog：http://www.cnblogs.com/chaogex/
 * homepage:
 * license: MIT
 */
(function () {
    var global = this;

    function _isArray(val) {
        return Object.prototype.toString.call(val) === "[object Array]";
    }

    function _isFunction(func) {
        return Object.prototype.toString.call(func) === "[object Function]";
    }

    /*!
     扩展String对象
    */
    (function(){
        String.prototype.contain = function (str) {
            return this.indexOf(str) >= 0
        };

        String.prototype.containIgnoreCase = function (str) {
            return this.toLowerCase().indexOf(str.toLowerCase()) >= 0;
        };

        String.prototype.trim = function () {
            return this.replace(/^\s*/g, "").replace(/\s*$/g, "");
        };
    }());

    /*!
     扩展Array对象
     */
    (function(){
        global.$break = {};

        Array.prototype.forEach = function (fn, context) {
            var scope = context || global;

            for (var i = 0, j = this.length; i < j; ++i) {
                if (fn.call(scope, this[i], i) === $break) {
                    break;
                }
            }
        };

        Array.prototype.filter = function (fn, context) {
            var scope = context || global,
                self = this,
                a = [];

            this.forEach(function (value, index) {
                if (!fn.call(scope, value, index, self)) {
                    return;
                }
                a.push(value);
            });

            return a;
        };

        /**
         * 如果数组中不存在该元素，则push到数组末尾；否则不加入。
         * obj为单个元素，该方法参数只能有一个。
         */
        Array.prototype.pushNoRepeat = function (obj) {
            if (!this.contain(function (value, index) {
                if (value === obj) {
                    return true;
                }
                else {
                    return false;
                }
            })) {
                this.push(obj);
            }
        };

        Array.prototype.removeChild = function (func) {
            var self = this,
                index = null;

            index = this.indexOf(function (e, index) {
                return !!func.call(self, e);
            });

            if (index !== null && index !== -1) {
                this.splice(index, 1);
                return true;
            }
            return false;
        };

        Array.prototype.map = function (func, valueArr) {
            if (valueArr && !_isArray(valueArr)) {
                throw new Error("参数必须为数组");
            }

            this.forEach(function (e) {
                e && e[func] && e[func].apply(e, valueArr);
            })
        };

        /**
         * 判断数组是否包含元素。
         */
        Array.prototype.contain = function (arg) {
            var result = false;

            if (_isFunction(arg)) {
                this.forEach(function (value, index) {
                    if (!!arg.call(null, value, index)) {
                        result = true;
                        return $break;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }
            else {
                this.forEach(function (value, index) {
                    if (arg === value || (value.contain && value.contain(arg))) {
                        result = true;
                        return $break;   //如果包含，则置返回值为true,跳出循环
                    }
                });
            }

            return result;
        };
        /**
         * 返回满足条件的元素的位置。
         * 如果找不到满足条件的元素，则返回-1。
         */
        Array.prototype.indexOf = function (iterator) {
            var result = -1,
                isFind = null;

            this.forEach(function (value, index) {
                isFind = iterator.call(null, value, index);
                if (isFind) {
                    result = index;
                    return $break;
                }
            });

            return result;
        };
    }());
})();