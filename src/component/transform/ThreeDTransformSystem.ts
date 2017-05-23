import { ThreeDTransformData, TransformMap } from "./ThreeDTransformData";
import { compose } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import forEach from "wonder-lodash/forEach";
import filter from "wonder-lodash/filter";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { BatchTransformData, IThreeDTransform, ThreeDTransform } from "./ThreeDTransform";
import { Map } from "immutable";
import { expect } from "wonder-expect.js";
import { DataUtils } from "../../utils/DataUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { Quaternion } from "../../math/Quaternion";
import { cacheFunc } from "../../utils/cacheUtils";
import {
    addAddComponentHandle as addAddComponentHandleToMap, addDisposeHandle as addDisposeHandleToMap,
    checkComponentShouldAlive, getComponentGameObject
} from "../ComponentSystem";
import { deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export var addAddComponentHandle = (_class: any, ThreeDTransformData:any) => {
    addAddComponentHandleToMap(_class, addComponent(ThreeDTransformData));
}

export var addDisposeHandle = (_class: any, GlobalTempData:any, ThreeDTransformData:any) => {
    addDisposeHandleToMap(_class, disposeComponent(GlobalTempData, ThreeDTransformData));
}

export var create = (ThreeDTransformData:any) => {
    var transform = new ThreeDTransform(),
        index = _generateIndexInArrayBuffer(ThreeDTransformData),
        uid = _buildUID(ThreeDTransformData);

    transform.index = index;
    transform.uid = uid;

    return compose(
        _setTransformMap(index, transform),
        _createTempData(uid)
    )(ThreeDTransformData)
}

var _buildUID = (ThreeDTransformData:any) => {
    return ThreeDTransformData.uid++;
}

var _generateIndexInArrayBuffer = (ThreeDTransformData:any) => {
    return _generateNotUsedIndexInArrayBuffer(ThreeDTransformData);
}


var _createTempData = curry((uid:number, ThreeDTransformData:any,) => {
    ThreeDTransformData.tempPositionMap[uid] = Vector3.create();
    ThreeDTransformData.tempLocalPositionMap[uid] = Vector3.create();
    ThreeDTransformData.tempLocalToWorldMatrixMap[uid] = Matrix4.create();

    return ThreeDTransformData;
})

export var init = (GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    return update(null, GlobalTempData, ThreeDTransformData, state);
}

export var addComponent = curry((ThreeDTransformData: any, transform: ThreeDTransform, gameObject:GameObject) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid;

    ThreeDTransformData.gameObjectMap[uid] = gameObject;

    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
})

export var disposeComponent = curry((GlobalTempData:any, ThreeDTransformData:any, transform: ThreeDTransform) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid;

    if (_isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
        return _disposeFromNormalList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
    }

    return _disposeFromDirtyList(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
})

export var getGameObject = (index:number, Data:any) => {
    return getComponentGameObject(Data.gameObjectMap, index);
}

export var getParent = (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var parent = _getParent(transform.uid, ThreeDTransformData);

    if(isValidMapValue(parent)){
        return parent;
    }

    return null;
}


var _getChildren = (uid:number, ThreeDTransformData:any) => {
    return ThreeDTransformData.childrenMap[uid];
}

var _addChild = (uid:number, child:ThreeDTransform, ThreeDTransform:any) => {
    var children = _getChildren(uid, ThreeDTransformData);

    if (isValidMapValue(children)) {
        children.push(child);
    }
    else {
        _setChildren(uid, [child], ThreeDTransformData);
    }
}

var _setChildren = (uid:number, children:Array<ThreeDTransform>, ThreeDTransform:any) => {
    ThreeDTransformData.childrenMap[uid] = children;
}

var _getParent = requireCheckFunc ((uid: string, ThreeDTransformData:any) => {
    it("uid should exist", () => {
        expect(uid).exist;
    });
}, (uid: string, ThreeDTransformData:any) => {
    return ThreeDTransformData.parentMap[uid];
})

