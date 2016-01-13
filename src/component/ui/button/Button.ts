module wd {
    export class Button extends InteractionUI {
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        //todo test change transitionMode
        //todo test change text


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
            var fontObject = null,
                font = PlainFont.create(),
                transform = this.entityObject.transform;

            font.text = this._text;
            font.enableFill("#000000");
            font.xAlignment = wd.FontXAlignment.CENTER;
            font.yAlignment = wd.FontYAlignment.MIDDLE;

            fontObject = UIObject.create();

            fontObject.addComponent(font);

            fontObject.addComponent(this.getUIRenderer());


            fontObject.transform.width = transform.width;
            fontObject.transform.height = transform.height;

            return fontObject;
        }
    }
}

