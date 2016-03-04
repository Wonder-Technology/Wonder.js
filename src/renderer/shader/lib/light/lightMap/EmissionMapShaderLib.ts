module wd{
    export class EmissionMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "emissionMap";

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("emissionMap")
            ]);
        }
    }
}

