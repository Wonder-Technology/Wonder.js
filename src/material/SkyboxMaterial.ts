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

        protected addShaderLib(){
            this.shader.addLib(SkyboxShaderLib.create());
        }

        protected initEnvMap(){
            //do nothing
        }
    }
}

