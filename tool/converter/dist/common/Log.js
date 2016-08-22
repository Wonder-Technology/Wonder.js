"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wdCb = require("wdcb");
module.exports = (function (_super) {
    __extends(Log, _super);
    function Log() {
        _super.apply(this, arguments);
    }
    Log.log = function () {
        var messages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            messages[_i - 0] = arguments[_i];
        }
        console.log.apply(console, messages);
    };
    return Log;
}(wdCb.Log));
