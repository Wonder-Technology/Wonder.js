module wd{
    export class RefractionForBasicEnvMapShaderLib extends ForBasicEnvMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "refraction_forBasic_envMap";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial) {
            super.sendShaderVariables(program, cmd, material);

            this.sendUniformData(program, "u_refractionRatio", material.refractionRatio);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_refractionRatio"]);

            this.setEnvMapSource();
            this.setFsSource(this.getFsChunk(), "+");
        }
    }
}

