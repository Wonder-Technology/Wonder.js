module wd{
    export class NormalCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "normal_common";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            this._sendAttributeVariables(program, cmd);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_normal"]);
        }

        private _sendAttributeVariables(program: Program, cmd:QuadCommand){
            var normalBuffer:ArrayBuffer = cmd.buffers.getChild(EBufferDataType.NORMAL);

            if(!normalBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_normal", normalBuffer);
        }
    }
}

