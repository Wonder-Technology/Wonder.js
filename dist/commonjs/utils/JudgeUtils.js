"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var JudgeUtils_1 = require("wonder-commonlib/dist/commonjs/utils/JudgeUtils");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var JudgeUtils = (function (_super) {
    __extends(JudgeUtils, _super);
    function JudgeUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JudgeUtils.isCollection = function (list) {
        return list instanceof Collection_1.Collection;
    };
    return JudgeUtils;
}(JudgeUtils_1.JudgeUtils));
exports.JudgeUtils = JudgeUtils;
exports.isUndefined = function (v) { return v === void 0; };
exports.isNotUndefined = function (v) { return v !== void 0; };
//# sourceMappingURL=JudgeUtils.js.map