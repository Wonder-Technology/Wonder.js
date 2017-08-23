import { addAddComponentHandle as addAddComponentHandleToMap, addComponentToGameObjectMap, addDisposeHandle as addDisposeHandleToMap, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { dispose, getPMatrix as getPMatrixCamera, getWorldToCameraMatrix as getWorldToCameraMatrixCamera, init as initCamera, initData as initDataCamera, updateProjectionMatrix } from "./CameraSystem";
import { CameraController } from "./CameraController";
import { removeDuplicateItems, removeItem } from "../../utils/arrayUtils";
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { cacheFunc } from "../../utils/cacheUtils";
import { CameraControllerData } from "./CameraControllerData";
import { PerspectiveCameraData } from "./PerspectiveCameraData";
import { CameraData } from "./CameraData";
export var addAddComponentHandle = function (_class) {
    addAddComponentHandleToMap(_class, addComponent);
};
export var addDisposeHandle = function (_class) {
    addDisposeHandleToMap(_class, disposeComponent);
};
export var create = requireCheckFunc(function (CameraControllerData) {
    checkIndexShouldEqualCount(CameraControllerData);
}, function (CameraControllerData) {
    var controller = new CameraController(), index = generateComponentIndex(CameraControllerData);
    controller.index = index;
    CameraControllerData.count += 1;
    addToDirtyList(index, CameraControllerData);
    return controller;
});
export var addToDirtyList = ensureFunc(function (index, CameraControllerData) {
}, function (index, CameraControllerData) {
    CameraControllerData.dirtyIndexArray.push(index);
});
export var init = function (PerspectiveCameraData, CameraData, CameraControllerData, state) {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, function (dirtyIndex) {
        initCameraController(state, dirtyIndex, PerspectiveCameraData, CameraData);
    });
    _clearDirtyList(CameraControllerData);
    return state;
};
export var initCameraController = function (state, index, PerspectiveCameraData, CameraData) {
    initCamera(state, index, PerspectiveCameraData, CameraData);
};
var _forEachDirtyList = function (dirtyIndexArray, func) {
    var arr = removeDuplicateItems(dirtyIndexArray);
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var dirtyIndex = arr_1[_i];
        func(dirtyIndex);
    }
};
var _clearDirtyList = function (CameraControllerData) {
    CameraControllerData.dirtyIndexArray = [];
};
export var update = function (PerspectiveCameraData, CameraData, CameraControllerData, state) {
    _forEachDirtyList(CameraControllerData.dirtyIndexArray, function (dirtyIndex) {
        updateProjectionMatrix(dirtyIndex, PerspectiveCameraData, CameraData);
    });
    _clearDirtyList(CameraControllerData);
    _clearCache(CameraControllerData);
    return state;
};
export var addComponent = function (component, gameObject) {
    addComponentToGameObjectMap(CameraControllerData.gameObjectMap, component.index, gameObject);
};
export var disposeComponent = function (component) {
    var index = component.index;
    deleteVal(index, CameraControllerData.gameObjectMap);
    deleteVal(index, CameraControllerData.worldToCameraMatrixCacheMap);
    CameraControllerData.count -= 1;
    CameraControllerData.dirtyIndexArray = removeItem(CameraControllerData.dirtyIndexArray, index);
    dispose(index, PerspectiveCameraData, CameraData);
};
export var getGameObject = function (index, CameraControllerData) {
    return getComponentGameObject(CameraControllerData.gameObjectMap, index);
};
export var getWorldToCameraMatrix = cacheFunc(function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return isValidMapValue(CameraControllerData.worldToCameraMatrixCacheMap[index]);
}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return CameraControllerData.worldToCameraMatrixCacheMap[index];
}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData, worldToCamraMatrix) {
    CameraControllerData.worldToCameraMatrixCacheMap[index] = worldToCamraMatrix;
}, function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return getWorldToCameraMatrixCamera(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData);
});
export var getPMatrix = function (index, CameraData) {
    return getPMatrixCamera(index, CameraData);
};
var _clearCache = function (CameraControllerData) {
    CameraControllerData.worldToCameraMatrixCacheMap = {};
};
export var initData = function (CameraControllerData, PerspectiveCameraData, CameraData) {
    CameraControllerData.index = 0;
    CameraControllerData.count = 0;
    CameraControllerData.gameObjectMap = createMap();
    CameraControllerData.dirtyIndexArray = [];
    CameraControllerData.worldToCameraMatrixCacheMap = createMap();
    initDataCamera(PerspectiveCameraData, CameraData);
};
//# sourceMappingURL=CameraControllerSystem.js.map