import { ThreeDTransformData, ThreeDTransformRelationData } from "./ThreeDTransformData";
import { chain, compose, map } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import forEach from "wonder-lodash/forEach";
import filter from "wonder-lodash/filter";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { ThreeDTransform } from "./ThreeDTransform";
import { IO } from "wonder-fantasy-land/dist/es2015/types/IO";
import { Map } from "immutable";
import { expect } from "wonder-expect.js";
import { DataUtils, moveTo } from "../../utils/DataUtils";
import { isNotUndefined } from "../../utils/JudgeUtils";
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
}, (transform: ThreeDTransform, ThreeDTransformData: any) => {
    var relationData = ThreeDTransformData.relations[_getTransformIndexInArrayBufferTable(transform, ThreeDTransformData)];

    if(_isRelationItemExist(relationData)){
        return relationData.parent;
    }

    return null;
})

var _getRelationData = (relationData:ThreeDTransformRelationData, dataName:string) => {
    if(!_isRelationItemExist(relationData)){
        return null;
    }

    let data = relationData[dataName];

    return _isRelationDataExist(data) ? data : null;
}

var _getOrSetRelationItem = (indexInArrayBuffer:number, relations:Array<ThreeDTransformRelationData>) => {
    return IO.of(() => {
        var data = relations[indexInArrayBuffer];

        if(!_isRelationItemExist(data)){
            data = _createEmptyRelationItem(indexInArrayBuffer);

            relations[indexInArrayBuffer] = data;

            return data;
        }

        return data;
    });
}

export var setParent = (transform:ThreeDTransform, parent: ThreeDTransform, ThreeDTransformData:any) => {
    return IO.of(() => {
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeDTransformData),
            parentIndexInArrayBuffer:number = null,
            relationData = _getOrSetRelationItem(indexInArrayBuffer, ThreeDTransformData.relations).run(),
            currentParent = relationData.parent,
            isCurrentParentExisit = _isRelationDataExist(currentParent);

        if(parent === null){
            if(isCurrentParentExisit){
                _removeRelationItemFromParent(currentParent, relationData).run();

                _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData).run();
            }

            return;
        }

        parentIndexInArrayBuffer = _getTransformIndexInArrayBufferTable(parent, ThreeDTransformData);

        if(isCurrentParentExisit){
            if(_isNotChangeParent(currentParent.indexInArrayBuffer, parentIndexInArrayBuffer)){
                return;
            }

            _removeRelationItemFromParent(currentParent, relationData).run();
        }

        _addToParent(relationData, parentIndexInArrayBuffer, ThreeDTransformData).run();

        _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeDTransformData).run();
    });
}

var _createEmptyRelationItem = (indexInArrayBuffer:number) => {
    var data = ThreeDTransformRelationData.create();

    data.indexInArrayBuffer = indexInArrayBuffer;

    return data;
}

//todo add cache
export var getLocalToWorldMatrix = (transform:ThreeDTransform, ThreeTransformData:any) => {
    return DataUtils.createMatrix4ByIndex(Matrix4.create(), ThreeDTransformData.localToWorldMatrices, _getMatrix4DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
}

export var getPosition = (transform:ThreeDTransform, ThreeTransformData:any) => {
    //todo optimize: directly get position data from arr
    // return getLocalToWorldMatrix(transform, GlobalTempData.matrix4_1).getTranslation();
    return getLocalToWorldMatrix(transform, ThreeTransformData).getTranslation();
}

export var setPosition = (transform:ThreeDTransform,  position:Vector3, GlobalTempData:any, ThreeTransformData:any) => {
    return IO.of(() => {
        //todo optimize: directly set position data to arr
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData),
            parent:ThreeDTransformRelationData = _getRelationData(ThreeDTransformData.relations[indexInArrayBuffer], "parent"),
            vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData));

        if(_isRelationDataExist(parent)){
            DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix(ThreeDTransformData.transforms[parent.indexInArrayBuffer], ThreeTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
        }
        else{
            DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
        }

        return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData).run();
    });
}

export var getLocalPosition = (transform:ThreeDTransform, ThreeTransformData:any) => {
    //todo optimize: directly get position data from arr

    return DataUtils.createVector3ByIndex(Vector3.create(), ThreeDTransformData.localPositions, _getVector3DataIndexInArrayBuffer(_getTransformIndexInArrayBufferTable(transform, ThreeTransformData)));
}

