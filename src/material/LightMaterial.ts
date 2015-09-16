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

        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;
        public mode:LightShaderMode = LightShaderMode.PHONG;

        public init(){
            switch (this.mode){
                case LightShaderMode.PHONG:
                    this._setPhongMapShaderLib();
                    this.shader.addLib(PhongLightShaderLib.getInstance());
                    break;
                case LightShaderMode.GOURAUD:
                    this._setGouraudMapShaderLib();
                    this.shader.addLib(GouraudLightShaderLib.getInstance());
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("LightShaderMode"));
                    break;

            }

            super.init();
        }

        private _setPhongMapShaderLib(){
            if(this._diffuseMap){
                this.shader.addLib(PhongDiffuseMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.getInstance());
            }

            if(this._specularMap){
                this.shader.addLib(PhongSpecularMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoSpecularMapShaderLib.getInstance());
            }
        }

        private _setGouraudMapShaderLib(){
            if(this._diffuseMap){
                this.shader.addLib(GouraudDiffuseMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.getInstance());
            }

            if(this._specularMap){
                this.shader.addLib(GouraudSpecularMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoSpecularMapShaderLib.getInstance());
            }
        }
    }
}

