/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class TwoDShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
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

