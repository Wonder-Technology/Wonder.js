/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export class BasicEnvMapForBasicShaderLib extends EnvMapForBasicShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "basic_envMap_forBasic";
        //
        //public setShaderDefinition(quadCmd:QuadCommand, material:Material){
        //    super.setShaderDefinition(quadCmd, material);
        //
        //    this.vsSourceHead = ShaderChunk.basic_envMap_head_vertex;
        //    this.vsSourceBody += ShaderChunk.basic_envMap_body_vertex;
        //    this.fsSourceHead = ShaderChunk.basic_envMap_head_fragment;
        //    this.fsSourceBody = ShaderChunk.basic_envMap_body_fragment;
        //}
    }
}


