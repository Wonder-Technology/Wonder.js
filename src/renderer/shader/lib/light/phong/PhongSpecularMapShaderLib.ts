/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class PhongSpecularMapShaderLib extends SpecularMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setSourceContent(){
            this.vsSourceHead = ShaderChunk.specularMap_phong_head_vertex;
            this.vsSourceBody = ShaderChunk.specularMap_phong_body_vertex;
            this.fsSourceHead = ShaderChunk.specularMap_phong_head_fragment;
        }
    }
}

