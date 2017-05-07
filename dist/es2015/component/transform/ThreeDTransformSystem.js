import { ThreeDTransformData, ThreeDTransformRelationData } from "./ThreeDTransformData";
import { compose } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import forEach from "wonder-lodash/forEach";
import filter from "wonder-lodash/filter";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { DataUtils } from "../../utils/DataUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { cacheFunc } from "../../utils/cacheUtils";
export var init = function (GlobalTempData, ThreeDTransformData, state) {
    return update(null, GlobalTempData, ThreeDTransformData, state);
};
var _getTransformIndexInArrayBufferTable = function (transform, ThreeDTransformData) {
    return ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid];
};
var _getTransformIndexInArrayBufferTableByUid = function (uid, ThreeDTransformData) {
    return ThreeDTransformData.transformIndexInArrayBufferTable[uid];
};
var _setTransformIndexInArrayBufferTable = function (transform, indexInArrayBuffer, ThreeDTransformData) {
    ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid] = indexInArrayBuffer;
    return ThreeDTransformData;
};
var _setTransforms = curry(function (transform, indexInArrayBuffer, ThreeDTransformData) {
    ThreeDTransformData.transforms[indexInArrayBuffer] = transform;
    return ThreeDTransformData;
});
export var createIndexInArrayBuffer = function (transform, ThreeDTransformData) {
    var indexInArrayBuffer = _generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
    _setTransformIndexInArrayBufferTable(transform, indexInArrayBuffer, ThreeDTransformData);
    _setTransforms(transform, indexInArrayBuffer, ThreeDTransformData);
};
export var addComponent = function (transform, ThreeDTransformData) {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);
    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData);
};
export var disposeComponent = function (transform, GlobalTempData, ThreeDTransformData) {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);
    if (_isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
        return _disposeFromNormalList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData);
    }
    return _disposeFromDirtyList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData);
};
export var getParent = function (transform, ThreeDTransformData) {
    var relationData = ThreeDTransformData.relations[_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData)];
    if (_isRelationItemExist(relationData)) {
        return relationData.parent;
    }
    return null;
};
var _getRelationData = function (relationData, dataName) {
    if (!_isRelationItemExist(relationData)) {
        return null;
    }
    var data = relationData[dataName];
    return _isRelationDataExist(data) ? data : null;
};
var _getOrSetRelationItem = function (indexInArrayBuffer, relations) {
    var data = relations[indexInArrayBuffer];
    if (!_isRelationItemExist(data)) {
        data = _createEmptyRelationItem(indexInArrayBuffer);
        relations[indexInArrayBuffer] = data;
        return data;
    }
    return data;
};
var _isTransformEqual = function (tra1, tra2) { return tra1.uid === tra2.uid; };
export var setParent = requireCheckFunc(function (transform, parent, ThreeDTransformData) {
    it("parent should not be self", function () {
        expect(_isTransformEqual(transform, parent)).false;
    });
}, function (transform, parent, ThreeDTransformData) {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData), parentIndexInArrayBuffer = null, relationData = _getOrSetRelationItem(indexInArrayBuffer, ThreeDTransformData.relations), currentParent = relationData.parent, isCurrentParentExisit = _isRelationDataExist(currentParent);
    if (parent === null) {
        if (isCurrentParentExisit) {
            _removeRelationItemFromParent(currentParent, relationData);
            _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData);
        }
        return;
    }
    parentIndexInArrayBuffer = _getTransformIndexInArrayBufferTable(parent, ThreeDTransformData);
    if (isCurrentParentExisit) {
        if (_isNotChangeParent(currentParent.indexInArrayBuffer, parentIndexInArrayBuffer)) {
            return;
        }
        _removeRelationItemFromParent(currentParent, relationData);
    }
    _addToParent(relationData, parentIndexInArrayBuffer, ThreeDTransformData);
    _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData);
});
var _createEmptyRelationItem = function (indexInArrayBuffer) {
    var data = ThreeDTransformRelationData.create();
    data.indexInArrayBuffer = indexInArrayBuffer;
    return data;
};
var _getIsTranslate = function (indexInArrayBuffer, ThreeDTransform) {
    return ThreeDTransformData.isTranslateTable[indexInArrayBuffer];
};
var _setIsTranslate = requireCheckFunc(function (indexInArrayBuffer, isTranslate, ThreeDTransform) {
    it("indexInArrayBuffer should be used", function () {
        expect(_isIndexUsed(indexInArrayBuffer)).true;
    });
}, function (indexInArrayBuffer, isTranslate, ThreeDTransform) {
    ThreeDTransformData.isTranslateTable[indexInArrayBuffer] = isTranslate;
});
export var getLocalToWorldMatrix = cacheFunc(function (transform, ThreeTransformData, mat) {
    return transform.localToWorldMatrixCache !== null;
}, function (transform, ThreeTransformData, mat) {
    return transform.localToWorldMatrixCache;
}, function (transform, ThreeTransformData, mat, returnedMat) {
    transform.localToWorldMatrixCache = returnedMat;
}, function (transform, ThreeTransformData, mat) {
    return DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
});
export var getPosition = cacheFunc(function (transform, ThreeTransformData) {
    return transform.positionCache !== null;
}, function (transform, ThreeTransformData) {
    return transform.positionCache;
}, function (transform, ThreeTransformData, position) {
    transform.positionCache = position;
}, function (transform, ThreeTransformData) {
    var index = _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)), localToWorldMatrices = ThreeTransformData.localToWorldMatrices;
    return transform.tempPosition.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
});
var _setPositionData = function (indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData) {
    if (_isRelationDataExist(parent)) {
        DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix(ThreeDTransformData.transforms[parent.indexInArrayBuffer], ThreeTransformData, GlobalTempData.matrix4_3).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
};
export var setPosition = function (transform, position, GlobalTempData, ThreeTransformData) {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData), parent = _getRelationData(ThreeDTransformData.relations[indexInArrayBuffer], "parent"), vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    _setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);
    _setIsTranslate(indexInArrayBuffer, true, ThreeTransformData);
    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData);
};
var _setBatchTransformData = curry(function (batchData, GlobalTempData, ThreeTransformData) {
    for (var _i = 0, batchData_1 = batchData; _i < batchData_1.length; _i++) {
        var data = batchData_1[_i];
        var indexInArrayBuffer = ThreeDTransformData.transformIndexInArrayBufferTable[data.uid], parent_1 = _getRelationData(ThreeDTransformData.relations[indexInArrayBuffer], "parent"), vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer), position = data.position, localPosition = data.localPosition;
        if (localPosition) {
            _setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeTransformData);
        }
        if (position) {
            _setPositionData(indexInArrayBuffer, parent_1, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);
        }
    }
    return ThreeTransformData;
});
var _isTranslate = function (data) {
    return !!data.position || !!data.localPosition;
};
var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry(function (batchData, ThreeTransformData) {
    var notDirtyIndexArr = [], firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    var _getNotDirtyIndex = function (indexInArrayBuffer, notDirtyIndexArr, isTranslate, ThreeDTransformData) {
        var relationData = _getOrSetRelationItem(indexInArrayBuffer, ThreeDTransformData.relations);
        if (isTranslate) {
            _setIsTranslate(indexInArrayBuffer, true, ThreeDTransformData);
        }
        if (_isNotDirty(indexInArrayBuffer, firstDirtyIndex)) {
            notDirtyIndexArr.push(indexInArrayBuffer);
            firstDirtyIndex = _minusFirstDirtyIndex(firstDirtyIndex);
        }
        forEach(relationData.children, function (child) {
            _getNotDirtyIndex(child.indexInArrayBuffer, notDirtyIndexArr, isTranslate, ThreeDTransformData);
        });
    };
    for (var _i = 0, batchData_2 = batchData; _i < batchData_2.length; _i++) {
        var data = batchData_2[_i];
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTableByUid(data.uid, ThreeDTransformData);
        _getNotDirtyIndex(indexInArrayBuffer, notDirtyIndexArr, _isTranslate(data), ThreeDTransformData);
    }
    return [notDirtyIndexArr, firstDirtyIndex];
});
var _addBatchToDirtyList = function (ThreeTransformData, targetDirtyIndex, swapFunc, moveToIndexFunc, notDirtyIndexArr) {
    for (var _i = 0, notDirtyIndexArr_1 = notDirtyIndexArr; _i < notDirtyIndexArr_1.length; _i++) {
        var indexInArrayBuffer = notDirtyIndexArr_1[_i];
        targetDirtyIndex = _minusFirstDirtyIndex(targetDirtyIndex);
        if (_isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
    }
    return targetDirtyIndex;
};
var _addBatchToDirtyListByChangeTypeArrData = curry(function (ThreeTransformData, targetDirtyIndex, notDirtyIndexArr) {
    _addBatchToDirtyList(ThreeTransformData, targetDirtyIndex, _swapTypeArrData, _moveTypeArrDataToIndex, notDirtyIndexArr);
    return notDirtyIndexArr;
});
var _addBatchToDirtyListByChangeReferenceData = curry(function (ThreeTransformData, targetDirtyIndex, notDirtyIndexArr) {
    return _addBatchToDirtyList(ThreeTransformData, targetDirtyIndex, _swapArrayData, function (sourceIndex, targetIndex, ThreeDTransformData) {
        _moveArrayDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
        _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray);
    }, notDirtyIndexArr);
});
export var setBatchDatas = function (batchData, GlobalTempData, ThreeTransformData) {
    compose(_addBatchToDirtyListByChangeReferenceData(ThreeTransformData, ThreeDTransformData.firstDirtyIndex), _addBatchToDirtyListByChangeTypeArrData(ThreeTransformData, ThreeDTransformData.firstDirtyIndex), function (_a) {
        var noDirtyIndex = _a[0], targetDirtyIndex = _a[1];
        ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
        return noDirtyIndex;
    }, _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(batchData), _setBatchTransformData(batchData, GlobalTempData))(ThreeTransformData);
};
export var getLocalPosition = cacheFunc(function (transform, ThreeTransformData) {
    return transform.localPositionCache !== null;
}, function (transform, ThreeTransformData) {
    return transform.localPositionCache;
}, function (transform, ThreeTransformData, position) {
    transform.localPositionCache = position;
}, function (transform, ThreeTransformData) {
    return DataUtils.createVector3ByIndex(transform.tempLocalPosition, ThreeDTransformData.localPositions, _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
});
export var setLocalPosition = function (transform, position, ThreeTransformData) {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData), vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
    _setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);
    _setIsTranslate(indexInArrayBuffer, true, ThreeTransformData);
    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData);
};
export var update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return compose(_cleanDirtyList(ThreeDTransformData), _updateDirtyList(GlobalTempData, ThreeDTransformData), _clearCache(ThreeDTransformData))(state);
};
var _clearCache = curry(function (ThreeDTransformData, state) {
    var count = ThreeDTransformData.count, transforms = ThreeDTransformData.transforms;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var transform = transforms[i], isTranslate = _getIsTranslate(i, ThreeDTransformData);
        if (isTranslate) {
            transform.localToWorldMatrixCache = null;
            transform.positionCache = null;
            transform.localPositionCache = null;
            _setIsTranslate(i, false, ThreeDTransformData);
        }
    }
});
var _isNotChangeParent = function (currentParentIndexInArrayBuffer, newParentIndexInArrayBuffer) {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
};
var _isIndexUsed = ensureFunc(function (isExist, indexInArrayBuffer, ThreeDTransformData) {
    it("if(or not) exist data, the transform and its indexInArrayBuffer should be(or not) setted to data container;relation item should(or not) exist", function () {
        if (isExist) {
            expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).true;
            expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[indexInArrayBuffer], ThreeDTransformData)).equal(indexInArrayBuffer);
            expect(_isRelationItemExist(ThreeDTransformData.relations[indexInArrayBuffer])).true;
        }
        else {
            expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).false;
            expect(_isRelationItemExist(ThreeDTransformData.relations[indexInArrayBuffer])).false;
        }
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
});
var _isRelationDataExist = function (relationData) { return relationData !== null; };
var _isRelationItemExist = function (relationData) { return _isValidArrayValue(relationData); };
var _removeRelationParent = function (relations) {
    relations.parent = null;
};
var _addToDirtyList = requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    it("firstDirtyIndex should <= count", function () {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    var targetDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
    if (_isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        _swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        _moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    return targetDirtyIndex;
});
var _getNotUsedIndexFromArr = function (ThreeDTransformData) {
    var notUsedIndexArray = ThreeDTransformData.notUsedIndexArray, i = null;
    do {
        i = _getNotUsedIndex(notUsedIndexArray);
    } while (_isValidArrayValue(i) && _isIndexUsed(i, ThreeDTransformData));
    return i;
};
var _getNotUsedIndex = function (notUsedIndexArray) {
    return notUsedIndexArray.shift();
};
var _addNotUsedIndex = function (index, notUsedIndexArray) {
    notUsedIndexArray.push(index);
};
var _isNotDirty = function (indexInArrayBuffer, firstDirtyIndex) {
    return indexInArrayBuffer < firstDirtyIndex;
};
var _updateDirtyList = curry(function (GlobalTempData, ThreeDTransformData, state) {
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);
    var count = ThreeDTransformData.count;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }
    return state;
});
var _sortParentBeforeChildInDirtyList = function (ThreeDTransformData) {
    var relations = ThreeDTransformData.relations, count = ThreeDTransformData.count;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var parent_2 = relations[i].parent;
        if (_isRelationDataExist(parent_2)) {
            var parentIndex = parent_2.indexInArrayBuffer;
            if (parentIndex > i) {
                _swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
};
var _moveRelationItemTo = ensureFunc(function (resultVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it("source relation item should be removed", function () {
        expect(_isValidArrayValue(ThreeDTransformData.relations[sourceIndex])).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it("source relation should exist", function () {
        expect(_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])).true;
    });
    it("target relation should not exist", function () {
        expect(_isRelationItemExist(ThreeDTransformData.relations[targetIndex])).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    var dataArr = ThreeDTransformData.relations;
    dataArr[targetIndex] = dataArr[sourceIndex];
    dataArr[targetIndex].indexInArrayBuffer = targetIndex;
    _resetValInArr(dataArr, sourceIndex);
    return ThreeDTransformData;
}));
var _swapIndexInRelationItemArr = requireCheckFunc(function (index1, index2, relationDataArr) {
    it("the two ones should not point to each other", function () {
        expect(relationDataArr[index1].indexInArrayBuffer === index2 && relationDataArr[index2].indexInArrayBuffer === index1).false;
    });
}, function (index1, index2, relationDataArr) {
    _swapRelationItemIndex(relationDataArr, index1, index2);
    DataUtils.swap(relationDataArr, index1, index2, 1);
});
var _swapRelationItemIndex = function (relationDataArr, index1, index2) {
    var temp = relationDataArr[index1].indexInArrayBuffer;
    relationDataArr[index1].indexInArrayBuffer = relationDataArr[index2].indexInArrayBuffer;
    relationDataArr[index2].indexInArrayBuffer = temp;
};
var _swap = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it("source index and target index should be used", function () {
        expect(_isIndexUsed(index1, ThreeDTransformData)).true;
        expect(_isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    _swapTypeArrData(index1, index2, ThreeDTransformData);
    _swapArrayData(index1, index2, ThreeDTransformData);
    return ThreeDTransformData;
});
var _swapArrayData = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it("source index and target index should be used", function () {
        expect(_isIndexUsed(index1, ThreeDTransformData)).true;
        expect(_isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    if (index1 === index2) {
        return ThreeDTransformData;
    }
    _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index1], index2, ThreeDTransformData);
    _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index2], index1, ThreeDTransformData);
    _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.relations);
    DataUtils.swap(ThreeDTransformData.isTranslateTable, index1, index2, 1);
    DataUtils.swap(ThreeDTransformData.transforms, index1, index2, 1);
    return ThreeDTransformData;
});
var _swapTypeArrData = requireCheckFunc(function (index1, index2, ThreeDTransformData) {
    it("source index and target index should be used", function () {
        expect(_isIndexUsed(index1, ThreeDTransformData)).true;
        expect(_isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, function (index1, index2, ThreeDTransformData) {
    if (index1 === index2) {
        return ThreeDTransformData;
    }
    var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(index1), mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(index2), mat4Size = _getMatrix4DataSize(), vec3SourceIndex = _getVector3DataIndexInArrayBuffer(index1), vec3TargetIndex = _getVector3DataIndexInArrayBuffer(index2), vec3Size = _getVector3DataSize(), quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(index1), quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(index2), quaSize = _getQuaternionDataSize();
    DataUtils.swap(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    DataUtils.swap(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    DataUtils.swap(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    DataUtils.swap(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
    return ThreeDTransformData;
});
var _resetValInArr = function (dataArr, index) {
    dataArr[index] = void 0;
};
var _moveToTypeArr = function (dataArr, sourceIndex, targetIndex, length) {
    for (var i = 0; i < length; i++) {
        var newIndex1 = sourceIndex + i, newIndex2 = targetIndex + i;
        dataArr[newIndex2] = dataArr[newIndex1];
        dataArr[newIndex1] = 0;
    }
    return ThreeDTransformData;
};
var _moveToArr = function (dataArr, sourceIndex, targetIndex, length) {
    for (var i = 0; i < length; i++) {
        var newIndex1 = sourceIndex + i, newIndex2 = targetIndex + i;
        dataArr[newIndex2] = dataArr[newIndex1];
        dataArr[newIndex1] = void 0;
    }
    return ThreeDTransformData;
};
var _moveToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should not be used", function () {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should be used", function () {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", function () {
        expect(_isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    _moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    _moveArrayDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray);
    return ThreeDTransformData;
}));
var _moveArrayDataToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should not be used", function () {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should be used", function () {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", function () {
        expect(_isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }
    _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex, ThreeDTransformData);
    _moveToArr(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1);
    _moveToArr(ThreeDTransformData.isTranslateTable, sourceIndex, targetIndex, 1);
    if (_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])) {
        _moveRelationItemTo(sourceIndex, targetIndex, ThreeDTransformData);
    }
    return ThreeDTransformData;
}));
var _moveTypeArrDataToIndex = ensureFunc(function (returnVal, sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should not be used", function () {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc(function (sourceIndex, targetIndex, ThreeDTransformData) {
    it("source index should be used", function () {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", function () {
        expect(_isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, function (sourceIndex, targetIndex, ThreeDTransformData) {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }
    var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(sourceIndex), mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(targetIndex), mat4Size = _getMatrix4DataSize(), vec3SourceIndex = _getVector3DataIndexInArrayBuffer(sourceIndex), vec3TargetIndex = _getVector3DataIndexInArrayBuffer(targetIndex), vec3Size = _getVector3DataSize(), quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(sourceIndex), quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(targetIndex), quaSize = _getQuaternionDataSize();
    _moveToTypeArr(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    _moveToTypeArr(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    _moveToTypeArr(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    _moveToTypeArr(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
    return ThreeDTransformData;
}));
var _transform = function (index, GlobalTempData, ThreeDTransformData) {
    var vec3Index = _getVector3DataIndexInArrayBuffer(index), quaIndex = _getQuaternionDataIndexInArrayBuffer(index), mat4Index = _getMatrix4DataIndexInArrayBuffer(index), mat = GlobalTempData.matrix4_2.setTRS(DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index), DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex), DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)), parent = ThreeDTransformData.relations[index].parent;
    if (_isRelationDataExist(parent)) {
        var parentIndex = parent.indexInArrayBuffer;
        return _setLocalToWorldMatricesData(DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(parentIndex))
            .multiply(mat), mat4Index, ThreeDTransformData);
    }
    return _setLocalToWorldMatricesData(mat, mat4Index, ThreeDTransformData);
};
var _cleanDirtyList = curry(function (ThreeDTransformData, state) {
    var count = ThreeDTransformData.count;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        if (_needMoveOffDirtyList(i)) {
            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
        }
    }
    return state;
});
var _needMoveOffDirtyList = function (index) {
    return true;
};
var _moveFromDirtyListToNormalList = function (index, ThreeDTransformData) {
    ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
    _moveToIndex(index, _generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
};
var _checkGeneratedNotUsedIndex = function (ThreeDTransformData, indexInArrayBuffer) {
    it("indexInArrayBuffer should < firstDirtyIndex", function () {
        expect(indexInArrayBuffer).exist;
        expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
    it("index should not be used", function () {
        expect(_isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
    });
};
var _generateNotUsedIndexInArrayBuffer = ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, function (ThreeDTransformData) {
    var result = ThreeDTransformData.indexInArrayBuffer;
    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }
    ThreeDTransformData.indexInArrayBuffer += 1;
    return result;
});
var _generateNotUsedIndexInNormalList = ensureFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, function (ThreeDTransformData) {
    var index = _getNotUsedIndexFromArr(ThreeDTransformData);
    if (_isValidArrayValue(index)) {
        return index;
    }
    index = ThreeDTransformData.indexInArrayBuffer;
    ThreeDTransformData.indexInArrayBuffer += 1;
    return index;
});
var _addItAndItsChildrenToDirtyList = function (rootIndexInArrayBuffer, ThreeDTransformData) {
    var indexInArraybuffer = rootIndexInArrayBuffer, relationData = _getOrSetRelationItem(indexInArraybuffer, ThreeDTransformData.relations);
    if (_isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        _addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }
    forEach(relationData.children, function (child) {
        _addItAndItsChildrenToDirtyList(child.indexInArrayBuffer, ThreeDTransformData);
    });
    return ThreeDTransformData;
};
var _isValidArrayValue = function (val) {
    return isNotUndefined(val);
};
var _removeRelationItemFromParent = function (parent, target) {
    _removeRelationParent(target);
    if (!_isRelationDataExist(parent.children)) {
        return;
    }
    parent.children = filter(parent.children, function (item) {
        return item !== target;
    });
};
var _addToParent = requireCheckFunc(function (childRelationItem, parentIndexInArrayBuffer, ThreeDTransformData) {
    it("the child one should not has parent", function () {
        expect(_isRelationDataExist(childRelationItem.parent)).false;
    });
}, function (childRelationItem, parentIndexInArrayBuffer, ThreeDTransformData) {
    var parentRelationItem = _getOrSetRelationItem(parentIndexInArrayBuffer, ThreeDTransformData.relations), children = parentRelationItem.children;
    childRelationItem.parent = parentRelationItem;
    if (_isRelationDataExist(children)) {
        children.push(childRelationItem);
    }
    else {
        parentRelationItem.children = [childRelationItem];
    }
});
var _addFirstDirtyIndex = ensureFunc(function (firstDirtyIndex) {
    it("firstDirtyIndex should <= count", function () {
        expect(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, function (ThreeDTransformData) {
    return ThreeDTransformData.firstDirtyIndex + 1;
});
var _minusFirstDirtyIndex = ensureFunc(function (firstDirtyIndex) {
    it("firstDirtyIndex should >= start index:" + _getStartIndexInArrayBuffer(), function () {
        expect(firstDirtyIndex).gte(_getStartIndexInArrayBuffer());
    });
}, function (firstDirtyIndex) {
    return firstDirtyIndex - 1;
});
var _disposeItemInDataContainer = curry(function (indexInArrayBuffer, GlobalTempData, ThreeDTransformData) {
    var mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
    _setTransformItemInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    DataUtils.removeItemInArray(ThreeDTransformData.transforms, indexInArrayBuffer);
    _removeRelationItem(indexInArrayBuffer, ThreeDTransformData);
    return ThreeDTransformData;
});
var _removeRelationItem = function (indexInArrayBuffer, ThreeDTransformData) {
    var relations = ThreeDTransformData.relations, relationData = relations[indexInArrayBuffer];
    _resetValInArr(relations, indexInArrayBuffer);
    var parent = relationData.parent;
    if (_isRelationDataExist(parent)) {
        _removeRelationItemFromParent(parent, relationData);
    }
};
var _disposeFromNormalList = function (indexInArrayBuffer, GlobalTempData, ThreeDTransformData) {
    _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray);
    return _disposeItemInDataContainer(indexInArrayBuffer, GlobalTempData, ThreeDTransformData);
};
var _disposeFromDirtyList = function (indexInArrayBuffer, GlobalTempData, ThreeDTransformData) {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    _swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData);
    return compose(function (ThreeDTransformData) {
        ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
    }, _disposeItemInDataContainer(firstDirtyIndex, GlobalTempData))(ThreeDTransformData);
};
var _getMatrix4DataSize = function () { return 16; };
var _getVector3DataSize = function () { return 3; };
var _getQuaternionDataSize = function () { return 4; };
var _getMatrix4DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * _getMatrix4DataSize(); };
var _getVector3DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * _getVector3DataSize(); };
var _getQuaternionDataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * _getQuaternionDataSize(); };
var _setLocalToWorldMatricesData = function (mat, mat4IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
};
var _setLocalPositionData = function (position, vec3IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
var _setLocalRotationData = function (qua, quaIndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);
    return ThreeDTransformData;
};
var _setLocalScaleData = function (scale, vec3IndexInArrayBuffer, ThreeDTransformData) {
    DataUtils.setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);
    return ThreeDTransformData;
};
var _setTransformItemInTypeArr = function (indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData) {
    _setLocalRotationData(qua, _getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    _setLocalPositionData(positionVec, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    _setLocalScaleData(scaleVec, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    _setLocalToWorldMatricesData(mat, _getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
};
var _addDefaultTransformData = function (GlobalTempData, ThreeDTransformData) {
    var count = ThreeDTransformData.count, mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
    for (var i = _getStartIndexInArrayBuffer(); i < count; i++) {
        _setTransformItemInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    }
};
var _getStartIndexInArrayBuffer = function () { return 1; };
export var initData = function (GlobalTempData, ThreeDTransformData) {
    var buffer = null, count = ThreeDTransformData.count;
    ThreeDTransformData.size = Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);
    ThreeDTransformData.buffer = new ArrayBuffer(count * ThreeDTransformData.size);
    buffer = ThreeDTransformData.buffer;
    ThreeDTransformData.relations = [];
    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * _getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * _getMatrix4DataSize(), count * _getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize()), count * _getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize() + _getQuaternionDataSize()), count * _getVector3DataSize());
    ThreeDTransformData.transforms = [];
    ThreeDTransformData.transformIndexInArrayBufferTable = [];
    ThreeDTransformData.notUsedIndexArray = [];
    ThreeDTransformData.isTranslateTable = [];
    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
    ThreeDTransformData.indexInArrayBuffer = _getStartIndexInArrayBuffer();
    _addDefaultTransformData(GlobalTempData, ThreeDTransformData);
};
//# sourceMappingURL=ThreeDTransformSystem.js.map