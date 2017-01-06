"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var path = require("path");
var ExtendUtils = require("../../../ts/ExtendUtils");
var Utils_1 = require("./Utils");
var BufferWriter = require("../../common/BufferWriter");
var AnimationCompressor = require("./AnimationCompressor");
var AttributeCompressor = require("./AttributeCompressor");
var MorphTargetCompressor = require("./MorphTargetCompressor");
var SkinCompressor = require("./SkinCompressor");
var IndiceCompressor = require("./IndiceCompressor");
var contract_1 = require("../../../ts/definition/typescript/decorator/contract");
var chai_1 = require("chai");
var CompressorManager = (function () {
    function CompressorManager() {
        this._animationCompressor = AnimationCompressor.create();
        this._attributeCompressor = AttributeCompressor.create();
        this._morphTargetCompressor = MorphTargetCompressor.create();
        this._skinCompressor = SkinCompressor.create();
        this._indiceCompressor = IndiceCompressor.create();
    }
    CompressorManager.create = function () {
        var obj = new this();
        return obj;
    };
    CompressorManager.prototype.compress = function (fileName, binFileRelatedDir, sourceJson) {
        var targetJson = ExtendUtils.extendDeep(sourceJson);
        this._execAll("recordData", sourceJson);
        this._execAll("removeRepeatData");
        var buffersData = this._buildBuffersArr(fileName, binFileRelatedDir);
        var bufferViewsJson = this._buildBufferViewsJson(buffersData.id);
        var accessorsData = this._buildAccessorsJson();
        this._buildJson(targetJson, buffersData.json, bufferViewsJson, accessorsData);
        return {
            buffer: this._toBuffer(buffersData.arraybuffer),
            uri: buffersData.uri,
            json: targetJson
        };
    };
    CompressorManager.prototype._execAll = function (func) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var _a = 0, _b = this._getAllCompressors(); _a < _b.length; _a++) {
            var compressor = _b[_a];
            compressor[func].apply(compressor, args);
        }
    };
    CompressorManager.prototype._getAllCompressors = function () {
        return [
            this._animationCompressor,
            this._skinCompressor,
            this._indiceCompressor,
            this._attributeCompressor,
            this._morphTargetCompressor
        ];
    };
    CompressorManager.prototype._buildBufferViewsJson = function (bufferId) {
        var json = {}, length = null, id = 0, offset = 0;
        this._getAllCompressors().forEach(function (compressor) {
            length = compressor.getBufferByteLength();
            if (length > 0) {
                compressor.buildBufferViewsJson(json, bufferId, id, length, offset);
                id++;
                offset += length;
            }
        });
        return json;
    };
    CompressorManager.prototype._buildBuffersArr = function (fileName, binFileRelatedDir) {
        var json = {}, uri = null, byteLength = this._getAllCompressors()
            .map(function (compressor) {
            return compressor.getBufferByteLength();
        })
            .reduce(function (previous, current) {
            return previous + current;
        }), bufferWriter = BufferWriter.create(byteLength);
        this._execAll("buildBuffersArr", bufferWriter);
        uri = path.join(binFileRelatedDir, fileName + ".bin");
        json[fileName] = {
            byteLength: byteLength,
            type: "arraybuffer",
            uri: uri
        };
        return {
            id: fileName,
            uri: uri,
            arraybuffer: bufferWriter.arraybuffer,
            json: json
        };
    };
    CompressorManager.prototype._buildAccessorsJson = function () {
        var json = {}, mappingTable = {}, id = 0, accessorCount = null;
        this._animationCompressor.buildAccessorData(json, mappingTable, id);
        accessorCount = this._skinCompressor.buildAccessorData(json, mappingTable, id);
        id += accessorCount;
        accessorCount = this._indiceCompressor.buildAccessorData(json, mappingTable, id);
        id += accessorCount;
        accessorCount = this._attributeCompressor.buildAccessorData(json, mappingTable, id);
        id += accessorCount;
        accessorCount = this._morphTargetCompressor.buildAccessorData(json, mappingTable, id);
        return {
            json: json,
            mappingTable: mappingTable
        };
    };
    CompressorManager.prototype._buildJson = function (targetJson, buffersJson, bufferViewsJson, _a) {
        var json = _a.json, mappingTable = _a.mappingTable;
        targetJson.buffers = buffersJson;
        targetJson.bufferViews = bufferViewsJson;
        targetJson.accessors = json;
        for (var where in mappingTable) {
            if (mappingTable.hasOwnProperty(where)) {
                var accessorId = mappingTable[where], whereDataArr = this._parseWhere(where), data = targetJson, i = 0;
                for (var len = whereDataArr.length - 1; i < len; i++) {
                    data = data[whereDataArr[i]];
                }
                data[whereDataArr[i]] = accessorId;
            }
        }
        this._removeEmptyPrimitiveData(targetJson);
    };
    CompressorManager.prototype._removeEmptyPrimitiveData = function (targetJson) {
        for (var id in targetJson.meshes) {
            if (targetJson.meshes.hasOwnProperty(id)) {
                var mesh = targetJson.meshes[id];
                for (var _i = 0, _a = mesh.primitives; _i < _a.length; _i++) {
                    var primitiveData = _a[_i];
                    if (Utils_1.Utils.isArrayEmpty(primitiveData.indices)) {
                        delete primitiveData.indices;
                    }
                    for (var key in primitiveData.attributes) {
                        if (primitiveData.attributes.hasOwnProperty(key)) {
                            if (Utils_1.Utils.isArrayEmpty(primitiveData.attributes[key])) {
                                delete primitiveData.attributes[key];
                            }
                        }
                    }
                    if (Utils_1.Utils.hasData(primitiveData.morphTargets)) {
                        for (var _b = 0, _c = primitiveData.morphTargets; _b < _c.length; _b++) {
                            var frame = _c[_b];
                            if (Utils_1.Utils.isArrayEmpty(frame.vertices)) {
                                delete frame.vertices;
                            }
                            if (!!frame.normals
                                && Utils_1.Utils.isArrayEmpty(frame.normals)) {
                                delete frame.normals;
                            }
                        }
                    }
                }
            }
        }
    };
    CompressorManager.prototype._toBuffer = function (arraybuffer) {
        return Buffer.from(arraybuffer);
    };
    CompressorManager.prototype._parseWhere = function (where) {
        return where.split('%%');
    };
    return CompressorManager;
}());
exports.CompressorManager = CompressorManager;
__decorate([
    contract_1.ensure(function (returnVal, targetJson, buffersJson, bufferViewsJson, _a) {
        var json = _a.json, mappingTable = _a.mappingTable;
        contract_1.it("all primitives->attributes and indices should be replaced with accessorId", function () {
            for (var where in mappingTable) {
                if (mappingTable.hasOwnProperty(where)) {
                    chai_1.expect(mappingTable[where]).be.a("string");
                }
            }
        });
    })
], CompressorManager.prototype, "_buildJson", null);
