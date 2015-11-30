/// <reference path="../filePath.d.ts"/>
module wd{
    export class CustomMaterial extends Material{
        public static create() {
            var obj = new this();

            return obj;
        }
    }
}

