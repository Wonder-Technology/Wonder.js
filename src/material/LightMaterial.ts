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


        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;
        public mode:LightShaderMode = LightShaderMode.PHONG;

        public init(){
            switch (this.mode){
                case LightShaderMode.PHONG:
                    this._setPhongMapShaderLib();
                    this.shader.addLib(PhongLightShaderLib.getInstance());
                    break;
                //case LightShaderMode.GOURAUD:
                //    this._setGouraudMapShaderLib();
                //    this.shader.addLib(GouraudLightShaderLib.getInstance());
                //    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("LightShaderMode"));
                    break;

            }

            super.init();
        }

        private _setPhongMapShaderLib(){
            this._setMapShaderLib("Phong");
        }

        private _setGouraudMapShaderLib(){
            this._setMapShaderLib("Gouraud");
        }

        private _setMapShaderLib(shaderModel:string){
            if(this._diffuseMap){
                this.shader.addLib(dy[`${shaderModel}DiffuseMapShaderLib`].getInstance());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.getInstance());
            }

            if(this._specularMap){
                this.shader.addLib(dy[`${shaderModel}SpecularMapShaderLib`].getInstance());
            }
            else{
                this.shader.addLib(NoSpecularMapShaderLib.getInstance());
            }

            if(this._normalMap){
                this.shader.addLib(dy[`${shaderModel}NormalMapShaderLib`].getInstance());
            }
            else{
                this.shader.addLib(dy[`${shaderModel}NoNormalMapShaderLib`].getInstance());
            }
        }
    }
}

