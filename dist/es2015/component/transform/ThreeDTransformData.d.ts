import { ThreeDTransform } from "./ThreeDTransform";
export declare class ThreeDTransformData {
    static readonly count: number;
    static transforms: Array<ThreeDTransform>;
    static transformIndexInArrayBufferTable: Array<number>;
    static localToWorldMatrices: Float32Array;
    static localPositions: Float32Array;
    static localRotations: Float32Array;
    static localScales: Float32Array;
    static relations: Array<ThreeDTransformRelationData>;
    static size: number;
    static firstDirtyIndex: number;
    static indexInArrayBuffer: number;
    static notUsedIndexArray: Array<number>;
    static isTranslateTable: Array<boolean>;
    static buffer: ArrayBuffer;
}
export declare class ThreeDTransformRelationData {
    static create(): ThreeDTransformRelationData;
    indexInArrayBuffer: number;
    parent: ThreeDTransformRelationData;
    children: Array<ThreeDTransformRelationData>;
}
