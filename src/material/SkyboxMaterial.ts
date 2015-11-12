/// <reference path="../definitions.d.ts"/>
module dy{
    export class SkyboxMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.side = Side.BACK;
        }

        public init(){
            this.shader.addLib(SkyboxShaderLib.create());

            super.init();
        }

        protected initEnvMap(){
            //do nothing
        }
    }
}

