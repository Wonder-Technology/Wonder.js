"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorDataSize = function () { return 3; };
exports.getDirtyDataSize = function () { return 1; };
exports.isDirty = function (value) { return value === 0; };
exports.cleanDirty = function (index, isDirtys) {
    isDirtys[index] = 1;
};
//# sourceMappingURL=specifyLightUtils.js.map