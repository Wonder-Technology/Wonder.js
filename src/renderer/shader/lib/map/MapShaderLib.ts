/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export abstract class MapShaderLib extends ShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            if (quadCmd.buffers.hasChild("texCoordBuffer")) {
                this.sendAttributeData(program, "a_texCoord", <ArrayBuffer>quadCmd.buffers.getChild("texCoordBuffer"));
            }
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);

            this.addUniformVariable(["u_sampler2D0", "u_sourceRegion", "u_repeatRegion"]);

            this._setMapSource();
        }

        private _setMapSource(){
            var vs = this.getVsChunk("map"),
                fs = this.getFsChunk("map");

            this.vsSourceTop= vs.top;
            this.vsSourceDefine= vs.define;
            this.vsSourceVarDeclare= vs.varDeclare;
            this.vsSourceFuncDeclare= vs.funcDeclare;
            this.vsSourceFuncDefine= vs.funcDefine;
            this.vsSourceBody = ShaderSnippet.setPos_mvp + vs.body;

            this.setFsSource(fs);
            //this.vsSourceHead = ShaderChunk.map_head_vertex;
            //this.vsSourceBody += ShaderChunk.map_body_vertex;
            //this.fsSourceHead = ShaderChunk.map_head_fragment;
            //this.fsSourceBody = ShaderChunk.map_body_fragment;
        }
    }
}

