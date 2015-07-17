/// <reference path="../definitions.d.ts"/>
module Engine3D {
    export interface IView {
        offset:{x:number, y:number};
        width:number;
        height:number;
        dom:any;
        getContext():any;
    }

    export class ViewWebGL implements IView {
        public static create(view:IView) {
            var obj = new this(view);

            return obj;
        }

        get offset() {
            var view = this._dom,
                offset = {x: view.offsetLeft, y: view.offsetTop};

            while (view = view.offsetParent) {
                offset.x += view.offsetLeft;
                offset.y += view.offsetTop;
            }

            return offset;
        }

        private _dom:any = null;
        get dom(){
            return this._dom;
        }

        //private _width:number = null;
        get width(){
            return this._dom.width;
        }

        get height(){
            return this._dom.height;
        }

        constructor(dom:any){
            this._dom = dom;
        }

        public getContext():any{
            return this._dom.getContext("webgl") || this._dom.getContext("experimental-webgl");
        }
    }
}
