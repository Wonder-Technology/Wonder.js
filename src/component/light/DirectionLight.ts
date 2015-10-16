/// <reference path="../../definitions.d.ts"/>
module dy{
    export class DirectionLight extends Light{
        public static type:string = "directionLight";
        public static defaultPosition:Vector3 = Vector3.create(0, 0, 1);

        public static create() {
            var obj = new this();

            return obj;
        }

        private _shadowRenderList:dyCb.Collection<GameObject> = null;
        get shadowRenderList(){
            return this._shadowRenderList;
        }
        set shadowRenderList(shadowRenderList:any) {
            if (JudgeUtils.isArray(shadowRenderList)) {
                this._shadowRenderList = dyCb.Collection.create<GameObject>(shadowRenderList);
            }
            else if (shadowRenderList instanceof dyCb.Collection) {
                this._shadowRenderList = shadowRenderList;
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("shadowRenderList", "array or dyCb.Collection"));
            }
        }

        public intensity:number = 1;
        //todo extract Shadow class?
        public shadowCameraLeft:number = -1000;
        public shadowCameraRight:number = 1000;
        public shadowCameraTop:number = 1000;
        public shadowCameraBottom:number = -1000;

        public shadowMap:TwoDShadowMapTexture;
        public shadowMapRenderer:TwoDShadowMapRenderTargetRenderer;

        public init(){
            if(this.castShadow){
                this.shadowMap = TwoDShadowMapTexture.create();

                this.shadowMapRenderer = TwoDShadowMapRenderTargetRenderer.create(this);
                Director.getInstance().stage.addRenderTargetRenderer(this.shadowMapRenderer);
            }
        }

        public dispose(){
            if(this.castShadow){
                this.shadowMap.dispose();

                Director.getInstance().stage.removeRenderTargetRenderer(this.shadowMapRenderer);
            }
        }
    }
}

