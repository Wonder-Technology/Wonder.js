import { ThreeDTransformData } from "./ThreeDTransformData";
import { chain, compose, map } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import forEach from "wonder-lodash/forEach";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransform } from "./ThreeDTransform";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { Map } from "immutable";
import { expect } from "wonder-expect.js";
import { DataUtils, moveTo } from "../../utils/DataUtils";
import { isNotUndefined, isUndefined } from "../../utils/JudgeUtils";
import { Matrix4 } from "../../math/Matrix4";
import { Vector3 } from "../../math/Vector3";
import { Quaternion } from "../../math/Quaternion";

export var init = (GlobalTempData:any, ThreeDTransformData:any, state: Map<any, any>) => {
    return update(null, GlobalTempData, ThreeDTransformData, state);
}

var _getTransformIndexInArrayBufferTable = curry((transform: ThreeDTransform, ThreeDTransformData: any) => {
    return ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid];
})

var _setTransformIndexInArrayBufferTable = curry((transform: ThreeDTransform, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid] = indexInArrayBuffer;

        return ThreeDTransformData;
    });
})


var _setTransforms = curry((transform: ThreeDTransform, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        ThreeDTransformData.transforms[indexInArrayBuffer] = transform;

        return ThreeDTransformData;
    });
})

export var createIndexInArrayBuffer = (transform:ThreeDTransform, ThreeDTransformData) => {
    return IO.of(() => {
        var indexInArrayBuffer = _generateNotUsedIndexInArrayBuffer(ThreeDTransformData).run();

        return compose(
            chain(_setTransforms(transform, indexInArrayBuffer)),
            _setTransformIndexInArrayBufferTable(transform, indexInArrayBuffer)
        )(ThreeDTransformData).run();
    });
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
    //     var indexInArrayBuffer = _generateNotUsedIndexInArrayBuffer(ThreeDTransformData).run();
    //
    //     ThreeDTransformData.transformIndexInArrayBufferTable[transform.uid] = indexInArrayBuffer;
    //     // transform.indexInArrayBuffer = indexInArrayBuffer;
    //     ThreeDTransformData.transforms[indexInArrayBuffer] = transform;
    //
    //     _addSelfData(transform.indexInArrayBuffer, ThreeDTransformData).run();
    //     _addItAndItsChildrenToDirtyList(transform.indexInArrayBuffer, ThreeDTransformData).run();
    // });
}

export var disposeComponent = (transform: ThreeDTransform, GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData);

        if (_isNotDirty(indexInArrayBuffer, ThreeDTransformData.firstDirtyIndex)) {
            return _disposeFromNormalList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData).run();
        }

        return _disposeFromDirtyList(indexInArrayBuffer, GlobalTempData, ThreeDTransformData).run();
    });
}

export var getParent = requireCheckFunc((transform: ThreeDTransform, ThreeDTransformData: any) => {
    // _forbiddenAccessTransformDataBeforeAddToEntityObject(transform, ThreeDTransformData);
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var parentIndex:number = ThreeDTransformData.parents[_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData)],
        parent:ThreeDTransform = null;

    if(!_isValidIndex(parentIndex)){
        return null;
    }

    parent = ThreeDTransformData.transforms[parentIndex];

    if(!_isValidArrayValue(parent)){
        return null;
    }

    return parent;
})


export var setParent = requireCheckFunc((transform:ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData:any) => {
}, (transform:ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData:any) => {
    return IO.of(() => {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData),
            parentIndexInArrayBuffer:number = null,
            parents = ThreeDTransformData.parents,
            currentParentIndexInArrayBuffer = parents[indexInArrayBuffer],
            isCurrentParentExisit = _isValidIndex(currentParentIndexInArrayBuffer);

        if(parent === null){
            if(isCurrentParentExisit){
                _removeFromParent(indexInArrayBuffer, currentParentIndexInArrayBuffer, ThreeDTransformData).run();

                _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData).run();
            }

            return;
        }

        parentIndexInArrayBuffer = _getTransformIndexInArrayBufferTable(parent, ThreeDTransformData);

        if(isCurrentParentExisit){
            if(_isNotChangeParent(currentParentIndexInArrayBuffer, parentIndexInArrayBuffer)){
                return;
            }

            _removeFromParent(indexInArrayBuffer, currentParentIndexInArrayBuffer, ThreeDTransformData).run();
        }

        _addToParent(indexInArrayBuffer, parentIndexInArrayBuffer, ThreeDTransformData).run();

        _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData).run();
    });
})



