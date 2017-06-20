"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DomQuery_1 = require("wonder-commonlib/dist/commonjs/utils/DomQuery");
var ViewSystem_1 = require("../../structure/ViewSystem");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var curry_1 = require("wonder-lodash/curry");
var functionalUtils_1 = require("../../utils/functionalUtils");
var deviceManagerUtils_1 = require("../utils/device/deviceManagerUtils");
exports.createGL = curry_1.default(function (canvas, contextConfig, DeviceManagerData, state) {
    return IO_1.IO.of(function () {
        var gl = ViewSystem_1.getContext(contextConfig, canvas);
        if (!gl) {
            DomQuery_1.DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return functionalUtils_1.compose(ViewSystem_1.setCanvas(canvas), exports.setContextConfig(contextConfig), exports.setGL(gl, DeviceManagerData))(state);
    });
});
exports.getGL = deviceManagerUtils_1.getGL;
exports.setGL = deviceManagerUtils_1.setGL;
exports.setContextConfig = deviceManagerUtils_1.setContextConfig;
exports.setPixelRatio = deviceManagerUtils_1.setPixelRatio;
exports.getViewport = deviceManagerUtils_1.getViewport;
exports.setViewport = deviceManagerUtils_1.setViewport;
exports.setCanvasPixelRatio = curry_1.default(function (useDevicePixelRatio, canvas, state) {
    return IO_1.IO.of(function () {
        if (!useDevicePixelRatio) {
            return state;
        }
        var pixelRatio = deviceManagerUtils_1.setCanvasPixelRatio(useDevicePixelRatio, canvas).run();
        return exports.setPixelRatio(pixelRatio, state);
    });
});
exports.setViewportOfGL = deviceManagerUtils_1.setViewportOfGL;
exports.getScreenSize = deviceManagerUtils_1.getScreenSize;
exports.setScreen = curry_1.default(function (canvas, DeviceManagerData, state) {
    return deviceManagerUtils_1.setScreen(canvas, _setScreenData, DeviceManagerData, state);
});
var _setScreenData = curry_1.default(function (DeviceManagerData, canvas, state, data) {
    var x = data.x, y = data.y, width = data.width, height = data.height, styleWidth = data.styleWidth, styleHeight = data.styleHeight;
    return IO_1.IO.of(function () {
        functionalUtils_1.compose(functionalUtils_1.chain(ViewSystem_1.setStyleWidth(styleWidth)), functionalUtils_1.chain(ViewSystem_1.setStyleHeight(styleHeight)), functionalUtils_1.chain(ViewSystem_1.setHeight(height)), functionalUtils_1.chain(ViewSystem_1.setWidth(width)), functionalUtils_1.chain(ViewSystem_1.setY(y)), ViewSystem_1.setX(x))(canvas).run();
        return exports.setViewportOfGL(DeviceManagerData, state, data).run();
    });
});
exports.clear = deviceManagerUtils_1.clear;
exports.setColorWrite = deviceManagerUtils_1.setColorWrite;
exports.initData = deviceManagerUtils_1.initData;
//# sourceMappingURL=DeviceManagerSystem.js.map