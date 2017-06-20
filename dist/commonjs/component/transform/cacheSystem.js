"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var objectUtils_1 = require("../../utils/objectUtils");
var isTransformSystem_1 = require("./isTransformSystem");
var utils_1 = require("./utils");
exports.clearCache = curry_1.default(function (ThreeDTransformData, state) {
    var count = null, cacheMap = null;
    if (ThreeDTransformData.isClearCacheMap) {
        ThreeDTransformData.isClearCacheMap = false;
        return;
    }
    count = ThreeDTransformData.maxCount;
    cacheMap = ThreeDTransformData.cacheMap;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var uid = utils_1.getUID(i, ThreeDTransformData), isTranslate = isTransformSystem_1.getIsTranslate(uid, ThreeDTransformData);
        if (isTranslate) {
            objectUtils_1.deleteVal(uid, cacheMap);
            isTransformSystem_1.setIsTranslate(uid, false, ThreeDTransformData);
        }
    }
});
exports.clearCacheMap = function (ThreeDTransformData) {
    ThreeDTransformData.cacheMap = {};
    ThreeDTransformData.isClearCacheMap = true;
};
exports.getLocalToWorldMatrixCache = function (uid, ThreeTransformData) {
    return _getCache(uid, ThreeTransformData).localToWorldMatrix;
};
exports.setLocalToWorldMatrixCache = function (uid, mat, ThreeTransformData) {
    _getCache(uid, ThreeTransformData).localToWorldMatrix = mat;
};
exports.getPositionCache = function (uid, ThreeTransformData) {
    return _getCache(uid, ThreeTransformData).position;
};
exports.setPositionCache = function (uid, pos, ThreeTransformData) {
    _getCache(uid, ThreeTransformData).position = pos;
};
exports.getLocalPositionCache = function (uid, ThreeTransformData) {
    return _getCache(uid, ThreeTransformData).localPosition;
};
exports.setLocalPositionCache = function (uid, pos, ThreeTransformData) {
    ThreeTransformData.cacheMap[uid].localPosition = pos;
};
var _getCache = function (uid, ThreeTransformData) {
    var cache = ThreeTransformData.cacheMap[uid];
    if (objectUtils_1.isNotValidMapValue(cache)) {
        cache = {};
        ThreeTransformData.cacheMap[uid] = cache;
    }
    return cache;
};
//# sourceMappingURL=cacheSystem.js.map