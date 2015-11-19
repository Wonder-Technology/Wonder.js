/// <reference path="../../../../definitions.d.ts"/>
module dy{
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
            if (quadCmd.buffers.hasChild(BufferDataType.VERTICE)) {
                this.sendAttributeData(program, "a_position", <ArrayBuffer>quadCmd.buffers.getChild(BufferDataType.VERTICE));
            }
            //else {
            //    Log.error(true, Log.info.FUNC_MUST("has vertexBuffer"));
            //}
        }
    }
}

