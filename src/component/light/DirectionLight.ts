/// <reference path="../../filePath.d.ts"/>
module wd{
    export class DirectionLight extends Light{
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
        set shadowRenderList(shadowRenderList:any) {
            if (JudgeUtils.isArray(shadowRenderList)) {
                this._shadowRenderList = wdCb.Collection.create<GameObject>(shadowRenderList);
            }
            else if (shadowRenderList instanceof wdCb.Collection) {
                this._shadowRenderList = shadowRenderList;
            }
            else {
                Log.error(true, Log.info.FUNC_MUST_BE("shadowRenderList", "array or wdCb.Collection"));
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

        private _beforeInitHandler:() => void = null;

        public initWhenCreate(){
            this._beforeInitHandler = wdCb.FunctionUtils.bind(this, () => {
                if(this.castShadow){
                    this.shadowMap = TwoDShadowMapTexture.create();

                    this.shadowMapRenderer = TwoDShadowMapRenderTargetRenderer.create(this);
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

            EventManager.off(<any>EngineEvent.BEFORE_INIT, this._beforeInitHandler);
        }
    }
}

