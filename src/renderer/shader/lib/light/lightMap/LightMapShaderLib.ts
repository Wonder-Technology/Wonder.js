module wd{
    export class LightMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "lightMap";

        protected sendBaseLightMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_lightMapIntensity", material.lightMapIntensity);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("lightMap"), "u_lightMapIntensity"
            ]);
        }
    }
}