var _setParent = (uid:number, parent:ThreeDTransform, ThreeDTransformData:any) => {
    ThreeDTransformData.parentMap[uid] = parent;
}


var _isTransformEqual = (tra1:ThreeDTransform, tra2:ThreeDTransform) => tra1.uid === tra2.uid;

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
        currentParent:ThreeDTransform = _getParent(uid, ThreeDTransformData),
        isCurrentParentExisit = _isParentExist(currentParent);

    if (parent === null) {
        if (isCurrentParentExisit) {
            _removeRelationFromParent(currentParent, uid, ThreeDTransformData);

            _addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
        }

        return;
    }

    parentIndexInArrayBuffer = parent.index;

    if (isCurrentParentExisit) {
        if (_isNotChangeParent(currentParent.index, parentIndexInArrayBuffer)) {
            return;
        }

        _removeRelationFromParent(currentParent, uid, ThreeDTransformData);
    }

    _addToParent(uid, transform, parent, ThreeDTransformData);

    _addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeDTransformData);
})

var _getIsTranslate = (uid:number, ThreeDTransform:any) => {
    return ThreeDTransformData.isTranslateMap[uid];
}

var _setIsTranslate = requireCheckFunc ((uid:number, isTranslate:boolean, ThreeDTransform:any) => {
    // it("indexInArrayBuffer should be used", () => {
    //     expect(_isIndexUsed(indexInArrayBuffer)).true;
    // });
}, (uid:number, isTranslate:boolean, ThreeDTransform:any) => {
    ThreeDTransformData.isTranslateMap[uid] = isTranslate;
})

export var getLocalToWorldMatrix = requireCheckFunc((transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    _checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    return isValidMapValue(ThreeTransformData.localPositionCacheMap[transform.uid]);
}, (transform:IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    return ThreeTransformData.localPositionCacheMap[transform.uid];
}, (transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any, returnedMat:Matrix4) => {
    ThreeTransformData.localPositionCacheMap[transform.uid] = returnedMat;
}, (transform: IThreeDTransform, mat:Matrix4, ThreeTransformData: any) => {
    return DataUtils.createMatrix4ByIndex(mat, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(transform.index));
}))

export var getPosition = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    _checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    return isValidMapValue(ThreeTransformData.positionCacheMap[transform.uid]);
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    return ThreeTransformData.positionCacheMap[transform.uid];
}, (transform:ThreeDTransform, ThreeTransformData: any, position:Vector3) => {
    ThreeTransformData.positionCacheMap[transform.uid] = position;
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    var indexInArrayBuffer = _getMatrix4DataIndexInArrayBuffer(transform.index),
        localToWorldMatrices = ThreeTransformData.localToWorldMatrices;

    return ThreeTransformData.tempPositionMap[transform.uid].set(localToWorldMatrices[indexInArrayBuffer + 12], localToWorldMatrices[indexInArrayBuffer + 13], localToWorldMatrices[indexInArrayBuffer + 14]);
}))

var _checkTransformShouldAlive = (transform:ThreeDTransform, ThreeTransformData: any) => {
    checkComponentShouldAlive(transform, ThreeTransformData, (transform:ThreeDTransform, ThreeTransformData: any) => {
        return isValidMapValue(ThreeTransformData.transformMap[transform.index]);
    });
}

var _getUID = requireCheckFunc ((indexInArrayBuffer:number, ThreeDTransformData:any) => {
    it("indexInArrayBuffer should exist", () => {
        expect(indexInArrayBuffer).exist;
    });
    it("transform should exist", () => {
        expect(ThreeDTransformData.transformMap[indexInArrayBuffer]).exist;
    });
}, (indexInArrayBuffer:number, ThreeDTransformData:any) => {
    return ThreeDTransformData.transformMap[indexInArrayBuffer].uid;
})

var _setTransformMap = curry((indexInArrayBuffer:number, transform:ThreeDTransform, ThreeDTransformData:any) => {
    ThreeDTransformData.transformMap[indexInArrayBuffer] = transform;

    return transform;
})

