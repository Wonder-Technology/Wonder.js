/// <reference path="../../../filePath.d.ts"/>
module dy {
    export abstract class CameraController extends Component {
        constructor(cameraComponent:Camera){
            super();

            this.camera = cameraComponent;
        }

        public camera:Camera = null;

        public init() {
            this.camera.gameObject = this.gameObject;
            this.camera.init();
        }

        public dispose(){
            this.camera.dispose();
        }
    }
}
