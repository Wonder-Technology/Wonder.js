"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceManagerWorkerSystem_1 = require("../../../both_file/device/DeviceManagerWorkerSystem");
var MapManagerWorkerSystem_1 = require("../../../render_file/texture/MapManagerWorkerSystem");
var shaderUtils_1 = require("../../../../webgl1/utils/worker/render_file/shader/shaderUtils");
var shaderSourceBuildWorkerSystem_1 = require("./shaderSourceBuildWorkerSystem");
var LightMaterialWorkerSystem_1 = require("../../../render_file/material/LightMaterialWorkerSystem");
var GeometryWorkerSystem_1 = require("../../../render_file/geometry/GeometryWorkerSystem");
exports.initNoMaterialShader = function (state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, initShaderDataMap) {
    shaderUtils_1.initNoMaterialShader(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};
exports.initMaterialShader = function (state, materialIndex, shaderName, material_config, shaderLib_generator, initShaderDataMap) {
    return shaderUtils_1.initMaterialShader(state, materialIndex, shaderName, material_config, shaderLib_generator, _buildInitShaderFuncDataMap(), initShaderDataMap);
};
var _buildInitShaderFuncDataMap = function () {
    return {
        buildGLSLSource: shaderSourceBuildWorkerSystem_1.buildGLSLSource,
        getGL: DeviceManagerWorkerSystem_1.getGL,
        getMapCount: MapManagerWorkerSystem_1.getMapCount,
        hasSpecularMap: LightMaterialWorkerSystem_1.hasSpecularMap,
        hasDiffuseMap: LightMaterialWorkerSystem_1.hasDiffuseMap,
        getVertices: GeometryWorkerSystem_1.getVertices,
        getNormals: GeometryWorkerSystem_1.getNormals,
        getTexCoords: GeometryWorkerSystem_1.getTexCoords,
        getIndices: GeometryWorkerSystem_1.getIndices
    };
};
exports.bindIndexBuffer = function (gl, geometryIndex, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData) {
    shaderUtils_1.bindIndexBuffer(gl, geometryIndex, GeometryWorkerSystem_1.getIndices, ProgramWorkerData, GeometryWorkerData, IndexBufferWorkerData);
};
exports.initData = shaderUtils_1.initData;
//# sourceMappingURL=ShaderWorkerSystem.js.map