import { Geometry } from "./Geometry";
export declare class CustomGeometry extends Geometry {
}
export declare var createCustomGeometry: () => any;
export declare var setCustomGeometryVertices: (geometry: Geometry, vertices: Float32Array) => any;
export declare var setCustomGeometryNormals: (geometry: Geometry, normals: Float32Array) => any;
export declare var setCustomGeometryTexCoords: (geometry: Geometry, texCoords: Float32Array) => any;
export declare var setCustomGeometryIndices: (geometry: Geometry, indices: Uint16Array | Uint32Array) => any;
