var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { requireCheck } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
var _setValue = function (dataArr, increment, startIndex, target) {
    dataArr[startIndex + increment] = target;
};
var DataUtils = (function () {
    function DataUtils() {
    }
    DataUtils.setMatrices = function (dataArr, mat, index) {
        var values = mat.values;
        for (var i = 0; i <= 15; i++) {
            _setValue(dataArr, i, index, values[i]);
        }
    };
    DataUtils.setMatrix4ByIndex = function (mat, dataArr, index) {
        mat.set(dataArr[index], dataArr[index + 1], dataArr[index + 2], dataArr[index + 3], dataArr[index + 4], dataArr[index + 5], dataArr[index + 6], dataArr[index + 7], dataArr[index + 8], dataArr[index + 9], dataArr[index + 10], dataArr[index + 11], dataArr[index + 12], dataArr[index + 13], dataArr[index + 14], dataArr[index + 15]);
        return mat;
    };
    DataUtils.setVectors = function (dataArr, vec, index) {
        var values = vec.values;
        for (var i = 0; i <= 2; i++) {
            _setValue(dataArr, i, index, values[i]);
        }
    };
    DataUtils.setVector3ByIndex = function (vec, dataArr, index) {
        vec.set(dataArr[index], dataArr[index + 1], dataArr[index + 2]);
        return vec;
    };
    DataUtils.setQuaternions = function (dataArr, qua, index) {
        _setValue(dataArr, 0, index, qua.x);
        _setValue(dataArr, 1, index, qua.y);
        _setValue(dataArr, 2, index, qua.z);
        _setValue(dataArr, 3, index, qua.w);
    };
    DataUtils.setQuaternionByIndex = function (qua, dataArr, index) {
        qua.set(dataArr[index], dataArr[index + 1], dataArr[index + 2], dataArr[index + 3]);
        return qua;
    };
    DataUtils.swap = function (dataArr, index1, index2, length) {
        for (var i = 0; i < length; i++) {
            var newIndex1 = index1 + i, newIndex2 = index2 + i, temp = dataArr[newIndex2];
            dataArr[newIndex2] = dataArr[newIndex1];
            dataArr[newIndex1] = temp;
        }
    };
    DataUtils.createMatrix4ByIndex = function (mat, dataArr, index) {
        return this.setMatrix4ByIndex(mat, dataArr, index);
    };
    DataUtils.createVector3ByIndex = function (vec, dataArr, index) {
        return this.setVector3ByIndex(vec, dataArr, index);
    };
    DataUtils.createQuaternionByIndex = function (qua, dataArr, index) {
        return this.setQuaternionByIndex(qua, dataArr, index);
    };
    DataUtils.removeItemInArray = function (arr, index) {
        arr[index] = void 0;
    };
    DataUtils.removeSingleItemInTypeArray = function (dataArr, index, resetValFunc) {
        resetValFunc(dataArr, index).run();
    };
    DataUtils.removeTypeArrayItemBySwap = function (dataArr, index, swapItemIndex, length) {
        for (var i = 0; i < length; i++) {
            dataArr[index + i] = dataArr[swapItemIndex + i];
        }
    };
    return DataUtils;
}());
export { DataUtils };
__decorate([
    requireCheck(function (dataArr, index, swapItemIndex, length) {
        it("index should <= swapItemIndex", function () {
            expect(index).lte(swapItemIndex);
        });
    })
], DataUtils, "removeTypeArrayItemBySwap", null);
//# sourceMappingURL=DataUtils.js.map