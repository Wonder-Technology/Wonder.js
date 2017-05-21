import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import {
    getDrawMode as getGeometryDrawMode, setDrawMode as setGeometryDrawMode, getVertices as getGeometryVertices,
    getIndices as getGeometryIndices, getConfigData, initGeometry as initGeometrySystem, isIndicesBufferNeed32BitsByData,
} from "./GeometrySystem";
import { EDrawMode } from "../../renderer/enum/EDrawMode";

@registerClass("Geometry")
export abstract class Geometry{
    public index:number = null;
}

export var getDrawMode = (geometry:Geometry) => {
    return getGeometryDrawMode(geometry.index, GeometryData);
}

export var setDrawMode = (geometry:Geometry, drawMode:EDrawMode) => {
    setGeometryDrawMode(geometry.index, drawMode, GeometryData);
}

export var getVertices = (geometry:Geometry) => {
    return getGeometryVertices(geometry.index, GeometryData);
}

export var getIndices = (geometry:Geometry) => {
    return getGeometryIndices(geometry.index, GeometryData);
}

export var getGeometryConfigData = (geometry:Geometry) => {
    return getConfigData(geometry.index, GeometryData);
}

export var initGeometry = (geometry:Geometry) => {
    initGeometrySystem(geometry.index, isIndicesBufferNeed32BitsByData(GeometryData), GeometryData.computeDataFuncMap, GeometryData.verticesMap, GeometryData.indicesMap, GeometryData);
}
