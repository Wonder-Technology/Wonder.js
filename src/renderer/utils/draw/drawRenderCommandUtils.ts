import { Map } from "immutable";
import { EDrawMode } from "../../enum/EDrawMode";
import { RenderCommandBufferWorkerData } from "../../type/dataType";
import { BufferUtilsForUnitTest } from "../../../utils/BufferUtilsForUnitTest";
import { IRenderConfig } from "../../data/render_config";
import { getMatrix4DataSize } from "../../../utils/typeArrayUtils";

export var clear = (gl: WebGLRenderingContext, clearGL: Function, render_config: IRenderConfig, DeviceManagerDataFromSystemFromSystem: any, data: RenderCommandBufferWorkerData) => {
    clearGL(gl, render_config.clearColor, DeviceManagerDataFromSystemFromSystem);

    return data;
}

export var buildDrawDataMap = (DeviceManagerDataFromSystem: any, MaterialDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, DrawRenderCommandDataFromSystem: any, ) => {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
        ProgramDataFromSystem: ProgramDataFromSystem,
        LocationDataFromSystem: LocationDataFromSystem,
        GLSLSenderDataFromSystem: GLSLSenderDataFromSystem,
        GeometryDataFromSystem: GeometryDataFromSystem,
        ArrayBufferDataFromSystem: ArrayBufferDataFromSystem,
        IndexBufferDataFromSystem: IndexBufferDataFromSystem,
        DrawRenderCommandDataFromSystem: DrawRenderCommandDataFromSystem
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

export var draw = (gl: WebGLRenderingContext, state: Map<any, any>, DataBufferConfig:any, {
    bindIndexBuffer,
    sendAttributeData,
    sendUniformData,
    use,
    hasIndices,
    getIndicesCount,
    getIndexType,
    getIndexTypeSize,
    getVerticesCount
}, {
                       DeviceManagerDataFromSystem,
                       MaterialDataFromSystem,
                       ProgramDataFromSystem,
                       LocationDataFromSystem,
                       GLSLSenderDataFromSystem,
                       GeometryDataFromSystem,
                       ArrayBufferDataFromSystem,
                       IndexBufferDataFromSystem,
                       DrawRenderCommandDataFromSystem
                   }, bufferData: RenderCommandBufferWorkerData) => {
    var mat4Length = getMatrix4DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        mMatrixFloatArrayForSend = DrawRenderCommandDataFromSystem.mMatrixFloatArrayForSend,
        vMatrixFloatArrayForSend = DrawRenderCommandDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = DrawRenderCommandDataFromSystem.pMatrixFloatArrayForSend,
        {
            mMatrices,
            vMatrices,
            pMatrices,
            materialIndices,
            shaderIndices,
            geometryIndices
        } = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, mat4Length, DrawRenderCommandDataFromSystem);

    _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);

    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16,
            shaderIndex = shaderIndices[i],
            geometryIndex = geometryIndices[i],
            drawMode = EDrawMode.TRIANGLES;

        use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

        //todo set state

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

var _buildRenderCommandUniformData = (mMatrices: Float32Array, vMatrices: Float32Array, pMatrices: Float32Array, materialIndex: number) => {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices,
        materialIndex: materialIndex
    }
}

var _createTypeArraysOnlyOnce = (buffer: any, DataBufferConfig:any, mat4Length: number, DrawRenderCommandDataFromSystem: any) => {
    if (BufferUtilsForUnitTest.isDrawRenderCommandDataTypeArrayNotExist(DrawRenderCommandDataFromSystem)) {
        let count = DataBufferConfig.renderCommandBufferCount;

        DrawRenderCommandDataFromSystem.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
        DrawRenderCommandDataFromSystem.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandDataFromSystem.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandDataFromSystem.materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count);
        DrawRenderCommandDataFromSystem.shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count);
        DrawRenderCommandDataFromSystem.geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
    }

    return DrawRenderCommandDataFromSystem;
}

export var initData = (DrawRenderCommandDataFromSystem: any) => {
    var mat4Length = getMatrix4DataSize();

    DrawRenderCommandDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
}
