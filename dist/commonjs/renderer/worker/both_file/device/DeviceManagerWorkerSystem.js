"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EWorkerOperateType_1 = require("../EWorkerOperateType");
var curry_1 = require("wonder-lodash/curry");
var deviceManagerUtils_1 = require("../../../utils/device/deviceManagerUtils");
var functionalUtils_1 = require("../../../../utils/functionalUtils");
var ViewSystem_1 = require("../../../../structure/ViewSystem");
var stateUtils_1 = require("../../../../utils/stateUtils");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
exports.createGL = curry_1.default(function (canvas, renderWorker, contextConfig, viewportData) {
    return IO_1.IO.of(function () {
        var offscreen = canvas.transferControlToOffscreen();
        renderWorker.postMessage({
            operateType: EWorkerOperateType_1.EWorkerOperateType.INIT_GL,
            canvas: offscreen,
            options: contextConfig.get("options").toObject(),
            viewportData: viewportData
        }, [offscreen]);
    });
});
exports.setContextConfig = deviceManagerUtils_1.setContextConfig;
exports.getGL = deviceManagerUtils_1.getGL;
exports.setGL = deviceManagerUtils_1.setGL;
exports.setPixelRatio = deviceManagerUtils_1.setPixelRatio;
exports.getViewport = deviceManagerUtils_1.getViewport;
exports.setViewport = curry_1.default(function (viewportData, state) {
    if (viewportData === null) {
        return state;
    }
    return deviceManagerUtils_1.setViewport(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});
exports.getViewportData = function (screenData, state) {
    var oldViewportData = exports.getViewport(state), x = screenData.x, y = screenData.y, width = screenData.width, height = screenData.height;
    if (stateUtils_1.isValueExist(oldViewportData) && oldViewportData.x === x && oldViewportData.y === y && oldViewportData.width === width && oldViewportData.height === height) {
        return null;
    }
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
exports.setViewportOfGL = curry_1.default(function (DeviceManagerWorkerData, _a, state) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    return IO_1.IO.of(function () {
        var gl = exports.getGL(DeviceManagerWorkerData, state);
        gl.viewport(x, y, width, height);
        return state;
    });
});
exports.setScreen = curry_1.default(function (canvas, DeviceManagerWorkerData, state) {
    return deviceManagerUtils_1.setScreen(canvas, _setScreenData, DeviceManagerWorkerData, state);
});
var _setScreenData = curry_1.default(function (DeviceManagerWorkerData, canvas, state, data) {
    var x = data.x, y = data.y, width = data.width, height = data.height, styleWidth = data.styleWidth, styleHeight = data.styleHeight;
    return IO_1.IO.of(function () {
        functionalUtils_1.compose(functionalUtils_1.chain(ViewSystem_1.setStyleWidth(styleWidth)), functionalUtils_1.chain(ViewSystem_1.setStyleHeight(styleHeight)), functionalUtils_1.chain(ViewSystem_1.setHeight(height)), functionalUtils_1.chain(ViewSystem_1.setWidth(width)), functionalUtils_1.chain(ViewSystem_1.setY(y)), ViewSystem_1.setX(x))(canvas).run();
        return data;
    });
});
exports.setCanvasPixelRatio = curry_1.default(function (useDevicePixelRatio, canvas) {
    return IO_1.IO.of(function () {
        if (!useDevicePixelRatio) {
            return null;
        }
        return deviceManagerUtils_1.setCanvasPixelRatio(useDevicePixelRatio, canvas).run();
    });
});
exports.clear = deviceManagerUtils_1.clear;
exports.setColorWrite = deviceManagerUtils_1.setColorWrite;
exports.setSide = deviceManagerUtils_1.setSide;
exports.initData = deviceManagerUtils_1.initData;
//# sourceMappingURL=DeviceManagerWorkerSystem.js.map