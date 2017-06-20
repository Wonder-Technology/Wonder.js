import { Tag } from "./Tag";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, generateComponentIndex, getComponentGameObject, markComponentIndexRemoved } from "../ComponentSystem";
import { createMap, deleteVal } from "../../utils/objectUtils";
import { forEach } from "../../utils/arrayUtils";
import { TagData } from "./TagData";
import { isDisposeTooManyComponents, reAllocateTag } from "../../utils/memoryUtils";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var create = ensureFunc(function (tag, slotCount, TagData) {
    it("slot array should has no hole", function () {
        for (var _i = 0, _a = TagData.slotCountMap; _i < _a.length; _i++) {
            var count = _a[_i];
            expect(count).exist;
        }
    });
}, function (slotCount, TagData) {
    var tag = new Tag(), index = generateComponentIndex(TagData);
    tag.index = index;
    TagData.count += 1;
    _setSlotCount(index, slotCount, TagData.slotCountMap);
    _setUsedSlotCount(index, 0, TagData.usedSlotCountMap);
    setNextIndexInTagArrayMap(index, slotCount, TagData.indexInTagArrayMap);
    _initIndexMap(index, slotCount, TagData);
    TagData.lastIndexInTagArray += slotCount;
    TagData.tagMap[index] = tag;
    return tag;
});
export var setNextIndexInTagArrayMap = requireCheckFunc(function (index, slotCount, indexInTagArrayMap) {
    it("index should >= 0", function () {
        expect(index).gte(0);
    });
}, function (index, slotCount, indexInTagArrayMap) {
    indexInTagArrayMap[index + 1] = indexInTagArrayMap[index] + slotCount;
});
var _initIndexMap = function (index, slotCount, TagData) {
    var indexMap = TagData.indexMap, lastIndexInTagArray = TagData.lastIndexInTagArray;
    for (var i = lastIndexInTagArray, count = lastIndexInTagArray + slotCount; i < count; i++) {
        indexMap[i] = index;
    }
};
export var addTag = requireCheckFunc(function (tagComponent, tag, TagData) {
    it("tag should not already be added", function () {
        var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData), tagArray = TagData.tagArray, slotCountMap = TagData.slotCountMap, currentSlotCount = getSlotCount(index, slotCountMap);
        expect(tagArray.slice(indexInArray, indexInArray + currentSlotCount).indexOf(tag) > -1).false;
    });
}, function (tagComponent, tag, TagData) {
    var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData), slotCountMap = TagData.slotCountMap, tagArray = TagData.tagArray, usedSlotCountMap = TagData.usedSlotCountMap, currentSlotCount = getSlotCount(index, slotCountMap), currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap);
    if (_isSlotAllUsed(currentUsedSlotCount, currentSlotCount)) {
        var increasedSlotCount = _allocateDoubleSlotCountAndAddTag(indexInArray, index, tag, currentSlotCount, currentUsedSlotCount, TagData), slotCount = currentSlotCount + increasedSlotCount;
        _setSlotCount(index, slotCount, slotCountMap);
        _updateIndexInTagArrayMap(index, increasedSlotCount, TagData);
        TagData.lastIndexInTagArray = _updateIndexMap(indexInArray, index, increasedSlotCount, TagData);
    }
    else {
        tagArray[indexInArray + currentUsedSlotCount] = tag;
    }
    _setUsedSlotCount(index, currentUsedSlotCount + 1, usedSlotCountMap);
});
var _updateIndexInTagArrayMap = function (startIndex, increasedSlotCount, TagData) {
    var count = TagData.count, indexInTagArrayMap = TagData.indexInTagArrayMap;
    for (var i = startIndex + 1; i <= count; i++) {
        indexInTagArrayMap[i] += increasedSlotCount;
    }
};
var _updateIndexMap = function (indexInArray, index, increasedSlotCount, TagData) {
    var indexMap = TagData.indexMap, lastIndexInTagArray = TagData.lastIndexInTagArray + increasedSlotCount, spliceParamArr = [indexInArray + increasedSlotCount, 0];
    for (var i = 0; i < increasedSlotCount; i++) {
        spliceParamArr.push(index);
    }
    Array.prototype.splice.apply(indexMap, spliceParamArr);
    return lastIndexInTagArray;
};
export var removeTag = requireCheckFunc(function (tagComponent, tag, TagData) {
    it("current used slot count should >= 0", function () {
        var index = tagComponent.index, usedSlotCountMap = TagData.usedSlotCountMap;
        expect(getUsedSlotCount(index, usedSlotCountMap)).gte(0);
    });
}, function (tagComponent, tag, TagData) {
    var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData), usedSlotCountMap = TagData.usedSlotCountMap, tagArray = TagData.tagArray, currentUsedSlotCount = getUsedSlotCount(index, usedSlotCountMap), newUsedSlotCount = currentUsedSlotCount;
    for (var i = indexInArray, count = indexInArray + currentUsedSlotCount; i < count; i++) {
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
});
export var addComponent = function (component, gameObject) {
    addComponentToGameObjectMap(TagData.gameObjectMap, component.index, gameObject);
};
export var getSlotCount = function (index, slotCountMap) {
    return slotCountMap[index];
};
var _setSlotCount = function (index, slotCount, slotCountMap) {
    slotCountMap[index] = slotCount;
};
export var getUsedSlotCount = function (index, usedSlotCountMap) {
    return usedSlotCountMap[index];
};
var _setUsedSlotCount = function (index, slotCount, usedSlotCountMap) {
    usedSlotCountMap[index] = slotCount;
};
var _isSlotAllUsed = requireCheckFunc(function (currentUsedSlotCount, currentSlotCount) {
    it("usedSlotCount should <= slotCount", function () {
        expect(currentUsedSlotCount).lte(currentSlotCount);
    });
}, function (currentUsedSlotCount, currentSlotCount) {
    return currentUsedSlotCount === currentSlotCount;
});
var _allocateDoubleSlotCountAndAddTag = function (indexInArray, index, tag, currentSlotCount, currentUsedSlotCount, TagData) {
    var spliceArr = [indexInArray + currentUsedSlotCount, 0, tag], tagArray = TagData.tagArray;
    for (var i = 0, len = currentSlotCount - 1; i < len; i++) {
        spliceArr.push(null);
    }
    Array.prototype.splice.apply(tagArray, spliceArr);
    return currentSlotCount;
};
var _convertTagIndexToIndexInArray = function (tagIndex, TagData) {
    return TagData.indexInTagArrayMap[tagIndex];
};
var _convertIndexInArrayToTagIndex = function (indexInTagArray, TagData) {
    return TagData.indexMap[indexInTagArray];
};
export var disposeComponent = ensureFunc(function (returnVal, tag) {
    it("count should >= 0", function () {
        expect(TagData.count).gte(0);
    });
}, function (tag) {
    var index = tag.index, indexInTagArray = _convertTagIndexToIndexInArray(index, TagData), currentUsedSlotCount = getUsedSlotCount(index, TagData.usedSlotCountMap), tagArray = TagData.tagArray;
    for (var i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
        tagArray[i] = void 0;
    }
    deleteVal(indexInTagArray, TagData.indexMap);
    TagData.count -= 1;
    markComponentIndexRemoved(TagData.tagMap[index]);
    TagData.disposeCount += 1;
    if (isDisposeTooManyComponents(TagData.disposeCount)) {
        reAllocateTag(TagData);
        TagData.disposeCount = 0;
    }
});
export var getGameObject = function (index, Data) {
    return getComponentGameObject(Data.gameObjectMap, index);
};
export var findGameObjectsByTag = function (targetTag, TagData) {
    var gameObjectArr = [], gameObjectMap = TagData.gameObjectMap;
    forEach(TagData.tagArray, function (tag, indexInTagArray) {
        if (tag === targetTag) {
            gameObjectArr.push(gameObjectMap[_convertIndexInArrayToTagIndex(indexInTagArray, TagData)]);
        }
    });
    return gameObjectArr;
};
export var initData = function (TagData) {
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
};
//# sourceMappingURL=TagSystem.js.map