//todo add cache
export var getLocalToWorldMatrix = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData:any) => {
    // _forbiddenAccessTransformDataBeforeAddToEntityObject(transform, ThreeDTransformData);
}, (transform:ThreeDTransform, ThreeTransformData:any) => {
    return DataUtils.createMatrix4ByIndex(Matrix4.create(), ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
})

export var getPosition = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData:any) => {
    // _forbiddenAccessTransformDataBeforeAddToEntityObject(transform, ThreeDTransformData);
},(transform:ThreeDTransform, ThreeTransformData:any) => {
    //todo optimize: directly get position data from arr
    // return getLocalToWorldMatrix(transform, GlobalTempData.matrix4_1).getTranslation();
    return getLocalToWorldMatrix(transform, ThreeTransformData).getTranslation();
})

export var setPosition = requireCheckFunc((transform:ThreeDTransform,  position:Vector3, GlobalTempData:any, ThreeTransformData:any) => {
    // _forbiddenAccessTransformDataBeforeAddToEntityObject(transform, ThreeDTransformData);
},(transform:ThreeDTransform,  position:Vector3, GlobalTempData:any, ThreeTransformData:any) => {
    return IO.of(() => {
        //todo optimize: directly set position data to arr
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData),
            parentIndex = ThreeDTransformData.parents[indexInArrayBuffer],
            vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData));

        if(_isValidIndex(parentIndex)){
            DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix(ThreeDTransformData.transforms[parentIndex], GlobalTempData.matrix4_1).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
        }
        else{
            DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
        }

        return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData).run();
    });
})

export var getLocalPosition = requireCheckFunc((transform:ThreeDTransform, ThreeTransformData:any) => {
    // _forbiddenAccessTransformDataBeforeAddToEntityObject(transform, ThreeDTransformData);
},(transform:ThreeDTransform, ThreeTransformData:any) => {
    //todo optimize: directly get position data from arr
    var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData);

    return DataUtils.createVector3ByIndex(Vector3.create(), ThreeDTransformData.localPositions, _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
})

export var setLocalPosition = requireCheckFunc((transform:ThreeDTransform, position:Vector3, ThreeTransformData:any) => {
    // _forbiddenAccessTransformDataBeforeAddToEntityObject(transform, ThreeDTransformData);
},(transform:ThreeDTransform, position:Vector3, ThreeTransformData:any) => {
    return IO.of(() => {
        //todo optimize: directly set position data to arr
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData),
            vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);

        return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData).run();
    });
})

export var update = (elapsed: number, GlobalTempData:any, ThreeDTransformData: any, state: Map<any, any>) => {
    return compose(chain(_cleanDirtyList(ThreeDTransformData)), _updateDirtyList(GlobalTempData, ThreeDTransformData))(state);
}

var _isNotChangeParent = (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
}

var _addDirtyIndex = ensureFunc((ThreeDTransformData: any) => {
}, curry((indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        ThreeDTransformData.firstDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData);
        _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray).run();

        return ThreeDTransformData.firstDirtyIndex;
    });
}))

var _addNotUsedIndex = requireCheckFunc((index: number, notUsedIndexArray:Array<number>) => {
    it("shouldn't contain the same index", () => {
        expect(notUsedIndexArray.indexOf(index)).equal(-1);
    });
}, curry((index: number, notUsedIndexArray:Array<number>) => {
    return IO.of(() => {
        notUsedIndexArray.push(index);
    });
}))

