/// <reference path="../../../node_modules/wdcb/dist/wdCb.node.d.ts"/>
var wdCb = require("wdcb");
var MaterialModel = (function () {
    function MaterialModel() {
        this.name = null;
        this.diffuseColor = null;
        this.specularColor = null;
        this.opacity = null;
        this.shininess = null;
        this.diffuseMapUrl = null;
        //public diffuseMap:Texture = null;
        this.specularMapUrl = null;
        //public specularMap:Texture = null;
        this.bumpMapUrl = null;
    }
    MaterialModel.create = function () {
        var obj = new this();
        return obj;
    };
    return MaterialModel;
})();
module.exports = (function () {
    function MaterialsConverter() {
        this.materials = wdCb.Collection.create();
    }
    MaterialsConverter.create = function () {
        var obj = new this();
        return obj;
    };
    MaterialsConverter.prototype.convert = function (fileContent) {
        var _this = this;
        var DELIMITER_PATTERN = /\s+/;
        var lines = fileContent.split('\n'), result = {}, self = this;
        lines.forEach(function (line, i) {
            var pos = null, key = null, value = null;
            line = line.trim();
            pos = line.indexOf(" ");
            key = self._parseKey(line, pos);
            value = self._parseValue(line, pos);
            // Blank line or comment
            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            }
            //This mtl keyword will create the new material
            if (key === "newmtl") {
                _this._currentMaterial = MaterialModel.create();
                _this._currentMaterial.name = value;
                _this.materials.addChild(_this._currentMaterial);
            }
            else if (key === "kd") {
                // Diffuse color (color under white light) using RGB values
                _this._setColor("diffuseColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ka") {
            }
            else if (key === "ks") {
                // Specular color (color when light is reflected from shiny surface) using RGB values
                _this._setColor("specularColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ns") {
                _this._currentMaterial.shininess = parseFloat(value);
            }
            else if (key === "d") {
                _this._currentMaterial.opacity = parseFloat(value);
            }
            else if (key === "map_ka") {
            }
            else if (key === "map_kd") {
                // Diffuse map
                _this._currentMaterial.diffuseMapUrl = value;
            }
            else if (key === "map_ks") {
                // Specular map
                _this._currentMaterial.specularMapUrl = value;
            }
            else if (key === "map_bump") {
                // Bump map
                _this._currentMaterial.bumpMapUrl = value;
            }
            else if (key === "map_d") {
            }
            else if (key === "illum") {
            }
            else {
                wdCb.Log.log("Unhandled expression at line : " + i + "\nvalue:" + line);
            }
        });
        this.materials.forEach(function (material) {
            var materialData = {};
            materialData.type = "LightMaterial";
            materialData.diffuseColor = material.diffuseColor;
            materialData.specularColor = material.specularColor;
            materialData.diffuseMapUrl = material.diffuseMapUrl;
            materialData.specularMapUrl = material.specularMapUrl;
            materialData.normalMapUrl = material.bumpMapUrl;
            materialData.shininess = material.shininess;
            materialData.opacity = material.opacity;
            result[material.name] = materialData;
        });
        return result;
    };
    MaterialsConverter.prototype._parseKey = function (line, pos) {
        var key = (pos >= 0) ? line.substring(0, pos) : line;
        return key.toLowerCase();
    };
    MaterialsConverter.prototype._parseValue = function (line, pos) {
        var value = (pos >= 0) ? line.substring(pos + 1) : "";
        return value.trim();
    };
    MaterialsConverter.prototype._setColor = function (colorType, colorStrArr) {
        //var color = Color.create(`rgb(${colorStrArr[0]},${colorStrArr[1]},${colorStrArr[2]}`);
        //color.r = parseFloat(colorStrArr[0]);
        //color.g = parseFloat(colorStrArr[1]);
        //color.b = parseFloat(colorStrArr[2]);
        //color.a = 1.0;
        this._currentMaterial[colorType] = colorStrArr;
    };
    return MaterialsConverter;
})();
