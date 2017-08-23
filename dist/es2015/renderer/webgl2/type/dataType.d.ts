export declare type UboBindingPointMap = {
    [uboName: string]: number;
};
export declare type UboSingleBufferDataList = Array<{
    name: string;
    typeArray: Float32Array;
    buffer: WebGLBuffer;
    initBufferDataFunc: Function;
    setBufferDataFunc: Function;
}>;
export declare type UboMultiBufferDataList = Array<{
    name: string;
    typeArrays: Array<Float32Array>;
    buffers: Array<WebGLBuffer>;
    setBufferDataFunc: Function;
}>;