var _setPositionData = (indexInArrayBuffer:number, parent:ThreeDTransform, vec3IndexInArrayBuffer:number, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    if (_isParentExist(parent)) {
        let indexInArrayBuffer = parent.index;

        DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix({
            uid:_getUID(indexInArrayBuffer, ThreeDTransformData),
            index:indexInArrayBuffer
        }, GlobalTempData.matrix4_3, ThreeTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
}

export var setPosition = requireCheckFunc((transform:ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    _checkTransformShouldAlive(transform, ThreeTransformData);
}, (transform:ThreeDTransform, position: Vector3, GlobalTempData: any, ThreeTransformData: any) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid,
        parent = _getParent(uid, ThreeDTransformData),
        vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

    _setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);

    _setIsTranslate(uid, true, ThreeTransformData);

    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
})

var _setBatchTransformData = curry((batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeTransformData: any) => {
    for(let data of batchData) {
        let transform = data.transform,
            indexInArrayBuffer = transform.index,
            uid = transform.uid,
            parent = _getParent(uid, ThreeDTransformData),
            vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer),
            {position, localPosition} = data;

        if(localPosition){
            _setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeTransformData);
        }

        if(position){
            _setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeTransformData);
        }
    }

    return ThreeTransformData;
})

var _isTranslate = (data:BatchTransformData) => {
    return !!data.position || !!data.localPosition;
}

var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry((batchData:Array<BatchTransformData>, ThreeTransformData:any) => {
    var notDirtyIndexArr = [],
        firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    var _getNotDirtyIndex = (indexInArrayBuffer, uid, notDirtyIndexArr, isTranslate:boolean, ThreeDTransformData) => {
        if(isTranslate){
            _setIsTranslate(uid, true, ThreeDTransformData);
        }

        if (_isNotDirty(indexInArrayBuffer, firstDirtyIndex)) {
            notDirtyIndexArr.push(indexInArrayBuffer);

            firstDirtyIndex = _minusFirstDirtyIndex(firstDirtyIndex);
        }

        forEach(_getChildren(uid, ThreeDTransformData), (child: ThreeDTransform) => {
            _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate, ThreeDTransformData)
        })
    }

    for(let data of batchData){
        let transform = data.transform,
            indexInArrayBuffer = transform.index;

        _getNotDirtyIndex(indexInArrayBuffer, transform.uid, notDirtyIndexArr, _isTranslate(data), ThreeDTransformData);
    }

    return [notDirtyIndexArr, firstDirtyIndex];
});


var _addBatchToDirtyList = (ThreeTransformData: any, targetDirtyIndex:number, swapFunc:Function, moveToIndexFunc:Function, notDirtyIndexArr:Array<number>) => {
    for(let indexInArrayBuffer of notDirtyIndexArr){
        targetDirtyIndex = _minusFirstDirtyIndex(targetDirtyIndex);

        if (_isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
    }

    return targetDirtyIndex;
}

var _addBatchToDirtyListByChangeTypeArrData = curry((ThreeTransformData: any, targetDirtyIndex:number, notDirtyIndexArr:Array<number>) => {
    _addBatchToDirtyList(ThreeTransformData,targetDirtyIndex, _swapTypeArrData, _moveTypeArrDataToIndex, notDirtyIndexArr);

    return notDirtyIndexArr;
})


var _addBatchToDirtyListByChangeMapData = curry((ThreeTransformData: any, targetDirtyIndex:number, notDirtyIndexArr:Array<number>) => {
    return _addBatchToDirtyList(ThreeTransformData,targetDirtyIndex, _swapTransformMapData, (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
        _moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
        _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray);
    }, notDirtyIndexArr);
})


