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

            this.light = light;
        }

        //todo private?
        public light:DirectionLight = null;

        protected texture:TwoDShadowMapTexture;

        private _shadowMapRendererUtils:ShadowMapRenderTargetRendererUtils = null;

        public initWhenCreate(){
            this._shadowMapRendererUtils = TwoDShadowMapRenderTargetRendererUtils.create(this.light, this.texture);

            super.initWhenCreate();
        }

        public init(){
            this._shadowMapRendererUtils.init();

            super.init();
        }

        protected renderFrameBufferTexture(renderer:Renderer, camera:GameObject){
            var self = this,
                shadowMapCamera = this.createCamera(),
                stage:Stage = Director.getInstance().stage;

            if(!stage.shadowMap.enable){
                return;
            }

            //todo No color buffer is drawn to(webgl not support yet)
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();

            stage.useProgram();

            //todo if renderList is null, draw all
            this.light.shadowRenderList.forEach((child:GameObject) => {
                self._shadowMapRendererUtils.setShadowData(child, shadowMapCamera);
                //self._setShadowData(child, shadowMapCamera);
                child.render(renderer, shadowMapCamera);
            });
            renderer.render();

            stage.unUseProgram();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected warnTextureSizeExceedCanvasSize(){
            //not warn
        }

        protected createCamera():GameObject{
            var orthoCameraComponent = OrthographicCamera.create(),
                light:DirectionLight = this.light,
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

