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

        public pMatrix:Matrix = Matrix.create();
        public vMatrix:Matrix = Matrix.create();
        public eye:Vector3 = null;
        public center:Vector3 = null;
        public up:Vector3 = null;

        private _dirty:boolean = false;

        public init(){
            this.pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
        }

        public computeVpMatrix(){
            var matrix = Matrix.create();

            matrix.applyMatrix(this.worldToCameraMatrix);
            matrix.applyMatrix(this.pMatrix);

            return matrix;
        }

        public zoomIn(speed:number, min:number = 1){
            this.fovy = Math.max(this.fovy - speed, min);
        }
        public zoomOut(speed:number, max:number = 179){
            this.fovy = Math.min(this.fovy + speed, max);
        }

        public update(time){
            if(this._dirty){
                this.pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
                this._dirty = false;
            }
        }
    }
}
