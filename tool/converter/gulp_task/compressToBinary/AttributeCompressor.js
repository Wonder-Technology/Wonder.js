"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Utils_1 = require("./Utils");
var JudgeUtils = require("../../../ts/JudgeUtils");
var Compressor = require("./Compressor");
module.exports = (function (_super) {
    __extends(AttributeCompressor, _super);
    function AttributeCompressor() {
        return _super.apply(this, arguments) || this;
    }
    AttributeCompressor.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(AttributeCompressor.prototype, "dataByteSize", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    AttributeCompressor.prototype.recordData = function (sourceJson) {
        var recordedAttributeArr = [];
        for (var id in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(id)) {
                var mesh = sourceJson.meshes[id];
                for (var i = 0, len = mesh.primitives.length; i < len; i++) {
                    var primitiveData = mesh.primitives[i], _a = primitiveData.attributes, POSITION = _a.POSITION, NORMAL = _a.NORMAL, TEXCOORD = _a.TEXCOORD, COLOR = _a.COLOR, JOINT = _a.JOINT, WEIGHT = _a.WEIGHT;
                    if (Utils_1.Utils.hasData(POSITION)) {
                        this._recordAttribute(POSITION, recordedAttributeArr, id, i, "POSITION", "VEC3");
                    }
                    if (Utils_1.Utils.hasData(NORMAL)) {
                        this._recordAttribute(NORMAL, recordedAttributeArr, id, i, "NORMAL", "VEC3");
                    }
                    if (Utils_1.Utils.hasData(TEXCOORD)) {
                        this._recordAttribute(TEXCOORD, recordedAttributeArr, id, i, "TEXCOORD", "VEC2");
                    }
                    if (Utils_1.Utils.hasData(COLOR)) {
                        this._recordAttribute(COLOR, recordedAttributeArr, id, i, "COLOR", "VEC3");
                    }
                    if (Utils_1.Utils.hasData(JOINT)) {
                        this._recordAttribute(JOINT, recordedAttributeArr, id, i, "JOINT", "VEC4");
                    }
                    if (Utils_1.Utils.hasData(WEIGHT)) {
                        this._recordAttribute(WEIGHT, recordedAttributeArr, id, i, "WEIGHT", "VEC4");
                    }
                }
            }
        }
        this.recordedArr = recordedAttributeArr;
    };
    AttributeCompressor.prototype.buildBuffersArr = function (bufferWriter) {
        this.recordedArr
            .filter(function (item) {
            return JudgeUtils.isArrayExactly(item.data);
        })
            .forEach(function (item) {
            for (var _i = 0, _a = item.data; _i < _a.length; _i++) {
                var value = _a[_i];
                bufferWriter.writeFloat(value);
            }
        });
    };
    AttributeCompressor.prototype.buildBufferViewsJson = function (json, bufferId, bufferViewId, length, offset) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset, 34962);
    };
    AttributeCompressor.prototype._recordAttribute = function (data, arr, meshId, primitiveIndex, attributeName, type) {
        arr.push({
            data: data,
            where: this._buildAttributeWhere(meshId, primitiveIndex, attributeName),
            componentType: 5126,
            type: type
        });
    };
    AttributeCompressor.prototype._buildAttributeWhere = function (meshId, primitiveIndex, attributeName) {
        return "meshes%%" + meshId + "%%primitives%%" + String(primitiveIndex) + "%%attributes%%" + attributeName;
    };
    return AttributeCompressor;
}(Compressor.Compressor));
