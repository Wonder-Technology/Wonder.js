/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class NoDiffuseMapShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noDiffuseMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_diffuse", VariableType.FLOAT_3, material.color.toVector3());
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_diffuse"]);
        }
    }
}

