module wd{
    export class NoSpecularMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noSpecularMap";

        public sendShaderVariables(program: Program, cmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_specular", material.specularColor.toVector3());
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_specular"]);
        }
    }
}

