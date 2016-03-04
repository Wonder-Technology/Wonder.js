module wd{
    export class NoDiffuseMapShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "noDiffuseMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_diffuse", material.color.toVector3());
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_diffuse"]);
        }
    }
}

