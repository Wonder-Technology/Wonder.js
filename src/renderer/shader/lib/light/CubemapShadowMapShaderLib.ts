/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class CubemapShadowMapShaderLib extends ShadowMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "cubemapShadowMap";

        protected sendShadowMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            material.cubemapShadowMapDatas.forEach((data:CubemapShadowMapData, index:number) => {
                program.sendUniformData(`u_cubemapLightPos[${index}]`, VariableType.FLOAT_3, data.lightPos);
                program.sendUniformData(`u_farPlane[${index}]`, VariableType.FLOAT_1, data.farPlane);
                program.sendUniformData(`u_cubemapShadowBias[${index}]`, VariableType.FLOAT_1, data.shadowBias);
                program.sendUniformData(`u_cubemapShadowDarkness[${index}]`, VariableType.FLOAT_1, data.shadowDarkness);
            });
        }
    }
}

