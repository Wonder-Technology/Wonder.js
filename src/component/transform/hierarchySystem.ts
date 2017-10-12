import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { ThreeDTransform } from "./ThreeDTransform";
import { addItAndItsChildrenToDirtyList } from "./dirtySystem";
import { removeChildEntity } from "../../utils/entityUtils";

export const getParent = requireCheckFunc((uid: string, ThreeDTransformData: any) => {
    it("uid should exist", () => {
        expect(uid).exist;
    });
}, (uid: string, ThreeDTransformData: any) => {
    return ThreeDTransformData.parentMap[uid];
})

export const setParent = requireCheckFunc((parent: ThreeDTransform, child: ThreeDTransform, ThreeDTransformData: any) => {
    it("parent should not be self", () => {
        if (parent !== null) {
            expect(_isTransformEqual(child, parent)).false;
        }
    });
}, (parent: ThreeDTransform, child: ThreeDTransform, ThreeDTransformData: any) => {
    var index = child.index,
        uid = child.uid,
        parentIndexInArrayBuffer: number = null,
        currentParent: ThreeDTransform = getParent(uid, ThreeDTransformData),
        isCurrentParentExisit = isParentExist(currentParent);

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
})

const _isTransformEqual = (tra1: ThreeDTransform, tra2: ThreeDTransform) => tra1.uid === tra2.uid;

export const getChildren = (uid: number, ThreeDTransformData: any) => {
    return ThreeDTransformData.childrenMap[uid];
}

export const isParentExist = (parent: ThreeDTransform) => isNotUndefined(parent);

export const isChildrenExist = (children: Array<ThreeDTransform>) => isNotUndefined(children);

export const isNotChangeParent = (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
}

export const removeHierarchyData = (uid: number, ThreeDTransformData: any) => {
    deleteVal(uid, ThreeDTransformData.childrenMap);
}

const _removeHierarchyFromParent = (parent: ThreeDTransform, targetUId: number, ThreeDTransformData: any) => {
    var parentUId = parent.uid,
        children = getChildren(parentUId, ThreeDTransformData);

    deleteVal(targetUId, ThreeDTransformData.parentMap);

    if (isNotValidMapValue(children)) {
        return;
    }

    _removeChild(parentUId, targetUId, children, ThreeDTransformData);
}

const _removeChild = (parentUId: number, targetUId: number, children: Array<ThreeDTransform>, ThreeDTransformData: any) => {
    removeChildEntity(children, targetUId);
};

const _addChild = requireCheckFunc((uid: number, child: ThreeDTransform, ThreeDTransformData: any) => {
    it("children should be empty array if has no child", () => {
        expect(getChildren(uid, ThreeDTransformData)).be.a("array");
    });
}, (uid: number, child: ThreeDTransform, ThreeDTransformData: any) => {
    var children = getChildren(uid, ThreeDTransformData);

    children.push(child);
})

export const setChildren = (uid: number, children: Array<ThreeDTransform>, ThreeDTransformData: any) => {
    ThreeDTransformData.childrenMap[uid] = children;
}

const _setParent = (uid: number, parent: ThreeDTransform, ThreeDTransformData: any) => {
    ThreeDTransformData.parentMap[uid] = parent;
}

const _addToParent = requireCheckFunc((targetUId: number, target: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => {
    it("the child one should not has parent", () => {
        expect(isValidMapValue(getParent(targetUId, ThreeDTransformData))).false;
    });
    it("parent should not already has the child", () => {
        var parentUId = parent.uid,
            children = getChildren(parentUId, ThreeDTransformData);

        if (isValidMapValue(children)) {
            expect(children.indexOf(target)).equal(-1);
        }
    });
}, (targetUId: number, target: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => {
    var parentUId = parent.uid;

    _setParent(targetUId, parent, ThreeDTransformData);

    _addChild(parentUId, target, ThreeDTransformData);
})
