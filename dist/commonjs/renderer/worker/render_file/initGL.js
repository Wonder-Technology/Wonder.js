"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functionalUtils_1 = require("../../../utils/functionalUtils");
var GPUDetectorSystem_1 = require("../../device/GPUDetectorSystem");
var DeviceManagerWorkerSystem_1 = require("../both_file/device/DeviceManagerWorkerSystem");
var DeviceManagerWorkerData_1 = require("../both_file/device/DeviceManagerWorkerData");
var stateUtils_1 = require("../../../utils/stateUtils");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var DomQuery_1 = require("wonder-commonlib/dist/commonjs/utils/DomQuery");
var curry_1 = require("wonder-lodash/curry");
var ViewSystem_1 = require("../../../structure/ViewSystem");
exports.initGL = function (data) {
    return functionalUtils_1.compose(functionalUtils_1.map(GPUDetectorSystem_1.detect(DeviceManagerWorkerSystem_1.getGL, DeviceManagerWorkerData_1.DeviceManagerWorkerData)), functionalUtils_1.chain(DeviceManagerWorkerSystem_1.setViewportOfGL(DeviceManagerWorkerData_1.DeviceManagerWorkerData, data.viewportData)), _createGL(data.canvas, data.options, DeviceManagerWorkerData_1.DeviceManagerWorkerData))(stateUtils_1.createState());
};
var _createGL = curry_1.default(function (canvas, options, DeviceManagerWorkerData, state) {
    return IO_1.IO.of(function () {
        var gl = _getContext(canvas, options);
        if (!gl) {
            DomQuery_1.DomQuery.create("<p class='not-support-webgl'></p>").prependTo("body").text("Your device doesn't support WebGL");
        }
        return functionalUtils_1.compose(ViewSystem_1.setCanvas(canvas), DeviceManagerWorkerSystem_1.setContextConfig(options), DeviceManagerWorkerSystem_1.setGL(gl, DeviceManagerWorkerData))(state);
    });
});
var _getContext = function (canvas, options) {
    return (canvas.getContext("webgl", options) || canvas.getContext("experimental-webgl", options));
};
//# sourceMappingURL=initGL.js.map