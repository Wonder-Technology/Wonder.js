import fs = require("fs-extra");
import path = require("path");
import through = require("through2");
import gutil = require("gulp-util");
import wdFrp = require("wdfrp");
import wdCb = require("wdcb");
import Log = require("../ts/Log");
import JudgeUtils = require("../ts/JudgeUtils");
import FileUtils = require("../ts/FileUtils");
import PathUtils = require("./common/PathUtils");

import {OBJTowd} from "./obj/OBJTowd";
import {MD2Towd} from "./md2/MD2Towd";
import {GLTFTowd} from "./gltf/GLTFTowd";
import {FBXTowd} from "./fbx/FBXTowd";

var nodeBase64Image = require("node-base64-image");

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
                result = OBJTowd.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".md2":
                result = MD2Towd.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".gltf":
                result = GLTFTowd.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".fbx":
                result = FBXTowd.create().convert(filePath, destDir);
                break;
            default:
                result = wdFrp.empty();
                break;
        }

        return result;
    }

    public write(fileContentStream:wdFrp.Stream, sourceDir:string, destDir:string, filePath:string, isEmbedded:boolean = false):wdFrp.Stream {
        var self = this,
            resultRelativeFilePath:string = null;

        return fileContentStream.concatMap((data:any) => {
            if(!data || data.length === 0 || !data[0]){
                return wdFrp.empty();
            }

            let [fileJson] = data,
                resourceUrlArr = self._getResourceUrlArr(fileJson, filePath);

            resultRelativeFilePath = self._getRelativeDestFilePath(sourceDir, destDir, filePath.replace(/\.\w+$/, self.extname));

            if(resourceUrlArr && resourceUrlArr.length > 0){
                let stream:wdFrp.Stream = null;


                return wdFrp.fromArray(resourceUrlArr)
                    .flatMap((resourceUrl:string) => {
                        if(!fs.existsSync(resourceUrl)){
                            return wdFrp.empty();
                        }

                        if(isEmbedded && self._isImage(resourceUrl)){
                        //     return self._convertImageToBase64Stream(resourceUrl);
                            return wdFrp.empty();
                        }

                        // if(!isEmbedded || !self._isImage(resourceUrl)){
                            return self._createCopyResourceStream(resourceUrl, sourceDir, destDir);
                        // }

                        // return wdFrp.empty();
                    })
                    .ignoreElements()
                    .concat(
                        wdFrp.fromNodeCallback(fs.outputJson)(resultRelativeFilePath, fileJson)
                    );
            }

            return wdFrp.fromNodeCallback(fs.outputJson)(resultRelativeFilePath, fileJson);
        })
        .map(() => {
            return resultRelativeFilePath;
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

    private _createCopyResourceStream(resourceUrl:string, sourceDir:string, destDir:string){
        var targetResourceUrl:string = null,
            relativeUrl:string = null;

        targetResourceUrl = this._getRelativeDestFilePath(sourceDir, destDir, resourceUrl);
        relativeUrl = path.relative(resourceUrl, targetResourceUrl);

        if(relativeUrl === "" || relativeUrl === "./"){
            return wdFrp.empty();
        }

        return wdFrp.fromNodeCallback(fs.copy)(resourceUrl, targetResourceUrl);
    }

    // private _convertImageToBase64Stream(resourceUrl:string){
    //     // read binary data
    //     var bitmap = fs.readFileSync(resourceUrl);
    //     // convert binary data to base64 encoded string
    //     return wdFrp.just(new Buffer(bitmap).toString('base64'))
    //
    //     // return new Buffer(bitmap).toString('base64');
    //
    //     // return wdFrp.fromNodeCallback(nodeBase64Image.encode)(resourceUrl, {
    //     //    string:true
    //     // });
    //
    //     // nodeBase64Image.encode(resourceUrl, {
    //     //    string:true
    //     // }, () => {
    //     //
    //     // });
    //     //
    //     // targetResourceUrl = this._getRelativeDestFilePath(sourceDir, destDir, resourceUrl);
    //     // relativeUrl = path.relative(resourceUrl, targetResourceUrl);
    //     //
    //     // if(!fs.existsSync(resourceUrl)
    //     //     || relativeUrl === "" || relativeUrl === "./"){
    //     //     return wdFrp.empty();
    //     // }
    //     //
    //     // return wdFrp.fromNodeCallback(fs.copy)(resourceUrl, targetResourceUrl);
    // }


    private _getRelativeDestFilePath(sourceDir:string, destDir:string, sourceFilePath:string){
        return path.join(destDir, path.relative(sourceDir, sourceFilePath));
    }

    private _isImage(resourceUrl:string){
        return FileUtils.isImage(resourceUrl);
    }
}

