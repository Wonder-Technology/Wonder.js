import { CommonBuffer } from "./CommonBuffer";
import { EBufferType } from "./EBufferType";
import { EBufferUsage } from "./EBufferUsage";
export declare class ArrayBuffer extends CommonBuffer {
    static create(data: Array<number>, size: number, type?: EBufferType, usage?: EBufferUsage): ArrayBuffer;
    size: number;
    data: Float32Array;
    initWhenCreate(data: Array<number>, size: number, type: EBufferType, usage: EBufferUsage): any;
    resetData(data: Array<number>, size?: number, type?: EBufferType, offset?: number): this;
    private _convertToTypedArray(data, type);
    private _saveData(data, size, type, usage);
}
