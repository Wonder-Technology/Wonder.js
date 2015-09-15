/// <reference path="../definitions.d.ts"/>
module dy{
    export class LightMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;
        public mode:LightShaderMode = LightShaderMode.PHONG;

        public init(){
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

