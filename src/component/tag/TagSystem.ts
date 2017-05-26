import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Tag } from "./Tag";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap,
    checkComponentShouldAlive, generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import curry from "wonder-lodash/curry";
import { deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { forEach } from "../../utils/arrayUtils";

export var addAddComponentHandle = (_class: any, TagData:any) => {
    addAddComponentHandleToMap(_class, addComponent(TagData));
}

export var addDisposeHandle = (_class: any, TagData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(TagData));
}

export var create = ensureFunc((tag:Tag, slotCount:number, TagData:any) => {
    it("slot array should has no hole", () => {
        for(let count of TagData.slotCountMap){
            expect(count).exist;
        }
    });
    // it("used slot array should has no hole", () => {
    //     for(let count of TagData.usedSlotCountMap){
    //         expect(count).exist;
    //     }
    // });
}, (slotCount:number, TagData:any)  => {
    var tag = new Tag(),
        index = generateComponentIndex(TagData);

    tag.index = index;

    TagData.count += 1;

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

export var addTag = requireCheckFunc((tagComponent:Tag, tag:string, TagData:any) => {
    checkTagShouldAlive(tagComponent, TagData);

    it("tag should not already be added", () => {
        var index = tagComponent.index,
            indexInArray = _convertTagIndexToIndexInArray(index, TagData),
            tagArray = TagData.tagArray,
            slotCountMap = TagData.slotCountMap,
            currentSlotCount = _getSlotCount(index, slotCountMap);

        expect(tagArray.slice(indexInArray, indexInArray + currentSlotCount).indexOf(tag) > -1).false;
    });
}, (tagComponent:Tag, tag:string, TagData:any) => {
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

        _updateIndexInArrayBufferMap(index, increasedSlotCount, TagData);

        TagData.lastIndexInArrayBuffer = _updateIndexMap(indexInArray, index, increasedSlotCount, TagData);
    }
    else{
        tagArray[indexInArray + currentUsedSlotCount] = tag;
    }

    _setUsedSlotCount(index, currentUsedSlotCount + 1, usedSlotCountMap);
})

var _updateIndexInArrayBufferMap = (startIndex:number, increasedSlotCount:number, TagData:any) => {
    var count = TagData.count,
        indexInArrayBufferMap = TagData.indexInArrayBufferMap;

    for(let i = startIndex + 1; i <= count; i++){
        indexInArrayBufferMap[i] += increasedSlotCount;
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

//todo optimize: collect redundant allocated slot count
export var removeTag = requireCheckFunc((tagComponent:Tag, tag:string, TagData:any) => {
    checkTagShouldAlive(tagComponent, TagData);

    it("current used slot count should >= 0", () => {
        var index = tagComponent.index,
            usedSlotCountMap = TagData.usedSlotCountMap;

        expect(_getUsedSlotCount(index, usedSlotCountMap)).gte(0);
    });
}, (tagComponent:Tag, tag:string, TagData:any) => {
    var index = tagComponent.index,
        indexInArray = _convertTagIndexToIndexInArray(index, TagData),
        usedSlotCountMap = TagData.usedSlotCountMap,
        tagArray = TagData.tagArray,
        currentUsedSlotCount = _getUsedSlotCount(index, usedSlotCountMap),
        newUsedSlotCount = currentUsedSlotCount;

    for(let i = indexInArray, count = indexInArray + currentUsedSlotCount; i < count; i++){
        if(tagArray[i] === tag){
            tagArray[i] = void 0;
            newUsedSlotCount = currentUsedSlotCount - 1;

            break;
        }
    }

    if(newUsedSlotCount <= 0){
        newUsedSlotCount = 0;
    }

    _setUsedSlotCount(index, newUsedSlotCount, usedSlotCountMap);
})

export var addComponent = curry((TagData:any, component:Tag, gameObject:GameObject) => {
    addComponentToGameObjectMap(TagData.gameObjectMap, component.index, gameObject);
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

export var checkTagShouldAlive = (tag:Tag, TagData:any) => {
    checkComponentShouldAlive(tag, TagData, (tag:Tag, TagData:any) => {
        return isValidMapValue(TagData.usedSlotCountMap[tag.index]);
    })
}

//todo optimize: if there are too many tagArray->holes, pack tagArray to remove holes
export var disposeComponent = ensureFunc(curry((returnVal, TagData:any, tag:Tag) => {
    it("count should >= 0", () => {
        expect(TagData.count).gte(0);
    });
}), curry((TagData:any, tag:Tag) => {
    var index = tag.index,
        indexInArrayBuffer = _convertTagIndexToIndexInArray(index, TagData),
        currentSlotCount = _getSlotCount(index, TagData.slotCountMap),
        tagArray = TagData.tagArray;

    for(let i = indexInArrayBuffer, count = indexInArrayBuffer + currentSlotCount; i < count; i++){
        tagArray[i] = void 0;

        deleteVal(i, TagData.indexMap);
    }

    TagData.count -= 1;

    deleteVal(index, TagData.usedSlotCountMap);
    deleteVal(index, TagData.gameObjectMap);
}))

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

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
    TagData.count = 0;
}
