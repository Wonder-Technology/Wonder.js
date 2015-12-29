/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class UI extends Component{
        protected p_dirty:boolean = true;
        @virtual
        get dirty(){
            return this.p_dirty;
        }
        set dirty(dirty:boolean){
            this.p_dirty = dirty;
        }

        public context:CanvasRenderingContext2D = null;


        public abstract init();
        public abstract update(elapsedTime:number);

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            gameObject.uiManager.addChild(this);
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.uiManager.removeChild(this);
        }

        protected getContext() {
            return this.getUIRenderer().context;
        }

        @require(function () {
            assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"))
        })
        protected getUIRenderer(){
            return this.gameObject.getComponent<UIRenderer>(UIRenderer);
        }
    }
}

