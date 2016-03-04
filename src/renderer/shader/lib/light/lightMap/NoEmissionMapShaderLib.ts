module wd{
    export class NoEmissionMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noEmissionMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_emission", material.emissionColor.toVector3());
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_emission"]);
        }
    }
}

