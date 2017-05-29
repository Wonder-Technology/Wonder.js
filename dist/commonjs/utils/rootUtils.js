"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Variable_1 = require("../definition/Variable");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
exports.getRootProperty = function (propertyName) {
    return IO_1.IO.of(function () {
        return Variable_1.root[propertyName];
    });
};
//# sourceMappingURL=rootUtils.js.map