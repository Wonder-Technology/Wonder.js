"use strict";
var Log = require("../../ts/Log");
var wdCb = require("wdcb");
var ModelLoaderUtils = require("../common/ModelLoaderUtils");
var MaterialsConverter = (function () {
    function MaterialsConverter() {
        this.materials = wdCb.Collection.create();
        this._json = null;
    }
    MaterialsConverter.create = function () {
        var obj = new this();
        return obj;
    };
    MaterialsConverter.prototype.convert = function (json, fileContent) {
        var _this = this;
        var lines = fileContent.split('\n');
        this._convertToMaterials(lines);
        this._json = json;
        this._json.textures = {};
        this._json.samplers = {};
        this._json.images = {};
        var materials = {};
        this.materials.forEach(function (material) {
            _this._buildMaterialData(materials, material);
        });
        return materials;
    };
    MaterialsConverter.prototype._buildMaterialData = function (materials, material) {
        var materialData = {}, valueData = {};
        materialData.technique = "PHONG";
        if (material.opacity !== null || material.opacity !== void 0) {
            if (material.opacity < 1) {
                materialData.transparent = true;
            }
            else {
                materialData.transparent = false;
            }
            materialData.transparency = material.opacity;
        }
        if (!!material.diffuseMapUrl) {
            this._addTextureData(valueData, "diffuse", material.diffuseMapUrl);
        }
        else {
            this._addData(valueData, "diffuse", material.diffuseColor);
        }
        if (!!material.specularMapUrl) {
            this._addTextureData(valueData, "specular", material.specularMapUrl);
        }
        else {
            this._addData(valueData, "specular", material.specularColor);
        }
        if (!!material.emissionMapUrl) {
            this._addTextureData(valueData, "emission", material.emissionMapUrl);
        }
        else {
            this._addData(valueData, "emission", material.emissionColor);
        }
        if (!!material.bumpMapUrl) {
            this._addTextureData(valueData, "normalMap", material.bumpMapUrl);
        }
        this._addData(valueData, "shininess", material.shininess);
        materialData.values = valueData;
        materials[material.name] = materialData;
    };
    MaterialsConverter.prototype._addData = function (valueData, key, data) {
        if (!!data) {
            valueData[key] = data;
        }
    };
    MaterialsConverter.prototype._addTextureData = function (valueData, key, mapUrl) {
        var id = ModelLoaderUtils.getNameByPath(mapUrl), textureName = "texture_" + id, samplerName = "sampler_" + id, imageName = "image_" + id;
        valueData[key] = textureName;
        this._json.textures[textureName] = {
            sampler: samplerName,
            source: imageName,
            format: 6408,
            internalFormat: 6408,
            target: 3553,
            type: 5121
        };
        this._json.samplers[samplerName] = {
            minFilter: 9986,
            magFilter: 9729,
            wrapS: 10497,
            wrapT: 10497
        };
        this._json.images[imageName] = {
            name: imageName,
            uri: mapUrl
        };
    };
    MaterialsConverter.prototype._convertToMaterials = function (lines) {
        var _this = this;
        var DELIMITER_PATTERN = /\s+/;
        var self = this;
        lines.forEach(function (line, i) {
            var pos = null, key = null, value = null;
            line = line.trim();
            pos = line.indexOf(" ");
            key = self._parseKey(line, pos);
            value = self._parseValue(line, pos);
            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            }
            if (key === "newmtl") {
                _this._currentMaterial = MaterialModel.create();
                _this._currentMaterial.name = value;
                _this.materials.addChild(_this._currentMaterial);
            }
            else if (key === "kd") {
                _this._setColor("diffuseColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ka") {
            }
            else if (key === "ks") {
                _this._setColor("specularColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ke") {
                _this._setColor("emissionColor", value.split(DELIMITER_PATTERN, 3));
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
                _this._currentMaterial.diffuseMapUrl = value;
            }
            else if (key === "map_ks") {
                _this._currentMaterial.specularMapUrl = value;
            }
            else if (key === "map_ke") {
                _this._currentMaterial.emissionMapUrl = value;
            }
            else if (key === "map_bump") {
                _this._currentMaterial.bumpMapUrl = value;
            }
            else if (key === "map_d") {
            }
            else if (key === "illum") {
            }
            else {
                Log.log("Unhandled expression at line : " + i + "\nvalue:" + line);
            }
        });
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
        this._currentMaterial[colorType] = colorStrArr;
    };
    return MaterialsConverter;
}());
exports.MaterialsConverter = MaterialsConverter;
var MaterialModel = (function () {
    function MaterialModel() {
        this.name = null;
        this.diffuseColor = null;
        this.specularColor = null;
        this.emissionColor = null;
        this.opacity = null;
        this.shininess = null;
        this.diffuseMapUrl = null;
        this.specularMapUrl = null;
        this.emissionMapUrl = null;
        this.bumpMapUrl = null;
    }
    MaterialModel.create = function () {
        var obj = new this();
        return obj;
    };
    return MaterialModel;
}());
