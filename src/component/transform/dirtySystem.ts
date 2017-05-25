import forEach from "wonder-lodash/forEach";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { getStartIndexInArrayBuffer, isIndexUsed } from "./utils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { getChildren } from "./hierarchySystem";
import { ThreeDTransform } from "./ThreeDTransform";
import { moveToIndex, swap } from "./operateDataSystem";

export var addFirstDirtyIndex = ensureFunc((firstDirtyIndex: number, ThreeDTransformData: any) => {
    it("firstDirtyIndex should <= count", () => {
        expect(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, (ThreeDTransformData: any) => {
    return ThreeDTransformData.firstDirtyIndex + 1;
})

export var minusFirstDirtyIndex = ensureFunc((firstDirtyIndex: number) => {
    it(`firstDirtyIndex should >= start index:${getStartIndexInArrayBuffer()}`, () => {
        expect(firstDirtyIndex).gte(getStartIndexInArrayBuffer());
    });
}, (firstDirtyIndex: number) => {
    return firstDirtyIndex - 1;
})

export var generateNotUsedIndexInArrayBuffer = ensureFunc((indexInArrayBuffer:number, ThreeDTransformData: any) => {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, (ThreeDTransformData: any) => {
    var result = ThreeDTransformData.indexInArrayBuffer;

    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }

    ThreeDTransformData.indexInArrayBuffer += 1;

    return result;
})

var _isValidArrayValue = (val: any) => {
    return isNotUndefined(val);
}

export var generateNotUsedIndexInNormalList = ensureFunc((indexInArrayBuffer:number, ThreeDTransformData: any) => {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, (ThreeDTransformData: any) => {
    var index = _getNotUsedIndexFromArr(ThreeDTransformData);

    if (_isValidArrayValue(index)) {
        return index;
    }

    index = ThreeDTransformData.indexInArrayBuffer;

    ThreeDTransformData.indexInArrayBuffer += 1;

    return index;
})

export var addToDirtyList = requireCheckFunc((indexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("firstDirtyIndex should <= count", () => {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
    // it("target index should not be used", () => {
    //     var targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    //
    //     expect(isIndexUsed(targetDirtyIndex, ThreeDTransformData)).false;
    // });
},(indexInArrayBuffer: number, ThreeDTransformData: any) => {
    let targetDirtyIndex = minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);

    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

    if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }

    return targetDirtyIndex;
})

var _getNotUsedIndexFromArr = (ThreeDTransformData:any) => {
    var notUsedIndexArray = ThreeDTransformData.notUsedIndexArray,
        i = null;

    do{
        i = _getNotUsedIndex(notUsedIndexArray);
    }
    while(_isValidArrayValue(i) && isIndexUsed(i, ThreeDTransformData))

    return i;
}

var _getNotUsedIndex = (notUsedIndexArray: Array<number>) => {
    /*!
     optimize: return the first one to ensure that the result index be as much remote from firDirtyIndex as possible(so that it can reduce swap when add to dirty list)
     */
    return notUsedIndexArray.shift();
};

export var addNotUsedIndex = (index: number, notUsedIndexArray: Array<number>) => {
    notUsedIndexArray.push(index);
};

export var isNotDirty = (indexInArrayBuffer: number, firstDirtyIndex: number) => {
    return indexInArrayBuffer < firstDirtyIndex;
}

export var addItAndItsChildrenToDirtyList = (rootIndexInArrayBuffer: number, uid:number, ThreeDTransformData: any) => {
    var indexInArraybuffer: number = rootIndexInArrayBuffer;

    if (isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }

    forEach(getChildren(uid, ThreeDTransformData), (child: ThreeDTransform) => {
        addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
    });

    return ThreeDTransformData;
}

var _checkGeneratedNotUsedIndex = (ThreeDTransformData: any, indexInArrayBuffer: number) => {
    // it("notUsedIndexArray shouldn't contain the index", () => {
    //     expect(ThreeDTransformData.notUsedIndexArray.indexOf(indexInArrayBuffer)).equal(-1);
    // });
    it("indexInArrayBuffer should < firstDirtyIndex", () => {
        expect(indexInArrayBuffer).exist;
        expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
    it("index should not be used", () => {
        expect(isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
    });
}
