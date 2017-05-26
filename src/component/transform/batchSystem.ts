import curry from "wonder-lodash/curry";
import { getChildren, getParent, isChildrenExist } from "./hierarchySystem";
import { BatchTransformData, ThreeDTransform } from "./ThreeDTransform";
import {
    getVector3DataIndexInArrayBuffer, moveMapDataToIndex, moveTypeArrDataToIndex, setLocalPositionData, setPositionData,
    swapTransformMapData,
    swapTypeArrData
} from "./operateDataSystem";
import { isTranslate, setIsTranslate } from "./isTransformSystem";
import { addNotUsedIndex, isNotDirty, minusFirstDirtyIndex } from "./dirtySystem";
import { isIndexUsed } from "./utils";
import { requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { compose } from "../../utils/functionalUtils";
import { checkTransformShouldAlive } from "./contractUtils";
import { forEach } from "../../utils/arrayUtils";

export var setBatchDatas = requireCheckFunc((batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeTransformData: any) => {
    for(let data of batchData) {
        checkTransformShouldAlive(data.transform, ThreeTransformData);
    }
}, (batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeDTransformData: any) => {
    compose(
        _addBatchToDirtyListByChangeMapData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex),
        _addBatchToDirtyListByChangeTypeArrData(ThreeDTransformData, ThreeDTransformData.firstDirtyIndex),
        ([noDirtyIndex, targetDirtyIndex]) => {
            ThreeDTransformData.firstDirtyIndex = targetDirtyIndex;

            return noDirtyIndex;
        },
        _getAllTransfomrsNotDirtyIndexArrAndMarkTransform(batchData),
        _setBatchTransformData(batchData, GlobalTempData)
    )(ThreeDTransformData);
})

var _setBatchTransformData = curry((batchData:Array<BatchTransformData>, GlobalTempData: any, ThreeDTransformData: any) => {
    for(let data of batchData) {
        let transform = data.transform,
            indexInArrayBuffer = transform.index,
            uid = transform.uid,
            parent = getParent(uid, ThreeDTransformData),
            vec3IndexInArrayBuffer = getVector3DataIndexInArrayBuffer(indexInArrayBuffer),
            {position, localPosition} = data;

        if(localPosition){
            setLocalPositionData(localPosition, vec3IndexInArrayBuffer, ThreeDTransformData);
        }

        if(position){
            setPositionData(indexInArrayBuffer, parent, vec3IndexInArrayBuffer, position, GlobalTempData, ThreeDTransformData);
        }
    }

    return ThreeDTransformData;
})

var _getAllTransfomrsNotDirtyIndexArrAndMarkTransform = curry((batchData:Array<BatchTransformData>, ThreeDTransformData:any) => {
    var notDirtyIndexArr = [],
        firstDirtyIndex = ThreeDTransformData.firstDirtyIndex;
    var _getNotDirtyIndex = (indexInArrayBuffer, uid, notDirtyIndexArr, isTranslate:boolean, ThreeDTransformData) => {
        var children = getChildren(uid, ThreeDTransformData);

        if(isTranslate){
            setIsTranslate(uid, true, ThreeDTransformData);
        }

        if (isNotDirty(indexInArrayBuffer, firstDirtyIndex)) {
            notDirtyIndexArr.push(indexInArrayBuffer);

            firstDirtyIndex = minusFirstDirtyIndex(firstDirtyIndex);
        }

        if(isChildrenExist(children)){
            forEach(children, (child: ThreeDTransform) => {
                _getNotDirtyIndex(child.index, child.uid, notDirtyIndexArr, isTranslate, ThreeDTransformData)
            })
        }
    }

    for(let data of batchData){
        let transform = data.transform,
            indexInArrayBuffer = transform.index;

        _getNotDirtyIndex(indexInArrayBuffer, transform.uid, notDirtyIndexArr, isTranslate(data), ThreeDTransformData);
    }

    return [notDirtyIndexArr, firstDirtyIndex];
});


var _addBatchToDirtyList = (ThreeDTransformData: any, targetDirtyIndex:number, swapFunc:Function, moveToIndexFunc:Function, notDirtyIndexArr:Array<number>) => {
    for(let indexInArrayBuffer of notDirtyIndexArr){
        targetDirtyIndex = minusFirstDirtyIndex(targetDirtyIndex);

        if (isIndexUsed(targetDirtyIndex, ThreeDTransformData)) {
            swapFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
        else {
            moveToIndexFunc(indexInArrayBuffer, targetDirtyIndex, ThreeDTransformData);
        }
    }

    return targetDirtyIndex;
}

var _addBatchToDirtyListByChangeTypeArrData = curry((ThreeDTransformData: any, targetDirtyIndex:number, notDirtyIndexArr:Array<number>) => {
    _addBatchToDirtyList(ThreeDTransformData,targetDirtyIndex, swapTypeArrData, moveTypeArrDataToIndex, notDirtyIndexArr);

    return notDirtyIndexArr;
})


var _addBatchToDirtyListByChangeMapData = curry((ThreeDTransformData: any, targetDirtyIndex:number, notDirtyIndexArr:Array<number>) => {
    return _addBatchToDirtyList(ThreeDTransformData,targetDirtyIndex, swapTransformMapData, (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
        moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
        addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexArray);
    }, notDirtyIndexArr);
})