var _isExistData = ensureFunc((isExist:boolean, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("if exist data, the transform and its indexInArrayBuffer should be setted to data container", () => {
        if(isExist){
            expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).true;
            expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[indexInArrayBuffer], ThreeDTransformData)).equal(indexInArrayBuffer);
        }
    });
}, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
})

var _addToDirtyList = requireCheckFunc((indexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("firstDirtyIndex should <= count", () => {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        _addDirtyIndex(indexInArrayBuffer, ThreeDTransformData).run();

        let targetDirtyIndex = ThreeDTransformData.firstDirtyIndex;

        if(_isExistData(targetDirtyIndex, ThreeDTransformData)){
            _swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData).run();
        }
        else{
            _moveToIndex(indexInArrayBuffer, ThreeDTransformData, targetDirtyIndex).run();
        }

        return targetDirtyIndex;
    });

    // return compose(chain(_moveToIndex(indexInArrayBuffer, ThreeDTransformData)), _addDirtyIndex(indexInArrayBuffer))(ThreeDTransformData);
})

var _isNotDirty = (indexInArrayBuffer: number, firstDirtyIndex: number) => {
    return indexInArrayBuffer < firstDirtyIndex;
}

var _updateDirtyList = curry((GlobalTempData:any, ThreeDTransformData: any, state: Map<any, any>) => {
    return IO.of(() => {
        //todo test:ensure parent before child
        _sortParentBeforeChildInDirtyList(ThreeDTransformData).run();

        let count = ThreeDTransformData.count;

        for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            _transform(i, GlobalTempData, ThreeDTransformData).run();
        }

        return state;
    });
})

var _sortParentBeforeChildInDirtyList = (ThreeDTransformData: any) => {
    return IO.of(() => {
        var parents = ThreeDTransformData.parents,
            count = ThreeDTransformData.count;

        for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            let parentIndex = parents[i];

            if (parentIndex > i) {
                _swap(parentIndex, i, ThreeDTransformData).run();
            }
        }
    });
}

var _swapIndexInRelationDataArr = requireCheckFunc((index1:number, index2:number, relationDataArr:Float32Array) => {
    it("the two ones should not point to each other", () => {
        expect(relationDataArr[index1] === index2 && relationDataArr[index2] === index1).false;
    });
}, (index1:number, index2:number, relationDataArr:Float32Array) => {
    return IO.of(() => {
        if(relationDataArr[index1] === index2){
            relationDataArr[index1] = relationDataArr[index2];
            relationDataArr[index2] = index1;
        }
        else if(relationDataArr[index2] === index1){
            relationDataArr[index2] = relationDataArr[index1];
            relationDataArr[index1] = index2;
        }
        else{
            DataUtils.swap(relationDataArr, index1, index2, 1);
        }
    });
})

var _swap = curry((index1: number, index2: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(index1),
            mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(index2),
            mat4Size = _getMatrix4DataSize(),
            vec3SourceIndex = _getVector3DataIndexInArrayBuffer(index1),
            vec3TargetIndex = _getVector3DataIndexInArrayBuffer(index2),
            vec3Size = _getVector3DataSize(),
            quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(index1),
            quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(index2),
            quaSize = _getQuaternionDataSize();

        compose(
            chain(_setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index2], index1)),
            _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index1], index2)
        )(ThreeDTransformData).run();

        forEach([
            _swapIndexInRelationDataArr(index1, index2, ThreeDTransformData.parents),
            _swapIndexInRelationDataArr(index1, index2, ThreeDTransformData.firstChildren),
            _swapIndexInRelationDataArr(index1, index2, ThreeDTransformData.nextSiblings)
        ], (io:IO) => {
            io.run();
        });

        DataUtils.swap(ThreeDTransformData.transforms, index1, index2, 1);

        DataUtils.swap(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
        DataUtils.swap(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
        DataUtils.swap(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
        DataUtils.swap(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);

        return ThreeDTransformData;
    });
})

