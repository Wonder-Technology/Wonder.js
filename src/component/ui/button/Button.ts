module wd {
    export class Button extends InteractionUI {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        //todo test machine transitionMode


        private _text:string = null;
        get text(){
            var fontObject = null;

            if(this.entityObject === null){
                return this._text;
            }

            fontObject = this.getFontObject();

            if(fontObject){
                return fontObject.getComponent(PlainFont).text;
            }

            return null;
        }
        set text(text:string){
            var fontObject:UIObject = null;

            this._text = text;

            if(this.entityObject === null || !this.getUIRenderer()){
                return;
            }

            fontObject = this.getFontObject();

            if(fontObject){
                fontObject.getComponent<PlainFont>(PlainFont).text = text;
            }
            else{
                this.entityObject.addChild(this._createFontObject());
            }
        }

        private _mousedownSubscription:wdFrp.IDisposable = null;
        private _mouseupSubscription:wdFrp.IDisposable = null;
        private _mouseoverSubscription:wdFrp.IDisposable = null;
        private _mouseoutSubscription:wdFrp.IDisposable = null;
        private _stateMachine:UIStateMachine = UIStateMachine.create(this);

        public initWhenCreate() {
            this.transitionMode = TransitionMode.SPRITE;
            this.text = "button";
        }

        public init(){
            super.init();

            if(!this._hasFontObject()){
                this.entityObject.addChild(this._createFontObject());
            }

            if(this.entityObject.transform.isTransform){
                this.entityObject.transform.setChildrenTransform();
            }

            this._bindEvent();
        }

        public dispose(){
            super.dispose();

            this._mousedownSubscription.dispose();
            this._mouseupSubscription.dispose();
            this._mouseoverSubscription.dispose();
            this._mouseoutSubscription.dispose();
        }

        private _hasFontObject(){
            return !!this.getFontObject();
        }

        public getFontObject():UIObject{
            return this.entityObject.filter((child:UIObject) => {
                return child.hasComponent(PlainFont);
            }).getChild(0);
        }

        public enable() {
            this._stateMachine.changeState(UIState.NORMAL);
        }

        public disable() {
            this._stateMachine.changeState(UIState.DISABLED);
        }

        public isDisabled(){
            return this._stateMachine.getCurrentState() === UIState.DISABLED;
        }

        public getCurrentState(){
            return this._stateMachine.getCurrentState();
        }

        protected shouldNotUpdate() {
            return this.transition.target === null;
        }

        protected draw(elapsedTime:number) {
            switch (this.p_transitionMode) {
                case TransitionMode.SPRITE:
                    this.drawInCenterPoint(this.context, this.transition.target.source, this.entityObject.transform.position, this.width, this.height);
                    break;
                default:
                    Log.error(true, Log.info.FUNC_UNEXPECT("transitionMode"));
                    break;

            }
        }

        private _createFontObject(){
            var fontObject = UIObject.create(),
                font = PlainFont.create(),
                transform = this.entityObject.transform;

            font.text = this._text;
            font.enableFill("#000000");
            font.xAlignment = wd.FontXAlignment.CENTER;
            font.yAlignment = wd.FontYAlignment.MIDDLE;

            fontObject.addComponent(font);

            fontObject.addComponent(this.getUIRenderer());

            fontObject.transform.width = transform.width;
            fontObject.transform.height = transform.height;

            return fontObject;
        }

        private _bindEvent(){
            var self = this;

            this._mousedownSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_DOWN)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.changeState(UIState.PRESSED);
                });

            this._mouseupSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_UP)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.backState();
                });


            this._mouseoverSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_OVER)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.changeState(UIState.HIGHLIGHT);
                });

            this._mouseoutSubscription = EventManager.fromEvent(this.entityObject, <any>EngineEvent.MOUSE_OUT)
                .filter((e:CustomEvent) => {
                    return !self.isDisabled();
                })
                .subscribe((e:CustomEvent) => {
                    self._stateMachine.backState();
                });
        }
    }
}

