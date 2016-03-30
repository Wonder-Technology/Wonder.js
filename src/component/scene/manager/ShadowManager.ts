module wd{
    export class ShadowManager extends SceneComponent{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public entityObject:GameObjectScene;

        private _beforeInitSubscription:wdFrp.IDisposable = null;
        private _endLoopSubscription:wdFrp.IDisposable = null;

        public dispose(){
            this._beforeInitSubscription && this._beforeInitSubscription.dispose();
            this._endLoopSubscription && this._endLoopSubscription.dispose();
        }

        public initWhenCreate(){
            var self = this;

            this._beforeInitSubscription = EventManager.fromEvent(<any>EEngineEvent.BEFORE_GAMEOBJECT_INIT)
                .subscribe(() => {
                    self._beforeInitHandler();
                });
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
        public getShadowRenderListForBuildShadowMap(){
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

        private _beforeInitHandler(){
            if(!this._hasShadow()) {
                return;
            }

            if(this.entityObject.directionLights){
                this.entityObject.directionLights.forEach((lightObject:GameObject) => {
                    var light:DirectionLight = lightObject.getComponent<DirectionLight>(DirectionLight);

                    if(light.castShadow){
                        let shadowMap = TwoDShadowMapTexture.create(),
                            renderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light);

                        this.twoDShadowMapList.addChild(shadowMap);

                        this.entityObject.addRenderTargetRenderer(renderer);
                    }
                }, this);
            }

            this._initShadowList()
        }

        public twoDShadowMapList = wdCb.Collection.create<TwoDShadowMapTexture>();

        private _initShadowList(){
            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
                .subscribe(() => {
                    Director.getInstance().scene.glslData.removeChild(<any>EShaderGLSLData.TWOD_SHADOWMAP);
                });
        }

        private _hasShadow(){
            return this.entityObject.directionLights || this.entityObject.pointLights;
        }

        private _isCastShadow(gameObject:GameObject){
            var shadow = gameObject.getComponent<Shadow>(Shadow);

            return !!shadow && shadow.cast;
        }
    }
}
