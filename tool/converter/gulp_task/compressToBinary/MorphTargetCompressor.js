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
    __extends(MorphTargetCompressor, _super);
    function MorphTargetCompressor() {
        return _super.apply(this, arguments) || this;
    }
    MorphTargetCompressor.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(MorphTargetCompressor.prototype, "dataByteSize", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    MorphTargetCompressor.prototype.recordData = function (sourceJson) {
        var recordedMorphTargetArr = [];
        for (var id in sourceJson.meshes) {
            if (sourceJson.meshes.hasOwnProperty(id)) {
                var mesh = sourceJson.meshes[id];
                for (var i = 0, len = mesh.primitives.length; i < len; i++) {
                    var primitiveData = mesh.primitives[i], morphTargets = primitiveData.morphTargets;
                    if (Utils_1.Utils.hasData(morphTargets)) {
                        this._recordMorphTargets(morphTargets, recordedMorphTargetArr, id, i);
                    }
                }
            }
        }
        this.recordedArr = recordedMorphTargetArr;
    };
    MorphTargetCompressor.prototype.buildBuffersArr = function (bufferWriter) {
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
    MorphTargetCompressor.prototype.buildBufferViewsJson = function (json, bufferId, bufferViewId, length, offset) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset, 34962);
    };
    MorphTargetCompressor.prototype._recordMorphTargets = function (morphTargets, arr, meshId, primitiveIndex) {
        for (var i = 0, len = morphTargets.length; i < len; i++) {
            var frame = morphTargets[i];
            arr.push({
                data: frame.vertices,
                where: this._buildMorphTargetsWhere(meshId, primitiveIndex, i, "vertices"),
                componentType: 5126,
                type: "VEC3"
            });
            if (!!frame.normals) {
                arr.push({
                    data: frame.normals,
                    where: this._buildMorphTargetsWhere(meshId, primitiveIndex, i, "normals"),
                    componentType: 5126,
                    type: "VEC3"
                });
            }
        }
    };
    MorphTargetCompressor.prototype._buildMorphTargetsWhere = function (meshId, primitiveIndex, index, type) {
        return "meshes%%" + meshId + "%%primitives%%" + String(primitiveIndex) + "%%morphTargets%%" + index + "%%" + type;
    };
    return MorphTargetCompressor;
}(Compressor.Compressor));
