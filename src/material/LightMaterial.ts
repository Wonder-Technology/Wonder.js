module wd{
    export class LightMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _lightMap:ImageTexture = null;
        get lightMap(){
            return this._lightMap;
        }
        @requireSetter(function(lightMap:ImageTexture){
            assert(lightMap instanceof ImageTexture, Log.info.FUNC_SHOULD("lightMap", "be ImageTexture"));
        })
        set lightMap(lightMap:ImageTexture){
            this.addMap(lightMap, {
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
            this.addMap(diffuseMap, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap")
            });

            this._diffuseMap = diffuseMap;
        }

        private _specularMap:ImageTexture = null;
        get specularMap(){
            return this._specularMap;
        }
        @requireSetter(function(specularMap:ImageTexture){
            assert(specularMap instanceof ImageTexture, Log.info.FUNC_SHOULD("specularMap", "be ImageTexture"));
        })
        set specularMap(specularMap:ImageTexture){
            this.addMap(specularMap, {
                samplerVariableName: VariableNameTable.getVariableName("specularMap")
            });

            this._specularMap = specularMap;
        }

        private _emissionMap:ImageTexture = null;
        get emissionMap(){
            return this._emissionMap;
        }
        @requireSetter(function(emissionMap:ImageTexture){
            assert(emissionMap instanceof ImageTexture, Log.info.FUNC_SHOULD("emissionMap", "be ImageTexture"));
        })
        set emissionMap(emissionMap:ImageTexture){
            this.addMap(emissionMap, {
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
            this.addMap(normalMap, {
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

        public twoDShadowMapDatas:wdCb.Collection<TwoDShadowMapData> = wdCb.Collection.create<TwoDShadowMapData>();
        public cubemapShadowMapDatas:wdCb.Collection<CubemapShadowMapData> = wdCb.Collection.create<CubemapShadowMapData>();

        public buildTwoDShadowMapData:BuildTwoDShadowMapData = null;
        public buildCubemapShadowMapData:BuildCubemapShadowMapData = null;

        public specularColor:Color = Color.create("#ffffff");
        public emissionColor:Color = Color.create("rgba(0,0,0,0)");
        public lightMapIntensity:number = 1;

        private _twoDShadowMapSamplerIndex:number = 0;
        private _cubemapShadowMapSamplerIndex:number = 0;

        public addTwoDShadowMap(shadowMap:TwoDShadowMapTexture){
            this.addMap(shadowMap, {
                samplerData: this._twoDShadowMapSamplerIndex
            });
            this._twoDShadowMapSamplerIndex++;
        }

        public addCubemapShadowMap(shadowMap:CubemapShadowMapTexture){
            this.addMap(shadowMap, {
                samplerData: this._cubemapShadowMapSamplerIndex
            });
            this._cubemapShadowMapSamplerIndex++;
        }

        public hasShadowMap(map:IShadowMapTexture){
            return this.mapManager.hasMap(<Texture>map);
        }

        public addTwoDShadowMapData(shadowMapData:TwoDShadowMapData){
            this.twoDShadowMapDatas.addChild(shadowMapData);
        }

        public addCubemapShadowMapData(shadowMapData:CubemapShadowMapData){
            this.cubemapShadowMapDatas.addChild(shadowMapData);
        }

        public clearTwoDShadowMapData(){
            this.twoDShadowMapDatas.removeAllChildren();
        }

        public clearCubemapShadowMapData(){
            this.cubemapShadowMapDatas.removeAllChildren();
        }

        protected addShaderLib(){
            var envMap = null;

            this.addNormalShaderLib();
            this.shader.addLib(LightCommonShaderLib.create());
            this._setLightMapShaderLib();
            this.shader.addLib(LightShaderLib.create());

            envMap = this.envMap;
            if(envMap){
                this._setEnvMapShaderLib(envMap);
            }

            this.shader.addLib(LightEndShaderLib.create());
        }

        private _setLightMapShaderLib(){
            var scene:SceneDispatcher = Director.getInstance().scene;

            if(this._lightMap){
                this.shader.addLib(LightMapShaderLib.create());
            }
            else{
                this.shader.addLib(NoLightMapShaderLib.create());
            }

            if(this._diffuseMap){
                this.shader.addLib(DiffuseMapShaderLib.create());

                //if(this._diffuseMap instanceof ProceduralTexture){
                //    this.addProceduralShaderLib(this._diffuseMap);
                //}
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
                    this.shader.addLib(BasicEnvMapForLightShaderLib.create());
                    break;
                case EEnvMapMode.REFLECTION:
                    this.shader.addLib(ReflectionForLightShaderLib.create());
                    break;
                case EEnvMapMode.REFRACTION:
                    this.shader.addLib(RefractionForLightShaderLib.create());
                    break;
                case EEnvMapMode.FRESNEL:
                    this.shader.addLib(FresnelForLightShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EEnvMapMode"));
                    break;
            }
        }

        private _hasTwoDShadowMap(){
            return this.mapManager.hasMap((map:Texture) => {
                return map instanceof TwoDShadowMapTexture;
            });
        }

        private _hasCubemapShadowMap(){
            return this.mapManager.hasMap((map:Texture) => {
                return map instanceof CubemapShadowMapTexture;
            });
        }
    }

    export type BuildTwoDShadowMapData = {
        vpMatrixFromLight:Matrix4
    }

    export type TwoDShadowMapData = {
        shadowBias:number,
        shadowDarkness:number,
        shadowSize:Array<number>,
        lightPos:Vector3,
        vpMatrixFromLight:Matrix4
    }

    export type CubemapShadowMapData = {
        shadowBias:number,
        shadowDarkness:number,
        lightPos:Vector3,
        farPlane:number
    }

    export type BuildCubemapShadowMapData = {
        lightPos:Vector3,
        farPlane: number
    }
}

