import { DataBufferConfig } from "../../config/DataBufferConfig";
// import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Vector3 } from "../../math/Vector3";
import { Matrix4 } from "../../math/Matrix4";
import { LinkList } from "./LinkList";
import { Quaternion } from "../../math/Quaternion";
import { Matrix3 } from "../../math/Matrix3";
import { Component } from "../Component";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";

export class ThreeDTransformData {
    static get maxCount() {
        return DataBufferConfig.transformDataBufferCount;
    }

    public static localToWorldMatrices: Float32Array = null;
    public static localPositions: Float32Array = null;
    public static localRotations: Float32Array = null;
    public static localScales: Float32Array = null;

    public static defaultPosition: Vector3 = null;
    public static defaultRotation: Quaternion = null;
    public static defaultScale: Vector3 = null;
    public static defaultLocalToWorldMatrice: Matrix4 = null;

    public static firstDirtyIndex: number = null;
    public static index: number = null;
    public static notUsedIndexLinkList: LinkList<number> = null;

    public static isTranslateMap = null;

    public static parentMap: ThreeDTransformParentMap = null;
    public static childrenMap: ThreeDTransformChildrenMap = null;

    public static cacheMap: ThreeDTransformCacheMap = null;

    public static tempMap: ThreeDTransformTempMap = null;

    public static transformMap: TransformMap = null;

    public static count: number = null;

    public static uid: number = null;
    public static disposeCount: number = null;
    public static isClearCacheMap: boolean = null;

    public static gameObjectMap: ThreeDTransformGameObjectMap = null;

    public static aliveUIDArray: Array<number> = null;

    public static buffer: ArrayBuffer = null;
}

export class ThreeDTransformRelationData {
    public static create() {
        var obj = new this();

        return obj;
    }

    public index: number = null;
    public parent: ThreeDTransformRelationData = null;
    public children: Array<ThreeDTransformRelationData> = null;
}

export type ThreeDTransformParentMap = {
    [uid: number]: Component
}

export type ThreeDTransformChildrenMap = {
    [uid: number]: Array<Component>
}

export type ThreeDTransformGameObjectMap = Map<number, IUIDEntity>

export type TransformMap = {
    [index: number]: Component
}

export type ThreeDTransformCacheMap = {
    [uid: number]: ThreeDTransformCacheData
}

export type ThreeDTransformCacheData = {
    position: Vector3;
    localPosition: Vector3;
    localToWorldMatrix: Matrix4;
    normalMatrix: Matrix3;
}

export type ThreeDTransformTempMap = {
    [uid: number]: ThreeDTransformTempData
}

export type ThreeDTransformTempData = {
    position: Vector3;
    localPosition: Vector3;
    localToWorldMatrix: Matrix4;
}

export type ThreeDTransformPositionMap = {
    [uid: number]: Vector3
}

export type ThreeDTransformLocalPositionMap = {
    [uid: number]: Vector3
}

export type ThreeDTransformLocalToWorldMatrixMap = {
    [uid: number]: Matrix4
}
