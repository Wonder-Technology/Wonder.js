import path = require("path");

export = class PathUtils{
    public static getAbsoluteResourceUrl(filePath:string, resourceRelativeUrl:string) {
        return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    }
}

