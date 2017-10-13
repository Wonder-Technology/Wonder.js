import { dispose as disposePerspectiveCamera, initData as initDataPerspectiveCamera, updateProjectionMatrix as updateProjectionMatrixPerspectiveCamera } from "./PerspectiveCameraSystem";
import { addToDirtyList, getGameObject } from "./CameraControllerSystem";
import { createMap, deleteVal } from "../../utils/objectUtils";
import { getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getLocalToWorldMatrix, getTempLocalToWorldMatrix } from "../transform/ThreeDTransformSystem";
export var init = function (state, index, PerspectiveCameraData, CameraData) {
    updateProjectionMatrix(index, PerspectiveCameraData, CameraData);
};
export var updateProjectionMatrix = function (index, PerspectiveCameraData, CameraData) {
    updateProjectionMatrixPerspectiveCamera(index, PerspectiveCameraData, CameraData);
};
export var getWorldToCameraMatrix = function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return _getCameraToWorldMatrix(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).clone().invert();
};
var _getCameraToWorldMatrix = function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    var transform = getTransform(getGameObject(index, CameraControllerData).uid, GameObjectData);
    return getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData);
};
export var getPMatrix = function (index, CameraData) {
    return CameraData.pMatrixMap[index];
};
export var setPMatrix = function (index, pMatrix, CameraData) {
    CameraData.pMatrixMap[index] = pMatrix;
};
export var getNear = function (index, CameraData) {
    return CameraData.nearMap[index];
};
export var setNear = function (index, near, CameraControllerData, CameraData) {
    CameraData.nearMap[index] = near;
    addToDirtyList(index, CameraControllerData);
};
export var getFar = function (index, CameraData) {
    return CameraData.farMap[index];
};
export var setFar = function (index, far, CameraControllerData, CameraData) {
    CameraData.farMap[index] = far;
    addToDirtyList(index, CameraControllerData);
};
export var dispose = function (index, PerspectiveCameraData, CameraData) {
    deleteVal(index, CameraData.nearMap);
    deleteVal(index, CameraData.farMap);
    deleteVal(index, CameraData.worldToCameraMatrixMap);
    deleteVal(index, CameraData.pMatrixMap);
    disposePerspectiveCamera(index, PerspectiveCameraData);
};
export var initData = function (PerspectiveCameraData, CameraData) {
    CameraData.nearMap = createMap();
    CameraData.farMap = createMap();
    CameraData.worldToCameraMatrixMap = createMap();
    CameraData.pMatrixMap = createMap();
    initDataPerspectiveCamera(PerspectiveCameraData);
};
//# sourceMappingURL=CameraSystem.js.map