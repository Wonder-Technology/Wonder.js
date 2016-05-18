module wd {
    export abstract class TwoDRenderTargetRenderer extends CommonRenderTargetRenderer{
        protected frameBuffer:WebGLFramebuffer = null;
        //todo move to TwoDCommonRenderTargetRenderer
        protected renderBuffer:WebGLRenderbuffer= null;

        private _lastCamera:GameObject = null;

        protected abstract beforeRenderFrameBufferTexture(renderCamera:GameObject);
        protected abstract renderRenderer(renderer:Renderer);

        @virtual
        protected isNeedCreateCamera(){
            return true;
        }

        @virtual
        protected createCamera(...args):GameObject{
            return null;
        }

        @virtual
        protected setFrameBufferTexture(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture, EFrameBufferAttachType.COLOR_ATTACHMENT0);
        }

        @virtual
        protected createAndAttachDepthBuffer(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            this.renderBuffer = frameBuffer.createRenderBuffer();

            frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", this.renderBuffer);
        }

        @virtual
        protected deleteRenderBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteRenderbuffer(this.renderBuffer);
        }

        protected isRenderListEmpty(renderList:wdCb.Collection<GameObject>){
            return renderList.getCount() ===  0;
        }

        protected initFrameBuffer(){
            var frameBuffer = this.frameBufferOperator;

            this.frameBuffer = frameBuffer.createFrameBuffer();

            frameBuffer.bindFrameBuffer(this.frameBuffer);
            this.setFrameBufferTexture();
            this.createAndAttachDepthBuffer();

            frameBuffer.check();
            frameBuffer.unBindAll();
        }

        @require(function(renderList:wdCb.Collection<GameObject>, renderer:Renderer, camera:GameObject){
            assert(!!camera, Log.info.FUNC_SHOULD("pass param->camera"));
        })
        protected renderFrameBufferTexture(renderList:wdCb.Collection<GameObject>, renderer:Renderer, camera:GameObject){
            var renderCamera:GameObject = null;

            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            this.texture.bindToUnit(0);

            if(this.isNeedCreateCamera()){
                renderCamera = this.createCamera(camera);

                if(this._lastCamera){
                    this._lastCamera.dispose();
                }

                this._lastCamera = renderCamera;
            }
            else{
                renderCamera = camera;
            }

            this.beforeRenderFrameBufferTexture(renderCamera);

            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();


            //todo if renderList is null, draw all
            //todo optimize:if renderObject is behind plane, not render it!
            renderList.forEach((child:GameObject) => {
                child.render(renderer, renderCamera);
            });

            renderer.clear();
            this.renderRenderer(renderer);

            this.frameBufferOperator.unBindFrameBuffer();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);

            this.deleteRenderBuffer();
        }
    }
}

