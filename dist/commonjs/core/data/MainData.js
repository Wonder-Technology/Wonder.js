"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("wonder-frp/dist/commonjs/core/Main");
var MainData = (function () {
    function MainData() {
    }
    Object.defineProperty(MainData, "isTest", {
        get: function () {
            return this._isTest;
        },
        set: function (isTest) {
            this._isTest = isTest;
            Main_1.Main.isTest = MainData.isTest;
        },
        enumerable: true,
        configurable: true
    });
    return MainData;
}());
MainData._isTest = false;
MainData.screenSize = null;
exports.MainData = MainData;
//# sourceMappingURL=MainData.js.map