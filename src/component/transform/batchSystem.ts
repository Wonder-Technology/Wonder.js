import curry from "wonder-lodash/curry";
import { getChildren, getParent, isChildrenExist, setChildren } from "./hierarchySystem";
import { BatchTransformData, BatchTypeArrayTransformData, ThreeDTransform } from "./ThreeDTransform";
import {
    getVector3DataIndexInArrayBuffer, moveMapDataToIndex, moveTypeArrDataToIndex, setDefaultTypeArrData,
    setLocalPositionData,
    setLocalPositionTypeArrayData, setPositionData,
    swapTransformMapData,
    swapTypeArrData
} from "./operateDataSystem";
import { isTranslate, setIsTranslate } from "./isTransformSystem";
import { addNotUsedIndex, isNotDirty, minusFirstDirtyIndex } from "./dirtySystem";
import { isIndexUsed } from "./utils";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { compose, forEachArray, map } from "../../utils/functionalUtils";
import { checkTransformShouldAlive } from "./contractUtils";
import { forEach, map as mapArray, mapPair } from "../../utils/arrayUtils";
import { isNotAlive } from "./ThreeDTransformSystem";
import { isUndefined } from "../../utils/JudgeUtils";
import { Maybe } from "wonder-fantasy-land/dist/es2015/types/Maybe";
import range from "wonder-lodash/range";
import { createTempData, setTransformMap } from "./tempDataSystem";

export const createBatch = ensureFunc(() => {
    //todo need check
    // it("componentMap should has data", () => {
    //     expect(getChildren(transform.uid, ThreeDTransformData)).exist;
    // });
    // it("count should <= ThreeDTransformData.maxCount", () => {
    //     expect(ThreeDTransformData.count).lte(ThreeDTransformData.maxCount);
    // });
}, (count:number, ThreeDTransformData: any) => {
    // var transform = new ThreeDTransform(),
    //     index = _generateIndexInArrayBuffer(ThreeDTransformData),
    //     uid = _buildUId(ThreeDTransformData);
    //
    // transform.index = index;
    // transform.uid = uid;
    //
    // ThreeDTransformData.count += 1;
    //
    // _createTempData(uid, ThreeDTransformData);
    // _setTransformMap(index, transform, ThreeDTransformData);
    // setChildren(uid, [], ThreeDTransformData);
    //
    // _setDefaultTypeArrData(index, ThreeDTransformData);
    //
    // ThreeDTransformData.aliveUIdArray.push(uid);
    //
    // return transform;

    //todo benchmark test

    return compose(
        mapPair(data, (uid: number, index: number) => {
            var transform = new ThreeDTransform();

            transform.uid = uid;
            transform.index = index;

            //todo move out to new forEachPair?(need benchmark test)
            setTransformMap(index, transform, ThreeDTransformData);

            return transform;
        }),
        (data:Array<Array<number>>) => {
            var [uidArray, indexArray] = data;

            forEach(uidArray, (uid:number) => {
                createTempData(uid, ThreeDTransformData);
                setChildren(uid, [], ThreeDTransformData);
            });

            forEach(indexArray, (index:number) => {
                setDefaultTypeArrData(index, ThreeDTransformData);
            });

            return data;
        },
        (data:Array<Array<number>>) => {
            ThreeDTransformData.aliveUIdArray = ThreeDTransformData.aliveUIdArray.concat(data[0]);

            return data;
        },
        (startUId:number, startIndex:number, count:number) => {
            var endUId = startUId + count,
                endIndex = startIndex + count;

            ThreeDTransformData.uid = endUId;
            ThreeDTransformData.index = endIndex;

            return [range(startUId, endUId), range(startIndex, endIndex), count];
        }
    )(ThreeDTransformData.uid, ThreeDTransformData.index, count)
})

export const setBatchDataByTypeArrayData = curry((GlobalTempData: any, ThreeDTransformData: any, batchData: BatchTypeArrayTransformData) => {
    compose(
        _addBatchToDirtyListByChangeMapData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex),
        _addBatchToDirtyListByChangeTypeArrData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex),
        ([noDirtyIndex, targetDirtyIndex]) => {
            ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

            return noDirtyIndex;
        },
        _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(ThreeDTransformData),
        _setBatchTransformDataByTypeArrayData(GlobalTempData, ThreeDTransformData)
    )(batchData);

    return batchData.transforms;
})

