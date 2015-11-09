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
import MD2ToDY = require("./md2/MD2ToDY");

export = class Converter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public version:string = "0.1.0";
    public extname:string = ".dy";

    public convert(fileBuffer:Buffer, filePath:string):dyRt.Stream {
        var fileExtname = path.extname(filePath),
            result:dyRt.Stream = null;

        switch (fileExtname) {
            case ".obj":
                result = OBJToDY.create(this.version).convert(fileBuffer.toString(), filePath);
                break;
            case ".md2":
                result = MD2ToDY.create(this.version).convert(fileBuffer, filePath);
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

            if(resourceUrlArr && resourceUrlArr.length > 0){
                return dyRt.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson)
                    .merge(
                        self._createCopyResourceStream(resourceUrlArr, sourceDir, destDir)
                    )
            }

            return dyRt.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson);
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

