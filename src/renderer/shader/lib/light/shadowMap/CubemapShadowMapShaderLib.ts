module wd{
    export class CubemapShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "cubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var glslData = Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.CUBEMAP_SHADOWMAP);

            if(!glslData){
                return;
            }

            glslData.forEach((data:CubemapShadowMapShaderLibData, index:number) => {
                var light = data.light;

                if(data.isRenderListEmpty){
                    program.sendNum1(`u_isCubemapRenderListEmpty[${index}]`, 1);
                }
                else{
                    program.sendNum1(`u_isCubemapRenderListEmpty[${index}]`, 0);
                }

                program.sendVector3(`u_cubemapLightPos[${index}]`, light.position);
                program.sendFloat1(`u_farPlane[${index}]`, light.shadowCameraFar);
                program.sendFloat1(`u_cubemapShadowBias[${index}]`, light.shadowBias);
                program.sendFloat1(`u_cubemapShadowDarkness[${index}]`, light.shadowDarkness);
            });
        }
    }

    export type CubemapShadowMapShaderLibData = {
        light:Light,
        isRenderListEmpty:boolean
    }
}

