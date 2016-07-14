module wd{
    export class FresnelForLightEnvMapShaderLib extends ForLightEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "fresnel_forLight_envMap";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial) {
            super.sendShaderVariables(program, cmd, material);
            if(material.reflectivity !== null){
                this.sendUniformData(program, "u_reflectivity", material.reflectivity);
            }
            else{
                this.sendUniformData(program, "u_reflectivity", ShaderChunk.NULL);
                this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
            }
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

