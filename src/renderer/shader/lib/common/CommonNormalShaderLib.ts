/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class CommonNormalShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "commonNormal";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            this._sendAttributeVariables(program, quadCmd);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_normal"]);
        }

        private _sendAttributeVariables(program: Program, quadCmd:QuadCommand){
            if (quadCmd.buffers.hasChild(BufferDataType.NORMAL)) {
                this.sendAttributeData(program, "a_normal", <ArrayBuffer>quadCmd.buffers.getChild(BufferDataType.NORMAL));
            }
        }
    }
}

