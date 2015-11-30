/// <reference path="../filePath.d.ts"/>
module wd{
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
    }
}

