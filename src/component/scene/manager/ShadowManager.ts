module wd{
    export class ShadowManager extends SceneComponent{
        public static create() {
            var obj = new this();

            return obj;
        }

        get twoDShadowMapDataMap(){
            return this._shadowMapManager.twoDShadowMapDataMap;
        }

        get twoDShadowMapCountForGLSL(){
            return this._shadowMapManager.twoDShadowMapCountForGLSL;
        }

        get cubemapShadowMapDataMap(){
            return this._shadowMapManager.cubemapShadowMapDataMap;
        }

        get cubemapShadowMapCountForGLSL(){
            return this._shadowMapManager.cubemapShadowMapCountForGLSL;
        }

        public entityObject:GameObjectScene;

        private _shadowRenderList:wdCb.Collection<GameObject> = null;
        private _endLoopSubscription:wdFrp.IDisposable = null;
        private _shadowMapManager:ShadowMapManager = ShadowMapManager.create(this);
        private _shadowMapLayerChangeSubscription:wdFrp.IDisposable = null;

        public update(elapsedTime:number){
            this.entityObject.shadowLayerList.update();
            //if(this.entityObject.shadowLayerList.dirty){
            //    this._updateWhenShadowLayerChange();
            //
            //    this.entityObject.shadowLayerList.dirty = false;
            //}
        }

        public dispose(){
            this._endLoopSubscription && this._endLoopSubscription.dispose();
            //todo test
            this._shadowMapLayerChangeSubscription && this._shadowMapLayerChangeSubscription.dispose();
        }

        @require(function(){
            var self = this;
            var checkFirstLevelOfGameObjectScene = () => {
                    self.entityObject.getChildren()
                        .filter((firstLevelChild:GameObject) => {
                            return !JudgeUtils.isSpacePartitionObject(firstLevelChild);
                        })
                        .forEach((firstLevelChild:GameObject) => {
                            let checkChild = (child:GameObject) => {
                                assert(!child.hasComponent(Shadow), Log.info.FUNC_CAN_NOT("if the first level object of gameObjectScene don't contain Shadow component, its children", "contain Shadow component"));

                                child.forEach((c:GameObject) => {
                                    checkChild(c);
                                });
                            };

                            if(!firstLevelChild.hasComponent(Shadow)){
                                firstLevelChild.forEach((child:GameObject) => {
                                    checkChild(child);
                                });
                            }
                        });
                },
                checkFirstLevelOfSpacePartitionObject = () => {
                    self.entityObject.getChildren()
                        .filter((firstLevelChild:GameObject) => {
                            return JudgeUtils.isSpacePartitionObject(firstLevelChild);
                        })
                        .forEach((spacePartitionObject:GameObject) => {
                            spacePartitionObject.forEach((firstLevelChildOfSpacePartitionObject:GameObject) => {
                                let checkChild = (child:GameObject) => {
                                    assert(!child.hasComponent(Shadow), Log.info.FUNC_CAN_NOT("if the first level object of space partition objject don't contain Shadow component, its children", "contain Shadow component"));

                                    child.forEach((c:GameObject) => {
                                        checkChild(c);
                                    });
                                };

                                if(!firstLevelChildOfSpacePartitionObject.hasComponent(Shadow)){
                                    firstLevelChildOfSpacePartitionObject.forEach((child:GameObject) => {
                                        checkChild(child);
                                    });
                                }
                            });
                        });
                };

            checkFirstLevelOfGameObjectScene();
            checkFirstLevelOfSpacePartitionObject();
        })
        public getShadowRenderList(){
            var list = wdCb.Collection.create<GameObject>(),
                self = this;

            RenderUtils.getGameObjectRenderList(this.entityObject.getChildren())
                .forEach((child:GameObject) => {
                    if(JudgeUtils.isSpacePartitionObject(child)){
                        //todo optimize:cache gameObjectRenderListFromSpacePartition or renderListByFrustumCull?
                        list.addChildren(
                            RenderUtils.getGameObjectRenderListFromSpacePartition(child.getSpacePartition().getRenderListByFrustumCull())
                                .filter((c:GameObject) => {
                                    return self._isCastShadow(c);
                                })
                        );

                        return;
                    }

                    if(self._isCastShadow(child)){
                        list.addChild(child);
                    }
                });

            return list;
        }

        public setShadowRenderListInEachLoop(){
            this._shadowRenderList = this.getShadowRenderList();
        }

        //todo optimize: cache?
        public getShadowRenderListByLayer(layer:string){
            return this._shadowRenderList.filter((gameObject:GameObject) => {
                return gameObject.getComponent<Shadow>(Shadow).layer === layer;
            });
        }

        //todo optimize?
        public getShadowLayerList():ShadowLayerList{
            var shadowLayerList:ShadowLayerList = null,
                self = this;

            if(this.entityObject.shadowLayerList.dirty){
                return <any>this.entityObject.shadowLayerList.removeRepeatItems();
            }

            shadowLayerList = ShadowLayerList.create();

            RenderUtils.getGameObjectRenderList(this.entityObject.getChildren())
                .forEach((child:GameObject) => {
                    if(JudgeUtils.isSpacePartitionObject(child)){
                        child.forEach((c:GameObject) => {
                            if(self._isCastShadow(c)){
                                shadowLayerList.addChild(c.getComponent<Shadow>(Shadow).layer);
                            }
                        });

                        return;
                    }

                    if(self._isCastShadow(child)){
                        shadowLayerList.addChild(child.getComponent<Shadow>(Shadow).layer);
                    }
                });

            shadowLayerList.dirty = false;

            return <any>shadowLayerList.removeRepeatItems();
        }

        public init(){
            var self = this,
                scene:GameObjectScene = this.entityObject;

            if(!this._hasShadow()) {
                return;
            }

            this.entityObject.shadowLayerList = this.getShadowLayerList();
            this._shadowMapManager.initShadowMapData(this.entityObject.shadowLayerList);

            this._shadowMapManager.twoDShadowMapDataMap.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>, layer:string) => {
                twoDShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:TwoDShadowMapRenderTargetRenderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    scene.addRenderTargetRenderer(renderer);
                });
            });

            this._shadowMapManager.cubemapShadowMapDataMap.forEach((cubemapShadowMapDataList:wdCb.Collection<CubemapShadowMapData>, layer:string) => {
                cubemapShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:CubemapShadowMapRenderTargetRenderer = CubemapShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    scene.addRenderTargetRenderer(renderer);
                });
            });

            this._addShadowShader();

            this._initShadowList();

            this._shadowMapLayerChangeSubscription = EventManager.fromEvent(<any>EEngineEvent.SHADOWMAP_LAYER_CHANGE)
            .subscribe(() => {
                self._updateWhenShadowLayerChange();
            });
        }

        @require(function(){
            var shadowLayerList = this.entityObject.shadowLayerList;

            assert(shadowLayerList.dirty, Log.info.FUNC_SHOULD("shadowLayerList", "dirty"));

            this.getShadowRenderList()
                .forEach((gameObject:GameObject) => {
                    assert(shadowLayerList.hasChild(gameObject.getComponent<Shadow>(Shadow).layer), Log.info.FUNC_SHOULD("the shadow layer of shadow gameObject", "exist in scene->shadowLayerList"));
                });
        })
        private _updateWhenShadowLayerChange(){
            var scene:GameObjectScene = this.entityObject;

            if(!this._hasShadow()) {
                return;
            }

            let {
                addTwoDShadowMapData,
                removeTwoDShadowMapData,
                addCubemapShadowMapData,
                removeCubemapShadowMapData
                } = this._shadowMapManager.updateWhenShadowLayerChange(scene.shadowLayerList.getDiffData());


            //todo only handle shadow renderer
            let renderTargetRendererList = scene.getRenderTargetRendererList(),
                newRenderTargetRendererList = wdCb.Collection.create<RenderTargetRenderer>();

            renderTargetRendererList.forEach((renderTargetRenderer:RenderTargetRenderer) => {
                var texture = renderTargetRenderer.texture;

                if(
                    removeTwoDShadowMapData.hasChildWithFunc((data: TwoDShadowMapData) => {
                        return JudgeUtils.isEqual(data.shadowMap, texture);
                    })
                    ||  removeCubemapShadowMapData.hasChildWithFunc((data: TwoDShadowMapData) => {
                        return JudgeUtils.isEqual(data.shadowMap, texture);
                    })
                ){
                    renderTargetRenderer.dispose();

                    return;
                }

                newRenderTargetRendererList.addChild(renderTargetRenderer);
            });

            addTwoDShadowMapData.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>, layer:string) => {
                twoDShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:TwoDShadowMapRenderTargetRenderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    renderer.init();

                    newRenderTargetRendererList.addChild(renderer);
                });
            });

            addCubemapShadowMapData.forEach((cubemapShadowMapDataList:wdCb.Collection<CubemapShadowMapData>, layer:string) => {
                cubemapShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:CubemapShadowMapRenderTargetRenderer = CubemapShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    renderer.init();

                    newRenderTargetRendererList.addChild(renderer);
                });
            });

            scene.removeAllRenderTargetRenderer();

            newRenderTargetRendererList.forEach((renderTargetRenderer:RenderTargetRenderer) => {
                scene.addRenderTargetRenderer(renderTargetRenderer);
            });
        }

        private _addShadowShader(){
            var scene = Director.getInstance().scene;

            if(this._shadowMapManager.twoDShadowMapDataMap.getCount() > 0){
                scene.addShader(EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_INSTANCE, this._createBuildTwoDShadowMapInstanceShader());
                scene.addShader(EShaderMapKeyOfScene.BUILD_TWOD_SHADOWMAP_NO_INSTANCE, this._createBuildTwoDShadowMapNoInstanceShader());
            }
            if(this._shadowMapManager.cubemapShadowMapDataMap.getCount() > 0){
                scene.addShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_INSTANCE, this._createBuildCubemapShadowMapInstanceShader());
                scene.addShader(EShaderMapKeyOfScene.BUILD_CUBEMAP_SHADOWMAP_NO_INSTANCE, this._createBuildCubemapShadowMapNoInstanceShader());
            }
        }

        private _createBuildTwoDShadowMapInstanceShader() {
            var shader:CommonShader = CommonShader.create();

            shader.addLib(CommonShaderLib.create());
            shader.addLib(VerticeCommonShaderLib.create());

            shader.addLib(ModelMatrixInstanceShaderLib.create());

            shader.addLib(BuildTwoDShadowMapShaderLib.create());

            return shader;
        }

        private _createBuildCubemapShadowMapInstanceShader() {
            var shader:CommonShader = CommonShader.create();

            shader.addLib(CommonShaderLib.create());
            shader.addLib(VerticeCommonShaderLib.create());

            shader.addLib(ModelMatrixInstanceShaderLib.create());

            shader.addLib(BuildCubemapShadowMapShaderLib.create());

            return shader;
        }

        private _createBuildTwoDShadowMapNoInstanceShader() {
            var shader:CommonShader = CommonShader.create();

            shader.addLib(CommonShaderLib.create());
            shader.addLib(VerticeCommonShaderLib.create());

            shader.addLib(ModelMatrixNoInstanceShaderLib.create());

            shader.addLib(BuildTwoDShadowMapShaderLib.create());

            return shader;
        }

        private _createBuildCubemapShadowMapNoInstanceShader() {
            var shader:CommonShader = CommonShader.create();

            shader.addLib(CommonShaderLib.create());
            shader.addLib(VerticeCommonShaderLib.create());

            shader.addLib(ModelMatrixNoInstanceShaderLib.create());

            shader.addLib(BuildCubemapShadowMapShaderLib.create());

            return shader;
        }

        private _initShadowList(){
            var self = this;

            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
                .subscribe(() => {
                    self._removeShadowMapGLSLData();
                });
        }

        private _isCastShadow(gameObject:GameObject){
            var shadow = gameObject.getComponent<Shadow>(Shadow);

            return !!shadow && shadow.cast;
        }

        private _removeShadowMapGLSLData(){
            Director.getInstance().scene.glslData.removeChild(<any>EShaderGLSLData.TWOD_SHADOWMAP);
            Director.getInstance().scene.glslData.removeChild(<any>EShaderGLSLData.CUBEMAP_SHADOWMAP);
            Director.getInstance().scene.glslData.removeChild(<any>EShaderGLSLData.BUILD_CUBEMAP_SHADOWMAP);
        }

        private _hasShadow(){
            var scene = this.entityObject;

            return !!scene.directionLights || !!scene.pointLights;
        }
    }
}

