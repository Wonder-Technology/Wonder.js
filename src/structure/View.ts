/// <reference path="../definitions.d.ts"/>
module dy {
    export class ViewWebGL implements IView {
        public static create(view:any) {
            var obj = new this(view);

            return obj;
        }

        constructor(dom:any){
            this._dom = dom;
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

        public getContext():any{
            return this._dom.getContext("webgl") || this._dom.getContext("experimental-webgl");
        }
    }

    export interface IView {
        offset:{x:number, y:number};
        width:number;
        height:number;
        dom:any;
        getContext():any;
    }

}
