var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { DeviceManager } from "../device/DeviceManager";
import { GPUDetector } from "../device/GPUDetector";
import { CompileConfig } from "../config/CompileConfig";
import { MainData } from "./data/MainData";
var Main = (function () {
    function Main() {
    }
    Main.setConfig = function (_a) {
        var _b = _a.canvasId, canvasId = _b === void 0 ? null : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
            options: {
                alpha: true,
                depth: true,
                stencil: false,
                antialias: true,
                premultipliedAlpha: true,
                preserveDrawingBuffer: false
            }
        } : _f;
        MainData.screenSize = screenSize;
        this._canvasId = canvasId;
        this._useDevicePixelRatio = useDevicePixelRatio;
        this._contextConfig = {
            options: ExtendUtils.extend({
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
        DeviceManager.getInstance().createGL(this._canvasId, this._contextConfig, this._useDevicePixelRatio);
        DeviceManager.getInstance().setScreen();
        GPUDetector.getInstance().detect();
        return this;
    };
    Main._setIsTest = function (isTestFromDebugConfig) {
        if (CompileConfig.closeContractTest) {
            MainData.isTest = false;
        }
        else {
            MainData.isTest = isTestFromDebugConfig;
        }
    };
    return Main;
}());
Main._canvasId = null;
Main._contextConfig = null;
Main._useDevicePixelRatio = null;
Main = __decorate([
    registerClass("Main")
], Main);
export { Main };
//# sourceMappingURL=Main.js.map