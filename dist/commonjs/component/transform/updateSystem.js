"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functionalUtils_1 = require("../../utils/functionalUtils");
var curry_1 = require("wonder-lodash/curry");
var dirtySystem_1 = require("./dirtySystem");
var utils_1 = require("./utils");
var hierarchySystem_1 = require("./hierarchySystem");
var operateDataSystem_1 = require("./operateDataSystem");
var cacheSystem_1 = require("./cacheSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
exports.update = function (elapsed, GlobalTempData, ThreeDTransformData, state) {
    return functionalUtils_1.compose(_cleanDirtyList(ThreeDTransformData), _updateDirtyList(GlobalTempData, ThreeDTransformData), cacheSystem_1.clearCache(ThreeDTransformData))(state);
};
var _updateDirtyList = contract_1.requireCheckFunc(curry_1.default(function (GlobalTempData, ThreeDTransformData, state) {
    contract_1.it("firstDirtyIndex should <= maxCount", function () {
        wonder_expect_js_1.expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
}), curry_1.default(function (GlobalTempData, ThreeDTransformData, state) {
    _sortParentBeforeChildInDirtyList(ThreeDTransformData);
    var count = ThreeDTransformData.maxCount;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        _transform(i, GlobalTempData, ThreeDTransformData);
    }
    return state;
}));
var _cleanDirtyList = contract_1.requireCheckFunc(curry_1.default(function (ThreeDTransformData, state) {
    contract_1.it("firstDirtyIndex should <= maxCount", function () {
        wonder_expect_js_1.expect(ThreeDTransformData.firstDirtyIndex).lte(ThreeDTransformData.maxCount);
    });
}), curry_1.default(function (ThreeDTransformData, state) {
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
    ThreeDTransformData.firstDirtyIndex = dirtySystem_1.addFirstDirtyIndex(ThreeDTransformData);
    operateDataSystem_1.moveToIndex(index, dirtySystem_1.generateNotUsedIndexInNormalList(ThreeDTransformData), ThreeDTransformData);
};
var _transform = function (index, GlobalTempData, ThreeDTransformData) {
    var vec3Index = operateDataSystem_1.getVector3DataIndexInArrayBuffer(index), quaIndex = operateDataSystem_1.getQuaternionDataIndexInArrayBuffer(index), mat4Index = operateDataSystem_1.getMatrix4DataIndexInArrayBuffer(index), mat = GlobalTempData.matrix4_2.setTRS(typeArrayUtils_1.setVector3ByIndex(GlobalTempData.vector3_1, ThreeDTransformData.localPositions, vec3Index), typeArrayUtils_1.setQuaternionByIndex(GlobalTempData.quaternion_1, ThreeDTransformData.localRotations, quaIndex), typeArrayUtils_1.setVector3ByIndex(GlobalTempData.vector3_2, ThreeDTransformData.localScales, vec3Index)), parent = hierarchySystem_1.getParent(utils_1.getUId(index, ThreeDTransformData), ThreeDTransformData);
    if (hierarchySystem_1.isParentExist(parent)) {
        var parentIndex = parent.index;
        return operateDataSystem_1.setLocalToWorldMatricesData(typeArrayUtils_1.setMatrix4ByIndex(GlobalTempData.matrix4_1, ThreeDTransformData.localToWorldMatrices, operateDataSystem_1.getMatrix4DataIndexInArrayBuffer(parentIndex))
            .multiply(mat), mat4Index, ThreeDTransformData);
    }
    return operateDataSystem_1.setLocalToWorldMatricesData(mat, mat4Index, ThreeDTransformData);
};
var _sortParentBeforeChildInDirtyList = function (ThreeDTransformData) {
    var count = ThreeDTransformData.maxCount;
    for (var i = ThreeDTransformData.firstDirtyIndex; i < count; i++) {
        var parent_1 = hierarchySystem_1.getParent(utils_1.getUId(i, ThreeDTransformData), ThreeDTransformData);
        if (hierarchySystem_1.isParentExist(parent_1)) {
            var parentIndex = parent_1.index;
            if (parentIndex > i) {
                operateDataSystem_1.swap(parentIndex, i, ThreeDTransformData);
            }
        }
    }
};
//# sourceMappingURL=updateSystem.js.map