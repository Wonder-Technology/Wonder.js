import { isNotUndefined, isUndefined } from "./JudgeUtils";
export var deleteVal = function (key, obj) { return obj[key] = void 0; };
export var deleteBySwap = function (sourceIndex, targetIndex, obj) {
    obj[sourceIndex] = obj[targetIndex];
    deleteVal(targetIndex, obj);
};
export var isValidMapValue = function (val) {
    return isNotUndefined(val);
};
export var isNotValidMapValue = function (val) {
    return isUndefined(val);
};
export var createMap = function () { return Object.create(null); };
//# sourceMappingURL=objectUtils.js.map