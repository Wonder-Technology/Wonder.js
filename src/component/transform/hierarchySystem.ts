import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { deleteVal, isNotValidMapValue, isValidMapValue } from "../../utils/objectUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { ThreeDTransform } from "./ThreeDTransform";
import { addItAndItsChildrenToDirtyList } from "./dirtySystem";
import { filter } from "../../utils/arrayUtils";

export var getParent = requireCheckFunc ((uid: string, ThreeDTransformData:any) => {
    it("uid should exist", () => {
        expect(uid).exist;
    });
}, (uid: string, ThreeDTransformData:any) => {
    return ThreeDTransformData.parentMap[uid];
})

export var setParent = requireCheckFunc((transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => {
    it("parent should not be self", () => {
        if(parent !== null){
            expect(_isTransformEqual(transform, parent)).false;
        }
    });
}, (transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid,
        parentIndexInArrayBuffer: number = null,
        currentParent:ThreeDTransform = getParent(uid, ThreeDTransformData),
        isCurrentParentExisit = isParentExist(currentParent);

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
})

var _isTransformEqual = (tra1:ThreeDTransform, tra2:ThreeDTransform) => tra1.uid === tra2.uid;

export var getChildren = (uid:number, ThreeDTransformData:any) => {
    return ThreeDTransformData.childrenMap[uid];
}

export var isParentExist = (parent:ThreeDTransform) => isNotUndefined(parent);

export var isChildrenExist = (children:Array<ThreeDTransform>) => isNotUndefined(children);

export var isNotChangeParent = (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
}

export var removeHierarchyData = (uid:number, ThreeDTransformData: any) => {
    deleteVal(uid, ThreeDTransformData.childrenMap);

    let parent = getParent(uid, ThreeDTransformData);

    if (isParentExist(parent)) {
        _removeHierarchyFromParent(parent, uid, ThreeDTransformData);
    }
}

var _removeHierarchyFromParent = (parent: ThreeDTransform, targetUID: number, ThreeDTransformData:any) => {
    var parentUID = parent.uid,
        children = getChildren(parentUID, ThreeDTransformData);

    deleteVal(targetUID, ThreeDTransformData.parentMap);

    if (isNotValidMapValue(children)) {
        return;
    }

    _setChildren(parentUID, filter(children, (transform:ThreeDTransform) => {
        return transform.uid !== targetUID;
    }), ThreeDTransformData);
}

var _addChild = (uid:number, child:ThreeDTransform, ThreeDTransformData:any) => {
    var children = getChildren(uid, ThreeDTransformData);

    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        _setChildren(uid, [child], ThreeDTransformData);
    }
}

var _setChildren = (uid:number, children:Array<ThreeDTransform>, ThreeDTransformData:any) => {
    ThreeDTransformData.childrenMap[uid] = children;
}

var _setParent = (uid:number, parent:ThreeDTransform, ThreeDTransformData:any) => {
    ThreeDTransformData.parentMap[uid] = parent;
}

var _addToParent = requireCheckFunc((targetUID:number, target:ThreeDTransform, parent:ThreeDTransform, ThreeDTransformData: any) => {
    it("the child one should not has parent", () => {
        expect(isValidMapValue(getParent(targetUID, ThreeDTransformData))).false;
    });
    it("parent should not already has the child", () => {
        var parentUID = parent.uid,
            children = getChildren(parentUID, ThreeDTransformData);

        if(isValidMapValue(children)){
            expect(children.indexOf(target)).equal(-1);
        }
    });
},(targetUID:number, target:ThreeDTransform, parent:ThreeDTransform, ThreeDTransformData: any) => {
    var parentUID = parent.uid;

    _setParent(targetUID, parent, ThreeDTransformData);

    _addChild(parentUID, target, ThreeDTransformData);
})
