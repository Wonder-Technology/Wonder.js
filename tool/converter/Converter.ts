import fs = require("fs-extra");
import path = require("path");
import through = require("through2");
import gutil = require("gulp-util");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import Log = require("../ts/Log");
import JudgeUtils = require("../ts/JudgeUtils")
import PathUtils = require("./common/PathUtils")

import {OBJToWD} from "./obj/OBJToWD";
import {MD2ToWD} from "./md2/MD2ToWD";
import {GLTFToWD} from "./gltf/GLTFToWD";
import {FBXToWD} from "./fbx/FBXToWD";

export = class Converter {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }

    public version:string = null;
    public extname:string = ".wd";

    public initWhenCreate(){
        this.version = fs.readJsonSync(path.join(__dirname, "../../../../package.json")).version;
    }

    public convert(fileBuffer:Buffer, filePath:string, sourceDir:string, destDir:string):wdFrp.Stream {
        var fileExtname = path.extname(filePath),
            result:wdFrp.Stream = null;

        switch (fileExtname.toLowerCase()) {
            case ".obj":
                result = OBJToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".md2":
                result = MD2ToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".gltf":
                result = GLTFToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".fbx":
                result = FBXToWD.create().convert(filePath, destDir);
                break;
            default:
                result = wdFrp.empty();
                break;
        }

        return result;
    }

    public write(fileContentStream:wdFrp.Stream, sourceDir:string, destDir:string, filePath:string):wdFrp.Stream {
        var self = this;

        return fileContentStream.flatMap((data:any) => {
            if(!data || data.length === 0 || !data[0]){
                return wdFrp.just(null);
            }

            let [fileJson] = data,
                resultFilePath = self._getDestFilePath(sourceDir, destDir, filePath.replace(/\.\w+$/, self.extname)),
                resourceUrlArr = self._getResourceUrlArr(fileJson, filePath);

            if(resourceUrlArr && resourceUrlArr.length > 0){
                return wdFrp.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson)
                    .merge(
                        self._createCopyResourceStream(resourceUrlArr, sourceDir, destDir)
                    )
            }

            return wdFrp.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson);
        })
    }

    private _getResourceUrlArr(resultJson:any, filePath:string) {
        var urlArr = [];

        this._addBinsUrl(resultJson, urlArr, filePath);
        this._addImagesUrl(resultJson, urlArr, filePath);

        return wdCb.ArrayUtils.removeRepeatItems(urlArr);
    }

    private _addBinsUrl(resultJson:any, urlArr:Array<string>, filePath:string){
        this._addFileUrl(resultJson, "buffers", urlArr, filePath);
    }

    private _addImagesUrl(resultJson:any, urlArr:Array<string>, filePath:string){
        this._addFileUrl(resultJson, "images", urlArr, filePath);
    }

    private _addFileUrl(resultJson:any, type:string, urlArr:Array<string>, filePath:string){
        if(!resultJson[type]){
            return;
        }

        for (let name in resultJson[type]) {
            if (resultJson[type].hasOwnProperty(name)) {
                let file = resultJson[type][name];

                if(JudgeUtils.isString(file.uri) && file.uri.match(/\.\w+$/) !== null){
                    urlArr.push(PathUtils.getAbsoluteResourceUrl(filePath, file.uri));
                }
            }
        }
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

