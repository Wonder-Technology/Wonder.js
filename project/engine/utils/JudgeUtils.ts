module Engine3D {
    export class JudgeUtils {
        public static isArray(val) {
            return Object.prototype.toString.call(val) === "[object Array]";
        }
        public static isFunction(func) {
            return Object.prototype.toString.call(func) === "[object Function]";
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
    }
}
