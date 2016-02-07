module wd {
    export class RayCasterEventTriggerDetector extends EventTriggerDetector {
        public static create() {
            var obj = new this();

            return obj;
        }

        public isTrigger(e:MouseEvent):boolean {
            var scene:SceneDispatcher = Director.getInstance().scene,
                cameraController:CameraController = scene.currentCamera.getComponent<CameraController>(CameraController),
                locationInView = e.locationInView;

            return cameraController.isIntersectWithRay(<GameObject>this.entityObject, locationInView.x, locationInView.y);
        }
    }
}

