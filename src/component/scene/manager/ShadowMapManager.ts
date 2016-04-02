module wd {
    export class ShadowMapManager{
        public static create(shadowManager:ShadowManager) {
            var obj = new this(shadowManager);

            obj.initWhenCreate();

            return obj;
        }

        constructor(shadowManager:ShadowManager){
            this._shadowManager = shadowManager;
        }

        public twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = wdCb.Hash.create<wdCb.Collection<TwoDShadowMapData>>();

        private _shadowManager:ShadowManager = null;
        private _layerList:wdCb.Collection<string> = wdCb.Collection.create<string>();
        private _shadowMapLayerChangeSubscription:wdFrp.IDisposable = null;


        public initWhenCreate(){
            //var self = this;
            //
            //this._shadowMapLayerChangeSubscription = EventManager.fromEvent(<any>EEngineEvent.SHADOWMAP_LAYER_CHANGE)
            //.subscribe((e:CustomEvent) => {
            //    self._registerLayer(e.userData.layer);
            //});
        }

        public initShadowMapData(){
            if(!this._hasShadow()) {
                return;
            }

            let scene:GameObjectScene = this._shadowManager.entityObject;

            //this._layerList = this._layerList.removeRepeatItems();
            //if(this._layerList.getCount() === 0){
            //    this._layerList.addChild(<any>EShadowLayer.DEFAULT);
            //}
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
            assert(this._layerList.getCount() > 0, Log.info.FUNC_SHOULD("layerList.getCount()", "> 0"))
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

        //private _registerLayer(layer:string){
        //    this._layerList.addChild(layer);
        //}

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
