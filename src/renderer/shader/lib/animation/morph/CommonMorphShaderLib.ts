module wd{
    export class CommonMorphShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common_morph";

        @require(function(program:Program, cmd:QuadCommand, material:EngineMaterial){
            it("entityObject should has MorphAnimation component", () => {
                expect(cmd.target.hasComponent(MorphAnimation)).true;
            });
        })
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            var anim = cmd.target.getComponent<MorphAnimation>(MorphAnimation);

            this.sendUniformData(program, "u_interpolation", anim.interpolation);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_interpolation"]);
        }
    }
}

