module wd {
    export class UIObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:RectTransform;
        public parent:UIObject;

        public uiManager:UIManager = null;

        protected children:wdCb.Collection<UIObject>;

        protected beforeUpdateChildren(elapsedTime:number){
            this.uiManager.update(elapsedTime);
        }

        protected createTransform(){
            return RectTransform.create();
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.name = `uiObject${String(this.uid)}`;

            this.uiManager = UIManager.create();
            this.addComponent(this.uiManager);
        }

        @require(function(component:Component){
            if(component instanceof UI){
                assert(!!!this.getComponent(UI), Log.info.FUNC_SHOULD("only has one UI component"));
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

