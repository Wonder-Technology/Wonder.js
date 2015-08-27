/// <reference path="../definitions.d.ts"/>
module dy {
    export class RectRegion extends Vector4{
        //public x:number = null;
        //public y:number = null;
        //public width:number = null;
        //public height:number = null;

        get width(){
            return this.z;
        }
        set width(width:number){
            this.z = width;
        }

        //private _height:number = null;
        get height(){
            return this.w;
        }
        set height(height:number){
            this.w = height;
        }

        public copy():RectRegion{
            return this.copyHelper(RectRegion.create());
        }
        //get width(){
        //    return this.width;
        //}
        //
        //get w(){
        //    return this.height;
        //}
        //
        //constructor(x:number = null, y:number = null, width:number = null, height:number = null) {
        //    this.x = x;
        //    this.y = y;
        //    this.width = width;
        //    this.height = height;
        //}
        //
        //public static create(x:number = null, y:number = null, width:number = null, height:number = null) {
        //    var obj = new this(x, y, width, height);
        //
        //    return obj;
        //}
    }
}

