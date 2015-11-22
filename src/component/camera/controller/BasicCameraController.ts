/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class BasicCameraController extends CameraController {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }
    }
}
