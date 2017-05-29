"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var utils_1 = require("./utils");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var hierarchySystem_1 = require("./hierarchySystem");
var operateDataSystem_1 = require("./operateDataSystem");
var arrayUtils_1 = require("../../utils/arrayUtils");
var LinkList_1 = require("./LinkList");
exports.addFirstDirtyIndex = contract_1.ensureFunc(function (firstDirtyIndex, ThreeDTransformData) {
    contract_1.it("firstDirtyIndex should <= count", function () {
        wonder_expect_js_1.expect(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (ThreeDTransformData) {
    return ThreeDTransformData.firstDirtyIndex + 1;
});
exports.minusFirstDirtyIndex = contract_1.ensureFunc(function (firstDirtyIndex) {
    contract_1.it("firstDirtyIndex should >= start index:" + utils_1.getStartIndexInArrayBuffer(), function () {
        wonder_expect_js_1.expect(firstDirtyIndex).gte(utils_1.getStartIndexInArrayBuffer());
    });
}, function (firstDirtyIndex) {
    return firstDirtyIndex - 1;
});
exports.generateNotUsedIndexInArrayBuffer = contract_1.ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
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
    return JudgeUtils_1.isNotUndefined(val);
};
var _isValidLinkNode = function (node) {
    return node !== null;
};
exports.generateNotUsedIndexInNormalList = contract_1.ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
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
exports.addToDirtyList = contract_1.requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    contract_1.it("firstDirtyIndex should <= count", function () {
        wonder_expect_js_1.expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    var targetDirtyIndex = exports.minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
    if (utils_1.isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        operateDataSystem_1.swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        operateDataSystem_1.moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    return targetDirtyIndex;
});
var _getNotUsedIndexFromArr = function (ThreeDTransformData) {
    var notUsedIndexLinkList = ThreeDTransformData.notUsedIndexLinkList, node = null;
    do {
        node = _getNotUsedIndexNode(notUsedIndexLinkList);
    } while (_isValidLinkNode(node) && utils_1.isIndexUsed(node.val, ThreeDTransformData));
    return node.val;
};
var _getNotUsedIndexNode = function (notUsedIndexLinkList) {
    return notUsedIndexLinkList.shift();
};
exports.addNotUsedIndex = function (index, notUsedIndexLinkList) {
    notUsedIndexLinkList.push(LinkList_1.LinkNode.create(index));
};
exports.isNotDirty = function (indexInArrayBuffer, firstDirtyIndex) {
    return indexInArrayBuffer < firstDirtyIndex;
};
exports.addItAndItsChildrenToDirtyList = function (rootIndexInArrayBuffer, uid, ThreeDTransformData) {
    var indexInArraybuffer = rootIndexInArrayBuffer, children = hierarchySystem_1.getChildren(uid, ThreeDTransformData);
    if (exports.isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        exports.addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }
    if (hierarchySystem_1.isChildrenExist(children)) {
        arrayUtils_1.forEach(children, function (child) {
            exports.addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
        });
    }
    return ThreeDTransformData;
};
var _checkGeneratedNotUsedIndex = function (ThreeDTransformData, indexInArrayBuffer) {
    contract_1.it("indexInArrayBuffer should < firstDirtyIndex", function () {
        wonder_expect_js_1.expect(indexInArrayBuffer).exist;
        wonder_expect_js_1.expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
    contract_1.it("index should not be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
    });
};
//# sourceMappingURL=dirtySystem.js.map