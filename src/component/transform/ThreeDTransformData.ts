import { DataBufferConfig } from "../../config/DataBufferConfig";
import { ThreeDTransform } from "./ThreeDTransform";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";

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

    public static firstDirtyIndex: number = null;
    public static indexInArrayBuffer: number = null;
    public static notUsedIndexArray: Array<number> = null;

    public static isTranslateMap = null;

    public static parentMap: ParentMap = null;
    public static childrenMap: ChildrenMap = null;

    public static positionCacheMap:ThreeDTransformPositionCacheMap = null;
    public static localPositionCacheMap:ThreeDTransformLocalPositionCacheMap = null;
    public static localToWorldMatrixCacheMap:ThreeDTransformLocalToWorldMatrixCacheMap = null;

    public static tempLocalToWorldMatrixMap:object = null;
    public static tempPositionMap:object = null;
    public static tempLocalPositionMap:object = null;

    public static transformMap:TransformMap = null;

    public static uid:number = null;
    public static disposeCount:number = null;
    public static isClearCacheMap:boolean = null;

    public static gameObjectMap:ThreeDTransformGameObjectMap = null;

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
    [uid:number]: ThreeDTransform
}

export type ChildrenMap = {
    [uid:number]: Array<ThreeDTransform>
}

export type ThreeDTransformGameObjectMap = Map<number, GameObject>

export type TransformMap = {
    [index:number]: ThreeDTransform
}

export type ThreeDTransformPositionCacheMap = {
    [uid:number]: Vector3
}

export type ThreeDTransformLocalPositionCacheMap = {
    [uid:number]: Vector3
}

export type ThreeDTransformLocalToWorldMatrixCacheMap = {
    [uid:number]: Matrix4
}
