import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { deleteVal } from "../../utils/objectUtils";
import { getIsTranslate, setIsTranslate } from "./isTransformSystem";
import { getUID } from "./utils";

export var clearCache = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = null,
        positionCacheMap = null,
        localPositionCacheMap = null,
        localToWorldMatrixCacheMap = null;

    if(ThreeDTransformData.isClearCacheMap){
        ThreeDTransformData.isClearCacheMap = false;

        return;
    }

    count = ThreeDTransformData.count;
    positionCacheMap = ThreeDTransformData.positionCacheMap;
    localPositionCacheMap = ThreeDTransformData.localPositionCacheMap;
    localToWorldMatrixCacheMap = ThreeDTransformData.localToWorldMatrixCacheMap;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let uid = getUID(i, ThreeDTransformData),
            isTranslate = getIsTranslate(uid, ThreeDTransformData);

        if(isTranslate){
            deleteVal(uid, positionCacheMap);
            deleteVal(uid, localPositionCacheMap);
            deleteVal(uid, localToWorldMatrixCacheMap);

            setIsTranslate(uid, false, ThreeDTransformData);
        }

        //todo clean more cache!
    }
})

export var clearCacheMap = (ThreeDTransformData: any) => {
    ThreeDTransformData.positionCacheMap = {};
    ThreeDTransformData.localPositionCacheMap = {};
    ThreeDTransformData.localToWorldMatrixCacheMap = {};

    ThreeDTransformData.isClearCacheMap = true;
}

export var getCache = (cacheMap:object, key:number) => {
    return cacheMap[key];
}

export var setCache = (cacheMap:object, key:number, val:any) => {
    return cacheMap[key] = val;
}
