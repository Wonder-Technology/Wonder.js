module wd{
    //todo support more than 2 maps
    export class MultiMapShaderLib extends MapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "multi_map_forBasic";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:Material) {
            super.sendShaderVariables(program, quadCmd, material);

            this.sendUniformData(program, "u_combineMode", material.mapCombineMode);
            this.sendUniformData(program, "u_mixRatio", material.mapMixRatio);
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_sampler2D1", "u_combineMode", "u_mixRatio"]);

            this.fsSourceFuncDefine = this.getFsChunk().funcDefine;
            this.fsSourceBody = this.getFsChunk().body;
        }
    }
}