var _resetIndexInTypeArr = (dataArr:Uint16Array, index:number) => {
    return IO.of(() => {
        dataArr[index] = 0;
    });
}

var _resetFloatValInTypeArr = (dataArr:Float32Array, index:number) => {
    return IO.of(() => {
        dataArr[index] = 0;
    });
}

var _resetValInArr = (dataArr:Array<any>, index:number) => {
    return IO.of(() => {
        dataArr[index] = void 0;
    });
}

var _moveToIndex = requireCheckFunc((sourceIndex: number, ThreeDTransformData: any, targetIndex: number) => {
    it("source index should be used", () => {
        expect(_isExistData(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", () => {
        expect(_isExistData(targetIndex, ThreeDTransformData)).false;
    });
}, curry((sourceIndex: number, ThreeDTransformData: any, targetIndex: number) => {
    return IO.of(() => {
        var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(sourceIndex),
            mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(targetIndex),
            mat4Size = _getMatrix4DataSize(),
            vec3SourceIndex = _getVector3DataIndexInArrayBuffer(sourceIndex),
            vec3TargetIndex = _getVector3DataIndexInArrayBuffer(targetIndex),
            vec3Size = _getVector3DataSize(),
            quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(sourceIndex),
            quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(targetIndex),
            quaSize = _getQuaternionDataSize();

        // compose(
        //     chain(moveTo(ThreeDTransformData.localScales, sourceIndex, targetIndex, vec3Size, _resetFloatValInTypeArr)),
        //     chain(moveTo(ThreeDTransformData.localRotations, sourceIndex, targetIndex, quaSize, _resetFloatValInTypeArr)),
        //     chain(moveTo(ThreeDTransformData.localPositions, sourceIndex, targetIndex, vec3Size, _resetFloatValInTypeArr)),
        //     chain(moveTo(ThreeDTransformData.localToWorldMatrices, sourceIndex, targetIndex, 16, _resetFloatValInTypeArr)),
        //     chain(moveTo(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1, _resetValInArr)),
        //     chain(moveTo(ThreeDTransformData.nextSiblings, sourceIndex, targetIndex, 1, _resetIndexInTypeArr)),
        //     chain(moveTo(ThreeDTransformData.firstChildren, sourceIndex, targetIndex, 1, _resetIndexInTypeArr)),
        //     chain(moveTo(ThreeDTransformData.parents, sourceIndex, targetIndex, 1, _resetIndexInTypeArr)),
        //     _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex)
        // )(ThreeDTransformData).run();

        compose(
            chain(moveTo(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1, _resetValInArr)),
            chain(moveTo(ThreeDTransformData.nextSiblings, sourceIndex, targetIndex, 1, _resetIndexInTypeArr)),
            chain(moveTo(ThreeDTransformData.firstChildren, sourceIndex, targetIndex, 1, _resetIndexInTypeArr)),
            chain(moveTo(ThreeDTransformData.parents, sourceIndex, targetIndex, 1, _resetIndexInTypeArr)),
            _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex)
        )(ThreeDTransformData).run();

        return targetIndex;
    });
}))

var _transform = (index: number, GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        var vec3Index = _getVector3DataIndexInArrayBuffer(index),
            quaIndex = _getQuaternionDataIndexInArrayBuffer(index),
            mat = GlobalTempData.matrix4_2.setTRS(
                DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index),
                DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex),
                DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)
            ),
            parentIndex = ThreeDTransformData.parents[index];

        if(_isValidIndex(parentIndex)){
            return _setLocalToWorldMatricesData(DataUtils.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(parentIndex))
                    .multiply(mat),
                index,
                ThreeDTransformData
            ).run();
        }

        return _setLocalToWorldMatricesData(
            mat,
            index,
            ThreeDTransformData
        ).run();
    });
}

