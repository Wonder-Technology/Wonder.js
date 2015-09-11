/// <reference path="../../../../definitions.d.ts"/>
module dy{
    //todo support more than 2 maps
    export class MultiMapShaderLib extends MapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program:Program, quadCmd:QuadCommand, material:MapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            program.sendUniformData("u_combineMode", VariableType.NUMBER_1, material.combineMode);
            program.sendUniformData("u_mixRatio", VariableType.FLOAT_1, material.mixRatio);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_sampler2D1", "u_combineMode", "u_mixRatio"]);

            this.fsSourceBody = ShaderChunk.multi_map_body_fragment;
        }
    }
}

