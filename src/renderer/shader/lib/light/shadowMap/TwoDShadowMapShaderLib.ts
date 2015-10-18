/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class TwoDShadowMapShaderLib extends ShadowMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "twoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            material.twoDShadowMapDatas.forEach((data:TwoDShadowMapData, index:number) => {
                program.sendUniformData(`u_vpMatrixFromLight[${index}]`, VariableType.FLOAT_MAT4, data.vpMatrixFromLight);
                program.sendUniformData(`u_twoDShadowSize[${index}]`, VariableType.FLOAT_2, data.shadowSize);
                program.sendUniformData(`u_twoDShadowBias[${index}]`, VariableType.FLOAT_1, data.shadowBias);
                program.sendUniformData(`u_twoDShadowDarkness[${index}]`, VariableType.FLOAT_1, data.shadowDarkness);
                program.sendUniformData(`u_twoDLightPos[${index}]`, VariableType.FLOAT_3, data.lightPos);
            });
        }
    }
}

