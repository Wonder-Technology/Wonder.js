import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getStartIndexInArrayBuffer, isIndexUsed } from "./utils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { getChildren, isChildrenExist } from "./hierarchySystem";
import { moveToIndex, swap } from "./operateDataSystem";
import { forEach } from "../../utils/arrayUtils";
import { LinkNode } from "./LinkList";
import { isNotAlive } from "./ThreeDTransformSystem";
import { setIsTranslate } from "./isTransformSystem";
export var addFirstDirtyIndex = ensureFunc(function (firstDirtyIndex, ThreeDTransformData) {
    it("firstDirtyIndex should <= maxCount", function () {
        expect(firstDirtyIndex).lte(ThreeDTransformData.maxCount);
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
export var generateNotUsedIndexInArrayBuffer = ensureFunc(function (index, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, index);
}, function (ThreeDTransformData) {
    var result = ThreeDTransformData.index;
    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }
    ThreeDTransformData.index += 1;
    return result;
});
var _isValidArrayValue = function (val) {
    return isNotUndefined(val);
};
var _isValidLinkNode = function (node) {
    return node !== null;
};
export var generateNotUsedIndexInNormalList = ensureFunc(function (index, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, index);
}, function (ThreeDTransformData) {
    var index = _getNotUsedIndexFromArr(ThreeDTransformData);
    if (_isValidArrayValue(index)) {
        return index;
    }
    index = ThreeDTransformData.index;
    ThreeDTransformData.index += 1;
    return index;
});
export var addToDirtyList = requireCheckFunc(function (index, ThreeDTransformData) {
    it("firstDirtyIndex should <= maxCount", function () {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
}, function (index, ThreeDTransformData) {
    var targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
    if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        swap(index, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        moveToIndex(index, targetDirtyIndex, ThreeDTransformData);
    }
    return targetDirtyIndex;
});
var _getNotUsedIndexFromArr = function (ThreeDTransformData) {
    var notUsedIndexLinkList = ThreeDTransformData.notUsedIndexLinkList, isValidLinkNode = true, node = null;
    do {
        node = _getNotUsedIndexNode(notUsedIndexLinkList);
        isValidLinkNode = _isValidLinkNode(node);
    } while (isValidLinkNode && isIndexUsed(node.val, ThreeDTransformData));
    if (!isValidLinkNode) {
        return void 0;
    }
    return node.val;
};
var _getNotUsedIndexNode = function (notUsedIndexLinkList) {
    return notUsedIndexLinkList.shift();
};
export var addNotUsedIndex = requireCheckFunc(function (index, notUsedIndexLinkList) {
    it("index shouldn't already exist", function () {
        expect(notUsedIndexLinkList.hasDuplicateNode(index)).false;
    });
}, function (index, notUsedIndexLinkList) {
    notUsedIndexLinkList.push(LinkNode.create(index));
});
export var isNotDirty = function (index, firstDirtyIndex) {
    return index < firstDirtyIndex;
};
export var addItAndItsChildrenToDirtyList = function (rootIndexInArrayBuffer, uid, ThreeDTransformData) {
    var indexInArraybuffer = rootIndexInArrayBuffer, children = getChildren(uid, ThreeDTransformData);
    if (isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        setIsTranslate(uid, true, ThreeDTransformData);
        addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }
    if (isChildrenExist(children)) {
        forEach(children, function (child) {
            if (isNotAlive(child, ThreeDTransformData)) {
                return;
            }
            addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
        });
    }
    return ThreeDTransformData;
};
var _checkGeneratedNotUsedIndex = function (ThreeDTransformData, index) {
    it("index should < firstDirtyIndex", function () {
        expect(index).exist;
        expect(index).lt(ThreeDTransformData.firstDirtyIndex);
    });
    it("index should not be used", function () {
        expect(isIndexUsed(index, ThreeDTransformData)).false;
    });
};
//# sourceMappingURL=dirtySystem.js.map