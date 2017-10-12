import { Matrix4 } from "../../math/Matrix4";
import { Quaternion } from "../../math/Quaternion";
import { Vector3 } from "../../math/Vector3";
import { getUId, isIndexUsed } from "./utils";
import { ensureFunc, it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { TransformMap } from "./ThreeDTransformData";
import { deleteVal } from "../../utils/objectUtils";
import { addNotUsedIndex } from "./dirtySystem";
import { ThreeDTransform } from "./ThreeDTransform";
import { isParentExist } from "./hierarchySystem";
import { getLocalToWorldMatrix } from "./ThreeDTransformSystem";
import {
    getMatrix4DataSize, getQuaternionDataSize, getVector3DataSize, setMatrices, setQuaternions,
    setVectors
} from "../../utils/typeArrayUtils";

export const swap = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
    it("source index and target index should be used", () => {
        expect(isIndexUsed(index1, ThreeDTransformData)).true;
        expect(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    swapTypeArrData(index1, index2, ThreeDTransformData);
    swapTransformMapData(index1, index2, ThreeDTransformData);

    return ThreeDTransformData;
})

export const swapTransformMapData = requireCheckFunc((index1: number, index2: number, ThreeDTransformData: any) => {
    it("source index and target index should be used", () => {
        expect(isIndexUsed(index1, ThreeDTransformData)).true;
        expect(isIndexUsed(index2, ThreeDTransformData)).true;
    });
}, (index1: number, index2: number, ThreeDTransformData: any) => {
    return _changeMapData(index1, index2, _swapTransformMap, ThreeDTransformData);
})

export const swapTypeArrData = (index1: number, index2: number, ThreeDTransformData: any) => {
    return _changeTypeArrData(index1, index2, _swapTypeArr, ThreeDTransformData);
}

const _swapTypeArr = (dataArr: any, index1: number, index2: number, length: number) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = index1 + i,
            newIndex2 = index2 + i,
            temp = dataArr[newIndex2];

        dataArr[newIndex2] = dataArr[newIndex1];

        dataArr[newIndex1] = temp;
    }
}

