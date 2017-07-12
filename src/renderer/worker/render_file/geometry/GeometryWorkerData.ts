import { GeometryIndicesCacheMap, GeometryVerticesCacheMap } from "../../../../definition/type/geometryType";

export class GeometryWorkerData {
    public static verticesCacheMap: GeometryVerticesCacheMap = null;
    public static normalsCacheMap: GeometryVerticesCacheMap = null;
    public static indicesCacheMap: GeometryIndicesCacheMap = null;

    public static vertices: Float32Array = null;
    public static normals: Float32Array = null;
    public static indices: Uint16Array | Uint32Array = null;
}
