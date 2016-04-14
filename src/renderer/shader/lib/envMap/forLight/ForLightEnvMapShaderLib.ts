module wd{
    export abstract class ForLightEnvMapShaderLib extends EnvMapShaderLib{
        protected setEnvMapSource(){
            var vs = this.getVsChunk("forLight_envMap"),
                fs = this.getFsChunk("forLight_envMap");

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

