/// <reference path="../../filePath.d.ts"/>
module wd{
    export class OrthographicCamera extends Camera{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _left:number = null;
        get left(){
            return this._left;
        }
        set left(left:number){
            this._left = left;
            this.dirty = true;
        }

        private _right:number = null;
        get right(){
            return this._right;
        }
        set right(right:number){
            this._right = right;
            this.dirty = true;
        }

        private _bottom:number = null;
        get bottom(){
            return this._bottom;
        }
        set bottom(bottom:number){
            this._bottom = bottom;
            this.dirty = true;
        }

        private _top:number = null;
        get top(){
            return this._top;
        }
        set top(top:number){
            this._top = top;
            this.dirty = true;
        }


        public convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3{
            var device:DeviceManager = DeviceManager.getInstance(),
                width = device.view.width,
                height = device.view.height,
                normalizedDeviceCoordinate = Vector3.create(2 * screenX / width - 1, (height - screenY) / height * 2 - 1, (distanceFromCamera - this.far) / (this.far - this.near) * 2 + 1);

            return this.getInvViewProjMat().multiplyPoint(normalizedDeviceCoordinate);
        }

        protected updateProjectionMatrix(){
            this.pMatrix.setOrtho(this._left, this._right, this._bottom, this._top, this.near, this.far);
        }
    }
}
