module dyCb {
    export class JudgeUtils {
        public static isArray(val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        }

        public static isFunction(func) {
            return Object.prototype.toString.call(func) === "[object Function]";
        }

        public static isNumber(obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        }

        public static isString(str) {
            return Object.prototype.toString.call(str) === "[object String]";
        }

        public static isBoolean(obj) {
            return Object.prototype.toString.call(obj) === "[object Boolean]";
        }

        public static isDom(obj) {
            return obj instanceof HTMLElement;
        }

        /**
         * 判断是否为对象字面量（{}）
         */
        public static isDirectObject(obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return true;
            }

            return false;
        }

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
        public static isHostMethod(object, property) {
            var type = typeof object[property];

            return type === "function" ||
                (type === "object" && !!object[property]) ||
                type === "unknown";
        }
    }
}
