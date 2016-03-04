module wd {
    export class ProceduralCommand extends RenderCommand{
        public static create(){
            var obj = new this();

            return obj;
        }

        public shader:ProceduralShader = null;
        public indexBuffer:ElementBuffer = null;
        public vertexBuffer:ArrayBuffer = null;

        public init(){
            this.blend = false;
            this.drawMode = EDrawMode.TRIANGLES;
        }

        public execute() {
            //var material = this.material;

            //material.updateProceduralShader(this);

            this.shader.update(this);

            this.drawElements(this.indexBuffer);
        }
    }
}
