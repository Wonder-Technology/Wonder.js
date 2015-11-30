/// <reference path="../../filePath.d.ts"/>
module dy{
    export class ModelLoaderUtils{
        public static getPath(filePath:string, mapUrl:string) {
            return `${wdCb.PathUtils.dirname(filePath)}/${mapUrl}`;
        }
    }
}

