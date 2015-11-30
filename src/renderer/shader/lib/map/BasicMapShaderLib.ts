/// <reference path="../../../../filePath.d.ts"/>
module wd{
    export class BasicMapShaderLib extends MapShaderLib{
        public static create() {
            var obj = new this();

            return obj;
        }


        public type:string = "map_forBasic";
    }
}

