/// <reference path="../../definitions.d.ts"/>
module dy{
    //todo add backgroundColor
    //todo add Frustum?

    export abstract class Camera extends Behavior{
        get cameraToWorldMatrix(){
            return this.transform.localToWorldMatrix.copy();
        }

        private _worldToCameraMatrix = null;
        get worldToCameraMatrix(){
            if(this._worldToCameraMatrix){
                return this._worldToCameraMatrix;
            }

            return this.cameraToWorldMatrix.invert();
        }
        set worldToCameraMatrix(matrix){
            this._worldToCameraMatrix = matrix;
        }

        public pMatrix:Matrix4 = Matrix4.create();

        protected dirty:boolean = false;

        public init(){
            if(this.dirty) {
                this.updateProjectionMatrix();
                this.dirty = false;
            }
        }


        public update(time){
            if(this.dirty){
                this.updateProjectionMatrix();

                this.dirty = false;
            }
        }

        protected abstract updateProjectionMatrix();
    }
}
