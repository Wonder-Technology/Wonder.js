/// <reference path="../../node_modules/dycb/dist/dyCb.node.d.ts"/>
import dyCb = require("dycb");
import path = require("path");

export = class ModelLoaderUtils{
    public static getPath(filePath:string, mapUrl:string) {
        return path.join(path.dirname(filePath), mapUrl);
    }

    public static getNameByPath(filePath:string){
        return dyCb.PathUtils.basename(filePath, dyCb.PathUtils.extname(filePath));
    }
}

