"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wdCb = require("wdcb");
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
module.exports = (function (_super) {
    __extends(JudgeUtils, _super);
    function JudgeUtils() {
        return _super.apply(this, arguments) || this;
    }
    JudgeUtils.isArray = function (arr) {
        var length = arr && arr.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    JudgeUtils.isArrayExactly = function (arr) {
        return Object.prototype.toString.call(arr) === "[object Array]";
    };
    return JudgeUtils;
}(wdCb.JudgeUtils));
