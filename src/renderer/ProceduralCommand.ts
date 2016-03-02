module wd {
    export class ProceduralCommand extends RenderCommand{
        public static create(){
            var obj = new this();

            return obj;
        }

        //get program(){
        //    return this.material.program;
        //}

        public drawMode:EDrawMode = EDrawMode.TRIANGLES;
        public material:Material = null;
        public indexBuffer:ElementBuffer = null;
        public vertexBuffer:ArrayBuffer = null;

        public execute() {
            var material = this.material;

            //material.updateTexture();
            //material.updateShader(this);
            material.updateProceduralShader(this);

            this._draw(material);
        }

        public init() {
        }

        private _draw(material:Material) {
            var totalNum:number = 0,
                startOffset:number = 0,
                //vertexBuffer:ArrayBuffer = this.vertexBuffer,
                indexBuffer:ElementBuffer = this.indexBuffer,
                gl = DeviceManager.getInstance().gl;

            //this._setEffects(material);

            //indexBuffer = <ElementBuffer>this.buffers.getChild(EBufferDataType.INDICE);

            //indexBuffer = ElementBuffer.create();


            //if(indexBuffer){
                totalNum = indexBuffer.count;

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                GlUtils.drawElements(gl[this.drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
            //}
            //else{
            //    vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);
            //    totalNum = vertexBuffer.count;
            //    GlUtils.drawArrays(gl[this.drawMode], startOffset, totalNum);
            //}
        }
    }
}
