module wd{
    export class NoEmissionMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noEmissionMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_emission", material.emissionColor.toVector4());
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_emission"]);
        }
    }
}

