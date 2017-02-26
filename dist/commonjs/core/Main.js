"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var DebugConfig_1 = require("../config/DebugConfig");
var EScreenSize_1 = require("../device/EScreenSize");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var DeviceManager_1 = require("../device/DeviceManager");
var GPUDetector_1 = require("../device/GPUDetector");
var CompileConfig_1 = require("../config/CompileConfig");
var MainData_1 = require("./data/MainData");
var Main = (function () {
    function Main() {
    }
    Main.setConfig = function (_a) {
        var _b = _a.canvasId, canvasId = _b === void 0 ? null : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig_1.DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize_1.EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
            options: {
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }
        } : _f;
        MainData_1.MainData.screenSize = screenSize;
        this._canvasId = canvasId;
        this._useDevicePixelRatio = useDevicePixelRatio;
        this._contextConfig = {
            options: ExtendUtils_1.ExtendUtils.extend({
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }, contextConfig.options)
        };
        this._setIsTest(isTest);
        return this;
    };
    Main.init = function () {
        DeviceManager_1.DeviceManager.getInstance().createGL(this._canvasId, this._contextConfig, this._useDevicePixelRatio);
        DeviceManager_1.DeviceManager.getInstance().setScreen();
        GPUDetector_1.GPUDetector.getInstance().detect();
        return this;
    };
    Main._setIsTest = function (isTestFromDebugConfig) {
        if (CompileConfig_1.CompileConfig.closeContractTest) {
            MainData_1.MainData.isTest = false;
        }
        else {
            MainData_1.MainData.isTest = isTestFromDebugConfig;
        }
    };
    return Main;
}());
Main._canvasId = null;
Main._contextConfig = null;
Main._useDevicePixelRatio = null;
Main = __decorate([
    registerClass_1.registerClass("Main")
], Main);
exports.Main = Main;
//# sourceMappingURL=Main.js.map