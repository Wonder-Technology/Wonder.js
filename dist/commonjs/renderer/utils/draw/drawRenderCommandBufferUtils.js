"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EDrawMode_1 = require("../../enum/EDrawMode");
var BufferUtilsForUnitTest_1 = require("../../../utils/BufferUtilsForUnitTest");
var typeArrayUtils_1 = require("../../../utils/typeArrayUtils");
exports.clear = function (gl, clearGL, render_config, DeviceManagerDataFromSystem, data) {
    clearGL(gl, render_config.clearColor, DeviceManagerDataFromSystem);
    return data;
};
exports.buildDrawDataMap = function (DeviceManagerDataFromSystem, MaterialDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem) {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        GeometryDataFromSystem: GeometryDataFromSystem,
        ArrayBufferDataFromSystem: ArrayBufferDataFromSystem,
        IndexBufferDataFromSystem: IndexBufferDataFromSystem,
        DrawRenderCommandBufferDataFromSystem: DrawRenderCommandBufferDataFromSystem
    };
};
exports.buildDrawFuncDataMap = function (bindIndexBuffer, sendAttributeData, sendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount) {
    return {
        bindIndexBuffer: bindIndexBuffer,
        sendAttributeData: sendAttributeData,
        sendUniformData: sendUniformData,
        use: use,
        hasIndices: hasIndices,
        getIndicesCount: getIndicesCount,
        getIndexType: getIndexType,
        getIndexTypeSize: getIndexTypeSize,
        getVerticesCount: getVerticesCount
    };
};
exports.draw = function (gl, state, DataBufferConfig, _a, _b, bufferData) {
    var bindIndexBuffer = _a.bindIndexBuffer, sendAttributeData = _a.sendAttributeData, sendUniformData = _a.sendUniformData, use = _a.use, hasIndices = _a.hasIndices, getIndicesCount = _a.getIndicesCount, getIndexType = _a.getIndexType, getIndexTypeSize = _a.getIndexTypeSize, getVerticesCount = _a.getVerticesCount;
    var DeviceManagerDataFromSystem = _b.DeviceManagerDataFromSystem, MaterialDataFromSystem = _b.MaterialDataFromSystem, ProgramDataFromSystem = _b.ProgramDataFromSystem, LocationDataFromSystem = _b.LocationDataFromSystem, GLSLSenderDataFromSystem = _b.GLSLSenderDataFromSystem, GeometryDataFromSystem = _b.GeometryDataFromSystem, ArrayBufferDataFromSystem = _b.ArrayBufferDataFromSystem, IndexBufferDataFromSystem = _b.IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem = _b.DrawRenderCommandBufferDataFromSystem;
    var mat4Length = typeArrayUtils_1.getMatrix4DataSize(), count = bufferData.count, buffer = bufferData.buffer, mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend, vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend, pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend, _c = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, mat4Length, DrawRenderCommandBufferDataFromSystem), mMatrices = _c.mMatrices, vMatrices = _c.vMatrices, pMatrices = _c.pMatrices, materialIndices = _c.materialIndices, shaderIndices = _c.shaderIndices, geometryIndices = _c.geometryIndices;
    _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    for (var i = 0; i < count; i++) {
        var matStartIndex = 16 * i, matEndIndex = matStartIndex + 16, shaderIndex = shaderIndices[i], geometryIndex = geometryIndices[i], drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
        use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);
        _updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);
        sendUniformData(gl, shaderIndex, MaterialDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrices, pMatrices, materialIndices[i]));
        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            bindIndexBuffer(gl, geometryIndex, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem);
            _drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            _drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
    return state;
};
var _drawElements = function (gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem) {
    var startOffset = 0, count = getIndicesCount(geometryIndex, GeometryDataFromSystem), type = getIndexType(GeometryDataFromSystem), typeSize = getIndexTypeSize(GeometryDataFromSystem);
    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
};
var _drawArray = function (gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem) {
    var startOffset = 0, count = getVerticesCount(geometryIndex, GeometryDataFromSystem);
    gl.drawArrays(gl[drawMode], startOffset, count);
};
var _updateSendMatrixFloat32ArrayData = function (sourceMatrices, matStartIndex, matEndIndex, targetMatrices) {
    for (var i = matStartIndex; i < matEndIndex; i++) {
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }
    return targetMatrices;
};
var _buildRenderCommandUniformData = function (mMatrices, vMatrices, pMatrices, materialIndex) {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices,
        materialIndex: materialIndex
    };
};
var _createTypeArraysOnlyOnce = function (buffer, DataBufferConfig, mat4Length, DrawRenderCommandBufferDataFromSystem) {
    if (BufferUtilsForUnitTest_1.BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
        var count = DataBufferConfig.renderCommandBufferCount;
        DrawRenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
        DrawRenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count);
        DrawRenderCommandBufferDataFromSystem.shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count);
        DrawRenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
    }
    return DrawRenderCommandBufferDataFromSystem;
};
exports.initData = function (DrawRenderCommandBufferDataFromSystem) {
    var mat4Length = typeArrayUtils_1.getMatrix4DataSize();
    DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map