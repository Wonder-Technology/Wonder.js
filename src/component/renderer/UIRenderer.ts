/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIRenderer extends RendererComponent {
        public static create() {
        	var obj = new this();

            obj.initWhenCreate();

        	return obj;
        }

        public context:any = null;

        private _canvas:HTMLCanvasElement = null;
        private _beforeInitHandler:() => void = null;


        public init(){
        }

        public initWhenCreate(){
            this._beforeInitHandler = wdCb.FunctionUtils.bind(this, () => {
                this._createOverlayCanvas();
            });

            EventManager.on(<any>EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        }

        public dispose(){
            EventManager.off(<any>EngineEvent.BEFORE_INIT, this._beforeInitHandler);

            wdCb.DomQuery.create(this._canvas).remove();
        }

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
        }

        public clearCanvas(){
            this.context.clearRect(0, 0, this._canvas.width, this._canvas.height)
        }

        private _createOverlayCanvas(){
            var canvasMap = DeviceManager.getInstance().canvasMap,
                canvas = null,
                view = null;

            if(canvasMap.hasChild(CanvasType.UI)){
                let data:CanvasMapData = canvasMap.getChild(<any>CanvasType.UI);

                this._canvas = data.canvas;
                this.context = data.context;

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

            canvasMap.addChild(<any>CanvasType.UI, {
                canvas:this._canvas,
                context:this.context
            });
        }
    }
}
