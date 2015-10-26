/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class NoSpecularMapShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noSpecularMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_specular", VariableType.FLOAT_3, material.specular.toVector3());
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_specular"]);
        }
    }
}

