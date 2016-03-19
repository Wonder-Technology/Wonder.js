module wd {
    export abstract class RenderCommand {
        public drawMode:EDrawMode = EDrawMode.TRIANGLES;
        public blend:boolean = false;
        public z:number = null;

        public abstract execute():void;

        @virtual
        public init() {
        }

        protected drawElements(indexBuffer:ElementBuffer){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            GlUtils.drawElements(gl[this.drawMode], indexBuffer.count, indexBuffer.type, indexBuffer.typeSize * startOffset);
        }

        protected drawArray(vertexBuffer:ArrayBuffer){
            var startOffset:number = 0,
                gl = DeviceManager.getInstance().gl;

            GlUtils.drawArrays(gl[this.drawMode], startOffset, vertexBuffer.count);
        }
    }
}
