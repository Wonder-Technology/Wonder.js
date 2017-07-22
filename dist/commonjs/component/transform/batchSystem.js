"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var curry_1 = require("wonder-lodash/curry");
var hierarchySystem_1 = require("./hierarchySystem");
var operateDataSystem_1 = require("./operateDataSystem");
var isTransformSystem_1 = require("./isTransformSystem");
var dirtySystem_1 = require("./dirtySystem");
var utils_1 = require("./utils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var functionalUtils_1 = require("../../utils/functionalUtils");
var contractUtils_1 = require("./contractUtils");
var arrayUtils_1 = require("../../utils/arrayUtils");
var ThreeDTransformSystem_1 = require("./ThreeDTransformSystem");
exports.setBatchDatas = contract_1.requireCheckFunc(function (batchData, GlobalTempData, ThreeTransformData) {
    for (var _i = 0, batchData_1 = batchData; _i < batchData_1.length; _i++) {
        var data = batchData_1[_i];
        contractUtils_1.checkTransformShouldAlive(data.transform, ThreeTransformData);
    }
}, function (batchData, GlobalTempData, ThreeDTransformData) {
    functionalUtils_1.compose(_addBatchToDirtyListByChangeMapData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex), _addBatchToDirtyListByChangeTypeArrData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex), function (_a) {
        var noDirtyIndex = _a[0], targetDirtyIndex = _a[1];
        ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
        return noDirtyIndex;
    }, _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(batchData), _setBatchTransformData(batchData, GlobalTempData))(ThreeDTransformData);
});
var _setBatchTransformData = curry_1.default(function (batchData, GlobalTempData, ThreeDTransformData) {
    for (var _i = 0, batchData_2 = batchData; _i < batchData_2.length; _i++) {
        var data = batchData_2[_i];
        var transform = data.transform, index = transform.index, uid = transform.uid, parent_1 = hierarchySystem_1.getParent(uid, ThreeDTransformData), vec3IndexInArrayBuffer = operateDataSystem_1.getVector3DataIndexInArrayBuffer(index), position = data.position, localPosition = data.localPosition;
        if (localPosition) {
            operateDataSystem_1.setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeDTransformData);
        }
        if (position) {
            operateDataSystem_1.setPositionData(index, parent_1, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
        }
    }
    return ThreeDTransformData;
});
var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry_1.default(function (batchData, ThreeDTransformData) {
    var notDirtyIndexArr = [], firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    var _getNotDirtyIndex = function (index, uid, notDirtyIndexArr, isTranslate, ThreeDTransformData) {
        var children = hierarchySystem_1.getChildren(uid, ThreeDTransformData);
        if (isTranslate) {
            isTransformSystem_1.setIsTranslate(uid, true, ThreeDTransformData);
        }
        if (dirtySystem_1.isNotDirty(index, firstDirtyIndex)) {
            notDirtyIndexArr.push(index);
            firstDirtyIndex = dirtySystem_1.minusFirstDirtyIndex(firstDirtyIndex);
        }
        if (hierarchySystem_1.isChildrenExist(children)) {
            arrayUtils_1.forEach(children, function (child) {
                if (ThreeDTransformSystem_1.isNotAlive(child, ThreeDTransformData)) {
                    return;
                }
                _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate, ThreeDTransformData);
            });
        }
    };
    for (var _i = 0, batchData_3 = batchData; _i < batchData_3.length; _i++) {
        var data = batchData_3[_i];
        var transform = data.transform, index = transform.index;
        _getNotDirtyIndex(index, transform.uid, notDirtyIndexArr, isTransformSystem_1.isTranslate(data), ThreeDTransformData);
    }
    return [notDirtyIndexArr, firstDirtyIndex];
});
var _addBatchToDirtyList = function (ThreeDTransformData, targetDirtyIndex, swapFunc, moveToIndexFunc, notDirtyIndexArr) {
    for (var _i = 0, notDirtyIndexArr_1 = notDirtyIndexArr; _i < notDirtyIndexArr_1.length; _i++) {
        var index = notDirtyIndexArr_1[_i];
        targetDirtyIndex = dirtySystem_1.minusFirstDirtyIndex(targetDirtyIndex);
        if (utils_1.isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(index, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(index, targetDirtyIndex, ThreeDTransformData);
        }
    }
    return targetDirtyIndex;
};
var _addBatchToDirtyListByChangeTypeArrData = curry_1.default(function (ThreeDTransformData, targetDirtyIndex, notDirtyIndexArr) {
    _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, operateDataSystem_1.swapTypeArrData, operateDataSystem_1.moveTypeArrDataToIndex, notDirtyIndexArr);
    return notDirtyIndexArr;
});
var _addBatchToDirtyListByChangeMapData = curry_1.default(function (ThreeDTransformData, targetDirtyIndex, notDirtyIndexArr) {
    return _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, operateDataSystem_1.swapTransformMapData, function (sourceIndex, targetIndex, ThreeDTransformData) {
        operateDataSystem_1.moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
        dirtySystem_1.addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
    }, notDirtyIndexArr);
});
//# sourceMappingURL=batchSystem.js.map