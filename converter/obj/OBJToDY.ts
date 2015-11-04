/// <reference path="../../node_modules/dyrt/dist/dyRt.node.d.ts"/>
import fs = require("fs");
import path = require("path");
import through = require("through2");
import gutil = require("gulp-util");
import dyRt = require("dyrt");
import MaterialsConverter = require("./MaterialsConverter");
import ObjectsConverter = require("./ObjectsConverter");
import ModelLoaderUtils = require("../common/ModelLoaderUtils");
import Log = require("../common/Log");

export = class OBJToDY{
    public static create(version:string) {
    	var obj = new this(version);

    	return obj;
    }

    constructor(version:string){
        this.version = version;
    }

    public name:string = "OBJToDY";
    public version:string = null;

    //todo why "_objectsConverter:ObjectsConverter" can't find ObjectsConverter?
    //private _objectsConverter:ObjectsConverter = ObjectsConverter.create();

    private _objectsConverter:any = ObjectsConverter.create();
    private _materialsConverter:any = MaterialsConverter.create();


    public convert(){
        var self = this;

        return through.obj(function (file, encoding, callback) {
            var fileContent:string = null,
                filePath = null,
                that = this,
                resultJson:any = {};

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(self.name, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                fileContent = file.contents.toString();
                filePath = file.path;

                resultJson.metadata = self._convertMetadata(filePath);

                resultJson.scene = self._convertScene(fileContent, filePath);
                resultJson.objects = self._convertObjects(fileContent, filePath);

                dyRt.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, self._objectsConverter.mtlFilePath)).subscribe((data:string) => {
                    resultJson.materials = self._convertMaterials(data.toString());
                }, (err) => {
                    Log.log(err)
                }, () => {
                    that.push(JSON.stringify(resultJson));

                    callback();
                });

            }
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(self.name, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            callback();
        });
    }

    private _convertMetadata(filePath:string){
        var result:any = {};

        result.formatVersion = this.version;
        result.description = "";
        result.sourceFile = filePath;
        result.generatedBy = this.name;

        return result;
    }

    private _convertScene(fileContent:string, filePath:string){
        var result:any = {};

        /*!every material has one ambientColor, i don't know use which one, so just set it to be black*/
        result.ambientColor = [0.0, 0.0, 0.0];

        return result;
    }

    private _convertObjects(fileContent:string, filePath:string){
        return this._objectsConverter.convert(fileContent, filePath);
    }

    private _convertMaterials(mtlFileContent:string){
        return this._materialsConverter.convert(mtlFileContent);
    }
}

