module wd {
    export class ProceduralCommand extends RenderCommand{
        public static create(){
            var obj = new this();

            return obj;
        }

        public material:Material = null;
        public indexBuffer:ElementBuffer = null;
        public vertexBuffer:ArrayBuffer = null;

        public init(){
            this.blend = false;
            this.drawMode = EDrawMode.TRIANGLES;
        }

        public execute() {
            var material = this.material;

            material.updateProceduralShader(this);

            this.drawElements(this.indexBuffer);
        }
    }
}
