import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import { getDrawMode as getGeometryDrawMode, getVertices as getGeometryVertices, getIndices as getGeometryIndices } from "./GeometrySystem";

@registerClass("Geometry")
export abstract class Geometry{
    public index:number = null;
}

export var getDrawMode = (geometry:Geometry) => {
    return getGeometryDrawMode(geometry.index, GeometryData);
}

export var setDrawMode = () => {
    //todo
}

export var getVertices = (geometry:Geometry) => {
    return getGeometryVertices(geometry.index, GeometryData);
}

export var getIndices = (geometry:Geometry) => {
    return getGeometryIndices(geometry.index, GeometryData);
}
