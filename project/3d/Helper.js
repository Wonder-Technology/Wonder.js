var Engine3D;
(function (Engine3D) {
    var Tool = (function () {
        function Tool() {
        }
        /**
         * 判断是否为对象字面量（{}）
         */
        Tool.isDirectObject = function (obj) {
            if (Object.prototype.toString.call(obj) === "[object Object]") {
                return true;
            }
            return false;
        };
        Tool.isNumber = function (obj) {
            return Object.prototype.toString.call(obj) === "[object Number]";
        };
        //用于测试
        //public static getValues_forTest():number[];
        Tool.getValues_forTest = function (values) {
            //public static getValues_forTest(): number[]{
            //    var values = null,
            var len = 0, i = 0, result = [];
            //if(arguments[0]){
            //    values = arguments[0];
            //}
            //else{
            //    values = this.values;
            //}
            len = values.length;
            for (i = 0; i < len; i++) {
                if (values[i] === -0) {
                    result[i] = 0;
                    continue;
                }
                result[i] = YYC.Tool.math.toFixed(values[i], 7);
            }
            return result;
        };
        return Tool;
    })();
    Engine3D.Tool = Tool;
})(Engine3D || (Engine3D = {}));
//# sourceMappingURL=Helper.js.map