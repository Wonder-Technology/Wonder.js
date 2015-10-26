/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export class BuildCubemapShadowMapShaderLib extends BuildShadowMapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }

        public type:string = "buildCubemapShadowMap";

        public sendShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            program.sendUniformData("u_lightPos", VariableType.FLOAT_3, material.buildCubemapShadowMapData.lightPos);
            program.sendUniformData("u_farPlane", VariableType.FLOAT_1, material.buildCubemapShadowMapData.farPlane);
        }

        protected setShaderDefinition(){
            super.setShaderDefinition();

            this.addUniformVariable([
                "u_lightPos", "u_farPlane"
            ]);
        }
    }
}

