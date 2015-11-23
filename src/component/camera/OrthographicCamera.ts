/// <reference path="../../filePath.d.ts"/>
module dy{
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

        protected updateProjectionMatrix(){
            this.pMatrix.setOrtho(this._left, this._right, this._bottom, this._top, this._near, this._far);
        }
    }
}
