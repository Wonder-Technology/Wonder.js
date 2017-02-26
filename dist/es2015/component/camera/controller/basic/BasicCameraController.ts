import { registerClass } from "../../../../definition/typescript/decorator/registerClass";
import { CameraController } from "../CameraController";
import { Camera } from "../../Camera";

@registerClass("BasicCameraController")
export class BasicCameraController extends CameraController {
    public static create(cameraComponent: Camera) {
        var obj = new this(cameraComponent);

        return obj;
    }
}