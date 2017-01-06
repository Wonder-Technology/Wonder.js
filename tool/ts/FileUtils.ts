import path = require("path");

export = class FileUtils{
    public static isImage(url:string) {
        switch (path.extname(url)){
            case ".jpg":
            case ".jpeg":
            case ".png":
            case ".dds":
            case ".gif":
            case ".bmp":
                return true;
            default:
                return false;
        }
    }
}

