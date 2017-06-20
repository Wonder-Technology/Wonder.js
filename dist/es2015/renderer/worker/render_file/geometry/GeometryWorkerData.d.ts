import { GeometryIndicesCacheMap, GeometryVerticesCacheMap } from "../../../../definition/type/geometryType";
export declare class GeometryWorkerData {
    static verticesCacheMap: GeometryVerticesCacheMap;
    static indicesCacheMap: GeometryIndicesCacheMap;
    static vertices: Float32Array;
    static indices: Uint16Array | Uint32Array;
}
