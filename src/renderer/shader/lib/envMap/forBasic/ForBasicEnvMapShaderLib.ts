module wd{
    export abstract class ForBasicEnvMapShaderLib extends EngineShaderLib{
        //todo modify
        public sendShaderVariables(program:Program, quadCmd:any, material:EngineMaterial) {
            this.sendUniformData(program, "u_normalMatrix", quadCmd.normalMatrix);
            this.sendUniformData(program, "u_cameraPos", Director.getInstance().scene.currentCamera.transform.position);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_samplerCube0", "u_cameraPos", "u_normalMatrix"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp + this.getVsChunk().body;
        }

        protected setEnvMapSource(){
            var vs = this.getVsChunk("forBasic_envMap"),
                fs = this.getFsChunk("forBasic_envMap");

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

