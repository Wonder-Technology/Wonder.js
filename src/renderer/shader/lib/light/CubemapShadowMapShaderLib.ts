/// <reference path="../../../../definitions.d.ts"/>
module dy{
    export class CubemapShadowMapShaderLib extends ShadowMapShaderLib{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        }

        public type:string = "cubemapShadowMap";

        //protected getShadowMapData(material:LightMaterial):CubemapShadowMapData{
        //    return material.cubemapShadowMapData;
        //}

        protected sendShadowMapShaderVariables(program: Program, quadCmd:QuadCommand, material:LightMaterial){
            var stage = Director.getInstance().stage,
                shadowMapData = stage.cubemapShadowMaps;

            shadowMapData.forEach((data:CubemapShadowMapData, index:number) => {
                program.sendUniformData(`u_lightPos[${index}]`, VariableType.FLOAT_3, data.lightPos);
                program.sendUniformData(`u_farPlane[${index}]`, VariableType.FLOAT_1, data.farPlane);
                program.sendUniformData(`u_shadowBias[${index}]`, VariableType.FLOAT_1, data.shadowBias);
                program.sendUniformData(`u_shadowDarkness[${index}]`, VariableType.FLOAT_1, data.shadowDarkness);
            });
        }

        //todo remove
        protected addShadowMapUniformVariable(){
            //this.addUniformVariable([
            //    VariableNameTable.getVariableName("cubemapShadowMap"),
            //    "u_lightPos", "u_farPlane"
            //]);
        }

    }
}

