import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { getContext, setCanvas, setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX } from "../../structure/ViewSystem";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import curry from "wonder-lodash/curry";
import { chain, compose } from "../../utils/functionalUtils";
import { clear as clearUtils, getGL as getGLUtils, getScreenSize as getScreenSizeUtils, getViewport as getViewportUtils, initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils, setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils, setScreen as setScreenUtils, setViewport as setViewportUtils, setViewportOfGL as setViewportOfGLUtils } from "../utils/device/deviceManagerUtils";
export var createGL = curry(function (canvas, contextConfig, DeviceManagerData, state) {
    return IO.of(function () {
        var gl = getContext(contextConfig, canvas);
        if (!gl) {
            DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return compose(setCanvas(canvas), setContextConfig(contextConfig), setGL(gl, DeviceManagerData))(state);
    });
});
export var getGL = getGLUtils;
export var setGL = setGLUtils;
export var setContextConfig = setContextConfigUtils;
export var setPixelRatio = setPixelRatioUtils;
export var getViewport = getViewportUtils;
export var setViewport = setViewportUtils;
export var setCanvasPixelRatio = curry(function (useDevicePixelRatio, canvas, state) {
    return IO.of(function () {
        if (!useDevicePixelRatio) {
            return state;
        }
        var pixelRatio = setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();
        return setPixelRatio(pixelRatio, state);
    });
});
export var setViewportOfGL = setViewportOfGLUtils;
export var getScreenSize = getScreenSizeUtils;
export var setScreen = curry(function (canvas, DeviceManagerData, state) {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerData, state);
});
var _setScreenData = curry(function (DeviceManagerData, canvas, state, data) {
    var x = data.x, y = data.y, width = data.width, height = data.height, styleWidth = data.styleWidth, styleHeight = data.styleHeight;
    return IO.of(function () {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(canvas).run();
        return setViewportOfGL(DeviceManagerData, state, data).run();
    });
});
export var clear = clearUtils;
export var setColorWrite = setColorWriteUtils;
export var initData = initDataUtils;
//# sourceMappingURL=DeviceManagerSystem.js.map