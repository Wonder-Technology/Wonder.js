/// <reference path="../../../../definitions.d.ts"/>
module dy.render{
    export class RefractionShaderLib extends EnvMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program:Program, quadCmd:render.QuadCommand, material:EnvMapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            program.sendUniformData("u_refractionRatio", render.VariableType.FLOAT_1, material.refractionRatio);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_refractionRatio"]);

            this.setVsSource();
            this.fsSourceHead = ShaderChunk.envMap_head_fragment;
            this.fsSourceBody = ShaderChunk.envMap_body_fragment + ShaderChunk.refraction_body_fragment;
        }
    }
}

