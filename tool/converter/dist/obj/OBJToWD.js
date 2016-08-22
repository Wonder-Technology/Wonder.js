"use strict";
var fs = require("fs");
var path = require("path");
var wdFrp = require("wdfrp");
var wdCb = require("wdcb");
var MaterialsConverter = require("./MaterialsConverter");
var ObjectsConverter = require("./ObjectsConverter");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
module.exports = (function () {
    function OBJToWD(version) {
        this.name = "OBJToWD";
        this.version = null;
        this._objectsConverter = ObjectsConverter.create();
        this._materialsConverter = MaterialsConverter.create();
        this.version = version;
    }
    OBJToWD.create = function (version) {
        var obj = null;
        obj = new this(version);
        return obj;
    };
    OBJToWD.prototype.convert = function (fileContent, filePath) {
        var self = this, resultJson = {};
        resultJson.metadata = self._convertMetadata(filePath);
        resultJson.scene = self._convertScene(fileContent, filePath);
        resultJson.objects = self._convertObjects(fileContent, filePath);
        return wdFrp.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, self._objectsConverter.mtlFilePath))
            .map(function (data) {
            resultJson.materials = self._convertMaterials(data.toString());
            return [resultJson, self._getResourceUrlArr(resultJson.materials, filePath)];
        });
    };
    OBJToWD.prototype._getResourceUrlArr = function (materials, filePath) {
        var urlArr = [];
        for (var name_1 in materials) {
            if (materials.hasOwnProperty(name_1)) {
                var material = materials[name_1];
                if (material.diffuseMapUrl) {
                    urlArr.push(this._getAbsoluteResourceUrl(filePath, material.diffuseMapUrl));
                }
                if (material.specularMapUrl) {
                    urlArr.push(this._getAbsoluteResourceUrl(filePath, material.specularMapUrl));
                }
                if (material.normalMapUrl) {
                    urlArr.push(this._getAbsoluteResourceUrl(filePath, material.normalMapUrl));
                }
            }
        }
        return wdCb.ArrayUtils.removeRepeatItems(urlArr);
    };
    OBJToWD.prototype._getAbsoluteResourceUrl = function (filePath, resourceRelativeUrl) {
        return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    };
    OBJToWD.prototype._convertMetadata = function (filePath) {
        var result = {};
        result.formatVersion = this.version;
        result.description = "";
        result.sourceFile = filePath;
        result.generatedBy = this.name;
        return result;
    };
    OBJToWD.prototype._convertScene = function (fileContent, filePath) {
        var result = {};
        result.ambientColor = [0.0, 0.0, 0.0];
        return result;
    };
    OBJToWD.prototype._convertObjects = function (fileContent, filePath) {
        return this._objectsConverter.convert(fileContent, filePath);
    };
    OBJToWD.prototype._convertMaterials = function (mtlFileContent) {
        return this._materialsConverter.convert(mtlFileContent);
    };
    return OBJToWD;
})();
