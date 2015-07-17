/// <reference path="../definitions.d.ts"/>
module Engine3D {
    export interface IView {
        offset:{x:number, y:number};
        width:number;
        height:number;

        getContext():any;
    }

    export class ViewWebGL implements IView {
        public static create(view:IView) {
            var obj = new this(view);

            return obj;
        }

        get offset() {
            var view = this._view,
                offset = {x: view.offsetLeft, y: view.offsetTop};

            while (view = view.offsetParent) {
                offset.x += view.offsetLeft;
                offset.y += view.offsetTop;
            }

            return offset;
        }

        private _view:any = null;

        //private _width:number = null;
        get width(){
            return this._view.width;
        }

        get height(){
            return this._view.height;
        }

        constructor(view:IView){
            this._view = view;
        }

        public getContext():any{
            return this._view.getContext("webgl") || this._view.getContext("experimental-webgl");
        }
    }
}