export var setBatchDatas = requireCheckFunc((batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeTransformData: any) => {
    for(let data of batchData) {
        _checkTransformShouldAlive(data.transform, ThreeTransformData);
    }
}, (batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeTransformData: any) => {
    compose(
        _addBatchToDirtyListByChangeMapData(ThreeTransformData, ThreeDTransformData.firstDirtyIndex),
        _addBatchToDirtyListByChangeTypeArrData(ThreeTransformData, ThreeDTransformData.firstDirtyIndex),
        ([noDirtyIndex, targetDirtyIndex]) => {
            ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

            return noDirtyIndex;
        },
        _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(batchData),
        _setBatchTransformData(batchData, GlobalTempData)
    )(ThreeTransformData);
})


export var getLocalPosition = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    _checkTransformShouldAlive(transform, ThreeTransformData);
}, cacheFunc((transform:ThreeDTransform, ThreeTransformData: any) => {
    return isValidMapValue(ThreeTransformData.localPositionCacheMap[transform.uid]);
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    return ThreeTransformData.localPositionCacheMap[transform.uid];
}, (transform:ThreeDTransform, ThreeTransformData: any, position:Vector3) => {
    ThreeTransformData.localPositionCacheMap[transform.uid] = position;
}, (transform:ThreeDTransform, ThreeTransformData: any) => {
    return DataUtils.createVector3ByIndex(ThreeTransformData.tempLocalPositionMap[transform.uid], ThreeDTransformData.localPositions, _getVector3DataIndexInArrayBuffer(transform.index));
}))

export var setLocalPosition = requireCheckFunc((transform:ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    _checkTransformShouldAlive(transform, ThreeTransformData);
}, (transform:ThreeDTransform, position: Vector3, ThreeTransformData: any) => {
    var indexInArrayBuffer = transform.index,
        uid = transform.uid,
        vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

    _setLocalPositionData(position, vec3IndexInArrayBuffer, ThreeTransformData);

    _setIsTranslate(uid, true, ThreeTransformData);

    return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, uid, ThreeTransformData);
})

export var update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    return compose(
        _cleanDirtyList(ThreeDTransformData),
        _updateDirtyList(GlobalTempData, ThreeDTransformData),
        _clearCache(ThreeDTransformData)
    )(state);
}

var _clearCache = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = ThreeDTransformData.count,
        positionCacheMap = ThreeDTransformData.positionCacheMap,
        localPositionCacheMap = ThreeDTransformData.localPositionCacheMap,
        localToWorldMatrixCacheMap = ThreeDTransformData.localToWorldMatrixCacheMap;

        // transforms = ThreeDTransformData.transforms;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let uid = _getUID(i, ThreeDTransformData),
            isTranslate = _getIsTranslate(uid, ThreeDTransformData);

        if(isTranslate){
            deleteVal(uid, positionCacheMap);
            deleteVal(uid, localPositionCacheMap);
            deleteVal(uid, localToWorldMatrixCacheMap);

            _setIsTranslate(uid, false, ThreeDTransformData);
        }

        //todo clean more cache!
    }
})

var _isNotChangeParent = (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
}

var _isIndexUsed = ensureFunc((isExist: boolean, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    // it("if(or not) exist data, the transform and its indexInArrayBuffer should be(or not) setted to data container;relation item should(or not) exist", () => {
    //     if (isExist) {
            // expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).true;
            // expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[indexInArrayBuffer], ThreeDTransformData)).equal(indexInArrayBuffer);
    //
    //         expect(_isRelationItemExist(ThreeDTransformData.relationMap[indexInArrayBuffer])).true;
    //     }
    //     else {
    //         // expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).false;
    //
    //         expect(_isRelationItemExist(ThreeDTransformData.relationMap[indexInArrayBuffer])).false;
    //     }
    // });
}, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return isValidMapValue(ThreeDTransformData.transformMap[indexInArrayBuffer]);
    // return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
})

// var _isRelationExist = (relationData: ThreeDTransform|void 0) => isUndefined(relationData);

// var _isRelationItemExist = (relationData: ThreeDTransformRelationData) => _isValidArrayValue(relationData);

// var _removeRelationParent = (relationMap: ThreeDTransformRelationData) => {
//     relationMap.parent = null;
// }

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
    }

    return targetDirtyIndex;
})

