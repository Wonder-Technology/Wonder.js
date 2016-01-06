module wd {
    export class FlyOrthographicCameraControl extends FlyCameraControl {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        protected zoom(event:KeyboardEvent){
        }
    }
}
