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

            program.sendUniformData("u_combineMode", VariableType.NUMBER_1, material.combineMode);
            program.sendUniformData("u_mixRatio", VariableType.FLOAT_1, material.mixRatio);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_sampler2D1", "u_combineMode", "u_mixRatio"]);

            this.fsSourceBody = this.getFsChunk().body;
        }
    }
}

