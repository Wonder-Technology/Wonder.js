module wd {
    export class ShadowMapManager{
        public static create(shadowManager:ShadowManager) {
            var obj = new this(shadowManager);

            return obj;
        }

        constructor(shadowManager:ShadowManager){
            this._shadowManager = shadowManager;
        }

        get twoDShadowMapCount(){
            return this.twoDShadowMapDataMap.getCount() * this._shadowManager.entityObject.directionLights.getCount();
        }

        get cubemapShadowMapCount(){
            return this.cubemapShadowMapDataMap.getCount() * this._shadowManager.entityObject.pointLights.getCount();
        }

        public twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = wdCb.Hash.create<wdCb.Collection<TwoDShadowMapData>>();
        public cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>> = wdCb.Hash.create<wdCb.Collection<CubemapShadowMapData>>();

        private _shadowManager:ShadowManager = null;
        private _layerList:wdCb.Collection<string> = wdCb.Collection.create<string>();
        private _shadowMapLayerChangeSubscription:wdFrp.IDisposable = null;

        public initShadowMapData(){
            let scene:GameObjectScene = null;

            if(!this._hasShadow()) {
                return;
            }

            scene = this._shadowManager.entityObject;

            this._layerList = this._shadowManager.getShadowLayerList();

            if(scene.directionLights){
                scene.directionLights.forEach((lightObject:GameObject) => {
                    var light:DirectionLight = lightObject.getComponent<DirectionLight>(DirectionLight);

                    if(light.castShadow){
                        this._addTwoDShadowMapDataiWithLayer(light);
                    }
                }, this);
            }

            if(scene.pointLights){
                scene.pointLights.forEach((lightObject:GameObject) => {
                    var light:PointLight = lightObject.getComponent<PointLight>(PointLight);

                    if(light.castShadow){
                        this._addCubemapShadowMapDataiWithLayer(light);
                    }
                }, this);
            }
        }

        @require(function(){
            assert(!this._layerList.hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("has repeat shadow layer"));
        })
        private _addTwoDShadowMapDataiWithLayer(light:DirectionLight){
            this._layerList.forEach((layer:string) => {

                this.twoDShadowMapDataMap.appendChild(layer, {
                    shadowMap: TwoDShadowMapTexture.create(),
                    light: light
                });
            }, this);
        }

        @require(function(){
            assert(!this._layerList.hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("has repeat shadow layer"));
        })
        private _addCubemapShadowMapDataiWithLayer(light:PointLight){
            this._layerList.forEach((layer:string) => {

                this.cubemapShadowMapDataMap.appendChild(layer, {
                    shadowMap: CubemapShadowMapTexture.create(),
                    light: light
                });
            }, this);
        }

        public dispose(){
            this._shadowMapLayerChangeSubscription.dispose();
        }

        private _hasShadow(){
            var scene = this._shadowManager.entityObject;

            return !!scene.directionLights || !!scene.pointLights;
        }
    }

    export type TwoDShadowMapData = {
        shadowMap:TwoDShadowMapTexture;
        light:DirectionLight;
    }

    export type CubemapShadowMapData = {
        shadowMap:CubemapShadowMapTexture;
        light:DirectionLight;
    }
}
