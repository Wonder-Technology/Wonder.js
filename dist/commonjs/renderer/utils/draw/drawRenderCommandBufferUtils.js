"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EDrawMode_1 = require("../../enum/EDrawMode");
var BufferUtilsForUnitTest_1 = require("../../../utils/BufferUtilsForUnitTest");
var typeArrayUtils_1 = require("../../../utils/typeArrayUtils");
var renderComandBufferUtils_1 = require("./renderComandBufferUtils");
exports.clear = function (gl, clearGL, render_config, DeviceManagerDataFromSystem, data) {
    clearGL(gl, render_config.clearColor, DeviceManagerDataFromSystem);
    return data;
};
exports.buildDrawDataMap = function (DeviceManagerDataFromSystem, TextureDataFromSystem, TextureCacheDataFromSystem, MapManagerDataFromSystem, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem, AmbientLightDataFromSystem, DirectionLightDataFromSystem, PointLightDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem) {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        TextureDataFromSystem: TextureDataFromSystem,
        TextureCacheDataFromSystem: TextureCacheDataFromSystem,
        MapManagerDataFromSystem: MapManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem,
        AmbientLightDataFromSystem: AmbientLightDataFromSystem,
        DirectionLightDataFromSystem: DirectionLightDataFromSystem,
        PointLightDataFromSystem: PointLightDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        GeometryDataFromSystem: GeometryDataFromSystem,
        ArrayBufferDataFromSystem: ArrayBufferDataFromSystem,
        IndexBufferDataFromSystem: IndexBufferDataFromSystem,
        DrawRenderCommandBufferDataFromSystem: DrawRenderCommandBufferDataFromSystem
    };
};
exports.buildDrawFuncDataMap = function (bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount) {
    return {
        bindIndexBuffer: bindIndexBuffer,
        sendAttributeData: sendAttributeData,
        sendUniformData: sendUniformData,
        directlySendUniformData: directlySendUniformData,
        use: use,
        hasIndices: hasIndices,
        getIndicesCount: getIndicesCount,
        getIndexType: getIndexType,
        getIndexTypeSize: getIndexTypeSize,
        getVerticesCount: getVerticesCount,
        bindAndUpdate: bindAndUpdate,
        getMapCount: getMapCount
    };
};
exports.draw = function (gl, state, DataBufferConfig, _a, drawDataMap, bufferData) {
    var bindIndexBuffer = _a.bindIndexBuffer, sendAttributeData = _a.sendAttributeData, sendUniformData = _a.sendUniformData, directlySendUniformData = _a.directlySendUniformData, use = _a.use, hasIndices = _a.hasIndices, getIndicesCount = _a.getIndicesCount, getIndexType = _a.getIndexType, getIndexTypeSize = _a.getIndexTypeSize, getVerticesCount = _a.getVerticesCount, getMapCount = _a.getMapCount, bindAndUpdate = _a.bindAndUpdate;
    var TextureDataFromSystem = drawDataMap.TextureDataFromSystem, TextureCacheDataFromSystem = drawDataMap.TextureCacheDataFromSystem, MapManagerDataFromSystem = drawDataMap.MapManagerDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, GeometryDataFromSystem = drawDataMap.GeometryDataFromSystem, ArrayBufferDataFromSystem = drawDataMap.ArrayBufferDataFromSystem, IndexBufferDataFromSystem = drawDataMap.IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem = drawDataMap.DrawRenderCommandBufferDataFromSystem, mat3Length = typeArrayUtils_1.getMatrix3DataSize(), mat4Length = typeArrayUtils_1.getMatrix4DataSize(), cameraPositionLength = typeArrayUtils_1.getVector3DataSize(), count = bufferData.count, buffer = bufferData.buffer, mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend, vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend, pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend, cameraPositionForSend = DrawRenderCommandBufferDataFromSystem.cameraPositionForSend, normalMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend, _b = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem), mMatrices = _b.mMatrices, vMatrices = _b.vMatrices, pMatrices = _b.pMatrices, cameraPositions = _b.cameraPositions, normalMatrices = _b.normalMatrices, materialIndices = _b.materialIndices, shaderIndices = _b.shaderIndices, geometryIndices = _b.geometryIndices, program = null;
    _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);
    for (var i = 0; i < count; i++) {
        var matStartIndex = 16 * i, matEndIndex = matStartIndex + 16, shaderIndex = shaderIndices[i], geometryIndex = geometryIndices[i], materialIndex = materialIndices[i], mapCount = getMapCount(materialIndex, MapManagerDataFromSystem), drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
        bindAndUpdate(gl, mapCount, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem);
        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);
        _updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);
        sendUniformData(gl, shaderIndex, program, mapCount, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex));
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
var _buildRenderCommandUniformData = function (mMatrices, vMatrices, pMatrices, cameraPosition, normalMatrices, materialIndex) {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices,
        cameraPosition: cameraPosition,
        normalMatrix: normalMatrices,
        materialIndex: materialIndex
    };
};
var _createTypeArraysOnlyOnce = function (buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem) {
    if (BufferUtilsForUnitTest_1.BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
        renderComandBufferUtils_1.createTypeArrays(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem);
    }
    return DrawRenderCommandBufferDataFromSystem;
};
exports.initData = function (DrawRenderCommandBufferDataFromSystem) {
    var mat3Length = typeArrayUtils_1.getMatrix3DataSize(), mat4Length = typeArrayUtils_1.getMatrix4DataSize(), cameraPositionLength = typeArrayUtils_1.getVector3DataSize();
    DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.cameraPositionForSend = new Float32Array(cameraPositionLength);
    DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend = new Float32Array(mat3Length);
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map