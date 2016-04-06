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

        public twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = wdCb.Hash.create<wdCb.Collection<TwoDShadowMapData>>();

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
}
