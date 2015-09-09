/// <reference path="../definitions.d.ts"/>
module dy{
    export class BasicMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            this.shader.addLib(render.BasicShaderLib.getInstance());
        }
    }
}

