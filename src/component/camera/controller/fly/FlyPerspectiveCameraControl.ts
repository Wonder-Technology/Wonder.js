/// <reference path="../../../../definitions.d.ts"/>
module dy {
    export class FlyPerspectiveCameraControl extends FlyCameraControl {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        public zoomSpeed:number = 10;

        protected cameraComponent:PerspectiveCamera;

        protected zoom() {
            var speed = this.zoomSpeed;

            if (this.keyState["g"]) {
                this.cameraComponent.zoomIn(speed);
            }
            else if (this.keyState["h"]) {
                this.cameraComponent.zoomOut(speed);
            }
        }
    }
}
