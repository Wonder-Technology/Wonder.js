/// <reference path="../../../../../filePath.d.ts"/>
module dy{
    export class MorphCommonShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "morphCommon";

        @require(function(program:Program, quadCmd:QuadCommand, material:Material){
            assert(!!quadCmd.animation, Log.info.FUNC_SHOULD("gameObject", "add MorphAnimation component"));
        })
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            var anim = <MorphAnimation>(quadCmd.animation);

            this.sendUniformData(program, "u_interpolation", anim.interpolation);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_interpolation"]);
        }
    }
}

