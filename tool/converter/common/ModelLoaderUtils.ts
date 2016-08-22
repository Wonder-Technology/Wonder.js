import wdCb = require("wdcb");
import path = require("path");

export = class ModelLoaderUtils{
    public static getPath(filePath:string, mapUrl:string) {
        return path.join(path.dirname(filePath), mapUrl);
    }

    public static getNameByPath(filePath:string){
        return wdCb.PathUtils.basename(filePath, wdCb.PathUtils.extname(filePath));
    }
}

