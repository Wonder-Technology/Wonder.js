/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class PhongDiffuseMapShaderLib extends DiffuseMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setSourceContent(){
            this.vsSourceHead = ShaderChunk.diffuseMap_phong_head_vertex;
            this.vsSourceBody = ShaderChunk.diffuseMap_phong_body_vertex;
            this.fsSourceHead = ShaderChunk.diffuseMap_phong_head_fragment;
        }
    }
}