var _getNotUsedIndexFromArr = (ThreeDTransformData:any) => {
    var notUsedIndexArray = ThreeDTransformData.notUsedIndexArray,
        i = null;

    do{
        i = _getNotUsedIndex(notUsedIndexArray);
    }
    while(_isValidArrayValue(i) && _isIndexUsed(i, ThreeDTransformData))

    return i;
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
    var count = ThreeDTransformData.count;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let parent = _getParent(_getUID(i, ThreeDTransformData), ThreeDTransformData);

        if (_isParentExist(parent)) {
            let parentIndex = parent.index;

            if (parentIndex > i) {
                _swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
}

var _changeTypeArrData = (sourceIndex: number, targetIndex: number, changeFunc:(arr:Float32Array, sourceIndex:number, targetIndex:number, length:number) => void, ThreeDTransformData: any) => {
    if (sourceIndex === targetIndex) {
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

    changeFunc(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    changeFunc(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    changeFunc(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);

    return ThreeDTransformData;
}

var _changeMapData = (sourceIndex: number, targetIndex: number, changeFunc:(transformMap: TransformMap, sourceIndex: number, targetIndex: number) => void, ThreeDTransformData: any) => {
    if(sourceIndex === targetIndex){
        return ThreeDTransformData;
    }

    changeFunc(ThreeDTransformData.transformMap, sourceIndex, targetIndex);

    return ThreeDTransformData;
}

var _swap = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
    it("source index and target index should be used", () => {
        expect(_isIndexUsed(index1, ThreeDTransformData)).true;
        expect(_isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    _swapTypeArrData(index1, index2, ThreeDTransformData);
    _swapTransformMapData(index1, index2, ThreeDTransformData);

    return ThreeDTransformData;
})

var _swapTransformMapData = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
    it("source index and target index should be used", () => {
        expect(_isIndexUsed(index1, ThreeDTransformData)).true;
        expect(_isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    return _changeMapData(index1, index2, _swapTransformMap, ThreeDTransformData);
})

var _swapTypeArrData = (index1: number, index2: number, ThreeDTransformData: any) => {
    return _changeTypeArrData(index1, index2, _swapTypeArr, ThreeDTransformData);
}

// var _resetValInArr = (dataArr: Array<any>, index: number) => {
//     dataArr[index] = void 0;
// }

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

var _swapTypeArr = (dataArr: any, index1: number, index2: number, length: number) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = index1 + i,
            newIndex2 = index2 + i,
            temp = dataArr[newIndex2];

        dataArr[newIndex2] = dataArr[newIndex1];

        dataArr[newIndex1] = temp;
    }
}

var _swapTransformMap = (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => {
    var sourceTransform = transformMap[sourceIndex],
        targetTransform = transformMap[targetIndex];

    sourceTransform.index = targetIndex;
    targetTransform.index = sourceIndex;

    transformMap[targetIndex] = sourceTransform;
    transformMap[sourceIndex] = targetTransform;

    return ThreeDTransformData;
}

var _moveToTransformMap = (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => {
    var sourceTransform = transformMap[sourceIndex];

    sourceTransform.index = targetIndex;
    transformMap[targetIndex] = sourceTransform;

    deleteVal(sourceIndex, transformMap);

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
    _moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    _moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);

    _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray);

    return ThreeDTransformData;
}))

var _moveMapDataToIndex = ensureFunc((returnVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
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
    return _changeMapData(sourceIndex, targetIndex, _moveToTransformMap, ThreeDTransformData);
}))


var _moveTypeArrDataToIndex = (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
}


var _transform = (index: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var vec3Index = _getVector3DataIndexInArrayBuffer(index),
        quaIndex = _getQuaternionDataIndexInArrayBuffer(index),
        mat4Index = _getMatrix4DataIndexInArrayBuffer(index),
        mat = GlobalTempData.matrix4_2.setTRS(
            DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index),
            DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex),
            DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)
        ),
        parent = _getParent(_getUID(index, ThreeDTransformData), ThreeDTransformData);

    if (_isParentExist(parent)) {
        let parentIndex = parent.index;

        return _setLocalToWorldMatricesData(DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(parentIndex))
                .multiply(mat),
            mat4Index,
            ThreeDTransformData
        );
    }

    return _setLocalToWorldMatricesData(
        mat,
        mat4Index,
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

var _addItAndItsChildrenToDirtyList = (rootIndexInArrayBuffer: number, uid:number, ThreeDTransformData: any) => {
    var indexInArraybuffer: number = rootIndexInArrayBuffer;

    if (_isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
        _addToDirtyList(indexInArraybuffer, ThreeDTransformData);
    }

    forEach(_getChildren(uid, ThreeDTransformData), (child: ThreeDTransform) => {
        _addItAndItsChildrenToDirtyList(child.index, child.uid, ThreeDTransformData);
    });

    return ThreeDTransformData;
}

var _isValidArrayValue = (val: any) => {
    return isNotUndefined(val);
}

var _isParentExist = (parent:ThreeDTransform) => isNotUndefined(parent);

var _removeRelationFromParent = (parent: ThreeDTransform, targetUID: number, ThreeDTransformData:any) => {
    var parentUID = parent.uid,
        children = _getChildren(parentUID, ThreeDTransformData);

    deleteVal(targetUID, ThreeDTransformData.parentMap);

    if (!isValidMapValue(children)) {
        return;
    }

    _setChildren(parentUID, filter(children, (transform:ThreeDTransform) => {
        return transform.uid !== targetUID;
    }), ThreeDTransformData);
}

var _addToParent = requireCheckFunc((targetUID:number, target:ThreeDTransform, parent:ThreeDTransform, ThreeDTransformData: any) => {
    it("the child one should not has parent", () => {
        expect(isValidMapValue(_getParent(targetUID, ThreeDTransformData))).false;
    });
    it("parent should not already has the child", () => {
        var parentUID = parent.uid,
            children = _getChildren(parentUID, ThreeDTransformData);

        if(isValidMapValue(children)){
            expect(children.indexOf(target)).equal(-1);
        }
    });
},(targetUID:number, target:ThreeDTransform, parent:ThreeDTransform, ThreeDTransformData: any) => {
    var parentUID = parent.uid;

    _setParent(targetUID, parent, ThreeDTransformData);

    _addChild(parentUID, target, ThreeDTransformData);
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

var _disposeItemInDataContainer = curry((indexInArrayBuffer: number, uid:number, GlobalTempData: any, ThreeDTransformData: any) => {
    var mat = GlobalTempData.matrix4_1.setIdentity(),
        positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
        qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
        scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

    _setTransformDataInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData);

    _removeRelationData(uid, ThreeDTransformData);
    _disposeMapDatas(indexInArrayBuffer, uid, ThreeDTransformData);

    return ThreeDTransformData;
})

var _disposeMapDatas = (indexInArrayBuffer:number, uid:number, ThreeDTransformData:any) => {
    deleteVal(uid, ThreeDTransformData.isTranslateMap);
    deleteVal(uid, ThreeDTransformData.positionCacheMap);
    deleteVal(uid, ThreeDTransformData.localPositionCacheMap);
    deleteVal(uid, ThreeDTransformData.localToWorldMatrixCacheMap);
    deleteVal(uid, ThreeDTransformData.tempLocalToWorldMatrixMap);
    deleteVal(uid, ThreeDTransformData.tempPositionMap);
    deleteVal(uid, ThreeDTransformData.tempLocalPositionMap);
    deleteVal(indexInArrayBuffer, ThreeDTransformData.transformMap);
    deleteVal(uid, ThreeDTransformData.gameObjectMap);
}

var _removeRelationData = (uid:number, ThreeDTransformData: any) => {
    deleteVal(uid, ThreeDTransformData.childrenMap);

    let parent = _getParent(uid, ThreeDTransformData);

    if (_isParentExist(parent)) {
        _removeRelationFromParent(parent, uid, ThreeDTransformData);
    }
}

var _disposeFromNormalList = (indexInArrayBuffer: number, uid:number, GlobalTempData: any, ThreeDTransformData: any) => {
    _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray);

    return _disposeItemInDataContainer(indexInArrayBuffer, uid, GlobalTempData, ThreeDTransformData);
}


var _disposeFromDirtyList = (indexInArrayBuffer: number, uid:number, GlobalTempData: any, ThreeDTransformData: any) => {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;

    _swap(indexInArrayBuffer, firstDirtyIndex, ThreeDTransformData);

    return compose(
        (ThreeDTransformData) => {
            ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
        },
        _disposeItemInDataContainer(firstDirtyIndex, uid, GlobalTempData)
    )(ThreeDTransformData)
}

// var _forbiddenAccessTransformDataBeforeAddToEntityObject = (transform: ThreeDTransform, ThreeDTransformData:any) => {
//     it("should access transform data after added to gameObject", () => {
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

var _setLocalToWorldMatricesData = (mat: Matrix4, mat4IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
}

var _setLocalPositionData = (position: Vector3, vec3IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);

    return ThreeDTransformData;
}

