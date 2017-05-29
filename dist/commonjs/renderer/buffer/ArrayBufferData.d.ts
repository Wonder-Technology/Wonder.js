import { EBufferType } from "../enum/EBufferType";
export declare class ArrayBufferData {
    static buffers: Array<WebGLBuffer>;
    static bufferDataMap: ArrayBufferDataMap;
}
export declare type ArrayBufferDataMap = {
    [geometryIndex: number]: {
        size: number;
        type: EBufferType;
    };
};
