/// <reference path="../definitions.d.ts"/>
module dy{
    export class CustomMaterial extends Material{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public initWhenCreate(){
            //this.shader.removeAllLibs();
        }
    }
}

