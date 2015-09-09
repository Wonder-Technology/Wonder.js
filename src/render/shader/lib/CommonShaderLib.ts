/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class CommonShaderLib extends ShaderLib{
        private static _instance:CommonShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(quadCmd:render.QuadCommand, material:Material){
            var program = this.program;

            this._sendAttributeVariables(quadCmd);

            program.sendUniformData("u_mMatrix", render.VariableType.FLOAT_MAT4, quadCmd.mMatrix);
            program.sendUniformData("u_vMatrix", render.VariableType.FLOAT_MAT4, quadCmd.vMatrix);
            program.sendUniformData("u_pMatrix", render.VariableType.FLOAT_MAT4, quadCmd.pMatrix);
        }

        //todo typescript define options' type
        protected setShaderDefinition(){
            //todo use VariableLib.xxx?
            this.addAttributeVariable(["a_position"]);
            this.addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);

            this.vsSourceHead = ShaderChunk.common_head_vertex;
            this.vsSourceBody = ShaderChunk.common_body_vertex;
            this.fsSourceHead = ShaderChunk.common_head_fragment;
            this.fsSourceBody = ShaderChunk.common_body_fragment;
        }

        private _sendAttributeVariables(quadCmd:render.QuadCommand){
            var program = this.program;

            if (quadCmd.buffers.hasChild("vertexBuffer")) {
                program.sendAttributeData("a_position", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }

            //todo add it in TextureShaderLib?
            //if (quadCmd.buffers.hasChild("texCoordsBuffer")) {
            //    program.sendAttributeData("a_texCoord", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("texCoordsBuffer"));
            //}
        }
    }
}

