module wd{
    export class ShadowManager extends SceneComponent{
        public static create() {
            var obj = new this();

            return obj;
        }

        get twoDShadowMapDataMap(){
            return this._shadowMapManager.twoDShadowMapDataMap;
        }

        public entityObject:GameObjectScene;

        private _shadowRenderList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        private _endLoopSubscription:wdFrp.IDisposable = null;
        private _shadowMapManager:ShadowMapManager = ShadowMapManager.create(this);

        public dispose(){
            this._endLoopSubscription && this._endLoopSubscription.dispose();
        }

        @require(function(){
            this.entityObject.getChildren()
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


            this.entityObject.getChildren()
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
        })
        //todo optimize:cache?
        public setShadowRenderListInEachLoop(){
            var list = this._shadowRenderList,
                self = this;

            list.removeAllChildren();

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
        }

        //todo optimize: cache?
        public getShadowRenderListByLayer(layer:string){
            return this._shadowRenderList.filter((gameObject:GameObject) => {
                return gameObject.getComponent<Shadow>(Shadow).layer === layer;
            });
        }

        //todo optimize?
        public getShadowLayerList(){
            var list = wdCb.Collection.create<string>(),
                self = this;

            RenderUtils.getGameObjectRenderList(this.entityObject.getChildren())
                .forEach((child:GameObject) => {
                    if(JudgeUtils.isSpacePartitionObject(child)){
                        list.addChildren(
                            child.forEach((c:GameObject) => {
                                if(self._isCastShadow(c)){
                                    list.addChild(c.getComponent<Shadow>(Shadow).layer);
                                }
                            })
                        );

                        return;
                    }

                    if(self._isCastShadow(child)){
                        list.addChild(child.getComponent<Shadow>(Shadow).layer);
                    }
                });

            return list.removeRepeatItems();
        }

        public init(){
            var scene:GameObjectScene = this.entityObject;

            this._shadowMapManager.initShadowMapData();

            this._shadowMapManager.twoDShadowMapDataMap.forEach((twoDShadowMapDataList:wdCb.Collection<TwoDShadowMapData>, layer:string) => {
                twoDShadowMapDataList.forEach(({shadowMap, light}) => {
                    var renderer:TwoDShadowMapRenderTargetRenderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light);

                    renderer.layer = layer;

                    scene.addRenderTargetRenderer(renderer);
                });
            });

            this._initShadowList()
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
        }
    }
}
