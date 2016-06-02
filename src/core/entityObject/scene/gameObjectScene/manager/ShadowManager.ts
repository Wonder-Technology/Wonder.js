module wd{
    export class ShadowManager{
        public static create(gameObjectScene:GameObjectScene) {
            var obj = new this(gameObjectScene);

            return obj;
        }

        constructor(gameObjectScene:GameObjectScene){
            this.gameObjectScene = gameObjectScene;
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


        public gameObjectScene:GameObjectScene = null;

        private _shadowRenderList:wdCb.Collection<GameObject> = null;
        private _endLoopSubscription:wdFrp.IDisposable = null;
        private _shadowMapManager:ShadowMapManager = ShadowMapManager.create(this);
        private _shadowMapLayerChangeSubscription:wdFrp.IDisposable = null;

        public update(elapsedTime:number){
            if(!this._isShadowMapEnable()){
                return;
            }

            this.gameObjectScene.shadowLayerList.update();
        }

        public dispose(){
            this._endLoopSubscription && this._endLoopSubscription.dispose();
            this._shadowMapLayerChangeSubscription && this._shadowMapLayerChangeSubscription.dispose();

            this._shadowMapManager.dispose();
        }

        public getTwoDShadowMapDataMap(layer:string) {
            return this._shadowMapManager.twoDShadowMapDataMap.getChild(layer);
        }

        public getCubemapShadowMapDataMap(layer:string){
            return this._shadowMapManager.cubemapShadowMapDataMap.getChild(layer);
        }

        public setShadowRenderListForCurrentLoop(){
            if(!this._isShadowMapEnable()){
                return;
            }

            this._shadowRenderList = this._getShadowRenderList();
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

            if(this.gameObjectScene.shadowLayerList.dirty){
                return <any>this.gameObjectScene.shadowLayerList.removeRepeatItems();
            }

            shadowLayerList = ShadowLayerList.create();

            RenderUtils.getGameObjectRenderList(this.gameObjectScene.getChildren())
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
                scene:GameObjectScene = this.gameObjectScene;

            if(!this._isShadowMapEnable() || !this._hasShadow()) {
                return;
            }

            this.gameObjectScene.shadowLayerList = this.getShadowLayerList();

            this.gameObjectScene.shadowLayerList.init();

            this._shadowMapManager.initShadowMapData(this.gameObjectScene.shadowLayerList);

            this._shadowMapManager.twoDShadowMapDataMap.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>, layer:string) => {
                twoDShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:TwoDShadowMapRenderTargetRenderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderer);
                });
            });

            this._shadowMapManager.cubemapShadowMapDataMap.forEach((cubemapShadowMapDataList:wdCb.Collection<CubemapShadowMapData>, layer:string) => {
                cubemapShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:CubemapShadowMapRenderTargetRenderer = CubemapShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderer);
                });
            });

            //this._addShadowShader();

            this._initShadowList();

            this._shadowMapLayerChangeSubscription = EventManager.fromEvent(<any>EEngineEvent.SHADOWMAP_LAYER_CHANGE)
            .subscribe(() => {
                self._updateWhenShadowLayerChange();
            });
        }

        @require(function(){
            var self = this;
            var checkFirstLevelOfGameObjectScene = () => {
                    self.gameObjectScene.getChildren()
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
                    self.gameObjectScene.getChildren()
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
        private _getShadowRenderList(){
            var list = wdCb.Collection.create<GameObject>(),
                self = this;

            RenderUtils.getGameObjectRenderList(this.gameObjectScene.getChildren())
                .forEach((child:GameObject) => {
                    if(JudgeUtils.isSpacePartitionObject(child)){
                        list.addChildren(
                            child.getSpacePartition().getRenderList().filter((c:GameObject) => {
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

        @require(function(){
            var shadowLayerList = this.gameObjectScene.shadowLayerList;

            assert(shadowLayerList.dirty, Log.info.FUNC_SHOULD("shadowLayerList", "dirty"));

            this._getShadowRenderList()
                .forEach((gameObject:GameObject) => {
                    assert(shadowLayerList.hasChild(gameObject.getComponent<Shadow>(Shadow).layer), Log.info.FUNC_SHOULD("the shadow layer of shadow gameObject", "exist in scene->shadowLayerList"));
                });
        })
        private _updateWhenShadowLayerChange(){
            var scene:GameObjectScene = this.gameObjectScene;

            if(!this._hasShadow()) {
                return;
            }

            this._shadowMapManager.updateWhenShadowLayerChange(scene.shadowLayerList.getDiffData());

            let {
                addTwoDShadowMapData,
                removeTwoDShadowMapData,
                addCubemapShadowMapData,
                removeCubemapShadowMapData
                } = this._shadowMapManager.getAllDiffShadowMapDataWhenShadowLayerChange();

            this._refreshRenderTargerRendererList(addTwoDShadowMapData, removeTwoDShadowMapData, addCubemapShadowMapData, removeCubemapShadowMapData);
        }

        @ensure(function(){
            assert(!this.gameObjectScene.renderTargetRendererManager.getCommonRenderTargetRendererList().hasRepeatItems(), Log.info.FUNC_SHOULD_NOT("scene->commonRenderTargetRendererList", "has repeat items"));
        })
        private _refreshRenderTargerRendererList(addTwoDShadowMapData:wdCb.Hash<wdCb.Collection<TwoDShadowMapData>>, removeTwoDShadowMapData:wdCb.Collection<TwoDShadowMapData>, addCubemapShadowMapData:wdCb.Hash<wdCb.Collection<CubemapShadowMapData>>, removeCubemapShadowMapData:wdCb.Collection<CubemapShadowMapData>){
            var scene:GameObjectScene = this.gameObjectScene;

            scene.renderTargetRendererManager.removeCommonRenderTargetRenderer((renderTargetRenderer:CommonRenderTargetRenderer) => {
                var texture = renderTargetRenderer.texture;

                return removeTwoDShadowMapData.hasChildWithFunc((data: TwoDShadowMapData) => {
                    return JudgeUtils.isEqual(data.shadowMap, texture);
                })
                ||  removeCubemapShadowMapData.hasChildWithFunc((data: TwoDShadowMapData) => {
                    return JudgeUtils.isEqual(data.shadowMap, texture);
                });
            })
            .forEach((renderTargetRenderer:CommonRenderTargetRenderer) => {
                renderTargetRenderer.dispose();
            });

            addTwoDShadowMapData.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>, layer:string) => {
                twoDShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:TwoDShadowMapRenderTargetRenderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    renderer.init();

                    scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderer);
                });
            });

            addCubemapShadowMapData.forEach((cubemapShadowMapDataList:wdCb.Collection<CubemapShadowMapData>, layer:string) => {
                cubemapShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:CubemapShadowMapRenderTargetRenderer = CubemapShadowMapRenderTargetRenderer.create(shadowMap, light, layer);

                    renderer.init();

                    scene.renderTargetRendererManager.addCommonRenderTargetRenderer(renderer);
                });
            });
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
            var scene = this.gameObjectScene;

            return !!scene.directionLights || !!scene.pointLights;
        }

        private _isShadowMapEnable(){
            return this.gameObjectScene.shadowMap.enable;
        }
    }
}

