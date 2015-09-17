/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class PhongNoNormalMapShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
        }

        protected setShaderDefinition(){
            this.vsSourceHead = ShaderChunk.noNormalMap_phong_head_vertex;
            this.vsSourceBody = ShaderChunk.noNormalMap_phong_body_vertex;
            this.fsSourceHead = ShaderChunk.noNormalMap_phong_head_fragment;
        }
    }
}