export var setLocalPosition = (transform:ThreeDTransform, position:Vector3, ThreeTransformData:any) => {
    return IO.of(() => {
        //todo optimize: directly set position data to arr
        var indexInArrayBuffer = _getTransformIndexInArrayBufferTable(transform, ThreeTransformData),
            vec3IndexInArrayBuffer = _getVector3DataIndexInArrayBuffer(indexInArrayBuffer);

        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);

        return _addItAndItsChildrenToDirtyList(indexInArrayBuffer, ThreeTransformData).run();
    });
}

export var update = (elapsed: number, GlobalTempData:any, ThreeDTransformData: any, state: Map<any, any>) => {
    return compose(chain(_cleanDirtyList(ThreeDTransformData)), _updateDirtyList(GlobalTempData, ThreeDTransformData))(state);
}

var _isNotChangeParent = (currentParentIndexInArrayBuffer: number, newParentIndexInArrayBuffer: number) => {
    return currentParentIndexInArrayBuffer === newParentIndexInArrayBuffer;
}

// var _addDirtyIndex = curry((indexInArrayBuffer: number, ThreeDTransformData: any) => {
//     return IO.of(() => {
//         ThreeDTransformData.firstDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData);
//         _addNotUsedIndex(indexInArrayBuffer, ThreeDTransformData.notUsedIndexArray).run();
//
//         return ThreeDTransformData.firstDirtyIndex;
//     });
// })

var _addNotUsedIndex = curry((index: number, notUsedIndexArray:Array<number>) => {
    return IO.of(requireCheckFunc(() => {
        it("shouldn't contain the same index", () => {
            expect(notUsedIndexArray.indexOf(index)).equal(-1);
        });
    }, () => {
        notUsedIndexArray.push(index);
    }));
});

var _isIndexUsed = ensureFunc((isExist:boolean, indexInArrayBuffer: number, ThreeDTransformData: any) => {
    it("if(or not) exist data, the transform and its indexInArrayBuffer should be(or not) setted to data container;relation item should(or not) exist", () => {
        if(isExist){
            expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).true;
            expect(_getTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[indexInArrayBuffer], ThreeDTransformData)).equal(indexInArrayBuffer);

            expect(_isRelationItemExist(ThreeDTransformData.relations[indexInArrayBuffer])).true;
        }
        else{
            expect(_isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer])).false;

            expect(_isRelationItemExist(ThreeDTransformData.relations[indexInArrayBuffer])).false;
        }
    });
}, (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return _isValidArrayValue(ThreeDTransformData.transforms[indexInArrayBuffer]);
})

var _isRelationDataExist = (relationData:ThreeDTransformRelationData|Array<ThreeDTransformRelationData>) => relationData !== null;

var _isRelationItemExist = (relationData:ThreeDTransformRelationData) => _isValidArrayValue(relationData);

var _removeRelationParent = (relations:ThreeDTransformRelationData) => {
    return IO.of(() => {
        relations.parent = null;
    });
}

var _addToDirtyList = (indexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(requireCheckFunc(() => {
        it("firstDirtyIndex should <= count", () => {
            expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.count);
        });
    }, () => {
        // let targetDirtyIndex = _addDirtyIndex(indexInArrayBuffer, ThreeDTransformData).run();
        //
        let targetDirtyIndex = _minusFirstDirtyIndex(ThreeDTransformData.firstDirtyIndex);

        ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

        if(_isIndexUsed(targetDirtyIndex, ThreeDTransformData)){
            _swap(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData).run();
        }
        else{
            _moveToIndex(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData).run();

            if(_isIndexCollectedToNotUsed(targetDirtyIndex, ThreeDTransformData)){
                ThreeDTransformData.notUsedIndexArray = _removeIndexInNotUsedArr(targetDirtyIndex, ThreeDTransformData);
            }
        }

        return targetDirtyIndex;
    }));
}

var _isIndexCollectedToNotUsed = (indexInArrayBuffer:number, ThreeDTransformData:any) => {
    return ThreeDTransformData.notUsedIndexArray.indexOf(indexInArrayBuffer) > -1;
}

