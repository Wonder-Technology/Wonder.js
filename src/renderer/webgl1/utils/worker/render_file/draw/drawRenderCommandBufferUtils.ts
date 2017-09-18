import {
    drawArray, drawElements,
    updateSendMatrixFloat32ArrayData
} from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { IWebGL1DrawFuncDataMap } from "../../../../interface/IDraw";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { BasicRenderUniformData, LightRenderUniformData } from "../../../../../type/dataType";
import { EDrawMode } from "../../../../../enum/EDrawMode";
import { sendData } from "../../../../../utils/worker/render_file/texture/mapManagerUtils";
import { Map } from "immutable";
import { hasExtension } from "../../../../../utils/device/gpuDetectUtils";
import { getExtensionVao } from "../device/gpuDetectUtils";
import {
    IWebGL1BasicSendUniformDataDataMap, IWebGL1DrawDataMap,
    IWebGL1LightSendUniformDataDataMap
} from "../interface/IUtils";

export const buildDrawFuncDataMap = (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, useShader: Function) => {
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
    }
}

export const drawGameObjects = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, textureStartUnitIndex: number, useShaderName: string, initMaterialShader: Function, drawFuncDataMap: IWebGL1DrawFuncDataMap, drawDataMap: IWebGL1DrawDataMap, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL1BasicSendUniformDataDataMap | IWebGL1LightSendUniformDataDataMap, renderCommandUniformData: BasicRenderUniformData | LightRenderUniformData, {
    renderCommandBufferData: {
        mMatrices,
    materialIndices,
    geometryIndices
    },
    count
}) => {
    var {
            TextureDataFromSystem,
        TextureCacheDataFromSystem,
        MapManagerDataFromSystem,
        ProgramDataFromSystem,
        LocationDataFromSystem,
        GLSLSenderDataFromSystem,
        GeometryDataFromSystem,
        ArrayBufferDataFromSystem,
        IndexBufferDataFromSystem
        } = drawDataMap,
        {
            bindIndexBuffer,
            sendAttributeData,
            sendUniformData,
            directlySendUniformData,
            use,
            hasIndices,
            getIndicesCount,
            getIndexType,
            getIndexTypeSize,
            getVerticesCount,
            getMapCount,
            bindAndUpdate,
            useShader
        } = drawFuncDataMap,
        {
            GPUDetectDataFromSystem,
            VaoDataFromSystem
        } = initShaderDataMap,
        mMatrixFloatArrayForSend = renderCommandUniformData.mMatrix,
        program: WebGLProgram = null;

    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16,
            geometryIndex = geometryIndices[i],
            materialIndex = materialIndices[i],
            mapCount = getMapCount(materialIndex, MapManagerDataFromSystem),
            drawMode = EDrawMode.TRIANGLES;

        let shaderIndex = useShader(materialIndex, useShaderName, state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);

        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, GPUDetectDataFromSystem, VaoDataFromSystem);

        updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);

        let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
            uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;

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
}
