import { GeometryIndicesCacheMap, GeometryVertexCacheMap } from "../../../../definition/type/geometryType";

export class GeometryWorkerData {
    public static verticesCacheMap: GeometryVertexCacheMap = null;
    public static normalsCacheMap: GeometryVertexCacheMap = null;
    public static texCoordsCacheMap: GeometryVertexCacheMap = null;
    public static indicesCacheMap: GeometryIndicesCacheMap = null;

    public static vertices: Float32Array = null;
    public static normals: Float32Array = null;
    public static texCoords: Float32Array = null;
    public static indices: Uint16Array | Uint32Array = null;
}
