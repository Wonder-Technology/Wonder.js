"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawRenderCommandBufferUtils_1 = require("../../../utils/draw/drawRenderCommandBufferUtils");
var DeviceManagerWorkerSystem_1 = require("../../both_file/device/DeviceManagerWorkerSystem");
var ShaderWorkerSystem_1 = require("../shader/ShaderWorkerSystem");
var GeometryWorkerSystem_1 = require("../geometry/GeometryWorkerSystem");
var MapManagerWorkerSystem_1 = require("../texture/MapManagerWorkerSystem");
var programUtils_1 = require("../../../utils/shader/program/programUtils");
exports.clear = function (state, render_config, DeviceManagerWorkerData) {
    return drawRenderCommandBufferUtils_1.clear(DeviceManagerWorkerSystem_1.getGL(DeviceManagerWorkerData, state), DeviceManagerWorkerSystem_1.clear, render_config, DeviceManagerWorkerData, null);
};
exports.draw = function (state, DataBufferConfig, drawDataMap, bufferData) {
    var gl = DeviceManagerWorkerSystem_1.getGL(drawDataMap.DeviceManagerDataFromSystem, state);
    if (_isBufferDataExist(bufferData)) {
        drawRenderCommandBufferUtils_1.draw(gl, state, DataBufferConfig, drawRenderCommandBufferUtils_1.buildDrawFuncDataMap(ShaderWorkerSystem_1.bindIndexBuffer, ShaderWorkerSystem_1.sendAttributeData, ShaderWorkerSystem_1.sendUniformData, programUtils_1.directlySendUniformData, ShaderWorkerSystem_1.use, GeometryWorkerSystem_1.hasIndices, GeometryWorkerSystem_1.getIndicesCount, GeometryWorkerSystem_1.getIndexType, GeometryWorkerSystem_1.getIndexTypeSize, GeometryWorkerSystem_1.getVerticesCount, MapManagerWorkerSystem_1.bindAndUpdate, MapManagerWorkerSystem_1.getMapCount), drawDataMap, bufferData);
    }
    _commitGL(gl, state);
};
var _isBufferDataExist = function (bufferData) { return !!bufferData; };
var _commitGL = function (gl, state) {
    gl.commit();
    return state;
};
exports.initData = drawRenderCommandBufferUtils_1.initData;
//# sourceMappingURL=DrawRenderCommandBufferWorkerSystem.js.map