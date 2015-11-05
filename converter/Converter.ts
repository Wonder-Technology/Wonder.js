/// <reference path="../node_modules/dyrt/dist/dyRt.node.d.ts"/>
/// <reference path="../node_modules/dycb/dist/dyCb.node.d.ts"/>
import fs = require("fs-extra");
import path = require("path");
import through = require("through2");
import gutil = require("gulp-util");
import dyRt = require("dyrt");
import dyCb = require("dycb");
import Log = require("./common/Log");
import OBJToDY = require("./obj/OBJToDY");

const VERSION = "0.1.0";

export = class Converter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public name:string = "DYConverter";

    public convert(fileContent:string, filePath:string):dyRt.Stream {
        var fileExtname = path.extname(filePath),
            result:dyRt.Stream = null;

        switch (fileExtname) {
            case ".obj":
                result = OBJToDY.create(VERSION, this.name).convert(fileContent, filePath);
                break;
            default:
                Log.error(true, Log.info.FUNC_UNKNOW(fileExtname));
                break;
        }

        return result;
    }

    public write(fileContentStream:dyRt.Stream, sourceDir:string, destDir:string, filePath:string):dyRt.Stream {
        return fileContentStream.flatMap((fileJson:{any}) => {
            var resultFilePath = path.join(destDir, path.relative(sourceDir, filePath));

            return dyRt.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson);
        })
    }
}

