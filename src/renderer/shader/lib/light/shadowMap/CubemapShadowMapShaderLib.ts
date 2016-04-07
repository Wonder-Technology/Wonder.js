module wd{
    export class CubemapShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "cubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            //material.cubemapShadowMapDatas.forEach((data:CubemapShadowMapData, index:number) => {
            Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.CUBEMAP_SHADOWMAP).forEach((data:CubemapShadowMapShaderLibData, index:number) => {
                var light = data.light;

                program.sendStructureData(`u_cubemapLightPos[${index}]`, EVariableType.FLOAT_3, light.position);
                program.sendStructureData(`u_farPlane[${index}]`, EVariableType.FLOAT_1, light.shadowCameraFar);
                program.sendStructureData(`u_cubemapShadowBias[${index}]`, EVariableType.FLOAT_1, light.shadowBias);
                program.sendStructureData(`u_cubemapShadowDarkness[${index}]`, EVariableType.FLOAT_1, light.shadowDarkness);
            });
        }
    }

    export type CubemapShadowMapShaderLibData = {
        light:Light
    }
}

