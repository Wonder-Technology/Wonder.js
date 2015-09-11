/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class ReflectionShaderLib extends EnvMapShaderLib{
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

            this.setVsSource();
            this.fsSourceHead = ShaderChunk.envMap_head_fragment;
            this.fsSourceBody = ShaderChunk.envMap_body_fragment + ShaderChunk.reflection_body_fragment;
        }
    }
}


