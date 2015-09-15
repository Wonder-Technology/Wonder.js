/// <reference path="../definitions.d.ts"/>
module dy{
    export class LightMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }

        public specular:Color = Color.create("0x111111");
        public shininess:number = 32;

        public init(){
            this.shader.addLib(LightShaderLib.getInstance());

            super.init();
        }
    }
}

