/// <reference path="../../definitions.d.ts"/>
module dy{
    //todo add backgroundColor
    //todo add Frustum?

    export abstract class Camera{
        @requireGetter(function(){
            assert(this.gameObject, Log.info.FUNC_MUST_DEFINE("gameObject"));
        })
        get cameraToWorldMatrix(){
            return this.gameObject.transform.localToWorldMatrix.copy();
        }

        private _worldToCameraMatrix = null;
        get worldToCameraMatrix(){
            if(this._worldToCameraMatrix){
                return this._worldToCameraMatrix;
            }

            return this.cameraToWorldMatrix.invert();
        }
        set worldToCameraMatrix(matrix:Matrix4){
            this._worldToCameraMatrix = matrix;
        }

        public pMatrix:Matrix4 = Matrix4.create();
        public gameObject:GameObject = null;

        protected dirty:boolean = false;

        @virtual
        public init(){
            if(this.dirty) {
                this.updateProjectionMatrix();
                this.dirty = false;
            }
        }

        @virtual
        public dispose(){
        }

        public update(time:number){
            if(this.dirty){
                this.updateProjectionMatrix();

                this.dirty = false;
            }
        }

        protected abstract updateProjectionMatrix();
    }
}
