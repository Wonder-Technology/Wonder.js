import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getStartIndexInArrayBuffer, isIndexUsed } from "./utils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { getChildren, isChildrenExist } from "./hierarchySystem";
import { moveToIndex, swap } from "./operateDataSystem";
import { forEach } from "../../utils/arrayUtils";
import { LinkNode } from "./LinkList";
export var addFirstDirtyIndex = ensureFunc(function (firstDirtyIndex, ThreeDTransformData) {
    it("firstDirtyIndex should <= count", function () {
        expect(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (ThreeDTransformData) {
    return ThreeDTransformData.firstDirtyIndex + 1;
});
export var minusFirstDirtyIndex = ensureFunc(function (firstDirtyIndex) {
    it("firstDirtyIndex should >= start index:" + getStartIndexInArrayBuffer(), function () {
        expect(firstDirtyIndex).gte(getStartIndexInArrayBuffer());
    });
}, function (firstDirtyIndex) {
    return firstDirtyIndex - 1;
});
export var generateNotUsedIndexInArrayBuffer = ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, function (ThreeDTransformData) {
    var result = ThreeDTransformData.indexInArrayBuffer;
    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }
    ThreeDTransformData.indexInArrayBuffer += 1;
    return result;
});
var _isValidArrayValue = function (val) {
    return isNotUndefined(val);
};
var _isValidLinkNode = function (node) {
    return node !== null;
};
export var generateNotUsedIndexInNormalList = ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, function (ThreeDTransformData) {
    var index = _getNotUsedIndexFromArr(ThreeDTransformData);
    if (_isValidArrayValue(index)) {
        return index;
    }
    index = ThreeDTransformData.indexInArrayBuffer;
    ThreeDTransformData.indexInArrayBuffer += 1;
    return index;
});
export var addToDirtyList = requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    it("firstDirtyIndex should <= count", function () {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    var targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
    if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    return targetDirtyIndex;
});
var _getNotUsedIndexFromArr = function (ThreeDTransformData) {
    var notUsedIndexLinkList = ThreeDTransformData.notUsedIndexLinkList, node = null;
    do {
        node = _getNotUsedIndexNode(notUsedIndexLinkList);
    } while (_isValidLinkNode(node) && isIndexUsed(node.val, ThreeDTransformData));
    return node.val;
};
var _getNotUsedIndexNode = function (notUsedIndexLinkList) {
    return notUsedIndexLinkList.shift();
};
export var addNotUsedIndex = function (index, notUsedIndexLinkList) {
    notUsedIndexLinkList.push(LinkNode.create(index));
};
export var isNotDirty = function (indexInArrayBuffer, firstDirtyIndex) {
    return indexInArrayBuffer < firstDirtyIndex;
};
export var addItAndItsChildrenToDirtyList = function (rootIndexInArrayBuffer, uid, ThreeDTransformData) {
    var indexInArraybuffer = rootIndexInArrayBuffer, children = getChildren(uid, ThreeDTransformData);
    if (isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }
    if (isChildrenExist(children)) {
        forEach(children, function (child) {
            addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
        });
    }
    return ThreeDTransformData;
};
var _checkGeneratedNotUsedIndex = function (ThreeDTransformData, indexInArrayBuffer) {
    it("indexInArrayBuffer should < firstDirtyIndex", function () {
        expect(indexInArrayBuffer).exist;
        expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
    it("index should not be used", function () {
        expect(isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
    });
};
//# sourceMappingURL=dirtySystem.js.map