/// <reference path="../../../filePath.d.ts"/>
module dy {
    export abstract class CameraController extends Component {
        constructor(cameraComponent:Camera){
            super();

            this.camera = cameraComponent;
        }

        get cameraToWorldMatrix(){
            return this.camera.cameraToWorldMatrix;
        }

        get worldToCameraMatrix(){
            return this.camera.worldToCameraMatrix;
        }
        set worldToCameraMatrix(matrix:Matrix4){
            this.camera.worldToCameraMatrix = matrix;
        }

        get pMatrix(){
            return this.camera.pMatrix;
        }
        set pMatrix(pMatrix:Matrix4){
            this.camera.pMatrix = pMatrix;
        }

        public camera:Camera = null;

        public init() {
            this.camera.gameObject = this.gameObject;
            this.camera.init();
        }

        public update(time:number){
            this.camera.update(time);
        }

        public dispose(){
            this.camera.dispose();
        }
    }
}
