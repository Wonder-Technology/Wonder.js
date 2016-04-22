module wd{
    export abstract class StandardLightMaterial extends EngineMaterial{
        private _lightMap:Texture = null;
        @requireSetter(function(lightMap:Texture){
            assert(lightMap instanceof ImageTexture || lightMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("lightMap", "be ImageTexture or ProceduralTexture"));
        })
        @cloneAttributeAsCloneable()
        get lightMap(){
            return this._lightMap;
        }
        set lightMap(lightMap:Texture){
            this.mapManager.addMap(lightMap, {
                samplerVariableName: VariableNameTable.getVariableName("lightMap")
            });

            this._lightMap = lightMap;
        }

        private _diffuseMap:Texture = null;
        @requireSetter(function(diffuseMap:ImageTexture){
            assert(diffuseMap instanceof ImageTexture || diffuseMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("diffuseMap", "be ImageTexture or ProceduralTexture"));
        })
        @cloneAttributeAsCloneable()
        get diffuseMap(){
            return this._diffuseMap;
        }
        set diffuseMap(diffuseMap:Texture){
            this.mapManager.addMap(diffuseMap, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap")
            });

            this._diffuseMap = diffuseMap;
        }

        private _specularMap:Texture = null;
        @requireSetter(function(specularMap:Texture){
            assert(specularMap instanceof ImageTexture || specularMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("specularMap", "be ImageTexture or ProceduralTexture"));
        })
        @cloneAttributeAsCloneable()
        get specularMap(){
            return this._specularMap;
        }
        set specularMap(specularMap:Texture){
            this.mapManager.addMap(specularMap, {
                samplerVariableName: VariableNameTable.getVariableName("specularMap")
            });

            this._specularMap = specularMap;
        }

        private _emissionMap:Texture = null;
        @requireSetter(function(emissionMap:Texture){
            assert(emissionMap instanceof ImageTexture || emissionMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("emissionMap", "be ImageTexture or ProceduralTexture"));
        })
        @cloneAttributeAsCloneable()
        get emissionMap(){
            return this._emissionMap;
        }
        set emissionMap(emissionMap:Texture){
            this.mapManager.addMap(emissionMap, {
                samplerVariableName: VariableNameTable.getVariableName("emissionMap")
            });

            this._emissionMap = emissionMap;
        }

        private _normalMap:ImageTexture = null;
        @requireSetter(function(normalMap:ImageTexture){
            assert(normalMap instanceof ImageTexture, Log.info.FUNC_SHOULD("normalMap", "be ImageTexture"));
        })
        @cloneAttributeAsCloneable()
        get normalMap(){
            return this._normalMap;
        }
        set normalMap(normalMap:ImageTexture){
            this.mapManager.addMap(normalMap, {
                samplerVariableName: VariableNameTable.getVariableName("normalMap")
            });

            this._normalMap = normalMap;
        }

        private _shininess:number = 32;
        @cloneAttributeAsBasicType()
        get shininess(){
            if(Number(this._shininess) <= 0){
                return 32;
            }
            return this._shininess;
        }
        set shininess(shininess:number){
            this._shininess = shininess;
        }

        private _opacity:number = 1.0;
        @cloneAttributeAsBasicType({
            order:1
        })
        get opacity(){
            return this._opacity;
        }
        set opacity(opacity:number){
            this.setBlendByOpacity(opacity);

            this._opacity = opacity;
        }

        @cloneAttributeAsBasicType()
        public lightModel:ELightModel = ELightModel.PHONG;
        @cloneAttributeAsCloneable()
        public specularColor:Color = Color.create("#ffffff");
        @cloneAttributeAsCloneable()
        public emissionColor:Color = Color.create("rgba(0,0,0,0)");
        @cloneAttributeAsBasicType()
        public lightMapIntensity:number = 1;

        @virtual
        protected addExtendShaderLib(){
        }

        protected addShaderLib(){
            var envMap = null;

            if(InstanceUtils.isHardwareSupport() && InstanceUtils.isSourceInstance(this.geometry.entityObject)){
                this.shader.addLib(NormalMatrixInstanceShaderLib.create());
            }
            else{
                this.shader.addLib(NormalMatrixNoInstanceShaderLib.create());
            }

            this.addNormalShaderLib();
            this.shader.addLib(LightCommonShaderLib.create());
            this._setLightMapShaderLib();

            this.shader.addLib(LightShaderLib.create());

            envMap = this.envMap;
            if(envMap){
                this._setEnvMapShaderLib(envMap);
            }

            this.addExtendShaderLib();

            this.shader.addLib(LightEndShaderLib.create());
        }

        private _setLightMapShaderLib(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            this.shader.addLib(CommonLightMapShaderLib.create());

            if(this._lightMap){
                this.shader.addLib(LightMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoLightMapShaderLib.create());
            }

            if(this._diffuseMap){
                this.shader.addLib(DiffuseMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.create());
            }

            if(this._specularMap){
                this.shader.addLib(SpecularMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoSpecularMapShaderLib.create());
            }

            if(this._emissionMap){
                this.shader.addLib(EmissionMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoEmissionMapShaderLib.create());
            }

            if(this._normalMap){
                this.shader.addLib(NormalMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoNormalMapShaderLib.create());
            }

            if(scene.shadowMap.enable){
                let hasTwoD = false,
                    hasCubemap = false;

                if(this._hasTwoDShadowMap()){
                    hasTwoD = true;

                    this.shader.addLib(TwoDShadowMapShaderLib.create());
                }
                if(this._hasCubemapShadowMap()){
                    hasCubemap = true;

                    this.shader.addLib(CubemapShadowMapShaderLib.create());
                }

                if(hasTwoD || hasCubemap){
                    this.shader.addLib(TotalShadowMapShaderLib.create());
                }
                else{
                    this.shader.addLib(NoShadowMapShaderLib.create());
                }
            }
            else{
                this.shader.addLib(NoShadowMapShaderLib.create());
            }
        }

        private _setEnvMapShaderLib(envMap:CubemapTexture){
            this.shader.addLib(CommonEnvMapShaderLib.create());

            switch (envMap.mode){
                case EEnvMapMode.BASIC:
                    this.shader.addLib(BasicForLightEnvMapShaderLib.create());
                    break;
                case EEnvMapMode.REFLECTION:
                    this.shader.addLib(ReflectionForLightEnvMapShaderLib.create());
                    break;
                case EEnvMapMode.REFRACTION:
                    this.shader.addLib(RefractionForLightEnvMapShaderLib.create());
                    break;
                case EEnvMapMode.FRESNEL:
                    this.shader.addLib(FresnelForLightEnvMapShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EEnvMapMode"));
                    break;
            }
        }

        private _hasTwoDShadowMap(){
            return ShadowUtils.isReceive(this.geometry.entityObject) && this.mapManager.getTwoDShadowMapList().getCount() > 0;
        }

        private _hasCubemapShadowMap(){
            return ShadowUtils.isReceive(this.geometry.entityObject) && this.mapManager.getCubemapShadowMapList().getCount() > 0;
        }
    }
}

