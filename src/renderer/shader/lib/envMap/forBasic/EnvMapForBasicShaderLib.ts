/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export abstract class EnvMapForBasicShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            this.sendUniformData(program, "u_normalMatrix", quadCmd.mMatrix.copy().invertTo3x3().transpose());
            this.sendUniformData(program, "u_cameraPos", Director.getInstance().scene.camera.transform.position);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_samplerCube0", "u_cameraPos", "u_normalMatrix"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp + this.getVsChunk().body;
        }

        protected setEnvMapSource(){
            var vs = this.getVsChunk("envMap_forBasic"),
                fs = this.getFsChunk("envMap_forBasic");

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

