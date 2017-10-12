import { Component } from "../Component";
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { create, getGameObject } from "./CameraControllerSystem";
import { CameraControllerData } from "./CameraControllerData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";

@registerClass("CameraController")
export class CameraController extends Component {
}

export const createCameraController = () => {
    return create(CameraControllerData);
}

export const getCameraControllerGameObject = (component: CameraController) => {
    return getGameObject(component.index, CameraControllerData);
}
