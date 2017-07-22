export declare type GeometryWorkerInfoList = Array<{
    index: number;
    startIndex: number;
    endIndex: number;
}>;
export declare type GeometryVertexCacheMap = {
    [index: number]: Float32Array;
};
export declare type GeometryNormalsCacheMap = {
    [index: number]: Float32Array;
};
export declare type GeometryIndicesCacheMap = {
    [index: number]: Uint16Array | Uint32Array;
};
export declare type GeometryInfoList = Array<GeometryInfo>;
export declare type GeometryInfo = {
    startIndex: number;
    endIndex: number;
};
export declare type GetArrayBufferDataFuncMap = {
    getVertices: Function;
    getNormals: Function;
    getTexCoords: Function;
};
