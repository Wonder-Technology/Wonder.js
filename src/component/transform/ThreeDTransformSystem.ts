import { ThreeDTransformData, ThreeDTransformRelationData } from "./ThreeDTransformData";
import { chain, compose, map } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import forEach from "wonder-lodash/forEach";
import filter from "wonder-lodash/filter";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransform } from "./ThreeDTransform";
import { Map } from "immutable";
import { expect } from "wonder-expect.js";
import { DataUtils } from "../../utils/DataUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { Quaternion } from "../../math/Quaternion";
import { cacheFunc } from "../../utils/cacheUtils";

export var init = (GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    return update(null, GlobalTempData, ThreeDTransformData, state);
}

var _getTransformIndexInArrayBufferTable = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    return ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid];
}

var _setTransformIndexInArrayBufferTable = (transform: ThreeDTransform, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid] = indexInArrayBuffer;

    return ThreeDTransformData;
}


var _setTransforms = curry((transform: ThreeDTransform, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    ThreeDTransformData.transforms[indexInArrayBuffer] = transform;

    return ThreeDTransformData;
})

export var createIndexInArrayBuffer = (transform: ThreeDTransform, ThreeDTransformData) => {
    var indexInArrayBuffer = _generateNotUsedIndexInArrayBuffer(ThreeDTransformData);


    _setTransformIndexInArrayBufferTable(transform, indexInArrayBuffer, ThreeDTransformData);
    _setTransforms(transform, indexInArrayBuffer, ThreeDTransformData);

    // return compose(
    //     chain(_setTransforms(transform, indexInArrayBuffer)),
    //     _setTransformIndexInArrayBufferTable(transform, indexInArrayBuffer)
    // )(ThreeDTransformData);
}

export var addComponent = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);

    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData);

    // return compose(
    //     chain(_addItAndItsChildrenToDirtyList(indexInArrayBuffer)),
    //     // chain(_addSelfDataWithNoOverwrite(indexInArrayBuffer)),
    //     _setTransforms(transform, indexInArrayBuffer)
    //     // _setTransformIndexInArrayBufferTable(transform, indexInArrayBuffer)
    // )(ThreeDTransformData);
    // return IO.of(() => {
    //     var indexInArrayBuffer = _generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
    //
    //     ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid] = indexInArrayBuffer;
    //     // transform.indexInArrayBuffer = indexInArrayBuffer;
    //     ThreeDTransformData.transforms[indexInArrayBuffer] = transform;
    //
    //     _addSelfData(transform.indexInArrayBuffer, ThreeDTransformData);
    //     _addItAndItsChildrenToDirtyList(transform.indexInArrayBuffer, ThreeDTransformData);
    // });
}

export var disposeComponent = (transform: ThreeDTransform, GlobalTempData: any, ThreeDTransformData: any) => {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);

    if (_isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
        return _disposeFromNormalList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData);
    }

    return _disposeFromDirtyList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData);
}

export var getParent = requireCheckFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var relationData = ThreeDTransformData.relations[_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData)];

    if (_isRelationItemExist(relationData)) {
        return relationData.parent;
    }

    return null;
})

var _getRelationData = (relationData: ThreeDTransformRelationData, dataName: string) => {
    if (!_isRelationItemExist(relationData)) {
        return null;
    }

    let data = relationData[dataName];

    return _isRelationDataExist(data) ? data : null;
}

var _getOrSetRelationItem = (indexInArrayBuffer: number, relations: Array<ThreeDTransformRelationData>) => {
    var data = relations[indexInArrayBuffer];

    if (!_isRelationItemExist(data)) {
        data = _createEmptyRelationItem(indexInArrayBuffer);

        relations[indexInArrayBuffer] = data;

        return data;
    }

    return data;
}

var _isTransformEqual = (tra1:ThreeDTransform, tra2:ThreeDTransform) => tra1.uid === tra2.uid;

