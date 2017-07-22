import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Geometry } from "./Geometry";
import { create } from "./CustomGeometrySystem";
import { GeometryData } from "./GeometryData";
import { setIndices, setNormals, setTexCoords, setVertices } from "./GeometrySystem";

@registerClass("CustomGeometry")
export class CustomGeometry extends Geometry {
}

export var createCustomGeometry = () => {
    return create(GeometryData);
}

export var setCustomGeometryVertices = (geometry: Geometry, vertices: Float32Array) => {
    return setVertices(geometry.index, vertices, GeometryData);
}

export var setCustomGeometryNormals = (geometry: Geometry, normals: Float32Array) => {
    return setNormals(geometry.index, normals, GeometryData);
}

export var setCustomGeometryTexCoords = (geometry: Geometry, texCoords: Float32Array) => {
    return setTexCoords(geometry.index, texCoords, GeometryData);
}

export var setCustomGeometryIndices = (geometry: Geometry, indices: Uint16Array | Uint32Array) => {
    return setIndices(geometry.index, indices, GeometryData);
}
