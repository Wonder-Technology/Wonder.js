import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import {
    bindIndexBuffer, buildSendUniformDataDataMap, sendAttributeData, sendUniformData, use
} from "../../../shader/ShaderSystem";
import { getIndexType, getIndicesCount, hasIndices, getIndexTypeSize, getVerticesCount } from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
import { EDrawMode } from "../../../enum/EDrawMode";
import { useShader } from "../../../../component/material/MaterialSystem";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../utils/typeArrayUtils";
import { BufferUtilsForUnitTest } from "../../../../utils/BufferUtilsForUnitTest";
import { createTypeArrays } from "../../../utils/draw/renderComandBufferUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../data/material_config";
// import {
//     getUniformData, sendFloat1, sendFloat3, sendInt, sendMatrix3, sendMatrix4,
//     sendVector3
// } from "../../../shader/glslSender/GLSLSenderSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../../component/light/DirectionLightSystem";
// import {
//     getPosition as getPointLightPosition,
//     getColorArr3 as getPointLightColorArr3, getConstant,
//     getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
// } from "../../../../component/light/PointLightSystem";
// import { ThreeDTransformData } from "../../../../component/transform/ThreeDTransformData";
// import { GameObjectData } from "../../../../core/entityObject/gameObject/GameObjectData";
import { sendData } from "../../../utils/texture/mapManagerUtils";
import { directlySendUniformData } from "../../../utils/shader/program/programUtils";
import { clear } from "../../../utils/draw/drawRenderCommandBufferUtils";
import { clear as clearGL } from "../../../utils/device/deviceManagerUtils";
import { IRenderConfig } from "../../../data/render_config";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem,
            TextureDataFromSystem,
            TextureCacheDataFromSystem,
            MapManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            GeometryDataFromSystem,
            ArrayBufferDataFromSystem,
            IndexBufferDataFromSystem,
            DrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend,
        vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
        cameraPositionForSend = DrawRenderCommandBufferDataFromSystem.cameraPositionForSend,
        normalMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend,
        {
            mMatrices,
            vMatrices,
            pMatrices,
            cameraPositions,
            normalMatrices,
            materialIndices,
            shaderIndices,
            geometryIndices
        } = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem),
        program: WebGLProgram = null;

    _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);

    let sendDataMap = buildSendUniformDataDataMap(drawDataMap);

    clear(gl, clearGL, render_config, DeviceManagerDataFromSystem);

    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16,
            geometryIndex = geometryIndices[i],
            materialIndex = materialIndices[i],
            mapCount = getMapCount(materialIndex, MapManagerDataFromSystem),
            drawMode = EDrawMode.TRIANGLES;

        //todo move system method to utils
        let shaderIndex = useShader(materialIndex, "FrontRenderLight", state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);

        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);

        _updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);

        let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
            uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;

        sendUniformData(gl, shaderIndex, program, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex), sendDataMap, uniformLocationMap, uniformCacheMap);


        let textureStartUnitIndex = 0;

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

    return state;
};

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

var _updateSendMatrixFloat32ArrayData = (sourceMatrices: Float32Array, matStartIndex: number, matEndIndex: number, targetMatrices: Float32Array) => {
    for (let i = matStartIndex; i < matEndIndex; i++) {
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }

    return targetMatrices;
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

var _createTypeArraysOnlyOnce = (buffer: any, DataBufferConfig: any, DrawRenderCommandBufferDataFromSystem: any) => {
    if (BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
        createTypeArrays(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem);
    }

    return DrawRenderCommandBufferDataFromSystem;
}
//
// //todo refactor with ShaderSystem->126
// var _getPosition = (index: number, PointLightDataFromSystem:any) => {
//     //todo refactor: drawDataMap add ThreeDTransformData, GameObjectData?
//
//     return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
// }
