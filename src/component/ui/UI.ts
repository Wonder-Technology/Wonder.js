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

        get width(){
            return this.gameObject.transform.width;
        }

        get height(){
            return this.gameObject.transform.height;
        }

        public context:CanvasRenderingContext2D = null;
        public gameObject:UIObject;


        public abstract init();
        public abstract update(elapsedTime:number);

        public addToObject(gameObject:UIObject){
            super.addToObject(gameObject);

            gameObject.uiManager.addChild(this);
        }

        public removeFromObject(gameObject:UIObject){
            super.removeFromObject(gameObject);

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

        protected drawInCenterPoint(context:CanvasRenderingContext2D, source:any, sx:number, sy:number, sw:number, sh:number, position:Vector2, width:number, height:number){
            context.drawImage(
                source, sx, sy, sw, sh,
                position.x - width / 2, position.y - height / 2,
                width,
                height
            );
        }
    }
}

