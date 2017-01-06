"use strict";
var JudgeUtils = require("../../../ts/JudgeUtils");
var Utils = (function () {
    function Utils() {
    }
    Utils.hasData = function (data) {
        return data && data.length > 0;
    };
    Utils.isArrayEmpty = function (data) {
        return JudgeUtils.isArrayExactly(data) && data.length === 0;
    };
    return Utils;
}());
exports.Utils = Utils;
