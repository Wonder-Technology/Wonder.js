/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class RefractionShaderLib extends EnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "refraction";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EnvMapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_refractionRatio"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
            //this.fsSourceHead = ShaderChunk.envMap_head_fragment;
            //this.fsSourceBody = ShaderChunk.envMap_body_fragment + ShaderChunk.refraction_body_fragment;
        }
    }
}

