"use strict";
module.exports = (function () {
    function DataUtils() {
    }
    DataUtils.removeNullData = function (targetJson) {
        for (var key in targetJson.meshes) {
            if (targetJson.meshes.hasOwnProperty(key)) {
                var mesh = targetJson.meshes[key];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    this._removeFieldWhoseDataAreAllNull(primitiveData, "indices");
                    for (var key_1 in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key_1)) {
                            this._removeFieldWhoseDataAreAllNull(primitiveData.attributes, key_1);
                        }
                    }
                }
            }
        }
    };
    DataUtils._removeFieldWhoseDataAreAllNull = function (data, fieldName) {
        if (!data[fieldName]) {
            return;
        }
        if (data[fieldName].filter(function (value) {
            return value !== null && value !== void 0;
        }).length === 0) {
            delete data[fieldName];
        }
    };
    return DataUtils;
}());
