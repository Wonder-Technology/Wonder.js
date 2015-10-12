/// <reference path="../definitions.d.ts"/>
module dy{
    export class LightMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _diffuseMap:CommonTexture|CompressedTexture = null;
        get diffuseMap(){
            return this._diffuseMap;
        }
        set diffuseMap(diffuseMap:CommonTexture|CompressedTexture){
            this.addMap(diffuseMap, {
                samplerVariableName: VariableNameTable.getVariableName("diffuseMap")
            });

            this._diffuseMap = diffuseMap;
        }

        private _specularMap:CommonTexture|CompressedTexture = null;
        get specularMap(){
            return this._specularMap;
        }
        set specularMap(specularMap:CommonTexture|CompressedTexture){
            this.addMap(specularMap, {
                samplerVariableName: VariableNameTable.getVariableName("specularMap")
            });

            this._specularMap = specularMap;
        }

        private _normalMap:CommonTexture|CompressedTexture = null;
        get normalMap(){
            return this._normalMap;
        }
        set normalMap(normalMap:CommonTexture|CompressedTexture){
            this.addMap(normalMap, {
                samplerVariableName: VariableNameTable.getVariableName("normalMap")
            });

            this._normalMap = normalMap;
        }

        public twoDShadowMapDatas:dyCb.Collection<TwoDShadowMapData> = dyCb.Collection.create<TwoDShadowMapData>();
        public cubemapShadowMapDatas:dyCb.Collection<CubemapShadowMapData> = dyCb.Collection.create<CubemapShadowMapData>();

        public buildTwoDShadowMapData:BuildTwoDShadowMapData = null;
        public buildCubemapShadowMapData:BuildCubemapShadowMapData = null;


        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;

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

        public hasShadowMap(map:TwoDShadowMapTexture|CubemapShadowMapTexture){
            return this.textureManager.hasMap(map);
        }

        public addTwoDShadowMapData(shadowMapData:TwoDShadowMapData){
            this.twoDShadowMapDatas.addChild(shadowMapData);
        }

        public addCubemapShadowMapData(shadowMapData:CubemapShadowMapData){
            this.cubemapShadowMapDatas.addChild(shadowMapData);
        }

        public clearShadowMapData(){
            this.twoDShadowMapDatas.removeAllChildren();
            this.cubemapShadowMapDatas.removeAllChildren();
        }

        public init(){
            this.shader.addLib(LightCommonShaderLib.getInstance());
            this._setPhongMapShaderLib();
            this.shader.addLib(LightShaderLib.getInstance());

            super.init();
        }

        private _setPhongMapShaderLib(){
            if(this._diffuseMap){
                this.shader.addLib(DiffuseMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.getInstance());
            }

            if(this._specularMap){
                this.shader.addLib(SpecularMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoSpecularMapShaderLib.getInstance());
            }

            if(this._normalMap){
                this.shader.addLib(NormalMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoNormalMapShaderLib.getInstance());
            }

            if(this._hasTwoDShadowMap() || this._hasCubemapShadowMap()){
                if(this._hasTwoDShadowMap()){
                    this.shader.addLib(TwoDShadowMapShaderLib.getInstance());
                }
                if(this._hasCubemapShadowMap()){
                    this.shader.addLib(CubemapShadowMapShaderLib.getInstance());
                }
            }
            else{
                this.shader.addLib(NoShadowMapShaderLib.getInstance());
            }
        }

        private _hasTwoDShadowMap(){
            return this.textureManager.hasMap((map:Texture) => {
                return map instanceof TwoDShadowMapTexture;
            });
        }

        private _hasCubemapShadowMap(){
            return this.textureManager.hasMap((map:Texture) => {
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

