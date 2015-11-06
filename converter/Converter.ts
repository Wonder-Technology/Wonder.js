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

export = class Converter {
    public static create() {
        var obj = new this();

        return obj;
    }

    //public name:string = "DYConverter";
    public version:string = "0.1.0";
    public extname:string = ".dy";

    public convert(fileContent:string, filePath:string):dyRt.Stream {
        var fileExtname = path.extname(filePath),
            result:dyRt.Stream = null;

        switch (fileExtname) {
            case ".obj":
                result = OBJToDY.create(this.version).convert(fileContent, filePath);
                break;
            default:
                result = dyRt.empty();
                break;
        }

        return result;
    }

    public write(fileContentStream:dyRt.Stream, sourceDir:string, destDir:string, filePath:string):dyRt.Stream {
        var self = this;

        return fileContentStream.flatMap(([fileJson, resourceUrlArr]) => {
            var resultFilePath = self._getDestFilePath(sourceDir, destDir, filePath.replace(/\.\w+$/, self.extname));

            return dyRt.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson)
            .merge(
                self._createCopyResourceStream(resourceUrlArr, sourceDir, destDir)
            )
        })
    }

    private _createCopyResourceStream(resourceUrlArr, sourceDir, destDir){
        return dyRt.fromArray(resourceUrlArr)
            .flatMap((resourceUrl:string) => {
                return dyRt.fromNodeCallback(fs.copy)(resourceUrl, this._getDestFilePath(sourceDir, destDir, resourceUrl));
            })
    }

    private _getDestFilePath(sourceDir:string, destDir:string, sourceFilePath:string){
        return path.join(destDir, path.relative(sourceDir, sourceFilePath));
    }
}

