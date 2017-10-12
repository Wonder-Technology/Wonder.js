"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EWorkerOperateType_1 = require("../EWorkerOperateType");
var curry_1 = require("wonder-lodash/curry");
var deviceManagerUtils_1 = require("../../../utils/worker/both_file/device/deviceManagerUtils");
var functionalUtils_1 = require("../../../../utils/functionalUtils");
var ViewSystem_1 = require("../../../../structure/ViewSystem");
var Color_1 = require("../../../../structure/Color");
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
exports.setViewportToState = curry_1.default(function (viewportData, state) {
    if (viewportData === null) {
        return state;
    }
    return deviceManagerUtils_1.setViewportToState(viewportData.x, viewportData.y, viewportData.width, viewportData.height, state);
});
exports.getViewportData = function (screenData) {
    var x = screenData.x, y = screenData.y, width = screenData.width, height = screenData.height;
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
exports.setViewportOfGL = curry_1.default(function (DeviceManagerWorkerData, data, state) {
    return deviceManagerUtils_1.setViewportOfGL(DeviceManagerWorkerData, state, data);
});
exports.setScreen = curry_1.default(function (canvas, DeviceManagerWorkerData, DomQuery, state) {
    return deviceManagerUtils_1.setScreen(canvas, _setScreenData, DeviceManagerWorkerData, state, DomQuery);
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
exports.buildViewportData = function (x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height
    };
};
exports.setClearColor = function (gl, colorArr4, DeviceManagerWorkerData) {
    var color = Color_1.Color.create();
    color.r = colorArr4[0];
    color.g = colorArr4[1];
    color.b = colorArr4[2];
    color.a = colorArr4[3];
    deviceManagerUtils_1.setClearColor(gl, color, DeviceManagerWorkerData);
};
exports.clear = deviceManagerUtils_1.clear;
exports.setColorWrite = deviceManagerUtils_1.setColorWrite;
exports.setSide = deviceManagerUtils_1.setSide;
exports.initData = deviceManagerUtils_1.initData;
//# sourceMappingURL=DeviceManagerWorkerSystem.js.map