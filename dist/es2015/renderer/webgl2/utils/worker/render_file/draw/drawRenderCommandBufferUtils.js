import { drawArray, drawElements, updateSendMatrixFloat32ArrayData } from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { sendData } from "../../../../../utils/worker/render_file/texture/mapManagerUtils";
import { EDrawMode } from "../../../../../enum/EDrawMode";
export var drawGameObjects = function (gl, state, material_config, shaderLib_generator, DataBufferConfig, textureStartUnitIndex, useShaderName, initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, _a) {
    var _b = _a.renderCommandBufferData, mMatrices = _b.mMatrices, materialIndices = _b.materialIndices, geometryIndices = _b.geometryIndices, count = _a.count;
    var TextureDataFromSystem = drawDataMap.TextureDataFromSystem, TextureCacheDataFromSystem = drawDataMap.TextureCacheDataFromSystem, MapManagerDataFromSystem = drawDataMap.MapManagerDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, GeometryDataFromSystem = drawDataMap.GeometryDataFromSystem, sendAttributeData = drawFuncDataMap.sendAttributeData, sendUniformData = drawFuncDataMap.sendUniformData, directlySendUniformData = drawFuncDataMap.directlySendUniformData, use = drawFuncDataMap.use, hasIndices = drawFuncDataMap.hasIndices, getIndicesCount = drawFuncDataMap.getIndicesCount, getIndexType = drawFuncDataMap.getIndexType, getIndexTypeSize = drawFuncDataMap.getIndexTypeSize, getVerticesCount = drawFuncDataMap.getVerticesCount, getMapCount = drawFuncDataMap.getMapCount, bindAndUpdate = drawFuncDataMap.bindAndUpdate, useShader = drawFuncDataMap.useShader, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, VaoDataFromSystem = initShaderDataMap.VaoDataFromSystem, mMatrixFloatArrayForSend = renderCommandUniformData.mMatrix, program = null;
    for (var i = 0; i < count; i++) {
        var matStartIndex = 16 * i, matEndIndex = matStartIndex + 16, geometryIndex = geometryIndices[i], materialIndex = materialIndices[i], mapCount = getMapCount(materialIndex, MapManagerDataFromSystem), drawMode = EDrawMode.TRIANGLES;
        var shaderIndex = useShader(materialIndex, useShaderName, state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);
        updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);
        var uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;
        sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);
        bindAndUpdate(gl, mapCount, textureStartUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem);
        sendData(gl, mapCount, textureStartUnitIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem, MapManagerDataFromSystem);
        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map