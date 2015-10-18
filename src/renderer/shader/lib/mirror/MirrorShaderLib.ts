/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class MirrorShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
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

