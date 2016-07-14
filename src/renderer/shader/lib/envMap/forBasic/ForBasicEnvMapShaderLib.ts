module wd{
    export abstract class ForBasicEnvMapShaderLib extends EnvMapShaderLib{
        public sendShaderVariables(program:Program, cmd:QuadCommand, material:EngineMaterial) {
            super.sendShaderVariables(program, cmd, material);

            this.sendUniformData(program, "u_cameraPos", Director.getInstance().scene.currentCamera.transform.position);
        }

        public setShaderDefinition(cmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(cmd, material);

            this.addUniformVariable(["u_cameraPos"]);
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