const _setBatchTransformDataByTypeArrayData = curry((GlobalTempData: any, ThreeDTransformData: any, {transforms, localPositions:Maybe<Float32Array>}) => {
   // var _safeSetLocalPositionTypeArrayData =  _safeSetData(setLocalPositionTypeArrayData(transforms, ThreeDTransformData));

    // _safeSetLocalPositionTypeArrayData(localPositions);

    // setLocalPositionTypeArrayData(transforms, ThreeDTransformData, localPositions);

    var isTranslate = false;

    //todo refactor: return compose?
    compose(
        map(() => {
            isTranslate = true;

            return null;
        }),
        map(setLocalPositionTypeArrayData(transforms, ThreeDTransformData))
    )(localPositions)

    return {transforms, isTranslate};
})
//
// //todo move out(to utils)?
// const _safeSetData = (setDataFunc:Function) => {
//     return compose(
//         map(setDataFunc),
//         Maybe.of
//     )
// }

export const setBatchData = requireCheckFunc((batchData: Array<BatchTransformData>, GlobalTempData: any, ThreeDTransformData: any) => {
    for (let data of batchData) {
        checkTransformShouldAlive(data.transform, ThreeDTransformData);
    }
}, (batchData: Array<BatchTransformData>, GlobalTempData: any, ThreeDTransformData: any) => {
//todo fix
    // compose(
    //     _addBatchToDirtyListByChangeMapData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex),
    //     _addBatchToDirtyListByChangeTypeArrData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex),
    //     ([noDirtyIndex, targetDirtyIndex]) => {
    //         ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;
    //
    //         return noDirtyIndex;
    //     },
    //     _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(mapArray(batchData, (data:BatchTransformData) => {
    //         return data.transform;
    //     })),
    //     _setBatchTransformData(batchData, GlobalTempData)
    // )(ThreeDTransformData);
})

//todo refactor
const _setBatchTransformData =curry((batchData: Array<BatchTransformData>, GlobalTempData: any, ThreeDTransformData: any) => {
    for (let data of batchData) {
        let transform = data.transform,
            index = transform.index,
            uid = transform.uid,
            parent = getParent(uid, ThreeDTransformData),
            vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(index),
            { position, localPosition } = data;

        if (localPosition) {
            setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeDTransformData);
        }

        if (position) {
            setPositionData(index, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
        }
    }

    return ThreeDTransformData;
})

const _getAllTransfomrsNotDirtyIndexArrAndMarkTransform =curry((ThreeDTransformData: any, {transforms, isTranslate}) => {
    var notDirtyIndexArr = [],
        firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    const _getNotDirtyIndex =(index, uid, notDirtyIndexArr, isTranslate: boolean, ThreeDTransformData) => {
        var children = getChildren(uid, ThreeDTransformData);

        if (isTranslate) {
            setIsTranslate(uid, true, ThreeDTransformData);
        }

        if (isNotDirty(index, firstDirtyIndex)) {
            notDirtyIndexArr.push(index);

            firstDirtyIndex = minusFirstDirtyIndex(firstDirtyIndex);
        }

        if (isChildrenExist(children)) {
            forEach(children, (child: ThreeDTransform) => {
                if (isNotAlive(child, ThreeDTransformData)) {
                    return;
                }

                _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate, ThreeDTransformData);
            })
        }
    }

    for (let {index, uid} of transforms) {
        _getNotDirtyIndex(index, uid, notDirtyIndexArr, isTranslate, ThreeDTransformData);
    }

    return [notDirtyIndexArr, firstDirtyIndex];
});


const _addBatchToDirtyList =(ThreeDTransformData: any, targetDirtyIndex: number, swapFunc: Function, moveToIndexFunc: Function, notDirtyIndexArr: Array<number>) => {
    for (let index of notDirtyIndexArr) {
        targetDirtyIndex = minusFirstDirtyIndex(targetDirtyIndex);

        if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(index, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(index, targetDirtyIndex, ThreeDTransformData);
        }
    }

    return targetDirtyIndex;
}

const _addBatchToDirtyListByChangeTypeArrData =curry((ThreeDTransformData: any, targetDirtyIndex: number, notDirtyIndexArr: Array<number>) => {
    _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, swapTypeArrData, moveTypeArrDataToIndex, notDirtyIndexArr);

    return notDirtyIndexArr;
})


const _addBatchToDirtyListByChangeMapData =curry((ThreeDTransformData: any, targetDirtyIndex: number, notDirtyIndexArr: Array<number>) => {
    return _addBatchToDirtyList(ThreeDTransformData, targetDirtyIndex, swapTransformMapData, (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
        moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
        addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);
    }, notDirtyIndexArr);
})

