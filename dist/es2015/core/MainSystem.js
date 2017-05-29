import { DebugConfig } from "../config/DebugConfig";
import { EScreenSize } from "../device/EScreenSize";
import { ExtendUtils } from "wonder-commonlib/dist/es2015/utils/ExtendUtils";
import { CompileConfig } from "../config/CompileConfig";
import { createGL, setPixelRatioAndCanvas, setScreen } from "../device/DeviceManagerSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { chain, compose, map } from "../utils/functionalUtils";
import { Main } from "wonder-frp/dist/es2015/core/Main";
import { it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { fromJS } from "immutable";
import { detect } from "../device/GPUDetectorSystem";
export var getIsTest = function (MainData) {
    return MainData.isTest;
};
export var setIsTest = function (isTest, MainData) {
    return IO.of(function () {
        MainData.isTest = isTest;
    });
};
export var setLibIsTest = function (isTest) {
    return IO.of(function () {
        Main.isTest = isTest;
    });
};
export var getScreenSize = function (state) {
    return state.getIn(["Main", "screenSize"]);
};
export var setConfig = function (closeContractTest, MainData, _a) {
    var _b = _a.canvasId, canvasId = _b === void 0 ? "" : _b, _c = _a.isTest, isTest = _c === void 0 ? DebugConfig.isTest : _c, _d = _a.screenSize, screenSize = _d === void 0 ? EScreenSize.FULL : _d, _e = _a.useDevicePixelRatio, useDevicePixelRatio = _e === void 0 ? false : _e, _f = _a.contextConfig, contextConfig = _f === void 0 ? {
        options: {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        }
    } : _f;
    return IO.of(function () {
        var _isTest = false;
        if (CompileConfig.closeContractTest) {
            _isTest = false;
            setLibIsTest(false).run();
        }
        else {
            _isTest = isTest;
            setLibIsTest(isTest).run();
        }
        setIsTest(_isTest, MainData).run();
        return fromJS({
            Main: {
                screenSize: screenSize
            },
            config: {
                canvasId: canvasId,
                contextConfig: {
                    options: ExtendUtils.extend({
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
export var init = requireCheckFunc(function (gameState, configState, DeviceManagerData) {
    it("should set config before", function () {
        expect(configState.get("useDevicePixelRatio")).exist;
    });
}, function (gameState, configState, DeviceManagerData) {
    return compose(map(detect), chain(setPixelRatioAndCanvas(configState.get("useDevicePixelRatio"))), chain(setScreen(DeviceManagerData)), createGL)(configState.get("canvasId"), configState.get("contextConfig"), DeviceManagerData, gameState);
});
//# sourceMappingURL=MainSystem.js.map