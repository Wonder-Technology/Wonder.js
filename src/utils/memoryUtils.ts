import { createMap, isNotValidMapValue, isValidMapValue } from "./objectUtils";
import { GameObject } from "../core/entityObject/gameObject/GameObject";
import { clearCacheMap } from "../component/transform/cacheSystem";
import { getSlotCount, getUsedSlotCount, setNextIndexInTagArrayMap } from "../component/tag/TagSystem";
import { isNotValidVal } from "./arrayUtils";
import { MemoryConfig } from "../config/MemoryConfig";

export var isDisposeTooManyComponents = (disposeCount:number) => {
    return disposeCount >= MemoryConfig.maxComponentDisposeCount;
}
//
// var setMapVal = (map:object, uid:number, val:any) => {
//     if(isValidMapValue(val)){
//         map[uid] = val;
//     }
// }

var _setMapVal = (map:object, uid:number, val:any) => {
    map[uid] = val;
}

export var reAllocateThreeDTransformMap = (ThreeDTransformData:any) => {
    var val:any = null,
        newParentMap = {},
        newChildrenMap = {},
        newIsTranslateMap = {},
        newTempMap = {},
        newAliveUIDArray:Array<number> = [],
        aliveUIDArray = ThreeDTransformData.aliveUIDArray,
        parentMap = ThreeDTransformData.parentMap,
        childrenMap = ThreeDTransformData.childrenMap,
        isTranslateMap = ThreeDTransformData.isTranslateMap,
        tempMap = ThreeDTransformData.tempMap;

    clearCacheMap(ThreeDTransformData);

    for(let uid of aliveUIDArray){
        val = childrenMap[uid];

        if(isNotValidMapValue(val)){
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
    }

    ThreeDTransformData.parentMap = newParentMap;
    ThreeDTransformData.childrenMap = newChildrenMap;
    ThreeDTransformData.isTranslateMap = newIsTranslateMap;
    ThreeDTransformData.tempMap = newTempMap;

    ThreeDTransformData.aliveUIDArray = newAliveUIDArray;
}

export var reAllocateGameObjectMap = (GameObjectData:any) => {
    let val: any = null,
        newParentMap = {},
        newChildrenMap = {},
        newComponentMap = {},
        newAliveUIDArray:Array<number> = [],
        aliveUIDArray = GameObjectData.aliveUIDArray,
        parentMap = GameObjectData.parentMap,
        childrenMap = GameObjectData.childrenMap,
        componentMap = GameObjectData.componentMap;

    for(let uid of aliveUIDArray){
        val = componentMap[uid];

        if(isNotValidMapValue(val)){
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

export var reAllocateTagMap = (TagData:any) => {
    var usedSlotCountMap = TagData.usedSlotCountMap,
        slotCountMap = TagData.slotCountMap,
        indexMap = TagData.indexMap,
        tagArray = TagData.tagArray,
        gameObjectMap = TagData.gameObjectMap,
        indexInTagArrayMap = TagData.indexInTagArrayMap,
        tagMap = TagData.tagMap,
        newIndexInTagArrayMap:Array<number> = [0],
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
        tagIndex:number = null;

    for(let indexInTagArray of indexInTagArrayMap){
        let index = indexMap[indexInTagArray];

        if(isNotValidVal(index)){
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

        for(let i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++){
            newTagArray[newIndexInTagArray] = tagArray[i];

            newIndexMap[newIndexInTagArray] = newIndex;

            newIndexInTagArray += 1;
        }

        newIndex += 1;
    }

    if(hasNewData){
        newIndex -= 1;

        newLastIndexInTagArray = newIndexInTagArrayInMap + getSlotCount(newIndex, newSlotCountMap);

        tagIndex = newIndex + 1;
    }
    else{
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
