import { getFar, getNear, getPMatrix, setFar, setNear } from "./CameraSystem";
import { CameraController } from "./CameraController";
import { CameraControllerData } from "./CameraControllerData";
import { CameraData } from "./CameraData";

export const getCameraPMatrix = (cameraController: CameraController) => {
    return getPMatrix(cameraController.index, CameraData);
}

export const getCameraNear = (cameraController: CameraController) => {
    return getNear(cameraController.index, CameraData);
}

export const setCameraNear = (cameraController: CameraController, near: number) => {
    setNear(cameraController.index, near, CameraControllerData, CameraData);
}

export const getCameraFar = (cameraController: CameraController) => {
    return getFar(cameraController.index, CameraData);
}

export const setCameraFar = (cameraController: CameraController, far: number) => {
    setFar(cameraController.index, far, CameraControllerData, CameraData);
}
