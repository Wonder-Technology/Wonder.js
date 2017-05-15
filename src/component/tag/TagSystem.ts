import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Tag } from "./Tag";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { addAddComponentHandle as addAddComponentHandleToMap } from "../ComponentSystem";
import forEach from "wonder-lodash/forEach";
import curry from "wonder-lodash/curry";

export var addAddComponentHandle = (_class: any, TagData:any) => {
    addAddComponentHandleToMap(_class, addComponent(TagData));
}

export var create = ensureFunc((tag:Tag, slotCount:number, TagData:any) => {
    it("slot array should has no hole", () => {
        for(let count of TagData.slotCountMap){
            expect(count).exist;
        }
    });
    it("used slot array should has no hole", () => {
        for(let count of TagData.usedSlotCountMap){
            expect(count).exist;
        }
    });
}, (slotCount:number, TagData:any)  => {
    var tag = new Tag(),
        index = _generateIndex(TagData);

    tag.index = index;

    TagData.size += 1;

    _setSlotCount(index, slotCount, TagData.slotCountMap);
    _setUsedSlotCount(index, 0, TagData.usedSlotCountMap);

    _setIndexInArrayBufferMap(index, slotCount, TagData.indexInArrayBufferMap);

    _initIndexMap(index, slotCount, TagData);

    TagData.lastIndexInArrayBuffer += slotCount;

    return tag;
})

var _setIndexInArrayBufferMap = (index:number, slotCount:number, indexInArrayBufferMap:Array<number>) => {
    indexInArrayBufferMap[index + 1] = indexInArrayBufferMap[index] + slotCount;
}

var _initIndexMap = (index:number, slotCount:number, TagData:any) => {
    var indexMap = TagData.indexMap,
        lastIndexInArrayBuffer = TagData.lastIndexInArrayBuffer;

    for(let i = lastIndexInArrayBuffer, count = i + slotCount; i < count; i++){
        indexMap[i] = index;
    }
}

var _generateIndex = (TagData: any) => {
    return TagData.index++;
}

export var addTag = (tagComponent:Tag, tag:string, TagData:any) => {
    var index = tagComponent.index,
        indexInArray = _convertTagIndexToIndexInArray(index, TagData),
        slotCountMap = TagData.slotCountMap,
        tagArray = TagData.tagArray,
        usedSlotCountMap = TagData.usedSlotCountMap,
        currentSlotCount = _getSlotCount(index, slotCountMap),
        currentUsedSlotCount = _getUsedSlotCount(index, usedSlotCountMap);

    if(_isSlotAllUsed(currentUsedSlotCount, currentSlotCount)){
        let increasedSlotCount = _allocateDoubleSlotCountAndAddTag(indexInArray, index, tag, currentSlotCount, currentUsedSlotCount, TagData),
            slotCount = currentSlotCount + increasedSlotCount;

        _setSlotCount(index, slotCount, slotCountMap);

        _updateIndexInArrayBufferMap(index, slotCount, TagData);

        TagData.lastIndexInArrayBuffer = _updateIndexMap(indexInArray, index, increasedSlotCount, TagData);
    }
    else{
        tagArray[indexInArray + currentUsedSlotCount] = tag;
    }

    _setUsedSlotCount(index, currentUsedSlotCount + 1, usedSlotCountMap);
}

var _updateIndexInArrayBufferMap = (startIndex:number, allocatedSlotCount:number, TagData:any) => {
    var size = TagData.size,
        indexInArrayBufferMap = TagData.indexInArrayBufferMap;

    for(let i = startIndex; i < size; i++){
        _setIndexInArrayBufferMap(i, allocatedSlotCount, indexInArrayBufferMap);
    }
}

var _updateIndexMap = (indexInArray:number, index:number, increasedSlotCount:number, TagData:any) => {
    var indexMap = TagData.indexMap,
        lastIndexInArrayBuffer = TagData.lastIndexInArrayBuffer + increasedSlotCount,
        spliceParamArr = [indexInArray + increasedSlotCount, 0];

    for(let i = 0; i < increasedSlotCount; i++){
        spliceParamArr.push(index);
    }

    Array.prototype.splice.apply(indexMap, spliceParamArr);

    return lastIndexInArrayBuffer;
}

// export var removeTag = (tagComponent:Tag, tag:string, TagData:any) => {
//
// }

export var addComponent = curry((TagData:any, tagComponent:Tag, gameObject:GameObject) => {
    TagData.gameObjectMap[tagComponent.index] = gameObject;
})

var _getSlotCount = (index:number, slotCountMap:Array<number>) => {
    return slotCountMap[index];
}

var _setSlotCount = (index:number, slotCount:number, slotCountMap:Array<number>) => {
    slotCountMap[index] = slotCount;
}

var _getUsedSlotCount = (index:number, usedSlotCountMap:Array<number>) => {
    return usedSlotCountMap[index];
}

var _setUsedSlotCount = (index:number, slotCount:number, usedSlotCountMap:Array<number>) => {
    usedSlotCountMap[index] = slotCount;
}

var _isSlotAllUsed = requireCheckFunc((currentUsedSlotCount:number, currentSlotCount:number) => {
    it("usedSlotCount should <= slotCount", () => {
        expect(currentUsedSlotCount).lte(currentSlotCount);
    });
},(currentUsedSlotCount:number, currentSlotCount:number) => {
    return currentUsedSlotCount === currentSlotCount;
})

var _allocateDoubleSlotCountAndAddTag = (indexInArray:number, index:number, tag:string, currentSlotCount:number, currentUsedSlotCount:number, TagData:any) => {
    var spliceArr = [indexInArray + currentUsedSlotCount, 0, tag],
        tagArray = TagData.tagArray;

    for(let i = 0, len = currentSlotCount - 1; i < len; i++){
        spliceArr.push(null);
    }

    Array.prototype.splice.apply(tagArray, spliceArr);

    return currentSlotCount;
}

var _convertTagIndexToIndexInArray = (tagIndex:number, TagData:any) => {
    return TagData.indexInArrayBufferMap[tagIndex];
}

var _convertIndexInArrayToTagIndex = (indexInArrayBuffer:number, TagData:any) => {
    return TagData.indexMap[indexInArrayBuffer];
}

// export var removeComponent = () => {
//
// }
//
// export var disposeComponent = () => {
//
// }

export var findGameObjectsByTag = (targetTag:string, TagData:any) => {
    var gameObjectArr:Array<GameObject> = [],
        gameObjectMap = TagData.gameObjectMap;

    forEach(TagData.tagArray, (tag:string, indexInArrayBuffer:number) => {
        if(tag === targetTag){
            gameObjectArr.push(gameObjectMap[_convertIndexInArrayToTagIndex(indexInArrayBuffer, TagData)]);
        }
    });

    return gameObjectArr;
}

export var initData = (TagData:any) => {
    TagData.tagArray = [];
    TagData.slotCountMap = [];
    TagData.usedSlotCountMap = [];
    TagData.indexMap = [];
    TagData.indexInArrayBufferMap = [0];
    TagData.gameObjectMap = {};

    TagData.lastIndexInArrayBuffer = 0;
    TagData.index = 0;
    TagData.size = 0;
}
