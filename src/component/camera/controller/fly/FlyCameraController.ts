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

        @cloneAttributeAsBasicType()
        get moveSpeed(){
            return this._control.moveSpeed;
        }
        set moveSpeed(speed:number){
            this._control.moveSpeed = speed;
        }

        @cloneAttributeAsBasicType()
        get rotateSpeed(){
            return this._control.rotateSpeed;
        }
        set rotateSpeed(speed:number){
            this._control.rotateSpeed = speed;
        }

        @requireGetterAndSetter(function(){
            assert(this._control instanceof FlyPerspectiveCameraControl, Log.info.FUNC_MUST_BE("FlyPerspectiveCameraControl"));
        }, function(){
            assert(this._control instanceof FlyPerspectiveCameraControl, Log.info.FUNC_MUST_BE("FlyPerspectiveCameraControl"));
        })
        @cloneAttributeAsBasicType()
        get zoomSpeed(){
            return (<FlyPerspectiveCameraControl>this._control).zoomSpeed;
        }
        set zoomSpeed(speed:number){
            (<FlyPerspectiveCameraControl>this._control).zoomSpeed = speed;
        }

        private _control:FlyCameraControl = null;

        public init() {
            super.init();

            this._control.init(this.entityObject);
        }

        public update(elapsedTime:number){
            super.update(elapsedTime);

            this._control.update(elapsedTime);
        }

        public dispose() {
            super.dispose();

            this._control.dispose();
        }
    }
}
