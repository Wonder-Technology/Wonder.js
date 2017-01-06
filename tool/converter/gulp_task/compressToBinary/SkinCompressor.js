"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JudgeUtils = require("../../../ts/JudgeUtils");
var Compressor = require("./Compressor");
module.exports = (function (_super) {
    __extends(SkinCompressor, _super);
    function SkinCompressor() {
        return _super.apply(this, arguments) || this;
    }
    SkinCompressor.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(SkinCompressor.prototype, "dataByteSize", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    SkinCompressor.prototype.recordData = function (sourceJson) {
        var recordedArr = [];
        for (var id in sourceJson.skins) {
            if (sourceJson.skins.hasOwnProperty(id)) {
                var skin = sourceJson.skins[id];
                if (!!skin.inverseBindMatrices) {
                    this._record(skin.inverseBindMatrices, recordedArr, id, "MAT4");
                }
            }
        }
        this.recordedArr = recordedArr;
    };
    SkinCompressor.prototype.buildBuffersArr = function (bufferWriter) {
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
    SkinCompressor.prototype.buildBufferViewsJson = function (json, bufferId, bufferViewId, length, offset) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset);
    };
    SkinCompressor.prototype._record = function (data, arr, id, type) {
        arr.push({
            data: data,
            where: this._buildSkinWhere(id),
            componentType: 5126,
            type: type
        });
    };
    SkinCompressor.prototype._buildSkinWhere = function (id) {
        return "skins%%" + id + "%%inverseBindMatrices";
    };
    return SkinCompressor;
}(Compressor.Compressor));
