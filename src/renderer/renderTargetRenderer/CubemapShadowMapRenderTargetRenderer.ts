module wd {
    export class CubemapShadowMapRenderTargetRenderer extends CubemapRenderTargetRenderer{
        public static create(shadowMap:CubemapShadowMapTexture, light:PointLight, layer:string) {
            var obj = new this(shadowMap, light, layer);

            obj.initWhenCreate();

            return obj;
        }

        constructor(shadowMap:CubemapShadowMapTexture, light:PointLight, layer:string){
            super(shadowMap);

            this._light = light;
            this._layer = layer;
        }

        protected texture:CubemapShadowMapTexture;

        private _light:PointLight = null;
        private _layer:string = null;
        private _mapManager:MapManager = MapManager.create(null);
        private _shadowMapRendererUtils:CubemapShadowMapRenderTargetRendererUtils = null;


        public initWhenCreate(){
            this._shadowMapRendererUtils = CubemapShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            if (!this._mapManager.hasCubemapShadowMap(this.texture)) {
                this._mapManager.addCubemapShadowMap(this.texture);
            }

            super.initWhenCreate();
        }

        public init(){
            this._mapManager.init();

            super.init();
        }

        public dispose(){
            super.dispose();

            //todo test
            this._mapManager.dispose();
            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected  getRenderList():wdCb.Hash<wdCb.Collection<GameObject>>{
            var renderList = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).getShadowRenderListByLayer(this._layer);

            return wdCb.Hash.create<wdCb.Collection<GameObject>>({
                px:renderList,
                nx:renderList,
                py:renderList,
                ny:renderList,
                pz:renderList,
                nz:renderList,
            });
        }

        protected renderRenderer(renderer){
            renderer.webglState = BuildShadowMapState.create();
            renderer.render();
        }

        protected beforeRender(){
            var scene:SceneDispatcher = null;

            Director.getInstance().scene.glslData.appendChild(<any>EShaderGLSLData.CUBEMAP_SHADOWMAP, {
                light: this._light
            });

            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            scene = Director.getInstance().scene;

            scene.useShaderType(EShaderTypeOfScene.BUILD_CUBEMAP_SHADOWMAP);

            /*! no need to send texture unit data
             because glsl only bind one texture, and its unit is 0 defaultly
             */
            this._mapManager.bindAndUpdate();

            scene.glslData.appendChild(<any>EShaderGLSLData.BUILD_CUBEMAP_SHADOWMAP, {
                light: this._light
            });
        }

        protected afterRender(){
            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            Director.getInstance().scene.unUseShader();
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

        //private _convertRenderListToCollection(renderList:wdCb.Hash<wdCb.Collection<GameObject>>):wdCb.Collection<GameObject>{
        //    var resultList = wdCb.Collection.create<GameObject>();
        //
        //    renderList.forEach((list) => {
        //        //if(list instanceof wdCb.Collection || JudgeUtils.isArrayExactly(list)){
        //        resultList.addChildren(list);
        //        //}
        //        //else{
        //        //    Log.error(true, Log.info.FUNC_MUST_BE("array or collection"));
        //        //}
        //    });
        //
        //    return resultList;
        //}

        //private _handleShadowRendererList(){
        //    var self = this,
        //        childrenMap = wdCb.Hash.create<Array<GameObject>>();
        //
        //    this._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>, direction:string) => {
        //        var children = [];
        //
        //        childList.forEach((renderTarget:GameObject) => {
        //            children = children.concat(self._shadowMapRendererUtils.addAllChildren(renderTarget));
        //        });
        //
        //
        //        childrenMap.addChild(direction, children);
        //    },this);
        //
        //    this._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>, direction:string) => {
        //        childList.addChildren(childrenMap.getChild(direction));
        //    });
        //
        //    this._light.shadowRenderList.forEach((childList:wdCb.Collection<GameObject>) => {
        //        childList.removeChild((renderTarget:GameObject) => {
        //            return self._shadowMapRendererUtils.isContainer(renderTarget);
        //        });
        //    });
        //}

        //private _setCubemapShadowMapOfSceneBuildShadowMapShader(){
        //    var scene = Director.getInstance().scene;
        //
        //    scene.getShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_INSTANCE).mapManager = this._mapManager;
        //    scene.getShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_NO_INSTANCE).mapManager = this._mapManager;
        //}
    }
}

