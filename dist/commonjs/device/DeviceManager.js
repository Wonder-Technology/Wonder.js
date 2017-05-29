"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var singleton_1 = require("../definition/typescript/decorator/singleton");
var DeviceManagerSystem_1 = require("./DeviceManagerSystem");
var View_1 = require("../structure/View");
var DirectorSystem_1 = require("../core/DirectorSystem");
var DirectorData_1 = require("../core/DirectorData");
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ViewSystem_1 = require("../structure/ViewSystem");
var immutable_1 = require("immutable");
var DeviceManagerData_1 = require("./DeviceManagerData");
var DeviceManager = (function () {
    function DeviceManager() {
        this.view = View_1.View.create();
    }
    DeviceManager.getInstance = function () { };
    Object.defineProperty(DeviceManager.prototype, "gl", {
        get: function () {
            return DeviceManagerSystem_1.getGL(DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DeviceManager.prototype, "viewport", {
        get: function () {
            return DeviceManagerSystem_1.getViewport(DirectorSystem_1.getState(DirectorData_1.DirectorData));
        },
        enumerable: true,
        configurable: true
    });
    DeviceManager.prototype.createGL = function (canvasId, contextConfig) {
        return DeviceManagerSystem_1.createGL(canvasId, immutable_1.fromJS(contextConfig), DirectorSystem_1.getState(DirectorData_1.DirectorData));
    };
    DeviceManager.prototype.setScreen = function () {
        return DeviceManagerSystem_1.setScreen(DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData));
    };
    return DeviceManager;
}());
__decorate([
    contract_1.requireCheck(function () {
        contract_1.it("canvas should be setter", function () {
            wonder_expect_js_1.expect(ViewSystem_1.getCanvas(DirectorSystem_1.getState(DirectorData_1.DirectorData))).exist;
        });
    })
], DeviceManager.prototype, "setScreen", null);
DeviceManager = __decorate([
    singleton_1.singleton(),
    registerClass_1.registerClass("DeviceManager")
], DeviceManager);
exports.DeviceManager = DeviceManager;
exports.setDeviceManagerGL = function (gl) {
    return DeviceManagerSystem_1.setGL(gl, DeviceManagerData_1.DeviceManagerData, DirectorSystem_1.getState(DirectorData_1.DirectorData));
};
//# sourceMappingURL=DeviceManager.js.map