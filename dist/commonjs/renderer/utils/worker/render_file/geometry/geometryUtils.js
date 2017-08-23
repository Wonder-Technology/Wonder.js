"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("../../../../../utils/objectUtils");
var EDrawMode_1 = require("../../../../enum/EDrawMode");
var EBufferType_1 = require("../../../../enum/EBufferType");
var Log_1 = require("../../../../../utils/Log");
exports.getVertexDataSize = function () { return 3; };
exports.getNormalDataSize = function () { return 3; };
exports.getTexCoordsDataSize = function () { return 2; };
exports.getIndexDataSize = function () { return 1; };
exports.getUIntArrayClass = function (indexType) {
    switch (indexType) {
        case EBufferType_1.EBufferType.UNSIGNED_SHORT:
            return Uint16Array;
        case EBufferType_1.EBufferType.INT:
            return Uint32Array;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("indexType:" + indexType));
            break;
    }
};
exports.getIndexType = function (GeometryDataFromSystem) {
    return GeometryDataFromSystem.indexType;
};
exports.getIndexTypeSize = function (GeometryDataFromSystem) {
    return GeometryDataFromSystem.indexTypeSize;
};
exports.hasIndices = function (index, getIndices, GeometryDataFromSystem) {
    var indices = getIndices(index, GeometryDataFromSystem);
    if (objectUtils_1.isNotValidMapValue(indices)) {
        return false;
    }
    return indices.length > 0;
};
exports.getDrawMode = function (index, GeometryDataFromSystem) {
    return EDrawMode_1.EDrawMode.TRIANGLES;
};
exports.getVerticesCount = function (index, getVertices, GeometryDataFromSystem) {
    return getVertices(index, GeometryDataFromSystem).length;
};
exports.getIndicesCount = function (index, getIndices, GeometryDataFromSystem) {
    return getIndices(index, GeometryDataFromSystem).length;
};
exports.createBufferViews = function (buffer, count, UintArray, GeometryDataFromSystem) {
    GeometryDataFromSystem.vertices = new Float32Array(buffer, 0, count * exports.getVertexDataSize());
    GeometryDataFromSystem.normals = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * exports.getVertexDataSize(), count * exports.getVertexDataSize());
    GeometryDataFromSystem.texCoords = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (exports.getVertexDataSize() + exports.getNormalDataSize()), count * exports.getTexCoordsDataSize());
    GeometryDataFromSystem.indices = new UintArray(buffer, count * Float32Array.BYTES_PER_ELEMENT * (exports.getVertexDataSize() + exports.getNormalDataSize() + exports.getTexCoordsDataSize()), count * exports.getIndexDataSize());
};
//# sourceMappingURL=geometryUtils.js.map