module wd{
    export class MorphCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "morphCommon";

        @require(function(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            assert(quadCmd.target.hasComponent(MorphAnimation), Log.info.FUNC_SHOULD("entityObject", "has MorphAnimation component"));
        })
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            var anim = quadCmd.target.getComponent<MorphAnimation>(MorphAnimation);

            this.sendUniformData(program, "u_interpolation", anim.interpolation);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_interpolation"]);
        }
    }
}

