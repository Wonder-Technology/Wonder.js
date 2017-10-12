import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getStartIndexInArrayBuffer, isIndexUsed } from "./utils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { getChildren, isChildrenExist } from "./hierarchySystem";
import { ThreeDTransform } from "./ThreeDTransform";
import { moveToIndex, swap } from "./operateDataSystem";
import { forEach } from "../../utils/arrayUtils";
import { LinkList, LinkNode } from "./LinkList";
import { isNotAlive } from "./ThreeDTransformSystem";
import { setIsTranslate } from "./isTransformSystem";

export const addFirstDirtyIndex = ensureFunc((firstDirtyIndex: number, ThreeDTransformData: any) => {
    it("firstDirtyIndex should <= maxCount", () => {
        expect(firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
}, (ThreeDTransformData: any) => {
    return ThreeDTransformData.firstDirtyIndex + 1;
})

export const minusFirstDirtyIndex = ensureFunc((firstDirtyIndex: number) => {
    it(`firstDirtyIndex should >= start index:${getStartIndexInArrayBuffer()}`, () => {
        expect(firstDirtyIndex).gte(getStartIndexInArrayBuffer());
    });
}, (firstDirtyIndex: number) => {
    return firstDirtyIndex - 1;
})

export const generateNotUsedIndexInArrayBuffer = ensureFunc((index: number, ThreeDTransformData: any) => {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, index);
}, (ThreeDTransformData: any) => {
    var result = ThreeDTransformData.index;

    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }

    ThreeDTransformData.index += 1;

    return result;
})

const _isValidArrayValue =(val: any) => {
    return isNotUndefined(val);
}

const _isValidLinkNode =(node: LinkNode<number>) => {
    return node !== null;
}

export const generateNotUsedIndexInNormalList = ensureFunc((index: number, ThreeDTransformData: any) => {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, index);
}, (ThreeDTransformData: any) => {
    var index = _getNotUsedIndexFromArr(ThreeDTransformData);

    if (_isValidArrayValue(index)) {
        return index;
    }

    index = ThreeDTransformData.index;

    ThreeDTransformData.index += 1;

    return index;
})

export const addToDirtyList = requireCheckFunc((index: number, ThreeDTransformData: any) => {
    it("firstDirtyIndex should <= maxCount", () => {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
    // it("target index should not be used", () => {
    //     var targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    //
    //     expect(isIndexUsed(targetDirtyIndex, ThreeDTransformData)).false;
    // });
}, (index: number, ThreeDTransformData: any) => {
    let targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);

    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

    if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        swap(index, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        moveToIndex(index, targetDirtyIndex, ThreeDTransformData);
    }

    return targetDirtyIndex;
})

const _getNotUsedIndexFromArr =(ThreeDTransformData: any) => {
    var notUsedIndexLinkList = ThreeDTransformData.notUsedIndexLinkList,
        isValidLinkNode = true,
        node: LinkNode<number> = null;

    do {
        node = _getNotUsedIndexNode(notUsedIndexLinkList);
        isValidLinkNode = _isValidLinkNode(node);
    }
    while (isValidLinkNode && isIndexUsed(node.val, ThreeDTransformData))

    if (!isValidLinkNode) {
        return void 0;
    }

    return node.val;
}

const _getNotUsedIndexNode =(notUsedIndexLinkList: LinkList<number>) => {
    /*!
    optimize: return the first one to ensure that the result index be as much remote from firDirtyIndex as possible(so that it can reduce swap when add to dirty list).

    not shift array! because it's too slow in firefox!
    so here use link list->shift.
     */
    return notUsedIndexLinkList.shift();
};

export const addNotUsedIndex = requireCheckFunc((index: number, notUsedIndexLinkList: LinkList<number>) => {
    it("index shouldn't already exist", () => {
        expect(notUsedIndexLinkList.hasDuplicateNode(index)).false;
    });
}, (index: number, notUsedIndexLinkList: LinkList<number>) => {
    notUsedIndexLinkList.push(LinkNode.create(index));
})

export const isNotDirty = (index: number, firstDirtyIndex: number) => {
    return index < firstDirtyIndex;
}

export const addItAndItsChildrenToDirtyList = (rootIndexInArrayBuffer: number, uid: number, ThreeDTransformData: any) => {
    var indexInArraybuffer: number = rootIndexInArrayBuffer,
        children = getChildren(uid, ThreeDTransformData);

    if (isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        setIsTranslate(uid, true, ThreeDTransformData);

        addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }

    if (isChildrenExist(children)) {
        forEach(children, (child: ThreeDTransform) => {
            if (isNotAlive(child, ThreeDTransformData)) {
                return;
            }

            addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
        });
    }

    return ThreeDTransformData;
}

const _checkGeneratedNotUsedIndex =(ThreeDTransformData: any, index: number) => {
    // it("notUsedIndexLinkList shouldn't contain the index", () => {
    //     expect(ThreeDTransformData.notUsedIndexLinkList.indexOf(index)).equal(-1);
    // });
    it("index should < firstDirtyIndex", () => {
        expect(index).exist;
        expect(index).lt(ThreeDTransformData.firstDirtyIndex);
    });
    it("index should not be used", () => {
        expect(isIndexUsed(index, ThreeDTransformData)).false;
    });
}
