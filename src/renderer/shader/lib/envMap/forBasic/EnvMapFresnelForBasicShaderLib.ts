module wd{
    export class EnvMapFresnelForBasicShaderLib extends EnvMapForBasicShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "envMap_fresnel_forBasic";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);


            this.sendUniformData(program, "u_reflectivity", material.reflectivity);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