export var setParent = requireCheckFunc((transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => {
    it("parent should not be self", () => {
        expect(_isTransformEqual(transform, parent)).false;
    });
}, (transform: ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData: any) => {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData),
        parentIndexInArrayBuffer: number = null,
        relationData = _getOrSetRelationItem(indexInArrayBuffer, ThreeDTransformData.relations),
        currentParent = relationData.parent,
        isCurrentParentExisit = _isRelationDataExist(currentParent);

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
})

var _createEmptyRelationItem = (indexInArrayBuffer: number) => {
    var data = ThreeDTransformRelationData.create();

    data.indexInArrayBuffer = indexInArrayBuffer;

    return data;
}



var _markIsTranslate = (transform: ThreeDTransform, isTranslate:boolean) => {
    transform.isTranslate = isTranslate;
}
//
// var _getLocalToWorldMatrixCache = (transform: ThreeDTransform) => {
//     return transform.localToWorldMatrixCache;
// }
//
// var _setLocalToWorldMatrixCache = (transform: ThreeDTransform, mat:Matrix4) => {
//     return IO.of(() => {
//         transform.localToWorldMatrixCache = mat;
//     });
// }
//
// var _hasLocalToWorldMatrixCache = (transform: ThreeDTransform) => {
//     return transform.localToWorldMatrixCache !== null;
// }

// var _createLocalToWorldMatrixFromPool = (transform: ThreeDTransform, pool:Array<Matrix4>, Matrix4:any) => {
//     return IO.of(() => {
//         var uid = transform.uid,
//             m = pool[uid];
//
//         if(!!m){
//             return m;
//         }
//
//         m = Matrix4.create();
//         pool[uid] = m;
//
//         return m;
//     });
// }

export var getLocalToWorldMatrix = cacheFunc((transform: ThreeDTransform, ThreeTransformData: any, mat:Matrix4) => {
    return transform.localToWorldMatrixCache !== null;
}, (transform: ThreeDTransform, ThreeTransformData: any, mat:Matrix4) => {
    return transform.localToWorldMatrixCache;
}, (transform: ThreeDTransform, ThreeTransformData: any, mat:Matrix4, returnedMat:Matrix4) => {
    transform.localToWorldMatrixCache = returnedMat;
}, (transform: ThreeDTransform, ThreeTransformData: any, mat:Matrix4) => {
    // return DataUtils.createMatrix4ByIndex(_createLocalToWorldMatrixFromPool(transform, ThreeDTransformData.localToWorldMatrixPool, Matrix4), ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
    return DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
})

export var getPosition = cacheFunc((transform: ThreeDTransform, ThreeTransformData: any) => {
    return transform.positionCache !== null;
}, (transform: ThreeDTransform, ThreeTransformData: any) => {
    return transform.positionCache;
}, (transform: ThreeDTransform, ThreeTransformData: any, position:Vector3) => {
    transform.positionCache = position;
}, (transform: ThreeDTransform, ThreeTransformData: any) => {
    var index = _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)),
        localToWorldMatrices = ThreeTransformData.localToWorldMatrices;

    return transform.tempPosition.set(localToWorldMatrices[index + 12], localToWorldMatrices[index + 13], localToWorldMatrices[index + 14]);
})

export var setPosition = (transform: ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData),
        parent: ThreeDTransformRelationData = _getRelationData(ThreeDTransformData.relations[indexInArrayBuffer], "parent"),
        vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData));

    if (_isRelationDataExist(parent)) {
        DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix(ThreeDTransformData.transforms[parent.indexInArrayBuffer], ThreeTransformData, GlobalTempData.matrix4_1).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }

    _markIsTranslate(transform, true);

    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData);
}

export var getLocalPosition =
    cacheFunc((transform: ThreeDTransform, ThreeTransformData: any) => {
        return transform.localPositionCache !== null;
    }, (transform: ThreeDTransform, ThreeTransformData: any) => {
        return transform.localPositionCache;
    }, (transform: ThreeDTransform, ThreeTransformData: any, position:Vector3) => {
        transform.localPositionCache = position;
    }, (transform: ThreeDTransform, ThreeTransformData: any) => {
        return DataUtils.createVector3ByIndex(transform.tempLocalPosition, ThreeDTransformData.localPositions, _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
    })

export var setLocalPosition = (transform: ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData),
        vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

    DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);

    _markIsTranslate(transform, true);

    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData);
}

