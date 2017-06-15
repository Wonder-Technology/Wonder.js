import { createMap, isNotValidMapValue, isValidMapValue } from "./objectUtils";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { clearCacheMap } from "../component/transform/cacheSystem";
import { getSlotCount, getUsedSlotCount, setNextIndexInTagArrayMap } from "../component/tag/TagSystem";
import { isNotValidVal } from "./arrayUtils";
import { MemoryConfig } from "../config/MemoryConfig";
import { ensureFunc, it, requireCheckFunc } from "../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Component } from "../component/Component";
import { checkIndexShouldEqualCount } from "../component/utils/contractUtils";
import { GeometryInfo, GeometryInfoList } from "../definition/type/geometryType";
import { set } from "./typeArrayUtils";

export var isDisposeTooManyComponents = (disposeCount: number, maxComponentDisposeCount: number = MemoryConfig.maxComponentDisposeCount) => {
    return disposeCount >= maxComponentDisposeCount;
}
//
// var setMapVal = (map:object, uid:number, val:any) => {
//     if(isValidMapValue(val)){
//         map[uid] = val;
//     }
// }

var _setMapVal = (map: object, key: number, val: any) => {
    map[key] = val;
}

var _setArrayVal = (arr: Array<any>, index: number, val: any) => {
    arr[index] = val;
}

