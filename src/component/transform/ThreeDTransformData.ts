import { DataBufferConfig } from "../../config/DataBufferConfig";
import { ThreeDTransform } from "./ThreeDTransform";

export class ThreeDTransformData {
    static get count() {
        return DataBufferConfig.transformDataBufferCount;
    }

    //todo check:is this affect performance when with buffer data?
    public static transforms: Array<ThreeDTransform> = [];
    public static transformIndexInArrayBufferTable: object = {};
    public static localToWorldMatrices: Float32Array = null;
    public static localPositions: Float32Array = null;
    public static localRotations: Float32Array = null;
    public static localScales: Float32Array = null;
    public static parents: Uint16Array = null;
    public static firstChildren: Uint16Array = null;
    public static nextSiblings: Uint16Array = null;
    public static size: number = null;
    public static firstDirtyIndex: number = null;
    public static indexInArrayBuffer: number = null;
    public static notUsedIndexArray: Array<number> = [];
    public static buffer: ArrayBuffer = null;
}

