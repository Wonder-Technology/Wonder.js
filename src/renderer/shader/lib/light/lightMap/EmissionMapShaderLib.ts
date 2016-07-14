module wd{
    export class EmissionMapShaderLib extends BaseLightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "emissionMap";

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("emissionMap")
            ]);
        }
    }
}

