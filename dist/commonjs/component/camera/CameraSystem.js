"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PerspectiveCameraSystem_1 = require("./PerspectiveCameraSystem");
var CameraControllerSystem_1 = require("./CameraControllerSystem");
var objectUtils_1 = require("../../utils/objectUtils");
var GameObjectSystem_1 = require("../../core/entityObject/gameObject/GameObjectSystem");
var ThreeDTransformSystem_1 = require("../transform/ThreeDTransformSystem");
exports.init = function (state, index, PerspectiveCameraData, CameraData) {
    exports.updateProjectionMatrix(index, PerspectiveCameraData, CameraData);
};
exports.updateProjectionMatrix = function (index, PerspectiveCameraData, CameraData) {
    PerspectiveCameraSystem_1.updateProjectionMatrix(index, PerspectiveCameraData, CameraData);
};
exports.getWorldToCameraMatrix = function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    return _getCameraToWorldMatrix(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).clone().invert();
};
var _getCameraToWorldMatrix = function (index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData) {
    var transform = GameObjectSystem_1.getTransform(CameraControllerSystem_1.getGameObject(index, CameraControllerData).uid, GameObjectData);
    return ThreeDTransformSystem_1.getLocalToWorldMatrix(transform, ThreeDTransformSystem_1.getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData);
};
exports.getPMatrix = function (index, CameraData) {
    return CameraData.pMatrixMap[index];
};
exports.setPMatrix = function (index, pMatrix, CameraData) {
    CameraData.pMatrixMap[index] = pMatrix;
};
exports.getNear = function (index, CameraData) {
    return CameraData.nearMap[index];
};
exports.setNear = function (index, near, CameraControllerData, CameraData) {
    CameraData.nearMap[index] = near;
    CameraControllerSystem_1.addToDirtyList(index, CameraControllerData);
};
exports.getFar = function (index, CameraData) {
    return CameraData.farMap[index];
};
exports.setFar = function (index, far, CameraControllerData, CameraData) {
    CameraData.farMap[index] = far;
    CameraControllerSystem_1.addToDirtyList(index, CameraControllerData);
};
exports.dispose = function (index, PerspectiveCameraData, CameraData) {
    objectUtils_1.deleteVal(index, CameraData.nearMap);
    objectUtils_1.deleteVal(index, CameraData.farMap);
    objectUtils_1.deleteVal(index, CameraData.worldToCameraMatrixMap);
    objectUtils_1.deleteVal(index, CameraData.pMatrixMap);
    PerspectiveCameraSystem_1.dispose(index, PerspectiveCameraData);
};
exports.initData = function (PerspectiveCameraData, CameraData) {
    CameraData.nearMap = objectUtils_1.createMap();
    CameraData.farMap = objectUtils_1.createMap();
    CameraData.worldToCameraMatrixMap = objectUtils_1.createMap();
    CameraData.pMatrixMap = objectUtils_1.createMap();
    PerspectiveCameraSystem_1.initData(PerspectiveCameraData);
};
//# sourceMappingURL=CameraSystem.js.map