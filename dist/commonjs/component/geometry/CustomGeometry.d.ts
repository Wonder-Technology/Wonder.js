import { Geometry } from "./Geometry";
export declare class CustomGeometry extends Geometry {
}
export declare const createCustomGeometry: () => any;
export declare const setCustomGeometryVertices: (geometry: Geometry, vertices: Float32Array) => any;
export declare const setCustomGeometryNormals: (geometry: Geometry, normals: Float32Array) => any;
export declare const setCustomGeometryTexCoords: (geometry: Geometry, texCoords: Float32Array) => any;
export declare const setCustomGeometryIndices: (geometry: Geometry, indices: Uint16Array | Uint32Array) => any;
