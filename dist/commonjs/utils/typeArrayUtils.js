"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.getMatrix4DataSize = function () { return 16; };
exports.getVector3DataSize = function () { return 3; };
exports.getQuaternionDataSize = function () { return 4; };
exports.getSlice = function (typeArr, startIndex, endIndex) {
    return typeArr.slice(startIndex, endIndex);
};
exports.getSubarray = function (typeArr, startIndex, endIndex) {
    return typeArr.subarray(startIndex, endIndex);
};
exports.deleteBySwapAndNotReset = function (sourceIndex, targetIndex, typeArr) {
    typeArr[sourceIndex] = typeArr[targetIndex];
};
exports.deleteBySwapAndReset = function (sourceIndex, targetIndex, typeArr, length, defaultValueArr) {
    for (var i = 0; i < length; i++) {
        typeArr[sourceIndex + i] = typeArr[targetIndex + i];
        typeArr[targetIndex + i] = defaultValueArr[i];
    }
};
exports.deleteOneItemBySwapAndReset = function (sourceIndex, targetIndex, typeArr, defaultValue) {
    typeArr[sourceIndex] = typeArr[targetIndex];
    typeArr[targetIndex] = defaultValue;
};
exports.set = function (typeArr, valArr, offset) {
    if (offset === void 0) { offset = 0; }
    typeArr.set(valArr, offset);
};
exports.setMatrices = function (typeArr, mat, index) {
    var values = mat.values;
    typeArr[index] = values[0];
    typeArr[index + 1] = values[1];
    typeArr[index + 2] = values[2];
    typeArr[index + 3] = values[3];
    typeArr[index + 4] = values[4];
    typeArr[index + 5] = values[5];
    typeArr[index + 6] = values[6];
    typeArr[index + 7] = values[7];
    typeArr[index + 8] = values[8];
    typeArr[index + 9] = values[9];
    typeArr[index + 10] = values[10];
    typeArr[index + 11] = values[11];
    typeArr[index + 12] = values[12];
    typeArr[index + 13] = values[13];
    typeArr[index + 14] = values[14];
    typeArr[index + 15] = values[15];
};
exports.setMatrix4ByIndex = contract_1.requireCheckFunc(function (mat, typeArr, index) {
    contract_1.it("should not exceed type arr's length", function () {
        wonder_expect_js_1.expect(index + 15).lte(typeArr.length - 1);
    });
}, function (mat, typeArr, index) {
    mat.set(typeArr[index], typeArr[index + 1], typeArr[index + 2], typeArr[index + 3], typeArr[index + 4], typeArr[index + 5], typeArr[index + 6], typeArr[index + 7], typeArr[index + 8], typeArr[index + 9], typeArr[index + 10], typeArr[index + 11], typeArr[index + 12], typeArr[index + 13], typeArr[index + 14], typeArr[index + 15]);
    return mat;
});
exports.setVectors = function (typeArr, vec, index) {
    var values = vec.values;
    typeArr[index] = values[0];
    typeArr[index + 1] = values[1];
    typeArr[index + 2] = values[2];
};
exports.setVector3ByIndex = contract_1.requireCheckFunc(function (vec, typeArr, index) {
    contract_1.it("should not exceed type arr's length", function () {
        wonder_expect_js_1.expect(index + 2).lte(typeArr.length - 1);
    });
}, function (vec, typeArr, index) {
    var values = vec.values;
    values[0] = typeArr[index];
    values[1] = typeArr[index + 1];
    values[2] = typeArr[index + 2];
    return vec;
});
exports.setQuaternions = function (typeArr, qua, index) {
    typeArr[index] = qua.x;
    typeArr[index + 1] = qua.y;
    typeArr[index + 2] = qua.z;
    typeArr[index + 3] = qua.z;
};
exports.setQuaternionByIndex = contract_1.requireCheckFunc(function (qua, typeArr, index) {
    contract_1.it("should not exceed type arr's length", function () {
        wonder_expect_js_1.expect(index + 3).lte(typeArr.length - 1);
    });
}, function (qua, typeArr, index) {
    qua.set(typeArr[index], typeArr[index + 1], typeArr[index + 2], typeArr[index + 3]);
    return qua;
});
exports.swap = function (typeArr, index1, index2, length) {
    for (var i = 0; i < length; i++) {
        var newIndex1 = index1 + i, newIndex2 = index2 + i, temp = typeArr[newIndex2];
        typeArr[newIndex2] = typeArr[newIndex1];
        typeArr[newIndex1] = temp;
    }
};
exports.createMatrix4ByIndex = function (mat, typeArr, index) {
    return exports.setMatrix4ByIndex(mat, typeArr, index);
};
exports.createVector3ByIndex = function (vec, typeArr, index) {
    return exports.setVector3ByIndex(vec, typeArr, index);
};
//# sourceMappingURL=typeArrayUtils.js.map