/// <reference path="../../definitions.d.ts"/>
module dy {
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

            this._shadowMapRendererUtils.bindEndLoop(() => {
                //here not need removeRepeatItems
                self._light.shadowRenderList.forEach((child:GameObject) => {
                    self._shadowMapRendererUtils.clearTwoDShadowMapData(child);
                });
            });

            this._shadowMapRendererUtils.createShaderWithShaderLib(BuildTwoDShadowMapShaderLib.create());

            super.init();
        }

        public dispose(){
            super.dispose();

            this._shadowMapRendererUtils.unBindEndLoop();
        }

        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
            var self = this;

            //here need removeRepeatItems
            this._light.shadowRenderList.removeRepeatItems().forEach((child:GameObject) => {
                self._shadowMapRendererUtils.setShadowMapData(child, renderCamera);
            });
        }
        protected getRenderList():dyCb.Collection<GameObject>{
            return this._light.shadowRenderList;
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

        protected warnTextureSizeExceedCanvasSize(){
            //not warn
        }

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
    }
}

