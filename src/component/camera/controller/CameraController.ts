/// <reference path="../../../filePath.d.ts"/>
module wd {
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


        public entityObject:GameObject;

        public camera:Camera = null;

        public init() {
            this.camera.entityObject = <GameObject>this.entityObject;
            this.camera.init();
        }

        public update(elapsedTime:number){
            this.camera.update(elapsedTime);
        }

        public dispose(){
            this.camera.dispose();
        }

        public isIntersectWithRay(entityObject:GameObject, screenX:number, screenY:number):boolean{
            var from = null,
                to = null,
                shape = null;

            if(!entityObject.hasComponent(Collider)){
                return false;
            }

            shape = entityObject.getComponent<Collider>(Collider).shape;

            from = this.convertScreenToWorld(screenX, screenY, this.camera.near);
            to = this.convertScreenToWorld(screenX, screenY, this.camera.far);

            return shape.isIntersectWithRay(from, to.sub(from));
        }

        public convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3{
            return this.camera.convertScreenToWorld(screenX, screenY, distanceFromCamera);
        }
    }
}