const _swapTransformMap = (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => {
    var sourceTransform = transformMap[sourceIndex],
        targetTransform = transformMap[targetIndex];

    sourceTransform.index = targetIndex;
    targetTransform.index = sourceIndex;

    transformMap[targetIndex] = sourceTransform;
    transformMap[sourceIndex] = targetTransform;
}

const _changeTypeArrData = (sourceIndex: number, targetIndex: number, changeFunc: (arr: Float32Array, sourceIndex: number, targetIndex: number, length: number) => void, ThreeDTransformData: any) => {
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
    _changeLocalScaleData(vec3SourceIndex, vec3TargetIndex, vec3Size, ThreeDTransformData, changeFunc);

    return ThreeDTransformData;
}

const _changeLocalScaleData = requireCheckFunc((vec3SourceIndex: number, vec3TargetIndex: number, vec3Size: number, ThreeDTransformData: any, changeFunc: Function) => {
    it("source localScale data shouldn't be [0,0,0]", () => {
        if (ThreeDTransformData.localScales[vec3SourceIndex] === 0
            && ThreeDTransformData.localScales[vec3SourceIndex + 1] === 0
            && ThreeDTransformData.localScales[vec3SourceIndex + 2] === 0
        ) {
            expect(false).true;
        }
    });
}, (vec3SourceIndex: number, vec3TargetIndex: number, vec3Size: number, ThreeDTransformData: any, changeFunc: Function) => {
    changeFunc(ThreeDTransformData.localScales, vec3SourceIndex, vec3TargetIndex, vec3Size);
})

const _changeMapData = (sourceIndex: number, targetIndex: number, changeFunc: (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => void, ThreeDTransformData: any) => {
    if (sourceIndex === targetIndex) {
        return ThreeDTransformData;
    }

    changeFunc(ThreeDTransformData.transformMap, sourceIndex, targetIndex);

    return ThreeDTransformData;
}

// const _resetValInArr =(dataArr: Array<any>, index: number) => {
//     dataArr[index] = void 0;
// }

const _moveToTypeArr = (dataArr: Float32Array, sourceIndex: number, targetIndex: number, length: number
) => {
    for (let i = 0; i < length; i++) {
        let newIndex1 = sourceIndex + i,
            newIndex2 = targetIndex + i;

        dataArr[newIndex2] = dataArr[newIndex1];
    }
};

const _moveToTransformMap = (transformMap: TransformMap, sourceIndex: number, targetIndex: number) => {
    var sourceTransform = transformMap[sourceIndex];

    sourceTransform.index = targetIndex;
    transformMap[targetIndex] = sourceTransform;

    deleteVal(sourceIndex, transformMap);
}


export const moveToIndex = ensureFunc((returnVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
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

export const moveMapDataToIndex = ensureFunc((returnVal, sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
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


export const moveTypeArrDataToIndex = (sourceIndex: number, targetIndex: number, ThreeDTransformData: any) => {
    return _changeTypeArrData(sourceIndex, targetIndex, _moveToTypeArr, ThreeDTransformData);
}


export const setTransformDataInTypeArr = (index: number, mat: Matrix4, qua: Quaternion, positionVec: Vector3, scaleVec: Vector3, ThreeDTransformData: any) => {
    // export const setTransformDataInTypeArr = (index: number, qua: Quaternion, positionVec: Vector3, scaleVec: Vector3, ThreeDTransformData: any) => {
    setLocalRotationData(qua, getQuaternionDataIndexInArrayBuffer(index), ThreeDTransformData);
    setLocalPositionData(positionVec, getVector3DataIndexInArrayBuffer(index), ThreeDTransformData);
    setLocalScaleData(scaleVec, getVector3DataIndexInArrayBuffer(index), ThreeDTransformData);

    setLocalToWorldMatricesData(mat, getMatrix4DataIndexInArrayBuffer(index), ThreeDTransformData);
}

export const setLocalToWorldMatricesData = (mat: Matrix4, mat4IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    setMatrices(ThreeDTransformData.localToWorldMatrices, mat, mat4IndexInArrayBuffer);
}

export const setLocalPositionData = (position: Vector3, vec3IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);

    return ThreeDTransformData;
}

export const setLocalRotationData = (qua: Quaternion, quaIndexInArrayBuffer: number, ThreeDTransformData: any) => {
    setQuaternions(ThreeDTransformData.localRotations, qua, quaIndexInArrayBuffer);

    return ThreeDTransformData;
}

export const setLocalScaleData = (scale: Vector3, vec3IndexInArrayBuffer: number, ThreeDTransformData: any) => {
    setVectors(ThreeDTransformData.localScales, scale, vec3IndexInArrayBuffer);

    return ThreeDTransformData;
}

export const setPositionData = (index: number, parent: ThreeDTransform, vec3IndexInArrayBuffer: number, position: Vector3, GlobalTempData: any, ThreeDTransformData: any) => {
    if (isParentExist(parent)) {
        let index = parent.index;

        setVectors(ThreeDTransformData.localPositions, getLocalToWorldMatrix({
            uid: getUId(index, ThreeDTransformData),
            index: index
        }, GlobalTempData.matrix4_3, ThreeDTransformData).invert().multiplyPoint(position), vec3IndexInArrayBuffer);
    }
    else {
        setVectors(ThreeDTransformData.localPositions, position, vec3IndexInArrayBuffer);
    }
}

export const getMatrix4DataIndexInArrayBuffer = (index: number) => index * getMatrix4DataSize();

export const getVector3DataIndexInArrayBuffer = (index: number) => index * getVector3DataSize();

export const getQuaternionDataIndexInArrayBuffer = (index: number) => index * getQuaternionDataSize();
