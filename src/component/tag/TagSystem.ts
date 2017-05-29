import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Tag } from "./Tag";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap,
    addDisposeHandle as addDisposeHandleToMap,
    checkComponentShouldAlive, generateComponentIndex, getComponentGameObject, markComponentIndexRemoved
} from "../ComponentSystem";
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { forEach } from "../../utils/arrayUtils";
import { TagData } from "./TagData";
import { isDisposeTooManyComponents, reAllocateTagMap } from "../../utils/memoryUtils";

export var addAddComponentHandle = (_class: any) => {
    addAddComponentHandleToMap(_class, addComponent);
}

export var addDisposeHandle = (_class: any) => {
    addDisposeHandleToMap(_class, disposeComponent);
}

export var create = ensureFunc((tag: Tag, slotCount: number, TagData: any) => {
    it("slot array should has no hole", () => {
        for (let count of TagData.slotCountMap) {
            expect(count).exist;
        }
    });
    // it("used slot array should has no hole", () => {
    //     for(let count of TagData.usedSlotCountMap){
    //         expect(count).exist;
    //     }
    // });
}, (slotCount: number, TagData: any) => {
    var tag = new Tag(),
        index = generateComponentIndex(TagData);

    tag.index = index;

    TagData.count += 1;

    _setSlotCount(index, slotCount, TagData.slotCountMap);
    _setUsedSlotCount(index, 0, TagData.usedSlotCountMap);

    setNextIndexInTagArrayMap(index, slotCount, TagData.indexInTagArrayMap);

    _initIndexMap(index, slotCount, TagData);

    TagData.lastIndexInTagArray += slotCount;

    TagData.tagMap[index] = tag;

    return tag;
})

export var setNextIndexInTagArrayMap = requireCheckFunc((index: number, slotCount: number, indexInTagArrayMap: Array<number>) => {
    it("index should >= 0", () => {
        expect(index).gte(0);
    });
}, (index: number, slotCount: number, indexInTagArrayMap: Array<number>) => {
    indexInTagArrayMap[index + 1] = indexInTagArrayMap[index] + slotCount;
})

var _initIndexMap = (index: number, slotCount: number, TagData: any) => {
    var indexMap = TagData.indexMap,
        lastIndexInTagArray = TagData.lastIndexInTagArray;

    for (let i = lastIndexInTagArray, count = lastIndexInTagArray + slotCount; i < count; i++) {
        indexMap[i] = index;
    }
}

export var addTag = requireCheckFunc((tagComponent: Tag, tag: string, TagData: any) => {
    it("tag should not already be added", () => {
        var index = tagComponent.index,
            indexInArray = _convertTagIndexToIndexInArray(index, TagData),
            tagArray = TagData.tagArray,
            slotCountMap = TagData.slotCountMap,
            currentSlotCount = getSlotCount(index, slotCountMap);

        expect(tagArray.slice(indexInArray, indexInArray + currentSlotCount).indexOf(tag) > -1).false;
    });
}, (tagComponent: Tag, tag: string, TagData: any) => {
    var index = tagComponent.index,
        indexInArray = _convertTagIndexToIndexInArray(index, TagData),
        slotCountMap = TagData.slotCountMap,
        tagArray = TagData.tagArray,
        usedSlotCountMap = TagData.usedSlotCountMap,
        currentSlotCount = getSlotCount(index, slotCountMap),
        currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap);

    if (_isSlotAllUsed(currentUsedSlotCount, currentSlotCount)) {
        let increasedSlotCount = _allocateDoubleSlotCountAndAddTag(indexInArray, index, tag, currentSlotCount, currentUsedSlotCount, TagData),
            slotCount = currentSlotCount + increasedSlotCount;

        _setSlotCount(index, slotCount, slotCountMap);

        _updateIndexInTagArrayMap(index, increasedSlotCount, TagData);

        TagData.lastIndexInTagArray = _updateIndexMap(indexInArray, index, increasedSlotCount, TagData);
    }
    else {
        tagArray[indexInArray + currentUsedSlotCount] = tag;
    }

    _setUsedSlotCount(index, currentUsedSlotCount + 1, usedSlotCountMap);
})

var _updateIndexInTagArrayMap = (startIndex: number, increasedSlotCount: number, TagData: any) => {
    var count = TagData.count,
        indexInTagArrayMap = TagData.indexInTagArrayMap;

    for (let i = startIndex + 1; i <= count; i++) {
        indexInTagArrayMap[i] += increasedSlotCount;
    }
}

var _updateIndexMap = (indexInArray: number, index: number, increasedSlotCount: number, TagData: any) => {
    var indexMap = TagData.indexMap,
        lastIndexInTagArray = TagData.lastIndexInTagArray + increasedSlotCount,
        spliceParamArr = [indexInArray + increasedSlotCount, 0];

    for (let i = 0; i < increasedSlotCount; i++) {
        spliceParamArr.push(index);
    }

    Array.prototype.splice.apply(indexMap, spliceParamArr);

    return lastIndexInTagArray;
}

