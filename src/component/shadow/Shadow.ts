module wd{
    export class Shadow extends Component {
        public static create() {
            var obj = new this();

            return obj;
        }


        public entityObject:GameObject;

        private _receive:boolean = true;
        @cloneAttributeAsBasicType()
        get receive() {
            return this._receive;
        }

        set receive(receive:boolean) {
            if(this._isInit && this._receive !== receive){
                if(InstanceUtils.isObjectInstance(this.entityObject)){
                    this._receive = receive;

                    return;
                }

                if(receive){
                    this._addShadowMapsToObjectAndChildren();

                    this._switchToShadowMapShaderLib(this.entityObject);
                }
                else{
                    this._removeShadowMapsOfObjectAndChildren();

                    this._switchToNoShadowMapShaderLib(this.entityObject);
                }
            }

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
        private _isInit:boolean = false;

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

            this._isInit = true;

            if(InstanceUtils.isObjectInstance(this.entityObject)
                || !this._isFirstLevelObjectOfSceneOrSpacePartition()){
                return;
            }


            this._shadowMapLayerChangeSubscription = EventManager.fromEvent(<any>EEngineEvent.SHADOWMAP_LAYER_CHANGE)
                .subscribe(() => {
                    if (self.receive) {
                        self._addShadowMapsToObjectAndChildren();
                    }
                });

            if(this.cast && this.receive){
                this._addBuildShadowMapShaderAndShadowMapsToObjectAndChildren();
            }
            else if (this.cast) {
                this._addBuildShadowMapShaderToObjectAndChildren();

                return;
            }
            else if (this.receive) {
                this._addShadowMapsToObjectAndChildren();
            }
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

        private _addBuildShadowMapShaderAndShadowMapsToObjectAndChildren(){
            var self = this,
                twoDShadowMapDataMap:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).twoDShadowMapDataMap,
                cubemapShadowMapDataMap:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).cubemapShadowMapDataMap;
            var handle = (gameObject:GameObject) => {
                if (gameObject.hasComponent(Geometry)) {
                    let geometry:Geometry = gameObject.getComponent<Geometry>(Geometry),
                        material:Material = geometry.material,
                        mapManager:MapManager = material.mapManager;

                    self._addBuildTwoDShadowMapShader(material, this._createBuildTwoDShadowMapShader(gameObject, geometry));
                    self._addBuildCubemapShadowMapShader(material, this._createBuildCubemapShadowMapShader(gameObject, geometry));

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

        private _addBuildShadowMapShaderToObjectAndChildren(){
            var self = this;
            var handle = (gameObject:GameObject) => {
                if (gameObject.hasComponent(Geometry)) {
                    let geometry:Geometry = gameObject.getComponent<Geometry>(Geometry),
                        material:Material = geometry.material;

                    self._addBuildTwoDShadowMapShader(material, this._createBuildTwoDShadowMapShader(gameObject, geometry));
                    self._addBuildCubemapShadowMapShader(material, this._createBuildCubemapShadowMapShader(gameObject, geometry));
                }

                gameObject.forEach((child:GameObject) => {
                    handle(child);
                });
            };

            handle(this.entityObject);
        }

        @require(function (material:Material, shader:CommonShader) {
            assert(!material.hasShader(<any>EShaderTypeOfScene.BUILD_TWOD_SHADOWMAP), Log.info.FUNC_SHOULD_NOT("material", "exist build twoD shadow map shader"));
        })
        private _addBuildTwoDShadowMapShader(material:Material, shader:CommonShader) {
            material.addShader(<any>EShaderTypeOfScene.BUILD_TWOD_SHADOWMAP, shader);
        }

        @require(function (material:Material, shader:CommonShader) {
            assert(!material.hasShader(<any>EShaderTypeOfScene.BUILD_CUBEMAP_SHADOWMAP), Log.info.FUNC_SHOULD_NOT("material", "exist build cubemap shadow map shader"));
        })
        private _addBuildCubemapShadowMapShader(material:Material, shader:CommonShader) {
            material.addShader(<any>EShaderTypeOfScene.BUILD_CUBEMAP_SHADOWMAP, shader);
        }

        private _createBuildTwoDShadowMapShader(gameObject:GameObject, geometry:Geometry) {
            var shader:CommonShader = this._createBuildShadowMapShader(gameObject, geometry);

            shader.addLib(BuildTwoDShadowMapShaderLib.create());

            return shader;
        }

        private _createBuildCubemapShadowMapShader(gameObject:GameObject, geometry:Geometry) {
            var shader:CommonShader = this._createBuildShadowMapShader(gameObject, geometry);

            shader.addLib(BuildCubemapShadowMapShaderLib.create());

            return shader;
        }

        private _createBuildShadowMapShader(gameObject:GameObject, geometry:Geometry) {
            var shader:CommonShader = CommonShader.create();

            shader.addLib(CommonShaderLib.create());

            if(GlobalGeometryUtils.hasAnimation(geometry)){
                shader.addLib(CommonMorphShaderLib.create());
                shader.addLib(VerticeMorphShaderLib.create());
            }
            else{
                shader.addLib(VerticeCommonShaderLib.create());
            }

            if (InstanceUtils.isHardwareSupport() && InstanceUtils.isInstance(gameObject)) {
                shader.addLib(ModelMatrixInstanceShaderLib.create());
            }
            else {
                shader.addLib(ModelMatrixNoInstanceShaderLib.create());
            }

            return shader;
        }

        private _addShadowMapsToObjectAndChildren(){
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

        private _removeShadowMapsOfObjectAndChildren(){
            var handle = (gameObject:GameObject) => {
                if (gameObject.hasComponent(Geometry)) {
                    let material:Material = gameObject.getComponent<Geometry>(Geometry).material,
                        mapManager:MapManager = material.mapManager;

                    material.shader.libDirty = true;

                    mapManager.removeAllShdaowMaps();
                }

                gameObject.forEach((child:GameObject) => {
                    handle(child);
                });
            };

            handle(this.entityObject);
        }

        @ensure(function(returnVal, gameObject:GameObject){
            var material:Material = gameObject.getComponent<Geometry>(Geometry).material,
                shader:Shader = material.shader;

            assert(!shader.hasLib(NoShadowMapShaderLib), Log.info.FUNC_SHOULD_NOT("contain NoShadowMapShaderLib"));
            assert(shader.getLibs().filter((lib:ShaderLib) => {
                    return lib instanceof TwoDShadowMapShaderLib;
                }).getCount() <= 1, Log.info.FUNC_SHOULD_NOT("has duplicate TwoDShadowMapShaderLib"));
            assert(shader.getLibs().filter((lib:ShaderLib) => {
                    return lib instanceof CubemapShadowMapShaderLib;
                }).getCount() <= 1, Log.info.FUNC_SHOULD_NOT("has duplicate CubemapShadowMapShaderLib"));
        })
        private _switchToShadowMapShaderLib(gameObject:GameObject){
            var material:Material = gameObject.getComponent<Geometry>(Geometry).material,
                shader:Shader = material.shader,
                mapManager:MapManager = material.mapManager;

            shader.removeLib((lib:ShaderLib) => {
                return lib instanceof NoShadowMapShaderLib;
            });

            if(this._isTwoDShadowMap(mapManager)){
                shader.addLib(TwoDShadowMapShaderLib.create());
            }
            if(this._isCubemapShadowMap(mapManager)){
                shader.addLib(CubemapShadowMapShaderLib.create());
            }

            shader.addLib(TotalShadowMapShaderLib.create());
        }

        @ensure(function(returnVal, gameObject:GameObject){
            var material:Material = gameObject.getComponent<Geometry>(Geometry).material,
                shader:Shader = material.shader;

            assert(!shader.hasLib(TwoDShadowMapShaderLib), Log.info.FUNC_SHOULD_NOT("contain TwoDShadowMapShaderLib"));
            assert(!shader.hasLib(CubemapShadowMapShaderLib), Log.info.FUNC_SHOULD_NOT("contain CubemapShadowMapShaderLib"));

            assert(shader.getLibs().filter((lib:ShaderLib) => {
                    return lib instanceof NoShadowMapShaderLib;
                }).getCount() <= 1, Log.info.FUNC_SHOULD_NOT("has duplicate NoShadowMapShaderLib"));
        })
        private _switchToNoShadowMapShaderLib(gameObject:GameObject){
            var material:Material = gameObject.getComponent<Geometry>(Geometry).material,
                shader:Shader = material.shader;

            shader.removeLib((lib:ShaderLib) => {
                return lib instanceof TwoDShadowMapShaderLib || lib instanceof CubemapShadowMapShaderLib || lib instanceof TotalShadowMapShaderLib
            });

            shader.addLib(NoShadowMapShaderLib.create());
        }

        private _isTwoDShadowMap(mapManager:MapManager){
            return mapManager.getTwoDShadowMapList().getCount() > 0;
        }

        private _isCubemapShadowMap(mapManager:MapManager){
            return mapManager.getCubemapShadowMapList().getCount() > 0;
        }
    }
}
