/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class CommonShaderLib extends ShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material){
            this._sendAttributeVariables(program, quadCmd);

            this.sendUniformData(program, "u_mMatrix", quadCmd.mMatrix);
            this.sendUniformData(program, "u_vMatrix", quadCmd.vMatrix);
            this.sendUniformData(program, "u_pMatrix", quadCmd.pMatrix);
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            //todo use VariableLib.xxx?
            this.addAttributeVariable(["a_position"]);
            this.addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);

            this.vsSourceDefine = ShaderChunk.common_define.define + ShaderChunk.common_vertex.define;
            this.vsSourceFuncDefine = ShaderChunk.common_function.funcDefine + ShaderChunk.common_vertex.funcDefine;

            this.fsSourceDefine = ShaderChunk.common_define.define + ShaderChunk.common_fragment.define;
            this.fsSourceFuncDefine = ShaderChunk.common_function.funcDefine + ShaderChunk.common_fragment.funcDefine;
        }

        private _sendAttributeVariables(program: Program, quadCmd:QuadCommand){
            if (quadCmd.buffers.hasChild("vertexBuffer")) {
                this.sendAttributeData(program, "a_position", <ArrayBuffer>quadCmd.buffers.getChild("vertexBuffer"));
            }
            else {
                Log.error(true, Log.info.FUNC_MUST("has vertexBuffer"));
            }
        }
    }
}

