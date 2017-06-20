import curry from "wonder-lodash/curry";
import { getChildren, getParent, isChildrenExist } from "./hierarchySystem";
import { getVector3DataIndexInArrayBuffer, moveMapDataToIndex, moveTypeArrDataToIndex, setLocalPositionData, setPositionData, swapTransformMapData, swapTypeArrData } from "./operateDataSystem";
import { isTranslate, setIsTranslate } from "./isTransformSystem";
import { addNotUsedIndex, isNotDirty, minusFirstDirtyIndex } from "./dirtySystem";
import { isIndexUsed } from "./utils";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { compose } from "../../utils/functionalUtils";
import { checkTransformShouldAlive } from "./contractUtils";
import { forEach } from "../../utils/arrayUtils";
import { isNotAlive } from "./ThreeDTransformSystem";
export var setBatchDatas = requireCheckFunc(function (batchData, GlobalTempData, ThreeTransformData) {
    for (var _i = 0, batchData_1 = batchData; _i < batchData_1.length; _i++) {
        var data = batchData_1[_i];
        checkTransformShouldAlive(data.transform, ThreeTransformData);
    }
}, function (batchData, GlobalTempData, ThreeDTransformData) {
    compose(_addBatchToDirtyListByChangeMapData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex), _addBatchToDirtyListByChangeTypeArrData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex), function (_a) {
        var noDirtyIndex = _a[0], targetDirtyIndex = _a[1];
        ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
        return noDirtyIndex;
    }, _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(batchData), _setBatchTransformData(batchData, GlobalTempData))(ThreeDTransformData);
});
var _setBatchTransformData = curry(function (batchData, GlobalTempData, ThreeDTransformData) {
    for (var _i = 0, batchData_2 = batchData; _i < batchData_2.length; _i++) {
        var data = batchData_2[_i];
        var transform = data.transform, indexInArrayBuffer = transform.index, uid = transform.uid, parent_1 = getParent(uid, ThreeDTransformData), vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer), position = data.position, localPosition = data.localPosition;
        if (localPosition) {
            setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeDTransformData);
        }
        if (position) {
            setPositionData(indexInArrayBuffer, parent_1, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
        }
    }
    return ThreeDTransformData;
});
var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry(function (batchData, ThreeDTransformData) {
    var notDirtyIndexArr = [], firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    var _getNotDirtyIndex = function (indexInArrayBuffer, uid, notDirtyIndexArr, isTranslate, ThreeDTransformData) {
        var children = getChildren(uid, ThreeDTransformData);
        if (isTranslate) {
            setIsTranslate(uid, true, ThreeDTransformData);
        }
        if (isNotDirty(indexInArrayBuffer, firstDirtyIndex)) {
            notDirtyIndexArr.push(indexInArrayBuffer);
            firstDirtyIndex = minusFirstDirtyIndex(firstDirtyIndex);
        }
        if (isChildrenExist(children)) {
            forEach(children, function (child) {
                if (isNotAlive(child, ThreeDTransformData)) {
                    return;
                }
                _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate, ThreeDTransformData);
            });
        }
    };
    for (var _i = 0, batchData_3 = batchData; _i < batchData_3.length; _i++) {
        var data = batchData_3[_i];
        var transform = data.transform, indexInArrayBuffer = transform.index;
        _getNotDirtyIndex(indexInArrayBuffer, transform.uid, notDirtyIndexArr, isTranslate(data), ThreeDTransformData);
    }
    return [notDirtyIndexArr, firstDirtyIndex];
});
var _addBatchToDirtyList = function (ThreeDTransformData, targetDirtyIndex, swapFunc, moveToIndexFunc, notDirtyIndexArr) {
    for (var _i = 0, notDirtyIndexArr_1 = notDirtyIndexArr; _i < notDirtyIndexArr_1.length; _i++) {
        var indexInArrayBuffer = notDirtyIndexArr_1[_i];
        targetDirtyIndex = minusFirstDirtyIndex(targetDirtyIndex);
        if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
    }
    return targetDirtyIndex;
};
var _addBatchToDirtyListByChangeTypeArrData = curry(function (ThreeDTransformData, targetDirtyIndex, notDirtyIndexArr) {
    _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, swapTypeArrData, moveTypeArrDataToIndex, notDirtyIndexArr);
    return notDirtyIndexArr;
});
var _addBatchToDirtyListByChangeMapData = curry(function (ThreeDTransformData, targetDirtyIndex, notDirtyIndexArr) {
    return _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, swapTransformMapData, function (sourceIndex, targetIndex, ThreeDTransformData) {
        moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
        addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
    }, notDirtyIndexArr);
});
//# sourceMappingURL=batchSystem.js.map