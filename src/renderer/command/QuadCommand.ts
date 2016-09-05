module wd {
    export abstract class QuadCommand extends RenderCommand{
        get program(){
            return this.material.program;
        }

        public mMatrix:Matrix4 = null;
        public vMatrix:Matrix4 = null;
        public pMatrix:Matrix4 = null;
        public buffers:BufferContainer = null;
        public material:Material = null;
        public target:GameObject = null;

        public sortId:number = null;

        public execute() {
            var material = this.material;

            material.updateShader(this);

            this.draw(material);
        }

        protected abstract draw(material:Material):void;
    }
}
