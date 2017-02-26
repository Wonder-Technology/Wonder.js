/// <reference types="wonder-commonlib" />
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";
import { GeometryData } from "./GeometryData";
import { Hash } from "wonder-commonlib/dist/es2015/Hash";
import { Buffer } from "../../../renderer/buffer/Buffer";
import { EBufferDataType } from "../../../renderer/buffer/EBufferDataType";
import { EBufferType } from "../../../renderer/buffer/EBufferType";
import { EBufferUsage } from "../../../renderer/buffer/EBufferUsage";
export declare abstract class BufferContainer {
    constructor(entityObject: GameObject);
    geometryData: GeometryData;
    protected entityObject: GameObject;
    protected container: Hash<Buffer>;
    private _indiceBuffer;
    createBuffersFromGeometryData(): void;
    removeCache(type: EBufferDataType): any;
    removeCache(name: string): any;
    getChild(type: EBufferDataType): any;
    getChild(type: EBufferDataType, dataName: string): any;
    init(): void;
    dispose(): void;
    protected abstract getVertice(type: EBufferDataType): any;
    protected createOnlyOnceAndUpdateArrayBuffer(bufferAttriName: string, data: Array<number>, size: number, type?: EBufferType, offset?: number, usage?: EBufferUsage): void;
    protected createOnlyOnceAndUpdateElememntBuffer(bufferAttriName: string, data: Array<number>, type?: EBufferType, offset?: number, usage?: EBufferUsage): void;
    protected hasData(data: Array<number> | null): boolean;
    private _getIndice(type);
}
