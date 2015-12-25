/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIRenderer extends RendererComponent {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public context:any = null;
        public isClear:boolean = false;

        private _canvas:HTMLCanvasElement = null;
        private _beforeInitHandler:() => void = null;
        private _endLoopHandler:() => void = null;
        private _isInit:boolean = false;
        private _refernceList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();

        public addToGameObject(gameObject:GameObject){
            this._refernceList.addChild(gameObject);

            /*!
            uiRenderer may be shared by multi gameObjects, so this.gameObject is the last one which share this
             */
            this.gameObject = gameObject;
        }

        public removeFromGameObject(gameObject:GameObject){
            this._refernceList.removeChild(gameObject);

            if(this._refernceList.getCount() > 0){
                return;
            }

            super.removeFromGameObject(gameObject);
        }

        public init(){
            if(this._isInit){
                return;
            }

            this._isInit = true;

            this._endLoopHandler = wdCb.FunctionUtils.bind(this, () => {
                this.isClear = false;
            });

            EventManager.on(<any>EngineEvent.ENDLOOP, this._endLoopHandler);
        }

        public initWhenCreate(){
            this._beforeInitHandler = wdCb.FunctionUtils.bind(this, () => {
                this._createOverlayCanvas();
            });

            EventManager.on(<any>EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        }

        public dispose(){
            if(this._refernceList.getCount() > 0){
                return;
            }

            EventManager.off(<any>EngineEvent.BEFORE_INIT, this._beforeInitHandler);

            wdCb.DomQuery.create(this._canvas).remove();
        }

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
        }

        public clearCanvas(){
            this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this.isClear = true;
        }

        private _createOverlayCanvas(){
            var canvas = null,
                view = null;

            if(this._canvas){
                return;
            }

            canvas = wdCb.DomQuery.create("<canvas></canvas>").prependTo("body");
            view = DeviceManager.getInstance().view;

            canvas.css("position", "absolute");
            canvas.css("left", `${view.x}px`);
            canvas.css("top", `${view.y}px`);
            canvas.css("zIndex", "1");

            canvas.attr("width", view.width);
            canvas.attr("height", view.height);

            this._canvas = canvas.get(0);
            this.context = this._canvas.getContext("2d");
        }
    }
}
