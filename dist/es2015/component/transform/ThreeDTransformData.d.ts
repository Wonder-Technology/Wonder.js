import { ThreeDTransform } from "./ThreeDTransform";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";
import { LinkList } from "./LinkList";
export declare class ThreeDTransformData {
    static readonly count: number;
    static localToWorldMatrices: Float32Array;
    static localPositions: Float32Array;
    static localRotations: Float32Array;
    static localScales: Float32Array;
    static firstDirtyIndex: number;
    static indexInArrayBuffer: number;
    static notUsedIndexLinkList: LinkList<number>;
    static isTranslateMap: any;
    static parentMap: ParentMap;
    static childrenMap: ChildrenMap;
    static cacheMap: ThreeDTransformCacheMap;
    static tempMap: ThreeDTransformTempMap;
    static transformMap: TransformMap;
    static uid: number;
    static disposeCount: number;
    static isClearCacheMap: boolean;
    static gameObjectMap: ThreeDTransformGameObjectMap;
    static aliveUIDArray: Array<number>;
    static buffer: ArrayBuffer;
}
export declare class ThreeDTransformRelationData {
    static create(): ThreeDTransformRelationData;
    indexInArrayBuffer: number;
    parent: ThreeDTransformRelationData;
    children: Array<ThreeDTransformRelationData>;
}
export declare type ParentMap = {
    [uid: number]: ThreeDTransform;
};
export declare type ChildrenMap = {
    [uid: number]: Array<ThreeDTransform>;
};
export declare type ThreeDTransformGameObjectMap = Map<number, GameObject>;
export declare type TransformMap = {
    [index: number]: ThreeDTransform;
};
export declare type ThreeDTransformCacheMap = {
    [uid: number]: ThreeDTransformCacheData;
};
export declare type ThreeDTransformCacheData = {
    position: Vector3;
    localPosition: Vector3;
    localToWorldMatrix: Matrix4;
};
export declare type ThreeDTransformTempMap = {
    [uid: number]: ThreeDTransformTempData;
};
export declare type ThreeDTransformTempData = {
    position: Vector3;
    localPosition: Vector3;
    localToWorldMatrix: Matrix4;
};
export declare type ThreeDTransformPositionMap = {
    [uid: number]: Vector3;
};
export declare type ThreeDTransformLocalPositionMap = {
    [uid: number]: Vector3;
};
export declare type ThreeDTransformLocalToWorldMatrixMap = {
    [uid: number]: Matrix4;
};