export var update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    return compose(
        _cleanDirtyList(ThreeDTransformData),
        _updateDirtyList(GlobalTempData, ThreeDTransformData),
        _clearCache(ThreeDTransformData)
    )(state);
}

var _clearCache = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = ThreeDTransformData.count,
        transforms = ThreeDTransformData.transforms;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let transform = transforms[i];

        if(transform.isTranslate){
            transform.localToWorldMatrixCache = null;
            transform.positionCache = null;
            transform.localPositionCache = null;

            transform.isTranslate = false;
        }

        //todo clean more cache!
    }
})

// var _clearTransformCache = () => {
//
// }

var _isNotChangeParent = (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
}

// var _addDirtyIndex = curry((indexInArrayBuffer: number, ThreeDTransformData: any) => {
//     return IO.of(() => {
//         ThreeDTransformData.firstDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData);
//         _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray);
//
//         return ThreeDTransformData.firstDirtyIndex;
//     });
// })

var _isIndexUsed = ensureFunc((isExist: boolean, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("if(or not) exist data, the transform and its indexInArrayBuffer should be(or not) setted to data container;relation item should(or not) exist", () => {
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
}, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
})

var _isRelationDataExist = (relationData: ThreeDTransformRelationData | Array<ThreeDTransformRelationData>) => relationData !== null;

var _isRelationItemExist = (relationData: ThreeDTransformRelationData) => _isValidArrayValue(relationData);

var _removeRelationParent = (relations: ThreeDTransformRelationData) => {
    relations.parent = null;
}

var _addToDirtyList = requireCheckFunc((indexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("firstDirtyIndex should <= count", () => {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
    // it("target index should not be used", () => {
    //     var targetDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);
    //
    //     expect(_isIndexUsed(targetDirtyIndex, ThreeDTransformData)).false;
    // });
},(indexInArrayBuffer: number, ThreeDTransformData: any) => {
    let targetDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);

    ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

    if (_isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
        _swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
    }
    else {
        _moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);

    // if (_isIndexCollectedToNotUsed(targetDirtyIndex, ThreeDTransformData)) {
    //     ThreeDTransformData.notUsedIndexArray = _removeIndexInNotUsedArr(targetDirtyIndex, ThreeDTransformData);
    // }
    }

    return targetDirtyIndex;
    // }));
})

// var _isDirtyIndex = (indexInArrayBuffer:number, firstDirtyIndex:number) => indexInArrayBuffer >= firstDirtyIndex;

var _getNotUsedIndexFromArr = (ThreeDTransformData:any) => {
    var notUsedIndexArray = ThreeDTransformData.notUsedIndexArray;
    var getFunc = (i:number) => {
        if(!_isValidArrayValue(i)){
            return void 0;
        }

        if(_isIndexUsed(i, ThreeDTransformData)){
            return getFunc(_getNotUsedIndex(notUsedIndexArray));
        }

        return i;
    }

    /*!

     */
    return getFunc(_getNotUsedIndex(notUsedIndexArray));
}

var _getNotUsedIndex = (notUsedIndexArray: Array<number>) => {
    /*!
    optimize: return the first one to ensure that the result index be as much remote from firDirtyIndex as possible(so that it can reduce swap when add to dirty list)
     */
    return notUsedIndexArray.shift();
};

var _addNotUsedIndex = (index: number, notUsedIndexArray: Array<number>) => {
    notUsedIndexArray.push(index);
};

// var _isIndexCollectedToNotUsed = (indexInArrayBuffer: number, ThreeDTransformData: any) => {
//     return ThreeDTransformData.notUsedIndexArray.indexOf(indexInArrayBuffer) > -1;
// }

// var _removeIndexInNotUsedArr = requireCheckFunc((indexInArrayBuffer: number, ThreeDTransformData: any) => {
//     it("target index should in inNotUsed arr", () => {
//         expect(_isIndexCollectedToNotUsed(indexInArrayBuffer, ThreeDTransformData)).true;
//     });
// }, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
//     return filter(ThreeDTransformData.notUsedIndexArray, (notUsedIndex: number) => {
//         return notUsedIndex !== indexInArrayBuffer;
//     })
//     // return ThreeDTransformData.notUsedIndexArray;
// })

var _isNotDirty = (indexInArrayBuffer: number, firstDirtyIndex: number) => {
    return indexInArrayBuffer < firstDirtyIndex;
}

var _updateDirtyList = curry((GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    //todo test:ensure parent before child
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);

    let count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }

    return state;
})

