module wd{
    export class Shadow extends Component {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _receive:boolean = true;
        @cloneAttributeAsBasicType()
        get receive() {
            return this._receive;
        }

        set receive(receive:boolean) {
            this._receive = receive;
        }

        private _cast:boolean = true;
        @cloneAttributeAsBasicType()
        get cast() {
            return this._cast;
        }

        set cast(cast:boolean) {
            this._cast = cast;
        }

        public entityObject:GameObject;

        private _layer:string = <any>EShadowLayer.DEFAULT;
        @cloneAttributeAsBasicType()
        get layer(){
            if(InstanceUtils.isObjectInstance(this.entityObject) && !InstanceUtils.isHardwareSupport()){
                this._layer = this.entityObject.getComponent<ObjectInstance>(ObjectInstance).sourceObject.getComponent<Shadow>(Shadow).layer;
            }

            return this._layer;
        }
        set layer(layer:string){
            if(layer && this._layer !== layer){
                this._layer = layer;
            }
        }

        private _shadowMapLayerChangeSubscription:wdFrp.IDisposable = null;

        @require(function (entityObject:EntityObject, isShareComponent:boolean = false) {
            assert(entityObject instanceof GameObject, Log.info.FUNC_SHOULD("add to GameObject"));
        })
        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false) {
            super.addToObject(entityObject, isShareComponent);
        }

        public clone() {
            return CloneHelper.clone(this);
        }

        public init() {
            var self = this;

            if(InstanceUtils.isObjectInstance(this.entityObject)
                || !this._isFirstLevelObjectOfSceneOrSpacePartition()){
                return;
            }

            if (this.receive) {
                this._handleReceive();
            }

            this._shadowMapLayerChangeSubscription = EventManager.fromEvent(<any>EEngineEvent.SHADOWMAP_LAYER_CHANGE)
                .subscribe(() => {
                    if (self.receive) {
                        self._handleReceive();
                    }
                });
        }

        public dispose(){
            this._shadowMapLayerChangeSubscription && this._shadowMapLayerChangeSubscription.dispose();
        }

        private _addAllShadowMaps(twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>>, cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>>, mapManager:MapManager){
            twoDShadowMapDataMap.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>) => {
                twoDShadowMapDataList.forEach(({shadowMap}) => {
                    mapManager.addTwoDShadowMap(shadowMap);
                });
            });

            cubemapShadowMapDataMap.forEach((cubemapShadowMapDataList:wdCb.Collection<CubemapShadowMapData>) => {
                cubemapShadowMapDataList.forEach(({shadowMap}) => {
                    mapManager.addCubemapShadowMap(shadowMap);
                });
            });
        }

        private _isFirstLevelObjectOfSceneOrSpacePartition(){
            var parent:GameObject = this.entityObject.parent;

            if(!parent){
                return false;
            }

            return JudgeUtils.isEqual(parent, Director.getInstance().scene) || JudgeUtils.isSpacePartitionObject(parent);
        }

        private _handleReceive(){
            var self = this,
                twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).twoDShadowMapDataMap,
                cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).cubemapShadowMapDataMap;
            var handle = (gameObject:GameObject) => {
                if (gameObject.hasComponent(Geometry)) {
                    let material:Material = gameObject.getComponent<Geometry>(Geometry).material,
                        mapManager:MapManager = material.mapManager;

                    material.shader.libDirty = true;

                    mapManager.removeAllShdaowMaps();

                    self._addAllShadowMaps(twoDShadowMapDataMap, cubemapShadowMapDataMap, mapManager);

                }

                gameObject.forEach((child:GameObject) => {
                    handle(child);
                });
            };

            handle(this.entityObject);
        }
    }
}
