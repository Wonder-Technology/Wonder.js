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

            if(this.cast && this.receive){
                this._handleCastAndReceive(material);

                return;
            }

            if (this.cast) {
                this._handleCast(material);

                return;
            }

            if (this.receive) {
                this._handleReceive(material);

                return;
            }
        }

        private _addAllShadowMaps(twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>>, drawShadowMapShader:Shader){
            twoDShadowMapDataMap.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>) => {
                twoDShadowMapDataList.forEach(({shadowMap}) => {
                    if (!drawShadowMapShader.mapManager.hasTwoDShadowMap(shadowMap)) {
                        drawShadowMapShader.mapManager.addTwoDShadowMap(shadowMap);
                    }
                });
            });
        }

        private _createBuildShadowMapShader(object:GameObject) {
            var shader:CommonShader = CommonShader.create(null);

            shader.addLib(CommonShaderLib.create());
            shader.addLib(VerticeCommonShaderLib.create());

            if (InstanceUtils.isHardwareSupport() && InstanceUtils.isInstance(object)) {
                shader.addLib(ModelMatrixInstanceShaderLib.create());
            }
            else {
                shader.addLib(ModelMatrixNoInstanceShaderLib.create());
            }

            shader.addLib(BuildTwoDShadowMapShaderLib.create());

            return shader;
        }

        @require(function (material:Material, shader:CommonShader) {
            assert(!material.hasShader(<any>EShaderMapKey.BUILD_SHADOWMAP), Log.info.FUNC_SHOULD_NOT("material", "exist build shadow map shader"));
        })
        private _addBuildShadowMapShader(material:Material, shader:CommonShader) {
            material.addShader(<any>EShaderMapKey.BUILD_SHADOWMAP, shader);
        }

        private _isFirstLevelObjectOfSceneOrSpacePartition(){
            var parent:GameObject = this.entityObject.parent;

            return JudgeUtils.isEqual(parent, Director.getInstance().scene) || JudgeUtils.isSpacePartitionObject(parent);
        }

        private _handleCastAndReceive(material:Material){
            var self = this,
                buildShadowMapShader:CommonShader = this._createBuildShadowMapShader(this.entityObject),
                twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).twoDShadowMapDataMap;
            var setChildren = (child:GameObject) => {
                if (!child.hasComponent(Geometry)) {
                    return;
                }

                let material:Material = child.getComponent<Geometry>(Geometry).material;

                self._addBuildShadowMapShader(material, buildShadowMapShader);

                self._addAllShadowMaps(twoDShadowMapDataMap, material.getShader(<any>EShaderMapKey.DEFAULT));

                child.forEach((c:GameObject) => {
                    setChildren(c);
                })
            };

            if (material) {
                this._addBuildShadowMapShader(material, buildShadowMapShader);

                this._addAllShadowMaps(twoDShadowMapDataMap, material.getShader(<any>EShaderMapKey.DEFAULT));
            }

            this.entityObject.forEach((child:GameObject) => {
                setChildren(child);
            });
        }

        private _handleCast(material:Material){
            var self = this,
                shader = this._createBuildShadowMapShader(this.entityObject);
            var setChildren = (child:GameObject) => {
                if (!child.hasComponent(Geometry)) {
                    return;
                }

                let material:Material = child.getComponent<Geometry>(Geometry).material;

                self._addBuildShadowMapShader(material, shader);

                child.forEach((c:GameObject) => {
                    setChildren(c);
                })
            };

            if (material) {
                this._addBuildShadowMapShader(material, shader);
            }

            this.entityObject.forEach((child:GameObject) => {
                setChildren(child);
            });
        }

        private _handleReceive(material:Material){
            var self = this,
                twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).twoDShadowMapDataMap;
            var setChildren = (child:GameObject) => {
                if (!child.hasComponent(Geometry)) {
                    return;
                }

                let material:Material = child.getComponent<Geometry>(Geometry).material;

                self._addAllShadowMaps(twoDShadowMapDataMap, material.getShader(<any>EShaderMapKey.DEFAULT));

                child.forEach((c:GameObject) => {
                    setChildren(c);
                });
            };

            if (material) {
                this._addAllShadowMaps(twoDShadowMapDataMap, material.getShader(<any>EShaderMapKey.DEFAULT));
            }

            this.entityObject.forEach((child:GameObject) => {
                setChildren(child);
            });
        }
    }
}
