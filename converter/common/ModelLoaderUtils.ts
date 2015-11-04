import path = require("path");

export = class ModelLoaderUtils{
    public static getPath(filePath:string, mapUrl:string) {
        return path.join(path.dirname(filePath), mapUrl);
    }
}

