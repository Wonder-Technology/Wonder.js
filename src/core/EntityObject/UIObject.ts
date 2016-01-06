module wd {
    export class UIObject extends GameEntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:RectTransform;

        public name:string = `uiObject${String(this.uid)}`;
        public uiManager:UIManager = UIManager.create(this);

        protected children:wdCb.Collection<UIObject>;

        protected beforeUpdateChildren(elapsedTime:number){
            this.uiManager.update(elapsedTime);
        }

        protected createTransform(){
            return RectTransform.create();
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
    }
}

