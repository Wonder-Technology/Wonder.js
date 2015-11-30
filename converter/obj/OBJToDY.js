/// <reference path="../../node_modules/wdfrp/dist/wdFrp.node.d.ts"/>
var fs = require("fs");
var through = require("through2");
var gutil = require("gulp-util");
var wdFrp = require("wdfrp");
var MaterialsConverter = require("./MaterialsConverter");
var ObjectsConverter = require("./ObjectsConverter");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
module.exports = (function () {
    function OBJToDY(version) {
        this.name = "OBJToDY";
        this.version = null;
        //todo why "_objectsConverter:ObjectsConverter" can't find ObjectsConverter?
        //private _objectsConverter:ObjectsConverter = ObjectsConverter.create();
        this._objectsConverter = ObjectsConverter.create();
        this._materialsConverter = MaterialsConverter.create();
        this.version = version;
    }
    OBJToDY.create = function (version) {
        var obj = new this(version);
        return obj;
    };
    OBJToDY.prototype.convert = function () {
        var self = this;
        return through.obj(function (file, encoding, callback) {
            var fileContent = null, filePath = null, that = this, resultJson = {};
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
                wdFrp.fromNodeCallback(fs.readFile, self)(ModelLoaderUtils.getPath(self._objectsConverter.mtlFilePath, filePath)).subscribe(function (data) {
                    resultJson.materials = self._convertMaterials(data);
                }, function (err) {
                    console.log(err);
                }, function () {
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
    };
    OBJToDY.prototype._convertMetadata = function (filePath) {
        var result = {};
        result.formatVersion = this.version;
        result.description = "";
        result.sourceFile = filePath;
        result.generatedBy = this.name;
        return result;
    };
    OBJToDY.prototype._convertScene = function (fileContent, filePath) {
        var result = {};
        /*!every material has one ambientColor, i don't know use which one, so just set it to be black*/
        result.ambientColor = [0.0, 0.0, 0.0];
        return result;
    };
    OBJToDY.prototype._convertObjects = function (fileContent, filePath) {
        return this._objectsConverter.convert(fileContent, filePath);
    };
    OBJToDY.prototype._convertMaterials = function (mtlFileContent) {
        return this._materialsConverter.convert(mtlFileContent);
    };
    return OBJToDY;
})();
