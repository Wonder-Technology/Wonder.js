import { isNotValidMapValue } from "../../../../../utils/objectUtils";
import { EDrawMode } from "../../../../enum/EDrawMode";
import { EBufferType } from "../../../../enum/EBufferType";
import { Log } from "../../../../../utils/Log";
export var getVertexDataSize = function () { return 3; };
export var getNormalDataSize = function () { return 3; };
export var getTexCoordsDataSize = function () { return 2; };
export var getIndexDataSize = function () { return 1; };
export var getUIntArrayClass = function (indexType) {
    switch (indexType) {
        case EBufferType.UNSIGNED_SHORT:
            return Uint16Array;
        case EBufferType.INT:
            return Uint32Array;
        default:
            Log.error(true, Log.info.FUNC_INVALID("indexType:" + indexType));
            break;
    }
};
export var getIndexType = function (GeometryDataFromSystem) {
    return GeometryDataFromSystem.indexType;
};
export var getIndexTypeSize = function (GeometryDataFromSystem) {
    return GeometryDataFromSystem.indexTypeSize;
};
export var hasIndices = function (index, getIndices, GeometryDataFromSystem) {
    var indices = getIndices(index, GeometryDataFromSystem);
    if (isNotValidMapValue(indices)) {
        return false;
    }
    return indices.length > 0;
};
export var getDrawMode = function (index, GeometryDataFromSystem) {
    return EDrawMode.TRIANGLES;
};
export var getVerticesCount = function (index, getVertices, GeometryDataFromSystem) {
    return getVertices(index, GeometryDataFromSystem).length;
};
export var getIndicesCount = function (index, getIndices, GeometryDataFromSystem) {
    return getIndices(index, GeometryDataFromSystem).length;
};
export var createBufferViews = function (buffer, count, UintArray, GeometryDataFromSystem) {
    GeometryDataFromSystem.vertices = new Float32Array(buffer, 0, count * getVertexDataSize());
    GeometryDataFromSystem.normals = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getVertexDataSize(), count * getVertexDataSize());
    GeometryDataFromSystem.texCoords = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize()), count * getTexCoordsDataSize());
    GeometryDataFromSystem.indices = new UintArray(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize() + getTexCoordsDataSize()), count * getIndexDataSize());
};
//# sourceMappingURL=geometryUtils.js.map