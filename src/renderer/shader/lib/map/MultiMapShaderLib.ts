module wd{
    //todo support more than 2 maps
    export class MultiMapShaderLib extends MapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "multi_map_forBasic";


        protected sendMapShaderVariables(program:Program, quadCmd:QuadCommand, material:BasicMaterial){
            var mapList:wdCb.Collection<BasicTexture> = material.mapList,
                map1 = mapList.getChild(1);

            this.sendUniformData(program, "u_combineMode", material.mapCombineMode);
            this.sendUniformData(program, "u_mixRatio", material.mapMixRatio);

            this.sendUniformData(program, "u_map1SourceRegion", map1.sourceRegionForGLSL);
            this.sendUniformData(program, "u_map1RepeatRegion", map1.repeatRegion);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:BasicMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_sampler2D1", "u_combineMode", "u_mixRatio",
                "u_map1SourceRegion", "u_map1RepeatRegion"
            ]);


            this.vsSourceVarDeclare += this.getVsChunk().varDeclare;
            this.vsSourceBody += this.getVsChunk().body;

            this.fsSourceVarDeclare = this.getFsChunk().varDeclare;
            this.fsSourceFuncDefine = this.getFsChunk().funcDefine;
            this.fsSourceBody = this.getFsChunk().body;
        }
    }
}

