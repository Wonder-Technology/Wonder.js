module wd{
    export abstract class ShadowMapShaderLib extends EngineShaderLib{
        private _softTypeChangeSubscription:wdFrp.IDisposable = null;

        public init(){
            var shader = this.shader;

            this._softTypeChangeSubscription = EventManager.fromEvent(Director.getInstance().scene.gameObjectScene, <any>EEngineEvent.SHADOWMAP_SOFTTYPE_CHANGE)
                .subscribe(() => {
                    shader.libDirty = true;
                });
        }

        public dispose(){
            this._softTypeChangeSubscription && this._softTypeChangeSubscription.dispose();
        }

        public setShaderDefinition(quadCmd:QuadCommand, material:EngineMaterial){
            super.setShaderDefinition(quadCmd, material);

            this._setShadowMapSource();
        }

        private _setShadowMapSource(){
            var scene:SceneDispatcher = Director.getInstance().scene,
                shadowManager:ShadowManager = scene.gameObjectScene.getComponent<ShadowManager>(ShadowManager),
                twoDShadowMapCount = shadowManager.twoDShadowMapCount,
                //todo fix
                cubemapShadowMapCount = scene.pointLights ? scene.pointLights.filter((light:GameObject) => {
                    return light.getComponent<PointLight>(PointLight).castShadow;
                }).getCount() : 0;



            if(scene.shadowMap.softType === EShadowMapSoftType.PCF){
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