var _sortParentBeforeChildInDirtyList = (ThreeDTransformData: any) => {
    var relations = ThreeDTransformData.relations,
        count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let parent = relations[i].parent;

        if (_isRelationDataExist(parent)) {
            let parentIndex = parent.indexInArrayBuffer;

            if (parentIndex > i) {
                _swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
}


var _moveRelationItemTo = ensureFunc((resultVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source relation item should be removed", () => {
        expect(_isValidArrayValue(ThreeDTransformData.relations[sourceIndex])).false;
    });
}, requireCheckFunc((sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source relation should exist", () => {
        expect(_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])).true;
    });
    it("target relation should not exist", () => {
        expect(_isRelationItemExist(ThreeDTransformData.relations[targetIndex])).false;
    });
},(sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    var dataArr = ThreeDTransformData.relations;

    dataArr[targetIndex] = dataArr[sourceIndex];
    dataArr[targetIndex].indexInArrayBuffer = targetIndex;

    _resetValInArr(dataArr, sourceIndex);
    // dataArr[sourceIndex] = void 0;

    return ThreeDTransformData;
}));

var _swapIndexInRelationItemArr = requireCheckFunc((index1: number, index2: number, relationDataArr: Array<ThreeDTransformRelationData>) => {
    it("the two ones should not point to each other", () => {
        expect(relationDataArr[index1].indexInArrayBuffer === index2 && relationDataArr[index2].indexInArrayBuffer === index1).false;
    });
},(index1: number, index2: number, relationDataArr: Array<ThreeDTransformRelationData>) => {
    _swapRelationItemIndex(relationDataArr, index1, index2);

    DataUtils.swap(relationDataArr, index1, index2, 1);
})

var _swapRelationItemIndex = (relationDataArr: Array<ThreeDTransformRelationData>, index1: number, index2: number) => {
    let temp = relationDataArr[index1].indexInArrayBuffer;

    relationDataArr[index1].indexInArrayBuffer = relationDataArr[index2].indexInArrayBuffer;


    relationDataArr[index2].indexInArrayBuffer = temp;
}

var _swap = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
   it("source index and target index should be used", () => {
       expect(_isIndexUsed(index1, ThreeDTransformData)).true;
       expect(_isIndexUsed(index2, ThreeDTransformData)).true;
   });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    if (index1 === index2) {
        return ThreeDTransformData;
    }

    let mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(index1),
        mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(index2),
        mat4Size = _getMatrix4DataSize(),
        vec3SourceIndex = _getVector3DataIndexInArrayBuffer(index1),
        vec3TargetIndex = _getVector3DataIndexInArrayBuffer(index2),
        vec3Size = _getVector3DataSize(),
        quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(index1),
        quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(index2),
        quaSize = _getQuaternionDataSize();

    _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index1], index2, ThreeDTransformData);
    _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index2], index1, ThreeDTransformData);

    // compose(
    //     chain(_setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index2], index1)),
    //     _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index1], index2)
    // )(ThreeDTransformData);

    // forEach([
    //     _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.parents),
    //     _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.firstChildren),
    //     _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.nextSiblings)
    // ], (io:IO) => {
    //     io;
    // });
    _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.relations);

    DataUtils.swap(ThreeDTransformData.transforms, index1, index2, 1);

    DataUtils.swap(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    DataUtils.swap(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    DataUtils.swap(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    DataUtils.swap(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);

    return ThreeDTransformData;
})

// var _resetIndexInTypeArr = (dataArr: Uint16Array, index: number) => {
//     return IO.of(() => {
//         dataArr[index] = 0;
//     });
// }
//
// var _resetFloatValInTypeArr = (dataArr: Float32Array, index: number) => {
//     return IO.of(() => {
//         dataArr[index] = 0;
//     });
// }
//
var _resetValInArr = (dataArr: Array<any>, index: number) => {
    dataArr[index] = void 0;
}

var _moveToTypeArr = (dataArr: Uint16Array, sourceIndex: number, targetIndex: number, length: number
) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = sourceIndex + i,
            newIndex2 = targetIndex + i;

        dataArr[newIndex2] = dataArr[newIndex1];

        dataArr[newIndex1] = 0;
    }

    return ThreeDTransformData;
};


