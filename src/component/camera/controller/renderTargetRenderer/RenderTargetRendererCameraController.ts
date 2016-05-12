module wd {
    export class RenderTargetRendererCameraController extends CameraController {
        public static create(cameraComponent:Camera) {
            var obj = new this(cameraComponent);

            return obj;
        }

        protected bindClearCacheEvent(){
        }

        protected disposeClearCacheEvent(){
        }
    }
}
