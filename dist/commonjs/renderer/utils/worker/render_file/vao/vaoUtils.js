"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("../../../../../utils/objectUtils");
var arrayUtils_1 = require("../../../../../utils/arrayUtils");
exports.removeVao = function (gl, index, vaoMap, vboArrayMap) {
    var vboArray = vboArrayMap[index];
    objectUtils_1.deleteVal(index, vaoMap);
    objectUtils_1.deleteVal(index, vboArrayMap);
    if (arrayUtils_1.isNotValidVal(vboArray)) {
        return;
    }
    for (var _i = 0, vboArray_1 = vboArray; _i < vboArray_1.length; _i++) {
        var vbo = vboArray_1[_i];
        gl.deleteBuffer(vbo);
    }
};
exports.initData = function (VaoDataFromSystem) {
    VaoDataFromSystem.vaoMap = objectUtils_1.createMap();
    VaoDataFromSystem.vboArrayMap = objectUtils_1.createMap();
};
//# sourceMappingURL=vaoUtils.js.map