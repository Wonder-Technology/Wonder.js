module wd{
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
            var normalBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.NORMAL);

            if(!normalBuffer){
                return;
            }

            this.sendAttributeData(program, "a_normal", normalBuffer);
        }
    }
}

