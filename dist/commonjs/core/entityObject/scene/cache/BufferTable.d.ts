import { ElementBuffer } from "../../../../renderer/buffer/ElementBuffer";
import { Buffer } from "../../../../renderer/buffer/Buffer";
export declare class BufferTable {
    static lastBindedArrayBufferListUidStr: string;
    static lastBindedElementBuffer: ElementBuffer;
    private static _table;
    static bindIndexBuffer(indexBuffer: ElementBuffer): void;
    static hasBuffer(key: string): boolean;
    static addBuffer(key: string, buffer: Buffer): void;
    static getBuffer<T>(key: string): T;
    static dispose(): void;
    static clearAll(): void;
    static resetBindedArrayBuffer(): void;
    static resetBindedElementBuffer(): void;
}
export declare enum BufferTableKey {
    PROCEDURAL_VERTEX,
    PROCEDURAL_INDEX,
}
