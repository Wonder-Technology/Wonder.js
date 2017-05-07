"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ThreeDTransformData_1 = require("./ThreeDTransformData");
var functionalUtils_1 = require("../../utils/functionalUtils");
var curry_1 = require("wonder-lodash/curry");
var forEach_1 = require("wonder-lodash/forEach");
var filter_1 = require("wonder-lodash/filter");
var contract_1 = require("../../definition/typescript/decorator/contract");
var IO_1 = require("wonder-fantasy-land/dist/commonjs/types/IO");
var wonder_expect_js_1 = require("wonder-expect.js");
var DataUtils_1 = require("../../utils/DataUtils");
var JudgeUtils_1 = require("../../utils/JudgeUtils");
var Matrix4_1 = require("../../math/Matrix4");
var Vector3_1 = require("../../math/Vector3");
exports.init = function (GlobalTempData, ThreeDTransformData, state) {
    return exports.update(null, GlobalTempData, ThreeDTransformData, state);
};
var _getTransformIndexInArrayBufferTable = curry_1.default(function (transform, ThreeDTransformData) {
    return ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid];
});
var _setTransformIndexInArrayBufferTable = curry_1.default(function (transform, indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid] = indexInArrayBuffer;
        return ThreeDTransformData;
    });
});
var _setTransforms = curry_1.default(function (transform, indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        ThreeDTransformData.transforms[indexInArrayBuffer] = transform;
        return ThreeDTransformData;
    });
});
exports.createIndexInArrayBuffer = function (transform, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var indexInArrayBuffer = _generateNotUsedIndexInArrayBuffer(ThreeDTransformData).run();
        return functionalUtils_1.compose(functionalUtils_1.chain(_setTransforms(transform, indexInArrayBuffer)), _setTransformIndexInArrayBufferTable(transform, indexInArrayBuffer))(ThreeDTransformData).run();
    });
};
exports.addComponent = function (transform, ThreeDTransformData) {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);
    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData);
};
exports.disposeComponent = function (transform, GlobalTempData, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);
        if (_isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
            return _disposeFromNormalList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData).run();
        }
        return _disposeFromDirtyList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData).run();
    });
};
exports.getParent = contract_1.requireCheckFunc(function (transform, ThreeDTransformData) {
}, function (transform, ThreeDTransformData) {
    var relationData = ThreeDTransformData.relations[_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData)];
    if (_isRelationItemExist(relationData)) {
        return relationData.parent;
    }
    return null;
});
var _getRelationData = function (relationData, dataName) {
    if (!_isRelationItemExist(relationData)) {
        return null;
    }
    var data = relationData[dataName];
    return _isRelationDataExist(data) ? data : null;
};
var _getOrSetRelationItem = function (indexInArrayBuffer, relations) {
    return IO_1.IO.of(function () {
        var data = relations[indexInArrayBuffer];
        if (!_isRelationItemExist(data)) {
            data = _createEmptyRelationItem(indexInArrayBuffer);
            relations[indexInArrayBuffer] = data;
            return data;
        }
        return data;
    });
};
exports.setParent = function (transform, parent, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData), parentIndexInArrayBuffer = null, relationData = _getOrSetRelationItem(indexInArrayBuffer, ThreeDTransformData.relations).run(), currentParent = relationData.parent, isCurrentParentExisit = _isRelationDataExist(currentParent);
        if (parent === null) {
            if (isCurrentParentExisit) {
                _removeRelationItemFromParent(currentParent, relationData).run();
                _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData).run();
            }
            return;
        }
        parentIndexInArrayBuffer = _getTransformIndexInArrayBufferTable(parent, ThreeDTransformData);
        if (isCurrentParentExisit) {
            if (_isNotChangeParent(currentParent.indexInArrayBuffer, parentIndexInArrayBuffer)) {
                return;
            }
            _removeRelationItemFromParent(currentParent, relationData).run();
        }
        _addToParent(relationData, parentIndexInArrayBuffer, ThreeDTransformData).run();
        _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData).run();
    });
};
var _createEmptyRelationItem = function (indexInArrayBuffer) {
    var data = ThreeDTransformData_1.ThreeDTransformRelationData.create();
    data.indexInArrayBuffer = indexInArrayBuffer;
    return data;
};
exports.getLocalToWorldMatrix = function (transform, ThreeTransformData) {
    return DataUtils_1.DataUtils.createMatrix4ByIndex(Matrix4_1.Matrix4.create(), ThreeDTransformData_1.ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
};
exports.getPosition = function (transform, ThreeTransformData) {
    return exports.getLocalToWorldMatrix(transform, ThreeTransformData).getTranslation();
};
exports.setPosition = function (transform, position, GlobalTempData, ThreeTransformData) {
    return IO_1.IO.of(function () {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData), parent = _getRelationData(ThreeDTransformData_1.ThreeDTransformData.relations[indexInArrayBuffer], "parent"), vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData));
        if (_isRelationDataExist(parent)) {
            DataUtils_1.DataUtils.setVectors(ThreeDTransformData_1.ThreeDTransformData.localPositions, exports.getLocalToWorldMatrix(ThreeDTransformData_1.ThreeDTransformData.transforms[parent.indexInArrayBuffer], ThreeTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
        }
        else {
            DataUtils_1.DataUtils.setVectors(ThreeDTransformData_1.ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
        }
        return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData).run();
    });
};
exports.getLocalPosition = function (transform, ThreeTransformData) {
    return DataUtils_1.DataUtils.createVector3ByIndex(Vector3_1.Vector3.create(), ThreeDTransformData_1.ThreeDTransformData.localPositions, _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
};
exports.setLocalPosition = function (transform, position, ThreeTransformData) {
    return IO_1.IO.of(function () {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData), vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);
        DataUtils_1.DataUtils.setVectors(ThreeDTransformData_1.ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
        return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData).run();
    });
};
exports.update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return functionalUtils_1.compose(functionalUtils_1.chain(_cleanDirtyList(ThreeDTransformData)), _updateDirtyList(GlobalTempData, ThreeDTransformData))(state);
};
var _isNotChangeParent = function (currentParentIndexInArrayBuffer, newParentIndexInArrayBuffer) {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
};
var _addNotUsedIndex = curry_1.default(function (index, notUsedIndexArray) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function () {
        contract_1.it("shouldn't contain the same index", function () {
            wonder_expect_js_1.expect(notUsedIndexArray.indexOf(index)).equal(-1);
        });
    }, function () {
        notUsedIndexArray.push(index);
    }));
});
var _isIndexUsed = contract_1.ensureFunc(function (isExist, indexInArrayBuffer, ThreeDTransformData) {
    contract_1.it("if(or not) exist data, the transform and its indexInArrayBuffer should be(or not) setted to data container;relation item should(or not) exist", function () {
        if (isExist) {
            wonder_expect_js_1.expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).true;
            wonder_expect_js_1.expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[indexInArrayBuffer], ThreeDTransformData)).equal(indexInArrayBuffer);
            wonder_expect_js_1.expect(_isRelationItemExist(ThreeDTransformData.relations[indexInArrayBuffer])).true;
        }
        else {
            wonder_expect_js_1.expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).false;
            wonder_expect_js_1.expect(_isRelationItemExist(ThreeDTransformData.relations[indexInArrayBuffer])).false;
        }
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
});
var _isRelationDataExist = function (relationData) { return relationData !== null; };
var _isRelationItemExist = function (relationData) { return _isValidArrayValue(relationData); };
var _removeRelationParent = function (relations) {
    return IO_1.IO.of(function () {
        relations.parent = null;
    });
};
var _addToDirtyList = function (indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function () {
        contract_1.it("firstDirtyIndex should <= count", function () {
            wonder_expect_js_1.expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
        });
    }, function () {
        var targetDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
        ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
        if (_isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            _swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData).run();
        }
        else {
            _moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData).run();
            if (_isIndexCollectedToNotUsed(targetDirtyIndex, ThreeDTransformData)) {
                ThreeDTransformData.notUsedIndexArray = _removeIndexInNotUsedArr(targetDirtyIndex, ThreeDTransformData);
            }
        }
        return targetDirtyIndex;
    }));
};
var _isIndexCollectedToNotUsed = function (indexInArrayBuffer, ThreeDTransformData) {
    return ThreeDTransformData.notUsedIndexArray.indexOf(indexInArrayBuffer) > -1;
};
var _removeIndexInNotUsedArr = contract_1.requireCheckFunc(function (indexInArrayBuffer, ThreeDTransformData) {
    contract_1.it("target index should in inNotUsed arr", function () {
        wonder_expect_js_1.expect(_isIndexCollectedToNotUsed(indexInArrayBuffer, ThreeDTransformData)).true;
    });
}, function (indexInArrayBuffer, ThreeDTransformData) {
    return filter_1.default(ThreeDTransformData.notUsedIndexArray, function (notUsedIndex) {
        return notUsedIndex !== indexInArrayBuffer;
    });
});
var _isNotDirty = function (indexInArrayBuffer, firstDirtyIndex) {
    return indexInArrayBuffer < firstDirtyIndex;
};
var _updateDirtyList = curry_1.default(function (GlobalTempData, ThreeDTransformData, state) {
    return IO_1.IO.of(function () {
        _sortParentBeforeChildInDirtyList(ThreeDTransformData).run();
        var count = ThreeDTransformData.count;
        for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            _transform(i, GlobalTempData, ThreeDTransformData).run();
        }
        return state;
    });
});
var _sortParentBeforeChildInDirtyList = function (ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var relations = ThreeDTransformData.relations, count = ThreeDTransformData.count;
        for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            var parent_1 = relations[i].parent;
            if (_isRelationDataExist(parent_1)) {
                var parentIndex = parent_1.indexInArrayBuffer;
                if (parentIndex > i) {
                    _swap(parentIndex, i, ThreeDTransformData).run();
                }
            }
        }
    });
};
var _moveRelationItemTo = curry_1.default(function (sourceIndex, targetIndex, ThreeDTransformData) {
    return IO_1.IO.of(contract_1.ensureFunc(function () {
        contract_1.it("source relation item should be removed", function () {
            wonder_expect_js_1.expect(_isValidArrayValue(ThreeDTransformData.relations[sourceIndex])).false;
        });
    }, contract_1.requireCheckFunc(function () {
        contract_1.it("source relation should exist", function () {
            wonder_expect_js_1.expect(_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])).true;
        });
        contract_1.it("target relation should not exist", function () {
            wonder_expect_js_1.expect(_isRelationItemExist(ThreeDTransformData.relations[targetIndex])).false;
        });
    }, function () {
        var dataArr = ThreeDTransformData.relations;
        dataArr[targetIndex] = dataArr[sourceIndex];
        dataArr[targetIndex].indexInArrayBuffer = targetIndex;
        _resetValInArr(dataArr, sourceIndex).run();
        return ThreeDTransformData;
    })));
});
var _swapIndexInRelationItemArr = function (index1, index2, relationDataArr) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function () {
        contract_1.it("the two ones should not point to each other", function () {
            wonder_expect_js_1.expect(relationDataArr[index1].indexInArrayBuffer === index2 && relationDataArr[index2].indexInArrayBuffer === index1).false;
        });
    }, function () {
        _swapRelationItemIndex(relationDataArr, index1, index2).run();
        DataUtils_1.DataUtils.swap(relationDataArr, index1, index2, 1);
    }));
};
var _swapRelationItemIndex = function (relationDataArr, index1, index2) {
    return IO_1.IO.of(function () {
        var temp = relationDataArr[index1].indexInArrayBuffer;
        relationDataArr[index1].indexInArrayBuffer = relationDataArr[index2].indexInArrayBuffer;
        relationDataArr[index2].indexInArrayBuffer = temp;
    });
};
var _swap = curry_1.default(function (index1, index2, ThreeDTransformData) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function () {
    }, function () {
        if (index1 === index2) {
            return ThreeDTransformData;
        }
        var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(index1), mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(index2), mat4Size = _getMatrix4DataSize(), vec3SourceIndex = _getVector3DataIndexInArrayBuffer(index1), vec3TargetIndex = _getVector3DataIndexInArrayBuffer(index2), vec3Size = _getVector3DataSize(), quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(index1), quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(index2), quaSize = _getQuaternionDataSize();
        functionalUtils_1.compose(functionalUtils_1.chain(_setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index2], index1)), _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index1], index2))(ThreeDTransformData).run();
        _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.relations).run();
        DataUtils_1.DataUtils.swap(ThreeDTransformData.transforms, index1, index2, 1);
        DataUtils_1.DataUtils.swap(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
        DataUtils_1.DataUtils.swap(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
        DataUtils_1.DataUtils.swap(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
        DataUtils_1.DataUtils.swap(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
        return ThreeDTransformData;
    }));
});
var _resetIndexInTypeArr = function (dataArr, index) {
    return IO_1.IO.of(function () {
        dataArr[index] = 0;
    });
};
var _resetFloatValInTypeArr = function (dataArr, index) {
    return IO_1.IO.of(function () {
        dataArr[index] = 0;
    });
};
var _resetValInArr = function (dataArr, index) {
    return IO_1.IO.of(function () {
        dataArr[index] = void 0;
    });
};
var _moveToIndex = curry_1.default(function (sourceIndex, targetIndex, ThreeDTransformData) {
    return IO_1.IO.of(contract_1.ensureFunc(function () {
        contract_1.it("source index should not be used", function () {
            wonder_expect_js_1.expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).false;
        });
    }, contract_1.requireCheckFunc(function () {
        contract_1.it("source index should not === target index", function () {
            wonder_expect_js_1.expect(sourceIndex).not.equal(targetIndex);
        });
        contract_1.it("source index should be used", function () {
            wonder_expect_js_1.expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).true;
        });
        contract_1.it("target index should not be used", function () {
            wonder_expect_js_1.expect(_isIndexUsed(targetIndex, ThreeDTransformData)).false;
        });
    }, function () {
        var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(sourceIndex), mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(targetIndex), mat4Size = _getMatrix4DataSize(), vec3SourceIndex = _getVector3DataIndexInArrayBuffer(sourceIndex), vec3TargetIndex = _getVector3DataIndexInArrayBuffer(targetIndex), vec3Size = _getVector3DataSize(), quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(sourceIndex), quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(targetIndex), quaSize = _getQuaternionDataSize();
        functionalUtils_1.compose(functionalUtils_1.chain(DataUtils_1.moveTo(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)), functionalUtils_1.chain(DataUtils_1.moveTo(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize, _resetFloatValInTypeArr)), functionalUtils_1.chain(DataUtils_1.moveTo(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)), functionalUtils_1.chain(DataUtils_1.moveTo(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size, _resetFloatValInTypeArr)), functionalUtils_1.chain(DataUtils_1.moveTo(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1, _resetValInArr)), _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex))(ThreeDTransformData).run();
        if (_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])) {
            _moveRelationItemTo(sourceIndex, targetIndex, ThreeDTransformData).run();
        }
        _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray).run();
        return ThreeDTransformData;
    })));
});
var _transform = function (index, GlobalTempData, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var vec3Index = _getVector3DataIndexInArrayBuffer(index), quaIndex = _getQuaternionDataIndexInArrayBuffer(index), mat = GlobalTempData.matrix4_2.setTRS(DataUtils_1.DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index), DataUtils_1.DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex), DataUtils_1.DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)), parent = ThreeDTransformData.relations[index].parent;
        if (_isRelationDataExist(parent)) {
            var parentIndex = parent.indexInArrayBuffer;
            return _setLocalToWorldMatricesData(DataUtils_1.DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(parentIndex))
                .multiply(mat), index, ThreeDTransformData).run();
        }
        return _setLocalToWorldMatricesData(mat, index, ThreeDTransformData).run();
    });
};
var _cleanDirtyList = curry_1.default(function (ThreeDTransformData, state) {
    return IO_1.IO.of(function () {
        var count = ThreeDTransformData.count;
        for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            if (_needMoveOffDirtyList(i)) {
                _moveFromDirtyListToNormalList(i, ThreeDTransformData).run();
            }
        }
        return state;
    });
});
var _needMoveOffDirtyList = function (index) {
    return true;
};
var _moveFromDirtyListToNormalList = function (index, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
        _moveToIndex(index, _generateNotUsedIndexInNormalList(ThreeDTransformData).run(), ThreeDTransformData).run();
    });
};
var _generateNotUsedIndexInArrayBuffer = function (ThreeDTransformData) {
    return IO_1.IO.of(contract_1.ensureFunc(function (indexInArrayBuffer) {
        contract_1.it("indexInArrayBuffer should < firstDirtyIndex", function () {
            wonder_expect_js_1.expect(indexInArrayBuffer).exist;
            wonder_expect_js_1.expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
        });
        contract_1.it("index should not be used", function () {
            wonder_expect_js_1.expect(_isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
        });
    }, function () {
        var result = ThreeDTransformData.indexInArrayBuffer;
        if (result >= ThreeDTransformData.firstDirtyIndex) {
            return ThreeDTransformData.notUsedIndexArray.pop();
        }
        ThreeDTransformData.indexInArrayBuffer += 1;
        return result;
    }));
};
var _generateNotUsedIndexInNormalList = function (ThreeDTransformData) {
    return IO_1.IO.of(contract_1.ensureFunc(function (indexInArrayBuffer) {
        contract_1.it("indexInArrayBuffer should < firstDirtyIndex", function () {
            wonder_expect_js_1.expect(indexInArrayBuffer).exist;
            wonder_expect_js_1.expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
        });
        contract_1.it("index should not be used", function () {
            wonder_expect_js_1.expect(_isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
        });
    }, function () {
        var index = ThreeDTransformData.notUsedIndexArray.pop();
        if (_isValidArrayValue(index)) {
            return index;
        }
        index = ThreeDTransformData.indexInArrayBuffer;
        ThreeDTransformData.indexInArrayBuffer += 1;
        return index;
    }));
};
var _addItAndItsChildrenToDirtyList = curry_1.default(function (rootIndexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var indexInArraybuffer = rootIndexInArrayBuffer, relationData = _getOrSetRelationItem(indexInArraybuffer, ThreeDTransformData.relations).run();
        if (_isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
            _addToDirtyList(indexInArraybuffer, ThreeDTransformData).run();
        }
        forEach_1.default(relationData.children, function (child) {
            _addItAndItsChildrenToDirtyList(child.indexInArrayBuffer, ThreeDTransformData).run();
        });
        return ThreeDTransformData;
    });
});
var _isValidArrayValue = function (val) {
    return JudgeUtils_1.isNotUndefined(val);
};
var _isValidIndex = contract_1.requireCheckFunc(function (index) {
    contract_1.it("index should be number", function () {
        wonder_expect_js_1.expect(index).be.a("number");
    });
}, function (index) {
    return index !== 0;
});
var _removeRelationItemFromParent = function (parent, target) {
    return IO_1.IO.of(function () {
        _removeRelationParent(target).run();
        if (!_isRelationDataExist(parent.children)) {
            return;
        }
        parent.children = filter_1.default(parent.children, function (item) {
            return item !== target;
        });
    });
};
var _addToParent = function (childRelationItem, parentIndexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(contract_1.requireCheckFunc(function () {
        contract_1.it("the child one should not has parent", function () {
            wonder_expect_js_1.expect(_isRelationDataExist(childRelationItem.parent)).false;
        });
    }, function () {
        var parentRelationItem = _getOrSetRelationItem(parentIndexInArrayBuffer, ThreeDTransformData.relations).run(), children = parentRelationItem.children;
        childRelationItem.parent = parentRelationItem;
        if (_isRelationDataExist(children)) {
            children.push(childRelationItem);
        }
        else {
            parentRelationItem.children = [childRelationItem];
        }
    }));
};
var _addFirstDirtyIndex = contract_1.ensureFunc(function (firstDirtyIndex) {
    contract_1.it("firstDirtyIndex should <= count", function () {
        wonder_expect_js_1.expect(firstDirtyIndex).lte(ThreeDTransformData_1.ThreeDTransformData.count);
    });
}, function (ThreeDTransformData) {
    return ThreeDTransformData.firstDirtyIndex + 1;
});
var _minusFirstDirtyIndex = contract_1.ensureFunc(function (firstDirtyIndex) {
    contract_1.it("firstDirtyIndex should >= start index:" + _getStartIndexInArrayBuffer(), function () {
        wonder_expect_js_1.expect(firstDirtyIndex).gte(_getStartIndexInArrayBuffer());
    });
}, function (firstDirtyIndex) {
    return firstDirtyIndex - 1;
});
var _disposeItemInDataContainer = curry_1.default(function (indexInArrayBuffer, GlobalTempData, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
        _setTransformItemInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData).run();
        DataUtils_1.DataUtils.removeItemInArray(ThreeDTransformData.transforms, indexInArrayBuffer);
        _removeRelationItem(indexInArrayBuffer, ThreeDTransformData).run();
        return ThreeDTransformData;
    });
});
var _removeRelationItem = function (indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var relations = ThreeDTransformData.relations, relationData = relations[indexInArrayBuffer];
        _resetValInArr(relations, indexInArrayBuffer).run();
        var parent = relationData.parent;
        if (_isRelationDataExist(parent)) {
            _removeRelationItemFromParent(parent, relationData).run();
        }
    });
};
var _disposeFromNormalList = function (indexInArrayBuffer, GlobalTempData, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray).run();
        return _disposeItemInDataContainer(indexInArrayBuffer, GlobalTempData, ThreeDTransformData).run();
    });
};
var _disposeFromDirtyList = function (indexInArrayBuffer, GlobalTempData, ThreeDTransformData) {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    return functionalUtils_1.compose(functionalUtils_1.map(function (ThreeDTransformData) {
        ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
    }), functionalUtils_1.chain(_disposeItemInDataContainer(firstDirtyIndex, GlobalTempData)), _swap(indexInArrayBuffer, firstDirtyIndex))(ThreeDTransformData);
};
var _getMatrix4DataSize = function () { return 16; };
var _getVector3DataSize = function () { return 3; };
var _getQuaternionDataSize = function () { return 4; };
var _getMatrix4DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * _getMatrix4DataSize(); };
var _getVector3DataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * _getVector3DataSize(); };
var _getQuaternionDataIndexInArrayBuffer = function (indexInArrayBuffer) { return indexInArrayBuffer * _getQuaternionDataSize(); };
var _setLocalToWorldMatricesData = curry_1.default(function (mat, indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        DataUtils_1.DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, _getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer));
    });
});
var _setLocalPositionData = curry_1.default(function (pos, indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        DataUtils_1.DataUtils.setVectors(ThreeDTransformData.localPositions, pos, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer));
        return ThreeDTransformData;
    });
});
var _setLocalRotationData = curry_1.default(function (qua, indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        DataUtils_1.DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, _getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer));
        return ThreeDTransformData;
    });
});
var _setLocalScaleData = curry_1.default(function (scale, indexInArrayBuffer, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        DataUtils_1.DataUtils.setVectors(ThreeDTransformData.localScales, scale, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer));
        return ThreeDTransformData;
    });
});
var _setTransformItemInTypeArr = function (indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData) { return functionalUtils_1.compose(functionalUtils_1.chain(_setLocalToWorldMatricesData(mat, indexInArrayBuffer)), functionalUtils_1.chain(_setLocalRotationData(qua, indexInArrayBuffer)), functionalUtils_1.chain(_setLocalPositionData(positionVec, indexInArrayBuffer)), _setLocalScaleData(scaleVec, indexInArrayBuffer))(ThreeDTransformData); };
var _addDefaultTransformData = function (GlobalTempData, ThreeDTransformData) {
    return IO_1.IO.of(function () {
        var count = ThreeDTransformData.count, mat = GlobalTempData.matrix4_1.setIdentity(), positionVec = GlobalTempData.vector3_1.set(0, 0, 0), qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1), scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);
        for (var i = _getStartIndexInArrayBuffer(); i < count; i++) {
            _setTransformItemInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData).run();
        }
    });
};
var _getStartIndexInArrayBuffer = function () { return 1; };
exports.initData = function (GlobalTempData, ThreeDTransformData) {
    return IO_1.IO.of(function () {
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
        ThreeDTransformData.transformIndexInArrayBufferTable = {};
        ThreeDTransformData.notUsedIndexArray = [];
        ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
        ThreeDTransformData.indexInArrayBuffer = _getStartIndexInArrayBuffer();
        _addDefaultTransformData(GlobalTempData, ThreeDTransformData).run();
    });
};
//# sourceMappingURL=ThreeDTransformSystem.js.map