import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { deleteVal, isNotValidMapValue } from "../../utils/objectUtils";
import { getIsTranslate, setIsTranslate } from "./isTransformSystem";
import { getUID } from "./utils";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { ThreeDTransformCacheMap } from "./ThreeDTransformData";

export var clearCache = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count: number = null,
        cacheMap: ThreeDTransformCacheMap = null;

    if (ThreeDTransformData.isClearCacheMap) {
        ThreeDTransformData.isClearCacheMap = false;

        return;
    }

    count = ThreeDTransformData.maxCount;
    cacheMap = ThreeDTransformData.cacheMap;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let uid = getUID(i, ThreeDTransformData),
            isTranslate = getIsTranslate(uid, ThreeDTransformData);

        if (isTranslate) {
            deleteVal(uid, cacheMap);

            setIsTranslate(uid, false, ThreeDTransformData);
        }

        //todo clean more cache!
    }
})

export var clearCacheMap = (ThreeDTransformData: any) => {
    ThreeDTransformData.cacheMap = {};

    ThreeDTransformData.isClearCacheMap = true;
}

export var getLocalToWorldMatrixCache = (uid: number, ThreeTransformData: any) => {
    return _getCache(uid, ThreeTransformData).localToWorldMatrix;
}

export var setLocalToWorldMatrixCache = (uid: number, mat: Matrix4, ThreeTransformData: any) => {
    _getCache(uid, ThreeTransformData).localToWorldMatrix = mat;
}

export var getPositionCache = (uid: number, ThreeTransformData: any) => {
    return _getCache(uid, ThreeTransformData).position;
}

export var setPositionCache = (uid: number, pos: Vector3, ThreeTransformData: any) => {
    _getCache(uid, ThreeTransformData).position = pos;
}

export var getLocalPositionCache = (uid: number, ThreeTransformData: any) => {
    return _getCache(uid, ThreeTransformData).localPosition;
}

export var setLocalPositionCache = (uid: number, pos: Vector3, ThreeTransformData: any) => {
    ThreeTransformData.cacheMap[uid].localPosition = pos;
}

export var getNormalMatrixCache = (uid: number, ThreeTransformData: any) => {
    return _getCache(uid, ThreeTransformData).normalMatrix;
}

export var setNormalMatrixCache = (uid: number, mat:Matrix4, ThreeTransformData: any) => {
    _getCache(uid, ThreeTransformData).normalMatrix = mat;
}

var _getCache = (uid: number, ThreeTransformData: any) => {
    var cache = ThreeTransformData.cacheMap[uid];

    if (isNotValidMapValue(cache)) {
        cache = {};
        ThreeTransformData.cacheMap[uid] = cache;
    }

    return cache;
}
