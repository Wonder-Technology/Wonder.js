import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Geometry } from "./Geometry";
import { create, setConfigData } from "./BoxGeometrySystem";
import { GeometryData } from "./GeometryData";

@registerClass("BoxGeometry")
export class BoxGeometry extends Geometry {
}

export var createBoxGeometry = () => {
    return create(GeometryData);
}

export var setBoxGeometryConfigData = (geometry: BoxGeometry, data: BoxGeometryConfigData) => {
    setConfigData(geometry.index, data, GeometryData);
}

export type BoxGeometryConfigDataMap = {
    [index: number]: BoxGeometryConfigData
}

export type BoxGeometryConfigData = {
    width?: number;
    height?: number;
    depth?: number;
    widthSegments?: number;
    heightSegments?: number;
    depthSegments?: number;
}
