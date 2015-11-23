/// <reference path="../../../../filePath.d.ts"/>
module dy{
    export class MirrorForBasicShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "mirror_forBasic";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_mirrorSampler"]);
        }
    }
}

