import { isUndefined } from "./JudgeUtils";
export var deleteVal = function (key, arr) { return arr[key] = void 0; };
export var isNotValidVal = function (val) { return isUndefined(val); };
export var deleteBySwap = function (index, array) {
    var last = array.length - 1, temp = null;
    if (last === -1) {
        return null;
    }
    temp = array[last];
    array[last] = array[index];
    array[index] = temp;
    array.pop();
};
export var hasDuplicateItems = function (arr) {
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
export var removeDuplicateItems = function (arr) {
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
export var removeItem = function (arr, item) {
    return filter(arr, function (ele) {
        return ele !== item;
    });
};
export var filter = function (arr, func) {
    var result = [];
    for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
        var ele = arr_3[_i];
        if (func(ele)) {
            result.push(ele);
        }
    }
    return result;
};
export var forEach = function (arr, func) {
    for (var i = 0, len = arr.length; i < len; i++) {
        func(arr[i], i);
    }
};
//# sourceMappingURL=arrayUtils.js.map