module wd{
    export class CommonMorphShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common_morph";

        @require(function(program:Program, cmd:QuadCommand, material:EngineMaterial){
            assert(cmd.target.hasComponent(MorphAnimation), Log.info.FUNC_SHOULD("entityObject", "has MorphAnimation component"));
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

