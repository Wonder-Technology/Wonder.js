/// <reference path="../../definitions.d.ts"/>
module dy {
    export class CubemapShadowMapRenderTargetRenderer extends CubemapRenderTargetRenderer{
        public static create(light:PointLight) {
            var obj = new this(light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(light:PointLight){
            super(light.shadowMap);

            this._light = light;
        }

        protected texture:CubemapShadowMapTexture;

        private _light:PointLight = null;

        private _shadowMapRendererUtils:CubemapShadowMapRenderTargetRendererUtils = null;


        public initWhenCreate(){
            this._shadowMapRendererUtils = CubemapShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            super.initWhenCreate();
        }

        public init(){
            var self = this;

            EventManager.on("dy_endLoop", () => {
                self._light.shadowRenderList.forEach((childList:Array<GameObject>|dyCb.Collection<GameObject>) => {
                    childList.forEach((child:GameObject) => {
                        self._shadowMapRendererUtils.clearCubemapShadowData(child);
                    });
                });
            });

            super.init();
        }

        protected warnTextureSizeExceedCanvasSize(){
            //not warn
        }

        protected  getRenderList():dyCb.Hash<Array<GameObject>|dyCb.Collection<GameObject>>{
            return this._light.shadowRenderList;
        }

        protected beforeRender(){
            var utils:CubemapShadowMapRenderTargetRendererUtils = this._shadowMapRendererUtils;

            this._convertRenderListToCollection(this.getRenderList()).removeRepeatItems().forEach((child:GameObject) => {
                utils.setShadowData(child);
            });


            Director.getInstance().stage.createShaderOnlyOnce(BuildCubemapShadowMapShaderLib.getInstance());

            Director.getInstance().stage.useProgram();
        }

        protected afterRender(){
            Director.getInstance().stage.unUseProgram();
        }

        protected setCamera(camera:PerspectiveCamera){
            var light:PointLight = this._light;

            camera.aspect = light.shadowMapWidth / light.shadowMapHeight;
            camera.near = light.shadowCameraNear;
            camera.far = light.shadowCameraFar;
        }

        protected getPosition(){
            return this._light.position;
        }

        private _convertRenderListToCollection(renderList:dyCb.Hash<Array<GameObject>|dyCb.Collection<GameObject>>):dyCb.Collection<GameObject>{
            var resultList = dyCb.Collection.create<GameObject>();

            renderList.forEach((list) => {
                if(list instanceof dyCb.Collection || JudgeUtils.isArray(list)){
                    resultList.addChildren(list);
                }
                else{
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST_BE("array or collection"));
                }
            });

            return resultList;
        }
    }
}
