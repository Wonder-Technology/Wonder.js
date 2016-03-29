module wd {
    export class TwoDShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(shadowMap:TwoDShadowMapTexture, light:DirectionLight) {
            var obj = new this(shadowMap, light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(shadowMap:TwoDShadowMapTexture, light:DirectionLight){
            super(shadowMap);

            this._light = light;
        }

        protected texture:TwoDShadowMapTexture;

        private _light:DirectionLight = null;
        //private _allShadowRenderList:wdCb.Collection<GameObject> = null;

        private _shadowMapRendererUtils:TwoDShadowMapRenderTargetRendererUtils = null;

        @require(function(){
            //assert(!!this._light.shadowMap, Log.info.FUNC_SHOULD("create shadowMap before create shadowMap renderTargetRenderer"));
        })
        public initWhenCreate(){
            //var self = this;

            this._shadowMapRendererUtils = TwoDShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            super.initWhenCreate();
            //
            //this._allShadowRenderList = this._getAllShadowRenderList();
            //
            ////todo optimize:operate these logic once
            //
            //this._shadowMapRendererUtils.bindEndLoop(() => {
            //    //here not need removeRepeatItems
            //    //self._allShadowRenderList.forEach((child:GameObject) => {
            //    //    self._shadowMapRendererUtils.clearTwoDShadowMapData(child);
            //    //});
            //
            //
            //    Director.getInstance().scene.glslData.removeChild(<any>EShaderGLSLData.TWOD_SHADOWMAP);
            //});
            //
            //
            //this._allShadowRenderList.forEach((child:GameObject) => {
            //    var material:Material = child.getComponent<Geometry>(Geometry).material;
            //
            //    if(!material.hasShader(<any>EShaderMapKey.BUILD_SHADOWMAP)){
            //        let shader:CommonShader = CommonShader.create(null);
            //
            //        shader.addLib(CommonShaderLib.create());
            //        shader.addLib(VerticeCommonShaderLib.create());
            //
            //        if(RenderUtils.isInstanceAndHardwareSupport(child)){
            //            shader.addLib(ModelMatrixInstanceShaderLib.create());
            //        }
            //        else{
            //            shader.addLib(ModelMatrixNoInstanceShaderLib.create());
            //        }
            //
            //        shader.addLib(BuildTwoDShadowMapShaderLib.create());
            //
            //
            //
            //
            //
            //
            //        //todo note!
            //        shader.init(material);
            //
            //        material.addShader(<any>EShaderMapKey.BUILD_SHADOWMAP, shader);
            //    }
            //
            //
            //    material.forEachShader((shader:Shader) => {
            //        if(!shader.mapManager.hasTwoDShadowMap(self.texture)){
            //            //todo optimize:addArrayMap?
            //            shader.mapManager.addTwoDShadowMap(self.texture);
            //        }
            //    });
            //});
        }

        public dispose(){
            super.dispose();

            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
            var self = this;

            Director.getInstance().scene.glslData.appendChild(<any>EShaderGLSLData.TWOD_SHADOWMAP, {
                camera: renderCamera.getComponent(CameraController),
                light: this._light
            });
            //
            ////todo optimize: if light not translate and not change light(not dirty), not set(refresh) shadow map data
            ////here need removeRepeatItems??????
            //this._allShadowRenderList.forEach((child:GameObject) => {
            //    self._shadowMapRendererUtils.setShadowMapData(child, renderCamera);
            //});
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            //return this._light.shadowRenderList;

            //return this._light.shadowRenderList
            //    .filter((child:GameObject, index:number) => {
            //        return child.isVisible && (GPUDetector.getInstance().extensionInstancedArrays === null || !child.hasComponent(ObjectInstance));
            //    });

            return Director.getInstance().scene.gameObjectScene.shadowRenderListForBuildShadowMap;
        }

        protected renderRenderer(renderer){
            renderer.render();
        }

        protected beforeRender(){
            this._shadowMapRendererUtils.beforeRender();
        }

        protected afterRender(){
            this._shadowMapRendererUtils.afterRender();
        }

        //todo optimize: if light not translate, not create camera
        protected createCamera():GameObject{
            var orthoCameraComponent = OrthographicCamera.create(),
                light:DirectionLight = this._light,
                camera = GameObject.create();

            orthoCameraComponent.left = light.shadowCameraLeft;
            orthoCameraComponent.right = light.shadowCameraRight;
            orthoCameraComponent.top = light.shadowCameraTop;
            orthoCameraComponent.bottom = light.shadowCameraBottom;
            orthoCameraComponent.near = light.shadowCameraNear;
            orthoCameraComponent.far = light.shadowCameraFar;

            camera.addComponent(BasicCameraController.create(orthoCameraComponent));

            //todo optimize:dirty?
            camera.transform.translate(light.position);
            camera.transform.lookAt(0, 0, 0);

            camera.init();

            return camera;
        }

        private _getAllShadowRenderList(){
            var list = wdCb.Collection.create<GameObject>();
            var find = (renderObject:GameObject) => {
                if(renderObject.hasComponent(Geometry)){
                    list.addChild(renderObject);
                }

                renderObject.forEach((child:GameObject) => {
                    find(child);
                })
            };

            this.getRenderList().forEach((renderObject:GameObject) => {
                find(renderObject);
            });

            return list.removeRepeatItems();
        }
    }
}

