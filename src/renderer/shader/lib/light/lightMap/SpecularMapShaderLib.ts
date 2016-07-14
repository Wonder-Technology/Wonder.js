module wd{
    export class SpecularMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "specularMap";

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("specularMap")
            ]);
        }
    }
}

