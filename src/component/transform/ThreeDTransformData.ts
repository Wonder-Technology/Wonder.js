import { DataBufferConfig } from "../../config/DataBufferConfig";
import { ThreeDTransform } from "./ThreeDTransform";
// import { EntityObjectData } from "../../core/entityObject/EntityObjectData";

export class ThreeDTransformData {
    static get count() {
        return DataBufferConfig.transformDataBufferCount;
    }

    // public static transforms: Array<ThreeDTransform> = null;
    // public static transformIndexInArrayBufferTable: Array<number> = null;
    public static localToWorldMatrices: Float32Array = null;
    public static localPositions: Float32Array = null;
    public static localRotations: Float32Array = null;
    public static localScales: Float32Array = null;

    public static size: number = null;
    public static firstDirtyIndex: number = null;
    public static indexInArrayBuffer: number = null;
    public static notUsedIndexArray: Array<number> = null;

    public static isTranslateMap: object = null;

    // public static relationMap: object = null;
    public static parentMap: ParentMap = null;
    public static childrenMap: ChildrenMap = null;

    public static positionCacheMap:object = null;
    public static localPositionCacheMap:object = null;
    public static localToWorldMatrixCacheMap:object = null;

    public static tempLocalToWorldMatrixMap:object = null;
    public static tempPositionMap:object = null;
    public static tempLocalPositionMap:object = null;

    // public static uidMap:object = null;
    public static transformMap:TransformMap = null;

    public static uid:number = null;

    //todo finish
    public static gameObjectMap: object = null;

    public static buffer: ArrayBuffer = null;
}

export class ThreeDTransformRelationData{
    public static create() {
    	var obj = new this();

    	return obj;
    }

    public indexInArrayBuffer:number = null;
    public parent: ThreeDTransformRelationData = null;
    public children:Array<ThreeDTransformRelationData> = null;
}

export type ParentMap = {
    [uid:string]: ThreeDTransform;
}

export type ChildrenMap = {
    [uid:string]: Array<ThreeDTransform>;
}

export type TransformMap = {
    [uid:string]: ThreeDTransform;
}