var _moveToArr = (dataArr: Array<any>, sourceIndex: number, targetIndex: number, length: number) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = sourceIndex + i,
            newIndex2 = targetIndex + i;

        dataArr[newIndex2] = dataArr[newIndex1];

        dataArr[newIndex1] = void 0;
    }

    return ThreeDTransformData;
}


var _moveToIndex = ensureFunc((returnVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source index should not be used", () => {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc((sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source index should be used", () => {
        expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", () => {
        expect(_isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
},(sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    if(sourceIndex === targetIndex){
        return ThreeDTransformData;
    }

    let mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(sourceIndex),
        mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(targetIndex),
        mat4Size = _getMatrix4DataSize(),
        vec3SourceIndex = _getVector3DataIndexInArrayBuffer(sourceIndex),
        vec3TargetIndex = _getVector3DataIndexInArrayBuffer(targetIndex),
        vec3Size = _getVector3DataSize(),
        quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(sourceIndex),
        quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(targetIndex),
        quaSize = _getQuaternionDataSize();

    _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex, ThreeDTransformData);

    _moveToArr(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1)
    _moveToTypeArr(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size)
    _moveToTypeArr(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size)
    _moveToTypeArr(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize)
    _moveToTypeArr(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size)



    // compose(
    //     chain(moveTo(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)),
    //     chain(moveTo(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize, _resetFloatValInTypeArr)),
    //     chain(moveTo(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)),
    //     chain(moveTo(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size, _resetFloatValInTypeArr)),
    //     moveTo(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1, _resetValInArr)
    //     // _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex)
    // )(ThreeDTransformData);

    if (_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])) {
        _moveRelationItemTo(sourceIndex, targetIndex, ThreeDTransformData);
    }

    _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray);

    return ThreeDTransformData;
}))

var _transform = (index: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var vec3Index = _getVector3DataIndexInArrayBuffer(index),
        quaIndex = _getQuaternionDataIndexInArrayBuffer(index),
        mat = GlobalTempData.matrix4_2.setTRS(
            DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index),
            DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex),
            DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)
        ),
        parent = ThreeDTransformData.relations[index].parent;

    if (_isRelationDataExist(parent)) {
        let parentIndex = parent.indexInArrayBuffer;

        return _setLocalToWorldMatricesData(DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(parentIndex))
                .multiply(mat),
            index,
            ThreeDTransformData
        );
    }

    return _setLocalToWorldMatricesData(
        mat,
        index,
        ThreeDTransformData
    );
}

//todo optimize: if transform not transformed in 5 frames, not move off
var _cleanDirtyList = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        if (_needMoveOffDirtyList(i)) {
            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
        }
    }

    return state;
})

var _needMoveOffDirtyList = (index: number) => {
    return true;
}

var _moveFromDirtyListToNormalList = (index: number, ThreeDTransformData: any) => {
    // return _swap(index, ThreeDTransformData.firstDirtyIndex, ThreeDTransformData)

    // return compose(
    //     map((ThreeDTransformData) => {
    //         ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
    //     }),
    //     // _moveToIndex(index, ThreeDTransformData, _generateNotUsedIndexInNormalList(ThreeDTransformData))
    //     _swap(index, ThreeDTransformData.firstDirtyIndex)
    // )(ThreeDTransformData)

    ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);

    _moveToIndex(index, _generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
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
        expect(_isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
    });
}

