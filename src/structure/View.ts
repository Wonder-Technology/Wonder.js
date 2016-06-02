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
            return this._dom.clientWidth;
        }
        set width(width:number){
            this._dom.width = width;
        }

        get height(){
            return this._dom.clientHeight;
        }
        set height(height:number){
            this._dom.height = height;
        }

        get styleWidth(){
            return this._dom.style.width;
        }
        set styleWidth(styleWidth:string){
            this._dom.style.width = styleWidth;
        }

        get styleHeight(){
            return this._dom.style.height;
        }
        set styleHeight(styleHeight:string){
            this._dom.style.height = styleHeight;
        }

        get x(){
            return Number(this._dom.style.left.slice(0, -2));
        }
        set x(x:number){
            this._dom.style.left = `${x}px`;
        }

        get y(){
            return Number(this._dom.style.top.slice(0, -2));
        }
        set y(y:number){
            this._dom.style.top = `${y}px`;
        }

        public initCanvas(){
            this._dom.style.cssText = "position:absolute;left:0;top:0;";
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
        styleWidth:string;
        styleHeight:string;
        dom:any;
        getContext(contextConfig:ContextConfigData):WebGLRenderingContext;
        initCanvas():void;
    }

}
