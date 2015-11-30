/// <reference path="../../../../../filePath.d.ts"/>
module wd{
    export abstract class ShadowMapShaderLib extends ShaderLib{
        public setShaderDefinition(quadCmd:QuadCommand, material:Material){
            super.setShaderDefinition(quadCmd, material);

            this._setShadowMapSource();
        }

        private _setShadowMapSource(){
            var scene:Scene = Director.getInstance().scene,
                twoDShadowMapCount = scene.directionLights? scene.directionLights.filter((light:GameObject) => {
                    return light.getComponent<DirectionLight>(DirectionLight).castShadow;
                }).getCount() : 0,
                cubemapShadowMapCount = scene.pointLights ? scene.pointLights.filter((light:GameObject) => {
                    return light.getComponent<PointLight>(PointLight).castShadow;
                }).getCount() : 0;



            if(scene.shadowMap.softType === ShadowMapSoftType.PCF){
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

