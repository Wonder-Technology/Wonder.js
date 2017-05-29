"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1 = require("./JudgeUtils");
exports.deleteVal = function (key, arr) { return arr[key] = void 0; };
exports.isNotValidVal = function (val) { return JudgeUtils_1.isUndefined(val); };
exports.deleteBySwap = function (index, array) {
    var last = array.length - 1, temp = null;
    if (last === -1) {
        return null;
    }
    temp = array[last];
    array[last] = array[index];
    array[index] = temp;
    array.pop();
};
exports.hasDuplicateItems = function (arr) {
    var noRepeatArr = [], hasRepeat = false;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        if (!item) {
            continue;
        }
        if (_contain(noRepeatArr, item)) {
            hasRepeat = true;
            break;
        }
        noRepeatArr.push(item);
    }
    return hasRepeat;
};
var _contain = function (arr, item) {
    var c = null;
    for (var i = 0, len = arr.length; i < len; i++) {
        c = arr[i];
        if (item === c) {
            return true;
        }
    }
    return false;
};
exports.removeDuplicateItems = function (arr) {
    var resultArr = [];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var ele = arr_2[_i];
        if (_contain(resultArr, ele)) {
            continue;
        }
        resultArr.push(ele);
    }
    ;
    return resultArr;
};
exports.removeItem = function (arr, item) {
    return exports.filter(arr, function (ele) {
        return ele !== item;
    });
};
exports.filter = function (arr, func) {
    var result = [];
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var ele = arr_3[_i];
        if (func(ele)) {
            result.push(ele);
        }
    }
    return result;
};
exports.forEach = function (arr, func) {
    for (var i = 0, len = arr.length; i < len; i++) {
        func(arr[i], i);
    }
};
//# sourceMappingURL=arrayUtils.js.map