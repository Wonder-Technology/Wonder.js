"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tag_1 = require("./Tag");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var ComponentSystem_1 = require("../ComponentSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
var TagData_1 = require("./TagData");
var memoryUtils_1 = require("../../utils/memoryUtils");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.create = contract_1.ensureFunc(function (tag, slotCount, TagData) {
    contract_1.it("slot array should has no hole", function () {
        for (var _i = 0, _a = TagData.slotCountMap; _i < _a.length; _i++) {
            var count = _a[_i];
            wonder_expect_js_1.expect(count).exist;
        }
    });
}, function (slotCount, TagData) {
    var tag = new Tag_1.Tag(), index = ComponentSystem_1.generateComponentIndex(TagData);
    tag.index = index;
    TagData.count += 1;
    _setSlotCount(index, slotCount, TagData.slotCountMap);
    _setUsedSlotCount(index, 0, TagData.usedSlotCountMap);
    exports.setNextIndexInTagArrayMap(index, slotCount, TagData.indexInTagArrayMap);
    _initIndexMap(index, slotCount, TagData);
    TagData.lastIndexInTagArray += slotCount;
    TagData.tagMap[index] = tag;
    return tag;
});
exports.setNextIndexInTagArrayMap = contract_1.requireCheckFunc(function (index, slotCount, indexInTagArrayMap) {
    contract_1.it("index should >= 0", function () {
        wonder_expect_js_1.expect(index).gte(0);
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
exports.addTag = contract_1.requireCheckFunc(function (tagComponent, tag, TagData) {
    contract_1.it("tag should not already be added", function () {
        var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData), tagArray = TagData.tagArray, slotCountMap = TagData.slotCountMap, currentSlotCount = exports.getSlotCount(index, slotCountMap);
        wonder_expect_js_1.expect(tagArray.slice(indexInArray, indexInArray + currentSlotCount).indexOf(tag) > -1).false;
    });
}, function (tagComponent, tag, TagData) {
    var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData), slotCountMap = TagData.slotCountMap, tagArray = TagData.tagArray, usedSlotCountMap = TagData.usedSlotCountMap, currentSlotCount = exports.getSlotCount(index, slotCountMap), currentUsedSlotCount = exports.getUsedSlotCount(index, usedSlotCountMap);
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
exports.removeTag = contract_1.requireCheckFunc(function (tagComponent, tag, TagData) {
    contract_1.it("current used slot count should >= 0", function () {
        var index = tagComponent.index, usedSlotCountMap = TagData.usedSlotCountMap;
        wonder_expect_js_1.expect(exports.getUsedSlotCount(index, usedSlotCountMap)).gte(0);
    });
}, function (tagComponent, tag, TagData) {
    var index = tagComponent.index, indexInArray = _convertTagIndexToIndexInArray(index, TagData), usedSlotCountMap = TagData.usedSlotCountMap, tagArray = TagData.tagArray, currentUsedSlotCount = exports.getUsedSlotCount(index, usedSlotCountMap), newUsedSlotCount = currentUsedSlotCount;
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
exports.addComponent = function (component, gameObject) {
    ComponentSystem_1.addComponentToGameObjectMap(TagData_1.TagData.gameObjectMap, component.index, gameObject);
};
exports.getSlotCount = function (index, slotCountMap) {
    return slotCountMap[index];
};
var _setSlotCount = function (index, slotCount, slotCountMap) {
    slotCountMap[index] = slotCount;
};
exports.getUsedSlotCount = function (index, usedSlotCountMap) {
    return usedSlotCountMap[index];
};
var _setUsedSlotCount = function (index, slotCount, usedSlotCountMap) {
    usedSlotCountMap[index] = slotCount;
};
var _isSlotAllUsed = contract_1.requireCheckFunc(function (currentUsedSlotCount, currentSlotCount) {
    contract_1.it("usedSlotCount should <= slotCount", function () {
        wonder_expect_js_1.expect(currentUsedSlotCount).lte(currentSlotCount);
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
exports.checkShouldAlive = function (tag, TagData) {
    ComponentSystem_1.checkComponentShouldAlive(tag, TagData, function (tag, TagData) {
        return objectUtils_1.isValidMapValue(TagData.indexMap[TagData.indexInTagArrayMap[tag.index]]);
    });
};
exports.disposeComponent = contract_1.ensureFunc(function (returnVal, tag) {
    contract_1.it("count should >= 0", function () {
        wonder_expect_js_1.expect(TagData_1.TagData.count).gte(0);
    });
}, function (tag) {
    var index = tag.index, indexInTagArray = _convertTagIndexToIndexInArray(index, TagData_1.TagData), currentUsedSlotCount = exports.getUsedSlotCount(index, TagData_1.TagData.usedSlotCountMap), tagArray = TagData_1.TagData.tagArray;
    for (var i = indexInTagArray, count = indexInTagArray + currentUsedSlotCount; i < count; i++) {
        tagArray[i] = void 0;
    }
    objectUtils_1.deleteVal(indexInTagArray, TagData_1.TagData.indexMap);
    TagData_1.TagData.count -= 1;
    ComponentSystem_1.markComponentIndexRemoved(TagData_1.TagData.tagMap[index]);
    TagData_1.TagData.disposeCount += 1;
    if (memoryUtils_1.isDisposeTooManyComponents(TagData_1.TagData.disposeCount)) {
        memoryUtils_1.reAllocateTagMap(TagData_1.TagData);
        TagData_1.TagData.disposeCount = 0;
    }
});
exports.getGameObject = function (index, Data) {
    return ComponentSystem_1.getComponentGameObject(Data.gameObjectMap, index);
};
exports.findGameObjectsByTag = function (targetTag, TagData) {
    var gameObjectArr = [], gameObjectMap = TagData.gameObjectMap;
    arrayUtils_1.forEach(TagData.tagArray, function (tag, indexInTagArray) {
        if (tag === targetTag) {
            gameObjectArr.push(gameObjectMap[_convertIndexInArrayToTagIndex(indexInTagArray, TagData)]);
        }
    });
    return gameObjectArr;
};
exports.initData = function (TagData) {
    TagData.tagArray = [];
    TagData.slotCountMap = [];
    TagData.usedSlotCountMap = [];
    TagData.indexMap = [];
    TagData.indexInTagArrayMap = [0];
    TagData.gameObjectMap = objectUtils_1.createMap();
    TagData.tagMap = objectUtils_1.createMap();
    TagData.lastIndexInTagArray = 0;
    TagData.index = 0;
    TagData.count = 0;
    TagData.disposeCount = 0;
};
//# sourceMappingURL=TagSystem.js.map