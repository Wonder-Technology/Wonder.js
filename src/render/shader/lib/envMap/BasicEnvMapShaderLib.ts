/// <reference path="../../../../definitions.d.ts"/>
module dy.render{
    export class BasicEnvMapShaderLib extends EnvMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.vsSourceHead = ShaderChunk.basic_envMap_head_vertex;
            this.vsSourceBody += ShaderChunk.basic_envMap_body_vertex;
            this.fsSourceHead = ShaderChunk.basic_envMap_head_fragment;
            this.fsSourceBody = ShaderChunk.basic_envMap_body_fragment;
        }
    }
}


