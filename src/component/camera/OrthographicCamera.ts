module wd{
    export class OrthographicCamera extends Camera{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _left:number = null;
        @cloneAttributeAsBasicType()
        get left(){
            return this._left;
        }
        set left(left:number){
            this._left = left;
            this.pMatrixDirty = true;
        }

        private _right:number = null;
        @cloneAttributeAsBasicType()
        get right(){
            return this._right;
        }
        set right(right:number){
            this._right = right;
            this.pMatrixDirty = true;
        }

        private _bottom:number = null;
        @cloneAttributeAsBasicType()
        get bottom(){
            return this._bottom;
        }
        set bottom(bottom:number){
            this._bottom = bottom;
            this.pMatrixDirty = true;
        }

        private _top:number = null;
        @cloneAttributeAsBasicType()
        get top(){
            return this._top;
        }
        set top(top:number){
            this._top = top;
            this.pMatrixDirty = true;
        }

        public convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3{
            var device:DeviceManager = DeviceManager.getInstance(),
                width = device.view.width,
                height = device.view.height,
                normalizedDeviceCoordinate = Vector3.create(2 * screenX / width - 1, (height - screenY) / height * 2 - 1, (distanceFromCamera - this.far) / (this.far - this.near) * 2 + 1);

            return this.getInvViewProjMat().multiplyPoint(normalizedDeviceCoordinate);
        }

        public convertWorldToScreen(worldX:number, worldY:number, worldZ:number, screenWidth:number, screenHeight:number):Vector2{
            //todo implement
            Log.error(true, "need implement");

            return null;
        }

        protected updateProjectionMatrix(){
            this.pMatrix.setOrtho(this._left, this._right, this._bottom, this._top, this.near, this.far);
        }
    }
}