//todo optimize: if transform not transformed in 5 frames, not move off
var _cleanDirtyList = curry((ThreeDTransformData: any, state: Map<any, any>) => {
    return IO.of(() => {
        var count = ThreeDTransformData.count;

        for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            if (_needMoveOffDirtyList(i)) {
                _moveFromDirtyListToNormalList(i, ThreeDTransformData).run();
            }
        }

        return state;
    });
})

var _needMoveOffDirtyList = (index: number) => {
    return true;
}

var _moveFromDirtyListToNormalList = (index: number, ThreeDTransformData: any) => {
    // return _swap(index, ThreeDTransformData.firstDirtyIndex, ThreeDTransformData).run()

    return compose(
        map((ThreeDTransformData) => {
            ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
        }),
        // _moveToIndex(index, ThreeDTransformData, _generateNotUsedIndexInNormalList(ThreeDTransformData).run())
        _swap(index, ThreeDTransformData.firstDirtyIndex)
    )(ThreeDTransformData)
}


var _generateNotUsedIndexInArrayBuffer = ensureFunc((indexInArrayBufferIO: IO, ThreeDTransformData: any) => {
    var indexInArrayBuffer = indexInArrayBufferIO.run();

    it("indexInArrayBuffer should < firstDirtyIndex", () => {
        expect(indexInArrayBuffer).exist;
        expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
}, (ThreeDTransformData: any) => {
    return IO.of(() => {
        var result = ThreeDTransformData.indexInArrayBuffer;

        if (result >= ThreeDTransformData.firstDirtyIndex) {
            return ThreeDTransformData.notUsedIndexArray.pop();
        }

        ThreeDTransformData.indexInArrayBuffer += 1;

        return result;
    });
})

var _generateNotUsedIndexInNormalList = ensureFunc((indexInArrayBufferIO: IO, ThreeDTransformData: any) => {
    var indexInArrayBuffer = indexInArrayBufferIO.run();

    it("indexInArrayBuffer should < firstDirtyIndex", () => {
        expect(indexInArrayBuffer).exist;
        expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
    });
}, (ThreeDTransformData: any) => {
    return IO.of(() => {
        var index = ThreeDTransformData.notUsedIndexArray.pop();

        if (_isValidArrayValue(index)) {
            return index;
        }

        index = ThreeDTransformData.indexInArrayBuffer;

        ThreeDTransformData.indexInArrayBuffer += 1;

        return index;
    });
})

var _addItAndItsChildrenToDirtyList = curry((rootIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        var indexInArraybuffer:number = rootIndexInArrayBuffer;

        if (_isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
            indexInArraybuffer = _addToDirtyList(indexInArraybuffer, ThreeDTransformData).run();
        }

        let index = ThreeDTransformData.firstChildren[indexInArraybuffer];

        while(_isValidIndex(index)){
            _addItAndItsChildrenToDirtyList(index, ThreeDTransformData).run();
            index = ThreeDTransformData.nextSiblings[index];
        }

        return ThreeDTransformData;
    });
})

var _isValidTableValue = (val:any) => {
    return isNotUndefined(val);
}

var _isValidArrayValue = (val:any) => {
    return isNotUndefined(val);
}

var _isValidIndex = requireCheckFunc((index:number) => {
    it("index should be number", () => {
        expect(index).be.a("number");
    });
}, (index:number) => {
    return index !== 0;
})

var _removeFromParent = (indexInArrayBuffer: number, parentIndexInArrayBuffer: number, ThreeDTransformData:any) => {
    return IO.of(() => {
        var nextSiblingIndex = ThreeDTransformData.nextSiblings[indexInArrayBuffer],
            isNextSiblingExist:boolean = null,
            prevSiblingIndex: number = null;

        DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.parents, indexInArrayBuffer, _resetIndexInTypeArr);

        isNextSiblingExist = _isValidIndex(nextSiblingIndex);

        prevSiblingIndex = _findPrevSiblingIndex(ThreeDTransformData.firstChildren[parentIndexInArrayBuffer], indexInArrayBuffer, ThreeDTransformData);

        if (prevSiblingIndex !== null) {
            if(isNextSiblingExist){
                ThreeDTransformData.nextSiblings[prevSiblingIndex] = nextSiblingIndex;
            }
            else{
                DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.nextSiblings, prevSiblingIndex, _resetIndexInTypeArr);
            }
        }
        else{
            if (isNextSiblingExist) {
                ThreeDTransformData.firstChildren[parentIndexInArrayBuffer] = nextSiblingIndex;
            }
            else{
                DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.firstChildren, parentIndexInArrayBuffer, _resetIndexInTypeArr);
            }
        }

        if (isNextSiblingExist) {
            DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.nextSiblings, indexInArrayBuffer, _resetIndexInTypeArr);
        }
    });
}


