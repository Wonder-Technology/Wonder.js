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


        public init(){
            this.context = this.getContext();
        }

        public addToObject(entityObject:UIObject){
            super.addToObject(entityObject);

            entityObject.uiManager.addChild(this);
        }

        public removeFromObject(entityObject:UIObject){
            super.removeFromObject(entityObject);

            entityObject.uiManager.removeChild(this);
        }

        @require(function(elapsedTime:number){
            assert(this.context !== null, Log.info.FUNC_SHOULD("set context"));
        })
        public update(elapsedTime:number){
            var context = this.context;

            if(this.shouldNotUpdate()){
                return;
            }

            context.save();

            this._setCanvasTransformForRotation();

            this.draw(elapsedTime);

            context.restore();
        }

        protected abstract draw(elapsedTime:number);

        @virtual
        protected shouldNotUpdate(){
            return false;
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

        private _setCanvasTransformForRotation(){
            if(this.entityObject.transform.isRotate){
                let matrix = this.entityObject.transform.rotationMatrix;

                this.context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
            }
        }
    }
}

