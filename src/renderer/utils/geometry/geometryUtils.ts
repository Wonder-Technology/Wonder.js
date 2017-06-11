import {
    isNotValidMapValue
} from "../../../utils/objectUtils";
import { EDrawMode } from "../../enum/EDrawMode";
import { EBufferType } from "../../enum/EBufferType";
import { error, info } from "../../../utils/Log";

export var getVertexDataSize = () => 3;

export var getIndexDataSize = () => 1;

export var getUIntArrayClass = (indexType:EBufferType) => {
    switch (indexType){
        case EBufferType.UNSIGNED_SHORT:
            return Uint16Array;
        case EBufferType.INT:
            return Uint32Array;
        default:
            error(true, info.FUNC_INVALID(`indexType:${indexType}`));
            break;
    }
}

export var getIndexType = (GeometryDataFromSystem: any) => {
    return GeometryDataFromSystem.indexType;
}

export var getIndexTypeSize = (GeometryDataFromSystem: any) => {
    return GeometryDataFromSystem.indexTypeSize;
}

export var hasIndices = (index: number, getIndices:Function, GeometryDataFromSystem: any) => {
    var indices = getIndices(index, GeometryDataFromSystem);

    if (isNotValidMapValue(indices)) {
        return false;
    }

    return indices.length > 0;
}

export var getDrawMode = (index: number, GeometryDataFromSystem: any) => {
    return EDrawMode.TRIANGLES;
}

export var getVerticesCount = (index: number, getVertices:Function, GeometryDataFromSystem: any) => {
    return getVertices(index, GeometryDataFromSystem).length;
}

export var getIndicesCount = (index: number, getIndices:Function, GeometryDataFromSystem: any) => {
    return getIndices(index, GeometryDataFromSystem).length;
}

