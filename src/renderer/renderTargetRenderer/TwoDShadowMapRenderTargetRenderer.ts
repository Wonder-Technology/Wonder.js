module wd {
    export class TwoDShadowMapRenderTargetRenderer extends TwoDRenderTargetRenderer{
        public static create(shadowMap:TwoDShadowMapTexture, light:DirectionLight, layer:string) {
            var obj = new this(shadowMap, light, layer);

            obj.initWhenCreate();

            return obj;
        }

        constructor(shadowMap:TwoDShadowMapTexture, light:DirectionLight, layer:string){
            super(shadowMap);

            this._light = light;
            this._layer = layer;
        }

        public texture:TwoDShadowMapTexture;

        private _light:DirectionLight = null;
        private _layer:string = null;

        private _shadowMapRendererUtils:TwoDShadowMapRenderTargetRendererUtils = null;

        public initWhenCreate(){
            this._shadowMapRendererUtils = TwoDShadowMapRenderTargetRendererUtils.create(this._light, this.texture);

            super.initWhenCreate();
        }

        protected beforeRenderFrameBufferTexture(renderCamera:GameObject){
            Director.getInstance().scene.glslData.appendChild(<any>EShaderGLSLData.TWOD_SHADOWMAP, {
                camera: renderCamera.getComponent(CameraController),
                light: this._light,
                isRenderListEmpty:false
            });
        }

        protected getRenderList():wdCb.Collection<GameObject>{
            return Director.getInstance().scene.gameObjectScene.shadowManager.getShadowRenderListByLayer(this._layer);
        }

        protected renderRenderer(renderer:Renderer){
            this._shadowMapRendererUtils.renderRenderer(renderer);
        }

        protected beforeRender(){
            if(this.isRenderListEmptyWhenRender()){
                Director.getInstance().scene.glslData.appendChild(<any>EShaderGLSLData.TWOD_SHADOWMAP, {
                    isRenderListEmpty:true
                });

                return;
            }

            this._shadowMapRendererUtils.beforeRender(EShaderTypeOfScene.BUILD_TWOD_SHADOWMAP);
        }

        protected afterRender(){
            if(this.isRenderListEmptyWhenRender()){
                return;
            }

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

            camera.addComponent(RenderTargetRendererCameraController.create(orthoCameraComponent));

            //todo optimize:dirty?
            camera.transform.translate(light.position);
            camera.transform.lookAt(0, 0, 0);

            camera.init();

            return camera;
        }

        protected setFrameBufferTexture(){
            if(GPUDetector.getInstance().extensionDepthTexture){
                let frameBuffer = this.frameBufferOperator,
                    gl = DeviceManager.getInstance().gl;

                //todo optimize: not attach color texture in WebGL 2?
                frameBuffer.attachTexture(gl.TEXTURE_2D, this._createEmptyColorTexture(), EFrameBufferAttachType.COLOR_ATTACHMENT0);
                frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture, EFrameBufferAttachType.DEPTH_ATTACHMENT);

                return;
            }

            super.setFrameBufferTexture();
        }

        protected createAndAttachDepthBuffer(){
            if(GPUDetector.getInstance().extensionDepthTexture){
                return;
            }

            super.createAndAttachDepthBuffer();
        }

        protected deleteRenderBuffer(){
            if(GPUDetector.getInstance().extensionDepthTexture){
                return;
            }

            let gl = DeviceManager.getInstance().gl;

            gl.deleteRenderbuffer(this.renderBuffer);
        }

        private _createEmptyColorTexture(){
            var gl = DeviceManager.getInstance().gl,
                colorTexture = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, colorTexture);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.texture.width, this.texture.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            return colorTexture;
        }
    }
}

