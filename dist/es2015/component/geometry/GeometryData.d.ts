import { EBufferType } from "../../renderer/enum/EBufferType";
import { ComponentGameObjectMap } from "../ComponentData";
import { ComponentMap } from "../ComponentSystem";
export declare class GeometryData {
    static index: number;
    static count: number;
    static verticesMap: GeometryVerticesMap;
    static indicesMap: GeometryIndicesMap;
    static indexType: EBufferType;
    static indexTypeSize: number;
    static configDataMap: object;
    static computeDataFuncMap: GeometryComputeDataFuncMap;
    static gameObjectMap: ComponentGameObjectMap;
    static geometryMap: ComponentMap;
}
export declare type GeometryVerticesMap = Array<Float32Array>;
export declare type GeometryIndicesMap = Array<Uint16Array> | Array<Uint32Array>;
export declare type GeometryComputeDataFuncMap = {
    [index: number]: (index: number, GeometryData: any) => GeometryComputeData;
};
export declare type GeometryComputeData = {
    vertices: Float32Array;
    indices: Uint16Array | Uint32Array;
};
