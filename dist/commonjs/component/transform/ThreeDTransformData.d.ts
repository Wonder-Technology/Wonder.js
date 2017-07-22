import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";
import { LinkList } from "./LinkList";
import { Quaternion } from "../../math/Quaternion";
import { Matrix3 } from "../../math/Matrix3";
import { Component } from "../Component";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
export declare class ThreeDTransformData {
    static readonly maxCount: number;
    static localToWorldMatrices: Float32Array;
    static localPositions: Float32Array;
    static localRotations: Float32Array;
    static localScales: Float32Array;
    static defaultPosition: Vector3;
    static defaultRotation: Quaternion;
    static defaultScale: Vector3;
    static defaultLocalToWorldMatrice: Matrix4;
    static firstDirtyIndex: number;
    static index: number;
    static notUsedIndexLinkList: LinkList<number>;
    static isTranslateMap: any;
    static parentMap: ThreeDTransformParentMap;
    static childrenMap: ThreeDTransformChildrenMap;
    static cacheMap: ThreeDTransformCacheMap;
    static tempMap: ThreeDTransformTempMap;
    static transformMap: TransformMap;
    static count: number;
    static uid: number;
    static disposeCount: number;
    static isClearCacheMap: boolean;
    static gameObjectMap: ThreeDTransformGameObjectMap;
    static aliveUIDArray: Array<number>;
    static buffer: ArrayBuffer;
}
export declare class ThreeDTransformRelationData {
    static create(): ThreeDTransformRelationData;
    index: number;
    parent: ThreeDTransformRelationData;
    children: Array<ThreeDTransformRelationData>;
}
export declare type ThreeDTransformParentMap = {
    [uid: number]: Component;
};
export declare type ThreeDTransformChildrenMap = {
    [uid: number]: Array<Component>;
};
export declare type ThreeDTransformGameObjectMap = Map<number, IUIDEntity>;
export declare type TransformMap = {
    [index: number]: Component;
};
export declare type ThreeDTransformCacheMap = {
    [uid: number]: ThreeDTransformCacheData;
};
export declare type ThreeDTransformCacheData = {
    position: Vector3;
    localPosition: Vector3;
    localToWorldMatrix: Matrix4;
    normalMatrix: Matrix3;
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