export var reAllocateThreeDTransform = (ThreeDTransformData: any) => {
    var val: any = null,
        newParentMap = {},
        newChildrenMap = {},
        newIsTranslateMap = {},
        newGameObjectMap = {},
        newTempMap = {},
        newAliveUIDArray: Array<number> = [],
        aliveUIDArray = ThreeDTransformData.aliveUIDArray,
        parentMap = ThreeDTransformData.parentMap,
        childrenMap = ThreeDTransformData.childrenMap,
        isTranslateMap = ThreeDTransformData.isTranslateMap,
        gameObjectMap = ThreeDTransformData.gameObjectMap,
        tempMap = ThreeDTransformData.tempMap;

    clearCacheMap(ThreeDTransformData);

    for (let uid of aliveUIDArray) {
        val = childrenMap[uid];

        if (isNotValidMapValue(val)) {
            continue;
        }

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
}

export var reAllocateGameObject = (GameObjectData: any) => {
    let val: any = null,
        newParentMap = {},
        newChildrenMap = {},
        newComponentMap = {},
        newAliveUIDArray: Array<number> = [],
        aliveUIDArray = GameObjectData.aliveUIDArray,
        parentMap = GameObjectData.parentMap,
        childrenMap = GameObjectData.childrenMap,
        componentMap = GameObjectData.componentMap;

    for (let uid of aliveUIDArray) {
        val = componentMap[uid];

        if (isNotValidMapValue(val)) {
            continue;
        }

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

export var reAllocateTag = (TagData: any) => {
    var usedSlotCountMap = TagData.usedSlotCountMap,
        slotCountMap = TagData.slotCountMap,
        indexMap = TagData.indexMap,
        tagArray = TagData.tagArray,
        gameObjectMap = TagData.gameObjectMap,
        indexInTagArrayMap = TagData.indexInTagArrayMap,
        tagMap = TagData.tagMap,
        newIndexInTagArrayMap: Array<number> = [0],
        newTagArray = [],
        newGameObjectMap = createMap(),
        newUsedSlotCountMap = [],
        newSlotCountMap = [],
        newIndexMap = [],
        newTagMap = createMap(),
        newIndexInTagArray = 0,
        newIndexInTagArrayInMap = null,
        newIndex = 0,
        newLastIndexInTagArray = 0,
        hasNewData = false,
        tagIndex: number = null;

    for (let indexInTagArray of indexInTagArrayMap) {
        let index = indexMap[indexInTagArray];

        if (isNotValidVal(index)) {
            continue;
        }

        hasNewData = true;

        let currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap),
            tag = tagMap[index];

        newGameObjectMap[newIndex] = gameObjectMap[index];
        newSlotCountMap[newIndex] = getSlotCount(index, slotCountMap);
        newUsedSlotCountMap[newIndex] = currentUsedSlotCount;

        newIndexInTagArrayInMap = newIndexInTagArray;
        newIndexInTagArrayMap[newIndex] = newIndexInTagArrayInMap;

        tag.index = newIndex;
        newTagMap[newIndex] = tag;

        for (let i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
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

export var reAllocateGeometry = ensureFunc((returnVal: any, GeometryData: any) => {
    checkIndexShouldEqualCount(GeometryData);
}, (GeometryData: any) => {
    let val: any = null,
        // hasNewData = false,
        index = GeometryData.index,
        vertices = GeometryData.vertices,
        indices = GeometryData.indices,
        verticesInfoList = GeometryData.verticesInfoList,
        indicesInfoList = GeometryData.indicesInfoList,
        gameObjectMap = GeometryData.gameObjectMap,
        geometryMap = GeometryData.geometryMap,
        computeDataFuncMap = GeometryData.computeDataFuncMap,
        configDataMap = GeometryData.configDataMap,
        verticesCacheMap = GeometryData.verticesCacheMap,
        indicesCacheMap = GeometryData.indicesCacheMap,
        newIndexInArrayBuffer = 0,
        newVerticesOffset = 0,
        newIndicesOffset = 0,
        newVertivesInfoList = [],
        newIndicesInfoList = [],
        newGameObjectMap = {},
        newGeometryMap = {},
        newComputeDatafuncMap = {},
        newConfigDataMap: Array<number> = [],
        newVerticesCacheMap: Array<number> = [],
        newIndicesCacheMap: Array<number> = [],
        newVertices: Array<number> = [],
        newIndices: Array<number> = [],
        disposedIndexArray: Array<number> = [];

    for (let i = 0; i < index; i++) {
        let verticesInfo = verticesInfoList[i],
            indicesInfo = indicesInfoList[i];

        val = geometryMap[i];
        // val = gameObjectMap[i];

        if (isNotValidMapValue(val)) {
            disposedIndexArray.push(i);
            continue;
        }

        // hasNewData = true;

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

    set(GeometryData.vertices, newVertices);
    set(GeometryData.indices, newIndices);

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
})

var _updateComponentIndex = (componentMap: object, newComponentMap: object, oldIndex: number, newIndex: number) => {
    let component: Component = componentMap[oldIndex];

    component.index = newIndex;
    newComponentMap[newIndex] = component;
}

var _fillTypeArr = requireCheckFunc((targetTypeArr: Float32Array | Uint32Array | Uint16Array, targetStartIndex: number, sourceTypeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    // it("targetStartIndex should <= sourceStartIndex", () => {
    //     expect(targetStartIndex).lte(startIndex);
    // })
}, (targetTypeArr: Float32Array | Uint32Array | Uint16Array, targetStartIndex: number, sourceTypeArr: Float32Array | Uint32Array | Uint16Array, startIndex: number, endIndex: number) => {
    var typeArrIndex = targetStartIndex;

    for (let i = startIndex; i < endIndex; i++) {
        targetTypeArr[typeArrIndex] = sourceTypeArr[i];
        typeArrIndex += 1;
    }

    return typeArrIndex;
})

var _updateInfoList = ensureFunc((returnVal: any, newInfoList, newIndexInArrayBuffer, info: GeometryInfo, offset: number) => {
    it("info.startIndex should >= 0", () => {
        expect(newInfoList[newIndexInArrayBuffer].startIndex).gte(0);
    });
}, (newInfoList: GeometryInfoList, newIndexInArrayBuffer: number, info: GeometryInfo, offset: number) => {
    var increment = info.endIndex - info.startIndex;

    _setArrayVal(newInfoList, newIndexInArrayBuffer, {
        startIndex: offset,
        endIndex: offset + increment
    });
})
