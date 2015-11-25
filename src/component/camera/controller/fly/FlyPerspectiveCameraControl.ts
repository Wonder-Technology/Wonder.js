/// <reference path="../../../../filePath.d.ts"/>
module dy {
    export class FlyPerspectiveCameraControl extends FlyCameraControl {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        public zoomSpeed:number = 10;

        protected cameraComponent:PerspectiveCamera;

        protected zoom(event:KeyboardEvent){
            var speed = this.zoomSpeed,
                keyState = event.keyState;

            if (keyState["g"]) {
                this.cameraComponent.zoomIn(speed);
            }
            else if (keyState["h"]) {
                this.cameraComponent.zoomOut(speed);
            }
        }
    }
}