var _generateNotUsedIndexInArrayBuffer = ensureFunc((indexInArrayBuffer:number, ThreeDTransformData: any) => {
    _checkGeneratedNotUsedIndex(ThreeDTransformData, indexInArrayBuffer);
}, (ThreeDTransformData: any) => {
    var result = ThreeDTransformData.indexInArrayBuffer;

    if (result >= ThreeDTransformData.firstDirtyIndex) {
        return _getNotUsedIndexFromArr(ThreeDTransformData);
    }

    ThreeDTransformData.indexInArrayBuffer += 1;

    return result;
})

var _generateNotUsedIndexInNormalList = ensureFunc((indexInArrayBuffer:number, ThreeDTransformData: any) => {
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

// var _addItAndItsChildrenToDirtyList = curry((rootIndexInArrayBuffer: number, ThreeDTransformData: any) => {
var _addItAndItsChildrenToDirtyList = (rootIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    var indexInArraybuffer: number = rootIndexInArrayBuffer,
        relationData = _getOrSetRelationItem(indexInArraybuffer, ThreeDTransformData.relations);

    if (_isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        _addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }

    forEach(relationData.children, (child: ThreeDTransformRelationData) => {
        _addItAndItsChildrenToDirtyList(child.indexInArrayBuffer, ThreeDTransformData)
    })

    return ThreeDTransformData;
}

var _isValidArrayValue = (val: any) => {
    return isNotUndefined(val);
}


var _removeRelationItemFromParent = (parent: ThreeDTransformRelationData, target: ThreeDTransformRelationData) => {
    _removeRelationParent(target);

    if (!_isRelationDataExist(parent.children)) {
        return;
    }

    parent.children = filter(parent.children, (item: ThreeDTransformRelationData) => {
        return item !== target;
    });
}

var _addToParent = requireCheckFunc((childRelationItem: ThreeDTransformRelationData, parentIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("the child one should not has parent", () => {
        expect(_isRelationDataExist(childRelationItem.parent)).false;
    });
},(childRelationItem: ThreeDTransformRelationData, parentIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    var parentRelationItem = _getOrSetRelationItem(parentIndexInArrayBuffer, ThreeDTransformData.relations),
        children = parentRelationItem.children;

    childRelationItem.parent = parentRelationItem;

    if (_isRelationDataExist(children)) {
        children.push(childRelationItem);
    }
    else {
        parentRelationItem.children = [childRelationItem];
    }
})

var _addFirstDirtyIndex = ensureFunc((firstDirtyIndex: number) => {
    it("firstDirtyIndex should <= count", () => {
        expect(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, (ThreeDTransformData: any) => {
    return ThreeDTransformData.firstDirtyIndex + 1;
})

var _minusFirstDirtyIndex = ensureFunc((firstDirtyIndex: number) => {
    it(`firstDirtyIndex should >= start index:${_getStartIndexInArrayBuffer()}`, () => {
        expect(firstDirtyIndex).gte(_getStartIndexInArrayBuffer());
    });
}, (firstDirtyIndex: number) => {
    return firstDirtyIndex - 1;
})

var _disposeItemInDataContainer = curry((indexInArrayBuffer: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var mat = GlobalTempData.matrix4_1.setIdentity(),
        positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
        qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
        scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

    _setTransformItemInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData);

    DataUtils.removeItemInArray(ThreeDTransformData.transforms, indexInArrayBuffer);

    // DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.parents, indexInArrayBuffer, _resetIndexInTypeArr);
    // DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.firstChildren, indexInArrayBuffer, _resetIndexInTypeArr);
    // DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.nextSiblings, indexInArrayBuffer, _resetIndexInTypeArr);
    _removeRelationItem(indexInArrayBuffer, ThreeDTransformData);

    return ThreeDTransformData;
})

var _removeRelationItem = (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    var relations = ThreeDTransformData.relations,
        relationData = relations[indexInArrayBuffer];


    _resetValInArr(relations, indexInArrayBuffer);

    let parent = relationData.parent;

    if (_isRelationDataExist(parent)) {
        _removeRelationItemFromParent(parent, relationData);
    }
}

var _disposeFromNormalList = (indexInArrayBuffer: number, GlobalTempData: any, ThreeDTransformData: any) => {
    _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray);

    return _disposeItemInDataContainer(indexInArrayBuffer, GlobalTempData, ThreeDTransformData);
}


var _disposeFromDirtyList = (indexInArrayBuffer: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;

    _swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData);

    return compose(
        (ThreeDTransformData) => {
            ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
        },
        _disposeItemInDataContainer(firstDirtyIndex, GlobalTempData)
    )(ThreeDTransformData)
}

// var _forbiddenAccessTransformDataBeforeAddToEntityObject = (transform: ThreeDTransform, ThreeDTransformData:any) => {
//     it("should access transform data after added to entityObject", () => {
//         expect(_isValidTableValue(_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData))).true;
//         expect(ThreeDTransformData.transforms[_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData)] === transform).true;
//     });
// }

var _getMatrix4DataSize = () => 16;

var _getVector3DataSize = () => 3;

var _getQuaternionDataSize = () => 4;

var _getMatrix4DataIndexInArrayBuffer = (indexInArrayBuffer: number) => indexInArrayBuffer * _getMatrix4DataSize();

var _getVector3DataIndexInArrayBuffer = (indexInArrayBuffer: number) => indexInArrayBuffer * _getVector3DataSize();

var _getQuaternionDataIndexInArrayBuffer = (indexInArrayBuffer: number) => indexInArrayBuffer * _getQuaternionDataSize();

var _setLocalToWorldMatricesData = curry((mat: Matrix4, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, _getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer));
})

var _setLocalPositionData = curry((pos: Vector3, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setVectors(ThreeDTransformData.localPositions, pos, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer));

    return ThreeDTransformData;
})

