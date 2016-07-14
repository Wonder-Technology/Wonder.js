module wd{
    export class FresnelForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "fresnel_forBasic_envMap";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial) {
            super.sendShaderVariables(program, cmd, material);

            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);


            this.sendUniformData(program, "u_reflectivity", material.reflectivity);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

