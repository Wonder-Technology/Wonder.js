import { EWorkerOperateType } from "../EWorkerOperateType";
import curry from "wonder-lodash/curry";
import { clear as clearUtils, getGL as getGLUtils, getViewport as getViewportUtils, initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils, setSide as setSideUtils, setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils, setScreen as setScreenUtils, setViewport as setViewportUtils } from "../../../utils/device/deviceManagerUtils";
import { chain, compose } from "../../../../utils/functionalUtils";
import { setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX } from "../../../../structure/ViewSystem";
import { isValueExist } from "../../../../utils/stateUtils";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
export var createGL = curry(function (canvas, renderWorker, contextConfig, viewportData) {
    return IO.of(function () {
        var offscreen = canvas.transferControlToOffscreen();
        renderWorker.postMessage({
            operateType: EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject(),
            viewportData: viewportData
        }, [offscreen]);
    });
});
export var setContextConfig = setContextConfigUtils;
export var getGL = getGLUtils;
export var setGL = setGLUtils;
export var setPixelRatio = setPixelRatioUtils;
export var getViewport = getViewportUtils;
export var setViewport = curry(function (viewportData, state) {
    if (viewportData === null) {
        return state;
    }
    return setViewportUtils(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});
export var getViewportData = function (screenData, state) {
    var oldViewportData = getViewport(state), x = screenData.x, y = screenData.y, width = screenData.width, height = screenData.height;
    if (isValueExist(oldViewportData) && oldViewportData.x === x && oldViewportData.y === y && oldViewportData.width === width && oldViewportData.height === height) {
        return null;
    }
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
export var setViewportOfGL = curry(function (DeviceManagerWorkerData, _a, state) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return IO.of(function () {
        var gl = getGL(DeviceManagerWorkerData, state);
        gl.viewport(x, y, width, height);
        return state;
    });
});
export var setScreen = curry(function (canvas, DeviceManagerWorkerData, state) {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerWorkerData, state);
});
var _setScreenData = curry(function (DeviceManagerWorkerData, canvas, state, data) {
    var x = data.x, y = data.y, width = data.width, height = data.height, styleWidth = data.styleWidth, styleHeight = data.styleHeight;
    return IO.of(function () {
        compose(chain(setStyleWidth(styleWidth)), chain(setStyleHeight(styleHeight)), chain(setHeight(height)), chain(setWidth(width)), chain(setY(y)), setX(x))(canvas).run();
        return data;
    });
});
export var setCanvasPixelRatio = curry(function (useDevicePixelRatio, canvas) {
    return IO.of(function () {
        if (!useDevicePixelRatio) {
            return null;
        }
        return setCanvasPixelRatioUtils(useDevicePixelRatio, canvas).run();
    });
});
export var clear = clearUtils;
export var setColorWrite = setColorWriteUtils;
export var setSide = setSideUtils;
export var initData = initDataUtils;
//# sourceMappingURL=DeviceManagerWorkerSystem.js.map