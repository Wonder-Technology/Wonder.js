/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class CubemapShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "cubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            material.cubemapShadowMapDatas.forEach((data:CubemapShadowMapData, index:number) => {
                program.sendUniformData(`u_cubemapLightPos[${index}]`, VariableType.FLOAT_3, data.lightPos);
                program.sendUniformData(`u_farPlane[${index}]`, VariableType.FLOAT_1, data.farPlane);
                program.sendUniformData(`u_cubemapShadowBias[${index}]`, VariableType.FLOAT_1, data.shadowBias);
                program.sendUniformData(`u_cubemapShadowDarkness[${index}]`, VariableType.FLOAT_1, data.shadowDarkness);
            });
        }
    }
}