var _removeIndexInNotUsedArr = requireCheckFunc ((indexInArrayBuffer:number, ThreeDTransformData:any) => {
    it("target index should in inNotUsed arr", () => {
        expect(_isIndexCollectedToNotUsed(indexInArrayBuffer, ThreeDTransformData)).true;
    });
}, (indexInArrayBuffer:number, ThreeDTransformData:any) => {
    return filter(ThreeDTransformData.notUsedIndexArray, (notUsedIndex:number) => {
        return notUsedIndex !== indexInArrayBuffer;
    })
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
        var relations = ThreeDTransformData.relations,
            count = ThreeDTransformData.count;

        for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
            let parent = relations[i].parent;

            if(_isRelationDataExist(parent)){
                let parentIndex = parent.indexInArrayBuffer;

                if (parentIndex > i) {
                    _swap(parentIndex, i, ThreeDTransformData).run();
                }
            }
        }
    });
}


var _moveRelationItemTo = curry((sourceIndex:number, targetIndex:number, ThreeDTransformData:any) => {
    return IO.of(ensureFunc(() => {
        it("source relation item should be removed", () => {
            expect(_isValidArrayValue(ThreeDTransformData.relations[sourceIndex])).false;
        });
    }, requireCheckFunc(() => {
        it("source relation should exist", () => {
            expect(_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])).true;
        });
        it("target relation should not exist", () => {
            expect(_isRelationItemExist(ThreeDTransformData.relations[targetIndex])).false;
        });
    }, () => {
        var dataArr = ThreeDTransformData.relations;

        dataArr[targetIndex] = dataArr[sourceIndex];
        dataArr[targetIndex].indexInArrayBuffer = targetIndex;

        _resetValInArr(dataArr, sourceIndex).run();

        return ThreeDTransformData;
    })))
})

var _swapIndexInRelationItemArr = (index1:number, index2:number, relationDataArr:Array<ThreeDTransformRelationData>) => {
    return IO.of(requireCheckFunc(() => {
        it("the two ones should not point to each other", () => {
            expect(relationDataArr[index1].indexInArrayBuffer === index2 && relationDataArr[index2].indexInArrayBuffer === index1).false;
        });
    }, () => {
        _swapRelationItemIndex(relationDataArr, index1, index2).run();

        DataUtils.swap(relationDataArr, index1, index2, 1);
    }))
}

var _swapRelationItemIndex = (relationDataArr:Array<ThreeDTransformRelationData>, index1: number, index2:number) => {
    return IO.of(() => {
        let temp  = relationDataArr[index1].indexInArrayBuffer;

        relationDataArr[index1].indexInArrayBuffer = relationDataArr[index2].indexInArrayBuffer;


        relationDataArr[index2].indexInArrayBuffer = temp;
    });
}

