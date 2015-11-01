/// <reference path="../../definitions.d.ts"/>
module dy{
    export class ModelLoaderUtils{
        public static getPath(filePath:string, mapUrl:string) {
            return `${dyCb.PathUtils.dirname(filePath)}/${mapUrl}`;
        }
    }
}

