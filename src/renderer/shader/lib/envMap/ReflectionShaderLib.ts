/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class ReflectionShaderLib extends EnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "reflection";

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
            //this.fsSourceHead = ShaderChunk.envMap_head_fragment;
            //this.fsSourceBody += ShaderChunk.reflection_fragment.body;
        }
    }
}


