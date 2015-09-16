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

        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;
        public mode:LightShaderMode = LightShaderMode.PHONG;

        public init(){
            if(this._diffuseMap){
                this.shader.addLib(DiffuseMapShaderLib.getInstance());
            }
            else{
                this.shader.addLib(NoDiffuseMapShaderLib.getInstance());
            }

            switch (this.mode){
                case LightShaderMode.PHONG:
                    this.shader.addLib(PhongLightShaderLib.getInstance());
                    break;
                case LightShaderMode.GOURAUD:
                    this.shader.addLib(GouraudLightShaderLib.getInstance());
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("LightShaderMode"));
                    break;

            }

            super.init();
        }
    }
}

