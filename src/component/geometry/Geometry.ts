import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import {
    getVertices as getGeometryVertices,
    getIndices as getGeometryIndices, getConfigData, initGeometry as initGeometrySystem,
    isIndicesBufferNeed32BitsByData, getGameObject,
} from "./GeometrySystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";
import { EDrawMode } from "../../renderer/enum/EDrawMode";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";

@registerClass("Geometry")
export abstract class Geometry extends Component {
}

// export var getDrawMode = (geometry: Geometry) => {
//     return getGeometryDrawMode(geometry.index, GeometryData);
// }

export var getVertices = (geometry: Geometry) => {
    return getGeometryVertices(geometry.index, GeometryData);
}

export var getIndices = (geometry: Geometry) => {
    return getGeometryIndices(geometry.index, GeometryData);
}

export var getGeometryConfigData = (geometry: Geometry) => {
    return getConfigData(geometry.index, GeometryData);
}

export var initGeometry = (geometry: Geometry) => {
    initGeometrySystem(geometry.index, getState(DirectorData));
}

export var getGeometryGameObject = (geometry: Geometry) => {
    return getGameObject(geometry.index, GeometryData);
}
