/// <reference path="../../../../definitions.d.ts"/>
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

        public sendShaderVariables(program:Program, quadCmd:render.QuadCommand, material:Material){
            this._sendAttributeVariables(program, quadCmd);

            program.sendUniformData("u_mMatrix", render.VariableType.FLOAT_MAT4, quadCmd.mMatrix);
            program.sendUniformData("u_vMatrix", render.VariableType.FLOAT_MAT4, quadCmd.vMatrix);
            program.sendUniformData("u_pMatrix", render.VariableType.FLOAT_MAT4, quadCmd.pMatrix);
        }

        protected setShaderDefinition(){
            //todo use VariableLib.xxx?
            this.addAttributeVariable(["a_position"]);
            this.addUniformVariable(["u_mMatrix", "u_vMatrix", "u_pMatrix"]);

            this.vsSourceHead = ShaderChunk.common_head_vertex;
            this.vsSourceBody = ShaderChunk.common_body_vertex;
            this._setPrecision();
            this.fsSourceBody = ShaderChunk.common_body_fragment;
        }

        private _setPrecision(){
            var precision = GPUDetector.getInstance().precision,
                result = null;

            switch (precision){
                case GPUPrecision.HIGHP:
                    result = ShaderChunk.highp_head_fragment;
                    break;
                case GPUPrecision.MEDIUMP:
                    result = ShaderChunk.mediump_head_fragment;
                    break;
                case GPUPrecision.LOWP:
                    result = ShaderChunk.lowp_head_fragment;
                    break;
                default:
                    //dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("precision"));
                    result = "";
                    break;
            }

            this.fsSourceHead = result;
        }

        private _sendAttributeVariables(program: Program, quadCmd:render.QuadCommand){
            if (quadCmd.buffers.hasChild("vertexBuffer")) {
                program.sendAttributeData("a_position", render.VariableType.BUFFER, <render.ArrayBuffer>quadCmd.buffers.getChild("vertexBuffer"));
            }
            else {
                dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
            }
        }
    }
}

