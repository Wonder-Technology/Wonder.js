import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { GeometryData } from "./GeometryData";
import {
    getVertices as getGeometryVertices,
    getIndices as getGeometryIndices, getConfigData, initGeometry as initGeometrySystem,
    getGameObject, getDrawMode as getGeometryDrawMode, getNormals as getGeometryNormals, getTexCoords as getGeometryTexCoords,
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

export const getDrawMode = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryDrawMode(geometry.index, GeometryData);
})

export const getVertices = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryVertices(geometry.index, GeometryData);
})

export const getNormals = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryNormals(geometry.index, GeometryData);
})

export const getTexCoords = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryTexCoords(geometry.index, GeometryData);
})

export const getIndices = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGeometryIndices(geometry.index, GeometryData);
})

export const getGeometryConfigData = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getConfigData(geometry.index, GeometryData);
})

export const initGeometry = (geometry: Geometry) => {
    initGeometrySystem(geometry.index, getState(DirectorData));
}

export const getGeometryGameObject = requireCheckFunc((geometry: Geometry) => {
    _checkShouldAlive(geometry, GeometryData);
}, (geometry: Geometry) => {
    return getGameObject(geometry.index, GeometryData);
})

const _checkShouldAlive =(geometry: Geometry, GeometryData: any) => {
    checkComponentShouldAlive(geometry, GeometryData, (geometry: Geometry, GeometryData: any) => {
        return isComponentIndexNotRemoved(geometry);
    })
}
