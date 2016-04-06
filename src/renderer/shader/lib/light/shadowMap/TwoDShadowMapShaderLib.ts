module wd{
    export class TwoDShadowMapShaderLib extends ShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "twoDShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
           Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.TWOD_SHADOWMAP).forEach((data:BuildTwoDShadowMapData, index:number) => {
               var camera:CameraController = data.camera,
                   light:Light = data.light;

               //todo cache vpMatrix
                program.sendStructureData(`u_vpMatrixFromLight[${index}]`, EVariableType.FLOAT_MAT4, camera.worldToCameraMatrix.applyMatrix(camera.pMatrix, true));
                program.sendStructureData(`u_twoDShadowSize[${index}]`, EVariableType.FLOAT_2, [light.shadowMapWidth, light.shadowMapHeight]);
                program.sendStructureData(`u_twoDShadowBias[${index}]`, EVariableType.FLOAT_1, light.shadowBias);
                program.sendStructureData(`u_twoDShadowDarkness[${index}]`, EVariableType.FLOAT_1, light.shadowDarkness);
                program.sendStructureData(`u_twoDLightPos[${index}]`, EVariableType.FLOAT_3, light.position);
            });
        }
    }

    export type BuildTwoDShadowMapData = {
        camera:CameraController,
        light:Light
    }
}

