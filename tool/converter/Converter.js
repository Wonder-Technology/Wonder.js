"use strict";
var fs = require("fs-extra");
var path = require("path");
var wdFrp = require("wdfrp");
var wdCb = require("wdcb");
var JudgeUtils = require("../ts/JudgeUtils");
var PathUtils = require("./common/PathUtils");
var OBJToWD_1 = require("./obj/OBJToWD");
var MD2ToWD_1 = require("./md2/MD2ToWD");
var GLTFToWD_1 = require("./gltf/GLTFToWD");
var FBXToWD_1 = require("./fbx/FBXToWD");
module.exports = (function () {
    function Converter() {
        this.version = null;
        this.extname = ".wd";
    }
    Converter.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Converter.prototype.initWhenCreate = function () {
        this.version = fs.readJsonSync(path.join(__dirname, "../../../../package.json")).version;
    };
    Converter.prototype.convert = function (fileBuffer, filePath, sourceDir, destDir) {
        var fileExtname = path.extname(filePath), result = null;
        switch (fileExtname.toLowerCase()) {
            case ".obj":
                result = OBJToWD_1.OBJToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".md2":
                result = MD2ToWD_1.MD2ToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".gltf":
                result = GLTFToWD_1.GLTFToWD.create(this.version).convert(fileBuffer, filePath);
                break;
            case ".fbx":
                result = FBXToWD_1.FBXToWD.create().convert(filePath, destDir);
                break;
            default:
                result = wdFrp.empty();
                break;
        }
        return result;
    };
    Converter.prototype.write = function (fileContentStream, sourceDir, destDir, filePath) {
        var self = this, resultRelativeFilePath = null;
        return fileContentStream.concatMap(function (data) {
            if (!data || data.length === 0 || !data[0]) {
                return wdFrp.empty();
            }
            var fileJson = data[0], resourceUrlArr = self._getResourceUrlArr(fileJson, filePath);
            resultRelativeFilePath = self._getRelativeDestFilePath(sourceDir, destDir, filePath.replace(/\.\w+$/, self.extname));
            if (resourceUrlArr && resourceUrlArr.length > 0) {
                return self._createCopyResourceStream(resourceUrlArr, sourceDir, destDir)
                    .ignoreElements()
                    .concat(wdFrp.fromNodeCallback(fs.outputJson)(resultRelativeFilePath, fileJson));
            }
            else {
                return wdFrp.fromNodeCallback(fs.outputJson)(resultRelativeFilePath, fileJson);
            }
        })
            .map(function () {
            return resultRelativeFilePath;
        });
    };
    Converter.prototype._getResourceUrlArr = function (resultJson, filePath) {
        var urlArr = [];
        this._addBinsUrl(resultJson, urlArr, filePath);
        this._addImagesUrl(resultJson, urlArr, filePath);
        return wdCb.ArrayUtils.removeRepeatItems(urlArr);
    };
    Converter.prototype._addBinsUrl = function (resultJson, urlArr, filePath) {
        this._addFileUrl(resultJson, "buffers", urlArr, filePath);
    };
    Converter.prototype._addImagesUrl = function (resultJson, urlArr, filePath) {
        this._addFileUrl(resultJson, "images", urlArr, filePath);
    };
    Converter.prototype._addFileUrl = function (resultJson, type, urlArr, filePath) {
        if (!resultJson[type]) {
            return;
        }
        for (var name_1 in resultJson[type]) {
            if (resultJson[type].hasOwnProperty(name_1)) {
                var file = resultJson[type][name_1];
                if (JudgeUtils.isString(file.uri) && file.uri.match(/\.\w+$/) !== null) {
                    urlArr.push(PathUtils.getAbsoluteResourceUrl(filePath, file.uri));
                }
            }
        }
    };
    Converter.prototype._createCopyResourceStream = function (resourceUrlArr, sourceDir, destDir) {
        var _this = this;
        return wdFrp.fromArray(resourceUrlArr)
            .flatMap(function (resourceUrl) {
            var targetResourceUrl = _this._getRelativeDestFilePath(sourceDir, destDir, resourceUrl), relativeUrl = path.relative(resourceUrl, targetResourceUrl);
            if (!fs.existsSync(resourceUrl)
                || relativeUrl === "" || relativeUrl === "./") {
                return wdFrp.empty();
            }
            return wdFrp.fromNodeCallback(fs.copy)(resourceUrl, targetResourceUrl);
        });
    };
    Converter.prototype._getRelativeDestFilePath = function (sourceDir, destDir, sourceFilePath) {
        return path.join(destDir, path.relative(sourceDir, sourceFilePath));
    };
    return Converter;
}());