// function _findPrevSiblingIndex(indexInArrayBuffer: number, parentIndexInArrayBuffer: number, ThreeDTransformData:any):number;
// function _findPrevSiblingIndex(firstChildIndex:number, indexInArrayBuffer: number, parentIndexInArrayBuffer: number, ThreeDTransformData:any):number;

// function _findPrevSiblingIndex(...args) {
//     var firstChildIndex = null,
//         indexInArrayBuffer: number = null,
//         parentIndexInArrayBuffer: number = null,
//         ThreeDTransformData:any = null;
//     var _find = (firstChildIndex:number, indexInArrayBuffer: number, ThreeDTransformData:any) => {
//         let nextSiblingIndex = firstChildIndex,
//             prevSiblingIndex: number = null;
//
//         while (nextSiblingIndex !== indexInArrayBuffer) {
//             prevSiblingIndex = nextSiblingIndex;
//             nextSiblingIndex = ThreeDTransformData.nextSiblings[nextSiblingIndex];
//         }
//
//         return prevSiblingIndex;
//     }
//
//     if(args.length === 3){
//         indexInArrayBuffer = args[0];
//         parentIndexInArrayBuffer = args[1];
//         ThreeDTransformData = args[2];
//
//         firstChildIndex = ThreeDTransformData.firstChildren[parentIndexInArrayBuffer];
//
//         if (_isValidIndex(firstChildIndex)) {
//             return _find(firstChildIndex, indexInArrayBuffer, parentIndexInArrayBuffer, ThreeDTransformData);
//         }
//
//         return null;
//     }
//     else{
//         firstChildIndex = args[0];
//         indexInArrayBuffer = args[1];
//         parentIndexInArrayBuffer = args[2];
//         ThreeDTransformData = args[3];
//
//         return _find(firstChildIndex, indexInArrayBuffer, parentIndexInArrayBuffer, ThreeDTransformData);
//     }
// }

var _findPrevSiblingIndex = (firstChildIndex:number, indexInArrayBuffer: number, ThreeDTransformData:any) => {
    let nextSiblingIndex = firstChildIndex,
        prevSiblingIndex: number = null;

    while (_isValidIndex(nextSiblingIndex) && nextSiblingIndex !== indexInArrayBuffer) {
        prevSiblingIndex = nextSiblingIndex;
        nextSiblingIndex = ThreeDTransformData.nextSiblings[nextSiblingIndex];
    }

    return prevSiblingIndex;
}



