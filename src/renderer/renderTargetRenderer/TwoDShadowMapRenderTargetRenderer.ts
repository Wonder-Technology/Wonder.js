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

            EventManager.on("dy_endLoop", () => {
                //here not need removeRepeatItems
                self._light.shadowRenderList.forEach((child:GameObject) => {
                    self._shadowMapRendererUtils.clearTwoDShadowData(child);
                });
            });

            super.init();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var shadowMapCamera = this.createCamera(),
                self = this;

            //here need removeRepeatItems
            this._light.shadowRenderList.removeRepeatItems().forEach((child:GameObject) => {
                self._shadowMapRendererUtils.setShadowData(child, shadowMapCamera);
            });

            //todo No color buffer is drawn to(webgl not support yet)
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();


            //todo if renderList is null, draw all
            //here not need removeRepeatItems
            this._light.shadowRenderList.forEach((child:GameObject) => {
                child.render(renderer, shadowMapCamera);
            });
            renderer.render();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected  beforeRender(){
            var stage:Stage = Director.getInstance().stage;

            stage.createShaderOnlyOnce(BuildTwoDShadowMapShaderLib.getInstance());
            stage.useProgram();
        }

        protected afterRender(){
            var stage:Stage = Director.getInstance().stage;

            stage.unUseProgram();
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

            camera.addComponent(orthoCameraComponent);

            //todo optimize:dirty?
            camera.transform.translate(light.position);
            camera.transform.lookAt(0, 0, 0);

            camera.init();

            return camera;
        }
    }
}

