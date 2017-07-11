import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import {
    getVertices as getGeometryVertices,
    getIndices as getGeometryIndices, getConfigData, initGeometry as initGeometrySystem,
    getGameObject, getDrawMode as getGeometryDrawMode, getNormals as getGeometryNormals,
} from "./GeometrySystem";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Component } from "../Component";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkComponentShouldAlive, isComponentIndexNotRemoved } from "../ComponentSystem";

@registerClass("Geometry")
export abstract class Geometry extends Component {
}

export var getDrawMode = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryDrawMode(geometry.index, GeometryData);
})

export var getVertices = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryVertices(geometry.index, GeometryData);
})

export var getNormals = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryNormals(geometry.index, GeometryData);
})

export var getIndices = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryIndices(geometry.index, GeometryData);
})

export var getGeometryConfigData = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getConfigData(geometry.index, GeometryData);
})

export var initGeometry = (geometry: Geometry) => {
    initGeometrySystem(geometry.index, getState(DirectorData));
}

export var getGeometryGameObject = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGameObject(geometry.index, GeometryData);
})

var _checkShouldAlive = (geometry: Geometry, GeometryData: any) => {
    checkComponentShouldAlive(geometry, GeometryData, (geometry: Geometry, GeometryData: any) => {
        return isComponentIndexNotRemoved(geometry);
    })
}
