/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class DiffuseMapShaderLib extends LightMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "diffuseMap";

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                VariableNameTable.getVariableName("diffuseMap"),
                "u_sourceRegion", "u_repeatRegion"
            ]);
        }
    }
}

