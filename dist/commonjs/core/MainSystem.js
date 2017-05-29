"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DebugConfig_1 = require("../config/DebugConfig");
var EScreenSize_1 = require("../device/EScreenSize");
var ExtendUtils_1 = require("wonder-commonlib/dist/commonjs/utils/ExtendUtils");
var CompileConfig_1 = require("../config/CompileConfig");
var DeviceManagerSystem_1 = require("../device/DeviceManagerSystem");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var functionalUtils_1 = require("../utils/functionalUtils");
var Main_1 = require("wonder-frp/dist/commonjs/core/Main");
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var immutable_1 = require("immutable");
var GPUDetectorSystem_1 = require("../device/GPUDetectorSystem");
exports.getIsTest = function (MainData) {
    return MainData.isTest;
};
exports.setIsTest = function (isTest, MainData) {
    return IO_1.IO.of(function () {
        MainData.isTest = isTest;
    });
};
exports.setLibIsTest = function (isTest) {
    return IO_1.IO.of(function () {
        Main_1.Main.isTest = isTest;
    });
};
exports.getScreenSize = function (state) {
    return state.getIn(["Main", "screenSize"]);
};
exports.setConfig = function (closeContractTest, MainData, _a) {
    var _b = _a.canvasId, canvasId = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig_1.DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize_1.EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
        options: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        }
    } : _f;
    return IO_1.IO.of(function () {
        var _isTest = false;
        if (CompileConfig_1.CompileConfig.closeContractTest) {
            _isTest = false;
            exports.setLibIsTest(false).run();
        }
        else {
            _isTest = isTest;
            exports.setLibIsTest(isTest).run();
        }
        exports.setIsTest(_isTest, MainData).run();
        return immutable_1.fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
                contextConfig: {
                    options: ExtendUtils_1.ExtendUtils.extend({
                        alpha: true,
                        depth: true,
                        stencil: false,
                        antialias: true,
                        premultipliedAlpha: true,
                        preserveDrawingBuffer: false
                    }, contextConfig.options)
                },
                useDevicePixelRatio: useDevicePixelRatio
            }
        });
    });
};
exports.init = contract_1.requireCheckFunc(function (gameState, configState, DeviceManagerData) {
    contract_1.it("should set config before", function () {
        wonder_expect_js_1.expect(configState.get("useDevicePixelRatio")).exist;
    });
}, function (gameState, configState, DeviceManagerData) {
    return functionalUtils_1.compose(functionalUtils_1.map(GPUDetectorSystem_1.detect), functionalUtils_1.chain(DeviceManagerSystem_1.setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))), functionalUtils_1.chain(DeviceManagerSystem_1.setScreen(DeviceManagerData)), DeviceManagerSystem_1.createGL)(configState.get("canvasId"), configState.get("contextConfig"), DeviceManagerData, gameState);
});
//# sourceMappingURL=MainSystem.js.map