module wd {
    export abstract class QuadCommand extends RenderCommand{
        get program(){
            return this.material.program;
        }

        //todo refactor:change to public attri
        private _vMatrix:Matrix4 = null;
        get vMatrix(){
            return this._vMatrix;
        }
        set vMatrix(vMatrix:Matrix4){
            this._vMatrix = vMatrix;
        }

        private _pMatrix:Matrix4 = null;
        get pMatrix(){
            return this._pMatrix;
        }
        set pMatrix(pMatrix:Matrix4){
            this._pMatrix = pMatrix;
        }

        private _sortId:number = null;
        get sortId(){
            return this._sortId;
        }
        set sortId(sortId:number){
            this._sortId = sortId;
        }

        public buffers:BufferContainer = null;
        public material:Material = null;
        public z:number = null;
        public target:GameObject = null;

        public execute() {
            var material = this.material;

            material.updateShader(this);

            this.draw(material);
        }

        protected abstract draw(material:Material):void;
    }
}