var _addToParent = requireCheckFunc((indexInArrayBuffer: number, parentIndexInArrayBuffer: number, ThreeDTransformData:any) => {
    it("the child one should not has parent", () => {
        expect(_isValidIndex(ThreeDTransformData.parents[indexInArrayBuffer])).false;
    });
    it("if firstChild of the parent one not exist, next sibling of the child one should not exist", () => {
        var firstChildIndex = ThreeDTransformData.firstChildren[parentIndexInArrayBuffer];

        if (!_isValidIndex(firstChildIndex)) {
            expect(_isValidIndex(ThreeDTransformData.nextSiblings[indexInArrayBuffer])).false;
        }
    });
    it("if firstChild of the parent one not exist, prev sibling of the child one should exist", () => {
        var firstChildIndex = ThreeDTransformData.firstChildren[parentIndexInArrayBuffer];

        if (_isValidIndex(firstChildIndex)) {
            expect(_findPrevSiblingIndex(firstChildIndex, indexInArrayBuffer, ThreeDTransformData)).not.null;
        }
    });
},(indexInArrayBuffer: number, parentIndexInArrayBuffer: number, ThreeDTransformData:any) => {
    return IO.of(() => {
        var firstChildIndex = ThreeDTransformData.firstChildren[parentIndexInArrayBuffer];

        ThreeDTransformData.parents[indexInArrayBuffer] = parentIndexInArrayBuffer;

        if (!_isValidIndex(firstChildIndex)) {
            ThreeDTransformData.firstChildren[parentIndexInArrayBuffer] = indexInArrayBuffer;

            return;
        }

        // let nextSiblings = ThreeDTransformData.nextSiblings,
        //     nextSibling: number = firstChild,
        //     lastNextSibling: number = null;
        //
        // do {
        //     lastNextSibling = nextSibling;
        //     nextSibling = nextSiblings[nextSibling];
        // }
        // while (_isValidIndex(nextSibling));

        let prevSiblingIndex = _findPrevSiblingIndex(firstChildIndex, indexInArrayBuffer, ThreeDTransformData);

        ThreeDTransformData.nextSiblings[prevSiblingIndex] = indexInArrayBuffer;
    });
})

var _addFirstDirtyIndex = ensureFunc((firstDirtyIndex:number) => {
    it("firstDirtyIndex should <= count", () => {
        expect(firstDirtyIndex).lte(ThreeDTransformData.count);
    });
}, (ThreeDTransformData:any) => {
    return ThreeDTransformData.firstDirtyIndex + 1;
})

var _minusFirstDirtyIndex = ensureFunc((firstDirtyIndex:number) => {
    it(`firstDirtyIndex should >= start index:${_getStartIndexInArrayBuffer()}`, () => {
        expect(firstDirtyIndex).gte(_getStartIndexInArrayBuffer());
    });
}, (ThreeDTransformData:any) => {
    return ThreeDTransformData.firstDirtyIndex - 1;
})

var _disposeItemInDataContainer = curry((indexInArrayBuffer: number, GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        var mat = GlobalTempData.matrix4_1.setIdentity(),
            positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
            qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
            scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

        _setTransformItemInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData).run();

        DataUtils.removeItemInArray(ThreeDTransformData.transforms, indexInArrayBuffer);

        DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.parents, indexInArrayBuffer, _resetIndexInTypeArr);
        DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.firstChildren, indexInArrayBuffer, _resetIndexInTypeArr);
        DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.nextSiblings, indexInArrayBuffer, _resetIndexInTypeArr);

        return ThreeDTransformData;
    });
})

var _disposeFromNormalList = (indexInArrayBuffer: number, GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray).run();

        return _disposeItemInDataContainer(indexInArrayBuffer, GlobalTempData, ThreeDTransformData).run();
    });
}


var _disposeFromDirtyList = (indexInArrayBuffer: number, GlobalTempData:any, ThreeDTransformData: any) => {
    var firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;

    return compose(
        map((ThreeDTransformData) => {
            ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
        }),
        chain(_disposeItemInDataContainer(firstDirtyIndex, GlobalTempData)),
        _swap(indexInArrayBuffer, firstDirtyIndex)
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

var _getMatrix4DataIndexInArrayBuffer = (indexInArrayBuffer:number) => indexInArrayBuffer * _getMatrix4DataSize();

var _getVector3DataIndexInArrayBuffer = (indexInArrayBuffer:number) => indexInArrayBuffer * _getVector3DataSize();

var _getQuaternionDataIndexInArrayBuffer = (indexInArrayBuffer:number) => indexInArrayBuffer * _getQuaternionDataSize();

var _setLocalToWorldMatricesData = curry((mat:Matrix4, indexInArrayBuffer:number, ThreeDTransformData: any) => {
    return IO.of(() => {
        DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, _getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer));
    });
})

