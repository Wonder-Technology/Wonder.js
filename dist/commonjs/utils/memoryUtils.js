"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var objectUtils_1 = require("./objectUtils");
var cacheSystem_1 = require("../component/transform/cacheSystem");
var TagSystem_1 = require("../component/tag/TagSystem");
var arrayUtils_1 = require("./arrayUtils");
var MemoryConfig_1 = require("../config/MemoryConfig");
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var contractUtils_1 = require("../component/utils/contractUtils");
var typeArrayUtils_1 = require("./typeArrayUtils");
var GameObjectSystem_1 = require("../core/entityObject/gameObject/GameObjectSystem");
var JudgeUtils_1 = require("./JudgeUtils");
var ThreeDTransformSystem_1 = require("../component/transform/ThreeDTransformSystem");
var hierarchySystem_1 = require("../component/transform/hierarchySystem");
exports.isDisposeTooManyComponents = function (disposeCount, maxComponentDisposeCount) {
    if (maxComponentDisposeCount === void 0) { maxComponentDisposeCount = MemoryConfig_1.MemoryConfig.maxComponentDisposeCount; }
    return disposeCount >= maxComponentDisposeCount;
};
var _setMapVal = function (map, key, val) {
    map[key] = val;
};
var _setArrayVal = function (arr, index, val) {
    arr[index] = val;
};
exports.reAllocateThreeDTransform = function (ThreeDTransformData) {
    var val = null, newParentMap = objectUtils_1.createMap(), newChildrenMap = objectUtils_1.createMap(), newIsTranslateMap = objectUtils_1.createMap(), newGameObjectMap = objectUtils_1.createMap(), newTempMap = objectUtils_1.createMap(), newAliveUIDArray = [], aliveUIDArray = ThreeDTransformData.aliveUIDArray, parentMap = ThreeDTransformData.parentMap, childrenMap = ThreeDTransformData.childrenMap, isTranslateMap = ThreeDTransformData.isTranslateMap, gameObjectMap = ThreeDTransformData.gameObjectMap, tempMap = ThreeDTransformData.tempMap;
    cacheSystem_1.clearCacheMap(ThreeDTransformData);
    var disposedUIDArr = [], actualAliveUIDArr = [];
    for (var _i = 0, aliveUIDArray_1 = aliveUIDArray; _i < aliveUIDArray_1.length; _i++) {
        var uid = aliveUIDArray_1[_i];
        val = childrenMap[uid];
        if (objectUtils_1.isNotValidMapValue(val)) {
            disposedUIDArr.push(uid);
        }
        else {
            actualAliveUIDArr.push(uid);
        }
    }
    _cleanChildrenMap(disposedUIDArr, parentMap, ThreeDTransformSystem_1.isAlive, hierarchySystem_1.getChildren, hierarchySystem_1.setChildren, ThreeDTransformData);
    for (var _a = 0, actualAliveUIDArr_1 = actualAliveUIDArr; _a < actualAliveUIDArr_1.length; _a++) {
        var uid = actualAliveUIDArr_1[_a];
        val = childrenMap[uid];
        newAliveUIDArray.push(uid);
        _setMapVal(newChildrenMap, uid, val);
        val = tempMap[uid];
        _setMapVal(newTempMap, uid, val);
        val = parentMap[uid];
        _setMapVal(newParentMap, uid, val);
        val = isTranslateMap[uid];
        _setMapVal(newIsTranslateMap, uid, val);
        val = gameObjectMap[uid];
        _setMapVal(newGameObjectMap, uid, val);
    }
    ThreeDTransformData.parentMap = newParentMap;
    ThreeDTransformData.childrenMap = newChildrenMap;
    ThreeDTransformData.isTranslateMap = newIsTranslateMap;
    ThreeDTransformData.tempMap = newTempMap;
    ThreeDTransformData.gameObjectMap = newGameObjectMap;
    ThreeDTransformData.aliveUIDArray = newAliveUIDArray;
};
exports.reAllocateGameObject = function (GameObjectData) {
    var val = null, newParentMap = objectUtils_1.createMap(), newChildrenMap = objectUtils_1.createMap(), newComponentMap = objectUtils_1.createMap(), newAliveUIDArray = [], aliveUIDArray = GameObjectData.aliveUIDArray, parentMap = GameObjectData.parentMap, childrenMap = GameObjectData.childrenMap, componentMap = GameObjectData.componentMap, disposedUIDArr = [], actualAliveUIDArr = [];
    for (var _i = 0, aliveUIDArray_2 = aliveUIDArray; _i < aliveUIDArray_2.length; _i++) {
        var uid = aliveUIDArray_2[_i];
        val = componentMap[uid];
        if (objectUtils_1.isNotValidMapValue(val)) {
            disposedUIDArr.push(uid);
        }
        else {
            actualAliveUIDArr.push(uid);
        }
    }
    _cleanChildrenMap(disposedUIDArr, parentMap, GameObjectSystem_1.isAlive, GameObjectSystem_1.getChildren, GameObjectSystem_1.setChildren, GameObjectData);
    for (var _a = 0, actualAliveUIDArr_2 = actualAliveUIDArr; _a < actualAliveUIDArr_2.length; _a++) {
        var uid = actualAliveUIDArr_2[_a];
        val = componentMap[uid];
        newAliveUIDArray.push(uid);
        _setMapVal(newComponentMap, uid, val);
        val = parentMap[uid];
        _setMapVal(newParentMap, uid, val);
        val = childrenMap[uid];
        _setMapVal(newChildrenMap, uid, val);
    }
    GameObjectData.parentMap = newParentMap;
    GameObjectData.childrenMap = newChildrenMap;
    GameObjectData.componentMap = newComponentMap;
    GameObjectData.aliveUIDArray = newAliveUIDArray;
};
var _cleanChildrenMap = function (disposedUIDArr, parentMap, isAlive, getChildren, setChildren, Data) {
    var isCleanedParentMap = objectUtils_1.createMap();
    for (var _i = 0, disposedUIDArr_1 = disposedUIDArr; _i < disposedUIDArr_1.length; _i++) {
        var uid = disposedUIDArr_1[_i];
        var parent_1 = parentMap[uid];
        if (_isParentExist(parent_1)) {
            var parentUID = parent_1.uid;
            if (objectUtils_1.isValidMapValue(isCleanedParentMap[parentUID])) {
                continue;
            }
            _cleanChildren(parentUID, isAlive, getChildren, setChildren, Data);
            objectUtils_1.deleteVal(uid, parentMap);
        }
    }
};
var _cleanChildren = function (parentUID, isAlive, getChildren, setChildren, Data) {
    var children = getChildren(parentUID, Data);
    if (!_isChildrenExist(children)) {
        return;
    }
    var newChildren = [];
    for (var i = 0, len = children.length; i < len; ++i) {
        var child = children[i];
        if (isAlive(child, Data)) {
            newChildren.push(child);
        }
    }
    setChildren(parentUID, newChildren, Data);
};
var _isParentExist = function (parent) { return JudgeUtils_1.isNotUndefined(parent); };
var _isChildrenExist = function (children) { return JudgeUtils_1.isNotUndefined(children); };
exports.reAllocateTag = function (TagData) {
    var usedSlotCountMap = TagData.usedSlotCountMap, slotCountMap = TagData.slotCountMap, indexMap = TagData.indexMap, tagArray = TagData.tagArray, gameObjectMap = TagData.gameObjectMap, indexInTagArrayMap = TagData.indexInTagArrayMap, tagMap = TagData.tagMap, newIndexInTagArrayMap = [0], newTagArray = [], newGameObjectMap = objectUtils_1.createMap(), newUsedSlotCountMap = [], newSlotCountMap = [], newIndexMap = [], newTagMap = objectUtils_1.createMap(), newIndexInTagArray = 0, newIndexInTagArrayInMap = null, newIndex = 0, newLastIndexInTagArray = 0, hasNewData = false, tagIndex = null;
    for (var _i = 0, indexInTagArrayMap_1 = indexInTagArrayMap; _i < indexInTagArrayMap_1.length; _i++) {
        var indexInTagArray = indexInTagArrayMap_1[_i];
        var index = indexMap[indexInTagArray];
        if (arrayUtils_1.isNotValidVal(index)) {
            continue;
        }
        hasNewData = true;
        var currentUsedSlotCount = TagSystem_1.getUsedSlotCount(index, usedSlotCountMap), tag = tagMap[index];
        newGameObjectMap[newIndex] = gameObjectMap[index];
        newSlotCountMap[newIndex] = TagSystem_1.getSlotCount(index, slotCountMap);
        newUsedSlotCountMap[newIndex] = currentUsedSlotCount;
        newIndexInTagArrayInMap = newIndexInTagArray;
        newIndexInTagArrayMap[newIndex] = newIndexInTagArrayInMap;
        tag.index = newIndex;
        newTagMap[newIndex] = tag;
        for (var i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
            newTagArray[newIndexInTagArray] = tagArray[i];
            newIndexMap[newIndexInTagArray] = newIndex;
            newIndexInTagArray += 1;
        }
        newIndex += 1;
    }
    if (hasNewData) {
        newIndex -= 1;
        newLastIndexInTagArray = newIndexInTagArrayInMap + TagSystem_1.getSlotCount(newIndex, newSlotCountMap);
        tagIndex = newIndex + 1;
    }
    else {
        tagIndex = 0;
    }
    TagSystem_1.setNextIndexInTagArrayMap(newIndex, newSlotCountMap[newIndex], newIndexInTagArrayMap);
    TagData.slotCountMap = newSlotCountMap;
    TagData.usedSlotCountMap = newUsedSlotCountMap;
    TagData.gameObjectMap = newGameObjectMap;
    TagData.tagMap = newTagMap;
    TagData.indexMap = newIndexMap;
    TagData.indexInTagArrayMap = newIndexInTagArrayMap;
    TagData.lastIndexInTagArray = newLastIndexInTagArray;
    TagData.tagArray = newTagArray;
    TagData.index = tagIndex;
};
exports.reAllocateGeometry = contract_1.ensureFunc(function (returnVal, GeometryData) {
    contractUtils_1.checkIndexShouldEqualCount(GeometryData);
}, function (GeometryData) {
    var val = null, index = GeometryData.index, vertices = GeometryData.vertices, indices = GeometryData.indices, verticesInfoList = GeometryData.verticesInfoList, indicesInfoList = GeometryData.indicesInfoList, gameObjectMap = GeometryData.gameObjectMap, geometryMap = GeometryData.geometryMap, computeDataFuncMap = GeometryData.computeDataFuncMap, configDataMap = GeometryData.configDataMap, verticesCacheMap = GeometryData.verticesCacheMap, indicesCacheMap = GeometryData.indicesCacheMap, newIndexInArrayBuffer = 0, newVerticesOffset = 0, newIndicesOffset = 0, newVertivesInfoList = [], newIndicesInfoList = [], newGameObjectMap = objectUtils_1.createMap(), newGeometryMap = objectUtils_1.createMap(), newComputeDatafuncMap = objectUtils_1.createMap(), newConfigDataMap = [], newVerticesCacheMap = [], newIndicesCacheMap = [], newVertices = [], newIndices = [], disposedIndexArray = [];
    for (var i = 0; i < index; i++) {
        var verticesInfo = verticesInfoList[i], indicesInfo = indicesInfoList[i];
        val = geometryMap[i];
        if (objectUtils_1.isNotValidMapValue(val)) {
            disposedIndexArray.push(i);
            continue;
        }
        _updateInfoList(newVertivesInfoList, newIndexInArrayBuffer, verticesInfo, newVerticesOffset);
        _updateInfoList(newIndicesInfoList, newIndexInArrayBuffer, indicesInfo, newIndicesOffset);
        newVerticesOffset = _fillTypeArr(newVertices, newVerticesOffset, vertices, verticesInfo.startIndex, verticesInfo.endIndex);
        newIndicesOffset = _fillTypeArr(newIndices, newIndicesOffset, indices, indicesInfo.startIndex, indicesInfo.endIndex);
        _updateComponentIndex(geometryMap, newGeometryMap, i, newIndexInArrayBuffer);
        val = computeDataFuncMap[i];
        _setMapVal(newComputeDatafuncMap, newIndexInArrayBuffer, val);
        val = configDataMap[i];
        _setMapVal(newConfigDataMap, newIndexInArrayBuffer, val);
        val = verticesCacheMap[i];
        _setMapVal(newVerticesCacheMap, newIndexInArrayBuffer, val);
        val = indicesCacheMap[i];
        _setMapVal(newIndicesCacheMap, newIndexInArrayBuffer, val);
        val = geometryMap[i];
        _setMapVal(newGeometryMap, newIndexInArrayBuffer, val);
        val = gameObjectMap[i];
        _setMapVal(newGameObjectMap, newIndexInArrayBuffer, val);
        newIndexInArrayBuffer += 1;
    }
    typeArrayUtils_1.set(GeometryData.vertices, newVertices);
    typeArrayUtils_1.set(GeometryData.indices, newIndices);
    GeometryData.gameObjectMap = newGameObjectMap;
    GeometryData.verticesInfoList = newVertivesInfoList;
    GeometryData.indicesInfoList = newIndicesInfoList;
    GeometryData.geometryMap = newGeometryMap;
    GeometryData.computeDataFuncMap = newComputeDatafuncMap;
    GeometryData.configDataMap = newConfigDataMap;
    GeometryData.verticesCacheMap = newVerticesCacheMap;
    GeometryData.indicesCacheMap = newIndicesCacheMap;
    GeometryData.verticesOffset = newVerticesOffset;
    GeometryData.indicesOffset = newIndicesOffset;
    GeometryData.index = newIndexInArrayBuffer;
    return disposedIndexArray;
});
var _updateComponentIndex = function (componentMap, newComponentMap, oldIndex, newIndex) {
    var component = componentMap[oldIndex];
    component.index = newIndex;
    newComponentMap[newIndex] = component;
};
var _fillTypeArr = contract_1.requireCheckFunc(function (targetTypeArr, targetStartIndex, sourceTypeArr, startIndex, endIndex) {
}, function (targetTypeArr, targetStartIndex, sourceTypeArr, startIndex, endIndex) {
    var typeArrIndex = targetStartIndex;
    for (var i = startIndex; i < endIndex; i++) {
        targetTypeArr[typeArrIndex] = sourceTypeArr[i];
        typeArrIndex += 1;
    }
    return typeArrIndex;
});
var _updateInfoList = contract_1.ensureFunc(function (returnVal, newInfoList, newIndexInArrayBuffer, info, offset) {
    contract_1.it("info.startIndex should >= 0", function () {
        wonder_expect_js_1.expect(newInfoList[newIndexInArrayBuffer].startIndex).gte(0);
    });
}, function (newInfoList, newIndexInArrayBuffer, info, offset) {
    var increment = info.endIndex - info.startIndex;
    _setArrayVal(newInfoList, newIndexInArrayBuffer, {
        startIndex: offset,
        endIndex: offset + increment
    });
});
//# sourceMappingURL=memoryUtils.js.map