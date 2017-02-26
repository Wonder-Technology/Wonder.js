"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var SortUtils = (function () {
    function SortUtils() {
    }
    SortUtils.insertSort = function (targetArr, compareFunc, isChangeSelf) {
        if (isChangeSelf === void 0) { isChangeSelf = false; }
        var resultArr = isChangeSelf ? targetArr : ExtendUtils_1.ExtendUtils.extend([], targetArr);
        for (var i = 1, len = resultArr.length; i < len; i++) {
            for (var j = i; j > 0 && compareFunc(resultArr[j], resultArr[j - 1]); j--) {
                this._swap(resultArr, j - 1, j);
            }
        }
        return resultArr;
    };
    SortUtils.quickSort = function (targetArr, compareFunc, isChangeSelf) {
        if (isChangeSelf === void 0) { isChangeSelf = false; }
        var resultArr = isChangeSelf ? targetArr : ExtendUtils_1.ExtendUtils.extend([], targetArr);
        var sort = function (l, r) {
            if (l >= r) {
                return;
            }
            var i = l, j = r, x = resultArr[l];
            while (i < j) {
                while (i < j && compareFunc(x, resultArr[j])) {
                    j--;
                }
                if (i < j) {
                    resultArr[i++] = resultArr[j];
                }
                while (i < j && compareFunc(resultArr[i], x)) {
                    i++;
                }
                if (i < j) {
                    resultArr[j--] = resultArr[i];
                }
            }
            resultArr[i] = x;
            sort(l, i - 1);
            sort(i + 1, r);
        };
        sort(0, resultArr.length - 1);
        return resultArr;
    };
    SortUtils._swap = function (children, i, j) {
        var t = null;
        t = children[i];
        children[i] = children[j];
        children[j] = t;
    };
    return SortUtils;
}());
SortUtils = __decorate([
    registerClass_1.registerClass("SortUtils")
], SortUtils);
exports.SortUtils = SortUtils;
//# sourceMappingURL=SortUtils.js.map