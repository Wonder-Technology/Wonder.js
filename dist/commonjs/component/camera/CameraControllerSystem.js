"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentSystem_1 = require("../ComponentSystem");
var contractUtils_1 = require("../utils/contractUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var CameraSystem_1 = require("./CameraSystem");
var CameraController_1 = require("./CameraController");
var arrayUtils_1 = require("../../utils/arrayUtils");
var objectUtils_1 = require("../../utils/objectUtils");
var cacheUtils_1 = require("../../utils/cacheUtils");
var CameraControllerData_1 = require("./CameraControllerData");
var PerspectiveCameraData_1 = require("./PerspectiveCameraData");
var CameraData_1 = require("./CameraData");
exports.addAddComponentHandle = function (_class) {
    ComponentSystem_1.addAddComponentHandle(_class, exports.addComponent);
};
exports.addDisposeHandle = function (_class) {
    ComponentSystem_1.addDisposeHandle(_class, exports.disposeComponent);
};
exports.create = contract_1.requireCheckFunc(function (CameraControllerData) {
    contractUtils_1.checkIndexShouldEqualCount(CameraControllerData);
}, function (CameraControllerData) {
    var controller = new CameraController_1.CameraController(), index = ComponentSystem_1.generateComponentIndex(CameraControllerData);
    controller.index = index;
    CameraControllerData.count += 1;
    exports.addToDirtyList(index, CameraControllerData);
    return controller;
});
exports.addToDirtyList = contract_1.ensureFunc(function (index, CameraControllerData) {
}, function (index, CameraControllerData) {
    CameraControllerData.dirtyIndexArray.push(index);
});
exports.init = function (PerspectiveCameraData, CameraData, CameraControllerData, state) {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, function (dirtyIndex) {
        exports.initCameraController(state, dirtyIndex, PerspectiveCameraData, CameraData);
    });
    _clearDirtyList(CameraControllerData);
    return state;
};
exports.initCameraController = function (state, index, PerspectiveCameraData, CameraData) {
    CameraSystem_1.init(state, index, PerspectiveCameraData, CameraData);
};
var _forEachDirtyList = function (dirtyIndexArray, func) {
    var arr = arrayUtils_1.removeDuplicateItems(dirtyIndexArray);
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var dirtyIndex = arr_1[_i];
        func(dirtyIndex);
    }
};
var _clearDirtyList = function (CameraControllerData) {
    CameraControllerData.dirtyIndexArray = [];
};
exports.update = function (PerspectiveCameraData, CameraData, CameraControllerData, state) {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, function (dirtyIndex) {
        CameraSystem_1.updateProjectionMatrix(dirtyIndex, PerspectiveCameraData, CameraData);
    });
    _clearDirtyList(CameraControllerData);
    _clearCache(CameraControllerData);
    return state;
};
exports.addComponent = function (component, gameObject) {
    ComponentSystem_1.addComponentToGameObjectMap(CameraControllerData_1.CameraControllerData.gameObjectMap, component.index, gameObject);
};
exports.disposeComponent = function (component) {
    var index = component.index;
    objectUtils_1.deleteVal(index, CameraControllerData_1.CameraControllerData.gameObjectMap);
    objectUtils_1.deleteVal(index, CameraControllerData_1.CameraControllerData.worldToCameraMatrixCacheMap);
    CameraControllerData_1.CameraControllerData.count -= 1;
    CameraControllerData_1.CameraControllerData.dirtyIndexArray = arrayUtils_1.removeItem(CameraControllerData_1.CameraControllerData.dirtyIndexArray, index);
    CameraSystem_1.dispose(index, PerspectiveCameraData_1.PerspectiveCameraData, CameraData_1.CameraData);
};
exports.getGameObject = function (index, CameraControllerData) {
    return ComponentSystem_1.getComponentGameObject(CameraControllerData.gameObjectMap, index);
};
exports.getWorldToCameraMatrix = cacheUtils_1.cacheFunc(function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return objectUtils_1.isValidMapValue(CameraControllerData.worldToCameraMatrixCacheMap[index]);
}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return CameraControllerData.worldToCameraMatrixCacheMap[index];
}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData, worldToCamraMatrix) {
    CameraControllerData.worldToCameraMatrixCacheMap[index] = worldToCamraMatrix;
}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return CameraSystem_1.getWorldToCameraMatrix(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData);
});
exports.getPMatrix = function (index, CameraData) {
    return CameraSystem_1.getPMatrix(index, CameraData);
};
var _clearCache = function (CameraControllerData) {
    CameraControllerData.worldToCameraMatrixCacheMap = {};
};
exports.initData = function (CameraControllerData, PerspectiveCameraData, CameraData) {
    CameraControllerData.index = 0;
    CameraControllerData.count = 0;
    CameraControllerData.gameObjectMap = objectUtils_1.createMap();
    CameraControllerData.dirtyIndexArray = [];
    CameraControllerData.worldToCameraMatrixCacheMap = objectUtils_1.createMap();
    CameraSystem_1.initData(PerspectiveCameraData, CameraData);
};
//# sourceMappingURL=CameraControllerSystem.js.map