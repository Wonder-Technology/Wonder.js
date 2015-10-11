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

        //todo support multi shadows
        private _twoDShadowMap:TwoDShadowMapTexture = null;
        get twoDShadowMap(){
            return this._twoDShadowMap;
        }
        set twoDShadowMap(twoDShadowMap:TwoDShadowMapTexture){
            this.addMap(twoDShadowMap, {
                samplerVariableName: VariableNameTable.getVariableName("twoDShadowMap")
            });

            this._twoDShadowMap = twoDShadowMap;
        }

        //private _cubemapShadowMap:CubemapShadowMapTexture = null;
        //get cubemapShadowMap(){
        //    return this._cubemapShadowMap;
        //}
        //set cubemapShadowMap(cubemapShadowMap:CubemapShadowMapTexture){
        //    this.addMap(cubemapShadowMap, {
        //        samplerVariableName: VariableNameTable.getVariableName("cubemapShadowMap")
        //    });
        //
        //    this._cubemapShadowMap = cubemapShadowMap;
        //}

        public twoDShadowMapData:TwoDShadowMapData = null;
        //public cubemapShadowMapData:CubemapShadowMapData = null;
        public buildCubemapShadowMapData:BuildCubemapShadowMapData = null;


        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;

        private _shadowMapIndex:number = 0;


        public addCubemapShadowMap(cubemapShadowMap:CubemapShadowMapTexture){
            this.addMap(cubemapShadowMap, {
                samplerData: this._shadowMapIndex
            });
            this._shadowMapIndex++;
        }

        public hasShadowMap(map:TwoDShadowMapTexture|CubemapShadowMapTexture){
            return this.textureManager.hasMap(map);
        }

        public init(){
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

            if(this._twoDShadowMap){
                this.shader.addLib(TwoDShadowMapShaderLib.getInstance());
            }
            //todo remove else?
            else if(this._hasCubemapShadowMap()){
                this.shader.addLib(CubemapShadowMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoShadowMapShaderLib.getInstance());
            }
        }

        private _hasCubemapShadowMap(){
            return this.textureManager.hasMap((map:Texture) => {
                return map instanceof CubemapShadowMapTexture;
            });
        }
    }

    //todo
    export type TwoDShadowMapData = {
        shadowBias:number,
        shadowDarkness:number,
        shadowMapSize:Array<number>,
        vpMatrixFromLight:Matrix4,
    }

    export type BuildCubemapShadowMapData = {
        lightPos:Vector3,
        farPlane: number
    }
}

