/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class EnvMapShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            if (quadCmd.buffers.hasChild("normalBuffer")) {
                this.sendAttributeData(program, "a_normal", <ArrayBuffer>quadCmd.buffers.getChild("normalBuffer"));
            }

            this.sendUniformData(program, "u_normalMatrix", quadCmd.mMatrix.copy().invertTo3x3().transpose());
            this.sendUniformData(program, "u_cameraPos", Director.getInstance().stage.camera.transform.position);
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

