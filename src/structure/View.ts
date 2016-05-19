module wd {
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

        get width(){
            return this._dom.width;
        }
        set width(width:number){
            this._dom.width = width;
        }

        get height(){
            return this._dom.height;
        }
        set height(height:number){
            this._dom.height = height;
        }

        get x(){
            return Number(this._dom.style.left.slice(0, -2));
        }
        set x(x:number){
            this._dom.style.position = "absolute";
            this._dom.style.left = `${x}px`;
        }

        get y(){
            return Number(this._dom.style.top.slice(0, -2));
        }
        set y(y:number){
            this._dom.style.position = "absolute";
            this._dom.style.top = `${y}px`;
        }

        public getContext(contextConfig:ContextConfigData):WebGLRenderingContext{
            return this._dom.getContext("webgl", contextConfig.options) || this._dom.getContext("experimental-webgl", contextConfig.options);
        }
    }

    export interface IView {
        offset:{x:number, y:number};
        x:number;
        y:number;
        width:number;
        height:number;
        dom:any;
        getContext(contextConfig:ContextConfigData):WebGLRenderingContext;
    }

}
