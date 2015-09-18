/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class PhongNormalMapShaderLib extends NormalMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "normalMap_phong";

        protected setSourceContent(){
            //this.vsSourceHead = ShaderChunk.normalMap_phong_head_vertex;
            //this.vsSourceBody = ShaderChunk.normalMap_phong_body_vertex;
            //this.fsSourceHead = ShaderChunk.normalMap_phong_head_fragment;
            //
            this.vsSourceVarDeclare += this.getVsChunk("light_common.glsl").varDeclare;
        }
    }
}

