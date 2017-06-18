import { Map } from "immutable";
import { EDrawMode } from "../../enum/EDrawMode";
import { RenderCommandBufferWorkerData } from "../../type/dataType";
import { BufferUtilsForUnitTest } from "../../../utils/BufferUtilsForUnitTest";
import { IRenderConfig } from "../../data/render_config";
import { getMatrix4DataSize } from "../../../utils/typeArrayUtils";

export var clear = (gl: WebGLRenderingContext, clearGL: Function, render_config: IRenderConfig, DeviceManagerDataFromSystem: any, data: RenderCommandBufferWorkerData) => {
    clearGL(gl, render_config.clearColor, DeviceManagerDataFromSystem);

    return data;
}

export var buildDrawDataMap = (DeviceManagerDataFromSystem: any, MaterialDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, DrawRenderCommandBufferDataFromSystem: any, ) => {
    return {
        DeviceManagerDataFromSystem: DeviceManagerDataFromSystem,
        MaterialDataFromSystem: MaterialDataFromSystem,
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
                       DrawRenderCommandBufferDataFromSystem
                   }, bufferData: RenderCommandBufferWorkerData) => {
    var mat4Length = getMatrix4DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend,
        vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
        {
            mMatrices,
            vMatrices,
            pMatrices,
            materialIndices,
            shaderIndices,
            geometryIndices
        } = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, mat4Length, DrawRenderCommandBufferDataFromSystem);

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

var _createTypeArraysOnlyOnce = (buffer: any, DataBufferConfig:any, mat4Length: number, DrawRenderCommandBufferDataFromSystem: any) => {
    if (BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
        let count = DataBufferConfig.renderCommandBufferCount;

        DrawRenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
        DrawRenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length);
        DrawRenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count);
        DrawRenderCommandBufferDataFromSystem.shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count);
        DrawRenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
    }

    return DrawRenderCommandBufferDataFromSystem;
}

export var initData = (DrawRenderCommandBufferDataFromSystem: any) => {
    var mat4Length = getMatrix4DataSize();

    DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
}
