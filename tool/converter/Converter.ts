import fs = require("fs-extra");
import path = require("path");
import through = require("through2");
import gutil = require("gulp-util");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import Log = require("./common/Log");
import OBJToWD = require("./obj/OBJToWD");
import MD2ToWD = require("./md2/MD2ToWD");

export = class Converter {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    public version:string = null;
    public extname:string = ".wd";

    public initWhenCreate(){
        this.version = fs.readJsonSync(path.join(__dirname, "../../../package.json")).version;
    }

    public convert(fileBuffer:Buffer, filePath:string):wdFrp.Stream {
        var fileExtname = path.extname(filePath),
            result:wdFrp.Stream = null;

        switch (fileExtname) {
            case ".obj":
                result = OBJToWD.create(this.version).convert(fileBuffer.toString(), filePath);
                break;
            case ".md2":
                result = MD2ToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            default:
                result = wdFrp.empty();
                break;
        }

        return result;
    }

    public write(fileContentStream:wdFrp.Stream, sourceDir:string, destDir:string, filePath:string):wdFrp.Stream {
        var self = this;

        return fileContentStream.flatMap(([fileJson, resourceUrlArr]) => {
            var resultFilePath = self._getDestFilePath(sourceDir, destDir, filePath.replace(/\.\w+$/, self.extname));

            if(resourceUrlArr && resourceUrlArr.length > 0){
                return wdFrp.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson)
                    .merge(
                        self._createCopyResourceStream(resourceUrlArr, sourceDir, destDir)
                    )
            }

            return wdFrp.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson);
        })
    }

    private _createCopyResourceStream(resourceUrlArr, sourceDir, destDir){
        return wdFrp.fromArray(resourceUrlArr)
            .flatMap((resourceUrl:string) => {
                return wdFrp.fromNodeCallback(fs.copy)(resourceUrl, this._getDestFilePath(sourceDir, destDir, resourceUrl));
            })
    }

    private _getDestFilePath(sourceDir:string, destDir:string, sourceFilePath:string){
        return path.join(destDir, path.relative(sourceDir, sourceFilePath));
    }
}

