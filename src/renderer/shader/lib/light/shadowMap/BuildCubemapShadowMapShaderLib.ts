module wd{
    export class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "buildCubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.BUILD_CUBEMAP_SHADOWMAP).forEach((data:CubemapShadowMapShaderLibData, index:number) => {
                var light = data.light;

                program.sendVector3("u_lightPos", light.position);
                program.sendFloat1("u_farPlane", light.shadowCameraFar);
            });
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_lightPos", "u_farPlane"
            ]);
        }
    }

    export type BuildCubemapShadowMapShaderLibData = {
        light:Light
    }
}

