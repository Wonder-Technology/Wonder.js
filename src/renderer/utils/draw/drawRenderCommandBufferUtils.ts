import { Map } from "immutable";
import { EDrawMode } from "../../enum/EDrawMode";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { setClearColor } from "../device/deviceManagerUtils";
import { IMaterialConfig } from "../../data/material_config";
import { IShaderLibGenerator } from "../../data/shaderLib_generator";
import { sendData } from "../texture/mapManagerUtils";
import { IDrawFuncDataMap } from "../../interface/IDraw";
import { BufferUtilsForUnitTest } from "../../../utils/BufferUtilsForUnitTest";
import { WebGL1BasicSendUniformDataDataMap, WebGL1LightSendUniformDataDataMap } from "../../webgl1/type/utilsType";
import { initData as initBasicDrawRenderCommandBufferData } from "./basic/basicDrawRenderCommandBufferUtils";
import { initData as initLightDrawRenderCommandBufferData } from "./light/lightDrawRenderCommandBufferUtils";
import { WebGL2BasicSendUniformDataDataMap, WebGL2LightSendUniformDataDataMap } from "../../webgl2/type/utilsType";

export var clearColor = (gl: WebGLRenderingContext, render_config: IRenderConfig, DeviceManagerDataFromSystem: any) => {
    setClearColor(gl, render_config.clearColor, DeviceManagerDataFromSystem);
}

export var updateSendMatrixFloat32ArrayData = (sourceMatrices: Float32Array, matStartIndex: number, matEndIndex: number, targetMatrices: Float32Array) => {
    for (let i = matStartIndex; i < matEndIndex; i++) {
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }

    return targetMatrices;
}

//todo refactor sendDataMap on type?
export var drawGameObjects = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, textureStartUnitIndex:number, useShaderName:string,  initMaterialShader: Function, drawFuncDataMap:IDrawFuncDataMap, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, sendDataMap:WebGL1BasicSendUniformDataDataMap | WebGL1LightSendUniformDataDataMap | WebGL2BasicSendUniformDataDataMap | WebGL2LightSendUniformDataDataMap, count: number, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, DrawRenderCommandBufferDataFromSystem:any) => {
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
            // DrawRenderCommandBufferDataFromSystem
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
            mMatrices,
            materialIndices,
            geometryIndices
        } = DrawRenderCommandBufferDataFromSystem,
        mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend,
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

        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);

        updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);

        let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
            uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;

        //todo refactor: not pass cameraPositionForSend, normalMatrixFloatArrayForSend? pass RenderCommandUniformData instead
        sendUniformData(gl, shaderIndex, program, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex), sendDataMap, uniformLocationMap, uniformCacheMap);

        bindAndUpdate(gl, mapCount, textureStartUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem);

        sendData(gl, mapCount, textureStartUnitIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem, MapManagerDataFromSystem);

        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            bindIndexBuffer(gl, geometryIndex, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem);

            _drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            _drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
}

var _buildRenderCommandUniformData = (mMatrices: Float32Array, vMatrices: Float32Array, pMatrices: Float32Array, cameraPosition: Float32Array, normalMatrices: Float32Array, materialIndex: number) => {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices,
        cameraPosition: cameraPosition,
        normalMatrix: normalMatrices,
        materialIndex: materialIndex
    }
}

var _drawElements = (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, GeometryDataFromSystem: any) => {
    var startOffset: number = 0,
        count = getIndicesCount(geometryIndex, GeometryDataFromSystem),
        type = getIndexType(GeometryDataFromSystem),
        typeSize = getIndexTypeSize(GeometryDataFromSystem);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
}

var _drawArray = (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getVerticesCount: Function, GeometryDataFromSystem: any) => {
    var startOffset: number = 0,
        count = getVerticesCount(geometryIndex, GeometryDataFromSystem);

    gl.drawArrays(gl[drawMode], startOffset, count);
}

export var createTypeArraysOnlyOnce = (buffer: any, DataBufferConfig: any, createTypeArrays:Function, DrawRenderCommandBufferDataFromSystem: any) => {
    if (BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
        createTypeArrays(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem);
    }

    return DrawRenderCommandBufferDataFromSystem;
}

export var initData = (BasicRenderDataFromSystem: any, LightRenderDataFromSystem: any) => {
    initBasicDrawRenderCommandBufferData(BasicRenderDataFromSystem);
    initLightDrawRenderCommandBufferData(LightRenderDataFromSystem);
}
