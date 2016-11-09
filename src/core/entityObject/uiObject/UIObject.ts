module wd {
    export class UIObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:RectTransform;
        public parent:UIObject;

        @cloneAttributeAsBasicType()
        private _isVisible:boolean = true;
        get isVisible(){
            return this._isVisible;
        }
        set isVisible(isVisible:boolean){
            if(this._isVisible !== isVisible){
                this._isVisible = isVisible;

                UIRendererUtils.getUIRenderer(this).dirty = true;
            }
        }

        protected children:wdCb.Collection<UIObject>;

        protected createTransform(){
            return RectTransform.create();
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.name = `uiObject${String(this.uid)}`;
        }

        @require(function(component:Component){
            if(component instanceof TwoDUI){
                assert(!!!this.getComponent(TwoDUI), Log.info.FUNC_SHOULD("only has one TwoDUI component"));
            }
        })
        public addComponent(component:Component){
            super.addComponent(component);

            return this;
        }

        @require(function(child:EntityObject){
            assert(this.getComponent(UIRenderer) === child.getComponent(UIRenderer), Log.info.FUNC_MUST_BE("the UIRenderer of UIObject and its children", "the same one"))
        })
        public addChild(child:EntityObject){
            super.addChild(child);

            return this;

        }
    }
}

