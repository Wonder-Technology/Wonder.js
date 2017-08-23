"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drawRenderCommandBufferUtils_1 = require("../../../../../utils/draw/drawRenderCommandBufferUtils");
var mapManagerUtils_1 = require("../../../../../utils/worker/render_file/texture/mapManagerUtils");
var EDrawMode_1 = require("../../../../../enum/EDrawMode");
exports.drawGameObjects = function (gl, state, material_config, shaderLib_generator, DataBufferConfig, textureStartUnitIndex, useShaderName, initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, _a) {
    var _b = _a.renderCommandBufferData, mMatrices = _b.mMatrices, materialIndices = _b.materialIndices, geometryIndices = _b.geometryIndices, count = _a.count;
    var TextureDataFromSystem = drawDataMap.TextureDataFromSystem, TextureCacheDataFromSystem = drawDataMap.TextureCacheDataFromSystem, MapManagerDataFromSystem = drawDataMap.MapManagerDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, GeometryDataFromSystem = drawDataMap.GeometryDataFromSystem, sendAttributeData = drawFuncDataMap.sendAttributeData, sendUniformData = drawFuncDataMap.sendUniformData, directlySendUniformData = drawFuncDataMap.directlySendUniformData, use = drawFuncDataMap.use, hasIndices = drawFuncDataMap.hasIndices, getIndicesCount = drawFuncDataMap.getIndicesCount, getIndexType = drawFuncDataMap.getIndexType, getIndexTypeSize = drawFuncDataMap.getIndexTypeSize, getVerticesCount = drawFuncDataMap.getVerticesCount, getMapCount = drawFuncDataMap.getMapCount, bindAndUpdate = drawFuncDataMap.bindAndUpdate, useShader = drawFuncDataMap.useShader, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, VaoDataFromSystem = initShaderDataMap.VaoDataFromSystem, mMatrixFloatArrayForSend = renderCommandUniformData.mMatrix, program = null;
    for (var i = 0; i < count; i++) {
        var matStartIndex = 16 * i, matEndIndex = matStartIndex + 16, geometryIndex = geometryIndices[i], materialIndex = materialIndices[i], mapCount = getMapCount(materialIndex, MapManagerDataFromSystem), drawMode = EDrawMode_1.EDrawMode.TRIANGLES;
        var shaderIndex = useShader(materialIndex, useShaderName, state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);
        drawRenderCommandBufferUtils_1.updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);
        var uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;
        sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);
        bindAndUpdate(gl, mapCount, textureStartUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem);
        mapManagerUtils_1.sendData(gl, mapCount, textureStartUnitIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem, MapManagerDataFromSystem);
        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            drawRenderCommandBufferUtils_1.drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            drawRenderCommandBufferUtils_1.drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map