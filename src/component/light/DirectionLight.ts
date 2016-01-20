module wd{
    export class DirectionLight extends SourceLight{
        public static type:string = "directionLight";
        public static defaultPosition:Vector3 = Vector3.create(0, 0, 1);

        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _shadowRenderList:wdCb.Collection<GameObject> = null;
        get shadowRenderList(){
            return this._shadowRenderList;
        }
        @requireSetter(function(shadowRenderList:any){
            assert(JudgeUtils.isArray(shadowRenderList), Log.error(true, Log.info.FUNC_MUST_BE("shadowRenderList", "array")));
        })
        set shadowRenderList(shadowRenderList:any) {
            this._shadowRenderList = wdCb.Collection.create<GameObject>(shadowRenderList);
        }

        public intensity:number = 1;
        //todo extract Shadow class?
        public shadowCameraLeft:number = -1000;
        public shadowCameraRight:number = 1000;
        public shadowCameraTop:number = 1000;
        public shadowCameraBottom:number = -1000;

        public shadowMap:TwoDShadowMapTexture;
        public shadowMapRenderer:TwoDShadowMapRenderTargetRenderer;

        protected createShadowMap(){
            return TwoDShadowMapTexture.create();
        }

        protected createShadowMapRenderer(){
            return TwoDShadowMapRenderTargetRenderer.create(this);
        }
    }
}

