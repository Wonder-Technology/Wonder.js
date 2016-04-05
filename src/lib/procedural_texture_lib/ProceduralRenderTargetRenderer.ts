module wd {
    export abstract class ProceduralRenderTargetRenderer extends RenderTargetRenderer{
        protected texture:ProceduralTexture;

        protected frameBuffer:WebGLFramebuffer = null;

        private _indexBuffer:ElementBuffer = null;
        private _vertexBuffer:ArrayBuffer = null;
        private _shader:ProceduralShader = null;
        private _isRendered:boolean = false;

        @virtual
        public needRender():boolean{
            if(this._isRendered){
                return false;
            }

            this._isRendered = true;

            return true;
        }

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

            this._shader = this.createShader();
            this._shader.init();
        }

        public dispose(){
            super.dispose();

            this._indexBuffer.dispose();
            this._vertexBuffer.dispose();
            this._shader.dispose();
        }

        protected abstract createShader():ProceduralShader;

        protected initFrameBuffer(){
            var frameBuffer = this.frameBufferOperator,
                gl = DeviceManager.getInstance().gl;

            this.frameBuffer = frameBuffer.createFrameBuffer();

            frameBuffer.bindFrameBuffer(this.frameBuffer);
            frameBuffer.attachTexture(gl.TEXTURE_2D, this.texture.glTexture);
            frameBuffer.check();
            frameBuffer.unBind();
        }

        protected renderFrameBufferTexture(renderer:Renderer){
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.texture.bindToUnit(0);
            this.frameBufferOperator.setViewport();

            renderer.addCommand(this._createRenderCommand());

            renderer.clear();
            renderer.webglState = BasicState.create();
            renderer.render();

            this.frameBufferOperator.unBind();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);
        }

        private _createRenderCommand(){
            var command = ProceduralCommand.create();

            command.vertexBuffer = this._vertexBuffer;
            command.indexBuffer = this._indexBuffer;
            command.shader = this._shader;

            return command;
        }
    }
}

