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
            this.pMatrixDirty = true;
        }

        private _far:number = null;
        @cloneAttributeAsBasicType()
        get far(){
            return this._far;
        }
        set far(far:number){
            this._far = far;
            this.pMatrixDirty = true;
        }

        private _pMatrix:Matrix4 = Matrix4.create();
        @cloneAttributeAsCloneable()
        get pMatrix(){
            return this._pMatrix;
        }
        set pMatrix(pMatrix:Matrix4){
            this._isUserSpecifyThePMatrix = true;

            this._pMatrix = pMatrix;
        }

        public entityObject:GameObject = null;

        protected pMatrixDirty:boolean = false;

        @cloneAttributeAsBasicType()
        private _isUserSpecifyThePMatrix:boolean = false;

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
            if(this.pMatrixDirty) {
                this._updateProjectionMatrix();
                this.pMatrixDirty = false;
            }
        }

        @virtual
        public dispose(){
        }

        public clone(){
            return CloneUtils.clone(this);
        }

        public update(elapsed:number){
            if(this.pMatrixDirty){
                this._updateProjectionMatrix();

                this.pMatrixDirty = false;
            }
        }

        protected abstract updateProjectionMatrix();

        protected getInvViewProjMat(){
            return this.pMatrix.clone().multiply(this.worldToCameraMatrix).invert();
        }

        private _updateProjectionMatrix(){
            if(this._isUserSpecifyThePMatrix){
                return;
            }

            this.updateProjectionMatrix();
        }
    }
}
