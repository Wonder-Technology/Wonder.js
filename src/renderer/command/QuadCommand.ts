module wd {
    export abstract class QuadCommand extends RenderCommand{
        get program(){
            return this.material.program;
        }

        @requireGetter(function(){
            assert(!!this.mMatrix && !!this.vMatrix && !!this.pMatrix, Log.info.FUNC_NOT_EXIST("mMatrix or vMatrix or pMatrix"));
        })
        get mvpMatrix(){
            return this.mMatrix.applyMatrix(this.vMatrix, true).applyMatrix(this.pMatrix, false);
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
