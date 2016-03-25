module wd {
    export class TwoDShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(light:DirectionLight) {
            var obj = new this(light);

            obj.initWhenCreate();

            return obj;
        }

        constructor(light:DirectionLight){
            super(light.shadowMap);

            this._light = light;
        }

        protected texture:TwoDShadowMapTexture;

        private _light:DirectionLight = null;

        private _shadowMapRendererUtils:TwoDShadowMapRenderTargetRendererUtils = null;

        public initWhenCreate(){
            this._shadowMapRendererUtils = TwoDShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            super.initWhenCreate();
        }

        public init(){
            var self = this;

            this._list = this._getAllShadowRenderList();

            this._shadowMapRendererUtils.bindEndLoop(() => {
                //here not need removeRepeatItems
                //todo getRenderList()?
                self._list.forEach((child:GameObject) => {
                    self._shadowMapRendererUtils.clearTwoDShadowMapData(child);
                });
            });


            this._list.forEach((child:GameObject) => {
                var material:Material = child.getComponent<Geometry>(Geometry).material,
                    shader:CommonShader = CommonShader.create(null);
                //todo remove
                shader["name"] = "shadow";

                shader.addLib(CommonShaderLib.create());
                shader.addLib(VerticeCommonShaderLib.create());

                if(RenderUtils.isInstanceAndHardwareSupport(child)){
                    shader.addLib(ModelMatrixInstanceShaderLib.create());
                }
                else{
                    shader.addLib(ModelMatrixNoInstanceShaderLib.create());
                }

                shader.addLib(BuildTwoDShadowMapShaderLib.create());






                //todo note!
                shader.init(material);

                material.addShader(<any>EShaderMapKey.BUILD_SHADOWMAP, shader);
            });



            super.init();
        }

        public dispose(){
            super.dispose();

            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
            var self = this;

            //todo optimize: if light not translate and not change light(not dirty), not set(refresh) shadow map data
            //here need removeRepeatItems??????
            this._list.forEach((child:GameObject) => {
                self._shadowMapRendererUtils.setShadowMapData(child, renderCamera);
            });
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            //return this._light.shadowRenderList;

            //todo test
            return this._light.shadowRenderList
                .filter((child:GameObject, index:number) => {
                    return child.isVisible && (GPUDetector.getInstance().extensionInstancedArrays === null || !child.hasComponent(ObjectInstance));
                });
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
            var list = this._light.shadowRenderList.clone(),
            self = this,
            children = [];

            list.forEach((renderTarget:GameObject) => {
                children = children.concat(this._shadowMapRendererUtils.addAllChildren(renderTarget));
            },this);

            list.addChildren(children);

            list.removeChild((renderTarget:GameObject) => {
                return self._shadowMapRendererUtils.isContainer(renderTarget);
            });

            return list.removeRepeatItems();
        }

        private _list = null;
    }
}

