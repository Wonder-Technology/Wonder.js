import { getFar, getNear, getPMatrix, setFar, setNear } from "./CameraSystem";
import { CameraControllerData } from "./CameraControllerData";
import { CameraData } from "./CameraData";
export var getCameraPMatrix = function (cameraController) {
    return getPMatrix(cameraController.index, CameraData);
};
export var getCameraNear = function (cameraController) {
    return getNear(cameraController.index, CameraData);
};
export var setCameraNear = function (cameraController, near) {
    setNear(cameraController.index, near, CameraControllerData, CameraData);
};
export var getCameraFar = function (cameraController) {
    return getFar(cameraController.index, CameraData);
};
export var setCameraFar = function (cameraController, far) {
    setFar(cameraController.index, far, CameraControllerData, CameraData);
};
//# sourceMappingURL=Camera.js.map