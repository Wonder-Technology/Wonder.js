import { EDrawMode } from "../../enum/EDrawMode";

export var updateSendMatrixFloat32ArrayData = (sourceMatrices: Float32Array, matStartIndex: number, matEndIndex: number, targetMatrices: Float32Array) => {
    for (let i = matStartIndex; i < matEndIndex; i++) {
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }

    return targetMatrices;
}

export var drawElements = (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, GeometryDataFromSystem: any) => {
    var startOffset: number = 0,
        count = getIndicesCount(geometryIndex, GeometryDataFromSystem),
        type = getIndexType(GeometryDataFromSystem),
        typeSize = getIndexTypeSize(GeometryDataFromSystem);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
}

export var drawArray = (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getVerticesCount: Function, GeometryDataFromSystem: any) => {
    var startOffset: number = 0,
        count = getVerticesCount(geometryIndex, GeometryDataFromSystem);

    gl.drawArrays(gl[drawMode], startOffset, count);
}
