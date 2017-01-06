"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JudgeUtils = require("../../../ts/JudgeUtils");
var Utils_1 = require("./Utils");
var contract_1 = require("../../../ts/definition/typescript/decorator/contract");
var chai_1 = require("chai");
var virtual_1 = require("../../../ts/definition/typescript/decorator/virtual");
var Compressor = (function () {
    function Compressor() {
        this.recordedArr = null;
        this.bufferViewId = null;
    }
    Compressor.prototype.buildAccessorData = function (json, mappingTable, id) {
        if (!this.isArrayEmpty(this.recordedArr)) {
            return this.buildAccessorDataHelper(json, mappingTable, id);
        }
        return 0;
    };
    Compressor.prototype.removeRepeatData = function () {
        var recordedArr = this.recordedArr;
        for (var i = 0, len = recordedArr.length; i < len; i++) {
            var sourceItem = recordedArr[i];
            for (var j = i + 1; j < len; j++) {
                var targetItem = recordedArr[j];
                if (this._isRepeat(sourceItem.data, targetItem.data)) {
                    targetItem.data = sourceItem.where;
                }
            }
        }
    };
    Compressor.prototype.getBufferByteLength = function () {
        var length = 0, size = this.dataByteSize;
        this.recordedArr
            .filter(function (item) {
            return JudgeUtils.isArrayExactly(item.data);
        })
            .forEach(function (item) {
            length += size * item.data.length;
        });
        return length;
    };
    Compressor.prototype.buildBufferViewsJsonHelper = function (json, bufferId, bufferViewId, length, offset, target) {
        var actualBufferViewId = "bufferView_" + String(bufferViewId);
        if (!!target) {
            json[actualBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset,
                target: target
            };
        }
        else {
            json[actualBufferViewId] = {
                buffer: bufferId,
                byteLength: length,
                byteOffset: offset
            };
        }
        this.bufferViewId = actualBufferViewId;
    };
    Compressor.prototype.buildAccessorDataHelper = function (json, mappingTable, id, prefix) {
        var offset = 0, accessorCount = 0, recordedArr = this.recordedArr;
        for (var _i = 0, recordedArr_1 = recordedArr; _i < recordedArr_1.length; _i++) {
            var item = recordedArr_1[_i];
            if (JudgeUtils.isString(item.data)) {
                mappingTable[item.where] = mappingTable[item.data];
                continue;
            }
            var count = item.data.length, accessorId = null;
            if (count === 0) {
                continue;
            }
            if (prefix) {
                accessorId = prefix + "Accessor_" + String(id + accessorCount);
            }
            else {
                accessorId = "accessor_" + String(id + accessorCount);
            }
            accessorCount++;
            json[accessorId] = {
                bufferView: this.bufferViewId,
                byteOffset: offset,
                count: this._computeAccessorCount(count, item.type),
                componentType: item.componentType,
                type: item.type
            };
            if (item.where) {
                mappingTable[item.where] = accessorId;
            }
            offset += this.dataByteSize * count;
        }
        return accessorCount;
    };
    Compressor.prototype.isArrayEmpty = function (data) {
        return Utils_1.Utils.isArrayEmpty(data);
    };
    Compressor.prototype._computeAccessorCount = function (total, type) {
        var componentCount = null;
        switch (type) {
            case "VEC2":
                componentCount = 2;
                break;
            case "VEC3":
                componentCount = 3;
                break;
            case "VEC4":
                componentCount = 4;
                break;
            case "MAT2":
                componentCount = 4;
                break;
            case "MAT3":
                componentCount = 9;
                break;
            case "MAT4":
                componentCount = 16;
                break;
            default:
                componentCount = 1;
                break;
        }
        return total / componentCount;
    };
    Compressor.prototype._isRepeat = function (arr1, arr2) {
        if (JudgeUtils.isString(arr1)
            || JudgeUtils.isString(arr2)) {
            return false;
        }
        if (arr1.length !== arr2.length
            || arr1.length === 0) {
            return false;
        }
        for (var i = 0, len = arr1.length; i < len; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    };
    return Compressor;
}());
exports.Compressor = Compressor;
__decorate([
    virtual_1.virtual
], Compressor.prototype, "buildAccessorData", null);
__decorate([
    contract_1.ensure(function (returnVal, json, mappingTable, id, prefix) {
        contract_1.it("mappingTable should be valid", function () {
            for (var where in mappingTable) {
                if (mappingTable.hasOwnProperty(where)) {
                    chai_1.expect(mappingTable[where]).be.a("string");
                }
            }
        });
    })
], Compressor.prototype, "buildAccessorDataHelper", null);
__decorate([
    contract_1.ensure(function (count) {
        contract_1.it("accessor count should be int", function () {
            chai_1.expect(count % 1).equal(0);
        });
    })
], Compressor.prototype, "_computeAccessorCount", null);
