import { compose } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import { addFirstDirtyIndex, generateNotUsedIndexInNormalList } from "./dirtySystem";
import { getUID } from "./utils";
import { getParent as getThreeDTransformDataParent, isParentExist } from "./hierarchySystem";
import {
    getMatrix4DataIndexInArrayBuffer, getQuaternionDataIndexInArrayBuffer, getVector3DataIndexInArrayBuffer,
    moveToIndex,
    setLocalToWorldMatricesData,
    swap
} from "./operateDataSystem";
import { Map } from "immutable";
import { clearCache } from "./cacheSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { setMatrix4ByIndex, setQuaternionByIndex, setVector3ByIndex } from "../../utils/typeArrayUtils";

export var update = (elapsed: number, GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    return compose(
        _cleanDirtyList(ThreeDTransformData),
        _updateDirtyList(GlobalTempData, ThreeDTransformData),
        clearCache(ThreeDTransformData)
    )(state);
}

var _updateDirtyList = requireCheckFunc(curry((GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    it("firstDirtyIndex should <= maxCount", () => {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount)
    })
}), curry((GlobalTempData: any, ThreeDTransformData: any, state: Map<any, any>) => {
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);

    let count = ThreeDTransformData.maxCount;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }

    return state;
}))

//todo optimize: if transform not transformed in 5 frames, not move off
var _cleanDirtyList = requireCheckFunc(curry((ThreeDTransformData: any, state: Map<any, any>) => {
    it("firstDirtyIndex should <= maxCount", () => {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount)
    })
}), curry((ThreeDTransformData: any, state: Map<any, any>) => {
    var count = ThreeDTransformData.maxCount;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        if (_needMoveOffDirtyList(i)) {
            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
        }
    }

    return state;
}))

var _needMoveOffDirtyList = (index: number) => {
    return true;
}

var _moveFromDirtyListToNormalList = (index: number, ThreeDTransformData: any) => {
    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);

    moveToIndex(index, generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
}

var _transform = (index: number, GlobalTempData: any, ThreeDTransformData: any) => {
    var vec3Index = getVector3DataIndexInArrayBuffer(index),
        quaIndex = getQuaternionDataIndexInArrayBuffer(index),
        mat4Index = getMatrix4DataIndexInArrayBuffer(index),
        mat = GlobalTempData.matrix4_2.setTRS(
            setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index),
            setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex),
            setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)
        ),
        parent = getThreeDTransformDataParent(getUID(index, ThreeDTransformData), ThreeDTransformData);

    if (isParentExist(parent)) {
        let parentIndex = parent.index;

        return setLocalToWorldMatricesData(setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(parentIndex))
            .multiply(mat),
            mat4Index,
            ThreeDTransformData
        );
    }

    return setLocalToWorldMatricesData(
        mat,
        mat4Index,
        ThreeDTransformData
    );
}

var _sortParentBeforeChildInDirtyList = (ThreeDTransformData: any) => {
    var count = ThreeDTransformData.maxCount;

    for (let i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        let parent = getThreeDTransformDataParent(getUID(i, ThreeDTransformData), ThreeDTransformData);

        if (isParentExist(parent)) {
            let parentIndex = parent.index;

            if (parentIndex > i) {
                swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
}

