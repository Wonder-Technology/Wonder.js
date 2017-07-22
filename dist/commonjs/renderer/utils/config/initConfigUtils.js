"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
exports.getIsTest = function (InitConfigDataFromSystem) {
    return InitConfigDataFromSystem.isTest;
};
exports.setIsTest = function (isTest, InitConfigDataFromSystem) {
    return IO_1.IO.of(function () {
        InitConfigDataFromSystem.isTest = isTest;
    });
};
//# sourceMappingURL=initConfigUtils.js.map