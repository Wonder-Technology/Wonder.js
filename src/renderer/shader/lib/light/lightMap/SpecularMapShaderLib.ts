module wd{
    export class SpecularMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "specularMap";

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("specularMap")
            ]);
        }
    }
}

