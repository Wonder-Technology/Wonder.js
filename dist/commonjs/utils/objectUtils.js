"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1 = require("./JudgeUtils");
exports.deleteVal = function (key, obj) { return obj[key] = void 0; };
exports.deleteBySwap = function (sourceIndex, targetIndex, obj) {
    obj[sourceIndex] = obj[targetIndex];
    exports.deleteVal(targetIndex, obj);
};
exports.isValidMapValue = function (val) {
    return JudgeUtils_1.isNotUndefined(val);
};
exports.isNotValidMapValue = function (val) {
    return JudgeUtils_1.isUndefined(val);
};
exports.createMap = function () { return Object.create(null); };
//# sourceMappingURL=objectUtils.js.map