module wd {
    export abstract class UI extends Component{
        @virtual
        get dirty(){
            var renderer = this.getUIRenderer();

            if(!renderer){
                return true;
            }

            return renderer.dirty;
        }
        set dirty(dirty:boolean){
            if(dirty){
                var renderer = this.getUIRenderer();

                if(!renderer){
                    return;
                }

                renderer.dirty = dirty;
            }
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

        @virtual
        protected draw(elapsedTime:number){
        }

        @virtual
        protected shouldNotUpdate(){
            return false;
        }

        protected getContext() {
            return this.getUIRenderer().context;
        }

        protected getCanvas() {
            return this.getUIRenderer().canvas;
        }

        //@require(function () {
        //    assert(this.entityObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("entityObject", "contain UIRenderer"))
        //})
        protected getUIRenderer(){
            if(!this.entityObject){
                return null;
            }

            return this.entityObject.getComponent<UIRenderer>(UIRenderer);
        }


        protected drawInCenterPoint(context:CanvasRenderingContext2D, source:any, position:Vector2, width:number, height:number);
        protected drawInCenterPoint(context:CanvasRenderingContext2D, source:any, sx:number, sy:number, sw:number, sh:number, position:Vector2, width:number, height:number);

        protected drawInCenterPoint(...args){
            var context:CanvasRenderingContext2D = args[0],
                source:any = args[1];

            if(args.length === 5){
                let position:Vector2 = args[2],
                    width:number = args[3],
                    height:number = args[4];

                context.drawImage(
                    source,
                    position.x - width / 2, position.y - height / 2,
                    width,
                    height
                );
            }
            else if(args.length === 9){
                let sx:number = args[2],
                    sy:number = args[3],
                    sw:number = args[4],
                    sh:number = args[5],
                    position:Vector2 = args[6],
                    width:number = args[7],
                    height:number = args[8];

                context.drawImage(
                    source, sx, sy, sw, sh,
                    position.x - width / 2, position.y - height / 2,
                    width,
                    height
                );
            }
        }

        private _setCanvasTransformForRotation(){
            var matrix = this.entityObject.transform.rotationMatrix;

            this.context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        }
    }
}

