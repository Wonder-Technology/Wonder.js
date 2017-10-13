import {
    drawArray, drawElements,
    updateSendMatrixFloat32ArrayData
} from "../../../../../utils/draw/drawRenderCommandBufferUtils";
import { sendData } from "../../../../../utils/worker/render_file/texture/mapManagerUtils";
import { EDrawMode } from "../../../../../enum/EDrawMode";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { BasicRenderUniformData, LightRenderUniformData } from "../../../../../type/dataType";
import { IWebGL2DrawFuncDataMap } from "../../../../interface/IDraw";
import {
    IWebGL2BasicSendUniformDataDataMap, IWebGL2DrawDataMap,
    IWebGL2LightSendUniformDataDataMap
} from "../interface/IUtils";

export const drawGameObjects = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, definedStartTextureUnitIndex: number, useShaderName: string, initMaterialShader: Function, drawFuncDataMap: IWebGL2DrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, initShaderDataMap: InitShaderDataMap, sendDataMap: IWebGL2BasicSendUniformDataDataMap | IWebGL2LightSendUniformDataDataMap, renderCommandUniformData: BasicRenderUniformData | LightRenderUniformData, {
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
        GeometryDataFromSystem
        } = drawDataMap,
        {
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
            getStartTextureIndex,
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
            startTextureUnitIndex = getStartTextureIndex(materialIndex),
            drawMode = EDrawMode.TRIANGLES;

        let shaderIndex = useShader(materialIndex, useShaderName, state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);

        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, VaoDataFromSystem);

        updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);

        let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
            uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;

        sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap);

        bindAndUpdate(gl, mapCount, startTextureUnitIndex, definedStartTextureUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem, GPUDetectDataFromSystem);

        sendData(gl, mapCount, startTextureUnitIndex, definedStartTextureUnitIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem, MapManagerDataFromSystem);

        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
}
