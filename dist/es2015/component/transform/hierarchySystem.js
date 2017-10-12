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
export var setParent = requireCheckFunc(function (parent, child, ThreeDTransformData) {
    it("parent should not be self", function () {
        if (parent !== null) {
            expect(_isTransformEqual(child, parent)).false;
        }
    });
}, function (parent, child, ThreeDTransformData) {
    var index = child.index, uid = child.uid, parentIndexInArrayBuffer = null, currentParent = getParent(uid, ThreeDTransformData), isCurrentParentExisit = isParentExist(currentParent);
    if (parent === null) {
        if (isCurrentParentExisit) {
            _removeHierarchyFromParent(currentParent, uid, ThreeDTransformData);
            addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
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
    _addToParent(uid, child, parent, ThreeDTransformData);
    addItAndItsChildrenToDirtyList(index, uid, ThreeDTransformData);
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
var _removeHierarchyFromParent = function (parent, targetUId, ThreeDTransformData) {
    var parentUId = parent.uid, children = getChildren(parentUId, ThreeDTransformData);
    deleteVal(targetUId, ThreeDTransformData.parentMap);
    if (isNotValidMapValue(children)) {
        return;
    }
    _removeChild(parentUId, targetUId, children, ThreeDTransformData);
};
var _removeChild = function (parentUId, targetUId, children, ThreeDTransformData) {
    removeChildEntity(children, targetUId);
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
var _addToParent = requireCheckFunc(function (targetUId, target, parent, ThreeDTransformData) {
    it("the child one should not has parent", function () {
        expect(isValidMapValue(getParent(targetUId, ThreeDTransformData))).false;
    });
    it("parent should not already has the child", function () {
        var parentUId = parent.uid, children = getChildren(parentUId, ThreeDTransformData);
        if (isValidMapValue(children)) {
            expect(children.indexOf(target)).equal(-1);
        }
    });
}, function (targetUId, target, parent, ThreeDTransformData) {
    var parentUId = parent.uid;
    _setParent(targetUId, parent, ThreeDTransformData);
    _addChild(parentUId, target, ThreeDTransformData);
});
//# sourceMappingURL=hierarchySystem.js.map