var _swap = curry((index1: number, index2: number, ThreeDTransformData: any) => {
    return IO.of(requireCheckFunc(() => {
        // it("source index should not === target index", () => {
        //     expect(index1).not.equal(index2);
        // });
    }, () => {
        if(index1 === index2){
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

        compose(
            chain(_setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index2], index1)),
            _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[index1], index2)
        )(ThreeDTransformData).run();

        // forEach([
        //     _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.parents),
        //     _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.firstChildren),
        //     _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.nextSiblings)
        // ], (io:IO) => {
        //     io.run();
        // });
        _swapIndexInRelationItemArr(index1, index2, ThreeDTransformData.relations).run();

        DataUtils.swap(ThreeDTransformData.transforms, index1, index2, 1);

        DataUtils.swap(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
        DataUtils.swap(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
        DataUtils.swap(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
        DataUtils.swap(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);

        return ThreeDTransformData;
    }))
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

var _moveToIndex = curry((sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    return IO.of( ensureFunc(() => {
        it("source index should not be used", () => {
            expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).false;
        });
    }, requireCheckFunc(() => {
        it("source index should not === target index", () => {
            expect(sourceIndex).not.equal(targetIndex);
        });
        it("source index should be used", () => {
            expect(_isIndexUsed(sourceIndex, ThreeDTransformData)).true;
        });
        it("target index should not be used", () => {
            expect(_isIndexUsed(targetIndex, ThreeDTransformData)).false;
        });
    }, () => {
        var mat4SourceIndex = _getMatrix4DataIndexInArrayBuffer(sourceIndex),
            mat4TargetIndex = _getMatrix4DataIndexInArrayBuffer(targetIndex),
            mat4Size = _getMatrix4DataSize(),
            vec3SourceIndex = _getVector3DataIndexInArrayBuffer(sourceIndex),
            vec3TargetIndex = _getVector3DataIndexInArrayBuffer(targetIndex),
            vec3Size = _getVector3DataSize(),
            quaSourceIndex = _getQuaternionDataIndexInArrayBuffer(sourceIndex),
            quaTargetIndex = _getQuaternionDataIndexInArrayBuffer(targetIndex),
            quaSize = _getQuaternionDataSize();

        compose(
            chain(moveTo(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size, _resetFloatValInTypeArr)),
            chain(moveTo(ThreeDTransformData.transforms, sourceIndex, targetIndex, 1, _resetValInArr)),
            _setTransformIndexInArrayBufferTable(ThreeDTransformData.transforms[sourceIndex], targetIndex)
        )(ThreeDTransformData).run();


        if(_isRelationItemExist(ThreeDTransformData.relations[sourceIndex])){
            _moveRelationItemTo(sourceIndex, targetIndex, ThreeDTransformData).run();
        }

        _addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray).run();

        return ThreeDTransformData;
    })));
});

var _transform = (index: number, GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        var vec3Index = _getVector3DataIndexInArrayBuffer(index),
            quaIndex = _getQuaternionDataIndexInArrayBuffer(index),
            mat = GlobalTempData.matrix4_2.setTRS(
                DataUtils.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index),
                DataUtils.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex),
                DataUtils.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)
            ),
            parent = ThreeDTransformData.relations[index].parent;

        if(_isRelationDataExist(parent)){
            let parentIndex = parent.indexInArrayBuffer;

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

    // return compose(
    //     map((ThreeDTransformData) => {
    //         ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);
    //     }),
    //     // _moveToIndex(index, ThreeDTransformData, _generateNotUsedIndexInNormalList(ThreeDTransformData).run())
    //     _swap(index, ThreeDTransformData.firstDirtyIndex)
    // )(ThreeDTransformData)

    return IO.of(() => {
        ThreeDTransformData.firstDirtyIndex = _addFirstDirtyIndex(ThreeDTransformData);

        _moveToIndex(index, _generateNotUsedIndexInNormalList(ThreeDTransformData).run(), ThreeDTransformData).run();
    });
}

var _generateNotUsedIndexInArrayBuffer = (ThreeDTransformData: any) => {
    return IO.of(ensureFunc((indexInArrayBuffer:number) => {
        it("indexInArrayBuffer should < firstDirtyIndex", () => {
            expect(indexInArrayBuffer).exist;
            expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
        });
        it("index should not be used", () => {
            expect(_isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
        });
    }, () => {
        var result = ThreeDTransformData.indexInArrayBuffer;

        if (result >= ThreeDTransformData.firstDirtyIndex) {
            return ThreeDTransformData.notUsedIndexArray.pop();
        }

        ThreeDTransformData.indexInArrayBuffer += 1;

        return result;
    }));
}

var _generateNotUsedIndexInNormalList = (ThreeDTransformData: any) => {
    return IO.of(ensureFunc((indexInArrayBuffer:number) => {
        it("indexInArrayBuffer should < firstDirtyIndex", () => {
            expect(indexInArrayBuffer).exist;
            expect(indexInArrayBuffer).lessThan(ThreeDTransformData.firstDirtyIndex);
        });
        it("index should not be used", () => {
            expect(_isIndexUsed(indexInArrayBuffer, ThreeDTransformData)).false;
        });
    }, () => {
        var index = ThreeDTransformData.notUsedIndexArray.pop();

        if (_isValidArrayValue(index)) {
            return index;
        }

        index = ThreeDTransformData.indexInArrayBuffer;

        ThreeDTransformData.indexInArrayBuffer += 1;

        return index;
    }));
}

var _addItAndItsChildrenToDirtyList = curry((rootIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    return IO.of(() => {
        var indexInArraybuffer:number = rootIndexInArrayBuffer,
            relationData = _getOrSetRelationItem(indexInArraybuffer, ThreeDTransformData.relations).run();

        if (_isNotDirty(indexInArraybuffer, ThreeDTransformData.firstDirtyIndex)) {
            _addToDirtyList(indexInArraybuffer, ThreeDTransformData).run();
        }

        forEach(relationData.children, (child:ThreeDTransformRelationData) => {
            _addItAndItsChildrenToDirtyList(child.indexInArrayBuffer, ThreeDTransformData).run()
        })

        return ThreeDTransformData;
    });
})

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

var _removeRelationItemFromParent = (parent: ThreeDTransformRelationData, target:ThreeDTransformRelationData) => {
    return IO.of(() => {
        _removeRelationParent(target).run();

        if(!_isRelationDataExist(parent.children)){
            return;
        }

        parent.children = filter(parent.children, (item:ThreeDTransformRelationData) => {
            return item !== target;
        });
    });
}

var _addToParent = (childRelationItem: ThreeDTransformRelationData, parentIndexInArrayBuffer: number, ThreeDTransformData:any) => {
    return IO.of(requireCheckFunc(() => {
        it("the child one should not has parent", () => {
            expect(_isRelationDataExist(childRelationItem.parent)).false;
        });
    },() => {
        var parentRelationItem = _getOrSetRelationItem(parentIndexInArrayBuffer, ThreeDTransformData.relations).run(),
            children = parentRelationItem.children;

        childRelationItem.parent = parentRelationItem;

        if(_isRelationDataExist(children)){
            children.push(childRelationItem);
        }
        else{
            parentRelationItem.children = [childRelationItem];
        }
    }))
}

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
}, (firstDirtyIndex:number) => {
    return firstDirtyIndex - 1;
})

