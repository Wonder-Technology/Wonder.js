var YYC = require("../../test/helper/yTool");

module.exports = (function () {
    return {
        getValues: function (values, digit) {
            var len = 0,
                i = 0,
                result = [];

            len = values.length;

            if(digit <= 0){
                for (i = 0; i < len; i++) {
                    result[i] = Math.round(values[i]);

                    if (result[i] === -0) {
                        result[i] = 0;
                    }
                }

                return result;
            }

            for (i = 0; i < len; i++) {
                result[i] = YYC.math.toFixed(values[i], digit === undefined ? 7 : digit);
                if (result[i] === -0) {
                    result[i] = 0;
                }
            }
            return result;
        },
        toFixed: function(num, digit){
            return YYC.math.toFixed(num, digit === undefined ? 7 : digit);
        },
        isFloat32Array: function(val){
            return Object.prototype.toString.call(val) === "[object Float32Array]";
        },
        isUint16Array: function(val){
            return Object.prototype.toString.call(val) === "[object Uint16Array]";
        },
        isUint8Array: function(val){
            return Object.prototype.toString.call(val) === "[object Uint8Array]";
        },

        isArray: function(val){
            return Object.prototype.toString.call(val) === "[object Array]";
        }
    }
}());
