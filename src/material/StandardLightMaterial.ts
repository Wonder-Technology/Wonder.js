module wd{
    export abstract class StandardLightMaterial extends EngineMaterial{
        private _lightMap:Texture = null;
        get lightMap(){
            return this._lightMap;
        }
        @requireSetter(function(lightMap:Texture){
            assert(lightMap instanceof ImageTexture || lightMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("lightMap", "be ImageTexture or ProceduralTexture"));
        })
        set lightMap(lightMap:Texture){
            this.mapManager.addMap(lightMap, {
                samplerVariableName: VariableNameTable.getVariableName("lightMap")
            });

            this._lightMap = lightMap;
        }

        private _diffuseMap:Texture = null;
        get diffuseMap(){
            return this._diffuseMap;
        }
        @requireSetter(function(diffuseMap:ImageTexture){
            assert(diffuseMap instanceof ImageTexture || diffuseMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("diffuseMap", "be ImageTexture or ProceduralTexture"));
        })
        set diffuseMap(diffuseMap:Texture){
            this.mapManager.addMap(diffuseMap, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap")
            });

            this._diffuseMap = diffuseMap;
        }

        private _specularMap:Texture = null;
        get specularMap(){
            return this._specularMap;
        }
        @requireSetter(function(specularMap:Texture){
            assert(specularMap instanceof ImageTexture || specularMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("specularMap", "be ImageTexture or ProceduralTexture"));
        })
        set specularMap(specularMap:Texture){
            this.mapManager.addMap(specularMap, {
                samplerVariableName: VariableNameTable.getVariableName("specularMap")
            });

            this._specularMap = specularMap;
        }

        private _emissionMap:Texture = null;
        get emissionMap(){
            return this._emissionMap;
        }
        @requireSetter(function(emissionMap:Texture){
            assert(emissionMap instanceof ImageTexture || emissionMap instanceof ProceduralTexture, Log.info.FUNC_SHOULD("emissionMap", "be ImageTexture or ProceduralTexture"));
        })
        set emissionMap(emissionMap:Texture){
            this.mapManager.addMap(emissionMap, {
                samplerVariableName: VariableNameTable.getVariableName("emissionMap")
            });

            this._emissionMap = emissionMap;
        }

        private _normalMap:ImageTexture = null;
        get normalMap(){
            return this._normalMap;
        }
        @requireSetter(function(normalMap:ImageTexture){
            assert(normalMap instanceof ImageTexture, Log.info.FUNC_SHOULD("normalMap", "be ImageTexture"));
        })
        set normalMap(normalMap:ImageTexture){
            this.mapManager.addMap(normalMap, {
                samplerVariableName: VariableNameTable.getVariableName("normalMap")
            });

            this._normalMap = normalMap;
        }

        private _shininess:number = 32;
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
        get opacity(){
            return this._opacity;
        }
        set opacity(opacity:number){
            this.setBlendByOpacity(opacity);

            this._opacity = opacity;
        }

        public lightModel:ELightModel = ELightModel.PHONG;

        //public cubemapShadowMapDatas:wdCb.Collection<CubemapShadowMapData> = wdCb.Collection.create<CubemapShadowMapData>();
        //
        //public buildCubemapShadowMapData:BuildCubemapShadowMapData = null;

        public specularColor:Color = Color.create("#ffffff");
        public emissionColor:Color = Color.create("rgba(0,0,0,0)");
        public lightMapIntensity:number = 1;

        private _cubemapShadowMapSamplerIndex:number = 0;


        //public addCubemapShadowMap(shadowMap:CubemapShadowMapTexture){
        //    this.mapManager.addMap(shadowMap, {
        //        samplerData: this._cubemapShadowMapSamplerIndex
        //    });
        //    this._cubemapShadowMapSamplerIndex++;
        //}
        //
        //public addCubemapShadowMapData(shadowMapData:CubemapShadowMapData){
        //    this.cubemapShadowMapDatas.addChild(shadowMapData);
        //}
        //
        //public clearCubemapShadowMapData(){
        //    this.cubemapShadowMapDatas.removeAllChildren();
        //}

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

            if(scene.shadowMap.enable && (this._hasTwoDShadowMap() || this._hasCubemapShadowMap())){
                if(this._hasTwoDShadowMap()){
                    this.shader.addLib(TwoDShadowMapShaderLib.create());
                }
                if(this._hasCubemapShadowMap()){
                    this.shader.addLib(CubemapShadowMapShaderLib.create());
                }

                this.shader.addLib(TotalShadowMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoShadowMapShaderLib.create());
            }
        }

        private _setEnvMapShaderLib(envMap:CubemapTexture){
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
            //todo refactor
            //return this.mapManager.hasMap((map:Texture) => {
            //    return map instanceof CubemapShadowMapTexture;
            //});
            return ShadowUtils.isReceive(this.geometry.entityObject) && this.mapManager.getCubemapShadowMapList().getCount() > 0;
        }
    }

    ////todo remove
    //export type CubemapShadowMapData = {
    //    shadowBias:number,
    //    shadowDarkness:number,
    //    lightPos:Vector3,
    //    farPlane:number
    //}
    //
    //export type BuildCubemapShadowMapData = {
    //    lightPos:Vector3,
    //    farPlane: number
    //}
}