var _disposeItemInDataContainer = curry((indexInArrayBuffer: number, GlobalTempData:any, ThreeDTransformData: any) => {
    return IO.of(() => {
        var mat = GlobalTempData.matrix4_1.setIdentity(),
            positionVec = GlobalTempData.vector3_1.set(0, 0, 0),
            qua = GlobalTempData.quaternion_1.set(0, 0, 0, 1),
            scaleVec = GlobalTempData.vector3_2.set(1, 1, 1);

        _setTransformItemInTypeArr(indexInArrayBuffer, mat, qua, positionVec, scaleVec, ThreeDTransformData).run();

        DataUtils.removeItemInArray(ThreeDTransformData.transforms, indexInArrayBuffer);

        // DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.parents, indexInArrayBuffer, _resetIndexInTypeArr);
        // DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.firstChildren, indexInArrayBuffer, _resetIndexInTypeArr);
        // DataUtils.removeSingleItemInTypeArray(ThreeDTransformData.nextSiblings, indexInArrayBuffer, _resetIndexInTypeArr);
        _removeRelationItem(indexInArrayBuffer, ThreeDTransformData).run();

        return ThreeDTransformData;
    });
})

var _removeRelationItem = (indexInArrayBuffer:number, ThreeDTransformData: any) => {
    return IO.of(() => {
        var relations = ThreeDTransformData.relations,
            relationData = relations[indexInArrayBuffer];


        _resetValInArr(relations, indexInArrayBuffer).run();

        let parent = relationData.parent;

        if(_isRelationDataExist(parent)) {
            _removeRelationItemFromParent(parent, relationData).run();
        }
    });
}

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

        ThreeDTransformData.relations = [];

        ThreeDTransformData.localToWorldMatrices = new Float32Array(buffer, 0, count * _getMatrix4DataSize());
        ThreeDTransformData.localPositions = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * _getMatrix4DataSize(), count * _getVector3DataSize());
        ThreeDTransformData.localRotations = new Float32Array(buffer, count *  Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize()), count * _getQuaternionDataSize());
        ThreeDTransformData.localScales = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * (_getMatrix4DataSize() + _getVector3DataSize() + _getQuaternionDataSize()), count * _getVector3DataSize());


        ThreeDTransformData.transforms = [];
        ThreeDTransformData.transformIndexInArrayBufferTable = {};
        ThreeDTransformData.notUsedIndexArray = [];

        ThreeDTransformData.firstDirtyIndex = ThreeDTransformData.count;
        ThreeDTransformData.indexInArrayBuffer = _getStartIndexInArrayBuffer();

        _addDefaultTransformData(GlobalTempData, ThreeDTransformData).run();
    });
}
