import { DataBufferConfig } from "../../config/DataBufferConfig";
import { ThreeDTransform } from "./ThreeDTransform";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";
import { LinkList } from "./LinkList";

export class ThreeDTransformData {
    static get count() {
        return DataBufferConfig.transformDataBufferCount;
    }

    public static localToWorldMatrices: Float32Array = null;
    public static localPositions: Float32Array = null;
    public static localRotations: Float32Array = null;
    public static localScales: Float32Array = null;

    public static firstDirtyIndex: number = null;
    public static indexInArrayBuffer: number = null;
    public static notUsedIndexLinkList: LinkList<number> = null;

    public static isTranslateMap = null;

    public static parentMap: ParentMap = null;
    public static childrenMap: ChildrenMap = null;

    // public static positionCacheMap:ThreeDTransformPositionMap = null;
    // public static localPositionCacheMap:ThreeDTransformLocalPositionMap = null;
    // public static localToWorldMatrixCacheMap:ThreeDTransformLocalToWorldMatrixMap = null;
    // public static localPositionCacheMap:ThreeDTransformLocalPositionMap = null;
    // public static localToWorldMatrixCacheMap:ThreeDTransformLocalToWorldMatrixMap = null;
    public static cacheMap:ThreeDTransformCacheMap = null;

    // public static tempLocalToWorldMatrixMap:ThreeDTransformLocalToWorldMatrixMap = null;
    // public static tempPositionMap:ThreeDTransformPositionMap = null;
    // public static tempLocalPositionMap:ThreeDTransformLocalPositionMap = null;
    public static tempMap:ThreeDTransformTempMap = null;

    public static transformMap:TransformMap = null;

    public static uid:number = null;
    public static disposeCount:number = null;
    public static isClearCacheMap:boolean = null;

    public static gameObjectMap:ThreeDTransformGameObjectMap = null;

    public static aliveUIDArray:Array<number> = null;

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

export type ThreeDTransformCacheMap = {
    [uid:number]: ThreeDTransformCacheData
}

export type ThreeDTransformCacheData = {
    position:Vector3;
    localPosition:Vector3;
    localToWorldMatrix:Matrix4;
}

export type ThreeDTransformTempMap = {
    [uid:number]: ThreeDTransformTempData
}

export type ThreeDTransformTempData = {
    position:Vector3;
    localPosition:Vector3;
    localToWorldMatrix:Matrix4;
}

export type ThreeDTransformPositionMap = {
    [uid:number]: Vector3
}

export type ThreeDTransformLocalPositionMap = {
    [uid:number]: Vector3
}

export type ThreeDTransformLocalToWorldMatrixMap = {
    [uid:number]: Matrix4
}
