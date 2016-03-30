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

        @require(function (entityObject:EntityObject, isShareComponent:boolean = false) {
            assert(entityObject instanceof GameObject, Log.info.FUNC_SHOULD("add to GameObject"));
        })
        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false) {
            super.addToObject(entityObject, isShareComponent);
        }

        public clone() {
            return CloneHelper.clone(this);
        }

        //todo refactor
        public init() {
            var material:Material = null,
                twoDShadowMapList:wdCb.Collection<TwoDShadowMapTexture> = Director.getInstance().scene.gameObjectScene.getComponent(ShadowManager).twoDShadowMapList;


            if(this.entityObject.hasComponent(ObjectInstance)){
                return;
            }


            if (this.entityObject.hasComponent(Geometry)) {
                material = this.entityObject.getComponent<Geometry>(Geometry).material;
            }

            if (this.cast) {
                let shader = this._createBuildShadowMapShader(this.entityObject);

                twoDShadowMapList.forEach((twoDShadowMap:TwoDShadowMapTexture) => {
                    if (!shader.mapManager.hasTwoDShadowMap(twoDShadowMap)) {
                        shader.mapManager.addTwoDShadowMap(twoDShadowMap);
                    }
                });

                if (material) {
                    this._addBuildShadowMapShader(material, shader);
                }


                let self = this;

                let setChildren = (child:GameObject) => {
                        if (!child.hasComponent(Geometry)) {
                        return;
                    }

                    var material:Material = child.getComponent<Geometry>(Geometry).material;

                    self._addBuildShadowMapShader(material, shader);

                    child.forEach((c:GameObject) => {
                        setChildren(c);
                    })
                };

                this.entityObject.forEach((child:GameObject) => {
                    setChildren(child);
                });
            }

            if (this.receive) {
                if (material) {
                    let shader = material.getShader(<any>EShaderMapKey.DEFAULT);

                    twoDShadowMapList.forEach((twoDShadowMap:TwoDShadowMapTexture) => {
                        if (!shader.mapManager.hasTwoDShadowMap(twoDShadowMap)) {
                            shader.mapManager.addTwoDShadowMap(twoDShadowMap);
                        }
                    });
                }


                let setChildren = (child:GameObject) => {
                        if (!child.hasComponent(Geometry)) {
                        return;
                    }

                    var material:Material = child.getComponent<Geometry>(Geometry).material,
                        shader = material.getShader(<any>EShaderMapKey.DEFAULT);

                    twoDShadowMapList.forEach((twoDShadowMap:TwoDShadowMapTexture) => {
                        if (!shader.mapManager.hasTwoDShadowMap(twoDShadowMap)) {
                            shader.mapManager.addTwoDShadowMap(twoDShadowMap);
                        }
                    });

                    child.forEach((c:GameObject) => {
                        setChildren(c);
                    })
                };

                this.entityObject.forEach((child:GameObject) => {
                    setChildren(child);
                });
            }
        }

        private _createBuildShadowMapShader(object:GameObject) {
            var shader:CommonShader = CommonShader.create(null);

            shader.addLib(CommonShaderLib.create());
            shader.addLib(VerticeCommonShaderLib.create());

            if (RenderUtils.isInstanceAndHardwareSupport(object)) {
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
    }
}
