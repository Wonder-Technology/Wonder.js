/// <reference path="../../filePath.d.ts"/>
module wd{
    declare var Math:any;

    export class PerspectiveCamera extends Camera{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _fovy:number= null;
        get fovy(){
            return this._fovy;
        }
        set fovy(fovy:number){
            this._fovy = fovy;
            this.dirty = true;
        }

        private _aspect:number = null;
        get aspect(){
            return this._aspect;
        }
        set aspect(aspect:number){
            this._aspect = aspect;
            this.dirty = true;
        }

        public zoomIn(speed:number, min:number = 1){
            this.fovy = Math.max(this.fovy - speed, min);
        }
        public zoomOut(speed:number, max:number = 179){
            this.fovy = Math.min(this.fovy + speed, max);
        }

        public convertScreenToWorld(screenX:number, screenY:number, distanceFromCamera:number):Vector3{
            var device:DeviceManager = DeviceManager.getInstance(),
                width = device.view.width,
                height = device.view.height,
                normalizedDeviceCoordinate = Vector3.create(2 * screenX / width - 1, 1 - 2 * screenY / height, 1),
                invViewProjMat = this.getInvViewProjMat(),
                point = null,
                w = null;

            point = invViewProjMat.multiplyVector3(normalizedDeviceCoordinate);

            w = normalizedDeviceCoordinate.x * invViewProjMat.values[3] +
                normalizedDeviceCoordinate.y * invViewProjMat.values[7] +
                normalizedDeviceCoordinate.z * invViewProjMat.values[11] +
                invViewProjMat.values[15];

            point.scale(1 / w);

            return Vector3.create().lerp(this.gameObject.transform.position, point, distanceFromCamera / this.far);
        }

        protected updateProjectionMatrix(){
            this.pMatrix.setPerspective(this._fovy, this._aspect, this.near, this.far);
        }
    }
}
