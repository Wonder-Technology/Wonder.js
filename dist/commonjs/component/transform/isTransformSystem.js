"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
exports.getIsTranslate = function (uid, ThreeDTransformData) {
    return ThreeDTransformData.isTranslateMap[uid];
};
exports.setIsTranslate = contract_1.requireCheckFunc(function (uid, isTranslate, ThreeDTransformData) {
}, function (uid, isTranslate, ThreeDTransformData) {
    ThreeDTransformData.isTranslateMap[uid] = isTranslate;
});
exports.isTranslate = function (data) {
    return !!data.position || !!data.localPosition;
};
//# sourceMappingURL=isTransformSystem.js.map