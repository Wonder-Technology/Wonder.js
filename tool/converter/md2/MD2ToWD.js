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
        //return wdFrp.fromNodeCallback(fs.readFile)(ModelLoaderUtils.getPath(filePath, self._objectsConverter.mtlFilePath))
        //    .map((data:string) => {
        //        resultJson.materials = self._convertMaterials(data.toString());
        //
        //        return [resultJson, self._getResourceUrlArr(resultJson.materials, filePath)];
        //    });
        this._duplicateVertexWithDifferentUv(resultJson.objects);
        return wdFrp.just([resultJson]);
    };
    //private _getResourceUrlArr(materials, filePath) {
    //    var urlArr = [];
    //
    //    for (let name in materials) {
    //        if (materials.hasOwnProperty(name)) {
    //            let material = materials[name];
    //
    //            if (material.diffuseMapUrl) {
    //                urlArr.push(this._getAbsoluteResourceUrl(filePath, material.diffuseMapUrl));
    //            }
    //            if (material.specularMapUrl) {
    //                urlArr.push(this._getAbsoluteResourceUrl(filePath, material.specularMapUrl));
    //            }
    //            if (material.normalMapUrl) {
    //                urlArr.push(this._getAbsoluteResourceUrl(filePath, material.normalMapUrl));
    //            }
    //        }
    //    }
    //
    //    return wdCb.ArrayUtils.removeRepeatItems(urlArr);
    //}
    //
    //private _getAbsoluteResourceUrl(filePath, resourceRelativeUrl) {
    //    return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    //}
    //
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
    MD2ToWD.prototype._duplicateVertexWithDifferentUv = function (objects) {
        for (var _i = 0; _i < objects.length; _i++) {
            var object = objects[_i];
            //for(let verticeIndex of object.verticeIndices){
            //
            //}
            var arr = [], uvIndices = object.uvIndices;
            if (!this._hasData(uvIndices)) {
                continue;
            }
            for (var i = 0, len = object.verticeIndices.length; i < len; i++) {
                var verticeIndex = object.verticeIndices[i];
            }
        }
    };
    MD2ToWD.prototype._hasData = function (data) {
        return data && data.length > 0;
    };
    return MD2ToWD;
})();
