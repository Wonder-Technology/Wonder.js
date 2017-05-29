"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var flowRight_1 = require("wonder-lodash/flowRight");
var arrayUtils_1 = require("./arrayUtils");
exports.compose = flowRight_1.default;
exports.chain = curry_1.default(function (f, m) {
    return m.chain(f);
});
exports.map = curry_1.default(function (f, m) {
    return m.map(f);
});
exports.filterArray = curry_1.default(function (f, arr) {
    return arrayUtils_1.filter(arr, f);
});
exports.forEachArray = curry_1.default(function (f, arr) {
    return arrayUtils_1.forEach(arr, f);
});
//# sourceMappingURL=functionalUtils.js.map