/// <reference path="../../definitions.d.ts"/>
module dy{
    export class OBJLoaderUtils{
        public static getPath(filePath:string, mapUrl:string) {
            return `${dyCb.PathUtils.dirname(filePath)}/${mapUrl}`;
        }
    }
}

