/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class TwoDRenderTargetRenderer extends RenderTargetRenderer{
        //protected frameBuffer:FrameBuffer = null;
        //protected frameBufferTexture:WebGLTexture = null;
        protected frameBuffer:WebGLFramebuffer = null;
        protected renderBuffer:WebGLRenderbuffer= null;

        protected initFrameBuffer(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            this.frameBuffer = frameBuffer.createFrameBuffer();
            this.renderBuffer = frameBuffer.createRenderBuffer();

            frameBuffer.bindFrameBuffer(this.frameBuffer);
            frameBuffer.attachTexture(gl.TEXTURE_2D, this.frameBufferTexture);
            frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", this.renderBuffer);
            frameBuffer.check();
            frameBuffer.unBind();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);
            gl.deleteRenderbuffer(this.renderBuffer);
        }
    }
}

