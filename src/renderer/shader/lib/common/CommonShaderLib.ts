/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class CommonShaderLib extends ShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            this._sendAttributeVariables(program, quadCmd);

            program.sendUniformData("u_mMatrix", VariableType.FLOAT_MAT4, quadCmd.mMatrix);
            program.sendUniformData("u_vMatrix", VariableType.FLOAT_MAT4, quadCmd.vMatrix);
            program.sendUniformData("u_pMatrix", VariableType.FLOAT_MAT4, quadCmd.pMatrix);
        }

        protected setShaderDefinition(){
            //todo use VariableLib.xxx?
            this.addAttributeVariable(["a_position"]);
            this.addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);

            this.vsSourceHead = ShaderChunk.common_function + ShaderChunk.common_head_vertex;
            this.vsSourceBody = ShaderChunk.common_body_vertex;
            this.fsSourceHead = ShaderChunk.common_function;
            this.fsSourceBody = ShaderChunk.common_body_fragment;
        }

        private _sendAttributeVariables(program: Program, quadCmd:QuadCommand){
            if (quadCmd.buffers.hasChild("vertexBuffer")) {
                program.sendAttributeData("a_position", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }
        }
    }
}

