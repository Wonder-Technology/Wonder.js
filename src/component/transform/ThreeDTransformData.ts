import { DataBufferConfig } from "../../config/DataBufferConfig";
import { ThreeDTransform } from "./ThreeDTransform";
import { Matrix4 } from "../../math/Matrix4";

export class ThreeDTransformData {
    static get count() {
        return DataBufferConfig.transformDataBufferCount;
    }

    //todo check:is this affect performance when with buffer data?
    public static transforms: Array<ThreeDTransform> = null;
    public static transformIndexInArrayBufferTable: object = null;
    public static localToWorldMatrices: Float32Array = null;
    public static localPositions: Float32Array = null;
    public static localRotations: Float32Array = null;
    public static localScales: Float32Array = null;
    // public static parents: Uint16Array = null;
    // public static firstChildren: Uint16Array = null;
    // public static nextSiblings: Uint16Array = null;
    public static relations: Array<ThreeDTransformRelationData> = null;
    // public static firstChildren: Uint16Array = null;
    // public static nextSiblings: Uint16Array = null;

    public static size: number = null;
    public static firstDirtyIndex: number = null;
    public static indexInArrayBuffer: number = null;
    public static notUsedIndexArray: Array<number> = null;
    // public static localToWorldMatrixPool:Array<Matrix4> = null;

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
