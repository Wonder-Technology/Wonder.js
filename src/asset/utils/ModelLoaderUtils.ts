/// <reference path="../../filePath.d.ts"/>
module wd{
    export class ModelLoaderUtils{
        public static getPath(filePath:string, mapUrl:string) {
            return `${wdCb.PathUtils.dirname(filePath)}/${mapUrl}`;
        }
    }
}

