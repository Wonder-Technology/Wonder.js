module wd{
    export class CommonShaderLib extends EngineShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "common";

        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial){
            var vMatrix = null,
                pMatrix = null;

            var entityObject = cmd.target;

            if(entityObject.data && entityObject.data.vMatrix){
                vMatrix = entityObject.data.vMatrix;
            }
            else{
                vMatrix = cmd.vMatrix;
            }

            if(entityObject.data && entityObject.data.pMatrix){
                pMatrix = entityObject.data.pMatrix;
            }
            else{
                pMatrix = cmd.pMatrix;
            }

            this.sendUniformData(program, "u_vMatrix", vMatrix);

            this.sendUniformData(program, "u_pMatrix", pMatrix);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            //todo use VariableLib.xxx?
            this.addUniformVariable(["u_vMatrix", "u_pMatrix"]);

            this.vsSourceDefine = ShaderChunk.common_define.define + ShaderChunk.common_vertex.define;
            this.vsSourceFuncDefine = ShaderChunk.common_function.funcDefine + ShaderChunk.common_vertex.funcDefine;

            this.fsSourceDefine = ShaderChunk.common_define.define + ShaderChunk.common_fragment.define;
            this.fsSourceFuncDefine = ShaderChunk.common_function.funcDefine + ShaderChunk.common_fragment.funcDefine;
        }
    }
}

