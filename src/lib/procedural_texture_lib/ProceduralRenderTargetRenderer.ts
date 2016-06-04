module wd {
    export abstract class ProceduralRenderTargetRenderer extends RenderTargetRenderer{
        public texture:ProceduralTexture;

        protected frameBuffer:WebGLFramebuffer = null;

        private _indexBuffer:ElementBuffer = null;
        private _vertexBuffer:ArrayBuffer = null;
        private _shader:ProceduralShader = null;
        private _vaoManager:VAOManager = !!GPUDetector.getInstance().extensionVAO ? VAOManager.create() : null;

        public init(){
            super.init();

            this._initBuffer();

            this._shader = this.createShader();
            this._shader.init();

            this._vaoManager && this._vaoManager.init();
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
            frameBuffer.unBindAll();
        }

        protected renderFrameBufferTexture(renderList:any, renderer:Renderer){
            this.frameBufferOperator.bindFrameBuffer(this.frameBuffer);
            this.texture.bindToUnit(0);
            this.frameBufferOperator.setViewport();

            renderer.addCommand(this._createRenderCommand());

            renderer.clear();
            renderer.webglState = BasicState.create();
            renderer.render();

            this.frameBufferOperator.unBindFrameBuffer();
            this.frameBufferOperator.restoreViewport();
        }

        protected disposeFrameBuffer(){
            var gl = DeviceManager.getInstance().gl;

            gl.deleteFramebuffer(this.frameBuffer);
        }

        protected getRenderList(){
            return null;
        }

        protected isRenderListEmpty(){
            return false;
        }

        private _initBuffer(){
            if(BufferTable.hasBuffer(<any>BufferTableKey.PROCEDURAL_VERTEX)){
             this._vertexBuffer = BufferTable.getBuffer<ArrayBuffer>(<any>BufferTableKey.PROCEDURAL_VERTEX);
            }
            else{
                this._vertexBuffer = ArrayBuffer.create([
                    1, 1,
                    -1, 1,
                    -1, -1,
                    1, -1
                ], 2, EBufferType.FLOAT);

                BufferTable.addBuffer(<any>BufferTableKey.PROCEDURAL_VERTEX, this._vertexBuffer);
            }


            if(BufferTable.hasBuffer(<any>BufferTableKey.PROCEDURAL_INDEX)){
                this._indexBuffer = BufferTable.getBuffer<ElementBuffer>(<any>BufferTableKey.PROCEDURAL_INDEX);
            }
            else{
                this._indexBuffer = ElementBuffer.create([
                    0, 1, 2,
                    0, 2, 3
                ], EBufferType.UNSIGNED_SHORT);

                BufferTable.addBuffer(<any>BufferTableKey.PROCEDURAL_INDEX, this._indexBuffer);
            }
        }

        private _createRenderCommand(){
            var command = ProceduralCommand.create();

            command.vertexBuffer = this._vertexBuffer;
            command.indexBuffer = this._indexBuffer;
            command.shader = this._shader;
            command.vaoManager = this._vaoManager;

            return command;
        }
    }
}

