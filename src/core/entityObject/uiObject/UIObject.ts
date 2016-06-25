module wd {
    export class UIObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:RectTransform;
        public parent:UIObject;


        protected children:wdCb.Collection<UIObject>;

        protected createTransform(){
            return RectTransform.create();
        }

        public initWhenCreate(){
            super.initWhenCreate();

            this.name = `uiObject${String(this.uid)}`;
        }

        @require(function(component:Component){
            if(component instanceof UITwoD){
                assert(!!!this.getComponent(UITwoD), Log.info.FUNC_SHOULD("only has one UITwoD component"));
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

