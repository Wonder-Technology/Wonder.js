"use strict";
var wdFrp = require("wdfrp");
var ObjectsConverter = require("./MD2ObjectsConverter");
module.exports = (function () {
    function MD2ToWD(version) {
        this.name = "MD2ToWD";
        this.version = null;
        this._objectsConverter = ObjectsConverter.create();
        this.version = version;
    }
    MD2ToWD.create = function (version) {
        var obj = null;
        obj = new this(version);
        return obj;
    };
    MD2ToWD.prototype.convert = function (fileBuffer, filePath) {
        var self = this, resultJson = {};
        resultJson.metadata = self._convertMetadata(filePath);
        resultJson.scene = {};
        resultJson.objects = self._convertObjects(fileBuffer, filePath);
        resultJson.materials = {};
        return wdFrp.just([resultJson]);
    };
    MD2ToWD.prototype._convertMetadata = function (filePath) {
        var result = {};
        result.formatVersion = this.version;
        result.description = "";
        result.sourceFile = filePath;
        result.generatedBy = this.name;
        return result;
    };
    MD2ToWD.prototype._convertObjects = function (fileBuffer, filePath) {
        return this._objectsConverter.convert(fileBuffer, filePath);
    };
    return MD2ToWD;
})();
