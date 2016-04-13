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

        public texture:CubemapShadowMapTexture;

        private _light:PointLight = null;
        private _layer:string = null;
        private _shadowMapRendererUtils:CubemapShadowMapRenderTargetRendererUtils = null;


        public initWhenCreate(){
            this._shadowMapRendererUtils = CubemapShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            super.initWhenCreate();
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
            this._shadowMapRendererUtils.renderRenderer(renderer);
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

            scene.glslData.appendChild(<any>EShaderGLSLData.BUILD_CUBEMAP_SHADOWMAP, {
                light: this._light
            });

            this._shadowMapRendererUtils.beforeRender(EShaderTypeOfScene.BUILD_CUBEMAP_SHADOWMAP);
        }

        protected afterRender(){
            if(this.isRenderListEmptyWhenRender()){
                return;
            }

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
    }
}

