"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var MainSystem_1 = require("./MainSystem");
var CompileConfig_1 = require("../config/CompileConfig");
var DirectorData_1 = require("./DirectorData");
var DirectorSystem_1 = require("./DirectorSystem");
var contract_1 = require("../definition/typescript/decorator/contract");
var MainData_1 = require("./MainData");
var wonder_expect_js_1 = require("wonder-expect.js");
var DeviceManagerData_1 = require("../device/DeviceManagerData");
var Main = (function () {
    function Main() {
    }
    Object.defineProperty(Main, "isTest", {
        get: function () {
            return MainSystem_1.getIsTest(MainData_1.MainData);
        },
        set: function (isTest) {
            MainSystem_1.setIsTest(isTest, MainData_1.MainData).run();
            MainSystem_1.setLibIsTest(isTest).run();
        },
        enumerable: true,
        configurable: true
    });
    Main.setConfig = function (configState) {
        this._configState = MainSystem_1.setConfig(CompileConfig_1.CompileConfig.closeContractTest, MainData_1.MainData, configState).run();
        DirectorSystem_1.setState(DirectorSystem_1.getState(DirectorData_1.DirectorData).set("Main", this._configState.get("Main")), DirectorData_1.DirectorData).run();
        return this;
    };
    Main.init = function () {
        DirectorSystem_1.setState(MainSystem_1.init(DirectorSystem_1.getState(DirectorData_1.DirectorData), this._configState.get("config"), DeviceManagerData_1.DeviceManagerData).run(), DirectorData_1.DirectorData).run();
        return this;
    };
    return Main;
}());
Main._configState = null;
__decorate([
    contract_1.requireCheck(function () {
        contract_1.it("configState should exist", function () {
            wonder_expect_js_1.expect(Main._configState).exist;
        });
    })
], Main, "init", null);
exports.Main = Main;
//# sourceMappingURL=Main.js.map