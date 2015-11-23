/// <reference path="../../../../../filePath.d.ts"/>
module dy{
    export class NoSpecularMapShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noSpecularMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_specular", material.specular.toVector3());
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_specular"]);
        }
    }
}

