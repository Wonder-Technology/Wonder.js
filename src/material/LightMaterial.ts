/// <reference path="../definitions.d.ts"/>
module dy{
    export class LightMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _diffuseMap:Texture = null;
        get diffuseMap(){
            return this._diffuseMap;
        }
        set diffuseMap(diffuseMap:Texture){
            this.addMap(diffuseMap, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap")
            });

            this._diffuseMap = diffuseMap;
        }

        private _specularMap:Texture = null;
        get specularMap(){
            return this._specularMap;
        }
        set specularMap(specularMap:Texture){
            this.addMap(specularMap, {
                samplerVariableName: VariableNameTable.getVariableName("specularMap")
            });

            this._specularMap = specularMap;
        }

        private _normalMap:Texture = null;
        get normalMap(){
            return this._normalMap;
        }
        set normalMap(normalMap:Texture){
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

        //todo make other Material can set opacity
        private _opacity:number = 1.0;
        get opacity(){
            return this._opacity;
        }
        set opacity(opacity:number){
            if(opacity < 1.0 && opacity > 0.0){
                this.blend = true;
            }
            else{
                this.blend = false;
            }

            this._opacity = opacity;
        }

        public twoDShadowMapDatas:dyCb.Collection<TwoDShadowMapData> = dyCb.Collection.create<TwoDShadowMapData>();
        public cubemapShadowMapDatas:dyCb.Collection<CubemapShadowMapData> = dyCb.Collection.create<CubemapShadowMapData>();

        public buildTwoDShadowMapData:BuildTwoDShadowMapData = null;
        public buildCubemapShadowMapData:BuildCubemapShadowMapData = null;


        public specular:Color = Color.create("0x111111");

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
            this.addNormalShaderLib();
            this.shader.addLib(LightCommonShaderLib.create());
            this._setPhongMapShaderLib();
            this.shader.addLib(LightShaderLib.create());

            this._setEnvMapShaderLib();

            this.shader.addLib(LightEndShaderLib.create());
        }

        private _setPhongMapShaderLib(){
            var scene:Scene = Director.getInstance().scene;

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

        private _setEnvMapShaderLib(){
            var envMap = this.envMap;

            if(!envMap){
                return;
            }

            switch (envMap.mode){
                case EnvMapMode.BASIC:
                    this.shader.addLib(BasicEnvMapForLightShaderLib.create());
                    break;
                case EnvMapMode.REFLECTION:
                    this.shader.addLib(ReflectionForLightShaderLib.create());
                    break;
                case EnvMapMode.REFRACTION:
                    this.shader.addLib(RefractionForLightShaderLib.create());
                    break;
                case EnvMapMode.FRESNEL:
                    this.shader.addLib(FresnelForLightShaderLib.create());
                    break;
                default:
                    Log.error(true, Log.info.FUNC_INVALID("EnvMapMode"));
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