var _setLocalRotationData = curry((qua: Quaternion, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, _getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer));

    return ThreeDTransformData;
})

var _setLocalScaleData = curry((scale: Vector3, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setVectors(ThreeDTransformData.localScales, scale, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer));

    return ThreeDTransformData;
})


var _setTransformItemInTypeArr = (indexInArrayBuffer: number, mat: Matrix4, qua: Quaternion, positionVec: Vector3, scaleVec: Vector3, ThreeDTransformData: any) => compose(
    _setLocalToWorldMatricesData(mat, indexInArrayBuffer),
    _setLocalRotationData(qua, indexInArrayBuffer),
    _setLocalPositionData(positionVec, indexInArrayBuffer),
    _setLocalScaleData(scaleVec, indexInArrayBuffer)
)(ThreeDTransformData);



var _addDefaultTransformData = (GlobalTempData: any, ThreeDTransformData: any) => {
    var count = ThreeDTransformData.count,
        mat = GlobalTempData.matrix4_1.setIdentity(),
        positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
        qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
        scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

    for (let i = _getStartIndexInArrayBuffer(); i < count; i++) {
        // ThreeDTransformData.parents[i] =-1;
        // ThreeDTransformData.firstChildren[i] = -1;
        // ThreeDTransformData.nextSiblings[i] = -1;

        _setTransformItemInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    }
}

/*!
 regard 0 as the default index, so that _isValidIndex can judge whether the index is not the default index or not!
 */
var _getStartIndexInArrayBuffer = () => 1;

export var initData = (GlobalTempData: any, ThreeDTransformData: any) => {
    var buffer: ArrayBuffer = null,
        count = ThreeDTransformData.count;

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

    // ThreeDTransformData.localToWorldMatrixPool = [];

    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
    ThreeDTransformData.indexInArrayBuffer = _getStartIndexInArrayBuffer();

    _addDefaultTransformData(GlobalTempData, ThreeDTransformData);
}

