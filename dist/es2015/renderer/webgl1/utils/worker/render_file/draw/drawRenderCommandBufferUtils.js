import { drawArray, drawElements, updateSendMatrixFloat32ArrayData } from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { EDrawMode } from "../../../../../enum/EDrawMode";
import { sendData } from "../../../../../utils/worker/render_file/texture/mapManagerUtils";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { getExtensionVao } from "../device/gpuDetectUtils";
export var buildDrawFuncDataMap = function (bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader) {
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
        getMapCount: getMapCount,
        useShader: useShader
    };
};
export var drawGameObjects = function (gl, state, material_config, shaderLib_generator, DataBufferConfig, textureStartUnitIndex, useShaderName, initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, _a) {
    var _b = _a.renderCommandBufferData, mMatrices = _b.mMatrices, materialIndices = _b.materialIndices, geometryIndices = _b.geometryIndices, count = _a.count;
    var TextureDataFromSystem = drawDataMap.TextureDataFromSystem, TextureCacheDataFromSystem = drawDataMap.TextureCacheDataFromSystem, MapManagerDataFromSystem = drawDataMap.MapManagerDataFromSystem, ProgramDataFromSystem = drawDataMap.ProgramDataFromSystem, LocationDataFromSystem = drawDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = drawDataMap.GLSLSenderDataFromSystem, GeometryDataFromSystem = drawDataMap.GeometryDataFromSystem, ArrayBufferDataFromSystem = drawDataMap.ArrayBufferDataFromSystem, IndexBufferDataFromSystem = drawDataMap.IndexBufferDataFromSystem, bindIndexBuffer = drawFuncDataMap.bindIndexBuffer, sendAttributeData = drawFuncDataMap.sendAttributeData, sendUniformData = drawFuncDataMap.sendUniformData, directlySendUniformData = drawFuncDataMap.directlySendUniformData, use = drawFuncDataMap.use, hasIndices = drawFuncDataMap.hasIndices, getIndicesCount = drawFuncDataMap.getIndicesCount, getIndexType = drawFuncDataMap.getIndexType, getIndexTypeSize = drawFuncDataMap.getIndexTypeSize, getVerticesCount = drawFuncDataMap.getVerticesCount, getMapCount = drawFuncDataMap.getMapCount, bindAndUpdate = drawFuncDataMap.bindAndUpdate, useShader = drawFuncDataMap.useShader, GPUDetectDataFromSystem = initShaderDataMap.GPUDetectDataFromSystem, VaoDataFromSystem = initShaderDataMap.VaoDataFromSystem, mMatrixFloatArrayForSend = renderCommandUniformData.mMatrix, program = null;
    for (var i = 0; i < count; i++) {
        var matStartIndex = 16 * i, matEndIndex = matStartIndex + 16, geometryIndex = geometryIndices[i], materialIndex = materialIndices[i], mapCount = getMapCount(materialIndex, MapManagerDataFromSystem), drawMode = EDrawMode.TRIANGLES;
        var shaderIndex = useShader(materialIndex, useShaderName, state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);
        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, GPUDetectDataFromSystem, VaoDataFromSystem);
        updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);
        var uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex], uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;
        sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);
        bindAndUpdate(gl, mapCount, textureStartUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem);
        sendData(gl, mapCount, textureStartUnitIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem, MapManagerDataFromSystem);
        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            if (!hasExtension(getExtensionVao(GPUDetectDataFromSystem))) {
                bindIndexBuffer(gl, geometryIndex, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem);
            }
            drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map