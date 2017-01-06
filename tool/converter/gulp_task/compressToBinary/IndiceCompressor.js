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
    __extends(IndiceCompressor, _super);
    function IndiceCompressor() {
        return _super.apply(this, arguments) || this;
    }
    IndiceCompressor.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(IndiceCompressor.prototype, "dataByteSize", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    IndiceCompressor.prototype.recordData = function (sourceJson) {
        var recordedIndiceArr = [];
        for (var id in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(id)) {
                var mesh = sourceJson.meshes[id];
                for (var i = 0, len = mesh.primitives.length; i < len; i++) {
                    var primitiveData = mesh.primitives[i];
                    if (Utils_1.Utils.hasData(primitiveData.indices)) {
                        this._recordIndice(primitiveData.indices, recordedIndiceArr, id, i, "SCALAR");
                    }
                }
            }
        }
        this.recordedArr = recordedIndiceArr;
    };
    IndiceCompressor.prototype.buildBuffersArr = function (bufferWriter) {
        this.recordedArr
            .filter(function (item) {
            return JudgeUtils.isArrayExactly(item.data);
        })
            .forEach(function (item) {
            for (var _i = 0, _a = item.data; _i < _a.length; _i++) {
                var value = _a[_i];
                bufferWriter.writeUInt16(value);
            }
        });
    };
    IndiceCompressor.prototype.buildBufferViewsJson = function (json, bufferId, bufferViewId, length, offset) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset, 34963);
    };
    IndiceCompressor.prototype._recordIndice = function (data, arr, meshId, primitiveIndex, type) {
        arr.push({
            data: data,
            where: this._buildIndiceWhere(meshId, primitiveIndex),
            componentType: 5123,
            type: type
        });
    };
    IndiceCompressor.prototype._buildIndiceWhere = function (meshId, primitiveIndex) {
        return "meshes%%" + meshId + "%%primitives%%" + String(primitiveIndex) + "%%indices";
    };
    return IndiceCompressor;
}(Compressor.Compressor));
