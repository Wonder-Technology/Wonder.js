import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
export var getMatrix3DataSize = function () { return 9; };
export var getMatrix4DataSize = function () { return 16; };
export var getVector3DataSize = function () { return 3; };
export var getQuaternionDataSize = function () { return 4; };
export var getSlice = function (typeArr, startIndex, endIndex) {
    return typeArr.slice(startIndex, endIndex);
};
export var getSubarray = function (typeArr, startIndex, endIndex) {
    return typeArr.subarray(startIndex, endIndex);
};
export var deleteBySwapAndNotReset = function (sourceIndex, targetIndex, typeArr) {
    typeArr[sourceIndex] = typeArr[targetIndex];
};
export var deleteBySwapAndReset = function (sourceIndex, targetIndex, typeArr, length, defaultValueArr) {
    for (var i = 0; i < length; i++) {
        typeArr[sourceIndex + i] = typeArr[targetIndex + i];
        typeArr[targetIndex + i] = defaultValueArr[i];
    }
};
export var deleteSingleValueBySwapAndReset = function (sourceIndex, lastIndex, typeArr, resetValue) {
    typeArr[sourceIndex] = typeArr[lastIndex];
    typeArr[lastIndex] = resetValue;
};
export var deleteOneItemBySwapAndReset = function (sourceIndex, targetIndex, typeArr, defaultValue) {
    typeArr[sourceIndex] = typeArr[targetIndex];
    typeArr[targetIndex] = defaultValue;
};
export var set = function (typeArr, valArr, offset) {
    if (offset === void 0) { offset = 0; }
    typeArr.set(valArr, offset);
};
export var setMatrices3 = function (typeArr, mat, index) {
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
};
export var setMatrices = function (typeArr, mat, index) {
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
export var setMatrix4ByIndex = requireCheckFunc(function (mat, typeArr, index) {
    it("should not exceed type arr's length", function () {
        expect(index + 15).lte(typeArr.length - 1);
    });
}, function (mat, typeArr, index) {
    mat.set(typeArr[index], typeArr[index + 1], typeArr[index + 2], typeArr[index + 3], typeArr[index + 4], typeArr[index + 5], typeArr[index + 6], typeArr[index + 7], typeArr[index + 8], typeArr[index + 9], typeArr[index + 10], typeArr[index + 11], typeArr[index + 12], typeArr[index + 13], typeArr[index + 14], typeArr[index + 15]);
    return mat;
});
export var setVectors = function (typeArr, vec, index) {
    var values = vec.values;
    typeArr[index] = values[0];
    typeArr[index + 1] = values[1];
    typeArr[index + 2] = values[2];
};
export var setVector3ByIndex = requireCheckFunc(function (vec, typeArr, index) {
    it("should not exceed type arr's length", function () {
        expect(index + 2).lte(typeArr.length - 1);
    });
}, function (vec, typeArr, index) {
    var values = vec.values;
    values[0] = typeArr[index];
    values[1] = typeArr[index + 1];
    values[2] = typeArr[index + 2];
    return vec;
});
export var setQuaternions = function (typeArr, qua, index) {
    typeArr[index] = qua.x;
    typeArr[index + 1] = qua.y;
    typeArr[index + 2] = qua.z;
    typeArr[index + 3] = qua.z;
};
export var setQuaternionByIndex = requireCheckFunc(function (qua, typeArr, index) {
    it("should not exceed type arr's length", function () {
        expect(index + 3).lte(typeArr.length - 1);
    });
}, function (qua, typeArr, index) {
    qua.set(typeArr[index], typeArr[index + 1], typeArr[index + 2], typeArr[index + 3]);
    return qua;
});
export var swap = function (typeArr, index1, index2, length) {
    for (var i = 0; i < length; i++) {
        var newIndex1 = index1 + i, newIndex2 = index2 + i, temp = typeArr[newIndex2];
        typeArr[newIndex2] = typeArr[newIndex1];
        typeArr[newIndex1] = temp;
    }
};
export var createMatrix4ByIndex = function (mat, typeArr, index) {
    return setMatrix4ByIndex(mat, typeArr, index);
};
export var createVector3ByIndex = function (vec, typeArr, index) {
    return setVector3ByIndex(vec, typeArr, index);
};
export var fillTypeArr = requireCheckFunc(function (typeArr, dataArr, startIndex, count) {
    it("should not exceed type arr's length", function () {
        expect(count + startIndex).lte(typeArr.length);
    });
}, function (typeArr, dataArr, startIndex, count) {
    typeArr.set(dataArr, startIndex);
});
export var setTypeArrayValue = requireCheckFunc(function (typeArr, index, value) {
    it("should not exceed type arr's length", function () {
        expect(index).lte(typeArr.length - 1);
    });
}, function (typeArr, index, value) {
    typeArr[index] = value;
});
export var setSingleValue = function (typeArr, index, value) {
    var size = 1, i = index * size;
    setTypeArrayValue(typeArr, i, value);
};
export var computeBufferLength = function (count, size) { return count * size; };
//# sourceMappingURL=typeArrayUtils.js.map