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
            this._beforeInitSubscription.dispose();
            this._endLoopSubscription.dispose();
        }

        public initWhenCreate(){
            var self = this;

            this._beforeInitSubscription = EventManager.fromEvent(<any>EEngineEvent.BEFORE_GAMEOBJECT_INIT)
                .subscribe(() => {
                    self._beforeInitHandler();
                });
        }

        @require(function(){
            this.entityObject.getChildren().forEach((firstLevelChild:GameObject) => {
                if(!firstLevelChild.hasComponent(Shadow)){
                    let checkChild = (child:GameObject) => {
                        assert(!child.hasComponent(Shadow), Log.info.FUNC_CAN_NOT("if the first level object of gameObjectScene don't contain Shadow component, its children", "contain Shadow component"));

                        child.forEach((c:GameObject) => {
                            checkChild(c);
                        });
                    };

                    firstLevelChild.forEach((child:GameObject) => {
                        checkChild(child);
                    });
                }
            });
        })
        //todo optimize:cache?
        public getShadowRenderListForBuildShadowMap(){
            return RenderUtils.getGameObjectRenderList(this.entityObject.getChildren())
                .filter((child:GameObject) => {
                    var shadow = child.getComponent<Shadow>(Shadow);

                    return !!shadow && shadow.cast;
                })
        }

        private _beforeInitHandler(){
            this.entityObject.directionLights.forEach((lightObject:GameObject) => {
                var light:DirectionLight = lightObject.getComponent<DirectionLight>(DirectionLight);

                if(light.castShadow){
                    let shadowMap = TwoDShadowMapTexture.create(),
                        renderer = TwoDShadowMapRenderTargetRenderer.create(shadowMap, light);

                    this.twoDShadowMapList.addChild(shadowMap);

                    this.entityObject.addRenderTargetRenderer(renderer);
                }
            }, this);

            this._initShadowList()
        }

        public twoDShadowMapList = wdCb.Collection.create<TwoDShadowMapTexture>();

        private _initShadowList(){
            this._endLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.ENDLOOP)
                .subscribe(() => {
                    Director.getInstance().scene.glslData.removeChild(<any>EShaderGLSLData.TWOD_SHADOWMAP);
                });
        }
    }
}
