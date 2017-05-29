var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getIsTest, init, setConfig, setIsTest, setLibIsTest } from "./MainSystem";
import { CompileConfig } from "../config/CompileConfig";
import { DirectorData } from "./DirectorData";
import { getState, setState } from "./DirectorSystem";
import { it, requireCheck } from "../definition/typescript/decorator/contract";
import { MainData } from "./MainData";
import { expect } from "wonder-expect.js";
import { DeviceManagerData } from "../device/DeviceManagerData";
var Main = (function () {
    function Main() {
    }
    Object.defineProperty(Main, "isTest", {
        get: function () {
            return getIsTest(MainData);
        },
        set: function (isTest) {
            setIsTest(isTest, MainData).run();
            setLibIsTest(isTest).run();
        },
        enumerable: true,
        configurable: true
    });
    Main.setConfig = function (configState) {
        this._configState = setConfig(CompileConfig.closeContractTest, MainData, configState).run();
        setState(getState(DirectorData).set("Main", this._configState.get("Main")), DirectorData).run();
        return this;
    };
    Main.init = function () {
        setState(init(getState(DirectorData), this._configState.get("config"), DeviceManagerData).run(), DirectorData).run();
        return this;
    };
    return Main;
}());
export { Main };
Main._configState = null;
__decorate([
    requireCheck(function () {
        it("configState should exist", function () {
            expect(Main._configState).exist;
        });
    })
], Main, "init", null);
//# sourceMappingURL=Main.js.map