import { compose } from "../../utils/functionalUtils";
import curry from "wonder-lodash/curry";
import { addFirstDirtyIndex, generateNotUsedIndexInNormalList } from "./dirtySystem";
import { getUID } from "./utils";
import { getParent as getThreeDTransformDataParent, isParentExist } from "./hierarchySystem";
import { getMatrix4DataIndexInArrayBuffer, getQuaternionDataIndexInArrayBuffer, getVector3DataIndexInArrayBuffer, moveToIndex, setLocalToWorldMatricesData, swap } from "./operateDataSystem";
import { clearCache } from "./cacheSystem";
import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { setMatrix4ByIndex, setQuaternionByIndex, setVector3ByIndex } from "../../utils/typeArrayUtils";
export var update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return compose(_cleanDirtyList(ThreeDTransformData), _updateDirtyList(GlobalTempData, ThreeDTransformData), clearCache(ThreeDTransformData))(state);
};
var _updateDirtyList = requireCheckFunc(curry(function (GlobalTempData, ThreeDTransformData, state) {
    it("firstDirtyIndex should <= maxCount", function () {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
}), curry(function (GlobalTempData, ThreeDTransformData, state) {
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);
    var count = ThreeDTransformData.maxCount;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }
    return state;
}));
var _cleanDirtyList = requireCheckFunc(curry(function (ThreeDTransformData, state) {
    it("firstDirtyIndex should <= maxCount", function () {
        expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
}), curry(function (ThreeDTransformData, state) {
    var count = ThreeDTransformData.maxCount;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        if (_needMoveOffDirtyList(i)) {
            _moveFromDirtyListToNormalList(i, ThreeDTransformData);
        }
    }
    return state;
}));
var _needMoveOffDirtyList = function (index) {
    return true;
};
var _moveFromDirtyListToNormalList = function (index, ThreeDTransformData) {
    ThreeDTransformData.firstDirtyIndex = addFirstDirtyIndex(ThreeDTransformData);
    moveToIndex(index, generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
};
var _transform = function (index, GlobalTempData, ThreeDTransformData) {
    var vec3Index = getVector3DataIndexInArrayBuffer(index), quaIndex = getQuaternionDataIndexInArrayBuffer(index), mat4Index = getMatrix4DataIndexInArrayBuffer(index), mat = GlobalTempData.matrix4_2.setTRS(setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index), setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex), setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)), parent = getThreeDTransformDataParent(getUID(index, ThreeDTransformData), ThreeDTransformData);
    if (isParentExist(parent)) {
        var parentIndex = parent.index;
        return setLocalToWorldMatricesData(setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, getMatrix4DataIndexInArrayBuffer(parentIndex))
            .multiply(mat), mat4Index, ThreeDTransformData);
    }
    return setLocalToWorldMatricesData(mat, mat4Index, ThreeDTransformData);
};
var _sortParentBeforeChildInDirtyList = function (ThreeDTransformData) {
    var count = ThreeDTransformData.maxCount;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var parent_1 = getThreeDTransformDataParent(getUID(i, ThreeDTransformData), ThreeDTransformData);
        if (isParentExist(parent_1)) {
            var parentIndex = parent_1.index;
            if (parentIndex > i) {
                swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
};
//# sourceMappingURL=updateSystem.js.map