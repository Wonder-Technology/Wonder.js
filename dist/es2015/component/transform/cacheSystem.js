import curry from "wonder-lodash/curry";
import { deleteVal, isNotValidMapValue } from "../../utils/objectUtils";
import { getIsTranslate, setIsTranslate } from "./isTransformSystem";
import { getUID } from "./utils";
export var clearCache = curry(function (ThreeDTransformData, state) {
    var count = null, cacheMap = null;
    if (ThreeDTransformData.isClearCacheMap) {
        ThreeDTransformData.isClearCacheMap = false;
        return;
    }
    count = ThreeDTransformData.maxCount;
    cacheMap = ThreeDTransformData.cacheMap;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var uid = getUID(i, ThreeDTransformData), isTranslate = getIsTranslate(uid, ThreeDTransformData);
        if (isTranslate) {
            deleteVal(uid, cacheMap);
            setIsTranslate(uid, false, ThreeDTransformData);
        }
    }
});
export var clearCacheMap = function (ThreeDTransformData) {
    ThreeDTransformData.cacheMap = {};
    ThreeDTransformData.isClearCacheMap = true;
};
export var getLocalToWorldMatrixCache = function (uid, ThreeTransformData) {
    return _getCache(uid, ThreeTransformData).localToWorldMatrix;
};
export var setLocalToWorldMatrixCache = function (uid, mat, ThreeTransformData) {
    _getCache(uid, ThreeTransformData).localToWorldMatrix = mat;
};
export var getPositionCache = function (uid, ThreeTransformData) {
    return _getCache(uid, ThreeTransformData).position;
};
export var setPositionCache = function (uid, pos, ThreeTransformData) {
    _getCache(uid, ThreeTransformData).position = pos;
};
export var getLocalPositionCache = function (uid, ThreeTransformData) {
    return _getCache(uid, ThreeTransformData).localPosition;
};
export var setLocalPositionCache = function (uid, pos, ThreeTransformData) {
    ThreeTransformData.cacheMap[uid].localPosition = pos;
};
var _getCache = function (uid, ThreeTransformData) {
    var cache = ThreeTransformData.cacheMap[uid];
    if (isNotValidMapValue(cache)) {
        cache = {};
        ThreeTransformData.cacheMap[uid] = cache;
    }
    return cache;
};
//# sourceMappingURL=cacheSystem.js.map