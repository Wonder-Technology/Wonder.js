module wd{
    export class PointLight extends SourceLight{
        public static type:string = "pointLight";

        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        private _rangeLevel:number = null;
        get rangeLevel(){
            return this._rangeLevel;
        }
        set rangeLevel(rangeLevel:number){
            this._rangeLevel = rangeLevel;
            this._attenuation.rangeLevel = this._rangeLevel;
        }

        get range(){
            return this._attenuation.range;
        }
        set range(range:number){
            this._attenuation.range = range;
        }

        get constant(){
            return this._attenuation.constant;
        }
        set constant(constant:number){
            this._attenuation.constant = constant;
        }

        get linear(){
            return this._attenuation.linear;
        }
        set linear(linear:number){
            this._attenuation.linear = linear;
        }

        get quadratic(){
            return this._attenuation.quadratic;
        }
        set quadratic(quadratic:number){
            this._attenuation.quadratic = quadratic;
        }

        private _shadowRenderList:wdCb.Hash<wdCb.Collection<GameObject>> = wdCb.Hash.create<wdCb.Collection<GameObject>>();
        get shadowRenderList(){
            return this._shadowRenderList;
        }
        @requireSetter(function(shadowRenderList:any){
            assert(JudgeUtils.isDirectObject(shadowRenderList), Log.error(true, Log.info.FUNC_MUST_BE("shadowRenderList", "object")));

            for(let direction in shadowRenderList){
                if(shadowRenderList.hasOwnProperty(direction)){
                    let list = shadowRenderList[direction];

                    assert(JudgeUtils.isArray(list) || shadowRenderList instanceof wdCb.Hash, Log.error(true, Log.info.FUNC_MUST_BE("renderList in each direction of shadowRenderList", "array")));
                }
            }

        })
        set shadowRenderList(shadowRenderList:any) {
            shadowRenderList = <{
                px:Array<GameObject>,
                nx:Array<GameObject>,
                py:Array<GameObject>,
                ny:Array<GameObject>,
                pz:Array<GameObject>,
                nz:Array<GameObject>
            }> shadowRenderList;

            for(let direction in shadowRenderList){
                if(shadowRenderList.hasOwnProperty(direction)){
                    let list = shadowRenderList[direction];

                    this._shadowRenderList.addChild(direction, wdCb.Collection.create<GameObject>(list));
                }
            }
        }

        public shadowMap:CubemapShadowMapTexture;
        public shadowMapRenderer:CubemapShadowMapRenderTargetRenderer;

        private _attenuation:Attenuation = Attenuation.create();

        protected createShadowMap(){
            return CubemapShadowMapTexture.create();
        }

        protected createShadowMapRenderer(){
            return CubemapShadowMapRenderTargetRenderer.create(this);
        }
    }
}
