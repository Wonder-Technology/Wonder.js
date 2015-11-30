/// <reference path="../../filePath.d.ts"/>
module dy{
    export class PointLight extends Light{
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

        get constant(){
            return this._attenuation.constant;
        }

        get linear(){
            return this._attenuation.linear;
        }

        get quadratic(){
            return this._attenuation.quadratic;
        }

        private _shadowRenderList:wdCb.Hash<Array<GameObject>|wdCb.Collection<GameObject>> = null;
        get shadowRenderList(){
            return this._shadowRenderList;
        }
        set shadowRenderList(shadowRenderList:any) {
            if (JudgeUtils.isDirectObject(shadowRenderList)) {
                this._shadowRenderList = wdCb.Hash.create<Array<GameObject>|wdCb.Collection<GameObject>>(shadowRenderList);
            }
            else if (shadowRenderList instanceof wdCb.Hash) {
                this._shadowRenderList = shadowRenderList;
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("shadowRenderList", "object or wdCb.Hash"));
            }
        }

        public intensity:number = 1;

        public shadowMap:CubemapShadowMapTexture;
        public shadowMapRenderer:CubemapShadowMapRenderTargetRenderer;

        private _attenuation:Attenuation = Attenuation.create();
        private _beforeInitHandler:() => void = null;

        public initWhenCreate(){
            this._beforeInitHandler = wdCb.FunctionUtils.bind(this, () => {
                if(this.castShadow){
                    this.shadowMap = CubemapShadowMapTexture.create();

                    this.shadowMapRenderer = CubemapShadowMapRenderTargetRenderer.create(this);
                    Director.getInstance().scene.addRenderTargetRenderer(this.shadowMapRenderer);
                }
            });

            EventManager.on(<any>EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        }

        public init(){
        }

        public dispose(){
            if(this.castShadow){
                this.shadowMap.dispose();

                Director.getInstance().scene.removeRenderTargetRenderer(this.shadowMapRenderer);
            }
        }
    }
}
