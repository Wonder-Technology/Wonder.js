module wd{
    export class CommonVerticeShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "commonVertice";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            this._sendAttributeVariables(program, quadCmd);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_position"]);
        }

        private _sendAttributeVariables(program: Program, quadCmd:QuadCommand){
            var verticeBuffer = <ArrayBuffer>quadCmd.buffers.getChild(EBufferDataType.VERTICE);

            if(!verticeBuffer){
                return;
            }

                this.sendAttributeData(program, "a_position", verticeBuffer);
        }
    }
}

