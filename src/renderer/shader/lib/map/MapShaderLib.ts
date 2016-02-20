module wd{
    export abstract class MapShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            var texCoordBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.TEXCOORD);

            if(!texCoordBuffer){
                return;
            }

            this.sendAttributeData(program, "a_texCoord", texCoordBuffer);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);

            this.addUniformVariable(["u_sampler2D0", "u_sourceRegion", "u_repeatRegion"]);

            this._setMapSource();
        }

        private _setMapSource(){
            var vs = this.getVsChunk("map_forBasic"),
                fs = this.getFsChunk("map_forBasic");

            this.vsSourceTop= vs.top;
            this.vsSourceDefine= vs.define;
            this.vsSourceVarDeclare= vs.varDeclare;
            this.vsSourceFuncDeclare= vs.funcDeclare;
            this.vsSourceFuncDefine= vs.funcDefine;
            this.vsSourceBody = vs.body;

            this.setFsSource(fs);
        }
    }
}

