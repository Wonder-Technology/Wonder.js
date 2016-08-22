"use strict";
var fs = require("fs-extra");
var path = require("path");
var wdFrp = require("wdfrp");
var OBJToWD = require("./obj/OBJToWD");
var MD2ToWD = require("./md2/MD2ToWD");
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
        this.version = fs.readJsonSync(path.join(__dirname, "../../package.json")).version;
    };
    Converter.prototype.convert = function (fileBuffer, filePath) {
        var fileExtname = path.extname(filePath), result = null;
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
    };
    Converter.prototype.write = function (fileContentStream, sourceDir, destDir, filePath) {
        var self = this;
        return fileContentStream.flatMap(function (_a) {
            var fileJson = _a[0], resourceUrlArr = _a[1];
            var resultFilePath = self._getDestFilePath(sourceDir, destDir, filePath.replace(/\.\w+$/, self.extname));
            if (resourceUrlArr && resourceUrlArr.length > 0) {
                return wdFrp.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson)
                    .merge(self._createCopyResourceStream(resourceUrlArr, sourceDir, destDir));
            }
            return wdFrp.fromNodeCallback(fs.outputJson)(resultFilePath, fileJson);
        });
    };
    Converter.prototype._createCopyResourceStream = function (resourceUrlArr, sourceDir, destDir) {
        var _this = this;
        return wdFrp.fromArray(resourceUrlArr)
            .flatMap(function (resourceUrl) {
            return wdFrp.fromNodeCallback(fs.copy)(resourceUrl, _this._getDestFilePath(sourceDir, destDir, resourceUrl));
        });
    };
    Converter.prototype._getDestFilePath = function (sourceDir, destDir, sourceFilePath) {
        return path.join(destDir, path.relative(sourceDir, sourceFilePath));
    };
    return Converter;
}());
