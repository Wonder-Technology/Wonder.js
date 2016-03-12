module wd{
    export class EnvMapRefractionForLightShaderLib extends EnvMapForLightShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "envMap_refraction_forLight";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_refractionRatio"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

