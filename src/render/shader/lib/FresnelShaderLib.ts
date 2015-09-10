/// <reference path="../../../definitions.d.ts"/>
module dy.render{
    export class FresnelShaderLib extends CubemapShaderLib{
        private static _instance:FresnelShaderLib = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public sendShaderVariables(program:Program, quadCmd:render.QuadCommand, material:CubemapMaterial) {
            super.sendShaderVariables(program, quadCmd, material);

            program.sendUniformData("u_refractionRatio", render.VariableType.FLOAT_1, material.refractionRatio);

            if(material.reflectivity !== null){
                program.sendUniformData("u_reflectivity", render.VariableType.FLOAT_1, material.reflectivity);
            }
            else{
                program.sendUniformData("u_reflectivity", render.VariableType.FLOAT_1, -1);
            }
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable(["u_refractionRatio", "u_reflectivity"]);

            this.setVsSource();
            this.fsSourceHead = ShaderChunk.cubemap_head_fragment + ShaderChunk.fresnel_head_fragment;
            this.fsSourceBody = ShaderChunk.cubemap_body_fragment + ShaderChunk.fresnel_body_fragment;
        }
    }
}

