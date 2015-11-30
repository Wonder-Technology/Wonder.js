/// <reference path="../../../../filePath.d.ts"/>
module wd {
    export class BasicCameraController extends CameraController {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }
    }
}
