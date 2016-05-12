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
                    program.sendNum1(`u_isTwoDRenderListEmpty[${index}]`, 1);
                    return
                }

                program.sendNum1(`u_isTwoDRenderListEmpty[${index}]`, 0);

                //todo cache vpMatrix
                program.sendMatrix4(`u_vpMatrixFromLight[${index}]`, camera.worldToCameraMatrix.applyMatrix(camera.pMatrix, true));
                program.sendFloat2(`u_twoDShadowSize[${index}]`, [light.shadowMapWidth, light.shadowMapHeight]);
                program.sendFloat1(`u_twoDShadowBias[${index}]`, light.shadowBias);
                program.sendFloat1(`u_twoDShadowDarkness[${index}]`, light.shadowDarkness);
                program.sendVector3(`u_twoDLightPos[${index}]`, light.position);
            });
        }
    }

    export type TwoDShadowMapShaderLibData = {
        camera:CameraController,
        light:Light,
        isRenderListEmpty:boolean
    }
}

