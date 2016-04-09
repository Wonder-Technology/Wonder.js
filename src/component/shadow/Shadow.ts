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
            var material:Material = null;

            if(InstanceUtils.isObjectInstance(this.entityObject)
            || !this._isFirstLevelObjectOfSceneOrSpacePartition()){
                return;
            }

            if (this.entityObject.hasComponent(Geometry)) {
                material = this.entityObject.getComponent<Geometry>(Geometry).material;
            }

            if (this.receive) {
                this._handleReceive(material);
            }
        }

        private _addAllShadowMaps(twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>>, cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>>, material:Material){
            var mapManager:MapManager = material.mapManager;

            twoDShadowMapDataMap.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>) => {
                twoDShadowMapDataList.forEach(({shadowMap}) => {
                    if (!mapManager.hasTwoDShadowMap(shadowMap)) {
                        mapManager.addTwoDShadowMap(shadowMap);
                    }
                });
            });

            cubemapShadowMapDataMap.forEach((cubemapShadowMapDataList:wdCb.Collection<CubemapShadowMapData>) => {
                cubemapShadowMapDataList.forEach(({shadowMap}) => {
                    if (!mapManager.hasCubemapShadowMap(shadowMap)) {
                        mapManager.addCubemapShadowMap(shadowMap);
                    }
                });
            });
        }

        private _isFirstLevelObjectOfSceneOrSpacePartition(){
            var parent:GameObject = this.entityObject.parent;

            return JudgeUtils.isEqual(parent, Director.getInstance().scene) || JudgeUtils.isSpacePartitionObject(parent);
        }

        private _handleReceive(material:Material){
            var self = this,
                twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).twoDShadowMapDataMap,
                cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).cubemapShadowMapDataMap;
            var setChildren = (child:GameObject) => {
                if (!child.hasComponent(Geometry)) {
                    return;
                }

                let material:Material = child.getComponent<Geometry>(Geometry).material;

                self._addAllShadowMaps(twoDShadowMapDataMap, cubemapShadowMapDataMap, material);

                child.forEach((c:GameObject) => {
                    setChildren(c);
                });
            };

            if (material) {
                this._addAllShadowMaps(twoDShadowMapDataMap, cubemapShadowMapDataMap, material);
            }

            this.entityObject.forEach((child:GameObject) => {
                setChildren(child);
            });
        }
    }
}
