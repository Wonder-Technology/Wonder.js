/// <reference path="../../../../definitions.d.ts"/>
module dy{
    //todo support more than 2 maps
    export class MultiMapShaderLib extends MapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "multi_map";

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:MapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            this.sendUniformData(program, "u_combineMode", material.combineMode);
            this.sendUniformData(program, "u_mixRatio", material.mixRatio);
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable(["u_sampler2D1", "u_combineMode", "u_mixRatio"]);

            this.fsSourceBody = this.getFsChunk().body;
        }
    }
}

