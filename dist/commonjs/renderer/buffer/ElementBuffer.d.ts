import { CommonBuffer } from "./CommonBuffer";
import { EBufferType } from "./EBufferType";
import { EBufferUsage } from "./EBufferUsage";
export declare class ElementBuffer extends CommonBuffer {
    static create(data: Array<number>, type?: EBufferType, usage?: EBufferUsage): ElementBuffer;
    readonly typeSize: number;
    data: Uint16Array | Uint32Array;
    initWhenCreate(data: Array<number>, type: EBufferType, usage: EBufferUsage): any;
    resetData(data: Array<number>, type?: EBufferType, offset?: number): this;
    private _convertToTypedArray(isNeed32Bits, data);
    private _checkIsNeed32Bits(indices, type);
    private _getType(isNeed32Bits, type);
    private _saveData(data, type, usage);
}