//todo optimize: collect redundant allocated slot count
export var removeTag = requireCheckFunc((tagComponent: Tag, tag: string, TagData: any) => {
    it("current used slot count should >= 0", () => {
        var index = tagComponent.index,
            usedSlotCountMap = TagData.usedSlotCountMap;

        expect(getUsedSlotCount(index, usedSlotCountMap)).gte(0);
    });
}, (tagComponent: Tag, tag: string, TagData: any) => {
    var index = tagComponent.index,
        indexInArray = _convertTagIndexToIndexInArray(index, TagData),
        usedSlotCountMap = TagData.usedSlotCountMap,
        tagArray = TagData.tagArray,
        currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap),
        newUsedSlotCount = currentUsedSlotCount;

    for (let i = indexInArray, count = indexInArray + currentUsedSlotCount; i < count; i++) {
        if (tagArray[i] === tag) {
            tagArray[i] = void 0;
            newUsedSlotCount = currentUsedSlotCount - 1;

            break;
        }
    }

    if (newUsedSlotCount <= 0) {
        newUsedSlotCount = 0;
    }

    _setUsedSlotCount(index, newUsedSlotCount, usedSlotCountMap);
})

export var addComponent = (component: Tag, gameObject: GameObject) => {
    addComponentToGameObjectMap(TagData.gameObjectMap, component.index, gameObject);
}

export var getSlotCount = (index: number, slotCountMap: Array<number>) => {
    return slotCountMap[index];
}

var _setSlotCount = (index: number, slotCount: number, slotCountMap: Array<number>) => {
    slotCountMap[index] = slotCount;
}

export var getUsedSlotCount = (index: number, usedSlotCountMap: Array<number>) => {
    return usedSlotCountMap[index];
}

var _setUsedSlotCount = (index: number, slotCount: number, usedSlotCountMap: Array<number>) => {
    usedSlotCountMap[index] = slotCount;
}

var _isSlotAllUsed = requireCheckFunc((currentUsedSlotCount: number, currentSlotCount: number) => {
    it("usedSlotCount should <= slotCount", () => {
        expect(currentUsedSlotCount).lte(currentSlotCount);
    });
}, (currentUsedSlotCount: number, currentSlotCount: number) => {
    return currentUsedSlotCount === currentSlotCount;
})

var _allocateDoubleSlotCountAndAddTag = (indexInArray: number, index: number, tag: string, currentSlotCount: number, currentUsedSlotCount: number, TagData: any) => {
    var spliceArr = [indexInArray + currentUsedSlotCount, 0, tag],
        tagArray = TagData.tagArray;

    for (let i = 0, len = currentSlotCount - 1; i < len; i++) {
        spliceArr.push(null);
    }

    Array.prototype.splice.apply(tagArray, spliceArr);

    return currentSlotCount;
}

var _convertTagIndexToIndexInArray = (tagIndex: number, TagData: any) => {
    return TagData.indexInTagArrayMap[tagIndex];
}

var _convertIndexInArrayToTagIndex = (indexInTagArray: number, TagData: any) => {
    return TagData.indexMap[indexInTagArray];
}

export var checkShouldAlive = (tag: Tag, TagData: any) => {
    checkComponentShouldAlive(tag, TagData, (tag: Tag, TagData: any) => {
        return isValidMapValue(TagData.indexMap[TagData.indexInTagArrayMap[tag.index]]);
    })
}

export var disposeComponent = ensureFunc((returnVal, tag: Tag) => {
    it("count should >= 0", () => {
        expect(TagData.count).gte(0);
    });
}, (tag: Tag) => {
    var index = tag.index,
        indexInTagArray = _convertTagIndexToIndexInArray(index, TagData),
        currentUsedSlotCount = getUsedSlotCount(index, TagData.usedSlotCountMap),
        tagArray = TagData.tagArray;

    for (let i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
        tagArray[i] = void 0;
    }

    /*!
    delete for isAlive check
     */
    deleteVal(indexInTagArray, TagData.indexMap);

    TagData.count -= 1;

    markComponentIndexRemoved(TagData.tagMap[index]);

    TagData.disposeCount += 1;

    if (isDisposeTooManyComponents(TagData.disposeCount)) {
        reAllocateTagMap(TagData);

        TagData.disposeCount = 0;
    }
})

export var getGameObject = (index: number, Data: any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var findGameObjectsByTag = (targetTag: string, TagData: any) => {
    var gameObjectArr: Array<GameObject> = [],
        gameObjectMap = TagData.gameObjectMap;

    forEach(TagData.tagArray, (tag: string, indexInTagArray: number) => {
        if (tag === targetTag) {
            gameObjectArr.push(gameObjectMap[_convertIndexInArrayToTagIndex(indexInTagArray, TagData)]);
        }
    });

    return gameObjectArr;
}

export var initData = (TagData: any) => {
    TagData.tagArray = [];
    TagData.slotCountMap = [];
    TagData.usedSlotCountMap = [];
    TagData.indexMap = [];
    TagData.indexInTagArrayMap = [0];
    TagData.gameObjectMap = createMap();
    TagData.tagMap = createMap();

    TagData.lastIndexInTagArray = 0;
    TagData.index = 0;
    TagData.count = 0;
    TagData.disposeCount = 0;
}
