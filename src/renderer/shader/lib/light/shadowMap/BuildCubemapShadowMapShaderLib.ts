module wd{
    export class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "buildCubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            //this.sendUniformData(program, "u_lightPos", material.buildCubemapShadowMapData.lightPos);
            //this.sendUniformData(program, "u_farPlane", material.buildCubemapShadowMapData.farPlane);

            var {light} = <BuildCubemapShadowMapShaderLibData>(Director.getInstance().scene.glslData.getChild(<any>EShaderGLSLData.BUILD_CUBEMAP_SHADOWMAP));

            this.sendUniformData(program, "u_lightPos", light.position);
            this.sendUniformData(program, "u_farPlane", light.shadowCameraFar);
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

