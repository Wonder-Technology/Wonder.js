module wd{
    //todo add backgroundColor
    //todo add Frustum?
    export abstract class Camera{
        @requireGetter(function(){
            assert(this.entityObject, Log.info.FUNC_MUST_DEFINE("entityObject"));
        })
        get cameraToWorldMatrix(){
            return this.entityObject.transform.localToWorldMatrix;
        }

        get worldToCameraMatrix(){
            return this.cameraToWorldMatrix.clone().invert();
        }

        private _near:number = null;
        @cloneAttributeAsBasicType()
        get near(){
            return this._near;
        }
        set near(near:number){
            this._near = near;
            this.dirty = true;
        }

        private _far:number = null;
        @cloneAttributeAsBasicType()
        get far(){
            return this._far;
        }
        set far(far:number){
            this._far = far;
            this.dirty = true;
        }


        @cloneAttributeAsCloneable()
        public pMatrix:Matrix4 = Matrix4.create();
        public entityObject:GameObject = null;
        @cloneAttributeAsBasicType()
        public isUserSpecifyThePMatrix:boolean = false;

        protected dirty:boolean = false;


        /**
         * @name convertScreenToWorld
         * @description Convert a point from 2D canvas pixel space to 3D world space.
         * @param {Number} screenX x coordinate on canvas element.
         * @param {Number} screenY y coordinate on canvas element.
         * @param {Number} distanceFromCamera The distance from the camera in world space to create the new point.
         * @returns {Vector3} The world space coordinate.
         */
        public abstract convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3;
        public abstract convertWorldToScreen(worldX:number, worldY:number, worldZ:number, screenWidth:number, screenHeight:number):Vector2;

        @virtual
        public init(){
            if(this.dirty) {
                this._updateProjectionMatrix();
                this.dirty = false;
            }
        }

        @virtual
        public dispose(){
        }

        public clone(){
            return CloneUtils.clone(this);
        }

        public update(elapsed:number){
            if(this.dirty){
                this._updateProjectionMatrix();

                this.dirty = false;
            }
        }

        protected abstract updateProjectionMatrix();

        protected getInvViewProjMat(){
            return this.pMatrix.clone().multiply(this.worldToCameraMatrix).invert();
        }

        private _updateProjectionMatrix(){
            if(this.isUserSpecifyThePMatrix){
                return;
            }

            this.updateProjectionMatrix();
        }
    }
}
