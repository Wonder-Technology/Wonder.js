import { GeometryIndicesCacheMap, GeometryVertexCacheMap } from "../../../../definition/type/geometryType";
export declare class GeometryWorkerData {
    static verticesCacheMap: GeometryVertexCacheMap;
    static normalsCacheMap: GeometryVertexCacheMap;
    static texCoordsCacheMap: GeometryVertexCacheMap;
    static indicesCacheMap: GeometryIndicesCacheMap;
    static vertices: Float32Array;
    static normals: Float32Array;
    static texCoords: Float32Array;
    static indices: Uint16Array | Uint32Array;
}
