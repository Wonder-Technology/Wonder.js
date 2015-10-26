/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class EnvMapShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            if (quadCmd.buffers.hasChild("normalBuffer")) {
                program.sendAttributeData("a_normal", VariableType.BUFFER, <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            program.sendUniformData("u_normalMatrix", VariableType.FLOAT_MAT3, quadCmd.mMatrix.copy().invertTo3x3().transpose());
            program.sendUniformData("u_cameraPos", VariableType.FLOAT_3, Director.getInstance().stage.camera.transform.position);
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_normal"]);

            this.addUniformVariable(["u_samplerCube0", "u_cameraPos", "u_normalMatrix"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp + this.getVsChunk().body;
        }

        protected setEnvMapSource(){
            var vs = this.getVsChunk("envMap"),
                fs = this.getFsChunk("envMap");

            this.vsSourceTop= vs.top;
            this.vsSourceDefine= vs.define;
            this.vsSourceVarDeclare= vs.varDeclare;
            this.vsSourceFuncDeclare= vs.funcDeclare;
            this.vsSourceFuncDefine= vs.funcDefine;
            this.vsSourceBody += vs.body;

            this.setFsSource(fs);
        }
    }
}

