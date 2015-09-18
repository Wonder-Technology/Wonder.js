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

        public type:string = "reflection";

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
            //this.fsSourceHead = ShaderChunk.envMap_head_fragment;
            //this.fsSourceBody += ShaderChunk.reflection_fragment.body;
        }
    }
}


