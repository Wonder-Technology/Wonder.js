/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export class FresnelForLightShaderLib extends EnvMapForLightShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "fresnel_forLight";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            super.sendShaderVariables(program, quadCmd, material);
            if(material.reflectivity !== ShaderChunk.NULL){
                this.sendUniformData(program, "u_reflectivity", material.reflectivity);
            }
            else{
                this.sendUniformData(program, "u_reflectivity", ShaderChunk.NULL);
                this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
            }
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
            //this.fsSourceHead = ShaderChunk.envMap_head_fragment + ShaderChunk.fresnel_head_fragment;
            //this.fsSourceBody = ShaderChunk.envMap_body_fragment + ShaderChunk.fresnel_body_fragment;
        }
    }
}

