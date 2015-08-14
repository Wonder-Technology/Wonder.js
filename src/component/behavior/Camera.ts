/// <reference path="../../definitions.d.ts"/>
module dy{
    //todo add backgroundColor
    //todo add Frustum?

    export class Camera extends Behavior{
        public static create() {
            var obj = new this();

            return obj;
        }

        get cameraToWorldMatrix(){
            return this.transform.localToWorldMatrix.copy();
        }

        get worldToCameraMatrix(){
            return this.cameraToWorldMatrix.invert();
        }

        private _pMatrix:Matrix = Matrix.create();
        get pMatrix(){
            return this._pMatrix;
        }
        set pMatrix(pMatrix:Matrix){
            this._pMatrix = pMatrix;
        }

        private _vMatrix:Matrix = Matrix.create();
        get vMatrix(){
            return this._vMatrix;
        }
        set vMatrix(vMatrix:Matrix){
            this._vMatrix = vMatrix;
        }

        private _eye:Vector3 = null;
        get eye(){
            return this._eye;
        }
        set eye(eye:Vector3){
            this._eye = eye;
        }

        private _center:Vector3 = null;
        get center(){
            return this._center;
        }
        set center(center:Vector3){
            this._center = center;
        }

        private _up:Vector3 = null;
        get up(){
            return this._up;
        }
        set up(up:Vector3){
            this._up = up;
        }

        private _fovy:number= null;
        get fovy(){
            return this._fovy;
        }
        set fovy(fovy:number){
            this._fovy = fovy;
            this._dirty = true;
        }

        private _aspect:number = null;
        get aspect(){
            return this._aspect;
        }
        set aspect(aspect:number){
            this._aspect = aspect;
            this._dirty = true;
        }

        private _near:number = null;
        get near(){
            return this._near;
        }
        set near(near:number){
            this._near = near;
            this._dirty = true;
        }

        private _far:number = null;
        get far(){
            return this._far;
        }
        set far(far:number){
            this._far = far;
            this._dirty = true;
        }

        private _dirty:boolean = false;

        public init(){
            this._pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
        }

        public computeVpMatrix(){
            var matrix = Matrix.create();

            matrix.applyMatrix(this.worldToCameraMatrix);
            matrix.applyMatrix(this._pMatrix);

            return matrix;
        }

        public zoomIn(speed:number, min:number = 1){
            this._fovy = Math.max(this._fovy - speed, min);
        }
        public zoomOut(speed:number, max:number = 179){
            this._fovy = Math.min(this._fovy + speed, max);
        }

        public update(time){
            if(this._dirty){
                this._pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
                this._dirty = false;
            }
        }
    }
}
