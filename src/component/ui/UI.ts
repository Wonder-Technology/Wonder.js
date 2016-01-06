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
            return this.entityObject ? this.entityObject.transform.width : null;
        }

        get height(){
            return this.entityObject ? this.entityObject.transform.height : null;
        }

        public entityObject:UIObject;
        public context:CanvasRenderingContext2D = null;

        private _isInit:boolean = false;


        public abstract update(elapsedTime:number);

        public init(){
            if(this._isInit){
                return;
            }

            this._isInit = true;

            this.context = this.getContext();

            this.handleInit();
        }

        public addToObject(entityObject:UIObject){
            super.addToObject(entityObject);

            entityObject.uiManager.addChild(this);
        }

        public removeFromObject(entityObject:UIObject){
            super.removeFromObject(entityObject);

            entityObject.uiManager.removeChild(this);
        }

        @virtual
        protected handleInit(){
        }

        protected getContext() {
            return this.getUIRenderer().context;
        }

        @require(function () {
            assert(this.entityObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("entityObject", "contain UIRenderer"))
        })
        protected getUIRenderer(){
            return this.entityObject.getComponent<UIRenderer>(UIRenderer);
        }

        protected drawInCenterPoint(context:CanvasRenderingContext2D, source:any, sx:number, sy:number, sw:number, sh:number, position:Vector2, width:number, height:number){
            context.drawImage(
                source, sx, sy, sw, sh,
                position.x - width / 2, position.y - height / 2,
                width,
                height
            );
        }

        protected setCanvasTransformForRotation(){
            var matrix = this.entityObject.transform.rotationMatrix;

            if(this.entityObject.transform.isRotate){
                this.context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            }
        }
    }
}

