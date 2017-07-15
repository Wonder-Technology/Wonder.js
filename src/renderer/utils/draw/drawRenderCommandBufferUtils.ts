import { Map } from "immutable";
import { EDrawMode } from "../../enum/EDrawMode";
import { RenderCommandBufferForDrawData } from "../../type/dataType";
import { BufferUtilsForUnitTest } from "../../../utils/BufferUtilsForUnitTest";
import { IRenderConfig } from "../../data/render_config";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../utils/typeArrayUtils";
import { createTypeArrays } from "./renderComandBufferUtils";
import { DrawDataMap } from "../../type/utilsType";

export var clear = (gl: WebGLRenderingContext, clearGL: Function, render_config: IRenderConfig, DeviceManagerDataFromSystem: any, data: RenderCommandBufferForDrawData) => {
    clearGL(gl, render_config.clearColor, DeviceManagerDataFromSystem);

    return data;
}

export var buildDrawDataMap = (DeviceManagerDataFromSystem: any, MaterialDataFromSystem: any, BasicMaterialDataFromSystem: any, LightMaterialDataFromSystem: any, AmbientLightDataFromSystem, DirectionLightDataFromSystem: any, PointLightDataFromSystem:any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, DrawRenderCommandBufferDataFromSystem: any) => {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
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
    }
}

export var buildDrawFuncDataMap = (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function) => {
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
    }
}

export var draw = (gl: WebGLRenderingContext, state: Map<any, any>, DataBufferConfig: any, {
    bindIndexBuffer,
    sendAttributeData,
    sendUniformData,
    use,
    hasIndices,
    getIndicesCount,
    getIndexType,
    getIndexTypeSize,
    getVerticesCount
}, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem,
        BasicMaterialDataFromSystem,
        LightMaterialDataFromSystem,
        AmbientLightDataFromSystem,
        DirectionLightDataFromSystem,
        ProgramDataFromSystem,
        LocationDataFromSystem,
        GLSLSenderDataFromSystem,
        GeometryDataFromSystem,
        ArrayBufferDataFromSystem,
        IndexBufferDataFromSystem,
        DrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
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
    _updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat4Length, normalMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);

    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16,
            shaderIndex = shaderIndices[i],
            geometryIndex = geometryIndices[i],
            drawMode = EDrawMode.TRIANGLES;

        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

        //todo set state

        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);

        _updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);

        sendUniformData(gl, shaderIndex, program, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndices[i]));

        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            bindIndexBuffer(gl, geometryIndex, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem);

            _drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            _drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }

    return state;
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

export var initData = (DrawRenderCommandBufferDataFromSystem: any) => {
    var mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize();

    DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.cameraPositionForSend = new Float32Array(cameraPositionLength);
    DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend = new Float32Array(mat3Length);
}
