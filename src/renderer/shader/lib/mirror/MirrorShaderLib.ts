/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class MirrorShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "mirror";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            this.sendUniformData(program, "u_mirrorColor", material.color.toVector3());
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_mirrorColor", "u_mirrorSampler"]);
        }
    }
}

