import { getAspect, getFovy, setAspect, setFovy } from "./PerspectiveCameraSystem";
import { PerspectiveCameraData } from "./PerspectiveCameraData";
import { CameraControllerData } from "./CameraControllerData";
export var getPerspectiveCameraFovy = function (cameraController) {
    return getFovy(cameraController.index, PerspectiveCameraData);
};
export var setPerspectiveCameraFovy = function (cameraController, fovy) {
    setFovy(cameraController.index, fovy, PerspectiveCameraData, CameraControllerData);
};
export var getPerspectiveCameraAspect = function (cameraController) {
    return getAspect(cameraController.index, PerspectiveCameraData);
};
export var setPerspectiveCameraAspect = function (cameraController, aspect) {
    setAspect(cameraController.index, aspect, PerspectiveCameraData, CameraControllerData);
};
//# sourceMappingURL=PerspectiveCamera.js.map