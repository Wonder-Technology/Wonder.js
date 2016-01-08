module wd {
    export class CharFont extends Font {
        public static create() {
            var obj = new this();

            return obj;
        }

        get x(){
            return this.entityObject.transform.position.x;
        }
        set x(x:number){
            var position = this.entityObject.transform.position;

            this.entityObject.transform.position = Vector2.create(x, position.y);
        }

        get y(){
            return this.entityObject.transform.position.y;
        }

        private _char:string = null;
        get char(){
            return this._char;
        }
        set char(char:string){
            if(this._char !== null){
                Log.log(Log.info.FUNC_NOT_SUPPORT("change char"));
                return;
            }

            this._char = char;
        }

        public startPosX:number = null;
        public xAdvance:number = null;
        public image:HTMLImageElement = null;
        public rectRegion:RectRegion = null;
        public isNewLine:boolean = false;
        public isFullLine:boolean = false;

        private _subscription:wdFrp.IDisposable = null;
        private _isInit:boolean = false;

        public init(){
            var self = this;

            if(this._isInit){
                return;
            }

            this._isInit = true;

            super.init();


            this._subscription = wdFrp.fromArray([EventManager.fromEvent(this.entityObject, <any>EngineEvent.TRANSFORM_TRANSLATE), EventManager.fromEvent(this.entityObject, <any>EngineEvent.TRANSFORM_ROTATE), EventManager.fromEvent(this.entityObject, <any>EngineEvent.TRANSFORM_SCALE)])
            .mergeAll()
            .subscribe(() => {
                self.p_dirty = true;
            });
        }

        public dispose(){
            super.dispose();

            this._subscription.dispose();
        }

        protected shouldNotUpdate(){
            return this.rectRegion === null || (this.width === 0 && this.height === 0);
        }

        protected draw(elapsedTime:number){
            var transform:RectTransform = null,
                position:Vector2 = null,
                dw = null,
                dh = null;

            //super.update(elapsedTime);
            //
            //if(this.rectRegion === null || (this.width === 0 && this.height === 0)){
            //    return;
            //}

            transform = this.entityObject.transform;
            position = transform.position;

            dw = this.width;
            dh = this.height;

            //this.context.save();
            //
            //this.setCanvasTransformForRotation();

            this.drawInCenterPoint(this.context, this.image, this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
                position, dw, dh);

            //this.context.restore();
        }
    }
}

