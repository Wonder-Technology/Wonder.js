"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSendMatrixFloat32ArrayData = function (sourceMatrices, matStartIndex, matEndIndex, targetMatrices) {
    for (var i = matStartIndex; i < matEndIndex; i++) {
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }
    return targetMatrices;
};
exports.drawElements = function (gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem) {
    var startOffset = 0, count = getIndicesCount(geometryIndex, GeometryDataFromSystem), type = getIndexType(GeometryDataFromSystem), typeSize = getIndexTypeSize(GeometryDataFromSystem);
    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
};
exports.drawArray = function (gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem) {
    var startOffset = 0, count = getVerticesCount(geometryIndex, GeometryDataFromSystem);
    gl.drawArrays(gl[drawMode], startOffset, count);
};
//# sourceMappingURL=drawRenderCommandBufferUtils.js.map