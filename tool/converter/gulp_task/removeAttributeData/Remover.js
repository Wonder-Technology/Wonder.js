"use strict";
var Remover = (function () {
    function Remover() {
    }
    Remover.create = function () {
        var obj = new this();
        return obj;
    };
    Remover.prototype.remove = function (sourceJson, isRemoveNormalData, isRemoveColorData) {
        for (var key in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(key)) {
                var mesh = sourceJson.meshes[key];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    var attributes = primitiveData.attributes;
                    if (isRemoveNormalData) {
                        delete attributes.NORMAL;
                        delete primitiveData.normalIndices;
                    }
                    if (isRemoveColorData) {
                        delete attributes.COLOR;
                        delete primitiveData.colorIndices;
                    }
                }
            }
        }
        return sourceJson;
    };
    return Remover;
}());
exports.Remover = Remover;
