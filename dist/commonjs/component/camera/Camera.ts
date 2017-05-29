import { getFar, getNear, getPMatrix, setFar, setNear } from "./CameraSystem";
import { CameraController } from "./CameraController";
import { CameraControllerData } from "./CameraControllerData";
import { CameraData } from "./CameraData";

export var getCameraPMatrix = (cameraController: CameraController) => {
    return getPMatrix(cameraController.index, CameraData);
}

export var getCameraNear = (cameraController: CameraController) => {
    return getNear(cameraController.index, CameraData);
}

export var setCameraNear = (cameraController: CameraController, near: number) => {
    setNear(cameraController.index, near, CameraControllerData, CameraData);
}

export var getCameraFar = (cameraController: CameraController) => {
    return getFar(cameraController.index, CameraData);
}

export var setCameraFar = (cameraController: CameraController, far: number) => {
    setFar(cameraController.index, far, CameraControllerData, CameraData);
}