var _setLocalRotationData = (qua: Quaternion, quaIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);

    return ThreeDTransformData;
}

var _setLocalScaleData = (scale: Vector3, vec3IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);

    return ThreeDTransformData;
}


var _setTransformDataInTypeArr = (indexInArrayBuffer: number, mat: Matrix4, qua: Quaternion, positionVec: Vector3, scaleVec: Vector3, ThreeDTransformData: any) => {
    _setLocalRotationData(qua, _getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    _setLocalPositionData(positionVec, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    _setLocalScaleData(scaleVec, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);

    _setLocalToWorldMatricesData(mat, _getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
}



var _addDefaultTransformData = (GlobalTempData: any, ThreeDTransformData: any) => {
    var count = ThreeDTransformData.count,
        mat = GlobalTempData.matrix4_1.setIdentity(),
        positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
        qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
        scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

    for (let i = _getStartIndexInArrayBuffer(); i < count; i++) {
        _setTransformDataInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData);
    }
}

export var getTempLocalToWorldMatrix = (transform:ThreeDTransform, ThreeDTransformData:any) => {
    return ThreeDTransformData.tempLocalToWorldMatrixMap[String(transform.uid)];
}

/*!
 regard 0 as the default index, so that _isValidIndex can judge whether the index is not the default index or not!
 */
var _getStartIndexInArrayBuffer = () => 1;

export var initData = (GlobalTempData: any, ThreeDTransformData: any) => {
    var buffer: ArrayBuffer = null,
        count = ThreeDTransformData.count,
        size = Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);

    ThreeDTransformData.buffer = new ArrayBuffer(count * size);

    buffer = ThreeDTransformData.buffer;

    ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * _getMatrix4DataSize());
    ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * _getMatrix4DataSize(), count * _getVector3DataSize());
    ThreeDTransformData.localRotations = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize()), count * _getQuaternionDataSize());
    ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize() + _getQuaternionDataSize()), count * _getVector3DataSize());


    ThreeDTransformData.notUsedIndexArray = [];


    ThreeDTransformData.parentMap = {};
    ThreeDTransformData.childrenMap = {};

    ThreeDTransformData.isTranslateMap = {};

    ThreeDTransformData.positionCacheMap = {};
    ThreeDTransformData.localPositionCacheMap = {};
    ThreeDTransformData.localToWorldMatrixCacheMap = {};

    ThreeDTransformData.tempPositionMap = {};
    ThreeDTransformData.tempLocalPositionMap = {};
    ThreeDTransformData.tempLocalToWorldMatrixMap = {};

    ThreeDTransformData.transformMap = {};

    ThreeDTransformData.gameObjectMap = {};

    ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
    ThreeDTransformData.indexInArrayBuffer = _getStartIndexInArrayBuffer();

    ThreeDTransformData.uid = 0;

    _addDefaultTransformData(GlobalTempData, ThreeDTransformData);
}
