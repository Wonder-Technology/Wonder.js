/// <reference path="../../filePath.d.ts"/>
module wd{
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


            //if (JudgeUtils.isDirectObject(shadowRenderList)) {
            //    this._shadowRenderList = wdCb.Hash.create<Array<GameObject>|wdCb.Collection<GameObject>>(shadowRenderList);
            //}
            //else if (shadowRenderList instanceof wdCb.Hash) {
            //    this._shadowRenderList = shadowRenderList;
            //}

            for(let direction in shadowRenderList){
                if(shadowRenderList.hasOwnProperty(direction)){
                    let list = shadowRenderList[direction];

                    this._shadowRenderList.addChild(direction, wdCb.Collection.create<GameObject>(list));
                }
            }
            //
            //this._shadowRenderList = wdCb.Hash.create<wdCb.Collection<GameObject>>(shadowRenderList);
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

        public dispose(){
            if(this.castShadow){
                this.shadowMap.dispose();

                Director.getInstance().scene.removeRenderTargetRenderer(this.shadowMapRenderer);
            }
        }
    }
}
