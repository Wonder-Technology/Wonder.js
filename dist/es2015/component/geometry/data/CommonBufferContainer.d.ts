import { BufferContainer } from "./BufferContainer";
import { BasicGeometryData } from "./BasicGeometryData";
import { ArrayBuffer } from "../../../renderer/buffer/ArrayBuffer";
import { EBufferDataType } from "../../../renderer/buffer/EBufferDataType";
export declare abstract class CommonBufferContainer extends BufferContainer {
    geometryData: BasicGeometryData;
    private _verticeBuffer;
    protected getVertice(type: EBufferDataType): ArrayBuffer;
}
