/// <reference path="../../filePath.d.ts"/>
module dy{
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

        private _near:number = null;
        get near(){
            return this._near;
        }
        set near(near:number){
            this._near = near;
            this.dirty = true;
        }

        private _far:number = null;
        get far(){
            return this._far;
        }
        set far(far:number){
            this._far = far;
            this.dirty = true;
        }

        public zoomIn(speed:number, min:number = 1){
            this.fovy = Math.max(this.fovy - speed, min);
        }
        public zoomOut(speed:number, max:number = 179){
            this.fovy = Math.min(this.fovy + speed, max);
        }

        protected updateProjectionMatrix(){
            this.pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
        }
    }
}
