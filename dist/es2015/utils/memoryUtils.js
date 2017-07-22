import { createMap, deleteVal, isNotValidMapValue, isValidMapValue } from "./objectUtils";
import { clearCacheMap } from "../component/transform/cacheSystem";
import { getSlotCount, getUsedSlotCount, setNextIndexInTagArrayMap } from "../component/tag/TagSystem";
import { isNotValidVal, isValidVal } from "./arrayUtils";
import { MemoryConfig } from "../config/MemoryConfig";
import { ensureFunc, it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { checkIndexShouldEqualCount } from "../component/utils/contractUtils";
import { set } from "./typeArrayUtils";
import { getChildren as getGameObjectChildren, isAlive as isGameObjectAlive, setChildren as setGameObjectChildren } from "../core/entityObject/gameObject/GameObjectSystem";
import { isNotUndefined } from "./JudgeUtils";
import { isAlive as isThreeDTransformAlive } from "../component/transform/ThreeDTransformSystem";
import { getChildren as getThreeDTransformChildren, setChildren as setThreeDTransformChildren } from "../component/transform/hierarchySystem";
export var isDisposeTooManyComponents = function (disposeCount, maxComponentDisposeCount) {
    if (maxComponentDisposeCount === void 0) { maxComponentDisposeCount = MemoryConfig.maxComponentDisposeCount; }
    return disposeCount >= maxComponentDisposeCount;
};
var _setMapVal = function (map, key, val) {
    map[key] = val;
};
var _setArrayVal = function (arr, index, val) {
    arr[index] = val;
};
export var reAllocateThreeDTransform = function (ThreeDTransformData) {
    var val = null, newParentMap = createMap(), newChildrenMap = createMap(), newIsTranslateMap = createMap(), newGameObjectMap = createMap(), newTempMap = createMap(), newAliveUIDArray = [], aliveUIDArray = ThreeDTransformData.aliveUIDArray, parentMap = ThreeDTransformData.parentMap, childrenMap = ThreeDTransformData.childrenMap, isTranslateMap = ThreeDTransformData.isTranslateMap, gameObjectMap = ThreeDTransformData.gameObjectMap, tempMap = ThreeDTransformData.tempMap;
    clearCacheMap(ThreeDTransformData);
    var disposedUIDArr = [], actualAliveUIDArr = [];
    for (var _i = 0, aliveUIDArray_1 = aliveUIDArray; _i < aliveUIDArray_1.length; _i++) {
        var uid = aliveUIDArray_1[_i];
        val = childrenMap[uid];
        if (isNotValidMapValue(val)) {
            disposedUIDArr.push(uid);
        }
        else {
            actualAliveUIDArr.push(uid);
        }
    }
    _cleanChildrenMap(disposedUIDArr, parentMap, isThreeDTransformAlive, getThreeDTransformChildren, setThreeDTransformChildren, ThreeDTransformData);
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
export var reAllocateGameObject = function (GameObjectData) {
    var val = null, newParentMap = createMap(), newChildrenMap = createMap(), newComponentMap = createMap(), newAliveUIDArray = [], aliveUIDArray = GameObjectData.aliveUIDArray, parentMap = GameObjectData.parentMap, childrenMap = GameObjectData.childrenMap, componentMap = GameObjectData.componentMap, disposedUIDArr = [], actualAliveUIDArr = [];
    for (var _i = 0, aliveUIDArray_2 = aliveUIDArray; _i < aliveUIDArray_2.length; _i++) {
        var uid = aliveUIDArray_2[_i];
        val = componentMap[uid];
        if (isNotValidMapValue(val)) {
            disposedUIDArr.push(uid);
        }
        else {
            actualAliveUIDArr.push(uid);
        }
    }
    _cleanChildrenMap(disposedUIDArr, parentMap, isGameObjectAlive, getGameObjectChildren, setGameObjectChildren, GameObjectData);
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
    var isCleanedParentMap = createMap();
    for (var _i = 0, disposedUIDArr_1 = disposedUIDArr; _i < disposedUIDArr_1.length; _i++) {
        var uid = disposedUIDArr_1[_i];
        var parent_1 = parentMap[uid];
        if (_isParentExist(parent_1)) {
            var parentUID = parent_1.uid;
            if (isValidMapValue(isCleanedParentMap[parentUID])) {
                continue;
            }
            _cleanChildren(parentUID, isAlive, getChildren, setChildren, Data);
            deleteVal(uid, parentMap);
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
var _isParentExist = function (parent) { return isNotUndefined(parent); };
var _isChildrenExist = function (children) { return isNotUndefined(children); };
export var reAllocateTag = function (TagData) {
    var usedSlotCountMap = TagData.usedSlotCountMap, slotCountMap = TagData.slotCountMap, indexMap = TagData.indexMap, tagArray = TagData.tagArray, gameObjectMap = TagData.gameObjectMap, indexInTagArrayMap = TagData.indexInTagArrayMap, tagMap = TagData.tagMap, newIndexInTagArrayMap = [0], newTagArray = [], newGameObjectMap = createMap(), newUsedSlotCountMap = [], newSlotCountMap = [], newIndexMap = [], newTagMap = createMap(), newIndexInTagArray = 0, newIndexInTagArrayInMap = null, newIndex = 0, newLastIndexInTagArray = 0, hasNewData = false, tagIndex = null;
    for (var _i = 0, indexInTagArrayMap_1 = indexInTagArrayMap; _i < indexInTagArrayMap_1.length; _i++) {
        var indexInTagArray = indexInTagArrayMap_1[_i];
        var index = indexMap[indexInTagArray];
        if (isNotValidVal(index)) {
            continue;
        }
        hasNewData = true;
        var currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap), tag = tagMap[index];
        newGameObjectMap[newIndex] = gameObjectMap[index];
        newSlotCountMap[newIndex] = getSlotCount(index, slotCountMap);
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
        newLastIndexInTagArray = newIndexInTagArrayInMap + getSlotCount(newIndex, newSlotCountMap);
        tagIndex = newIndex + 1;
    }
    else {
        tagIndex = 0;
    }
    setNextIndexInTagArrayMap(newIndex, newSlotCountMap[newIndex], newIndexInTagArrayMap);
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
export var reAllocateGeometry = ensureFunc(function (returnVal, GeometryData) {
    checkIndexShouldEqualCount(GeometryData);
}, function (GeometryData) {
    var val = null, index = GeometryData.index, vertices = GeometryData.vertices, normals = GeometryData.normals, texCoords = GeometryData.texCoords, indices = GeometryData.indices, verticesInfoList = GeometryData.verticesInfoList, normalsInfoList = GeometryData.normalsInfoList, texCoordsInfoList = GeometryData.texCoordsInfoList, indicesInfoList = GeometryData.indicesInfoList, gameObjectMap = GeometryData.gameObjectMap, geometryMap = GeometryData.geometryMap, computeDataFuncMap = GeometryData.computeDataFuncMap, configDataMap = GeometryData.configDataMap, verticesCacheMap = GeometryData.verticesCacheMap, normalsCacheMap = GeometryData.normalsCacheMap, texCoordsCacheMap = GeometryData.texCoordsCacheMap, indicesCacheMap = GeometryData.indicesCacheMap, newIndexInArrayBuffer = 0, newVerticesOffset = 0, newNormalsOffset = 0, newTexCoordsOffset = 0, newIndicesOffset = 0, newVertivesInfoList = [], newNormalsInfoList = [], newTexCoordsInfoList = [], newIndicesInfoList = [], newGameObjectMap = createMap(), newGeometryMap = createMap(), newComputeDatafuncMap = createMap(), newConfigDataMap = [], newVerticesCacheMap = [], newNormalsCacheMap = [], newTexCoordsCacheMap = [], newIndicesCacheMap = [], newVertices = [], newNormals = [], newTexCoords = [], newIndices = [], disposedIndexArray = [];
    for (var i = 0; i < index; i++) {
        val = geometryMap[i];
        if (isNotValidMapValue(val)) {
            disposedIndexArray.push(i);
            continue;
        }
        var verticesInfo = verticesInfoList[i], normalsInfo = normalsInfoList[i], texCoordsInfo = texCoordsInfoList[i], indicesInfo = indicesInfoList[i];
        _updateInfoList(newVertivesInfoList, newIndexInArrayBuffer, verticesInfo, newVerticesOffset);
        if (isValidVal(normalsInfo)) {
            _updateInfoList(newNormalsInfoList, newIndexInArrayBuffer, normalsInfo, newNormalsOffset);
        }
        if (isValidVal(texCoordsInfo)) {
            _updateInfoList(newTexCoordsInfoList, newIndexInArrayBuffer, texCoordsInfo, newTexCoordsOffset);
        }
        _updateInfoList(newIndicesInfoList, newIndexInArrayBuffer, indicesInfo, newIndicesOffset);
        newVerticesOffset = _fillTypeArr(newVertices, newVerticesOffset, vertices, verticesInfo.startIndex, verticesInfo.endIndex);
        if (isValidVal(normalsInfo)) {
            newNormalsOffset = _fillTypeArr(newNormals, newNormalsOffset, normals, normalsInfo.startIndex, normalsInfo.endIndex);
        }
        if (isValidVal(texCoordsInfo)) {
            newTexCoordsOffset = _fillTypeArr(newTexCoords, newTexCoordsOffset, texCoords, texCoordsInfo.startIndex, texCoordsInfo.endIndex);
        }
        newIndicesOffset = _fillTypeArr(newIndices, newIndicesOffset, indices, indicesInfo.startIndex, indicesInfo.endIndex);
        _updateComponentIndex(geometryMap, newGeometryMap, i, newIndexInArrayBuffer);
        val = computeDataFuncMap[i];
        _setMapVal(newComputeDatafuncMap, newIndexInArrayBuffer, val);
        val = configDataMap[i];
        _setMapVal(newConfigDataMap, newIndexInArrayBuffer, val);
        val = verticesCacheMap[i];
        _setMapVal(newVerticesCacheMap, newIndexInArrayBuffer, val);
        val = normalsCacheMap[i];
        _setMapVal(newNormalsCacheMap, newIndexInArrayBuffer, val);
        val = texCoordsCacheMap[i];
        _setMapVal(newTexCoordsCacheMap, newIndexInArrayBuffer, val);
        val = indicesCacheMap[i];
        _setMapVal(newIndicesCacheMap, newIndexInArrayBuffer, val);
        val = geometryMap[i];
        _setMapVal(newGeometryMap, newIndexInArrayBuffer, val);
        val = gameObjectMap[i];
        _setMapVal(newGameObjectMap, newIndexInArrayBuffer, val);
        newIndexInArrayBuffer += 1;
    }
    set(GeometryData.vertices, newVertices);
    set(GeometryData.normals, newNormals);
    set(GeometryData.texCoords, newTexCoords);
    set(GeometryData.indices, newIndices);
    GeometryData.gameObjectMap = newGameObjectMap;
    GeometryData.verticesInfoList = newVertivesInfoList;
    GeometryData.normalsInfoList = newNormalsInfoList;
    GeometryData.texCoordsInfoList = newTexCoordsInfoList;
    GeometryData.indicesInfoList = newIndicesInfoList;
    GeometryData.geometryMap = newGeometryMap;
    GeometryData.computeDataFuncMap = newComputeDatafuncMap;
    GeometryData.configDataMap = newConfigDataMap;
    GeometryData.verticesCacheMap = newVerticesCacheMap;
    GeometryData.normalsCacheMap = newNormalsCacheMap;
    GeometryData.texCoordsCacheMap = newTexCoordsCacheMap;
    GeometryData.indicesCacheMap = newIndicesCacheMap;
    GeometryData.verticesOffset = newVerticesOffset;
    GeometryData.normalsOffset = newNormalsOffset;
    GeometryData.texCoordsOffset = newTexCoordsOffset;
    GeometryData.indicesOffset = newIndicesOffset;
    GeometryData.index = newIndexInArrayBuffer;
    return disposedIndexArray;
});
var _updateComponentIndex = function (componentMap, newComponentMap, oldIndex, newIndex) {
    var component = componentMap[oldIndex];
    component.index = newIndex;
    newComponentMap[newIndex] = component;
};
var _fillTypeArr = requireCheckFunc(function (targetTypeArr, targetStartIndex, sourceTypeArr, startIndex, endIndex) {
}, function (targetTypeArr, targetStartIndex, sourceTypeArr, startIndex, endIndex) {
    var typeArrIndex = targetStartIndex;
    for (var i = startIndex; i < endIndex; i++) {
        targetTypeArr[typeArrIndex] = sourceTypeArr[i];
        typeArrIndex += 1;
    }
    return typeArrIndex;
});
var _updateInfoList = ensureFunc(function (returnVal, newInfoList, newIndexInArrayBuffer, info, offset) {
    it("info.startIndex should >= 0", function () {
        expect(newInfoList[newIndexInArrayBuffer].startIndex).gte(0);
    });
}, function (newInfoList, newIndexInArrayBuffer, info, offset) {
    var increment = info.endIndex - info.startIndex;
    _setArrayVal(newInfoList, newIndexInArrayBuffer, {
        startIndex: offset,
        endIndex: offset + increment
    });
});
//# sourceMappingURL=memoryUtils.js.map