module wd {
    export class UIRenderer extends RendererComponent {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _zIndex:number = 1;
        get zIndex(){
            return this._zIndex;
        }
        set zIndex(zIndex:number){
            if(zIndex !== this._zIndex){
                this._zIndex = zIndex;

                if(this._canvas){
                    wdCb.DomQuery.create(this._canvas).css("zIndex", zIndex);
                }
            }
        }

        public dirtyDuringCurrentLoop:boolean = false;
        private _dirty:boolean = true;
        get dirty(){
            return this._dirty;
        }
        set dirty(dirty:boolean){
            if(dirty){
                this._dirty = true;

                this.dirtyDuringCurrentLoop = true;
            }
        }

        public context:any = null;
        public isClearCanvas:boolean = false;
        public state:UIRendererState = UIRendererState.NORMAL;

        private _canvas:HTMLCanvasElement = null;
        private _isInit:boolean = false;
        private _referenceList:wdCb.Collection<UIObject> = wdCb.Collection.create<UIObject>();

        public resetDirty(){
            this._dirty = false;
        }

        public addToObject(object:UIObject){
            this._referenceList.addChild(object);

            /*!
             uiRenderer may be shared by multi objects, so this.object is the last one which share this
             */
            this.entityObject = object;
        }

        public removeFromObject(object:UIObject){
            this._referenceList.removeChild(object);

            if(this._referenceList.getCount() > 0){
                return;
            }

            super.removeFromObject(object);
        }

        public init(){
            if(this._isInit){
                return;
            }

            this._isInit = true;
        }

        public initWhenCreate(){
            this._createOverlayCanvas();
        }

        public dispose(){
            if(this._referenceList.getCount() > 0){
                return;
            }

            wdCb.DomQuery.create(this._canvas).remove();
        }

        public render(renderer:Renderer, geometry:Geometry, camera:GameObject){
        }

        public clearCanvas(){
            this.context.clearRect(0, 0, this._canvas.width, this._canvas.height);

            this.isClearCanvas = true;
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
            canvas.css("zIndex", this.zIndex);

            canvas.attr("width", view.width);
            canvas.attr("height", view.height);

            this._canvas = canvas.get(0);
            this.context = this._canvas.getContext("2d");
        }
    }
}
