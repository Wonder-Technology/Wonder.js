import { Matrix4 } from "../../math/Matrix4";
import { Quaternion } from "../../math/Quaternion";
import { Vector3 } from "../../math/Vector3";
import { getUID, isIndexUsed } from "./utils";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { TransformMap } from "./ThreeDTransformData";
import { deleteVal } from "../../utils/objectUtils";
import { addNotUsedIndex } from "./dirtySystem";
import { DataUtils } from "../../utils/DataUtils";
import { ThreeDTransform } from "./ThreeDTransform";
import { isParentExist } from "./hierarchySystem";
import { getLocalToWorldMatrix } from "./ThreeDTransformSystem";

export var swap = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
    it("source index and target index should be used", () => {
        expect(isIndexUsed(index1, ThreeDTransformData)).true;
        expect(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    swapTypeArrData(index1, index2, ThreeDTransformData);
    swapTransformMapData(index1, index2, ThreeDTransformData);

    return ThreeDTransformData;
})

export var swapTransformMapData = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
    it("source index and target index should be used", () => {
        expect(isIndexUsed(index1, ThreeDTransformData)).true;
        expect(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    return _changeMapData(index1, index2, _swapTransformMap, ThreeDTransformData);
})

export var swapTypeArrData = (index1: number, index2: number, ThreeDTransformData: any) => {
    return _changeTypeArrData(index1, index2, _swapTypeArr, ThreeDTransformData);
}

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
}

var _changeTypeArrData = (sourceIndex: number, targetIndex: number, changeFunc: (arr: Float32Array, sourceIndex: number, targetIndex: number, length: number) => void, ThreeDTransformData: any) => {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }

    let mat4SourceIndex = getMatrix4DataIndexInArrayBuffer(sourceIndex),
        mat4TargetIndex = getMatrix4DataIndexInArrayBuffer(targetIndex),
        mat4Size = getMatrix4DataSize(),
        vec3SourceIndex = getVector3DataIndexInArrayBuffer(sourceIndex),
        vec3TargetIndex = getVector3DataIndexInArrayBuffer(targetIndex),
        vec3Size = getVector3DataSize(),
        quaSourceIndex = getQuaternionDataIndexInArrayBuffer(sourceIndex),
        quaTargetIndex = getQuaternionDataIndexInArrayBuffer(targetIndex),
        quaSize = getQuaternionDataSize();

    changeFunc(ThreeDTransformData.localToWorldMatrices, mat4SourceIndex, mat4TargetIndex, mat4Size);
    changeFunc(ThreeDTransformData.localPositions, vec3SourceIndex, vec3TargetIndex, vec3Size);
    changeFunc(ThreeDTransformData.localRotations, quaSourceIndex, quaTargetIndex, quaSize);
    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);

    return ThreeDTransformData;
}

var _changeMapData = (sourceIndex: number, targetIndex: number, changeFunc: (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => void, ThreeDTransformData: any) => {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }

    changeFunc(ThreeDTransformData.transformMap, sourceIndex, targetIndex);

    return ThreeDTransformData;
}

// var _resetValInArr = (dataArr: Array<any>, index: number) => {
//     dataArr[index] = void 0;
// }

var _moveToTypeArr = (dataArr: Float32Array, sourceIndex: number, targetIndex: number, length: number
) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = sourceIndex + i,
            newIndex2 = targetIndex + i;

        dataArr[newIndex2] = dataArr[newIndex1];

        dataArr[newIndex1] = 0;
    }
};

var _moveToTransformMap = (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => {
    var sourceTransform = transformMap[sourceIndex];

    sourceTransform.index = targetIndex;
    transformMap[targetIndex] = sourceTransform;

    deleteVal(sourceIndex, transformMap);
}


export var moveToIndex = ensureFunc((returnVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source index should not be used", () => {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc((sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source index should be used", () => {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", () => {
        expect(isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    moveTypeArrDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);
    moveMapDataToIndex(sourceIndex, targetIndex, ThreeDTransformData);

    addNotUsedIndex(sourceIndex, ThreeDTransformData.notUsedIndexLinkList);

    return ThreeDTransformData;
}))

export var moveMapDataToIndex = ensureFunc((returnVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source index should not be used", () => {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).false;
    });
}, requireCheckFunc((sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    it("source index should be used", () => {
        expect(isIndexUsed(sourceIndex, ThreeDTransformData)).true;
    });
    it("target index should not be used", () => {
        expect(isIndexUsed(targetIndex, ThreeDTransformData)).false;
    });
}, (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    return _changeMapData(sourceIndex, targetIndex, _moveToTransformMap, ThreeDTransformData);
}))


export var moveTypeArrDataToIndex = (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
}


export var setTransformDataInTypeArr = (indexInArrayBuffer: number, mat: Matrix4, qua: Quaternion, positionVec: Vector3, scaleVec: Vector3, ThreeDTransformData: any) => {
    setLocalRotationData(qua, getQuaternionDataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalPositionData(positionVec, getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
    setLocalScaleData(scaleVec, getVector3DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);

    setLocalToWorldMatricesData(mat, getMatrix4DataIndexInArrayBuffer(indexInArrayBuffer), ThreeDTransformData);
}

export var setLocalToWorldMatricesData = (mat: Matrix4, mat4IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
}

export var setLocalPositionData = (position: Vector3, vec3IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);

    return ThreeDTransformData;
}

export var setLocalRotationData = (qua: Quaternion, quaIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);

    return ThreeDTransformData;
}

export var setLocalScaleData = (scale: Vector3, vec3IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    DataUtils.setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);

    return ThreeDTransformData;
}

export var setPositionData = (indexInArrayBuffer: number, parent: ThreeDTransform, vec3IndexInArrayBuffer: number, position: Vector3, GlobalTempData: any, ThreeDTransformData: any) => {
    if (isParentExist(parent)) {
        let indexInArrayBuffer = parent.index;

        DataUtils.setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix({
            uid: getUID(indexInArrayBuffer, ThreeDTransformData),
            index: indexInArrayBuffer
        }, GlobalTempData.matrix4_3, ThreeDTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        DataUtils.setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
}

export var getMatrix4DataSize = () => 16;

export var getVector3DataSize = () => 3;

export var getQuaternionDataSize = () => 4;

export var getMatrix4DataIndexInArrayBuffer = (indexInArrayBuffer: number) => indexInArrayBuffer * getMatrix4DataSize();

export var getVector3DataIndexInArrayBuffer = (indexInArrayBuffer: number) => indexInArrayBuffer * getVector3DataSize();

export var getQuaternionDataIndexInArrayBuffer = (indexInArrayBuffer: number) => indexInArrayBuffer * getQuaternionDataSize();
