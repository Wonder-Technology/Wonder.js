module wd{
    export class NormalCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normal_common";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            this._sendAttributeVariables(program, quadCmd);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_normal"]);
        }

        private _sendAttributeVariables(program: Program, quadCmd:QuadCommand){
            var normalBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.NORMAL);

            if(!normalBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_normal", normalBuffer);
        }
    }
}

