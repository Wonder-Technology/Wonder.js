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
        //private _mapManager:MapManager = MapManager.create(null);
        //private _buildShadowMapShader:CommonShader = CommonShader.create(null);
        private _shadowMapRendererUtils:CubemapShadowMapRenderTargetRendererUtils = null;


        public initWhenCreate(){
            //var mapManager:MapManager = this._buildShadowMapShader.mapManager;

            this._shadowMapRendererUtils = CubemapShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            //if (!mapManager.hasCubemapShadowMap(this.texture)) {
            //    mapManager.addCubemapShadowMap(this.texture);
            //}

            //this._buildShadowMapShader.addLib(BuildCubemapShadowMapShaderLib.create());

            super.initWhenCreate();
        }

        public dispose(){
            super.dispose();

            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
            Director.getInstance().scene.glslData.addChild(<any>EShaderGLSLData.BUILD_CUBEMAP_SHADOWMAP, {
                //camera: renderCamera.getComponent(CameraController),
                light: this._light
            });
            Director.getInstance().scene.glslData.appendChild(<any>EShaderGLSLData.CUBEMAP_SHADOWMAP, {
                //camera: renderCamera.getComponent(CameraController),
                light: this._light
            });
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
            this._shadowMapRendererUtils.beforeRender();

            //this._mapManager.bindAndUpdate();
            ///*! no need to send texture unit data
            // because glsl only bind one texture, and its unit is 0 defaultly
            //
            // //this._mapManager.sendData();
            // */

            //this._buildShadowMapShader.update(null, null);
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
    }
}

