import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { deleteVal } from "../../utils/objectUtils";
import { getIsTranslate, setIsTranslate } from "./isTransformSystem";
import { getUID } from "./utils";
import { deleteMapVal } from "../../utils/mapUtils";

export var clearCache = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    // var maxCount = null,
    //     positionCacheMap = null,
    //     localPositionCacheMap = null,
    //     localToWorldMatrixCacheMap = null;
    //
    // // if(ThreeDTransformData.isClearCacheMap){
    // //     ThreeDTransformData.isClearCacheMap = false;
    // //
    // //     return;
    // // }
    //
    // maxCount = ThreeDTransformData.maxCount;
    // positionCacheMap = ThreeDTransformData.positionCacheMap;
    // localPositionCacheMap = ThreeDTransformData.localPositionCacheMap;
    // localToWorldMatrixCacheMap = ThreeDTransformData.localToWorldMatrixCacheMap;
    //
    // for (let i = ThreeDTransformData.firstDirtyIndex; i < maxCount; i++) {
    //     let uid = getUID(i, ThreeDTransformData),
    //         isTranslate = getIsTranslate(uid, ThreeDTransformData);
    //
    //     if(isTranslate){
    //         deleteMapVal(uid, positionCacheMap);
    //         deleteMapVal(uid, localPositionCacheMap);
    //         deleteMapVal(uid, localToWorldMatrixCacheMap);
    //
    //         setIsTranslate(uid, false, ThreeDTransformData);
    //     }
    //
    //     //todo clean more cache!
    // }

    var count = ThreeDTransformData.count,
        positionCacheMap = ThreeDTransformData.positionCacheMap,
        localPositionCacheMap = ThreeDTransformData.localPositionCacheMap,
        localToWorldMatrixCacheMap = ThreeDTransformData.localToWorldMatrixCacheMap;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let uid = getUID(i, ThreeDTransformData),
            isTranslate = getIsTranslate(uid, ThreeDTransformData);

        if(isTranslate){
            deleteMapVal(uid, positionCacheMap);
            deleteMapVal(uid, localPositionCacheMap);
            deleteMapVal(uid, localToWorldMatrixCacheMap);

            setIsTranslate(uid, false, ThreeDTransformData);
        }

        //todo clean more cache!
    }
})

// export var clearCacheMap = (ThreeDTransformData: any) => {
//     ThreeDTransformData.positionCacheMap = {};
//     ThreeDTransformData.localPositionCacheMap = {};
//     ThreeDTransformData.localToWorldMatrixCacheMap = {};
//
//     ThreeDTransformData.isClearCacheMap = true;
// }

export var getCache = <K>(cacheMap:Map<K, any>, key:K) => {
    return cacheMap.get(key);
}

export var setCache = <K, V>(cacheMap:Map<K, V>, key:K, val:V) => {
    return cacheMap.set(key, val);
}
