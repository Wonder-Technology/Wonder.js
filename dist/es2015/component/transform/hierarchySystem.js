import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { addItAndItsChildrenToDirtyList } from "./dirtySystem";
import { removeChildEntity } from "../../utils/entityUtils";
export var getParent = requireCheckFunc(function (uid, ThreeDTransformData) {
    it("uid should exist", function () {
        expect(uid).exist;
    });
}, function (uid, ThreeDTransformData) {
    return ThreeDTransformData.parentMap[uid];
});
export var setParent = requireCheckFunc(function (transform, parent, ThreeDTransformData) {
    it("parent should not be self", function () {
        if (parent !== null) {
            expect(_isTransformEqual(transform, parent)).false;
        }
    });
}, function (transform, parent, ThreeDTransformData) {
    var indexInArrayBuffer = transform.index, uid = transform.uid, parentIndexInArrayBuffer = null, currentParent = getParent(uid, ThreeDTransformData), isCurrentParentExisit = isParentExist(currentParent);
    if (parent === null) {
        if (isCurrentParentExisit) {
            _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
            addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
        }
        return;
    }
    parentIndexInArrayBuffer = parent.index;
    if (isCurrentParentExisit) {
        if (isNotChangeParent(currentParent.index, parentIndexInArrayBuffer)) {
            return;
        }
        _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
    }
    _addToParent(uid, transform, parent, ThreeDTransformData);
    addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
});
var _isTransformEqual = function (tra1, tra2) { return tra1.uid === tra2.uid; };
export var getChildren = function (uid, ThreeDTransformData) {
    return ThreeDTransformData.childrenMap[uid];
};
export var isParentExist = function (parent) { return isNotUndefined(parent); };
export var isChildrenExist = function (children) { return isNotUndefined(children); };
export var isNotChangeParent = function (currentParentIndexInArrayBuffer, newParentIndexInArrayBuffer) {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
};
export var removeHierarchyData = function (uid, ThreeDTransformData) {
    deleteVal(uid, ThreeDTransformData.childrenMap);
};
var _removeHierarchyFromParent = function (parent, targetUID, ThreeDTransformData) {
    var parentUID = parent.uid, children = getChildren(parentUID, ThreeDTransformData);
    deleteVal(targetUID, ThreeDTransformData.parentMap);
    if (isNotValidMapValue(children)) {
        return;
    }
    _removeChild(parentUID, targetUID, children, ThreeDTransformData);
};
var _removeChild = function (parentUID, targetUID, children, ThreeDTransformData) {
    removeChildEntity(children, targetUID);
};
var _addChild = requireCheckFunc(function (uid, child, ThreeDTransformData) {
    it("children should be empty array if has no child", function () {
        expect(getChildren(uid, ThreeDTransformData)).be.a("array");
    });
}, function (uid, child, ThreeDTransformData) {
    var children = getChildren(uid, ThreeDTransformData);
    children.push(child);
});
export var setChildren = function (uid, children, ThreeDTransformData) {
    ThreeDTransformData.childrenMap[uid] = children;
};
var _setParent = function (uid, parent, ThreeDTransformData) {
    ThreeDTransformData.parentMap[uid] = parent;
};
var _addToParent = requireCheckFunc(function (targetUID, target, parent, ThreeDTransformData) {
    it("the child one should not has parent", function () {
        expect(isValidMapValue(getParent(targetUID, ThreeDTransformData))).false;
    });
    it("parent should not already has the child", function () {
        var parentUID = parent.uid, children = getChildren(parentUID, ThreeDTransformData);
        if (isValidMapValue(children)) {
            expect(children.indexOf(target)).equal(-1);
        }
    });
}, function (targetUID, target, parent, ThreeDTransformData) {
    var parentUID = parent.uid;
    _setParent(targetUID, parent, ThreeDTransformData);
    _addChild(parentUID, target, ThreeDTransformData);
});
//# sourceMappingURL=hierarchySystem.js.map