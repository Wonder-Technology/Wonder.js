module wd{
    export class VerticeCommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "vertice_common";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:EngineMaterial){
            this._sendAttributeVariables(program, quadCmd);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_position"]);
        }

        private _sendAttributeVariables(program: Program, quadCmd:QuadCommand){
            var verticeBuffer = <ArrayBuffer>quadCmd.buffers.getChild(EBufferDataType.VERTICE);

            if(!verticeBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_position", verticeBuffer);
        }
    }
}

