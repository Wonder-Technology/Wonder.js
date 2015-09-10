/// <reference path="../definitions.d.ts"/>
module dy{
    export class SkyboxMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.cullMode = CullMode.FRONT;
        }

        public init(){
            this.shader.addLib(render.SkyboxShaderLib.getInstance());

            super.init();
        }
    }
}

