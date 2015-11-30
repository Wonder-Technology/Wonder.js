/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export class ReflectionForBasicShaderLib extends EnvMapForBasicShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "reflection_forBasic";

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
            //this.fsSourceHead = ShaderChunk.envMap_head_fragment;
            //this.fsSourceBody += ShaderChunk.reflection_fragment.body;
        }
    }
}


