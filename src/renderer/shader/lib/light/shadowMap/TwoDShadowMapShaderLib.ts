module wd{
    export class TwoDShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "twoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var glslData = null;

            glslData = Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.TWOD_SHADOWMAP);

            if(!glslData){
                return;
            }

            glslData.forEach((data:TwoDShadowMapShaderLibData, index:number) => {
                var camera:CameraController = data.camera,
                    light:Light = data.light;

                if(data.isRenderListEmpty){
                    program.sendStructureData(`u_isTwoDRenderListEmpty[${index}]`, EVariableType.NUMBER_1, 1);
                    return
                }


                program.sendStructureData(`u_isTwoDRenderListEmpty[${index}]`, EVariableType.NUMBER_1, 0);

                //todo cache vpMatrix
                program.sendStructureData(`u_vpMatrixFromLight[${index}]`, EVariableType.FLOAT_MAT4, camera.worldToCameraMatrix.applyMatrix(camera.pMatrix, true));
                program.sendStructureData(`u_twoDShadowSize[${index}]`, EVariableType.FLOAT_2, [light.shadowMapWidth, light.shadowMapHeight]);
                program.sendStructureData(`u_twoDShadowBias[${index}]`, EVariableType.FLOAT_1, light.shadowBias);
                program.sendStructureData(`u_twoDShadowDarkness[${index}]`, EVariableType.FLOAT_1, light.shadowDarkness);
                program.sendStructureData(`u_twoDLightPos[${index}]`, EVariableType.FLOAT_3, light.position);
            });
        }
    }

    export type TwoDShadowMapShaderLibData = {
        camera:CameraController,
        light:Light,
        isRenderListEmpty:boolean
    }
}