var _setLocalPositionData = curry((pos:Vector3, indexInArrayBuffer:number, ThreeDTransformData: any) => {
    return IO.of(() => {
        DataUtils.setVectors(ThreeDTransformData.localPositions, pos, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer));

        return ThreeDTransformData;
    });
})

var _setLocalRotationData = curry((qua:Quaternion, indexInArrayBuffer:number, ThreeDTransformData: any) => {
    return IO.of(() => {
        DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, _getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer));

        return ThreeDTransformData;
    });
})

var _setLocalScaleData = curry((scale:Vector3, indexInArrayBuffer:number, ThreeDTransformData: any) => {
    return IO.of(() => {
        DataUtils.setVectors(ThreeDTransformData.localScales, scale, _getVector3DataIndexInArrayBuffer(indexInArrayBuffer));

        return ThreeDTransformData;
    });
})


var _setTransformItemInTypeArr = (indexInArrayBuffer:number, mat:Matrix4, qua:Quaternion, positionVec:Vector3, scaleVec:Vector3, ThreeDTransformData:any) => compose(
    chain(_setLocalToWorldMatricesData(mat, indexInArrayBuffer)),
    chain(_setLocalRotationData(qua, indexInArrayBuffer)),
    chain(_setLocalPositionData(positionVec, indexInArrayBuffer)),
    _setLocalScaleData(scaleVec, indexInArrayBuffer)
)(ThreeDTransformData);



var _addDefaultTransformData = (GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        var count = ThreeDTransformData.count,
            mat = GlobalTempData.matrix4_1.setIdentity(),
            positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
            qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
            scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

        for(let i = _getStartIndexInArrayBuffer(); i < count; i++){
            // ThreeDTransformData.parents[i] =-1;
            // ThreeDTransformData.firstChildren[i] = -1;
            // ThreeDTransformData.nextSiblings[i] = -1;

            _setTransformItemInTypeArr(i, mat, qua, positionVec, scaleVec, ThreeDTransformData).run();
        }
    });
}

/*!
regard 0 as the default index, so that _isValidIndex can judge whether the index is not the default index or not!
 */
var _getStartIndexInArrayBuffer = () => 1;

export var initData = (GlobalTempData:any, ThreeDTransformData:any) => {
    return IO.of(() => {
        var buffer:ArrayBuffer = null,
            count = ThreeDTransformData.count;

        ThreeDTransformData.size = Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * (16 + 3 + 4 + 3);
        ThreeDTransformData.buffer = new ArrayBuffer(count * ThreeDTransformData.size);

        buffer = ThreeDTransformData.buffer;

        ThreeDTransformData.parents = new Uint16Array(buffer, 0, count);
        ThreeDTransformData.firstChildren = new Uint16Array(buffer, count * Uint16Array.BYTES_PER_ELEMENT, count);
        ThreeDTransformData.nextSiblings = new Uint16Array(buffer, count * Uint16Array.BYTES_PER_ELEMENT * 2, count);

        ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, count * Uint16Array.BYTES_PER_ELEMENT * 3, count * _getMatrix4DataSize());
        ThreeDTransformData.localPositions = new Float32Array(buffer, count * (Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * _getMatrix4DataSize()), count * _getVector3DataSize());
        ThreeDTransformData.localRotations = new Float32Array(buffer, count * (Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize())), count * _getQuaternionDataSize());
        ThreeDTransformData.localScales = new Float32Array(buffer, count * (Uint16Array.BYTES_PER_ELEMENT * 3 + Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize() + _getQuaternionDataSize())), count * _getVector3DataSize());


        ThreeDTransformData.transforms = [];
        ThreeDTransformData.transformIndexInArrayBufferTable = {};
        ThreeDTransformData.notUsedIndexArray = [];

        ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
        ThreeDTransformData.indexInArrayBuffer = _getStartIndexInArrayBuffer();

        _addDefaultTransformData(GlobalTempData, ThreeDTransformData).run();
    });
}
