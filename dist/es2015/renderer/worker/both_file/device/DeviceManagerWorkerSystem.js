import { EWorkerOperateType } from "../EWorkerOperateType";
import curry from "wonder-lodash/curry";
import { clear as clearUtils, getGL as getGLUtils, getViewport as getViewportUtils, initData as initDataUtils, setCanvasPixelRatio as setCanvasPixelRatioUtils, setSide as setSideUtils, setColorWrite as setColorWriteUtils, setContextConfig as setContextConfigUtils, setGL as setGLUtils, setPixelRatio as setPixelRatioUtils, setScreen as setScreenUtils, setViewportToState as setViewportToStateUtils, setViewportOfGL as setViewportOfGLUtils, setClearColor as setClearColorUtils } from "../../../utils/worker/both_file/device/deviceManagerUtils";
import { chain, compose } from "../../../../utils/functionalUtils";
import { setHeight, setStyleHeight, setStyleWidth, setWidth, setY, setX } from "../../../../structure/ViewSystem";
import { Color } from "../../../../structure/Color";
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
export var setViewportToState = curry(function (viewportData, state) {
    if (viewportData === null) {
        return state;
    }
    return setViewportToStateUtils(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});
export var getViewportData = function (screenData) {
    var x = screenData.x, y = screenData.y, width = screenData.width, height = screenData.height;
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
export var setViewportOfGL = curry(function (DeviceManagerWorkerData, data, state) {
    return setViewportOfGLUtils(DeviceManagerWorkerData, state, data);
});
export var setScreen = curry(function (canvas, DeviceManagerWorkerData, DomQuery, state) {
    return setScreenUtils(canvas, _setScreenData, DeviceManagerWorkerData, state, DomQuery);
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
export var buildViewportData = function (x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
export var setClearColor = function (gl, colorArr4, DeviceManagerWorkerData) {
    var color = Color.create();
    color.r = colorArr4[0];
    color.g = colorArr4[1];
    color.b = colorArr4[2];
    color.a = colorArr4[3];
    setClearColorUtils(gl, color, DeviceManagerWorkerData);
};
export var clear = clearUtils;
export var setColorWrite = setColorWriteUtils;
export var setSide = setSideUtils;
export var initData = initDataUtils;
//# sourceMappingURL=DeviceManagerWorkerSystem.js.map