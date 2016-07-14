module wd{
    export class LightMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "lightMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_lightMapIntensity", material.lightMapIntensity);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("lightMap"), "u_lightMapIntensity"
            ]);
        }
    }
}

