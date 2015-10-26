/// <reference path="../../../../../definitions.d.ts"/>
module dy{
    export abstract class ShadowMapShaderLib extends ShaderLib{
        protected setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this._setShadowMapSource();
        }

        private _setShadowMapSource(){
            var stage:Stage = Director.getInstance().stage,
                twoDShadowMapCount = stage.directionLights? stage.directionLights.filter((light:GameObject) => {
                    return light.getComponent<DirectionLight>(DirectionLight).castShadow;
                }).getCount() : 0,
                cubemapShadowMapCount = stage.pointLights ? stage.pointLights.filter((light:GameObject) => {
                    return light.getComponent<PointLight>(PointLight).castShadow;
                }).getCount() : 0;



            if(stage.shadowMap.softType === ShadowMapSoftType.PCF){
                this.fsSourceDefineList.addChildren([{
                    name: "SHADOWMAP_TYPE_PCF"
                }]);
            }

            this.vsSourceDefineList.addChild(
                {
                    name: "TWOD_SHADOWMAP_COUNT",
                    value: twoDShadowMapCount
                });

            this.fsSourceDefineList.addChildren([
                {
                    name: "TWOD_SHADOWMAP_COUNT",
                    value: twoDShadowMapCount
                },
                {
                    name: "CUBEMAP_SHADOWMAP_COUNT",
                    value: cubemapShadowMapCount
                },
            ]);
        }
    }
}

