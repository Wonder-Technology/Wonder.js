/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "buildCubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            this.sendUniformData(program, "u_lightPos", material.buildCubemapShadowMapData.lightPos);
            this.sendUniformData(program, "u_farPlane", material.buildCubemapShadowMapData.farPlane);
        }

        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this.addUniformVariable([
                "u_lightPos", "u_farPlane"
            ]);
        }
    }
}

