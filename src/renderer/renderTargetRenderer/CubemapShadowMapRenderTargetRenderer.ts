module wd {
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

            this._handleShadowRendererList();

            this._shadowMapRendererUtils.bindEndLoop(() => {
                self._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>) => {
                    childList.forEach((child:GameObject) => {
                        self._shadowMapRendererUtils.clearCubemapShadowMapData(child);
                    });
                });
            });

            this._shadowMapRendererUtils.createShaderWithShaderLib(BuildCubemapShadowMapShaderLib.create());

            super.init();
        }

        public dispose(){
            super.dispose();

            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected  getRenderList():wdCb.Hash<wdCb.Collection<GameObject>>{
            return this._light.shadowRenderList;
        }

        protected beforeRender(){
            var utils:CubemapShadowMapRenderTargetRendererUtils = this._shadowMapRendererUtils;

            this._convertRenderListToCollection(this.getRenderList()).removeRepeatItems().forEach((child:GameObject) => {
                utils.setShadowMapData(child);
            });


            this._shadowMapRendererUtils.beforeRender();
        }

        protected afterRender(){
            this._shadowMapRendererUtils.afterRender();
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

        private _convertRenderListToCollection(renderList:wdCb.Hash<wdCb.Collection<GameObject>>):wdCb.Collection<GameObject>{
            var resultList = wdCb.Collection.create<GameObject>();

            renderList.forEach((list) => {
                //if(list instanceof wdCb.Collection || JudgeUtils.isArrayExactly(list)){
                resultList.addChildren(list);
                //}
                //else{
                //    Log.error(true, Log.info.FUNC_MUST_BE("array or collection"));
                //}
            });

            return resultList;
        }

        private _handleShadowRendererList(){
            var self = this,
                childrenMap = wdCb.Hash.create<Array<GameObject>>();

            this._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>, direction:string) => {
                var children = [];

                childList.forEach((renderTarget:GameObject) => {
                    children = children.concat(self._shadowMapRendererUtils.addAllChildren(renderTarget));
                });


                childrenMap.addChild(direction, children);
            },this);

            this._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>, direction:string) => {
                childList.addChildren(childrenMap.getChild(direction));
            });

            this._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>) => {
                childList.removeChild((renderTarget:GameObject) => {
                    return self._shadowMapRendererUtils.isContainer(renderTarget);
                });
            });
        }
    }
}
