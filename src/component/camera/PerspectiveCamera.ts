import { getFar, getNear, getPMatrix, setFar, setNear } from "./CameraSystem";
import { CameraController } from "./CameraController";
import { getAspect, getFovy, setAspect, setFovy } from "./PerspectiveCameraSystem";
import { PerspectiveCameraData } from "./PerspectiveCameraData";
import { CameraControllerData } from "./CameraControllerData";

export var getPerspectiveCameraFovy = (cameraController:CameraController) => {
    return getFovy(cameraController.index, PerspectiveCameraData);
}

export var setPerspectiveCameraFovy = (cameraController:CameraController, fovy:number) => {
    setFovy(cameraController.index, fovy, PerspectiveCameraData, CameraControllerData);
}

export var getPerspectiveCameraAspect = (cameraController:CameraController) => {
    return getAspect(cameraController.index, PerspectiveCameraData);
}

export var setPerspectiveCameraAspect = (cameraController:CameraController, aspect:number) => {
    setAspect(cameraController.index, aspect, PerspectiveCameraData, CameraControllerData);
}
