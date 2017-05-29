"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
exports.trace = curry_1.default(function (tag, x) {
    try {
        console.log("log:" + tag + ": " + x);
    }
    catch (e) {
        console.trace("tag:" + tag + "; message:" + e.message);
        throw e;
    }
    return x;
});
//# sourceMappingURL=debugUtils.js.map