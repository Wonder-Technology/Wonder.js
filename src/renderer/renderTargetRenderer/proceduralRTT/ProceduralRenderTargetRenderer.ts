module wd {
    export abstract class ProceduralRenderTargetRenderer extends RenderTargetRenderer{
        protected texture:ProceduralTexture;

        protected frameBuffer:WebGLFramebuffer = null;

        private _indexBuffer:ElementBuffer = null;
        private _vertexBuffer:ArrayBuffer = null;

        public init(){
            super.init();

            this._vertexBuffer = ArrayBuffer.create(new Float32Array([
                1, 1,
                -1, 1,
                -1, -1,
                1, -1
            ]), 2, EBufferType.FLOAT);
            this._indexBuffer = ElementBuffer.create(new Uint16Array([
                0, 1, 2,
                0, 2, 3
            ]), EBufferType.UNSIGNED_SHORT);
        }


        protected initFrameBuffer(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            this.frameBuffer = frameBuffer.createFrameBuffer();
            //this.renderBuffer = frameBuffer.createRenderBuffer();

            frameBuffer.bindFrameBuffer(this.frameBuffer);
            frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture);
            //frameBuffer.attachRenderBuffer("DEPTH_ATTACHMENT", this.renderBuffer);
            frameBuffer.check();
            frameBuffer.unBind();
        }

        protected renderFrameBufferTexture(renderer:Renderer){
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.texture.bindToUnit(0);
            this.frameBufferOperator.setViewport();


            var command = ProceduralCommand.create();

            command.vertexBuffer = this._vertexBuffer;
            command.indexBuffer = this._indexBuffer;

            command.material = this.texture.material;



            renderer.addCommand(command);


            renderer.clear();
            //this.renderRenderer(renderer);
            renderer.render();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);
            //gl.deleteRenderbuffer(this.renderBuffer);
        }
    }
}

