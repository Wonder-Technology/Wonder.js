"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
exports.createState = function () {
    return immutable_1.Map();
};
exports.isValueExist = function (val) {
    return val !== void 0;
};
//# sourceMappingURL=stateUtils.js.map