import { getUID, isIndexUsed } from "./utils";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { deleteVal } from "../../utils/objectUtils";
import { addNotUsedIndex } from "./dirtySystem";
import { DataUtils } from "../../utils/DataUtils";
import { isParentExist } from "./hierarchySystem";
import { getLocalToWorldMatrix } from "./ThreeDTransformSystem";
export var swap = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it("source index and target index should be used", function () {
        expect(isIndexUsed(index1, ThreeDTransformData)).true;
        expect(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    swapTypeArrData(index1, index2, ThreeDTransformData);
    swapTransformMapData(index1, index2, ThreeDTransformData);
    return ThreeDTransformData;
});
export var swapTransformMapData = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it("source index and target index should be used", function () {
        expect(isIndexUsed(index1, ThreeDTransformData)).true;
        expect(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    return _changeMapData(index1, index2, _swapTransformMap, ThreeDTransformData);
});
export var swapTypeArrData = function (index1, index2, ThreeDTransformData) {
    return _changeTypeArrData(index1, index2, _swapTypeArr, ThreeDTransformData);
};
var _swapTypeArr = function (dataArr, index1, index2, length) {
    for (var i = 0; i < length; i++) {
        var newIndex1 = index1 + i, newIndex2 = index2 + i, temp = dataArr[newIndex2];
        dataArr[newIndex2] = dataArr[newIndex1];
        dataArr[newIndex1] = temp;
    }
};
var _swapTransformMap = function (transformMap, sourceIndex, targetIndex) {
    var sourceTransform = transformMap[sourceIndex], targetTransform = transformMap[targetIndex];
    sourceTransform.index = targetIndex;
    targetTransform.index = sourceIndex;
    transformMap[targetIndex] = sourceTransform;
    transformMap[sourceIndex] = targetTransform;
};
var _changeTypeArrData = function (sourceIndex, targetIndex, changeFunc, ThreeDTransformData) {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }
    var mat4SourceIndex = getMatrix4DataIndexInArrayBuffer(sourceIndex), mat4TargetIndex = getMatrix4DataIndexInArrayBuffer(targetIndex), mat4Size = getMatrix4DataSize(), vec3SourceIndex = getVector3DataIndexInArrayBuffer(sourceIndex), vec3TargetIndex = getVector3DataIndexInArrayBuffer(targetIndex), vec3Size = getVector3DataSize(), quaSourceIndex = getQuaternionDataIndexInArrayBuffer(sourceIndex), quaTargetIndex = getQuaternionDataIndexInArrayBuffer(targetIndex), quaSize = getQuaternionDataSize();
    changeFunc(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    changeFunc(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    changeFunc(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
    return ThreeDTransformData;
};
var _changeMapData = function (sourceIndex, targetIndex, changeFunc, ThreeDTransformData) {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }
    changeFunc(ThreeDTransformData.transformMap, sourceIndex, targetIndex);
    return ThreeDTransformData;
};
var _moveToTypeArr = function (dataArr, sourceIndex, targetIndex, length) {
    for (var i = 0; i < length; i++) {
        var newIndex1 = sourceIndex + i, newIndex2 = targetIndex + i;
        dataArr[newIndex2] = dataArr[newIndex1];
        dataArr[newIndex1] = 0;
    }
};
var _moveToTransformMap = function (transformMap, sourceIndex, targetIndex) {
    var sourceTransform = transformMap[sourceIndex];
    sourceTransform.index = targetIndex;
    transformMap[targetIndex] = sourceTransform;
    deleteVal(sourceIndex, transformMap);
};
export var moveToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should not be used", function () {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should be used", function () {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", function () {
        expect(isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
    return ThreeDTransformData;
}));
export var moveMapDataToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should not be used", function () {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should be used", function () {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", function () {
        expect(isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    return _changeMapData(sourceIndex, targetIndex, _moveToTransformMap, ThreeDTransformData);
}));
export var moveTypeArrDataToIndex = function (sourceIndex, targetIndex, ThreeDTransformData) {
    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
};
export var setTransformDataInTypeArr = function (indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData) {
    setLocalRotationData(qua, getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalPositionData(positionVec, getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalScaleData(scaleVec, getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalToWorldMatricesData(mat, getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
};
export var setLocalToWorldMatricesData = function (mat, mat4IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
};
export var setLocalPositionData = function (position, vec3IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
export var setLocalRotationData = function (qua, quaIndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);
    return ThreeDTransformData;
};
export var setLocalScaleData = function (scale, vec3IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
export var setPositionData = function (indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData) {
    if (isParentExist(parent)) {
        var indexInArrayBuffer_1 = parent.index;
        DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix({
            uid: getUID(indexInArrayBuffer_1, ThreeDTransformData),
            index: indexInArrayBuffer_1
        }, GlobalTempData.matrix4_3, ThreeDTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
};
export var getMatrix4DataSize = function () { return 16; };
export var getVector3DataSize = function () { return 3; };
export var getQuaternionDataSize = function () { return 4; };
export var getMatrix4DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * getMatrix4DataSize(); };
export var getVector3DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * getVector3DataSize(); };
export var getQuaternionDataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * getQuaternionDataSize(); };
//# sourceMappingURL=operateDataSystem.js.map