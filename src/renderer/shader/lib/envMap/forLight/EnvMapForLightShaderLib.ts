/// <reference path="../../../../../filePath.d.ts"/>
module dy{
    export abstract class EnvMapForLightShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_samplerCube0"]);

            this.vsSourceBody = ShaderSnippet.setPos_mvp + this.getVsChunk().body;
        }

        protected setEnvMapSource(){
            var vs = this.getVsChunk("envMap_forLight"),
                fs = this.getFsChunk("envMap_forLight");

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

