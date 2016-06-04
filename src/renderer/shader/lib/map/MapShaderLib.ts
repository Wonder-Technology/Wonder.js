module wd{
    export abstract class MapShaderLib extends EngineShaderLib{
        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:BasicMaterial) {
            var texCoordBuffer:ArrayBuffer = quadCmd.buffers.getChild(EBufferDataType.TEXCOORD),
                mapList:wdCb.Collection<BasicTexture|ProceduralTexture> = null,
                map0:BasicTexture|ProceduralTexture = null;

            if(!texCoordBuffer){
                return;
            }

            this.sendAttributeBuffer(program, "a_texCoord", texCoordBuffer);


            mapList = material.mapList;
            map0 = mapList.getChild(0);

            this.sendUniformData(program, "u_map0SourceRegion", map0.sourceRegionForGLSL);
            this.sendUniformData(program, "u_map0RepeatRegion", map0.repeatRegion);

            this.sendMapShaderVariables(program, quadCmd, material);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:BasicMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addAttributeVariable(["a_texCoord"]);

            this.addUniformVariable(["u_sampler2D0", "u_map0SourceRegion", "u_map0RepeatRegion"]);

            this._setMapSource();
        }

        @virtual
        protected sendMapShaderVariables(program:Program, quadCmd:QuadCommand, material:BasicMaterial){
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

