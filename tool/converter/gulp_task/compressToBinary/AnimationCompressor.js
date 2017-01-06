"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var JudgeUtils = require("../../../ts/JudgeUtils");
var Compressor = require("./Compressor");
module.exports = (function (_super) {
    __extends(AnimationCompressor, _super);
    function AnimationCompressor() {
        return _super.apply(this, arguments) || this;
    }
    AnimationCompressor.create = function () {
        var obj = new this();
        return obj;
    };
    Object.defineProperty(AnimationCompressor.prototype, "dataByteSize", {
        get: function () {
            return 4;
        },
        enumerable: true,
        configurable: true
    });
    AnimationCompressor.prototype.recordData = function (sourceJson) {
        var recoredAnimationArr = [];
        for (var id in sourceJson.animations) {
            if (sourceJson.animations.hasOwnProperty(id)) {
                var animation = sourceJson.animations[id];
                for (var name_1 in animation.parameters) {
                    if (animation.parameters.hasOwnProperty(name_1)) {
                        var data = animation.parameters[name_1], type = null;
                        if (name_1.indexOf("TIME") > -1) {
                            type = "SCALAR";
                        }
                        else if (name_1.indexOf("rotation") > -1) {
                            type = "VEC4";
                        }
                        else if (name_1.indexOf("translation") > -1 || name_1.indexOf("scale") > -1) {
                            type = "VEC3";
                        }
                        this._recordAnimation(data, recoredAnimationArr, id, name_1, type);
                    }
                }
            }
        }
        this.recordedArr = recoredAnimationArr;
    };
    AnimationCompressor.prototype.buildBuffersArr = function (bufferWriter) {
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
    AnimationCompressor.prototype.buildBufferViewsJson = function (json, bufferId, bufferViewId, length, offset) {
        this.buildBufferViewsJsonHelper(json, bufferId, bufferViewId, length, offset);
    };
    AnimationCompressor.prototype.buildAccessorData = function (json, mappingTable, id) {
        if (!this.isArrayEmpty(this.recordedArr)) {
            return this.buildAccessorDataHelper(json, mappingTable, id, "anim");
        }
        return 0;
    };
    AnimationCompressor.prototype._recordAnimationData = function (sourceJson) {
        var recoredAnimationArr = [];
        for (var id in sourceJson.animations) {
            if (sourceJson.animations.hasOwnProperty(id)) {
                var animation = sourceJson.animations[id];
                for (var name_2 in animation.parameters) {
                    if (animation.parameters.hasOwnProperty(name_2)) {
                        var data = animation.parameters[name_2], type = null;
                        if (name_2.indexOf("TIME") > -1) {
                            type = "SCALAR";
                        }
                        else if (name_2.indexOf("rotation") > -1) {
                            type = "VEC4";
                        }
                        else if (name_2.indexOf("translation") > -1 || name_2.indexOf("scale") > -1) {
                            type = "VEC3";
                        }
                        this._recordAnimation(data, recoredAnimationArr, id, name_2, type);
                    }
                }
            }
        }
        return recoredAnimationArr;
    };
    AnimationCompressor.prototype._recordAnimation = function (data, arr, id, name, type) {
        arr.push({
            data: data,
            where: this._buildAnimationWhere(id, name),
            componentType: 5126,
            type: type
        });
    };
    AnimationCompressor.prototype._buildAnimationWhere = function (id, name) {
        return "animations%%" + id + "%%parameters%%" + name;
    };
    return AnimationCompressor;
}(Compressor.Compressor));
