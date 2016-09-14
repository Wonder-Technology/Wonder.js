module wd {
    export class SingleDrawCommand extends QuadCommand{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        public normalMatrix:Matrix3 = null;

        protected draw(material:Material){
            var vertexBuffer:ArrayBuffer = null,
                indexBuffer:ElementBuffer = this.buffers.getChild(EBufferDataType.INDICE);

            this.webglState.setState(material);

            if(indexBuffer){
                this.drawElements(indexBuffer);
            }
            else{
                vertexBuffer = this.buffers.getChild(EBufferDataType.VERTICE);

                this.drawArray(vertexBuffer);
            }
        }
    }
}

