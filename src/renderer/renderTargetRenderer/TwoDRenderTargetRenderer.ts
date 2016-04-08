module wd {
    export abstract class TwoDRenderTargetRenderer extends RenderTargetRenderer{
        protected frameBuffer:WebGLFramebuffer = null;
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

        protected isRenderListEmpty(renderList:wdCb.Collection<GameObject>){
            return renderList.getCount() ===  0;
        }

        protected initFrameBuffer(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            this.frameBuffer = frameBuffer.createFrameBuffer();
            this.renderBuffer = frameBuffer.createRenderBuffer();

            frameBuffer.bindFrameBuffer(this.frameBuffer);
            frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture);
            frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", this.renderBuffer);
            frameBuffer.check();
            frameBuffer.unBind();
        }

        @require(function(renderList:wdCb.Collection<GameObject>, renderer:Renderer, camera:GameObject){
            assert(!!camera, Log.info.FUNC_SHOULD("pass param->camera"));
        })
        protected renderFrameBufferTexture(renderList:wdCb.Collection<GameObject>, renderer:Renderer, camera:GameObject){
            var renderCamera:GameObject = null;

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

            if(this.isRenderListEmptyWhenRender()){
                return;
            }

            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.frameBufferOperator.setViewport();


            //todo if renderList is null, draw all
            //todo optimize:if renderObject is behind plane, not render it!
            renderList.forEach((child:GameObject) => {
                child.render(renderer, renderCamera);
            });

            renderer.clear();
            this.renderRenderer(renderer);

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);
            gl.deleteRenderbuffer(this.renderBuffer);
        }
    }
}

