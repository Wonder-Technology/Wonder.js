/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export class SpecularMapShaderLib extends LightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "specularMap";

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("specularMap")
            ]);
        }
    }
}

