import { Component } from "../Component";
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { create, getGameObject } from "./CameraControllerSystem";
import { CameraControllerData } from "./CameraControllerData";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";

@registerClass("CameraController")
export class CameraController extends Component {
}

export var createCameraController = () => {
    return create(CameraControllerData);
}

export var getCameraControllerGameObject = (component: CameraController) => {
    return getGameObject(component.index, CameraControllerData);
}
