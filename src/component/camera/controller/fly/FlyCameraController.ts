/// <reference path="../../../../filePath.d.ts"/>
module wd {
    export class FlyCameraController extends CameraController {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        constructor(cameraComponent:Camera){
            super(cameraComponent);

            if(cameraComponent instanceof PerspectiveCamera){
                this._control = FlyPerspectiveCameraControl.create(<PerspectiveCamera>cameraComponent);
            }
            else{
                this._control = FlyOrthographicCameraControl.create(<OrthographicCamera>cameraComponent);
            }
        }

        private _control:FlyCameraControl = null;

        public init() {
            super.init();

            this._control.init(this.gameObject);
        }

        public update(time:number){
            super.update(time);

            this._control.update(time);
        }

        public dispose() {
            super.dispose();

            this._control.dispose();
        }
    }
}
