"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../utils/objectUtils");
var dirtySystem_1 = require("./dirtySystem");
var hierarchySystem_1 = require("./hierarchySystem");
var ThreeDTransformSystem_1 = require("./ThreeDTransformSystem");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
exports.swap = contract_1.requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    contract_1.it("source index and target index should be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(index1, ThreeDTransformData)).true;
        wonder_expect_js_1.expect(utils_1.isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    exports.swapTypeArrData(index1, index2, ThreeDTransformData);
    exports.swapTransformMapData(index1, index2, ThreeDTransformData);
    return ThreeDTransformData;
});
exports.swapTransformMapData = contract_1.requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    contract_1.it("source index and target index should be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(index1, ThreeDTransformData)).true;
        wonder_expect_js_1.expect(utils_1.isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    return _changeMapData(index1, index2, _swapTransformMap, ThreeDTransformData);
});
exports.swapTypeArrData = function (index1, index2, ThreeDTransformData) {
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
    var mat4SourceIndex = exports.getMatrix4DataIndexInArrayBuffer(sourceIndex), mat4TargetIndex = exports.getMatrix4DataIndexInArrayBuffer(targetIndex), mat4Size = typeArrayUtils_1.getMatrix4DataSize(), vec3SourceIndex = exports.getVector3DataIndexInArrayBuffer(sourceIndex), vec3TargetIndex = exports.getVector3DataIndexInArrayBuffer(targetIndex), vec3Size = typeArrayUtils_1.getVector3DataSize(), quaSourceIndex = exports.getQuaternionDataIndexInArrayBuffer(sourceIndex), quaTargetIndex = exports.getQuaternionDataIndexInArrayBuffer(targetIndex), quaSize = typeArrayUtils_1.getQuaternionDataSize();
    changeFunc(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    changeFunc(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    changeFunc(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    _changeLocalScaleData(vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc);
    return ThreeDTransformData;
};
var _changeLocalScaleData = contract_1.requireCheckFunc(function (vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc) {
    contract_1.it("source localScale data shouldn't be [0,0,0]", function () {
        if (ThreeDTransformData.localScales[vec3SourceIndex] === 0
            && ThreeDTransformData.localScales[vec3SourceIndex + 1] === 0
            && ThreeDTransformData.localScales[vec3SourceIndex + 2] === 0) {
            wonder_expect_js_1.expect(false).true;
        }
    });
}, function (vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc) {
    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
});
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
    }
};
var _moveToTransformMap = function (transformMap, sourceIndex, targetIndex) {
    var sourceTransform = transformMap[sourceIndex];
    sourceTransform.index = targetIndex;
    transformMap[targetIndex] = sourceTransform;
    objectUtils_1.deleteVal(sourceIndex, transformMap);
};
exports.moveToIndex = contract_1.ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    contract_1.it("source index should not be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, contract_1.requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    contract_1.it("source index should be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    contract_1.it("target index should not be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    exports.moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    exports.moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    dirtySystem_1.addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
    return ThreeDTransformData;
}));
exports.moveMapDataToIndex = contract_1.ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    contract_1.it("source index should not be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, contract_1.requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    contract_1.it("source index should be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    contract_1.it("target index should not be used", function () {
        wonder_expect_js_1.expect(utils_1.isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    return _changeMapData(sourceIndex, targetIndex, _moveToTransformMap, ThreeDTransformData);
}));
exports.moveTypeArrDataToIndex = function (sourceIndex, targetIndex, ThreeDTransformData) {
    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
};
exports.setTransformDataInTypeArr = function (index, mat, qua, positionVec, scaleVec, ThreeDTransformData) {
    exports.setLocalRotationData(qua, exports.getQuaternionDataIndexInArrayBuffer(index), ThreeDTransformData);
    exports.setLocalPositionData(positionVec, exports.getVector3DataIndexInArrayBuffer(index), ThreeDTransformData);
    exports.setLocalScaleData(scaleVec, exports.getVector3DataIndexInArrayBuffer(index), ThreeDTransformData);
    exports.setLocalToWorldMatricesData(mat, exports.getMatrix4DataIndexInArrayBuffer(index), ThreeDTransformData);
};
exports.setLocalToWorldMatricesData = function (mat, mat4IndexInArrayBuffer, ThreeDTransformData) {
    typeArrayUtils_1.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
};
exports.setLocalPositionData = function (position, vec3IndexInArrayBuffer, ThreeDTransformData) {
    typeArrayUtils_1.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
exports.setLocalRotationData = function (qua, quaIndexInArrayBuffer, ThreeDTransformData) {
    typeArrayUtils_1.setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);
    return ThreeDTransformData;
};
exports.setLocalScaleData = function (scale, vec3IndexInArrayBuffer, ThreeDTransformData) {
    typeArrayUtils_1.setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
exports.setPositionData = function (index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData) {
    if (hierarchySystem_1.isParentExist(parent)) {
        var index_1 = parent.index;
        typeArrayUtils_1.setVectors(ThreeDTransformData.localPositions, ThreeDTransformSystem_1.getLocalToWorldMatrix({
            uid: utils_1.getUId(index_1, ThreeDTransformData),
            index: index_1
        }, GlobalTempData.matrix4_3, ThreeDTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        typeArrayUtils_1.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
};
exports.getMatrix4DataIndexInArrayBuffer = function (index) { return index * typeArrayUtils_1.getMatrix4DataSize(); };
exports.getVector3DataIndexInArrayBuffer = function (index) { return index * typeArrayUtils_1.getVector3DataSize(); };
exports.getQuaternionDataIndexInArrayBuffer = function (index) { return index * typeArrayUtils_1.getQuaternionDataSize(); };
//# sourceMappingURL=operateDataSystem.js.map