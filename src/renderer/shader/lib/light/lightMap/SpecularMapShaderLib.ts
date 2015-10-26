/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class SpecularMapShaderLib extends LightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "specularMap";

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("specularMap")
            ]);
        }
    }
}

