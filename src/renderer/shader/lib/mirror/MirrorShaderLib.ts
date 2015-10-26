/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class MirrorShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "mirror";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:MirrorMaterial){
            program.sendUniformData("u_mirrorColor", VariableType.FLOAT_3, material.color.toVector3());
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_mirrorColor", "u_mirrorSampler"]);
        }
    }
}

