import { getFar, getNear, getPMatrix, setFar, setNear } from "./CameraSystem";
import { CameraController } from "./CameraController";
import { getAspect, getFovy, setAspect, setFovy } from "./PerspectiveCameraSystem";
import { PerspectiveCameraData } from "./PerspectiveCameraData";
import { CameraControllerData } from "./CameraControllerData";

export const getPerspectiveCameraFovy = (cameraController: CameraController) => {
    return getFovy(cameraController.index, PerspectiveCameraData);
}

export const setPerspectiveCameraFovy = (cameraController: CameraController, fovy: number) => {
    setFovy(cameraController.index, fovy, PerspectiveCameraData, CameraControllerData);
}

export const getPerspectiveCameraAspect = (cameraController: CameraController) => {
    return getAspect(cameraController.index, PerspectiveCameraData);
}

export const setPerspectiveCameraAspect = (cameraController: CameraController, aspect: number) => {
    setAspect(cameraController.index, aspect, PerspectiveCameraData, CameraControllerData);
}
