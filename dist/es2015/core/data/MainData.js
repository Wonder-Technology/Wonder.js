import { Main } from "wonder-frp/dist/es2015/core/Main";
var MainData = (function () {
    function MainData() {
    }
    Object.defineProperty(MainData, "isTest", {
        get: function () {
            return this._isTest;
        },
        set: function (isTest) {
            this._isTest = isTest;
            Main.isTest = MainData.isTest;
        },
        enumerable: true,
        configurable: true
    });
    return MainData;
}());
export { MainData };
MainData._isTest = false;
MainData.screenSize = null;
//# sourceMappingURL=MainData.js.map