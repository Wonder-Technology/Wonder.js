var mathTestUtils = (function () {
    var Matrix4 = wd.Matrix4;

    return {
        getValues: function (values, digit) {
            var len = 0,
                i = 0,
                result = [];

            len = values.length;

            for (i = 0; i < len; i++) {
                result[i] = YYC.Tool.math.toFixed(values[i], digit === undefined ? 7 : digit);
                if (result[i] === -0) {
                    result[i] = 0;
                }
            }
            return result;
        },
        toFixed: function(num){
            return YYC.Tool.math.toFixed(num, 7);
        },
        isFloat32Array: function(val){
            return Object.prototype.toString.call(val) === "[object Float32Array]";
        },
        isUint16Array: function(val){
            return Object.prototype.toString.call(val) === "[object Uint16Array]";
        },

        isArray: function(val){
            return Object.prototype.toString.call(val) === "[object Array]";
        },
        isMatrix: function(val){
            return val instanceof Matrix4;
        },
        isMatrixEqual: function(mat1, target){
            if(this.isFloat32Array(target)){
                return expect(this.getValues(mat1.values)).toEqual(this.getValues(target));
            }
            else if(this.isMatrix(target)){
                return expect(this.getValues(mat1.values)).toEqual(this.getValues(target.values));
            }
        }
    }
}());

