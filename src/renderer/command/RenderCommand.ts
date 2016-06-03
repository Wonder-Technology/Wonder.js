module wd {
    export abstract class RenderCommand {
        private _webglState:WebGLState = null;
        get webglState(){
            return this._webglState ? this._webglState : BasicState.create();
        }
        set webglState(webglState:WebGLState){
            this._webglState = webglState;
        }

        public drawMode:EDrawMode = EDrawMode.TRIANGLES;
        public blend:boolean = false;

        public abstract execute():void;

        @virtual
        public init() {
        }

        @virtual
        public dispose() {
        }

        //todo bind null vao after draw if vao support

        protected drawElements(indexBuffer:ElementBuffer){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            BufferTable.bindIndexBuffer(indexBuffer);

            GlUtils.drawElements(gl[this.drawMode], indexBuffer.count, gl[indexBuffer.type], indexBuffer.typeSize * startOffset);

            this._unbindAfterDraw();
        }

        protected drawArray(vertexBuffer:ArrayBuffer){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);

            this._unbindAfterDraw();
        }

        private _unbindAfterDraw(){
            var extensionVAO = GPUDetector.getInstance().extensionVAO;

            if(extensionVAO){
                extensionVAO.bindVertexArrayOES(null);
            }
        }
    }
}
