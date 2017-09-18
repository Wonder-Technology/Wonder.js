import {
    isNotValidMapValue
} from "../../../../../utils/objectUtils";
import { EDrawMode } from "../../../../enum/EDrawMode";
import { EBufferType } from "../../../../enum/EBufferType";
import { Log } from "../../../../../utils/Log";

export const getVertexDataSize = () => 3;

export const getNormalDataSize = () => 3;

export const getTexCoordsDataSize = () => 2;

export const getIndexDataSize = () => 1;

export const getUIntArrayClass = (indexType: EBufferType) => {
    switch (indexType) {
        case EBufferType.UNSIGNED_SHORT:
            return Uint16Array;
        case EBufferType.INT:
            return Uint32Array;
        default:
            Log.error(true, Log.info.FUNC_INVALID(`indexType:${indexType}`));
            break;
    }
}

export const getIndexType = (GeometryDataFromSystem: any) => {
    return GeometryDataFromSystem.indexType;
}

export const getIndexTypeSize = (GeometryDataFromSystem: any) => {
    return GeometryDataFromSystem.indexTypeSize;
}

export const hasIndices = (index: number, getIndices: Function, GeometryDataFromSystem: any) => {
    var indices = getIndices(index, GeometryDataFromSystem);

    if (isNotValidMapValue(indices)) {
        return false;
    }

    return indices.length > 0;
}

export const getDrawMode = (index: number, GeometryDataFromSystem: any) => {
    return EDrawMode.TRIANGLES;
}

export const getVerticesCount = (index: number, getVertices: Function, GeometryDataFromSystem: any) => {
    return getVertices(index, GeometryDataFromSystem).length;
}

export const getIndicesCount = (index: number, getIndices: Function, GeometryDataFromSystem: any) => {
    return getIndices(index, GeometryDataFromSystem).length;
}

export const createBufferViews = (buffer: any, count: number, UintArray: any, GeometryDataFromSystem: any) => {
    GeometryDataFromSystem.vertices = new Float32Array(buffer, 0, count * getVertexDataSize());
    GeometryDataFromSystem.normals = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * getVertexDataSize(), count * getVertexDataSize());
    GeometryDataFromSystem.texCoords = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize()), count * getTexCoordsDataSize());
    GeometryDataFromSystem.indices = new UintArray(buffer, count * Float32Array.BYTES_PER_ELEMENT * (getVertexDataSize() + getNormalDataSize() + getTexCoordsDataSize()), count * getIndexDataSize());
}
