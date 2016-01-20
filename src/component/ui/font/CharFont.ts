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

        @execOnlyOnce("_isInit")
        public init(){
            var self = this;

            super.init();

            this._subscription = wdFrp.fromArray([EventManager.fromEvent(this.entityObject, <any>EngineEvent.TRANSFORM_TRANSLATE), EventManager.fromEvent(this.entityObject, <any>EngineEvent.TRANSFORM_ROTATE), EventManager.fromEvent(this.entityObject, <any>EngineEvent.TRANSFORM_SCALE)])
            .mergeAll()
            .subscribe(() => {
                self.dirty = true;
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

            transform = this.entityObject.transform;
            position = transform.position;

            dw = this.width;
            dh = this.height;

            this.drawInCenterPoint(this.context, this.image, this.rectRegion.x, this.rectRegion.y, this.rectRegion.width, this.rectRegion.height,
                position, dw, dh);
        }
    }
}

