module wd {
    export class ShadowMapManager{
        public static create(shadowManager:ShadowManager) {
            var obj = new this(shadowManager);

            return obj;
        }

        constructor(shadowManager:ShadowManager){
            this._shadowManager = shadowManager;
        }

        get twoDShadowMapCountForGLSL(){
            var count = 0;

            this.twoDShadowMapDataMap
                .forEach((dataList:wdCb.Collection<TwoDShadowMapData>) => {
                    count += dataList.getCount();
                });

            return count;
        }

        get cubemapShadowMapCountForGLSL(){
            var count = 0;

            this.cubemapShadowMapDataMap.forEach((dataList:wdCb.Collection<CubemapShadowMapData>) => {
                count += dataList.getCount();
            });

            return count;
        }

        public twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = wdCb.Hash.create<wdCb.Collection<TwoDShadowMapData>>();
        public cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>> = wdCb.Hash.create<wdCb.Collection<CubemapShadowMapData>>();

        private _shadowManager:ShadowManager = null;
        private _lastTwoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = null;
        private _lastCubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>> = null;

        public initShadowMapData(shadowLayerList:ShadowLayerList){
            var scene:GameObjectScene = this._shadowManager.gameObjectScene;

            if(scene.directionLights){
                scene.directionLights.forEach((lightObject:GameObject) => {
                    var light:DirectionLight = lightObject.getComponent<DirectionLight>(DirectionLight);

                    if(light.castShadow){
                        this._addTwoDShadowMapDataWithLayer(shadowLayerList, light);
                    }
                }, this);
            }

            if(scene.pointLights){
                scene.pointLights.forEach((lightObject:GameObject) => {
                    var light:PointLight = lightObject.getComponent<PointLight>(PointLight);

                    if(light.castShadow){
                        this._addCubemapShadowMapDataWithLayer(shadowLayerList, light);
                    }
                }, this);
            }
        }

        public updateWhenShadowLayerChange({addLayerList,removeLayerList}){
            var scene:GameObjectScene = null;

            scene = this._shadowManager.gameObjectScene;

            if(scene.directionLights){
                let twoDShadowMapDataMap = this.twoDShadowMapDataMap;

                this._lastTwoDShadowMapDataMap = twoDShadowMapDataMap.clone();

                removeLayerList.forEach((layer:string) => {
                    twoDShadowMapDataMap.removeChild(layer);
                });

                scene.directionLights.forEach((lightObject:GameObject) => {
                    var light:DirectionLight = lightObject.getComponent<DirectionLight>(DirectionLight);

                    if(light.castShadow){
                        this._addTwoDShadowMapDataWithLayer(addLayerList, light);
                    }
                }, this);
            }

            if(scene.pointLights){
                let cubemapShadowMapDataMap = this.cubemapShadowMapDataMap;

                this._lastCubemapShadowMapDataMap = cubemapShadowMapDataMap.clone();

                removeLayerList.forEach((layer:string) => {
                    cubemapShadowMapDataMap.removeChild(layer);
                });

                scene.pointLights.forEach((lightObject:GameObject) => {
                    var light:PointLight = lightObject.getComponent<PointLight>(PointLight);

                    if(light.castShadow){
                        this._addCubemapShadowMapDataWithLayer(addLayerList, light);
                    }
                }, this);
            }
        }

        public getAllDiffShadowMapDataWhenShadowLayerChange():any{
            var twoDDiff = this._getDiffShadowMapDataWhenShadowLayerChange(this._lastTwoDShadowMapDataMap, this.twoDShadowMapDataMap),
                cubemapDiff = this._getDiffShadowMapDataWhenShadowLayerChange(this._lastCubemapShadowMapDataMap, this.cubemapShadowMapDataMap);

            return {
                addTwoDShadowMapData: twoDDiff.addShadowMapData,
                removeTwoDShadowMapData: twoDDiff.removeShadowMapData,
                addCubemapShadowMapData: cubemapDiff.addShadowMapData,
                removeCubemapShadowMapData: cubemapDiff.removeShadowMapData
            }
        }

        private _getDiffShadowMapDataWhenShadowLayerChange(lastShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData|CubemapShadowMapData>>, currentShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData|CubemapShadowMapData>>){
            var addShadowMapData = wdCb.Hash.create<wdCb.Collection<TwoDShadowMapData|CubemapShadowMapData>>(),
                removeShadowMapData = wdCb.Collection.create<TwoDShadowMapData|CubemapShadowMapData>();

            removeShadowMapData = lastShadowMapDataMap
                .filter((shadowMapDataList:wdCb.Collection<TwoDShadowMapData|CubemapShadowMapData>, layer:string) => {
                    return !currentShadowMapDataMap.hasChild(layer);
                })
                .toCollection();


            addShadowMapData = currentShadowMapDataMap
                .filter((shadowMapDataList:wdCb.Collection<TwoDShadowMapData|CubemapShadowMapData>, layer:string) => {
                    return !lastShadowMapDataMap.hasChild(layer);
                });

            return {
                addShadowMapData: addShadowMapData,
                removeShadowMapData: removeShadowMapData
            }
        }

        @require(function(layerList:wdCb.Collection<string>|ShadowLayerList, light:DirectionLight){
            assert(!layerList.hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("has repeat shadow layer"));
        })
        private _addTwoDShadowMapDataWithLayer(layerList:wdCb.Collection<string>|ShadowLayerList, light:DirectionLight){
            var twoDShadowMapDataMap = this.twoDShadowMapDataMap;

            layerList.forEach((layer:string) => {

                twoDShadowMapDataMap.appendChild(layer, {
                    shadowMap: TwoDShadowMapTexture.create(),
                    light: light
                });
            });
        }

        @require(function(layerList:wdCb.Collection<string>, light:PointLight){
            assert(!layerList.hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("has repeat shadow layer"));
        })
        private _addCubemapShadowMapDataWithLayer(layerList:wdCb.Collection<string>|ShadowLayerList, light:PointLight){
            var cubemapShadowMapDataMap = this.cubemapShadowMapDataMap;

            layerList.forEach((layer:string) => {

                cubemapShadowMapDataMap.appendChild(layer, {
                    shadowMap: CubemapShadowMapTexture.create(),
                    light: light
                });
            });
        }

        public dispose(){
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

