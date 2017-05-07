import { DataBufferConfig } from "../../config/DataBufferConfig";
import { ThreeDTransform } from "./ThreeDTransform";

export class ThreeDTransformData {
    static get count() {
        return DataBufferConfig.transformDataBufferCount;
    }

    //todo check:is this affect performance when with buffer data?
    public static transforms: Array<ThreeDTransform> = null;
    public static transformIndexInArrayBufferTable: Array<number> = null;
    public static localToWorldMatrices: Float32Array = null;
    public static localPositions: Float32Array = null;
    public static localRotations: Float32Array = null;
    public static localScales: Float32Array = null;
    public static relations: Array<ThreeDTransformRelationData> = null;

    public static size: number = null;
    public static firstDirtyIndex: number = null;
    public static indexInArrayBuffer: number = null;
    public static notUsedIndexArray: Array<number> = null;

    public static isTranslateTable: Array<boolean> = null;

    public static buffer: ArrayBuffer = null;
}

export class ThreeDTransformRelationData {
    public static create() {
        var obj = new this();

        return obj;
    }

    public indexInArrayBuffer: number = null;
    public parent: ThreeDTransformRelationData = null;
    public children: Array<ThreeDTransformRelationData> = null;
}
